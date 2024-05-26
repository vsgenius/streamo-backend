// eslint-disable-next-line prefer-destructuring
const Router = require('express').Router;
const { body } = require('express-validator');

const registration = require('../controllers/auth/registration');
const activate = require('../controllers/auth/activate');
const login = require('../controllers/auth/login');
const logout = require('../controllers/auth/logout');
const refresh = require('../controllers/auth/refresh');
const getStreams = require('../controllers/streams/getAllStreams');

const authMiddleware = require('../middlewares/auth-middleware');

const router = new Router();

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 5, max: 32 }),
  registration,
);
router.get('/activate/:link', activate);
router.post('/login', login);
router.get('/logout', logout);
router.get('/refresh', refresh);
router.get('/streams', authMiddleware, getStreams);

module.exports = router;
