const path = require("path");

const paths = {
  STATIC_PATH: path.normalize(
    path.join(__dirname, "..", "..", "static", "dist")
  ),
  DOWNLOAD_PATH: path.normalize(path.join(__dirname, "..", "temp")),
};

module.exports = paths;
