import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import classNames from 'classnames';
import "../../styles/publicNavbar.css";
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
    <nav className="navbar public-navbar navbar-expand-md">
      <div className="container-fluid">
        <div className="flex-column flex-md-row logo-container">
          <Link to="/home" onClick={() => handleLinkClick('/home')}>
            <div className="navbar-brand col-1" href="#" style={{ height: "80px", width: "100px" }}>
              <img style={{ maxHeight: "100%", maxWidth: "100%" }} src={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159198/logoTossUp_backgroundless_v2_hgg3ta.png"} alt="" />
            </div>
          </Link>
        </div>
        <div className="menu-group-2">
          <div className="flex-column flex-md-row menu-link">
            <Link to="/login" onClick={() => handleLinkClick('/login')} className="navbar-link">
              <span className={classNames('navbar-brand mb-0 h1 text-white col-1', { 'active': activeLink === '/login' })}>Información</span>
            </Link>
            <Link to="/register" onClick={() => handleLinkClick('/register')} className="navbar-link">
              <span className={classNames('navbar-brand mb-0 h1 text-white col-1', { 'active': activeLink === '/register' })}>Nosotros</span>
            </Link>
            <Link to="/receta" onClick={() => handleLinkClick('/receta')} className="navbar-link">
              <span className={classNames('navbar-brand mb-0 h1 text-white col-1', { 'active': activeLink === '/receta' })}>Blog</span>
            </Link>
          </div>

          <div className="menu-botton" >
            <Link to="/login">
              <button className="btn btn-warning" type="submit">
                Iniciar Sesión
              </button>
            </Link>
            <Link to="/register">
              <button className="btn btn-secondary" type="submit"
                onClick={() => { }}
              >
                Regístrate
              </button>
            </Link>
          </div>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;

