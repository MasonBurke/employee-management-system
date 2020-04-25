const mysql = require("mysql");

const inquirer = require("inquirer")

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Bike4life!",
    port: 3306,
    database: "employeesDB"
});

connection.connect((err) => {
    if (err) throw err;

});
