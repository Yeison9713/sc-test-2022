var global_lab106 = [];
let control_LAB106 = false;

var Maskpeso_lab106 = IMask.createMask({
  mask: Number,
  radix: ".",
  padFractionalZeros: true,
  signed: false,
  scale: 1,
  min: 000,
  max: 999.9,
});
var MaskSC_lab106 = IMask.createMask({
  mask: Number,
  radix: ".",
  padFractionalZeros: true,
  signed: true,
  scale: 2,
  min: 0.01,
  max: 9.99,
});

$(document).ready(function () {
  _inputControl("reset");
  _inputControl("disabled");

  if (localStorage.Modulo == "HIC") {
    nombreOpcion("7,3 - Consultar resultados lab");
  } else {
    nombreOpcion("4,2 - Consultar resultados Ecocardiograma stress");
  }

  $("#imprimir_lab106").hide();
  $("#salir_lab106").hide();

  traerLABCompleto_lab106();
});

function traerLABCompleto_lab106() {
  var datos_envio =
    datosEnvio() + LLAVE_RXLAB_GLOBAL.COMPROBANTE + "|" + LLAVE_RXLAB_GLOBAL.CUP + "|" + LLAVE_RXLAB_GLOBAL.ITEM + "|";
  let URL = get_url("APP/LAB/LAB102.DLL");
  postData({ datosh: datos_envio }, URL)
    .then(function (data) {
      global_lab106 = data.RESULTADOS_LAB[0];
      console.log(global_lab106);

      global_lab106["SUC"] = LLAVE_RXLAB_GLOBAL.SUC;
      global_lab106["CL"] = LLAVE_RXLAB_GLOBAL.CL;
      global_lab106["COMPROB"] = LLAVE_RXLAB_GLOBAL.COMPROB;
      global_lab106["CUP"] = LLAVE_RXLAB_GLOBAL.CUP;
      global_lab106["ID_PACI"] = LLAVE_RXLAB_GLOBAL.ID_PACIENTE;

      global_lab106.EKG_REPOSO = global_lab106.EKG_REPOSO.replace(/\&/g, "+").trim();
      global_lab106.EKG = global_lab106.EKG.replace(/\&/g, "+").trim();

      global_lab106.CONCLUSIONES = global_lab106.CONCLUSIONES.replace(/\&/g, "\n").trim();
      global_lab106.MEDICACION = global_lab106.MEDICACION.replace(/\&/g, "\n").trim();
      global_lab106.SINTOMAS = global_lab106.SINTOMAS.replace(/\&/g, "\n").trim();
      global_lab106.MEDIDAS = global_lab106.MEDIDAS.replace(/\&/g, "\n").trim();
      global_lab106.ECOCARDIOGRAMA = global_lab106.ECOCARDIOGRAMA.replace(/\&/g, "\n").trim();
      global_lab106.ECOCARDIOGRAMA_TT = global_lab106.ECOCARDIOGRAMA_TT.replace(/\&/g, "\n").trim();

      global_lab106.DESCRIP_PACI = global_lab106.DESCRIP_PACI.replace(/\�/g, "Ñ").trim();
      global_lab106.DESCRIP_CUP = global_lab106.DESCRIP_CUP.replace(/\�/g, "Ñ").trim();

      $("#suc_lab106").val(global_lab106.SUC);
      $("#tipoComprob_lab106").val(global_lab106.CL);
      $("#Comprob_lab106").val(global_lab106.COMPROB);
      $("#cup_lab106").val(global_lab106.CUP);
      $("#fecha_lab106").val(global_lab106.FECHA);
      mostrarDatos_lab106();
    })
    .catch((err) => {
      CON851("", err, null, "error", "Error");
      loader("hide");
      _toggleNav();
    });
}

function mostrarDatos_lab106() {
  // if (global_lab106.REGISTRO_ESCRITO == ' ') {
  //     if (localStorage.Modulo == 'HIC') {
  //         jAlert(
  //             { titulo: 'ADVERTENCIA!', mensaje: 'Registro no se ha llenado!, Ingrese por modulo laboratorios opcion 2' },
  //             salir_lab106
  //         )
  //     } else {
  //         jAlert(
  //             { titulo: 'ADVERTENCIA!', mensaje: 'Registro no se ha llenado!, Ingrese por la opcion 2' },
  //             salir_lab106
  //         )
  //     }
  // } else {

  switch (global_lab106.METODO) {
    case "1":
      filaDobu_lab106.innerHTML = "Dobutamina";
      filaDobu2_lab106.innerHTML = "Basal";
      filaDobu3_lab106.innerHTML = "5";
      filaDobu4_lab106.innerHTML = "10";
      filaDobu5_lab106.innerHTML = "20";
      filaDobu6_lab106.innerHTML = "30";
      filaDobu7_lab106.innerHTML = "40";
      columnaAtro_lab106.innerHTML = "";
      columnaAnor_lab106.innerHTML = "";
      break;
    case "2":
      filaDobu_lab106.innerHTML = "Ejercicio";
      filaDobu2_lab106.innerHTML = "Etapa";
      filaDobu3_lab106.innerHTML = "I";
      filaDobu4_lab106.innerHTML = "II";
      filaDobu5_lab106.innerHTML = "III";
      filaDobu6_lab106.innerHTML = "IV";
      filaDobu7_lab106.innerHTML = "V";
      columnaAtro_lab106.innerHTML = "";
      columnaAnor_lab106.innerHTML = "";
      break;
  }

  $("#descripCup_lab106").val(global_lab106.DESCRIP_CUP.trim());

  $("#paciente_lab106").val(global_lab106.ID_HISTORIA.trim());
  $("#descripPaciente_lab106").val(global_lab106.DESCRIP_PACI.trim());

  $("#bacteriologo_lab106").val(global_lab106.ID_MEDICO.trim());
  $("#descrip1Bacteriologo_lab106").val(global_lab106.REG_MEDICO.trim());
  $("#descrip2Bacteriologo_lab106").val(global_lab106.NOMBRE_MEDICO.trim());

  $("#factura_lab106").val(global_lab106.CTA.trim());
  $("#entidad_lab106").val(global_lab106.ID_ENTIDAD);
  $("#descripEntidad_lab106").val(global_lab106.NOM_ENTIDAD.trim());

  $("#creacion_lab106").val(global_lab106.ADMI_CREA);
  $("#fecha_creacion_lab106").val(global_lab106.FECHA_CREA + " - " + global_lab106.HORA_CREA);

  // $('#modifico_lab106').val(global_lab106.ADMI_MODIF)
  // $('#fecha_modif_lab106').val(global_lab106.FECHA_MODIF + ' ' + global_lab106.HORA_MODIF)

  $("#edad_lab106").val(global_lab106.EDAD);
  if (global_lab106.PESO != "      ") $("#peso_lab106").val(global_lab106.PESO + " KG");

  if (global_lab106.TALLA != "   ") $("#talla_lab106").val(global_lab106.TALLA + " CM");

  $("#referido_lab106").val(global_lab106.REFERIDO.trim());
  $("#descripReferido_lab106").val(global_lab106.DESCRIP_REFERIDO.trim());

  $("#diagnostico_lab106").val(global_lab106.DIAGNOS.trim());
  $("#descripDiagnos_lab106").val(global_lab106.DESCRIP_DIAGNOS.trim());

  $("#medicacion_lab106").val(global_lab106.MEDICACION);

  $("#medidas_lab106").val(global_lab106.MEDIDAS);

  $("#ekgReposo_lab106").val(global_lab106.EKG_REPOSO.trim());

  $("#ecocardiogramaReposo_lab106").val(global_lab106.ECOCARDIOGRAMA_TT);

  if (global_lab106.FCM != "   ") $("#FCM_lab106").val(global_lab106.FCM + " /m");
  if (global_lab106.FCSM != "   ") $("#FCSM_lab106").val(global_lab106.FCSM + " /m");
  if (global_lab106.SC != "    ") $("#SC_lab106").val(global_lab106.SC + " /m²");

  $("#sintomas_lab106").val(global_lab106.SINTOMAS);

  $("#ecocardiograma_lab106").val(global_lab106.ECOCARDIOGRAMA);
  $("#ekg_lab106").val(global_lab106.EKG.trim());

  $("#conclusiones_lab106").val(global_lab106.CONCLUSIONES);

  for (var i in global_lab106.TABLA_DOBU) {
    var indicador = parseInt(i) + 1;

    $("#FC" + indicador + "_lab106").val(global_lab106.TABLA_DOBU[i].FC.trim());
    $("#TA_SIS" + indicador + "_lab106").val(global_lab106.TABLA_DOBU[i].TA_SIS.trim());
    $("#TA_DIAS" + indicador + "_lab106").val(global_lab106.TABLA_DOBU[i].TA_DIAS.trim());
    $("#Atropina" + indicador + "_lab106").val(global_lab106.TABLA_DOBU[i].ATROPINA.trim());
    $("#Anormalidad" + indicador + "_lab106").val(global_lab106.TABLA_DOBU[i].ANORMALIDAD.trim());
  }

  for (var i in global_lab106.BASAL) {
    var indicador = parseInt(i) + 1;
    if (global_lab106.BASAL[i] == "0") global_lab106.BASAL[i] = "1";

    $("#basal_" + indicador + "_lab106").val(global_lab106.BASAL[i]);
  }

  for (var i in global_lab106.MEDIO) {
    var indicador = parseInt(i) + 1;
    if (global_lab106.MEDIO[i] == "0") global_lab106.MEDIO[i] = "1";

    $("#medio_" + indicador + "_lab106").val(global_lab106.MEDIO[i]);
  }

  for (var i in global_lab106.APICAL) {
    var indicador = parseInt(i) + 1;
    if (global_lab106.APICAL[i] == "0") global_lab106.APICAL[i] = "1";

    $("#apical_" + indicador + "_lab106").val(global_lab106.APICAL[i]);
  }

  for (var i in global_lab106.APEX) {
    var indicador = parseInt(i) + 1;
    if (global_lab106.APEX[i] == "0") global_lab106.APEX[i] = "1";

    $("#APEX" + indicador + "_lab106").val(global_lab106.APEX[i]);
  }
  loader("hide");
  $("#imprimir_lab106").show();
  $("#salir_lab106").show();
  // }
}

function salir_lab106() {
  $("#imprimir_lab106").hide();
  $("#salir_lab106").hide();
  _inputControl("reset");
  _inputControl("disabled");
  global_lab106 = [];
  let Window = BrowserWindow.getAllWindows();
  if (Window.length == 1) {
    $(".page-breadcrumb")[1].remove();
  }
  ventanaEstudios_RXLAB();
}

$("#imprimir_lab106").click(function () {
  Impresion_lab106();
});

$("#salir_lab106").click(function () {
  salir_lab106();
});

async function Impresion_lab106() {
  loader("show");

  if (parseInt(LLAVE_RXLAB_GLOBAL.ITEM) > 1) {
    var item = cerosIzq(LLAVE_RXLAB_GLOBAL.ITEM, 2);
    global_lab106.NOMBREPDF = "LAB-" + global_lab106.LLAVE.substring(0, 9) + "-" + item;
  } else {
    global_lab106.NOMBREPDF = "LAB-" + global_lab106.LLAVE.substring(0, 9);
  }

  await _impresion2({
    tipo: "pdf",
    archivo: global_lab106.NOMBREPDF + ".pdf",
    content: _imprimirLab103(global_lab106),
  })
    .then((data) => {
      loader("hide");
    })
    .catch((err) => {
      console.log(err, "error");
      loader("hide");
    });
}
