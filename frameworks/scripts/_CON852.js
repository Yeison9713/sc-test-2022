/* global msjProsoft */

function msjError_con852(error) {
    var msj;
    switch (error) {
        case "01": msj = " Usted adquirio! una version del programa restringida. Supera el numero de comprobantes Comuniquese con PROSOFT SAS ";
            break;
        case "02": msj = " El visualizador de listados soporta solo hasta 500 paginas. Su archivo supera este numero pero solo mostraremos en pantalla las primeras 30.000 lineas ";
            break;
        case "10": msj = " Intento seguir leyendo un archivo que llego a su fin. Informe al programador ";
            break;
        case "22": msj = " Intento escribir en una secuencia que ya existe! ";
            break;
        case "30": msj = " No se pudo accesar el archivo. El problema es de hardware, revise conexiones de RED, Impresoras o espacio disponible en disco duro ";
            break;
        case "35": msj = " No existe el archivo ";
            break;
        case "37": msj = " No tiene acceso al hardware. El disco duro no esta compartido o el archivo esta protejido con atributos o la impresora no esta disponible ";
            break;
        case "39": msj = " La estructura del archivo cambio. Es posible que se trate de un daño en el archivo o que el archivo sea de una version anterior y requiera actualizar ";
            break;
        case "41": msj = " Intento abrir  un archivo que ya se habia abierto. Este error puede ser consecuencia de un error anterior o un error de programacion sin consecuencias ";
            break;
        case "42": msj = " Intento cerrar un archivo que no se habia abierto. Este error puede ser consecuencia de un error anterior o un error de programacion sin consecuencias ";
            break;
        case "47": msj = " Error de programacion. Se intento cerrar un archivo que No estaba abierto. Informe este error y la opcion al soporte tecnico Prosoft ";
            break;
        case "48": msj = " Intento leer en un archivo que no se habia abierto. Este error es consecuencia de otro error, para solucionar el problema basese en el primer mensaje ";
            break;
        case "90": msj = " Se intento crear un archivo que esta siendo utilizado por otro usuario o por usted mismo en otra ventana ";
            break;
        case "91": msj = " Archivo abierto previamente, Por favor Reporte a Prosoft ";
            break;
        case "93": msj = " Se intento borrar o modificar un registro que esta ocupado por otro usuario o por usted mismo en otra ventana ";
            break;
        case "98": msj = " Daño en las llaves del archivo causado por fallas de luz o caidas. Reinicie el servidor, salga al DOS ubiquese en el directorio y corra LUZ-XXX segun el archivo dañado";
            break;
        case "99": msj = " No se pudo leer o escribir un registro porque esta siendo usado por otro usuario en este momento";
            break;
        case "BD": msj = " Ha ocurrido un error consultando la base de datos, consulte al asesor ";
            break;
        default:
            msj = error;
            break;
    }

    return msj;
}
