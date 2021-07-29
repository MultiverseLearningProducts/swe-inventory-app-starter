const path = require('path');
const fs = require('fs').promises;

const {sequelize} = require('./db');
const {Warehouse} = require('./models');


const seedW = async () => {

    await sequelize.sync({ force: true });

    const seedPath = path.join(__dirname, 'warehouses.json'); // creates path to seed data
    const buffer = await fs.readFile(seedPath); // reads json
    const {data} = JSON.parse(String(buffer)); //parses data

    const dataPromises = data.map(warehouse => Warehouse.create(warehouse))
    await Promise.all(dataPromises)
    console.log("db populated!")
}

module.exports = seedW