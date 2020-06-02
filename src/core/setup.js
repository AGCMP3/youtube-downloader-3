const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");

exports.Setup = function Setup() {
  function configureFfmpegSetup() {
    ffmpeg.setFfmpegPath(ffmpegPath);
  }

  function configureOtherThing() {}

  function configure() {
    configureFfmpegSetup();
    configureOtherThing();
  }

  const self = {
    configure,
  };

  return Object.freeze(self);
};
