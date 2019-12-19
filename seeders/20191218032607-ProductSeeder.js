'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [{
      name: 'Wardah Renew You Night Cream',
      skin_type: 'dry',
      price: 85000,
      img_link: '/img/wardah.jpeg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Laneige Water Bank Essence EX',
      skin_type: 'dry',
      price: 380000,
      img_link: '/img/laneige.jpeg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'The Body Shop Aloe Calming Toner',
      skin_type: 'dry',
      price: 170000,
      img_link: '/img/bodyshop.jpeg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'COSRX low pH Good Morning Gel Cleanser',
      skin_type: 'oily',
      price: 105000,
      img_link: '/img/cosrx.jpeg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Mario Badescu Glycolic Acid Toner',
      skin_type: 'oily',
      price: 425000,
      img_link: '/img/mariobadescu.jpeg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Fabil Skincare Post Acne Lightening Serum',
      skin_type: 'oily',
      price: 185000,
      img_link: '/img/fabil.jpeg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'The Ordinary Granactive Retinoid 2% in Squalene',
      skin_type: 'combination',
      price: 130000,
      img_link: '/img/theordinary.webp',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Safi White Expert Skin Refiner',
      skin_type: 'combination',
      price: 50000,
      img_link: '/img/safi.jpeg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Emina Masquarade Face Mask Tea Tree Oil',
      skin_type: 'combination',
      price: 15000,
      img_link: '/img/emina.jpeg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Innisfree The Green Tea Seed Serum',
      skin_type: 'normal',
      price: 220000,
      img_link: '/img/innesfreetteatree.jpeg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Benton Aloe BHA Skin Toner',
      skin_type: 'normal',
      price: 150000,
      img_link: '/img/benton.jpeg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Nature Republic Soothing & Moisture Aloe Vera 92% Soothing Gel',
      skin_type: 'normal',
      price: 100000,
      img_link: '/img/naturerepublic.jpeg',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
