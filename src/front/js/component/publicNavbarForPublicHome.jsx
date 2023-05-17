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
    // <nav className="navbar public-navbar navbar-expand-md">
    //   <div className="container-fluid">
    //     <div className="flex-column flex-md-row logo-container">
    //       <Link to="/public" onClick={() => handleLinkClick('/public')}>
    //         <div className="navbar-brand col-1" href="#" style={{ height: "80px", width: "100px" }}>
    //           <img style={{ maxHeight: "100%", maxWidth: "100%" }} src={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159198/logoTossUp_backgroundless_v2_hgg3ta.png"} alt="" />
    //         </div>
    //       </Link>
    //     </div>
    //     <form className="private-form">
    //       <input
    //         className="form-control me-2"
    //         type="search"
    //         placeholder="Que quieres preparar hoy?"
    //         aria-label="Search"
    //       />
    //       <button className="btn btn-warning" type="submit">
    //         Buscar
    //       </button>
    //     </form>
    //     <div className="menu-group">

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

    //       </div>
    //       <div className="nav-item dropdown">
    //         <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    //           <button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-egg-fried" viewBox="0 0 16 16">
    //             <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    //             <path d="M13.997 5.17a5 5 0 0 0-8.101-4.09A5 5 0 0 0 1.28 9.342a5 5 0 0 0 8.336 5.109 3.5 3.5 0 0 0 5.201-4.065 3.001 3.001 0 0 0-.822-5.216zm-1-.034a1 1 0 0 0 .668.977 2.001 2.001 0 0 1 .547 3.478 1 1 0 0 0-.341 1.113 2.5 2.5 0 0 1-3.715 2.905 1 1 0 0 0-1.262.152 4 4 0 0 1-6.67-4.087 1 1 0 0 0-.2-1 4 4 0 0 1 3.693-6.61 1 1 0 0 0 .8-.2 4 4 0 0 1 6.48 3.273z" />
    //           </svg>
    //           </button>

    //         </div>
    //         <ul className="dropdown-menu list-unstyled black" aria-labelledby="navbarDropdown">
    //           {store.favoritos && store.favoritos.length > 0 ? <>
    //             {store.favoritos.map((item, index) => {
    //               return <li key={index}>
    //                 <Link to={item.link}>{item.name}</Link>
    //                 <button onClick={() => actions.removerFavorito(item.name)}>
    //                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
    //                     <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
    //                   </svg>
    //                 </button>
    //               </li>
    //             })}
    //           </> : <></>}

    //         </ul>


    //       </div>
    //     </div>
    //   </div>
    // </nav>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>

                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled">Disabled</a>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbarForPublicHome;

