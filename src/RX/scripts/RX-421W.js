const moment = require("moment");

const convert = require("xml-js");

var array_rx421W = [];

var enfermedades_rx421w = [];
var profesionales_rx421w = [];
var macroEvoluciones_rx421w = [];

var horas_rx421w = {
  HORA_TOMA: "",
  MIN_TOMA: "",
  HORA_LECT: "",
  MIN_LECT: "",
  FECHA_CREACION: "",
  HORA_CREACION: "",
  mostrar: false,
};

function _ventanaMacroEvol_rx421w(e) {
  if ((e.type == "keydown" && e.which == 119) || e.type == "click") {
    _ventanaDatos({
      titulo: "Ventana macros",
      columnas: ["CLASE", "CODIGO", "DETALLE"],
      data: macroEvoluciones_rx421w,
      callback_esc: function () {
        $("#textarea_rx421w").focus();
      },
      callback: function (data) {
        loader("show");
        postData(
          { datosh: datosEnvio() + data.CLASE.trim() + cerosIzq(data.CODIGO.trim(), 6) + "|" },
          get_url("APP/HICLIN/HC808-02.DLL")
        )
          .then(function (llegada) {
            console.log(llegada);
            loader("hide");
            var macro = llegada.MACRO_FULL[0];
            var info = macro.CONTENIDO.replace(/\&/g, "\n").trim();
            $("#textarea_rx421w").val(info);
            $("#textarea_rx421w").focus();
          })
          .catch((err) => {
            loader("hide");
            console.error(err);
            CON851("", "ERROR TRAYENDO MACRO", null, "error", "error");
            $("#textarea_rx421w").focus();
          });
      },
    });
  }
}

function _ventanaRadiologo_rx421w(e) {
  if ((e.type == "keydown" && e.which == 119) || e.type == "click") {
    _ventanaDatos({
      titulo: "Ventana profesionales activos",
      columnas: ["IDENTIFICACION", "NOMBRE", "DESCRIPCION", "REG_MEDICO"],
      data: profesionales_rx421w,
      ancho: "70%",
      callback_esc: function () {
        $("#radiologo_rx421w").focus();
      },
      callback: function (data) {
        $("#radiologo_rx421w").val(data.IDENTIFICACION.trim());
        _enterInput("#radiologo_rx421w");
      },
    });
  }
}

function _ventanaTecnologo_rx421w(e) {
  if ((e.type == "keydown" && e.which == 119) || e.type == "click") {
    _ventanaDatos({
      titulo: "Ventana profesionales activos",
      columnas: ["IDENTIFICACION", "NOMBRE", "DESCRIPCION", "REG_MEDICO"],
      data: profesionales_rx421w,
      ancho: "70%",
      callback_esc: function () {
        $("#tecnologo_rx421w").focus();
      },
      callback: function (data) {
        $("#tecnologo_rx421w").val(data.IDENTIFICACION.trim());
        _enterInput("#tecnologo_rx421w");
      },
    });
  }
}

function _ventanaEnfermedad_rx421w(e) {
  if ((e.type == "keydown" && e.which == 119) || e.type == "click") {
    _ventanaDatos({
      titulo: "Ventana enfermedades",
      columnas: ["COD_ENF", "NOMBRE_ENF"],
      label: ["codigo", "nombre"],
      data: enfermedades_rx421w,
      callback_esc: function () {
        $("#diagPrincipal_rx421w").focus();
      },
      callback: function (data) {
        $("#diagPrincipal_rx421w").val(data.COD_ENF.trim());
        _enterInput("#diagPrincipal_rx421w");
      },
    });
  }
}
$(document).ready(function () {
  _inputControl("reset");
  _inputControl("disabled");

  if (localStorage.Modulo == "HIC") nombreOpcion("7,4 - Imprimir resultados rayos x");
  else nombreOpcion("1,1 - Actualizar resultados examen");

  _toggleF8([
    { input: "textarea", app: "rx421w", funct: _ventanaMacroEvol_rx421w },
    { input: "radiologo", app: "rx421w", funct: _ventanaRadiologo_rx421w },
    { input: "tecnologo", app: "rx421w", funct: _ventanaTecnologo_rx421w },
    { input: "diagPrincipal", app: "rx421w", funct: _ventanaEnfermedad_rx421w },
  ]);

  $("#Boton_email_rx421w").hide();
  $("#imprimir_rx421w").hide();
  $("#tarjetaHoraEcografias").hide();
  if (localStorage.Modulo == "HIC") traerRxCompleto_rx421w();
  else traerProfesionales_Rx421w();
});

function traerProfesionales_Rx421w() {
  loader("show");
  postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER819.DLL"))
    .then(function (data) {
      profesionales_rx421w = data.ARCHPROF;
      profesionales_rx421w.pop();
      for (var i in profesionales_rx421w) {
        profesionales_rx421w[i].NOMBRE = profesionales_rx421w[i].NOMBRE.replace(/\�/g, "Ñ").trim();
      }
      traerEnfermedades_Rx421w();
    })
    .catch((err) => {
      console.error(err);
      loader("hide");
      _toggleNav();
    });
}

function traerEnfermedades_Rx421w() {
  postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER851.DLL"))
    .then(function (data) {
      enfermedades_rx421w = data.ENFERMEDADES;
      enfermedades_rx421w.pop();
      for (var i in enfermedades_rx421w) {
        enfermedades_rx421w[i].NOMBRE_ENF = enfermedades_rx421w[i].NOMBRE_ENF.replace(/\�/g, "Ñ").trim();
      }
      traerMacros_rx421w1w();
    })
    .catch((err) => {
      console.error(err);
      loader("hide");
      _toggleNav();
    });
}

function traerMacros_rx421w1w() {
  postData({ datosh: datosEnvio() }, get_url("APP/HICLIN/HC808.DLL"))
    .then(function (data) {
      macroEvoluciones_rx421w = data.MACROS;
      macroEvoluciones_rx421w.pop();
      for (var i in macroEvoluciones_rx421w) {
        macroEvoluciones_rx421w[i].DETALLE = macroEvoluciones_rx421w[i].DETALLE.replace(/\�/g, "Ñ").trim();
      }
      loader("hide");
      traerRxCompleto_rx421w();
    })
    .catch((err) => {
      console.error(err);
      loader("hide");
      _toggleNav();
    });
}

function traerRxCompleto_rx421w() {
  var datos_envio =
    datosEnvio() +
    LLAVE_RXLAB_GLOBAL.NIT +
    "|" +
    LLAVE_RXLAB_GLOBAL.COMPROBANTE +
    "|" +
    LLAVE_RXLAB_GLOBAL.CUP +
    "|" +
    LLAVE_RXLAB_GLOBAL.ITEM +
    "|";

  postData({ datosh: datos_envio }, get_url("APP/RX/RX-421W.DLL"))
    .then(function (data) {
      array_rx421W = data.RESULTADOS_RX[0];

      array_rx421W["SUC"] = LLAVE_RXLAB_GLOBAL.SUC;
      array_rx421W["CL"] = LLAVE_RXLAB_GLOBAL.CL;
      array_rx421W["COMPROB"] = LLAVE_RXLAB_GLOBAL.COMPROB;
      array_rx421W["CUP"] = LLAVE_RXLAB_GLOBAL.CUP;

      array_rx421W.RESULTADO_PPAL = array_rx421W.RESULTADO_PPAL.replace(/\&/g, "\n").trim();
      array_rx421W.RESULTADO_PPAL = array_rx421W.RESULTADO_PPAL.replace(/\�/g, "ñ").trim();

      array_rx421W.ANALISIS = array_rx421W.ANALISIS.replace(/\&/g, "\n").trim();
      array_rx421W.ANALISIS = array_rx421W.ANALISIS.replace(/\�/g, "ñ").trim();

      array_rx421W.DESCRIP_PACI = array_rx421W.DESCRIP_PACI.replace(/\�/g, "Ñ").trim();
      array_rx421W.DESCRIP_CUP = array_rx421W.DESCRIP_CUP.replace(/\�/g, "Ñ").trim();

      array_rx421W.NOM_ENTIDAD = array_rx421W.NOM_ENTIDAD.replace(/\�/g, "Ñ").trim();

      $("#suc_rx421w").val(array_rx421W.SUC);
      $("#tipoComprob_rx421w").val(array_rx421W.CL);
      $("#Comprob_rx421w").val(array_rx421W.COMPROB);
      $("#cup_rx421w").val(array_rx421W.CUP);
      $("#fecha_rx421w").val(array_rx421W.FECHA);
      $("#textarea_rx421w").val(array_rx421W.RESULTADO_PPAL);
      $("#analisis_rx421w").val(array_rx421W.ANALISIS);
      $("#orden_rx421w").val(array_rx421W.ORDEN_DGH);
      $("#oid_rx421w").val(array_rx421W.OID_SOLIC_DGH);
      mostrarDatos_rx421w();
    })
    .catch((err) => {
      console.log(err);
      loader("hide");
      _toggleNav();
    });
}

function mostrarDatos_rx421w() {
  $("#descripCup_rx421w").val(array_rx421W.DESCRIP_CUP.trim());

  $("#paciente_rx421w").val(array_rx421W.ID_HISTORIA.trim());
  $("#descripPaciente_rx421w").val(array_rx421W.DESCRIP_PACI.trim());

  $("#radiologo_rx421w").val(array_rx421W.ID_RADIOLOGO.trim());

  var busquedaRad = profesionales_rx421w.find(
    (profesional) => profesional.IDENTIFICACION.trim() == array_rx421W.ID_RADIOLOGO.trim()
  );

  if (busquedaRad) {
    array_rx421W.NOM_RADIOLOGO = busquedaRad.NOMBRE.trim();
    array_rx421W.REG_RADIOLOGO = busquedaRad.REG_MEDICO;
    $("#descrip1Radiologo_rx421w").val(busquedaRad.REG_MEDICO);
    $("#descrip2Radiologo_rx421w").val(busquedaRad.NOMBRE);
  } else if (localStorage.Modulo != "HIC"){
    array_rx421W.NOM_RADIOLOGO = "";
    array_rx421W.REG_RADIOLOGO = "";
    $("#descrip2Radiologo_rx421w").val("Profesional no existe o está inactivo");
  }

  $("#tecnologo_rx421w").val(array_rx421W.ID_TECNOLOGO.trim());
  var busquedaTec = profesionales_rx421w.find(
    (profesional) => profesional.IDENTIFICACION.trim() == array_rx421W.ID_TECNOLOGO.trim()
  );

  if (busquedaTec) {
    array_rx421W.NOM_TECNOLOGO = busquedaTec.NOMBRE.trim();
    $("#descripTecnologo_rx421w").val(busquedaTec.NOMBRE);
  }

  $("#sala_rx421w").val(array_rx421W.SALA.trim());
  $("#cuenta_rx421w").val(array_rx421W.CTA_NUM);
  $("#nit_rx421w").val(array_rx421W.ID_ENTIDAD);
  $("#tipoDiag_rx421w").val(array_rx421W.TIPO_DX);

  var descrip_dx;
  switch (array_rx421W.TIPO_DX) {
    case "1":
      descrip_dx = "Impresion diagnostica";
      break;
    case "2":
      descrip_dx = "Confirmado nuevo";
      break;
    case "3":
      descrip_dx = "Confirmado repetido";
      break;
    case "9":
      descrip_dx = "No aplica";
      break;
  }

  $("#descripTipoDiag_rx421w").val(descrip_dx);

  $("#diagPrincipal_rx421w").val(array_rx421W.DX.trim());
  $("#descripDiagPrincipal_rx421w").val(array_rx421W.DESCRIP_DX);

  $("#birads_rx421w").val(array_rx421W.BIRADS);
  $("#complej_rx421w").val(array_rx421W.COMPLEJIDAD);

  switch (array_rx421W.NORMALIDAD) {
    case "0":
      $("#normal_rx421w").val("No definida");
      break;
    case "1":
      $("#normal_rx421w").val("Normal");
      break;
    case "2":
      $("#normal_rx421w").val("Anormal");
      break;
  }

  $("#actualizo_rx421w").val(array_rx421W.ADMI_MODIF);
  $("#fecha_modif_rx421w").val(array_rx421W.FECHA_MODIF + " " + array_rx421W.HORA_MODIF);

  $("#transcribio_rx421w").val(array_rx421W.ADMI_TRANS);
  $("#fecha_transc_rx421w").val(array_rx421W.FECHA_TRANS + " - " + array_rx421W.HORA_TRANSC);
  $("#email_rx421w").val(
    array_rx421W.EMAIL.trim() + "  - " + array_rx421W.FECHA_EMAIL + " - " + array_rx421W.HORA_EMAIL
  );
  $("#hl7_rx421w").val(array_rx421W.ARCHIVO_HL7.trim());

  $("#textarea_rx421w").val(array_rx421W.RESULTADO_PPAL);

  $("#imprimir_rx421w").show();
  if (parseInt($_USUA_GLOBAL[0].NIT) == 900193162) $("#Boton_email_rx421w").show();

  horas_rx421w.mostrar = [
    "881112",
    "881118",
    "881130",
    "881131",
    "881132",
    "881141",
    "881151",
    "881201",
    "881301",
    "881302",
    "881305",
    "881306",
    "881313",
    "881331",
    "881332",
    "881340",
    "881360",
    "881362",
    "881390",
    "881401",
    "881402",
    "881403",
    "881431",
    "881432",
    "881434",
    "881435",
    "881436",
    "881437",
    "881501",
    "881510",
    "881511",
    "881521",
    "881601",
    "881602",
    "881610",
    "881611",
    "881612",
    "881613",
    "881620",
    "881621",
    "881622",
    "881630",
    "881640",
    "881701",
    "881702",
    "881704",
    "882103",
    "882105",
    "882106",
    "882112",
    "882132",
    "882203",
    "882212",
    "882222",
    "882232",
    "882242",
    "882252",
    "882262",
    "882270",
    "882272",
    "876801",
    "876802",
    "882282",
    "882292",
    "882294",
    "882296",
    "882298",
    "882301",
    "882302",
    "882305",
    "882306",
    "882307",
    "882308",
    "882309",
    "877851",
    "882316",
    "882317",
    "882318",
    "882320",
    "882321",
    "882325",
    "882326",
    "882340",
    "882350",
    "882602",
    "882603",
    "882801",
    "882840",
    "851101",
    "851102",
    "382101",
    "413201",
    "401101",
    "552603",
    "061002",
    "061302",
    "332601",
    "341201",
    "502102",
    "524002",
    "559220",
    "590500",
    "751101",
    "542801",
    "542802",
    "550202",
    "592002",
    "601101",
    "652403",
    "552603",
    "751202",
    "431002",
  ].includes(array_rx421W.CUP.trim());
  // ].includes("431002");

  console.log(horas_rx421w.mostrar);

  $("#study_UID_rx421w").val(array_rx421W.STUDY_UID);

  if (horas_rx421w.mostrar) {
    horas_rx421w.HORA_TOMA = array_rx421W.HORA_TOMA.substring(0, 2).trim();
    horas_rx421w.MIN_TOMA = array_rx421W.HORA_TOMA.substring(2, 4).trim();
    horas_rx421w.HORA_LECT = array_rx421W.HORA_LECT.substring(0, 2).trim();
    horas_rx421w.MIN_LECT = array_rx421W.HORA_LECT.substring(2, 4).trim();
    $("#tarjetaHoraEcografias").show();
    $("#hrToma_rx421w").val(horas_rx421w.HORA_TOMA);
    $("#mnToma_rx421w").val(horas_rx421w.MIN_TOMA);
    $("#hrLect_rx421w").val(horas_rx421w.HORA_LECT);
    $("#mnLect_rx421w").val(horas_rx421w.MIN_LECT);
  }

  loader("hide");
  if (localStorage.Modulo == "HIC") nuevaImpresion_Rx421w("NO");
  else validarRadiologo_rx421w();
}

function salir_rx421w() {
  $("#Boton_email_rx421w").hide();
  $("#imprimir_rx421w").hide();
  _inputControl("reset");
  _inputControl("disabled");
  array_rx421W = [];
  horas_rx421w = {
    HORA_TOMA: "",
    MIN_TOMA: "",
    HORA_LECT: "",
    MIN_LECT: "",
    FECHA_CREACION: "",
    HORA_CREACION: "",
    mostrar: false,
  };
  profesionales_rx421w = [];
  enfermedades_rx421w = [];
  macroEvoluciones_rx421w = [];
  $(".page-breadcrumb")[1].remove();

  var id_historia = "";
  var regExp = /[a-zA-Z]/g;

  if (regExp.test(LLAVE_RXLAB_GLOBAL.ID_PACIENTE) && localStorage.Unidad == "S")
    id_historia = espaciosIzq(LLAVE_RXLAB_GLOBAL.ID_PACIENTE, 15);
  else id_historia = cerosIzq(LLAVE_RXLAB_GLOBAL.ID_PACIENTE, 15);
  console.log(id_historia);

  busquedaEstudios_RXLAB("PACIENTE", id_historia);
}

$("#Boton_email_rx421w").click(function () {
  set_Event_validar("#validarRadiologo_rx421w", "off");
  $("#radiologo_rx421w").attr("disabled", "true");
  nuevaImpresion_Rx421w("SI");
});

function envio_email_rx421w() {
  if (array_rx421W.EMAIL.trim().length == 0) {
    jAlert({ titulo: "Error", mensaje: "Paciente no tiene email especificado" }, validarRadiologo_rx421w());
  } else {
    let datos_envio = {
      correo_destinatario: array_rx421W.EMAIL,
      sucursal: array_rx421W.SUC,
      url_pdf: "C:\\PROSOFT\\TEMP\\" + array_rx421W.NOMBRE_PDF,
      nombre_paci: array_rx421W.DESCRIP_PACI.trim(),
    };

    postData(datos_envio, get_url("app/Inc/envio_email_rx.php"))
      .then((data) => {
        let URL = get_url("APP/RX/EMAIL.DLL");
        array_rx421W.FECHA_EMAIL = moment().format("YYYY/MM/DD");
        array_rx421W.HORA_EMAIL = moment().format("HH:mm");
        var fecha_envio = moment(array_rx421W.FECHA_EMAIL).format("YYYYMMDD");
        postData(
          { datosh: datosEnvio() + array_rx421W.LLAVE + "|" + fecha_envio + "|" + moment().format("HHmmss") + "|" },
          URL
        )
          .then(function (data) {
            console.log(data);
            loader("hide");
            $("#email_rx421w").val(
              array_rx421W.EMAIL.trim() + "  - " + array_rx421W.FECHA_EMAIL + " - " + array_rx421W.HORA_EMAIL
            );
            CON851("", "Correo enviado", null, "success", "Exitoso");
            validarRadiologo_rx421w();
          })
          .catch((err) => {
            console.log(err);
            loader("hide");
            CON851("", "Hora de correo no pudo ser guardada", null, "error", "Error");
            validarRadiologo_rx421w();
          });
      })
      .catch((err) => {
        console.log(err);
        CON851("", err, null, "error", "Error");
        loader("hide");
        validarRadiologo_rx421w();
      });
  }
}

$("#imprimir_rx421w").click(function () {
  set_Event_validar("#validarRadiologo_rx421w", "off");
  $("#radiologo_rx421w").attr("disabled", "true");
  nuevaImpresion_Rx421w("NO");
});

async function nuevaImpresion_Rx421w(email) {
  array_rx421W["NOMBRE_PDF"] = "RX-" + array_rx421W.LLAVE.substring(10, 19) + moment().format("HHmmss") + ".pdf";
  console.log(array_rx421W);

  await _impresion2({
    tipo: "pdf",
    archivo: array_rx421W.NOMBRE_PDF,
    content: imprimirEstandar_RX(array_rx421W),
  })
    .then((data) => {
      CON851("", "PDF generado", null, "success", "Correcto");
      var ruta = "C:\\PROSOFT\\MASIVO\\ENVIO_CORREO\\" + array_rx421W.NOMBRE_PDF;

      if (email == "SI") {
        envio_email_rx421w();
      } else {
        loader("hide");
        if (localStorage.Modulo == "HIC") salir_rx421w();
        else validarRadiologo_rx421w();
      }
    })
    .catch((err) => {
      console.log(err, "error");
      CON851("", "Error generando PDF", null, "error", "Error");
      loader("hide");
      validarRadiologo_rx421w();
    });
}

function Impresion_RX_421w(email) {
  loader("show");
  var RX421W = new Object();
  RX421W.FECHA_FACTRX = array_rx421W.FECHA.replace(/\//g, " ");
  RX421W.USU = $_USUA_GLOBAL[0].NOMBRE;
  RX421W.COMPROBANTE = array_rx421W.LLAVE.substring(13, 19);
  RX421W.SUCURSAL = array_rx421W.LLAVE.substring(10, 12);
  RX421W.NIT = $_USUA_GLOBAL[0].NIT;
  RX421W.HTMLRESULTADOPPAL = array_rx421W.RESULTADO_PPAL.replace(/\n/g, "&");
  RX421W.DESCRIP_PACIRX = array_rx421W.DESCRIP_PACI;
  RX421W.IDHIS_FACTRX = array_rx421W.ID_HISTORIA;
  RX421W.EDAD_RX = array_rx421W.EDAD;
  RX421W.SEXO_RX = array_rx421W.SEXO;
  RX421W.DESCRIP1_CUPRX = array_rx421W.DESCRIP_CUP;
  RX421W.IDRADIOLOGO_RX = array_rx421W.ID_RADIOLOGO;
  RX421W.NOMMEDICO_RX = array_rx421W.NOM_RADIOLOGO;
  RX421W.DESCRIP_TER = array_rx421W.NOM_ENTIDAD;
  RX421W.REGMED_RX = array_rx421W.REG_RADIOLOGO;
  array_rx421W.NOMBREPDF = "RX-" + array_rx421W.LLAVE.substring(10, 19) + moment().format("HHmmss");

  let pdf;
  if (email == "SI") {
    pdf = "pdf_masivo";
  } else {
    pdf = "pdf";
  }

  opcinesImpresion_RX421W = {
    datos: RX421W,
    tipo: pdf,
    formato: "rx/RXI02A.html",
    nombre: array_rx421W.NOMBREPDF + ".pdf",
    modulo: "RX",
  };
  imprimir(opcinesImpresion_RX421W, () => {
    if (email == "SI") {
      envio_email_rx421w();
    } else {
      loader("hide");
      validarRadiologo_rx421w();
    }
  });
}

function validarRadiologo_rx421w() {
  validarInputs(
    {
      form: "#validarRadiologo_rx421w",
      orden: "1",
      event_f3: () => {
        set_Event_validar("#validarRadiologo_rx421w", "off");
        $("#radiologo_rx421w").attr("disabled", "true");
        nuevaImpresion_Rx421w("NO");
      },
      event_f5: () => {
        if (parseInt($_USUA_GLOBAL[0].NIT) == 900193162) {
          set_Event_validar("#validarRadiologo_rx421w", "off");
          $("#radiologo_rx421w").attr("disabled", "true");
          nuevaImpresion_Rx421w("SI");
        }
      },
    },
    () => CON851P("03", validarRadiologo_rx421w, salir_rx421w),
    function () {
      array_rx421W.ID_RADIOLOGO = $("#radiologo_rx421w").val().trim();

      var busquedaRad = profesionales_rx421w.find(
        (profesional) => profesional.IDENTIFICACION.trim() == array_rx421W.ID_RADIOLOGO
      );

      if (busquedaRad) {
        $("#descrip1Radiologo_rx421w").val(busquedaRad.REG_MEDICO);
        $("#descrip2Radiologo_rx421w").val(busquedaRad.NOMBRE);
        array_rx421W.REG_RADIOLOGO = busquedaRad.REG_MEDICO;
        array_rx421W.NOM_RADIOLOGO = busquedaRad.NOMBRE;
        $("#Boton_email_rx421w").hide();
        $("#imprimir_rx421w").hide();
        validarTecnologo_rx421w();
      } else {
        $("#descrip1Radiologo_rx421w").val("");
        $("#descrip2Radiologo_rx421w").val("Profesional no existe o está inactivo");
        CON851("01", "01", null, "error", "error");
        validarRadiologo_rx421w();
      }
    }
  );
}

function validarTecnologo_rx421w() {
  validarInputs(
    {
      form: "#validarTecnologo_rx421w",
      orden: "1",
    },
    function () {
      $("#imprimir_rx421w").show();
      if (parseInt($_USUA_GLOBAL[0].NIT) == 900193162) $("#Boton_email_rx421w").show();
      validarRadiologo_rx421w();
    },
    function () {
      array_rx421W.ID_TECNOLOGO = $("#tecnologo_rx421w").val().trim();

      if (array_rx421W.ID_TECNOLOGO.length != "") {
        var busquedaTec = profesionales_rx421w.find(
          (profesional) => profesional.IDENTIFICACION.trim() == array_rx421W.ID_TECNOLOGO
        );

        if (busquedaTec) {
          $("#descripTecnologo_rx421w").val(busquedaTec.NOMBRE);
          array_rx421W.NOM_TECNOLOGO = busquedaTec.NOMBRE;
          validarTextarea_rx421w();
        } else {
          CON851("01", "01", null, "error", "error");
          $("#descripTecnologo_rx421w").val("Profesional no existe o está inactivo");
          validarTecnologo_rx421w();
        }
      } else {
        validarTextarea_rx421w();
      }
    }
  );
}

function validarTextarea_rx421w() {
  validarInputs(
    {
      form: "#validartextarea_rx421w",
      orden: "1",
    },
    function () {
      validarTecnologo_rx421w();
    },
    function () {
      array_rx421W.RESULTADO_PPAL = $("#textarea_rx421w").val().trim();

      array_rx421W.RESULTADO_PPAL = array_rx421W.RESULTADO_PPAL.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, " ");

      array_rx421W.RESULTADO_PPAL = array_rx421W.RESULTADO_PPAL.replace(/(\r\n|\n|\r)/gm, "&");

      validarAnalisis_rx421w();
    }
  );
}

function validarAnalisis_rx421w() {
  validarInputs(
    {
      form: "#validarAnalisis_rx421w",
      orden: "1",
    },
    () => validarTextarea_rx421w(),
    () => {
      array_rx421W.ANALISIS = $("#analisis_rx421w").val().trim();

      array_rx421W.ANALISIS = array_rx421W.ANALISIS.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, " ");

      array_rx421W.ANALISIS = array_rx421W.ANALISIS.replace(/(\r\n|\n|\r)/gm, "&");

      if (horas_rx421w.mostrar) validarHoraToma_rx421w();
      else validarTipoDiag_rx421w();
    }
  );
}

function validarHoraToma_rx421w() {
  validarInputs(
    {
      form: "#validarHoraToma_rx421w",
      orden: "1",
    },
    () => validarAnalisis_rx421w(),
    () => {
      horas_rx421w.HORA_TOMA = cerosIzq($("#hrToma_rx421w").val().trim(), 2);
      $("#hrToma_rx421w").val(horas_rx421w.HORA_TOMA);

      if (parseInt(horas_rx421w.HORA_TOMA) > 24 || parseInt(horas_rx421w.HORA_TOMA) < 1) {
        CON851("", "Hora fuera de rango", null, "error", "error");
        validarHoraToma_rx421w();
      } else {
        validarMinutoToma_rx421w();
      }
    }
  );
}

function validarMinutoToma_rx421w() {
  validarInputs(
    {
      form: "#validarMinToma_rx421w",
      orden: "1",
    },
    () => validarHoraToma_rx421w(),
    () => {
      horas_rx421w.MIN_TOMA = cerosIzq($("#mnToma_rx421w").val().trim(), 2);
      $("#mnToma_rx421w").val(horas_rx421w.MIN_TOMA);

      if (parseInt(horas_rx421w.MIN_TOMA) > 59 || parseInt(horas_rx421w.MIN_TOMA) < 0) {
        CON851("", "Minuto fuera de rango", null, "error", "error");
        validarMinutoToma_rx421w();
      } else {
        array_rx421W.HORA_TOMA = horas_rx421w.HORA_TOMA + horas_rx421w.MIN_TOMA;

        if (parseInt($_USUA_GLOBAL[0].NIT) != 900193162 && array_rx421W.HORA_LECT.trim() == "") {
          $("#hrLect_rx421w").val(horas_rx421w.HORA_TOMA);
          $("#mnLect_rx421w").val(horas_rx421w.MIN_TOMA);
        }
        validarHoraLectura_rx421w();
      }
    }
  );
}

function validarHoraLectura_rx421w() {
  validarInputs(
    {
      form: "#validarHoraLect_rx421w",
      orden: "1",
    },
    () => validarMinutoToma_rx421w(),
    () => {
      horas_rx421w.HORA_LECT = cerosIzq($("#hrLect_rx421w").val().trim(), 2);
      $("#hrLect_rx421w").val(horas_rx421w.HORA_LECT);

      if (parseInt(horas_rx421w.HORA_LECT) > 24 || parseInt(horas_rx421w.HORA_LECT) < 1) {
        CON851("", "Hora fuera de rango", null, "error", "error");
        validarHoraLectura_rx421w();
      } else {
        validarMinutoLect_rx421w();
      }
    }
  );
}

function validarMinutoLect_rx421w() {
  validarInputs(
    {
      form: "#validarMinLect_rx421w",
      orden: "1",
    },
    () => validarHoraLectura_rx421w(),
    () => {
      horas_rx421w.MIN_LECT = cerosIzq($("#mnLect_rx421w").val().trim(), 2);
      $("#mnLect_rx421w").val(horas_rx421w.MIN_LECT);

      if (parseInt(horas_rx421w.MIN_LECT) > 59 || parseInt(horas_rx421w.MIN_LECT) < 0) {
        CON851("", "Minuto fuera de rango", null, "error", "error");
        validarMinutoLect_rx421w();
      } else {
        array_rx421W.HORA_LECT = horas_rx421w.HORA_LECT + horas_rx421w.MIN_LECT;
        validarTipoDiag_rx421w();
      }
    }
  );
}

function validarTipoDiag_rx421w() {
  var arrayTipoDiag_rx_421w = [
    { COD: "1", DESCRIP: "Impresion diagnostica" },
    { COD: "2", DESCRIP: "Confirmado nuevo" },
    { COD: "3", DESCRIP: "Confirmado repetido" },
    { COD: "9", DESCRIP: "No aplica" },
  ];

  POPUP(
    {
      array: arrayTipoDiag_rx_421w,
      titulo: "Tipo de diagnostico",
      indices: [{ id: "COD", label: "DESCRIP" }],
      seleccion: array_rx421W.TIPO_DX,
      callback_f: () => {
        if (horas_rx421w.mostrar) validarMinutoLect_rx421w();
        else validarAnalisis_rx421w();
      },
    },
    function (data) {
      array_rx421W.TIPO_DX = data.COD;
      $("#tipoDiag_rx421w").val(data.COD);
      $("#descripTipoDiag_rx421w").val(data.DESCRIP);
      validarDiagPrin_rx421w();
    }
  );
}

function validarDiagPrin_rx421w() {
  validarInputs(
    {
      form: "#validarDiagPrincipal_rx421w",
      orden: "1",
    },
    validarTipoDiag_rx421w,
    function () {
      if ($("#diagPrincipal_rx421w").val().trim() == "") {
        array_rx421W.DX = "";
        array_rx421W.DESCRIP_DX = "No seleccionado";
        $("#descripDiagPrincipal_rx421w").val(array_rx421W.DESCRIP_DX);
        validarBirads_rx421w();
      } else {
        array_rx421W.DX = cerosIzq($("#diagPrincipal_rx421w").val(), 4);

        var busquedaEnfer = enfermedades_rx421w.find((enfermedad) => enfermedad.COD_ENF == array_rx421W.DX);

        if (busquedaEnfer) {
          $("#descripDiagPrincipal_rx421w").val(busquedaEnfer.NOMBRE_ENF);
          array_rx421W.DESCRIP_DX = busquedaEnfer.NOMBRE_ENF;
          validarBirads_rx421w();
        } else {
          $("#descripDiagPrincipal_rx421w").val("Enfermedad no existe");
          CON851("01", "01", null, "error", "error");
          validarDiagPrin_rx421w();
        }
      }
    }
  );
}

function validarBirads_rx421w() {
  validarInputs(
    {
      form: "#validarBirads_rx421w",
      orden: "1",
    },
    validarDiagPrin_rx421w,
    function () {
      array_rx421W.BIRADS = $("#birads_rx421w").val().trim();

      if (array_rx421W.BIRADS == "" && parseInt($_USUA_GLOBAL[0].NIT) != 900193162) {
        validarComplejidad_Rx421w();
      } else {
        switch (array_rx421W.BIRADS) {
          case "0":
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
            validarComplejidad_Rx421w();
            break;
          default:
            CON851("01", "01", null, "error", "error");
            validarBirads_rx421w();
            break;
        }
      }
    }
  );
}

function validarComplejidad_Rx421w() {
  validarInputs(
    {
      form: "#validarComplejidad_Rx421w",
      orden: "1",
    },
    validarBirads_rx421w,
    function () {
      array_rx421W.COMPLEJIDAD = $("#complej_rx421w").val();

      switch (array_rx421W.COMPLEJIDAD) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
          CON851P("01", validarComplejidad_Rx421w, _grabardatos_rx421w);
          break;
        default:
          CON851("01", "01", null, "error", "error");
          validarComplejidad_Rx421w();
          break;
      }
    }
  );
}

function _grabardatos_rx421w() {
  loader("show");

  horas_rx421w.FECHA_CREACION = moment().format("YYYYMMDD");
  horas_rx421w.HORA_CREACION = moment().format("HHmmss");

  var datos_envio_rx421w = datosEnvio();
  datos_envio_rx421w += array_rx421W.LLAVE;
  datos_envio_rx421w += "|";
  datos_envio_rx421w += cerosIzq(array_rx421W.ID_RADIOLOGO, 10);
  datos_envio_rx421w += "|";
  datos_envio_rx421w += array_rx421W.REG_RADIOLOGO;
  datos_envio_rx421w += "|";
  datos_envio_rx421w += array_rx421W.NOM_RADIOLOGO;
  datos_envio_rx421w += "|";
  datos_envio_rx421w += cerosIzq(array_rx421W.ID_TECNOLOGO, 10);
  datos_envio_rx421w += "|";
  datos_envio_rx421w += array_rx421W.NOM_TECNOLOGO;
  datos_envio_rx421w += "|";
  datos_envio_rx421w += array_rx421W.TIPO_DX;
  datos_envio_rx421w += "|";
  datos_envio_rx421w += array_rx421W.DX;
  datos_envio_rx421w += "|";
  datos_envio_rx421w += array_rx421W.DESCRIP_DX;
  datos_envio_rx421w += "|";
  datos_envio_rx421w += array_rx421W.BIRADS;
  datos_envio_rx421w += "|";
  datos_envio_rx421w += array_rx421W.COMPLEJIDAD;
  datos_envio_rx421w += "|";
  datos_envio_rx421w += horas_rx421w.FECHA_CREACION;
  datos_envio_rx421w += "|";
  datos_envio_rx421w += horas_rx421w.HORA_CREACION;
  datos_envio_rx421w += "|";
  datos_envio_rx421w += localStorage.Usuario;
  datos_envio_rx421w += "|";
  datos_envio_rx421w += array_rx421W.HORA_TOMA;
  datos_envio_rx421w += "|";
  datos_envio_rx421w += array_rx421W.HORA_LECT;
  datos_envio_rx421w += "|";

  var data = {};
  data["datosh"] = datos_envio_rx421w;

  var posicion = 0;
  var contadorLin = 0;
  var contadorTotal = 0;
  var linea = "";
  var maximo = 90;

  array_rx421W.RESULTADO_PPAL.split("").forEach(function (item, i) {
    contadorTotal = i + 1;
    contadorLin = contadorLin + 1;

    switch (item) {
      case "á":
      case "é":
      case "í":
      case "ó":
      case "ú":
      case "Á":
      case "É":
      case "Í":
      case "Ó":
      case "Ú":
      case "ñ":
      case "Ñ":
      case "!":
      case '"':
      case "#":
      case "$":
      case "%":
      case "/":
      case "(":
      case ")":
      case "=":
      case "?":
      case "*":
      case "+":
      case "-":
      case "@":
      case ">":
      case "<":
        maximo = maximo + 1;
        break;
    }
    linea += item;

    if (contadorLin == maximo || array_rx421W.RESULTADO_PPAL.length == contadorTotal) {
      posicion = posicion + 1;

      data["LIN-" + posicion.toString().padStart(3, "0")] = linea;
      contadorLin = 0;
      linea = "";
      maximo = 90;
    }
  });

  var ANALISIS = array_rx421W.ANALISIS.enterReplace().strToTable("ANALISIS");
  for (indice in ANALISIS) data[indice] = ANALISIS[indice];

  console.log(data, "enviar datos");
  postData(data, get_url("APP/RX/RX-421W-02.DLL"))
    .then((llegada) => {
      console.log(llegada);
      CON851("", "Modificado correctamente", null, "success", "Correcto");

      // if (parseInt($_USUA_GLOBAL[0].NIT) == 900193162) {
      //   if (llegada == "ENVIAR XML") {
      //     CON851("", "Enviando xml ...", null, "success", "Correcto");
      //     consultarDGHX_rx421w();
      //   } else {
      //     loader("hide");
      //     if (llegada == "CONFLICTO DE ESTADO")
      //       CON851("", "Conflicto de estado en orden !", null, "warning", "Advertencia");
      //     terminar_rx421w();
      //   }
      // } else {
        loader("hide");
        terminar_rx421w();
      // }
    })
    .catch((err) => {
      console.error(err);
      loader("hide");
      validarComplejidad_Rx421w();
    });
}

function consultarDGHX_rx421w() {
  postData({ datosh: datosEnvio() + array_rx421W.ORDEN_DGH.trim() + "|" }, get_url("APP/RX/DGHX-02.DLL"))
    .then(function (data) {
      loader("hide");
      var orden = data.ORDEN[0];
      console.log(orden);
      enviarXML_rx421w(orden);
    })
    .catch((err) => {
      console.error(err);
      loader("hide");
      console.error("NO SE TRAJO ORDEN");
      CON851("", "Error consultando orden !", null, "warning", "Advertencia");
      CON851("", "XML no fue enviado !", null, "warning", "Advertencia");
      terminar_rx421w();
    });
}

function enviarXML_rx421w(orden) {
  var xml = `<?xml version="1.0" encoding="UTF-8"?><HCCLServicioResultados xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><Resultados><HCCLServicioResultadoExamen><IDOrigen></IDOrigen><OIDSolicitud></OIDSolicitud><FechaRealizacion></FechaRealizacion><FechaResultado></FechaResultado><CodigoMedico></CodigoMedico><NombreMedico></NombreMedico><CodigoServicio></CodigoServicio><NombreServicio></NombreServicio><Cantidad></Cantidad><Resultado></Resultado><Analisis></Analisis><StudyInstanceUID></StudyInstanceUID><URLImagenExterna></URLImagenExterna></HCCLServicioResultadoExamen></Resultados></HCCLServicioResultados>`;

  var xmlString = convert.xml2json(xml, { compact: true, spaces: 4 });
  let xmlArray = JSON.parse(xmlString);

  xmlArray.HCCLServicioResultados.Resultados.HCCLServicioResultadoExamen.Analisis = array_rx421W.ANALISIS;

  let examen = false;

  orden.TABLA.forEach((item) => {
    if (item.CUP_FACT == LLAVE_RXLAB_GLOBAL.CUP.trim()) {
      if (item.ESTADO == "1") {
        examen = item;
      } else {
        CON851("", "Estado examen en orden no coincide !", null, "warning", "Advertencia");
      }
    }
  });

  if (examen) {
    let registro = xmlArray.HCCLServicioResultados.Resultados.HCCLServicioResultadoExamen;

    registro.Cantidad = examen.CANT.trim();
    registro.CodigoMedico = array_rx421W.ID_RADIOLOGO.trim();
    registro.CodigoServicio = examen.CUP_FACT.trim();
    registro.FechaRealizacion = moment(horas_rx421w.FECHA_CREACION).format("YYYY-MM-DD") +  'T' + moment(horas_rx421w.HORA_CREACION, 'HHmmss').format('HH:mm:ss')
    registro.FechaResultado = moment(horas_rx421w.FECHA_CREACION).format("YYYY-MM-DD") +  'T' + moment(horas_rx421w.HORA_CREACION, 'HHmmss').format('HH:mm:ss')
    registro.IDOrigen = orden.TIPO.substring(0, 1);
    registro.NombreMedico = array_rx421W.NOM_RADIOLOGO.trim();
    registro.NombreServicio = array_rx421W.DESCRIP_CUP.trim()
    registro.OIDSolicitud = examen.OID_SOLIC.trim()
    registro.Resultado = array_rx421W.RESULTADO_PPAL.replace(/\&/g, "\n").trim()
    registro.StudyInstanceUID = array_rx421W.STUDY_UID.trim()
    registro.URLImagenExterna = `http://190.254.16.165:4080/oviyam2/viewer.html?patientID=${array_rx421W.ID_PACI_RAW}&studyUID=${array_rx421W.STUDY_UID}&serverName=UTMPACSWADO`

    xmlArray.HCCLServicioResultados.Resultados.HCCLServicioResultadoExamen = registro;

    var xml_Final = convert.js2xml(xmlArray, { compact: true, spaces: 4 });

    console.log(xml_Final);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/xml");

    fetch("", {
      method: "POST",
      body: xml_Final,
      headers: myHeaders
    })
    .then(res => {
      console.log(res)
    })

  } else {
    CON851("", "CUPS no encontrado en orden !", null, "warning", "Advertencia");
  }
  terminar_rx421w();
}

function terminar_rx421w() {
  _inputControl("reset");
  _inputControl("disabled");
  array_rx421W = [];
  horas_rx421w = {
    HORA_TOMA: "",
    MIN_TOMA: "",
    HORA_LECT: "",
    MIN_LECT: "",
    FECHA_CREACION: "",
    HORA_CREACION: "",
    mostrar: false,
  };
  traerRxCompleto_rx421w();
}
