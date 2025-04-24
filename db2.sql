-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: webappdata
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `restaurantId` int NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `partySize` int NOT NULL,
  `specialRequests` text,
  `status` enum('pending','confirmed','cancelled') DEFAULT 'pending',
  `contactPhone` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `restaurantId` (`restaurantId`),
  CONSTRAINT `Reservations_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Reservations_ibfk_2` FOREIGN KEY (`restaurantId`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES (1,22,1,'2023-12-31','18:00:00',4,'Vui lòng chuẩn bị bàn gần cửa sổ','pending','0987654321','2025-03-20 11:58:59','2025-03-20 11:58:59'),(2,22,1,'2025-12-31','18:00:00',6,'Vui lòng chuẩn bị bàn gần cửa sổ và một ghế cao cho trẻ em','pending','0987654321','2025-03-20 11:59:15','2025-03-20 12:04:43'),(3,22,1,'2025-12-31','18:00:00',4,'Vui lòng chuẩn bị bàn gần cửa sổ','pending','0987654321','2025-03-20 12:00:35','2025-03-20 12:00:35');
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurants`
--

DROP TABLE IF EXISTS `restaurants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `openingHours` varchar(255) DEFAULT NULL,
  `cuisine` varchar(255) DEFAULT NULL,
  `priceRange` varchar(255) DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurants`
--

LOCK TABLES `restaurants` WRITE;
/*!40000 ALTER TABLE `restaurants` DISABLE KEYS */;
INSERT INTO `restaurants` VALUES (1,'Nhà hàng Test (Đã cập nhật)','Nhà hàng chuyên các món ăn truyền thống Việt Nam','123 Đường Lê Lợi, Quận 1, TP.HCM','0123456789','9:00 - 23:00','Việt Nam','$$$','https://example.com/restaurant1.jpg',10.7756,106.702,1,'2025-03-20 11:10:55','2025-03-20 11:39:15'),(2,'Nhà hàng 333 Việt Nam','Nhà hàng chuyên các món ăn truyền thống Việt Nam','123 Đường Lê Lợi, Quận 1, TP.HCM','0123456789',NULL,'Việt Nam','$$','https://example.com/restaurant1.jpg',10.7756,106.702,0,'2025-03-20 11:40:12','2025-03-20 11:43:26'),(3,'Nhà hàng Hưng Nam','Nhà hàng chuyên các món ăn truyền thống Việt Nam','123 Đường Lê Lợi, Quận 1, TP.HCM','0123456789',NULL,'Việt Nam','$$','https://example.com/restaurant1.jpg',10.7756,106.702,1,'2025-03-20 11:40:30','2025-03-20 11:40:30');
/*!40000 ALTER TABLE `restaurants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `restaurantId` int NOT NULL,
  `rating` int NOT NULL,
  `comment` text,
  `visitDate` date DEFAULT NULL,
  `photos` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `restaurantId` (`restaurantId`),
  CONSTRAINT `Reviews_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Reviews_ibfk_2` FOREIGN KEY (`restaurantId`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `email_9` (`email`),
  UNIQUE KEY `email_10` (`email`),
  UNIQUE KEY `email_11` (`email`),
  UNIQUE KEY `email_12` (`email`),
  UNIQUE KEY `email_13` (`email`),
  UNIQUE KEY `email_14` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Tên mới','test@example.com','$2b$10$m8rfAW8e.atn5C7fWgOL8OexvqADChYBbn65mTv0ztdDbnU3/nwT6','2025-03-10 06:25:16','2025-03-11 07:16:02',NULL,NULL,NULL,NULL,'user'),(19,'Phan An Phu','test2@example.com','$2b$10$yI9nIrYgm7ExHD6n5BcxFOnOJdENl4ly7x/DDroT1dCNhmrxMT31q','2025-03-18 02:20:55','2025-03-18 02:25:36','qewqweqwe','0123456789','Việt Nam','Hồ Chí Minh','user'),(20,'Phan An Phú','test3@example.com','$2b$10$djfkkCTByZzhbggNMx2eweFi9Rgf/SDATBXKRwWvz0nEcznfTzdl6','2025-03-18 04:06:44','2025-03-18 04:07:11','Long An','9327667810','Vietnam','Long An','admin'),(21,'opapsidipiasd','test4@example.com','$2b$10$djfkkCTByZzhbggNMx2eweFi9Rgf/SDATBXKRwWvz0nEcznfTzdl6','2025-03-20 10:51:50','2025-03-20 10:51:50',NULL,NULL,NULL,NULL,'user'),(22,'qhan1707','test21@example.com','$2b$10$M71PSDslSqLHFhodPGlW/.ZvQBeIvrCrkSHgxuhZNhfqdHaW7f8Da','2025-03-20 11:50:19','2025-03-20 11:50:19',NULL,NULL,NULL,NULL,'user'),(23,'Phu1707','test222@example.com','$2b$10$ViNw76nJElZRxGDVIU0.bucw.5BvFwtyy/vN/LSekqKZchvoqdNEO','2025-04-21 10:19:11','2025-04-21 10:19:11',NULL,NULL,NULL,NULL,'user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-23 18:16:54
