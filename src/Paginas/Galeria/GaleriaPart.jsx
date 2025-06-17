import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GaleriaPart.css';

function GaleriaPart() {
  const navigate = useNavigate();
  const [arquivos, setArquivos] = useState([]);
  const [busca, setBusca] = useState('');
  const [usuario] = useState({ logado: true, perfil: 'Adm' });
  const [modal, setModal] = useState({ aberto: false, url: '', tipo: '' });


  // Futuro banco de dados (exemplo de payload):
    /*
    fetch('/api/partituras', {
      method: 'POST',
      body: JSON.stringify(novosArquivos),
      headers: { 'Content-Type': 'application/json' }
    });*/

  // Carrega dados salvos
  useEffect(() => {
    const dadosSalvos = JSON.parse(localStorage.getItem('partituras')) || [];
    setArquivos(dadosSalvos);

    // Proteção contra print e copiar
    const handleKeyDown = (e) => {
      if (
        e.key === 'PrintScreen' ||
        (e.ctrlKey && ['c', 'u', 's', 'p'].includes(e.key.toLowerCase()))
      ) {
        e.preventDefault();
        alert('Ação desabilitada por segurança.');
      }
    };
    const handleContextMenu = (e) => e.preventDefault();

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  const converterParaBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    const novosArquivos = await Promise.all(files.map(async (file) => {
      const base64 = await converterParaBase64(file);
      return {
        nome: file.name,
        tipo: file.type,
        conteudo: base64,
        id: Date.now() + Math.random()
      };
    }));

    const atualizados = [...arquivos, ...novosArquivos];
    setArquivos(atualizados);
    localStorage.setItem('partituras', JSON.stringify(atualizados));
  };

  const handleExcluir = (id) => {
    const confirmar = window.confirm('Deseja realmente excluir esta partitura?');
    if (!confirmar) return;
    const atualizados = arquivos.filter(arq => arq.id !== id);
    setArquivos(atualizados);
    localStorage.setItem('partituras', JSON.stringify(atualizados));
  };

  const abrirModal = (url, tipo) => {
    setModal({ aberto: true, url, tipo });
  };

  const fecharModal = () => {
    setModal({ aberto: false, url: '', tipo: '' });
  };

  const arquivosFiltrados = arquivos.filter((arq) =>
    arq.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="galeria-container">
      <h2>Biblioteca de Partituras</h2>

      <input
        type="text"
        placeholder="Pesquisar partituras..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="campo-busca"
      />

      {usuario.logado && usuario.perfil === 'Adm' && (
        <div className="upload-area">
          <label className="botao-upload">
            Upload de Arquivos
            <input
              type="file"
              multiple
              accept=".pdf, .png, .jpg, .jpeg"
              onChange={handleUpload}
              hidden
            />
          </label>
        </div>
      )}

      <div className="lista-arquivos">
        {arquivosFiltrados.length > 0 ? (
          arquivosFiltrados.map((arq) => {
            const ext = arq.nome.split('.').pop().toLowerCase();
            const tipo = arq.tipo || ext;
            let icone = '📄';
            if (ext === 'pdf') icone = '📕';
            else if (['jpg', 'jpeg', 'png'].includes(ext)) icone = '🖼️';

            return (
              <div key={arq.id} className="arquivo">
                <p
                  className="link-visualizar"
                  onClick={() => abrirModal(arq.conteudo, tipo)}
                  style={{ cursor: 'pointer', textDecoration: 'underline' }}
                >
                  {icone} {arq.nome}
                </p>

                {usuario.logado && (
                  <a href={arq.conteudo} download={arq.nome}>
                    <button className="btn-download">📥 Download de Partitura</button>
                  </a>
                )}

                {usuario.logado && usuario.perfil === 'Adm' && (
                  <button className="btn-excluir" onClick={() => handleExcluir(arq.id)}>
                    🗑️ Excluir
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <p>Nenhum arquivo encontrado.</p>
        )}
      </div>

      {modal.aberto && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {['jpg', 'jpeg', 'png'].includes(modal.tipo) ? (
              <img src={modal.url} alt="Visualização" className="protegido" />
            ) : (
              <iframe src={modal.url} title="PDF" className="protegido" />
            )}
            <button className="close-button" onClick={fecharModal}>✖</button>
          </div>
        </div>
      )}

      <div className="fechar-container">
        <button className="btn-voltar" onClick={() => navigate(-1)}>
         FECHAR
        </button>
      </div>
    </div>
  );
}

export default GaleriaPart;
