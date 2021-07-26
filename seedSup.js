const path = require('path');
const fs = require('fs').promises;

const {sequelize} = require('./db');
const {Supplier} = require('./models');


const seedSup = async () => {

    await sequelize.sync({ force: true });

    const suppliersSeedPath = path.join(__dirname, 'suppliers.json'); // creates path to seed data
    const suppliersBuffer = await fs.readFile(suppliersSeedPath); // reads json
    const {suppliersData} = JSON.parse(String(suppliersBuffer)); //parses supplierData

    const suppliersDataPromises = suppliersData.map(supplier => Supplier.create(supplier))
    await Promise.all(suppliersDataPromises)
    console.log("db populated!")
}

module.exports = seedSup