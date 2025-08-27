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
  Loader2,
  AlertCircle,
  Target,
  Award,
  Clock,
  FileText,
  BookOpen
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
      const jafResponse = await axios.get(`http://localhost:5000/recruiter/jaf/${jafId}`);
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

        {/* Courses Allowed */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-[#72265F] flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Courses Allowed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between">
                <span className="font-medium">M.Sc Computer Science</span>
                <Badge variant={jaf.coursesAllowed?.msc === 'Yes' ? 'default' : 'secondary'} 
                       className={jaf.coursesAllowed?.msc === 'Yes' ? 'bg-green-100 text-green-800' : ''}>
                  {jaf.coursesAllowed?.msc || 'No'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">MCA</span>
                <Badge variant={jaf.coursesAllowed?.mca === 'Yes' ? 'default' : 'secondary'}
                       className={jaf.coursesAllowed?.mca === 'Yes' ? 'bg-green-100 text-green-800' : ''}>
                  {jaf.coursesAllowed?.mca || 'No'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Profile Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-[#72265F] flex items-center">
              <Briefcase className="w-5 h-5 mr-2" />
              Job Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Target className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Job Profile/Role</p>
                      <p className="font-semibold text-lg">{jaf.jobProfile?.jobProfile || 'Not specified'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Job Designation</p>
                      <p className="font-semibold">{jaf.jobProfile?.jobDesignation || 'Not specified'}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Place of Posting</p>
                      <p className="font-semibold">{jaf.jobProfile?.placeOfPosting || 'Not specified'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Annual Package</p>
                      <p className="font-semibold text-lg text-green-600">{jaf.jobProfile?.annualPackage || 'Not specified'}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {jaf.jobProfile?.jobDescription && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Job Description</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm leading-relaxed">{jaf.jobProfile.jobDescription}</p>
                  </div>
                </div>
              )}

              {jaf.jobProfile?.breakageOfCTC && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">CTC Breakdown</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm leading-relaxed">{jaf.jobProfile.breakageOfCTC}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recruitment Type */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-[#72265F] flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Recruitment Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center justify-between">
                <span className="font-medium">Internship Only</span>
                <Badge variant={jaf.recruitmentType?.internship === 'YES' ? 'default' : 'secondary'}
                       className={jaf.recruitmentType?.internship === 'YES' ? 'bg-green-100 text-green-800' : ''}>
                  {jaf.recruitmentType?.internship || 'NO'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Full Time Only</span>
                <Badge variant={jaf.recruitmentType?.fullTime === 'YES' ? 'default' : 'secondary'}
                       className={jaf.recruitmentType?.fullTime === 'YES' ? 'bg-green-100 text-green-800' : ''}>
                  {jaf.recruitmentType?.fullTime || 'NO'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Internship + Full Time</span>
                <Badge variant={jaf.recruitmentType?.internshipPlusFullTime === 'YES' ? 'default' : 'secondary'}
                       className={jaf.recruitmentType?.internshipPlusFullTime === 'YES' ? 'bg-green-100 text-green-800' : ''}>
                  {jaf.recruitmentType?.internshipPlusFullTime || 'NO'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selection Process */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-[#72265F] flex items-center">
              <GraduationCap className="w-5 h-5 mr-2" />
              Selection Process
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Pre-Placement Talk</span>
                  <Badge variant={jaf.selectionProcess?.prePlacementTalk === 'YES' ? 'default' : 'secondary'}
                         className={jaf.selectionProcess?.prePlacementTalk === 'YES' ? 'bg-green-100 text-green-800' : ''}>
                    {jaf.selectionProcess?.prePlacementTalk || 'NO'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Online Assessment</span>
                  <Badge variant={jaf.selectionProcess?.onlineAssessment === 'YES' ? 'default' : 'secondary'}
                         className={jaf.selectionProcess?.onlineAssessment === 'YES' ? 'bg-green-100 text-green-800' : ''}>
                    {jaf.selectionProcess?.onlineAssessment || 'NO'}
                  </Badge>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Technical Interview</span>
                  <Badge variant={jaf.selectionProcess?.personalTechnicalInterview === 'YES' ? 'default' : 'secondary'}
                         className={jaf.selectionProcess?.personalTechnicalInterview === 'YES' ? 'bg-green-100 text-green-800' : ''}>
                    {jaf.selectionProcess?.personalTechnicalInterview || 'NO'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>HR Round</span>
                  <Badge variant={jaf.selectionProcess?.hrRound === 'YES' ? 'default' : 'secondary'}
                         className={jaf.selectionProcess?.hrRound === 'YES' ? 'bg-green-100 text-green-800' : ''}>
                    {jaf.selectionProcess?.hrRound || 'NO'}
                  </Badge>
                </div>
              </div>
            </div>
            
            {jaf.selectionProcess?.anyOtherRounds && (
              <>
                <Separator className="my-4" />
                <div>
                  <p className="text-sm text-gray-500 mb-2">Other Rounds</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm leading-relaxed">{jaf.selectionProcess.anyOtherRounds}</p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Timeline */}
        {(jaf.timeline?.onlineCodingTestDate || jaf.timeline?.interviewDate) && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-[#72265F] flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {jaf.timeline.onlineCodingTestDate && (
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Online Coding Test Date</p>
                      <p className="font-semibold">{formatDate(jaf.timeline.onlineCodingTestDate)}</p>
                    </div>
                  </div>
                )}
                {jaf.timeline.interviewDate && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Interview Date</p>
                      <p className="font-semibold">{formatDate(jaf.timeline.interviewDate)}</p>
                    </div>
                  </div>
                )}
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