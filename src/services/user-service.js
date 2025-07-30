const {UserRepository} = require('../repositories');
const AppError = require("../utils/errors/app-error");
const {Auth} = require('../utils/common')
const userRepository = new UserRepository();
const{StatusCodes} = require('http-status-codes');
const  bcrypt = require('bcrypt')
async function createUser(data) {
    try{
        const user = await userRepository.create(data);
        return user;

    }catch(error){
        console.error(error)
        if(error.name == 'SequelizeValidationError'){
            let explanation = []
            error.errors.forEach(ere => {
                explanation.push(ere.message);
            });
            console.log(explanation)
        throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create a new user",StatusCodes.INTERNAL_SERVER_ERROR);
    }
    
}

 async function signin(data) {
    try {
        const user = await userRepository.getUserByEmail(data.email);
        if(!user){
            throw new AppError ("User Email doesn't even exist", StatusCodes.NOT_FOUND)
        }
        const passwordMatch = Auth.checkPassword(data.password,user.password);
        if(!passwordMatch){
            throw new AppError('User is sending wroing information',StatusCodes.BAD_REQUEST);
        }
        const jwt = Auth.createToken({
            id : user.id,
            email : user.email
        })
        return jwt;
    } catch (error) {
        console.log(error);
        if(error instanceof AppError){
            throw error
        }
    throw new AppError("Cannot create a new user",StatusCodes.INTERNAL_SERVER_ERROR);
    }
 }



module.exports = {
    createUser,
    signin
}