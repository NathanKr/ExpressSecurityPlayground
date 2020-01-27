const jwt = require("jsonwebtoken");

function authenticationIsOk(req, user) {
  const body = req.body;
  return body.email == user.email && body.password == user.password;
}

const secret = "xa12LA-9&%";

function createToken(user) {
  const validTimeSec = 20 * 60; // --- 20 minutes
  const expirationDate = Date.now() / 1000 + validTimeSec;
  // --- userID is part of jwt RFC
  // --- exp is part of jwt rfc check here https://tools.ietf.org/html/rfc7519#section-4.1
  const token = jwt.sign({ userID: user.email, exp: expirationDate }, secret);
  return token;
}

module.exports = {
  authenticationIsOk: authenticationIsOk,
  createToken: createToken,
  secret: secret
};
