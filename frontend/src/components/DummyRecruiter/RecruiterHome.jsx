import React, { useState, useEffect } from 'react';
import { Plus, Calendar, MapPin, DollarSign, Building2, Briefcase, AlertCircle, CheckCircle } from 'lucide-react';

const RecruiterHome = () => {
  const [jafs, setJafs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [recruiter, setRecruiter] = useState(null);
  
  // Mock recruiter data - in real app, this would come from login context/localStorage
  const recruiterEmail = "hr@company.com";

  useEffect(() => {
    fetchRecruiterData();
  }, []);

  const fetchRecruiterData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/recruiter/${recruiterEmail}`);
      const data = await response.json();
      if (response.ok) {
        setRecruiter(data);
        setJafs(data.jobsCreated || []);
      }
    } catch (error) {
      console.error('Error fetching recruiter data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewJAF = (jafId) => {
    // Navigate to JAF details page
    window.location.href = `/jaf/${jafId}`;
  };

  const formatCurrency = (amount) => {
    return `₹${amount} LPA`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Draft': return 'bg-gray-100 text-gray-700';
      case 'Submitted': return 'bg-blue-100 text-blue-700';
      case 'Approved': return 'bg-green-100 text-green-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const isProfileCompleted = recruiter?.companyProfile?.profileCompleted || false;

  if (showProfileForm) {
    return <CompanyProfileForm recruiter={recruiter} onSuccess={() => {
      setShowProfileForm(false);
      fetchRecruiterData();
    }} />;
  }

  if (showCreateForm && isProfileCompleted) {
    return <CreateJobProfileForm recruiter={recruiter} onClose={() => setShowCreateForm(false)} onSuccess={() => {
      setShowCreateForm(false);
      fetchRecruiterData();
    }} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Recruiter Dashboard</h1>
              <p className="text-gray-600">{recruiter?.companyName}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {isProfileCompleted ? (
                  <CheckCircle className="text-green-500" size={16} />
                ) : (
                  <AlertCircle className="text-orange-500" size={16} />
                )}
                <span className="text-sm text-gray-600">
                  Profile {isProfileCompleted ? 'Complete' : 'Incomplete'}
                </span>
              </div>
              <span className="text-gray-600">{recruiterEmail}</span>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Completion Alert */}
      {!isProfileCompleted && (
        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mx-4 mt-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="text-orange-400 mr-3" size={20} />
              <div>
                <h3 className="text-sm font-medium text-orange-800">Complete Your Company Profile</h3>
                <p className="text-sm text-orange-700 mt-1">
                  Please complete your company profile to start creating job application forms.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowProfileForm(true)}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 text-sm"
            >
              Complete Profile
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Recent Job Profiles</h2>
          <button
            onClick={() => {
              if (!isProfileCompleted) {
                setShowProfileForm(true);
              } else {
                setShowCreateForm(true);
              }
            }}
            className={`px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 ${
              isProfileCompleted 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-400 text-white cursor-not-allowed'
            }`}
            disabled={!isProfileCompleted}
          >
            <Plus size={20} />
            <span>{isProfileCompleted ? 'Create Job Profile' : 'Complete Profile First'}</span>
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* No JAFs State */}
        {!loading && jafs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Job Profiles Created</h3>
            <p className="text-gray-600 mb-4">
              {isProfileCompleted 
                ? 'Get started by creating your first job profile' 
                : 'Complete your company profile first, then create job profiles'
              }
            </p>
            <button
              onClick={() => {
                if (!isProfileCompleted) {
                  setShowProfileForm(true);
                } else {
                  setShowCreateForm(true);
                }
              }}
              className={`px-6 py-2 rounded-lg transition-colors ${
                isProfileCompleted 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-orange-600 text-white hover:bg-orange-700'
              }`}
            >
              {isProfileCompleted ? 'Create Your First Job Profile' : 'Complete Company Profile'}
            </button>
          </div>
        )}

        {/* JAFs Grid */}
        {!loading && jafs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jafs.map((job) => (
              <div
                key={job.jafId}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
                onClick={() => handleViewJAF(job.jafId)}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-2">
                      <Building2 className="text-blue-600" size={20} />
                      <h3 className="font-semibold text-lg text-gray-900 truncate">
                        {recruiter?.companyName}
                      </h3>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                      {job.status}
                    </span>
                  </div>

                  {/* Job Details */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="text-gray-400" size={16} />
                      <span className="text-sm text-gray-600">Job Profile:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {job.jobProfile}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <MapPin className="text-gray-400" size={16} />
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {job.placeOfPosting}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <DollarSign className="text-gray-400" size={16} />
                      <span className="text-sm text-gray-600">CTC:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatCurrency(job.annualPackage)}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Calendar className="text-gray-400" size={16} />
                      <span className="text-sm text-gray-600">Created:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatDate(job.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Recruitment Type Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.recruitmentType?.fullTime && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Full Time
                      </span>
                    )}
                    {job.recruitmentType?.internship && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        Internship
                      </span>
                    )}
                    {job.recruitmentType?.internshipPlusFullTime && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                        Internship + Full Time
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Placeholder components
const CompanyProfileForm = ({ recruiter, onSuccess }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Company Profile Setup</h2>
          <p className="text-gray-600 text-center py-8">
            Company Profile Form will be implemented here...
          </p>
          <button
            onClick={onSuccess}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Complete Profile (Demo)
          </button>
        </div>
      </div>
    </div>
  );
};

const CreateJobProfileForm = ({ recruiter, onClose, onSuccess }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Create Job Profile</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ×
            </button>
          </div>
          <p className="text-gray-600 text-center py-8">
            Job Profile Creation Form will be implemented here...
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={onSuccess}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Job Profile (Demo)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterHome;