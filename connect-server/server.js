require("dotenv").config();
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const meetingRoutes = require("./routes/meeting/meeting");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();
const httpServer = createServer(app);
const { redisClient } = require("./config/redis");
const { allowedOrigins } = require("./config/allowedOrigins");
const startServer=async()=>{
  await redisClient.connect()
  app.use([
    cors(),
    bodyParser.json(),
    // bodyParser.urlencoded({ extended: false }),
    meetingRoutes,
  ]);
  app.options("*", cors())
  
  const io = new Server(httpServer, {
    cors: {
      origin: allowedOrigins
    },
    allowEIO3:true
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
  
}


startServer()
