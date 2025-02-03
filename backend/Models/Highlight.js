const mongoose = require('mongoose');

const HighlightSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date_of_post: { type: Date, required: true, default: Date.now },
  description: { type: String, required: true },
  gdrive_link: { type: String, required: false }
});

module.exports = mongoose.model('Highlight', HighlightSchema);
