
function _regresar_menuhis() {
  $("#body_main").load("../../ODONTO/paginas/MENU-ODO.html");
  cargarDatosPaci($_REG_OD.llave_hc);
}

function calcularFechasLimite() {
  var fecha_limite = "";
  var ano_egreso = $_REG_OD.fecha_egreso_hc.substring(0, 4);
  var mes_egreso = $_REG_OD.fecha_egreso_hc.substring(4, 6);
  var dia_egreso = $_REG_OD.fecha_egreso_hc.substring(6, 8);

  $_REG_OD["fecha_limite"] = "";

  if (mes_egreso == "00" || mes_egreso == "  ") {
    if (parseInt($_REG_OD.estado_hc) < 2 || $_REG_OD.estado_hc == " ") {
      $_REG_OD.fecha_limite = moment().format("YYYYMMDD");
    } else {
      $_REG_OD.fecha_limite = $_REG_OD.fecha_hc;
    }
  } else {
    var fecha = new Date(ano_egreso + "/" + mes_egreso + "/" + dia_egreso);

    switch ($_REG_OD.unser_hc) {
      case "01":
        fecha_limite = fecha.addDays(8);
        break;
      case "02":
        fecha_limite = fecha.addDays(30);
        break;
    }

    $_REG_OD["fecha_limite"] = moment(fecha_limite).format("YYYYMMDD");
  }
}

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

function _getObjetoHc(data) {
  let obj = JSON.parse(JSON.stringify(data));
  let datos_env = _desplegarArrayHc(obj);
  datos_env.datosh = datosEnvio() + localStorage.Usuario + "|";
  return datos_env;
}

var _desplegarArrayHc = function (obj) {
  var datos = {};

  const filtro = [
    "tabla_tto_sifi",
    "tabla_segui_serol",
    "tabla_diag",
    "tabla_diag_egr",
  ];

  Object.keys(obj).forEach((el) => {
    let tipo = typeof obj[el];
    if (tipo === "object") {
      if (filtro.indexOf(el) !== -1) {
        let filtro_data = obj[el];
        filtro_data.forEach((i, index) => {
          let name = el + (index + 1).toString().padStart(3, "0");
          let string = "";
          Object.keys(i).forEach((j) => {
            string += i[j] + "|";
          });
          datos[name] = string;
        });
      } else {
        if (obj[el] != null) {
          datos = Object.assign(datos, _desplegarArrayHc(obj[el]));
        }
      }
    } else if (tipo === "string" || tipo == "number") {
      if (!datos[el]) {
        datos[el] = obj[el];
      }
    }
  });

  return datos;
};

var _desplegarNuevoArray = function (array) {
  var datos = {};
  array = JSON.parse(JSON.stringify(array));

  array.forEach((obj, index) => {
    let new_obj = _desplegarNuevoObject(obj, index);
    datos = Object.assign(datos, new_obj);
  });

  return datos;
};

var _desplegarNuevoObject = function (obj, index) {
  var datos = {};
  obj = JSON.parse(JSON.stringify(obj));

  Object.getOwnPropertyNames(obj).forEach((val) => {
    let tipo = typeof obj[val];
    if (tipo == "string" || tipo == "number") {
      let name = val + (index + 1).toString().padStart(3, "0");
      datos[name] = obj[val];
    } else {
      if (obj[val] != null) {
        datos = Object.assign(datos, _desplegarNuevoObject(obj[val], index));
      }
    }
  });

  return datos;
};

function _getObjetoHcDetal(object, llave_hcdet) {
  var datos_env = { datosh: datosEnvio() + llave_hcdet + "|", codigos: "" },
    codigos = ["2080", "4040", "9005", "9006", "9008", "9009", "9010", "9011"];

  object = JSON.parse(JSON.stringify(object));
  object.forEach((item) => {
    var consulta = codigos.find((e) => e == item["COD-DETHC"]);
    if (item["LLAVE-HC"].trim()) {
      if (!consulta) {
        datos_env.codigos += item["COD-DETHC"].trim() + "|";
        let _detalle = item.DETALLE || "";
        item.DETALLE = _detalle.replace(/(\r\n|\n|\r)/gm, "&") || "";
        var length = item.DETALLE.trim().length / 95;
        (length = Math.ceil(length)), (sw = 0);

        for (var j = 0; j < length; j++) {
          sw++;
          datos_env[
            `LIN_${item["COD-DETHC"]}_${sw.toString().padStart(3, "0")}`
          ] = item.DETALLE.substring(95 * j, j * 95 + 95).trim();
        }
      } else {
        var obj = Object.keys(item.DETALLE);
        datos_env[`LIN_${item["COD-DETHC"]}_001`] = "";

        for (var k in obj) {
          if (obj[k] == "dependencia_funcional_9005") {
            Object.getOwnPropertyNames(item.DETALLE[obj[k]]).forEach((val) => {
              datos_env[`LIN_${item["COD-DETHC"]}_001`] +=
                item.DETALLE[obj[k]][val] + "|";
            });
          } else {
            datos_env[`LIN_${item["COD-DETHC"]}_001`] +=
              item.DETALLE[obj[k]] + "|";
          }
        }
      }
    }
  });
  return datos_env;
}

function Regexp_detalle(array) {
  var detalles = [];

  array.forEach((item) => {
    var type_data = typeof item.DETALLE;

    if (type_data == "string") {
      item.DETALLE = item.DETALLE.trim().replace(/(?:\&)/g, "\n");
      detalles.push(item);
    } else {
      detalles.push(item);
    }
  });

  return detalles;
}

function _limpiarDato9005() {
  return (obj = {
    "COD-DETHC": "9005",
    "LLAVE-HC": "",
    DETALLE: {
      valoracion_9005: "",
      revaloracion_9005: "",
      comer_9005: 0,
      lavarse_9005: 0,
      vestirse_9005: 0,
      arreglarse_9005: 0,
      deposicion_9005: 0,
      miccion_9005: 0,
      baño_9005: 0,
      trasladarse_9005: 0,
      deambulacion_9005: 0,
      escaleras_9005: 0,
      dependencia_funcional_9005: {
        nivel_secuelas_9005: "",
        ayuda_actividades_9005: "",
        depen_funcional_9005: "",
      },
    },
  });
}

function _limpiarDato9006() {
  return (obj = {
    "COD-DETHC": "9006",
    "LLAVE-HC": "",
    DETALLE: {
      valoracion_9006: "",
      revaloracion_9006: "",
      categoria_9006: 0,
      actividad_normal_9006: 0,
      incapaz_trabajar_9006: 0,
      incapaz_cuidarse_9006: 0,
    },
  });
}

function _limpiarDato9009() {
  return (obj = {
    "COD-DETHC": "9009",
    "LLAVE-HC": "",
    DETALLE: {
      clasificacion_9009: 0,
      dimension_9009: 0,
      profund_tejido_9009: 0,
      comorbilidad_9009: "",
      estado_herida_9009: 0,
      infeccion_9009: "",
      tiempo_evolu_9009: "",
      registro_foto_909: 0,
    },
  });
}

function _limpiarFormulacion() {
  let obj = {
    item_formu: null,
    tipo_formu: null,
    cod_formu: null,
    cant_formu: null,
    descripcion: null,
    indic_formu: {
      indi1_formu: {
        orden_dosis_formu: null,
        cant_dosis_formu: null,
        unid_dosis_formu: null,
        inmed_formu: {
          cada_dosis_formu: null,
          cant_frec_dosis_formu: null,
          unid_frec_dosis_formu: null,
        },
        via_dosis_formu: null,
        dias_trat_formu: null,
      },
      indic2_formu: null,
    },
    var_dosis_formu: {
      cant_dosisf_formu: null,
      tipo_dosisf_formu: null,
      cant_frec_dosisf_formu: null,
      frec_dosisf_formu: null,
      via_formu: null,
    },
    instituto_formu: null,
    tipo_incap_formu: null,
    grado_incap_formu: null,
    prorroga_formu: null,
    nro_ord_formu: null,
    fecha_incap: {
      ano: null,
      mes: null,
      dia: null,
    },
    /* variable de la tabla interpretacion */
    espec_formu: null,
  };
  return JSON.parse(JSON.stringify(obj));
}

function consult_atiendProf(codigo) {
  var msj = "";
  switch (codigo) {
    case "1":
      msj = "MEDICO ESPECIALISTA";
      break;
    case "2":
      msj = "MEDICO GENERAL";
      break;
    case "3":
      msj = "ENFERMERA";
      break;
    case "4":
      msj = "AUXILIAR ENFERMERIA";
      break;
    case "5":
      msj = "TERAPEUTAS Y OTROS";
      break;
    case "6":
      msj = "ENFERMERA JEFE PYP";
      break;
    case "7":
      msj = "PSICOLOGIA";
      break;
    case "8":
      msj = "NUTRICIONISTA";
      break;
    case "9":
      msj = "NUTRICIONISTA";
      break;
    case "A":
      msj = "SIN DETERMINAR";
      break;
    case "B":
      msj = "AUDITOR MEDICO";
      break;
    case "H":
      msj = "ODONTOLOGO";
      break;
    case "I":
      msj = "HIGIENISTA ORAL";
      break;
    case "O":
      msj = "OPTOMETRA";
      break;
    case "T":
      msj = "TRABAJO SOCIAL";
      break;
  }
  return msj;
}

function consult_embar(codigo) {
  var msj = "";
  switch (codigo) {
    case "1":
      msj = "1ER TRIM. EMBA";
      break;
    case "2":
      msj = "2DO TRIM. EMBA";
      break;
    case "3":
      msj = "3ER TRIM. EMBA";
      break;
    case "4":
      msj = "NO ESTA EMBAR.";
      break;
    case "9":
      msj = "NO APLICA";
      break;
  }
  return msj;
}

function consult_causa(codigo) {
  var msj = "";
  switch (codigo) {
    case "1":
      msj = "ACCIDENTE TRABAJO";
      break;
    case "2":
      msj = "ACCIDENTE TRANSITO";
      break;
    case "3":
      msj = "ACCIDENTE RABICO";
      break;
    case "4":
      msj = "ACCIDENTE OFIDICO";
      break;
    case "5":
      msj = "OTRO ACCIDENTE";
      break;
    case "6":
      msj = "EVENTO CATASTROFIC";
      break;
    case "7":
      msj = "LESION AGRESION";
      break;
    case "8":
      msj = "LESION AUTO INFLIG";
      break;
    case "9":
      msj = "SOSP.MALTRATO FIS";
      break;
    case "10":
      msj = "SOSP.ABUSO SEXUAL";
      break;
    case "11":
      msj = "SOSP.VIOLENCIA SEX";
      break;
    case "12":
      msj = "SOSP.MALTRATO EMOC";
      break;
    case "13":
      msj = "ENFERMEDAD GENERAL";
      break;
    case "14":
      msj = "ENFERMEDAD PROFES";
      break;
    case "15":
      msj = "OTRA CAUSA";
      break;
  }
  return msj;
}

function consult_tipoDiagn(codigo) {
  var msj = "";
  switch (codigo) {
    case "1":
      msj = "IMPRESION DIAGNOST";
      break;
    case "2":
      msj = "CONFIRMADO NUEVO";
      break;
    case "3":
      msj = "CONFIRMADO REPETID";
      break;
    case "9":
      msj = "No aplica";
      break;
  }
  return msj;
}

function consult_planifica(codigo) {
  var msj = "";
  switch (codigo) {
    case "1":
      msj = "DIU";
      break;
    case "2":
      msj = "ORAL";
      break;
    case "3":
      msj = "BARRERA";
      break;
    case "4":
      msj = "OTRO";
      break;
    case "5":
      msj = "NINGUNO";
      break;
    case "6":
      msj = "DIU + BARRERA";
      break;
    case "7":
      msj = "IMPL. SUBDERMICO";
      break;
    case "8":
      msj = "I.SUBDERM+BARRERA";
      break;
    case "9":
      msj = "ORAL + BARRERA";
      break;
    case "A":
      msj = "INYECTABLE MENSUAL";
      break;
    case "B":
      msj = "INYECTABLE+BARRERA";
      break;
    case "C":
      msj = "INYECTABLE TRIMEST";
      break;
    case "D":
      msj = "TRIMESTRAL+BERRERA";
      break;
    case "E":
      msj = "EMERGENCIA";
      break;
    case "F":
      msj = "EMERGENCIA+BARRERA";
      break;
    case "G":
      msj = "ESTERILIZACION";
      break;
    case "H":
      msj = "ESTERILIZA+BARRERA";
      break;
    case "I":
      msj = "NO USA X TRADICION";
      break;
    case "J":
      msj = "NO USA X SALUD";
      break;
    case "K":
      msj = "NO USA X NEGACION";
      break;
    case "L":
      msj = "COITUS INTERRUPTUS";
      break;
    case "M":
      msj = "METODO DEL RITMO";
      break;
    default:
      msj = "";
      break;
  }
  return msj;
}

function estad_salida(codigo) {
  var msj = "";
  switch (codigo) {
    case "":
      msj = "";
      break;
    case "1":
      msj = "VIVO   (a)";
      break;
    case "2":
      msj = "MUERTO (a)";
      break;
    case "3":
      msj = "REMITIDO";
      break;
    case "4":
      msj = "HOSPITALIZAD";
      break;
    case "5":
      msj = "OBSERVACION";
      break;
    case "6":
      msj = "NO APLICA";
      break;
  }
  return msj;
}

function buscar_consulta_externa() {
  //  HC811B
  var retorno = "";

  var fecha_hc = new Array();
  fecha_hc["ano"] = $_REG_OD["fecha_hc"].substring(0, 4);
  fecha_hc["mes"] = $_REG_OD["fecha_hc"].substring(4, 6);
  fecha_hc["dia"] = $_REG_OD["fecha_hc"].substring(6, 8);

  var fecha_lim_consul = new Array();
  fecha_lim_consul["ano"] = fecha_hc.ano;
  fecha_lim_consul["mes"] = fecha_hc.mes;
  fecha_lim_consul["dia"] = "";

  if (fecha_hc.dia < 04) {
    fecha_lim_consul["mes"]--;
    switch (fecha_lim_consul.mes) {
      case "01":
        fecha_lim_consul["ano"]--;
        fecha_lim_consul["mes"] = 12;
        fecha_lim_consul["dia"] = 31;
        break;
      case "02":
        fecha_lim_consul["dia"] = 31;
        break;
      case "03":
        if (
          ["00", "04", "08", "12", "16", "20"].filter(
            (data) => data == fecha_lim_consul["ano"]
          ).length > 0
        )
          fecha_lim_consul["dia"] = 29;
        else fecha_lim_consul["dia"] = 28;
        break;
      case ("04", "06", "08", "11"):
        fecha_lim_consul["dia"] = 31;
        break;
      case ("05", "07", "09", "10", "12"):
        fecha_lim_consul["dia"] = 30;
        break;
      default:
        break;
    }
    if (fecha_lim_consul["dia"] == 1 || fecha_lim_consul["dia"] == 2)
      fecha_lim_consul["dia"] - fecha_hc.dia;
  } else {
    fecha_lim_consul["dia"] - 3;
  }
  var datos_env =
    datosEnvio() +
    cerosIzq($_REG_PACI[0].cod_paci, 15) +
    "|" +
    fecha_lim_consul["ano"] +
    fecha_lim_consul["mes"] +
    fecha_lim_consul["dia"] +
    "|";
  SolicitarDll(
    {
      datosh: datos_env,
    },
    function (data) {
      var res = data.split("|"),
        admin = localStorage["Usuario"],
        nit = $_USUA_GLOBAL[0].NIT,
        serv = $_REG_OD.serv_hc,
        prefijo = $_USUA_GLOBAL[0].PREFIJ;
      if (res[0].trim() == "00") {
        var fecha_ult_consul = res[3];
        //Sin comprobante retorno=2, con comprobante retorno=1
        if (fecha_ult_consul < fecha_lim_consul) {
          CON851("9A", "9A", null, "error", "error");
          if (
            ["ADMI", "GEBC", "YPBA"].filter((adm) => adm == admin).length > 0
          ) {
            retorno = 1;
          } else {
            retorno = 2;
            // * CLINICA META, SERVIMEDICOS PYP, ESE YOPAL, DR MEDINA,
            // * CLINICA EMPERATRIZ, DR CASTRO, DR REYES, DRA FABIOLA
            // * DOCTOR MENENDEZ=72200727
            // * MOVISALUD
            // * 900161116 sociedad cardiologica colombiana
            // * 892000458 HOSPITAL SAN MARTIN
            // * SI DEJAN EVOLUCIONAR SIN FACTURAR
            // * 74858598 ALBER URIEL GALLEGO
            // * 900988374 UNIMAFER(DOCTOR NAVARRO) ALBERT
            // * 900565371 MAVESALUD
            // * 900264583 ONCOORIENTE
            // * 845000038 hospital de mitu
            // * 900475095 ips san fernando

            if (
              [
                "892000401",
                "822007038",
                "900475095",
                "800175901",
                "19381427",
                "17306492",
                "31841010",
                "79152952",
                "72200727",
                "900030814",
                "900161116",
                "900424844",
                "74858598",
                "900988374",
                "19233740",
                "900264583",
                "900475095",
                "901146885",
                "900450008",
              ].filter((empresa) => empresa == nit).length > 0 ||
              (nit == "800162035" && prefijo == "08") ||
              (nit == "892000458" && serv == "08") ||
              (nit == "900565371" && serv == "09") ||
              (nit == "844003225" &&
                ["EM", "CH", "TL", "CS"].filter((pref) => pref == prefijo)
                  .length > 0)
            ) {
              retorno = 1;
            } else if (nit == "844003225" && fecha_ult_consul < 20190401) {
              retorno = 1;
            }
          }
        }
      } else {
        plantillaError(res[0], res[1], res[2]);
      }
    },
    get_url("APP/HICLIN/HC836A.DLL")
  );

  if (retorno == 2) {
    _cargarEventos("on");
    _toggleNav();
  }
}

function recalcularCenso_hosp(callback, atiende_prof) {
  var f = new Date();
  if (f.getHours() > 04 && f.getHours() < 20) {
    postData(
      {
        datosh:
          datosEnvio() +
          (f.getFullYear() + 1) +
          "|" +
          7 +
          "|" +
          atiende_prof +
          "|",
      },
      get_url("APP/HICLIN/HC904A.DLL")
    )
      .then(callback)
      .catch((error) => {
        console.log(error);
      });
  } else {
    callback();
  }
}

function consultar_detalles_historia(
  folio_dethc,
  cods_dethc,
  llave_dethc,
  callback
) {
  //HC-01 Consultar detalles historia
  /* if cods_dethc==** => trae todos los detalles
    if cods_dethc==[array] => selecciona solo esos detalles
       if folio.lenght==0 || llave_dethc==llave_hc => selecciona folio anterior a la nueva historia
       if folio.lenght!==0 => selecciona folio especifico
       callback: funcion que se ejecuta luego de consultar el json
    */

  var llave_dethc_env = "",
    sw_detalle = "  ",
    llave = $_REG_OD.llave_hc;

  if (llave_dethc.length == 0) llave_dethc = llave;

  if (folio_dethc !== "**") {
    llave_dethc_env = $_REG_PACI[0].cod_paci + folio_dethc;
  } else {
    var folio =
      $_REG_OD.suc_folio_hc + cerosIzq(parseInt($_REG_OD.nro_folio_hc) - 1, 6);
    llave_dethc_env = $_REG_PACI[0].cod_paci + folio;
  }
  if (cods_dethc !== "**") {
    if (Array.isArray(cods_dethc)) {
      cods_dethc = cods_dethc.toString();
    } else {
      sw_detalle = "**";
    }
  }
  datos_env =
    datosEnvio() +
    llave_dethc_env +
    "|" +
    localStorage["Usuario"] +
    "|" +
    sw_detalle +
    "|" +
    folio_dethc +
    "|" +
    cods_dethc +
    "|";

  SolicitarDll(
    {
      datosh: datos_env,
    },
    function (data) {
      var res = data.split("|");
      if (res[0] == "00") {
        if (res[1] == "99") {
          callback(res[1]);
        } else {
          SolicitarDatos({}, callback, get_url("TEMP/" + res[3]));
        }
      } else {
        plantillaError(res[0], res[1], res[2]);
      }
    },
    get_url("APP/HICLIN/HCDETAL-ANT.DLL")
  );
}

function evaluarFNTriage(data) {
  let PASOW = "";
  switch (data.tecla.toUpperCase()) {
    case "F2":
      PASOW = "1";
      get_PacientesTriage(data.cancel, data.acept, data.caja, PASOW);
      break;
    case "F8":
      PASOW = "2";
      get_PacientesTriage(data.cancel, data.acept, data.caja, PASOW);
      break;
    case "F9": //IMPRESION
      PASOW = "3";
      get_PacientesTriage(data.cancel, data.acept, data.caja, PASOW);
      break;
    case "F10":
      PASOW = "4";
      get_PacientesTriage(data.cancel, data.acept, data.caja, PASOW);
      break;
    default:
      break;
  }
}
function get_PacientesTriage() {
  let URL = get_url("APP/" + "CONTAB/CON818" + ".DLL");
  postData(
    {
      datosh: datosEnvio() + localStorage["Usuario"] + "|",
    },
    URL
  )
    .then((data) => {
      loader("hide");
      $_GRADONEG_7767 = data;
      if ((e.type == "keydown" && e.which == 119) || e.type == "click") {
        _ventanaDatos({
          titulo: "VENTANA DE GRADO DE NEGOCIOS",
          columnas: ["TIPO", "NOMBRE"],
          data: $_GRADONEG_7767.GRNEGOCIO,
          callback_esc: function () {
            $("#grdnegocio_110c").focus();
          },
          callback: function (data) {
            document.getElementById("grdnegocio_110c").value = data.TIPO;
            document.getElementById("grdnegociod_110c").value = data.NOMBRE;

            _enterInput("#grdnegocio_110c");
          },
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
function onPacientesTriageHC810() {}

function get_parentezcoPaciente(codigo) {
  var msj = "";
  switch (codigo) {
    case "01":
      msj = "CONYUG";
      break;
    case "02":
      msj = "HIJO  ";
      break;
    case "03":
      msj = "PADRES";
      break;
    case "04":
      msj = "2 GRAD";
      break;
    case "05":
      msj = "3 GRAD";
      break;
    case "06":
      msj = "< 12  ";
      break;
    case "07":
      msj = "SUEGRO";
      break;
  }
  return msj;
}

function _tipoJsonHc(tipo) {
  var retornar = "";
  switch (tipo) {
    case "estructurasOculares":
      retornar = [
        { COD: "1", DESCRIP: "SIN ALTERACIONES" },
        { COD: "2", DESCRIP: "CON ALTERACIONES" },
        { COD: "3", DESCRIP: "NO APLICA" },
      ];
      break;
    case "9005_comer":
    case "9005_vestirse":
    case "9005_baño":
    case "9005_escaleras":
      retornar = [
        { COD: "1", DESCRIP: "Independiente" },
        { COD: "2", DESCRIP: "Necesita ayuda" },
        { COD: "3", DESCRIP: "Dependiente" },
      ];
      break;
    case "9005_lavarse":
    case "9005_arreglarse":
      retornar = [
        { COD: "1", DESCRIP: "Independiente" },
        { COD: "2", DESCRIP: "Dependiente" },
      ];
      break;
    case "9005_deposicion":
    case "9005_miccion":
      retornar = [
        { COD: "1", DESCRIP: "Continente" },
        { COD: "2", DESCRIP: "Accidental ocasional" },
        { COD: "3", DESCRIP: "Incontinente" },
      ];
      break;
    case "9005_trasladarse":
      retornar = [
        { COD: "1", DESCRIP: "Independiente" },
        { COD: "2", DESCRIP: "Minima ayuda" },
        { COD: "3", DESCRIP: "Gran ayuda" },
        { COD: "4", DESCRIP: "Dependiente" },
      ];
      break;
    case "9005_deambulacion":
      retornar = [
        { COD: "1", DESCRIP: "Independiente" },
        { COD: "2", DESCRIP: "Necesita ayuda" },
        { COD: "3", DESCRIP: "Independiente en silla de ruedas" },
        { COD: "4", DESCRIP: "Dependiente" },
      ];
      break;
    case "9006_categorias":
      retornar = [
        {
          COD: "1",
          DESCRIP:
            "Capaz de realizar actividades normales, no requiere cuidados especiales",
        },
        {
          COD: "2",
          DESCRIP:
            "Incapaz de trabajar, puede vivir en casa y auto cuidarse con ayuda variables",
        },
        {
          COD: "3",
          DESCRIP:
            "Incapaz de auto cuidarse. Requiere cuidados especiales, susceptible de hospitalizacion, probable avance de enfermedad",
        },
      ];
      break;
    case "9006_actividades":
      retornar = [
        { COD: "1", DESCRIP: "Actividad normal. Sin evidencia de enfermedad" },
        {
          COD: "2",
          DESCRIP: "Actividad normal con esfuerzo, sintomas de enfermedad.",
        },
        {
          COD: "3",
          DESCRIP:
            "Cuida de si mismo pero es incapaz de llevar a cabo una actividad o trabajo normal",
        },
      ];
      break;
    case "9006_incapazTrabajar":
      retornar = [
        {
          COD: "1",
          DESCRIP:
            "Necesita ayuda de otros pero es capaz de cuidar de si mismo para mayor parte sus necesidades",
        },
        {
          COD: "2",
          DESCRIP:
            "Requiere ayuda considerable de otros y cuidados especiales frecuentes incapacitados",
        },
        {
          COD: "3",
          DESCRIP: "Requiere cuidados especiales. Severamente incapacitado",
        },
      ];
      break;
    case "9006_incapazCuidarse":
      retornar = [
        {
          COD: "1",
          DESCRIP:
            "Indicacion de hospitalizacion aunque no hay indicios de muerte.",
        },
        {
          COD: "2",
          DESCRIP: "Gravemente enfermo. Necesita asistencia activa de soporte.",
        },
        { COD: "3", DESCRIP: "Moribundo." },
        { COD: "4", DESCRIP: "Fallecio." },
      ];
      break;
    case "9009_clasificaHerida":
      retornar = [
        { COD: "1", DESCRIP: "Heridas agudas." },
        { COD: "2", DESCRIP: "Heridas especiales." },
        { COD: "3", DESCRIP: "Heridas cronicas." },
      ];
      break;
    case "9009_dimensionHerida":
      retornar = [
        { COD: "1", DESCRIP: "Superficie < 4 CM2." },
        { COD: "2", DESCRIP: "Superficie = 4 -< 16 CM2." },
        { COD: "3", DESCRIP: "Superficie = 16 -< 36 CM2." },
        { COD: "4", DESCRIP: "Superficie = 36 -< 64 CM2." },
        { COD: "5", DESCRIP: "Superficie = 64 -< 100 CM2." },
        { COD: "3", DESCRIP: "Superficie = >= 100 CM2." },
      ];
      break;
    case "9009_profundTejido":
      retornar = [
        { COD: "1", DESCRIP: "Piel intacta o cicatrizada." },
        { COD: "2", DESCRIP: "Afectacion de la Dermis-Epidermis." },
        {
          COD: "3",
          DESCRIP:
            "Afectacion de tejido sucutaneo (tejido adiposo sin llegar a la fascia del musculo).",
        },
        { COD: "4", DESCRIP: "Afectacion del musculo." },
        {
          COD: "5",
          DESCRIP:
            "Afectacion del hueso y tejido anexos. (Tendones, ligamentos, capsula articular o escara negra que no permite ver los tejidos debajo de ella).",
        },
        { COD: "3", DESCRIP: "Superficie = >= 100 CM2." },
      ];
      break;
    case "9009_comorbilidad":
      retornar = [
        { COD: "1", DESCRIP: "Sin patologias asociadas." },
        { COD: "2", DESCRIP: "Con 1 patologia como comorbilidad asociada." },
        { COD: "3", DESCRIP: "Con 2 patologias como comorbilidad asociadas." },
      ];
      break;
    case "9009_estadoHerida":
      retornar = [
        { COD: "1", DESCRIP: "Estadio I." },
        { COD: "2", DESCRIP: "Estadio II." },
        { COD: "3", DESCRIP: "Estadio III." },
        { COD: "4", DESCRIP: "Estadio IV." },
      ];
      break;
    case "9009_infecion":
      retornar = [
        { COD: "1", DESCRIP: "No evidencia signos de infeccion." },
        { COD: "2", DESCRIP: "Si evidencia signos de infeccion." },
      ];
      break;
    case "9009_tiempo":
      retornar = [
        { COD: "1", DESCRIP: "De 1 a 4 meses." },
        { COD: "2", DESCRIP: "De 5 a 8 meses." },
        { COD: "3", DESCRIP: "De 9 a 12 meses." },
        { COD: "4", DESCRIP: "Mas de 12 meses." },
      ];
      break;
    case "9009_registroFoto":
      retornar = [
        { COD: "1", DESCRIP: "Con evidente evolucion." },
        { COD: "2", DESCRIP: "Evolucion estancada." },
        { COD: "3", DESCRIP: "Con retroceso evidente en la evolucion." },
      ];
      break;
    case "causa":
      retornar = [
        { COD: "1", DESCRIP: "ACCIDENTE DE TRABAJO" },
        { COD: "2", DESCRIP: "ACCIDENTE DE TRANSITO" },
        { COD: "3", DESCRIP: "ACCIDENTE RABICO" },
        { COD: "4", DESCRIP: "ACCIDENTE OFIDICO" },
        { COD: "5", DESCRIP: "OTRO TIPO ACCIDENTE" },
        { COD: "6", DESCRIP: "EVENTO CATASTROFICO" },
        { COD: "7", DESCRIP: "LESION POR AGRESION" },
        { COD: "8", DESCRIP: "LESION AUTOINFLINGIDA" },
        { COD: "9", DESCRIP: "SOSPECHA MALTRATO FISICO" },
        { COD: "10", DESCRIP: "SOSPECHA ABUSO SEXUAL" },
        { COD: "11", DESCRIP: "SOSPECHA VIOLENCIA SEXUAL" },
        { COD: "12", DESCRIP: "SOSPECHA MALTRATO EMOCIONAL" },
        { COD: "13", DESCRIP: "ENFERMEDAD GENERAL" },
        { COD: "14", DESCRIP: "ENFERMEDAD PROFESIONAL" },
        { COD: "15", DESCRIP: "NO APLICA" },
      ];
      break;
    case "tipo_diagnostico":
      retornar = [
        { COD: "1", DESCRIP: "IMPRESION DIAGNOSTICA" },
        { COD: "2", DESCRIP: "CONFIRMADO NUEVO" },
        { COD: "3", DESCRIP: "CONFIRMADO REPETIDO" },
        { COD: "9", DESCRIP: "NO APLICA" },
      ];
      break;
    case "salida":
      retornar = [
        { COD: "1", DESCRIP: "VIVO (a)" },
        { COD: "2", DESCRIP: "MUERTO (a)" },
        { COD: "3", DESCRIP: "REMITIDO" },
        { COD: "4", DESCRIP: "HOSPITALIZADO" },
        { COD: "5", DESCRIP: "OBSERVACION" },
        { COD: "6", DESCRIP: "NO APLICA" },
      ];
      break;
    case "embarazo":
      retornar = [
        { COD: "1", DESCRIP: "1ER TRIM. EMBA" },
        { COD: "2", DESCRIP: "2DO TRIM. EMBA" },
        { COD: "3", DESCRIP: "3ER TRIM. EMBA" },
        { COD: "4", DESCRIP: "NO DECLARA" },
        { COD: "9", DESCRIP: "NO APLICA" },
      ];
      break;
    case "adm_dosis":
      retornar = [
        { value: 1, text: " C.C" },
        { value: 2, text: " Gramos" },
        { value: 3, text: " Miligramos" },
        { value: 4, text: " Microgramos" },
        { value: 5, text: " Tiempo" },
        { value: 6, text: " Unidades" },
        { value: 7, text: " U. Internac." },
        { value: 8, text: " Puff" },
        { value: 9, text: " Gotas" },
        { value: "A", text: " %" },
        { value: "B", text: " Litros" },
        { value: "C", text: " MCG/Kl/min" },
        { value: "D", text: " Tableta" },
        { value: "E", text: " Cucharada" },
        { value: "F", text: " Crema/Ungu." },
        { value: "G", text: " Ampolla" },
        { value: "H", text: " Sobre" },
        { value: "I", text: " MiliEquivale" },
        { value: "J", text: " Capsulas" },
      ];
      break;
    case "adm_tiempo":
      retornar = [
        { value: 1, text: "Minuto (s)" },
        { value: 2, text: "Hora (s)" },
        { value: 3, text: "Dia (s)" },
        { value: 4, text: "Mes (s)" },
        { value: 5, text: "Año (s)" },
        { value: 6, text: "Inmediato" },
        { value: 7, text: "Para mezclas" },
        { value: 8, text: "Titulable" },
        { value: 9, text: "Una vez" },
      ];
      break;
    case "adm_via_dosis":
      retornar = [
        { value: 1, text: "Intravenosa" },
        { value: 2, text: "Intramuscular" },
        { value: 3, text: "Oral" },
        { value: 4, text: "Subcutaneo" },
        { value: 5, text: "Nasal" },
        { value: 6, text: "Oftalmica" },
        { value: 7, text: "Otica" },
        { value: 8, text: "Topica" },
        { value: 9, text: "Intradermico" },
        { value: "A", text: "Inhalatorio" },
        { value: "B", text: "Vaginal" },
        { value: "C", text: "Rectal" },
        { value: "D", text: "Peridural" },
        { value: "E", text: "Raquidea" },
        { value: "F", text: "Uretral" },
        { value: "G", text: "Sublingual" },
      ];
      break;
    case "selecionantecedentes":
      retornar = [
        { COD: 1, DESCRIP: "No refiere" },
        { COD: 2, DESCRIP: "No hay datos" },
        { COD: 3, DESCRIP: "No aplica" },
      ];
      break;
    case "tipoIncapacidad":
      retornar = [
        { COD: 1, DESCRIP: "Auxilo Maternidad" },
        { COD: 2, DESCRIP: "Enfermedad General" },
        { COD: 3, DESCRIP: "Enfermedad Profesional" },
        { COD: 4, DESCRIP: "Enfermedad de trabajo" },
        { COD: 5, DESCRIP: "Accidente de transito" },
        { COD: 6, DESCRIP: "Accidente de trabajo" },
      ];
      break;
    case "resp_ocular":
      retornar = [
        { COD: 1, DESCRIP: "Ninguna" },
        { COD: 2, DESCRIP: "Al dolor" },
        { COD: 3, DESCRIP: "A ordenes" },
        { COD: 4, DESCRIP: "Expontanea" },
      ];
      break;
    case "resp_verbal":
      retornar = [
        { COD: 1, DESCRIP: "Ninguna" },
        { COD: 2, DESCRIP: "Incomprensible" },
        { COD: 3, DESCRIP: "Inapropiada" },
        { COD: 4, DESCRIP: "Confusa" },
        { COD: 5, DESCRIP: "Orientada" },
      ];
      break;
    case "resp_motora":
      retornar = [
        { COD: 1, DESCRIP: "Ninguna" },
        { COD: 2, DESCRIP: "Descerebracion" },
        { COD: 3, DESCRIP: "Decorticacion" },
        { COD: 4, DESCRIP: "Retira" },
        { COD: 5, DESCRIP: "Localiza" },
        { COD: 6, DESCRIP: "Obedece orden" },
      ];
      break;
    case "tipo_macro_his":
      retornar = [
        { COD: 1, DESCRIP: "Macros formulacion medicamentos" },
        { COD: 2, DESCRIP: "Macros formulacion laboratorios" },
        { COD: 3, DESCRIP: "Macros formulacion paraclinicos" },
      ];
      break;
    case "si_no_aplica":
      retornar = [
        { COD: 1, DESCRIP: "Si" },
        { COD: 2, DESCRIP: "No" },
        { COD: 3, DESCRIP: "No aplica" },
      ];
      break;
    case "covid19":
      retornar = {
        viaje_covid19: null,
        contacto_covid19: null,
        fiebre_covid19: null,
        tos_covid19: null,
        disnea_covid19: null,
        malestar_covid19: null,
        rinorrea_covid19: null,
        viaje_dentro_covid19: null,
        lugar_dentro_covid19: null,
        tiempo_dentro_covid19: null,
        viaje_fuera_covid19: null,
        lugar_fuera_covid19: null,
        tiempo_fuera_covid19: null,
        odinofagia_covid19: null,
        recomendacion_covid19: null,
        consenti_acomp_covid19: null,
        personal_salud_covid19: null,
        acompanante_covid19: {
          ident_acomp_covid19: null,
          tipo_id_covid19: null,
          primer_apel_covid19: null,
          segundo_apel_covid19: null,
          primer_nom_covid19: null,
          segundo_nom_covid19: null,
          lugar_id_covid19: null,
        },
        paci_confirmado: {
          diabetes_covid19: null,
          enf_cardiovas_covid19: null,
          falla_renal_covid19: null,
          vih_covid19: null,
          cancer_covid19: null,
          enf_autoinmun_covid19: null,
          hipotiroid_covid19: null,
          cortico_inmuno_covid19: null,
          epoc_asma_covid19: null,
          mal_nutricion_covid19: null,
          fumadores_covid19: null,
        },
        consent_infor_covid19: null,
      };
      break;
    case "tipo_identicacion":
      retornar = [
        { COD: "CC", DESCRIP: "Cedula ciudadania" },
        { COD: "CE", DESCRIP: "Cedula extranjera" },
        { COD: "PA", DESCRIP: "Numero pasaporte" },
        { COD: "RC", DESCRIP: "Registro civil" },
        { COD: "TI", DESCRIP: "Tarjeta identidad" },
        { COD: "ASI", DESCRIP: "Adulto sin identificar" },
        { COD: "MSI", DESCRIP: "Menor sin identificar" },
        { COD: "NUI", DESCRIP: "Numero unico identidad. NUID." },
        { COD: "CD", DESCRIP: "Carnet diplomatico" },
        { COD: "SC", DESCRIP: "Salvo conducto" },
        { COD: "PE", DESCRIP: "Permiso especial permanente" },
        { COD: "CN", DESCRIP: "Certificado nacido vivo" },
      ];
      break;
  }
  return retornar;
}

var _espejoProfesional = () => {
  return {
    NOMBRE: "",
    IDENTIFICACION: localStorage.Sesion.substr(5, 10),
    DESCRIPCION: "",
    REG_MEDICO: "Profesional no atiende",
    ATIENDE_PROF: "",
    HORARIO: "",
    LU: "",
    MA: "",
    MI: "",
    JU: "",
    VI: "",
    SA: "",
    DO: "",
    TAB_ESPEC: [],
  };
};

function _SER874(tipoM) {
  // TIPOS DE MACRO
  tipoM = [
    { CODIGO: "1", DESCRIP: "CIRUGIAS" },
    { CODIGO: "2", DESCRIP: "PROCEDIMIENTOS" },
    { CODIGO: "4", DESCRIP: "ENFERMERIA" },
    { CODIGO: "5", DESCRIP: "MEDICINA GENERAL" },
    { CODIGO: "6", DESCRIP: "MEDICINA ESPECIALIZ" },
    { CODIGO: "7", DESCRIP: "RESUMENES HISTORIA" },
    { CODIGO: "8", DESCRIP: "TERAPIAS" },
    { CODIGO: "9", DESCRIP: "PRE-ANESTESIA" },
    { CODIGO: "O", DESCRIP: "ODONTOLOGIA" },
    { CODIGO: "C", DESCRIP: "CONSENT. INFORMADO" },
    { CODIGO: "P", DESCRIP: "PROMOCION Y PREVENC" },
  ];
  return tipoM;
}

function SC_DIAS(ini, fin) {
  ini = moment(ini);
  fin = moment(fin);

  var result = fin.diff(ini, "days");

  return result;
}

function _ESTCIVIL(e) {
  switch (e) {
    case "S":
      e = "SOLTERO ";
      break;
    case "C":
      e = "CASADO  ";
      break;
    case "U":
      e = "U.LIBRE ";
      break;
    case "D":
      e = "SEPARADO";
      break;
    case "V":
      e = "VIUDO   ";
      break;
    default:
      e = "        ";
      break;
  }
  return e;
}

function _TIPOAFIL(e) {
  switch (e) {
    case "1":
      e = "COTIZANTE";
      break;
    case "2":
      e = "BENEFICIARIO";
      break;
    case "3":
      e = "COT.PENSIONADO";
      break;
    case "4":
      e = "UPC ADICIONAL";
      break;
    case "5":
      e = "CABEZA FAMILIA";
      break;
    case "6":
      e = "GRUPO FAMILIAR";
      break;
    case "0":
      e = "SIN DETERMINAR";
      break;
    default:
      e = "              ";
      break;
  }
  return e;
}

function _ETNIA(e) {
  switch (e) {
    case "1":
      e = "INDIGENA ";
      break;
    case "2":
      e = "RAIZAL   ";
      break;
    case "3":
      e = "GITANO   ";
      break;
    case "4":
      e = "AFROCOLOM";
      break;
    case "5":
      e = "ROM      ";
      break;
    case "6":
      e = "MESTIZO  ";
      break;
    case "9":
      e = "NO APLICA";
      break;
    default:
      e = "         ";
      break;
  }
  return e;
}

function _editarFecha(fecha) {
  fecha = fecha.toString();
  var d = parseInt(fecha.substring(6, 8));
  var m = parseInt(fecha.substring(4, 6));
  var a = parseInt(fecha.substring(0, 4));

  var aux = "  ";
  switch (m) {
    case 1:
      aux = "Ene. ";
      break;
    case 2:
      aux = "Feb. ";
      break;
    case 3:
      aux = "Mar. ";
      break;
    case 4:
      aux = "Abr. ";
      break;
    case 5:
      aux = "May. ";
      break;
    case 6:
      aux = "Jun. ";
      break;
    case 7:
      aux = "Jul. ";
      break;
    case 8:
      aux = "Ago. ";
      break;
    case 9:
      aux = "Sep. ";
      break;
    case 10:
      aux = "Oct. ";
      break;
    case 11:
      aux = "Nov. ";
      break;
    case 12:
      aux = "Dic. ";
      break;
  }

  var fecha_edit = aux + d + "/" + a;

  if (fecha.trim() == "") {
    return fecha;
  } else {
    return fecha_edit;
  }
}

function calcularRangoImc(imc) {
  imc = parseFloat(imc);
  // t = parseFloat(talla);
  // p = parseFloat(peso);
  // t > 10 ? t = t / 100 : false;
  // t = t * t;

  // imc = p / t;

  rango = "";
  if (imc < 18.5) {
    rango = "DELGADEZ";
  } else if (imc >= 18.5 && imc <= 24.9) {
    rango = "NORMAL";
  } else if (imc >= 25 && imc <= 29.9) {
    rango = "PACIENTE CON SOBREPESO";
  } else if (imc >= 30) {
    rango = "PACIENTE OBESO";
  }

  return rango;
}

function _EVALCARDIO(sexo, edad, diabetes, tens1, tabaco) {
  var riesgoCardioLnk = 0;
  var edad_c = 0;
  if (parseFloat(edad.substring(1, 4)) >= 70) {
    edad_c = 4;
  } else if (parseFloat(edad.substring(1, 4)) >= 60) {
    edad_c = 3;
  } else if (parseFloat(edad.substring(1, 4)) >= 50) {
    edad_c = 2;
  } else {
    edad_c = 1;
  }

  var tens1_c = 0;
  if (parseFloat(tens1 >= 180)) {
    tens1_c = 4;
  } else if (parseFloat(tens1 >= 160)) {
    tens1_c = 3;
  } else if (parseFloat(tens1 >= 140)) {
    tens1_c = 2;
  } else {
    tens1_c = 1;
  }

  if (diabetes == "S") {
    _evaluarCardioConDiabetes();
  } else {
    _evaluarCardioSinDiabetes();
  }

  console.log(tens1_c, "tens1_c", edad_c, "edad_c");
  console.log(riesgoCardioLnk, "riesgoCardioLnk");

  function _evaluarCardioConDiabetes() {
    switch (edad_c) {
      case 1:
        switch (tens1_c) {
          case 1:
            break;
          case 2:
            riesgoCardioLnk = 1;
            break;
          case 3:
            if (sexo == "M") {
              tabaco == "S" ? (riesgoCardioLnk = 3) : (riesgoCardioLnk = 1);
            } else {
              tabaco == "S" ? (riesgoCardioLnk = 4) : (riesgoCardioLnk = 2);
            }
            break;
          case 4:
            if (sexo == "M" && tabaco == "N") {
              riesgoCardioLnk = 4;
            } else {
              riesgoCardioLnk = 5;
            }
            break;
        }
        break;
      case 2:
        switch (tens1_c) {
          case 1:
            riesgoCardioLnk = 1;
            break;
          case 2:
            tabaco == "S" ? (riesgoCardioLnk = 2) : (riesgoCardioLnk = 1);
            break;
          case 3:
            tabaco == "S" ? (riesgoCardioLnk = 4) : (riesgoCardioLnk = 2);
            break;
          case 4:
            riesgoCardioLnk = 5;
            break;
        }
        break;
      case 3:
        switch (tens1_c) {
          case 1:
            sexo == "M" && tabaco == "S"
              ? (riesgoCardioLnk = 2)
              : (riesgoCardioLnk = 1);
            break;
          case 2:
            if (sexo == "M") {
              tabaco == "S" ? (riesgoCardioLnk = 3) : (riesgoCardioLnk = 2);
            } else {
              tabaco == "S" ? (riesgoCardioLnk = 2) : (riesgoCardioLnk = 1);
            }
            break;
          case 3:
            if (sexo == "M") {
              tabaco == "S" ? (riesgoCardioLnk = 5) : (riesgoCardioLnk = 3);
            } else {
              tabaco == "S" ? (riesgoCardioLnk = 4) : (riesgoCardioLnk = 2);
            }
            break;
          case 4:
            riesgoCardioLnk = 5;
            break;
        }
        break;
      case 4:
        switch (tens1) {
          case 1:
            sexo == "M" && tabaco == "S"
              ? (riesgoCardioLnk = 3)
              : (riesgoCardioLnk = 2);
            break;
          case 2:
            if (tabaco == "S") {
              riesgoCardioLnk = 3;
            } else {
              if (sexo == "M") {
                riesgoCardioLnk = 3;
              } else {
                riesgoCardioLnk = 2;
              }
            }
            break;
          case 3:
            tabaco == "S" ? (riesgoCardioLnk = 5) : (riesgoCardioLnk = 4);
            break;
          case 4:
            riesgoCardioLnk = 5;
            break;
        }
        break;
    }
  }

  function _evaluarCardioSinDiabetes() {
    switch (edad_c) {
      case 1:
        switch (tens1_c) {
          case 1:
            break;
          case 2:
            riesgoCardioLnk = 1;
            break;
          case 3:
            tabaco == "S" ? (riesgoCardioLnk = 1) : (riesgoCardioLnk = 2);
            break;
          case 4:
            if (tabaco == "S") {
              riesgoCardioLnk = 5;
            } else if (sexo == "M") {
              riesgoCardioLnk = 3;
            } else {
              riesgoCardioLnk = 4;
            }
            break;
        }
        break;
      case 2:
        switch (tens1_c) {
          case 1:
            break;
          case 2:
            riesgoCardioLnk = 1;
            break;
          case 3:
            if (sexo == "M") {
              tabaco == "S" ? (riesgoCardioLnk = 3) : (riesgoCardioLnk = 2);
            } else {
              tabaco == "S" ? (riesgoCardioLnk = 2) : (riesgoCardioLnk = 1);
            }
            break;
          case 4:
            tabaco == "S" ? (riesgoCardioLnk = 5) : (riesgoCardioLnk = 4);
            break;
        }
        break;
      case 3:
        switch (tens1_c) {
          case 1:
            riesgoCardioLnk = 2;
            break;
          case 2:
            sexo == "M" && tabaco == "S"
              ? (riesgoCardioLnk = 2)
              : (riesgoCardioLnk = 1);
            break;
          case 3:
            if (
              (sexo == "M" && tabaco == "N") ||
              (sexo == "F" && tabaco == "S")
            ) {
              riesgoCardioLnk = 2;
            } else if (sexo == "M" && tabaco == "S") {
              riesgoCardioLnk = 4;
            } else {
              riesgoCardioLnk = 1;
            }
            break;
          case 4:
            tabaco == "S" ? (riesgoCardioLnk = 5) : (riesgoCardioLnk = 4);
            break;
        }
        break;
      case 4:
        switch (tens1) {
          case 1:
            sexo == "M" && tabaco
              ? (riesgoCardioLnk = 2)
              : (riesgoCardioLnk = 1);
            break;
          case 2:
            sexo == "F" && tabaco == "N"
              ? (riesgoCardioLnk = 1)
              : (riesgoCardioLnk = 2);
            break;
          case 3:
            tabaco == "S" ? (riesgoCardioLnk = 3) : (riesgoCardioLnk = 2);
            break;
          case 4:
            tabaco == "S" ? (riesgoCardioLnk = 5) : (riesgoCardioLnk = 4);
            break;
        }
        break;
    }
  }

  console.log(riesgoCardioLnk, "riesgoCardioLnk");
  return riesgoCardioLnk;
}

function _editFecha2(fecha) {
  fecha = fecha.toString();
  var fecha_edit2 =
    fecha.substring(0, 4) +
    "/" +
    fecha.substring(4, 6) +
    "/" +
    fecha.substring(6, 8);
  return fecha_edit2;
}

function tipoEvolucion() {
  var TIPO_EVO = [
    { COD: "1", DESCRIP: "EVOLUCIÓN MÉDICA" },
    { COD: "2", DESCRIP: "NOTAS ENFERMERÍA" },
    { COD: "3", DESCRIP: "TERAPEUTAS" },
    { COD: "4", DESCRIP: "RESULTADOS COTOLOGÍA" },
    { COD: "5", DESCRIP: "APLICACIÓN MEDICAMENTOS" },
    { COD: "6", DESCRIP: "NOTA INSTRUMENTADORA" },
    { COD: "7", DESCRIP: "CONSULTA PRE-ANESTESIA" },
    { COD: "8", DESCRIP: "ANESTESIA" },
    // { 'COD': '8I', 'DESCRIP': 'EVOLUCION ANESTESIA - INICIO' },
    // { 'COD': '8M', 'DESCRIP': 'EVOLUCION ANESTESIA - MANTENIMIENTO' },
    // { 'COD': '8C', 'DESCRIP': 'EVOLUCION ANESTESIA - CIERRE' },
    { COD: "9", DESCRIP: "RESULTADOS DE PATOLOGÍA" },
    { COD: "A", DESCRIP: "FORMULARIO APACHE" },
    { COD: "B", DESCRIP: "FORMULARIO TISS" },
    { COD: "C", DESCRIP: "CONTROL DE TRANSFUSIÓN" },
    { COD: "D", DESCRIP: "BITACORA AMBULANCIAS" },
    { COD: "N", DESCRIP: "ATENCIÓN RECIÉN NACIDO" },
    { COD: "P", DESCRIP: 'FORMATO PYP1 "EVALUACIÓN Y DESARROLLO < 84 MESES"' },
  ];

  return TIPO_EVO;
}

function f8Pacientes(callbackAtras, callbackSig) {
  parametros = {
    dll: "PACIENTES",
    valoresselect: ["Nombre"],
    f8data: "PACIENTES",
    columnas: [
      {
        title: "COD",
      },
      {
        title: "NOMBRE",
      },
      {
        title: "EPS",
      },
      {
        title: "EDAD",
      },
    ],
    callback: (data) => {
      callbackSig;
    },
    cancel: () => {
      callbackAtras;
    },
  };
  F8LITE(parametros);
}

function _HC828(callback_esc, input_actual) {
  // $this.banderaHC828 = true;
  var arrayHC828 = [
    { COD: "1", DESCRIP: "NO REFIERE" },
    { COD: "2", DESCRIP: "NO HAY DATOS" },
  ];
  POPUP(
    {
      array: arrayHC828,
      titulo: "Selección",
      indices: [{ id: "COD", label: "DESCRIP" }],
      seleccion: 1,
      callback_f: () => {
        callback_esc();
      },
    },
    (data) => {
      $this.global_HC000[input_actual] = data.DESCRIP;
      _enterF3(`.${input_actual}`);
      // $this.banderaHC828 = false;
    }
  );
}

function _HC823A(callback_esc, callback, seleccion) {
  var datos = [
    { COD: "1", DESCRIP: "Hi" },
    { COD: "2", DESCRIP: "Low" },
  ];

  POPUP(
    {
      array: datos,
      titulo: "GLUCOMETRIA",
      indices: [{ id: "COD", label: "DESCRIP" }],
      seleccion: seleccion,
      callback_f: () => {
        setTimeout(() => {
          callback_esc();
        }, 300);
      },
    },
    (data) => {
      callback(data);
    }
  );
}

// AGRUPA LAS ESTRUCTURAS DE TODAS LAS IMPRESIONES EN UN SOLO PDF
async function unirPdfs_mainHc(arrayData) {
  var merger = new PDFMerger();

  for (var i in arrayData) {
    if (arrayData[i] != undefined) {
      var x = await new Buffer.from(arrayData[i]);
      await merger.add(x);
    }
  }

  var nombrePdf = `C:/PROSOFT/TEMP/${
    localStorage.Usuario + moment().format("-YYMMDD-HHmmssS")
  }.pdf`;
  await merger.save(nombrePdf);

  child(`start ${nombrePdf}`);
}

// DEVUELVE FORMATO DD-MM-YYYY
function _editFecha3(fecha) {
  fecha = fecha.toString();
  var fecha_edit3 =
    fecha.substring(6, 8) +
    "/" +
    fecha.substring(4, 6) +
    "/" +
    fecha.substring(0, 4);
  return fecha_edit3;
}

function _editHora(hora) {
  hora = hora.toString();
  var hora_edit = hora.substring(0, 2) + ":" + hora.substring(2, 4);
  return hora_edit;
}

function _AIEPI830(paso_w, edad_dias) {
  edad_dias = parseFloat(edad_dias);

  var llenar_1M = {
    titulo: "ACTIVIDADES 0 A 1 MES",
    nom_ven_1: "REFLEJO DE MORO?",
    nom_ven_2: "REFLEJO COCLEO PALPEBRAL?",
    nom_ven_3: "REFLEJO DE SUCCION?",
    nom_ven_4: "BRAZOS Y PIERNAS FLEXIONADA?",
    nom_ven_5: "MANOS CERRADAS?",
    limit_act: 5,
  };

  var llenar_2M = {
    titulo: "ACTIVIDADES 1 A 2 MESES",
    nom_ven_1: "VOCALIZA?",
    nom_ven_2: "MOVIMIENTO PIERNA ALTERNADO?",
    nom_ven_3: "SONRISA SOCIAL?",
    nom_ven_4: "SIGUE OBJETOS EN LINEA MEDI?",
    limit_act: 4,
  };

  var llenar_3M = {
    titulo: "ACTIVIDADES 0 A 3 MESES",
    nom_ven_1: "RESPONDE AL EXAMINADOR?",
    nom_ven_2: "AGARRA OBJETOS?",
    nom_ven_3: "EMITE SONIDOS?",
    nom_ven_4: "SOSTIENE LA CABEZA?",
    limit_act: 4,
  };

  var llenar_5M = {
    titulo: "ACTIVIDADES 4 A 5 MESES",
    nom_ven_1: "INTENTA ALCANZAR UN JUGUETE?",
    nom_ven_2: "LLEVA OBJETOS A LA BOCA?",
    nom_ven_3: "LOCALIZA UN SONIDO?",
    nom_ven_4: "GIRA?",
    limit_act: 4,
  };

  var llenar_8M = {
    titulo: "ACTIVIDADES 6 A 8 MESES",
    nom_ven_1: "JUEGA A TAPARSE Y DESCUBRIRSE?",
    nom_ven_2: "TRASFIERE OBJETOS ENTRE MANOS?",
    nom_ven_3: "DUPLICA SILABAS?",
    nom_ven_4: "SE SIENTA SIN APOYO?",
    limit_act: 4,
  };

  var llenar_11M = {
    titulo: "ACTIVIDADES 9 A 11 MESES",
    nom_ven_1: "IMITA GESTOS?",
    nom_ven_2: "PINZA SUPERIOR?",
    nom_ven_3: "JERGA JERIGONZA?",
    nom_ven_4: "CAMINA CON APOYO?",
    limit_act: 4,
  };

  var llenar_14M = {
    titulo: "ACTIVIDADES 12 A 14 MESES",
    nom_ven_1: "EJECUTA GESTOS A PADIDO?",
    nom_ven_2: "COLOCA CUBOS EN UN RECIPIENTE?",
    nom_ven_3: "DICE UNA PALABRA?",
    nom_ven_4: "CAMINA SIN APOYO?",
    limit_act: 4,
  };

  var llenar_17M = {
    titulo: "ACTIVIDADES 15 A 17 MESES",
    nom_ven_1: "IDENTIFICA 2 OBJETOS?",
    nom_ven_2: "GARABATEA ESPONTANEAMENTE?",
    nom_ven_3: "DICE 3 PALABRAS?",
    nom_ven_4: "CAMINA PARA ATRAS?",
    limit_act: 4,
  };

  var llenar_23M = {
    titulo: "ACTIVIDADES 18 A 23 MESES",
    nom_ven_1: "SE QUITA LA ROPA?",
    nom_ven_2: "CONSTRUYE UNA TORRE DE 3 CUBO?",
    nom_ven_3: "SEÑALA 2 FIGURAS?",
    nom_ven_4: "PATEA UNA PELOTA?",
    limit_act: 4,
  };

  var llenar_29M = {
    titulo: "ACTIVIDADES 24 A 29 MESES",
    nom_ven_1: "SE VISTE CON SUPERVISION?",
    nom_ven_2: "CONSTRUYE TORRE DE 6 CUBOS?",
    nom_ven_3: "FORMA FRASES CON 2 PALABRAS?",
    nom_ven_4: "SALTA CON AMBOS PIES?",
    limit_act: 4,
  };

  var llenar_35M = {
    titulo: "ACTIVIDADES 30 A 35 MESES",
    nom_ven_1: "DICE EL NOMBRE DE UN AMIGO?",
    nom_ven_2: "IMITA UNA LINEA VERTICALE?",
    nom_ven_3: "RECONOCE 2 ACCIONES?",
    nom_ven_4: "TIRA LA PELOTA?",
    limit_act: 4,
  };

  var llenar_41M = {
    titulo: "ACTIVIDADES 36 A 41 MESES",
    nom_ven_1: "SE PONE UN SACO?",
    nom_ven_2: "MUEVE EL PULGAR CON MANO CERRADA?",
    nom_ven_3: "COMPRENDE 2 ADJETIVOS?",
    nom_ven_4: "SE PARA EN CADA PIE POR 1 SEGUND?",
    limit_act: 4,
  };

  var llenar_47M = {
    titulo: "ACTIVIDADES 42 A 47 MESES",
    nom_ven_1: "APAREA COLORES?",
    nom_ven_2: "COPIA CIRCULOS?",
    nom_ven_3: "HABLA INTELIGIBLE?",
    nom_ven_4: "SALTA EN UN SOLO PIE?",
    limit_act: 4,
  };

  var llenar_53M = {
    titulo: "ACTIVIDADES 48 A 53 MESES",
    nom_ven_1: "SE VISTE SIN AYUDA?",
    nom_ven_2: "COPIA CRUZ?",
    nom_ven_3: "COMPRENDE 4 PREPOSICIONES?",
    nom_ven_4: "SE PARA EN CADA PIE POR 3 SEGUNDO?",
    limit_act: 4,
  };

  var llenar_59M = {
    titulo: "ACTIVIDADES 53 A 59 MESES",
    nom_ven_1: "SE CEPILLA LOS DIENTES SIN AYUD?",
    nom_ven_2: "SEÑALA LA LINEA MAS LARGA?",
    nom_ven_3: "DEFINE 5 PALABRAS?",
    nom_ven_4: "SE PARA EN UN PIE POR 5 SEGUNDO?",
    limit_act: 4,
  };

  var llenar_65M = {
    titulo: "ACTIVIDADES 60 A 65 MESES",
    nom_ven_1: "JUEGA A -HACER DE CUENTA- CON OTROS NIÑO?",
    nom_ven_2: "SEÑALA LA LINEA MAS LARGA?",
    nom_ven_3: "DEFINE 5 PALABRAS?",
    nom_ven_4: "SE PARA EN UN PIE POR 5 SEGUNDO?",
    limit_act: 4,
  };

  var llenar_72M = {
    titulo: "ACTIVIDADES 66 A 72 MESES",
    nom_ven_1: "ACEPTA Y SIGUE LAS REGLAS DE JUEGOS DE MES?",
    nom_ven_2: "COPIA UN CUADRADO?",
    nom_ven_3: "DEFINE 7 PALABRAS?",
    nom_ven_4: "SE EQUILIBRA EN CADA PIE POR 7 SEGUNDO?",
    limit_act: 4,
  };

  if (edad_dias < 31) {
    return llenar_1M;
  } else if (edad_dias < 61) {
    return llenar_2M;
  } else if (edad_dias < 119) {
    return llenar_3M;
  } else if (edad_dias < 180) {
    if (paso_w == 1) {
      return llenar_5M;
    } else {
      return llenar_3M;
    }
  } else if (edad_dias < 270) {
    if (paso_w == 1) {
      return llenar_8M;
    } else {
      return llenar_5M;
    }
  } else if (edad_dias < 365) {
    if (paso_w == 1) {
      return llenar_11M;
    } else {
      return llenar_8M;
    }
  } else if (edad_dias < 455) {
    if (paso_w == 1) {
      return llenar_14M;
    } else {
      return llenar_11M;
    }
  } else if (edad_dias < 548) {
    if (paso_w == 1) {
      return llenar_17M;
    } else {
      return llenar_14M;
    }
  } else if (edad_dias < 730) {
    if (paso_w == 1) {
      return llenar_23M;
    } else {
      return llenar_17M;
    }
  } else if (edad_dias < 913) {
    if (paso_w == 1) {
      return llenar_29M;
    } else {
      return llenar_23M;
    }
  } else if (edad_dias < 1095) {
    if (paso_w == 1) {
      return llenar_35M;
    } else {
      return llenar_23M;
    }
  } else if (edad_dias < 1277) {
    if (paso_w == 1) {
      return llenar_41M;
    } else {
      return llenar_35M;
    }
  } else if (edad_dias < 1459) {
    if (paso_w == 1) {
      return llenar_47M;
    } else {
      return llenar_35M;
    }
  } else if (edad_dias < 1642) {
    if (paso_w == 1) {
      return llenar_53M;
    } else {
      return llenar_47M;
    }
  } else if (edad_dias < 1825) {
    if (paso_w == 1) {
      return llenar_59M;
    } else {
      return llenar_53M;
    }
  } else if (edad_dias < 2007) {
    if (paso_w == 1) {
      return llenar_65M;
    } else {
      return llenar_59M;
    }
  } else {
    if (paso_w == 1) {
      return llenar_72M;
    } else {
      return llenar_65M;
    }
  }
}
