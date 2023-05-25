import React, { useContext } from "react";
import "../../styles/login.css";
import { Footer } from "../component/footerLogin";
import { useLocation } from "react-router-dom";

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

  //PARA MANEJAR EL ENRUTAMIENTO A LA RUTA PREVIA A HACER LOGIN POR PARTE DEL USUARIO.
  // const location = useLocation();
  // // const history = useHistory();
  // const handleSignIn = async (e) => {
  //   e.preventDefault();
  //   const result = await actions.login(email, password);

  //   // Dependiendo de cómo esté configurada tu función 'login', es posible que necesites verificar si la autenticación fue exitosa antes de navegar. Por ejemplo:
  //   if (result.success) {
  //     const { from } = location.state || { from: { pathname: "/" } };
  //     navigate(from.pathname);
  //   } else {
  //     // manejar error de inicio de sesión
  //   }
  // };

  // const handleSignIn = async (e) => {
  //   e.preventDefault();
  //   const result = await actions.login(email, password);

  //   // Dependiendo de cómo esté configurada tu función 'login', es posible que necesites verificar si la autenticación fue exitosa antes de navegar. Por ejemplo:
  //   if (result.success) {
  //     const { from } = location.state || { from: { pathname: "/" } };
  //     navigate(from.pathname);
  //   } else {
  //     // manejar error de inicio de sesión
  //   }
  // };


  const handleSignIn = (e) => {
    e.preventDefault();
    actions.login(email, password);
    navigate("/");
  };
  useEffect(() => {
    console.log(email);
  }, [email]);
  useEffect(() => {
    console.log(password);
  }, [password]);

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
                <Link href="/passwordemail" variant="body2" style={{ color: "white" }}>
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