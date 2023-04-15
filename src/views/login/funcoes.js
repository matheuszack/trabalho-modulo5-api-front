export const funcoes = {

  PegarPeloId: (ele_pegar) => {

    if (ele_pegar.match(/option/)) {

      var e = document.getElementById(ele_pegar);
      var value = e.options[e.selectedIndex].value;
      var text = e.options[e.selectedIndex].text;
      return text;
    }
    return document.getElementById(ele_pegar).value;
  },

  PegarPelaClass: (ele_pegar) => {
    return document.getElementsByClassName(ele_pegar)[0].value;
  },

  ImputarPeloId: (ele_imputar, valor) => {
    const elemento = document.getElementById(ele_imputar);
    elemento.value = valor;
  },

  ImputarPelaClass: async (ele_imputar, valor) => {
    document.getElementsByClassName(ele_imputar)[0].value = valor;
  },

  /* ################################################################################## */

  DefinirVariavelLocal: (nome_var, valor) => {
    window.localStorage.setItem(nome_var, valor)
  },

  PegarVariavelLocal: (nome_var) => {
    return window.localStorage.getItem(nome_var)
  },

  /* ################################################################################## */

  BotaoSumit: (inf) => {

    if ((inf == "botao_submit")) {
      const botao = document.getElementById("login_botao_submit").value;
      if (botao == "Entrar") {
        return "botao_entrar";
      };
      if (botao == "Alterar senha") {
        return "botao_alterar_senha";
      }
      if (botao == "Confirmar") {
        return "botao_confirmar";
      }

    };

    if ((inf == "botao_redefinir_a_senha")) {
      // Alterar texto
      document.getElementById("login_titulo").innerHTML = "Recuperar acesso";
      document.getElementById("login_botao_submit").value = "Alterar senha";
      // Ocultar
      document.getElementById("login_form_acesso").style.display = "none";
      document.getElementById("login_form_cadastre_se").style.display = "none";
      document.getElementById("login_botao_redefinir_senha").style.display = "none";
      document.getElementById("login_botao_cadastre_se").style.display = "none";
      // Mostrar
      document.getElementById("login_form_redefinir_senha").style.display = "block";
      document.getElementById("login_botao_voltar").style.display = "block";
      return "botao_redefinir_a_senha";
    }
    if ((inf == "botao_cadastre_se")) {
      // Alterar texto
      document.getElementById("login_titulo").innerHTML = "Cadastro";
      document.getElementById("login_botao_submit").value = "Confirmar";
      // Ocultar
      document.getElementById("login_form_acesso").style.display = "none";
      document.getElementById("login_form_redefinir_senha").style.display = "none";
      document.getElementById("login_botao_redefinir_senha").style.display = "none";
      document.getElementById("login_botao_cadastre_se").style.display = "none";
      // Mostrar
      document.getElementById("login_form_cadastre_se").style.display = "block";
      document.getElementById("login_botao_voltar").style.display = "block";
      return "botao_cadastre_se";
    }
    if ((inf == "botao_voltar")) {
      // Alterar texto
      document.getElementById("login_titulo").innerHTML = "Acesso";
      document.getElementById("login_botao_submit").value = "Entrar";
      // Ocultar
      document.getElementById("login_form_redefinir_senha").style.display = "none";
      document.getElementById("login_form_cadastre_se").style.display = "none";
      document.getElementById("login_botao_voltar").style.display = "none";
      // Mostrar
      document.getElementById("login_form_acesso").style.display = "block";
      document.getElementById("login_botao_redefinir_senha").style.display = "block";
      document.getElementById("login_botao_cadastre_se").style.display = "block";
      return "botao_voltar";
    }
  },

  BotaoRedefinirSenha: () => {
    // Alterar texto
    document.getElementById("login_titulo").innerHTML = "Recuperar acesso";
    document.getElementById("login_botao_submit").value = "Alterar senha";
    // Ocultar
    document.getElementById("login_form_acesso").style.display = "none";
    document.getElementById("login_form_cadastre_se").style.display = "none";
    document.getElementById("login_botao_redefinir_senha").style.display = "none";
    document.getElementById("login_botao_cadastre_se").style.display = "none";
    // Mostrar
    document.getElementById("login_form_redefinir_senha").style.display = "block";
    document.getElementById("login_botao_voltar").style.display = "block";
  }

}



