const mysql = require("mysql2");
const inquirer = require("inquirer");
// const consoleTable = require('console.table');
const { response } = require("express");

const connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "promise",
    database: "employeesDB",
});

connection.connect(function (err) {
    if (err) throw err;
    startMenu();
});

const startMenu = () => {
    inquirer
        .prompt({
            name: "choice",
            type: "list",
            message: "What would you like to do?",
            choices: [
                'View all employees',
                'View all departments',
                'View all roles',
                'Add an employee',
                'Add a department',
                'Add a role',
                'Update employee role',
                'Exit'
            ],
        })
        .then(response => {
            switch (response.choice) {
                case 'View all employees':
                    viewEmployee();
                    break;
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Update employee role':
                    updateRole();
                    break;
                case 'Exit':
                    connection.end();
                    break;
                default:
                    connection.end();
            }
        });
    };

    const viewEmployees = () => {
        connection.query(
            `SELECT employee_id, first_name, last_name, title, salary, dept_name, manager_id FROM ((department JOIN role ON department.id = role.department_id) JOIN employee ON role.id = employee.role_id);`,
            function (err, res) {
                if (err) throw err;
                console.table(res);
                startMenu();
            }
        );
    };

    const viewDepartment = () => {
        connection.query(
            `SELECT * FROM department`,
            function (err, res) {
                if (err) throw err;
                console.table(res);
                startMenu();
            }
        );
    };

    const viewRole = () => {
        connection.query(
            `SELECT * FROM job`,
            function (err, res) {
                if (err) throw err;
                console.table(res);
                startMenu();
            }
        );
    };

    const addEmployee = () => {
        inquirer.prompt([{
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?",
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?",
        },
        {
            type: 'input',
            name: 'jobId',
            message: "What is the employee's job id?",
        },
        {
            type: 'input',
            name: 'managerId',
            message: "What is the employee's manager id?",
        },

        ]).then(answer => {
            connection.query(`INSERT INTO employee (first_name, last_name, job_id, manager_id) VALUES (?, ?, ?, ?)`,
                [answer.firstName, answer.lastName, answer.jobId, answer.managerId],
                function (err, res) {
                    if (err) throw err;
                    console.log("Employee added!");
                    startMenu();
                }
            );
        });
    };

    const addDepartment = () => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'department',
                message: 'What is the department name?',
            },
        ])
        .then(answer => {
            connection.query(
                `INSERT INTO department (dept_name) VALUES (?)`,
                [answer.department],
                function (err, res) {
                    if (err) throw err;
                    console.log("Department added!");
                    startMenu();
                }
            );
        });
      };

    const addRole = () => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'jobTitle',
                message: 'What is the job title?',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary for this job?',
            },
            {
                type: 'input',
                name: 'deptId',
                message: 'What is the department ID number?',
            },
        ])
        .then(answer => {
            connection.query(
                `INSERT INTO job (title, salary, department_id) VALUES (?, ?, ?)`,
                [answer.jobTitle, answer.salary, answer.deptId],
                function (err, res) {
                    if (err) throw err;
                    console.log("Job added!");
                    startMenu();
                }
            );
        });
      };
      
      const updateEmployee = () => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'id',
                message: "Enter employee id",
            },
            {
                type: 'input',
                name: 'jobId',
                message: "Enter new job id",
            },
        ])
        .then(answer => {
            connection.query(
                `UPDATE employee SET job_id = ? WHERE id = ?`,
                [answer.jobId, answer.id],
                function (err, res) {
                    if (err) throw err;
                    console.log("Employee updated!");
                    startMenu();
                }
            );
        });
      };