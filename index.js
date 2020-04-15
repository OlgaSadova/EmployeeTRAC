var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Soa15091987",
    database: "employee_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    firstPrompt();
});

function firstPrompt() {
    inquirer
        .prompt({
            name: "task",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View roles",
                "View departments",
                "Add an Employee",
                "Add a Department",
                "Update employee roles",
                "Add a Role",
                "Quit"
            ]
        })
        .then(function(answer) {
            switch (answer.task) {
                case "View all employees":
                    employeeSearch();
                    break;
                case "View roles":
                    searchRole();
                    break;
                case "View departments":
                    searchDepartment();
                    break;
                case "Add an Employee":
                    addEmployee();
                    break;

                case "Add a Department":
                    addDepartment();
                    break;
                case "Update employee roles":
                    updateRoles();
                    break;
                case "Add  a Role":
                    addRole();
                    break;
                case "Quit":
                    connection.end();
                    break;
            }
        });
}

function employeeSearch() {
    //console.table("Viewing employee...\n");
    var query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON d.id = r.department_id LEFT JOIN employee m ON m.id = e.manager_id`
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        console.log("Employees viewed!\n");

        firstPrompt();
    });

}

function searchRole() {
    var query = "SELECT role.title AS Job_Title, name AS Department, role.salary FROM employee_DB.department JOIN employee_DB.role ON employee_DB.department.id = employee_DB.role.department_id";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res)

        firstPrompt();
    });
}

function searchDepartment() {
    var query = "SELECT name AS Department, sum(role.salary) AS Department_Budget FROM employee_DB.department JOIN employee_DB.role ON employee_DB.department.id = employee_DB.role.department_id GROUP by department.name";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res)

        firstPrompt();
    });
}

function addEmployee() {
    var query = `SELECT r.id, r.title, r.salary FROM role r`

    connection.query(query, function(err, res) {
        if (err) throw err;

        const roleChoices = res.map(({ id, title, salary }) => ({
            value: id,
            title: `${title}`,
            salary: `${salary}`
        }));

        console.table(res);
        console.log("RoleToInsert!");

        promptInsert(roleChoices);
    });
}

function promptInsert(roleChoices) {

    inquirer
        .prompt([{
                type: "input",
                name: "first_name",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the employee's last name?"
            },
            {
                type: "list",
                name: "roleId",
                message: "What is the employee's role?",
                choices: roleChoices
            }

        ])
        .then(function(answer) {
            console.log(answer);

            var query = `INSERT INTO employee SET ?`

            connection.query(query, {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.roleId,
                    manager_id: answer.managerId,
                },
                function(err, res) {
                    if (err) throw err;

                    console.table(res);
                    console.log(res.insertedRows + "Inserted successfully!...\n");

                    firstPrompt();
                });

        });
}



function addDepartment() {


    inquirer.prompt({

        type: "input",
        message: "What is the name of the department?",
        name: "deptName"

    }).then(function(answer) {
        connection.query("INSERT INTO department (name) VALUES (?)", [answer.deptName], function(err, res) {
            if (err) throw err;
            console.table(res);
            firstPrompt();
        });
    })
}

function updateRoles() {
    console.log('updating emp');
    inquirer
        .prompt({
            name: "id",
            type: "input",
            message: "Enter employee id",
        })
        .then(function(answer) {
            var id = answer.id;

            inquirer
                .prompt({
                    name: "roleId",
                    type: "input",
                    message: "Enter role id",
                })
                .then(function(answer) {
                    var roleId = answer.roleId;

                    var query = "UPDATE employee SET role_id=? WHERE id=?";
                    connection.query(query, [roleId, id], function(err, res) {
                        if (err) {
                            console.log(err);
                        }
                        firstPrompt();
                    });
                });
        });
}

function addRole() {

    var query =
        `SELECT d.id, d.name, r.salary AS budget FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON d.id = r.department_id GROUP BY d.id, d.name`

    connection.query(query, function(err, res) {
        if (err) throw err;
        const departmentChoices = res.map(({ id, name }) => ({
            value: id,
            name: `${id} ${name}`
        }));

        console.table(res);
        console.log("Department array!");

        promptAddRole(departmentChoices);
    });
}

function promptAddRole(departmentChoices) {

    inquirer
        .prompt([{
                type: "input",
                name: "roleTitle",
                message: "Role title?"
            },
            {
                type: "input",
                name: "roleSalary",
                message: "Role Salary?"
            },
            {
                type: "list",
                name: "departmentId",
                message: "Department?",
                choices: departmentChoices
            }
        ])
        .then(function(answer) {

            var query = `INSERT INTO role SET ?`

            connection.query(query, {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.departmentId
                },
                function(err, res) {
                    if (err) throw err;

                    console.table(res);
                    console.log("Role Inserted!");

                    firstPrompt();
                });

        });
}