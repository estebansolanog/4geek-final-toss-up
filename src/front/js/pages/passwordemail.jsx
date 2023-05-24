import React, { useState, useContext, } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/passwordemail.css";
import { Footer } from "../component/footerLogin";

const RecoverPassword = () => {
    const [email, setEmail] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { store, actions } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Lógica para enviar el formulario y manejar la respuesta
        let { respuestaJson, response } = await actions.linkrecoverpassword(email);
        if (response.ok) {
            alert("Se te ha enviado un correo");
            console.log(respuestaJson);
        }
    };

    return (
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
                    <h3 className="recover-password-title">Recuperar contraseña</h3>
                    <form onSubmit={handleSubmit} className="recover-password-form">
                        <input
                            type="text"
                            placeholder="Ingrese su email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="recover-password-input"
                        />
                        <button className="recover-password-button">
                            Enviar enlace de inicio de sesión
                        </button>
                    </form>
                    {successMessage && <p>{successMessage}</p>}
                    {errorMessage && <p>{errorMessage}</p>}
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
    );
};

export default RecoverPassword;