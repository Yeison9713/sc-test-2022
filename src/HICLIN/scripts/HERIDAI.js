// 13-09-2020 - IMPRESION TEST DE HERIDAS- DAVID.M - HICLIN

$_HERIDAI = [];

$_HERIDAI.datos = {
    encabezado: {
        nombre: '',
        nit: '',
        titulo: 'FORMATO DE ESCALA DE HERIDAS',
    },

    paciente: {
        nombre: '',
        tipoId: '',
        id: '',
        edad: '',
        sexo: '',
        fecha: '',
        hora: '',
        municipio: '',
        telefono: ''
    },

    acumulado1: '',
    acumulado2: '',
    acumulado3: '',
    acumulado4: '',
    acumulado5: '',
    acumulado6: '',
    acumulado7: '',
    acumulado8: '',
    totalAcumulado: '',
    escala: 1,

    medico: {
        nombre: '',
        espec: '',
        reg: '',
        firma: ''
    }
}

async function _iniciarHerida(rec, opciones, dataBase64) {
    console.log('llega a heridas imp')
    $_HERIDAI._unserv = rec._unserv;
    $_HERIDAI._prof = rec._prof;
    $_HERIDAI._ciudad = rec._ciudad;
    $_HERIDAI._ocup = rec._ocup;
    $_HERIDAI._entidad = rec._entidad;
    $_HERIDAI._hcprc = rec._hcprc;
    $_HERIDAI._detalles = rec._detalles;
    $_HERIDAI._paci = rec._paci;
    $_HERIDAI._espec = rec._espec;
    $_HERIDAI.opciones = opciones;

    $_HERIDAI.dato_9009 = $_HERIDAI._detalles.find(e => e['COD-DETHC'] == '9009' && e['LLAVE-HC'] == $_HERIDAI._hcprc.llave);
    $_HERIDAI.dato_9009 != undefined ? $_HERIDAI.dato_9009 = $_HERIDAI.dato_9009.DETALLE : false;

    // LLENAR ENCABEZADO

    $_HERIDAI.datos.encabezado.nombre = $_USUA_GLOBAL[0].NOMBRE;

    $_HERIDAI.nit_usu = $_USUA_GLOBAL[0].NIT;
    $_HERIDAI.datos.encabezado.nit = $_HERIDAI.nit_usu;

    // LLENAR DATOS PACIENTE

    $_HERIDAI.datos.paciente.nombre = $_HERIDAI._paci.DESCRIP.replace(/\s+/g, ' ');
    $_HERIDAI.datos.paciente.tipoId = $_HERIDAI._paci['TIPO-ID'];
    isNaN($_HERIDAI._paci.COD) == true ? aux = $_HERIDAI._paci.COD : aux = new Intl.NumberFormat("ja-JP").format($_HERIDAI._paci.COD);
    $_HERIDAI.datos.paciente.id = aux;
    $_HERIDAI.datos.paciente.edad = $_HERIDAI._hcprc.edad;
    $_HERIDAI._paci.SEXO == 'F' ? $_HERIDAI.datos.paciente.sexo = 'Femenino' : $_HERIDAI.datos.paciente.sexo = 'Masculino';
    $_HERIDAI.datos.paciente.fecha = $_HERIDAI._hcprc.fecha.substring(6, 8) + '-' + $_HERIDAI._hcprc.fecha.substring(4, 6) + '-' + $_HERIDAI._hcprc.fecha.substring(0, 4);
    $_HERIDAI.datos.paciente.hora = $_HERIDAI._hcprc.hora.substring(0, 2) + ':' + $_HERIDAI._hcprc.hora.substring(2, 4);
    $_HERIDAI.datos.paciente.municipio = $_HERIDAI._ciudad.NOMBRE.replace(/\s+/g, ' ');
    $_HERIDAI.datos.paciente.telefono = $_HERIDAI._paci.TELEFONO;

    // LLENAR ACUMULADOS

    switch ($_HERIDAI.dato_9009.clasif_heri) {
        case '1':
            $_HERIDAI.datos.acumulado1 = '1';
            break;
        case '2':
            $_HERIDAI.datos.acumulado1 = '2';
            break;
        case '3':
            $_HERIDAI.datos.acumulado1 = '3';
            break;
    }

    switch ($_HERIDAI.dato_9009.dimension_heri) {
        case '1':
            $_HERIDAI.datos.acumulado2 = '0';
            break;
        case '2':
            $_HERIDAI.datos.acumulado2 = '1';
            break;
        case '3':
            $_HERIDAI.datos.acumulado2 = '2';
            break;
        case '4':
            $_HERIDAI.datos.acumulado2 = '3';
            break;
        case '5':
            $_HERIDAI.datos.acumulado2 = '4';
            break;
        case '6':
            $_HERIDAI.datos.acumulado2 = '5';
            break;
    }

    switch ($_HERIDAI.dato_9009.profun_tejid) {
        case '1':
            $_HERIDAI.datos.acumulado3 = '0';
            break;
        case '2':
            $_HERIDAI.datos.acumulado3 = '1';
            break;
        case '3':
            $_HERIDAI.datos.acumulado3 = '2';
            break;
        case '4':
            $_HERIDAI.datos.acumulado3 = '3';
            break;
        case '5':
            $_HERIDAI.datos.acumulado3 = '4';
            break;
    }

    switch ($_HERIDAI.dato_9009.comorbilidad) {
        case '1':
            $_HERIDAI.datos.acumulado4 = '0';
            break;
        case '2':
            $_HERIDAI.datos.acumulado4 = '2';
            break;
        case '3':
            $_HERIDAI.datos.acumulado4 = '3';
            break;
    }

    switch ($_HERIDAI.dato_9009.estadio_heri) {
        case '1':
            $_HERIDAI.datos.acumulado5 = '1';
            break;
        case '2':
            $_HERIDAI.datos.acumulado5 = '2';
            break;
        case '3':
            $_HERIDAI.datos.acumulado5 = '3';
            break;
        case '4':
            $_HERIDAI.datos.acumulado5 = '4';
            break;
    }

    switch ($_HERIDAI.dato_9009.infeccion) {
        case '1':
            $_HERIDAI.datos.acumulado6 = '0';
            break;
        case '2':
            $_HERIDAI.datos.acumulado6 = '3';
            break;
    }

    switch ($_HERIDAI.dato_9009.tiempo_evolu) {
        case '1':
            $_HERIDAI.datos.acumulado7 = '1';
            break;
        case '2':
            $_HERIDAI.datos.acumulado7 = '2';
            break;
        case '3':
            $_HERIDAI.datos.acumulado7 = '3';
            break;
        case '4':
            $_HERIDAI.datos.acumulado7 = '4';
            break;
    }

    switch ($_HERIDAI.dato_9009.registro_foto) {
        case '1':
            $_HERIDAI.datos.acumulado8 = '1';
            break;
        case '2':
            $_HERIDAI.datos.acumulado8 = '2';
            break;
        case '3':
            $_HERIDAI.datos.acumulado8 = '4';
            break;
    }

    // LLENAR TOTAL

    $_HERIDAI.datos.totalAcumulado = calcularHerida();

    calc = parseFloat($_HERIDAI.datos.totalAcumulado);

    calc >= 0 && calc <= 12 ? $_HERIDAI.datos.escala = 3 : false;
    calc >= 13 && calc <= 22 ? $_HERIDAI.datos.escala = 2 : false;
    calc >= 23 && calc <= 30 ? $_HERIDAI.datos.escala = 1 : false;

    // LLENAR INFO MEDICO

    $_HERIDAI.datos.medico.nombre = $_HERIDAI._prof.NOMBRE;

    var res = $_HERIDAI._espec.find(e => e.CODIGO == $_HERIDAI._prof.TAB_ESPEC[0].COD);
    if (res != undefined) {
        $_HERIDAI.datos.medico.espec = res.NOMBRE;
    }

    $_HERIDAI.datos.medico.reg = $_HERIDAI._prof.REG_MEDICO;
    $_HERIDAI.datos.medico.firma = parseFloat($_HERIDAI._prof.IDENTIFICACION);

    if ($_HERIDAI.opciones.opc_resu == 'S') {
        await _impresion2({
            tipo: 'pdf',
            archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmssS') + '-her'}.pdf`,
            content: _imprimirHerida($_HERIDAI.datos),
            retornar: true
        }).then(async data => {
            console.log(data, 'Impresión terminada')
            dataBase64.push(data);
        }).catch((err) => {
            console.error(err);
        });
    } else {
        await _impresion2({
            tipo: 'pdf',
            archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmssS') + '-her'}.pdf`,
            content: _imprimirHerida($_HERIDAI.datos),
        }).then(async data => {
            console.log('Impresión terminada')
        }).catch((err) => {
            console.error(err);
        });
    }

    return dataBase64;
}

function calcularHerida() {
    aux = 0;

    switch ($_HERIDAI.dato_9009.clasif_heri) {
        case '1': aux = aux + 1; break;
        case '2': aux = aux + 2; break;
        case '3': aux = aux + 3; break;
    }

    switch ($_HERIDAI.dato_9009.dimension_heri) {
        case '1': aux = aux + 0; break;
        case '2': aux = aux + 1; break;
        case '3': aux = aux + 2; break;
        case '4': aux = aux + 3; break;
        case '5': aux = aux + 4; break;
        case '6': aux = aux + 5; break;
    }

    switch ($_HERIDAI.dato_9009.profun_tejid) {
        case '1': aux = aux + 0; break;
        case '2': aux = aux + 1; break;
        case '3': aux = aux + 2; break;
        case '4': aux = aux + 3; break;
        case '5': aux = aux + 4; break;
    }

    switch ($_HERIDAI.dato_9009.comorbilidad) {
        case '1': aux = aux + 0; break;
        case '2': aux = aux + 2; break;
        case '3': aux = aux + 3; break;
    }

    switch ($_HERIDAI.dato_9009.estadio_heri) {
        case '1': aux = aux + 1; break;
        case '2': aux = aux + 2; break;
        case '3': aux = aux + 3; break;
        case '4': aux = aux + 4; break;
    }

    switch ($_HERIDAI.dato_9009.infeccion) {
        case '1': aux = aux + 0; break;
        case '2': aux = aux + 3; break;
    }

    switch ($_HERIDAI.dato_9009.tiempo_evolu) {
        case '1': aux = aux + 1; break;
        case '2': aux = aux + 2; break;
        case '3': aux = aux + 3; break;
        case '4': aux = aux + 4; break;
    }

    switch ($_HERIDAI.dato_9009.registro_foto) {
        case '1': aux = aux + 1; break;
        case '2': aux = aux + 2; break;
        case '3': aux = aux + 4; break;
    }

    return aux.toString();
}