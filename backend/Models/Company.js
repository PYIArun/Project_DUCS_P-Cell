import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    hiring_workflow : {
        type : String,
        required : true

    },
    location: {
        type: String,
        required: true,
    },
    applied_students: [],
    job_type: {
        type: String,
        enum: ['Full-time', 'Remote' , 'Internship', 'Intership + full-time'],
        required: true,
    },
    job_function: {
        type: String,
        required: true,
    },
    job_profile: {
        type: String,
        required: true,
    },
    ctc: {
        type: String,
        required: true,
    },
    eligibility: {
        type: String,
        required: true,
    },
    applicable_courses: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    required_skills: {
        type: [String],
        required: true,
    },
    additional_info: {
        type: String,
        required: false,
    },
    logo: {
        type: String, // URL or path to image
        required: true,
    },
    JD : {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.model('Company', CompanySchema);
