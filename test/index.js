import { readdirSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import getSize from '../src/getSize.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATA_DIR = join(__dirname, 'sample-data');
const TEST_FILES = readdirSync(DATA_DIR).map((filename) =>
  resolve(DATA_DIR, filename)
);

async function* makeIterator(testFiles) {
  let i = 0;
  while (i < testFiles.length) {
    const file = testFiles[i];
    const data = await getSize(file);
    yield data;
    // yield testFiles[i];
    i++;
  }
}

(async function test() {
  const iterator = makeIterator(TEST_FILES);
  let next = await iterator.next();
  while (next.value) {
    console.log(next.value);
    next = await iterator.next();
  }
})();
