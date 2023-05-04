import React, { useContext } from "react";
import "../../styles/login.css";
import { Footer } from "../component/footerLogin";

import { NavbarLogin } from "../component/navbarLogin";
// import { NavbarVisitor } from "../component/navbarVisitor";
import { useNavigate, useState } from "react";
// import CutFruitAndVegetables from "../../img/CutFruitAndVegetables.mp4";
import Comida from "../../img/comida.mp4";

import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    // Lógica de inicio de sesión
  };

  return (
    <div className="landing-page">
      <div className="video-container">
        <video autoPlay muted loop>
          <source src={Comida} type="video/mp4" />
          <source src="https://www.example.com/tuvideo.mp4" type="video/mp4" />
          Tu navegador no soporta la reproducción de video.
        </video>
      </div>
      <div className="content">
        <NavbarLogin />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <Container maxWidth="xs">
          <form onSubmit={handleSubmit} className={classes.container}>
            <Grid container justifyContent="center">
              <Grid item>
                <LockOutlinedIcon className={classes.lockIcon} />
              </Grid>
            </Grid>
            <Typography variant="h5" align="center">
              Iniciar sesión
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

            <Button
              className={classes.submitButton}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Iniciar sesión
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