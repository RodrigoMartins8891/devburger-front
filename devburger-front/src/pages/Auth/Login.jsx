import { useState } from "react";
import { api } from "../../api/api";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import styles from "./Auth.module.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, senha });
      const token = response.data.token;
      localStorage.setItem("token", token);

      const usuario = jwtDecode(token);
      usuario.is_admin ? navigate("/admin/pedidos") : navigate("/home");
    } catch (err) {
      alert("Login inválido! Verifique suas credenciais.");
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.formCard} onSubmit={handleLogin}>
        <div className={styles.logoWrapper}>
          <div className={styles.logoBadge}>DB</div>
          <h1 className={styles.logoTitle}>
            DEV<span>BURGER</span>
          </h1>
        </div>
        <h2>Bem-vindo de volta</h2>

        <div className={styles.inputGroup}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="Senha"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <button type="submit" className={styles.loginButton}>
          Entrar
        </button>

        <p className={styles.toggleText}>
          Não tem conta? <Link to="/register">Cadastre-se</Link>
        </p>

        <Link to="/" className={styles.backLink}>
          ← Voltar para a Home
        </Link>
      </form>
    </div>
  );
}
