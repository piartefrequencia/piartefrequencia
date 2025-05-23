import { useState } from 'react';

const MenuLateral = () => {
  const [aberto, setAberto] = useState(false);

  const toggleMenu = () => {
    setAberto(!aberto);
  };

  return (
    <>
      <button onClick={toggleMenu} id="botaoMenu">&#9776;</button>
      <div
        id="menuLateral"
        style={{ width: aberto ? '250px' : '0', transition: 'width 0.3s' }}
        className="menu-lateral"
      >
        <a href="#">Início</a>
        <a href="#">Sobre</a>
        <a href="#">Cadastro</a>
        <a href="#">Acompanhamento</a>
        <a href="#">Galeria</a>
        <a href="#">Projetos</a>
        <a href="#">Fale Conosco</a>
        <a href="#formCadastro">Cadastro de Alunos</a>
        <a href="#login">Login</a>
      </div>
    </>
  );
};

export default MenuLateral;
