import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const sucesso = login(usuario, senha);
    if (sucesso) {
      navigate('/');
    } else {
      setErro('Usuário ou senha inválidos!');
    }
  };

  const handleFechar = () => {
    navigate(-1); //Volta para página anterior
  }

  return (
    <div className="login-container">
      <h2>Acesso Login</h2>
      {erro && <p className="erro">{erro}</p>}
      <form onSubmit={handleSubmit}>
        <label>Usuário:
          <input 
            type="text" 
            value={usuario} 
            onChange={(e) => setUsuario(e.target.value)} 
            required 
          />
        </label>
        <label>Senha:
          <input 
            type="password" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            required 
          />
        </label>

        {/* Link de recuperação de senha */}
        <div className="recuperar-senha">
          <a 
            href="mailto:irvitavaresoficial27@gmail.com?subject=Recuperação de login/senha"
            className="link-ajuda"
          >
            Lembrar usuário e/ou senha
          </a>
        </div>

                <button type="submit" className="btn-entrar">ENTRAR</button>
        <button type="button" className="btn-fechar" onClick={handleFechar}>FECHAR</button>
      </form>
      {erro && <p style={{ color: 'red' }}
      >{erro}</p>}
    </div>
  );
}

export default Login;
