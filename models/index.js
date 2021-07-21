const {Sequelize, DataTypes, Model} = require('sequelize')
const {sequelize} = require('../db')


class Sauce extends Model {} //change to Inventory models

Sauce.init({                 //change to Inventory models
    name: DataTypes.STRING,
    image: DataTypes.STRING,
}, {
    sequelize,
    timestamps: false,
});

module.exports = {Sauce}; //change to export Inventory models