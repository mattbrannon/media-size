import { open } from 'fs/promises';
import { resolve } from 'path';

import calculate from '../lib/calculate.js';
import makeReadChunk from '../lib/makeReadChunk.js';
import mediaInfo from '../lib/mediaInfo.js';
import parseJson from '../lib/parseJson.js';

const getSize = async (filepath) => {
  try {
    const file = resolve(filepath);
    const handle = await open(file, 'r');
    const { size } = await handle.stat();

    try {
      if (size <= 0) {
        throw new Error('Empty file');
      }

      const readChunk = makeReadChunk(handle);
      const buffer = await readChunk(size);
      const format = buffer.toString('ascii', 8, 12);
      const isWebP = format === 'WEBP';

      if (isWebP) {
        const data = calculate(buffer, file);
        return { file, format, ...data };
      }
      else {
        const json = await mediaInfo.analyzeData(() => size, readChunk);
        const data = parseJson(json);
        return { file, ...data };
      }
    }
    catch (error) {
      return { error: true, message: error.message, file };
    }
    finally {
      handle.close();
    }
  }
  catch (error) {
    console.log(error);
  }
};

export default getSize;
