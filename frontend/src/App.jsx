import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Formulario from './components/Formulario';
import Resumen from './components/Resumen';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/formulario" element={<Formulario />} />
        <Route path="/resumen" element={<Resumen />} />
      </Routes>
    </Router>
  );
}

export default App;
