import React, { useState } from 'react';
import styled from '@emotion/styled';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7); /* Pantalla oscurecida */
  backdrop-filter: blur(8px); /* Desenfoque de fondo */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000000;
  
`;

const ModalContent = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  padding: 2rem;
  width: 400px;
  border-radius: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.8);
  position: relative;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #ffffff; /* Color blanco */
`;

const Title = styled.h2`
  color: #fff; /* Blanco */
  margin-bottom: 1.5rem;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  border-color: #fff;

  &:hover {
    input {
      border-color: #FF0000; /* Borde rojo al pasar el cursor */
      color: #FF0000; /* Texto en rojo */
    }

    input::placeholder {
      color: #FF0000; /* Placeholder en rojo */
    }

    svg {
      color: #FF0000; /* Cambia el color del icono a rojo */
    }
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 10px;
  color: #fff; /* Color del icono por defecto */
  transition: color 0.3s ease; /* Transición de color */
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 2.5rem; /* Espacio para el icono */
  border: 1px solid #fff; 
  border-radius: 5px;
  outline: none;
  background-color: rgba(0, 0, 0, 0.5);
  color: #ffffff; /* Texto en blanco */
  transition: border-color 0.3s ease, color 0.3s ease; /* Transición de borde y texto */

  &::placeholder {
    color: #fff; /* Color del texto predeterminado (placeholder) */
    transition: color 0.3s ease; /* Transición del placeholder */
  }
`;

const Button = styled.button`
  width: 50%;
  padding: 0.75rem;
  color: #FFFFFF; /* Texto blanco */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.8);
  transition: background-color 0.3s ease;
  border: 1px solid #fff; 

  &:hover {
    background-color: #CC0000; 
  }

 
`;

const ToggleLink = styled.p`
  margin-top: 1rem;
  color: #FFFFFF; /* Texto blanco */
  font-size: 0.9rem;

  a {
    color: #FF0000; /* Rojo Vivo */
    text-decoration: none;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoginModal = ({ onClose }) => {
  const [showRegister, setShowRegister] = useState(false);

  const toggleForm = () => {
    setShowRegister(!showRegister);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {showRegister ? (
          <>
            <Title>Crear Cuenta</Title>
            <form>
              <InputContainer>
                <InputIcon><FaUser /></InputIcon>
                <Input type="text" placeholder="Nombre Completo" required />
              </InputContainer>
              <InputContainer>
                <InputIcon><FaEnvelope /></InputIcon>
                <Input type="email" placeholder="Correo Electrónico" required />
              </InputContainer>
              <InputContainer>
                <InputIcon><FaLock /></InputIcon>
                <Input type="password" placeholder="Contraseña" required />
              </InputContainer>
              <Button type="submit">Registrarse</Button>
            </form>
            <ToggleLink>
              ¿Ya tienes cuenta? <a onClick={toggleForm}>Inicia sesión aquí</a>
            </ToggleLink>
          </>
        ) : (
          <>
            <Title>Iniciar Sesión</Title>
            <form>
              <InputContainer>
                <InputIcon><FaEnvelope /></InputIcon>
                <Input type="email" placeholder="Correo Electrónico" required />
              </InputContainer>
              <InputContainer>
                <InputIcon><FaLock /></InputIcon>
                <Input type="password" placeholder="Contraseña" required />
              </InputContainer>
              <Button type="submit">Iniciar Sesión</Button>
            </form>
            <ToggleLink>
              ¿No tienes cuenta? <a onClick={toggleForm}>Regístrate aquí</a>
            </ToggleLink>
          </>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default LoginModal;
