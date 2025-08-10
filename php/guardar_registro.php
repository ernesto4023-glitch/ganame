<?php
$datos = json_decode(file_get_contents("php://input"), true);
$archivo = __DIR__ . "/../datos/registros.json";

if (!file_exists($archivo)) {
  file_put_contents($archivo, json_encode([]));
}

$registros = json_decode(file_get_contents($archivo), true);

// Asignar números automáticos
$ocupados = [];
foreach ($registros as $r) {
  $ocupados = array_merge($ocupados, explode(",", $r["numeros"]));
}
$ocupados = array_map("trim", $ocupados);

$nuevos = [];
$num = 1;
while (count($nuevos) < intval($datos["cantidad"])) {
  if (!in_array((string)$num, $ocupados)) {
    $nuevos[] = (string)$num;
  }
  $num++;
}

$datos["numeros"] = implode(",", $nuevos);
$datos["estado"] = "En espera";

$registros[] = $datos;
file_put_contents($archivo, json_encode($registros));

echo json_encode(["ok" => true]);
