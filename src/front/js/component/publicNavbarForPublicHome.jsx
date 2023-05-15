import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import classNames from 'classnames';
import "../../styles/publicNavbarForPublicHome.css";
import Logo from "../../img/logoTossUp_backgroundless_v2.png";

export const PublicNavbarForPublicHome = () => {
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
              <img style={{ maxHeight: "100%", maxWidth: "100%" }} src={Logo} alt="" />
            </div>
          </Link>
        </div>
        <form className="private-form">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Que quieres preparar hoy?"
            aria-label="Search"
          />
          <button className="btn btn-warning" type="submit">
            Buscar
          </button>
        </form>
        <div className="menu-group">

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

export default PublicNavbarForPublicHome;

