import React from 'react';
import './Styles/styles.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import { AuthProvider } from './Context/AuthContext';
//import RotaPrivada from './Context/RotaPrivada';
import Home from './Paginas/Home';
import Missao from './Paginas/Missao';
import Equipe from './Paginas/Equipe';
import Galeria from './Paginas/Galeria';
import GaleriaPart from './Paginas/Galeria/GaleriaPart';
import FormCadAluno from './Componentes/Formulario/FormCadAluno';
import FormCadColaborador from './Componentes/Formulario/FormCadColaborador';
import CadUser from './Componentes/Login/CadUser';
import Login from './Componentes/Login/Login';
import Musicalizacao from './Paginas/Oficinas/Musicalizacao';
import Percussao from './Paginas/Oficinas/Percussao';
import Instrumental from './Paginas/Oficinas/Instrumental';
import Danca from './Paginas/Oficinas/Danca';
import { AuthProvider } from './Context/AuthContext';

function App() {
  return (
    <>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro-aluno" element={<FormCadAluno />} /> 
          <Route path="/cadastro-colaborador" element={<FormCadColaborador />} /> 
          <Route path="/login-novo" element={<CadUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/nossos-colaboradores" element={<Equipe />} />
          <Route path="/missao" element={<Missao />} />
          <Route path="/musicalizacao" element={<Musicalizacao />} />
          <Route path="/percussao" element={<Percussao />} />
          <Route path="/instrumental" element={<Instrumental />} />
          <Route path="/danca" element={<Danca />} />
          <Route path="/galeria-partituras" element={<GaleriaPart />} />
        </Routes>
      </Router>
      </AuthProvider>
      </>
    );
}

/*<Route 
  path="/cadastro-aluno" element={<RotaPrivada perfil="Adm">
      <FormCadAluno />
    </RotaPrivada>
  }
/>
<Route 
  path="/cadastro-colaborador" element={<RotaPrivada perfil="Adm">
      <FormCadColaborador />
    </RotaPrivada>
  }
/>*/


export default App;
