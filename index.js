const connection = require("./connection")


class DB {
    constructor(connection) {
        this.connection = connection
    }
    viewEmployees() {
        return this.connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department")
    }
    viewRoles() {
        return this.connection.query("SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id")
    }
    viewDepartments() {
        return this.connection.query("SELECT department.id, department.name ")
    }
    addEmployees(){
        return this.connection.query("SELECT employee.id")
    }
    addRoles(){
        return this.connection.query("SELECT role.id")
    }
    addDepartments(){
        return this.connection.query("SELECT department.id")
    }
    updateRoles(){
        return this.connection.query("SELECT role.id")
    }
    exit(){
        return this.connection.query("")
    }

}


module.exports = DB


