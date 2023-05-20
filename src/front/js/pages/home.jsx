import React, { useEffect, useState } from "react";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ShareIcon from '@material-ui/icons/Share';
const Home = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [socialShareAnchorEl, setSocialShareAnchorEl] = useState(null);


  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get('http://localhost:3001/chat/AllShareRecipes', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        });
        console.log(response.data);
        setChatHistory(response.data);

        setChatHistory(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchChatHistory();
  }, []);

  // console.log(chatHistory);
  // useEffect(() => {
  //   const fetchChatHistory = async () => {
  //     const response = await axios.get('http://localhost:3001/chat/AllShareRecipes', {
  //       headers: {
  //         'Authorization': `Bearer ${localStorage.getItem("token")}`
  //       }
  //     });
  //     console.log(response.data);
  //     setChatHistory(response.data);
  //   };

  //   fetchChatHistory();
  // }, []);

  //Cada vez que se recarga la pagina, hace escroll hacia abajo para ver el ultimo mensaje.
  useEffect(() => {
    // messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);


  const handleOpenSocialShareMenu = (event) => {
    setSocialShareAnchorEl(event.currentTarget);
  };

  const handleCloseSocialShareMenu = () => {
    setSocialShareAnchorEl(null);
  };

  return (
    <div className="recetas-container">
      <h1>Receta</h1>
      <div>
        {chatHistory && chatHistory.length > 0 ? chatHistory.map((chat, index) => (
          <div key={index}>
            <div div className="card ">
              {chat.image_of_recipe && <img className="responsive-image" src={chat.image_of_recipe} alt="recipe" />}
              <p style={{ whiteSpace: 'pre-wrap' }}> {chat.description}</p>

              <Button
                variant="outlined"
                color="primary"
                onClick={handleOpenSocialShareMenu}
              >
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </Button>
              <Menu
                id="social-share-menu"
                anchorEl={socialShareAnchorEl}
                keepMounted
                open={Boolean(socialShareAnchorEl)}
                onClose={handleCloseSocialShareMenu}
              >
                <MenuItem onClick={() => handleSocialShare('Facebook', chat)}><ShareIcon />Facebook</MenuItem>
                <MenuItem onClick={() => handleSocialShare('Twitter', chat)}><ShareIcon />Twitter</MenuItem>
                <MenuItem onClick={() => handleSocialShare('WhatsApp', chat)}><ShareIcon />WhatsApp</MenuItem>
              </Menu>
            </div>
          </div>

        )) : <p>No hay recetas compartidas</p>}
      </div>
    </div>
  );
};

export default Home;




// const CardRecetas = (props) => {
//   const { store, actions } = useContext(Context);
//   const like = document.getElementById("like");
//   const countLike = document.getElementById("count-like");



//   // like.addEventListener('click', function () {

//   //     if (countLike.textContent <= 0) {
//   //         countLike.textContent++;
//   //     }

//   // })

//   return (<>


//     <div className="card d-xs-none d-sm-none d-md-none" style={{ width: "18rem" }}>
//       <img src={"https://media.istockphoto.com/id/931643150/vector/picture-icon.jpg?s=612x612&w=0&k=20&c=St-gpRn58eIa8EDAHpn_yO4CZZAnGD6wKpln9l3Z3Ok="} className="card-img" alt="..." />
//       <div className="card-body bg bg-dark">
//         <h5 className="card-title text-white">CARDDDDDDDD</h5>
//         <p className="card-text text-warning">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//         {store.userLogin ?
//           <div className="d-flex justify-content-between">
//             <button id="like" title="me gusta" type="button" className="btn-warning mx-2 p-2 border-0 rounded" onClick={() => {
//               actions.agregarFavorito({
//                 name: props.name,
//                 uid: props.uid,
//                 link: `/vehicles/${props.uid}`
//               })
//             }}>
//               <span className="p-2" id="count-like">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-egg-fried" viewBox="0 0 16 16"><path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /> <path d="M13.997 5.17a5 5 0 0 0-8.101-4.09A5 5 0 0 0 1.28 9.342a5 5 0 0 0 8.336 5.109 3.5 3.5 0 0 0 5.201-4.065 3.001 3.001 0 0 0-.822-5.216zm-1-.034a1 1 0 0 0 .668.977 2.001 2.001 0 0 1 .547 3.478 1 1 0 0 0-.341 1.113 2.5 2.5 0 0 1-3.715 2.905 1 1 0 0 0-1.262.152 4 4 0 0 1-6.67-4.087 1 1 0 0 0-.2-1 4 4 0 0 1 3.693-6.61 1 1 0 0 0 .8-.2 4 4 0 0 1 6.48 3.273z" /></svg>
//                 10

//               </span>
//             </button>
//             <Link to="/receta">
//               <button type="button" className="btn-warning mx-2 p-2 border-0 rounded" onClick={() => {
//               }}>
//                 Ver mas
//               </button>
//             </Link>


//           </div>
//           : <></>}
//       </div>
//     </div>


//     <div className="card d-none d-xs-block d-sm-block d-md-block " style={{ width: "25rem" }}>
//       <img src={"https://media.istockphoto.com/id/931643150/vector/picture-icon.jpg?s=612x612&w=0&k=20&c=St-gpRn58eIa8EDAHpn_yO4CZZAnGD6wKpln9l3Z3Ok="} className="card-img" alt="..." />
//       <div className="card-body bg bg-dark">
//         <h5 className="card-title text-white">CADRRRR</h5>
//         <p className="card-text text-warning">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//         {store.userLogin ?
//           <div className="d-flex justify-content-between">
//             <button id="like" title="me gusta" type="button" className="btn-warning mx-2 p-2 border-0 rounded" onClick={() => {
//               actions.agregarFavorito({
//                 name: props.name,
//                 uid: props.uid,
//                 link: `/vehicles/${props.uid}`
//               })
//             }}>
//               <span className="p-2" id="count-like">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-egg-fried" viewBox="0 0 16 16"><path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /> <path d="M13.997 5.17a5 5 0 0 0-8.101-4.09A5 5 0 0 0 1.28 9.342a5 5 0 0 0 8.336 5.109 3.5 3.5 0 0 0 5.201-4.065 3.001 3.001 0 0 0-.822-5.216zm-1-.034a1 1 0 0 0 .668.977 2.001 2.001 0 0 1 .547 3.478 1 1 0 0 0-.341 1.113 2.5 2.5 0 0 1-3.715 2.905 1 1 0 0 0-1.262.152 4 4 0 0 1-6.67-4.087 1 1 0 0 0-.2-1 4 4 0 0 1 3.693-6.61 1 1 0 0 0 .8-.2 4 4 0 0 1 6.48 3.273z" /></svg>

//               </span>
//             </button>
//             <Link to="/receta">
//               <button type="button" className="btn-warning mx-2 p-2 border-0 rounded" onClick={() => {
//               }}>
//                 Ver mas
//               </button>
//             </Link>


//           </div>

//           : <></>}

//       </div>
//     </div>

//   </>)
// }


// export default CardRecetas;




// import React, { useContext, useEffect, useState } from "react";
// import { Context } from "../store/appContext";
// import "../../styles/home.css";
// import CardRecetas from "../component/cardRecetas.jsx";



// export const Home = () => {
//   const { store, actions } = useContext(Context);
//   const [listRecetas, setListRecetas] = useState({})


//   //   se ejecuta la primera vez que se reenderiza el componente
//   //   useEffect(() => {
//   //     const cargaDatos = async () => {
//   //       let { respuestaJson, response } = await actions.useFetch("Pendiente")
//   //       if (response.ok) {
//   //         console.log(respuestaJson)
//   //         setListRecetas(respuestaJson.results)
//   //       }

//   //     }

//   //     const cargaParalelo = async () => {
//   //       let promesaRecetas = actions.useFetchParalelo("Pendiente")

//   //       resuelvo las tres promesas al mismo tiempo
//   //       let [a] = await Promise.all([promesaRecetas])

//   //       a = await a.json()
//   //       setListRecetas(a.results)
//   //     }
//   //     cargaParalelo() //paralelo //saldo en la cuenta, transferencia efectiva, etc

//   //   }, [])
//   //   useEffect(() => { }, [listRecetas])

//   return (

//     //     <div className="container-fluid mx-4">
//     //       <ul className="row">
//     //         {listRecetas && listRecetas.length > 0 ?
//     //           <>
//     //             {listRecetas.map((item, index) => {
//     //               return <li className="col-4 m-2" key={item.uid}>
//     //                 <CardRecetas name={item.name} uid={item.uid} />
//     //               </li>
//     //             })}
//     //           </> : <></>}
//     //       </ul>
//     //     </div>

//     <div className="container-fluid mx-4 ">
//       <ul className="row m-2 p-0">
//         <li className="col md-3 sm-12 my-2"><CardRecetas /></li>
//         <li className="col md-3 sm-12my-2"><CardRecetas /></li>
//         <li className="col md-3 sm-12 my-2"><CardRecetas /></li>
//         <li className="col md-3 sm-12 my-2"><CardRecetas /></li>
//         <li className="col md-3 sm-12 my-2"><CardRecetas /></li>
//         <li className="col md-3 sm-12 my-2"><CardRecetas /></li>
        // <li className="col md-3 sm-12 my-2"><CardRecetas /></li>
//         <li className="col md-3 sm-12 my-2"><CardRecetas /></li>
//       </ul>

//       <br></br>
//       <br></br>
//       <br></br>
//       <br></br>
//       <br></br>
//     </div>

//   );
// };

// export default Home