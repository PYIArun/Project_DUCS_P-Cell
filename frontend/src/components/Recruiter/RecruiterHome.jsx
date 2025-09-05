import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, Trash2, Briefcase, Calendar, MapPin, DollarSign, Users, X, Copy, Check, Building } from "lucide-react";
import { toast, Bounce } from 'react-toastify';

const RecruiterHome = () => {
  const [jafs, setJafs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAppliedStudentsModal, setShowAppliedStudentsModal] = useState(false);
  const [selectedJaf, setSelectedJaf] = useState(null);
  const [appliedStudents, setAppliedStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [linkedCompanies, setLinkedCompanies] = useState({});
  const { recruiterId, profileCompleted, role } = useAuth();
  const navigate = useNavigate();

  // Status options for dropdown
  const statusOptions = [
    'Applied',
    'Shortlisted for OA',
    'Shortlisted for Technical Round 1',
    'Shortlisted for Technical Round 2',
    'HR Selected',
    'Final Selected',
    'Rejected'
  ];

  useEffect(() => {
    if (!recruiterId) return;
    fetchJAFs();
    fetchLinkedCompanies();
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

  const fetchLinkedCompanies = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/companies/recruiter/${recruiterId}`);
      const companies = response.data;
      
      // Create a map of JAF ID to company for easy lookup
      const companyMap = {};
      companies.forEach(company => {
        if (company.jafId) {
          companyMap[company.jafId] = company;
        }
      });
      
      setLinkedCompanies(companyMap);
    } catch (error) {
      console.error('Error fetching linked companies:', error);
      // Don't show error toast for this as it's supplementary data
    }
  };

  const handleViewJAF = (jafId) => {
    navigate(`/recruiter/jaf/${jafId}`);
  };

  // Fixed handleDeleteJAF function for RecruiterHome.jsx
const handleDeleteJAF = async (jafId) => {
  if (window.confirm('Are you sure you want to delete this JAF?')) {
    try {
      console.log("Deleting JAF with ID:", jafId);
      
      // Fixed endpoint - should match the route in your router
      const response = await axios.delete(`http://localhost:5000/recruiter/jaf/${jafId}`);
      
      console.log("Delete response:", response.data);
      
      toast.success('JAF deleted successfully', {
        position: "bottom-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
      
      // Refresh the JAFs list
      fetchJAFs();
      // Refresh linked companies
      fetchLinkedCompanies();
      
    } catch (error) {
      console.error('Error deleting JAF:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      const errorMessage = error.response?.data?.message || 'Error deleting JAF';
      
      toast.error(errorMessage, {
        position: "bottom-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
    }
  }
};

  const copyToClipboard = async (id) => {
    try {
      await navigator.clipboard.writeText(id);
      setCopiedId(id);
      toast.success('JAF ID copied to clipboard!', {
        position: "bottom-center",
        autoClose: 2000,
        theme: "light",
        transition: Bounce,
      });
      
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      toast.error('Failed to copy ID', {
        position: "bottom-center",
        autoClose: 2000,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleViewAppliedStudents = async (jaf) => {
    setSelectedJaf(jaf);
    setShowAppliedStudentsModal(true);
    setStudentsLoading(true);
    
    try {
      // Check if company exists for this JAF
      const linkedCompany = linkedCompanies[jaf._id];
      if (!linkedCompany) {
        setAppliedStudents([]);
        toast.info('No company created yet for this JAF by Placement Coordinator', {
          position: "bottom-center",
          autoClose: 4000,
          theme: "light",
          transition: Bounce,
        });
        setStudentsLoading(false);
        return;
      }

      // Fetch applied students for this JAF via the linked company
      const response = await axios.get(`http://localhost:5000/recruiter/jaf/${jaf._id}/applied-students`);
      const appliedStudentsData = response.data.applied_students || [];
      
      // Fetch detailed student information for each applied student
      const studentsWithDetails = await Promise.all(
        appliedStudentsData.map(async (application) => {
          try {
            const studentResponse = await axios.get(`http://localhost:5000/student/${application.email}`);
            return {
              ...application,
              studentDetails: studentResponse.data
            };
          } catch (error) {
            console.error(`Error fetching details for ${application.email}:`, error);
            return {
              ...application,
              studentDetails: null
            };
          }
        })
      );
      
      setAppliedStudents(studentsWithDetails);
    } catch (error) {
      console.error('Error fetching applied students:', error);
      if (error.response?.status === 404) {
        setAppliedStudents([]);
        toast.info('No company created yet for this JAF. Students can apply once Placement Coordinator creates the company.', {
          position: "bottom-center",
          autoClose: 5000,
          theme: "light",
          transition: Bounce,
        });
      } else {
        toast.error('Error fetching applied students', {
          position: "bottom-center",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        });
        setAppliedStudents([]);
      }
    } finally {
      setStudentsLoading(false);
    }
  };

  const handleStatusChange = async (studentEmail, newStatus) => {
    try {
      // Update student status via JAF route
      await axios.put(`http://localhost:5000/recruiter/jaf/${selectedJaf._id}/student-status`, {
        studentEmail,
        status: newStatus
      });

      // Update local state
      setAppliedStudents(prevStudents => 
        prevStudents.map(student => 
          student.email === studentEmail 
            ? { ...student, status: newStatus }
            : student
        )
      );

      toast.success('Student status updated successfully', {
        position: "bottom-center",
        autoClose: 2000,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      console.error('Error updating student status:', error);
      toast.error('Error updating student status', {
        position: "bottom-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const closeModal = () => {
    setShowAppliedStudentsModal(false);
    setSelectedJaf(null);
    setAppliedStudents([]);
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

  const getStudentStatusColor = (status) => {
    switch (status) {
      case 'Final Selected':
        return 'bg-green-100 text-green-800';
      case 'HR Selected':
        return 'bg-blue-100 text-blue-800';
      case 'Shortlisted for Technical Round 2':
        return 'bg-purple-100 text-purple-800';
      case 'Shortlisted for Technical Round 1':
        return 'bg-indigo-100 text-indigo-800';
      case 'Shortlisted for OA':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Applied':
      default:
        return 'bg-gray-100 text-gray-800';
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

  const renderAppliedStudentsTable = () => {
    if (studentsLoading) {
      return (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#72265F]"></div>
          <span className="ml-2 text-gray-600">Loading applied students...</span>
        </div>
      );
    }

    if (appliedStudents.length === 0) {
      const linkedCompany = linkedCompanies[selectedJaf?._id];
      return (
        <div className="text-center py-8">
          {!linkedCompany ? (
            <div>
              <Building className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 mb-2">Company not created yet</p>
              <p className="text-sm text-gray-400">
                Placement Coordinator needs to create a company for this JAF before students can apply.
              </p>
            </div>
          ) : (
            <div>
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">No students have applied yet.</p>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Email
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Name
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                PG Course
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                PG CGPA
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                UG CGPA
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Resume
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Status
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appliedStudents.map((application, index) => {
              const student = application.studentDetails;
              return (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-3 py-4 text-sm text-gray-900">
                    <div className="break-all">{application.email}</div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student?.name || "N/A"}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student?.pgCourse || "N/A"}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student?.pgCgpa || "N/A"}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student?.ugCgpa || "N/A"}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm">
                    {application.resumeLink ? (
                      <a 
                        href={application.resumeLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#72265F] hover:text-[#913e7c] underline"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStudentStatusColor(application.status)}`}>
                      {application.status || "Applied"}
                    </span>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm">
                    <select
                      value={application.status || "Applied"}
                      onChange={(e) => handleStatusChange(application.email, e.target.value)}
                      className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#72265F] focus:border-transparent"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="font-instrument min-h-screen py-8 px-4 w-full max-w-[75rem] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#72265F] text-left">Recruiter Dashboard</h1>
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
          <h2 className="text-xl font-semibold text-[#72265F]">Your JAFs & Companies</h2>
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
              {jafs.map((jaf) => {
                const linkedCompany = linkedCompanies[jaf._id];
                const applicantCount = linkedCompany?.applied_students?.length || 0;
                
                return (
                  <Card key={jaf._id} className="hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                    {/* JAF ID Section */}
                    <div className="px-6 pt-4 pb-2 bg-gray-50 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        
                        {role=='PlacementCoordinator' && 
                          <div className="flex items-center gap-2">
                          <label className="text-xs font-medium text-gray-600">JAF ID:</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={jaf._id}
                              readOnly
                              className="px-2 py-1 text-xs font-mono bg-white border border-gray-200 rounded focus:outline-none cursor-default"
                            />
                            <button
                              onClick={() => copyToClipboard(jaf._id)}
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                              title="Copy JAF ID"
                            >
                              {copiedId === jaf._id ? (
                                <Check className="w-3 h-3 text-green-600" />
                              ) : (
                                <Copy className="w-3 h-3 text-gray-600" />
                              )}
                            </button>
                          </div>
                        </div>
                        }
                        
                        
                        {/* Company Status Indicator */}
                        <div className="flex items-center gap-2">
                          {linkedCompany ? (
                            <div className="flex items-center gap-1">
                              <Building className="w-3 h-3 text-green-600" />
                              <span className="text-xs text-green-600 font-medium">Company Created</span>
                              <Badge variant="outline" className="text-xs bg-green-50 border-green-200 text-green-700">
                                {applicantCount} applicants
                              </Badge>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <Building className="w-3 h-3 text-orange-500" />
                              <span className="text-xs text-orange-500 font-medium">Awaiting Company Creation</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-xl text-[#72265F] mb-2">
                            {jaf.jobProfile?.jobProfile}
                          </CardTitle>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" />
                              <span>{jaf.jobProfile?.jobDesignation}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{jaf.jobProfile?.placeOfPosting}</span>
                            </div>
                            {jaf.jobProfile?.annualPackage && (
                              <div className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />
                                <span>{jaf.jobProfile.annualPackage}</span>
                              </div>
                            )}
                          </div>
                          
                          {/* Show linked company info if available */}
                          {linkedCompany && (
                            <div className="mt-2 p-2 bg-blue-50 rounded-md border border-blue-200">
                              <p className="text-xs text-blue-700">
                                <strong>Linked Company:</strong> {linkedCompany.title}
                              </p>
                              <p className="text-xs text-blue-600">
                                Students can now apply through the company listing
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={getStatusColor(jaf.status)}>
                            {jaf.status.charAt(0).toUpperCase() + jaf.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0 space-y-4">
                      {/* Job Description */}
                      {jaf.jobProfile?.jobDescription && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-700 line-clamp-2">
                            {jaf.jobProfile.jobDescription}
                          </p>
                        </div>
                      )}

                      {/* Selection Process */}
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2 text-sm">Selection Process</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span>Pre-Placement Talk:</span>
                            <span className={`font-medium ${jaf.selectionProcess?.prePlacementTalk === 'YES' ? 'text-green-600' : 'text-gray-500'}`}>
                              {jaf.selectionProcess?.prePlacementTalk || 'NO'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Online Assessment:</span>
                            <span className={`font-medium ${jaf.selectionProcess?.onlineAssessment === 'YES' ? 'text-green-600' : 'text-gray-500'}`}>
                              {jaf.selectionProcess?.onlineAssessment || 'NO'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Technical Interview:</span>
                            <span className={`font-medium ${jaf.selectionProcess?.personalTechnicalInterview === 'YES' ? 'text-green-600' : 'text-gray-500'}`}>
                              {jaf.selectionProcess?.personalTechnicalInterview || 'NO'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>HR Round:</span>
                            <span className={`font-medium ${jaf.selectionProcess?.hrRound === 'YES' ? 'text-green-600' : 'text-gray-500'}`}>
                              {jaf.selectionProcess?.hrRound || 'NO'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Timeline */}
                      {(jaf.timeline?.onlineCodingTestDate || jaf.timeline?.interviewDate) && (
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-2 flex items-center text-sm">
                            <Calendar className="w-4 h-4 mr-1" /> Timeline
                          </h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {jaf.timeline?.onlineCodingTestDate && (
                              <div>
                                <span className="text-gray-500">Coding Test: </span>
                                <span className="font-medium">{formatDate(jaf.timeline.onlineCodingTestDate)}</span>
                              </div>
                            )}
                            {jaf.timeline?.interviewDate && (
                              <div>
                                <span className="text-gray-500">Interview: </span>
                                <span className="font-medium">{formatDate(jaf.timeline.interviewDate)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Footer with Actions */}
                      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        <div className="text-xs text-gray-500">
                          Created on {new Date(jaf.createdAt).toLocaleDateString("en-IN")}
                        </div>
                        <div className="flex gap-2">
                          
                          {/* Only recruiter can view the applied student on their page */}
                          {role=='Recruiter' && 
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewAppliedStudents(jaf)}
                            className="text-[#72265F] border-[#72265F] hover:bg-[#72265F] hover:text-white"
                          >
                            <Users className="w-4 h-4 mr-1" />
                            Applied Students ({applicantCount})
                          </Button>
                          }
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewJAF(jaf._id)}
                            className="text-[#72265F] border-[#72265F] hover:bg-[#72265F] hover:text-white"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          {role=='Recruiter' && 
                            <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteJAF(jaf._id)}
                            className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                          }
                          
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Applied Students Modal */}
      {showAppliedStudentsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Applied Students - {selectedJaf?.jobProfile?.jobProfile}
                </h2>
                <div className="flex items-center gap-4 mt-1">
                  <p className="text-sm text-gray-600">
                    {appliedStudents.length} students applied
                  </p>
                  {linkedCompanies[selectedJaf?._id] && (
                    <p className="text-sm text-blue-600">
                      via Company: {linkedCompanies[selectedJaf._id].title}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-auto max-h-[calc(90vh-120px)]">
              {renderAppliedStudentsTable()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruiterHome;