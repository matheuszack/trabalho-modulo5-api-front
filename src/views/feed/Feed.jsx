import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './style.css';
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import Navbar from "../../components/Navbar/Navbar2";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Feed() {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([])
    useEffect(() => {
        axios.get("https://m5-gru-crud-api.cyclic.app/notas")
            .then((response) => {
                setPosts(response.data.data);
                setLoading(false);
                console.log(response.data.data);
            })
            .catch((err) => {
                setLoading(false);
                console.log(`DEU ERRO: ${err}`);
            })
    }, [])
    function deletePost(id) {
        console.log()
        axios.delete(`https://m5-gru-crud-api.cyclic.app/notas/${id}`)
        setPosts(posts.filter(post => post.nota_id !== id))
    }

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

                {!loading && posts && (
                    /* #################### */
                    <div>
                        {/* ↓↓↓ NÃO APAGAR NEM USAR ESSA DIV ↓↓↓ */}
                        <div className='nao_usar_essa_div'>&nbsp;</div>
                        {/* ↑↑↑ NÃO APAGAR NEM USAR ESSA DIV ↑↑↑ */}
                        {/* ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ POR O CÓDIGO AQUI ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ */}

                        <main>
                            <div className="cards">
                                {posts.map((post, key) => {
                                    return (
                                        <div className="card" key={key} >
                                            <div className='header_old'>
                                                <h2 className='notas_h2'>{post.nota_titulo}</h2>
                                            </div>
                                            <div className="line"></div>
                                            <p>{post.nota_informacao}</p>
                                            <div className="btns" >
                                                <div className="btn-edit" >
                                                    <Link to={{ pathname: `/edit/${post.nota_id}` }} >
                                                        <button>Editar</button>
                                                    </Link>
                                                </div>
                                                <div className="btn-readmore" >
                                                    <Link to={{ pathname: `/lermais/${post.nota_id}` }} >
                                                        <button>Ler mais</button>
                                                    </Link>
                                                </div>
                                                <div className="btn-delete" >
                                                    <button onClick={() => deletePost(post.nota_id)} >Apagar</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </main>

                        {/* ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ POR O CÓDIGO AQUI ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ */}
                    </div>
                )}
            </div>
        </div>
    );
}
export default Feed;