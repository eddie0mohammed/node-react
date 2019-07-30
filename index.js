

const express = require('express');
require('./models/userModel');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');


mongoose.connect(keys.mongoURI, () => {
    console.log('connected to DB')
});

const app = express();

//passport to use cookies for handling authentication state
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, //last for 30 days, then expire
        keys: [keys.cookieKey]
    })
)
app.use(passport.initialize());
app.use(passport.session());

//route

authRoutes(app);




// server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("listening on port", PORT);
})





