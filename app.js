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
app.use(require('body-parser').urlencoded());

seed();


seedSup();
seedW();
seedInv();
seedUser();

app.get('/favicon.ico', (req, res) => {
    res.sendStatus(404);
});

//Item Routes

app.get('/items', async (req, res) => {
    const items = await Item.findAll()
    res.render('items', {items}); //points to items handlebar
})

app.get('/', async (req, res) => {
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

app.get('/supplier/:id' , async(req,res) => {
    const supplier = await Supplier.findByPk(req.params.id)
    res.render('supplier', {supplier})
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

app.get('/homepage', async (req, res) => {
    const homepage = await Warehouse.findAll()
    res.render('homepage', {homepage}); //points to items handlebar
})

app.get('/inventory/:id', async (req,res) => {
    const inventory = await Inventory.findByPk(req.params.id)
    res.render("inventory", {inventory} )
})
//adding item routes
app.get('/add-item-form', (req, res) => {
    res.render('addItemForm');
})

app.post('/new-item', async (req, res) => {
    const newitem = await Item.create(req.body);
    const founditem = await Item.findByPk(newitem.id);
    if(founditem) {
        res.status(201).send('NEW item CREATED!!!')
    } else {
        console.log("NO item created")
    }
    


})

//^^^^^^ tier 2

app.delete('/remove-item/:id', async (req, res) => {
    await Item.destroy({where: { id: req.params.id }})
});

app.listen(PORT, () => {
    sequelize.sync({force: true});
    console.log(`Your server is running on http://localhost:${PORT}`);
})