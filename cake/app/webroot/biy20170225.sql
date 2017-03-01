CREATE DATABASE  IF NOT EXISTS `biy` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `biy`;
-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: localhost    Database: biy
-- ------------------------------------------------------
-- Server version	5.5.47-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `galaxies`
--

DROP TABLE IF EXISTS `galaxies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `galaxies` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `quadrant_id` int(10) NOT NULL,
  `x` int(11) DEFAULT NULL,
  `y` int(11) DEFAULT NULL,
  `age` float DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `galaxies`
--

LOCK TABLES `galaxies` WRITE;
/*!40000 ALTER TABLE `galaxies` DISABLE KEYS */;
INSERT INTO `galaxies` VALUES (1,'Build-It-Yourself Laboratory','Where dreams of never-before-seen contraptions come to life.',1,0,0,0,'galaxies','galaxy-circle.png',1),(2,'Art Gallery','Where artists rule!',1,70,100,0,'galaxies','iu-galaxy-elipses-wen.png',1),(3,'Balck Eye','Also called \"Evil Eye\" galaxy.',1,-70,-100,0,'galaxies','galaxy-big-stars.png',1),(4,'Unknown Galaxy','Too far to explore...',2,0,0,0,NULL,NULL,0),(5,'Unknown Galaxy','Too far to explore...',2,100,100,0,NULL,NULL,0),(6,'Unknown Galaxy','Too far to explore...',3,0,0,0,NULL,NULL,0),(7,'Unknown Galaxy','Too far to explore...',3,-100,-100,0,NULL,NULL,0),(8,'Unknown Galaxy','Too far to explore...',4,0,0,0,NULL,NULL,0),(9,'Unknown Galaxy','Too far to explore...',4,100,100,0,NULL,NULL,0),(10,'Unknown Galaxy','Too far to explore...',5,0,0,0,NULL,NULL,0),(11,'Unknown Galaxy','Too far to explore...',5,-100,-100,0,NULL,NULL,0),(12,'Unknown Galaxy','Too far to explore...',6,0,0,0,NULL,NULL,0),(13,'Unknown Galaxy','Too far to explore...',6,100,100,0,NULL,NULL,0),(14,'Unknown Galaxy','Too far to explore...',7,0,0,0,NULL,NULL,0),(15,'Unknown Galaxy','Too far to explore...',7,-100,-100,0,NULL,NULL,0),(16,'Unknown Galaxy','Too far to explore...',8,0,0,0,NULL,NULL,0),(17,'Unknown Galaxy','Too far to explore...',8,100,100,0,NULL,NULL,0),(18,'Milky Way','Where earth in.',1,150,-50,0,NULL,NULL,1);
/*!40000 ALTER TABLE `galaxies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `planets`
--

DROP TABLE IF EXISTS `planets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `planets` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `system_id` int(11) DEFAULT NULL,
  `description` text,
  `image_url` varchar(255) NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL DEFAULT '',
  `first_name` varchar(255) NOT NULL DEFAULT '',
  `last_name` varchar(255) NOT NULL DEFAULT '',
  `birth_date` date DEFAULT NULL,
  `hometown` varchar(255) DEFAULT NULL,
  `school` varchar(255) DEFAULT NULL,
  `hobbies` varchar(255) DEFAULT NULL,
  `quotations` text,
  `heroes` varchar(255) DEFAULT NULL,
  `interests` varchar(255) DEFAULT NULL,
  `goals` text,
  `resume_url` varchar(255) DEFAULT NULL,
  `avatar_url` varchar(255) DEFAULT NULL,
  `approved` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `planet_edge` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(32) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `planets`
--

LOCK TABLES `planets` WRITE;
/*!40000 ALTER TABLE `planets` DISABLE KEYS */;
INSERT INTO `planets` VALUES (1,4,'Hello World!','1','','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'0000-00-00 00:00:00','2017-02-03 04:34:41',2,1,'Steve\'s Planet','uRdmKWG.gif'),(2,3,'JONATHAN\'S Planet','2','','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'0000-00-00 00:00:00','2017-01-29 04:20:03',3,2,'JONATHAN\'S ','rocket-18.png'),(3,3,'nathan\'s planet','3','','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'0000-00-00 00:00:00','2017-01-29 04:20:03',4,3,'nathan\'s','planet1.png'),(5,4,'Wen\'s Planet','5','','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'0000-00-00 00:00:00','2017-02-03 06:21:29',5,6,'Wen\'s Little Planet','planet-moon.png'),(6,4,'The planet Swizzorblotz is where nothing is impossible.','6','','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'0000-00-00 00:00:00','2017-02-03 06:21:29',3,7,'Swizzorblotz','planet-black-hole.png'),(13,4,'This is my vacation home, see my other planet in the next solar system!!!','13','','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'0000-00-00 00:00:00','2017-02-03 04:34:41',4,13,'Brent\'s Other Planet','asteriod.png'),(19,2,NULL,'19','','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'0000-00-00 00:00:00','2017-01-29 04:21:27',3,18,'laasya\'s','img.jpg'),(21,2,'Join me as we explore the infinity and beyond. #BuzzLightyear =)','21','','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'0000-00-00 00:00:00','2017-01-29 04:21:27',1,20,'gisemba','biygif.gif'),(22,2,'Hello, creature! \r\nWelcome to this humble planet in which I hope you\'ll find things that will blow your mind!\r\nSo, please land your spaceship wherever you want... if you dare...','22','','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'0000-00-00 00:00:00','2017-02-05 15:34:24',4,21,'j.i.sus\' planet ','planet-icon-png-25.png'),(23,2,'A really cool planet.','23','','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'0000-00-00 00:00:00','2017-02-10 03:15:45',2,22,'JosÃ© MarÃ­a\'s Planet ðŸ’','chicken.gif'),(25,8,'this is a planet for debug','25','','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'0000-00-00 00:00:00','2017-01-29 04:52:35',3,23,'debug','planet-ring.png'),(26,7,NULL,'26','','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'0000-00-00 00:00:00','2017-01-29 15:43:35',1,24,'Example1','observaciÃ³n.png'),(27,1,NULL,'27','','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'0000-00-00 00:00:00','2017-02-03 04:35:44',4,9,'Brent\'s Official Planet','planet-brent-iu-2017.png');
/*!40000 ALTER TABLE `planets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profiles` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(32) DEFAULT NULL,
  `hometown` varchar(32) DEFAULT NULL,
  `school` varchar(48) DEFAULT NULL,
  `heros` varchar(255) DEFAULT NULL,
  `hobbies` varchar(64) DEFAULT NULL,
  `favs` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `avatar_url` varchar(16) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `goals` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles`
--

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles` VALUES (1,1,'stevesuyao@gmail.com','steve','Beijing','NEU','Optimus Prime','Soccer, Programming','CG','stevesuyao.com','1','giphy.gif','8,000 users on BIY IU'),(2,2,'jheckeman@hotmail.com','Jonathan','Bellevue','Hogwarts','My Dad','Engineering, Programming','Taking things apart','build-it-yourself.com/k-mission-ctrl/mission-ctrl-room.html','2','a2.png','30,000 users on BIY IU'),(3,3,'nathaohara9@gmail.com','Nathan','Westwood','Thurston','Paul McCartney','Computers & Music N\' Stuff','Computer, Music, N\' Stuff','52.86.127.25/iu-old/universe/uploads/projects/114/349.html','3','astronaut.jpg','Learn Flash, Get Flash, Be a Better Bassist, Let my Planet Grow Bigger then Planet Connor'),(5,5,'test@biy.com','test2','test','','','','','build-it-yourself.com','5','working-abroad-2.png',''),(6,6,'wen@build-it-yourself.com','Wen YU','Suzhou, China','Boston Uni.','Many!','','','www.wen-yu.org','6','birds-3.png','Learn German in 2017'),(7,7,'john@build-it-yourself.com','John','Cambridge','Cornell','Popeye, Don Quxiote','tennis, guitar, cartooning','Quote: You can\'t win if you don\'t bet.','build-it-yourself.com/john/','7','anim-bird-fly-xpar150.gif','Be smart'),(9,9,'imagelucidity@gmail.com','','','','','','','imagelucidity.com','9','racing.jpg',''),(10,10,'bstn32508@gmail.com','Brent','Methuen','School','Su','3d','','scionedesigns.com',NULL,NULL,''),(11,11,'scionedesigns@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(12,12,'test2@biy.com','tetetetd','12334 123 123ddd','nu dddddddddd','dddd','','',NULL,'12','planet-ring.png',''),(13,13,'fakeemail@gmail.com','Brent','Methuen','School','Steve','3d Blender','','scionedesigns.com',NULL,NULL,''),(14,14,'test3@biy.com','test test test','test test test','test teste tsets','tests ts','tst tst','tset tset ','no','14','3cd230c1f7.gif','tset tsts'),(15,15,'test4@biy.com','','','','','','',NULL,'15','giphy (1).gif',''),(16,16,'ckg36@cornell.edu',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(17,17,'josem_nassar@hotmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(18,18,'lpr46@cornell.edu','Laasya Renganathan','Cary','Cornell','','Ultimate frisbee','Science and Engineering',NULL,NULL,NULL,''),(19,19,'test6@biy.com','test5','','','','','',NULL,'19','3cd230c1f7.gif',''),(20,20,'incognitoc11@gmail.com','Claudia','Nairobi, Kenya','Cornell University','','Music, Cooking,  Baking, Photography','',NULL,'20','rocket1.gif',''),(21,21,'jes.librado@gmail.com','Jesus Librado','Xalapa, MEX','Tecnologico de Monterrey','My parents, God, Nikola Tesla','Reading, coding, volleyball, music, roller skating, travelling','Software, science, engineering, physics',NULL,'21','predator.png','Learn something new each day'),(22,22,'chemanassar@gmail.com','JosÃ© MarÃ­a','Mexico','Las Hayas (and hopefully soon, a really nice uni','Gabe the dog, Aaron Swartz','Music, movies and sleep','SCIENCE!','josemcasas.com','22','584b1a0d526b8582f1dc7d30.png','Become a super pro programmer!'),(23,23,'debug@biy.com','debug','','','','','',NULL,'23','NYCGifathon12.gif',''),(24,24,'librado.polanco@outlook.com','','','','','','',NULL,'24','observaciÃ³n.png',''),(25,25,'adonlin957@yahoo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quadrants`
--

DROP TABLE IF EXISTS `quadrants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quadrants` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  `x` int(16) DEFAULT NULL,
  `y` int(16) DEFAULT NULL,
  `color` varchar(10) DEFAULT NULL,
  `radius` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quadrants`
--

LOCK TABLES `quadrants` WRITE;
/*!40000 ALTER TABLE `quadrants` DISABLE KEYS */;
INSERT INTO `quadrants` VALUES (1,'1st','',3622,1250,'purple',500),(2,'2nd','',6307,4393,'red',500),(3,'3rd','',5221,2538,'red',500),(4,'4th','',1998,4595,'blue',500),(5,'5th','',1604,1533,'orange',500),(6,'6th','',3400,2929,'blue',500),(7,'7th','',4729,4491,'purple',500),(8,'8th','',7326,2190,'green',500);
/*!40000 ALTER TABLE `quadrants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rockets`
--

DROP TABLE IF EXISTS `rockets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rockets` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `planet_id` int(11) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `hits` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rockets`
--

LOCK TABLES `rockets` WRITE;
/*!40000 ALTER TABLE `rockets` DISABLE KEYS */;
INSERT INTO `rockets` VALUES (1,1,'1.png','1',101),(2,1,'2.png','1',110),(3,1,'3.png','1',120),(21,6,'rocket1.png','21',0),(22,6,'rocket2.png','22',0),(23,10,'z-rckt.png','23',0),(24,5,'rocket2.png','24',0),(25,5,'rocket1.png','25',0),(26,13,'ice-cream-yum.png','26',0),(29,14,'giphy.gif','29',0),(30,14,'animation-rocket.gif','30',0),(31,14,'cab4c932437055.5682ac94eecc6.gif','31',0),(40,18,'gallery-1471381857-gif-season-2.gif','40',0),(41,18,'giphy (1).gif','41',0),(44,25,'cab4c932437055.5682ac94eecc6.gif','44',0),(45,22,'rocket-ship-png-2.png','45',0),(46,23,'rocketgabe.png','46',0),(47,1,'rocket2.png','47',100),(48,1,'iu-slpash-rocket.png','48',130);
/*!40000 ALTER TABLE `rockets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `skills` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `planet_id` int(10) DEFAULT NULL,
  `name` varchar(32) CHARACTER SET utf8 DEFAULT NULL,
  `type` varchar(32) CHARACTER SET utf8 DEFAULT NULL,
  `level` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` VALUES (1,1,'javascript','Programming',4.5),(2,1,'blender','3D Design',3),(3,1,'Mysql','DataBase',4),(4,2,'Photoshopping','Computer',3),(5,2,'Lego Building','Mechanical',4.8),(6,2,'Soldiering','Mechanical',4),(7,2,'HTML','Computer',3.6),(8,2,'Java','Computer',3),(9,2,'Objective-C ','Computer',3),(10,3,'Scratch Programming','Computer',5),(11,3,'Piano','Musical',3.5),(12,3,'LEGO Mindstorms NXT Programmer','Mechanical',4),(13,3,'Biking','Sports',4),(36,5,'Painting','Art',4.5),(37,6,'blues guitar','music',3),(38,6,'tennis','sports',4),(41,6,'Scratch','Programming',4),(43,10,'Blender 3D','Art',4),(44,10,'Web Design','Programming',4),(45,5,'violin','Music',2),(46,13,'Blender 3D','Art',4),(49,14,'ddd','ddd',1),(51,18,'joke','Other',5),(53,22,'C','Coding',5),(54,22,'Java','Coding',8),(55,22,'C','Coding',3),(56,22,'C','Coding',3),(57,22,'C','Coding',3),(58,22,'C','Coding',3),(59,22,'C','Coding',3),(60,22,'C','Coding',5),(61,22,'C','Programming',3),(62,22,'jquery','Coding',3),(63,1,'php','Programming',3),(64,24,'guitar','Music',4),(65,25,'c','Programming',1),(66,22,'C','Programming',3),(67,22,'C','Programming',3),(68,22,'C','Programming',3),(69,22,'C','Programming',3),(70,22,'C','Programming',3),(71,22,'Java','Programming',4),(72,26,'Java','Programming',4),(73,26,'C','Programming',3),(74,27,'Blender 3D','Art',4),(75,27,'Web Development','Programming',4),(76,6,'Cartooning','Art',3),(77,22,'C','Programming',3),(78,22,'C','Programming',3),(79,22,'C','Programming',3),(80,22,'C','Programming',3),(81,22,'C','Programming',3),(82,22,'Guitar','Music',3),(84,23,'C#','Programming',3),(85,23,'Web Dev','Programming',4);
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `systems`
--

DROP TABLE IF EXISTS `systems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `systems` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  `galaxy_id` int(10) NOT NULL,
  `planet_amount` int(10) DEFAULT NULL,
  `x` int(11) DEFAULT NULL,
  `y` int(11) DEFAULT NULL,
  `age` float DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `systems`
--

LOCK TABLES `systems` WRITE;
/*!40000 ALTER TABLE `systems` DISABLE KEYS */;
INSERT INTO `systems` VALUES (1,'BIY Workshop Leader','Home of Socrates, Plato,  Brent and Selene',1,12,3000,2225,0,'stars','star-member-wkshp.png'),(2,'BIY Advanced Builder','Hot shot high school students fine tune their port',1,10,2000,1125,0,'stars','star-jg-yellow-adv-build.png'),(3,'BIY Alumni','Many pioneers and eager builders have come before ',1,8,1500,3275,0,'stars','iu-star-lightning-wen.png'),(4,'BIY Development Team','Work hard. Play hard.',1,10,3600,3700,0,'stars','star-jg-biy.png'),(5,'Unknown',NULL,1,10,4500,5000,0,NULL,NULL),(6,'Unknown',NULL,1,10,5200,2400,0,NULL,NULL),(7,'Unknown',NULL,1,12,6000,1200,0,NULL,NULL),(8,'Debug & Test',NULL,1,11,7000,2500,0,NULL,NULL),(9,'Unknown1',NULL,2,8,4000,3050,0,'stars','iu-star-ice-wen.png'),(10,'Unknown2',NULL,2,8,1500,2250,0,'stars','iu-star-rainbow-wen.png'),(11,'Unknown3',NULL,2,8,3000,2050,0,'stars','star-jg-blue.png'),(12,'Unknown4',NULL,2,8,5000,2250,0,'stars',NULL),(13,'Unknown',NULL,3,8,2000,2000,0,'stars',NULL),(14,'Unknown',NULL,3,8,4000,2000,0,'stars',NULL),(15,'Unknown',NULL,3,8,4000,3500,0,'stars',NULL),(16,'Unknown',NULL,3,8,2000,3500,0,'stars',NULL),(17,'Unknown',NULL,3,8,6000,2000,0,'stars',NULL),(18,'Unknown',NULL,3,8,6000,3500,0,'stars',NULL),(19,'Unknown',NULL,18,8,2000,1500,0,'stars',NULL),(20,'Unknown',NULL,18,8,3000,2000,0,'stars',NULL),(21,'Unknown',NULL,18,8,4000,2500,0,'stars',NULL),(22,'Unknown',NULL,18,8,5000,3000,0,'stars',NULL),(23,'Unknown',NULL,18,8,6000,3500,0,'stars',NULL),(24,'Unknown',NULL,18,8,7000,4000,0,'stars',NULL);
/*!40000 ALTER TABLE `systems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `hits` int(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'stevesuyao@gmail.com','279c6ef760c66fec59f2ecd3b86d2a4a7f5ffae2','author','2016-12-15 18:32:04','2016-12-15 18:32:04',0),(2,'jheckeman@hotmail.com','279c6ef760c66fec59f2ecd3b86d2a4a7f5ffae2','author','2016-12-16 09:17:39','2016-12-16 09:17:39',0),(3,'nathanohara9@gmail.com','279c6ef760c66fec59f2ecd3b86d2a4a7f5ffae2','author','2016-12-16 09:45:02','2016-12-16 09:45:02',0),(5,'test@biy.com','279c6ef760c66fec59f2ecd3b86d2a4a7f5ffae2','author','2016-12-18 07:00:25','2016-12-18 07:00:25',0),(6,'wen@build-it-yourself.com','e3b08014687d1bf6be875f9555a114bbb6a1ad67','author','2016-12-27 18:30:14','2016-12-27 18:30:14',0),(7,'john@build-it-yourself.com','c26327eb79d60444d2b5239aaa84984d228f3378','author','2016-12-28 01:25:54','2016-12-28 01:25:54',0),(9,'imagelucidity@gmail.com','b8d8b3a158aaad5180367335251f6bca78607581','author','2016-12-30 19:20:52','2016-12-30 19:20:52',0),(10,'bstn32508@gmail.com','b8d8b3a158aaad5180367335251f6bca78607581','author','2016-12-30 19:50:19','2016-12-30 19:50:19',0),(11,'scionedesigns@gmail.com','b8d8b3a158aaad5180367335251f6bca78607581','author','2016-12-30 20:19:59','2016-12-30 20:19:59',0),(12,'test2@biy.com','279c6ef760c66fec59f2ecd3b86d2a4a7f5ffae2','author','2016-12-31 18:36:54','2016-12-31 18:36:54',0),(13,'fakeemail@gmail.com','b8d8b3a158aaad5180367335251f6bca78607581','author','2017-01-03 15:13:10','2017-01-03 15:13:10',0),(14,'test3@biy.com','279c6ef760c66fec59f2ecd3b86d2a4a7f5ffae2','author','2017-01-06 06:14:30','2017-01-06 06:14:30',0),(15,'test4@biy.com','279c6ef760c66fec59f2ecd3b86d2a4a7f5ffae2','author','2017-01-08 06:25:47','2017-01-08 06:25:47',0),(16,'ckg36@cornell.edu','30121e7201d452d6cdb21f4f0f99a588e8cb98c4','author','2017-01-08 19:18:01','2017-01-08 19:18:01',0),(17,'josem_nassar@hotmail.com','4c557a97f97eedc18736b93ba5eccbf604cfb279','author','2017-01-10 18:46:33','2017-01-10 18:46:33',0),(18,'lpr46@cornell.edu','2597c80cdc8b76c432ff8e8900c65b11a3b5f195','author','2017-01-15 14:58:48','2017-01-15 14:58:48',0),(19,'test6@biy.com','279c6ef760c66fec59f2ecd3b86d2a4a7f5ffae2','author','2017-01-15 15:10:16','2017-01-15 15:10:16',0),(20,'incognitoc11@gmail.com','1ddd3dfb989a5b4a846daae62bbb9e2ba8453534','author','2017-01-15 15:32:09','2017-01-15 15:32:09',0),(21,'jes.librado@gmail.com','eb6a5093cf59771df43556d476db9dcf33013658','author','2017-01-22 07:18:50','2017-01-22 07:18:50',0),(22,'chemanassar@gmail.com','b6770fd9d1529d3fc53b5bf59c3500525474e2a1','author','2017-01-25 02:53:55','2017-01-25 02:53:55',0),(23,'debug@biy.com','279c6ef760c66fec59f2ecd3b86d2a4a7f5ffae2','author','2017-01-28 19:45:34','2017-01-28 19:45:34',0),(24,'librado.polanco@outlook.com','279c6ef760c66fec59f2ecd3b86d2a4a7f5ffae2','author','2017-01-29 15:42:11','2017-01-29 15:42:11',0),(25,'adonlin957@yahoo.com','20b71af4e6817785d5be8d09d030464f6e540888','author','2017-02-14 14:01:03','2017-02-14 14:01:03',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `videos`
--

DROP TABLE IF EXISTS `videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `videos` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `youtube_url` varchar(16) CHARACTER SET utf8 DEFAULT NULL,
  `planet_id` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `pdf` varchar(255) DEFAULT NULL,
  `file_url` varchar(255) DEFAULT NULL,
  `ppt` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videos`
--

LOCK TABLES `videos` WRITE;
/*!40000 ALTER TABLE `videos` DISABLE KEYS */;
INSERT INTO `videos` VALUES (1,'vqes3HbnFKM',1,'',NULL,NULL,NULL,NULL,'Perfetch App'),(2,'DBlZNBLrcyE',1,'',NULL,'2','New Text Document.ppt',NULL,''),(3,'rLMGv0S6biU',2,NULL,NULL,NULL,NULL,NULL,NULL),(4,'iWYbqV22lxw',3,NULL,NULL,NULL,NULL,NULL,NULL),(34,'Hy2N768bxRs',6,NULL,NULL,NULL,NULL,NULL,NULL),(35,'jXTh94h5O9c',6,NULL,NULL,NULL,NULL,NULL,NULL),(36,'j7_xmzyHos8',10,NULL,NULL,NULL,NULL,NULL,NULL),(37,'EyWb1U1epZM',5,NULL,NULL,NULL,NULL,NULL,NULL),(39,'j7_xmzyHos8',13,NULL,NULL,NULL,NULL,NULL,NULL),(45,'iX-QaNzd-0Y',1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. ','Fine Registration _ISCAS13.pdf','45','iu-design-spec-2014.ppt','animation-rocket.gif','test'),(59,'',6,'Inspire and guide the next generation of builders',NULL,'59','biy-execution-phase.ppt',NULL,'Build-It-Yourself'),(60,'',6,'Build-It-Yourself Cuckoo Bird Stickers',NULL,'60',NULL,'anim-bird-fly-xpar150.gif','Emojis');
/*!40000 ALTER TABLE `videos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-02-25 10:32:45
