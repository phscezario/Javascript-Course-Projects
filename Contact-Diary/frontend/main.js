import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './assets/css/style.css';
import Login from './classes/Login';

const registerForm = new Login('.form-register');
const loginForm = new Login('.form-login');

registerForm.init();
loginForm.init();
