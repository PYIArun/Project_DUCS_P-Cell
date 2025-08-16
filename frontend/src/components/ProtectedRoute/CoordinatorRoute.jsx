// components/ProtectedRoute/CoordinatorRoute.jsx
import ProtectedRoute from './ProtectedRoute';

const CoordinatorRoute = ({ children }) => {
  return (
    <ProtectedRoute allowedRoles={["PlacementCoordinator"]}>
      {children}
    </ProtectedRoute>
  );
};

export default CoordinatorRoute;