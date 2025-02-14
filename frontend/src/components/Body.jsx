import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaRegFilePdf } from "react-icons/fa";
import Slider from "./Slider";
import Marquee from "./ui/Marquee/Marquee";

const slides = [
  "./images/slides/1.jpeg",
  "./images/slides/2.jpeg",
  "./images/slides/3.jpeg",
  "./images/slides/4.jpeg",
];

import { FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { BsFillTelephoneFill } from "react-icons/bs";
import { Mail } from "react-feather";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Body = () => {

  const [highlights, setHighlights] = useState([]);
  const [coordinators, setCoordinators] = useState([]);

  
  useEffect(() => {

    // Fetching highlights
    axios.get('http://localhost:5000/highlights')
      .then(response => setHighlights(response.data))
      .catch(error => console.error("Error loading highlights:", error));
  
    // Fetching coordinators
    axios.get('http://localhost:5000/coordinators')
      .then(response => setCoordinators(response.data)) // Assuming setCoordinators is the state setter for coordinators
      .catch(error => console.error("Error loading coordinators:", error));
  }, []);


  return (
    <div className="bg-[#F8F7F9] font-instrument">
      {/* Carousel Section */}
      <div className="carousel w-[90%] mx-auto">
        <Carousel autoSlide={true} autoSlideInterval={3000}>
          {slides.map((s, index) => (
            <img key={index} src={s} alt={`Slide ${index + 1}`} />
          ))}
        </Carousel>
      </div>

      {/* Main Content Section */}
      <div className="bg-[#F8F7F9] mt-[5rem]">
        {/* Placement Brochures && Latest@Placement Cell */}
        <div className="flex flex-col lg:flex-row justify-between w-[90%] mx-auto gap-8">
          {/* Latest@PCell, DUCS Section */}
          <div className="w-full lg:w-[60%]">
            <h2 className="text-center flex justify-center lg:text-left font-instrument text-[1.5rem] md:text-[2rem] text-[#72265F] font-semibold">
              Latest@PCell, DUCS
            </h2>

            <div className="mt-[2rem]">
              <Card className="mobile:h-[30rem] bg-white w-full rounded-[0.7rem] py-[1rem] mx-auto h-[40rem] overflow-y-scroll">
                <CardContent>
                  {highlights.map((highlight) => (
                    <Card
                      key={highlight._id}
                      className="my-[1rem] rounded-[0.7rem] items-center flex"
                    >
                      <div className="w-[5rem] h-[5rem] bg-[#F2DFFA] rounded-sm flex flex-col justify-center relative items-center">
                        <h1 className="font-instrument text-[#642A7C] font-semibold text-[2rem] absolute top-2">
                        {new Date(highlight.date_of_post).getDate()}
                        </h1>
                        <h2 className="font-instrument text-[#642A7C] font-semibold text-[1rem] absolute bottom-3">
                        {new Date(highlight.date_of_post).toLocaleString('default', { month: 'short' })}
                        </h2>
                      </div>
                      <div className="flex flex-row justify-between items-center w-[93%] px-[1rem]">
                        <h2 className="font-instrument text-[1.1rem] mobile:text-[0.8rem]">
                          {highlight.title}
                        </h2>
                        <a href={highlight.gdrive_link} target="__blank">
                          <FaRegFilePdf className="text-[2rem] hover:scale-105 active:scale-95 cursor-pointer text-[#642A7C] transition-all ease-in hover:ease-in hover:transition-all active:ease-in active:transition-all" />
                        </a>
                      </div>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Placement Brochures Section */}
          <div className="w-full lg:w-[40%] mt-8 lg:mt-0">
            <h1 className="text-center flex justify-center lg:text-left font-instrument font-semibold text-[#72265F] text-[1.5rem] md:text-[2rem]">
              Placement Brochures
            </h1>

            <div className="flex mt-[2rem] flex-col justify-center mx-auto gap-[2rem] w-full lg:w-[80%]">
              {["2025-2026", "2024-2025", "2023-2024"].map((year, index) => (
                <button
                  key={index}
                  className="px-[1.2rem] py-[0.6rem] border-[0.15rem] rounded-3xl border-[#D266FE] hover:bg-[#D266FE] hover:scale-105 hover:transition-all hover:ease-in active:scale-95 transition-all ease-in font-instrument text-[#72265F] hover:text-white"
                >
                  Brochure {year}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* WHY DUCS Section */}
        <div className="my-[5rem]">
          <h2 className="text-center font-instrument text-[1.5rem] md:text-[2rem] text-[#72265F] font-semibold">
            Why DUCS?
          </h2>
          <div className="flex flex-col lg:flex-row justify-between w-[90%] mx-auto mt-[2rem]">
            <div className="w-full lg:w-[70%]">
              <p className="font-instrument text-justify text-[1rem] md:text-[1.1rem] mobile:text-[0.9rem] w-full lg:w-[90%] mx-auto">
                The Department of Computer Science (DUCS) at the University of
                Delhi has been at the forefront of producing highly skilled
                graduates, excelling at both the postgraduate and doctoral
                levels. Since the introduction of the Master of Computer
                Applications (MCA) program in 1982, DUCS has provided rigorous
                training in core computer science concepts and their practical
                applications, preparing students for successful careers in the
                IT industry. The program, recently revamped in 2022, now spans
                two years, comprising four semesters with an emphasis on
                industry exposure through a professional training semester. Our
                students specialize in software development, data science,
                cybersecurity, AI, and more, gaining real-world experience by
                working on industry projects. The MCA program has continuously
                nurtured leaders in the IT sector, with alumni holding
                influential positions globally. In 2004, DUCS introduced the
                M.Sc. Computer Science program, focused on research and a deep
                understanding of both theoretical and practical aspects of the
                field. Students in this program work on diverse projects in
                areas like artificial intelligence, cybersecurity, blockchain,
                and data mining, contributing to advancements in the field. The
                department also hosts a vibrant Ph.D. program with nearly 60
                research scholars driving cutting-edge research in computer
                science. Our alumni network, with over 1500 professionals in
                academia and the IT industry, showcases the department's
                long-standing commitment to excellence. We take immense pride in
                the success of our students, many of whom are actively shaping
                the future of technology across India and globally. As we
                approach the 2025-2026 placement season, we invite recruiters to
                connect with our exceptional talent pool and collaborate with us
                in identifying the next generation of IT leaders.
              </p>
            </div>
            <div className="w-full lg:w-[30%] flex justify-center lg:justify-end mt-8 lg:mt-0">
              <img
                src="./images/ducs_image.jpg"
                className="w-full lg:w-[90%]"
                alt="DUCS Image"
              />
            </div>
          </div>
        </div>

        {/* Past Recruiters Section */}
        <div className="my-[5rem]">
          <h2 className="text-center font-instrument text-[1.5rem] md:text-[2rem] text-[#72265F] font-semibold">
            Past Recruiters
          </h2>

          <div className="w-[90%] mx-auto">
            <Marquee />
          </div>
        </div>

        {/* Past Alumni Section */}
        <div className="my-[5rem]">
          <h2 className="text-center font-instrument text-[1.5rem] md:text-[2rem] text-[#72265F] font-semibold">
            Past Alumni
          </h2>

          <div className="w-[90%] mx-auto">
            <Slider />
          </div>
        </div>

{/* Placement Team */}
        <div id="placement_team" className="mt-[5rem] ">
          <h2 className="text-center font-instrument text-[1.5rem] md:text-[2rem] text-[#72265F] font-semibold">
            Placement Team
          </h2>

              {/* Faculty */}
          <div className="w-[90%] mx-auto mt-[3rem]">
            <div className="flex flex-wrap justify-center gap-8">
              <div className="team-card w-full sm:w-[45%] lg:w-[30%] py-[1.5rem] bg-white shadow-sm rounded-[0.7rem] overflow-hidden">
                <div className="flex flex-col items-center p-4">
                  <div className="image w-[50%] h-[16rem] mb-4">
                    <img
                      className="object-cover w-full h-full rounded-[0.7rem]"
                      src="./images/placement_team/vasudha.png"
                      alt="Dr. Vasuda Bhatnakar"
                    />
                  </div>
                  <h3 className="font-instrument font-semibold text-2xl text-[#72265F]">
                    Dr. Vasuda Bhatnakar
                  </h3>
                  <h4 className="font-instrument font-semibold text-lg text-gray-500 mb-3">
                    Senior Faculty Advisor
                  </h4>
                  <p className="text-sm font-instrument text-gray-600 text-center px-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Incidunt quidem ex dolor. Nemo, saepe cumque! Officiis
                    cupiditate voluptatum similique amet nulla laboriosam, iusto
                    recusandae minima! Animi qui voluptatum fugiat debitis.
                  </p>
                </div>
              </div>

              <div className="team-card w-full sm:w-[45%] lg:w-[30%] py-[1.5rem] bg-white shadow-sm rounded-[0.7rem] overflow-hidden">
                <div className="flex flex-col items-center p-4">
                  <div className="image w-[50%] h-[16rem] mb-4">
                    <img
                      className="object-cover w-full h-full rounded-[0.7rem]"
                      src="./images/placement_team/drompal.png"
                      alt="Dr. Om Pal"
                    />
                  </div>
                  <h3 className="font-instrument font-semibold text-2xl text-[#72265F]">
                    Dr. Om Pal
                  </h3>
                  <h4 className="font-instrument font-semibold text-lg text-gray-500 mb-3">
                    Faculty Advisor
                  </h4>
                  <p className="text-sm font-instrument text-gray-600 text-center px-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Incidunt quidem ex dolor. Nemo, saepe cumque! Officiis
                    cupiditate voluptatum similique amet nulla laboriosam, iusto
                    recusandae minima! Animi qui voluptatum fugiat debitis.
                  </p>
                </div>
              </div>
            </div>
          </div>
     {/* Coordinators & Treasurer */}
          <div className="w-[90%] mx-auto mt-[4rem]">
      <div className="flex flex-wrap justify-center gap-8">
        {coordinators.map((coordinator, index) => (
          <div
            key={index}
            className="team-card bg-white shadow-sm rounded-[0.7rem] overflow-hidden p-4 flex flex-col items-center"
          >
            <h3 className="font-instrument font-semibold text-[1.3rem] text-gray-800 mb-1">
              {coordinator.name}
            </h3>
            <h4 className="font-instrument text-[0.9rem] text-gray-500 mb-2">
              {coordinator.role}
            </h4>
            <div className="text-sm text-gray-600 my-1 flex px-[4rem] flex-col items-center">
              <p className="flex items-center gap-2 mb-2">
                <IoMdMail className="text-[#72265F] text-[0.8rem]" />
                <a href={`mailto:${coordinator.email}`} className="text-[#72265F] text-[0.8rem]">
                  {coordinator.email}
                </a>
              </p>
              <p className="flex items-center gap-2 mb-2">
                <FaLinkedin className="text-[#72265F] text-[0.8rem]" />
                <a href={coordinator.linkedin} target="_blank" className="text-[#72265F] text-[0.8rem]">
                  LinkedIn
                </a>
              </p>
              {coordinator.phone && (
                <p className="flex items-center gap-2">
                  <BsFillTelephoneFill className="text-[#72265F] text-[0.8rem]" />
                  <span className="text-[#72265F] text-[0.8rem]">{coordinator.phone}</span>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
        </div>
      </div>


      {/* Footer Section */}
      <div className="mt-[5rem] w-[100%] bg-white p-[1.5rem]">
          
          <div className="flex justify-center">

          <div className="flex w-[90%] mx-auto mobile:flex-col">

          <div className="flex flex-col gap-[0.7rem]">

            <div className="flex items-center gap-[0.7rem]">
            <img src="./images/du_logo.png" className="w-[15%] mobile:w-[20%]" alt="" />
              <div className=" flex flex-col gap-[0rem]">
              <h2 className="font-semibold text-[1.3rem]  mobile:text-[0.9rem] text-[#642A7C]"> Department of Computer Science</h2>
              <h2 className="font-medium text-[0.9rem] mobile:text-[0.7rem] "> University of Delhi</h2>
              </div>
            </div>
          
            <div className="flex flex-col gap-[0.2rem] font-medium pl-[1rem] pt-[0.5rem] opacity-80 mobile:text-[0.8rem]">
              <h2>First Floor, Faculty of Mathematical Sciences</h2>
              <h2>Room No . 113, Opposite Daulat Ram College, </h2>
              <h2>University of, Delhi, 110007</h2>
            </div>

          </div>
          
          <div className="w-[60%] h-[200px] mobile:w-[120%] mobile:pl-[1.1rem] mobile:mt-[1rem]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.0532830263664!2d77.20445207618805!3d28.688052675634548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd928daadb91%3A0x76aa925fc6e58347!2sDepartment%20of%20Computer%20Science%2C%20University%20of%20Delhi!5e0!3m2!1sen!2sin!4v1738762691191!5m2!1sen!2sin"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="University of Delhi Map"
            ></iframe>
          </div>

            
          </div>

          <div className="flex flex-col w-[20%]">
            <div className="flex justify-end">
            <h2 className="font-semibold lg:text-[1.3rem] md:text-[1.4rem] sm:text-[1rem] text-[#642A7C] ">Contact Us</h2>
            </div>
            

            <div className="flex justify-end mt-[1rem]">
            <a className="flex gap-[0.5rem]" href="https://mail.google.com/mail/?view=cm&fs=1&to=placements@cs.du.ac.in" target="_blank">
            <h2 className="hidden sm:hidden md:hidden lg:block   cursor-pointer">placements@cs.du.ac.in</h2>
            <Mail className="text-[0.5rem] "/> 
            </a>  
            </div>

            
            <div className="flex  justify-end">
            <a className="flex gap-[0.5rem]" href="https://www.linkedin.com/in/ducs-placement/" target="_blank">
            <h2 className="hidden sm:hidden md:hidden lg:block  cursor-pointer">ducs-placement</h2>
            <FaLinkedin className="text-[1.5rem]"/>
            </a>
            </div>
    

            

          </div>

          </div>
          
    </div>

    </div>

  );
};

export default Body;
