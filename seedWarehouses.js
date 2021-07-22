const path = require('path');
const fs = require('fs').promises;

const {sequelize} = require('./db');
const {Warehouse} = require('./models');


const seedWarehouses = async () => {

    await sequelize.sync();

    const warehousesSeedPath = path.join(__dirname, 'warehouses.json'); //creates path to warehouses

    const warehousesBuffer = await fs.readFile(warehousesSeedPath); // reads json
    const {warehousesData} = JSON.parse(String(warehousesBuffer));

    const warehousesDataPromises = warehousesData.map(warehouse => Warehouse.create(warehouse))
    await Promise.all(warehousesDataPromises)
    
    console.log("db populated! warehouses")

}

module.exports = seedWarehouses