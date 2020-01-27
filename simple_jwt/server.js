console.log("app is loading");

const express = require("express"),
  PORT = 8080,
  utils = require("./auth_utils"),
  // --- express-jwt is a middleware
  jwtVerifier = require("express-jwt");
const app = express();

app.use(express.json());
// --- todo in production  !!! remove this hard code clear text
// --- add register page and save hashed in db 
const user = { email: "natankrasney@gmail.com", password: "123sae" };

// --- client must save the jwt token and used later e.g. in /
// --- use e.g. postman with e.g.
// --- { email: "natankrasney@gmail.com", password: "123sae"}
// --- in the request body
app.post("/login", (req, res) => {
  console.log('access /login')

  if (utils.authenticationIsOk(req, user)) {
    res.send(utils.createToken(user));
  } else {
    res.sendStatus(401);
  }
});

// --- route is protected using jwtVerifier
// --- use e.g. postman but you must put Bearer followed by jwt token
// ---  as value (key is Authorization) in the http request headers
app.get("/meetings", jwtVerifier({ secret: utils.secret }), (req, res) => {
  // --- notice that express-jwt is a middleware which created user in req
  console.log('access /meetings')
  
  res.send(
    `Welcome Logged in User . This is meetings page . I got this from JWT : ${req.user.userID}  . `
  );
});


app.listen(PORT, () => {
  console.log(`listening on port : ${PORT}`);
});
