// 14-10-2020 - IMPRESION SOLICITUD DE PATOLOGIA - EVOLUCION - DAVID.M - HICLIN

$_PATOL = [];

$_PATOL.datos = {
    encabezado: {
        nombre: '',
        nit: '',
        titulo: 'SOLICITUD DE PATOLOGIA',
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

    fechaRecol: '',
    pieza: '',

    datosClinicos: '',

    diagnostico: [],

    medico: {
        nombre: '',
        espec: '',
        reg: '',
        firma: ''
    },
}

async function _inicicarPatol(rec, opciones) {
    $_PATOL._hcprc = rec._hcprc;
    $_PATOL._evolucion = rec._evolucion;
    $_PATOL._paci = rec._paci;
    $_PATOL.opciones = opciones;

    // LLENAR ENCABEZADO

    $_PATOL.datos.encabezado.nombre = $_USUA_GLOBAL[0].NOMBRE;
    $_PATOL.datos.encabezado.nit = $_USUA_GLOBAL[0].NIT;

    // LLENAR DATOS PACIENTE

    $_PATOL.datos.paciente.nombre = $_PATOL._paci.DESCRIP.replace(/\s+/g, ' ');
    $_PATOL.datos.paciente.tipoId = $_PATOL._paci['TIPO-ID'];
    isNaN($_PATOL._paci.COD) == true ? aux = $_PATOL._paci.COD : aux = new Intl.NumberFormat("ja-JP").format($_PATOL._paci.COD);
    $_PATOL.datos.paciente.id = aux;
    $_PATOL.datos.paciente.edad = $_PATOL._hcprc.edad;
    $_PATOL._paci.SEXO == 'F' ? $_PATOL.datos.paciente.sexo = 'Femenino' : $_PATOL.datos.paciente.sexo = 'Masculino';
    $_PATOL.datos.paciente.fecha = $_PATOL._evolucion.FECHA_EVO.substring(0, 4) + ' - ' + $_PATOL._evolucion.FECHA_EVO.substring(4, 6) + ' - ' + $_PATOL._evolucion.FECHA_EVO.substring(6, 8);
    $_PATOL.datos.paciente.hora = $_PATOL._evolucion.HORA_EVO.substring(0, 2) + ':' + $_PATOL._evolucion.HORA_EVO.substring(2, 4);

    $_PATOL.datos.paciente.municipio = $_PATOL._paci["DESCRIP-CIUDAD"];
    $_PATOL.datos.paciente.telefono = $_PATOL._paci.TELEFONO;
    $_PATOL.datos.fechaRecol = $_PATOL._evolucion.PATOLOGIA.FECHA_MUEST.replace(/\s+/g, ' ');
    $_PATOL.datos.pieza = $_PATOL._evolucion.PATOLOGIA.PIEZA_QUIR.replace(/\s+/g, ' ');

    // -- LLENAR DATOS CLINICOS -- //
    $_PATOL.datos.datosClinicos = $_PATOL._evolucion.PATOLOGIA.DATOS_CLINICOS.replace(/\s+/g, ' ');

    // -- LLENAR DIAGNOSTICO -- //
    for (var i in $_PATOL._evolucion.TABLA_DIAGNOSTICOS) {
        if ($_PATOL._evolucion.TABLA_DIAGNOSTICOS[i].trim() != '') {
            $_PATOL.datos.diagnostico.push($_PATOL._evolucion.TABLA_DIAGNOSTICOS[i] + ' - ' + $_PATOL._evolucion.DESCRIPCIONES_DIAGN[i] + '\n')
        }
    }

    $_PATOL.datos.medico.nombre = $_PATOL._evolucion.NOM_MEDICO;
    $_PATOL.datos.medico.espec = $_PATOL._evolucion.DESCRIP_ESPEC_MEDICO;
    $_PATOL.datos.medico.reg = $_PATOL._evolucion.REG_MEDICO;
    $_PATOL.datos.medico.firma = parseFloat($_PATOL._evolucion.MEDICO.trim())

    // LLENAR INFO MEDICO

    await _impresion2({
        tipo: 'pdf',
        archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmssS') + '-pat'}.pdf`,
        content: _imprimirPatol($_PATOL.datos),
    }).then(async data => {
        console.log('Impresión terminada')
    }).catch((err) => {
        console.error(err);
    });
}