import React, { useContext } from "react";
import "../../styles/login.css";
import { Footer } from "../component/footerLogin";

import { NavbarLogin } from "../component/navbarLogin";
// import { NavbarVisitor } from "../component/navbarVisitor";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
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
  const { store, actions } = useContext(Context);
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    console.log(email);
  }, [email]);
  useEffect(() => {
    console.log(password);
  }, [password]);

  const handleSignIn = (e) => {
    e.preventDefault();
    actions.login(email, password);
    navigate("/");
  };

  return (
    <div className="landing-page">
      <div className="video-container">
        <video autoPlay muted loop>
          <source src={"https://res.cloudinary.com/doqx408xv/video/upload/v1684159209/comida_chxnqx.mp4"} type="video/mp4" />
          Tu navegador no soporta la reproducción de video.
        </video>
      </div>
      <div className="content">
        {/* <NavbarLogin /> */}
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
          <form className={classes.container}>
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

            <br />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="primary"
              onClick={(e) => {
                handleSignIn(e);
              }}
            >
              Iniciar sesión
            </Button>
            <br />
            <br />
            <Grid container direction="column" alignItems="center" justifyContent="center">
              <Grid item xs>
                <Link href="Recover" variant="body2" style={{ color: "white" }}>
                  Olvidé mi contraseña
                </Link>
              </Grid>
              <Grid item xs>
                <Link href="register" variant="body2" style={{ color: "white" }}>
                  {"¿Aún no tienes una cuenta? Regístrate"}
                </Link>
              </Grid>
            </Grid>
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