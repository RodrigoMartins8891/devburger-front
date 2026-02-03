import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import styles from "./AdminProdutos.module.css";

export function AdminEditarProduto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [preview, setPreview] = useState(null);
  const [imagem, setImagem] = useState(null);

  useEffect(() => {
    async function carregarProduto() {
      try {
        const response = await api.get(`/produtos/${id}`);
        setNome(response.data.nome);
        setValor(response.data.valor);
        setCategoriaId(response.data.categoria_id);
        setPreview(response.data.imagem);
      } catch (err) {
        alert("Erro ao carregar dados do produto");
      }
    }
    carregarProduto();
  }, [id]);

  async function handleEditar(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("nome", nome);
    data.append("valor", valor);
    data.append("categoria_id", categoriaId);
    if (imagem) data.append("imagem", imagem);

    try {
      await api.put(`/produtos/${id}`, data);
      alert("Produto atualizado com sucesso!");
      navigate("/admin/produtos");
    } catch (err) {
      alert("Erro ao editar");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h1>Editar Produto</h1>
        <form onSubmit={handleEditar}>
          <input value={nome} onChange={(e) => setNome(e.target.value)} required />
          <input type="number" step="0.01" value={valor} onChange={(e) => setValor(e.target.value)} required />
          
          <select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} required>
            <option value="1">Hambúrgueres</option>
            <option value="2">Bebidas</option>
            <option value="3">Acompanhamentos</option>
          </select>

          <div className={styles.uploadArea}>
            <label htmlFor="foto">Trocar Foto</label>
            <input type="file" id="foto" onChange={(e) => {
              setImagem(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }} />
            {preview && <img src={preview} className={styles.previewImg} alt="Preview" />}
          </div>

          <button type="submit" className={styles.saveBtn}>Salvar Alterações</button>
          <button type="button" onClick={() => navigate("/admin/produtos")} style={{background: 'none', color: '#FBFADA', border: 'none', cursor: 'pointer'}}>Cancelar</button>
        </form>
      </div>
    </div>
  );
}