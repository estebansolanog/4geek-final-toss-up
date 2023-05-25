import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useParams, useNavigate, Navigate, Link } from 'react-router-dom';
import { Footer } from "../component/footerLogin";
import Navbar from "../component/navbar.jsx";

const ChangePasswordPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const { store, actions } = useContext(Context);
    const { token } = useParams();
    const navigate = useNavigate();

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }
        let { respuestaJson, response } = await actions.recover(password, token); // call login action

        if (response.ok) {
            alert("Contraseña cambiada con éxito.")
            navigate("/login")
        }
    };

    return (
        <div className="password-container-container">
            <Navbar />

            <div className="recover-password-container">
                <div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="video-container">
                        <video autoPlay muted loop>
                            <source src={"https://res.cloudinary.com/doqx408xv/video/upload/v1684159209/comida_chxnqx.mp4"} type="video/mp4" />
                            Tu navegador no soporta la reproducción de video.
                        </video>
                    </div>
                    <div className="recover-password-content">
                        <h1 className="recover-password-title">Cambiar contraseña</h1>
                        <div>
                            <label htmlFor="password">Contraseña:</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="recover-password-input"
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirmar contraseña:</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="recover-password-input"
                            />
                        </div>
                        <button
                            onClick={handleChangePassword}
                            className="recover-password-button"
                        >
                            Restablecer contraseña
                        </button>
                        {message && <p>{message}</p>}
                        <div>
                            <Link to="/login" className="recover-password-link">
                                Iniciar sesión
                            </Link>
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordPage;

