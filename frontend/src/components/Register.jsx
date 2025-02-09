import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({
    collegeRollNo: "",
    name: "",
    course: "",
    dob: "",
    gender: "",
    tenthValue: "",
    tenthType: "CGPA",
    twelfthValue: "",
    twelfthType: "CGPA",
    ugPercentage: "",
    ugCGPA: "",
    pgPercentage: "",
    pgCGPA: "",
    backlogs: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Selection Change
  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // Validation Function
  const validateForm = () => {
    const { collegeRollNo, name, mobileNo, course, dob, gender, tenthValue, twelfthValue, ugPercentage, ugCGPA, pgPercentage, pgCGPA, backlogs } = formData;

    if (!collegeRollNo || !name || !mobileNo || !course || !dob || !gender) {
      toast.error("All fields are required!");
      return false;
    }

        // Validate Mobile Number (Must be 10 digits)
    if (!/^\d{10}$/.test(mobileNo)) {
        toast.error("Mobile number must be exactly 10 digits!");
        return false;
    }

    // Validate DOB (Must be at least 18 years old)
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 0 || age>80) {
      toast.error("Invalid Age Input");
      return false;
    }

    // Validate CGPA and Percentage fields
    if (tenthValue <= 0 || twelfthValue <= 0 || ugPercentage < 0 || ugCGPA < 0 || pgPercentage < 0 || pgCGPA < 0) {
      toast.error("CGPA and Percentage values must be positive!");
      return false;
    }

    // Validate Backlogs (Must be positive)
    if (backlogs < 0) {
      toast.error("Backlogs cannot be negative!");
      return false;
    }

    return true;
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success("Registration Successful!");
      console.log("Form Submitted:", formData);
    }
  };

  return (
    <div className="flex justify-center min-h-[46rem] bg-[#fafafa]">
      <div className="my-[5rem] w-[50rem] mobile:w-[25rem]">
        <Card className='bg-white rounded-[0.7rem] py-[1.5rem]'>
          <CardHeader>
            <CardTitle>Register for the Placement Session </CardTitle>
            <CardDescription>Make sure to fill your correct details. </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="collegeRollNo">College Roll No</Label>
              <Input placeholder='Enter your college roll no' id="collegeRollNo" name="collegeRollNo" value={formData.collegeRollNo} onChange={handleChange} required />
            </div>8

            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input placeholder='Enter your name' id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="space-y-1">
              <Label htmlFor="mobileNo">Mobile No.</Label>
              <Input id="mobileNo" name="mobileNo" type="number" value={formData.mobileNo} onChange={handleChange} required />
            </div>

            
            <div className="space-y-1">
              <Label htmlFor="course">Course</Label>
              <Select className='' onValueChange={(value) => handleSelectChange("course", value)}>
                <SelectTrigger className='text-opacity-60 rounded-[0.4rem]'>
                  <SelectValue placeholder="Select Course" />
                </SelectTrigger>
                
                <SelectContent className='top-full left-0 w-full bg-white shadow-lg border rounded-md z-50"' >
                  <SelectItem value="MSC">Master of Computer Science</SelectItem>
                  <SelectItem value="MCA">Master of Computer Applications</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" name="dob" type="date" value={formData.dob} onChange={handleChange} required />
            </div>

            <div className="space-y-1">
              <Label htmlFor="gender">Gender</Label>
              <Select   onValueChange={(value) => handleSelectChange("gender", value)}>
                <SelectTrigger className='text-opacity-60 rounded-[0.4rem]'>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent className='top-full left-0 w-full bg-white shadow-lg border rounded-md z-50'>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tenth & Twelfth Details */}
            <div className="space-y-1">
              <Label>10th Details</Label>
              <div className="flex space-x-2">
                <Input name="tenthValue" type="number" value={formData.tenthValue} onChange={handleChange} placeholder="Enter Value" />
                <Select onValueChange={(value) => handleSelectChange("tenthType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="CGPA/Percentage" />
                  </SelectTrigger>
                  <SelectContent className='top-full left-0 w-full bg-white shadow-lg border rounded-md z-50'>
                    <SelectItem value="CGPA">CGPA</SelectItem>
                    <SelectItem value="Percentage">Percentage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1">
              <Label>12th Details</Label>
              <div className="flex space-x-2">
                <Input name="twelfthValue" type="number" value={formData.twelfthValue} onChange={handleChange} placeholder="Enter Value" />
                <Select onValueChange={(value) => handleSelectChange("twelfthType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="CGPA/Percentage" />
                  </SelectTrigger>
                  <SelectContent className='top-full left-0 w-full bg-white shadow-lg border rounded-md z-50'>
                    <SelectItem value="CGPA">CGPA</SelectItem>
                    <SelectItem value="Percentage">Percentage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* UG & PG Details */}
            <div className="space-y-1">
              <Label>UG Details</Label>
              <div className="flex space-x-2">
                <Input name="ugPercentage" type="number" value={formData.ugPercentage} onChange={handleChange} placeholder="Percentage" />
                <Input name="ugCGPA" type="number" value={formData.ugCGPA} onChange={handleChange} placeholder="CGPA" />
              </div>
            </div>

            <div className="space-y-1">
              <Label>PG Details</Label>
              <div className="flex space-x-2">
                <Input name="pgPercentage" type="number" value={formData.pgPercentage} onChange={handleChange} placeholder="Percentage" />
                <Input name="pgCGPA" type="number" value={formData.pgCGPA} onChange={handleChange} placeholder="CGPA" />
              </div>
            </div>

            <div className="space-y-1">
              <Label>Number of Backlogs</Label>
              <Input name="backlogs" type="number" value={formData.backlogs} onChange={handleChange} placeholder="Enter Value" />
            </div>
          </CardContent>

          <CardFooter className='flex justify-center'>
                 <Button onClick={handleSubmit} className='select-none font-instrument px-[1.25rem] py-[0.5rem] bg-[#72265F] hover:text-[#72265F] hover:border-[1px] hover:border-[#72265F] active:scale-95 transition-all ease-in hover:ease-in hover:transition-all active:ease-in active:transition-all font-semibold text-white rounded-[0.5rem]'>Submit Details</Button>
          </CardFooter>

          <CardDescription className="text-center text-sm mt-2">
            * Please convert CGPA & Percentage according to your university formula.
          </CardDescription>
        </Card>
      </div>

          {/* {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4 text-[#72265F]">Are you sure all details are correct?</h2>
            <div className="flex justify-center font-instrument gap-4">
              <Button onClick={confirmSubmission} className='rounded-[0.7rem] hover:bg-red-600 hover:text-white active:scale-105 transition-all ease-in' variant="outline">
                Yes
              </Button>
              <Button onClick={() => setShowModal(false)} className="rounded-[0.7rem] active:scale-105 transition-all ease-in">
                No
              </Button>
            </div>
          </div>
        </div>
      )} */}

    </div>
  );
};

export default Register;
