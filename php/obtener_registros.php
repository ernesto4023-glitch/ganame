<?php
$archivo = __DIR__ . "/../datos/registros.json";
if (!file_exists($archivo)) {
  file_put_contents($archivo, json_encode([]));
}
echo file_get_contents($archivo);
