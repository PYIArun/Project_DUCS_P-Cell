import mongoose from "mongoose";

// Job Profile Schema
const jobProfileSchema = new mongoose.Schema({
  jobProfile: {
    type: String,
    required: true,
    trim: true,
  },
  jobDesignation: {
    type: String,
    required: true,
    trim: true,
  },
  placeOfPosting: {
    type: String,
    required: true,
    trim: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  annualPackage: {
    type: String,
    required: true,
  },
  breakageOfCTC: {
    type: String,
    required: true,
  },
});

// Selection Process Schema
const selectionProcessSchema = new mongoose.Schema({
  prePlacementTalk: {
    type: String,
    enum: ["YES", "NO"],
    required: true,
  },
  onlineAssessment: {
    type: String,
    enum: ["YES", "NO"],
    required: true,
  },
  personalTechnicalInterview: {
    type: String,
    enum: ["YES", "NO"],
    required: true,
  },
  hrRound: {
    type: String,
    enum: ["YES", "NO"],
    required: true,
  },
  anyOtherRounds: {
    type: String,
    default: "",
  },
});

// Job Application Form Schema
const jafSchema = new mongoose.Schema({
  // Company Details
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  telephoneNo: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  website: {
    type: String,
    required: true,
  },
  
  // Contact Details
  headHR: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
  },
  secondContactPerson: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
  },
  
  // Courses Allowed
  coursesAllowed: {
    msc: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
    },
    mca: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
    },
  },
  
  // Recruitment Type
  recruitmentType: {
    internship: {
      type: String,
      enum: ["YES", "NO"],
      required: true,
    },
    fullTime: {
      type: String,
      enum: ["YES", "NO"],
      required: true,
    },
    internshipPlusFullTime: {
      type: String,
      enum: ["YES", "NO"],
      required: true,
    },
  },
  
  // Job Details (Array of job profiles)
  jobProfiles: [jobProfileSchema],
  
  // Selection Process
  selectionProcess: selectionProcessSchema,
  
  // Timeline
  timeline: {
    onlineCodingTestDate: {
      type: Date,
    },
    interviewDate: {
      type: Date,
    },
  },
  
  // Status
  status: {
    type: String,
    enum: ["draft", "submitted", "approved", "rejected"],
    default: "draft",
  },
  
  // Recruiter reference
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recruiter",
    required: true,
  },
}, { timestamps: true });

// Updated Recruiter Schema
const recruiterSchema = new mongoose.Schema(
  {
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
    registered: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
    profileCompleted: {
      type: Boolean,
      default: false,
    },
    // Company Profile Details
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
    // Reference to JAFs created by this recruiter
    jafs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "JAF",
    }],
  },
  { timestamps: true }
);

// Export models
export const JAF = mongoose.model("JAF", jafSchema);
export const Recruiter = mongoose.model("Recruiter", recruiterSchema);