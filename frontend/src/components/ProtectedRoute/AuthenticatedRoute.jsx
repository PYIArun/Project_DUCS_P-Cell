// AuthenticatedRoute.js
import ProtectedRoute from "./ProtectedRoute";

const AuthenticatedRoute = ({ children }) => {
  return (
    <ProtectedRoute allowedRoles={["Student", "PlacementCoordinator", "Recruiter"]}>
      {children}
    </ProtectedRoute>
  );
};

export default AuthenticatedRoute;
