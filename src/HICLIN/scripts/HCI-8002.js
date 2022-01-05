// CREACION - SANTIAGO.F - FEBRERO 8/2021

var $_HCI8002 = [];

async function _iniciarHCI8002(opciones, json) {
  $_HCI8002._hcprc = json._hcpac;
  $_HCI8002._detalles = json._detalles;
  $_HCI8002.opciones = opciones;

  await inicializarDatos_HCI8002();
  await abrirArchivos_HCI8002();
  await leerDetalles_HCI8002();
  await llenarEncabezado_HCI8002();
  await llenarDatosPaciente_HCI8002();
  await llenarDatos_HCI8002();
  await llamarImpresion_HCI8002();
}

async function leerDetalles_HCI8002() {
  // pyp citologia betesda
  $_HCI8002.dato_8002 = await $_HCI8002._detalles.find(e => e['COD-DETHC'] == '8002' && e['LLAVE-HC'] == $_HCI8002._hcprc.llave);
  $_HCI8002.dato_8002 ? $_HCI8002.dato_8002 = $_HCI8002.dato_8002.DETALLE : false;

  // analisis y plan
  $_HCI8002.dato_7501 = await $_HCI8002._detalles.find(e => e['COD-DETHC'] == '7501' && e['LLAVE-HC'] == $_HCI8002._hcprc.llave);
  $_HCI8002.dato_7501 ? $_HCI8002.dato_7501 = $_HCI8002.dato_7501.DETALLE : false;

  // antecedentes cancer familiares
  $_HCI8002.dato_2005 = await $_HCI8002._detalles.find(e => e['COD-DETHC'] == '2005' && e['LLAVE-HC'] == $_HCI8002._hcprc.llave);
  $_HCI8002.dato_2005 ? $_HCI8002.dato_2005 = $_HCI8002.dato_2005.DETALLE : false;
}

async function llenarEncabezado_HCI8002() {
  datos.encabezado.nombre = $_USUA_GLOBAL[0].NOMBRE;
  datos.encabezado.nit = $_USUA_GLOBAL[0].NIT;
  datos.encabezado.descrip = 'REPORTE DE CITOLOGIA';
  datos.encabezado.fecha_toma = `${$_REG_HC.fecha_hc.substring(0, 4)}/${$_REG_HC.fecha_hc.substring(4, 6)}/${$_REG_HC.fecha_hc.substring(6, 8)}`;
  datos.encabezado.nro_historia = `${$_REG_HC.llave_hc.substring(0, 15)}-${$_REG_HC.llave_hc.substring(15, 23)}`;
}

async function llenarDatosPaciente_HCI8002() {
  datos.paciente.nombre = `${$_REG_PACI["NOM-PACI1"]} ${$_REG_PACI["NOM-PACI2"]}`;
  datos.paciente.apellidos = `${$_REG_PACI["APELL-PACI1"]} ${$_REG_PACI["APELL-PACI2"]}`;
  datos.paciente.id = new Intl.NumberFormat("ja-JP").format($_REG_PACI.COD);
  datos.paciente.fecha_nacimiento = _editFecha3($_REG_PACI['NACIM']);

  var ciudad;
  var busqCiu = $_HCI8002._ciudades.find(e => e['COD'].trim() == $_REG_PACI.CIUDAD.trim());
  busqCiu != undefined ? ciudad = busqCiu.NOMBRE : false;

  datos.paciente.lugar = `${$_REG_PACI.CIUDAD} ${ciudad}`;

  var busqEnt = $_HCI8002._entidades.find(e => e['COD-ENT'] == $_REG_PACI.EPS);
  busqEnt != undefined ? datos.paciente.eps = busqEnt['NOMBRE-ENT'] : false;
  datos.paciente.edad = `${$_REG_HC.edad_hc["unid_edad"]}${$_REG_HC.edad_hc["vlr_edad"]}`;
  datos.paciente.direccion = $_REG_PACI.DIRECC;
  datos.paciente.telefono = $_REG_PACI.TELEFONO;
  datos.paciente.tipo_afiliacion = _TIPOAFIL($_REG_PACI['TIPO-AFIL']);
}

async function llenarDatos_HCI8002() {
  $_HCI8002._hcprc.rips.embarazo

  if ($_HCI8002._hcprc.rips.embarazo == '1' || $_HCI8002._hcprc.rips.embarazo == '2' ||
    $_HCI8002._hcprc.rips.embarazo == '3') {
    datos.antecedentes.embarazo_si = 'X';
    datos.antecedentes.embarazo_no = '';
    datos.antecedentes.embarazo_nose = '';
  } else {
    datos.antecedentes.embarazo_si = '';
    datos.antecedentes.embarazo_no = 'X';
    datos.antecedentes.embarazo_nose = '';
  }

  var fecha_regla_8002 = $_HCI8002.dato_8002.fecha_regla;

  datos.antecedentes.ano_fum = fecha_regla_8002.substring(0, 4);
  datos.antecedentes.mes_fum = fecha_regla_8002.substring(4, 6);
  datos.antecedentes.dia_fum = fecha_regla_8002.substring(6, 8);

  if ($_HCI8002._hcprc.planific == 'I' || $_HCI8002._hcprc.planific == 'J' ||
    $_HCI8002._hcprc.planific == 'K') {
    datos.antecedentes.planifica_si = '';
    datos.antecedentes.planifica_no = 'X';
  } else {
    datos.antecedentes.planifica_si = 'X';
    datos.antecedentes.planifica_no = '';
  }

  var metodo;
  switch ($_HCI8002._hcprc.planific) {
    case '1': metodo = "DIU"; break;
    case '2': metodo = "ORAL"; break;
    case '3': metodo = "BARRERA"; break;
    case '4': metodo = "OTRO"; break;
    case '5': metodo = "NINGUNO"; break;
    case '6': metodo = "DIU + BARRERA"; break;
    case '7': metodo = "IMPL. SUBDERMICO"; break;
    case '8': metodo = "I.SUBDERM+BARRERA"; break;
    case '9': metodo = "ORAL + BARRERA"; break;
    case 'A': metodo = "INYECTABLE MENSUAL"; break;
    case 'B': metodo = "INYECTABLE+BARRERA"; break;
    case 'C': metodo = "INYECTABLE TRIMEST"; break;
    case 'D': metodo = "TRIMESTRAL + BARRERA"; break;
    case 'E': metodo = "EMERGENCIA"; break;
    case 'F': metodo = "EMERGENCIA + BARRERA"; break;
    case 'G': metodo = "ESTERILIZACION"; break;
    case 'H': metodo = "ESTERILIZA+BARRERA"; break;
    case 'I': metodo = "NO USA X TRADICION"; break;
    case 'J': metodo = "NO USA X SALUD"; break;
    case 'K': metodo = "NO USA X NEGACION"; break;
    case 'L': metodo = "COITUS INTERRUPTUS"; break;
    case 'M': metodo = "METODO DEL RITMO"; break;
    default: metodo = ""; break;
  }

  datos.antecedentes.metodo = metodo;
  datos.antecedentes.cancer = $_HCI8002.dato_2005.tabla_organo[0].replace(/(?:\&)/g, "\n");

  datos.antecedentes.gestaciones = $_HCI8002.dato_8002.gestaciones;
  datos.antecedentes.partos = $_HCI8002.dato_8002.partos;
  datos.antecedentes.cesarias = $_HCI8002.dato_8002.cesareas;
  datos.antecedentes.abortos = $_HCI8002.dato_8002.abortos;
  datos.antecedentes.nacidos_muertos = $_HCI8002.dato_8002.nacidos_muertos;
  datos.antecedentes.nacidos_vivos = $_HCI8002.dato_8002.nacidos_vivos;

  var ets;
  var ets2;
  switch ($_HCI8002.dato_8002.ets) {
    case '1':
      ets = 'X';
      ets2 = 'SI';
      break;
    case '2':
      ets = '';
      ets2 = 'NO';
      break;
    case '3':
      ets = '';
      ets2 = 'NO SABE';
      break;
    default:
      ets = '';
      ets2 = '';
  }

  datos.antecedentes.ets = ets;
  datos.antecedentes.ets2 = ets2;
  datos.antecedentes.cual = $_HCI8002.dato_8002.ets_cual;

  var fecha_ult = $_HCI8002.dato_8002.fecha_ult_cito;

  datos.antecedentes.ano_ult_cito = fecha_ult.substring(0, 4);
  datos.antecedentes.mes_ult_cito = fecha_ult.substring(4, 6);
  datos.antecedentes.dia_ult_cito = fecha_ult.substring(6, 8);
  datos.antecedentes.institucion_ult_cito = $_HCI8002.dato_8002.institucion_ult_cito;

  switch ($_HCI8002.dato_8002.resultado_ult_cito) {
    case '1':
      datos.antecedentes.resultado_ult_cit_normal = 'X';
      datos.antecedentes.resultado_ult_cit_anormal = '';
      datos.antecedentes.resultado_ult_cit_nose = '';
      break;
    case '2':
      datos.antecedentes.resultado_ult_cit_normal = '';
      datos.antecedentes.resultado_ult_cit_anormal = 'X';
      datos.antecedentes.resultado_ult_cit_nose = '';
      break;
    case '3':
      datos.antecedentes.resultado_ult_cit_normal = '';
      datos.antecedentes.resultado_ult_cit_anormal = '';
      datos.antecedentes.resultado_ult_cit_nose = 'X';
      break;
    default:
      datos.antecedentes.resultado_ult_cit_normal = '';
      datos.antecedentes.resultado_ult_cit_anormal = '';
      datos.antecedentes.resultado_ult_cit_nose = '';
      break;
  }

  switch ($_HCI8002.dato_8002.proced_cuello) {
    case '1':
      datos.antecedentes.proced_cuello_si = '';
      datos.antecedentes.proced_cuello_no = 'X';
      datos.antecedentes.proced_cuello_nose = '';
      datos.antecedentes.proced_cuello_cauterizacion = '';
      datos.antecedentes.proced_cuello_conizacion = '';
      datos.antecedentes.proced_cuello_histerectomia = '';
      datos.antecedentes.proced_cuello_biopsia = '';
      datos.antecedentes.proced_cuello_desconoce = '';
      break;
    case '2':
      datos.antecedentes.proced_cuello_si = 'X';
      datos.antecedentes.proced_cuello_no = '';
      datos.antecedentes.proced_cuello_nose = '';
      datos.antecedentes.proced_cuello_cauterizacion = 'X';
      datos.antecedentes.proced_cuello_conizacion = '';
      datos.antecedentes.proced_cuello_histerectomia = '';
      datos.antecedentes.proced_cuello_biopsia = '';
      datos.antecedentes.proced_cuello_desconoce = '';
      break;
    case '3':
      datos.antecedentes.proced_cuello_si = 'X';
      datos.antecedentes.proced_cuello_no = '';
      datos.antecedentes.proced_cuello_nose = '';
      datos.antecedentes.proced_cuello_cauterizacion = '';
      datos.antecedentes.proced_cuello_conizacion = 'X';
      datos.antecedentes.proced_cuello_histerectomia = '';
      datos.antecedentes.proced_cuello_biopsia = '';
      datos.antecedentes.proced_cuello_desconoce = '';
      break;
    case '4':
      datos.antecedentes.proced_cuello_si = 'X';
      datos.antecedentes.proced_cuello_no = '';
      datos.antecedentes.proced_cuello_nose = '';
      datos.antecedentes.proced_cuello_cauterizacion = '';
      datos.antecedentes.proced_cuello_conizacion = '';
      datos.antecedentes.proced_cuello_histerectomia = 'X';
      datos.antecedentes.proced_cuello_biopsia = '';
      datos.antecedentes.proced_cuello_desconoce = '';
      break
    case '5':
      datos.antecedentes.proced_cuello_si = '';
      datos.antecedentes.proced_cuello_no = '';
      datos.antecedentes.proced_cuello_nose = 'X';
      datos.antecedentes.proced_cuello_cauterizacion = '';
      datos.antecedentes.proced_cuello_conizacion = '';
      datos.antecedentes.proced_cuello_histerectomia = '';
      datos.antecedentes.proced_cuello_biopsia = '';
      datos.antecedentes.proced_cuello_desconoce = 'X';
      break;
    case '6':
      datos.antecedentes.proced_cuello_si = '';
      datos.antecedentes.proced_cuello_no = '';
      datos.antecedentes.proced_cuello_nose = 'X';
      datos.antecedentes.proced_cuello_cauterizacion = '';
      datos.antecedentes.proced_cuello_conizacion = '';
      datos.antecedentes.proced_cuello_histerectomia = '';
      datos.antecedentes.proced_cuello_biopsia = 'X';
      datos.antecedentes.proced_cuello_desconoce = '';
      break;
    default:
      datos.antecedentes.proced_cuello_si = '';
      datos.antecedentes.proced_cuello_no = '';
      datos.antecedentes.proced_cuello_nose = '';
      datos.antecedentes.proced_cuello_cauterizacion = '';
      datos.antecedentes.proced_cuello_conizacion = '';
      datos.antecedentes.proced_cuello_histerectomia = '';
      datos.antecedentes.proced_cuello_biopsia = '';
      datos.antecedentes.proced_cuello_desconoce = '';
      break;
  }

  switch ($_HCI8002.dato_8002.vacunas_vph) {
    case 'S':
      datos.antecedentes.vacunas_VPH_si = 'X';
      datos.antecedentes.vacunas_VPH_no = '';
      break;
    case 'N':
      datos.antecedentes.vacunas_VPH_si = '';
      datos.antecedentes.vacunas_VPH_no = 'X';
      break;
    default:
      datos.antecedentes.vacunas_VPH_si = '';
      datos.antecedentes.vacunas_VPH_no = '';
      break;
  }

  switch ($_HCI8002.dato_8002.dispareunia) {
    case 'S':
      datos.antecedentes.dispareunia_si = 'X';
      datos.antecedentes.dispareunia_no = '';
      break;
    case 'N':
      datos.antecedentes.dispareunia_si = '';
      datos.antecedentes.dispareunia_no = 'X';
      break;
    default:
      datos.antecedentes.dispareunia_si = '';
      datos.antecedentes.dispareunia_no = '';
      break;
  }

  var fecha_proced = $_HCI8002.dato_8002.fecha_proced_cuello;
  datos.antecedentes.fecha_proced_cuello = `${fecha_proced.substring(0, 4)}/${fecha_proced.substring(4, 6)}/${fecha_proced.substring(6, 8)}`;

  switch ($_HCI8002.dato_8002.aspecto_cuello) {
    case '1':
      datos.antecedentes.aspecto_cuello_ausente = 'X';
      datos.antecedentes.aspecto_cuello_sano = '';
      datos.antecedentes.aspecto_cuello_artrofico = '';
      datos.antecedentes.aspecto_cuello_congestivo = '';
      datos.antecedentes.aspecto_cuello_sangrante = '';
      datos.antecedentes.aspecto_cuello_erosionado = '';
      datos.antecedentes.aspecto_cuello_polipo = '';
      datos.antecedentes.aspecto_cuello_lesionVisible = '';
      datos.antecedentes.aspecto_cuello_cuelloInfla = '';
      break;
    case '2':
      datos.antecedentes.aspecto_cuello_ausente = '';
      datos.antecedentes.aspecto_cuello_sano = 'X';
      datos.antecedentes.aspecto_cuello_artrofico = '';
      datos.antecedentes.aspecto_cuello_congestivo = '';
      datos.antecedentes.aspecto_cuello_sangrante = '';
      datos.antecedentes.aspecto_cuello_erosionado = '';
      datos.antecedentes.aspecto_cuello_polipo = '';
      datos.antecedentes.aspecto_cuello_lesionVisible = '';
      datos.antecedentes.aspecto_cuello_cuelloInfla = '';
      break;
    case '3':
      datos.antecedentes.aspecto_cuello_ausente = '';
      datos.antecedentes.aspecto_cuello_sano = '';
      datos.antecedentes.aspecto_cuello_artrofico = 'X';
      datos.antecedentes.aspecto_cuello_congestivo = '';
      datos.antecedentes.aspecto_cuello_sangrante = '';
      datos.antecedentes.aspecto_cuello_erosionado = '';
      datos.antecedentes.aspecto_cuello_polipo = '';
      datos.antecedentes.aspecto_cuello_lesionVisible = '';
      datos.antecedentes.aspecto_cuello_cuelloInfla = '';
      break;
    case '4':
      datos.antecedentes.aspecto_cuello_ausente = '';
      datos.antecedentes.aspecto_cuello_sano = '';
      datos.antecedentes.aspecto_cuello_artrofico = '';
      datos.antecedentes.aspecto_cuello_congestivo = 'X';
      datos.antecedentes.aspecto_cuello_sangrante = '';
      datos.antecedentes.aspecto_cuello_erosionado = '';
      datos.antecedentes.aspecto_cuello_polipo = '';
      datos.antecedentes.aspecto_cuello_lesionVisible = '';
      datos.antecedentes.aspecto_cuello_cuelloInfla = '';
      break;
    case '5':
      datos.antecedentes.aspecto_cuello_ausente = '';
      datos.antecedentes.aspecto_cuello_sano = '';
      datos.antecedentes.aspecto_cuello_artrofico = '';
      datos.antecedentes.aspecto_cuello_congestivo = '';
      datos.antecedentes.aspecto_cuello_sangrante = 'X';
      datos.antecedentes.aspecto_cuello_erosionado = '';
      datos.antecedentes.aspecto_cuello_polipo = '';
      datos.antecedentes.aspecto_cuello_lesionVisible = '';
      datos.antecedentes.aspecto_cuello_cuelloInfla = '';
      break;
    case '6':
      datos.antecedentes.aspecto_cuello_ausente = '';
      datos.antecedentes.aspecto_cuello_sano = '';
      datos.antecedentes.aspecto_cuello_artrofico = '';
      datos.antecedentes.aspecto_cuello_congestivo = '';
      datos.antecedentes.aspecto_cuello_sangrante = '';
      datos.antecedentes.aspecto_cuello_erosionado = 'X';
      datos.antecedentes.aspecto_cuello_polipo = '';
      datos.antecedentes.aspecto_cuello_lesionVisible = '';
      datos.antecedentes.aspecto_cuello_cuelloInfla = '';
      break;
    case '7':
      datos.antecedentes.aspecto_cuello_ausente = '';
      datos.antecedentes.aspecto_cuello_sano = '';
      datos.antecedentes.aspecto_cuello_artrofico = '';
      datos.antecedentes.aspecto_cuello_congestivo = '';
      datos.antecedentes.aspecto_cuello_sangrante = '';
      datos.antecedentes.aspecto_cuello_erosionado = '';
      datos.antecedentes.aspecto_cuello_polipo = 'X';
      datos.antecedentes.aspecto_cuello_lesionVisible = '';
      datos.antecedentes.aspecto_cuello_cuelloInfla = '';
    case '8':
      datos.antecedentes.aspecto_cuello_ausente = '';
      datos.antecedentes.aspecto_cuello_sano = '';
      datos.antecedentes.aspecto_cuello_artrofico = '';
      datos.antecedentes.aspecto_cuello_congestivo = '';
      datos.antecedentes.aspecto_cuello_sangrante = '';
      datos.antecedentes.aspecto_cuello_erosionado = '';
      datos.antecedentes.aspecto_cuello_polipo = '';
      datos.antecedentes.aspecto_cuello_lesionVisible = 'X';
      datos.antecedentes.aspecto_cuello_cuelloInfla = '';
    case '9':
      datos.antecedentes.aspecto_cuello_ausente = '';
      datos.antecedentes.aspecto_cuello_sano = '';
      datos.antecedentes.aspecto_cuello_artrofico = '';
      datos.antecedentes.aspecto_cuello_congestivo = '';
      datos.antecedentes.aspecto_cuello_sangrante = '';
      datos.antecedentes.aspecto_cuello_erosionado = '';
      datos.antecedentes.aspecto_cuello_polipo = '';
      datos.antecedentes.aspecto_cuello_lesionVisible = '';
      datos.antecedentes.aspecto_cuello_cuelloInfla = 'X';
      break;
    default:
      datos.antecedentes.aspecto_cuello_ausente = '';
      datos.antecedentes.aspecto_cuello_sano = '';
      datos.antecedentes.aspecto_cuello_artrofico = '';
      datos.antecedentes.aspecto_cuello_congestivo = '';
      datos.antecedentes.aspecto_cuello_sangrante = '';
      datos.antecedentes.aspecto_cuello_erosionado = '';
      datos.antecedentes.aspecto_cuello_polipo = '';
      datos.antecedentes.aspecto_cuello_lesionVisible = '';
      datos.antecedentes.aspecto_cuello_cuelloInfla = '';
      break;
  }

  datos.antecedentes.descrip_prof = $_HCI8002._hcprc.descrip_med;

  switch ($_HCI8002._hcprc.rips.atiende) {
    case '1':
      datos.antecedentes.cargo = 'MEDICO ESPECIALISTA';
      break;
    case '2':
      datos.antecedentes.cargo = 'MEDICO GENERAL';
      break;
    case '3':
      datos.antecedentes.cargo = 'ENFERMERA GEFE';
      break;
    case '4':
      datos.antecedentes.cargo = 'AUXILIAR ENFERMERIA';
      break;
    case '5':
      datos.antecedentes.cargo = 'TERAPEUTAS Y OTROS';
      break;
    case '6':
      datos.antecedentes.cargo = 'ENFERMERA JEFE PYP';
      break;
    case '7':
      datos.antecedentes.cargo = 'PSICOLOGIA';
      break;
    case '8':
      datos.antecedentes.cargo = 'NUTRICIONISTA';
      break;
    case '9':
      datos.antecedentes.cargo = 'SIN DETERMINAR';
      break;
    case 'A':
      datos.antecedentes.cargo = 'ODONTOLOGO';
      break;
    case 'B':
      datos.antecedentes.cargo = 'AUDITOR MEDICO';
      break;
    case 'H':
      datos.antecedentes.cargo = 'HIGIENE ORAL';
      break;
    case 'I':
      datos.antecedentes.cargo = 'INSTRUMENTADOR QX';
      break;
    case 'O':
      datos.antecedentes.cargo = 'OPTOMETRIA';
      break;
    case 'T':
      datos.antecedentes.cargo = 'TRABAJO SOCIAL';
      break;
  }

  datos.antecedentes.observ_cit = $_HCI8002.dato_8002.observaciones_cit.replace(/(?:\&)/g, "\n");

  datos.prox_cito.direcc_usu = $_USUA_GLOBAL[0].DIRECC;
  datos.prox_cito.tel_usu = $_USUA_GLOBAL[0].TEL;

  var fecha_prox = $_HCI8002.dato_8002.fecha_prox_cito;

  datos.prox_cito.fecha = `${fecha_prox.substring(0, 4)}/${fecha_prox.substring(4, 6)}/${fecha_prox.substring(6, 8)}`;

  // diagnosticos

  for (var i in $_HCI8002._hcprc.rips.tabla_diag) {
    if ($_HCI8002._hcprc.rips.tabla_diag[i].diagn != "") {
      datos.diagnos.bandera = true;
      datos.diagnos.cod_diag.push($_HCI8002._hcprc.rips.tabla_diag[i].diagn);
      datos.diagnos.nombre_enfer.push($_HCI8002._hcprc.rips.tabla_diag[i].descrip);
    }
  }

  // analisis

  if ($_HCI8002.dato_7501 != "") {
    datos.analisis.bandera = true;
    datos.analisis.analisis = $_HCI8002.dato_7501;
  }

  switch ($_HCI8002._hcprc.rips.tipo_diag) {
    case '1':
      datos.tipoDiagnos.tipo = '1-IMPRESION DIAGNOSTICA';
      break;
    case '2':
      datos.tipoDiagnos.tipo = '2-CONFIRMADO NUEVO';
      break;
    case '3':
      datos.tipoDiagnos.tipo = '3-CONFIRMADO REPETIDO';
      break;
    case '9':
      datos.tipoDiagnos.tipo = '9-NO APLICA';
      break;
  }

  switch ($_HCI8002._hcprc.signos.sintom_resp) {
    case 'S':
      datos.sinto.sintomatico_respi = 'SI';
      break;
    case 'N':
      datos.sinto.sintomatico_respi = 'NO';
      break;
    default:
      datos.sinto.sintomatico_respi = '';
      break;
  }

  switch ($_HCI8002._hcprc.signos.sintom_piel) {
    case 'S':
      datos.sinto.sintom_piel = 'SI';
      break;
    case 'N':
      datos.sinto.sintom_piel = 'NO';
      break;
    default:
      datos.sinto.sintom_piel = '';
      break;
  }

  switch ($_HCI8002._hcprc.signos.victi_maltrato) {
    case 'S':
      datos.sinto.victima_maltrato = 'SI';
      break;
    case 'N':
      datos.sinto.victima_maltrato = 'NO';
      break;
    default:
      datos.sinto.victima_maltrato = '';
      break;
  }

  switch ($_HCI8002._hcprc.signos.victi_violencia) {
    case 'S':
      datos.sinto.victima_violencia = 'SI';
      break;
    case 'N':
      datos.sinto.victima_violencia = 'NO';
      break;
    default:
      datos.sinto.victima_violencia = '';
      break;
  }

  switch ($_HCI8002._hcprc.signos.enfer_mental) {
    case 'S':
      datos.sinto.enfermedad_mental = 'SI';
      break;
    case 'N':
      datos.sinto.enfermedad_mental = 'NO';
      break;
    default:
      datos.sinto.enfermedad_mental = '';
      break;
  }

  switch ($_HCI8002._hcprc.signos.enfer_its) {
    case 'S':
      datos.sinto.enfermedad_its = 'SI';
      break;
    case 'N':
      datos.sinto.enfermedad_its = 'NO';
      break;
    default:
      datos.sinto.enfermedad_its = '';
      break;
  }

  switch ($_HCI8002._hcprc.signos.cancer_seno) {
    case 'S':
      datos.sinto.cancer_seno = 'SI';
      break;
    case 'N':
      datos.sinto.cancer_seno = 'NO';
      break;
    default:
      datos.sinto.cancer_seno = '';
      break;
  }

  switch ($_HCI8002._hcprc.signos.cancer_cervis) {
    case 'S':
      datos.sinto.cancer_cervis = 'SI';
      break;
    case 'N':
      datos.sinto.cancer_cervis = 'NO';
      break;
    default:
      datos.sinto.cancer_cervis = '';
      break;
  }

  switch ($_HCI8002._hcprc.rips.causa) {
    case '0':
      datos.causa_externa.causa_ext = '';
      break;
    case '1':
      datos.causa_externa.causa_ext = 'ACCIDENTE DE TRABAJO';
      break;
    case '2':
      datos.causa_externa.causa_ext = 'ACCIDENTE TRANSITO';
      break;
    case '3':
      datos.causa_externa.causa_ext = 'ACCIDENTE RABICO';
      break;
    case '4':
      datos.causa_externa.causa_ext = 'ACCIDENTE OFIDICO';
      break;
    case '5':
      datos.causa_externa.causa_ext = 'OTRO ACCIDENTE';
      break;
    case '6':
      datos.causa_externa.causa_ext = 'EVENTO CATASTROFIC';
      break;
    case '7':
      datos.causa_externa.causa_ext = 'LESION AGRESION';
      break;
    case '8':
      datos.causa_externa.causa_ext = 'LESION AUTO INFLIG';
      break;
    case '9':
      datos.causa_externa.causa_ext = 'SOSP. MALTRATO FIS';
      break;
    case '10':
      datos.causa_externa.causa_ext = 'SOSP. ABUSO SEXUAL';
      break;
    case '11':
      datos.causa_externa.causa_ext = 'SOSP. SOSP. VIOLENCIA SEX';
      break;
    case '12':
      datos.causa_externa.causa_ext = 'SOSP. MALTRATO EMOC';
      break;
    case '13':
      datos.causa_externa.causa_ext = 'ENFERMEDAD GENERAL';
      break;
    case '14':
      datos.causa_externa.causa_ext = 'ENFERMEDAD PROFES.';
      break;
    case '15':
      datos.causa_externa.causa_ext = 'OTRA CAUSA';
      break;
    default:
      datos.causa_externa.causa_ext = '';
      break;
  }

  var operador = $_HCI8002._hcprc.cierre.oper_cie;
  var nombre_oper_w;
  var id_oper_w;

  if (operador != "") {
    await postData({ datosh: datosEnvio() + operador + '|' }, get_url("app/CONTAB/CON003.DLL"))
      .then(data => {
        var res = data.split('|');
        nombre_oper_w = res[0].trim();
        id_oper_w = res[1];

        datos.cierre.descrip = nombre_oper_w;

      }).catch(err => {
        console.log(err, 'error')
        datos.cierre.descrip = "";
      })
  } else {
    datos.cierre.descrip = $_HCI8002._hcprc.descrip_med;
  }

  datos.cierre.fecha = _editarFecha($_HCI8002._hcprc.egreso);

  var aux = '';
  if (parseFloat($_HCI8002._hcprc.rips.estado_sal) > 0) {
    datos.estado_salida.bandera = true;
    switch (parseFloat($_HCI8002._hcprc.rips.estado_sal)) {
      case 1: aux = 'VIVO (A)'; break;
      case 2: aux = 'MUERTO (A)'; break;
      case 3: aux = 'REMITIDO A: '; break;
      case 4: aux = 'HOSPITALIZADO'; break;
      case 5: aux = 'OBSERVACION'; break;
    }
    datos.estado_salida.descrip = aux;
    datos.estado_salida.remitido = $_HCI8002._hcprc.rips.remitido;
  }

  // var res = $_HCI8002._especialidades.find(e => e.CODIGO == $_REG_PROF.TAB_ESPEC[0].COD);
  // res != undefined ? datos.medico.espec = res.NOMBRE : false;

  // datos.medico.firma = $_REG_PROF.IDENTIFICACION.trim();

  // $_REG_PROF.NOMBRE = $_REG_PROF.NOMBRE.replace(/\�/g, 'Ñ');

  // datos.medico.nombre = $_REG_PROF.NOMBRE;
  // datos.medico.reg = $_REG_PROF.REG_MEDICO;

  var busqProf = $_HCI8002._profesionales.find(e => e.IDENTIFICACION == parseInt($_HCI8002._hcprc.med));
  if (busqProf != undefined) {
    console.log(busqProf)

    datos.medico.firma = busqProf.IDENTIFICACION;
    datos.medico.nombre = busqProf.NOMBRE.replace(/\�/g, 'Ñ');
    datos.medico.reg = busqProf.REG_MEDICO;

    res = $_HCI8002._especialidades.find(e => e.CODIGO == busqProf.TAB_ESPEC[0].COD);
    res != undefined ? datos.medico.espec = res.NOMBRE : false;
  } else {
    console.log(busqProf)
    datos.medico.espec = '';

    datos.medico.firma = parseInt($_HCI8002._hcprc.med);

    datos.medico.nombre = '';
    datos.medico.reg = '';
  }

}

async function llamarImpresion_HCI8002() {
  inicializarFormatoBase_impHc();
  await _imprimirCitologia_8002(datos);
  if ($_HCI8002.opciones.opc_resu != 'S') {
    await _impresion2({
      tipo: 'pdf',
      archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmss')}.pdf`,
      content: formatoBaseImp_Hc
    }).catch((err) => {
      console.error(err);
    })
  }
}

async function abrirArchivos_HCI8002() {
  loader('show');
  await postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON809.DLL"))
    .then(data => {
      $_HCI8002._ciudades = data.CIUDAD;
      $_HCI8002._ciudades.pop();
    }).catch(err => {
      console.log(err, 'error')
      loader('hide')
      _regresar_menuhis();
    })

  await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER853.DLL"))
    .then(data => {
      $_HCI8002._entidades = data.ENTIDADES;
      $_HCI8002._entidades.pop();
    }).catch(err => {
      console.log(err, 'error')
      loader('hide')
      _regresar_menuhis();
    })

  await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER851.DLL"))
    .then(data => {
      $_HCI8002._enfermedades = data.ENFERMEDADES;
      $_HCI8002._enfermedades.pop();
    }).catch(err => {
      console.log(err, 'error')
      loader('hide')
      _regresar_menuhis();
    })

  await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER855.DLL"))
    .then(data => {
      $_HCI8002._especialidades = data.ESPECIALIDADES;
      $_HCI8002._especialidades.pop();
    }).catch(err => {
      console.log(err, 'error')
      loader('hide')
      _regresar_menuhis();
    })

  await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER819.DLL"))
    .then(data => {
      $_HCI8002._profesionales = data.ARCHPROF;
      $_HCI8002._profesionales.pop();
    }).catch(err => {
      console.log(err, 'error')
      loader('hide')
      _regresar_menuhis();
    })

  loader('show');
}

async function inicializarDatos_HCI8002() {
  datos = {
    encabezado: {
      nombre: '',
      nit: '',
      descrip: '',
      fecha_toma: '',
      nro_historia: ''
    },

    paciente: {
      nombre: '',
      apellidos: '',
      id: '',
      fecha_nacimiento: '',
      lugar: '',
      eps: '',
      edad: '',
      direccion: '',
      telefono: '',
      tipo_afiliacion: ''
    },

    antecedentes: {
      embarazo_si: '',
      embarazo_no: '',
      embarazo_nose: '',
      dia_fum: '',
      mes_fum: '',
      ano_fum: '',

      planifica_si: '',
      planifica_no: '',
      metodo: '',
      cancer: '',

      gestaciones: '',
      partos: '',
      cesarias: '',
      abortos: '',
      nacidos_muertos: '',
      nacidos_vivos: '',

      ets: '',
      ets2: '',
      cual: '',

      dia_ult_cito: '',
      mes_ult_cito: '',
      ano_ult_cito: '',
      institucion_ult_cito: '',
      vacunas_VPH_si: '',
      vacunas_VPH_no: '',
      resultado_ult_cit_normal: '',
      resultado_ult_cit_anormal: '',
      resultado_ult_cit_nose: '',
      dispareunia_si: '',
      dispareunia_no: '',
      proced_cuello_si: '',
      proced_cuello_no: '',
      proced_cuello_nose: '',
      proced_cuello_cauterizacion: '',
      proced_cuello_conizacion: '',
      proced_cuello_histerectomia: '',
      proced_cuello_biopsia: '',
      proced_cuello_desconoce: '',
      fecha_proced_cuello: '',

      aspecto_cuello_ausente: '',
      aspecto_cuello_sano: '',
      aspecto_cuello_artrofico: '',
      aspecto_cuello_congestivo: '',
      aspecto_cuello_sangrante: '',
      aspecto_cuello_erosionado: '',
      aspecto_cuello_polipo: '',
      aspecto_cuello_lesionVisible: '',
      aspecto_cuello_cuelloInfla: '',
      descrip_prof: '',
      cargo: '',
      observ_cit: ''
    },

    prox_cito: {
      tel_usu: '',
      direcc_usu: '',
      fecha: ''
    },

    diagnos: {
      bandera: null,
      cod_diag: [],
      nombre_enfer: []
    },

    analisis: {
      bandera: null,
      analisis: ''
    },

    tipoDiagnos: {
      tipo: '',
    },

    sinto: {
      sintomatico_respi: '',
      sintom_piel: '',
      victima_maltrato: '',
      victima_violencia: '',
      enfermedad_mental: '',
      enfermedad_its: '',
      cancer_seno: '',
      cancer_cervis: '',
    },

    causa_externa: {
      causa_ext: '',
    },

    cierre: {
      descrip: '',
      fecha: ''
    },

    estado_salida: {
      bandera: null,
      descrip: '',
      remitido: '',
    },

    medico: {
      firma: '',
      reg: '',
      nombre: '',
      espec: ''
    },
  }
}