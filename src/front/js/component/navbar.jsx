import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import classNames from 'classnames';
import "../../styles/navbar.css";
import Logo from "../../img/logoTossUp_backgroundless_v3.png";

export const Navbar = () => {
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
    <nav className="navbar private-navbar navbar-expand-md">
      <div className="container-fluid">
        <div className="flex-column flex-md-row logo-container">
          <Link to="/home" onClick={() => handleLinkClick('/home')}>
            <div className="navbar-brand col-1" href="#" style={{ height: "60px", width: "100px" }}>
              <img style={{ maxHeight: "100%", maxWidth: "100%" }} src={Logo} alt="" />
            </div>
          </Link>
        </div>
        <div className="menu-group-1 flex-column flex-md-row">
          <Link to="/login" onClick={() => handleLinkClick('/login')} className="navbar-link">
            <span className={classNames('navbar-brand mb-0 h1 text-white col-1', { 'active': activeLink === '/login' })}>Inicio</span>
          </Link>
          <Link to="/register" onClick={() => handleLinkClick('/register')} className="navbar-link">
            <span className={classNames('navbar-brand mb-0 h1 text-white col-1', { 'active': activeLink === '/register' })}>Nuevo</span>
          </Link>
          <Link to="/receta" onClick={() => handleLinkClick('/receta')} className="navbar-link">
            <span className={classNames('navbar-brand mb-0 h1 text-white col-1', { 'active': activeLink === '/receta' })}>Crear</span>
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

        <div className="flex-column flex-md-row menu-group-2" >
          <Link to="/login" onClick={() => handleLinkClick('/login')}>
            <span className={classNames('navbar-brand mb-0 h1 text-white col-1', { 'active': activeLink === '/login' })}><i className="fa-regular fa-bell"></i></span>
          </Link>
          <Link to="/register" onClick={() => handleLinkClick('/register')} className="navbar-link">
            <span className={classNames('navbar-brand mb-0 h1 text-white col-1', { 'active': activeLink === '/register' })}>{infoUsuario}</span>
          </Link>
        </div>
        <div className="nav-item dropdown">
          <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Favoritos
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



        {store.userLogin ?
          <button onClick={(e) => { handleLogout() }}>Logout</button>

          : <></>}
      </div>
    </nav>
  );
};

export default Navbar;


// import React, { useState, useEffect, useContext } from "react";
// import { Context } from "../store/appContext";
// import { Link } from "react-router-dom";
// import "../../styles/navbar.css";
// import Logo from "../../img/logoTossUp_backgroundless_v3.png";

// export const Navbar = () => {

// 	const { store, actions } = useContext(Context)
// 	return (
// 		<nav className="navbar navbar-light private-navbar navbar-thick navbar-expand-md">
// 			<div className="container-fluid">
// 				<Link to="/home">
// 					<div className="navbar-brand col-1" href="#" style={{ height: "70px", width: "140px" }}>
// 						<img style={{ maxHeight: "100%", maxWidth: "100%" }} src={Logo} alt="" />
// 					</div>
// 				</Link>
// 				<div className="flex-column flex-md-row">
// 					<Link to="/login">
// 						<span className="navbar-brand mb-0 h1 text-white col-1">Inicio</span>
// 					</Link>
// 					<Link to="/register">
// 						<span className="navbar-brand mb-0 h1 text-white col-1">Últimas recetas</span>
// 					</Link>
// 					<Link to="/receta">
// 						<span className="navbar-brand mb-0 h1 text-white col-1">Crear</span>
// 					</Link>
// 				</div>
// 				<form className="col-4 d-flex">
// 					<input
// 						className="col form-control me-2"
// 						type="search"
// 						placeholder="Que quieres preparar hoy?"
// 						aria-label="Search"
// 					/>
// 					<button className="col btn btn-warning" type="submit">
// 						Buscar
// 					</button>
// 				</form>

// 				<div className="collapse navbar-collapse"></div>
// 				<div className="ms-auto flex-column flex-md-row">
// 					<Link to="/login">
// 						<span className="navbar-brand mb-0 h1 text-white col-1">Notificaciones</span>
// 					</Link>
// 					<Link to="/register">
// 						<span className="navbar-brand mb-0 h1 text-white col-1">Mi cuenta</span>
// 					</Link>
// 				</div>
// 				<button className="btn btn-secondary dropdown-toggle col-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
// 					Dropdown button
// 				</button>
// 				<ul className="dropdown-menu">
// 					<li><a className="dropdown-item" href="#">Action</a></li>
// 					<li><a className="dropdown-item" href="#">Another action</a></li>
// 					<li><a className="dropdown-item" href="#">Something else here</a></li>
// 				</ul>
// 			</div>
// 		</nav>

// 	);
// };

// export default Navbar;