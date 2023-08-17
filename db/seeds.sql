
INSERT INTO department (dept_name)
VALUES
('Finance'),
('Legal'),
('Human Resources'),
('Sales'),
('Security'),
('Information Systems and Technology');

INSERT INTO role (title, salary, department_id)
VALUES
('Accountant', 1, 80000),
('Paralegal', 1, 60000),
('Manager', 1, 72000),
('Engineer', 2, 99000),
('Sales Rep', 2, 50000),
('Web Developer', 3, 100000);

INSERT INTO employee  (first_name, last_name, role_id, department_id)
VALUES
('James', 'Yafondo', 1, NULL),
('Yaminah', 'Jones', 2, 1),
('Salema', 'Davies' 3, 2),
('Ivan', 'Deyanov' 4, NULL),
('Koffi', 'Kanu' 5, 4),
('Adama', 'Traore' 6, NULL);








