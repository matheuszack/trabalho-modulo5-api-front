import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Navbar from "../../components/Navbar/Navbar2";

function LerMais() {
    const [lermais, setLermais] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get(`https://m5-gru-crud-api.cyclic.app/notas/${id}`)
            .then(response => setLermais(response.data.data[0]))
            .catch(error => console.error(error));
        console.log(lermais.nota_informacao)
    }, [])

    return (
        <div>
            <Navbar />
            <main>
                <div className="cards">
                    <div className="card" >

                        <header>
                            <h2 className='notas_h2'>{lermais.nota_titulo}</h2>
                        </header>

                        <div className="line"></div>

                        <p>{lermais.nota_informacao}</p>

                    </div>
                </div>
            </main>
        </div>
    )
}
export default LerMais