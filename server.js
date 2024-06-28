const express = require('express');
const { Pool } = require('pg');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();


// Load database connection details from environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function menu() {
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
        'Exit',
      ],
    },
  ]);

  await handleChoice(choice);
}

async function handleChoice(choice) {
  switch (choice) {
    case 'View all departments':
      await viewAllDepartments();
      break;
    case 'View all roles':
      await viewAllRoles();
      break;
    case 'View all employees':
      await viewAllEmployees();
      break;
    case 'Add a department':
      await addDepartment();
      break;
    case 'Add a role':
      await addRole();
      break;
    case 'Add an employee':
      await addEmployee();
      break;
    case 'Update an employee role':
      await updateEmployeeRole();
      break;
    case 'Exit':
      process.exit(0);
      break;
  }
}

async function viewAllRoles() {
  const roles = await pool.query('SELECT * FROM roles');
  return roles.rows;
}

async function viewAllDepartments() {
  const departments = await pool.query('SELECT * FROM departments');
  return departments.rows;
}

async function viewAllEmployees() {
  const employees = await pool.query('SELECT * FROM employees');
  return employees.rows;
}

async function start() {
    try {
      await menu();
    } catch (err) {
      console.error('Error:', err.message);
      console.error('Stack trace:', err.stack);
      process.exit(1);
    }
  }
  
  console.log('Starting Application');
  start();
  
