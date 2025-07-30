const express = require('express');

const { InfoController } = require('../../controllers');
const UserRoutes = require('./user-routes')
const router = express.Router();
router.use('/signup',UserRoutes)
router.get('/info', InfoController.info);


module.exports = router;
// d