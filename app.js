const express = require('express');
const Handlebars = require('handlebars');
const expressHandlebars = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const {sequelize} = require('./db');
const {Item, User, Warehouse} = require('./models');
const seed = require('./seed');
const warehouseSeed = require('./warehousesSeed');

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
warehouseSeed();

app.get('/items', async (req, res) => {
    const items = await Item.findAll()
    res.render('items', {items}); //points to items handlebar
})

app.get('/items/:id', async (req, res) => {
    const item = await Item.findByPk(req.params.id)
    res.render('item', {item}); 
})

app.get('/all-items', async (req, res) => {
    const items = await Item.findAll()
    res.render('allItems', {items});
})

app.get('/all-users', async (req, res) => {
    const allUsers = await User.create({name:"Damon", role:"BOSS", root: true});
    res.json(allUsers);
})

app.get('/warehouses/:id', async (req, res) => {
    const warehouse = await Warehouse.findByPk(req.params.id);
    console.log(warehouse);
    res.render('warehouse', {warehouse});
})

app.listen(PORT, () => {
    sequelize.sync({force: true});
    console.log(`Your server is running on http://localhost:${PORT}`);
})