var global_lab103 = [];
var enfermedades_lab103 = [];
var especialidades_lab103 = [];
var profesionales_lab103 = [];

var Maskpeso_lab103 = IMask.createMask({
  mask: Number,
  radix: ".",
  padFractionalZeros: true,
  signed: false,
  scale: 1,
  min: 000,
  max: 999.9,
});
var MaskSC_lab103 = IMask.createMask({
  mask: Number,
  radix: ".",
  padFractionalZeros: true,
  signed: true,
  scale: 2,
  min: 0.01,
  max: 9.99,
});

function _ventanaBacteriologo_lab103(e) {
  if ((e.type == "keydown" && e.which == 119) || e.type == "click") {
    _ventanaDatos({
      titulo: "Ventana profesionales activos",
      columnas: ["IDENTIFICACION", "NOMBRE", "DESCRIPCION", "REG_MEDICO"],
      data: profesionales_lab103,
      ancho: "70%",
      callback_esc: function () {
        $("#bacteriologo_lab103").focus();
      },
      callback: function (data) {
        $("#bacteriologo_lab103").val(data.IDENTIFICACION.trim());
        _enterInput("#bacteriologo_lab103");
      },
    });
  }
}

function _ventanaEspecialidad_lab103(e) {
  if ((e.type == "keydown" && e.which == 119) || e.type == "click") {
    _ventanaDatos({
      titulo: "Ventana especialidades",
      columnas: ["CODIGO", "NOMBRE"],
      data: especialidades_lab103,
      callback_esc: function () {
        $("#referido_lab103").focus();
      },
      callback: function (data) {
        $("#referido_lab103").val(data.CODIGO.trim());
        _enterInput("#referido_lab103");
      },
    });
  }
}

function _ventanaEnfermedad_lab103(e) {
  if ((e.type == "keydown" && e.which == 119) || e.type == "click") {
    _ventanaDatos({
      titulo: "Ventana enfermedades",
      columnas: ["COD_ENF", "NOMBRE_ENF"],
      label: ["codigo", "nombre"],
      data: enfermedades_lab103,
      callback_esc: function () {
        $("#diagnostico_lab103").focus();
      },
      callback: function (data) {
        $("#diagnostico_lab103").val(data.COD_ENF.trim());
        _enterInput("#diagnostico_lab103");
      },
    });
  }
}

$(document).ready(function () {
  _inputControl("reset");
  _inputControl("disabled");

  nombreOpcion("2,2 - Actualizar resultados Ecocardiograma stress");

  _toggleF8([
    { input: "bacteriologo", app: "lab103", funct: _ventanaBacteriologo_lab103 },
    { input: "referido", app: "lab103", funct: _ventanaEspecialidad_lab103 },
    { input: "diagnostico", app: "lab103", funct: _ventanaEnfermedad_lab103 },
  ]);

  $("#imprimir_lab103").hide();

  loader("hide");
  traerProfesionales_lab103();
});

function traerProfesionales_lab103() {
  loader("show");
  let URL = get_url("APP/SALUD/SER819.DLL");
  postData({ datosh: datosEnvio() }, URL)
    .then(function (data) {
      profesionales_lab103 = data.ARCHPROF;
      profesionales_lab103.pop();
      for (var i in profesionales_lab103) {
        profesionales_lab103[i].NOMBRE = profesionales_lab103[i].NOMBRE.replace(/\�/g, "Ñ").trim();
      }
      traerEnfermedades_lab103();
    })
    .catch((err) => {
      console.error(err);
      loader("hide");
      _toggleNav();
    });
}

function traerEnfermedades_lab103() {
  let URL = get_url("APP/SALUD/SER851.DLL");
  postData({ datosh: datosEnvio() }, URL)
    .then(function (data) {
      enfermedades_lab103 = data.ENFERMEDADES;
      enfermedades_lab103.pop();
      for (var i in enfermedades_lab103) {
        enfermedades_lab103[i].NOMBRE_ENF = enfermedades_lab103[i].NOMBRE_ENF.replace(/\�/g, "Ñ").trim();
      }
      traerEspecialidades_lab103();
    })
    .catch((err) => {
      console.error(err);
      loader("hide");
      _toggleNav();
    });
}

function traerEspecialidades_lab103() {
  let URL = get_url("APP/SALUD/SER855.DLL");
  postData({ datosh: datosEnvio() }, URL)
    .then(function (data) {
      especialidades_lab103 = data.ESPECIALIDADES;
      especialidades_lab103.pop();
      for (var i in especialidades_lab103) {
        especialidades_lab103[i].NOMBRE = especialidades_lab103[i].NOMBRE.replace(/\�/g, "Ñ").toUpperCase().trim();
      }
      traerLABCompleto_lab103();
    })
    .catch((err) => {
      console.error(err);
      loader("hide");
      _toggleNav();
    });
}

function traerLABCompleto_lab103() {
  console.log("llega a traerLab");
  var datos_envio =
    datosEnvio() + LLAVE_RXLAB_GLOBAL.COMPROBANTE + "|" + LLAVE_RXLAB_GLOBAL.CUP + "|" + LLAVE_RXLAB_GLOBAL.ITEM + "|";
  let URL = get_url("APP/LAB/LAB102.DLL");
  postData({ datosh: datos_envio }, URL)
    .then(function (data) {
      console.log("pasa a traerLab");
      global_lab103 = data.RESULTADOS_LAB[0];
      console.log(global_lab103);

      global_lab103["SUC"] = LLAVE_RXLAB_GLOBAL.SUC;
      global_lab103["CL"] = LLAVE_RXLAB_GLOBAL.CL;
      global_lab103["COMPROB"] = LLAVE_RXLAB_GLOBAL.COMPROB;
      global_lab103["CUP"] = LLAVE_RXLAB_GLOBAL.CUP;
      global_lab103["ID_PACI"] = LLAVE_RXLAB_GLOBAL.ID_PACIENTE;
      global_lab103["NOMBREPDF"] = "";

      global_lab103.EKG_REPOSO = global_lab103.EKG_REPOSO.replace(/\&/g, "+").trim();
      global_lab103.EKG = global_lab103.EKG.replace(/\&/g, "+").trim();

      global_lab103.CONCLUSIONES = global_lab103.CONCLUSIONES.replace(/\&/g, "\n").trim();
      global_lab103.MEDICACION = global_lab103.MEDICACION.replace(/\&/g, "\n").trim();
      global_lab103.SINTOMAS = global_lab103.SINTOMAS.replace(/\&/g, "\n").trim();

      var texto_VentIzq =
        "Ventrículo izquierdo:\nCavidad de tamaño y forma normal, contractilidad global y segmentaria conservada. Espesor normal de sus paredes para superficie corporal, sin obstrucción a nivel medio ventricular, ni a través del tracto de salida. FEVI 60 por ciento. El patrón de llenado del ventrículo izquierdo es normal\n\n";
      var texto_VentDer =
        "Ventrículo derecho:\nCavidad de tamaño normal, con adecuada contractilidad de la pared libre, diámetro medial cm\n\n";
      var texto_AurIzq =
        "Aurícula izquierda:\nCavidad de tamaño y forma normal, no masas ni trombos en su interior. Área de cm²\n\n";
      var texto_AurDer =
        "Aurícula derecha:\nCavidad de tamaño y forma normal, no masas ni trombos en su interior. Área de cm²\n\n";
      var texto_ValvAur =
        "Válvula aórtica:\nNo insuficiencia, adecuada apertura y cierre. No hay gradiente significativo\n\n";
      var texto_ValvMitral =
        "Válvula mitral:\nNo insuficiencia, adecuada apertura y cierre. No hay gradiente significativo\n\n";
      var texto_ValvTricus =
        "Válvula tricuspidea:\nMediante el registro Doppler color y continuo, se observó insuficiencia Tricuspidea ligera, a través de la cual se calculó una Presión Sistólica de Arteria Pulmonar de 23 mmHg\n\n";
      var texto_Septum_vent = "Septum interventricular:\nIntegro\n\n";
      var texto_Septum_aur = "Septum interauricular:\nIntegro\n\n";
      var texto_raizAort = "Aorta ascendente raíz aórtica:\nDe aspecto y diámetro normal\n\n";
      var texto_venaCava = "Vena cava inferior:\nAdecuado colapso inspiratorio\n\n";
      var texto_VenaPulm = "Venas pulmonares:\nSe observan 3 drenando a aurícula izquierda\n\n";
      var texto_ValvPulm = "Válvula pulmonar:\nNo insuficiencia, adecuada apertura";

      var textoTotal =
        texto_VentIzq +
        texto_VentDer +
        texto_AurIzq +
        texto_AurDer +
        texto_ValvAur +
        texto_ValvMitral +
        texto_ValvTricus +
        texto_Septum_vent +
        texto_Septum_aur +
        texto_raizAort +
        texto_venaCava +
        texto_VenaPulm +
        texto_ValvPulm;

      if (global_lab103.MEDIDAS.trim() == "") {
        global_lab103.MEDIDAS =
          "Raíz Aortica:\nAurícula izquierda:  \nVentrículo izquierdo es diástole:  \nVentrículo izquierdo es sístole:  \nSeptum IV:  \nPared posterior:  \nVentrículo derecho:  \nFracción de Eyección:";
      } else {
        global_lab103.MEDIDAS = global_lab103.MEDIDAS.replace(/\&/g, "\n").trim();
      }

      if (global_lab103.ECOCARDIOGRAMA.trim() == "") {
        global_lab103.ECOCARDIOGRAMA = textoTotal;
      } else {
        global_lab103.ECOCARDIOGRAMA = global_lab103.ECOCARDIOGRAMA.replace(/\&/g, "\n").trim();
      }

      if (global_lab103.ECOCARDIOGRAMA_TT.trim() == "") {
        global_lab103.ECOCARDIOGRAMA_TT = textoTotal;
      } else {
        global_lab103.ECOCARDIOGRAMA_TT = global_lab103.ECOCARDIOGRAMA_TT.replace(/\&/g, "\n").trim();
      }

      global_lab103.DESCRIP_PACI = global_lab103.DESCRIP_PACI.replace(/\�/g, "Ñ").trim();
      global_lab103.DESCRIP_CUP = global_lab103.DESCRIP_CUP.replace(/\�/g, "Ñ").trim();

      $("#suc_lab103").val(global_lab103.SUC);
      $("#tipoComprob_lab103").val(global_lab103.CL);
      $("#Comprob_lab103").val(global_lab103.COMPROB);
      $("#cup_lab103").val(global_lab103.CUP);
      $("#fecha_lab103").val(global_lab103.FECHA);

      // if (global_lab103.REGISTRO_ESCRITO == 'S') {
      //     if (localStorage.Usuario == 'GEBC') {
      //         mostrarDatos_lab103()
      //     } else {
      //         loader('hide')
      //         jAlert(
      //             { titulo: 'ADVERTENCIA!', mensaje: 'Registro no se puede modificar!, para consultar ingrese a la opción 5' },
      //             salir_lab103
      //         )
      //     }
      // } else {
      verificarMetodo_lab103();
      // }
    })
    .catch((err) => {
      console.log(err, "err");
      CON851("", err, null, "error", "Error");
      loader("hide");
      _toggleNav();
    });
}

function verificarMetodo_lab103() {
  if (global_lab103.CUP == "881210") seleccionMetodo_lab103();
  else {
    if (global_lab103.CUP == "88121001") global_lab103.METODO = "1";
    else if (global_lab103.CUP == "88121002") global_lab103.METODO = "2";
    mostrarDatos_lab103();
  }
}

function seleccionMetodo_lab103() {
  metodos = [
    { COD: "1", DESCRIP: "CON DOBUTAMINA" },
    { COD: "2", DESCRIP: "CON EJERCICIO" },
  ];
  loader("hide");
  setTimeout(() => {
    POPUP(
      {
        titulo: "Seleccione método",
        indices: [{ id: "COD", label: "DESCRIP" }],
        array: metodos,
        callback_f: () => CON851P("03", seleccionMetodo_lab103, salir_lab103),
        seleccion: global_lab103.METODO,
        teclaAlterna: true,
      },
      (data) => {
        global_lab103.METODO = data.COD;
        mostrarDatos_lab103();
      }
    );
  }, 300);
}

function mostrarDatos_lab103() {
  switch (global_lab103.METODO) {
    case "1":
      filaDobu_lab103.innerHTML = "Dobutamina";
      filaDobu2_lab103.innerHTML = "Basal";
      filaDobu3_lab103.innerHTML = "5";
      filaDobu4_lab103.innerHTML = "10";
      filaDobu5_lab103.innerHTML = "20";
      filaDobu6_lab103.innerHTML = "30";
      filaDobu7_lab103.innerHTML = "40";
      columnaAtro_lab103.innerHTML = "";
      columnaAnor_lab103.innerHTML = "";
      break;
    case "2":
      filaDobu_lab103.innerHTML = "Ejercicio";
      filaDobu2_lab103.innerHTML = "Etapa";
      filaDobu3_lab103.innerHTML = "I";
      filaDobu4_lab103.innerHTML = "II";
      filaDobu5_lab103.innerHTML = "III";
      filaDobu6_lab103.innerHTML = "IV";
      filaDobu7_lab103.innerHTML = "V";
      columnaAtro_lab103.innerHTML = "";
      columnaAnor_lab103.innerHTML = "";
      break;
  }

  $("#descripCup_lab103").val(global_lab103.DESCRIP_CUP.trim());

  $("#paciente_lab103").val(global_lab103.ID_HISTORIA.trim());
  $("#descripPaciente_lab103").val(global_lab103.DESCRIP_PACI.trim());

  $("#bacteriologo_lab103").val(global_lab103.ID_MEDICO.trim());

  var busquedabBac = profesionales_lab103.find(
    (profesional) => profesional.IDENTIFICACION.trim() == global_lab103.ID_MEDICO.trim()
  );

  if (busquedabBac) {
    $("#descrip1Bacteriologo_lab103").val(busquedabBac.REG_MEDICO);
    $("#descrip2Bacteriologo_lab103").val(busquedabBac.NOMBRE);
  } else {
    $("#descrip2Bacteriologo_lab103").val("Profesional no existe o está inactivo");
  }

  $("#factura_lab103").val(global_lab103.CTA.trim());
  $("#entidad_lab103").val(global_lab103.ID_ENTIDAD);
  $("#descripEntidad_lab103").val(global_lab103.NOM_ENTIDAD.trim());

  $("#creacion_lab103").val(global_lab103.ADMI_CREA);
  $("#fecha_creacion_lab103").val(global_lab103.FECHA_CREA + " - " + global_lab103.HORA_CREA);

  // $('#modifico_lab103').val(global_lab103.ADMI_MODIF)
  // $('#fecha_modif_lab103').val(global_lab103.FECHA_MODIF + ' ' + global_lab103.HORA_MODIF)

  $("#edad_lab103").val(global_lab103.EDAD);
  if (global_lab103.PESO != "      ") $("#peso_lab103").val(global_lab103.PESO + " KG");

  if (global_lab103.TALLA != "   ") $("#talla_lab103").val(global_lab103.TALLA + " CM");

  $("#referido_lab103").val(global_lab103.REFERIDO.trim());

  var busquedaEspec = especialidades_lab103.find((data) => data.CODIGO == cerosIzq(global_lab103.REFERIDO.trim(), 3));

  if (busquedaEspec) {
    global_lab103.DESCRIP_REFERIDO = busquedaEspec.NOMBRE.trim();
    $("#descripReferido_lab103").val(global_lab103.DESCRIP_REFERIDO);
  } else {
    $("#descripReferido_lab103").val("Especialidad no existe");
  }

  $("#diagnostico_lab103").val(global_lab103.DIAGNOS.trim());

  var busquedabEnfer = enfermedades_lab103.find((data) => data.COD_ENF == cerosIzq(global_lab103.DIAGNOS, 4));

  if (busquedabEnfer) {
    global_lab103.DESCRIP_DIAGNOS = busquedabEnfer.NOMBRE_ENF.trim();
    $("#descripDiagnos_lab103").val(global_lab103.DESCRIP_DIAGNOS);
  } else {
    $("#descripDiagnos_lab103").val("Enfermedad no existe");
  }

  $("#medicacion_lab103").val(global_lab103.MEDICACION);

  $("#medidas_lab103").val(global_lab103.MEDIDAS);

  $("#ekgReposo_lab103").val(global_lab103.EKG_REPOSO.trim());

  $("#ecocardiogramaReposo_lab103").val(global_lab103.ECOCARDIOGRAMA_TT);

  // if (array_rx43.ESTATURA_USUAL != '  0') $('#estatUsu_rx43').val(array_rx43.ESTATURA_USUAL + ' CM')

  // if (array_rx43.ESTATURA_ACTUAL != '  0') $('#estatAct_rx43').val(array_rx43.ESTATURA_ACTUAL + ' CM')

  // if (array_rx43.PESO != '   .0') $('#peso_rx43').val(array_rx43.PESO + ' KG')

  if (global_lab103.FCM != "   ") $("#FCM_lab103").val(global_lab103.FCM + " /m");
  if (global_lab103.FCSM != "   ") $("#FCSM_lab103").val(global_lab103.FCSM + " /m");
  if (global_lab103.SC != "    ") $("#SC_lab103").val(global_lab103.SC + " /m²");

  $("#sintomas_lab103").val(global_lab103.SINTOMAS);

  $("#ecocardiograma_lab103").val(global_lab103.ECOCARDIOGRAMA);
  $("#ekg_lab103").val(global_lab103.EKG.trim());

  $("#conclusiones_lab103").val(global_lab103.CONCLUSIONES);

  for (var i in global_lab103.TABLA_DOBU) {
    var indicador = parseInt(i) + 1;

    $("#FC" + indicador + "_lab103").val(global_lab103.TABLA_DOBU[i].FC.trim());
    $("#TA_SIS" + indicador + "_lab103").val(global_lab103.TABLA_DOBU[i].TA_SIS.trim());
    $("#TA_DIAS" + indicador + "_lab103").val(global_lab103.TABLA_DOBU[i].TA_DIAS.trim());
    $("#Atropina" + indicador + "_lab103").val(global_lab103.TABLA_DOBU[i].ATROPINA.trim());
    $("#Anormalidad" + indicador + "_lab103").val(global_lab103.TABLA_DOBU[i].ANORMALIDAD.trim());
  }

  for (var i in global_lab103.BASAL) {
    var indicador = parseInt(i) + 1;
    if (global_lab103.BASAL[i] == "0") global_lab103.BASAL[i] = "1";

    $("#basal_" + indicador + "_lab103").val(global_lab103.BASAL[i]);
  }

  for (var i in global_lab103.MEDIO) {
    var indicador = parseInt(i) + 1;
    if (global_lab103.MEDIO[i] == "0") global_lab103.MEDIO[i] = "1";

    $("#medio_" + indicador + "_lab103").val(global_lab103.MEDIO[i]);
  }

  for (var i in global_lab103.APICAL) {
    var indicador = parseInt(i) + 1;
    if (global_lab103.APICAL[i] == "0") global_lab103.APICAL[i] = "1";

    $("#apical_" + indicador + "_lab103").val(global_lab103.APICAL[i]);
  }

  for (var i in global_lab103.APEX) {
    var indicador = parseInt(i) + 1;
    if (global_lab103.APEX[i] == "0") global_lab103.APEX[i] = "1";

    $("#APEX" + indicador + "_lab103").val(global_lab103.APEX[i]);
  }

  $("#imprimir_lab103").show();

  loader("hide");
  validarBacteriologo_lab103();
}

function salir_lab103() {
  $("#imprimir_lab103").hide();
  _inputControl("reset");
  _inputControl("disabled");
  global_lab103 = [];
  enfermedades_lab103 = [];
  especialidades_lab103 = [];
  profesionales_lab103 = [];
  $(".page-breadcrumb")[1].remove();
  global_lab103.METODO = false
  busquedaEstudios_RXLAB("PACIENTE", LLAVE_RXLAB_GLOBAL.ID_PACIENTE);
}

async function Impresion_lab103(email) {
  loader("show");

  if (parseInt(LLAVE_RXLAB_GLOBAL.ITEM) > 1) {
    var item = cerosIzq(LLAVE_RXLAB_GLOBAL.ITEM, 2);
    global_lab103.NOMBREPDF = "LAB-" + global_lab103.LLAVE.substring(0, 9) + "-" + item;
  } else {
    global_lab103.NOMBREPDF = "LAB-" + global_lab103.LLAVE.substring(0, 9);
  }

  let pdf;
  if (email == "SI") {
    pdf = "pdf_masivo";
  } else {
    pdf = "pdf";
  }

  await postData({ datosh: datosEnvio() + LLAVE_RXLAB_GLOBAL.COMPROBANTE + "|" + LLAVE_RXLAB_GLOBAL.CUP + "|" + LLAVE_RXLAB_GLOBAL.ITEM + '|' }, get_url("APP/LAB/LAB102.DLL"))
    .then(async function(data) {
      data_resultado = data.RESULTADOS_LAB[0];
      await _impresion2({
        tipo: "pdf",
        archivo: global_lab103.NOMBREPDF + ".pdf",
        content: _imprimirLab103(data_resultado),
      })
        .then((data) => {
          if (email == "SI") {
            envio_email_lab103();
          } else {
            loader("hide");
            salir_lab103();
          }
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
        });
    })
    .catch((error) => {
      loader("hide");
      console.error(error);
      CON851("", "Error en impresion", null, "error", "Error");
    })
}

function validarBacteriologo_lab103() {
  validarInputs(
    {
      form: "#validarBacteriologo_lab103",
      orden: "1",
    },
    () => {
        if (global_lab103.CUP == "881210") seleccionMetodo_lab103();
        else CON851P("03", validarBacteriologo_lab103, salir_lab103);
    },
    function () {
      global_lab103.ID_MEDICO = $("#bacteriologo_lab103").val().trim();

      var busquedaBac = profesionales_lab103.find(
        (profesional) => profesional.IDENTIFICACION.trim() == global_lab103.ID_MEDICO
      );

      if (busquedaBac) {
        var ati;
        var esp;

        switch (busquedaBac.ATIENDE_PROF.trim()) {
          case "1":
          case "5":
            ati = true;
            break;
          default:
            ati = false;
            break;
        }
        ati = true;

        switch (busquedaBac.TAB_ESPEC[0].COD.trim()) {
          case "701":
          case "732":
          case "710":
          case "360":
          case "602":
          case "781":
          case "387":
          case "120":
          case "122":
          case "302":
            esp = true;
            break;
          default:
            esp = false;
            break;
        }

        if (ati && esp) {
          global_lab103.ID_MEDICO = cerosIzq(global_lab103.ID_MEDICO, 10);
          $("#descrip1Bacteriologo_lab103").val(busquedaBac.REG_MEDICO);
          $("#descrip2Bacteriologo_lab103").val(busquedaBac.NOMBRE);
          $("#imprimir_lab103").hide();
          $("#peso_lab103").val(global_lab103.PESO.trim());
          validarPeso_lab103();
        } else {
          CON851("9X", "9X", null, "error", "error");
          validarBacteriologo_lab103();
        }
      } else {
        $("#descrip1Radiologo_lab103").val("");
        $("#descrip2Radiologo_lab103").val("Profesional no existe o está inactivo");
        CON851("01", "01", null, "error", "error");
        validarBacteriologo_lab103();
      }
    }
  );
}

function validarPeso_lab103() {
  validarInputs(
    {
      form: "#validarPeso_lab103",
      orden: "1",
    },
    () => {
      $("#imprimir_lab103").show();
      $("#peso_lab103").val(global_lab103.PESO.trim() + " KG");
      validarBacteriologo_lab103();
    },
    function () {
      global_lab103.PESO = Maskpeso_lab103.resolve($("#peso_lab103").val());

      $("#peso_lab103").val(global_lab103.PESO.trim() + " KG");
      $("#talla_lab103").val(global_lab103.TALLA.trim());

      validarTalla_lab103();
    }
  );
}

function validarTalla_lab103() {
  validarInputs(
    {
      form: "#validarTalla_lab103",
      orden: "1",
    },
    () => {
      $("#peso_lab103").val(global_lab103.PESO.trim());
      $("#talla_lab103").val(global_lab103.TALLA.trim() + " CM");
      validarPeso_lab103();
    },
    () => {
      global_lab103.TALLA = cerosIzq($("#talla_lab103").val(), 3);
      $("#talla_lab103").val(global_lab103.TALLA.trim() + " CM");

      validarEspecialidad_lab103();
    }
  );
}

function validarEspecialidad_lab103() {
  validarInputs(
    {
      form: "#validarReferido_lab103",
      orden: "1",
    },
    () => {
      $("#talla_lab103").val(global_lab103.TALLA.trim());
      validarTalla_lab103();
    },
    function () {
      global_lab103.REFERIDO = cerosIzq($("#referido_lab103").val(), 3);

      var busquedaEspec = especialidades_lab103.find((data) => data.CODIGO == global_lab103.REFERIDO);

      if (busquedaEspec) {
        global_lab103.DESCRIP_REFERIDO = busquedaEspec.NOMBRE.trim();
        $("#descripReferido_lab103").val(global_lab103.DESCRIP_REFERIDO);
        validarDiagnos_lab103();
      } else {
        $("#descripReferido_lab103").val("Especialidad no existe");
        CON851("01", "01", null, "error", "error");
        validarEspecialidad_lab103();
      }
    }
  );
}

function validarDiagnos_lab103() {
  validarInputs(
    {
      form: "#validarDiagnostico_lab103",
      orden: "1",
    },
    () => validarEspecialidad_lab103(),
    function () {
      global_lab103.DIAGNOS = cerosIzq($("#diagnostico_lab103").val(), 4);

      var busquedaEnfer = enfermedades_lab103.find((enfermedad) => enfermedad.COD_ENF == global_lab103.DIAGNOS);

      if (busquedaEnfer) {
        global_lab103.DESCRIP_DIAGNOS = busquedaEnfer.NOMBRE_ENF.trim();
        $("#descripDiagnos_lab103").val(global_lab103.DESCRIP_DIAGNOS);
        validarMedicacion_lab103();
      } else {
        $("#descripDiagnos_lab103").val("Enfermedad no existe");
        CON851("01", "01", null, "error", "error");
        validarDiagnos_lab103();
      }
    }
  );
}

function validarMedicacion_lab103() {
  validarInputs(
    {
      form: "#validarMedicacion_lab103",
      orden: "1",
      event_f4: () => validarConclusiones_lab103(1),
    },
    () => validarDiagnos_lab103(),
    () => {
      global_lab103.MEDICACION = $("#medicacion_lab103").val().trim();

      global_lab103.MEDICACION = global_lab103.MEDICACION.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, " ");

      $("#medicacion_lab103").val(global_lab103.MEDICACION);

      validarMedidas_lab103();
    }
  );
}

function validarMedidas_lab103() {
  validarInputs(
    {
      form: "#validarMedidas_lab103",
      orden: "1",
      event_f4: () => validarConclusiones_lab103(2),
    },
    () => validarMedicacion_lab103(),
    () => {
      global_lab103.MEDIDAS = $("#medidas_lab103").val().trim();

      global_lab103.MEDIDAS = global_lab103.MEDIDAS.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, " ");
      $("#medidas_lab103").val(global_lab103.MEDIDAS);

      validarEkgReposo_lab103();
    }
  );
}

function validarEkgReposo_lab103() {
  validarInputs(
    {
      form: "#validarEkgReposo_lab103",
      orden: "1",
      event_f4: () => validarConclusiones_lab103(3),
    },
    () => validarMedidas_lab103(),
    () => {
      global_lab103.EKG_REPOSO = espaciosDer($("#ekgReposo_lab103").val(), 70);

      global_lab103.EKG_REPOSO = global_lab103.EKG_REPOSO.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, " ");

      global_lab103.EKG_REPOSO = global_lab103.EKG_REPOSO.replace(/\+/g, "&");

      validarEcocardiogramaTT_lab103();
    }
  );
}

function validarEcocardiogramaTT_lab103() {
  validarInputs(
    {
      form: "#validarEcocar_reposo_lab103",
      orden: "1",
      event_f4: () => validarConclusiones_lab103(4),
    },
    () => validarEkgReposo_lab103(),
    () => {
      global_lab103.ECOCARDIOGRAMA_TT = $("#ecocardiogramaReposo_lab103").val().trim();

      global_lab103.ECOCARDIOGRAMA_TT = global_lab103.ECOCARDIOGRAMA_TT.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, " ");
      $("#ecocardiogramaReposo_lab103").val(global_lab103.ECOCARDIOGRAMA_TT);

      $("#FCM_lab103").val(global_lab103.FCM.trim());
      validarFCM_lab103();
    }
  );
}

function validarFCM_lab103() {
  validarInputs(
    {
      form: "#validarFCM_lab103",
      orden: "1",
      event_f4: () => validarConclusiones_lab103(5),
    },
    () => {
      $("#FCM_lab103").val(global_lab103.FCM + " /m");
      validarEcocardiogramaTT_lab103();
    },
    () => {
      global_lab103.FCM = cerosIzq($("#FCM_lab103").val(), 3);

      $("#FCM_lab103").val(global_lab103.FCM + " /m");
      $("#FCSM_lab103").val(global_lab103.FCSM.trim());
      validarFCSM_lab103();
    }
  );
}

function validarFCSM_lab103() {
  validarInputs(
    {
      form: "#validarFCSM_lab103",
      orden: "1",
      event_f4: () => validarConclusiones_lab103(6),
    },
    () => {
      $("#FCSM_lab103").val(global_lab103.FCSM + " /m");
      $("#FCM_lab103").val(global_lab103.FCM.trim());
      validarFCM_lab103();
    },
    () => {
      global_lab103.FCSM = cerosIzq($("#FCSM_lab103").val(), 3);

      $("#FCSM_lab103").val(global_lab103.FCSM + " /m");
      $("#SC_lab103").val(global_lab103.SC);
      validarSC_lab103();
    }
  );
}

function validarSC_lab103() {
  validarInputs(
    {
      form: "#validarSC_lab103",
      orden: "1",
      event_f4: () => validarConclusiones_lab103(7),
    },
    () => {
      $("#SC_lab103").val(global_lab103.SC + " /m²");
      $("#FCSM_lab103").val(global_lab103.FCSM);
      validarFCSM_lab103();
    },
    () => {
      global_lab103.SC = MaskSC_lab103.resolve($("#SC_lab103").val());

      $("#SC_lab103").val(global_lab103.SC + " /m²");

      validarFC_lab103(1);
    }
  );
}

function validarFC_lab103(a) {
  validarInputs(
    {
      form: "#validarFC" + a + "_lab103",
      orden: "1",
      event_f3: () => validarTabBasal_lab103(1),
      event_f4: () => validarConclusiones_lab103(8, a),
      event_flecha_arriba: () => {
        if (a != 1) {
          this.validarFC_lab103(parseInt(a) - 1);
        } else {
          this.validarFC_lab103(a);
        }
      },
      event_flecha_abajo: () => {
        if (a != 6) {
          this.validarFC_lab103(parseInt(a) + 1);
        } else {
          this.validarFC_lab103(a);
        }
      },
    },
    () => {
      if (a == 1) {
        $("#SC_lab103").val(global_lab103.SC);
        validarSC_lab103();
      } else {
        validarANORMALIDAD_lab103(parseInt(a) - 1);
      }
    },
    () => {
      var indicador = parseInt(a) - 1;

      global_lab103.TABLA_DOBU[indicador].FC = cerosIzq($("#FC" + a + "_lab103").val(), 3);

      validarTA_Sis_lab103(a);
    }
  );
}

function validarTA_Sis_lab103(a) {
  validarInputs(
    {
      form: "#validarTASIS" + a + "_lab103",
      orden: "1",
      event_f3: () => validarTabBasal_lab103(1),
      event_f4: () => validarConclusiones_lab103(9, a),
      event_flecha_arriba: () => {
        if (a != 1) {
          this.validarTA_Sis_lab103(parseInt(a) - 1);
        } else {
          this.validarTA_Sis_lab103(a);
        }
      },
      event_flecha_abajo: () => {
        if (a != 6) {
          this.validarTA_Sis_lab103(parseInt(a) + 1);
        } else {
          this.validarTA_Sis_lab103(a);
        }
      },
    },
    () => validarFC_lab103(a),
    () => {
      var indicador = parseInt(a) - 1;

      global_lab103.TABLA_DOBU[indicador].TA_SIS = cerosIzq($("#TA_SIS" + a + "_lab103").val(), 3);

      validarTA_Dias_lab103(a);
    }
  );
}

function validarTA_Dias_lab103(a) {
  validarInputs(
    {
      form: "#validarTADIAS" + a + "_lab103",
      orden: "1",
      event_f3: () => validarTabBasal_lab103(1),
      event_f4: () => validarConclusiones_lab103(10, a),
      event_flecha_arriba: () => {
        if (a != 1) {
          this.validarTA_Dias_lab103(parseInt(a) - 1);
        } else {
          this.validarTA_Dias_lab103(a);
        }
      },
      event_flecha_abajo: () => {
        if (a != 6) {
          this.validarTA_Dias_lab103(parseInt(a) + 1);
        } else {
          this.validarTA_Dias_lab103(a);
        }
      },
    },
    () => validarTA_Sis_lab103(a),
    () => {
      var indicador = parseInt(a) - 1;

      global_lab103.TABLA_DOBU[indicador].TA_DIAS = cerosIzq($("#TA_DIAS" + a + "_lab103").val(), 3);

      validarATROPINA_lab103(a);
    }
  );
}

function validarATROPINA_lab103(a) {
  validarInputs(
    {
      form: "#validarAtropina" + a + "_lab103",
      orden: "1",
      event_f3: () => validarTabBasal_lab103(1),
      event_f4: () => validarConclusiones_lab103(11, a),
      event_flecha_arriba: () => {
        if (a != 1) {
          this.validarATROPINA_lab103(parseInt(a) - 1);
        } else {
          this.validarATROPINA_lab103(a);
        }
      },
      event_flecha_abajo: () => {
        if (a != 6) {
          this.validarATROPINA_lab103(parseInt(a) + 1);
        } else {
          this.validarATROPINA_lab103(a);
        }
      },
    },
    () => validarTA_Dias_lab103(a),
    () => {
      var indicador = parseInt(a) - 1;

      global_lab103.TABLA_DOBU[indicador].ATROPINA = espaciosDer($("#Atropina" + a + "_lab103").val(), 5);

      validarANORMALIDAD_lab103(a);
    }
  );
}

function validarANORMALIDAD_lab103(a) {
  validarInputs(
    {
      form: "#validarAnormalidad" + a + "_lab103",
      orden: "1",
      event_f3: () => validarTabBasal_lab103(1),
      event_f4: () => validarConclusiones_lab103(12, a),
      event_flecha_arriba: () => {
        if (a != 1) {
          this.validarANORMALIDAD_lab103(parseInt(a) - 1);
        } else {
          this.validarANORMALIDAD_lab103(a);
        }
      },
      event_flecha_abajo: () => {
        if (a != 6) {
          this.validarANORMALIDAD_lab103(parseInt(a) + 1);
        } else {
          this.validarANORMALIDAD_lab103(a);
        }
      },
    },
    () => validarATROPINA_lab103(a),
    () => {
      var indicador = parseInt(a) - 1;

      global_lab103.TABLA_DOBU[indicador].ANORMALIDAD = espaciosDer($("#Anormalidad" + a + "_lab103").val(), 5);

      if (a == 6) {
        validarTabBasal_lab103(1);
      } else {
        validarFC_lab103(parseInt(a) + 1);
      }
    }
  );
}

function validarTabBasal_lab103(a) {
  validarInputs(
    {
      form: "#validar_basal" + a + "_lab103",
      orden: "1",
      event_f3: validarSintomas_lab103,
      event_f4: () => validarConclusiones_lab103(13, a),
      event_flecha_abajo: () => validarTabMedio_lab103(a),
    },
    () => {
      if (a == 1) {
        validarANORMALIDAD_lab103(6);
      } else {
        validarTabBasal_lab103(parseInt(a) - 1);
      }
    },
    () => {
      var indicador = parseInt(a) - 1;

      global_lab103.BASAL[indicador] = $("#basal_" + a + "_lab103").val();

      switch (global_lab103.BASAL[indicador].trim()) {
        case "1":
        case "2":
        case "3":
        case "4":
          if (a == 24) {
            validarTabMedio_lab103(1);
          } else {
            validarTabBasal_lab103(parseInt(a) + 1);
          }
          break;
        default:
          CON851("01", "DATO FUERA DE RANGO!", null, "error", "error");
          validarTabBasal_lab103(a);
          break;
      }
    }
  );
}

function validarTabMedio_lab103(a) {
  validarInputs(
    {
      form: "#validar_medio" + a + "_lab103",
      orden: "1",
      event_f3: validarSintomas_lab103,
      event_f4: () => validarConclusiones_lab103(14, a),
      event_flecha_arriba: () => validarTabBasal_lab103(a),
      event_flecha_abajo: () => {
        var param;
        switch (a) {
          case 6:
            param = 5;
            break;
          case 7:
          case 8:
            param = 6;
            break;
          case 9:
          case 10:
            param = 7;
            break;
          case 11:
          case 12:
            param = 8;
            break;
          case 13:
            param = 9;
            break;
          case 14:
            param = 10;
            break;
          case 15:
            param = 11;
            break;
          case 16:
            param = 12;
            break;
          case 17:
          case 18:
            param = 13;
            break;
          case 19:
          case 20:
            param = 14;
            break;
          case 21:
          case 22:
            param = 15;
            break;
          case 23:
          case 24:
            param = 16;
            break;
          default:
            param = a;
            break;
        }
        validarTabApical_lab103(param);
      },
    },
    () => {
      if (a == 1) {
        validarTabBasal_lab103(24);
      } else {
        validarTabMedio_lab103(parseInt(a) - 1);
      }
    },
    () => {
      var indicador = parseInt(a) - 1;

      global_lab103.MEDIO[indicador] = $("#medio_" + a + "_lab103").val();

      switch (global_lab103.MEDIO[indicador].trim()) {
        case "1":
        case "2":
        case "3":
        case "4":
          if (a == 24) {
            validarTabApical_lab103(1);
          } else {
            validarTabMedio_lab103(parseInt(a) + 1);
          }
          break;
        default:
          CON851("01", "DATO FUERA DE RANGO!", null, "error", "error");
          validarTabMedio_lab103(a);
          break;
      }
    }
  );
}

function validarTabApical_lab103(a) {
  validarInputs(
    {
      form: "#validar_apical" + a + "_lab103",
      orden: "1",
      event_f3: validarSintomas_lab103,
      event_f4: () => validarConclusiones_lab103(15, a),
      event_flecha_arriba: () => {
        var param;
        switch (a) {
          case 6:
            param = 7;
            break;
          case 7:
            param = 9;
            break;
          case 8:
            param = 11;
            break;
          case 9:
            param = 13;
            break;
          case 10:
            param = 14;
            break;
          case 11:
            param = 15;
            break;
          case 12:
            param = 16;
            break;
          case 13:
            param = 17;
            break;
          case 14:
            param = 19;
            break;
          case 15:
            param = 21;
            break;
          case 16:
            param = 23;
            break;
          default:
            param = a;
            break;
        }
        validarTabMedio_lab103(param);
      },
      event_flecha_abajo: () => {
        switch (a) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            validarTabApex_lab103(1);
            break;
          case 6:
          case 7:
          case 8:
            validarTabApex_lab103(2);
            break;
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
            validarTabApex_lab103(3);
            break;
          case 14:
          case 15:
          case 16:
            validarTabApex_lab103(4);
            break;
        }
      },
    },
    () => {
      if (a == 1) {
        validarTabMedio_lab103(24);
      } else {
        validarTabApical_lab103(parseInt(a) - 1);
      }
    },
    () => {
      var indicador = parseInt(a) - 1;

      global_lab103.APICAL[indicador] = $("#apical_" + a + "_lab103").val();

      switch (global_lab103.APICAL[indicador].trim()) {
        case "1":
        case "2":
        case "3":
        case "4":
          if (a == 16) {
            validarTabApex_lab103(1);
          } else {
            validarTabApical_lab103(parseInt(a) + 1);
          }
          break;
        default:
          CON851("01", "DATO FUERA DE RANGO!", null, "error", "error");
          validarTabApical_lab103(a);
          break;
      }
    }
  );
}

function validarTabApex_lab103(a) {
  validarInputs(
    {
      form: "#validarApex" + a + "_lab103",
      orden: "1",
      event_f3: validarSintomas_lab103,
      event_f4: () => validarConclusiones_lab103(16, a),
      event_flecha_arriba: () => {
        switch (a) {
          case 1:
            validarTabApical_lab103(1);
            break;
          case 2:
            validarTabApical_lab103(6);
            break;
          case 3:
            validarTabApical_lab103(9);
            break;
          case 4:
            validarTabApical_lab103(14);
            break;
        }
      },
    },
    () => {
      if (a == 1) {
        validarTabApical_lab103(16);
      } else {
        validarTabApex_lab103(parseInt(a) - 1);
      }
    },
    () => {
      var indicador = parseInt(a) - 1;

      global_lab103.APEX[indicador] = $("#APEX" + a + "_lab103").val();

      switch (global_lab103.APEX[indicador].trim()) {
        case "1":
        case "2":
        case "3":
        case "4":
          if (a == 4) {
            $("#validarSintomas_lab103").addClass("active-text-area");
            $(".active-text-area").get(0).scrollIntoView(true);
            validarSintomas_lab103();
          } else {
            validarTabApex_lab103(parseInt(a) + 1);
          }
          break;
        default:
          CON851("01", "DATO FUERA DE RANGO!", null, "error", "error");
          validarTabApex_lab103(a);
          break;
      }
    }
  );
}

function validarSintomas_lab103() {
  validarInputs(
    {
      form: "#validarSintomas_lab103",
      orden: "1",
      event_f4: () => validarConclusiones_lab103(17),
    },
    () => {
      $("#validarSintomas_lab103").removeClass("active-text-area");
      validarTabApex_lab103(4);
    },
    () => {
      global_lab103.SINTOMAS = $("#sintomas_lab103").val().trim();

      global_lab103.SINTOMAS = global_lab103.SINTOMAS.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, " ");
      $("#sintomas_lab103").val(global_lab103.SINTOMAS);

      $("#validarSintomas_lab103").removeClass("active-text-area");
      $("#validarEcocar_lab103").addClass("active-text-area");
      $(".active-text-area").get(0).scrollIntoView(true);

      validarEcocardiograma_lab103();
    }
  );
}

function validarEcocardiograma_lab103() {
  validarInputs(
    {
      form: "#validarEcocar_lab103",
      orden: "1",
      event_f4: () => validarConclusiones_lab103(18),
    },
    () => {
      $("#validarEcocar_lab103").removeClass("active-text-area");
      $("#validarSintomas_lab103").addClass("active-text-area");
      $(".active-text-area").get(0).scrollIntoView(true);
      validarSintomas_lab103();
    },
    () => {
      global_lab103.ECOCARDIOGRAMA = $("#ecocardiograma_lab103").val().trim();

      global_lab103.ECOCARDIOGRAMA = global_lab103.ECOCARDIOGRAMA.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, " ");
      $("#ecocardiograma_lab103").val(global_lab103.ECOCARDIOGRAMA);

      $("#validarEcocar_lab103").removeClass("active-text-area");

      validarEKG_lab103();
    }
  );
}

function validarEKG_lab103() {
  validarInputs(
    {
      form: "#validarEkg_lab103",
      orden: "1",
    },
    () => validarEcocardiograma_lab103(),
    () => {
      global_lab103.EKG = espaciosDer($("#ekg_lab103").val(), 70);

      global_lab103.EKG = global_lab103.EKG.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, " ");
      $("#ekg_lab103").val(global_lab103.EKG);

      global_lab103.EKG = global_lab103.EKG.replace(/\+/g, "&");

      $("#validarConclusiones_lab103").addClass("active-text-area");
      $(".active-text-area").get(0).scrollIntoView(true);
      validarConclusiones_lab103();
    }
  );
}

function validarConclusiones_lab103(a, b) {
  validarInputs(
    {
      form: "#validarConclusiones_lab103",
      orden: "1",
    },
    () => {
      switch (a) {
        case 1:
          validarMedicacion_lab103();
          break;
        case 2:
          validarMedidas_lab103();
          break;
        case 3:
          validarEkgReposo_lab103();
          break;
        case 4:
          validarEcocardiogramaTT_lab103();
          break;
        case 5:
          validarFCM_lab103();
          break;
        case 6:
          validarFCSM_lab103();
          break;
        case 7:
          validarSC_lab103();
          break;
        case 8:
          validarFC_lab103(b);
          break;
        case 9:
          validarTA_Sis_lab103(b);
          break;
        case 10:
          validarTA_Dias_lab103(b);
          break;
        case 11:
          validarATROPINA_lab103(b);
          break;
        case 12:
          validarANORMALIDAD_lab103(b);
          break;
        case 13:
          validarTabBasal_lab103(b);
          break;
        case 14:
          validarTabMedio_lab103(b);
          break;
        case 15:
          validarTabApical_lab103(b);
          break;
        case 16:
          validarTabApex_lab103(b);
          break;
        case 17:
          validarSintomas_lab103(b);
          break;
        case 18:
          validarEcocardiograma_lab103(b);
          break;
        default:
          validarEKG_lab103();
          break;
      }
    },
    function () {
      global_lab103.CONCLUSIONES = $("#conclusiones_lab103").val().trim();

      global_lab103.CONCLUSIONES = global_lab103.CONCLUSIONES.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, " ");
      $("#conclusiones_lab103").val(global_lab103.CONCLUSIONES);

      global_lab103.CONCLUSIONES = global_lab103.CONCLUSIONES.replace(/(\r\n|\n|\r)/gm, "&");

      CON851P("01", validarConclusiones_lab103, _grabardatos_lab103);
    }
  );
}

function _grabardatos_lab103() {
  $("#validarConclusiones_lab103").removeClass("active-text-area");
  loader("show");

  var datos_envio_lab103 = datosEnvio();
  datos_envio_lab103 += global_lab103.LLAVE;
  datos_envio_lab103 += "|";
  datos_envio_lab103 += global_lab103.ID_MEDICO;
  datos_envio_lab103 += "|";
  datos_envio_lab103 += global_lab103.PESO;
  datos_envio_lab103 += "|";
  datos_envio_lab103 += global_lab103.TALLA;
  datos_envio_lab103 += "|";
  datos_envio_lab103 += global_lab103.REFERIDO;
  datos_envio_lab103 += "|";
  datos_envio_lab103 += global_lab103.DESCRIP_REFERIDO;
  datos_envio_lab103 += "|";
  datos_envio_lab103 += global_lab103.DIAGNOS;
  datos_envio_lab103 += "|";
  datos_envio_lab103 += global_lab103.DESCRIP_DIAGNOS;
  datos_envio_lab103 += "|";
  datos_envio_lab103 += global_lab103.EKG_REPOSO;
  datos_envio_lab103 += "|";
  datos_envio_lab103 += global_lab103.FCM;
  datos_envio_lab103 += "|";
  datos_envio_lab103 += global_lab103.FCSM;
  datos_envio_lab103 += "|";
  datos_envio_lab103 += global_lab103.SC;
  datos_envio_lab103 += "|";
  datos_envio_lab103 += global_lab103.EKG;
  datos_envio_lab103 += "|";
  datos_envio_lab103 += global_lab103.METODO;
  datos_envio_lab103 += "|";
  datos_envio_lab103 += global_lab103.APEX[0];
  datos_envio_lab103 += "|";
  datos_envio_lab103 += global_lab103.APEX[1];
  datos_envio_lab103 += "|";
  datos_envio_lab103 += global_lab103.APEX[2];
  datos_envio_lab103 += "|";
  datos_envio_lab103 += global_lab103.APEX[3];
  datos_envio_lab103 += "|";
  datos_envio_lab103 += moment().format("YYYYMMDD");
  datos_envio_lab103 += "|";
  datos_envio_lab103 += moment().format("HHmmss");
  datos_envio_lab103 += "|";
  datos_envio_lab103 += localStorage.Usuario;
  datos_envio_lab103 += "|";

  global_lab103.MEDICACION = global_lab103.MEDICACION.replace(/(\r\n|\n|\r)/gm, "&");
  global_lab103.MEDIDAS = global_lab103.MEDIDAS.replace(/(\r\n|\n|\r)/gm, "&");
  global_lab103.ECOCARDIOGRAMA_TT = global_lab103.ECOCARDIOGRAMA_TT.replace(/(\r\n|\n|\r)/gm, "&");
  global_lab103.SINTOMAS = global_lab103.SINTOMAS.replace(/(\r\n|\n|\r)/gm, "&");
  global_lab103.ECOCARDIOGRAMA = global_lab103.ECOCARDIOGRAMA.replace(/(\r\n|\n|\r)/gm, "&");

  var data = {};

  global_lab103.TABLA_DOBU.forEach(function (item, i) {
    console.log(item);
    var posicion = i + 1;

    var datos_tabla = item.FC;
    datos_tabla += "|";
    datos_tabla += item.TA_SIS;
    datos_tabla += "|";
    datos_tabla += item.TA_DIAS;
    datos_tabla += "|";
    datos_tabla += item.ATROPINA;
    datos_tabla += "|";
    datos_tabla += item.ANORMALIDAD;
    datos_tabla += "|";

    data["TAB-" + posicion.toString().padStart(3, "0")] = datos_tabla;
  });

  var basal = "";
  global_lab103.BASAL.forEach(function (item, i) {
    basal += item;
    basal += "|";
  });

  var medio = "";
  global_lab103.MEDIO.forEach(function (item, i) {
    medio += item;
    medio += "|";
  });

  var apical = "";
  global_lab103.APICAL.forEach(function (item, i) {
    apical += item;
    apical += "|";
  });

  var posicion = 0;
  var contadorLin = 0;
  var contadorTotal = 0;
  var linea = "";
  var maximo = 90;

  global_lab103.CONCLUSIONES.split("").forEach(function (item, i) {
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

    if (contadorLin == maximo || global_lab103.CONCLUSIONES.length == contadorTotal) {
      posicion = posicion + 1;

      data["CON-" + posicion.toString().padStart(3, "0")] = linea;
      contadorLin = 0;
      linea = "";
      maximo = 90;
    }
  });

  posicion = 0;
  contadorLin = 0;
  contadorTotal = 0;
  linea = "";
  maximo = 90;

  global_lab103.ECOCARDIOGRAMA.split("").forEach(function (item, i) {
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

    if (contadorLin == maximo || global_lab103.ECOCARDIOGRAMA.length == contadorTotal) {
      posicion = posicion + 1;

      data["ECO-" + posicion.toString().padStart(3, "0")] = linea;
      contadorLin = 0;
      linea = "";
      maximo = 90;
    }
  });

  posicion = 0;
  contadorLin = 0;
  contadorTotal = 0;
  linea = "";
  maximo = 90;

  global_lab103.ECOCARDIOGRAMA_TT.split("").forEach(function (item, i) {
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

    if (contadorLin == maximo || global_lab103.ECOCARDIOGRAMA_TT.length == contadorTotal) {
      posicion = posicion + 1;

      data["ECO_REP-" + posicion.toString().padStart(3, "0")] = linea;
      contadorLin = 0;
      linea = "";
      maximo = 90;
    }
  });

  data["datosh"] = datos_envio_lab103;
  data["basal"] = basal;
  data["medio"] = medio;
  data["apical"] = apical;
  data["sintomas"] = global_lab103.SINTOMAS;
  data["medicacion"] = global_lab103.MEDICACION;
  data["medidas"] = global_lab103.MEDIDAS;

  console.log(data);
  let URL = get_url("APP/LAB/LAB103.DLL");

  postData(data, URL)
    .then((llegada) => {
      loader("hide");
      CON851("", "Resultado guardado correctamente!", null, "success", "Exitoso");
      setTimeout(preguntaImprimir_lab103, 300);
    })
    .catch((error) => {
      loader("hide");
      CON851("", error, null, "error", "Error");
      _toggleNav();
    });
}

async function preguntaImprimir_lab103() {
  CON851P(
    "00",
    () => salir_lab103(),
    async () => {
      await Impresion_lab103();
      setTimeout(salir_lab103, 300);
    }
  );
}
