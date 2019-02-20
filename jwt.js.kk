const expressJwt = require('express-jwt');
const config = require('./config');
const userService = require('./services');

module.exports = jwt;

function jwt() {
    const secret = config.SECRET_TOKEN;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/isAuth',
            '/users/signup'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};