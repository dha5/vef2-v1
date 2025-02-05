import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * Reads a JSON file and returns its parsed content.
 * @param {string} filepath - The path of the file to read.
 * @returns {Promise<unknown | null>} The parsed JSON content or null if an error occurs.
 */
export async function readJson(filepath) {
    console.log('Starting to read', filepath);
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
