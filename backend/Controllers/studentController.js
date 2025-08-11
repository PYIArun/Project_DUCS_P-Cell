import Student from "../Models/Student.js";

export const registerStudent = async (req, res) => {
  try {
    // sessionEmail will be sent from frontend alongside the rest of form data
    const { sessionEmail, ...formData } = req.body;
    console.log(sessionEmail);

    if (!sessionEmail) {
      console.log("No session email provided in request.");
      return res.status(400).json({ message: "Session email is required." });
    }

    console.log("Session Email for Lookup:", sessionEmail);
    console.log("Incoming Request Body:", formData);

    // Check if student exists using ONLY session email
    const student = await Student.findOne({ email: sessionEmail });

    if (!student) {
      console.log("Student not found in DB:", sessionEmail);
      return res.status(404).json({ message: "Student not found." });
    }

    // Keep all your existing fields exactly as before
    const {
      email, // This is the form email — can be different from session email
      name,
      alternateEmail,
      correspondenceAddress,
      permanentAddress,
      phoneNumber,
      alternatePhoneNumber,
      dob,
      gender,
      course,
      classRollNumber,
      examRollNumberUG,
      sgpa,
      numBacklogs,
      backlogDetails,
      collegeName,
      university,
      examRollNumberPG,
      cgpa,
      yearOfPassingPG,
      board12,
      examRollNumber12,
      percentage12,
      yearOfPassing12,
      board10,
      examRollNumber10,
      percentage10,
      yearOfPassing10,
      resumeLink,
      marksheetDriveLink,
      placementConsent,
    } = formData;

    const updatedFields = {
      name,
      alternateEmail,
      correspondenceAddress,
      permanentAddress,
      phoneNumber,
      alternatePhoneNumber,
      dob,
      gender,
      course,
      classRollNumber,
      examRollNumberUG,
      sgpa,
      numBacklogs,
      backlogDetails,
      collegeName,
      university,
      examRollNumberPG,
      cgpa,
      yearOfPassingPG,
      board12,
      examRollNumber12,
      percentage12,
      yearOfPassing12,
      board10,
      examRollNumber10,
      percentage10,
      yearOfPassing10,
      resumeLink,
      marksheetDriveLink,
      placementConsent,
      registered: "yes",
    };

    console.log("Updated Fields Before DB Update:", updatedFields);

    const updatedStudent = await Student.findOneAndUpdate(
      { email: sessionEmail }, // lookup by session email only
      { $set: updatedFields },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      console.log("Error: Student update failed.");
      return res.status(500).json({ message: "Failed to update student details." });
    }

    console.log("Student Updated Successfully:", updatedStudent);
    res.status(200).json({ message: "Registration successful.", student: updatedStudent });

  } catch (error) {
    console.error("Error in registerStudent:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};



export const getStudentByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    // Validate domain
    const validDomain = "@cs.du.ac.in";
    if (!email.endsWith(validDomain)) {
      return res.status(403).json({ message: "Invalid email domain. Access denied." });
    }

    // Extract admission year (last two digits before '@')
    const yearMatch = email.match(/(\d{2})@cs\.du\.ac\.in$/);
    if (!yearMatch) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    const admissionYear = parseInt("20" + yearMatch[1]); // Convert '24' → 2024

    // Calculate the allowed access date (June of the next year)
    // const allowedDate = new Date(admissionYear + 1, 5, 1); // June 1st of next year
    // const today = new Date();

    // Check if current date is past the allowed date
    // if (today < allowedDate) {
    //   return res.status(403).json({ message: `Access restricted until June ${admissionYear + 1}.` });
    // }

    const yearOfGraduation = admissionYear + 2;

    // Check if student exists
    let student = await Student.findOne({ email });

    // If not found, create a new entry with default registered = "no"
    if (!student) {
      student = new Student({ email, yearOfGraduation, registered: "no" });
      await student.save();
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
