

CREATE DATABASE IF NOT EXISTS xdk2mam;


USE xdk2mam;

CREATE TABLE `information` (
  `id` int(11) NOT NULL,
  `data` varchar(1024) DEFAULT NULL,
  `root` varchar(85) DEFAULT NULL,
  `tangle` bit(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



INSERT INTO `information` (`id`, `data`, `root`, `tangle`) VALUES
(1, '{"xdk2mam": [{"sensor": "Environmental","data": [{"Pressure": "101120"},{"Temperature": "31140"},{"Humidity": "35"}]},{"sensor": "Acceleroemter","data": [{"x": "22"},{"y": "25"},{"z": "1022"}]},{"sensor":"Gyroscope","data": [{"x": "7001"},{"y": "7560"},{"z": "1586"}]}],"device": "XDK-ALE","timestamp": "15151511"}', '', b'0'),
(2, '{"xdk2mam": [{"sensor": "Environmental","data": [{"Pressure": "101220"},{"Temperature": "33140"},{"Humidity": "35"}]},{"sensor": "Acceleroemter","data": [{"x": "22"},{"y": "25"},{"z": "1022"}]},{"sensor":"Gyroscope","data": [{"x": "7002"},{"y": "7560"},{"z": "1586"}]}],"device": "XDK-ALE","timestamp": "15151512"}', '', b'0'),
(3, '{"xdk2mam": [{"sensor": "Environmental","data": [{"Pressure": "101320"},{"Temperature": "30140"},{"Humidity": "35"}]},{"sensor": "Acceleroemter","data": [{"x": "22"},{"y": "25"},{"z": "1022"}]},{"sensor":"Gyroscope","data": [{"x": "7030"},{"y": "7560"},{"z": "1586"}]}],"device": "XDK-ALE","timestamp": "15151513"}', '', b'0'),
(4, '{"xdk2mam": [{"sensor": "Environmental","data": [{"Pressure": "101420"},{"Temperature": "25140"},{"Humidity": "35"}]},{"sensor": "Acceleroemter","data": [{"x": "22"},{"y": "25"},{"z": "1022"}]},{"sensor":"Gyroscope","data": [{"x": "7010"},{"y": "7560"},{"z": "1586"}]}],"device": "XDK-ALE","timestamp": "15151514"}', '', b'0'),
(5, '{"xdk2mam": [{"sensor": "Environmental","data": [{"Pressure": "101520"},{"Temperature": "26140"},{"Humidity": "35"}]},{"sensor": "Acceleroemter","data": [{"x": "22"},{"y": "25"},{"z": "1022"}]},{"sensor":"Gyroscope","data": [{"x": "7050"},{"y": "7560"},{"z": "1586"}]}],"device": "XDK-ALE","timestamp": "15151515"}', '', b'0'),
(6, '{"xdk2mam": [{"sensor": "Environmental","data": [{"Pressure": "101620"},{"Temperature": "27140"},{"Humidity": "35"}]},{"sensor": "Acceleroemter","data": [{"x": "22"},{"y": "25"},{"z": "1022"}]},{"sensor":"Gyroscope","data": [{"x": "7120"},{"y": "7560"},{"z": "1586"}]}],"device": "XDK-ALE","timestamp": "15151516"}', '', b'0'),
(7, '{"xdk2mam": [{"sensor": "Environmental","data": [{"Pressure": "101720"},{"Temperature": "29140"},{"Humidity": "35"}]},{"sensor": "Acceleroemter","data": [{"x": "22"},{"y": "25"},{"z": "1022"}]},{"sensor":"Gyroscope","data": [{"x": "3550"},{"y": "7560"},{"z": "1586"}]}],"device": "XDK-ALE","timestamp": "15151517"}', '', b'0'),
(8, '{"xdk2mam": [{"sensor": "Environmental","data": [{"Pressure": "101820"},{"Temperature": "30540"},{"Humidity": "35"}]},{"sensor": "Acceleroemter","data": [{"x": "22"},{"y": "25"},{"z": "1022"}]},{"sensor":"Gyroscope","data": [{"x": "7640"},{"y": "7560"},{"z": "1586"}]}],"device": "XDK-ALE","timestamp": "15151518"}', '', b'0');


ALTER TABLE `information`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `information`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3524;
COMMIT;


