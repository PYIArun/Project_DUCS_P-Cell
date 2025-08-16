import Company from '../Models/Company.js';

// CREATE a new company
export const createCompany = async (req, res) => {
  try {
    const newCompany = new Company(req.body);
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(400).json({ message: 'Error creating company', error });
  }
};

// READ all companies
export const getAllCompanies = async (req, res) => {
  try {
    console.log("here");
    const companies = await Company.find().populate('applied_students');
    res.status(200).json(companies);
  } catch (error) {
    console.log("here");
    res.status(500).json({ message: 'Error fetching companies', error });
  }
};

// READ a single company by ID
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id).populate('applied_students');
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching company', error });
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
    res.status(400).json({ message: 'Error updating company', error });
  }
};

// DELETE a company by ID
export const deleteCompany = async (req, res) => {
  try {
    const deletedCompany = await Company.findByIdAndDelete(req.params.id);
    if (!deletedCompany) return res.status(404).json({ message: 'Company not found' });
    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting company', error });
  }
};
