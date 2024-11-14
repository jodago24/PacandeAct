import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import styled from '@emotion/styled';
import 'uikit/dist/css/uikit.min.css'; // Importa el componente GoogleTranslateWidget
import logo from '../images/logopaca.png';
import LoginModal from './LoginModal'; // Importa el componente del modal
import Tooltip from './Tooltip'; // Asegúrate de importar el componente Tooltip

const NavbarContainer = styled.nav`
  background-color: #000000; /* Negro */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  width: 100%;
  height: auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;

const NavbarRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* Centra los elementos horizontalmente */
  padding: 0 1rem;
  transition: opacity 0.6s ease, transform 0.6s ease;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  color: #fff; /* Color del texto */
  margin-right: 1rem; /* Espacio entre el logo y el resto */
`;

const Logo = styled.img`
  height: 40px; /* Ajusta la altura según sea necesario */
  margin-right: 10px; /* Espacio entre el logo y el texto */
`;

const BrandName = styled(Link)`
  font-size: 24px; /* Tamaño de la fuente */
  font-weight: bold; /* Grosor de la fuente */
  color: #fff; /* Color del texto */
  text-decoration: none; /* Elimina el subrayado del texto */
  position: relative; /* Necesario para el subrayado */

  &:hover {
    color: #fff; 
    text-decoration: none; /* Elimina el subrayado del texto */
  }
`;

const HighlightedLetter = styled.span`
  color: #ff0000; /* Color rojo para la letra "P" */
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  margin: 15px auto;

  input {
    border-radius: 20px;
    padding: 0.5rem;
    border: 1.5px solid #FF0000; /* Borde rojo */
    width: 450px;
    height: 20px;
    margin-left: 0.5rem;
    background-color: #E5E5E5; /* Gris Claro */
    outline: none;

    &:focus {
      border-color: #FF0000;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;

  svg {
    margin: 0 10px;
    color: #fff; /* Blanco Puro */
    border-radius: 30%;
    padding: 5px;
    height: 35px;
    width: 35px;
    transition: color 0.3s ease;

    &:hover {
      color: #FF0000; /* Rojo brillante al pasar el cursor */
    }
  }
`;

const DropdownButtonContainer = styled.div`
  position: relative; /* Esto asegura que el menú se posicione respecto al botón */
`;

const DropdownButton = styled.button`
  background-color: #000000;
  color: #fff;
  border: none;
  height: 30px;
  border-radius: 2px;
  margin-right: 120px;
  cursor: pointer;
  transition: color 0.3s ease;
  line-height: 30px;
  position: relative; /* Necesario para el subrayado */

  &:hover {
    color: #FF0000;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px; /* Grosor del subrayado */
    width: 100%;
    background-color: #FF0000;
    transform: scaleX(0);
    transition: transform 0.5s ease;
  }

  &:hover::after {
    transform: scaleX(1); /* Solo subraya este botón */
  }
`;

const DropdownMenu = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: absolute; /* Posiciona el menú justo debajo del botón */
  background-color: #000000;
  border: 1px solid #FF0000;
  border-radius: 10px;
  top: 100%; /* Se coloca justo debajo del botón */
  left: 0;
  margin-top: 5px;
  width: 150px;
  z-index: 100;
`;

const MenuItem = styled(Link)`
  display: block;
  padding: 10px;
  color: #fff;
  text-decoration: none; /* Evita que el texto aparezca subrayado */
  background-color: transparent; /* Fondo transparente por defecto */
  cursor: pointer;

  &:hover {
    background-color: #FF0000; /* Fondo rojo al pasar el cursor */
    color: #fff; /* Mantén el texto blanco */
  }
`;

const Navbar = () => {
  const [showSearchRow, setShowSearchRow] = useState(true);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [scrolling, setScrolling] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  let lastScrollTop = 0;
  const [showLogin, setShowLogin] = useState(false); // Estado para controlar el modal de login

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY;

      if (currentScrollTop > lastScrollTop) {
        setIsScrollingUp(false);
      } else {
        setIsScrollingUp(true);
      }

      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
      setShowSearchRow(currentScrollTop < 100);
      setScrolling(currentScrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleUserClick = () => {
    setShowLogin(true); // Muestra el modal cuando se hace clic en el ícono de usuario
  };

  const closeLoginModal = () => {
    setShowLogin(false); // Cierra el modal
  };

  // Función para desplazarse a la parte superior
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <NavbarContainer>
      {/* Primera fila que contiene el logo, la barra de búsqueda y los íconos */}
      <NavbarRow
        style={{
          opacity: showSearchRow || isScrollingUp ? 1 : 0,
          transform: showSearchRow || isScrollingUp ? 'translateY(0)' : 'translateY(-100%)',
          height: showSearchRow || isScrollingUp ? 'auto' : '0',
          overflow: 'hidden'
        }}
      >
        <div className="uk-navbar-left">
          {/* Envuelve el logo y el nombre de la marca con Link y agrega scrollToTop */}
          <LogoContainer>
            <Logo src={logo} alt="Logo" />
            <BrandName to="/" onClick={scrollToTop}>
              <HighlightedLetter>P</HighlightedLetter>acande
            </BrandName>
          </LogoContainer>
        </div>
        <SearchContainer>
          <span uk-icon="icon: search" style={{ color: '#fff' }}></span>
          <input type="text" placeholder="Buscar..." />
        </SearchContainer>
        <ButtonContainer>
          <Tooltip text="Iniciar sesión">
            <FaUser size={24} onClick={handleUserClick} />
          </Tooltip>
          <Tooltip text="Carrito de compras">
            <FaShoppingCart size={24} />
          </Tooltip>
        </ButtonContainer>
      </NavbarRow>

      {/* Segunda fila que contiene los botones */}
      <NavbarRow
        style={{
          backgroundColor: scrolling ? 'rgba(0, 0, 0, 1)' : '#000000',
          padding: '10px 0',
          borderRadius: '0',
          opacity: scrolling ? 1 : 1
        }}
      >
        {/* Botón desplegable */}
        <DropdownButtonContainer ref={dropdownRef}>
          <DropdownButton onClick={toggleDropdown}>Categorías</DropdownButton>
          <DropdownMenu isOpen={dropdownOpen}>
            <MenuItem to="/ropa" onClick={() => setDropdownOpen(false)}>Ropa</MenuItem>
            <MenuItem to="/tecnologia" onClick={() => setDropdownOpen(false)}>Tecnología</MenuItem>
            <MenuItem to="/hogar" onClick={() => setDropdownOpen(false)}>Hogar</MenuItem>
            <MenuItem to="/deporte" onClick={() => setDropdownOpen(false)}>Deporte</MenuItem>
          </DropdownMenu>
          <DropdownButton>Ofertas</DropdownButton>
          <DropdownButton>Ofertas</DropdownButton>
          <DropdownButton>Ofertas</DropdownButton>
        </DropdownButtonContainer>
      </NavbarRow>

      {/* Modal de inicio de sesión */}
      {showLogin && <LoginModal onClose={closeLoginModal} />}
    </NavbarContainer>
  );
};

export default Navbar;
