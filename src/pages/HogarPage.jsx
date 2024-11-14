// src/pages/HogarPage.js
import React from 'react';
import ProductGallery from '../components/ProductGallery';

const hogarProducts = [
  { title: 'Sofá', price: '$200', image: 'https://via.placeholder.com/150' },
  { title: 'Mesa', price: '$150', image: 'https://via.placeholder.com/150' },
  { title: 'Lámpara', price: '$50', image: 'https://via.placeholder.com/150' },
];

const HogarPage = () => {
  return (
    <div className="uk-container">
      <h1 className="uk-heading-line uk-text-center"><span>Hogar</span></h1>
      <ProductGallery products={hogarProducts} />
    </div>
  );
};

export default HogarPage;
