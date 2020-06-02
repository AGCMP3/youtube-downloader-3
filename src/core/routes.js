const express = require("express");

exports.Routes = function Routes() {
  const { AnalyzeRequest } = require("./analyze-request");
  const { Downloader } = require("./downloader");

  const routes = express.Router();

  async function onDownloadRequest(request, response) {
    const data = AnalyzeRequest(request).getData();

    const downloader = Downloader(data);
    const { videoTempPath, videoTitle } = await downloader.getDownloadData();

    response.set("video-title", videoTitle);

    response.download(videoTempPath);

    downloader.clearDownload();
  }

  function defineRoutes() {
    routes.get("/download", onDownloadRequest);
  }

  function getMiddleware() {
    return routes;
  }

  const self = {
    defineRoutes,
    getMiddleware,
  };

  return Object.freeze(self);
};
