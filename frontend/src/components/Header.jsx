import React, { useEffect, useState }  from 'react';
import { Button } from "@/components/ui/button";
import { IoMdMail } from "react-icons/io";
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-scroll';
import axios from 'axios';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, FileText } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState(null);
  const [userRegistered, setUserRegistered] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("userEmail");
    const storedLoginStatus = sessionStorage.getItem("loginStatus");
    if (storedEmail && storedLoginStatus === "true") {
      setUserEmail(storedEmail);
      setIsLogin(true); 
      axios.get(`http://localhost:5000/student/${storedEmail}`)
        .then((response) => {
          const student = response.data;
          setUserRegistered(student.registered === "yes");
        })
        .catch((error) => {
          console.error("Error fetching student data:", error);
        });
    }
  }, [isLogin]);

  const handleLogout = () => {
    sessionStorage.clear();
    setUserRegistered(false);
    setUserEmail(null);
    setUserRegistered(false);
    setIsLogin(false);
    navigate("/"); 
    window.location.reload();
  };

  return (
    <div className='w-[90%] mt-[2rem] gap-[1rem] md:gap-0 mx-auto flex flex-col md:flex-row justify-between items-center mb-[2rem]'>
      <div onClick={() => navigate("/")} className="flex items-center gap-[0.9rem] mobile:gap-[0rem] mb-4 md:mb-0 select-none">
        <div className="flex justify-start">
          <img src='./images/du_logo.png' className='w-[90%] max-w-[100px] md:max-w-[120px] mobile:w-[70%]' alt="DU Logo" />
        </div>
        <div className='text-center md:text-left mobile:pr-[0.9rem]'>
          <h2 className='text-[1.5rem] md:text-[2rem] font-instrument text-[#72265F] mobile:text-[1.2rem]'>Placement Cell, DUCS</h2>
          <hr className='border-[1.5px] rounded-sm border-[#7a408f]' />
          <h4 className='text-[1rem] md:text-[1.5rem] text-[#72265F] font-instrument mobile:flex'>University of Delhi</h4>
        </div>
      </div>

      <div className="flex flex-row mobile:flex-col mobile:gap-[0.8rem] md:flex-row items-center gap-[4rem] md:gap-[4rem] text-[#72265F]">
        <h2 className='select-none underline text-[0.875rem] md:text-[1rem] font-semibold cursor-pointer font-instrument active:scale-95 transition-all ease-in hover:text-[#4e1f45]'>Brochure 2025-26</h2>

        {location.pathname === '/' && (        
          <Link
            to="placement_team"
            smooth={true}
            duration={800}
            className="mobile:flex mobile:justify-center cursor-pointer mobile:w-[100%] font-instrument text-[0.875rem] md:text-[1rem] stroke-muted mobile:text-[0.8rem] mobile:font-semibold select-none"
          >
            About Us
          </Link>
        )}

        {isLogin ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 top-full left-0 bg-white shadow-lg border rounded-md z-50">
              <DropdownMenuLabel>{userEmail}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {!userRegistered && (
                  <DropdownMenuItem onClick={() => navigate("/register")} className="hover:bg-[#f3e8f5] cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Register</span>
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem disabled={!userRegistered} onClick={() => navigate("/edit-profile")} className="hover:bg-[#f3e8f5] cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Edit Profile</span>
                </DropdownMenuItem>

                <DropdownMenuItem disabled={!userRegistered} onClick={() => navigate("/companylistings")} className="hover:bg-[#f3e8f5] cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Company Listings</span>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => navigate("/placement-policy")} className="hover:bg-[#f3e8f5] cursor-pointer">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Placement Policy 2025-26</span>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={handleLogout} className="hover:bg-[#f3e8f5] cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            onClick={() => navigate("/login")}
            className="select-none font-instrument px-[1.25rem] py-[0.5rem] bg-[#72265F] hover:scale-105 active:scale-95 transition-all ease-in hover:ease-in hover:transition-all active:ease-in active:transition-all font-semibold text-white rounded-full"
            variant="outline"
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;