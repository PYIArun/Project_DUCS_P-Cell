import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCompany } from "../../context/CompanyContext";
import { useAuth } from "../../context/AuthContext";

const ViewCompany = () => {
    const { company } = useCompany();
    const { userEmail } = useAuth()
    const [activeTab, setActiveTab] = useState("job");
    const [isApplying, setIsApplying] = useState(false);

    // Check if current user has already applied
    const hasApplied = company?.applied_students?.includes(userEmail);

    const handleApply = async () => {
        if (!userEmail || !company) return;

        setIsApplying(true);
        try {
            console.log(company._id)
            // Replace with your actual API endpoint
            const response = await axios.put(`http://localhost:5000/company/${company._id}`, {
                email: userEmail
            });

            if (response.status === 200) {
                console.log("Application submitted successfully");
            }
        } catch (error) {
            console.error("Error applying to company:", error);
            // Handle error (show toast, alert, etc.)
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
                    <h1 className="text-xl font-bold leading-tight">{company.role || "N/A"}</h1>
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
                            onClick={handleApply}
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
                    className={`px-4 py-2 border-b-2 ${activeTab === "job"
                        ? "border-blue-600 font-medium"
                        : "border-transparent text-gray-500"
                        }`}
                >
                    Job Description
                </button>
                <button
                    onClick={() => setActiveTab("workflow")}
                    className={`px-4 py-2 border-b-2 ${activeTab === "workflow"
                        ? "border-blue-600 font-medium"
                        : "border-transparent text-gray-500"
                        }`}
                >
                    Hiring Workflow
                </button>
                <button
                    onClick={() => setActiveTab("eligibility")}
                    className={`px-4 py-2 border-b-2 ${activeTab === "eligibility"
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
        </div>
    );
};

export default ViewCompany;