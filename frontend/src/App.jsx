import { Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage.jsx';
import CreateHighlight from './components/CreateHighlight.jsx';
import Header from './components/Header.jsx';
import Login from './components/Login/Login.jsx';

export default function App() {
  return (
    <>
    <Header/>
    <Routes>

      <Route path="/" element={<Homepage />} />
      <Route path="/highlight" element={<CreateHighlight />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </>
  );
}