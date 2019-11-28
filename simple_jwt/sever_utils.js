const jwt = require('jsonwebtoken')

function authenticationIsOk(req,user) {
    const body = req.body;
    return (body.email == user.email) && (body.password == user.password);
  }

// --- todo !!!! make secret longer
const secret = 'mySecret';

function createToken(user){
    const validTimeSec = 20*60;
    const expirationDate = Date.now()/1000 + validTimeSec;
    const token = jwt.sign({userID : user.email , exp : expirationDate},secret)
    return token;
}

module.exports.authenticationIsOk = authenticationIsOk;  
module.exports.createToken = createToken;
module.exports.secret = secret;