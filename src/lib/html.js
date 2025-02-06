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
        <form class="quiz-form">
            ${questions.map((q, qIndex) => /* HTML */ `
                <fieldset>
                    <legend>${q.question}</legend>
                    <div class="answers">
                        ${Array.isArray(q.answers)
                            ? q.answers.map((a) => /* HTML */ `
                                <div class="answer-container">
                                    <label>
                                        <input type="radio" name="question-${qIndex}" value="${a.answer}" data-correct="${a.correct}">
                                        ${a.answer}
                                    </label>
                                </div>
                            `).join("")
                            : "<p>Ógild svör</p>"}
                    </div>
                    <br> <!-- Space after each question -->
                </fieldset>
            `).join("")}
            <button type="submit">Check Answers</button>
        </form>
    `;
    return template(title, body);
}
