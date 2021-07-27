const path = require('path');
const fs = require('fs').promises;

const {sequelize} = require('./db');
const {Inventory} = require('./models');


const seedInv = async () => {

    await sequelize.sync({ force: true });

    const inventorySeedPath = path.join(__dirname, 'inventory.json'); // creates path to seed data
    const inventoryBuffer = await fs.readFile(inventorySeedPath); // reads json
    const {inventoryData} = JSON.parse(String(inventoryBuffer)); //parses inventory Data

    const inventoryDataPromises = inventoryData.map(inventory => Inventory.create(inventory))
    await Promise.all(inventoryDataPromises)
    console.log("db populated!")
}

module.exports = seedInv