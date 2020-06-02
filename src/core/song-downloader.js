const ffmpeg = require("fluent-ffmpeg");
const lodash = require("lodash");

exports.SongDownloader = function SongDownloader(data) {
  const { Socket } = require("./socket");

  const { Utils } = require("./utils");

  const utils = Utils();

  const { YtdlManager } = require("./ytdl-manager");

  const { videoTempPath, videoURL, socketClientId } = data;

  const ytdlManager = YtdlManager(data);

  const readable = ytdlManager.getReadable();

  let videoTitle = null;
  let totalSeconds = null;
  let secondsToPercent = null;

  const socket = Socket();
  const io = socket.getIo();

  function onDownloading(progress) {
    const time = progress.timemark;

    const [h, m, s] = time.split(":").map((item) => Number(item));

    const hourInSeconds = h * 60 * 60;
    const minInSeconds = m * 60;
    const currentSeconds = hourInSeconds + minInSeconds + s;

    const percent = secondsToPercent(currentSeconds);

    io.to(socketClientId).emit("download-state-change", percent);
  }

  function onComplete(resolve) {
    io.to(socketClientId).emit("download-complete");

    resolve({ ...data, videoTitle });
  }

  async function start() {
    return new Promise(async (resolve, reject) => {
      try {
        io.to(socketClientId).emit("fetch-info");

        const info = await ytdlManager.getInfo(videoURL);

        videoTitle = info.title;
        totalSeconds = Number(info.lengthSeconds);
        secondsToPercent = utils.interpolate([0, totalSeconds], [0, 100]);

        io.to(socketClientId).emit("start-download");

        ffmpeg(readable)
          .audioBitrate(128)
          .save(videoTempPath)
          .on("progress", lodash.throttle(onDownloading, 500))
          .on("end", () => onComplete(resolve));
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
