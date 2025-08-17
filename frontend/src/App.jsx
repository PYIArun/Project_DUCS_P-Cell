import { Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage.jsx';
import CreateHighlight from './components/CreateHighlight.jsx';
import Header from './components/Header.jsx';
import Login from './components/Login/Login.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer.jsx';
import Register from './components/Register.jsx';
import EditProfile from './components/EditProfile.jsx';
import CreateAnnouncement from './components/CreateAnnouncements.jsx';
import StudentHome from './components/Home/StudentHome.jsx';
import CreateCompanyForm from './components/Company/CreateCompany.jsx';
import ViewCompany from './components/Company/ViewCompany.jsx';
import PlacementPolicy from './components/PlacementPolicy.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

// Import Protected Route Components
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import CoordinatorRoute from './components/ProtectedRoute/CoordinatorRoute.jsx';
import StudentRoute from './components/ProtectedRoute/StudentRoute.jsx';
import { CompanyProvider } from './context/CompanyContext.jsx';

export default function App() {
  return (
    <AuthProvider>
      <Header />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        
        {/* Student-only Routes */}
        <Route 
          path="/register" 
          element={
            <StudentRoute requireRegistration={false}>
              <Register />
            </StudentRoute>
          } 
        />
        <Route 
          path="/edit-profile" 
          element={
            <StudentRoute>
              <EditProfile />
            </StudentRoute>
          } 
        />
        
        {/* Coordinator-only Routes */}
        <Route 
          path="/create-highlights" 
          element={
            <CoordinatorRoute>
              <CreateHighlight />
            </CoordinatorRoute>
          } 
        />
        <Route 
          path="/create-job-announcements" 
          element={
            <CoordinatorRoute>
              <CreateCompanyForm />
            </CoordinatorRoute>
          } 
        />
        <Route 
          path="/create-announcements" 
          element={
            <CoordinatorRoute>
              <CreateAnnouncement />
            </CoordinatorRoute>
          } 
        />
        
        {/* Routes for both Students and Coordinators */}
        <Route 
          path="/studentHome" 
          element={
            <ProtectedRoute allowedRoles={["Student", "PlacementCoordinator"]}>
              <StudentHome />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/company/:id" 
          element={
            <ProtectedRoute allowedRoles={["Student", "PlacementCoordinator"]}>
              <CompanyProvider><ViewCompany /></CompanyProvider>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/placement-policy" 
          element={
            <ProtectedRoute allowedRoles={["Student", "PlacementCoordinator"]}>
              <PlacementPolicy />
            </ProtectedRoute>
          } 
        />
      </Routes>
      <Footer/>
    </AuthProvider>
  );
}