import { HashRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";

import Inicio from "./views/inicio/Inicio";
import Sobre from "./views/sobre/Sobre";
import Funcionalidades from "./views/funcionalidades/Funcionalidades";
import Comunicados from "./views/comunicados/Comunicados";

import Login from "./views/login/Login";

import Feed from "./views/feed/Feed";
import Lermais from "./views/lermais/LerMais";
import Edit from "./views/edit/Edit";
import Post from "./views/post/Post";

import Perfil from "./views/perfil/Perfil";


function App() {
  return (
    <Routes>

      <Route path="/" element={<Inicio />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/funcionalidades" element={<Funcionalidades />} />
      <Route path="/comunicados" element={<Comunicados />} />

      <Route path="/login" element={<Login />} />

      <Route exact path="/feed" element={<Feed />} />
      <Route path="/lermais/:id" element={<Lermais />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/post" element={<Post />} />

      <Route path="/perfil" element={<Perfil />} />

    </Routes>
  );
}

export function WrappedApp() {
  return (
    <HashRouter>

      <App />

      <Footer />

    </HashRouter>
  );
}
