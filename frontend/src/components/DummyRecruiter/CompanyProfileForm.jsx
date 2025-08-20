import React, { useState } from 'react';
import { Building2, Phone, Mail, Globe, User, Users, Save } from 'lucide-react';

const CompanyProfileForm = ({ recruiter, onSuccess }) => {
  const [formData, setFormData] = useState({
    telephoneNo: "",
    emailAddress: recruiter?.email || "",
    website: "",
    address: "",
    headHR: {
      name: "",
      email: "",
      mobileNumber: ""
    },
    secondContactPerson: {
      name: "",
      email: "",
      mobileNumber: ""
    },
    coursesAllowed: {
      msc: false,
      mca: false
    },
    selectionProcess: {
      prePlacementTalk: false,
      onlineAssessment: false,
      personalTechnicalInterview: false,
      hrRound: false,
      otherRounds: ""
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (section, field, value) => {
    if (section === 'headHR' || section === 'secondContactPerson' || section === 'coursesAllowed' || section === 'selectionProcess') {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/recruiter/profile/${recruiter.email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        alert('Company profile updated successfully!');
        onSuccess();
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error updating company profile:', error);
      alert('Error updating company profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg">
          {/* Header */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <Building2 className="text-blue-600" size={32} />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Complete Company Profile</h1>
                <p className="text-gray-600">{recruiter?.companyName}</p>
                <p className="text-sm text-blue-600">Please fill in your company details to start creating job profiles</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Company Contact Information */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Phone className="mr-2 text-blue-600" size={20} />
                Company Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telephone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.telephoneNo}
                    onChange={(e) => handleInputChange(null, 'telephoneNo', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    placeholder="+91-11-XXXXXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.emailAddress}
                    onChange={(e) => handleInputChange(null, 'emailAddress', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange(null, 'website', e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://www.company.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Address *
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange(null, 'address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                    required
                    placeholder="Complete company address"
                  />
                </div>
              </div>
            </div>

            {/* HR Contact Details */}
            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="mr-2 text-green-600" size={20} />
                Head HR Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.headHR.name}
                    onChange={(e) => handleInputChange('headHR', 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.headHR.email}
                    onChange={(e) => handleInputChange('headHR', 'email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.headHR.mobileNumber}
                    onChange={(e) => handleInputChange('headHR', 'mobileNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                    placeholder="+91-XXXXXXXXXX"
                  />
                </div>
              </div>
            </div>

            {/* Second Contact Person */}
            <div className="bg-purple-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="mr-2 text-purple-600" size={20} />
                Second Contact Person (Optional)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.secondContactPerson.name}
                    onChange={(e) => handleInputChange('secondContactPerson', 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.secondContactPerson.email}
                    onChange={(e) => handleInputChange('secondContactPerson', 'email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                  <input
                    type="tel"
                    value={formData.secondContactPerson.mobileNumber}
                    onChange={(e) => handleInputChange('secondContactPerson', 'mobileNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Courses Allowed */}
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Courses Allowed</h2>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.coursesAllowed.msc}
                    onChange={(e) => handleInputChange('coursesAllowed', 'msc', e.target.checked)}
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">M.Sc (Computer Science)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.coursesAllowed.mca}
                    onChange={(e) => handleInputChange('coursesAllowed', 'mca', e.target.checked)}
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">MCA (Master of Computer Applications)</span>
                </label>
              </div>
            </div>

            {/* Selection Process */}
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Standard Selection Process</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.selectionProcess.prePlacementTalk}
                    onChange={(e) => handleInputChange('selectionProcess', 'prePlacementTalk', e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Pre-Placement Talk</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.selectionProcess.onlineAssessment}
                    onChange={(e) => handleInputChange('selectionProcess', 'onlineAssessment', e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Online Assessment</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.selectionProcess.personalTechnicalInterview}
                    onChange={(e) => handleInputChange('selectionProcess', 'personalTechnicalInterview', e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Personal/Technical Interview</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.selectionProcess.hrRound}
                    onChange={(e) => handleInputChange('selectionProcess', 'hrRound', e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">HR Round</span>
                </label>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Other Rounds (if any)
                </label>
                <textarea
                  value={formData.selectionProcess.otherRounds}
                  onChange={(e) => handleInputChange('selectionProcess', 'otherRounds', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  rows="2"
                  placeholder="Describe any additional rounds in your selection process"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
              >
                <Save size={20} />
                <span>{isSubmitting ? 'Saving...' : 'Save Company Profile'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileForm;