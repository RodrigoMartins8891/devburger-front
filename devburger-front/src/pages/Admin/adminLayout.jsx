import { Link, Outlet, useNavigate } from 'react-router-dom';
import styles from './AdminLayout.module.css';

export function AdminLayout() {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div className={styles.adminWrapper}>
            <aside className={styles.sidebar}>
                <h2 className={styles.logo}>BURGUR <span>ADMIN</span></h2>
                <nav className={styles.navMenu}>
                    <Link to="/admin/pedidos">📦 Pedidos em Tempo Real</Link>
                    <Link to="/admin/produtos">🍔 Gerenciar Cardápio</Link>
                </nav>
                <button onClick={handleLogout} className={styles.logoutBtn}>Sair do Painel</button>
            </aside>

            <main className={styles.content}>
                {/* O Outlet é onde as páginas (Pedidos ou Produtos) vão aparecer */}
                <Outlet />
            </main>
        </div>
    );
}