-- phpMyAdmin SQL Dump
-- http://www.phpmyadmin.net
--
-- 生成日期: 2016 年 09 月 10 日 21:02

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
-- 表的结构 `toptype`
--

CREATE TABLE IF NOT EXISTS `toptype` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '顶级类型主键',
  `name` varchar(50) NOT NULL COMMENT '顶级类型名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='时间账单顶级类型' AUTO_INCREMENT=5 ;

--
-- 转存表中的数据 `toptype`
--

INSERT INTO `toptype` (`id`, `name`) VALUES
(1, '工作'),
(2, '个人进步'),
(3, '娱乐'),
(4, '教育');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
