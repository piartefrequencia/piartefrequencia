import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css'; // Criaremos esse CSS também

function NavBar() {
  const [submenuAberto, setSubmenuAberto] = useState(null);
  const navigate = useNavigate();

  const alternarSubmenu = (item) => {
    setSubmenuAberto((prev) => (prev === item ? null : item));
  };

  const handleVoltar = () => {
    navigate(-1); // Volta para a página anterior
  };

  return (
    <nav className="menu-bar-horizontal">
      <ul className="menu-bar-lista">
        <li onMouseEnter={() => alternarSubmenu('sobre')} onMouseLeave={() => setSubmenuAberto(null)}>
          <button>Sobre ▾</button>
          {submenuAberto === 'sobre' && (
            <ul className="submenu-horizontal">
              <li><a href="/missao">Nossa Missão</a></li>
              <li><a href="/nossos-colaboradores">Nossos Colaboradores</a></li>
              <li><a href="/galeria">Galeria de Imagens e Vídeos</a></li>
              <li><a href="/galeria-partituras">Biblioteca de Partituras</a></li>
            </ul>
          )}
        </li>

        <li onMouseEnter={() => alternarSubmenu('oficinas')} onMouseLeave={() => setSubmenuAberto(null)}>
          <button>Oficinas ▾</button>
          {submenuAberto === 'oficinas' && (
            <ul className="submenu-horizontal">
              <li><a href="/musicalizacao">Musicalização Infantil</a></li>
              <li><a href="/instrumental">Prática Instrumental</a></li>
              <li><a href="/percussao">Percussão Popular</a></li>
              <li><a href="/danca">Danças</a></li>
            </ul>
          )}
        </li>
        <li>
        <button onClick={() => navigate('/login')}>Login</button>
       
        </li>
        
      </ul>
    </nav>
  );
}

export default NavBar;
