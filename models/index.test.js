const {Sauce} = require('./index');
const {sequelize} = require('../db');

describe('Sauce Model', () => {
	beforeAll(async () => {
		await sequelize.sync({force: true})
	});

	test('can create a Sauce', async() => {
		const testSauce = await Sauce.create({name : 'Cholula'})
		expect(typeof testSauce).toBe('object')
	})

	test('Sauce has a name', async() => {
		const testSauce = await Sauce.create({name : 'Cholula'})
		expect(testSauce.name).toBe('Cholula')
	})

	test('Sauce has an image', async() => {
		const imgStr = 'https://media.giphy.com/media/L1bnwbn9DWMlfLO6ME/giphy.gif';
		const testSauce = await Sauce.create({name : 'Cholula', image: imgStr})
		expect(testSauce.image).toBe(imgStr)
	})


})