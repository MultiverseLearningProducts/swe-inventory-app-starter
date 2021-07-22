const {Sequelize, DataTypes, Model} = require('sequelize')
const {sequelize} = require('../db')


class Flavor extends Model {}

Flavor.init({
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    quantity: DataTypes.DOUBLE
}, {
    sequelize,
    timestamps: false,
});

module.exports = {Flavor};