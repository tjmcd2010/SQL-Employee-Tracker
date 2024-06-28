INSERT INTO departments (name)
VALUES ('Sales'),
       ('Marketing'),
       ('Human Resources'),
       ('IT'),
       ('Finance'),
       ('Customer Support'),
       ('Administration');

INSERT INTO roles (title, salary, department_id)
VALUES ('Sales Director', 75000, 1),
       ('Director of Marketing', 85000, 2),
       ('Human Resources Assistant', 50000, 3),
       ('Business Analyst', 90000, 4),
       ('Accounting Manager', 60000, 5), 
       ('Customer Support Manager', 70000, 6),
       ('Chief Executive Officer', 150000, 7);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL),
       ('Jane', 'Smith', 2, NULL),
       ('Michael', 'Johnson', 3, NULL),
       ('Emily', 'Williams', 4, NULL),
       ('David', 'Jones', 5, NULL),
       ('Sarah', 'Brown', 6, NULL),
       ('Robert', 'Davis', 7, NULL);

       