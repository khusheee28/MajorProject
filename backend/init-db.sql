-- Create database if not exists
CREATE DATABASE IF NOT EXISTS umeedfund;
USE umeedfund;

-- Create Campaigns table
CREATE TABLE IF NOT EXISTS Campaigns (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  targetAmount DECIMAL(10, 2) NOT NULL,
  currentAmount DECIMAL(10, 2) DEFAULT 0,
  duration INT NOT NULL,
  category ENUM('Environment', 'Education', 'Healthcare', 'Technology', 'Arts', 'Social', 'Other') NOT NULL,
  imageUrl VARCHAR(255) NOT NULL,
  creator VARCHAR(255) NOT NULL DEFAULT 'Anonymous',
  status ENUM('active', 'completed', 'cancelled') DEFAULT 'active',
  startDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  endDate DATETIME NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Donations table
CREATE TABLE IF NOT EXISTS Donations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  campaignId INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  donor VARCHAR(255) NOT NULL,
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (campaignId) REFERENCES Campaigns(id) ON DELETE CASCADE
); 