const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    yearOfGraduation: { type: Number, required: true },
    registered: { type: String, enum: ["yes", "no"], default: "no" },
},
{ strict: false } 
);



module.exports = mongoose.model("Student",StudentSchema);