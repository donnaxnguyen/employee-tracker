// npms i'm using 
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table")

// creating my connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employees_DB"
})

// connecting to sql and database , then starting app 
connection.connect(function(err){
    if (err) throw err;
    startApp();
})

// this starts and runs inquirer , multiple choices will be asked 
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

// creating functions within choices 
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

// viewing employees will grab all employees in database
function viewEmployees() {
    var query = "SELECT * FROM employees";
    connection.query(query, function(err, res) {
    if (err) throw err;
    console.log(res.length + " employees found!");
    console.table('All Employees:', res); 
    startApp();
    })
}

// viewing department will grab all departments in database 
function viewDepartments() {
    var query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
    if(err)throw err;
    console.table('All Departments:', res);
    startApp();
    })
}

// viewing roles will grab all roles in database
function viewRoles() {
    var query = "SELECT * FROM role";
    connection.query(query, function(err, res){
    if (err) throw err;
    console.table('All roles:', res);
    startApp();
    })
}

// adding employee 
function addEmployee() {
    connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    
    inquirer
        .prompt([
            {
                // input first name 
                name: "first_name",
                type: "input", 
                message: "Employee's fist name: ",
            },
            {
                // input last name
                name: "last_name",
                type: "input", 
                message: "Employee's last name: "
            },
            {
                // input role from the list of roles
                name: "role", 
                type: "list",
                choices: function() {
                var roleArray = [];

                // goes through the array of roles
                for (let i = 0; i < res.length; i++) {
                    roleArray.push(res[i].title);
                }
                return roleArray;
                },
                // asks a message for user to choose role
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
                // once user chooses role, it will console log into employee database table
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

// adding department
function addDepartment() {
    inquirer
    .prompt([
        {
            // adding a new input
            name: "new_dept", 
            type: "input", 
            message: "What is the new department you would like to add?"
        }
        // inserts the new depeartment into the department table
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

// adding role
function addRole() {
    connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;

    inquirer 
    .prompt([
        {
            // user types in a new role name 
            name: "new_role",
            type: "input", 
            message: "What is the Title of the new role?"
        },
        {
            // user types in salary amount
            name: "salary",
            type: "input",
            message: "What is the salary of this position? (Enter a number?)"
        },
        {
            // loops through list of roles and allows user to choose the department
            name: "deptChoice",
            type: "rawlist",
            choices: function() {
                var deptArry = [];
                for (let i = 0; i < res.length; i++) {
                deptArry.push(res[i].name);
                }
                return deptArry;
            },
        }
    ]).then(function (answer) {
        let deptID;
        for (let j = 0; j < res.length; j++) {
            if (res[j].name == answer.deptChoice) {
                deptID = res[j].id;
            }
        }
        // adds the role into set table
        connection.query(
            "INSERT INTO role SET ?",
            {
                title: answer.new_role,
                salary: answer.salary,
                department_id: deptID
            },
            function (err, res) {
                if(err)throw err;
                console.log("Your new role has been added!");
                startApp();
            }
        )
    })
    })
    
}

function endApp() {
    connection.end();
}