const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const promisemysql = require("promise-mysql");

// Connection Properties
const connectionProperties = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employees_DB"
}

// Creating Connection
const connection = mysql.createConnection(connectionProperties);


// Establishing Connection to database
connection.connect((err) => {
    if (err) throw err;

    // Start main menu function

    console.log("\n WELCOME TO MY EMPLOYEE TRACKER \n");
    mainMenu();
});

// Main menu function
function mainMenu(){

    // Prompt user to choose an option
    inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "MAIN MENU",
      choices: [
        "View all employees",
        "View all employees by department",
        "View all employees by manager",
        "Add Employee",
        "Delete Employee",
        "Update Employee role",
        "Update Employee manager",
        "Add role",
        "Delete role",
      ]
    })
    .then((answer) => {

        // Switch case depending on user option
        switch (answer.action) {
            case "View all employees":
                viewAllEmp();
                break;

            case "View all employees by department":
                viewAllEmpByDept();
                break;
            
            case "View all employees by manager":
                viewAllEmpByMngr();
                break;

            case "Add employee":
                addEmp();
                break;

             case "Delete employee":
                deleteEmp();
                break;

            case "Update employee role":
                updateEmpRole();
                break;

             case "Update employee manager":
                updateEmpMngr();
                break;

            case "Add role":
                addRole();
                break;

            case "Delete role":
                deleteRole();
                break;

        }
    });
}

