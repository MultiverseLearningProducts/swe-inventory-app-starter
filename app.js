const express = require('express');
const Handlebars = require('handlebars');
const expressHandlebars = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const {sequelize} = require('./db');
const {Brand} = require('./models');
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

// BRAND ROUTES ------------------------------------------------------------------------------------------------------------
app.get('/brands', async (req, res) => {
    const brands= await Brand.findAll()
    res.render('brands', {brands}); //points to brands handlebar
})

app.get('/brands/:id', async (req, res) => {
    const brand = await Brand.findByPk(req.params.id)
    res.render('brand', {brand}); 
})

// FLAVOR ROUTES ------------------------------------------------------------------------------------------------------------
app.get('/flavors', async (req, res) => {
    const flavors = await Flavor.findAll();
    res.render('flavors', {flavors})
});

app.get('/flavors/:id', async (req, res) => {
    const flavors= await Flavor.findByPk(req.params.id,{
        include:{
            model:Flavor
        }
    });
    res.render("flavor", { flavors });
})


app.listen(PORT, () => {
    sequelize.sync({force: true});
    console.log(`Your server is running on http://localhost:${PORT}`);
})