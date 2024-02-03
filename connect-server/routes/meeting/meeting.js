const express = require("express");
const {
  saveMeetingId,
  getMeetingId,
} = require("../../controllers/meeting/meeting");

let meetingRoutes = express.Router();

meetingRoutes.get("/api/meeting:id", getMeetingId);
meetingRoutes.post("/api/meeting", saveMeetingId);

module.exports = meetingRoutes;
