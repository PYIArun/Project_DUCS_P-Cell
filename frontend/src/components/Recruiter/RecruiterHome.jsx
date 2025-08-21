import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, Trash2, Briefcase, Calendar, MapPin, DollarSign } from "lucide-react";
import { toast, Bounce } from 'react-toastify';

const RecruiterHome = () => {
  const [jafs, setJafs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { recruiterId, profileCompleted } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!recruiterId) return;
    fetchJAFs();
  }, [recruiterId]);

  const fetchJAFs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/recruiter/${recruiterId}/jafs`);
      setJafs(response.data);
    } catch (error) {
      console.error('Error fetching JAFs:', error);
      toast.error('Error fetching your job applications', {
        position: "bottom-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewJAF = (jafId) => {
    navigate(`/recruiter/jaf/${jafId}`);
  };

  const handleDeleteJAF = async (jafId) => {
    if (window.confirm('Are you sure you want to delete this JAF?')) {
      try {
        await axios.delete(`http://localhost:5000/jaf/${jafId}`);
        toast.success('JAF deleted successfully', {
          position: "bottom-center",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        });
        fetchJAFs();
      } catch (error) {
        console.error('Error deleting JAF:', error);
        toast.error('Error deleting JAF', {
          position: "bottom-center",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        });
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'submitted':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? dateString : date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="font-instrument min-h-screen py-8 px-4 w-full max-w-[75rem] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#72265F]">Recruiter Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back! Manage your job application forms.</p>
          </div>
          <Button
            onClick={() => navigate('/recruiter/create-jaf')}
            disabled={!profileCompleted}
            className="bg-[#72265F] hover:bg-[#913e7c] text-white shadow-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create JAF
          </Button>
        </div>

        {!profileCompleted && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800">
              <strong>Complete your profile first</strong> to create Job Application Forms.{' '}
              <span
                className="underline cursor-pointer font-semibold"
                onClick={() => navigate('/recruiter/complete-profile')}
              >
                Complete Profile
              </span>
            </p>
          </div>
        )}
      </div>

      {/* JAFs Section */}
      <div className="bg-white rounded-2xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#72265F]">Recent JAFs</h2>
          <div className="text-sm text-gray-500">
            {jafs.length} application{jafs.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#72265F] mx-auto mb-4"></div>
                <p className="text-gray-600">Loading your JAFs...</p>
              </div>
            </div>
          ) : jafs.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                <Briefcase className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No JAFs created yet</h3>
              <p className="text-gray-500 mb-4">
                Create your first Job Application Form to start recruiting students.
              </p>
              {profileCompleted && (
                <Button
                  onClick={() => navigate('/recruiter/create-jaf')}
                  className="bg-[#72265F] hover:bg-[#913e7c] text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First JAF
                </Button>
              )}
            </div>
          ) : (
            <div className="grid gap-6">
              {jafs.map((jaf) => (
                <Card key={jaf._id} className="hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                  <CardHeader className="pb-4 flex justify-between items-start">
                    <CardTitle className="text-xl text-[#72265F]">
                      {jaf.jobProfile?.jobProfile}
                    </CardTitle>
                    <Badge className={getStatusColor(jaf.status)}>
                      {jaf.status.charAt(0).toUpperCase() + jaf.status.slice(1)}
                    </Badge>
                  </CardHeader>

                  <CardContent className="pt-0 space-y-4">
                    {/* Job Profile */}
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                        <Briefcase className="w-4 h-4 mr-1" />
                        Job Profile
                      </h4>
                      <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                        <p><strong>Designation:</strong> {jaf.jobProfile?.jobDesignation}</p>
                        <p className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" /> {jaf.jobProfile?.placeOfPosting}
                        </p>
                        <p>{jaf.jobProfile?.jobDescription}</p>
                        <p className="flex items-center">
                          Salary : {jaf.jobProfile?.annualPackage}
                        </p>

                      </div>
                    </div>

                    {/* Selection Process */}
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Selection Process</h4>
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        <li>Pre-Placement Talk: {jaf.selectionProcess?.prePlacementTalk}</li>
                        <li>Online Assessment: {jaf.selectionProcess?.onlineAssessment}</li>
                        <li>Technical Interview: {jaf.selectionProcess?.personalTechnicalInterview}</li>
                        <li>HR Round: {jaf.selectionProcess?.hrRound}</li>
                        {jaf.selectionProcess?.anyOtherRounds && (
                          <li>Other Rounds: {jaf.selectionProcess?.anyOtherRounds}</li>
                        )}
                      </ul>
                    </div>

                    {/* Timeline */}
                    {(jaf.timeline?.onlineCodingTestDate || jaf.timeline?.interviewDate) && (
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                          <Calendar className="w-4 h-4 mr-1" /> Timeline
                        </h4>
                        <div className="text-sm space-y-1">
                          {jaf.timeline?.onlineCodingTestDate && (
                            <p>Coding Test: {formatDate(jaf.timeline.onlineCodingTestDate)}</p>
                          )}
                          {jaf.timeline?.interviewDate && (
                            <p>Interview: {formatDate(jaf.timeline.interviewDate)}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Created Date */}
                   <p>Created on {new Date(jaf.createdAt).toLocaleDateString("en-IN")}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruiterHome;
