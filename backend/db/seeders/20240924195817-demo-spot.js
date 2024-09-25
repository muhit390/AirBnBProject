'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '1234 Skateboard St.',
        city: "Los Angeles",
        state: "California",
        country: "U.S.A",
        lat: 100.000000,
        lng: -100.000000,
        name: "Skateboard House",
        description: "i don't even skate but this is cool",
        price: 2345.23
      },
      {
        ownerId: 1,
        address: '4321 Skateboard Ave.',
        city: "Los Angeles",
        state: "California",
        country: "U.S.A",
        lat: -100.000000,
        lng: 100.000000,
        name: "Skateboard Apartment",
        description: "i don't even skate but this is not cool",
        price: 1110.99
      },
      {
        ownerId: 1,
        address: '1234 Skateboard Blvd.',
        city: "Los Angeles",
        state: "California",
        country: "U.S.A",
        lat: -100.000000,
        lng: -100.000000,
        name: "Skateboard Condo",
        description: "i don't skate but this is coo not really lol jk again haha you owe me a soda",
        price: 1999.99
      }
    ], { validate: true });
    options;
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Skateboard House', 'Skateboard Apartment', 'Skateboard Condo'] }
    }, {});
  }
};
