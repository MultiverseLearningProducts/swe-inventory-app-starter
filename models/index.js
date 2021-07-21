


const {Sequelize, DataTypes, Model} = require('sequelize')
const {sequelize} = require('../db')


class Item extends Model {}

Item.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.STRING,
    category: DataTypes.STRING,
    price: DataTypes.FLOAT
}, {
    sequelize,
    timestamps: false,
});




module.exports = {Item};