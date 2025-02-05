const StudentAuth = require('../Models/StudentAuth');

const createStudent = async (req, res) => {
  try {
    const newStudent = new StudentAuth(req.body);
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getStudentByEmail = async (req, res) => {
  try {
    const student = await StudentAuth.find({email: req.params.email});
    if (!student) {
        // alert("You are not Validated!");
        return res.status(404).json({ message: 'Student not authentic' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {createStudent, getStudentByEmail};