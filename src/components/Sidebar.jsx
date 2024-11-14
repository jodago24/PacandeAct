import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { FaMoneyBillWave, FaArrowRight, FaArrowLeft } from 'react-icons/fa';

// Contenedor de la flecha para mostrar u ocultar la barra lateral
const ToggleArrow = styled.div`
  position: fixed;
  top: 50%;
  left: ${({ isSidebarVisible }) => (isSidebarVisible ? '265px' : '1px')};
  transform: translateY(-50%);
  background-color: #000;
  color: white;
  padding: 10px;
  margin-right: 10px;
  cursor: pointer;
  transition: left 0.3s ease;
  z-index: 100000;
  border-radius: 50%;

    &:hover {
     color: #ff0000;
    }
`;


// Contenedor principal de la barra lateral
const SidebarContainer = styled.div`
width: 250px;
  background-color: #000000;
  padding: 20px;
  z-index: 3;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  border-top: 3px solid rgba(0, 0, 0, 0.9);
  position: fixed;
  height: 100vh; /* Asegura que la altura sea de 100% de la pantalla */
  top: 0;
  left: ${({ isSidebarVisible }) => (isSidebarVisible ? '0' : '-270px')};
  transition: left 0.3s ease;
  margin-top: ${({ isScrolled }) => (isScrolled ? '20px' : '90px')};
  overflow-y: auto; /* Habilita el scroll solo en esta parte */
  padding-bottom: 20px;

  /* Asegura que el último componente llegue a una tercera parte de la pantalla */
  min-height: calc(100vh - 33vh); /* Hace que el último componente ocupe un 33% de la pantalla */
  
  /* Estilo para ocultar la barra de desplazamiento */
  scrollbar-width: thin; /* Para navegadores Firefox */
  scrollbar-color: transparent transparent; /* Para Firefox */
  
  /* Estilo para navegadores Webkit (Chrome, Safari, Edge) */
  &::-webkit-scrollbar {
    width: 0; /* Oculta la barra */
  }

  &::-webkit-scrollbar-track {
    background: transparent; /* No mostrar el fondo del track */
  }

  &::-webkit-scrollbar-thumb {
    background: transparent; /* No mostrar el thumb */
  }
`;

// Contenedor para el selector de divisas
const CurrencySelectContainer = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 10px;
  margin: 20px 0px 20px 20px;
  border-radius: 0px;
  font-size: 1rem;
  border: 1px solid #ccc;
  background-color: #000000;
`;

// Selector de divisas
const CurrencySelect = styled.select`
  padding: 10px;
  margin-left: 10px;
  border: none;
  font-size: 1rem;
  border: 2px solid transparent;
  outline: none;
  appearance: none;
  background-color: #000000;
  color: white;
`;

// Contenedor de los botones de categorías
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;


// Botones de categorías
const Button = styled.button`
  padding: 10px;
  background-color: transparent;
  border: 2px solid transparent;
  border-radius: 0px;
  cursor: pointer;
  font-size: 1rem;
  color: white;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 0, 0, 0.9);
  }

  &:hover {
    color: #ff0000;
  }
`;

const Sidebar = ({ currency, setCurrency }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollPos, setLastScrollPos] = useState(0);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > lastScrollPos && currentScrollPos > 90) {
      setIsScrolled(true);
    } else if (currentScrollPos < lastScrollPos || currentScrollPos <= 90) {
      setIsScrolled(false);
    }
    
    setLastScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollPos]);

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <ToggleArrow isSidebarVisible={isSidebarVisible} onClick={toggleSidebar}>
        {isSidebarVisible ? <FaArrowLeft size={20} /> : <FaArrowRight size={20} />}
      </ToggleArrow>
      <SidebarContainer isSidebarVisible={isSidebarVisible} isScrolled={isScrolled}>
        <CurrencySelectContainer>
          <FaMoneyBillWave size={24} color="#fff" />
          <CurrencySelect value={currency} onChange={handleCurrencyChange}>
            <option value="COP">Pesos Colombianos</option>
            <option value="MXN">Pesos Mexicanos</option>
            <option value="USD">Dólares Americanos</option>
            <option value="EUR">Euros</option>
          </CurrencySelect>
        </CurrencySelectContainer>
        <h2>Ropa</h2>
        <ButtonContainer>
        <Link to="/Ropamujer">
          <Button>Mujer</Button>
        </Link>
        <Link to="/ropa">
          <Button>Hombre</Button>
        </Link>
        <Link to="/Ropaniño">
          <Button>Niño</Button>
        </Link>
        </ButtonContainer>
        <h2>Tecnologia</h2>
        <ButtonContainer>
        <Link to="/tecnologia">
          <Button>Celulares</Button>
        </Link>
        <Link to="/Tecpc">
          <Button>Computadores</Button>
        </Link>
        <Link to="/Tecaccesorios">
          <Button>Accesorios</Button>
        </Link>
        </ButtonContainer>
        <h2>Hogar</h2>
        <ButtonContainer>
        <Link to="/Ropamujer">
          <Button>Mujer</Button>
        </Link>
        <Link to="/ropa">
          <Button>Hombre</Button>
        </Link>
        <Link to="/Ropaniño">
          <Button>Niño</Button>
        </Link>
        </ButtonContainer>
        <h2>Deporte</h2>
        <ButtonContainer>
        <Link to="/Ropamujer">
          <Button>Mujer</Button>
        </Link>
        <Link to="/ropa">
          <Button>Hombre</Button>
        </Link>
        <Link to="/Ropaniño">
          <Button>Niño</Button>
        </Link>
        </ButtonContainer>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
