import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast, Bounce } from 'react-toastify';
import axios from 'axios';
import { Plus, Trash2, Save, Calendar, Users, Briefcase, FileText } from 'lucide-react';

const CreateJAF = () => {
  const { recruiterId, userEmail, profileCompleted } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [recruiterData, setRecruiterData] = useState(null);

  const [formData, setFormData] = useState({
    companyName: '',
    telephoneNo: '',
    emailAddress: '',
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
    },
    coursesAllowed: {
      msc: 'No',
      mca: 'No'
    },
    recruitmentType: {
      internship: 'NO',
      fullTime: 'NO',
      internshipPlusFullTime: 'NO'
    },
    jobProfiles: [{
      jobProfile: '',
      jobDesignation: '',
      placeOfPosting: '',
      jobDescription: '',
      annualPackage: '',
      breakageOfCTC: ''
    }],
    selectionProcess: {
      prePlacementTalk: 'NO',
      onlineAssessment: 'NO',
      personalTechnicalInterview: 'NO',
      hrRound: 'NO',
      anyOtherRounds: ''
    },
    timeline: {
      onlineCodingTestDate: '',
      interviewDate: ''
    }
  });

  useEffect(() => {
    if (!recruiterId) {
      navigate('/login');
      return;
    }
    if (!profileCompleted) {
      navigate('/recruiter/complete-profile');
      return;
    }
    fetchRecruiterData();
  }, [recruiterId, profileCompleted]);

  const fetchRecruiterData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/recruiter/${userEmail}`);
      const recruiter = response.data;
      setRecruiterData(recruiter);
      
      // Pre-fill form with recruiter's profile data
      setFormData(prev => ({
        ...prev,
        companyName: recruiter.companyName,
        telephoneNo: recruiter.companyProfile?.telephoneNo || '',
        emailAddress: recruiter.email,
        website: recruiter.companyProfile?.website || '',
        headHR: recruiter.companyProfile?.headHR || prev.headHR,
        secondContactPerson: recruiter.companyProfile?.secondContactPerson || prev.secondContactPerson
      }));
    } catch (error) {
      console.error('Error fetching recruiter data:', error);
      toast.error('Error loading profile data', {
        position: "bottom-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleInputChange = (field, value, index = null) => {
    if (field.includes('.') && index === null) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else if (index !== null) {
      // Handle job profiles array
      setFormData(prev => ({
        ...prev,
        jobProfiles: prev.jobProfiles.map((profile, i) => 
          i === index ? { ...profile, [field]: value } : profile
        )
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const addJobProfile = () => {
    setFormData(prev => ({
      ...prev,
      jobProfiles: [...prev.jobProfiles, {
        jobProfile: '',
        jobDesignation: '',
        placeOfPosting: '',
        jobDescription: '',
        annualPackage: '',
        breakageOfCTC: ''
      }]
    }));
  };

  const removeJobProfile = (index) => {
    if (formData.jobProfiles.length > 1) {
      setFormData(prev => ({
        ...prev,
        jobProfiles: prev.jobProfiles.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.companyName || !formData.telephoneNo || !formData.emailAddress || !formData.website) {
      toast.error('Please fill in all company details', {
        position: "bottom-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    // Validate at least one course is selected
    if (formData.coursesAllowed.msc === 'No' && formData.coursesAllowed.mca === 'No') {
      toast.error('Please select at least one course', {
        position: "bottom-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    // Validate at least one recruitment type is selected
    if (formData.recruitmentType.internship === 'NO' && 
        formData.recruitmentType.fullTime === 'NO' && 
        formData.recruitmentType.internshipPlusFullTime === 'NO') {
      toast.error('Please select at least one recruitment type', {
        position: "bottom-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    // Validate job profiles
    for (let i = 0; i < formData.jobProfiles.length; i++) {
      const profile = formData.jobProfiles[i];
      if (!profile.jobProfile || !profile.jobDesignation || !profile.placeOfPosting || 
          !profile.jobDescription || !profile.annualPackage || !profile.breakageOfCTC) {
        toast.error(`Please fill in all details for Job Profile ${i + 1}`, {
          position: "bottom-center",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        });
        return;
      }
    }

    try {
      setLoading(true);
      
      await axios.post(`http://localhost:5000/recruiter/${recruiterId}/jaf`, formData);
      
      toast.success('JAF created successfully!', {
        position: "bottom-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
      
      navigate('/recruiter/home');
    } catch (error) {
      console.error('Error creating JAF:', error);
      toast.error(error.response?.data?.message || 'Error creating JAF', {
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
    <div className="font-instrument min-h-screen py-8 px-4 w-full max-w-[80rem] mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#72265F] text-center">Create Job Application Form</h1>
        <p className="text-gray-600 text-center mt-2">
          Fill out the details for your job posting according to DUCS placement requirements
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Company Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-[#72265F]">Company Details</CardTitle>
            <CardDescription>Basic information about your company</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Name of the Company *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telephoneNo">Telephone Number *</Label>
                <Input
                  id="telephoneNo"
                  type="tel"
                  value={formData.telephoneNo}
                  onChange={(e) => handleInputChange('telephoneNo', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emailAddress">Email Address *</Label>
                <Input
                  id="emailAddress"
                  type="email"
                  value={formData.emailAddress}
                  onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website *</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-[#72265F]">Contact Details</CardTitle>
            <CardDescription>Primary and secondary contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Head HR */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Head HR</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="headHR.name">Name *</Label>
                  <Input
                    id="headHR.name"
                    value={formData.headHR.name}
                    onChange={(e) => handleInputChange('headHR.name', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="headHR.email">Email *</Label>
                  <Input
                    id="headHR.email"
                    type="email"
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
                    value={formData.headHR.mobileNumber}
                    onChange={(e) => handleInputChange('headHR.mobileNumber', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Second Contact Person */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Second Contact Person</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="secondContactPerson.name">Name *</Label>
                  <Input
                    id="secondContactPerson.name"
                    value={formData.secondContactPerson.name}
                    onChange={(e) => handleInputChange('secondContactPerson.name', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondContactPerson.email">Email *</Label>
                  <Input
                    id="secondContactPerson.email"
                    type="email"
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
                    value={formData.secondContactPerson.mobileNumber}
                    onChange={(e) => handleInputChange('secondContactPerson.mobileNumber', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Courses Allowed */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-[#72265F]">Courses Allowed</CardTitle>
            <CardDescription>Select which courses are eligible for this position</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="msc">M.Sc Computer Science</Label>
                <Select
                  value={formData.coursesAllowed.msc}
                  onValueChange={(value) => handleInputChange('coursesAllowed.msc', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mca">MCA</Label>
                <Select
                  value={formData.coursesAllowed.mca}
                  onValueChange={(value) => handleInputChange('coursesAllowed.mca', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recruitment Type */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-[#72265F]">Recruitment Type</CardTitle>
            <CardDescription>Select the type of recruitment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="internship">Internship Only</Label>
                <Select
                  value={formData.recruitmentType.internship}
                  onValueChange={(value) => handleInputChange('recruitmentType.internship', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="YES">Yes</SelectItem>
                    <SelectItem value="NO">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullTime">Full Time Only</Label>
                <Select
                  value={formData.recruitmentType.fullTime}
                  onValueChange={(value) => handleInputChange('recruitmentType.fullTime', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="YES">Yes</SelectItem>
                    <SelectItem value="NO">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="internshipPlusFullTime">Internship + Full Time</Label>
                <Select
                  value={formData.recruitmentType.internshipPlusFullTime}
                  onValueChange={(value) => handleInputChange('recruitmentType.internshipPlusFullTime', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="YES">Yes</SelectItem>
                    <SelectItem value="NO">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Profiles */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-[#72265F]">Job Profiles</CardTitle>
            <CardDescription>Add details for each job profile you're offering</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {formData.jobProfiles.map((profile, index) => (
              <div key={index} className="border rounded-lg p-6 space-y-4 relative">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-700">Job Profile {index + 1}</h3>
                  {formData.jobProfiles.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeJobProfile(index)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  )}
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Job Profile/Role *</Label>
                    <Input
                      value={profile.jobProfile}
                      onChange={(e) => handleInputChange('jobProfile', e.target.value, index)}
                      placeholder="e.g., Software Developer"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Job Designation *</Label>
                    <Input
                      value={profile.jobDesignation}
                      onChange={(e) => handleInputChange('jobDesignation', e.target.value, index)}
                      placeholder="e.g., Junior Developer"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Place of Posting *</Label>
                    <Input
                      value={profile.placeOfPosting}
                      onChange={(e) => handleInputChange('placeOfPosting', e.target.value, index)}
                      placeholder="e.g., Bangalore, Delhi NCR"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Annual Package (CTC) *</Label>
                    <Input
                      value={profile.annualPackage}
                      onChange={(e) => handleInputChange('annualPackage', e.target.value, index)}
                      placeholder="e.g., 6-8 LPA"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Job Description *</Label>
                  <Textarea
                    value={profile.jobDescription}
                    onChange={(e) => handleInputChange('jobDescription', e.target.value, index)}
                    placeholder="Describe the role, responsibilities, and requirements..."
                    rows={4}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Breakage of CTC *</Label>
                  <Textarea
                    value={profile.breakageOfCTC}
                    onChange={(e) => handleInputChange('breakageOfCTC', e.target.value, index)}
                    placeholder="e.g., Basic: 4L, HRA: 1L, Other Allowances: 1L, etc."
                    rows={3}
                    required
                  />
                </div>
              </div>
            ))}
            
            <Button
              type="button"
              onClick={addJobProfile}
              variant="outline"
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Job Profile
            </Button>
          </CardContent>
        </Card>

        {/* Selection Process */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-[#72265F]">Selection Process</CardTitle>
            <CardDescription>Specify the selection rounds</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Pre-Placement Talk</Label>
                <Select
                  value={formData.selectionProcess.prePlacementTalk}
                  onValueChange={(value) => handleInputChange('selectionProcess.prePlacementTalk', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="YES">Yes</SelectItem>
                    <SelectItem value="NO">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Online Assessment</Label>
                <Select
                  value={formData.selectionProcess.onlineAssessment}
                  onValueChange={(value) => handleInputChange('selectionProcess.onlineAssessment', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="YES">Yes</SelectItem>
                    <SelectItem value="NO">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Personal/Technical Interview</Label>
                <Select
                  value={formData.selectionProcess.personalTechnicalInterview}
                  onValueChange={(value) => handleInputChange('selectionProcess.personalTechnicalInterview', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="YES">Yes</SelectItem>
                    <SelectItem value="NO">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>HR Round</Label>
                <Select
                  value={formData.selectionProcess.hrRound}
                  onValueChange={(value) => handleInputChange('selectionProcess.hrRound', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="YES">Yes</SelectItem>
                    <SelectItem value="NO">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Any Other Rounds (Optional)</Label>
              <Textarea
                value={formData.selectionProcess.anyOtherRounds}
                onChange={(e) => handleInputChange('selectionProcess.anyOtherRounds', e.target.value)}
                placeholder="Describe any additional selection rounds..."
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-[#72265F]">Timeline</CardTitle>
            <CardDescription>Proposed dates for the recruitment process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="onlineCodingTestDate">Online Coding Test Date (if applicable)</Label>
                <Input
                  id="onlineCodingTestDate"
                  type="date"
                  value={formData.timeline.onlineCodingTestDate}
                  onChange={(e) => handleInputChange('timeline.onlineCodingTestDate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="interviewDate">Interview Date (tentative)</Label>
                <Input
                  id="interviewDate"
                  type="date"
                  value={formData.timeline.interviewDate}
                  onChange={(e) => handleInputChange('timeline.interviewDate', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/recruiter/home')}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="bg-[#72265F] hover:bg-[#5a1e4c]"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating JAF...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Create JAF
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateJAF;