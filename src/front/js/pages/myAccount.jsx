import React, { useEffect, useState, useContext } from "react";
import "../../styles/myAccount.css";
import { Context } from "../store/appContext";

const MyAccount = () => {
    const { store, actions } = useContext(Context);
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
        <div className="myAccount-container">
            <h1 className="d-flex justify-content-center">My Account</h1>
            <div className="myAccount-container d-flex justify-content-center">
                <div className="profile-pic mx-3 d-flex flex-column">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg" alt="Profile Picture"></img>
                    <   br></br>
                    <input type="file" id="profile-pic-upload" accept="image/*"></input>
                    <label for="profile-pic-upload" class="upload-btn">Upload Picture</label>
                    <input type="submit" value="Edit"></input>
                </div>
                <div className="info d-flex flex-column">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" value="Name" disabled></input>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" value="Email" disabled></input>
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" value="Password" disabled></input>
                </div>
            </div>

        </div>
    );
};

export default MyAccount;