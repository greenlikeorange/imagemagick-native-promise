var imagemagick = require('imagemagick-native');
var im = Object.assign({}, imagemagick, {

  convert: function (option, cb) {
    return new Promise(function (resolve, reject) {
      imagemagick.convert(option, function (err, buffer) {
        if (cb) cb(err, buffer); // Support original callback

        if (err) return reject(err); // Reject error

        return resolve(buffer);
      })
    })
  },

  identify: function (option, cb) {
    return new Promise(function (resolve, reject) {
      imagemagick.identify(option, function (err, result) {
        if (cb) cb(err, result); // Support original callback

        if (err) return reject(err); // Reject error

        return resolve(result);
      })
    })
  },

  composite: function (option, cb) {
    return new Promise(function (resolve, reject) {
      imagemagick.composite(option, function (err, buffer) {
        if (cb) cb(err, buffer); // Support original callback

        if (err) return reject(err); // Reject error

        return resolve(buffer);
      })
    })
  },

  quantizeColors: function (option) {
    return new Promise(function (resolve, reject) {
      var result;
      try {
        result = imagemagick.quantizeColors(option);
      } catch (e) {
        return reject(e);
      }

      resolve(result);
    })
  },

  getConstPixels: function (option) {
    return new Promise(function (resolve, reject) {
      var pixels;
      try {
        pixels = imagemagick.getConstPixels(option);
        resolve(pixels);
      } catch (e) {
        return reject(e);
      }
    })
  }

})

module.exports = im;
