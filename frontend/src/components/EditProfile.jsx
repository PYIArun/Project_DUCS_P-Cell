import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";

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

  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    // Fetch profile data from backend and populate formData (mocked here)
    setFormData((prev) => ({
      ...prev,
      email: "arun@example.com",
      name: "Arun Chandra",
      phoneNumber: "9876543210",
      resumeLink: "https://drive.google.com/xyz",
      marksheetDriveLink: "https://drive.google.com/abc",
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = () => {
    toast.success("Profile updated successfully!");
    setIsEditable(false);
    // Send updated formData to backend here
  };

  return (
    <div className="max-h-[90vh] overflow-y-scroll py-8 px-4 md:px-12 lg:px-24">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Edit Profile</h2>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsEditable((prev) => !prev)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="flex flex-col space-y-1">
              <Label htmlFor={key} className="capitalize opacity-75">
                {key.replace(/([A-Z])/g, " $1").replace(/\b\w/g, (c) => c.toUpperCase())}
              </Label>
              {key === "backlogDetails" || key.includes("Address") ? (
                <Textarea
                  name={key}
                  value={value}
                  disabled={!isEditable}
                  onChange={handleChange}
                  placeholder={
                    isEditable ? `Enter ${key}` : undefined
                  }
                />
              ) : (
                <Input
                  type={key.includes("email") ? "email" : "text"}
                  name={key}
                  value={value}
                  disabled={!isEditable}
                  onChange={handleChange}
                  placeholder={
                    isEditable ? `Enter ${key}` : undefined
                  }
                />
              )}
            </div>
          ))}
        </div>

        <Button onClick={handleUpdate} className="mt-6 w-full md:w-auto">
          Update
        </Button>
      </div>
    </div>
  );
};

export default EditProfile;