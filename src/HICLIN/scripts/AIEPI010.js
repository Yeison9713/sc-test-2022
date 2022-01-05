// IMPRESION AIEPI001 - DAVID.M  15/12/2020
$_AIEPI010 = [];
$_AIEPI010.NIT_USU = $_USUA_GLOBAL[0].NIT;
$_AIEPI010.dataBase64 = [];
var datos_AIE = {};
var $_reg_hc = {};

async function iniciar_AIEPI010(opciones, arrayDatos) {
    $_AIEPI010._hcprc = arrayDatos._hcpac;
    $_AIEPI010._ciudades = arrayDatos._ciudades;
    $_AIEPI010._paisesRips = arrayDatos._paisesRips;
    $_AIEPI010._detalles = arrayDatos._detalles;
    $_reg_hc = arrayDatos.$_reg_hc;
    $_AIEPI010._paci = arrayDatos.$_reg_paci;

    $_AIEPI010.tipo_epicrisis_lnk = arrayDatos.tipo_epic;

    $_AIEPI010.opciones = opciones;
    $_AIEPI010.opciones.opc_aper == 'S' ? $_AIEPI010.SW_PAG = 1 : $_AIEPI010.SW_PAG = 2;

    await validarHC_AIEPI010();

    if ($_AIEPI010.salirFlag) {
        salir_AIEPI010();
        return null;
    } else {
        await inicializarDatos_AIEPI010();
        await crearJsonEnvio_AIEPI010();

        $_AIEPI010.RECOM_W = '';
        $_AIEPI010.RECOM_DENGUE_W = '';
        await procesos_AIEPI010();

        console.log($_AIEPI010.dataBase64, 'data');
        return $_AIEPI010.dataBase64;
    }
}

function salir_AIEPI010() {
    console.log('LLEGA A SALIR AIEPI');
}

async function validarHC_AIEPI010() {
    if ($_AIEPI010._hcprc.novedad == '7') {
        $_AIEPI010.salirFlag = true;
    } else {
        $_AIEPI010.salirFlag = false;
        await leerDetalles_AIEPI010();
    }
}

async function leerDetalles_AIEPI010() {
    // leer variables aiepi
    $_AIEPI010.dato_9501 = await $_AIEPI010._detalles.find(e => e['COD-DETHC'] == '9501' && e['LLAVE-HC'] == $_AIEPI010._hcprc.llave);
    $_AIEPI010.dato_9501 != undefined ? $_AIEPI010.dato_9501 = $_AIEPI010.dato_9501.DETALLE : false;

    // leer enfermedad general
    $_AIEPI010.enf_act_hc = await $_AIEPI010._detalles.find(e => e['COD-DETHC'] == '1001' && e['LLAVE-HC'] == $_AIEPI010._hcprc.llave);
    if ($_AIEPI010.enf_act_hc != undefined) {
        $_AIEPI010.enf_act_hc = $_AIEPI010.enf_act_hc.DETALLE;
        $_AIEPI010.enf_act_hc = $_AIEPI010.enf_act_hc.replace(/\&/g, "\n").trim()
    }

    // leer tratamiento
    $_AIEPI010.dato_9503 = await $_AIEPI010._detalles.find(e => e['COD-DETHC'] == '9503' && e['LLAVE-HC'] == $_AIEPI010._hcprc.llave);
    if ($_AIEPI010.dato_9503) {
        $_AIEPI010.dato_9503 = $_AIEPI010.dato_9503.DETALLE.replace(/\&/g, "\n").trim();
    }

    // leer antecedentes familiares
    $_AIEPI010.famil_hc = await $_AIEPI010._detalles.find(e => e['COD-DETHC'] == '2002' && e['LLAVE-HC'] == $_AIEPI010._hcprc.llave);

    if ($_AIEPI010.famil_hc) {
        $_AIEPI010.famil_hc = $_AIEPI010.famil_hc.DETALLE;
        if ($_AIEPI010._hcprc.serv != '08') $_AIEPI010.famil_hc = $_AIEPI010.famil_hc.replace(/\&/g, "\n").trim()
    }

    // leer examen general
    $_AIEPI010.exa_general_hc = await $_AIEPI010._detalles.find(e => e['COD-DETHC'] == '4005' && e['LLAVE-HC'] == $_AIEPI010._hcprc.llave);
    $_AIEPI010.exa_general_hc != undefined ? $_AIEPI010.exa_general_hc = $_AIEPI010.exa_general_hc.DETALLE.replace(/\&/g, "\n").trim() : false;

    // leer test barthel
    $_AIEPI010.dato_9005 = await $_AIEPI010._detalles.find(e => e['COD-DETHC'] == '9005' && e['LLAVE-HC'] == $_AIEPI010._hcprc.llave);
    $_AIEPI010.dato_9005 != undefined ? $_AIEPI010.dato_9005 = $_AIEPI010.dato_9005.DETALLE : false;

    // leer test karnofsky
    $_AIEPI010.dato_9006 = await $_AIEPI010._detalles.find(e => e['COD-DETHC'] == '9006' && e['LLAVE-HC'] == $_AIEPI010._hcprc.llave);
    $_AIEPI010.dato_9006 != undefined ? $_AIEPI010.dato_9006 = $_AIEPI010.dato_9006.DETALLE : false;
}

async function procesos_AIEPI010() {
    console.log('INI PROCESOS 1');
    $_AIEPI010.opciones.opc_resu == 'N' && $_AIEPI010.SW_PAG == 0 ? salir_AIEPI010() : false;

    $_AIEPI010.RECOM_W.trim() == '' ? $_AIEPI010.RECOM_W = 'N' : false;
    // CON851P('27', () => { $_AIEPI010.RECOM_W = 'N'; procesos2_AIEPI010() }, () => {console.log('CALLBACK CON851P'); $_AIEPI010.RECOM_W = 'S'; procesos2_AIEPI010() });

    await procesos2_AIEPI010();
}

async function procesos2_AIEPI010() {
    console.log('INI PROCESOS2');
    datos_AIE.RECOM_W = $_AIEPI010.RECOM_W;

    $_AIEPI010.RECOM_DENGUE_W.trim() == '' ? $_AIEPI010.RECOM_DENGUE_W = 'N' : false;

    var b1 = ["A90X", "A91X", "R500", "R501", "R51X", "M791", "J00X", "A90X", "A91X", "A920", "B338", "B500", "B520", "B528", "B529", "B530", "B531", "B538", "B54X"].find(e => e == $_AIEPI010._hcprc.rips.tabla_diag[0].diagn);
    var b2 = ["A90X", "A91X", "R500", "R501", "R51X", "M791", "J00X", "A90X", "A91X", "A920", "B338", "B500", "B520", "B528", "B529", "B530", "B531", "B538", "B54X"].find(e => e == $_AIEPI010._hcprc.rips.tabla_diag[1].diagn);
    var b3 = ["A90X", "A91X", "R500", "R501", "R51X", "M791", "J00X", "A90X", "A91X", "A920", "B338", "B500", "B520", "B528", "B529", "B530", "B531", "B538", "B54X"].find(e => e == $_AIEPI010._hcprc.rips.tabla_diag[2].diagn);
    var b4 = ["A90X", "A91X", "R500", "R501", "R51X", "M791", "J00X", "A90X", "A91X", "A920", "B338", "B500", "B520", "B528", "B529", "B530", "B531", "B538", "B54X"].find(e => e == $_AIEPI010._hcprc.rips.tabla_diag[3].diagn);
    var b5 = ["A90X", "A91X", "R500", "R501", "R51X", "M791", "J00X", "A90X", "A91X", "A920", "B338", "B500", "B520", "B528", "B529", "B530", "B531", "B538", "B54X"].find(e => e == $_AIEPI010._hcprc.rips.tabla_diag[4].diagn);

    (b1 != undefined || b2 != undefined || b3 != undefined || b4 != undefined || b5 != undefined) ? $_AIEPI010.RECOM_DENGUE_W = 'S': false;

    await abrirArchivos_AIEPI010();

    if ($_AIEPI010.RECOM_DENGUE_W == 'S') {
        if ($_AIEPI010.NIT_USU == 892000458) {
            datos_AIE.mostrarCuadroDengue = true;
        } else {
            datos_AIE.mostrarRecomDengue = true;
        }
    }

    if ($_AIEPI010._hcprc.covid19.recomendacion_covid19 == 'S') {
        datos_AIE.covid.recomendaciones.bandera = true;
    }

    if ($_AIEPI010.dato_9501) {
        await llenarEncabezado_AIEPI010();
    }

    await llamarHCI5414A_AIEPI010();
    await llamarBarthel_AIEPI010();
    await llamarKarnof_AIEPI010();
    await llamarKarnof_AIEPI010();
    await llamarAcoCovid_AIEPI010();
}

function llenarEgreso_AIEPI010() {
    const { iniciar_HCI01C } = require("../../HICLIN/scripts/HCI01C");

    return new Promise((resolve) => {
      iniciar_HCI01C({
        hcprc: $_AIEPI010._hcprc,
        callback: resolve,
      });
    });
}

async function abrirArchivos_AIEPI010() {
    if ($_AIEPI010._hcprc.cierre.nit_fact == 0) {
        datos_AIE.paciente.entidad = $_AIEPI010._paci['NOMBRE-EPS']
    } else {
        datos_AIE.paciente.entidad = $_AIEPI010._hcprc.cierre.descrip_nit_fact;
    }
}

async function llenarEncabezado_AIEPI010() {
    switch (parseInt($_AIEPI010.tipo_epicrisis_lnk)) {
        case 1:
            datos_AIE.titulo2 = 'EPICRISIS';
            break;
        case 2:
            datos_AIE.titulo2 = 'REMISION';
            break;
        case 3:
            datos_AIE.titulo2 = 'CONTRAREFERENCIA';
            break;
        default:
            datos_AIE.titulo2 = ' ';
            break;
    }

    datos_AIE.paciente.hc = $_AIEPI010._hcprc.llave.substring(0, 15) + '-' + $_AIEPI010._hcprc.llave.substring(15, 23);
    datos_AIE.paciente.fecha = _editFecha3($_AIEPI010._hcprc.fecha);
    datos_AIE.paciente.hora = _editHora($_AIEPI010._hcprc.hora);
    datos_AIE.paciente.unserv = $_AIEPI010._hcprc.cierre.descrip_unserv;
    datos_AIE.paciente.institucion = $_USUA_GLOBAL[0].NOMBRE;
    datos_AIE.paciente.municipio = $_AIEPI010._paci['DESCRIP-CIUDAD'];
    datos_AIE.paciente.consulta = ' ';
    datos_AIE.paciente.control = ' ';
    datos_AIE.paciente.nombre = $_AIEPI010._paci.DESCRIP.replace(/\s+/g, ' ');
    datos_AIE.paciente.edad = $_AIEPI010._hcprc.edad > 0 ? $_AIEPI010._hcprc.edad : $_reg_hc.edad_hc.unid_edad + cerosIzq($_reg_hc.edad_hc.vlr_edad, 3);
    datos_AIE.paciente.nacim = $_AIEPI010._paci.NACIM.substring(0, 4) == 0 ? ' ' : _editFecha2($_AIEPI010._paci.NACIM);

    // console.log($_reg_hc.edad_hc, 'edad');
    // if ($_reg_hc.edad_hc.unid_edad == 'A' && $_AIEPI010._hcprc.edad_dias > 395) {
    //     var dias_meses_w = parseFloat($_AIEPI010._hcprc.edad_dias) - (parseFloat($_reg_hc.edad_hc.vlr_edad) * 365);
    //     var meses_w = parseFloat(dias_meses_w) / 30;
    //     datos_AIE.paciente.edad = datos_AIE.paciente.edad + ` ${meses_w} MESES`;
    // }

    datos_AIE.paciente.sexo = $_AIEPI010._paci.SEXO == 'M' ? 'Masculino' : 'Femenino';
    datos_AIE.paciente.parentesco = $_AIEPI010._hcprc.parent_acompa.replace(/\s+/g, ' ');
    datos_AIE.paciente.direccion = $_AIEPI010._paci.DIRECC.replace(/\s+/g, ' ');
    datos_AIE.paciente.telefono = $_AIEPI010._paci.TELEFONO.trim();
    datos_AIE.paciente.acompa = $_AIEPI010._hcprc.acompa.replace(/\s+/g, ' ');

    datos_AIE.motivo = $_AIEPI010._hcprc.motivo;
    ($_AIEPI010.enf_act_hc) ? datos_AIE.enfActual = $_AIEPI010.enf_act_hc.trim(): datos_AIE.enfActual = '';

    if ($_AIEPI010.famil_hc) {
        if ($_AIEPI010.famil_hc.embarazo_deseado) {
            datos_AIE.antec_perinatal = $_AIEPI010.famil_hc;

            switch (datos_AIE.antec_perinatal.embarazo_deseado) {
                case 'S':
                    datos_AIE.antec_perinatal.embarazo_deseado = 'SI';
                    break;
                case 'N':
                    datos_AIE.antec_perinatal.embarazo_deseado = 'NO';
                    break;
                case 'I':
                    datos_AIE.antec_perinatal.embarazo_deseado = 'IGNORA';
                    break;
                default:
                    datos_AIE.antec_perinatal.embarazo_deseado = '  ';
                    break;
            }

            switch (datos_AIE.antec_perinatal.atencion_perinatal) {
                case 'S':
                    datos_AIE.antec_perinatal.atencion_perinatal = 'SI';
                    break;
                case 'N':
                    datos_AIE.antec_perinatal.atencion_perinatal = 'NO';
                    break;
                case 'I':
                    datos_AIE.antec_perinatal.atencion_perinatal = 'IGNORA';
                    break;
                default:
                    datos_AIE.antec_perinatal.atencion_perinatal = '  ';
                    break;
            }

            switch (datos_AIE.antec_perinatal.reanimacion) {
                case 'S':
                    datos_AIE.antec_perinatal.reanimacion = 'SI';
                    break;
                case 'N':
                    datos_AIE.antec_perinatal.reanimacion = 'NO';
                    break;
                case 'I':
                    datos_AIE.antec_perinatal.reanimacion = 'IGNORA';
                    break;
                default:
                    datos_AIE.antec_perinatal.reanimacion = '  ';
                    break;
            }

            switch (datos_AIE.antec_perinatal.sano) {
                case 'S':
                    datos_AIE.antec_perinatal.sano = 'SI';
                    break;
                case 'N':
                    datos_AIE.antec_perinatal.sano = 'NO';
                    break;
                case 'I':
                    datos_AIE.antec_perinatal.sano = 'IGNORA';
                    break;
                default:
                    datos_AIE.antec_perinatal.sano = '  ';
                    break;
            }

            switch (datos_AIE.antec_perinatal.hemorragias) {
                case 'S':
                    datos_AIE.antec_perinatal.hemorragias = 'SI';
                    break;
                case 'N':
                    datos_AIE.antec_perinatal.hemorragias = 'NO';
                    break;
                case 'I':
                    datos_AIE.antec_perinatal.hemorragias = 'IGNORA';
                    break;
                default:
                    datos_AIE.antec_perinatal.hemorragias = '  ';
                    break;
            }

            switch (datos_AIE.antec_perinatal.infecciones) {
                case 'S':
                    datos_AIE.antec_perinatal.infecciones = 'SI';
                    break;
                case 'N':
                    datos_AIE.antec_perinatal.infecciones = 'NO';
                    break;
                case 'I':
                    datos_AIE.antec_perinatal.infecciones = 'IGNORA';
                    break;
                default:
                    datos_AIE.antec_perinatal.infecciones = '  ';
                    break;
            }

            switch (datos_AIE.antec_perinatal.deforma_cong) {
                case 'S':
                    datos_AIE.antec_perinatal.deforma_cong = 'SI';
                    break;
                case 'N':
                    datos_AIE.antec_perinatal.deforma_cong = 'NO';
                    break;
                case 'I':
                    datos_AIE.antec_perinatal.deforma_cong = 'IGNORA';
                    break;
                default:
                    datos_AIE.antec_perinatal.deforma_cong = '  ';
                    break;
            }

            switch (datos_AIE.antec_perinatal.hipoglicemia) {
                case 'S':
                    datos_AIE.antec_perinatal.hipoglicemia = 'SI';
                    break;
                case 'N':
                    datos_AIE.antec_perinatal.hipoglicemia = 'NO';
                    break;
                case 'I':
                    datos_AIE.antec_perinatal.hipoglicemia = 'IGNORA';
                    break;
                default:
                    datos_AIE.antec_perinatal.hipoglicemia = '  ';
                    break;
            }

            switch (datos_AIE.antec_perinatal.apnea) {
                case 'S':
                    datos_AIE.antec_perinatal.apnea = 'SI';
                    break;
                case 'N':
                    datos_AIE.antec_perinatal.apnea = 'NO';
                    break;
                case 'I':
                    datos_AIE.antec_perinatal.apnea = 'IGNORA';
                    break;
                default:
                    datos_AIE.antec_perinatal.apnea = '  ';
                    break;
            }

            switch (datos_AIE.antec_perinatal.ictericia) {
                case 'S':
                    datos_AIE.antec_perinatal.ictericia = 'SI';
                    break;
                case 'N':
                    datos_AIE.antec_perinatal.ictericia = 'NO';
                    break;
                case 'I':
                    datos_AIE.antec_perinatal.ictericia = 'IGNORA';
                    break;
                default:
                    datos_AIE.antec_perinatal.ictericia = '  ';
                    break;
            }

            switch (datos_AIE.antec_perinatal.broncoasp) {
                case 'S':
                    datos_AIE.antec_perinatal.broncoasp = 'SI';
                    break;
                case 'N':
                    datos_AIE.antec_perinatal.broncoasp = 'NO';
                    break;
                case 'I':
                    datos_AIE.antec_perinatal.broncoasp = 'IGNORA';
                    break;
                default:
                    datos_AIE.antec_perinatal.broncoasp = '  ';
                    break;
            }

            switch (datos_AIE.antec_perinatal.neurologia) {
                case 'S':
                    datos_AIE.antec_perinatal.neurologia = 'SI';
                    break;
                case 'N':
                    datos_AIE.antec_perinatal.neurologia = 'NO';
                    break;
                case 'I':
                    datos_AIE.antec_perinatal.neurologia = 'IGNORA';
                    break;
                default:
                    datos_AIE.antec_perinatal.neurologia = '  ';
                    break;
            }

            switch (datos_AIE.antec_perinatal.memb_hialina) {
                case 'S':
                    datos_AIE.antec_perinatal.memb_hialina = 'SI';
                    break;
                case 'N':
                    datos_AIE.antec_perinatal.memb_hialina = 'NO';
                    break;
                case 'I':
                    datos_AIE.antec_perinatal.memb_hialina = 'IGNORA';
                    break;
                default:
                    datos_AIE.antec_perinatal.memb_hialina = '  ';
                    break;
            }
        }

        datos_AIE.antecPatologicos = $_AIEPI010.famil_hc;
    }

    datos_AIE.edadGest = $_AIEPI010._hcprc.signos.edad_gestacional;
    datos_AIE.pesoNacer = $_AIEPI010._hcprc.signos.peso_nacer;
    datos_AIE.tallaNacer = $_AIEPI010._hcprc.signos.talla_nacer;

    var peso_kl_w = '';
    switch (parseInt($_AIEPI010._hcprc.signos.und_peso)) {
        case 1:
            peso_kl_w = $_AIEPI010._hcprc.signos.peso;
            break;
        case 2:
            peso_kl_w = parseFloat($_AIEPI010._hcprc.signos.peso) / 1000;
            break;
    }

    datos_AIE.signos.peso = peso_kl_w;
    datos_AIE.signos.talla = $_AIEPI010._hcprc.signos.talla;
    datos_AIE.signos.temp = $_AIEPI010._hcprc.signos.temp;
    datos_AIE.signos.fc = $_AIEPI010._hcprc.signos.fcard;
    datos_AIE.signos.fr = $_AIEPI010._hcprc.signos.fresp;
    datos_AIE.signos.pc = $_AIEPI010._hcprc.signos.per_cef;
    datos_AIE.signos.tora = $_AIEPI010._hcprc.signos.per_tora;
    datos_AIE.signos.braq = $_AIEPI010._hcprc.signos.per_braq;
    datos_AIE.signos.abd = $_AIEPI010._hcprc.signos.per_abdo;
    datos_AIE.signos.mune = $_AIEPI010._hcprc.signos.per_mune;
    datos_AIE.signos.imc = $_AIEPI010._hcprc.signos.imc;
    datos_AIE.signos.tens = $_AIEPI010._hcprc.signos.tens1 + '/' + $_AIEPI010._hcprc.signos.tens2;

    switch ($_AIEPI010._hcprc.signos.tsh_nacer) {
        case '1':
            datos_AIE.signos.tsh = 'NORMAL';
            break;
        case '2':
            datos_AIE.signos.tsh = 'ANORMAL';
            break;
        case '3':
            datos_AIE.signos.tsh = 'POSITIVO';
            break;
        case '4':
            datos_AIE.signos.tsh = 'NEGATIVO';
            break;
        case '5':
            datos_AIE.signos.tsh = 'SIN REA';
            break;
        case '6':
            datos_AIE.signos.tsh = 'PENDIENTE';
            break;
        case '7':
            datos_AIE.signos.tsh = 'REACTIVO';
            break;
        case '8':
            datos_AIE.signos.tsh = 'NO REACT';
            break;
        default:
            datos_AIE.signos.tsh = '';
            break;
    }

    if ($_AIEPI010._hcprc.signos.und_peso == 2) {
        datos_AIE.signos.peso = datos_AIE.signos.peso + ' G';
    } else {
        datos_AIE.signos.peso = datos_AIE.signos.peso + ' Kg';
    }

    datos_AIE.signo_peligro = $_AIEPI010.dato_9501.signo_peligro;

    datos_AIE.signo_peligro.peligr == 'N' ? datos_AIE.signo_peligro.resultado = 'NO EXISTE PELIGRO EN GENERAL' : false;

    switch (datos_AIE.signo_peligro.tpecho) {
        case 'S':
            datos_AIE.signo_peligro.tpecho = 'SI';
            break;
        case 'N':
            datos_AIE.signo_peligro.tpecho = 'NO';
            break;
        default:
            datos_AIE.signo_peligro.tpecho = ' ';
            break;
    }

    switch (datos_AIE.signo_peligro.letarg) {
        case 'S':
            datos_AIE.signo_peligro.letarg = 'SI';
            break;
        case 'N':
            datos_AIE.signo_peligro.letarg = 'NO';
            break;
        default:
            datos_AIE.signo_peligro.letarg = ' ';
            break;
    }

    switch (datos_AIE.signo_peligro.vomito) {
        case 'S':
            datos_AIE.signo_peligro.vomito = 'SI';
            break;
        case 'N':
            datos_AIE.signo_peligro.vomito = 'NO';
            break;
        default:
            datos_AIE.signo_peligro.vomito = ' ';
            break;
    }

    switch (datos_AIE.signo_peligro.convul) {
        case 'S':
            datos_AIE.signo_peligro.convul = 'SI';
            break;
        case 'N':
            datos_AIE.signo_peligro.convul = 'NO';
            break;
        default:
            datos_AIE.signo_peligro.convul = ' ';
            break;
    }

    $_AIEPI010.dato_9501.enfer_grave == 1 ? datos_AIE.signo_peligro.resultado = 'ENFERMEDAD MUY GRAVE' : false;

    // INI TOS RESP

    datos_AIE.signo_tos = $_AIEPI010.dato_9501.signo_tos;

    datos_AIE.signo_tos.tosres != 'S' ? datos_AIE.signo_tos.resultado = 'SIN TOS O DIFICULTAD PARA RESPIRAR' : false;

    switch (datos_AIE.signo_tos.tosrap) {
        case 'S':
            datos_AIE.signo_tos.tosrap = 'SI';
            break;
        case 'N':
            datos_AIE.signo_tos.tosrap = 'NO';
            break;
        default:
            datos_AIE.signo_tos.tosrap = ' ';
            break;
    }

    switch (datos_AIE.signo_tos.tostri) {
        case 'S':
            datos_AIE.signo_tos.tostri = 'SI';
            break;
        case 'N':
            datos_AIE.signo_tos.tostri = 'NO';
            break;
        default:
            datos_AIE.signo_tos.tostri = ' ';
            break;
    }

    switch (datos_AIE.signo_tos.tosest) {
        case 'S':
            datos_AIE.signo_tos.tosest = 'SI';
            break;
        case 'N':
            datos_AIE.signo_tos.tosest = 'NO';
            break;
        default:
            datos_AIE.signo_tos.tosest = ' ';
            break;
    }

    switch (datos_AIE.signo_tos.tossib) {
        case 'S':
            datos_AIE.signo_tos.tossib = 'SI';
            break;
        case 'N':
            datos_AIE.signo_tos.tossib = 'NO';
            break;
        default:
            datos_AIE.signo_tos.tossib = ' ';
            break;
    }

    switch (datos_AIE.signo_tos.tosapnea) {
        case 'S':
            datos_AIE.signo_tos.tosapnea = 'SI';
            break;
        case 'N':
            datos_AIE.signo_tos.tosapnea = 'NO';
            break;
        default:
            datos_AIE.signo_tos.tosapnea = ' ';
            break;
    }

    switch (datos_AIE.signo_tos.tosbeber) {
        case 'S':
            datos_AIE.signo_tos.tosbeber = 'SI';
            break;
        case 'N':
            datos_AIE.signo_tos.tosbeber = 'NO';
            break;
        default:
            datos_AIE.signo_tos.tosbeber = ' ';
            break;
    }

    switch (datos_AIE.signo_tos.tosomnol) {
        case 'S':
            datos_AIE.signo_tos.tosomnol = 'SI';
            break;
        case 'N':
            datos_AIE.signo_tos.tosomnol = 'NO';
            break;
        default:
            datos_AIE.signo_tos.tosomnol = ' ';
            break;
    }

    datos_AIE.signo_tos.tosibi == 'S' || datos_AIE.signo_tos.tosibi == 'N' ? datos_AIE.signo_tos.flag1 = true : datos_AIE.signo_tos.flag1 = false;
    datos_AIE.signo_tos.tosibi == 'S' ? datos_AIE.signo_tos.flag2 = true : datos_AIE.signo_tos.flag2 = false;
    datos_AIE.signo_tos.tosgrip == 'S' ? datos_AIE.signo_tos.flag3 = true : datos_AIE.signo_tos.flag3 = false;
    datos_AIE.signo_tos.tosprem == 'S' ? datos_AIE.signo_tos.flag4 = true : datos_AIE.signo_tos.flag4 = false;

    datos_AIE.signo_tos.resultado = '';

    $_AIEPI010.dato_9501.var_resp.crup_grave == 1 ? datos_AIE.signo_tos.resultado = 'CRUP GRAVE\n' : false;
    $_AIEPI010.dato_9501.var_resp.bronquiolitis_grave == 1 ? datos_AIE.signo_tos.resultado += 'BRONQUIOLITIS GRAVE\n' : false;
    $_AIEPI010.dato_9501.var_resp.sibilancia_grave == 1 ? datos_AIE.signo_tos.resultado += 'SIBILANCIA (RECURRENTE) GRAVE\n' : false;
    $_AIEPI010.dato_9501.var_resp.crup_leve == 1 ? datos_AIE.signo_tos.resultado += 'CRUP\n' : false;
    $_AIEPI010.dato_9501.var_resp.bronquiolitis_leve == 1 ? datos_AIE.signo_tos.resultado += 'BRONQUIOLITIS\n' : false;
    $_AIEPI010.dato_9501.var_resp.sibilancia_leve == 1 ? datos_AIE.signo_tos.resultado += 'SIBILANCIA(RECURRENTE)\n' : false;
    $_AIEPI010.dato_9501.var_resp.neumo_grave == 1 ? datos_AIE.signo_tos.resultado += 'NEUMONIA GRAVE\n' : false;
    $_AIEPI010.dato_9501.var_resp.neumo_leve == 1 ? datos_AIE.signo_tos.resultado += 'NEUMONIA\n' : false;
    $_AIEPI010.dato_9501.var_resp.resfriado == 1 ? datos_AIE.signo_tos.resultado += 'TOS O RESFRIADO\n' : false;

    // INI DIARREA

    datos_AIE.signo_diare = $_AIEPI010.dato_9501.signo_diare;
    $_AIEPI010.dato_9501.signo_diare.diarre != 'S' ? datos_AIE.signo_diare.resultado = 'NO TIENE DIARREA\n' : false;

    switch (parseInt(datos_AIE.signo_diare.dialet)) {
        case 1:
            datos_AIE.signo_diare.dialet = '1. ALERTA INTRANQ. IRRITABL';
            break;
        case 2:
            datos_AIE.signo_diare.dialet = '2. LETARGICO O INCONSCIENTE';
            break;
        default:
            datos_AIE.signo_diare.dialet = ' ';
            break;
    }

    datos_AIE.signo_diare.diasan == 'S' ? datos_AIE.signo_diare.flag1 = true : datos_AIE.signo_diare.flag1 = false;
    datos_AIE.signo_diare.diavom_cant > 0 ? datos_AIE.signo_diare.flag2 = true : datos_AIE.signo_diare.flag2 = false;

    switch (datos_AIE.signo_diare.diaojo) {
        case 'S':
            datos_AIE.signo_diare.diaojo = 'SI';
            break;
        case 'N':
            datos_AIE.signo_diare.diaojo = 'NO';
            break;
        default:
            datos_AIE.signo_diare.diaojo = ' ';
            break;
    }

    switch (parseInt(datos_AIE.signo_diare.bebsed)) {
        case 1:
            datos_AIE.signo_diare.bebsed = '1.NO BEBE, BEBE CON DIFICUL';
            break;
        case 2:
            datos_AIE.signo_diare.bebsed = '2.BEBE AVIDAMENTE CON SED';
            break;
        case 3:
            datos_AIE.signo_diare.bebsed = '3.LA RECHAZA';
            break;
        case 4:
            datos_AIE.signo_diare.bebsed = '4.BEBE NORMALMENTE';
            break;
        default:
            datos_AIE.signo_diare.bebsed = ' ';
            break;
    }

    switch (parseInt(datos_AIE.signo_diare.pliegu)) {
        case 1:
            datos_AIE.signo_diare.pliegu = '1.NORMAL';
            break;
        case 2:
            datos_AIE.signo_diare.pliegu = '2.LENTO';
            break;
        case 3:
            datos_AIE.signo_diare.pliegu = '3.MUY LENTO';
            break;
        default:
            datos_AIE.signo_diare.pliegu = ' ';
            break;
    }

    datos_AIE.signo_diare.resultado = '';

    $_AIEPI010.dato_9501.var_diarr.diarre_grave == 1 ? datos_AIE.signo_diare.resultado += 'DIARREA CON DESHIDRATAC GRAVE\n' : false;
    $_AIEPI010.dato_9501.var_diarr.diarre_deshi == 1 ? datos_AIE.signo_diare.resultado += 'DIARREA ALGUN GRADO DESHIDRAT\n' : false;
    $_AIEPI010.dato_9501.var_diarr.diarre_riesg == 1 ? datos_AIE.signo_diare.resultado += 'DIARREA ALTO RIESGO DESHIDRAT\n' : false;
    $_AIEPI010.dato_9501.var_diarr.diarre_leve == 1 ? datos_AIE.signo_diare.resultado += 'DIARREA SIN DESHIDRATACION\n' : false;
    $_AIEPI010.dato_9501.var_diarr.diarre_pers_grave == 1 ? datos_AIE.signo_diare.resultado += 'DIARREA PERSISTENTE GRAVE\n' : false;
    $_AIEPI010.dato_9501.var_diarr.diarre_pers_leve == 1 ? datos_AIE.signo_diare.resultado += 'DIARREA PERSISTENTE\n' : false;
    $_AIEPI010.dato_9501.var_diarr.disenteria == 1 ? datos_AIE.signo_diare.resultado += 'DISENTERIA\n' : false;

    // INI FIEBRE

    datos_AIE.signo_fiebr = $_AIEPI010.dato_9501.signo_fiebr;
    datos_AIE.signo_fiebr.resultado = '';
    $_AIEPI010.dato_9501.signo_fiebr.diarre != 'S' ? datos_AIE.signo_fiebr.resultado = 'NO TIENE FIEBRE\n' : false;

    datos_AIE.signo_fiebr.fietodia == 'S' ? datos_AIE.signo_fiebr.flag1 = true : datos_AIE.signo_fiebr.flag1 = false;

    switch (datos_AIE.signo_fiebr.fierig) {
        case 'S':
            datos_AIE.signo_fiebr.fierig = 'SI';
            break;
        case 'N':
            datos_AIE.signo_fiebr.fierig = 'NO';
            break;
        default:
            datos_AIE.signo_fiebr.fierig = ' ';
            break;
    }

    switch (datos_AIE.signo_fiebr.fieapari) {
        case 'S':
            datos_AIE.signo_fiebr.fieapari = 'SI';
            break;
        case 'N':
            datos_AIE.signo_fiebr.fieapari = 'NO';
            break;
        default:
            datos_AIE.signo_fiebr.fieapari = ' ';
            break;
    }

    switch (datos_AIE.signo_fiebr.fiesan) {
        case 'S':
            datos_AIE.signo_fiebr.fiesan = 'SI';
            break;
        case 'N':
            datos_AIE.signo_fiebr.fiesan = 'NO';
            break;
        default:
            datos_AIE.signo_fiebr.fiesan = ' ';
            break;
    }

    switch (parseInt(datos_AIE.signo_fiebr.fiesocial)) {
        case 1:
            datos_AIE.signo_fiebr.fiesocial = '1. NINGUNA RESPUESTA AL ESTIMULO';
            break;
        case 2:
            datos_AIE.signo_fiebr.fiesocial = '2. RESPUESTA INADECUADA AL ESTIMULO';
            break;
        case 3:
            datos_AIE.signo_fiebr.fiesocial = '3. RESPUESTA ADECUADA AL ESTIMULO';
            break;
        default:
            datos_AIE.signo_fiebr.fiesocial = ' ';
            break;
    }

    switch (datos_AIE.signo_fiebr.fiemanif) {
        case 'S':
            datos_AIE.signo_fiebr.fiemanif = 'SI';
            break;
        case 'N':
            datos_AIE.signo_fiebr.fiemanif = 'NO';
            break;
        default:
            datos_AIE.signo_fiebr.fiemanif = ' ';
            break;
    }

    switch (datos_AIE.signo_fiebr.fiepie) {
        case 'S':
            datos_AIE.signo_fiebr.fiepie = 'SI';
            break;
        case 'N':
            datos_AIE.signo_fiebr.fiepie = 'NO';
            break;
        default:
            datos_AIE.signo_fiebr.fiepie = ' ';
            break;
    }

    switch (datos_AIE.signo_fiebr.fieciano) {
        case 'S':
            datos_AIE.signo_fiebr.fieciano = 'SI';
            break;
        case 'N':
            datos_AIE.signo_fiebr.fieciano = 'NO';
            break;
        default:
            datos_AIE.signo_fiebr.fieciano = ' ';
            break;
    }

    switch (datos_AIE.signo_fiebr.fieconvul) {
        case 'S':
            datos_AIE.signo_fiebr.fieconvul = 'SI';
            break;
        case 'N':
            datos_AIE.signo_fiebr.fieconvul = 'NO';
            break;
        default:
            datos_AIE.signo_fiebr.fieconvul = ' ';
            break;
    }

    switch (datos_AIE.signo_fiebr.fieeru) {
        case 'S':
            datos_AIE.signo_fiebr.fieeru = 'SI';
            break;
        case 'N':
            datos_AIE.signo_fiebr.fieeru = 'NO';
            break;
        default:
            datos_AIE.signo_fiebr.fieeru = ' ';
            break;
    }

    switch (datos_AIE.signo_fiebr.fiedeng) {
        case 'S':
            datos_AIE.signo_fiebr.fiedeng = 'SI';
            break;
        case 'N':
            datos_AIE.signo_fiebr.fiedeng = 'NO';
            break;
        default:
            datos_AIE.signo_fiebr.fiedeng = ' ';
            break;
    }

    datos_AIE.signo_fiebr.fietodia == 'S' ? datos_AIE.signo_fiebr.flag2 = true : datos_AIE.signo_fiebr.flag2 = false;

    switch (datos_AIE.signo_fiebr.fiecef) {
        case 'S':
            datos_AIE.signo_fiebr.fiecef = 'SI';
            break;
        case 'N':
            datos_AIE.signo_fiebr.fiecef = 'NO';
            break;
        default:
            datos_AIE.signo_fiebr.fiecef = ' ';
            break;
    }

    switch (datos_AIE.signo_fiebr.fiemial) {
        case 'S':
            datos_AIE.signo_fiebr.fiemial = 'SI';
            break;
        case 'N':
            datos_AIE.signo_fiebr.fiemial = 'NO';
            break;
        default:
            datos_AIE.signo_fiebr.fiemial = ' ';
            break;
    }

    switch (datos_AIE.signo_fiebr.fieastr) {
        case 'S':
            datos_AIE.signo_fiebr.fieastr = 'SI';
            break;
        case 'N':
            datos_AIE.signo_fiebr.fieastr = 'NO';
            break;
        default:
            datos_AIE.signo_fiebr.fieastr = ' ';
            break;
    }

    switch (datos_AIE.signo_fiebr.fieasp) {
        case 'S':
            datos_AIE.signo_fiebr.fieasp = 'SI';
            break;
        case 'N':
            datos_AIE.signo_fiebr.fieasp = 'NO';
            break;
        default:
            datos_AIE.signo_fiebr.fieasp = ' ';
            break;
    }

    switch (datos_AIE.signo_fiebr.fieocu) {
        case 'S':
            datos_AIE.signo_fiebr.fieocu = 'SI';
            break;
        case 'N':
            datos_AIE.signo_fiebr.fieocu = 'NO';
            break;
        default:
            datos_AIE.signo_fiebr.fieocu = ' ';
            break;
    }

    switch (datos_AIE.signo_fiebr.fiemalur) {
        case 'S':
            datos_AIE.signo_fiebr.fiemalur = 'SI';
            break;
        case 'N':
            datos_AIE.signo_fiebr.fiemalur = 'NO';
            break;
        default:
            datos_AIE.signo_fiebr.fiemalur = ' ';
            break;
    }

    switch (datos_AIE.signo_fiebr.fiemalru) {
        case 'S':
            datos_AIE.signo_fiebr.fiemalru = 'SI';
            break;
        case 'N':
            datos_AIE.signo_fiebr.fiemalru = 'NO';
            break;
        default:
            datos_AIE.signo_fiebr.fiemalru = ' ';
            break;
    }

    switch (datos_AIE.signo_fiebr.fiepost) {
        case 'S':
            datos_AIE.signo_fiebr.fiepost = 'SI';
            break;
        case 'N':
            datos_AIE.signo_fiebr.fiepost = 'NO';
            break;
        default:
            datos_AIE.signo_fiebr.fiepost = ' ';
            break;
    }

    switch (datos_AIE.signo_fiebr.fietorn) {
        case 'S':
            datos_AIE.signo_fiebr.fietorn = 'SI';
            break;
        case 'N':
            datos_AIE.signo_fiebr.fietorn = 'NO';
            break;
        default:
            datos_AIE.signo_fiebr.fietorn = ' ';
            break;
    }

    switch (datos_AIE.signo_fiebr.fielipo) {
        case 'S':
            datos_AIE.signo_fiebr.fielipo = 'SI';
            break;
        case 'N':
            datos_AIE.signo_fiebr.fielipo = 'NO';
            break;
        default:
            datos_AIE.signo_fiebr.fielipo = ' ';
            break;
    }

    switch (datos_AIE.signo_fiebr.fiehepa) {
        case 'S':
            datos_AIE.signo_fiebr.fiehepa = 'SI';
            break;
        case 'N':
            datos_AIE.signo_fiebr.fiehepa = 'NO';
            break;
        default:
            datos_AIE.signo_fiebr.fiehepa = ' ';
            break;
    }

    datos_AIE.signo_fiebr.fiediure == 'S' ? datos_AIE.signo_fiebr.flag3 = true : datos_AIE.signo_fiebr.flag3 = false;

    switch (datos_AIE.signo_fiebr.fiepulso) {
        case 'S':
            datos_AIE.signo_fiebr.fiepulso = 'SI';
            break;
        case 'N':
            datos_AIE.signo_fiebr.fiepulso = 'NO';
            break;
        default:
            datos_AIE.signo_fiebr.fiepulso = ' ';
            break;
    }

    switch (datos_AIE.signo_fiebr.fiecapi) {
        case 'S':
            datos_AIE.signo_fiebr.fiecapi = 'SI';
            break;
        case 'N':
            datos_AIE.signo_fiebr.fiecapi = 'NO';
            break;
        default:
            datos_AIE.signo_fiebr.fiecapi = ' ';
            break;
    }

    switch (datos_AIE.signo_fiebr.fieascit) {
        case 'S':
            datos_AIE.signo_fiebr.fieascit = 'SI';
            break;
        case 'N':
            datos_AIE.signo_fiebr.fieascit = 'NO';
            break;
        default:
            datos_AIE.signo_fiebr.fieascit = ' ';
            break;
    }

    switch (datos_AIE.signo_fiebr.fieleucop) {
        case 'S':
            datos_AIE.signo_fiebr.fieleucop = 'SI';
            break;
        case 'N':
            datos_AIE.signo_fiebr.fieleucop = 'NO';
            break;
        default:
            datos_AIE.signo_fiebr.fieleucop = ' ';
            break;
    }

    switch (datos_AIE.signo_fiebr.fieneumo) {
        case 'S':
            datos_AIE.signo_fiebr.fieneumo = 'SI';
            break;
        case 'N':
            datos_AIE.signo_fiebr.fieneumo = 'NO';
            break;
        default:
            datos_AIE.signo_fiebr.fieneumo = ' ';
            break;
    }

    switch (datos_AIE.signo_fiebr.fieneuro) {
        case 'S':
            datos_AIE.signo_fiebr.fieneuro = 'SI';
            break;
        case 'N':
            datos_AIE.signo_fiebr.fieneuro = 'NO';
            break;
        default:
            datos_AIE.signo_fiebr.fieneuro = ' ';
            break;
    }

    switch (datos_AIE.signo_fiebr.fietrombo) {
        case 'S':
            datos_AIE.signo_fiebr.fietrombo = 'SI';
            break;
        case 'N':
            datos_AIE.signo_fiebr.fietrombo = 'NO';
            break;
        default:
            datos_AIE.signo_fiebr.fietrombo = ' ';
            break;
    }

    switch (datos_AIE.signo_fiebr.fie_tgo) {
        case 'S':
            datos_AIE.signo_fiebr.fie_tgo = 'SI';
            break;
        case 'N':
            datos_AIE.signo_fiebr.fie_tgo = 'NO';
            break;
        default:
            datos_AIE.signo_fiebr.fie_tgo = ' ';
            break;
    }

    switch (datos_AIE.signo_fiebr.fiehemato) {
        case 'S':
            datos_AIE.signo_fiebr.fiehemato = 'SI';
            break;
        case 'N':
            datos_AIE.signo_fiebr.fiehemato = 'NO';
            break;
        default:
            datos_AIE.signo_fiebr.fiehemato = ' ';
            break;
    }

    switch (datos_AIE.signo_fiebr.fieparc) {
        case 'S':
            datos_AIE.signo_fiebr.fieparc = 'SI';
            break;
        case 'N':
            datos_AIE.signo_fiebr.fieparc = 'NO';
            break;
        default:
            datos_AIE.signo_fiebr.fieparc = ' ';
            break;
    }

    switch (datos_AIE.signo_fiebr.fiegota) {
        case 'S':
            datos_AIE.signo_fiebr.fiegota = 'SI';
            break;
        case 'N':
            datos_AIE.signo_fiebr.fiegota = 'NO';
            break;
        default:
            datos_AIE.signo_fiebr.fiegota = ' ';
            break;
    }

    $_AIEPI010.dato_9501.var_fiebre.febril_grave == 1 ? datos_AIE.signo_fiebr.resultado += 'ENFERMEDAD FEBRIL RIESGO ALTO\n' : false;
    $_AIEPI010.dato_9501.var_fiebre.febril_inter == 1 ? datos_AIE.signo_fiebr.resultado += 'ENFERMED. FEBRIL RIESGO INTERM\n' : false;
    $_AIEPI010.dato_9501.var_fiebre.febril_leve == 1 ? datos_AIE.signo_fiebr.resultado += 'ENFERMEDAD FEBRIL RIESGO BAJO\n' : false;
    $_AIEPI010.dato_9501.var_fiebre.malaria_grave == 1 ? datos_AIE.signo_fiebr.resultado += 'MALARIA COMPLICADA\n' : false;
    $_AIEPI010.dato_9501.var_fiebre.malaria_leve == 1 ? datos_AIE.signo_fiebr.resultado += 'MALARIA\n' : false;
    $_AIEPI010.dato_9501.var_fiebre.dengue_grave == 1 ? datos_AIE.signo_fiebr.resultado += 'DENGUE GRAVE\n' : false;
    $_AIEPI010.dato_9501.var_fiebre.dengue_inter == 1 ? datos_AIE.signo_fiebr.resultado += 'DENGUE CON SIGNOS DE ALARMA\n' : false;
    $_AIEPI010.dato_9501.var_fiebre.dengue_proba == 1 ? datos_AIE.signo_fiebr.resultado += 'PROBABLE DENGUE\n' : false;

    // INI OIDO

    datos_AIE.signo_oido = $_AIEPI010.dato_9501.signo_oido;

    datos_AIE.signo_oido.oiddol == 'S' ? datos_AIE.signo_oido.flag1 = true : datos_AIE.signo_oido.flag1 = false;

    switch (datos_AIE.signo_oido.oidtac) {
        case 'S':
            datos_AIE.signo_oido.oidtac = 'SI';
            break;
        case 'N':
            datos_AIE.signo_oido.oidtac = 'NO';
            break;
        default:
            datos_AIE.signo_oido.oidtac = ' ';
            break;
    }

    datos_AIE.signo_oido.oidsup == 'S' ? datos_AIE.signo_oido.flag2 = true : datos_AIE.signo_oido.flag2 = false;

    switch (datos_AIE.signo_oido.oidtim) {
        case 'S':
            datos_AIE.signo_oido.oidtim = 'SI';
            break;
        case 'N':
            datos_AIE.signo_oido.oidtim = 'NO';
            break;
        default:
            datos_AIE.signo_oido.oidtim = ' ';
            break;
    }

    datos_AIE.signo_oido.resultado = '';

    $_AIEPI010.dato_9501.var_oido.mastoid_grave == 1 ? datos_AIE.signo_oido.resultado += 'MASTOIDITIS\n' : false;
    $_AIEPI010.dato_9501.var_oido.otitis_cronic == 1 ? datos_AIE.signo_oido.resultado += 'OTITIS MEDIA CRONICA\n' : false;
    $_AIEPI010.dato_9501.var_oido.otitis_recurr == 1 ? datos_AIE.signo_oido.resultado += 'OTITIS MEDIA RECURRENTE\n' : false;
    $_AIEPI010.dato_9501.var_oido.otitis_aguda == 1 ? datos_AIE.signo_oido.resultado += 'OTITIS MEDIA AGUDA\n' : false;
    $_AIEPI010.dato_9501.var_oido.otitis_notiene == 1 ? datos_AIE.signo_oido.resultado += 'NO TIENE OTITIS MEDIA\n' : false;

    // INI GARGANTA

    datos_AIE.signo_gargan = $_AIEPI010.dato_9501.signo_gargan;

    datos_AIE.signo_gargan.gardol == 'S' ? datos_AIE.signo_gargan.flag1 = true : datos_AIE.signo_gargan.flag1 = false;

    switch (datos_AIE.signo_gargan.garcue) {
        case 'S':
            datos_AIE.signo_gargan.garcue = 'SI';
            break;
        case 'N':
            datos_AIE.signo_gargan.garcue = 'NO';
            break;
        default:
            datos_AIE.signo_gargan.garcue = ' ';
            break;
    }

    switch (datos_AIE.signo_gargan.garexu) {
        case 'S':
            datos_AIE.signo_gargan.garexu = 'SI';
            break;
        case 'N':
            datos_AIE.signo_gargan.garexu = 'NO';
            break;
        default:
            datos_AIE.signo_gargan.garexu = ' ';
            break;
    }

    datos_AIE.signo_gargan.resultado = '';
    $_AIEPI010.dato_9501.var_garganta.faringo_bacte == 1 ? datos_AIE.signo_gargan.resultado += 'FARINGOAMIGDALITIS ESTREPTOCOCICA\n' : false;
    $_AIEPI010.dato_9501.var_garganta.faringo_viral == 1 ? datos_AIE.signo_gargan.resultado += 'FARINGOAMIGDALITIS VIRAL\n' : false;
    $_AIEPI010.dato_9501.var_garganta.faringo_notiene == 1 ? datos_AIE.signo_gargan.resultado += 'NO TIENE FARINGOAMIGDALITIS\n' : false;

    // INI SALUD BUCAL

    datos_AIE.signo_salbuc = $_AIEPI010.dato_9501.signo_salbuc;

    switch (datos_AIE.signo_salbuc.salbuc_odont) {
        case 'S':
            datos_AIE.signo_salbuc.salbuc_odont = 'SI';
            break;
        case 'N':
            datos_AIE.signo_salbuc.salbuc_odont = 'NO';
            break;
        default:
            datos_AIE.signo_salbuc.salbuc_odont = ' ';
            break;
    }

    switch (datos_AIE.signo_salbuc.salbuc_edema) {
        case 'S':
            datos_AIE.signo_salbuc.salbuc_edema = 'SI';
            break;
        case 'N':
            datos_AIE.signo_salbuc.salbuc_edema = 'NO';
            break;
        default:
            datos_AIE.signo_salbuc.salbuc_edema = ' ';
            break;
    }

    switch (datos_AIE.signo_salbuc.salbuc_biber) {
        case 'S':
            datos_AIE.signo_salbuc.salbuc_biber = 'SI';
            break;
        case 'N':
            datos_AIE.signo_salbuc.salbuc_biber = 'NO';
            break;
        default:
            datos_AIE.signo_salbuc.salbuc_biber = ' ';
            break;
    }

    switch (datos_AIE.signo_salbuc.salbuc_inflam) {
        case 'S':
            datos_AIE.signo_salbuc.salbuc_inflam = 'SI';
            break;
        case 'N':
            datos_AIE.signo_salbuc.salbuc_inflam = 'NO';
            break;
        default:
            datos_AIE.signo_salbuc.salbuc_inflam = ' ';
            break;
    }

    switch (datos_AIE.signo_salbuc.salbuc_enroje) {
        case 'S':
            datos_AIE.signo_salbuc.salbuc_enroje = 'SI';
            break;
        case 'N':
            datos_AIE.signo_salbuc.salbuc_enroje = 'NO';
            break;
        default:
            datos_AIE.signo_salbuc.salbuc_enroje = ' ';
            break;
    }

    switch (datos_AIE.signo_salbuc.salbuc_anteced) {
        case 'S':
            datos_AIE.signo_salbuc.salbuc_anteced = 'SI';
            break;
        case 'N':
            datos_AIE.signo_salbuc.salbuc_anteced = 'NO';
            break;
        default:
            datos_AIE.signo_salbuc.salbuc_anteced = ' ';
            break;
    }

    switch (datos_AIE.signo_salbuc.salbuc_trauma) {
        case 'S':
            datos_AIE.signo_salbuc.salbuc_trauma = 'SI';
            break;
        case 'N':
            datos_AIE.signo_salbuc.salbuc_trauma = 'NO';
            break;
        default:
            datos_AIE.signo_salbuc.salbuc_trauma = ' ';
            break;
    }

    switch (datos_AIE.signo_salbuc.salbuc_gingiv) {
        case 'S':
            datos_AIE.signo_salbuc.salbuc_gingiv = 'SI';
            break;
        case 'N':
            datos_AIE.signo_salbuc.salbuc_gingiv = 'NO';
            break;
        default:
            datos_AIE.signo_salbuc.salbuc_gingiv = ' ';
            break;
    }

    switch (datos_AIE.signo_salbuc.salbuc_color) {
        case 'S':
            datos_AIE.signo_salbuc.salbuc_color = 'SI';
            break;
        case 'N':
            datos_AIE.signo_salbuc.salbuc_color = 'NO';
            break;
        default:
            datos_AIE.signo_salbuc.salbuc_color = ' ';
            break;
    }

    switch (datos_AIE.signo_salbuc.salbuc_abceso) {
        case 'S':
            datos_AIE.signo_salbuc.salbuc_abceso = 'SI';
            break;
        case 'N':
            datos_AIE.signo_salbuc.salbuc_abceso = 'NO';
            break;
        default:
            datos_AIE.signo_salbuc.salbuc_abceso = ' ';
            break;
    }

    switch (datos_AIE.signo_salbuc.salbuc_movil) {
        case 'S':
            datos_AIE.signo_salbuc.salbuc_movil = 'SI';
            break;
        case 'N':
            datos_AIE.signo_salbuc.salbuc_movil = 'NO';
            break;
        default:
            datos_AIE.signo_salbuc.salbuc_movil = ' ';
            break;
    }

    switch (datos_AIE.signo_salbuc.salbuc_dolor) {
        case 'S':
            datos_AIE.signo_salbuc.salbuc_dolor = 'SI';
            break;
        case 'N':
            datos_AIE.signo_salbuc.salbuc_dolor = 'NO';
            break;
        default:
            datos_AIE.signo_salbuc.salbuc_dolor = ' ';
            break;
    }

    switch (datos_AIE.signo_salbuc.salbuc_lesion) {
        case 'S':
            datos_AIE.signo_salbuc.salbuc_lesion = 'SI';
            break;
        case 'N':
            datos_AIE.signo_salbuc.salbuc_lesion = 'NO';
            break;
        default:
            datos_AIE.signo_salbuc.salbuc_lesion = ' ';
            break;
    }

    switch (datos_AIE.signo_salbuc.salbuc_fractu) {
        case 'S':
            datos_AIE.signo_salbuc.salbuc_fractu = 'SI';
            break;
        case 'N':
            datos_AIE.signo_salbuc.salbuc_fractu = 'NO';
            break;
        default:
            datos_AIE.signo_salbuc.salbuc_fractu = ' ';
            break;
    }

    switch (datos_AIE.signo_salbuc.salbuc_mancha) {
        case 'S':
            datos_AIE.signo_salbuc.salbuc_mancha = 'SI';
            break;
        case 'N':
            datos_AIE.signo_salbuc.salbuc_mancha = 'NO';
            break;
        default:
            datos_AIE.signo_salbuc.salbuc_mancha = ' ';
            break;
    }

    switch (datos_AIE.signo_salbuc.salbuc_perdida) {
        case 'S':
            datos_AIE.signo_salbuc.salbuc_perdida = 'SI';
            break;
        case 'N':
            datos_AIE.signo_salbuc.salbuc_perdida = 'NO';
            break;
        default:
            datos_AIE.signo_salbuc.salbuc_perdida = ' ';
            break;
    }

    switch (datos_AIE.signo_salbuc.salbuc_caries) {
        case 'S':
            datos_AIE.signo_salbuc.salbuc_caries = 'SI';
            break;
        case 'N':
            datos_AIE.signo_salbuc.salbuc_caries = 'NO';
            break;
        default:
            datos_AIE.signo_salbuc.salbuc_caries = ' ';
            break;
    }

    switch (datos_AIE.signo_salbuc.salbuc_ulcera) {
        case 'S':
            datos_AIE.signo_salbuc.salbuc_ulcera = 'SI';
            break;
        case 'N':
            datos_AIE.signo_salbuc.salbuc_ulcera = 'NO';
            break;
        default:
            datos_AIE.signo_salbuc.salbuc_ulcera = ' ';
            break;
    }

    switch (datos_AIE.signo_salbuc.salbuc_placa) {
        case 'S':
            datos_AIE.signo_salbuc.salbuc_placa = 'SI';
            break;
        case 'N':
            datos_AIE.signo_salbuc.salbuc_placa = 'NO';
            break;
        default:
            datos_AIE.signo_salbuc.salbuc_placa = ' ';
            break;
    }

    switch (datos_AIE.signo_salbuc.salbuc_exudado) {
        case 'S':
            datos_AIE.signo_salbuc.salbuc_exudado = 'SI';
            break;
        case 'N':
            datos_AIE.signo_salbuc.salbuc_exudado = 'NO';
            break;
        default:
            datos_AIE.signo_salbuc.salbuc_exudado = ' ';
            break;
    }

    switch (datos_AIE.signo_salbuc.salbuc_cepil) {
        case 'S':
            datos_AIE.signo_salbuc.salbuc_cepil = 'SI';
            break;
        case 'N':
            datos_AIE.signo_salbuc.salbuc_cepil = 'NO';
            break;
        default:
            datos_AIE.signo_salbuc.salbuc_cepil = ' ';
            break;
    }

    datos_AIE.signo_salbuc.resultado = '';

    $_AIEPI010.dato_9501.var_bucal.celulit_faci == 1 ? datos_AIE.signo_salbuc.resultado += 'CELULITIS FACIAL\n' : false;
    $_AIEPI010.dato_9501.var_bucal.enfer_bucal == 1 ? datos_AIE.signo_salbuc.resultado += 'ENFERMEDAD BUCAL GRAVE\n' : false;
    $_AIEPI010.dato_9501.var_bucal.trauma_bucal == 1 ? datos_AIE.signo_salbuc.resultado += 'TRAUMA BUCODENTAL\n' : false;
    $_AIEPI010.dato_9501.var_bucal.estomatitis == 1 ? datos_AIE.signo_salbuc.resultado += 'ESTOMATITIS\n' : false;
    $_AIEPI010.dato_9501.var_bucal.enfer_denta_gingi == 1 ? datos_AIE.signo_salbuc.resultado += 'ENFERMEDA DENTAL Y GINGIVAL\n' : false;
    $_AIEPI010.dato_9501.var_bucal.enfer_bucal_riesg == 1 ? datos_AIE.signo_salbuc.resultado += 'ALTO RIEGO DE ENFERMEDAD BUCAL\n' : false;
    $_AIEPI010.dato_9501.var_bucal.enfer_bucal_leve == 1 ? datos_AIE.signo_salbuc.resultado += 'BAJO RIESGO DE ENFERMEDAD BUCAL\n' : false;

    // INI CRECIMIENTO

    datos_AIE.signo_desnut = $_AIEPI010.dato_9501.signo_desnut;

    datos_AIE.signo_desnut.desema == 'S' ? datos_AIE.signo_desnut.flag1 = true : datos_AIE.signo_desnut.flag1 = false;
    datos_AIE.signo_desnut.desede == 'S' ? datos_AIE.signo_desnut.flag2 = true : datos_AIE.signo_desnut.flag2 = false;

    // LLENAR TABLA DE SIGNOS CRECIMIENTO
    await leerTablaOms_AIEPI010();

    datos_AIE.signo_desnut.resultado = '\n';

    var x = await calcularOms_AIEPI010('PXE');
    datos_AIE.signo_desnut.pes_ed_m3 = x.oms_M3;
    datos_AIE.signo_desnut.pes_ed_m2 = x.oms_M2;
    datos_AIE.signo_desnut.pes_ed_m1 = x.oms_M1;
    datos_AIE.signo_desnut.pes_ed_0 = x.oms_0;
    datos_AIE.signo_desnut.pes_ed_1 = x.oms_1;
    datos_AIE.signo_desnut.pes_ed_2 = x.oms_2;
    datos_AIE.signo_desnut.pes_ed_3 = x.oms_3;

    if (parseInt(datos_AIE.signo_desnut.pes_ed_estad) > 1) {
        datos_AIE.signo_desnut.descripPXE = 'NO APLICA (VERIFICAR CON IMC/E)';
    } else if (parseInt(datos_AIE.signo_desnut.pes_ed_estad) > -2 && parseInt(datos_AIE.signo_desnut.pes_ed_estad) <= -1) {
        datos_AIE.signo_desnut.descripPXE = 'RIESGO DE DESNUTRICION GLOBAL';
    } else if (parseInt(datos_AIE.signo_desnut.pes_ed_estad) > -1 && parseInt(datos_AIE.signo_desnut.pes_ed_estad) < 1) {
        datos_AIE.signo_desnut.descripPXE = 'PESO ADECUADO PARA LA EDAD';
    } else if (parseInt(datos_AIE.signo_desnut.pes_ed_estad) <= -2) {
        datos_AIE.signo_desnut.descripPXE = 'DESNUTRICION GLOBAL';
    } else {
        datos_AIE.signo_desnut.descripPXE = '';
    }

    var x = await calcularOms_AIEPI010('TXE');
    datos_AIE.signo_desnut.talla_ed_m3 = x.oms_M3;
    datos_AIE.signo_desnut.talla_ed_m2 = x.oms_M2;
    datos_AIE.signo_desnut.talla_ed_m1 = x.oms_M1;
    datos_AIE.signo_desnut.talla_ed_0 = x.oms_0;
    datos_AIE.signo_desnut.talla_ed_1 = x.oms_1;
    datos_AIE.signo_desnut.talla_ed_2 = x.oms_2;
    datos_AIE.signo_desnut.talla_ed_3 = x.oms_3;

    if (parseInt(datos_AIE.signo_desnut.talla_ed_estad) > -1) {
        datos_AIE.signo_desnut.descripTXE = 'TALLA ADECUADA PARA LA EDAD';
    } else if (parseInt(datos_AIE.signo_desnut.talla_ed_estad) > -2 && parseInt(datos_AIE.signo_desnut.talla_ed_estad) <= -1) {
        datos_AIE.signo_desnut.descripTXE = 'RIESGO DE TALLA BAJA';
    } else if (parseInt(datos_AIE.signo_desnut.talla_ed_estad) <= -2) {
        datos_AIE.signo_desnut.descripTXE = 'TALLA BAJA PARA LA EDAD O RETRA EN TALLA';
    } else {
        datos_AIE.signo_desnut.descripTXE = '';
    }

    var x = await calcularOms_AIEPI010('PXT');
    datos_AIE.signo_desnut.peso_tal_m3 = x.oms_M3;
    datos_AIE.signo_desnut.peso_tal_m2 = x.oms_M2;
    datos_AIE.signo_desnut.peso_tal_m1 = x.oms_M1;
    datos_AIE.signo_desnut.peso_tal_0 = x.oms_0;
    datos_AIE.signo_desnut.peso_tal_1 = x.oms_1;
    datos_AIE.signo_desnut.peso_tal_2 = x.oms_2;
    datos_AIE.signo_desnut.peso_tal_3 = x.oms_3;
    (parseFloat(datos_AIE.signo_desnut.peso_tal_estad) > 3) ? datos_AIE.signo_desnut.peso_tal_estad = 3: false;

    if (parseInt(datos_AIE.signo_desnut.peso_tal_estad) >= 3) {
        datos_AIE.signo_desnut.descripPXT = 'OBESIDAD';
    } else if (parseInt(datos_AIE.signo_desnut.peso_tal_estad) >= 2 && parseInt(datos_AIE.signo_desnut.peso_tal_estad) < 3) {
        datos_AIE.signo_desnut.descripPXT = 'SOBREPESO';
    } else if (parseInt(datos_AIE.signo_desnut.peso_tal_estad) >= 1 && parseInt(datos_AIE.signo_desnut.peso_tal_estad) < 2) {
        datos_AIE.signo_desnut.descripPXT = 'RIESGO DE SOBREPESO';
    } else if (parseInt(datos_AIE.signo_desnut.peso_tal_estad) > -1 && parseInt(datos_AIE.signo_desnut.peso_tal_estad) < 1) {
        datos_AIE.signo_desnut.descripPXT = 'PESO DE ADECUADO PARA LA TALLA';
    } else if (parseInt(datos_AIE.signo_desnut.peso_tal_estad) > -2 && parseInt(datos_AIE.signo_desnut.peso_tal_estad) <= -1) {
        datos_AIE.signo_desnut.descripPXT = 'RIESGO DE DESNUTRICION AGUDA';
    } else if (parseInt(datos_AIE.signo_desnut.peso_tal_estad) <= -2 && parseInt(datos_AIE.signo_desnut.peso_tal_estad) > -3) {
        datos_AIE.signo_desnut.descripPXT = 'DESNUTRICION AGUDA MODERADA';
    } else if (parseInt(datos_AIE.signo_desnut.peso_tal_estad) <= -3) {
        datos_AIE.signo_desnut.descripPXT = 'DESNUTRICION AGUDA SEVERA';
    } else {
        datos_AIE.signo_desnut.descripPXT = '';
    }

    switch (parseInt(datos_AIE.signo_desnut.destend)) {
        case 1:
            datos_AIE.signo_desnut.destend = 'ASCENDENTE';
            break;
        case 2:
            datos_AIE.signo_desnut.destend = 'HORIZONTAL';
            break;
        case 3:
            datos_AIE.signo_desnut.destend = 'DESCENDENTE';
            break;
        default:
            datos_AIE.signo_desnut.destend = ' ';
            break;
    }

    switch (parseInt(datos_AIE.signo_desnut.despal)) {
        case 1:
            datos_AIE.signo_desnut.despal = 'LEVE';
            break;
        case 2:
            datos_AIE.signo_desnut.despal = 'INTENSA';
            break;
        case 3:
            datos_AIE.signo_desnut.despal = 'NO TIENE';
            break;
        default:
            datos_AIE.signo_desnut.despal = ' ';
            break;
    }

    switch (parseInt(datos_AIE.signo_desnut.despalcon)) {
        case 1:
            datos_AIE.signo_desnut.despalcon = 'LEVE';
            break;
        case 2:
            datos_AIE.signo_desnut.despalcon = 'INTENSA';
            break;
        case 3:
            datos_AIE.signo_desnut.despalcon = 'NO TIENE';
            break;
        default:
            datos_AIE.signo_desnut.despalcon = ' ';
            break;
    }

    datos_AIE.signo_desnut.resultado = '';

    $_AIEPI010.dato_9501.var_crecim.obeso == 1 ? datos_AIE.signo_desnut.resultado += 'OBESO\n' : false;
    $_AIEPI010.dato_9501.var_crecim.sobrepeso == 1 ? datos_AIE.signo_desnut.resultado += 'SOBREPESO\n' : false;
    $_AIEPI010.dato_9501.var_crecim.desnutri_grave == 1 ? datos_AIE.signo_desnut.resultado += 'DESNUTRICION SEVERA\n' : false;
    $_AIEPI010.dato_9501.var_crecim.desnutri_leve == 1 ? datos_AIE.signo_desnut.resultado += 'DESNUTRICION MODERADA\n' : false;
    $_AIEPI010.dato_9501.var_crecim.desnutri_riesg == 1 ? datos_AIE.signo_desnut.resultado += 'RIESGO DESNUTRICION AGUDA\n' : false;
    $_AIEPI010.dato_9501.var_crecim.desnutri_notiene == 1 ? datos_AIE.signo_desnut.resultado += 'NO TIENE DESNUTRICION\n' : false;
    $_AIEPI010.dato_9501.var_crecim.anemia_grave == 1 ? datos_AIE.signo_desnut.resultado += 'ANEMIA GRAVE\n' : false;
    $_AIEPI010.dato_9501.var_crecim.anemia_leve == 1 ? datos_AIE.signo_desnut.resultado += 'ANEMIA LEVE\n' : false;
    $_AIEPI010.dato_9501.var_crecim.anemia_notiene == 1 ? datos_AIE.signo_desnut.resultado += 'NO TIENE ANEMIA\n' : false;
    $_AIEPI010.dato_9501.var_crecim.anemia_notiene == 1 ? datos_AIE.signo_desnut.resultado += 'NO TIENE ANEMIA\n' : false;

    datos_AIE.signo_desnut.exa_general_hc = $_AIEPI010.exa_general_hc != undefined ? $_AIEPI010.exa_general_hc : '';

    // ACTIVIDADES

    datos_AIE.signo_desarr = $_AIEPI010.dato_9501.signo_desarr;

    switch (datos_AIE.signo_desarr.desarr) {
        case 'S':
            datos_AIE.signo_desarr.desarr = 'SI';
            break;
        case 'N':
            datos_AIE.signo_desarr.desarr = 'NO';
            break;
        default:
            datos_AIE.signo_desarr.desarr = ' ';
            break;
    }

    var paso_w = 0;
    if ($_AIEPI010.dato_9501.signo_desarr.desarr == 'S') {
        for (var i in datos_AIE.signo_desarr.des_test_act_ant) {
            if (datos_AIE.signo_desarr.des_test_act_ant[i] == 'S') {
                paso_w = 2;
            }
        }
        paso_w != 2 ? paso_w = 1 : false;
    }

    if (paso_w == 2) {
        datos_AIE.signo_desarr.act1 = datos_AIE.signo_desarr.desact;
    } else {
        datos_AIE.signo_desarr.act1 = datos_AIE.signo_desarr.des_desact_ant;
    }

    if (paso_w == 2) {
        datos_AIE.signo_desarr.act2 = datos_AIE.signo_desarr.des_limi_act;
    } else {
        datos_AIE.signo_desarr.act2 = datos_AIE.signo_desarr.des_limi_act_Ant;
    }

    // LLENAR ACTIVIDADES AIEPI830
    if ($_AIEPI010.dato_9501.signo_desarr.desarr == 'S') {
        var actividades = _AIEPI830(paso_w, $_AIEPI010._hcprc.edad_dias);

        for (var i in datos_AIE.signo_desarr.des_test_act_ant) {
            if (datos_AIE.signo_desarr.des_test_act_ant[i] == 'S') {
                datos_AIE.signo_desarr.des_test_act_ant[i] = 'SI';
            } else {
                datos_AIE.signo_desarr.des_test_act_ant[i] = 'NO';
            }

            if (datos_AIE.signo_desarr.des_test_act[i] == 'S') {
                datos_AIE.signo_desarr.des_test_act[i] = 'SI';
            } else {
                datos_AIE.signo_desarr.des_test_act[i] = 'NO';
            }
        }


        datos_AIE.signo_desarr.actividades = [];

        if (paso_w == 2) {
            actividades.cuestionario.forEach((pregunta, index) => {
                datos_AIE.signo_desarr.actividades.push(pregunta + '  ' + datos_AIE.signo_desarr.des_test_act_ant[index]);
            })
        } else {
            actividades.cuestionario.forEach((pregunta, index) => {
                datos_AIE.signo_desarr.actividades.push(pregunta + '  ' + datos_AIE.signo_desarr.des_test_act[index]);
            })
        }
    }

    // INI VACUNACION

    datos_AIE.sig_vacunacion = $_AIEPI010.dato_9501.sig_vacunacion;

    switch (datos_AIE.sig_vacunacion.bsghep) {
        case 'S':
            datos_AIE.sig_vacunacion.bsghep = 'SI';
            break;
        case 'N':
            datos_AIE.sig_vacunacion.bsghep = 'NO';
            break;
        case 'I':
            datos_AIE.sig_vacunacion.bsghep = 'IGNORA';
            break;
        default:
            datos_AIE.sig_vacunacion.bsghep = ' ';
            break;
    }

    switch (datos_AIE.sig_vacunacion.penta1) {
        case 'S':
            datos_AIE.sig_vacunacion.penta1 = 'SI';
            break;
        case 'N':
            datos_AIE.sig_vacunacion.penta1 = 'NO';
            break;
        case 'I':
            datos_AIE.sig_vacunacion.penta1 = 'IGNORA';
            break;
        default:
            datos_AIE.sig_vacunacion.penta1 = ' ';
            break;
    }

    switch (datos_AIE.sig_vacunacion.vavop1) {
        case 'S':
            datos_AIE.sig_vacunacion.vavop1 = 'SI';
            break;
        case 'N':
            datos_AIE.sig_vacunacion.vavop1 = 'NO';
            break;
        case 'I':
            datos_AIE.sig_vacunacion.vavop1 = 'IGNORA';
            break;
        default:
            datos_AIE.sig_vacunacion.vavop1 = ' ';
            break;
    }

    switch (datos_AIE.sig_vacunacion.neumoc1) {
        case 'S':
            datos_AIE.sig_vacunacion.neumoc1 = 'SI';
            break;
        case 'N':
            datos_AIE.sig_vacunacion.neumoc1 = 'NO';
            break;
        case 'I':
            datos_AIE.sig_vacunacion.neumoc1 = 'IGNORA';
            break;
        default:
            datos_AIE.sig_vacunacion.neumoc1 = ' ';
            break;
    }

    switch (datos_AIE.sig_vacunacion.vac_rotavir1) {
        case 'S':
            datos_AIE.sig_vacunacion.vac_rotavir1 = 'SI';
            break;
        case 'N':
            datos_AIE.sig_vacunacion.vac_rotavir1 = 'NO';
            break;
        case 'I':
            datos_AIE.sig_vacunacion.vac_rotavir1 = 'IGNORA';
            break;
        default:
            datos_AIE.sig_vacunacion.vac_rotavir1 = ' ';
            break;
    }

    switch (datos_AIE.sig_vacunacion.penta2) {
        case 'S':
            datos_AIE.sig_vacunacion.penta2 = 'SI';
            break;
        case 'N':
            datos_AIE.sig_vacunacion.penta2 = 'NO';
            break;
        case 'I':
            datos_AIE.sig_vacunacion.penta2 = 'IGNORA';
            break;
        default:
            datos_AIE.sig_vacunacion.penta2 = ' ';
            break;
    }

    switch (datos_AIE.sig_vacunacion.vavop2) {
        case 'S':
            datos_AIE.sig_vacunacion.vavop2 = 'SI';
            break;
        case 'N':
            datos_AIE.sig_vacunacion.vavop2 = 'NO';
            break;
        case 'I':
            datos_AIE.sig_vacunacion.vavop2 = 'IGNORA';
            break;
        default:
            datos_AIE.sig_vacunacion.vavop2 = ' ';
            break;
    }

    switch (datos_AIE.sig_vacunacion.penta3) {
        case 'S':
            datos_AIE.sig_vacunacion.penta3 = 'SI';
            break;
        case 'N':
            datos_AIE.sig_vacunacion.penta3 = 'NO';
            break;
        case 'I':
            datos_AIE.sig_vacunacion.penta3 = 'IGNORA';
            break;
        default:
            datos_AIE.sig_vacunacion.penta3 = ' ';
            break;
    }

    switch (datos_AIE.sig_vacunacion.vavop3) {
        case 'S':
            datos_AIE.sig_vacunacion.vavop3 = 'SI';
            break;
        case 'N':
            datos_AIE.sig_vacunacion.vavop3 = 'NO';
            break;
        case 'I':
            datos_AIE.sig_vacunacion.vavop3 = 'IGNORA';
            break;
        default:
            datos_AIE.sig_vacunacion.vavop3 = ' ';
            break;
    }

    switch (datos_AIE.sig_vacunacion.neumoc2) {
        case 'S':
            datos_AIE.sig_vacunacion.neumoc2 = 'SI';
            break;
        case 'N':
            datos_AIE.sig_vacunacion.neumoc2 = 'NO';
            break;
        case 'I':
            datos_AIE.sig_vacunacion.neumoc2 = 'IGNORA';
            break;
        default:
            datos_AIE.sig_vacunacion.neumoc2 = ' ';
            break;
    }

    switch (datos_AIE.sig_vacunacion.vac_rotavir2) {
        case 'S':
            datos_AIE.sig_vacunacion.vac_rotavir2 = 'SI';
            break;
        case 'N':
            datos_AIE.sig_vacunacion.vac_rotavir2 = 'NO';
            break;
        case 'I':
            datos_AIE.sig_vacunacion.vac_rotavir2 = 'IGNORA';
            break;
        default:
            datos_AIE.sig_vacunacion.vac_rotavir2 = ' ';
            break;
    }

    switch (datos_AIE.sig_vacunacion.fiebam) {
        case 'S':
            datos_AIE.sig_vacunacion.fiebam = 'SI';
            break;
        case 'N':
            datos_AIE.sig_vacunacion.fiebam = 'NO';
            break;
        case 'I':
            datos_AIE.sig_vacunacion.fiebam = 'IGNORA';
            break;
        default:
            datos_AIE.sig_vacunacion.fiebam = ' ';
            break;
    }

    switch (datos_AIE.sig_vacunacion.tripl1) {
        case 'S':
            datos_AIE.sig_vacunacion.tripl1 = 'SI';
            break;
        case 'N':
            datos_AIE.sig_vacunacion.tripl1 = 'NO';
            break;
        case 'I':
            datos_AIE.sig_vacunacion.tripl1 = 'IGNORA';
            break;
        default:
            datos_AIE.sig_vacunacion.tripl1 = ' ';
            break;
    }

    switch (datos_AIE.sig_vacunacion.vdptr1) {
        case 'S':
            datos_AIE.sig_vacunacion.vdptr1 = 'SI';
            break;
        case 'N':
            datos_AIE.sig_vacunacion.vdptr1 = 'NO';
            break;
        case 'I':
            datos_AIE.sig_vacunacion.vdptr1 = 'IGNORA';
            break;
        default:
            datos_AIE.sig_vacunacion.vdptr1 = ' ';
            break;
    }

    switch (datos_AIE.sig_vacunacion.vavop4) {
        case 'S':
            datos_AIE.sig_vacunacion.vavop4 = 'SI';
            break;
        case 'N':
            datos_AIE.sig_vacunacion.vavop4 = 'NO';
            break;
        case 'I':
            datos_AIE.sig_vacunacion.vavop4 = 'IGNORA';
            break;
        default:
            datos_AIE.sig_vacunacion.vavop4 = ' ';
            break;
    }

    switch (datos_AIE.sig_vacunacion.vac_varicela) {
        case 'S':
            datos_AIE.sig_vacunacion.vac_varicela = 'SI';
            break;
        case 'N':
            datos_AIE.sig_vacunacion.vac_varicela = 'NO';
            break;
        case 'I':
            datos_AIE.sig_vacunacion.vac_varicela = 'IGNORA';
            break;
        default:
            datos_AIE.sig_vacunacion.vac_varicela = ' ';
            break;
    }

    switch (datos_AIE.sig_vacunacion.neumoc3) {
        case 'S':
            datos_AIE.sig_vacunacion.neumoc3 = 'SI';
            break;
        case 'N':
            datos_AIE.sig_vacunacion.neumoc3 = 'NO';
            break;
        case 'I':
            datos_AIE.sig_vacunacion.neumoc3 = 'IGNORA';
            break;
        default:
            datos_AIE.sig_vacunacion.neumoc3 = ' ';
            break;
    }

    switch (datos_AIE.sig_vacunacion.vac_influenza) {
        case 'S':
            datos_AIE.sig_vacunacion.vac_influenza = 'SI';
            break;
        case 'N':
            datos_AIE.sig_vacunacion.vac_influenza = 'NO';
            break;
        case 'I':
            datos_AIE.sig_vacunacion.vac_influenza = 'IGNORA';
            break;
        default:
            datos_AIE.sig_vacunacion.vac_influenza = ' ';
            break;
    }

    switch (datos_AIE.sig_vacunacion.vdptr2) {
        case 'S':
            datos_AIE.sig_vacunacion.vdptr2 = 'SI';
            break;
        case 'N':
            datos_AIE.sig_vacunacion.vdptr2 = 'NO';
            break;
        case 'I':
            datos_AIE.sig_vacunacion.vdptr2 = 'IGNORA';
            break;
        default:
            datos_AIE.sig_vacunacion.vdptr2 = ' ';
            break;
    }

    switch (datos_AIE.sig_vacunacion.vavop5) {
        case 'S':
            datos_AIE.sig_vacunacion.vavop5 = 'SI';
            break;
        case 'N':
            datos_AIE.sig_vacunacion.vavop5 = 'NO';
            break;
        case 'I':
            datos_AIE.sig_vacunacion.vavop5 = 'IGNORA';
            break;
        default:
            datos_AIE.sig_vacunacion.vavop5 = ' ';
            break;
    }

    switch (datos_AIE.sig_vacunacion.tripl2) {
        case 'S':
            datos_AIE.sig_vacunacion.tripl2 = 'SI';
            break;
        case 'N':
            datos_AIE.sig_vacunacion.tripl2 = 'NO';
            break;
        case 'I':
            datos_AIE.sig_vacunacion.tripl2 = 'IGNORA';
            break;
        default:
            datos_AIE.sig_vacunacion.tripl2 = ' ';
            break;
    }

    switch (datos_AIE.sig_vacunacion.maltra) {
        case 'S':
            datos_AIE.sig_vacunacion.maltra = 'SI';
            break;
        case 'N':
            datos_AIE.sig_vacunacion.maltra = 'NO';
            break;
        case 'I':
            datos_AIE.sig_vacunacion.maltra = 'IGNORA';
            break;
        default:
            datos_AIE.sig_vacunacion.maltra = ' ';
            break;
    }

    // INI MALTRATO

    datos_AIE.signo_maltrato = $_AIEPI010.dato_9501.signo_maltrato;

    switch (datos_AIE.signo_maltrato.maline) {
        case 'S':
            datos_AIE.signo_maltrato.maline = 'SI';
            break;
        case 'N':
            datos_AIE.signo_maltrato.maline = 'NO';
            break;
        default:
            datos_AIE.signo_maltrato.maline = ' ';
            break;
    }

    switch (datos_AIE.signo_maltrato.malcran) {
        case 'S':
            datos_AIE.signo_maltrato.malcran = 'SI';
            break;
        case 'N':
            datos_AIE.signo_maltrato.malcran = 'NO';
            break;
        default:
            datos_AIE.signo_maltrato.malcran = ' ';
            break;
    }

    switch (datos_AIE.signo_maltrato.malquem) {
        case 'S':
            datos_AIE.signo_maltrato.malquem = 'SI';
            break;
        case 'N':
            datos_AIE.signo_maltrato.malquem = 'NO';
            break;
        default:
            datos_AIE.signo_maltrato.malquem = ' ';
            break;
    }

    switch (datos_AIE.signo_maltrato.malfract) {
        case 'S':
            datos_AIE.signo_maltrato.malfract = 'SI';
            break;
        case 'N':
            datos_AIE.signo_maltrato.malfract = 'NO';
            break;
        default:
            datos_AIE.signo_maltrato.malfract = ' ';
            break;
    }

    switch (datos_AIE.signo_maltrato.malcuta) {
        case 'S':
            datos_AIE.signo_maltrato.malcuta = 'SI';
            break;
        case 'N':
            datos_AIE.signo_maltrato.malcuta = 'NO';
            break;
        default:
            datos_AIE.signo_maltrato.malcuta = ' ';
            break;
    }

    switch (datos_AIE.signo_maltrato.maltrame) {
        case 'S':
            datos_AIE.signo_maltrato.maltrame = 'SI';
            break;
        case 'N':
            datos_AIE.signo_maltrato.maltrame = 'NO';
            break;
        default:
            datos_AIE.signo_maltrato.maltrame = ' ';
            break;
    }

    switch (datos_AIE.signo_maltrato.malexp) {
        case 'S':
            datos_AIE.signo_maltrato.malexp = 'SI';
            break;
        case 'N':
            datos_AIE.signo_maltrato.malexp = 'NO';
            break;
        default:
            datos_AIE.signo_maltrato.malexp = ' ';
            break;
    }

    switch (datos_AIE.signo_maltrato.maldis) {
        case 'S':
            datos_AIE.signo_maltrato.maldis = 'SI';
            break;
        case 'N':
            datos_AIE.signo_maltrato.maldis = 'NO';
            break;
        default:
            datos_AIE.signo_maltrato.maldis = ' ';
            break;
    }

    switch (datos_AIE.signo_maltrato.malcrian) {
        case 'S':
            datos_AIE.signo_maltrato.malcrian = 'SI';
            break;
        case 'N':
            datos_AIE.signo_maltrato.malcrian = 'NO';
            break;
        default:
            datos_AIE.signo_maltrato.malcrian = ' ';
            break;
    }

    switch (datos_AIE.signo_maltrato.malalt) {
        case 'S':
            datos_AIE.signo_maltrato.malalt = 'SI';
            break;
        case 'N':
            datos_AIE.signo_maltrato.malalt = 'NO';
            break;
        default:
            datos_AIE.signo_maltrato.malalt = ' ';
            break;
    }

    switch (datos_AIE.signo_maltrato.malemoci) {
        case 'S':
            datos_AIE.signo_maltrato.malemoci = 'SI';
            break;
        case 'N':
            datos_AIE.signo_maltrato.malemoci = 'NO';
            break;
        default:
            datos_AIE.signo_maltrato.malemoci = ' ';
            break;
    }

    switch (datos_AIE.signo_maltrato.malexprob) {
        case 'S':
            datos_AIE.signo_maltrato.malexprob = 'SI';
            break;
        case 'N':
            datos_AIE.signo_maltrato.malexprob = 'NO';
            break;
        default:
            datos_AIE.signo_maltrato.malexprob = ' ';
            break;
    }

    switch (datos_AIE.signo_maltrato.malinade) {
        case 'S':
            datos_AIE.signo_maltrato.malinade = 'SI';
            break;
        case 'N':
            datos_AIE.signo_maltrato.malinade = 'NO';
            break;
        default:
            datos_AIE.signo_maltrato.malinade = ' ';
            break;
    }

    switch (datos_AIE.signo_maltrato.malautori) {
        case 'S':
            datos_AIE.signo_maltrato.malautori = 'SI';
            break;
        case 'N':
            datos_AIE.signo_maltrato.malautori = 'NO';
            break;
        default:
            datos_AIE.signo_maltrato.malautori = ' ';
            break;
    }

    switch (datos_AIE.signo_maltrato.malviolen) {
        case 'S':
            datos_AIE.signo_maltrato.malviolen = 'SI';
            break;
        case 'N':
            datos_AIE.signo_maltrato.malviolen = 'NO';
            break;
        default:
            datos_AIE.signo_maltrato.malviolen = ' ';
            break;
    }

    switch (datos_AIE.signo_maltrato.malsalud) {
        case 'S':
            datos_AIE.signo_maltrato.malsalud = 'SI';
            break;
        case 'N':
            datos_AIE.signo_maltrato.malsalud = 'NO';
            break;
        default:
            datos_AIE.signo_maltrato.malsalud = ' ';
            break;
    }

    switch (datos_AIE.signo_maltrato.malhig) {
        case 'S':
            datos_AIE.signo_maltrato.malhig = 'SI';
            break;
        case 'N':
            datos_AIE.signo_maltrato.malhig = 'NO';
            break;
        default:
            datos_AIE.signo_maltrato.malhig = ' ';
            break;
    }

    switch (datos_AIE.signo_maltrato.malcalle) {
        case 'S':
            datos_AIE.signo_maltrato.malcalle = 'SI';
            break;
        case 'N':
            datos_AIE.signo_maltrato.malcalle = 'NO';
            break;
        default:
            datos_AIE.signo_maltrato.malcalle = ' ';
            break;
    }

    switch (datos_AIE.signo_maltrato.malasiste) {
        case 'S':
            datos_AIE.signo_maltrato.malasiste = 'SI';
            break;
        case 'N':
            datos_AIE.signo_maltrato.malasiste = 'NO';
            break;
        default:
            datos_AIE.signo_maltrato.malasiste = ' ';
            break;
    }

    datos_AIE.signo_maltrato.resultado = '';

    $_AIEPI010.dato_9501.var_maltrato.maltrato_grave == 1 ? datos_AIE.signo_maltrato.resultado += 'MALTRATO FISICO MUY GRAVE\n' : false;
    $_AIEPI010.dato_9501.var_maltrato.maltrato_leve == 1 ? datos_AIE.signo_maltrato.resultado += 'MALTRATO LEVE\n' : false;
    $_AIEPI010.dato_9501.var_maltrato.abandono == 1 ? datos_AIE.signo_maltrato.resultado += 'MALTRATO EMOCIONAL NEGLIGENCIA O ABANDONO\n' : false;
    $_AIEPI010.dato_9501.var_maltrato.maltrato_nohay == 1 ? datos_AIE.signo_maltrato.resultado += 'NO HAY SOSPECHA DE MALTRATO' : false;

    // INI ABUSO SEXUAL

    datos_AIE.signo_abusex = $_AIEPI010.dato_9501.signo_abusex;

    switch (datos_AIE.signo_abusex.abusex) {
        case 'S':
            datos_AIE.signo_abusex.abusex = 'SI';
            break;
        case 'N':
            datos_AIE.signo_abusex.abusex = 'NO';
            break;
        default:
            datos_AIE.signo_abusex.abusex = ' ';
            break;
    }

    switch (datos_AIE.signo_abusex.abusex_sang) {
        case 'S':
            datos_AIE.signo_abusex.abusex_sang = 'SI';
            break;
        case 'N':
            datos_AIE.signo_abusex.abusex_sang = 'NO';
            break;
        default:
            datos_AIE.signo_abusex.abusex_sang = ' ';
            break;
    }

    switch (datos_AIE.signo_abusex.abusex_relat) {
        case 'S':
            datos_AIE.signo_abusex.abusex_relat = 'SI';
            break;
        case 'N':
            datos_AIE.signo_abusex.abusex_relat = 'NO';
            break;
        default:
            datos_AIE.signo_abusex.abusex_relat = ' ';
            break;
    }

    switch (datos_AIE.signo_abusex.abusex_vener) {
        case 'S':
            datos_AIE.signo_abusex.abusex_vener = 'SI';
            break;
        case 'N':
            datos_AIE.signo_abusex.abusex_vener = 'NO';
            break;
        default:
            datos_AIE.signo_abusex.abusex_vener = ' ';
            break;
    }

    switch (datos_AIE.signo_abusex.abusex_traum) {
        case 'S':
            datos_AIE.signo_abusex.abusex_traum = 'SI';
            break;
        case 'N':
            datos_AIE.signo_abusex.abusex_traum = 'NO';
            break;
        default:
            datos_AIE.signo_abusex.abusex_traum = ' ';
            break;
    }

    switch (datos_AIE.signo_abusex.abusex_semen) {
        case 'S':
            datos_AIE.signo_abusex.abusex_semen = 'SI';
            break;
        case 'N':
            datos_AIE.signo_abusex.abusex_semen = 'NO';
            break;
        default:
            datos_AIE.signo_abusex.abusex_semen = ' ';
            break;
    }

    switch (datos_AIE.signo_abusex.abusex_activi) {
        case 'S':
            datos_AIE.signo_abusex.abusex_activi = 'SI';
            break;
        case 'N':
            datos_AIE.signo_abusex.abusex_activi = 'NO';
            break;
        default:
            datos_AIE.signo_abusex.abusex_activi = ' ';
            break;
    }

    switch (datos_AIE.signo_abusex.abusex_clamid) {
        case 'S':
            datos_AIE.signo_abusex.abusex_clamid = 'SI';
            break;
        case 'N':
            datos_AIE.signo_abusex.abusex_clamid = 'NO';
            break;
        default:
            datos_AIE.signo_abusex.abusex_clamid = ' ';
            break;
    }

    switch (datos_AIE.signo_abusex.abusex_condil) {
        case 'S':
            datos_AIE.signo_abusex.abusex_condil = 'SI';
            break;
        case 'N':
            datos_AIE.signo_abusex.abusex_condil = 'NO';
            break;
        default:
            datos_AIE.signo_abusex.abusex_condil = ' ';
            break;
    }

    switch (datos_AIE.signo_abusex.abusex_cuerpo) {
        case 'S':
            datos_AIE.signo_abusex.abusex_cuerpo = 'SI';
            break;
        case 'N':
            datos_AIE.signo_abusex.abusex_cuerpo = 'NO';
            break;
        default:
            datos_AIE.signo_abusex.abusex_cuerpo = ' ';
            break;
    }

    switch (datos_AIE.signo_abusex.abusex_comport) {
        case 'S':
            datos_AIE.signo_abusex.abusex_comport = 'SI';
            break;
        case 'N':
            datos_AIE.signo_abusex.abusex_comport = 'NO';
            break;
        default:
            datos_AIE.signo_abusex.abusex_comport = ' ';
            break;
    }

    switch (datos_AIE.signo_abusex.abusex_dolor) {
        case 'S':
            datos_AIE.signo_abusex.abusex_dolor = 'SI';
            break;
        case 'N':
            datos_AIE.signo_abusex.abusex_dolor = 'NO';
            break;
        default:
            datos_AIE.signo_abusex.abusex_dolor = ' ';
            break;
    }

    switch (datos_AIE.signo_abusex.abusex_temor) {
        case 'S':
            datos_AIE.signo_abusex.abusex_temor = 'SI';
            break;
        case 'N':
            datos_AIE.signo_abusex.abusex_temor = 'NO';
            break;
        default:
            datos_AIE.signo_abusex.abusex_temor = ' ';
            break;
    }

    datos_AIE.signo_abusex.resultado = '';

    $_AIEPI010.dato_9501.var_maltrato.abuso_sex_grave == 1 ? datos_AIE.signo_abusex.resultado += 'ABUSO SEXUAL GRAVE\n' : false;
    $_AIEPI010.dato_9501.var_maltrato.abuso_sex_sospe == 1 ? datos_AIE.signo_abusex.resultado += 'ABUSO SEXUAL SOSPECHOSO\n' : false;

    // INI RECOMENDACIONES

    datos_AIE.recomendaciones = {};
    datos_AIE.recomendaciones.volinme = $_AIEPI010.dato_9501.signo_alimentacion.volinme.replace(/\&/g, "\n");
    datos_AIE.recomendaciones.volcontr = $_AIEPI010.dato_9501.signo_alimentacion.volcontr;
    datos_AIE.recomendaciones.volsano = $_AIEPI010.dato_9501.signo_alimentacion.volsano;
    datos_AIE.recomendaciones.refconsul = $_AIEPI010.dato_9501.signo_alimentacion.refconsul;
    datos_AIE.recomendaciones.medprev = $_AIEPI010.dato_9501.signo_alimentacion.medprev.replace(/\&/g, "\n");
    datos_AIE.recomendaciones.recomtrato = $_AIEPI010.dato_9501.signo_alimentacion.recomtrato.replace(/\&/g, "\n");
    datos_AIE.recomendaciones.vitaminaA = $_AIEPI010.dato_9501.signo_alimentacion.vitaminaA;
    datos_AIE.recomendaciones.prox_vit_A = $_AIEPI010.dato_9501.signo_alimentacion.prox_vit_A;
    datos_AIE.recomendaciones.albendazol = $_AIEPI010.dato_9501.signo_alimentacion.albendazol;
    datos_AIE.recomendaciones.hierro = $_AIEPI010.dato_9501.signo_alimentacion.hierro;
    datos_AIE.recomendaciones.cuando_hier = $_AIEPI010.dato_9501.signo_alimentacion.cuando_hier;

    // DATOS - RIPS

    switch (parseFloat($_AIEPI010._hcprc.rips.finalidad)) {
        case 1:
            datos_AIE.finalid = 'ATENCION PARTO -Puerperio-';
            break;
        case 2:
            datos_AIE.finalid = 'ATENCION RECIEN NACIDO';
            break;
        case 3:
            datos_AIE.finalid = 'ATENCION PLANIF.FAMILIAR';
            break;
        case 4:
            datos_AIE.finalid = 'AT.ALTER.CREC. & DESARR.<10';
            break;
        case 5:
            datos_AIE.finalid = 'DETECCION ALT. DESARR.JOVEN';
            break;
        case 6:
            datos_AIE.finalid = 'DETECCION ALT. EMBARAZO';
            break;
        case 7:
            datos_AIE.finalid = 'DETECCION ALT. ADULTO';
            break;
        case 8:
            datos_AIE.finalid = 'DETECCION ALT. AGUDEZA VISUAL';
            break;
        case 9:
            datos_AIE.finalid = 'DETECCION ENFERM.PROFESIONAL';
            break;
        case 10:
            datos_AIE.finalid = 'NO APLICA';
            break;
        case 11:
            datos_AIE.finalid = 'PATOLOGIAS CRONICAS';
            break;
        default:
            datos_AIE.finalid = $_AIEPI010._hcprc.rips.finalidad;
            break;
    }

    switch ($_AIEPI010._hcprc.signos.sintom_resp) {
        case 'S':
            datos_AIE.sintom_resp = 'SI';
            break;
        case 'N':
            datos_AIE.sintom_resp = 'NO';
            break;
        case 'X':
            datos_AIE.sintom_resp = 'NO VALORADO';
            break;
        default:
            datos_AIE.sintom_resp = ' ';
            break;
    }

    switch ($_AIEPI010._hcprc.signos.sintom_piel) {
        case 'S':
            datos_AIE.sintom_piel = 'SI';
            break;
        case 'N':
            datos_AIE.sintom_piel = 'NO';
            break;
        case 'X':
            datos_AIE.sintom_piel = 'NO VALORADO';
            break;
        default:
            datos_AIE.sintom_piel = ' ';
            break;
    }

    switch ($_AIEPI010._hcprc.signos.victi_maltrato) {
        case 'S':
            datos_AIE.victi_maltrato = 'SI';
            break;
        case 'N':
            datos_AIE.victi_maltrato = 'NO';
            break;
        case 'X':
            datos_AIE.victi_maltrato = 'NO VALORADO';
            break;
        default:
            datos_AIE.victi_maltrato = ' ';
            break;
    }

    switch ($_AIEPI010._hcprc.signos.victi_violencia) {
        case 'S':
            datos_AIE.victi_violencia = 'SI';
            break;
        case 'N':
            datos_AIE.victi_violencia = 'NO';
            break;
        case 'X':
            datos_AIE.victi_violencia = 'NO VALORADO';
            break;
        default:
            datos_AIE.victi_violencia = ' ';
            break;
    }

    switch ($_AIEPI010._hcprc.signos.enfer_mental) {
        case 'S':
            datos_AIE.enfer_mental = 'SI';
            break;
        case 'N':
            datos_AIE.enfer_mental = 'NO';
            break;
        case 'X':
            datos_AIE.enfer_mental = 'NO VALORADO';
            break;
        default:
            datos_AIE.enfer_mental = ' ';
            break;
    }

    switch ($_AIEPI010._hcprc.signos.enfer_its) {
        case 'S':
            datos_AIE.enfer_its = 'SI';
            break;
        case 'N':
            datos_AIE.enfer_its = 'NO';
            break;
        case 'X':
            datos_AIE.enfer_its = 'NO VALORADO';
            break;
        default:
            datos_AIE.enfer_its = ' ';
            break;
    }

    switch ($_AIEPI010._hcprc.signos.cancer_seno) {
        case 'S':
            datos_AIE.cancer_seno = 'SI';
            break;
        case 'N':
            datos_AIE.cancer_seno = 'NO';
            break;
        default:
            datos_AIE.cancer_seno = ' ';
            break;
    }

    switch ($_AIEPI010._hcprc.signos.cancer_cervis) {
        case 'S':
            datos_AIE.cancer_cervis = 'SI';
            break;
        case 'N':
            datos_AIE.cancer_cervis = 'NO';
            break;
        default:
            datos_AIE.cancer_cervis = ' ';
            break;
    }

    if (parseInt($_AIEPI010._hcprc.rips.causa) > 0) {
        switch (parseInt($_AIEPI010._hcprc.rips.causa)) {
            case 1:
                datos_AIE.causa = 'ACCIDENTE DE TRABAJO';
                break;
            case 2:
                datos_AIE.causa = 'ACCIDENTE DE TRANSITO';
                break;
            case 3:
                datos_AIE.causa = 'ACCIDENTE RABICO';
                break;
            case 4:
                datos_AIE.causa = 'ACCIDENTE OFIDICO';
                break;
            case 5:
                datos_AIE.causa = 'OTRO TIPO DE ACCIDENTE';
                break;
            case 6:
                datos_AIE.causa = 'EVENTO CATASTROFICO';
                break;
            case 7:
                datos_AIE.causa = 'LESION POR AGRESION';
                break;
            case 8:
                datos_AIE.causa = 'LESION AUTOINFLIGIDA';
                break;
            case 9:
                datos_AIE.causa = 'SOSPECHA MALTRATO FISICO';
                break;
            case 10:
                datos_AIE.causa = 'SOSPECHA ABUSO SEXUAL';
                break;
            case 11:
                datos_AIE.causa = 'SOSPECHA VIOLENCIA SEXUAL';
                break;
            case 12:
                datos_AIE.causa = 'SOSPECHA MALTRATO EMOCION';
                break;
            case 13:
                datos_AIE.causa = 'ENFERMEDAD GENERAL';
                break;
            case 14:
                datos_AIE.causa = 'ENFERMEDAD PROFESIONAL';
                break;
            case 15:
                datos_AIE.causa = 'NO APLICA';
                break;
            default:
                datos_AIE.causa = '       ';
                break;
        }
    } else {
        datos_AIE.causa = '';
    }

    // LLENAR INFO MEDICO

    datos_AIE.medico = {};
    await postData({ datosh: datosEnvio() + cerosIzq($_AIEPI010._hcprc.med.trim(), 10) }, get_url("APP/SALUD/SAL719-01.DLL"))
        .then((data) => {
            var reg_med = data.PERSATI[0];
            datos_AIE.medico.nombre = reg_med.DESCRIP;
            datos_AIE.medico.reg = reg_med.REGISTRO;
            datos_AIE.medico.espec = reg_med.DESCESP1;
            datos_AIE.medico.firma = parseFloat($_AIEPI010._hcprc.med.trim());
        })
        .catch((err) => {
            console.log(err)
        });

    // INI AYER/ANOCHE

    datos_AIE.nino_6meses = $_AIEPI010.dato_9501.nino_6meses;

    datos_AIE.nino_6meses.ali_edad = $_AIEPI010.dato_9501.signo_alimentacion.ali_edad;

    switch (datos_AIE.nino_6meses.rec_liqui) {
        case 'S':
            datos_AIE.nino_6meses.rec_liqui = 'SI';
            break;
        case 'N':
            datos_AIE.nino_6meses.rec_liqui = 'NO';
            break;
        default:
            datos_AIE.nino_6meses.rec_liqui = ' ';
            break;
    }

    switch (datos_AIE.nino_6meses.rec_leche_for) {
        case 'S':
            datos_AIE.nino_6meses.rec_leche_for = 'SI';
            break;
        case 'N':
            datos_AIE.nino_6meses.rec_leche_for = 'NO';
            break;
        default:
            datos_AIE.nino_6meses.rec_leche_for = ' ';
            break;
    }

    switch (datos_AIE.nino_6meses.rec_leche_otr) {
        case 'S':
            datos_AIE.nino_6meses.rec_leche_otr = 'SI';
            break;
        case 'N':
            datos_AIE.nino_6meses.rec_leche_otr = 'NO';
            break;
        default:
            datos_AIE.nino_6meses.rec_leche_otr = ' ';
            break;
    }

    switch (datos_AIE.nino_6meses.rec_espeso) {
        case 'S':
            datos_AIE.nino_6meses.rec_espeso = 'SI';
            break;
        case 'N':
            datos_AIE.nino_6meses.rec_espeso = 'NO';
            break;
        default:
            datos_AIE.nino_6meses.rec_espeso = ' ';
            break;
    }

    if (($_reg_hc.edad_hc.unid_edad == 'D') || ($_reg_hc.edad_hc.vlr_edad == 'M' && $_reg_hc.edad_hc.vlr_edad <= 6)) {
        if ($_AIEPI010.dato_9501.nino_6meses.rec_liqui == 'N' &&
            $_AIEPI010.dato_9501.nino_6meses.rec_leche_for == 'N' &&
            $_AIEPI010.dato_9501.nino_6meses.rec_leche_otr == 'N' &&
            $_AIEPI010.dato_9501.nino_6meses.rec_espeso == 'N') {
            datos_AIE.nino_6meses.lac_mater_exclus = 'SI';
            datos_AIE.nino_6meses.alim_complem = 'NO';
        } else {
            datos_AIE.nino_6meses.lac_mater_exclus = 'NO';
            datos_AIE.nino_6meses.alim_complem = 'SI';
        }

        datos_AIE.nino_6meses.flag = true;
    } else {
        datos_AIE.nino_6meses.lac_mater_exclus = '';
        datos_AIE.nino_6meses.alim_complem = '';
        datos_AIE.nino_6meses.flag = false;
    }

    // diagnosticos
    for (var i in $_AIEPI010._hcprc.rips.tabla_diag) {
        if ($_AIEPI010._hcprc.rips.tabla_diag[i].diagn.trim() != '') {
            await datos_AIE.diagnosticos.push({ cod: $_AIEPI010._hcprc.rips.tabla_diag[i].diagn, descrip: $_AIEPI010._hcprc.rips.tabla_diag[i].descrip });
        }
    }

    $_AIEPI010.dato_9503 ? datos_AIE.tratamiento = $_AIEPI010.dato_9503 : datos_AIE.tratamiento = '';

    await imprimirDnt_AIEPI010();

    await imprimirDatosCovid_AIEPI010();

    inicializarFormatoBase_impHc();
    await _imprimirAIEPI010(datos_AIE).then(console.log('termina'))

    if ($_AIEPI010.opciones.opc_resu == 'N' && $_AIEPI010._hcprc.cierre.estado == 2) {
        await llenarEgreso_AIEPI010();
    }

    if ($_AIEPI010.opciones.opc_resu != 'S') {
        await _impresion2({
            tipo: 'pdf',
            archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmssS')}.pdf`,
            content: formatoBaseImp_Hc
        }).then(el => {}).catch((err) => {
            console.error(err);
        })
    }
}

async function imprimirDnt_AIEPI010() {
    datos_AIE.control_desarrollo = $_AIEPI010.dato_9501.control_desarrollo;
    switch (datos_AIE.control_desarrollo.edema) {
        case 'S':
            datos_AIE.control_desarrollo.edema = 'SI';
            break;
        case 'N':
            datos_AIE.control_desarrollo.edema = 'NO';
            break;
        default:
            datos_AIE.control_desarrollo.edema = '  ';
            break;
    }

    switch (parseInt(datos_AIE.control_desarrollo.apetito)) {
        case 1:
            datos_AIE.control_desarrollo.apetito = 'POSITIVO';
            break;
        case 2:
            datos_AIE.control_desarrollo.apetito = 'NEGATIVO';
            break;
        default:
            datos_AIE.control_desarrollo.apetito = '  ';
            break;
    }

    switch (datos_AIE.control_desarrollo.inscrito_cyd) {
        case 'S':
            datos_AIE.control_desarrollo.inscrito_cyd = 'SI';
            break;
        case 'N':
            datos_AIE.control_desarrollo.inscrito_cyd = 'NO';
            break;
        default:
            datos_AIE.control_desarrollo.inscrito_cyd = '  ';
            break;
    }

    datos_AIE.control_desarrollo.fecha_inscrito_cyd = _editFecha2(datos_AIE.control_desarrollo.fecha_inscrito_cyd);

    switch (parseInt(datos_AIE.control_desarrollo.manejo_dnt)) {
        case 1:
            datos_AIE.control_desarrollo.manejo_dnt = 'HOSPITALARIOS';
            break;
        case 2:
            datos_AIE.control_desarrollo.manejo_dnt = 'DOMICILIARIOS';
            break;
        case 3:
            datos_AIE.control_desarrollo.manejo_dnt = 'NO APLICA';
            break;
        default:
            datos_AIE.control_desarrollo.manejo_dnt = '  ';
            break;
    }

    datos_AIE.control_desarrollo.tabla_controles = $_AIEPI010.dato_9501.tabla_controles;

    switch (datos_AIE.control_desarrollo.recupera_nutric) {
        case 'S':
            datos_AIE.control_desarrollo.recupera_nutric = 'SI';
            break;
        case 'N':
            datos_AIE.control_desarrollo.recupera_nutric = 'NO';
            break;
        default:
            datos_AIE.control_desarrollo.recupera_nutric = '  ';
            break;
    }

    switch (datos_AIE.control_desarrollo.micronutri_pol) {
        case 'S':
            datos_AIE.control_desarrollo.micronutri_pol = 'SI';
            break;
        case 'N':
            datos_AIE.control_desarrollo.micronutri_pol = 'NO';
            break;
        default:
            datos_AIE.control_desarrollo.micronutri_pol = '  ';
            break;
    }

    if (datos_AIE.control_desarrollo.edema.trim() == '') {
        datos_AIE.control_desarrollo.flag = false;
    } else {
        datos_AIE.control_desarrollo.flag = true;
    }
}

async function imprimirDatosCovid_AIEPI010() {
    if ($_AIEPI010._hcprc.covid19.viaje_covid19.trim() == '' && $_AIEPI010._hcprc.covid19.contacto_covid19.trim() == '') {
        // continue
    } else {
        datos_AIE.covid.riesgos.bandera = true;

        aux = '';
        switch ($_AIEPI010._hcprc.covid19.viaje_covid19) {
            case 'S':
                aux = 'SI';
                break;
            case 'N':
                aux = 'NO';
                break;
            default:
                aux = '  ';
                break;
        }
        datos_AIE.covid.riesgos.transito = aux;

        aux = '';
        switch ($_AIEPI010._hcprc.covid19.contacto_covid19) {
            case 'S':
                aux = 'SI';
                break;
            case 'N':
                aux = 'NO';
                break;
            default:
                aux = '  ';
                break;
        }
        datos_AIE.covid.riesgos.contDiag = aux;

        aux = '';
        switch ($_AIEPI010._hcprc.covid19.fiebre_covid19) {
            case 'S':
                aux = 'SI';
                break;
            case 'N':
                aux = 'NO';
                break;
            default:
                aux = '  ';
                break;
        }
        datos_AIE.covid.riesgos.fiebre = aux;

        aux = '';
        switch ($_AIEPI010._hcprc.covid19.tos_covid19) {
            case 'S':
                aux = 'SI';
                break;
            case 'N':
                aux = 'NO';
                break;
            default:
                aux = '  ';
                break;
        }
        datos_AIE.covid.riesgos.tos = aux;

        aux = '';
        switch ($_AIEPI010._hcprc.covid19.disnea_covid19) {
            case 'S':
                aux = 'SI';
                break;
            case 'N':
                aux = 'NO';
                break;
            default:
                aux = '  ';
                break;
        }
        datos_AIE.covid.riesgos.disnea = aux;

        aux = '';
        switch ($_AIEPI010._hcprc.covid19.malestar_covid19) {
            case 'S':
                aux = 'SI';
                break;
            case 'N':
                aux = 'NO';
                break;
            default:
                aux = '  ';
                break;
        }
        datos_AIE.covid.riesgos.general = aux;

        aux = '';
        switch ($_AIEPI010._hcprc.covid19.rinorrea_covid19) {
            case 'S':
                aux = 'SI';
                break;
            case 'N':
                aux = 'NO';
                break;
            default:
                aux = '  ';
                break;
        }
        datos_AIE.covid.riesgos.rinorrea = aux;

        aux = '';
        switch ($_AIEPI010._hcprc.covid19.personal_salud_covid19) {
            case 'S':
                aux = 'SI';
                break;
            case 'N':
                aux = 'NO';
                break;
            default:
                aux = '  ';
                break;
        }
        datos_AIE.covid.riesgos.contEstr = aux;

        aux = '';
        switch ($_AIEPI010._hcprc.covid19.odinofagia_covid19) {
            case 'S':
                aux = 'SI';
                break;
            case 'N':
                aux = 'NO';
                break;
            default:
                aux = '  ';
                break;
        }
        datos_AIE.covid.riesgos.odinofagia = aux;

        aux = '';
        switch ($_AIEPI010._hcprc.covid19.viaje_dentro_covid19) {
            case 'S':
                aux = 'SI';
                break;
            case 'N':
                aux = 'NO';
                break;
            default:
                aux = '  ';
                break;
        }
        datos_AIE.covid.riesgos.pre1 = aux;

        if ($_AIEPI010._hcprc.covid19.viaje_dentro_covid19 == 'S') {
            var x = $_AIEPI010._ciudades.find(e => e.COD == $_AIEPI010._hcprc.covid19.lugar_dentro_covid19);
            (x != undefined) ? datos_AIE.covid.riesgos.pre2 = x.NOMBRE: false;
            datos_AIE.covid.riesgos.pre3 = $_AIEPI010._hcprc.covid19.tiempo_dentro_covid19;
        }

        aux = '';
        switch ($_AIEPI010._hcprc.covid19.viaje_fuera_covid19) {
            case 'S':
                aux = 'SI';
                break;
            case 'N':
                aux = 'NO';
                break;
            default:
                aux = '  ';
                break;
        }
        datos_AIE.covid.riesgos.pre4 = aux;

        if ($_AIEPI010._hcprc.covid19.viaje_fuera_covid19 == 'S') {
            var x = $_AIEPI010._paisesRips.find(e => e.CODIGO == $_AIEPI010._hcprc.covid19.lugar_fuera_covid19);
            (x != undefined) ? datos_AIE.covid.riesgos.pre5 = x.DESCRIP: false;
            datos_AIE.covid.riesgos.pre6 = $_AIEPI010._hcprc.covid19.tiempo_fuera_covid19;
        }
    }
}

async function llamarBarthel_AIEPI010() {
    if ($_AIEPI010.dato_9005 != undefined) {
        if ($_AIEPI010.dato_9005.valoracion_9005.trim() != '') {
            await _iniciarBarthel($_AIEPI010.varEnvio, $_AIEPI010.opciones, $_AIEPI010.dataBase64);
        }
    }
}

async function llamarKarnof_AIEPI010() {
    if ($_AIEPI010.dato_9006 != undefined) {
        if ($_AIEPI010.dato_9006.valoracion_9006.trim() != '') {
            await _iniciarKarnof($_AIEPI010.varEnvio, $_AIEPI010.opciones, $_AIEPI010.dataBase64)
        }
    }
}

async function llamarHCI5414A_AIEPI010() {
    if ($_AIEPI010._hcprc.rips.causa == '02') {
        await this.traerHistoriaClinica().then(() => {
            _iniciarHCI5414A( {...$_AIEPI010.varEnvio, _hcprc_new: $_AIEPI010._hcprc2,} , $_AIEPI010.opciones, $_AIEPI010.dataBase64);
          });
        // await _iniciarHCI5414A($_AIEPI010.varEnvio, $_AIEPI010.opciones, $_AIEPI010.dataBase64);
    }
}

async function llamarAcoCovid_AIEPI010() {
    if ($_AIEPI010.dato_9009 != undefined) {
        if ($_AIEPI010._hcprc.covid19.consenti_acomp_covid19 == 'S') {
            await _iniciarAcoCovid($_AIEPI010.varEnvio, $_AIEPI010.opciones, $_AIEPI010.dataBase64)
        }
    }
}

async function crearJsonEnvio_AIEPI010() {
    $_AIEPI010.varEnvio = {
        _hcprc: $_AIEPI010._hcprc,
        _detalles: $_AIEPI010._detalles,
        _paci: $_AIEPI010._paci,
        _arrayCiudades: $_AIEPI010._ciudades
    }
}

async function inicializarDatos_AIEPI010() {
    datos_AIE = {
        paciente: {},
        signo_peligro: {},
        signo_tos: {},
        signo_diare: {},
        signo_fiebr: {},
        signo_oido: {},
        signo_gargan: {},
        signo_salbuc: {},
        signo_desnut: {},
        sig_vacunacion: {},
        signos: {},
        covid: {
            recomendaciones: {
                bandera: null
            },

            riesgos: {
                bandera: null,
                transito: '',
                contDiag: '',
                contEstr: '',
                fiebre: '',
                tos: '',
                disnea: '',
                general: '',
                rinorrea: '',
                odinofagia: '',
                pre1: '',
                pre2: '',
                pre3: '',
                pre4: '',
                pre5: '',
                pre6: '',
            },

            prevencion: {
                bandera: null
            }
        },
        diagnosticos: []
    }
}

async function calcularOms_AIEPI010(codigo) {
    var info_grafica = {
        meses: null,
        oms_3: null,
        oms_2: null,
        oms_1: null,
        oms_0: null,
        oms_M1: null,
        oms_M2: null,
        oms_M3: null,
    }

    if (codigo == 'PXT') {
        var cms = parseInt($_AIEPI010._hcprc.signos.talla) * 10;

        var busqueda_oms = $_AIEPI010.TABLAS_OMS.find(x => x.CODIGO.trim() == codigo && x.SEXO == $_AIEPI010._paci.SEXO && parseInt(x.RANGO) == cms)
    } else {
        var fecha_Actual = moment()
        var fecha_Nacim = moment($_AIEPI010._paci.NACIM).format('YYYYMMDD')
        var edadMeses = fecha_Actual.diff(fecha_Nacim, 'months')

        var busqueda_oms = $_AIEPI010.TABLAS_OMS.find(x => x.CODIGO.trim() == codigo && x.SEXO == $_AIEPI010._paci.SEXO && parseInt(x.RANGO) == edadMeses)
    }

    console.log(busqueda_oms, 'busq');
    if (busqueda_oms) {
        info_grafica.oms_3 = busqueda_oms.DATO_3.trim() != '' ? parseFloat(busqueda_oms.DATO_3) : busqueda_oms.DATO_3;
        info_grafica.oms_2 = busqueda_oms.DATO_2.trim() != '' ? parseFloat(busqueda_oms.DATO_2) : busqueda_oms.DATO_2;
        info_grafica.oms_1 = busqueda_oms.DATO_1.trim() != '' ? parseFloat(busqueda_oms.DATO_1) : busqueda_oms.DATO_1;
        info_grafica.oms_0 = busqueda_oms.DATO_0.trim() != '' ? parseFloat(busqueda_oms.DATO_0) : busqueda_oms.DATO_0;
        info_grafica.oms_M1 = busqueda_oms.DATO_M1.trim() != '' ? parseFloat(busqueda_oms.DATO_M1) : busqueda_oms.DATO_M1;
        info_grafica.oms_M2 = busqueda_oms.DATO_M2.trim() != '' ? parseFloat(busqueda_oms.DATO_M2) : busqueda_oms.DATO_M2;
        info_grafica.oms_M3 = busqueda_oms.DATO_M3.trim() != '' ? parseFloat(busqueda_oms.DATO_M3) : busqueda_oms.DATO_M3;
    }

    console.log(info_grafica)
    return info_grafica
}

async function leerTablaOms_AIEPI010() {
    await postData({ datosh: datosEnvio() }, get_url("APP/HICLIN/AIE-DESA.DLL"))
        .then(function(data) {
            $_AIEPI010.TABLAS_OMS = data.TABLAS_OMS;
        })
        .catch(err => {
            console.error(err)
        })
}

async function traerHistoriaClinica() {
    return new Promise((resolve, reject) => {
      postData(
        { datosh: datosEnvio() + $_REG_HC.llave_hc + "|" + localStorage["Usuario"].trim() + "|1|" },
        get_url("APP/HICLIN/GET_HC.DLL")
      )
        .then((data) => {
          $_AIEPI010._hcprc2 = data;
          resolve();
        })
        .catch((err) => {
          CON851("", "Error consultando historia", null, "error", "Error");
          console.log(err, "err");
          reject();
        });
    });
  }