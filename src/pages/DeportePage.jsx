// src/pages/DeportePage.js
import React from 'react';
import ProductGallery from '../components/ProductGallery';

const deporteProducts = [
  { title: 'Pelota de fútbol', price: '$30', image: 'https://via.placeholder.com/150' },
  { title: 'Bicicleta', price: '$150', image: 'https://via.placeholder.com/150' },
  { title: 'Raqueta de tenis', price: '$70', image: 'https://via.placeholder.com/150' },
];

const DeportePage = () => {
  return (
    <div className="uk-container">
      <h1 className="uk-heading-line uk-text-center"><span>Deportes</span></h1>
      <ProductGallery products={deporteProducts} />
    </div>
  );
};

export default DeportePage;
