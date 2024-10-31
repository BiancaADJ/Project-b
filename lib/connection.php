<?php
$host = "localhost"; // MySQL Host Name
$user = "root"; // MySQL User Name
$password = ""; // MySQL password
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