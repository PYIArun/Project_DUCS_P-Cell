const Student = require('../Models/Students');

const registerStudent = async (req, res) => {
  try {
      const { email, collegeRollNo, name, course, dob, gender, tenthCGPA, twelfthCGPA, ugCGPA, pgCGPA, backlogs } = req.body;

      const student = await Student.findOne({ email });

      if (!student) {
          return res.status(404).json({ message: "Student not found." });
      }

      // Update student with registration details
      student.collegeRollNo = collegeRollNo;
      student.name = name;
      student.course = course;
      student.dob = dob;
      student.gender = gender;
      student.tenthCGPA = tenthCGPA;
      student.twelfthCGPA = twelfthCGPA;
      student.ugCGPA = ugCGPA;
      student.pgCGPA = pgCGPA;
      student.backlogs = backlogs;
      student.registered = "yes"; // Mark as registered

      await student.save();

      res.status(200).json({ message: "Registration successful." });
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

const getStudentByEmail = async (req, res) => {
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

module.exports = {registerStudent, getStudentByEmail};