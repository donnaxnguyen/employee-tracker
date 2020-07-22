USE employees_DB;

-- department seeds

INSERT INTO department (id, name)
VALUES (1, "Sales");

INSERT INTO department (id, name)
VALUES (2, "Engineering");

INSERT INTO department (id, name)
VALUES (3, "Finance");

INSERT INTO department (id, name)
VALUES (4, "Legal");

-- role seeds --
    -- sales --
INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Sales Lead", 100000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (2, "Salesperson", 80000, 1);


    -- engineering --
INSERT INTO role (id, title, salary, department_id)
VALUES (3, "Lead Engineer", 150000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (4, "Software Engineer", 1200000, 2);


    -- finance --
INSERT INTO role (id, title, salary, department_id)
VALUES (5, "Accountant", 125000, 3);


    -- legal --
INSERT INTO role (id, title, salary, department_id)
VALUES (6, "Legal Team Lead", 250000, 4);

INSERT INTO role (id, title, salary, department_id)
VALUES (7, "Lawyer", 190000, 4);


-- employee seeds --


INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Amy", "Apple", 1, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (2, "Bob", "Bergart", 1, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (3, "Cameron", "Castillo", 2, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (4, "Daniel", "Doe", 3, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (5, "Elizabeth", "Engel", 4, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (6, "Frank", "Fort", 5, 7);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (7, "Gary", "George", 6, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (8, "Haley", "Hiddleton", 7, 10);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (9, "Irene", "Ives", 8, 10);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (10, "John", "Jones", 9, null);
