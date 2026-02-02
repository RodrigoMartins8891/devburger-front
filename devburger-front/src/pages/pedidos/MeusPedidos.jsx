import { useEffect, useState } from 'react';
import { api } from '../../api/api';
import { io } from 'socket.io-client';
import { Link } from 'react-router-dom';
import styles from './MeusPedidos.module.css';

const socket = io('http://localhost:3000');

export function MeusPedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);

    async function carregarPedidos() {
        try {
            const response = await api.get('/pedidos');
            setPedidos(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        carregarPedidos();

        socket.on('pedido-status-atualizado', (pedidoAtualizado) => {
            setPedidos((prev) =>
                prev.map((p) =>
                    p.id === pedidoAtualizado.id
                        ? { ...p, status: pedidoAtualizado.status }
                        : p
                )
            );
        });

        return () => socket.off('pedido-status-atualizado');
    }, []);

    // Função para definir a cor da badge conforme o status
    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'pendente': return styles.statusPendente;
            case 'preparando': return styles.statusPreparando;
            case 'entregue': return styles.statusEntregue;
            default: return styles.statusPadrao;
        }
    };

    if (loading) return <div className={styles.loading}>Carregando seus burgers...</div>;

    return (
        <div className={styles.mainContainer}>
            <div className={styles.content}>
                <h1 className={styles.title}>Meus Pedidos 📦</h1>

                {pedidos.length === 0 ? (
                    <div className={styles.empty}>
                        <p>Você ainda não fez nenhum pedido.</p>
                        <Link to="/home" className={styles.orderNow}>Fazer meu primeiro pedido</Link>
                    </div>
                ) : (
                    <div className={styles.ordersGrid}>
                        {pedidos.map(pedido => (
                            <div key={pedido.id} className={styles.orderCard}>
                                <div className={styles.cardHeader}>
                                    <span>Pedido <strong>#{pedido.id.toString().slice(-4)}</strong></span>
                                    <span className={`${styles.statusBadge} ${getStatusClass(pedido.status)}`}>
                                        {pedido.status}
                                    </span>
                                </div>
                                
                                <div className={styles.cardBody}>
                                    <p>Total: <strong>R$ {Number(pedido.total).toFixed(2).replace('.', ',')}</strong></p>
                                    <span>{new Date(pedido.criado_em).toLocaleString('pt-BR')}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <Link to="/home" className={styles.backLink}>← Voltar para a Home</Link>
            </div>
        </div>
    );
}