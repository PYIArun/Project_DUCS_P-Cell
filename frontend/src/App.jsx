import { Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage.jsx';
import CreateHighlight from './components/CreateHighlight.jsx';
import Header from './components/Header.jsx';
import Login from './components/Login/Login.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer.jsx';
import Register from './components/Register.jsx';
import CompanyListing from './components/CompanyListing.jsx';
import EditProfile from './components/EditProfile.jsx';
import CreateAnnouncement from './components/CreateAnnouncements.jsx';
import StudentHome from './components/Home/StudentHome.jsx';
import CreateCompanyForm from './components/Company/CreateCompany.jsx';

export default function App() {
  return (
    <>
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
        // transition="bounce" 
      />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/highlight" element={<CreateHighlight />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/companylistings" element={<CompanyListing />} />
        <Route path="/company" element={<CreateCompanyForm />} />
        <Route path="/studentHome" element={<StudentHome />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/announcements" element={<CreateAnnouncement />} />
      </Routes>
      <Footer/>
    </>
  );
}
