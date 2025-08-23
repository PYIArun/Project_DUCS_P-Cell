// ProtectedRoute.js
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; 

const ProtectedRoute = ({ allowedRoles, children }) => {
  const token = sessionStorage.getItem("recruiterToken");
  if (!token) return <Navigate to="/login" replace />;

  try {
    const decoded = jwtDecode(token); // { id, role, exp, ... }
    if (allowedRoles && !allowedRoles.includes(decoded.role)) {
      return <Navigate to="/unauthorized" replace />;
    }
    return children;
  } catch (err) {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
