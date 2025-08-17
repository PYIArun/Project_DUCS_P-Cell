"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import axios from "axios";

export default function RegistrationPage() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    alternateEmail: "",
    correspondenceAddress: "",
    permanentAddress: "",
    phoneNumber: "",
    alternatePhoneNumber: "",
    dob: "",
    gender: "",
    // PG Details
    pgCourse: "",
    pgClassRollNumber: "",
    pgExamRollNumber: "",
    pgCgpa: "",
    pgNumBacklogs: "",
    pgBacklogDetails: "",
    // UG Details
    ugCollegeName: "",
    ugUniversity: "",
    ugCourse: "",
    ugExamRollNumber: "",
    ugCgpa: "",
    ugYearOfPassing: "",
    // 12th Details
    board12: "",
    examRollNumber12: "",
    percentage12: "",
    yearOfPassing12: "",
    // 10th Details
    board10: "",
    examRollNumber10: "",
    percentage10: "",
    yearOfPassing10: "",
    // Documents
    resumeLink: "",
    marksheetDriveLink: "",
    placementConsent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    if (!formData.placementConsent) {
      toast.error("Please accept the placement policy to continue.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const sessionEmail = sessionStorage.getItem('userEmail');
      console.log(sessionEmail);
      if (!sessionEmail) {
        toast.error("No session email found!");
        return;
      }

      const dataToSend = { sessionEmail, ...formData };
      await axios.post("http://localhost:5000/student/register", dataToSend);
      toast.success("Registration Successful!");
    } catch (error) {
      toast.error("Registration Failed!");
      console.error("Registration Error:", error);
    }
  };

  const labelClass = "text-sm font-medium text-gray-700";
  const inputClass = "opacity-90";
  const sectionHeaderClass = "text-lg font-semibold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4";

  return (
    <div className="w-full min-h-screen flex justify-center items-start bg-gray-50 p-4">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8 space-y-8 overflow-y-auto max-h-[90vh]">
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Student Registration Form</h2>
            
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className={sectionHeaderClass}>Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className={labelClass}>Email Address</Label>
                  <Input
                    name="email"
                    value={sessionStorage.getItem('userEmail') || ""}
                    readOnly
                    className={`${inputClass} bg-gray-100`}
                  />
                </div>
                <div>
                  <Label className={labelClass}>Full Name *</Label>
                  <Input 
                    name="name" 
                    placeholder="Enter your full name" 
                    className={inputClass} 
                    onChange={handleChange} 
                    required
                  />
                </div>
                <div>
                  <Label className={labelClass}>Alternate Email</Label>
                  <Input 
                    name="alternateEmail" 
                    placeholder="alternate@email.com" 
                    className={inputClass} 
                    onChange={handleChange} 
                  />
                </div>
                <div>
                  <Label className={labelClass}>Phone Number *</Label>
                  <Input 
                    name="phoneNumber" 
                    placeholder="10-digit mobile number" 
                    className={inputClass} 
                    onChange={handleChange} 
                    required
                  />
                </div>
                <div>
                  <Label className={labelClass}>Alternative Phone Number</Label>
                  <Input 
                    name="alternatePhoneNumber" 
                    placeholder="Optional mobile number" 
                    className={inputClass} 
                    onChange={handleChange} 
                  />
                </div>
                <div>
                  <Label className={labelClass}>Date of Birth *</Label>
                  <Input 
                    type="date" 
                    name="dob" 
                    className={inputClass} 
                    onChange={handleChange} 
                    required
                  />
                </div>
                <div>
                  <Label className={labelClass}>Gender *</Label>
                  <select 
                    name="gender" 
                    className={`${inputClass} w-full px-3 py-2 border border-gray-300 rounded-md`}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label className={labelClass}>Correspondence Address *</Label>
                  <Input 
                    name="correspondenceAddress" 
                    placeholder="Current address for correspondence" 
                    className={inputClass} 
                    onChange={handleChange} 
                    required
                  />
                </div>
                <div>
                  <Label className={labelClass}>Permanent Address *</Label>
                  <Input 
                    name="permanentAddress" 
                    placeholder="Permanent home address" 
                    className={inputClass} 
                    onChange={handleChange} 
                    required
                  />
                </div>
              </div>
            </div>

            {/* PG Details Section */}
            <div className="space-y-4">
              <h3 className={sectionHeaderClass}>Post Graduate (PG) Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className={labelClass}>PG Course *</Label>
                  <select 
                    name="pgCourse" 
                    className={`${inputClass} w-full px-3 py-2 border border-gray-300 rounded-md`}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select PG Course</option>
                    <option value="MCA">MCA</option>
                    <option value="MSc">MSc</option>
                  </select>
                </div>
                <div>
                  <Label className={labelClass}>PG Class Roll Number *</Label>
                  <Input 
                    name="pgClassRollNumber" 
                    placeholder="e.g., 24MCA001" 
                    className={inputClass} 
                    onChange={handleChange} 
                    required
                  />
                </div>
                <div>
                  <Label className={labelClass}>PG Examination Roll Number *</Label>
                  <Input 
                    name="pgExamRollNumber" 
                    placeholder="University examination roll number" 
                    className={inputClass} 
                    onChange={handleChange} 
                    required
                  />
                </div>
                <div>
                  <Label className={labelClass}>PG CGPA *</Label>
                  <Input 
                    name="pgCgpa" 
                    placeholder="Current overall CGPA" 
                    className={inputClass} 
                    onChange={handleChange} 
                    required
                  />
                </div>
                <div>
                  <Label className={labelClass}>Number of Backlogs (in PG) *</Label>
                  <Input 
                    name="pgNumBacklogs" 
                    placeholder="e.g., 0, 1, 2" 
                    className={inputClass} 
                    onChange={handleChange} 
                    required
                  />
                </div>
                <div>
                  <Label className={labelClass}>Details of Backlogs</Label>
                  <Input 
                    name="pgBacklogDetails" 
                    placeholder="Mention subjects if any, otherwise write 'None'" 
                    className={inputClass} 
                    onChange={handleChange} 
                  />
                </div>
              </div>
            </div>

            {/* UG Details Section */}
            <div className="space-y-4">
              <h3 className={sectionHeaderClass}>Under Graduate (UG) Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className={labelClass}>UG College Name *</Label>
                  <Input 
                    name="ugCollegeName" 
                    placeholder="Name of your undergraduate college" 
                    className={inputClass} 
                    onChange={handleChange} 
                    required
                  />
                </div>
                <div>
                  <Label className={labelClass}>UG University Name *</Label>
                  <Input 
                    name="ugUniversity" 
                    placeholder="Name of your undergraduate university" 
                    className={inputClass} 
                    onChange={handleChange} 
                    required
                  />
                </div>
                <div>
                  <Label className={labelClass}>UG Course Name *</Label>
                  <Input 
                    name="ugCourse" 
                    placeholder="e.g., B.Tech CSE, B.Sc Computer Science" 
                    className={inputClass} 
                    onChange={handleChange} 
                    required
                  />
                </div>
                <div>
                  <Label className={labelClass}>UG Examination Roll Number *</Label>
                  <Input 
                    name="ugExamRollNumber" 
                    placeholder="University examination roll number" 
                    className={inputClass} 
                    onChange={handleChange} 
                    required
                  />
                </div>
                <div>
                  <Label className={labelClass}>UG CGPA *</Label>
                  <Input 
                    name="ugCgpa" 
                    placeholder="Overall CGPA" 
                    className={inputClass} 
                    onChange={handleChange} 
                    required
                  />
                </div>
                <div>
                  <Label className={labelClass}>UG Year of Passing *</Label>
                  <Input 
                    name="ugYearOfPassing" 
                    placeholder="YYYY" 
                    className={inputClass} 
                    onChange={handleChange} 
                    required
                  />
                </div>
              </div>
            </div>

            {/* 12th Details Section */}
            <div className="space-y-4">
              <h3 className={sectionHeaderClass}>12th Standard Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className={labelClass}>Board Name *</Label>
                  <Input 
                    name="board12" 
                    placeholder="e.g., CBSE, ICSE, State Board" 
                    className={inputClass} 
                    onChange={handleChange} 
                    required
                  />
                </div>
                <div>
                  <Label className={labelClass}>Examination Roll Number *</Label>
                  <Input 
                    name="examRollNumber12" 
                    placeholder="12th exam roll number" 
                    className={inputClass} 
                    onChange={handleChange} 
                    required
                  />
                </div>
                <div>
                  <Label className={labelClass}>Percentage or CGPA *</Label>
                  <Input 
                    name="percentage12" 
                    placeholder="e.g., 85% or 8.5 CGPA" 
                    className={inputClass} 
                    onChange={handleChange} 
                    required
                  />
                </div>
                <div>
                  <Label className={labelClass}>Year of Passing *</Label>
                  <Input 
                    name="yearOfPassing12" 
                    placeholder="YYYY" 
                    className={inputClass} 
                    onChange={handleChange} 
                    required
                  />
                </div>
              </div>
            </div>

            {/* 10th Details Section */}
            <div className="space-y-4">
              <h3 className={sectionHeaderClass}>10th Standard Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className={labelClass}>Board Name *</Label>
                  <Input 
                    name="board10" 
                    placeholder="e.g., CBSE, ICSE, State Board" 
                    className={inputClass} 
                    onChange={handleChange} 
                    required
                  />
                </div>
                <div>
                  <Label className={labelClass}>Examination Roll Number *</Label>
                  <Input 
                    name="examRollNumber10" 
                    placeholder="10th exam roll number" 
                    className={inputClass} 
                    onChange={handleChange} 
                    required
                  />
                </div>
                <div>
                  <Label className={labelClass}>Percentage or CGPA *</Label>
                  <Input 
                    name="percentage10" 
                    placeholder="e.g., 90% or 9.0 CGPA" 
                    className={inputClass} 
                    onChange={handleChange} 
                    required
                  />
                </div>
                <div>
                  <Label className={labelClass}>Year of Passing *</Label>
                  <Input 
                    name="yearOfPassing10" 
                    placeholder="YYYY" 
                    className={inputClass} 
                    onChange={handleChange} 
                    required
                  />
                </div>
              </div>
            </div>

            {/* Documents Section */}
            <div className="space-y-4">
              <h3 className={sectionHeaderClass}>Documents</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label className={labelClass}>Resume Link *</Label>
                  <Input 
                    name="resumeLink" 
                    placeholder="https://drive.google.com/... (Google Drive link)" 
                    className={inputClass} 
                    onChange={handleChange} 
                    required
                  />
                </div>
                <div>
                  <Label className={labelClass}>Upload Marksheets (PG, UG, 12th, 10th) *</Label>
                  <Input 
                    name="marksheetDriveLink" 
                    placeholder="https://drive.google.com/... (Google Drive folder link)" 
                    className={inputClass} 
                    onChange={handleChange} 
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Please upload all marksheets (PG, UG, 12th, 10th) in a single drive folder and share the link</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t">
              <Button onClick={() => setStep(2)} className="px-8 py-2">
                Next: Review & Consent
              </Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Placement Policy Consent</h2>

            <div className="bg-blue-50 p-6 rounded-lg space-y-4">
              <p className="text-sm leading-relaxed text-gray-700">
                In order to participate in the placement activities, you are kindly requested to carefully read and acknowledge the{" "}
                <a
                  className="underline text-blue-600 hover:text-blue-800"
                  href="https://your-placement-policy-link.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Placement Policy 2025–26
                </a>
                .
              </p>

              <p className="text-sm leading-relaxed text-gray-700">
                I have read and understood all the points mentioned in the Placement Policy, and I agree to adhere to it throughout the Placement Session
                2025–26. If I fail to comply with any of the clauses stated in the policy, I understand that I will be solely responsible for the consequences
                and agree to accept the decision of the Placement Team and the Placement Advisor as final and binding.
              </p>

              <div className="flex items-center mt-6 p-4 bg-white rounded border">
                <input
                  type="checkbox"
                  name="placementConsent"
                  checked={formData.placementConsent}
                  onChange={handleChange}
                  className="mr-3 w-4 h-4"
                  required
                />
                <label htmlFor="placementConsent" className="text-sm font-medium text-gray-800">
                  I agree to the Placement Policy 2025–26 *
                </label>
              </div>
            </div>

            <div className="flex gap-4 pt-6 border-t">
              <Button variant="outline" onClick={() => setStep(1)} className="px-8 py-2">
                Back
              </Button>
              <Button 
                onClick={handleSubmit} 
                className="px-8 py-2 bg-[#72265F] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg hover:bg-[#602050]"
                disabled={!formData.placementConsent}
              >
                Submit Registration
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}