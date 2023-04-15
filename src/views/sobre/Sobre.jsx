import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

import Navbar from "../../components/Navbar/Navbar1";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Sobre() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      axios
        .get("https://m5-gru-crud-api.cyclic.app/adm/sobre")
        .then((response) => {
          setData(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }, 1);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="Sobre">
        {loading && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: "9999",
              backgroundColor: "#fff",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ClipLoader color={"#36D7B7"} loading={loading} css={override} size={150} />
          </div>
        )}

        {!loading && data && (
          /* #################### */
          <div className='nao_usar_essa_div1'>
            {/* ↓↓↓ NÃO APAGAR NEM USAR ESSA DIV ↓↓↓ */}
            <div className='nao_usar_essa_div2'>&nbsp;</div>
            {/* ↑↑↑ NÃO APAGAR NEM USAR ESSA DIV ↑↑↑ */}
            {/* ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ POR O CÓDIGO AQUI ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ */}

            {data.map((item, key) => {
              return (
                <div className='sobre_bloco_do_card' key={key}>
                  <div className='sobre_bloco_do_card2'>
                    <div className='sobre_titulo'>
                      <h2>{item.sobre_titulo}</h2>
                      <p className='sobre_descricao'>{item.sobre_descricao}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ POR O CÓDIGO AQUI ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ */}
          </div>
        )}
      </div>
    </div>

  );
}
export default Sobre;