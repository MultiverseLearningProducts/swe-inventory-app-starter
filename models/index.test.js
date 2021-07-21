const {Item} = require('./index');
const {sequelize} = require('../db');

describe('Item Model', () => {
	beforeAll(async () => {
		await sequelize.sync({force: true})
	});

<<<<<<< HEAD
	test('can create a item', async() => {
		const testItem = await Sauce.create({name : 'Cholula'})
=======
	test('can create a Item', async() => {
		const testItem = await Item.create({name : 'Cholula'})
>>>>>>> 75c28009afee90fccbb5febdac0964081634ef3b
		expect(testItem.name).toBe('Cholula')
	})


})