const express = require('express');
const router = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contactController = require('./src/controllers/contactController');

const { loginRequired } = require('./src/middlewares/middleware');

router.get('/', loginRequired, homeController.index);

router.get('/login', loginController.index);
router.post('/login/register', loginController.register);
router.post('/login/login', loginController.login);
router.get('/login/logout', loginController.logout);

router.get('/contact', loginRequired, contactController.index);
router.post('/contact/register', loginRequired, contactController.register);
router.get('/contact/edit/:id', loginRequired, contactController.edit);
router.post('/contact/edit/:id', loginRequired, contactController.update);
router.get('/contact/delete/:id', loginRequired, contactController.delete);

module.exports = router;
