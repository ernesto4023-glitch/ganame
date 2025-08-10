<?php
$datos = json_decode(file_get_contents("php://input"), true);
$archivo = __DIR__ . "/../datos/registros.json";
$registros = json_decode(file_get_contents($archivo), true);

$registros[$datos["index"]]["estado"] = $datos["estado"];
file_put_contents($archivo, json_encode($registros));
echo json_encode(["ok" => true]);
