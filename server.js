const express = require('express');
require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const drinkCoffee = require('cookie-parser');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.enable('trust proxy')
app.set('trust proxy', 1)

app.use(express.static(path.join(__dirname, "public")))


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(drinkCoffee());
app.use(session({
    saveUninitialized: true,
    resave: true,
    name: 'nogsuuu',
    secret: process.env.SESSION_SECRET || "nogsuu",
    unset: 'destroy',
    cookie: {
        maxAge: 1000*60*60*48,
        secure: (process.env.NODE_ENV && process.env.NODE_ENV === "production") ? true : false
    }
}));


//mongoDB and server
const dbURI = require('./mongo');
const PORT = process.env.PORT || 3000;
const DB = process.env.DB;
//index, api,crud at ang routes hahaha
const pageRoutes = require('./routes/pageRoutes');
const auth = require('./stories/auth');
const crud = require('./stories/crud');
const { main, profile } = require('./navs')

app.use('/mystory', pageRoutes);
app.use('/api', auth);
app.use('/crud', crud);

let sessionify;

app.get('/', (req, res) => {
    sessionify = req.session
    console.log("running")
    res.render('index', {
        myRoutes: sessionify.email ? profile : main
    });
});

mongoose
    .connect(DB)
    .then(() => app.listen(PORT, () => console.log("server port: ", PORT)))
    .catch(failed => console.log(failed))
