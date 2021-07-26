const path = require('path');
const fs = require('fs').promises;

const {sequelize} = require('./db');
const {Supplier} = require('./models');


const Supplierseed = async () => {

    await sequelize.sync({ force: true });

    const supplierSeedPath = path.join(__dirname, 'supplier.json'); // creates path to seed data
    const supplierBuffer = await fs.readFile(supplierSeedPath); // reads json
    const {supplierData} = JSON.parse(String(supplierBuffer)); //parses warehousesData

    const suppliersDataPromises = supplierData.map(supplier => Supplier.create(supplier))
    await Promise.all(suppliersDataPromises)
    console.log("db populated!")
}

module.exports = Supplierseed