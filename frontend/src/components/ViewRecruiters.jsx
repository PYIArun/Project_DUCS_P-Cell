import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building, Globe, Mail, MapPin, Briefcase, Users, Eye, Phone, AlertCircle } from "lucide-react";

const ViewRecruiters = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Base URL for API calls - adjust this to match your server
  const API_BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const fetchRecruiters = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Updated endpoint to match the fixed routes
      const response = await axios.get(`${API_BASE_URL}/recruiters`);
      setRecruiters(response.data || []);
    } catch (error) {
      console.error('Error fetching recruiters:', error);
      
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Failed to fetch recruiters. Please check your connection and try again.';
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleViewRecruiter = (companyName, recruiterId) => {
    // Use company name if available, otherwise use recruiter ID
    const identifier = companyName || recruiterId;
    navigate(`/view-recruiters/${encodeURIComponent(identifier)}`);
  };

  const getProfileCompletionStatus = (recruiter) => {
    if (recruiter.profileCompleted) {
      return { status: 'Complete', color: 'bg-green-100 text-green-800' };
    } else {
      return { status: 'Incomplete', color: 'bg-orange-100 text-orange-800' };
    }
  };

  const handleRetry = () => {
    fetchRecruiters();
  };

  if (loading) {
    return (
      <div className="font-instrument min-h-screen py-8 px-4 w-full max-w-[75rem] mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#72265F] text-center mb-2">View Recruiters</h1>
          <p className="text-gray-600 text-center">Manage and view all registered recruiters and their companies</p>
        </div>
        
        <div className="bg-white rounded-2xl border border-gray-200">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#72265F] mx-auto mb-4"></div>
              <p className="text-gray-600">Loading recruiters...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="font-instrument min-h-screen py-8 px-4 w-full max-w-[75rem] mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#72265F] text-center mb-2">View Recruiters</h1>
          <p className="text-gray-600 text-center">Manage and view all registered recruiters and their companies</p>
        </div>
        
        <div className="bg-white rounded-2xl border border-gray-200">
          <div className="flex items-center justify-center py-12">
            <div className="text-center max-w-md">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Recruiters</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button 
                onClick={handleRetry}
                className="bg-[#72265F] hover:bg-[#913e7c] text-white"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-instrument min-h-screen py-8 px-4 w-full max-w-[75rem] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#72265F] text-center mb-2">View Recruiters</h1>
        <p className="text-gray-600 text-center">Manage and view all registered recruiters and their companies</p>
      </div>

      {/* Recruiters Section */}
      <div className="bg-white rounded-2xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#72265F]">Registered Recruiters</h2>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              {recruiters.length} recruiter{recruiters.length !== 1 ? 's' : ''}
            </div>
            <Button
              onClick={handleRetry}
              variant="outline"
              size="sm"
              className="text-[#72265F] border-[#72265F] hover:bg-[#72265F] hover:text-white"
            >
              Refresh
            </Button>
          </div>
        </div>

        <div className="p-6">
          {recruiters.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                <Building className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Recruiters Found</h3>
              <p className="text-gray-500 mb-4">No companies have registered yet.</p>
              <Button 
                onClick={handleRetry}
                variant="outline"
                className="text-[#72265F] border-[#72265F] hover:bg-[#72265F] hover:text-white"
              >
                Check Again
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recruiters.map((recruiter) => {
                const profileStatus = getProfileCompletionStatus(recruiter);
                
                return (
                  <Card 
                    key={recruiter._id || recruiter.id} 
                    className="hover:shadow-lg transition-shadow duration-300 border border-gray-200"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="w-12 h-12 bg-[#72265F] rounded-lg flex items-center justify-center flex-shrink-0">
                            <Building className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-lg text-[#72265F] truncate" title={recruiter.companyName}>
                              {recruiter.companyName || 'No Company Name'}
                            </CardTitle>
                            <Badge className={`${profileStatus.color} text-xs mt-1`}>
                              {profileStatus.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Basic Information */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                          <span className="text-gray-700 truncate" title={recruiter.email}>
                            {recruiter.email}
                          </span>
                        </div>
                        
                        {recruiter.companyProfile?.website && (
                          <div className="flex items-center gap-2 text-sm">
                            <Globe className="w-4 h-4 text-gray-500 flex-shrink-0" />
                            <a 
                              href={recruiter.companyProfile.website.startsWith('http') 
                                ? recruiter.companyProfile.website 
                                : `https://${recruiter.companyProfile.website}`
                              } 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-[#72265F] hover:underline truncate"
                              title={recruiter.companyProfile.website}
                            >
                              {recruiter.companyProfile.website}
                            </a>
                          </div>
                        )}

                        {recruiter.companyProfile?.telephoneNo && (
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                            <span className="text-gray-700">{recruiter.companyProfile.telephoneNo}</span>
                          </div>
                        )}

                        {/* HR Information */}
                        {recruiter.companyProfile?.headHR?.name && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-md">
                            <p className="text-xs text-gray-600 mb-1">Head HR:</p>
                            <p className="text-sm font-medium text-gray-800">{recruiter.companyProfile.headHR.name}</p>
                            {recruiter.companyProfile.headHR.email && (
                              <p className="text-xs text-gray-600 mt-1">{recruiter.companyProfile.headHR.email}</p>
                            )}
                            {recruiter.companyProfile.headHR.mobileNumber && (
                              <p className="text-xs text-gray-600">{recruiter.companyProfile.headHR.mobileNumber}</p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* JAF Count */}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">JAFs Created:</span>
                        <Badge variant="outline" className="text-[#72265F] border-[#72265F]">
                          {recruiter.jafCount || 0}
                        </Badge>
                      </div>

                      {/* Registration Date */}
                      <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
                        Registered on {new Date(recruiter.createdAt).toLocaleDateString("en-IN", {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>

                      {/* Action Button */}
                      <div className="pt-2">
                        <Button
                          onClick={() => handleViewRecruiter(
                            recruiter.companyName || recruiter.email, 
                            recruiter._id || recruiter.id
                          )}
                          className="w-full bg-[#72265F] hover:bg-[#913e7c] text-white"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Recruiter Profile
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewRecruiters;