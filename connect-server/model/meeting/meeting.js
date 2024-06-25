const { redisClient } = require("../../config/redis");

const getMeetingData = async (key) => {
  console.log("GET MEEETING MODEL:", key);

  return new Promise(async (resolve, reject) => {
    redisClient
      .get(key)
      .then((res) => {
        resolve(JSON.parse(res));
      })
      .catch((err) => reject(err));
  });
};

const saveMeetingData = async (key, value) => {
  console.log("SET MEEETING MODEL:", key);

  // await redisClient.connect()
  console.log("connecting:", key);

  return new Promise(async (resolve, reject) => {
    console.log("Setting:", key);
    try {
      redisClient.set(key, JSON.stringify(value));
      resolve(true);
    } catch (err) {
      reject(false);
    }
    // await redisClient.disconnect()
  });
};

module.exports = { getMeetingData, saveMeetingData };
