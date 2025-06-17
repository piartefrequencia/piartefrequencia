import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CadUser.css';

function CadUser() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    usuario: '',
    senha: '',
    perfil: 'Colaborador' // Valor padrão
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleSalvar = (e) => {
    e.preventDefault();
    alert('Usuário cadastrado com sucesso!');
    console.log('Dados do Usuário:', formData);
    navigate('/');
  };

  const handleAlterar = () => {
    alert('Função de alterar em desenvolvimento!');
  };

  const handleFechar = () => {
    navigate(-1); // Volta para a tela anterior
  };

  return (
    <div className="usuario-container">
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSalvar}>
        <label>Nome:
          <input 
            type="text" 
            name="nome" 
            value={formData.nome} 
            onChange={handleChange} 
            required 
          />
        </label>

        <label>Email:
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </label>

        <label>Usuário:
          <input 
            type="text" 
            name="usuario" 
            value={formData.usuario} 
            onChange={handleChange} 
            required 
          />
        </label>

        <label>Senha:
          <input 
            type="password" 
            name="senha" 
            value={formData.senha} 
            onChange={handleChange} 
            required 
          />
        </label>

        <label>Perfil:
          <select 
            name="perfil" 
            value={formData.perfil} 
            onChange={handleChange}
            required
          >
            <option value="Adm">Administrador</option>
            <option value="Aluno">Aluno</option>
            <option value="Colaborador">Colaborador</option>
          </select>
        </label>

        <div className="botoes">
          <button type="submit" className="btn-salvar">SALVAR</button>
          <button type="button" className="btn-alterar" onClick={handleAlterar}>ALTERAR</button>
          <button type="button" className="btn-voltar" onClick={handleFechar}>FECHAR</button>
        </div>
      </form>
    </div>
  );
}

export default CadUser;
