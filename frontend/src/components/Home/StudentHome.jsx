import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentHome = () => {
  const [active, setActive] = useState("latest");
  const [announcements, setAnnouncements] = useState([]);
  const [seeMoreState, setSeeMoreState] = useState({ latest: [] });

  useEffect(() => {
    axios.get("http://localhost:5000/announcements")
      .then(response => {
        console.log(response.data);  // Check if data is coming through
        setAnnouncements(response.data);

        // Initialize seeMoreState for latest
        setSeeMoreState(prevState => ({
          ...prevState,
          latest: response.data.map(() => false)
        }));
      })
      .catch(error => console.error("Error fetching announcements:", error));
  }, []);

  const toggleSeeMore = (tab, index) => {
    setSeeMoreState(prevState => ({
      ...prevState,
      [tab]: prevState[tab].map((item, i) => (i === index ? !item : item)),
    }));
  };

  // Based on the active state, you switch between announcements and jobs
  const content = active === "latest" ? announcements : [];

  return (
    <div className="font-instrument my-[4rem] rounded-lg h-screen w-[90rem] mx-auto flex flex-col">
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
        {content && content.length > 0 && content.map((item, index) => (
          <div key={index} className='w-[90%] bg-white mx-auto my-[1rem] p-[1rem]'>
            <div className="font-bold flex justify-between text-lg">
              <p> {item.title} </p>
              <p className='text-gray-400 text-sm'>
                Date Posted: {item.date_of_announcements}, {item.time_of_announcements}
              </p>
            </div>

            {/* Content Section */}
            <div
              className={`mt-2 text-sm transition-all duration-300 overflow-hidden ${
                seeMoreState.latest[index] ? "max-h-[100%]" : "max-h-[30rem] overflow-hidden"
              }`}
              dangerouslySetInnerHTML={{ __html: item.content_of_announcements }}
            />

            {/* Toggle Button */}
            <b
              className="hover:cursor-pointer mt-2 inline-block text-blue-600"
              onClick={() => toggleSeeMore("latest", index)}
            >
              {seeMoreState.latest[index] ? "See Less ..." : "See More ..."}
            </b>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentHome;
