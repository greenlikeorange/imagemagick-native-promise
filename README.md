# imagemagick-native-promise

JavaScript Promise wrapper for [node-imagemagick-native](https://github.com/elad/node-imagemagick-native)

Features

  * Used [node-imagemagick-native](https://github.com/elad/node-imagemagick-native)
  * Used native promise library
  * Callback can used and stream API are still origin

Promise supported methods

  * [API Reference](#api)
    * [`convert`](#convert)
    * [`identify`](#identify)
    * [`quantizeColors`](#quantizeColors)
    * [`composite`](#composite)
    * [`getConstPixels`](#getConstPixels)

Please look full API reference at https://github.com/elad/node-imagemagick-native/blob/master/README.md 

Original's table of contents

  * [Examples](#examples)
    * [Convert formats](#example-convert) (PNG to JPEG)
    * [Blur](#example-blur)
    * [Resize](#example-resize)
    * [Rotate, flip, and mirror](#example-rotate-flip-mirror)
  * [API Reference](#api)
    * [`convert`](#convert)
    * [`identify`](#identify)
    * [`quantizeColors`](#quantizeColors)
    * [`composite`](#composite)
    * [`getConstPixels`](#getConstPixels)
    * [`quantumDepth`](#quantumDepth)
    * [`version`](#version)

<a name='examples'></a>

## Examples

<a name='example-convert'></a>

### Convert formats

Convert from one format to another with quality control:

```js
imagemagick.convert({
	srcData: fs.readFileSync('before.jpg'),
	format: 'PNG',
	quality: 100 // (best) to 1 (worst)
})
.then((buffer) => {
  fs.writeFileSync('after.png', buffer);
})
.catch((e) => {
  console.error(e);
})
```

<a name='example-blur'></a>

### Blur

Blur image:

```js
imagemagick.convert({
	srcData: fs.readFileSync('before.jpg'),
	blur: 5
})
.then((buffer) => {
  fs.writeFileSync('after.jpg', buffer);
})
.catch((e) => {
  console.error(e);
})
```

<a name='example-resize'></a>

### Resize

Resized images by specifying `width` and `height`. There are three resizing styles:

  * `aspectfill`: Default. The resulting image will be exactly the specified size, and may be cropped.
  * `aspectfit`: Scales the image so that it will not have to be cropped.
  * `fill`: Squishes or stretches the image so that it fills exactly the specified size.

```js
imagemagick.convert({
	srcData: fs.readFileSync('before_resize.jpg'),
	width: 100,
	height: 100,
	resizeStyle: 'aspectfill', // is the default, or 'aspectfit' or 'fill'
	gravity: 'Center' // optional: position crop area when using 'aspectfill'
})
.then((buffer) => {
  fs.writeFileSync('after_resize.jpg', buffer);
})
.catch((err) => {
  console.error(err);
})
```

<a name='example-rotate-flip-mirror'></a>

### Rotate, flip, and mirror

Rotate and flip images, and combine the two to mirror:

```js
imagemagick.convert({
	srcData: fs.readFileSync('before_rotateflip.jpg'),
	rotate: 180,
	flip: true
})
.then((buffer) => {
  fs.writeFileSync('after_rotateflip.jpg', buffer);
})
.catch((err) => {
  console.error(err);
})
```
