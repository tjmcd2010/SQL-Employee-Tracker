// I need to create a script to handle sql queries using the command line prompt, inquirer specifically. 
// I will need to ask the end user to select an option to either view or add rows of data a table that are created in the schema.sql 
// IF they user selects to view, then we will want to run a function to view the specified table of the database selected. i.e. if the user
// selects view employees, the SELECT * FROM employees query will run and display. 
// If Add a new employee is selected, the INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VAUES (num, 'string', 'string', num, num); will run

const inquirer = require('inquirer');
const express = require('express');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 3001;
const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'employee_tracker_db',
    password: '12345!',
    port: 5432,
});

async function menu () {
    const { choice } = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Update an employee manager',
                'View employees by department',
                'Exit Menu'

            ],
        },
    ]);
    switch (choice) {
        case 'View all departments':
            viewDepartments();
            break;
        case 'View all roles':
            viewRoles();
            break;
        case 'View all employees':
            viewEmployees();
            break;
        case 'Add a department':
            addDepartment();
            break;
        case 'Add a role':
            addRole();
            break;
        case 'Add an employee':
            addEmployee();
            break;
        case 'Update an employee role':
            updateEmployeeRole();
            break;
            case 'Update an employee manager':
            updateEmployeeManager();
            break;
        case 'View employees by department':
            viewEmployeesByDepartment();
            break;
            
            
    }
}
//Creates a function to viewEmployees via a query to display all employee data and pull in Title and Salary
// data from the roles table and the name data from the department table
//display the manager name based on the manager ID input from the employee table that is stored in managers table
async function viewEmployees() {
    const { rows } = await pool.query(`
        SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employees e
        JOIN roles r ON e.role_id = r.id
        JOIN departments d ON r.department_id = d.id
        LEFT JOIN employees m ON e.manager_id = m.id
    `);
    console.table(rows);
    menu();
}



//Creates a function to viewDepartments via a query SELECT * FROM departments
async function viewDepartments() {
    const { rows } = await pool.query('SELECT * FROM departments');
    console.table(rows);
    menu();
}
//Creates a function to viewRoles via a query SELECT * FROM roles
async function viewRoles() {
    const { rows } = await pool.query('SELECT * FROM roles');
    console.table(rows);
    menu();
}
//Creates a function ao add a new employee with the query INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
// (13, 'Hayden', 'Bigelow', 13, null); Should also insert manager_id into managers table
async function addEmployee() {
    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the employee\'s first name?',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the employee\'s last name?',
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'What is the employee role?',
            choices: [
                
                { name: 'Sales Director', value: 1 },
                { name: 'Director of Marketing', value: 2 },
                { name: 'Human Resources Assistant', value: 3 },
                { name: 'Business Analyst', value: 4 },
                { name: 'Accounting Manager', value: 5 },
                { name: 'Customer Support Manager', value: 6 },
                { name: 'Chief Executive Officer', value: 7 },
                { name: 'Customer Service Representative', value: 8 },
                { name: 'Chief Technology Officer', value: 9 },
                { name: 'Chief Operating Officer', value: 10 },
            ],
        },
        {
            type: 'number',
            name: 'manager_id',
            message: 'What is the ID of the employee\'s manager?',
        },
        
       
    ]);
    await pool.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
    console.log('Employee added successfully!');
    menu();
}




//Creates a function to add a new department with the query INSERT INTO departments (id, name) VALUES
(11, 'Marketing');
async function addDepartment() {
    const { name } = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?', 
        },
    ]);
    //Add to the "ViewDepartments query and return the name capitalized and validate the name doesn't already exist"
    await pool.query('INSERT INTO departments (name) VALUES ($1)', [name]);
    console.log('Department added successfully!');
    menu();
}
//Creates a function to add a new role with the query INSERT INTO roles (id, title, salary, department_id) VALUES
(11, 'Marketing Manager', 80000, 2);
async function addRole() {
    const { title, salary, department_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role?',
        },
        {
            type: 'number',
            name: 'salary',
            message: 'What is the salary of the role?',
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'What department does the role belong to?',
            choices: [
                { name: 'Sales', value: 1 },
                { name: 'Marketing', value: 2 },
                { name: 'Human Resources', value: 3 },
                { name: 'Finance', value: 4 },
                { name: 'Information Technology', value: 5 },
            ],
        },
    ]);
    await pool.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
    console.log('Role added successfully!');
    menu();
}
//Creates a function to update the employee role
async function updateEmployeeRole() {
    const { employee_id, role_id } = await inquirer.prompt([
        {
            type: 'number',
            name: 'employee_id',
            message: 'What is the ID of the employee you want to update?',
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'What is the new role for the employee?',
            choices: [
                { name: 'Sales Director', value: 1 },
                { name: 'Director of Marketing', value: 2 },
                { name: 'Human Resources Assistant', value: 3 },
                { name: 'Business Analyst', value: 4 },
                { name: 'Accounting Manager', value: 5 },
                { name: 'Customer Support Manager', value: 6 },
                { name: 'Chief Executive Officer', value: 7 },
                { name: 'Customer Service Representative', value: 8 },
                { name: 'Chief Technology Officer', value: 9 },
                { name: 'Chief Operating Officer', value: 10 },
            ],
        },
    ]);
    await pool.query('UPDATE employees SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
    console.log('Employee role updated successfully!');
    menu();
}
//Creates a function to update the employee manager
async function updateEmployeeManager() {
    const { employee_id, manager_id } = await inquirer.prompt([
        {
            type: 'number',
            name: 'employee_id',
            message: 'What is the ID of the employee you want to update?',
        },
        {
            type: 'number',
            name: 'manager_id',
            message: 'What is the ID of the new manager for the employee?',
        },
    ]);
    await pool.query('UPDATE employees SET manager_id = $1 WHERE id = $2', [manager_id, employee_id]);
    console.log('Employee manager updated successfully!');
    menu();
}
async function viewEmployeesByDepartment() {
    const { department_id } = await inquirer.prompt([
        {
            type: 'list',
            name: 'department_id',
            message: 'What department would you like to view?',
            choices: [
                { name: 'Sales', value: 1 },
                { name: 'Marketing', value: 2 },
                { name: 'Human Resources', value: 3 },
                { name: 'IT', value: 4 },
                { name: 'Finance', value: 5 },
                { name: 'Customer Support', value: 6 },
                { name: 'Administration', value: 7 },
                { name: 'Sales', value: 8 },
                { name: 'Support', value: 9 },
            ],
        },
    ]);

    const query = `
        SELECT e.id AS "Employee ID",
        e.first_name AS "First Name",
        e.last_name AS "Last Name",
        r.title AS "Title",
        d.name AS "Department",
        r.salary AS "Salary",
        CONCAT(m.first_name, ' ', m.last_name) AS "Manager"
        FROM employees e
        JOIN roles r ON e.role_id = r.id
        JOIN departments d ON r.department_id = d.id
        LEFT JOIN employees m ON e.manager_id = m.id
        WHERE d.id = $1
    `;

    const { rows } = await pool.query(query, [department_id]);
    console.table(rows);
    const totalSalary = rows.reduce((acc, row) => acc + parseFloat(row.Salary.replace(/[$,]/g, '')), 0);
    console.log(`Total Salary: ${totalSalary.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`);

    menu();
}


console.log('Starting Program');
//Run the program
menu();