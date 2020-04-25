DROP DATABASE IF EXISTS employeesDB;
CREATE DATABASE employeesDB;
USE employeesDB;

CREATE TABLE department(
    id INT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role(
    id INT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(10,4),
    department_id INT
);

CREATE TABLE employee(
    id INT PRIMARY KEY,
    first_mame VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manger_id INT
);

