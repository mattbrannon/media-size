// source: https://github.com/image-size/image-size/blob/main/lib/types/webp.ts

function calculateExtended(buffer) {
  return {
    width: 1 + buffer.readUIntLE(4, 3),
    height: 1 + buffer.readUIntLE(7, 3),
  };
}

function calculateLossless(buffer) {
  return {
    width: 1 + (((buffer[2] & 0x3f) << 8) | buffer[1]),
    height:
      1 +
      (((buffer[4] & 0xf) << 10) |
        (buffer[3] << 2) |
        ((buffer[2] & 0xc0) >> 6)),
  };
}

function calculateLossy(buffer) {
  // `& 0x3fff` returns the last 14 bits
  // TO-DO: include webp scaling in the calculations
  return {
    width: buffer.readInt16LE(6) & 0x3fff,
    height: buffer.readInt16LE(8) & 0x3fff,
  };
}

export default function calculate(buffer) {
  const chunkHeader = buffer.toString('ascii', 12, 16);
  buffer = buffer.slice(20, 30);

  // Extended webp stream signature
  if (chunkHeader === 'VP8X') {
    const extendedHeader = buffer[0];
    const validStart = (extendedHeader & 0xc0) === 0;
    const validEnd = (extendedHeader & 0x01) === 0;
    if (validStart && validEnd) {
      return calculateExtended(buffer);
    }
    else {
      // TODO: breaking change
      throw new TypeError('Invalid WebP');
    }
  }

  // Lossless webp stream signature
  if (chunkHeader === 'VP8 ' && buffer[0] !== 0x2f) {
    return calculateLossy(buffer);
  }

  // Lossy webp stream signature
  const signature = buffer.toString('hex', 3, 6);
  if (chunkHeader === 'VP8L' && signature !== '9d012a') {
    return calculateLossless(buffer);
  }

  throw new TypeError('Invalid WebP');
}
