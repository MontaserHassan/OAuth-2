const router = require('express').Router();
const authRoutes = require('./authRouter.routes');


router.use('/auth', authRoutes);


module.exports = router;