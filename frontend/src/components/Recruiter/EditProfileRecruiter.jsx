import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast, Bounce } from 'react-toastify';
import axios from 'axios';
import { Edit, Eye } from 'lucide-react';

const EditProfileRecruiter = () => {
  const { userEmail, updateProfileStatus } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  
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

  useEffect(() => {
    fetchExistingProfile();
  }, [userEmail]);

  const fetchExistingProfile = async () => {
    try {
      setInitialLoading(true);
      const response = await axios.get(`http://localhost:5000/recruiter/${userEmail}`);
      const profileData = response.data;
      
      // Populate form with existing data
      if (profileData.companyProfile) {
        setFormData({
          telephoneNo: profileData.companyProfile.telephoneNo || '',
          website: profileData.companyProfile.website || '',
          headHR: {
            name: profileData.companyProfile.headHR?.name || '',
            email: profileData.companyProfile.headHR?.email || '',
            mobileNumber: profileData.companyProfile.headHR?.mobileNumber || ''
          },
          secondContactPerson: {
            name: profileData.companyProfile.secondContactPerson?.name || '',
            email: profileData.companyProfile.secondContactPerson?.email || '',
            mobileNumber: profileData.companyProfile.secondContactPerson?.mobileNumber || ''
          }
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Error loading profile data', {
        position: "bottom-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setInitialLoading(false);
    }
  };

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
      
      toast.success('Profile updated successfully!', {
        position: "bottom-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
      
      navigate('/recruiter/view-profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || 'Error updating profile', {
        position: "bottom-center",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="font-instrument min-h-screen py-8 px-4 w-full max-w-[60rem] mx-auto flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#72265F] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-instrument min-h-screen py-8 px-4 w-full max-w-[60rem] mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-center gap-4 mb-4">
          <h1 className="text-3xl font-bold text-[#72265F] text-center">Edit Your Profile</h1>
          <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-300">
            <Edit className="w-4 h-4 mr-1" />
            Edit Mode
          </Badge>
        </div>
        <p className="text-gray-600 text-center mt-2">
          Update your company details and contact information
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <Button
          onClick={() => navigate("/recruiter/view-profile")}
          variant="outline"
          className="px-6 py-2 border-[#72265F] text-[#72265F] hover:bg-[#72265F] hover:text-white"
        >
          <Eye className="w-4 h-4 mr-2" />
          View Profile
        </Button>
        <Button
          onClick={() => navigate("/recruiter/home")}
          variant="outline"
          className="px-6 py-2 border-gray-400 text-gray-600 hover:bg-gray-100"
        >
          Cancel & Go Home
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-[#72265F]">Update Company Profile Information</CardTitle>
          <CardDescription>
            Make changes to your company details. This information will be used in your Job Application Forms.
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
                  onClick={() => navigate('/recruiter/view-profile')}
                  className="px-8 py-2 border-[#72265F] text-[#72265F] hover:bg-[#72265F] hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-2 bg-[#72265F] hover:bg-[#913e7c] text-white disabled:opacity-50"
                >
                  {loading ? 'Updating...' : 'Update Profile'}
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

export default EditProfileRecruiter;