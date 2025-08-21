// contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);
  const [userRegistered, setUserRegistered] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Recruiter specific states
  const [recruiterId, setRecruiterId] = useState(null);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [companyName, setCompanyName] = useState(null);

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const storedEmail = sessionStorage.getItem("userEmail");
      const storedLoginStatus = sessionStorage.getItem("loginStatus");
      const storedRole = sessionStorage.getItem("role");
      const recruiterToken = sessionStorage.getItem("recruiterToken");
      
      if (storedEmail && storedLoginStatus === "true") {
        setUserEmail(storedEmail);
        setIsLogin(true);
        setRole(storedRole);
        
        // Handle different user types
        if (storedRole === "Student") {
          const response = await axios.get(`http://localhost:5000/student/${storedEmail}`);
          const student = response.data;
          setUserRegistered(student.registered === "yes");
        } else if (storedRole === "Recruiter") {
          // Fetch recruiter data
          const response = await axios.get(`http://localhost:5000/recruiter/${storedEmail}`);
          const recruiter = response.data;
          setUserRegistered(recruiter.registered === "yes");
          setRecruiterId(recruiter.id);
          setProfileCompleted(recruiter.profileCompleted);
          setCompanyName(recruiter.companyName);
        } else {
          // For coordinators, assume they're always "registered"
          setUserRegistered(true);
        }
      } else if (recruiterToken) {
        // Handle recruiter token authentication
        try {
          // Decode token or validate with backend
          // For now, just check if token exists and validate with backend
          const response = await axios.get("http://localhost:5000/recruiter/validate", {
            headers: { Authorization: `Bearer ${recruiterToken}` }
          });
          
          if (response.data.valid) {
            const recruiter = response.data.recruiter;
            setUserEmail(recruiter.email);
            setIsLogin(true);
            setRole("Recruiter");
            setUserRegistered(true);
            setRecruiterId(recruiter.id);
            setProfileCompleted(recruiter.profileCompleted);
            setCompanyName(recruiter.companyName);
          }
        } catch (error) {
          console.error("Token validation error:", error);
          sessionStorage.removeItem("recruiterToken");
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      // If there's an error, clear the session
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, userRole = "Student") => {
    try {
      sessionStorage.setItem("userEmail", email);
      sessionStorage.setItem("loginStatus", "true");
      sessionStorage.setItem("role", userRole);
      
      setUserEmail(email);
      setIsLogin(true);
      setRole(userRole);
      
      // Handle different user types
      if (userRole === "Student") {
        const response = await axios.get(`http://localhost:5000/student/${email}`);
        const student = response.data;
        setUserRegistered(student.registered === "yes");
        return student;
      } else if (userRole === "Recruiter") {
        const response = await axios.get(`http://localhost:5000/recruiter/${email}`);
        const recruiter = response.data;
        setUserRegistered(recruiter.registered === "yes");
        setRecruiterId(recruiter.id);
        setProfileCompleted(recruiter.profileCompleted);
        setCompanyName(recruiter.companyName);
        return recruiter;
      } else {
        setUserRegistered(true);
        return { registered: "yes" };
      }
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  const loginRecruiter = async (token, recruiterData) => {
    sessionStorage.setItem("recruiterToken", token);
    sessionStorage.setItem("userEmail", recruiterData.email);
    sessionStorage.setItem("loginStatus", "true");
    sessionStorage.setItem("role", "Recruiter");
    
    setUserEmail(recruiterData.email);
    setIsLogin(true);
    setRole("Recruiter");
    setUserRegistered(true);
    setRecruiterId(recruiterData.id);
    setProfileCompleted(recruiterData.profileCompleted);
    setCompanyName(recruiterData.companyName);
  };

  const logout = () => {
    sessionStorage.clear();
    setUserEmail(null);
    setUserRegistered(false);
    setIsLogin(false);
    setRole(null);
    setRecruiterId(null);
    setProfileCompleted(false);
    setCompanyName(null);
  };

  const updateRegistrationStatus = (registered) => {
    setUserRegistered(registered);
  };

  const updateProfileStatus = (completed) => {
    setProfileCompleted(completed);
  };

  const value = {
    userEmail,
    userRegistered,
    isLogin,
    role,
    loading,
    recruiterId,
    profileCompleted,
    companyName,
    login,
    loginRecruiter,
    logout,
    updateRegistrationStatus,
    updateProfileStatus,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};