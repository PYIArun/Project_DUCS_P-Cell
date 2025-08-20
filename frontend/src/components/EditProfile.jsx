import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Pencil, Save, X } from "lucide-react";
// axios import removed for demo - replace with your actual HTTP client

const EditProfile = () => {
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

  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [originalData, setOriginalData] = useState({});

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      // Get email from sessionStorage or your auth system
      const userEmail = sessionStorage.getItem('userEmail');
      if (!userEmail) {
        toast.error("No user session found!");
        return;
      }

      // Fetch student data using the getStudentByEmail endpoint
      const response = await fetch(`http://localhost:5000/student/${userEmail}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch student data');
      }
      
      const studentData = await response.json();
      
      // Set form data from API response
      setFormData({
        email: studentData.email || "",
        name: studentData.name || "",
        alternateEmail: studentData.alternateEmail || "",
        correspondenceAddress: studentData.correspondenceAddress || "",
        permanentAddress: studentData.permanentAddress || "",
        phoneNumber: studentData.phoneNumber || "",
        alternatePhoneNumber: studentData.alternatePhoneNumber || "",
        dob: studentData.dob ? new Date(studentData.dob).toISOString().split('T')[0] : "",
        gender: studentData.gender || "",
        // PG Details
        pgCourse: studentData.pgCourse || "",
        pgClassRollNumber: studentData.pgClassRollNumber || "",
        pgExamRollNumber: studentData.pgExamRollNumber || "",
        pgCgpa: studentData.pgCgpa || "",
        pgNumBacklogs: studentData.pgNumBacklogs || "",
        pgBacklogDetails: studentData.pgBacklogDetails || "",
        // UG Details
        ugCollegeName: studentData.ugCollegeName || "",
        ugUniversity: studentData.ugUniversity || "",
        ugCourse: studentData.ugCourse || "",
        ugExamRollNumber: studentData.ugExamRollNumber || "",
        ugCgpa: studentData.ugCgpa || "",
        ugYearOfPassing: studentData.ugYearOfPassing || "",
        // 12th Details
        board12: studentData.board12 || "",
        examRollNumber12: studentData.examRollNumber12 || "",
        percentage12: studentData.percentage12 || "",
        yearOfPassing12: studentData.yearOfPassing12 || "",
        // 10th Details
        board10: studentData.board10 || "",
        examRollNumber10: studentData.examRollNumber10 || "",
        percentage10: studentData.percentage10 || "",
        yearOfPassing10: studentData.yearOfPassing10 || "",
        // Documents
        resumeLink: studentData.resumeLink || "",
        marksheetDriveLink: studentData.marksheetDriveLink || "",
        placementConsent: studentData.placementConsent || false,
      });
      
      // Store original data for cancel functionality
      setOriginalData({
        email: studentData.email || "",
        name: studentData.name || "",
        alternateEmail: studentData.alternateEmail || "",
        correspondenceAddress: studentData.correspondenceAddress || "",
        permanentAddress: studentData.permanentAddress || "",
        phoneNumber: studentData.phoneNumber || "",
        alternatePhoneNumber: studentData.alternatePhoneNumber || "",
        dob: studentData.dob ? new Date(studentData.dob).toISOString().split('T')[0] : "",
        gender: studentData.gender || "",
        // PG Details
        pgCourse: studentData.pgCourse || "",
        pgClassRollNumber: studentData.pgClassRollNumber || "",
        pgExamRollNumber: studentData.pgExamRollNumber || "",
        pgCgpa: studentData.pgCgpa || "",
        pgNumBacklogs: studentData.pgNumBacklogs || "",
        pgBacklogDetails: studentData.pgBacklogDetails || "",
        // UG Details
        ugCollegeName: studentData.ugCollegeName || "",
        ugUniversity: studentData.ugUniversity || "",
        ugCourse: studentData.ugCourse || "",
        ugExamRollNumber: studentData.ugExamRollNumber || "",
        ugCgpa: studentData.ugCgpa || "",
        ugYearOfPassing: studentData.ugYearOfPassing || "",
        // 12th Details
        board12: studentData.board12 || "",
        examRollNumber12: studentData.examRollNumber12 || "",
        percentage12: studentData.percentage12 || "",
        yearOfPassing12: studentData.yearOfPassing12 || "",
        // 10th Details
        board10: studentData.board10 || "",
        examRollNumber10: studentData.examRollNumber10 || "",
        percentage10: studentData.percentage10 || "",
        yearOfPassing10: studentData.yearOfPassing10 || "",
        // Documents
        resumeLink: studentData.resumeLink || "",
        marksheetDriveLink: studentData.marksheetDriveLink || "",
        placementConsent: studentData.placementConsent || false,
      });
    } catch (error) {
      toast.error("Failed to fetch profile data!");
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEdit = () => {
    setIsEditable(true);
    toast.success("You can now edit your profile!");
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditable(false);
    toast.info("Changes cancelled");
  };

  const handleSave = async () => {
    try {
      const sessionEmail = sessionStorage.getItem('userEmail');
      if (!sessionEmail) {
        toast.error("No session email found!");
        return;
      }

      const dataToSend = { sessionEmail, ...formData };
      
      const response = await fetch("http://localhost:5000/student/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      const result = await response.json();
      
      // Update original data to current form data
      setOriginalData({ ...formData });
      setIsEditable(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile!");
      console.error("Update Error:", error);
    }
  };

  const labelClass = "text-sm font-medium text-gray-700";
  const inputClass = "opacity-90";
  const sectionHeaderClass = "text-lg font-semibold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4";

  if (loading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-lg">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-start bg-gray-50 p-4">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8 space-y-8 overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
          <div className="flex gap-2">
            {!isEditable ? (
              <Button
                variant="outline"
                onClick={handleEdit}
                className="flex items-center gap-2"
              >
                <Pencil className="h-4 w-4" />
                Edit Profile
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="flex items-center gap-2 text-gray-600"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-[#72265F] hover:bg-[#602050] text-white"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="space-y-4">
          <h3 className={sectionHeaderClass}>Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className={labelClass}>Email Address</Label>
              <Input
                name="email"
                value={formData.email}
                readOnly
                className={`${inputClass} bg-gray-100`}
              />
            </div>
            <div>
              <Label className={labelClass}>Full Name *</Label>
              <Input 
                name="name" 
                value={formData.name}
                placeholder="Enter your full name" 
                className={inputClass} 
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>
            <div>
              <Label className={labelClass}>Alternate Email</Label>
              <Input 
                name="alternateEmail" 
                value={formData.alternateEmail}
                placeholder="alternate@email.com" 
                className={inputClass} 
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>
            <div>
              <Label className={labelClass}>Phone Number *</Label>
              <Input 
                name="phoneNumber" 
                value={formData.phoneNumber}
                placeholder="10-digit mobile number" 
                className={inputClass} 
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>
            <div>
              <Label className={labelClass}>Alternative Phone Number</Label>
              <Input 
                name="alternatePhoneNumber" 
                value={formData.alternatePhoneNumber}
                placeholder="Optional mobile number" 
                className={inputClass} 
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>
            <div>
              <Label className={labelClass}>Date of Birth *</Label>
              <Input 
                type="date" 
                name="dob" 
                value={formData.dob}
                className={inputClass} 
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>
            <div>
              <Label className={labelClass}>Gender *</Label>
              <select 
                name="gender" 
                value={formData.gender}
                className={`${inputClass} w-full px-3 py-2 border border-gray-300 rounded-md ${!isEditable ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                onChange={handleChange}
                disabled={!isEditable}
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
                value={formData.correspondenceAddress}
                placeholder="Current address for correspondence" 
                className={inputClass} 
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>
            <div>
              <Label className={labelClass}>Permanent Address *</Label>
              <Input 
                name="permanentAddress" 
                value={formData.permanentAddress}
                placeholder="Permanent home address" 
                className={inputClass} 
                onChange={handleChange}
                disabled={!isEditable}
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
                value={formData.pgCourse}
                className={`${inputClass} w-full px-3 py-2 border border-gray-300 rounded-md ${!isEditable ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                onChange={handleChange}
                disabled={!isEditable}
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
                value={formData.pgClassRollNumber}
                placeholder="e.g., 24MCA001" 
                className={inputClass} 
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>
            <div>
              <Label className={labelClass}>PG Examination Roll Number *</Label>
              <Input 
                name="pgExamRollNumber" 
                value={formData.pgExamRollNumber}
                placeholder="University examination roll number" 
                className={inputClass} 
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>
            <div>
              <Label className={labelClass}>PG CGPA *</Label>
              <Input 
                name="pgCgpa" 
                value={formData.pgCgpa}
                placeholder="Current overall CGPA" 
                className={inputClass} 
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>
            <div>
              <Label className={labelClass}>Number of Backlogs (in PG) *</Label>
              <Input 
                name="pgNumBacklogs" 
                value={formData.pgNumBacklogs}
                placeholder="e.g., 0, 1, 2" 
                className={inputClass} 
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>
            <div>
              <Label className={labelClass}>Details of Backlogs</Label>
              <Input 
                name="pgBacklogDetails" 
                value={formData.pgBacklogDetails}
                placeholder="Mention subjects if any, otherwise write 'None'" 
                className={inputClass} 
                onChange={handleChange}
                disabled={!isEditable}
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
                value={formData.ugCollegeName}
                placeholder="Name of your undergraduate college" 
                className={inputClass} 
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>
            <div>
              <Label className={labelClass}>UG University Name *</Label>
              <Input 
                name="ugUniversity" 
                value={formData.ugUniversity}
                placeholder="Name of your undergraduate university" 
                className={inputClass} 
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>
            <div>
              <Label className={labelClass}>UG Course Name *</Label>
              <Input 
                name="ugCourse" 
                value={formData.ugCourse}
                placeholder="e.g., B.Tech CSE, B.Sc Computer Science" 
                className={inputClass} 
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>
            <div>
              <Label className={labelClass}>UG Examination Roll Number *</Label>
              <Input 
                name="ugExamRollNumber" 
                value={formData.ugExamRollNumber}
                placeholder="University examination roll number" 
                className={inputClass} 
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>
            <div>
              <Label className={labelClass}>UG CGPA *</Label>
              <Input 
                name="ugCgpa" 
                value={formData.ugCgpa}
                placeholder="Overall CGPA" 
                className={inputClass} 
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>
            <div>
              <Label className={labelClass}>UG Year of Passing *</Label>
              <Input 
                name="ugYearOfPassing" 
                value={formData.ugYearOfPassing}
                placeholder="YYYY" 
                className={inputClass} 
                onChange={handleChange}
                disabled={!isEditable}
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
                value={formData.board12}
                placeholder="e.g., CBSE, ICSE, State Board" 
                className={inputClass} 
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>
            <div>
              <Label className={labelClass}>Examination Roll Number *</Label>
              <Input 
                name="examRollNumber12" 
                value={formData.examRollNumber12}
                placeholder="12th exam roll number" 
                className={inputClass} 
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>
            <div>
              <Label className={labelClass}>Percentage or CGPA *</Label>
              <Input 
                name="percentage12" 
                value={formData.percentage12}
                placeholder="e.g., 85% or 8.5 CGPA" 
                className={inputClass} 
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>
            <div>
              <Label className={labelClass}>Year of Passing *</Label>
              <Input 
                name="yearOfPassing12" 
                value={formData.yearOfPassing12}
                placeholder="YYYY" 
                className={inputClass} 
                onChange={handleChange}
                disabled={!isEditable}
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
                value={formData.board10}
                placeholder="e.g., CBSE, ICSE, State Board" 
                className={inputClass} 
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>
            <div>
              <Label className={labelClass}>Examination Roll Number *</Label>
              <Input 
                name="examRollNumber10" 
                value={formData.examRollNumber10}
                placeholder="10th exam roll number" 
                className={inputClass} 
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>
            <div>
              <Label className={labelClass}>Percentage or CGPA *</Label>
              <Input 
                name="percentage10" 
                value={formData.percentage10}
                placeholder="e.g., 90% or 9.0 CGPA" 
                className={inputClass} 
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>
            <div>
              <Label className={labelClass}>Year of Passing *</Label>
              <Input 
                name="yearOfPassing10" 
                value={formData.yearOfPassing10}
                placeholder="YYYY" 
                className={inputClass} 
                onChange={handleChange}
                disabled={!isEditable}
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
                value={formData.resumeLink}
                placeholder="https://drive.google.com/... (Google Drive link)" 
                className={inputClass} 
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>
            <div>
              <Label className={labelClass}>Upload Marksheets (PG, UG, 12th, 10th) *</Label>
              <Input 
                name="marksheetDriveLink" 
                value={formData.marksheetDriveLink}
                placeholder="https://drive.google.com/... (Google Drive folder link)" 
                className={inputClass} 
                onChange={handleChange}
                disabled={!isEditable}
              />
              <p className="text-xs text-gray-500 mt-1">Please upload all marksheets (PG, UG, 12th, 10th) in a single drive folder and share the link</p>
            </div>
          </div>
        </div>

        {/* Placement Consent */}
        <div className="space-y-4">
          <h3 className={sectionHeaderClass}>Placement Policy</h3>
          <div className="bg-blue-50 p-6 rounded-lg space-y-4">
            <div className="flex items-center p-4 bg-white rounded border">
              <input
                type="checkbox"
                name="placementConsent"
                checked={formData.placementConsent}
                onChange={handleChange}
                disabled={!isEditable}
                className="mr-3 w-4 h-4"
              />
              <label htmlFor="placementConsent" className="text-sm font-medium text-gray-800">
                I agree to the Placement Policy 2025–26 *
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;