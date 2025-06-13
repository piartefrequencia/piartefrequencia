import React, { useState, useEffect } from 'react';
import './MenuLateral.css';

function MenuLateral() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [submenuAberto, setSubmenuAberto] = useState({});

  // Fecha o menu clicando fora
  useEffect(() => {
    const fecharMenu = (e) => {
      if (!e.target.closest('.menu-lateral') && !e.target.closest('.botao-hamburguer')) {
        setMenuAberto(false);
        setSubmenuAberto({});
      }
    };
    document.addEventListener('click', fecharMenu);
    return () => {
      document.removeEventListener('click', fecharMenu);
    };
  }, []);

  const alternarSubmenu = (item) => {
    setSubmenuAberto((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  return (
    <>
      {/* Botão hamburguer */}
      <div 
        className={`botao-hamburguer ${menuAberto ? 'ativo' : ''}`} 
        onClick={(e) => {
          e.stopPropagation();
          setMenuAberto(!menuAberto);
        }}
      >
        ☰
      </div>

      {/* Menu lateral */}
      <nav className={`menu-lateral ${menuAberto ? 'aberto' : ''}`}>
        <ul>
          <li>
            <button onClick={() => alternarSubmenu('sobre')}>Sobre ▾</button>
            {submenuAberto['sobre'] && (
              <ul className="submenu">
                <li><a href="/missao">Nossa Missão</a></li>
                <li><a href="/nossos-colaboradores">Nossos Colaboradores</a></li>
                <li><a href="/galeria">Galeria de Imagens e Vídeos</a></li>
              </ul>
            )}
          </li>

          <li>
            <button onClick={() => alternarSubmenu('oficinas')}>Oficinas ▾</button>
            {submenuAberto['oficinas'] && (
              <ul className="submenu">
                <li><a href="/musicalizacao">Musicalização Infantil</a></li>
                <li><a href="/instrumental">Prática Instrumental</a></li>
                <li><a href="/percussao">Percussão Popular e Rudimentar</a></li>
                <li><a href="/danca">Danças</a></li>
              </ul>
            )}
          </li>
          <li>
          <button onClick={() => alternarSubmenu('cadastro')}>Cadastros ▾</button>
            {submenuAberto['cadastro'] && (
              <ul className="submenu">
                <li><a href="/cadastro-aluno">Alunos</a></li>
                <li><a href="/cadastro-colaborador">Colaboradores</a></li>
              </ul>
            )}
          </li>
          
          <li>
          <button onClick={() => alternarSubmenu('acompfreq')}>Acompanhamento Frequência ▾</button>
            {submenuAberto['acompfreq'] && (
              <ul className="submenu">
                <li><a href="/form-frequencia">Frequência Alunos</a></li>                
              </ul>
            )}
          </li>

          <li>
            <button onClick={() => alternarSubmenu('login')}>Login ▾</button>
            {submenuAberto['login'] && (
              <ul className="submenu">
                <li><a href="/login-novo">Novo</a></li>
                <li><a href="/login">Login</a></li>
              </ul>
            )}
          </li>
          
        </ul>
      </nav>
    </>
  );
}

export default MenuLateral;
