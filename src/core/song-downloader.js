const ffmpeg = require("fluent-ffmpeg");

exports.SongDownloader = function SongDownloader(data) {
  const { YtdlManager } = require("./ytdl-manager");

  const { videoTempPath, videoURL } = data;

  const ytdlManager = YtdlManager(data);

  const readable = ytdlManager.getReadable();

  let videoTitle = null;

  async function start() {
    return new Promise(async (resolve, reject) => {
      try {
        videoTitle = (await ytdlManager.getInfo(videoURL)).title;

        ffmpeg(readable)
          .audioBitrate(128)
          .save(videoTempPath)
          .on("end", () => {
            resolve({ ...data, videoTitle });
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  const self = {
    start,
  };

  return Object.freeze(self);
};
