const bcrypt = require("bcryptjs");
my_bcryptjs_utils = require('./my_bcryptjs_utils');

const clearTextPassword = 
process.argv[2] ? process.argv[2] : 'abc123';

const start = new Date();
const hashedPassword = my_bcryptjs_utils.hashPasswordSync(clearTextPassword);

console.log(`password : ${clearTextPassword} , hashed password : ${hashedPassword}`);

// --- there is also an async version of compareSync
// --- this is what should be done e.g. in login
const passwordAreSame = bcrypt.compareSync(clearTextPassword,hashedPassword);
console.log(` passwordAreSame : ${passwordAreSame}`);

const end = new Date();
console.log(`total time ms : ${end.getTime()-start.getTime()}`);



