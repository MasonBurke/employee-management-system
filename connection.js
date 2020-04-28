const mysql = require("mysql");
const util = require("util")

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Bike4life!",
    port: 3306,
    database: "employeesDB"
});




connection.connect((err) => {
    if (err) throw err;
    console.log(`connected to mysql as id ${connection.threadId}`)

});

connection.query = util.promisify(connection.query);
module.exports = connection;