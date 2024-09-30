'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
const demoSpotImages =
[ 
  { spotId: 1, images: [
      { url: "img.png", preview: true },
      { url: "img.png" },
      { url: "img.png" }
  ]},
  { spotId: 2, images: [
      { url: "img.png", preview: true },
      { url: "img.png" },
      { url: "img.png" }
  ]},
  { spotId: 3, images: [
      { url: "img.png", preview: true },
      { url: "img.png" }
  ]},
  { spotId: 4, images: [
      { url: "img.png", preview: true },
      { url: "img.png" },
      { url: "img.png" },
      { url: "img.png" }
  ]},
  { spotId: 5, images: [
      { url: "img.png", preview: true }
  ]}
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    for (const spotImages of demoSpotImages) {
      for (const image of spotImages.images) {
        SpotImage.create({
          spotId: spotImages.spotId,
          url: image.url,
          preview: image.preview || false
        });
      }
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    for (const spotImages of demoSpotImages) {
      for (const image of spotImages.images) {
        SpotImage.destroy({
          where: {
            spotId: spotImages.spotId,
            url: image.url,
            preview: image.preview || false
          }
        });
      }
    }
  }
};