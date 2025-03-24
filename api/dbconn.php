<?php

// Set CORS headers
header("Access-Control-Allow-Origin: http://localhost:5173/"); // Allow your React app's origin
header("Content-Type: application/json; charset=UTF-8");
// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");


// Database connection parameters
$host = 'localhost'; // Your database host (usually localhost)
$dbname = 'isladelcafe'; // The name of your database
$user = 'root'; // Database username
$password = ''; // Database password

// For OPTIONS preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit;
}

try {
    // Create a new PDO instance
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $password);

    // Set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Don't echo success message here as it would break JSON responses in other files
} catch (PDOException $e) {
    // If there's an error, return it as JSON
    http_response_code(500); // Set appropriate error status code
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    exit();
}
?>
