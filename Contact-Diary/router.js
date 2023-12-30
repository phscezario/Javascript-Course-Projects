const express = require('express');
const router = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contactController = require('./src/controllers/contactController');

const { loginRequired } = require('./src/middlewares/middleware');

router.get(process.env.BASEURL + '/', loginRequired, homeController.index);

router.get(process.env.BASEURL + '/login', loginController.index);
router.post(process.env.BASEURL + '/login/register', loginController.register);
router.post(process.env.BASEURL + '/login/login', loginController.login);
router.get(process.env.BASEURL + '/login/logout', loginController.logout);

router.get(process.env.BASEURL + '/contact', loginRequired, contactController.index);
router.post(process.env.BASEURL + '/contact/register', loginRequired, contactController.register);
router.get(process.env.BASEURL + '/contact/edit/:id', loginRequired, contactController.edit);
router.post(process.env.BASEURL + '/contact/edit/:id', loginRequired, contactController.update);
router.get(process.env.BASEURL + '/contact/delete/:id', loginRequired, contactController.delete);

module.exports = router;
