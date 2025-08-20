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
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ message: 'Error fetching companies', error: error.message });
  }
};

// READ a single company by ID
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.status(200).json(company);
  } catch (error) {
    console.error("Error fetching company:", error);
    res.status(500).json({ message: 'Error fetching company', error: error.message });
  }
};

// UPDATE a company by ID (Apply for job)
export const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, resumeLink } = req.body;
    
    // Validate required fields
    if (!email || !resumeLink) {
      return res.status(400).json({ 
        message: 'Email and resume link are required' 
      });
    }

    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Check if student has already applied
    const hasAlreadyApplied = company.applied_students.some(
      student => student.email === email
    );

    if (hasAlreadyApplied) {
      return res.status(400).json({ 
        message: 'Student has already applied to this company' 
      });
    }

    // Push student application (email + resume link) to applied_students array
    const updatedCompany = await Company.findByIdAndUpdate(
      id,
      { 
        $push: { 
          applied_students: {
            email: email,
            resumeLink: resumeLink,
            appliedAt: new Date()
          }
        } 
      },
      { new: true, runValidators: true }
    );

    if (!updatedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).json({
      message: 'Application submitted successfully',
      company: updatedCompany
    });

  } catch (error) {
    console.error("Error updating company:", error);
    res.status(400).json({ 
      message: 'Error updating company', 
      error: error.message 
    });
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

// GET applied students for a specific company
export const getAppliedStudents = async (req, res) => {
  try {
    const { id } = req.params;
    
    const company = await Company.findById(id).select('applied_students title role');
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).json({
      company: {
        title: company.title,
        role: company.role
      },
      applied_students: company.applied_students
    });

  } catch (error) {
    console.error("Error fetching applied students:", error);
    res.status(500).json({ 
      message: 'Error fetching applied students', 
      error: error.message 
    });
  }
};