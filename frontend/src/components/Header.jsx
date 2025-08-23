import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, FileText, MailCheck, Plus, Megaphone, Star, Building, Briefcase, Users } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from ".././context/AuthContext"; 
import { Eye, Edit } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    userEmail, 
    userRegistered, 
    isLogin, 
    role, 
    logout, 
    profileCompleted,
    companyName 
  } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="w-[90%] mt-[2rem] gap-[1rem] md:gap-0 mx-auto flex flex-col md:flex-row justify-between items-center mb-[2rem]">
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-[0.9rem] mobile:gap-[0rem] mb-4 md:mb-0 select-none"
      >
        <div className="flex justify-start">
          <img
            src="/images/du_logo.png"
            className="w-[90%] max-w-[100px] md:max-w-[120px] mobile:w-[70%]"
            alt="DU Logo"
          />
        </div>
        <div className="text-center md:text-left mobile:pr-[0.9rem]">
          <h2 className="text-[1.5rem] md:text-[2rem] font-instrument text-[#72265F] mobile:text-[1.2rem]">
            Placement Cell, DUCS
          </h2>
          <hr className="border-[1.5px] rounded-sm border-[#7a408f]" />
          <h4 className="text-[1rem] md:text-[1.5rem] text-[#72265F] font-instrument mobile:flex">
            University of Delhi
          </h4>
        </div>
      </div>

      <div className="flex flex-row mobile:flex-col mobile:gap-[0.8rem] md:flex-row items-center gap-[4rem] md:gap-[4rem] text-[#72265F]">
        <a
          href="https://drive.google.com/file/d/1sAviVJALVryVPGC1SNsV8XaZpubT8ndR/view"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="select-none underline text-[0.875rem] md:text-[1rem] font-semibold cursor-pointer font-instrument active:scale-95 transition-all ease-in hover:text-[#4e1f45]">
            Brochure 2025-26
          </h2>
        </a>

        {location.pathname === "/" && (
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
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="User Avatar"
                />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-70 mr-[1rem] top-full left-0 bg-white shadow-lg border rounded-md z-50">
              <DropdownMenuLabel>
                {userEmail}
                {role === "Recruiter" && companyName && (
                  <div className="text-xs text-gray-500">{companyName}</div>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {/* Student Options */}
                {role === "Student" && (
                  <>
                    {/* Show Register option only for students who aren't registered */}
                    {!userRegistered && (
                      <DropdownMenuItem
                        onClick={() => navigate("/register")}
                        className="hover:bg-[#f3e8f5] cursor-pointer"
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>Register</span>
                      </DropdownMenuItem>
                    )}

                    {/* Student Home - only for registered students */}
                    <DropdownMenuItem
                      disabled={!userRegistered}
                      onClick={() => navigate("/studentHome")}
                      className="hover:bg-[#f3e8f5] cursor-pointer"
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Student Home</span>
                    </DropdownMenuItem>

                    {/* Edit Profile - only for registered students */}
                    <DropdownMenuItem
                      disabled={!userRegistered}
                      onClick={() => navigate("/edit-profile")}
                      className="hover:bg-[#f3e8f5] cursor-pointer"
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Edit Profile</span>
                    </DropdownMenuItem>

                    {/* Placement Policy - for registered students */}
                    <DropdownMenuItem
                      disabled={!userRegistered}
                      onClick={() => navigate("/placement-policy")}
                      className="hover:bg-[#f3e8f5] cursor-pointer"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      <span>Placement Policy 2025-26</span>
                    </DropdownMenuItem>

                    {/* Mail to Placement Team - for students */}
                    <DropdownMenuItem
                      onClick={() => window.open('mailto:placements@cs.du.ac.in', '_blank')}
                      className="hover:bg-[#f3e8f5] cursor-pointer"
                    >
                      <MailCheck className="mr-2 h-4 w-4" />
                      <span>Mail to Placement Team</span>
                    </DropdownMenuItem>
                  </>
                )}

            {/* Recruiter Options */}
                {role === "Recruiter" && (
                  <>
                    <DropdownMenuItem
                      onClick={() => navigate("/recruiter/home")}
                      className="hover:bg-[#f3e8f5] cursor-pointer"
                    >
                      <Building className="mr-2 h-4 w-4" />
                      <span>Recruiter Home</span>
                    </DropdownMenuItem>

                    {/* Only show Complete Profile if not completed yet */}
                    {!profileCompleted && (
                      <DropdownMenuItem
                        onClick={() => navigate("/recruiter/complete-profile")}
                        className="hover:bg-[#f3e8f5] cursor-pointer"
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>Complete Profile</span>
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuItem
                      disabled={!profileCompleted}
                      onClick={() => navigate("/recruiter/create-jaf")}
                      className={`cursor-pointer ${!profileCompleted ? 'opacity-50' : 'hover:bg-[#f3e8f5]'}`}
                    >
                      <Briefcase className="mr-2 h-4 w-4" />
                      <span>Create JAF</span>
                    </DropdownMenuItem>
                    
                    {/* Show View Profile and Edit Profile options for completed profiles */}
                    {profileCompleted && (
                      <>
                        <DropdownMenuItem
                          onClick={() => navigate("/recruiter/view-profile")}
                          className="hover:bg-[#f3e8f5] cursor-pointer"
                        >
                          <Eye className="mr-2 h-4 w-4 text-blue-600" />
                          <span>View Profile</span>
                        </DropdownMenuItem>
                        
                        <DropdownMenuItem
                          onClick={() => navigate("/recruiter/edit-profile")}
                          className="hover:bg-[#f3e8f5] cursor-pointer"
                        >
                          <Edit className="mr-2 h-4 w-4 text-green-600" />
                          <span>Edit Profile</span>
                        </DropdownMenuItem>
                      </>
                    )}
                  </>
                )}

                {/* Coordinator Options */}
                {role === "PlacementCoordinator" && (
                  <>
                    <DropdownMenuItem
                      onClick={() => navigate("/studentHome")}
                      className="hover:bg-[#f3e8f5] cursor-pointer"
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Student Home</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => navigate("/view-recruiters")}
                      className="hover:bg-[#f3e8f5] cursor-pointer"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      <span>View Recruiters</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => navigate("/create-job-announcements")}
                      className="hover:bg-[#f3e8f5] cursor-pointer"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      <span>Create Job Announcement</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => navigate("/create-announcements")}
                      className="hover:bg-[#f3e8f5] cursor-pointer"
                    >
                      <Megaphone className="mr-2 h-4 w-4" />
                      <span>Create General Announcement</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => navigate("/create-highlights")}
                      className="hover:bg-[#f3e8f5] cursor-pointer"
                    >
                      <Star className="mr-2 h-4 w-4" />
                      <span>Create Highlights</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => navigate("/placement-policy")}
                      className="hover:bg-[#f3e8f5] cursor-pointer"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      <span>Placement Policy</span>
                    </DropdownMenuItem>
                  </>
                )}

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="hover:bg-[#f3e8f5] cursor-pointer"
                >
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