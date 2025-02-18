import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown'

const StudentHome = () => {
  const [active, setActive] = useState("latest");
  const [content, setContent] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/announcements")
      .then(response => {
        console.log(response.data);  // Check if data is coming through
        setContent(response.data);

        // Initialize announcements with preview text and expansion state
        setAnnouncements(response.data.map(item => ({
          ...item,
          previewText: item.content_of_announcements.replace(/<[^>]+>/g, " ").slice(0, 500) + "...",
          isExpanded: false
        })));
      })
      .catch(error => console.error("Error fetching announcements:", error));
  }, [active]);



  // Toggle function to expand/collapse content
  const toggleExpand = (index) => {
    setAnnouncements((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, isExpanded: !item.isExpanded } : item
      )
    );
  };

  return (
    <div className="font-instrument my-[4rem] rounded-lg h-screen w-[70rem] mx-auto flex flex-col">
      {/* Buttons at the top */}
      <div className="flex justify-around w-full px-4 gap-x-4 py-4">
        <button
          onClick={() => setActive("latest")}
          className={`w-[50%] py-[0.5rem] rounded-full border-black transition-all duration-300 ${active === "latest" ? "bg-[#F8F7F9]" : ""}`}
        >
          Latest
        </button>
        <button
          onClick={() => setActive("jobs")}
          className={`w-[50%] py-[0.5rem] rounded-full border-black transition-all duration-300 ${active === "jobs" ? "bg-[#F8F7F9]" : ""}`}
        >
          Jobs
        </button>
      </div>

      {/* Tab Content Below */}
      <div className="mobile:h-[30rem] bg-[#F8F7F9] w-full rounded-[0.7rem] py-[1rem] mx-auto h-[40rem] overflow-y-scroll">
        {active == "latest" && announcements.map((item, index) => (
          <div key={index} className='w-[90%] bg-white mx-auto my-[1rem] p-[1rem]'>
            <div className="font-bold justify-between text-lg">
              <div className='flex items-center my-[1rem]'>
                <p className='text-3xl'> {item.title} </p>
                <p className='text-gray-400 block text-sm ml-auto'>
                  Date Posted: {item.date_of_announcements}, {item.time_of_announcements}
                </p>
              </div>
              <p className='font-thin' dangerouslySetInnerHTML={{ __html: item.isExpanded ? item.content_of_announcements : item.previewText }} />
              <button
                onClick={() => toggleExpand(index)}
                className="text-blue-500 mt-2 font-medium hover:underline"
              >
                {item.isExpanded ? "See Less" : "See More"}
              </button>
            </div>


          </div>
        ))}
        {active == "jobs" && content.map((item, index) => (
          <div key={index} className='w-[90%] bg-white mx-auto my-[1rem] p-[1rem]'>
            <div className="font-bold flex justify-between text-lg">
              <p> {item.title} </p>
              <p className='text-gray-400 text-sm'>
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
