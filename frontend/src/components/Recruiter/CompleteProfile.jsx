import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast, Bounce } from 'react-toastify';
import axios from 'axios';

const CompleteProfile = () => {
  const { userEmail, updateProfileStatus } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    telephoneNo: '',
    website: '',
    headHR: {
      name: '',
      email: '',
      mobileNumber: ''
    },
    secondContactPerson: {
      name: '',
      email: '',
      mobileNumber: ''
    }
  });

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
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
    
    // Validate required fields
    if (!formData.telephoneNo || !formData.website || 
        !formData.headHR.name || !formData.headHR.email || !formData.headHR.mobileNumber ||
        !formData.secondContactPerson.name || !formData.secondContactPerson.email || !formData.secondContactPerson.mobileNumber) {
      toast.error('Please fill in all required fields', {
        position: "bottom-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    // Validate email formats
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.headHR.email) || !emailRegex.test(formData.secondContactPerson.email)) {
      toast.error('Please enter valid email addresses', {
        position: "bottom-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    // Validate website URL
    if (!formData.website.startsWith('http://') && !formData.website.startsWith('https://')) {
      setFormData(prev => ({ ...prev, website: `https://${prev.website}` }));
    }

    try {
      setLoading(true);
      
      await axios.put(`http://localhost:5000/recruiter/${userEmail}/complete-profile`, formData);
      
      updateProfileStatus(true);
      
      toast.success('Profile completed successfully!', {
        position: "bottom-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
      
      navigate('/recruiter/home');
    } catch (error) {
      console.error('Error completing profile:', error);
      toast.error(error.response?.data?.message || 'Error completing profile', {
        position: "bottom-center",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-instrument min-h-screen py-8 px-4 w-full max-w-[60rem] mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#72265F] text-center">Complete Your Profile</h1>
        <p className="text-gray-600 text-center mt-2">
          Please provide your company details to create Job Application Forms
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-[#72265F]">Company Profile Information</CardTitle>
          <CardDescription>
            This information will be used in your Job Application Forms and will be visible to students and coordinators.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Company Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#72265F] border-b border-gray-200 pb-2">
                Company Details
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telephoneNo">Company Phone Number *</Label>
                  <Input
                    id="telephoneNo"
                    type="tel"
                    placeholder="e.g., +91-11-12345678"
                    value={formData.telephoneNo}
                    onChange={(e) => handleInputChange('telephoneNo', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Company Website *</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="e.g., www.company.com"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Head HR Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#72265F] border-b border-gray-200 pb-2">
                Head HR Contact Details
              </h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="headHR.name">Full Name *</Label>
                  <Input
                    id="headHR.name"
                    type="text"
                    placeholder="e.g., John Doe"
                    value={formData.headHR.name}
                    onChange={(e) => handleInputChange('headHR.name', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="headHR.email">Email Address *</Label>
                  <Input
                    id="headHR.email"
                    type="email"
                    placeholder="e.g., hr@company.com"
                    value={formData.headHR.email}
                    onChange={(e) => handleInputChange('headHR.email', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="headHR.mobileNumber">Mobile Number *</Label>
                  <Input
                    id="headHR.mobileNumber"
                    type="tel"
                    placeholder="e.g., +91-9876543210"
                    value={formData.headHR.mobileNumber}
                    onChange={(e) => handleInputChange('headHR.mobileNumber', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Second Contact Person Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#72265F] border-b border-gray-200 pb-2">
                Second Contact Person Details
              </h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="secondContactPerson.name">Full Name *</Label>
                  <Input
                    id="secondContactPerson.name"
                    type="text"
                    placeholder="e.g., Jane Smith"
                    value={formData.secondContactPerson.name}
                    onChange={(e) => handleInputChange('secondContactPerson.name', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="secondContactPerson.email">Email Address *</Label>
                  <Input
                    id="secondContactPerson.email"
                    type="email"
                    placeholder="e.g., recruitment@company.com"
                    value={formData.secondContactPerson.email}
                    onChange={(e) => handleInputChange('secondContactPerson.email', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="secondContactPerson.mobileNumber">Mobile Number *</Label>
                  <Input
                    id="secondContactPerson.mobileNumber"
                    type="tel"
                    placeholder="e.g., +91-9876543210"
                    value={formData.secondContactPerson.mobileNumber}
                    onChange={(e) => handleInputChange('secondContactPerson.mobileNumber', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/recruiter/home')}
                  className="px-8 py-2 border-[#72265F] text-[#72265F] hover:bg-[#72265F] hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-2 bg-[#72265F] hover:bg-[#913e7c] text-white disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Complete Profile'}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Help Section */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Having troubles? <a href="mailto:placements@cs.du.ac.in" className="font-semibold text-[#72265F] hover:underline">Mail to Placement Team</a>
        </p>
      </div>
    </div>
  );
};

export default CompleteProfile;