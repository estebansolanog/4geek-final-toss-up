import React, { useEffect, useState, useContext } from "react";
import "../../styles/myAccount.css";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Footer } from "../component/footerRegister";
import Link from '@material-ui/core/Link';
import Navbar from "../component/navbar.jsx";
import {
    TextField,
    Button,
    Typography,
} from "@material-ui/core";
import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";

const MyAccount = () => {
    const { store, actions } = useContext(Context);
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [pfp, setPFP] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg");
    const navigate = useNavigate();
    useEffect(() => {
        console.log(name);
    }, [name]);
    useEffect(() => {
        console.log(lastName);
    }, [lastName]);
    useEffect(() => {
        console.log(email);
    }, [email]);
    // useEffect(() => {
    //     console.log(password);
    // }, [password]);
    useEffect(() => {
        console.log(pfp);
    }, [pfp]);

    //FUNCION Y RUTA PARA GUARDAR DATOS DEL USUARIO
    const handleSaveClick = (e) => {
        e.preventDefault();
        actions.userUpdate(name, lastName, email);

    };
    //FIN FUNCION Y RUTA PARA GUARDAR DATOS DEL USUARIO

    //FUNCION Y RUTA PARA BORRAR CUENTA
    const deleteAccount = (e) => {
        e.preventDefault();
        actions.deleteAccount();
        navigate("/login");
    }


    useEffect(() => {
        const cargaDatos = async () => {
            const { respuestaJson, response } = await actions.useFetch("/api/myaccount");

            console.log(response.ok)
            console.log(respuestaJson)
            if (response.ok) {
                setName(respuestaJson.name)
                console.log(respuestaJson.name)
                setLastName(respuestaJson.last_name)
                console.log(respuestaJson.last_name)
                // setPassword(respuestaJson.password)
                // console.log(respuestaJson.password)
                setEmail(respuestaJson.email)
                console.log(respuestaJson.email)
            }
        }
        cargaDatos()
    }, [])

    return (
        <div className="landing-page">
            <Navbar />
            <div className="background-img">

                <img src={"https://c0.wallpaperflare.com/preview/575/367/712/kitchen-design-modern-contemporary.jpg"} />


            </div>
            <div className="myAccount-container">
                <h1 className="d-flex justify-content-center">My Account</h1>
                <div className="myAccount-container d-flex justify-content-center">
                    <div className="profile-pic mx-3 d-flex flex-column">
                        <img src={pfp} alt="Profile Picture"></img>
                        <   br></br>
                        <input type="text" id="profile-pic-upload" onChange={(e) => setPFP(e.target.value)}></input>
                        <label htmlFor="profile-pic-upload" className="upload-btn" >↑ Edit Picture ↑</label>
                    </div>
                    <div className="info d-flex flex-column">
                        <div className="d-flex">
                            <TextField
                                label="Name"
                                type="name"
                                value={name || ""}
                                onChange={(e) => setName(e.target.value)}
                                margin="normal"
                                required
                                fullWidth
                                InputProps={{
                                    placeholder: name,
                                    style: { color: "black" },
                                }}
                            />
                        </div>
                        <div className="d-flex">
                            <TextField
                                label="Last Name"
                                type="name"
                                value={lastName || ""}
                                onChange={(e) => setLastName(e.target.value)}
                                margin="normal"
                                required
                                fullWidth
                                InputProps={{
                                    placeholder: lastName,
                                    style: { color: "black" },
                                }}
                            />                        </div>
                        <div className="d-flex">
                            <TextField
                                label="Last Name"
                                type="name"
                                value={lastName || ""}
                                onChange={(e) => setLastName(e.target.value)} // Aquí está la corrección
                                margin="normal"
                                required
                                fullWidth
                                InputProps={{
                                    placeholder: lastName,
                                    style: { color: "black" },
                                }}
                            />
                        </div>
                        <Button onClick={(e) => { handleSaveClick(e) }} id="edit-btn" >Guardar</Button>
                    </div>

                </div>
                <div className="change-password-container">
                    <Link href="/changePwd"><h2 style={{ color: "white", cursor: "pointer" }} className="change-password-text">Cambiar contraseña</h2></Link>
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
                <div className="delete-account">
                    <button className="btn btn-secondary" style={{ color: "secondary" }} onClick={(e) => { deleteAccount(e) }}>Borrar mi cuenta</button>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default MyAccount;