'use strict';

const { ReviewImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoReviewImages = [
  { reviewId: 1, images: [
      { url: "image.png" },
      { url: "image.png" }
  ]},
  { reviewId: 2, images: [
      { url: "image.png" },
      { url: "image.png" },
      { url: "image.png" }
  ]},
  { reviewId: 3, images: [
      { url: "picture.png" }
  ]},
  { reviewId: 4, images: [
      { url: "photo.png" },
      { url: "photo.png" },
      { url: "photo.png" },
      { url: "photo.png" }
  ]},
  { reviewId: 5, images: [
      { url: "photo.png" },
      { url: "photo.png" }
  ]},
  { reviewId: 6, images: [
      { url: "another_picture.png" }
  ]},
  { reviewId: 7, images: [
      { url: "more_pictures.png" },
      { url: "more_pictures.png" }
  ]},
  { reviewId: 8, images: [
      { url: "another_one.png" },
      { url: "another_one.png" },
      { url: "another_one.png" },
      { url: "another_one.png" }
  ]},
  { reviewId: 9, images: [
      { url: "boom.png" },
      { url: "bam.png" }
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
    for (const reviewImage of demoReviewImages) {
      for (const image of reviewImage.images) {
        ReviewImage.create({
          reviewId: reviewImage.reviewId,
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
    for (const reviewImage of demoReviewImages) {
      for (const image of reviewImage.images) {
        ReviewImage.destroy({
          where: {
            reviewId: reviewImage.reviewId,
            // url: image.url,
            // preview: image.preview || false
          }
        });
      }
    }
  }
};