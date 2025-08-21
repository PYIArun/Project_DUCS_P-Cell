import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Recruiter, JAF } from "../Models/Recruiters.js";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

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
      profileCompleted: false,
    });

    await newRecruiter.save();

    // Create JWT token
    const token = jwt.sign(
      { id: newRecruiter._id, role: "recruiter" },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Recruiter registered successfully.",
      token,
      recruiter: {
        id: newRecruiter._id,
        email: newRecruiter.email,
        companyName: newRecruiter.companyName,
        profileCompleted: newRecruiter.profileCompleted,
      }
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

    const token = jwt.sign(
      { id: recruiter._id, role: "recruiter" },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ 
      message: "Login successful", 
      token,
      recruiter: {
        id: recruiter._id,
        email: recruiter.email,
        companyName: recruiter.companyName,
        profileCompleted: recruiter.profileCompleted,
      }
    });
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

    let recruiter = await Recruiter.findOne({ email }).populate('jafs');

    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found." });
    }

    res.status(200).json({
      id: recruiter._id,
      email: recruiter.email,
      companyName: recruiter.companyName,
      registered: recruiter.registered,
      profileCompleted: recruiter.profileCompleted,
      companyProfile: recruiter.companyProfile,
      jafs: recruiter.jafs,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ===============================
// COMPLETE RECRUITER PROFILE
// ===============================
export const completeProfile = async (req, res) => {
  try {
    const { email } = req.params;
    const { telephoneNo, website, headHR, secondContactPerson } = req.body;

    const recruiter = await Recruiter.findOne({ email });
    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found." });
    }

    recruiter.companyProfile = {
      telephoneNo,
      website,
      headHR,
      secondContactPerson,
    };
    recruiter.profileCompleted = true;

    await recruiter.save();

    res.status(200).json({
      message: "Profile completed successfully",
      recruiter: {
        id: recruiter._id,
        email: recruiter.email,
        companyName: recruiter.companyName,
        profileCompleted: recruiter.profileCompleted,
        companyProfile: recruiter.companyProfile,
      }
    });
  } catch (error) {
    console.error("Error completing profile:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// ===============================
// CREATE JAF
// ===============================
export const createJAF = async (req, res) => {
  try {
    const { recruiterId } = req.params;
    const jafData = req.body;

    const recruiter = await Recruiter.findById(recruiterId);
    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found." });
    }

    if (!recruiter.profileCompleted) {
      return res.status(400).json({ message: "Please complete your profile first." });
    }

    // Create new JAF
    const newJAF = new JAF({
      ...jafData,
      recruiterId,
      status: "submitted",
    });

    await newJAF.save();

    // Add JAF reference to recruiter
    recruiter.jafs.push(newJAF._id);
    await recruiter.save();

    res.status(201).json({
      message: "JAF created successfully",
      jaf: newJAF,
    });
  } catch (error) {
    console.error("Error creating JAF:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// ===============================
// GET JAFs BY RECRUITER
// ===============================
export const getJAFsByRecruiter = async (req, res) => {
  try {
    const { recruiterId } = req.params;

    const jafs = await JAF.find({ recruiterId }).sort({ createdAt: -1 });

    res.status(200).json(jafs);
  } catch (error) {
    console.error("Error fetching JAFs:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// ===============================
// GET SINGLE JAF
// ===============================
export const getJAFById = async (req, res) => {
  try {
    const { jafId } = req.params;

    const jaf = await JAF.findById(jafId).populate('recruiterId', 'email companyName');

    if (!jaf) {
      return res.status(404).json({ message: "JAF not found." });
    }

    res.status(200).json(jaf);
  } catch (error) {
    console.error("Error fetching JAF:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// ===============================
// UPDATE JAF
// ===============================
export const updateJAF = async (req, res) => {
  try {
    const { jafId } = req.params;
    const updateData = req.body;

    const jaf = await JAF.findByIdAndUpdate(
      jafId, 
      updateData, 
      { new: true, runValidators: true }
    );

    if (!jaf) {
      return res.status(404).json({ message: "JAF not found." });
    }

    res.status(200).json({
      message: "JAF updated successfully",
      jaf,
    });
  } catch (error) {
    console.error("Error updating JAF:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// ===============================
// DELETE JAF
// ===============================
export const deleteJAF = async (req, res) => {
  try {
    const { jafId } = req.params;

    const jaf = await JAF.findByIdAndDelete(jafId);

    if (!jaf) {
      return res.status(404).json({ message: "JAF not found." });
    }

    // Remove JAF reference from recruiter
    await Recruiter.findByIdAndUpdate(
      jaf.recruiterId,
      { $pull: { jafs: jafId } }
    );

    res.status(200).json({ message: "JAF deleted successfully" });
  } catch (error) {
    console.error("Error deleting JAF:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};