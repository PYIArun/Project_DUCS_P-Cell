const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    yearOfGraduation: { type: Number, required: true },
    registered: { type: String, enum: ["yes", "no"], default: "no" },
});

const Student = mongoose.model("Student", StudentSchema);



module.exports = mongoose.model("Students",StudentSchema);