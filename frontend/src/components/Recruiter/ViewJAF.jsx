import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast, Bounce } from 'react-toastify';
import axios from 'axios';
import { 
  ArrowLeft, 
  Building, 
  Phone, 
  Mail, 
  Globe, 
  User, 
  Users, 
  GraduationCap,
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  CheckCircle,
  XCircle,
  Edit,
  FileText,
  Loader2,
  AlertCircle,
  Target,
  Award,
  Clock,
  Code,
  Star,
  TrendingUp
} from 'lucide-react';

const ViewJAF = () => {
  const { jafId } = useParams();
  const navigate = useNavigate();
  const [jaf, setJaf] = useState(null);
  const [recruiterData, setRecruiterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (jafId) {
      fetchJAFAndRecruiter();
    }
  }, [jafId]);

  const fetchJAFAndRecruiter = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch JAF data first
      const jafResponse = await axios.get(`http://localhost:5000/jaf/${jafId}`);
      const jafData = jafResponse.data;
      setJaf(jafData);

      // Then fetch full recruiter profile using the email from populated recruiterId
      if (jafData.recruiterId?.email) {
        const recruiterResponse = await axios.get(`http://localhost:5000/recruiter/${jafData.recruiterId.email}`);
        setRecruiterData(recruiterResponse.data);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.response?.data?.message || 'Error loading JAF details');
      toast.error('Error loading JAF details', {
        position: "bottom-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'submitted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPackage = (amount) => {
    if (!amount) return 'Not specified';
    return `₹${amount} LPA`;
  };

  if (loading) {
    return (
      <div className="font-instrument min-h-screen py-8 px-4 w-full max-w-[80rem] mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-[#72265F]" />
            <span className="text-lg text-gray-600">Loading JAF details...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !jaf) {
    return (
      <div className="font-instrument min-h-screen py-8 px-4 w-full max-w-[80rem] mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {error || 'JAF Not Found'}
            </h2>
            <p className="text-gray-600 mb-4">
              {error || 'The requested JAF could not be found.'}
            </p>
            <Button
              variant="outline"
              onClick={() => navigate('/recruiter/home')}
              className="text-[#72265F] border-[#72265F] hover:bg-[#72265F] hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-instrument min-h-screen py-8 px-4 w-full max-w-[80rem] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/recruiter/home')}
              className="text-[#72265F] border-[#72265F] hover:bg-[#72265F] hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-[#72265F]">Job Application Form</h1>
              <p className="text-gray-600">View detailed JAF information</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className={`${getStatusColor(jaf.status)} text-sm px-3 py-1`}>
              {jaf.status?.charAt(0).toUpperCase() + jaf.status?.slice(1)}
            </Badge>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Company Details */}
        {recruiterData && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-[#72265F] flex items-center">
                <Building className="w-5 h-5 mr-2" />
                Company Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Company Name</p>
                      <p className="font-semibold">{recruiterData.companyName || 'Not specified'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Telephone</p>
                      <p className="font-semibold">{recruiterData.companyProfile?.telephoneNo || 'Not specified'}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="font-semibold">{recruiterData.email || 'Not specified'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Website</p>
                      {recruiterData.companyProfile?.website ? (
                        <a 
                          href={recruiterData.companyProfile.website.startsWith('http') ? 
                            recruiterData.companyProfile.website : 
                            `https://${recruiterData.companyProfile.website}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-semibold text-blue-600 hover:underline"
                        >
                          {recruiterData.companyProfile.website}
                        </a>
                      ) : (
                        <p className="font-semibold">Not specified</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contact Details */}
        {recruiterData?.companyProfile && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-[#72265F] flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Contact Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Head HR */}
                <div>
                  <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Head HR
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-semibold">{recruiterData.companyProfile.headHR?.name || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-semibold">{recruiterData.companyProfile.headHR?.email || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Mobile</p>
                      <p className="font-semibold">{recruiterData.companyProfile.headHR?.mobileNumber || 'Not specified'}</p>
                    </div>
                  </div>
                </div>

                {/* Second Contact */}
                <div>
                  <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Second Contact Person
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-semibold">{recruiterData.companyProfile.secondContactPerson?.name || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-semibold">{recruiterData.companyProfile.secondContactPerson?.email || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Mobile</p>
                      <p className="font-semibold">{recruiterData.companyProfile.secondContactPerson?.mobileNumber || 'Not specified'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Job Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-[#72265F] flex items-center">
              <Briefcase className="w-5 h-5 mr-2" />
              Job Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Target className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Job Profile</p>
                      <p className="font-semibold text-lg">{jaf.jobDetails?.jobProfile || 'Not specified'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Job Designation</p>
                      <p className="font-semibold">{jaf.jobDetails?.jobDesignation || 'Not specified'}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Place of Posting</p>
                      <p className="font-semibold">{jaf.jobDetails?.placeOfPosting || 'Not specified'}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {jaf.jobDetails?.jobDescription && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Job Description</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm leading-relaxed">{jaf.jobDetails.jobDescription}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recruitment Type & Salary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-[#72265F] flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Recruitment Type & Compensation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Recruitment Type */}
              {jaf.recruitmentType && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-4">Recruitment Type</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Internship</span>
                      <Badge variant={jaf.recruitmentType.internship ? 'default' : 'secondary'}>
                        {jaf.recruitmentType.internship ? 'Yes' : 'No'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Full Time</span>
                      <Badge variant={jaf.recruitmentType.fullTime ? 'default' : 'secondary'}>
                        {jaf.recruitmentType.fullTime ? 'Yes' : 'No'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Internship + Full Time</span>
                      <Badge variant={jaf.recruitmentType.internshipPlusFullTime ? 'default' : 'secondary'}>
                        {jaf.recruitmentType.internshipPlusFullTime ? 'Yes' : 'No'}
                      </Badge>
                    </div>
                  </div>
                </div>
              )}

              {/* Salary Details */}
              {jaf.salaryDetails && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-4">Compensation Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Annual Package</p>
                      <p className="font-semibold text-lg text-green-600">
                        {formatPackage(jaf.salaryDetails.annualPackage)}
                      </p>
                    </div>
                    {jaf.salaryDetails.stipend && (
                      <div>
                        <p className="text-sm text-gray-500">Stipend</p>
                        <p className="font-semibold">₹{jaf.salaryDetails.stipend}/month</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {jaf.salaryDetails?.ctcBreakage && (
              <>
                <Separator className="my-4" />
                <div>
                  <p className="text-sm text-gray-500 mb-2">CTC Breakdown</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm leading-relaxed">{jaf.salaryDetails.ctcBreakage}</p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Requirements */}
        {jaf.requirements && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-[#72265F] flex items-center">
                <GraduationCap className="w-5 h-5 mr-2" />
                Requirements & Eligibility
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  {/* Required Skills */}
                  {jaf.requirements.requiredSkills?.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                        <Code className="w-4 h-4 mr-2" />
                        Required Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {jaf.requirements.requiredSkills.map((skill, index) => (
                          <Badge key={index} variant="default" className="bg-red-100 text-red-800">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Eligible Branches */}
                  {jaf.requirements.eligibleBranches?.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-2">Eligible Branches</h3>
                      <div className="space-y-1">
                        {jaf.requirements.eligibleBranches.map((branch, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm">{branch}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Preferred Skills */}
                  {jaf.requirements.preferredSkills?.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                        <Star className="w-4 h-4 mr-2" />
                        Preferred Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {jaf.requirements.preferredSkills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Other Requirements */}
                  <div className="space-y-3">
                    {jaf.requirements.minimumCGPA && (
                      <div>
                        <p className="text-sm text-gray-500">Minimum CGPA</p>
                        <p className="font-semibold">{jaf.requirements.minimumCGPA}</p>
                      </div>
                    )}
                    {jaf.requirements.experienceRequired && (
                      <div>
                        <p className="text-sm text-gray-500">Experience Required</p>
                        <p className="font-semibold">{jaf.requirements.experienceRequired}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Timeline */}
        {jaf.placementTimeline && (jaf.placementTimeline.onlineCodingTestDate || jaf.placementTimeline.interviewDate) && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-[#72265F] flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Placement Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {jaf.placementTimeline.onlineCodingTestDate && (
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Online Coding Test Date</p>
                      <p className="font-semibold">{formatDateTime(jaf.placementTimeline.onlineCodingTestDate)}</p>
                    </div>
                  </div>
                )}
                {jaf.placementTimeline.interviewDate && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Interview Date</p>
                      <p className="font-semibold">{formatDateTime(jaf.placementTimeline.interviewDate)}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Application Statistics */}
        {jaf.applicationStats && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-[#72265F] flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Application Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {jaf.applicationStats.totalApplications || 0}
                  </div>
                  <div className="text-sm text-gray-500">Total Applications</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {jaf.applicationStats.shortlisted || 0}
                  </div>
                  <div className="text-sm text-gray-500">Shortlisted</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {jaf.applicationStats.selected || 0}
                  </div>
                  <div className="text-sm text-gray-500">Selected</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Disclaimer */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-[#72265F]">Disclaimer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>DISCLAIMER:</strong> The Company hereby confirms and agrees that all Details, Selection procedures, 
                Salary Breakdown are fixed and cannot be changed after submission of the Job Application form and 
                will be followed throughout the placement Process.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Submission Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-[#72265F]">Submission Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-gray-500">Created On</p>
                <p className="font-semibold">
                  {formatDateTime(jaf.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Last Updated</p>
                <p className="font-semibold">
                  {formatDateTime(jaf.updatedAt)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ViewJAF;