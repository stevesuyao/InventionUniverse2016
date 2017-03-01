# MySQL-Front 5.0  (Build 1.0)

/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE */;
/*!40101 SET SQL_MODE='' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES */;
/*!40103 SET SQL_NOTES='ON' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;


# Host: 127.0.0.1    Database: biy
# ------------------------------------------------------
# Server version 5.1.33-community-log

DROP DATABASE IF EXISTS `biy`;
CREATE DATABASE `biy` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `biy`;

#
# Table structure for table comments
#

CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `planet_id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `text` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

#
# Table structure for table constellations
#

CREATE TABLE `constellations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(255) NOT NULL DEFAULT '',
  `description` text,
  `image_url` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
INSERT INTO `constellations` VALUES (1,0,'Sagittarius','Sagittarius is one of the constellations of the zodiac. Its name is Latin for the archer, and its symbol is a stylized arrow. Sagittarius is commonly represented as a centaur drawing a bow. It lies between Ophiuchus to the west and Capricornus to the east.\r\n','assets/images/constellation.png');
/*!40000 ALTER TABLE `constellations` ENABLE KEYS */;
UNLOCK TABLES;

#
# Table structure for table galaxies
#

CREATE TABLE `galaxies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(255) NOT NULL DEFAULT '',
  `description` text,
  `image_url` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
INSERT INTO `galaxies` VALUES (1,1,'Milky Way','The Milky Way, sometimes called simply the Galaxy, is the galaxy in which the Solar System is located. It is a barred spiral galaxy that is part of the Local Group of galaxies. It is one of billions of galaxies in the observable universe.','assets/images/galaxy.png');
INSERT INTO `galaxies` VALUES (2,1,'NGC 4414','NGC 4414 is an unbarred spiral galaxy about 62 million light-years away in the constellation Coma Berenices. It is a flocculent galaxy, with short segments of spiral structure but without the dramatic well-defined spiral arms of a grand design spiral.','assets/images/galaxy.png');
/*!40000 ALTER TABLE `galaxies` ENABLE KEYS */;
UNLOCK TABLES;

#
# Table structure for table planet_viewcount
#

CREATE TABLE `planet_viewcount` (
  `id` int(11) NOT NULL DEFAULT '0',
  `view_count` bigint(20) NOT NULL DEFAULT '0',
  `last_viewed` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40000 ALTER TABLE `planet_viewcount` ENABLE KEYS */;
UNLOCK TABLES;

#
# Table structure for table planets
#

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40000 ALTER TABLE `planets` ENABLE KEYS */;
UNLOCK TABLES;

#
# Table structure for table project_types
#

CREATE TABLE `project_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `extension` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `extension` (`extension`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
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
# Table structure for table project_viewcount
#

CREATE TABLE `project_viewcount` (
  `id` int(11) NOT NULL DEFAULT '0',
  `view_count` bigint(20) NOT NULL DEFAULT '0',
  `last_viewed` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40000 ALTER TABLE `project_viewcount` ENABLE KEYS */;
UNLOCK TABLES;

#
# Table structure for table projects
#

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

#
# Table structure for table skill_levels
#

CREATE TABLE `skill_levels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
INSERT INTO `skill_levels` VALUES (1,'Neophyte');
INSERT INTO `skill_levels` VALUES (2,'Padawan');
INSERT INTO `skill_levels` VALUES (3,'Master');
INSERT INTO `skill_levels` VALUES (4,'Guru');
/*!40000 ALTER TABLE `skill_levels` ENABLE KEYS */;
UNLOCK TABLES;

#
# Table structure for table skill_types
#

CREATE TABLE `skill_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
INSERT INTO `skill_types` VALUES (1,'Computer');
INSERT INTO `skill_types` VALUES (2,'Musical');
INSERT INTO `skill_types` VALUES (3,'Presentation');
INSERT INTO `skill_types` VALUES (4,'Mechanical');
INSERT INTO `skill_types` VALUES (5,'Problem Solving');
INSERT INTO `skill_types` VALUES (6,'Project Management');
/*!40000 ALTER TABLE `skill_types` ENABLE KEYS */;
UNLOCK TABLES;

#
# Table structure for table skills
#

CREATE TABLE `skills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL DEFAULT '0',
  `type_id` int(11) NOT NULL DEFAULT '0',
  `level_id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;

#
# Table structure for table systems
#

CREATE TABLE `systems` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(255) NOT NULL DEFAULT '',
  `description` text,
  `image_url` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
INSERT INTO `systems` VALUES (1,1,'Solar System','Consists of the Sun and those celestial objects bound to it by gravity, all of which formed from the collapse of a giant molecular cloud approximately 4.6 billion years ago.','assets/images/star.png');
INSERT INTO `systems` VALUES (2,1,'Upsilon Andromedae','The first multiplanet extrasolar planetary system discovered around a main sequence star, found to be so in April 1999.','assets/images/star.png');
INSERT INTO `systems` VALUES (3,2,'BIY Staff','BIY Staff','assets/images/star.png');
/*!40000 ALTER TABLE `systems` ENABLE KEYS */;
UNLOCK TABLES;

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
