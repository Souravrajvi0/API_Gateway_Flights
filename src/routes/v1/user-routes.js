const express = require('express');
const router = express.Router();
const {UserController} = require('../../controllers');
const {AuthMiddleware} = require('../../middlewares')

router.post('/signup',UserController.createUser);
router.post('/signin',
    AuthMiddleware.validateAuthRequest,
    UserController.signin);

module.exports = router