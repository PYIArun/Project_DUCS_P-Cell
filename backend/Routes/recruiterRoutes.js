import express from "express";
import {
  registerRecruiter,
  loginRecruiter,
  getRecruiterByEmail,
  completeProfile,
  createJAF,
  getJAFsByRecruiter,
  getJAFById,
  updateJAF,
  deleteJAF,
  getRecruiterByCompanyName,
  getAllRecruiters,
} from "../Controllers/recruiterController.js";

const router = express.Router();

// Authentication routes (will be accessed as /recruiter/register, /recruiter/login)
router.post("/register", registerRecruiter);
router.post("/login", loginRecruiter);

// Get all recruiters (will be accessed as /recruiters when mounted at /recruiters)
// This route should be first to avoid conflicts with /:email
router.get("/", getAllRecruiters);

// Get recruiter by company name (for RecruiterProfileView component)
router.get("/company/:companyName", getRecruiterByCompanyName);

// Profile routes
router.put("/:email/complete-profile", completeProfile);

// JAF routes
router.post("/:recruiterId/jaf", createJAF);
router.get("/:recruiterId/jafs", getJAFsByRecruiter);
router.get("/jaf/:jafId", getJAFById);
router.put("/jaf/:jafId", updateJAF);
router.delete("/jaf/:jafId", deleteJAF);

// JAF applied students routes
router.get("/jaf/:jafId/applied-students", async (req, res) => {
  try {
    const { jafId } = req.params;
    
    // Import Company model here to avoid circular dependency
    const { default: Company } = await import('../Models/Company.js');
    
    // Find company linked to this JAF
    const company = await Company.findOne({ jafId: jafId });
    
    if (!company) {
      return res.status(404).json({ 
        message: 'No company found for this JAF',
        applied_students: []
      });
    }
    
    res.status(200).json({
      company: {
        title: company.title,
        role: company.role
      },
      applied_students: company.applied_students || []
    });
    
  } catch (error) {
    console.error("Error fetching applied students for JAF:", error);
    res.status(500).json({ 
      message: 'Error fetching applied students', 
      error: error.message,
      applied_students: []
    });
  }
});

// Update student status via JAF
router.put("/jaf/:jafId/student-status", async (req, res) => {
  try {
    const { jafId } = req.params;
    const { studentEmail, status } = req.body;
    
    if (!studentEmail || !status) {
      return res.status(400).json({ 
        message: 'Student email and status are required' 
      });
    }

    // Import Company model here to avoid circular dependency
    const { default: Company } = await import('../Models/Company.js');
    
    // Find company linked to this JAF
    const company = await Company.findOne({ jafId: jafId });
    
    if (!company) {
      return res.status(404).json({ message: 'No company found for this JAF' });
    }

    // Find and update the specific student's status
    const studentIndex = company.applied_students.findIndex(
      student => student.email === studentEmail
    );

    if (studentIndex === -1) {
      return res.status(404).json({ 
        message: 'Student application not found' 
      });
    }

    company.applied_students[studentIndex].status = status;
    company.applied_students[studentIndex].statusUpdatedAt = new Date();
    await company.save();

    res.status(200).json({
      message: 'Student status updated successfully',
      updatedStudent: company.applied_students[studentIndex]
    });

  } catch (error) {
    console.error("Error updating student status via JAF:", error);
    res.status(500).json({ 
      message: 'Error updating student status', 
      error: error.message 
    });
  }
});

// Get recruiter by email -
router.get("/:email", getRecruiterByEmail);

export default router;