var arrayProtocolos_mant102 = [];
var momentFormat = "YYYY/MM/DD";
var $FECHA_MODIF = moment().format(momentFormat);
var global_mant102 = [];
var $_novedad_mant102;

global_mant102.LLAVE = { TIPO: "", NRO: "", COMPLETA: "" };

$(document).ready(function () {
  _inputControl("reset");
  _inputControl("disabled");

  nombreOpcion("1,2 - Protocolos de mantenimiento de equipos");

  _toggleF8([
    { input: "codigo", app: "mant102", funct: _ventanaProtocolos_mant102 },
  ]);
  loader("hide");

  obtenerDatosCompletos(
    { nombreFd: "PROTOCOLOS_MANT", filtro: global_mant102.LLAVE.TIPO },
    (data) => {
      arrayProtocolos_mant102 = data.PROTOCOLOS_MANT;
      arrayProtocolos_mant102.pop();
      CON850(_Novedad_mant102);
    },
    "OFF", () => CON851("", "Error cargando macros protocolos de mantenimiento", null, "error", "error"));
});

function _Novedad_mant102(novedad) {
  $_novedad_mant102 = novedad.id;
  switch ($_novedad_mant102) {
    case "7":
    case "8":
    case "9":
      seleccionTipo_mant102();
      break;
    case "F":
      salir_mant102();
      break;
  }
  $("#novedad_mant102").val(novedad.id + ".- " + novedad.descripcion);
}

function salir_mant102() {
  arrayProtocolos_mant102 = []; global_mant102 = []; $_novedad_mant102 = "";
  _toggleNav();
}

function _ventanaProtocolos_mant102(e) {
  if ((e.type == "keydown" && e.which == 119) || e.type == "click") {
    let arrayFiltrado;
    arrayFiltrado = arrayProtocolos_mant102.filter((data) => data.COMPLETA.substring(0, 1) == global_mant102.LLAVE.TIPO);
    _ventanaDatos({
      titulo: "Ventana macros protocolos de mantenimiento",
      columnas: ["TIPO", "NRO", "DESCRIP"],
      label: ["Codigo", "Descripcion"],
      data: arrayFiltrado,
      callback_esc: function () {
        $("#codigo_mant102").focus();
      },
      callback: function (data) {
        $("#codigo_mant102").val(data.NRO);
        _enterInput("#codigo_mant102");
      },
    });
  }
}

function seleccionTipo_mant102() {
  var busqueda = [
    { COD: "1", DESCRIP: "Medico" },
    { COD: "2", DESCRIP: "Oficina" },
    { COD: "3", DESCRIP: "Operativo" },
    { COD: "4", DESCRIP: "Vehiculo" },
  ];

  POPUP(
    {
      array: busqueda,
      titulo: "Seleccione tipo uso",
      indices: [{ id: "COD", label: "DESCRIP" }],
      callback_f: () => {
        setTimeout(CON850(_Novedad_mant102), 400);
      },
      seleccion: parseInt(global_mant102.LLAVE.TIPO),
    },
    function (data) {
      global_mant102.LLAVE.TIPO = data.COD;
      $("#tipo_mant102").val(data.COD);
      $("#descripTipo_mant102").val(data.DESCRIP);
      validarNro_mant102();
    }
  );
}


function validarNro_mant102() {
  validarInputs(
    {
      form: "#validarCodigo_mant102",
      orden: "1",
    },
    () => {
      global_mant102.LLAVE.NRO = cerosIzq($("#codigo_mant102").val(), 3);
      $("#codigo_mant102").val(global_mant102.LLAVE.NRO);
      setTimeout(seleccionTipo_mant102, 400);
    },
    () => {
      global_mant102.LLAVE.NRO = cerosIzq($("#codigo_mant102").val(), 3);
      global_mant102.LLAVE.COMPLETA = global_mant102.LLAVE.TIPO + global_mant102.LLAVE.NRO;
      const busquedaProtocolo = arrayProtocolos_mant102.find((data) => data.COMPLETA == global_mant102.LLAVE.COMPLETA);

      $("#codigo_mant102").val(busquedaProtocolo ? busquedaProtocolo.NRO : global_mant102.LLAVE.NRO);
      $("#descripcion_mant102").val(busquedaProtocolo ? busquedaProtocolo.DESCRIP : ' ');
      buscarProtocolo_mant102();
    }
  );
}

function buscarProtocolo_mant102() {
  let busquedaProtocolo = arrayProtocolos_mant102.find((data) => data.COMPLETA == global_mant102.LLAVE.COMPLETA);

  switch ($_novedad_mant102) {
    case "7":
      if (busquedaProtocolo) {
        CON851("00", "Protocolo ya existe", null, "error", "error");
        validarNro_mant102();
      } else asignarArrayVacio_mant102();
      break;
    case "8":
      if (busquedaProtocolo) consultaDatos_mant102();
      else {
        validarNro_mant102();
        CON851("01", "Protocolo no existe!", null, "error", "error");
      }
      break;
    case "9":
      if (busquedaProtocolo) eliminarDatos_mant102();
      else {
        validarNro_mant102();
        CON851("01", "Protocolo no existe!", null, "error", "error");
      }
      break;
  }
}

function consultaDatos_mant102() {
  let URL = get_url("APP/MANT/mant102.DLL");
  const data = { datosh: datosEnvio() + global_mant102.LLAVE.COMPLETA + "|" };

  postData(data, URL)
    .then(function (data) {
      global_mant102 = data.PROTOCOLO_MANT;
      for (i in global_mant102) global_mant102[i] ? (global_mant102[i] = global_mant102[i]) : (global_mant102[i] = " ");
      mostrarDatos_mant102();
    })
    .catch((err) => {
      console.log(err);
      console.log("error trayendo Macros protocolos");
      loader("hide");
    });
}

function eliminarDatos_mant102() {
  var data = { datosh: datosEnvio() + $_novedad_mant102 + "|" + localStorage.Usuario + "|" + global_mant102.LLAVE.COMPLETA };
  var URL = get_url("APP/MANT/MANT102-02.DLL");
  CON851P('54', () => { _toggleNav(); }, () => {
    postData(data, URL)
      .then((data) => {
        CON851('', 'Se ha Eliminado el registro', null, 'success', 'Exito');
        salir_mant102();
      }).catch((error) => { console.error(error); _toggleNav(); });
  })
}

function mostrarDatos_mant102() {
  let arrTipo = [
    { COD: "1", DESCRIP: "Medico" },
    { COD: "2", DESCRIP: "Oficina" },
    { COD: "3", DESCRIP: "Operativo" },
    { COD: "4", DESCRIP: "Vehiculo" },
  ];
  const busquedaTipo = arrTipo.find(e => e.COD == parseInt(global_mant102.LLAVE["TIPO"]))
  $("#tipo_mant102").val(busquedaTipo ? busquedaTipo.COD : "1");
  $("#descripTipo_mant102").val(busquedaTipo ? busquedaTipo.DESCRIP : "TIPO NO ENCONTRADO")

  const busquedaProtocolo = arrayProtocolos_mant102.find((e) => e.COMPLETA == global_mant102.LLAVE["COMPLETA"]);
  $("#codigo_mant102").val(busquedaProtocolo ? busquedaProtocolo.NRO : " ");
  $("#descripcion_mant102").val(busquedaProtocolo ? busquedaProtocolo.DESCRIP : "*******");

  $("#creacion_mant102").val(global_mant102.OPER_MODIF ? global_mant102.OPER_MODIF : localStorage.Usuario);
  $("#fecha_creacion_mant102").val(global_mant102.FECHA_MODIF ? global_mant102.FECHA_MODIF : localStorage.Usuario);

  $("#creacion_mant102").val(global_mant102.OPER_MODIF ? global_mant102.OPER_MODIF : localStorage.Usuario);
  $("#fecha_creacion_mant102").val(global_mant102.FECHA_MODIF.trim() ? moment(global_mant102.FECHA_MODIF.format('YYYY/MM/DD')) : $FECHA_MODIF);

  global_mant102.RUTINA.replace(/\�/g, "Ñ").trim();
  global_mant102.RUTINA.replace(/\�/g, "Ñ").trim();
  global_mant102.RUTINA = global_mant102.RUTINA.replace(/&/g, "\n");


  $("#rutina_macroProtocolo_mant102").val(global_mant102.RUTINA);
  validarDetalle_mant102();
}
// 
function asignarArrayVacio_mant102() {
  global_mant102 = {
    LLAVE: {
      TIPO: global_mant102.LLAVE.TIPO ? global_mant102.LLAVE.TIPO : " ",
      NRO: global_mant102.LLAVE.NRO ? global_mant102.LLAVE.NRO : " ",
      COMPLETA: global_mant102.LLAVE.COMPLETA ? global_mant102.LLAVE.COMPLETA : " ",
    },
    FECHA_MODIF: " ",
    OPER_MODIF: " ",
    DETAL_PROTOCOLO: "",
    RUTINA: "",
  };
  validarDetalle_mant102();
}

function validarDetalle_mant102() {
  validarInputs(
    {
      form: "#validarDescrip_mant102",
      orden: "1",
    },
    () => {
      global_mant102.DETAL_PROTOCOLO = $("#descripcion_mant102").val();
      validarNro_mant102();
    },
    () => {
      global_mant102.DETAL_PROTOCOLO = $("#descripcion_mant102").val();
      global_mant102.DETAL_PROTOCOLO = global_mant102.DETAL_PROTOCOLO.replace(/\&/g, " ").trim();
      global_mant102.DETAL_PROTOCOLO = global_mant102.DETAL_PROTOCOLO.replace(/\"/g, " ").trim();
      global_mant102.DETAL_PROTOCOLO = global_mant102.DETAL_PROTOCOLO.replace(/\{/g, " ").trim();
      global_mant102.DETAL_PROTOCOLO = global_mant102.DETAL_PROTOCOLO.replace(/\}/g, " ").trim();
      global_mant102.DETAL_PROTOCOLO = global_mant102.DETAL_PROTOCOLO.replace(/\[/g, " ").trim();
      global_mant102.DETAL_PROTOCOLO = global_mant102.DETAL_PROTOCOLO.replace(/\]/g, " ").trim();
      global_mant102.DETAL_PROTOCOLO = global_mant102.DETAL_PROTOCOLO.replace(/\*/g, " ").trim();

      global_mant102.DETAL_PROTOCOLO = global_mant102.DETAL_PROTOCOLO.replace(/(\r\n|\n|\r)/gm, "&");
      validarTextarea_macros_mant102();
    }
  );
}

function validarTextarea_macros_mant102() {
  validarInputs(
    {
      form: "#validarTextareaMacros_mant102",
      orden: "1"
    },
    () => {
      global_mant102.RUTINA = $("#rutina_macroProtocolo_mant102").val().trim();
      validarDetalle_mant102();
    }, () => {
      global_mant102.RUTINA = $("#rutina_macroProtocolo_mant102").val().trim();
      global_mant102.RUTINA.replace(/\�/g, "Ñ").trim();
      global_mant102.RUTINA = global_mant102.RUTINA.replace(/\&/g, " ").trim();
      global_mant102.RUTINA = global_mant102.RUTINA.replace(/\"/g, " ").trim();
      global_mant102.RUTINA = global_mant102.RUTINA.replace(/\{/g, " ").trim();
      global_mant102.RUTINA = global_mant102.RUTINA.replace(/\}/g, " ").trim();
      global_mant102.RUTINA = global_mant102.RUTINA.replace(/\[/g, " ").trim();
      global_mant102.RUTINA = global_mant102.RUTINA.replace(/\]/g, " ").trim();
      global_mant102.RUTINA = global_mant102.RUTINA.replace(/\*/g, " ").trim();
      global_mant102.RUTINA = global_mant102.RUTINA.replace(/(\r\n|\n|\r)/gm, "&");
      _grabarDatos_mant102();
    })
}

function _grabarDatos_mant102() {
  CON851P('01', validarTextarea_macros_mant102, () => {
    var datos_envio = datosEnvio();
    datos_envio += $_novedad_mant102;
    datos_envio += "|";
    datos_envio += localStorage.Usuario;
    datos_envio += "|";
    datos_envio += global_mant102.LLAVE.COMPLETA;
    datos_envio += "|";
    datos_envio += global_mant102.DETAL_PROTOCOLO;
    datos_envio += "|";
    datos_envio += global_mant102.FECHA_MODIF ? global_mant102.FECHA_MODIF : moment().format('YYYYMMDD');

    var data = {};
    data.datosh = datos_envio;
    let maximo = 95,
      posicion = 0,
      contadorLin = 0,
      contadorTotal = 0,
      linea = "";

    global_mant102.RUTINA.split("").forEach(function (item, i) {
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
        case " - ":
        case "@":
        case ">":
        case "<":
          maximo = maximo + 1;
          break;
      }
      linea += item;

      if (
        contadorLin == maximo ||
        global_mant102.RUTINA.length == contadorTotal
      ) {
        posicion = posicion + 1;

        data["RENG-" + posicion.toString().padStart(3, "0")] = linea;
        contadorLin = 0;
        linea = "";
        maximo = 95;
      }
    });

    console.log(data, "datos to DLL");
    var URL = get_url("APP/MANT/MANT102-02.DLL");

    postData(data, URL)
      .then((data) => {
        CON851('', `Se ha ${$_novedad_mant102 == '8' ? 'modificado' : 'grabado'} el registro`, null, 'success', 'Exito');
        salir_mant102();
      }).catch((error) => { console.error(error); _toggleNav(); });
  })

}
