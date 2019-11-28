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
app.get("/", jwtVerifier({secret : utils.secret}) ,(req, res) => {
  res.send("<h1>This is home page</h1>");
});


app.post("/login", (req, res) => {
  if (utils.authenticationIsOk(req,user)) {
    res.send(utils.createToken(user));
  } else {
    res.sendStatus(401);
  }
});

// --- handles UnauthorizedError error
app.use((err,req,res,next) =>{
  if(err.name == 'UnauthorizedError'){
    res.status(401).send(err.message);
  }
})

app.listen(PORT, () => {
  console.log(`listening on port : ${PORT}`);
});
