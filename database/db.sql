CREATE DATABASE `favorite_links`;

USE DATABASE `favorite_links`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(150) NOT NULL,
  `url` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_users_links` (`user_id`),
  CONSTRAINT `fk_users_links` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
);
