const {Sequelize, DataTypes, Model} = require('sequelize')
const {sequelize} = require('../db')


class Brand extends Model {}

Brand.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
}, {
    sequelize,
    timestamps: false,
});

module.exports = {Brand};