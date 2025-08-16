import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";  
import { Label } from "@/components/ui/label";
import { MdDelete, MdMoreVert } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const CreateCompany = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
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

    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState({});

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const response = await axios.get('http://localhost:5000/companies');
            setCompanies(response.data);
        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    };

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
            console.log(payload);
            await axios.post('http://localhost:5000/companies', payload);
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
                hiring_workflow: '',
                required_skills: '',
                additional_info: '',
                eligibility: '',
                applicable_courses: '',
                logo: '',
                JD: ''
            });
            fetchCompanies(); // Refresh the companies list
        } catch (err) {
            setError('❌ Failed to create company. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            title: '',
            role: '',
            location: '',
            job_type: 'Full-time',
            hiring_workflow : "",
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
        setSuccess('');
        setError('');
    };

    const confirmDelete = (id) => {
        setDeleteId(id);
        setShowModal(true);
        setDropdownOpen({});
    };

    const deleteCompany = async () => {
        try {
            await axios.delete(`http://localhost:5000/companies/${deleteId}`);
            setCompanies(companies.filter(company => company._id !== deleteId));
            setShowModal(false);
            setSuccess('✅ Company deleted successfully!');
        } catch (error) {
            console.error('Error deleting company:', error);
            setError('❌ Failed to delete company.');
        }
    };

    const toggleDropdown = (companyId) => {
        setDropdownOpen(prev => ({
            ...prev,
            [companyId]: !prev[companyId]
        }));
    };

    return (
        <div>
            <div className="w-[90%] flex flex-col my-[4rem] md:flex-row lg:flex-row mx-auto justify-between gap-[4rem]">
                {/* Left side - Form */}
                <div className="flex flex-col mt-[2rem] w-full md:w-[40%] gap-[2rem]">
                    <CardHeader>
                        <CardTitle className="text-[2rem] text-[#72265F] font-instrument">Create Company</CardTitle>
                    </CardHeader>
                    <Card className="pt-[1.5rem] bg-white rounded-[0.7rem]">
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="title">Company Title</Label>
                                        <Input
                                            id="title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            placeholder="Company Title"
                                            required
                                        />
                                    </div>
                                    
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="role">Role</Label>
                                        <Input
                                            id="role"
                                            name="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            placeholder="Job Role"
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="location">Location</Label>
                                        <Input
                                            id="location"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            placeholder="Job Location"
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="job_type">Job Type</Label>
                                        <select
                                            id="job_type"
                                            name="job_type"
                                            value={formData.job_type}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        >
                                            <option value="Full-time">Full-time</option>
                                            <option value="Remote">Remote</option>
                                            <option value="Intership + full-time">Internship + full-time</option>
                                            <option value="Internship">Internship</option>
                                        </select>
                                    </div>

                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="ctc">CTC</Label>
                                        <Input
                                            id="ctc"
                                            name="ctc"
                                            value={formData.ctc}
                                            onChange={handleChange}
                                            placeholder="CTC (e.g., 12 LPA)"
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder="Job description"
                                            rows={4}
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="hiring_workflow">Hiring Workflow</Label>
                                        <Textarea
                                            id="hiring_workflow"
                                            name="hiring_workflow"
                                            value={formData.hiring_workflow}
                                            onChange={handleChange}
                                            placeholder="Hiring workflow"
                                            rows={4}
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="required_skills">Required Skills (comma-separated)</Label>
                                        <Input
                                            id="required_skills"
                                            name="required_skills"
                                            value={formData.required_skills}
                                            onChange={handleChange}
                                            placeholder="e.g., React, Node.js, Python"
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="applicable_courses">Applicable Courses (comma-separated)</Label>
                                        <Input
                                            id="applicable_courses"
                                            name="applicable_courses"
                                            value={formData.applicable_courses}
                                            onChange={handleChange}
                                            placeholder="e.g., B.Tech CSE, MCA, M.Sc CS"
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="eligibility">Eligibility</Label>
                                        <Input
                                            id="eligibility"
                                            name="eligibility"
                                            value={formData.eligibility}
                                            onChange={handleChange}
                                            placeholder="Eligibility criteria"
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="logo">Company Logo URL</Label>
                                        <Input
                                            id="logo"
                                            name="logo"
                                            value={formData.logo}
                                            onChange={handleChange}
                                            placeholder="https://example.com/logo.png"
                                        />
                                    </div>

                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="JD">Job Description Link</Label>
                                        <Input
                                            id="JD"
                                            name="JD"
                                            value={formData.JD}
                                            onChange={handleChange}
                                            placeholder="Link to detailed job description"
                                        />
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button 
                                type="button"
                                onClick={handleCancel}
                                className='select-none font-instrument px-[1.25rem] py-[0.5rem] hover:text-[#72265F] hover:border-[1px] hover:border-[#72265F] text-[#72265F] active:scale-95 transition-all ease-in hover:ease-in hover:transition-all active:ease-in active:transition-all font-semibold rounded-[0.5rem]'
                            >
                                Cancel
                            </Button>
                            <Button 
                                onClick={handleSubmit}
                                disabled={loading}
                                className='select-none font-instrument px-[1.25rem] py-[0.5rem] bg-[#72265F] hover:text-[#72265F] hover:border-[1px] hover:border-[#72265F] active:scale-95 transition-all ease-in hover:ease-in hover:transition-all active:ease-in active:transition-all font-semibold text-white rounded-[0.5rem]'
                            >
                                {loading ? 'Creating...' : 'Create Company'}
                            </Button>
                        </CardFooter>
                        
                        {success && <p className="mt-4 px-6 pb-4 text-green-600 font-medium">{success}</p>}
                        {error && <p className="mt-4 px-6 pb-4 text-red-600 font-medium">{error}</p>}
                    </Card>
                </div>

                {/* Right side - Companies List */}
                <div className="mt-[2rem] w-full md:w-[60%]">
                    <Card className="bg-white w-full rounded-[0.7rem] py-[1rem] mx-auto h-[40rem] overflow-y-scroll">
                        <CardContent>
                            <h3 className="text-xl font-semibold mb-4 text-[#72265F]">Created Companies</h3>
                            {companies.length === 0 ? (
                                <p className="text-gray-500 text-center mt-8">No companies created yet.</p>
                            ) : (
                                companies.map((company) => (
                                    <div
                                        key={company._id}
                                        className="flex items-center justify-between bg-white mb-4 p-4 rounded-lg shadow-sm overflow-hidden break-words border border-gray-200 relative"
                                    >
                                        {/* Three dots menu */}
                                        <div className="absolute top-2 right-2">
                                            <button
                                                onClick={() => toggleDropdown(company._id)}
                                                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                                            >
                                                <MdMoreVert className="text-gray-500 text-lg" />
                                            </button>
                                            {dropdownOpen[company._id] && (
                                                <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[120px]">
                                                    <button
                                                        onClick={() => confirmDelete(company._id)}
                                                        className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2"
                                                    >
                                                        <MdDelete className="text-sm" />
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Left: Logo and Details */}
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 flex w-[82px] h-[82px] align-center p-1 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                                                <img
                                                    src={company.logo || "https://upload.wikimedia.org/wikipedia/en/4/45/Ciena_logo.svg"}
                                                    alt={`${company.title} logo`}
                                                    className="max-w-full w-auto h-auto object-contain mx-auto my-auto"
                                                />
                                            </div>
                                            {/* Company Details */}
                                            <div className="ml-4 flex flex-col">
                                                <p className="text-xl font-semibold mb-1">{company.title}</p>
                                                <p className="text-gray-700 text-sm"><strong>CTC:</strong> {company.ctc}</p>
                                                <p className="text-gray-700 text-sm"><strong>Role:</strong> {company.role}</p>
                                                <p className="text-gray-700 text-sm"><strong>Applicable Courses:</strong> {Array.isArray(company.applicable_courses) ? company.applicable_courses.join(', ') : company.applicable_courses}</p>
                                            </div>
                                        </div>

                                        {/* Right: View Details Button */}
                                        <button
                                            className="bg-[#913e7c] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#72265F] transition-all mr-8"
                                            onClick={() => {
                                                // Handle view details - you can implement this later
                                                navigate(`/company/${company._id}`)
                                            }}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-xl font-bold mb-4 text-[#72265F]">Are you sure you want to delete this company?</h2>
                        <div className="flex justify-center font-instrument gap-4">
                            <Button 
                                onClick={deleteCompany} 
                                className='rounded-[0.7rem] hover:bg-red-600 hover:text-white active:scale-105 transition-all ease-in' 
                                variant="outline"
                            >
                                Yes
                            </Button>
                            <Button 
                                onClick={() => setShowModal(false)} 
                                className="rounded-[0.7rem] active:scale-105 transition-all ease-in"
                            >
                                No
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateCompany;