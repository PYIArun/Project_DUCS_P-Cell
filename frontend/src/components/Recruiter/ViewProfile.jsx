import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast, Bounce } from 'react-toastify';
import axios from 'axios';
import { Building, Phone, Globe, Mail, User, Edit, Eye } from 'lucide-react';

const ViewProfile = () => {
  const { userEmail, companyName, loading: authLoading } = useAuth(); // Add authLoading
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Don't fetch if auth is still loading
    if (authLoading) return;
    
    // Don't fetch if no userEmail
    if (!userEmail) {
      setLoading(false);
      return;
    }
    
    fetchProfileData();
  }, [userEmail, authLoading]); // Add authLoading as dependency

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      console.log('Fetching profile for email:', userEmail); // Debug log
      
      const response = await axios.get(`http://localhost:5000/recruiter/${userEmail}`);
      console.log('Profile data received:', response.data); // Debug log
      
      setProfileData(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      
      // More specific error handling
      if (error.response?.status === 404) {
        toast.error('Profile not found. Please check your registration.', {
          position: "bottom-center",
          autoClose: 5000,
          theme: "light",
          transition: Bounce,
        });
      } else {
        toast.error('Error loading profile data', {
          position: "bottom-center",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Show loading while auth is loading
  if (authLoading) {
    return (
      <div className="font-instrument min-h-screen py-8 px-4 w-full max-w-[60rem] mx-auto flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#72265F] mx-auto"></div>
          <p className="mt-4 text-gray-600">Authenticating...</p>
        </div>
      </div>
    );
  }

  // Show error if no user email after auth is complete
  if (!authLoading && !userEmail) {
    return (
      <div className="font-instrument min-h-screen py-8 px-4 w-full max-w-[60rem] mx-auto flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please log in to view your profile</p>
          <Button 
            onClick={() => navigate("/auth")} 
            className="mt-4 bg-[#72265F] hover:bg-[#913e7c] text-white"
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="font-instrument min-h-screen py-8 px-4 w-full max-w-[60rem] mx-auto flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#72265F] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="font-instrument min-h-screen py-8 px-4 w-full max-w-[60rem] mx-auto flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Profile data not found</p>
          <Button 
            onClick={() => navigate("/recruiter/home")} 
            className="mt-4 bg-[#72265F] hover:bg-[#913e7c] text-white"
          >
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  // Rest of your component remains the same...
  return (
    <div className="font-instrument min-h-screen py-8 px-4 w-full max-w-[60rem] mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <h1 className="text-3xl font-bold text-[#72265F]">Company Profile</h1>
          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-300">
            <Eye className="w-4 h-4 mr-1" />
            View Mode
          </Badge>
        </div>
        <p className="text-gray-600">
          Complete overview of your company profile information
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <Button
          onClick={() => navigate("/recruiter/edit-profile")}
          className="px-6 py-2 bg-[#72265F] hover:bg-[#913e7c] text-white"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
        <Button
          onClick={() => navigate("/recruiter/home")}
          variant="outline"
          className="px-6 py-2 border-[#72265F] text-[#72265F] hover:bg-[#72265F] hover:text-white"
        >
          Back to Home
        </Button>
      </div>

      {/* Company Information */}
      <Card className="shadow-lg mb-6">
        <CardHeader>
          <CardTitle className="text-2xl text-[#72265F] flex items-center">
            <Building className="w-6 h-6 mr-3" />
            Company Information
          </CardTitle>
          <CardDescription>
            Basic company details and contact information
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Basic Company Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="border-l-4 border-[#72265F] pl-4">
                <h4 className="text-sm font-medium text-gray-500">Company Name</h4>
                <p className="text-lg font-semibold text-gray-900">{profileData.companyName}</p>
              </div>
              
              <div className="border-l-4 border-[#72265F] pl-4">
                <h4 className="text-sm font-medium text-gray-500">Email Address</h4>
                <p className="text-lg text-gray-900">{profileData.email}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="border-l-4 border-[#72265F] pl-4">
                <h4 className="text-sm font-medium text-gray-500">Phone Number</h4>
                <p className="text-lg text-gray-900 flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-[#72265F]" />
                  {profileData.companyProfile?.telephoneNo || 'Not provided'}
                </p>
              </div>
              
              <div className="border-l-4 border-[#72265F] pl-4">
                <h4 className="text-sm font-medium text-gray-500">Website</h4>
                <p className="text-lg text-gray-900 flex items-center">
                  <Globe className="w-4 h-4 mr-2 text-[#72265F]" />
                  {profileData.companyProfile?.website ? (
                    <a 
                      href={profileData.companyProfile.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#72265F] hover:underline"
                    >
                      {profileData.companyProfile.website}
                    </a>
                  ) : 'Not provided'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Persons */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Head HR */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-[#72265F] flex items-center">
              <User className="w-5 h-5 mr-2" />
              Head HR Contact
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="text-sm font-medium text-gray-500">Full Name</h4>
                <p className="text-lg font-semibold text-gray-900">
                  {profileData.companyProfile?.headHR?.name || 'Not provided'}
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="text-sm font-medium text-gray-500">Email Address</h4>
                <p className="text-lg text-gray-900 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-blue-500" />
                  {profileData.companyProfile?.headHR?.email || 'Not provided'}
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="text-sm font-medium text-gray-500">Mobile Number</h4>
                <p className="text-lg text-gray-900 flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-blue-500" />
                  {profileData.companyProfile?.headHR?.mobileNumber || 'Not provided'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Second Contact Person */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-[#72265F] flex items-center">
              <User className="w-5 h-5 mr-2" />
              Second Contact Person
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="text-sm font-medium text-gray-500">Full Name</h4>
                <p className="text-lg font-semibold text-gray-900">
                  {profileData.companyProfile?.secondContactPerson?.name || 'Not provided'}
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="text-sm font-medium text-gray-500">Email Address</h4>
                <p className="text-lg text-gray-900 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-green-500" />
                  {profileData.companyProfile?.secondContactPerson?.email || 'Not provided'}
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="text-sm font-medium text-gray-500">Mobile Number</h4>
                <p className="text-lg text-gray-900 flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-green-500" />
                  {profileData.companyProfile?.secondContactPerson?.mobileNumber || 'Not provided'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Status */}
      <Card className="shadow-lg mt-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center">
            <Badge className="bg-green-100 text-green-800 border-green-300 px-4 py-2">
              ✓ Profile Complete - Ready to Create JAF
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Help Section */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Need to make changes? <button onClick={() => navigate("/recruiter/edit-profile")} className="font-semibold text-[#72265F] hover:underline">Edit your profile</button> or <a href="mailto:placements@cs.du.ac.in" className="font-semibold text-[#72265F] hover:underline">contact support</a>
        </p>
      </div>
    </div>
  );
};

export default ViewProfile;