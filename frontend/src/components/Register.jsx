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
    course: "",
    classRollNumber: "",
    examRollNumberUG: "",
    sgpa: "",
    numBacklogs: "",
    backlogDetails: "",
    collegeName: "",
    university: "",
    examRollNumberPG: "",
    cgpa: "",
    yearOfPassingPG: "",
    board12: "",
    examRollNumber12: "",
    percentage12: "",
    yearOfPassing12: "",
    board10: "",
    examRollNumber10: "",
    percentage10: "",
    yearOfPassing10: "",
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
      const sessionEmail = sessionStorage.getItem('userEmail'); // for backend lookup
      console.log(sessionEmail);
      if (!sessionEmail) {
        toast.error("No session email found!");
        return;
      }

      // Send session email separately + form data
      const dataToSend = { sessionEmail, ...formData };

      await axios.post("http://localhost:5000/student/register", dataToSend);
      toast.success("Registration Successful!");
    } catch (error) {
      toast.error("Registration Failed!");
      console.error("Registration Error:", error);
    }
  };

  const labelClass = "text-sm font-medium";
  const inputClass = "opacity-90";

  return (
    <div className="w-full min-h-screen flex justify-center items-start bg-gray-100 p-4">
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-xl p-8 space-y-6 overflow-y-auto h-[90vh]">
        {step === 1 && (
          <>
            <h2 className="text-xl font-semibold mb-4">Student Registration - Step 1</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Personal Information */}
              <div>
                <Label className={labelClass}>Email Address</Label>
                <Input
                  name="email"
                  value={sessionStorage.getItem('userEmail') || ""}
                  readOnly
                  className={inputClass}
                />
              </div>
              <div>
                <Label className={labelClass}>Name</Label>
                <Input name="name" placeholder="Full Name" className={inputClass} onChange={handleChange} />
              </div>
              <div>
                <Label className={labelClass}>Alternate Email</Label>
                <Input name="alternateEmail" placeholder="e.g. alt.email@gmail.com" className={inputClass} onChange={handleChange} />
              </div>
              <div>
                <Label className={labelClass}>Correspondence Address</Label>
                <Input name="correspondenceAddress" placeholder="Current Address" className={inputClass} onChange={handleChange} />
              </div>
              <div>
                <Label className={labelClass}>Permanent Address</Label>
                <Input name="permanentAddress" placeholder="Home Address" className={inputClass} onChange={handleChange} />
              </div>
              <div>
                <Label className={labelClass}>Phone Number</Label>
                <Input name="phoneNumber" placeholder="10-digit mobile" className={inputClass} onChange={handleChange} />
              </div>
              <div>
                <Label className={labelClass}>Alternative Phone Number</Label>
                <Input name="alternatePhoneNumber" placeholder="Optional mobile" className={inputClass} onChange={handleChange} />
              </div>
              <div>
                <Label className={labelClass}>Date of Birth</Label>
                <Input type="date" name="dob" className={inputClass} onChange={handleChange} />
              </div>
              <div>
                <Label className={labelClass}>Gender</Label>
                <Input name="gender" placeholder="Male / Female / Other" className={inputClass} onChange={handleChange} />
              </div>

              {/* Academic Info - UG */}
              <div>
                <Label className={labelClass}>Course</Label>
                <Input name="course" placeholder="e.g. B.Tech CSE" className={inputClass} onChange={handleChange} />
              </div>
              <div>
                <Label className={labelClass}>Class Roll Number</Label>
                <Input name="classRollNumber" placeholder="e.g. 22CS10001" className={inputClass} onChange={handleChange} />
              </div>
              <div>
                <Label className={labelClass}>Examination Roll Number (UG)</Label>
                <Input name="examRollNumberUG" placeholder="University Roll" className={inputClass} onChange={handleChange} />
              </div>
              <div>
                <Label className={labelClass}>SGPA</Label>
                <Input name="sgpa" placeholder="Semester GPA" className={inputClass} onChange={handleChange} />
              </div>
              <div>
                <Label className={labelClass}>Number of Backlogs</Label>
                <Input name="numBacklogs" placeholder="e.g. 0 / 1 / 2" className={inputClass} onChange={handleChange} />
              </div>
              <div className="md:col-span-2">
                <Label className={labelClass}>Details of Backlogs</Label>
                <Input name="backlogDetails" placeholder="Mention subjects, if any" className={inputClass} onChange={handleChange} />
              </div>

              {/* PG */}
              <div>
                <Label className={labelClass}>College Name</Label>
                <Input name="collegeName" placeholder="Current college name" className={inputClass} onChange={handleChange} />
              </div>
              <div>
                <Label className={labelClass}>University</Label>
                <Input name="university" placeholder="University name" className={inputClass} onChange={handleChange} />
              </div>
              <div>
                <Label className={labelClass}>Examination Roll Number (PG)</Label>
                <Input name="examRollNumberPG" placeholder="PG Roll Number" className={inputClass} onChange={handleChange} />
              </div>
              <div>
                <Label className={labelClass}>CGPA</Label>
                <Input name="cgpa" placeholder="Overall CGPA" className={inputClass} onChange={handleChange} />
              </div>
              <div>
                <Label className={labelClass}>Year of Passing (PG)</Label>
                <Input name="yearOfPassingPG" placeholder="YYYY" className={inputClass} onChange={handleChange} />
              </div>

              {/* 12th */}
              <div>
                <Label className={labelClass}>12th Board Name</Label>
                <Input name="board12" placeholder="CBSE / ISC / etc" className={inputClass} onChange={handleChange} />
              </div>
              <div>
                <Label className={labelClass}>12th Roll Number</Label>
                <Input name="examRollNumber12" placeholder="Exam Roll No" className={inputClass} onChange={handleChange} />
              </div>
              <div>
                <Label className={labelClass}>12th Percentage / CGPA</Label>
                <Input name="percentage12" placeholder="%" className={inputClass} onChange={handleChange} />
              </div>
              <div>
                <Label className={labelClass}>Year of Passing (12th)</Label>
                <Input name="yearOfPassing12" placeholder="YYYY" className={inputClass} onChange={handleChange} />
              </div>

              {/* 10th */}
              <div>
                <Label className={labelClass}>10th Board Name</Label>
                <Input name="board10" placeholder="CBSE / State Board" className={inputClass} onChange={handleChange} />
              </div>
              <div>
                <Label className={labelClass}>10th Roll Number</Label>
                <Input name="examRollNumber10" placeholder="Exam Roll No" className={inputClass} onChange={handleChange} />
              </div>
              <div>
                <Label className={labelClass}>10th Percentage / CGPA</Label>
                <Input name="percentage10" placeholder="%" className={inputClass} onChange={handleChange} />
              </div>
              <div>
                <Label className={labelClass}>Year of Passing (10th)</Label>
                <Input name="yearOfPassing10" placeholder="YYYY" className={inputClass} onChange={handleChange} />
              </div>

              {/* Resume & Marksheets */}
              <div>
                <Label className={labelClass}>Resume Google Drive Link</Label>
                <Input name="resumeLink" placeholder="https://drive.google.com/..." className={inputClass} onChange={handleChange} />
              </div>
              <div>
                <Label className={labelClass}>Marksheets Google Drive Folder</Label>
                <Input name="marksheetDriveLink" placeholder="PG, UG, 12th, 10th marksheets link" className={inputClass} onChange={handleChange} />
              </div>
            </div>

            <div className="pt-6">
              <Button onClick={() => setStep(2)}>Next</Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-xl font-semibold mb-4">Step 2 – Placement Policy Consent</h2>

            <p className="text-sm leading-6">
              In order to participate in the placement activities, you are kindly requested to carefully read and acknowledge the{" "}
              <a
                className="underline text-blue-600"
                href="https://your-placement-policy-link.com"
                target="_blank"
              >
                Placement Policy 2025–26
              </a>
              .
            </p>

            <p className="text-sm leading-6 mt-4">
              I have read and understood all the points mentioned in the Placement Policy, and I agree to adhere to it throughout the Placement Session
              2025–26. If I fail to comply with any of the clauses stated in the policy, I understand that I will be solely responsible for the consequences
              and agree to accept the decision of the Placement Team and the Placement Advisor as final and binding.
            </p>

            <div className="mt-4">
              <input
                type="checkbox"
                name="placementConsent"
                checked={formData.placementConsent}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="placementConsent" className="text-sm">
                I agree to the Placement Policy 2025–26
              </label>
            </div>

            <div className="pt-6 flex gap-4">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={handleSubmit}>Submit Registration</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
