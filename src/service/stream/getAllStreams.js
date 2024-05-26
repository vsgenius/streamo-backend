const streamModel = require('../../models/stream-model');

async function getAllStreams() {
  const streams = await streamModel.find({});
  return streams;
}

module.exports = getAllStreams;
