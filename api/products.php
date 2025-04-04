<?php
require_once "dbconn.php";
// SQL query to select the desired columns - updated to use tblproducts and include review_count
$sql = "SELECT id, name, price, original_price, category, category_quality, image, description, default_size, default_temperature, rating, review_count, caffeine
FROM tblproducts";

try {
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    // Fetch all records as an associative array
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Set the content type to application/json
    header('Content-Type: application/json');

    // Encode the $products array to JSON and output it
    echo json_encode($products);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Query failed: " . $e->getMessage()]);
}
?>
