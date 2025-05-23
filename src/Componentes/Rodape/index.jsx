import React from 'react';
import '../../Styles/styles.css';

function Rodape() {
  return (
    <footer>
      <div className="social-icons">
        <a href="https://wa.me/5581988195849" target="_blank" rel="noreferrer">
          <i className="fab fa-whatsapp"></i>
        </a>
        <a href="https://instagram.com/bandamarcialheitorvillalobos" target="_blank" rel="noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="mailto:piartefrequencia@gmail.com">
          <i className="fas fa-envelope"></i>
        </a>
      </div>
      <p>Desenvolvido por: ANDREW, PAULO FRAGA, RONYBERG, LUIGI, LUAN</p>
      <p>Contato: (81) 99464-4959 Irvi Tavares</p>
      <p>&copy; 2025 Arte & Frequência. Todos os direitos reservados.</p>
    </footer>
  );
}

export default Rodape;
