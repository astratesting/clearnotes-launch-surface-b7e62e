"""
ClearNotes Backend API

FastAPI backend for handling waitlist registrations,
meeting transcriptions, and action item processing.
"""

import os
import json
import logging
from datetime import datetime
from typing import List, Optional
from contextlib import asynccontextmanager

import asyncpg
from fastapi import FastAPI, HTTPException, Depends, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import APIKeyHeader
from pydantic import BaseModel, EmailStr, validator
from passlib.context import CryptContext
import httpx
import openai
from typing_extensions import Annotated

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# Password context for API key hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# API key header
api_key_header = APIKeyHeader(name="X-API-Key", auto_error=False)


# Data Models
class WaitlistEntry(BaseModel):
    """Waitlist registration model."""
    email: EmailStr
    name: Optional[str] = None
    company: Optional[str] = None
    role: Optional[str] = None
    gdpr_consent: bool = False

    @validator("email")
    def validate_email(cls, v):
        if not v or "@" not in v:
            raise ValueError("Invalid email address")
        return v.lower()

    @validator("gdpr_consent")
    def validate_gdpr(cls, v):
        if not v:
            raise ValueError("GDPR consent is required")
        return v


class MeetingTranscript(BaseModel):
    """Meeting transcript model."""
    meeting_id: str
    transcript: str
    participants: List[str]
    duration_seconds: int
    platform: str


class ActionItems(BaseModel):
    """Action items response model."""
    meeting_id: str
    summary: str
    action_items: List[dict]
    decisions: List[str]
    key_topics: List[str]


class MeetingJoinRequest(BaseModel):
    """Request to join a meeting."""
    meeting_url: str
    meeting_id: str
    calendar_event_id: Optional[str] = None


# Database connection pool
class Database:
    """Database connection manager."""

    def __init__(self):
        self.pool: Optional[asyncpg.Pool] = None

    async def connect(self):
        """Create database connection pool."""
        self.pool = await asyncpg.create_pool(
            dsn=os.getenv(
                "DATABASE_URL",
                "postgresql://clearnotes:password@localhost:5432/clearnotes"
            ),
            min_size=5,
            max_size=20,
        )
        await self.init_tables()

    async def init_tables(self):
        """Initialize database tables."""
        async with self.pool.acquire() as conn:
            # Waitlist table
            await conn.execute("""
                CREATE TABLE IF NOT EXISTS waitlist (
                    id SERIAL PRIMARY KEY,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    name VARCHAR(255),
                    company VARCHAR(255),
                    role VARCHAR(255),
                    gdpr_consent BOOLEAN DEFAULT FALSE,
                    created_at TIMESTAMP DEFAULT NOW(),
                    notified_at TIMESTAMP
                )
            """)

            # Meetings table
            await conn.execute("""
                CREATE TABLE IF NOT EXISTS meetings (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    meeting_id VARCHAR(255) UNIQUE NOT NULL,
                    user_email VARCHAR(255) NOT NULL,
                    platform VARCHAR(50),
                    status VARCHAR(50) DEFAULT 'scheduled',
                    started_at TIMESTAMP,
                    ended_at TIMESTAMP,
                    transcript TEXT,
                    created_at TIMESTAMP DEFAULT NOW()
                )
            """)

            # Action items table
            await conn.execute("""
                CREATE TABLE IF NOT EXISTS action_items (
                    id SERIAL PRIMARY KEY,
                    meeting_id UUID REFERENCES meetings(id),
                    content TEXT NOT NULL,
                    assignee VARCHAR(255),
                    due_date DATE,
                    status VARCHAR(50) DEFAULT 'open',
                    created_at TIMESTAMP DEFAULT NOW()
                )
            """)

            # Create indexes
            await conn.execute("""
                CREATE INDEX IF NOT EXISTS idx_waitlist_email
                ON waitlist(email)
            """)
            await conn.execute("""
                CREATE INDEX IF NOT EXISTS idx_meetings_user
                ON meetings(user_email)
            """)

    async def disconnect(self):
        """Close database connections."""
        if self.pool:
            await self.pool.close()


db = Database()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager."""
    # Startup
    await db.connect()
    logger.info("Database connected")
    yield
    # Shutdown
    await db.disconnect()
    logger.info("Database disconnected")


# Initialize FastAPI app
app = FastAPI(
    title="ClearNotes API",
    description="AI Meeting Notetaker API",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# API Routes
@app.get("/")
async def root():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "service": "ClearNotes API",
        "version": "1.0.0",
        "timestamp": datetime.utcnow().isoformat()
    }


@app.get("/health")
async def health_check():
    """Detailed health check."""
    try:
        async with db.pool.acquire() as conn:
            await conn.fetchval("SELECT 1")
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        raise HTTPException(status_code=503, detail="Service unavailable")


@app.post("/api/waitlist", status_code=201)
async def join_waitlist(entry: WaitlistEntry, background_tasks: BackgroundTasks):
    """
    Join the ClearNotes waitlist.

    Args:
        entry: Waitlist registration data
        background_tasks: Background task runner

    Returns:
        Success message
    """
    try:
        async with db.pool.acquire() as conn:
            # Check for existing email
            existing = await conn.fetchrow(
                "SELECT email FROM waitlist WHERE email = $1",
                entry.email
            )

            if existing:
                raise HTTPException(
                    status_code=409,
                    detail="Email already registered"
                )

            # Insert new entry
            await conn.execute("""
                INSERT INTO waitlist (email, name, company, role, gdpr_consent)
                VALUES ($1, $2, $3, $4, $5)
            """, entry.email, entry.name, entry.company, entry.role, entry.gdpr_consent)

            logger.info(f"New waitlist registration: {entry.email}")

            # Send welcome email in background
            background_tasks.add_task(send_welcome_email, entry.email, entry.name)

            return {
                "success": True,
                "message": "Successfully joined the waitlist"
            }

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Waitlist registration failed: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@app.post("/api/meetings/join")
async def join_meeting(
    request: MeetingJoinRequest,
    api_key: Annotated[str, Depends(api_key_header)]
):
    """
    Join a meeting and start transcription.

    Args:
        request: Meeting join request
        api_key: API key for authentication

    Returns:
        Meeting join confirmation
    """
    if not api_key or not validate_api_key(api_key):
        raise HTTPException(status_code=401, detail="Invalid API key")

    try:
        # TODO: Integrate with meeting platform APIs
        # For now, return a mock response
        logger.info(f"Joining meeting: {request.meeting_id}")

        async with db.pool.acquire() as conn:
            await conn.execute("""
                INSERT INTO meetings (meeting_id, user_email, platform, status)
                VALUES ($1, $2, $3, 'in_progress')
            """, request.meeting_id, get_email_from_api_key(api_key), "unknown")

        return {
            "success": True,
            "meeting_id": request.meeting_id,
            "status": "joining"
        }

    except Exception as e:
        logger.error(f"Failed to join meeting: {e}")
        raise HTTPException(status_code=500, detail="Failed to join meeting")


@app.post("/api/meetings/{meeting_id}/transcript")
async def process_transcript(
    meeting_id: str,
    transcript: MeetingTranscript,
    api_key: Annotated[str, Depends(api_key_header)]
):
    """
    Process meeting transcript and extract action items.

    Args:
        meeting_id: Meeting identifier
        transcript: Meeting transcript data
        api_key: API key for authentication

    Returns:
        Extracted action items
    """
    if not api_key or not validate_api_key(api_key):
        raise HTTPException(status_code=401, detail="Invalid API key")

    try:
        # Extract action items using AI
        action_items = await extract_action_items(transcript.transcript)

        # Save to database
        async with db.pool.acquire() as conn:
            meeting_uuid = await conn.fetchval(
                "SELECT id FROM meetings WHERE meeting_id = $1",
                meeting_id
            )

            if meeting_uuid:
                for item in action_items.get("action_items", []):
                    await conn.execute("""
                        INSERT INTO action_items (meeting_id, content, assignee)
                        VALUES ($1, $2, $3)
                    """, meeting_uuid, item.get("task"), item.get("assignee"))

                # Update meeting with transcript
                await conn.execute("""
                    UPDATE meetings
                    SET transcript = $1, status = 'completed', ended_at = NOW()
                    WHERE meeting_id = $2
                """, transcript.transcript, meeting_id)

        # Send email with action items
        user_email = get_email_from_api_key(api_key)
        await send_action_items_email(user_email, action_items)

        return action_items

    except Exception as e:
        logger.error(f"Transcript processing failed: {e}")
        raise HTTPException(status_code=500, detail="Processing failed")


@app.get("/api/meetings/{meeting_id}/actions")
async def get_action_items(
    meeting_id: str,
    api_key: Annotated[str, Depends(api_key_header)]
):
    """
    Get action items for a meeting.

    Args:
        meeting_id: Meeting identifier
        api_key: API key for authentication

    Returns:
        List of action items
    """
    if not api_key or not validate_api_key(api_key):
        raise HTTPException(status_code=401, detail="Invalid API key")

    try:
        async with db.pool.acquire() as conn:
            rows = await conn.fetch("""
                SELECT ai.content, ai.assignee, ai.due_date, ai.status
                FROM action_items ai
                JOIN meetings m ON ai.meeting_id = m.id
                WHERE m.meeting_id = $1
            """, meeting_id)

            return {
                "meeting_id": meeting_id,
                "action_items": [dict(row) for row in rows]
            }

    except Exception as e:
        logger.error(f"Failed to get action items: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


# Helper functions
async def extract_action_items(transcript: str) -> dict:
    """
    Extract action items from transcript using AI.

    Args:
        transcript: Meeting transcript text

    Returns:
        Dictionary with summary and action items
    """
    try:
        # TODO: Replace with actual OpenAI/LLM call
        # This is a placeholder implementation
        return {
            "summary": "Meeting summary placeholder",
            "action_items": [
                {"task": "Review project timeline", "assignee": "Team Lead"},
                {"task": "Send follow-up email", "assignee": "Project Manager"}
            ],
            "decisions": ["Decision 1", "Decision 2"],
            "key_topics": ["Topic 1", "Topic 2"]
        }

    except Exception as e:
        logger.error(f"AI extraction failed: {e}")
        return {
            "summary": "",
            "action_items": [],
            "decisions": [],
            "key_topics": []
        }


async def send_welcome_email(email: str, name: Optional[str]):
    """
    Send welcome email to waitlist registrant.

    Args:
        email: Recipient email
        name: Recipient name
    """
    # TODO: Integrate with email service (Resend, SendGrid, etc.)
    logger.info(f"Sending welcome email to {email}")


async def send_action_items_email(email: str, action_items: dict):
    """
    Send action items email after meeting.

    Args:
        email: Recipient email
        action_items: Extracted action items
    """
    # TODO: Integrate with email service
    logger.info(f"Sending action items to {email}")


def validate_api_key(api_key: str) -> bool:
    """
    Validate API key.

    Args:
        api_key: API key to validate

    Returns:
        True if valid
    """
    # TODO: Implement proper API key validation
    return True


def get_email_from_api_key(api_key: str) -> str:
    """
    Get user email from API key.

    Args:
        api_key: API key

    Returns:
        User email
    """
    # TODO: Implement proper API key to email mapping
    return "user@example.com"


# Main entry point
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
