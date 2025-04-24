-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: webapp
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
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `restaurants`
--

LOCK TABLES `restaurants` WRITE;
/*!40000 ALTER TABLE `restaurants` DISABLE KEYS */;
INSERT INTO `restaurants` VALUES (1,'The Sunset Grill','A rooftop restaurant with a stunning view of the city.','123 Sunset Blvd, Cityville','0123456789','10:00 - 22:00','Grill','$$$','https://images.unsplash.com/photo-1555992336-03a23c7b20ce',10.7626,106.66,1,'2025-04-23 18:08:04','2025-04-23 18:08:04'),(2,'Ocean Breeze','Seafood paradise with oceanfront seating.','456 Ocean Ave, Beachtown','0123456790','11:00 - 23:00','Seafood','$$$$','https://images.unsplash.com/photo-1541542684-4b6b63f1c1a8',10.7627,106.661,1,'2025-04-23 18:08:04','2025-04-23 18:08:04'),(3,'Pho 24 Delight','Authentic Vietnamese Pho served hot and fresh.','24 Nguyen Trai, HCMC','0909123456','07:00 - 22:00','Vietnamese','$','https://images.unsplash.com/photo-1589187150940-5242f6d54e48',10.765,106.683,1,'2025-04-23 18:08:04','2025-04-23 18:08:04'),(4,'Tandoori Flame','Traditional Indian cuisine with modern vibes.','789 Curry Rd, Flavortown','0912345678','12:00 - 21:00','Indian','$$','https://images.unsplash.com/photo-1600891963939-a3f73d5f32b6',10.7631,106.68,1,'2025-04-23 18:08:04','2025-04-23 18:08:04'),(5,'La Pasta Bella','Romantic Italian eatery with homemade pasta.','101 Italy St, Oldtown','0987654321','11:30 - 22:00','Italian','$$$','https://images.unsplash.com/photo-1627308595229-7830a5c91f9f',10.7628,106.659,1,'2025-04-23 18:08:04','2025-04-23 18:08:04'),(6,'Tokyo Table','Minimalist sushi bar with premium quality.','202 Tokyo Ave, Eastside','0967123456','10:00 - 21:00','Japanese','$$$$','https://images.unsplash.com/photo-1576402187877-68390b3c1c79',10.7622,106.661,1,'2025-04-23 18:08:04','2025-04-23 18:08:04'),(7,'Café de Paris','Charming French bistro with gourmet pastries.','303 Paris Blvd, Midtown','0934567890','08:00 - 20:00','French','$$$','https://images.unsplash.com/photo-1617191518000-4eb2f1c77a67',10.7612,106.66,1,'2025-04-23 18:08:04','2025-04-23 18:08:04'),(8,'Burger Bae','American diner style with juicy burgers.','404 Burger Lane, Foodcity','0945678901','09:00 - 21:00','American','$$','https://images.unsplash.com/photo-1550547660-d9450f859349',10.7601,106.661,1,'2025-04-23 18:08:04','2025-04-23 18:08:04'),(9,'Chili Garden','Spicy Thai food that’ll set your tongue on fire.','505 Thai St, Heatville','0923456789','10:00 - 22:00','Thai','$$','https://images.unsplash.com/photo-1562967916-eb82221dfb36',10.7635,106.662,1,'2025-04-23 18:08:04','2025-04-23 18:08:04'),(10,'Korean BBQ Hub','Grill your own meats, Korean style.','606 Seoul Blvd, K-Town','0976543210','12:00 - 23:00','Korean','$$$','https://images.unsplash.com/photo-1553621042-f6e147245754',10.7644,106.663,1,'2025-04-23 18:08:04','2025-04-23 18:08:04');
/*!40000 ALTER TABLE `restaurants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

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

-- Dump completed on 2025-04-23 18:08:59
