'use strict';

const { Spot } = require('../models');
const spot = require('../models/spot');

let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA; // define your schema in options object
}

const spots = [{
        "ownerId": 1,
        "address": "456 Tech Park",
        "city": "Seattle",
        "state": "Washington",
        "country": "United States of America",
        "lat": 47.609722,
        "lng": -122.333056,
        "name": "Developer's Den",
        "description": "A cozy place to code",
        "price": 150,
        "avgRating": 4.8,
        "previewImage": "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg"

    },
    {
        "ownerId": 2,
        "address": "789 Silicon Valley",
        "city": "Palo Alto",
        "state": "California",
        "country": "United States of America",
        "lat": 37.441883,
        "lng": -122.143019,
        "name": "Techie's Retreat",
        "description": "Stay where innovation thrives",
        "price": 200,
        "avgRating": 4.9,
        "previewImage": "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg"
    },
    {
        "ownerId": 3,
        "address": "321 Ocean Drive",
        "city": "Miami",
        "state": "Florida",
        "country": "United States of America",
        "lat": 25.761680,
        "lng": -80.191790,
        "name": "Beach Paradise",
        "description": "Oceanfront views for miles",
        "price": 300,
        "avgRating": 4.7,
        "previewImage": "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"
    },
    {
        "ownerId": 1,
        "address": "555 Mountain Pass",
        "city": "Aspen",
        "state": "Colorado",
        "country": "United States of America",
        "lat": 39.1911,
        "lng": -106.8175,
        "name": "Mountain Escape",
        "description": "Relax in the heart of the Rockies",
        "price": 400,
        "avgRating": 4.6,
        "previewImage": "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg"
    },
    {
        "ownerId": 3,
        "address": "909 Central Park West",
        "city": "New York",
        "state": "New York",
        "country": "United States of America",
        "lat": 40.785091,
        "lng": -73.968285,
        "name": "City Lights Loft",
        "description": "Experience NYC from a luxury loft",
        "price": 350,
        "avgRating": 4.8,
        "previewImage": "https://images.pexels.com/photos/1643388/pexels-photo-1643388.jpeg"
    },
    {
        "ownerId": 1,
        "address": "456 Tech Park",
        "city": "Falls church",
        "state": "Virginia",
        "country": "United States of America",
        "lat": 47.609722,
        "lng": -122.333056,
        "name": "Family Friendly",
        "description": "A cozy place for family",
        "price": 85,
        "avgRating": 5,
        "previewImage": "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg"

    },
    {
        "ownerId": 2,
        "address": "123 Innovation Lane",
        "city": "San Francisco",
        "state": "California",
        "country": "United States of America",
        "lat": 37.774929,
        "lng": -122.419418,
        "name": "Golden Gate Getaway",
        "description": "Charming home with views of the Golden Gate Bridge",
        "price": 250,
        "avgRating": 4.8,
        "previewImage": "https://images.pexels.com/photos/1643388/pexels-photo-1643388.jpeg"
    },
    {
        "ownerId": 3,
        "address": "456 Sunset Boulevard",
        "city": "Los Angeles",
        "state": "California",
        "country": "United States of America",
        "lat": 34.052235,
        "lng": -118.243683,
        "name": "Hollywood Hills Haven",
        "description": "Luxury living in the heart of Hollywood",
        "price": 500,
        "avgRating": 4.9,
        "previewImage": "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"
    },
    {
        "ownerId": 1,
        "address": "789 Desert Road",
        "city": "Phoenix",
        "state": "Arizona",
        "country": "United States of America",
        "lat": 33.448376,
        "lng": -112.074036,
        "name": "Desert Oasis",
        "description": "Tranquil retreat in the heart of the desert",
        "price": 350,
        "avgRating": 4.5,
        "previewImage": "https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg"
    },
    {
        "ownerId": 3,
        "address": "555 Broadway Street",
        "city": "Nashville",
        "state": "Tennessee",
        "country": "United States of America",
        "lat": 36.162663,
        "lng": -86.781601,
        "name": "Music City Loft",
        "description": "Live like a star in downtown Nashville",
        "price": 275,
        "avgRating": 4.7,
        "previewImage": "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg"
    },

    {
        "ownerId": 2,
        "address": "123 Lake View Road",
        "city": "Orlando",
        "state": "Florida",
        "country": "United States of America",
        "lat": 28.538336,
        "lng": -81.379234,
        "name": "Lakeside Villa",
        "description": "Serene home near the lake",
        "price": 180,
        "avgRating": 4.6,
        "previewImage": "https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg"
    },
    {
        "ownerId": 1,
        "address": "890 Forest Lane",
        "city": "Portland",
        "state": "Oregon",
        "country": "United States of America",
        "lat": 45.5155,
        "lng": -122.6793,
        "name": "Forest Retreat",
        "description": "Cozy cabin in the woods",
        "price": 225,
        "avgRating": 4.9,
        "previewImage": "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg"
    },
    {
        "ownerId": 3,
        "address": "910 Garden Street",
        "city": "Savannah",
        "state": "Georgia",
        "country": "United States of America",
        "lat": 32.0809,
        "lng": -81.0912,
        "name": "Garden Sanctuary",
        "description": "Peaceful home with lush garden views",
        "price": 195,
        "avgRating": 4.7,
        "previewImage": "https://images.pexels.com/photos/259581/pexels-photo-259581.jpeg"
    },
    {
        "ownerId": 2,
        "address": "400 Oak Avenue",
        "city": "Dallas",
        "state": "Texas",
        "country": "United States of America",
        "lat": 32.7767,
        "lng": -96.7970,
        "name": "Texan Ranch House",
        "description": "Spacious ranch with modern amenities",
        "price": 320,
        "avgRating": 4.6,
        "previewImage": "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"
    },
    {
        "ownerId": 1,
        "address": "212 Riverbend Drive",
        "city": "Chicago",
        "state": "Illinois",
        "country": "United States of America",
        "lat": 41.8781,
        "lng": -87.6298,
        "name": "Riverside Retreat",
        "description": "Luxury condo with river views",
        "price": 350,
        "avgRating": 4.8,
        "previewImage": "https://images.pexels.com/photos/53610/pexels-photo-53610.jpeg"
    },
    {
        "ownerId": 3,
        "address": "611 Palm Court",
        "city": "San Diego",
        "state": "California",
        "country": "United States of America",
        "lat": 32.7157,
        "lng": -117.1611,
        "name": "Coastal Paradise",
        "description": "Oceanfront property with stunning views",
        "price": 400,
        "avgRating": 4.9,
        "previewImage": "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
    },
    {
        "ownerId": 1,
        "address": "789 Pine Grove",
        "city": "Denver",
        "state": "Colorado",
        "country": "United States of America",
        "lat": 39.7392,
        "lng": -104.9903,
        "name": "Mountain Chalet",
        "description": "Charming retreat nestled in the Rockies",
        "price": 300,
        "avgRating": 4.7,
        "previewImage": "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg"
    },
    {
        "ownerId": 2,
        "address": "789 Sea Breeze Lane",
        "city": "Malibu",
        "state": "California",
        "country": "United States of America",
        "lat": 34.0259,
        "lng": -118.7798,
        "name": "Seaside Escape",
        "description": "Exclusive beachfront property",
        "price": 550,
        "avgRating": 4.8,
        "previewImage": "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg"
    },
    {
        "ownerId": 3,
        "address": "100 Mountain Road",
        "city": "Boise",
        "state": "Idaho",
        "country": "United States of America",
        "lat": 43.6150,
        "lng": -116.2023,
        "name": "Idaho Adventure",
        "description": "Adventure awaits in this rustic cabin",
        "price": 250,
        "avgRating": 4.5,
        "previewImage": "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"
    },
    {
        "ownerId": 2,
        "address": "909 Sunset Avenue",
        "city": "Austin",
        "state": "Texas",
        "country": "United States of America",
        "lat": 30.2672,
        "lng": -97.7431,
        "name": "Downtown Loft",
        "description": "Modern loft in the heart of Austin",
        "price": 400,
        "avgRating": 4.9,
        "previewImage": "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg"
    },
    {
        "ownerId": 3,
        "address": "333 Meadow Road",
        "city": "Charleston",
        "state": "South Carolina",
        "country": "United States of America",
        "lat": 32.7765,
        "lng": -79.9311,
        "name": "Lowcountry Charm",
        "description": "Charming home with historic beauty",
        "price": 290,
        "avgRating": 4.8,
        "previewImage": "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
    },
    {
        "ownerId": 1,
        "address": "190 Harbor View",
        "city": "Newport",
        "state": "Rhode Island",
        "country": "United States of America",
        "lat": 41.4901,
        "lng": -71.3128,
        "name": "Harborfront Haven",
        "description": "Luxury home overlooking the harbor",
        "price": 600,
        "avgRating": 4.9,
        "previewImage": "https://images.pexels.com/photos/259581/pexels-photo-259581.jpeg"
    },
    {
        "ownerId": 2,
        "address": "302 Main Street",
        "city": "Baltimore",
        "state": "Maryland",
        "country": "United States of America",
        "lat": 39.2904,
        "lng": -76.6122,
        "name": "Inner Harbor Retreat",
        "description": "Prime location near the harbor",
        "price": 325,
        "avgRating": 4.6,
        "previewImage": "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"
    },
    {
        "ownerId": 1,
        "address": "101 Sunrise Circle",
        "city": "Sedona",
        "state": "Arizona",
        "country": "United States of America",
        "lat": 34.8697,
        "lng": -111.7610,
        "name": "Desert Sunrise",
        "description": "Experience desert serenity in this stunning home",
        "price": 450,
        "avgRating": 4.8,
        "previewImage": "https://images.pexels.com/photos/53610/pexels-photo-53610.jpeg"
    },
    {
        "ownerId": 3,
        "address": "543 Seaside Drive",
        "city": "Myrtle Beach",
        "state": "South Carolina",
        "country": "United States of America",
        "lat": 33.6891,
        "lng": -78.8867,
        "name": "Beachfront Bliss",
        "description": "Gorgeous home on the sandy shores",
        "price": 500,
        "avgRating": 4.9,
        "previewImage": "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
    },
    {
        "ownerId": 2,
        "address": "987 Canyon Trail",
        "city": "Sedona",
        "state": "Arizona",
        "country": "United States of America",
        "lat": 34.8697,
        "lng": -111.7610,
        "name": "Red Rock Haven",
        "description": "A home nestled in the stunning red rocks",
        "price": 370,
        "avgRating": 4.7,
        "previewImage": "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"
    },
    {
        "ownerId": 1,
        "address": "451 Cliffside Drive",
        "city": "Santa Barbara",
        "state": "California",
        "country": "United States of America",
        "lat": 34.4208,
        "lng": -119.6982,
        "name": "Cliffside Escape",
        "description": "Private retreat with ocean views",
        "price": 525,
        "avgRating": 4.8,
        "previewImage": "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg"
    },
    {
        "ownerId": 2,
        "address": "753 Mountain Lane",
        "city": "Jackson Hole",
        "state": "Wyoming",
        "country": "United States of America",
        "lat": 43.4799,
        "lng": -110.7624,
        "name": "Mountain Majesty",
        "description": "A luxury lodge in the mountains",
        "price": 650,
        "avgRating": 4.9,
        "previewImage": "https://images.pexels.com/photos/53610/pexels-photo-53610.jpeg"
    },

    {
        "ownerId": 1,
        "address": "123 Harbor Lane",
        "city": "Boston",
        "state": "Massachusetts",
        "country": "United States of America",
        "lat": 42.3601,
        "lng": -71.0589,
        "name": "Harborview Retreat",
        "description": "Luxury apartment with stunning harbor views",
        "price": 450,
        "avgRating": 4.9,
        "previewImage": "https://images.pexels.com/photos/259581/pexels-photo-259581.jpeg"
    },
    {
        "ownerId": 3,
        "address": "654 Meadow Lane",
        "city": "Montpelier",
        "state": "Vermont",
        "country": "United States of America",
        "lat": 44.2601,
        "lng": -72.5754,
        "name": "Countryside Escape",
        "description": "Charming home nestled in the Vermont countryside",
        "price": 220,
        "avgRating": 4.7,
        "previewImage": "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
    }


]

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

        console.log("Seeding Spots...");
        await Spot.bulkCreate(spots, { validate: true });
        console.log("Finished Seeding Spots");

    },

    async down(queryInterface, Sequelize) {
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