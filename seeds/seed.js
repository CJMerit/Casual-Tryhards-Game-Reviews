const sequelize = require('../config/connection');
const { Games } = require('../models');

const gamesData = require('./Games.json');

const seedDatabase = async () => {
	await sequelize.sync({ force: true });

	const games = await Games.bulkCreate(gamesData, {
		individualHooks: true,
		returning: true
	});

	process.exit(0);
};

seedDatabase();
