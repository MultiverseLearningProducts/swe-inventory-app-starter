const path = require('path');
const fs = require('fs').promises;

const {sequelize} = require('./db');
const {Warehouse} = require('./models');


const seedW = async () => {

    await sequelize.sync({ force: true });

    const warehousesSeedPath = path.join(__dirname, 'warehouses.json'); // creates path to seed data
    const warehousesBuffer = await fs.readFile(warehousesSeedPath); // reads json
    const {warehousesData} = JSON.parse(String(warehousesBuffer)); //parses warehousesData

    const warehousesDataPromises = warehousesData.map(warehouse => Warehouse.create(warehouse))
    await Promise.all(warehousesDataPromises)
    console.log("db populated!")
}

module.exports = seedW