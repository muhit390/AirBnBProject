'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA; // define your schema in options object
}
const demoSpotImages = [{
        spotId: 1,
        images: [
            { url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg", preview: true },
            { url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg" },
            { url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg" },
            { url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg" }
        ]
    },
    {
        spotId: 2,
        images: [
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg", preview: true },
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },

        ]
    },
    {
        spotId: 3,
        images: [
            { url: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg", preview: true },
            { url: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg" },
            { url: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg" },
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },
        ]
    },
    {
        spotId: 4,
        images: [
            { url: "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg", preview: true },
            { url: "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg" },
            { url: "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg" },
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },
        ]
    },
    {
        spotId: 5,
        images: [
            { url: "https://images.pexels.com/photos/1643388/pexels-photo-1643388.jpeg", preview: true },
            { url: "https://images.pexels.com/photos/1643388/pexels-photo-1643388.jpeg" },
            { url: "https://images.pexels.com/photos/1643388/pexels-photo-1643388.jpeg" },
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },
        ]
    },
    {
        spotId: 6,
        images: [
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg", preview: true },
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },
        ]
    },
    {
        spotId: 7,
        images: [
            { url: "https://images.pexels.com/photos/1643388/pexels-photo-1643388.jpeg", preview: true },
            { url: "https://images.pexels.com/photos/1643388/pexels-photo-1643388.jpeg" },
            { url: "https://images.pexels.com/photos/1643388/pexels-photo-1643388.jpeg" },
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },
        ]
    },
    {
        spotId: 8,
        images: [
            { url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg", preview: true },
            { url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg" },
            { url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg" },
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },
        ]
    },
    {
        spotId: 9,
        images: [
            { url: "https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg", preview: true },
            { url: "https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg" },
            { url: "https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg" },
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },
        ]
    },
    {
        spotId: 10,
        images: [
            { url: "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg", preview: true },
            { url: "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg" },
            { url: "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg" },
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },
        ]
    },

    {
        spotId: 11,
        images: [
            { url: "https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg", preview: true },
            { url: "https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg" },
            { url: "https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg" },
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },
        ]
    },
    {
        spotId: 12,
        images: [
            { url: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg", preview: true },
            { url: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg" },
            { url: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg" },
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },
        ]
    },
    {
        spotId: 13,
        images: [
            { url: "https://images.pexels.com/photos/259581/pexels-photo-259581.jpeg", preview: true },
            { url: "https://images.pexels.com/photos/259581/pexels-photo-259581.jpeg" },
            { url: "https://images.pexels.com/photos/259581/pexels-photo-259581.jpeg" },
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },
        ]
    },
    {
        spotId: 14,
        images: [
            { url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg", preview: true },
            { url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg" },
            { url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg" },
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },
        ]
    },
    {
        spotId: 15,
        images: [
            { url: "https://images.pexels.com/photos/53610/pexels-photo-53610.jpeg", preview: true },
            { url: "https://images.pexels.com/photos/53610/pexels-photo-53610.jpeg" },
            { url: "https://images.pexels.com/photos/53610/pexels-photo-53610.jpeg" },
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },
        ]
    },
    {
        spotId: 16,
        images: [
            { url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg", preview: true },
            { url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg" },
            { url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg" },
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },
        ]
    },
    {
        spotId: 17,
        images: [
            { url: "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg", preview: true },
            { url: "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg" },
            { url: "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg" },
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },
        ]
    },
    {
        spotId: 18,
        images: [
            { url: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg", preview: true },
            { url: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg" },
            { url: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg" },
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },
        ]
    },
    {
        spotId: 19,
        images: [
            { url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg", preview: true },
            { url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg" },
            { url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg" },
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },
        ]
    },
    {
        spotId: 20,
        images: [
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg", preview: true },
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },
        ]
    },
    {
        spotId: 21,
        images: [
            { url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg", preview: true },
            { url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg" },
            { url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg" },
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },
        ]
    },
    {
        spotId: 22,
        images: [
            { url: "https://images.pexels.com/photos/259581/pexels-photo-259581.jpeg", preview: true },
            { url: "https://images.pexels.com/photos/259581/pexels-photo-259581.jpeg" },
            { url: "https://images.pexels.com/photos/259581/pexels-photo-259581.jpeg" },
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },
        ]
    },
    {
        spotId: 23,
        images: [
            { url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg", preview: true },
            { url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg" },
            { url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg" },
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },
        ]
    },
    {
        spotId: 24,
        images: [
            { url: "https://images.pexels.com/photos/53610/pexels-photo-53610.jpeg", preview: true },
            { url: "https://images.pexels.com/photos/53610/pexels-photo-53610.jpeg" },
            { url: "https://images.pexels.com/photos/53610/pexels-photo-53610.jpeg" },
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },
        ]
    },
    {
        spotId: 25,
        images: [
            { url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg", preview: true },
            { url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg" },
            { url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg" },
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },
        ]
    },
    {
        spotId: 26,
        images: [
            { url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg", preview: true },
            { url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg" },
            { url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg" },
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },
        ]
    },
    {
        spotId: 27,
        images: [
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg", preview: true },
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },
        ]
    },
    {
        spotId: 28,
        images: [
            { url: "https://images.pexels.com/photos/53610/pexels-photo-53610.jpeg", preview: true },
            { url: "https://images.pexels.com/photos/53610/pexels-photo-53610.jpeg" },
            { url: "https://images.pexels.com/photos/53610/pexels-photo-53610.jpeg" },
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },
        ]
    },
    {
        spotId: 29,
        images: [
            { url: "https://images.pexels.com/photos/259581/pexels-photo-259581.jpeg", preview: true },
            { url: "https://images.pexels.com/photos/259581/pexels-photo-259581.jpeg" },
            { url: "https://images.pexels.com/photos/259581/pexels-photo-259581.jpeg" },
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },
        ]
    },
    {
        spotId: 30,
        images: [
            { url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg", preview: true },
            { url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg" },
            { url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg" },
            { url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },
        ]
    }


];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
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

    async down(queryInterface, Sequelize) {
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