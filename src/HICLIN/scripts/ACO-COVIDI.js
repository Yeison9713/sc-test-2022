// 16-09-2020 - IMPRESION CONSENTIMIENTO ACOMPAÑANTE COVID- DAVID.M - HICLIN

$_ACOCOVID = [];

$_ACOCOVID.datos = {
    encabezado: {
        nombre: '',
        nit: '',
        titulo: 'CONSENTIMIENTO INFORMADO',
        // titulo2: 'Consentimiento informado para acompañante de casos probable/confirmado de COVID-19'
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

    acompa: {
        nombre: '',
        tipoId: '',
        id: '',
        de: '',
    },

    institucion: '',

    medico: {
        nombre: '',
        reg: '',
        firma: '',
        espec: ''
    }
}

async function _iniciarAcoCovid(rec, opciones, dataBase64) {
    console.log('llega a Aco Covid')
    $_ACOCOVID._unserv = rec._unserv;
    $_ACOCOVID._prof = rec._prof;
    $_ACOCOVID._ciudad = rec._ciudad;
    $_ACOCOVID._ocup = rec._ocup;
    $_ACOCOVID._hcprc = rec._hcprc;
    $_ACOCOVID._detalles = rec._detalles;
    $_ACOCOVID._paci = rec._paci;
    $_ACOCOVID._espec = rec._espec;
    $_ACOCOVID._arrayCiudades = rec._arrayCiudades;
    $_ACOCOVID.opciones = opciones;

    // LLENAR ENCABEZADO

    $_ACOCOVID.datos.encabezado.nombre = $_USUA_GLOBAL[0].NOMBRE;

    $_ACOCOVID.nit_usu = $_USUA_GLOBAL[0].NIT;
    $_ACOCOVID.datos.encabezado.nit = $_ACOCOVID.nit_usu;

    // LLENAR DATOS PACIENTE

    $_ACOCOVID.datos.paciente.fecha = $_ACOCOVID._hcprc.fecha.substring(6, 8) + '-' + $_ACOCOVID._hcprc.fecha.substring(4, 6) + '-' + $_ACOCOVID._hcprc.fecha.substring(0, 4);
    $_ACOCOVID.datos.paciente.hora = $_ACOCOVID._hcprc.hora.substring(0, 2) + ':' + $_ACOCOVID._hcprc.hora.substring(2, 4);
    $_ACOCOVID.datos.paciente.nombre = $_ACOCOVID._paci.DESCRIP.replace(/\s+/g, ' ');
    $_ACOCOVID.datos.paciente.tipoId = $_ACOCOVID._paci['TIPO-ID'];
    $_ACOCOVID.datos.paciente.edad = $_ACOCOVID._hcprc.edad;
    $_ACOCOVID._paci.SEXO == 'F' ? $_ACOCOVID.datos.paciente.sexo = 'Femenino' : $_ACOCOVID.datos.paciente.sexo = 'Masculino';
    isNaN($_ACOCOVID._paci.COD) == true ? aux = $_ACOCOVID._paci.COD : aux = new Intl.NumberFormat("ja-JP").format($_ACOCOVID._paci.COD);
    $_ACOCOVID.datos.paciente.id = aux;
    $_ACOCOVID.datos.paciente.municipio = $_ACOCOVID._ciudad.NOMBRE.replace(/\s+/g, ' ');
    $_ACOCOVID.datos.paciente.telefono = $_ACOCOVID._paci.TELEFONO;

    // LLENAR DATOS ACOMP

    var nombreAcomp = $_ACOCOVID._hcprc.covid19.acompanante_covid19.primer_nom_covid19 + $_ACOCOVID._hcprc.covid19.acompanante_covid19.segundo_nom_covid19 + $_ACOCOVID._hcprc.covid19.acompanante_covid19.primer_apel_covid19 + $_ACOCOVID._hcprc.covid19.acompanante_covid19.segundo_apel_covid19;
    $_ACOCOVID.datos.acompa.nombre = nombreAcomp;

    var tipo = $_ACOCOVID._hcprc.covid19.acompanante_covid19.ident_acomp_covid19.substring(0, 3);
    var id = $_ACOCOVID._hcprc.covid19.acompanante_covid19.ident_acomp_covid19.substring(3, 18);

    $_ACOCOVID.datos.acompa.tipoId = tipo;
    $_ACOCOVID.datos.acompa.id = new Intl.NumberFormat("ja-JP").format(id);

    if ($_ACOCOVID._hcprc.covid19.acompanante_covid19.lugar_id_covid19.trim() != '') {
        $_ACOCOVID.ciu_aco = $_ACOCOVID._arrayCiudades.filter(e => e.COD == $_ACOCOVID._hcprc.covid19.acompanante_covid19.lugar_id_covid19.trim());
        $_ACOCOVID.ciu_aco.length < 1 || $_ACOCOVID.ciu_aco == undefined ? $_ACOCOVID.ciu_aco.push({ NOMBRE: '', COD: '' }) : false;
        $_ACOCOVID.datos.acompa.de = $_ACOCOVID.ciu_aco[0].NOMBRE;
    }

    $_ACOCOVID.datos.institucion = $_ACOCOVID.datos.encabezado.nombre;

    // LLENAR INFO MEDICO

    $_ACOCOVID.datos.medico.nombre = $_ACOCOVID._prof.NOMBRE;

    var res = $_ACOCOVID._espec.find(e => e.CODIGO == $_ACOCOVID._prof.TAB_ESPEC[0].COD);
    if (res != undefined) {
        $_ACOCOVID.datos.medico.espec = res.NOMBRE;
    }

    $_ACOCOVID.datos.medico.reg = $_ACOCOVID._prof.REG_MEDICO;
    $_ACOCOVID.datos.medico.firma = parseFloat($_ACOCOVID._prof.IDENTIFICACION);

    if ($_ACOCOVID.opciones.opc_resu == 'S') {
        await _impresion2({
            tipo: 'pdf',
            archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmssS') + '-aco'}.pdf`,
            content: _imprimirAcoCovid($_ACOCOVID.datos),
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
            archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmssS') + '-aco'}.pdf`,
            content: _imprimirAcoCovid($_ACOCOVID.datos),
        }).then(async data => {
            console.log('Impresión terminada')
        }).catch((err) => {
            console.error(err);
        });
    }

    return dataBase64;
}

