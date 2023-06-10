const ws = require("ws");
const jwt = require("jsonwebtoken");

function wsServer(appServer) {
  const wsServer = new ws.WebSocketServer({ server: appServer });
  wsServer.on("connection", (connection, req) => {
    const cookies = req.headers.cookie;
    if (cookies) {
      const tokenCookieString = cookies
        .split(";")
        .find((str) => str.startsWith("token="));
      const token = tokenCookieString.split("=")[1];
      if (token) {
        jwt.verify(token, "seed", {}, (err, userData) => {
          if (err) throw err;
          const { id, userName } = userData;
          connection.id = id;
          connection.userName = userName;
        });
      }
    }
    [...wsServer.clients].forEach((client) => {
      client.send(
        JSON.stringify({
          online: [...wsServer.clients].map((client) => ({
            userName: client.userName,
            id: client.id,
          })),
        })
      );
    });
  });
}

module.exports = wsServer;
