import axios from "axios";
import { useState, useEffect } from "react";
import { useCompany } from "../../context/CompanyContext";
import { useAuth } from "../../context/AuthContext";

const ViewCompany = () => {
  const { company, setCompany } = useCompany();
  const { userEmail } = useAuth();

  const [activeTab, setActiveTab] = useState("job");
  const [isApplying, setIsApplying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Popup states
  const [showPopup, setShowPopup] = useState(false);
  const [resumeLink, setResumeLink] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  // Check if current user has already applied
  const hasApplied = company?.applied_students?.some(
    student => typeof student === 'object' ? student.email === userEmail : student === userEmail
  );

  // Fetch company data if not available
  useEffect(() => {
    const fetchCompany = async () => {
      if (!company && window.location.pathname.includes('/company/')) {
        const companyId = window.location.pathname.split('/').pop();
        if (companyId) {
          setLoading(true);
          try {
            const response = await axios.get(`http://localhost:5000/company/${companyId}`);
            setCompany(response.data);
          } catch (err) {
            setError("Failed to load company details");
            console.error("Error fetching company:", err);
          } finally {
            setLoading(false);
          }
        }
      }
    };

    fetchCompany();
  }, [company, setCompany]);

  const handleApply = async () => {
    if (!userEmail || !company) {
      setError("User email or company information is missing");
      return;
    }

    setIsApplying(true);
    setError("");

    try {
      // Check if student exists
      const studentResponse = await axios.get(`http://localhost:5000/student/${userEmail}`);
      
      if (!studentResponse.data) {
        setError("Student profile not found");
        return;
      }

      // Apply to company
      const response = await axios.put(
        `http://localhost:5000/company/${company._id}`,
        {
          email: userEmail,
          resumeLink: resumeLink,
        }
      );

      if (response.status === 200) {
        // Update local company state with new applied student
        const newApplication = {
          email: userEmail,
          resumeLink: resumeLink,
          appliedAt: new Date()
        };
        
        setCompany({
          ...company,
          applied_students: [...(company.applied_students || []), newApplication]
        });
        
        setShowPopup(false);
        setResumeLink("");
        setIsChecked(false);
      }
    } catch (error) {
      console.error("Error applying to company:", error);
      if (error.response?.status === 400 && error.response?.data?.message?.includes("already applied")) {
        setError("You have already applied to this company");
      } else if (error.response?.status === 404) {
        setError("Company or student not found");
      } else {
        setError("Failed to submit application. Please try again.");
      }
    } finally {
      setIsApplying(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setResumeLink("");
    setIsChecked(false);
    setError("");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading company details...</p>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Company not found</p>
          <button 
            onClick={() => window.history.back()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-start gap-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            {company.logo ? (
              <img
                src={company.logo}
                alt={`${company.title || "Company"} logo`}
                className="w-20 h-20 rounded-lg border border-gray-200 object-contain bg-white p-2"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/80x80?text=Logo";
                }}
              />
            ) : (
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                <span className="text-gray-400 text-xs">No Logo</span>
              </div>
            )}
          </div>

          {/* Company Info */}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 mb-1 text-left">
              {company.role || "N/A"}
            </h1>
            <h2 className="text-xl text-gray-700 font-medium mb-2 text-left">
              {company.title || "Unknown Company"}
            </h2>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
              <span className="flex items-center">
                Location: {company.location || "N/A"}
              </span>
              <span className="flex items-center">
                Job-Type: {company.job_type || "N/A"}
              </span>
              <span className="flex items-center">
                CTC: {company.ctc || "N/A"}
              </span>
            </div>
            {company.job_function && (
              <p className="text-sm text-gray-600">
                <strong>Function:</strong> {company.job_function}
              </p>
            )}
          </div>

          {/* Apply Button */}
          <div className="flex-shrink-0">
            {hasApplied ? (
              <button
                disabled
                className="px-6 py-3 bg-green-50 text-green-700 border border-green-200 rounded-lg font-medium cursor-not-allowed flex items-center gap-2"
              >
                <span>✓</span>
                Applied
              </button>
            ) : (
              <button
                onClick={() => setShowPopup(true)}
                disabled={isApplying || !userEmail}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isApplying ? "Applying..." : "Apply Now"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("job")}
            className={`px-6 py-4 font-medium text-sm transition-colors ${
              activeTab === "job"
                ? "border-b-2 border-blue-600 text-blue-600 bg-blue-50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            Job Description
          </button>
          <button
            onClick={() => setActiveTab("workflow")}
            className={`px-6 py-4 font-medium text-sm transition-colors ${
              activeTab === "workflow"
                ? "border-b-2 border-blue-600 text-blue-600 bg-blue-50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            Hiring Process
          </button>
          <button
            onClick={() => setActiveTab("eligibility")}
            className={`px-6 py-4 font-medium text-sm transition-colors ${
              activeTab === "eligibility"
                ? "border-b-2 border-blue-600 text-blue-600 bg-blue-50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            Eligibility
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "job" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {company.description || "No job description provided"}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Required Skills</h3>
                {company.required_skills && company.required_skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {company.required_skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No specific skills mentioned</p>
                )}
              </div>

              {company.job_profile && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Profile</h3>
                  <p className="text-gray-700">{company.job_profile}</p>
                </div>
              )}

              {company.additional_info && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Additional Information</h3>
                  <p className="text-gray-700">{company.additional_info}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "workflow" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Hiring Process</h3>
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {company.hiring_workflow || "Hiring process details not specified"}
                </p>
              </div>
            </div>
          )}

          {activeTab === "eligibility" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Eligibility Criteria</h3>
                <p className="text-gray-700 leading-relaxed">
                  {company.eligibility || "No specific eligibility criteria mentioned"}
                </p>
              </div>

              {company.applicable_courses && company.applicable_courses.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Applicable Courses</h4>
                  <div className="flex flex-wrap gap-2">
                    {company.applicable_courses.map((course, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-200"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Application Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full shadow-2xl">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Submit Application</h2>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume Link *
                </label>
                <input
                  type="url"
                  value={resumeLink}
                  onChange={(e) => setResumeLink(e.target.value)}
                  placeholder="https://drive.google.com/file/d/..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 leading-relaxed">
                    I hereby declare that I will make myself available for all mandatory events 
                    related to the Placement Drive, including Pre-Placement Talk, Online Assessment, 
                    and Interview Rounds. In case of emergency, I will inform the Placement Team 
                    at <strong>placements@cs.du.ac.in</strong>.
                  </span>
                </label>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={closePopup}
                  disabled={isApplying}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApply}
                  disabled={!isChecked || !resumeLink.trim() || isApplying}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isApplying ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCompany;