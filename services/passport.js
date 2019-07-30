const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy ;
const keys = require('../config/keys');

const mongoose = require('mongoose');

const User = mongoose.model('users');  //  pull users model out of mongoose: 1 argument => pull / 2 arguments => load data into mongoose


const Google_Strategy = new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'     //users redirect to this link after granting permisson using oauth,
}, (accessToken, refreshToken, profile, done) => {
    
    User.findOne({googleId: profile.id})
        .then((newUser) => {
            
            if (newUser){
                //existing user
                // console.log(newUser);
                done(null, newUser);
            }else{
                // user doesn't exist
                User.create({ googleId: profile.id})
                    .then(user => done(null, user))
                   
            }
        })
    
});

passport.serializeUser((user, done) => {
    done(null, user.id);    //user.id => represents id in database 
})

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
    });
})

passport.use(Google_Strategy);

