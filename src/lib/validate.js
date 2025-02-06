/**
 * Sannreynir og síar út ógild gögn úr index skránni.
 * @param {Array} data - gögn úr index skrá.
 * @returns {Array} - fylki með gögnum sem er búið að sannreyna og sía.
 */

export function validateIndexData(data) {
    if (!Array.isArray(data)) {
        console.error('Index data is not an array!');
        return [];
    }

    return data.filter((entry) => {
        // Hunsa corrupt.json og invalid.json
        if (entry.file === 'corrupt.json' || entry.file === 'invalid.json') {
            console.warn(`Ignoring corrupt.json entry:`, entry);
            return false;
        }
        // Sannreynir að gögn hafi rétt "structure".
        if (typeof entry.title !== 'string' || typeof entry.file !== 'string') {
            console.warn(`Invalid entry found and ignored: `, entry);
            return false;
        }
        return true;
    });
}

/**
 * breytir sérstökum HTML táknum svo þau birtist sem strengur í stað takka, hlekks o.fl.
 * @param {string} str - inntaks strengur sem á að breyta.
 * @returns {string} - breyttur strengur.
 */
function escapeHTML(str) {
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
}

/**
 * Sannreynir hvort spurning og svör við spurningu sé af réttu tagi.
 * Sendir svör og spurningar einnig í escapeHTML.
 * @param {Object} questionObj - Spurningar hlutur.
 * @returns {boolean} - Skilar true ef spurning er á réttu formi, annars false.
 */
function isValidQuestion(questionObj) {
    // Sannreynir að spurningin sé til og sé strengur.
    if (!questionObj.question || typeof questionObj.question !== "string") {
        return false;
    }

    // Fjarlægir ógildar spurningar.
    if (questionObj.question.includes("Ógild spurning")) {
        return false;
    }

    questionObj.question = escapeHTML(questionObj.question);

    // Sannreynir að svör séu til og séu í fylki.
    if (!Array.isArray(questionObj.answers) || questionObj.answers.length === 0) {
        return false;
    }

    // Sannreynir að hver spurning sé strengur með boolean segð fyrir hvort svarið sé rétt eða ekki.
    for (const answer of questionObj.answers) {
        if (typeof answer.answer !== "string" || typeof answer.correct !== "boolean") {
            return false;
        }
        answer.answer = escapeHTML(answer.answer);
    }

    return true;
}

/**
 * Síar og sannreynir allar spurningar úr JSON skrá.
 * @param {Array} questions - Fylki af spurningar hlutum.
 * @returns {Array} - Skilar lista af spurningum sem er búið að sía.
 */
export function validateQuestions(questions) {
    if (!Array.isArray(questions)) {
        console.error("Expected an array of questions, but received:", questions);
        return [];
    }

    return questions.filter(isValidQuestion);
}