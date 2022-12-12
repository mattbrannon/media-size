import MediaInfoFactory from 'mediainfo.js';

const mediaInfo = await MediaInfoFactory({
  format: 'JSON',
  coverData: false,
  full: false,
  chunkSize: 512 * 1024,
});

export default mediaInfo;
