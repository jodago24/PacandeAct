import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min.js';

// Importa las imágenes locales
import mujerImage from '../images/mujer1.jpg';
import hombreImage from '../images/hombre.jpg';
import carruselImage from '../images/carrusel1.jpg';
import carrusel2Image from '../images/carrusel2.jpg';
import carrusel3Image from '../images/carrusel3.jpg';
import celulares from '../images/celulares.jpg';
import computadores from '../images/computadores.jpeg';
import accesorios from '../images/accesorios.jpeg';
import futbol from '../images/futbol.jpeg';
import baloncesto from '../images/baloncesto.jpeg';
import variedad from '../images/variedad.jpeg';
import muebles from '../images/muebles.jpeg';
import decoracion from '../images/decoracion.jpeg';
import jardin from '../images/jardin.jpeg';

const HomePageContainer = styled.div`
  background-color: #FFFFFF; /* Fondo Blanco Puro */
  color: #333333; /* Texto Gris Antracita */
  text-align: center;
  padding: 20px;
  margin: 0;
  width: 100%;
  box-sizing: border-box; /* Incluye el padding en el ancho total */
`;

const WideCardContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
`;

const WideCard = styled.div`
  width: 45%;
  padding: 50px;
  text-align: center;
  font-size: 50px;
  font-weight: bold;
  color: #000000;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: transform 0.3s, background-color 0.3s;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
    transition: background-color 0.3s;
  }

  span {
    position: relative;
    z-index: 2;
    color: #FFFFFF;
  }

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 30px;
    padding: 30px;
  }
`;

// Componente para las tarjetas de Tecnología
const TechCardContainer = styled(WideCardContainer)`
  background-color: #000000;
  padding: 20px;
  color: #FFFFFF;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TechWideCard = styled(WideCard)`
  height: 550px;
  width: 300px;
  font-size: 40px;

  @media (max-width: 768px) {
    width: 100%;
    font-size: 30px;
    height: auto; /* Ajusta la altura automáticamente en pantallas pequeñas */
  }
`;

const HomePage = () => {
  const slideshowRef = useRef(null);

  useEffect(() => {
    if (window.UIkit) {
      const ukSlideshow = window.UIkit.slideshow(slideshowRef.current);

      const handleMouseEnter = () => {
        ukSlideshow.pause();
      };

      const handleMouseLeave = () => {
        ukSlideshow.start();
      };

      slideshowRef.current.addEventListener('mouseenter', handleMouseEnter);
      slideshowRef.current.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        slideshowRef.current.removeEventListener('mouseenter', handleMouseEnter);
        slideshowRef.current.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <HomePageContainer>
      {/* Carrusel */}
      <div
        ref={slideshowRef}
        uk-slideshow="animation: fade; autoplay: true; autoplay-interval: 3000; ratio: 7:3;"
      >
        <ul className="uk-slideshow-items">
          <li>
            <img src={carruselImage} alt="Imagen de Carrusel" uk-cover="true" />
          </li>
          <li>
            <img src={carrusel2Image} alt="Imagen de Ejemplo 2" uk-cover="true" />
          </li>
          <li>
            <img src={carrusel3Image} alt="Imagen de Ejemplo 3" uk-cover="true" />
          </li>
        </ul>
      </div>

      {/* Sección de Ropa */}
      <h2>ROPA</h2>
      <WideCardContainer>
        <WideCard image={mujerImage}>
          <span>MUJER</span>
        </WideCard>
        <WideCard image={hombreImage}>
          <span>HOMBRE</span>
        </WideCard>
      </WideCardContainer>

      {/* Sección de Tecnología */}
      <h2>TECNOLOGÍA</h2>
      <TechCardContainer>
        <TechWideCard image={celulares}>
          <span>CELULARES</span>
        </TechWideCard>
        <TechWideCard image={computadores}>
          <span>COMPUTADORES</span>
        </TechWideCard>
        <TechWideCard image={accesorios}>
          <span>ACCESORIOS</span>
        </TechWideCard>
      </TechCardContainer>

      {/* Sección de Hogar */}
      <h2>HOGAR</h2>
      <WideCardContainer>
        <WideCard image={muebles}>
          <span>MUEBLES</span>
        </WideCard>
        <WideCard image={decoracion}>
          <span>DECORACIÓN</span>
        </WideCard>
        <WideCard image={jardin}>
          <span>JARDÍN</span>
        </WideCard>
      </WideCardContainer>

      {/* Sección de Deportes */}
      <h2>DEPORTE</h2>
      <TechCardContainer>
        <TechWideCard image={futbol}>
          <span>FÚTBOL</span>
        </TechWideCard>
        <TechWideCard image={baloncesto}>
          <span>BALONCESTO</span>
        </TechWideCard>
        <TechWideCard image={variedad}>
          <span>VARIEDAD</span>
        </TechWideCard>
      </TechCardContainer>
    </HomePageContainer>
  );
};

export default HomePage;
