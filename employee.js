const { prompt } = require("inquirer")
const DB = require("./index")
require("console.table")

const options = [
    {
        name: "add",
        type: "list",
        message: "Which would you like to add?",
        choices: ["Employee", "Department", "Role", "exit"]
    }, {
        name: "view",
        type: "list",
        message: "Which would you like to view?",
        choices: ["Employee", "Department", "Role", "exit"]
    }, {
        name: "update",
        type: "list",
        message: "Which would you like to update?",
        choices: ["Employee", "Department", "Role", "exit"]
    }
];

function writeToFile(fileName, data) {
    return false.writeFileSync(path.join(process.cwd(), filename), data)
}
async function loadPrompts() {
    const { choice } = await prompt([
        {
            name: "choice",
            type: "list",
            message: "What would you like to do?",
            choices: [{ name: "View all employees", value: "VIEW_EMPLOYEES" }, { name: "View all roles", value: "VIEW_ROLES" }, { name: "View all departments", value: "VIEW_DEPARTMENTS" },
            { name: "Add employees", value: "ADD_EMPLOYEES" }, { name: "Add roles", value: "ADD_ROLES" }, { name: "Add departments", value: "ADD_DEPARTMENTS" },
            { name: "Update employee roles", value: "UPDATE_ROLES" }, { name: "exit", value: "EXIT" }]

        }
    ])

    switch (choice) {
        case "VIEW_EMPLOYEES":
            return viewEmployees();
        case "VIEW_DEPARTMENTS":
            return viewDepartments();
        case "VIEW_ROLES":
            return viewRoles();
        case "ADD_EMPLOYEES":
            return addEmployees();
        case "ADD_DEPARTMENTS":
            return addDepartments();
        case "ADD_ROLES":
            return addRoles();
        case "UPDATE_ROLES":
            return updateRoles();
        default:
            return exit()

    }
}

async function viewDepartments() {
    const departments = await DB.allDepartments()
    console.table(departments)
    loadPrompts()
}

async function viewRoles() {
    const roles = await DB.allRoles()
    console.table(roles)
    loadPrompts()
}

async function viewEmployees() {
    const employee = await DB.allEmployees()
    console.table(employee)
    loadPrompts()
}

async function addEmployees() {
    const roles = await DB.allRoles()
    const employee = await prompt([
        {
            name: "first_name",
            message: "What is your employees first name?"
        }, {
            name: "Last_name",
            message: "what is your employees last name?"
        }
    ])
    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }))

    const { roleId } = await prompt({
        type: "list",
        name: "roleId",
        message: "What is the employees role?",
        choices: roleChoices
    })
    employee.role_id = roleId
    await DB.plusEmployees(employee)
    loadPrompts()
}

async function addDepartments() {
    const depart = await prompt([
        {
            name: "name",
            message: "What would you like to name the new department?"
        }
    ])


    await DB.plusDepartments(depart)
    console.log(depart.name)
    loadPrompts()
}

async function addRoles(){
    const departments = await DB.allDepartments()
    const departmentChoices = departments.map(({id, name})=>({
        name: name,
        value: id
    }))

    const role = await prompt ([
        {
            name: "title",
            message: "What would you like to name your new role?"
        },{
            name: "salary",
            message:"What is the salary for your new role?"
        },{
            type: "list",
            name: "department_id",
            message: "Which department does the role belong to?",
            choices: departmentChoices
        }
    ])
        await DB.plusRoles(role)
        loadPrompts()
}

async function updateRoles(){
    const employees = await DB.allEmployees()
    const employeeChoices = employees.map(({id, first_name, last_name})=>({
       name: `${first_name} ${last_name}`,
       value: id 
    }))
    const {employeeId} = await prompt([
        {
        type: "list",
        name: "employeeId",
        message: "Which employee role would you like to update?",
        choices: employeeChoices
        }
    ])
    const roles = await DB.allRoles()
    const roleChoices = roles.map(({id, title})=>({
        name: title,
        value: id
    }))

    const {roleId} = await prompt ([
        {
            name: "roleId",
            type: "list",
            message: "What role do you want to assign the employee?",
            choices: roleChoices
        }
    ])
    await DB.newRoles(roleId, employeeId)
    loadPrompts()
}

function init() {
    loadPrompts()
}
init()
