const bcrypt = require("bcryptjs");

const clearTextPassword = 
process.argv[2] ? process.argv[2] : 'abc123';


const salt = bcrypt.genSaltSync(8);
// --- there is also an async version of hashsync
// --- hashed password should be stored in the databasexc
const hashedPassword = bcrypt.hashSync(clearTextPassword, salt);

console.log(`password : ${clearTextPassword} , hashed password : ${hashedPassword}`);

// --- there is also an async version of compareSync
const passwordAreSame = bcrypt.compareSync(clearTextPassword,hashedPassword);

console.log(` passwordAreSame : ${passwordAreSame}`);



