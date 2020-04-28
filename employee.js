const { prompt } = require("inquirer")
const DB = require("./index")

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

function init() {
    loadPrompts()
}
init()

