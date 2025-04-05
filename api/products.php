<?php
require_once "dbconn.php";

// Check if product_id is provided in the request
$product_id = isset($_GET['product_id']) ? $_GET['product_id'] : null;

if ($product_id) {
    // Query for a single product
    $sql = "SELECT * FROM tblproducts WHERE product_id = :product_id";
    try {
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':product_id', $product_id, PDO::PARAM_INT);
        $stmt->execute();
        $product = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($product) {
            echo json_encode($product);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Product not found"]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Query failed: " . $e->getMessage()]);
    }
} else {
    // Query for all products
    $sql = "SELECT * FROM tblproducts";
    try {
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($products);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Query failed: " . $e->getMessage()]);
    }
}
?>
