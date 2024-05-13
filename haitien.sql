-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 13, 2024 lúc 10:34 AM
-- Phiên bản máy phục vụ: 10.4.25-MariaDB
-- Phiên bản PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `haitien`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--

CREATE TABLE `account` (
  `id_account` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `id_role` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`id_account`, `username`, `password`, `id_role`) VALUES
(22, 'lekimthuan4', '$2b$10$DokyKeZghbk5nk7MX/9q9OHlXptzjRVmDJGgcgWnbrYqzs7s7YG4e', 3),
(102, 'lekimthuan43', '$2b$10$vYaPTA6MvZWfy7o/p83RgeRezyl86HWLG46iUmkS0SE5ijsszoSuS', 1),
(103, 'lebaothach17', '$2b$10$cSqY1gFDqo9yv6MdCSe8heRCF4SrrAcOUKb.XRVRlsJMcowYSLEvq', 3),
(104, 'lethidung05', '$2b$10$c66mJBJFoO1bswuH2IqJju5q/dNRmGrVn1Em56YZRGbDf3EqsBGe2', 3),
(105, 'lethilan1', '$2b$10$BaFebbmfXH/soFqqE8CMi.KQ/jfqG/dIIGxIQW2j1v5mv30m69Lsu', 3),
(106, 'nguyenvana5', '$2b$10$2ieTW0pGYZDEh7EtoxK1w.5EMcwfHbKr13fVuim0EVZ3EhxeIVyZS', 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bookings`
--

CREATE TABLE `bookings` (
  `id_booking` int(11) NOT NULL,
  `id_account` int(11) NOT NULL,
  `id_tour` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `people` int(11) NOT NULL,
  `date` date NOT NULL,
  `name_tour` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `itinerary` text COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `includes` text COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `excludes` text COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `status` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `bookings`
--

INSERT INTO `bookings` (`id_booking`, `id_account`, `id_tour`, `name`, `email`, `phone_number`, `people`, `date`, `name_tour`, `price`, `itinerary`, `includes`, `excludes`, `status`) VALUES
(72, 106, 32, 'Nguyễn  Văn A', 'nguyenvana@gmail.com', '0865331920', 3, '2024-05-16', 'Vip', '5000000.00', 'All địa điểm', 'toàn bộ vé xe 4 chỗ', 'không', 3),
(73, 22, 32, 'Lê Kim Thuận', 'lekimthuan04032002@gmai.com', '0865331920', 3, '2024-05-17', 'Vip', '5000000.00', 'All địa điểm', 'toàn bộ vé xe 4 chỗ', 'không', 3),
(74, 103, 29, 'Lê Kim Thuận', 'lekimthuan04032002@gmai.com', '0865331920', 4, '2024-05-14', 'Tour cơ bản', '1000000.00', 'Bãi biển Hải Tiến - đền Bà Triệu - Bãi biển Hải Tiến', 'Không', 'Mọi chi phí tự lo', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `detail`
--

CREATE TABLE `detail` (
  `tour_id` int(11) NOT NULL,
  `description` text COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `highlights` text COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `itinerary` text COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `includes` text COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `excludes` text COLLATE utf8mb4_vietnamese_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `detail`
--

INSERT INTO `detail` (`tour_id`, `description`, `highlights`, `itinerary`, `includes`, `excludes`) VALUES
(14, 'Chi tiết cơ bản', 'Bãi biển Hải Tiến', 'Bãi biển Hải Tiến - đền Bà Triệu - Bãi biển Hải Tiến', 'Không', 'Mọi chi phí tự lo'),
(15, 'Chi tiết cơ bản 2', 'Suối cá', 'Bãi biển Hải Tiến - Suối cá Cẩm Thuỷ', 'xe 4 chỗ', 'Không'),
(16, 'Middle 1', 'Pù Luông, Thác Mấy', 'Các bãi Hải Tiến, Chùa Bụt, Cảng biển, Đền Bà Triệu, Pù Luông', 'Miễn phí tất cả vé, đón cách khoảng 30km', 'Tự trả tiền ăn trưa'),
(17, 'Vip Pro', 'Tát cả địa điểm', 'Tất cả địa điểm', 'toàn bộ vé xe 4 chỗ', 'không'),
(18, 'Newtour', 'Thác Mây', 'ở Bãi Biển Hải Tiến ', 'free vé', 'không phải chi trả');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `location`
--

CREATE TABLE `location` (
  `id_location` int(11) NOT NULL,
  `image_location` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `name_location` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `role`
--

CREATE TABLE `role` (
  `id_role` int(11) NOT NULL,
  `name_role` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `role`
--

INSERT INTO `role` (`id_role`, `name_role`) VALUES
(1, 'admin'),
(2, 'employee'),
(3, 'user');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tour`
--

CREATE TABLE `tour` (
  `id_tour` int(11) NOT NULL,
  `name_tour` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `image_tour` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `day` int(11) DEFAULT NULL,
  `person` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `quantity` int(10) NOT NULL,
  `tour_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `tour`
--

INSERT INTO `tour` (`id_tour`, `name_tour`, `image_tour`, `day`, `person`, `price`, `quantity`, `tour_id`) VALUES
(29, 'Tour cơ bản', 'uploads\\28bcf8678826e32c207249c32f06ae1b', 3, 4, '1000000.00', 1, 14),
(30, 'Tour cơ bản', 'uploads\\70de233858a7055456da8ae109ba1879', 4, 5, '1500000.00', 3, 15),
(31, 'Middle', 'uploads\\e967e3d03d8bd43ae3ea08190fdbf2a9', 2, 3, '2000000.00', 3, 16),
(32, 'Vip', 'uploads\\9b55344432be89d7966fdbe1b5d25a81', 4, 3, '5000000.00', 2, 17),
(33, 'Tour  mới', 'uploads\\a8e2f2250b2fc1ee3f9abd52f9b699ac', 1, 2, '800000.00', 1, 18);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id_account`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `id_role` (`id_role`);

--
-- Chỉ mục cho bảng `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id_booking`),
  ADD UNIQUE KEY `unique_account` (`id_account`),
  ADD KEY `id_tour` (`id_tour`);

--
-- Chỉ mục cho bảng `detail`
--
ALTER TABLE `detail`
  ADD PRIMARY KEY (`tour_id`);

--
-- Chỉ mục cho bảng `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id_location`);

--
-- Chỉ mục cho bảng `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id_role`);

--
-- Chỉ mục cho bảng `tour`
--
ALTER TABLE `tour`
  ADD PRIMARY KEY (`id_tour`),
  ADD KEY `tour_id` (`tour_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `account`
--
ALTER TABLE `account`
  MODIFY `id_account` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT cho bảng `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id_booking` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT cho bảng `detail`
--
ALTER TABLE `detail`
  MODIFY `tour_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT cho bảng `location`
--
ALTER TABLE `location`
  MODIFY `id_location` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `role`
--
ALTER TABLE `role`
  MODIFY `id_role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `tour`
--
ALTER TABLE `tour`
  MODIFY `id_tour` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `account`
--
ALTER TABLE `account`
  ADD CONSTRAINT `account_ibfk_1` FOREIGN KEY (`id_role`) REFERENCES `role` (`id_role`);

--
-- Các ràng buộc cho bảng `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`id_account`) REFERENCES `account` (`id_account`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`id_tour`) REFERENCES `tour` (`id_tour`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `tour`
--
ALTER TABLE `tour`
  ADD CONSTRAINT `tour_id` FOREIGN KEY (`tour_id`) REFERENCES `detail` (`tour_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
