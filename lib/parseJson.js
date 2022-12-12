export default function parseJson(json) {
  const data = JSON.parse(json).media.track.reduce(
    (acc, { Format, Width, Height }) => {
      acc.format = acc.format || Format;
      acc.width = acc.width || Number(Width);
      acc.height = acc.height || Number(Height);
      return acc;
    },
    {}
  );
  return data;
}
