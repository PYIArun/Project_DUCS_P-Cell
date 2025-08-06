import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const StudentHome = () => {
  const [active, setActive] = useState("latest");
  const [content, setContent] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/announcements")
      .then(response => {
        setContent(response.data);
        setAnnouncements(response.data.map(item => ({
          ...item,
          isExpanded: false
        })));
      })
      .catch(error => console.error("Error fetching announcements:", error));
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
                  code({ node, inline, className, children, ...props }) {
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

        {active === "jobs" && content.map((item, index) => (
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentHome;
