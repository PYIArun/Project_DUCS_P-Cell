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
  FileText
} from 'lucide-react';

const ViewJAF = () => {
  const { jafId } = useParams();
  const navigate = useNavigate();
  const [jaf, setJaf] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJAF();
  }, [jafId]);

  const fetchJAF = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/jaf/${jafId}`);
      setJaf(response.data);
    } catch (error) {
      console.error('Error fetching JAF:', error);
      toast.error('Error loading JAF details', {
        position: "bottom-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
      navigate('/recruiter/home');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  if (loading) {
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
            <Badge className={getStatusColor(jaf.status)} size="lg">
              {jaf.status.charAt(0).toUpperCase() + jaf.status.slice(1)}
            </Badge>
            <Button
              onClick={() => navigate(`/recruiter/edit-jaf/${jaf._id}`)}
              className="bg-[#72265F] hover:bg-[#913e7c] text-white"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit JAF
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Company Details */}
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
                    <p className="font-semibold">{jaf.companyName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Telephone</p>
                    <p className="font-semibold">{jaf.telephoneNo}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-semibold">{jaf.emailAddress}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Website</p>
                    <a 
                      href={jaf.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      {jaf.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Details */}
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
                    <p className="font-semibold">{jaf.headHR.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold">{jaf.headHR.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mobile</p>
                    <p className="font-semibold">{jaf.headHR.mobileNumber}</p>
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
                    <p className="font-semibold">{jaf.secondContactPerson.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold">{jaf.secondContactPerson.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mobile</p>
                    <p className="font-semibold">{jaf.secondContactPerson.mobileNumber}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Eligibility */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-[#72265F] flex items-center">
              <GraduationCap className="w-5 h-5 mr-2" />
              Eligibility & Recruitment Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Courses Allowed */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-4">Courses Allowed</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>M.Sc</span>
                    <Badge variant={jaf.coursesAllowed.msc === 'Yes' ? 'default' : 'secondary'}>
                      {jaf.coursesAllowed.msc}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>MCA</span>
                    <Badge variant={jaf.coursesAllowed.mca === 'Yes' ? 'default' : 'secondary'}>
                      {jaf.coursesAllowed.mca}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Recruitment Type */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-4">Recruitment Type</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Internship</span>
                    <Badge variant={jaf.recruitmentType.internship === 'YES' ? 'default' : 'secondary'}>
                      {jaf.recruitmentType.internship}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Full Time</span>
                    <Badge variant={jaf.recruitmentType.fullTime === 'YES' ? 'default' : 'secondary'}>
                      {jaf.recruitmentType.fullTime}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Internship + Full Time</span>
                    <Badge variant={jaf.recruitmentType.internshipPlusFullTime === 'YES' ? 'default' : 'secondary'}>
                      {jaf.recruitmentType.internshipPlusFullTime}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Profiles */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-[#72265F] flex items-center">
              <Briefcase className="w-5 h-5 mr-2" />
              Job Profiles ({jaf.jobProfiles.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {jaf.jobProfiles.map((profile, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg text-[#72265F]">
                      Profile {index + 1}: {profile.jobProfile}
                    </h3>
                    <Badge variant="outline" className="text-sm">
                      {profile.jobDesignation}
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Place of Posting</p>
                          <p className="font-semibold">{profile.placeOfPosting}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Annual Package</p>
                          <p className="font-semibold">{profile.annualPackage}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Job Description</p>
                        <p className="text-sm bg-gray-50 p-3 rounded-lg">
                          {profile.jobDescription}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div>
                    <p className="text-sm text-gray-500 mb-2">CTC Breakdown</p>
                    <p className="text-sm bg-gray-50 p-3 rounded-lg">
                      {profile.breakageOfCTC}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Selection Process */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-[#72265F] flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Selection Process
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Pre-Placement Talk</span>
                  <div className="flex items-center gap-2">
                    {jaf.selectionProcess.prePlacementTalk === 'YES' ? 
                      <CheckCircle className="w-4 h-4 text-green-600" /> : 
                      <XCircle className="w-4 h-4 text-red-600" />
                    }
                    <span className="text-sm">{jaf.selectionProcess.prePlacementTalk}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Online Assessment</span>
                  <div className="flex items-center gap-2">
                    {jaf.selectionProcess.onlineAssessment === 'YES' ? 
                      <CheckCircle className="w-4 h-4 text-green-600" /> : 
                      <XCircle className="w-4 h-4 text-red-600" />
                    }
                    <span className="text-sm">{jaf.selectionProcess.onlineAssessment}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Personal/Technical Interview</span>
                  <div className="flex items-center gap-2">
                    {jaf.selectionProcess.personalTechnicalInterview === 'YES' ? 
                      <CheckCircle className="w-4 h-4 text-green-600" /> : 
                      <XCircle className="w-4 h-4 text-red-600" />
                    }
                    <span className="text-sm">{jaf.selectionProcess.personalTechnicalInterview}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>HR Round</span>
                  <div className="flex items-center gap-2">
                    {jaf.selectionProcess.hrRound === 'YES' ? 
                      <CheckCircle className="w-4 h-4 text-green-600" /> : 
                      <XCircle className="w-4 h-4 text-red-600" />
                    }
                    <span className="text-sm">{jaf.selectionProcess.hrRound}</span>
                  </div>
                </div>
              </div>
            </div>

            {jaf.selectionProcess.anyOtherRounds && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Additional Rounds</p>
                <p className="text-sm bg-gray-50 p-3 rounded-lg">
                  {jaf.selectionProcess.anyOtherRounds}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-[#72265F] flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Placement Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Online Coding Test Date</p>
                  <p className="font-semibold">{formatDate(jaf.timeline.onlineCodingTestDate)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Interview Date</p>
                  <p className="font-semibold">{formatDate(jaf.timeline.interviewDate)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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
                  {new Date(jaf.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Last Updated</p>
                <p className="font-semibold">
                  {new Date(jaf.updatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
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