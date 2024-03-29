import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./store/appContext";
import { useLocation } from "react-router-dom";

//Componetes
import ScrollToTop from "./component/scrollToTop";
import Home from "./pages/home.jsx";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Navbar from "./component/navbar.jsx";
import { Footer } from "./component/footer";
import Receta from "./component/singleCardRecetas.jsx";
import PublicNavbar from "./component/publicNavbar.jsx";
import PublicNavbarForPublicHome from "./component/publicNavbarForPublicHome.jsx";
import LandingPage from "./pages/landing.jsx";
import PublicHome from "./pages/publicHome.jsx";
import Chatbot from "./component/chatbot.jsx";
import AddManualRecipe from "./component/AddManualRecipe.jsx";
// Crear un nuevo componente para la selección del Navbar
const NavbarSelector = () => {
  const { store, actions } = useContext(Context);
  const location = useLocation();

  if (location.pathname === '/public') {
    return <PublicNavbarForPublicHome />;
  } else if (store.userLogin) {
    return <Navbar />;
  } else {
    return <PublicNavbar />;
  }
};

//create your first component
const Layout = () => {
  const { store, actions } = useContext(Context);
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div className="h-100">
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <NavbarSelector />

          {/* {store.userLogin ? <Navbar /> : <PublicNavbar />} */}

          {/* <Navbar /> */}
          <Routes>
            <Route element={<Chatbot />} path="/chatbot" />
            <Route element={<Demo />} path="/demo" />
            <Route element={<Receta />} path="/receta" />
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
            <Route element={<PublicHome />} path="/public" />
            <Route element={<AddManualRecipe />} path="/addRecipe" />
            <Route path="/" element={<>{store.userLogin ? <Home /> : <LandingPage />}</>}
            />
            {/* <Route element={<CardCarousel />} path="/cardCarousel" /> */}
            <Route element={<Single />} path="/single/:theid" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
