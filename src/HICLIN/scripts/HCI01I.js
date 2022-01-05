// 26-10-2020 - IMPRESION INCAPACIDAD - EVOLUCION - DAVID.M - HICLIN

$_INCAP = [];

$_INCAP.datos = {
    encabezado: {
        nombre: '',
        nit: '',
        habIps: '',
        titulo: '',
    },

    paciente: {
        fecha: '',
        tipoId: '',
        id: '',
        edad: '',
        nombre: '',
        direccion: '',
        telefono: '',
        tipo_afiliacion: '',
        empresa: '',
        entidad: '',
        lugarAtencion: ''
    },

    incap: {
        fechaInicio: '',
        fechaFinal: '',
        dias: '',
        totalDias: '',
        origenServicio: '',
        tipo: '',
        concepto: '',
        estado: '',
        grado: '',
        observacion: ''
    },

    medico: {
        firma: '',
        nombre: '',
        reg: '',
        id: '',
        dx: ''
    }
}

async function _iniciarHCI01I(rec) {
    $_INCAP._hcprc = rec._hcprc;
    $_INCAP._evolucion = rec._evolucion;
    $_INCAP._paci = rec._paci;
    $_INCAP._inc = rec._inc;
    $_INCAP.nit_fact_lnk = rec.nit_fact_lnk;
    $_INCAP.llave_evo = rec._inc.LLAVE_EVO;
    $_INCAP.folio_suc_evo_lnk = $_INCAP.llave_evo.substring(15, 17);
    $_INCAP._inc.MES_ENC_INC = $_INCAP._inc.FECHA_ENC_INC.substring(4, 6);
    $_INCAP._incapacidades = rec._incapacidad;

    // LLENAR ENCABEZADO

    $_INCAP.datos.encabezado.nombre = $_USUA_GLOBAL[0].NOMBRE;
    $_INCAP.datos.encabezado.nit = $_USUA_GLOBAL[0].NIT;
    $_INCAP.datos.encabezado.habIps = $_USUA_GLOBAL[0].COD_CIUD + $_USUA_GLOBAL[0].NUIR + $_USUA_GLOBAL[0].PREFIJ;
    if ($_INCAP._inc.TIPO_EXT_INC == '1') {
        $_INCAP.datos.encabezado.titulo = "LICENCIA DE MATERNIDAD";
    } else {
        $_INCAP.datos.encabezado.titulo = "INCAPACIDAD MEDICA";
    }

    // ****************** ESCRIBIR LOG *********************
    aux = "EVOLUCION:         " + $_INCAP._evolucion.LLAVE_EVO + "\n"
        + "FECHA ACTUAL:      " + moment().format('YYYYMMDDHHmm') + "\n"
        + "DATOS DE GRABACION:" + $_INCAP._evolucion.DATOS_GRABADO.FECHA_GRAB + $_INCAP._evolucion.DATOS_GRABADO.HORA_GRAB + "\n"
        + "DATO DE INICIO:    " + "" + "\n"
        + "TIEMPO ADICION:    " + "" + "\n"
        + "DATO DE ADICION:   " + "" + "\n"
        + "******************************************************" + "\n";

    fs.appendFile('C:\\PROSOFT\\incapacidad.log', aux, function (err) {
        if (err) throw err;
        console.log('Incapacidad.log actualizado!');
    });

    // LLENAR DATOS PACIENTE

    if ($_INCAP._inc.MES_ENC_INC.trim() == '' || $_INCAP._inc.MES_ENC_INC == '00') {
        $_INCAP._inc.FECHA_ENC_INC = '';
    }
    $_INCAP.datos.paciente.fecha = _editarFecha($_INCAP._inc.FECHA_ENC_INC);
    $_INCAP.datos.paciente.tipoId = $_INCAP._paci['TIPO-ID'];
    isNaN($_INCAP._paci.COD) == true ? aux = $_INCAP._paci.COD : aux = new Intl.NumberFormat("ja-JP").format($_INCAP._paci.COD);
    $_INCAP.datos.paciente.id = aux;
    $_INCAP.datos.paciente.edad = $_INCAP._inc.EDAD_ENC_INC;
    $_INCAP.datos.paciente.nombre = $_INCAP._paci.DESCRIP.replace(/\s+/g, ' ');
    $_INCAP.datos.paciente.direccion = $_INCAP._paci.DIRECC.replace(/\s+/g, ' ');
    $_INCAP.datos.paciente.telefono = $_INCAP._paci.TELEFONO;
    $_INCAP.datos.paciente.tipo_afiliacion = _TIPOAFIL($_INCAP._paci['TIPO-AFIL']);
    $_INCAP.datos.paciente.empresa = $_INCAP._paci.EMPRESA.replace(/\s+/g, ' ');

    // LEER DESCRIPCION DE TERCERO, CON NIT-FACT
    await postData({ datosh: datosEnvio() + '2', _tercero: cerosIzq($_INCAP.nit_fact_lnk.trim(), 10) }, get_url("app/HICLIN/HCI02.DLL"))
        .then(data => {
            $_INCAP.descrip_ter = data[0].nom_ter;
        }).catch(err => {
            $_INCAP.descrip_ter = '******************************';
            console.log(err, 'error')
        })

    $_INCAP.datos.paciente.entidad = $_INCAP.descrip_ter;

    $_INCAP.datos.paciente.lugarAtencion = $_USUA_GLOBAL[0].NOMBRE_CIU;

    // MULTISALUD USA LA SUCURSAL PARA LUGAR DE ATENCION
    if ($_USUA_GLOBAL[0].NIT == 830511298) {
        await postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON823.DLL"))
            .then(data => {
                $_INCAP._sucur = data.SUCURSAL;
                $_INCAP._sucur.pop();
            }).catch(err => {
                console.log(err, 'error')
                _regresar_menuhis();
            })

        var busqSucur = $_INCAP._sucur.find(e => e.CODIGO == $_INCAP.folio_suc_evo_lnk);
        busqSucur == undefined ? busqSucur.DESCRIPCION = '' : $_INCAP.datos.paciente.lugarAtencion = busqSucur.DESCRIPCION;
    }

    // if ($_USUA_GLOBAL[0].NIT == 900541158) {
    //     await postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON003.DLL"))
    //         .then(data => {
    //             var res = data.split('|');
    //             nombre_oper_w = res[0];
    //             id_oper_w = res[1];

    //             await postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON823.DLL"))
    //                 .then(data => {
    //                     $_INCAP._sucur = data.SUCURSAL;
    //                     $_INCAP._sucur.pop();
    //                 }).catch(err => {
    //                     console.log(err, 'error')
    //                     _regresar_menuhis();
    //                 })
    //         }).catch(err => {
    //             console.log(err, 'error')
    //             loader('hide')
    //         })


    //     var busqSucur = $_INCAP._sucur.find(e => e.CODIGO == $_INCAP.folio_suc_evo_lnk);
    //     busqSucur == undefined ? busqSucur.DESCRIPCION = '' : $_INCAP._ciudad.NOMBRE = busqSucur.DESCRIPCION;
    // }

    aux = $_INCAP._inc.FECHA_INC.trim();
    $_INCAP.datos.incap.fechaInicio = _editarFecha(aux);

    // CANTIDAD DE DIAS DE INCAPACIDAD //
    var cantDias = parseInt($_INCAP._inc.CANT_INC);
    $_INCAP.datos.incap.dias = cantDias
    if (cantDias > 1) {
        // CALCULAR NRO DE DIAS STRING //
        var currency = {plural: '   ', singular: '    ' };
        $_INCAP.datos.incap.totalDias = FAC146(cantDias, false, currency).trim() + '  DIAS';
        // CALCULAR FECHA FINAL (MOMENT) //
        aux = moment($_INCAP._inc.FECHA_INC.trim()).add(parseFloat(cantDias) - 1, 'days').format('YYYYMMDD');
        $_INCAP.datos.incap.fechaFinal = _editarFecha(aux);
    } else if (cantDias == 1) {
        $_INCAP.datos.incap.totalDias = 'UN DIA';
        $_INCAP.datos.incap.fechaFinal = _editarFecha($_INCAP._inc.FECHA_INC.trim());
    }

    $_INCAP.datos.incap.origenServicio = $_INCAP._inc.DESCRIP_ENC_INC;

    switch ($_INCAP._inc.TIPO_EXT_INC) {
        case '1': aux = 'LICENCIA DE MATERNIDAD'; break;
        case '2': aux = 'ENFERMEDAD GENERAL'; break;
        case '3': aux = 'ENFERMEDAD PROFESIONAL'; break;
        case '4': aux = 'ENFERMEDAD DE TRABAJO'; break;
        case '5': aux = 'ACCIDENTE  DE TRANSITO'; break;
        case '6': aux = 'ACCIDENTE  DE TRABAJO'; break;
        default: aux = 'NO EXISTE'; break;
    }
    $_INCAP.datos.incap.tipo = aux;

    $_INCAP.datos.incap.concepto = $_INCAP._incapacidades.DESCRIP_J;

    // **********************************************************  falta concepto

    $_INCAP._inc.ITEM_INC == 'S' ? $_INCAP.datos.incap.estado = 'Prorroga' : $_INCAP.datos.incap.estado = 'Nueva';

    switch ($_INCAP._inc.GRADO_INC) {
        case 'P': aux = 'PARCIAL'; break;
        case 'T': aux = 'TOTAL'; break;
        default: aux = ''; break;
    }
    $_INCAP.datos.incap.grado = aux;

    $_INCAP.datos.incap.observacion = _reemplazoCaracXEnter($_INCAP._inc.INDIC_INC.substr(8));

    // $_INCAP.medico_ctl_w = 'S';
    // if($_USUA_GLOBAL[0].NIT == 844002258) {
    // }

    // LLENAR INFO MEDICO

    $_INCAP.datos.medico.nombre = $_INCAP._inc._evolucion.DESCRIP_ESPEC_MEDICO;
    $_INCAP.datos.medico.reg = $_INCAP._inc._evolucion.REG_MEDICO;
    $_INCAP.datos.medico.firma = parseFloat($_INCAP._inc._evolucion.MEDICO.trim());
    $_INCAP.datos.medico.id = 'C.C - ' + new Intl.NumberFormat("ja-JP").format($_INCAP._inc._evolucion.MEDICO);
    $_INCAP.datos.medico.dx = $_INCAP._inc.DIAG_ENC_INC;

    await _impresion2({
        tipo: 'pdf',
        archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmssS') + '-inc'}.pdf`,
        content: _imprimirIncapHCI01I($_INCAP.datos, console.log('impr incap')),
    }).then(async data => {
        console.log('Impresión terminada')
    }).catch((err) => {
        console.error(err);
    });
}