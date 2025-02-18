import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/livros";

export const getLivros = async () => {
  return await axios.get(`${API_BASE_URL}/livros`);
};

export const adicionarLivro = async (novoLivro) => {
  return await axios.post(`${API_BASE_URL}/livros`, novoLivro);
};

export const atualizarLivro = async (id, livroAtualizado) => {
  return await axios.put(`${API_BASE_URL}/livros/${id}`, livroAtualizado);
};

export const deletarLivro = async (id) => {
  return await axios.delete(`${API_BASE_URL}/livros/${id}`);
};
