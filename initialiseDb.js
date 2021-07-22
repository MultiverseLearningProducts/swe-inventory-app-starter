const {sequelize} = require('./db');
const {Brand} = require('./models/Brand');
const {Flavor} = require('./models/Flavor');

async function initialiseDb() {
    Brand.hasMany(Flavor)
    Flavor.belongsTo(Brand);
    await sequelize.sync();
}

module.exports = initialiseDb;