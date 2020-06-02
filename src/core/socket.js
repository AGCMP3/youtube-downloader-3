const http = require("http");

const connection = require("socket.io");

let io = null;
let server = null;

exports.Socket = function Socket() {
  function getIo() {
    return io;
  }

  function getServer() {
    return server;
  }

  function configure(app) {
    server = http.createServer(app);
    io = connection(server);
  }

  const self = {
    getIo,
    configure,
    getServer,
  };

  return Object.freeze(self);
};
