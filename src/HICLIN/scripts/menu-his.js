var $_REG_PROF = {},
  $_REG_HC = {},
  $_REG_PACI = {};
$_COMP = {
  suc: "",
  tipo: "",
  comprobante: "",
};

const { ventanaHc914 } = require("../../HICLIN/scripts/hc914.js");

(() => {
  $("#nombreOpcion").remove();
  _inputControl("disabled");
  loader("show");

  let cod_paci = sessionStorage.id_paciente || "";
  document.getElementById("busqpaci_his").value = cod_paci;

  _toggleF8([{ input: "busqpaci", app: "his", funct: _ventanaPacientes }]);
  _consultarProfesional_his();

  if (localStorage.Usuario == "GEBC") {
    $("#hc001x, #cerrar_his").removeClass("hidden");
  }
})();

function _consultarProfesional_his() {
  let datos = {
    datosh: datosEnvio(),
    paso: 1,
    codigo: localStorage.Sesion.substr(5, 10),
  };

  postData(datos, get_url("APP/SALUD/SER819.DLL"))
    .then((data) => {
      $_REG_PROF = data;
      setTimeout(_iniciar_menu_his, 200);
    })
    .catch((err) => {
      $_REG_PROF = _espejoProfesional();
      setTimeout(_iniciar_menu_his, 200);
    });
}

function _iniciar_menu_his() {
  if ($_REG_HC.llave_hc) cargarDatosPaci($_REG_HC.llave_hc);
  else validarPaciente();

  loader("hide");

  document.getElementById("ventana_citas_his").addEventListener("click", () => {
    set_Event_validar("#formConsult_his", "off");
    $("#busqpaci_his").attr("disabled", "true");
    _solicitarDate_his();
  });

  document
    .getElementById("ventana_triage_his")
    .addEventListener("click", () => {
      _fin_validar_form();
      llamarHC810();
    });

  document
    .getElementById("ventana_urgencias_his")
    .addEventListener("click", () => {
      _fin_validar_form();
      llamarHC812();
    });

  document.getElementById("ventana_umi_his").addEventListener("click", () => {
    _fin_validar_form();
    llamarHC899();
  });

  document.getElementById("ventana_inter_his").addEventListener("click", () => {
    _fin_validar_form();
    llamarHC860();
  });

  document.getElementById("busquedaF7_his").addEventListener("click", () => {
    _fin_validar_form();
    llamarHC817();
  });

  document.getElementById("busquedaF8_his").addEventListener("click", () => {
    var e = {};
    e.type = "keydown";
    e.which = 119;
    _ventanaPacientes(e);
  });

  document.getElementById("busquedaF10_his").addEventListener("click", () => {
    _fin_validar_form();
    llamarHC818();
  });

  document
    .getElementById("ventana_revaloracion")
    .addEventListener("click", () => {
      _fin_validar_form();
      llamarRevaloracion();
    });

  document.getElementById("consultar_citas").addEventListener("click", () => {
    _fin_validar_form();
    $("#body_main").load("../../HICLIN/paginas/GET_CITAS.html");
  });

  document.getElementById("hc001x").addEventListener("click", () => {
    _fin_validar_form();
    $("#body_main").load("../../HICLIN/paginas/HC001X.html");
  });

  document.getElementById("cerrar_his").addEventListener("click", () => {
    _fin_validar_form();
    $("#body_main").load("../../HICLIN/paginas/CERRAR-HIS.html");
  });

}

function llamarHC810() {
  _ventanaTriage_HC810();
}

function llamarHC812() {
  _ventanaUrgencias_HC812();
}

function llamarHC899() {
  _ventanaUmi_HC899();
}

function llamarHC860() {
  _ventanaInter_HC860();
}

function llamarHC817() {
  _ventanaF7_HC817();
}

function llamarHC818() {
  _ventanaF10_HC818();
}

function llamarHC000() {
  console.log("hc000 llamado", $_REG_HC.llave_triage_w);
  document.querySelector(
    "#busqpaci_his"
  ).value = $_REG_HC.llave_triage_w.substring(12, 27);
  $("#body_main").load("../../HICLIN/paginas/HC000.html");
}

function llamarRevaloracion() {
  ventanaHc914({
    callback: (data) => {
      cargarDatosPaci(data.llave_hc);
    },
    esc_callback: validarPaciente,
  });
}

function validarPaciente() {
  validarInputs(
    {
      form: "#formConsult_his",
      orden: "1",
      event_f1: _solicitarDate_his,
      event_f2: llamarHC810,
      event_f3: llamarHC812,
      event_f4: llamarHC899,
      event_f6: llamarHC860,
      event_f7: llamarHC817,
      event_f10: llamarHC818,
    },
    function () {
      CON851P("Desea salir del modulo?", validarPaciente, salir_modulo);
    },
    function () {
      if (document.querySelector("#busqpaci_his").value.length > 0) {
        var datos_envio =
          datosEnvio() +
          cerosIzq(document.querySelector("#busqpaci_his").value, 15) +
          "|" +
          localStorage["Usuario"] +
          "|";
        postData({ datosh: datos_envio }, get_url("APP/HICLIN/MENUHIS-1.DLL"))
          .then(validarOpcPacienteHc)
          .catch(validarPaciente);
      } else {
        jAlert(
          {
            titulo: "Error ",
            mensaje: "Debe ingresar una identificacion",
          },
          validarPaciente
        );
      }
    }
  );
}

function validarOpcPacienteHc(datos) {
  if (datos.DATA[0].ESTADO == 1) {
    var datos_envio = datosEnvio() + datos.DATA[0].ID + "|" + localStorage.Usuario + "|";
    loader("show");
    postData({ datosh: datos_envio }, get_url("APP/HICLIN/HC811-1.DLL"))
      .then((data) => {
        loader("hide");
        $_REG_HC.primera_hc = 2;
        _ventanaHistoriasPaciente(data.datos);
      })
      .catch((err) => {
        loader("hide");
        console.error(err);
        validarPaciente();
      });
  } else {
    $_REG_HC.primera_hc = 1;
    cargarDatosPaci(datos.DATA[0].LLAVE);
  }
}

function cargarDatosPaci(llave) {
  loader("show");
  var datos_envio = datosEnvio() + llave + "|2|";
  postData({ datosh: datos_envio }, get_url("APP/SALUD/SER810-1.DLL"))
    .then((data) => {
      $_REG_PACI = data["REG-PACI"][0];
      _consultHc(llave);
    })
    .catch((err) => {
      loader("hide");
      validarPaciente();
    });
}

function _consultHc(llave) {
  var data = datosEnvio() + llave + "|";
  postData({ datosh: data }, get_url("APP/HICLIN/MENUHIS-2.dll"))
    .then((data) => {
      $_REG_HC.llave_hc = llave;
      $_REG_HC.id_paciente = llave.substr(0, 15);
      loader("hide");
      _mostrarDatosPaci(data.DATA[0]);
    })
    .catch((err) => {
      loader("hide");
      console.error(err);
      validarPaciente();
    });
}

function _mostrarDatosPaci(data) {
  sessionStorage.id_paciente = $_REG_HC.id_paciente;
  $_REG_HC.unser_hc = data.COD_UNSER;
  $_REG_HC.eps_hc = data.COD_ENT;
  $_REG_HC.sexo_hc = data.SEXO;
  $_REG_HC.ocup_v8_hc = data.COD_OCUPA;
  $_REG_HC.temporal_hc = data.TEMPORAL;
  $_REG_HC.estado_hc = data.ESTADO_HC;
  $_REG_HC.suc_folio_hc = data.SUC;
  $_REG_HC.nro_folio_hc = data.FOLIO;

  var edad = calcular_edad(data.FECHA_NACI);
  $_REG_HC.edad_hc = edad;

  $_REG_HC.finalid_hc = data.FINALIDAD;
  $_REG_HC.serv_hc = data.SERV;
  $_REG_HC.esquema_hc = data.ESQUEMA;
  $_REG_HC.novedad_hc = data.NOVEDAD;

  $_REG_HC.fecha_egreso_hc = data.FECHA_EGRESO;
  $_REG_HC.fecha_hc = data.FECHA_HC;
  $_REG_HC.clase_hc = data.CLASE_HC;

  //Se crea esta variable para control de impresion cuando llega a formulacion
  $_REG_HC.tipo_evo = "";

  let fecha = data.FECHA_NACI || "",
    format_fecha = moment(fecha, "YYYYMMDD");

  format_fecha.format();
  fecha_nac = format_fecha.format("YYYY/MM/DD");

  $("#doc_paci_his").val($_REG_HC.id_paciente);
  $("#cod_ent_his").val($_REG_HC.eps_hc);
  $("#descrip_ent_his").val(data.DESC_ENTID.trim());
  $("#suc_paci_his").val($_REG_HC.suc_folio_hc);
  $("#fol_paci_his").val($_REG_HC.nro_folio_hc);
  $("#nom_paci_his").val(data.DESC_PACIE.trim());
  $("#sex_paci_his").val($_REG_HC.sexo_hc);
  $("#tel_paci_his").val(data.TELEFONO_PACI.trim());
  $("#tel2_paci_his").val($_REG_PACI.CEL);
  $("#descrip_unsev_his").val(data.DESC_UNSER.trim());
  $("#cod_ocu_his").val($_REG_HC.ocup_v8_hc);
  $("#descrip_ocu_his").val(data.DESC_OCUPA);
  var edad_w = edad.vlr_edad + " " + edad.unid_edad;
  $("#edad_paci_his").val(edad_w);
  $("#fecha_nacim_hc_his").val(fecha_nac);

  let grupo_sang = `${$_REG_PACI["GRP-SANG"]} ${$_REG_PACI.RH}`;
  $("#rh_paci_his").val(grupo_sang);

  let mes = evaluarMes_min(localStorage.Mes);
  var descrip_paciente = ` \\${localStorage.Contab}\\${mes}
                           &nbsp&nbsp&nbsp&nbsp&nbsp
                           ${localStorage.Usuario} 
                           ${localStorage.Nombre} 
                           &nbsp&nbsp&nbsp&nbsp
                           Paciente: ${data.DESC_PACIE.trim()}
                           &nbsp&nbsp&nbsp&nbsp
                           Sexo: ${$_REG_HC.sexo_hc}
                           &nbsp&nbsp&nbsp&nbsp
                           Edad: ${edad_w}
                           &nbsp&nbsp&nbsp&nbsp
                           Id: ${$_REG_HC.id_paciente}
                           Profesional: ${$_REG_PROF.ATIENDE_PROF} - 
                           ${consult_atiendProf($_REG_PROF.ATIENDE_PROF)}
                           `;

  $("title").html(descrip_paciente);

  var descrip_hc;

  if ($_REG_HC.temporal_hc == "1") {
    descrip_hc = "TEMPORAL";
  } else {
    switch ($_REG_HC.estado_hc) {
      case "0":
        descrip_hc = "NO HAY H.C. ";
        break;
      case "1":
        descrip_hc = "H.C. ABIERTA";
        break;
      case "2":
        descrip_hc = "H.C. CERRADA";
        break;
    }
  }

  if ($_REG_PACI.DESCRIP.trim() == "NO EXITS PACIENTE!") {
    plantillaToast("", "NO EXITS PACIENTE!", null, "warning", "warning");
  }

  calcularFechasLimite();

  $("#descrip_hc_his").val(descrip_hc);
  _toggleNav();
  $(".menuToggle").attr("style", "display: block;");
  $("#formConsult_his").attr("hidden", true);
  $(".footer").attr("hidden", true);
}

function historiaNueva(hc) {
  // var date = new Date(),
  //   folio = parseInt(hc[hc.length - 1]["folio"].split("-")[1]),
  //   paciente = cerosIzq(document.querySelector("#busqpaci_his").value, 15);
  // folio = cerosIzq(folio + 1, 6);
  // var nueva = {
  //   DETALLE: "1",
  //   "DIAG-MUER-HC": "",
  //   "EGRESO-HC": "",
  //   ESPECIALIDAD: "",
  //   ESTADO: "0",
  //   "ESTADO-HC": "NO HAY H.C. ",
  //   "FACT-HC": " ",
  //   "FECHA-HC":
  //     date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
  //   "FECHA-ORD-SALIDA-HC": "00/00/0000",
  //   "FOLIO-HC": hc[hc.length - 1]["folio"].split("-")[0] + "-" + folio,
  //   "HAB-HC": "",
  //   "HORA-HC": date.getHours() + ":" + date.getMinutes(),
  //   "HORA-ORD-SALIDA-HC": "00:00",
  //   "ID-HC": paciente,
  //   "MED-HC": $_REG_PROF.IDENTIFICACION,
  //   "MOTIV-HC": "**ABRIR NUEVA HISTORIA**",
  //   "NIT-FACT-HC": "0000000000",
  //   "NOM-SERV": "**NUEVA**",
  //   "OPER-CIE-HC": "",
  //   "OPER-ORD-SALIDA-HC": "",
  //   "SERV-HC": "00",
  //   "UNSERV-HC": "00",
  //   color: "0",
  // };

  return { color: "0" };
}

function _ventanaPacientes(e) {
  if ((e.type == "keydown" && e.which == 119) || e.type == "click") {
    $("#cargueVueHiclin").load('../../HICLIN/paginas/CALL_SER810_HIS.html')
  }
}

function _ventanaHistoriasPaciente(hc) {
  let folio_nuevo = hc.find(e => e.id.trim() == '')
  let array_hc = []

  if (folio_nuevo) array_hc = hc.reverse();
  else array_hc = hc.sort((a, b) => a.color < b.color ? 1 : -1);

  _ventanaDatos({
    titulo: "Historias paciente",
    columnas: [
      "folio",
      "nom_serv",
      "fecha",
      "hora",
      "motivo",
      "medico",
      "descrip_estado",
    ],
    data: array_hc,
    orden: false,
    callback_esc: validarPaciente,
    ancho: "1200px",
    callback: function (data) {
      var paciente = document.getElementById("busqpaci_his").value || "";
      var llave = paciente.padStart(15, "0") +
        data["folio"].split("-")[0] +
        data["folio"].split("-")[1];

      $_REG_HC.peso = data["peso"];
      $_REG_HC.talla = data["talla"];
      $_REG_HC.per_cef = data["per_cef"];
      $_REG_HC.per_tora = data["per_tora"];
      $_REG_HC.per_abdo = data["per_abdo"];
      cargarDatosPaci(llave);
    },
  });
}

function _solicitarDate_his() {
  var fuente = $(".f1_his").html();
  var popup_cita = bootbox.dialog({
    size: "",
    closeButton: false,
    title: "Fecha de las citas",
    message: fuente,
  });

  popup_cita.on("shown.bs.modal", function () {
    _validarFechaCita();
  });
}

function _validarFechaCita() {
  var date = new Date(),
    fecha_act = date.toLocaleDateString("es-CO").split("/");

  $(".bootbox #ano_cit_his").val(fecha_act[2]);
  $(".bootbox #mes_cit_his").val(fecha_act[1].padStart(2, "0"));
  $(".bootbox #dia_cit_his").val(fecha_act[0].padStart(2, "0"));

  validarInputs(
    {
      form: "#fase_cit_his",
      orden: "1",
    },
    () => {
      setTimeout(() => {
        bootbox.hideAll();
        validarPaciente();
      }, 250);
    },
    () => {
      var año = $(".bootbox #ano_cit_his").val(),
        mes = $(".bootbox #mes_cit_his").val(),
        dia = $(".bootbox #dia_cit_his").val();

      if (mes > 12 || dia > 31) {
        plantillaToast("02", "02", null, "warning", "warning");
        setTimeout(_validarFechaCita, 250);
      } else {
        _consultarCitas_his(año + mes + dia);
        bootbox.hideAll();
      }
    }
  );
}

function _consultarCitas_his(fecha) {
  if (localStorage.Unidad == "S") fecha = fecha.substr(2, 8);
  var datos_envio =
    datosEnvio() + $_REG_PROF.IDENTIFICACION.trim() + "|" + fecha + "|";
  postData({ datosh: datos_envio }, get_url("APP/SALUD/SER890B.DLL"))
    .then((data) => {
      _ventanaCitas_his(data.CITAS.filter((e) => e.COD.trim() != ""));
    })
    .catch((err) => {
      validarPaciente();
    });
}

function _ventanaCitas_his(citas) {
  _ventanaDatos({
    titulo: `Citas Dr. ${$_REG_PROF.NOMBRE}`,
    columnas: [
      "COD",
      "DESCRIP",
      // "TIPO",
      "TIPO_CITA",
      "FECHA",
      "HORA",
      "OBSERV",
      "DOBLE",
      "DESCRIP_EST",
    ],
    data: citas,
    ancho: "1200px",
    event_f9: _ventanaEnvCit_his,
    callback_esc: validarPaciente,
    callback: (item) => {
      let comprobante = parseFloat(item.COMPROB) || 0;

      $_COMP.suc = item.SUCURSAL;
      $_COMP.tipo = item.TIPO;
      $_COMP.comprobante = comprobante;

      if (comprobante == 0) {
        plantillaToast("9A", "9A", null, "warning", "warning");

        if ($_USUA_GLOBAL[0].NIT == 800162035) _retomarPaciente_his(item);
        else {
          if (
            item.UNIDAD == 64 ||
            (item.UNIDAD == 65 && item.HORA.trim() != "")
          ) {
            _verificarCall(item);
          } else {
            _retomarPaciente_his(item);
          }
        }
      } else {
        if (
          item.UNIDAD == 64 ||
          (item.UNIDAD == 65 && item.HORA.trim() != "")
        ) {
          _verificarCall(item);
        } else {
          _retomarPaciente_his(item);
        }
      }
    },
  });
}

function _verificarCall(data) {
  _cargarEventos("off");
  CON851P(
    "Desea iniciar video llamada?",
    () => {
      _retomarPaciente_his(data);
    },
    () => {
      let parametros = getDataCita_his(data),
        script = {
          ruta: parametros.ruta,
          cont: `start ${parametros.url}`,
          data,
        };

      _crearScriptCall(script);
    }
  );
}

function _crearScriptCall(data) {
  fs.writeFile(data.ruta, data.cont, function (err) {
    if (err)
      console.error("Error escribiendo bat: \n\n" + err),
        _retomarPaciente_his(data.data);
    else {
      exe(data.ruta, function (err) {
        if (err)
          console.error("Error ejecutando bat: \n\n" + err),
            _retomarPaciente_his(data.data);
        else {
          fs.unlink(data.ruta, function (err) {
            if (err)
              console.error("Error eliminando bat: \n\n" + err),
                _retomarPaciente_his(data.data);
            else {
              _retomarPaciente_his(data.data);
            }
          });
        }
      });
    }
  });
}

function _retomarPaciente_his(data) {
  validarPaciente();
  setTimeout(() => {
    document.getElementById("busqpaci_his").value = data.COD;
    _enterInput("#busqpaci_his");
  }, 150);
}

function _ventanaEnvCit_his(data) {
  var fuente =
    "" +
    '<div style="width: 45%; height: 100%;text-align: center; margin: 0 auto;" id="fase_reenvio_cita">' +
    '<input style="outline: none;padding: 5px 12px;box-sizing: border-box; border: 1px solid #ccc; border-radius: 3px; text-align: center;"' +
    'id="tele_cita_his" class="form-control" type="number" autofocus data-orden="1" disabled maxlength="12" required/>' +
    "</div>";

  var popup_env_cita = bootbox.dialog({
    size: "",
    closeButton: false,
    title: "Ingrese numero de envio",
    message: fuente,
  });

  popup_env_cita.on("shown.bs.modal", function () {
    $(".bootbox #tele_cita_his").val(data.TELEF.trim()).focus();
    _validarEnvioCita(data);
  });
}

function _validarEnvioCita(data) {
  validarInputs(
    {
      form: "#fase_reenvio_cita",
      orden: "1",
    },
    () => {
      setTimeout(() => {
        bootbox.hideAll();
        validarPaciente();
      }, 250);
    },
    () => {
      var telefono = $(".bootbox #tele_cita_his").val();
      _envioCita_his(data, telefono);
    }
  );
}

function _envioCita_his(data, telefono) {
  var paramatros = getDataCita_his(data);
  var send_call = `${paramatros.api}&numero=${telefono}&mensaje=${paramatros.sms}: ${paramatros.url}`;

  var requestOptions = {
    method: "POST",
    redirect: "follow",
  };

  fetch(send_call, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      plantillaToast(
        "",
        "SMS enviado correctamente",
        null,
        "success",
        "Confirmar"
      );
      setTimeout(() => {
        bootbox.hideAll();
        validarPaciente();
      }, 250);
    })
    .catch((error) => {
      console.log("error", error);
      plantillaToast(
        "",
        "Ocurrio un error en el envio SMS",
        null,
        "error",
        "Error"
      );
    });
}

var getDataCita_his = (data) => {
  var fecha = data.FECHA.split("/").join(""),
    hora = data.HORA.split(":").join(""),
    medico = $_REG_PROF.IDENTIFICACION.trim(),
    paciente = parseFloat(data.COD).toString(),
    nombre_prof = $_REG_PROF.NOMBRE.split(" ").join("");

  if (localStorage.Unidad == "P") fecha = fecha.substr(2, 6);
  medico = medico.substr(medico.length - 6);
  paciente = paciente.substr(paciente.length - 6);

  return {
    url: `https://prosoftserver.com/c/${fecha.trim()}${hora}${medico}${paciente},${nombre_prof},2`,
    api:
      "http://www.appcontacto.com.co/wsurl?usuario=SMSPROSOFT&clave=ScPr0S0f",
    sms: "Te recordamos tu acceso TELEMEDICINA ",
    ruta: `C:\\PROSOFT\\TEMP\\${fecha.trim()}${hora}.bat`,
  };
};
