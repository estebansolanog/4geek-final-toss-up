// //import Head from "next/head";
// import React, { useState, useEffect, useContext } from "react";
// import "../../styles/chatbot.css";

// export default function Home() {
//   const [animalInput, setAnimalInput] = useState("");
//   const [result, setResult] = useState();

//   async function onSubmit(event) {
//     event.preventDefault();
//     try {
//       const response = await fetch("/chat/chatgpt", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ animal: animalInput }),
//       });

//       const data = await response.json();
//       if (response.status !== 200) {
//         throw data.error || new Error(`Request failed with status ${response.status}`);
//       }

//       setResult(data.result);
//       setAnimalInput("");
//     } catch (error) {
//       // Consider implementing your own error handling logic here
//       console.error(error);
//       alert(error.message);
//     }
//   }

//   return (
//     <div>
//       <Head>
//         <title>OpenAI Quickstart</title>
//         <link rel="icon" href="/dog.png" />
//       </Head>

//       <main className={styles.main}>
//         <img src="/dog.png" className={styles.icon} />
//         <h3>Name my pet</h3>
//         <form onSubmit={onSubmit}>
//           <input
//             type="text"
//             name="animal"
//             placeholder="Enter an animal"
//             value={animalInput}
//             onChange={(e) => setAnimalInput(e.target.value)}
//           />
//           <input type="submit" value="Generate names" />
//         </form>
//         <div className={styles.result}>{result}</div>
//         {/* <pre className={styles.result}>{result}</pre> */}
//       </main>
//     </div>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Chatbot = () => {
//   const [recipe, setRecipe] = useState(''); // Estado para almacenar la receta
//   const [isLoading, setIsLoading] = useState(true); // Estado para controlar el indicador de carga

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         const response = await axios.post('http://localhost:3001/chat/chatgpt', {
//           prompt: 'Receta de lasaña'
//         });

//         setRecipe(response.data.message);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Hubo un error al obtener la receta:', error);
//         setIsLoading(false);
//       }
//     };

//     fetchRecipe();
//   }, []); // Dependencia vacía para que se ejecute solo una vez al montar el componente

//   if (isLoading) {
//     return <p>Cargando receta...</p>;
//   }

//   return (
//     <div className='container'>
//       <h1>Receta</h1>
//       <div style={{ whiteSpace: 'pre-wrap' }}>{recipe}</div>
//     </div>
//   );
// };

// export default Chatbot;


import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [recipe, setRecipe] = useState(''); // Estado para almacenar la receta
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar el indicador de carga
  const [inputValue, setInputValue] = useState(''); // Estado para almacenar el valor del input

  const fetchRecipe = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/chat/chatgpt', {
        prompt: inputValue
      });

      setRecipe(response.data.message);
    } catch (error) {
      console.error('Hubo un error al obtener la receta:', error);
    }
    setIsLoading(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);

  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Previene el comportamiento de envío de formulario por defecto
    fetchRecipe();
    setInputValue('');
  };

  return (
    <div className='container'>
      <h1>Receta</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Introduce la receta que quieres buscar"
        />
        <button type="submit">Buscar receta</button>
      </form>
      {isLoading ? <p>Cargando receta...</p> : <div style={{ whiteSpace: 'pre-wrap' }}>{recipe}</div>}
    </div>
  );
};

export default Chatbot;
