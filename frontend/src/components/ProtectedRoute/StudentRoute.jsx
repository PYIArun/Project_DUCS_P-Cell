// components/ProtectedRoute/StudentRoute.jsx
import ProtectedRoute from './ProtectedRoute';

const StudentRoute = ({ children, requireRegistration = true }) => {
  return (
    <ProtectedRoute 
      allowedRoles={["Student"]} 
      requireRegistration={requireRegistration}
    >
      {children}
    </ProtectedRoute>
  );
};

export default StudentRoute;