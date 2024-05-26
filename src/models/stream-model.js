const { Schema, model } = require('mongoose');

const streamSchema = new Schema({
  name_channel: { type: String, required: true },
  name_stream: { type: String, required: true },
  link: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = model('Stream', streamSchema);
