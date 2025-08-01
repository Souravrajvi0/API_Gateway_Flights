const { UserService} = require("../services")
const {StatusCodes} = require('http-status-codes')
const{SuccessResponse,ErrorResponse}= require('../utils/common')
async function createUser(req,res) {
    try {
        const user = await UserService.createUser({
            email : req.body.email,
            password : req.body.password
        })
        SuccessResponse.data = user;
     return res
              .status(StatusCodes.CREATED)
              .json(SuccessResponse)
        
    } catch (error) {
        ErrorResponse.error = error
        return res
                  .status(error.statusCode)
                  .json(ErrorResponse)
    }
    
}


async function signin(req,res) {
    try {
        const user = await UserService.signin({
            email : req.body.email,
            password : req.body.password
        })
        SuccessResponse.data = user;
     return res
              .status(StatusCodes.CREATED)
              .json(SuccessResponse)
        
    } catch (error) {
        ErrorResponse.error = error
        return res
                  .status(error.statusCode)
                  .json(ErrorResponse)
    }
    
}

module.exports = {
    createUser,
    signin
}