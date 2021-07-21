const {Item} = require('./index');
const {sequelize} = require('../db');

describe('Item Model', () => {
	beforeAll(async () => {
		await sequelize.sync({force: true})
	});

	test('can create a item', async() => {
		const testItem = await Sauce.create({name : 'Cholula'})
		expect(testItem.name).toBe('Cholula')
	})


})