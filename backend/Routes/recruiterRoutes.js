import express from "express";
import { registerRecruiter, loginRecruiter, getRecruiterByEmail } 
  from "../Controllers/recruiterController.js";

const router = express.Router();

router.post("/recruiter/register", registerRecruiter);
router.post("/recruiter/login", loginRecruiter);
router.get("/recruiter/:email", getRecruiterByEmail);

export default router;
