import serverless from 'serverless-http';

require('dotenv').config();

const path = require('path');
const express = require('express');
const helmet = require('helmet');
const api = express();
const mongoose = require('mongoose');
const session = require('express-session');
const mongoStore = require('connect-mongo');
const flashMessages = require('connect-flash');
const router = require('../../router');
const csrf = require('csurf');
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('../../src/middlewares/middleware');

const sessionOptions = session({
    secret: process.env.SESSIONSECRET,
    store: mongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
    },
});

mongoose
    .connect(process.env.CONNECTIONSTRING)
    .then(() => {
        console.log('Connected to Database!');
        api.emit('Connected');
    })
    .catch((e) => console.log('Database Connetion Error... ' + e));

api.set('views', path.resolve(__dirname, 'src', 'views'));
api.set('view engine', 'ejs');

api.use(sessionOptions);

api.use(helmet());

api.use(express.urlencoded({ extended: true }));
api.use(express.json());
api.use(express.static(path.resolve(__dirname, 'public')));

api.use(flashMessages());

api.use(csrf());

api.use(middlewareGlobal);
api.use(checkCsrfError);
api.use(csrfMiddleware);

api.use(router);

api.on('Connected', () => {
    api.listen(3000, () => {
        console.log('Access http://localhost:3000');
        console.log('Server start in port: 3000');
    });
});

api.use('/api/', router.router);

export const handler = serverless(api);
