const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {ServerConfig} = require('../../config');
const serverConfig = require('../../config/server-config');
  function checkPassword(plainePassword,encryptedPassword) {
    try {
        return   bcrypt.compareSync(plainePassword,encryptedPassword);
    } catch (error) {
        console.log(error);
        throw error;
    }
  }

  function createToken(input) {
    try {
        return   jwt.sign(input,ServerConfig.JWT_SECRET,{expiresIn : serverConfig.JWT_EXPIRY })      
    } catch (error) {
        throw error     
    }
    
 }

 module.exports = {
    checkPassword,
    createToken
 }