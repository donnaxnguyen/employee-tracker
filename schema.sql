-- department seeds --

INSERT INTO department (name)
VALUES  ("Sales"), 
        ("Engineering"), 
        ("Finance"), 
        ("Legal");

-- role seeds --
INSERT INTO role (title, salary, department_id)
VALUES  ("Sales Lead", 100000, 1), /*1 */
        ("Salesperson", 80000, 1), /*2 */
        ("Lead Engineer", 150000, 2), /*3 */
        ("Software Engineer", 1200000, 2), /*4 */
        ("Accountant", 125000, 3), /*5 */
        ("Legal Team Lead", 250000, 4), /*6 */
        ("Lawyer", 190000, 4); /*7 */

-- employee seeds --
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Amy", "Apple", 1, 1),
       ("Bob", "Bergart", 2, null),
       ("Cameron", "Castillo", 3, null),
       ("Daniel", "Doe", 4, null),
       ("Elizabeth", "Engel", 5, null),
       ("Frank", "Fort", 6, 1),
       ("Gary", "George", 7, null);