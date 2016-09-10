-- phpMyAdmin SQL Dump
-- http://www.phpmyadmin.net
--
-- 生成日期: 2016 年 09 月 10 日 21:03

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `TqLAcHLmENcmeXXRPhxR`
--

-- --------------------------------------------------------

--
-- 表的结构 `billtype`
--

CREATE TABLE IF NOT EXISTS `billtype` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `toptypeId` int(11) DEFAULT NULL COMMENT '顶层类型',
  PRIMARY KEY (`id`),
  KEY `toptypeId` (`toptypeId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=17 ;

--
-- 转存表中的数据 `billtype`
--

INSERT INTO `billtype` (`id`, `name`, `toptypeId`) VALUES
(1, '阅读', 2),
(2, '编码', 1),
(3, '学习', 2),
(4, '影音', 3),
(5, '文档', 1),
(6, '纪录片', 3),
(7, '会议', 1),
(8, '户外活动', 3),
(9, '体育锻炼', 3),
(10, '思考学习', 2),
(14, '教育', 4),
(15, '游戏', 3),
(16, '其他工作', 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
