import fs from 'node:fs/promises'
import path from 'node:path'

const INDEX_PATH = './data/index.json'

/**
 * Les skrá og skilar gögnum eða null
 * @param {string} filepath skráin sem á að lesa
 * @returns {Promise<unknown | null} Les skrá úr filepath og skilar innihaldi eða null ef villa kom upp.
 */

async function readJson(filepath) {
    console.log('Starting to read', filepath);
    let data;
    try {
        data = await fs.readFile(path.resolve(filepath), 'utf-8');
    } catch (error) {
        console.error(`Error reading file ${filepath}:`, error.message);
        return null;
    }

    try {
        const parsed = JSON.parse(data);
        return parsed;
    } catch (error) {
        console.error('Error parsing data as JSON');
        return null;
    }

}

