import bcrypt from "bcryptjs";
import Recruiter from "../Models/Recruiters.js";

// ===============================
// REGISTER RECRUITER
// ===============================
export const registerRecruiter = async (req, res) => {
  try {
    const { email, companyName, password } = req.body;

    if (!email || !companyName || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if recruiter already exists
    const existingRecruiter = await Recruiter.findOne({ email });
    if (existingRecruiter) {
      return res.status(400).json({ message: "Recruiter already registered." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newRecruiter = new Recruiter({
      email,
      companyName,
      password: hashedPassword,
      registered: "yes",
    });

    await newRecruiter.save();

    res.status(201).json({
      message: "Recruiter registered successfully.",
      recruiter: { email, companyName },
    });
  } catch (error) {
    console.error("Error in registerRecruiter:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// ===============================
// LOGIN RECRUITER
// ===============================
export const loginRecruiter = async (req, res) => {
  try {
    const { email, password } = req.body;

    const recruiter = await Recruiter.findOne({ email });
    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found." });
    }

    const isMatch = await bcrypt.compare(password, recruiter.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    res.status(200).json({
      message: "Login successful",
      recruiter: { email: recruiter.email, companyName: recruiter.companyName },
    });
  } catch (error) {
    console.error("Error in loginRecruiter:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// ===============================
// GET RECRUITER BY EMAIL
// ===============================
export const getRecruiterByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    let recruiter = await Recruiter.findOne({ email });

    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found." });
    }

    res.status(200).json(recruiter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
