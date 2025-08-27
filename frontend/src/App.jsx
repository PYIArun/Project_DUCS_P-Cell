import { Routes, Route } from 'react-router-dom';
import Homepage from './components/Home_DU/Homepage.jsx';
import CreateHighlight from './components/Coordinator/CreateHighlight.jsx';
import Header from './components/Utilities/Header.jsx';
import Login from './components/Login/Login.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Utilities/Footer.jsx';
import Register from './components/Student/Register.jsx';
import EditProfile from './components/Student/EditProfile.jsx';
import CreateAnnouncement from './components/Coordinator/CreateAnnouncements.jsx';
import StudentHome from './components/Coordinator-Student/StudentHome.jsx';
import CreateCompanyForm from './components/Company/CreateCompany.jsx';
import ViewCompany from './components/Company/ViewCompany.jsx';
import PlacementPolicy from './components/Coordinator-Student/PlacementPolicy.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

// Import Protected Route Components
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import CoordinatorRoute from './components/ProtectedRoute/CoordinatorRoute.jsx';
import StudentRoute from './components/ProtectedRoute/StudentRoute.jsx';
import { CompanyProvider } from './context/CompanyContext.jsx';
import RecruiterRoute from './components/ProtectedRoute/RecruiterRoute.jsx';
import RecruiterHome from './components/Recruiter/RecruiterHome.jsx';
import CompleteProfile from './components/Recruiter/CompleteProfile.jsx';
import CreateJAF from './components/Recruiter/CreateJAF.jsx';
import ViewJAF from './components/Recruiter/ViewJAF.jsx';
import ViewProfile from './components/Recruiter/ViewProfile.jsx';
import EditProfileRecruiter from './components/Recruiter/EditProfileRecruiter.jsx';
import ViewRecruiters from './components/Coordinator/ViewRecruiters.jsx';
import RecruiterProfileView from './components/Coordinator/RecruiterProfileView.jsx';


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
        
        {/* Recruiter-only Routes */}
        <Route
          path="/recruiter/home"
          element={
            <RecruiterRoute>
              <RecruiterHome />
            </RecruiterRoute>
          }
        />
        <Route
          path="/recruiter/complete-profile"
          element={
            <RecruiterRoute>
              <CompleteProfile />
            </RecruiterRoute>
          }
        />

        <Route
          path="/recruiter/create-jaf"
          element={
            <RecruiterRoute>
              <CreateJAF />
            </RecruiterRoute>
          }
        />

        <Route
          path="/recruiter/jaf/:jafId"
          element={
            <RecruiterRoute>
              <ViewJAF />
            </RecruiterRoute>
          }
        />  
        <Route
          path="/recruiter/view-profile"
          element={
            <RecruiterRoute>
              <ViewProfile />
            </RecruiterRoute>
          }
        />
      <Route
        path="/recruiter/edit-profile"
        element={
          <RecruiterRoute>
            <EditProfileRecruiter />
          </RecruiterRoute>
        }
      />

       {/* View Recruiters Routes - Coordinator only */}
        <Route
          path="/view-recruiters"
          element={
            <CoordinatorRoute>
              <ViewRecruiters />
            </CoordinatorRoute>
          }
        />
        <Route
          path="/view-recruiters/:companyName"
          element={
            <CoordinatorRoute>
              <RecruiterProfileView />
            </CoordinatorRoute>
          }
        />

      </Routes>

      <Footer />
    </AuthProvider>
  );
}