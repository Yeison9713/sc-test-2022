var $_COMPRO_INI,
  $_COMPRO_FIN,
  $_CONT_COMPRO,
  $_SURTIDORES_107,
  $_DATOS_TABLA_107,
  $_INFO_COMP_107,
  $_CONTADOR = 0,
  $_SUCURSAL_107;

var $_FACT_CONT = null;

(() => {
  _inputControl("reset");
  _inputControl("disabled");
  loader("show");
  _getSucursales_107();
})();

function _getSucursales_107() {
  postData({ datosh: datosEnvio() }, get_url("app/contab/CON823.DLL"))
    .then((res) => {
      loader("hide");

      let array = [];
      res.SUCURSAL.forEach(element => {
        array.push({ cod: element.CODIGO, descripcion: element.DESCRIPCION })
      });

      _vetanaSucursales_107(array);
    })
    .catch((err) => {
      loader("hide");
      console.log(err);
      _toggleNav();
    });
}

function _vetanaSucursales_107(data) {
  _ventanaDatos({
    titulo: "Busqueda sucursales",
    columnas: ["cod", "descripcion"],
    data,
    callback_esc: _toggleNav,
    callback: (data) => {
      $_SUCURSAL_107 = data;
      _ventanaComprobante();
    },
  });
}

function _ventanaComprobante() {
  var fuente = $("#plantillaComprobante").html();
  var dialogo = bootbox.dialog({
    title: "Rango de comprobantes",
    message: fuente,
    closeButton: false,
    buttons: {
      main: {
        label: "Aceptar",
        className: "blue hidden",
        callback: function () {
          // Evento aceptar popup
        },
      },
    },
  });
  dialogo.init(function () {
    setTimeout(function () {
      validarRangoComprobante("1");
    }, 500);
  });
}

function validarRangoComprobante(orden) {
  validarInputs(
    { form: "#rangoComprobantes", orden: orden },
    function () {
      _toggleNav();
      $('[data-bb-handler="main"]').click();
    },
    function () {
      var comp1 = $(".numCompr1");
      var comp2 = $(".numCompr2");
      $_COMPRO_INI = $(comp1[1]).val();
      $_COMPRO_FIN = $(comp2[1]).val();
      if (parseInt($_COMPRO_FIN) >= parseInt($_COMPRO_INI)) {
        $("#numComprobante").val($_COMPRO_INI);
        solicitarComp();
        $('[data-bb-handler="main"]').click();
      } else {
        validarRangoComprobante("1");
        plantillaToast(
          "99",
          "El comprobante final no puede ser menor",
          "",
          "warning",
          "Advertencia"
        );
      }
    }
  );
}

function solicitarComp() {
  $_CONTADOR++;
  $_CONT_COMPRO = $("#numComprobante").val();

  if (parseInt($_CONT_COMPRO) <= parseInt($_COMPRO_FIN)) {
    loader("show");

    let datos = {
      datosh: datosEnvio(),
      planilla: $_CONT_COMPRO,
      sucursal: $_SUCURSAL_107.cod
    }

    postData(datos, get_url("app/bombas/BOM105.DLL"))
      .then((data) => {
        $_SURTIDORES_107 = data.SURTIDORES;
        $_DATOS_TABLA_107 = data["TBLA-DEUD"];
        $_INFO_COMP_107 = data.TOTALES;
        loader("hide");
        _llenarDatos_107();
      })
      .catch((err) => {
        loader("hide");
        on_finalizar();
      });
  } else {
    _inputControl("reset");
    loader("hide");
    jAlert(
      {
        titulo: "Correcto",
        mensaje: "<b>Mensaje: </b> Se han reconsolidado los comprobantes",
      },
      _toggleNav
    );
  }
}

function _llenarDatos_107() {
  let fecha = $_INFO_COMP_107["1"].trim();
  let año = fecha.substring(0, 4);
  $("#añoInicial").val(año);

  let mes = fecha.substring(4, 6);
  $("#mesInicial").val(mes);

  let dia = fecha.substring(6, 8);
  $("#diaInicial").val(dia);

  let turno = $_INFO_COMP_107["2"].trim();
  $("#turno").val(turno);

  let detalle = $_INFO_COMP_107["3"].trim();
  $("#detalle").val(detalle);

  let totalGalonaje = $_INFO_COMP_107["6"].trim();
  $("#galonajeTablaVenta").html(totalGalonaje);

  let totalVenta = $_INFO_COMP_107["7"].trim();
  $("#ventaTablaVenta").html(totalVenta);
  $("#totalCombustible").val(totalVenta);

  let totalFinanciacion = $_INFO_COMP_107["8"].trim();
  $("#totalFinanciacion").val(totalFinanciacion);

  let totalVales = $_INFO_COMP_107["9"].trim();
  $("#totalTablaVales").html(totalVales);
  $("#totalCreditos").val(totalVales);

  let totalCheques = $_INFO_COMP_107["10"].trim();
  $("#totalCheques").val(totalCheques);

  let totalEfectivo = $_INFO_COMP_107["11"].trim();
  $("#totalEfectivo").val(totalEfectivo);

  if (detalle != "ANULADO") _llenarTablaSurtidores_107();
  else plantillaError("", "Comrobante anulado!", "SC", on_finalizar);
}

function _llenarTablaSurtidores_107() {
  for (var i in $_SURTIDORES_107) {
    let item = $_SURTIDORES_107[i].SURTI.trim()
      ? $_SURTIDORES_107[i].SURTI.trim()
      : false;
    if (item) {
      $("#tablaVenta tbody").append(
        "" +
        "<tr>" +
        " <td>" +
        item +
        "</td>" +
        " <td>" +
        $_SURTIDORES_107[i].CANTID.trim() +
        "</td>" +
        " <td>" +
        $_SURTIDORES_107[i].VALOR.trim() +
        "</td>" +
        "</tr>"
      );
    }
  }

  _llenarTablaVales_107();
}

function _llenarTablaVales_107() {
  for (var i in $_DATOS_TABLA_107) {
    let item = parseInt(i) + parseInt(1);
    $("#tablaVales tbody").append(
      "" +
      "<tr>" +
      " <td>" +
      cerosIzq(item, 3) +
      "</td>" +
      " <td>" +
      $_DATOS_TABLA_107[i].COD.trim() +
      "</td>" +
      " <td>" +
      $_DATOS_TABLA_107[i].NIT.trim() +
      "</td>" +
      " <td>" +
      $_DATOS_TABLA_107[i].DOCUM.trim() +
      "</td>" +
      " <td>" +
      $_DATOS_TABLA_107[i].VLR.trim() +
      "</td>" +
      " <td>" +
      $_DATOS_TABLA_107[i].DESCRIP.trim()
        .replace(/[^a-z0-9\s]/gi, "")
        .replace(/[_\s]/g, " ") +
      "</td>" +
      "</tr>"
    );
  }

  _validacionFinal_107();
}

function _validacionFinal_107() {
  loader("hide");

  if ($_CONTADOR == 1) {
    CON850_P(
      function (e) {
        if (e.id == "S") {
          setTimeout(function () {
            CON850_P(
              function (d) {
                let datos = {
                  datosh: datosEnvio() + d.id + "|",
                  sucursal: $_SUCURSAL_107.cod,
                  planilla: $_CONT_COMPRO
                }

                postData(datos, get_url("app/bombas/BOM020.DLL"))
                  .then(() => {
                    setTimeout(() => {
                      validacion_contado();
                    }, 500);
                  })
                  .catch((err) => {
                    console.log(err);
                    loader("hide");
                    on_finalizar();
                  });
              },
              {
                msj: "Permitir refacturar?",
                overlay_show: false,
              }
            );
          }, 500);
        } else {
          _generarFactCombu_107();
        }
      },
      {
        msj: "04",
        overlay_show: false,
      }
    );
  } else {
    setTimeout(function () {
      loader("show");

      let datos = {
        datosh: datosEnvio() + "S|",
        sucursal: $_SUCURSAL_107.cod,
        planilla: $_CONT_COMPRO,
      };

      postData(datos, get_url("app/bombas/BOM020.DLL"))
        .then(on_segundaConsulta)
        .catch((err) => {
          console.log(err);
          loader("hide");
          on_finalizar();
        });
    }, 1000);
  }
}

function validacion_contado() {
  console.log("validacion_contado");
  CON850_P(
    function (e) {
      loader("show");
      $_FACT_CONT = e.id;
      on_segundaConsulta();
    },
    {
      msj: "Desea refacturar contado?",
      overlay_show: false,
    }
  );
}

function on_segundaConsulta(data) {
  if ($_USUA_GLOBAL[0].INVENT.trim() == "S") {
    let datos = {
      datosh: datosEnvio(),
      sucursal: $_SUCURSAL_107.cod,
      planilla: $_CONT_COMPRO,
    };

    postData(datos, get_url("app/bombas/BOM030.DLL"))
      .then(_generarFactCombu_107)
      .catch((err) => {
        console.log(err);
        loader("hide");
        on_finalizar();
      });
  } else {
    on_finalizar();
  }
}

function _generarFactCombu_107() {
  if ($_FACT_CONT == "S") {
    let datos = {
      datosh: datosEnvio() + localStorage.Usuario + "|",
      sucursal: $_SUCURSAL_107.cod,
      planilla: $_CONT_COMPRO,
    };

    postData(datos, get_url("app/bombas/BOMFACT.DLL"))
      .then((data) => {
        on_finalizar();
      })
      .catch((err) => {
        loader("hide");
        on_finalizar();
      });
  } else {
    on_finalizar();
  }
}

function on_finalizar() {
  _inputControl("reset");
  $("#tablaVenta tbody").html("");
  $("#tablaVales tbody").html("");
  setTimeout(function () {
    $("#numComprobante").val(parseInt($_CONT_COMPRO) + 1);
    solicitarComp();
  }, 500);
}
