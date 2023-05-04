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

    <div className="container-fluid mx-4 ">
      <ul className="row m-2 p-0">
        <li className="col-3 my-2"><CardRecetas /></li>
        <li className="col-3 my-2"><CardRecetas /></li>
        <li className="col-3 my-2"><CardRecetas /></li>
        <li className="col-3 my-2"><CardRecetas /></li>
        <li className="col-3 my-2"><CardRecetas /></li>
        <li className="col-3 my-2"><CardRecetas /></li>
        <li className="col-3 my-2"><CardRecetas /></li>
        <li className="col-3 my-2"><CardRecetas /></li>
      </ul>
    </div>

  );
};

export default Home