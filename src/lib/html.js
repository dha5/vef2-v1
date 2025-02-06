/**
 * Býr til HTML fyrir síðu.
 * @param {string} title - Titill síðu.
 * @param {string} body - HTML body síðu.
 * @returns {string} - Full HTML skrá.
 */
export function template(title, body) {
    return /* HTML */ `<!doctype html>
        <html lang="is"
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width" />
                <link rel ="stylesheet" href="styles.css" />
                <script defer src="./script.js"></script> <!-- Include script.js -->
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
 * Býr til HTML fyrir index.html
 * @param {Array} categories listi af spurninga flokkum.
 * @returns {string} Full HTML skrá.
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
 * Býr til HTML fyrir spurninga flokks síðu.
 * @param {string} title Titill flokks.
 * @param {Array} questions Listi af spurningum fyrir þennan flokk.
 * @returns {string} Full HTML skrá.
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
                                                <li class="answer" data-correct="${a.correct}">
                                                ${a.answer}
                                                </li>
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