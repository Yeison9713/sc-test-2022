// 09-09-2020 - IMPRESION ESCALA DE BARTHEL - DAVID.M - HICLIN

$_BARTHEL = [];

$_BARTHEL.datos = {
    encabezado: {
        nombre: '',
        nit: '',
        titulo: 'ESCALA DE BARTHEL',
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
        comer: {
            ind: '',
            ayu: '',
            dep: '',
        },
        lavarse: {
            ind: '',
            dep: ''
        },
        vestirse: {
            ind: '',
            ayu: '',
            dep: ''
        },
        arreglarse: {
            ind: '',
            dep: ''
        },
        deposicion: {
            con: '',
            acc: '',
            dep: ''
        },
        miccion: {
            con: '',
            acc: '',
            dep: ''
        },
        irBano: {
            ind: '',
            ayu: '',
            dep: ''
        },
        trasladarse: {
            ind: '',
            min: '',
            gra: '',
            dep: ''
        },
        deambulacion: {
            ind: '',
            ayu: '',
            sill: '',
            dep: ''
        },
        escaleras: {
            ind: '',
            ayu: '',
            dep: ''
        }
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

// falta actualizar
async function _iniciarBarthel(rec, opciones, dataBase64) {
    $_BARTHEL._unserv = rec._unserv;
    $_BARTHEL._prof = rec._prof;
    $_BARTHEL._hcprc = rec._hcprc;
    $_BARTHEL._detalles = rec._detalles;
    $_BARTHEL._paci = rec._paci;
    $_BARTHEL._espec = rec._espec;
    $_BARTHEL.opciones = opciones;

    $_BARTHEL.dato_9005 = await $_BARTHEL._detalles.find(e => e['COD-DETHC'] == '9005' && e['LLAVE-HC'] == $_BARTHEL._hcprc.llave);
    $_BARTHEL.dato_9005 != undefined ? $_BARTHEL.dato_9005 = $_BARTHEL.dato_9005.DETALLE : false;

    // LLENAR ENCABEZADO

    $_BARTHEL.datos.encabezado.nombre = $_USUA_GLOBAL[0].NOMBRE;

    $_BARTHEL.nit_usu = $_USUA_GLOBAL[0].NIT;
    $_BARTHEL.datos.encabezado.nit = $_BARTHEL.nit_usu;

    // LLENAR DATOS PACIENTE

    $_BARTHEL.datos.paciente.nombre = $_BARTHEL._paci.DESCRIP.replace(/\s+/g, ' ');
    $_BARTHEL.datos.paciente.tipoId = $_BARTHEL._paci['TIPO-ID'];
    isNaN($_BARTHEL._paci.COD) == true ? aux = $_BARTHEL._paci.COD : aux = new Intl.NumberFormat("ja-JP").format($_BARTHEL._paci.COD);
    $_BARTHEL.datos.paciente.id = aux;
    $_BARTHEL.datos.paciente.edad = $_BARTHEL._hcprc.edad;
    $_BARTHEL._paci.SEXO == 'F' ? $_BARTHEL.datos.paciente.sexo = 'Femenino' : $_BARTHEL.datos.paciente.sexo = 'Masculino';
    $_BARTHEL.datos.paciente.fecha = $_BARTHEL._hcprc.fecha.substring(6, 8) + '-' + $_BARTHEL._hcprc.fecha.substring(4, 6) + '-' + $_BARTHEL._hcprc.fecha.substring(0, 4);
    $_BARTHEL.datos.paciente.hora = $_BARTHEL._hcprc.hora.substring(0, 2) + ':' + $_BARTHEL._hcprc.hora.substring(2, 4);

    $_BARTHEL.datos.paciente.municipio = $_BARTHEL._paci['DESCRIP-CIUDAD'];
    $_BARTHEL.datos.paciente.telefono = $_BARTHEL._paci.TELEFONO;

    // LLENAR TABLA

    switch ($_BARTHEL.dato_9005.comer_9005) {
        case '1':
            $_BARTHEL.datos.tabla.comer.ind = 'X';
            $_BARTHEL.datos.tabla.comer.ayu = '5';
            $_BARTHEL.datos.tabla.comer.dep = '0';
            break;
        case '2':
            $_BARTHEL.datos.tabla.comer.ind = '10';
            $_BARTHEL.datos.tabla.comer.ayu = 'X';
            $_BARTHEL.datos.tabla.comer.dep = '0';
            break;
        case '3':
            $_BARTHEL.datos.tabla.comer.ind = '10';
            $_BARTHEL.datos.tabla.comer.ayu = '5';
            $_BARTHEL.datos.tabla.comer.dep = 'X';
            break;
        default:
            $_BARTHEL.datos.tabla.comer.ind = '10';
            $_BARTHEL.datos.tabla.comer.ayu = '5';
            $_BARTHEL.datos.tabla.comer.dep = '0';
            break;
    }

    switch ($_BARTHEL.dato_9005.lavarse_9005) {
        case '1':
            $_BARTHEL.datos.tabla.lavarse.ind = 'X';
            $_BARTHEL.datos.tabla.lavarse.dep = '0';
            break;
        case '2':
            $_BARTHEL.datos.tabla.lavarse.ind = '5';
            $_BARTHEL.datos.tabla.lavarse.dep = 'X';
            break;
        default:
            $_BARTHEL.datos.tabla.lavarse.ind = '5';
            $_BARTHEL.datos.tabla.lavarse.dep = '0';
            break;
    }

    switch ($_BARTHEL.dato_9005.vestirse_9005) {
        case '1':
            $_BARTHEL.datos.tabla.vestirse.ind = 'X';
            $_BARTHEL.datos.tabla.vestirse.ayu = '5';
            $_BARTHEL.datos.tabla.vestirse.dep = '0';
            break;
        case '2':
            $_BARTHEL.datos.tabla.vestirse.ind = '10';
            $_BARTHEL.datos.tabla.vestirse.ayu = 'X';
            $_BARTHEL.datos.tabla.vestirse.dep = '0';
            break;
        case '3':
            $_BARTHEL.datos.tabla.vestirse.ind = '10';
            $_BARTHEL.datos.tabla.vestirse.ayu = '5';
            $_BARTHEL.datos.tabla.vestirse.dep = 'X';
            break;
        default:
            $_BARTHEL.datos.tabla.vestirse.ind = '10';
            $_BARTHEL.datos.tabla.vestirse.ayu = '5';
            $_BARTHEL.datos.tabla.vestirse.dep = '0';
            break;
    }

    switch ($_BARTHEL.dato_9005.arreglarse_9005) {
        case '1':
            $_BARTHEL.datos.tabla.arreglarse.ind = 'X';
            $_BARTHEL.datos.tabla.arreglarse.dep = '0';
            break;
        case '2':
            $_BARTHEL.datos.tabla.arreglarse.ind = '5';
            $_BARTHEL.datos.tabla.arreglarse.dep = 'X';
            break;
        default:
            $_BARTHEL.datos.tabla.arreglarse.ind = '5';
            $_BARTHEL.datos.tabla.arreglarse.dep = '0';
            break;
    }

    switch ($_BARTHEL.dato_9005.deposicion_9005) {
        case '1':
            $_BARTHEL.datos.tabla.deposicion.con = 'X';
            $_BARTHEL.datos.tabla.deposicion.acc = '5';
            $_BARTHEL.datos.tabla.deposicion.dep = '0';
            break;
        case '2':
            $_BARTHEL.datos.tabla.deposicion.con = '10';
            $_BARTHEL.datos.tabla.deposicion.acc = 'X';
            $_BARTHEL.datos.tabla.deposicion.dep = '0';
            break;
        case '3':
            $_BARTHEL.datos.tabla.deposicion.con = '10';
            $_BARTHEL.datos.tabla.deposicion.acc = '5';
            $_BARTHEL.datos.tabla.deposicion.dep = 'X';
            break;
        default:
            $_BARTHEL.datos.tabla.deposicion.con = '10';
            $_BARTHEL.datos.tabla.deposicion.acc = '5';
            $_BARTHEL.datos.tabla.deposicion.dep = '0';
            break;
    }

    switch ($_BARTHEL.dato_9005.miccion_9005) {
        case '1':
            $_BARTHEL.datos.tabla.miccion.con = 'X';
            $_BARTHEL.datos.tabla.miccion.acc = '5';
            $_BARTHEL.datos.tabla.miccion.dep = '0';
            break;
        case '2':
            $_BARTHEL.datos.tabla.miccion.con = '10';
            $_BARTHEL.datos.tabla.miccion.acc = 'X';
            $_BARTHEL.datos.tabla.miccion.dep = '0';
            break;
        case '3':
            $_BARTHEL.datos.tabla.miccion.con = '10';
            $_BARTHEL.datos.tabla.miccion.acc = '5';
            $_BARTHEL.datos.tabla.miccion.dep = 'X';
            break;
        default:
            $_BARTHEL.datos.tabla.miccion.con = '10';
            $_BARTHEL.datos.tabla.miccion.acc = '5';
            $_BARTHEL.datos.tabla.miccion.dep = '0';
            break;
    }

    switch ($_BARTHEL.dato_9005.bano_9005) {
        case '1':
            $_BARTHEL.datos.tabla.irBano.ind = 'X';
            $_BARTHEL.datos.tabla.irBano.ayu = '5';
            $_BARTHEL.datos.tabla.irBano.dep = '0';
            break;
        case '2':
            $_BARTHEL.datos.tabla.irBano.ind = '10';
            $_BARTHEL.datos.tabla.irBano.ayu = 'X';
            $_BARTHEL.datos.tabla.irBano.dep = '0';
            break;
        case '3':
            $_BARTHEL.datos.tabla.irBano.ind = '10';
            $_BARTHEL.datos.tabla.irBano.ayu = '5';
            $_BARTHEL.datos.tabla.irBano.dep = 'X';
            break;
        default:
            $_BARTHEL.datos.tabla.irBano.ind = '10';
            $_BARTHEL.datos.tabla.irBano.ayu = '5';
            $_BARTHEL.datos.tabla.irBano.dep = '0';
            break;
    }

    switch ($_BARTHEL.dato_9005.trasladarse_9005) {
        case '1':
            $_BARTHEL.datos.tabla.trasladarse.ind = 'X';
            $_BARTHEL.datos.tabla.trasladarse.min = '10';
            $_BARTHEL.datos.tabla.trasladarse.gra = '5';
            $_BARTHEL.datos.tabla.trasladarse.dep = '0';
            break;
        case '2':
            $_BARTHEL.datos.tabla.trasladarse.ind = '15';
            $_BARTHEL.datos.tabla.trasladarse.min = 'X';
            $_BARTHEL.datos.tabla.trasladarse.gra = '5';
            $_BARTHEL.datos.tabla.trasladarse.dep = '0';
            break;
        case '3':
            $_BARTHEL.datos.tabla.trasladarse.ind = '15';
            $_BARTHEL.datos.tabla.trasladarse.min = '10';
            $_BARTHEL.datos.tabla.trasladarse.gra = 'X';
            $_BARTHEL.datos.tabla.trasladarse.dep = '0';
            break;
        case '4':
            $_BARTHEL.datos.tabla.trasladarse.ind = '15';
            $_BARTHEL.datos.tabla.trasladarse.min = '10';
            $_BARTHEL.datos.tabla.trasladarse.gra = '5';
            $_BARTHEL.datos.tabla.trasladarse.dep = 'X';
            break;
        default:
            $_BARTHEL.datos.tabla.trasladarse.ind = '15';
            $_BARTHEL.datos.tabla.trasladarse.min = '10';
            $_BARTHEL.datos.tabla.trasladarse.gra = '5';
            $_BARTHEL.datos.tabla.trasladarse.dep = '0';
            break;
    }

    switch ($_BARTHEL.dato_9005.deambulacion_9005) {
        case '1':
            $_BARTHEL.datos.tabla.deambulacion.ind = 'X';
            $_BARTHEL.datos.tabla.deambulacion.ayu = '10';
            $_BARTHEL.datos.tabla.deambulacion.sill = '5';
            $_BARTHEL.datos.tabla.deambulacion.dep = '0';
            break;
        case '2':
            $_BARTHEL.datos.tabla.deambulacion.ind = '15';
            $_BARTHEL.datos.tabla.deambulacion.ayu = 'X';
            $_BARTHEL.datos.tabla.deambulacion.sill = '5';
            $_BARTHEL.datos.tabla.deambulacion.dep = '0';
            break;
        case '3':
            $_BARTHEL.datos.tabla.deambulacion.ind = '15';
            $_BARTHEL.datos.tabla.deambulacion.ayu = '10';
            $_BARTHEL.datos.tabla.deambulacion.sill = 'X';
            $_BARTHEL.datos.tabla.deambulacion.dep = '0';
            break;
        case '4':
            $_BARTHEL.datos.tabla.deambulacion.ind = '15';
            $_BARTHEL.datos.tabla.deambulacion.ayu = '10';
            $_BARTHEL.datos.tabla.deambulacion.sill = '5';
            $_BARTHEL.datos.tabla.deambulacion.dep = 'X';
            break;
        default:
            $_BARTHEL.datos.tabla.deambulacion.ind = '15';
            $_BARTHEL.datos.tabla.deambulacion.ayu = '10';
            $_BARTHEL.datos.tabla.deambulacion.sill = '5';
            $_BARTHEL.datos.tabla.deambulacion.dep = '0';
            break;
    }

    switch ($_BARTHEL.dato_9005.escaleras_9005) {
        case '1':
            $_BARTHEL.datos.tabla.escaleras.ind = 'X';
            $_BARTHEL.datos.tabla.escaleras.ayu = '5';
            $_BARTHEL.datos.tabla.escaleras.dep = '0';
            break;
        case '2':
            $_BARTHEL.datos.tabla.escaleras.ind = '10';
            $_BARTHEL.datos.tabla.escaleras.ayu = 'X';
            $_BARTHEL.datos.tabla.escaleras.dep = '0';
            break;
        case '3':
            $_BARTHEL.datos.tabla.escaleras.ind = '10';
            $_BARTHEL.datos.tabla.escaleras.ayu = '5';
            $_BARTHEL.datos.tabla.escaleras.dep = 'X';
            break;
        default:
            $_BARTHEL.datos.tabla.escaleras.ind = '10';
            $_BARTHEL.datos.tabla.escaleras.ayu = '5';
            $_BARTHEL.datos.tabla.escaleras.dep = '0';
            break;
    }

    // LLENAR TOTAL TABLA

    $_BARTHEL.datos.total.fecha = $_BARTHEL._hcprc.fecha.substring(6, 8) + '-' + $_BARTHEL._hcprc.fecha.substring(4, 6) + '-' + $_BARTHEL._hcprc.fecha.substring(0, 4);
    $_BARTHEL.datos.total.puntuacion = calcularBartheL();
    calc = parseFloat($_BARTHEL.datos.total.puntuacion);

    calc > 60 ? $_BARTHEL.datos.total.tipoDep = 'LEVE' : false;
    calc >= 50 && calc <= 60 ? $_BARTHEL.datos.total.tipoDep = 'MODERADA' : false;
    calc >= 25 && calc <= 45 ? $_BARTHEL.datos.total.tipoDep = 'SEVERA' : false;
    calc >= 0 && calc <= 20 ? $_BARTHEL.datos.total.tipoDep = 'TOTAL' : false;

    // LLENAR INFO MEDICO

    $_BARTHEL.datos.medico.nombre = $_BARTHEL._prof.NOMBRE;

    var res = $_BARTHEL._espec.find(e => e.CODIGO == $_BARTHEL._prof.TAB_ESPEC[0].COD);
    if (res != undefined) {
        $_BARTHEL.datos.medico.espec = res.NOMBRE;
    }

    $_BARTHEL.datos.medico.reg = $_BARTHEL._prof.REG_MEDICO;
    $_BARTHEL.datos.medico.firma = parseFloat($_BARTHEL._prof.IDENTIFICACION);

    if ($_BARTHEL.opciones.opc_resu == 'S') {
        await _impresion2({
            tipo: 'pdf',
            archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmssS') + '-bar'}.pdf`,
            content: _imprimirBarthel($_BARTHEL.datos),
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
            archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmssS') + '-bar'}.pdf`,
            content: _imprimirBarthel($_BARTHEL.datos),
        }).then(async data => {
            console.log('Impresión terminada')
        }).catch((err) => {
            console.error(err);
        });
    }
    
    return dataBase64;
}

function calcularBartheL() {
    aux = 0;

    switch ($_BARTHEL.dato_9005.comer_9005) {
        case '1': aux = aux + 10; break;
        case '2': aux = aux + 5; break;
    }

    $_BARTHEL.dato_9005.lavarse_9005 == '1' ? aux = aux + 5 : false;

    switch ($_BARTHEL.dato_9005.vestirse_9005) {
        case '1': aux = aux + 10; break;
        case '2': aux = aux + 5; break;
    }

    $_BARTHEL.dato_9005.arreglarse_9005 == '1' ? aux = aux + 5 : false;

    switch ($_BARTHEL.dato_9005.deposicion_9005) {
        case '1': aux = aux + 10; break;
        case '2': aux = aux + 5; break;
    }

    switch ($_BARTHEL.dato_9005.miccion_9005) {
        case '1': aux = aux + 10; break;
        case '2': aux = aux + 5; break;
    }

    switch ($_BARTHEL.dato_9005.bano_9005) {
        case '1': aux = aux + 10; break;
        case '2': aux = aux + 5; break;
    }

    switch ($_BARTHEL.dato_9005.trasladarse_9005) {
        case '1': aux = aux + 15; break;
        case '2': aux = aux + 10; break;
        case '3': aux = aux + 5; break;
    }

    switch ($_BARTHEL.dato_9005.deambulacion_9005) {
        case '1': aux = aux + 15; break;
        case '2': aux = aux + 10; break;
        case '3': aux = aux + 5; break;
    }

    switch ($_BARTHEL.dato_9005.escaleras_9005) {
        case '1': aux = aux + 10; break;
        case '2': aux = aux + 5; break;
    }

    return aux.toString();
}