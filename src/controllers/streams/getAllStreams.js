const getAllStreams = require('../../service/stream/getAllStreams');

async function getStreams(req, res, next) {
  try {
    const streams = await getAllStreams();
    return res.json(streams);
  } catch (e) {
    next(e);
  }
}

module.exports = getStreams;
