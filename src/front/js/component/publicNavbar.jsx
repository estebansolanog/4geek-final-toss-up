import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import classNames from 'classnames';
import "../../styles/publicNavbar.css";
import "../../styles/public.css"
import Logo from "../../img/logoTossUp_backgroundless_v2.png";

export const PublicNavbar = () => {
  const { store, actions } = useContext(Context);
  const [activeLink, setActiveLink] = useState('/home');
  const [infoUsuario, setInfoUsuario] = useState(null)

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  useEffect(() => {
    const cargaDatos = async () => {
      // let { respuestaJson, response } = await actions.useFetch("/api/protected")
      const { respuestaJson, response } = await actions.useFetch("/api/myaccount");

      console.log(response.ok)
      console.log(respuestaJson)
      if (response.ok) {
        setInfoUsuario(respuestaJson.name)
        console.log(respuestaJson.name)
      }
    }
    cargaDatos()
  }, [])

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg bg-black  d-xs-block d-sm-block d-md-block d-xs-block d-sm-block d-md-block">
      <div className="container-fluid">
        <div className="flex-column flex-md-row logo-container">
          <Link to="/landingPage" onClick={() => handleLinkClick('/landingPage')}>
            <div className="navbar-brand col-1" href="#" style={{ height: "80px", width: "100px" }}>
              <img style={{ maxHeight: "100%", maxWidth: "100%" }} src={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159198/logoTossUp_backgroundless_v2_hgg3ta.png"} alt="" />
            </div>
          </Link>
        </div>
        <button className="navbar-toggler btn btn-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="menu-group-2 navbar-nav me-auto mb-2 mb-lg-0">
          </ul>
          <Link to="/login" onClick={() => handleLinkClick('/login')} className="navbar-link">
            <span className={classNames('navbar-brand mb-0 h1 text-warning col-1 ', { 'active': activeLink === '/login' })}>
              Iniciar Sesión
            </span>
          </Link>
          <Link to="/register" onClick={() => handleLinkClick('/register')} className="navbar-link">
            <span className={classNames('navbar-brand mb-0 h1 text-primary col-1 ', { 'active': activeLink === '/register' })}> Regístrate</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;

