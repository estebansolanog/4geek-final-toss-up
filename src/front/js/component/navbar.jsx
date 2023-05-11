import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {

	const { store, actions } = useContext(Context)
	return (
		<nav className="navbar navbar-light bg-danger navbar-thick navbar-expand-md">
			<div className="container-fluid">
				<Link to="/home">
					<span className="navbar-brand col-1" href="#">
						TossUp
					</span>
				</Link>
				<form className="col-4 d-flex">
					<input
						className="col form-control me-2"
						type="search"
						placeholder="Que receta vamos a hacer?"
						aria-label="Search"
					/>
					<button className="col btn btn-warning" type="submit">
						Buscar
					</button>
				</form>

				<div className="collapse navbar-collapse"></div>
				<div className="ms-auto flex-column flex-md-row">
					<Link to="/login">
						<span className="navbar-brand mb-0 h1 text-white col-1">Inicio</span>
					</Link>
					<Link to="/register">
						<span className="navbar-brand mb-0 h1 text-white col-1">Registro</span>
					</Link>
					<Link to="/receta">
						<span className="navbar-brand mb-0 h1 text-white col-1">recetas</span>
					</Link>
				</div>
				<button className="btn btn-secondary dropdown-toggle col-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
					Dropdown button
				</button>
				<ul className="dropdown-menu">
					<li><a className="dropdown-item" href="#">Action</a></li>
					<li><a className="dropdown-item" href="#">Another action</a></li>
					<li><a className="dropdown-item" href="#">Something else here</a></li>
				</ul>
			</div>
		</nav>

	);
};

export default Navbar;