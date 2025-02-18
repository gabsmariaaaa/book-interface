import { useState } from "react";
import "./Minhatela.css";
import PropTypes from 'prop-types';


export default function ModalAdicionar({ fecharModal, adicionarLivro }) {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [ano, setAno] = useState("");

  const handleAdicionar = () => {
    if (titulo && autor && ano) {
      adicionarLivro({ titulo, autor, ano: parseInt(ano, 10) });
      fecharModal();
    } else {
      alert("Preencha todos os campos!");
    }
  };

  return (
    <div className="modal-adicionar">
      <div className="modal-content">
        <h2>Adicionar Livro</h2>
        <div className="form-group">
          <label>Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Autor:</label>
          <input
            type="text"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Ano:</label>
          <input
            type="number"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button className="edit" onClick={handleAdicionar}>OK</button>
          <button className="cancel" onClick={fecharModal}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

ModalAdicionar.propTypes = {
  fecharModal: PropTypes.func.isRequired,
  adicionarLivro: PropTypes.func.isRequired,
};