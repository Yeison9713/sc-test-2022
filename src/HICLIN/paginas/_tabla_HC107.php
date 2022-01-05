<?php
$_NOMBREARCHIVO = $_POST['nombre_archivo'];
$_RENGOMACROEVOL = $_POST['rengmacroevol'];
$_CODFORMMACROEVOL = $_POST['codformmacroevol'];
$_COMANDOSMACROEVOL = $_POST['comandosmacroevol'];
$_VIASMACROEVOL = $_POST['viasmacroevol'];
$_DIRECTORIO = 'C:\\PROSOFT\\TEMP\\' . $_NOMBREARCHIVO . '.txt';

if ($_NOMBREARCHIVO) {
    $linea = 'RENG-MACROEVOL ' . '$|' . $_RENGOMACROEVOL;
    if ($archivo = fopen($_DIRECTORIO, 'a')) {
        if (!fwrite($archivo, $linea . "\r\n")) {
            echo '99';
            echo 'Ha ocurrido un error al crear el archivo' . $_NOMBREARCHIVO;
        }
    }
    if ($_VIASMACROEVOL) {
        $linea = 'TABLAS-MACROEVOL' . '$|' . $_CODFORMMACROEVOL . '|' . $_COMANDOSMACROEVOL;
        if ($archivo = fopen($_DIRECTORIO, 'a')) {
            if (!fwrite($archivo, $linea . "\r\n")) {
                echo '99';
                echo 'Ha ocurrido un error al crear el archivo' . $_NOMBREARCHIVO;
            }
        }
    } else {
        $linea = 'TABLAS-MACROEVOL ' . '$|' . $_CODFORMMACROEVOL . '|' . $_COMANDOSMACROEVOL . '|' . $_VIASMACROEVOL;
        if ($archivo = fopen($_DIRECTORIO, 'a')) {
            if (!fwrite($archivo, $linea . "\r\n")) {
                echo '99';
                echo 'Ha ocurrido un error al crear el archivo' . $_NOMBREARCHIVO;
            }
        }
    }
    fclose($archivo);
    echo "00";
} else {
    echo $_NOMBREARCHIVO;
    echo "99";
}
