import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
// import "../../styles/navbar.css";

export const Navbar = () => {

	const { store, actions } = useContext(Context)
	return (
		<nav className="navbar navbar-light bg-danger navbar-thick navbar-expand-md">
			<div className="container-fluid">
				<Link to="/home">
					<span className="navbar-brand" href="#">
						TossUp
					</span>
				</Link>
				<form className="mx-auto d-flex">
					<input
						className="form-control me-2"
						type="search"
						placeholder="Que receta vamos a hacer?"
						aria-label="Search"
					/>
					<button className="btn btn-warning" type="submit">
						Buscar
					</button>
				</form>

				<div className="collapse navbar-collapse"></div>

				<div className="ms-auto flex-column flex-md-row">
					<Link to="/login">
						<span className="navbar-brand mb-0 h1 text-white">Inicio</span>
					</Link>
					<Link to="/register">
						<span className="navbar-brand mb-0 h1 text-white">Registro</span>
					</Link>


					<button class="btn btn-warning dropdown-toggle " type="button" data-bs-toggle="dropdown" aria-expanded="false">
						<span className="p-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-egg-fried" viewBox="0 0 16 16">
							<path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
							<path d="M13.997 5.17a5 5 0 0 0-8.101-4.09A5 5 0 0 0 1.28 9.342a5 5 0 0 0 8.336 5.109 3.5 3.5 0 0 0 5.201-4.065 3.001 3.001 0 0 0-.822-5.216zm-1-.034a1 1 0 0 0 .668.977 2.001 2.001 0 0 1 .547 3.478 1 1 0 0 0-.341 1.113 2.5 2.5 0 0 1-3.715 2.905 1 1 0 0 0-1.262.152 4 4 0 0 1-6.67-4.087 1 1 0 0 0-.2-1 4 4 0 0 1 3.693-6.61 1 1 0 0 0 .8-.2 4 4 0 0 1 6.48 3.273z" />
						</svg></span>
					</button>
					<ul class="dropdown-menu">
						<li><a class="dropdown-item" href="#"></a></li>
						<li><a class="dropdown-item" href="#"></a></li>
						<li><a class="dropdown-item" href="#"></a></li>
					</ul>
				</div>


			</div>
		</nav>

	);
};

export default Navbar;