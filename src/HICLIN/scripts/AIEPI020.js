// IMPRESION AIEPI002 - 0 A 2 MESES - DAVID.M  02/01/2021
$_AIEPI020 = [];
$_AIEPI020.NIT_USU = $_USUA_GLOBAL[0].NIT;
$_AIEPI020.dataBase64 = [];
var datos_AIE020 = {};
var $_reg_hc = {};

async function iniciar_AIEPI020(opciones, arrayDatos) {
  $_AIEPI020._hcprc = arrayDatos._hcpac;
  $_AIEPI020._ciudades = arrayDatos._ciudades;
  $_AIEPI020._paisesRips = arrayDatos._paisesRips;
  $_AIEPI020._detalles = arrayDatos._detalles;
  $_reg_hc = arrayDatos.$_reg_hc;
  $_AIEPI020._paci = arrayDatos.$_reg_paci;

  $_AIEPI020.tipo_epicrisis_lnk = arrayDatos.tipo_epic;

  $_AIEPI020.opciones = opciones;
  $_AIEPI020.opciones.opc_aper == "S" ? ($_AIEPI020.SW_PAG = 1) : ($_AIEPI020.SW_PAG = 0);

  await validarHC_AIEPI020();

  if ($_AIEPI020.salirFlag) {
    salir_AIEPI020();
    return null;
  } else {
    await inicializardatos_AIEPI020();
    await crearJsonEnvio_AIEPI020();

    $_AIEPI020.RECOM_W = "";
    $_AIEPI020.RECOM_DENGUE_W = "";
    await procesos_AIEPI020();

    return $_AIEPI020.dataBase64;
  }
}

function salir_AIEPI020() {
  console.log("LLEGA A SALIR AIEPI");
}

async function validarHC_AIEPI020() {
  if ($_AIEPI020._hcprc.novedad == "7") {
    $_AIEPI020.salirFlag = true;
  } else {
    $_AIEPI020.salirFlag = false;
    await leerDetalles_AIEPI020();
  }
}

async function leerDetalles_AIEPI020() {
  // leer variables aiepi
  $_AIEPI020.dato_9501 = await $_AIEPI020._detalles.find(
    (e) => e["COD-DETHC"] == "9501" && e["LLAVE-HC"] == $_AIEPI020._hcprc.llave
  );
  $_AIEPI020.dato_9501 != undefined ? ($_AIEPI020.dato_9501 = $_AIEPI020.dato_9501.DETALLE) : false;

  // leer enfermedad general
  $_AIEPI020.enf_act_hc = await $_AIEPI020._detalles.find(
    (e) => e["COD-DETHC"] == "1001" && e["LLAVE-HC"] == $_AIEPI020._hcprc.llave
  );
  if ($_AIEPI020.enf_act_hc != undefined) {
    $_AIEPI020.enf_act_hc = $_AIEPI020.enf_act_hc.DETALLE;
    $_AIEPI020.enf_act_hc = $_AIEPI020.enf_act_hc.replace(/\&/g, "\n").trim();
  }

  // leer tratamiento
  $_AIEPI020.dato_9503 = await $_AIEPI020._detalles.find(
    (e) => e["COD-DETHC"] == "9503" && e["LLAVE-HC"] == $_AIEPI020._hcprc.llave
  );
  if ($_AIEPI020.dato_9503) {
    $_AIEPI020.dato_9503 = $_AIEPI020.dato_9503.DETALLE.replace(/\&/g, "\n").trim();
    $_AIEPI020.dato_9503 = $_AIEPI020.dato_9503.replace(/\�/g, "Ñ").trim();
    $_AIEPI020.dato_9503 = $_AIEPI020.dato_9503.replace(/\s+/g, " ").trim();
  }

  // leer antecedentes familiares
  $_AIEPI020.famil_hc = await $_AIEPI020._detalles.find(
    (e) => e["COD-DETHC"] == "2002" && e["LLAVE-HC"] == $_AIEPI020._hcprc.llave
  );

  if ($_AIEPI020.famil_hc) {
    $_AIEPI020.famil_hc = $_AIEPI020.famil_hc.DETALLE;
    if ($_AIEPI020._hcprc.serv != "08") $_AIEPI020.famil_hc = $_AIEPI020.famil_hc.replace(/\&/g, "\n").trim();
  }

  // leer examen general
  $_AIEPI020.exa_general_hc = await $_AIEPI020._detalles.find(
    (e) => e["COD-DETHC"] == "4005" && e["LLAVE-HC"] == $_AIEPI020._hcprc.llave
  );
  $_AIEPI020.exa_general_hc != undefined
    ? ($_AIEPI020.exa_general_hc = $_AIEPI020.exa_general_hc.DETALLE.replace(/\&/g, "\n").trim())
    : false;

  // leer test barthel
  $_AIEPI020.dato_9005 = await $_AIEPI020._detalles.find(
    (e) => e["COD-DETHC"] == "9005" && e["LLAVE-HC"] == $_AIEPI020._hcprc.llave
  );
  $_AIEPI020.dato_9005 != undefined ? ($_AIEPI020.dato_9005 = $_AIEPI020.dato_9005.DETALLE) : false;

  // leer test karnofsky
  $_AIEPI020.dato_9006 = await $_AIEPI020._detalles.find(
    (e) => e["COD-DETHC"] == "9006" && e["LLAVE-HC"] == $_AIEPI020._hcprc.llave
  );
  $_AIEPI020.dato_9006 != undefined ? ($_AIEPI020.dato_9006 = $_AIEPI020.dato_9006.DETALLE) : false;
}

async function procesos_AIEPI020() {
  $_AIEPI020.opciones.opc_resu == "N" && $_AIEPI020.SW_PAG == 0 ? salir_AIEPI020() : false;

  $_AIEPI020.RECOM_W = "N";
  // CON851P('27', () => { $_AIEPI020.RECOM_W = 'N'; procesos2_AIEPI020() }, () => {console.log('CALLBACK CON851P'); $_AIEPI020.RECOM_W = 'S'; procesos2_AIEPI020() });

  await procesos2_AIEPI020();
}

async function procesos2_AIEPI020() {
  datos_AIE020.RECOM_W = $_AIEPI020.RECOM_W;

  $_AIEPI020.RECOM_DENGUE_W.trim() == "" ? ($_AIEPI020.RECOM_DENGUE_W = "N") : false;

  var b1 = [
    "A90X",
    "A91X",
    "R500",
    "R501",
    "R51X",
    "M791",
    "J00X",
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
  ].find((e) => e == $_AIEPI020._hcprc.rips.tabla_diag[0].diagn);
  var b2 = [
    "A90X",
    "A91X",
    "R500",
    "R501",
    "R51X",
    "M791",
    "J00X",
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
  ].find((e) => e == $_AIEPI020._hcprc.rips.tabla_diag[1].diagn);
  var b3 = [
    "A90X",
    "A91X",
    "R500",
    "R501",
    "R51X",
    "M791",
    "J00X",
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
  ].find((e) => e == $_AIEPI020._hcprc.rips.tabla_diag[2].diagn);
  var b4 = [
    "A90X",
    "A91X",
    "R500",
    "R501",
    "R51X",
    "M791",
    "J00X",
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
  ].find((e) => e == $_AIEPI020._hcprc.rips.tabla_diag[3].diagn);
  var b5 = [
    "A90X",
    "A91X",
    "R500",
    "R501",
    "R51X",
    "M791",
    "J00X",
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
  ].find((e) => e == $_AIEPI020._hcprc.rips.tabla_diag[4].diagn);

  b1 || b2 || b3 || b4 || b5 ? ($_AIEPI020.RECOM_DENGUE_W = "S") : false;

  await abrirArchivos_AIEPI020();

  if ($_AIEPI020.RECOM_DENGUE_W == "S") {
    if ($_AIEPI020.NIT_USU == 892000458) {
      datos_AIE020.mostrarCuadroDengue = true;
    } else {
      datos_AIE020.mostrarRecomDengue = true;
    }
  }

  if ($_AIEPI020._hcprc.covid19.recomendacion_covid19 == "S") {
    datos_AIE020.covid.recomendaciones.bandera = true;
  }

  if ($_AIEPI020.dato_9501) {
    await llenarEncabezado_AIEPI020();
  }

  await llamarHCI5414A_AIEPI020();
  await llamarBarthel_AIEPI020();
  await llamarKarnof_AIEPI020();
  await llamarKarnof_AIEPI020();
  await llamarAcoCovid_AIEPI020();
}

function llenarEgreso_AIEPI020() {
  const { iniciar_HCI01C } = require("../../HICLIN/scripts/HCI01C");

  return new Promise((resolve) => {
    iniciar_HCI01C({
      hcprc: $_AIEPI020._hcprc,
      callback: resolve,
    });
  });
}

async function abrirArchivos_AIEPI020() {
  if ($_AIEPI020._hcprc.cierre.nit_fact == 0) {
    datos_AIE020.paciente.entidad = $_AIEPI020._paci["NOMBRE-EPS"];
  } else {
    datos_AIE020.paciente.entidad = $_AIEPI020._hcprc.cierre.descrip_nit_fact;
  }
}

async function llenarEncabezado_AIEPI020() {
  switch (parseInt($_AIEPI020.tipo_epicrisis_lnk)) {
    case 1:
      datos_AIE020.titulo2 = "EPICRISIS";
      break;
    case 2:
      datos_AIE020.titulo2 = "REMISION";
      break;
    case 3:
      datos_AIE020.titulo2 = "CONTRAREFERENCIA";
      break;
    default:
      datos_AIE020.titulo2 = " ";
      break;
  }

  datos_AIE020.signo_peligro = $_AIEPI020.dato_9501.signo_peligro;
  datos_AIE020.signo_fiebr = $_AIEPI020.dato_9501.signo_fiebr;
  datos_AIE020.signo_oido = $_AIEPI020.dato_9501.signo_oido;
  datos_AIE020.signo_diare = $_AIEPI020.dato_9501.signo_diare;
  datos_AIE020.signo_desarr = $_AIEPI020.dato_9501.signo_desarr;
  datos_AIE020.signo_desnut = $_AIEPI020.dato_9501.signo_desnut;
  datos_AIE020.signo_tos = $_AIEPI020.dato_9501.signo_tos;
  datos_AIE020.var_diarr = $_AIEPI020.dato_9501.var_diarr;
  datos_AIE020.signo_alimentacion = $_AIEPI020.dato_9501.signo_alimentacion;
  datos_AIE020.sig_vacunacion = $_AIEPI020.dato_9501.sig_vacunacion;

  datos_AIE020.paciente.hc = $_AIEPI020._hcprc.llave.substring(0, 15) + "-" + $_AIEPI020._hcprc.llave.substring(15, 23);
  datos_AIE020.paciente.fecha = _editFecha3($_AIEPI020._hcprc.fecha);
  datos_AIE020.paciente.hora = _editHora($_AIEPI020._hcprc.hora);
  datos_AIE020.paciente.unserv = $_AIEPI020._hcprc.cierre.descrip_unserv;
  datos_AIE020.paciente.institucion = $_USUA_GLOBAL[0].NOMBRE;
  datos_AIE020.paciente.municipio = $_AIEPI020._paci["DESCRIP-CIUDAD"];
  datos_AIE020.paciente.consulta = " ";
  datos_AIE020.paciente.control = " ";
  datos_AIE020.paciente.nombre = $_AIEPI020._paci.DESCRIP.replace(/\s+/g, " ");
  datos_AIE020.paciente.edad = $_AIEPI020._hcprc.edad;
  datos_AIE020.paciente.edad =
    $_AIEPI020._hcprc.edad > 0
      ? $_AIEPI020._hcprc.edad
      : $_reg_hc.edad_hc.unid_edad + cerosIzq($_reg_hc.edad_hc.vlr_edad, 3);

  datos_AIE020.paciente.nacim = $_AIEPI020._paci.NACIM.substring(0, 4) == 0 ? " " : _editFecha2($_AIEPI020._paci.NACIM);

  datos_AIE020.paciente.sexo = $_AIEPI020._paci.SEXO == "M" ? "Masculino" : "Femenino";
  datos_AIE020.paciente.parentesco = $_AIEPI020._hcprc.parent_acompa.replace(/\s+/g, " ");
  datos_AIE020.paciente.direccion = $_AIEPI020._paci.DIRECC.replace(/\s+/g, " ");
  datos_AIE020.paciente.telefono = $_AIEPI020._paci.TELEFONO.trim();
  datos_AIE020.paciente.acompa = $_AIEPI020._hcprc.acompa.replace(/\s+/g, " ");

  // motivo
  datos_AIE020.motivo = $_AIEPI020._hcprc.motivo;
  // examen fisico
  $_AIEPI020.exa_general_hc
    ? (datos_AIE020.signo_desnut.exa_general_hc = $_AIEPI020.exa_general_hc.trim())
    : (datos_AIE020.signo_desnut.exa_general_hc = "");
  // enfermedad actual
  $_AIEPI020.enf_act_hc ? (datos_AIE020.enfActual = $_AIEPI020.enf_act_hc.trim()) : (datos_AIE020.enfActual = "");

  if ($_AIEPI020.famil_hc) {
    if ($_AIEPI020.famil_hc.embarazo_deseado) {
      datos_AIE020.antec_perinatal = $_AIEPI020.famil_hc;

      switch (datos_AIE020.antec_perinatal.embarazo_deseado) {
        case "S":
          datos_AIE020.antec_perinatal.embarazo_deseado = "SI";
          break;
        case "N":
          datos_AIE020.antec_perinatal.embarazo_deseado = "NO";
          break;
        case "I":
          datos_AIE020.antec_perinatal.embarazo_deseado = "IGNORA";
          break;
        default:
          datos_AIE020.antec_perinatal.embarazo_deseado = "  ";
          break;
      }

      switch (datos_AIE020.antec_perinatal.atencion_perinatal) {
        case "S":
          datos_AIE020.antec_perinatal.atencion_perinatal = "SI";
          break;
        case "N":
          datos_AIE020.antec_perinatal.atencion_perinatal = "NO";
          break;
        case "I":
          datos_AIE020.antec_perinatal.atencion_perinatal = "IGNORA";
          break;
        default:
          datos_AIE020.antec_perinatal.atencion_perinatal = "  ";
          break;
      }

      switch (datos_AIE020.antec_perinatal.reanimacion) {
        case "S":
          datos_AIE020.antec_perinatal.reanimacion = "SI";
          break;
        case "N":
          datos_AIE020.antec_perinatal.reanimacion = "NO";
          break;
        case "I":
          datos_AIE020.antec_perinatal.reanimacion = "IGNORA";
          break;
        default:
          datos_AIE020.antec_perinatal.reanimacion = "  ";
          break;
      }

      switch (datos_AIE020.antec_perinatal.sano) {
        case "S":
          datos_AIE020.antec_perinatal.sano = "SI";
          break;
        case "N":
          datos_AIE020.antec_perinatal.sano = "NO";
          break;
        case "I":
          datos_AIE020.antec_perinatal.sano = "IGNORA";
          break;
        default:
          datos_AIE020.antec_perinatal.sano = "  ";
          break;
      }

      switch (datos_AIE020.antec_perinatal.hemorragias) {
        case "S":
          datos_AIE020.antec_perinatal.hemorragias = "SI";
          break;
        case "N":
          datos_AIE020.antec_perinatal.hemorragias = "NO";
          break;
        case "I":
          datos_AIE020.antec_perinatal.hemorragias = "IGNORA";
          break;
        default:
          datos_AIE020.antec_perinatal.hemorragias = "  ";
          break;
      }

      switch (datos_AIE020.antec_perinatal.infecciones) {
        case "S":
          datos_AIE020.antec_perinatal.infecciones = "SI";
          break;
        case "N":
          datos_AIE020.antec_perinatal.infecciones = "NO";
          break;
        case "I":
          datos_AIE020.antec_perinatal.infecciones = "IGNORA";
          break;
        default:
          datos_AIE020.antec_perinatal.infecciones = "  ";
          break;
      }

      switch (datos_AIE020.antec_perinatal.deforma_cong) {
        case "S":
          datos_AIE020.antec_perinatal.deforma_cong = "SI";
          break;
        case "N":
          datos_AIE020.antec_perinatal.deforma_cong = "NO";
          break;
        case "I":
          datos_AIE020.antec_perinatal.deforma_cong = "IGNORA";
          break;
        default:
          datos_AIE020.antec_perinatal.deforma_cong = "  ";
          break;
      }

      switch (datos_AIE020.antec_perinatal.hipoglicemia) {
        case "S":
          datos_AIE020.antec_perinatal.hipoglicemia = "SI";
          break;
        case "N":
          datos_AIE020.antec_perinatal.hipoglicemia = "NO";
          break;
        case "I":
          datos_AIE020.antec_perinatal.hipoglicemia = "IGNORA";
          break;
        default:
          datos_AIE020.antec_perinatal.hipoglicemia = "  ";
          break;
      }

      switch (datos_AIE020.antec_perinatal.apnea) {
        case "S":
          datos_AIE020.antec_perinatal.apnea = "SI";
          break;
        case "N":
          datos_AIE020.antec_perinatal.apnea = "NO";
          break;
        case "I":
          datos_AIE020.antec_perinatal.apnea = "IGNORA";
          break;
        default:
          datos_AIE020.antec_perinatal.apnea = "  ";
          break;
      }

      switch (datos_AIE020.antec_perinatal.ictericia) {
        case "S":
          datos_AIE020.antec_perinatal.ictericia = "SI";
          break;
        case "N":
          datos_AIE020.antec_perinatal.ictericia = "NO";
          break;
        case "I":
          datos_AIE020.antec_perinatal.ictericia = "IGNORA";
          break;
        default:
          datos_AIE020.antec_perinatal.ictericia = "  ";
          break;
      }

      switch (datos_AIE020.antec_perinatal.broncoasp) {
        case "S":
          datos_AIE020.antec_perinatal.broncoasp = "SI";
          break;
        case "N":
          datos_AIE020.antec_perinatal.broncoasp = "NO";
          break;
        case "I":
          datos_AIE020.antec_perinatal.broncoasp = "IGNORA";
          break;
        default:
          datos_AIE020.antec_perinatal.broncoasp = "  ";
          break;
      }

      switch (datos_AIE020.antec_perinatal.neurologia) {
        case "S":
          datos_AIE020.antec_perinatal.neurologia = "SI";
          break;
        case "N":
          datos_AIE020.antec_perinatal.neurologia = "NO";
          break;
        case "I":
          datos_AIE020.antec_perinatal.neurologia = "IGNORA";
          break;
        default:
          datos_AIE020.antec_perinatal.neurologia = "  ";
          break;
      }

      switch (datos_AIE020.antec_perinatal.memb_hialina) {
        case "S":
          datos_AIE020.antec_perinatal.memb_hialina = "SI";
          break;
        case "N":
          datos_AIE020.antec_perinatal.memb_hialina = "NO";
          break;
        case "I":
          datos_AIE020.antec_perinatal.memb_hialina = "IGNORA";
          break;
        default:
          datos_AIE020.antec_perinatal.memb_hialina = "  ";
          break;
      }
    }

    datos_AIE020.antecPatologicos = $_AIEPI020.famil_hc;
  }

  datos_AIE020.pesoNacer = $_AIEPI020._hcprc.signos.peso_nacer;
  datos_AIE020.tallaNacer = $_AIEPI020._hcprc.signos.talla_nacer;
  datos_AIE020.edadGest = $_AIEPI020._hcprc.signos.edad_gestacional;
  datos_AIE020.grp_sang = $_AIEPI020._paci["GRP-SANG"];
  datos_AIE020.rh = $_AIEPI020._paci["RH"];

  // SIGNOS ACTUALES
  datos_AIE020.signos.peso = $_AIEPI020._hcprc.signos.peso;
  datos_AIE020.signos.talla = $_AIEPI020._hcprc.signos.talla;
  datos_AIE020.signos.pc = $_AIEPI020._hcprc.signos.per_cef;
  datos_AIE020.signos.tora = $_AIEPI020._hcprc.signos.per_tora;
  datos_AIE020.signos.fc = $_AIEPI020._hcprc.signos.fcard;
  datos_AIE020.signos.fr = $_AIEPI020._hcprc.signos.fresp;
  datos_AIE020.signos.braq = $_AIEPI020._hcprc.signos.per_braq;
  datos_AIE020.signos.temp = $_AIEPI020._hcprc.signos.temp;
  datos_AIE020.signos.imc = $_AIEPI020._hcprc.signos.imc;

  switch ($_AIEPI020._hcprc.signos.tsh_nacer) {
    case "1":
      datos_AIE020.signos.tsh = "NORMAL";
      break;
    case "2":
      datos_AIE020.signos.tsh = "ANORMAL";
      break;
    case "3":
      datos_AIE020.signos.tsh = "POSITIVO";
      break;
    case "4":
      datos_AIE020.signos.tsh = "NEGATIVO";
      break;
    case "5":
      datos_AIE020.signos.tsh = "SIN REA";
      break;
    case "6":
      datos_AIE020.signos.tsh = "PENDIENTE";
      break;
    case "7":
      datos_AIE020.signos.tsh = "REACTIVO";
      break;
    case "8":
      datos_AIE020.signos.tsh = "NO REACT";
      break;
    default:
      datos_AIE020.signos.tsh = "";
      break;
  }

  // signo fiebre

  switch (datos_AIE020.signo_fiebr.fiediure) {
    case "S":
      datos_AIE020.signo_fiebr.fiediure = "SI";
      break;
    case "N":
      datos_AIE020.signo_fiebr.fiediure = "NO";
      break;
    default:
      datos_AIE020.signo_fiebr.fiediure = " ";
      break;
  }

  switch (datos_AIE020.signo_fiebr.fiecapi) {
    case "S":
      datos_AIE020.signo_fiebr.fiecapi = "SI";
      break;
    case "N":
      datos_AIE020.signo_fiebr.fiecapi = "NO";
      break;
    default:
      datos_AIE020.signo_fiebr.fiecapi = " ";
      break;
  }

  // signo oido

  switch (datos_AIE020.signo_oido.oidsup) {
    case "S":
      datos_AIE020.signo_oido.oidsup = "SI";
      break;
    case "N":
      datos_AIE020.signo_oido.oidsup = "NO";
      break;
    default:
      datos_AIE020.signo_oido.oidsup = " ";
      break;
  }

  // datos_AIE020.signo_peligro.peligr == 'N' ? datos_AIE020.signo_peligro.resultado = 'NO EXISTE PELIGRO EN GENERAL' : false;

  // signo_peligro

  switch (datos_AIE020.signo_peligro.tpecho) {
    case "S":
      datos_AIE020.signo_peligro.tpecho = "SI";
      break;
    case "N":
      datos_AIE020.signo_peligro.tpecho = "NO";
      break;
    default:
      datos_AIE020.signo_peligro.tpecho = " ";
      break;
  }

  switch (datos_AIE020.signo_peligro.letarg) {
    case "S":
      datos_AIE020.signo_peligro.letarg = "SI";
      break;
    case "N":
      datos_AIE020.signo_peligro.letarg = "NO";
      break;
    default:
      datos_AIE020.signo_peligro.letarg = " ";
      break;
  }

  switch (datos_AIE020.signo_peligro.vomito) {
    case "S":
      datos_AIE020.signo_peligro.vomito = "SI";
      break;
    case "N":
      datos_AIE020.signo_peligro.vomito = "NO";
      break;
    default:
      datos_AIE020.signo_peligro.vomito = " ";
      break;
  }

  switch (datos_AIE020.signo_peligro.enfmal) {
    case "S":
      datos_AIE020.signo_peligro.enfmal = "SI";
      break;
    case "N":
      datos_AIE020.signo_peligro.enfmal = "NO";
      break;
    default:
      datos_AIE020.signo_peligro.enfmal = " ";
      break;
  }

  switch (datos_AIE020.signo_peligro.enfmue) {
    case "S":
      datos_AIE020.signo_peligro.enfmue = "SI";
      break;
    case "N":
      datos_AIE020.signo_peligro.enfmue = "NO";
      break;
    default:
      datos_AIE020.signo_peligro.enfmue = " ";
      break;
  }

  switch (datos_AIE020.signo_peligro.enfapn) {
    case "S":
      datos_AIE020.signo_peligro.enfapn = "SI";
      break;
    case "N":
      datos_AIE020.signo_peligro.enfapn = "NO";
      break;
    default:
      datos_AIE020.signo_peligro.enfapn = " ";
      break;
  }

  switch (datos_AIE020.signo_peligro.enffie) {
    case "S":
      datos_AIE020.signo_peligro.enffie = "SI";
      break;
    case "N":
      datos_AIE020.signo_peligro.enffie = "NO";
      break;
    default:
      datos_AIE020.signo_peligro.enffie = " ";
      break;
  }

  switch (datos_AIE020.signo_peligro.enfale) {
    case "S":
      datos_AIE020.signo_peligro.enfale = "SI";
      break;
    case "N":
      datos_AIE020.signo_peligro.enfale = "NO";
      break;
    default:
      datos_AIE020.signo_peligro.enfale = " ";
      break;
  }

  switch (datos_AIE020.signo_tos.tostri) {
    case "S":
      datos_AIE020.signo_tos.tostri = "SI";
      break;
    case "N":
      datos_AIE020.signo_tos.tostri = "NO";
      break;
    default:
      datos_AIE020.signo_tos.tostri = " ";
      break;
  }

  switch (datos_AIE020.signo_peligro.enfcia) {
    case "S":
      datos_AIE020.signo_peligro.enfcia = "SI";
      break;
    case "N":
      datos_AIE020.signo_peligro.enfcia = "NO";
      break;
    default:
      datos_AIE020.signo_peligro.enfcia = " ";
      break;
  }

  switch (datos_AIE020.signo_peligro.convul) {
    case "S":
      datos_AIE020.signo_peligro.convul = "SI";
      break;
    case "N":
      datos_AIE020.signo_peligro.convul = "NO";
      break;
    default:
      datos_AIE020.signo_peligro.convul = " ";
      break;
  }

  switch (datos_AIE020.signo_peligro.enfque) {
    case "S":
      datos_AIE020.signo_peligro.enfque = "SI";
      break;
    case "N":
      datos_AIE020.signo_peligro.enfque = "NO";
      break;
    default:
      datos_AIE020.signo_peligro.enfque = " ";
      break;
  }

  switch (datos_AIE020.signo_tos.tosest) {
    case "S":
      datos_AIE020.signo_tos.tosest = "SI";
      break;
    case "N":
      datos_AIE020.signo_tos.tosest = "NO";
      break;
    default:
      datos_AIE020.signo_tos.tosest = " ";
      break;
  }

  switch (datos_AIE020.signo_tos.tosibi) {
    case "S":
      datos_AIE020.signo_tos.tosibi = "SI";
      break;
    case "N":
      datos_AIE020.signo_tos.tosibi = "NO";
      break;
    default:
      datos_AIE020.signo_tos.tosibi = " ";
      break;
  }

  switch (datos_AIE020.signo_peligro.enfpau) {
    case "S":
      datos_AIE020.signo_peligro.enfpau = "SI";
      break;
    case "N":
      datos_AIE020.signo_peligro.enfpau = "NO";
      break;
    default:
      datos_AIE020.signo_peligro.enfpau = " ";
      break;
  }

  switch (datos_AIE020.signo_tos.tosres) {
    case "S":
      datos_AIE020.signo_tos.tosres = "SI";
      break;
    case "N":
      datos_AIE020.signo_tos.tosres = "NO";
      break;
    default:
      datos_AIE020.signo_tos.tosres = " ";
      break;
  }

  // switch (datos_AIE020.signo_diare.diasan) {
  //     case 'S':
  //         datos_AIE020.signo_diare.diasan = 'SI';
  //         break;
  //     case 'N':
  //         datos_AIE020.signo_diare.diasan = 'NO';
  //         break;
  //     default:
  //         datos_AIE020.signo_diare.diasan = ' ';
  //         break;
  // }

  switch (datos_AIE020.signo_peligro.enftaq) {
    case "S":
      datos_AIE020.signo_peligro.enftaq = "SI";
      break;
    case "N":
      datos_AIE020.signo_peligro.enftaq = "NO";
      break;
    default:
      datos_AIE020.signo_peligro.enftaq = " ";
      break;
  }

  switch (datos_AIE020.signo_peligro.enfbra) {
    case "S":
      datos_AIE020.signo_peligro.enfbra = "SI";
      break;
    case "N":
      datos_AIE020.signo_peligro.enfbra = "NO";
      break;
    default:
      datos_AIE020.signo_peligro.enfbra = " ";
      break;
  }

  switch (parseInt(datos_AIE020.signo_desnut.despal)) {
    case 1:
      datos_AIE020.signo_desnut.despal = "LEVE";
      break;
    case 2:
      datos_AIE020.signo_desnut.despal = "INTENSA";
      break;
    case 3:
      datos_AIE020.signo_desnut.despal = "NORMAL";
      break;
    default:
      datos_AIE020.signo_desnut.despal = " ";
      break;
  }

  switch (datos_AIE020.signo_peligro.enfict) {
    case "S":
      datos_AIE020.signo_peligro.enfict = "SI";
      break;
    case "N":
      datos_AIE020.signo_peligro.enfict = "NO";
      break;
    default:
      datos_AIE020.signo_peligro.enfict = " ";
      break;
  }

  switch (datos_AIE020.signo_peligro.enfpet) {
    case "S":
      datos_AIE020.signo_peligro.enfpet = "SI";
      break;
    case "N":
      datos_AIE020.signo_peligro.enfpet = "NO";
      break;
    default:
      datos_AIE020.signo_peligro.enfpet = " ";
      break;
  }

  switch (datos_AIE020.signo_peligro.enfequ) {
    case "S":
      datos_AIE020.signo_peligro.enfequ = "SI";
      break;
    case "N":
      datos_AIE020.signo_peligro.enfequ = "NO";
      break;
    default:
      datos_AIE020.signo_peligro.enfequ = " ";
      break;
  }

  switch (datos_AIE020.signo_peligro.enfhem) {
    case "S":
      datos_AIE020.signo_peligro.enfhem = "SI";
      break;
    case "N":
      datos_AIE020.signo_peligro.enfhem = "NO";
      break;
    default:
      datos_AIE020.signo_peligro.enfhem = " ";
      break;
  }

  switch (datos_AIE020.signo_peligro.enffon) {
    case "S":
      datos_AIE020.signo_peligro.enffon = "SI";
      break;
    case "N":
      datos_AIE020.signo_peligro.enffon = "NO";
      break;
    default:
      datos_AIE020.signo_peligro.enffon = " ";
      break;
  }

  switch (datos_AIE020.signo_peligro.enfdis) {
    case "S":
      datos_AIE020.signo_peligro.enfdis = "SI";
      break;
    case "N":
      datos_AIE020.signo_peligro.enfdis = "NO";
      break;
    default:
      datos_AIE020.signo_peligro.enfdis = " ";
      break;
  }

  switch (datos_AIE020.signo_peligro.enfsec) {
    case "S":
      datos_AIE020.signo_peligro.enfsec = "SI";
      break;
    case "N":
      datos_AIE020.signo_peligro.enfsec = "NO";
      break;
    default:
      datos_AIE020.signo_peligro.enfsec = " ";
      break;
  }

  switch (datos_AIE020.signo_peligro.enferi) {
    case "S":
      datos_AIE020.signo_peligro.enferi = "SI";
      break;
    case "N":
      datos_AIE020.signo_peligro.enferi = "NO";
      break;
    default:
      datos_AIE020.signo_peligro.enferi = " ";
      break;
  }

  switch (datos_AIE020.signo_peligro.enfomb) {
    case "S":
      datos_AIE020.signo_peligro.enfomb = "SI";
      break;
    case "N":
      datos_AIE020.signo_peligro.enfomb = "NO";
      break;
    default:
      datos_AIE020.signo_peligro.enfomb = " ";
      break;
  }

  switch (parseInt(datos_AIE020.signo_peligro.enfpus)) {
    case 1:
      datos_AIE020.signo_peligro.enfpus = "MUCHAS O EXTENSAS";
      break;
    case 2:
      datos_AIE020.signo_peligro.enfpus = "ESCASAS";
      break;
    case 3:
      datos_AIE020.signo_peligro.enfpus = "NO TIENE";
      break;
    default:
      datos_AIE020.signo_peligro.enfpus = " ";
      break;
  }

  switch (datos_AIE020.signo_peligro.enfpla) {
    case "S":
      datos_AIE020.signo_peligro.enfpla = "SI";
      break;
    case "N":
      datos_AIE020.signo_peligro.enfpla = "NO";
      break;
    default:
      datos_AIE020.signo_peligro.enfpla = " ";
      break;
  }

  $_AIEPI020.dato_9501.enfer_grave == 1
    ? (datos_AIE020.signo_peligro.resultado = "ENFERMEDAD MUY GRAVE")
    : (datos_AIE020.signo_peligro.resultado = "NO TIENE ENFERMEDAD GRAVE");

  // INI DIARRR

  switch (parseInt(datos_AIE020.signo_diare.dialet)) {
    case 1:
      datos_AIE020.signo_diare.dialet = "ALERTA, INTRANQUILO O IRRITABLE";
      break;
    case 2:
      datos_AIE020.signo_diare.dialet = "LETARGICO O INCONSCIENTE";
      break;
    case 3:
      datos_AIE020.signo_diare.dialet = "TRANQUILO";
      break;
    default:
      datos_AIE020.signo_diare.dialet = "";
      break;
  }

  switch (datos_AIE020.signo_diare.diaojo) {
    case "S":
      datos_AIE020.signo_diare.diaojo = "SI";
      break;
    case "N":
      datos_AIE020.signo_diare.diaojo = "NO";
      break;
    default:
      datos_AIE020.signo_diare.diaojo = " ";
      break;
  }

  $_AIEPI020.dato_9501.var_diarr.diarre_deshi == 1
    ? (datos_AIE020.signo_diare.resultado = "DESHIDRATACION\n")
    : (datos_AIE020.signo_diare.resultado = "NO DESHIDRATACION\n");
  $_AIEPI020.dato_9501.var_diarr.disenteria == 1 ? (datos_AIE020.signo_diare.resultado += "DISENTERIA\n") : false;
  $_AIEPI020.dato_9501.var_diarr.diarre_pers_grave == 1
    ? (datos_AIE020.signo_diare.resultado += "DIEARREA PERSISTENTE GRAVE\n")
    : false;
  $_AIEPI020.dato_9501.var_diarr.diarre_grave == 1 ? (datos_AIE020.signo_diare.resultado += "DIARREA GRAVE\n") : false;
  $_AIEPI020.dato_9501.var_diarr.diarre_riesg == 1
    ? (datos_AIE020.signo_diare.resultado += "DIARREA ALTO RIESGO DESHIDRATACION\n")
    : false;
  $_AIEPI020.dato_9501.var_diarr.diarre_leve == 1
    ? (datos_AIE020.signo_diare.resultado += "DIARREA SIN DESHIDRATACION\n")
    : false;

  // INI ALIMENTACION

  if (
    datos_AIE020.signo_alimentacion.ali_agarre == 1 ||
    datos_AIE020.signo_alimentacion.ali_succion == 1 ||
    datos_AIE020.signo_alimentacion.destend == 3
  ) {
    datos_AIE020.signo_alimentacion.resultado = "PROBLEMA SEVERO ALIMENTACION\n";
  } else if (
    datos_AIE020.signo_alimentacion.destend == 2 ||
    datos_AIE020.signo_alimentacion.ali_agarre == 2 ||
    datos_AIE020.signo_alimentacion.ali_succion == 2 ||
    datos_AIE020.signo_alimentacion.aneveces < 8 ||
    datos_AIE020.signo_alimentacion.ali_otrleche == "S" ||
    datos_AIE020.signo_alimentacion.ali_otr_alim == "S"
  ) {
    datos_AIE020.signo_alimentacion.resultado = "PROBLEMA LEVE ALIMENTACION\n";
  } else {
    datos_AIE020.signo_alimentacion.resultado = "NO HAY PROBLEMA DE ALIMENTACION\n";
  }

  // RESULTADO DE DESARROLLO
  var contar_w = 0;
  if ($_AIEPI020._hcprc.signos.peso_nacer < 2000) contar_w = parseInt(contar_w) + 1;
  if ($_AIEPI020._hcprc.signos.edad_gestacional < 35 || $_AIEPI020._hcprc.signos.edad_gestacional > 40)
    contar_w = parseInt(contar_w) + 1;
  if (datos_AIE020.signo_desarr.des_prob_embar == "S") contar_w = parseInt(contar_w) + 1;
  if (datos_AIE020.signo_desarr.des_prob_parto == "S") contar_w = parseInt(contar_w) + 1;
  if (datos_AIE020.signo_desarr.des_prob_salud == "S") contar_w = parseInt(contar_w) + 1;
  if (datos_AIE020.signo_desarr.des_prob_paren == "S") contar_w = parseInt(contar_w) + 1;
  if (datos_AIE020.signo_desarr.des_prob_disca == "S") contar_w = parseInt(contar_w) + 1;
  if (datos_AIE020.signo_desarr.des_prob_entor == "S") contar_w = parseInt(contar_w) + 1;
  if (datos_AIE020.signo_desarr.des_prob_desar == "S") contar_w = parseInt(contar_w) + 1;

  if (
    ($_AIEPI020._hcprc.edad_dias < 31 && datos_AIE020.signo_desarr.desact < datos_AIE020.signo_desarr.des_limi_act) ||
    ($_AIEPI020._hcprc.edad_dias > 30 &&
      datos_AIE020.signo_desarr.desact < datos_AIE020.signo_desarr.des_limi_act_Ant) ||
    datos_AIE020.signo_desnut.per_cef_estad < -2 ||
    datos_AIE020.signo_desnut.per_cef_estad > 2
  ) {
    datos_AIE020.signo_desarr.resultado = "PROBABLE RETRASO DESARROLLO\n";
  } else if (datos_AIE020.signo_desarr.desact < datos_AIE020.signo_desarr.des_limi_act) {
    datos_AIE020.signo_desarr.resultado = "RIESGO DE PROBLEMA EN DESARROLLO\n";
  } else if (contar_w > 0) {
    datos_AIE020.signo_desarr.resultado = "DESARROLLO NORMAL\nCON FACT RIESG\n";
  } else if (datos_AIE020.signo_desarr.desarr == "S") {
    datos_AIE020.signo_desarr.resultado = "NO TIENE PROBLEMA EN DESARROLLO\n";
  } else {
    datos_AIE020.signo_desarr.resultado = "";
  }

  switch (datos_AIE020.signo_alimentacion.ali_perpeso) {
    case "S":
      datos_AIE020.signo_alimentacion.ali_perpeso = "SI";
      break;
    case "N":
      datos_AIE020.signo_alimentacion.ali_perpeso = "NO";
      break;
    default:
      datos_AIE020.signo_alimentacion.ali_perpeso = " ";
      break;
  }

  // LLENAR ACTIVIDADES

  var paso_w = 0;
  if ($_AIEPI020.dato_9501.signo_desarr.desarr == "S") {
    for (var i in datos_AIE020.signo_desarr.des_test_act_ant) {
      if (datos_AIE020.signo_desarr.des_test_act_ant[i] == "S") {
        paso_w = 2;
      }
    }
    paso_w != 2 ? (paso_w = 1) : false;
  }

  if ($_AIEPI020.dato_9501.signo_desarr.desarr == "S") {
    var actividades = _AIEPI830(paso_w, $_AIEPI020._hcprc.edad_dias);

    for (var i in datos_AIE020.signo_desarr.des_test_act_ant) {
      if (datos_AIE020.signo_desarr.des_test_act_ant[i] == "S") {
        datos_AIE020.signo_desarr.des_test_act_ant[i] = "SI";
      } else {
        datos_AIE020.signo_desarr.des_test_act_ant[i] = "NO";
      }

      if (datos_AIE020.signo_desarr.des_test_act[i] == "S") {
        datos_AIE020.signo_desarr.des_test_act[i] = "SI";
      } else {
        datos_AIE020.signo_desarr.des_test_act[i] = "NO";
      }
    }

    datos_AIE020.signo_desarr.actividades = [];

    if (paso_w == 2) {
      actividades.cuestionario.forEach((pregunta, index) => {
        datos_AIE020.signo_desarr.actividades.push(pregunta + "  " + datos_AIE020.signo_desarr.des_test_act_ant[index]);
      });
    } else {
      actividades.cuestionario.forEach((pregunta, index) => {
        datos_AIE020.signo_desarr.actividades.push(pregunta + "  " + datos_AIE020.signo_desarr.des_test_act[index]);
      });
    }
  }

  // VARIABLES DE DESARROLLO
  datos_AIE020.signo_desarr.per_cef = $_AIEPI020._hcprc.signos.per_cef;
  datos_AIE020.signo_desarr.pc_edad = "";

  // INI VACUNACION

  switch (datos_AIE020.sig_vacunacion.vac_tetanica1) {
    case "S":
      datos_AIE020.sig_vacunacion.vac_tetanica1 = "SI";
      break;
    case "N":
      datos_AIE020.sig_vacunacion.vac_tetanica1 = "NO";
      break;
    default:
      datos_AIE020.sig_vacunacion.vac_tetanica1 = " ";
      break;
  }

  switch (datos_AIE020.sig_vacunacion.vac_tetanica2) {
    case "S":
      datos_AIE020.sig_vacunacion.vac_tetanica2 = "SI";
      break;
    case "N":
      datos_AIE020.sig_vacunacion.vac_tetanica2 = "NO";
      break;
    default:
      datos_AIE020.sig_vacunacion.vac_tetanica2 = " ";
      break;
  }

  switch (datos_AIE020.sig_vacunacion.vac_bcg) {
    case "S":
      datos_AIE020.sig_vacunacion.vac_bcg = "SI";
      break;
    case "N":
      datos_AIE020.sig_vacunacion.vac_bcg = "NO";
      break;
    default:
      datos_AIE020.sig_vacunacion.vac_bcg = " ";
      break;
  }

  switch (datos_AIE020.sig_vacunacion.vac_hepb1) {
    case "S":
      datos_AIE020.sig_vacunacion.vac_hepb1 = "SI";
      break;
    case "N":
      datos_AIE020.sig_vacunacion.vac_hepb1 = "NO";
      break;
    default:
      datos_AIE020.sig_vacunacion.vac_hepb1 = " ";
      break;
  }

  datos_AIE020.sig_vacunacion.proxvac =
    datos_AIE020.sig_vacunacion.proxvac_dia +
    "-" +
    datos_AIE020.sig_vacunacion.proxvac_mes +
    "-" +
    datos_AIE020.sig_vacunacion.proxvac_ano;

  // INI RECOMENDACIONES

  datos_AIE020.recomendaciones = {};

  datos_AIE020.recomendaciones.volinme = $_AIEPI020.dato_9501.signo_alimentacion.volinme.replace(/\&/g, "\n");
  datos_AIE020.recomendaciones.volcontr = $_AIEPI020.dato_9501.signo_alimentacion.volcontr;
  datos_AIE020.recomendaciones.volsano = $_AIEPI020.dato_9501.signo_alimentacion.volsano;
  datos_AIE020.recomendaciones.refconsul = $_AIEPI020.dato_9501.signo_alimentacion.refconsul;
  datos_AIE020.recomendaciones.medprev = $_AIEPI020.dato_9501.signo_alimentacion.medprev.replace(/\&/g, "\n");
  datos_AIE020.recomendaciones.recomtrato = $_AIEPI020.dato_9501.signo_alimentacion.recomtrato.replace(/\&/g, "\n");
  datos_AIE020.recomendaciones.vitaminaA = $_AIEPI020.dato_9501.signo_alimentacion.vitaminaA;
  datos_AIE020.recomendaciones.prox_vit_A = $_AIEPI020.dato_9501.signo_alimentacion.prox_vit_A;
  datos_AIE020.recomendaciones.albendazol = $_AIEPI020.dato_9501.signo_alimentacion.albendazol;
  datos_AIE020.recomendaciones.hierro = $_AIEPI020.dato_9501.signo_alimentacion.hierro;
  datos_AIE020.recomendaciones.cuando_hier = $_AIEPI020.dato_9501.signo_alimentacion.cuando_hier;

  // DATOS - RIPS

  switch (parseFloat($_AIEPI020._hcprc.rips.finalidad)) {
    case 1:
      datos_AIE020.finalid = "ATENCION PARTO -Puerperio-";
      break;
    case 2:
      datos_AIE020.finalid = "ATENCION RECIEN NACIDO";
      break;
    case 3:
      datos_AIE020.finalid = "ATENCION PLANIF.FAMILIAR";
      break;
    case 4:
      datos_AIE020.finalid = "AT.ALTER.CREC. & DESARR.<10";
      break;
    case 5:
      datos_AIE020.finalid = "DETECCION ALT. DESARR.JOVEN";
      break;
    case 6:
      datos_AIE020.finalid = "DETECCION ALT. EMBARAZO";
      break;
    case 7:
      datos_AIE020.finalid = "DETECCION ALT. ADULTO";
      break;
    case 8:
      datos_AIE020.finalid = "DETECCION ALT. AGUDEZA VISUAL";
      break;
    case 9:
      datos_AIE020.finalid = "DETECCION ENFERM.PROFESIONAL";
      break;
    case 10:
      datos_AIE020.finalid = "NO APLICA";
      break;
    case 11:
      datos_AIE020.finalid = "PATOLOGIAS CRONICAS";
      break;
    default:
      datos_AIE020.finalid = $_AIEPI020._hcprc.rips.finalidad;
      break;
  }

  switch ($_AIEPI020._hcprc.signos.sintom_resp) {
    case "S":
      datos_AIE020.sintom_resp = "SI";
      break;
    case "N":
      datos_AIE020.sintom_resp = "NO";
      break;
    case "X":
      datos_AIE020.sintom_resp = "NO VALORADO";
      break;
    default:
      datos_AIE020.sintom_resp = " ";
      break;
  }

  switch ($_AIEPI020._hcprc.signos.sintom_piel) {
    case "S":
      datos_AIE020.sintom_piel = "SI";
      break;
    case "N":
      datos_AIE020.sintom_piel = "NO";
      break;
    case "X":
      datos_AIE020.sintom_piel = "NO VALORADO";
      break;
    default:
      datos_AIE020.sintom_piel = " ";
      break;
  }

  switch ($_AIEPI020._hcprc.signos.victi_maltrato) {
    case "S":
      datos_AIE020.victi_maltrato = "SI";
      break;
    case "N":
      datos_AIE020.victi_maltrato = "NO";
      break;
    case "X":
      datos_AIE020.victi_maltrato = "NO VALORADO";
      break;
    default:
      datos_AIE020.victi_maltrato = " ";
      break;
  }

  switch ($_AIEPI020._hcprc.signos.victi_violencia) {
    case "S":
      datos_AIE020.victi_violencia = "SI";
      break;
    case "N":
      datos_AIE020.victi_violencia = "NO";
      break;
    case "X":
      datos_AIE020.victi_violencia = "NO VALORADO";
      break;
    default:
      datos_AIE020.victi_violencia = " ";
      break;
  }

  switch ($_AIEPI020._hcprc.signos.enfer_mental) {
    case "S":
      datos_AIE020.enfer_mental = "SI";
      break;
    case "N":
      datos_AIE020.enfer_mental = "NO";
      break;
    case "X":
      datos_AIE020.enfer_mental = "NO VALORADO";
      break;
    default:
      datos_AIE020.enfer_mental = " ";
      break;
  }

  switch ($_AIEPI020._hcprc.signos.enfer_its) {
    case "S":
      datos_AIE020.enfer_its = "SI";
      break;
    case "N":
      datos_AIE020.enfer_its = "NO";
      break;
    case "X":
      datos_AIE020.enfer_its = "NO VALORADO";
      break;
    default:
      datos_AIE020.enfer_its = " ";
      break;
  }

  switch ($_AIEPI020._hcprc.signos.cancer_seno) {
    case "S":
      datos_AIE020.cancer_seno = "SI";
      break;
    case "N":
      datos_AIE020.cancer_seno = "NO";
      break;
    case "X":
      datos_AIE020.cancer_seno = "NO VALORADO";
      break;
    default:
      datos_AIE020.cancer_seno = " ";
      break;
  }

  switch ($_AIEPI020._hcprc.signos.cancer_cervis) {
    case "S":
      datos_AIE020.cancer_cervis = "SI";
      break;
    case "N":
      datos_AIE020.cancer_cervis = "NO";
      break;
    case "X":
      datos_AIE020.cancer_cervis = "NO VALORADO";
      break;
    default:
      datos_AIE020.cancer_cervis = " ";
      break;
  }

  // LLENAR INFO MEDICO

  datos_AIE020.medico = {};
  await postData(
    { datosh: datosEnvio() + cerosIzq($_AIEPI020._hcprc.med.trim(), 10) },
    get_url("APP/SALUD/SAL719-01.DLL")
  )
    .then((data) => {
      var reg_med = data.PERSATI[0];
      datos_AIE020.medico.nombre = reg_med.DESCRIP;
      datos_AIE020.medico.reg = reg_med.REGISTRO;
      datos_AIE020.medico.espec = reg_med.DESCESP1;
      datos_AIE020.medico.firma = parseFloat($_AIEPI020._hcprc.med.trim());
    })
    .catch((err) => {
      console.log(err);
    });

  // INI AYER/ANOCHE

  datos_AIE020.nino_6meses = $_AIEPI020.dato_9501.nino_6meses;

  datos_AIE020.nino_6meses.ali_edad = $_AIEPI020.dato_9501.signo_alimentacion.ali_edad;

  switch (datos_AIE020.nino_6meses.rec_liqui) {
    case "S":
      datos_AIE020.nino_6meses.rec_liqui = "SI";
      break;
    case "N":
      datos_AIE020.nino_6meses.rec_liqui = "NO";
      break;
    default:
      datos_AIE020.nino_6meses.rec_liqui = " ";
      break;
  }

  switch (datos_AIE020.nino_6meses.rec_leche_for) {
    case "S":
      datos_AIE020.nino_6meses.rec_leche_for = "SI";
      break;
    case "N":
      datos_AIE020.nino_6meses.rec_leche_for = "NO";
      break;
    default:
      datos_AIE020.nino_6meses.rec_leche_for = " ";
      break;
  }

  switch (datos_AIE020.nino_6meses.rec_leche_otr) {
    case "S":
      datos_AIE020.nino_6meses.rec_leche_otr = "SI";
      break;
    case "N":
      datos_AIE020.nino_6meses.rec_leche_otr = "NO";
      break;
    default:
      datos_AIE020.nino_6meses.rec_leche_otr = " ";
      break;
  }

  switch (datos_AIE020.nino_6meses.rec_espeso) {
    case "S":
      datos_AIE020.nino_6meses.rec_espeso = "SI";
      break;
    case "N":
      datos_AIE020.nino_6meses.rec_espeso = "NO";
      break;
    default:
      datos_AIE020.nino_6meses.rec_espeso = " ";
      break;
  }

  if ($_reg_hc.edad_hc.unid_edad == "D" || ($_reg_hc.edad_hc.vlr_edad == "M" && $_reg_hc.edad_hc.vlr_edad <= 6)) {
    if (
      $_AIEPI020.dato_9501.nino_6meses.rec_liqui == "N" &&
      $_AIEPI020.dato_9501.nino_6meses.rec_leche_for == "N" &&
      $_AIEPI020.dato_9501.nino_6meses.rec_leche_otr == "N" &&
      $_AIEPI020.dato_9501.nino_6meses.rec_espeso == "N"
    ) {
      datos_AIE020.nino_6meses.lac_mater_exclus = "SI";
      datos_AIE020.nino_6meses.alim_complem = "NO";
    } else {
      datos_AIE020.nino_6meses.lac_mater_exclus = "NO";
      datos_AIE020.nino_6meses.alim_complem = "SI";
    }

    datos_AIE020.nino_6meses.flag = true;
  } else {
    datos_AIE020.nino_6meses.lac_mater_exclus = "";
    datos_AIE020.nino_6meses.alim_complem = "";
    datos_AIE020.nino_6meses.flag = false;
  }

  // diagnosticos
  for (var i in $_AIEPI020._hcprc.rips.tabla_diag) {
    if ($_AIEPI020._hcprc.rips.tabla_diag[i].diagn.trim() != "") {
      datos_AIE020.diagnosticos.push({
        cod: $_AIEPI020._hcprc.rips.tabla_diag[i].diagn,
        descrip: $_AIEPI020._hcprc.rips.tabla_diag[i].descrip,
      });
    }
  }

  $_AIEPI020.dato_9503 ? (datos_AIE020.tratamiento = $_AIEPI020.dato_9503) : (datos_AIE020.tratamiento = "");

  await imprimirDnt_AIEPI020();

  await imprimirDatosCovid_AIEPI020();

  inicializarFormatoBase_impHc();
  await _imprimirAIEPI020(datos_AIE020).then(console.log("termina"));

  if ($_AIEPI020.opciones.opc_resu == "N" && $_AIEPI020._hcprc.cierre.estado == 2) {
    await llenarEgreso_AIEPI020();
  }

  if ($_AIEPI020.opciones.opc_resu != "S") {
    await _impresion2({
      tipo: "pdf",
      archivo: `${localStorage.Usuario + moment().format("-YYMMDD-HHmmssS")}.pdf`,
      content: formatoBaseImp_Hc,
    })
      .then((el) => {})
      .catch((err) => {
        console.error(err);
      });
  }
}

async function imprimirDnt_AIEPI020() {
  datos_AIE020.control_desarrollo = $_AIEPI020.dato_9501.control_desarrollo;
  switch (datos_AIE020.control_desarrollo.edema) {
    case "S":
      datos_AIE020.control_desarrollo.edema = "SI";
      break;
    case "N":
      datos_AIE020.control_desarrollo.edema = "NO";
      break;
    default:
      datos_AIE020.control_desarrollo.edema = "  ";
      break;
  }

  switch (parseInt(datos_AIE020.control_desarrollo.apetito)) {
    case 1:
      datos_AIE020.control_desarrollo.apetito = "POSITIVO";
      break;
    case 2:
      datos_AIE020.control_desarrollo.apetito = "NEGATIVO";
      break;
    default:
      datos_AIE020.control_desarrollo.apetito = "  ";
      break;
  }

  switch (datos_AIE020.control_desarrollo.inscrito_cyd) {
    case "S":
      datos_AIE020.control_desarrollo.inscrito_cyd = "SI";
      break;
    case "N":
      datos_AIE020.control_desarrollo.inscrito_cyd = "NO";
      break;
    default:
      datos_AIE020.control_desarrollo.inscrito_cyd = "  ";
      break;
  }

  datos_AIE020.control_desarrollo.fecha_inscrito_cyd = _editFecha2(datos_AIE020.control_desarrollo.fecha_inscrito_cyd);

  switch (parseInt(datos_AIE020.control_desarrollo.manejo_dnt)) {
    case 1:
      datos_AIE020.control_desarrollo.manejo_dnt = "HOSPITALARIOS";
      break;
    case 2:
      datos_AIE020.control_desarrollo.manejo_dnt = "DOMICILIARIOS";
      break;
    case 3:
      datos_AIE020.control_desarrollo.manejo_dnt = "NO APLICA";
      break;
    default:
      datos_AIE020.control_desarrollo.manejo_dnt = "  ";
      break;
  }

  datos_AIE020.control_desarrollo.tabla_controles = $_AIEPI020.dato_9501.control_desarrollo.tabla_controles;

  switch (datos_AIE020.control_desarrollo.recupera_nutric) {
    case "S":
      datos_AIE020.control_desarrollo.recupera_nutric = "SI";
      break;
    case "N":
      datos_AIE020.control_desarrollo.recupera_nutric = "NO";
      break;
    default:
      datos_AIE020.control_desarrollo.recupera_nutric = "  ";
      break;
  }

  switch (datos_AIE020.control_desarrollo.micronutri_pol) {
    case "S":
      datos_AIE020.control_desarrollo.micronutri_pol = "SI";
      break;
    case "N":
      datos_AIE020.control_desarrollo.micronutri_pol = "NO";
      break;
    default:
      datos_AIE020.control_desarrollo.micronutri_pol = "  ";
      break;
  }

  if (datos_AIE020.control_desarrollo.edema.trim() == "") {
    datos_AIE020.control_desarrollo.flag = false;
  } else {
    datos_AIE020.control_desarrollo.flag = true;
  }
}

async function imprimirDatosCovid_AIEPI020() {
  if ($_AIEPI020._hcprc.covid19.viaje_covid19.trim() == "" && $_AIEPI020._hcprc.covid19.contacto_covid19.trim() == "") {
    // continue
  } else {
    datos_AIE020.covid.riesgos.bandera = true;

    aux = "";
    switch ($_AIEPI020._hcprc.covid19.viaje_covid19) {
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
    datos_AIE020.covid.riesgos.transito = aux;

    aux = "";
    switch ($_AIEPI020._hcprc.covid19.contacto_covid19) {
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
    datos_AIE020.covid.riesgos.contDiag = aux;

    aux = "";
    switch ($_AIEPI020._hcprc.covid19.fiebre_covid19) {
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
    datos_AIE020.covid.riesgos.fiebre = aux;

    aux = "";
    switch ($_AIEPI020._hcprc.covid19.tos_covid19) {
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
    datos_AIE020.covid.riesgos.tos = aux;

    aux = "";
    switch ($_AIEPI020._hcprc.covid19.disnea_covid19) {
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
    datos_AIE020.covid.riesgos.disnea = aux;

    aux = "";
    switch ($_AIEPI020._hcprc.covid19.malestar_covid19) {
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
    datos_AIE020.covid.riesgos.general = aux;

    aux = "";
    switch ($_AIEPI020._hcprc.covid19.rinorrea_covid19) {
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
    datos_AIE020.covid.riesgos.rinorrea = aux;

    aux = "";
    switch ($_AIEPI020._hcprc.covid19.personal_salud_covid19) {
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
    datos_AIE020.covid.riesgos.contEstr = aux;

    aux = "";
    switch ($_AIEPI020._hcprc.covid19.odinofagia_covid19) {
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
    datos_AIE020.covid.riesgos.odinofagia = aux;

    aux = "";
    switch ($_AIEPI020._hcprc.covid19.viaje_dentro_covid19) {
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
    datos_AIE020.covid.riesgos.pre1 = aux;

    if ($_AIEPI020._hcprc.covid19.viaje_dentro_covid19 == "S") {
      var x = $_AIEPI020._ciudades.find((e) => e.COD == $_AIEPI020._hcprc.covid19.lugar_dentro_covid19);
      x != undefined ? (datos_AIE020.covid.riesgos.pre2 = x.NOMBRE) : false;
      datos_AIE020.covid.riesgos.pre3 = $_AIEPI020._hcprc.covid19.tiempo_dentro_covid19;
    }

    aux = "";
    switch ($_AIEPI020._hcprc.covid19.viaje_fuera_covid19) {
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
    datos_AIE020.covid.riesgos.pre4 = aux;

    if ($_AIEPI020._hcprc.covid19.viaje_fuera_covid19 == "S") {
      var x = $_AIEPI020._paisesRips.find((e) => e.CODIGO == $_AIEPI020._hcprc.covid19.lugar_fuera_covid19);
      x != undefined ? (datos_AIE020.covid.riesgos.pre5 = x.DESCRIP) : false;
      datos_AIE020.covid.riesgos.pre6 = $_AIEPI020._hcprc.covid19.tiempo_fuera_covid19;
    }
  }
}

async function llamarBarthel_AIEPI020() {
  if ($_AIEPI020.dato_9005 != undefined) {
    if ($_AIEPI020.dato_9005.valoracion_9005.trim() != "") {
      await _iniciarBarthel($_AIEPI020.varEnvio, $_AIEPI020.opciones, $_AIEPI020.dataBase64);
    }
  }
}

async function llamarKarnof_AIEPI020() {
  if ($_AIEPI020.dato_9006 != undefined) {
    if ($_AIEPI020.dato_9006.valoracion_9006.trim() != "") {
      await _iniciarKarnof($_AIEPI020.varEnvio, $_AIEPI020.opciones, $_AIEPI020.dataBase64);
    }
  }
}

async function llamarHCI5414A_AIEPI020() {
  if ($_AIEPI020._hcprc.rips.causa == "02") {
    await this.traerHistoriaClinica().then(() => {
      _iniciarHCI5414A( {...$_AIEPI020.varEnvio, _hcprc_new: $_AIEPI020._hcprc2,} , $_AIEPI020.opciones, $_AIEPI020.dataBase64);
    });
    // await _iniciarHCI5414A($_AIEPI020.varEnvio, $_AIEPI020.opciones, $_AIEPI020.dataBase64);
  }
}

async function llamarAcoCovid_AIEPI020() {
  if ($_AIEPI020.dato_9009 != undefined) {
    if ($_AIEPI020._hcprc.covid19.consenti_acomp_covid19 == "S") {
      await _iniciarAcoCovid($_AIEPI020.varEnvio, $_AIEPI020.opciones, $_AIEPI020.dataBase64);
    }
  }
}

async function crearJsonEnvio_AIEPI020() {
  $_AIEPI020.varEnvio = {
    _hcprc: $_AIEPI020._hcprc,
    _detalles: $_AIEPI020._detalles,
    _paci: $_AIEPI020._paci,
    _arrayCiudades: $_AIEPI020._ciudades,
  };
}

async function inicializardatos_AIEPI020() {
  datos_AIE020 = {
    paciente: {},
    signo_peligro: {},
    signo_tos: {},
    signo_diare: {},
    signo_fiebr: {},
    signo_oido: {},
    signo_gargan: {},
    signo_salbuc: {},
    signo_desnut: {},
    signo_desarr: {},
    sig_vacunacion: {},
    control_desarrollo: {},
    signo_alimentacion: {},
    signos: {},
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
    diagnosticos: [],
  };
}

async function calcularOms_AIEPI020(codigo) {
  var info_grafica = {
    meses: null,
    oms_3: null,
    oms_2: null,
    oms_1: null,
    oms_0: null,
    oms_M1: null,
    oms_M2: null,
    oms_M3: null,
  };

  if (codigo == "PXT") {
    var cms = parseInt($_AIEPI020._hcprc.signos.talla) * 10;

    var busqueda_oms = $_AIEPI020.TABLAS_OMS.find(
      (x) => x.CODIGO.trim() == codigo && x.SEXO == $_AIEPI020._paci.SEXO && parseInt(x.RANGO) == cms
    );
  } else {
    var fecha_Actual = moment();
    var fecha_Nacim = moment($_AIEPI020._paci.NACIM).format("YYYYMMDD");
    var edadMeses = fecha_Actual.diff(fecha_Nacim, "months");

    var busqueda_oms = $_AIEPI020.TABLAS_OMS.find(
      (x) => x.CODIGO.trim() == codigo && x.SEXO == $_AIEPI020._paci.SEXO && parseInt(x.RANGO) == edadMeses
    );
  }

  if (busqueda_oms) {
    info_grafica.oms_3 = busqueda_oms.DATO_3.trim() != "" ? parseFloat(busqueda_oms.DATO_3) : busqueda_oms.DATO_3;
    info_grafica.oms_2 = busqueda_oms.DATO_2.trim() != "" ? parseFloat(busqueda_oms.DATO_2) : busqueda_oms.DATO_2;
    info_grafica.oms_1 = busqueda_oms.DATO_1.trim() != "" ? parseFloat(busqueda_oms.DATO_1) : busqueda_oms.DATO_1;
    info_grafica.oms_0 = busqueda_oms.DATO_0.trim() != "" ? parseFloat(busqueda_oms.DATO_0) : busqueda_oms.DATO_0;
    info_grafica.oms_M1 = busqueda_oms.DATO_M1.trim() != "" ? parseFloat(busqueda_oms.DATO_M1) : busqueda_oms.DATO_M1;
    info_grafica.oms_M2 = busqueda_oms.DATO_M2.trim() != "" ? parseFloat(busqueda_oms.DATO_M2) : busqueda_oms.DATO_M2;
    info_grafica.oms_M3 = busqueda_oms.DATO_M3.trim() != "" ? parseFloat(busqueda_oms.DATO_M3) : busqueda_oms.DATO_M3;
  }

  return info_grafica;
}

async function leerTablaOms_AIEPI020() {
  await postData({ datosh: datosEnvio() }, get_url("APP/HICLIN/AIE-DESA.DLL"))
    .then(function (data) {
      $_AIEPI020.TABLAS_OMS = data.TABLAS_OMS;
    })
    .catch((err) => {
      console.error(err);
    });
}

async function traerHistoriaClinica() {
  return new Promise((resolve, reject) => {
    postData(
      { datosh: datosEnvio() + $_REG_HC.llave_hc + "|" + localStorage["Usuario"].trim() + "|1|" },
      get_url("APP/HICLIN/GET_HC.DLL")
    )
      .then((data) => {
        $_AIEPI020._hcprc2 = data;
        resolve();
      })
      .catch((err) => {
        CON851("", "Error consultando historia", null, "error", "Error");
        console.log(err, "err");
        reject();
      });
  });
}
