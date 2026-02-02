import { useEffect, useState } from 'react';
import { api } from './api/api';
import { useCart } from './hooks/useCart';
import { Link, useNavigate } from 'react-router-dom';
import styles from './App.module.css';

function App() {
  const [produtos, setProdutos] = useState([]);
  const { cart, addProduct } = useCart();
  const navigate = useNavigate();

  // 1. Função de Logout movida para o escopo principal do componente
  function handleLogout() {
    localStorage.removeItem('token'); 
    navigate('/login'); 
  }

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const response = await api.get('/produtos');
        setProdutos(response?.data || []);
      } catch (error) {
        console.error('Erro ao buscar produtos', error);
      }
    }

    carregarProdutos();
  }, []);

  return (
    <div className={styles.mainContainer || ''}>
      <header className={styles.header || ''}>
        <h1 className={styles.logo}>BURGUR 🍔</h1>
        <nav className={styles.navLinks}>
          <Link to="/meus-pedidos">Meus Pedidos</Link>
          <Link to="/carrinho">Carrinho ({cart?.length || 0})</Link>

          {/* Agora o botão consegue acessar a função corretamente */}
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Sair
          </button>
        </nav>
      </header>

      {produtos && produtos.length > 0 ? (
        <div className={styles.productGrid}>
          {produtos.map(produto => (
            <div key={produto.id} className={styles.card}>
              <img
                src={produto.imagem}
                alt={produto.nome}
                className={styles.productImage}
              />
              <h3 className={styles.productName}>{produto.nome}</h3>

              <p className={styles.productPrice}>
                R$ {produto.valor ? Number(produto.valor).toFixed(2).replace('.', ',') : '0,00'}
              </p>

              <button
                className={styles.addButton}
                onClick={() => addProduct && addProduct(produto)}
              >
                Adicionar
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.loadingText}>Buscando produtos...</p>
      )}
    </div>
  );
}

export default App;