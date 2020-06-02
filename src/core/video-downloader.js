const { YtdlManager } = require("./ytdl-manager");
const lodash = require("lodash");

exports.VideoDownloader = function VideoDownloader(data) {
  const { Socket } = require("./socket");

  const { mime, socketClientId } = data;

  const ytdlManager = YtdlManager(data);

  const writeable = ytdlManager.getWriteable();

  const readable = ytdlManager.getReadable();

  const socket = Socket();
  const io = socket.getIo();

  let videoTitle = null;

  function onFetchInfo(info) {
    videoTitle = info.playerResponse.videoDetails.title + mime;

    io.to(socketClientId).emit("start-download");
  }

  function onDownloading(_, downloaded, total) {
    const percent = Number(((downloaded / total) * 100).toFixed(1));

    io.to(socketClientId).emit("download-state-change", percent);
  }

  function onComplete(resolve) {
    io.to(socketClientId).emit("download-complete");

    resolve({ ...data, videoTitle });
  }

  async function start() {
    return new Promise((resolve, reject) => {
      try {
        io.to(socketClientId).emit("fetch-info");

        readable.pipe(writeable);
        readable.on("info", onFetchInfo);
        readable.on("progress", lodash.throttle(onDownloading, 500));
        readable.on("end", () => onComplete(resolve));
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
