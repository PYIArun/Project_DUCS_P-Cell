import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const StudentHome = () => {
  const [active, setActive] = useState("latest");
  const [announcements, setAnnouncements] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const {role} = useAuth();
  const navigate = useNavigate();

  const handleApplyClick = (id) => {
    navigate(`/company/${id}`);
  };

  useEffect(() => {
    setLoading(true);
    if (active === "latest") {
      axios.get("http://localhost:5000/announcements")
        .then(response => {
          setAnnouncements(response.data.map(item => ({
            ...item,
            isExpanded: false
          })));
        })
        .catch(error => console.error("Error fetching announcements:", error))
        .finally(() => setLoading(false));
    }

    if (active === "jobs") {
      axios.get("http://localhost:5000/companies")
        .then(response => {
          setCompanies(response.data);
        })
        .catch(error => console.error("Error fetching companies:", error))
        .finally(() => setLoading(false));
    }
  }, [active]);

  const toggleExpand = (index) => {
    setAnnouncements(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, isExpanded: !item.isExpanded } : item
      )
    );
  };

  return (
    <div className="font-instrument min-h-screen py-8 px-4 w-full max-w-[75rem] mx-auto flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#72265F] text-center">Student Dashboard</h1>
      </div>

      {/* Toggle Buttons */}
      <div className="flex justify-center mb-6">
        <div className="flex bg-white rounded-full p-1 shadow-sm border border-gray-200">
          <button
            onClick={() => setActive("latest")}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
              active === "latest" 
                ? "bg-[#72265F] text-white shadow-sm" 
                : "text-[#72265F] hover:bg-gray-50"
            }`}
          >
            Announcements
          </button>
          <button
            onClick={() => setActive("jobs")}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
              active === "jobs" 
                ? "bg-[#72265F] text-white shadow-sm" 
                : "text-[#72265F] hover:bg-gray-50"
            }`}
          >
            Job Opportunities
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="bg-white rounded-2xl border border-gray-200 flex-1">
        {/* Content Header */}
        <div className="px-6 py-4 border-b border-gray-200 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#72265F]">
              {active === "latest" ? "Recent Announcements" : "Available Jobs"}
            </h2>
            <div className="text-sm text-gray-500">
              {active === "latest" 
                ? `${announcements.length} announcement${announcements.length !== 1 ? 's' : ''}`
                : `${companies.length} job${companies.length !== 1 ? 's' : ''} available`
              }
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="h-[75vh] overflow-y-auto px-6 py-4 custom-scrollbar">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#72265F] mx-auto mb-4"></div>
                <p className="text-gray-600">Loading...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Announcements */}
              {active === "latest" && (
                <div className="space-y-4">
                  {announcements.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0v10a2 2 0 01-2 2H9a2 2 0 01-2-2V8m0 0V6a2 2 0 012-2h8a2 2 0 012 2v2" />
                        </svg>
                      </div>
                      <p className="text-gray-500 text-lg">No announcements yet</p>
                    </div>
                  ) : (
                    announcements.map((item, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-xl hover:shadow-sm transition-all duration-300 border border-gray-100 overflow-hidden"
                      >
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="text-xl font-bold text-[#72265F] pr-4">{item.title}</h3>
                            <div className="flex flex-col items-end text-right">
                              <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                                Date Posted: {item.date_of_announcements} {item.time_of_announcements}
                              </span>
                            </div>
                          </div>

                          <div
                            className={`prose prose-sm max-w-none transition-all duration-300 ${
                              item.isExpanded ? '' : 'line-clamp-4'
                            }`}
                          >
                            <ReactMarkdown
                              components={{
                                code({ inline, children, ...props }) {
                                  return (
                                    <code
                                      className={`${
                                        inline 
                                          ? 'bg-gray-100 px-1 py-0.5 rounded text-sm' 
                                          : 'block p-3 bg-gray-50 rounded-lg text-sm overflow-x-auto'
                                      }`}
                                      {...props}
                                    >
                                      {children}
                                    </code>
                                  );
                                },
                                table({ children }) {
                                  return (
                                    <div className="overflow-x-auto my-4">
                                      <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg">
                                        {children}
                                      </table>
                                    </div>
                                  );
                                },
                                th({ children }) {
                                  return (
                                    <th className="border border-gray-300 px-4 py-2 bg-gray-50 font-semibold text-left">
                                      {children}
                                    </th>
                                  );
                                },
                                td({ children }) {
                                  return (
                                    <td className="border border-gray-300 px-4 py-2">
                                      {children}
                                    </td>
                                  );
                                },
                              }}
                            >
                              {item.content_of_announcements}
                            </ReactMarkdown>
                          </div>

                          <button
                            onClick={() => toggleExpand(index)}
                            className="mt-4 inline-flex items-center text-[#72265F] font-medium hover:text-[#913e7c] transition-colors"
                          >
                            {item.isExpanded ? (
                              <>
                                <span>Show Less</span>
                                <svg className="w-4 h-4 ml-1 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </>
                            ) : (
                              <>
                                <span>Show More</span>
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Jobs / Companies */}
              {active === "jobs" && (
                <div className="space-y-4">
                  {companies.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M8 6v10a2 2 0 002 2h4a2 2 0 002-2V6" />
                        </svg>
                      </div>
                      <p className="text-gray-500 text-lg">No job opportunities available</p>
                    </div>
                  ) : (
                    companies.map((company, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-xl hover:shadow-sm transition-all duration-300 border border-gray-100 overflow-hidden group"
                      >
                        <div className="p-6">
                          <div className="flex items-center justify-between">
                            {/* Left: Logo and Details */}
                            <div className="flex items-center flex-1">
                              <div className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 border-gray-200 bg-gray-50 p-2">
                                <img
                                  src={company.logo || "https://upload.wikimedia.org/wikipedia/en/thumb/4/45/Ciena_logo.svg/2560px-Ciena_logo.svg.png"}
                                  alt={`${company.title} logo`}
                                  className="w-full h-full object-contain"
                                  onError={(e) => {
                                    e.target.src = "https://upload.wikimedia.org/wikipedia/en/thumb/4/45/Ciena_logo.svg/2560px-Ciena_logo.svg.png";
                                  }}
                                />
                              </div>
                              
                              {/* Company Details */}
                              <div className="ml-6 flex-1">
                                <h3 className="text-xl font-bold text-[#72265F] mb-2 group-hover:text-[#913e7c] transition-colors">
                                  {company.title}
                                </h3>
                                <div className="space-y-1">
                                  <div className="flex items-center text-sm text-gray-600">
                                    <span className="inline-block w-16 font-semibold">CTC:</span>
                                    <span className="font-medium text-black">{company.ctc}</span>
                                  </div>
                                  <div className="flex items-center text-sm text-gray-600">
                                    <span className="inline-block w-16 font-semibold">Role:</span>
                                    <span>{company.role}</span>
                                  </div>
                                  <div className="flex items-center text-sm text-gray-600">
                                    <span className="inline-block w-16 font-semibold">Location:</span>
                                    <span>{company.location}</span>
                                  </div>
                                  <div className="flex items-start text-sm text-gray-600">
                                    <span className="inline-block w-16 font-semibold flex-shrink-0">Courses:</span>
                                    <span className="break-words">
                                      {Array.isArray(company.applicable_courses) 
                                        ? company.applicable_courses.join(', ') 
                                        : company.applicable_courses}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Right: Apply Button */}
                            <div className="ml-6">
                              <button
                                className="bg-[#72265F] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#913e7c] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-100 active:scale-95"
                                onClick={() => handleApplyClick(company._id)}
                              >
                                View Details
                              </button>
                            </div>
                          </div>
                          
                          {/* Job Type Badge */}
                          <div className="mt-4 flex items-center gap-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {company.job_type || 'Full-time'}
                            </span>
                            {company.job_function && (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-900">
                                {company.job_function}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #72265F;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #913e7c;
        }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default StudentHome;