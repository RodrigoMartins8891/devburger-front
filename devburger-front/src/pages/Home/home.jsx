import estilo from "./Home.module.css";
import thumb1 from "../../assets/1.png";
import thumb2 from "../../assets/2.png";
import thumb3 from "../../assets/3.png";
import thumb4 from "../../assets/5.png";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    // Aplicamos o estilo inline para o background aqui ou via CSS (preferível via CSS se o caminho for estático)
    <main className={estilo.main}> 
      <header className={estilo.header}>
        <div className={estilo.logoWrapper}>
          <div className={estilo.logoBadge}>DB</div>
          <h1 className={estilo.logoTitle}>
            DEV<span>BURGER</span>
          </h1>
        </div>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Shop</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/">About</Link>
        </nav>
      </header>

      <section className={estilo.hero}>
        <div className={estilo.text}>
          <span>THE ULTIMATE</span>
          <h2>Burger Club</h2>
          <p>Savor the flavor, join the club!</p>

          <div className={estilo.thumbnails}>
            <img src={thumb1} alt="Burger Variedade 1" />
            <img src={thumb2} alt="Burger Variedade 2" />
            <img src={thumb3} alt="Burger Variedade 3" />
            <img src={thumb4} alt="Burger Variedade 4" />
          </div>
        </div>
        
        {/* A div .image foi removida daqui pois agora faz parte do background */}
      </section>
    </main>
  );
}