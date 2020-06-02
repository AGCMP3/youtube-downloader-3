const express = require("express");
const cors = require("cors");

const { STATIC_PATH } = require("../constants/paths");
const { PORT } = require("../constants/server");

exports.Server = function Server() {
  const app = express();

  const { Socket } = require("./socket");
  const { Routes } = require("./routes");

  const socket = Socket();
  const routes = Routes();

  function configureSocketEvents() {
    const io = socket.getIo();
    // Here any socket event can be implemented
  }

  function configure() {
    socket.configure(app);

    routes.defineRoutes();

    app.use(cors());

    app.use(express.static(STATIC_PATH));

    app.use(routes.getMiddleware());

    configureSocketEvents();
  }

  function init() {
    const server = socket.getServer();

    server.listen(PORT, () =>
      console.log("Server initialized on port: " + PORT)
    );
  }

  const self = {
    configure,
    init,
  };

  return Object.freeze(self);
};
