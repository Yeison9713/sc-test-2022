// 10-09-2020 - IMPRESION CERTIFICADO DEPENDENCIA FUNCIONAL- DAVID.M - HICLIN

$_DEPENDE = [];

$_DEPENDE.datos = {
    encabezado: {
        nombre: '',
        nit: '',
        titulo: 'CERTIFICADO DE DEPENDENCIA FUNCIONAL',
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

    nombre: '',
    edad: '',
    tipoId: '',
    id: '',
    diag: '',

    puntuacionBarthel: '',
    puntuacionKarno: '',
    consecuencias: '',
    areaTexto: '',
    dependencia: '',
    fecha: {
        ano: '',
        mes: '',
        dia: ''
    },

    medico: {
        nombre: '',
        reg: '',
        firma: '',
        espec: ''
    }
}

async function _iniciarDepende(rec, opciones, dataBase64) {
    console.log('llega a depende')
    $_DEPENDE._unserv = rec._unserv;
    $_DEPENDE._prof = rec._prof;
    $_DEPENDE._ciudad = rec._ciudad;
    $_DEPENDE._ocup = rec._ocup;
    $_DEPENDE._entidad = rec._entidad;
    $_DEPENDE._hcprc = rec._hcprc;
    $_DEPENDE._detalles = rec._detalles;
    $_DEPENDE._paci = rec._paci;
    $_DEPENDE._espec = rec._espec;
    $_DEPENDE.opciones = opciones;

    $_DEPENDE.dato_9005 = $_DEPENDE._detalles.find(e => e['COD-DETHC'] == '9005' && e['LLAVE-HC'] == $_DEPENDE._hcprc.llave);
    $_DEPENDE.dato_9005 != undefined ? $_DEPENDE.dato_9005 = $_DEPENDE.dato_9005.DETALLE : false;

    $_DEPENDE.dato_9006 = $_DEPENDE._detalles.find(e => e['COD-DETHC'] == '9006' && e['LLAVE-HC'] == $_DEPENDE._hcprc.llave);
    $_DEPENDE.dato_9006 != undefined ? $_DEPENDE.dato_9006 = $_DEPENDE.dato_9006.DETALLE : false;

    // LLENAR ENCABEZADO

    $_DEPENDE.datos.encabezado.nombre = $_USUA_GLOBAL[0].NOMBRE;

    $_DEPENDE.nit_usu = $_USUA_GLOBAL[0].NIT;
    $_DEPENDE.datos.encabezado.nit = $_DEPENDE.nit_usu;

    // LLENAR DATOS PACIENTE

    $_DEPENDE.datos.paciente.fecha = $_DEPENDE._hcprc.fecha.substring(6, 8) + '-' + $_DEPENDE._hcprc.fecha.substring(4, 6) + '-' + $_DEPENDE._hcprc.fecha.substring(0, 4);
    $_DEPENDE.datos.paciente.hora = $_DEPENDE._hcprc.hora.substring(0, 2) + ':' + $_DEPENDE._hcprc.hora.substring(2, 4);
    $_DEPENDE.datos.paciente.nombre = $_DEPENDE._paci.DESCRIP.replace(/\s+/g, ' ');
    $_DEPENDE.datos.paciente.tipoId = $_DEPENDE._paci['TIPO-ID'];
    $_DEPENDE.datos.paciente.edad = $_DEPENDE._hcprc.edad;
    $_DEPENDE._paci.SEXO == 'F' ? $_DEPENDE.datos.paciente.sexo = 'Femenino' : $_DEPENDE.datos.paciente.sexo = 'Masculino';
    isNaN($_DEPENDE._paci.COD) == true ? aux = $_DEPENDE._paci.COD : aux = new Intl.NumberFormat("ja-JP").format($_DEPENDE._paci.COD);
    $_DEPENDE.datos.paciente.id = aux;
    $_DEPENDE.datos.paciente.municipio = $_DEPENDE._ciudad.NOMBRE.replace(/\s+/g, ' ');
    $_DEPENDE.datos.paciente.telefono = $_DEPENDE._paci.TELEFONO;

    $_DEPENDE.datos.diag = $_DEPENDE._hcprc.rips.tabla_diag[0].diagn;

    $_DEPENDE.datos.puntuacionBarthel = calcularBarthelDep();
    $_DEPENDE.datos.puntuacionKarno = calcularKarnofDep();

    $_DEPENDE.datos.consecuencias = $_DEPENDE.dato_9005.nivel_secuelas_9005;
    $_DEPENDE.datos.areaTexto = $_DEPENDE.dato_9005.tabla_actividades_9005;
    $_DEPENDE.datos.dependencia = $_DEPENDE.dato_9005.depen_funcional_9005;

    $_DEPENDE.datos.fecha.ano = $_DEPENDE._hcprc.fecha.substring(0, 4);

    aux = '';
    switch ($_DEPENDE._hcprc.fecha.substring(4, 6)) {
        case '01': aux = 'ENERO'; break;
        case '02': aux = 'FEBRERO'; break;
        case '03': aux = 'MARZO'; break;
        case '04': aux = 'ABRIL'; break;
        case '05': aux = 'MAYO'; break;
        case '06': aux = 'JUNIO'; break;
        case '07': aux = 'JULIO'; break;
        case '08': aux = 'AGOSTO'; break;
        case '09': aux = 'SEPTIEMBRE'; break;
        case '10': aux = 'OCTUBRE'; break;
        case '11': aux = 'NOVIEMBRE'; break;
        case '12': aux = 'DICIEMBRE'; break;
        default: aux = $_DEPENDE._hcprc.fecha.substring(4, 6); break;
    }

    $_DEPENDE.datos.fecha.mes = aux;
    $_DEPENDE.datos.fecha.dia = $_DEPENDE._hcprc.fecha.substring(6, 8);

    // LLENAR INFO MEDICO

    $_DEPENDE.datos.medico.nombre = $_DEPENDE._prof.NOMBRE;

    var res = $_DEPENDE._espec.find(e => e.CODIGO == $_DEPENDE._prof.TAB_ESPEC[0].COD);
    if (res != undefined) {
        $_DEPENDE.datos.medico.espec = res.NOMBRE;
    }

    $_DEPENDE.datos.medico.reg = $_DEPENDE._prof.REG_MEDICO;
    $_DEPENDE.datos.medico.firma = parseFloat($_DEPENDE._prof.IDENTIFICACION);

    if($_DEPENDE.opciones.opc_resu == 'S') {
        await _impresion2({
            tipo: 'pdf',
            archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmssS') + '-dep'}.pdf`,
            content: _imprimirDepende($_DEPENDE.datos),
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
            archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmssS') + '-dep'}.pdf`,
            content: _imprimirDepende($_DEPENDE.datos),
        }).then(async data => {
            console.log('Impresión terminada')
        }).catch((err) => {
            console.error(err);
        });
    }

    return dataBase64;
}

function calcularKarnofDep() {
    aux = 0;

    switch ($_DEPENDE.dato_9006.actividad_normal_9006) {
        case '1': aux = aux + 100; break;
        case '2': aux = aux + 90; break;
        case '3': aux = aux + 80; break;
    }

    switch ($_DEPENDE.dato_9006.incapaz_trabajar_9006) {
        case '1': aux = aux + 70; break;
        case '2': aux = aux + 60; break;
        case '3': aux = aux + 50; break;
    }

    switch ($_DEPENDE.dato_9006.incapaz_cuidarse_9006) {
        case '1': aux = aux + 30; break;
        case '2': aux = aux + 20; break;
        case '3': aux = aux + 10; break;
        case '4': aux = aux + 0; break;
    }

    return aux.toString();
}

function calcularBarthelDep() {
    console.log('llega a calcular barthel dep')
    aux = 0;

    switch ($_DEPENDE.dato_9005.comer_9005) {
        case '1': aux = aux + 10; break;
        case '2': aux = aux + 5; break;
    }

    $_DEPENDE.dato_9005.lavarse_9005 == '1' ? aux = aux + 5 : false;

    switch ($_DEPENDE.dato_9005.vestirse_9005) {
        case '1': aux = aux + 10; break;
        case '2': aux = aux + 5; break;
    }

    $_DEPENDE.dato_9005.arreglarse_9005 == '1' ? aux = aux + 5 : false;

    switch ($_DEPENDE.dato_9005.deposicion_9005) {
        case '1': aux = aux + 10; break;
        case '2': aux = aux + 5; break;
    }

    switch ($_DEPENDE.dato_9005.miccion_9005) {
        case '1': aux = aux + 10; break;
        case '2': aux = aux + 5; break;
    }

    switch ($_DEPENDE.dato_9005.bano_9005) {
        case '1': aux = aux + 10; break;
        case '2': aux = aux + 5; break;
    }

    switch ($_DEPENDE.dato_9005.trasladarse_9005) {
        case '1': aux = aux + 15; break;
        case '2': aux = aux + 10; break;
        case '3': aux = aux + 5; break;
    }

    switch ($_DEPENDE.dato_9005.deambulacion_9005) {
        case '1': aux = aux + 15; break;
        case '2': aux = aux + 10; break;
        case '3': aux = aux + 5; break;
    }

    switch ($_DEPENDE.dato_9005.escaleras_9005) {
        case '1': aux = aux + 10; break;
        case '2': aux = aux + 5; break;
    }

    return aux.toString();
}