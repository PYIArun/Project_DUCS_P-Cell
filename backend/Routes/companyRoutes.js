import express from 'express';
import {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany
} from '../Controllers/companyController.js';

const router = express.Router();

router.post('/company', createCompany);
router.get('/companies', getAllCompanies);
router.get('/company/:id', getCompanyById);
router.put('/company/:id', updateCompany);
router.delete('/company/:id', deleteCompany);

export default router;
