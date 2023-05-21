import React from "react";
import { Carousel } from "react-bootstrap";
import CardCarousel from "../component/cardCarrousel.jsx";
import { Link } from "react-router-dom";
import "../../styles/landingPage.css";
import { Height } from "@material-ui/icons";
// import "../../styles/publicNavbar.css";
const LandingPage = () => {
  return (
    <>
      <div className="">
        <div id="top" style={{ display: "flex", height: "80vh" }} className="container-carousel">
          <Carousel fade className="carousel-container">
            <Carousel.Item className="carousel-item">
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159201/img10_udvzky.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159200/img7_fmticb.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159200/img5_ji20c5.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img9_r06ihn.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img8_untaqb.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img6_riebls.jpg"} />
            </Carousel.Item>
            {/* Añade más ítems de carrusel según sea necesario */}
          </Carousel>
          <Carousel fade className="carousel-container" >
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img3_j0z88r.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img2_e5wn6v.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img12_ogjjhr.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img4_obnjup.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img1_pwmuwa.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159198/img11_voyzpz.jpg"} />
            </Carousel.Item>
          </Carousel>
          <Carousel fade className="carousel-container">
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159198/img11_voyzpz.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img1_pwmuwa.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img4_obnjup.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img12_ogjjhr.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img2_e5wn6v.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img3_j0z88r.jpg"} />
            </Carousel.Item>
          </Carousel>
          <Carousel fade className="carousel-container">
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img6_riebls.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img8_untaqb.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img9_r06ihn.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159200/img5_ji20c5.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159200/img7_fmticb.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159201/img10_udvzky.jpg"} />
            </Carousel.Item>
          </Carousel>
          <Carousel fade className="carousel-container">
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159200/img7_fmticb.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img9_r06ihn.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img6_riebls.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img3_j0z88r.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img4_obnjup.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159198/img11_voyzpz.jpg"} />
            </Carousel.Item>
          </Carousel>
          <Carousel fade className="carousel-container">
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img6_riebls.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img8_untaqb.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img9_r06ihn.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159200/img5_ji20c5.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159200/img7_fmticb.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159201/img10_udvzky.jpg"} />
            </Carousel.Item>
          </Carousel>
        </div >

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
          <button type="button" className="btn btn-light button-carousel">Aquí te mostramos como funciona</button>
        </a>

        <div id="search">
          <Link to="/home" className="my-link">
            <div className="search-img">
              <h2>Busca entre cientos de recetas</h2>
              <img className="container-img" src={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/search_section_element_backless_tywwbl.png"} alt="Backgroun of section search" />
            </div>
          </Link>
          <div className="search-text ">
            <h2 className="search-text-title" >Crea tus propias recetas</h2>
            <p className="search-text-paragraph" >Crea tus resetas favoritas en cuestion de segundos con nuestra Asistente Virtual</p>
            <button type="button" className="btn btn-light button-search" >
              <Link className="my-link" to="/chatbot">Crear receta</Link>
            </button>
          </div>
        </div>
      </div >




      <div className=" d-xs-none d-sm-none d-md-none">
        <div id="top" style={{ display: "flex" }} className="container-carousel">
          <Carousel fade className="carousel-container">
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159201/img10_udvzky.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159200/img7_fmticb.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159200/img5_ji20c5.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img9_r06ihn.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img8_untaqb.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img6_riebls.jpg"} />
            </Carousel.Item>
            {/* Añade más ítems de carrusel según sea necesario */}
          </Carousel>
          <Carousel fade className="carousel-container" >
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img3_j0z88r.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img2_e5wn6v.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img12_ogjjhr.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img4_obnjup.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img1_pwmuwa.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159198/img11_voyzpz.jpg"} />
            </Carousel.Item>
          </Carousel>
          <Carousel fade className="carousel-container">
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159198/img11_voyzpz.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img1_pwmuwa.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img4_obnjup.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img12_ogjjhr.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img2_e5wn6v.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img3_j0z88r.jpg"} />
            </Carousel.Item>
          </Carousel>
          <Carousel fade className="carousel-container">
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img6_riebls.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img8_untaqb.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img9_r06ihn.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159200/img5_ji20c5.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159200/img7_fmticb.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159201/img10_udvzky.jpg"} />
            </Carousel.Item>
          </Carousel>
          <Carousel fade className="carousel-container">
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159200/img7_fmticb.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img9_r06ihn.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img6_riebls.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img3_j0z88r.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img4_obnjup.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159198/img11_voyzpz.jpg"} />
            </Carousel.Item>
          </Carousel>
          <Carousel fade className="carousel-container">
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img6_riebls.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img8_untaqb.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/img9_r06ihn.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159200/img5_ji20c5.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159200/img7_fmticb.jpg"} />
            </Carousel.Item>
            <Carousel.Item>
              <CardCarousel url={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159201/img10_udvzky.jpg"} />
            </Carousel.Item>
          </Carousel>
        </div>

        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "2em",
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
          <button type="button" className="btn btn-light button-carousel"></button>
        </a>

        <div id="search">
          <Link to="/home" className="my-link">
            <div className="search-img">
              <h2>Busca entre cientos de recetas</h2>
              <img className="container-img" src={"https://res.cloudinary.com/doqx408xv/image/upload/v1684159199/search_section_element_backless_tywwbl.png"} alt="Backgroun of section search" />
              <h3 className="search-text-title-mini" >Crea tus propias recetas</h3>
              <h4 className="search-text-paragraph-mini" >Crea tus resetas favoritas en cuestion </h4>
              <h4 className="search-text-paragraph-mini" > de segundos con nuestra Asistente Virtual</h4>
              <button type="button" className="btn btn-warning button-search" >
                <Link className="my-link" to="/chatbot"><h2>Crear receta</h2></Link>
              </button>
            </div>
          </Link>





        </div>

      </div>

    </>

  );
};

export default LandingPage;
