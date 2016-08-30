/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : timebill

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2016-08-30 22:54:07
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for timebill
-- ----------------------------
DROP TABLE IF EXISTS `timebill`;
CREATE TABLE `timebill` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `detail` varchar(255) NOT NULL,
  `startTime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `endTime` datetime DEFAULT NULL,
  `durationTime` int(11) DEFAULT NULL,
  `typeId` int(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `bill_type_fk` (`typeId`),
  CONSTRAINT `bill_type_fk` FOREIGN KEY (`typeId`) REFERENCES `billtype` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of timebill
-- ----------------------------
INSERT INTO `timebill` VALUES ('1', '《奇特的一生》', '2016-02-26 09:00:00', '2016-02-26 09:45:00', '2700', '1');
INSERT INTO `timebill` VALUES ('2', '生产信息系统', '2016-02-26 10:00:00', '2016-02-26 10:30:00', '1800', '2');
INSERT INTO `timebill` VALUES ('3', '订阅', '2016-02-26 10:35:00', '2016-02-26 11:50:00', '4500', '1');
INSERT INTO `timebill` VALUES ('4', '生产信息系统', '2016-02-26 13:15:00', '2016-02-26 13:45:00', '1800', '5');
INSERT INTO `timebill` VALUES ('5', '维修需求', '2016-02-26 14:00:00', '2016-02-26 16:00:00', '7200', '7');
INSERT INTO `timebill` VALUES ('6', '生产信息系统', '2016-02-26 16:20:00', '2016-02-26 17:40:00', '4800', '2');
INSERT INTO `timebill` VALUES ('9', '《奇特的一生》', '2016-02-27 09:00:00', '2016-02-27 09:20:00', '1200', '1');
INSERT INTO `timebill` VALUES ('10', '生产信息系统', '2016-02-27 09:30:00', '2016-02-27 10:50:00', '4800', '2');
INSERT INTO `timebill` VALUES ('11', '订阅', '2016-02-27 11:00:00', '2016-02-27 11:30:00', '1800', '1');
INSERT INTO `timebill` VALUES ('12', '生产信息系统', '2016-02-27 11:40:00', '2016-02-27 11:50:00', '600', '2');
INSERT INTO `timebill` VALUES ('13', '订阅', '2016-02-27 13:20:00', '2016-02-27 13:35:00', '900', '1');
INSERT INTO `timebill` VALUES ('14', '需求文档', '2016-02-27 14:00:00', '2016-02-27 17:30:00', '12600', '5');
INSERT INTO `timebill` VALUES ('15', '郊游藏龙岛公园', '2016-02-28 07:00:00', '2016-02-28 11:00:00', '14400', '8');
INSERT INTO `timebill` VALUES ('16', '踢球', '2016-02-28 13:00:00', '2016-02-28 16:00:00', '10800', '9');
INSERT INTO `timebill` VALUES ('17', '维修需求', '2016-02-29 09:15:00', '2016-02-29 09:45:00', '1800', '5');
INSERT INTO `timebill` VALUES ('18', '订阅', '2016-02-29 09:45:00', '2016-02-29 10:55:00', '4200', '1');
INSERT INTO `timebill` VALUES ('19', '生产信息系统', '2016-02-29 11:05:00', '2016-02-29 11:55:00', '3000', '2');
INSERT INTO `timebill` VALUES ('20', '《奇特的一生》', '2016-02-29 13:20:00', '2016-02-29 14:45:00', '5100', '1');
INSERT INTO `timebill` VALUES ('21', '订阅', '2016-02-29 15:20:00', '2016-02-29 16:00:00', '2400', '1');
INSERT INTO `timebill` VALUES ('22', '生产信息系统--分组下拉框', '2016-02-29 16:15:00', '2016-02-29 16:55:00', '2400', '2');
INSERT INTO `timebill` VALUES ('23', '思考估算维修开发工作量', '2016-02-29 16:55:00', '2016-02-29 17:20:00', '1500', '10');
INSERT INTO `timebill` VALUES ('24', '《奇特的一生》', '2016-02-29 17:25:00', '2016-02-29 17:35:00', '600', '1');
INSERT INTO `timebill` VALUES ('25', '《奇特的一生》', '2016-02-29 21:00:00', '2016-02-29 21:35:00', '2100', '1');
