import { cn, isValidEmail, formatDate } from "@/lib/utils";

describe("utils", () => {
  describe("cn", () => {
    it("merges class names correctly", () => {
      const result = cn("px-4", "py-2", "bg-white");
      expect(result).toContain("px-4");
      expect(result).toContain("py-2");
      expect(result).toContain("bg-white");
    });

    it("handles conditional classes", () => {
      const result = cn("base", true && "included", false && "excluded");
      expect(result).toContain("base");
      expect(result).toContain("included");
      expect(result).not.toContain("excluded");
    });

    it("resolves Tailwind conflicts", () => {
      const result = cn("px-2", "px-4");
      // tailwind-merge should resolve to px-4
      expect(result).toContain("px-4");
    });
  });

  describe("isValidEmail", () => {
    it("validates correct email addresses", () => {
      expect(isValidEmail("test@example.com")).toBe(true);
      expect(isValidEmail("user.name@domain.co.uk")).toBe(true);
      expect(isValidEmail("test+tag@example.com")).toBe(true);
    });

    it("rejects invalid email addresses", () => {
      expect(isValidEmail("")).toBe(false);
      expect(isValidEmail("invalid")).toBe(false);
      expect(isValidEmail("invalid@")).toBe(false);
      expect(isValidEmail("@invalid.com")).toBe(false);
      expect(isValidEmail("test@.com")).toBe(false);
    });
  });

  describe("formatDate", () => {
    it("formats date correctly", () => {
      const date = new Date("2024-01-15");
      const result = formatDate(date);
      expect(result).toBe("January 15, 2024");
    });

    it("handles different dates", () => {
      const date = new Date("2024-12-25");
      const result = formatDate(date);
      expect(result).toBe("December 25, 2024");
    });
  });
});
