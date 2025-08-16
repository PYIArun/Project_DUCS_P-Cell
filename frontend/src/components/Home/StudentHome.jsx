import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';

const StudentHome = () => {
  const [active, setActive] = useState("latest");
  const [announcements, setAnnouncements] = useState([]);
  const [companies, setCompanies] = useState([]);

  const navigate = useNavigate();



  const handleApplyClick = (id) => {
    navigate(`/company/${id}`);
  };

  useEffect(() => {
    if (active === "latest") {
      axios.get("http://localhost:5000/announcements")
        .then(response => {
          setAnnouncements(response.data.map(item => ({
            ...item,
            isExpanded: false
          })));
        })
        .catch(error => console.error("Error fetching announcements:", error));
    }

    if (active === "jobs") {
      axios.get("http://localhost:5000/companies")
        .then(response => {
          setCompanies(response.data);
        })
        .catch(error => console.error("Error fetching companies:", error));
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
    <div className="font-instrument min-h-screen my-16 rounded-lg w-full max-w-[70rem] mx-auto flex flex-col">
      {/* Toggle Buttons */}
      <div className="flex justify-around px-4 gap-x-4 py-4">
        <button
          onClick={() => setActive("latest")}
          className={`w-1/2 py-2 rounded-full border border-black transition-all duration-300 ${active === "latest" ? "bg-[#F8F7F9]" : ""}`}
        >
          Latest
        </button>
        <button
          onClick={() => setActive("jobs")}
          className={`w-1/2 py-2 rounded-full border border-black transition-all duration-300 ${active === "jobs" ? "bg-[#F8F7F9]" : ""}`}
        >
          Jobs
        </button>
      </div>

      {/* Content Container */}
      <div className="bg-[#F8F7F9] w-full rounded-xl py-4 px-4 max-h-[70vh] overflow-y-auto overflow-x-hidden">

        {/* Announcements */}
        {active === "latest" && announcements.map((item, index) => (
          <div
            key={index}
            className="w-full bg-white mb-4 p-4 rounded-lg shadow-sm overflow-hidden break-words"
          >
            <div className="flex items-center mb-2">
              <p className="text-xl font-semibold">{item.title}</p>
              <p className="text-gray-400 text-sm ml-auto text-right">
                Date Posted: {item.date_of_announcements}, {item.time_of_announcements}
              </p>
            </div>

            <div
              className={`text-sm leading-6 transition-all duration-300 whitespace-pre-wrap break-words overflow-x-hidden ${item.isExpanded ? '' : 'line-clamp-6'}`}
            >
              <ReactMarkdown
                components={{
                  code({ inline, children, ...props }) {
                    return (
                      <code
                        className={`text-sm break-words ${inline ? '' : 'block p-2 bg-gray-100 rounded'}`}
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                  table({ children }) {
                    return (
                      <div className="overflow-x-auto w-full">
                        <table className="table-auto w-full">{children}</table>
                      </div>
                    );
                  },
                }}
              >
                {item.content_of_announcements}
              </ReactMarkdown>
            </div>

            <button
              onClick={() => toggleExpand(index)}
              className="text-blue-500 mt-2 font-medium hover:underline"
            >
              {item.isExpanded ? "See Less" : "See More"}
            </button>
          </div>
        ))}

        {/* Jobs / Companies */}
        {active === "jobs" && companies.map((company, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white mb-4 p-4 rounded-lg shadow-sm overflow-hidden break-words"
          >
            {/* Left: Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex w-[82px] h-[82px] align-center p-1 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                <img
                  src={"https://upload.wikimedia.org/wikipedia/en/4/45/Ciena_logo.svg"}
                  alt={`${company.title} logo`}
                  className="max-w-full  w-auto h-auto object-contain mx-auto my-auto"
                />
              </div>
              {/* Middle: Details */}
              <div className="ml-4 flex flex-col">
                <p className="text-xl font-semibold mb-1">{company.title}</p>
                <p className="text-gray-700 text-sm"><strong>CTC:</strong> {company.ctc}</p>
                <p className="text-gray-700 text-sm"><strong>Role:</strong> {company.role}</p>
                <p className="text-gray-700 text-sm"><strong>Applicable Courses:</strong> {company.applicable_courses}</p>
              </div>
            </div>

            {/* Right: Apply Button */}
            <button
              className="  bg-[#913e7c] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#72265F] transition-all"
              onClick={() => handleApplyClick(company._id)}
            >
              Apply
            </button>
            

          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentHome;
