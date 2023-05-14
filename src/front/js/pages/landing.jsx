import React from "react";
import { Carousel } from "react-bootstrap";
import CardCarousel from "../component/cardCarrousel.jsx";
import { Link } from "react-router-dom";
// import CardCarousel from "../component/cardRecetas.jsx";
import img1 from "/src/front/img/img1.jpg";
import img2 from "/src/front/img/img2.jpg";
import img3 from "/src/front/img/img3.jpg";
import img4 from "/src/front/img/img4.jpg";
import img5 from "/src/front/img/img5.jpg";
import img6 from "/src/front/img/img6.jpg";
import img7 from "/src/front/img/img7.jpg";
import img8 from "/src/front/img/img8.jpg";
import img9 from "/src/front/img/img9.jpg";
import img10 from "/src/front/img/img10.jpg";
import img11 from "/src/front/img/img11.jpg";
import img12 from "/src/front/img/img12.jpg";
import BackSearch from "/src/front/img/search_section_element_backless.png";
import "../../styles/landingPage.css";
// import "../../styles/publicNavbar.css";
const LandingPage = () => {
  return (
    <div>
      <div id="top" style={{ display: "flex" }} className="container-carousel">
        <Carousel fade className="carousel-container">
          <Carousel.Item>
            <CardCarousel url={img1} />
          </Carousel.Item>
          <Carousel.Item>
            <CardCarousel url={img2} />
          </Carousel.Item>
          <Carousel.Item>
            <CardCarousel url={img3} />
          </Carousel.Item>
          <Carousel.Item>
            <CardCarousel url={img4} />
          </Carousel.Item>
          <Carousel.Item>
            <CardCarousel url={img5} />
          </Carousel.Item>
          <Carousel.Item>
            <CardCarousel url={img6} />
          </Carousel.Item>
          {/* Añade más ítems de carrusel según sea necesario */}
        </Carousel>
        <Carousel fade className="carousel-container" >
          <Carousel.Item>
            <CardCarousel url={img7} />
          </Carousel.Item>
          <Carousel.Item>
            <CardCarousel url={img8} />
          </Carousel.Item>
          <Carousel.Item>
            <CardCarousel url={img9} />
          </Carousel.Item>
          <Carousel.Item>
            <CardCarousel url={img10} />
          </Carousel.Item>
          <Carousel.Item>
            <CardCarousel url={img11} />
          </Carousel.Item>
          <Carousel.Item>
            <CardCarousel url={img12} />
          </Carousel.Item>
        </Carousel>
        <Carousel fade className="carousel-container">
          <Carousel.Item>
            <CardCarousel url={img12} />
          </Carousel.Item>
          <Carousel.Item>
            <CardCarousel url={img11} />
          </Carousel.Item>
          <Carousel.Item>
            <CardCarousel url={img10} />
          </Carousel.Item>
          <Carousel.Item>
            <CardCarousel url={img9} />
          </Carousel.Item>
          <Carousel.Item>
            <CardCarousel url={img8} />
          </Carousel.Item>
          <Carousel.Item>
            <CardCarousel url={img7} />
          </Carousel.Item>
        </Carousel>
        <Carousel fade className="carousel-container">
          <Carousel.Item>
            <CardCarousel url={img6} />
          </Carousel.Item>
          <Carousel.Item>
            <CardCarousel url={img5} />
          </Carousel.Item>
          <Carousel.Item>
            <CardCarousel url={img4} />
          </Carousel.Item>
          <Carousel.Item>
            <CardCarousel url={img3} />
          </Carousel.Item>
          <Carousel.Item>
            <CardCarousel url={img2} />
          </Carousel.Item>
          <Carousel.Item>
            <CardCarousel url={img1} />
          </Carousel.Item>
        </Carousel>
        <Carousel fade className="carousel-container">
          <Carousel.Item>
            <CardCarousel url={img2} />
          </Carousel.Item>
          <Carousel.Item>
            <CardCarousel url={img4} />
          </Carousel.Item>
          <Carousel.Item>
            <CardCarousel url={img6} />
          </Carousel.Item>
          <Carousel.Item>
            <CardCarousel url={img8} />
          </Carousel.Item>
          <Carousel.Item>
            <CardCarousel url={img10} />
          </Carousel.Item>
          <Carousel.Item>
            <CardCarousel url={img12} />
          </Carousel.Item>
        </Carousel>
        <Carousel fade className="carousel-container">
          <Carousel.Item>
            <CardCarousel url={img6} />
          </Carousel.Item>
          <Carousel.Item>
            <CardCarousel url={img5} />
          </Carousel.Item>
          <Carousel.Item>
            <CardCarousel url={img4} />
          </Carousel.Item>
          <Carousel.Item>
            <CardCarousel url={img3} />
          </Carousel.Item>
          <Carousel.Item>
            <CardCarousel url={img2} />
          </Carousel.Item>
          <Carousel.Item>
            <CardCarousel url={img1} />
          </Carousel.Item>
        </Carousel>
      </div>

      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "white",
        fontSize: "3em",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        zIndex: 2, // Asegura que la leyenda se muestre por encima de los demás elementos
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>

        Descubre tu próxima receta favorita

      </div>
      <a href="#search">
        <i style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3, // Asegura que la flecha se muestre por encima de los demás elementos
          animation: "floating 2s ease-in-out infinite" // Crea una animación de rebote infinita
        }} className="fa-solid fa-angle-down"></i>
      </a>
      {/* <button type="button" className="btn btn-link button-carousel">Aquí te mostramos como funciona</button> */}
      {/* <button type="button" class="btn btn-light button-carousel">Aquí te mostramos como funciona</button> */}
      <a href="#search">
        <button type="button" className="btn btn-light button-carousel">Aquí te mostramos cómo funciona</button>
      </a>

      <div id="search">
        <Link to="/public" className="my-link">
          <div className="search-img">
            <h2>Busca entre cientos de recetas</h2>
            <img className="container-img" src={BackSearch} alt="Backgroun of section search" />
          </div>
        </Link>
        <div className="search-text">
          <h2 className="search-text-title" >Crea tus propias recetas</h2>
          <p className="search-text-paragraph" >Crea tus resetas favoritas en cuestion de segundos con nuestra Asistente Virtual</p>
          <button type="button" class="btn btn-light button-search" >
            <Link className="my-link" to="/chatbot">Crear receta</Link>
          </button>
        </div>
      </div>
    </div>

  );
};

export default LandingPage;
