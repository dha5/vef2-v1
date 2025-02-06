import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * Fall sem kannar hvort dist mappan sé til, ef ekki býr hana til.
 */
export async function ensureDistDir() {
    try {
        await fs.mkdir(DIST_DIR, {recursive: true});
    } catch (err) {
        console.error('Error creating dist directory:', err)
    }
}

/**
 * Les JSON skrá, parsar go skilar gögnum.
 * @param {string} filepath - Slóð skránnar sem á að lesa.
 * @returns {Promise<unknown | null>} Parsed JSON gögn eða null.
 */
export async function readJson(filepath) {
    let data;
    try {
        data = await fs.readFile(path.resolve(filepath), 'utf-8');
    } catch (error) {
        console.error(`Error reading file ${filepath}:`, error.message);
        return null;
    }

    try {
        return JSON.parse(data);
    } catch (error) {
        console.error('Error parsing data as JSON:', error.message);
        return null;
    }
}
