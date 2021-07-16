const express = require('express');
const Handlebars = require('handlebars');
const expressHandlebars = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const {sequelize} = require('./db');
const {Sauce} = require('./models');

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

const seedDb = async () => {

    await sequelize.sync({ force: true });

    const sauces = [
        {name : 'Sriracha', image : '/img/Sriracha.gif'},
        {name : 'Franks', image: '/img/Franks.gif'},
        {name : 'Tobasco', image: '/img/Tobasco.gif'}
    ]

    const saucePromises = sauces.map(sauce => Sauce.create(sauce))
    await Promise.all(saucePromises)
    console.log("db populated!")
}

seedDb();

app.get('/sauces', async (req, res) => {
    const sauces= await Sauce.findAll()
    res.render('sauces', {sauces}); //points to sauces handlebar
})


app.listen(PORT, () => {
    sequelize.sync({force: true});
    console.log(`Your server is running on http://localhost:${PORT}`);
})