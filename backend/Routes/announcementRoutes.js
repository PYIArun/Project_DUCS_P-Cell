const express = require('express');
const router = express.Router();
const {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement
} = require('../Controllers/announcementController'); // Ensure the path is correct

// Routes
router.post('/announcements', createAnnouncement);
router.get('/announcements', getAllAnnouncements);
router.get('/announcements/:id', getAnnouncementById);
router.put('/announcements/:id', updateAnnouncement);
router.delete('/announcements/:id', deleteAnnouncement);

module.exports = router;
