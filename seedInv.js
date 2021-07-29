const path = require('path');
const fs = require('fs').promises;

const {sequelize} = require('./db');
const {Inventory} = require('./models');


const seedInv = async () => {

    await sequelize.sync({ force: true });

    const seedPath = path.join(__dirname, 'inventory.json'); // creates path to seed data
    const buffer = await fs.readFile(seedPath); // reads json
    const {data} = JSON.parse(String(buffer)); //parses data

    const dataPromises = data.map(inventory => Inventory.create(inventory))
    await Promise.all(dataPromises)
    console.log("db populated!")
}


module.exports = seedInv
