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
    hiring_workflow: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
    },
    applied_students: [{
        email: {
            type: String,
            required: true
        },
        resumeLink: {
            type: String,
            required: true
        },
        appliedAt: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            default: 'Applied',
            enum: [
                'Applied',
                'Shortlisted for OA',
                'Shortlisted for Technical Round 1',
                'Shortlisted for Technical Round 2',
                'HR Selected',
                'Final Selected',
                'Rejected'
            ]
        }
    }],
    job_type: {
        type: String,
        enum: ['Full-time', 'Remote', 'Internship', 'Internship + full-time'],
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
        type: String,
        required: false,
    },
    JD: {
        type: String,
        required: false
    },
    application_deadline: {
        type: Date,
        required: false
    },
    // NEW: Link to JAF
    jafId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JAF',
        required: false, // Optional since existing companies may not have JAF
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.model('Company', CompanySchema);