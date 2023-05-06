import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
// import "../../styles/navbar.css";

export const Navbar = () => {

	const { store, actions } = useContext(Context)
	return (
		// <nav className="navbar navbar-light bg-danger navbar-thick navbar-expand-md">
		// 	<div className="container-fluid">
		// 		<Link to="/home">
		// 			<span className="navbar-brand" href="#">
		// 				TossUp
		// 			</span>
		// 		</Link>
		// 		<form className="mx-auto d-flex">
		// 			<input
		// 				className="form-control me-2"
		// 				type="search"
		// 				placeholder="Que receta vamos a hacer?"
		// 				aria-label="Search"
		// 			/>
		// 			<button className="btn btn-warning" type="submit">
		// 				Buscar
		// 			</button>
		// 		</form>

		// 		<div className="collapse navbar-collapse"></div>
		// 		<div className="ms-auto flex-column flex-md-row">
		// 			<Link to="/login">
		// 				<span className="navbar-brand mb-0 h1 text-white">Inicio</span>
		// 			</Link>
		// 			<Link to="/register">
		// 				<span className="navbar-brand mb-0 h1 text-white">Registro</span>
		// 			</Link>
		// 			<Link to="/receta">
		// 				<span className="navbar-brand mb-0 h1 text-white">recetas</span>
		// 			</Link>
		// 		</div>
		/* <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
			Dropdown button
		</button>
		<ul class="dropdown-menu">
			<li><a class="dropdown-item" href="#">Action</a></li>
			<li><a class="dropdown-item" href="#">Another action</a></li>
			<li><a class="dropdown-item" href="#">Something else here</a></li>
		</ul> */
		// 	</div>
		// </nav>

		<nav class="navbar navbar-dark bg-dark navbar-expand-lg bg-body-tertiary">
			<div class="container-fluid">
				<a class="navbar-brand" href="#">Navbar</a>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNavDropdown">
					<ul class="navbar-nav">
						<li class="nav-item">
							<a class="nav-link active" aria-current="page" href="#">Home</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Features</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Pricing</a>
						</li>
						<li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								Dropdown link
							</a>
							<ul class="dropdown-menu">
								<li><a class="dropdown-item" href="#">Action</a></li>
								<li><a class="dropdown-item" href="#">Another action</a></li>
								<li><a class="dropdown-item" href="#">Something else here</a></li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>

	);
};

export default Navbar;