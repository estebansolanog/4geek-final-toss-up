import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {

	const { store, actions } = useContext(Context)
	return (
		<nav className="navbar navbar-light bg-danger navbar-thick">
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
				<div className="ms-auto">
					<Link to="/login">
						<span className="navbar-brand mb-0 h1 text-white">Inicio</span>
					</Link>
					<Link to="/register">
						<span className="navbar-brand mb-0 h1 text-white">Registro</span>
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;