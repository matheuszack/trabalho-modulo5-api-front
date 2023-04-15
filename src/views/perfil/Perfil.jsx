import React from "react";
import "./style.css";
import Navbar from "../../components/Navbar/Navbar2";

const Perfil = () => {
  return (
    <div>
    <Navbar />
    <div className="profile">

      <div className="profile-header">
        <h2 className="profile-name">Orlando</h2>
      </div>

      <div className="profile-details">
        <div className="profile-details__row">

          <div className="profile-details__label">Gênero:</div>
          <div className="profile-details__value">Masculino</div>

        </div>
        <div className="profile-details__row">

          <div className="profile-details__label">Data de nascimento:</div>
          <div className="profile-details__value">01/01/2022</div>

        </div>
        <div className="profile-details__row">

          <div className="profile-details__label">Peso:</div>
          <div className="profile-details__value">60 kg</div>

        </div>
        <div className="profile-details__row">

          <div className="profile-details__label">Altura:</div>
          <div className="profile-details__value">1,70 m</div>

        </div>
        <div className="profile-details__row">

          <div className="profile-details__label">Tipo sanguíneo:</div>
          <div className="profile-details__value">O+</div>

        </div>
        <div className="profile-details__row">

          <div className="profile-details__label">IMC:</div>
          <div className="profile-details__value">20.76</div>

        </div>
        <div className="profile-details__row">

          <div className="profile-details__label">E-mail:</div>
          <div className="profile-details__value">orlando@gmail.com</div>

        </div>
      </div>
    </div>
    </div>
  );
};

export default Perfil;
