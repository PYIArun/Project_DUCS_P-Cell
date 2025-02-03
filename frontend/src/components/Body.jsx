import React from "react";
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


const slides = [
  "./images/slides/1.jpeg",
  "./images/slides/2.jpeg",
  "./images/slides/3.jpeg",
  "./images/slides/4.jpeg",
];

const Body = () => {
  return (
    <div className="bg-[#F8F7F9]">
      {/* Carousel Section */}
      <div className="carousel mt-[2rem] w-[90%] mx-auto">
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
              <Card className="bg-white w-full rounded-[0.7rem] py-[1rem] mx-auto h-[40rem] overflow-y-scroll">
                <CardContent>
                  {[...Array(7)].map((_, index) => (
                    <Card key={index} className="my-[1rem] rounded-[0.7rem] items-center flex">
                      <div className="w-[5rem] h-[5rem] bg-[#F2DFFA] rounded-sm flex flex-col justify-center relative items-center">
                        <h1 className="font-instrument text-[#642A7C] font-semibold text-[2rem] absolute top-2">2</h1>
                        <h2 className="font-instrument text-[#642A7C] font-semibold text-[1rem] absolute bottom-3">Jan</h2>
                      </div>
                      <div className="flex flex-row justify-between items-center w-[93%] px-[1rem]">
                        <h2 className="font-instrument text-[1.1rem]">Here we gonna put the title of the highlights</h2>
                        <a href="#">
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
              <p className="font-instrument text-justify text-[1rem] md:text-[1.1rem] w-full lg:w-[90%] mx-auto">
                The Department of Computer Science (DUCS) at the University of Delhi has been at the forefront of producing highly skilled graduates, excelling at both the postgraduate and doctoral levels. Since the introduction of the Master of Computer Applications (MCA) program in 1982, DUCS has provided rigorous training in core computer science concepts and their practical applications, preparing students for successful careers in the IT industry. The program, recently revamped in 2022, now spans two years, comprising four semesters with an emphasis on industry exposure through a professional training semester. Our students specialize in software development, data science, cybersecurity, AI, and more, gaining real-world experience by working on industry projects. The MCA program has continuously nurtured leaders in the IT sector, with alumni holding influential positions globally. In 2004, DUCS introduced the M.Sc. Computer Science program, focused on research and a deep understanding of both theoretical and practical aspects of the field. Students in this program work on diverse projects in areas like artificial intelligence, cybersecurity, blockchain, and data mining, contributing to advancements in the field. The department also hosts a vibrant Ph.D. program with nearly 60 research scholars driving cutting-edge research in computer science. Our alumni network, with over 1500 professionals in academia and the IT industry, showcases the department's long-standing commitment to excellence. We take immense pride in the success of our students, many of whom are actively shaping the future of technology across India and globally. As we approach the 2025-2026 placement season, we invite recruiters to connect with our exceptional talent pool and collaborate with us in identifying the next generation of IT leaders.
              </p>
            </div>
            <div className="w-full lg:w-[30%] flex justify-center lg:justify-end mt-8 lg:mt-0">
              <img src="./images/ducs_image.jpg" className="w-full lg:w-[90%]" alt="DUCS Image" />
            </div>
          </div>
        </div>

        {/* Past Recruiters Section */}
        <div className="my-[5rem]">
          <h2 className="text-center font-instrument text-[1.5rem] md:text-[2rem] text-[#72265F] font-semibold">
            Past Recruiters
          </h2>

          <div className="w-[90%] mx-auto">
            <Slider/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Body;