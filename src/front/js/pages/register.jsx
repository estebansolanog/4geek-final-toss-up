import React, { useContext } from "react";
import "../../styles/login.css";
import { Footer } from "../component/footerRegister";



// import { NavbarVisitor } from "../component/navbarVisitor";
import { useNavigate, useState } from "react";
// import CutFruitAndVegetables from "../../img/CutFruitAndVegetables.mp4";


import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    makeStyles,
} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(2),
    },
    lockIcon: {
        margin: theme.spacing(1),
    },
    submitButton: {
        marginTop: theme.spacing(2),
    },
}));

export const Login = () => {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email:", email, "Password:", password, "Username:");
        // Lógica de inicio de sesión
    };

    return (
        <div className="landing-page">


            <div className="video-container ">

                <img className="ho" src="https://cdn.shopify.com/s/files/1/0899/2262/articles/Restaurantes_Comida_Internacional.JPG?v=1555022012"></img>

            </div>
            <div className="container-fluid">


                <Container maxWidth="xs">
                    <form onSubmit={handleSubmit} className={classes.container}>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>

                        <Typography variant="h5" align="center">
                            Registrate!
                        </Typography>

                        <TextField
                            label="Correo electrónico"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                            required
                            fullWidth
                            InputProps={{
                                placeholder: "Correo electrónico",
                                style: { color: "white" },
                            }}
                        />

                        <TextField
                            label="Contraseña"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                            required
                            fullWidth
                            InputProps={{
                                placeholder: "Contraseña",
                                style: { color: "white" },
                            }}
                        />

                        <TextField
                            label="Nombre de Usuario"
                            type="Nombre"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            margin="normal"
                            required
                            fullWidth
                            InputProps={{
                                placeholder: "Nombre de Usuario",
                                style: { color: "secondary" },
                            }}
                        />

                        <Button
                            className={classes.submitButton}
                            type="submit"
                            variant="contained"
                            color="secondary"
                            fullWidth
                        >
                            Crear
                        </Button>
                    </form>
                </Container>
                <br />
                <br />
                <br />
                <Footer />
            </div>
        </div>
    );
};


export default Login;