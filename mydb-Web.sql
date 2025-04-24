/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `MenuItems`;
CREATE TABLE `MenuItems` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `imageUrl` varchar(1000) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `RestaurantId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `RestaurantId` (`RestaurantId`),
  CONSTRAINT `MenuItems_ibfk_1` FOREIGN KEY (`RestaurantId`) REFERENCES `Restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Reservations`;
CREATE TABLE `Reservations` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `partySize` int NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'pending',
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `RestaurantId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `specialRequests` text,
  `contactPhone` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  KEY `RestaurantId` (`RestaurantId`),
  CONSTRAINT `Reservations_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Reservations_ibfk_2` FOREIGN KEY (`RestaurantId`) REFERENCES `Restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Restaurants`;
CREATE TABLE `Restaurants` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `coverImage` varchar(1000) NOT NULL,
  `address` varchar(255) NOT NULL,
  `ratingCount` int DEFAULT '0',
  `openTime` varchar(10) NOT NULL,
  `closeTime` varchar(10) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `description` text NOT NULL,
  `cuisine` varchar(255) DEFAULT NULL,
  `priceRange` varchar(10) DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Reviews`;
CREATE TABLE `Reviews` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `content` text NOT NULL,
  `rating` int NOT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `RestaurantId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  KEY `RestaurantId` (`RestaurantId`),
  CONSTRAINT `Reviews_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Reviews_ibfk_2` FOREIGN KEY (`RestaurantId`) REFERENCES `Restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `isVerified` tinyint(1) NOT NULL DEFAULT '0',
  `verificationCode` varchar(255) DEFAULT NULL,
  `verificationCodeExpires` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



INSERT INTO `Restaurants` (`id`, `name`, `coverImage`, `address`, `ratingCount`, `openTime`, `closeTime`, `email`, `phone`, `description`, `cuisine`, `priceRange`, `latitude`, `longitude`, `isActive`, `createdAt`, `updatedAt`) VALUES
('62acb7b8-3ffe-4285-b257-1ad549906455', 'Quán ăn tịnh tâm', 'https://via.placeholder.com/400x300', '464/36/14 blah blah blah, blah blah blah', 0, '21:09', '21:09', 'tinhtam@restaurant.com', '0321475123', 'f', NULL, NULL, NULL, NULL, 1, '2025-04-24 08:35:17', '2025-04-24 08:35:17'),
('64d66b11-8769-46a9-8dc9-892df9d5a3bf', 'Quán ăn tịnh tâm', 'blob:http://localhost:5173/525638d4-fa41-4e5a-a47a-7db38d317c4a', '464/36/14 blah blah blah, blah blah blah', 0, '15:36', '15:38', 'tinhtam@restaurant.com', '0321475123', 'ffff', NULL, NULL, NULL, NULL, 1, '2025-04-24 08:35:51', '2025-04-24 08:35:51'),
('7573f8cb-3189-4bc0-a19e-5bf36dcb6046', 'Quán ăn tịnh tâm', 'blob:http://localhost:5173/43477e25-1479-469a-beae-44fe3d7d7f29', '464/36/14 blah blah blah, blah blah blah', 0, '08:00', '20:00', 'tinhtam@restaurant.com', '0321475123', 'A lovely place for virgin', NULL, NULL, NULL, NULL, 1, '2025-04-24 08:34:28', '2025-04-24 08:34:28'),
('c7be2303-3154-4c1c-9a1b-de26e2488a15', 'Quán ăn tịnh tâm', 'https://via.placeholder.com/400x300', '464/36/14 blah blah blah, blah blah blah', 0, '05:04', '15:36', 'tinhtam@restaurant.com', '0321475123', 'yeah', NULL, NULL, NULL, NULL, 1, '2025-04-24 08:35:30', '2025-04-24 08:35:30');

INSERT INTO `Users` (`id`, `username`, `email`, `password`, `address`, `phone`, `city`, `country`, `role`, `isVerified`, `verificationCode`, `verificationCodeExpires`, `createdAt`, `updatedAt`) VALUES
('2d843f0c-11b8-41fc-a902-e91b21b21c13', 'admin', 'admin@dinnerguide.com', '$2b$10$CvQ9LSuHJhbH2rvkI3fi4u1xmPpn7YAyAxXKd8bTyzlfF31YgYt0q', NULL, NULL, NULL, NULL, 'admin', 1, NULL, NULL, '2025-04-24 08:31:36', '2025-04-24 08:31:47');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;