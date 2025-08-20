import mongoose from "mongoose";

const jafSchema = new mongoose.Schema({
  // Reference to Recruiter
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recruiter',
    required: true,
  },
  recruiterEmail: {
    type: String,
    required: true,
  },
  
  // Job Specific Details (the main varying part)
  jobDetails: {
    jobProfile: {
      type: String,
      required: true,
    },
    jobDesignation: {
      type: String,
      required: true,
    },
    placeOfPosting: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
  },
  
  // Recruitment Type for this specific job
  recruitmentType: {
    internship: {
      type: Boolean,
      default: false,
    },
    fullTime: {
      type: Boolean,
      default: false,
    },
    internshipPlusFullTime: {
      type: Boolean,
      default: false,
    },
  },
  
  // Salary Details for this job
  salaryDetails: {
    annualPackage: {
      type: Number, // in Lakhs
      required: true,
    },
    ctcBreakage: {
      type: String,
      required: true,
    },
    // For internships
    stipend: {
      type: Number,
    },
  },
  
  // Job specific timeline (if different from company standard)
  placementTimeline: {
    onlineCodingTestDate: Date,
    interviewDate: Date,
  },
  
  // Additional job-specific requirements
  requirements: {
    requiredSkills: [String],
    preferredSkills: [String],
    minimumCGPA: Number,
    eligibleBranches: [String],
    experienceRequired: String,
  },
  
  // Status
  status: {
    type: String,
    enum: ['Draft', 'Submitted', 'Approved', 'Rejected'],
    default: 'Draft',
  },
  
  // Application Stats
  applicationStats: {
    totalApplications: {
      type: Number,
      default: 0,
    },
    shortlisted: {
      type: Number,
      default: 0,
    },
    selected: {
      type: Number,
      default: 0,
    },
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
jafSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const JAF = mongoose.model("JAF", jafSchema);
export default JAF;