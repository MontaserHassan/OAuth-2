const router = require('express').Router();
const passport = require('passport');



// ---------------------------------------- login ----------------------------------------


router.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: 'logged in success',
            user: req.user
        });
    }
});

router.get('/login/failure', (req, res) => {
    if (req.user) {
        res.status(401).json({
            success: false,
            message: 'logged in failed',
            user: req.user
        });
    }
});


// ---------------------------------------- logout ----------------------------------------


router.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) {
            console.error('Error logging out:', err);
            return res.status(500).json({ success: false, message: 'Error logging out' });
        }
        res.redirect(process.env.CLIENT_URL);
    });
});


// ---------------------------------------- google ----------------------------------------


router.get('/google', passport.authenticate('google', { scope: ["profile"] })); // display google form 

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: '/login/failure'
})); // will go to google to send client id, secret and accessCode and return to access user data


// ---------------------------------------- github ----------------------------------------


router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get("/github/callback", passport.authenticate("github", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failure",
}));


// ---------------------------------------- facebook ----------------------------------------


router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

router.get("/facebook/callback", passport.authenticate("facebook", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failure",
}));



module.exports = router;