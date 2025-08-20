import React, { useState } from 'react';
import { Briefcase, MapPin, DollarSign, Calendar, Save, ArrowLeft, FileText, Users, Award } from 'lucide-react';

const CreateJobProfileForm = ({ recruiter, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    recruiterEmail: recruiter?.email || "",
    jobDetails: {
      jobProfile: "",
      jobDesignation: "",
      placeOfPosting: "",
      jobDescription: ""
    },
    recruitmentType: {
      internship: false,
      fullTime: false,
      internshipPlusFullTime: false
    },
    salaryDetails: {
      annualPackage: "",
      ctcBreakage: "",
      stipend: ""
    },
    requirements: {
      requiredSkills: [],
      preferredSkills: [],
      minimumCGPA: "",
      eligibleBranches: [],
      experienceRequired: ""
    },
    placementTimeline: {
      onlineCodingTestDate: "",
      interviewDate: ""
    }
  });

  const [skillInput, setSkillInput] = useState("");
  const [preferredSkillInput, setPreferredSkillInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (section, field, value) => {
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const addSkill = (type) => {
    const input = type === 'required' ? skillInput : preferredSkillInput;
    const setInput = type === 'required' ? setSkillInput : setPreferredSkillInput;
    const field = type === 'required' ? 'requiredSkills' : 'preferredSkills';
    
    if (input.trim()) {
      setFormData(prev => ({
        ...prev,
        requirements: {
          ...prev.requirements,
          [field]: [...prev.requirements[field], input.trim()]
        }
      }));
      setInput("");
    }
  };

  const removeSkill = (type, index) => {
    const field = type === 'required' ? 'requiredSkills' : 'preferredSkills';
    setFormData(prev => ({
      ...prev,
      requirements: {
        ...prev.requirements,
        [field]: prev.requirements[field].filter((_, i) => i !== index)
      }
    }));
  };

  const handleBranchChange = (branch, checked) => {
    setFormData(prev => ({
      ...prev,
      requirements: {
        ...prev.requirements,
        eligibleBranches: checked 
          ? [...prev.requirements.eligibleBranches, branch]
          : prev.requirements.eligibleBranches.filter(b => b !== branch)
      }
    }));
  };

  const handleSubmit = async (e, isDraft = false) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = {
        ...formData,
        status: isDraft ? 'Draft' : 'Submitted'
      };

      const response = await fetch('/api/jaf/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      });

      if (response.ok) {
        onSuccess();
        onClose();
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error creating job profile:', error);
      alert('Error creating job profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const branches = ['Computer Science', 'Information Technology', 'Electronics', 'Mathematics', 'Physics'];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg">
          {/* Header */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <ArrowLeft size={24} />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Create Job Profile</h1>
                  <p className="text-gray-600">{recruiter?.companyName}</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={(e) => handleSubmit(e, true)}
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  <Save size={16} className="inline mr-2" />
                  Save as Draft
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSubmitting ? 'Creating...' : 'Create Job Profile'}
                </button>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Job Details Section */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Briefcase className="mr-2 text-blue-600" size={24} />
                Job Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Profile *
                  </label>
                  <input
                    type="text"
                    value={formData.jobDetails.jobProfile}
                    onChange={(e) => handleInputChange('jobDetails', 'jobProfile', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    placeholder="e.g., Software Engineer, Data Scientist"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Designation *
                  </label>
                  <input
                    type="text"
                    value={formData.jobDetails.jobDesignation}
                    onChange={(e) => handleInputChange('jobDetails', 'jobDesignation', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    placeholder="e.g., Junior Developer, Analyst"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Place of Posting *
                  </label>
                  <input
                    type="text"
                    value={formData.jobDetails.placeOfPosting}
                    onChange={(e) => handleInputChange('jobDetails', 'placeOfPosting', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    placeholder="e.g., Delhi, Mumbai, Remote"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Description *
                  </label>
                  <textarea
                    value={formData.jobDetails.jobDescription}
                    onChange={(e) => handleInputChange('jobDetails', 'jobDescription', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="4"
                    required
                    placeholder="Describe the role, responsibilities, and what the candidate will be doing..."
                  />
                </div>
              </div>
            </div>

            {/* Recruitment Type */}
            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Users className="mr-2 text-green-600" size={24} />
                Recruitment Type
              </h2>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.recruitmentType.fullTime}
                    onChange={(e) => handleInputChange('recruitmentType', 'fullTime', e.target.checked)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Internship + Full Time</span>
                </label>
                <p className="text-xs text-gray-500 mt-2">
                  *Internship + Full Time: If anybody gets a full-time offer then he/she will definitely get an internship offer also.
                </p>
              </div>
            </div>

            {/* Salary Details */}
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <DollarSign className="mr-2 text-yellow-600" size={24} />
                Compensation Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Package (in Lakhs) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.salaryDetails.annualPackage}
                    onChange={(e) => handleInputChange('salaryDetails', 'annualPackage', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    required
                    placeholder="e.g., 8.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stipend (for Internships, in ₹)
                  </label>
                  <input
                    type="number"
                    value={formData.salaryDetails.stipend}
                    onChange={(e) => handleInputChange('salaryDetails', 'stipend', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="e.g., 25000"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CTC Breakage *
                  </label>
                  <textarea
                    value={formData.salaryDetails.ctcBreakage}
                    onChange={(e) => handleInputChange('salaryDetails', 'ctcBreakage', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    rows="3"
                    required
                    placeholder="Basic: 70%, HRA: 20%, Other Allowances: 10%"
                  />
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-purple-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Award className="mr-2 text-purple-600" size={24} />
                Requirements & Eligibility
              </h2>
              
              {/* Skills */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Required Skills
                  </label>
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="e.g., JavaScript, Python"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill('required'))}
                    />
                    <button
                      type="button"
                      onClick={() => addSkill('required')}
                      className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.requirements.requiredSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full flex items-center"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill('required', index)}
                          className="ml-1 text-purple-600 hover:text-purple-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Skills
                  </label>
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={preferredSkillInput}
                      onChange={(e) => setPreferredSkillInput(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="e.g., React, Django"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill('preferred'))}
                    />
                    <button
                      type="button"
                      onClick={() => addSkill('preferred')}
                      className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.requirements.preferredSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full flex items-center"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill('preferred', index)}
                          className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CGPA and Experience */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum CGPA
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={formData.requirements.minimumCGPA}
                    onChange={(e) => handleInputChange('requirements', 'minimumCGPA', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="e.g., 7.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Required
                  </label>
                  <select
                    value={formData.requirements.experienceRequired}
                    onChange={(e) => handleInputChange('requirements', 'experienceRequired', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">Select experience level</option>
                    <option value="Fresher">Fresher</option>
                    <option value="0-1 years">0-1 years</option>
                    <option value="1-2 years">1-2 years</option>
                    <option value="2-3 years">2-3 years</option>
                    <option value="3+ years">3+ years</option>
                  </select>
                </div>
              </div>

              {/* Eligible Branches */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Eligible Branches
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {branches.map((branch) => (
                    <label key={branch} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.requirements.eligibleBranches.includes(branch)}
                        onChange={(e) => handleBranchChange(branch, e.target.checked)}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{branch}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Calendar className="mr-2 text-indigo-600" size={24} />
                Tentative Timeline
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Online Coding Test Date
                  </label>
                  <input
                    type="date"
                    value={formData.placementTimeline.onlineCodingTestDate}
                    onChange={(e) => handleInputChange('placementTimeline', 'onlineCodingTestDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interview Date
                  </label>
                  <input
                    type="date"
                    value={formData.placementTimeline.interviewDate}
                    onChange={(e) => handleInputChange('placementTimeline', 'interviewDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <h3 className="font-medium text-red-900 mb-2">DISCLAIMER</h3>
              <p className="text-sm text-red-800">
                The Company hereby confirms and agrees that all Details, Selection procedures, Salary 
                Breakdown are fixed and cannot be changed after submission of the Job Application form and 
                will be followed throughout the placement Process.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJobProfileForm;