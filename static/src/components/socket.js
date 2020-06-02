import io from "socket.io-client";

const socket = io();

export function Socket() {
  async function connect() {
    return new Promise((resolve) => {
      socket.on("connect", () => {
        resolve(socket.id);
      });
    });
  }

  function getId() {
    return socket.id;
  }

  function getSocket() {
    return socket;
  }

  const self = {
    connect,
    getId,
    getSocket,
  };

  return Object.freeze(self);
}
