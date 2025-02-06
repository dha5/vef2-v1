import { readJson } from "../lib/file.js";

test("should read a valid JSON file", async () => {
    const data = await readJson("data/index.json");
    expect(data).toBeDefined();
    expect(Array.isArray(data)).toBe(true);
});

test("should return null for a non-existent file", async () => {
    const data = await readJson("data/does-not-exist.json");
    expect(data).toBeNull();
});