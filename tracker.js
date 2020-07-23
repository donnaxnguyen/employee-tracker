const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table")

// CREATING MY CONNECTION TO SQL DATABASE
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employees_DB"
})

// CONNECT TO THE MYSQL SERVER AND SQL DATABASE
connection.connect(function(err){
    if (err) throw err;
    startApp();
})

function startApp() {
    inquirer
    .prompt({
        name: "action",
        type: "list",
        message: "Welcome to our employee database! What would you like to do?",
        choices: [
                "View all employees",
                "View all departments",
                "View all roles",
                "Add an employee",
                "Add department",
                "Add a role",
                "EXIT"
        ]
    }).then(function (answer) {
        switch (answer.action) {
            case "View all employees":
                viewEmployees();
                break;
            case "View all departments":
                viewDepartments();
                break;
            case "View all roles":
                viewRoles();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Add department":
                addDepartment();
                break;
            case "Add a role":
                addRole();
                break;
            case "EXIT": 
                endApp();
                break;
            default:
                break;
        }
    })
}

function viewEmployees() {
    var query = "SELECT * FROM employees";
    connection.query(query, function(err, res) {
    if (err) throw err;
    console.log(res.length + " employees found!");
    console.table('All Employees:', res); 
    startApp();
    })
}

function viewDepartments() {
    var query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
    if(err)throw err;
    console.table('All Departments:', res);
    startApp();
    })
}

function viewRoles() {
    var query = "SELECT * FROM role";
    connection.query(query, function(err, res){
    if (err) throw err;
    console.table('All roles:', res);
    startApp();
    })
}


function addEmployee() {
    connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    
    inquirer
        .prompt([
            {
                name: "first_name",
                type: "input", 
                message: "Employee's fist name: ",
            },
            {
                name: "last_name",
                type: "input", 
                message: "Employee's last name: "
            },
            {
                name: "role", 
                type: "list",
                choices: function() {
                var roleArray = [];
                for (let i = 0; i < res.length; i++) {
                    roleArray.push(res[i].title);
                }
                return roleArray;
                },
                message: "What is this employee's role? "
            }
            ]).then(function (answer) {
                let roleID;
                for (let j = 0; j < res.length; j++) {
                if (res[j].title == answer.role) {
                    roleID = res[j].id;
                    console.log(roleID)
                }                  
                }  
                connection.query(
                "INSERT INTO employees SET ?",
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: roleID,
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your employee has been added!");
                    startApp();
                }
                )
            })
    })
}

function addDepartment() {
    inquirer
    .prompt([
        {
            name: "new_dept", 
            type: "input", 
            message: "What is the new department you would like to add?"
        }
    ]).then(function (answer) {
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: answer.new_dept
            }
        );
          var query = "SELECT * FROM department";
        connection.query(query, function(err, res) {
        if(err)throw err;
        console.table('All Departments:', res);
        startApp();
        })
    })
}
