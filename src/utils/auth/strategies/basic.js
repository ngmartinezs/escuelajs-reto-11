const passport = require('passport');
const {BasicStrategy} = require('passport-http');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const UsersService = require('../../../services/users.js');

passport.use(new BasicStrategy(async function(email, password,cb){
    const usersService = new UsersService();

    try {
        const user = await usersService.getUser({email});


        if( !user ){
            return cb(boom.unauthorized(),false);
        }

        if(!(await bcrypt.compare(password, user.password)))
        {
            return cb(boom.unauthorized(),false);
        }
        
        delete user.hashedPassword;

        

        return cb(null, user);

    } catch (error) {
        return cb(error);
    }
}));