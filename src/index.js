const { Server } = require("./core/server");
const { Setup } = require("./core/setup");

try {
  const setup = Setup();
  setup.configure();

  const server = Server();
  server.configure();

  server.init();
} catch (error) {
  console.log(error);
}
