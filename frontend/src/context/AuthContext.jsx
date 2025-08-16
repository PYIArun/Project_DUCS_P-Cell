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

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const storedEmail = sessionStorage.getItem("userEmail");
      const storedLoginStatus = sessionStorage.getItem("loginStatus");
      const storedRole = sessionStorage.getItem("role");
      
      if (storedEmail && storedLoginStatus === "true") {
        setUserEmail(storedEmail);
        setIsLogin(true);
        setRole(storedRole);
        
        // Only fetch student data if user is a student
        if (storedRole === "Student") {
          const response = await axios.get(`http://localhost:5000/student/${storedEmail}`);
          const student = response.data;
          setUserRegistered(student.registered === "yes");
        } else {
          // For coordinators, assume they're always "registered"
          setUserRegistered(true);
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
      
      // Only fetch student data if user is a student
      if (userRole === "Student") {
        const response = await axios.get(`http://localhost:5000/student/${email}`);
        const student = response.data;
        setUserRegistered(student.registered === "yes");
        return student; // Return student data for further processing
      } else {
        setUserRegistered(true);
        return { registered: "yes" };
      }
    } catch (error) {
      console.error("Error during login:", error);
      throw error; // Re-throw to handle in login component
    }
  };

  const logout = () => {
    sessionStorage.clear();
    setUserEmail(null);
    setUserRegistered(false);
    setIsLogin(false);
    setRole(null);
  };

  const updateRegistrationStatus = (registered) => {
    setUserRegistered(registered);
  };

  const value = {
    userEmail,
    userRegistered,
    isLogin,
    role,
    loading,
    login,
    logout,
    updateRegistrationStatus,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};