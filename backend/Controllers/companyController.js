import Company from '../Models/Company.js';

// CREATE a new company
export const createCompany = async (req, res) => {
  try {
    console.log("Received data:", req.body); // Log incoming data
    
    const newCompany = new Company(req.body);
    await newCompany.save();
    
    console.log("Company created successfully:", newCompany);
    res.status(201).json(newCompany);
  } catch (error) {
    console.error("Error creating company:", error);
    console.error("Error details:", error.message);
    
    // More specific error handling
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation Error', 
        errors: errors,
        details: error.errors 
      });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: 'Duplicate field error', 
        error: error.keyValue 
      });
    }
    
    res.status(400).json({ 
      message: 'Error creating company', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// READ all companies
export const getAllCompanies = async (req, res) => {
  try {
    console.log("Fetching all companies");
    const companies = await Company.find().populate('applied_students');
    res.status(200).json(companies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ message: 'Error fetching companies', error: error.message });
  }
};

// READ a single company by ID
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id).populate('applied_students');
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.status(200).json(company);
  } catch (error) {
    console.error("Error fetching company:", error);
    res.status(500).json({ message: 'Error fetching company', error: error.message });
  }
};

// UPDATE a company by ID
export const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    if (company.applied_students.includes(email)) {
      return res.status(400).json({ message: 'Student has already applied to this company' });
    }

    // Push student email to applied_students array
    const updatedCompany = await Company.findByIdAndUpdate(
      id,
      { $push: { applied_students: email } }, // $push adds email to array
      { new: true, runValidators: true }
    );
    if (!updatedCompany) return res.status(404).json({ message: 'Company not found' });
    res.status(200).json(updatedCompany);
  } catch (error) {
    console.error("Error updating company:", error);
    res.status(400).json({ message: 'Error updating company', error: error.message });
  }
};

// DELETE a company by ID
export const deleteCompany = async (req, res) => {
  try {
    const deletedCompany = await Company.findByIdAndDelete(req.params.id);
    if (!deletedCompany) return res.status(404).json({ message: 'Company not found' });
    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (error) {
    console.error("Error deleting company:", error);
    res.status(500).json({ message: 'Error deleting company', error: error.message });
  }
};