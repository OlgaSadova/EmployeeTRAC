DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;


USE employee_DB;


CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30)NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(45) NULL,
  salary DECIMAL(10,4),
  department_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee(
  id INTEGER NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
  
);

SELECT * FROM department;

INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Legal");

SELECT * FROM role;

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 130000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 200000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 180000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 210000, 4);

SELECT * FROM employee;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sam", "Doe", 1, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Altshuler", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Eric", "Li", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Angy", "Escamilla", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Melania", "Brown", 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sarah", "Konor", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "All", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Chris", "Bond", 1, 2);