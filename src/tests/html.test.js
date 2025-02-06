import { generateIndexHtml, generateCategoryHtml } from "../lib/html.js";

test("should generate valid index HTML", () => {
    const categories = [{ title: "HTML", file: "html.json" }];
    const html = generateIndexHtml(categories);
    expect(html).toContain("<h1>Spurningaleikur</h1>");
    expect(html).toContain('<a href="html.html">HTML</a>');
});

test("should generate valid category HTML", () => {
    const questions = [
        { question: "What is HTML?", answers: [{ answer: "A language", correct: true }] }
    ];
    const html = generateCategoryHtml("HTML", questions);
    expect(html).toContain("<h1>HTML</h1>");
    expect(html).toContain("What is HTML?");
    expect(html).toContain('type="radio"');
});