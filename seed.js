const path = require('path');
const fs = require('fs').promises;

const {sequelize} = require('./db');
const {Sauce} = require('./models');


const seed = async () => {

    await sequelize.sync({ force: true });

    const seedPath = path.join(__dirname, 'sauces.json');
    const buffer = await fs.readFile(seedPath);
    const {data} = JSON.parse(String(buffer));

    const saucePromises = data.map(sauce => Sauce.create(sauce))
    await Promise.all(saucePromises)
    console.log("db populated!")
}


module.exports = seed