#! /usr/bin/env node

import { existsSync } from 'fs';
import { resolve } from 'path';
import getSize from '../src/getSize.js';

const files = process.argv.slice(2).filter((file) => existsSync(file));

if (!files.length) {
  console.error('Usage: sizeOf image1 [image2] [image3] ...');
  process.exit(-1);
}

async function* makeIterator(files) {
  let i = 0;
  while (i < files.length) {
    const file = await resolve(files[i]);
    const data = await getSize(file);
    yield data;
    i++;
  }
}

(async function () {
  const iterator = makeIterator(files);
  let next = await iterator.next();
  while (next.value) {
    console.log(next.value);
    next = await iterator.next();
  }
})();
