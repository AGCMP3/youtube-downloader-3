const { YtdlManager } = require("./ytdl-manager");

exports.VideoDownloader = function VideoDownloader(data) {
  const { mime } = data;

  const ytdlManager = YtdlManager(data);

  const writeable = ytdlManager.getWriteable();

  const readable = ytdlManager.getReadable();

  let videoTitle = null;

  function onFetchInfo(info) {
    videoTitle = info.playerResponse.videoDetails.title + mime;
  }

  async function start() {
    return new Promise((resolve, reject) => {
      try {
        readable.pipe(writeable);
        readable.on("info", onFetchInfo);
        readable.on("end", () => resolve({ ...data, videoTitle }));
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
