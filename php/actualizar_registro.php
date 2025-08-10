<?php
header('Content-Type: application/json');

$archivo = __DIR__ . '/../datos/registro.json';
$registros = json_decode(file_get_contents("php://input"), true);

if (!$registros) {
    echo json_encode(["success" => false, "error" => "Datos inválidos"]);
    exit;
}

// Guardar cambios
file_put_contents($archivo, json_encode($registros, JSON_PRETTY_PRINT));

echo json_encode(["success" => true]);
?>
