import { useState } from "react";
import { api } from "../../api/api";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Auth.module.css"; // Reutilizando a lógica de estilos

export function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        nome,
        email,
        senha,
      });

      alert("Cadastro realizado com sucesso!");
      navigate("/login"); // Redireciona para o login após cadastrar
    } catch (err) {
      alert("Erro ao cadastrar. Tente novamente.");
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.formCard} onSubmit={handleRegister}>
        <div className={styles.logoWrapper}>
          <div className={styles.logoBadge}>DB</div>
          <h1 className={styles.logoTitle}>
            DEV<span>BURGER</span>
          </h1>
        </div>
        <h2>Crie sua conta</h2>

        <div className={styles.inputGroup}>
          <input
            placeholder="Nome completo"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <input
            type="email"
            placeholder="Seu melhor email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="Crie uma senha"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <button type="submit" className={styles.loginButton}>
          Cadastrar
        </button>

        <p className={styles.toggleText}>
          Já tem conta? <Link to="/login">Faça login</Link>
        </p>

        <Link to="/" className={styles.backLink}>
          ← Voltar para a Home
        </Link>
      </form>
    </div>
  );
}
