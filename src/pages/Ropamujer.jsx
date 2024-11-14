import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import ProductGallery from '../components/ProductGallery';
import Sidebar from '../components/Sidebar'; // Importa el nuevo componente de barra lateral
import { fetchExchangeRates, convertCurrency } from '../services/CurrencyService';

// Estilos del contenedor principal
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  color: white;
  background-color: #ffffff;
`;

// Contenedor principal de la sección de productos
const MainContent = styled.div`
  flex-grow: 1;
  margin: 120px 0;
  text-align: center;
  width: 100%;
`;

const SectionTitle = styled.h2`
  margin-bottom: 15px;
  color: #000000;
`;

const BorderedContainer = styled.div`
  padding: 20px;
  border-radius: 0px;
  display: inline-block;
  width: 100%;
  max-width: 1200px;
  background: rgba(192, 192, 192, 0.5);
  border: 1px solid rgba(97, 106, 107, 0.3);
`;

// Lista de productos
const ropaProducts = [
  { title: 'Camiseta Azul Mujer', price: 80000, image: 'https://via.placeholder.com/300x300?text=Camiseta+Azul+Mujer', sizes: ['S', 'M', 'L', 'XL'], discount: false, category: 'Camisetas' },
  { title: 'Pantalón Mujer', price: 160000, image: 'https://via.placeholder.com/300x300?text=Pantalon+Mujer', sizes: ['S', 'M', 'L'], discount: false, category: 'Pantalones' },
  { title: 'Chaqueta Mujer', price: 240000, image: 'https://via.placeholder.com/300x300?text=Chaqueta+Mujer', sizes: ['S', 'M', 'L'], discount: true, category: 'Chaquetas' },
  { title: 'Camiseta Negra Mujer', price: 80000, image: 'https://via.placeholder.com/300x300?text=Camiseta+Negra+Mujer', sizes: ['S', 'M', 'L', 'XL'], discount: true, category: 'Camisetas' },
  { title: 'Pantalón Mujer', price: 160000, image: 'https://via.placeholder.com/300x300?text=Pantalon+Mujer', sizes: ['S', 'M', 'L'], discount: false, category: 'Pantalones' },
  { title: 'Chaqueta Mujer', price: 240000, image: 'https://via.placeholder.com/300x300?text=Chaqueta+Mujer', sizes: ['S', 'M', 'L'], discount: true, category: 'Chaquetas' },
  { title: 'Camiseta Amarilla Mujer', price: 80000, image: 'https://via.placeholder.com/300x300?text=Camiseta+Amarilla+Mujer', sizes: ['S', 'M', 'L', 'XL'], discount: true, category: 'Camisetas' },
  { title: 'Camiseta Blanca Mujer', price: 80000, image: 'https://via.placeholder.com/300x300?text=Camiseta+Blanca+Mujer', sizes: ['S', 'M', 'L', 'XL'], discount: true, category: 'Camisetas' },
  { title: 'Pantalón Mujer', price: 160000, image: 'https://via.placeholder.com/300x300?text=Pantalon+Mujer', sizes: ['S', 'M', 'L'], discount: false, category: 'Pantalones' },
  { title: 'Chaqueta Mujer', price: 240000, image: 'https://via.placeholder.com/300x300?text=Chaqueta+Mujer', sizes: ['S', 'M', 'L'], discount: true, category: 'Chaquetas' },
  { title: 'Camiseta Roja Mujer', price: 80000, image: 'https://via.placeholder.com/300x300?text=Camiseta+Roja+Mujer', sizes: ['S', 'M', 'L', 'XL'], discount: true, category: 'Camisetas' },
  { title: 'Pantalón Mujer', price: 160000, image: 'https://via.placeholder.com/300x300?text=Pantalon+Mujer', sizes: ['S', 'M', 'L'], discount: false, category: 'Pantalones' },
  { title: 'Chaqueta Mujer', price: 240000, image: 'https://via.placeholder.com/300x300?text=Chaqueta+Mujer', sizes: ['S', 'M', 'L'], discount: true, category: 'Chaquetas' },
  { title: 'Camiseta Gris Mujer', price: 80000, image: 'https://via.placeholder.com/300x300?text=Camiseta+Gris+Mujer', sizes: ['S', 'M', 'L', 'XL'], discount: true, category: 'Camisetas' },
  { title: 'Pantalón Mujer', price: 160000, image: 'https://via.placeholder.com/300x300?text=Pantalon+Mujer', sizes: ['S', 'M', 'L'], discount: false, category: 'Pantalones' },
  { title: 'Chaqueta Mujer', price: 240000, image: 'https://via.placeholder.com/300x300?text=Chaqueta+Mujer', sizes: ['S', 'M', 'L'], discount: true, category: 'Chaquetas' },
  { title: 'Pantalón Mujer', price: 160000, image: 'https://via.placeholder.com/300x300?text=Pantalon+Mujer', sizes: ['S', 'M', 'L'], discount: false, category: 'Pantalones' },
  { title: 'Chaqueta Mujer', price: 240000, image: 'https://via.placeholder.com/300x300?text=Chaqueta+Mujer', sizes: ['S', 'M', 'L'], discount: true, category: 'Chaquetas' },
];

const RopaMujerPage = () => {
  const location = useLocation();
  const [currency, setCurrency] = useState('COP');
  const [exchangeRates, setExchangeRates] = useState({});
  const [filteredRopa, setFilteredRopa] = useState(ropaProducts);

  useEffect(() => {
    const fetchRates = async () => {
      const rates = await fetchExchangeRates();
      if (rates) {
        setExchangeRates(rates);
      }
    };
    fetchRates();
  }, []);

  const convertPrice = (price) => {
    if (currency === 'COP') return price;
    if (currency === 'MXN') return convertCurrency(price, exchangeRates['MXN']);
    if (currency === 'USD') return convertCurrency(price, exchangeRates['USD']);
    if (currency === 'EUR') return convertCurrency(price, exchangeRates['EUR']);
    return price;
  };

  const renderSection = (category) => {
    const filteredProducts = filteredRopa.filter(product => product.category === category);
    return (
      <>
        <SectionTitle>{category}</SectionTitle>
        <BorderedContainer>
          <ProductGallery 
            products={filteredProducts.map(product => ({
              ...product,
              price: convertPrice(product.price)
            }))} 
            showSizes={true} 
          />
        </BorderedContainer>
      </>
    );
  };

  return (
    <Container>
      <Sidebar currency={currency} setCurrency={setCurrency} /> {/* Usa el nuevo componente Sidebar */}

      <MainContent>
        {renderSection('Camisetas')}
        {renderSection('Pantalones')}
        {renderSection('Chaquetas')}
      </MainContent>
    </Container>
  );
};

export default RopaMujerPage;
