
// CREACION - SANTIAGO.F - DICIEMBRE 30/2020

// var $this;
var $_HCI107 = [];

var nombre_oper_w;
var id_oper_w;

async function _iniciarHCI107(json) {
  $_HCI107._datos = json;
  await inicializarDatos_HCI107();
  await abrirArchivos_HCI107();
  await llenarEncabezado_HCI107();
  await llenarDatosPaciente_HCI107();
  await encabezarEpi_HCI107();
  await llenarProcedimientos_HCI107();
  await llenarAnalisis_HCI107();
  await llenarCierreEpic_HCI107();
  await llenarFirma_HCI107();
  await llamarImpresion_HCI107();
  await salir_HCI107();

}

async function llenarEncabezado_HCI107() {
  datos.encabezado.nit = $_USUA_GLOBAL[0].NIT;
  datos.encabezado.nombre = $_USUA_GLOBAL[0].NOMBRE;
  datos.encabezado.titulo = $_HCI107._datos.titulo_epi;
}

async function llenarDatosPaciente_HCI107() {
  datos.paciente.nombre = $_REG_PACI.DESCRIP.replace(/\s+/g, ' ')
  datos.paciente.tipoId = $_REG_PACI['TIPO-ID'];
  isNaN($_REG_PACI.COD) == true ? aux = $_REG_PACI.COD : aux = new Intl.NumberFormat("ja-JP").format($_REG_PACI.COD);
  datos.paciente.id = aux;
  datos.paciente.foto = parseFloat($_REG_PACI.COD);

  var horaIng = $_HCI107._hcprc.hora.substring(0, 2) + ':' + $_HCI107._hcprc.hora.substring(2, 4);
  var horaEgr = $_HCI107._hcprc.hora_egres.substring(0, 2) + ':' + $_HCI107._hcprc.hora_egres.substring(2, 4);
  datos.paciente.fechaIng = $_HCI107._hcprc.fecha.substring(6, 8) + '-' + $_HCI107._hcprc.fecha.substring(4, 6) + '-' + $_HCI107._hcprc.fecha.substring(0, 4) + '  -  ' + horaIng;
  datos.paciente.fechaEgr = $_HCI107._hcprc.egreso.substring(6, 8) + '-' + $_HCI107._hcprc.egreso.substring(4, 6) + '-' + $_HCI107._hcprc.egreso.substring(0, 4) + '  -  ' + horaEgr;
  datos.paciente.edad = $_REG_HC.edad_hc.unid_edad + $_REG_HC.edad_hc.vlr_edad;
  datos.paciente.nacim = $_REG_PACI['NACIM'].substring(6, 8) + '-' + $_REG_PACI['NACIM'].substring(4, 6) + '-' + $_REG_PACI['NACIM'].substring(0, 4);
  $_REG_PACI['SEXO'] == 'F' ? datos.paciente.sexo = 'Fem.' : datos.paciente.sexo = 'Masc';

  $_HCI107.busqCiu = $_HCI107._ciudades.find(e => e['COD'].trim() == $_REG_PACI.CIUDAD.trim());
  $_HCI107.busqCiu != undefined ? ciudad = $_HCI107.busqCiu.NOMBRE : false;
  datos.paciente.ciudad = ciudad;
  datos.paciente.telefono = $_REG_PACI['TELEFONO'];
  datos.paciente.acomp = $_REG_PACI['ACOMPA'];

  if ($_HCI107._hcprc.cierre.nit_fact == '' || $_HCI107._hcprc.cierre.nit_fact == '0000000000') {
    datos.paciente.entidad = $_REG_PACI["NOMBRE-EPS"];
  } else {
    datos.paciente.entidad = $_HCI107._hcprc.cierre.descrip_nit_fact;
  }

  datos.paciente.folio = $_REG_HC.suc_folio_hc + '-' + $_REG_HC.nro_folio_hc;

  datos.paciente.triage = $_HCI107._hcprc.rips.triage
  parseFloat($_HCI107._hcprc.rips.triage) != 0 ? datos.paciente.triage = $_HCI107._hcprc.rips.triage : datos.paciente.triage = '';

  datos.paciente.hab = $_HCI107._hcprc.cierre.hab;

  var unser = $_HCI107._unserv.find(e => e.COD == $_REG_HC.unser_hc);
  datos.paciente.unServ = unser.DESCRIP;
}

async function encabezarEpi_HCI107() {
  var mes_epi = $_HCI107._datos.fecha_epi.substring(4, 6);
  switch (mes_epi) {
    case '01': datos.encabezarEpi.mes_epi = 'Ene'; break;
    case '02': datos.encabezarEpi.mes_epi = 'Feb'; break;
    case '03': datos.encabezarEpi.mes_epi = 'Mar'; break;
    case '04': datos.encabezarEpi.mes_epi = 'Abr'; break;
    case '05': datos.encabezarEpi.mes_epi = 'May'; break;
    case '06': datos.encabezarEpi.mes_epi = 'Jun'; break;
    case '07': datos.encabezarEpi.mes_epi = 'Jul'; break;
    case '08': datos.encabezarEpi.mes_epi = 'Agt'; break;
    case '09': datos.encabezarEpi.mes_epi = 'Sep'; break;
    case '10': datos.encabezarEpi.mes_epi = 'Oct'; break;
    case '11': datos.encabezarEpi.mes_epi = 'Nov'; break;
    case '12': datos.encabezarEpi.mes_epi = 'Dic'; break;
  }


  datos.encabezarEpi.año_epi = $_HCI107._datos.fecha_epi.substring(0, 4);
  datos.encabezarEpi.dia_epi = $_HCI107._datos.fecha_epi.substring(6, 8);

  datos.encabezarEpi.hora_epi = $_HCI107._datos.hora_epi.substring(0, 2);
  datos.encabezarEpi.minutos_epi = $_HCI107._datos.hora_epi.substring(2, 4);

  if ($_HCI107._datos.tipo_epi == '2') {
    datos.encabezarEpi.descrip = 'REMISION'
  } else {
    datos.encabezarEpi.descrip = 'EPICRISIS'
  }

  var operador;
  var nomb;
  var id;
  if ($_HCI107._datos.oper_elab_j.trim() != "") {
    operador = $_HCI107._datos.oper_elab_j;
  } else {
    operador = '';
  }

  console.log(operador);

  if (operador != "") {
    await postData({ datosh: datosEnvio() + operador + '|' }, get_url("app/CONTAB/CON003.DLL"))
      .then(data => {
        var res = data.split('|');
        nomb = res[0].trim();
        id = res[1];

        datos.encabezarEpi.descrip_prof = nomb;

      }).catch(err => {
        console.log(err, 'error')
        datos.encabezarEpi.descrip_prof = "";
      })
  } else {
    datos.encabezarEpi.descrip_prof = "";
  }
}

async function llenarProcedimientos_HCI107() {
  switch ($_HCI107._datos.cl_macro) {
    case '1': datos.procedimientos.tipo = 'CIRUJIA'; break;
    case '2': datos.procedimientos.tipo = 'PROCEDIMIENTO :  '; break;
    case '3': datos.procedimientos.tipo = 'RESULTADOS DE IMAGENOLOGIA'; break;
    case '4': datos.procedimientos.tipo = 'ENFERMERIA'; break;
    case '5': datos.procedimientos.tipo = 'MEDICINA GENERAL'; break;
    case '6': datos.procedimientos.tipo = 'MEDICINA ESPECIALIZADA'; break;
    case '7': datos.procedimientos.tipo = 'RESUMENES DE HISTORIA'; break;
    case '8': datos.procedimientos.tipo = 'TERAPIAS'; break;
  }

  datos.procedimientos.motivo = $_HCI107._hcprc.motivo;


  if ($_HCI107._datos.cod_macro == "000000" || $_HCI107._datos.cod_macro.trim() == "") {
    // continue
  } else {
    let filtro = $_HCI107._codigos.filter((e) => e.CLASE == $_HCI107._datos.cl_macro);
    var res = filtro.find(e => e.CODIGO == $_HCI107._datos.cod_macro)
    if (res != undefined) {
      datos.procedimientos.banderaMacro = true;
      datos.procedimientos.detalle_macroEvo = res.DETALLE;
    } else {
      // continue
    }
  }

  if ($_HCI107._datos.via_j.trim() != "") {
    var res = $_HCI107.vias_existentes.find(e => e.CODIGO == $_HCI107._datos.via_j);
    if (res != undefined) {
      datos.procedimientos.bandera_viaEpi = true;
      datos.procedimientos.descripVia = res.NOMBRE;
    }
  }
}

async function llenarAnalisis_HCI107() {
  var ren_epi = $_HCI107._datos.reng_epi.replace(/\&/g, "\n");
  var plan_epi = $_HCI107._datos.plan_epi.replace(/\&/g, "\n");
  var result_diag = $_HCI107._datos.result_proced_diag_epi.replace(/\&/g, "\n");

  if (ren_epi.trim() != "") {
    datos.analisis.bandera = true;
    datos.analisis.reng_epi = ren_epi.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, "");
  }

  if (plan_epi.trim() != "") {
    datos.plan.bandera = true;
    datos.plan.plan_epi = plan_epi.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, "");
  }

  if (result_diag.trim() != "") {
    datos.result_proced_diag.bandera = true;
    datos.result_proced_diag.result_proced_diag_epi = result_diag.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, "");
  }
}

async function llenarFirma_HCI107() {
  console.log($_HCI107._datos.medico);
  await postData({ datosh: datosEnvio(), paso: '1', codigo: $_HCI107._datos.medico }, get_url("app/SALUD/SER819.DLL"))
    .then(data => {
      $_HCI107._medico = data;
    }).catch(err => {
      console.log(err, 'error')
      loader('hide')
      _regresar_menuhis();
    })

  res = $_HCI107._especialidades.find(e => e.CODIGO == $_HCI107._medico.TAB_ESPEC[0].COD);
  res != undefined ? datos.medico.espec = res.NOMBRE : false;

  datos.medico.firma = $_HCI107._medico.IDENTIFICACION.trim();

  datos.medico.nombre = $_HCI107._medico.NOMBRE.replace(/\�/g, 'Ñ');
  datos.medico.reg = $_HCI107._medico.REG_MEDICO;
}

async function llenarCierreEpic_HCI107() {
  var operador;
  if ($_HCI107._datos.oper_elab_j.trim() != "") {
    operador = $_HCI107._datos.oper_elab_j;
  } else {
    operador = $_HCI107._hcprc.cierre.oper_cie;
  }

  console.log(operador);

  if (operador != "") {
    await postData({ datosh: datosEnvio() + operador + '|' }, get_url("app/CONTAB/CON003.DLL"))
      .then(data => {
        var res = data.split('|');
        nombre_oper_w = res[0].trim();
        id_oper_w = res[1];

        datos.cierre.oper_descrip = nombre_oper_w;

      }).catch(err => {
        console.log(err, 'error')
        datos.cierre.oper_descrip = "";
      })
  } else {
    datos.cierre.oper_descrip = "";
  }

  var fecha;
  if ($_HCI107._datos.fecha_epi.trim() != "") {
    fecha = $_HCI107._datos.fecha_epi;
  } else {
    fecha = $_HCI107._hcprc.egreso;
  }

  if (fecha.trim() != "") {
    var mes_w = fecha.substring(4, 6);
    var mes_edit;
    switch (mes_w) {
      case "01":
        mes_edit = "ENE";
        break;
      case "02":
        mes_edit = "FEB";
        break;
      case "03":
        mes_edit = "MAR";
        break;
      case "04":
        mes_edit = "ABR";
        break;
      case "05":
        mes_edit = "MAY";
        break;
      case "06":
        mes_edit = "JUN";
        break;
      case "07":
        mes_edit = "JUL";
        break;
      case "08":
        mes_edit = "AGT";
        break;
      case "09":
        mes_edit = "SEP";
        break;
      case "10":
        mes_edit = "OCT";
        break;
      case "11":
        mes_edit = "NOV";
        break;
      case "12":
        mes_edit = "DIC";
        break;
      default:
        mes_edit = "";
        break;
    }
    datos.cierre.fecha = mes_edit + " " + fecha.substring(6, 8) + "/" + fecha.substring(0, 4);
  } else {
    datos.cierre.fecha = "";
  }

  var cod_diag_muerte = $_HCI107._hcprc.cierre.diag_muer;

  var res = $_HCI107._enfermedades.find(e => e.COD_ENF == cod_diag_muerte);
  if (res != undefined) {
    datos.cierre.bandera_diagnosMuerte = true;
    datos.cierre.cod_diag_enf.push(res.COD_ENF);
    datos.cierre.nombre_enfer.push(res.NOMBRE_ENF);
  }

  for (var i in $_HCI107._hcprc.cierre.tabla_diag_egr) {
    if ($_HCI107._hcprc.cierre.tabla_diag_egr[i].diag_egr.trim() != "") {
      datos.cierre.bandera_diagnosEgre = true;
      datos.cierre.cod_diag_egre.push($_HCI107._hcprc.cierre.tabla_diag_egr[i].diag_egr);

      var res1 = $_HCI107._enfermedades.find(e => e.COD_ENF == $_HCI107._hcprc.cierre.tabla_diag_egr[i].diag_egr);
      if (res1 != undefined) {
        datos.cierre.nombre_enfer_egre.push(res1.NOMBRE_ENF);
      } else {
        datos.cierre.nombre_enfer_egre.push("");
      }
    }
  }

  if ($_HCI107._hcprc.observ_egres.trim() != "") {
    datos.cierre.bandera_obser = true;
    datos.cierre.observ.push($_HCI107._hcprc.observ_egres);
  }

  if ($_HCI107._hcprc.rips.estado_sal.trim() != "") {
    datos.estado_salida.bandera = true;

    switch ($_HCI107._hcprc.rips.estado_sal) {
      case '1':
        datos.estado_salida.descrip = "VIVO (A)";
        break;
      case "2":
        datos.estado_salida.descrip = "MUERTO (A)";
        break;
      case "3":
        datos.estado_salida.descrip = "REMITIDO A:";
        break;
      case "4":
        datos.estado_salida.descrip = "HOSPITALIZADO";
        break;
      case "5":
        datos.estado_salida.descrip = "OBSERVACION";
        break;
    }
  }

  if ($_HCI107._hcprc.rips.remitido.trim() != "") {
    datos.estado_salida.bandera = true;
    datos.estado_salida.remitido = $_HCI107._hcprc.rips.remitido;
  }
}

async function llamarImpresion_HCI107() {
  await _impresion2({
    tipo: 'pdf',
    archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmssS-01')}.pdf`,
    content: await _imprimirHCI107(datos, console.log('imprime HCI107')),
    retornar: false
  }).catch((err) => {
    console.error(err);
  })
}

async function salir_HCI107() {
  loader('hide')
  if (localStorage.idOpciondata == "072") {
    _regresar_menuhis();
  }
}

async function abrirArchivos_HCI107() {
  loader('show');
  await postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON809.DLL"))
    .then(data => {
      $_HCI107._ciudades = data.CIUDAD;
      $_HCI107._ciudades.pop();
    }).catch(err => {
      console.log(err, 'error')
      loader('hide')
      _regresar_menuhis();
    })

  await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER853.DLL"))
    .then(data => {
      $_HCI107._entidades = data.ENTIDADES;
      $_HCI107._entidades.pop();
    }).catch(err => {
      console.log(err, 'error')
      loader('hide')
      _regresar_menuhis();
    })

  await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER855.DLL"))
    .then(data => {
      $_HCI107._especialidades = data.ESPECIALIDADES;
      $_HCI107._especialidades.pop();
    }).catch(err => {
      console.log(err, 'error')
      loader('hide')
      _regresar_menuhis();
    })

  await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + '|' + localStorage.Usuario + '|' + '1' }, get_url("app/HICLIN/HC_PRC.DLL"))
    .then(data => {
      $_HCI107._hcprc = data.HCPAC;
    }).catch(err => {
      console.log(err, 'error')
      loader('hide')
      _regresar_menuhis();
    })

  await postData({ datosh: datosEnvio() }, get_url("APP/HICLIN/HC808.DLL"))
    .then((data) => {
      $_HCI107._codigos = data.MACROS;
      $_HCI107._codigos.pop();
    })
    .catch((err) => {
      console.log(err, 'err')
      loader('hide')
      _regresar_menuhis();
    });

  await postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER873.DLL"))
    .then((data) => {
      $_HCI107._unserv = data.UNSERV;
      $_HCI107._unserv.pop();
    })
    .catch((err) => {
      console.log(err, 'err')
      loader('hide')
      _regresar_menuhis();
    });

  await postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER856.DLL"))
    .then((data) => {
      console.log(data)
      $_HCI107.vias_existentes = data.VIAS_ACCESO
      $_HCI107.vias_existentes.pop()
    })
    .catch(error => {
      console.error(error)
      loader('hide')
      _this.salir_hc107()
    });

  await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER851.DLL"))
    .then(data => {
      $_HCI107._enfermedades = data.ENFERMEDADES;
      $_HCI107._enfermedades.pop();
    }).catch(err => {
      console.log(err, 'error')
      loader('hide')
      _regresar_menuhis();
    })

  loader('show');
}

async function inicializarDatos_HCI107() {
  datos = {
    encabezado: {
      nombre: '',
      nit: '',
      titulo: '',
    },

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
      foto: ''
    },

    encabezarEpi: {
      mes_epi: '',
      dia_epi: '',
      año_epi: '',
      hora_epi: '',
      minutos_epi: '',
      descrip: '',
      descrip_prof: '',
    },

    procedimientos: {
      banderaMacro: null,
      tipo: '',
      detalle_macroEvo: '',

      bandera_viaEpi: null,
      descripVia: '',
      motivo: ''
    },

    analisis: {
      bandera: null,
      reng_epi: '',
    },

    plan: {
      bandera: null,
      plan_epi: '',
    },

    result_proced_diag: {
      bandera: null,
      result_proced_diag_epi: '',
    },

    medico: {
      firma: '',
      reg: '',
      nombre: '',
      espec: ''
    },

    cierre: {
      oper_descrip: '',
      fecha: '',

      bandera_diagnosMuerte: null,
      cod_diag_enf: [],
      nombre_enfer: [],

      bandera_diagnosEgre: null,
      cod_diag_egre: [],
      nombre_enfer_egre: [],

      bandera_obser: null,
      observ: [],
    },

    estado_salida: {
      bandera: null,
      descrip: '',
      remitido: '',
    }
  }
}