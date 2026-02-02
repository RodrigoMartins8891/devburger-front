import { useEffect, useState } from 'react';
import { api } from '../../api/api'; // Ajuste o caminho se necessário
import { io } from 'socket.io-client';
import styles from './AdminPedidos.module.css';

const socket = io('http://localhost:3000');

export function AdminPedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);

    async function carregarPedidos() {
        try {
            const response = await api.get('/pedidos/admin/todos');
            setPedidos(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function atualizarStatus(id, status) {
        try {
            await api.patch(`/pedidos/${id}/status`, { status });
            // Não precisamos atualizar o state manualmente aqui, 
            // pois o socket.on abaixo já vai capturar a mudança para nós!
        } catch (err) {
            console.error(err);
            alert('Erro ao atualizar status');
        }
    }

    useEffect(() => {
        carregarPedidos();

        socket.on('pedido-status-atualizado', (pedidoAtualizado) => {
            setPedidos(prev =>
                prev.map(p => p.id === pedidoAtualizado.id ? { ...p, ...pedidoAtualizado } : p
            )
            );
        });

        return () => socket.off('pedido-status-atualizado');
    }, []);

    if (loading) return <div className={styles.loader}>Acessando central de pedidos...</div>;

    return (
        <div className={styles.adminContainer}>
            <header className={styles.adminHeader}>
                <h1>📊 Painel Administrativo</h1>
                <p>{pedidos.length} pedidos no total</p>
            </header>

            <div className={styles.ordersList}>
                {pedidos.map(pedido => (
                    <div key={pedido.id} className={styles.orderCard}>
                        <div className={styles.orderInfo}>
                            <h3>Pedido #{pedido.id.toString().slice(-4)}</h3>
                            <p>Cliente: <strong>{pedido.usuario_nome}</strong></p>
                            <p>Total: <span>R$ {Number(pedido.total).toFixed(2).replace('.', ',')}</span></p>
                            <div className={styles.statusCurrent}>
                                Status atual: <strong>{pedido.status}</strong>
                            </div>
                        </div>

                        <div className={styles.actionButtons}>
                            <button 
                                className={styles.btnReceived}
                                onClick={() => atualizarStatus(pedido.id, 'RECEBIDO')}
                            >Recebido</button>
                            <button 
                                className={styles.btnPreparing}
                                onClick={() => atualizarStatus(pedido.id, 'EM_PREPARO')}
                            >Em preparo</button>
                            <button 
                                className={styles.btnSent}
                                onClick={() => atualizarStatus(pedido.id, 'ENVIADO')}
                            >Enviado</button>
                            <button 
                                className={styles.btnDone}
                                onClick={() => atualizarStatus(pedido.id, 'FINALIZADO')}
                            >Finalizado</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}