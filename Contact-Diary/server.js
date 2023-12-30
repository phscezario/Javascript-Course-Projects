import serverless from 'serverless-http';

require('dotenv').config();

const path = require('path');
const express = require('express');
const helmet = require('helmet');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const mongoStore = require('connect-mongo');
const flashMessages = require('connect-flash');
const router = require('./router');
const csrf = require('csurf');
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

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
        app.emit('Connected');
    })
    .catch((e) => console.log('Database Connetion Error... ' + e));

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(sessionOptions);

app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(flashMessages());

app.use(csrf());

app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);

app.use(router);

app.on('Connected', () => {
    app.listen(80, () => {
        console.log('Access http://localhost');
        console.log('Server start in port: 80');
    });
});

export const handler = serverless(app);
