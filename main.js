import { readJson } from './src/lib/file.js';

const INDEX_PATH = './data/index.json';

async function main() {
    const indexData = await readJson(INDEX_PATH);
    if (!indexData) {
        console.error('Failed to read index.json');
        return;
    }
    
    console.log('Index Data:', indexData);
}

main();