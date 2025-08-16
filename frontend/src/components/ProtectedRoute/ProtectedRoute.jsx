// components/ProtectedRoute/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';

const ProtectedRoute = ({ children, allowedRoles = [], requireRegistration = false }) => {
  const { isLogin, role, userRegistered, loading } = useAuth();
  const location = useLocation();

  console.log('ProtectedRoute Debug:', { isLogin, role, userRegistered, loading, allowedRoles });

  // Show loading spinner while checking authentication
  if (loading) {
    return <LoadingSpinner />;
  }

  // Check if user is logged in
  if (!isLogin) {
    // console.log('User not logged in, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user role is allowed
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    // console.log(`User role ${role} not in allowed roles:`, allowedRoles);
    return <Navigate to="/" replace />;
  }

  // Check if registration is required (only for students)
  if (requireRegistration && role === "Student" && !userRegistered) {
    // console.log('Student not registered, redirecting to register');
    return <Navigate to="/register" replace />;
  }

//   console.log('Access granted');
  return children;
};

export default ProtectedRoute;