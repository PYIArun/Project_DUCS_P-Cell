import mongoose from "mongoose";

const jafSchema = new mongoose.Schema({
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recruiter",
    required: true,
  },
  coursesAllowed: {
    msc: { type: String, default: "No" },
    mca: { type: String, default: "No" },
  },
  recruitmentType: {
    internship: { type: String, default: "NO" }, 
    fullTime: { type: String, default: "NO" },
    internshipPlusFullTime: { type: String, default: "NO" },
  },
  jobProfile: {
    jobProfile: { type: String, required: true },
    jobDesignation: { type: String, required: true },
    placeOfPosting: { type: String },
    jobDescription: { type: String },
    annualPackage: { type: String },
    breakageOfCTC: { type: String },
  },
  selectionProcess: {
    prePlacementTalk: { type: String, default: "NO" },
    onlineAssessment: { type: String, default: "NO" },
    personalTechnicalInterview: { type: String, default: "NO" },
    hrRound: { type: String, default: "NO" },
    anyOtherRounds: { type: String, default: "" },
  },
  status: { type: String, enum: ["draft", "submitted", "approved", "rejected"], default: "draft" },
  timeline: {
    onlineCodingTestDate: { type: String, default: "" },
    interviewDate: { type: String, default: "" },
  }
}, { timestamps: true });

export const JAF = mongoose.model("JAF", jafSchema);
