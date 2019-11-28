console.log("app is loading");

const express = require("express"),
  PORT = 8080  , utils = require('./sever_utils') ;
const app = express();

app.use(express.json());
// --- todo in production  !!! remove this hard code clear text
// --- add register page and save in db encrypted
const user = { email: "natankrasney@gmail.com", password: "123sae" };

app.get("/home", (req, res) => {
  res.send("<h1>This is home page</h1>");
});


app.post("/login", (req, res) => {
  if (utils.authenticationIsOk(req,user)) {
    res.send(utils.createToken(user));
  } else {
    res.sendStatus(401);
  }
});

app.listen(PORT, () => {
  console.log(`listening on port : ${PORT}`);
});
