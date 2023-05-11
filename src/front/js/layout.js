import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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




// import Chatbot from "./component/chatbot.js";
//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div className="h-100">
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            {/* <Route element={<Chatbot />} path="/chathome" /> */}
            <Route element={<Demo />} path="/demo" />
            <Route element={<Receta />} path="/receta" />
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />

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
