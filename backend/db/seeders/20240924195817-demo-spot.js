'use strict';

const { Spot } = require('../models');
const spot = require('../models/spot');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const spots = [
  {
    "ownerId": 1,
    "address": "123 Boom",
    "city": "City",
    "state": "state",
    "country": "country",
    "lat": 59.352627,
    "lng": -100.123521,
    "name": "boom",
    "description": "its explosive",
    "price": 1042,
    "avgRating": 3.7,
    "previewImage": "image"
  },
  {
    "ownerId": 2,
    "address": "456 house st",
    "city": "cypress",
    "state": "California",
    "country": "USA",
    "lat": 11.694200,
    "lng": -100.132465,
    "name": "House House",
    "description": "This is a house",
    "price": 872,
    "avgRating": 4.9,
    "previewImage": "image"
  },
  {
    "ownerId": 3,
    "address": "111 eleven st",
    "city": "ontario",
    "state": "Hawaii",
    "country": "United States of America",
    "lat": 25.761680,
    "lng": 25.191790,
    "name": "Jiminy Christmas",
    "description": "on eleven st",
    "price": 155,
    "avgRating": 4.7,
    "previewImage": "image"
  },
  {
    "ownerId": 1,
    "address": "643 sixfourthree",
    "city": "numbers",
    "state": "digits",
    "country": "United States of America",
    "lat": 123.456789,
    "lng": 12.345678,
    "name": "Integer",
    "description": "Count me in",
    "price": 123,
    "avgRating": 4.6,
    "previewImage": "image"
  },
  {
    "ownerId": 3,
    "address": "900 submarine",
    "city": "New York",
    "state": "Arkalifornsas",
    "country": "United States of A",
    "lat": 69,
    "lng": 42.0,
    "name": "noice",
    "description": "hehe nice",
    "price": 693420,
    "avgRating": 4.8,
    "previewImage": "image"
  },
]

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

    console.log("Seeding Spots...");
    await Spot.bulkCreate(spots, { validate: true });
    console.log("Finished Seeding Spots");

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    const addresses = spots.map((spot) => spot.address);
    await queryInterface.bulkDelete(options, {
      name: {
        [Op.in]: addresses,
      },
    });
  }
};