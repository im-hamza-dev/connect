const {
  getMeetingData,
  saveMeetingData,
} = require("../../model/meeting/meeting");

const getMeetingId = async (req, res) => {
  try {
    let { id } = req.params;
    let meetingId = await getMeetingData(id);
    console.log("GET MEEETING ID:", meetingId, id);
    res.status(200).send({ meetingId });
  } catch (err) {
    console.log("Server Error: ", err);
    res.status(400).send(err.message);
  }
};

const saveMeetingId = async (req, res) => {
  try {
    let { id, signalData } = req.body;
    console.log('saving signal',id)
    await saveMeetingData(id, signalData);
    console.log("sending response to client")
    res.status(200).send(true);
  } catch (err) {
    console.log("Server Error: ", err);
    res.status(400).send(err.message);
  }
};

module.exports = { getMeetingId, saveMeetingId };
