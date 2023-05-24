import React, { useEffect, useState, useContext } from "react";
import "../../styles/myAccount.css";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Footer } from "../component/footerRegister";
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
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [pfp, setPFP] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg");

    useEffect(() => {
        console.log(name);
    }, [name]);
    useEffect(() => {
        console.log(lastName);
    }, [lastName]);
    useEffect(() => {
        console.log(email);
    }, [email]);
    useEffect(() => {
        console.log(password);
    }, [password]);
    useEffect(() => {
        console.log(pfp);
    }, [pfp]);

    //FUNCION Y RUTA PARA GUARDAR DATOS DEL USUARIO
    const handleSaveClick = (e) => {
        e.preventDefault();

        let body = new FormData();
        body.append('name', name);
        body.append('last_name', lastName);
        body.append('password', password);
        const options = {
            body,
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }
        };

        fetch(`http://localhost:3001/rrecipe/AddRecipe`, options)
            .then(resp => resp.json())
            .then(data => console.log("Success!!!!", data))
            .then(data => {
                console.log("Success!!!!", data);
                setRecipeName('');
                setRecipeDescription('');
                setRecipeImage(null);
                setFormKey(Math.random());  // Esto es para que se resetee el formulario
            })
            .catch(error => {
                console.error("ERRORRRRRR!!!", error)
                setRecipeName('');
                setRecipeDescription('');
                setRecipeImage(null)
                setFormKey(Math.random());  // Esto es para que se resetee el formulario
            });
    };
    //FIN FUNCION Y RUTA PARA GUARDAR DATOS DEL USUARIO


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
                setPassword(respuestaJson.password)
                console.log(respuestaJson.password)
                setEmail(respuestaJson.email)
                console.log(respuestaJson.email)
            }
        }
        cargaDatos()
    }, [])

    return (
        <div className="landing-page">
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
                        <label for="profile-pic-upload" className="upload-btn" >↑ Edit Picture ↑</label>
                    </div>
                    <div className="info d-flex flex-column">
                        <div className="d-flex">
                            <TextField
                                label="Name"
                                type="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                margin="normal"
                                required
                                fullWidth
                                InputProps={{
                                    placeholder: { name },
                                    style: { color: "black" },
                                }}
                            />
                        </div>
                        <div className="d-flex">
                            <TextField
                                label="Last Name"
                                type="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                margin="normal"
                                required
                                fullWidth
                                InputProps={{
                                    placeholder: { lastName },
                                    style: { color: "black" },
                                }}
                            />
                        </div>
                        <div className="d-flex">
                            <TextField
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                margin="normal"
                                required
                                fullWidth
                                InputProps={{
                                    placeholder: "Contraseña",
                                    style: { color: "black" },
                                }}
                            />
                        </div>
                        <Button onClick={handleSaveClick} id="edit-btn" >Edit</Button>
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
                <br />
                <Footer />
            </div>
        </div>
    );
};

export default MyAccount;