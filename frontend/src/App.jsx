import { Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage.jsx';
import CreateHighlight from './components/ui/CreateHighlight.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/highlight" element={<CreateHighlight />} />
    </Routes>
  );
}