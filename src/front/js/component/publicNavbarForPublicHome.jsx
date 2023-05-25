import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import classNames from 'classnames';
import "../../styles/publicNavbarForPublicHome.css";
import Logo from "../../img/logoTossUp_backgroundless_v2.png";
import { useNavigate } from "react-router-dom";

export const PublicNavbarForPublicHome = () => {
  const { store, actions } = useContext(Context);
  const [activeLink, setActiveLink] = useState('/home');
  const [infoUsuario, setInfoUsuario] = useState(null)

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  const navigate = useNavigate();

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

  const handleLogout = () => {
    actions.logout()
    navigate("/")

  }


  return (

    <>
      <nav className="navbar private-navbar navbar-expand-md d-none d-xs-block d-sm-block d-md-block">
        <div className="container-fluid">
          <div className="flex-column flex-md-row logo-container">
            <Link to="/landingPage" onClick={() => handleLinkClick('/landingPage')}>
              <div className="navbar-brand col-1" href="#" style={{ padding: "", height: "50px", width: "100px" }}>
                <img style={{ maxHeight: "100%", maxWidth: "100%" }} src={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159198/logoTossUp_backgroundless_v3_mlv32j.png"} alt="" />
              </div>
            </Link>
          </div>
          <div className="menu-group-1 flex-column flex-md-row">
            <Link to="/public" onClick={() => handleLinkClick('/login')} className="navbar-link">
              <span className={classNames('navbar-brand mb-0 h1 text-white col-1', { 'active': activeLink === '/public' })}>Inicio</span>
            </Link>
            <Link to="/chatbot" onClick={() => handleLinkClick('/receta')} className="navbar-link">
              <span className={classNames('navbar-brand mb-0 h1 text-white col-1', { 'active': activeLink === '/chatbot' })}>Crear</span>
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

          {/* <div className="flex-column flex-md-row menu-group-2" >
              <Link to="" onClick={() => handleLinkClick('')}>

              </Link>
              <Link to="/register" onClick={() => handleLinkClick('/register')} className="navbar-link">
                <span className={classNames('navbar-brand mb-0 h1 text-warning col-1', { 'active': activeLink === '/register' })}>TossUp, Registrate y crea tus recetas <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                </svg></span>
              </Link>
            </div> */}

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


      <nav className="navbar navbar-expand-lg bg-body-tertiary bg bg-black d-xs-none d-sm-none d-md-none">
        <div className="container-fluid">
          <div className="flex-column flex-md-row logo-container">
            <Link to="/public" onClick={() => handleLinkClick('/public')}>
              <div className="navbar-brand col-1" href="#" style={{ height: "60px", width: "100px" }}>
                <img style={{ maxHeight: "100%", maxWidth: "100%" }} src={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159198/logoTossUp_backgroundless_v3_mlv32j.png"} alt="" />
              </div>
            </Link>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon "></span>
          </button>
          <form className="d-flex" role="search">
            <input className="form-control1 me-2" type="search" placeholder="Que quieres preparar hoy?" aria-label="Search" />
            <button className="btn btn-outline-warning" type="submit">Buscar</button>
          </form>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/public" onClick={() => handleLinkClick('/public')}>
                  <span className={classNames('navbar-brand mb-0 h1 text-warning col-1 ', { 'active': activeLink === '/public' })}>
                    INICIO
                  </span>
                </Link>

              </li>
              <li className="nav-item">
                <Link to="/chatbot" onClick={() => handleLinkClick('/chatbot')}>
                  <span className={classNames('navbar-brand mb-0 h1 text-warning col-1 ', { 'active': activeLink === '/chatbot' })}>
                    CREA
                  </span>
                </Link>
              </li>
              <li className="nav-item">
              </li>
              <div className="flex-column flex-md-row " >
                <Link to="" onClick={() => handleLinkClick('')}>

                </Link>
                <Link to="/register" onClick={() => handleLinkClick('/register')} className="navbar-link">
                  <span className={classNames('navbar-brand mb-0 h1 text-warning col-1', { 'active': activeLink === '/register' })}>TossUp,Registrate<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                  </svg></span>
                </Link>
              </div>


            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default PublicNavbarForPublicHome;

