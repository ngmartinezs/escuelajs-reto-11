const passport  = require('passport');
const {Strategy, ExtractJwt} = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;
const boom = require('@hapi/boom');

const UsersService = require('../../../services/users');
const {config} = require('../../../config/index');

const ops = {
    secretOrKey: config.authJwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

passport.use(new Strategy(ops,
async function(tokenPayload, cb){
    const usersService = new UsersService();

    console.log('tokenPayload',tokenPayload.email);

    try {
        const user = await usersService.getUser({email: tokenPayload.email});

        if(!user){
            return cb(boom.unauthorized, false);
        }

        delete user.password;
       
        return cb({user, scopes: tokenPayload.scopes});
    } catch (error) {
        return cb(error);
    }
}
));