import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  yearOfGraduation: { type: Number, required: true },
  registered: { type: String, enum: ["yes", "no"], default: "no" },
}, 
{ strict: false }
);

const Student = mongoose.model("Student", StudentSchema);
export default Student;
