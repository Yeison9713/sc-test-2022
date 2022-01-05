// 15-09-2020 - IMPRESION CERTIFICADO ACCIDENTE DE TRANSITO- DAVID.M - HICLIN

const { resolveFiles } = require("electron-updater/out/providers/Provider");

$_HCI5414A = [];

$_HCI5414A.datos = {
    encabezado: {
        nombre: $_USUA_GLOBAL[0].NIT,
        // nombre: 'REPUBLICA DE COLOMBIA \n MINISTERIO DE SALUD',
        nit: '',
        titulo: 'CERTIFICADO DE ACCIDENTE DE TRANSITO',
    },

    empresa: {
        domicilio: '',
        ciudad: '',
        telefono: '',
        municipio: ''
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

        residente: '',
        telefono: '',
        declaracion: '',
        declaracionId: '',
        diaAcc: '',
        horaAcc: '',
        diaIng: '',
        horaIng: '',
        tipoIdTexto: ''
    },

    signos: {
        tArt: '',
        card: '',
        resp: '',
        temp: ''
    },

    conciencia: {
        ocular: '',
        verbal: '',
        motora: '',
        glasg: ''
    },

    embriaguez: {
        estado: 1,
        descrip: ''
    },

    datosPositivos: {
        cont: ''
    },

    medico: {
        nombre: '',
        espec: '',
        reg: '',
        firma: ''
    }
}

async function _iniciarHCI5414A(rec, opciones, dataBase64) {
    console.log('llega a hci5414a')
    $_HCI5414A._hcprc = rec._hcprc;
    $_HCI5414A._detalles = rec._detalles;
    $_HCI5414A._paci = rec._paci;
    $_HCI5414A._hcprc2 = rec._hcprc_new;
    $_HCI5414A.opciones = opciones;

    $_HCI5414A.exa_general_hc = $_HCI5414A._detalles.find(e => e['COD-DETHC'] == '4005' && e['LLAVE-HC'] == $_HCI5414A._hcprc.llave);
    $_HCI5414A.exa_general_hc != undefined ? $_HCI5414A.exa_general_hc = $_HCI5414A.exa_general_hc.DETALLE.replace(/\&/g, "\n").trim() : false;

    // LLENAR ENCABEZADO

    $_HCI5414A.datos.encabezado.nombre = $_USUA_GLOBAL[0].NOMBRE;

    $_HCI5414A.nit_usu = $_USUA_GLOBAL[0].NIT;
    $_HCI5414A.datos.encabezado.nit = $_HCI5414A.nit_usu;

    // LLENAR DATOS EMPRESA

    $_HCI5414A.datos.empresa.domicilio = $_USUA_GLOBAL[0].DIRECC.trim();

    $_HCI5414A.datos.empresa.municipio = $_USUA_GLOBAL[0].COD_CIUD + ' - ' + $_USUA_GLOBAL[0].NOMBRE_CIU;
    $_HCI5414A.datos.empresa.telefono = $_USUA_GLOBAL[0].TEL.trim();

    // LLENAR DATOS PACIENTE

    $_HCI5414A.datos.paciente = llenarPacienteAperturas2_impHc($_HCI5414A._paci, $_HCI5414A._hcprc2);

    // $_HCI5414A.datos.paciente.nombre = $_HCI5414A._paci.DESCRIP.replace(/\s+/g, ' ');


    aux = '';
    switch ($_HCI5414A._paci['TIPO-ID']) {
        case 'CC': aux = "CEDULA CIUDADANIA        "; break;
        case 'CE': aux = "CEDULA EXTRANJERIA       "; break;
        case 'PA': aux = "NUMERO PASAPORTE         "; break;
        case 'RC': aux = "REGISTRO CIVIL           "; break;
        case 'TI': aux = "TARJETA IDENTIDAD        "; break;
        case 'ASI': aux = "ADULTO SIN IDENTIFICAR   "; break;
        case 'MSI': aux = "MENOR  SIN IDENTIFICAR   "; break;
        case 'NUI': aux = "NUMERO UNICO IDENT. NUID "; break;
        case 'CD': aux = "CARNET DIPLOMATICO       "; break;
        case 'SC': aux = "SALVO CONDUCTO           "; break;
        case 'PE': aux = "PERMISO ESPECIAL PERMANEN"; break;
        case 'CN': aux = "CERTIFICADO NACIDO VIVO  "; break;
        default: aux = '     '; break;
    }

    $_HCI5414A.datos.paciente.tipoIdTexto = aux;

    // $_HCI5414A.datos.paciente.tipoId = $_HCI5414A._paci['TIPO-ID'];
    isNaN($_HCI5414A._paci.COD) == true ? aux = $_HCI5414A._paci.COD : aux = new Intl.NumberFormat("ja-JP").format($_HCI5414A._paci.COD);
    $_HCI5414A.datos.paciente.id = aux;

    $_HCI5414A.datos.paciente.residente = $_HCI5414A._paci.DIRECC.replace(/\s+/g, ' ');
    $_HCI5414A.datos.paciente.municipio = $_HCI5414A._paci['CIUDAD'] + ' - ' + $_HCI5414A._paci['DESCRIP-CIUDAD'];
    // $_HCI5414A.datos.paciente.edad = $_HCI5414A._hcprc.edad;
    $_HCI5414A._paci.SEXO == 'F' ? $_HCI5414A.datos.paciente.sexo = 'Femenino' : $_HCI5414A.datos.paciente.sexo = 'Masculino';
    $_HCI5414A.datos.paciente.fecha = $_HCI5414A._hcprc.fecha.substring(6, 8) + '-' + $_HCI5414A._hcprc.fecha.substring(4, 6) + '-' + $_HCI5414A._hcprc.fecha.substring(0, 4);
    $_HCI5414A.datos.paciente.hora = $_HCI5414A._hcprc.hora.substring(0, 2) + ':' + $_HCI5414A._hcprc.hora.substring(2, 4);

    // $_HCI5414A.datos.paciente.telefono = $_HCI5414A._paci.TELEFONO;
    $_HCI5414A.datos.paciente.declaracion = $_HCI5414A._hcprc.acompa.trim();
    $_HCI5414A.datos.paciente.declaracionId = $_HCI5414A._hcprc.id_acompa;

    _cargarFurips_HCI5414A();

    function _cargarFurips_HCI5414A() {
        postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER4C2-02.DLL"))
            .then(data => {
                $_HCI5414A._furips = data.FURIPS;
                $_HCI5414A._furips.pop();
                $_HCI5414A.furip = $_HCI5414A._furips.find(e => e.LLAVE_FUR == $_HCI5414A._hcprc.cierre.prefijo + $_HCI5414A._hcprc.cierre.nro_fact)
                if ($_HCI5414A.furip != undefined) {
                    llenarFurips_HCI5414A();
                }
            }).catch(err => {
                console.log(err, 'error')
                loader('hide')
                _regresar_menuhis();
            })
    }

    $_HCI5414A.datos.signos.tArt = $_HCI5414A._hcprc.signos.tens1 + '/' + $_HCI5414A._hcprc.signos.tens2;
    $_HCI5414A.datos.signos.card = $_HCI5414A._hcprc.signos.fcard;
    $_HCI5414A.datos.signos.resp = $_HCI5414A._hcprc.signos.fresp;
    $_HCI5414A.datos.signos.temp = $_HCI5414A._hcprc.signos.temp;

    aux = '';
    switch ($_HCI5414A._hcprc.signos.glasg.substring(0, 1)) {
        case '1': aux = '1. Ninguna'; break;
        case '2': aux = '2. Al dolor'; break;
        case '3': aux = '3. A ordenes'; break;
        case '4': aux = '4. Expontanea'; break;
    }
    $_HCI5414A.datos.conciencia.ocular = aux;

    aux = '';
    switch ($_HCI5414A._hcprc.signos.glasg.substring(1, 2)) {
        case '1': aux = '1. Ninguna'; break;
        case '2': aux = '2. Incomprensible'; break;
        case '3': aux = '3. Inapropiada'; break;
        case '4': aux = '4. Confusa'; break;
        case '5': aux = '4. Orientada'; break;
    }
    $_HCI5414A.datos.conciencia.verbal = aux;

    aux = '';
    switch ($_HCI5414A._hcprc.signos.glasg.substring(2, 3)) {
        case '1': aux = '1. Ninguna'; break;
        case '2': aux = '2. Descerebracion'; break;
        case '3': aux = '3. Decorticacion'; break;
        case '4': aux = '4. Retira'; break;
        case '5': aux = '4. Localiza'; break;
        case '6': aux = '4. Obedece orden'; break;
    }
    $_HCI5414A.datos.conciencia.motora = aux;

    $_HCI5414A.datos.conciencia.glasg = $_HCI5414A._hcprc.signos.glasg.substring(3, 5);


    if ($_HCI5414A._hcprc.embriaguez == 'S') {
        $_HCI5414A.datos.embriaguez.estado = 1;
        $_HCI5414A.datos.embriaguez.descrip = 'alcoholemia u otras drogas)';
    } else {
        $_HCI5414A.datos.embriaguez.estado = 0;
    }

    if ($_HCI5414A.exa_general_hc != undefined) {
        $_HCI5414A.datos.datosPositivos.cont = $_HCI5414A.exa_general_hc;
    }

    // LLENAR INFO MEDICO

    $_HCI5414A.datos.medico.nombre = $_HCI5414A._hcprc.descrip_med;
    $_HCI5414A.datos.medico.espec = $_HCI5414A._hcprc.descrip_espec_med;

    $_HCI5414A.datos.medico.reg = $_HCI5414A._hcprc.reg_med;

    $_HCI5414A.datos.medico.firma = parseFloat($_HCI5414A._hcprc.med);

    await _impresion2({
        tipo: 'pdf',
        archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmssS') + '-tran'}.pdf`,
        content: _imprimirHCI5414A($_HCI5414A.datos),
    }).then(async data => {
        console.log('Impresión terminada')
    }).catch((err) => {
        console.error(err);
    });

    return dataBase64;
}

function llenarFurips_HCI5414A() {
    a = $_HCI5414A.furip.FECHA_OCUR_FUR.substring(0, 4);
    m = $_HCI5414A.furip.FECHA_OCUR_FUR.substring(4, 6);
    d = $_HCI5414A.furip.FECHA_OCUR_FUR.substring(6, 8);

    $_HCI5414A.datos.paciente.diaAcc = d + '/' + m + '/' + a;
    $_HCI5414A.datos.paciente.horaAcc = $_HCI5414A.furip.HORA_OCUR_FUR.substring(0, 2) + ':' + $_HCI5414A.furip.HORA_OCUR_FUR.substring(2, 4);

    a = $_HCI5414A.furip.FECHA_ING_FUR.substring(0, 4);
    m = $_HCI5414A.furip.FECHA_ING_FUR.substring(4, 6);
    d = $_HCI5414A.furip.FECHA_ING_FUR.substring(6, 8);

    $_HCI5414A.datos.paciente.diaIng = d + '/' + m + '/' + a;
    $_HCI5414A.datos.paciente.horaIng = $_HCI5414A.furip.HORA_ING_FUR.substring(0, 2) + ':' + $_HCI5414A.furip.HORA_ING_FUR.substring(2, 4);
}