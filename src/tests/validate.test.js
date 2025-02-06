import { validateIndexData, validateQuestions } from "../lib/validate.js";

test("should filter valid categories from index.json", () => {
    const input = [
        { title: "Valid", file: "html.json" },
        { title: 123, file: "invalid.json" }, // Invalid title
        { title: "No file" } // Missing file field
    ];
    const result = validateIndexData(input);
    expect(result.length).toBe(1); // Only one valid entry
    expect(result[0].title).toBe("Valid");
});

test("should filter valid questions", () => {
    const input = [
        { question: "Valid?", answers: [{ answer: "Yes", correct: true }] },
        { question: "Invalid?", answers: "not an array" }, // Invalid format
        { question: "No answers?", answers: [] } // No answers
    ];
    const result = validateQuestions(input);
    expect(result.length).toBe(1); // Only one valid question
    expect(result[0].question).toBe("Valid?");
});