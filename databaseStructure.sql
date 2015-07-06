-- 数据表结构应该在一开始就被导入

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `blogdb`
--

-- --------------------------------------------------------

--
-- 表的结构 `blog_article`
--

CREATE TABLE IF NOT EXISTS `blog_article` (
  `pid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `created` int(10) unsigned DEFAULT '0',
  `modified` int(10) unsigned DEFAULT '0',
  `text` text,
  `cover` varchar(32) NOT NULL,
  `category` varchar(10) NOT NULL,
  `authorId` int(10) unsigned DEFAULT '0',
  `look` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`pid`),
  KEY `created` (`created`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;

-- --------------------------------------------------------

--
-- 表的结构 `blog_comments`
--

CREATE TABLE IF NOT EXISTS `blog_comments` (
  `cid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pid` int(10) unsigned DEFAULT '0',
  `created` int(10) unsigned DEFAULT '0',
  `author` varchar(200) DEFAULT NULL,
  `authorId` int(10) unsigned DEFAULT '0',
  `ownerId` int(10) unsigned DEFAULT '0',
  `mail` varchar(200) DEFAULT NULL,
  `url` varchar(200) DEFAULT NULL,
  `ip` varchar(64) DEFAULT NULL,
  `agent` varchar(200) DEFAULT NULL,
  `text` text,
  `parent` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`cid`),
  KEY `cid` (`pid`),
  KEY `created` (`created`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;
