import ProtectedRoute from './ProtectedRoute';

const AuthenticatedRoute = ({ children }) => {
  return (
    <ProtectedRoute allowedRoles={["Student", "PlacementCoordinator"]}>
      {children}
    </ProtectedRoute>
  );
};

export default AuthenticatedRoute;