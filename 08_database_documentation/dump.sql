-- MariaDB dump 10.19  Distrib 10.6.12-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: jauth
-- ------------------------------------------------------
-- Server version	10.10.2-MariaDB-1:10.10.2+maria~ubu2204

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(64) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `enabled` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES ('eea2c4713804001','Bob Johnson','bob@johnson.com','$2b$12$lkqpakFdJ76SpihpjkqkvO.L6rKTQ1YD5/4jaEcjXs5dzSzzAhLkm','2023-02-13 15:54:09','2023-02-13 15:54:09',1);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_session`
--

DROP TABLE IF EXISTS `account_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_session` (
  `id` bigint(20) NOT NULL,
  `session_id` bigint(20) NOT NULL,
  `iteration` int(10) NOT NULL DEFAULT 1,
  `account_id` varchar(255) NOT NULL,
  `valid` tinyint(4) NOT NULL DEFAULT 1,
  `expires` timestamp NOT NULL,
  PRIMARY KEY (`session_id`,`iteration`),
  UNIQUE KEY `id` (`id`),
  KEY `FKaccount_se158343` (`account_id`),
  CONSTRAINT `FKaccount_se158343` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_session`
--

LOCK TABLES `account_session` WRITE;
/*!40000 ALTER TABLE `account_session` DISABLE KEYS */;
INSERT INTO `account_session` VALUES (1074720144913088513,1074720144913088514,1,'eea2c4713804001',0,'2024-02-13 16:53:09'),(1074724261295308801,1074720144913088514,2,'eea2c4713804001',0,'2024-02-13 17:09:31'),(1074728126480760833,1074720144913088514,3,'eea2c4713804001',0,'2024-02-13 17:24:52'),(1074734168971218945,1074720144913088514,4,'eea2c4713804001',0,'2024-02-13 17:48:53'),(1074738110912335873,1074720144913088514,5,'eea2c4713804001',0,'2024-02-13 18:04:33'),(1074742875675267073,1074720144913088514,6,'eea2c4713804001',0,'2024-02-13 18:23:29'),(1074746727677923329,1074720144913088514,7,'eea2c4713804001',0,'2024-02-13 18:38:47'),(1074751663920746497,1074720144913088514,8,'eea2c4713804001',0,'2024-02-13 18:58:24'),(1074755448080535553,1074720144913088514,9,'eea2c4713804001',0,'2024-02-13 19:13:26'),(1074759272455311361,1074720144913088514,10,'eea2c4713804001',0,'2024-02-13 19:28:38'),(1074764086765522945,1074720144913088514,11,'eea2c4713804001',0,'2024-02-13 19:47:46'),(1074768627653189633,1074720144913088514,12,'eea2c4713804001',0,'2024-02-13 20:05:49'),(1074773343460216833,1074720144913088514,13,'eea2c4713804001',0,'2024-02-13 20:24:33'),(1074777090752114689,1074720144913088514,14,'eea2c4713804001',0,'2024-02-13 20:39:26'),(1074780920831127553,1074720144913088514,15,'eea2c4713804001',0,'2024-02-13 20:54:39'),(1074784760414449665,1074720144913088514,16,'eea2c4713804001',1,'2024-02-13 21:09:55'),(1074785252775407617,1074785252775407618,1,'eea2c4713804001',0,'2024-02-13 21:11:52'),(1074788992395857921,1074785252775407618,2,'eea2c4713804001',1,'2024-02-13 21:26:44'),(1075702768225873921,1075702768225873922,1,'eea2c4713804001',1,'2024-02-16 09:57:45'),(1079414127962628097,1079414127962628098,1,'eea2c4713804001',1,'2024-02-26 15:45:22');
/*!40000 ALTER TABLE `account_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `keystore`
--

DROP TABLE IF EXISTS `keystore`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `keystore` (
  `project_id` varchar(255) NOT NULL,
  `key` blob NOT NULL,
  PRIMARY KEY (`project_id`),
  CONSTRAINT `FKkeystore677640` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keystore`
--

LOCK TABLES `keystore` WRITE;
/*!40000 ALTER TABLE `keystore` DISABLE KEYS */;
/*!40000 ALTER TABLE `keystore` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project` (
  `id` varchar(255) NOT NULL,
  `account_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `api_key` varchar(255) NOT NULL DEFAULT uuid(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `api_key` (`api_key`),
  KEY `FKproject313086` (`account_id`),
  CONSTRAINT `FKproject313086` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES ('efad974af402001','eea2c4713804001','Users','2023-02-26 14:46:29','2023-02-26 14:46:29','f5d73fe5-b5a9-11ed-98f9-0242ac170002'),('efad979e9402001','eea2c4713804001','Admin','2023-02-26 14:46:34','2023-02-26 14:46:34','f907e525-b5a9-11ed-98f9-0242ac170002');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `server_settings`
--

DROP TABLE IF EXISTS `server_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `server_settings` (
  `allow_multiple_accounts` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `server_settings`
--

LOCK TABLES `server_settings` WRITE;
/*!40000 ALTER TABLE `server_settings` DISABLE KEYS */;
INSERT INTO `server_settings` VALUES (0);
/*!40000 ALTER TABLE `server_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` varchar(255) NOT NULL,
  `project_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `enabled` tinyint(4) NOT NULL DEFAULT 1,
  `verified` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `FKuser291107` (`project_id`),
  CONSTRAINT `FKuser291107` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('efad9a1cf402001','efad974af402001','Bob','bob@example.com','$2b$12$Ekj8F4.hSDGYqklSoYvmNOhawWPa8L03z42rEVtf3inZ0R1wUQMo6','2023-02-26 14:47:15','2023-02-26 14:47:15',1,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_session`
--

DROP TABLE IF EXISTS `user_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_session` (
  `id` bigint(20) NOT NULL,
  `session_id` bigint(20) NOT NULL,
  `iteration` int(10) NOT NULL DEFAULT 1,
  `user_id` varchar(255) NOT NULL,
  `valid` tinyint(4) NOT NULL DEFAULT 1,
  `expires` timestamp NOT NULL,
  PRIMARY KEY (`session_id`,`iteration`),
  UNIQUE KEY `id` (`id`),
  KEY `FKuser_sessi859336` (`user_id`),
  CONSTRAINT `FKuser_sessi859336` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_session`
--

LOCK TABLES `user_session` WRITE;
/*!40000 ALTER TABLE `user_session` DISABLE KEYS */;
INSERT INTO `user_session` VALUES (1079414349744840705,1079414349744840706,1,'efad9a1cf402001',1,'2024-02-26 15:46:15');
/*!40000 ALTER TABLE `user_session` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-27  8:42:27
