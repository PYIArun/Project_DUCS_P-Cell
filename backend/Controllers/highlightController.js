const Highlight = require('../Models/Highlight');

const createHighlight = async (req, res) => {
  try {
    const newHighlight = new Highlight(req.body);
    await newHighlight.save();
    res.status(201).json(newHighlight);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getAllHighlights = async (req, res) => {
  try {
    const highlights = await Highlight.find()
      .sort({date_of_post : -1});
    res.status(200).json(highlights);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getHighlightById = async (req, res) => {
  try {
    const highlight = await Highlight.findById(req.params.id);
    if (!highlight) return res.status(404).json({ message: 'Highlight not found' });
    res.status(200).json(highlight);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const updateHighlight = async (req, res) => {
  try {
    const updatedHighlight = await Highlight.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedHighlight) return res.status(404).json({ message: 'Highlight not found' });
    res.status(200).json(updatedHighlight);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const deleteHighlight = async (req, res) => {
  try {
    const deletedHighlight = await Highlight.findByIdAndDelete(req.params.id);
    if (!deletedHighlight) return res.status(404).json({ message: 'Highlight not found' });
    res.status(200).json({ message: 'Highlight deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createHighlight,
  getAllHighlights,
  getHighlightById,
  updateHighlight,
  deleteHighlight
};

