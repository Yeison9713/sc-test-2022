<?php
$_sesion = $_POST['llave'];
$_detalles_hc = array(
    $_POST['enfer_act_hc'],
    $_POST['exagen_hc'],
    $_POST['ant_famil_hc'],
    $_POST['ant_medi_hc'],
    $_POST['ant_hemor_hc'],
    $_POST['ant_quiru_hc'],
    $_POST['ant_toxi_hc'],
    $_POST['ant_traum_hc'],
    $_POST['ant_ginec_hc'],
    $_POST['analisis_hc'],
    $_POST['observaciones_hc']);

$nombre_archivo = 'C:\\PROSOFT\\TEMP\\DETALLES_HC-' . $_sesion . '.txt';
$_retornar = true;
$_retornar_msj = true;

$datos_hc = [];

$indices = [
    'ENFERMEDAD-ACT-HC   ',
    'EXAGENERAL-HC       ',
    'ANT-FAMILIARES-HC   ',
    'ANT-MEDICOS-HC      ',
    'ANT-HEMOR-HC        ',
    'ANT-QUIRURGICOS-HC  ',
    'ANT-TRAUMATICOS-HC  ',
    'ANT-TOXICOS-HC      ',
    'ANT-GINEC-HC        ',
    'ANALISIS-HC         ',
    'OBSERVACIONES-HC    '];

//Valida si existe el archivo
if (file_exists($nombre_archivo)) {
    if (!unlink($nombre_archivo)) {
        $_retornar = false;
        $_retornar_msj = 'Ha ocurrido un error eliminando el archivo: ' . $nombre_archivo;
    }
}

//Valida que el array de datos no este vacio
if ($_detalles_hc != 'false') {
//Pasa array asociativo a array unidmensional
    foreach ($_detalles_hc as $indice => $valor) {
        array_push($datos_hc, $valor);
    }
//Verifica si se puede abrir el archivo
    if (!$fp = fopen($nombre_archivo, 'a')) {
        $_retornar = false;
        $_retornar_msj = 'Ha ocurrido un error abriendo el archivo ' . $nombre_archivo;
    } else {

        for ($i = 0; $i < count($datos_hc); $i++) {
            $arr = $datos_hc[$i];
            $arr = mb_ereg_replace("[\n|\r|\n\r|\t|\0|\x0B]", "", $arr);
            fwrite($fp, $indices[$i] . $arr . PHP_EOL);
        }

        if (!$_retornar) {
            $_retornar_msj = 'Ha ocurrido un error al crear el archivo: ' . $nombre_archivo;
        }
    }
}
if ($_retornar) {
    echo '00|';
} else {
    echo '99|' . $_retornar_msj;
}
