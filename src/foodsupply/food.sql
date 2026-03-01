-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 06, 2024 at 10:49 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `food`
--

-- --------------------------------------------------------

--
-- Table structure for table `productlot`
--

CREATE TABLE `productlot` (
  `productid` int(11) NOT NULL,
  `productname` varchar(1000) DEFAULT NULL,
  `owners` int(100) DEFAULT NULL,
  `seedid` int(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `productlot`
--

INSERT INTO `productlot` (`productid`, `productname`, `owners`, `seedid`) VALUES
(1, 'tomato crop', 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `seed`
--

CREATE TABLE `seed` (
  `seedid` int(11) NOT NULL,
  `seedname` varchar(1000) DEFAULT NULL,
  `growthtime` int(11) DEFAULT NULL,
  `ownerid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `seed`
--

INSERT INTO `seed` (`seedid`, `seedname`, `growthtime`, `ownerid`) VALUES
(1, 'tomota', 18, 0),
(2, 'potato', 45, 2),
(3, 'potato', 45, 2);

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `tid` int(11) NOT NULL,
  `prod_id` int(11) DEFAULT NULL,
  `fromid` int(11) DEFAULT NULL,
  `toid` int(11) DEFAULT NULL,
  `transactiondate` date DEFAULT current_timestamp(),
  `transaddress` text DEFAULT NULL,
  `remark` text DEFAULT NULL,
  `file` varchar(1000) NOT NULL,
  `filehash` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`tid`, `prod_id`, `fromid`, `toid`, `transactiondate`, `transaddress`, `remark`, `file`, `filehash`) VALUES
(1, 2, 0, 0, '2024-03-06', '0xce22077f781cee25c2564ba8179d9f4020adeb23f8f27727f26cb6010cced827', 'create', '', ''),
(2, 3, NULL, 2, '2024-03-06', '0xa53478b703f4e973e35c18d43f4cfd1eaaedc58723fe70848c08253503a82e6a', 'create', '', ''),
(3, 1, 2, 3, '2024-03-06', '0x699d53f526b7173f3d7bbbf46d210456c1e911d96743771f24ff36ffd64f9ec9', 'Transfer to farmer', 'Screenshot (3).png', 'QmQUnmYFTZGVveFgKHm7NgGkAQM93T1ZmZnssNjnsQA2Wz'),
(4, 1, NULL, 3, '2024-03-06', '0x6e06f57339812b422a27c35ff372bef5238007ce4045d0338d8cdecd9b07c1c6', 'cultivated seed to crop', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `uid` int(11) NOT NULL,
  `fname` varchar(1000) DEFAULT NULL,
  `mobile` varchar(10) DEFAULT NULL,
  `blockchainaddress` text DEFAULT NULL,
  `privatekey` text DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
  `approve` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uid`, `fname`, `mobile`, `blockchainaddress`, `privatekey`, `role`, `approve`) VALUES
(2, 'Su1', '187487454', '0x71A644A1EE4DF405e93B1Be7A047cb04924b8459', '0xeacbf55c6bcc60612c33a9c506fff68189b60bf1c36207764fbb919f30e9974e', 'Supplier', 1),
(3, 'f1', '7854878', '0x7397aD1017054c1544083CaC010B3AD314a8c041', '0xc26938a2c56a4b7d4f4ac083104c441d550695e07f5b07cf4c9e45f5117dabac', 'Farmer', 0),
(4, 'grainelevator', '7845498687', '0x872238BE39c5c1f4C8DE59ecC3d75DCAc259f9Ab', '0x21e582cc91e233eee5faa37f39b5fe13b1ca0e2f2471197e5f4ff2b2916e752d', 'Grain_Elevator', 0),
(5, 'grainprocesser', '5498784564', '0x6C2Aa80231DAf600762A3fa2d7d8d22e744B6971', '0x076172cf7dbc54d387725a30f73be49902405b1bd8d8f4048c4f9ac74dd21283', 'Grain_Process', 0),
(6, 'Distributer', '7845978845', '0x28D203758aC02EdDFCF7ac2f360AA97f913D5d0C', '0x099cecaefb14418279270b5623f3eeb458ba10e263908c7417218214a21b505e', 'Distributer', 0),
(7, 'Re1', '9879584568', '0x93071E3443c96c2417163624BDdD695D4f91b001', '0x4cf744f3d2a29ae70f2086c7f1b797c178ad1094783eb289502fdc77f196555b', 'Retailer', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `productlot`
--
ALTER TABLE `productlot`
  ADD PRIMARY KEY (`productid`);

--
-- Indexes for table `seed`
--
ALTER TABLE `seed`
  ADD PRIMARY KEY (`seedid`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`tid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
