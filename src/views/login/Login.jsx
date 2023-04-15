import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import "./style.css";
import logo from './imagens/logo_circulo.png';
import { funcoes } from './funcoes.js';
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import sha1 from 'js-sha1';
import Navbar from "../../components/Navbar/Navbar1";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  function botao_funcao(inf) {
    if (!(typeof inf === 'undefined')) {

      // Abrir link
      if (inf.match(/\//)) {
        navigate(inf)
      };

      // GET Consultar usuario ############################## ENTRAR
      if (inf.match(/ENTRAR/)) {
        const email_form = funcoes.PegarPeloId("login_acesso_email");
        const senha1_form = funcoes.PegarPeloId("login_acesso_senha_1");
        if ((typeof email_form === 'undefined') || !(email_form.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/))) {
          alert("Acesso: EMAIL INVÁLIDO!");
          return
        }
        if ((typeof senha1_form === 'undefined') || !(senha1_form.length > 7)) {
          alert("Acesso: SENHA NÃO CONTEM 8 CARACTERES!");
          return
        }

        setLoading(true);
        setTimeout(() => {
          axios
            .get(`https://m5-gru-crud-api.cyclic.app/usuarios/email=${email_form}`)
            .then((response) => {
              var resultado = response.data.data[0];
              const email_api = resultado.usuario_email;
              const senha1_api = resultado.usuario_senha;

              if (sha1(senha1_form) == senha1_api) {
                funcoes.DefinirVariavelLocal('usuario_id', resultado.usuario_id)

                document.getElementById("navbar_botao_criar_nota").style.display = "block";
                document.getElementById("navbar_botao_perfil").style.display = "block";

                document.getElementById("navbar_botao_sobre").style.display = "none";
                document.getElementById("navbar_botao_funcionalidades").style.display = "none";
                document.getElementById("navbar_botao_comunicados").style.display = "none";

                alert(`SENHA OK | ID: ${funcoes.PegarVariavelLocal('usuario_id')} | Abrindo página de notas`);
                botao_funcao("/feed")
              }
              else {
                alert("Acesso: SENHA INVALIDA")
              };
              setLoading(false);
            })
            .catch((error) => {
              alert("Acesso: USUARIO NÃO CADASTRADO")
              console.log(error);
              setLoading(false);
            });
        }, 1);
      };

      // Alterar senha ############################## ALTERAR_SENHA
      if (inf.match(/ALTERAR_SENHA/)) {
        const email = funcoes.PegarPeloId("login_redefinir_senha_email");
        const pergu = funcoes.PegarPeloId("login_redefinir_senha_reset_pergunta");
        const resp = funcoes.PegarPeloId("login_redefinir_senha_reset_resposta");
        const senha1 = funcoes.PegarPeloId("login_redefinir_senha_senha_1");
        const senha2 = funcoes.PegarPeloId("login_redefinir_senha_senha_2");

        if ((typeof email === 'undefined') || !(email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/))) {
          alert("Redefinir senha: EMAIL INVÁLIDO!");
          return
        };
        if ((typeof pergu === 'undefined') || !(pergu.length > 3)) {
          alert("Redefinir senha: PERGUNTA INVÁLIDA!");
          return
        }
        if ((typeof resp === 'undefined') || !(resp.length > 0)) {
          alert("Redefinir senha: RESPOSTA NÃO TEM A PARTIR DE 1 CARACTERE!");
          return
        }
        if ((typeof senha1 === 'undefined') || !(senha1.length > 7)) {
          alert("Redefinir senha: SENHA NÃO TEM MAIS DE 7 CARACTERES!");
          return
        }
        if (!(senha2 == senha1)) {
          alert("Redefinir senha: SENHAS NÃO CONFEREM!");
          return
        }

        // GET 2 Alterar senha (pegar da banco de dados)
        setLoading(true);
        setTimeout(() => {
          axios
            .get(`https://m5-gru-crud-api.cyclic.app/usuarios/email=${email}`)
            .then((response) => {
              var resultado_2 = response.data.data[0];
              alert(`${resultado_2.usuario_nome} | Senha ${senha1}`);

              // PUT Alterar senha ############################## CONFIRMAR
              if (!(resultado_2.usuario_id > 0)) {
                alert("Redefinir senha: ID DO USUÁRIO ERRADO!");
                return
              };
              alert(`TROCAR SENHA NO BANCO DE DADOS | Usuario ID: ${resultado_2.usuario_id}`)

              setTimeout(() => {
                var data = JSON.stringify({
                  "usuario_id": resultado_2.usuario_id,
                  "usuario_nome": resultado_2.usuario_nome,
                  "usuario_genero": resultado_2.usuario_genero,
                  "usuario_nascimento": resultado_2.usuario_nascimento,
                  "usuario_peso": resultado_2.usuario_peso,
                  "usuario_altura": resultado_2.usuario_altura,
                  "usuario_tipo_sanguineo": resultado_2.usuario_tipo_sanguineo,
                  "usuario_imc": resultado_2.usuario_imc,
                  "usuario_email": resultado_2.usuario_email,
                  "usuario_senha": senha1,
                  "usuario_reset_pergunta": pergu,
                  "usuario_reset_resposta": resp,
                  "usuario_extra": resultado_2.usuario_extra,
                  "usuario_status": resultado_2.usuario_status
                });
                var config = {
                  method: 'put',
                  url: 'https://m5-gru-crud-api.cyclic.app/usuarios/5',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  data: data
                };
                axios(config)
                  .then(function (response) {
                    setLoading(false);
                    alert("OK");
                    console.log(JSON.stringify(response.data));
                  })
                  .catch(function (error) {
                    setLoading(false);
                    console.log(error);
                  });
              }, 1);

              // Erro se não conseguir encontrar o ID do usuário no GET 2
            })
            .catch((error) => {
              alert("Redefinir senha: ERRO AO BUSCAR DADOS")
              console.log(error);
              setLoading(false);
              return
            });
        }, 1);

      }

      // POST Se cadastrar ############################## CADASTRAR
      if (inf.match(/CADASTRAR/)) {
        const nome = funcoes.PegarPeloId("login_se_cadastrar_nome");
        const email = funcoes.PegarPeloId("login_se_cadastrar_email");
        const senha1 = funcoes.PegarPeloId("login_se_cadastrar_senha_1");
        const senha2 = funcoes.PegarPeloId("login_se_cadastrar_senha_2");
        const genero = funcoes.PegarPeloId("option_login_se_cadastrar_genero");
        const nascimento = funcoes.PegarPeloId("login_se_cadastrar_nascimento");
        var peso = funcoes.PegarPeloId("login_se_cadastrar_peso");
        var altura = funcoes.PegarPeloId("login_se_cadastrar_altura");
        var tipo_sanguineo = funcoes.PegarPeloId("option_login_se_cadastrar_tipo_sanguineo");
        const reset_pergunta = funcoes.PegarPeloId("option_login_se_cadastrar_reset_pergunta");
        const reset_resposta = funcoes.PegarPeloId("login_se_cadastrar_reset_resposta");

        if ((typeof nome === 'undefined') || !(nome.length > 3)) {
          alert("Cadastro: NOME INVÁLIDO!");
          return
        };
        if ((typeof email === 'undefined') || !(email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/))) {
          alert("Cadastro: EMAIL INVÁLIDO!");
          return
        };
        if ((typeof senha1 === 'undefined') || !(senha1.length > 7)) {
          alert("Cadastro: SENHA PRECISA TER NO MÍNOMO 8 DÍGITOS!");
          return
        }
        if (!(senha2 == senha1)) {
          alert("Cadastro: SENHAS NÃO CONFEREM!");
          return
        }
        if ((typeof genero === 'undefined') || !(genero == "Feminino") && !(genero == "Masculino") && !(genero == "Outros")) {
          alert("Cadastro: ERRO GENERO!");
          return
        }
        if ((typeof nascimento === 'undefined') || !(nascimento.length > 2)) {
          alert("Cadastro: ERRO DATA DE NASCIMENTO!");
          return
        }
        if ((typeof peso === 'undefined') || !(peso > 0)) {
          alert("Cadastro: ERRO PESO!");
          return
        }
        if ((typeof altura === 'undefined') || !(altura > 0)) {
          alert("Cadastro: ERRO ALTURA!");
          return
        }
        if ((typeof tipo_sanguineo === 'undefined') || !(tipo_sanguineo == 'A+') && !(tipo_sanguineo == 'B+') && !(tipo_sanguineo == 'AB+') && !(tipo_sanguineo == 'O+') && !(tipo_sanguineo == 'A-') && !(tipo_sanguineo == 'B-') && !(tipo_sanguineo == 'AB-') && !(tipo_sanguineo == 'O-')) {
          alert("Cadastro: ERRO TIPO SANGUINEO!");
          return
        }
        if ((typeof reset_pergunta === 'undefined') || (reset_pergunta == "Pergunta de segurança")) {
          alert("Cadastro: ERRO PERGUNTA!");
          return
        }
        if ((typeof reset_resposta === 'undefined') || !(reset_resposta.length > 2)) {
          alert("Cadastro: ERRO RESPOSTA!");
          return
        }

        var peso = peso.replace(",", ".");
        var altura = altura.replace(",", ".");

        setTimeout(() => {
          var data = JSON.stringify({
            "usuario_nome": nome,
            "usuario_email": email,
            "usuario_senha": senha1,
            "usuario_nascimento": nascimento,
            "usuario_genero": genero,
            "usuario_peso": peso,
            "usuario_altura": altura,
            "usuario_tipo_sanguineo": tipo_sanguineo,
            "usuario_imc": (peso / (altura * altura)),
            "usuario_reset_pergunta": reset_pergunta,
            "usuario_reset_resposta": reset_resposta,
            "usuario_extra": "{\"inf_1\":\"A\"}"
          });
          setLoading(true);
          var config = {
            method: 'post',
            url: 'https://m5-gru-crud-api.cyclic.app/usuarios',
            headers: {
              'Content-Type': 'application/json'
            },
            data: data
          };
          axios(config)
            .then(function (response) {
              setLoading(false);
              if (response.data.status == "error") {
                console.log(response.data.message);
                alert(`${response.data.message}`);
                return
              };
              if (response.data.data.insertId > 0) {
                console.log(response.data.data.insertId);
                alert(`Cadastrado com sucesso! Usuário ID: ${response.data.data.insertId}`);
                return
              };
              alert("Erro 1 ao cadastrar")


            })
            .catch(function (error) {
              setLoading(false);
              alert("Erro 2 ao cadastrar")
            });
        }, 1);

      }

    };
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

        {!loading && data && (
          /* #################### */
          <div>
            {/* ↓↓↓ NÃO APAGAR NEM USAR ESSA DIV ↓↓↓ */}
            <div className='nao_usar_essa_div'>&nbsp;</div>
            {/* ↑↑↑ NÃO APAGAR NEM USAR ESSA DIV ↑↑↑ */}
            {/* ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ POR O CÓDIGO AQUI ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ */}

            <div className="login_box">
              <div className="brand_logo_container">
                <img src={logo} className="brand_logo" alt="Logo"></img>
              </div>
              {/* ################################################################### */}
              {/* Formulário: ACESSO / REDEFINIR SENHA / CADASTRO */}
              <form className="login_todos_os_formularios">
                {/*  Formulário: elemento 'TÍTULO' */}
                <h1 className="login_h1" id="login_titulo">Acesso</h1>
                {/* Formulário: elementos do formulário 'ACESSO' */}
                <div id="login_form_acesso">
                  <input className="login_input" id="login_acesso_email" type="text" name="usuario_email" placeholder="E-mail" required></input>
                  <input className="login_input" id="login_acesso_senha_1" type="password" name="usuario_senha_1" placeholder="Senha" required></input>
                </div>
                {/* Formulário: elementos do formulário 'REDEFINIR SENHA' */}
                <div id="login_form_redefinir_senha">

                  <input className="login_input" id="login_redefinir_senha_email" type="text" name="usuario_email" placeholder="E-mail" required></input>
                  <input className="login_input" id="login_redefinir_senha_reset_pergunta" type="text" name="usuario_reset_pergunta"
                    placeholder="Pergunta de segurança" required></input>
                  <input className="login_input" id="login_redefinir_senha_reset_resposta" type="text" name="usuario_reset_resposta" placeholder="Sua resposta*"
                    required></input>
                  <input className="login_input" id="login_redefinir_senha_senha_1" t type="password" name="usuario_senha_1" placeholder="Nova senha" required></input>
                  <input className="login_input" id="login_redefinir_senha_senha_2" type="password" name="usuario_senha_2" placeholder="Confirmar senha*"
                    required></input>

                </div>
                {/* Formulário: elementos do formulário 'CADASTRO' */}
                <div id="login_form_cadastre_se">

                  <input className="login_input" id="login_se_cadastrar_nome" type="text" name="usuario_nome" placeholder="Nome" required></input>
                  <input className="login_input" id="login_se_cadastrar_email" type="text" name="usuario_email" placeholder="E-mail" required></input>
                  <input className="login_input" id="login_se_cadastrar_senha_1" type="password" name="usuario_senha_1" placeholder="Senha" required></input>
                  <input className="login_input" id="login_se_cadastrar_senha_2" type="password" name="usuario_senha_2" placeholder="Confirmar senha*"
                    required></input>

                  <select className="login_se_cadastrar_genero" id="option_login_se_cadastrar_genero" type="text" name="genero" required>
                    <option className="login_se_cadastrar_genero" id="option_login_se_cadastrar_genero" type="text" value="">Genero</option>
                    <option className="login_se_cadastrar_genero" id="option_login_se_cadastrar_genero" type="text" value="Masculino">Masculino</option>
                    <option className="login_se_cadastrar_genero" id="option_login_se_cadastrar_genero" type="text" value="feminino">Feminino</option>
                    <option className="login_se_cadastrar_genero" id="option_login_se_cadastrar_genero" type="text" value="outros">Outros</option>
                  </select>

                  <input className="login_input" id="login_se_cadastrar_nascimento" type="date" min="1980-12-31" max="2030-12-31" name="usuario_nascimento" placeholder="Data de nascimento"
                    required></input>
                  <input className="login_input" id="login_se_cadastrar_peso" type="number" step="0.01" name="usuario_peso" placeholder="Seu peso" required></input>
                  <input className="login_input" id="login_se_cadastrar_altura" type="number" step="0.01" name="usuario_altura" placeholder="Sua altura" required></input>

                  <select className="login_input" type="text" id="option_login_se_cadastrar_tipo_sanguineo" name="tipo_sanguineo" required>
                    <option className="login_input" id="option_login_se_cadastrar_tipo_sanguineo" type="text" value="nao_sei">Não sei</option>
                    <option className="login_input" id="option_login_se_cadastrar_tipo_sanguineo" type="text" value="A+">A+</option>
                    <option className="login_input" id="option_login_se_cadastrar_tipo_sanguineo" type="text" value="B+">B+</option>
                    <option className="login_input" id="option_login_se_cadastrar_tipo_sanguineo" type="text" value="AB+">AB+</option>
                    <option className="login_input" id="option_login_se_cadastrar_tipo_sanguineo" type="text" value="O+">O+</option>
                    <option className="login_input" id="option_login_se_cadastrar_tipo_sanguineo" type="text" value="A-">A-</option>
                    <option className="login_input" id="option_login_se_cadastrar_tipo_sanguineo" type="text" value="AB-">B-</option>
                    <option className="login_input" id="option_login_se_cadastrar_tipo_sanguineo" type="text" value="O-">O-</option>
                  </select>

                  <select className="login_se_cadastrar_reset_pergunta" id="option_login_se_cadastrar_reset_pergunta" type="text" name="genero" required>
                    <option className="login_se_cadastrar_reset_pergunta" id="option_login_se_cadastrar_reset_pergunta" type="text" value="">Pergunta de segurança</option>
                    <option className="login_se_cadastrar_reset_pergunta" id="option_login_se_cadastrar_reset_pergunta" type="text" value="">Comida favorita?</option>
                    <option className="login_se_cadastrar_reset_pergunta" id="option_login_se_cadastrar_reset_pergunta" type="text" value="feminino">Cor favorita?</option>
                    <option className="login_se_cadastrar_reset_pergunta" id="option_login_se_cadastrar_reset_pergunta" type="text" value="outros">Filme favorito?</option>
                    <option className="login_se_cadastrar_reset_pergunta" id="option_login_se_cadastrar_reset_pergunta" type="text" value="outros">Prefere calor ou frio??</option>
                    <option className="login_se_cadastrar_reset_pergunta" id="option_login_se_cadastrar_reset_pergunta" type="text" value="outros">Nome do pai?</option>
                    <option className="login_se_cadastrar_reset_pergunta" id="option_login_se_cadastrar_reset_pergunta" type="text" value="outros">Música favorita?</option>
                  </select>

                  <input className="login_input" id="login_se_cadastrar_reset_resposta" type="text" name="usuario_reset_resposta" placeholder="Sua resposta*"
                    required></input>

                </div>
                {/*  Formulário: elemento botão 'ENTRAR' */}
                <input onClick={() => { const botao = funcoes.BotaoSumit("botao_submit"); if (botao == "botao_entrar") { botao_funcao("ENTRAR") } if (botao == "botao_alterar_senha") { botao_funcao("ALTERAR_SENHA") } if (botao == "botao_confirmar") { botao_funcao("CADASTRAR") } }} className="login_input" id="login_botao_submit"
                  type="submit" name="Entrar" value="Entrar"></input>

                {/* Formulário: elemento botão 'VOLTAR' */}
                <input onClick={() => { if (funcoes.BotaoSumit("botao_voltar") == "botao_voltar") { botao_funcao("botao_voltar") } }} className="login_input" id="login_botao_voltar"
                  type="submit" name="Voltar" value="Voltar"></input>

                {/* Formulário: elementos botões 'REDEFINIR SENHA' e 'CADASTRE-SE' */}
                <div className="login_links">
                  <input onClick={() => funcoes.BotaoSumit("botao_redefinir_a_senha")} className="login_input"
                    id="login_botao_redefinir_senha" type="submit" name="Redefinir_senha" value="Redefinir senha"></input>

                  <input onClick={() => { if (funcoes.BotaoSumit("botao_cadastre_se") == "botao_cadastre_se") { botao_funcao("botao_cadastre_se") } }} className="login_input"
                    id="login_botao_cadastre_se" type="submit" name="Cadastre_se" value="Cadastre-se"></input>
                </div>
              </form>
            </div>

            {/* ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ POR O CÓDIGO AQUI ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ */}
          </div>
        )}
      </div>

    </div>

  );
}


