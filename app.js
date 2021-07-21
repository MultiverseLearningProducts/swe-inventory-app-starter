const express = require('express');
const Handlebars = require('handlebars');
const expressHandlebars = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const {sequelize} = require('./db');
const {Item} = require('./models');
const seed = require('./seed')

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

<<<<<<< HEAD
app.get('/sauces', async (req, res) => {
    const items= await Item.findAll()
    res.render('sauces', {sauces}); //points to sauces handlebar
})

app.get('/sauces/:id', async (req, res) => {
    const item = await Item.findByPk(req.params.id)
=======
app.get('/items', async (req, res) => {
    const items= await Sauce.findAll()
    res.render('items', {items}); //points to items handlebar
})

app.get('/items/:id', async (req, res) => {
    const sauce = await Sauce.findByPk(req.params.id)
>>>>>>> 75c28009afee90fccbb5febdac0964081634ef3b
    res.render('sauce', {sauce}); 
})

app.listen(PORT, () => {
    sequelize.sync({force: true});
    console.log(`Your server is running on http://localhost:${PORT}`);
})