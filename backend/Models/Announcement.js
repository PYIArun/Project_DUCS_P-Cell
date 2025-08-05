import mongoose from 'mongoose';

const AnnouncementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content_of_announcements: { type: String, required: true },
  date_of_announcements: {
    type: String,
    required: true,
    default: () => new Date().toISOString().split('T')[0] // Formats as YYYY-MM-DD
  },
  time_of_announcements: {
    type: String,
    required: true,
    default: () => new Date().toLocaleTimeString()
  }
});

const Announcement = mongoose.model('Announcement', AnnouncementSchema);
export default Announcement;
