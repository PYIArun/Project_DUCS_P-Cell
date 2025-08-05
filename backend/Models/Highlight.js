import mongoose from 'mongoose';

const HighlightSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date_of_post: { type: String, required: true, default: Date.now },
  gdrive_link: { type: String, required: false }
});

const Highlight = mongoose.model('Highlight', HighlightSchema);
export default Highlight;
