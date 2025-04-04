<?php
session_start();
include 'dbconn.php'; // Include your database connection file

// Get the action from the request
$action = isset($_GET['action']) ? $_GET['action'] : '';

// For preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

switch ($action) {
    case 'register':

        // Get JSON input
        $data = json_decode(file_get_contents('php://input'), true);

        if (!$data) {
            echo json_encode(['success' => false, 'message' => 'Invalid input.']);
            exit();
        }

        $first_name = $data['first_name'];
        $last_name = $data['last_name'];
        $email = $data['email'];
        $password = password_hash($data['password'], PASSWORD_DEFAULT);
        $phone = $data['phone'];
        $address = $data['address'];
        $city = $data['city'];
        $zipcode = $data['zipcode'];

        // Check if email already exists
        $checkStmt = $conn->prepare("SELECT user_id FROM tblusers WHERE email = :email");
        $checkStmt->bindParam(':email', $email);
        $checkStmt->execute();

        if ($checkStmt->rowCount() > 0) {
            echo json_encode(['success' => false, 'message' => 'Email already registered.']);
            exit();
        }

        // Prepare and execute the insert
        $stmt = $conn->prepare("INSERT INTO tblusers (first_name, last_name, email, password, phone, address, city, zipcode)
                                VALUES (:first_name, :last_name, :email, :password, :phone, :address, :city, :zipcode)");
        $stmt->bindParam(':first_name', $first_name);
        $stmt->bindParam(':last_name', $last_name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);
        $stmt->bindParam(':phone', $phone);
        $stmt->bindParam(':address', $address);
        $stmt->bindParam(':city', $city);
        $stmt->bindParam(':zipcode', $zipcode);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Registration successful!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error: Could not register user.']);
        }
        break;

    case 'login':
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Handle both form data and JSON input
            $email = isset($_POST['email']) ? $_POST['email'] : null;
            $password = isset($_POST['password']) ? $_POST['password'] : null;
            $remember_me = isset($_POST['remember_me']) ? $_POST['remember_me'] : '0';

            // If not in POST data, try JSON
            if (!$email || !$password) {
                $json_data = json_decode(file_get_contents('php://input'), true);
                if ($json_data) {
                    $email = $json_data['email'] ?? null;
                    $password = $json_data['password'] ?? null;
                    $remember_me = $json_data['remember_me'] ?? '0';
                }
            }

            if (!$email || !$password) {
                echo json_encode(['success' => false, 'message' => 'Email and password are required.']);
                exit();
            }

            $stmt = $conn->prepare("SELECT * FROM tblusers WHERE email = :email");
            $stmt->bindParam(':email', $email);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user && password_verify($password, $user['password'])) {
                // Set up session
                $_SESSION['user_id'] = $user['user_id'];
                $_SESSION['user_name'] = $user['first_name'];
                $_SESSION['user_email'] = $user['email'];

                // Generate session ID for API authentication
                $session_id = bin2hex(random_bytes(16));
                $_SESSION['session_id'] = $session_id;

                // Set session cookie lifetime if remember me is checked
                if ($remember_me === '1') {
                    // 30 days in seconds
                    $lifetime = 30 * 24 * 60 * 60;
                    session_set_cookie_params($lifetime);
                    session_regenerate_id(true);
                }

                echo json_encode([
                    'success' => true,
                    'user' => [
                        'user_id' => $user['user_id'],
                        'first_name' => $user['first_name'],
                        'email' => $user['email']
                    ],
                    'session_id' => $session_id
                ]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Invalid credentials.']);
            }
            exit();
        }
        break;

    case 'check-auth':
        // Check if user is authenticated
        if (isset($_SESSION['user_id'])) {
            echo json_encode([
                'success' => true,
                'user' => [
                    'user_id' => $_SESSION['user_id'],
                    'first_name' => $_SESSION['user_name'],
                    'email' => $_SESSION['user_email']
                ]
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Not authenticated']);
        }
        break;

    case 'logout':
        // Destroy the session
        session_unset();
        session_destroy();
        echo json_encode(['success' => true, 'message' => 'Logged out successfully']);
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Invalid action']);
        break;
}

$conn = null; // Close the database connection
?>
