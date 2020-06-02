const ytdl = require("ytdl-core");
const fs = require("fs");

exports.YtdlManager = function YtdlManager(data) {
  const { videoURL, videoTempPath } = data;

  function getReadable() {
    return ytdl(videoURL, {
      quality: "highestaudio",
    });
  }

  function getWriteable() {
    return fs.createWriteStream(videoTempPath);
  }

  async function getInfo() {
    return (await ytdl.getInfo(videoURL)).playerResponse.videoDetails;
  }

  const self = {
    getReadable,
    getWriteable,
    getInfo,
  };

  return Object.freeze(self);
};
