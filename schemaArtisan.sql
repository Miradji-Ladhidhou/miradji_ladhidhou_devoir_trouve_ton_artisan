-- Drop and create database
DROP DATABASE IF EXISTS artisans;
CREATE DATABASE artisans;
USE artisans;

-- Table: categories
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL UNIQUE
);

-- Table: specialites
CREATE TABLE specialites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  categorie_id INT NOT NULL,
  FOREIGN KEY (categorie_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Table: artisans
CREATE TABLE artisans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  specialite_id INT NOT NULL,
  note DECIMAL(2,1) CHECK (note BETWEEN 0 AND 5),
  ville VARCHAR(100) NOT NULL,
  a_propos TEXT,
  email VARCHAR(255) NOT NULL UNIQUE,
  site_web VARCHAR(255),
  FOREIGN KEY (specialite_id) REFERENCES specialites(id) ON DELETE CASCADE
);
