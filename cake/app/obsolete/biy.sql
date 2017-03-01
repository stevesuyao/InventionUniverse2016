# MySQL-Front 5.1  (Build 3.62)

/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE */;
/*!40101 SET SQL_MODE='' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES */;
/*!40103 SET SQL_NOTES='ON' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;


# Host: localhost    Database: biy
# ------------------------------------------------------
# Server version 5.1.31-1ubuntu2

DROP DATABASE IF EXISTS `biy`;
CREATE DATABASE `biy` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `biy`;

#
# Source for table comments
#

DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `planet_id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `text` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=92 DEFAULT CHARSET=utf8;

#
# Dumping data for table comments
#
LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;

INSERT INTO `comments` VALUES (1,23,24,'I like your planet!','2009-08-17 13:05:35');
INSERT INTO `comments` VALUES (8,37,34,'Your planet looks cool!','2009-08-17 15:29:03');
INSERT INTO `comments` VALUES (9,42,34,'You like green!','2009-08-17 15:29:51');
INSERT INTO `comments` VALUES (10,36,34,'I like your profile picture!','2009-08-17 15:30:46');
INSERT INTO `comments` VALUES (11,41,34,'Spore creature is so coool!','2009-08-17 15:31:11');
INSERT INTO `comments` VALUES (12,33,34,'The kitty looks comfortable','2009-08-17 15:31:51');
INSERT INTO `comments` VALUES (13,23,34,'so do i!','2009-08-17 19:12:29');
INSERT INTO `comments` VALUES (14,23,34,'i just discovered will\'s secret base!','2009-08-17 19:12:55');
INSERT INTO `comments` VALUES (17,36,34,'and the ring!','2009-08-17 21:29:15');
INSERT INTO `comments` VALUES (18,33,37,'I\'d like to be this kitten!','2009-08-17 22:52:27');
INSERT INTO `comments` VALUES (19,36,37,'Way cool projects!','2009-08-18 07:23:35');
INSERT INTO `comments` VALUES (20,41,37,'Funky planet!!!','2009-08-18 07:24:56');
INSERT INTO `comments` VALUES (21,42,37,'Your projects are hot ...','2009-08-18 07:30:39');
INSERT INTO `comments` VALUES (23,44,37,'Where can I get a gas mask like the one your avatar has?','2009-08-18 19:46:36');
INSERT INTO `comments` VALUES (24,34,41,'thank you for the comment your profile photo its also cool','2009-08-18 23:48:11');
INSERT INTO `comments` VALUES (25,37,41,'see you at tomorrows webcast','2009-08-18 23:48:54');
INSERT INTO `comments` VALUES (26,41,34,'what are you working on now?','2009-08-19 04:29:16');
INSERT INTO `comments` VALUES (27,44,44,'Ha Ha Ha! ','2009-08-19 11:29:11');
INSERT INTO `comments` VALUES (30,34,41,'i am working on learning flex i am doing the learn flex in one week tutorials','2009-08-19 18:07:21');
INSERT INTO `comments` VALUES (31,34,41,'today i did my first flex aplication','2009-08-19 18:07:48');
INSERT INTO `comments` VALUES (32,41,34,'keep it up! post some screenshots/ppts of your latest progress :)','2009-08-20 01:38:54');
INSERT INTO `comments` VALUES (34,34,41,'i posted a image of my flex application its the one i did following the tutorial','2009-08-21 00:34:19');
INSERT INTO `comments` VALUES (35,45,34,'tianxin!!! welcome! post some of your cool projects here :D','2009-08-21 09:47:04');
INSERT INTO `comments` VALUES (36,41,34,'haha i saw your flex project! ','2009-08-21 09:48:00');
INSERT INTO `comments` VALUES (37,34,41,'now i have made more exercises and i update the flex project i will update a screenshot','2009-08-21 10:30:31');
INSERT INTO `comments` VALUES (39,48,48,'Welcome we won this nation for ourself \"Shadow Moses\"','2009-08-21 11:03:50');
INSERT INTO `comments` VALUES (40,49,52,'YO','2009-08-21 14:58:17');
INSERT INTO `comments` VALUES (41,49,52,'YO :D','2009-08-21 14:59:08');
INSERT INTO `comments` VALUES (42,52,49,'hey girl hey!','2009-08-21 14:59:15');
INSERT INTO `comments` VALUES (43,41,34,'cool! i bet i\'ll see your first flex game soon! good job!','2009-08-21 22:54:01');
INSERT INTO `comments` VALUES (44,48,34,'nice story! btw, do you know how to get rid of the background of your star/ make it transparent? google gimp transparent and follow the first link! :D looking forward to seeing more of your cool projects!','2009-08-21 22:56:12');
INSERT INTO `comments` VALUES (45,34,45,'Your hat is so AWESOME!','2009-08-22 00:23:56');
INSERT INTO `comments` VALUES (46,45,34,'thanks! post more projects!!!','2009-08-22 20:44:23');
INSERT INTO `comments` VALUES (47,42,34,'yay hellomotron6000 is alive!','2009-08-24 14:24:50');
INSERT INTO `comments` VALUES (48,40,34,'i like the graphics in your project!','2009-08-24 14:26:07');
INSERT INTO `comments` VALUES (49,42,42,'yes, it\'s alive, thanks for the help.','2009-08-24 20:30:49');
INSERT INTO `comments` VALUES (50,41,59,'Hey Jeronimo!  Can you teach me Flex?','2009-08-25 10:09:09');
INSERT INTO `comments` VALUES (51,44,34,'is that the invention universe trailer?!!! I LOVE IT!!!!','2009-08-25 17:50:51');
INSERT INTO `comments` VALUES (52,44,34,'and the game is super fun! nice job Daniel!','2009-08-25 17:52:25');
INSERT INTO `comments` VALUES (53,34,44,'thanx for watching the trailer i made','2009-08-25 19:16:45');
INSERT INTO `comments` VALUES (54,59,41,'sure i cant teach you if you want even though i am not jet ver good at it','2009-08-25 19:22:51');
INSERT INTO `comments` VALUES (55,59,41,'are you john??','2009-08-25 19:23:54');
INSERT INTO `comments` VALUES (56,41,44,'you play spore? cool creation!!!!','2009-08-25 19:38:51');
INSERT INTO `comments` VALUES (57,42,44,'cool planet, i like the cities','2009-08-25 19:53:02');
INSERT INTO `comments` VALUES (58,44,42,'the BIY Invention Universe Trailer is Awesome!','2009-08-25 20:40:04');
INSERT INTO `comments` VALUES (59,44,59,'Your Invention Universe trailer rocks!!!','2009-08-26 09:50:19');
INSERT INTO `comments` VALUES (60,44,41,'yes i play spore i hae the new expansion','2009-08-27 16:04:10');
INSERT INTO `comments` VALUES (61,42,42,'thanks.','2009-08-29 17:51:29');
INSERT INTO `comments` VALUES (62,34,42,'nice planet.','2009-08-29 17:52:02');
INSERT INTO `comments` VALUES (63,41,42,'i will eat your planet.','2009-08-29 17:52:44');
INSERT INTO `comments` VALUES (64,44,44,'i like the expansion too','2009-08-30 13:12:32');
INSERT INTO `comments` VALUES (65,62,62,'Hi everybody ','2009-08-31 16:04:11');
INSERT INTO `comments` VALUES (66,62,41,'hi','2009-08-31 19:58:27');
INSERT INTO `comments` VALUES (67,61,34,'your planet rocks jamie!!!','2009-08-31 20:01:10');
INSERT INTO `comments` VALUES (68,42,34,'what have you been working on recently?  ','2009-08-31 21:57:01');
INSERT INTO `comments` VALUES (69,61,42,'Cool Planet, 20k Leagues!','2009-09-01 13:04:49');
INSERT INTO `comments` VALUES (70,62,59,'Hey there good looking.  Que bien parecido eres!  Looking forward to watching your planet grow!','2009-09-02 15:21:00');
INSERT INTO `comments` VALUES (71,61,59,'Hey there Nautilus!  I want to live in your blue space macnine!','2009-09-02 15:25:12');
INSERT INTO `comments` VALUES (72,42,42,'scratch model makeovers and blender 3D modeling','2009-09-03 14:51:44');
INSERT INTO `comments` VALUES (73,39,34,'finally something on your planet! how\'s going?','2009-09-05 01:51:13');
INSERT INTO `comments` VALUES (74,62,62,'Dear Popeye , The squash head os my favorite planet I could pick . ','2009-09-07 23:18:59');
INSERT INTO `comments` VALUES (75,75,37,'Good going Las Hayas team!  We\'ll be looking for more Wedo Inventions.  What does your Scratch program do to control the plane?','2009-09-11 12:24:12');
INSERT INTO `comments` VALUES (76,75,75,'when you point the plane up it will accelarate when you point it down it will decelarate','2009-09-11 14:57:47');
INSERT INTO `comments` VALUES (77,37,75,'sorry john how can i make a video file lighter so that i can upload the wedo videos','2009-09-11 15:01:29');
INSERT INTO `comments` VALUES (78,75,59,'Nice WeDo videos!!!','2009-09-13 22:25:53');
INSERT INTO `comments` VALUES (79,77,34,'hey buddy! i like your photo in cheng huang miao','2009-09-14 22:56:03');
INSERT INTO `comments` VALUES (80,77,37,'It would be great if you could help us find some Swedish builders like you.','2009-09-16 09:42:20');
INSERT INTO `comments` VALUES (82,79,79,'very nice','2009-09-18 19:25:57');
INSERT INTO `comments` VALUES (83,80,33,'HI~~','2009-09-26 08:55:45');
INSERT INTO `comments` VALUES (84,84,59,'Hi Mariana ... I like your planet and your avitar.  Hope to see some pictures of your projects soon.  ` John from Build-It-Yourself','2009-10-13 22:24:05');
INSERT INTO `comments` VALUES (85,86,86,'ustedes zon geniales ','2009-10-18 18:45:41');
INSERT INTO `comments` VALUES (86,88,34,'great planet and project! what do you want your planet name to be? i can change it for you :)','2009-11-03 21:09:03');
INSERT INTO `comments` VALUES (87,80,90,'hi','2009-11-16 18:33:01');
INSERT INTO `comments` VALUES (88,91,37,'There are some Hot Shot programmers at the Pierce School!','2009-12-08 22:44:40');
INSERT INTO `comments` VALUES (89,37,95,'HI JOHN!!!','2009-12-17 15:30:50');
INSERT INTO `comments` VALUES (90,37,95,'blahblahblahblahblahblah','2009-12-17 15:31:22');
INSERT INTO `comments` VALUES (91,96,33,'Hello, world!','2009-12-30 13:45:34');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

#
# Source for table constellations
#

DROP TABLE IF EXISTS `constellations`;
CREATE TABLE `constellations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(255) NOT NULL DEFAULT '',
  `description` text,
  `image_url` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

#
# Dumping data for table constellations
#
LOCK TABLES `constellations` WRITE;
/*!40000 ALTER TABLE `constellations` DISABLE KEYS */;

INSERT INTO `constellations` VALUES (1,0,'Sagittarius','Sagittarius is one of the constellations of the zodiac. Its name is Latin for the archer, and its symbol is a stylized arrow. Sagittarius is commonly represented as a centaur drawing a bow. It lies between Ophiuchus to the west and Capricornus to the east.\r\n','assets/images/constellation.png');
/*!40000 ALTER TABLE `constellations` ENABLE KEYS */;
UNLOCK TABLES;

#
# Source for table galaxies
#

DROP TABLE IF EXISTS `galaxies`;
CREATE TABLE `galaxies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(255) NOT NULL DEFAULT '',
  `description` text,
  `image_url` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

#
# Dumping data for table galaxies
#
LOCK TABLES `galaxies` WRITE;
/*!40000 ALTER TABLE `galaxies` DISABLE KEYS */;

INSERT INTO `galaxies` VALUES (1,1,'Pioneers\' Quadrant','Circa late 2009, curious explorers started settling the Pioneers\' Quadrant.','assets/images/galaxy.png');
INSERT INTO `galaxies` VALUES (2,1,'Build-It-Yourself Quadrant','The Build-It-Yourself team is settling this Quadrant.','assets/images/galaxy.png');
/*!40000 ALTER TABLE `galaxies` ENABLE KEYS */;
UNLOCK TABLES;

#
# Source for table planet_viewcount
#

DROP TABLE IF EXISTS `planet_viewcount`;
CREATE TABLE `planet_viewcount` (
  `id` int(11) NOT NULL DEFAULT '0',
  `view_count` bigint(20) NOT NULL DEFAULT '0',
  `last_viewed` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

#
# Dumping data for table planet_viewcount
#
LOCK TABLES `planet_viewcount` WRITE;
/*!40000 ALTER TABLE `planet_viewcount` DISABLE KEYS */;

INSERT INTO `planet_viewcount` VALUES (1,1,'2009-08-21 19:58:58');
INSERT INTO `planet_viewcount` VALUES (23,39,'2009-12-08 02:06:08');
INSERT INTO `planet_viewcount` VALUES (24,12,'2009-12-08 15:26:43');
INSERT INTO `planet_viewcount` VALUES (25,15,'2009-12-28 08:26:26');
INSERT INTO `planet_viewcount` VALUES (27,11,'2009-12-17 15:18:44');
INSERT INTO `planet_viewcount` VALUES (28,8,'2009-08-18 19:26:09');
INSERT INTO `planet_viewcount` VALUES (29,25,'2009-12-18 22:07:16');
INSERT INTO `planet_viewcount` VALUES (30,14,'2009-12-30 16:18:43');
INSERT INTO `planet_viewcount` VALUES (31,24,'2009-12-29 13:38:58');
INSERT INTO `planet_viewcount` VALUES (32,19,'2009-12-31 12:25:58');
INSERT INTO `planet_viewcount` VALUES (33,258,'2009-12-31 12:21:57');
INSERT INTO `planet_viewcount` VALUES (34,358,'2009-12-30 13:40:19');
INSERT INTO `planet_viewcount` VALUES (35,12,'2009-12-17 15:16:27');
INSERT INTO `planet_viewcount` VALUES (36,145,'2009-12-30 17:18:56');
INSERT INTO `planet_viewcount` VALUES (37,271,'2009-12-31 13:13:06');
INSERT INTO `planet_viewcount` VALUES (38,1,'2009-08-07 10:31:08');
INSERT INTO `planet_viewcount` VALUES (39,36,'2009-12-31 12:21:14');
INSERT INTO `planet_viewcount` VALUES (40,77,'2009-12-31 09:50:34');
INSERT INTO `planet_viewcount` VALUES (41,206,'2009-12-30 13:46:21');
INSERT INTO `planet_viewcount` VALUES (42,178,'2009-12-29 10:09:10');
INSERT INTO `planet_viewcount` VALUES (43,35,'2009-12-29 10:16:43');
INSERT INTO `planet_viewcount` VALUES (44,91,'2009-12-29 10:11:38');
INSERT INTO `planet_viewcount` VALUES (45,20,'2009-11-23 20:35:29');
INSERT INTO `planet_viewcount` VALUES (46,52,'2009-12-22 08:22:31');
INSERT INTO `planet_viewcount` VALUES (47,23,'2009-12-18 22:07:25');
INSERT INTO `planet_viewcount` VALUES (48,49,'2009-12-30 13:39:09');
INSERT INTO `planet_viewcount` VALUES (49,22,'2009-12-18 22:09:01');
INSERT INTO `planet_viewcount` VALUES (50,4,'2009-09-13 10:05:52');
INSERT INTO `planet_viewcount` VALUES (51,5,'2009-09-13 10:05:44');
INSERT INTO `planet_viewcount` VALUES (52,12,'2009-08-21 20:03:14');
INSERT INTO `planet_viewcount` VALUES (53,9,'2009-09-13 10:05:33');
INSERT INTO `planet_viewcount` VALUES (54,6,'2009-09-13 10:04:56');
INSERT INTO `planet_viewcount` VALUES (55,2,'2009-08-21 17:58:07');
INSERT INTO `planet_viewcount` VALUES (56,7,'2009-09-09 02:42:11');
INSERT INTO `planet_viewcount` VALUES (57,15,'2009-09-13 10:05:58');
INSERT INTO `planet_viewcount` VALUES (58,9,'2009-12-17 15:13:48');
INSERT INTO `planet_viewcount` VALUES (59,32,'2009-12-29 10:17:14');
INSERT INTO `planet_viewcount` VALUES (60,14,'2009-12-30 22:29:59');
INSERT INTO `planet_viewcount` VALUES (61,48,'2009-12-30 16:17:28');
INSERT INTO `planet_viewcount` VALUES (62,29,'2009-10-04 20:12:16');
INSERT INTO `planet_viewcount` VALUES (63,33,'2009-12-28 11:39:34');
INSERT INTO `planet_viewcount` VALUES (64,11,'2009-09-13 13:43:33');
INSERT INTO `planet_viewcount` VALUES (65,10,'2009-12-18 22:00:06');
INSERT INTO `planet_viewcount` VALUES (66,4,'2009-12-18 21:58:11');
INSERT INTO `planet_viewcount` VALUES (67,5,'2009-12-18 22:02:23');
INSERT INTO `planet_viewcount` VALUES (68,2,'2009-09-08 22:46:25');
INSERT INTO `planet_viewcount` VALUES (69,3,'2009-09-10 01:20:14');
INSERT INTO `planet_viewcount` VALUES (70,3,'2009-12-18 21:58:58');
INSERT INTO `planet_viewcount` VALUES (71,6,'2009-12-18 21:59:30');
INSERT INTO `planet_viewcount` VALUES (72,4,'2009-12-18 21:57:04');
INSERT INTO `planet_viewcount` VALUES (73,3,'2009-09-27 17:25:47');
INSERT INTO `planet_viewcount` VALUES (74,17,'2009-12-07 00:12:08');
INSERT INTO `planet_viewcount` VALUES (75,88,'2009-12-05 04:11:45');
INSERT INTO `planet_viewcount` VALUES (76,9,'2009-09-30 18:11:05');
INSERT INTO `planet_viewcount` VALUES (77,17,'2009-12-29 10:07:15');
INSERT INTO `planet_viewcount` VALUES (78,5,'2009-12-08 15:47:53');
INSERT INTO `planet_viewcount` VALUES (79,11,'2009-12-29 13:40:39');
INSERT INTO `planet_viewcount` VALUES (80,5,'2009-12-23 11:08:22');
INSERT INTO `planet_viewcount` VALUES (81,18,'2009-11-15 10:23:28');
INSERT INTO `planet_viewcount` VALUES (82,10,'2009-11-03 07:46:07');
INSERT INTO `planet_viewcount` VALUES (83,3,'2009-12-18 22:04:52');
INSERT INTO `planet_viewcount` VALUES (84,18,'2009-12-17 20:23:30');
INSERT INTO `planet_viewcount` VALUES (85,4,'2009-12-07 00:14:39');
INSERT INTO `planet_viewcount` VALUES (86,15,'2009-12-31 12:03:41');
INSERT INTO `planet_viewcount` VALUES (87,5,'2009-12-23 14:45:33');
INSERT INTO `planet_viewcount` VALUES (88,36,'2009-12-23 11:08:41');
INSERT INTO `planet_viewcount` VALUES (89,4,'2009-11-22 01:54:51');
INSERT INTO `planet_viewcount` VALUES (90,5,'2009-11-16 19:00:23');
INSERT INTO `planet_viewcount` VALUES (91,30,'2009-12-28 13:34:20');
INSERT INTO `planet_viewcount` VALUES (92,2,'2009-12-28 13:18:13');
INSERT INTO `planet_viewcount` VALUES (93,3,'2009-12-28 13:40:48');
INSERT INTO `planet_viewcount` VALUES (94,6,'2009-12-13 21:19:57');
INSERT INTO `planet_viewcount` VALUES (95,26,'2009-12-23 17:25:19');
INSERT INTO `planet_viewcount` VALUES (96,26,'2009-12-30 14:08:22');
/*!40000 ALTER TABLE `planet_viewcount` ENABLE KEYS */;
UNLOCK TABLES;

#
# Source for table planets
#

DROP TABLE IF EXISTS `planets`;
CREATE TABLE `planets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(255) NOT NULL DEFAULT '',
  `description` text,
  `image_url` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  `salt` varchar(255) NOT NULL DEFAULT '',
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  FULLTEXT KEY `name_2` (`name`,`description`,`hometown`,`school`,`hobbies`,`interests`,`goals`,`first_name`)
) ENGINE=MyISAM AUTO_INCREMENT=97 DEFAULT CHARSET=utf8;

#
# Dumping data for table planets
#
LOCK TABLES `planets` WRITE;
/*!40000 ALTER TABLE `planets` DISABLE KEYS */;

INSERT INTO `planets` VALUES (23,2,'Persius','sdf','assets/images/planet.png','cf2a9a55714d2ae2e39dedb8b67a1aa65cf4b93e','6bb44015c4d8f22d9cc10e6a0f7b287e','per@si.us','Per','Sius',NULL,NULL,NULL,'hobbies','quotations','heroes','interests','Eliminating poverty!',NULL,'assets/images/astronaut.jpg',1,'2009-06-19 15:05:39','2009-08-13 09:29:51');
INSERT INTO `planets` VALUES (24,2,'Zombie','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu augue ligula. In hac habitasse platea dictumst. Morbi sodales consectetur porttitor. Quisque vitae dignissim eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean vitae sem nibh.','assets/images/planet.png','132709f3db16f1048f63cfe6c884198468783bc6','b001287f847ad5638ad5e47fc25f0f91','zo@mb.ie','Zom','Bie',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'assets/images/astronaut.jpg',1,'2009-06-21 21:11:12','2009-08-13 09:29:51');
INSERT INTO `planets` VALUES (25,2,'Rahul','sdf','assets/images/planet.png','e6bcaa1305fc852951ccec1f63f66ab752c6e975','1afbdbd29cd538424c82ee4fcbb26174','rahulr@gmail.com','Rahul','Ramakrishnan',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'assets/images/astronaut.jpg',1,'2009-06-24 10:23:49','2009-08-13 09:29:51');
INSERT INTO `planets` VALUES (27,2,'Somewhere','Out there...\t','assets/images/planet.png','asdf','asdf','asdf','asdf','asdf',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'assets/images/astronaut.jpg',1,'0000-00-00 00:00:00','2009-08-13 09:29:51');
INSERT INTO `planets` VALUES (28,2,'Foo',NULL,'assets/images/planet.png','d34c07bd7faa57263973843ac6ca38a30d4ba598','329b9c13b48cb7a2108d178cc7410da5','foo@foo.foo','foo','foo',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'poverty\r\n',NULL,'../uploads/avatars/28.png',1,'2009-07-10 20:51:25','2009-08-04 04:15:09');
INSERT INTO `planets` VALUES (29,1,'Apple!',NULL,'assets/images/planet.png','573f79faad215e9b2d8d730722460a8bc1588fa8','0c6315e8e8cdfdf92ff84e4965b2dfb4','asdf@asdf.com','asdf','asdf',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'assets/images/astronaut.jpg',1,'2009-07-10 20:51:53','2009-08-13 09:29:51');
INSERT INTO `planets` VALUES (30,1,'Sharona',NULL,'assets/images/planet.png','751df338afad0bd3bf5d1a7e4b7382111e2e008c','b76e25d24f5e854e3010d9b4c4831a08','s@s.sa','My','Sharona',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'assets/images/astronaut.jpg',1,'2009-07-10 21:19:16','2009-08-13 09:29:51');
INSERT INTO `planets` VALUES (31,1,'Banana','A banana zombie!','assets/images/planet.png','','','asdf','asdf','asdf',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'poverty',NULL,'assets/images/astronaut.jpg',1,'0000-00-00 00:00:00','2009-08-13 09:29:51');
INSERT INTO `planets` VALUES (32,1,'Mercury',NULL,'assets/images/planet.png','','','','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'assets/images/astronaut.jpg',1,'0000-00-00 00:00:00','2009-08-13 09:29:51');
INSERT INTO `planets` VALUES (33,3,'Hearson',NULL,'../uploads/planets/33.png?ver=1250339922','f5a4a088bf05723479ec79cf56ba9610841f4614','0667cc1852db2c9644b750234f2a3178','hearson@gmail.com','Wenyu','Zhang','1989-01-25','Shanghai','Purdue University','Computer Programming','Test','K.I.T.T.','Music','???¨¨¡ì¡ë?????¡ã¨¨?a???¨¦?¡¯?????¡ã¨¦¡¯¡À??¡ã??¡ã?¡ë?????-?',NULL,'../uploads/avatars/33.png?ver=1250228501',1,'2009-07-26 12:36:38','2009-12-30 13:58:22');
INSERT INTO `planets` VALUES (34,3,'robot',NULL,'../uploads/planets/34.png?ver=1250371127','dc83647275aab65a834ab86c69be768fc44a9731','3e7e67293ede62dd3d12a3dee04880d2','liuhuan@mit.edu','Huan','Liu','1987-09-09','Shanghai, China','MIT EECS \'10','building robots, teaching for BIY','I love robots!','Yao Ming, Fox Mulder, Richard P. Feynman','robotics, gadgets, travelling, cooking','Become a roboticist entrepreneur. Attract 300k users to Invention Universe.','/uploads/resumes/34.pdf?ver=1250352855','../uploads/avatars/34.png?ver=1250369367',1,'2009-08-04 13:49:37','2009-08-21 11:01:23');
INSERT INTO `planets` VALUES (35,2,'Garlic Puppet',NULL,'assets/images/planet.png','121d9b3ea94ad9b19cf2a6d59f92c317d6fedc42','8d2c4f194183f3c7d12e9c5336aefc45','a@biy.com','Garlic','Puppet',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'assets/images/astronaut.jpg',1,'2009-08-05 17:41:21','2009-08-13 09:29:51');
INSERT INTO `planets` VALUES (36,3,'Majzone',NULL,'../uploads/planets/36.png?ver=1253137382','5cf5bc95d2d3d57211646253528a619550ad130d','77550fcb05c6e5d88b2a55a59bc31638','blpowell3.14@verizon.net','Benjamin','Powell',NULL,'','','','','','','',NULL,'../uploads/avatars/36.png?ver=1262198286',1,'2009-08-05 17:49:50','2009-12-30 13:38:06');
INSERT INTO `planets` VALUES (37,3,'John G',NULL,'../uploads/planets/37.png?ver=1250353452','0e8f1c0b796ae1c031c7c620d657e87567df0517','3e56e3e4cedf5a663420735d290fefe0','john@build-it-yourself.com','John','Galinato','1944-05-13','Cambridge, MA','Cornell','Building','You can\'t win if you don\'t bet','Popeye, Don Quixote','Blues Guitar, Spanish, Tennis ','Get 300,000 members to join Invention Universe','/uploads/resumes/37.doc?ver=1249929871','../uploads/avatars/37.png?ver=1250372723',1,'2009-08-06 19:05:17','2009-08-18 19:27:39');
INSERT INTO `planets` VALUES (39,3,'Azoooz',NULL,'assets/images/planet.png','9b9e1e4a6dffb4d2ac781e813bf87e7020137f9b','10125f29627fe37ada5d8a5c059d05e4','azizkag@gmail.com','Abdulaziz','Alghunaim',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'assets/images/astronaut.jpg',1,'2009-08-08 09:24:22','2009-08-13 09:29:51');
INSERT INTO `planets` VALUES (40,3,'c3opti',NULL,'../uploads/planets/40.png?ver=1254180665','a2cc7abdb458122da01d070bc5d90015d1773a09','eb5869519f0ca3ebbd1b7ecf978a7596','corbetcarolyn@gmail.com','Carolyn','Corbet','2009-08-06','Richmond','Lucille Brown','sailing, and anything computer related','','','computers and sailing','','/uploads/resumes/40.doc','../uploads/avatars/40.png?ver=1253233720',1,'2009-08-15 10:25:25','2009-09-28 23:21:41');
INSERT INTO `planets` VALUES (41,3,'orange',NULL,'../uploads/planets/41.png','0bfb2b2067940c27718c3ba4bc4a38c63c248543','bcc21be7c82c6cbd719cd80ec550fb04','jeroaranda@gmail.com','Jeronimo','Aranda','2009-01-26','Xalapa, M??xico','Las Hayas','Program with scratch and basketball','','','','learn flex',NULL,'../uploads/avatars/41.png',1,'2009-08-15 10:25:25','2009-09-02 18:25:14');
INSERT INTO `planets` VALUES (42,3,'Jonathan',NULL,'../uploads/planets/42.png?ver=1250646734','cf48e22daf6790e9f6af78866451f6061188e70d','d319fd0d9d6e1c8e15f7412d8f827f1a','jheckerman@hotmail.com','Jonathan','Heckerman','1996-08-18','Bellevue','HW','Engineering, Programming','\"\"','My Dad','Taking things appart','300,000 users on BIY IU',NULL,'../uploads/avatars/42.png?ver=1250460866',1,'2009-08-16 13:33:19','2009-08-18 21:52:15');
INSERT INTO `planets` VALUES (43,3,'Thomas H',NULL,'../uploads/planets/43.png?ver=1250445963','fb7875986272d388961d57cb79bdcc40a25e3510','800c9ada41ac128f490e00a7cdc1681a','tomhotch@gmail.com','tomhotch@gmail.com','Hotchkiss','1992-05-23','Groton MA','Lawrence Academy','Soccer, Friends, Videogames','','Clint Dempsey','','',NULL,'../uploads/avatars/43.png?ver=1250445400',1,'2009-08-16 13:46:02','2009-08-16 14:06:08');
INSERT INTO `planets` VALUES (44,3,'Daniel M.',NULL,'../uploads/planets/44.png?ver=1250699030','4f59a760caeeb9825ea1a71688408bce730d0df3','577a45c5c655644380a9d2cf6b3facf4','n4necron@comcast.net','Daniel','Manacher','1994-08-24','Cambridge, MA','Cambridge Rindge and Latin','Video Games','\"He\'s not dead, he\'s only mostly dead!\" -Princess Bride','Terminator','I\'m interested in anything I can\'t understand','-To become a guru at everything related to computers.\r\r-To not fail high school.\r\r-To be very rich.\r\r-To be happy \r',NULL,'../uploads/avatars/44.png?ver=1250638331',1,'2009-08-18 19:18:03','2009-08-19 12:23:52');
INSERT INTO `planets` VALUES (45,1,'Tartarus',NULL,'assets/images/planet.png','5f7a6bbf95550f1bd2308b730be2da538b757e1a','aa68ec42ee37bc2caa94a6b248479fef','LostAbaddon@Gmail.com','Tencent','Riddle','2009-01-27','Shanghai','ECNU','','','','','',NULL,'assets/images/astronaut.jpg',1,'2009-08-21 07:38:12','2009-08-21 07:48:20');
INSERT INTO `planets` VALUES (46,1,'hiphop',NULL,'../uploads/planets/46.png?ver=1250869306','f198f393dba830be27da03b922dffa01fa19414e','32f5e3b6cc9fce37d1fb1170873bb1bc','moonstargirl19@ymail.com','stephanie','gaudette','2009-04-30','massachussetts','greater lowell technical','basketball','whatever','my parents','dancing ','i want to work with kids thats my goal in life',NULL,'../uploads/avatars/46.png?ver=1250868425',1,'2009-08-21 10:32:06','2009-08-21 11:41:49');
INSERT INTO `planets` VALUES (47,1,'Yellow Planet',NULL,'assets/images/planet.png','f8f960a8cf25d0696d915e22bfba6e16ba65c9ad','c2702c223dca361c704a3292fd543483','santosyuderki@yahoo.com','Jenette ','Rivera','1990-09-06','lawrence','Lawrence High School','Facebooks,word puzzles and Spanish Music','','My Parents','TV','Pass MCAS\r\r',NULL,'assets/images/astronaut.jpg',1,'2009-08-21 10:34:34','2009-08-21 10:49:01');
INSERT INTO `planets` VALUES (48,2,'Shadow Moses',NULL,'../uploads/planets/48.png?ver=1250866290','59a2eee9e026233aa082222ae7bbdce022ff312f','87b78f3ed4aa05f736e5a12fb82356aa','KWDelgado@gmail.com','Kristian','Delgado','1989-11-22','Lawrence','Middlesex Communtiy College','Judo, Manga writing(Japanese Comic Books), Voice Acting for cartoons and games, Football and video games','\"Cookie\", \"Megaman\", \"The meaning of Justic change one day to the next\"','Big Boss','','Is to become a Voice actor and Manga writer',NULL,'../uploads/avatars/48.png?ver=1250866384',1,'2009-08-21 10:35:32','2009-08-21 10:54:38');
INSERT INTO `planets` VALUES (49,1,'Twilight',NULL,'assets/images/planet.png','b3f49f54dd8371844bafc2067d03057837d8fbcf','fc90282ee9e24a32340f84decabac6ef','prezcassie94@aim.com','Sandra','Rod',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'assets/images/astronaut.jpg',1,'2009-08-21 14:54:45','2009-08-21 14:54:45');
INSERT INTO `planets` VALUES (52,2,'Terrier',NULL,'assets/images/planet.png','48cfc96e10ed77bb958731327193f7a691c1952b','b760934d592b3bfec1e99efbc06fa875','evilbuttons1@yahoo.com','Brianna','K',NULL,'','','','','','Drawing!','',NULL,'assets/images/astronaut.jpg',1,'2009-08-21 14:57:40','2009-08-21 15:00:30');
INSERT INTO `planets` VALUES (55,4,'shadowzack',NULL,'assets/images/planet.png','fc53c6cbb6896e569d59ddedfc211b69d81d1c8a','0bdc6b9dd2ac33136909edc46bcefa9d','the-hillmans@comcast.net','Zack','Hillman',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'assets/images/astronaut.jpg',1,'2009-08-21 15:02:20','2009-08-21 15:02:20');
INSERT INTO `planets` VALUES (58,1,'KC',NULL,'assets/images/planet.png','8b8c5a5b5b2e72b1dc62000f895d9cfb6d9f1527','66c8baa4ebf44d4a6fba9ed43b5b194b','kathycorbet@hotmail.com','Kathy','Corbet',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'assets/images/astronaut.jpg',1,'2009-08-23 16:03:02','2009-08-23 16:03:02');
INSERT INTO `planets` VALUES (59,6,'Popeye',NULL,'../uploads/planets/59.png?ver=1251207927','7cdaded43bf84160c6447f8450ea5b1029687a87','c7fcc340fd0543c5e788181841e22321','john@build-it-yourself.com','John','Galinato','1944-05-13','Cambridge, MA','Cornell','Building, drawing, playing guitar','\"I\'m strong to the finnish \'cause I eats me spinach.  I\'m one tough gazookus   who hates all palookas.\"       Popeye the Sailor Man','Popeye','Building RC model boats','Find more time to build!',NULL,'../uploads/avatars/59.png?ver=1251208890',1,'2009-08-25 09:10:48','2009-08-26 08:27:02');
INSERT INTO `planets` VALUES (60,1,'Azooz',NULL,'assets/images/planet.png','40abfa183daaaf6d91dde7f6ab8062941da22fec','86c374cee6bb93f279f5cce119bc04f8','azizkag@gmail.com','Abdulaziz','Alghunaim','1992-02-06','Riyadh','Asrary private school','Diving, Reading, Driving ','','Nelson Mandela ','Robots','','/uploads/resumes/60.pptx?ver=1252090226','../uploads/avatars/60.png?ver=1252122743',1,'2009-08-28 20:13:04','2009-09-04 23:54:16');
INSERT INTO `planets` VALUES (61,5,'Nautilus ',NULL,'../uploads/planets/61.png?ver=1251731872','6de32ed152e23c0f738ac3498a0d84d0f0ad3360','5fc3797acd0b5c81ba616a90d3076a9d','quint4444@aol.com','Jamie','McKiernan',NULL,'','Mass College of Art','Watching old movies, Playing Video games, drawing, sculpting, rockband','a€?The higher up you go, the more mistakes you are allowed. Right at the top, if you make enough of them, it\'s considered to be your style.a€?\r\rFred Astaire','Richard Williams, Bill Waterson, Yoshitaka Amano, Fred Astaire','Animation & Illustration','To Infinity and Beyond!',NULL,'../uploads/avatars/61.png?ver=1251731594',1,'2009-08-31 10:52:32','2009-08-31 11:28:55');
INSERT INTO `planets` VALUES (62,5,'Butterfly',NULL,'../uploads/planets/62.png?ver=1251773278','4fe18f88785dbbe7d28206dacdea02b89ab6f91b','e60f651cd95505474c2b2060db638493','mlula63@gmail.com','Lula','Garcia',NULL,'','','','','Wendy ','','',NULL,'../uploads/avatars/62.png?ver=1251773441',1,'2009-08-31 15:58:34','2009-09-02 22:03:24');
INSERT INTO `planets` VALUES (63,6,'monkeykentaro',NULL,'../uploads/planets/63.png?ver=1253846451','32669f40addef9b43bc250634e33294c8c96b038','1396d5138bcb21963360a97e4ba20c3f','monkeykentaro@aol.com','Kentaro','Kaneki','1995-04-27','Tokyo','Brookline High School','Soccer','\"A man may die, nations may rise and fall, but an idea lives on.\"  JFK','Steve Jobs, John F. Kennedy','','',NULL,'../uploads/avatars/63.png?ver=1254183522',1,'2009-09-06 14:29:02','2009-09-28 20:18:43');
INSERT INTO `planets` VALUES (64,7,'Rocket Control',NULL,'../uploads/planets/64.png?ver=1252416063','c04f9725eff53301cd217ab21a15ee9441573d7d','f48300697761c9c7de19eedc6d2c8eee','biysupport@gmail.com','Development','Build-It-Yourself',NULL,'','','','Break down a project into simple parts.','','','',NULL,'../uploads/avatars/64.png?ver=1252416873',1,'2009-09-08 09:01:03','2009-09-08 10:28:42');
INSERT INTO `planets` VALUES (65,7,'Game Score',NULL,'../uploads/planets/65.png?ver=1252419843','ef27e6fd84b8014ae6e070db968ae747535ff441','281e38ccf2c5712f34d2ec29e10b07cb','biysupport@gmail.com','Development Team','Build-It-Yourself',NULL,'','','','Break a problem into simple parts.','','','',NULL,'../uploads/avatars/65.png?ver=1252419867',1,'2009-09-08 10:21:52','2009-09-08 10:24:33');
INSERT INTO `planets` VALUES (66,7,'Special Effects',NULL,'../uploads/planets/66.png?ver=1252455182','150a14fb17215a8b61fb8cccacb2dcf372abe5b3','2010e134522106cbaa91e641354076cf','biysupport@gmail.com','Development','Build-It-Yourself',NULL,'','','','','','','',NULL,'assets/images/astronaut.jpg',1,'2009-09-08 18:51:19','2009-09-08 20:13:07');
INSERT INTO `planets` VALUES (67,7,'Animation',NULL,'../uploads/planets/67.png?ver=1252454993','598827bc4b07471478d767d79c953f54e381f18c','1d3b2143ab82411bb920e101e5b2c0ce','biysupport@gmail.com','Development','Build-It-Yourself',NULL,'','','','','','','',NULL,'../uploads/avatars/67.png?ver=1252455030',1,'2009-09-08 18:52:54','2009-09-08 20:10:37');
INSERT INTO `planets` VALUES (68,7,'Sound Control',NULL,'../uploads/planets/68.png?ver=1252455547','6ff08ee09cc21026cc474d9136a0f590087c926e','601c2f976550d46c7a6e1eb2a487c0c8','biysupport@gmail.com','Development','Build-It-Yourself',NULL,'','','','','','','',NULL,'assets/images/astronaut.jpg',1,'2009-09-08 18:56:34','2009-09-08 20:19:13');
INSERT INTO `planets` VALUES (69,7,'Bg Control',NULL,'../uploads/planets/69.png?ver=1252456454','77be06b8780879903655f5fb26da49f67551bf6e','ef904b4b1299120b0acdfcf522229d5b','biysupport@gmail.com','Development','Build-It-Yourself',NULL,'','','','','','','',NULL,'assets/images/astronaut.jpg',1,'2009-09-08 19:00:03','2009-09-13 10:07:49');
INSERT INTO `planets` VALUES (70,7,'Point & Shoot',NULL,'../uploads/planets/70.png?ver=1252455648','cf180d4b9c45e2cbdd5cf044f975cd1de15f9860','cb8c2b91bf2682ab8643502627195bb3','biysupport@gmail.com','Development','Build-It-Yourself',NULL,'','','','','','','',NULL,'assets/images/astronaut.jpg',1,'2009-09-08 19:11:56','2009-09-08 20:20:59');
INSERT INTO `planets` VALUES (71,7,'Typing Control',NULL,'../uploads/planets/71.png?ver=1252455859','4fe6d619619282cd345a344b861f834b200a709c','7d149b90b4065d2a98b545a34e94b94b','biysupport@gmail.com','Development','Build-It-Yourself',NULL,'','','','','','','',NULL,'assets/images/astronaut.jpg',1,'2009-09-08 19:13:38','2009-09-08 20:24:32');
INSERT INTO `planets` VALUES (72,7,'Mouse Control',NULL,'../uploads/planets/72.png?ver=1252456029','221364c04527a3a86b2e5514b67c8313194e8f13','4de6536b7fab99c47cf6a7bae203b855','biysupport@gmail.com','Development','Build-It-Yourself',NULL,'','','','','','','',NULL,'assets/images/astronaut.jpg',1,'2009-09-08 19:15:09','2009-09-08 20:27:16');
INSERT INTO `planets` VALUES (73,7,'Data Storage',NULL,'../uploads/planets/73.png?ver=1252455755','b1dd5a50663bdcfbf00dfa9a8241c3c9f3319807','6c1f37b0ec08cdb51bfcaca07d38e42d','biysupport@gmail.com','Development','Build-It-Yourself',NULL,'','','','','','','',NULL,'assets/images/astronaut.jpg',1,'2009-09-08 19:16:43','2009-09-08 20:22:39');
INSERT INTO `planets` VALUES (74,8,'Graphics',NULL,'../uploads/planets/74.png?ver=1252456130','be954d9c31de2f8f3bbcca6cedac49aa11fbe391','d78f4eef5e3e24577eeda3c818fd63c4','biysupport@gmail.com','Development','Build-It-Yourself',NULL,'','','','','','','',NULL,'assets/images/astronaut.jpg',1,'2009-09-08 19:34:06','2009-09-08 20:28:57');
INSERT INTO `planets` VALUES (75,4,'Las Hayas',NULL,'../uploads/planets/75.png?ver=1252528734','864185c9a6336362265dbea7bc58d41699dcfec9','d4ec53fc340ede535aaa2cf84627d92a','jeroaranda@gmail.com','Las hayas','las hayas',NULL,'coatepec, Ver Mexico','Las Hayas','Teaching','','','Kids','',NULL,'../uploads/avatars/75.png?ver=1252893995',1,'2009-09-09 12:24:44','2009-09-16 23:38:38');
INSERT INTO `planets` VALUES (76,6,'abyss',NULL,'assets/images/planet.png','6135f9847dcc416e60d0cc38a02b67ae9ec8fd1f','8f12cdb0bea40d271fd6ec4d6db906ee','the.goopinator@gmail.com','giuliano','lin',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'assets/images/astronaut.jpg',1,'2009-09-13 13:01:23','2009-09-13 13:01:23');
INSERT INTO `planets` VALUES (77,5,'Sweden',NULL,'../uploads/planets/77.png?ver=1252968313','d6d8fe8d2db03024decc2ac6d5f81b58bd176da5','962c9650e6c7323117431f4e34607bc5','daniel@langkilde.se','Daniel','Langkilde','1987-08-19','G??teborg','Chalmers University of Technology','Building robots, inspiring young people, studying physics and maths','Pain is temporary, quitting is forever.','Any great entrepreneur','','To do good',NULL,'../uploads/avatars/77.png?ver=1252967791',1,'2009-09-14 05:32:35','2009-09-14 18:45:18');
INSERT INTO `planets` VALUES (78,4,'Tabris',NULL,'assets/images/planet.png','dbdb1f2ddface8919c8b6985868efcc4bc721177','9195d33416c36ebd441ed53c5c6c4b73','johnd0001@comcast.net','John','Davidson',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'assets/images/astronaut.jpg',1,'2009-09-17 18:17:49','2009-09-17 18:17:49');
INSERT INTO `planets` VALUES (79,5,'pluto',NULL,'assets/images/planet.png','88efde33631ce637c4dd4128d1893d49691a1fe5','c013fb6e63bf55a8f9f2a1971e451f31','reno9800@live.com.mx','renato','rodriguez',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'assets/images/astronaut.jpg',1,'2009-09-18 19:18:59','2009-09-18 19:18:59');
INSERT INTO `planets` VALUES (80,5,'Srong',NULL,'assets/images/planet.png','89a02a20e3e4f597f9af289426b5e2e492554bc1','3d22c72221b6828d25f64dbcfcc8cad8','sarong88@gmail.com','Sarah','Ong',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'assets/images/astronaut.jpg',1,'2009-09-20 12:52:53','2009-09-20 12:52:53');
INSERT INTO `planets` VALUES (81,2,'Pear',NULL,'assets/images/planet.png','c3926c550bb9f060e616c882b71c2c3131376d4e','9289f2930c70bd93c09e6a5004115007','greenred@hotmail.com','Alejandro','Alvarez','2009-11-01','Xalapa','Las Hayas','basketball and scratch','','','','',NULL,'assets/images/astronaut.jpg',1,'2009-09-22 21:00:57','2009-09-23 20:28:32');
INSERT INTO `planets` VALUES (82,5,'Carlitos',NULL,'assets/images/planet.png','57a76ba74c447e517df38f10b165bbbebfd32a53','906b54636b02cf199437b85447395f0a','mguerecam@hotmail.com','Ale','Martin del Campo','1998-07-17','Xalapa','Las Hayas','swim, play chees','','batman, ','','',NULL,'assets/images/astronaut.jpg',1,'2009-09-23 17:38:11','2009-09-23 17:53:09');
INSERT INTO `planets` VALUES (83,4,'Rainbow Rock',NULL,'assets/images/planet.png','ca9de8014317200f6498c0ec3560442db9e76011','633b7ca77f2a2ecc6ba7bb97f3f2a96a','zefira19@yahoo.com','christina','campo',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'assets/images/astronaut.jpg',1,'2009-09-30 21:41:29','2009-09-30 21:41:29');
INSERT INTO `planets` VALUES (84,2,'MCM',NULL,'../uploads/planets/84.png?ver=1254701114','924f5e7c31b6ef91372078a8e78bc98cc07bfe8e','48d9a17b52d2e52a316aeefe866776aa','marcimir_hp@hotmail.com','Mariana','Cisneros','2009-10-10','Xalapa','Las Hayas','reading and writing, helping lula fixing things ','','Ayla','writing about life and learnign about everything in life.','get the career I want in the MIT',NULL,'../uploads/avatars/84.png?ver=1254701211',1,'2009-10-04 18:50:37','2009-10-04 20:06:56');
INSERT INTO `planets` VALUES (85,6,'Otto\'s Orange',NULL,'assets/images/planet.png','5b4bc2b412abc7df049e27b7a9a5805172e5482a','83979f1da2948b1eb98723bef99b39af','jmharran@gmail.com','Jeanne','Harran',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'assets/images/astronaut.jpg',1,'2009-10-13 21:46:14','2009-10-13 21:46:14');
INSERT INTO `planets` VALUES (86,5,'RoBiTs',NULL,'../uploads/planets/86.png?ver=1255906361','4e2393bef96cc654431a172a9e2273ea660aa41f','5d5f9987d1c467a9b942c719767ab2db','osito_bimbo_alex@hotmail.com','alexei','tenorio','2009-10-24','M??xico','Juan Jacobo Rousseau','Jugar futbol y yugioh','','superman','robots y chicas','7 medallas de 1?o lugar en natacion ,6?o lugar en el torneo internacional de robotica \"ROBOCUP y 3?o lugar en es mismo torneo',NULL,'../uploads/avatars/86.png?ver=1255906495',1,'2009-10-18 18:41:04','2009-10-18 18:55:00');
INSERT INTO `planets` VALUES (87,5,'Contraptionaptia',NULL,'assets/images/planet.png','e72151af015fd0a8eb2674a435ce53286e7ca881','be9d0ddebe6507acd97bc34d59e81301','truleigh1@gmail.com','Daniel','Rollo',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'assets/images/astronaut.jpg',1,'2009-10-23 14:08:33','2009-10-23 14:08:33');
INSERT INTO `planets` VALUES (88,5,'HoldenCaulfield',NULL,'../uploads/planets/88.png?ver=1257213112','2074e32fc92fc4b88cbd234f711bf2fe6ba14825','3461b8094cc1cddc4f9ece2ee79975a9','thefermata@gmail.com','Holden','Caufield',NULL,'','Pencey.','','','','','hopefully one day change the name of my planet. was not aware these things were permanent. but i\'m running with it, i guess.',NULL,'../uploads/avatars/88.png?ver=1257212658',1,'2009-11-02 18:47:37','2009-11-03 04:43:41');
INSERT INTO `planets` VALUES (89,4,'Bergy',NULL,'assets/images/planet.png','a6abdfb009ec5c0f6086c55b04d0f0b2a0dab65e','0fa6bd9766ee74fa8f6a117fc2fa6870','oister3@gmail.com','sari','oister',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'assets/images/astronaut.jpg',1,'2009-11-14 08:09:58','2009-11-14 08:09:58');
INSERT INTO `planets` VALUES (90,8,'arzid',NULL,'assets/images/planet.png','5d1be32a7b00cde3b4f519f3509a0c9923ab9a02','64b71bb73ce73396670d4315def9dba4','jeremiah.c2008@gmail.com','jeremiah','crowley',NULL,'effingham','central','inventing','','','robots,technoligy','making a robot that interacts with the enviorment',NULL,'assets/images/astronaut.jpg',1,'2009-11-15 16:47:37','2009-11-16 18:31:42');
INSERT INTO `planets` VALUES (91,4,'Pierce 09',NULL,'assets/images/planet.png','8a45b29ffa95199f7799316dea3e628d6088a351','6287c84eada7dd6cc48afce2891b9faa','john@build-it-yourself.com','Pierce','School',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'assets/images/astronaut.jpg',1,'2009-12-08 13:49:27','2009-12-28 13:39:08');
INSERT INTO `planets` VALUES (92,4,'Schechter 09',NULL,'assets/images/planet.png','2e4b6afbc1cbaf951e9adbe997838e5bd977bc02','d08ef75f7ac8737839b4e43be09afa36','john@build-it-yourself.com','Solomon','Schechter',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'assets/images/astronaut.jpg',1,'2009-12-09 09:59:36','2009-12-09 09:59:36');
INSERT INTO `planets` VALUES (94,6,'Inventoria',NULL,'assets/images/planet.png','00b3d867d0e75194e573183fbceb9a502eee333a','ab87cb1131d3fb433e23781e4deef3ec','gaya3@att.net','Gaya','Krishna',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'assets/images/astronaut.jpg',1,'2009-12-13 21:08:25','2009-12-13 21:08:25');
INSERT INTO `planets` VALUES (95,4,'baker',NULL,'assets/images/planet.png','f96351df3f53a20b7a70b33742bfbcf10dfff6e0','d1902cce47e76c54a16a55338bade11a','john@build-it-yourself.com','John','Galinato',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'assets/images/astronaut.jpg',1,'2009-12-17 14:58:51','2009-12-17 14:58:51');
INSERT INTO `planets` VALUES (96,6,'Jeanne ',NULL,'assets/images/planet.png','5eebd765c0eded695486e9b95373dc626d2170fe','3b77da33bacc850f070314c60459dcd2','jmharran@gmail.com','Jeanne','Harran','2009-11-02','Pembroke MA','Syracuse University ','','','','','',NULL,'assets/images/astronaut.jpg',1,'2009-12-30 13:39:30','2009-12-30 13:59:07');
/*!40000 ALTER TABLE `planets` ENABLE KEYS */;
UNLOCK TABLES;

#
# Source for table project_types
#

DROP TABLE IF EXISTS `project_types`;
CREATE TABLE `project_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `extension` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `extension` (`extension`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

#
# Dumping data for table project_types
#
LOCK TABLES `project_types` WRITE;
/*!40000 ALTER TABLE `project_types` DISABLE KEYS */;

INSERT INTO `project_types` VALUES (1,'Scratch','sb');
INSERT INTO `project_types` VALUES (2,'Website','html');
INSERT INTO `project_types` VALUES (3,'Powerpoint','ppt');
INSERT INTO `project_types` VALUES (4,'Powerpoint','pptx');
INSERT INTO `project_types` VALUES (5,'Image','jpg');
INSERT INTO `project_types` VALUES (6,'Image','png');
INSERT INTO `project_types` VALUES (7,'Image','bmp');
INSERT INTO `project_types` VALUES (8,'Image','jpeg');
INSERT INTO `project_types` VALUES (9,'Video','wmv');
INSERT INTO `project_types` VALUES (10,'Audio','mp3');
INSERT INTO `project_types` VALUES (11,'Video','avi');
INSERT INTO `project_types` VALUES (12,'Word Document','doc');
INSERT INTO `project_types` VALUES (13,'Word Document','docx');
INSERT INTO `project_types` VALUES (14,'Website','htm');
/*!40000 ALTER TABLE `project_types` ENABLE KEYS */;
UNLOCK TABLES;

#
# Source for table project_viewcount
#

DROP TABLE IF EXISTS `project_viewcount`;
CREATE TABLE `project_viewcount` (
  `id` int(11) NOT NULL DEFAULT '0',
  `view_count` bigint(20) NOT NULL DEFAULT '0',
  `last_viewed` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

#
# Dumping data for table project_viewcount
#
LOCK TABLES `project_viewcount` WRITE;
/*!40000 ALTER TABLE `project_viewcount` DISABLE KEYS */;

INSERT INTO `project_viewcount` VALUES (37,6,'2009-08-22 09:48:24');
INSERT INTO `project_viewcount` VALUES (38,4,'2009-08-22 09:48:32');
INSERT INTO `project_viewcount` VALUES (39,5,'2009-08-22 09:49:28');
INSERT INTO `project_viewcount` VALUES (40,2,'2009-08-17 14:23:20');
INSERT INTO `project_viewcount` VALUES (41,1,'2009-08-04 01:29:37');
INSERT INTO `project_viewcount` VALUES (42,8,'2009-08-07 16:37:05');
INSERT INTO `project_viewcount` VALUES (43,3,'2009-08-07 10:26:52');
INSERT INTO `project_viewcount` VALUES (44,2,'2009-08-05 18:19:15');
INSERT INTO `project_viewcount` VALUES (45,10,'2009-08-08 20:22:43');
INSERT INTO `project_viewcount` VALUES (46,12,'2009-12-18 22:11:28');
INSERT INTO `project_viewcount` VALUES (47,6,'2009-11-03 07:38:14');
INSERT INTO `project_viewcount` VALUES (48,5,'2009-12-18 22:12:48');
INSERT INTO `project_viewcount` VALUES (49,1,'2009-08-14 18:31:19');
INSERT INTO `project_viewcount` VALUES (50,2,'2009-08-14 18:31:06');
INSERT INTO `project_viewcount` VALUES (51,4,'2009-08-14 18:53:01');
INSERT INTO `project_viewcount` VALUES (52,1,'2009-08-08 02:38:07');
INSERT INTO `project_viewcount` VALUES (53,34,'2009-12-17 15:31:59');
INSERT INTO `project_viewcount` VALUES (54,24,'2009-12-17 20:26:21');
INSERT INTO `project_viewcount` VALUES (55,9,'2009-08-17 21:18:48');
INSERT INTO `project_viewcount` VALUES (56,23,'2009-12-17 20:25:46');
INSERT INTO `project_viewcount` VALUES (57,6,'2009-08-17 14:49:12');
INSERT INTO `project_viewcount` VALUES (58,3,'2009-08-08 16:37:13');
INSERT INTO `project_viewcount` VALUES (59,24,'2009-12-17 15:31:51');
INSERT INTO `project_viewcount` VALUES (60,1,'2009-08-12 10:47:11');
INSERT INTO `project_viewcount` VALUES (61,9,'2009-08-17 03:46:35');
INSERT INTO `project_viewcount` VALUES (62,4,'2009-12-18 22:12:56');
INSERT INTO `project_viewcount` VALUES (63,2,'2009-08-15 10:49:43');
INSERT INTO `project_viewcount` VALUES (64,10,'2009-12-18 22:13:05');
INSERT INTO `project_viewcount` VALUES (65,12,'2009-12-17 15:22:40');
INSERT INTO `project_viewcount` VALUES (66,10,'2009-12-18 22:09:56');
INSERT INTO `project_viewcount` VALUES (67,19,'2009-12-30 13:58:31');
INSERT INTO `project_viewcount` VALUES (69,8,'2009-12-29 10:10:14');
INSERT INTO `project_viewcount` VALUES (70,2,'2009-08-15 10:59:49');
INSERT INTO `project_viewcount` VALUES (73,9,'2009-08-24 11:10:43');
INSERT INTO `project_viewcount` VALUES (74,19,'2009-12-17 15:18:41');
INSERT INTO `project_viewcount` VALUES (75,13,'2009-12-17 15:30:12');
INSERT INTO `project_viewcount` VALUES (76,6,'2009-08-17 02:11:14');
INSERT INTO `project_viewcount` VALUES (78,6,'2009-08-17 11:47:29');
INSERT INTO `project_viewcount` VALUES (79,7,'2009-09-19 18:14:20');
INSERT INTO `project_viewcount` VALUES (80,7,'2009-09-19 18:12:21');
INSERT INTO `project_viewcount` VALUES (81,3,'2009-08-23 15:00:03');
INSERT INTO `project_viewcount` VALUES (82,16,'2009-11-07 09:01:03');
INSERT INTO `project_viewcount` VALUES (83,1,'2009-08-17 02:21:22');
INSERT INTO `project_viewcount` VALUES (84,2,'2009-08-17 14:02:41');
INSERT INTO `project_viewcount` VALUES (92,1,'2009-08-17 14:29:56');
INSERT INTO `project_viewcount` VALUES (93,1,'2009-08-17 14:29:04');
INSERT INTO `project_viewcount` VALUES (94,2,'2009-08-17 20:36:18');
INSERT INTO `project_viewcount` VALUES (95,1,'2009-08-17 20:48:45');
INSERT INTO `project_viewcount` VALUES (96,1,'2009-08-17 21:27:00');
INSERT INTO `project_viewcount` VALUES (98,3,'2009-08-18 22:32:53');
INSERT INTO `project_viewcount` VALUES (100,13,'2009-08-20 22:06:46');
INSERT INTO `project_viewcount` VALUES (102,2,'2009-08-18 23:37:03');
INSERT INTO `project_viewcount` VALUES (103,1,'2009-08-18 23:43:32');
INSERT INTO `project_viewcount` VALUES (105,1,'2009-08-19 02:06:43');
INSERT INTO `project_viewcount` VALUES (106,1,'2009-08-19 02:32:47');
INSERT INTO `project_viewcount` VALUES (107,1,'2009-08-19 02:47:36');
INSERT INTO `project_viewcount` VALUES (111,9,'2009-12-28 11:27:36');
INSERT INTO `project_viewcount` VALUES (112,9,'2009-11-25 22:11:08');
INSERT INTO `project_viewcount` VALUES (113,16,'2009-12-17 15:16:48');
INSERT INTO `project_viewcount` VALUES (114,2,'2009-08-20 01:45:43');
INSERT INTO `project_viewcount` VALUES (115,1,'2009-08-20 01:45:39');
INSERT INTO `project_viewcount` VALUES (116,1,'2009-08-20 01:45:35');
INSERT INTO `project_viewcount` VALUES (117,1,'2009-08-20 01:45:33');
INSERT INTO `project_viewcount` VALUES (119,5,'2009-09-19 17:03:22');
INSERT INTO `project_viewcount` VALUES (120,2,'2009-08-21 05:06:44');
INSERT INTO `project_viewcount` VALUES (121,6,'2009-09-04 19:20:03');
INSERT INTO `project_viewcount` VALUES (122,6,'2009-08-21 20:00:40');
INSERT INTO `project_viewcount` VALUES (123,17,'2009-12-17 20:21:53');
INSERT INTO `project_viewcount` VALUES (124,11,'2009-11-02 18:41:17');
INSERT INTO `project_viewcount` VALUES (125,3,'2009-09-22 21:09:46');
INSERT INTO `project_viewcount` VALUES (126,11,'2009-12-18 22:07:33');
INSERT INTO `project_viewcount` VALUES (127,2,'2009-08-21 22:56:21');
INSERT INTO `project_viewcount` VALUES (128,1,'2009-12-17 15:11:42');
INSERT INTO `project_viewcount` VALUES (129,5,'2009-09-16 17:05:19');
INSERT INTO `project_viewcount` VALUES (130,17,'2009-10-18 12:40:58');
INSERT INTO `project_viewcount` VALUES (131,2,'2009-09-03 14:38:00');
INSERT INTO `project_viewcount` VALUES (132,18,'2009-12-29 10:13:03');
INSERT INTO `project_viewcount` VALUES (133,17,'2009-12-17 15:31:26');
INSERT INTO `project_viewcount` VALUES (134,2,'2009-08-25 17:43:55');
INSERT INTO `project_viewcount` VALUES (135,7,'2009-12-17 15:16:41');
INSERT INTO `project_viewcount` VALUES (136,11,'2009-10-13 21:44:56');
INSERT INTO `project_viewcount` VALUES (137,6,'2009-12-17 15:16:12');
INSERT INTO `project_viewcount` VALUES (138,4,'2009-12-30 22:30:15');
INSERT INTO `project_viewcount` VALUES (140,4,'2009-12-18 22:00:11');
INSERT INTO `project_viewcount` VALUES (142,2,'2009-09-13 13:44:30');
INSERT INTO `project_viewcount` VALUES (143,1,'2009-12-18 22:02:29');
INSERT INTO `project_viewcount` VALUES (144,2,'2009-12-18 21:58:15');
INSERT INTO `project_viewcount` VALUES (145,2,'2009-12-31 13:21:23');
INSERT INTO `project_viewcount` VALUES (152,1,'2009-12-18 21:57:11');
INSERT INTO `project_viewcount` VALUES (154,12,'2009-10-12 15:06:11');
INSERT INTO `project_viewcount` VALUES (155,23,'2009-10-19 18:13:06');
INSERT INTO `project_viewcount` VALUES (156,28,'2009-10-12 15:04:08');
INSERT INTO `project_viewcount` VALUES (157,31,'2009-10-19 18:11:38');
INSERT INTO `project_viewcount` VALUES (158,5,'2009-10-28 04:50:31');
INSERT INTO `project_viewcount` VALUES (159,9,'2009-12-29 10:14:49');
INSERT INTO `project_viewcount` VALUES (160,7,'2009-12-30 13:40:41');
INSERT INTO `project_viewcount` VALUES (162,4,'2009-11-03 07:27:59');
INSERT INTO `project_viewcount` VALUES (165,14,'2009-12-23 11:08:54');
INSERT INTO `project_viewcount` VALUES (166,3,'2009-12-08 22:37:25');
INSERT INTO `project_viewcount` VALUES (167,2,'2009-12-08 15:40:24');
INSERT INTO `project_viewcount` VALUES (168,6,'2009-12-08 22:36:44');
INSERT INTO `project_viewcount` VALUES (169,4,'2009-12-08 22:24:15');
INSERT INTO `project_viewcount` VALUES (170,3,'2009-12-08 22:24:36');
INSERT INTO `project_viewcount` VALUES (171,3,'2009-12-17 16:05:28');
INSERT INTO `project_viewcount` VALUES (172,2,'2009-12-17 16:03:47');
INSERT INTO `project_viewcount` VALUES (173,3,'2009-12-17 16:02:12');
INSERT INTO `project_viewcount` VALUES (174,4,'2009-12-17 16:00:40');
INSERT INTO `project_viewcount` VALUES (175,7,'2009-12-23 17:29:00');
INSERT INTO `project_viewcount` VALUES (176,8,'2009-12-23 17:28:05');
INSERT INTO `project_viewcount` VALUES (177,1,'2009-12-17 15:05:25');
INSERT INTO `project_viewcount` VALUES (178,4,'2009-12-23 17:26:43');
INSERT INTO `project_viewcount` VALUES (179,3,'2009-12-23 17:25:41');
INSERT INTO `project_viewcount` VALUES (181,1,'2009-12-30 14:07:33');
/*!40000 ALTER TABLE `project_viewcount` ENABLE KEYS */;
UNLOCK TABLES;

#
# Source for table projects
#

DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(255) NOT NULL DEFAULT '',
  `description` text,
  `type_id` int(11) NOT NULL DEFAULT '0',
  `url` varchar(255) NOT NULL DEFAULT '',
  `thumbnail_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `name` (`name`,`description`)
) ENGINE=MyISAM AUTO_INCREMENT=182 DEFAULT CHARSET=utf8;

#
# Dumping data for table projects
#
LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;

INSERT INTO `projects` VALUES (37,23,'Control panel','Jamie\'s invention universe control panel.',3,'/uploads/projects/23/37.ppt','assets/thumb_default/ppt_icon.png','2009-07-24 13:41:59','2009-08-17 13:53:46');
INSERT INTO `projects` VALUES (38,23,'Invention Universe','IU demo scratch.',1,'/uploads/projects/23/38.sb','../uploads/projects/23/thumbnail/38.png?ver=1250517261','2009-07-24 13:43:23','2009-08-17 09:54:21');
INSERT INTO `projects` VALUES (39,23,'IU Design','Invention universe homepage.',2,'/uploads/projects/23/39.html','assets/thumb_default/webpage_icon.png','2009-07-24 13:43:43','2009-08-17 13:55:19');
INSERT INTO `projects` VALUES (46,36,'Snack Wars!','Die, oh evil fortune cookies of doom!  Die!  Instructions in game',1,'/uploads/projects/36/46.sb','../uploads/projects/36/thumbnail/46.png?ver=1250517261','2009-08-07 10:16:14','2009-08-17 09:54:21');
INSERT INTO `projects` VALUES (47,36,'Avatar creator','It\'s an alien!  It\'s a monster!  It\'s... Whatever you want it to be!',1,'/uploads/projects/36/47.sb','../uploads/projects/36/thumbnail/47.png?ver=1250517261','2009-08-07 10:18:06','2009-08-17 09:54:21');
INSERT INTO `projects` VALUES (48,36,'Shepherd','Herd sheep into a building that looks suspiciously like the Taj Mahal...',1,'/uploads/projects/36/48.sb','../uploads/projects/36/thumbnail/48.png?ver=1250517261','2009-08-07 10:20:26','2009-08-17 09:54:21');
INSERT INTO `projects` VALUES (53,37,'Boogie Birds','Learn how to be a stud dancer.',1,'/uploads/projects/37/53.sb','../uploads/projects/37/thumbnail/53.png?ver=1250517261','2009-08-08 16:18:31','2009-08-17 09:54:21');
INSERT INTO `projects` VALUES (54,37,'Balooka the Dragon Interactive Story','Balooka is a dragon who likes to dance with the dragonas for he never learned to fight with the bad boys.',1,'/uploads/projects/37/54.sb','../uploads/projects/37/thumbnail/54.png?ver=1250517261','2009-08-08 16:21:46','2009-08-17 09:54:21');
INSERT INTO `projects` VALUES (56,37,'Yellow Submarine','Remote control yellow submarine that plays \'Popeye the sailor man\' and shoots a water cannon',5,'/uploads/projects/37/56.jpg','../uploads/projects/37/thumbnail/56.png?ver=1','2009-08-08 16:26:04','2009-08-21 05:01:44');
INSERT INTO `projects` VALUES (59,37,'Dream Car','You gotta be fast and you gotta look cool!',3,'/uploads/projects/37/59.ppt','assets/thumb_default/ppt_icon.png','2009-08-08 16:53:46','2009-08-17 13:53:46');
INSERT INTO `projects` VALUES (62,36,'Rocket power','Download this to learn how to make a rocket point and shoot.',1,'/uploads/projects/36/62.sb','../uploads/projects/36/thumbnail/62.png?ver=1250517261','2009-08-15 10:39:20','2009-08-17 09:54:21');
INSERT INTO `projects` VALUES (64,36,'Super rocket power!','Shoot stuff! YAY',1,'/uploads/projects/36/64.sb','../uploads/projects/36/thumbnail/64.png?ver=1250517261','2009-08-15 10:43:30','2009-08-17 09:54:21');
INSERT INTO `projects` VALUES (65,36,'Inertial rocket','Fly a rocket using momentum!',1,'/uploads/projects/36/65.sb','../uploads/projects/36/thumbnail/65.png?ver=1250517261','2009-08-15 10:44:54','2009-08-17 09:54:21');
INSERT INTO `projects` VALUES (66,36,'Newton\'s cat','This cat follows an approximation of gravity, friction, and inertia.',1,'/uploads/projects/36/66.sb','../uploads/projects/36/thumbnail/66.png?ver=1250517261','2009-08-15 10:46:01','2009-08-17 09:54:21');
INSERT INTO `projects` VALUES (67,36,'Drawing Program','Draw anything you want!  Woo-hoo!',1,'/uploads/projects/36/67.sb','../uploads/projects/36/thumbnail/67.png?ver=1250517261','2009-08-15 10:47:33','2009-08-17 09:54:21');
INSERT INTO `projects` VALUES (69,36,'My bio','An amazing bio.',3,'/uploads/projects/36/69.ppt','assets/thumb_default/ppt_icon.png','2009-08-15 10:54:28','2009-08-17 13:53:46');
INSERT INTO `projects` VALUES (73,41,'Bio','This is my bio I hope you like it.',1,'/uploads/projects/41/73.sb','../uploads/projects/41/thumbnail/73.png?ver=1250517261','2009-08-15 11:06:01','2009-08-17 09:54:21');
INSERT INTO `projects` VALUES (74,41,'snake game','This is the typical snake game where you have to eat things and grow',1,'/uploads/projects/41/74.sb','../uploads/projects/41/thumbnail/74.png?ver=1250517261','2009-08-15 11:40:29','2009-08-17 09:54:21');
INSERT INTO `projects` VALUES (75,41,'space game','this is a game where you need to destroy the asteroyds each time you destroy one you get points so reach more than 80 points and fight the monster',1,'/uploads/projects/41/75.sb','../uploads/projects/41/thumbnail/75.png?ver=1250517261','2009-08-15 13:48:00','2009-08-17 09:54:21');
INSERT INTO `projects` VALUES (79,42,'3D Driver','A 3D driving game.  Use the arrow keys to move left/Right.  Try to stay on the road for as long as possible.',1,'/uploads/projects/42/79.sb','../uploads/projects/42/thumbnail/79.png?ver=1250447469','2009-08-16 14:31:10','2009-08-16 14:31:10');
INSERT INTO `projects` VALUES (80,42,'Robo Smash','Move your mouse over the evil robots, and then click to smash them.',1,'/uploads/projects/42/80.sb','../uploads/projects/42/thumbnail/80.png?ver=1250447552','2009-08-16 14:32:33','2009-08-16 14:32:33');
INSERT INTO `projects` VALUES (81,42,'Math Wiz','Enter the answer to the math questions written on the coins before the hit the ground.',1,'/uploads/projects/42/81.sb','../uploads/projects/42/thumbnail/81.png?ver=1250447711','2009-08-16 14:35:18','2009-08-16 14:35:18');
INSERT INTO `projects` VALUES (82,42,'Space Pong','Keep the meteor from touching the yellow line for as long as you can.',1,'/uploads/projects/42/82.sb','../uploads/projects/42/thumbnail/82.png?ver=1250447829','2009-08-16 14:37:10','2009-08-16 14:37:10');
INSERT INTO `projects` VALUES (111,34,'Distributed Robot Garden','This project describes some first steps toward creating an autonomous distributed robotic garden as part of the undergraduate project course 6.084/086 taught at MIT during Fall 2008.',11,'/uploads/projects/34/111.avi','assets/thumb_default/video_icon.png','2009-08-19 04:28:00','2009-08-19 04:28:00');
INSERT INTO `projects` VALUES (112,34,'Grasping with uncertainty','What do you do when you try to turn off your alarm in the morning? The video is a robotic grasping research I have been assisting.',9,'/uploads/projects/34/112.wmv','assets/thumb_default/video_icon.png','2009-08-19 04:33:11','2009-08-19 04:33:11');
INSERT INTO `projects` VALUES (113,41,'Follow the Line','click on the square and take it to the end in order to go next level be careful at level 3',1,'/uploads/projects/41/113.sb','../uploads/projects/41/thumbnail/113.png?ver=1250722098','2009-08-19 18:51:14','2009-08-19 18:51:14');
INSERT INTO `projects` VALUES (119,41,'flex project','this is the flex program i did following the one week flex tutorial',5,'/uploads/projects/41/119.jpg','../uploads/projects/41/thumbnail/119.png?ver=1','2009-08-21 00:32:39','2009-08-21 05:02:11');
INSERT INTO `projects` VALUES (121,41,'flex project updated','an image of my flex project',5,'/uploads/projects/41/121.jpg','../uploads/projects/41/thumbnail/121.png?ver=1250865351','2009-08-21 10:35:58','2009-08-21 10:35:58');
INSERT INTO `projects` VALUES (122,48,'Lab Book','This ismy Lab book that talks about my projects.',3,'/uploads/projects/48/122.ppt','assets/thumb_default/ppt_icon.png','2009-08-21 10:43:35','2009-08-21 10:58:09');
INSERT INTO `projects` VALUES (123,46,'hiphop','see my alein dance to fire burning on the dance floor',1,'/uploads/projects/46/123.sb','../uploads/projects/46/thumbnail/123.png?ver=1250866605','2009-08-21 10:56:59','2009-08-21 11:07:28');
INSERT INTO `projects` VALUES (124,48,'My prototype Game','It not 100% done it is 75% and still working very hard to make better then before.',1,'/uploads/projects/48/124.sb','../uploads/projects/48/thumbnail/124.png?ver=1250866646','2009-08-21 10:57:34','2009-08-21 11:07:39');
INSERT INTO `projects` VALUES (125,46,'stephanie','plant hip hop galaxy with my alein dancing',3,'/uploads/projects/46/125.ppt','assets/thumb_default/ppt_icon.png','2009-08-21 11:00:53','2009-08-21 11:00:53');
INSERT INTO `projects` VALUES (126,47,'love in space','Marvin meets Lisa on facebook. Then, they fall in love after playing TRIVIA questions  at the Yellow Planet. They  live happily ever after.',1,'/uploads/projects/47/126.sb','../uploads/projects/47/thumbnail/126.png?ver=1250867472','2009-08-21 11:04:26','2009-08-21 11:11:22');
INSERT INTO `projects` VALUES (127,48,'New Breeds: Chapter One','This my story talks about a Demon Slayer',12,'/uploads/projects/48/127.doc','assets/thumb_default/word_icon.png','2009-08-21 16:32:47','2009-08-21 16:32:47');
INSERT INTO `projects` VALUES (128,48,'New Breeds: Chapter two','Here fights powerful demon',12,'/uploads/projects/48/128.doc','assets/thumb_default/word_icon.png','2009-08-21 16:36:17','2009-08-21 16:36:17');
INSERT INTO `projects` VALUES (129,40,'My space ship game','just a little project i did to teach someone scratch',1,'/uploads/projects/40/129.sb','../uploads/projects/40/thumbnail/129.png?ver=1250968837','2009-08-22 15:03:06','2009-08-22 15:20:39');
INSERT INTO `projects` VALUES (130,42,'The Hellomotron 6000','When someone enters my home through the door, a magnetic sensor is triggered, setting the Hellomotron 6000 in motion.  An audio clip is played from my computer while a Lego/Premium Quality Junk mouth opens and closes.  It welcomes you and then askes you to select the name of the person in the house you wish to speak to.  You select the name on a wheel.  The light sensors on the back can tell if you select the name of one of the four people who live in my house.  If you answer correctly, it welcomes you and little figures dance.  If not it sounds the alarm!',5,'/uploads/projects/42/130.jpg','../uploads/projects/42/thumbnail/130.png?ver=1251052607','2009-08-23 14:34:02','2009-08-23 14:36:53');
INSERT INTO `projects` VALUES (131,59,'Float My Boats!','Commander John\'s fleet of remote control boats has sailed the great waterways in Boston, New York, London, Paris and Milan.',3,'/uploads/projects/59/131.ppt','assets/thumb_default/ppt_icon.png','2009-08-25 09:57:39','2009-08-26 08:33:02');
INSERT INTO `projects` VALUES (132,44,'Happy Mod','roll around and get $ but don\'t touch the water!',1,'/uploads/projects/44/132.sb','../uploads/projects/44/thumbnail/132.png?ver=1251236138','2009-08-25 17:35:40','2009-08-25 17:35:41');
INSERT INTO `projects` VALUES (133,44,'Invention Universe Teaser','Welcome to the fun!',1,'/uploads/projects/44/133.sb','../uploads/projects/44/thumbnail/133.png?ver=1251236240','2009-08-25 17:37:54','2009-08-25 17:37:54');
INSERT INTO `projects` VALUES (135,41,'flex project upload','my flex project updated ',5,'/uploads/projects/41/135.jpg','../uploads/projects/41/thumbnail/135.png?ver=1251242255','2009-08-25 19:21:04','2009-08-25 19:21:04');
INSERT INTO `projects` VALUES (136,61,'Global Warming','An art assignment from the Mass College of Art to illustrate the concept of global warming. \rIt might just cook your eggs!',5,'/uploads/projects/61/136.jpg','../uploads/projects/61/thumbnail/136.png?ver=1251732054','2009-08-31 11:20:55','2009-08-31 11:20:55');
INSERT INTO `projects` VALUES (137,41,'avatar creator','here you can create your own character the options are in spanish',1,'/uploads/projects/41/137.sb','../uploads/projects/41/thumbnail/137.png?ver=1251764874','2009-08-31 20:28:21','2009-08-31 20:28:21');
INSERT INTO `projects` VALUES (138,60,'Skills measurement tool','A tool develope at BIY lab, that can measure and help developing soft skills',1,'/uploads/projects/60/138.sb','../uploads/projects/60/thumbnail/138.png?ver=1251943549','2009-09-02 22:07:58','2009-09-02 22:07:59');
INSERT INTO `projects` VALUES (140,65,'Gold Coins','Show your game score with the size of a stack of gold coins.',1,'/uploads/projects/65/140.sb','../uploads/projects/65/thumbnail/140.png?ver=1252419952','2009-09-08 10:25:53','2009-09-08 10:25:53');
INSERT INTO `projects` VALUES (141,64,'Rocket Control Turn','Press Right and Left arrow keys to point rocket.\r\rPress Up and Down arrow keys to move rocket.',1,'/uploads/projects/64/141.sb','../uploads/projects/64/thumbnail/141.png?ver=1252425360','2009-09-08 11:56:01','2009-09-08 11:56:01');
INSERT INTO `projects` VALUES (142,64,'Rocket Control Animated','Press Right, Left, Up and Down arrow keys to move rocket.',1,'/uploads/projects/64/142.sb','../uploads/projects/64/thumbnail/142.png?ver=1252425426','2009-09-08 11:57:07','2009-09-08 11:57:07');
INSERT INTO `projects` VALUES (143,67,'Flying bird animation','Make a bird flap its wings and fly right or left when the right and left arrow keys are pressed.',1,'/uploads/projects/67/143.sb','../uploads/projects/67/thumbnail/143.png?ver=1252462258','2009-09-08 22:10:59','2009-09-08 22:10:59');
INSERT INTO `projects` VALUES (144,66,'Growing Text','Make your text titles pop off the page.',1,'/uploads/projects/66/144.sb','../uploads/projects/66/thumbnail/144.png?ver=1252462547','2009-09-08 22:15:47','2009-09-08 22:15:47');
INSERT INTO `projects` VALUES (145,68,'Speech Recognition','Detect when one says, \"yep\" vs \"uhh ... uhh.\"',1,'/uploads/projects/68/145.sb','../uploads/projects/68/thumbnail/145.png?ver=1252464502','2009-09-08 22:48:22','2009-09-08 22:48:23');
INSERT INTO `projects` VALUES (148,74,'Animation Frames','It is very important to register your animated frames.  Some tricks for making animated characters.',3,'/uploads/projects/74/148.ppt','assets/thumb_default/ppt_icon.png','2009-09-08 22:57:22','2009-09-08 22:57:22');
INSERT INTO `projects` VALUES (149,74,'Cartooning','Break your cartoons into simple parts.',3,'/uploads/projects/74/149.ppt','assets/thumb_default/ppt_icon.png','2009-09-08 22:58:16','2009-09-08 22:58:16');
INSERT INTO `projects` VALUES (150,74,'Pixel/Vector Graphics','Use PowerPoint to make your graphics look great!',3,'/uploads/projects/74/150.ppt','assets/thumb_default/ppt_icon.png','2009-09-08 22:59:38','2009-09-08 22:59:38');
INSERT INTO `projects` VALUES (151,74,'Presentating Ideas','If you have a great idea and you don\'t present it well, it may not get the attention it deserves.',3,'/uploads/projects/74/151.ppt','assets/thumb_default/ppt_icon.png','2009-09-08 23:01:27','2009-09-08 23:01:27');
INSERT INTO `projects` VALUES (152,72,'Follow Mouse','Follow the x position of the mouse.\rUseful in games like Pong and Asteroids.',1,'/uploads/projects/72/152.sb','../uploads/projects/72/thumbnail/152.png?ver=1252507601','2009-09-09 10:46:42','2009-09-09 10:46:42');
INSERT INTO `projects` VALUES (153,69,'Hyper-speed scrolling background','Create a hyper-speed effect by tiling and scrolling 2 star scene sprites.',1,'/uploads/projects/69/153.sb','../uploads/projects/69/thumbnail/153.png?ver=1252510560','2009-09-09 11:36:00','2009-09-09 11:36:01');
INSERT INTO `projects` VALUES (154,75,'wedo plane','this is a plane made with lego wedo and programmed by scratch',5,'/uploads/projects/75/154.jpg','../uploads/projects/75/thumbnail/154.png?ver=1252528825','2009-09-09 16:45:23','2009-09-09 16:45:24');
INSERT INTO `projects` VALUES (155,75,'WeDo Football','This is a WeDo project programmed with Scratch. It uses a distance sensor. Its program is something like this: If the distance sensor has a value of less than 50, turn on the motor behind (to get a boost), then return the motor to the original position.',9,'/uploads/projects/75/155.wmv','assets/thumb_default/video_icon.png','2009-09-12 11:21:16','2009-09-13 13:52:05');
INSERT INTO `projects` VALUES (156,75,'WeDo Bird','It\'s a construction with LEGO and it is programmed with Scratch. Its program is something like this: If the value of the tilt sensor changes from 1 to 3, play sound \"Bird\" twice.',9,'/uploads/projects/75/156.wmv','assets/thumb_default/video_icon.png','0000-00-00 00:00:00','2009-09-13 13:53:02');
INSERT INTO `projects` VALUES (157,75,'WeDo Lion','This is a WeDo project programmed with Scratch. It uses a tilt sensor (the bone). What the program does is that if the value of the tilt sensor is equal to 0, do nothing; if the value is 1, turn on motor for .5 seconds and play sound \"miau\"; if the value is 3, turn on motor for .5 seconds to the other side and play sound \"grrroaaar\". I added another thing because when you keep pointing up, the motor will reach a point where it will crash the gears (same on both sides), so I set a variable so that each time you point up or down you will add or subtract 1 to the variable, when the variable reaches 8 or -8, the motor won\'t turn.',9,'/uploads/projects/75/157.wmv','assets/thumb_default/video_icon.png','0000-00-00 00:00:00','2009-09-13 13:58:00');
INSERT INTO `projects` VALUES (158,34,'robot picture','generated using opengl',6,'/uploads/projects/34/158.png','../uploads/projects/34/thumbnail/158.png?ver=1254031005','2009-09-27 01:40:43','2009-09-27 01:56:47');
INSERT INTO `projects` VALUES (159,41,'calculator','this is a scratch program where i build a calculator. it doesnt work completely but you can download it and it will work',1,'/uploads/projects/41/159.sb','../uploads/projects/41/thumbnail/159.png?ver=1254577609','2009-10-03 09:41:15','2009-10-03 09:47:00');
INSERT INTO `projects` VALUES (160,34,'robot picture','generated in opengl using hierarchical modelling and skeletal subspace deformation',6,'/uploads/projects/34/160.png','../uploads/projects/34/thumbnail/160.png?ver=1255569035','2009-10-14 21:10:36','2009-10-14 21:10:36');
INSERT INTO `projects` VALUES (165,88,'Blue Run','You are blue and you are running across a desert. You can move around with the direction keys. That\'s really about it. The landscape more or less looks like what I think New Mexico looks like.',1,'/uploads/projects/88/165.sb','../uploads/projects/88/thumbnail/165.png?ver=1257251064','2009-11-03 07:24:27','2009-11-03 07:24:27');
INSERT INTO `projects` VALUES (171,91,'Max, Sheldon and India','Universe Explorer',1,'/uploads/projects/91/171.sb','../uploads/projects/91/thumbnail/171.png?ver=1260329635','2009-12-08 22:33:56','2009-12-08 22:33:56');
INSERT INTO `projects` VALUES (172,91,'Matthew, Elia and Joel','Trivia Game',1,'/uploads/projects/91/172.sb','../uploads/projects/91/thumbnail/172.png?ver=1260329682','2009-12-08 22:34:47','2009-12-08 22:34:47');
INSERT INTO `projects` VALUES (173,91,'James, Cooper and Jackson','Trivia Game',1,'/uploads/projects/91/173.sb','../uploads/projects/91/thumbnail/173.png?ver=1260329735','2009-12-08 22:35:37','2009-12-08 22:35:37');
INSERT INTO `projects` VALUES (174,91,'Erica, Jin and Samantha','Trivia Game',1,'/uploads/projects/91/174.sb','../uploads/projects/91/thumbnail/174.png?ver=1260329770','2009-12-08 22:36:14','2009-12-08 22:36:14');
INSERT INTO `projects` VALUES (175,95,'Jackson-Isaac-Alex','Space game',1,'/uploads/projects/95/175.sb','../uploads/projects/95/thumbnail/175.png?ver=1261080124','2009-12-17 15:02:06','2009-12-17 15:02:07');
INSERT INTO `projects` VALUES (176,95,'kaiwen and caleb and hector','Space Game',1,'/uploads/projects/95/176.sb','../uploads/projects/95/thumbnail/176.png?ver=1261081752','2009-12-17 15:02:15','2009-12-17 15:29:13');
INSERT INTO `projects` VALUES (177,95,'jeanne and john','Space Game',1,'/uploads/projects/95/177.sb','../uploads/projects/95/thumbnail/177.png?ver=1261080134','2009-12-17 15:02:16','2009-12-17 15:02:16');
INSERT INTO `projects` VALUES (178,95,'Jennifer and Daniella','Alien Trivia Game',1,'/uploads/projects/95/178.sb','../uploads/projects/95/thumbnail/178.png?ver=1261081351','2009-12-17 15:07:39','2009-12-17 15:22:34');
INSERT INTO `projects` VALUES (179,95,'Hallie Emmy and Logan','Super Alien',1,'/uploads/projects/95/179.sb','../uploads/projects/95/thumbnail/179.png?ver=1261081978','2009-12-17 15:33:01','2009-12-17 15:33:01');
INSERT INTO `projects` VALUES (180,33,'asas','asas',1,'/uploads/projects/33/180.sb','../uploads/projects/33/thumbnail/180.png?ver=1262199554','2009-12-30 13:59:15','2009-12-30 13:59:16');
INSERT INTO `projects` VALUES (181,96,'Trivia Space','Alien in space trivia game',1,'/uploads/projects/96/181.sb','../uploads/projects/96/thumbnail/181.png?ver=1262200005','2009-12-30 14:06:46','2009-12-30 14:06:46');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

#
# Source for table skill_levels
#

DROP TABLE IF EXISTS `skill_levels`;
CREATE TABLE `skill_levels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

#
# Dumping data for table skill_levels
#
LOCK TABLES `skill_levels` WRITE;
/*!40000 ALTER TABLE `skill_levels` DISABLE KEYS */;

INSERT INTO `skill_levels` VALUES (1,'Neophyte');
INSERT INTO `skill_levels` VALUES (2,'Padawan');
INSERT INTO `skill_levels` VALUES (3,'Master');
INSERT INTO `skill_levels` VALUES (4,'Guru');
/*!40000 ALTER TABLE `skill_levels` ENABLE KEYS */;
UNLOCK TABLES;

#
# Source for table skill_types
#

DROP TABLE IF EXISTS `skill_types`;
CREATE TABLE `skill_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

#
# Dumping data for table skill_types
#
LOCK TABLES `skill_types` WRITE;
/*!40000 ALTER TABLE `skill_types` DISABLE KEYS */;

INSERT INTO `skill_types` VALUES (1,'Computer');
INSERT INTO `skill_types` VALUES (2,'Musical');
INSERT INTO `skill_types` VALUES (3,'Presentation');
INSERT INTO `skill_types` VALUES (4,'Mechanical');
INSERT INTO `skill_types` VALUES (5,'Problem Solving');
INSERT INTO `skill_types` VALUES (6,'Project Management');
INSERT INTO `skill_types` VALUES (7,'Other');
INSERT INTO `skill_types` VALUES (8,'Sports');
/*!40000 ALTER TABLE `skill_types` ENABLE KEYS */;
UNLOCK TABLES;

#
# Source for table skills
#

DROP TABLE IF EXISTS `skills`;
CREATE TABLE `skills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL DEFAULT '0',
  `type_id` int(11) NOT NULL DEFAULT '0',
  `level_id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=110 DEFAULT CHARSET=utf8;

#
# Dumping data for table skills
#
LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;

INSERT INTO `skills` VALUES (1,26,1,2,'Testing');
INSERT INTO `skills` VALUES (2,26,3,4,'sdfasdf');
INSERT INTO `skills` VALUES (4,23,1,4,'Assembly x86');
INSERT INTO `skills` VALUES (5,33,1,4,'Programming');
INSERT INTO `skills` VALUES (6,33,2,2,'Flute');
INSERT INTO `skills` VALUES (7,33,2,2,'Classical guitar finger-style');
INSERT INTO `skills` VALUES (9,37,1,3,'Photoshop');
INSERT INTO `skills` VALUES (10,37,1,3,'Scratch');
INSERT INTO `skills` VALUES (11,37,1,3,'HTML');
INSERT INTO `skills` VALUES (12,37,2,3,'Blues Guitar');
INSERT INTO `skills` VALUES (13,37,2,1,'Drums');
INSERT INTO `skills` VALUES (14,33,6,2,'User Experience Analysis');
INSERT INTO `skills` VALUES (15,37,1,2,'Database Design');
INSERT INTO `skills` VALUES (16,37,3,4,'PowerPoint Design');
INSERT INTO `skills` VALUES (17,37,6,3,'MS Project');
INSERT INTO `skills` VALUES (18,37,6,4,'Excel');
INSERT INTO `skills` VALUES (42,34,1,3,'programming');
INSERT INTO `skills` VALUES (43,34,1,2,'multimedia design');
INSERT INTO `skills` VALUES (44,34,1,3,'system administration');
INSERT INTO `skills` VALUES (45,34,2,2,'flute');
INSERT INTO `skills` VALUES (46,34,2,1,'tango');
INSERT INTO `skills` VALUES (47,34,3,3,'technical report');
INSERT INTO `skills` VALUES (48,34,3,2,'oral presentation');
INSERT INTO `skills` VALUES (49,34,4,2,'machining');
INSERT INTO `skills` VALUES (50,34,4,3,'soldering');
INSERT INTO `skills` VALUES (51,34,5,3,'teamwork');
INSERT INTO `skills` VALUES (52,34,5,3,'documentation');
INSERT INTO `skills` VALUES (53,34,6,4,'technology enhancement');
INSERT INTO `skills` VALUES (54,42,1,2,'Photoshopping');
INSERT INTO `skills` VALUES (55,42,4,3,'Technic Lego Building');
INSERT INTO `skills` VALUES (56,42,1,3,'Scratch Programming');
INSERT INTO `skills` VALUES (57,42,1,2,'Flash Programming');
INSERT INTO `skills` VALUES (58,42,1,2,'HTML Editing');
INSERT INTO `skills` VALUES (59,42,1,1,'Java Programmer');
INSERT INTO `skills` VALUES (60,42,1,3,'Powerpoint Artist');
INSERT INTO `skills` VALUES (63,41,1,3,'scratch');
INSERT INTO `skills` VALUES (65,41,1,1,'flex programming');
INSERT INTO `skills` VALUES (66,41,4,3,'lego');
INSERT INTO `skills` VALUES (67,41,1,2,'html');
INSERT INTO `skills` VALUES (68,41,1,4,'playing spore');
INSERT INTO `skills` VALUES (69,41,1,3,'power point drawing');
INSERT INTO `skills` VALUES (70,40,2,2,'Piano');
INSERT INTO `skills` VALUES (71,40,2,1,'Saxaphone');
INSERT INTO `skills` VALUES (72,41,7,3,'Playing Basketball');
INSERT INTO `skills` VALUES (73,48,5,2,'Problem Solving');
INSERT INTO `skills` VALUES (74,48,2,3,'Musical Tune');
INSERT INTO `skills` VALUES (75,48,1,2,'Computer Skills');
INSERT INTO `skills` VALUES (76,48,6,4,'Professional outlook');
INSERT INTO `skills` VALUES (77,48,7,3,'Writing');
INSERT INTO `skills` VALUES (78,48,7,4,'Voice Acting');
INSERT INTO `skills` VALUES (79,48,7,3,'Video Games Skills');
INSERT INTO `skills` VALUES (80,48,7,4,'Otaku (Anime Lover)');
INSERT INTO `skills` VALUES (81,48,7,4,'Being Professional');
INSERT INTO `skills` VALUES (83,41,5,4,'solving a rubik cube 3 * 3');
INSERT INTO `skills` VALUES (84,52,7,3,'Drawing');
INSERT INTO `skills` VALUES (86,40,8,4,'Sailing');
INSERT INTO `skills` VALUES (87,40,1,2,'HTML');
INSERT INTO `skills` VALUES (88,40,1,2,'Scratch');
INSERT INTO `skills` VALUES (89,40,1,2,'Drawing in powerpoint');
INSERT INTO `skills` VALUES (90,59,4,3,'Model boat construction');
INSERT INTO `skills` VALUES (91,59,7,3,'Cartooning');
INSERT INTO `skills` VALUES (92,61,1,3,'Photoshop');
INSERT INTO `skills` VALUES (93,61,1,3,'Flash');
INSERT INTO `skills` VALUES (94,61,1,3,'Corel Painter');
INSERT INTO `skills` VALUES (95,61,2,1,'Accordian');
INSERT INTO `skills` VALUES (96,42,1,2,'Blender 3D Modeling');
INSERT INTO `skills` VALUES (97,60,8,4,'Soccer');
INSERT INTO `skills` VALUES (98,60,1,3,'Multimedia');
INSERT INTO `skills` VALUES (99,63,1,2,'Scratch');
INSERT INTO `skills` VALUES (100,63,1,1,'HTML');
INSERT INTO `skills` VALUES (101,63,8,2,'Soccer');
INSERT INTO `skills` VALUES (102,63,7,3,'Japanese');
INSERT INTO `skills` VALUES (103,63,7,1,'French');
INSERT INTO `skills` VALUES (104,77,3,3,'Salesman');
INSERT INTO `skills` VALUES (105,77,5,3,'Physics problems');
INSERT INTO `skills` VALUES (107,77,2,1,'Piano');
INSERT INTO `skills` VALUES (108,77,4,2,'Building robots');
INSERT INTO `skills` VALUES (109,82,4,2,'machine');
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;

#
# Source for table statistics
#

DROP TABLE IF EXISTS `statistics`;
CREATE TABLE `statistics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` int(11) NOT NULL,
  `month` int(11) NOT NULL,
  `visits` int(11) NOT NULL,
  `users` int(11) NOT NULL,
  `projects` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

#
# Dumping data for table statistics
#
LOCK TABLES `statistics` WRITE;
/*!40000 ALTER TABLE `statistics` DISABLE KEYS */;

/*!40000 ALTER TABLE `statistics` ENABLE KEYS */;
UNLOCK TABLES;

#
# Source for table systems
#

DROP TABLE IF EXISTS `systems`;
CREATE TABLE `systems` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(255) NOT NULL DEFAULT '',
  `description` text,
  `image_url` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

#
# Dumping data for table systems
#
LOCK TABLES `systems` WRITE;
/*!40000 ALTER TABLE `systems` DISABLE KEYS */;

INSERT INTO `systems` VALUES (1,1,'Solar System','Consists of the Sun and those celestial objects bound to it by gravity, all of which formed from the collapse of a giant molecular cloud approximately 4.6 billion years ago.','assets/images/star.png');
INSERT INTO `systems` VALUES (2,1,'Upsilon Andromedae','The first multiplanet extrasolar planetary system discovered around a main sequence star, found to be so in April 1999.','assets/images/star.png');
INSERT INTO `systems` VALUES (3,2,'BIY - Never Never Land','BIY Team Jul 09','assets/images/star.png');
INSERT INTO `systems` VALUES (4,1,'Boston','Massachusetts','assets/images/star.png');
INSERT INTO `systems` VALUES (5,2,'BIY - Action Contraptions','','assets/images/star.png');
INSERT INTO `systems` VALUES (6,2,'BIY - Builders\' Paradise','BIY Team Aug 09','assets/images/star.png ');
INSERT INTO `systems` VALUES (7,2,'Examples 1','cool description','assets/images/star2.png');
INSERT INTO `systems` VALUES (8,2,'Examples 2','cool description','assets/images/star3.png');
/*!40000 ALTER TABLE `systems` ENABLE KEYS */;
UNLOCK TABLES;

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
