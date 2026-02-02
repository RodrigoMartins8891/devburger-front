import { useCart } from '../../hooks/useCart';
import { api } from '../../api/api';
import { Link } from 'react-router-dom';
import styles from './Checkout.module.css';

export function Checkout() {
    const { cart, clearCart } = useCart();

    const total = cart.reduce(
        (acc, item) => acc + (Number(item.valor) * (item.quantidade || 1)),
        0
    );

    async function handleFinishOrder() {
        try {
            await api.post('/pedidos', {
                itens: cart.map(item => ({
                    produto_id: item.id,
                    quantidade: item.quantidade
                }))
            });

            alert('Pedido realizado com sucesso! 🍔🔥');
            clearCart();
        } catch (error) {
            console.error(error.response?.data || error);
            alert('Erro ao finalizar pedido. Verifique se você está logado.');
        }
    }

    if (cart.length === 0) {
        return (
            <div className={styles.emptyContainer}>
                <h2>Seu carrinho está vazio 🛒</h2>
                <Link to="/home" className={styles.backButton}>Voltar ao Menu</Link>
            </div>
        );
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.checkoutCard}>
                <h1 className={styles.title}>Resumo do Pedido 🧾</h1>

                <ul className={styles.itemList}>
                    {cart.map(item => (
                        <li key={item.id} className={styles.item}>
                            <div className={styles.itemInfo}>
                                <span className={styles.itemName}>{item.nome}</span>
                                <span className={styles.itemQty}>{item.quantidade}x</span>
                            </div>
                            <span className={styles.itemPrice}>
                                R$ {(Number(item.valor) * item.quantidade).toFixed(2).replace('.', ',')}
                            </span>
                        </li>
                    ))}
                </ul>

                <div className={styles.totalContainer}>
                    <span>Total</span>
                    <span className={styles.totalValue}>
                        R$ {total.toFixed(2).replace('.', ',')}
                    </span>
                </div>

                <button className={styles.finishButton} onClick={handleFinishOrder}>
                    Finalizar Pedido
                </button>
                
                <Link to="/home" className={styles.linkBack}>← Adicionar mais itens</Link>
            </div>
        </div>
    );
}