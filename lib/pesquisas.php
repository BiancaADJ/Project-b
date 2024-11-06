<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Permite acesso de qualquer origem
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Métodos permitidos
header('Access-Control-Allow-Headers: Content-Type'); // Cabeçalhos permitidos
// Conexão com o banco de dados
$host = "localhost"; // MySQL Host Name
$user = "root"; // MySQL User Name
$password = ""; // MySQL password
$database = "if0_37568760_projectb"; // MySQL DB Name

// Criando a conexão
$data = json_decode(file_get_contents('php://input'), true);
$action = $data['action'] ?? '';

$conn = new mysqli($host, $user, $password, $database);
// Verifica a conexão
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Erro de conexão: ' . $conn->connect_error]);
    exit();
}

switch ($action){
    case 'login':
        // Recebendo valores do JS
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
            $row = $result->fetch_assoc();
            $id = $row['id']; // retorna o 'id' no data
            echo json_encode(['success' => true, 'message' => 'Usuário encontrado.', 'id' => $id]);
        }else{
            echo json_encode(['success' => false, 'message' => 'Usuário não encontrado.']);
        }
        $query->close(); // Fecha a consulta
        break; // Adiciona o break aqui para evitar a execução do case default

    case 'showPosition':
        // recebendo valores
        $posicao = $data['posicao'] ?? ''; // recupera localizacao
        $id = $data['id'] ?? ''; // recupera ID local

        // prepara a modificação
        $query = $conn->prepare("UPDATE `usuarios` 
        SET `localizacao` = ?
        WHERE id = ?");
        $query->bind_param("si", $posicao, $id);
        $query->execute();

        if($query->affected_rows > 0){ //verifica se alguma linha foi alterada
            echo json_encode(['success' => true, 'message' => 'Modificação sucedida.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Nenhuma alteração foi feita. Verifique o ID ou se o valor é igual ao atual.']);
        }
        $query->close();
        break;
        
    default:
        echo json_encode(['success' => false, 'message' => 'Ação não reconhecida.']);
}

// Fecha a conexão com o banco de dados
$conn->close();
?>
