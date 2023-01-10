const router = require('express').Router();
const {  User, Games } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
	try {
		let games = [];
		for( let i=0;i<3;i++) {
			let random = Math.floor(Math.random() * 101);
			const findGame = await Games.findByPk(random);

			const loadGame = findGame.get({ plain: true });

			games.push(loadGame)
		}
		res.render('homepage', {
			games,
		})
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/profile', withAuth, async (req, res) => {
	try {
	  // Find the logged in user based on the session ID
	  const userData = await User.findByPk(req.session.user_id, {
		attributes: { exclude: ['password'] },
		include: [{ model: Games }],
	  });
  
	  const user = userData.get({ plain: true });
  
	  res.render('profile', {
		...user,
		logged_in: true
	  });
	} catch (err) {
	  res.status(500).json(err);
	}
});

router.get('/login', (req, res) => {
	// If the user is already logged in, redirect the request to another route
	if (req.session.logged_in) {
		res.redirect('/profile');
		return;
	}

	res.render('login');
});

module.exports = router;
