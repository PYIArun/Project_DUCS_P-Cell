import React from 'react';
import { Button } from "@/components/ui/button";
import { IoMdMail } from "react-icons/io";
const Header = () => {
  return (
    <div className='w-[90%] mt-[2rem] gap-[1rem] md:gap-0 mx-auto flex flex-col md:flex-row justify-between items-center'>
      
      {/* Logo and Title Section */}
      <div className="flex items-center gap-[0.9rem] sm350:gap-[0rem] mb-4 md:mb-0">
        <div className="flex justify-start">
          <img src='./images/du_logo.png' className='w-[90%] max-w-[100px] md:max-w-[120px] sm350:w-[70%]' alt="DU Logo" />
        </div>
        <div className='text-center md:text-left sm350:pr-[0.9rem]'>
          <h2 className='text-[1.5rem] md:text-[2rem] font-instrument text-[#72265F] sm350:text-[1.2rem]'>Placement Cell, DUCS</h2>
          <hr className='border-[1.5px] rounded-sm border-[#7a408f]' />
          <h4 className='text-[1rem] md:text-[1.5rem] text-[#72265F] font-instrument sm350:flex '>University of Delhi</h4>
        </div>
      </div>

      {/* Navigation and Login Button Section */}
      <div className="flex flex-row md:flex-row items-center gap-[4rem] md:gap-[4rem] text-[#72265F]">
        
            {/* <a href="mailto:placements@cs.du.ac.in">
        <div className="flex items-center justify-center gap-[0.55rem]">
          <IoMdMail className="text-[1.2rem]" />
          <h2 className="hidden sm:block cursor-pointer font-instrument font-semibold text-[0.875rem] md:text-[1rem]">
            Mail Us
          </h2>
        </div>
      </a> */}
        

        <h2 className='select-none underline text-[0.875rem] md:text-[1rem] font-semibold cursor-pointer font-instrument active:scale-95 transition-all ease-in hover:transition-all active:ease-in active:transition-all'>Brochure 2025-26</h2>
        <h2 className='cursor-pointer font-instrument  text-[0.875rem] md:text-[1rem] stroke-muted mobile:w-[40%] mobile:text-[0.8rem]'>About Us</h2>
        <Button 
          className="font-instrument px-[1.25rem] py-[0.5rem] bg-[#72265F] hover:scale-105 active:scale-95 transition-all ease-in hover:ease-in hover:transition-all active:ease-in active:transition-all font-semibold text-white rounded-full" 
          variant="outline"
        >
          Login
        </Button>
      </div>

    </div>
  );
};

export default Header;