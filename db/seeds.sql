INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Erik", "Ten Hag", 1, null), ("Carlos", "Casemiro", 2, 1), ("Luka", "Modric", 3, null), ("Ngolo", "Kante", 4, 2), ("Charlotte", "Jarsey", 2, 1), ("Danielle", "Alesandrini", 3, 2), ("Marlag", "Tombekai", 4, null), ("Ereen", "Wanbisaka", 5, 3);

INSERT INTO managers(manager)
VALUES("Erik Ten Hag"), ("Luka Modric"), ("Marlag Tombekai");

SELECT * FROM employee;
SELECT * FROM managers;