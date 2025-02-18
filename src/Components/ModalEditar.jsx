import { useState, useEffect } from "react";
import PropTypes from "prop-types"; 
import "./MinhaTela.css";


export default function ModalEditar({ fecharModal, livro, atualizarLivro }) {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [ano, setAno] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    if (livro) {
      setTitulo(livro.titulo);
      setAutor(livro.autor);
      setAno(livro.ano);
    }
  }, [livro]);

  const handleSalvar = () => {
    if (titulo && autor && ano) {
      atualizarLivro({ ...livro, titulo, autor, ano });
      setMensagem("Seus dados foram alterados!");
      setTimeout(() => {
        setMensagem("");
        fecharModal();
      }, 2000);
    }
  };

  return (
    <div className="modal-editar">
      <div className="modal-content">
        <h2>Aplique a alteração necessária</h2>
        <div className="form-group">
          <label>Título:</label>
          <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Autor:</label>
          <input type="text" value={autor} onChange={(e) => setAutor(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Ano:</label>
          <input type="number" value={ano} onChange={(e) => setAno(e.target.value)} />
        </div>
        {mensagem && <p className="success-message">{mensagem}</p>}
        <div className="buttons">
          <button className="edit" onClick={handleSalvar}>Salvar</button>
          <button className="cancel" onClick={fecharModal}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

ModalEditar.propTypes = {
  fecharModal: PropTypes.func.isRequired,
  livro: PropTypes.object.isRequired,
  atualizarLivro: PropTypes.func.isRequired,
};
