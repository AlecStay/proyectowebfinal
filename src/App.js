import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homeweb from './components/Homeweb';
import Perfil from './components/Perfil';
import Registro from './components/Registro';
import Login from './components/Login';
import GestionRevista from './components/Gestionrevista';
import Revistas from './components/Revistas';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homeweb />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gestionrevista" element={<GestionRevista />} />
        <Route path="/revistas" element={<Revistas />} />
      </Routes>
    </Router>
  );
}

export default App;
