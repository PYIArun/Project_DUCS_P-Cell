import axios from "axios";
import { useState } from "react";
import { useCompany } from "../../context/CompanyContext";
import { useAuth } from "../../context/AuthContext";

const ViewCompany = () => {
  const { company } = useCompany();
  const { userEmail } = useAuth();

  const [activeTab, setActiveTab] = useState("job");
  const [isApplying, setIsApplying] = useState(false);

  // Popup states
  const [showPopup, setShowPopup] = useState(false);
  const [resumeLink, setResumeLink] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  // Optional local flag so the button reflects success immediately
  const [appliedLocal, setAppliedLocal] = useState(false);

  // Check if current user has already applied
  const hasApplied =
    appliedLocal || company?.applied_students?.includes(userEmail);

  const handleApply = async () => {
    if (!userEmail || !company) return;

    setIsApplying(true);
    try {
      const response = await axios.put(
        `http://localhost:5000/company/${company._id}`,
        {
          email: userEmail,
          resumeLink: resumeLink,
        }
      );

      if (response.status === 200) {
        // Close popup and reflect UI state
        setShowPopup(false);
        setAppliedLocal(true);
      }
    } catch (error) {
      console.error("Error applying to company:", error);
    } finally {
      setIsApplying(false);
    }
  };

  if (!company) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="max-w-4xl min-h-[100vh] mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        {/* Logo */}
        {company.logo ? (
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-poMiYgMm_vKy1RYJb0IhpMXBzx8Ggm7_Tg&s"
            }
            alt={`${company.title || "Company"} logo`}
            className="w-16 h-16 rounded-lg border"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500 text-sm">No Logo</span>
          </div>
        )}

        {/* Info */}
        <div className="flex flex-col justify-center flex-1">
          <h1 className="text-xl font-bold leading-tight">
            {company.role || "N/A"}
          </h1>
          <h2 className="text-lg text-gray-800 font-medium leading-tight">
            {company.title || "Unknown Company"}
          </h2>
          <p className="text-gray-600 text-sm">
            {company.location || "N/A"} • {company.job_type || "N/A"}
          </p>
        </div>

        {/* Apply Button */}
        <div className="ml-auto">
          {hasApplied ? (
            <button
              disabled
              className="px-6 py-2 bg-green-100 text-green-700 border border-green-300 rounded-lg font-medium cursor-not-allowed"
            >
              Applied ✓
            </button>
          ) : (
            <button
              onClick={() => setShowPopup(true)}
              disabled={isApplying || !userEmail}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isApplying ? "Applying..." : "Apply Now"}
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button
          onClick={() => setActiveTab("job")}
          className={`px-4 py-2 border-b-2 ${
            activeTab === "job"
              ? "border-blue-600 font-medium"
              : "border-transparent text-gray-500"
          }`}
        >
          Job Description
        </button>
        <button
          onClick={() => setActiveTab("workflow")}
          className={`px-4 py-2 border-b-2 ${
            activeTab === "workflow"
              ? "border-blue-600 font-medium"
              : "border-transparent text-gray-500"
          }`}
        >
          Hiring Workflow
        </button>
        <button
          onClick={() => setActiveTab("eligibility")}
          className={`px-4 py-2 border-b-2 ${
            activeTab === "eligibility"
              ? "border-blue-600 font-medium"
              : "border-transparent text-gray-500"
          }`}
        >
          Eligibility Criteria
        </button>
      </div>

      {/* Tab Content */}
      <div className="mb-6">
        {activeTab === "job" && (
          <>
            <h2 className="font-semibold text-lg mb-2">Job Description</h2>
            <p>{company.description || "No job description added"}</p>

            <h2 className="font-semibold text-lg mb-2 mt-4">Required Skills</h2>
            {company.required_skills && company.required_skills.length > 0 ? (
              <ul className="list-disc pl-5">
                {company.required_skills.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            ) : (
              <p>No skills added</p>
            )}

            <h2 className="font-semibold text-lg mb-2 mt-4">
              Additional Information
            </h2>
            <p>{company.additional_info || "N/A"}</p>
          </>
        )}

        {activeTab === "workflow" && (
          <>
            <h2 className="font-semibold text-lg mb-2">Hiring Workflow</h2>
            <p>{company.hiring_workflow || "Not specified"}</p>
          </>
        )}

        {activeTab === "eligibility" && (
          <>
            <h2 className="font-semibold text-lg mb-2">Eligibility Criteria</h2>
            <p>{company.eligibility || "Not specified"}</p>
            <p>
              <strong>Applicable Courses:</strong>{" "}
              {company.applicable_courses && company.applicable_courses.length > 0
                ? company.applicable_courses.join(", ")
                : "Not specified"}
            </p>
          </>
        )}
      </div>

      {/* Popup Modal (only renders when showPopup is true) */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-lg w-full shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Submit Application</h2>

            {/* Resume Link Input */}
            <label className="block mb-2 font-medium">Resume Link</label>
            <input
              type="url"
              value={resumeLink}
              onChange={(e) => setResumeLink(e.target.value)}
              placeholder="Enter your resume link"
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            />

            {/* Declaration */}
            <div className="flex items-start gap-2 mb-4">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="mt-1"
              />
              <p className="text-sm">
                I hereby declare that I will make myself available for all
                mandatory events related to the Placement Drive, including but
                not limited to the Pre-Placement Talk, Online Assessment, and
                Interview Rounds, as per the communicated schedule. <br />
                In case of an unavoidable emergency, I shall inform the
                Placement Team in advance by sending a formal email with valid
                supporting documents to <b>placements@cs.du.ac.in</b>. <br />
                Failure to comply with this protocol may result in my being
                marked as a defaulter.
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                disabled={!isChecked || !resumeLink || isApplying}
                className="px-4 py-2 bg-[#72265F] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg hover:bg-[#602050]"
              >
                {isApplying ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCompany;
