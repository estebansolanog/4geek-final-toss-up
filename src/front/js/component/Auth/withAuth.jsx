import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { useLocation, Navigate } from 'react-router-dom';

const WithAuth = (Component) => {
    return function AuthenticatedComponent(props) {
        const { store, actions } = useContext(Context)
        const location = useLocation();
        if ((store.userLogin) === false) {
            return <Navigate to="/login" state={{ from: location }} replace />
        }
        return <Component {...props} />;
    }
}

export default WithAuth;


// import React, { useState, useContext } from "react";
// import { Context } from "../../store/appContext";
// import { useLocation, Redirect } from 'react-router-dom';
// // import { useNavigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";
// // import { Component } from "react/cjs/react.production.min";


// function withAuth(Component) {
//     return function AuthenticatedComponent(props) {
//         const { store, actions } = useContext(Context)
//         const location = useLocation();
//         if (!store.userLogin) {
//             return <Redirect to={{ pathname: "/login", state: { from: location } }} />
//         }
//         return <Component {...props} />;
//     }
// }

// export default withAuth;

//COMPOENETE HOC ORIGINAL EXPLICADO POR EL PROFE ANTONIO
// const WithAuth = (Component) => { //Hight Order Componet HOC
//   const AuthRoute = () => {
//     const { store, actions } = useContext(Context);
//     // const navigate = useNavigate()
//     const isAuth = store.userLogin;
//     if (isAuth) {
//       return <Component />;
//     } else {
//         return <Navigate to="/login" />
//         // return null
//     }
//   };
//   return AuthRoute;
// };

// export default WithAuth

