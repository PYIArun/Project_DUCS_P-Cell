import express from 'express';
import { createStudent, getStudentByEmail } from '../Controllers/studentController.js'; // Add .js extension

const router = express.Router(); // Assign router to a variable

router.post('/student/new', createStudent);
router.get('/student/:email', getStudentByEmail);

export default router; // Use export default when using ES modules
