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