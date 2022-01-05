var vlrBruto_154 = new IMask(document.getElementById("vlrBruto_154"), {
  mask: Number,
  min: -9999999999,
  max: 9999999999,
  scale: 0,
  thousandsSeparator: ",",
  radix: ".",
});

var vlrSeguro_154 = new IMask(document.getElementById("vlrSeguro_154"), {
  mask: Number,
  min: -9999999999,
  max: 9999999999,
  scale: 0,
  thousandsSeparator: ",",
  radix: ".",
});

var vlrRemesas_154 = new IMask(document.getElementById("vlrRemesas_154"), {
  mask: Number,
  min: -9999999999,
  max: 9999999999,
  scale: 0,
  thousandsSeparator: ",",
  radix: ".",
});

var vlrAvances_154 = new IMask(document.getElementById("vlrAvances_154"), {
  mask: Number,
  min: -9999999999,
  max: 9999999999,
  scale: 0,
  thousandsSeparator: ",",
  radix: ".",
});

var vlrAbonos_154 = new IMask(document.getElementById("vlrAbonos_154"), {
  mask: Number,
  min: -9999999999,
  max: 9999999999,
  scale: 0,
  thousandsSeparator: ",",
  radix: ".",
});

var vlrDescuadre_154 = new IMask(document.getElementById("vlrDescuadre_154"), {
  mask: Number,
  min: -9999999999,
  max: 9999999999,
  scale: 0,
  thousandsSeparator: ",",
  radix: ".",
});

var vlrNeto_154 = new IMask(document.getElementById("vlrNeto_154"), {
  mask: Number,
  min: -9999999999,
  max: 9999999999,
  scale: 0,
  thousandsSeparator: ",",
  radix: ".",
});

var $_TAX154 = {};

(() => {
  loader("show");
  _inputControl("reset");
  _inputControl("disabled");
  _toggleF8([
    { input: "placa", app: "154", funct: _ventanaPlacas_154 },
    { input: "agenciaRecaudo", app: "154", funct: _ventanaRecaudo },
    { input: "agenciaFactura", app: "154", funct: _ventanaFacturada },
  ]);
  _getCarros_154();
})();

function _getCarros_154() {
  postData({ datosh: datosEnvio() }, get_url("APP/TAX/TAX802.DLL"))
    .then((data) => {
      $_TAX154.CARROS = data.Carros;
      _getAgencias_154();
    })
    .catch((error) => {
      loader("hide");
      _toggleNav();
    });
}

function _getAgencias_154() {
  postData({ datosh: datosEnvio() }, get_url("APP/TAX/TAX801.DLL"))
    .then((data) => {
      $_TAX154.AGENCIAS = data.Agencias;
      _faseLibro_154();
      loader("hide");
    })
    .catch((error) => {
      loader("hide");
      _toggleNav();
    });
}

function _faseLibro_154() {
  validarInputs(
    {
      form: "#validarFase1_154",
      orden: "1",
    },
    _toggleNav,
    () => {
      var libro = document.getElementById("libro_154").value.padStart(9, "0"),
        datosh = datosEnvio() + libro + "|2|";

      postData({ datosh }, get_url("APP/TAX/TAX132-2.DLL"))
        .then(_montarDatos_154)
        .catch((err) => {
          console.log(err);
          _faseLibro_154();
        });
    }
  );
}

function _montarDatos_154(data) {
  $_TAX154.form = JSON.parse(JSON.stringify(data));

  document.getElementById("libroNuevo_154").value = parseFloat(data.libro);
  document.getElementById("placa_154").value = data.placa;

  vlrBruto_154.value = parseFloat(data.vlr_bruto).toString() || "0";
  vlrSeguro_154.value = parseFloat(data.vlr_seguro).toString() || "0";
  vlrRemesas_154.value = parseFloat(data.vlr_remesas).toString() || "0";
  vlrAvances_154.value = parseFloat(data.vlr_avance).toString() || "0";
  vlrAbonos_154.value = parseFloat(data.vlr_abonos).toString() || "0";
  vlrDescuadre_154.value = parseFloat(data.vlr_descuadre).toString() || "0";

  var neto =
    parseFloat(data.vlr_bruto) +
    parseFloat(data.vlr_seguro) +
    parseFloat(data.vlr_remesas) -
    parseFloat(data.vlr_avance) +
    parseFloat(data.vlr_abonos) -
    parseFloat(data.vlr_descuadre);

  vlrNeto_154.value = neto.toString();

  document.getElementById("agenciaFactura_154").value = data.agencia;
  document.getElementById("agenciaRecaudo_154").value = data.agenc_recaudo;
  document.getElementById("fechaPlanilla_154").value = data.fecha_plac;
  document.getElementById("fechaComprobante_154").value = data.fecha_comp;

  document.getElementById("comprobante_154").value = data.numero;
  document.getElementById("operElab_154").value = data.oper_elab;
  document.getElementById("operCorrec_154").value = data.oper_corre;

  let mes_libro = $_TAX154.form.fecha_comp.substr(4, 2)
  let anio_libro = $_TAX154.form.fecha_comp.substr(0, 4)

  let mes_actual = new Date().getMonth() + 1
  let anio_actual = new Date().getFullYear()
  let dia_actual = new Date().getDate()

  if ((mes_actual != parseInt(mes_libro) || anio_actual != parseInt(anio_libro)) && dia_actual > 12) {
    plantillaToast('37', '37', null, 'warning');
    _faseLibro_154()
  } else _faseLibroNuevo_154();
}

function _faseLibroNuevo_154() {
  validarInputs(
    {
      form: "#validarFase2_154",
      orden: "1",
    },
    _reset_154,
    () => {
      var libroNuevo = document.getElementById("libroNuevo_154").value,
        libro = parseFloat($_TAX154.form.libro) || 0;

      if (libro == libroNuevo) {
        _fasePlaca_154();
      } else {
        var datosh = datosEnvio() + libroNuevo.padStart(9, "0") + "|01|";

        postData({ datosh }, get_url("APP/TAX/TAX132-2.DLL"))
          .then(_fasePlaca_154)
          .catch(_faseLibroNuevo_154);
      }
    }
  );
}

function _fasePlaca_154() {
  validarInputs(
    {
      form: "#validarFase3_154",
      orden: "1",
    },
    _faseLibroNuevo_154,
    () => {
      var placa = document.getElementById("placa_154").value;
      var consulta = $_TAX154.CARROS.find((e) => e.PLACA == placa);

      if (consulta) {
        _faseValores_154("1");
      } else {
        CON851("01", "01", null, "error", "Error");
        _fasePlaca_154();
      }
    }
  );
}

function _faseValores_154(orden) {
  validarInputs(
    {
      form: "#validarFase4_154",
      orden: orden,
    },
    _fasePlaca_154,
    () => {
      var neto =
        parseFloat(vlrBruto_154.unmaskedValue) +
        parseFloat(vlrSeguro_154.unmaskedValue) +
        parseFloat(vlrRemesas_154.unmaskedValue) -
        parseFloat(vlrAvances_154.unmaskedValue) +
        parseFloat(vlrAbonos_154.unmaskedValue) -
        parseFloat(vlrDescuadre_154.unmaskedValue);

      vlrNeto_154.value = neto.toString();
      _faseAgenciaFact_154();
    }
  );
}

function _faseAgenciaFact_154() {
  validarInputs(
    {
      form: "#validarFase5_154",
      orden: "1",
    },
    () => {
      _faseValores_154("6");
    },
    () => {
      var agenciaFact = document.getElementById("agenciaFactura_154").value;
      var consulta = $_TAX154.AGENCIAS.find((e) => e.CODIGO == agenciaFact);

      if (consulta) {
        _faseAgenciaRec();
      } else {
        CON851("01", "01", null, "error", "Error");
        _faseAgenciaFact_154();
      }
    }
  );
}

function _faseAgenciaRec() {
  validarInputs(
    {
      form: "#validarFase6_154",
      orden: "1",
    },
    _faseAgenciaFact_154,
    () => {
      CON850_P(
        (e) => {
          if (e.id == "S") {
            loader("show");
            var datosh = _bajarDatos_154();
            postData({ datosh }, get_url("APP/TAX/TAX154.DLL"))
              .then((data) => {
                loader("hide");
                console.debug(data);
                jAlert(
                  {
                    titulo: "Confirmacion !",
                    mensaje: "Se ha modificado correctamente",
                  },
                  _reset_154
                );
              })
              .catch((error) => {
                console.log(error);
                loader("hide");
                _faseAgenciaRec();
              });
          } else {
            _faseAgenciaRec();
          }
        },
        { msj: "" }
      );
    }
  );
}

function _reset_154() {
  _inputControl("reset");
  _inputControl("disabled");

  $_TAX154.form = {};

  vlrBruto_154.value = "";
  vlrSeguro_154.value = "";
  vlrRemesas_154.value = "";
  vlrAvances_154.value = "";
  vlrAbonos_154.value = "";
  vlrDescuadre_154.value = "";
  vlrNeto_154.value = "";

  _faseLibro_154();
}

function _bajarDatos_154() {
  var libro = document.getElementById("libro_154").value.padStart(9, "0");
  var libroNuevo = document.getElementById("libroNuevo_154").value;
  var agenciaFact = document.getElementById("agenciaFactura_154").value;
  var agenciaRecaudo = document.getElementById("agenciaRecaudo_154").value;

  return (
    datosEnvio() +
    agenciaFact.padStart(2, "0") +
    "|" +
    document.getElementById("fechaPlanilla_154").value +
    "|" +
    document.getElementById("comprobante_154").value +
    "|" +
    libro.padStart(9, "0") +
    "|" +
    libroNuevo.padStart(9, "0") +
    "|" +
    document.getElementById("fechaComprobante_154").value +
    "|" +
    document.getElementById("placa_154").value +
    "|" +
    vlrBruto_154.unmaskedValue +
    "|" +
    vlrSeguro_154.unmaskedValue +
    "|" +
    vlrRemesas_154.unmaskedValue +
    "|" +
    vlrAvances_154.unmaskedValue +
    "|" +
    vlrAbonos_154.unmaskedValue +
    "|" +
    agenciaRecaudo.padStart(2, "0") +
    "|" +
    vlrDescuadre_154.unmaskedValue +
    "|" +
    document.getElementById("operElab_154").value +
    "|" +
    localStorage.Usuario +
    "|"
  );
}

function _ventanaPlacas_154(e) {
  if ((e.type == "keydown" && e.which == 119) || e.type == "click") {
    var carros = $_TAX154.CARROS.filter(a => a.PLACA.trim() != "");
    _ventanaDatos({
      titulo: "VENTANA DE PARQUE MOTOR",
      columnas: ["PLACA", "DESCRIP", "INTERNO", "MARCA"],
      data: carros,
      callback_esc: function () {
        $("#placa_154").focus();
      },
      callback: function (data) {
        $("#placa_154").val(data.PLACA.trim());
        _enterInput("#placa_154");
      },
    });
  }
}

function _ventanaFacturada(e) {
  if ((e.type == "keydown" && e.which == 119) || e.type == "click") {
    var agencias = $_TAX154.AGENCIAS.filter(a => a.CODIGO.trim() != "")
    _ventanaDatos({
      titulo: "VENTANA DE AGENCIAS",
      columnas: ["CODIGO", "DESCRIP"],
      data: agencias,
      callback_esc: function () {
        $("#agenciaFactura_154").focus();
      },
      callback: function (data) {
        document.getElementById('agenciaFactura_154').value = data.CODIGO;
        _enterInput("#agenciaFactura_154");
      },
    });
  }
}

function _ventanaRecaudo(e) {
  if ((e.type == "keydown" && e.which == 119) || e.type == "click") {
    var agencias = $_TAX154.AGENCIAS.filter((a) => a.CODIGO.trim() != "");
    _ventanaDatos({
      titulo: "VENTANA DE AGENCIAS",
      columnas: ["CODIGO", "DESCRIP"],
      data: agencias,
      callback_esc: function () {
        $("#agenciaRecaudo_154").focus();
      },
      callback: function (data) {
        document.getElementById("agenciaRecaudo_154").value = data.CODIGO;
        _enterInput("#agenciaRecaudo_154");
      },
    });
  }
}