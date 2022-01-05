// 07-09-2021 - Se quita impresion de agudeza visual, serv 05 - David.M

const { iniciar_HCI01C } = require("../../HICLIN/scripts/HCI01C");

// HISTORIA CLINICA HCI01  DAVID.M  27/08/2020
$_HCI01 = [];
var datos = {};

async function _iniciarHCI01(opciones, arrayDatos) {
  $_HCI01._ciudades = arrayDatos._ciudades;
  $_HCI01._paci = arrayDatos.$_reg_paci;
  $_HCI01._paisesRips = arrayDatos._paisesRips;
  $_HCI01._hcprc = arrayDatos._hcpac;
  $_HCI01.hcprc_new = arrayDatos.hcprc_new || {};


  if ($_HCI01._hcprc.novedad == "7") {
    return null;
  } else {
    $_HCI01._detalles = arrayDatos._detalles;

    $_HCI01.opciones = opciones;

    await inicializarDatos_HCI01();

    await cargarDatosDetalles_HCI01();
    // CREA UN JSON CON DATOS PARA ENVIO A OTRAS IMPRESIONES
    await crearJsonEnvio_HCI01();
    // VALIDACIONES DE TODO EL SCRIPT
    await validaciones_HCI01();
    // LLAMA FUNCIONES DE IMPRESION
    await llamarImpresionHCI01_HCI01();
    return "termina";
  }
}

async function cargarDatosDetalles_HCI01() {
  $_HCI01.dato_4010 = await $_HCI01._detalles.find(
    (e) => e["COD-DETHC"] == "4010" && e["LLAVE-HC"] == $_HCI01._hcprc.llave
  );
  $_HCI01.dato_4010 != undefined ? ($_HCI01.dato_4010 = $_HCI01.dato_4010.DETALLE) : false;

  $_HCI01.dato_4011 = await $_HCI01._detalles.find(
    (e) => e["COD-DETHC"] == "4011" && e["LLAVE-HC"] == $_HCI01._hcprc.llave
  );
  $_HCI01.dato_4011 != undefined ? ($_HCI01.dato_4011 = $_HCI01.dato_4011.DETALLE) : false;

  $_HCI01.dato_4030 = await $_HCI01._detalles.find(
    (e) => e["COD-DETHC"] == "4030" && e["LLAVE-HC"] == $_HCI01._hcprc.llave
  );
  $_HCI01.dato_4030 != undefined ? ($_HCI01.dato_4030 = $_HCI01.dato_4030.DETALLE) : false;

  $_HCI01.dato_2080 = await $_HCI01._detalles.find(
    (e) => e["COD-DETHC"] == "2080" && e["LLAVE-HC"] == $_HCI01._hcprc.llave
  );
  $_HCI01.dato_2080 != undefined ? ($_HCI01.dato_2080 = $_HCI01.dato_2080.DETALLE) : false;

  $_HCI01.dato_4040 = await $_HCI01._detalles.find(
    (e) => e["COD-DETHC"] == "4040" && e["LLAVE-HC"] == $_HCI01._hcprc.llave
  );
  $_HCI01.dato_4040 != undefined ? ($_HCI01.dato_4040 = $_HCI01.dato_4040.DETALLE) : false;

  $_HCI01.enf_act_hc = await $_HCI01._detalles.find(
    (e) => e["COD-DETHC"] == "1001" && e["LLAVE-HC"] == $_HCI01._hcprc.llave
  );
  if ($_HCI01.enf_act_hc != undefined) {
    $_HCI01.enf_act_hc = $_HCI01.enf_act_hc.DETALLE;
    $_HCI01.enf_act_hc = $_HCI01.enf_act_hc.replace(/\&/g, "\n").trim();
  }

  $_HCI01.famil_hc = await $_HCI01._detalles.find(
    (e) => e["COD-DETHC"] == "2002" && e["LLAVE-HC"] == $_HCI01._hcprc.llave
  );
  if ($_HCI01.famil_hc != undefined) {
    $_HCI01.famil_hc = $_HCI01.famil_hc.DETALLE;
    if(!$_HCI01.famil_hc.tipo_ws) $_HCI01.famil_hc.replace(/\&/g, "\n").trim()
  }

  $_HCI01.medic_hc = await $_HCI01._detalles.find(
    (e) => e["COD-DETHC"] == "2010" && e["LLAVE-HC"] == $_HCI01._hcprc.llave
  );
  if ($_HCI01.medic_hc != undefined) {
    $_HCI01.medic_hc = $_HCI01.medic_hc.DETALLE;
    $_HCI01.medic_hc = $_HCI01.medic_hc.replace(/\&/g, "\n").trim();
  }

  $_HCI01.quiru_hc = await $_HCI01._detalles.find(
    (e) => e["COD-DETHC"] == "2020" && e["LLAVE-HC"] == $_HCI01._hcprc.llave
  );
  $_HCI01.quiru_hc != undefined ? ($_HCI01.quiru_hc = $_HCI01.quiru_hc.DETALLE.replace(/\&/g, "\n").trim()) : false;

  $_HCI01.farma_hc = await $_HCI01._detalles.find(
    (e) => e["COD-DETHC"] == "2030" && e["LLAVE-HC"] == $_HCI01._hcprc.llave
  );
  $_HCI01.farma_hc != undefined ? ($_HCI01.farma_hc = $_HCI01.farma_hc.DETALLE.replace(/\&/g, "\n").trim()) : false;

  $_HCI01.traum_hc = await $_HCI01._detalles.find(
    (e) => e["COD-DETHC"] == "2040" && e["LLAVE-HC"] == $_HCI01._hcprc.llave
  );
  $_HCI01.traum_hc != undefined ? ($_HCI01.traum_hc = $_HCI01.traum_hc.DETALLE.replace(/\&/g, "\n").trim()) : false;

  $_HCI01.ocupa_hc = await $_HCI01._detalles.find(
    (e) => e["COD-DETHC"] == "2050" && e["LLAVE-HC"] == $_HCI01._hcprc.llave
  );
  $_HCI01.ocupa_hc != undefined ? ($_HCI01.ocupa_hc = $_HCI01.ocupa_hc.DETALLE.replace(/\&/g, "\n").trim()) : false;

  $_HCI01.ginec_hc = await $_HCI01._detalles.find(
    (e) => e["COD-DETHC"] == "2060" && e["LLAVE-HC"] == $_HCI01._hcprc.llave
  );
  $_HCI01.ginec_hc != undefined ? ($_HCI01.ginec_hc = $_HCI01.ginec_hc.DETALLE.replace(/\&/g, "\n").trim()) : false;

  $_HCI01.otros_hc = await $_HCI01._detalles.find(
    (e) => e["COD-DETHC"] == "2070" && e["LLAVE-HC"] == $_HCI01._hcprc.llave
  );
  if ($_HCI01.otros_hc != undefined) {
    $_HCI01.otros_hc = $_HCI01.otros_hc.DETALLE;
    if(!$_HCI01.otros_hc.tipo_ws) $_HCI01.otros_hc.replace(/\&/g, "\n").trim()
  }

  $_HCI01.ant_hospi_hc = await $_HCI01._detalles.find(
    (e) => e["COD-DETHC"] == "2003" && e["LLAVE-HC"] == $_HCI01._hcprc.llave
  );
  $_HCI01.ant_hospi_hc != undefined
    ? ($_HCI01.ant_hospi_hc = $_HCI01.ant_hospi_hc.DETALLE.replace(/\&/g, "\n").trim())
    : false;

  // leer organo de sentidos
  $_HCI01.dato_sis_sent_hc = await $_HCI01._detalles.find(
    (e) => e["COD-DETHC"] == "3010" && e["LLAVE-HC"] == $_HCI01._hcprc.llave
  );
  if ($_HCI01.dato_sis_sent_hc != undefined) {
    $_HCI01.dato_sis_sent_hc = $_HCI01.dato_sis_sent_hc.DETALLE;
    if(!$_HCI01.dato_sis_sent_hc.tipo_ws) $_HCI01.dato_sis_sent_hc.replace(/\&/g, "\n").trim()
  }

  // leer sistema cardiopulmonar
  $_HCI01.dato_sis_card_hc = await $_HCI01._detalles.find(
    (e) => e["COD-DETHC"] == "3020" && e["LLAVE-HC"] == $_HCI01._hcprc.llave
  );
  $_HCI01.dato_sis_card_hc != undefined ? ($_HCI01.dato_sis_card_hc = $_HCI01.dato_sis_card_hc.DETALLE) : false;

  // leer sistema digestivo
  $_HCI01.dato_sis_dige_hc = await $_HCI01._detalles.find(
    (e) => e["COD-DETHC"] == "3030" && e["LLAVE-HC"] == $_HCI01._hcprc.llave
  );
  $_HCI01.dato_sis_dige_hc != undefined ? ($_HCI01.dato_sis_dige_hc = $_HCI01.dato_sis_dige_hc.DETALLE) : false;

  // leer sistema dermatologico
  $_HCI01.dato_sis_derm_hc = await $_HCI01._detalles.find(
    (e) => e["COD-DETHC"] == "3040" && e["LLAVE-HC"] == $_HCI01._hcprc.llave
  );
  $_HCI01.dato_sis_derm_hc != undefined ? ($_HCI01.dato_sis_derm_hc = $_HCI01.dato_sis_derm_hc.DETALLE) : false;

  // leer sistema osteoarticular
  $_HCI01.dato_sis_oste_hc = await $_HCI01._detalles.find(
    (e) => e["COD-DETHC"] == "3050" && e["LLAVE-HC"] == $_HCI01._hcprc.llave
  );
  $_HCI01.dato_sis_oste_hc != undefined ? ($_HCI01.dato_sis_oste_hc = $_HCI01.dato_sis_oste_hc.DETALLE) : false;

  // leer sistema neurologico
  $_HCI01.dato_sis_neur_hc = await $_HCI01._detalles.find(
    (e) => e["COD-DETHC"] == "3060" && e["LLAVE-HC"] == $_HCI01._hcprc.llave
  );
  $_HCI01.dato_sis_neur_hc != undefined ? ($_HCI01.dato_sis_neur_hc = $_HCI01.dato_sis_neur_hc.DETALLE) : false;

  // leer sistema psiquiatrico
  $_HCI01.dato_sis_psiq_hc = await $_HCI01._detalles.find(
    (e) => e["COD-DETHC"] == "3070" && e["LLAVE-HC"] == $_HCI01._hcprc.llave
  );
  $_HCI01.dato_sis_psiq_hc != undefined ? ($_HCI01.dato_sis_psiq_hc = $_HCI01.dato_sis_psiq_hc.DETALLE) : false;

  // leer sistema genitourinario
  $_HCI01.dato_sis_geni_hc = await $_HCI01._detalles.find(
    (e) => e["COD-DETHC"] == "3080" && e["LLAVE-HC"] == $_HCI01._hcprc.llave
  );
  $_HCI01.dato_sis_geni_hc != undefined ? ($_HCI01.dato_sis_geni_hc = $_HCI01.dato_sis_geni_hc.DETALLE) : false;

  // leer sistema ginecologico
  $_HCI01.dato_sis_gine_hc = await $_HCI01._detalles.find(
    (e) => e["COD-DETHC"] == "3090" && e["LLAVE-HC"] == $_HCI01._hcprc.llave
  );
  $_HCI01.dato_sis_gine_hc != undefined ? ($_HCI01.dato_sis_gine_hc = $_HCI01.dato_sis_gine_hc.DETALLE) : false;

  // leer sistema obstetrico
  $_HCI01.dato_sis_obst_hc = await $_HCI01._detalles.find(
    (e) => e["COD-DETHC"] == "3095" && e["LLAVE-HC"] == $_HCI01._hcprc.llave
  );
  $_HCI01.dato_sis_obst_hc != undefined ? ($_HCI01.dato_sis_obst_hc = $_HCI01.dato_sis_obst_hc.DETALLE) : false;

  $_HCI01.analisis_hc = await $_HCI01._detalles.find(
    (e) => e["COD-DETHC"] == "7501" && e["LLAVE-HC"] == $_HCI01._hcprc.llave
  );
  $_HCI01.analisis_hc != undefined
    ? ($_HCI01.analisis_hc = $_HCI01.analisis_hc.DETALLE.replace(/\&/g, "\n").trim())
    : false;

  $_HCI01.plan_hc = await $_HCI01._detalles.find(
    (e) => e["COD-DETHC"] == "7503" && e["LLAVE-HC"] == $_HCI01._hcprc.llave
  );
  $_HCI01.plan_hc != undefined ? ($_HCI01.plan_hc = $_HCI01.plan_hc.DETALLE.replace(/\&/g, "\n").trim()) : false;

  $_HCI01.observacion_hc = await $_HCI01._detalles.find(
    (e) => e["COD-DETHC"] == "7502" && e["LLAVE-HC"] == $_HCI01._hcprc.llave
  );
  $_HCI01.observacion_hc != undefined
    ? ($_HCI01.observacion_hc = $_HCI01.observacion_hc.DETALLE.replace(/\&/g, "\n").trim())
    : false;

  $_HCI01.toxic_hc = await $_HCI01._detalles.find(
    (e) => e["COD-DETHC"] == "2035" && e["LLAVE-HC"] == $_HCI01._hcprc.llave
  );
  $_HCI01.toxic_hc != undefined ? ($_HCI01.toxic_hc = $_HCI01.toxic_hc.DETALLE.replace(/\&/g, "\n").trim()) : false;

  $_HCI01.exa_general_hc = await $_HCI01._detalles.find(
    (e) => e["COD-DETHC"] == "4005" && e["LLAVE-HC"] == $_HCI01._hcprc.llave
  );
  $_HCI01.exa_general_hc != undefined
    ? ($_HCI01.exa_general_hc = $_HCI01.exa_general_hc.DETALLE.replace(/\&/g, "\n").trim())
    : false;

  $_HCI01.dato_9001 = await $_HCI01._detalles.find(
    (e) => e["COD-DETHC"] == "9001" && e["LLAVE-HC"] == $_HCI01._hcprc.llave
  );
  $_HCI01.dato_9001 != undefined ? ($_HCI01.dato_9001 = $_HCI01.dato_9001.DETALLE) : false;

  $_HCI01.dato_9002 = await $_HCI01._detalles.find(
    (e) => e["COD-DETHC"] == "9002" && e["LLAVE-HC"] == $_HCI01._hcprc.llave
  );
  $_HCI01.dato_9002 != undefined ? ($_HCI01.dato_9002 = $_HCI01.dato_9002.DETALLE) : false;

  $_HCI01.dato_9005 = await $_HCI01._detalles.find(
    (e) => e["COD-DETHC"] == "9005" && e["LLAVE-HC"] == $_HCI01._hcprc.llave
  );
  $_HCI01.dato_9005 != undefined ? ($_HCI01.dato_9005 = $_HCI01.dato_9005.DETALLE) : false;

  $_HCI01.dato_9006 = await $_HCI01._detalles.find(
    (e) => e["COD-DETHC"] == "9006" && e["LLAVE-HC"] == $_HCI01._hcprc.llave
  );
  $_HCI01.dato_9006 != undefined ? ($_HCI01.dato_9006 = $_HCI01.dato_9006.DETALLE) : false;

  $_HCI01.dato_9008 = await $_HCI01._detalles.find(
    (e) => e["COD-DETHC"] == "9008" && e["LLAVE-HC"] == $_HCI01._hcprc.llave
  );
  $_HCI01.dato_9008 != undefined ? ($_HCI01.dato_9008 = $_HCI01.dato_9008.DETALLE) : false;

  $_HCI01.dato_9009 = await $_HCI01._detalles.find(
    (e) => e["COD-DETHC"] == "9009" && e["LLAVE-HC"] == $_HCI01._hcprc.llave
  );
  $_HCI01.dato_9009 != undefined ? ($_HCI01.dato_9009 = $_HCI01.dato_9009.DETALLE) : false;

  $_HCI01.dato_9012 = await $_HCI01._detalles.find((e) => e["COD-DETHC"] == "9012" && e["LLAVE-HC"] == $_HCI01._hcprc.llave);
  if($_HCI01.dato_9012) $_HCI01.dato_9012 = $_HCI01.dato_9012.DETALLE;

  return new Promise((resolve) => {
    resolve();
  });
}

async function crearJsonEnvio_HCI01() {
  $_HCI01.varEnvio = {
    _hcprc: $_HCI01._hcprc,
    _detalles: $_HCI01._detalles,
    _paci: $_HCI01._paci,
    _arrayCiudades: $_HCI01._ciudades,
    _hcprc_new: $_HCI01.hcprc_new,
  };
}

async function validaciones_HCI01() {
  return new Promise(async (resolve, reject) => {
    $_HCI01.sw_buscar = "";

    var b1 = [
      "A90X",
      "A91X",
      "R500",
      "R501",
      "R51X",
      "M791",
      "A90X",
      "A91X",
      "A920",
      "B338",
      "B500",
      "B520",
      "B528",
      "B529",
      "B530",
      "B531",
      "B538",
      "B54X",
    ].find((e) => e == $_HCI01._hcprc.rips.tabla_diag[0].diagn);
    var b2 = [
      "A90X",
      "A91X",
      "R500",
      "R501",
      "R51X",
      "M791",
      "A90X",
      "A91X",
      "A920",
      "B338",
      "B500",
      "B520",
      "B528",
      "B529",
      "B530",
      "B531",
      "B538",
      "B54X",
    ].find((e) => e == $_HCI01._hcprc.rips.tabla_diag[1].diagn);
    var b3 = [
      "A90X",
      "A91X",
      "R500",
      "R501",
      "R51X",
      "M791",
      "A90X",
      "A91X",
      "A920",
      "B338",
      "B500",
      "B520",
      "B528",
      "B529",
      "B530",
      "B531",
      "B538",
      "B54X",
    ].find((e) => e == $_HCI01._hcprc.rips.tabla_diag[2].diagn);
    var b4 = [
      "A90X",
      "A91X",
      "R500",
      "R501",
      "R51X",
      "M791",
      "A90X",
      "A91X",
      "A920",
      "B338",
      "B500",
      "B520",
      "B528",
      "B529",
      "B530",
      "B531",
      "B538",
      "B54X",
    ].find((e) => e == $_HCI01._hcprc.rips.tabla_diag[3].diagn);
    var b5 = [
      "A90X",
      "A91X",
      "R500",
      "R501",
      "R51X",
      "M791",
      "A90X",
      "A91X",
      "A920",
      "B338",
      "B500",
      "B520",
      "B528",
      "B529",
      "B530",
      "B531",
      "B538",
      "B54X",
    ].find((e) => e == $_HCI01._hcprc.rips.tabla_diag[4].diagn);

    b1 != undefined || b2 != undefined || b3 != undefined || b4 != undefined || b5 != undefined
      ? ($_HCI01.recom_dengue_w = "S")
      : false;

    $_HCI01._hcprc.esquema == "9004" || $_HCI01._hcprc.esquema == "HC90" ? ($_HCI01.sw_buscar = 0) : false;

    await llenarEncabezado_HCI01();

    await llenarDatosPaciente_HCI01();

    if ($_HCI01.opciones.opc_aper == "S") {
      $_HCI01.sw_espec = "";
      await buscarOftalmologia_HCI01();
      $_HCI01.sw_espec.trim() == "" ? await buscarOtorrino_HCI01() : false;
      await imprimirProcedencia_HCI01();
      await imprimirAcompa_HCI01();
      await imprimirMotivo_HCI01();

      await imprimirEnfermedadActual_HCI01();
      await imprimirRevisionSistemas_HCI01();

      switch ($_HCI01.sw_espec) {
        case "OFT":
          await imprimirOftalmologia_HCI01();
          break;
        case "OTO":
          await imprimirSignos_HCI01();
          await imprimirOtorrino_HCI01();
          break;
        default:
          await imprimirSignos_HCI01();
          await imprimirExamenFisico_HCI01();
          await buscarGineco_HCI01();
      }

      $_HCI01._hcprc.violencia.orientacion_sex.trim() != "" ? await imprimirViolencia_HCI01() : false;

      $_HCI01._hcprc.tratamiento_sifilis[2].nece_retto.trim() != "" ? await imprimirSifilisCong_HCI01() : false;

      await imprimirTactoRectal_HCI01();

      await imprimirDatosEtv_HCI01();

      await imprimirDatosMentales_HCI01();

      await imprimirDatosMultidrogoresis_HCI01();

      // await imprimirEpoc_HCI01();
      await imprimirIpa_HCI01();

      await imprimirVacunaCovid9012_HCI01();

      await imprimirDatosCovid_HCI01();

      await imprimirTelesalud_HCI01();

      await imprimirDiagnostico_HCI01();
      $_HCI01.nit_usu == 900264583 ? await imprimirTipoDiag_HCI01() : false;

      await imprimirAnalisis_HCI01();
      $_HCI01.nit_usu == 900264583 ? false : await imprimirTipoDiag_HCI01();

      await imprimirRips_HCI01();

      $_HCI01._hcprc.signos.sintom_resp.trim() != "" ? await imprimirSintomRespi_HCI01() : false;
      $_HCI01._hcprc.signos.sintom_piel.trim() != "" ? await imprimirSintomPiel_HCI01() : false;
      $_HCI01._hcprc.signos.victi_maltrato.trim() != "" ? await imprimirVictiMaltrato_HCI01() : false;
      $_HCI01._hcprc.signos.victi_violencia.trim() != "" ? await imprimirVictiViolencia_HCI01() : false;
      $_HCI01._hcprc.signos.enfer_mental.trim() != "" ? await imprimirEnferMental_HCI01() : false;

      if ($_HCI01.nit_usu != 900565371) {
        $_HCI01._hcprc.signos.enfer_its.trim() != "" ? await imprimirEnferIts_HCI01() : false;

        if ($_HCI01._paci.SEXO == "F") {
          $_HCI01._hcprc.signos.cancer_seno.trim() != "" ? await imprimirCancerSeno_HCI01() : false;
          $_HCI01._hcprc.signos.cancer_cervis.trim() != "" ? await imprimirCancerCervis_HCI01() : false;
        }
      }

      $_HCI01._hcprc.signos.edu_autoexa_seno.trim() != "" ? await imprimirEduAutoExaSeno_HCI01() : false;
      $_HCI01._hcprc.signos.citologia_previa.trim() != "" ? await imprimirCitologiaPrevia_HCI01() : false;
      parseFloat($_HCI01._hcprc.signos.fecha_cito_previa.substring(6, 8)) > 0
        ? await imprimirFechaCitoPrevia_HCI01()
        : false;

      if (parseFloat($_HCI01._hcprc.signos.creatinina) > 0 || parseFloat($_HCI01._hcprc.signos.creatinina2) > 0) {
        await imprimirCreatininaGlomedular_HCI01();
        await imprimirHemoGlicosada_HCI01();
        await imprimirMicroalbuminuria_HCI01();
      }

      parseFloat($_HCI01._hcprc.signos.riesgo_cardio) > 0 ? await imprimirRiesgoCardio_HCI01() : false;

      var rela_albumi_creatinina_w = `${$_HCI01._hcprc.signos.rela_albumi_creatini_1}${$_HCI01._hcprc.signos.rela_albumi_creatini_2}`;
      parseFloat(rela_albumi_creatinina_w) > 0 ? await imprimirRelAlbumiCreati_HCI01(rela_albumi_creatinina_w) : false;

      await imprimirErc_HCI01();

      await imprimirEsquemaHC02_HCI01();

      // LLENAR AGUDEZA VISUAL PYP

      if ($_HCI01._hcprc.examen_visual.estructuras_oculares_oi.trim() != "" && $_HCI01._hcprc.serv != "05") {
        datos.agud = true;
        switch ($_HCI01._hcprc.examen_visual.estructuras_oculares_oi) {
          case "1":
            datos.agudeza.izqSinAlt = true;
            datos.agudeza.izqConAlt = false;
            break;
          case "2":
            datos.agudeza.izqSinAlt = false;
            datos.agudeza.izqConAlt = true;
            break;
          default:
            datos.agudeza.izqSinAlt = false;
            datos.agudeza.izqConAlt = false;
            break;
        }

        switch ($_HCI01._hcprc.examen_visual.estructuras_oculares_od) {
          case "1":
            datos.agudeza.derSinAlt = true;
            datos.agudeza.derConAlt = false;
            break;
          case "2":
            datos.agudeza.derSinAlt = false;
            datos.agudeza.derConAlt = true;
            break;
          default:
            datos.agudeza.derSinAlt = false;
            datos.agudeza.derConAlt = false;
            break;
        }

        datos.agudeza.nivel1 = parseInt($_HCI01._hcprc.examen_visual.agudeza_visual_oi_1).toString();
        datos.agudeza.nivel2 = parseInt($_HCI01._hcprc.examen_visual.agudeza_visual_oi_2).toString();
        datos.agudeza.nivel3 = parseInt($_HCI01._hcprc.examen_visual.agudeza_visual_od_1).toString();
        datos.agudeza.nivel4 = parseInt($_HCI01._hcprc.examen_visual.agudeza_visual_od_2).toString();

        datos.agudeza.fecha = $_HCI01._hcprc.fecha;
      }

      await imprimirSalida_HCI01();

      await imprimirFirma_HCI01();

      if ($_HCI01.recom_dengue_w == "S") {
        $_HCI01.nit_usu == 892000458 ? (datos.dengueCuadro.bandera = true) : (datos.recomDengue.bandera = true);
      }

      $_HCI01._hcprc.covid19.recomendacion_covid19 == "S" ? (datos.covid.recomendaciones.bandera = true) : false;

      if (
        $_HCI01.nit_usu == 800162035 &&
        parseFloat($_HCI01._hcprc.fecha) > 20200321 &&
        parseFloat($_HCI01._hcprc.fecha) < 20201231
      ) {
        datos.covid.prevencion.bandera = true;
      }

      await imprimirDownton_HCI01();
      await imprimirBraden_HCI01();
    }

    resolve();
  });
}

async function llenarEncabezado_HCI01() {
  // ***** LLENAR ENCABEZADO *****

  datos.encabezado.nombre = $_USUA_GLOBAL[0].NOMBRE;

  $_HCI01.nit_usu = $_USUA_GLOBAL[0].NIT;
  datos.encabezado.nit = $_HCI01.nit_usu;

  if ($_HCI01.opciones.opc_aper == "S") {
    $_HCI01.nit_usu == 900565371
      ? (datos.encabezado.titulo = "INGRESO DEL USUARIO")
      : (datos.encabezado.titulo = "HISTORIA CLINICA");
  } else {
    datos.encabezado.titulo = "EXTRACTO DE HISTORIA CLINICA";
  }

  datos.paciente.nombre = $_HCI01._paci.DESCRIP.replace(/\s+/g, " ");

  datos.paciente.tipoId = $_HCI01._paci["TIPO-ID"];
  isNaN($_HCI01._paci.COD) == true
    ? (aux = $_HCI01._paci.COD)
    : (aux = new Intl.NumberFormat("ja-JP").format($_HCI01._paci.COD));
  datos.paciente.id = aux;
  datos.paciente.foto = parseFloat($_HCI01._paci.COD);
  datos.paciente.SucFolio = $_HCI01._hcprc.llave.substring(15, 17) + " - " + $_HCI01._hcprc.llave.substring(17, 23);
  datos.encabezado.fecha = localStorage.Usuario + moment().format(" YYYY-MM-DD HH:mm");

  return true;
}

async function llenarDatosPaciente_HCI01() {
  // ***** LLENAR DATOS PACIENTE *****
  var horaIng = $_HCI01._hcprc.hora.substring(0, 2) + ":" + $_HCI01._hcprc.hora.substring(2, 4);
  var horaEgr = $_HCI01._hcprc.hora_egres.substring(0, 2) + ":" + $_HCI01._hcprc.hora_egres.substring(2, 4);
  datos.paciente.fechaIng =
    $_HCI01._hcprc.fecha.substring(6, 8) +
    "-" +
    $_HCI01._hcprc.fecha.substring(4, 6) +
    "-" +
    $_HCI01._hcprc.fecha.substring(0, 4) +
    "  -  " +
    horaIng;
  datos.paciente.fechaEgr =
    $_HCI01._hcprc.egreso.substring(4, 6) != 0
      ? $_HCI01._hcprc.egreso.substring(6, 8) +
        "-" +
        $_HCI01._hcprc.egreso.substring(4, 6) +
        "-" +
        $_HCI01._hcprc.egreso.substring(0, 4) +
        "  -  " +
        horaEgr
      : 0;
  datos.paciente.edad = $_HCI01._hcprc.edad;
  datos.paciente.nacim =
    $_HCI01._paci["NACIM"].substring(6, 8) +
    "-" +
    $_HCI01._paci["NACIM"].substring(4, 6) +
    "-" +
    $_HCI01._paci["NACIM"].substring(0, 4);
  $_HCI01._paci["SEXO"] == "F" ? (datos.paciente.sexo = "Fem.") : (datos.paciente.sexo = "Masc");
  datos.paciente.ciudad = $_HCI01._paci["DESCRIP-CIUDAD"];
  datos.paciente.telefono = $_HCI01._paci["TELEFONO"];
  datos.paciente.acomp = $_HCI01._paci["ACOMPA"];

  if (
    $_HCI01._hcprc.cierre.nit_fact == "" ||
    $_HCI01._hcprc.cierre.nit_fact == "0000000000" ||
    $_HCI01.nit_usu == 800175901 ||
    $_HCI01.nit_usu == 19381427 ||
    $_HCI01.nit_usu == 17306492 ||
    $_HCI01.nit_usu == 31810010
  ) {
    datos.paciente.entidad = $_HCI01._paci["NOMBRE-EPS"];
  } else {
    datos.paciente.entidad = $_HCI01._hcprc.cierre.descrip_nit_fact;
  }

  parseFloat($_HCI01._hcprc.cierre.nro_fact) == 0 || $_HCI01._hcprc.cierre.nro_fact.trim() == ""
    ? (datos.paciente.fact = "")
    : (datos.paciente.fact = $_HCI01._hcprc.cierre.prefijo + $_HCI01._hcprc.cierre.nro_fact);
  datos.paciente.hab = $_HCI01._hcprc.cierre.hab;
  parseFloat($_HCI01._hcprc.rips.triage) != 0
    ? (datos.paciente.triage = $_HCI01._hcprc.rips.triage)
    : (datos.paciente.triage = "");
  datos.paciente.folio = $_HCI01._hcprc.llave.substring(15, 17) + " - " + $_HCI01._hcprc.llave.substring(17, 23);
  datos.paciente.unServ = $_HCI01._hcprc.cierre.descrip_unserv;
  datos.paciente.barrio = $_HCI01._paci["DESCRIP-BARRIO"];

  return true;
}

async function buscarOftalmologia_HCI01() {
  if ($_HCI01.dato_4010 != undefined) {
    $_HCI01.dato_4010["agud_lej_sc_od_esq_w"] = $_HCI01.dato_4010["agud_lej_sc_od_esq_w"].replace(/\000/g, "   ");
    $_HCI01.dato_4010["agud_lej_sc_oi_esq_w"] = $_HCI01.dato_4010["agud_lej_sc_oi_esq_w"].replace(/\000/g, "   ");

    $_HCI01.dato_4010["agud_cer_sc_od_esq_w"] = $_HCI01.dato_4010["agud_cer_sc_od_esq_w"].replace(/\000/g, "   ");
    $_HCI01.dato_4010["agud_cer_sc_oi_esq_w"] = $_HCI01.dato_4010["agud_cer_sc_oi_esq_w"].replace(/\000/g, "   ");

    $_HCI01.dato_4010["agud_lej_cc_od_esq_w"] = $_HCI01.dato_4010["agud_lej_cc_od_esq_w"].replace(/\000/g, "   ");
    $_HCI01.dato_4010["agud_lej_cc_oi_esq_w"] = $_HCI01.dato_4010["agud_lej_cc_oi_esq_w"].replace(/\000/g, "   ");

    $_HCI01.dato_4010["agud_cer_cc_od_esq_w"] = $_HCI01.dato_4010["agud_cer_cc_od_esq_w"].replace(/\000/g, "   ");
    $_HCI01.dato_4010["agud_cer_cc_oi_esq_w"] = $_HCI01.dato_4010["agud_cer_cc_oi_esq_w"].replace(/\000/g, "   ");

    $_HCI01.dato_4010["agud_cer_cc_od_esq_w"] = $_HCI01.dato_4010["agud_cer_cc_od_esq_w"].replace(/\000/g, "   ");
    $_HCI01.dato_4010["agud_cer_cc_oi_esq_w"] = $_HCI01.dato_4010["agud_cer_cc_oi_esq_w"].replace(/\000/g, "   ");

    $_HCI01.dato_4010["form_lej_od_esq_w"] = $_HCI01.dato_4010["form_lej_od_esq_w"].replace(/\000/g, "   ");
    $_HCI01.dato_4010["form_lej_oi_esq_w"] = $_HCI01.dato_4010["form_lej_oi_esq_w"].replace(/\000/g, "   ");
    $_HCI01.dato_4010["form_lej_ad_esq_w"] = $_HCI01.dato_4010["form_lej_ad_esq_w"].replace(/\000/g, "   ");

    $_HCI01.dato_4010["form_cer_od_esq_w"] = $_HCI01.dato_4010["form_cer_od_esq_w"].replace(/\000/g, "   ");
    $_HCI01.dato_4010["form_cer_oi_esq_w"] = $_HCI01.dato_4010["form_cer_oi_esq_w"].replace(/\000/g, "   ");
    $_HCI01.dato_4010["form_cer_ad_esq_w"] = $_HCI01.dato_4010["form_cer_ad_esq_w"].replace(/\000/g, "   ");

    if (
      $_HCI01.dato_4010["agud_lej_sc_od_esq_w"].trim() != "" ||
      $_HCI01.dato_4010["agud_cer_sc_oi_esq_w"].trim() != "" ||
      $_HCI01.dato_4010["agud_lej_cc_od_esq_w"].trim() != "" ||
      $_HCI01.dato_4010["agud_cer_cc_od_esq_w"].trim() != "" ||
      $_HCI01.dato_4010["form_lej_od_esq_w"].trim() != "" ||
      $_HCI01.dato_4010["form_cer_od_esq_w"].trim() != "" ||
      $_HCI01.dato_4011["pio_ocu_esq_w"].trim() != "" ||
      $_HCI01.dato_4011["motili_esq_w"][0]["motil1_ocu_esq_w"].trim() != "" ||
      $_HCI01.dato_4011["exter_esq_w"][0]["exter1_ocu_esq_w"].trim() != "" ||
      $_HCI01.dato_4011["biomic_esq_w"][0]["biomic1_ocu_esq_w"].trim() != "" ||
      $_HCI01.dato_4011["fondo_esq_w"][0]["fondo1_ocu_esq_w"].trim() != ""
    ) {
      $_HCI01.sw_espec = "OFT";
    }
  } else {
    datos.examVisual.bandera = false;
  }

  return true;
}

async function buscarOtorrino_HCI01() {
  if ($_HCI01.dato_4030 != undefined) {
    $_HCI01.dato_4030["pabel_4030"].trim() != "" && $_HCI01.dato_4030["condu_4030"].trim() != ""
      ? (($_HCI01.sw_espec = "OTO"), (datos.otorrino.bandera = true))
      : false;
  } else {
    datos.otorrino.bandera = false;
  }
  return true;
}

async function imprimirProcedencia_HCI01() {
  if ($_HCI01._hcprc.proceden.trim() != "") {
    datos.subs.titulos.push("PROCEDENCIA:");
    datos.subs.contenido.push($_HCI01._hcprc.proceden);
  }
}

async function imprimirAcompa_HCI01() {
  if ($_HCI01._hcprc.acompa.trim() != "") {
    datos.subs.titulos.push("ACOMPAÑANTE:");
    datos.subs.contenido.push($_HCI01._hcprc.acompa);
  }
}

// IMPRIME MOTIVO DE HISTORIA
async function imprimirMotivo_HCI01() {
  $_HCI01._hcprc.esquema == "HC02"
    ? datos.subs.titulos.push("MOTIVO DE PERMANENCIA:")
    : datos.subs.titulos.push("MOTIVO DE CONSULTA:");
  datos.subs.contenido.push($_HCI01._hcprc.motivo);
}

// IMPRIME ENFERMEDAD ACTUAL
async function imprimirEnfermedadActual_HCI01() {
  if ($_HCI01.enf_act_hc != undefined) {
    datos.subs.titulos.push("ENFERMEDAD ACTUAL:");
    datos.subs.contenido.push($_HCI01.enf_act_hc);
  }

  if (
    $_HCI01.famil_hc == undefined &&
    $_HCI01.medic_hc == undefined &&
    $_HCI01.quiru_hc == undefined &&
    $_HCI01.farma_hc == undefined &&
    $_HCI01.toxic_hc == undefined &&
    $_HCI01.traum_hc == undefined &&
    $_HCI01.ocupa_hc == undefined &&
    $_HCI01.ginec_hc == undefined &&
    $_HCI01.otros_hc == undefined
  ) {
    // continue
  } else {
    if ($_HCI01.nit_usu == 800175901 && $_HCI01._paci["EPS"] == "PAR001") {
      // continue
    } else {
      if ($_HCI01.famil_hc) {
        if(!$_HCI01.famil_hc.tipo_ws) {
          if ($_HCI01.famil_hc.trim() != "") {
            datos.subs.titulos.push("ANTECEDENTES:");
            datos.subs.contenido.push($_HCI01.famil_hc);
          }
        }
      }

      if ($_HCI01.nit_usu == 892000401 && $_HCI01._hcprc.rips.atiende == "1") {
        $_HCI01.famil_hc = "";
        $_HCI01.medic_hc = "";
        $_HCI01.quiru_hc = "";
        $_HCI01.farma_hc = "";
        $_HCI01.traum_hc = "";
        $_HCI01.ocupa_hc = "";
        $_HCI01.ginec_hc = "";
        $_HCI01.otros_hc = "";
      }

      if ($_HCI01.famil_hc) {
        if($_HCI01.famil_hc.tipo_ws) {
          datos.subs.titulos.push("ANTECEDENTES:");
          // datos.subs.titulos.push("obj_2002");
          switch($_HCI01.famil_hc.tipo_ws) {
            case "01": datos.subs.contenido.push(antecedentes2002_01_impHc($_HCI01.famil_hc)); break;
            case "02": datos.subs.contenido.push(antecedentes2002_02_impHc($_HCI01.famil_hc)); break;
            case "03": datos.subs.contenido.push(antecedentes2002_03_impHc($_HCI01.famil_hc)); break;
            case "04": datos.subs.contenido.push(antecedentes2002_04_impHc($_HCI01.famil_hc)); break;
          }
        } else {
          if ($_HCI01.famil_hc.trim() != "") {
            if ($_HCI01._hcprc.serv == "01" || $_HCI01.medic_hc == undefined) {
              datos.subs.titulos.push("ANTECEDENTES GENERALES:");
            } else {
              datos.subs.titulos.push("FAMILIARES:");
            }
            datos.subs.contenido.push($_HCI01.famil_hc.substring(0, 95) + $_HCI01.famil_hc.substring(95, 190));
            }
          }
      }

      if ($_HCI01.medic_hc != undefined) {
        if ($_HCI01.medic_hc.trim() != "") {
          datos.subs.titulos.push("MEDICOS:");
          datos.subs.contenido.push($_HCI01.medic_hc);
        }
      }

      if ($_HCI01.quiru_hc != undefined) {
        if ($_HCI01.quiru_hc.trim() != "") {
          datos.subs.titulos.push("QUIRURGICOS:");
          datos.subs.contenido.push($_HCI01.quiru_hc);
        }
      }

      if ($_HCI01.farma_hc != undefined) {
        if ($_HCI01.farma_hc.trim() != "") {
          datos.subs.titulos.push("FARMACOLOGICOS:");
          datos.subs.contenido.push($_HCI01.farma_hc);
        }
      }

      if ($_HCI01.toxic_hc != undefined) {
        if ($_HCI01.toxic_hc.trim() != "") {
          datos.subs.titulos.push("ALERGICOS:");
          datos.subs.contenido.push($_HCI01.toxic_hc);
        }
      }

      if ($_HCI01.traum_hc != undefined) {
        if ($_HCI01.traum_hc.trim() != "") {
          datos.subs.titulos.push("TRAUMATOLOGICOS:");
          datos.subs.contenido.push($_HCI01.traum_hc);
        }
      }

      if ($_HCI01.ocup_hc != undefined) {
        if ($_HCI01.ocup_hc.trim() != "") {
          datos.subs.titulos.push("OCUPACIONALES:");
          datos.subs.contenido.push($_HCI01.ocup_hc);
        }
      }

      if ($_HCI01.ginec_hc != undefined) {
        if ($_HCI01.ginec_hc.trim() != "") {
          datos.subs.titulos.push("GINECO-OBSTETRICOS:");
          datos.subs.contenido.push($_HCI01.ginec_hc);
        }
      }

      if ($_HCI01.ant_hospi_hc != undefined) {
        if ($_HCI01.ant_hospi_hc.trim() != "") {
          datos.subs.titulos.push("HOSPITALARIOS:");
          datos.subs.contenido.push($_HCI01.ant_hospi_hc);
        }
      }

      if ($_HCI01.otros_hc != undefined) {
        if($_HCI01.otros_hc.tipo_ws) {
          datos.subs.titulos.push("");
          datos.subs.contenido.push(antecedentes2070_impHc($_HCI01.otros_hc));
        } else if ($_HCI01.otros_hc.trim() != "") {
          datos.subs.titulos.push("OTROS ANTECEDENTES:");
          datos.subs.contenido.push($_HCI01.otros_hc);
        }
      }
    }
  }

  // IMPRIME DATOS ADICIONALES
  if ($_HCI01._hcprc["esq_vacuna_completo"] == "N" || $_HCI01._hcprc["esq_vacuna_completo"] == "S") {
    datos.lineas.titulos.push("ESQUEMA DE VACUNACIÓN COMPLETO: ");
    $_HCI01._hcprc["esq_vacuna_completo"] == "S"
      ? datos.lineas.contenido.push("SI")
      : datos.lineas.contenido.push("NO");
  }

  if ($_HCI01._hcprc["salud_oral_ult_6mes"] == "N" || $_HCI01._hcprc["salud_oral_ult_6mes"] == "S") {
    datos.lineas.titulos.push("SALUD ORAL EN LOS ULTIMOS 6 MESES: ");
    $_HCI01._hcprc["salud_oral_ult_6mes"] == "S"
      ? datos.lineas.contenido.push("SI")
      : datos.lineas.contenido.push("NO");
  }

  if ($_HCI01._hcprc["salud_oral_ult_12mes"] == "N" || $_HCI01._hcprc["salud_oral_ult_12mes"] == "S") {
    datos.lineas.titulos.push("SALUD ORAL EN LOS ULTIMOS 12 MESES: ");
    $_HCI01._hcprc["salud_oral_ult_12mes"] == "S"
      ? datos.lineas.contenido.push("SI")
      : datos.lineas.contenido.push("NO");
  }

  if ($_HCI01._hcprc["curso_psicoprofilactico"] == "N" || $_HCI01._hcprc["curso_psicoprofilactico"] == "S") {
    datos.lineas.titulos.push("ASISTIÓ A CURSO PSICOPROFILACTICO: ");
    $_HCI01._hcprc["curso_psicoprofilactico"] == "S"
      ? datos.lineas.contenido.push("SI")
      : datos.lineas.contenido.push("NO");
  }

  if ($_HCI01._hcprc["ult_ano_humi_unsul_ame"] == "N" || $_HCI01._hcprc["ult_ano_humi_unsul_ame"] == "S") {
    $_HCI01._hcprc["ult_ano_humi_unsul_ame"] == "S" ? datos.preguntas1.push("SI") : datos.preguntas1.push("NO");
  } else {
    datos.preguntas1.push(" ");
  }

  if ($_HCI01._hcprc["ult_ano_golp_bofe_fisi"] == "N" || $_HCI01._hcprc["ult_ano_golp_bofe_fisi"] == "S") {
    $_HCI01._hcprc["ult_ano_golp_bofe_fisi"] == "S" ? datos.preguntas1.push("SI") : datos.preguntas1.push("NO");
  } else {
    datos.preguntas1.push(" ");
  }

  if ($_HCI01._hcprc["gest_golp_bofe_fisi"] == "N" || $_HCI01._hcprc["gest_golp_bofe_fisi"] == "S") {
    $_HCI01._hcprc["gest_golp_bofe_fisi"] == "S" ? datos.preguntas1.push("SI") : datos.preguntas1.push("NO");
  } else {
    datos.preguntas1.push(" ");
  }

  if ($_HCI01._hcprc["gest_golp_bofe_fisi"] == "N" || $_HCI01._hcprc["gest_golp_bofe_fisi"] == "S") {
    $_HCI01._hcprc["gest_golp_bofe_fisi"] == "S" ? datos.preguntas1.push("SI") : datos.preguntas1.push("NO");
  } else {
    datos.preguntas1.push(" ");
  }

  if ($_HCI01._hcprc["ult_ano_forzada_sex"] == "N" || $_HCI01._hcprc["ult_ano_forzada_sex"] == "S") {
    $_HCI01._hcprc["ult_ano_forzada_sex"] == "S" ? datos.preguntas1.push("SI") : datos.preguntas1.push("NO");
  } else {
    datos.preguntas1.push(" ");
  }

  if ($_HCI01.dato_2080 != undefined) {
    $_HCI01.dato_2080["edad2_her1_esq_w"].trim() == "" ? ($_HCI01.dato_2080["edad2_her1_esq_w"] = 0) : false;
    $_HCI01.dato_2080["edad2_pad_esq_w"].trim() == "" ? ($_HCI01.dato_2080["edad2_pad_esq_w"] = 0) : false;
    $_HCI01.dato_2080["edad2_mad_esq_w"].trim() == "" ? ($_HCI01.dato_2080["edad2_mad_esq_w"] = 0) : false;

    if ($_REG_HC.edad_hc.vlr_edad > 12) {
      // continue
    } else {
      if (
        parseFloat($_HCI01.dato_2080["edad2_her1_esq_w"]) > 0 ||
        parseFloat($_HCI01.dato_2080["edad2_pad_esq_w"]) > 0 ||
        parseFloat($_HCI01.dato_2080["edad2_mad_esq_w"]) > 0
      ) {
        imprimirGenograma_HCI01();
      }
    }
  }
}

// IMPRIME SUBTITULOS REVISION DE SISTEMAS
async function imprimirRevisionSistemas_HCI01() {
  if (
    $_HCI01.dato_sis_sent_hc == undefined &&
    $_HCI01.dato_sis_card_hc == undefined &&
    $_HCI01.dato_sis_dige_hc == undefined &&
    $_HCI01.dato_sis_derm_hc == undefined &&
    $_HCI01.dato_sis_oste_hc == undefined &&
    $_HCI01.dato_sis_neur_hc == undefined &&
    $_HCI01.dato_sis_psiq_hc == undefined &&
    $_HCI01.dato_sis_geni_hc == undefined &&
    $_HCI01.dato_sis_gine_hc == undefined &&
    $_HCI01.dato_sis_obst_hc == undefined
  ) {
    // continue
  } else {
    datos.subs.titulos.push("R E V I S I O N  P O R  S I S T E M A S");
    datos.subs.contenido.push("");
  }

  if ($_HCI01.dato_sis_sent_hc != undefined) {
    if($_HCI01.dato_sis_sent_hc.patol_ardor_ojos != undefined) {
      datos.subs.titulos.push("");
      datos.subs.contenido.push(antecedentes3010_impHc($_HCI01.dato_sis_sent_hc));
    } else if ($_HCI01.dato_sis_sent_hc.trim() != "") {
      datos.subs.titulos.push("SENTIDOS:");
      datos.subs.contenido.push($_HCI01.dato_sis_sent_hc.trim());
    }
  }
  if ($_HCI01.dato_sis_card_hc != undefined) {
    if ($_HCI01.dato_sis_card_hc.trim() != "") {
      datos.subs.titulos.push("CARDIOPULMUNAR:");
      datos.subs.contenido.push($_HCI01.dato_sis_card_hc.trim());
    }
  }
  if ($_HCI01.dato_sis_dige_hc != undefined) {
    if ($_HCI01.dato_sis_dige_hc.trim() != "") {
      datos.subs.titulos.push("DIGESTIVO:");
      datos.subs.contenido.push($_HCI01.dato_sis_dige_hc.trim());
    }
  }
  if ($_HCI01.dato_sis_derm_hc != undefined) {
    if ($_HCI01.dato_sis_derm_hc.trim() != "") {
      datos.subs.titulos.push("DERMATOLOGICO:");
      datos.subs.contenido.push($_HCI01.dato_sis_derm_hc.trim());
    }
  }
  if ($_HCI01.dato_sis_oste_hc != undefined) {
    if ($_HCI01.dato_sis_oste_hc.trim() != "") {
      datos.subs.titulos.push("OSTEOARTICULAR:");
      datos.subs.contenido.push($_HCI01.dato_sis_oste_hc.trim());
    }
  }
  if ($_HCI01.dato_sis_neur_hc != undefined) {
    if ($_HCI01.dato_sis_neur_hc.trim() != "") {
      datos.subs.titulos.push("NEUROLOGICO:");
      datos.subs.contenido.push($_HCI01.dato_sis_neur_hc.trim());
    }
  }
  if ($_HCI01.dato_sis_psiq_hc != undefined) {
    if ($_HCI01.dato_sis_psiq_hc.trim() != "") {
      datos.subs.titulos.push("PSIQUIATRICO:");
      datos.subs.contenido.push($_HCI01.dato_sis_psiq_hc.trim());
    }
  }
  if ($_HCI01.dato_sis_geni_hc != undefined) {
    if ($_HCI01.dato_sis_geni_hc.trim() != "") {
      datos.subs.titulos.push("GENITOURINARIO:");
      datos.subs.contenido.push($_HCI01.dato_sis_geni_hc.trim());
    }
  }
  if ($_HCI01.dato_sis_gine_hc != undefined) {
    if ($_HCI01.dato_sis_gine_hc.trim() != "") {
      datos.subs.titulos.push("GINECO-OBSTETRICO:");
      datos.subs.contenido.push($_HCI01.dato_sis_gine_hc.trim());
    }
  }
  if ($_HCI01.dato_sis_obst_hc != undefined) {
    if ($_HCI01.dato_sis_obst_hc.trim() != "") {
      datos.subs.titulos.push("OBSTETRICO:");
      datos.subs.contenido.push($_HCI01.dato_sis_obst_hc.trim());
    }
  }

  return true;
}

// IMPRIME TABLA DE OFTALMOLOGIA
async function imprimirOftalmologia_HCI01() {
  if ($_HCI01.dato_4010 != undefined) {
    // VERIFICACION DE QUE EXISTA DETALLE 4010
    datos.examVisual.bandera = true;
    if (
      $_HCI01.dato_4010["agud_lej_sc_od_esq_w"].trim() != "" ||
      $_HCI01.dato_4010["agud_Cer_cc_oi_esq_w"].trim() != "" ||
      $_HCI01.dato_4010["agud_lej_cc_od_esq_w"].trim() != ""
    ) {
      datos.examVisual.tit.push("AGUDEZA VISUAL");
      datos.examVisual.dato1.push("lejos (sc)");
      datos.examVisual.dato2.push("cerca (sc)");
      datos.examVisual.dato3.push("lejos (cc)");
      datos.examVisual.dato4.push("cerca (cc)");

      datos.examVisual.tit.push("Ojo Derecho");
      datos.examVisual.dato1.push($_HCI01.dato_4010["agud_lej_sc_od_esq_w"]);
      datos.examVisual.dato2.push($_HCI01.dato_4010["agud_cer_sc_od_esq_w"]);
      datos.examVisual.dato3.push($_HCI01.dato_4010["agud_lej_cc_od_esq_w"]);
      datos.examVisual.dato4.push($_HCI01.dato_4010["agud_cer_cc_od_esq_w"]);

      datos.examVisual.tit.push("Ojo Izquierda");
      datos.examVisual.dato1.push($_HCI01.dato_4010["agud_lej_sc_oi_esq_w"]);
      datos.examVisual.dato2.push($_HCI01.dato_4010["agud_cer_sc_oi_esq_w"]);
      datos.examVisual.dato3.push($_HCI01.dato_4010["agud_lej_cc_oi_esq_w"]);
      datos.examVisual.dato4.push($_HCI01.dato_4010["agud_cer_cc_oi_esq_w"]);

      datos.examVisual.tit.push(" ");
      datos.examVisual.dato1.push("Fórmula uso lejos");
      datos.examVisual.dato2.push("Fórmula uso cerca");
      datos.examVisual.dato3.push("Refracc. estat");
      datos.examVisual.dato4.push("Refracc. dinamica");

      datos.examVisual.tit.push("Ojo Derecho");
      datos.examVisual.dato1.push($_HCI01.dato_4010["form_lej_od_esq_w"]);
      datos.examVisual.dato2.push($_HCI01.dato_4010["form_cer_od_esq_w"]);
      datos.examVisual.dato3.push($_HCI01.dato_4010["refracc_esta_od_esq_w"]);
      datos.examVisual.dato4.push($_HCI01.dato_4010["refracc_dina_od_esq_w"]);

      datos.examVisual.tit.push("Ojo Izquierda");
      datos.examVisual.dato1.push($_HCI01.dato_4010["form_lej_oi_esq_w"]);
      datos.examVisual.dato2.push($_HCI01.dato_4010["form_cer_oi_esq_w"]);
      datos.examVisual.dato3.push($_HCI01.dato_4010["refracc_esta_oi_esq_w"]);
      datos.examVisual.dato4.push($_HCI01.dato_4010["refracc_dina_oi_esq_w"]);

      datos.examVisual.tit.push("Adición");
      datos.examVisual.dato1.push($_HCI01.dato_4010["form_lej_ad_esq_w"]);
      datos.examVisual.dato2.push($_HCI01.dato_4010["form_cer_ad_esq_w"]);
      datos.examVisual.dato3.push($_HCI01.dato_4010["refracc_esta_ad_esq_w"]);
      datos.examVisual.dato4.push($_HCI01.dato_4010["refracc_dina_ad_esq_w"]);

      datos.examVisual.tit.push(" ");
      datos.examVisual.dato1.push("Queratometria");
      datos.examVisual.dato2.push("Subjetivo");
      datos.examVisual.dato3.push(" ");
      datos.examVisual.dato4.push(" ");

      datos.examVisual.tit.push("Ojo Derecho");
      datos.examVisual.dato1.push($_HCI01.dato_4010["queratro_od_esq_w"]);
      datos.examVisual.dato2.push($_HCI01.dato_4010["subjeti_od_esq_w"]);
      datos.examVisual.dato3.push($_HCI01.dato_4010[" "]);
      datos.examVisual.dato4.push($_HCI01.dato_4010[" "]);

      datos.examVisual.tit.push("Ojo Izquierdo");
      datos.examVisual.dato1.push($_HCI01.dato_4010["queratro_oi_esq_w"]);
      datos.examVisual.dato2.push($_HCI01.dato_4010["subjeti_oi_esq_w"]);
      datos.examVisual.dato3.push($_HCI01.dato_4010[" "]);
      datos.examVisual.dato4.push($_HCI01.dato_4010[" "]);

      datos.examVisual.tit.push("Adición");
      datos.examVisual.dato1.push($_HCI01.dato_4010[" "]);
      datos.examVisual.dato2.push($_HCI01.dato_4010["subjeti_ad_esq_w"]);
      datos.examVisual.dato3.push($_HCI01.dato_4010[" "]);
      datos.examVisual.dato4.push($_HCI01.dato_4010[" "]);
    }
  }

  // IMPRIME EXAMEN VUSUAL 2
  if ($_HCI01.dato_4011 != undefined) {
    // VERIFICACION DE QUE EXISTA DETALLE 4011
    datos.examVisual2.bandera = true;
    if (
      $_HCI01.dato_4011["pio_ocu_esq_w"].trim() != "" ||
      $_HCI01.dato_4011["motil_esq_w"][0]["motil1_ocu_esq_w"].trim() != "" ||
      $_HCI01.dato_4011["exter_esq_w"][0]["exter1_ocu_esq_w"].trim() != "" ||
      $_HCI01.dato_4011["biomic_esq_w"][0]["biomic1_ocu_esq_w"].trim() != "" ||
      $_HCI01.dato_4011["fondo_esq_w"][0]["fondo1_ocu_esq_w"].trim() != ""
    ) {
      datos.examVisual2.principal = "EXAMEN EXTERNO";
    } else {
      datos.examVisual2.principal = "";
    }
    if ($_HCI01.dato_4011["pio_ocu_esq_w"].trim() != "") {
      datos.examVisual2.tit.push("P.I.O:");
      datos.examVisual2.cont.push($_HCI01.dato_4011["pio_ocu_esq_w"]);
    }

    // movilidad ocular
    if ($_HCI01.dato_4011["motili_esq_w"][0].motil1_ocu_esq_w.trim() != "") {
      datos.examVisual2.tit.push("MOVILIDAD OCULAR:");
      datos.examVisual2.cont.push(
        $_HCI01.dato_4011["motili_esq_w"][0].motil1_ocu_esq_w + $_HCI01.dato_4011["motili_esq_w"][0].motil2_ocu_esq_w
      );
    }
    if ($_HCI01.dato_4011["motili_esq_w"][1].motil1_ocu_esq_w.trim() != "") {
      datos.examVisual2.tit.push("");
      datos.examVisual2.cont.push(
        $_HCI01.dato_4011["motili_esq_w"][1].motil1_ocu_esq_w + $_HCI01.dato_4011["motili_esq_w"][1].motil2_ocu_esq_w
      );
    }
    if ($_HCI01.dato_4011["motili_esq_w"][2].motil1_ocu_esq_w.trim() != "") {
      datos.examVisual2.tit.push("");
      datos.examVisual2.cont.push(
        $_HCI01.dato_4011["motili_esq_w"][2].motil1_ocu_esq_w + $_HCI01.dato_4011["motili_esq_w"][2].motil2_ocu_esq_w
      );
    }

    // examen externos
    if ($_HCI01.dato_4011["exter_esq_w"][0].exter1_ocu_esq_w.trim() != "") {
      datos.examVisual2.tit.push("EXAMEN EXTERNOS:");
      datos.examVisual2.cont.push(
        $_HCI01.dato_4011["exter_esq_w"][0].exter1_ocu_esq_w + $_HCI01.dato_4011["exter_esq_w"][0].exter2_ocu_esq_w
      );
    }
    if ($_HCI01.dato_4011["exter_esq_w"][1].exter1_ocu_esq_w.trim() != "") {
      datos.examVisual2.tit.push("");
      datos.examVisual2.cont.push(
        $_HCI01.dato_4011["exter_esq_w"][1].exter1_ocu_esq_w + $_HCI01.dato_4011["exter_esq_w"][1].exter2_ocu_esq_w
      );
    }
    if ($_HCI01.dato_4011["exter_esq_w"][2].exter1_ocu_esq_w.trim() != "") {
      datos.examVisual2.tit.push("");
      datos.examVisual2.cont.push(
        $_HCI01.dato_4011["exter_esq_w"][2].exter1_ocu_esq_w + $_HCI01.dato_4011["exter_esq_w"][2].exter2_ocu_esq_w
      );
    }
    if ($_HCI01.dato_4011["exter_esq_w"][3].exter1_ocu_esq_w.trim() != "") {
      datos.examVisual2.tit.push("");
      datos.examVisual2.cont.push(
        $_HCI01.dato_4011["exter_esq_w"][3].exter1_ocu_esq_w + $_HCI01.dato_4011["exter_esq_w"][3].exter2_ocu_esq_w
      );
    }

    // biomicroscopio
    if ($_HCI01.dato_4011["biomic_esq_w"][0].biomic1_ocu_esq_w.trim() != "") {
      datos.examVisual2.tit.push("BIOMICROSCOPIO:");
      datos.examVisual2.cont.push(
        $_HCI01.dato_4011["biomic_esq_w"][0].biomic1_ocu_esq_w + $_HCI01.dato_4011["biomic_esq_w"][0].biomic2_ocu_esq_w
      );
    }
    if ($_HCI01.dato_4011["biomic_esq_w"][1].biomic1_ocu_esq_w.trim() != "") {
      datos.examVisual2.tit.push("");
      datos.examVisual2.cont.push(
        $_HCI01.dato_4011["biomic_esq_w"][1].biomic1_ocu_esq_w + $_HCI01.dato_4011["biomic_esq_w"][1].biomic2_ocu_esq_w
      );
    }
    if ($_HCI01.dato_4011["biomic_esq_w"][2].biomic1_ocu_esq_w.trim() != "") {
      datos.examVisual2.tit.push("");
      datos.examVisual2.cont.push(
        $_HCI01.dato_4011["biomic_esq_w"][2].biomic1_ocu_esq_w + $_HCI01.dato_4011["biomic_esq_w"][2].biomic2_ocu_esq_w
      );
    }
    if ($_HCI01.dato_4011["biomic_esq_w"][3].biomic1_ocu_esq_w.trim() != "") {
      datos.examVisual2.tit.push("");
      datos.examVisual2.cont.push(
        $_HCI01.dato_4011["biomic_esq_w"][3].biomic1_ocu_esq_w + $_HCI01.dato_4011["biomic_esq_w"][3].biomic2_ocu_esq_w
      );
    }
    if ($_HCI01.dato_4011["biomic_esq_w"][4].biomic1_ocu_esq_w.trim() != "") {
      datos.examVisual2.tit.push("");
      datos.examVisual2.cont.push(
        $_HCI01.dato_4011["biomic_esq_w"][4].biomic1_ocu_esq_w + $_HCI01.dato_4011["biomic_esq_w"][4].biomic2_ocu_esq_w
      );
    }

    // fondo de ojo
    if ($_HCI01.dato_4011["fondo_esq_w"][0].fondo1_ocu_esq_w.trim() != "") {
      datos.examVisual2.tit.push("FONDO DE OJO:");
      datos.examVisual2.cont.push(
        $_HCI01.dato_4011["fondo_esq_w"][0].fondo1_ocu_esq_w + $_HCI01.dato_4011["fondo_esq_w"][0].fondo2_ocu_esq_w
      );
    }
    if ($_HCI01.dato_4011["fondo_esq_w"][1].fondo1_ocu_esq_w.trim() != "") {
      datos.examVisual2.tit.push("");
      datos.examVisual2.cont.push(
        $_HCI01.dato_4011["fondo_esq_w"][1].fondo1_ocu_esq_w + $_HCI01.dato_4011["fondo_esq_w"][1].fondo2_ocu_esq_w
      );
    }
    if ($_HCI01.dato_4011["fondo_esq_w"][2].fondo1_ocu_esq_w.trim() != "") {
      datos.examVisual2.tit.push("");
      datos.examVisual2.cont.push(
        $_HCI01.dato_4011["fondo_esq_w"][2].fondo1_ocu_esq_w + $_HCI01.dato_4011["fondo_esq_w"][2].fondo2_ocu_esq_w
      );
    }
    if ($_HCI01.dato_4011["fondo_esq_w"][3].fondo1_ocu_esq_w.trim() != "") {
      datos.examVisual2.tit.push("");
      datos.examVisual2.cont.push(
        $_HCI01.dato_4011["fondo_esq_w"][3].fondo1_ocu_esq_w + $_HCI01.dato_4011["fondo_esq_w"][3].fondo2_ocu_esq_w
      );
    }
    if ($_HCI01.dato_4011["fondo_esq_w"][4].fondo1_ocu_esq_w.trim() != "") {
      datos.examVisual2.tit.push("");
      datos.examVisual2.cont.push(
        $_HCI01.dato_4011["fondo_esq_w"][4].fondo1_ocu_esq_w + $_HCI01.dato_4011["fondo_esq_w"][4].fondo2_ocu_esq_w
      );
    }
    if ($_HCI01.dato_4011["fondo_esq_w"][5].fondo1_ocu_esq_w.trim() != "") {
      datos.examVisual2.tit.push("");
      datos.examVisual2.cont.push(
        $_HCI01.dato_4011["fondo_esq_w"][5].fondo1_ocu_esq_w + $_HCI01.dato_4011["fondo_esq_w"][5].fondo2_ocu_esq_w
      );
    }
  } else {
    datos.examVisual2.bandera = false;
  }
}

// IMPRIME GENOGRAMA (ARBOL - ESQUEMA)
function imprimirGenograma_HCI01() {
  if ($_HCI01.dato_2080 != undefined) {
    datos.genograma.bandera = true;
    datos.genograma.pad = $_HCI01.dato_2080["edad1_pad_esq_w"] + $_HCI01.dato_2080["edad2_pad_esq_w"];
    datos.genograma.mad = $_HCI01.dato_2080["edad1_mad_esq_w"] + $_HCI01.dato_2080["edad2_mad_esq_w"];

    edad = "";
    switch ($_HCI01.dato_2080["edad1_her1_esq_w"]) {
      case "D":
        edad = "Dias";
        break;
      case "M":
        edad = "Meses";
        break;
      case "A":
        edad = "Años";
        break;
      default:
        edad = "    ";
        break;
    }
    datos.genograma.her.push(
      $_HCI01.dato_2080["sexo_her1_esq_w"] + "  " + $_HCI01.dato_2080["edad2_her1_esq_w"] + "  " + edad
    );

    edad = "";
    switch ($_HCI01.dato_2080["edad1_her2_esq_w"]) {
      case "D":
        edad = "Dias";
        break;
      case "M":
        edad = "Meses";
        break;
      case "A":
        edad = "Años";
        break;
      default:
        edad = "    ";
        break;
    }
    datos.genograma.her.push(
      $_HCI01.dato_2080["sexo_her2_esq_w"] + "  " + $_HCI01.dato_2080["edad2_her2_esq_w"] + "  " + edad
    );

    edad = "";
    switch ($_HCI01.dato_2080["edad1_her3_esq_w"]) {
      case "D":
        edad = "Dias";
        break;
      case "M":
        edad = "Meses";
        break;
      case "A":
        edad = "Años";
        break;
      default:
        edad = "    ";
        break;
    }
    datos.genograma.her.push(
      $_HCI01.dato_2080["sexo_her3_esq_w"] + "  " + $_HCI01.dato_2080["edad2_her3_esq_w"] + "  " + edad
    );

    edad = "";
    switch ($_HCI01.dato_2080["edad1_her4_esq_w"]) {
      case "D":
        edad = "Dias";
        break;
      case "M":
        edad = "Meses";
        break;
      case "A":
        edad = "Años";
        break;
      default:
        edad = "    ";
        break;
    }
    datos.genograma.her.push(
      $_HCI01.dato_2080["sexo_her4_esq_w"] + "  " + $_HCI01.dato_2080["edad2_her4_esq_w"] + "  " + edad
    );

    edad = "";
    switch ($_HCI01.dato_2080["edad1_her5_esq_w"]) {
      case "D":
        edad = "Dias";
        break;
      case "M":
        edad = "Meses";
        break;
      case "A":
        edad = "Años";
        break;
      default:
        edad = "    ";
        break;
    }
    datos.genograma.her.push(
      $_HCI01.dato_2080["sexo_her5_esq_w"] + "  " + $_HCI01.dato_2080["edad2_her5_esq_w"] + "  " + edad
    );

    edad = "";
    switch ($_HCI01.dato_2080["edad1_her6_esq_w"]) {
      case "D":
        edad = "Dias";
        break;
      case "M":
        edad = "Meses";
        break;
      case "A":
        edad = "Años";
        break;
      default:
        edad = "    ";
        break;
    }
    datos.genograma.her.push(
      $_HCI01.dato_2080["sexo_her6_esq_w"] + "  " + $_HCI01.dato_2080["edad2_her6_esq_w"] + "  " + edad
    );

    return true;
  } else {
    datos.genograma.bandera = false;
  }
}

// BUSCA GINECOLOGIA PARA IMPRESION
async function buscarGineco_HCI01() {
  if ($_HCI01.dato_4040 != undefined) {
    if (
      $_HCI01.dato_4040.gineco_esq_w["ciclos_esq_w"] == "1" ||
      $_HCI01.dato_4040.gineco_esq_w["ciclos_esq_w"] == "2" ||
      $_HCI01.dato_4040.gineco_esq_w["ciclos_esq_w"] == "3"
    ) {
      await imprimirGineco_HCI01();
    }

    if (
      parseFloat($_HCI01.dato_4040.obstetric_esq_w["edad_gest_regla_esq_w"]) > 0 ||
      parseFloat($_HCI01.dato_4040.obstetric_esq_w["edad_gest_ultra_esq_w"]) > 0
    ) {
      await imprimirObstetrico_HCI01();
    }
  } else {
    datos.gineco.bandera = false;
    datos.obst.bandera = false;
  }
}

// IMPRIME GINECOLOGIA
async function imprimirGineco_HCI01() {
  if ($_HCI01.dato_4040 != undefined) {
    datos.gineco.bandera = true;

    switch($_HCI01.dato_4040.gineco_esq_w["emb_alto_riesg_esq_w"]) {
      case "S": datos.gineco.emb_alto_riesg_esq_w = "SI"; break;
      case "N": datos.gineco.emb_alto_riesg_esq_w = "NO"; break;
      default: datos.gineco.emb_alto_riesg_esq_w = ""; break;
    }

    datos.gineco.g1.push($_HCI01.dato_4040.gineco_esq_w["menarquia_esq_w"]);

    aux = "";
    switch ($_HCI01.dato_4040.gineco_esq_w["ciclos_esq_w"]) {
      case "1":
        aux = "REGULARES";
        break;
      case "2":
        aux = $_HCI01.dato_4040.gineco_esq_w["ciclos_irreg_esq_w"];
        break;
      default:
        aux = " ";
        break;
    }
    datos.gineco.g1.push(aux);

    datos.gineco.g1.push($_HCI01.dato_4040.gineco_esq_w["gestaciones_esq_w"]);
    datos.gineco.g1.push($_HCI01.dato_4040.gineco_esq_w["partos_esq_w"]);
    datos.gineco.g1.push($_HCI01.dato_4040.gineco_esq_w["cesareas_esq_w"]);
    datos.gineco.g1.push($_HCI01.dato_4040.gineco_esq_w["abortos_esq_w"]);
    datos.gineco.g1.push($_HCI01.dato_4040.gineco_esq_w["ectopicos_esq_w"]);
    datos.gineco.g1.push($_HCI01.dato_4040.gineco_esq_w["gine_molas_esq_w"]);
    datos.gineco.g1.push($_HCI01.dato_4040.gineco_esq_w["gine_obito_esq_w"]);

    parseFloat($_HCI01.dato_4040.gineco_esq_w["fecha_regla_esq_w"]) > 0
      ? datos.gineco.g2.push(_editarFecha($_HCI01.dato_4040.gineco_esq_w["fecha_regla_esq_w"]))
      : datos.gineco.g2.push(" ");
    parseFloat($_HCI01.dato_4040.gineco_esq_w["ult_parto_esq_w"]) > 0
      ? datos.gineco.g2.push(_editarFecha($_HCI01.dato_4040.gineco_esq_w["ult_parto_esq_w"]))
      : datos.gineco.g2.push(" ");
    parseFloat($_HCI01.dato_4040.gineco_esq_w["fecha_citol_esq_w"]) > 0
      ? datos.gineco.g2.push(_editarFecha($_HCI01.dato_4040.gineco_esq_w["fecha_citol_esq_w"]))
      : datos.gineco.g2.push(" ");

    aux = "";
    switch ($_HCI01.dato_4040.gineco_esq_w["result_citol_esq_w"]) {
      case "1":
        aux = "NORMAL";
        break;
      case "2":
        aux = $_HCI01.dato_4040.gineco_esq_w["citol_anormal_esq_w"];
        break;
      default:
        aux = " ";
        break;
    }
    datos.gineco.g2.push(aux);

    if ($_HCI01.dato_4040.gineco_esq_w["citol_anormal_esq_w"].trim() != "") {
      datos.gineco.titLin.push("CITOLOGIA ANORMAL");
      datos.gineco.contLin.push($_HCI01.dato_4040.gineco_esq_w["citol_anormal_esq_w"]);
    }

    plan = "";
    if ($_HCI01._hcprc.planific != "0" && $_HCI01._hcprc.planific.trim() != "") {
      switch ($_HCI01._hcprc.planific) {
        case "1":
          plan = "DIU             ";
          break;
        case "2":
          plan = "AO              ";
          break;
        case "3":
          plan = "AP              ";
          break;
        case "4":
          plan = "OTRO            ";
          break;
        case "5":
          plan = "NINGUNO         ";
          break;
        case "6":
          plan = "DIU + BARRERA   ";
          break;
        case "7":
          plan = "IMPL. SUBDERMICO";
          break;
        case "8":
          plan = "I.SUBDERM+BARRER";
          break;
        case "9":
          plan = "ORAL + BARRERA  ";
          break;
        case "A":
          plan = "INYECTAB.MENSUAL";
          break;
        case "B":
          plan = "INYECTAB+BARRERA";
          break;
        case "C":
          plan = "INYECTAB.TRIMEST";
          break;
        case "D":
          plan = "TRIMEST+BARRERA ";
          break;
        case "E":
          plan = "EMERGENCIA      ";
          break;
        case "F":
          plan = "EMERGENC+BARRERA";
          break;
        case "G":
          plan = "ESTERILIZACION  ";
          break;
        case "H":
          plan = "ESTERILIZ+BARRER";
          break;
        case "I":
          plan = "NO USA X TRADIC.";
          break;
        case "J":
          plan = "NO USA X SALUD  ";
          break;
        case "K":
          plan = "NO USA X NEGACI.";
          break;
        default:
          plan = "       ";
          break;
      }
      datos.gineco.titLin.push("METODO DE PLANIFIC.:");
      datos.gineco.contLin.push(plan);
    }

    if ($_HCI01.dato_4040.gineco_esq_w["infec_pelvic_esq_w"].trim() != "") {
      datos.gineco.titLin.push("INFECCIÓN PELVICA");
      datos.gineco.contLin.push($_HCI01.dato_4040.gineco_esq_w["infec_pelvic_esq_w"]);
    }

    if ($_HCI01.dato_4040.gineco_esq_w["endometros_esq_w"].trim() != "") {
      datos.gineco.titLin.push("ENDOMETRIOSIS ?");
      datos.gineco.contLin.push($_HCI01.dato_4040.gineco_esq_w["endometros_esq_w"]);
    }

    if ($_HCI01.dato_4040.gineco_esq_w["especuloscop_esq_w"].trim() != "") {
      switch ($_HCI01.dato_4040.gineco_esq_w["especuloscop_esq_w"]) {
        case "1":
          aux = "NORMAL";
          break;
        case "2":
          aux = $_HCI01.dato_4040.gineco_esq_w["especul_anormal_esq_w"];
          break;
        case "3":
          aux = "     ";
          break;
      }
      datos.gineco.titLin.push("ESPECULOSCOPIA ?");
      datos.gineco.contLin.push($_HCI01.dato_4040.gineco_esq_w["especuloscop_esq_w"]);
    }

    if ($_HCI01.dato_4040.gineco_esq_w["ultrason_utero_esq_w"].trim() != "") {
      datos.gineco.titLin.push("ULTRASONOGRAF UTERO:");
      datos.gineco.contLin.push($_HCI01.dato_4040.gineco_esq_w["ultrason_utero_esq_w"]);
    }

    if ($_HCI01.dato_4040.gineco_esq_w["ultrason_ovario_esq_w"].trim() != "") {
      datos.gineco.titLin.push("ULTRASONOGRAF OVARIOS:");
      datos.gineco.contLin.push($_HCI01.dato_4040.gineco_esq_w["ultrason_ovario_esq_w"]);
    }

    if ($_HCI01.dato_4040.gineco_esq_w["ultrason_trompa_esq_w"].trim() != "") {
      datos.gineco.titLin.push("ULTRASONOGRAF TROMPAS:");
      datos.gineco.contLin.push($_HCI01.dato_4040.gineco_esq_w["ultrason_trompa_esq_w"]);
    }

    if ($_HCI01.dato_4040.gineco_esq_w["ultrason_otros_esq_w"].trim() != "") {
      datos.gineco.titLin.push("ULTRASONOGRAF OTROS:");
      datos.gineco.contLin.push($_HCI01.dato_4040.gineco_esq_w["ultrason_otros_esq_w"]);
    }

    if (parseFloat($_HCI01.dato_4040.gineco_esq_w["hemoglob_esq_w"]) > 0) {
      datos.gineco.titLin.push("VLR HEMOGLOBINA:");
      datos.gineco.contLin.push($_HCI01.dato_4040.gineco_esq_w["hemoglob_esq_w"]);
    }

    emb = "";
    if (parseFloat($_HCI01._hcprc.rips.embarazo) > 0 && parseFloat($_HCI01._hcprc.rips.embarazo) < 8) {
      switch ($_HCI01._hcprc.rips.embarazo) {
        case "1":
          emb = "EMBARAZO 1ER TRIMESTRE";
          break;
        case "2":
          emb = "EMBARAZO 2DO TRIMESTRE";
          break;
        case "3":
          emb = "EMBARAZO 3ER TRIMESTRE";
          break;
        case "4":
          emb = "NO ESTA EMBARAZADA    ";
          break;
        default:
          emb = "NO APLICA";
          break;
      }
      datos.gineco.titLin.push("EMBARAZO:");
      datos.gineco.contLin.push(emb);
    }

    // ---------- IMPRIME TELESALUD --------
    datos.telesalud.fechaAsePre = $_HCI01.dato_4040.prenatal_esq_w["fecha_aseso_pre_esq_w"];
    datos.telesalud.fechaVacInfl = $_HCI01.dato_4040.prenatal_esq_w["fecha_vac_influ_esq_w"];
    datos.telesalud.fechaAsePos = $_HCI01.dato_4040.prenatal_esq_w["fecha_aseso_pos_esq_w"];
    datos.telesalud.fechaVacTDAP = $_HCI01.dato_4040.prenatal_esq_w["fecha_vac_tdap_esq_w"];
    datos.telesalud.fechaEcoObs = $_HCI01.dato_4040.prenatal_esq_w["fecha_eco_obst_esq_w"];
    datos.telesalud.fechaVacTT = $_HCI01.dato_4040.prenatal_esq_w["fecha_vac_tt_esq_w"];

    // TELESALUD VIH

    if ($_HCI01.dato_4040.tabla_vih_esq_w[0]["fecha_vih_esq_w"].trim() != "") {
      datos.telesalud.vih.push($_HCI01.dato_4040.tabla_vih_esq_w[0]["fecha_vih_esq_w"].substring(0, 4));
      datos.telesalud.vih.push($_HCI01.dato_4040.tabla_vih_esq_w[0]["fecha_vih_esq_w"].substring(4, 6));
      datos.telesalud.vih.push($_HCI01.dato_4040.tabla_vih_esq_w[0]["fecha_vih_esq_w"].substring(6, 8));
    } else {
      datos.telesalud.vih.push("    ");
      datos.telesalud.vih.push("  ");
      datos.telesalud.vih.push("  ");
    }

    aux = "";
    switch ($_HCI01.dato_4040.tabla_vih_esq_w[0]["resultado_vih_esq_w"]) {
      case "1":
        aux = "POSITIVO";
        break;
      case "2":
        aux = "NEGATIVO";
        break;
      case "3":
        aux = "PENDIENTE";
        break;
      default:
        aux = "       ";
        break;
    }
    datos.telesalud.vih.push(aux);

    if ($_HCI01.dato_4040.tabla_vih_esq_w[1]["fecha_vih_esq_w"].trim() != "") {
      datos.telesalud.vih.push($_HCI01.dato_4040.tabla_vih_esq_w[1]["fecha_vih_esq_w"].substring(0, 4));
      datos.telesalud.vih.push($_HCI01.dato_4040.tabla_vih_esq_w[1]["fecha_vih_esq_w"].substring(4, 6));
      datos.telesalud.vih.push($_HCI01.dato_4040.tabla_vih_esq_w[1]["fecha_vih_esq_w"].substring(6, 8));
    } else {
      datos.telesalud.vih.push("    ");
      datos.telesalud.vih.push("  ");
      datos.telesalud.vih.push("  ");
    }

    aux = "";
    switch ($_HCI01.dato_4040.tabla_vih_esq_w[1]["resultado_vih_esq_w"]) {
      case "1":
        aux = "POSITIVO";
        break;
      case "2":
        aux = "NEGATIVO";
        break;
      case "3":
        aux = "PENDIENTE";
        break;
      default:
        aux = "       ";
        break;
    }
    datos.telesalud.vih.push(aux);

    if ($_HCI01.dato_4040.tabla_vih_esq_w[2]["fecha_vih_esq_w"].trim() != "") {
      datos.telesalud.vih.push($_HCI01.dato_4040.tabla_vih_esq_w[2]["fecha_vih_esq_w"].substring(0, 4));
      datos.telesalud.vih.push($_HCI01.dato_4040.tabla_vih_esq_w[2]["fecha_vih_esq_w"].substring(4, 6));
      datos.telesalud.vih.push($_HCI01.dato_4040.tabla_vih_esq_w[2]["fecha_vih_esq_w"].substring(6, 8));
    } else {
      datos.telesalud.vih.push("    ");
      datos.telesalud.vih.push("  ");
      datos.telesalud.vih.push("  ");
    }

    aux = "";
    switch ($_HCI01.dato_4040.tabla_vih_esq_w[2]["resultado_vih_esq_w"]) {
      case "1":
        aux = "POSITIVO";
        break;
      case "2":
        aux = "NEGATIVO";
        break;
      case "3":
        aux = "PENDIENTE";
        break;
      default:
        aux = "       ";
        break;
    }
    datos.telesalud.vih.push(aux);

    // TELESALUD SEROLOGIA

    if ($_HCI01.dato_4040.tabla_serolo_esq_w[0]["fecha_serolo_esq_w"].trim() != "") {
      datos.telesalud.serologia.push($_HCI01.dato_4040.tabla_serolo_esq_w[0]["fecha_serolo_esq_w"].substring(0, 4));
      datos.telesalud.serologia.push($_HCI01.dato_4040.tabla_serolo_esq_w[0]["fecha_serolo_esq_w"].substring(4, 6));
      datos.telesalud.serologia.push($_HCI01.dato_4040.tabla_serolo_esq_w[0]["fecha_serolo_esq_w"].substring(6, 8));
    } else {
      datos.telesalud.serologia.push("    ");
      datos.telesalud.serologia.push("  ");
      datos.telesalud.serologia.push("  ");
    }

    aux = "";
    switch ($_HCI01.dato_4040.tabla_serolo_esq_w[0]["resultado_serolo_esq_w"]) {
      case "1":
        aux = "REACTIVO";
        break;
      case "2":
        aux = "NO REACTIVO";
        break;
      case "3":
        aux = "PENDIENTE";
        break;
      default:
        aux = "       ";
        break;
    }
    datos.telesalud.serologia.push(aux);

    if ($_HCI01.dato_4040.tabla_serolo_esq_w[1]["fecha_serolo_esq_w"].trim() != "") {
      datos.telesalud.serologia.push($_HCI01.dato_4040.tabla_serolo_esq_w[1]["fecha_serolo_esq_w"].substring(0, 4));
      datos.telesalud.serologia.push($_HCI01.dato_4040.tabla_serolo_esq_w[1]["fecha_serolo_esq_w"].substring(4, 6));
      datos.telesalud.serologia.push($_HCI01.dato_4040.tabla_serolo_esq_w[1]["fecha_serolo_esq_w"].substring(6, 8));
    } else {
      datos.telesalud.serologia.push("    ");
      datos.telesalud.serologia.push("  ");
      datos.telesalud.serologia.push("  ");
    }

    aux = "";
    switch ($_HCI01.dato_4040.tabla_serolo_esq_w[1]["resultado_serolo_esq_w"]) {
      case "1":
        aux = "REACTIVO";
        break;
      case "2":
        aux = "NO REACTIVO";
        break;
      case "3":
        aux = "PENDIENTE";
        break;
      default:
        aux = "       ";
        break;
    }
    datos.telesalud.serologia.push(aux);

    if ($_HCI01.dato_4040.tabla_serolo_esq_w[2]["fecha_serolo_esq_w"].trim() != "") {
      datos.telesalud.serologia.push($_HCI01.dato_4040.tabla_serolo_esq_w[2]["fecha_serolo_esq_w"].substring(0, 4));
      datos.telesalud.serologia.push($_HCI01.dato_4040.tabla_serolo_esq_w[2]["fecha_serolo_esq_w"].substring(4, 6));
      datos.telesalud.serologia.push($_HCI01.dato_4040.tabla_serolo_esq_w[2]["fecha_serolo_esq_w"].substring(6, 8));
    } else {
      datos.telesalud.serologia.push("    ");
      datos.telesalud.serologia.push("  ");
      datos.telesalud.serologia.push("  ");
    }

    aux = "";
    switch ($_HCI01.dato_4040.tabla_serolo_esq_w[2]["resultado_serolo_esq_w"]) {
      case "1":
        aux = "REACTIVO";
        break;
      case "2":
        aux = "NO REACTIVO";
        break;
      case "3":
        aux = "PENDIENTE";
        break;
      default:
        aux = "       ";
        break;
    }
    datos.telesalud.serologia.push(aux);

    // TELESALUD HEMOGLOBINA

    if ($_HCI01.dato_4040.tabla_hemogl_esq_w[0]["fecha_hemogl_esq_w"].trim() != "") {
      datos.telesalud.hemoglobina.push($_HCI01.dato_4040.tabla_hemogl_esq_w[0]["fecha_hemogl_esq_w"].substring(0, 4));
      datos.telesalud.hemoglobina.push($_HCI01.dato_4040.tabla_hemogl_esq_w[0]["fecha_hemogl_esq_w"].substring(4, 6));
      datos.telesalud.hemoglobina.push($_HCI01.dato_4040.tabla_hemogl_esq_w[0]["fecha_hemogl_esq_w"].substring(6, 8));
    } else {
      datos.telesalud.hemoglobina.push("    ");
      datos.telesalud.hemoglobina.push("  ");
      datos.telesalud.hemoglobina.push("  ");
    }

    datos.telesalud.hemoglobina.push($_HCI01.dato_4040.tabla_hemogl_esq_w[0]["resultado_hemogl_esq_w"]);

    if ($_HCI01.dato_4040.tabla_hemogl_esq_w[1]["fecha_hemogl_esq_w"].trim() != "") {
      datos.telesalud.hemoglobina.push($_HCI01.dato_4040.tabla_hemogl_esq_w[1]["fecha_hemogl_esq_w"].substring(0, 4));
      datos.telesalud.hemoglobina.push($_HCI01.dato_4040.tabla_hemogl_esq_w[1]["fecha_hemogl_esq_w"].substring(4, 6));
      datos.telesalud.hemoglobina.push($_HCI01.dato_4040.tabla_hemogl_esq_w[1]["fecha_hemogl_esq_w"].substring(6, 8));
    } else {
      datos.telesalud.hemoglobina.push("    ");
      datos.telesalud.hemoglobina.push("  ");
      datos.telesalud.hemoglobina.push("  ");
    }

    datos.telesalud.hemoglobina.push($_HCI01.dato_4040.tabla_hemogl_esq_w[1]["resultado_hemogl_esq_w"]);

    if ($_HCI01.dato_4040.tabla_hemogl_esq_w[2]["fecha_hemogl_esq_w"].trim() != "") {
      datos.telesalud.hemoglobina.push($_HCI01.dato_4040.tabla_hemogl_esq_w[2]["fecha_hemogl_esq_w"].substring(0, 4));
      datos.telesalud.hemoglobina.push($_HCI01.dato_4040.tabla_hemogl_esq_w[2]["fecha_hemogl_esq_w"].substring(4, 6));
      datos.telesalud.hemoglobina.push($_HCI01.dato_4040.tabla_hemogl_esq_w[2]["fecha_hemogl_esq_w"].substring(6, 8));
    } else {
      datos.telesalud.hemoglobina.push("    ");
      datos.telesalud.hemoglobina.push("  ");
      datos.telesalud.hemoglobina.push("  ");
    }

    datos.telesalud.hemoglobina.push($_HCI01.dato_4040.tabla_hemogl_esq_w[2]["resultado_hemogl_esq_w"]);

    // TELESALUD IGG

    if ($_HCI01.dato_4040.tabla_igg_esq_w[0]["fecha_igg_esq_w"].trim() != "") {
      datos.telesalud.igg.push($_HCI01.dato_4040.tabla_igg_esq_w[0]["fecha_igg_esq_w"].substring(0, 4));
      datos.telesalud.igg.push($_HCI01.dato_4040.tabla_igg_esq_w[0]["fecha_igg_esq_w"].substring(4, 6));
      datos.telesalud.igg.push($_HCI01.dato_4040.tabla_igg_esq_w[0]["fecha_igg_esq_w"].substring(6, 8));
    } else {
      datos.telesalud.igg.push("    ");
      datos.telesalud.igg.push("  ");
      datos.telesalud.igg.push("  ");
    }

    aux = "";
    switch ($_HCI01.dato_4040.tabla_igg_esq_w[0]["resultado_igg_esq_w"]) {
      case "1":
        aux = "POSITIVO";
        break;
      case "2":
        aux = "NEGATIVO";
        break;
      case "3":
        aux = "PENDIENTE";
        break;
      default:
        aux = "       ";
        break;
    }
    datos.telesalud.igg.push(aux);

    if ($_HCI01.dato_4040.tabla_igg_esq_w[1]["fecha_igg_esq_w"].trim() != "") {
      datos.telesalud.igg.push($_HCI01.dato_4040.tabla_igg_esq_w[1]["fecha_igg_esq_w"].substring(0, 4));
      datos.telesalud.igg.push($_HCI01.dato_4040.tabla_igg_esq_w[1]["fecha_igg_esq_w"].substring(4, 6));
      datos.telesalud.igg.push($_HCI01.dato_4040.tabla_igg_esq_w[1]["fecha_igg_esq_w"].substring(6, 8));
    } else {
      datos.telesalud.igg.push("    ");
      datos.telesalud.igg.push("  ");
      datos.telesalud.igg.push("  ");
    }

    aux = "";
    switch ($_HCI01.dato_4040.tabla_igg_esq_w[1]["resultado_igg_esq_w"]) {
      case "1":
        aux = "POSITIVO";
        break;
      case "2":
        aux = "NEGATIVO";
        break;
      case "3":
        aux = "PENDIENTE";
        break;
      default:
        aux = "       ";
        break;
    }
    datos.telesalud.igg.push(aux);

    if ($_HCI01.dato_4040.tabla_igg_esq_w[2]["fecha_igg_esq_w"].trim() != "") {
      datos.telesalud.igg.push($_HCI01.dato_4040.tabla_igg_esq_w[2]["fecha_igg_esq_w"].substring(0, 4));
      datos.telesalud.igg.push($_HCI01.dato_4040.tabla_igg_esq_w[2]["fecha_igg_esq_w"].substring(4, 6));
      datos.telesalud.igg.push($_HCI01.dato_4040.tabla_igg_esq_w[2]["fecha_igg_esq_w"].substring(6, 8));
    } else {
      datos.telesalud.igg.push("    ");
      datos.telesalud.igg.push("  ");
      datos.telesalud.igg.push("  ");
    }

    aux = "";
    switch ($_HCI01.dato_4040.tabla_igg_esq_w[2]["resultado_igg_esq_w"]) {
      case "1":
        aux = "POSITIVO";
        break;
      case "2":
        aux = "NEGATIVO";
        break;
      case "3":
        aux = "PENDIENTE";
        break;
      default:
        aux = "       ";
        break;
    }
    datos.telesalud.igg.push(aux);

    // TELESALUD CURVA DE GLICEMIA

    if ($_HCI01.dato_4040.tabla_glicem_esq_w[0]["fecha_glicem_esq_w"].trim() != "") {
      datos.telesalud.curva.push($_HCI01.dato_4040.tabla_glicem_esq_w[0]["fecha_glicem_esq_w"].substring(0, 4));
      datos.telesalud.curva.push($_HCI01.dato_4040.tabla_glicem_esq_w[0]["fecha_glicem_esq_w"].substring(4, 6));
      datos.telesalud.curva.push($_HCI01.dato_4040.tabla_glicem_esq_w[0]["fecha_glicem_esq_w"].substring(6, 8));
    } else {
      datos.telesalud.curva.push("    ");
      datos.telesalud.curva.push("  ");
      datos.telesalud.curva.push("  ");
    }

    if ($_HCI01.dato_4040.tabla_glicem_esq_w[0]["resultado_glicem_esq_w"].trim() != "") {
      datos.telesalud.curva.push(
        $_HCI01.dato_4040.tabla_glicem_esq_w[0]["resultado_glicem_esq_w"].substring(0, 3) +
          " " +
          $_HCI01.dato_4040.tabla_glicem_esq_w[0]["resultado_glicem_esq_w"].substring(3, 6)
      );
    } else {
      datos.telesalud.curva.push("       ");
    }

    if ($_HCI01.dato_4040.tabla_glicem_esq_w[1]["fecha_glicem_esq_w"].trim() != "") {
      datos.telesalud.curva.push($_HCI01.dato_4040.tabla_glicem_esq_w[1]["fecha_glicem_esq_w"].substring(0, 4));
      datos.telesalud.curva.push($_HCI01.dato_4040.tabla_glicem_esq_w[1]["fecha_glicem_esq_w"].substring(4, 6));
      datos.telesalud.curva.push($_HCI01.dato_4040.tabla_glicem_esq_w[1]["fecha_glicem_esq_w"].substring(6, 8));
    } else {
      datos.telesalud.curva.push("    ");
      datos.telesalud.curva.push("  ");
      datos.telesalud.curva.push("  ");
    }

    if ($_HCI01.dato_4040.tabla_glicem_esq_w[1]["resultado_glicem_esq_w"].trim() != "") {
      datos.telesalud.curva.push(
        $_HCI01.dato_4040.tabla_glicem_esq_w[1]["resultado_glicem_esq_w"].substring(0, 3) +
          " " +
          $_HCI01.dato_4040.tabla_glicem_esq_w[1]["resultado_glicem_esq_w"].substring(3, 6)
      );
    } else {
      datos.telesalud.curva.push("       ");
    }

    if ($_HCI01.dato_4040.tabla_glicem_esq_w[2]["fecha_glicem_esq_w"].trim() != "") {
      datos.telesalud.curva.push($_HCI01.dato_4040.tabla_glicem_esq_w[2]["fecha_glicem_esq_w"].substring(0, 4));
      datos.telesalud.curva.push($_HCI01.dato_4040.tabla_glicem_esq_w[2]["fecha_glicem_esq_w"].substring(4, 6));
      datos.telesalud.curva.push($_HCI01.dato_4040.tabla_glicem_esq_w[2]["fecha_glicem_esq_w"].substring(6, 8));
    } else {
      datos.telesalud.curva.push("    ");
      datos.telesalud.curva.push("  ");
      datos.telesalud.curva.push("  ");
    }

    if ($_HCI01.dato_4040.tabla_glicem_esq_w[2]["resultado_glicem_esq_w"].trim() != "") {
      datos.telesalud.curva.push(
        $_HCI01.dato_4040.tabla_glicem_esq_w[2]["resultado_glicem_esq_w"].substring(0, 3) +
          " " +
          $_HCI01.dato_4040.tabla_glicem_esq_w[2]["resultado_glicem_esq_w"].substring(3, 6)
      );
    } else {
      datos.telesalud.curva.push("       ");
    }

    // TELESALUD HEMOGRAMA

    if ($_HCI01.dato_4040.tabla_hemogra_esq_w[0]["fecha_hemogra_esq_w"].trim() != "") {
      datos.telesalud.hemograma.push($_HCI01.dato_4040.tabla_hemogra_esq_w[0]["fecha_hemogra_esq_w"].substring(0, 4));
      datos.telesalud.hemograma.push($_HCI01.dato_4040.tabla_hemogra_esq_w[0]["fecha_hemogra_esq_w"].substring(4, 6));
      datos.telesalud.hemograma.push($_HCI01.dato_4040.tabla_hemogra_esq_w[0]["fecha_hemogra_esq_w"].substring(6, 8));
    } else {
      datos.telesalud.hemograma.push("    ");
      datos.telesalud.hemograma.push("  ");
      datos.telesalud.hemograma.push("  ");
    }

    aux = "";
    switch ($_HCI01.dato_4040.tabla_hemogra_esq_w[0]["resultado_hemogra_esq_w"]) {
      case "1":
        aux = "POSITIVO";
        break;
      case "2":
        aux = "NEGATIVO";
        break;
      case "3":
        aux = "PENDIENTE";
        break;
      default:
        aux = "       ";
        break;
    }
    datos.telesalud.hemograma.push(aux);

    if ($_HCI01.dato_4040.tabla_hemogra_esq_w[1]["fecha_hemogra_esq_w"].trim() != "") {
      datos.telesalud.hemograma.push($_HCI01.dato_4040.tabla_hemogra_esq_w[1]["fecha_hemogra_esq_w"].substring(0, 4));
      datos.telesalud.hemograma.push($_HCI01.dato_4040.tabla_hemogra_esq_w[1]["fecha_hemogra_esq_w"].substring(4, 6));
      datos.telesalud.hemograma.push($_HCI01.dato_4040.tabla_hemogra_esq_w[1]["fecha_hemogra_esq_w"].substring(6, 8));
    } else {
      datos.telesalud.hemograma.push("    ");
      datos.telesalud.hemograma.push("  ");
      datos.telesalud.hemograma.push("  ");
    }

    aux = "";
    switch ($_HCI01.dato_4040.tabla_hemogra_esq_w[1]["resultado_hemogra_esq_w"]) {
      case "1":
        aux = "POSITIVO";
        break;
      case "2":
        aux = "NEGATIVO";
        break;
      case "3":
        aux = "PENDIENTE";
        break;
      default:
        aux = "       ";
        break;
    }
    datos.telesalud.hemograma.push(aux);

    if ($_HCI01.dato_4040.tabla_hemogra_esq_w[2]["fecha_hemogra_esq_w"].trim() != "") {
      datos.telesalud.hemograma.push($_HCI01.dato_4040.tabla_hemogra_esq_w[2]["fecha_hemogra_esq_w"].substring(0, 4));
      datos.telesalud.hemograma.push($_HCI01.dato_4040.tabla_hemogra_esq_w[2]["fecha_hemogra_esq_w"].substring(4, 6));
      datos.telesalud.hemograma.push($_HCI01.dato_4040.tabla_hemogra_esq_w[2]["fecha_hemogra_esq_w"].substring(6, 8));
    } else {
      datos.telesalud.hemograma.push("    ");
      datos.telesalud.hemograma.push("  ");
      datos.telesalud.hemograma.push("  ");
    }

    aux = "";
    switch ($_HCI01.dato_4040.tabla_hemogra_esq_w[2]["resultado_hemogra_esq_w"]) {
      case "1":
        aux = "POSITIVO";
        break;
      case "2":
        aux = "NEGATIVO";
        break;
      case "3":
        aux = "PENDIENTE";
        break;
      default:
        aux = "       ";
        break;
    }
    datos.telesalud.hemograma.push(aux);

    // TELESALUD HEMOPARASITO

    if ($_HCI01.dato_4040.tabla_hemopara_esq_w[0]["fecha_hemopara_esq_w"].trim() != "") {
      datos.telesalud.hemoparasito.push(
        $_HCI01.dato_4040.tabla_hemopara_esq_w[0]["fecha_hemopara_esq_w"].substring(0, 4)
      );
      datos.telesalud.hemoparasito.push(
        $_HCI01.dato_4040.tabla_hemopara_esq_w[0]["fecha_hemopara_esq_w"].substring(4, 6)
      );
      datos.telesalud.hemoparasito.push(
        $_HCI01.dato_4040.tabla_hemopara_esq_w[0]["fecha_hemopara_esq_w"].substring(6, 8)
      );
    } else {
      datos.telesalud.hemoparasito.push("    ");
      datos.telesalud.hemoparasito.push("  ");
      datos.telesalud.hemoparasito.push("  ");
    }

    aux = "";
    switch ($_HCI01.dato_4040.tabla_hemopara_esq_w[0]["resultado_hemopara_esq_w"]) {
      case "1":
        aux = "POSITIVO";
        break;
      case "2":
        aux = "NEGATIVO";
        break;
      case "3":
        aux = "PENDIENTE";
        break;
      default:
        aux = "       ";
        break;
    }
    datos.telesalud.hemoparasito.push(aux);

    if ($_HCI01.dato_4040.tabla_hemopara_esq_w[1]["fecha_hemopara_esq_w"].trim() != "") {
      datos.telesalud.hemoparasito.push(
        $_HCI01.dato_4040.tabla_hemopara_esq_w[1]["fecha_hemopara_esq_w"].substring(0, 4)
      );
      datos.telesalud.hemoparasito.push(
        $_HCI01.dato_4040.tabla_hemopara_esq_w[1]["fecha_hemopara_esq_w"].substring(4, 6)
      );
      datos.telesalud.hemoparasito.push(
        $_HCI01.dato_4040.tabla_hemopara_esq_w[1]["fecha_hemopara_esq_w"].substring(6, 8)
      );
    } else {
      datos.telesalud.hemoparasito.push("    ");
      datos.telesalud.hemoparasito.push("  ");
      datos.telesalud.hemoparasito.push("  ");
    }

    aux = "";
    switch ($_HCI01.dato_4040.tabla_hemopara_esq_w[1]["resultado_hemopara_esq_w"]) {
      case "1":
        aux = "POSITIVO";
        break;
      case "2":
        aux = "NEGATIVO";
        break;
      case "3":
        aux = "PENDIENTE";
        break;
      default:
        aux = "       ";
        break;
    }
    datos.telesalud.hemoparasito.push(aux);

    if ($_HCI01.dato_4040.tabla_hemopara_esq_w[2]["fecha_hemopara_esq_w"].trim() != "") {
      datos.telesalud.hemoparasito.push(
        $_HCI01.dato_4040.tabla_hemopara_esq_w[2]["fecha_hemopara_esq_w"].substring(0, 4)
      );
      datos.telesalud.hemoparasito.push(
        $_HCI01.dato_4040.tabla_hemopara_esq_w[2]["fecha_hemopara_esq_w"].substring(4, 6)
      );
      datos.telesalud.hemoparasito.push(
        $_HCI01.dato_4040.tabla_hemopara_esq_w[2]["fecha_hemopara_esq_w"].substring(6, 8)
      );
    } else {
      datos.telesalud.hemoparasito.push("    ");
      datos.telesalud.hemoparasito.push("  ");
      datos.telesalud.hemoparasito.push("  ");
    }

    aux = "";
    switch ($_HCI01.dato_4040.tabla_hemopara_esq_w[2]["resultado_hemopara_esq_w"]) {
      case "1":
        aux = "POSITIVO";
        break;
      case "2":
        aux = "NEGATIVO";
        break;
      case "3":
        aux = "PENDIENTE";
        break;
      default:
        aux = "       ";
        break;
    }
    datos.telesalud.hemoparasito.push(aux);

    // TELESALUD FTA - ABS

    if ($_HCI01.dato_4040.tabla_fta_abs_esq_w[0]["fecha_fta_abs_esq_w"].trim() != "") {
      datos.telesalud.fta.push($_HCI01.dato_4040.tabla_fta_abs_esq_w[0]["fecha_fta_abs_esq_w"].substring(0, 4));
      datos.telesalud.fta.push($_HCI01.dato_4040.tabla_fta_abs_esq_w[0]["fecha_fta_abs_esq_w"].substring(4, 6));
      datos.telesalud.fta.push($_HCI01.dato_4040.tabla_fta_abs_esq_w[0]["fecha_fta_abs_esq_w"].substring(6, 8));
    } else {
      datos.telesalud.fta.push("    ");
      datos.telesalud.fta.push("  ");
      datos.telesalud.fta.push("  ");
    }

    aux = "";
    switch ($_HCI01.dato_4040.tabla_fta_abs_esq_w[0]["resultado_fta_abs_esq_w"]) {
      case "1":
        aux = "POSITIVO";
        break;
      case "2":
        aux = "NEGATIVO";
        break;
      case "3":
        aux = "PENDIENTE";
        break;
      default:
        aux = "       ";
        break;
    }
    datos.telesalud.fta.push(aux);

    if ($_HCI01.dato_4040.tabla_fta_abs_esq_w[1]["fecha_fta_abs_esq_w"].trim() != "") {
      datos.telesalud.fta.push($_HCI01.dato_4040.tabla_fta_abs_esq_w[1]["fecha_fta_abs_esq_w"].substring(0, 4));
      datos.telesalud.fta.push($_HCI01.dato_4040.tabla_fta_abs_esq_w[1]["fecha_fta_abs_esq_w"].substring(4, 6));
      datos.telesalud.fta.push($_HCI01.dato_4040.tabla_fta_abs_esq_w[1]["fecha_fta_abs_esq_w"].substring(6, 8));
    } else {
      datos.telesalud.fta.push("    ");
      datos.telesalud.fta.push("  ");
      datos.telesalud.fta.push("  ");
    }

    aux = "";
    switch ($_HCI01.dato_4040.tabla_fta_abs_esq_w[1]["resultado_fta_abs_esq_w"]) {
      case "1":
        aux = "POSITIVO";
        break;
      case "2":
        aux = "NEGATIVO";
        break;
      case "3":
        aux = "PENDIENTE";
        break;
      default:
        aux = "       ";
        break;
    }
    datos.telesalud.fta.push(aux);

    if ($_HCI01.dato_4040.tabla_fta_abs_esq_w[2]["fecha_fta_abs_esq_w"].trim() != "") {
      datos.telesalud.fta.push($_HCI01.dato_4040.tabla_fta_abs_esq_w[2]["fecha_fta_abs_esq_w"].substring(0, 4));
      datos.telesalud.fta.push($_HCI01.dato_4040.tabla_fta_abs_esq_w[2]["fecha_fta_abs_esq_w"].substring(4, 6));
      datos.telesalud.fta.push($_HCI01.dato_4040.tabla_fta_abs_esq_w[2]["fecha_fta_abs_esq_w"].substring(6, 8));
    } else {
      datos.telesalud.fta.push("    ");
      datos.telesalud.fta.push("  ");
      datos.telesalud.fta.push("  ");
    }

    aux = "";
    switch ($_HCI01.dato_4040.tabla_fta_abs_esq_w[2]["resultado_fta_abs_esq_w"]) {
      case "1":
        aux = "POSITIVO";
        break;
      case "2":
        aux = "NEGATIVO";
        break;
      case "3":
        aux = "PENDIENTE";
        break;
      default:
        aux = "       ";
        break;
    }
    datos.telesalud.fta.push(aux);

    // TELESALUD UROANALISIS

    if ($_HCI01.dato_4040.tabla_uroanali_esq_w[0]["fecha_uroanali_esq_w"].trim() != "") {
      datos.telesalud.uroanalisis.push(
        $_HCI01.dato_4040.tabla_uroanali_esq_w[0]["fecha_uroanali_esq_w"].substring(0, 4)
      );
      datos.telesalud.uroanalisis.push(
        $_HCI01.dato_4040.tabla_uroanali_esq_w[0]["fecha_uroanali_esq_w"].substring(4, 6)
      );
      datos.telesalud.uroanalisis.push(
        $_HCI01.dato_4040.tabla_uroanali_esq_w[0]["fecha_uroanali_esq_w"].substring(6, 8)
      );
    } else {
      datos.telesalud.uroanalisis.push("    ");
      datos.telesalud.uroanalisis.push("  ");
      datos.telesalud.uroanalisis.push("  ");
    }

    aux = "";
    switch ($_HCI01.dato_4040.tabla_uroanali_esq_w[0]["resultado_uroanali_esq_w"]) {
      case "1":
        aux = "NORMAL";
        break;
      case "2":
        aux = "ANORMAL";
        break;
      case "3":
        aux = "PENDIENTE";
        break;
      default:
        aux = "       ";
        break;
    }
    datos.telesalud.uroanalisis.push(aux);

    if ($_HCI01.dato_4040.tabla_uroanali_esq_w[1]["fecha_uroanali_esq_w"].trim() != "") {
      datos.telesalud.uroanalisis.push(
        $_HCI01.dato_4040.tabla_uroanali_esq_w[1]["fecha_uroanali_esq_w"].substring(0, 4)
      );
      datos.telesalud.uroanalisis.push(
        $_HCI01.dato_4040.tabla_uroanali_esq_w[1]["fecha_uroanali_esq_w"].substring(4, 6)
      );
      datos.telesalud.uroanalisis.push(
        $_HCI01.dato_4040.tabla_uroanali_esq_w[1]["fecha_uroanali_esq_w"].substring(6, 8)
      );
    } else {
      datos.telesalud.uroanalisis.push("    ");
      datos.telesalud.uroanalisis.push("  ");
      datos.telesalud.uroanalisis.push("  ");
    }

    aux = "";
    switch ($_HCI01.dato_4040.tabla_uroanali_esq_w[1]["resultado_uroanali_esq_w"]) {
      case "1":
        aux = "NORMAL";
        break;
      case "2":
        aux = "ANORMAL";
        break;
      case "3":
        aux = "PENDIENTE";
        break;
      default:
        aux = "       ";
        break;
    }
    datos.telesalud.uroanalisis.push(aux);

    if ($_HCI01.dato_4040.tabla_uroanali_esq_w[2]["fecha_uroanali_esq_w"].trim() != "") {
      datos.telesalud.uroanalisis.push(
        $_HCI01.dato_4040.tabla_uroanali_esq_w[2]["fecha_uroanali_esq_w"].substring(0, 4)
      );
      datos.telesalud.uroanalisis.push(
        $_HCI01.dato_4040.tabla_uroanali_esq_w[2]["fecha_uroanali_esq_w"].substring(4, 6)
      );
      datos.telesalud.uroanalisis.push(
        $_HCI01.dato_4040.tabla_uroanali_esq_w[2]["fecha_uroanali_esq_w"].substring(6, 8)
      );
    } else {
      datos.telesalud.uroanalisis.push("    ");
      datos.telesalud.uroanalisis.push("  ");
      datos.telesalud.uroanalisis.push("  ");
    }

    aux = "";
    switch ($_HCI01.dato_4040.tabla_uroanali_esq_w[2]["resultado_uroanali_esq_w"]) {
      case "1":
        aux = "NORMAL";
        break;
      case "2":
        aux = "ANORMAL";
        break;
      case "3":
        aux = "PENDIENTE";
        break;
      default:
        aux = "       ";
        break;
    }
    datos.telesalud.uroanalisis.push(aux);

    // TELESALUD UROCULTIVO

    if ($_HCI01.dato_4040.tabla_uroculti_esq_w[0]["fecha_uroculti_esq_w"].trim() != "") {
      datos.telesalud.urocultivo.push(
        $_HCI01.dato_4040.tabla_uroculti_esq_w[0]["fecha_uroculti_esq_w"].substring(0, 4)
      );
      datos.telesalud.urocultivo.push(
        $_HCI01.dato_4040.tabla_uroculti_esq_w[0]["fecha_uroculti_esq_w"].substring(4, 6)
      );
      datos.telesalud.urocultivo.push(
        $_HCI01.dato_4040.tabla_uroculti_esq_w[0]["fecha_uroculti_esq_w"].substring(6, 8)
      );
    } else {
      datos.telesalud.urocultivo.push("    ");
      datos.telesalud.urocultivo.push("  ");
      datos.telesalud.urocultivo.push("  ");
    }

    aux = "";
    switch ($_HCI01.dato_4040.tabla_uroculti_esq_w[0]["resultado_uroculti_esq_w"]) {
      case "1":
        aux = "NORMAL";
        break;
      case "2":
        aux = "ANORMAL";
        break;
      case "3":
        aux = "PENDIENTE";
        break;
      default:
        aux = "       ";
        break;
    }
    datos.telesalud.urocultivo.push(aux);

    if ($_HCI01.dato_4040.tabla_uroculti_esq_w[1]["fecha_uroculti_esq_w"].trim() != "") {
      datos.telesalud.urocultivo.push(
        $_HCI01.dato_4040.tabla_uroculti_esq_w[1]["fecha_uroculti_esq_w"].substring(0, 4)
      );
      datos.telesalud.urocultivo.push(
        $_HCI01.dato_4040.tabla_uroculti_esq_w[1]["fecha_uroculti_esq_w"].substring(4, 6)
      );
      datos.telesalud.urocultivo.push(
        $_HCI01.dato_4040.tabla_uroculti_esq_w[1]["fecha_uroculti_esq_w"].substring(6, 8)
      );
    } else {
      datos.telesalud.urocultivo.push("    ");
      datos.telesalud.urocultivo.push("  ");
      datos.telesalud.urocultivo.push("  ");
    }

    aux = "";
    switch ($_HCI01.dato_4040.tabla_uroculti_esq_w[1]["resultado_uroculti_esq_w"]) {
      case "1":
        aux = "NORMAL";
        break;
      case "2":
        aux = "ANORMAL";
        break;
      case "3":
        aux = "PENDIENTE";
        break;
      default:
        aux = "       ";
        break;
    }
    datos.telesalud.urocultivo.push(aux);

    if ($_HCI01.dato_4040.tabla_uroculti_esq_w[2]["fecha_uroculti_esq_w"].trim() != "") {
      datos.telesalud.urocultivo.push(
        $_HCI01.dato_4040.tabla_uroculti_esq_w[2]["fecha_uroculti_esq_w"].substring(0, 4)
      );
      datos.telesalud.urocultivo.push(
        $_HCI01.dato_4040.tabla_uroculti_esq_w[2]["fecha_uroculti_esq_w"].substring(4, 6)
      );
      datos.telesalud.urocultivo.push(
        $_HCI01.dato_4040.tabla_uroculti_esq_w[2]["fecha_uroculti_esq_w"].substring(6, 8)
      );
    } else {
      datos.telesalud.urocultivo.push("    ");
      datos.telesalud.urocultivo.push("  ");
      datos.telesalud.urocultivo.push("  ");
    }

    aux = "";
    switch ($_HCI01.dato_4040.tabla_uroculti_esq_w[2]["resultado_uroculti_esq_w"]) {
      case "1":
        aux = "NORMAL";
        break;
      case "2":
        aux = "ANORMAL";
        break;
      case "3":
        aux = "PENDIENTE";
        break;
      default:
        aux = "       ";
        break;
    }
    datos.telesalud.urocultivo.push(aux);

    // TELESALUD FROTIS VAG

    if ($_HCI01.dato_4040.tabla_frotisv_esq_w[0]["fecha_frotisv_esq_w"].trim() != "") {
      datos.telesalud.frotis.push($_HCI01.dato_4040.tabla_frotisv_esq_w[0]["fecha_frotisv_esq_w"].substring(0, 4));
      datos.telesalud.frotis.push($_HCI01.dato_4040.tabla_frotisv_esq_w[0]["fecha_frotisv_esq_w"].substring(4, 6));
      datos.telesalud.frotis.push($_HCI01.dato_4040.tabla_frotisv_esq_w[0]["fecha_frotisv_esq_w"].substring(6, 8));
    } else {
      datos.telesalud.frotis.push("    ");
      datos.telesalud.frotis.push("  ");
      datos.telesalud.frotis.push("  ");
    }

    aux = "";
    switch ($_HCI01.dato_4040.tabla_frotisv_esq_w[0]["resultado_frotisv_esq_w"]) {
      case "1":
        aux = "NORMAL";
        break;
      case "2":
        aux = "ANORMAL";
        break;
      case "3":
        aux = "PENDIENTE";
        break;
      default:
        aux = "       ";
        break;
    }
    datos.telesalud.frotis.push(aux);

    if ($_HCI01.dato_4040.tabla_frotisv_esq_w[1]["fecha_frotisv_esq_w"].trim() != "") {
      datos.telesalud.frotis.push($_HCI01.dato_4040.tabla_frotisv_esq_w[1]["fecha_frotisv_esq_w"].substring(0, 4));
      datos.telesalud.frotis.push($_HCI01.dato_4040.tabla_frotisv_esq_w[1]["fecha_frotisv_esq_w"].substring(4, 6));
      datos.telesalud.frotis.push($_HCI01.dato_4040.tabla_frotisv_esq_w[1]["fecha_frotisv_esq_w"].substring(6, 8));
    } else {
      datos.telesalud.frotis.push("    ");
      datos.telesalud.frotis.push("  ");
      datos.telesalud.frotis.push("  ");
    }

    aux = "";
    switch ($_HCI01.dato_4040.tabla_frotisv_esq_w[1]["resultado_frotisv_esq_w"]) {
      case "1":
        aux = "NORMAL";
        break;
      case "2":
        aux = "ANORMAL";
        break;
      case "3":
        aux = "PENDIENTE";
        break;
      default:
        aux = "       ";
        break;
    }
    datos.telesalud.frotis.push(aux);

    if ($_HCI01.dato_4040.tabla_frotisv_esq_w[2]["fecha_frotisv_esq_w"].trim() != "") {
      datos.telesalud.frotis.push($_HCI01.dato_4040.tabla_frotisv_esq_w[2]["fecha_frotisv_esq_w"].substring(0, 4));
      datos.telesalud.frotis.push($_HCI01.dato_4040.tabla_frotisv_esq_w[2]["fecha_frotisv_esq_w"].substring(4, 6));
      datos.telesalud.frotis.push($_HCI01.dato_4040.tabla_frotisv_esq_w[2]["fecha_frotisv_esq_w"].substring(6, 8));
    } else {
      datos.telesalud.frotis.push("    ");
      datos.telesalud.frotis.push("  ");
      datos.telesalud.frotis.push("  ");
    }

    aux = "";
    switch ($_HCI01.dato_4040.tabla_frotisv_esq_w[2]["resultado_frotisv_esq_w"]) {
      case "1":
        aux = "NORMAL";
        break;
      case "2":
        aux = "ANORMAL";
        break;
      case "3":
        aux = "PENDIENTE";
        break;
      default:
        aux = "       ";
        break;
    }
    datos.telesalud.frotis.push(aux);

    // TELESALUD GLICEMIA

    if ($_HCI01.dato_4040.tabla_glicemia_esq_w[0]["fecha_glicemia_esq_w"].trim() != "") {
      datos.telesalud.glicemia.push($_HCI01.dato_4040.tabla_glicemia_esq_w[0]["fecha_glicemia_esq_w"].substring(0, 4));
      datos.telesalud.glicemia.push($_HCI01.dato_4040.tabla_glicemia_esq_w[0]["fecha_glicemia_esq_w"].substring(4, 6));
      datos.telesalud.glicemia.push($_HCI01.dato_4040.tabla_glicemia_esq_w[0]["fecha_glicemia_esq_w"].substring(6, 8));
    } else {
      datos.telesalud.glicemia.push("    ");
      datos.telesalud.glicemia.push("  ");
      datos.telesalud.glicemia.push("  ");
    }

    datos.telesalud.glicemia.push($_HCI01.dato_4040.tabla_glicemia_esq_w[0]["resultado_glicemia_esq_w"]);

    if ($_HCI01.dato_4040.tabla_glicemia_esq_w[1]["fecha_glicemia_esq_w"].trim() != "") {
      datos.telesalud.glicemia.push($_HCI01.dato_4040.tabla_glicemia_esq_w[1]["fecha_glicemia_esq_w"].substring(0, 4));
      datos.telesalud.glicemia.push($_HCI01.dato_4040.tabla_glicemia_esq_w[1]["fecha_glicemia_esq_w"].substring(4, 6));
      datos.telesalud.glicemia.push($_HCI01.dato_4040.tabla_glicemia_esq_w[1]["fecha_glicemia_esq_w"].substring(6, 8));
    } else {
      datos.telesalud.glicemia.push("    ");
      datos.telesalud.glicemia.push("  ");
      datos.telesalud.glicemia.push("  ");
    }

    datos.telesalud.glicemia.push($_HCI01.dato_4040.tabla_glicemia_esq_w[1]["resultado_glicemia_esq_w"]);

    if ($_HCI01.dato_4040.tabla_glicemia_esq_w[2]["fecha_glicemia_esq_w"].trim() != "") {
      datos.telesalud.glicemia.push($_HCI01.dato_4040.tabla_glicemia_esq_w[2]["fecha_glicemia_esq_w"].substring(0, 4));
      datos.telesalud.glicemia.push($_HCI01.dato_4040.tabla_glicemia_esq_w[2]["fecha_glicemia_esq_w"].substring(4, 6));
      datos.telesalud.glicemia.push($_HCI01.dato_4040.tabla_glicemia_esq_w[2]["fecha_glicemia_esq_w"].substring(6, 8));
    } else {
      datos.telesalud.glicemia.push("    ");
      datos.telesalud.glicemia.push("  ");
      datos.telesalud.glicemia.push("  ");
    }

    datos.telesalud.glicemia.push($_HCI01.dato_4040.tabla_glicemia_esq_w[2]["resultado_glicemia_esq_w"]);

    // TELESALUD HEPATITIS B

    if ($_HCI01.dato_4040.hepatitis_b_esq_w["fecha_hepat_b_esq_w"].trim() != "") {
      datos.telesalud.hepatitis.push($_HCI01.dato_4040.hepatitis_b_esq_w["fecha_hepat_b_esq_w"].substring(0, 4));
      datos.telesalud.hepatitis.push($_HCI01.dato_4040.hepatitis_b_esq_w["fecha_hepat_b_esq_w"].substring(4, 6));
      datos.telesalud.hepatitis.push($_HCI01.dato_4040.hepatitis_b_esq_w["fecha_hepat_b_esq_w"].substring(6, 8));
    } else {
      datos.telesalud.hepatitis.push("    ");
      datos.telesalud.hepatitis.push("  ");
      datos.telesalud.hepatitis.push("  ");
    }

    aux = "";
    switch ($_HCI01.dato_4040.hepatitis_b_esq_w["resultado_hepat_b_esq_w"]) {
      case "1":
        aux = "POSITIVO";
        break;
      case "2":
        aux = "NEGATIVO";
        break;
      case "3":
        aux = "PENDIENTE";
        break;
      default:
        aux = "       ";
        break;
    }
    datos.telesalud.hepatitis.push(aux);

    // TELESALUD FECHAS INTERCONSULTA

    datos.telesalud.fechaGine = $_HCI01.dato_4040.fecha_interconsulta_esq_w["fecha_gineco_esq_w"];
    datos.telesalud.fechaOdont = $_HCI01.dato_4040.fecha_interconsulta_esq_w["fecha_odonto_esq_w"];
    datos.telesalud.fechaNutri = $_HCI01.dato_4040.fecha_interconsulta_esq_w["fecha_nutri_esq_w"];
    datos.telesalud.fechaPsico = $_HCI01.dato_4040.fecha_interconsulta_esq_w["fecha_psicol_esq_w"];

    if (
      ($_HCI01.dato_4040.prenatal_esq_w["fecha_aseso_pre_esq_w"].trim() == "" ||
        parseFloat($_HCI01.dato_4040.prenatal_esq_w["fecha_aseso_pre_esq_w"]) == 0) &&
      ($_HCI01.dato_4040.prenatal_esq_w["fecha_vac_influ_esq_w"].trim() == "" ||
        parseFloat($_HCI01.dato_4040.prenatal_esq_w["fecha_vac_influ_esq_w"]) == 0) &&
      ($_HCI01.dato_4040.prenatal_esq_w["fecha_aseso_pos_esq_w"].trim() == "" ||
        parseFloat($_HCI01.dato_4040.prenatal_esq_w["fecha_aseso_pos_esq_w"]) == 0) &&
      ($_HCI01.dato_4040.prenatal_esq_w["fecha_vac_tdap_esq_w"].trim() == "" ||
        parseFloat($_HCI01.dato_4040.prenatal_esq_w["fecha_vac_tdap_esq_w"]) == 0) &&
      ($_HCI01.dato_4040.prenatal_esq_w["fecha_vac_tdap_esq_w"].trim() == "" ||
        parseFloat($_HCI01.dato_4040.prenatal_esq_w["fecha_vac_tdap_esq_w"]) == 0) &&
      ($_HCI01.dato_4040.prenatal_esq_w["fecha_eco_obst_esq_w"].trim() == "" ||
        parseFloat($_HCI01.dato_4040.prenatal_esq_w["fecha_eco_obst_esq_w"]) == 0) &&
      ($_HCI01.dato_4040.prenatal_esq_w["fecha_vac_tt_esq_w"].trim() == "" ||
        parseFloat($_HCI01.dato_4040.prenatal_esq_w["fecha_vac_tt_esq_w"]) == 0)
    ) {
      datos.telesalud.banderaTabla1 = false;
      datos.telesalud.banderaTabla2 = false;
    } else {
      datos.telesalud.banderaTabla1 = true;
      datos.telesalud.banderaTabla2 = true;
    }

    if (
      $_HCI01.dato_4040.tabla_vih_esq_w[0]["fecha_vih_esq_w"].trim() == "" &&
      $_HCI01.dato_4040.tabla_vih_esq_w[1]["fecha_vih_esq_w"].trim() == "" &&
      $_HCI01.dato_4040.tabla_vih_esq_w[2]["fecha_vih_esq_w"].trim() == "" &&
      $_HCI01.dato_4040.tabla_serolo_esq_w[0]["fecha_serolo_esq_w"].trim() == "" &&
      $_HCI01.dato_4040.tabla_serolo_esq_w[1]["fecha_serolo_esq_w"].trim() == "" &&
      $_HCI01.dato_4040.tabla_serolo_esq_w[2]["fecha_serolo_esq_w"].trim() == "" &&
      $_HCI01.dato_4040.tabla_hemogl_esq_w[0]["fecha_hemogl_esq_w"].trim() == "" &&
      $_HCI01.dato_4040.tabla_hemogl_esq_w[1]["fecha_hemogl_esq_w"].trim() == "" &&
      $_HCI01.dato_4040.tabla_hemogl_esq_w[2]["fecha_hemogl_esq_w"].trim() == "" &&
      $_HCI01.dato_4040.tabla_igg_esq_w[0]["fecha_igg_esq_w"].trim() == "" &&
      $_HCI01.dato_4040.tabla_igg_esq_w[1]["fecha_igg_esq_w"].trim() == "" &&
      $_HCI01.dato_4040.tabla_igg_esq_w[2]["fecha_igg_esq_w"].trim() == "" &&
      $_HCI01.dato_4040.tabla_glicem_esq_w[0]["fecha_glicem_esq_w"].trim() == "" &&
      $_HCI01.dato_4040.tabla_glicem_esq_w[1]["fecha_glicem_esq_w"].trim() == "" &&
      $_HCI01.dato_4040.tabla_glicem_esq_w[2]["fecha_glicem_esq_w"].trim() == "" &&
      $_HCI01.dato_4040.tabla_hemogra_esq_w[0]["fecha_hemogra_esq_w"].trim() == "" &&
      $_HCI01.dato_4040.tabla_hemogra_esq_w[1]["fecha_hemogra_esq_w"].trim() == "" &&
      $_HCI01.dato_4040.tabla_hemogra_esq_w[2]["fecha_hemogra_esq_w"].trim() == "" &&
      $_HCI01.dato_4040.tabla_hemopara_esq_w[0]["fecha_hemopara_esq_w"].trim() == "" &&
      $_HCI01.dato_4040.tabla_hemopara_esq_w[1]["fecha_hemopara_esq_w"].trim() == "" &&
      $_HCI01.dato_4040.tabla_hemopara_esq_w[2]["fecha_hemopara_esq_w"].trim() == "" &&
      $_HCI01.dato_4040.tabla_fta_abs_esq_w[0]["fecha_fta_abs_esq_w"].trim() == "" &&
      $_HCI01.dato_4040.tabla_fta_abs_esq_w[1]["fecha_fta_abs_esq_w"].trim() == "" &&
      $_HCI01.dato_4040.tabla_fta_abs_esq_w[2]["fecha_fta_abs_esq_w"].trim() == "" &&
      $_HCI01.dato_4040.tabla_uroanali_esq_w[0]["fecha_uroanali_esq_w"].trim() == "" &&
      $_HCI01.dato_4040.tabla_uroanali_esq_w[1]["fecha_uroanali_esq_w"].trim() == "" &&
      $_HCI01.dato_4040.tabla_uroanali_esq_w[2]["fecha_uroanali_esq_w"].trim() == "" &&
      $_HCI01.dato_4040.tabla_uroculti_esq_w[0]["fecha_uroculti_esq_w"].trim() == "" &&
      $_HCI01.dato_4040.tabla_uroculti_esq_w[1]["fecha_uroculti_esq_w"].trim() == "" &&
      $_HCI01.dato_4040.tabla_uroculti_esq_w[2]["fecha_uroculti_esq_w"].trim() == "" &&
      $_HCI01.dato_4040.tabla_frotisv_esq_w[0]["fecha_frotisv_esq_w"].trim() == "" &&
      $_HCI01.dato_4040.tabla_frotisv_esq_w[1]["fecha_frotisv_esq_w"].trim() == "" &&
      $_HCI01.dato_4040.tabla_frotisv_esq_w[2]["fecha_frotisv_esq_w"].trim() == "" &&
      $_HCI01.dato_4040.tabla_glicemia_esq_w[0]["fecha_glicemia_esq_w"].trim() == "" &&
      $_HCI01.dato_4040.tabla_glicemia_esq_w[1]["fecha_glicemia_esq_w"].trim() == "" &&
      $_HCI01.dato_4040.tabla_glicemia_esq_w[2]["fecha_glicemia_esq_w"].trim() == ""
    ) {
      datos.telesalud.banderaTabla3 = false;
    } else {
      datos.telesalud.banderaTabla3 = true;
    }

    if (
      ($_HCI01.dato_4040.fecha_interconsulta_esq_w["fecha_gineco_esq_w"].trim() == "" ||
        parseFloat($_HCI01.dato_4040.fecha_interconsulta_esq_w["fecha_gineco_esq_w"]) == 0) &&
      ($_HCI01.dato_4040.fecha_interconsulta_esq_w["fecha_odonto_esq_w"].trim() == "" ||
        parseFloat($_HCI01.dato_4040.fecha_interconsulta_esq_w["fecha_odonto_esq_w"]) == 0) &&
      ($_HCI01.dato_4040.fecha_interconsulta_esq_w["fecha_nutri_esq_w"].trim() == "" ||
        parseFloat($_HCI01.dato_4040.fecha_interconsulta_esq_w["fecha_nutri_esq_w"]) == 0) &&
      ($_HCI01.dato_4040.fecha_interconsulta_esq_w["fecha_psicol_esq_w"].trim() == "" ||
        parseFloat($_HCI01.dato_4040.fecha_interconsulta_esq_w["fecha_psicol_esq_w"]) == 0)
    ) {
      datos.telesalud.banderaTabla4 = false;
      datos.telesalud.banderaTabla5 = false;
    } else {
      datos.telesalud.banderaTabla4 = true;
      datos.telesalud.banderaTabla5 = true;
    }
  } else {
    datos.gineco.bandera = false;
    datos.telesalud.banderaTabla1 = false;
    datos.telesalud.banderaTabla2 = false;
    datos.telesalud.banderaTabla3 = false;
    datos.telesalud.banderaTabla4 = false;
    datos.telesalud.banderaTabla5 = false;
  }
}

async function imprimirObstetrico_HCI01() {
  if ($_HCI01.dato_4040 != undefined) {
    datos.obst.bandera = true;

    var edad_gest_dec = parseFloat($_HCI01.dato_4040.obstetric_esq_w["edad_gest_regla_esq_w"].substring(2, 5));
    var dias_gest_w = Math.round(7 * edad_gest_dec);

    aux =
      $_HCI01.dato_4040.obstetric_esq_w["edad_gest_regla_esq_w"].substring(0, 2) +
      "+" +
      dias_gest_w.toString().substring(0, 1);

    datos.obst.cont.push(aux);
    datos.obst.cont.push($_HCI01.dato_4040.obstetric_esq_w["edad_gest_ultra_esq_w"]);
    datos.obst.cont.push($_HCI01.dato_4040.obstetric_esq_w["fecha_parto_fur_esq_w"]);
    datos.obst.cont.push($_HCI01.dato_4040.obstetric_esq_w["fecha_parto_son_esq_w"]);

    datos.obst.cont.push(_editarFecha($_HCI01.dato_4040.obstetric_esq_w["fecha_parto_fur_cale_esq_w"]));
    datos.obst.cont.push(_editarFecha($_HCI01.dato_4040.obstetric_esq_w["fecha_parto_son_cale_esq_w"]));

    if (
      $_HCI01.dato_4040.obstetric_esq_w["presentac_esq_w"].trim() != "" ||
      $_HCI01.dato_4040.obstetric_esq_w["presentac_esq_w"] != 4
    ) {
      aux = "";
      switch ($_HCI01.dato_4040.obstetric_esq_w["presentac_esq_w"]) {
        case "1":
          aux = "CEFALICO";
          break;
        case "2":
          aux = "PODALICO";
          break;
        case "3":
          aux = "TRANSVERSO";
          break;
        case "4":
          aux = "NO APLICA";
          break;
        default:
          aux = "     ";
          break;
      }
      datos.obst.titLin.push("PRESENTACIÓN: ");
      datos.obst.contLin.push(aux);
    }

    if (
      $_HCI01.dato_4040.obstetric_esq_w["situacion_esq_w"].trim() != "" ||
      $_HCI01.dato_4040.obstetric_esq_w["situacion_esq_w"] != 4
    ) {
      aux = "";
      switch ($_HCI01.dato_4040.obstetric_esq_w["situacion_esq_w"]) {
        case "1":
          aux = "LONGITUDINAL";
          break;
        case "2":
          aux = "TRANSVERSAL";
          break;
        case "3":
          aux = "OBLICUO";
          break;
        default:
          aux = "     ";
          break;
      }
      datos.obst.titLin.push("SITUACIÓN: ");
      datos.obst.contLin.push(aux);
    }

    if (
      $_HCI01.dato_4040.obstetric_esq_w["dorso_obs_esq_w"].trim() != "" ||
      $_HCI01.dato_4040.obstetric_esq_w["dorso_obs_esq_w"] != 4
    ) {
      aux = "";
      switch ($_HCI01.dato_4040.obstetric_esq_w["dorso_obs_esq_w"]) {
        case "1":
          aux = "ANTERIOR SUPERIOR";
          break;
        case "2":
          aux = "ANTERIOR INFERIOR";
          break;
        case "3":
          aux = "POSTERIOR SUPERIOR";
          break;
        case "4":
          aux = "POSTERIOR INFERIOR";
          break;
        default:
          aux = "     ";
          break;
      }
      datos.obst.titLin.push("DORSO: ");
      datos.obst.contLin.push(aux);
    }

    if (parseFloat($_HCI01.dato_4040.obstetric_esq_w["liq_amniot_vol_esq_w"]) > 0) {
      datos.obst.titLin.push("VOL. LIQ. AMNIOTICO: ");
      datos.obst.contLin.push($_HCI01.dato_4040.obstetric_esq_w["liq_amniot_vol_esq_w"]);
    }

    if ($_HCI01.dato_4040.obstetric_esq_w["polihidram_esq_w"].trim() != "") {
      datos.obst.titLin.push("POLIHIDRAMNIOS? ");
      datos.obst.contLin.push($_HCI01.dato_4040.obstetric_esq_w["polihidram_esq_w"]);
    }

    if ($_HCI01.dato_4040.obstetric_esq_w["oligoamnio_esq_w"].trim() != "") {
      datos.obst.titLin.push("OLIGOAMNIOS? ");
      datos.obst.contLin.push($_HCI01.dato_4040.obstetric_esq_w["oligoamnio_esq_w"]);
    }

    if (parseFloat($_HCI01.dato_4040.obstetric_esq_w["implantacion_esq_w"]) > 0) {
      aux = "";
      switch ($_HCI01.dato_4040.obstetric_esq_w["implantacion_esq_w"]) {
        case "01":
          aux = "FUNDICA            ";
          break;
        case "02":
          aux = "ANTERIOR           ";
          break;
        case "03":
          aux = "POSTERIOR          ";
          break;
        case "04":
          aux = "LATERAL IZQUIERDA  ";
          break;
        case "05":
          aux = "LATERAL DERECHA    ";
          break;
        case "06":
          aux = "MARGINAL ANTERIOR  ";
          break;
        case "07":
          aux = "MARGINAL POSTERIOR ";
          break;
        case "08":
          aux = "MARGINAL LATER,IZQ ";
          break;
        case "09":
          aux = "MARGINAL LATER.DER ";
          break;
        case "10":
          aux = "PREVIA PARC.LAT.IZQ";
          break;
        case "11":
          aux = "PREVIA PARC.LAT.DER";
          break;
        case "12":
          aux = "PREVIA PARCIAL POST";
          break;
        case "13":
          aux = "PREVIA PARCIAL ANT.";
          break;
        case "14":
          aux = "PREVIA CENTRAL TOT.";
          break;
        default:
          aux = "                    ";
          break;
      }
      datos.obst.titLin.push("IMPLANTAC. PLACENTA: ");
      datos.obst.contLin.push(aux);
    }

    if (parseFloat($_HCI01.dato_4040.obstetric_esq_w["dist_cervix_esq_w"]) > 0) {
      datos.obst.titLin.push("DISTANCIA DE CERVIX: ");
      datos.obst.contLin.push($_HCI01.dato_4040.obstetric_esq_w["dist_cervix_esq_w"]);
    }

    if (parseFloat($_HCI01.dato_4040.obstetric_esq_w["frec_card_fetal_esq_w"]) > 0) {
      datos.obst.titLin.push("FREC. CARD. FETAL: ");
      datos.obst.contLin.push($_HCI01.dato_4040.obstetric_esq_w["frec_card_fetal_esq_w"]);
    }

    if (
      parseFloat($_HCI01.dato_4040.obstetric_esq_w["umbil_ir_esq_w"]) > 0 ||
      parseFloat($_HCI01.dato_4040.obstetric_esq_w["cereb_ir_esq_w"]) > 0
    ) {
      datos.obst.banderaFlujo = true;

      d1 = new Intl.NumberFormat("de-DE").format($_HCI01.dato_4040.obstetric_esq_w["umbil_ir_esq_w"]);
      d2 = new Intl.NumberFormat("de-DE").format($_HCI01.dato_4040.obstetric_esq_w["umbil_ip_esq_w"]);
      d3 = new Intl.NumberFormat("de-DE").format($_HCI01.dato_4040.obstetric_esq_w["umbil_sd_esq_w"]);

      arrayAux = {
        flujo: "UMBILICAL: ",
        ir: d1,
        ip: d2,
        sd: d3,
      };
      datos.obst.cont2.push(arrayAux);

      d1 = new Intl.NumberFormat("de-DE").format($_HCI01.dato_4040.obstetric_esq_w["cereb_ir_esq_w"]);
      d2 = new Intl.NumberFormat("de-DE").format($_HCI01.dato_4040.obstetric_esq_w["cereb_ip_esq_w"]);
      d3 = new Intl.NumberFormat("de-DE").format($_HCI01.dato_4040.obstetric_esq_w["cereb_sd_esq_w"]);

      arrayAux = {
        flujo: "CEREBRAL MEDIA: ",
        ir: d1,
        ip: d2,
        sd: d3,
      };
      datos.obst.cont2.push(arrayAux);

      d1 = new Intl.NumberFormat("de-DE").format($_HCI01.dato_4040.obstetric_esq_w["utder_ir_esq_w"]);
      d2 = new Intl.NumberFormat("de-DE").format($_HCI01.dato_4040.obstetric_esq_w["utder_ip_esq_w"]);
      d3 = new Intl.NumberFormat("de-DE").format($_HCI01.dato_4040.obstetric_esq_w["utder_sd_esq_w"]);

      arrayAux = {
        flujo: "UTERINO DERECHA: ",
        ir: d1,
        ip: d2,
        sd: d3,
      };
      datos.obst.cont2.push(arrayAux);

      d1 = new Intl.NumberFormat("de-DE").format($_HCI01.dato_4040.obstetric_esq_w["utizq_ir_esq_w"]);
      d2 = new Intl.NumberFormat("de-DE").format($_HCI01.dato_4040.obstetric_esq_w["utizq_ip_esq_w"]);
      d3 = new Intl.NumberFormat("de-DE").format($_HCI01.dato_4040.obstetric_esq_w["utizq_sd_esq_w"]);

      arrayAux = {
        flujo: "UTERINO IZQUIERDA: ",
        ir: d1,
        ip: d2,
        sd: d3,
      };
      datos.obst.cont2.push(arrayAux);

      if ($_HCI01.dato_4040.obstetric_esq_w["observ_flujomet_esq_w"].trim() != "") {
        datos.obst.observTit = "OBSERV. FLUJOMETRIA: ";
        datos.obst.observ = $_HCI01.dato_4040.obstetric_esq_w["observ_flujomet_esq_w"];
      }
    }
  } else {
    datos.obst.bandera = false;
  }
}

// ------- IMPRIME SIGNOS VITALES -------
async function imprimirSignos_HCI01() {
  if (
    (parseFloat($_HCI01._hcprc.signos.peso) == 0 || $_HCI01._hcprc.signos.peso.trim() == "") &&
    (parseFloat($_HCI01._hcprc.signos.talla) == 0 || $_HCI01._hcprc.signos.talla.trim() == "") &&
    (parseFloat($_HCI01._hcprc.signos.temp) == 0 || $_HCI01._hcprc.signos.temp.trim() == "") &&
    (parseFloat($_HCI01._hcprc.signos.fcard) == 0 || $_HCI01._hcprc.signos.fcard.trim() == "") &&
    (parseFloat($_HCI01._hcprc.signos.fresp) == 0 || $_HCI01._hcprc.signos.fresp.trim() == "") &&
    (parseFloat($_HCI01._hcprc.signos.tens1) == 0 || $_HCI01._hcprc.signos.tens1.trim() == "")
  ) {
    datos.examFisico.bandera = false;
  } else {
    datos.examFisico.bandera = true;
    imprimirCuadroSignos_HCI01();

    if (
      $_HCI01._hcprc.edad.substring(0, 1) == "A" &&
      parseFloat($_HCI01._hcprc.edad.substring(1, 4)) > 18 &&
      ($_HCI01._hcprc.rips.embarazo == "4" ||
        $_HCI01._hcprc.rips.embarazo == "0" ||
        $_HCI01._hcprc.rips.embarazo == "9" ||
        $_HCI01._hcprc.rips.embarazo.trim() == "")
    ) {
      datos.examFisico.imc = calcularRangoImc($_HCI01._hcprc.signos.imc);
    } else if ($_HCI01.dato_4040 != undefined) {
      aux = "";
      var e2 = Math.round(parseFloat($_HCI01.dato_4040.obstetric_esq_w.edad_gest_regla_esq_w));
      var imc2 = parseFloat($_HCI01._hcprc.signos.imc);
      if (
        ((e2 == 6 || e2 == 7) && imc2 > 30.0) ||
        (e2 == 8 && imc2 > 30.1) ||
        ((e2 == 9 || e2 == 10) && imc2 > 30.2) ||
        ((e2 == 11 || e2 == 12) && imc2 > 30.3) ||
        (e2 == 13 && imc2 > 30.4) ||
        (e2 == 14 && imc2 > 30.5) ||
        (e2 == 15 && imc2 > 30.6) ||
        (e2 == 16 && imc2 > 30.7) ||
        (e2 == 17 && imc2 > 30.8) ||
        ((e2 == 18 || e2 == 19) && imc2 > 30.9) ||
        (e2 == 20 && imc2 > 31.0) ||
        (e2 == 21 && imc2 > 31.1) ||
        (e2 == 22 && imc2 > 31.2) ||
        (e2 == 23 && imc2 > 31.3) ||
        (e2 == 24 && imc2 > 31.5) ||
        (e2 == 25 && imc2 > 31.6) ||
        (e2 == 26 && imc2 > 31.7) ||
        (e2 == 27 && imc2 > 31.8) ||
        (e2 == 28 && imc2 > 31.9) ||
        (e2 == 29 && imc2 > 32.0) ||
        (e2 == 30 && imc2 > 32.1) ||
        (e2 == 31 && imc2 > 32.2) ||
        (e2 == 32 && imc2 > 32.3) ||
        (e2 == 33 && imc2 > 32.4) ||
        (e2 == 34 && imc2 > 32.5) ||
        (e2 == 35 && imc2 > 32.6) ||
        (e2 == 36 && imc2 > 32.7) ||
        (e2 == 37 && imc2 > 32.8) ||
        (e2 == 38 && imc2 > 32.9) ||
        (e2 == 39 && imc2 > 33.0) ||
        (e2 == 40 && imc2 > 33.1) ||
        ((e2 == 41 || e2 == 42) && imc2 > 33.2)
      ) {
        aux = "OBESIDAD PARA LA EDAD GESTACIONAL";
      } else if (
        ((e2 == 6 || e2 == 7) && imc2 >= 25.0 && imc2 <= 30) ||
        (e2 == 8 && imc2 >= 25.1 && imc2 <= 30.1) ||
        (e2 == 9 && imc2 >= 25.2 && imc2 <= 30.2) ||
        (e2 == 10 && imc2 >= 25.3 && imc2 <= 30.2) ||
        (e2 == 11 && imc2 >= 25.4 && imc2 <= 30.3) ||
        (e2 == 12 && imc2 >= 25.5 && imc2 <= 30.3) ||
        (e2 == 13 && imc2 >= 25.7 && imc2 <= 30.4) ||
        (e2 == 14 && imc2 >= 25.8 && imc2 <= 30.5) ||
        (e2 == 15 && imc2 >= 25.9 && imc2 <= 30.6) ||
        (e2 == 16 && imc2 >= 26.0 && imc2 <= 30.7) ||
        (e2 == 17 && imc2 >= 26.1 && imc2 <= 30.8) ||
        (e2 == 18 && imc2 >= 26.2 && imc2 <= 30.9) ||
        (e2 == 19 && imc2 >= 26.3 && imc2 <= 30.9) ||
        (e2 == 20 && imc2 >= 26.4 && imc2 <= 31.0) ||
        (e2 == 21 && imc2 >= 26.5 && imc2 <= 31.1) ||
        (e2 == 22 && imc2 >= 26.7 && imc2 <= 31.2) ||
        (e2 == 23 && imc2 >= 26.8 && imc2 <= 31.3) ||
        (e2 == 24 && imc2 >= 27.0 && imc2 <= 31.5) ||
        (e2 == 25 && imc2 >= 27.1 && imc2 <= 31.6) ||
        (e2 == 26 && imc2 >= 27.2 && imc2 <= 31.7) ||
        (e2 == 27 && imc2 >= 27.4 && imc2 <= 31.8) ||
        (e2 == 28 && imc2 >= 27.6 && imc2 <= 31.9) ||
        (e2 == 29 && imc2 >= 27.7 && imc2 <= 32.0) ||
        (e2 == 30 && imc2 >= 27.9 && imc2 <= 32.1) ||
        (e2 == 31 && imc2 >= 28.0 && imc2 <= 32.2) ||
        (e2 == 32 && imc2 >= 28.1 && imc2 <= 32.3) ||
        (e2 == 33 && imc2 >= 28.2 && imc2 <= 32.4) ||
        (e2 == 34 && imc2 >= 28.4 && imc2 <= 32.5) ||
        (e2 == 35 && imc2 >= 28.5 && imc2 <= 32.6) ||
        (e2 == 36 && imc2 >= 28.6 && imc2 <= 32.7) ||
        (e2 == 37 && imc2 >= 28.8 && imc2 <= 32.8) ||
        (e2 == 38 && imc2 >= 28.9 && imc2 <= 32.9) ||
        (e2 == 39 && imc2 >= 29.0 && imc2 <= 33.0) ||
        (e2 == 40 && imc2 >= 29.2 && imc2 <= 33.1) ||
        ((e2 == 41 || e2 == 42) && imc2 >= 29.3 && imc2 <= 33.3)
      ) {
        aux = "SOBREPESO PARA LA EDAD GESTACIONAL";
      } else if (
        (e2 == 6 && imc2 >= 20.0 && imc2 <= 24.9) ||
        (e2 == 7 && imc2 >= 20.1 && imc2 <= 24.9) ||
        (e2 == 8 && imc2 >= 20.2 && imc2 <= 25.0) ||
        (e2 == 9 && imc2 >= 20.2 && imc2 <= 25.1) ||
        (e2 == 10 && imc2 >= 20.3 && imc2 <= 25.2) ||
        (e2 == 11 && imc2 >= 20.4 && imc2 <= 25.3) ||
        (e2 == 12 && imc2 >= 20.5 && imc2 <= 25.4) ||
        (e2 == 13 && imc2 >= 20.7 && imc2 <= 25.6) ||
        (e2 == 14 && imc2 >= 20.8 && imc2 <= 25.7) ||
        (e2 == 15 && imc2 >= 20.9 && imc2 <= 25.8) ||
        (e2 == 16 && imc2 >= 21.1 && imc2 <= 25.9) ||
        (e2 == 17 && imc2 >= 21.2 && imc2 <= 26.0) ||
        (e2 == 18 && imc2 >= 21.3 && imc2 <= 26.1) ||
        (e2 == 19 && imc2 >= 21.5 && imc2 <= 26.2) ||
        (e2 == 20 && imc2 >= 21.6 && imc2 <= 26.3) ||
        (e2 == 21 && imc2 >= 21.8 && imc2 <= 26.4) ||
        (e2 == 22 && imc2 >= 21.9 && imc2 <= 26.6) ||
        (e2 == 23 && imc2 >= 22.1 && imc2 <= 26.7) ||
        (e2 == 24 && imc2 >= 22.3 && imc2 <= 26.9) ||
        (e2 == 25 && imc2 >= 22.5 && imc2 <= 27.0) ||
        (e2 == 26 && imc2 >= 22.7 && imc2 <= 27.2) ||
        (e2 == 27 && imc2 >= 22.8 && imc2 <= 27.3) ||
        (e2 == 28 && imc2 >= 23.0 && imc2 <= 27.5) ||
        (e2 == 29 && imc2 >= 23.2 && imc2 <= 27.6) ||
        (e2 == 30 && imc2 >= 23.4 && imc2 <= 27.8) ||
        (e2 == 31 && imc2 >= 23.5 && imc2 <= 27.9) ||
        (e2 == 32 && imc2 >= 23.7 && imc2 <= 28.0) ||
        (e2 == 33 && imc2 >= 23.9 && imc2 <= 28.1) ||
        (e2 == 34 && imc2 >= 24.0 && imc2 <= 28.3) ||
        (e2 == 35 && imc2 >= 24.2 && imc2 <= 28.4) ||
        (e2 == 36 && imc2 >= 24.3 && imc2 <= 28.5) ||
        (e2 == 37 && imc2 >= 24.5 && imc2 <= 28.7) ||
        (e2 == 38 && imc2 >= 24.6 && imc2 <= 28.8) ||
        (e2 == 39 && imc2 >= 24.8 && imc2 <= 28.9) ||
        (e2 == 40 && imc2 >= 25.0 && imc2 <= 29.1) ||
        ((e2 == 41 || e2 == 42) && imc2 >= 25.1 && imc2 <= 29.2)
      ) {
        aux = "IMC ADECUADO PARA LA EDAD GESTACIONAL";
      } else if (
        (e2 == 6 && imc2 < 20.0) ||
        (e2 == 7 && imc2 < 20.1) ||
        ((e2 == 8 || 9) && imc2 < 20.2) ||
        (e2 == 10 && imc2 < 20.3) ||
        (e2 == 11 && imc2 < 20.4) ||
        (e2 == 12 && imc2 < 20.5) ||
        (e2 == 13 && imc2 < 20.7) ||
        (e2 == 14 && imc2 < 20.8) ||
        (e2 == 15 && imc2 < 20.9) ||
        (e2 == 16 && imc2 < 21.1) ||
        (e2 == 17 && imc2 < 21.2) ||
        (e2 == 18 && imc2 < 21.3) ||
        (e2 == 19 && imc2 < 21.5) ||
        (e2 == 20 && imc2 < 21.6) ||
        (e2 == 21 && imc2 < 21.8) ||
        (e2 == 22 && imc2 < 21.9) ||
        (e2 == 23 && imc2 < 22.1) ||
        (e2 == 24 && imc2 < 22.3) ||
        (e2 == 25 && imc2 < 22.5) ||
        (e2 == 26 && imc2 < 22.7) ||
        (e2 == 27 && imc2 < 22.8) ||
        (e2 == 28 && imc2 < 23.0) ||
        (e2 == 29 && imc2 < 23.2) ||
        (e2 == 30 && imc2 < 23.4) ||
        (e2 == 31 && imc2 < 23.5) ||
        (e2 == 32 && imc2 < 23.7) ||
        (e2 == 33 && imc2 < 23.9) ||
        (e2 == 34 && imc2 < 24.0) ||
        (e2 == 35 && imc2 < 24.2) ||
        (e2 == 36 && imc2 < 24.3) ||
        (e2 == 37 && imc2 < 24.5) ||
        (e2 == 38 && imc2 < 24.6) ||
        (e2 == 39 && imc2 < 24.8) ||
        (e2 == 40 && imc2 < 25.0) ||
        ((e2 == 41 || e2 == 42) && imc2 < 25.1)
      ) {
        aux = "BAJO PESO PARA LA EDAD GESTACIONAL";
      }
      datos.examFisico.imcEg = aux;
    }
  }

  if ($_HCI01.dato_9008 != undefined) {
    if ($_HCI01.dato_9008.consume_tabaco) {
      var riesgo_w = _EVALCARDIO(
        $_HCI01._paci.SEXO,
        $_HCI01._hcprc.edad,
        $_HCI01._paci.DIABETES,
        $_HCI01._hcprc.signos.tens1,
        $_HCI01.dato_9008.consume_tabaco
      );

      aux = "";
      if (riesgo_w > 0) {
        switch (riesgo_w) {
          case 1:
            aux = "RIESGO BAJO < 10%";
            break;
          case 2:
            aux = "RIESGO MODERADO 10% A < 20%";
            break;
          case 3:
            aux = "RIESGO ALTO 20% A < 30%";
            break;
          case 4:
            aux = "RIESGO MUY ALTO 30% A < 40%";
            break;
          case 5:
            aux = "RIESGO EXTREMADAMENTE ALTO >= 40%";
            break;
        }
        datos.examFisico.riesgoCardio = aux;
      }
    }
  }
}
// ---- IMPRIME OTORRINO ----
async function imprimirOtorrino_HCI01() {
  if ($_HCI01.dato_4030 != undefined) {
    if ($_HCI01.dato_4030["pabel_4030"].trim() != "") {
      datos.otorrino.titulos.push("PABELLON AURICULAR:");
      datos.otorrino.contenido.push($_HCI01.dato_4030["pabel_4030"]);
    }

    if ($_HCI01.dato_4030["condu_4030"].trim() != "") {
      datos.otorrino.titulos.push("CONDUCTOS AUDITIVOS EXTERNOS:");
      datos.otorrino.contenido.push($_HCI01.dato_4030["condu_4030"]);
    }

    if ($_HCI01.dato_4030["me_oi_4030"].trim() != "") {
      datos.otorrino.titulos.push("MEMBRANA TIMPANICA OIDO IZQUIERDO:");
      datos.otorrino.contenido.push($_HCI01.dato_4030["me_oi_4030"]);
    }

    if ($_HCI01.dato_4030["me_od_4030"].trim() != "") {
      datos.otorrino.titulos.push("MEMBRANA TIMPANICA OIDO DERECHO:");
      datos.otorrino.contenido.push($_HCI01.dato_4030["me_od_4030"]);
    }

    if ($_HCI01.dato_4030["vesti_4030"].trim() != "") {
      datos.otorrino.titulos.push("APARATO VESTIBULAR:");
      datos.otorrino.contenido.push($_HCI01.dato_4030["vesti_4030"]);
    }

    if (
      $_HCI01.dato_4030["weber_4030"].trim() != "" ||
      $_HCI01.dato_4030["rinoi_4030"].trim() != "" ||
      $_HCI01.dato_4030["rinod_4030"].trim() != ""
    ) {
      datos.otorrino.titulos.push("D I A P A S O N E S :");
      datos.otorrino.contenido.push("");
    }

    if ($_HCI01.dato_4030["weber_4030"].trim() != "") {
      datos.otorrino.titulos.push("WEBBER:");
      datos.otorrino.contenido.push($_HCI01.dato_4030["weber_4030"]);
    }

    if ($_HCI01.dato_4030["rinoi_4030"].trim() != "") {
      datos.otorrino.titulos.push("RINNE OIDO IZQUIERDO:");
      datos.otorrino.contenido.push($_HCI01.dato_4030["rinoi_4030"]);
    }

    if ($_HCI01.dato_4030["rinod_4030"].trim() != "") {
      datos.otorrino.titulos.push("RINNE OIDO DERECHO:");
      datos.otorrino.contenido.push($_HCI01.dato_4030["rinod_4030"]);
    }

    if ($_HCI01.dato_4030["nariz_4030"].trim() != "") {
      datos.otorrino.titulos.push("NARIZ EXTERNA:");
      datos.otorrino.contenido.push($_HCI01.dato_4030["nariz_4030"]);
    }

    if ($_HCI01.dato_4030["septu_4030"].trim() != "") {
      datos.otorrino.titulos.push("SEPTUM:");
      datos.otorrino.contenido.push($_HCI01.dato_4030["septu_4030"]);
    }

    if ($_HCI01.dato_4030["corne_4030"].trim() != "") {
      datos.otorrino.titulos.push("CORNETES:");
      datos.otorrino.contenido.push($_HCI01.dato_4030["corne_4030"]);
    }

    if ($_HCI01.dato_4030["c_ora_4030"].trim() != "") {
      datos.otorrino.titulos.push("CAVIDAD ORAL:");
      datos.otorrino.contenido.push($_HCI01.dato_4030["c_ora_4030"]);
    }

    if ($_HCI01.dato_4030["larin_4030"].trim() != "") {
      datos.otorrino.titulos.push("LARINGE INDIRECTA:");
      datos.otorrino.contenido.push($_HCI01.dato_4030["larin_4030"]);
    }

    if ($_HCI01.dato_4030["cuell_4030"].trim() != "") {
      datos.otorrino.titulos.push("CUELLO:");
      datos.otorrino.contenido.push($_HCI01.dato_4030["cuell_4030"]);
    }
  } else {
    datos.otorrino.bandera = false;
  }
}

// IMPRIME TABLA DE SIGNOS VITALES
function imprimirCuadroSignos_HCI01() {
  datos.examFisico.cont.push($_HCI01._hcprc.signos.tens1 + "/" + $_HCI01._hcprc.signos.tens2);
  datos.examFisico.cont.push($_HCI01._hcprc.signos.tens_m);
  datos.examFisico.cont.push($_HCI01._hcprc.signos.fcard + " lmp");
  datos.examFisico.cont.push($_HCI01._hcprc.signos.fresp + " rpm");
  datos.examFisico.cont.push($_HCI01._hcprc.signos.temp + "°");
  datos.examFisico.cont.push($_HCI01._hcprc.signos.oximetria + "%");
  datos.examFisico.cont.push($_HCI01._hcprc.signos.pvc);

  if ($_HCI01._hcprc.signos.und_peso == "2" || parseFloat($_HCI01._hcprc.signos.peso) > 500) {
    datos.examFisico.cont.push($_HCI01._hcprc.signos.peso + " Gr");
  } else {
    datos.examFisico.cont.push($_HCI01._hcprc.signos.peso + " Kl");
  }
  datos.examFisico.cont.push($_HCI01._hcprc.signos.talla + " cm");
  datos.examFisico.cont.push($_HCI01._hcprc.signos.imc);
  datos.examFisico.cont.push($_HCI01._hcprc.signos.sup + " m2");
  datos.examFisico.cont.push($_HCI01._hcprc.signos.per_tora);
  datos.examFisico.cont.push($_HCI01._hcprc.signos.per_abdo);
  datos.examFisico.cont.push($_HCI01._hcprc.signos.per_mune);
  datos.examFisico.cont.push($_HCI01._hcprc.signos.glasg.substring(3, 5) + "/15");

  if (
    $_HCI01._hcprc.rips.embarazo == "4" ||
    $_HCI01._hcprc.rips.embarazo == "0" ||
    $_HCI01._hcprc.rips.embarazo == "9" ||
    $_HCI01._hcprc.rips.embarazo.trim() == ""
  ) {
    if (
      ($_HCI01._hcprc.edad.substring(0, 1) == "A" && parseFloat($_HCI01._hcprc.edad.substring(1, 4)) >= 18) ||
      $_HCI01._paci.CRONICO == "S"
    ) {
      if (isNaN(parseFloat($_HCI01._hcprc.signos.per_abdo))) {
        datos.examFisico.obesidad = "";
      } else {
        if ($_HCI01._paci.SEXO == "F") {
          if (parseFloat($_HCI01._hcprc.signos.per_abdo) <= 80) {
            datos.examFisico.obesidad = "NO";
          } else {
            datos.examFisico.obesidad = "SI";
          }
        } else {
          if (parseFloat($_HCI01._hcprc.signos.per_abdo) <= 90) {
            datos.examFisico.obesidad = "NO";
          } else {
            datos.examFisico.obesidad = "SI";
          }
        }
      }
    }
  }
}

async function imprimirExamenFisico_HCI01() {
  if ($_HCI01.exa_general_hc != undefined) {
    if (
      ($_USUA_GLOBAL[0].NIT == 800175901 && $_HCI01._paci["EPS"] == "PAR001") ||
      $_HCI01.exa_general_hc.trim() == ""
    ) {
      datos.observExamFisico = " ";
    } else {
      datos.observExamFisico = $_HCI01.exa_general_hc;
    }
  }
}

// IMPRIME DATOS DE ACOMPAÑANTE
async function imprimirEsquemaHC02_HCI01() {
  imprimirObserv7502_HCI01();

  if ($_HCI01._hcprc.esquema == "HC02") {
    datos.acompa.bandera = true;

    postData({ datosh: datosEnvio() + $_HCI01._hcprc.id_acompa }, get_url("app/SALUD/SER810-1.DLL"))
      .then((data) => {
        $_HCI01.reg_acomp = data["REG-PACI"][0];

        datos.acompa.id = parseFloat($_HCI01._hcprc.id_acompa);
        datos.acompa.tipoId = $_HCI01.reg_acomp["TIPO-ID"];
        datos.acompa.nombre = $_HCI01.reg_acomp["DESCRIP"];
      })
      .catch((err) => {
        console.log(err, "error");
      });

    datos.acompa.texto = "   ";
  } else {
    datos.acompa.bandera = false;
  }
}

// LLENAR DIAGNOSTICO - ANALISIS

async function imprimirDiagnostico_HCI01() {
  for (var i in $_HCI01._hcprc.rips.tabla_diag) {
    if ($_HCI01._hcprc.rips.tabla_diag[i].diagn.trim() != "") {
      datos.datosAnalisis.diagnostico.push(
        $_HCI01._hcprc.rips.tabla_diag[i].diagn + " - " + $_HCI01._hcprc.rips.tabla_diag[i].descrip
      );
    }
  }
}

// IMPRIME OBSERVACION
function imprimirObserv7502_HCI01() {
  if ($_HCI01.observacion_hc != undefined) {
    datos.observ7502 = $_HCI01.observacion_hc;
  }
}

// IMPRIME ANALISIS
async function imprimirAnalisis_HCI01() {
  $_HCI01.analisis_hc ? (datos.datosAnalisis.analisis = $_HCI01.analisis_hc) : false;
  $_HCI01.plan_hc ? (datos.plan = $_HCI01.plan_hc) : (datos.plan = false);
}

// IMPRIME TIPO DE DIAGNOSTICO
async function imprimirTipoDiag_HCI01() {
  if ($_HCI01._hcprc.rips.tipo_diag.trim() != "") {
    $_HCI01.nit_usu == 900264583 ? (datos.datosAnalisis.bandera = 1) : (datos.datosAnalisis.bandera = 2);

    aux = "";
    switch ($_HCI01._hcprc.rips.tipo_diag) {
      case "1":
        aux = "1-IMPRESION DIAGNOSTICA";
        break;
      case "2":
        aux = "2-CONFIRMADO NUEVO";
        break;
      case "3":
        aux = "3-CONFIRMADO REPETIDO";
        break;
      case "9":
        aux = "9-NO APLICA";
        break;
    }
    datos.datosAnalisis.tipoDiag = aux;
  }
}

// IMPRIME RIPS
async function imprimirRips_HCI01() {
  if (parseFloat($_HCI01._hcprc.rips.causa) > 0) {
    datos.rips.titulos.push("CAUSA: ");
    aux = "";
    switch (parseFloat($_HCI01._hcprc.rips.causa)) {
      case 1:
        aux = "ACCIDENTE DE TRABAJO";
        break;
      case 2:
        aux = "ACCIDENTE DE TRANSITO";
        break;
      case 3:
        aux = "ACCIDENTE RABICO";
        break;
      case 4:
        aux = "ACCIDENTE OFIDICO";
        break;
      case 5:
        aux = "OTRO TIPO DE ACCIDENTE";
        break;
      case 6:
        aux = "EVENTO CATASTROFICO";
        break;
      case 7:
        aux = "LESION POR AGRESION";
        break;
      case 8:
        aux = "LESION AUTOINFLIGIDA";
        break;
      case 9:
        aux = "SOSPECHA MALTRATO FISICO";
        break;
      case 10:
        aux = "SOSPECHA ABUSO SEXUAL";
        break;
      case 11:
        aux = "SOSPECHA VIOLENCIA SEXUAL";
        break;
      case 12:
        aux = "SOSPECHA MALTRATO EMOCION";
        break;
      case 13:
        aux = "ENFERMEDAD GENERAL";
        break;
      case 14:
        aux = "ENFERMEDAD PROFESIONAL";
        break;
      case 15:
        aux = "NO APLICA";
        break;
      default:
        aux = "       ";
        break;
    }
    datos.rips.contenido.push(aux);
  }

  if (parseFloat($_HCI01._hcprc.cierre.unserv) == 08) {
    datos.rips.titulos.push("P & P: ");
    datos.rips.contenido.push("SI");
  }

  if (parseFloat($_HCI01._hcprc.rips.finalidad) > 0) {
    datos.rips.titulos.push("FINALIDAD: ");
    aux = "";
    switch (parseFloat($_HCI01._hcprc.rips.finalidad)) {
      case 1:
        aux = "ATENCION PARTO -Puerperio-";
        break;
      case 2:
        aux = "ATENCION RECIEN NACIDO";
        break;
      case 3:
        aux = "ATENCION PLANIF.FAMILIAR";
        break;
      case 4:
        aux = "AT.ALTER.CREC. & DESARR.<10";
        break;
      case 5:
        aux = "DETECCION ALT. DESARR.JOVEN";
        break;
      case 6:
        aux = "DETECCION ALT. EMBARAZO";
        break;
      case 7:
        aux = "DETECCION ALT. ADULTO";
        break;
      case 8:
        aux = "DETECCION ALT. AGUDEZA VISUAL";
        break;
      case 9:
        aux = "DETECCION ENFERM.PROFESIONAL";
        break;
      case 10:
        aux = "NO APLICA";
        break;
      case 11:
        aux = "PATOLOGIAS CRONICAS";
        break;
      default:
        aux = "       ";
        break;
    }
    datos.rips.contenido.push(aux);
  }

  if (
    $_HCI01._hcprc.rips.finalidad == "05" &&
    ($_HCI01._hcprc.signos.tanner_pubico == "1" ||
      $_HCI01._hcprc.signos.tanner_pubico == "2" ||
      $_HCI01._hcprc.signos.tanner_pubico == "3" ||
      $_HCI01._hcprc.signos.tanner_pubico == "4" ||
      $_HCI01._hcprc.signos.tanner_pubico == "5")
  ) {
    imprimirTanner_HCI01();
  }
}

// IMPRIME TANNER
function imprimirTanner_HCI01() {
  datos.rips.titulos.push("TANNER:  VELLO PUBIANO");

  aux = "";
  switch ($_HCI01._hcprc.signos.tanner_pubico) {
    case "1":
      aux = "1. SIN VELLO PUBIANO";
      break;
    case "2":
      aux = "2. VELLO DISPERSO, LARGO, FINO, LISO O LIGERAMENTE RIZADO, POCO PIGMENTADO, EN LABIOS MAYORES";
      break;
    case "3":
      aux = "3. VELLO MAS PIGMENTADO, DENSO Y RIZADO QUE SE EXTIENDE A LA SINFILIS PUBICA";
      break;
    case "4":
      aux = "4. VELLO SEMEJANTE AL ADULTO PERO EN MENOR CANTIDAD";
      break;
    case "5":
      aux = "5. VELLO IGUAL AL ADULTO";
      break;
    default:
      aux = "   ";
  }
  datos.rips.contenido.push(aux);

  if ($_HCI01._paci.SEXO == "F") {
    datos.rips.titulos.push("TANNER:  ESTADIO MAMARIO");

    aux = "";
    switch ($_HCI01._hcprc.signos.tanner_genit) {
      case "0":
        aux = "NO SE EVALUO";
        break;
      case "1":
        aux = "1. ELEVACION DE LA PAPILA (PREADOLESCENTE)";
        break;
      case "2":
        aux = "2. BOTON MAMARIO, ELEVACION DE LAS MAMAS Y LA PAPILA, AUMENTO TAMAÑO AEROLAR";
        break;
      case "3":
        aux = "3. AUMENTO TAMAÑO MAMARIO SIS SEPARACION DE SUS CONTORNOS";
        break;
      case "4":
        aux = "4. PROYECCION DE LA AREOLA Y PAPILA, QUE SOBRESALEN DEL PLANO DE LA MAMA";
        break;
      case "5":
        aux = "5. MAMA ADULTA, SOLAMENTE SE PROYECTA LA PAPILA";
        break;
    }
    datos.rips.contenido.push(aux);
  } else {
    datos.rips.titulos.push("TANNER:  ESTADIO GENITAL");

    aux = "";
    switch ($_HCI01._hcprc.signos.tanner_genit) {
      case "0":
        aux = "NO SE EVALUO";
        break;
      case "1":
        aux = "1. PENE, TESTICULO Y ESCROTO DE TAMAÑO INFANTIL";
        break;
      case "2":
        aux = "2. AUMENTO DEL TAMAÑO DE LOS TESTICULOS Y EL ESCROTO, CUYA PIEL ES FINA Y ENROJECIDA";
        break;
      case "3":
        aux = "3. SE SUMA EL AUMENTO DEL TAMAÑO DEL PENE";
        break;
      case "4":
        aux = "4. AUMENTO DE TAMAÑO DE GENITALES MAS AUMENTO PIGMENTACION ESCROTAL";
        break;
      case "5":
        aux = "5. GENITALES ADULTOS";
        break;
    }
    datos.rips.contenido.push(aux);
  }
}

async function imprimirSintomRespi_HCI01() {
  datos.rips.titulos.push("SINTOMATICO RESPIRATORIO:");

  aux = "";
  switch ($_HCI01._hcprc.signos.sintom_resp) {
    case "S":
      aux = "SI";
      break;
    case "N":
      aux = "NO";
      break;
    case "X":
      aux = "NO VALORADO";
      break;
    default:
      aux = "     ";
      break;
  }
  datos.rips.contenido.push(aux);
}

async function imprimirSintomPiel_HCI01() {
  datos.rips.titulos.push("SINTOMATICO PIEL:");

  aux = "";
  switch ($_HCI01._hcprc.signos.sintom_piel) {
    case "S":
      aux = "SI";
      break;
    case "N":
      aux = "NO";
      break;
    case "X":
      aux = "NO VALORADO";
      break;
    default:
      aux = "     ";
      break;
  }
  datos.rips.contenido.push(aux);
}

async function imprimirVictiMaltrato_HCI01() {
  datos.rips.titulos.push("VICTIMA DE MALTRATO:");

  aux = "";
  switch ($_HCI01._hcprc.signos.victi_maltrato) {
    case "S":
      aux = "SI";
      break;
    case "N":
      aux = "NO";
      break;
    case "X":
      aux = "NO VALORADO";
      break;
    default:
      aux = "     ";
      break;
  }
  datos.rips.contenido.push(aux);
}

async function imprimirVictiViolencia_HCI01() {
  datos.rips.titulos.push("VICTIMA VIOLENCIA:");

  aux = "";
  switch ($_HCI01._hcprc.signos.victi_violencia) {
    case "S":
      aux = "SI";
      break;
    case "N":
      aux = "NO";
      break;
    case "X":
      aux = "NO VALORADO";
      break;
    default:
      aux = "     ";
      break;
  }
  datos.rips.contenido.push(aux);
}

async function imprimirEnferMental_HCI01() {
  datos.rips.titulos.push("ENFERMEDAD MENTAL:");

  aux = "";
  switch ($_HCI01._hcprc.signos.enfer_mental) {
    case "S":
      aux = "SI";
      break;
    case "N":
      aux = "NO";
      break;
    case "X":
      aux = "NO VALORADO";
      break;
    default:
      aux = "     ";
      break;
  }
  datos.rips.contenido.push(aux);
}

async function imprimirEnferIts_HCI01() {
  datos.rips.titulos.push("ENFERMEDAD ITS:");

  aux = "";
  switch ($_HCI01._hcprc.signos.enfer_its) {
    case "S":
      aux = "SI";
      break;
    case "N":
      aux = "NO";
      break;
    case "X":
      aux = "NO VALORADO";
      break;
    default:
      aux = "     ";
      break;
  }
  datos.rips.contenido.push(aux);
}

async function imprimirCancerSeno_HCI01() {
  datos.rips.titulos.push("CANCER DE SENO:");

  aux = "";
  switch ($_HCI01._hcprc.signos.cancer_seno) {
    case "S":
      aux = "SI";
      break;
    case "N":
      aux = "NO";
      break;
    case "X":
      aux = "NO VALORADO";
      break;
    default:
      aux = "     ";
      break;
  }
  datos.rips.contenido.push(aux);
}

async function imprimirCancerCervis_HCI01() {
  datos.rips.titulos.push("CANCER DE CERVIX:");

  aux = "";
  switch ($_HCI01._hcprc.signos.cancer_cervis) {
    case "S":
      aux = "SI";
      break;
    case "N":
      aux = "NO";
      break;
    case "X":
      aux = "NO VALORADO";
      break;
    default:
      aux = "     ";
      break;
  }
  datos.rips.contenido.push(aux);
}

async function imprimirEduAutoExaSeno_HCI01() {
  datos.rips.titulos.push("EDUCA AUTOEXAMEN DE SENO:");

  aux = "";
  switch ($_HCI01._hcprc.signos.edu_autoexa_seno) {
    case "S":
      aux = "SI";
      break;
    case "N":
      aux = "NO";
      break;
    case "X":
      aux = "NO VALORADO";
      break;
    default:
      aux = "     ";
      break;
  }
  datos.rips.contenido.push(aux);
}

async function imprimirCitologiaPrevia_HCI01() {
  datos.rips.titulos.push("CITOLOGIA PREVIA:");

  aux = "";
  switch ($_HCI01._hcprc.signos.citologia_previa) {
    case "S":
      aux = "SI";
      break;
    case "N":
      aux = "NO";
      break;
    case "X":
      aux = "NO VALORADO";
      break;
    default:
      aux = "     ";
      break;
  }
  datos.rips.contenido.push(aux);
}

async function imprimirFechaCitoPrevia_HCI01() {
  datos.rips.titulos.push("FECHA CITOLOGIA PREVIA:");
  datos.rips.contenido.push($_HCI01._hcprc.signos.fecha_cito_previa);
}

async function imprimirCreatininaGlomedular_HCI01() {
  datos.rips.titulos.push("CREATININA  METODO MDRD:");

  if (parseFloat($_HCI01._hcprc.signos.creatinina) == 0) {
    datos.rips.contenido.push($_HCI01._hcprc.signos.creatinina2);
  } else {
    datos.rips.contenido.push($_HCI01._hcprc.signos.creatinina);
  }

  datos.rips.titulos.push("FILTRADO GLOMEDULAR:");

  if (parseFloat($_HCI01._hcprc.signos.creatinina) > 0) {
    $_HCI01._hcprc.signos.creatinina2 = $_HCI01._hcprc.signos.creatinina;
  }

  tfg = "";
  edad = parseFloat($_HCI01._hcprc.edad.substring(1, 4));
  peso = parseFloat($_HCI01._hcprc.signos.peso);
  crea2 = $_HCI01._hcprc.signos.creatinina2;
  if ($_HCI01._paci.SEXO == "F") {
    tfg = (((148 - edad) * peso) / (72 * crea2)) * 0.85;
  } else {
    tfg = ((148 - edad) * peso) / (72 * crea2);
  }

  tfg = parseFloat(tfg);

  datos.rips.contenido.push(tfg);
}

async function imprimirHemoGlicosada_HCI01() {
  datos.rips.titulos.push("HEMOGLOBINA GLICOSILADA:");
  datos.rips.contenido.push($_HCI01._hcprc.signos.hemo_glicosilada);

  datos.rips.titulos.push("FECHA DE TOMA:");
  datos.rips.contenido.push($_HCI01._hcprc.signos.hemo_glico_fecha);
}

async function imprimirMicroalbuminuria_HCI01() {
  datos.rips.titulos.push("MICROALBUMINURIA:");

  if (parseFloat($_HCI01._hcprc.signos.microalbuminuria) == 0) {
    aux = $_HCI01._hcprc.signos.microalbuminuria2;
  } else {
    aux = $_HCI01._hcprc.signos.microalbuminuria;
  }
  datos.rips.contenido.push(aux);

  datos.rips.titulos.push("FECHA DE TOMA:");
  datos.rips.contenido.push($_HCI01._hcprc.signos.fecha_microalbuminuria);
}

async function imprimirRiesgoCardio_HCI01() {
  datos.rips.titulos.push("RIESGO CARDIOVASCULAR:");

  aux = "";
  switch ($_HCI01._hcprc.signos.riesgo_cardio) {
    case "1":
      aux = "BAJO";
      break;
    case "2":
      aux = "MODERADO";
      break;
    case "3":
      aux = "ALTO";
      break;
    case "4":
      aux = "MUY ALTO";
      break;
    case "4":
      aux = $_HCI01._hcprc.signos.riesgo_cardio;
      break;
  }
  datos.rips.contenido.push(aux);
}

async function imprimirRelAlbumiCreati_HCI01(rela_albumi_creatinina_w) {
  datos.rips.titulos.push("RELACION ALBUMINA/CREATININA:");
  datos.rips.contenido.push(rela_albumi_creatinina_w);
}

async function imprimirErc_HCI01() {
  datos.rips.titulos.push("ERC:");

  aux = "";
  switch ($_HCI01._hcprc.signos.erc) {
    case "0":
      aux = "NO PRESENTA ERC";
      break;
    case "1":
      aux = "SI PRESENTA ERC";
      break;
    case "2":
      aux = "INDETERMINADO";
      break;
    default:
      aux = $_HCI01._hcprc.signos.erc;
      break;
  }
  datos.rips.contenido.push(aux);

  if ($_HCI01._hcprc.signos.erc == "1") {
    datos.rips.titulos.push("FECHA DX ERC:");
    datos.rips.contenido.push($_HCI01._hcprc.signos.fecha_dx_erc);
  }
}

function salir_HCI01() {
  console.log("SALIR");
}

// IMPRIME DATOS DE SALIDA
async function imprimirSalida_HCI01() {
  if (parseFloat($_HCI01._hcprc.rips.estado) > 0 && parseFloat($_HCI01._hcprc.cierre.estado) < 2) {
    datos.salida.bandera = true;

    aux = "";
    switch ($_HCI01._hcprc.rips.estado_sal) {
      case "1":
        aux = "VIVO (A)";
        break;
      case "2":
        aux = "MUERTO (A)";
        break;
      case "3":
        aux = "REMITIDO A: ";
        break;
      case "4":
        aux = "HOSPITALIZADO";
        break;
      case "5":
        aux = "OBSERVACION";
        break;
      default:
        aux = "  ";
        break;
    }
    datos.salida.estado = aux;

    if ($_HCI01._hcprc.rips.remitido.trim() != "") {
      datos.salida.remitido = $_HCI01._hcprc.rips.remitido;
    } else {
      datos.salida.remitido = "";
    }
  }
}

async function imprimirFirma_HCI01() {
  datos.medico.firma = parseFloat($_HCI01._hcprc.med.trim());
  datos.medico.nombre = $_HCI01._hcprc.descrip_med.replace(/\�/g, "Ñ");
  datos.medico.espec = $_HCI01._hcprc.descrip_espec_med;
  datos.medico.reg = $_HCI01._hcprc.reg_med;
}

// IMPRIME DETALLE 9001 - DOWNTON
async function imprimirDownton_HCI01() {
  if ($_HCI01.dato_9001 != undefined) {
    if ($_HCI01.dato_9001["caidas_previas_9001"].trim() != "") {
      $_HCI01.dato_9001["caidas_previas_9001"] == "S" ? ($_HCI01.caidas_w = 1) : ($_HCI01.caidas_w = 0);
      $_HCI01.dato_9001["medica_frecuente_9001"] == "S" ? ($_HCI01.medica_w = 1) : ($_HCI01.medica_w = 0);
      $_HCI01.dato_9001["alteracion_senso_9001"] == "S" ? ($_HCI01.alteracion_w = 1) : ($_HCI01.alteracion_w = 0);
      $_HCI01.dato_9001["estado_mental_9001"] == "2" || $_HCI01.dato_9001["estado_mental_9001"] == "3"
        ? ($_HCI01.estado_mental_w = 1)
        : ($_HCI01.estado_mental_w = 0);
      $_HCI01.dato_9001["deambulacion_9001"] == "2" || $_HCI01.dato_9001["deambulacion_9001"] == "3"
        ? ($_HCI01.deambulacion_w = 1)
        : ($_HCI01.deambulacion_w = 0);

      $_HCI01.dato_9001["caidas_previas_9001"] == "S"
        ? (datos.downton.cont.caidas = "Si")
        : (datos.downton.cont.caidas = "No");
      $_HCI01.dato_9001["medica_frecuente_9001"] == "S"
        ? (datos.downton.cont.medicamentos = "Si")
        : (datos.downton.cont.medicamentos = "No");
      $_HCI01.dato_9001["alteracion_senso_9001"] == "S"
        ? (datos.downton.cont.alteraciones = "Si")
        : (datos.downton.cont.alteraciones = "No");

      aux = "";
      switch ($_HCI01.dato_9001["estado_mental_9001"]) {
        case "1":
          aux = "00 ORIENTADO";
          break;
        case "2":
          aux = "01 CONFUSO";
          break;
        case "3":
          aux = "01 AGITACION SICOMOTORA";
          break;
        default:
          aux = "00 NO APLICA";
          break;
      }
      datos.downton.cont.mental = aux;

      aux = "";
      switch ($_HCI01.dato_9001["deambulacion_9001"]) {
        case "1":
          aux = "00 NORMAL";
          break;
        case "2":
          aux = "01 ASISTIDA";
          break;
        case "3":
          aux = "01 POSTRADO";
          break;
        default:
          aux = "00 NO APLICA";
          break;
      }
      datos.downton.cont.deambulacion = aux;

      $_HCI01.cant_w =
        $_HCI01.caidas_w + $_HCI01.medica_w + $_HCI01.alteracion_w + $_HCI01.estado_mental_w + deambulacion_w;

      if ($_HCI01.cant_w >= 3) {
        // Imprime riesgo alto de caida
        datos.downton.bandera = "alto";
      } else if ($_HCI01.cant_w == 2) {
        // imprime riesgo medio de caida
        datos.downton.bandera = "medio";
      } else {
        // imprime riesgo bajo de caida
        datos.downton.bandera = "bajo";
      }
    }
  }
}

// IMPRIME DETALLE 9002 - BRADEN
async function imprimirBraden_HCI01() {
  if ($_HCI01.dato_9002 != undefined) {
    if (parseFloat($_HCI01.dato_9002["presep_senso_9002"]) > 0) {
      aux = "";
      switch ($_HCI01.dato_9002["presep_senso_9002"]) {
        case "1":
          aux = "COMPLETAMENTE LIMITADAS";
          break;
        case "2":
          aux = "MUY LIMITADAS";
          break;
        case "3":
          aux = "LIGERAMENTE LIMITADA";
          break;
        case "4":
          aux = "LIGERAMENTE LIMITADA";
          break;
        default:
          aux = "        ";
          break;
      }
      datos.braden.cont.percepcion = aux;

      aux = "";
      switch ($_HCI01.dato_9002["humedad_9002"]) {
        case "1":
          aux = "COMPLETAMENTE";
          break;
        case "2":
          aux = "A MENUDO";
          break;
        case "3":
          aux = "OCASIONALMENTE";
          break;
        case "4":
          aux = "RARAMENTE";
          break;
        default:
          aux = "        ";
          break;
      }
      datos.braden.cont.humedad = aux;

      aux = "";
      switch ($_HCI01.dato_9002["actividad_9002"]) {
        case "1":
          aux = "POSTRADO";
          break;
        case "2":
          aux = "EN SILLA";
          break;
        case "3":
          aux = "DEAMBULA OCASIONALMENTE";
          break;
        case "4":
          aux = "DEAMBULA FRECUENTEMENTE";
          break;
        default:
          aux = "        ";
          break;
      }
      datos.braden.cont.actividad = aux;

      aux = "";
      switch ($_HCI01.dato_9002["movilidad_9002"]) {
        case "1":
          aux = "COMPLETAMENTE INMOVIL";
          break;
        case "2":
          aux = "MUY LIMITADA";
          break;
        case "3":
          aux = "LIGERAMENTE LIMITADA";
          break;
        case "4":
          aux = "SIN LIMITACIONES";
          break;
        default:
          aux = "        ";
          break;
      }
      datos.braden.cont.movilidad = aux;

      aux = "";
      switch ($_HCI01.dato_9002["nutricion_9002"]) {
        case "1":
          aux = "MUY POBRE";
          break;
        case "2":
          aux = "PROBABLEMENTE INADEDUCADA";
          break;
        case "3":
          aux = "ADECUADA";
          break;
        case "4":
          aux = "EXCELENTE";
          break;
        default:
          aux = "        ";
          break;
      }
      datos.braden.cont.nutricion = aux;

      aux = "";
      switch ($_HCI01.dato_9002["peligro_lesion_9002"]) {
        case "1":
          aux = "PROBLEMA";
          break;
        case "2":
          aux = "PROBLEMA POTENCIAL";
          break;
        case "3":
          aux = "NO EXISTE PROBLEMA APARENTE";
          break;
        default:
          aux = "        ";
          break;
      }
      datos.braden.cont.roce = aux;

      $_HCI01.cant2_w =
        parseFloat($_HCI01.dato_9002["presep_senso_9002"]) +
        parseFloat($_HCI01.dato_9002["humedad_9002"]) +
        parseFloat($_HCI01.dato_9002["actividad_9002"]) +
        parseFloat($_HCI01.dato_9002["movilidad_9002"]) +
        parseFloat($_HCI01.dato_9002["nutricion_9002"]) +
        parseFloat($_HCI01.dato_9002["peligro_lesion_9002"]);

      if ($_HCI01.cant2_w <= 12) {
        // imprime medidas preventivas para alto riesgo ulcera por presion
        datos.braden.bandera = "alto";
      } else if ($_HCI01.cant2_w == 13 || $_HCI01.cant2_w == 14) {
        // imprime medidas preventivas moderado riesgo ulcera por presion
        datos.braden.bandera = "medio";
      } else if (parseFloat($_HCI01._hcprc.edad.substring(1, 4)) < 75) {
        // imprime medidas preventivas bajo riesgo ulcera por presion
        if ($_HCI01.cant2_w == 15 || $_HCI01.cant2_w == 16) {
          datos.braden.bandera = "bajo";
        }
      } else if ($_HCI01.cant2_w >= 15 && $_HCI01.cant2_w <= 18) {
        // imprime medidas preventivas bajo riesgo ulcera por presion
        datos.braden.bandera = "bajo";
      }
    }
  }
}

async function imprimirDatosCovid_HCI01() {
  if ($_HCI01._hcprc.covid19.viaje_covid19.trim() == "" && $_HCI01._hcprc.covid19.contacto_covid19.trim() == "") {
    // continue
  } else {
    datos.covid.riesgos.bandera = true;

    aux = "";
    switch ($_HCI01._hcprc.covid19.viaje_covid19) {
      case "S":
        aux = "SI";
        break;
      case "N":
        aux = "NO";
        break;
      default:
        aux = "  ";
        break;
    }
    datos.covid.riesgos.transito = aux;

    aux = "";
    switch ($_HCI01._hcprc.covid19.contacto_covid19) {
      case "S":
        aux = "SI";
        break;
      case "N":
        aux = "NO";
        break;
      default:
        aux = "  ";
        break;
    }
    datos.covid.riesgos.contDiag = aux;

    aux = "";
    switch ($_HCI01._hcprc.covid19.fiebre_covid19) {
      case "S":
        aux = "SI";
        break;
      case "N":
        aux = "NO";
        break;
      default:
        aux = "  ";
        break;
    }
    datos.covid.riesgos.fiebre = aux;

    aux = "";
    switch ($_HCI01._hcprc.covid19.tos_covid19) {
      case "S":
        aux = "SI";
        break;
      case "N":
        aux = "NO";
        break;
      default:
        aux = "  ";
        break;
    }
    datos.covid.riesgos.tos = aux;

    aux = "";
    switch ($_HCI01._hcprc.covid19.disnea_covid19) {
      case "S":
        aux = "SI";
        break;
      case "N":
        aux = "NO";
        break;
      default:
        aux = "  ";
        break;
    }
    datos.covid.riesgos.disnea = aux;

    aux = "";
    switch ($_HCI01._hcprc.covid19.malestar_covid19) {
      case "S":
        aux = "SI";
        break;
      case "N":
        aux = "NO";
        break;
      default:
        aux = "  ";
        break;
    }
    datos.covid.riesgos.general = aux;

    aux = "";
    switch ($_HCI01._hcprc.covid19.rinorrea_covid19) {
      case "S":
        aux = "SI";
        break;
      case "N":
        aux = "NO";
        break;
      default:
        aux = "  ";
        break;
    }
    datos.covid.riesgos.rinorrea = aux;

    aux = "";
    switch ($_HCI01._hcprc.covid19.personal_salud_covid19) {
      case "S":
        aux = "SI";
        break;
      case "N":
        aux = "NO";
        break;
      default:
        aux = "  ";
        break;
    }
    datos.covid.riesgos.contEstr = aux;

    aux = "";
    switch ($_HCI01._hcprc.covid19.odinofagia_covid19) {
      case "S":
        aux = "SI";
        break;
      case "N":
        aux = "NO";
        break;
      default:
        aux = "  ";
        break;
    }
    datos.covid.riesgos.odinofagia = aux;

    aux = "";
    switch ($_HCI01._hcprc.covid19.viaje_dentro_covid19) {
      case "S":
        aux = "SI";
        break;
      case "N":
        aux = "NO";
        break;
      default:
        aux = "  ";
        break;
    }
    datos.covid.riesgos.pre1 = aux;

    if ($_HCI01._hcprc.covid19.viaje_dentro_covid19 == "S") {
      var x = $_HCI01._ciudades.find((e) => e.COD == $_HCI01._hcprc.covid19.lugar_dentro_covid19);
      x != undefined ? (datos.covid.riesgos.pre2 = x.NOMBRE) : false;
      datos.covid.riesgos.pre3 = $_HCI01._hcprc.covid19.tiempo_dentro_covid19;
    }

    aux = "";
    switch ($_HCI01._hcprc.covid19.viaje_fuera_covid19) {
      case "S":
        aux = "SI";
        break;
      case "N":
        aux = "NO";
        break;
      default:
        aux = "  ";
        break;
    }
    datos.covid.riesgos.pre4 = aux;

    if ($_HCI01._hcprc.covid19.viaje_fuera_covid19 == "S") {
      var x = $_HCI01._paisesRips.find((e) => e.CODIGO == $_HCI01._hcprc.covid19.lugar_fuera_covid19);
      x != undefined ? (datos.covid.riesgos.pre5 = x.DESCRIP) : false;
      datos.covid.riesgos.pre6 = $_HCI01._hcprc.covid19.tiempo_fuera_covid19;
    }
  }
}

async function imprimirTelesalud_HCI01() {
  if ($_HCI01._hcprc.telesalud.trim() != "") {
    datos.telesalud.bandera = true;

    aux = "";
    switch ($_HCI01._hcprc.telesalud) {
      case "S":
        aux = "SI";
        break;
      case "N":
        aux = "NO";
        break;
      default:
        aux = "  ";
        break;
    }
    datos.telesalud.acepta = aux;
  } else {
    datos.telesalud.bandera = false;
  }
}

async function imprimirViolencia_HCI01() {
  datos.violencia.bandera = true;

  aux = "";
  switch ($_HCI01._hcprc.violencia.orientacion_sex) {
    case "1":
      aux = "HETEROSEXUAL";
      break;
    case "2":
      aux = "LESBIANA";
      break;
    case "3":
      aux = "BISEXUAL";
      break;
    case "4":
      aux = "GAY";
      break;
    case "5":
      aux = "TRANSEXUAL";
      break;
    case "6":
      aux = "INTERSEXUAL";
      break;
    case "7":
      aux = "NO APLICA";
      break;
    default:
      aux = "   ";
  }
  datos.violencia.orientacion = aux;

  aux = "";
  switch ($_HCI01._hcprc.violencia.discapacidad) {
    case "1":
      aux = "DISCAPACIDAD FISICA";
      break;
    case "2":
      aux = "DISCAPACIDAD COGNITIVA";
      break;
    case "3":
      aux = "DISCAPACIDAD SENSORIAL";
      break;
    case "4":
      aux = "NINGUNA";
      break;
    case "5":
      aux = "SIN DATO";
      break;
    default:
      aux = "   ";
  }
  datos.violencia.discapacidad = aux;

  aux = "";
  switch ($_HCI01._hcprc.violencia.vulnerabilidad) {
    case "1":
      aux = "HABITALIDAD EN CALLE";
      break;
    case "2":
      aux = "TRABAJO SEXUAL";
      break;
    case "3":
      aux = "ADULTO MAYOR DE 60 ANOS";
      break;
    case "4":
      aux = "CONSUMO DE SPA";
      break;
    case "5":
      aux = "PRIVADO DE LA LIBERTAD";
      break;
    case "6":
      aux = "ENFERMEDAD MENTAL";
      break;
    case "7":
      aux = "ABANDONO SOCIAL";
      break;
    case "8":
      aux = "DESEMPLEO";
      break;
    case "9":
      aux = "DESESCOLARIZACION";
      break;
    case "A":
      aux = "NO APLICA";
      break;
    default:
      aux = "   ";
  }
  datos.violencia.vulnerabilidad = aux;

  aux = "";
  switch ($_HCI01._hcprc.violencia.riesgo_psicos) {
    case "1":
      aux = "PERDIDA RECIENTE";
      break;
    case "2":
      aux = "CONFLICTOS DE PAREJA";
      break;
    case "3":
      aux = "CONFLICTO FLIAR";
      break;
    case "4":
      aux = "PROB. ESCOLARES";
      break;
    case "5":
      aux = "STRESS";
      break;
    case "6":
      aux = "CRISIS ECONOMICA";
      break;
    case "7":
      aux = "ENFERMEDAD CRONICA";
      break;
    case "8":
      aux = "VICTIMA DE MATONEO";
      break;
    case "9":
      aux = "ANTECEDENTE FLIAR DE CONSUMO DE SPA";
      break;
    case "A":
      aux = "ANTECEDENTE FLIAR DE SUICIDIO";
      break;
    case "B":
      aux = "ANTECEDENTE DE MALTRATO O VIOLENCIA";
      break;
    case "C":
      aux = "FALTA DE COMPROMISO FLIAR";
      break;
    case "D":
      aux = "PERTENECIA A PANDILLAS";
      break;
    case "E":
      aux = "NO SE IDENTIFICA";
      break;
    case "F":
      aux = "NINGUNO";
      break;
    default:
      aux = "   ";
  }
  datos.violencia.riesgoPsicosocial = aux;

  aux = "";
  switch ($_HCI01._hcprc.violencia.acciones_reali) {
    case "1":
      aux = "NOTIFICACIÓN A JUSTICIA";
      break;
    case "2":
      aux = "NOTIFICACION A PROTECCION";
      break;
    case "3":
      aux = "CANALIZACION A EDUCACION";
      break;
    case "4":
      aux = "CANALIZACION A DESARROLLO SOCIAL";
      break;
    case "5":
      aux = "REMISION A SALUD";
      break;
    case "6":
      aux = "TODAS";
      break;
    default:
      aux = "   ";
  }
  datos.violencia.accionesReal = aux;

  aux = "";
  switch ($_HCI01._hcprc.violencia.tipo_violencia) {
    case "1":
      aux = "VIOLENCIA SEXUAL";
      break;
    case "2":
      aux = "VIOLENCIA INTRAFAMILIAR";
      break;
    case "3":
      aux = "VIOLENCIA FISICA";
      break;
    case "4":
      aux = "VIOLENCIA PSICOLOGICA";
      break;
    case "5":
      aux = "ATAQUE CON ACIDO";
      break;
    case "6":
      aux = "NEGLIGENCIA";
      break;
    case "7":
      aux = "VIOLENCIA ESCOLAR";
      break;
    case "8":
      aux = "NO APLICA";
      break;
    default:
      aux = "   ";
  }
  datos.violencia.tipoViolencia = aux;

  if ($_HCI01._hcprc.violencia.tipo_violencia == "1") {
    aux = "";
    switch ($_HCI01._hcprc.violencia.penetracion) {
      case "S":
        aux = "SI";
        break;
      case "N":
        aux = "NO";
        break;
    }
    datos.violencia.penetracionAnal = aux;
  }

  aux = "";
  switch ($_HCI01._hcprc.violencia.diligencia_viole) {
    case "1":
      aux = "ACOSO Y/O VIOLACION ANTES DE LAS 72 HORAS";
      break;
    case "2":
      aux = "ACOSO Y/O VIOLACION DESPUES DE LAS 72 HORAS";
      break;
    case "3":
      aux = "ABUSO SEXUAL EN MENOR DE 14 AÑOS";
      break;
    case "4":
      aux = "NINGUNA DE LAS ANTERIORES";
      break;
    case "5":
      aux = "NO APLICA";
      break;
    default:
      aux = "   ";
  }
  datos.violencia.violenciaSex = aux;

  a = $_HCI01._hcprc.violencia.fecha_rem_psiquiatra.substring(0, 4);
  m = $_HCI01._hcprc.violencia.fecha_rem_psiquiatra.substring(4, 6);
  d = $_HCI01._hcprc.violencia.fecha_rem_psiquiatra.substring(6, 8);

  datos.violencia.fechaPsiquiatria = "Año: " + a + " Mes: " + m + " Dia: " + d;

  a = $_HCI01._hcprc.violencia.fecha_ate_medicgral.substring(0, 4);
  m = $_HCI01._hcprc.violencia.fecha_ate_medicgral.substring(4, 6);
  d = $_HCI01._hcprc.violencia.fecha_ate_medicgral.substring(6, 8);

  datos.violencia.fechaAtencionMed = "Año: " + a + " Mes: " + m + " Dia: " + d;

  aux = "";
  switch ($_HCI01._hcprc.violencia.trabajo_social) {
    case "S":
      aux = "SI";
      break;
    case "N":
      aux = "NO";
      break;
  }
  datos.violencia.trabajoSocial = aux;

  a = $_HCI01._hcprc.violencia.fecha_ate_psicologia.substring(0, 4);
  m = $_HCI01._hcprc.violencia.fecha_ate_psicologia.substring(4, 6);
  d = $_HCI01._hcprc.violencia.fecha_ate_psicologia.substring(6, 8);

  datos.violencia.fechaAtencionPsico = "Año: " + a + " Mes: " + m + " Dia: " + d;

  aux = "";
  switch ($_HCI01._hcprc.violencia.psicoterapia_individual) {
    case "S":
      aux = "SI";
      break;
    case "N":
      aux = "NO";
      break;
  }
  datos.violencia.psicoterapiaIndProg = aux;

  datos.violencia.psicoterapiaIndEjec = $_HCI01._hcprc.violencia.psicoterapia_ind_ejecu;

  aux = "";
  switch ($_HCI01._hcprc.violencia.psicoterapia_familiar) {
    case "S":
      aux = "SI";
      break;
    case "N":
      aux = "NO";
      break;
  }
  datos.violencia.psicoterapiaFamProg = aux;

  datos.violencia.psicoterapiaFamEjec = $_HCI01._hcprc.violencia.psicoterapia_fam_ejecu;

  a = $_HCI01._hcprc.violencia.fecha_notificacion.substring(0, 4);
  m = $_HCI01._hcprc.violencia.fecha_notificacion.substring(4, 6);
  d = $_HCI01._hcprc.violencia.fecha_notificacion.substring(6, 8);

  datos.violencia.fechaNotificacion = "Año: " + a + " Mes: " + m + " Dia: " + d;

  aux = "";
  switch ($_HCI01._hcprc.violencia.psicoterapia_familiar) {
    case "S":
      aux = "SI";
      break;
    case "N":
      aux = "NO";
      break;
  }
  datos.violencia.manejoSalud = aux;

  aux = "";
  switch ($_HCI01._hcprc.violencia.anticoncepcion_emer) {
    case "S":
      aux = "SI";
      break;
    case "N":
      aux = "NO";
      break;
  }
  datos.violencia.anticoncepcion = aux;

  aux = "";
  switch ($_HCI01._hcprc.violencia.tipo_metodo) {
    case "S":
      aux = "SI";
      break;
    case "N":
      aux = "NO";
      break;
  }
  datos.violencia.tipoMetodo = aux;

  aux = "";
  switch ($_HCI01._hcprc.violencia.asesoria_consejeria) {
    case "S":
      aux = "SI";
      break;
    case "N":
      aux = "NO";
      break;
  }
  datos.violencia.asesoria = aux;

  aux = "";
  switch ($_HCI01._hcprc.violencia.consejeria_ive) {
    case "1":
      aux = "CANALIZADA PARA IVE";
      break;
    case "2":
      aux = "CONTINUA EMBARAZO";
      break;
    case "3":
      aux = "CONSEJERIA ADOPCION DEL BEBE";
      break;
  }
  datos.violencia.acciones = aux;

  aux = "";
  switch ($_HCI01._hcprc.violencia.ruta_proteccioN) {
    case "1":
      aux = "ICBF";
      break;
    case "2":
      aux = "COMISARIA DE FLIA";
      break;
    case "3":
      aux = "INSPECCION DE POLICIA";
      break;
    case "4":
      aux = "DEFENSORIA";
      break;
    case "5":
      aux = "CABILDOS INDIGENAS";
      break;
    case "6":
      aux = "RESGUARDO INDIGENA";
      break;
    case "7":
      aux = "VIOLENCIA ESCOLAR";
      break;
  }
  datos.violencia.actRutaProt = aux;

  aux = "";
  switch ($_HCI01._hcprc.violencia.ruta_justicia) {
    case "1":
      aux = "FISCALIA";
      break;
    case "2":
      aux = "POLICIA";
      break;
    case "3":
      aux = "JUZGADO MPAL";
      break;
    case "4":
      aux = "CABILDO INDIGENA";
      break;
    case "5":
      aux = "REGUARDO INDIGENA";
      break;
  }
  datos.violencia.actRutaJust = aux;

  datos.violencia.seguimiento.fechaSem2 = $_HCI01._hcprc.violencia.fecha_segui_res459_sem2;
  datos.violencia.seguimiento.fechaSem4 = $_HCI01._hcprc.violencia.fecha_segui_res459_sem4;
  datos.violencia.seguimiento.fecha3Mes = $_HCI01._hcprc.violencia.fecha_segui_res459_3mes;
  datos.violencia.seguimiento.fecha6Mes = $_HCI01._hcprc.violencia.fecha_segui_res459_6mes;
  datos.violencia.seguimiento.fecha1Año = $_HCI01._hcprc.violencia.fecha_segui_res459_1ano;

  aux = "";
  switch ($_HCI01._hcprc.violencia.seguimiento_menor) {
    case "1":
      aux = "EVALUACION A LA SEMANA";
      break;
    case "2":
      aux = "VISITA DOMICILIARIA AL MES";
      break;
    case "3":
      aux = "CUATRO MESES";
      break;
    case "4":
      aux = "AL ANO";
      break;
    case "5":
      aux = "EVALUACION PERMANENTE HASTA QUE ESTE FUERA DE PELIGRO";
      break;
    case "6":
      aux = "VISITA DOMICILIARIA A LOS QUINCE DIAS";
      break;
    case "7":
      aux = "DOS MESES";
      break;
    case "8":
      aux = "SEIS MESES";
      break;
    case "9":
      aux = "AL AÑO";
      break;
    case "A":
      aux = "CITACIONES PERIODICAS AL MENOR Y SU FAMILIA";
      break;
  }
  datos.violencia.seguiMenor = aux;

  aux = "";
  switch ($_HCI01._hcprc.violencia.seguimiento_mujer) {
    case "1":
      aux = "CITAR A LA AGREDIDA AL MES";
      break;
    case "2":
      aux = "CADA 3 MESES, DURANTE EL PRIMER ANO";
      break;
    case "3":
      aux = "CONSULTA INDIVIDUAL";
      break;
    case "4":
      aux = "VISITA DOMICILIARIA A LOS 15 DIAS";
      break;
    case "5":
      aux = "CADA MES DURANTE EL PRIMER SEMESTRE";
      break;
  }
  datos.violencia.seguiMujer = aux;

  a = $_HCI01._hcprc.violencia.fecha_cierre_res459.substring(0, 4);
  m = $_HCI01._hcprc.violencia.fecha_cierre_res459.substring(4, 6);
  d = $_HCI01._hcprc.violencia.fecha_cierre_res459.substring(6, 8);

  datos.violencia.fechaCierre = "Año: " + a + " Mes: " + m + " Dia: " + d;

  aux = "";
  switch ($_HCI01._hcprc.violencia.captacion_poblacion) {
    case "1":
      aux = "PYP";
      break;
    case "2":
      aux = "CONSULTA EXTERNA";
      break;
    case "3":
      aux = "URGENCIAS";
      break;
    case "4":
      aux = "TAMIZAJES";
      break;
    case "5":
      aux = "OTRA";
      break;
  }
  datos.violencia.captacion = aux;

  datos.violencia.observaciones = $_HCI01._hcprc.violencia.observaciones_res459;
}

async function imprimirSifilisCong_HCI01() {
  datos.sifilis.bandera = true;

  for (i in $_HCI01._hcprc.tratamiento_sifilis[0].tabla_tto_sifi) {
    if ($_HCI01._hcprc.tratamiento_sifilis[0].tabla_tto_sifi[i].fecha != "00000000") {
      a = $_HCI01._hcprc.tratamiento_sifilis[0].tabla_tto_sifi[i].fecha.substring(0, 4);
      m = $_HCI01._hcprc.tratamiento_sifilis[0].tabla_tto_sifi[i].fecha.substring(4, 6);
      d = $_HCI01._hcprc.tratamiento_sifilis[0].tabla_tto_sifi[i].fecha.substring(6, 8);

      aux = "Año: " + a + " Mes: " + m + " Dia: " + d;

      datos.sifilis.trata.fecha.push(aux);
      datos.sifilis.trata.medic.push($_HCI01._hcprc.tratamiento_sifilis[0].tabla_tto_sifi[i].medicamento);
      datos.sifilis.trata.dosis.push($_HCI01._hcprc.tratamiento_sifilis[0].tabla_tto_sifi[i].dosis);
      datos.sifilis.trata.prof.push($_HCI01._hcprc.tratamiento_sifilis[0].tabla_tto_sifi[i].profe_aplico);
    }
  }

  if (
    $_HCI01._hcprc.tratamiento_sifilis[1].tabla_segui_serol[0].fecha == "00000000" &&
    $_HCI01._hcprc.tratamiento_sifilis[1].tabla_segui_serol[1].fecha == "00000000" &&
    $_HCI01._hcprc.tratamiento_sifilis[1].tabla_segui_serol[2].fecha == "00000000" &&
    $_HCI01._hcprc.tratamiento_sifilis[1].tabla_segui_serol[3].fecha == "00000000"
  ) {
    // continue
  } else {
    for (i in $_HCI01._hcprc.tratamiento_sifilis[1].tabla_segui_serol) {
      datos.sifilis.sero.tipo.push($_HCI01._hcprc.tratamiento_sifilis[1].tabla_segui_serol[i].tipo);
      datos.sifilis.sero.fecha.push($_HCI01._hcprc.tratamiento_sifilis[1].tabla_segui_serol[i].fecha);
      datos.sifilis.sero.resul.push($_HCI01._hcprc.tratamiento_sifilis[1].tabla_segui_serol[i].resul);
    }
  }

  aux = "";
  switch ($_HCI01._hcprc.tratamiento_sifilis[2].nece_retto) {
    case "S":
      aux = "SI";
      break;
    case "N":
      aux = "NO";
      break;
  }
  datos.sifilis.necesitoRet = aux;

  a = $_HCI01._hcprc.tratamiento_sifilis[2].fecha_retto.substring(0, 4);
  m = $_HCI01._hcprc.tratamiento_sifilis[2].fecha_retto.substring(4, 6);
  d = $_HCI01._hcprc.tratamiento_sifilis[2].fecha_retto.substring(6, 8);

  datos.sifilis.fechaRet = "Año: " + a + " Mes: " + m + " Dia: " + d;

  datos.sifilis.medicamento = $_HCI01._hcprc.tratamiento_sifilis[2].medica_retto;
  datos.sifilis.dosis = $_HCI01._hcprc.tratamiento_sifilis[2].dosis_retto;
  datos.sifilis.profesional = $_HCI01._hcprc.tratamiento_sifilis[2].profe_aplico_retto;
  datos.sifilis.cuantosDias = $_HCI01._hcprc.tratamiento_sifilis[2].cuantos_dias_retto;

  aux = "";
  switch ($_HCI01._hcprc.tratamiento_sifilis[2].dx_contacto) {
    case "S":
      aux = "SI";
      break;
    case "N":
      aux = "NO";
      break;
  }
  datos.sifilis.dxContactos = aux;

  aux = "";
  switch ($_HCI01._hcprc.tratamiento_sifilis[2].tto_contacto) {
    case "S":
      aux = "SI";
      break;
    case "N":
      aux = "NO";
      break;
  }
  datos.sifilis.ttoContactos = aux;

  datos.sifilis.remitio = $_HCI01._hcprc.tratamiento_sifilis[2].remitio_contacto;
}

async function imprimirTactoRectal_HCI01() {
  datos.tacto_rect = {};

  let busqueda = [1,2,3].includes(parseInt($_HCI01._hcprc.signos.tacto_rectal));
  if (busqueda) {
    datos.tacto_rect.bandera = true;

    switch(parseInt($_HCI01._hcprc.signos.tacto_rectal)) {
      case 1: datos.tacto_rect.tacto_rectal = "SI"; break;
      case 2: datos.tacto_rect.tacto_rectal = "NO"; break;
      case 3: datos.tacto_rect.tacto_rectal = "NO APLICA"; break;
      default: datos.tacto_rect.tacto_rectal = ""; break;
    }
  
    switch(parseInt($_HCI01._hcprc.signos.resul_tacto_rectal)) {
      case 1: datos.tacto_rect.resul = "NO APLICA"; break;
      case 2: datos.tacto_rect.resul = "PROSTATA ANORMAL"; break;
      case 3: datos.tacto_rect.resul = "PROSTATA NORMAL"; break;
      case 4: datos.tacto_rect.resul = "RIESGO NO EVALUADO"; break;
      default: datos.tacto_rect.resul = ""; break;
    }
  
    datos.tacto_rect.nota = $_HCI01._hcprc.signos.nota_tacto_rectal;
  }
}

function imprimirVacunaCovid9012_HCI01() {
  datos.vac_covid19 = {}

  if($_HCI01.dato_9012) {
    if($_HCI01.dato_9012.vacunado_covid19) {
      datos.vac_covid19.bandera = true;

      switch($_HCI01.dato_9012.vacunado_covid19) {
        case "S": datos.vac_covid19.vacunado = "SI"; break;
        case "N": datos.vac_covid19.vacunado = "NO"; break;
        default: datos.vac_covid19.vacunado = ""; break;
      }

      if($_HCI01.dato_9012.vacunado_covid19 == "S") {
        switch(parseInt($_HCI01.dato_9012.etapa_vacuna)) {
          case 1: datos.vac_covid19.etapa = "PRIMERA"; break;
          case 2: datos.vac_covid19.etapa = "SEGUNDA"; break;
          case 3: datos.vac_covid19.etapa = "TERCERA"; break;
          case 4: datos.vac_covid19.etapa = "CUARTA"; break;
          case 5: datos.vac_covid19.etapa = "QUINTA"; break;
          default: datos.vac_covid19.etapa = ""; break;
        }

        switch(parseInt($_HCI01.dato_9012.tipo_vacuna)) {
          case 1: datos.vac_covid19.tipo = "PFIZER"; break;
          case 2: datos.vac_covid19.tipo = "SINOVAC"; break;
          case 3: datos.vac_covid19.tipo = "MODERNA"; break;
          case 4: datos.vac_covid19.tipo = "ASTRAZENECA"; break;
          case 5: datos.vac_covid19.tipo = "JANSSEN"; break;
          default: datos.vac_covid19.tipo = ""; break;
        }

        switch(parseInt($_HCI01.dato_9012.nro_dosis)) {
          case 1: datos.vac_covid19.nro_dosis = "PRIMERA DOSIS"; break;
          case 2: datos.vac_covid19.nro_dosis = "SEGUNDA DOSIS"; break;
          case 3: datos.vac_covid19.nro_dosis = "DOSIS UNICA"; break;
          case 4: datos.vac_covid19.nro_dosis = "DOSIS REFUERZO"; break;
          default: datos.vac_covid19.nro_dosis = ""; break;
        }

        datos.vac_covid19.fecha_vacunacion = _editFecha2($_HCI01.dato_9012.fecha_vacunacion);
      }
    }
  }
}

function imprimirIpa_HCI01() {
  datos.ipa = {};

  if($_HCI01._hcprc.cierre.pacien_cronic.slice(1,2)) {
    datos.ipa.bandera = true;

    switch($_HCI01._hcprc.cierre.pacien_cronic.slice(1,2)) {
      case "S": datos.ipa.fuma = "SI"; break;
      case "N": datos.ipa.fuma = "NO"; break;
      default: datos.ipa.fuma = ""; break;
    }
  
    if($_HCI01._hcprc.cierre.pacien_cronic.slice(1,2) == "S") {
      datos.ipa.nro_cigarrillos_diario = $_HCI01._hcprc.signos.nro_cigarrillos_diario;
      datos.ipa.ipa = $_HCI01._hcprc.signos.ipa;
    }
  }
}

async function imprimirDatosEtv_HCI01() {
  var array1 = ["A90", "A91", "B50", "B51", "B52", "B53", "B54", "B55", "Z260"];

  var x = "";
  var y = [];
  for (i in $_HCI01._hcprc.rips.tabla_diag) {
    x = array1.filter((e) => e == $_HCI01._hcprc.rips.tabla_diag[i].diagn);
    x != undefined ? y.push(true) : y.push(false);
  }

  var z = y.find((e) => e == true);

  if (z != undefined) {
    datos.etv.resultado = $_HCI01._hcprc.cierre.resul_laborat;

    a = $_HCI01._hcprc.cierre.fecha_ini_tto.substring(0, 4);
    m = $_HCI01._hcprc.cierre.fecha_ini_tto.substring(4, 6);
    d = $_HCI01._hcprc.cierre.fecha_ini_tto.substring(6, 8);

    datos.etv.fechaIniTto = "Año: " + a + " Mes: " + m + " Dia: " + d;

    a = $_HCI01._hcprc.cierre.fecha_fin_tto.substring(0, 4);
    m = $_HCI01._hcprc.cierre.fecha_fin_tto.substring(4, 6);
    d = $_HCI01._hcprc.cierre.fecha_fin_tto.substring(6, 8);

    datos.etv.fechaFinTto = "Año: " + a + " Mes: " + m + " Dia: " + d;

    datos.etv.para.cont.push($_HCI01._hcprc.cierre.ctl_mal_3dias);
    datos.etv.para.cont.push($_HCI01._hcprc.cierre.ctl_mal_7dias);
    datos.etv.para.cont.push($_HCI01._hcprc.cierre.ctl_mal_14dias);

    datos.etv.segui.cont.push($_HCI01._hcprc.cierre.ctl_leis_45dias);
    datos.etv.segui.cont.push($_HCI01._hcprc.cierre.ctl_leis_6meses);
  }
}

async function imprimirDatosMentales_HCI01() {
  var x = "";
  var y = [];
  for (i in $_HCI01._hcprc.rips.tabla_diag) {
    $_HCI01._hcprc.rips.tabla_diag[i].diagn.substring(0, 1) == "F" ? y.push(true) : y.push(false);
  }

  var z = y.find((e) => e == true);

  if (z != undefined) {
    datos.trast.bandera = true;
    aux = "";
    switch ($_HCI01._hcprc.trastorno_mental.orientacion_sex_mest) {
      case "1":
        aux = "HETEROSEXUAL";
        break;
      case "2":
        aux = "LESBIANA";
        break;
      case "3":
        aux = "BISEXUAL";
        break;
      case "4":
        aux = "GAY";
        break;
      case "5":
        aux = "TRANSEXUAL";
        break;
      case "6":
        aux = "INTERSEXUAL";
        break;
      case "7":
        aux = "NO APLICA";
        break;
      default:
        aux = "   ";
    }
    datos.trast.orientacion = aux;

    aux = "";
    switch ($_HCI01._hcprc.trastorno_mental.discapacidad_ment) {
      case "1":
        aux = "DISCAPACIDAD FISICA";
        break;
      case "2":
        aux = "DISCAPACIDAD COGNITIVA";
        break;
      case "3":
        aux = "DISCAPACIDAD SENSORIAL";
        break;
      case "4":
        aux = "NINGUNA";
        break;
      case "5":
        aux = "SIN DATO";
        break;
      default:
        aux = "   ";
    }
    datos.trast.discapacidad = aux;

    aux = "";
    switch ($_HCI01._hcprc.trastorno_mental.vulnerabilidad_ment) {
      case "1":
        aux = "HABITALIDAD EN CALLE";
        break;
      case "2":
        aux = "TRABAJO SEXUAL";
        break;
      case "3":
        aux = "ADULTO MAYOR DE 60 ANOS";
        break;
      case "4":
        aux = "CONSUMO DE SPA";
        break;
      case "5":
        aux = "PRIVADO DE LA LIBERTAD";
        break;
      case "6":
        aux = "ENFERMEDAD MENTAL";
        break;
      case "7":
        aux = "ABANDONO SOCIAL";
        break;
      case "8":
        aux = "DESEMPLEO";
        break;
      case "9":
        aux = "DESESCOLARIZACION";
        break;
      case "A":
        aux = "NO APLICA";
        break;
      default:
        aux = "   ";
    }
    datos.trast.vulnerabilidad = aux;

    aux = "";
    switch ($_HCI01._hcprc.trastorno_mental.tipo_evento_ment) {
      case "1":
        aux = "SUSTANCIAS PSICOACTIVAS";
        break;
      case "2":
        aux = "DEPRESION";
        break;
      case "3":
        aux = "ANSIEDAD";
        break;
      case "4":
        aux = "DEPRESION Y ANSIEDAD";
        break;
      case "5":
        aux = "DEPRESION E INTENTO SUICIDIO";
        break;
      case "6":
        aux = "EPILEPSIA";
        break;
      case "7":
        aux = "ESQUIZOFRENIA";
        break;
      case "8":
        aux = "PSICOSIS";
        break;
      case "9":
        aux = "DEMENCIA";
        break;
      case "A":
        aux = "AUTOLESION/SUICIDIO";
        break;
      case "B":
        aux = "NO APLICA";
        break;
      default:
        aux = "   ";
    }
    datos.trast.tipoEvento = aux;

    aux = "";
    switch ($_HCI01._hcprc.trastorno_mental.recaidas_ment) {
      case "1":
        aux = "NO";
        break;
      case "2":
        aux = "SI RECAIDA HASTA 2 VECES";
        break;
      case "3":
        aux = "SI RECAIDA HASTA 3 VECES";
        break;
      case "4":
        aux = "SI RECAIDA MAS DE 3 VECES";
        break;
      case "5":
        aux = "N/A ";
        break;
      default:
        aux = "   ";
    }
    datos.trast.recaidas = aux;

    aux = "";
    switch ($_HCI01._hcprc.trastorno_mental.riesgo_psicos_ment) {
      case "1":
        aux = "PERDIDA RECIENTE";
        break;
      case "2":
        aux = "CONFLICTOS DE PAREJA";
        break;
      case "3":
        aux = "CONFLICTO FLIAR";
        break;
      case "4":
        aux = "PROB. ESCOLARES";
        break;
      case "5":
        aux = "STRESS";
        break;
      case "6":
        aux = "CRISIS ECONOMICA";
        break;
      case "7":
        aux = "ENFERMEDAD CRONICA";
        break;
      case "8":
        aux = "VICTIMA DE MATONEO";
        break;
      case "9":
        aux = "ANTECEDENTE FLIAR DE CONSUMO DE SPA";
        break;
      case "A":
        aux = "ANTECEDENTE FLIAR DE SUICIDIO";
        break;
      case "B":
        aux = "ANTECEDENTE DE MALTRATO O VIOLENCIA";
        break;
      case "C":
        aux = "FALTA DE COMPROMISO FLIAR";
        break;
      case "D":
        aux = "PERTENECIA A PANDILLAS";
        break;
      case "E":
        aux = "NO SE IDENTIFICA";
        break;
      case "F":
        aux = "NINGUNO";
        break;
      default:
        aux = "   ";
    }
    datos.trast.riesgoPsico = aux;

    aux = "";
    switch ($_HCI01._hcprc.trastorno_mental.acciones_reali_ment) {
      case "1":
        aux = "NOTIFICACION A JUSTICIA";
        break;
      case "2":
        aux = "NOTIFICACION A PROTECCION";
        break;
      case "3":
        aux = "CANALIZACION A EDUCACION";
        break;
      case "4":
        aux = "CANALIZACION A DESARROLLO SOCIAL";
        break;
      case "5":
        aux = "REMISION A SALUD";
        break;
      case "6":
        aux = "TODAS";
        break;
      case "7":
        aux = "NO APLICA";
        break;
      default:
        aux = "   ";
    }
    datos.trast.accionesReal = aux;

    aux = "";
    switch ($_HCI01._hcprc.trastorno_mental.medicina_gral_ment) {
      case "S":
        aux = "SI";
        break;
      case "S":
        aux = "NO";
        break;
    }
    datos.trast.medGeneral = aux;

    aux = "";
    switch ($_HCI01._hcprc.trastorno_mental.psicologia_ment) {
      case "S":
        aux = "SI";
        break;
      case "S":
        aux = "NO";
        break;
    }
    datos.trast.psicologia = aux;

    datos.trast.psicoterapiaIndProg = $_HCI01._hcprc.trastorno_mental.psicote_ind_ment;
    datos.trast.psicoterapiaIndEjec = $_HCI01._hcprc.trastorno_mental.psicote_ind_ejec_ment;
    datos.trast.psicoterapiaFamProg = $_HCI01._hcprc.trastorno_mental.psicote_fam_ment;
    datos.trast.psicoterapiaFamEjec = $_HCI01._hcprc.trastorno_mental.psicote_fam_ejec_ment;

    datos.trast.fechaRemisionPsiq = $_HCI01._hcprc.trastorno_mental.fecha_remision_psiqui_ment;
    datos.trast.fechaNotificacion = $_HCI01._hcprc.trastorno_mental.fecha_notifica_oblig;
    datos.trast.fechaNotificacion = $_HCI01._hcprc.trastorno_mental.fecha_notifica_oblig;

    aux = "";
    switch ($_HCI01._hcprc.trastorno_mental.familiar_cuida_ment) {
      case "S":
        aux = "SI";
        break;
      case "S":
        aux = "NO";
        break;
    }
    datos.trast.formaFamiliar = aux;

    aux = "";
    switch ($_HCI01._hcprc.trastorno_mental.tamizajes_ment) {
      case "1":
        aux = "APGAR FAMILIAR";
        break;
      case "2":
        aux = "TEST DE ZUNG";
        break;
      case "3":
        aux = "RQC (NIÑOS)";
        break;
      case "4":
        aux = "SQR(ADULTOS)";
        break;
      case "5":
        aux = "ASSIST";
        break;
      case "6":
        aux = "APGAR Y RQC";
        break;
      case "7":
        aux = "RQC Y ASSIST";
        break;
      case "8":
        aux = "RQC Y SQR";
        break;
      case "9":
        aux = "NINGUNO";
        break;
      default:
        aux = "   ";
    }
    datos.trast.tamizajes = aux;

    aux = "";
    switch ($_HCI01._hcprc.trastorno_mental.manejo_tamizaje_ment) {
      case "1":
        aux = "INTERVENCION BREVE";
        break;
      case "2":
        aux = "ENTREVISTA MOTIVACIONAL";
        break;
      case "3":
        aux = "PRIMEROS AUXILIOS PSICOLOGICOS";
        break;
      case "4":
        aux = "CANALIZACION O REMISION";
        break;
      case "5":
        aux = "ARTICULACION OTRO SECTOR";
        break;
      case "6":
        aux = "NO APLICA";
        break;
      default:
        aux = "   ";
    }
    datos.trast.manejoTam = aux;

    aux = "";
    switch ($_HCI01._hcprc.trastorno_mental.capacitacion_ment) {
      case "1":
        aux = "PYP";
        break;
      case "2":
        aux = "CONSULTA EXTERNA";
        break;
      case "3":
        aux = "URGENCIAS";
        break;
      case "4":
        aux = "TAMIZAJES";
        break;
      case "5":
        aux = "OTRA";
        break;
      case "6":
        aux = "NO APLICA";
        break;
      default:
        aux = "   ";
    }
    datos.trast.captacion = aux;

    aux = "";
    switch ($_HCI01._hcprc.trastorno_mental.consumo_spa_ment) {
      case "1":
        aux = "ALCOHOLICOS ANONIMOS";
        break;
      case "2":
        aux = "NARCOTICOS ANONIMOS";
        break;
      case "3":
        aux = "TODOS";
        break;
      case "4":
        aux = "NINGUNO";
        break;
      case "5":
        aux = "N/A";
        break;
      case "6":
        aux = "OTROS";
        break;
      default:
        aux = "   ";
    }
    datos.trast.consumoCan = aux;

    aux = "";
    switch ($_HCI01._hcprc.trastorno_mental.canaliza_dipos_ment) {
      case "1":
        aux = "ZOE";
        break;
      case "2":
        aux = "ZOU";
        break;
      case "3":
        aux = "CENTRO DE ESCUCHA";
        break;
      case "4":
        aux = "ESTRATEGIA RBC";
        break;
      case "5":
        aux = "ZOL";
        break;
      case "6":
        aux = "CENTRO DE ESCUCHA Y ZOE";
        break;
      case "7":
        aux = "TODAS";
        break;
      case "8":
        aux = "NINGUNO";
        break;
      default:
        aux = "   ";
    }
    datos.trast.canalizaUsua = aux;

    aux = "";
    switch ($_HCI01._hcprc.trastorno_mental.acciones_segui_ment) {
      case "1":
        aux = "CONTROL";
        break;
      case "2":
        aux = "VISITAS";
        break;
      case "3":
        aux = "REMISION";
        break;
      case "4":
        aux = "MONITOREO TELEFONICO";
        break;
      case "5":
        aux = "EDUCACION SEGUN RIESGO";
        break;
      case "6":
        aux = "OTRO";
        break;
      case "7":
        aux = "NO APLICA";
        break;
      default:
        aux = "   ";
    }
    datos.trast.accionesSeg = aux;

    aux = "";
    switch ($_HCI01._hcprc.trastorno_mental.adherencua_trat_ment) {
      case "1":
        aux = "SI";
        break;
      case "2":
        aux = "NO INASISTE A TTO PSICOTERAPEUTICO";
        break;
      case "3":
        aux = "NO RENUENTE A TTO FARMACOLOGICO";
        break;
      case "4":
        aux = "NO SIN RED DE APOYO";
        break;
      case "5":
        aux = "NO INASISTE A TTO PSICOTERAPEUTICO Y FARMACOLO";
        break;
      case "6":
        aux = "NO TODAS LAS ANTERIORES";
        break;
      case "7":
        aux = "NO APLICA";
        break;
      default:
        aux = "   ";
    }
    datos.trast.adherencia = aux;

    aux = "";
    switch ($_HCI01._hcprc.trastorno_mental.segui_contea_ment) {
      case "1":
        aux = "SI";
        break;
      case "2":
        aux = "NO DESCONOCE CONTRARREFERENCIA";
        break;
      case "3":
        aux = "NO SIGUE EN CONTROL";
        break;
      case "4":
        aux = "N/A";
        break;
      default:
        aux = "   ";
    }
    datos.trast.segContraref = aux;

    datos.trast.fechaCierre = $_HCI01._hcprc.trastorno_mental.fecha_cierre_caso;

    aux = "";
    switch ($_HCI01._hcprc.trastorno_mental.evaluacion_mhgap) {
      case "1":
        aux = "NO";
        break;
      case "2":
        aux = "INTERVENCION FARMACOLOGICA";
        break;
      case "3":
        aux = "INTERVENCION PSICOSOCIAL";
        break;
      case "4":
        aux = "INTERVENCION FARMACOLOGICA Y PSICOSOCIAL";
        break;
      case "4":
        aux = "NINGUNA";
        break;
      default:
        aux = "   ";
    }
    datos.trast.evaluacion = aux;

    aux = "";
    switch ($_HCI01._hcprc.trastorno_mental.pronostico_tera_ment) {
      case "1":
        aux = "BUEN PRONOSTICO (SEGUIMIENTO TRIME. Y/O SEMEST. Y/O ANUAL)";
        break;
      case "2":
        aux = "MEJORA ACEPTABLE (REQUIERE REHABILITACION EN SALUD MENTAL)";
        break;
      case "3":
        aux = "MAL PRONOSTICO - ABANDONO DE TRATAMIENTO";
        break;
      case "4":
        aux = "SIN MEJORA";
        break;
      case "4":
        aux = "CON RECAIDAS";
        break;
      case "4":
        aux = "BUEN PRONOSTICO - CIERRE DE CASO";
        break;
      case "4":
        aux = "NO APLICA";
        break;
      default:
        aux = "   ";
    }
    datos.trast.pronostico = aux;

    datos.trast.pronostico = $_HCI01._hcprc.trastorno_mental.observaciones_ment;
  }
}

async function imprimirDatosMultidrogoresis_HCI01() {
  var x = "";
  var y = [];
  for (i in $_HCI01._hcprc.rips.tabla_diag) {
    x = ["A150", "A159"].find((e) => e == $_HCI01._hcprc.rips.tabla_diag[i].diagn);
    x != undefined ? y.push(true) : y.push(false);
  }

  var z = y.find((e) => e == true);

  if (z != undefined) {
    aux = "";
    switch ($_HCI01._hcprc.multidrogoresistente.multidrogoresis) {
      case "S":
        aux = "SI";
        break;
      case "N":
        aux = "NO";
        break;
      default:
        aux = "  ";
        break;
    }
    datos.multidrog.multidrogoresistente = aux;

    datos.multidrog.cualMto = $_HCI01._hcprc.multidrogoresistente.cual_multidrogoresis;
  }
}

async function llamarImpresionHCI01_HCI01() {
  inicializarFormatoBase_impHc();
  await _imprimirHCI01(datos).then(console.log("termina"));

  await llenarEgreso_HCI01();

  if ($_HCI01.opciones.opc_resu != "S") {
    await _impresion2({
      tipo: "pdf",
      archivo: `${localStorage.Usuario + moment().format("-YYMMDD-HHmmssS-01")}.pdf`,
      content: formatoBaseImp_Hc,
    })
      .then((el) => {})
      .catch((err) => {
        console.error(err);
      });
  }

  await llamarHCI5414A_HCI01();
  await llamarRiesgoi_HCI01();
  // await llamarBarthel_HCI01();
  await llamarFindri_HCI01();
  // await llamarKarnof_HCI01();
  // await llamarDepende_HCI01();
  await llamarDiscap_HCI01();
  await llamarMinimental_HCI01();
  // await llamarHerida_HCI01();
  // await llamarAcoCovid_HCI01();
}

async function llamarMinimental_HCI01() {
  if($_HCI01._hcprc.serv == 8 && $_HCI01._hcprc.rips.finalidad == 07) {
    const { imprimir_HCI9013 } = require("../../frameworks/pdf/hiclin/MNSE-I.formato");
  
    imprimir_HCI9013({
      opciones: $_HCI01.opciones,
      hcprc: $_HCI01._hcprc,
      detalles: $_HCI01._detalles,
      paci: $_HCI01._paci
    })
  }
}

async function llenarEgreso_HCI01() {
  return new Promise((resolve) => {
    if ($_HCI01.opciones.opc_resu == "N" && $_HCI01._hcprc.cierre.estado == 2) {
      iniciar_HCI01C({
        hcprc: $_HCI01._hcprc,
        callback: resolve,
      });
    } else {
      resolve();
    }
  });
}

async function llamarAcoCovid_HCI01() {
  if ($_HCI01.dato_9009 != undefined) {
    if ($_HCI01._hcprc.covid19.consenti_acomp_covid19 == "S") {
      await _iniciarAcoCovid($_HCI01.varEnvio, $_HCI01.opciones);
    }
  }
}

async function llamarHerida_HCI01() {
  if ($_HCI01.dato_9009 != undefined) {
    if (
      $_HCI01._hcprc.serv == "09" &&
      $_HCI01.dato_9009.clasif_heri_9009.trim() != "" &&
      parseFloat($_HCI01.dato_9009.clasif_heri_9009) != 0
    ) {
      await _iniciarHerida($_HCI01.varEnvio, $_HCI01.opciones);
    }
  }
}

async function llamarDiscap_HCI01() {
  if (
    $_HCI01._hcprc.rips.discapacidades.fisica.trim() ||
    $_HCI01._hcprc.rips.discapacidades.mental.trim() ||
    $_HCI01._hcprc.rips.discapacidades.cognitiva.trim() ||
    $_HCI01._hcprc.rips.discapacidades.auditiva.trim() ||
    $_HCI01._hcprc.rips.discapacidades.visual.trim()
  ) {
    const { imprimir_DISCAP } = require("../../frameworks/pdf/hiclin/Discapacidad.formato.js");

    imprimir_DISCAP({
      opciones: $_HCI01.opciones,
      hcprc: $_HCI01.hcprc_new,
      detalles: $_HCI01._detalles,
      paci: $_HCI01._paci
    });
  }
}

async function llamarDepende_HCI01() {
  if ($_HCI01.dato_9005 != undefined) {
    if ($_HCI01.dato_9005.nivel_secuelas_9005.trim() != "" && $_HCI01.dato_9005.depen_funcional_9005.trim() != "") {
      await _iniciarDepende($_HCI01.varEnvio, $_HCI01.opciones);
    }
  }
}

async function llamarKarnof_HCI01() {
  if ($_HCI01.dato_9006 != undefined) {
    if ($_HCI01.dato_9006.valoracion_9006.trim() != "") {
      await _iniciarKarnof($_HCI01.varEnvio, $_HCI01.opciones);
    }
  }
}

async function llamarHCI5414A_HCI01() {
  if ($_HCI01._hcprc.rips.causa == "02") {
    await _iniciarHCI5414A($_HCI01.varEnvio, $_HCI01.opciones);
  }
}

async function llamarRiesgoi_HCI01() {
  if ($_HCI01.dato_4040) {
    if ($_HCI01.dato_4040.riesgo_biopsicosocial_esq_w.infertilidad_aborto_esq_w.trim() != "") {
      const { imprimir_RIESGOI } = require("../../frameworks/pdf/hiclin/Riesgoi.formato.js");

      imprimir_RIESGOI({
        opciones: $_HCI01.opciones,
        hcprc: $_HCI01.hcprc_new,
        detalles: $_HCI01._detalles,
        paci: $_HCI01._paci
      });
    }
  }
}

async function llamarBarthel_HCI01() {
  if ($_HCI01.dato_9005 != undefined) {
    if ($_HCI01.dato_9005.valoracion_9005.trim() != "") {
      await _iniciarBarthel($_HCI01.varEnvio, $_HCI01.opciones);
    }
  }
}

async function llamarFindri_HCI01() {
  if ($_HCI01.dato_9008 != undefined) {
    if (
      ($_HCI01._hcprc.serv == "02" || $_HCI01._hcprc.serv == "08") &&
      $_HCI01.dato_9008.activ_fisica
    ) {
      const { imprimir_FINDRISK } = require("../../frameworks/pdf/hiclin/Findrisk.formato.js");

      imprimir_FINDRISK({
        opciones: $_HCI01.opciones,
        hcprc: $_HCI01.hcprc_new,
        detalles: $_HCI01._detalles,
        paci: $_HCI01._paci
      });

      // await _iniciarFindri($_HCI01.varEnvio, $_HCI01.opciones);
    }
  }
}

async function inicializarDatos_HCI01() {
  datos = {
    encabezado: {
      nombre: "",
      nit: "",
      titulo: "",
      fecha: "",
    },

    _hcprc: $_HCI01._hcprc,

    paciente: {
      nombre: "",
      tipoId: "",
      id: "",
      fechaIng: "",
      fechaEgr: "",
      edad: "",
      nacim: "",
      sexo: "",
      ciudad: "",
      telefono: "",
      acomp: "",
      entidad: "",
      folio: "",
      triage: "",
      hab: "",
      fact: "",
      unServ: "",
      foto: "",
    },

    dengueCuadro: {
      bandera: null,
      queHacer:
        "1. Reposo \n 2. Liquidos orales abundantes (entre 2 y 5 Onzas mas de usual según edad), que incluyan jugos de frutas que no sean rojas o ácidos, suero oral, lactancia materna y la dieta usual si el paciente la tolera. \n  3. Acetaminofén según orden médica. \n 4. Medios fisicos: Baños de agua tibia. \n 5. Usar toldillo. \n 6. Asistir a los controles especialmente el dia que desaparece la fiebre. \n 7. Consultar de inmediato si aparecen signos de alarma",
      queNoHacer:
        "1. No suministrar agua sola. \n 2. No inyecciones para la fiebre. \n 3. No tomar medicamentos para la fiebre sin formula médica. \n 4. Nunca aspirina. \n 5. No baños con alcohol u otras sustancias toxicas. \n 6. No dejar un niño al cuidado de otro niño.",
      signos:
        "1. Dolor abdominal espontáneo o a la palpación. \n 2. Vómitos frecuentes. \n 3. Manos o pies pálidos, frios o húmedos. \n 4. Dificultad para respirar. \n 5. Mareos. \n 6. Cambios en el estado de ánimo (somnolencia/irritabilidad). \n 7. Sangrados: petequias, epistaxis, gingivorragia, hematemesis, melena, metrorragia. \n 8. Verificar diuresis por lo menos 1 vez cada 6 horas. \n 9. Riesgo social: vive solo o vive lejos de donde puede recibir atención médica, dificultades en el transporte, pobreza extrema. \n 10. Tener 1 año o menos.",
    },

    datosAnalisis: {
      bandera: null,
      diagnostico: [],
      analisis: "",
      tipoDiag: "",
      cierre: "",
    },

    rips: {
      titulos: [],
      contenido: [],
    },

    subs: {
      titulos: [],
      contenido: [],
    },

    lineas: {
      titulos: [],
      contenido: [],
    },

    examFisico: {
      bandera: null,
      cont: [],
      obesidad: "",
      imc: "",
      riesgoCardio: "",
      imcEg: "",
    },

    examVisual: {
      bandera: null,
      tit: [],
      dato1: [],
      dato2: [],
      dato3: [],
      dato4: [],
    },

    examVisual2: {
      bandera: null,
      principal: "",
      tit: [],
      cont: [],
    },

    agud: null,

    agudeza: {
      izqSinAlt: null,
      izqConAlt: null,
      derSinAlt: null,
      derConAlt: null,
      nivel1: "",
      nivel2: "",
      nivel3: "",
      nivel4: "",
      fecha: "",
    },

    preguntas1: [],

    genograma: {
      bandera: null,
      pad: "",
      mad: "",
      her: [],
    },

    gineco: {
      bandera: null,
      g1: [],
      g2: [],
      titLin: [],
      contLin: [],
    },

    telesalud: {
      bandera: null,
      acepta: "",
      banderaTabla1: null,
      banderaTabla2: null,
      banderaTabla3: null,
      banderaTabla4: null,
      banderaTabla5: null,

      fechaAsePre: "",
      fechaAsePos: "",
      fechaEcoObs: "",
      fechaVacInfl: "",
      fechaVacTDAP: "",
      fechaVacTT: "",

      vih: [],
      serologia: [],
      hemoglobina: [],
      igg: [],
      curva: [],
      hemograma: [],
      hemoparasito: [],
      fta: [],
      uroanalisis: [],
      urocultivo: [],
      frotis: [],
      glicemia: [],
      hepatitis: [],

      fechaGine: "",
      fechaNutri: "",
      fechaOdont: "",
      fechaPsico: "",
    },

    obst: {
      bandera: null,
      banderaFlujo: null,
      cont: [],
      titLin: [],
      contLin: [],
      cont2: [
        {
          flujo: "",
          ir: "",
          ip: "",
          sd: "",
        },
        {
          flujo: "",
          ir: "",
          ip: "",
          sd: "",
        },
      ],
      observTit: "",
      observ: "",
    },

    observExamFisico: "",

    otorrino: {
      bandera: null,
      titulos: [],
      contenido: [],
    },

    observ7502: "",

    acompa: {
      bandera: null,
      tipoId: "",
      id: "",
      nombre: "",
      espec: "",
      fechaEspec: "",
      texto: "",
    },

    salida: {
      bandera: null,
      estado: "",
      remitido: "",
    },

    recomDengue: {
      bandera: null,
    },

    downton: {
      bandera: "",
      cont: {
        caidas: "",
        medicamentos: "",
        alteraciones: "",
        mental: "",
        deambulacion: "",
      },
    },

    braden: {
      bandera: "",
      cont: {
        percepcion: "",
        humedad: "",
        actividad: "",
        movilidad: "",
        nutricion: "",
        roce: "",
      },
    },

    covid: {
      recomendaciones: {
        bandera: null,
      },

      riesgos: {
        bandera: null,
        transito: "",
        contDiag: "",
        contEstr: "",
        fiebre: "",
        tos: "",
        disnea: "",
        general: "",
        rinorrea: "",
        odinofagia: "",
        pre1: "",
        pre2: "",
        pre3: "",
        pre4: "",
        pre5: "",
        pre6: "",
      },

      prevencion: {
        bandera: null,
      },
    },

    medico: {
      firma: "",
      reg: "",
      nombre: "",
      espec: "",
    },

    violencia: {
      bandera: null,
      orientacion: "",
      discapacidad: "",
      vulnerabilidad: "",
      riesgoPsicosocial: "",
      accionesReal: "",
      tipoViolencia: "",
      penetracionAnal: "",
      violenciaSex: "",
      fechaPsiquiatria: "",
      fechaAtencionMed: "",
      trabajoSocial: "",
      fechaAtencionPsico: "",
      psicoterapiaIndProg: "",
      psicoterapiaIndEjec: "",
      psicoterapiaFamProg: "",
      psicoterapiaFamEjec: "",
      fechaNotificacion: "",
      manejoSalud: "",
      anticoncepcion: "",
      tipoMetodo: "",
      asesoria: "",
      acciones: "",
      actRutaProt: "",
      actRutaJust: "",

      seguimiento: {
        fechaSem2: "",
        fechaSem4: "",
        fecha3Mes: "",
        fecha6Mes: "",
        fecha1Año: "",
      },

      seguiMenor: "",
      seguiMujer: "",
      fechaCierre: "",
      captacion: "",
      observaciones: "",
    },

    sifilis: {
      bandera: null,
      trata: {
        fecha: [],
        medic: [],
        dosis: [],
        prof: [],
      },

      sero: {
        tit: ["3 NESES", "6 NESES", "9 NESES", "12 NESES"],
        tipo: [],
        fecha: [],
        resul: [],
      },

      necesitoRet: "",
      fechaRet: "",
      medicamento: "",
      dosis: "",
      profesional: "",
      cuantosDias: "",
      dxContactos: "",
      ttoContactos: "",
      remitio: "",
    },

    etv: {
      bandera: null,
      resultado: "",
      fechaIniTto: "",
      fechaFinTto: "",

      para: {
        tit: ["3 Dias", "7 Dias", "14 Dias"],
        cont: [],
      },

      segui: {
        tit: ["45 Dias", "6 Meses"],
        cont: [],
      },
    },

    anomalias: {
      bandera: null,
      descrip: "",
      segui: "",
      labora: "",
      fecha1: "",
      fecha2: "",
      fecha3: "",
      fecha4: "",
    },

    trast: {
      bandera: null,
      orientacion: "",
      discapacidad: "",
      vulnerabilidad: "",
      tipoEvento: "",
      recaidas: "",
      riesgoPsico: "",
      accionesReal: "",
      medGeneral: "",
      psicologia: "",
      psicoterapiaIndProg: "",
      psicoterapiaIndEjec: "",
      psicoterapiaFamProg: "",
      psicoterapiaFamEjec: "",
      fechaRemisionPsiq: "",
      fechaNotificacion: "",
      formaFamiliar: "",
      tamizajes: "",
      manejoTam: "",
      captacion: "",
      consumoCan: "",
      canalizaUsua: "",
      accionesSeg: "",
      adherencia: "",
      segContraref: "",
      fechaCierre: "",
      evaluacion: "",
      pronostico: "",
      observaciones: "",
    },

    multidrog: {
      bandera: null,
      multidrogoresistente: "",
      cualMto: "",
    },
  };
}
