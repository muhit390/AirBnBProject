'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
  
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {
        foreignKey: "ownerId",
        onDelete: "CASCADE"
      });

      Spot.hasMany(models.SpotImage, {
        foreignKey: "spotId",
        onDelete: "CASCADE"
      });
    }
  };
  
  Spot.init({
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [5, 200]
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2,100]
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2,100]
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2,100]
      }
    },
    lat: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: false,
      validate: {
        isNumeric: true,
        min: -90.000000,
        max: 90.000000
      }
    },
    lng: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: false,
      validate: {
        isNumeric: true,
        min: -180.000000,
        max: 180.000000
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 100]
      }
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true,
      validate: {
        len: [5, 500]
      }
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
        notNull: {
          msg: "Price is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};