const getMeetingId = (req, res) => {
  try {
    let { id, signalStream } = req.body;
    res.status.code(200).send(true);
  } catch (err) {
    console.log("Server Error: ", err);
    res.status.code(400).send(err.message);
  }
};

const saveMeetingId = (req, res) => {
  try {
    let { id, signalStream } = req.body;
    res.status.code(200).send(true);
  } catch (err) {
    console.log("Server Error: ", err);
    res.status.code(400).send(err.message);
  }
};

export { getMeetingId, saveMeetingId };
