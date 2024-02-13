const express = require("express");
const http = require("http");
const WebSocket = require('ws');


const app = express();
const server = http.createServer(app);

setupWebSocket(server);

app.get("/websocket", (req, res) => {
  res.sendFile(__dirname + "/websocket.html");
});

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", function connection(ws) {
    console.log("Client connected");

    ws.on("message", function incoming(message) {
      console.log("Received: %s", message);
      ws.send(message);
    });

    ws.on("close", function () {
      console.log("Client disconnected");
    });
  });
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
