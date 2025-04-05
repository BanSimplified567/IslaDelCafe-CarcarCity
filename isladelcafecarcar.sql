-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for isladelcafecarcar
CREATE DATABASE IF NOT EXISTS `isladelcafecarcar` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `isladelcafecarcar`;

-- Dumping structure for table isladelcafecarcar.tbladmin
CREATE TABLE IF NOT EXISTS `tbladmin` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text,
  `city` varchar(50) DEFAULT NULL,
  `zip_code` varchar(10) DEFAULT NULL,
  `status` enum('active','pending','inactive') DEFAULT 'pending',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table isladelcafecarcar.tbladmin: ~0 rows (approximately)
INSERT IGNORE INTO `tbladmin` (`admin_id`, `first_name`, `last_name`, `email`, `password`, `phone`, `address`, `city`, `zip_code`, `status`, `created_at`, `updated_at`) VALUES
	(1, 'Bannie', 'Bringcola', 'naviedaj01@gmail.com', '$2y$10$Ax5FVVZlmF/MPQY9FJKYeeAG4Nx8It2Rlh2KlvnsYoKhIKJyzpmWa', '09123456789', 'Sibonga Cebu', 'Sibonga', '6020', 'active', '2025-03-31 08:25:08', '2025-03-31 08:34:44'),
	(2, 'Admin', 'User', 'admin123@gmail.com', '$2y$10$eImGz5u5fV9eK5fNQ.CJuO2p5p5B9q7l1m.zxP0Jf2Qb6l6ZsH8Oa', '09123456789', 'CarCar', 'Sibonga', '6020', 'active', '2025-03-31 20:53:02', '2025-03-31 20:53:28');

-- Dumping structure for table isladelcafecarcar.tblorders
CREATE TABLE IF NOT EXISTS `tblorders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `order_number` varchar(50) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` enum('Pending','Completed','Cancelled') NOT NULL DEFAULT 'Pending',
  `payment_method` varchar(50) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text NOT NULL,
  `city` varchar(100) DEFAULT NULL,
  `zip_code` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_id`),
  UNIQUE KEY `order_number` (`order_number`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tblorders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tblusers` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table isladelcafecarcar.tblorders: ~0 rows (approximately)
INSERT IGNORE INTO `tblorders` (`order_id`, `user_id`, `order_number`, `total_amount`, `status`, `payment_method`, `first_name`, `last_name`, `email`, `phone`, `address`, `city`, `zip_code`, `created_at`, `updated_at`) VALUES
	(3, 1, 'ORD-20250330-c4445', 686.00, 'Pending', 'cash', 'Jade Ivan', 'Bringcola', 'naviedaj567@gmail.com', '+639460945946', 'Pandan Sibonga Cebu', 'Cebu', '123', '2025-03-30 12:06:47', '2025-03-30 12:06:47');

-- Dumping structure for table isladelcafecarcar.tblproducts
CREATE TABLE IF NOT EXISTS `tblproducts` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` varchar(50) NOT NULL,
  `subtype` varchar(50) NOT NULL,
  `image` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `size` varchar(255) NOT NULL,
  `temperature` varchar(50) NOT NULL,
  `rating` decimal(3,2) NOT NULL,
  `calories` int NOT NULL,
  `caffeine_level` varchar(50) NOT NULL,
  `stock` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table isladelcafecarcar.tblproducts: ~19 rows (approximately)
INSERT IGNORE INTO `tblproducts` (`product_id`, `name`, `type`, `subtype`, `image`, `description`, `size`, `temperature`, `rating`, `calories`, `caffeine_level`, `stock`, `price`, `created_at`, `updated_at`) VALUES
	(1, 'Americano', 'coffee', 'premium', '61790277.jpg', 'Bold and invigorating, this classic drink combines rich espresso with chilled water and ice for a refreshing, smooth, and energizing coffee experience.', 'small, medium, large', 'iced', 4.80, 124, 'high', 10, 49.00, '2025-04-02 13:43:47', '2025-04-02 13:43:47'),
	(2, 'Cafe Latte', 'coffee', 'premium', '61790279.jpg', 'A classic blend of rich espresso and creamy milk, served over ice for a smooth and refreshing coffee experience. Perfectly light and satisfying.', 'small, medium, large', 'iced', 4.70, 156, 'medium', 10, 49.00, '2025-04-02 13:43:47', '2025-04-02 13:43:47'),
	(3, 'Spanish Latte', 'coffee', 'premium', '61790280.jpg', 'A luscious combination of bold espresso, creamy milk, and a hint of sweetness, served over ice. This indulgent drink offers a perfectly balanced and refreshing coffee treat.', 'small, medium, large', 'iced', 4.90, 98, 'medium', 10, 49.00, '2025-04-02 13:43:47', '2025-04-02 13:43:47'),
	(4, 'Vanilla Latte', 'coffee', 'premium', '61790281.jpg', 'A refreshing blend of smooth espresso, creamy milk, and a touch of sweet vanilla syrup, served over ice. Perfectly balanced for a delightful pick-me-up on warm days.', 'small, medium, large', 'iced', 4.60, 142, 'medium', 10, 49.00, '2025-04-02 13:43:47', '2025-04-02 13:43:47'),
	(5, 'Caramel Latte', 'coffee', 'premium', '61790282.jpg', 'Smooth espresso paired with creamy milk and sweet caramel syrup, served over ice.', 'small, medium, large', 'iced', 4.70, 135, 'medium', 10, 49.00, '2025-04-02 13:43:47', '2025-04-02 13:43:47'),
	(6, 'White Mocha', 'coffee', 'premium', '61790283.jpg', 'A delightful mix of bold espresso, creamy milk, and sweet white chocolate syrup, served over ice.', 'small, medium, large', 'iced', 4.80, 118, 'medium-high', 10, 49.00, '2025-04-02 13:43:47', '2025-04-02 13:43:47'),
	(7, 'Java Chips', 'coffee', 'premium', '61790284.jpg', 'A deliciously indulgent blend of rich coffee, chocolate chips, and creamy milk, all served over ice. A perfect treat for coffee and chocolate lovers, offering a smooth and satisfying crunch in every sip.', 'small, medium, large', 'iced', 4.90, 167, 'medium-high', 10, 49.00, '2025-04-02 13:43:47', '2025-04-02 13:43:47'),
	(8, 'Einspanner Latte', 'coffee', 'premium', '61790285.jpg', 'A bold espresso paired with chilled milk, topped with a thick layer of whipped cream, and served over ice. A rich and creamy coffee treat with a smooth, indulgent finish.', 'small, medium, large', 'iced', 4.70, 92, 'medium', 10, 49.00, '2025-04-02 13:43:47', '2025-04-02 13:43:47'),
	(9, 'Matcha Latte', 'matcha', 'ceremonial grade', '61790286.jpg', 'A refreshing blend of premium matcha green tea and creamy milk, served over ice. Smooth, earthy, and naturally energizing.', 'small, medium, large', 'iced', 4.60, 128, 'medium', 10, 49.00, '2025-04-02 13:43:47', '2025-04-02 13:43:47'),
	(10, 'Merry Matcha', 'matcha', 'ceremonial grade', '61790287.jpg', 'A refreshing blend of premium matcha green tea and creamy milk, served over ice and topped with a velvety layer of foam.', 'small, medium, large', 'iced', 4.50, 86, 'medium', 10, 49.00, '2025-04-02 13:43:47', '2025-04-02 13:43:47'),
	(11, 'Strawberry Matcha', 'matcha', 'premium blend', '61790288.jpg', 'A delightful fusion of sweet strawberry, earthy matcha green tea, and creamy milk, served over ice. A vibrant and refreshing treat with layers of flavor.', 'small, medium, large', 'iced', 4.80, 112, 'medium', 10, 49.00, '2025-04-02 13:43:47', '2025-04-02 13:43:47'),
	(12, 'Matcha Espresso', 'matcha', 'premium blend', '61790289.jpg', 'A bold combination of smooth espresso and rich matcha green tea, blended with creamy milk and served over ice. A perfect balance of earthy and energizing flavors for a refreshing boost.', 'small, medium, large', 'iced', 4.70, 94, 'high', 10, 49.00, '2025-04-02 13:43:47', '2025-04-02 13:43:47'),
	(13, 'Ube Taro', 'milk', 'signature', '61790290.jpg', 'A creamy and refreshing blend of sweet ube and taro, mixed with smooth milk and served over ice. A deliciously vibrant drink with a unique, nutty flavor and a hint of sweetness.', 'small, medium, large', 'iced', 4.90, 143, 'none', 10, 49.00, '2025-04-02 13:43:47', '2025-04-02 13:43:47'),
	(14, 'Strawberry', 'milk', 'classic', '61790291.jpg', 'A sweet and creamy blend of fresh strawberry jam and smooth milk, served over ice.', 'small, medium, large', 'iced', 4.60, 109, 'none', 10, 49.00, '2025-04-02 13:43:47', '2025-04-02 13:43:47'),
	(15, 'Dark Cocoa', 'milk', 'premium', '61790292.jpg', 'A rich and indulgent blend of smooth dark cocoa and creamy milk, served over ice. A refreshing, chocolatey treat with a deep, velvety flavor.', 'small, medium, large', 'iced', 4.70, 126, 'low', 10, 49.00, '2025-04-02 13:43:47', '2025-04-02 13:43:47'),
	(17, 'Pink Lychee', 'juice', 'signature', '61790294.jpg', 'A refreshing mix of tangy lemonade and sweet lychee, served over ice. This vibrant, fruity drink offers a perfect balance of sweetness and citrus, making it a refreshing and exotic treat.', 'small, medium, large', 'iced', 4.70, 98, 'none', 10, 39.00, '2025-04-02 13:43:47', '2025-04-02 13:43:47'),
	(18, 'Purple Lemonade', 'juice', 'signature', '61790295.jpg', 'A refreshing and tangy blend of zesty lemon and vibrant red tea, served over ice.', 'small, medium, large', 'iced', 4.60, 87, 'low', 10, 39.00, '2025-04-02 13:43:47', '2025-04-02 13:43:47'),
	(19, 'Creamy Cocoa', 'hot', 'premium', '61790278.jpg', 'A rich and velvety blend of smooth cocoa and creamy milk, perfectly heated to offer a warm and indulgent treat. A comforting drink that is sweet, chocolaty, and irresistibly cozy.', 'small, medium, large', 'hot', 4.80, 112, 'low', 10, 39.00, '2025-04-02 13:43:47', '2025-04-02 13:43:47'),
	(20, 'Cappuccino', 'hot', 'premium', '61790296.jpg', 'A classic espresso-based drink with equal parts rich espresso, creamy steamed milk, and light foam on top. A smooth, balanced, and aromatic coffee.', 'small, medium, large', 'hot', 4.70, 145, 'medium-high', 10, 39.00, '2025-04-02 13:43:47', '2025-04-02 13:43:47');

-- Dumping structure for table isladelcafecarcar.tblusers
CREATE TABLE IF NOT EXISTS `tblusers` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text,
  `city` varchar(50) DEFAULT NULL,
  `zipcode` varchar(10) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table isladelcafecarcar.tblusers: ~0 rows (approximately)
INSERT IGNORE INTO `tblusers` (`user_id`, `first_name`, `last_name`, `email`, `password`, `phone`, `address`, `city`, `zipcode`, `status`, `created_at`, `updated_at`) VALUES
	(1, 'Jade Ivan', 'Bringcola', 'naviedaj567@gmail.com', '$2y$10$qKd2wxPn2BEe71wM8GY6deSaD5qZzhselJL9bzE0XBXAvbamPD8l6', '09460945946', 'Pandan Sibonga Cebu', 'Cebu', '6020', 'active', '2025-03-30 19:53:09', '2025-03-30 19:53:09'),
	(2, 'Jade Ivan', 'Bringcola', 'naviedaj001@gmail.com', '$2y$10$drfxZcaOZ4kHBBsEpC9P0OOXU2I4gHQ3ktk1Vd90RbAJsRkQZQg0a', '09460945946', 'Pandan Sibonga Cebu', 'Cebu', '6020', 'active', '2025-04-04 18:51:33', '2025-04-04 18:51:33'),
	(3, 'bannie', 'happy', 'naviedaj002@gmail.com', '$2y$10$dROfqsldAoMpeFE7ZEVueecS/Z6vSS6YBPn1dBtRl2nTa0U9zLwYK', '09460945946', 'Pandan Sibonga Cebu', 'Cebu', '6020', 'active', '2025-04-04 19:01:06', '2025-04-04 19:01:06'),
	(4, 'bani', 'jade', 'ivanjade567@gmail.com', '$2y$10$Ifqfdo9qpoANmZjdQtB5kOCAdFY8rueaNa4UYxCN44JQVIsLb0IAG', '09123456789', '6020', 'Cebu', '8703', 'active', '2025-04-04 19:16:56', '2025-04-04 19:16:56'),
	(5, 'Jade Ivan', 'Bringcola', 'naviedaj111@gmail.com', '$2y$10$6zG9c4pNWMGga3KwrWAopu9gTpOqMliCAYVESki/M7ymRiDE85D/.', '09460945946', 'Pandan Sibonga Cebu', 'Cebu', '6020', 'active', '2025-04-04 19:28:44', '2025-04-04 19:28:44');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
