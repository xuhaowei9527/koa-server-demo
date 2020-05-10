module.exports =  function(app) {
  const server = require("http").Server(app.callback());
  const io = require("socket.io")(server);
  server.listen(8081, () => {
    console.log(`app run at : http://127.0.0.1:8081`);
  });
  io.on("connection", (socket) => {
    process.socket = socket;
  });
}
