import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Sidebar from '../components/Sidebar';
import ProductGallery from '../components/ProductGallery';
import { fetchExchangeRates, convertCurrency } from '../services/CurrencyService';

// Importar imágenes
import raquetaTenisImage from '../images/raquetaTenis.jpg';
import sofaImage from '../images/sofa.jpg';
import cascoCiclismo2Image from '../images/cascoCiclismo2.jpg';
import camisetaRojaNinoImage from '../images/CamisetaRojaNino.jpg';
import regaderaPlasticaImage from '../images/regadera2.jpg';
import auricularesDeportivosImage from '../images/Auriculares Deportivos.jpg';

// Estilos
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #ffffff;
  color: white;
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

// Productos en promoción
const promoProducts = [
  {
    title: 'Raqueta de Tenis (Promoción)',
    price: 400000, // Precio promocional
    image: raquetaTenisImage,
    specs: ['Material: Grafito', 'Peso: 300g', 'Tamaño de cabeza: 100 in²'],
    category: 'Tenis',
    promo: true,
  },
  {
    title: 'Sofá Moderno',
    price: 1200000, // Precio del sofá
    image: sofaImage,
    specs: ['Material: Tela', 'Color: Gris', 'Dimensiones: 200x90x85 cm'],
    category: 'Muebles',
    promo: true,
  },
  {
    title: 'Casco de Ciclismo Profesional',
    price: 280000, // Precio promocional
    image: cascoCiclismo2Image,
    specs: ['Peso: 220g', 'Tallas: S/M/L', 'Diseño aerodinámico'],
    category: 'Ciclismo',
    promo: true,
  },
  {
    title: 'Camiseta Roja Niño',
    price: 50000, // Precio de la camiseta
    image: camisetaRojaNinoImage,
    specs: ['Material: Algodón', 'Tallas: S/M/L', 'Color: Rojo brillante'],
    category: 'Ropa',
    promo: true,
  },
  {
    title: 'Regadera Plástica',
    price: 30000, // Precio de la regadera
    image: regaderaPlasticaImage,
    specs: ['Capacidad: 5L', 'Material: Plástico resistente', 'Color: Verde'],
    category: 'Jardinería',
    promo: true,
  },
  {
    title: 'Auriculares Deportivos',
    price: 150000, // Precio de los auriculares
    image: auricularesDeportivosImage,
    specs: ['Bluetooth: 5.0', 'Batería: 10 horas', 'Resistente al agua: IPX7'],
    category: 'Electrónica',
    promo: true,
  },
];

const OfertaPage = () => {
  const [currency, setCurrency] = useState('COP');
  const [exchangeRates, setExchangeRates] = useState({});
  const [filteredPromos, setFilteredPromos] = useState(promoProducts);

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

  return (
    <Container>
      <Sidebar currency={currency} setCurrency={setCurrency} />
      <MainContent>
        <SectionTitle>Ofertas Especiales</SectionTitle>
        <BorderedContainer>
          <ProductGallery
            products={filteredPromos.map((product) => ({
              ...product,
              price: convertPrice(product.price),
            }))}
            showSpecs={true}
          />
        </BorderedContainer>
      </MainContent>
    </Container>
  );
};

export default OfertaPage;
