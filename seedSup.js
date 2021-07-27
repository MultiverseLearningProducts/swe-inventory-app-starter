const path = require('path');
const fs = require('fs').promises;

const {sequelize} = require('./db');
const {Supplier} = require('./models');


const seedSup = async () => {

    await sequelize.sync({ force: true });

    const seedPath = path.join(__dirname, 'suppliers.json'); // creates path to seed data
    const buffer = await fs.readFile(seedPath); // reads json
    const {data} = JSON.parse(String(buffer)); //parses data

    const dataPromises = data.map(supplier => Supplier.create(supplier))
    await Promise.all(dataPromises)
    console.log("db populated!")
}


module.exports = seedSup