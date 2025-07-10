-- Create database
CREATE DATABASE IF NOT EXISTS micrud;
USE micrud;

-- Create Products table
CREATE TABLE IF NOT EXISTS Products (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Price DECIMAL(10,2) NOT NULL
);

-- Sample data
INSERT INTO Products (Name, Price) VALUES ('Sample Product 1', 19.99);
INSERT INTO Products (Name, Price) VALUES ('Sample Product 2', 29.99);
