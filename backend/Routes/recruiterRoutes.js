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
  deleteJAF
} from "../Controllers/recruiterController.js";

const router = express.Router();

// Authentication routes
router.post("/recruiter/register", registerRecruiter);
router.post("/recruiter/login", loginRecruiter);
router.get("/recruiter/:email", getRecruiterByEmail);

// Profile routes
router.put("/recruiter/:email/complete-profile", completeProfile);

// JAF routes
router.post("/recruiter/:recruiterId/jaf", createJAF);
router.get("/recruiter/:recruiterId/jafs", getJAFsByRecruiter);
router.get("/jaf/:jafId", getJAFById);
router.put("/jaf/:jafId", updateJAF);
router.delete("/jaf/:jafId", deleteJAF);

export default router;