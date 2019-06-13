

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


