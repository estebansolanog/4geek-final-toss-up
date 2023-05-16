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
          <Link to="/public" onClick={() => handleLinkClick('/public')}>
            <div className="navbar-brand col-1" href="#" style={{ height: "80px", width: "100px" }}>
              <img style={{ maxHeight: "100%", maxWidth: "100%" }} src={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159198/logoTossUp_backgroundless_v2_hgg3ta.png"} alt="" />
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
          <div className="nav-item dropdown">
            <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <button>Favoritos</button>

            </div>
            <ul className="dropdown-menu list-unstyled" aria-labelledby="navbarDropdown">
              {store.favoritos && store.favoritos.length > 0 ? <>
                {store.favoritos.map((item, index) => {
                  return <li key={index}>
                    <Link to={item.link}>{item.name}</Link>
                    <button onClick={() => actions.removerFavorito(item.name)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                      </svg>
                    </button>
                  </li>
                })}
              </> : <></>}

            </ul>


          </div>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbarForPublicHome;

