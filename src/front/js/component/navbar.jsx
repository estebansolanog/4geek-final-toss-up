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
    <>
      {store.userLogin ?
        <>
          <nav className="navbar private-navbar navbar-expand-md d-none d-xs-block d-sm-block d-md-block">
            <div className="container-fluid">
              <div className="flex-column flex-md-row logo-container">
                <Link to="/public" onClick={() => handleLinkClick('/public')}>
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
              <div className="nav-item dropdown">
                <div className="nav-link dropdown-toggle text-warning" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-egg-fried" viewBox="0 0 16 16">
                    <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    <path d="M13.997 5.17a5 5 0 0 0-8.101-4.09A5 5 0 0 0 1.28 9.342a5 5 0 0 0 8.336 5.109 3.5 3.5 0 0 0 5.201-4.065 3.001 3.001 0 0 0-.822-5.216zm-1-.034a1 1 0 0 0 .668.977 2.001 2.001 0 0 1 .547 3.478 1 1 0 0 0-.341 1.113 2.5 2.5 0 0 1-3.715 2.905 1 1 0 0 0-1.262.152 4 4 0 0 1-6.67-4.087 1 1 0 0 0-.2-1 4 4 0 0 1 3.693-6.61 1 1 0 0 0 .8-.2 4 4 0 0 1 6.48 3.273z" />
                  </svg>
                </div>
                <ul className="dropdown-menu list-unstyled" aria-labelledby="navbarDropdown">
                  {store.favoritos && store.favoritos.length > 0 ? <>
                    {store.favoritos.map((item, index) => {
                      return <li key={index}>
                        <Link to={item.link}>{item.name}</Link>
                        <button onClick={() => actions.removerFavorito(item.name)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                          </svg>
                        </button>
                      </li>
                    })}
                  </> : <></>}

                </ul>


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




              <button className="btn btn-danger" onClick={(e) => { handleLogout() }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
              </svg></button>


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
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle navbar-brand mb-0 h1 text-warning col-1" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" color="yellow">
                      FAVORITOS
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-egg-fried" viewBox="0 0 16 16">
                        <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        <path d="M13.997 5.17a5 5 0 0 0-8.101-4.09A5 5 0 0 0 1.28 9.342a5 5 0 0 0 8.336 5.109 3.5 3.5 0 0 0 5.201-4.065 3.001 3.001 0 0 0-.822-5.216zm-1-.034a1 1 0 0 0 .668.977 2.001 2.001 0 0 1 .547 3.478 1 1 0 0 0-.341 1.113 2.5 2.5 0 0 1-3.715 2.905 1 1 0 0 0-1.262.152 4 4 0 0 1-6.67-4.087 1 1 0 0 0-.2-1 4 4 0 0 1 3.693-6.61 1 1 0 0 0 .8-.2 4 4 0 0 1 6.48 3.273z" />
                      </svg>
                    </a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#">Action</a></li>
                      <li><a className="dropdown-item" href="#">Another action</a></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                  </li>
                  <div className="flex-column flex-md-row " >
                    <Link to="/login" onClick={() => handleLinkClick('/login')}>
                      <span className={classNames('navbar-brand mb-0 h1 text-warning col-1', { 'active': activeLink === '/login' })}><i className="fa-regular fa-bell"></i></span>
                    </Link>
                    <Link to="/register" onClick={() => handleLinkClick('/register')} className="navbar-link">
                      <span className={classNames('navbar-brand mb-0 h1 text-white col-1', { 'active': activeLink === '/register' })}>{infoUsuario}</span>
                    </Link>
                  </div>


                  <li className="nav-item dropdown">

                    <button className="btn btn-danger" onClick={(e) => { handleLogout() }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right " viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                      <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                    </svg></button>


                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </>



        : <></>}


    </>

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