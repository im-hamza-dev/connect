require("dotenv").config();
const express = require("express");
import { createServer } from "http";
import Server from "socket.io";
import { meetingRoutes } from "./routes/meeting/meeting";
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT;
const app = express();
const httpServer = createServer(app);

app.use([
  cors(),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
  meetingRoutes,
]);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Connected: ", socket.id);
  socket.on("code", (data) => {
    socket.broadcast.emit("code", data);
  });
});

httpServer.listen(port, () => {
  console.log("SERVER LISTENING ON ", port);
});
