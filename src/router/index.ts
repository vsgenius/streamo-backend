import Router from 'express';

const userController = require('../controllers/user-controller');

const router = Router();

router.post('/registration', userController.reqistration);
router.get('/activate/:link', userController.activate);

module.exports = router;
