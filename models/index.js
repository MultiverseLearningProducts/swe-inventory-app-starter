const {Sequelize, DataTypes, Model} = require('sequelize')
const {sequelize} = require('../db')


class Item extends Model {}
class User extends Model {}
class Warehouse extends Model {}
class Inventory extends Model {}
class Supplier extends Model {}

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

User.init({
    name: DataTypes.STRING,
    role: DataTypes.STRING,
    root: DataTypes.BOOLEAN
}, {
    sequelize,
    timestamps: false,
});

Warehouse.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING
}, {
    sequelize,
    timestamps: false,
});

Inventory.init({
    name: DataTypes.STRING,
    amount: DataTypes.STRING,
    orderMore: DataTypes.BOOLEAN
}, {
    sequelize,
    timestamps: false,
});

Supplier.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    buyer: DataTypes.BOOLEAN
}, {
    sequelize,
    timestamps: false,
});

module.exports = {Item, User, Warehouse, Inventory, Supplier};