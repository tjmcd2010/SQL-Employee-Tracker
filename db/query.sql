-- View All Roles
SELECT *
FROM roles;

-- View All Departments
SELECT *
FROM departments;

-- View All Employees
SELECT *
FROM employees;



-- Add Department
INSERT INTO department (id, name)
VALUES
(4, 'IT');

-- Add Role
INSERT INTO role (id, title, salary, department_id)
VALUES
(13, 'Admin', 65,000, 4);

-- Add Employee
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
(13, 'Hayden', 'Bigelow', 13, null);

-- Update Employee Role
UPDATE role
SET title = 'JR Analyst'
WHERE id = 5;