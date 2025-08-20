import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Recruiter from "../Models/Recruiters.js";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret"; // put in .env

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

    // create JWT token
    const token = jwt.sign(
      { id: newRecruiter._id, role: "recruiter" },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(201).json({
      message: "Recruiter registered successfully.",
      token
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
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, recruiter.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ JWT_SECRET must be set in .env
    const token = jwt.sign(
      { id: recruiter._id, role: "recruiter" },
      process.env.JWT_SECRET || "supersecret",
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
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
