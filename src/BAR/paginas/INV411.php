<?php 
    $ruta_bat = $_POST["RUTA-BAT"];
    $ruta_pdf = $_POST["RUTA-PDF"];

    exec($ruta_bat); 
    echo "El comentario que quieras."; 
    echo $ruta_pdf;
    echo $ruta_bat;
    header('Content-type: application/pdf');
    header('Content-Disposition: inline; filename="'. $ruta_pdf.'"');
    readfile($ruta_pdf);
?> 