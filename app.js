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
const seedInv = require("./seedInv.js")




const PORT = process.env.PORT || 3000;

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


app.get('/items', async (req, res) => {
    const items = await Item.findAll()
    res.render('items', {items}); //points to items handlebar
})

app.get('/items/:id', async (req, res) => {
    const item = await Item.findByPk(req.params.id)
    res.render('item', {item}); 
})
app.get('/allitems', async (req, res) => {
    const items = await Item.findAll()
    res.json(items); //points to items handlebar
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
    res.json('warehouse', {warehouse});
})



app.listen(PORT, () => {
    sequelize.sync({force: true});
    console.log(`Your server is running on http://localhost:${PORT}`);
})