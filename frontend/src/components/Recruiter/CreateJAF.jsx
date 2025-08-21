import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast, Bounce } from 'react-toastify';
import axios from 'axios';
import { Plus, Trash2, Save } from 'lucide-react';

const CreateJAF = () => {
  const { recruiterId, profileCompleted } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    recruiterId: recruiterId,
    coursesAllowed: {
      msc: 'No',
      mca: 'No'
    },
    recruitmentType: {
      internship: 'NO',
      fullTime: 'NO',
      internshipPlusFullTime: 'NO'
    },
    jobProfile: {   // ✅ Single object instead of array
      jobProfile: '',
      jobDesignation: '',
      placeOfPosting: '',
      jobDescription: '',
      annualPackage: '',
      breakageOfCTC: ''
    },
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
  }, [recruiterId, profileCompleted]);

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
        jobProfile: {
          ...prev.jobProfile,
          [field]: value
        }
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate at least one course
    if (formData.coursesAllowed.msc === 'No' && formData.coursesAllowed.mca === 'No') {
      toast.error('Please select at least one course', {
        position: "bottom-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    // Validate at least one recruitment type
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
    const profile = formData.jobProfile;
      if (!profile.jobProfile || !profile.jobDesignation || !profile.placeOfPosting ||
        !profile.jobDescription || !profile.annualPackage || !profile.breakageOfCTC) {
        toast.error(`Please fill in all details for Job Profile`, {
          position: "bottom-center",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        });
        return;
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

        {/* Job Profiles at the top */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-[#72265F]">Job Profile</CardTitle>
            <CardDescription>Add details for the job profile</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="border rounded-lg p-6 space-y-4 relative">
              <h3 className="font-semibold text-gray-700 mb-4">Job Profile</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Job Profile/Role *</Label>
                  <Input
                    value={formData.jobProfile.jobProfile}
                    onChange={(e) => handleInputChange('jobProfile', e.target.value)}
                    placeholder="e.g., Software Developer"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Job Designation *</Label>
                  <Input
                    value={formData.jobProfile.jobDesignation}
                    onChange={(e) => handleInputChange('jobDesignation', e.target.value)}
                    placeholder="e.g., Junior Developer"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Place of Posting *</Label>
                  <Input
                    value={formData.jobProfile.placeOfPosting}
                    onChange={(e) => handleInputChange('placeOfPosting', e.target.value)}
                    placeholder="e.g., Bangalore, Delhi NCR"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Annual Package (CTC) *</Label>
                  <Input
                    value={formData.jobProfile.annualPackage}
                    onChange={(e) => handleInputChange('annualPackage', e.target.value)}
                    placeholder="e.g., 6-8 LPA"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Job Description *</Label>
                <Textarea
                  value={formData.jobProfile.jobDescription}
                  onChange={(e) => handleInputChange('jobDescription', e.target.value)}
                  placeholder="Describe the role, responsibilities, and requirements..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Breakage of CTC *</Label>
                <Textarea
                  value={formData.jobProfile.breakageOfCTC}
                  onChange={(e) => handleInputChange('breakageOfCTC', e.target.value)}
                  placeholder="e.g., Basic: 4L, HRA: 1L, Other Allowances: 1L, etc."
                  rows={3}
                  required
                />
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
                <Label>Internship Only</Label>
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
                <Label>Full Time Only</Label>
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
                <Label>Internship + Full Time</Label>
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
