const mongoose = require('mongoose');

const AnnoucementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content_of_announcements: { type: String, required: true },
  date_of_announcements: { type: String, required: true, default: Date.now },
  time_of_announcements: { type: String, required: true, default: () => new Date().toLocaleTimeString() } // Fixed semicolon to comma
});

module.exports = mongoose.model('Annoucement', AnnoucementSchema);
