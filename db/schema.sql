DROP DATABASE IF EXISTS employeesDB; 
CREATE DATABASE employeesDB;

USE employeesDB;

CREATE TABLE department (
    id INT INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE role (
    id INT INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE employee (
    id INT INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NUll,
    last_name VARCHAR(30) NOT NUll,
    role_id INT NOT NUll,
    manager_id INT NULL,
    PRIMARY KEY (id)

);