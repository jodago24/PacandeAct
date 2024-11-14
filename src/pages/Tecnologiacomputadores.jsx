// src/pages/ComputadoresPage.js
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import ProductGallery from '../components/ProductGallery';
import Sidebar from '../components/Sidebar'; // Importa el componente de barra lateral
import { fetchExchangeRates, convertCurrency } from '../services/CurrencyService';

// Estilos del contenedor principal
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  color: white;
  background-color: #ffffff;
`;

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

// Lista de productos para la categoría Computadores
const computadoresProducts = [
  { title: 'Laptop HP Pavilion', price: 2500000, image: 'https://via.placeholder.com/300x300?text=Laptop+HP+Pavilion', specs: ['Intel i5', '8GB RAM', '256GB SSD'], discount: false, category: 'Laptops' },
  { title: 'MacBook Pro', price: 6000000, image: 'https://via.placeholder.com/300x300?text=MacBook+Pro', specs: ['Apple M1', '8GB RAM', '512GB SSD'], discount: true, category: 'Laptops' },
  { title: 'Dell Inspiron Desktop', price: 1500000, image: 'https://via.placeholder.com/300x300?text=Dell+Inspiron+Desktop', specs: ['Intel i3', '4GB RAM', '1TB HDD'], discount: false, category: 'Escritorios' },
  { title: 'Gaming PC', price: 4500000, image: 'https://via.placeholder.com/300x300?text=Gaming+PC', specs: ['Intel i7', '16GB RAM', '512GB SSD + 1TB HDD'], discount: true, category: 'Escritorios' },
  { title: 'Monitor Samsung 24"', price: 600000, image: 'https://via.placeholder.com/300x300?text=Monitor+Samsung+24', specs: ['24 pulgadas', 'Full HD'], discount: false, category: 'Monitores' },
  { title: 'Monitor LG UltraWide', price: 1200000, image: 'https://via.placeholder.com/300x300?text=Monitor+LG+UltraWide', specs: ['29 pulgadas', 'UltraWide', 'Full HD'], discount: true, category: 'Monitores' },
];

const ComputadoresPage = () => {
  const location = useLocation();
  const [currency, setCurrency] = useState('COP');
  const [exchangeRates, setExchangeRates] = useState({});
  const [filteredComputadores, setFilteredComputadores] = useState(computadoresProducts);

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
    const filteredProducts = filteredComputadores.filter(product => product.category === category);
    return (
      <>
        <SectionTitle>{category}</SectionTitle>
        <BorderedContainer>
          <ProductGallery 
            products={filteredProducts.map(product => ({
              ...product,
              price: convertPrice(product.price)
            }))}
            showSizes={false} 
          />
        </BorderedContainer>
      </>
    );
  };

  return (
    <Container>
      <Sidebar currency={currency} setCurrency={setCurrency} /> {/* Componente Sidebar */}

      <MainContent>
        {renderSection('Laptops')}
        {renderSection('Escritorios')}
        {renderSection('Monitores')}
      </MainContent>
    </Container>
  );
};

export default ComputadoresPage;
