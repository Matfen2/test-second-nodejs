const mongoose = require('mongoose');

const gamesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  studio: { type: String, required: true },
  description: { type: String, required: true },
});

const Games = mongoose.model('Games', gamesSchema);

module.exports = Games;
