var LLAVE_RXLAB_GLOBAL = {
  NIT: "",
  COMPROBANTE: "",
  CUP: "",
  ITEM: "",
  FECHA: "",
  ESTUDIO: "",
  ID_PACIENTE: "",
  NOMBRE_PACIENTE: "",
  SUC: "",
  CL: "",
  INTERPRETADO: "",
  color: "",
  COMPROB: "",
  ESTUDIOS: [],
  MULTIPLE: false,
};
var sucursales_RXLAB = [];
var llave_temporal_rxlab = {};

$(document).ready(() => {
  _toggleNav();

  if (localStorage.Modulo == "HIC") {
    busquedaEstudios_RXLAB("PACIENTE", $_REG_HC.id_paciente);
  } else {
    let active = $("#navegacion").find("li.opcion-menu.active");
    var opcion = active[0].attributes[2].nodeValue;
    var modulo = localStorage.Modulo;
    var NIT = parseInt($_USUA_GLOBAL[0].NIT);
    // var NIT = 822006883 // CARDIORIENTE
    console.log(opcion);

    if (modulo == "LAB") {
      var error = "";

      if (opcion == "07" && localStorage.Usuario != "GEBC") {
        error = "Usted no está autorizado para el ingreso a esta opción !";
      } else if (opcion == "08" && NIT != 822006883) {
        error = "Opción no habilitada para esta empresa !";
      }

      if (error != "") {
        jAlert({ titulo: "ADVERTENCIA!", mensaje: error }, () => {
          sucursales_RXLAB = [];
          llave_temporal_rxlab = {};
          LLAVE_RXLAB_GLOBAL = {
            NIT: "",
            COMPROBANTE: "",
            CUP: "",
            ITEM: "",
            FECHA: "",
            ESTUDIO: "",
            PACI: "",
            SUC: "",
            CL: "",
            COMPROB: "",
            ESTUDIOS: [],
          };
          _toggleNav();
        });
      } else {
        validarTipoBusqueda_VALRXLAB();
      }
    } else {
      validarTipoBusqueda_VALRXLAB();
    }
  }
});

function validarTipoBusqueda_VALRXLAB() {
  var busqueda = [
    { COD: "1", DESCRIP: "Paciente" },
    { COD: "2", DESCRIP: "Comprobante" },
  ];

  POPUP(
    {
      array: busqueda,
      titulo: "Busqueda por:",
      indices: [{ id: "COD", label: "DESCRIP" }],
      callback_f: () => {
        sucursales_RXLAB = [];
        llave_temporal_rxlab = {};
        LLAVE_RXLAB_GLOBAL = {
          NIT: "",
          COMPROBANTE: "",
          CUP: "",
          ITEM: "",
          FECHA: "",
          ESTUDIO: "",
          PACI: "",
          SUC: "",
          CL: "",
          COMPROB: "",
          ESTUDIOS: [],
        };
        _toggleNav();
      },
      seleccion: "1",
    },
    function (data) {
      switch (data.COD) {
        case "1":
          RXLAB_busquedaPaciente();
          break;
        case "2":
          RXLAB_busquedaComprobante();
          break;
      }
    }
  );
}

function RXLAB_busquedaComprobante() {
  var fuente =
    '<div id="popUp_comprobante_RXLAB">' +
    '<div class="col-md-12">' +
    '<div class="portlet light no-padding">' +
    '<div class="portlet-body no-padding">' +
    '<div class="form-group col-md-12 col-sm-12 col-xs-12 no-padding" style="margin: 0 auto;">' +
    '<div class="col-md-12 col-sm-12 col-xs-12" style="display: flex;justify-content: space-around">' +
    '<div class="col-md-3">' +
    "<label>Sucursal:</label>" +
    '<div class="input-group col-md-12 col-sm-12 col-xs-12">' +
    '<input type="text" style="text-align: center" id="sucursal_RXLAB" class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">' +
    "</div>" +
    "</div>" +
    '<div class="col-md-5">' +
    "<label>Clase:</label>" +
    '<div class="input-group col-md-12 col-sm-12 col-xs-12">' +
    '<input type="text" style="text-align: center" id="clase_RXLAB" class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">' +
    "</div>" +
    "</div>" +
    '<div class="col-md-4">' +
    "<label>Comprobante:</label>" +
    '<div class="input-group col-md-12 col-sm-12 col-xs-12" id="validar_comprobante_RXLAB" >' +
    '<input type="number" style="text-align: center" id="comprobante_RXLAB" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="6" data-orden="1" required="true" disabled="disabled">' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div style="clear:both;"></div>' +
    "</div>";

  var dialogo = bootbox.dialog({
    title: "Búsqueda por comprobante:",
    message: fuente,
    closeButton: false,
    buttons: {
      main: {
        label: "Aceptar",
        className: "blue hidden",
        callback: function () {},
      },
    },
  });

  dialogo.on("shown.bs.modal", function (e) {
    $(".modal-content").css({
      width: "700px",
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    });
    loader("show");
    traerSucursales_RXLAB();
  });
}

function traerSucursales_RXLAB() {
  let URL = get_url("APP/CONTAB/CON823.DLL");
  postData({ datosh: datosEnvio() }, URL)
    .then(function (data) {
      loader("hide");
      sucursales_RXLAB = data.SUCURSAL;
      // sucursales_RXLAB.pop();
      setTimeout(popupSucursales_RXLAB, 300);
    })
    .catch((err) => {
      console.eror(err);
      loader("hide");
      validarTipoBusqueda_VALRXLAB();
    });
}

function popupSucursales_RXLAB() {
  POPUP(
    {
      array: sucursales_RXLAB,
      titulo: "Seleccione sucursal:",
      indices: [{ id: "CODIGO", label: "DESCRIPCION" }],
      callback_f: () => {
        $('[data-bb-handler="main"]').click();
        setTimeout(validarTipoBusqueda_VALRXLAB, 300);
      },
    },
    function (data) {
      llave_temporal_rxlab["SUC"] = data.CODIGO;
      $("#sucursal_RXLAB").val(llave_temporal_rxlab.SUC);
      setTimeout(popupClaseServ_RXLAB, 300);
    }
  );
}

function popupClaseServ_RXLAB() {
  var tipoServ = [];
  var seleccionado = "";

  if (localStorage.Modulo == "LAB") {
    seleccionado = "2";
    tipoServ = [
      { COD: "2", DESCRIP: "LABORATORIO" },
      { COD: "4", DESCRIP: "OTROS SERVICIOS" },
      { COD: "7", DESCRIP: "PROMOCION Y PREVENCION" },
    ];
  } else if (localStorage.Modulo == "RX") {
    seleccionado = "3";
    tipoServ = [
      { COD: "3", DESCRIP: "RX-IMAGENOLOGIA" },
      { COD: "7", DESCRIP: "PROMOCION Y PREVENCION" },
    ];
  }

  POPUP(
    {
      array: tipoServ,
      titulo: "Seleccione tipo de servicio:",
      indices: [{ id: "COD", label: "DESCRIP" }],
      seleccion: seleccionado,
      teclaAlterna: true,
      callback_f: () => {
        setTimeout(popupSucursales_RXLAB, 300);
      },
    },
    function (data) {
      llave_temporal_rxlab["CL"] = data.COD;
      $("#clase_RXLAB").val(llave_temporal_rxlab.CL + " " + data.DESCRIP);

      validarComprob_RXLAB();
    }
  );
}

function validarComprob_RXLAB() {
  validarInputs(
    {
      form: "#validar_comprobante_RXLAB",
      orden: "1",
    },
    () => {
      setTimeout(popupClaseServ_RXLAB, 300);
    },
    () => {
      llave_temporal_rxlab["COMPROB"] = cerosIzq($("#comprobante_RXLAB").val(), 6);
      $("#comprobante_RXLAB").val(llave_temporal_rxlab.COMPROB);

      var COMPROBANTE = llave_temporal_rxlab.SUC + llave_temporal_rxlab.CL + llave_temporal_rxlab.COMPROB;

      busquedaEstudios_RXLAB("COMPROBANTE", COMPROBANTE);
    }
  );
}

function RXLAB_busquedaPaciente() {
  var fuente =
    '<div id="popUp_paciente_RX">' +
    '<div class="col-md-12">' +
    '<div class="portlet light no-padding">' +
    '<div class="portlet-body no-padding">' +
    '<div class="form-group col-md-12 col-sm-12 col-xs-12 no-padding" style="margin: 0 auto;">' +
    '<div class="col-md-12 col-sm-12 col-xs-12" id="validar_paciente_RX" style="display: flex;justify-content: center">' +
    '<div class="col-md-6">' +
    "<label>Id paciente:</label>" +
    '<div class="inline-inputs">' +
    '<div class="input-group col-md-10 col-sm-10 col-xs-10">' +
    '<input type="text" id="paciente_RX" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="15" data-orden="1" required="true" disabled="disabled">' +
    "</div>" +
    '<button type="button" id="pacienteBtn_RX" class="btn f8-Btn col-md-2 col-sm-2 col-xs-2">' +
    '<i class="icon-magnifier"></i>' +
    '</button>"' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div style="clear:both;"></div>' +
    "</div>";

  var dialogo = bootbox.dialog({
    title: "Búsqueda por paciente",
    message: fuente,
    closeButton: false,
    buttons: {
      main: {
        label: "Aceptar",
        className: "blue hidden",
        callback: function () {},
      },
    },
  });

  dialogo.on("shown.bs.modal", function (e) {
    $(".modal-content").css({
      width: "700px",
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    });
    ventanaBusquedaPaci_RXLAB();
  });
}

function ventanaBusquedaPaci_RXLAB() {
  _toggleF8([
    {
      input: "paciente",
      app: "RX",
      funct: (e) => {
        if ((e.type == "keydown" && e.which == 119) || e.type == "click") {
          _fin_validar_form();
          $('[data-bb-handler="main"]').click();

          f8Pacientes_RXLAB();
        }
      },
    },
  ]);

  validarInputs(
    {
      form: "#validar_paciente_RX",
      orden: "1",
    },
    () => {
      $('[data-bb-handler="main"]').click();
      $("#paciente_RX").val("");
      setTimeout(validarTipoBusqueda_VALRXLAB, 300);
    },
    () => {
      var digito = $("#paciente_RX").val().trim();
      var id_historia = "";
      var regExp = /[a-zA-Z]/g;

      if (regExp.test(digito) && localStorage.Unidad == "S") id_historia = espaciosIzq(digito, 15);
      else id_historia = cerosIzq(digito, 15);

      $("#paciente_RX").val(id_historia);
      busquedaEstudios_RXLAB("PACIENTE", id_historia);
    }
  );
}

// function f8Pacientes_RXLAB(callbackAtras, callbackSig) {
//   var unidad = localStorage.Unidad == "P" ? "" : "newcobol";

//   parametros = {
//     dll: "PACIENTES",
//     valoresselect: ["Nombre"],
//     f8data: "PACIENTES",
//     ruta: unidad,
//     columnas: [
//       {
//         title: "COD",
//       },
//       {
//         title: "NOMBRE",
//       },
//       {
//         title: "EPS",
//       },
//       {
//         title: "EDAD",
//       },
//     ],
//     callback: (data) => {
//       console.debug(data);
//       busquedaEstudios_RXLAB("PACIENTE", data.COD, true);
//     },
//     cancel: () => {
//       RXLAB_busquedaPaciente();
//     },
//   };
//   F8LITE(parametros);
// }

function f8Pacientes_RXLAB(){
  _validarVentanaMain({
    Id: "020",
    Descripcion: "Busqueda paciente",
    Tipo: "HTML",
    Href: "../../SALUD/paginas/CALL_SER810.html",
  });
}

function busquedaEstudios_RXLAB(filtro, busqueda, ventana = false) {
  loader("show");

  var URL;
  var opcion = "";
  var modulo = localStorage.Modulo;
  let Window = BrowserWindow.getAllWindows();

  if (Window.length == 1 || modulo == "RX") {
    let active = $("#navegacion").find("li.opcion-menu.active");
    opcion = active[0].attributes[2].nodeValue;
  }

  if (modulo == "LAB" || (modulo == "HIC" && (opcion == "073" || Window.length > 1))) {
    URL = get_url("APP/LAB/LAB-ESTUDIOS.DLL");
  } else if (modulo == "RX" || (modulo == "HIC" && opcion == "074")) {
    URL = get_url("APP/RX/RX-ESTUDIOS.DLL");
  }

  var data = {};

  data["datosh"] = datosEnvio() + filtro + "|" + busqueda + "|";

  if (modulo == "RX" && filtro == "COMPROBANTE") data["nit"] = $_USUA_GLOBAL[0].NIT.toString();

  postData(data, URL)
    .then((data) => {
      $('[data-bb-handler="main"]').click();

      sucursales_RXLAB = [];
      llave_temporal_rxlab = {};

      var estudios = [];

      LLAVE_RXLAB_GLOBAL.ID_PACIENTE = data.ESTUDIOS[0].ID_PACI.trim();
      LLAVE_RXLAB_GLOBAL.NOMBRE_PACIENTE = data.ESTUDIOS[0].NOMBRE_PACI.replace(/\�/g, "Ñ").trim();

      if (modulo == "RX" && opcion == "042") {
        postData({ datosh: datosEnvio() }, get_url("APP/RX/RX-44.DLL"))
          .then((data_cup) => {
            var cupsConsen = data_cup.CONSENCUPS;
            cupsConsen.pop();
            console.log(cupsConsen);

            for (var i in data.ESTUDIOS[0].TABLA) {
              var busqueda = cupsConsen.find((consen) => consen.CODIGO.trim() == data.ESTUDIOS[0].TABLA[i].CUP.trim());
              data.ESTUDIOS[0].TABLA[i].ESTUDIO = data.ESTUDIOS[0].TABLA[i].ESTUDIO.replace(/\�/g, "Ñ");
              if (busqueda) estudios.push(data.ESTUDIOS[0].TABLA[i]);
            }
            llamadoVentanaEstudiosRXLAB(estudios);
          })
          .catch((err) => {
            loader("hide");
            console.error(err);
            if (filtro == "PACIENTE") ventanaBusquedaPaci_RXLAB();
            else validarComprob_RXLAB();
          });
      } else if (modulo == "RX" && opcion == "043") {
        postData({ datosh: datosEnvio() }, get_url("APP/RX/RX-45.DLL"))
          .then((data_comp) => {
            var compConsen = data_comp.CONSENCOMP;
            compConsen.pop();
            console.log(compConsen);

            for (var i in data.ESTUDIOS[0].TABLA) {
              var llave = data.ESTUDIOS[0].TABLA[i].COMPROBANTE.trim() + data.ESTUDIOS[0].TABLA[i].CUP.trim();
              var busqueda = compConsen.find((consen) => consen.CODIGO.trim() == llave);
              if (busqueda) {
                data.ESTUDIOS[0].TABLA[i].ESTUDIO = data.ESTUDIOS[0].TABLA[i].ESTUDIO.replace(/\�/g, "Ñ");
                estudios.push(data.ESTUDIOS[0].TABLA[i]);
              }
            }
            llamadoVentanaEstudiosRXLAB(estudios);
          })
          .catch((err) => {
            loader("hide");
            console.error(err);
            if (filtro == "PACIENTE") ventanaBusquedaPaci_RXLAB();
            else validarComprob_RXLAB();
          });
      } else {
        for (var i in data.ESTUDIOS[0].TABLA) {
          if (data.ESTUDIOS[0].TABLA[i].COMPROBANTE.trim() != "") {
            data.ESTUDIOS[0].TABLA[i].ESTUDIO = data.ESTUDIOS[0].TABLA[i].ESTUDIO.replace(/\�/g, "Ñ");
            estudios.push(data.ESTUDIOS[0].TABLA[i]);
          }
        }
        llamadoVentanaEstudiosRXLAB(estudios);
      }
    })
    .catch((error) => {
      loader("hide");
      console.error(error);
      if (filtro == "PACIENTE") {
        if (localStorage.Modulo == "HIC") {
          if (Window.length > 1) {
            _cerrarSegundaVentana();
          } else {
            if ($(".page-breadcrumb")[1]) $(".page-breadcrumb")[1].remove();
            _regresar_menuhis();
          }
        } else if (ventana) {
          RXLAB_busquedaPaciente();
        } else {
          ventanaBusquedaPaci_RXLAB();
        }
      } else {
        validarComprob_RXLAB();
      }
    });
}

function llamadoVentanaEstudiosRXLAB(estudios) {
  if (localStorage.Modulo == "RX") estudios = estudios.filter((estudio) => estudio.CUP.slice(0, 2) != "XM");

  LLAVE_RXLAB_GLOBAL.ESTUDIOS = estudios;
  ventanaEstudios_RXLAB();
}

function ventanaEstudios_RXLAB() {
  console.log(LLAVE_RXLAB_GLOBAL.ESTUDIOS);

  loader("hide");
  var Titulo = "Estudios del paciente " + LLAVE_RXLAB_GLOBAL.NOMBRE_PACIENTE;

  _ventanaDatos({
    titulo: Titulo,
    columnas: ["FECHA", "COMPROBANTE", "ITEM", "CUP", "ESTUDIO", "NIT"],
    data: LLAVE_RXLAB_GLOBAL.ESTUDIOS,
    ancho: "90%",
    callback_esc: () => {
      let Window = BrowserWindow.getAllWindows();

      if (localStorage.Modulo == "HIC") {
        if (Window.length > 1) {
          _cerrarSegundaVentana();
        } else {
          if ($(".page-breadcrumb")[1]) $(".page-breadcrumb")[1].remove();
          _regresar_menuhis();
        }
      } else {
        setTimeout(validarTipoBusqueda_VALRXLAB, 500);
      }
    },
    callback: (datoTabla) => {
      loader("show");
      var tem = datoTabla.COMPROBANTE.split("");

      LLAVE_RXLAB_GLOBAL.NIT = datoTabla.NIT;
      LLAVE_RXLAB_GLOBAL.COMPROBANTE = datoTabla.COMPROBANTE;
      LLAVE_RXLAB_GLOBAL.CUP = datoTabla.CUP;
      LLAVE_RXLAB_GLOBAL.ITEM = datoTabla.ITEM;
      LLAVE_RXLAB_GLOBAL.FECHA = datoTabla.FECHA;
      LLAVE_RXLAB_GLOBAL.ESTUDIO = datoTabla.ESTUDIO;
      LLAVE_RXLAB_GLOBAL.INTERPRETADO = datoTabla.INTERPRETADO;
      LLAVE_RXLAB_GLOBAL.color = datoTabla.color;
      LLAVE_RXLAB_GLOBAL.SUC = tem[0] + tem[1];
      LLAVE_RXLAB_GLOBAL.CL = tem[2];
      LLAVE_RXLAB_GLOBAL.COMPROB = tem[3] + tem[4] + tem[5] + tem[6] + tem[7] + tem[8];

      console.log(LLAVE_RXLAB_GLOBAL);

      evaluarCup_VALRXLAB();
    },
  });
}

function evaluarCup_VALRXLAB() {
  var modulo = localStorage.Modulo;

  var opcion = "";
  let Window = BrowserWindow.getAllWindows();
  console.log(Window);
  if (Window.length == 1 || localStorage.Modulo == "RX") {
    let active = $("#navegacion").find("li.opcion-menu.active");
    opcion = active[0].attributes[2].nodeValue;
  }

  if (modulo == "LAB" || (modulo == "HIC" && (opcion == "073" || opcion == "042" || Window.length > 1))) {
    if (opcion == "07" && modulo == "LAB") {
      if (localStorage.Usuario == "GEBC") {
        loader("hide");

        var preguntas = [
          { COD: "1", DESCRIP: "INICIALIZAR" },
          { COD: "2", DESCRIP: "ELIMINAR" },
        ];
        setTimeout(() => {
          POPUP(
            {
              titulo: "Que desea hacer ?",
              indices: [{ id: "COD", label: "DESCRIP" }],
              array: preguntas,
              callback_f: () => {
                sucursales_RXLAB = [];
                llave_temporal_rxlab = {};
                LLAVE_RXLAB_GLOBAL = {
                  NIT: "",
                  COMPROBANTE: "",
                  CUP: "",
                  ITEM: "",
                  FECHA: "",
                  ESTUDIO: "",
                  PACI: "",
                  SUC: "",
                  CL: "",
                  COMPROB: "",
                  ESTUDIOS: [],
                };
                _toggleNav();
              },
            },
            (data) => {
              var seleccion = data.COD;
              CON851P(
                "Está seguro que desea " +
                  data.DESCRIP +
                  " la información de este resultado ?, la información no se podrá recuperar !!!",
                ventanaEstudios_RXLAB,
                () => {
                  llamadoCorrecionRXLAB(seleccion, get_url("APP/LAB/CORRECLAB.DLL"));
                }
              );
            }
          );
        }, 300);
      } else {
        jAlert(
          { titulo: "ADVERTENCIA!", mensaje: "Usted no está autorizado para el uso de esta opción" },
          ventanaEstudios_RXLAB
        );
      }
    } else if (opcion == "02" && modulo == "LAB") {
      var usuario = localStorage.Usuario;
      var NIT = parseInt($_USUA_GLOBAL[0].NIT); // 822006883 CARDIORIENTE, 892000264 HOSPITAL ACACIAS

      if (
        LLAVE_RXLAB_GLOBAL.INTERPRETADO.trim() == "" || LLAVE_RXLAB_GLOBAL.INTERPRETADO.trim() == "N" ||
        (LLAVE_RXLAB_GLOBAL.INTERPRETADO == "S" &&
          (usuario == "ADMI" ||
            usuario == "GEBC" ||
            (NIT == 822006883 && usuario == "1635") ||
            (NIT == 892000264 && usuario == "MFCG")))
      ) {
        switch (LLAVE_RXLAB_GLOBAL.CUP.trim()) {
          case "881210":
          case "88121001":
          case "88121002":
            if (NIT == 822006883) {
              _validarVentanaMain({
                Id: "022",
                Descripcion: "Ecocardiograma stress",
                Tipo: "HTML",
                Href: "../../LAB/paginas/LAB103_NEW.html",
              });
            } else {
              _validarVentanaMain({
                Id: "022",
                Descripcion: "Ecocardiograma stress",
                Tipo: "HTML",
                Href: "../../LAB/paginas/LAB103.html",
              });
            }
            break;
          case "894102":
            if (NIT == 822006883) {
              // cardioriente solicita que prueba de esfuerzo sea por la estandar
              _validarVentanaMain({
                Id: "021",
                Descripcion: "Actualizar resultados",
                Tipo: "HTML",
                Href: "../../LAB/paginas/LAB102.html",
              });
            } else {
              _validarVentanaMain({
                Id: "023",
                Descripcion: "Prueba de esfuerzo",
                Tipo: "HTML",
                Href: "../../LAB/paginas/LAB107.html",
              });
            }
            break;
          case "895001":
          case "895100":
          case "896101":
            _validarVentanaMain({
              Id: "024",
              Descripcion: "Electrocardiografia dinamica (HOLTER)",
              Tipo: "HTML",
              Href: "../../LAB/paginas/LAB108.html",
            });
            break;
          default:
            _validarVentanaMain({
              Id: "021",
              Descripcion: "Actualizar resultados",
              Tipo: "HTML",
              Href: "../../LAB/paginas/LAB102.html",
            });
            break;
        }
      } else {
        loader("hide");
        jAlert(
          { titulo: "ADVERTENCIA!", mensaje: "Registro no se puede modificar!, para consultar ingrese a la opción 4" },
          ventanaEstudios_RXLAB
        );
      }
    } else if (((opcion == "04" || opcion == "08") && modulo == "LAB") || modulo == "HIC") {
      if (LLAVE_RXLAB_GLOBAL.INTERPRETADO == "S") {
        var arraySeleccion = [{ COD: "1", DESCRIP: "SOLO EL SELECCIONADO" }];
        var cantInterpre = LLAVE_RXLAB_GLOBAL.ESTUDIOS.filter((x) => x.INTERPRETADO == "S");
        var filtradosComprob = LLAVE_RXLAB_GLOBAL.ESTUDIOS.filter(
          (x) => x.COMPROBANTE.trim() == LLAVE_RXLAB_GLOBAL.COMPROBANTE.trim() && x.INTERPRETADO == "S"
        );

        if (cantInterpre.length > 1 || (opcion == "08" && modulo == "LAB")) {
          loader("hide");
          var texto = "";
          var envioEmail = "";

          if (opcion == "08" && modulo == "LAB") {
            texto = "ENVIAR CORREO DE CUALES RESULTADOS ?";
            envioEmail = true;
          } else {
            texto = "GENERAR PDF DE CUALES RESULTADOS ?";
            envioEmail = false;
          }

          if (cantInterpre.length > 1) arraySeleccion.push({ COD: "2", DESCRIP: "TODOS HASTA LA FECHA" });
          if (filtradosComprob.length > 1) arraySeleccion.push({ COD: "3", DESCRIP: "POR COMPROBANTE" });

          setTimeout(() => {
            POPUP(
              {
                titulo: texto,
                indices: [{ id: "COD", label: "DESCRIP" }],
                array: arraySeleccion,
                callback_f: () => ventanaEstudios_RXLAB(),
              },
              (data) => {
                var seleccionado = data.COD;
                var arrayEnvioParam = [];

                if (
                  seleccionado == "1" &&
                  ((opcion != "08" && modulo == "LAB") || (opcion == "073" && modulo == "HIC"))
                ) {
                  evaluarCupAconsultar_LAB();
                } else {
                  loader("show");

                  switch (seleccionado) {
                    case "1":
                      arrayEnvioParam.push(LLAVE_RXLAB_GLOBAL);
                      break;
                    case "2":
                      arrayEnvioParam = cantInterpre;
                      break;
                    case "3":
                      arrayEnvioParam = filtradosComprob;
                      break;
                  }

                  imprimirMasivoLab(arrayEnvioParam, envioEmail);
                }
              }
            );
          }, 300);
        } else {
          evaluarCupAconsultar_LAB();
        }
      } else {
        loader("hide");
        jAlert(
          { titulo: "ADVERTENCIA!", mensaje: "Registro no se ha llenado!, Ingrese por la opcion 2" },
          ventanaEstudios_RXLAB
        );
      }
    }
  } else if (opcion == "042" && modulo == "RX") {
    _validarVentanaMain({
      Id: "012",
      Descripcion: "Aprobar consentimiento",
      Tipo: "HTML",
      Href: "../../RX/paginas/RX-45.html",
    });
  } else if (opcion == "043" && modulo == "RX") {
    _validarVentanaMain({
      Id: "012",
      Descripcion: "Reimprimir consentimiento",
      Tipo: "HTML",
      Href: "../../RX/paginas/RX-46.html",
    });
  } else {
    if (opcion == "01" && modulo == "RX" && localStorage.Usuario == "GEBC") {
      var repetidos = LLAVE_RXLAB_GLOBAL.ESTUDIOS.filter(
        (x) => x.COMPROBANTE.trim() == LLAVE_RXLAB_GLOBAL.COMPROBANTE.trim() && x.CUP == LLAVE_RXLAB_GLOBAL.CUP.trim()
      );
      console.log(repetidos, "REPETIDOS");

      if (LLAVE_RXLAB_GLOBAL.INTERPRETADO != "S" && repetidos.length > 1) {
        loader("hide");

        var preguntasRX = [
          { COD: "1", DESCRIP: "INGRESAR" },
          { COD: "2", DESCRIP: "ELIMINAR" },
        ];
        setTimeout(() => {
          POPUP(
            {
              titulo: "Que desea hacer ?",
              indices: [{ id: "COD", label: "DESCRIP" }],
              array: preguntasRX,
              callback_f: ventanaEstudios_RXLAB,
            },
            (data) => {
              var seleccion = data.COD;
              if (seleccion == "1") llamadoOpcionesRX_VALRXLAB();
              else {
                CON851P(
                  "Está seguro que desea ELIMINAR la información de este resultado ?, la información no se podrá recuperar !!!",
                  ventanaEstudios_RXLAB,
                  () => {
                    llamadoCorrecionRXLAB("", get_url("APP/RX/CORRECRX.DLL"));
                  }
                );
              }
            }
          );
        }, 300);
      } else {
        llamadoOpcionesRX_VALRXLAB();
      }
    } else {
      llamadoOpcionesRX_VALRXLAB();
    }
  }
}

function llamadoOpcionesRX_VALRXLAB() {
  switch (LLAVE_RXLAB_GLOBAL.CUP.trim()) {
    case "886012":
      _validarVentanaMain({
        Id: "012",
        Descripcion: "Osteodensitometria",
        Tipo: "HTML",
        Href: "../../RX/paginas/RX-43.html",
      });
      break;
    default:
      _validarVentanaMain({
        Id: "011",
        Descripcion: "Resultados RX",
        Tipo: "HTML",
        Href: "../../RX/paginas/RX-421W.html",
      });
      break;
  }
}

function llamadoCorrecionRXLAB(param, rutaDll) {
  var datos_envio = datosEnvio();

  if (localStorage.Modulo == "RX") {
    datos_envio += LLAVE_RXLAB_GLOBAL.NIT;
    datos_envio += "|";
    datos_envio += LLAVE_RXLAB_GLOBAL.COMPROBANTE;
    datos_envio += "|";
    datos_envio += LLAVE_RXLAB_GLOBAL.CUP;
    datos_envio += "|";
    datos_envio += LLAVE_RXLAB_GLOBAL.ITEM;
    datos_envio += "|";
    datos_envio += param;
    datos_envio += "|";
  } else {
    datos_envio += LLAVE_RXLAB_GLOBAL.COMPROBANTE;
    datos_envio += "|";
    datos_envio += LLAVE_RXLAB_GLOBAL.CUP;
    datos_envio += "|";
    datos_envio += LLAVE_RXLAB_GLOBAL.ITEM;
    datos_envio += "|";
    datos_envio += param;
    datos_envio += "|";
  }

  console.log(datos_envio);
  postData({ datosh: datos_envio }, rutaDll)
    .then((data) => {
      console.log(data);
      CON851("", "Proceso finalizado !", null, "success", "Terminado");
      sucursales_RXLAB = [];
      llave_temporal_rxlab = {};
      LLAVE_RXLAB_GLOBAL = {
        NIT: "",
        COMPROBANTE: "",
        CUP: "",
        ITEM: "",
        FECHA: "",
        ESTUDIO: "",
        PACI: "",
        SUC: "",
        CL: "",
        COMPROB: "",
        ESTUDIOS: [],
      };
      _toggleNav();
    })
    .catch((err) => {
      console.error(err);
      CON851("", "Error !", null, "error", "Error");
      ventanaEstudios_RXLAB();
    });
}

function evaluarCupAconsultar_LAB() {
  let NIT = parseInt($_USUA_GLOBAL[0].NIT);
  switch (LLAVE_RXLAB_GLOBAL.CUP.trim()) {
    case "881210":
    case "88121001":
    case "88121002":
      if (NIT == 822006883) {
        _validarVentanaMain({
          Id: "022",
          Descripcion: "Ecocardiograma stress",
          Tipo: "HTML",
          Href: "../../LAB/paginas/LAB103_NEW.html",
        });
      } else {
        _validarVentanaMain({
          Id: "022",
          Descripcion: "Ecocardiograma stress",
          Tipo: "HTML",
          Href: "../../LAB/paginas/LAB106.html",
        });
      }
      break;
    case "894102":
      if (NIT == 822006883) {
        // cardioriente solicita que prueba de esfuerzo sea por la estandar
        _validarVentanaMain({
          Id: "021",
          Descripcion: "Actualizar resultados",
          Tipo: "HTML",
          Href: "../../LAB/paginas/LAB102.html",
        });
      } else {
        _validarVentanaMain({
          Id: "023",
          Descripcion: "Prueba de esfuerzo",
          Tipo: "HTML",
          Href: "../../LAB/paginas/LAB107.html",
        });
      }
      break;
    case "895001":
    case "895100":
    case "896101":
      _validarVentanaMain({
        Id: "024",
        Descripcion: "Electrocardiografia dinamica (HOLTER)",
        Tipo: "HTML",
        Href: "../../LAB/paginas/LAB108.html",
      });
      break;
    default:
      _validarVentanaMain({
        Id: "051",
        Descripcion: "Actualizar resultados",
        Tipo: "HTML",
        Href: "../../LAB/paginas/LAB102.html",
      });
      break;
  }
}
