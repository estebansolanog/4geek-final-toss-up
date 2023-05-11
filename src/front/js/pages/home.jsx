import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import CardRecetas from "../component/cardRecetas.jsx";



export const Home = () => {
  const { store, actions } = useContext(Context);
  const [listRecetas, setListRecetas] = useState({})


  //   se ejecuta la primera vez que se reenderiza el componente
  //   useEffect(() => {
  //     const cargaDatos = async () => {
  //       let { respuestaJson, response } = await actions.useFetch("Pendiente")
  //       if (response.ok) {
  //         console.log(respuestaJson)
  //         setListRecetas(respuestaJson.results)
  //       }

  //     }

  //     const cargaParalelo = async () => {
  //       let promesaRecetas = actions.useFetchParalelo("Pendiente")

  //       resuelvo las tres promesas al mismo tiempo
  //       let [a] = await Promise.all([promesaRecetas])

  //       a = await a.json()
  //       setListRecetas(a.results)
  //     }
  //     cargaParalelo() //paralelo //saldo en la cuenta, transferencia efectiva, etc

  //   }, [])
  //   useEffect(() => { }, [listRecetas])

  return (

    //     <div className="container-fluid mx-4">
    //       <ul className="row">
    //         {listRecetas && listRecetas.length > 0 ?
    //           <>
    //             {listRecetas.map((item, index) => {
    //               return <li className="col-4 m-2" key={item.uid}>
    //                 <CardRecetas name={item.name} uid={item.uid} />
    //               </li>
    //             })}
    //           </> : <></>}
    //       </ul>
    //     </div>

    <div className="Home">

      {/* <div className="image-container">
        <img className="hu" src="https://static.vecteezy.com/system/resources/previews/017/651/910/large_2x/wooden-board-empty-table-in-front-of-blurred-background-free-photo.jpg"> </img>
      </div> */}
      <div className="container-fluid mx-4 ">

        <ul className="row m-2 p-0">
          <li className="col md-3 sm-12 my-2"><CardRecetas /></li>
          <li className="col md-3 sm-12my-2"><CardRecetas /></li>
          <li className="col md-3 sm-12 my-2"><CardRecetas /></li>
          <li className="col md-3 sm-12 my-2"><CardRecetas /></li>
          <li className="col md-3 sm-12 my-2"><CardRecetas /></li>
          <li className="col md-3 sm-12 my-2"><CardRecetas /></li>
          <li className="col md-3 sm-12 my-2"><CardRecetas /></li>
          <li className="col md-3 sm-12 my-2"><CardRecetas /></li>
        </ul>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>

  );
};

export default Home