/**
 * Generates the HTML for a page.
 * @param {string} title - Title of the page.
 * @param {string} body - HTML body of the page.
 * @returns {string} - Full HTML document.
 */
export function template(title, body) {
    return /* HTML */ `<!doctype html>
        <html lang="is"
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width" />
                <link rel ="stylesheet" href="styles.css" />
                <title>${title}</title>
            </head>
            <body>
                <main>
                    ${body}
                </main>
            </body>
        </html>`;
}

/**
 * Generate HTML for index.html
 * @param {Array} categories List of quiz categories
 * @returns {string} Full HTML document.
 */
export function generateIndexHtml(categories) {
    const body = /* HTML */ `
        <h1>Spurningaleikur</h1>
        <p>Veldu flokk:</p>
        <ul>
            ${categories
                .map(
                    (category) =>/* HTML */ `
                        <li>
                            <a href="${category.file.replace('.json', '.html')}">${category.title}</a>
                        </li>
                    `
                )
                .join("")}
        </ul>
    `;
    return template("Spurningaleikur", body)
}

/**
 * Generate HTML for a category page.
 * @param {string} title Category title.
 * @param {Array} questions List of questions for this category.
 * @returns {string} Full HTML document.
 */
export function generateCategoryHtml(title, questions) {
    const body = /* HTML */ `
        <h1>${title}</h1>
        <a href="index.html">Til baka</a>
        <ul>
            ${questions
                .map(
                    (q) => /* HTML */ `
                        <li>
                            <p>${q.question}</p>
                            <ul>
                                ${Array.isArray(q.answers)
                                    ? q.answers
                                       .map(
                                            (a) => /* HTML */ `
                                                <li>${a.answer}</li>
                                            `
                                        )
                                        .join("")
                                    : "<li>Ógild svör</li>"}
                            </ul>
                        </li>
                    `
                )
                .join("")}
        </ul>
    `;
    return template(title, body);
}