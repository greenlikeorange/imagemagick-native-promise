var imagemagick = require('../index.js');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var expectPromiseChain = require('./expectPromiseChain');
var debug = 0;

process.chdir(__dirname);

chai.use(chaiAsPromised);
chai.use(expectPromiseChain);
var expect = chai.expect;

// Original
const _expect = chai.expect;

console.log('image magick\'s version is: ' + imagemagick.version());

function saveToFileIfDebug (buffer, file) {
  if (debug) {
    require('fs').writeFileSync(file, buffer, 'binary');
    console.log('wrote file: ' + file);
  }
}

describe('imagemagick-native-promise', function () {

  describe('#identify', function () {
    it('should result expect informations', function () {

      return expect(imagemagick.identify({
        srcData: require('fs').readFileSync('test.png'), // 58x66
      }))
      .to.eventually.have.deep.property('width', 58)
      .also.have.deep.property('height', 66)
      .also.have.deep.property('depth', 8)
      .also.have.deep.property('format', 'PNG')
      .also.have.deep.property('exif.orientation', 0)
      .exec();

    })
  })

  describe('#convert', function () {
    it('should return a buffer', function () {

      return expect(
        imagemagick.convert({
          srcData: require('fs').readFileSync('test.png'), // 58x66
          width: 100,
          height: 100,
          filter: 'Lagrange',
          quality: 80,
          format: 'PNG',
          debug: debug
        })
        .then(function (buffer) {
          saveToFileIfDebug(buffer, "out.png-lagrange.png");
          return buffer;
        })
      )
      .to.eventually.be.a.Buffer;

    })

    it('should convert as expected 100x100 png', function () {

      return expect(
        imagemagick.convert({
          srcData: require('fs').readFileSync('test.png'), // 58x66
          width: 100,
          height: 100,
          format: 'PNG',
          debug: debug
        })
        .then(function (buffer) {
          saveToFileIfDebug(buffer, "out.png-100x100.png");
          return buffer;
        })
        .then(function (buffer) {
          return imagemagick.identify({ srcData: buffer }) // 100 x 100
        })
      )
      .to.eventually.have.deep.property('width', 100)
      .also.have.deep.property('height', 100)
      .also.have.deep.property('format', 'PNG')
      .exec();

    })

  })

  describe('#composite', function () {
    it('should return a buffer', function () {

      return expect(
        imagemagick.composite({
          srcData: require('fs').readFileSync( 'test.quantizeColors.png' ),
          compositeData: require('fs').readFileSync('test.png'),
          debug: debug
        })
        .then(function () {
          saveToFileIfDebug(buffer, "out.composite-async.png");
          return buffer
        })
      )
      .to.eventually.be.a.Buffer;

    })
  })
});
