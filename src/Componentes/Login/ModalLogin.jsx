import { useState } from 'react';

const ModalLogin = () => {
  const [aberto, setAberto] = useState(false);

  return (
    <>
      <button onClick={() => setAberto(true)}>Abrir Login</button>
      {aberto && (
        <div className="modal">
          <div className="modal-content">
            <span onClick={() => setAberto(false)} className="close">&times;</span>
            <h3>Login</h3>
            <form>
              <label>Usuário:</label>
              <input type="text" name="usuario" /><br />
              <label>Senha:</label>
              <input type="password" name="senha" /><br />
              <button type="submit">Entrar</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalLogin;
