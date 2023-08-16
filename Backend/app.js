const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
require('dotenv').config();
const passportSetup = require('./config/passport-setup.config');
// const cookieSession = require('cookie-session');
const session = require('express-session');
const cors = require('cors');
const routes = require('./routes/index.routes');
const passport = require('passport');


const app = express();

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'none'"],
        fontSrc: ["'self'", 'data:'], // Allow fonts to be loaded from 'self' and 'data:'
        // Add other directives as needed
    },
}));

// app.use(cookieSession({
//     name: "session",
//     keys: ["OAuth-2.0"],
//     maxAge: 24 * 60 * 60 * 1000,
//     rolling: true
// }));

app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
}));

app.use(cors({
    origin: 'http://localhost:3000',
    methods: "GET, POST, PATCH, DELETE",
    credentials: true,
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(routes);


app.listen(PORT, () => console.log(`app listening on PORT ${PORT}!`));