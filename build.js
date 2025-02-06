import { readJson, ensureDistDir } from './src/lib/file.js';
import { validateIndexData } from './src/lib/validate.js';
import { generateIndexHtml, generateCategoryHtml } from './src/lib/html.js';
import fs from 'fs/promises';

const INDEX_PATH = './data/index.json';
const DATA_DIR = './data/';
const DIST_DIR = './dist';


/**
 * Fall sem keyrir allt heilaklabbið:
 * 
 * 1. les index.json skrá
 * 2. síar út ógild gögn úr index.json
 */
async function main() {
    // Býr til möppuna sem geymir unnin gögn ef hún er ekki til
    await ensureDistDir();

    // lesa index skránna
    const indexData = await readJson(INDEX_PATH);
    if (!indexData) {
        console.error('Failed to read index.json');
        return;
    }
    
    // Sannreynir og síar út ógild gögn
    const validCategories = validateIndexData(indexData);

    // Búa til og skrifa index síðu
    const indexHtml = generateIndexHtml(validCategories);
    await fs.writeFile(`${DIST_DIR}/index.html`, indexHtml, 'utf-8');
    console.log('Generated index.html');

    // Búa til og skrifa síður fyrir spurningar
    for (const category of validCategories) {
        const categoryPath = `${DATA_DIR}${category.file}`;
        const categoryData = await readJson(categoryPath);

        if (!categoryData || !categoryData.questions) {
            console.warn(`Skipping invalid category file: ${category.file}`);
            continue;
        }

        const categoryHtml = generateCategoryHtml(category.title, categoryData.questions);
        const outputFilename = `${DIST_DIR}/${category.file.replace('.json', '.html')}`;
        await fs.writeFile(outputFilename, categoryHtml, 'utf-8');
        console.log(`Generated ${outputFilename}`);
    }

}

main();