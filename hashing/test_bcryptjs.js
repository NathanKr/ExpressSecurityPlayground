const bcrypt = require("bcryptjs");

const clearTextPassword = 
process.argv[2] ? process.argv[2] : 'abc123';


const start = new Date();
const salt = bcrypt.genSaltSync(8);
// --- there is also an async version of hashsync
// --- hashed password should be stored in the database
const hashedPassword = bcrypt.hashSync(clearTextPassword, salt);

console.log(`password : ${clearTextPassword} , hashed password : ${hashedPassword}`);

// --- there is also an async version of compareSync
// --- this is what should be done e.g. in login
const passwordAreSame = bcrypt.compareSync(clearTextPassword,hashedPassword);

console.log(` passwordAreSame : ${passwordAreSame}`);
const end = new Date();
console.log(`total time ms : ${end.getMilliseconds()-start.getMilliseconds()}`);



