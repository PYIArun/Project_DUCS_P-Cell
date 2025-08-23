import express from 'express';
import {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
  getAppliedStudents,
  getCompanyByJafId, 
  getCompaniesByRecruiter, 
  updateStudentStatus 
} from '../Controllers/companyController.js';

const router = express.Router();

// Basic CRUD operations
router.post('/company', createCompany);
router.get('/companies', getAllCompanies);
router.get('/company/:id', getCompanyById);
router.put('/company/:id', updateCompany);
router.delete('/company/:id', deleteCompany);

// Applied students management
router.get('/company/:id/applied-students', getAppliedStudents);
router.put('/company/:companyId/student-status', updateStudentStatus);

// JAF-related routes
router.get('/company/jaf/:jafId', getCompanyByJafId);
router.get('/companies/recruiter/:recruiterId', getCompaniesByRecruiter);

router.get('/recruiter/:recruiterId', async (req, res) => {
  try {
    const { recruiterId } = req.params;
    
    // Import your Company model
    const { default: Company } = await import('../Models/Company.js');
    
    // Find all companies that have JAFs created by this recruiter
    // You might need to adjust this query based on your Company model structure
    const companies = await Company.find({
      // Assuming you have a field that links to recruiter or JAF
      $or: [
        { recruiterId: recruiterId },
        { 'createdBy': recruiterId }
      ]
    });
    
    res.status(200).json(companies);
    
  } catch (error) {
    console.error('Error fetching companies by recruiter:', error);
    res.status(500).json({ 
      message: 'Error fetching companies',
      error: error.message 
    });
  }
});

export default router;