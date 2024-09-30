'use strict';

const { Review } = require('../models');
const review = require('../models/review');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
};

const reviews = [
  {
    "userId": 1,
    "spotId": 2,
    "review": "Very nice",
    "stars": 5,
    
  },
  {
    "userId": 1,
    "spotId": 3,
    "review": "i come again",
    "stars": 5,

  }, 
  {
    "userId": 1,
    "spotId": 5,
    "review": "could be better",
    "stars": 4,
    
  },
  {
    "userId": 2 ,
    "spotId": 5,
    "review": "its aight",
    "stars": 4,

  },
{
    "userId": 2 ,
    "spotId": 1,
    "review": "good",
    "stars": 4,

  },
{
    "userId": 2 ,
    "spotId": 4,
    "review": "review",
    "stars": 4,

  },
  {
    "userId": 3 ,
    "spotId": 1,
    "review": "review",
    "stars": 5,

  },
{
    "userId": 3,
    "spotId": 2,
    "review": "review",
    "stars": 5,

  },
{
    "userId": 3,
    "spotId": 4,
    "review": "review",
    "stars": 4,

  }
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
   for (let i = 0; i < reviews.length; i++) {
    await Review.create(reviews[i]);
   }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    for (let i = 0; i < reviews.length; i++) {
      Review.destroy({
        where: 
          reviews[i]
      });
    }
  }
};