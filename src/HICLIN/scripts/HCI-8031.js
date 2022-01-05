// HISTORIA CLINICA PLANIFICACION FAMILIAR  DAVID.M  14/08/2020
// modificaciones - David.M - 01-02-2021

var $_HCI8031 = [];

async function _iniciar_HCI8031(opciones, arrayDatos) {
    iniciarlizarDatos_HCI80931();
    $_HCI8031._hcprc = arrayDatos._hcpac;
    $_HCI8031._detalles = arrayDatos._detalles;
    $_HCI8031._paci = arrayDatos.$_reg_paci;
    $_HCI8031.opciones = opciones;

    await validarHC_HCI8031();

    if ($_HCI8031.salirFlag) {
        salir_HCI8031();
        return null;
    } else {
        await validaciones_HCI8031();

        return 'termina';
    }
}

async function validarHC_HCI8031() {
    if ($_HCI8031._hcprc.novedad == '7') {
        $_HCI8031.salirFlag = true;
    }
    else {
        $_HCI8031.salirFlag = false;
        await leerDetalles_HCI8031();
    }
}

function salir_HCI8031() {
    console.log('LLEGA A SALIR HCI-8031');
}

async function leerDetalles_HCI8031() {
    // leer variables aiepi
    $_HCI8031.dato_8031 = await $_HCI8031._detalles.find(e => e['COD-DETHC'] == '8031' && e['LLAVE-HC'] == $_HCI8031._hcprc.llave);
    $_HCI8031.dato_8031 ? $_HCI8031.dato_8031 = $_HCI8031.dato_8031.DETALLE : false;

    $_HCI8031.dato_2079 = await $_HCI8031._detalles.find(e => e['COD-DETHC'] == '2079' && e['LLAVE-HC'] == $_HCI8031._hcprc.llave);
    $_HCI8031.dato_2079 ? $_HCI8031.dato_2079 = $_HCI8031.dato_2079.DETALLE : false;

    $_HCI8031.dato_4040 = await $_HCI8031._detalles.find(e => e['COD-DETHC'] == '4040' && e['LLAVE-HC'] == $_HCI8031._hcprc.llave);
    $_HCI8031.dato_4040 ? $_HCI8031.dato_4040 = $_HCI8031.dato_4040.DETALLE : false;

    $_HCI8031.analisis_hc = await $_HCI8031._detalles.find(e => e['COD-DETHC'] == '7501' && e['LLAVE-HC'] == $_HCI8031._hcprc.llave);
    $_HCI8031.analisis_hc ? $_HCI8031.analisis_hc = $_HCI8031.analisis_hc.DETALLE : false;

    $_HCI8031.plan_hc = await $_HCI8031._detalles.find(e => e['COD-DETHC'] == '7503' && e['LLAVE-HC'] == $_HCI8031._hcprc.llave);
    $_HCI8031.plan_hc ? $_HCI8031.plan_hc = $_HCI8031.plan_hc.DETALLE : false;

    $_HCI8031.toxic_hc = await $_HCI8031._detalles.find(e => e['COD-DETHC'] == '2035' && e['LLAVE-HC'] == $_HCI8031._hcprc.llave);
    $_HCI8031.toxic_hc ? $_HCI8031.toxic_hc = $_HCI8031.toxic_hc.DETALLE : false;

    $_HCI8031.exa_general_hc = await $_HCI8031._detalles.find(e => e['COD-DETHC'] == '4005' && e['LLAVE-HC'] == $_HCI8031._hcprc.llave);
    $_HCI8031.exa_general_hc ? $_HCI8031.exa_general_hc = $_HCI8031.exa_general_hc.DETALLE : false;
}

async function validaciones_HCI8031() {
    // MOTIVO DE CONSULTA
    datos.motivo1 = $_HCI8031._hcprc.motivo.substring(0, 95)
    datos.motivo2 = $_HCI8031._hcprc.motivo.substring(95, 190)

    // LLENAR ANTECEDENTES FAMILIARES

    if ($_HCI8031.dato_8031 != undefined) {
        switch ($_HCI8031.dato_8031.dato_fam['hiper_fam']) {
            case '1': datos.tablaAntFamiliares.booleano.push('SI'); break;
            case '2': datos.tablaAntFamiliares.booleano.push('NO'); break;
            case '3': datos.tablaAntFamiliares.booleano.push('NO SABE'); break;
            default: datos.tablaAntFamiliares.booleano.push('  '); break;
        }
        datos.tablaAntFamiliares.parentesco.push($_HCI8031.dato_8031.dato_fam['paren_hiper_fam']);
        datos.tablaAntFamiliares.cual.push($_HCI8031.dato_8031.dato_fam2['cual_hiper']);

        switch ($_HCI8031.dato_8031.dato_fam['diabet_fam']) {
            case '1': datos.tablaAntFamiliares.booleano.push('SI'); break;
            case '2': datos.tablaAntFamiliares.booleano.push('NO'); break;
            case '3': datos.tablaAntFamiliares.booleano.push('NO SABE'); break;
            default: datos.tablaAntFamiliares.booleano.push('  '); break;
        }
        datos.tablaAntFamiliares.parentesco.push($_HCI8031.dato_8031.dato_fam['paren_diabet_fam']);
        datos.tablaAntFamiliares.cual.push($_HCI8031.dato_8031.dato_fam2['cual_diabet']);

        switch ($_HCI8031.dato_8031.dato_fam['cardio_vas_fam']) {
            case '1': datos.tablaAntFamiliares.booleano.push('SI'); break;
            case '2': datos.tablaAntFamiliares.booleano.push('NO'); break;
            case '3': datos.tablaAntFamiliares.booleano.push('NO SABE'); break;
            default: datos.tablaAntFamiliares.booleano.push('  '); break;
        }
        datos.tablaAntFamiliares.parentesco.push($_HCI8031.dato_8031.dato_fam['paren_cardio_vas_fam']);
        datos.tablaAntFamiliares.cual.push($_HCI8031.dato_8031.dato_fam2['cual_cardipo']);

        switch ($_HCI8031.dato_8031.dato_fam['can_cuell_fam']) {
            case '1': datos.tablaAntFamiliares.booleano.push('SI'); break;
            case '2': datos.tablaAntFamiliares.booleano.push('NO'); break;
            case '3': datos.tablaAntFamiliares.booleano.push('NO SABE'); break;
            default: datos.tablaAntFamiliares.booleano.push('  '); break;
        }
        datos.tablaAntFamiliares.parentesco.push($_HCI8031.dato_8031.dato_fam['paren_can_cuell_fam']);
        datos.tablaAntFamiliares.cual.push($_HCI8031.dato_8031.dato_fam2['cual_cuello']);

        switch ($_HCI8031.dato_8031.dato_fam['can_mama_fam']) {
            case '1': datos.tablaAntFamiliares.booleano.push('SI'); break;
            case '2': datos.tablaAntFamiliares.booleano.push('NO'); break;
            case '3': datos.tablaAntFamiliares.booleano.push('NO SABE'); break;
            default: datos.tablaAntFamiliares.booleano.push('  '); break;
        }
        datos.tablaAntFamiliares.parentesco.push($_HCI8031.dato_8031.dato_fam['paren_can_mama_fam']);
        datos.tablaAntFamiliares.cual.push($_HCI8031.dato_8031.dato_fam2['cual_mama']);

        switch ($_HCI8031.dato_8031.dato_fam['otro_can_fam']) {
            case '1': datos.tablaAntFamiliares.booleano.push('SI'); break;
            case '2': datos.tablaAntFamiliares.booleano.push('NO'); break;
            case '3': datos.tablaAntFamiliares.booleano.push('NO SABE'); break;
            default: datos.tablaAntFamiliares.booleano.push('  '); break;
        }
        datos.tablaAntFamiliares.parentesco.push($_HCI8031.dato_8031.dato_fam['paren_otro_can_fam']);
        datos.tablaAntFamiliares.cual.push($_HCI8031.dato_8031.dato_fam2['cual_otro_can']);

        switch ($_HCI8031.dato_8031.dato_fam['enf_mental_fam']) {
            case '1': datos.tablaAntFamiliares.booleano.push('SI'); break;
            case '2': datos.tablaAntFamiliares.booleano.push('NO'); break;
            case '3': datos.tablaAntFamiliares.booleano.push('NO SABE'); break;
            default: datos.tablaAntFamiliares.booleano.push('  '); break;
        }
        datos.tablaAntFamiliares.parentesco.push($_HCI8031.dato_8031.dato_fam['paren_enf_mental_fam']);
        datos.tablaAntFamiliares.cual.push($_HCI8031.dato_8031.dato_fam2['cual_enf_mental']);

        switch ($_HCI8031.dato_8031.dato_fam['gine_obst_fam']) {
            case '1': datos.tablaAntFamiliares.booleano.push('SI'); break;
            case '2': datos.tablaAntFamiliares.booleano.push('NO'); break;
            case '3': datos.tablaAntFamiliares.booleano.push('NO SABE'); break;
            default: datos.tablaAntFamiliares.booleano.push('  '); break;
        }
        datos.tablaAntFamiliares.parentesco.push($_HCI8031.dato_8031.dato_fam['paren_gine_obst_fam']);
        datos.tablaAntFamiliares.cual.push($_HCI8031.dato_8031.dato_fam2['cual_gineco_obs']);

        switch ($_HCI8031.dato_8031.dato_fam['viol_gen_fam']) {
            case '1': datos.tablaAntFamiliares.booleano.push('SI'); break;
            case '2': datos.tablaAntFamiliares.booleano.push('NO'); break;
            case '3': datos.tablaAntFamiliares.booleano.push('NO SABE'); break;
            default: datos.tablaAntFamiliares.booleano.push('  '); break;
        }
        datos.tablaAntFamiliares.parentesco.push($_HCI8031.dato_8031.dato_fam['paren_viol_gen_fam']);
        datos.tablaAntFamiliares.cual.push($_HCI8031.dato_8031.dato_fam2['cual_violencia']);

        datos.tablaAntFamiliares.otrosAntFam = $_HCI8031.dato_8031.dato_fam['otros_antec_fam'];

        // LLENAR ANTECEDENTES PERSONALES

        switch ($_HCI8031.dato_8031.dato_per['hiper_per']) {
            case '1': datos.tablaAntPersonales.push('SI'); break;
            case '2': datos.tablaAntPersonales.push('NO'); break;
            case '3': datos.tablaAntPersonales.push('NO SABE'); break;
            default: datos.tablaAntPersonales.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.dato_per['diabet_per']) {
            case '1': datos.tablaAntPersonales.push('SI'); break;
            case '2': datos.tablaAntPersonales.push('NO'); break;
            case '3': datos.tablaAntPersonales.push('NO SABE'); break;
            default: datos.tablaAntPersonales.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.dato_per['cardio_vas_per']) {
            case '1': datos.tablaAntPersonales.push('SI'); break;
            case '2': datos.tablaAntPersonales.push('NO'); break;
            case '3': datos.tablaAntPersonales.push('NO SABE'); break;
            default: datos.tablaAntPersonales.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.dato_per['trombofle_per']) {
            case '1': datos.tablaAntPersonales.push('SI'); break;
            case '2': datos.tablaAntPersonales.push('NO'); break;
            case '3': datos.tablaAntPersonales.push('NO SABE'); break;
            default: datos.tablaAntPersonales.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.dato_per['viol_gen_per']) {
            case '1': datos.tablaAntPersonales.push('SI'); break;
            case '2': datos.tablaAntPersonales.push('NO'); break;
            case '3': datos.tablaAntPersonales.push('NO SABE'); break;
            default: datos.tablaAntPersonales.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.dato_per['cefaleas_per']) {
            case '1': datos.tablaAntPersonales.push('SI'); break;
            case '2': datos.tablaAntPersonales.push('NO'); break;
            case '3': datos.tablaAntPersonales.push('NO SABE'); break;
            default: datos.tablaAntPersonales.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.dato_per['migra_aura_per']) {
            case '1': datos.tablaAntPersonales.push('SI'); break;
            case '2': datos.tablaAntPersonales.push('NO'); break;
            case '3': datos.tablaAntPersonales.push('NO SABE'); break;
            default: datos.tablaAntPersonales.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.dato_per['enf_mental_per']) {
            case '1': datos.tablaAntPersonales.push('SI'); break;
            case '2': datos.tablaAntPersonales.push('NO'); break;
            case '3': datos.tablaAntPersonales.push('NO SABE'); break;
            default: datos.tablaAntPersonales.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.dato_per['gine_obst_per']) {
            case '1': datos.tablaAntPersonales.push('SI'); break;
            case '2': datos.tablaAntPersonales.push('NO'); break;
            case '3': datos.tablaAntPersonales.push('NO SABE'); break;
            default: datos.tablaAntPersonales.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.dato_per['hepatopatias_per']) {
            case '1': datos.tablaAntPersonales.push('SI'); break;
            case '2': datos.tablaAntPersonales.push('NO'); break;
            case '3': datos.tablaAntPersonales.push('NO SABE'); break;
            default: datos.tablaAntPersonales.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.dato_per['can_mama_per'].trim()) {
            case '1': datos.tablaAntPersonales.push('SI'); break;
            case '2': datos.tablaAntPersonales.push('NO'); break;
            case '3': datos.tablaAntPersonales.push('NO SABE'); break;
            default: datos.tablaAntPersonales.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.dato_per['can_cuell_per']) {
            case '1': datos.tablaAntPersonales.push('SI'); break;
            case '2': datos.tablaAntPersonales.push('NO'); break;
            case '3': datos.tablaAntPersonales.push('NO SABE'); break;
            default: datos.tablaAntPersonales.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.dato_per['otro_can_per']) {
            case '1': datos.tablaAntPersonales.push('SI'); break;
            case '2': datos.tablaAntPersonales.push('NO'); break;
            case '3': datos.tablaAntPersonales.push('NO SABE'); break;
            default: datos.tablaAntPersonales.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.dato_per['hemorrag_vag_per']) {
            case '1': datos.tablaAntPersonales.push('SI'); break;
            case '2': datos.tablaAntPersonales.push('NO'); break;
            case '3': datos.tablaAntPersonales.push('NO SABE'); break;
            default: datos.tablaAntPersonales.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.dato_per['cirug_per']) {
            case '1': datos.tablaAntPersonales2.cirugias = 'SI'; break;
            case '2': datos.tablaAntPersonales2.cirugias = 'NO'; break;
            case '3': datos.tablaAntPersonales2.cirugias = 'NO SABE'; break;
            default: datos.tablaAntPersonales2.cirugias = '  '; break;
        }
        datos.tablaAntPersonales2.cirugiasCuales = $_HCI8031.dato_8031.dato_per['cual_cirug_per'];

        switch ($_HCI8031.dato_8031.dato_per['its_per']) {
            case '1': datos.tablaAntPersonales2.its = 'SI'; break;
            case '2': datos.tablaAntPersonales2.its = 'NO'; break;
            case '3': datos.tablaAntPersonales2.its = 'NO SABE'; break;
            default: datos.tablaAntPersonales2.its = '  '; break;
        }
        datos.tablaAntPersonales2.itsCuales = $_HCI8031.dato_8031.dato_fam3['cual_its_per'];

        switch ($_HCI8031.dato_8031.dato_per['alergias_per']) {
            case '1': datos.tablaAntPersonales2.alergias = 'SI'; break;
            case '2': datos.tablaAntPersonales2.alergias = 'NO'; break;
            case '3': datos.tablaAntPersonales2.alergias = 'NO SABE'; break;
            default: datos.tablaAntPersonales2.alergias = '  '; break;
        }
        datos.tablaAntPersonales2.otrosAnt = $_HCI8031.dato_8031.dato_per['otros_antec_per'];

    }

    $_HCI8031.toxic_hc != undefined ? datos.tablaAntPersonales2.alergiasCuales = $_HCI8031.toxic_hc : false;

    // LLENAR ANTECEDENTES GINECO OBSTETRICOS

    if ($_HCI8031.dato_4040 != undefined) {
        datos.tablaAntGineco1.push($_HCI8031.dato_4040.gineco_esq_w['gestaciones_esq_w']);
        datos.tablaAntGineco1.push($_HCI8031.dato_4040.gineco_esq_w['partos_esq_w']);
        datos.tablaAntGineco1.push($_HCI8031.dato_4040.gineco_esq_w['cesareas_esq_w']);
        datos.tablaAntGineco1.push($_HCI8031.dato_4040.gineco_esq_w['gine_vivos_esq_w']);
        datos.tablaAntGineco1.push($_HCI8031.dato_4040.gineco_esq_w['partos_termino_esq_w']);
        datos.tablaAntGineco1.push($_HCI8031.dato_4040.gineco_esq_w['partos_prematuro_esq_w']);
        datos.tablaAntGineco1.push($_HCI8031.dato_4040.gineco_esq_w['abortos_esq_w']);
        datos.tablaAntGineco1.push($_HCI8031.dato_4040.gineco_esq_w['gine_muertos_esq_w']);
        datos.tablaAntGineco1.push($_HCI8031.dato_8031.dato_per2['embarazo_ectopico']);

        datos.tablaAntGineco2.push(_editFecha2($_HCI8031.dato_4040.gineco_esq_w['ult_parto_esq_w']))
        datos.tablaAntGineco2.push(_editFecha2($_HCI8031.dato_4040.gineco_esq_w['fecha_primer_embar_esq_w']))

        switch ($_HCI8031.dato_4040.obstetric_esq_w['lactancia_esq_w']) {
            case 'S': datos.tablaAntGineco2.push('SI'); break;
            case 'N': datos.tablaAntGineco2.push('NO'); break;
            default: datos.tablaAntGineco2.push('  '); break;
        }

        datos.tablaAntGineco2.push($_HCI8031.dato_4040.gineco_esq_w['menarquia_esq_w'])
        datos.tablaAntGineco2.push(_editFecha2($_HCI8031.dato_4040.gineco_esq_w['fecha_regla_esq_w']))

        switch ($_HCI8031.dato_4040.gineco_esq_w['dismenorrea_esq_w']) {
            case 'S': datos.tablaAntGineco2.push('SI'); break;
            case 'N': datos.tablaAntGineco2.push('NO'); break;
            default: datos.tablaAntGineco2.push('  '); break;
        }

        switch ($_HCI8031.dato_4040.gineco_esq_w['ciclos_esq_w']) {
            case '1': datos.tablaAntGineco2.push('REGULARES ' + $_HCI8031.dato_4040.gineco_esq_w['ciclo_irreg_esq_w']); break;
            case '2': datos.tablaAntGineco2.push('IRREGULARES ' + $_HCI8031.dato_4040.gineco_esq_w['ciclo_irreg_esq_w']); break;
            default: datos.tablaAntGineco2.push('  ' + $_HCI8031.dato_4040.gineco_esq_w['ciclo_irreg_esq_w']); break;
        }

        if ($_HCI8031.dato_4040.gineco_esq_w['fecha_citol_esq_w'] == '00000000') {
            datos.tablaAntGineco3.push('        ')
        } else {
            datos.tablaAntGineco3.push(_editFecha2($_HCI8031.dato_4040.gineco_esq_w['fecha_citol_esq_w']))
        }

        switch ($_HCI8031.dato_4040.gineco_esq_w['result_citol_esq_w']) {
            case '1': datos.tablaAntGineco3.push('NORMAL ' + $_HCI8031.dato_4040.gineco_esq_w['citol_anormal_esq_w']); break;
            case '2': datos.tablaAntGineco3.push('ANORMAL ' + $_HCI8031.dato_4040.gineco_esq_w['citol_anormal_esq_w']); break;
            case '3': datos.tablaAntGineco3.push('NO APLICA ' + $_HCI8031.dato_4040.gineco_esq_w['citol_anormal_esq_w']); break;
            default: datos.tablaAntGineco3.push('   ' + $_HCI8031.dato_4040.gineco_esq_w['citol_anormal_esq_w']); break;
        }

        datos.tablaAntGineco3.push($_HCI8031.dato_4040.gineco_esq_w['cirugias_gineco_esq_w'])

        switch ($_HCI8031.dato_4040.gineco_esq_w['prueba_embarazo_esq_w']) {
            case '1': datos.tablaAntGineco3.push('POSITIVO'); break;
            case '2': datos.tablaAntGineco3.push('NEGATIVO'); break;
            case '3': datos.tablaAntGineco3.push('NO APLICA'); break;
            default: datos.tablaAntGineco3.push('   '); break;
        }

        datos.tablaAntGineco3.push($_HCI8031.dato_4040.gineco_esq_w['fecha_pru_emb_esq_w'])

        switch ($_HCI8031.dato_4040.gineco_esq_w['frotis_flujo_esq_w']) {
            case 'S': datos.tablaAntGineco3.push('SI'); break;
            case 'N': datos.tablaAntGineco3.push('NO'); break;
            default: datos.tablaAntGineco3.push('  '); break;
        }

        datos.tablaAntGineco3.push($_HCI8031.dato_4040.gineco_esq_w['fecha_frotis_esq_w'])
        datos.tablaAntGineco3.push($_HCI8031.dato_4040.gineco_esq_w['resultado_frotis_esq_w'])
    }

    // LLENAR ANTECEDENTES ANTICONCEPTIVOS

    if ($_HCI8031.dato_2079 != undefined) {

        switch ($_HCI8031.dato_2079['emb_otros_metodos']) {
            case '1': datos.tablaAntAnticonceptivos.dato1 = 'SI'; break;
            case '2': datos.tablaAntAnticonceptivos.dato1 = 'NO'; break;
            case '3': datos.tablaAntAnticonceptivos.dato1 = 'NO SABE'; break;
            default: datos.tablaAntAnticonceptivos.dato1 = '  '; break;
        }

        switch ($_HCI8031.dato_2079['cual_emb_metodo']) {
            case "1": datos.tablaAntAnticonceptivos.dato1Cual = "DIU               "; break;
            case "2": datos.tablaAntAnticonceptivos.dato1Cual = "ORAL              "; break;
            case "3": datos.tablaAntAnticonceptivos.dato1Cual = "BARRERA           "; break;
            case "4": datos.tablaAntAnticonceptivos.dato1Cual = "OTRO              "; break;
            case "5": datos.tablaAntAnticonceptivos.dato1Cual = "NINGUNO           "; break;
            case "6": datos.tablaAntAnticonceptivos.dato1Cual = "DIU + BARRERA     "; break;
            case "7": datos.tablaAntAnticonceptivos.dato1Cual = "IMPL.SUBDERMICO   "; break;
            case "8": datos.tablaAntAnticonceptivos.dato1Cual = "I.SUBDERM+BARRERA "; break;
            case "9": datos.tablaAntAnticonceptivos.dato1Cual = "ORAL + BARRERA    "; break;
            case "A": datos.tablaAntAnticonceptivos.dato1Cual = "INYECTABLE MENSUAL"; break;
            case "B": datos.tablaAntAnticonceptivos.dato1Cual = "INYECTABLE+BARRERA"; break;
            case "C": datos.tablaAntAnticonceptivos.dato1Cual = "INYECTABLE TRIMEST"; break;
            case "D": datos.tablaAntAnticonceptivos.dato1Cual = "TRIMESTRAL+BARRERA"; break;
            case "E": datos.tablaAntAnticonceptivos.dato1Cual = "EMERGENCIA        "; break;
            case "F": datos.tablaAntAnticonceptivos.dato1Cual = "EMERGENCIA+BARRERA"; break;
            case "G": datos.tablaAntAnticonceptivos.dato1Cual = "ESTERILIZACION    "; break;
            case "H": datos.tablaAntAnticonceptivos.dato1Cual = "ESTERILIZA+BARRERA"; break;
            case "I": datos.tablaAntAnticonceptivos.dato1Cual = "NO USA X TRADICION"; break;
            case "J": datos.tablaAntAnticonceptivos.dato1Cual = "NO USA X SALUD    "; break;
            case "K": datos.tablaAntAnticonceptivos.dato1Cual = "NO USA X NEGACION "; break;
            case "L": datos.tablaAntAnticonceptivos.dato1Cual = "COITUS INTERRUPTUS"; break;
            case "M": datos.tablaAntAnticonceptivos.dato1Cual = "METODO DEL RITMO  "; break;
        }

        switch ($_HCI8031.dato_2079.diu['diu_con']) {
            case 'S': datos.tablaAntAnticonceptivos.con.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.con.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.con.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.diu['diu_usant']) {
            case 'S': datos.tablaAntAnticonceptivos.usant.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.usant.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.usant.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.diu['diu_usact']) {
            case 'S': datos.tablaAntAnticonceptivos.usact.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.usact.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.usact.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.diu['diu_indic']) {
            case '1': datos.tablaAntAnticonceptivos.indic.push('MEDICO'); break;
            case '2': datos.tablaAntAnticonceptivos.indic.push('AUTOINDICADO'); break;
            case '3': datos.tablaAntAnticonceptivos.indic.push('AMIGO (A)'); break;
            case '4': datos.tablaAntAnticonceptivos.indic.push('OTRO'); break;
            case '5': datos.tablaAntAnticonceptivos.indic.push('ENFERMERIA'); break;
            default: datos.tablaAntAnticonceptivos.indic.push('         '); break;
        }

        switch ($_HCI8031.dato_2079.oral['oral_con']) {
            case 'S': datos.tablaAntAnticonceptivos.con.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.con.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.con.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.oral['oral_usant']) {
            case 'S': datos.tablaAntAnticonceptivos.usant.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.usant.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.usant.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.oral['oral_usact']) {
            case 'S': datos.tablaAntAnticonceptivos.usact.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.usact.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.usact.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.oral['oral_indic']) {
            case '1': datos.tablaAntAnticonceptivos.indic.push('MEDICO'); break;
            case '2': datos.tablaAntAnticonceptivos.indic.push('AUTOINDICADO'); break;
            case '3': datos.tablaAntAnticonceptivos.indic.push('AMIGO (A)'); break;
            case '4': datos.tablaAntAnticonceptivos.indic.push('OTRO'); break;
            case '5': datos.tablaAntAnticonceptivos.indic.push('ENFERMERIA'); break;
            default: datos.tablaAntAnticonceptivos.indic.push('         '); break;
        }

        switch ($_HCI8031.dato_2079.barr['barr_con']) {
            case 'S': datos.tablaAntAnticonceptivos.con.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.con.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.con.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.barr['barr_usant']) {
            case 'S': datos.tablaAntAnticonceptivos.usant.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.usant.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.usant.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.barr['barr_usact']) {
            case 'S': datos.tablaAntAnticonceptivos.usact.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.usact.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.usact.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.barr['barr_indic']) {
            case '1': datos.tablaAntAnticonceptivos.indic.push('MEDICO'); break;
            case '2': datos.tablaAntAnticonceptivos.indic.push('AUTOINDICADO'); break;
            case '3': datos.tablaAntAnticonceptivos.indic.push('AMIGO (A)'); break;
            case '4': datos.tablaAntAnticonceptivos.indic.push('OTRO'); break;
            case '5': datos.tablaAntAnticonceptivos.indic.push('ENFERMERIA'); break;
            default: datos.tablaAntAnticonceptivos.indic.push('         '); break;
        }

        switch ($_HCI8031.dato_2079.diu_barr['diu_barr_con']) {
            case 'S': datos.tablaAntAnticonceptivos.con.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.con.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.con.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.diu_barr['diu_barr_usant']) {
            case 'S': datos.tablaAntAnticonceptivos.usant.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.usant.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.usant.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.diu_barr['diu_barr_usact']) {
            case 'S': datos.tablaAntAnticonceptivos.usact.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.usact.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.usact.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.diu_barr['diu_barr_indic']) {
            case '1': datos.tablaAntAnticonceptivos.indic.push('MEDICO'); break;
            case '2': datos.tablaAntAnticonceptivos.indic.push('AUTOINDICADO'); break;
            case '3': datos.tablaAntAnticonceptivos.indic.push('AMIGO (A)'); break;
            case '4': datos.tablaAntAnticonceptivos.indic.push('OTRO'); break;
            case '5': datos.tablaAntAnticonceptivos.indic.push('ENFERMERIA'); break;
            default: datos.tablaAntAnticonceptivos.indic.push('         '); break;
        }

        switch ($_HCI8031.dato_2079.impl_sd['impl_sd_con']) {
            case 'S': datos.tablaAntAnticonceptivos.con.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.con.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.con.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.impl_sd['impl_sd_usant']) {
            case 'S': datos.tablaAntAnticonceptivos.usant.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.usant.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.usant.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.impl_sd['impl_sd_usact']) {
            case 'S': datos.tablaAntAnticonceptivos.usact.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.usact.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.usact.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.impl_sd['impl_sd_indic']) {
            case '1': datos.tablaAntAnticonceptivos.indic.push('MEDICO'); break;
            case '2': datos.tablaAntAnticonceptivos.indic.push('AUTOINDICADO'); break;
            case '3': datos.tablaAntAnticonceptivos.indic.push('AMIGO (A)'); break;
            case '4': datos.tablaAntAnticonceptivos.indic.push('OTRO'); break;
            case '5': datos.tablaAntAnticonceptivos.indic.push('ENFERMERIA'); break;
            default: datos.tablaAntAnticonceptivos.indic.push('         '); break;
        }

        switch ($_HCI8031.dato_2079.sd_barr['sd_barr_con']) {
            case 'S': datos.tablaAntAnticonceptivos.con.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.con.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.con.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.sd_barr['sd_barr_usant']) {
            case 'S': datos.tablaAntAnticonceptivos.usant.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.usant.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.usant.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.sd_barr['sd_barr_usact']) {
            case 'S': datos.tablaAntAnticonceptivos.usact.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.usact.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.usact.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.sd_barr['sd_barr_indic']) {
            case '1': datos.tablaAntAnticonceptivos.indic.push('MEDICO'); break;
            case '2': datos.tablaAntAnticonceptivos.indic.push('AUTOINDICADO'); break;
            case '3': datos.tablaAntAnticonceptivos.indic.push('AMIGO (A)'); break;
            case '4': datos.tablaAntAnticonceptivos.indic.push('OTRO'); break;
            case '5': datos.tablaAntAnticonceptivos.indic.push('ENFERMERIA'); break;
            default: datos.tablaAntAnticonceptivos.indic.push('         '); break;
        }

        switch ($_HCI8031.dato_2079.oral_barr['oral_barr_con']) {
            case 'S': datos.tablaAntAnticonceptivos.con.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.con.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.con.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.oral_barr['oral_barr_usant']) {
            case 'S': datos.tablaAntAnticonceptivos.usant.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.usant.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.usant.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.oral_barr['oral_barr_usact']) {
            case 'S': datos.tablaAntAnticonceptivos.usact.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.usact.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.usact.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.oral_barr['oral_barr_indic']) {
            case '1': datos.tablaAntAnticonceptivos.indic.push('MEDICO'); break;
            case '2': datos.tablaAntAnticonceptivos.indic.push('AUTOINDICADO'); break;
            case '3': datos.tablaAntAnticonceptivos.indic.push('AMIGO (A)'); break;
            case '4': datos.tablaAntAnticonceptivos.indic.push('OTRO'); break;
            case '5': datos.tablaAntAnticonceptivos.indic.push('ENFERMERIA'); break;
            default: datos.tablaAntAnticonceptivos.indic.push('         '); break;
        }

        switch ($_HCI8031.dato_2079.inyec_men['inyec_men_con']) {
            case 'S': datos.tablaAntAnticonceptivos.con.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.con.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.con.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.inyec_men['inyec_men_usant']) {
            case 'S': datos.tablaAntAnticonceptivos.usant.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.usant.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.usant.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.inyec_men['inyec_men_usact']) {
            case 'S': datos.tablaAntAnticonceptivos.usact.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.usact.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.usact.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.inyec_men['inyec_men_indic']) {
            case '1': datos.tablaAntAnticonceptivos.indic.push('MEDICO'); break;
            case '2': datos.tablaAntAnticonceptivos.indic.push('AUTOINDICADO'); break;
            case '3': datos.tablaAntAnticonceptivos.indic.push('AMIGO (A)'); break;
            case '4': datos.tablaAntAnticonceptivos.indic.push('OTRO'); break;
            case '5': datos.tablaAntAnticonceptivos.indic.push('ENFERMERIA'); break;
            default: datos.tablaAntAnticonceptivos.indic.push('         '); break;
        }

        switch ($_HCI8031.dato_2079.men_barr['men_barr_con']) {
            case 'S': datos.tablaAntAnticonceptivos.con.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.con.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.con.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.men_barr['men_barr_usant']) {
            case 'S': datos.tablaAntAnticonceptivos.usant.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.usant.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.usant.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.men_barr['men_barr_usact']) {
            case 'S': datos.tablaAntAnticonceptivos.usact.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.usact.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.usact.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.men_barr['men_barr_indic']) {
            case '1': datos.tablaAntAnticonceptivos.indic.push('MEDICO'); break;
            case '2': datos.tablaAntAnticonceptivos.indic.push('AUTOINDICADO'); break;
            case '3': datos.tablaAntAnticonceptivos.indic.push('AMIGO (A)'); break;
            case '4': datos.tablaAntAnticonceptivos.indic.push('OTRO'); break;
            case '5': datos.tablaAntAnticonceptivos.indic.push('ENFERMERIA'); break;
            default: datos.tablaAntAnticonceptivos.indic.push('         '); break;
        }

        switch ($_HCI8031.dato_2079.inyec_tri['inyec_tri_con']) {
            case 'S': datos.tablaAntAnticonceptivos.con.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.con.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.con.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.inyec_tri['inyec_tri_usant']) {
            case 'S': datos.tablaAntAnticonceptivos.usant.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.usant.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.usant.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.inyec_tri['inyec_tri_usact']) {
            case 'S': datos.tablaAntAnticonceptivos.usact.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.usact.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.usact.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.inyec_tri['inyec_tri_indic']) {
            case '1': datos.tablaAntAnticonceptivos.indic.push('MEDICO'); break;
            case '2': datos.tablaAntAnticonceptivos.indic.push('AUTOINDICADO'); break;
            case '3': datos.tablaAntAnticonceptivos.indic.push('AMIGO (A)'); break;
            case '4': datos.tablaAntAnticonceptivos.indic.push('OTRO'); break;
            case '5': datos.tablaAntAnticonceptivos.indic.push('ENFERMERIA'); break;
            default: datos.tablaAntAnticonceptivos.indic.push('         '); break;
        }

        switch ($_HCI8031.dato_2079.tri_barr['tri_barr_con']) {
            case 'S': datos.tablaAntAnticonceptivos.con.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.con.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.con.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.tri_barr['tri_barr_usant']) {
            case 'S': datos.tablaAntAnticonceptivos.usant.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.usant.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.usant.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.tri_barr['tri_barr_usact']) {
            case 'S': datos.tablaAntAnticonceptivos.usact.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.usact.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.usact.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.tri_barr['tri_barr_indic']) {
            case '1': datos.tablaAntAnticonceptivos.indic.push('MEDICO'); break;
            case '2': datos.tablaAntAnticonceptivos.indic.push('AUTOINDICADO'); break;
            case '3': datos.tablaAntAnticonceptivos.indic.push('AMIGO (A)'); break;
            case '4': datos.tablaAntAnticonceptivos.indic.push('OTRO'); break;
            case '5': datos.tablaAntAnticonceptivos.indic.push('ENFERMERIA'); break;
            default: datos.tablaAntAnticonceptivos.indic.push('         '); break;
        }

        switch ($_HCI8031.dato_2079.emerg['emerg_con']) {
            case 'S': datos.tablaAntAnticonceptivos.con.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.con.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.con.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.emerg['emerg_usant']) {
            case 'S': datos.tablaAntAnticonceptivos.usant.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.usant.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.usant.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.emerg['emerg_usact']) {
            case 'S': datos.tablaAntAnticonceptivos.usact.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.usact.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.usact.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.emerg['emerg_indic']) {
            case '1': datos.tablaAntAnticonceptivos.indic.push('MEDICO'); break;
            case '2': datos.tablaAntAnticonceptivos.indic.push('AUTOINDICADO'); break;
            case '3': datos.tablaAntAnticonceptivos.indic.push('AMIGO (A)'); break;
            case '4': datos.tablaAntAnticonceptivos.indic.push('OTRO'); break;
            case '5': datos.tablaAntAnticonceptivos.indic.push('ENFERMERIA'); break;
            default: datos.tablaAntAnticonceptivos.indic.push('         '); break;
        }

        switch ($_HCI8031.dato_2079.emerg_barr['emerg_barr_con']) {
            case 'S': datos.tablaAntAnticonceptivos.con.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.con.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.con.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.emerg_barr['emerg_barr_usant']) {
            case 'S': datos.tablaAntAnticonceptivos.usant.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.usant.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.usant.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.emerg_barr['emerg_barr_usact']) {
            case 'S': datos.tablaAntAnticonceptivos.usact.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.usact.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.usact.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.emerg_barr['emerg_barr_indic']) {
            case '1': datos.tablaAntAnticonceptivos.indic.push('MEDICO'); break;
            case '2': datos.tablaAntAnticonceptivos.indic.push('AUTOINDICADO'); break;
            case '3': datos.tablaAntAnticonceptivos.indic.push('AMIGO (A)'); break;
            case '4': datos.tablaAntAnticonceptivos.indic.push('OTRO'); break;
            case '5': datos.tablaAntAnticonceptivos.indic.push('ENFERMERIA'); break;
            default: datos.tablaAntAnticonceptivos.indic.push('         '); break;
        }

        switch ($_HCI8031.dato_2079.ester['ester_con']) {
            case 'S': datos.tablaAntAnticonceptivos.con.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.con.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.con.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.ester['ester_usant']) {
            case 'S': datos.tablaAntAnticonceptivos.usant.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.usant.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.usant.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.ester['ester_usact']) {
            case 'S': datos.tablaAntAnticonceptivos.usact.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.usact.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.usact.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.ester['ester_indic']) {
            case '1': datos.tablaAntAnticonceptivos.indic.push('MEDICO'); break;
            case '2': datos.tablaAntAnticonceptivos.indic.push('AUTOINDICADO'); break;
            case '3': datos.tablaAntAnticonceptivos.indic.push('AMIGO (A)'); break;
            case '4': datos.tablaAntAnticonceptivos.indic.push('OTRO'); break;
            case '5': datos.tablaAntAnticonceptivos.indic.push('ENFERMERIA'); break;
            default: datos.tablaAntAnticonceptivos.indic.push('         '); break;
        }

        switch ($_HCI8031.dato_2079.ester_barr['ester_barr_con']) {
            case 'S': datos.tablaAntAnticonceptivos.con.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.con.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.con.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.ester_barr['ester_barr_usant']) {
            case 'S': datos.tablaAntAnticonceptivos.usant.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.usant.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.usant.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.ester_barr['ester_barr_usact']) {
            case 'S': datos.tablaAntAnticonceptivos.usact.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.usact.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.usact.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.ester_barr['ester_barr_indic']) {
            case '1': datos.tablaAntAnticonceptivos.indic.push('MEDICO'); break;
            case '2': datos.tablaAntAnticonceptivos.indic.push('AUTOINDICADO'); break;
            case '3': datos.tablaAntAnticonceptivos.indic.push('AMIGO (A)'); break;
            case '4': datos.tablaAntAnticonceptivos.indic.push('OTRO'); break;
            case '5': datos.tablaAntAnticonceptivos.indic.push('ENFERMERIA'); break;
            default: datos.tablaAntAnticonceptivos.indic.push('         '); break;
        }

        switch ($_HCI8031.dato_2079.coi_int['coi_int_con']) {
            case 'S': datos.tablaAntAnticonceptivos.con.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.con.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.con.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.coi_int['coi_int_usant']) {
            case 'S': datos.tablaAntAnticonceptivos.usant.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.usant.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.usant.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.coi_int['coi_int_usact']) {
            case 'S': datos.tablaAntAnticonceptivos.usact.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.usact.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.usact.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.coi_int['coi_int_indic']) {
            case '1': datos.tablaAntAnticonceptivos.indic.push('MEDICO'); break;
            case '2': datos.tablaAntAnticonceptivos.indic.push('AUTOINDICADO'); break;
            case '3': datos.tablaAntAnticonceptivos.indic.push('AMIGO (A)'); break;
            case '4': datos.tablaAntAnticonceptivos.indic.push('OTRO'); break;
            case '5': datos.tablaAntAnticonceptivos.indic.push('ENFERMERIA'); break;
            default: datos.tablaAntAnticonceptivos.indic.push('         '); break;
        }

        switch ($_HCI8031.dato_2079.met_rit['met_rit_con']) {
            case 'S': datos.tablaAntAnticonceptivos.con.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.con.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.con.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.met_rit['met_rit_usant']) {
            case 'S': datos.tablaAntAnticonceptivos.usant.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.usant.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.usant.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.met_rit['met_rit_usact']) {
            case 'S': datos.tablaAntAnticonceptivos.usact.push('SI'); break;
            case 'N': datos.tablaAntAnticonceptivos.usact.push('NO'); break;
            default: datos.tablaAntAnticonceptivos.usact.push('  '); break;
        }
        switch ($_HCI8031.dato_2079.met_rit['met_rit_indic']) {
            case '1': datos.tablaAntAnticonceptivos.indic.push('MEDICO'); break;
            case '2': datos.tablaAntAnticonceptivos.indic.push('AUTOINDICADO'); break;
            case '3': datos.tablaAntAnticonceptivos.indic.push('AMIGO (A)'); break;
            case '4': datos.tablaAntAnticonceptivos.indic.push('OTRO'); break;
            case '5': datos.tablaAntAnticonceptivos.indic.push('ENFERMERIA'); break;
            default: datos.tablaAntAnticonceptivos.indic.push('         '); break;
        }

        switch ($_HCI8031.dato_2079['no_uso_antic']) {
            case '1': datos.tablaAntAnticonceptivos.dato2 = 'NO USA X TRADICION'; break;
            case '2': datos.tablaAntAnticonceptivos.dato2 = 'NO USA X SALUD'; break;
            case '3': datos.tablaAntAnticonceptivos.dato2 = 'NO USA X NEGACION'; break;
            case '4': datos.tablaAntAnticonceptivos.dato2 = 'NO APLICA'; break;
            default: datos.tablaAntAnticonceptivos.dato2 = '        '; break;
        }
    }

    // LLENAR ANTECEDENTES SOCIO-CULTURALES

    if ($_HCI8031.dato_8031) {

        switch ($_HCI8031.dato_8031.dato_soc_cul['reci_apoy_social']) {
            case 'S': datos.tablaAntSocioCulturales.recibeApoyo = 'SI'; break;
            case 'N': datos.tablaAntSocioCulturales.recibeApoyo = 'NO'; break;
            default: datos.tablaAntSocioCulturales.recibeApoyo = '  '; break;
        }
        datos.tablaAntSocioCulturales.recibeApoyoCual = $_HCI8031.dato_8031.dato_soc_cul['cual_apoy_social'];

        switch ($_HCI8031.dato_8031.dato_soc_cul['vivienda_propia']) {
            case 'S': datos.tablaAntSocioCulturales.viv.push('SI'); break;
            case 'N': datos.tablaAntSocioCulturales.viv.push('NO'); break;
            default: datos.tablaAntSocioCulturales.viv.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.dato_soc_cul['vivienda_hacina']) {
            case 'S': datos.tablaAntSocioCulturales.viv.push('SI'); break;
            case 'N': datos.tablaAntSocioCulturales.viv.push('NO'); break; ñ
            default: datos.tablaAntSocioCulturales.viv.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.dato_soc_cul['casa']) {
            case 'S': datos.tablaAntSocioCulturales.viv.push('SI'); break;
            case 'N': datos.tablaAntSocioCulturales.viv.push('NO'); break;
            default: datos.tablaAntSocioCulturales.viv.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.dato_soc_cul['apto']) {
            case 'S': datos.tablaAntSocioCulturales.viv.push('SI'); break;
            case 'N': datos.tablaAntSocioCulturales.viv.push('NO'); break;
            default: datos.tablaAntSocioCulturales.viv.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.dato_soc_cul['invasion']) {
            case 'S': datos.tablaAntSocioCulturales.viv.push('SI'); break;
            case 'N': datos.tablaAntSocioCulturales.viv.push('NO'); break;
            default: datos.tablaAntSocioCulturales.viv.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.dato_soc_cul['lote']) {
            case 'S': datos.tablaAntSocioCulturales.viv.push('SI'); break;
            case 'N': datos.tablaAntSocioCulturales.viv.push('NO'); break;
            default: datos.tablaAntSocioCulturales.viv.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.dato_soc_cul['estudia_act']) {
            case 'S': datos.tablaAntSocioCulturales.actSoc.push('SI'); break;
            case 'N': datos.tablaAntSocioCulturales.actSoc.push('NO'); break;
            default: datos.tablaAntSocioCulturales.actSoc.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.dato_soc_cul['trabaja_act']) {
            case 'S': datos.tablaAntSocioCulturales.actSoc.push('SI'); break;
            case 'N': datos.tablaAntSocioCulturales.actSoc.push('NO'); break;
            default: datos.tablaAntSocioCulturales.actSoc.push('  '); break;
        }

        datos.tablaAntSocioCulturales.actSoc.push($_HCI8031.dato_8031.dato_soc_cul['actividad_fisica']);
        datos.tablaAntSocioCulturales.actSoc.push($_HCI8031.dato_8031.dato_soc_cul['actividad_recrea']);

        switch ($_HCI8031.dato_8031.dato_soc_cul['alimentacion_adec']) {
            case 'S': datos.tablaAntSocioCulturales.habitos.push('SI'); break;
            case 'N': datos.tablaAntSocioCulturales.habitos.push('NO'); break;
            default: datos.tablaAntSocioCulturales.habitos.push('  '); break;
        }

        datos.tablaAntSocioCulturales.habitos.push($_HCI8031.dato_8031.dato_soc_cul['cuantas_x_dia']);
        datos.tablaAntSocioCulturales.habitos.push($_HCI8031.dato_8031.dato_soc_cul['cuantas_con_famil']);

        switch ($_HCI8031.dato_8031.dato_soc_cul['sueno_normal']) {
            case 'S': datos.tablaAntSocioCulturales.habitos.push('SI'); break;
            case 'N': datos.tablaAntSocioCulturales.habitos.push('NO'); break;
            default: datos.tablaAntSocioCulturales.habitos.push('  '); break;
        }

        datos.tablaAntSocioCulturales.habitos.push($_HCI8031.dato_8031.dato_soc_cul['horas_sueno']);

        switch ($_HCI8031.dato_8031.dato_soc_cul['cigarrillo']) {
            case 'S': datos.tablaAntSocioCulturales.sustancias.push('SI'); break;
            case 'N': datos.tablaAntSocioCulturales.sustancias.push('NO'); break;
            default: datos.tablaAntSocioCulturales.sustancias.push('  '); break;
        }

        datos.tablaAntSocioCulturales.sustancias.push($_HCI8031.dato_8031.dato_soc_cul['cuantos_cigarr']);

        switch ($_HCI8031.dato_8031.dato_soc_cul['alcohol']) {
            case 'S': datos.tablaAntSocioCulturales.sustancias.push('SI'); break;
            case 'N': datos.tablaAntSocioCulturales.sustancias.push('NO'); break;
            default: datos.tablaAntSocioCulturales.sustancias.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.dato_soc_cul['abuso']) {
            case 'S': datos.tablaAntSocioCulturales.sustancias.push('SI'); break;
            case 'N': datos.tablaAntSocioCulturales.sustancias.push('NO'); break;
            default: datos.tablaAntSocioCulturales.sustancias.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.dato_soc_cul['otras_sustancias']) {
            case 'S': datos.tablaAntSocioCulturales.otrasSust = 'SI'; break;
            case 'N': datos.tablaAntSocioCulturales.otrasSust = 'NO'; break;
            default: datos.tablaAntSocioCulturales.otrasSust = '  '; break;
        }

        datos.tablaAntSocioCulturales.otrasSustCuales = $_HCI8031.dato_8031.dato_soc_cul['cual_sustancias'];
    }

    // LLENAR SIGNOS VITALES

    datos.exam.push($_HCI8031._hcprc.signos.tens1 + '/' + $_HCI8031._hcprc.signos.tens2);
    datos.exam.push($_HCI8031._hcprc.signos.tens_m);
    datos.exam.push($_HCI8031._hcprc.signos.fcard + ' lmp');
    datos.exam.push($_HCI8031._hcprc.signos.fresp + ' rpm');
    datos.exam.push($_HCI8031._hcprc.signos.temp + '°');
    datos.exam.push($_HCI8031._hcprc.signos.oximetria + '%');
    datos.exam.push($_HCI8031._hcprc.signos.pvc);

    if ($_HCI8031._hcprc.signos.und_peso == '2' || parseFloat($_HCI8031._hcprc.signos.peso) > 500) {
        datos.exam.push($_HCI8031._hcprc.signos.peso + ' Gr');
    } else {
        datos.exam.push($_HCI8031._hcprc.signos.peso + ' Kl');
    }
    datos.exam.push($_HCI8031._hcprc.signos.talla + ' cm');
    datos.exam.push($_HCI8031._hcprc.signos.imc);
    datos.exam.push($_HCI8031._hcprc.signos.sup + ' m2');
    datos.exam.push($_HCI8031._hcprc.signos.per_tora);
    datos.exam.push($_HCI8031._hcprc.signos.per_abdo);
    datos.exam.push($_HCI8031._hcprc.signos.per_mune);
    datos.exam.push($_HCI8031._hcprc.signos.glasg.substring(3, 5) + '/15');

    var fecha1 = $_HCI8031._paci['NACIM'];
    var fecha2 = $_HCI8031._hcprc.fecha;

    var edadDiasHc = SC_DIAS(fecha1, fecha2);


    // if ($_HCI8031._hcprc.edad.substring(0, 1) == 'A' && (parseFloat($_HCI8031._hcprc.edad.substring(1, 4)) > 4 && parseFloat($_HCI8031._hcprc.edad.substring(1, 4)) < 18) && (parseFloat($_HCI8031._hcprc.rips.embarazo) == 4 || parseFloat($_HCI8031._hcprc.rips.embarazo) == 0 || $_HCI8031._hcprc.rips.embarazo.trim == '' || parseFloat($_HCI8031._hcprc.rips.embarazo) == 9)) {
    //     if(parseFloat($_HCI8031._hcprc.edad_dias) < 1)

    //     if($_HCI8031._hcprc.imc)
    // }

    // ----- CLASIFICACION IMC -----
    if ($_HCI8031._hcprc.edad.substring(0, 1) == 'A' && parseFloat($_HCI8031._hcprc.edad.substring(1, 4)) > 18 && (parseFloat($_HCI8031._hcprc.rips.embarazo) == 4 || parseFloat($_HCI8031._hcprc.rips.embarazo) == 0 || $_HCI8031._hcprc.rips.embarazo.trim() == '' || parseFloat($_HCI8031._hcprc.rips.embarazo) == 9)) {
        var y = calcularRangoImc($_HCI8031._hcprc.signos.imc);
        datos.exam2.clasImc = y;
    }

    if ($_HCI8031.dato_8031 != undefined) {
        switch ($_HCI8031.dato_8031.signos_vitales['aspecto_gen']) {
            case 'N': datos.exam2.tabla.push('NORMAL'); break;
            case 'A': datos.exam2.tabla.push('ANORMAL'); break;
            case '9': datos.exam2.tabla.push('NO APLICA'); break;
            case '0': datos.exam2.tabla.push('NO SE VALORA'); break;
            default: datos.exam2.tabla.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.signos_vitales['genitales_ext']) {
            case 'N': datos.exam2.tabla.push('NORMAL'); break;
            case 'A': datos.exam2.tabla.push('ANORMAL'); break;
            case '9': datos.exam2.tabla.push('NO APLICA'); break;
            case '0': datos.exam2.tabla.push('NO SE VALORA'); break;
            default: datos.exam2.tabla.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.signos_vitales['abdomen']) {
            case 'N': datos.exam2.tabla.push('NORMAL'); break;
            case 'A': datos.exam2.tabla.push('ANORMAL'); break;
            case '9': datos.exam2.tabla.push('NO APLICA'); break;
            case '0': datos.exam2.tabla.push('NO SE VALORA'); break;
            default: datos.exam2.tabla.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.signos_vitales['mamas']) {
            case 'N': datos.exam2.tabla.push('NORMAL'); break;
            case 'A': datos.exam2.tabla.push('ANORMAL'); break;
            case '9': datos.exam2.tabla.push('NO APLICA'); break;
            case '0': datos.exam2.tabla.push('NO SE VALORA'); break;
            default: datos.exam2.tabla.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.signos_vitales['salud_bucal']) {
            case 'N': datos.exam2.tabla.push('NORMAL'); break;
            case 'A': datos.exam2.tabla.push('ANORMAL'); break;
            case '9': datos.exam2.tabla.push('NO APLICA'); break;
            case '0': datos.exam2.tabla.push('NO SE VALORA'); break;
            default: datos.exam2.tabla.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.signos_vitales['genito_urina']) {
            case 'N': datos.exam2.tabla.push('NORMAL'); break;
            case 'A': datos.exam2.tabla.push('ANORMAL'); break;
            case '9': datos.exam2.tabla.push('NO APLICA'); break;
            case '0': datos.exam2.tabla.push('NO SE VALORA'); break;
            default: datos.exam2.tabla.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.signos_vitales['piel_fan_muc']) {
            case 'N': datos.exam2.tabla.push('NORMAL'); break;
            case 'A': datos.exam2.tabla.push('ANORMAL'); break;
            case '9': datos.exam2.tabla.push('NO APLICA'); break;
            case '0': datos.exam2.tabla.push('NO SE VALORA'); break;
            default: datos.exam2.tabla.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.signos_vitales['cuello_tiroi']) {
            case 'N': datos.exam2.tabla.push('NORMAL'); break;
            case 'A': datos.exam2.tabla.push('ANORMAL'); break;
            case '9': datos.exam2.tabla.push('NO APLICA'); break;
            case '0': datos.exam2.tabla.push('NO SE VALORA'); break;
            default: datos.exam2.tabla.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.signos_vitales['columna']) {
            case 'N': datos.exam2.tabla.push('NORMAL'); break;
            case 'A': datos.exam2.tabla.push('ANORMAL'); break;
            case '9': datos.exam2.tabla.push('NO APLICA'); break;
            case '0': datos.exam2.tabla.push('NO SE VALORA'); break;
            default: datos.exam2.tabla.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.signos_vitales['cabeza']) {
            case 'N': datos.exam2.tabla.push('NORMAL'); break;
            case 'A': datos.exam2.tabla.push('ANORMAL'); break;
            case '9': datos.exam2.tabla.push('NO APLICA'); break;
            case '0': datos.exam2.tabla.push('NO SE VALORA'); break;
            default: datos.exam2.tabla.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.signos_vitales['torax']) {
            case 'N': datos.exam2.tabla.push('NORMAL'); break;
            case 'A': datos.exam2.tabla.push('ANORMAL'); break;
            case '9': datos.exam2.tabla.push('NO APLICA'); break;
            case '0': datos.exam2.tabla.push('NO SE VALORA'); break;
            default: datos.exam2.tabla.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.signos_vitales['extremidad_inf']) {
            case 'N': datos.exam2.tabla.push('NORMAL'); break;
            case 'A': datos.exam2.tabla.push('ANORMAL'); break;
            case '9': datos.exam2.tabla.push('NO APLICA'); break;
            case '0': datos.exam2.tabla.push('NO SE VALORA'); break;
            default: datos.exam2.tabla.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.signos_vitales['agudeza_vis']) {
            case 'N': datos.exam2.tabla.push('NORMAL'); break;
            case 'A': datos.exam2.tabla.push('ANORMAL'); break;
            case '9': datos.exam2.tabla.push('NO APLICA'); break;
            case '0': datos.exam2.tabla.push('NO SE VALORA'); break;
            default: datos.exam2.tabla.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.signos_vitales['cardio_pulmo']) {
            case 'N': datos.exam2.tabla.push('NORMAL'); break;
            case 'A': datos.exam2.tabla.push('ANORMAL'); break;
            case '9': datos.exam2.tabla.push('NO APLICA'); break;
            case '0': datos.exam2.tabla.push('NO SE VALORA'); break;
            default: datos.exam2.tabla.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.signos_vitales['neurologico']) {
            case 'N': datos.exam2.tabla.push('NORMAL'); break;
            case 'A': datos.exam2.tabla.push('ANORMAL'); break;
            case '9': datos.exam2.tabla.push('NO APLICA'); break;
            case '0': datos.exam2.tabla.push('NO SE VALORA'); break;
            default: datos.exam2.tabla.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.signos_vitales['dolor_palpacion']) {
            case 'S': datos.exam2.tabla.push('SI'); break;
            case 'N': datos.exam2.tabla.push('NO'); break;
            default: datos.exam2.tabla.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.signos_vitales['sangrado_contac']) {
            case 'S': datos.exam2.tabla.push('SI'); break;
            case 'N': datos.exam2.tabla.push('NO'); break;
            default: datos.exam2.tabla.push('  '); break;
        }

        // LLENAR ASESORIA Y ELECCION DEL METODO

        switch ($_HCI8031.dato_8031.asesoria_eleccion['metodo_eleg']) {
            case '1': datos.asesoria.metodo = 'DIU               '; break;
            case '2': datos.asesoria.metodo = 'ORAL              '; break;
            case '3': datos.asesoria.metodo = 'BARRERA           '; break;
            case '4': datos.asesoria.metodo = 'OTRO              '; break;
            case '5': datos.asesoria.metodo = 'NINGUNO           '; break;
            case '6': datos.asesoria.metodo = 'DIU + BARRERA     '; break;
            case '7': datos.asesoria.metodo = 'IMPL.SUBDERMICO   '; break;
            case '8': datos.asesoria.metodo = 'I.SUBDERM+BARRERA '; break;
            case '9': datos.asesoria.metodo = 'ORAL + BARRERA    '; break;
            case 'A': datos.asesoria.metodo = 'INYECTABLE MENSUAL'; break;
            case 'B': datos.asesoria.metodo = 'INYECTABLE+BARRERA'; break;
            case 'C': datos.asesoria.metodo = 'INYECTABLE TRIMEST'; break;
            case 'D': datos.asesoria.metodo = 'TRIMESTRAL+BARRERA'; break;
            case 'E': datos.asesoria.metodo = 'EMERGENCIA        '; break;
            case 'F': datos.asesoria.metodo = 'EMERGENCIA+BARRERA'; break;
            case 'G': datos.asesoria.metodo = 'ESTERILIZACION    '; break;
            case 'H': datos.asesoria.metodo = 'ESTERILIZA+BARRERA'; break;
            case 'I': datos.asesoria.metodo = 'NO USA X TRADICION'; break;
            case 'J': datos.asesoria.metodo = 'NO USA X SALUD    '; break;
            case 'K': datos.asesoria.metodo = 'NO USA X NEGACION '; break;
            case 'L': datos.asesoria.metodo = 'COITUS INTERRUPTUS'; break;
            case 'M': datos.asesoria.metodo = 'METODO DEL RITMO  '; break;
            case ' ': datos.asesoria.metodo = '                  '; break;
        }

        datos.asesoria.brindaEdu = $_HCI8031.dato_8031['brinda_educ_1'] + $_HCI8031.dato_8031['brinda_educ_2'] + $_HCI8031.dato_8031['brinda_educ_3']

        switch ($_HCI8031.dato_8031.asesoria_eleccion['examen_prac']) {
            case 'S': datos.asesoria.examPracticado = 'SI'; break;
            case 'N': datos.asesoria.examPracticado = 'NO'; break;
            default: datos.asesoria.examPracticado = '  '; break;
        }

        datos.asesoria.practicadoCual = $_HCI8031.dato_8031.asesoria_eleccion['cual_examen_prac'];

        switch ($_HCI8031.dato_8031.asesoria_eleccion['efecto_secun']) {
            case 'S': datos.asesoria.tabla.push('SI'); break;
            case 'N': datos.asesoria.tabla.push('NO'); break;
            default: datos.asesoria.tabla.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.asesoria_eleccion['instructivo_recom']) {
            case 'S': datos.asesoria.tabla.push('SI'); break;
            case 'N': datos.asesoria.tabla.push('NO'); break;
            default: datos.asesoria.tabla.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.asesoria_eleccion['uso_correc_met']) {
            case 'S': datos.asesoria.tabla.push('SI'); break;
            case 'N': datos.asesoria.tabla.push('NO'); break;
            default: datos.asesoria.tabla.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.asesoria_eleccion['prevencion']) {
            case 'S': datos.asesoria.tabla.push('SI'); break;
            case 'N': datos.asesoria.tabla.push('NO'); break;
            default: datos.asesoria.tabla.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.asesoria_eleccion['impor_controles']) {
            case 'S': datos.asesoria.tabla.push('SI'); break;
            case 'N': datos.asesoria.tabla.push('NO'); break;
            default: datos.asesoria.tabla.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.asesoria_eleccion['mecanismo_accion']) {
            case 'S': datos.asesoria.tabla.push('SI'); break;
            case 'N': datos.asesoria.tabla.push('NO'); break;
            default: datos.asesoria.tabla.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.asesoria_eleccion['alarma_metodo']) {
            case 'S': datos.asesoria.tabla.push('SI'); break;
            case 'N': datos.asesoria.tabla.push('NO'); break;
            default: datos.asesoria.tabla.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.asesoria_eleccion['autocuidado']) {
            case 'S': datos.asesoria.tabla.push('SI'); break;
            case 'N': datos.asesoria.tabla.push('NO'); break;
            default: datos.asesoria.tabla.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.asesoria_eleccion['deman_citol']) {
            case 'S': datos.asesoria.tabla.push('SI'); break;
            case 'N': datos.asesoria.tabla.push('NO'); break;
            default: datos.asesoria.tabla.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.asesoria_eleccion['autoexamen_mama']) {
            case 'S': datos.asesoria.tabla.push('SI'); break;
            case 'N': datos.asesoria.tabla.push('NO'); break;
            default: datos.asesoria.tabla.push('  '); break;
        }

        switch ($_HCI8031.dato_8031.asesoria_eleccion['otro_tema']) {
            case 'S': datos.asesoria.otroTema = 'SI'; break;
            case 'N': datos.asesoria.otroTema = 'NO'; break;
            default: datos.asesoria.otroTema = '  '; break;
        }

        datos.asesoria.otroTemaCual = $_HCI8031.dato_8031.asesoria_eleccion['cual_tema'];
    }

    if ($_HCI8031.exa_general_hc != undefined) {
        if (($_USUA_GLOBAL[0].NIT == 800175901 && $_HCI8031._paci['EPS'] == 'PAR001') || $_HCI8031.exa_general_hc.trim() == '') {
            datos.exam2.observ = ' ';
        } else {
            $_HCI8031.exa_general_hc = $_HCI8031.exa_general_hc.replace(/(?:\&)/g, "\n");
            datos.exam2.observ = $_HCI8031.exa_general_hc;
        }
    }
    // LLENAR OTROS TEMAS (SUBTITULOS)

    if ($_HCI8031._hcprc.signos.sintom_resp.trim() != '') {
        datos.otrosTemas.titulos.push('SINTOMATICO-RESPIRATORIO');
        datos.otrosTemas.tabla.push($_HCI8031._hcprc.signos.sintom_resp);
    }
    if ($_HCI8031._hcprc.signos.sintom_piel.trim() != '') {
        datos.otrosTemas.titulos.push('SINTOMATICO-PIEL:        ');
        datos.otrosTemas.tabla.push($_HCI8031._hcprc.signos.sintom_piel);
    }

    if ($_HCI8031._hcprc.signos.victi_maltrato.trim() != '') {
        datos.otrosTemas.titulos.push('VICTIMA DE MALTRATO:     ');
        datos.otrosTemas.tabla.push($_HCI8031._hcprc.signos.victi_maltrato);
    }

    if ($_HCI8031._hcprc.signos.victi_violencia.trim() != '') {
        datos.otrosTemas.titulos.push('VICTIMA DE VIOLENCIA:    ');
        datos.otrosTemas.tabla.push($_HCI8031._hcprc.signos.victi_violencia);
    }

    if ($_HCI8031._hcprc.signos.enfer_mental.trim() != '') {
        datos.otrosTemas.titulos.push('ENFERMEDAD MENTAL:       ');
        datos.otrosTemas.tabla.push($_HCI8031._hcprc.signos.enfer_mental);
    }

    if ($_HCI8031._hcprc.signos.enfer_its.trim() != '') {
        datos.otrosTemas.titulos.push('ENFERMEDAD ITS:          ');
        datos.otrosTemas.tabla.push($_HCI8031._hcprc.signos.enfer_its);
    }

    if ($_HCI8031._hcprc.signos.cancer_seno.trim() != '') {
        datos.otrosTemas.titulos.push('CANCER DE SENO:          ');
        datos.otrosTemas.tabla.push($_HCI8031._hcprc.signos.cancer_seno);
    }

    if ($_HCI8031._hcprc.signos.cancer_cervis.trim() != '') {
        datos.otrosTemas.titulos.push('CANCER DE CERVIX:        ');
        datos.otrosTemas.tabla.push($_HCI8031._hcprc.signos.cancer_cervis);
    }

    // LLENAR AGUDEZA VISUAL

    if ($_HCI8031._hcprc.examen_visual.estructuras_oculares_oi.trim() != '') {
        datos.agud = true
        switch ($_HCI8031._hcprc.examen_visual.estructuras_oculares_oi) {
            case '1':
                datos.agudeza.izqSinAlt = true
                datos.agudeza.izqConAlt = false
                break;
            case '2':
                datos.agudeza.izqSinAlt = false
                datos.agudeza.izqConAlt = true
                break;
            default:
                datos.agudeza.izqSinAlt = false
                datos.agudeza.izqConAlt = false
                break;
        }

        switch ($_HCI8031._hcprc.examen_visual.estructuras_oculares_od) {
            case '1':
                datos.agudeza.derSinAlt = true
                datos.agudeza.derConAlt = false
                break;
            case '2':
                datos.agudeza.derSinAlt = false
                datos.agudeza.derConAlt = true
                break;
            default:
                datos.agudeza.derSinAlt = false
                datos.agudeza.derConAlt = false
                break;
        }

        datos.agudeza.nivel1 = parseInt($_HCI8031._hcprc.examen_visual.agudeza_visual_oi_1).toString();
        datos.agudeza.nivel2 = parseInt($_HCI8031._hcprc.examen_visual.agudeza_visual_oi_2).toString();
        datos.agudeza.nivel3 = parseInt($_HCI8031._hcprc.examen_visual.agudeza_visual_od_1).toString();
        datos.agudeza.nivel4 = parseInt($_HCI8031._hcprc.examen_visual.agudeza_visual_od_2).toString();

        datos.agudeza.fecha = $_HCI8031._hcprc.fecha;
    }

    if ($_HCI8031.dato_8031 != undefined) {
        // LLENAR CONTROL
        if ($_HCI8031.dato_8031.tipo == '1') {

        } else {
            met = '';
            switch ($_HCI8031.dato_8031.control['metodo_ant']) {
                case "1": met = "DIU               "; break;
                case "2": met = "ORAL              "; break;
                case "3": met = "BARRERA           "; break;
                case "4": met = "OTRO              "; break;
                case "5": met = "NINGUNO           "; break;
                case "6": met = "DIU + BARRERA     "; break;
                case "7": met = "IMPL.SUBDERMICO   "; break;
                case "8": met = "I.SUBDERM+BARRERA "; break;
                case "9": met = "ORAL + BARRERA    "; break;
                case "A": met = "INYECTABLE MENSUAL"; break;
                case "B": met = "INYECTABLE+BARRERA"; break;
                case "C": met = "INYECTABLE TRIMEST"; break;
                case "D": met = "TRIMESTRAL+BARRERA"; break;
                case "E": met = "EMERGENCIA        "; break;
                case "F": met = "EMERGENCIA+BARRERA"; break;
                case "G": met = "ESTERILIZACION    "; break;
                case "H": met = "ESTERILIZA+BARRERA"; break;
                case "I": met = "NO USA X TRADICION"; break;
                case "J": met = "NO USA X SALUD    "; break;
                case "K": met = "NO USA X NEGACION "; break;
                case "L": met = "COITUS INTERRUPTUS"; break;
                case "M": met = "METODO DEL RITMO  "; break;
            }
            datos.control.metodo = met;

            datos.control.tiempoUso = $_HCI8031.dato_8031.control['tiempo_uso'];

            switch ($_HCI8031.dato_8031.control['satisfaccion']) {
                case 'S': datos.control.satisfaccion = 'SI'; break;
                case 'N': datos.control.satisfaccion = 'NO'; break;
                default: datos.control.satisfaccion = '  '; break;
            }

            $_HCI8031.dato_8031.control['vision_borr'] == 'S' ? datos.control.tabla.push('SI') : datos.control.tabla.push('NO');
            $_HCI8031.dato_8031.control['dolor_cabeza'] == 'S' ? datos.control.tabla.push('SI') : datos.control.tabla.push('NO');
            $_HCI8031.dato_8031.control['dolor_abdomen'] == 'S' ? datos.control.tabla.push('SI') : datos.control.tabla.push('NO');
            $_HCI8031.dato_8031.control['dolor_piernas'] == 'S' ? datos.control.tabla.push('SI') : datos.control.tabla.push('NO');
            $_HCI8031.dato_8031.control['dolor_torax'] == 'S' ? datos.control.tabla.push('SI') : datos.control.tabla.push('NO');
            $_HCI8031.dato_8031.control['sangrado_vag'] == 'S' ? datos.control.tabla.push('SI') : datos.control.tabla.push('NO');
            $_HCI8031.dato_8031.control['dolor_brazo'] == 'S' ? datos.control.tabla.push('SI') : datos.control.tabla.push('NO');
            $_HCI8031.dato_8031.control['cambios_comporta'] == 'S' ? datos.control.tabla.push('SI') : datos.control.tabla.push('NO');
            $_HCI8031.dato_8031.control['mareo'] == 'S' ? datos.control.tabla.push('SI') : datos.control.tabla.push('NO');
            $_HCI8031.dato_8031.control['molestia_palmas'] == 'S' ? datos.control.tabla.push('SI') : datos.control.tabla.push('NO');
            $_HCI8031.dato_8031.control['manchas_piel'] == 'S' ? datos.control.tabla.push('SI') : datos.control.tabla.push('NO');
            $_HCI8031.dato_8031.control['sintoma_ord'] == 'S' ? datos.control.tabla.push('SI') : datos.control.tabla.push('NO');
            $_HCI8031.dato_8031.control['edema_pies'] == 'S' ? datos.control.tabla.push('SI') : datos.control.tabla.push('NO');
            $_HCI8031.dato_8031.control['varices'] == 'S' ? datos.control.tabla.push('SI') : datos.control.tabla.push('NO');
            $_HCI8031.dato_8031.control['dolor_pelvico'] == 'S' ? datos.control.tabla.push('SI') : datos.control.tabla.push('NO');
            $_HCI8031.dato_8031.control['flujo_vag'] == 'S' ? datos.control.tabla.push('SI') : datos.control.tabla.push('NO');

            switch ($_HCI8031.dato_8031.control['exp_subdermico']) {
                case '1': datos.control.expulsion.subdermico = 'SI'; break;
                case '2': datos.control.expulsion.subdermico = 'NO'; break;
                case '3': datos.control.expulsion.subdermico = 'NO SABE'; break;
                default: datos.control.expulsion.subdermico = '  '; break;
            }

            switch ($_HCI8031.dato_8031.control['exp_intrauterino']) {
                case '1': datos.control.expulsion.intrauterino = 'SI'; break;
                case '2': datos.control.expulsion.intrauterino = 'NO'; break;
                case '3': datos.control.expulsion.intrauterino = 'NO SABE'; break;
                default: datos.control.expulsion.intrauterino = '  '; break;
            }

            if ($_HCI8031.dato_8031.control['continua_metodo'] == 'S') {
                datos.control.continua = 'SI';
                datos.control.nuevo = '  ';
            } else {
                datos.control.continua = 'NO';
                met2 = '';
                switch ($_HCI8031.dato_8031.control['nuevo_metodo']) {
                    case "1": met2 = "DIU               "; break;
                    case "2": met2 = "ORAL              "; break;
                    case "3": met2 = "BARRERA           "; break;
                    case "4": met2 = "OTRO              "; break;
                    case "5": met2 = "NINGUNO           "; break;
                    case "6": met2 = "DIU + BARRERA     "; break;
                    case "7": met2 = "IMPL.SUBDERMICO   "; break;
                    case "8": met2 = "I.SUBDERM+BARRERA "; break;
                    case "9": met2 = "ORAL + BARRERA    "; break;
                    case "A": met2 = "INYECTABLE MENSUAL"; break;
                    case "B": met2 = "INYECTABLE+BARRERA"; break;
                    case "C": met2 = "INYECTABLE TRIMEST"; break;
                    case "D": met2 = "TRIMESTRAL+BARRERA"; break;
                    case "E": met2 = "EMERGENCIA        "; break;
                    case "F": met2 = "EMERGENCIA+BARRERA"; break;
                    case "G": met2 = "ESTERILIZACION    "; break;
                    case "H": met2 = "ESTERILIZA+BARRERA"; break;
                    case "I": met2 = "NO USA X TRADICION"; break;
                    case "J": met2 = "NO USA X SALUD    "; break;
                    case "K": met2 = "NO USA X NEGACION "; break;
                    case "L": met2 = "COITUS INTERRUPTUS"; break;
                    case "M": met2 = "METODO DEL RITMO  "; break;
                }
                datos.control.nuevo = met2;
            }

            datos.control.fecha = $_HCI8031.dato_8031.control['fecha_cambio'];

            await postData({ datosh: datosEnvio() + $_HCI8031.dato_8031.control['remitido'] }, get_url("app/SALUD/SER855-1.DLL"))
                .then(data => {
                    datos.control.remision = data.CODIGO + ' - ' + data.NOMBRE;
                }).catch(err => {
                    datos.control.remision = '';
                })

            datos.control.fechaCita = $_HCI8031.dato_8031.control['fecha_proxima'];
        }
    }

    // LLENAR ENCABEZADO Y DATOS PACIENTE

    datos.paciente = llenarPacienteAperturas_impHc($_HCI8031._paci, $_HCI8031._hcprc)

    // diagnosticos
    for (var i in $_HCI8031._hcprc.rips.tabla_diag) {
        if ($_HCI8031._hcprc.rips.tabla_diag[i].diagn.trim() != '') {
            datos.datosAnalisis.diagnostico.push($_HCI8031._hcprc.rips.tabla_diag[i].diagn + ' - ' + $_HCI8031._hcprc.rips.tabla_diag[i].descrip);
        }
    }

    // analisis
    let analisis = $_HCI8031.analisis_hc || "";
    datos.datosAnalisis.analisis = analisis.replace(/(?:\&)/g, "\n");

    let plan  = $_HCI8031.plan_hc || "";
    datos.datosPlan.plan = plan.replace(/(?:\&)/g, "\n");

    datos.medico = {}
    datos.medico.firma = parseFloat($_HCI8031._hcprc.med.trim());
    datos.medico.nombre = $_HCI8031._hcprc.descrip_med;
    datos.medico.espec = $_HCI8031._hcprc.descrip_espec_med;
    datos.medico.reg = $_HCI8031._hcprc.reg_med;
    datos.medico.id = parseFloat($_HCI8031._hcprc.med.trim());
    
    inicializarFormatoBase_impHc();
    await _imprimirHCI_8031(datos)
    if ($_HCI8031.opciones.opc_resu != 'S') {
        await _impresion2({
            tipo: 'pdf',
            archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmssS')}.pdf`,
            content: formatoBaseImp_Hc
        }).catch((err) => {
            console.error(err);
        })
    }
}

function iniciarlizarDatos_HCI80931() {
    datos = {
        encabezado: {
            nombre: $_USUA_GLOBAL[0].NOMBRE,
            nit: $_USUA_GLOBAL[0].NIT,
            titulo: 'HISTORIA CLINICA DE PLANIFICACION FAMILIAR'
        },

        paciente: {},
        medico: {},

        // antecedentes familiares
        antFamiliaresTitulos: ['Hipertensión: ', 'Diabetes: ', 'Cardio/Vasculares: ', 'Cancer cuello uterino: ', 'Cancer de mama: ', 'Otro tipo de cancer: ', 'Enfermedad mental: ', 'Gineco/obstetrico: ', 'Violencia de Género'],
        tablaAntFamiliares: {
            booleano: [],
            parentesco: [],
            cual: [],
            otrosAntFam: '',
        },

        // antecedentes personales
        antPersonalesTitulos: ['Hipertensión: ', 'Diabetes: ', 'Cardio/Vasculares: ', 'Tromboflebitis: ', 'Violencia de Género: ', 'Cefaleas: ', 'Migrañas con aura: ', 'Enfermedad mental: ', 'Gineco/obstetrico: ', 'Hepatopatias: ', 'Cancer de mama: ', 'Cancer de cuello uterino: ', 'Otro tipo de cancer: ', 'Hemorragia vaginal: '],
        tablaAntPersonales: [],
        tablaAntPersonales2: {
            cirugias: '',
            cirugiasCuales: '',
            its: '',
            itsCuales: '',
            alergias: '',
            alergiasCuales: '',
            otrosAnt: ''
        },

        // antecedentes gineco
        antGinecoTitulos1: ['Gestac. Previas: ', 'Partos vaginales: ', 'Partos abdominales: ', 'Nacidos vivos: ', 'Partos a termino: ', 'Partos prematuros: ', 'Abortos: ', 'Nacidos muertos', 'Embarazo ectopico'],
        tablaAntGineco1: [],
        antGinecoTitulos2: ['Fecha ultimo evento obstetrico: ', 'Fecha primer embarazo (parto): ', 'Esta lactando: ', 'Edad menarquia: ', 'F.U.R: ', 'Dismenorrea: ', 'Ciclos menstruales: '],
        tablaAntGineco2: [],
        antGinecoTitulos3: ['Fecha ultima citologia: ', 'Resultado: ', 'Cirugias ginecologicas: ', 'Prueba de embarazo: ', 'Fecha: ', 'Frotis de flujo vaginal: ', 'Fecha: ', 'Resultado: '],
        tablaAntGineco3: [],

        // antecedentes anticonceptivos
        tablaAntAnticonceptivos: {
            dato1: '',
            dato1Cual: '',
            metodos: ['1. DIU', '2. ORAL', '3. BARRERA', '4. DIU + BARRERA', '5. IMPL SUBDERMICO', '6. I. SUBDERM + BARRERA', '7. ORAL + BARRERA', '8. INYECTABLE MENSUAL', '9. INYECTABLE + BARRERA', '10. INYECTABLE TRIMEST', '11. TRIMESTRAL + BARRERA', '12. EMERGENCIA', '13. EMERGENCIA + BARRERA', '14. ESTERILIZACIÓN', '15. ESTERILIZA + BARRERA', '16. COITUS INTERRUPTUS', '17. METODO DEL RITMO'],
            con: [],
            usant: [],
            usact: [],
            indic: [],
            dato2: ''
        },

        // antecedentes socio-culturales
        tablaAntSocioCulturales: {
            recibeApoyo: '',
            recibeApoyoCual: '',
            viv: [],
            actSoc: [],
            habitos: [],
            sustancias: [],
            otrasSust: '',
            otrasSustCuales: ''
        },

        // examen fisico
        exam: [],
        exam2: {
            clasImc: '',
            tablaTitulos: ['Aspecto general: ', 'Genitales externos: ', 'Abdomen: ', 'Mamas: ', 'Salud bucal: ', 'Genito urinario: ', 'Piel,faneras y mucosa: ', 'Cuello y tiroides: ', 'Columna: ', 'Cabeza: ', 'Torax: ', 'Extremidades inferiores: ', 'Agudeza visual: ', 'Cardio pulmonar: ', 'Neurologico: ', 'Dolor a la palpacion: ', 'Sangrado al contacto: '],
            tabla: [],
            observ: ''
        },

        // asesoria
        asesoria: {
            metodo: '',
            brindaEdu: '',
            examPracticado: '',
            practicadoCual: '',

            tablaTitulos: ['Efectos secundarios del metodo: ', 'Se entrega instructivo recomendaciones: ', 'Uso correcto del metodo: ', 'Prevención ITS/Uso preservativo: ', 'Importancia de los controles: ', 'Mecanismo de acción: ', 'Signos de alarma del metodo: ', 'Autocuidado: ', 'Demanda inducida a citologia: ', 'Autoexamen de mama'],
            tabla: [],
            otroTema: '',
            otroTemaCual: ''
        },

        otrosTemas: {
            titulos: [],
            tabla: []
        },

        // examen agudeza visual 
        agud: true,
        agudeza: {
            izqSinAlt: null,
            izqConAlt: null,
            derSinAlt: null,
            derConAlt: null,
            nivel1: '',
            nivel2: '',
            nivel3: '',
            nivel4: '',
            fecha: '',
        },

        // control de planificacion familiar
        control: {
            metodo: '',
            tiempoUso: '',
            satisfaccion: '',
            tablaTitulos: ['Vision borrosa: ', 'Dolor intenso en la cabeza: ', 'Dolor en abdomen: ', 'Inflamación o dolor inusual en piernas: ', 'Dolor en torax: ', 'Sangrado vaginal intenso o prolongado: ', 'Dolor en brazo: ', 'Cambios en el comportamiento: ', 'Mareo: ', 'Molestias en las mamas: ', 'Manchas en la piel: ', 'Sintomatologia urinaria: ', 'Edema en pies: ', 'Varices: ', 'Dolor pelvico: ', 'Flujo vaginal: '],
            tabla: [],
            expulsion: {
                subdermico: '',
                intrauterino: ''
            },
            continua: '',
            nuevo: '',
            fecha: '',
            remision: '',
            fechaCita: ''
        },

        datosAnalisis: {
            diagnostico: [],
            analisis: '',
            cierre: ''
        },

        datosPlan: {
            plan: '',
        }
    }
}



