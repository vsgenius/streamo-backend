// eslint-disable-next-line prefer-destructuring
const Router = require('express').Router;

const registration = require('../controllers/registration');
const activate = require('../controllers/activate');

const router = new Router();

router.post('/registration', registration);
router.get('/activate/:link', activate);

module.exports = router;
