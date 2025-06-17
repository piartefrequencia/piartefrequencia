import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormCadastros.css';

function FormCadAluno() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    oficinas: {
      musicalizacao: false,
      praticaInstrumental: false,
      danca: false,
      percussaoPopularErud: false, 
    },
      nome: '',
      cpf: '',
      rg: '',
      dataExpedRg: '',
      orgaoExp: '',
      rn: '',
      dataNascimento: '',
      idade: '',
      escola: '',
      filiacaoPai: '',
      filiacaoMae: '',
      responsavel: '',
      possuiDoenca: '', // 'sim' ou 'nao'
      qualDoenca: '',
      medicacao: '',
      tipoSanguineo: '', // Ex: 'A+', 'O-', etc.
      serieturma: '',
      turnoesc: '',
      telefone: '',
      emailResponsavel: '',
      autorizacaoImagem: false,
      atividadesExtras: false,
      descricaoAtividadesExtras: '',
      necessidadesEspeciais: false,
      descricaoNecessidadesEspeciais: '',
    });

  // 🔥 Função genérica para máscara de data
  const handleData = (e) => {
    const { name, value } = e.target;
    let dataFormatada = value.replace(/\D/g, '');

    if (dataFormatada.length >= 2) {
      dataFormatada = dataFormatada.slice(0, 2) + '/' + dataFormatada.slice(2);
    }
    if (dataFormatada.length >= 5) {
      dataFormatada = dataFormatada.slice(0, 5) + '/' + dataFormatada.slice(5, 9);
    }

    setFormData({ 
      ...formData, 
      dataNascimento: dataFormatada,
      dataExpedRg: dataFormatada });
  };

  // Função para calcular idade automaticamente
  useEffect(() => {
    const data = formData.dataNascimento;
    const partes = data.split('/');

    if (partes.length === 3) {
      const dia = parseInt(partes[0], 10);
      const mes = parseInt(partes[1], 10) - 1; // meses começam do zero
      const ano = parseInt(partes[2], 10);

      const hoje = new Date();
      const nascimento = new Date(ano, mes, dia);

      if (!isNaN(nascimento)) {
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const m = hoje.getMonth() - nascimento.getMonth();

        if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
          idade--;
        }

        setFormData((prev) => ({ ...prev, idade: idade >= 0 ? idade : '' }));
      }
    }
  }, [formData.dataNascimento]);

  // Máscara para telefone com DDD
  const handleTelefone = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length <= 10) {
      value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }

    setFormData({ ...formData, telefone: value });
  };

  // Manipuladores
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('oficinas.')) {
      const oficinaKey = name.split('.')[1];
      setFormData({
        ...formData,
        oficinas: {
          ...formData.oficinas,
          [oficinaKey]: checked
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Cadastro de Aluno realizado com sucesso!');
    console.log('Dados do aluno:', formData);
    navigate('/');
  };

  const handleVoltar = () => {
    navigate(-1); // Volta para a página anterior
  };

 return (
    <div className="form-container">
      <h2>Cadastro de Aluno</h2>
      <form onSubmit={handleSubmit}>

        {/* ✅ Seção de OFICINAS no topo */}
        <div className="oficinas-group">
          <h3>OFICINAS:</h3>
          <label>
            <input
              type="checkbox"
              name="oficinas.musicalizacao"
              checked={formData.oficinas.musicalizacao}
              onChange={handleChange}
            />
            MUSICALIZAÇÃO INFANTIL (07 À 11 ANOS)
          </label>
          <label>
            <input
              type="checkbox"
              name="oficinas.praticaInstrumental"
              checked={formData.oficinas.praticaInstrumental}
              onChange={handleChange}
            />
            PRÁTICA INSTRUMENTAL (12 À 17 ANOS)
          </label>
          <label>
            <input
              type="checkbox"
              name="oficinas.danca"
              checked={formData.oficinas.danca}
              onChange={handleChange}
            />
            DANÇA (09 À 17 ANOS)
          </label>
          <label>
            <input
              type="checkbox"
              name="oficinas.percussaoPopular"
              checked={formData.oficinas.percussaoPopular}
              onChange={handleChange}
            />
            PERCUSSÃO POPULAR E ERUDITA (12 À 17 ANOS)
          </label>
        </div>

        <label>Nome Completo:
          <input 
          type="text" 
          name="nome" 
          value={formData.nome} 
          onChange={handleChange} 
          required 
          />
        </label>
        <div className="linha">
          <label>CPF:
            <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} required />
          </label>

          <label>RG / Org. Exp.:
            <input type="text" name="rg" value={formData.rg} onChange={handleChange} required />
          </label>
          
          <label>Data de Exp. RG:
              <input 
                type="text" 
                name="dataExpedRg" 
                maxLength="10"
                placeholder="dd/mm/aaaa"
                value={formData.dataExpedRg}
                onChange={handleData}
                required 
              />
            </label>
        </div>

        <div className="linha">
          <label>Data de Nascimento:
            <input 
              type="text" 
              name="dataNascimento" 
              maxLength="10"
              placeholder="dd/mm/aaaa"
              value={formData.DataNascimento}
              onChange={handleData}
              required 
            />
          </label>

          <label>Idade:
            <input 
              type="text" 
              name="idade" 
              value={formData.idade ? `${formData.idade} anos` : ''} 
              readOnly 
            />
          </label>
          <label>R.Nasc.:
            <input type="text" name="rn" value={formData.rn} onChange={handleChange} required />
          </label>
        </div>

        <div className="linha-filiacao">
          <label>Filiação - Pai:
            <input type="text" name="filiacaoPai" value={formData.filiacaoPai} onChange={handleChange} />
          </label>

          <label>Telefone do Pai:
          <input 
            type="text" 
            name="telefonepai" 
            maxLength="15"
            placeholder="(99) 99999-9999"
            value={formData.telefone}
            onChange={handleTelefone}
            required 
          />
        </label>

          <label>Filiação - Mãe:
            <input type="text" name="filiacaoMae" value={formData.filiacaoMae} onChange={handleChange} />
          </label>
        </div>

        <label>Telefone da Mãe:
          <input 
            type="text" 
            name="telefonemae" 
            maxLength="15"
            placeholder="(99) 99999-9999"
            value={formData.telefone}
            onChange={handleTelefone}
            required 
          />
        </label>

        {/* Doença Crônica */}
        <div className="linha-radio">
          <label>Possui alguma doença crônica?</label>
          <label>
            <input
              type="radio"
              name="possuiDoenca"
              value="sim"
              checked={formData.possuiDoenca === 'sim'}
              onChange={handleChange}
            /> Sim
          </label>
          <label>
            <input
              type="radio"
              name="possuiDoenca"
              value="nao"
              checked={formData.possuiDoenca === 'nao'}
              onChange={handleChange}
            /> Não
          </label>
        </div>


        {/* Campos adicionais se tiver doença */}
        {formData.possuiDoenca === 'sim' && (
          <>
            <label>
              Qual(ais) Doença(s)?
              <input
                type="text"
                name="qualDoenca"
                value={formData.qualDoenca}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Necessidade da(s) Medicação(ções):
              <input
                type="text"
                name="medicacao"
                value={formData.medicacao}
                onChange={handleChange}
                required
              />
            </label>
          </>
        )}

        {/* Tipo Sanguíneo */}
        <label>Tipo Sanguíneo:</label>
        <div className="linha">
          {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((tipo) => (
            <label key={tipo}>
              <input
                type="radio"
                name="tipoSanguineo"
                value={tipo}
                checked={formData.tipoSanguineo === tipo}
                onChange={handleChange}
              /> {tipo}
            </label>
          ))}
        </div>


          <label>Nome da Escola:
            <input type="text" name="escola" value={formData.escola} onChange={handleChange} required />
          </label>

        <div className="linha"> 
          <label>Série / Turma:
            <input type="text" name="turma" value={formData.turma} onChange={handleChange} required />
          </label>

          <label>Turno:
            <input type="text" name="turnoesc" value={formData.turnoesc} onChange={handleChange} required />
          </label>
        </div>
        
        <label>Responsável:
          <input type="text" name="responsavel" value={formData.responsavel} onChange={handleChange} required />
        </label>

        <label>Telefone do Responsável:
          <input 
            type="text" 
            name="telefone" 
            maxLength="15"
            placeholder="(99) 99999-9999"
            value={formData.telefone}
            onChange={handleTelefone}
            required 
          />
        </label>

        <label>Email do Responsável:
          <input type="email" name="emailResponsavel" value={formData.emailResponsavel} onChange={handleChange} required />
        </label>

        <div className="checkbox-group">
          <label>
            <input 
              type="checkbox" 
              name="autorizacaoImagem" 
              checked={formData.autorizacaoImagem} 
              onChange={handleChange} 
            />
            Autorização de uso de imagem
          </label>

          {/* Checkbox - Atividades Extras */}
        <label>
          <input 
            type="checkbox" 
            name="atividadesExtras" 
            checked={formData.atividadesExtras} 
            onChange={handleChange} 
          />
          Participa de atividades extras
        </label>

        {/* Campo de texto - Quais Atividades Extras */}
        {formData.atividadesExtras && (
          <label>
            Quais atividades extras?
            <input 
              type="text" 
              name="descricaoAtividadesExtras"
              value={formData.descricaoAtividadesExtras || ''} 
              onChange={handleChange}
              placeholder="Descreva aqui..."
              required
            />
          </label>
        )}

        {/* Checkbox - Necessidades Especiais */}
        <label>
          <input 
            type="checkbox" 
            name="necessidadesEspeciais" 
            checked={formData.necessidadesEspeciais} 
            onChange={handleChange} 
          />
          Possui necessidades especiais
        </label>

        {/* Campo de texto - Quais Necessidades Especiais */}
        {formData.necessidadesEspeciais && (
          <label>
            Quais necessidades especiais?
            <input 
              type="text" 
              name="descricaoNecessidadesEspeciais"
              value={formData.descricaoNecessidadesEspeciais || ''} 
              onChange={handleChange}
              placeholder="Descreva aqui..."
              required
            />
          </label>
        )}
        </div>

        <div className="botoes">
          <button type="submit" className="btn-salvar">SALVAR</button>
          <button type="button" className="btn-voltar" onClick={handleVoltar}>FECHAR</button>
        </div>
      </form>
    </div>
  );
}

export default FormCadAluno;
