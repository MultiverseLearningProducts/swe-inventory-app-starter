const path = require('path');
const fs = require('fs').promises;

const {sequelize} = require('./db');
const {User} = require('./models');


const seedUser= async () => {

    await sequelize.sync({ force: true });

    const usersSeedPath = path.join(__dirname, 'users.json'); // creates path to seed data
    const usersBuffer = await fs.readFile(usersSeedPath); // reads json
    const {usersData} = JSON.parse(String(usersBuffer)); //parses supplierData

    const usersDataPromises = usersData.map(users => User.create(users))
    await Promise.all(usersDataPromises)
    console.log("db populated!")
}

module.exports = seedUser