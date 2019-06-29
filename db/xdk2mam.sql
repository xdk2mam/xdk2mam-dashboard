

CREATE DATABASE IF NOT EXISTS xdk2mam;


USE xdk2mam;

--------------------------------------------------------------------------------------------------------


CREATE TABLE `bundles` (
  `id` int(11) AUTO_INCREMENT NOT NULL,
  `timestamp` int(11)  NULL,
  `id_bundle` int(11) NULL,
  `root` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8mb4;

CREATE TABLE `config` (
  `id` int(11) AUTO_INCREMENT NOT NULL,  
  `fullnode` varchar(200)  NULL,
  `email` varchar(200)  NULL,
  `explorer` varchar(200)  NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8mb4;

INSERT INTO `config` (`fullnode`,`email`,`explorer`) 
VALUES('https://nodes.devnet.thetangle.org:443',
NULL,
'https://devnet.thetangle.org/mam/');

CREATE TABLE `events` (
  `id` int(11) AUTO_INCREMENT NOT NULL,  
  `id_dataset` int(11)  NULL,
  `value` int(11)  NULL,
  `type_sensor` int(6)  NULL,
  `operator` varchar(5)  NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8mb4;

CREATE TABLE `datasets` (
    `id` int(11) AUTO_INCREMENT NOT NULL,    
    `dataset_name_table` varchar(100) NOT NULL,
    `dataset_desc` varchar(100) NOT NULL,
    `status` tinyint(1) NOT NULL,
    `dataset_start` int(11) NOT NULL,
    `dataset_end` int(11) NOT NULL,
    `dataset_interval` int(11) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `dataset_name_table` (`dataset_name_table`)
    )DEFAULT CHARSET=utf8mb4;


