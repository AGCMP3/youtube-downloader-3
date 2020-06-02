const path = require("path");

const { MIME_TYPE_VIDEO, MIME_TYPE_SONG } = require("../constants/mime");
const { DOWNLOAD_PATH } = require("../constants/paths");

exports.AnalyzeRequest = function AnalyzeRequest(request) {
  const { Utils } = require("./utils");
  const utils = Utils();

  const downloadAsVideo = request.headers["download-as-video"] === "true";

  const socketClientId = request.headers["socket-client-id"];

  const videoURL = request.headers["video-url"];

  const mime = downloadAsVideo ? MIME_TYPE_VIDEO : MIME_TYPE_SONG;

  const videoTempPath = path.resolve(DOWNLOAD_PATH, utils.id() + mime);

  const data = {
    downloadAsVideo,
    mime,
    videoTempPath,
    videoURL,
    socketClientId,
  };

  function getData() {
    return data;
  }

  const self = {
    getData,
  };

  return Object.freeze(self);
};
