import React from 'react';
import './Cabecalho.css'; // Arquivo CSS, se desejar estilizar separado

function Cabecalho() {
  return (
    <header className="cabecalho">
      <img 
        src="Assets/img/ARTE_E_FREQUENCIA_TESTE.png" 
        alt="Logo do Arte & Frequência" 
        className="logo"
      />
    </header>
  );
}

export default Cabecalho;