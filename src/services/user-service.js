const {UserRepository} = require('../repositories');
const AppError = require("../utils/errors/app-error")
const userRepository = new UserRepository();
const{StatusCodes} = require('http-status-codes')
async function createUser(data) {
    try{
        const user = await userRepository.create(data);
        return user;

    }catch(error){
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

module.exports = {
    createUser
}