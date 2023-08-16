const User = require('../models/user.model');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const passport = require('passport');



// let authUser = (request, accessToken, refreshToken, profile, done) => {
//     console.log('accessToken ' + accessToken);
//     console.log('refreshToken ' + refreshToken);
//     console.log('Profile: ' + JSON.stringify(profile, null, 2));
//     return done(null, profile);
// };

let authUser = async (accessToken, refreshToken, profile, done) => {
    // console.log('accessToken ' + accessToken);
    // console.log('refreshToken ' + refreshToken);
    console.log('Profile: ' + JSON.stringify(profile, null, 2));
    try {
        const user = await User.findOne({ providerId: profile.id });
        if (user) {
            done(null, user);
        } else {
            const newUser = new User({
                username: profile.displayName,
                provider: 'google',
                providerId: profile.id,
                photos: profile.photos[0].value
            });
            const savedUser = await newUser.save();
            done(null, savedUser);
        }
    } catch (error) {
        done(error);
    }
};

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
    }, authUser
));

// passport.use(new FacebookStrategy(
//     {
//         clientID: process.env.FACEBOOK_CLIENT_ID,
//         clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//         callbackURL: "/auth/facebook/callback"
//     },
//     function (accessToken, refreshToken, profile, done) {
//         console.log('accessToken ' + accessToken);
//         console.log('refreshToken ' + refreshToken);
//         console.log('profile ' + profile);
//         done(null, profile); // if true 
//     }
// ));

// passport.use(new GithubStrategy(
//     {
//         clientID: process.env.GITHUB_CLIENT_ID,
//         clientSecret: process.env.GITHUB_CLIENT_SECRET,
//         callbackURL: "/auth/github/callback"
//     },
//     function (accessToken, refreshToken, profile, done) {
//         console.log('accessToken ' + accessToken);
//         console.log('refreshToken ' + refreshToken);
//         console.log('profile ' + profile);
//         done(null, profile); // if true 
//     }
// ));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (user, done) => {
    // try {
    //     const user = await User.findById(id);
    done(null, user);
    // } catch (error) {
    //     done(error);
    // }
});