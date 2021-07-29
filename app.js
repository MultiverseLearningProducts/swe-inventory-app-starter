const express = require('express');
const Handlebars = require('handlebars');
const expressHandlebars = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const {sequelize} = require('./db');
const {Item, User, Warehouse, Supplier, Inventory} = require('./models');
const seed = require('./seed.js')
const seedSup = require("./seedSup.js")
const seedW = require("./seedW.js")
const seedUser = require("./seedUser.js")
const seedInv = require("./seedInv.js");
const { prototype } = require('express-handlebars/lib/express-handlebars');


const PORT = 3000;

const app = express();

// setup our templating engine
const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})
app.engine('handlebars', handlebars);
app.set('view engine', 'handlebars');

// serve static assets from the public/ folder
app.use(express.static('public'));

seed();
seedSup();
seedW();
seedInv();
seedUser();

app.get('/favicon.ico', (req, res) => {
    res.sendStatus(404);
});

//Item Routes

app.get('/', async (req, res) => {
    const items = await Item.findAll()
    res.render('items', {items}); //points to items handlebar
})

app.get('/items/:id', async (req, res) => {
    const item = await Item.findByPk(req.params.id)
    res.render('item', {item}); 
    console.log({item}.description);
})

app.delete('/remove-item/:id', async (req, res) => {
    await Item.destroy({where: { id: req.params.id }})
});

//Warehouse Routes

app.get('/warehouses', async (req, res) => {
    const warehouses = await Warehouse.findAll();
    res.render('warehouses', {warehouses});
})

app.get('/warehouses/:id', async (req, res) => {
    const warehouse = await Warehouse.findByPk(req.params.id);
    res.render('warehouse', {warehouse});
})

//User Routes

app.get('/:name', async (req, res) => {
    const user = await User.findAll({where:{name:req.params}});
    console.log(user)   
    res.render('user', {user});
})

//Supplier Routes

app.get('/suppliers/:name', async (req, res) => {
    const supplier = await Supplier.findAll({where:{name:req.params.name}});
    res.render('supplier', {supplier});
})

app.listen(PORT, () => {
    sequelize.sync({force: true});
    console.log(`Your server is running on http://localhost:${PORT}`);
})

