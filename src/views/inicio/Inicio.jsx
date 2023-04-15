import React from "react";
import './style.css';
import Texto from './Texto';
import imagem1 from './imagens/1.png';
import imagem2 from './imagens/2.png';
import imagem3 from './imagens/3.png';
import Navbar from "../../components/Navbar/Navbar1";

function Inicio() {

  return (
    <div >
      <Navbar />
      < div className="mainFrame_inicio" >

        <div className="minhasfotos">
          <img className="imagem-card" src={imagem1} alt="imagem1"></img>
          <img className="imagem-card" src={imagem2} alt="imagem2"></img>
          <img className="imagem-card" src={imagem3} alt="imagem3"></img>
        </div>

        <div className="texto_inicio">
          <Texto />
        </div>

      </div >
    </div>
  )
}
export default Inicio;


