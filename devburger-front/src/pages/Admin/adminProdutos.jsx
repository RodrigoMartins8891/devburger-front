import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import styles from "./AdminProdutos.module.css";

export function AdminProdutos() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [imagem, setImagem] = useState(null);
  const [preview, setPreview] = useState(null);
  const [produtos, setProdutos] = useState([]);

  async function carregarProdutos() {
    try {
      const response = await api.get("/produtos");
      setProdutos(response.data);
    } catch (err) {
      console.error("Erro ao carregar produtos", err);
    }
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImagem(file);
      setPreview(URL.createObjectURL(file));
    }
  }

  async function handleSalvarProduto(e) {
    e.preventDefault();
    if (!imagem) {
      alert("Selecione uma foto");
      return;
    }

    const data = new FormData();
    data.append("nome", nome);
    data.append("valor", valor);
    data.append("categoria_id", categoriaId);
    data.append("imagem", imagem);

    try {
      await api.post("/produtos", data);
      alert("Produto cadastrado com sucesso!");
      setNome(""); setValor(""); setCategoriaId(""); setImagem(null); setPreview(null);
      carregarProdutos();
    } catch (err) {
      alert("Erro ao cadastrar produto");
    }
  }

  async function handleExcluir(id) {
    if (!window.confirm("Tem certeza que deseja excluir este produto?")) return;
    try {
      await api.delete(`/produtos/${id}`);
      setProdutos((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert("Erro ao excluir produto");
    }
  }

  return (
    <div className={styles.container}>
      {/* CARD 1 - FORMULÁRIO DE CADASTRO */}
      <div className={styles.formCard}>
        <h1>Novo Produto</h1>
        <form onSubmit={handleSalvarProduto}>
          <input
            placeholder="Nome do Burger"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <input
            placeholder="Preço"
            type="number"
            step="0.01"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />

          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            required
          >
            <option value="">Selecione a Categoria</option>
            <option value="1">Hambúrgueres</option>
            <option value="2">Bebidas</option>
            <option value="3">Acompanhamentos</option>
          </select>

          <div className={styles.uploadArea}>
            <label htmlFor="file-upload">Escolher Foto</label>
            <input 
              id="file-upload"
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
            />
            {preview && <img src={preview} alt="Preview" className={styles.previewImg} />}
          </div>

          <button type="submit" className={styles.saveBtn}>
            Cadastrar Produto
          </button>
        </form>
      </div>

      {/* CARD 2 - LISTAGEM PARA EDIÇÃO/EXCLUSÃO */}
      <div className={styles.formCard}>
        <h1>Gerenciar Cardápio</h1>
        <div className={styles.gridAdmin}>
          {produtos.length > 0 ? (
            produtos.map((p) => (
              <div key={p.id} className={styles.productRow}>
                <div className={styles.info}>
                  <span>{p.nome}</span>
                  <p>R$ {Number(p.valor).toFixed(2)}</p>
                </div>

                <div className={styles.actions}>
                  <button
                    type="button"
                    onClick={() => navigate(`/admin/produtos/editar/${p.id}`)}
                    className={styles.editBtn}
                  >
                    ✏️
                  </button>

                  <button
                    type="button"
                    onClick={() => handleExcluir(p.id)}
                    className={styles.deleteBtn}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.emptyMsg}>Nenhum produto cadastrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}