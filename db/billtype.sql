/*
Navicat MySQL Data Transfer

Source Server         : nm3000
Source Server Version : 50614
Source Host           : localhost:3003
Source Database       : timebill

Target Server Type    : MYSQL
Target Server Version : 50614
File Encoding         : 65001

Date: 2016-08-29 16:57:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `billtype`
-- ----------------------------
DROP TABLE IF EXISTS `billtype`;
CREATE TABLE `billtype` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of billtype
-- ----------------------------
INSERT INTO `billtype` VALUES ('1', '阅读');
INSERT INTO `billtype` VALUES ('2', '编码');
INSERT INTO `billtype` VALUES ('3', '学习');
INSERT INTO `billtype` VALUES ('4', '电影');
INSERT INTO `billtype` VALUES ('5', '文档');
INSERT INTO `billtype` VALUES ('6', '纪录片');
