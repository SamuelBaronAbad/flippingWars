const jwt = require('jwt-simple');
const moment = require('moment');

const SECRET_KEY = "Smg4f5.7u/huhd.jAmxQwe";

exports.createAccessToken = function(user){

    // Este objeto lleva la info del usuario, la cual podremos obtener luego a través del token
    const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        createToken: moment().unix(),
        expToken: moment().add(3, "hours").unix()
    }

    return jwt.encode(payload, SECRET_KEY);
}

exports.createRefreshToken = function(user){
    const payload = {
        id: user._id,
        exp: moment().add(30, "days").unix()
    }

    return jwt.encode(payload, SECRET_KEY)
}

exports.decodeToken = function(token) {
    return jwt.decode(token, SECRET_KEY, true)
}