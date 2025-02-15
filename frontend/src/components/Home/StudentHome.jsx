import React, { useState } from 'react';

const StudentHome = () => {
  const [active, setActive] = useState("latest");


  const content = {
    latest: [
      {
        title: "This is the LATEST tab",
        content: "Here is the content"
      },
      {
        title: "Another LATEST tab",
        description: "A different job profile for StrategyCo Global's Business Development Manager is also open for applications.",
        applicableCourses: [
          "BBA - Business, ABCUNIVERSITY",
          "M.Com - Commerce, XYZUNIVERSITY",
        ],
        additionalContent: (
          <p className="mt-2 text-sm">
            Additional content for this LATEST tab.
            <br /><br />
            <strong>Additional Courses:</strong>
            <ul className="list-disc ml-4">
              <li>MSc - Computer Science, DEFUNIVERSITY</li>
              <li>MSc - Computer Science, DEFUNIVERSITY</li>
              <li>MSc - Computer Science, DEFUNIVERSITY</li>
            </ul>
          </p>
        ),
      }
    ],
    jobs: [
      {
        title: "This is JOBS tab",
        description: "A different job profile for StrategyCo Global's Business Development Manager is also open for applications.",
        applicableCourses: [
          "BBA - Business, ABCUNIVERSITY",
          "M.Com - Commerce, XYZUNIVERSITY",
        ],
        additionalContent: (
          <p className="mt-2 text-sm">
            Additional content for this JOBS tab.
            <br /><br />
            <strong>Additional Courses:</strong>
            <ul className="list-disc ml-4">
              <li>MSc - Computer Science, DEFUNIVERSITY</li>
              <li>MSc - Computer Science, DEFUNIVERSITY</li>
              <li>MSc - Computer Science, DEFUNIVERSITY</li>
            </ul>
          </p>
        ),
      },
      {
        title: "Another JOBS tab",
        description: "A different job profile for StrategyCo Global's Business Development Manager is also open for applications.",
        applicableCourses: [
          "BBA - Business, ABCUNIVERSITY",
          "M.Com - Commerce, XYZUNIVERSITY",
        ],
        additionalContent: (
          <p className="mt-2 text-sm">
            Additional content for this JOBS tab.
            <br /><br />
            <strong>Additional Courses:</strong>
            <ul className="list-disc ml-4">
              <li>MSc - Computer Science, DEFUNIVERSITY</li>
            </ul>
          </p>
        ),
      },
      {
        title: "Another JOBS tab",
        description: "A different job profile for StrategyCo Global's Business Development Manager is also open for applications.",
        applicableCourses: [
          "BBA - Business, ABCUNIVERSITY",
          "M.Com - Commerce, XYZUNIVERSITY",
        ],
        additionalContent: (
          <p className="mt-2 text-sm">
            Additional content for this JOBS tab.
            <br /><br />
            <strong>Additional Courses:</strong>
            <ul className="list-disc ml-4">
              <li>MSc - Computer Science, DEFUNIVERSITY</li>
            </ul>
          </p>
        ),
      }
    ]
  };

  // State for each item's seeMore
  const [seeMoreState, setSeeMoreState] = useState({
    latest: content.latest.map(() => false),  // Default "See More" state is false for all items in the latest tab
    jobs: content.jobs.map(() => false),      // Default "See More" state is false for all items in the jobs tab
  });

  const toggleSeeMore = (tab, index) => {
    const newSeeMoreState = { ...seeMoreState };
    newSeeMoreState[tab][index] = !newSeeMoreState[tab][index];  // Toggle seeMore for the specific item in the specified tab
    setSeeMoreState(newSeeMoreState);
  };

  return (
    <div className="font-instrument mb-[4rem] rounded-lg h-[40rem] w-[60rem] mx-auto flex flex-col">
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
        {content[active] && content[active].map((item, index) => (
          <div key={index} className='w-[90%]  bg-white mx-auto my-[1rem] p-[1rem]'>
            <div className="font-bold  text-lg">{item.title}</div>
            <p className="mt-2  text-sm">
              {item.description}
              <br /><br />
              <strong>Applicable Courses:</strong>
              <ul className="  list-disc ml-4">
                {item.applicableCourses.map((course, index) => (
                  <li key={index}>{course}</li>
                ))}
              </ul>
            </p>

            {/* Conditional render for see more content */}
            {seeMoreState[active][index] && item.additionalContent}

            {/* Toggle See More / See Less button */}
            <b
              className="hover:cursor-pointer mt-1 inline-block"
              onClick={() => toggleSeeMore(active, index)}
            >
              {seeMoreState[active][index] ? "See Less ..." : "See More ..."}
            </b>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentHome;
