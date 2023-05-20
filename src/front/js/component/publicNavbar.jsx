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
    // <nav className="navbar navbar-expand-lg bg-body-tertiary">
    //   <div className="container-fluid">
    //     <div className="flex-column flex-md-row logo-container">
    //       <Link to="/public" onClick={() => handleLinkClick('/public')}>
    //         <div className="navbar-brand col-1" href="#" style={{ height: "80px", width: "100px" }}>
    //           <img style={{ maxHeight: "100%", maxWidth: "100%" }} src={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159198/logoTossUp_backgroundless_v2_hgg3ta.png"} alt="" />
    //         </div>
    //       </Link>
    //     </div>
    //     <div className="menu-group-2 ">
    //       <div className="flex-column flex-md-row menu-link">
    //         <Link to="/login" onClick={() => handleLinkClick('/login')} className="navbar-link">
    //           <span className={classNames('navbar-brand mb-0 h1 text-white col-1', { 'active': activeLink === '/login' })}>Información</span>
    //         </Link>
    //         <Link to="/register" onClick={() => handleLinkClick('/register')} className="navbar-link">
    //           <span className={classNames('navbar-brand mb-0 h1 text-white col-1', { 'active': activeLink === '/register' })}>Nosotros</span>
    //         </Link>
    //         <Link to="/receta" onClick={() => handleLinkClick('/receta')} className="navbar-link">
    //           <span className={classNames('navbar-brand mb-0 h1 text-white col-1', { 'active': activeLink === '/receta' })}>Blog</span>
    //         </Link>
    //       </div>

    //       <div className="menu-botton" >
    //         <Link to="/login">
    //           <button className="btn btn-warning" type="submit">
    //             Iniciar Sesión
    //           </button>
    //         </Link>
    //         <Link to="/register">
    //           <button className="btn btn-secondary" type="submit"
    //             onClick={() => { }}
    //           >
    //             Regístrate
    //           </button>
    //         </Link>

    //         <div className="nav-item dropdown btn-favorito">
    //           <div className="nav-link dropdown-toggle " id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    //             <button className="btn btn-warning"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-egg-fried" viewBox="0 0 16 16">
    //               <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    //               <path d="M13.997 5.17a5 5 0 0 0-8.101-4.09A5 5 0 0 0 1.28 9.342a5 5 0 0 0 8.336 5.109 3.5 3.5 0 0 0 5.201-4.065 3.001 3.001 0 0 0-.822-5.216zm-1-.034a1 1 0 0 0 .668.977 2.001 2.001 0 0 1 .547 3.478 1 1 0 0 0-.341 1.113 2.5 2.5 0 0 1-3.715 2.905 1 1 0 0 0-1.262.152 4 4 0 0 1-6.67-4.087 1 1 0 0 0-.2-1 4 4 0 0 1 3.693-6.61 1 1 0 0 0 .8-.2 4 4 0 0 1 6.48 3.273z" />
    //             </svg>
    //             </button>

    //           </div>
    //           <ul className="dropdown-menu list-unstyled " aria-labelledby="navbarDropdown">
    //             {store.favoritos && store.favoritos.length > 0 ? <>
    //               {store.favoritos.map((item, index) => {
    //                 return <li key={index}>
    //                   <Link to={item.link}>{item.name}</Link>
    //                   <button onClick={() => actions.removerFavorito(item.name)}>
    //                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
    //                       <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
    //                     </svg>
    //                   </button>
    //                 </li>
    //               })}
    //             </> : <></>}

    //           </ul>


    //         </div>
    //       </div>

    //     </div>
    //   </div>


    // </nav>

    <nav className="navbar navbar-expand-lg bg-body-tertiary bg bg-black  d-xs-block d-sm-block d-md-block d-xs-block d-sm-block d-md-block">
      <div className="container-fluid">
        <div className="flex-column flex-md-row logo-container">
          <Link to="/public" onClick={() => handleLinkClick('/public')}>
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

