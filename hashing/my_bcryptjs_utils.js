const bcrypt = require("bcryptjs");

function hashPasswordSync(clearTextPassword){
    const salt = bcrypt.genSaltSync(8);
    // --- there is also an async version of hashsync
    // --- hashed password should be stored in the database
    const hashedPassword = bcrypt.hashSync(clearTextPassword, salt);

    return hashedPassword;
}

module.exports.hashPasswordSync = hashPasswordSync;