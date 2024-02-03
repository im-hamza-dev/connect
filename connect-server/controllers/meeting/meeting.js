import { getMeetingData, saveMeetingData } from "../../model/meeting";

const getMeetingId = async (req, res) => {
  try {
    let { id } = req.body;
    let meetingId = await getMeetingData(id);
    res.status.code(200).send({ meetingId });
  } catch (err) {
    console.log("Server Error: ", err);
    res.status.code(400).send(err.message);
  }
};

const saveMeetingId = async (req, res) => {
  try {
    let { id, signalStream } = req.body;
    await saveMeetingData(id, signalStream);
    res.status.code(200).send(true);
  } catch (err) {
    console.log("Server Error: ", err);
    res.status.code(400).send(err.message);
  }
};

export { getMeetingId, saveMeetingId };
