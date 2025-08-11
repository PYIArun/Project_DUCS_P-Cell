import React, { useState } from 'react';
import axios from 'axios';

const CreateCompanyForm = () => {
    const [formData, setFormData] = useState({
        title: 'fdsafsd',
        role: 'asfsadf',
        location: 'sadfsad',
        job_type: 'Full-time',
        job_function: 'fsdafasdf',
        job_profile: 'sadfdsa',
        ctc: '322',
        description: 'fdsafsad',
        required_skills: 'fasfsa',
        additional_info: 'fsadfdsa',
        eligibility: 'fsadf',
        applicable_courses: 'fdsafds',
        logo: ''
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess('');
        setError('');

        try {
            const payload = {
                ...formData,
                required_skills: formData.required_skills.split(',').map((s) => s.trim()),
                applicable_courses: formData.applicable_courses.split(',').map((s) => s.trim())
            };

            await axios.post('http://localhost:5000/company', payload);
            setSuccess('✅ Company created successfully!');
            setFormData({
                title: '',
                role: '',
                location: '',
                job_type: 'Full-time',
                job_function: '',
                job_profile: '',
                ctc: '',
                description: '',
                required_skills: '',
                additional_info: '',
                eligibility: '',
                applicable_courses: '',
                logo: '',
                JD: ''
            });
        } catch (err) {
            setError('❌ Failed to create company. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8 border border-gray-200">
            <h2 className="text-3xl font-bold mb-6 text-[#72265F]">Create Company</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {[
                    { label: 'Company Title', name: 'title' },
                    { label: 'Role', name: 'role' },
                    { label: 'Location', name: 'location' },
                    { label: 'Job Function', name: 'job_function' },
                    { label: 'Job Profile', name: 'job_profile' },
                    { label: 'CTC', name: 'ctc' },
                    //   { label: 'Description', name: 'description' },
                    { label: 'Required Skills (comma-separated)', name: 'required_skills' },
                    { label: 'Additional Info (optional)', name: 'additional_info' },
                    { label: 'Eligibility', name: 'eligibility' },
                    { label: 'Applicable Courses (comma-separated)', name: 'applicable_courses' },
                    { label: 'Job Description (Link)', name: 'JD' },
                    { label: 'Company Logo URL', name: 'logo' },
                ].map(({ label, name }) => (
                    <div key={name}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                        <input
                            type="text"
                            name={name}
                            value={formData[name]}
                            onChange={handleChange}
                            required={name !== 'additional_info'}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                ))}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={5}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
                        placeholder="Enter job description here..."
                    />
                </div>


                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                    <select
                        name="job_type"
                        value={formData.job_type}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="Full-time">Full-time</option>
                        <option value="Remote">Remote</option>
                        <option value="Intership + full-time">Internship + full-time</option>
                        <option value="Internship">Internship</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
                >
                    {loading ? 'Creating...' : 'Create Company'}
                </button>
            </form>

            {success && <p className="mt-4 text-green-600 font-medium">{success}</p>}
            {error && <p className="mt-4 text-red-600 font-medium">{error}</p>}
        </div>
    );
};

export default CreateCompanyForm;
