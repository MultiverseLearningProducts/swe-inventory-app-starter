const path = require('path');
const fs = require('fs').promises;

const {sequelize} = require('./db');
const {Brand} = require('./models');


const seed = async () => {

    await sequelize.sync({ force: true });

    const seedPath = path.join(__dirname, 'icecream.json'); // creates path to seed data
    const buffer = await fs.readFile(seedPath); // reads json
    const {data} = JSON.parse(String(buffer)); //parses data

    const dataPromises = data.map(item => Brand.create(item))
    await Promise.all(dataPromises)
    console.log("db populated!")
}


module.exports = seed