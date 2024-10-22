<?php
$host = "sql102.byetcluster.com"; // MySQL Host Name
$user = "if0_37568760"; // MySQL User Name
$password = "Bia557087"; // Substitua "sua_senha_vPanel" pela senha do vPanel
$database = "if0_37568760_projectb"; // MySQL DB Name

// Criando a conexão
$conn = new mysqli($host, $user, $password, $database);

// Verificando a conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
} else {
    echo "Conexão bem-sucedida!";
}
?>