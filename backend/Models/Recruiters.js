import mongoose from "mongoose";

// ---------------- Recruiter Schema ----------------
const recruiterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  companyName: {
    type: String,
    required: [true, "Company name is required"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  registered: { type: String, enum: ["yes", "no"], default: "no" },
  profileCompleted: { type: Boolean, default: false },

  // Company Profile
  companyProfile: {
    telephoneNo: String,
    website: String,
    headHR: {
      name: String,
      email: String,
      mobileNumber: String,
    },
    secondContactPerson: {
      name: String,
      email: String,
      mobileNumber: String,
    },
  },

  // Reference to JAFs created
  jafs: [{ type: mongoose.Schema.Types.ObjectId, ref: "JAF" }],
}, { timestamps: true });

export const Recruiter = mongoose.model("Recruiter", recruiterSchema);
