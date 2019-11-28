console.log("app is loading");

const express = require("express"),
  PORT = 8080  , utils = require('./sever_utils') ,
  jwtVerifier = require('express-jwt');
const app = express();

app.use(express.json());
// --- todo in production  !!! remove this hard code clear text
// --- add register page and save in db encrypted
const user = { email: "natankrasney@gmail.com", password: "123sae" };

// --- route is protected using jwtVerifier
// --- use e.g. postman but you must put Bearer followed by jwt token
// ---  as value (key is Authorization) in the http request headers
app.get("/", jwtVerifier({secret : utils.secret}) ,(req, res) => {
  res.send("This is home page");
});

// --- client must save the jwt token and used later e.g. in /
// --- use e.g. postman with e.g. 
// --- { email: "natankrasney@gmail.com", password: "123sae"}
// --- in the request body
app.post("/login", (req, res) => {
  if (utils.authenticationIsOk(req,user)) {
    res.send(utils.createToken(user));
  } else {
    res.sendStatus(401);
  }
});

// --- middleware to handle error in general and UnauthorizedError error in particular: 
//     - wrong email \ password
//     - token has expired
app.use((err,req,res,next) =>{
  if(err.name == 'UnauthorizedError'){
    res.status(401).send(err.message);
  }
})

app.listen(PORT, () => {
  console.log(`listening on port : ${PORT}`);
});
