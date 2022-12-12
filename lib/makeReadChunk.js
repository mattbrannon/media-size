export default function makeReadChunk(handle) {
  const maxBufferSize = 512 * 1024;
  return async function readChunk(size, offset = 0) {
    const bufferSize = Math.min(size, maxBufferSize);
    const buffer = Buffer.alloc(bufferSize);
    await handle.read(buffer, 0, bufferSize, offset);
    return buffer;
  };
}
