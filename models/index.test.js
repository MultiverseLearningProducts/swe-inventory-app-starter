const {Sauce} = require('./index'); //change to Inventory models
const {sequelize} = require('../db');

describe('Sauce Model', () => {		//change test to Inventory models
	beforeAll(async () => {
		await sequelize.sync({force: true})
	});

	test('can create a Sauce', async() => {
		const testSauce = await Sauce.create({name : 'Cholula'})
		expect(testSauce.name).toBe('Cholula')
	})


})