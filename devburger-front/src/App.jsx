import { useEffect, useState } from "react";
import { api } from "./api/api";
import { useCart } from "./hooks/useCart";
import { Link, useNavigate } from "react-router-dom";
import styles from "./App.module.css";

function App() {
  const [produtos, setProdutos] = useState([]);
  const [idCategoriaAtiva, setIdCategoriaAtiva] = useState(0); // 0 = Mostrar todos
  const { cart, addProduct } = useCart();
  const navigate = useNavigate();

  // Mapeamento idêntico ao seu <select> do AdminProdutos.jsx
  const categoriasFiltro = [
    { id: 0, nome: "Todos" },
    { id: 1, nome: "Hambúrgueres" },
    { id: 2, nome: "Bebidas" },
    { id: 3, nome: "Acompanhamentos" },
  ];

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const response = await api.get("/produtos");
        // Garante que os dados sejam um array
        setProdutos(response?.data || []);
      } catch (error) {
        console.error("Erro ao buscar produtos", error);
      }
    }
    carregarProdutos();
  }, []);

  // Lógica de Filtro: compara o categoria_id do banco com o ID do botão clicado
  const produtosFiltrados =
    idCategoriaAtiva === 0
      ? produtos
      : produtos.filter((p) => Number(p.categoria_id) === idCategoriaAtiva);

  console.log(
    "Categorias dos produtos vindos do banco:",
    produtos.map((p) => p.categoria_id),
  );

  return (
    <div className={styles.mainContainer}>
      <header className={styles.header}>
        <div className={styles.logoGroup}>
          <div className={styles.logoBadge}>DB</div>
          <h1 className={styles.logoTitle}>
            DEV<span>BURGER</span>
          </h1>
        </div>
        <nav className={styles.navLinks}>
          <Link to="/meus-pedidos" className={styles.link}>
            Meus Pedidos
          </Link>
          <Link to="/carrinho" className={styles.link}>
            Carrinho ({cart?.length || 0})
          </Link>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Sair
          </button>
        </nav>
      </header>

      {/* SEÇÃO DE CATEGORIAS (FILTRO) */}
      <div className={styles.categoryNav}>
        {categoriasFiltro.map((cat) => (
          <button
            key={cat.id}
            className={
              idCategoriaAtiva === cat.id ? styles.activeTab : styles.tab
            }
            onClick={() => setIdCategoriaAtiva(cat.id)}
          >
            {cat.nome}
          </button>
        ))}
      </div>

      {/* GRID DE PRODUTOS */}
      <main className={styles.content}>
        {produtosFiltrados.length > 0 ? (
          <div className={styles.productGrid}>
            {produtosFiltrados.map((produto) => (
              <div key={produto.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className={styles.productImage}
                  />
                </div>
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{produto.nome}</h3>
                  <p className={styles.productPrice}>
                    R${" "}
                    {produto.valor
                      ? Number(produto.valor).toFixed(2).replace(".", ",")
                      : "0,00"}
                  </p>
                  <button
                    className={styles.addButton}
                    onClick={() => addProduct && addProduct(produto)}
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.statusContainer}>
            <p className={styles.loadingText}>
              {produtos.length === 0
                ? "Buscando delícias..."
                : "Nenhum item nesta categoria ainda."}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
