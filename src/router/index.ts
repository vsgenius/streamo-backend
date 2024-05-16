const Router = require('express').Router;
const userController = require('../controllers/user-controller');

const router = new Router();

router.post('/registration',userController.reqistration);
router.get('/activate/:link', userController.activate);

module.exports = router;