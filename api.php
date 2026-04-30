<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');


$host = 'mysql.nethely.hu';
$dbname = 'adatbwebbead'; 
$user = 'adatbwebbead';  
$pass = 'Admin123123';    

try {
    $dbh = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass,
                  array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));

    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
            
            $stmt = $dbh->query("SELECT * FROM pizza");
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($result);
            break;

        case 'POST':
            
            $data = json_decode(file_get_contents('php://input'), true);
            if (isset($data['nev'])) {
                $stmt = $dbh->prepare("INSERT INTO pizza (nev, kategorianev, vegetarianus) VALUES (?, ?, ?)");
                $stmt->execute([$data['nev'], $data['kategorianev'], $data['vegetarianus']]);
                echo json_encode(['status' => 'success', 'message' => 'Pizza hozzáadva']);
            }
            break;

        case 'DELETE':
            
            if (isset($_GET['id'])) {
                $stmt = $dbh->prepare("DELETE FROM pizza WHERE id = ?");
                $stmt->execute([$_GET['id']]);
                echo json_encode(['status' => 'success', 'message' => 'Pizza törölve']);
            }
            break;
            
        case 'PUT':
            
            $data = json_decode(file_get_contents('php://input'), true);
            if (isset($data['id'])) {
                $stmt = $dbh->prepare("UPDATE pizza SET nev = ?, kategorianev = ?, vegetarianus = ? WHERE id = ?");
                $stmt->execute([$data['nev'], $data['kategorianev'], $data['vegetarianus'], $data['id']]);
                echo json_encode(['status' => 'success', 'message' => 'Pizza frissítve']);
            }
            break;
    }

} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
