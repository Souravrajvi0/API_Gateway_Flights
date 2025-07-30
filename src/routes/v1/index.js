const express = require('express');

const { InfoController } = require('../../controllers');
const UserRoutes = require('./user-routes')
const router = express.Router();
router.use('/user',UserRoutes)
router.get('/info', InfoController.info);


module.exports = router;
