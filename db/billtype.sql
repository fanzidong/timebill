/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : timebill

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2016-09-10 22:11:48
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for billtype
-- ----------------------------
DROP TABLE IF EXISTS `billtype`;
CREATE TABLE `billtype` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `toptypeId` int(11) DEFAULT NULL COMMENT '顶层类型',
  PRIMARY KEY (`id`),
  KEY `toptypeId` (`toptypeId`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of billtype
-- ----------------------------
INSERT INTO `billtype` VALUES ('1', '阅读文章', '2');
INSERT INTO `billtype` VALUES ('2', '编码', '1');
INSERT INTO `billtype` VALUES ('3', '思考学习', '2');
INSERT INTO `billtype` VALUES ('4', '影音', '3');
INSERT INTO `billtype` VALUES ('5', '文档', '1');
INSERT INTO `billtype` VALUES ('6', '编码', '2');
INSERT INTO `billtype` VALUES ('7', '会议', '1');
INSERT INTO `billtype` VALUES ('8', '户外活动', '3');
INSERT INTO `billtype` VALUES ('9', '体育锻炼', '3');
INSERT INTO `billtype` VALUES ('10', '阅读书籍', '2');
INSERT INTO `billtype` VALUES ('11', '笔记文档', '2');
INSERT INTO `billtype` VALUES ('14', '教育', '4');
INSERT INTO `billtype` VALUES ('15', '游戏', '3');
INSERT INTO `billtype` VALUES ('16', '其他工作', '1');
