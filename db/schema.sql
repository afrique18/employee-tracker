DROP DATABASE IF EXISTS employeesDB; 
CREATE DATABASE employeesDB;

USE employeesDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);


CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id)
        REFERENCES department(id)

);


CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY(role_id),
        REFERENCES role(id)
);