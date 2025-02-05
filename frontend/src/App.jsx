import { Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage.jsx';
import CreateHighlight from './components/CreateHighlight.jsx';
import Header from './components/Header.jsx';
import Login from './components/Login/Login.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      </Routes>
    </>
  );
}
