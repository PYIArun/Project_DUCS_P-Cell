const express = require('express');
const { createHighlight, getAllHighlights, getHighlightById, updateHighlight, deleteHighlight } = require('../Controllers/highlightController');

const router = express.Router();

router.post('/highlights', createHighlight);
router.get('/allhighlights', getAllHighlights);
router.get('/highlights/:id', getHighlightById);
router.put('/highlights/:id', updateHighlight);
router.delete('/highlights/:id', deleteHighlight);

module.exports = router;
