import React, { useContext } from "react";
import "../../styles/login.css";
import { Footer } from "../component/footerRegister";
import { useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


import { Link } from "react-router-dom";
import {
  Box,
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

export const Register = () => {
  const { store, actions } = useContext(Context);
  const classes = useStyles();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password, "Name:");
    // Lógica de inicio de sesión
    actions.register(name, lastName, email, password);
    // navigate("/login");
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
  };

  return (
    <div className="landing-page">
      <div className="video-container ">
        <img className="ho opacity-image" src="https://cdn.shopify.com/s/files/1/0899/2262/articles/Restaurantes_Comida_Internacional.JPG?v=1555022012"></img>
      </div>
      <div className="container-fluid">
        <Container component="main" maxWidth="xs">
          <form onSubmit={handleSubmit} className={classes.container} >
            {/* <CssBaseline /> */}
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <Typography className="text-white" variant="h5" align="center">
              Registrate!
            </Typography>

            <TextField
              label="Nombre"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
              required
              fullWidth
              InputProps={{
                placeholder: "Nombre",
                style: { color: "White" },
                className: "text-outline",
              }}
            />

            <TextField
              label="Apellido"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              margin="normal"
              required
              fullWidth
              InputProps={{
                placeholder: "Apellido",
                style: { color: "White" },
              }}
            />

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
                style: { color: "White" },
                className: "text-outline",
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
                style: { color: "White" },
                className: "text-outline",
              }}
            />


            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="secondary"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Registrase
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


export default Register;