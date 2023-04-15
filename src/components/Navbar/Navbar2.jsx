import React, { useEffect, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./style.css";
import MinhaImagem from "../../views/login/imagens/logo_circulo.png";
import MinhaImagem2 from "../../views/perfil/imagens/perfil_circulo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
  };

  return (
    <header className="header">
      <div className="header__content">
        <Link to="/" className="header__content__logo">
          <img src={MinhaImagem} alt="Minha imagem" style={{ width: '60px' }} />
        </Link>
        <nav
          className={`${"header__content__nav"} 
          ${menuOpen && size.width < 768 ? `${"isMenu"}` : ""} 
          }`}
        >
          <ul>

            <li id="navbar_botao_inicio">
              <Link to="/">Início</Link>
            </li>

            <Link to="/post">
              <button id="navbar_botao_criar_nota" className="btn">Criar nota</button>
            </Link>

            <Link to="/feed">
              <button id="navbar_botao_criar_nota" className="btn">Voltar</button>
            </Link>

            <Link to="/perfil" className="header__content__logo">
              <img src={MinhaImagem2} alt="Minha imagem" style={{ width: '60px' }} />
            </Link>

          </ul>

        </nav>
        <div className="header__content__toggle">
          {!menuOpen ? (
            <BiMenuAltRight onClick={menuToggleHandler} />
          ) : (
            <AiOutlineClose onClick={menuToggleHandler} />
          )}
        </div>
      </div>
    </header>
  );
}
