


INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Erik", "Ten Hag", 1, null), ("Carlos", "Casemiro", 2, 1), ("Luka", "Modric", 3, null), ("Ngolo", "Kante", 4, 2), ("Charlotte", "Jarsey", 2, 1), ("Danielle", "Alesandrini", 3, 2), ("Marlag", "Tombekai", 4, null), ("Ereen", "Wanbisaka", 5, 3);

/*INSERT INTO managers(manager)
VALUES("Erik Ten Hag"), ("Luka Modric"), ("Marlag Tombekai"); */

SELECT * FROM employee;
SELECT * FROM managers;

INSERT INTO department(name)
VALUES ("Nursing"), 
("Clinical"), 
("Doctors"), 
("Behavior Health");

INSERT INTO role(title, salary, department_id)
VALUES ("Registered Nurse", 92000, 1), 
("Behavioral Health Clinician", 76000, 2), 
("Psychiatrist", 115000, 3), 
("Behavior Analyst", 96000, 4), 
("Psych Tech", 70000, 4);

