<?php
header('Content-Type: application/json');
// Conexão com o banco de dados
$host = "localhost"; // MySQL Host Name
$user = "root"; // MySQL User Name
$password = ""; // MySQL password
$database = "if0_37568760_projectb"; // MySQL DB Name

// Criando a conexão
$conn = new mysqli($host, $user, $password, $database);

// Verifica a conexão
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Erro de conexão: ' . $conn->connect_error]);
    exit();
}

// Recebendo valores do JS
$data = json_decode(file_get_contents('php://input'), true);
$user = $data['user'] ?? ''; // Recupera o nome de usuário
$pass = $data['pass'] ?? ''; // Recupera a senha do usuário

// Prepara a consulta
$query = $conn->prepare("SELECT `id` FROM `admin`
    WHERE (nome_usuario = ? OR email = ?) AND senha = ?
    UNION
    SELECT `id` FROM `usuarios`
    WHERE (nome_usuario = ? OR email = ?) AND senha = ?");
$query->bind_param("ssssss", $user, $user, $pass, $user, $user, $pass); // 's' indica que é uma string
$query->execute();  
$result = $query->get_result();

// Verifica se o usuário existe
if ($result->num_rows > 0) {
    echo json_encode(['success' => true, 'message' => 'Usuário encontrado.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Usuário não encontrado.']);
}

// Fecha a consulta e a conexão
$query->close();
$conn->close();
?>