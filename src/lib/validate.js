/**
 * Validates and filters the index data.
 * @param {Array} data - The data from index.json.
 * @returns {Array} - A filtered array with only valid entries.
 */

export function validateIndexData(data) {
    if (!Array.isArray(data)) {
        console.error('Index data is not an array!');
        return [];
    }

    return data.filter((entry) => {
        //ignore corrupt.json and invalid.json
        if (entry.file === 'corrupt.json' || entry.file === 'invalid.json') {
            console.warn(`Ignoring corrupt.json entry:`, entry);
            return false;
        }
        // Ensure each entry has the expected structure
        if (typeof entry.title !== 'string' || typeof entry.file !== 'string') {
            console.warn(`Invalid entry found and ignored: `, entry);
            return false;
        }
        return true;
    });
}