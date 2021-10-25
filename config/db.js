// require("dotenv").config(); // added just to run this script alone

// setting up the connection with the MySql database
// 'mysql2' provides a promise wrapper to work with the database unlike 'mysql'
const mysql = require("mysql2");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
});

/* - testing the connection - */
// let query = "SELECT * FROM users";

// pool.query(query, (err, res) => {
//     if (err) throw err;

//     console.log(res);
// })

// works just fine #
/* -------------------------- */

// to have access to the database in other files
module.exports = pool.promise();