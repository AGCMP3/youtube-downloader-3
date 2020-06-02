const fs = require("fs");

exports.Downloader = function Downloader(data) {
  const { VideoDownloader } = require("./video-downloader");
  const { SongDownloader } = require("./song-downloader");

  const { videoTempPath, downloadAsVideo } = data;

  const videoDownloader = VideoDownloader(data);
  const songDownloader = SongDownloader(data);

  async function getDownloadData() {
    const result = await new Promise(async (resolve, reject) => {
      try {
        if (downloadAsVideo) {
          const completeData = await videoDownloader.start();
          return resolve(completeData);
        }

        const completeData = await songDownloader.start();
        return resolve(completeData);
      } catch (error) {
        reject(error);
      }
    });

    return result;
  }

  function clearDownload() {
    return setTimeout(() => fs.unlinkSync(videoTempPath), 2000);
  }

  const self = {
    getDownloadData,
    clearDownload,
  };

  return Object.freeze(self);
};
