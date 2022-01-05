// 10-09-2020 - IMPRESION ESCALA DE KARNOFSKY - DAVID.M - HICLIN

$_KARNOF = [];

$_KARNOF.datos = {
    encabezado: {
        nombre: '',
        nit: '',
        titulo: 'ESCALA DE KARNOFSKY',
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

    tabla: {
        capaz: {
            grado1: '',
            grado2: '',
            grado3: ''
        },
        incapazTrabajar: {
            grado1: '',
            grado2: '',
            grado3: ''
        },
        incapazCuidarse: {
            grado1: '',
            grado2: '',
            grado3: '',
            grado4: ''
        },
    },

    total: {
        fecha: '',
        puntuacion: '',
        tipoDep: ''
    },

    medico: {
        nombre: '',
        espec: '',
        reg: '',
        firma: ''
    }
}

async function _iniciarKarnof(rec, opciones, dataBase64) {
    $_KARNOF._unserv = rec._unserv;
    $_KARNOF._prof = rec._prof;
    $_KARNOF._ciudad = rec._ciudad;
    $_KARNOF._ocup = rec._ocup;
    $_KARNOF._entidad = rec._entidad;
    $_KARNOF._hcprc = rec._hcprc;
    $_KARNOF._detalles = rec._detalles;
    $_KARNOF._paci = rec._paci;
    $_KARNOF._espec = rec._espec;
    $_KARNOF.opciones = opciones;

    $_KARNOF.dato_9006 = $_KARNOF._detalles.find(e => e['COD-DETHC'] == '9006' && e['LLAVE-HC'] == $_KARNOF._hcprc.llave);
    $_KARNOF.dato_9006 != undefined ? $_KARNOF.dato_9006 = $_KARNOF.dato_9006.DETALLE : false;

    // LLENAR ENCABEZADO

    $_KARNOF.datos.encabezado.nombre = $_USUA_GLOBAL[0].NOMBRE;

    $_KARNOF.nit_usu = $_USUA_GLOBAL[0].NIT;
    $_KARNOF.datos.encabezado.nit = $_KARNOF.nit_usu;

    // LLENAR DATOS PACIENTE

    $_KARNOF.datos.paciente.nombre = $_KARNOF._paci.DESCRIP.replace(/\s+/g, ' ');
    $_KARNOF.datos.paciente.tipoId = $_KARNOF._paci['TIPO-ID'];
    isNaN($_KARNOF._paci.COD) == true ? aux = $_KARNOF._paci.COD : aux = new Intl.NumberFormat("ja-JP").format($_KARNOF._paci.COD);
    $_KARNOF.datos.paciente.id = aux;
    $_KARNOF.datos.paciente.edad = $_KARNOF._hcprc.edad;
    $_KARNOF._paci.SEXO == 'F' ? $_KARNOF.datos.paciente.sexo = 'Femenino' : $_KARNOF.datos.paciente.sexo = 'Masculino';
    $_KARNOF.datos.paciente.fecha = $_KARNOF._hcprc.fecha.substring(6, 8) + '-' + $_KARNOF._hcprc.fecha.substring(4, 6) + '-' + $_KARNOF._hcprc.fecha.substring(0, 4);
    $_KARNOF.datos.paciente.hora = $_KARNOF._hcprc.hora.substring(0, 2) + ':' + $_KARNOF._hcprc.hora.substring(2, 4);

    $_KARNOF.datos.paciente.municipio = $_KARNOF._ciudad.NOMBRE.replace(/\s+/g, ' ');
    $_KARNOF.datos.paciente.telefono = $_KARNOF._paci.TELEFONO;

    // LLENAR TABLA

    switch ($_KARNOF.dato_9006.actividad_normal_9006) {
        case '1':
            $_KARNOF.datos.tabla.capaz.grado1 = 'X';
            $_KARNOF.datos.tabla.capaz.grado2 = '90';
            $_KARNOF.datos.tabla.capaz.grado3 = '80';
            break;
        case '2':
            $_KARNOF.datos.tabla.capaz.grado1 = '100';
            $_KARNOF.datos.tabla.capaz.grado2 = 'X';
            $_KARNOF.datos.tabla.capaz.grado3 = '80';
            break;
        case '3':
            $_KARNOF.datos.tabla.capaz.grado1 = '100';
            $_KARNOF.datos.tabla.capaz.grado2 = '90';
            $_KARNOF.datos.tabla.capaz.grado3 = 'X';
            break;
        default:
            $_KARNOF.datos.tabla.capaz.grado1 = '100';
            $_KARNOF.datos.tabla.capaz.grado2 = '90';
            $_KARNOF.datos.tabla.capaz.grado3 = '80';
            break;
    }

    switch ($_KARNOF.dato_9006.incapaz_trabajar_9006) {
        case '1':
            $_KARNOF.datos.tabla.incapazTrabajar.grado1 = 'X';
            $_KARNOF.datos.tabla.incapazTrabajar.grado2 = '60';
            $_KARNOF.datos.tabla.incapazTrabajar.grado3 = '50';
            break;
        case '2':
            $_KARNOF.datos.tabla.incapazTrabajar.grado1 = '70';
            $_KARNOF.datos.tabla.incapazTrabajar.grado2 = 'X';
            $_KARNOF.datos.tabla.incapazTrabajar.grado3 = '50';
            break;
        case '3':
            $_KARNOF.datos.tabla.incapazTrabajar.grado1 = '70';
            $_KARNOF.datos.tabla.incapazTrabajar.grado2 = '60';
            $_KARNOF.datos.tabla.incapazTrabajar.grado3 = 'X';
            break;
        default:
            $_KARNOF.datos.tabla.incapazTrabajar.grado1 = '70';
            $_KARNOF.datos.tabla.incapazTrabajar.grado2 = '60';
            $_KARNOF.datos.tabla.incapazTrabajar.grado3 = '50';
            break;
    }

    switch ($_KARNOF.dato_9006.incapaz_cuidarse_9006) {
        case '1':
            $_KARNOF.datos.tabla.incapazCuidarse.grado1 = 'X';
            $_KARNOF.datos.tabla.incapazCuidarse.grado2 = '20';
            $_KARNOF.datos.tabla.incapazCuidarse.grado3 = '10';
            $_KARNOF.datos.tabla.incapazCuidarse.grado4 = '0';
            break;
        case '2':
            $_KARNOF.datos.tabla.incapazCuidarse.grado1 = '30';
            $_KARNOF.datos.tabla.incapazCuidarse.grado2 = 'X';
            $_KARNOF.datos.tabla.incapazCuidarse.grado3 = '10';
            $_KARNOF.datos.tabla.incapazCuidarse.grado4 = '0';
            break;
        case '3':
            $_KARNOF.datos.tabla.incapazCuidarse.grado1 = '30';
            $_KARNOF.datos.tabla.incapazCuidarse.grado2 = '20';
            $_KARNOF.datos.tabla.incapazCuidarse.grado3 = 'X';
            $_KARNOF.datos.tabla.incapazCuidarse.grado4 = '0';
            break;
        case '4':
            $_KARNOF.datos.tabla.incapazCuidarse.grado1 = '30';
            $_KARNOF.datos.tabla.incapazCuidarse.grado2 = '20';
            $_KARNOF.datos.tabla.incapazCuidarse.grado3 = '10';
            $_KARNOF.datos.tabla.incapazCuidarse.grado4 = 'X';
            break;
        default:
            $_KARNOF.datos.tabla.incapazCuidarse.grado1 = '30';
            $_KARNOF.datos.tabla.incapazCuidarse.grado2 = '20';
            $_KARNOF.datos.tabla.incapazCuidarse.grado3 = '10';
            $_KARNOF.datos.tabla.incapazCuidarse.grado4 = '0';
            break;
    }

    // LLENAR TOTAL TABLA

    $_KARNOF.datos.total.fecha = $_KARNOF._hcprc.fecha.substring(6, 8) + '-' + $_KARNOF._hcprc.fecha.substring(4, 6) + '-' + $_KARNOF._hcprc.fecha.substring(0, 4);
    $_KARNOF.datos.total.puntuacion = calcularKarnof();
    calc = parseFloat($_KARNOF.datos.total.puntuacion);

    calc >= 51 && calc <= 100 ? $_KARNOF.datos.total.tipoDep = 'EXPECTATIVA DE VIDA MAYOR A 6 MESES' : false;
    calc >= 0 && calc <= 50 ? $_KARNOF.datos.total.tipoDep = 'ALTO GRADO DE MUERTE EN LOS 6 MESES SIGUIENTES' : false;

    // LLENAR INFO MEDICO

    $_KARNOF.datos.medico.nombre = $_KARNOF._prof.NOMBRE;

    var res = $_KARNOF._espec.find(e => e.CODIGO == $_KARNOF._prof.TAB_ESPEC[0].COD);
    if (res != undefined) {
        $_KARNOF.datos.medico.espec = res.NOMBRE;
    }

    $_KARNOF.datos.medico.reg = $_KARNOF._prof.REG_MEDICO;
    $_KARNOF.datos.medico.firma = parseFloat($_KARNOF._prof.IDENTIFICACION);

    if ($_KARNOF.opciones.opc_resu == 'S') {
        await _impresion2({
            tipo: 'pdf',
            archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmssS') + '-kar'}.pdf`,
            content: _imprimirKarnof($_KARNOF.datos),
            retornar: true
        }).then(async data => {
            console.log(data, 'Impresión terminada')
            $_HCI01.dataBase64.push(data);
        }).catch((err) => {
            console.error(err);
        });
    } else {
        await _impresion2({
            tipo: 'pdf',
            archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmssS') + '-kar'}.pdf`,
            content: _imprimirKarnof($_KARNOF.datos),
        }).then(async data => {
            console.log('Impresión terminada')
        }).catch((err) => {
            console.error(err);
        });
    }

    return dataBase64;
}

function calcularKarnof() {
    aux = 0;

    switch ($_KARNOF.dato_9006.actividad_normal_9006) {
        case '1': aux = aux + 100; break;
        case '2': aux = aux + 90; break;
        case '3': aux = aux + 80; break;
    }

    switch ($_KARNOF.dato_9006.incapaz_trabajar_9006) {
        case '1': aux = aux + 70; break;
        case '2': aux = aux + 60; break;
        case '3': aux = aux + 50; break;
    }

    switch ($_KARNOF.dato_9006.incapaz_cuidarse_9006) {
        case '1': aux = aux + 30; break;
        case '2': aux = aux + 20; break;
        case '3': aux = aux + 10; break;
        case '4': aux = aux + 0; break;
    }

    return aux.toString();
}