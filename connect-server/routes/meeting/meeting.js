import express from "express";
import { saveMeetingId, getMeetingId } from "../../controllers/meeting/meeting";

let meetingRoutes = express.router();

meetingRoutes.get("/api/meeting:id", getMeetingId);
meetingRoutes.post("/api/meeting", saveMeetingId);

export { meetingRoutes };
