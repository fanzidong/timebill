/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : timebill

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2016-08-31 22:46:13
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for billtype
-- ----------------------------
DROP TABLE IF EXISTS `billtype`;
CREATE TABLE `billtype` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of billtype
-- ----------------------------
INSERT INTO `billtype` VALUES ('1', '阅读');
INSERT INTO `billtype` VALUES ('2', '编码');
INSERT INTO `billtype` VALUES ('3', '学习');
INSERT INTO `billtype` VALUES ('4', '电影');
INSERT INTO `billtype` VALUES ('5', '文档');
INSERT INTO `billtype` VALUES ('6', '纪录片');
INSERT INTO `billtype` VALUES ('7', '会议');
INSERT INTO `billtype` VALUES ('8', '户外');
INSERT INTO `billtype` VALUES ('9', '体育');
INSERT INTO `billtype` VALUES ('10', '思考');
INSERT INTO `billtype` VALUES ('14', '教育');
INSERT INTO `billtype` VALUES ('15', '游戏');
