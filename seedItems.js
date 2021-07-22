const path = require('path');
const fs = require('fs').promises;

const {sequelize} = require('./db');
const {Item} = require('./models');


const seedItems = async () => {

    await sequelize.sync({force: true});

    const itemsSeedPath = path.join(__dirname, 'items.json'); // creates path to seed data
    
    const itemsBuffer = await fs.readFile(itemsSeedPath); // reads json
    console.log(itemsBuffer, 'this is itemBuffer')
    const {itemsData} = JSON.parse(String(itemsBuffer)); //parses data
    
    const itemsDataPromises = itemsData.map(item => Item.create(item))
    await Promise.all(itemsDataPromises)
    
    console.log("db populated items!")
}


module.exports = seedItems