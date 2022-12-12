# Media Size

This package is a combination of [image-size](https://github.com/image-size/image-size) and [mediainfo.js](https://github.com/buzz/mediainfo.js).

## The problem

The image size package is great for getting the size of still images. However `.avif` files are not currently supported.

Media info can tell you the dimensions of an image or video file and it supports `.avif`. However `.webp` files, while supported, don't report their width and height dimensions.

## The quick and dirty solution

The quickest and the easiest short term solution is to cherry pick the `webp` file capabilities from `image-size` and use that for any files with a `.webp` file extension. For anything else, the `mediainfo.js` package is used to determine the dimensions of the input.

Supports:

- Video Files
  - mp4
  - mov
  - webm
  - avi
  - mkv
  - m4v
- Image files
  - png
  - jpeg
  - webp
  - avif
  - gif
  - bmp
  - tiff
