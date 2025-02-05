import { readJson } from './src/lib/file.js';
import { validateIndexData } from './src/lib/validate.js';
import { generateIndexHtml, generateCategoryHtml } from './src/lib/html.js';
import fs from 'fs/promises';

const INDEX_PATH = './data/index.json';
const DATA_DIR = './data/';
const DIST_DIR = './dist';

/**
 * Ensures the output directory exists.
 */

async function ensureDistDir() {
    try {
        await fs.mkdir(DIST_DIR, {recursive: true});
    } catch (err) {
        console.error('Error creating dist directory:', err)
    }
}

async function main() {
    await ensureDistDir();

    // read the Index file
    const indexData = await readJson(INDEX_PATH);
    if (!indexData) {
        console.error('Failed to read index.json');
        return;
    }
    
    // validate and filter data
    const validCategories = validateIndexData(indexData);

    //Generate and write index.html
    const indexHtml = generateIndexHtml(validCategories);
    await fs.writeFile(`${DIST_DIR}/index.html`, indexHtml, 'utf-8');
    console.log('Generated index.html');

    //Generate and write category pages
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