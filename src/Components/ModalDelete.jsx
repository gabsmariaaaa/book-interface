import "./Minhatela.css";
import PropTypes from 'prop-types';

export default function ModalDelete({ fecharModal, deletarLivro, livro }) {
  const handleDeletar = () => {
    if (livro) {
      deletarLivro(livro);
      fecharModal();
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={fecharModal}></div>
      <div className="modal-delete">
        <div className="modal-content">
          <h2>Deletar Livro</h2>
          <p>Tem certeza que deseja deletar o livro &quot;{livro.titulo}&quot;? Essa ação não pode ser desfeita.</p>
          <div className="buttons">
            <button className="danger" onClick={handleDeletar}>Deletar</button>
            <button className="cancel" onClick={fecharModal}>Cancelar</button>
          </div>
        </div>
      </div>
    </>
  );
}

ModalDelete.propTypes = {
  fecharModal: PropTypes.func.isRequired,
  deletarLivro: PropTypes.func.isRequired,
  livro: PropTypes.object.isRequired,
};
