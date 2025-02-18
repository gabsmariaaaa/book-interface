import { useState, useEffect } from "react";
import "./MinhaTela.css";
import ModalEditar from "./ModalEditar";
import ModalDelete from "./ModalDelete";
import ModalAdicionar from "./ModalAdicionar";

const API_BASE_URL = "http://localhost:5000/api/books"; 

export default function MinhaTela() {
  const [livros, setLivros] = useState([]);
  const [livroSelecionado, setLivroSelecionado] = useState(null);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [modalDeleteAberto, setModalDeleteAberto] = useState(false);
  const [modalAdicionarAberto, setModalAdicionarAberto] = useState(false);


  useEffect(() => {
    fetch(API_BASE_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro HTTP! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setLivros(data))
      .catch((error) => console.error("Erro ao buscar livros:", error));
  }, []);

  const abrirModalEditar = (livro) => {
    setLivroSelecionado(livro);
    console.log("Abrindo modal de edição para:", livro);
    setModalEditarAberto(true);
  };

  const abrirModalDelete = (livro) => { 
    setLivroSelecionado(livro);
    
    setModalDeleteAberto(true); 
  };

  const abrirModalAdicionar = () => {
    console.log("Abrindo modal de adicionar");
    setModalAdicionarAberto(true);
  };

  const adicionarLivro = (novoLivro) => {
    setLivros([...livros, { ...novoLivro, id: livros.length + 1 }]);
    setModalAdicionarAberto(false);
  };

  const deletarLivro = (livro) => {
    setLivros((prevLivros) => prevLivros.filter(item => item.id !== livro.id));
    setMensagem("Livro excluído com sucesso!"); 
  
    setTimeout(() => setMensagem(""), 2000); 
  };
  

  const atualizarLivro = (livroAtualizado) => {
    setLivros((livros) =>
      livros.map((livro) =>
        livro.id === livroAtualizado.id ? livroAtualizado : livro
      )
    );
    setMensagem("Seus dados foram alterados!"); 
  
    setTimeout(() => setMensagem(""), 2000); 
  };
  
    const [mensagem, setMensagem] = useState(""); 

     return (
    <div className="background">
      <div className="container">
        <nav className="navbar">
          <section className="add-section">
            <div className="botaoAdicionar" onClick={abrirModalAdicionar}>
              ➕ Adicionar Livro
            </div>
          </section>
          <h1 className="titulolivro">Listagem de Livros</h1>
        </nav>
        {mensagem && <div className="popup">{mensagem}</div>}


        <main className="main">
          <div className="tabelaContainer">
            <table className="livrosTabela">
              <thead>
                <tr>
                  <th className="titulo">Título</th>
                  <th className="autor">Autor</th>
                  <th className="ano">Ano</th>
                  <th className="acao1">Editar</th>
                  <th className="acao2">Deletar</th>
                </tr>
              </thead>
              <tbody>
                {livros.map((livro) => (
                  <tr key={livro.id}>
                    <td>{livro.titulo}</td>
                    <td>{livro.autor}</td>
                    <td>{livro.ano}</td>
                    <td>
                      <button onClick={() => abrirModalEditar(livro)}>✏️</button>
                    </td>
                    <td>
                      <button onClick={() => abrirModalDelete(livro)}>🗑️</button> {/* Alterado aqui */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {modalEditarAberto && (
  <ModalEditar
    livro={livroSelecionado}
    fecharModal={() => setModalEditarAberto(false)}
    atualizarLivro={atualizarLivro} 
  />
)}


      {modalDeleteAberto && (
        <ModalDelete
          livro={livroSelecionado}
          fecharModal={() => setModalDeleteAberto(false)} 
          deletarLivro={deletarLivro} 
        />
      )}

      {modalAdicionarAberto && (
        <ModalAdicionar
          fecharModal={() => setModalAdicionarAberto(false)}
          adicionarLivro={adicionarLivro}
        />
      )}
    </div>
  );
}
