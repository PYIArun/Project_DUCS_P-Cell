import express from 'express';
import {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement
} from '../Controllers/announcementController.js';

const router = express.Router();
router.post('/announcements', createAnnouncement);
router.get('/announcements', getAllAnnouncements);
router.get('/announcements/:id', getAnnouncementById);
router.put('/announcements/:id', updateAnnouncement);
router.delete('/announcements/:id', deleteAnnouncement);

export default router;
