const mysql = require("mysql2");
const inquirer = require("inquirer");
var managers = [];
var roles = [];
var employees = [];

const connection = mysql.createConnection( {
    host: "localhost",
    port: 3001,
    user: "root",
    password: "promise",
    database: "employeesDB",
});

const getManager = () => {
    connection.query(`SELECT managers, manager_id FROM managers`, (err, res) => {
        if (err) throw err;
        managers = [];
        for (let i = 0; i < res.length; i++) {
        const manager = res[i].manager;
        const manager_id = res[i].manager_id;
        var newManager = {
            name: manager,
            value: manager_id
        }
        managers.push(newManager);
      }
      // console.log(managers)
      return managers;
     // console.log(managers)
        });
};

// getManager();
const getRole = () => {
    connection.query(`SELECT title, role_id FROM role`, (err, res) => {
        if (err) throw err;
        roles = [];
        for (let i = 0; i < res.length; i++) {
        const id = res[i].role_id;
        const title = res[i].title;
        var newRole = {
            name: title,
            value: id
        }
        roles.push(newRole);
      }
      // console.log(roles)
      return roles;
    });
};

// getRole();

const getEmployee = () => {
    connection.query(`SELECT first_name, last_name, id FROM employee`, (err, res) => {
        if (err) throw err;
        employees = [];
        for (let i = 0; i < res.length; i++) {
        const id = res[i].id;
        const firstName = res[i].first_name;
        const lastName = res[i].last_name;
        var newEmployees = {
            name: firstName.contact(" ", lastName),
            value: id
        }
        employees.push(newEmployees);
      // console.log(newEmployees)

    }
    //console.log(employees)
    return newEmployees;
})
}

//getEmployee();
//getRole();

const roleCheck = `SELECT id, employee.first_name, employee.last_name, title, salary, department.role, managers.manager
FROM employee
JOIN role ON employee.role_id = role.role_id
JOIN department ON role.department_id = department.department_id
LEFT JOIN managers ON employee.manager_id = managers.manager_id`;

const init = ( )=> {
    getEmployee();
    getRole();
    getManager();
inquirer
    .prompt({
        name: "init",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "View All Employess",
            "View All Employess By Department",
            "View All Employess By Managers",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "View All Roles",
            "View All Managers",
        ],
    })
    .then((answer) => {
        switch (answer.init){
            case "View All Employess":
                allEmployees();
                break;

            case "View All Employess By Department":
                allEmployeesDepartment();
                break;

            case "View All Employess By Managers":
                allEmployeesManagers();
                break;

            case "Add Employee":
                addEmployee();
                break;
                   
            case "Remove Employee":
                removeEmployee();
                break;

            case "Update Employee Role":
                updateRole();
                break;

            case "Update Employee Manager":
                updateManager();
                break;

            case "View All Roles":
                allRoles();
                break;

            case "View All Managers":
                allManagers();
                break;

            case "Exit":
                connection.end();
                break;
            }
        });
};

const allEmployeesManagers = () => {
    inquirer
        .prompt({
            type: "list",
            name: "manager",
            message: "choose a manager?",
            choices: managers
        }).then((answer) => {
            connection.query(`SELECT first_name, last_name FROM employee
            WHERE manager_id = ${answer.manager};`, (err, res ) => {
                if (err) throw err;
                console.table(res);
                init()
            })
        })
};

const updateManager = () => {
    inquirer
        .prompt([{
            type: "list",
            name: "employee",
            message: "Which employee is getting a new manager?",
            choices: employees
        },
        {
            type: "list",
            name: "manager",
            message: "Who is your new manager?",
            choices: managers
        },
        ]).then((answer) => {
            connection.query(`UPDATE employee
            SET manager_id = ${answer.manager}
            WHERE id = ${answer.employee}`, (err, res) => {
                if (err) throw err;
                init()
            })
        })
};

const updateRole = () => {
    inquirer
        .prompt([
           {
            type: "list",
            name: "employee",
            message: "Whose role is being updated?",
            choices: employees 
           },
            {
                type: "list",
                name: "role",
                message: "What is the new role?",
                choices: roles
            },  
        ]).then((answer) => {
        connection.query(`UPDATE employee
        SET role_id = ${answer.role}
        WHERE id = ${answer.employee};`, (err, res) => {
            if (err) throw err;
            init();
        })

        })
};

const allManagers = () => {
    connection.query(`SELECT manager FROM managers`, (err, res) => {
        if (err) throw err;
        console.log("\nALL MANAGERS\n");
        console.table(res);
        init();
    })
};

const allEmployees = () => {
    connection.query(roleCheck, (err, res) => {
        console.log("\nALL EMPLOYEES\n");
        if (err) throw err;
        console.table(res);
        init();
    })
};

const allRoles = () => {
    connection.query(`SELECT title FROM role`, (err, res) => {
        if (err) throw err;
        console.log("\nALL ROLES\n");
        console.table(res);
        init();
    })
};

const allEmployeesDepartment= () => {
    inquirer
    .prompt({
        type: "rawlist",
        name: "departments",
        message: "choose a department",
        choices: ["Nursing", "Clinical", "Doctors", "Behavior Health"]
    }).then((answer) => {
        if (answer.departments === "Nursing"){
            connection.query(`SELECT employee.first_name, employee.last_name FROM employee
            JOIN role ON employee.role_id = role.role_id
            JOIN department ON role.department_id - department.department_id and department.role = "Nursing"`, (err, res) => {
                console.log("\nNURSING\n");
                if (err) throw err;
                console.table(res);
                init();
            })
        }
      else if (answer.departments === "Clinical"){
        connection.query(`SELECT employee.first_name, employee.last_name FROM employee
            JOIN role ON employee.role_id = role.role_id
            JOIN department ON role.department_id - department.department_id and department.role = "Clinical"`, (err, res) => {
                console.log("\nCLINICAL\n");
                if (err) throw err;
                console.table(res);
                init();
            })
        }
      
      else if (answer.departments === "Doctors"){
        connection.query(`SELECT employee.first_name, employee.last_name FROM employee
            JOIN role ON employee.role_id = role.role_id
            JOIN department ON role.department_id - department.department_id and department.role = "Doctors"`, (err, res) => {
                console.log("\nDOCTORS\n");
                if (err) throw err;
                console.table(res);
                init();
            })
        }

        else if (answer.departments === "Behavior Health"){
            connection.query(`SELECT employee.first_name, employee.last_name FROM employee
                JOIN role ON employee.role_id = role.role_id
                JOIN department ON role.department_id - department.department_id and department.role = "Behavior Health"`, (err, res) => {
                    console.log("\nBEHAVIOR HEALTH\n");
                    if (err) throw err;
                    console.table(res);
                    init();
                })
            }
        });

    };

    addEmployee = () => {
        managers.push('none');
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'What is your first name?',
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'What is your position?',
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'What is your firstname?',
                    choices: roles
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'Who is your manager?',
                    choices: managers
                },
            ]).then((answer) => {
                if (answer.manager === 'none') {
                    connection.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id)
                    values ('${answer.first_name}', '${answer.last_name}', ${answer.role}, null`, (err, res) => {
                        if (err) throw err;
                        init();
                    })
                    }
                })
    }

    const removeEmployee = () => {
        inquirer
            .prompt({
                type: 'list', 
                name: 'employee',
                message: 'Who would you like to remove?',
                choices: employees
            }).then((answer) => {
                connection.query(`DELETE FROM employee WHERE id=${answer.employee}`, (err, res) => {
                    if (err) throw err;
                    init();
                })
                console.log(answer)
            })
    }
    init()
