import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import './style.css'
import moment from 'moment';
import Navbar from "../../components/Navbar/Navbar2";

const validationPost = yup.object().shape({
    nota_titulo: yup.string().required("O título é obrigatório").max(40, "O título precisa ter menosde 40 caracteres"),
    nota_informacao: yup.string().required("O conteúdo é obrigatório").max(500, "O conteúdo precisa ter menosde 500 caracteres")
})

function Post() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationPost)
    })

    const addPost = (data) => {
        const newData = {
            ...data,
            nota_ultima_edicao: moment().format('YYYY-MM-DD HH:mm:ss'),
            usuario_id: 1
        };
        axios.post("https://m5-gru-crud-api.cyclic.app/notas", newData)
            .then((res) => {
                console.log(`DEU CERTO | ID da nota: ${res.data.data.insertId}`);
                window.history.back("/feed");
            })
            .catch((err) => {
                console.log(`DEU ERRO: ${err}`);
            });
    };

    return (
        <div>
            <Navbar />
            <main>
                <div className="card-post" >

                    <h1>Criar postagem</h1>
                    <div className="line-post" ></div>

                    <div className="card-body-post" >

                        <form onSubmit={handleSubmit(addPost)} >

                            <div className="fields" >
                                <label>Título</label>
                                <input type="text" name="title" {...register("nota_titulo")} />
                                <p className="error-message">{errors.title?.message}</p>
                            </div>

                            <div className="fields" >
                                <label>Conteúdo</label>
                                <textarea type="text" name="content" {...register("nota_informacao")} ></textarea>
                                <p className="error-message">{errors.content?.message}</p>
                            </div>

                            <div className="btn-post" >
                                <button type="submit" >Enviar</button>
                            </div>

                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}
export default Post