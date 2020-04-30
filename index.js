const connection = require("./connection")


class DB {
    constructor(connection) {
        this.connection = connection
    }
    allEmployees() {
        return this.connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id ")
    }
    allRoles() {
        return this.connection.query("SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id")
    }
    allDepartments() {
        return this.connection.query("SELECT department.id, department.name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id GROUP BY department.id, department.name")
    }
    plusEmployees(employee){
        return this.connection.query("INSERT INTO employee SET ?", employee)
    }
    plusRoles(role){
        return this.connection.query("INSERT INTO role SET ?", role)
    }
    plusDepartments(department){
        return this.connection.query("INSERT INTO department SET ?", department)
    }
    newRoles(roleID, employeeID){
        return this.connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [roleID, employeeID])
        }

}


module.exports =  new DB(connection)


