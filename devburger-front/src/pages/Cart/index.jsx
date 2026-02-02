import { useCart } from '../../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import styles from './Cart.module.css';
import { Link } from 'react-router-dom';

export function Cart() {
    const {
        cart,
        removeProduct,
        increaseQuantity,
        decreaseQuantity
    } = useCart();

    const total = cart.reduce((acc, item) => {
        const precoLimpo = typeof item.valor === 'string'
            ? Number(item.valor.replace(',', '.'))
            : item.valor;
        return acc + (precoLimpo * (item.quantidade || 1));
    }, 0);

    const navigate = useNavigate();

    return (
        <div className={styles.mainContainer}>
            <div className={styles.cartCard}>
                <h1 className={styles.title}>Meu Carrinho 🛒</h1>

                {cart.length === 0 ? (
                    <div className={styles.emptyMsg}>
                        <p>Seu carrinho está vazio.</p>
                        <button onClick={() => navigate('/home')} className={styles.backButton}>
                            Ver Cardápio
                        </button>
                    </div>
                ) : (
                    <>
                        <ul className={styles.itemList}>
                            {cart.map(item => (
                                <li key={item.id} className={styles.item}>
                                    <div className={styles.info}>
                                        <h3>{item.nome}</h3>
                                        <p>R$ {Number(item.valor).toFixed(2).replace('.', ',')}</p>
                                    </div>

                                    <div className={styles.actions}>
                                        <div className={styles.quantityControl}>
                                            <button onClick={() => decreaseQuantity(item.id)}>-</button>
                                            <span>{item.quantidade}</span>
                                            <button onClick={() => increaseQuantity(item.id)}>+</button>
                                        </div>

                                        <button
                                            className={styles.removeBtn}
                                            onClick={() => removeProduct(item.id)}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className={styles.footer}>
                            <div className={styles.totalRow}>
                                <span>Total:</span>
                                <strong>R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
                            </div>

                            <button className={styles.checkoutBtn} onClick={() => navigate('/checkout')}>
                                Finalizar Pedido
                            </button>
                            <Link to="/home" className={styles.linkBack}>
                                ← Adicionar mais itens
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}