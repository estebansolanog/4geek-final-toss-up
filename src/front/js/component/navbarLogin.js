import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbarLogin.css";

export const NavbarLogin = () => {
  return (
    <div className="container-visitor">
      <nav className="navbar navbar-light bg-light">
        <Link to="/landing">
          <span className="navbar-brand mb-0 h1">Inicio</span>
        </Link>
        <Link to="/landing">
          <span className="navbar-brand mb-0 h1">Sobre Nosotros</span>
        </Link>
        <Link to="/landing">
          <span className="navbar-brand mb-0 h1">Servicios</span>
        </Link>
        <Link to="/landing">
          <span className="navbar-brand mb-0 h1">Contacto</span>
        </Link>
        <Link to="/landing">
          <span className="navbar-brand mb-0 h1">Blog</span>
        </Link>
      </nav>
    </div>
  );
};
