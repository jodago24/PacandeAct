import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import ProductGallery from '../components/ProductGallery';
import Sidebar from '../components/Sidebar';
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

// Lista de productos de accesorios tecnológicos
const accesoriosTecnologicosProducts = [
  { title: 'Auriculares Bluetooth', price: 120000, image: 'https://via.placeholder.com/300x300?text=Auriculares+Bluetooth', discount: true, category: 'Auriculares' },
  { title: 'Cargador Rápido USB-C', price: 50000, image: 'https://via.placeholder.com/300x300?text=Cargador+Rápido', discount: false, category: 'Cargadores' },
  { title: 'Funda para iPhone 14', price: 30000, image: 'https://via.placeholder.com/300x300?text=Funda+para+Iphone+14', discount: true, category: 'Fundas' },
  { title: 'Teclado Mecánico', price: 200000, image: 'https://via.placeholder.com/300x300?text=Teclado+Mecánico', discount: false, category: 'Teclados' },
  { title: 'Ratón Gaming', price: 90000, image: 'https://via.placeholder.com/300x300?text=Ratón+Gaming', discount: true, category: 'Ratones' },
  { title: 'Soporte para Celular', price: 35000, image: 'https://via.placeholder.com/300x300?text=Soporte+para+Celular', discount: false, category: 'Soportes' },
  { title: 'Power Bank 10000mAh', price: 80000, image: 'https://via.placeholder.com/300x300?text=Power+Bank', discount: false, category: 'Baterías' },
  { title: 'Adaptador HDMI', price: 40000, image: 'https://via.placeholder.com/300x300?text=Adaptador+HDMI', discount: true, category: 'Adaptadores' },
];

const AccesoriosTecnologicosPage = () => {
  const location = useLocation();
  const [currency, setCurrency] = useState('COP');
  const [exchangeRates, setExchangeRates] = useState({});
  const [filteredAccesorios, setFilteredAccesorios] = useState(accesoriosTecnologicosProducts);

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
    const filteredProducts = filteredAccesorios.filter(product => product.category === category);
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
      <Sidebar currency={currency} setCurrency={setCurrency} />

      <MainContent>
        {renderSection('Auriculares')}
        {renderSection('Cargadores')}
        {renderSection('Fundas')}
        {renderSection('Teclados')}
        {renderSection('Ratones')}
        {renderSection('Soportes')}
        {renderSection('Baterías')}
        {renderSection('Adaptadores')}
      </MainContent>
    </Container>
  );
};

export default AccesoriosTecnologicosPage;
