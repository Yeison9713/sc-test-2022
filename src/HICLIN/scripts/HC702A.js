
// CREACION - SANTIAGO.F - ENERO 21/2021

var $_HC702A = [];
var diagArray = [];
var arrayImp = [];
var $this;

var fechadesde = $_REG_HC.fecha_hc;
var fechahasta = moment().format('YYYYMMDD');

async function _iniciarHC702A(json) {
  $_HC702A._datos = json;

  loader('show');

  await abrirArchivos_HC702A();
  await inicializarDatos_HC702A();
  await cargarDatosDetalles_HC702A();

  await llenarEncabezado_HC702A();
  await llenarDatosPaciente_HC702A();

  if ($_HC702A._datos.tipo_epi_w == "1" && $_HC702A._datos.sw_epi_w == "2") {
    $_HC702A._datos.sw_espec = "";
    await buscarOftalmologia_HC702A();
    $_HC702A._datos.sw_espec.trim() == '' ? await buscarOtorrino_HC702A() : false;
    await imprimirProcedencia_HC702A();
    await imprimirMotivo_HC702A();
    await imprimirEnfermedadActual_HC702A();
    await imprimirRevisionSistemas_HC702A();

    switch ($_HC702A._datos.sw_espec) {
      case 'OFT':
        await imprimirOftalmologia_HC702A();
        break;
      case 'OTO':
        await imprimirSignos_HC702A();
        await imprimirOtorrino_HC702A();
        break;
      default:
        await imprimirSignos_HC702A();
        if ($_USUA_GLOBAL[0].NIT != 892000264) {
          await imprimirExamenFisico_HC702A();
        }
    }
    await buscarGineco_HC702A();
    await imprimirDiagnostico_HC702A();
    await imprimirAnalisis_HC702A();
    await imprimirRips_HC702A();
    await imprimirSalida_HC702A();

    await imprimirFirma_HC702A();
  }

  // toca agregar la impresion del hci07 resumen de historia

  await llamarImpresion_HC702A();

  await recorrerEvoluciones_HC702A();

  // if ($_USUA_GLOBAL[0].NIT != 892000264) {
  //   await recorrerEvoluciones_HC702A();
  // }

  await _impresion2({
    tipo: 'pdf',
    archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmss')}.pdf`,
    content: formatoBaseImp_Hc
  }).then(el => {
  }).catch((err) => {
    console.error(err);
  })

  if (localStorage.idOpciondata == "072") {
    await salir_HC702A();
  }
}

async function cargarDatosDetalles_HC702A() {
  $_HC702A.exa_general_hc = $_HC702A.detalles.find(e => e['COD-DETHC'] == '4005' && e['LLAVE-HC'] == $_REG_HC.llave_hc);
  $_HC702A.exa_general_hc != undefined ? $_HC702A.exa_general_hc = $_HC702A.exa_general_hc.DETALLE : false;

  $_HC702A.dato_4010 = $_HC702A.detalles.find(e => e['COD-DETHC'] == '4010' && e['LLAVE-HC'] == $_REG_HC.llave_hc);
  $_HC702A.dato_4010 != undefined ? $_HC702A.dato_4010 = $_HC702A.dato_4010.DETALLE : false;

  $_HC702A.dato_4011 = $_HC702A.detalles.find(e => e['COD-DETHC'] == '4011' && e['LLAVE-HC'] == $_REG_HC.llave_hc);
  $_HC702A.dato_4011 != undefined ? $_HC702A.dato_4011 = $_HC702A.dato_4011.DETALLE : false;

  $_HC702A.dato_4030 = $_HC702A.detalles.find(e => e['COD-DETHC'] == '4030' && e['LLAVE-HC'] == $_REG_HC.llave_hc);
  $_HC702A.dato_4030 != undefined ? $_HC702A.dato_4030 = $_HC702A.dato_4030.DETALLE : false;

  $_HC702A.dato_4040 = $_HC702A.detalles.find(e => e['COD-DETHC'] == '4040' && e['LLAVE-HC'] == $_REG_HC.llave_hc);
  $_HC702A.dato_4040 != undefined ? $_HC702A.dato_4040 = $_HC702A.dato_4040.DETALLE : false;

  $_HC702A.enf_act_hc = $_HC702A.detalles.find(e => e['COD-DETHC'] == '1001' && e['LLAVE-HC'] == $_REG_HC.llave_hc);
  if ($_HC702A.enf_act_hc != undefined) {
    $_HC702A.enf_act_hc = $_HC702A.enf_act_hc.DETALLE;
    $_HC702A.enf_act_hc = $_HC702A.enf_act_hc.replace(/\&/g, "\n").trim();
  }

  $_HC702A.dato_2010 = $_HC702A.detalles.find(e => e['COD-DETHC'] == '2010' && e['LLAVE-HC'] == $_REG_HC.llave_hc);
  $_HC702A.dato_2010 != undefined ? $_HC702A.dato_2010 = $_HC702A.dato_2010.DETALLE : false;

  $_HC702A.dato_2020 = $_HC702A.detalles.find(e => e['COD-DETHC'] == '2020' && e['LLAVE-HC'] == $_REG_HC.llave_hc);
  $_HC702A.dato_2020 != undefined ? $_HC702A.dato_2020 = $_HC702A.dato_2020.DETALLE : false;

  $_HC702A.dato_2030 = $_HC702A.detalles.find(e => e['COD-DETHC'] == '2030' && e['LLAVE-HC'] == $_REG_HC.llave_hc);
  $_HC702A.dato_2030 != undefined ? $_HC702A.dato_2030 = $_HC702A.dato_2030.DETALLE : false;

  $_HC702A.dato_2035 = $_HC702A.detalles.find(e => e['COD-DETHC'] == '2035' && e['LLAVE-HC'] == $_REG_HC.llave_hc);
  $_HC702A.dato_2035 != undefined ? $_HC702A.dato_2035 = $_HC702A.dato_2035.DETALLE : false;

  $_HC702A.dato_2040 = $_HC702A.detalles.find(e => e['COD-DETHC'] == '2040' && e['LLAVE-HC'] == $_REG_HC.llave_hc);
  $_HC702A.dato_2040 != undefined ? $_HC702A.dato_2040 = $_HC702A.dato_2040.DETALLE : false;

  $_HC702A.dato_2050 = $_HC702A.detalles.find(e => e['COD-DETHC'] == '2050' && e['LLAVE-HC'] == $_REG_HC.llave_hc);
  $_HC702A.dato_2050 != undefined ? $_HC702A.dato_2050 = $_HC702A.dato_2050.DETALLE : false;

  $_HC702A.dato_2060 = $_HC702A.detalles.find(e => e['COD-DETHC'] == '2060' && e['LLAVE-HC'] == $_REG_HC.llave_hc);
  $_HC702A.dato_2060 != undefined ? $_HC702A.dato_2060 = $_HC702A.dato_2060.DETALLE : false;

  $_HC702A.dato_2070 = $_HC702A.detalles.find(e => e['COD-DETHC'] == '2070' && e['LLAVE-HC'] == $_REG_HC.llave_hc);
  if ($_HC702A.dato_2070 != undefined) {
    $_HC702A.dato_2070 = $_HC702A.dato_2070.DETALLE;
    if(!$_HC702A.dato_2070.tipo_ws) $_HC702A.dato_2070.replace(/\&/g, "\n").trim()
  }

  $_HC702A.dato_2080 = $_HC702A.detalles.find(e => e['COD-DETHC'] == '2080' && e['LLAVE-HC'] == $_REG_HC.llave_hc);
  $_HC702A.dato_2080 != undefined ? $_HC702A.dato_2080 = $_HC702A.dato_2080.DETALLE : false;

  $_HC702A.sis_sent_hc = $_HC702A.detalles.find(e => e['COD-DETHC'] == '3010' && e['LLAVE-HC'] == $_REG_HC.llave_hc);
  if ($_HC702A.sis_sent_hc != undefined) {
    $_HC702A.sis_sent_hc = $_HC702A.sis_sent_hc.DETALLE;
    if(!$_HC702A.sis_sent_hc.tipo_ws) $_HC702A.sis_sent_hc.replace(/\&/g, "\n").trim()
  }

  $_HC702A.sis_card_hc = $_HC702A.detalles.find(e => e['COD-DETHC'] == '3020' && e['LLAVE-HC'] == $_REG_HC.llave_hc);
  $_HC702A.sis_card_hc != undefined ? $_HC702A.sis_card_hc = $_HC702A.sis_card_hc.DETALLE : false;

  $_HC702A.sis_dige_hc = $_HC702A.detalles.find(e => e['COD-DETHC'] == '3030' && e['LLAVE-HC'] == $_REG_HC.llave_hc);
  $_HC702A.sis_dige_hc != undefined ? $_HC702A.sis_dige_hc = $_HC702A.sis_dige_hc.DETALLE : false;

  $_HC702A.sis_derm_hc = $_HC702A.detalles.find(e => e['COD-DETHC'] == '3040' && e['LLAVE-HC'] == $_REG_HC.llave_hc);
  $_HC702A.sis_derm_hc != undefined ? $_HC702A.sis_derm_hc = $_HC702A.sis_derm_hc.DETALLE : false;

  $_HC702A.sis_oste_hc = $_HC702A.detalles.find(e => e['COD-DETHC'] == '3050' && e['LLAVE-HC'] == $_REG_HC.llave_hc);
  $_HC702A.sis_oste_hc != undefined ? $_HC702A.sis_oste_hc = $_HC702A.sis_oste_hc.DETALLE : false;

  $_HC702A.sis_neur_hc = $_HC702A.detalles.find(e => e['COD-DETHC'] == '3060' && e['LLAVE-HC'] == $_REG_HC.llave_hc);
  $_HC702A.sis_neur_hc != undefined ? $_HC702A.sis_neur_hc = $_HC702A.sis_neur_hc.DETALLE : false;

  $_HC702A.sis_psiq_hc = $_HC702A.detalles.find(e => e['COD-DETHC'] == '3070' && e['LLAVE-HC'] == $_REG_HC.llave_hc);
  $_HC702A.sis_psiq_hc != undefined ? $_HC702A.sis_psiq_hc = $_HC702A.sis_psiq_hc.DETALLE : false;

  $_HC702A.sis_geni_hc = $_HC702A.detalles.find(e => e['COD-DETHC'] == '3080' && e['LLAVE-HC'] == $_REG_HC.llave_hc);
  $_HC702A.sis_geni_hc != undefined ? $_HC702A.sis_geni_hc = $_HC702A.sis_geni_hc.DETALLE : false;

  $_HC702A.sis_gine_hc = $_HC702A.detalles.find(e => e['COD-DETHC'] == '3080' && e['LLAVE-HC'] == $_REG_HC.llave_hc);
  $_HC702A.sis_gine_hc != undefined ? $_HC702A.sis_gine_hc = $_HC702A.sis_gine_hc.DETALLE : false;

  $_HC702A.sis_obst_hc = $_HC702A.detalles.find(e => e['COD-DETHC'] == '3095' && e['LLAVE-HC'] == $_REG_HC.llave_hc);
  $_HC702A.sis_obst_hc != undefined ? $_HC702A.sis_obst_hc = $_HC702A.sis_obst_hc.DETALLE : false;

  $_HC702A.dato_9008 = $_HC702A.detalles.find(e => e['COD-DETHC'] == '9008' && e['LLAVE-HC'] == $_REG_HC.llave_hc);
  $_HC702A.dato_9008 != undefined ? $_HC702A.dato_9008 = $_HC702A.dato_9008.DETALLE : false;

  $_HC702A.analisis_hc = $_HC702A.detalles.find(e => e['COD-DETHC'] == '7501' && e['LLAVE-HC'] == $_REG_HC.llave_hc);
  $_HC702A.analisis_hc != undefined ? $_HC702A.analisis_hc = $_HC702A.analisis_hc.DETALLE : false;

  $_HC702A.plan_hc = $_HC702A.detalles.find(e => e['COD-DETHC'] == '7503' && e['LLAVE-HC'] == $_REG_HC.llave_hc);
  $_HC702A.plan_hc != undefined ? $_HC702A.plan_hc = $_HC702A.plan_hc.DETALLE.replace(/\&/g, "\n").trim() : false;
}

function llenarEncabezado_HC702A() {
  datos.encabezado.nombre = $_USUA_GLOBAL[0].NOMBRE;
  datos.encabezado.nit = $_USUA_GLOBAL[0].NIT;
  datos.encabezado.titulo = "EPICRISIS"
  datos.encabezado.fecha = localStorage.Usuario + moment().format(' DD-MM-YYYY hh-mm');;
  datos.paciente.nombre = $_REG_PACI.DESCRIP.replace(/\s+/g, ' ')
  datos.paciente.tipoId = $_REG_PACI['TIPO-ID'];
  isNaN($_REG_PACI.COD) == true ? aux = $_REG_PACI.COD : aux = new Intl.NumberFormat("ja-JP").format($_REG_PACI.COD);
  datos.paciente.id = aux;
  datos.paciente.foto = parseFloat($_REG_PACI.COD);
}

function llenarDatosPaciente_HC702A() {
  var horaIng = $_HC702A._hcprc.hora.substring(0, 2) + ':' + $_HC702A._hcprc.hora.substring(2, 4);
  var horaEgr = $_HC702A._hcprc.hora_egres.substring(0, 2) + ':' + $_HC702A._hcprc.hora_egres.substring(2, 4);
  datos.paciente.fechaIng = $_HC702A._hcprc.fecha.substring(6, 8) + '-' + $_HC702A._hcprc.fecha.substring(4, 6) + '-' + $_HC702A._hcprc.fecha.substring(0, 4) + '  -  ' + horaIng;
  datos.paciente.fechaEgr = $_HC702A._hcprc.egreso.substring(6, 8) + '-' + $_HC702A._hcprc.egreso.substring(4, 6) + '-' + $_HC702A._hcprc.egreso.substring(0, 4) + '  -  ' + horaEgr;
  datos.paciente.edad = $_REG_HC.edad_hc.unid_edad + $_REG_HC.edad_hc.vlr_edad;
  datos.paciente.nacim = $_REG_PACI['NACIM'].substring(6, 8) + '-' + $_REG_PACI['NACIM'].substring(4, 6) + '-' + $_REG_PACI['NACIM'].substring(0, 4);
  $_REG_PACI['SEXO'] == 'F' ? datos.paciente.sexo = 'Fem.' : datos.paciente.sexo = 'Masc';

  $_HC702A.busqCiu = $_HC702A._ciudades.find(e => e['COD'].trim() == $_REG_PACI.CIUDAD.trim());
  $_HC702A.busqCiu != undefined ? ciudad = $_HC702A.busqCiu.NOMBRE : false;
  datos.paciente.ciudad = ciudad;
  datos.paciente.telefono = $_REG_PACI['TELEFONO'];
  datos.paciente.acomp = $_REG_PACI['ACOMPA'];

  if ($_HC702A._hcprc.cierre.nit_fact == '' || $_HC702A._hcprc.cierre.nit_fact == '0000000000') {
    datos.paciente.entidad = $_REG_PACI["NOMBRE-EPS"];
  } else {
    datos.paciente.entidad = $_HC702A._hcprc.cierre.descrip_nit_fact;
  }

  datos.paciente.folio = $_REG_HC.suc_folio_hc + '-' + $_REG_HC.nro_folio_hc;

  datos.paciente.triage = $_HC702A._hcprc.rips.triage
  parseFloat($_HC702A._hcprc.rips.triage) != 0 ? datos.paciente.triage = $_HC702A._hcprc.rips.triage : datos.paciente.triage = '';

  datos.paciente.hab = $_HC702A._hcprc.cierre.hab;

  var unser = $_HC702A._unserv.find(e => e.COD == $_REG_HC.unser_hc);
  datos.paciente.unServ = unser.DESCRIP;
}

function buscarOftalmologia_HC702A() {
  if ($_HC702A.dato_4010 != undefined) {
    $_HC702A.dato_4010['agud_lej_sc_od_esq_w'] = $_HC702A.dato_4010['agud_lej_sc_od_esq_w'].replace(/\000/g, '   ');
    $_HC702A.dato_4010['agud_lej_sc_oi_esq_w'] = $_HC702A.dato_4010['agud_lej_sc_oi_esq_w'].replace(/\000/g, '   ');

    $_HC702A.dato_4010['agud_cer_sc_od_esq_w'] = $_HC702A.dato_4010['agud_cer_sc_od_esq_w'].replace(/\000/g, '   ');
    $_HC702A.dato_4010['agud_cer_sc_oi_esq_w'] = $_HC702A.dato_4010['agud_cer_sc_oi_esq_w'].replace(/\000/g, '   ');

    $_HC702A.dato_4010['agud_lej_cc_od_esq_w'] = $_HC702A.dato_4010['agud_lej_cc_od_esq_w'].replace(/\000/g, '   ');
    $_HC702A.dato_4010['agud_lej_cc_oi_esq_w'] = $_HC702A.dato_4010['agud_lej_cc_oi_esq_w'].replace(/\000/g, '   ');

    $_HC702A.dato_4010['agud_cer_cc_od_esq_w'] = $_HC702A.dato_4010['agud_cer_cc_od_esq_w'].replace(/\000/g, '   ');
    $_HC702A.dato_4010['agud_cer_cc_oi_esq_w'] = $_HC702A.dato_4010['agud_cer_cc_oi_esq_w'].replace(/\000/g, '   ');

    $_HC702A.dato_4010['form_lej_od_esq_w'] = $_HC702A.dato_4010['form_lej_od_esq_w'].replace(/\000/g, '   ');
    $_HC702A.dato_4010['form_lej_oi_esq_w'] = $_HC702A.dato_4010['form_lej_oi_esq_w'].replace(/\000/g, '   ');
    $_HC702A.dato_4010['form_lej_ad_esq_w'] = $_HC702A.dato_4010['form_lej_ad_esq_w'].replace(/\000/g, '   ');

    $_HC702A.dato_4010['form_cer_od_esq_w'] = $_HC702A.dato_4010['form_cer_od_esq_w'].replace(/\000/g, '   ');
    $_HC702A.dato_4010['form_cer_oi_esq_w'] = $_HC702A.dato_4010['form_cer_oi_esq_w'].replace(/\000/g, '   ');
    $_HC702A.dato_4010['form_cer_ad_esq_w'] = $_HC702A.dato_4010['form_cer_ad_esq_w'].replace(/\000/g, '   ');

    if ($_HC702A.dato_4010['agud_lej_sc_od_esq_w'].trim() != '' || $_HC702A.dato_4010['agud_cer_sc_oi_esq_w'].trim() != ''
      || $_HC702A.dato_4010['agud_lej_cc_od_esq_w'].trim() != '' || $_HC702A.dato_4010['agud_cer_cc_od_esq_w'].trim() != ''
      || $_HC702A.dato_4010['form_lej_od_esq_w'].trim() != '' || $_HC702A.dato_4010['form_cer_od_esq_w'].trim() != ''
      || $_HC702A.dato_4011['pio_ocu_esq_w'].trim() != '' || $_HC702A.dato_4011['motili_esq_w'][0]['motil1_ocu_esq_w'].trim() != ''
      || $_HC702A.dato_4011['exter_esq_w'][0]['exter1_ocu_esq_w'].trim() != '' || $_HC702A.dato_4011['biomic_esq_w'][0]['biomic1_ocu_esq_w'].trim() != ''
      || $_HC702A.dato_4011['fondo_esq_w'][0]['fondo1_ocu_esq_w'].trim() != '') {
      $_HC702A._datos.sw_espec = 'OFT';
    }

  } else {
    datos.examVisual.bandera = false;
    console.log("no hay oftalmologia");
  }
}

function buscarOtorrino_HC702A() {
  if ($_HC702A.dato_4030 != undefined) {
    ($_HC702A.dato_4030['pabel_4030'].trim() != '' || $_HC702A.dato_4030['otorrino_4030'].trim() != '') ? ($_HC702A.sw_espec = 'OTO', datos.otorrino.bandera = true) : false;
  } else {
    datos.otorrino.bandera = false;
  }
}

function imprimirProcedencia_HC702A() {
  if ($_HC702A._hcprc.proceden.trim() != '') {
    datos.subs.titulos.push('PROCEDENCIA:');
    datos.subs.contenido.push($_HC702A._hcprc.proceden)
  }
}

function imprimirMotivo_HC702A() {
  if ($_HC702A._hcprc.motivo.trim() != '') {
    datos.subs.titulos.push('MOTIVO DE CONSULTA:');
    datos.subs.contenido.push($_HC702A._hcprc.motivo);
  }
}

function imprimirEnfermedadActual_HC702A() {
  if ($_HC702A.enf_act_hc != undefined) {
    // continue
    if ($_HC702A.enf_act_hc.trim() != "") {
      datos.subs.titulos.push('ENFERMEDAD ACTUAL:');
      datos.subs.contenido.push($_HC702A.enf_act_hc);
    }
  } else {
    datos.subs.titulos.push('ENFERMEDAD ACTUAL:');
    datos.subs.contenido.push('');
  }

  if ($_HC702A.dato_2010 == undefined && $_HC702A.dato_2020 == undefined &&
    $_HC702A.dato_2030 == undefined && $_HC702A.dato_2035 == undefined &&
    $_HC702A.dato_2040 == undefined && $_HC702A.dato_2050 == undefined &&
    $_HC702A.dato_2060 == undefined && $_HC702A.dato_2070 == undefined) {
    // continue
  } else {
    datos.subs.titulos.push('ANTECEDENTES');
    datos.subs.contenido.push('');
  }

  if ($_HC702A.dato_2010 != undefined) {
    if ($_HC702A.dato_2010.trim() != "") {
      datos.subs.titulos.push('MEDICOS:');
      datos.subs.contenido.push($_HC702A.dato_2010);
    }
  }

  if ($_HC702A.dato_2020 != undefined) {
    if ($_HC702A.dato_2020.trim() != "") {
      datos.subs.titulos.push('QUIRURGICOS:');
      datos.subs.contenido.push($_HC702A.dato_2020);
    }
  }

  if ($_HC702A.dato_2030 != undefined) {
    if ($_HC702A.dato_2030.trim() != "") {
      datos.subs.titulos.push('FARMACOLOGICOS:');
      datos.subs.contenido.push($_HC702A.dato_2030);
    }
  }

  if ($_HC702A.dato_2035 != undefined) {
    if ($_HC702A.dato_2035.trim() != "")
      datos.subs.titulos.push('TOXICO ALERGICOS:');
    datos.subs.contenido.push($_HC702A.dato_2035);
  }

  if ($_HC702A.dato_2040 != undefined) {
    if ($_HC702A.dato_2040.trim() != "") {
      datos.subs.titulos.push('TRAUMATICOS:');
      datos.subs.contenido.push($_HC702A.dato_2040);
    }
  }

  if ($_HC702A.dato_2050 != undefined) {
    if ($_HC702A.dato_2050.trim() != "") {
      datos.subs.titulos.push('OCUPACIONALES:');
      datos.subs.contenido.push($_HC702A.dato_2050);
    }
  }

  if ($_HC702A.dato_2060 != undefined) {
    if ($_HC702A.dato_2060.trim() != "") {
      datos.subs.titulos.push('GINECO-OBSTETRICOS:');
      datos.subs.contenido.push($_HC702A.dato_2060);
    }
  }

  if ($_HC702A.dato_2070 != undefined) {
    if($_HC702A.dato_2070.tipo_ws) {
      datos.subs.titulos.push("");
      datos.subs.contenido.push(antecedentes2070_impHc($_HC702A.dato_2070));
    } else if ($_HC702A.dato_2070.trim() != "") {
      datos.subs.titulos.push('OTROS  ANTECEDENTES:');
      datos.subs.contenido.push($_HC702A.dato_2070);
    }
  }

  if ($_HC702A.dato_2080 != undefined) {
    ($_HC702A.dato_2080['edad2_her1_esq_w'].trim() == '') ? $_HC702A.dato_2080['edad2_her1_esq_w'] = 0 : false;
    ($_HC702A.dato_2080['edad2_pad_esq_w'].trim() == '') ? $_HC702A.dato_2080['edad2_pad_esq_w'] = 0 : false;
    ($_HC702A.dato_2080['edad2_mad_esq_w'].trim() == '') ? $_HC702A.dato_2080['edad2_mad_esq_w'] = 0 : false;

    if ($_REG_HC.edad_hc.vlr_edad > 12) {
      // continue
    } else {
      if (parseFloat($_HC702A.dato_2080['edad2_her1_esq_w']) > 0 || parseFloat($_HC702A.dato_2080['edad2_pad_esq_w']) > 0 || parseFloat($_HC702A.dato_2080['edad2_mad_esq_w']) > 0) {
        imprimirGenograma_HC702A();
      }
    }
  }
}

// IMPRIME GENOGRAMA (ARBOL - ESQUEMA)
function imprimirGenograma_HC702A() {
  if ($_HC702A.dato_2080 != undefined) {
    datos.genograma.bandera = true
    datos.genograma.pad = $_HC702A.dato_2080['edad1_pad_esq_w'] + $_HC702A.dato_2080['edad2_pad_esq_w'];
    datos.genograma.mad = $_HC702A.dato_2080['edad1_mad_esq_w'] + $_HC702A.dato_2080['edad2_mad_esq_w'];

    edad = '';
    switch ($_HC702A.dato_2080['edad1_her1_esq_w']) {
      case 'D': edad = 'Dias'; break;
      case 'M': edad = 'Meses'; break;
      case 'A': edad = 'Años'; break;
      default: edad = '    '; break;
    }
    datos.genograma.her.push($_HC702A.dato_2080['sexo_her1_esq_w'] + '  ' + $_HC702A.dato_2080['edad2_her1_esq_w'] + '  ' + edad);

    edad = '';
    switch ($_HC702A.dato_2080['edad1_her2_esq_w']) {
      case 'D': edad = 'Dias'; break;
      case 'M': edad = 'Meses'; break;
      case 'A': edad = 'Años'; break;
      default: edad = '    '; break;
    }
    datos.genograma.her.push($_HC702A.dato_2080['sexo_her2_esq_w'] + '  ' + $_HC702A.dato_2080['edad2_her2_esq_w'] + '  ' + edad);

    edad = '';
    switch ($_HC702A.dato_2080['edad1_her3_esq_w']) {
      case 'D': edad = 'Dias'; break;
      case 'M': edad = 'Meses'; break;
      case 'A': edad = 'Años'; break;
      default: edad = '    '; break;
    }
    datos.genograma.her.push($_HC702A.dato_2080['sexo_her3_esq_w'] + '  ' + $_HC702A.dato_2080['edad2_her3_esq_w'] + '  ' + edad);

    edad = '';
    switch ($_HC702A.dato_2080['edad1_her4_esq_w']) {
      case 'D': edad = 'Dias'; break;
      case 'M': edad = 'Meses'; break;
      case 'A': edad = 'Años'; break;
      default: edad = '    '; break;
    }
    datos.genograma.her.push($_HC702A.dato_2080['sexo_her4_esq_w'] + '  ' + $_HC702A.dato_2080['edad2_her4_esq_w'] + '  ' + edad);

    edad = '';
    switch ($_HC702A.dato_2080['edad1_her5_esq_w']) {
      case 'D': edad = 'Dias'; break;
      case 'M': edad = 'Meses'; break;
      case 'A': edad = 'Años'; break;
      default: edad = '    '; break;
    }
    datos.genograma.her.push($_HC702A.dato_2080['sexo_her5_esq_w'] + '  ' + $_HC702A.dato_2080['edad2_her5_esq_w'] + '  ' + edad);

    edad = '';
    switch ($_HC702A.dato_2080['edad1_her6_esq_w']) {
      case 'D': edad = 'Dias'; break;
      case 'M': edad = 'Meses'; break;
      case 'A': edad = 'Años'; break;
      default: edad = '    '; break;
    }
    datos.genograma.her.push($_HC702A.dato_2080['sexo_her6_esq_w'] + '  ' + $_HC702A.dato_2080['edad2_her6_esq_w'] + '  ' + edad);

    return true;
  } else {
    datos.genograma.bandera = false
  }
}

function imprimirRevisionSistemas_HC702A() {
  if ($_HC702A.sis_sent_hc == undefined && $_HC702A.sis_card_hc == undefined &&
    $_HC702A.sis_dige_hc == undefined && $_HC702A.sis_derm_hc == undefined &&
    $_HC702A.sis_oste_hc == undefined && $_HC702A.sis_neur_hc == undefined &&
    $_HC702A.sis_psiq_hc == undefined && $_HC702A.sis_geni_hc == undefined &&
    $_HC702A.sis_gine_hc == undefined && $_HC702A.sis_obst_hc == undefined) {
    // continue
  } else {
    datos.subs.titulos.push('R E V I S I O N  P O R  S I S T E M A S');
    datos.subs.contenido.push('');
  }

  if ($_HC702A.sis_sent_hc != undefined) {
    if($_HC702A.sis_sent_hc.tipo_ws) {
      datos.subs.titulos.push("");
      datos.subs.contenido.push(antecedentes3010_impHc($_HC702A.sis_sent_hc));
    } else if ($_HC702A.sis_sent_hc.trim() != "") {
      datos.subs.titulos.push('SENTIDOS:');
      datos.subs.contenido.push($_HC702A.sis_sent_hc);
    }
  }

  if ($_HC702A.sis_card_hc != undefined) {
    if ($_HC702A.sis_card_hc.trim() != "") {
      datos.subs.titulos.push('CARDIOPULMONAR:');
      datos.subs.contenido.push($_HC702A.sis_card_hc);
    }
  }

  if ($_HC702A.sis_dige_hc != undefined) {
    if ($_HC702A.sis_dige_hc.trim() != "") {
      datos.subs.titulos.push('DIGESTIVO:');
      datos.subs.contenido.push($_HC702A.sis_dige_hc);
    }
  }

  if ($_HC702A.sis_derm_hc != undefined) {
    if ($_HC702A.sis_derm_hc.trim() != "") {
      datos.subs.titulos.push('DERMATOLOGICO:');
      datos.subs.contenido.push($_HC702A.sis_derm_hc);
    }
  }

  if ($_HC702A.sis_oste_hc != undefined) {
    if ($_HC702A.sis_oste_hc.trim() != "") {
      datos.subs.titulos.push('OSTEOARTICULAR:');
      datos.subs.contenido.push($_HC702A.sis_oste_hc);
    }
  }

  if ($_HC702A.sis_neur_hc != undefined) {
    if ($_HC702A.sis_neur_hc.trim() != "") {
      datos.subs.titulos.push('NEUROLOGICO:');
      datos.subs.contenido.push($_HC702A.sis_neur_hc);
    }
  }

  if ($_HC702A.sis_psiq_hc != undefined) {
    if ($_HC702A.sis_psiq_hc.trim() != "") {
      datos.subs.titulos.push('PSIQUIATRICO:');
      datos.subs.contenido.push($_HC702A.sis_psiq_hc);
    }
  }

  if ($_HC702A.sis_geni_hc != undefined) {
    if ($_HC702A.sis_geni_hc.trim() != "") {
      datos.subs.titulos.push('GENITOURINARIO:');
      datos.subs.contenido.push($_HC702A.sis_geni_hc);
    }
  }

  if ($_HC702A.sis_gine_hc != undefined) {
    if ($_HC702A.sis_gine_hc.trim() != "") {
      datos.subs.titulos.push('GINECO-OBSTETRICO:');
      datos.subs.contenido.push($_HC702A.sis_gine_hc);
    }
  }

  if ($_HC702A.sis_obst_hc != undefined) {
    if ($_HC702A.sis_obst_hc.trim() != "") {
      datos.subs.titulos.push('OBSTETRICO:');
      datos.subs.contenido.push($_HC702A.sis_obst_hc);
    }
  }
}

function imprimirOftalmologia_HC702A() {
  if ($_HC702A.dato_4010 != undefined) {
    datos.examVisual.bandera = true;
    if ($_HC702A.dato_4010['agud_lej_sc_od_esq_w'].trim() != '' || $_HC702A.dato_4010['agud_Cer_cc_oi_esq_w'].trim() != '' || $_HC702A.dato_4010['agud_lej_cc_od_esq_w'].trim() != '') {
      datos.examVisual.tit.push('AGUDEZA VISUAL');
      datos.examVisual.dato1.push('lejos (sc)');
      datos.examVisual.dato2.push('cerca (sc)');
      datos.examVisual.dato3.push('lejos (cc)');
      datos.examVisual.dato4.push('cerca (cc)');

      datos.examVisual.tit.push('Ojo Derecho');
      datos.examVisual.dato1.push($_HC702A.dato_4010['agud_lej_sc_od_esq_w']);
      datos.examVisual.dato2.push($_HC702A.dato_4010['agud_cer_sc_od_esq_w']);
      datos.examVisual.dato3.push($_HC702A.dato_4010['agud_lej_cc_od_esq_w']);
      datos.examVisual.dato4.push($_HC702A.dato_4010['agud_cer_cc_od_esq_w']);

      datos.examVisual.tit.push('Ojo Izquierda');
      datos.examVisual.dato1.push($_HC702A.dato_4010['agud_lej_sc_oi_esq_w']);
      datos.examVisual.dato2.push($_HC702A.dato_4010['agud_cer_sc_oi_esq_w']);
      datos.examVisual.dato3.push($_HC702A.dato_4010['agud_lej_cc_oi_esq_w']);
      datos.examVisual.dato4.push($_HC702A.dato_4010['agud_cer_cc_oi_esq_w']);

      datos.examVisual.tit.push(' ');
      datos.examVisual.dato1.push('Fórmula uso lejos');
      datos.examVisual.dato2.push('Fórmula uso cerca');
      datos.examVisual.dato3.push('Refracc. estat');
      datos.examVisual.dato4.push('Refracc. dinamica');

      datos.examVisual.tit.push('Ojo Derecho');
      datos.examVisual.dato1.push($_HC702A.dato_4010['form_lej_od_esq_w']);
      datos.examVisual.dato2.push($_HC702A.dato_4010['form_cer_od_esq_w']);
      datos.examVisual.dato3.push($_HC702A.dato_4010['refracc_esta_od_esq_w']);
      datos.examVisual.dato4.push($_HC702A.dato_4010['refracc_dina_od_esq_w']);

      datos.examVisual.tit.push('Ojo Izquierda');
      datos.examVisual.dato1.push($_HC702A.dato_4010['form_lej_oi_esq_w']);
      datos.examVisual.dato2.push($_HC702A.dato_4010['form_cer_oi_esq_w']);
      datos.examVisual.dato3.push($_HC702A.dato_4010['refracc_esta_oi_esq_w']);
      datos.examVisual.dato4.push($_HC702A.dato_4010['refracc_dina_oi_esq_w']);

      datos.examVisual.tit.push('Adición');
      datos.examVisual.dato1.push($_HC702A.dato_4010['form_lej_ad_esq_w']);
      datos.examVisual.dato2.push($_HC702A.dato_4010['form_cer_ad_esq_w']);
      datos.examVisual.dato3.push($_HC702A.dato_4010['refracc_esta_ad_esq_w']);
      datos.examVisual.dato4.push($_HC702A.dato_4010['refracc_dina_ad_esq_w']);

      datos.examVisual.tit.push(' ');
      datos.examVisual.dato1.push('Queratometria');
      datos.examVisual.dato2.push('Subjetivo');
      datos.examVisual.dato3.push(' ');
      datos.examVisual.dato4.push(' ');

      datos.examVisual.tit.push('Ojo Derecho');
      datos.examVisual.dato1.push($_HC702A.dato_4010['queratro_od_esq_w']);
      datos.examVisual.dato2.push($_HC702A.dato_4010['subjeti_od_esq_w']);
      datos.examVisual.dato3.push($_HC702A.dato_4010[' ']);
      datos.examVisual.dato4.push($_HC702A.dato_4010[' ']);

      datos.examVisual.tit.push('Ojo Izquierdo');
      datos.examVisual.dato1.push($_HC702A.dato_4010['queratro_oi_esq_w']);
      datos.examVisual.dato2.push($_HC702A.dato_4010['subjeti_oi_esq_w']);
      datos.examVisual.dato3.push($_HC702A.dato_4010[' ']);
      datos.examVisual.dato4.push($_HC702A.dato_4010[' ']);

      datos.examVisual.tit.push('Adición');
      datos.examVisual.dato1.push($_HC702A.dato_4010[' ']);
      datos.examVisual.dato2.push($_HC702A.dato_4010['subjeti_ad_esq_w']);
      datos.examVisual.dato3.push($_HC702A.dato_4010[' ']);
      datos.examVisual.dato4.push($_HC702A.dato_4010[' ']);
    }
  }

  // IMPRIME EXAMEN VUSUAL 2
  if ($_HC702A.dato_4011 != undefined) {       // VERIFICACION DE QUE EXISTA DETALLE 4011
    datos.examVisual2.bandera = true;
    if ($_HC702A.dato_4011['pio_ocu_esq_w'].trim() != '' || $_HC702A.dato_4011['motil_esq_w'][0]['motil1_ocu_esq_w'].trim() != ''
      || $_HC702A.dato_4011['exter_esq_w'][0]['exter1_ocu_esq_w'].trim() != '' || $_HC702A.dato_4011['biomic_esq_w'][0]['biomic1_ocu_esq_w'].trim() != ''
      || $_HC702A.dato_4011['fondo_esq_w'][0]['fondo1_ocu_esq_w'].trim() != '') {
      datos.examVisual2.principal = 'EXAMEN EXTERNO'
    } else {
      datos.examVisual2.principal = ''
    }
    if ($_HC702A.dato_4011['pio_ocu_esq_w'].trim() != '') {
      datos.examVisual2.tit.push('P.I.O:');
      datos.examVisual2.cont.push($_HC702A.dato_4011['pio_ocu_esq_w']);
    }

    // movilidad ocular
    if ($_HC702A.dato_4011['motili_esq_w'][0].motil1_ocu_esq_w.trim() != '') {
      datos.examVisual2.tit.push('MOVILIDAD OCULAR:');
      datos.examVisual2.cont.push($_HC702A.dato_4011['motili_esq_w'][0].motil1_ocu_esq_w + $_HC702A.dato_4011['motili_esq_w'][0].motil2_ocu_esq_w);
    }
    if ($_HC702A.dato_4011['motili_esq_w'][1].motil1_ocu_esq_w.trim() != '') {
      datos.examVisual2.tit.push('');
      datos.examVisual2.cont.push($_HC702A.dato_4011['motili_esq_w'][1].motil1_ocu_esq_w + $_HC702A.dato_4011['motili_esq_w'][1].motil2_ocu_esq_w);
    }
    if ($_HC702A.dato_4011['motili_esq_w'][2].motil1_ocu_esq_w.trim() != '') {
      datos.examVisual2.tit.push('');
      datos.examVisual2.cont.push($_HC702A.dato_4011['motili_esq_w'][2].motil1_ocu_esq_w + $_HC702A.dato_4011['motili_esq_w'][2].motil2_ocu_esq_w);
    }

    // examen externos
    if ($_HC702A.dato_4011['exter_esq_w'][0].exter1_ocu_esq_w.trim() != '') {
      datos.examVisual2.tit.push('EXAMEN EXTERNOS:');
      datos.examVisual2.cont.push($_HC702A.dato_4011['exter_esq_w'][0].exter1_ocu_esq_w + $_HC702A.dato_4011['exter_esq_w'][0].exter2_ocu_esq_w);
    }
    if ($_HC702A.dato_4011['exter_esq_w'][1].exter1_ocu_esq_w.trim() != '') {
      datos.examVisual2.tit.push('');
      datos.examVisual2.cont.push($_HC702A.dato_4011['exter_esq_w'][1].exter1_ocu_esq_w + $_HC702A.dato_4011['exter_esq_w'][1].exter2_ocu_esq_w);
    }
    if ($_HC702A.dato_4011['exter_esq_w'][2].exter1_ocu_esq_w.trim() != '') {
      datos.examVisual2.tit.push('');
      datos.examVisual2.cont.push($_HC702A.dato_4011['exter_esq_w'][2].exter1_ocu_esq_w + $_HC702A.dato_4011['exter_esq_w'][2].exter2_ocu_esq_w);
    }
    if ($_HC702A.dato_4011['exter_esq_w'][3].exter1_ocu_esq_w.trim() != '') {
      datos.examVisual2.tit.push('');
      datos.examVisual2.cont.push($_HC702A.dato_4011['exter_esq_w'][3].exter1_ocu_esq_w + $_HC702A.dato_4011['exter_esq_w'][3].exter2_ocu_esq_w);
    }

    // biomicroscopio
    if ($_HC702A.dato_4011['biomic_esq_w'][0].biomic1_ocu_esq_w.trim() != '') {
      datos.examVisual2.tit.push('BIOMICROSCOPIO:');
      datos.examVisual2.cont.push($_HC702A.dato_4011['biomic_esq_w'][0].biomic1_ocu_esq_w + $_HC702A.dato_4011['biomic_esq_w'][0].biomic2_ocu_esq_w);
    }
    if ($_HC702A.dato_4011['biomic_esq_w'][1].biomic1_ocu_esq_w.trim() != '') {
      datos.examVisual2.tit.push('');
      datos.examVisual2.cont.push($_HC702A.dato_4011['biomic_esq_w'][1].biomic1_ocu_esq_w + $_HC702A.dato_4011['biomic_esq_w'][1].biomic2_ocu_esq_w);
    }
    if ($_HC702A.dato_4011['biomic_esq_w'][2].biomic1_ocu_esq_w.trim() != '') {
      datos.examVisual2.tit.push('');
      datos.examVisual2.cont.push($_HC702A.dato_4011['biomic_esq_w'][2].biomic1_ocu_esq_w + $_HC702A.dato_4011['biomic_esq_w'][2].biomic2_ocu_esq_w);
    }
    if ($_HC702A.dato_4011['biomic_esq_w'][3].biomic1_ocu_esq_w.trim() != '') {
      datos.examVisual2.tit.push('');
      datos.examVisual2.cont.push($_HC702A.dato_4011['biomic_esq_w'][3].biomic1_ocu_esq_w + $_HC702A.dato_4011['biomic_esq_w'][3].biomic2_ocu_esq_w);
    }
    if ($_HC702A.dato_4011['biomic_esq_w'][4].biomic1_ocu_esq_w.trim() != '') {
      datos.examVisual2.tit.push('');
      datos.examVisual2.cont.push($_HC702A.dato_4011['biomic_esq_w'][4].biomic1_ocu_esq_w + $_HC702A.dato_4011['biomic_esq_w'][4].biomic2_ocu_esq_w);
    }

    // fondo de ojo
    if ($_HC702A.dato_4011['fondo_esq_w'][0].fondo1_ocu_esq_w.trim() != '') {
      datos.examVisual2.tit.push('FONDO DE OJO:');
      datos.examVisual2.cont.push($_HC702A.dato_4011['fondo_esq_w'][0].fondo1_ocu_esq_w + $_HC702A.dato_4011['fondo_esq_w'][0].fondo2_ocu_esq_w);
    }
    if ($_HC702A.dato_4011['fondo_esq_w'][1].fondo1_ocu_esq_w.trim() != '') {
      datos.examVisual2.tit.push('');
      datos.examVisual2.cont.push($_HC702A.dato_4011['fondo_esq_w'][1].fondo1_ocu_esq_w + $_HC702A.dato_4011['fondo_esq_w'][1].fondo2_ocu_esq_w);
    }
    if ($_HC702A.dato_4011['fondo_esq_w'][2].fondo1_ocu_esq_w.trim() != '') {
      datos.examVisual2.tit.push('');
      datos.examVisual2.cont.push($_HC702A.dato_4011['fondo_esq_w'][2].fondo1_ocu_esq_w + $_HC702A.dato_4011['fondo_esq_w'][2].fondo2_ocu_esq_w);
    }
    if ($_HC702A.dato_4011['fondo_esq_w'][3].fondo1_ocu_esq_w.trim() != '') {
      datos.examVisual2.tit.push('');
      datos.examVisual2.cont.push($_HC702A.dato_4011['fondo_esq_w'][3].fondo1_ocu_esq_w + $_HC702A.dato_4011['fondo_esq_w'][3].fondo2_ocu_esq_w);
    }
    if ($_HC702A.dato_4011['fondo_esq_w'][4].fondo1_ocu_esq_w.trim() != '') {
      datos.examVisual2.tit.push('');
      datos.examVisual2.cont.push($_HC702A.dato_4011['fondo_esq_w'][4].fondo1_ocu_esq_w + $_HC702A.dato_4011['fondo_esq_w'][4].fondo2_ocu_esq_w);
    }
    if ($_HC702A.dato_4011['fondo_esq_w'][5].fondo1_ocu_esq_w.trim() != '') {
      datos.examVisual2.tit.push('');
      datos.examVisual2.cont.push($_HC702A.dato_4011['fondo_esq_w'][5].fondo1_ocu_esq_w + $_HC702A.dato_4011['fondo_esq_w'][5].fondo2_ocu_esq_w);
    }
  } else {
    datos.examVisual2.bandera = false;
  }
}

function imprimirSignos_HC702A() {
  if ((parseFloat($_HC702A._hcprc.signos.peso) == 0 || $_HC702A._hcprc.signos.peso.trim() == '')
    && (parseFloat($_HC702A._hcprc.signos.talla) == 0 || $_HC702A._hcprc.signos.talla.trim() == '')
    && (parseFloat($_HC702A._hcprc.signos.temp) == 0 || $_HC702A._hcprc.signos.temp.trim() == '')
    && (parseFloat($_HC702A._hcprc.signos.fcard) == 0 || $_HC702A._hcprc.signos.fcard.trim() == '')
    && (parseFloat($_HC702A._hcprc.signos.fresp) == 0 || $_HC702A._hcprc.signos.fresp.trim() == '')
    && (parseFloat($_HC702A._hcprc.signos.tens1) == 0 || $_HC702A._hcprc.signos.tens1.trim() == '')) {
    datos.examFisico.bandera = false;
  } else {
    datos.examFisico.bandera = true;
    imprimirCuadroSignos_HC702A();

    if ($_HC702A._hcprc.edad.substring(0, 1) == 'A' && parseFloat($_HC702A._hcprc.edad.substring(1, 4)) > 18
      && ($_HC702A._hcprc.rips.embarazo == '4' || $_HC702A._hcprc.rips.embarazo == '0' || $_HC702A._hcprc.rips.embarazo == '9' || $_HC702A._hcprc.rips.embarazo.trim() == '')) {
      datos.examFisico.imc = calcularRangoImc($_HC702A._hcprc.signos.imc);
    } else if ($_HC702A.dato_4040 != undefined) {
      aux = '';
      var e2 = Math.round(parseFloat($_HC702A.dato_4040.obstetric_esq_w.edad_gest_regla_esq_w));
      var imc2 = parseFloat($_HC702A._hcprc.signos.imc);
      if (
        ((e2 == 6 || e2 == 7) && imc2 > 30.0)
        || (e2 == 8 && imc2 > 30.1)
        || ((e2 == 9 || e2 == 10) && imc2 > 30.2)
        || ((e2 == 11 || e2 == 12) && imc2 > 30.3)
        || (e2 == 13 && imc2 > 30.4)
        || (e2 == 14 && imc2 > 30.5)
        || (e2 == 15 && imc2 > 30.6)
        || (e2 == 16 && imc2 > 30.7)
        || (e2 == 17 && imc2 > 30.8)
        || ((e2 == 18 || e2 == 19) && imc2 > 30.9)
        || (e2 == 20 && imc2 > 31.0)
        || (e2 == 21 && imc2 > 31.1)
        || (e2 == 22 && imc2 > 31.2)
        || (e2 == 23 && imc2 > 31.3)
        || (e2 == 24 && imc2 > 31.5)
        || (e2 == 25 && imc2 > 31.6)
        || (e2 == 26 && imc2 > 31.7)
        || (e2 == 27 && imc2 > 31.8)
        || (e2 == 28 && imc2 > 31.9)
        || (e2 == 29 && imc2 > 32.0)
        || (e2 == 30 && imc2 > 32.1)
        || (e2 == 31 && imc2 > 32.2)
        || (e2 == 32 && imc2 > 32.3)
        || (e2 == 33 && imc2 > 32.4)
        || (e2 == 34 && imc2 > 32.5)
        || (e2 == 35 && imc2 > 32.6)
        || (e2 == 36 && imc2 > 32.7)
        || (e2 == 37 && imc2 > 32.8)
        || (e2 == 38 && imc2 > 32.9)
        || (e2 == 39 && imc2 > 33.0)
        || (e2 == 40 && imc2 > 33.1)
        || ((e2 == 41 || e2 == 42) && imc2 > 33.2)
      ) {
        aux = 'OBESIDAD PARA LA EDAD GESTACIONAL';
      } else if (
        ((e2 == 6 || e2 == 7) && (imc2 >= 25.0 && imc2 <= 30))
        || (e2 == 8 && (imc2 >= 25.1 && imc2 <= 30.1))
        || (e2 == 9 && (imc2 >= 25.2 && imc2 <= 30.2))
        || (e2 == 10 && (imc2 >= 25.3 && imc2 <= 30.2))
        || (e2 == 11 && (imc2 >= 25.4 && imc2 <= 30.3))
        || (e2 == 12 && (imc2 >= 25.5 && imc2 <= 30.3))
        || (e2 == 13 && (imc2 >= 25.7 && imc2 <= 30.4))
        || (e2 == 14 && (imc2 >= 25.8 && imc2 <= 30.5))
        || (e2 == 15 && (imc2 >= 25.9 && imc2 <= 30.6))
        || (e2 == 16 && (imc2 >= 26.0 && imc2 <= 30.7))
        || (e2 == 17 && (imc2 >= 26.1 && imc2 <= 30.8))
        || (e2 == 18 && (imc2 >= 26.2 && imc2 <= 30.9))
        || (e2 == 19 && (imc2 >= 26.3 && imc2 <= 30.9))
        || (e2 == 20 && (imc2 >= 26.4 && imc2 <= 31.0))
        || (e2 == 21 && (imc2 >= 26.5 && imc2 <= 31.1))
        || (e2 == 22 && (imc2 >= 26.7 && imc2 <= 31.2))
        || (e2 == 23 && (imc2 >= 26.8 && imc2 <= 31.3))
        || (e2 == 24 && (imc2 >= 27.0 && imc2 <= 31.5))
        || (e2 == 25 && (imc2 >= 27.1 && imc2 <= 31.6))
        || (e2 == 26 && (imc2 >= 27.2 && imc2 <= 31.7))
        || (e2 == 27 && (imc2 >= 27.4 && imc2 <= 31.8))
        || (e2 == 28 && (imc2 >= 27.6 && imc2 <= 31.9))
        || (e2 == 29 && (imc2 >= 27.7 && imc2 <= 32.0))
        || (e2 == 30 && (imc2 >= 27.9 && imc2 <= 32.1))
        || (e2 == 31 && (imc2 >= 28.0 && imc2 <= 32.2))
        || (e2 == 32 && (imc2 >= 28.1 && imc2 <= 32.3))
        || (e2 == 33 && (imc2 >= 28.2 && imc2 <= 32.4))
        || (e2 == 34 && (imc2 >= 28.4 && imc2 <= 32.5))
        || (e2 == 35 && (imc2 >= 28.5 && imc2 <= 32.6))
        || (e2 == 36 && (imc2 >= 28.6 && imc2 <= 32.7))
        || (e2 == 37 && (imc2 >= 28.8 && imc2 <= 32.8))
        || (e2 == 38 && (imc2 >= 28.9 && imc2 <= 32.9))
        || (e2 == 39 && (imc2 >= 29.0 && imc2 <= 33.0))
        || (e2 == 40 && (imc2 >= 29.2 && imc2 <= 33.1))
        || ((e2 == 41 || e2 == 42) && (imc2 >= 29.3 && imc2 <= 33.3))
      ) {
        aux = 'SOBREPESO PARA LA EDAD GESTACIONAL';
      } else if (
        (e2 == 6 && (imc2 >= 20.0 && imc2 <= 24.9))
        || (e2 == 7 && (imc2 >= 20.1 && imc2 <= 24.9))
        || (e2 == 8 && (imc2 >= 20.2 && imc2 <= 25.0))
        || (e2 == 9 && (imc2 >= 20.2 && imc2 <= 25.1))
        || (e2 == 10 && (imc2 >= 20.3 && imc2 <= 25.2))
        || (e2 == 11 && (imc2 >= 20.4 && imc2 <= 25.3))
        || (e2 == 12 && (imc2 >= 20.5 && imc2 <= 25.4))
        || (e2 == 13 && (imc2 >= 20.7 && imc2 <= 25.6))
        || (e2 == 14 && (imc2 >= 20.8 && imc2 <= 25.7))
        || (e2 == 15 && (imc2 >= 20.9 && imc2 <= 25.8))
        || (e2 == 16 && (imc2 >= 21.1 && imc2 <= 25.9))
        || (e2 == 17 && (imc2 >= 21.2 && imc2 <= 26.0))
        || (e2 == 18 && (imc2 >= 21.3 && imc2 <= 26.1))
        || (e2 == 19 && (imc2 >= 21.5 && imc2 <= 26.2))
        || (e2 == 20 && (imc2 >= 21.6 && imc2 <= 26.3))
        || (e2 == 21 && (imc2 >= 21.8 && imc2 <= 26.4))
        || (e2 == 22 && (imc2 >= 21.9 && imc2 <= 26.6))
        || (e2 == 23 && (imc2 >= 22.1 && imc2 <= 26.7))
        || (e2 == 24 && (imc2 >= 22.3 && imc2 <= 26.9))
        || (e2 == 25 && (imc2 >= 22.5 && imc2 <= 27.0))
        || (e2 == 26 && (imc2 >= 22.7 && imc2 <= 27.2))
        || (e2 == 27 && (imc2 >= 22.8 && imc2 <= 27.3))
        || (e2 == 28 && (imc2 >= 23.0 && imc2 <= 27.5))
        || (e2 == 29 && (imc2 >= 23.2 && imc2 <= 27.6))
        || (e2 == 30 && (imc2 >= 23.4 && imc2 <= 27.8))
        || (e2 == 31 && (imc2 >= 23.5 && imc2 <= 27.9))
        || (e2 == 32 && (imc2 >= 23.7 && imc2 <= 28.0))
        || (e2 == 33 && (imc2 >= 23.9 && imc2 <= 28.1))
        || (e2 == 34 && (imc2 >= 24.0 && imc2 <= 28.3))
        || (e2 == 35 && (imc2 >= 24.2 && imc2 <= 28.4))
        || (e2 == 36 && (imc2 >= 24.3 && imc2 <= 28.5))
        || (e2 == 37 && (imc2 >= 24.5 && imc2 <= 28.7))
        || (e2 == 38 && (imc2 >= 24.6 && imc2 <= 28.8))
        || (e2 == 39 && (imc2 >= 24.8 && imc2 <= 28.9))
        || (e2 == 40 && (imc2 >= 25.0 && imc2 <= 29.1))
        || ((e2 == 41 || e2 == 42) && (imc2 >= 25.1 && imc2 <= 29.2))
      ) {
        aux = 'IMC ADECUADO PARA LA EDAD GESTACIONAL';
      } else if (
        ((e2 == 6) && (imc2 < 20.0))
        || ((e2 == 7) && (imc2 < 20.1))
        || ((e2 == 8 || 9) && (imc2 < 20.2))
        || ((e2 == 10) && (imc2 < 20.3))
        || ((e2 == 11) && (imc2 < 20.4))
        || ((e2 == 12) && (imc2 < 20.5))
        || ((e2 == 13) && (imc2 < 20.7))
        || ((e2 == 14) && (imc2 < 20.8))
        || ((e2 == 15) && (imc2 < 20.9))
        || ((e2 == 16) && (imc2 < 21.1))
        || ((e2 == 17) && (imc2 < 21.2))
        || ((e2 == 18) && (imc2 < 21.3))
        || ((e2 == 19) && (imc2 < 21.5))
        || ((e2 == 20) && (imc2 < 21.6))
        || ((e2 == 21) && (imc2 < 21.8))
        || ((e2 == 22) && (imc2 < 21.9))
        || ((e2 == 23) && (imc2 < 22.1))
        || ((e2 == 24) && (imc2 < 22.3))
        || ((e2 == 25) && (imc2 < 22.5))
        || ((e2 == 26) && (imc2 < 22.7))
        || ((e2 == 27) && (imc2 < 22.8))
        || ((e2 == 28) && (imc2 < 23.0))
        || ((e2 == 29) && (imc2 < 23.2))
        || ((e2 == 30) && (imc2 < 23.4))
        || ((e2 == 31) && (imc2 < 23.5))
        || ((e2 == 32) && (imc2 < 23.7))
        || ((e2 == 33) && (imc2 < 23.9))
        || ((e2 == 34) && (imc2 < 24.0))
        || ((e2 == 35) && (imc2 < 24.2))
        || ((e2 == 36) && (imc2 < 24.3))
        || ((e2 == 37) && (imc2 < 24.5))
        || ((e2 == 38) && (imc2 < 24.6))
        || ((e2 == 39) && (imc2 < 24.8))
        || ((e2 == 40) && (imc2 < 25.0))
        || ((e2 == 41 || e2 == 42) && (imc2 < 25.1))
      ) {
        aux = 'BAJO PESO PARA LA EDAD GESTACIONAL';
      }
      datos.examFisico.imcEg = aux;
    }
  }

  // IMPRIME TABLA DE SIGNOS VITALES
  function imprimirCuadroSignos_HC702A() {
    datos.examFisico.cont.push($_HC702A._hcprc.signos.tens1 + '/' + $_HC702A._hcprc.signos.tens2);
    datos.examFisico.cont.push($_HC702A._hcprc.signos.tens_m);
    datos.examFisico.cont.push($_HC702A._hcprc.signos.fcard + ' lmp');
    datos.examFisico.cont.push($_HC702A._hcprc.signos.fresp + ' rpm');
    datos.examFisico.cont.push($_HC702A._hcprc.signos.temp + '°');
    datos.examFisico.cont.push($_HC702A._hcprc.signos.oximetria + '%');
    datos.examFisico.cont.push($_HC702A._hcprc.signos.pvc);

    if ($_HC702A._hcprc.signos.und_peso == '2' || parseFloat($_HC702A._hcprc.signos.peso) > 500) {
      datos.examFisico.cont.push($_HC702A._hcprc.signos.peso + ' Gr');
    } else {
      datos.examFisico.cont.push($_HC702A._hcprc.signos.peso + ' Kl');
    }
    datos.examFisico.cont.push($_HC702A._hcprc.signos.talla + ' cm');
    datos.examFisico.cont.push($_HC702A._hcprc.signos.imc);
    datos.examFisico.cont.push($_HC702A._hcprc.signos.sup + ' m2');
    datos.examFisico.cont.push($_HC702A._hcprc.signos.per_tora);
    datos.examFisico.cont.push($_HC702A._hcprc.signos.per_abdo);
    datos.examFisico.cont.push($_HC702A._hcprc.signos.per_mune);
    datos.examFisico.cont.push($_HC702A._hcprc.signos.glasg.substring(3, 5) + '/15');

    if ($_HC702A._hcprc.rips.embarazo == '4' || $_HC702A._hcprc.rips.embarazo == '0' || $_HC702A._hcprc.rips.embarazo == '9' || $_HC702A._hcprc.rips.embarazo.trim() == '') {
      if (($_HC702A._hcprc.edad.substring(0, 1) == 'A' && parseFloat($_HC702A._hcprc.edad.substring(1, 4)) >= 18) || $_REG_PACI.CRONICO == 'S') {
        if (isNaN(parseFloat($_HC702A._hcprc.signos.per_abdo))) {
          datos.examFisico.obesidad = ''
        } else {
          if ($_REG_PACI.SEXO == 'F') {

            if (parseFloat($_HC702A._hcprc.signos.per_abdo) <= 80) {
              datos.examFisico.obesidad = 'NO'
            } else {
              datos.examFisico.obesidad = 'SI'
            }
          } else {
            if (parseFloat($_HC702A._hcprc.signos.per_abdo) <= 90) {
              datos.examFisico.obesidad = 'NO'
            } else {
              datos.examFisico.obesidad = 'SI'
            }
          }
        }
      }
    }
  }

  if ($_HC702A.dato_9008 != undefined) {
    if ($_HC702A.dato_9008.consume_tabaco) {
      var riesgo_w = _EVALCARDIO($_REG_PACI.SEXO, $_HC702A._hcprc.edad, $_REG_PACI.DIABETES, $_HC702A._hcprc.signos.tens1, $_HC702A.dato_9008.consume_tabaco);

      aux = '';
      if (riesgo_w > 0) {
        switch (riesgo_w) {
          case 1: aux = 'RIESGO BAJO < 10%'; break;
          case 2: aux = 'RIESGO MODERADO 10% A < 20%'; break;
          case 3: aux = 'RIESGO ALTO 20% A < 30%'; break;
          case 4: aux = 'RIESGO MUY ALTO 30% A < 40%'; break;
          case 5: aux = 'RIESGO EXTREMADAMENTE ALTO >= 40%'; break;
        }
        datos.examFisico.riesgoCardio = aux;
      }
    }
  }
}

function imprimirOtorrino_HC702A() {
  if ($_HC702A.dato_4030 != undefined) {
    if ($_HC702A.dato_4030['otorrino_4030'].trim() != '') {
      datos.otorrino.titulos.push('OTORRINOLARINGOLOGIA');
      datos.otorrino.contenido.push('');
    }

    if ($_HC702A.dato_4030['pabel_4030'].trim() != '') {
      datos.otorrino.titulos.push('PABELLON AURICULAR:');
      datos.otorrino.contenido.push($_HC702A.dato_4030['pabel_4030']);
    }

    if ($_HC702A.dato_4030['condu_4030'].trim() != '') {
      datos.otorrino.titulos.push('CONDUCTOS AUDITIVOS EXTERNOS:');
      datos.otorrino.contenido.push($_HC702A.dato_4030['condu_4030']);
    }

    if ($_HC702A.dato_4030['me_oi_4030'].trim() != '') {
      datos.otorrino.titulos.push('MEMBRANA TIMPANICA OIDO IZQUIERDO:');
      datos.otorrino.contenido.push($_HC702A.dato_4030['me_oi_4030']);
    }

    if ($_HC702A.dato_4030['me_od_4030'].trim() != '') {
      datos.otorrino.titulos.push('MEMBRANA TIMPANICA OIDO DERECHO:');
      datos.otorrino.contenido.push($_HC702A.dato_4030['me_od_4030']);
    }

    if ($_HC702A.dato_4030['vesti_4030'].trim() != '') {
      datos.otorrino.titulos.push('APARATO VESTIBULAR:');
      datos.otorrino.contenido.push($_HC702A.dato_4030['vesti_4030']);
    }

    if ($_HC702A.dato_4030['weber_4030'].trim() != '' || $_HC702A.dato_4030['rinoi_4030'].trim() != '' || $_HC702A.dato_4030['rinod_4030'].trim() != '') {
      datos.otorrino.titulos.push('D I A P A S O N E S :');
      datos.otorrino.contenido.push('');
    }

    if ($_HC702A.dato_4030['weber_4030'].trim() != '') {
      datos.otorrino.titulos.push('WEBBER:');
      datos.otorrino.contenido.push($_HC702A.dato_4030['weber_4030']);
    }

    if ($_HC702A.dato_4030['rinoi_4030'].trim() != '') {
      datos.otorrino.titulos.push('RINNE OIDO IZQUIERDO:');
      datos.otorrino.contenido.push($_HC702A.dato_4030['rinoi_4030']);
    }

    if ($_HC702A.dato_4030['rinod_4030'].trim() != '') {
      datos.otorrino.titulos.push('RINNE OIDO DERECHO:');
      datos.otorrino.contenido.push($_HC702A.dato_4030['rinod_4030']);
    }

    if ($_HC702A.dato_4030['nariz_4030'].trim() != '') {
      datos.otorrino.titulos.push('NARIZ EXTERNA:');
      datos.otorrino.contenido.push($_HC702A.dato_4030['nariz_4030']);
    }

    if ($_HC702A.dato_4030['septu_4030'].trim() != '') {
      datos.otorrino.titulos.push('SEPTUM:');
      datos.otorrino.contenido.push($_HC702A.dato_4030['septu_4030']);
    }

    if ($_HC702A.dato_4030['corne_4030'].trim() != '') {
      datos.otorrino.titulos.push('CORNETES:');
      datos.otorrino.contenido.push($_HC702A.dato_4030['corne_4030']);
    }

    if ($_HC702A.dato_4030['c_ora_4030'].trim() != '') {
      datos.otorrino.titulos.push('CAVIDAD ORAL:');
      datos.otorrino.contenido.push($_HC702A.dato_4030['c_ora_4030']);
    }

    if ($_HC702A.dato_4030['larin_4030'].trim() != '') {
      datos.otorrino.titulos.push('LARINGE INDIRECTA:');
      datos.otorrino.contenido.push($_HC702A.dato_4030['larin_4030']);
    }

    if ($_HC702A.dato_4030['cuell_4030'].trim() != '') {
      datos.otorrino.titulos.push('CUELLO:');
      datos.otorrino.contenido.push($_HC702A.dato_4030['cuell_4030']);
    }

  } else {
    datos.otorrino.bandera = false;
  }
}

function imprimirExamenFisico_HC702A() {
  if ($_HC702A.exa_general_hc != undefined) {
    if (($_USUA_GLOBAL[0].NIT == 800175901 && $_REG_PACI.EPS == 'PAR001') || $_HC702A.exa_general_hc.trim() == '') {
      datos.observExamFisico = ' ';
    } else {
      datos.observExamFisico = $_HC702A.exa_general_hc;
    }
  }
}

async function buscarGineco_HC702A() {
  console.log($_HC702A.dato_4040);
  if ($_HC702A.dato_4040 != undefined) {
    if ($_HC702A.dato_4040.gineco_esq_w['ciclos_esq_w'] == '1' || $_HC702A.dato_4040.gineco_esq_w['ciclos_esq_w'] == '2' || $_HC702A.dato_4040.gineco_esq_w['ciclos_esq_w'] == '3') {
      await imprimirGineco_HC702A();
    }

    if (parseFloat($_HC702A.dato_4040.obstetric_esq_w['edad_gest_regla_esq_w']) > 0 || parseFloat($_HC702A.dato_4040.obstetric_esq_w['edad_gest_ultra_esq_w']) > 0) {
      await imprimirObstetrico_HC702A();
    }
  } else {
    datos.gineco.bandera = false;
    datos.obst.bandera = false;
  }
}

// IMPRIME GINECOLOGIA
function imprimirGineco_HC702A() {
  if ($_HC702A.dato_4040 != undefined) {
    datos.gineco.bandera = true;

    datos.gineco.g1.push($_HC702A.dato_4040.gineco_esq_w['menarquia_esq_w']);

    aux = '';
    switch ($_HC702A.dato_4040.gineco_esq_w['ciclos_esq_w']) {
      case '1': aux = 'REGULARES'; break;
      case '2': aux = $_HC702A.dato_4040.gineco_esq_w['ciclos_irreg_esq_w']; break;
      default: aux = ' '; break;
    }
    datos.gineco.g1.push(aux);

    datos.gineco.g1.push($_HC702A.dato_4040.gineco_esq_w['gestaciones_esq_w']);
    datos.gineco.g1.push($_HC702A.dato_4040.gineco_esq_w['partos_esq_w']);
    datos.gineco.g1.push($_HC702A.dato_4040.gineco_esq_w['cesareas_esq_w']);
    datos.gineco.g1.push($_HC702A.dato_4040.gineco_esq_w['abortos_esq_w']);
    datos.gineco.g1.push($_HC702A.dato_4040.gineco_esq_w['ectopicos_esq_w']);
    datos.gineco.g1.push($_HC702A.dato_4040.gineco_esq_w['gine_molas_esq_w']);
    datos.gineco.g1.push($_HC702A.dato_4040.gineco_esq_w['gine_obito_esq_w']);

    parseFloat($_HC702A.dato_4040.gineco_esq_w['fecha_regla_esq_w']) > 0 ? datos.gineco.g2.push(_editarFecha($_HC702A.dato_4040.gineco_esq_w['fecha_regla_esq_w'])) : datos.gineco.g2.push(' ')
    parseFloat($_HC702A.dato_4040.gineco_esq_w['ult_parto_esq_w']) > 0 ? datos.gineco.g2.push(_editarFecha($_HC702A.dato_4040.gineco_esq_w['ult_parto_esq_w'])) : datos.gineco.g2.push(' ')
    parseFloat($_HC702A.dato_4040.gineco_esq_w['fecha_citol_esq_w']) > 0 ? datos.gineco.g2.push(_editarFecha($_HC702A.dato_4040.gineco_esq_w['fecha_citol_esq_w'])) : datos.gineco.g2.push(' ')

    aux = '';
    switch ($_HC702A.dato_4040.gineco_esq_w['result_citol_esq_w']) {
      case '1': aux = 'NORMAL'; break;
      case '2': aux = $_HC702A.dato_4040.gineco_esq_w['citol_anormal_esq_w']; break;
      default: aux = ' '; break;
    }
    datos.gineco.g2.push(aux);

    if ($_HC702A.dato_4040.gineco_esq_w['citol_anormal_esq_w'].trim() != '') {
      datos.gineco.titLin.push('CITOLOGIA ANORMAL')
      datos.gineco.contLin.push($_HC702A.dato_4040.gineco_esq_w['citol_anormal_esq_w'])
    }

    plan = '';
    if ($_HC702A._hcprc.planific != '0' && $_HC702A._hcprc.planific.trim() != '') {
      switch ($_HC702A._hcprc.planific) {
        case "1": plan = "DIU             "; break;
        case "2": plan = "AO              "; break;
        case "3": plan = "AP              "; break;
        case "4": plan = "OTRO            "; break;
        case "5": plan = "NINGUNO         "; break;
        case "6": plan = "DIU + BARRERA   "; break;
        case "7": plan = "IMPL. SUBDERMICO"; break;
        case "8": plan = "I.SUBDERM+BARRER"; break;
        case "9": plan = "ORAL + BARRERA  "; break;
        case "A": plan = "INYECTAB.MENSUAL"; break;
        case "B": plan = "INYECTAB+BARRERA"; break;
        case "C": plan = "INYECTAB.TRIMEST"; break;
        case "D": plan = "TRIMEST+BARRERA "; break;
        case "E": plan = "EMERGENCIA      "; break;
        case "F": plan = "EMERGENC+BARRERA"; break;
        case "G": plan = "ESTERILIZACION  "; break;
        case "H": plan = "ESTERILIZ+BARRER"; break;
        case "I": plan = "NO USA X TRADIC."; break;
        case "J": plan = "NO USA X SALUD  "; break;
        case "K": plan = "NO USA X NEGACI."; break;
        default: plan = '       '; break;
      }
      datos.gineco.titLin.push('METODO DE PLANIFIC.:');
      datos.gineco.contLin.push(plan);
    }

    if ($_HC702A.dato_4040.gineco_esq_w['infec_pelvic_esq_w'].trim() != '') {
      datos.gineco.titLin.push('INFECCIÓN PELVICA')
      datos.gineco.contLin.push($_HC702A.dato_4040.gineco_esq_w['infec_pelvic_esq_w'])
    }

    if ($_HC702A.dato_4040.gineco_esq_w['endometros_esq_w'].trim() != '') {
      datos.gineco.titLin.push('ENDOMETRIOSIS ?')
      datos.gineco.contLin.push($_HC702A.dato_4040.gineco_esq_w['endometros_esq_w'])
    }

    if ($_HC702A.dato_4040.gineco_esq_w['especuloscop_esq_w'].trim() != '') {
      switch ($_HC702A.dato_4040.gineco_esq_w['especuloscop_esq_w']) {
        case '1': aux = 'NORMAL'; break;
        case '2': aux = $_HC702A.dato_4040.gineco_esq_w['especul_anormal_esq_w']; break;
        case '3': aux = '     '; break;
      }
      datos.gineco.titLin.push('ESPECULOSCOPIA ?')
      datos.gineco.contLin.push($_HC702A.dato_4040.gineco_esq_w['especuloscop_esq_w'])
    }

    if ($_HC702A.dato_4040.gineco_esq_w['ultrason_utero_esq_w'].trim() != '') {
      datos.gineco.titLin.push('ULTRASONOGRAF UTERO:')
      datos.gineco.contLin.push($_HC702A.dato_4040.gineco_esq_w['ultrason_utero_esq_w'])
    }

    if ($_HC702A.dato_4040.gineco_esq_w['ultrason_ovario_esq_w'].trim() != '') {
      datos.gineco.titLin.push('ULTRASONOGRAF OVARIOS:')
      datos.gineco.contLin.push($_HC702A.dato_4040.gineco_esq_w['ultrason_ovario_esq_w'])
    }

    if ($_HC702A.dato_4040.gineco_esq_w['ultrason_trompa_esq_w'].trim() != '') {
      datos.gineco.titLin.push('ULTRASONOGRAF TROMPAS:')
      datos.gineco.contLin.push($_HC702A.dato_4040.gineco_esq_w['ultrason_trompa_esq_w'])
    }

    if ($_HC702A.dato_4040.gineco_esq_w['ultrason_otros_esq_w'].trim() != '') {
      datos.gineco.titLin.push('ULTRASONOGRAF OTROS:')
      datos.gineco.contLin.push($_HC702A.dato_4040.gineco_esq_w['ultrason_otros_esq_w'])
    }

    if (parseFloat($_HC702A.dato_4040.gineco_esq_w['hemoglob_esq_w']) > 0) {
      datos.gineco.titLin.push('VLR HEMOGLOBINA:')
      datos.gineco.contLin.push($_HC702A.dato_4040.gineco_esq_w['hemoglob_esq_w'])
    }

    emb = '';
    if (parseFloat($_HC702A._hcprc.rips.embarazo) > 0 && parseFloat($_HC702A._hcprc.rips.embarazo) < 8) {
      switch ($_HC702A._hcprc.rips.embarazo) {
        case '1': emb = "EMBARAZO 1ER TRIMESTRE"; break;
        case '2': emb = "EMBARAZO 2DO TRIMESTRE"; break;
        case '3': emb = "EMBARAZO 3ER TRIMESTRE"; break;
        case '4': emb = "NO ESTA EMBARAZADA    "; break;
        default: emb = "NO APLICA"; break;
      }
      datos.gineco.titLin.push('EMBARAZO:');
      datos.gineco.contLin.push(emb);
    }


    // ---------- IMPRIME TELESALUD --------
    datos.telesalud.fechaAsePre = $_HC702A.dato_4040.prenatal_esq_w['fecha_aseso_pre_esq_w'];
    datos.telesalud.fechaVacInfl = $_HC702A.dato_4040.prenatal_esq_w['fecha_vac_influ_esq_w'];
    datos.telesalud.fechaAsePos = $_HC702A.dato_4040.prenatal_esq_w['fecha_aseso_pos_esq_w'];
    datos.telesalud.fechaVacTDAP = $_HC702A.dato_4040.prenatal_esq_w['fecha_vac_tdap_esq_w'];
    datos.telesalud.fechaEcoObs = $_HC702A.dato_4040.prenatal_esq_w['fecha_eco_obst_esq_w'];
    datos.telesalud.fechaVacTT = $_HC702A.dato_4040.prenatal_esq_w['fecha_vac_tt_esq_w'];

    // TELESALUD VIH

    if ($_HC702A.dato_4040.tabla_vih_esq_w[0]['fecha_vih_esq_w'].trim() != '') {
      datos.telesalud.vih.push($_HC702A.dato_4040.tabla_vih_esq_w[0]['fecha_vih_esq_w'].substring(0, 4));
      datos.telesalud.vih.push($_HC702A.dato_4040.tabla_vih_esq_w[0]['fecha_vih_esq_w'].substring(4, 6));
      datos.telesalud.vih.push($_HC702A.dato_4040.tabla_vih_esq_w[0]['fecha_vih_esq_w'].substring(6, 8));
    } else {
      datos.telesalud.vih.push('    ');
      datos.telesalud.vih.push('  ');
      datos.telesalud.vih.push('  ');
    }

    aux = '';
    switch ($_HC702A.dato_4040.tabla_vih_esq_w[0]['resultado_vih_esq_w']) {
      case '1': aux = 'POSITIVO'; break;
      case '2': aux = 'NEGATIVO'; break;
      case '3': aux = 'PENDIENTE'; break;
      default: aux = '       '; break;
    }
    datos.telesalud.vih.push(aux);

    if ($_HC702A.dato_4040.tabla_vih_esq_w[1]['fecha_vih_esq_w'].trim() != '') {
      datos.telesalud.vih.push($_HC702A.dato_4040.tabla_vih_esq_w[1]['fecha_vih_esq_w'].substring(0, 4));
      datos.telesalud.vih.push($_HC702A.dato_4040.tabla_vih_esq_w[1]['fecha_vih_esq_w'].substring(4, 6));
      datos.telesalud.vih.push($_HC702A.dato_4040.tabla_vih_esq_w[1]['fecha_vih_esq_w'].substring(6, 8));
    } else {
      datos.telesalud.vih.push('    ');
      datos.telesalud.vih.push('  ');
      datos.telesalud.vih.push('  ');
    }

    aux = '';
    switch ($_HC702A.dato_4040.tabla_vih_esq_w[1]['resultado_vih_esq_w']) {
      case '1': aux = 'POSITIVO'; break;
      case '2': aux = 'NEGATIVO'; break;
      case '3': aux = 'PENDIENTE'; break;
      default: aux = '       '; break;
    }
    datos.telesalud.vih.push(aux);

    if ($_HC702A.dato_4040.tabla_vih_esq_w[2]['fecha_vih_esq_w'].trim() != '') {
      datos.telesalud.vih.push($_HC702A.dato_4040.tabla_vih_esq_w[2]['fecha_vih_esq_w'].substring(0, 4));
      datos.telesalud.vih.push($_HC702A.dato_4040.tabla_vih_esq_w[2]['fecha_vih_esq_w'].substring(4, 6));
      datos.telesalud.vih.push($_HC702A.dato_4040.tabla_vih_esq_w[2]['fecha_vih_esq_w'].substring(6, 8));
    } else {
      datos.telesalud.vih.push('    ');
      datos.telesalud.vih.push('  ');
      datos.telesalud.vih.push('  ');
    }

    aux = '';
    switch ($_HC702A.dato_4040.tabla_vih_esq_w[2]['resultado_vih_esq_w']) {
      case '1': aux = 'POSITIVO'; break;
      case '2': aux = 'NEGATIVO'; break;
      case '3': aux = 'PENDIENTE'; break;
      default: aux = '       '; break;
    }
    datos.telesalud.vih.push(aux);

    // TELESALUD SEROLOGIA

    if ($_HC702A.dato_4040.tabla_serolo_esq_w[0]['fecha_serolo_esq_w'].trim() != '') {
      datos.telesalud.serologia.push($_HC702A.dato_4040.tabla_serolo_esq_w[0]['fecha_serolo_esq_w'].substring(0, 4));
      datos.telesalud.serologia.push($_HC702A.dato_4040.tabla_serolo_esq_w[0]['fecha_serolo_esq_w'].substring(4, 6));
      datos.telesalud.serologia.push($_HC702A.dato_4040.tabla_serolo_esq_w[0]['fecha_serolo_esq_w'].substring(6, 8));
    } else {
      datos.telesalud.serologia.push('    ');
      datos.telesalud.serologia.push('  ');
      datos.telesalud.serologia.push('  ');
    }

    aux = '';
    switch ($_HC702A.dato_4040.tabla_serolo_esq_w[0]['resultado_serolo_esq_w']) {
      case '1': aux = 'REACTIVO'; break;
      case '2': aux = 'NO REACTIVO'; break;
      case '3': aux = 'PENDIENTE'; break;
      default: aux = '       '; break;
    }
    datos.telesalud.serologia.push(aux);

    if ($_HC702A.dato_4040.tabla_serolo_esq_w[1]['fecha_serolo_esq_w'].trim() != '') {
      datos.telesalud.serologia.push($_HC702A.dato_4040.tabla_serolo_esq_w[1]['fecha_serolo_esq_w'].substring(0, 4));
      datos.telesalud.serologia.push($_HC702A.dato_4040.tabla_serolo_esq_w[1]['fecha_serolo_esq_w'].substring(4, 6));
      datos.telesalud.serologia.push($_HC702A.dato_4040.tabla_serolo_esq_w[1]['fecha_serolo_esq_w'].substring(6, 8));
    } else {
      datos.telesalud.serologia.push('    ');
      datos.telesalud.serologia.push('  ');
      datos.telesalud.serologia.push('  ');
    }

    aux = '';
    switch ($_HC702A.dato_4040.tabla_serolo_esq_w[1]['resultado_serolo_esq_w']) {
      case '1': aux = 'REACTIVO'; break;
      case '2': aux = 'NO REACTIVO'; break;
      case '3': aux = 'PENDIENTE'; break;
      default: aux = '       '; break;
    }
    datos.telesalud.serologia.push(aux);

    if ($_HC702A.dato_4040.tabla_serolo_esq_w[2]['fecha_serolo_esq_w'].trim() != '') {
      datos.telesalud.serologia.push($_HC702A.dato_4040.tabla_serolo_esq_w[2]['fecha_serolo_esq_w'].substring(0, 4));
      datos.telesalud.serologia.push($_HC702A.dato_4040.tabla_serolo_esq_w[2]['fecha_serolo_esq_w'].substring(4, 6));
      datos.telesalud.serologia.push($_HC702A.dato_4040.tabla_serolo_esq_w[2]['fecha_serolo_esq_w'].substring(6, 8));
    } else {
      datos.telesalud.serologia.push('    ');
      datos.telesalud.serologia.push('  ');
      datos.telesalud.serologia.push('  ');
    }

    aux = '';
    switch ($_HC702A.dato_4040.tabla_serolo_esq_w[2]['resultado_serolo_esq_w']) {
      case '1': aux = 'REACTIVO'; break;
      case '2': aux = 'NO REACTIVO'; break;
      case '3': aux = 'PENDIENTE'; break;
      default: aux = '       '; break;
    }
    datos.telesalud.serologia.push(aux);

    // TELESALUD HEMOGLOBINA

    if ($_HC702A.dato_4040.tabla_hemogl_esq_w[0]['fecha_hemogl_esq_w'].trim() != '') {
      datos.telesalud.hemoglobina.push($_HC702A.dato_4040.tabla_hemogl_esq_w[0]['fecha_hemogl_esq_w'].substring(0, 4));
      datos.telesalud.hemoglobina.push($_HC702A.dato_4040.tabla_hemogl_esq_w[0]['fecha_hemogl_esq_w'].substring(4, 6));
      datos.telesalud.hemoglobina.push($_HC702A.dato_4040.tabla_hemogl_esq_w[0]['fecha_hemogl_esq_w'].substring(6, 8));
    } else {
      datos.telesalud.hemoglobina.push('    ');
      datos.telesalud.hemoglobina.push('  ');
      datos.telesalud.hemoglobina.push('  ');
    }

    datos.telesalud.hemoglobina.push($_HC702A.dato_4040.tabla_hemogl_esq_w[0]['resultado_hemogl_esq_w']);

    if ($_HC702A.dato_4040.tabla_hemogl_esq_w[1]['fecha_hemogl_esq_w'].trim() != '') {
      datos.telesalud.hemoglobina.push($_HC702A.dato_4040.tabla_hemogl_esq_w[1]['fecha_hemogl_esq_w'].substring(0, 4));
      datos.telesalud.hemoglobina.push($_HC702A.dato_4040.tabla_hemogl_esq_w[1]['fecha_hemogl_esq_w'].substring(4, 6));
      datos.telesalud.hemoglobina.push($_HC702A.dato_4040.tabla_hemogl_esq_w[1]['fecha_hemogl_esq_w'].substring(6, 8));
    } else {
      datos.telesalud.hemoglobina.push('    ');
      datos.telesalud.hemoglobina.push('  ');
      datos.telesalud.hemoglobina.push('  ');
    }

    datos.telesalud.hemoglobina.push($_HC702A.dato_4040.tabla_hemogl_esq_w[1]['resultado_hemogl_esq_w']);

    if ($_HC702A.dato_4040.tabla_hemogl_esq_w[2]['fecha_hemogl_esq_w'].trim() != '') {
      datos.telesalud.hemoglobina.push($_HC702A.dato_4040.tabla_hemogl_esq_w[2]['fecha_hemogl_esq_w'].substring(0, 4));
      datos.telesalud.hemoglobina.push($_HC702A.dato_4040.tabla_hemogl_esq_w[2]['fecha_hemogl_esq_w'].substring(4, 6));
      datos.telesalud.hemoglobina.push($_HC702A.dato_4040.tabla_hemogl_esq_w[2]['fecha_hemogl_esq_w'].substring(6, 8));
    } else {
      datos.telesalud.hemoglobina.push('    ');
      datos.telesalud.hemoglobina.push('  ');
      datos.telesalud.hemoglobina.push('  ');
    }

    datos.telesalud.hemoglobina.push($_HC702A.dato_4040.tabla_hemogl_esq_w[2]['resultado_hemogl_esq_w']);

    // TELESALUD IGG

    if ($_HC702A.dato_4040.tabla_igg_esq_w[0]['fecha_igg_esq_w'].trim() != '') {
      datos.telesalud.igg.push($_HC702A.dato_4040.tabla_igg_esq_w[0]['fecha_igg_esq_w'].substring(0, 4));
      datos.telesalud.igg.push($_HC702A.dato_4040.tabla_igg_esq_w[0]['fecha_igg_esq_w'].substring(4, 6));
      datos.telesalud.igg.push($_HC702A.dato_4040.tabla_igg_esq_w[0]['fecha_igg_esq_w'].substring(6, 8));
    } else {
      datos.telesalud.igg.push('    ');
      datos.telesalud.igg.push('  ');
      datos.telesalud.igg.push('  ');
    }

    aux = '';
    switch ($_HC702A.dato_4040.tabla_igg_esq_w[0]['resultado_igg_esq_w']) {
      case '1': aux = 'POSITIVO'; break;
      case '2': aux = 'NEGATIVO'; break;
      case '3': aux = 'PENDIENTE'; break;
      default: aux = '       '; break;
    }
    datos.telesalud.igg.push(aux);

    if ($_HC702A.dato_4040.tabla_igg_esq_w[1]['fecha_igg_esq_w'].trim() != '') {
      datos.telesalud.igg.push($_HC702A.dato_4040.tabla_igg_esq_w[1]['fecha_igg_esq_w'].substring(0, 4));
      datos.telesalud.igg.push($_HC702A.dato_4040.tabla_igg_esq_w[1]['fecha_igg_esq_w'].substring(4, 6));
      datos.telesalud.igg.push($_HC702A.dato_4040.tabla_igg_esq_w[1]['fecha_igg_esq_w'].substring(6, 8));
    } else {
      datos.telesalud.igg.push('    ');
      datos.telesalud.igg.push('  ');
      datos.telesalud.igg.push('  ');
    }

    aux = '';
    switch ($_HC702A.dato_4040.tabla_igg_esq_w[1]['resultado_igg_esq_w']) {
      case '1': aux = 'POSITIVO'; break;
      case '2': aux = 'NEGATIVO'; break;
      case '3': aux = 'PENDIENTE'; break;
      default: aux = '       '; break;
    }
    datos.telesalud.igg.push(aux);

    if ($_HC702A.dato_4040.tabla_igg_esq_w[2]['fecha_igg_esq_w'].trim() != '') {
      datos.telesalud.igg.push($_HC702A.dato_4040.tabla_igg_esq_w[2]['fecha_igg_esq_w'].substring(0, 4));
      datos.telesalud.igg.push($_HC702A.dato_4040.tabla_igg_esq_w[2]['fecha_igg_esq_w'].substring(4, 6));
      datos.telesalud.igg.push($_HC702A.dato_4040.tabla_igg_esq_w[2]['fecha_igg_esq_w'].substring(6, 8));
    } else {
      datos.telesalud.igg.push('    ');
      datos.telesalud.igg.push('  ');
      datos.telesalud.igg.push('  ');
    }

    aux = '';
    switch ($_HC702A.dato_4040.tabla_igg_esq_w[2]['resultado_igg_esq_w']) {
      case '1': aux = 'POSITIVO'; break;
      case '2': aux = 'NEGATIVO'; break;
      case '3': aux = 'PENDIENTE'; break;
      default: aux = '       '; break;
    }
    datos.telesalud.igg.push(aux);

    // TELESALUD CURVA DE GLICEMIA

    if ($_HC702A.dato_4040.tabla_glicem_esq_w[0]['fecha_glicem_esq_w'].trim() != '') {
      datos.telesalud.curva.push($_HC702A.dato_4040.tabla_glicem_esq_w[0]['fecha_glicem_esq_w'].substring(0, 4));
      datos.telesalud.curva.push($_HC702A.dato_4040.tabla_glicem_esq_w[0]['fecha_glicem_esq_w'].substring(4, 6));
      datos.telesalud.curva.push($_HC702A.dato_4040.tabla_glicem_esq_w[0]['fecha_glicem_esq_w'].substring(6, 8));
    } else {
      datos.telesalud.curva.push('    ');
      datos.telesalud.curva.push('  ');
      datos.telesalud.curva.push('  ');
    }

    if ($_HC702A.dato_4040.tabla_glicem_esq_w[0]['resultado_glicem_esq_w'].trim() != '') {
      datos.telesalud.curva.push($_HC702A.dato_4040.tabla_glicem_esq_w[0]['resultado_glicem_esq_w'].substring(0, 3) + ' ' + $_HC702A.dato_4040.tabla_glicem_esq_w[0]['resultado_glicem_esq_w'].substring(3, 6));
    } else {
      datos.telesalud.curva.push('       ');
    }

    if ($_HC702A.dato_4040.tabla_glicem_esq_w[1]['fecha_glicem_esq_w'].trim() != '') {
      datos.telesalud.curva.push($_HC702A.dato_4040.tabla_glicem_esq_w[1]['fecha_glicem_esq_w'].substring(0, 4));
      datos.telesalud.curva.push($_HC702A.dato_4040.tabla_glicem_esq_w[1]['fecha_glicem_esq_w'].substring(4, 6));
      datos.telesalud.curva.push($_HC702A.dato_4040.tabla_glicem_esq_w[1]['fecha_glicem_esq_w'].substring(6, 8));
    } else {
      datos.telesalud.curva.push('    ');
      datos.telesalud.curva.push('  ');
      datos.telesalud.curva.push('  ');
    }

    if ($_HC702A.dato_4040.tabla_glicem_esq_w[1]['resultado_glicem_esq_w'].trim() != '') {
      datos.telesalud.curva.push($_HC702A.dato_4040.tabla_glicem_esq_w[1]['resultado_glicem_esq_w'].substring(0, 3) + ' ' + $_HC702A.dato_4040.tabla_glicem_esq_w[1]['resultado_glicem_esq_w'].substring(3, 6));
    } else {
      datos.telesalud.curva.push('       ');
    }

    if ($_HC702A.dato_4040.tabla_glicem_esq_w[2]['fecha_glicem_esq_w'].trim() != '') {
      datos.telesalud.curva.push($_HC702A.dato_4040.tabla_glicem_esq_w[2]['fecha_glicem_esq_w'].substring(0, 4));
      datos.telesalud.curva.push($_HC702A.dato_4040.tabla_glicem_esq_w[2]['fecha_glicem_esq_w'].substring(4, 6));
      datos.telesalud.curva.push($_HC702A.dato_4040.tabla_glicem_esq_w[2]['fecha_glicem_esq_w'].substring(6, 8));
    } else {
      datos.telesalud.curva.push('    ');
      datos.telesalud.curva.push('  ');
      datos.telesalud.curva.push('  ');
    }

    if ($_HC702A.dato_4040.tabla_glicem_esq_w[2]['resultado_glicem_esq_w'].trim() != '') {
      datos.telesalud.curva.push($_HC702A.dato_4040.tabla_glicem_esq_w[2]['resultado_glicem_esq_w'].substring(0, 3) + ' ' + $_HC702A.dato_4040.tabla_glicem_esq_w[2]['resultado_glicem_esq_w'].substring(3, 6));
    } else {
      datos.telesalud.curva.push('       ');
    }

    // TELESALUD HEMOGRAMA

    if ($_HC702A.dato_4040.tabla_hemogra_esq_w[0]['fecha_hemogra_esq_w'].trim() != '') {
      datos.telesalud.hemograma.push($_HC702A.dato_4040.tabla_hemogra_esq_w[0]['fecha_hemogra_esq_w'].substring(0, 4));
      datos.telesalud.hemograma.push($_HC702A.dato_4040.tabla_hemogra_esq_w[0]['fecha_hemogra_esq_w'].substring(4, 6));
      datos.telesalud.hemograma.push($_HC702A.dato_4040.tabla_hemogra_esq_w[0]['fecha_hemogra_esq_w'].substring(6, 8));
    } else {
      datos.telesalud.hemograma.push('    ');
      datos.telesalud.hemograma.push('  ');
      datos.telesalud.hemograma.push('  ');
    }

    aux = '';
    switch ($_HC702A.dato_4040.tabla_hemogra_esq_w[0]['resultado_hemogra_esq_w']) {
      case '1': aux = 'POSITIVO'; break;
      case '2': aux = 'NEGATIVO'; break;
      case '3': aux = 'PENDIENTE'; break;
      default: aux = '       '; break;
    }
    datos.telesalud.hemograma.push(aux);

    if ($_HC702A.dato_4040.tabla_hemogra_esq_w[1]['fecha_hemogra_esq_w'].trim() != '') {
      datos.telesalud.hemograma.push($_HC702A.dato_4040.tabla_hemogra_esq_w[1]['fecha_hemogra_esq_w'].substring(0, 4));
      datos.telesalud.hemograma.push($_HC702A.dato_4040.tabla_hemogra_esq_w[1]['fecha_hemogra_esq_w'].substring(4, 6));
      datos.telesalud.hemograma.push($_HC702A.dato_4040.tabla_hemogra_esq_w[1]['fecha_hemogra_esq_w'].substring(6, 8));
    } else {
      datos.telesalud.hemograma.push('    ');
      datos.telesalud.hemograma.push('  ');
      datos.telesalud.hemograma.push('  ');
    }

    aux = '';
    switch ($_HC702A.dato_4040.tabla_hemogra_esq_w[1]['resultado_hemogra_esq_w']) {
      case '1': aux = 'POSITIVO'; break;
      case '2': aux = 'NEGATIVO'; break;
      case '3': aux = 'PENDIENTE'; break;
      default: aux = '       '; break;
    }
    datos.telesalud.hemograma.push(aux);

    if ($_HC702A.dato_4040.tabla_hemogra_esq_w[2]['fecha_hemogra_esq_w'].trim() != '') {
      datos.telesalud.hemograma.push($_HC702A.dato_4040.tabla_hemogra_esq_w[2]['fecha_hemogra_esq_w'].substring(0, 4));
      datos.telesalud.hemograma.push($_HC702A.dato_4040.tabla_hemogra_esq_w[2]['fecha_hemogra_esq_w'].substring(4, 6));
      datos.telesalud.hemograma.push($_HC702A.dato_4040.tabla_hemogra_esq_w[2]['fecha_hemogra_esq_w'].substring(6, 8));
    } else {
      datos.telesalud.hemograma.push('    ');
      datos.telesalud.hemograma.push('  ');
      datos.telesalud.hemograma.push('  ');
    }

    aux = '';
    switch ($_HC702A.dato_4040.tabla_hemogra_esq_w[2]['resultado_hemogra_esq_w']) {
      case '1': aux = 'POSITIVO'; break;
      case '2': aux = 'NEGATIVO'; break;
      case '3': aux = 'PENDIENTE'; break;
      default: aux = '       '; break;
    }
    datos.telesalud.hemograma.push(aux);

    // TELESALUD HEMOPARASITO

    if ($_HC702A.dato_4040.tabla_hemopara_esq_w[0]['fecha_hemopara_esq_w'].trim() != '') {
      datos.telesalud.hemoparasito.push($_HC702A.dato_4040.tabla_hemopara_esq_w[0]['fecha_hemopara_esq_w'].substring(0, 4));
      datos.telesalud.hemoparasito.push($_HC702A.dato_4040.tabla_hemopara_esq_w[0]['fecha_hemopara_esq_w'].substring(4, 6));
      datos.telesalud.hemoparasito.push($_HC702A.dato_4040.tabla_hemopara_esq_w[0]['fecha_hemopara_esq_w'].substring(6, 8));
    } else {
      datos.telesalud.hemoparasito.push('    ');
      datos.telesalud.hemoparasito.push('  ');
      datos.telesalud.hemoparasito.push('  ');
    }

    aux = '';
    switch ($_HC702A.dato_4040.tabla_hemopara_esq_w[0]['resultado_hemopara_esq_w']) {
      case '1': aux = 'POSITIVO'; break;
      case '2': aux = 'NEGATIVO'; break;
      case '3': aux = 'PENDIENTE'; break;
      default: aux = '       '; break;
    }
    datos.telesalud.hemoparasito.push(aux);

    if ($_HC702A.dato_4040.tabla_hemopara_esq_w[1]['fecha_hemopara_esq_w'].trim() != '') {
      datos.telesalud.hemoparasito.push($_HC702A.dato_4040.tabla_hemopara_esq_w[1]['fecha_hemopara_esq_w'].substring(0, 4));
      datos.telesalud.hemoparasito.push($_HC702A.dato_4040.tabla_hemopara_esq_w[1]['fecha_hemopara_esq_w'].substring(4, 6));
      datos.telesalud.hemoparasito.push($_HC702A.dato_4040.tabla_hemopara_esq_w[1]['fecha_hemopara_esq_w'].substring(6, 8));
    } else {
      datos.telesalud.hemoparasito.push('    ');
      datos.telesalud.hemoparasito.push('  ');
      datos.telesalud.hemoparasito.push('  ');
    }

    aux = '';
    switch ($_HC702A.dato_4040.tabla_hemopara_esq_w[1]['resultado_hemopara_esq_w']) {
      case '1': aux = 'POSITIVO'; break;
      case '2': aux = 'NEGATIVO'; break;
      case '3': aux = 'PENDIENTE'; break;
      default: aux = '       '; break;
    }
    datos.telesalud.hemoparasito.push(aux);

    if ($_HC702A.dato_4040.tabla_hemopara_esq_w[2]['fecha_hemopara_esq_w'].trim() != '') {
      datos.telesalud.hemoparasito.push($_HC702A.dato_4040.tabla_hemopara_esq_w[2]['fecha_hemopara_esq_w'].substring(0, 4));
      datos.telesalud.hemoparasito.push($_HC702A.dato_4040.tabla_hemopara_esq_w[2]['fecha_hemopara_esq_w'].substring(4, 6));
      datos.telesalud.hemoparasito.push($_HC702A.dato_4040.tabla_hemopara_esq_w[2]['fecha_hemopara_esq_w'].substring(6, 8));
    } else {
      datos.telesalud.hemoparasito.push('    ');
      datos.telesalud.hemoparasito.push('  ');
      datos.telesalud.hemoparasito.push('  ');
    }

    aux = '';
    switch ($_HC702A.dato_4040.tabla_hemopara_esq_w[2]['resultado_hemopara_esq_w']) {
      case '1': aux = 'POSITIVO'; break;
      case '2': aux = 'NEGATIVO'; break;
      case '3': aux = 'PENDIENTE'; break;
      default: aux = '       '; break;
    }
    datos.telesalud.hemoparasito.push(aux);

    // TELESALUD FTA - ABS

    if ($_HC702A.dato_4040.tabla_fta_abs_esq_w[0]['fecha_fta_abs_esq_w'].trim() != '') {
      datos.telesalud.fta.push($_HC702A.dato_4040.tabla_fta_abs_esq_w[0]['fecha_fta_abs_esq_w'].substring(0, 4));
      datos.telesalud.fta.push($_HC702A.dato_4040.tabla_fta_abs_esq_w[0]['fecha_fta_abs_esq_w'].substring(4, 6));
      datos.telesalud.fta.push($_HC702A.dato_4040.tabla_fta_abs_esq_w[0]['fecha_fta_abs_esq_w'].substring(6, 8));
    } else {
      datos.telesalud.fta.push('    ');
      datos.telesalud.fta.push('  ');
      datos.telesalud.fta.push('  ');
    }

    aux = '';
    switch ($_HC702A.dato_4040.tabla_fta_abs_esq_w[0]['resultado_fta_abs_esq_w']) {
      case '1': aux = 'POSITIVO'; break;
      case '2': aux = 'NEGATIVO'; break;
      case '3': aux = 'PENDIENTE'; break;
      default: aux = '       '; break;
    }
    datos.telesalud.fta.push(aux);

    if ($_HC702A.dato_4040.tabla_fta_abs_esq_w[1]['fecha_fta_abs_esq_w'].trim() != '') {
      datos.telesalud.fta.push($_HC702A.dato_4040.tabla_fta_abs_esq_w[1]['fecha_fta_abs_esq_w'].substring(0, 4));
      datos.telesalud.fta.push($_HC702A.dato_4040.tabla_fta_abs_esq_w[1]['fecha_fta_abs_esq_w'].substring(4, 6));
      datos.telesalud.fta.push($_HC702A.dato_4040.tabla_fta_abs_esq_w[1]['fecha_fta_abs_esq_w'].substring(6, 8));
    } else {
      datos.telesalud.fta.push('    ');
      datos.telesalud.fta.push('  ');
      datos.telesalud.fta.push('  ');
    }

    aux = '';
    switch ($_HC702A.dato_4040.tabla_fta_abs_esq_w[1]['resultado_fta_abs_esq_w']) {
      case '1': aux = 'POSITIVO'; break;
      case '2': aux = 'NEGATIVO'; break;
      case '3': aux = 'PENDIENTE'; break;
      default: aux = '       '; break;
    }
    datos.telesalud.fta.push(aux);

    if ($_HC702A.dato_4040.tabla_fta_abs_esq_w[2]['fecha_fta_abs_esq_w'].trim() != '') {
      datos.telesalud.fta.push($_HC702A.dato_4040.tabla_fta_abs_esq_w[2]['fecha_fta_abs_esq_w'].substring(0, 4));
      datos.telesalud.fta.push($_HC702A.dato_4040.tabla_fta_abs_esq_w[2]['fecha_fta_abs_esq_w'].substring(4, 6));
      datos.telesalud.fta.push($_HC702A.dato_4040.tabla_fta_abs_esq_w[2]['fecha_fta_abs_esq_w'].substring(6, 8));
    } else {
      datos.telesalud.fta.push('    ');
      datos.telesalud.fta.push('  ');
      datos.telesalud.fta.push('  ');
    }

    aux = '';
    switch ($_HC702A.dato_4040.tabla_fta_abs_esq_w[2]['resultado_fta_abs_esq_w']) {
      case '1': aux = 'POSITIVO'; break;
      case '2': aux = 'NEGATIVO'; break;
      case '3': aux = 'PENDIENTE'; break;
      default: aux = '       '; break;
    }
    datos.telesalud.fta.push(aux);

    // TELESALUD UROANALISIS

    if ($_HC702A.dato_4040.tabla_uroanali_esq_w[0]['fecha_uroanali_esq_w'].trim() != '') {
      datos.telesalud.uroanalisis.push($_HC702A.dato_4040.tabla_uroanali_esq_w[0]['fecha_uroanali_esq_w'].substring(0, 4));
      datos.telesalud.uroanalisis.push($_HC702A.dato_4040.tabla_uroanali_esq_w[0]['fecha_uroanali_esq_w'].substring(4, 6));
      datos.telesalud.uroanalisis.push($_HC702A.dato_4040.tabla_uroanali_esq_w[0]['fecha_uroanali_esq_w'].substring(6, 8));
    } else {
      datos.telesalud.uroanalisis.push('    ');
      datos.telesalud.uroanalisis.push('  ');
      datos.telesalud.uroanalisis.push('  ');
    }

    aux = '';
    switch ($_HC702A.dato_4040.tabla_uroanali_esq_w[0]['resultado_uroanali_esq_w']) {
      case '1': aux = 'NORMAL'; break;
      case '2': aux = 'ANORMAL'; break;
      case '3': aux = 'PENDIENTE'; break;
      default: aux = '       '; break;
    }
    datos.telesalud.uroanalisis.push(aux);

    if ($_HC702A.dato_4040.tabla_uroanali_esq_w[1]['fecha_uroanali_esq_w'].trim() != '') {
      datos.telesalud.uroanalisis.push($_HC702A.dato_4040.tabla_uroanali_esq_w[1]['fecha_uroanali_esq_w'].substring(0, 4));
      datos.telesalud.uroanalisis.push($_HC702A.dato_4040.tabla_uroanali_esq_w[1]['fecha_uroanali_esq_w'].substring(4, 6));
      datos.telesalud.uroanalisis.push($_HC702A.dato_4040.tabla_uroanali_esq_w[1]['fecha_uroanali_esq_w'].substring(6, 8));
    } else {
      datos.telesalud.uroanalisis.push('    ');
      datos.telesalud.uroanalisis.push('  ');
      datos.telesalud.uroanalisis.push('  ');
    }

    aux = '';
    switch ($_HC702A.dato_4040.tabla_uroanali_esq_w[1]['resultado_uroanali_esq_w']) {
      case '1': aux = 'NORMAL'; break;
      case '2': aux = 'ANORMAL'; break;
      case '3': aux = 'PENDIENTE'; break;
      default: aux = '       '; break;
    }
    datos.telesalud.uroanalisis.push(aux);

    if ($_HC702A.dato_4040.tabla_uroanali_esq_w[2]['fecha_uroanali_esq_w'].trim() != '') {
      datos.telesalud.uroanalisis.push($_HC702A.dato_4040.tabla_uroanali_esq_w[2]['fecha_uroanali_esq_w'].substring(0, 4));
      datos.telesalud.uroanalisis.push($_HC702A.dato_4040.tabla_uroanali_esq_w[2]['fecha_uroanali_esq_w'].substring(4, 6));
      datos.telesalud.uroanalisis.push($_HC702A.dato_4040.tabla_uroanali_esq_w[2]['fecha_uroanali_esq_w'].substring(6, 8));
    } else {
      datos.telesalud.uroanalisis.push('    ');
      datos.telesalud.uroanalisis.push('  ');
      datos.telesalud.uroanalisis.push('  ');
    }

    aux = '';
    switch ($_HC702A.dato_4040.tabla_uroanali_esq_w[2]['resultado_uroanali_esq_w']) {
      case '1': aux = 'NORMAL'; break;
      case '2': aux = 'ANORMAL'; break;
      case '3': aux = 'PENDIENTE'; break;
      default: aux = '       '; break;
    }
    datos.telesalud.uroanalisis.push(aux);

    // TELESALUD UROCULTIVO

    if ($_HC702A.dato_4040.tabla_uroculti_esq_w[0]['fecha_uroculti_esq_w'].trim() != '') {
      datos.telesalud.urocultivo.push($_HC702A.dato_4040.tabla_uroculti_esq_w[0]['fecha_uroculti_esq_w'].substring(0, 4));
      datos.telesalud.urocultivo.push($_HC702A.dato_4040.tabla_uroculti_esq_w[0]['fecha_uroculti_esq_w'].substring(4, 6));
      datos.telesalud.urocultivo.push($_HC702A.dato_4040.tabla_uroculti_esq_w[0]['fecha_uroculti_esq_w'].substring(6, 8));
    } else {
      datos.telesalud.urocultivo.push('    ');
      datos.telesalud.urocultivo.push('  ');
      datos.telesalud.urocultivo.push('  ');
    }

    aux = '';
    switch ($_HC702A.dato_4040.tabla_uroculti_esq_w[0]['resultado_uroculti_esq_w']) {
      case '1': aux = 'NORMAL'; break;
      case '2': aux = 'ANORMAL'; break;
      case '3': aux = 'PENDIENTE'; break;
      default: aux = '       '; break;
    }
    datos.telesalud.urocultivo.push(aux);

    if ($_HC702A.dato_4040.tabla_uroculti_esq_w[1]['fecha_uroculti_esq_w'].trim() != '') {
      datos.telesalud.urocultivo.push($_HC702A.dato_4040.tabla_uroculti_esq_w[1]['fecha_uroculti_esq_w'].substring(0, 4));
      datos.telesalud.urocultivo.push($_HC702A.dato_4040.tabla_uroculti_esq_w[1]['fecha_uroculti_esq_w'].substring(4, 6));
      datos.telesalud.urocultivo.push($_HC702A.dato_4040.tabla_uroculti_esq_w[1]['fecha_uroculti_esq_w'].substring(6, 8));
    } else {
      datos.telesalud.urocultivo.push('    ');
      datos.telesalud.urocultivo.push('  ');
      datos.telesalud.urocultivo.push('  ');
    }

    aux = '';
    switch ($_HC702A.dato_4040.tabla_uroculti_esq_w[1]['resultado_uroculti_esq_w']) {
      case '1': aux = 'NORMAL'; break;
      case '2': aux = 'ANORMAL'; break;
      case '3': aux = 'PENDIENTE'; break;
      default: aux = '       '; break;
    }
    datos.telesalud.urocultivo.push(aux);

    if ($_HC702A.dato_4040.tabla_uroculti_esq_w[2]['fecha_uroculti_esq_w'].trim() != '') {
      datos.telesalud.urocultivo.push($_HC702A.dato_4040.tabla_uroculti_esq_w[2]['fecha_uroculti_esq_w'].substring(0, 4));
      datos.telesalud.urocultivo.push($_HC702A.dato_4040.tabla_uroculti_esq_w[2]['fecha_uroculti_esq_w'].substring(4, 6));
      datos.telesalud.urocultivo.push($_HC702A.dato_4040.tabla_uroculti_esq_w[2]['fecha_uroculti_esq_w'].substring(6, 8));
    } else {
      datos.telesalud.urocultivo.push('    ');
      datos.telesalud.urocultivo.push('  ');
      datos.telesalud.urocultivo.push('  ');
    }

    aux = '';
    switch ($_HC702A.dato_4040.tabla_uroculti_esq_w[2]['resultado_uroculti_esq_w']) {
      case '1': aux = 'NORMAL'; break;
      case '2': aux = 'ANORMAL'; break;
      case '3': aux = 'PENDIENTE'; break;
      default: aux = '       '; break;
    }
    datos.telesalud.urocultivo.push(aux);

    // TELESALUD FROTIS VAG

    if ($_HC702A.dato_4040.tabla_frotisv_esq_w[0]['fecha_frotisv_esq_w'].trim() != '') {
      datos.telesalud.frotis.push($_HC702A.dato_4040.tabla_frotisv_esq_w[0]['fecha_frotisv_esq_w'].substring(0, 4));
      datos.telesalud.frotis.push($_HC702A.dato_4040.tabla_frotisv_esq_w[0]['fecha_frotisv_esq_w'].substring(4, 6));
      datos.telesalud.frotis.push($_HC702A.dato_4040.tabla_frotisv_esq_w[0]['fecha_frotisv_esq_w'].substring(6, 8));
    } else {
      datos.telesalud.frotis.push('    ');
      datos.telesalud.frotis.push('  ');
      datos.telesalud.frotis.push('  ');
    }

    aux = '';
    switch ($_HC702A.dato_4040.tabla_frotisv_esq_w[0]['resultado_frotisv_esq_w']) {
      case '1': aux = 'NORMAL'; break;
      case '2': aux = 'ANORMAL'; break;
      case '3': aux = 'PENDIENTE'; break;
      default: aux = '       '; break;
    }
    datos.telesalud.frotis.push(aux);

    if ($_HC702A.dato_4040.tabla_frotisv_esq_w[1]['fecha_frotisv_esq_w'].trim() != '') {
      datos.telesalud.frotis.push($_HC702A.dato_4040.tabla_frotisv_esq_w[1]['fecha_frotisv_esq_w'].substring(0, 4));
      datos.telesalud.frotis.push($_HC702A.dato_4040.tabla_frotisv_esq_w[1]['fecha_frotisv_esq_w'].substring(4, 6));
      datos.telesalud.frotis.push($_HC702A.dato_4040.tabla_frotisv_esq_w[1]['fecha_frotisv_esq_w'].substring(6, 8));
    } else {
      datos.telesalud.frotis.push('    ');
      datos.telesalud.frotis.push('  ');
      datos.telesalud.frotis.push('  ');
    }

    aux = '';
    switch ($_HC702A.dato_4040.tabla_frotisv_esq_w[1]['resultado_frotisv_esq_w']) {
      case '1': aux = 'NORMAL'; break;
      case '2': aux = 'ANORMAL'; break;
      case '3': aux = 'PENDIENTE'; break;
      default: aux = '       '; break;
    }
    datos.telesalud.frotis.push(aux);

    if ($_HC702A.dato_4040.tabla_frotisv_esq_w[2]['fecha_frotisv_esq_w'].trim() != '') {
      datos.telesalud.frotis.push($_HC702A.dato_4040.tabla_frotisv_esq_w[2]['fecha_frotisv_esq_w'].substring(0, 4));
      datos.telesalud.frotis.push($_HC702A.dato_4040.tabla_frotisv_esq_w[2]['fecha_frotisv_esq_w'].substring(4, 6));
      datos.telesalud.frotis.push($_HC702A.dato_4040.tabla_frotisv_esq_w[2]['fecha_frotisv_esq_w'].substring(6, 8));
    } else {
      datos.telesalud.frotis.push('    ');
      datos.telesalud.frotis.push('  ');
      datos.telesalud.frotis.push('  ');
    }

    aux = '';
    switch ($_HC702A.dato_4040.tabla_frotisv_esq_w[2]['resultado_frotisv_esq_w']) {
      case '1': aux = 'NORMAL'; break;
      case '2': aux = 'ANORMAL'; break;
      case '3': aux = 'PENDIENTE'; break;
      default: aux = '       '; break;
    }
    datos.telesalud.frotis.push(aux);

    // TELESALUD GLICEMIA

    if ($_HC702A.dato_4040.tabla_glicemia_esq_w[0]['fecha_glicemia_esq_w'].trim() != '') {
      datos.telesalud.glicemia.push($_HC702A.dato_4040.tabla_glicemia_esq_w[0]['fecha_glicemia_esq_w'].substring(0, 4));
      datos.telesalud.glicemia.push($_HC702A.dato_4040.tabla_glicemia_esq_w[0]['fecha_glicemia_esq_w'].substring(4, 6));
      datos.telesalud.glicemia.push($_HC702A.dato_4040.tabla_glicemia_esq_w[0]['fecha_glicemia_esq_w'].substring(6, 8));
    } else {
      datos.telesalud.glicemia.push('    ');
      datos.telesalud.glicemia.push('  ');
      datos.telesalud.glicemia.push('  ');
    }

    datos.telesalud.glicemia.push($_HC702A.dato_4040.tabla_glicemia_esq_w[0]['resultado_glicemia_esq_w'])

    if ($_HC702A.dato_4040.tabla_glicemia_esq_w[1]['fecha_glicemia_esq_w'].trim() != '') {
      datos.telesalud.glicemia.push($_HC702A.dato_4040.tabla_glicemia_esq_w[1]['fecha_glicemia_esq_w'].substring(0, 4));
      datos.telesalud.glicemia.push($_HC702A.dato_4040.tabla_glicemia_esq_w[1]['fecha_glicemia_esq_w'].substring(4, 6));
      datos.telesalud.glicemia.push($_HC702A.dato_4040.tabla_glicemia_esq_w[1]['fecha_glicemia_esq_w'].substring(6, 8));
    } else {
      datos.telesalud.glicemia.push('    ');
      datos.telesalud.glicemia.push('  ');
      datos.telesalud.glicemia.push('  ');
    }

    datos.telesalud.glicemia.push($_HC702A.dato_4040.tabla_glicemia_esq_w[1]['resultado_glicemia_esq_w'])

    if ($_HC702A.dato_4040.tabla_glicemia_esq_w[2]['fecha_glicemia_esq_w'].trim() != '') {
      datos.telesalud.glicemia.push($_HC702A.dato_4040.tabla_glicemia_esq_w[2]['fecha_glicemia_esq_w'].substring(0, 4));
      datos.telesalud.glicemia.push($_HC702A.dato_4040.tabla_glicemia_esq_w[2]['fecha_glicemia_esq_w'].substring(4, 6));
      datos.telesalud.glicemia.push($_HC702A.dato_4040.tabla_glicemia_esq_w[2]['fecha_glicemia_esq_w'].substring(6, 8));
    } else {
      datos.telesalud.glicemia.push('    ');
      datos.telesalud.glicemia.push('  ');
      datos.telesalud.glicemia.push('  ');
    }

    datos.telesalud.glicemia.push($_HC702A.dato_4040.tabla_glicemia_esq_w[2]['resultado_glicemia_esq_w'])

    // TELESALUD HEPATITIS B

    if ($_HC702A.dato_4040.hepatitis_b_esq_w['fecha_hepat_b_esq_w'].trim() != '') {
      datos.telesalud.hepatitis.push($_HC702A.dato_4040.hepatitis_b_esq_w['fecha_hepat_b_esq_w'].substring(0, 4))
      datos.telesalud.hepatitis.push($_HC702A.dato_4040.hepatitis_b_esq_w['fecha_hepat_b_esq_w'].substring(4, 6))
      datos.telesalud.hepatitis.push($_HC702A.dato_4040.hepatitis_b_esq_w['fecha_hepat_b_esq_w'].substring(6, 8))
    } else {
      datos.telesalud.hepatitis.push('    ');
      datos.telesalud.hepatitis.push('  ');
      datos.telesalud.hepatitis.push('  ');
    }

    aux = '';
    switch ($_HC702A.dato_4040.hepatitis_b_esq_w['resultado_hepat_b_esq_w']) {
      case '1': aux = 'POSITIVO'; break;
      case '2': aux = 'NEGATIVO'; break;
      case '3': aux = 'PENDIENTE'; break;
      default: aux = '       '; break;
    }
    datos.telesalud.hepatitis.push(aux);

    // TELESALUD FECHAS INTERCONSULTA

    datos.telesalud.fechaGine = $_HC702A.dato_4040.fecha_interconsulta_esq_w['fecha_gineco_esq_w'];
    datos.telesalud.fechaOdont = $_HC702A.dato_4040.fecha_interconsulta_esq_w['fecha_odonto_esq_w'];
    datos.telesalud.fechaNutri = $_HC702A.dato_4040.fecha_interconsulta_esq_w['fecha_nutri_esq_w'];
    datos.telesalud.fechaPsico = $_HC702A.dato_4040.fecha_interconsulta_esq_w['fecha_psicol_esq_w'];

    if (($_HC702A.dato_4040.prenatal_esq_w['fecha_aseso_pre_esq_w'].trim() == '' || parseFloat($_HC702A.dato_4040.prenatal_esq_w['fecha_aseso_pre_esq_w']) == 0)
      && ($_HC702A.dato_4040.prenatal_esq_w['fecha_vac_influ_esq_w'].trim() == '' || parseFloat($_HC702A.dato_4040.prenatal_esq_w['fecha_vac_influ_esq_w']) == 0)
      && ($_HC702A.dato_4040.prenatal_esq_w['fecha_aseso_pos_esq_w'].trim() == '' || parseFloat($_HC702A.dato_4040.prenatal_esq_w['fecha_aseso_pos_esq_w']) == 0)
      && ($_HC702A.dato_4040.prenatal_esq_w['fecha_vac_tdap_esq_w'].trim() == '' || parseFloat($_HC702A.dato_4040.prenatal_esq_w['fecha_vac_tdap_esq_w']) == 0)
      && ($_HC702A.dato_4040.prenatal_esq_w['fecha_vac_tdap_esq_w'].trim() == '' || parseFloat($_HC702A.dato_4040.prenatal_esq_w['fecha_vac_tdap_esq_w']) == 0)
      && ($_HC702A.dato_4040.prenatal_esq_w['fecha_eco_obst_esq_w'].trim() == '' || parseFloat($_HC702A.dato_4040.prenatal_esq_w['fecha_eco_obst_esq_w']) == 0)
      && ($_HC702A.dato_4040.prenatal_esq_w['fecha_vac_tt_esq_w'].trim() == '' || parseFloat($_HC702A.dato_4040.prenatal_esq_w['fecha_vac_tt_esq_w']) == 0)
    ) {
      datos.telesalud.banderaTabla1 = false;
      datos.telesalud.banderaTabla2 = false;
    } else {
      datos.telesalud.banderaTabla1 = true;
      datos.telesalud.banderaTabla2 = true;
    }

    if (($_HC702A.dato_4040.tabla_vih_esq_w[0]['fecha_vih_esq_w'].trim() == '' && $_HC702A.dato_4040.tabla_vih_esq_w[1]['fecha_vih_esq_w'].trim() == '' && $_HC702A.dato_4040.tabla_vih_esq_w[2]['fecha_vih_esq_w'].trim() == '')
      && ($_HC702A.dato_4040.tabla_serolo_esq_w[0]['fecha_serolo_esq_w'].trim() == '' && $_HC702A.dato_4040.tabla_serolo_esq_w[1]['fecha_serolo_esq_w'].trim() == '' && $_HC702A.dato_4040.tabla_serolo_esq_w[2]['fecha_serolo_esq_w'].trim() == '')
      && ($_HC702A.dato_4040.tabla_hemogl_esq_w[0]['fecha_hemogl_esq_w'].trim() == '' && $_HC702A.dato_4040.tabla_hemogl_esq_w[1]['fecha_hemogl_esq_w'].trim() == '' && $_HC702A.dato_4040.tabla_hemogl_esq_w[2]['fecha_hemogl_esq_w'].trim() == '')
      && ($_HC702A.dato_4040.tabla_igg_esq_w[0]['fecha_igg_esq_w'].trim() == '' && $_HC702A.dato_4040.tabla_igg_esq_w[1]['fecha_igg_esq_w'].trim() == '' && $_HC702A.dato_4040.tabla_igg_esq_w[2]['fecha_igg_esq_w'].trim() == '')
      && ($_HC702A.dato_4040.tabla_glicem_esq_w[0]['fecha_glicem_esq_w'].trim() == '' && $_HC702A.dato_4040.tabla_glicem_esq_w[1]['fecha_glicem_esq_w'].trim() == '' && $_HC702A.dato_4040.tabla_glicem_esq_w[2]['fecha_glicem_esq_w'].trim() == '')
      && ($_HC702A.dato_4040.tabla_hemogra_esq_w[0]['fecha_hemogra_esq_w'].trim() == '' && $_HC702A.dato_4040.tabla_hemogra_esq_w[1]['fecha_hemogra_esq_w'].trim() == '' && $_HC702A.dato_4040.tabla_hemogra_esq_w[2]['fecha_hemogra_esq_w'].trim() == '')
      && ($_HC702A.dato_4040.tabla_hemopara_esq_w[0]['fecha_hemopara_esq_w'].trim() == '' && $_HC702A.dato_4040.tabla_hemopara_esq_w[1]['fecha_hemopara_esq_w'].trim() == '' && $_HC702A.dato_4040.tabla_hemopara_esq_w[2]['fecha_hemopara_esq_w'].trim() == '')
      && ($_HC702A.dato_4040.tabla_fta_abs_esq_w[0]['fecha_fta_abs_esq_w'].trim() == '' && $_HC702A.dato_4040.tabla_fta_abs_esq_w[1]['fecha_fta_abs_esq_w'].trim() == '' && $_HC702A.dato_4040.tabla_fta_abs_esq_w[2]['fecha_fta_abs_esq_w'].trim() == '')
      && ($_HC702A.dato_4040.tabla_uroanali_esq_w[0]['fecha_uroanali_esq_w'].trim() == '' && $_HC702A.dato_4040.tabla_uroanali_esq_w[1]['fecha_uroanali_esq_w'].trim() == '' && $_HC702A.dato_4040.tabla_uroanali_esq_w[2]['fecha_uroanali_esq_w'].trim() == '')
      && ($_HC702A.dato_4040.tabla_uroculti_esq_w[0]['fecha_uroculti_esq_w'].trim() == '' && $_HC702A.dato_4040.tabla_uroculti_esq_w[1]['fecha_uroculti_esq_w'].trim() == '' && $_HC702A.dato_4040.tabla_uroculti_esq_w[2]['fecha_uroculti_esq_w'].trim() == '')
      && ($_HC702A.dato_4040.tabla_frotisv_esq_w[0]['fecha_frotisv_esq_w'].trim() == '' && $_HC702A.dato_4040.tabla_frotisv_esq_w[1]['fecha_frotisv_esq_w'].trim() == '' && $_HC702A.dato_4040.tabla_frotisv_esq_w[2]['fecha_frotisv_esq_w'].trim() == '')
      && ($_HC702A.dato_4040.tabla_glicemia_esq_w[0]['fecha_glicemia_esq_w'].trim() == '' && $_HC702A.dato_4040.tabla_glicemia_esq_w[1]['fecha_glicemia_esq_w'].trim() == '' && $_HC702A.dato_4040.tabla_glicemia_esq_w[2]['fecha_glicemia_esq_w'].trim() == '')

    ) {
      datos.telesalud.banderaTabla3 = false;
    } else {
      datos.telesalud.banderaTabla3 = true;
    }

    if (($_HC702A.dato_4040.fecha_interconsulta_esq_w['fecha_gineco_esq_w'].trim() == '' || parseFloat($_HC702A.dato_4040.fecha_interconsulta_esq_w['fecha_gineco_esq_w']) == 0)
      && ($_HC702A.dato_4040.fecha_interconsulta_esq_w['fecha_odonto_esq_w'].trim() == '' || parseFloat($_HC702A.dato_4040.fecha_interconsulta_esq_w['fecha_odonto_esq_w']) == 0)
      && ($_HC702A.dato_4040.fecha_interconsulta_esq_w['fecha_nutri_esq_w'].trim() == '' || parseFloat($_HC702A.dato_4040.fecha_interconsulta_esq_w['fecha_nutri_esq_w']) == 0)
      && ($_HC702A.dato_4040.fecha_interconsulta_esq_w['fecha_psicol_esq_w'].trim() == '' || parseFloat($_HC702A.dato_4040.fecha_interconsulta_esq_w['fecha_psicol_esq_w']) == 0)
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

function imprimirObstetrico_HC702A() {
  if ($_HC702A.dato_4040 != undefined) {
    datos.obst.bandera = true;

    var edad_gest_dec = parseFloat($_HC702A.dato_4040.obstetric_esq_w['edad_gest_regla_esq_w'].substring(2, 5));
    var dias_gest_w = Math.round(7 * edad_gest_dec);

    aux = $_HC702A.dato_4040.obstetric_esq_w['edad_gest_regla_esq_w'].substring(0, 2) + '+' + dias_gest_w.toString().substring(0, 1);

    datos.obst.cont.push(aux);
    datos.obst.cont.push($_HC702A.dato_4040.obstetric_esq_w['edad_gest_ultra_esq_w']);
    datos.obst.cont.push($_HC702A.dato_4040.obstetric_esq_w['fecha_parto_fur_esq_w']);
    datos.obst.cont.push($_HC702A.dato_4040.obstetric_esq_w['fecha_parto_son_esq_w']);

    datos.obst.cont.push(_editarFecha($_HC702A.dato_4040.obstetric_esq_w['fecha_parto_fur_cale_esq_w']));
    datos.obst.cont.push(_editarFecha($_HC702A.dato_4040.obstetric_esq_w['fecha_parto_son_cale_esq_w']));

    if ($_HC702A.dato_4040.obstetric_esq_w['presentac_esq_w'].trim() != '' || $_HC702A.dato_4040.obstetric_esq_w['presentac_esq_w'] != 4) {
      aux = '';
      switch ($_HC702A.dato_4040.obstetric_esq_w['presentac_esq_w']) {
        case '1': aux = 'CEFALICO'; break;
        case '2': aux = 'PODALICO'; break;
        case '3': aux = 'TRANSVERSO'; break;
        case '4': aux = 'NO APLICA'; break;
        default: aux = '     '; break;
      }
      datos.obst.titLin.push('PRESENTACIÓN: ');
      datos.obst.contLin.push(aux);
    }

    if ($_HC702A.dato_4040.obstetric_esq_w['situacion_esq_w'].trim() != '' || $_HC702A.dato_4040.obstetric_esq_w['situacion_esq_w'] != 4) {
      aux = '';
      switch ($_HC702A.dato_4040.obstetric_esq_w['situacion_esq_w']) {
        case '1': aux = 'LONGITUDINAL'; break;
        case '2': aux = 'TRANSVERSAL'; break;
        case '3': aux = 'OBLICUO'; break;
        default: aux = '     '; break;
      }
      datos.obst.titLin.push('SITUACIÓN: ');
      datos.obst.contLin.push(aux);
    }

    if ($_HC702A.dato_4040.obstetric_esq_w['dorso_obs_esq_w'].trim() != '' || $_HC702A.dato_4040.obstetric_esq_w['dorso_obs_esq_w'] != 4) {
      aux = '';
      switch ($_HC702A.dato_4040.obstetric_esq_w['dorso_obs_esq_w']) {
        case '1': aux = 'ANTERIOR SUPERIOR'; break;
        case '2': aux = 'ANTERIOR INFERIOR'; break;
        case '3': aux = 'POSTERIOR SUPERIOR'; break;
        case '4': aux = 'POSTERIOR INFERIOR'; break;
        default: aux = '     '; break;
      }
      datos.obst.titLin.push('DORSO: ');
      datos.obst.contLin.push(aux);
    }

    if (parseFloat($_HC702A.dato_4040.obstetric_esq_w['liq_amniot_vol_esq_w']) > 0) {
      datos.obst.titLin.push('VOL. LIQ. AMNIOTICO: ');
      datos.obst.contLin.push($_HC702A.dato_4040.obstetric_esq_w['liq_amniot_vol_esq_w']);
    }

    if ($_HC702A.dato_4040.obstetric_esq_w['polihidram_esq_w'].trim() != '') {
      datos.obst.titLin.push('POLIHIDRAMNIOS? ');
      datos.obst.contLin.push($_HC702A.dato_4040.obstetric_esq_w['polihidram_esq_w']);
    }

    if ($_HC702A.dato_4040.obstetric_esq_w['oligoamnio_esq_w'].trim() != '') {
      datos.obst.titLin.push('OLIGOAMNIOS? ');
      datos.obst.contLin.push($_HC702A.dato_4040.obstetric_esq_w['oligoamnio_esq_w']);
    }

    if (parseFloat($_HC702A.dato_4040.obstetric_esq_w['implantacion_esq_w']) > 0) {
      aux = '';
      switch ($_HC702A.dato_4040.obstetric_esq_w['implantacion_esq_w']) {
        case '01': aux = "FUNDICA            "; break;
        case '02': aux = "ANTERIOR           "; break;
        case '03': aux = "POSTERIOR          "; break;
        case '04': aux = "LATERAL IZQUIERDA  "; break;
        case '05': aux = "LATERAL DERECHA    "; break;
        case '06': aux = "MARGINAL ANTERIOR  "; break;
        case '07': aux = "MARGINAL POSTERIOR "; break;
        case '08': aux = "MARGINAL LATER,IZQ "; break;
        case '09': aux = "MARGINAL LATER.DER "; break;
        case '10': aux = "PREVIA PARC.LAT.IZQ"; break;
        case '11': aux = "PREVIA PARC.LAT.DER"; break;
        case '12': aux = "PREVIA PARCIAL POST"; break;
        case '13': aux = "PREVIA PARCIAL ANT."; break;
        case '14': aux = "PREVIA CENTRAL TOT."; break;
        default: aux = '                    '; break;
      }
      datos.obst.titLin.push('IMPLANTAC. PLACENTA: ');
      datos.obst.contLin.push(aux);
    }

    if (parseFloat($_HC702A.dato_4040.obstetric_esq_w['dist_cervix_esq_w']) > 0) {
      datos.obst.titLin.push('DISTANCIA DE CERVIX: ');
      datos.obst.contLin.push($_HC702A.dato_4040.obstetric_esq_w['dist_cervix_esq_w']);
    }

    if (parseFloat($_HC702A.dato_4040.obstetric_esq_w['frec_card_fetal_esq_w']) > 0) {
      datos.obst.titLin.push('FREC. CARD. FETAL: ');
      datos.obst.contLin.push($_HC702A.dato_4040.obstetric_esq_w['frec_card_fetal_esq_w']);
    }

    if (parseFloat($_HC702A.dato_4040.obstetric_esq_w['umbil_ir_esq_w']) > 0 || parseFloat($_HC702A.dato_4040.obstetric_esq_w['cereb_ir_esq_w']) > 0) {
      daotos.obst.banderaFlujo = true;

      d1 = new Intl.NumberFormat("de-DE").format($_HC702A.dato_4040.obstetric_esq_w['umbil_ir_esq_w']);
      d2 = new Intl.NumberFormat("de-DE").format($_HC702A.dato_4040.obstetric_esq_w['umbil_ip_esq_w']);
      d3 = new Intl.NumberFormat("de-DE").format($_HC702A.dato_4040.obstetric_esq_w['umbil_sd_esq_w']);

      arrayAux = {
        flujo: 'UMBILICAL: ',
        ir: d1,
        ip: d2,
        sd: d3
      }
      datos.obst.cont2.push(arrayAux);

      d1 = new Intl.NumberFormat("de-DE").format($_HC702A.dato_4040.obstetric_esq_w['cereb_ir_esq_w']);
      d2 = new Intl.NumberFormat("de-DE").format($_HC702A.dato_4040.obstetric_esq_w['cereb_ip_esq_w']);
      d3 = new Intl.NumberFormat("de-DE").format($_HC702A.dato_4040.obstetric_esq_w['cereb_sd_esq_w']);

      arrayAux = {
        flujo: 'CEREBRAL MEDIA: ',
        ir: d1,
        ip: d2,
        sd: d3
      }
      datos.obst.cont2.push(arrayAux);

      d1 = new Intl.NumberFormat("de-DE").format($_HC702A.dato_4040.obstetric_esq_w['utder_ir_esq_w']);
      d2 = new Intl.NumberFormat("de-DE").format($_HC702A.dato_4040.obstetric_esq_w['utder_ip_esq_w']);
      d3 = new Intl.NumberFormat("de-DE").format($_HC702A.dato_4040.obstetric_esq_w['utder_sd_esq_w']);

      arrayAux = {
        flujo: 'UTERINO DERECHA: ',
        ir: d1,
        ip: d2,
        sd: d3
      }
      datos.obst.cont2.push(arrayAux);

      d1 = new Intl.NumberFormat("de-DE").format($_HC702A.dato_4040.obstetric_esq_w['utizq_ir_esq_w']);
      d2 = new Intl.NumberFormat("de-DE").format($_HC702A.dato_4040.obstetric_esq_w['utizq_ip_esq_w']);
      d3 = new Intl.NumberFormat("de-DE").format($_HC702A.dato_4040.obstetric_esq_w['utizq_sd_esq_w']);

      arrayAux = {
        flujo: 'UTERINO IZQUIERDA: ',
        ir: d1,
        ip: d2,
        sd: d3
      }
      datos.obst.cont2.push(arrayAux);

      if ($_HC702A.dato_4040.obstetric_esq_w['observ_flujomet_esq_w'].trim() != '') {
        datos.obst.observTit = 'OBSERV. FLUJOMETRIA: ';
        datos.obst.observ = $_HC702A.dato_4040.obstetric_esq_w['observ_flujomet_esq_w'];
      }
    }
  } else {
    datos.obst.bandera = false;
  }
}

async function imprimirDiagnostico_HC702A() {
  for (i in $_HC702A._hcprc.rips.tabla_diag) {
    await diagArray.push($_HC702A._hcprc.rips.tabla_diag[i].diagn)
  }
  diagArray = diagArray.toString().replace(/\,/g, "")

  if (diagArray.trim() != '') {
    await _cargarDiag_HC702A();
  }
}

async function _cargarDiag_HC702A() {
  await postData({ datosh: datosEnvio() + diagArray }, get_url("app/HICLIN/HCI-8031-1.DLL"))
    .then(async data => {
      $_HC702A.diagnostico = data;
      for (i in $_HC702A.diagnostico) {
        if ($_HC702A.diagnostico[i].cod_diagn.trim() != '') {
          await datos.datosAnalisis.diagnostico.push($_HC702A.diagnostico[i].cod_diagn + ' - ' + $_HC702A.diagnostico[i].nom_diagn)
        }
      }
    }).catch(err => {
      console.log(err, 'error')
    })
}

function imprimirAnalisis_HC702A() {
  $_HC702A.analisis_hc != undefined ? datos.datosAnalisis.analisis = $_HC702A.analisis_hc : false;
  $_HC702A.plan_hc ? datos.plan = $_HC702A.plan_hc : datos.plan = false;
}

function imprimirRips_HC702A() {
  if (parseFloat($_HC702A._hcprc.rips.causa) > 0) {
    datos.rips.titulos.push('CAUSA: ');
    aux = '';
    switch (parseFloat($_HC702A._hcprc.rips.causa)) {
      case 1: aux = 'ACCIDENTE DE TRABAJO'; break;
      case 2: aux = 'ACCIDENTE DE TRANSITO'; break;
      case 3: aux = 'ACCIDENTE RABICO'; break;
      case 4: aux = 'ACCIDENTE OFIDICO'; break;
      case 5: aux = 'OTRO TIPO DE ACCIDENTE'; break;
      case 6: aux = 'EVENTO CATASTROFICO'; break;
      case 7: aux = 'LESION POR AGRESION'; break;
      case 8: aux = 'LESION AUTOINFLIGIDA'; break;
      case 9: aux = 'SOSPECHA MALTRATO FISICO'; break;
      case 10: aux = 'SOSPECHA ABUSO SEXUAL'; break;
      case 11: aux = 'SOSPECHA VIOLENCIA SEXUAL'; break;
      case 12: aux = 'SOSPECHA MALTRATO EMOCION'; break;
      case 13: aux = 'ENFERMEDAD GENERAL'; break;
      case 14: aux = 'ENFERMEDAD PROFESIONAL'; break;
      case 15: aux = 'NO APLICA'; break;
      default: aux = '       '; break;
    }
    datos.rips.contenido.push(aux);
  }

  if (parseFloat($_HC702A._hcprc.cierre.unserv) == 08) {
    datos.rips.titulos.push('P & P: ');
    datos.rips.contenido.push('SI');
  }

  if (parseFloat($_HC702A._hcprc.rips.finalidad) > 0) {
    datos.rips.titulos.push('FINALIDAD: ');
    aux = '';
    switch (parseFloat($_HC702A._hcprc.rips.finalidad)) {
      case 1: aux = 'ANTENCION PARTO -Puerperio-'; break;
      case 2: aux = 'ATENCION RECIEN NACIDO'; break;
      case 3: aux = 'ATENCION PLANIF.FAMILIAR'; break;
      case 4: aux = 'AT.ALTER.CREC. & DESARR.<10'; break;
      case 5: aux = 'DETECCION ALT. DESARR.JOVEN'; break;
      case 6: aux = 'DETECCION ALT. EMBARAZO'; break;
      case 7: aux = 'DETECCION ALT. ADULTO'; break;
      case 8: aux = 'DETECCION ALT. AGUDEZA VISUAL'; break;
      case 9: aux = 'DETECCION ENFERM.PROFESIONAL'; break;
      case 10: aux = 'NO APLICA'; break;
      case 11: aux = 'PATOLOGIAS CRONICAS'; break;
      default: aux = '       '; break;
    }
    datos.rips.contenido.push(aux);
  }
}

function imprimirSalida_HC702A() {
  if (parseFloat($_HC702A._hcprc.rips.estado_sal) > 0 && parseFloat($_HC702A._hcprc.cierre.estado) < 2) {
    datos.salida.bandera = true;

    aux = '';
    switch ($_HC702A._hcprc.rips.estado_sal) {
      case '1': aux = 'VIVO (A)'; break;
      case '2': aux = 'MUERTO (A)'; break;
      case '3': aux = 'REMITIDO A: '; break;
      case '4': aux = 'HOSPITALIZADO'; break;
      case '5': aux = 'OBSERVACION'; break;
      default: aux = '  '; break;
    }
    datos.salida.estado = aux;

    if ($_HC702A._hcprc.rips.remitido.trim() != '') {
      datos.salida.remitido = $_HC702A._hcprc.rips.remitido;
    } else {
      datos.salida.remitido = '';
    }
  }
}

async function imprimirFirma_HC702A() {
  console.log('resumen h');

  if ($_HC702A._evoluciones.length == 0) {
    datos.medico.bandera = false;
  }

  if ($_HC702A._datos.medico == undefined) {
    $_HC702A._datos.medico = $_HC702A._hcprc.med;
  }

  await postData({ datosh: datosEnvio(), paso: '1', codigo: $_HC702A._datos.medico }, get_url("app/SALUD/SER819.DLL"))
    .then(data => {
      $_HC702A._medico = data;
    }).catch(err => {
      console.log(err, 'error')
      loader('hide')
      _regresar_menuhis();
    })

  res = $_HC702A._especialidades.find(e => e.CODIGO == $_HC702A._medico.TAB_ESPEC[0].COD);
  res != undefined ? datos.medico.espec = res.NOMBRE : false;

  datos.medico.firma = $_HC702A._medico.IDENTIFICACION.trim();

  datos.medico.nombre = $_HC702A._medico.NOMBRE.replace(/\�/g, 'Ñ');
  datos.medico.reg = $_HC702A._medico.REG_MEDICO;

  // res = $_HC702A._especialidades.find(e => e.CODIGO == $_REG_PROF.TAB_ESPEC[0].COD);
  // res != undefined ? datos.medico.espec = res.NOMBRE : false;

  // datos.medico.firma = $_REG_PROF.IDENTIFICACION.trim();

  // $_REG_PROF.NOMBRE = $_REG_PROF.NOMBRE.replace(/\�/g, 'Ñ');

  // datos.medico.nombre = $_REG_PROF.NOMBRE;
  // datos.medico.reg = $_REG_PROF.REG_MEDICO;
}

async function llamarImpresion_HC702A() {
  inicializarFormatoBase_impHc();
  await _imprimirHCI01(datos).then(console.log('termina'))
}

async function recorrerEvoluciones_HC702A() {
  for (var i in $_HC702A._evoluciones) {
    if (parseFloat($_HC702A._evoluciones[i].FECHA_EVO) >= parseInt(fechadesde) && parseFloat($_HC702A._evoluciones[i].FECHA_EVO) <= parseInt(fechahasta)) {
      $_HC702A._evoluciones[i].fecha_total = $_HC702A._evoluciones[i].FECHA_EVO.concat($_HC702A._evoluciones[i].HORA_EVO)
      arrayImp.push($_HC702A._evoluciones[i])
    }
  }

  await ordenar_HC702A()

  let indice_ult = arrayImp.length - 1;
  for (var i in arrayImp) {
    await seleccionarEvolucion_HC702A(arrayImp[i]);

    // if ($this.data_evo['OPC_EVO'].EVOMED == "S") {
    if (opc_evo_w == "S") {
      if (i == indice_ult) await ordenImpresionPorFechas_HC702A();
      else await ordenImpresionPorFechas_HC702A(true)
    }
  }
}

async function ordenar_HC702A() {
  await arrayImp.sort((a, b) => {
    if (parseInt(a.fecha_total) > parseInt(b.fecha_total)) {
      return 1;
    }
    if (parseInt(a.fecha_total) < parseInt(b.fecha_total)) {
      return -1;
    }
    return 0;
  });
}

async function seleccionarEvolucion_HC702A(data) {
  const llave = data['ID_EVO'].concat(data['FOLIO_EVO'], data['FECHA_EVO'], data['HORA_EVO'], data['OPER_ELAB_EVO']);
  $this.data_evo['LLAVE_EVO'] = llave;

  $this.data_evo['ID_EVO'] = data['ID_EVO'];
  $this.data_evo['FOLIO_EVO'] = data['FOLIO_EVO'];
  $this.data_evo['FECHA_EVO'] = data['FECHA_EVO'];
  $this.data_evo['HORA_EVO'] = data['HORA_EVO'];
  $this.data_evo['MACRO_EVO'] = data['MACRO_EVO'];
  $this.data_evo['TIPO_EVO'] = data['TIPO_EVO'];
  $this.data_evo['MEDICO_EVO'] = data['MEDICO_EVO'];
  $this.data_evo['OPER_EVO'] = data['OPER_ELAB_EVO'];
  $this.data_evo['SERV_EVO'] = data['SERV_EVO'];
  $this.data_evo['VIA_EVO'] = data['VIA_EVO'];
  $this.data_evo['OPC_EVO'] = data['OPC_EVO'];
  $this.data_evo['NOM_MEDICO'] = data['NOM_MEDICO'];

  await dataEvolucion_PACIENTE_HC702A();
}

function dataEvolucion_PACIENTE_HC702A() {
  var datos_envio = datosEnvio();

  datos_envio += $this.data_evo['LLAVE_EVO'] + '|';
  datos_envio += localStorage['Usuario'] + '|';
  datos_envio += localStorage['IDUSU'] + '|';

  $this.data_evo['ENV'] = datos_envio;

  const peticion = postData({ datosh: $this.data_evo['ENV'] }, get_url("APP/HICLIN/HC002.DLL"));
  peticion.then((data) => {
    Object.entries(data["EVOLUCION"][0]).forEach(([key, value]) => {
      if (typeof value == 'String') {
        if (typeof $this.data_evo[key] == 'undefined' && value.trim() != '') $this.data_evo[key] = normalizar(value);
      }
      else if (typeof $this.data_evo[key] == 'undefined') $this.data_evo[key] = value;
    })
  }).catch((err) => {
    console.log(err, 'err');
    loader('hide');
  });
}

async function ordenImpresionPorFechas_HC702A(hide_firma) {
  $this.jsonEnvio = {
    folio: $this.data_evo['FOLIO_EVO'],
    macro: $this.data_evo['MACRO_EVO'],
    id: $this.data_evo['ID_EVO'],
    oper: $this.data_evo['OPER_EVO'],
    medic: $this.data_evo['MEDICO_EVO'],
    fecha: $this.data_evo['FECHA_EVO'],
    hora: $this.data_evo['HORA_EVO'],
    tipoEvo: $this.data_evo['TIPO_EVO'],
    _arrayTipoEvo: tipoEvolucion(),
    // _unservDescrip: unser_w,
    _unservCod: $_REG_HC.unser_hc,
    original: null,
    _opciones: {
      opc_evo: opc_evo_w,
      opc_enf: "N",
      opc_ter: "N",
      opc_for: "N",
      opc_lab: "N",
      opc_ima: "N",
      opc_ord: "N",
      opc_con: "N",
      opc_inc: "N",
      opc_resu: $this.data_evo['OPC_EVO'].RESUM,
      fechaIni: $this.fechadesde,
      fechaFin: $this.fechahasta,
      opc_macro: $this.data_evo['MACRO_EVO']
    },
    _arrayProfesionales: $_HC702A._profesionales,
    arrayDatos_HCI02: {
      _ciudades: $_HC702A._ciudades,
      _entidades: $_HC702A._entidades,
      _ocupaciones: $_HC702A._ocupaciones,
      reg_pac: $_HC702A.reg_pac,
      _profesionales: $_HC702A._profesionales,
      _unserv: $_HC702A._unserv,
      _paisesRips: $_HC702A._paisesRips,
      _hcpac: $_HC702A._hcprc,
      _especialidades: $_HC702A._especialidades,
      _detalles: $_HC702A.detalles,

    },
    resumido: true,
    todasFormu: false,
    hide_firma: hide_firma,
    hide_sinto: true,
  }

  await _iniciarHCI02($this.jsonEnvio);
}

function salir_HC702A() {
  loader('hide');
  _regresar_menuhis();
}

async function abrirArchivos_HC702A() {
  loader('show');

  datos_envio = "";

  var folio = $_REG_HC.llave_hc.substr(17, 6),
    llave = "",
    datos_envio = "";
  if ($_REG_HC.novedad_hc != "8") folio = parseFloat(folio) - 1;
  llave =
    folio < 1
      ? (llave = $_REG_HC.llave_hc)
      : $_REG_HC.llave_hc.substr(0, 17) + folio.toString().padStart(6, "0");

  datos_envio = datosEnvio() + llave + "|**|  |";
  postData({ datosh: datos_envio }, get_url("APP/HICLIN/HCDETAL_PRC.DLL"))
    .then((data) => {
      var detalles = Regexp_detalle(
        data.DETHC.filter((e) => e["LLAVE-HC"].trim() != "")
      );
      $_HC702A.detalles = detalles;
    })
    .catch((error) => {
      loader("hide");
      _regresar_menuhis();
    });

  await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER819.DLL"))
    .then(data => {
      $_HC702A._profesionales = data.ARCHPROF;
      $_HC702A._profesionales.pop();
    }).catch(err => {
      console.log(err, 'error')
      loader('hide')
      _regresar_menuhis();
    })

  await postData({ datosh: datosEnvio() + `${$_REG_PACI['COD']}|${$_REG_HC['suc_folio_hc'] + $_REG_HC['nro_folio_hc']}|1|` }, get_url("app/HICLIN/HC705B.DLL"))
    .then(data => {
      $_HC702A._evoluciones = data.EVOLUCIONES;
      $_HC702A._evoluciones.pop()
    }).catch(err => {
      console.log(err, 'error')
      loader('hide')
      _regresar_menuhis();
    })

  await postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER873.DLL"))
    .then((data) => {
      $_HC702A._unserv = data.UNSERV;
      $_HC702A._unserv.pop();
    })
    .catch((err) => {
      console.log(err, 'err')
      loader('hide')
      _regresar_menuhis();
    });

  await postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON809.DLL"))
    .then(data => {
      $_HC702A._ciudades = data.CIUDAD;
      $_HC702A._ciudades.pop();
    }).catch(err => {
      console.log(err, 'error')
      loader('hide')
      _regresar_menuhis();
    })

  await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER853.DLL"))
    .then(data => {
      $_HC702A._entidades = data.ENTIDADES;
      $_HC702A._entidades.pop();
    }).catch(err => {
      console.log(err, 'error')
      loader('hide')
      _regresar_menuhis();
    })

  await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER855.DLL"))
    .then(data => {
      $_HC702A._especialidades = data.ESPECIALIDADES;
      $_HC702A._especialidades.pop();
    }).catch(err => {
      console.log(err, 'error')
      loader('hide')
      _regresar_menuhis();
    })

  await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER854.DLL"))
    .then(data => {
      $_HC702A._ocupaciones = data.OCUPACIONES;
      $_HC702A._ocupaciones.pop();
    }).catch(err => {
      console.log(err, 'error')
      loader('hide')
      _regresar_menuhis();
    })

  await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER888.DLL"))
    .then(data => {
      $_HC702A._paisesRips = data.PAISESRIPS;
      $_HC702A._paisesRips.pop();
    }).catch(err => {
      console.log(err, 'error')
      loader('hide')
      _regresar_menuhis();
    })

  await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc.substring(0, 15) }, get_url("app/SALUD/SER810-1.DLL"))
    .then(data => {
      $_HC702A.reg_pac = data['REG-PACI'];
    }).catch(err => {
      console.log(err, 'error')
      loader('hide')
      _regresar_menuhis();
    })

  await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + '|' + localStorage.Usuario + '|' + '1' }, get_url("app/HICLIN/HC_PRC.DLL"))
    .then(data => {
      $_HC702A._hcprc = data.HCPAC;
      loader('hide');
    }).catch(err => {
      console.log(err, 'error')
      loader('hide')
      _regresar_menuhis();
    })

  loader('show');
}

async function inicializarDatos_HC702A() {
  datos = {
    encabezado: {
      nombre: '',
      nit: '',
      titulo: '',
      fecha: ''
    },

    _hcprc: $_HC702A._hcprc,

    paciente: {
      nombre: '',
      tipoId: '',
      id: '',
      fechaIng: '',
      fechaEgr: '',
      edad: '',
      nacim: '',
      sexo: '',
      ciudad: '',
      telefono: '',
      acomp: '',
      entidad: '',
      folio: '',
      triage: '',
      hab: '',
      fact: '',
      unServ: '',
      foto: '',
      hide_titul: true
    },

    dengueCuadro: {
      bandera: null,
      queHacer: '1. Reposo \n 2. Liquidos orales abundantes (entre 2 y 5 Onzas mas de usual según edad), que incluyan jugos de frutas que no sean rojas o ácidos, suero oral, lactancia materna y la dieta usual si el paciente la tolera. \n  3. Acetaminofén según orden médica. \n 4. Medios fisicos: Baños de agua tibia. \n 5. Usar toldillo. \n 6. Asistir a los controles especialmente el dia que desaparece la fiebre. \n 7. Consultar de inmediato si aparecen signos de alarma',
      queNoHacer: '1. No suministrar agua sola. \n 2. No inyecciones para la fiebre. \n 3. No tomar medicamentos para la fiebre sin formula médica. \n 4. Nunca aspirina. \n 5. No baños con alcohol u otras sustancias toxicas. \n 6. No dejar un niño al cuidado de otro niño.',
      signos: '1. Dolor abdominal espontáneo o a la palpación. \n 2. Vómitos frecuentes. \n 3. Manos o pies pálidos, frios o húmedos. \n 4. Dificultad para respirar. \n 5. Mareos. \n 6. Cambios en el estado de ánimo (somnolencia/irritabilidad). \n 7. Sangrados: petequias, epistaxis, gingivorragia, hematemesis, melena, metrorragia. \n 8. Verificar diuresis por lo menos 1 vez cada 6 horas. \n 9. Riesgo social: vive solo o vive lejos de donde puede recibir atención médica, dificultades en el transporte, pobreza extrema. \n 10. Tener 1 año o menos.'
    },

    datosAnalisis: {
      bandera: null,
      diagnostico: [],
      analisis: '',
      tipoDiag: '',
      cierre: '',
    },

    rips: {
      titulos: [],
      contenido: []
    },

    subs: {
      titulos: [],
      contenido: []
    },

    lineas: {
      titulos: [],
      contenido: []
    },

    examFisico: {
      bandera: null,
      cont: [],
      obesidad: '',
      imc: '',
      riesgoCardio: '',
      imcEg: ''
    },

    examVisual: {
      bandera: null,
      tit: [],
      dato1: [],
      dato2: [],
      dato3: [],
      dato4: []
    },

    examVisual2: {
      bandera: null,
      principal: '',
      tit: [],
      cont: []
    },

    agud: null,

    agudeza: {
      izqSinAlt: null,
      izqConAlt: null,
      derSinAlt: null,
      derConAlt: null,
      nivel1: '',
      nivel2: '',
      nivel3: '',
      nivel4: '',
      fecha: ''
    },

    preguntas1: [],

    genograma: {
      bandera: null,
      pad: '',
      mad: '',
      her: []
    },

    gineco: {
      bandera: null,
      g1: [],
      g2: [],
      titLin: [],
      contLin: []
    },

    telesalud: {
      bandera: null,
      acepta: '',
      banderaTabla1: null,
      banderaTabla2: null,
      banderaTabla3: null,
      banderaTabla4: null,
      banderaTabla5: null,

      fechaAsePre: '',
      fechaAsePos: '',
      fechaEcoObs: '',
      fechaVacInfl: '',
      fechaVacTDAP: '',
      fechaVacTT: '',

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

      fechaGine: '',
      fechaNutri: '',
      fechaOdont: '',
      fechaPsico: ''
    },

    obst: {
      bandera: null,
      banderaFlujo: null,
      cont: [],
      titLin: [],
      contLin: [],
      cont2: [
        {
          flujo: '',
          ir: '',
          ip: '',
          sd: ''
        },
        {
          flujo: '',
          ir: '',
          ip: '',
          sd: ''
        }
      ],
      observTit: '',
      observ: ''
    },

    observExamFisico: '',

    otorrino: {
      bandera: null,
      titulos: [],
      contenido: []
    },

    observ7502: '',

    acompa: {
      bandera: null,
      tipoId: '',
      id: '',
      nombre: '',
      espec: '',
      fechaEspec: '',
      texto: ''
    },

    salida: {
      bandera: null,
      estado: '',
      remitido: ''
    },

    recomDengue: {
      bandera: null
    },

    downton: {
      bandera: '',
      cont: {
        caidas: '',
        medicamentos: '',
        alteraciones: '',
        mental: '',
        deambulacion: ''
      }
    },

    braden: {
      bandera: '',
      cont: {
        percepcion: '',
        humedad: '',
        actividad: '',
        movilidad: '',
        nutricion: '',
        roce: ''
      }
    },

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

    medico: {
      bandera: true,
      firma: '',
      reg: '',
      nombre: '',
      espec: ''
    },

    violencia: {
      bandera: null,
      orientacion: '',
      discapacidad: '',
      vulnerabilidad: '',
      riesgoPsicosocial: '',
      accionesReal: '',
      tipoViolencia: '',
      penetracionAnal: '',
      violenciaSex: '',
      fechaPsiquiatria: '',
      fechaAtencionMed: '',
      trabajoSocial: '',
      fechaAtencionPsico: '',
      psicoterapiaIndProg: '',
      psicoterapiaIndEjec: '',
      psicoterapiaFamProg: '',
      psicoterapiaFamEjec: '',
      fechaNotificacion: '',
      manejoSalud: '',
      anticoncepcion: '',
      tipoMetodo: '',
      asesoria: '',
      acciones: '',
      actRutaProt: '',
      actRutaJust: '',

      seguimiento: {
        fechaSem2: '',
        fechaSem4: '',
        fecha3Mes: '',
        fecha6Mes: '',
        fecha1Año: ''
      },

      seguiMenor: '',
      seguiMujer: '',
      fechaCierre: '',
      captacion: '',
      observaciones: ''
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
        tit: ['3 NESES', '6 NESES', '9 NESES', '12 NESES'],
        tipo: [],
        fecha: [],
        resul: []
      },

      necesitoRet: '',
      fechaRet: '',
      medicamento: '',
      dosis: '',
      profesional: '',
      cuantosDias: '',
      dxContactos: '',
      ttoContactos: '',
      remitio: ''
    },

    etv: {
      bandera: null,
      resultado: '',
      fechaIniTto: '',
      fechaFinTto: '',

      para: {
        tit: ['3 Dias', '7 Dias', '14 Dias'],
        cont: []
      },

      segui: {
        tit: ['45 Dias', '6 Meses'],
        cont: []
      }
    },

    anomalias: {
      bandera: null,
      descrip: '',
      segui: '',
      labora: '',
      fecha1: '',
      fecha2: '',
      fecha3: '',
      fecha4: ''
    },

    trast: {
      bandera: null,
      orientacion: '',
      discapacidad: '',
      vulnerabilidad: '',
      tipoEvento: '',
      recaidas: '',
      riesgoPsico: '',
      accionesReal: '',
      medGeneral: '',
      psicologia: '',
      psicoterapiaIndProg: '',
      psicoterapiaIndEjec: '',
      psicoterapiaFamProg: '',
      psicoterapiaFamEjec: '',
      fechaRemisionPsiq: '',
      fechaNotificacion: '',
      formaFamiliar: '',
      tamizajes: '',
      manejoTam: '',
      captacion: '',
      consumoCan: '',
      canalizaUsua: '',
      accionesSeg: '',
      adherencia: '',
      segContraref: '',
      fechaCierre: '',
      evaluacion: '',
      pronostico: '',
      observaciones: ''
    },

    multidrog: {
      bandera: null,
      multidrogoresistente: '',
      cualMto: ''
    },

    firmaHCI01C: '',

    tacto_rect: {
      bandera: null,
      tacto_rectal: '',
      resul: '',
      nota: ''
    },

    vac_covid19: {
      bandera: null,
      vacunado: '',
      etapa: '',
      tipo: '',
      nro_dosis: '',
    },

    ipa: {
      bandera: null,
      fuma: '',
      nro_cigarrillos_diario: '',
      ipa: '',
    },
  }
}