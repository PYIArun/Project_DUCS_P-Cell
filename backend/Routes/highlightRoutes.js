import express from 'express';
import { createHighlight, getAllHighlights, getHighlightById, updateHighlight, deleteHighlight } from '../Controllers/highlightController.js';

const router = express.Router();

router.post('/highlights', createHighlight);
router.get('/highlights', getAllHighlights);
router.get('/highlights/:id', getHighlightById);
router.put('/highlights/:id', updateHighlight);
router.delete('/highlights/:id', deleteHighlight);

export default router;
