'use strict';

const { Review } = require('../models');
const review = require('../models/review');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
};


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Reviews', [
      {
        "userId": 1,
        "spotId": 1,
        "review": "cool.",
        "stars": 5,

      },
      {
        "userId": 1,
        "spotId": 2,
        "review": "nice",
        "stars": 5,

      },
      {
        "userId": 1,
        "spotId": 3,
        "review": "whaaaa.",
        "stars": 4,

      },
    ], {});
    options
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1] }
    }, options);
  }
};