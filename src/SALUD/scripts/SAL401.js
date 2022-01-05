new Vue({
  el: "#SAL401",
  data: {
    mostrarpacientes: false,
    mostrarapertura: false,
    mostrarnacimientos: false,
    params_pacientes: {
      estado: false,
    },
    params_apertura: {
      estado: false,
    },
    params_naci: {
      estado: false,
    },
    datos_pacientes: {},
    datos_apertura: {},
    datos_naci: {},
    form: {
      unidaddeservicio_SAL401: "",
      sucursal_SAL401: "",
      clasedeserviciod_SAL401: "",
      puertaingreso_SAL401: "",
      cliented_SAL401: "",
      paciented_SAL401: "",
      sexo_SAL401: "",
      edad_SAL401: "",
      estrato_SAL401: "",
      tipoafiliacion_SAL401: "",
      ciudad_SAL401: "",
      viaacceso_SAL401: "",
      cruenta_SAL401: "",
      codigodeservicio_SAL401: "",
      codigodeserviciod_SAL401: "",
      clasearticulo_SAL401: "",
      almacen_SAL401: "",
      codlotefarmaceutico_SAL401: "",
      unidad_SAL401: "",
      convenio_SAL401: "",
      tipocopago_SAL401: "",
      tipopago_SAL401: "",
      especialidad_SAL401: "",
      especialidadd_SAL401: "",
      centrocostos_SAL401: "",
      centroccostosd_SAL401: "",
      atendidod_SAL401: "",
      solicd_SAL401: "",
      cronico_SAL401: "",
      cronicod_SAL401: "",
      claseprocedimiento_SAL401: "",
      tipoprocedimiento_SAL401: "",
      cap_SAL401: "",
      embarestado_SAL401: "",
      macro_SAL401: "",
      facturado_SAL401: "",
      nitmedicocirugiad_SAL401: "",
      ayudantiad_SAL401: "",
      anestesiad_SAL401: "",
      motivoanulacion_SAL401: "",
      paquete_SAL401: "",
      opermod_SAL401: "",
    },
    SAL401: [],
    FACTURACION: [],
    TABLALAB: [],
    ESTADO_VENTANA_COMPROBANTES: false,
    ESTADO_VENTANA_PAQUETES: false,
    ESTADO_VENTANA_DISPENSACION: false,
    dispensacion_SAL401: [],
    tabla_dispensacion_SAL401: [],
    paquetes_integrales_SAL401: [],
    tabla_paquetes_integrales_SAL401: [],
    facturas_ser825: [],
    facturas_derecha_ser825: [],
    paciente_ser825: "",
    descripTipoFact: "",
  },
  components: {
    ventana_datos_doble,
    ventanapacientes: require("../../SALUD/scripts/maestropacientes.vue.js"),
    ventanaapertura: require("../../SALUD/scripts/aperturafacturas.vue.js"),
    ventananacimiento: require("../../SALUD/scripts/ventananacimientos.vue.js"),
  },
  computed: {
    disabledBtnTabla401() {
      if (this.SAL401.OPCIONACTIVA == "09422") return false;
      else return true;
    }
  },
  created() {
    _this = this;
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    if ($_USUA_GLOBAL[0].NIT == "0800156469") {
      this.SAL401.SERVICIOS = [
        { COD: "0", DESCRIPCION: "DROGUERIA" },
        { COD: "1", DESCRIPCION: "CIRUGIAS" },
        { COD: "2", DESCRIPCION: "ECOGRAFIAS" },
        { COD: "3", DESCRIPCION: "RX - IMAGENOLOGIA" },
        { COD: "4", DESCRIPCION: "DOPPLER" },
        { COD: "5", DESCRIPCION: "T.A.C." },
        { COD: "6", DESCRIPCION: "RESONANCIA NUCLEAR" },
        { COD: "7", DESCRIPCION: "PROMOCION Y PREVENCION" },
      ];
    } else {
      this.SAL401.SERVICIOS = [
        { COD: "0", DESCRIPCION: "DROGUERIA" },
        { COD: "1", DESCRIPCION: "CIRUGIAS" },
        { COD: "2", DESCRIPCION: "LAB. Y OTROS DIAG." },
        { COD: "3", DESCRIPCION: "RX - IMAGENOLOGIA" },
        { COD: "4", DESCRIPCION: "OTROS SERVICIOS" },
        { COD: "5", DESCRIPCION: "CONSULTAS Y TERAPIAS" },
        { COD: "6", DESCRIPCION: "PATOLOGIA" },
        { COD: "7", DESCRIPCION: "PROMOCION Y PREVENCION" },
      ];
    }
    this.SAL401.BOTONEDITAR = 0;
    $_this = this;
    obtenerDatosCompletos({ nombreFd: "UNSERV" }, (data) => {
      data = data.UNSERV;
      data.pop();
      $_this.SAL401.UNSERV = data;
      $_this.SAL401.UNIDSERVICIO = [];
      for (var i in $_this.SAL401.UNSERV) {
        if ($_this.SAL401.UNSERV[i].ESTADO.trim() == "S") {
          if ($_this.SAL401.UNSERV[i].COD.trim() != "") {
            $_this.SAL401.UNIDSERVICIO.push($_this.SAL401.UNSERV[i]);
          }
        }
      }
      for (var i in $_this.SAL401.UNIDSERVICIO) {
        $_this.SAL401.UNIDSERVICIO[
          i
        ].DESCRIP = `${$_this.SAL401.UNIDSERVICIO[i].COD} - ${$_this.SAL401.UNIDSERVICIO[i].DESCRIP}`;
        $_this.SAL401.UNIDSERVICIO[i].COD = i;
      }
      $_this._validarOpcion_SAL41();
      obtenerDatosCompletos({ nombreFd: "ESPECIALIDAD" }, (data) => {
        data = data.ESPECIALIDADES;
        data.pop();
        $_this.SAL401.ESPECIALIDADES = data;
        obtenerDatosCompletos({ nombreFd: "PREFIJOS" }, (data) => {
          data = data.PREFIJOS;
          $_this.SAL401.PREFIJOS = data;
          obtenerDatosCompletos({ nombreFd: "CIUDADES" }, (data) => {
            data = data.CIUDAD;
            $_this.SAL401.CIUDADES = data;
          });
        });
      });
    });
  },

  methods: {
    _validarOpcion_SAL41() {
      this.SAL401.FACTORW = 0;
      this.SAL401.RECIENNACIDO = 0;
      this.SAL401.FECHAACT = moment().format("YYYYMMDD");
      this.SAL401.FECHAFACT = this.SAL401.FECHASIST = `20${$_USUA_GLOBAL[0].FECHALNK}`;
      loader("hide");
      OPCIONES = new Object();
      OPCIONES = {
        "09421": this._revisardato_SAL401,
        "09422": this._datosucursal_SAL401,
        "09423": this._clavedeacceso_SAL401,
        "09426": this._clavedeacceso_SAL401,
        "0974B1": this._datosucursal_SAL401,
      };
      let active = $("#navegacion").find("li.opcion-menu.active");
      this.SAL401.OPCIONACTIVA = active[0].attributes[2].nodeValue;
      console.log(this.SAL401.OPCIONACTIVA);
      let Nombreopcion = {
        "09421": "9,4,1 - Elaboración de Facturas",
        "09422": "9,4,2 - Reimprimir de Facturas",
        "09423": "9,4,3 - Anular de Facturas",
        "09426": "9,4,6 - Corrección de Facturas",
        "0974B1": "9,7,4,B,1 - Informe consulta urgencias",
      };
      if (this.SAL401.OPCIONACTIVA == "09426") this.SAL401.NOVEDADW = "8";
      else this.SAL401.NOVEDADW = "7";
      nombreOpcion(Nombreopcion[this.SAL401.OPCIONACTIVA]);
      let opcion = new Function();
      opcion = OPCIONES[active[0].attributes[2].nodeValue];
      opcion();
    },
    // CLAVE DE ACCESO PARA LA 946 Y 943
    _clavedeacceso_SAL401() {
      $_this = this;
      var ventanaclaveacceso = bootbox.dialog({
        size: "small",
        onEscape: false,
        title: "CLAVE DE ACCESO",
        message:
          '<div class="row"> ' +
          '<div class="col-md-12"> ' +
          '<div class="form-group"> ' +
          '<div class="col-md-12" id="VALIDAR1VENTANAACCESO_SAL401"> ' +
          '<input id="claveacceso_SAL401" type="text" class="form-control input-md" data-orden="1" maxlength="6"> ' +
          "</div> " +
          "</div> " +
          "</div>" +
          "</div>",
        buttons: {
          confirm: {
            label: "Aceptar",
            className: "btn-primary",
            callback: function () {
              ventanaclaveacceso.off("show.bs.modal");
              if ($_this.SAL401.OPCIONACTIVA == "09426") {
                $_this._leerimpresora_SAL401();
              } else {
                $_this._datosucursal_SAL401();
              }
            },
          },
          cancelar: {
            label: "Cancelar",
            className: "btn-danger",
            callback: function () {
              ventanaclaveacceso.off("show.bs.modal");
              _toggleNav();
            },
          },
        },
      });
      ventanaclaveacceso.init($(".modal-footer").hide());
      ventanaclaveacceso.on("shown.bs.modal", function () {
        $("#claveacceso_SAL401").focus();
      });
      this._evaluaracceso_SAL401();
    },
    _evaluaracceso_SAL401() {
      validarInputs(
        {
          form: "#VALIDAR1VENTANAACCESO_SAL401",
          orden: "1",
        },
        () => {
          $(".btn-danger").click();
        },
        () => {
          this.SAL401.CLAVEACCESO = $("#claveacceso_SAL401").val();
          if (this.SAL401.CLAVEACCESO.trim() == $_USUA_GLOBAL[0].CLAVE.trim()) {
            return $(".btn-primary").click();
          }

          CON851("03", "03", null, "error", "error");
          this._evaluaracceso_SAL401();
        }
      );
    },
    _leerimpresora_SAL401() {
      postData({ datosh: `${datosEnvio()}${localStorage.Usuario}|` }, get_url("APP/CONTAB/CON003A.DLL"))
        .then((data) => {
          postData(
            {
              datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|`,
            },
            get_url("APP/CONTAB/CON007B.DLL")
          )
            .then((data) => {
              console.debug(data);
              data = data.split("|");
              if (data[1].substring(0, 1) == "0" || data[1].substring(0, 1) == "3" || data[1].substring(0, 1) == "5") {
                if ($_USUA_GLOBAL[0].PREFIJ.trim() == "") {
                  $_USUA_GLOBAL[0].PREFIJ = "00";
                }
                return this._revisardato_SAL401();
              }
              CON851("", "Mes bloqueado", null, "error", "Error");
              _toggleNav();
            })
            .catch((error) => {
              console.error(error);
              CON851("", "Ocurrio un error con el usuario", null, "error", "Error");
              _toggleNav();
            });
        })
        .catch((err) => {
          console.error(err);
          _toggleNav();
        });
    },
    _revisardato_SAL401() {
      if ($_USUA_GLOBAL[0].FECHALNK.substring(2, 4) > 12) {
        CON851("91", "91", null, "error", "error");
        return _toggleNav();
      }

      if ($_USUA_GLOBAL[0].NIT == 844003225 || $_USUA_GLOBAL[0].NIT == 845000038) {
        $_USUA_GLOBAL[0].BARRAS = "N";
      }
      if ($_USUA_GLOBAL[0].LOTE_FARM != "S" && $_USUA_GLOBAL[0].LOTE_FARM != "N") {
        $_USUA_GLOBAL[0].LOTE_FARM = "N";
        if ($_USUA_GLOBAL[0].PUC == "4" || $_USUA_GLOBAL[0].PUC == "6") {
          $_USUA_GLOBAL[0].LOTE_FARM = "S";
        }
      }
      if ($_USUA_GLOBAL[0].PUC == "4" || $_USUA_GLOBAL[0].PUC == "6") {
        if ($_USUA_GLOBAL[0].CONTADO == "S") {
          $_USUA_GLOBAL[0].CONTADO = "N";
        }
      }
      if (($_USUA_GLOBAL[0].PUC == "4" || $_USUA_GLOBAL[0].PUC == "6") && $_USUA_GLOBAL[0].CONTADO == "S") {
        $_USUA_GLOBAL[0].CONTADO = "N";
      }

      this.SAL401.SALMINW = parseInt($_USUA_GLOBAL[0].SAL_MIN) / 30;

      let valor1 = Math.round(this.SAL401.SALMINW * 0.00117 * 100);
      // $_VALORAPROX = $_SALMINW * 0.00117;
      // var valormodw1 = $_VALORAPROX * 100;

      let valor2 = Math.round(this.SAL401.SALMINW * 0.00461 * 100);
      // $_VALORAPROX = $_SALMINW * 0.004610;
      // var valormodw2 = $_VALORAPROX * 100;

      let valor3 = Math.round(this.SAL401.SALMINW * 0.01215 * 100);
      // $_VALORAPROX = $_SALMINW * 0.01215;
      // var valormodw3 = $_VALORAPROX * 100;

      this.SAL401.VLRMODW = [valor1, valor2, valor3];
      this.SAL401.VALORBASE1 = 0;
      this.SAL401.VALORBASE2 = 0;
      this.SAL401.VALORBASE3 = 0;
      this.SAL401.VALORDESFACT = 0;
      this.SAL401.MEDCIR = "";
      this.SAL401.MEDANE = "";
      this.SAL401.MEDINS = "";
      this.SAL401.MEDAYU = "";
      this.SAL401.MULTFACT = "";
      this.SAL401.NROCIRFACT = "";
      this.SAL401.GRUPOCIRFACT = "";
      this.SAL401.CRONICO = "";
      if (this.SAL401.OPCIONACTIVA == "09426") {
        return setTimeout(this._datosucursal_SAL401, 300);
      }

      setTimeout(this._unidaddeservicio_SAL401, 300);
    },
    _unidaddeservicio_SAL401() {
      var select = "1";
      if (this.SAL401.OPCIONACTIVA == "09426") {
        for (var i in this.SAL401.UNIDSERVICIO) {
          if (this.SAL401.UNIDSERVICIO[i].COD.trim() == this.form.unidaddeservicio_SAL401.substring(0, 2).trim()) {
            select = i;
          }
        }
        select = select - 1;
      }
      POPUP(
        {
          array: this.SAL401.UNIDSERVICIO,
          titulo: "UNIDADES DE SERVICIO",
          indices: [{ id: "COD", label: "DESCRIP" }],
          teclaAlterna: true,
          seleccion: select,
          callback_f: () => {
            if (this.SAL401.OPCIONACTIVA == "09421") {
              return _toggleNav();
            }

            return this._evaluarcomprobante_SAL401();
          },
        },
        (data) => {
          this.form.unidaddeservicio_SAL401 = data.DESCRIP;
          this.SAL401.UNDEDADMAXSERV = data.EDADMAX.substring(0, 1);
          this.SAL401.VLREDADMAXSERV = data.EDADMAX.substring(1, 4);
          this.SAL401.UNDEDADMINSERV = data.EDADMIN.substring(0, 1);
          this.SAL401.VLREDADMINSERV = data.EDADMIN.substring(1, 4);
          this.SAL401.CCOSTOSERV = data.CENCOS;
          if (this.SAL401.OPCIONACTIVA == "09426") {
            return this._evaluarfechafactura_SAL401();
            // return this._evaluarprefijofactura_SAL401();
          }

          if ($_USUA_GLOBAL[0].NIT == 800037021 && localStorage.Usuario == "JASP" && data.COD < 11) {
            CON851("03", "03", null, "error", "Error");
            return this._revisardato_SAL401();
          }

          this._datosucursal_SAL401();
        }
      );
    },
    _datosucursal_SAL401() {
      console.log("datoSucursal")
      postData(
        {
          datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|`,
        },
        get_url("app/CONTAB/CON003.DLL")
      )
        .then((data) => {
          data = data.split("|");
          let OBJECT = {
            844003225: ["JL", "CA", "CS", "PV", "BC", "LC", "CV", "HT", "EM", "HY", "TL", "MR", "01"],
            800162035: ["01", "03", "05", "06", "07", "08", "10", "11", "12", "14", "15", "17"],
            830511298: [
              "01",
              "02",
              "03",
              "04",
              "05",
              "06",
              "07",
              "08",
              "09",
              "10",
              "11",
              "12",
              "13",
              "14",
              "15",
              "16",
              "17",
              "18",
              "19",
              "20",
            ],
            900405505: ["01", "02", "03", "04", "05", "06", "07", "08", "09"],
            900161116: ["01", "02", "03", "04"],
            900658867: ["01", "02", "03", "04", "05", "06", "07", "10"],
            900541158: [
              "01",
              "02",
              "03",
              "04",
              "05",
              "06",
              "07",
              "08",
              "09",
              "10",
              "11",
              "12",
              "13",
              "14",
              "15",
              "16",
              "17",
              "18",
              "19",
              "20",
              "21",
              "22",
              "23",
              "24",
              "25",
            ],
            900566047: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            900565371: ["01", "02", "03", "04", "05", "06", "07", "10"],
            901120152: [
              "01",
              "02",
              "03",
              "04",
              "05",
              "06",
              "07",
              "08",
              "09",
              "10",
              "11",
              "12",
              "13",
              "14",
              "15",
              "16",
              "17",
              "18",
              "19",
              "20",
            ],
            800156469: ["00", "01", "02", "03"],
            900641654: ["00", "01", "02", "03", "04"],
            800037979: ["00", "01", "02", "03", "04"],
            830512772: [
              "01",
              "02",
              "03",
              "04",
              "05",
              "06",
              "07",
              "08",
              "09",
              "10",
              "11",
              "12",
              "13",
              "14",
              "15",
              "16",
              "17",
              "18",
              "19",
              "20",
              "21",
              "22",
              "23",
              "24",
              "25",
              "26",
              "27",
              "28",
              "29",
              "30",
              "31",
              "32",
              "33",
              "34",
              "35",
              "36",
              "37",
              "38",
              "39",
              "40",
              "41",
              "42",
              "43",
              "44",
              "45",
              "46",
              "47",
              "48",
              "49",
              "50",
            ],
          };
          if ($_USUA_GLOBAL[0].PREFIJ.trim() == "") $_USUA_GLOBAL[0].PREFIJ == "00";

          if (localStorage.Usuario == "GEBC" || localStorage.Usuario == "ADMI") {
            return this._datosucursal2_SAL401();
          }

          let array = OBJECT[$_USUA_GLOBAL[0].NIT];
          console.log(array);
          if (array == undefined) {
            return this._datosucursal2_SAL401();
          }

          for (var i in array) {
            if (data[2].trim() == array[i]) {
              $_USUA_GLOBAL[0].PREFIJ = data[2].trim();
              return this._datosucursal2_SAL401();
            }

            if (i == array.length - 1) {
              CON851("48", "48", null, "error", "Error");
              return _toggleNav();
            }
          }
        })
        .catch((error) => {
          console.error(error);
          _toggleNav();
        });
    },
    _datosucursal2_SAL401() {
      this.form.sucursal_SAL401 = $_USUA_GLOBAL[0].PREFIJ;
      // if (localStorage.Nombre.padEnd(30,' ').substring(28,30).trim() != '') this.form.sucursal_SAL401 = localStorage.Nombre.substring(28,30)
      postData(
        {
          datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|`,
        },
        get_url("app/CONTAB/CON003.DLL")
      )
        .then((data) => {
          data = data.split("|");
          if (
            $_USUA_GLOBAL[0].NIT == 830092718 ||
            $_USUA_GLOBAL[0].NIT == 830092719 ||
            $_USUA_GLOBAL[0].NIT == 900193162
          ) {
            return this._evaluarsucursal_SAL401();
          }

          if ($_USUA_GLOBAL[0].NIT == 844003225 && data[2].trim() == "") {
            return this._evaluarsucursal_SAL401();
          }

          if ($_USUA_GLOBAL[0].NIT == 830512772) {
            return this._evaluarsucursal_SAL401();
          }

          this._evaluarclasedeservicios_SAL401();
        })
        .catch((error) => {
          console.error(error);
          _toggleNav();
        });
    },
    _evaluarsucursal_SAL401() {
      validarInputs(
        {
          form: "#VALIDAR1_SAL401",
          orden: "1",
        },
        _toggleNav,
        () => {
          if (this.SAL401.OPCIONACTIVA == "09426") {
            if ($_USUA_GLOBAL[0].NIT == 830512772) {
              let OBJECT = {
                "0830512772": [
                  "01",
                  "02",
                  "03",
                  "04",
                  "05",
                  "06",
                  "07",
                  "08",
                  "09",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15",
                  "16",
                  "17",
                  "18",
                  "19",
                  "20",
                  "21",
                  "22",
                  "23",
                  "24",
                  "25",
                  "26",
                  "27",
                  "28",
                  "29",
                  "30",
                  "31",
                  "32",
                  "33",
                  "34",
                  "35",
                  "36",
                  "37",
                  "38",
                  "39",
                ],
              };
              var validacion = OBJECT["0830512772"][this.form.sucursal_SAL401.trim()];

              if (validacion.length > 0) {
                postData(
                  { datosh: `${datosEnvio()}${this.form.sucursal_SAL401.trim()}|` },
                  get_url("APP/SALUD/SAL450-01.DLL")
                )
                  .then((data) => {
                    return this._evaluarclasedeservicios_SAL401();
                  })
                  .catch((err) => {
                    console.error(err);
                    return this._evaluarsucursal_SAL401();
                  });
              }

              CON851("48", "48", null, "error", "Error");
              return this._evaluarsucursal_SAL401();
            }

            this._evaluarclasedeservicios_SAL401();
          }

          if (
            $_USUA_GLOBAL[0].NIT == 830092718 ||
            $_USUA_GLOBAL[0].NIT == 830092719 ||
            $_USUA_GLOBAL[0].NIT == 900193162
          ) {
            let sucursales = {
              "01": "Calle 127",
              TB: "Tabora",
              KN: "Kenedy",
              ZP: "Zipaquira",
              80: "Calle 80",
              IB: "Ibague",
              SO: "Soacha",
              SC: "Santa Clara",
              SB: "Hosp.Suba",
              MP: "Medplus",
              GT: "Girardot",
              MS: "Med-Sport",
              UN: "Unicentro",
              MA: "Marly",
              CZ: "Cadiz",
              CE: "Centenario",
              CH: "Chapinero",
              MD: "Madrid",
              PT: "Ib_Platino",
              M2: "Medplus C19",
              FZ: "Funza",
            };
            if (sucursales[this.form.sucursal_SAL401] == undefined) {
              CON851("48", "48", null, "error", "Error");
              return this._evaluarsucursal_SAL401();
            }

            return this._evaluarclasedeservicios_SAL401();
          }

          if ($_USUA_GLOBAL[0].NIT == 844003225) {
            let sucursales = ["JL", "CA", "CS", "PV", "BC", "LC", "CV", "HT", "EM", "HY", "TL", "MR", "01"];
            for (var i in sucursales) {
              if (sucursales[i] == this.form.sucursal_SAL401) {
                return this._evaluarclasedeservicios_SAL401();
              }
              if (i == array.length - 1) {
                CON851("48", "48", null, "error", "Error");
                return _toggleNav();
              }
            }
          }

          if ($_USUA_GLOBAL[0].NIT == 830512772) {
            let OBJECT = {
              "0830512772": [
                "01",
                "02",
                "03",
                "04",
                "05",
                "06",
                "07",
                "08",
                "09",
                "10",
                "11",
                "12",
                "13",
                "14",
                "15",
                "16",
                "17",
                "18",
                "19",
                "20",
                "21",
                "22",
                "23",
                "24",
                "25",
                "26",
                "27",
                "28",
                "29",
                "30",
                "31",
                "32",
                "33",
                "34",
                "35",
                "36",
                "37",
                "38",
                "39",
              ],
            };
            var validacion = OBJECT["0830512772"][this.form.sucursal_SAL401.trim()];
            if (validacion.length > 0) {
              postData(
                { datosh: `${datosEnvio()}${this.form.sucursal_SAL401.trim()}|` },
                get_url("APP/SALUD/SAL450-01.DLL")
              )
                .then((data) => {
                  return this._evaluarclasedeservicios_SAL401();
                })
                .catch((err) => {
                  console.error(err);
                  return this._evaluarsucursal_SAL401();
                });
            }

            CON851("48", "48", null, "error", "Error");
            return this._evaluarsucursal_SAL401();
          }

          this._evaluarclasedeservicios_SAL401();
        }
      );
    },
    _validarsucursal_SAL401() {
      if ($_USUA_GLOBAL[0].NIT == 892000264) {
        return this._evaluarsucursal_SAL401();
      }
      this._revisardato_SAL401();
    },
    _evaluarclasedeservicios_SAL401() {
      this.SAL401.PICKER = 0;
      if (this.form.unidaddeservicio_SAL401.substring(0, 2) == "08") clasedeservicioMask_SAL401.typedValue = "7";
      let parametros = {
        estado: "on",
        msg: [
          {
            mensaje: "Oprima F1 para agendar una cita",
          },
          {
            mensaje: "Oprimar F2 para ingresar a triage",
          },
          {
            mensaje: "Oprimar F7 para crear una factura",
          },
        ],
      };
      _FloatText(parametros);
      validarInputs(
        {
          form: "#VALIDAR2_SAL401",
          orden: "1",
          event_f1: this._agendarcitas_SAL401,
          event_f2: this._triage_SAL401,
          event_f7: this._aperturadefacturas_SAL401,
        },
        () => {
          var FUNCION = new Function();
          let OPCIONES = new Object();
          OPCIONES = {
            "09421": this._revisardato_SAL401,
            "09422": this._evaluarsucursal_SAL401,
            "09423": this._evaluarsucursal_SAL401,
            "09426": this._evaluarsucursal_SAL401,
            "0974B1": this._revisardato_SAL401,
          };
          FUNCION = OPCIONES[this.SAL401.OPCIONACTIVA];
          FUNCION();
        },
        () => {
          _FloatText({ estado: "off" });
          let array = this.SAL401.SERVICIOS.filter((x) => x.COD == clasedeservicioMask_SAL401.value.trim());
          if (array.length > 0) {
            this.form.clasedeserviciod_SAL401 = array[0].DESCRIPCION;
            if (
              this.SAL401.OPCIONACTIVA == "09422" ||
              this.SAL401.OPCIONACTIVA == "09423" ||
              this.SAL401.OPCIONACTIVA == "09426" ||
              this.SAL401.OPCIONACTIVA == "0974B1"
            ) {
              return this._consultarpermisos_SAL401();
            }
            if (
              this.form.unidaddeservicio_SAL401.substring(0, 2) == "08" &&
              clasedeservicioMask_SAL401.value != "7" &&
              clasedeservicioMask_SAL401.value != "0"
            ) {
              CON851("B1", "B1", null, "error", "Error");
              return this._evaluarclasedeservicios_SAL401();
            }
            if (
              clasedeservicioMask_SAL401.value == "7" &&
              this.form.unidaddeservicio_SAL401.substring(0, 2) != "06" &&
              this.form.unidaddeservicio_SAL401.substring(0, 2) != "08" &&
              this.form.unidaddeservicio_SAL401.substring(0, 2) != "63" &&
              this.form.unidaddeservicio_SAL401.substring(0, 2) != "09" &&
              this.form.unidaddeservicio_SAL401.substring(0, 2) != "64" &&
              this.form.unidaddeservicio_SAL401.substring(0, 2) != "65"
            ) {
              CON851("03", "03", null, "error", "error");
              return this._evaluarclasedeservicios_SAL401();
            }
            return this._consultarpermisos_SAL401();
          }
          CON851("03", "03", null, "error", "error");
          this._evaluarclasedeservicios_SAL401();
        }
      );
    },
    _consultarpermisos_SAL401() {
      this.SAL401.CONTEO = 0;
      this.SAL401.SWBLOQFECHA = "N";
      if (
        clasedeservicioMask_SAL401.value.trim() == "0" &&
        ($_USUA_GLOBAL[0].NIT == 892000401 ||
          $_USUA_GLOBAL[0].NIT == 900648993 ||
          $_USUA_GLOBAL[0].NIT == 900755133 ||
          $_USUA_GLOBAL[0].NIT == 900804411 ||
          $_USUA_GLOBAL[0].NIT == 900870633) &&
        this.form.sucursal_SAL401.trim() < 02
      ) {
        this.SAL401.SWBLOQFECHA = "S";
      }
      this._revisarpermisos_SAL401(
        this._buscarsecuencia_SAL401,
        () => {
          setTimeout(this._unidaddeservicio_SAL401, 300);
        },
        (datos = { CODIGO: `I41${clasedeservicioMask_SAL401.value.trim()}|` })
      );
    },
    _buscarsecuencia_SAL401() {
      this.SAL401.SECU2NUM = clasedeservicioMask_SAL401.value.trim();
      this.SAL401.SECU1NUM = "8";
      if ($_USUA_GLOBAL[0].NIT == 830092718 || $_USUA_GLOBAL[0].NIT == 830092719 || $_USUA_GLOBAL[0].NIT == 900193162) {
        let secuencia = {
          KN: "K",
          TB: "t",
          ZP: "z",
          IB: "x",
          SO: "s",
          SC: "c",
          GT: "g",
          MS: "m",
          UN: "u",
          80: "0",
          MA: "m",
          CZ: "k",
          CE: "l",
          CH: "h",
          MD: "d",
          PT: "P",
        };
        array = secuencia[this.form.sucursal_SAL401.trim()];
        if (array == undefined) array = "8";
        this.SAL401.SECU1NUM = array;
      }
      if ($_USUA_GLOBAL[0].NIT == 844003225) {
        let secuencia = { "01": "8", JL: "a", CA: "c", BC: "b", CV: "v", PV: "p", CS: "s", HY: "h", TL: "i", MR: "j" };
        array = secuencia[this.form.sucursal_SAL401.trim()];
        this.SAL401.SECU1NUM = array;
      }
      if (
        $_USUA_GLOBAL[0].NIT == 800162035 ||
        $_USUA_GLOBAL[0].NIT == 900566047 ||
        $_USUA_GLOBAL[0].NIT == 900658867 ||
        $_USUA_GLOBAL[0].NIT == 900541148
      ) {
        let secuencia = {
          "02": "a",
          "03": "b",
          "05": "d",
          "06": "e",
          "07": "f",
          "08": "g",
          "09": "h",
          10: "i",
          11: "j",
          12: "k",
          13: "l",
          14: "m",
          15: "n",
          16: "o",
          17: "p",
          18: "q",
          19: "r",
          20: "s",
        };
        array = secuencia[this.form.sucursal_SAL401.trim()];
        this.SAL401.SECU1NUM = array;
      }
      if ($_USUA_GLOBAL[0].NIT == 830512772) {
        let secuencia = {
          "02": "a",
          "03": "b",
          "05": "d",
          "06": "e",
          "07": "f",
          "08": "g",
          "09": "h",
          10: "i",
          11: "j",
          12: "k",
          13: "l",
          14: "m",
          15: "n",
          16: "o",
          17: "p",
          18: "q",
          19: "r",
          20: "s",
          21: "t",
          22: "v",
          23: "w",
          24: "x",
          25: "y",
          26: "z",
          27: "A",
          28: "B",
          29: "C",
          30: "D",
          31: "E",
          32: "F",
          33: "G",
          34: "H",
          35: "I",
          36: "J",
          37: "K",
          38: "L",
          39: "M",
          40: "N",
          41: "O",
          42: "P",
          43: "Q",
          44: "R",
          45: "S",
          46: "T",
          47: "W",
          48: "V",
          49: "X",
          50: "Y",
        };
        array = secuencia[this.form.sucursal_SAL401.trim()];
        this.SAL401.SECU1NUM = array;
      }
      if (this.SAL401.OPCIONACTIVA == "09421") {
        postData(
          { datosh: `${datosEnvio()}${this.SAL401.SECU1NUM}${this.SAL401.SECU2NUM}` },
          get_url("APP/CONTAB/CON007.DLL")
        )
          .then((data) => {
            data = data.split("|");
            comprobanteMask_SAL401.typedValue = parseInt(data[1].substring(3, 9)).toString();
            if ($_USUA_GLOBAL[0].NIT == 900193162 || $_USUA_GLOBAL[0].NIT == 830512772) {
              return this._leernumero_SAL401();
            }
            if (data[1].substring(3, 9) < 1000) {
              postData(
                {
                  datosh: `${datosEnvio()}${this.form.sucursal_SAL401.trim()}${clasedeservicioMask_SAL401.value.trim()}${comprobanteMask_SAL401.value
                    .trim()
                    .padStart(6, "0")}|`,
                },
                get_url("APP/SALUD/SAL401C.DLL")
              )
                .then((data) => {
                  console.debug(data);
                  data = data.CONSULTA;
                  data.pop();
                  return this._leernumero_SAL401();
                })
                .catch((err) => {
                  console.error(err);
                  return this._evaluarclasedeservicios_SAL401();
                });
            } else {
              return this._leernumero_SAL401();
            }
          })
          .catch((err) => {
            console.error(err);
            return this._evaluarclasedeservicios_SAL401();
          });
      } else {
        this._consultarconsecutivo_SAL401(
          this._evaluarcomprobante_SAL401,
          this._evaluarsucursal_SAL401,
          `${this.SAL401.SECU1NUM}${this.SAL401.SECU2NUM}`
        );
      }
    },
    _leernumero_SAL401() {
      if ($_USUA_GLOBAL[0].NIT == 891855847 && $_USUA_GLOBAL[0].FECHALNK.substring(0, 2) == "10") {
        return this._evaluarcomprobante_SAL401();
      }
      this._validarcomprobante_SAL401();
    },
    _evaluarcomprobante_SAL401() {
      comprobanteMask_SAL401.typedValue = (parseInt(comprobanteMask_SAL401.value) - 1).toString();
      validarInputs(
        {
          form: "#VALIDAR3_SAL401",
          orden: "1",
        },
        this._evaluarclasedeservicios_SAL401,
        this._validarcomprobante_SAL401
      );
    },
    _validarcomprobante_SAL401() {
      if (this.SAL401.OPCIONACTIVA == "09421") {
        postData(
          {
            datosh: `${datosEnvio()}1|${this.form.sucursal_SAL401.trim()}${clasedeservicioMask_SAL401.value.trim()}${comprobanteMask_SAL401.value
              .trim()
              .padStart(6, "0")}|`,
          },
          get_url("APP/SALUD/SAL401.DLL")
        )
          .then((data) => {
            console.debug(data);
            comprobanteMask_SAL401.typedValue = (parseInt(comprobanteMask_SAL401.value.trim()) + 1).toString();
            this._leernumero_SAL401();
          })
          .catch((err) => {
            console.error(err);
            if (err.MENSAJE == "01") {
              this._encabezar_SAL401();
            } else {
              this._evaluarclasedeservicios_SAL401();
            }
          });
      } else {
        postData(
          {
            datosh: `${datosEnvio()}${this.form.sucursal_SAL401.trim()}${clasedeservicioMask_SAL401.value.trim()}${comprobanteMask_SAL401.value
              .trim()
              .padStart(6, "0")}|`,
          },
          get_url("APP/SALUD/SAL450A.DLL")
        )
          .then((data) => {
            this.FACTURACION = [];
            this.SAL401.COMPROBANTE = data.FACTURA[0];

            if ((this.SAL401.OPCIONACTIVA == "09426" || this.SAL401.OPCIONACTIVA == "09423") && this.SAL401.COMPROBANTE.CUFE_ELEC_NUM.trim()) {
              console.error("El comprobante tiene CUFE, no se puede modificar!");
              CON851("", "El comprobante tiene CUFE, no se puede modificar!", null, "error", "");
              if (localStorage.Usuario != "GEBC") return this._evaluarclasedeservicios_SAL401();
            }

            postData(
              {
                datosh: `${datosEnvio()}3|${prefijofacturaMask_SAL401.value.trim()}${numerofacturaMask_SAL401.value
                  .trim()
                  .padStart(6, "0")}||${clienteMask_SAL401.unmaskedValue.padStart(10, "0")}|`,
              },
              get_url("APP/SALUD/SAL401.DLL")
            )
              .then((data) => {
                console.log(data);
                this.SAL401.CLIENTE = data.TERCERO[0];
              })
              .catch((err) => {
                console.error(err);
              });
            console.log(data, this.SAL401.COMPROBANTE);
            clasedeservicioMask_SAL401.typedValue = data.FACTURA[0].CLASE.substring(0, 1);
            this.form.clasedeserviciod_SAL401 = data.FACTURA[0].CLASE.substring(3, 15);
            this.form.sucursal_SAL401 = data.FACTURA[0].SUC;
            comprobanteMask_SAL401.typedValue = parseInt(data.FACTURA[0].NRO).toString();
            prefijofacturaMask_SAL401.typedValue = data.FACTURA[0].PREFIJO;
            numerofacturaMask_SAL401.typedValue = parseInt(data.FACTURA[0].NRO_CTA);
            this.form.puertaingreso_SAL401 = `${data.FACTURA[0].PUERTA_ESTAD} ${data.FACTURA[0].DESCRIP_PUERTA}`;
            clienteMask_SAL401.typedValue = parseInt(data.FACTURA[0].NIT).toString();
            this.form.cliented_SAL401 = data.FACTURA[0].DESCRIP_TER;
            idhistoriafactMask_SAL401.typedValue = data.FACTURA[0].ID_PACIENTE;
            // this.form.paciented_SAL401 = data.FACTURA[0].DESCRIP_PACI;
            this.form.sexo_SAL401 = data.FACTURA[0].SEXO;
            this.form.edad_SAL401 = data.FACTURA[0].EDAD;
            for (var i in data.FACTURA[0].TABLA) {
              if (data.FACTURA[0].TABLA[i].ARTICULO.trim() != "") {
                this.FACTURACION.push({
                  ARTICULO: data.FACTURA[0].TABLA[i].ARTICULO,
                  DESCRIPCIONART: data.FACTURA[0].TABLA[i].DESCRIP_ART,
                  ALMACEN: data.FACTURA[0].TABLA[i].ALMACEN,
                  CANTIDAD: data.FACTURA[0].TABLA[i].CANTIDAD,
                  UNIDAD: data.FACTURA[0].TABLA[i].UNIDAD,
                  VALORUNIT: data.FACTURA[0].TABLA[i].VALOR_UNIT,
                  VALORTOTAL: data.FACTURA[0].TABLA[i].VALOR_FACT,
                  CODIGOLOTE: data.FACTURA[0].TABLA[i].COD_LOTE,
                  DIASTRATA: data.FACTURA[0].TABLA[i].DIASTRATAFACT,
                });
              }
            }
            netofacturaMask_SAL401.typedValue = parseInt(data.FACTURA[0].VALOR_BRUTO.replace(/,/g, "")).toString();
            if (isNaN(parseInt(data.FACTURA[0].COPAGO_ESTIM_PAGO))) data.FACTURA[0].COPAGO_ESTIM_PAGO = "0.00";
            copagoestimfactMask_SAL401.typedValue = parseInt(
              data.FACTURA[0].COPAGO_ESTIM_PAGO.replace(/,/g, "")
            ).toString();
            valortotalcomprobanteMask_SAL401.typedValue = (
              parseInt(data.FACTURA[0].VALOR_BRUTO.replace(/,/g, "")) -
              parseInt(data.FACTURA[0].COPAGO_ESTIM_PAGO.replace(/,/g, ""))
            ).toString();
            this.form.especialidad_SAL401 = data.FACTURA[0].ESPEC;
            this.form.especialidadd_SAL401 = data.FACTURA[0].DESCRIP_ESPEC;
            this.form.centrocostos_SAL401 = data.FACTURA[0].COSTO_FACT;
            this.form.centroccostosd_SAL401 = data.FACTURA[0].DESCRIP_TAR;
            atendidoMask_SAL401.typedValue = parseInt(data.FACTURA[0].MED_OTR_FACT).toString();
            if (this.SAL401.OPCIONACTIVA == "09423") {
              $("#MOTIVOANUL_SAL401").removeClass("hidden");
              this.form.motivoanulacion_SAL401 = data.FACTURA[0].DETALLE_FACT.trim();
            } else {
              $("#MOTIVOANUL_SAL401").addClass("hidden");
            }
            this.form.atendidod_SAL401 = data.FACTURA[0].DESCRIP_MED1;
            solicitanteMask_SAL401.typedValue = parseInt(data.FACTURA[0].REMITE_FACT).toString();
            postData(
              {
                datosh: `${datosEnvio()}3|${prefijofacturaMask_SAL401.value.trim()}${numerofacturaMask_SAL401.value
                  .trim()
                  .padStart(6, "0")}||${clienteMask_SAL401.unmaskedValue.padStart(10, "0")}|`,
              },
              get_url("APP/SALUD/SAL401.DLL")
            )
              .then((data) => {
                console.log(data);
                this.SAL401.CLIENTE = data.TERCERO[0];
              })
              .catch((err) => {
                console.error(err);
              });
            this.form.solicd_SAL401 = data.FACTURA[0].DESCRIP_MED2;
            this.form.estrato_SAL401 = data.FACTURA[0].ESTRATO;
            this.form.ciudad_SAL401 = data.FACTURA[0].CIUDAD_PACI;
            fechafacturaMask_SAL401 = IMask($("#fecha_SAL401")[0], {
              mask: Date,
              pattern: "Y-m-d",
              lazy: true,
              blocks: {
                Y: { mask: IMask.MaskedRange, placeholderChar: "Y", from: anofact, to: anofact, maxLength: 4 },
                m: {
                  mask: IMask.MaskedRange,
                  placeholderChar: "m",
                  from: data.FACTURA[0].FECHA.substring(4, 6),
                  to: data.FACTURA[0].FECHA.substring(4, 6),
                  maxLength: 2,
                },
                d: { mask: IMask.MaskedRange, placeholderChar: "d", from: "01", to: "31", maxLength: 2 },
              },
              format: function (date) {
                return moment(date).format("YYYY-MM-DD");
              },
              parse: function (str) {
                var fecha = moment(str).format("YYYY-MM-DD");
                return str;
              },
            });

            fechafacturaMask_SAL401.typedValue = data.FACTURA[0].FECHA;
            let unidadservicio = this.SAL401.UNIDSERVICIO.filter(
              (x) => x.DESCRIP.substring(0, 2) == data.FACTURA[0].UNIDAD_SERVICIO.trim()
            );
            if (unidadservicio.length == 0) unidadservicio.push({ DESCRIP: "", EDADMAX: " 000", EDADMIN: " 000" });
            this.form.unidaddeservicio_SAL401 = unidadservicio[0].DESCRIP;
            this.SAL401.UNDEDADMAXSERV = unidadservicio[0].EDADMAX.substring(0, 1);
            this.SAL401.VLREDADMAXSERV = unidadservicio[0].EDADMAX.substring(1, 4);
            this.SAL401.UNDEDADMINSERV = unidadservicio[0].EDADMIN.substring(0, 1);
            this.SAL401.VLREDADMINSERV = unidadservicio[0].EDADMIN.substring(1, 4);
            this.SAL401.FECHAINGESTAD = data.FACTURA[0].FECHA_ING;
            this.SAL401.VALORDESFACT = data.FACTURA[0].VALORDES;
            this.SAL401.TIPOCOPAGO = data.FACTURA[0].TIPOCOPAGO;
            this.SAL401.GRUPOCIRFACT = data.FACTURA[0].GRUPOCIR;
            this.SAL401.FECHAELAB = data.FACTURA[0].FECHA_ELAB;
            this.SAL401.OPERELAB = data.FACTURA[0].OPER_ELAB;
            this.SAL401.OPERCORREC = data.FACTURA[0].OPER_CORREC;
            $("#OPERCREA_SAL401").removeClass("hidden");
            $("#OPERMOD_SAL401").removeClass("hidden");
            this.SAL401.FECHACORREC = moment().format("YYYYMMDD");
            this.SAL401.HORACORREC = moment().format("HHmm");
            this.form.opercrea_SAL401 = `OPER CREA     ${this.SAL401.OPERELAB}   ${this.SAL401.FECHAELAB}`;
            this.form.opermod_SAL401 = `OPER MOD    ${this.SAL401.OPERCORREC}   ${data.FACTURA[0].FECHA_CORREC}`;
            this.SAL401.HORAELAB = data.FACTURA[0].HORA_ELAB;
            this.SAL401.HORAATENESTAD = `${data.FACTURA[0].HR_ATEN}${data.FACTURA[0].MN_ATEN}`;
            // this.SAL401.OPERCORREC = localStorage.Usuario;
            this.SAL401.CAUSA = data.FACTURA[0].CAUSA_ESTAD;
            this.form.convenio_SAL401 = data.FACTURA[0].TARIF;
            $("#EMBARAZO_SAL401").removeClass("hidden");
            this.SAL401.EMBARESTAD = data.FACTURA[0].EMBAR.substring(0, 1);
            this.form.embarestado_SAL401 = data.FACTURA[0].EMBAR;
            this.SAL401.PERSONALELAB = data.FACTURA[0].PERSONAL_ELAB;
            $("#CLASEPROCE_SAL401").removeClass("hidden");
            this.form.claseprocedimiento_SAL401 = data.FACTURA[0].CLASE_PROC;
            this.SAL401.CLASEPROC = data.FACTURA[0].CLASE_PROC.substring(0, 1);
            $("#TIPOPROCEDIMIENTO_SAL401").removeClass("hidden");
            this.form.tipoprocedimiento_SAL401 = data.FACTURA[0].TIPO_PROC;
            this.SAL401.TIPOPROC = data.FACTURA[0].TIPO_PROC.substring(0, 1);
            $("#FINALIDADESTADO_SAL401").removeClass("hidden");
            this.SAL401.FINALIDESTAD = data.FACTURA[0].FINALID.substring(0, 1);
            this.form.finalidadestado_SAL401 = data.FACTURA[0].FINALID;
            this.SAL401.FECHASALESTAD = data.FACTURA[0].FECHA_SAL_ESTAD;
            this.SAL401.HORASALESTAD = data.FACTURA[0].HORA_SALID;
            this.SAL401.ESPECREMI = data.FACTURA[0].ESPEC_REMITE;
            this.SAL401.TIPODRFACT = data.FACTURA[0].TIPO_DR;
            if (clasedeservicioMask_SAL401.value == "0" && this.SAL401.TIPODRFACT == "2")
              this.SAL401.CONTEO = this.FACTURACION.length;
            this.SAL401.MACRO = data.FACTURA[0].MACRO_FACT;
            this.SAL401.CUPPAQINT = data.FACTURA[0].CUP_PAQ_INT;
            this.form.paqueteint_SAL401 = this.SAL401.CUPPAQINT;
            if (this.SAL401.CUPPAQINT > 0) this.form.paquete_SAL401 = "S";
            this.SAL401.ORDSERVFACT = data.FACTURA[0].ORDSERV;
            this.SAL401.CRONICO = data.FACTURA[0].CRONICO;
            this.SAL401.PENDIENTE = data.FACTURA[0].PENDIENTE;
            this.SAL401.NROPENDI = data.FACTURA[0].NROPENDI;
            this.SAL401.FECHAPENDI = data.FACTURA[0].FECHAPENDI;
            this.SAL401.HORAPENDI = data.FACTURA[0].HORAPENDI;
            this.SAL401.CANTPENDI = data.FACTURA[0].CANTPENDI;
            this.SAL401.TIPOPENDI = data.FACTURA[0].TIPOPENDI;
            this.SAL401.FACTAUTOFACT = data.FACTURA[0].FACTAUTO;
            this.SAL401.VLRIVA1FACT = data.FACTURA[0].VLRIVA1;
            this.SAL401.VLRIVA2FACT = data.FACTURA[0].VLRIVA2;
            this.SAL401.VLRIVA3FACT = data.FACTURA[0].VLRIVA3;
            this.SAL401.ORDSALIDAFACT = data.FACTURA[0].ORDSALIDA;
            this.SAL401.VLRUPC = data.FACTURA[0].VLRUPC;
            this.SAL401.FECHAACCIDRIPS = data.FACTURA[0].FECHAACCID;
            this.SAL401.EMPRESAPACIRIPS = data.FACTURA[0].EMPRESARIPS;
            this.SAL401.CONTROLCAP = data.FACTURA[0].CONTROL_CAP;
            this.SAL401.FPAGO = data.FACTURA[0].F_PAGO;
            this.SAL401.NROFORMFACT = data.FACTURA[0].NRO_FORM;
            this.SAL401.NROAUTOR = data.FACTURA[0].NRO_AUTOR_ELAB;
            this.SAL401.DETALLE = data.FACTURA[0].DETALLE_FACT;
            this.SAL401.MEDCIR = data.FACTURA[0].MEDCIR;
            this.SAL401.MEDAYU = data.FACTURA[0].MEDAYU;
            this.SAL401.MEDANE = data.FACTURA[0].MEDANE;
            this.SAL401.MEDINS = data.FACTURA[0].MEDINS;
            $("#FACTURADO_SAL401").removeClass("hidden");
            this.form.facturado_SAL401 = data.FACTURA[0].SECU_ABON.substring(0, 8);
            if (clasedeservicioMask_SAL401.value == "2" || clasedeservicioMask_SAL401.value == "7")
              this.TABLALAB = data.FACTURA[0].TABLA;
            postData(
              { datosh: `${datosEnvio()}${idhistoriafactMask_SAL401.unmaskedValue.padStart(15, "0")}||` },
              get_url("APP/SALUD/SER810-1.DLL")
            )
              .then((data) => {
                console.log(data);
                this.SAL401.PACIENTE = data["REG-PACI"][0];
                this.SAL401.PACIENTE.EDAD = calcular_edad(moment(this.SAL401.PACIENTE.NACIM).format("YYYY-MM-DD"));
                console.log(this.SAL401.PACIENTE["APELL-PACI1"]);
                this.SAL401.PACIENTE.DESCRIP = `${this.SAL401.PACIENTE["APELL-PACI1"]
                  .trim()
                  .padStart(15, " ")}${this.SAL401.PACIENTE["APELL-PACI2"]
                  .trim()
                  .padStart(15, " ")}${this.SAL401.PACIENTE["NOM-PACI1"]
                  .trim()
                  .padStart(12, " ")}${this.SAL401.PACIENTE["NOM-PACI2"].trim().padStart(12, " ")}`;
                this.form.paciented_SAL401 = this.SAL401.PACIENTE.DESCRIP;
                let opcion2 = new Function();
                let OPCIONES2 = {
                  "09422": this._pareimpresion_SAL401,
                  "09423": this._confirmarborrar_SAL401,
                  "09426": this._unidaddeservicio_SAL401,
                  "0974B1": () => {
                    if (
                      clasedeservicioMask_SAL401.value == "1" ||
                      clasedeservicioMask_SAL401.value == "4" ||
                      clasedeservicioMask_SAL401.value == "5" ||
                      clasedeservicioMask_SAL401.value == "7" ||
                      (clasedeservicioMask_SAL401.value == "0" && this.FACTURACION[0].ARTICULO.substring(0, 2) == "MO")
                    ) {
                      if (
                        this.form.especialidad_SAL401.trim() == "250" ||
                        this.form.especialidad_SAL401.trim() == "460" ||
                        this.form.especialidad_SAL401.trim() == "461" ||
                        this.form.especialidad_SAL401.trim() == "462" ||
                        this.form.especialidad_SAL401.trim() == "463" ||
                        this.form.especialidad_SAL401.trim() == "464" ||
                        this.form.especialidad_SAL401.trim() == "510" ||
                        this.form.especialidad_SAL401.trim() == "220"
                      ) {
                        postData(
                          {
                            datosh: `${datosEnvio()}${this.form.sucursal_SAL401}${
                              clasedeservicioMask_SAL401.value
                            }${comprobanteMask_SAL401.value.padStart(6, "0")}|`,
                          },
                          get_url("APP/SALUD/SER448O.DLL")
                        )
                          .then((data) => {
                            console.debug(data);
                            this._evaluarimpresion_SER4B1();
                          })
                          .catch((err) => {
                            console.error(err);
                            CON851(
                              "",
                              "Hubo un problema guardando en RIPS",
                              this._validarSER4B1_SAL401(),
                              "error",
                              "Error"
                            );
                          });
                      } else {
                        postData(
                          {
                            datosh: `${datosEnvio()}${this.form.sucursal_SAL401}${
                              clasedeservicioMask_SAL401.value
                            }${comprobanteMask_SAL401.value.padStart(6, "0")}|`,
                          },
                          get_url("APP/SALUD/SER448C.DLL")
                        )
                          .then((data) => {
                            console.debug(data);
                            this._evaluarimpresion_SER4B1();
                          })
                          .catch((err) => {
                            console.error(err);
                            CON851(
                              "",
                              "Hubo un problema guardando RIPS",
                              this._validarSER4B1_SAL401(),
                              "error",
                              "Error"
                            );
                          });
                      }
                    } else {
                      this._evaluarimpresion_SER4B1();
                    }
                  },
                };
                if (clasedeservicioMask_SAL401.value == "0") {
                  postData(
                    {
                      datosh: `${datosEnvio()}7||||||0${this.FACTURACION[0].ARTICULO.substring(
                        0,
                        15
                      )}${this.FACTURACION[0].ARTICULO.substring(15, 17)}|`,
                    },
                    get_url("APP/SALUD/SAL401.DLL")
                  )
                    .then((data) => {
                      this.SAL401.ARTICULO = data;
                      this.form.codigodeserviciod_SAL401 = data.DESCRIPCION;
                      this.form.unidad_SAL401 = data.UNIDAD_ART;
                      if (data.DESCRIPCION.substring(0, 1) == "*" && this.SAL401.TIPODRFACT) {
                        CON851("13", "13", null, "error", "Error");
                      } else if (this.SAL401.NUMERACION.ARTIVA_NUM == "N" && data.IVA != 0 && data.IVA.trim() != "") {
                        CON851("7Z", "7Z", null, "error", "Error");
                      } else if (
                        prefijofacturaMask_SAL401.value != "C" &&
                        prefijofacturaMask_SAL401.value != "E" &&
                        prefijofacturaMask_SAL401.value != "Ñ" &&
                        prefijofacturaMask_SAL401.value != "U" &&
                        this.SAL401.NUMERACION.CLASIF_NUM == "1" &&
                        this.form.codigodeservicio_SAL401.trim().substring(0, 2) != "PO" &&
                        this.form.codigodeservicio_SAL401.trim().substring(0, 2) != "MQ"
                      ) {
                        CON851("7H", "7H", null, "error", "Error");
                      } else if (
                        prefijofacturaMask_SAL401.value != "C" &&
                        prefijofacturaMask_SAL401.value != "E" &&
                        prefijofacturaMask_SAL401.value != "Ñ" &&
                        prefijofacturaMask_SAL401.value != "U" &&
                        this.SAL401.NUMERACION.CLASIF_NUM == "1" &&
                        this.form.codigodeservicio_SAL401.trim().substring(0, 2) != "NP" &&
                        this.form.codigodeservicio_SAL401.trim().substring(0, 2) != "MQ" &&
                        this.form.codigodeservicio_SAL401.trim().substring(0, 2) != "CO"
                      ) {
                        CON851("7H", "7H", null, "error", "Error");
                      } else {
                        this.SAL401.IVAART = data.IVA;
                        this.SAL401.VLRPROMEDW = 0;
                        if (data.IVA == 0) this.SAL401.TARIVA = 0;
                        if (data.IVA == 1) this.SAL401.TARIVA = $_USUA_GLOBAL[0].IVA1;
                        if (data.IVA == 2) this.SAL401.TARIVA = $_USUA_GLOBAL[0].IVA2;
                        if (data.IVA == 3) this.SAL401.TARIVA = $_USUA_GLOBAL[0].IVA3;
                        if (this.SAL401.CONVENIO.BASE_MED == 1) {
                          let prefijo = this.SAL401.PREFIJOS.TABLA.filter(
                            (x) => x.PREFIJO.trim() == prefijofacturaMask_SAL401.value.trim()
                          );
                          if (!prefijo) this.SAL401.ALMPREF = "ALM01";
                          else this.SAL401.ALMPREF = prefijo[0].ALMACEN;
                        } else if (this.SAL401.CONVENIO.BASE_MED == 2) {
                          this.SAL401.VLRPROMEDW = 0;
                          this.SAL401.ARTICULOS.VR_VENTA1 = data.VLR_ULT_COMPRA;
                        } else if (this.SAL401.CONVENIO.BASE_MED == 4) {
                          this.SAL401.VLRPROMEDW = 0;
                          if (data.REF > 0) {
                            this.SAL401.ARTICULO.VR_VENTA1 = data.REF;
                          }
                        }
                      }
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                } else {
                  postData(
                    {
                      datosh: `${datosEnvio()}2|${this.form.sucursal_SAL401.trim()}${clasedeservicioMask_SAL401.value.trim()}${comprobanteMask_SAL401.value
                        .trim()
                        .padStart(6, "0")}|${this.form.convenio_SAL401.substring(0, 2)}|`,
                    },
                    get_url("APP/SALUD/SAL401.DLL")
                  )
                    .then((data) => {
                      console.log(data);
                      this.SAL401.CONVENIO = data.TARIFA[0];
                      if (clasedeservicioMask_SAL401.value.trim() == "0") {
                        this.SAL401.CODTABW = this.SAL401.NUMERACION.CONVENIO_NUM;
                        if (parseFloat(this.SAL401.CONVENIO.PORC_PO) == 0) {
                          this.SAL401.CONVENIO.PORC_PO = "100.00";
                          this.SAL401.CONVENIO.BASE_MED = "3";
                        }
                        if (parseFloat(this.SAL401.CONVENIO.PORC_NP) == 0) {
                          this.SAL401.CONVENIO.PORC_NP = this.SAL401.CONVENIO.PORC_PO;
                        }
                        if (parseFloat(this.SAL401.CONVENIO.PORC_MO) == 0) {
                          this.SAL401.CONVENIO.PORC_MO = this.SAL401.CONVENIO.PORC_NP;
                        }
                        if (parseFloat(this.SAL401.CONVENIO.PORC_MQ) == 0) {
                          this.SAL401.CONVENIO.PORC_MQ = this.SAL401.CONVENIO.PORC_MO;
                        }
                      } else {
                        if (clasedeservicioMask_SAL401.value.trim() == "7") {
                          this.SAL401.SWCL = "5";
                        } else {
                          this.SAL401.SWCL = clasedeservicioMask_SAL401.value.trim();
                        }
                        if (
                          !isNaN(parseInt(this.SAL401.CONVENIO.SAL_MIN)) ||
                          parseInt(this.SAL401.CONVENIO.SAL_MIN) == 0 ||
                          this.SAL401.CONVENIO.SAL_MIN.trim() == ""
                        ) {
                          this.SAL401.CONVENIO.SAL_MIN = this.SAL401.SALMINW;
                        }
                        this.SAL401.TIPOTABW = clasedeservicioMask_SAL401.value.trim();
                        this.SAL401.CODTABW = this.SAL401.CONVENIO.TABLA_TAB[parseInt(this.SAL401.SWCL) - 1].CODTABTAR;
                      }
                      this.form.convenio_SAL401 = `${this.SAL401.CONVENIO.COD} ${this.SAL401.CONVENIO.DESCRIP}`;
                      // SELECCION DE PUERTA DE INGRESO
                      postData(
                        {
                          datosh: `${datosEnvio()}8||||||${this.FACTURACION[0].ARTICULO.substring(
                            0,
                            15
                          )}|${idhistoriafactMask_SAL401.unmaskedValue.trim().padStart(15, "0")}|${
                            this.SAL401.PACIENTE.EDAD.unid_edad
                          }${this.SAL401.PACIENTE.EDAD.vlr_edad.toString().padStart(3, "0")}|${
                            prefijofacturaMask_SAL401.value
                          }${numerofacturaMask_SAL401.value.trim().padStart(6, "0")}|${this.SAL401.CODTABW}${
                            this.SAL401.TIPOTABW
                          }||||||||${fechafacturaMask_SAL401.value.replace(/-/g, "")}|`,
                        },
                        get_url("APP/SALUD/SAL401.DLL")
                      )
                        .then((data) => {
                          this.SAL401.ARTICULO = data;
                          this.form.codigodeserviciod_SAL401 = data.DESCRIPCION;
                          if (data.FORMALIQ.trim() == "1")
                            this.SAL401.VLRUNITW =
                              parseFloat(data.MONTO) * parseFloat(this.SAL401.CONVENIO.TABLA_TAR[29].HNQUIRTAR);
                          else if (data.FORMALIQ.trim() == "2") this.SAL401.VLRUNITW = parseFloat(data.MONTO);
                          else if (data.FORMALIQ.trim() == "3") this.SAL401.VLRUNITW = parseFloat(data.MONTO);
                          else if (data.FORMALIQ.trim() == "4") {
                            if (
                              $_USUA_GLOBAL[0].NIT == 892000401 ||
                              $_USUA_GLOBAL[0].NIT == 900475095 ||
                              $_USUA_GLOBAL[0].NIT == 900708318
                            ) {
                              this.SAL401.FACTORW = 1;
                              this.SAL401.SWAPR = 100;
                              this.SAL401.VLRUNITW = parseFloat(data.MONTO) * this.SAL401.CONVENIO.SAL_MIN;
                              this.SAL401.VLRUNITW = (this.SAL401.VLRUNITW * 1) / 100;
                              this.SAL401.VLRUNITW = this.SAL401.VLRUNITW * 100;
                            } else {
                              this.SAL401.VLRUNITW = data.MONTO * this.SAL401.CONVENIO.SAL_MIN;
                            }
                          } else if (data.FORMALIQ.trim() == "5") {
                            let primero = this.FACTURACION[0].ARTICULO;
                            if (!primero) primero = 0;
                            this.SAL401.VLRUNITW = (parseFloat(data.MONTO) * primero) / 100;
                          } else {
                            this.SAL401.SWAPR = 1;
                            this.SAL401.VLRUNITW = data.MONTO;
                          }
                          if (data.LLAVETIPO.trim() == "SO1" && data.CODPAQINT.trim() != "") {
                            CON851(
                              "",
                              "Atencion ! este procedimiento esta clasificado como posible paquete integral",
                              null,
                              "warning",
                              "Avertencia!"
                            );
                          }
                          this.SAL401.VLRUNITW = Math.round(this.SAL401.VLRUNITW);
                          if (isNaN(this.SAL401.VLRUNITW)) this.SAL401.VLRUNITW = 0;
                          console.log(this.SAL401.VLRUNITW);
                          this.SAL401.IVAART = "0";
                        })
                        .catch((error) => {
                          console.error(error);
                        });
                    })
                    .catch((err) => {
                      console.error(err);
                    });
                }
                opcion2 = new Function();
                opcion2 = OPCIONES2[this.SAL401.OPCIONACTIVA];
                opcion2();
              })
              .catch((err) => {
                console.error(err);
                if (this.SAL401.OPCIONACTIVA == "09423") {
                  this._confirmarborrar_SAL401();
                } else {
                  this._evaluarcomprobante_SAL401();
                }
              });
          })
          .catch((err) => {
            console.error(err);
            this._evaluarcomprobante_SAL401();
          });
      }
    },
    // ANULAR COMPROBANTES
    _confirmarborrar_SAL401() {
      if (
        this.SAL401.COMPROBANTE.ESTADO_NUM == "1" &&
        prefijofacturaMask_SAL401.value != "C" &&
        prefijofacturaMask_SAL401.value != "E" &&
        prefijofacturaMask_SAL401.value != "Ñ" &&
        prefijofacturaMask_SAL401.value != "U"
      ) {
        CON851("70", "70", null, "error", "Error");
        if (localStorage.Usuario == "GEBC") {
          return this._confirmarborrar2_SAL401();
        }
        return _toggleNav();
      }
      this._confirmarborrar2_SAL401();
    },
    _confirmarborrar2_SAL401() {
      if (this.SAL401.COMPROBANTE.ESTADO_NUM == "2") {
        CON851("13", "13", null, "error", "Error");
        return _toggleNav();
      }
      if (this.SAL401.COMPROBANTE.ESTADO_NUM == "3" && localStorage.Usuario != this.SAL401.COMPROBANTE.OPER_BLOQ_NUM) {
        CON851("13", "13", null, "error", "Error");
        if (localStorage.Usuario == "GEBC") {
          return CON851P(
            "02",
            () => {
              setTimeout(() => {
                $(".page-breadcrumb")[1].remove(), this._validarOpcion_SAL41();
              }, 300);
            },
            this._aceptaranular_SAL401
          );
        }
        return _toggleNav();
      }
      if (this.SAL401.COMPROBANTE.SEGRIPS_NUM == "S") {
        CON851("72", "72", null, "error", "Error");
        if (localStorage.Usuario == "GEBC") {
          return CON851P(
            "02",
            () => {
              setTimeout(() => {
                $(".page-breadcrumb")[1].remove(), this._validarOpcion_SAL41();
              }, 300);
            },
            this._aceptaranular_SAL401
          );
        }
        return _toggleNav();
      }
      CON851P(
        "02",
        () => {
          setTimeout(() => {
            $(".page-breadcrumb")[1].remove(), this._validarOpcion_SAL41();
          }, 300);
        },
        this._aceptaranular_SAL401
      );
    },
    _aceptaranular_SAL401() {
      if (
        prefijofacturaMask_SAL401.value == "P" ||
        prefijofacturaMask_SAL401.value == "T" ||
        prefijofacturaMask_SAL401.value == "O" ||
        prefijofacturaMask_SAL401.value == "Q" ||
        prefijofacturaMask_SAL401.value == "R" ||
        prefijofacturaMask_SAL401.value == "S" ||
        prefijofacturaMask_SAL401.value == "U" ||
        prefijofacturaMask_SAL401.value == "V" ||
        prefijofacturaMask_SAL401.value == "W" ||
        prefijofacturaMask_SAL401.value == "X" ||
        prefijofacturaMask_SAL401.value == "Y" ||
        prefijofacturaMask_SAL401.value == "Z"
      ) {
        let URL = get_url("APP/SALUD/SAL401.DLL");
        postData(
          {
            datosh: `${datosEnvio()}J|${this.form.sucursal_SAL401}${
              clasedeservicioMask_SAL401.value
            }${comprobanteMask_SAL401.value.padStart(6, "0")}|||||||||||||||||`,
          },
          URL
        )
          .then((data) => {
            console.debug(data);
          })
          .catch((err) => {
            console.error(err);
          });
      }
      let URL = get_url("APP/SALUD/SER891.DLL");
      postData(
        {
          datosh: `${datosEnvio()}${this.form.sucursal_SAL401}${
            clasedeservicioMask_SAL401.value
          }${comprobanteMask_SAL401.value.padStart(6, "0")}|${
            this.SAL401.COMPROBANTE.FINALIDESTAD
          }|S|${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)}|`,
        },
        URL
      )
        .then((data) => {
          console.debug(data);
        })
        .catch((err) => {
          console.error(err);
        });
      this._anularfactura_SAL401();
    },
    _anularfactura_SAL401() {
      var _this = this;
      var ventanamotivoanulacion = bootbox.dialog({
        size: "medium",
        onEscape: false,
        title: "MOTIVO DE ANULACION:",
        message:
          '<div class="row"> ' +
          '<div class="col-md-12"> ' +
          '<div class="form-group"> ' +
          '<div class="col-md-12" id="VALIDAR1_VENTANA_SAL41"> ' +
          '<input id="detallefact_SAL41" type="text" class="form-control input-md" data-orden="1" maxlength="300"> ' +
          "</div> " +
          "</div> " +
          "</div>" +
          "</div>",
        buttons: {
          confirm: {
            label: "Aceptar",
            className: "btn-primary",
            callback: function () {
              ventanamotivoanulacion.off("show.bs.modal");
              grabar_auditoria_SALUD(
                {
                  TIPO: "I43",
                  NOVED: "9",
                  ARCH: "SALUD",
                  LLAVE: `${_this.form.sucursal_SAL401}${
                    clasedeservicioMask_SAL401.value
                  }${comprobanteMask_SAL401.value.padStart(6, "0")}`,
                },
                $_this._anularotros_SAL401
              );
            },
          },
          cancelar: {
            label: "Cancelar",
            className: "btn-danger",
            callback: function () {
              ventanamotivoanulacion.off("show.bs.modal");
              $_this._evaluarcomprobante_SAL401();
            },
          },
        },
      });
      ventanamotivoanulacion.init($(".modal-footer").hide(), this._evaluarmotivo_SAL401());
      ventanamotivoanulacion.on("shown.bs.modal", function () {
        $("#detallefact_SAL41").focus();
      });
    },
    _evaluarmotivo_SAL401() {
      $("#detallefact_SAL41").val(this.SAL401.COMPROBANTE.DETALLE_FACT.trim());
      validarInputs(
        {
          form: "#VALIDAR1_VENTANA_SAL41",
          orden: "1",
        },
        () => {
          $(".btn-danger").click();
        },
        () => {
          this.SAL401.DETALLEFACT = $("#detallefact_SAL41").val();
          if (this.SAL401.DETALLEFACT.trim() == "") {
            CON851("02", "02", null, "error", "Error");
            return this._evaluarmotivo_SAL401();
          }

          $(".btn-primary").click();
        }
      );
    },
    _anularotros_SAL401() {
      let URL = get_url("APP/SALUD/SAL401.DLL");
      postData(
        {
          datosh: `${datosEnvio()}I|${this.form.sucursal_SAL401}${
            clasedeservicioMask_SAL401.value
          }${comprobanteMask_SAL401.value.padStart(6, "0")}|||||||||||||||${
            localStorage.Usuario
          }|${this.SAL401.DETALLEFACT.trim()}|`,
        },
        URL
      )
        .then((data) => {
          console.debug(data);
          if (
            prefijofacturaMask_SAL401.value == "P" ||
            prefijofacturaMask_SAL401.value == "T" ||
            prefijofacturaMask_SAL401.value == "O" ||
            prefijofacturaMask_SAL401.value == "Q" ||
            prefijofacturaMask_SAL401.value == "R" ||
            prefijofacturaMask_SAL401.value == "S" ||
            prefijofacturaMask_SAL401.value == "U" ||
            prefijofacturaMask_SAL401.value == "V" ||
            prefijofacturaMask_SAL401.value == "W" ||
            prefijofacturaMask_SAL401.value == "X" ||
            prefijofacturaMask_SAL401.value == "Y" ||
            prefijofacturaMask_SAL401.value == "Z"
          ) {
            postData(
              {
                datosh: `${datosEnvio()}${this.form.sucursal_SAL401}${
                  clasedeservicioMask_SAL401.value
                }${comprobanteMask_SAL401.value.padStart(6, "0")}|`,
              },
              get_url("APP/SALUD/SAL030A.DLL")
            )
              .then((data) => {
                console.debug(data);
              })
              .catch((err) => {
                console.error(err);
              });
          } else {
            postData(
              {
                datosh: `${datosEnvio()}${this.form.sucursal_SAL401}${
                  clasedeservicioMask_SAL401.value
                }${comprobanteMask_SAL401.value.padStart(6, "0")}|${
                  prefijofacturaMask_SAL401.value
                }|${fechafacturaMask_SAL401.value.replace(/-/g, "")}|`,
              },
              get_url("APP/SALUD/SAL021.DLL")
            )
              .then((data) => {
                console.debug(data);
              })
              .catch((err) => {
                console.error(err);
              });
          }
          if (clasedeservicioMask_SAL401.value == "0" || this.SAL401.COMPROBANTE.MACRO_FACT == "1") {
            postData(
              {
                datosh: `${datosEnvio()}${this.form.sucursal_SAL401}${
                  clasedeservicioMask_SAL401.value
                }${comprobanteMask_SAL401.value.padStart(6, "0")}|`,
              },
              get_url("APP/SALUD/SAL031.DLL")
            )
              .then((data) => {
                console.debug(data);
                for (var i in this.FACTURACION) {
                  if (this.FACTURACION[i].ARTICULO.trim() != "") {
                    let URL = get_url("APP/SALUD/SAL010.DLL");
                    postData(
                      {
                        datosh:
                          datosEnvio() +
                          this.FACTURACION[i].ALMACEN +
                          "0" +
                          this.FACTURACION[i].ARTICULO +
                          this.FACTURACION[i].CODIGOLOTE +
                          "|",
                      },
                      URL
                    )
                      .then((data) => {
                        console.debug(data);
                      })
                      .catch((err) => {
                        console.error(err);
                      });
                  }
                }
              })
              .catch((err) => {
                console.error(err);
              });
          }
          loader("hide");
          _toggleNav();
        })
        .catch((err) => {
          console.error(err);
        });
      // postData({ datosh: `${datosEnvio()}I|${this.form.sucursal_SAL401}${clasedeservicioMask_SAL401.value}${comprobanteMask_SAL401.value.padStart(6,'0')}|||||||||||||||${localStorage.Usuario}|${this.SAL401.DETALLEFACT.trim()}|` },
      // get_url("APP/SALUD/SAL401.DLL"))
      // .then(data => {
      //     console.log(data);
      // })
      // .catch(err => {
      //     console.error(err);
      // });
    },
    _encabezar_SAL401() {
      console.log("_encabezar_SAL401");
      this.SAL401.FACTAUTOFACT = "";
      this.SAL401.NROFORMFACT = "";
      postData({ datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|` }, get_url("APP/CONTAB/CON007B.DLL"))
        .then((data) => {
          console.debug(data);
          data = data.split("|");
          if (data[1].trim() == "0" || data[1].trim() == "5" || data[1].trim() == "3") {
            this.SAL401.SWBONO = 0;
            if (
              $_USUA_GLOBAL[0].NIT == 900541158 ||
              $_USUA_GLOBAL[0].NIT == 900566047 ||
              $_USUA_GLOBAL[0].NIT == 900565371 ||
              $_USUA_GLOBAL[0].NIT == 901120152 ||
              $_USUA_GLOBAL[0].NIT == 900658867 ||
              $_USUA_GLOBAL[0].NIT == 901319663
            ) {
              return setTimeout(() => {
                SER865A(this._validarventanadroga_SAL401, this._evaluarclasedeservicios_SAL401);
              }, 300);
            }
            return this._validarventanadroga_SAL401();
          }
          CON851("", "Mes bloqueado", _toggleNav(), "error", "Error");
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Ocurrio un error con el usuario", _toggleNav(), "error", "Error");
        });
    },
    _validarventanadroga_SAL401(data) {
      this.descripTipoFact = "";
      if (data) this.SAL401.FACTAUTOFACT = data.CODIGO;
      this.SAL401.NROFORMFACT = "";
      this.SAL401.TIPODRFACT = "";
      if (clasedeservicioMask_SAL401.value.trim() == "0") {
        return setTimeout(() => {
          SER865(this._evaluarSER865, this._evaluarclasedeservicios_SAL401);
        }, 300);
      }
      this._evaluarfechafactura_SAL401();
    },
    _evaluarSER865(data) {
      this.descripTipoFact = data.DESCRIPCION;
      this.SAL401.TIPODRFACT = data.CODIGO;
      this._revisarpermisos_SAL401(
        (data) => {
          if (clasedeservicioMask_SAL401.value.trim() == "0" && this.SAL401.TIPODRFACT == "3") {
            return _controldispensacion_SAL401();
          }
          this._controldispensacion_SAL401();
        },
        this._encabezar_SAL401,
        (datos = { CODIGO: `I410${data.CODIGO}|` })
      );
    },
    _controldispensacion_SAL401() {
      this.SAL401.PICKER = 0;
      this.SAL401.NROPEDW = "";
      this.SAL401.PACIDISPE = "";
      if (clasedeservicioMask_SAL401.value.trim() > 0) {
        return this._evaluarfechafactura_SAL401();
      }
      if (
        (this.form.unidaddeservicio_SAL401.substring(0, 2) == "02" ||
          this.form.unidaddeservicio_SAL401.substring(0, 2) == "08") &&
        $_USUA_GLOBAL[0].NIT != 892000458 &&
        $_USUA_GLOBAL[0].NIT != 900061048
      ) {
        return this._evaluarfechafactura_SAL401();
      }
      if (this.SAL401.TIPODRFACT == "1") {
        this.SAL401.VENTANADISPENSACION = "VENTANADISPENSACION_SAL401";
        console.log("pare");
        return SER815(
          (data = {
            VENTANADISPENSACION: this.SAL401.VENTANADISPENSACION,
            callback: this._validardispensacion_SAL401,
            errcallback: this._evaluarclasedeservicios_SAL401,
            UNSERV: this.form.unidaddeservicio_SAL401.substring(0, 2),
            f8callback: this._montarf8dispensacion_SAL401,
            continuar: this._evaluarfechafactura_SAL401,
          })
        );
      }
      this._evaluarfechafactura_SAL401();
    },
    _montarf8dispensacion_SAL401() {
      loader("show");
      postData(
        { datosh: `${datosEnvio()}${this.form.unidaddeservicio_SAL401.substring(0, 2)}|` },
        get_url("APP/SALUD/SER815V.DLL")
      )
        .then((data) => {
          loader("hide");
          data.DISPENSACION.pop();
          if (data.DISPENSACION.length == 0) {
            CON851("", "No hay medicamentos por dispensar", null, "error", "Error");
            return this._evaluarclasedeservicios_SAL401();
          }
          this.dispensacion_SAL401 = data.DISPENSACION;
          this.tabla_dispensacion_SAL401 = data.DISPENSACION[0].TABLA;

          this.ESTADO_VENTANA_DISPENSACION = true;
        })
        .catch((error) => {
          loader("hide");
          console.error(error);
          this._evaluarclasedeservicios_SAL401();
        });
    },
    cambiofocoventanadispensacion(data) {
      this.tabla_dispensacion_SAL401 = this.dispensacion_SAL401[data].TABLA;
    },
    salirventanadispensacion_SAL401() {
      this.ESTADO_VENTANA_DISPENSACION = false;
      this.dispensacion_SAL401 = [];
      this.tabla_dispensacion_SAL401 = [];

      this._evaluarclasedeservicios_SAL401();
    },
    _moverdispensacion_SAL401(data) {
      console.log(data);
      this.ESTADO_VENTANA_DISPENSACION = false;
      this.SAL401.NROPEDW = data.cells[0].textContent;
      postData(
        {
          datosh: `${datosEnvio()}1|${this.SAL401.NROPEDW}|${
            localStorage.Usuario
          }|${this.form.unidaddeservicio_SAL401.substring(0, 2)}|${comprobanteMask_SAL401.value.padStart(6, "0")}|${
            this.SAL401.FECHAINGESTAD
          }|${this.SAL401.HORAATENESTAD}|${prefijofacturaMask_SAL401.value}${numerofacturaMask_SAL401.value.padStart(
            6,
            "0"
          )}|`,
        },
        get_url("APP/SALUD/SER815.DLL")
      )
        .then((data) => {
          console.debug(data);
          this._validardispensacion_SAL401(data);
        })
        .catch((error) => {
          console.error(error);
          this._evaluarclasedeservicios_SAL401();
        });
    },
    _validardispensacion_SAL401(data) {
      this.FACTURACION = [];
      this.SAL401.NROPEDW = data.DISPENSA[0].CTA;
      prefijofacturaMask_SAL401.typedValue = data.DISPENSA[0].FACT.substring(0, 1);
      numerofacturaMask_SAL401.typedValue = data.DISPENSA[0].FACT.substring(1, 7);
      atendidoMask_SAL401.typedValue = parseInt(data.DISPENSA[0].MED).toString();
      idhistoriafactMask_SAL401.typedValue = parseInt(data.DISPENSA[0].PACI).toString();
      this.form.centrocostos_SAL401 = "0055";
      postData(
        { datosh: `${datosEnvio()}5||||${atendidoMask_SAL401.unmaskedValue.trim().padStart(10, "0")}|||||||||||` },
        get_url("APP/SALUD/SAL401.DLL")
      )
        .then((data) => {
          this.form.especialidad_SAL401 = data.TABLA_ESP[0].ESP.trim();
        })
        .catch((error) => {
          console.error(error);
        });
      this.SAL401.SWCAMBIO = 1;
      for (var i of data.DISPENSA[0].TABLA) {
        cantidadMask_SAL401.typedValue = i.CANTIDAD;
        this.FACTURACION.push({
          ALMACEN: "",
          ARTICULO: `${i.GRUPO}${i.ARTICULO}`,
          DESCRIPCIONART: i.DESCRIPCION,
          CODIGOLOTE: "",
          CANTIDAD: cantidadMask_SAL401.value.replace(/,/g, ""),
          VALORUNIT: "0.00",
          DIASTRATA: "",
          VALORTOTAL: "0.00",
          UNIDAD: "",
        });
      }
      this.FACTURACION.pop();
      this._evaluarfechafactura_SAL401();
    },
    _evaluarfechafactura_SAL401() {
      var _this = this;
      if (this.SAL401.OPCIONACTIVA == "09421") fechafacturaMask_SAL401.typedValue = moment().format("YYYYMMDD");
      if (this.SAL401.SWBLOQFECHA == "S") {
        return this._controlfechafactura_SAL401();
      } else {
        var Inicio = `20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)}-${$_USUA_GLOBAL[0].FECHALNK.substring(
          2,
          4
        )}-01 12:00`;
        var Final = `20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)}-${$_USUA_GLOBAL[0].FECHALNK.substring(
          2,
          4
        )}-${$_USUA_GLOBAL[0].FECHALNK.substring(4, 6)} 12:00`;
        var Rango = [];
        for (var d = new Date(Inicio); d <= new Date(Final); d.setDate(d.getDate() + 1)) {
          Rango.push($.datepicker.formatDate("yy-mm-dd", d));
        }
        if (this.SAL401.PICKER == 0) {
          if ($("#fecha_SAL401").datepicker("isDisabled")) {
            $("#fecha_SAL401").datepicker("option", { disabled: false });
            console.log("lo active");
          }
          $.datepicker.setDefaults($.datepicker.regional["es"]);
          $("#fecha_SAL401").datepicker({
            showOn: "focus",
            dateFormat: "yy-mm-dd",
            beforeShowDay: function (date) {
              var dateString = jQuery.datepicker.formatDate("yy-mm-dd", date);
              return [Rango.indexOf(dateString) >= 0];
            },
            onClose: function (data, event) {
              fechafacturaMask_SAL401.typedValue = data;
              $("#fecha_SAL401").focus();
            },
            onSeclect: function (data, event) {
              fechafacturaMask_SAL401.typedValue = data;
              $("#fecha_SAL401").focus();
            },
          });
          validarInputs(
            {
              form: "#VALIDAR4_SAL401",
              orden: "1",
            },
            () => {
              $("#fecha_SAL401").datepicker("option", { disabled: true });
              this._evaluarclasedeservicios_SAL401();
            },
            () => {
              $("#fecha_SAL401").datepicker("option", { disabled: true });
              this._controlfechafactura_SAL401();
            }
          );
        } else {
          console.log(this.SAL401.PICKER, "esta en 0");
          validarInputs(
            {
              form: "#VALIDAR4_SAL401",
              orden: "1",
            },
            () => {
              if (this.SAL401.OPCIONACTIVA == "09426") this._inicializar_SAL401();
              this._evaluarclasedeservicios_SAL401();
            },
            this._controlfechafactura_SAL401
          );
        }
      }
    },
    _controlfechafactura_SAL401() {
      console.log("controlfecha");
      if (fechafacturaMask_SAL401.value.trim() == "" || fechafacturaMask_SAL401.value.length < 10) {
        CON851("", "Formato de fecha incompleto AÑO/MES/DIA", this._evaluarfechafactura_SAL401(), "error", "Error");
      } else {
        if (clasedeservicioMask_SAL401.value.trim() == "4" || clasedeservicioMask_SAL401.value.trim() == "5") {
          this._controlfechafactura2_SAL401();
        } else {
          if (fechafacturaMask_SAL401.value.trim().replace(/-/g, "") > this.SAL401.FECHAACT) {
            CON851("37", "37", this._evaluarfechafactura_SAL401(), "error", "Error");
          } else {
            this._controlfechafactura2_SAL401();
          }
        }
      }
    },
    _controlfechafactura2_SAL401() {
      if (
        ($_USUA_GLOBAL[0].NIT == 830092718 ||
          $_USUA_GLOBAL[0].NIT == 830092719 ||
          $_USUA_GLOBAL[0].NIT == 892000401 ||
          $_USUA_GLOBAL[0].NIT == 900648993 ||
          $_USUA_GLOBAL[0].NIT == 900193162 ||
          $_USUA_GLOBAL[0].NIT == 900755133 ||
          $_USUA_GLOBAL[0].NIT == 900804411 ||
          $_USUA_GLOBAL[0].NIT == 900870633 ||
          $_USUA_GLOBAL[0].NIT == 900658867) &&
        fechafacturaMask_SAL401.value.trim().replace(/-/g, "") < this.SAL401.FECHAACT
      ) {
        _revisarpermisos_SAL401(
          (data) => {
            if (this.form.sucursal_SAL401.trim() == "SC") {
              this._evaluarfechafactura_SAL401();
            } else {
              this._ventanafechaatencion_SAL401();
            }
          },
          this._evaluarfechafactura_SAL401,
          (datos = { CODIGO: "I4SF" })
        );
      } else {
        this._ventanafechaatencion_SAL401();
      }
    },
    _ventanafechaatencion_SAL401() {
      if (this.form.unidaddeservicio_SAL401.trim().substring(0, 2) == "01") {
        if (this.SAL401.OPCIONACTIVA != "09426") {
          if (this.SAL401.TIPODRFACT != "2") {
            this.SAL401.FECHAINGESTAD = fechafacturaMask_SAL401.value.replace(/-/g, "");
            this.SAL401.HORAATENESTAD = moment().format("HHmm");
            return this._evaluarprefijofactura_SAL401();
          }
        }
      }

      this.SAL401.VENTANAFECHAATENCION = "VENTANAFECHAATENCION";
      _ventanaalterna_SALUD(
        (data = {
          ID: this.SAL401.VENTANAFECHAATENCION,
          titulo: "VENTANA FECHA DE ATENCION",
          html: `
                <div class="form-group col-md-12 col-sm-12 col-xs-12" style="float: none; margin: 0 auto;">
                    <div class="col-md-2 col-sm-2 col-xs-12">
                        <div class="inline-inputs">
                            <label class="col-md-4 col-sm-4 col-xs-4">Año:</label>
                            <div class="input-group col-md-8 col-sm-8 col-xs-8" id="VENTANAFECHAATENCION1_SAL401">
                                <input id="añofechaatencion_SAL401" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="4" data-orden="1" required="true">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2 col-sm-2 col-xs-12">
                        <div class="inline-inputs">
                            <label class="col-md-7 col-sm-7 col-xs-7">Mes:</label>
                            <div class="input-group col-md-5 col-sm-5 col-xs-5" id="VENTANAFECHAATENCION1_SAL401">
                                <input id="mesfechaatencion_SAL401" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" data-orden="2" required="true">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2 col-sm-2 col-xs-12">
                        <div class="inline-inputs">
                            <label class="col-md-7 col-sm-7 col-xs-7">Dia:</label>
                            <div class="input-group col-md-5 col-sm-5 col-xs-5" id="VENTANAFECHAATENCION1_SAL401">
                                <input id="diafechaatencion_SAL401" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" data-orden="3" required="true">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2 col-sm-2 col-xs-12">
                        <div class="inline-inputs">
                            <label class="col-md-4 col-sm-4 col-xs-4">Hora:</label>
                            <div class="input-group col-md-8 col-sm-8 col-xs-8" id="VENTANAFECHAATENCION2_SAL401">
                                <input id="horafechaatencion_SAL401" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" data-orden="1" required="true">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2 col-sm-2 col-xs-12">
                        <div class="inline-inputs">
                            <label class="col-md-4 col-sm-4 col-xs-4">Min:</label>
                            <div class="input-group col-md-8 col-sm-8 col-xs-8" id="VENTANAFECHAATENCION2_SAL401">
                                <input id="minutosfechaatencion_SAL401" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" data-orden="2" required="true">
                            </div>
                        </div>
                    </div>
                </div>
                `,
        })
      );
      this._evaluarfechaatencion_SAL401("1");
    },
    _evaluarfechaatencion_SAL401(orden) {
      _inputControl("disabled");
      if (this.SAL401.OPCIONACTIVA == "09421") {
        $("#añofechaatencion_SAL401").val(moment().format("YYYY"));
        $("#mesfechaatencion_SAL401").val(parseInt(moment().format("MM")));
        $("#diafechaatencion_SAL401").val(parseInt(moment().format("DD")));
        $("#horafechaatencion_SAL401").val(parseInt(moment().format("HH")));
        $("#minutosfechaatencion_SAL401").val(parseInt(moment().format("mm")));
      }
      if (this.SAL401.OPCIONACTIVA == "09426") {
        this.SAL401.HORAATENESTAD.substring(0, 4);
        $("#añofechaatencion_SAL401").val(this.SAL401.FECHAINGESTAD.replace(/\//u, "").substring(0, 4));
        $("#mesfechaatencion_SAL401").val(parseInt(this.SAL401.FECHAINGESTAD.replace(/\//g, "").substring(4, 6)));
        $("#diafechaatencion_SAL401").val(parseInt(this.SAL401.FECHAINGESTAD.replace(/\//g, "").substring(6, 8)));
        $("#horafechaatencion_SAL401").val(parseInt(this.SAL401.HORAATENESTAD.substring(0, 2)));
        $("#minutosfechaatencion_SAL401").val(parseInt(this.SAL401.HORAATENESTAD.substring(2, 4)));
      }
      var añoatencionMask_SAL401 = IMask($("#añofechaatencion_SAL401")[0], { mask: Number });
      var mesatencionMask_SAL401 = IMask($("#mesfechaatencion_SAL401")[0], { mask: Number });
      var diaatencionMask_SAL401 = IMask($("#diafechaatencion_SAL401")[0], { mask: Number });
      validarInputs(
        {
          form: "#VENTANAFECHAATENCION1_SAL401",
          orden: orden,
        },
        () => {
          $(`#${this.SAL401.VENTANAFECHAATENCION}`).remove();
          this._evaluarfechafactura_SAL401();
        },
        () => {
          if (moment().format().trim() == "Fecha inválida") {
            CON851("03", "03", null, "error", "Error");
            return this._evaluarfechaatencion_SAL401("1");
          }
          this._evaluarhorafechaatencion_SAL401("1");
        }
      );
    },
    _evaluarhorafechaatencion_SAL401(orden) {
      var horaatencionMask_SAL401 = IMask($("#mesfechaatencion_SAL401")[0], { mask: Number });
      var minutoatencionMask_SAL401 = IMask($("#diafechaatencion_SAL401")[0], { mask: Number });
      validarInputs(
        {
          form: "#VENTANAFECHAATENCION2_SAL401",
          orden: orden,
        },
        () => {
          this._evaluarfechaatencion_SAL401("3");
        },
        () => {
          if (moment().format().trim() == "Fecha inválida") {
            CON851("03", "03", null, "error", "Error");
            return this._evaluarfechaatencion_SAL401("1");
          }
          this.SAL401.FECHAINGESTAD = `${$("#añofechaatencion_SAL401").val().padStart(4, "0")}${$(
            "#mesfechaatencion_SAL401"
          )
            .val()
            .padStart(2, "0")}${$("#diafechaatencion_SAL401").val().padStart(2, "0")}`;
          this.SAL401.HORAATENESTAD = `${$("#horafechaatencion_SAL401").val().padStart(2, "0")}${$(
            "#minutosfechaatencion_SAL401"
          )
            .val()
            .padStart(2, "0")}`;
          $(`#${this.SAL401.VENTANAFECHAATENCION}`).remove();
          this._evaluarprefijofactura_SAL401();
        }
      );
    },
    _evaluarprefijofactura_SAL401() {
      validarInputs(
        {
          form: "#VALIDAR5_SAL401",
          orden: "1",
        },
        () => {
          if (this.SAL401.OPCIONACTIVA == "09426") {
            return this._evaluarclasedeservicios_SAL401();
          }

          this._evaluarfechafactura_SAL401();
        },
        () => {
          if (
            prefijofacturaMask_SAL401.value.trim() == "U" ||
            prefijofacturaMask_SAL401.value.trim() == "Ñ" ||
            prefijofacturaMask_SAL401.value.trim() == ""
          ) {
            CON851("", "Revise el prefijo digitado", this._evaluarprefijofactura_SAL401(), "error", "Error");
          } else {
            if (
              prefijofacturaMask_SAL401.value.trim() == "E" ||
              prefijofacturaMask_SAL401.value.trim() == "C" ||
              $_USUA_GLOBAL[0].NIT == 832000744
            ) {
              if (fechafacturaMask_SAL401.value.trim().replace(/-/g, "").substring(4, 6) != moment().format("MM")) {
                CON851("37", "37", null, "error", "Error");
                this._evaluarfechafactura_SAL401();
              } else {
                fechafacturaMask_SAL401.typedValue = moment().format("YYYYMMDD");
                this._validacioncredito_SAL401();
              }
            } else {
              this._validacioncredito_SAL401();
            }
          }
        }
      );
    },
    _validacioncredito_SAL401() {
      if (
        ($_USUA_GLOBAL[0].NIT == 830092718 ||
          $_USUA_GLOBAL[0].NIT == 830092719 ||
          $_USUA_GLOBAL[0].NIT == 892000401 ||
          $_USUA_GLOBAL[0].NIT == 900648993 ||
          $_USUA_GLOBAL[0].NIT == 900755133 ||
          $_USUA_GLOBAL[0].NIT == 900870633 ||
          $_USUA_GLOBAL[0].NIT == 900804411) &&
        (prefijofacturaMask_SAL401.value.trim() == "C" || prefijofacturaMask_SAL401.value.trim() == "E")
      ) {
        CON851("49", "49", this._evaluarprefijofactura_SAL401(), "error", "Error");
      } else {
        if (($_USUA_GLOBAL[0].PUC == "4" || $_USUA_GLOBAL[0].PUC == "6") && prefijofacturaMask_SAL401.value == "C") {
          prefijofacturaMask_SAL401.typedValue = "E";
        }
        if ($_USUA_GLOBAL[0].NIT == 900447167 && prefijofacturaMask_SAL401.value == "E") {
          prefijofacturaMask_SAL401.typedValue = "C";
        }
        this._ubicarcuenta_SAL401();
      }
    },
    _ubicarcuenta_SAL401() {
      if (prefijofacturaMask_SAL401.value.trim() == "E" || prefijofacturaMask_SAL401.value.trim() == "C") {
        this.SAL401.NUMERACION = new Object();
        this.SAL401.NUMERACION.LLAVE_NUM = `${prefijofacturaMask_SAL401.value}${numerofacturaMask_SAL401.value.padStart(
          6,
          "0"
        )}`;
        this.SAL401.NUMERACION.FACTCAPIT_NUM = "";
        this.SAL401.NUMERACION.ESTADO_NUM = "0";
        this.SAL401.CODTAR = this.SAL401.NUMERACION.CONVENIO_NUM = "CL";
        this.SAL401.NUMERACION.DESCRIP_NUM = "";
        this.SAL401.NUMERACION.TIPOPACI_NUM = "*";
        this.SAL401.NUMERACION.FORMACOPAG_NUM = "1";
        if ($_USUA_GLOBAL[0].NIT == 822006883) clienteMask_SAL401.typedValue = "9999"; //CARDIORIENTE
        else clienteMask_SAL401.typedValue = "9998";
        if (prefijofacturaMask_SAL401.value == "C") {
          postData({ datosh: `${datosEnvio()}89|` }, get_url("APP/CONTAB/CON007.DLL"))
            .then((data) => {
              console.debug(data);
              data = data.split("|");
              numerofacturaMask_SAL401.typedValue = parseInt(data[1].substring(3, 9)).toString();
              this._leerconvenio_SAL401();
            })
            .catch((err) => {
              console.error(err);
              this._evaluarfechafactura_SAL401();
            });
        } else {
          postData({ datosh: `${datosEnvio()}96|` }, get_url("APP/CONTAB/CON007.DLL"))
            .then((data) => {
              console.debug(data);
              data = data.split("|");
              if (this.SAL401.OPCIONACTIVA == "09421")
                numerofacturaMask_SAL401.typedValue = parseInt(data[1].substring(3, 9)).toString();
              this._leerconvenio_SAL401();
            })
            .catch((err) => {
              console.error(err);
              this._evaluarfechafactura_SAL401();
            });
        }
      } else {
        if (numerofacturaMask_SAL401.value.trim() == "" || numerofacturaMask_SAL401.value.trim() == 0) {
          postData(
            { datosh: `${datosEnvio()}9${prefijofacturaMask_SAL401.value.trim()}|` },
            get_url("APP/CONTAB/CON007.DLL")
          )
            .then((data) => {
              console.debug(data);
              data = data.split("|");
              numerofacturaMask_SAL401.typedValue = (parseInt(data[1].substring(3, 9)) - 1).toString();
              this._evaluarnumerofactura_SAL401();
            })
            .catch((err) => {
              console.error(err);
              this._evaluarfechafactura_SAL401();
            });
        } else {
          this._evaluarnumerofactura_SAL401();
        }
      }
    },
    _evaluarnumerofactura_SAL401() {
      validarInputs(
        {
          form: "#VALIDAR6_SAL401",
          orden: "1",
        },
        this._evaluarprefijofactura_SAL401,
        () => {
          if (numerofacturaMask_SAL401.value.trim() == 0 || numerofacturaMask_SAL401.value.trim() == "") {
            CON851("", "Digite un numero de factura", this._evaluarnumerofactura_SAL401(), "error", "Error");
          } else {
            postData(
              {
                datosh: `${datosEnvio()}${prefijofacturaMask_SAL401.value.trim()}${numerofacturaMask_SAL401.value
                  .trim()
                  .padStart(6, "0")}|`,
              },
              get_url("APP/SALUD/SER808-01.DLL")
            )
              .then((data) => {
                console.log(data);
                this.SAL401.NUMERACION = data.NUMER19[0];
                this._leercuenta_SAL401();
              })
              .catch((err) => {
                console.error(err);
                this._evaluarnumerofactura_SAL401();
              });
          }
        }
      );
    },
    _leercuenta_SAL401() {
      if (
        this.SAL401.NUMERACION.FACTCAPIT_NUM.substring(1, 7) > 0 &&
        this.SAL401.NUMERACION.FACTCAPIT_NUM == this.SAL401.NUMERACION.LLAVE_NUM &&
        clasedeservicioMask_SAL401.value.trim() != "4"
      ) {
        CON851("1W", "1W", this._evaluarnumerofactura_SAL401(), "error", "Error");
      } else {
        if (
          ($_USUA_GLOBAL[0].NIT == 800037021 || $_USUA_GLOBAL[0].NIT == 800162035) &&
          (prefijofacturaMask_SAL401.value.trim() == "P" ||
            prefijofacturaMask_SAL401.value.trim() == "T" ||
            prefijofacturaMask_SAL401.value.trim() == "O" ||
            prefijofacturaMask_SAL401.value.trim() == "Q" ||
            prefijofacturaMask_SAL401.value.trim() == "R" ||
            prefijofacturaMask_SAL401.value.trim() == "S" ||
            prefijofacturaMask_SAL401.value.trim() == "U" ||
            prefijofacturaMask_SAL401.value.trim() == "V" ||
            prefijofacturaMask_SAL401.value.trim() == "W" ||
            prefijofacturaMask_SAL401.value.trim() == "X" ||
            prefijofacturaMask_SAL401.value.trim() == "Y" ||
            prefijofacturaMask_SAL401.value.trim() == "Z")
        ) {
          if (this.SAL401.NUMERACION.LLAVESALID_NUM > 0) {
            postData({datosh: datosEnvio(), llave: this.SAL401.NUMERACION.LLAVESALID_NUM}, get_url("APP/SALUD/GET_SALID.DLL"))
            .then(data => {
              if ("llave" in data) {
                if (parseInt(this.SAL401.FECHAFACT) > data.fecha) {
                  CON851("8D", "8D", null, "error", "");
                  this._evaluarnumerofactura_SAL401();
                } else this._validarcontrolservnum_SAL401();
              } else {
                CON851("", "NO TIENE BOLETA DE SALIDA", null, "error", "");
                this._evaluarnumerofactura_SAL401()
              }
            })
            .catch(err => {
              console.log("Error consultando boleta de salida: ", err);
              CON851("", "Error consultando boleta de salida", null, "error", "");
              this._evaluarnumerofactura_SAL401()
            })
            console.error("FALTA LEER ORDEN DE SALID");
          } else {
            this._validarcontrolservnum_SAL401();
          }
        } else {
          this._validarcontrolservnum_SAL401();
        }
      }
    },
    _validarcontrolservnum_SAL401() {
      if (this.SAL401.NUMERACION.CTRLSERV_NUM == "S") {
        switch (clasedeservicioMask_SAL401.value) {
          case "0":
            if (this.SAL401.NUMERACION.CTRLCL0_NUM == "N")
              CON851("7U", "7U", this._evaluarnumerofactura_SAL401(), "error", "Error");
            else this._leercuenta2_SAL401();
            break;
          case "1":
            if (this.SAL401.NUMERACION.CTRLCL1_NUM == "N")
              CON851("7U", "7U", this._evaluarnumerofactura_SAL401(), "error", "Error");
            else this._leercuenta2_SAL401();
            break;
          case "2":
            if (this.SAL401.NUMERACION.CTRLCL2_NUM == "N")
              CON851("7U", "7U", this._evaluarnumerofactura_SAL401(), "error", "Error");
            else this._leercuenta2_SAL401();
            break;
          case "3":
            if (this.SAL401.NUMERACION.CTRLCL3_NUM == "N")
              CON851("7U", "7U", this._evaluarnumerofactura_SAL401(), "error", "Error");
            else this._leercuenta2_SAL401();
            break;
          case "4":
            if (this.SAL401.NUMERACION.CTRLCL4_NUM == "N")
              CON851("7U", "7U", this._evaluarnumerofactura_SAL401(), "error", "Error");
            else this._leercuenta2_SAL401();
            break;
          case "5":
            if (this.SAL401.NUMERACION.CTRLCL5_NUM == "N")
              CON851("7U", "7U", this._evaluarnumerofactura_SAL401(), "error", "Error");
            else this._leercuenta2_SAL401();
            break;
          case "6":
            if (this.SAL401.NUMERACION.CTRLCL6_NUM == "N")
              CON851("7U", "7U", this._evaluarnumerofactura_SAL401(), "error", "Error");
            else this._leercuenta2_SAL401();
            break;
          case "7":
            if (this.SAL401.NUMERACION.CTRLCL7_NUM == "N")
              CON851("7U", "7U", this._evaluarnumerofactura_SAL401(), "error", "Error");
            else this._leercuenta2_SAL401();
            break;
        }
      } else {
        this._leercuenta2_SAL401();
      }
    },
    _leercuenta2_SAL401() {
      if (
        prefijofacturaMask_SAL401.value.trim() == "A" ||
        prefijofacturaMask_SAL401.value.trim() == "B" ||
        prefijofacturaMask_SAL401.value.trim() == "D" ||
        prefijofacturaMask_SAL401.value.trim() == "F" ||
        prefijofacturaMask_SAL401.value.trim() == "G" ||
        prefijofacturaMask_SAL401.value.trim() == "H" ||
        prefijofacturaMask_SAL401.value.trim() == "I" ||
        prefijofacturaMask_SAL401.value.trim() == "J" ||
        prefijofacturaMask_SAL401.value.trim() == "K" ||
        prefijofacturaMask_SAL401.value.trim() == "L" ||
        prefijofacturaMask_SAL401.value.trim() == "M" ||
        prefijofacturaMask_SAL401.value.trim() == "N" ||
        prefijofacturaMask_SAL401.value.trim() == "O" ||
        prefijofacturaMask_SAL401.value.trim() == "Q" ||
        prefijofacturaMask_SAL401.value.trim() == "R" ||
        prefijofacturaMask_SAL401.value.trim() == "S" ||
        prefijofacturaMask_SAL401.value.trim() == "V" ||
        prefijofacturaMask_SAL401.value.trim() == "W" ||
        prefijofacturaMask_SAL401.value.trim() == "X" ||
        prefijofacturaMask_SAL401.value.trim() == "Y" ||
        prefijofacturaMask_SAL401.value.trim() == "Z"
      ) {
        if (
          this.SAL401.NUMERACION.FECHA_ING.substring(0, 4) ==
            fechafacturaMask_SAL401.value.replace(/-/g, "").substring(0, 4) &&
          this.SAL401.NUMERACION.FECHA_ING.substring(4, 6) ==
            fechafacturaMask_SAL401.value.replace(/-/g, "").substring(4, 6)
        ) {
          return this._leercuenta3_SAL401();
        }
        if (
          this.SAL401.NUMERACION.FECHA_ING.substring(0, 4) == this.SAL401.FECHASIST.substring(0, 4) &&
          this.SAL401.NUMERACION.FECHA_ING.substring(4, 6) == this.SAL401.FECHASIST.substring(4, 6) &&
          `20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)}` == this.SAL401.FECHASIST.substring(0, 4) &&
          $_USUA_GLOBAL[0].FECHALNK.substring(2, 4) == this.SAL401.FECHASIST.substring(4, 6)
        ) {
          return this._leercuenta3_SAL401();
        }
        CON851("91", "91", null, "error", "error");
        if (this.SAL401.OPCIONACTIVA == "09426") {
          if (
            $_USUA_GLOBAL[0].NIT == 892000264 &&
            (localStorage.Usuario == "APCF" ||
              localStorage.Usuario == "EDMG" ||
              localStorage.Usuario == "IMLS" ||
              localStorage.Usuario == "AKOG" ||
              localStorage.Usuario == "DPCO" ||
              localStorage.Usuario == "DSRP" ||
              localStorage.Usuario == "LICC" ||
              localStorage.Usuario == "LYRC" ||
              localStorage.Usuario == "MSBR")
          ) {
            return this._leercuenta3_SAL401();
          }
        }
        if (localStorage.Usuario == "GEBC") {
          return this._leercuenta3_SAL401();
        }

        return this._evaluarnumerofactura_SAL401();
      }
      if (
        parseInt(fechafacturaMask_SAL401.value.trim().replace(/-/g, "")) < parseInt(this.SAL401.NUMERACION.FECHA_ING)
      ) {
        CON851("91", "91", null, "error", "error");
        if (localStorage.Usuario == "GEBC") {
          return this._leercuenta3_SAL401();
        }
        if (this.SAL401.OPCIONACTIVA == "09426") {
          if (
            $_USUA_GLOBAL[0].NIT == 892000264 &&
            (localStorage.Usuario == "APCF" ||
              localStorage.Usuario == "EDMG" ||
              localStorage.Usuario == "IMLS" ||
              localStorage.Usuario == "AKOG" ||
              localStorage.Usuario == "DPCO" ||
              localStorage.Usuario == "DSRP" ||
              localStorage.Usuario == "LICC" ||
              localStorage.Usuario == "LYRC" ||
              localStorage.Usuario == "MSBR")
          ) {
            return this._leercuenta3_SAL401();
          }
        }

        return this._evaluarnumerofactura_SAL401();
      }

      return this._leercuenta3_SAL401();
    },
    _leercuenta3_SAL401() {
      clienteMask_SAL401.typedValue = this.SAL401.NUMERACION.NIT_NUM;
      if (
        prefijofacturaMask_SAL401.value.trim() == "P" ||
        prefijofacturaMask_SAL401.value.trim() == "T" ||
        prefijofacturaMask_SAL401.value.trim() == "Q" ||
        prefijofacturaMask_SAL401.value.trim() == "R" ||
        prefijofacturaMask_SAL401.value.trim() == "S" ||
        prefijofacturaMask_SAL401.value.trim() == "U" ||
        prefijofacturaMask_SAL401.value.trim() == "V" ||
        prefijofacturaMask_SAL401.value.trim() == "W" ||
        prefijofacturaMask_SAL401.value.trim() == "X" ||
        prefijofacturaMask_SAL401.value.trim() == "Y" ||
        prefijofacturaMask_SAL401.value.trim() == "Z"
      ) {
        this.SAL401.ENTESTANCEDIT = 0;
        if (
          $_USUA_GLOBAL[0].NIT != 830092718 ||
          $_USUA_GLOBAL[0].NIT != 830092719 ||
          $_USUA_GLOBAL[0].NIT != 900193162
        ) {
          idhistoriafactMask_SAL401.typedValue = this.SAL401.NUMERACION.IDPAC_NUM;
          var a = moment([
            this.SAL401.NUMERACION.FECHA_ING.substring(0, 4),
            this.SAL401.NUMERACION.FECHA_ING.substring(4, 6),
            this.SAL401.NUMERACION.FECHA_ING.substring(6, 8),
          ]);
          var b = moment([
            fechafacturaMask_SAL401.value.replace(/-/g, "").substring(0, 4),
            fechafacturaMask_SAL401.value.replace(/-/g, "").substring(4, 6),
            fechafacturaMask_SAL401.value.replace(/-/g, "").substring(6, 8),
          ]);
          this.SAL401.ENTESTANCEDIT = a.diff(b, "days");
        }
      }
      if ($_USUA_GLOBAL[0].NIT == 830092718) {
        idhistoriafactMask_SAL401.typedValue = this.SAL401.NUMERACION.IDPAC_NUM;
        console.error("FALTA INICIALIZAR DETALLE FACT Y DETALLE2-W");
      }
      if (localStorage.Usuario == "GEBC") {
        return this._leertarifa_SAL401();
      }
      if (
        this.SAL401.NUMERACION.FECHA_RET.substring(0, 4) > 0 &&
        this.SAL401.FECHAINGESTAD > this.SAL401.NUMERACION.FECHA_RET
      ) {
        CON851("91", "91", null, "error", "error");
        return this._evaluarnumerofactura_SAL401();
      }
      if (this.SAL401.NUMERACION.ESTADO_NUM == "1") {
        CON851("13", "PACIENTE RETIRADO !", null, "error", "error");
        return this._evaluarnumerofactura_SAL401();
      }
      if (this.SAL401.NUMERACION.ESTADO_NUM == "2") {
        CON851("13", "FACTURA ANULADA !", null, "error", "error");
        return this._evaluarnumerofactura_SAL401();
      }
      if (this.SAL401.NUMERACION.ESTADO_NUM == "3") {
        CON851("13", "FACTURA BLOQUEADA !", null, "error", "error");
        return this._evaluarnumerofactura_SAL401();
      }
      if (
        this.SAL401.NUMERACION.CONTROLCAP_NUM == 0000 ||
        this.SAL401.NUMERACION.CONTROLCAP_NUM == 9999 ||
        !isNaN(this.SAL401.NUMERACION.CONTROLCAP_NUM)
      ) {
        return this._leercuenta4_SAL401();
      }
      console.error("LEER ARCHIVO CONT-CAP DLL SAL401 PASO W");
    },
    _leercuenta4_SAL401() {
      if (
        prefijofacturaMask_SAL401.value.trim() != "C" &&
        prefijofacturaMask_SAL401.value.trim() != "E" &&
        prefijofacturaMask_SAL401.value.trim() != "Ñ" &&
        prefijofacturaMask_SAL401.value.trim() != "P" &&
        prefijofacturaMask_SAL401.value.trim() != "T" &&
        prefijofacturaMask_SAL401.value.trim() != "U" &&
        this.SAL401.NUMERACION.CTLNROPACI_NUM == "S"
      ) {
        console.error("FALTA SER835F VENTANA DE CONSULTA DE NUMERO DE PACIENTES POR FACTURA");
        this._leerconvenio_SAL401();
      } else {
        console.error("FALTA PREFACTURA LINEA 3258 INV401");
        this._leerconvenio_SAL401();
      }
    },
    _leerconvenio_SAL401() {
      if (prefijofacturaMask_SAL401.value.trim() == "E" && this.SAL401.OPCIONACTIVA != "09426") {
        if (
          fechafacturaMask_SAL401.value.trim().replace(/-/g, "").substring(4, 6) == this.SAL401.FECHAACT.substring(4, 6)
        ) {
          this._leertarifa_SAL401();
        } else {
          CON851("91", "91", this._evaluarnumerofactura_SAL401(), "error", "Error");
        }
      } else {
        this._leertarifa_SAL401();
      }
    },
    _leertarifa_SAL401() {
      postData(
        {
          datosh: `${datosEnvio()}2|${this.form.sucursal_SAL401.trim()}${clasedeservicioMask_SAL401.value.trim()}${comprobanteMask_SAL401.value
            .trim()
            .padStart(6, "0")}|${this.SAL401.NUMERACION.CONVENIO_NUM}|`,
        },
        get_url("APP/SALUD/SAL401.DLL")
      )
        .then((data) => {
          console.log(data);
          this.SAL401.CONVENIO = data.TARIFA[0];
          if (clasedeservicioMask_SAL401.value.trim() == "0") {
            this.SAL401.CODTABW = this.SAL401.NUMERACION.CONVENIO_NUM;
            if (parseFloat(this.SAL401.CONVENIO.PORC_PO) == 0) {
              this.SAL401.CONVENIO.PORC_PO = "100.00";
              this.SAL401.CONVENIO.BASE_MED = "3";
            }
            if (parseFloat(this.SAL401.CONVENIO.PORC_NP) == 0) {
              this.SAL401.CONVENIO.PORC_NP = this.SAL401.CONVENIO.PORC_PO;
            }
            if (parseFloat(this.SAL401.CONVENIO.PORC_MO) == 0) {
              this.SAL401.CONVENIO.PORC_MO = this.SAL401.CONVENIO.PORC_NP;
            }
            if (parseFloat(this.SAL401.CONVENIO.PORC_MQ) == 0) {
              this.SAL401.CONVENIO.PORC_MQ = this.SAL401.CONVENIO.PORC_MO;
            }
          } else {
            if (clasedeservicioMask_SAL401.value.trim() == "7") {
              this.SAL401.SWCL = "5";
            } else {
              this.SAL401.SWCL = clasedeservicioMask_SAL401.value.trim();
            }
            if (
              !isNaN(parseInt(this.SAL401.CONVENIO.SAL_MIN)) ||
              parseInt(this.SAL401.CONVENIO.SAL_MIN) == 0 ||
              this.SAL401.CONVENIO.SAL_MIN.trim() == ""
            ) {
              this.SAL401.CONVENIO.SAL_MIN = this.SAL401.SALMINW;
            }
            this.SAL401.TIPOTABW = clasedeservicioMask_SAL401.value.trim();
            this.SAL401.CODTABW = this.SAL401.CONVENIO.TABLA_TAB[parseInt(this.SAL401.SWCL) - 1].CODTABTAR;
          }
          this.form.convenio_SAL401 = `${this.SAL401.CONVENIO.COD} ${this.SAL401.CONVENIO.DESCRIP}`;
          // SELECCION DE PUERTA DE INGRESO
          let seleccion = "1";
          if (
            this.form.unidaddeservicio_SAL401.substring(0, 2) == "02" ||
            this.form.unidaddeservicio_SAL401.substring(0, 2) == "63" ||
            this.form.unidaddeservicio_SAL401.substring(0, 2) == "08"
          ) {
            seleccion = "2";
          }
          if (this.SAL401.OPCIONACTIVA == "09426") seleccion = this.form.puertaingreso_SAL401.substring(0, 1);
          SER822(this._evaluarprefijofactura_SAL401, this._evaluarSER822_SAL401, seleccion);
        })
        .catch((err) => {
          console.error(err);
          this._evaluarnumerofactura_SAL401();
        });
    },
    _evaluarSER822_SAL401(data) {
      this.form.puertaingreso_SAL401 = `${data.COD} ${data.DESCRIP}`;
      if (
        data.COD == "2" &&
        this.form.unidaddeservicio_SAL401.substring(0, 2) != "02" &&
        this.form.unidaddeservicio_SAL401.substring(0, 2) != "08" &&
        this.form.unidaddeservicio_SAL401.substring(0, 2) != "06"
      ) {
        CON851(
          "03",
          "03",
          setTimeout(() => {
            SER822(this._evaluarnumerofactura_SAL401, this._evaluarSER822_SAL401);
          }, 300),
          "error",
          "Error"
        );
      } else {
        if (this.form.unidaddeservicio_SAL401.substring(0, 2) == "01" && data.COD == "2") {
          CON851(
            "03",
            "03",
            setTimeout(() => {
              SER822(this._evaluarnumerofactura_SAL401, this._evaluarSER822_SAL401);
            }, 300),
            "error",
            "Error"
          );
        } else {
          if (
            ($_USUA_GLOBAL[0].NIT == 830092718 ||
              $_USUA_GLOBAL[0].NIT == 830092719 ||
              $_USUA_GLOBAL[0].NIT == 900193162) &&
            (this.SAL401.NUMERACION.NIT_NUM == 830092718 ||
              this.SAL401.NUMERACION.NIT_NUM == 830092719 ||
              this.SAL401.NUMERACION.NIT_NUM == 900193162)
          ) {
            this._datosbarraspromo_SAL401();
          } else {
            this.SAL401.SWBONO = 0;
            this._ubicarcliente_SAL401();
          }
        }
      }
    },
    _ubicarcliente_SAL401() {
      if (
        prefijofacturaMask_SAL401.value.trim() != "C" &&
        prefijofacturaMask_SAL401.value.trim() != "E" &&
        prefijofacturaMask_SAL401.value.trim() != "Ñ" &&
        prefijofacturaMask_SAL401.value.trim() != "P" &&
        prefijofacturaMask_SAL401.value.trim() != "T" &&
        prefijofacturaMask_SAL401.value.trim() != "U"
      ) {
        this._mostrarcliente_SAL401();
      } else {
        this._evaluarcliente_SAL401();
      }
    },
    _evaluarcliente_SAL401() {
      validarInputs(
        {
          form: "#VALIDAR7_SAL401",
          orden: "1",
        },
        this._evaluarprefijofactura_SAL401,
        () => {
          if (clienteMask_SAL401.unmaskedValue.trim() != "" || clienteMask_SAL401.unmaskedValue != 0) {
            if (
              $_USUA_GLOBAL[0].NIT == 845000038 &&
              clasedeservicioMask_SAL401.value.trim() == "0" &&
              prefijofacturaMask_SAL401.valu.trim() == "E"
            ) {
              if (clienteMask_SAL401.unmaskedValue.trim() != 1111) {
                this._evaluarcliente_SAL401();
              } else {
                this._validarcliente2_SAL401();
              }
            } else {
              this._validarcliente2_SAL401();
            }
          } else {
            CON851("", "Digite un cliente", this._evaluarcliente_SAL401(), "error", "Error");
          }
        }
      );
    },
    _validarcliente2_SAL401() {
      postData(
        {
          datosh: `${datosEnvio()}3|${prefijofacturaMask_SAL401.value.trim()}${numerofacturaMask_SAL401.value
            .trim()
            .padStart(6, "0")}|${this.SAL401.NUMERACION.CONVENIO_NUM}|${clienteMask_SAL401.unmaskedValue.padStart(
            10,
            "0"
          )}|`,
        },
        get_url("APP/SALUD/SAL401.DLL")
      )
        .then((data) => {
          console.log(data);
          this.SAL401.CLIENTE = data.TERCERO[0];
          if (prefijofacturaMask_SAL401.value.trim() == "E") {
            if ($_USUA_GLOBAL[0].PUC == "4") {
              if (this.SAL401.CLIENTE.ACT != "27") {
                CON851("14", "14", this._evaluarcliente_SAL401(), "error", "Error");
              } else {
                this._mostrarcliente_SAL401();
              }
            } else if ($_USUA_GLOBAL[0].PUC == "6") {
              if (
                this.SAL401.CLIENTE.ACT != "27" &&
                this.SAL401.CLIENTE.ACT != "16" &&
                this.SAL401.CLIENTE.ACT != "25"
              ) {
                CON851("14", "14", this._evaluarcliente_SAL401(), "error", "Error");
              } else {
                this._mostrarcliente_SAL401();
              }
            } else {
              if (this.SAL401.CLIENTE.ACT != "25" && this.SAL401.CLIENTE.ACT != "30") {
                CON851("14", "14", this._evaluarcliente_SAL401(), "error", "Error");
              } else {
                this._mostrarcliente_SAL401();
              }
            }
          } else {
            this._mostrarcliente_SAL401();
          }
        })
        .catch((err) => {
          console.error(err);
          if (err.MENSAJE == "01") {
            this._ventanacliente_SAL401();
          } else {
            this._evaluarcliente_SAL401();
          }
        });
    },
    _mostrarcliente_SAL401() {
      if (clienteMask_SAL401.unmaskedValue == 0) {
        this._evaluarcliente_SAL401();
      } else {
        postData(
          {
            datosh: `${datosEnvio()}3|${prefijofacturaMask_SAL401.value.trim()}${numerofacturaMask_SAL401.value
              .trim()
              .padStart(6, "0")}|${this.SAL401.NUMERACION.CONVENIO_NUM}|${clienteMask_SAL401.unmaskedValue.padStart(
              10,
              "0"
            )}|`,
          },
          get_url("APP/SALUD/SAL401.DLL")
        )
          .then((data) => {
            console.log(data);
            this.SAL401.CLIENTE = data.TERCERO[0];
            if (this.SAL401.NUMERACION.DESCRIP_NUM.trim() == "") {
              this.form.cliented_SAL401 = this.SAL401.CLIENTE.DESCRIP;
            } else {
              this.form.cliented_SAL401 = this.SAL401.NUMERACION.DESCRIP_NUM;
            }
            if (
              prefijofacturaMask_SAL401.value == "C" &&
              ($_USUA_GLOBAL[0].NIT == 892000401 ||
                $_USUA_GLOBAL[0].NIT == 900648993 ||
                $_USUA_GLOBAL[0].NIT == 900755133 ||
                $_USUA_GLOBAL[0].NIT == 900804411 ||
                $_USUA_GLOBAL[0].NIT == 900870633) &&
              clienteMask_SAL401.unmaskedValue != 9999
            ) {
              if (
                this.SAL401.CLIENTE.ACT == "01" ||
                this.SAL401.CLIENTE.ACT == "03" ||
                this.SAL401.CLIENTE.ACT == "04" ||
                this.SAL401.CLIENTE.ACT == "05"
              ) {
                if (this.SAL401.OPCIONACTIVA == "09426") {
                  this._evaluaridhistoriafact_SAL401();
                } else {
                  this._ventanaordserv_SAL401();
                }
              } else {
                CON851("", "ERROR ACTIVIDAD TERCERO", this._evaluarcliente_SAL401(), "error", "Error");
              }
            } else {
              if (
                this.SAL401.ACT == "23" &&
                this.SAL401.ENTESTANCEDIT > 0 &&
                (prefijofacturaMask_SAL401.value == "P" ||
                  prefijofacturaMask_SAL401.value == "O" ||
                  prefijofacturaMask_SAL401.value == "Q" ||
                  prefijofacturaMask_SAL401.value == "R" ||
                  prefijofacturaMask_SAL401.value == "S" ||
                  prefijofacturaMask_SAL401.value == "U")
              ) {
                CON851("", "Recuerde que el POS solo cubre 24 HORAS en observación", null, "warning", "Advertencia!");
              }
              if (this.SAL401.OPCIONACTIVA == "09426") {
                this._evaluaridhistoriafact_SAL401();
              } else {
                this._ventanaordserv_SAL401();
              }
            }
          })
          .catch((err) => {
            console.error(err);
            if (err.MENSAJE == "01") {
              this._ventanacliente_SAL401();
            } else {
              this._evaluarcliente_SAL401();
            }
          });
      }
    },
    _ventanaordserv_SAL401() {
      this.SAL401.SWCREAR = 0;
      this.SAL401.VENTANAREDEXTERNA_SAL401 = "VENTANAREDEXTERNA_SAL401";
      _ventanaalterna_SALUD(
        (data = {
          ID: this.SAL401.VENTANAREDEXTERNA_SAL401,
          titulo: "VENTANA DE SERVICOS DE RED EXTERNA",
          html: `
                <div class="form-group col-md-12 col-sm-12 col-xs-12" style="float: none; margin: 0 auto;">
                    <div class="col-md-4 col-sm-4 col-xs-12">
                        <div class="inline-inputs">
                            <label class="col-md-10 col-sm-10 col-xs-10">Es un servicio autorizado por una red externa?</label>
                            <div class="input-group col-md-2 col-sm-2 col-xs-2" id="VALIDAR1VENTANAREDEXTERNA_SAL401">
                                <input id="redexterna_SAL401" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="1" data-orden="1">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2 col-sm-2 col-xs-12">
                        <div class="inline-inputs">
                            <label class="col-md-4 col-sm-4 col-xs-4">Prefijo</label>
                            <div class="input-group col-md-8 col-sm-8 col-xs-8" id="VALIDAR2VENTANAREDEXTERNA_SAL401">
                                <input id="prefordserv_SAL401" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" data-orden="1">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2 col-sm-2 col-xs-12">
                        <div class="inline-inputs">
                            <label class="col-md-4 col-sm-4 col-xs-4">Clase</label>
                            <div class="input-group col-md-8 col-sm-8 col-xs-8" id="VALIDAR2VENTANAREDEXTERNA_SAL401">
                                <input id="clordserv_SAL401" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="1" data-orden="2">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2 col-sm-2 col-xs-12">
                        <div class="inline-inputs">
                            <label class="col-md-4 col-sm-4 col-xs-4">Nro.Orden</label>
                            <div class="input-group col-md-8 col-sm-8 col-xs-8" id="VALIDAR2VENTANAREDEXTERNA_SAL401">
                                <input id="nroordserv_SAL401" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="6" data-orden="3">
                            </div>
                        </div>
                    </div>
                </div>
                `,
        })
      );
      _inputControl("disabled");
      this._evaluarredexterna_SAL401();
    },
    _evaluarredexterna_SAL401() {
      var redexternaMask_SAL401 = IMask($("#redexterna_SAL401")[0], {
        mask: "a",
        definitions: {
          a: /[N-S]/,
        },
        prepare: function (str) {
          console.debug(str);
          return str.toUpperCase();
        },
        commit: function (value, masked) {
          masked._value = value.toLowerCase();
        },
      });
      redexternaMask_SAL401.typedValue = "N";
      validarInputs(
        {
          form: "#VALIDAR1VENTANAREDEXTERNA_SAL401",
          orden: "1",
        },
        () => {
          $(`#${this.SAL401.VENTANAREDEXTERNA_SAL401}`).remove();
          this._evaluarnumerofactura_SAL401();
        },
        () => {
          if (
            redexternaMask_SAL401.value.trim().toUpperCase() == "S" ||
            redexternaMask_SAL401.value.trim().toUpperCase() == "N"
          ) {
            if (redexternaMask_SAL401.value == "N") {
              this.SAL401.SWORDSERV = "N";
              this.SAL401.ORDSERVFACT = "";
              $(`#${this.SAL401.VENTANAREDEXTERNA_SAL401}`).remove();
              return this._datopaciente_SAL401();
            }
            this.SAL401.SWORDSERV = "S";
            $("#prefordserv_SAL401").val($_USUA_GLOBAL[0].PREFIJ),
              $("#clordserv_SAL401").val(clasedeservicioMask_SAL401.value);
            return this._evaluarautorizacionsalud_SAL401("1");
          }
          CON851("", "Digite S o N", null, "error", "Error");
          this._evaluarredexterna_SAL401();
        }
      );
    },
    _evaluarautorizacionsalud_SAL401(orden) {
      validarInputs(
        {
          form: "#VALIDAR2VENTANAREDEXTERNA_SAL401",
          orden: orden,
        },
        this._evaluarredexterna_SAL401,
        () => {
          postData(
            {
              datosh: `${datosEnvio()}4|${$("#prefordserv_SAL401").val().trim()}${$("#clordserv_SAL401")
                .val()
                .trim()}${$("#nroordserv_SAL401").val().trim().padStart(6, "0")}|${
                this.SAL401.NUMERACION.CONVENIO_NUM
              }|${clienteMask_SAL401.unmaskedValue.padStart(10, "0")}|`,
            },
            get_url("APP/SALUD/SAL401.DLL")
          )
            .then((data) => {
              console.log(data);
              this.SAL401.ORDSERVFACT = `${$("#prefordserv_SAL401").val().trim()}${$("#clordserv_SAL401")
                .val()
                .trim()}${$("#nroordserv_SAL401").val().trim().padStart(6, "0")}`;
              this.SAL401.AUTORIZACION = data.AUTORIZACION[0];
              this._datopaciente_SAL401();
            })
            .catch((err) => {
              console.error(err);
              this._evaluarautorizacionsalud_SAL401();
            });
        }
      );
    },
    _datopaciente_SAL401() {
      if (
        (prefijofacturaMask_SAL401.value != "C" ||
          prefijofacturaMask_SAL401.value != "E" ||
          prefijofacturaMask_SAL401.value != "P" ||
          prefijofacturaMask_SAL401.value != "T" ||
          prefijofacturaMask_SAL401.value != "U") &&
        this.SAL401.NUMERACION.IDPAC_NUM != 000000000000001
      ) {
        if (this.SAL401.NUMERACION.IDPAC_NUM) idhistoriafactMask_SAL401.typedValue = this.SAL401.NUMERACION.IDPAC_NUM;
      }
      if (
        ($_USUA_GLOBAL[0].NIT == 892000401 || $_USUA_GLOBAL[0].NIT == 800162035) &&
        (this.form.unidaddeservicio_SAL401.substring(0, 2) == "01" ||
          this.form.unidaddeservicio_SAL401.substring(0, 2) == "02")
      ) {
        setTimeout(() => {
          SER848((data) => {
            idhistoriafactMask.typedValue = data;
            this._leerpaciente_SAL401();
          }, this._evaluarnumerofactura_SAL401);
        }, 300);
      } else if ($_USUA_GLOBAL[0].NIT == 800251482) {
        this._leerpaciente_SAL401();
      } else {
        this._evaluaridhistoriafact_SAL401();
      }
    },
    _evaluaridhistoriafact_SAL401() {
      validarInputs(
        {
          form: "#VALIDAR8_SAL401",
          orden: "1",
        },
        this._evaluarnumerofactura_SAL401,
        () => {
          if (
            idhistoriafactMask_SAL401.unmaskedValue.padStart(15, "0") == 000000000000000 ||
            idhistoriafactMask_SAL401.unmaskedValue.trim() == ""
          ) {
            this._evaluaridhistoriafact_SAL401();
          } else {
            if (
              (prefijofacturaMask_SAL401.value == "P" ||
                prefijofacturaMask_SAL401.value == "O" ||
                prefijofacturaMask_SAL401.value == "Q" ||
                prefijofacturaMask_SAL401.value == "R" ||
                prefijofacturaMask_SAL401.value == "S" ||
                prefijofacturaMask_SAL401.value == "U" ||
                prefijofacturaMask_SAL401.value == "T") &&
              this.SAL401.NUMERACION.IDPAC_NUM.trim().padStart(15, "0") !=
                idhistoriafactMask_SAL401.unmaskedValue.trim().padStart(15, "0")
            ) {
              CON851("7O", "7O", this._evaluaridhistoriafact_SAL401(), "error", "Error");
            } else {
              this._leerpaciente_SAL401();
            }
          }
        }
      );
    },
    _leerpaciente_SAL401() {
      if (
        prefijofacturaMask_SAL401.value == "A" &&
        this.SAL401.NUMERACION.IDPAC_NUM.trim().padStart(15, "0") != "1".padStart(15, "0")
      ) {
        if (
          this.SAL401.NUMERACION.IDPAC_NUM.trim().padStart(15, "0") !=
          idhistoriafactMask_SAL401.unmaskedValue.padStart(15, "0")
        ) {
          CON851("", "Paciente no coincide con el asignado en la factura!", null, "error", "");
          return this._evaluaridhistoriafact_SAL401();
        }
      }

      postData(
        { datosh: `${datosEnvio()}${idhistoriafactMask_SAL401.unmaskedValue.padStart(15, "0")}||` },
        get_url("APP/SALUD/SER810-1.DLL")
      )
        .then((data) => {
          console.log(data);
          this.datos_pacientes.novedad = "8";
          this.SAL401.PACIENTE = data["REG-PACI"][0];
          let fechalnk = moment($_USUA_GLOBAL[0].FECHALNK, "YYMMDD").format("YYYYMMDD");
          let año = fechalnk.substring(0, 4);
          let mes = fechalnk.substring(4, 6);
          let añopacie = data["REG-PACI"][0]["FECHA-CORR"].substring(0, 4);
          let mespacie = data["REG-PACI"][0]["FECHA-CORR"].substring(4, 6);
          let anopaciecreado = data["REG-PACI"][0]["FECHA-CREA"].substring(0, 4);
          let mespaciecreado = data["REG-PACI"][0]["FECHA-CREA"].substring(4, 6);
          if (this.form.unidaddeservicio_SAL401.substring(0, 2) == "02") {
            if (añopacie == "0000" && mespacie == "00") {
              if (anopaciecreado == año) {
                if (mespaciecreado > mes) {
                  this._ventanapaciente_SAL401();
                } else {
                  if (this.SAL401.NUMERACION.TIPOPACI_NUM == "*") {
                    this._leerpaciente2_SAL401();
                  } else {
                    if (this.SAL401.PACIENTE.TIPO == this.SAL401.NUMERACION.TIPOPACI_NUM) {
                      this._leerpaciente2_SAL401();
                    } else {
                      if (
                        $_USUA_GLOBAL[0].NIT == 845000038 &&
                        (this.SAL401.NUMERACION.TIPOPACI_NUM == "D" ||
                          this.SAL401.NUMERACION.TIPOPACI_NUM == "E" ||
                          this.SAL401.NUMERACION.TIPOPACI_NUM == "F") &&
                        (this.SAL401.PACIENTE.TIPO == "D" ||
                          this.SAL401.PACIENTE.TIPO == "E" ||
                          this.SAL401.PACIENTE.TIPO == "F")
                      ) {
                        this._leerpaciente2_SAL401();
                      } else {
                        CON851("3F", "3F", this._evaluaridhistoriafact_SAL401(), "error", "Error");
                      }
                    }
                  }
                }
              } else {
                this._ventanapaciente_SAL401();
              }
            } else {
              if (añopacie == año) { 
                console.debug(mes, mespacie);
                if (mes > mespacie) {
                  this._ventanapaciente_SAL401();
                } else {
                  if (this.SAL401.NUMERACION.TIPOPACI_NUM == "*") {
                    this._leerpaciente2_SAL401();
                  } else {
                    if (this.SAL401.PACIENTE.TIPO == this.SAL401.NUMERACION.TIPOPACI_NUM) {
                      this._leerpaciente2_SAL401();
                    } else {
                      if (
                        $_USUA_GLOBAL[0].NIT == 845000038 &&
                        (this.SAL401.NUMERACION.TIPOPACI_NUM == "D" ||
                          this.SAL401.NUMERACION.TIPOPACI_NUM == "E" ||
                          this.SAL401.NUMERACION.TIPOPACI_NUM == "F") &&
                        (this.SAL401.PACIENTE.TIPO == "D" ||
                          this.SAL401.PACIENTE.TIPO == "E" ||
                          this.SAL401.PACIENTE.TIPO == "F")
                      ) {
                        this._leerpaciente2_SAL401();
                      } else {
                        CON851("3F", "3F", this._evaluaridhistoriafact_SAL401(), "error", "Error");
                      }
                    }
                  }
                }
              } else {
                this._ventanapaciente_SAL401();
              }
            }
            // if (añopacie == '0000' && mespacie == '00') {
            //     _ventanapaciente_SAL401();
            // } else {
            //     if (añopacie == año) {
            //         if (mespacie > mes) {
            //             _ventanapaciente_SAL401();
            //         } else {
            //             if (this.SAL401.NUMERACION.TIPOPACI_NUM == '*') {
            //                 this._leerpaciente2_SAL401();
            //             } else {
            //                 if (this.SAL401.PACIENTE.TIPO == this.SAL401.NUMERACION.TIPOPACI_NUM) {
            //                     this._leerpaciente2_SAL401();
            //                 } else {
            //                     if ($_USUA_GLOBAL[0].NIT == 845000038 && (this.SAL401.NUMERACION.TIPOPACI_NUM == 'D' || this.SAL401.NUMERACION.TIPOPACI_NUM == 'E' || this.SAL401.NUMERACION.TIPOPACI_NUM == 'F') && (this.SAL401.PACIENTE.TIPO == 'D' || this.SAL401.PACIENTE.TIPO == 'E' || this.SAL401.PACIENTE.TIPO == 'F')) {
            //                         this._leerpaciente2_SAL401();
            //                     } else {
            //                         CON851('3F', '3F', this._evaluaridhistoriafact_SAL401(), 'error', 'Error');
            //                     }
            //                 }
            //             }
            //         }
            //     } else {
            //         _ventanapaciente_SAL401();
            //     }
            // }
          } else {
            if (this.SAL401.SWCREAR == 0) {
              this._ventanapaciente_SAL401();
            } else {
              if (this.SAL401.NUMERACION.TIPOPACI_NUM == "*") {
                this._leerpaciente2_SAL401();
              } else {
                if (this.SAL401.PACIENTE.TIPO == this.SAL401.NUMERACION.TIPOPACI_NUM) {
                  this._leerpaciente2_SAL401();
                } else {
                  if (
                    $_USUA_GLOBAL[0].NIT == 845000038 &&
                    (this.SAL401.NUMERACION.TIPOPACI_NUM == "D" ||
                      this.SAL401.NUMERACION.TIPOPACI_NUM == "E" ||
                      this.SAL401.NUMERACION.TIPOPACI_NUM == "F") &&
                    (this.SAL401.PACIENTE.TIPO == "D" ||
                      this.SAL401.PACIENTE.TIPO == "E" ||
                      this.SAL401.PACIENTE.TIPO == "F")
                  ) {
                    this._leerpaciente2_SAL401();
                  } else {
                    CON851("3F", "3F", this._evaluaridhistoriafact_SAL401(), "error", "Error");
                  }
                }
              }
            }
          }
        })
        .catch((err) => {
          console.error(err);
          this._revisarbloqueos_SAL401(
            (data) => {
              this.datos_pacientes.novedad = "7";
              this._ventanapaciente_SAL401();
            },
            this._evaluaridhistoriafact_SAL401,
            (datos = { CODIGO: "IS767" })
          );
        });
    },
    _leerpaciente2_SAL401() {
      if (
        $_USUA_GLOBAL[0].NIT != 844003225 &&
        $_USUA_GLOBAL[0].NIT != 800251482 &&
        $_USUA_GLOBAL[0].NIT != 830092718 &&
        $_USUA_GLOBAL[0].NIT != 900193162 &&
        prefijofacturaMask_SAL401.value != "C" &&
        prefijofacturaMask_SAL401.value != "E" &&
        prefijofacturaMask_SAL401.value != "Ñ" &&
        prefijofacturaMask_SAL401.value != "P" &&
        prefijofacturaMask_SAL401.value != "T" &&
        prefijofacturaMask_SAL401.value != "U" &&
        this.SAL401.NUMERACION.CONTRATO_NUM.trim() != "" &&
        this.SAL401.PACIENTE.CONTRATO.trim() != "" &&
        this.SAL401.NUMERACION.CONTRATO_NUM.trim() == this.SAL401.PACIENTE.CONTRATO.trim()
      ) {
        CON851("2M", "2M", this._evaluaridhistoriafact_SAL401(), "error", "Error");
      } else {
        if (
          $_USUA_GLOBAL[0].NIT == 900405505 &&
          idhistoriafactMask_SAL401.unmaskedValue == 86059367 &&
          this.SAL401.NUMERACION.CONTRATO_NUM.trim() == this.SAL401.PACIENTE.CONTRATO.trim()
        ) {
          CON851("2M", "2M", this._evaluaridhistoriafact_SAL401(), "error", "Error");
        } else {
          if (this.SAL401.PACIENTE.TUTELA.trim() == "S") {
            CON851("5B", "5B", null, "warning", "Advertencia!");
          }
          if (this.SAL401.PACIENTE["ALT-COS"].trim() == "S") {
            CON851("5J", "5J", null, "warning", "Advertencia!");
          }
          if (this.SAL401.PACIENTE["PROG-ESP"].trim() == "S") {
            CON851("5Q", "5Q", null, "warning", "Advertencia!");
          }
          if (this.SAL401.PACIENTE["CRONICO"].trim() == "S") {
            CON851("7A", "7A", null, "warning", "Advertencia!");
          }
          if (this.SAL401.PACIENTE.MULTICONSUL.trim() == "S") {
            CON851("5V", "5V", null, "warning", "Advertencia!");
          }
          if (
            (prefijofacturaMask_SAL401.value == "P" ||
              prefijofacturaMask_SAL401.value == "T" ||
              prefijofacturaMask_SAL401.value == "O" ||
              prefijofacturaMask_SAL401.value == "Q" ||
              prefijofacturaMask_SAL401.value == "R" ||
              prefijofacturaMask_SAL401.value == "S" ||
              prefijofacturaMask_SAL401.value == "U" ||
              prefijofacturaMask_SAL401.value == "V" ||
              prefijofacturaMask_SAL401.value == "W" ||
              prefijofacturaMask_SAL401.value == "X" ||
              prefijofacturaMask_SAL401.value == "Y" ||
              prefijofacturaMask_SAL401.value == "Z") &&
            $_USUA_GLOBAL[0].NIT == 800037021 &&
            this.SAL401.PACIENTE["TIPO-ID"].trim() != "RC" &&
            this.SAL401.PACIENTE["TIPO-ID"].trim() != "MSI" &&
            idhistoriafactMask_SAL401.unmaskedValue.padStart(15, "0") != this.SAL401.NUMERACION.IDPAC_NUM
          ) {
            CON851("7O", "7O", this._evaluaridhistoriafact_SAL401(), "error", "Error");
          } else {
            this.form.paciented_SAL401 = this.SAL401.PACIENTE.DESCRIP;
            this.form.sexo_SAL401 = this.SAL401.PACIENTE.SEXO;
            this.SAL401.PACIENTE.EDAD = calcular_edad(moment(this.SAL401.PACIENTE.NACIM).format("YYYY-MM-DD"));
            this.form.edad_SAL401 = this.SAL401.PACIENTE.EDAD.vlr_edad;
            if (
              ($_USUA_GLOBAL[0].NIT == 845000038 || $_USUA_GLOBAL[0].NIT == 900005594) &&
              this.SAL401.PACIENTE.EDAD.unid_edad == "A" &&
              (this.SAL401.PACIENTE.EDAD.vlr_edad == 45 ||
                this.SAL401.PACIENTE.EDAD.vlr_edad == 50 ||
                this.SAL401.PACIENTE.EDAD.vlr_edad == 55 ||
                this.SAL401.PACIENTE.EDAD.vlr_edad == 60 ||
                this.SAL401.PACIENTE.EDAD.vlr_edad == 65 ||
                this.SAL401.PACIENTE.EDAD.vlr_edad == 70 ||
                this.SAL401.PACIENTE.EDAD.vlr_edad == 75 ||
                this.SAL401.PACIENTE.EDAD.vlr_edad == 80 ||
                this.SAL401.PACIENTE.EDAD.vlr_edad == 85 ||
                this.SAL401.PACIENTE.EDAD.vlr_edad == 90 ||
                this.SAL401.PACIENTE.EDAD.vlr_edad == 95 ||
                this.SAL401.PACIENTE.EDAD.vlr_edad == 100 ||
                this.SAL401.PACIENTE.EDAD.vlr_edad == 105)
            ) {
              CON851("8T", "8T", null, "warning", "Advertencia!");
            }
            if (
              ($_USUA_GLOBAL[0].NIT == 845000038 || $_USUA_GLOBAL[0].NIT == 900005594) &&
              this.SAL401.PACIENTE.EDAD.unid_edad == "A" &&
              this.SAL401.PACIENTE.EDAD.vlr_edad > 11 &&
              this.SAL401.PACIENTE.EDAD.vlr_edad < 29
            ) {
              if (this.SAL401.PACIENTE.EDAD.vlr_edad > 11 && this.SAL401.PACIENTE.EDAD.vlr_edad < 18) {
                CON851("8V", "8V", null, "warning", "Advertencia!");
              } else {
                CON851("8W", "8W", null, "warning", "Advertencia!");
              }
            }
            if (
              $_USUA_GLOBAL[0].NIT == 830511298 &&
              (this.form.sucursal_SAL401 == "05" ||
                this.form.sucursal_SAL401 == "06" ||
                this.form.sucursal_SAL401 == "18" ||
                this.form.sucursal_SAL401 == "19" ||
                this.form.sucursal_SAL401 == "14" ||
                this.form.sucursal_SAL401 == "02") &&
              this.SAL401.PACIENTE.EPS.trim() == "CCF055"
            ) {
              console.error("FALTA MIGRAR VARIABLES DE GESTANTE");
              $_this = this;
              var ventanagestriesgo = bootbox.dialog({
                size: "small",
                title: "GESTION DEL RIESGO",
                message:
                  '<div class="row"> ' +
                  '<div class="col-md-12"> ' +
                  '<div class="form-group"> ' +
                  '<label class="col-md-6 control-label" for="name">' +
                  "PACIENTE GESTION DE RIESGO" +
                  "</label> " +
                  '<div class="col-md-6" id="VALIDARVENTANARIESGO1_SAL401"> ' +
                  '<input id="gestriesgo_SAL401" class="form-control input-md" data-orden="1" maxlength="1"> ' +
                  '<span class="help-block">' +
                  "S/N" +
                  "</span> " +
                  "</div> " +
                  "</div> " +
                  '<div class="form-group"> ' +
                  '<label class="col-md-6 control-label" for="name">' +
                  "Gestante?: " +
                  "</label> " +
                  '<div class="col-md-6" id="VALIDARVENTANARIESGO2_SAL401"> ' +
                  '<input id="gestante_SAL401" class="form-control input-md" data-orden="1" maxlength="1"> ' +
                  '<span class="help-block">' +
                  "S/N" +
                  "</span> " +
                  "</div> " +
                  "</div> " +
                  '<div class="form-group"> ' +
                  '<label class="col-md-6 control-label" for="name">' +
                  "Cronico?: " +
                  "</label> " +
                  '<div class="col-md-6" id="VALIDARVENTANARIESGO3_SAL401"> ' +
                  '<input id="cronico1_SAL401" class="form-control input-md" data-orden="1" maxlength="1"> ' +
                  '<span class="help-block">' +
                  "S/N" +
                  "</span> " +
                  "</div> " +
                  "</div> " +
                  "</div>" +
                  "</div>",
                buttons: {
                  confirm: {
                    label: "Aceptar",
                    className: "btn-primary",
                    callback: function () {
                      ventanagestriesgo.off("show.bs.modal");
                      setTimeout($_this._leerpaciente3_SAL401, 300);
                    },
                  },
                  cancelar: {
                    label: "Cancelar",
                    className: "btn-danger",
                    callback: function () {
                      ventanagestriesgo.off("show.bs.modal");
                      $_this._evaluaridhistoriafact_SAL401();
                    },
                  },
                },
              });
              ventanagestriesgo.init($(".modal-footer").hide());
              ventanagestriesgo.init($_this._evaluarriesgo_SAL401());
              ventanagestriesgo.on("shown.bs.modal", function () {
                $("#gestriesgo_SAL401").focus();
              });
            } else {
              this._leerpaciente3_SAL401();
            }
          }
        }
      }
    },
    _evaluarriesgo_SAL401() {
      var gestriesgoMask_SAL401 = IMask($("#gestriesgo_SAL401")[0], {
        mask: "a",
        definitions: {
          a: /[N-S]/,
        },
        prepare: function (str) {
          return str.toUpperCase();
        },
        commit: function (value, masked) {
          masked._value = value.toLowerCase();
        },
      });
      validarInputs(
        {
          form: "#VALIDARVENTANARIESGO1_SAL401",
          orden: "1",
        },
        () => {
          $(".btn-danger").click();
        },
        () => {
          this.SAL401.GESTRIESGFACT = gestriesgoMask_SAL401.value;
          if (this.SAL401.GESTRIESGFACT.trim() == "") {
            CON851("", "Digite S o N", this._evaluarriesgo_SAL401(), "error", "Error");
          } else {
            if (this.SAL401.GESTRIESGFACT == "S" && this.SAL401.PACIENTE.SEXO == "F") {
              this._evaluargestgestante_SAL401();
            } else {
              this.SAL401.GESTGESTAFACT == "";
              this.SAL401.GESTCRONIFACT == "";
              $(".btn-primary").click();
            }
          }
        }
      );
    },
    _evaluargestgestante_SAL401() {
      var gestanteMask_SAL401 = IMask($("#gestante_SAL401")[0], {
        mask: "a",
        definitions: {
          a: /[N-S]/,
        },
        prepare: function (str) {
          return str.toUpperCase();
        },
        commit: function (value, masked) {
          masked._value = value.toLowerCase();
        },
      });
      validarInputs(
        {
          form: "#VALIDARVENTANARIESGO2_SAL401",
          orden: "1",
        },
        his._evaluarriesgo_SAL401,
        () => {
          this.SAL401.GESTGESTAFACT = gestanteMask_SAL401.value;
          if (this.SAL401.GESTGESTAFACT.trim() == "") {
            CON851("", "Digite S o N", this._evaluargestgestante_SAL401(), "error", "Error");
          } else {
            this._evaluargestcronico_SAL401();
          }
        }
      );
    },
    _evaluargestcronico_SAL401() {
      var cronicoMask_SAL401 = IMask($("#cronico1_SAL401")[0], {
        mask: "a",
        definitions: {
          a: /[N-S]/,
        },
        prepare: function (str) {
          return str.toUpperCase();
        },
        commit: function (value, masked) {
          masked._value = value.toLowerCase();
        },
      });
      validarInputs(
        {
          form: "#VALIDARVENTANARIESGO2_SAL401",
          orden: "1",
        },
        his._evaluarriesgo_SAL401,
        () => {
          this.SAL401.GESTCRONIFACT = cronicoMask_SAL401.value;
          if (this.SAL401.GESTCRONIFACT.trim() == "") {
            CON851("", "Digite S o N", this._evaluargestcronico_SAL401(), "error", "Error");
          } else {
            $(".btn-primary").click();
          }
        }
      );
    },
    _leerpaciente3_SAL401() {
      this.form.estrato_SAL401 = this.SAL401.PACIENTE.ESTRATO;
      let afiliacion = {
        1: "COTIZANTE",
        2: "BENEFICIARIO",
        3: "COT. PENSIONADO",
        4: "UPC ADICIONAL",
        0: "SIN DETERMINAR",
      };
      this.form.tipoafiliacion_SAL401 = afiliacion[this.SAL401.PACIENTE["TIPO-AFIL"]];
      this.form.ciudad_SAL401 = this.SAL401.PACIENTE.CIUDAD.trim();
      if (
        prefijofacturaMask_SAL401.value == "P" ||
        prefijofacturaMask_SAL401.value == "O" ||
        prefijofacturaMask_SAL401.value == "Q" ||
        prefijofacturaMask_SAL401.value == "R" ||
        prefijofacturaMask_SAL401.value == "S" ||
        prefijofacturaMask_SAL401.value == "U"
      ) {
        $("#INGRESO_SAL401").removeClass("hidden");
        this.form.ingreso_SAL401 = `${this.SAL401.NUMERACION.FECHA_ING} - ${this.SAL401.ENTESTANCEDIT}`;
      }
      if (
        ($_USUA_GLOBAL[0].NIT != 845000038 || $_USUA_GLOBAL[0].NIT != 800251482) &&
        prefijofacturaMask_SAL401.value != "C" &&
        prefijofacturaMask_SAL401.value != "E" &&
        prefijofacturaMask_SAL401.value != "Ñ" &&
        prefijofacturaMask_SAL401.value != "P" &&
        prefijofacturaMask_SAL401.value != "T" &&
        prefijofacturaMask_SAL401.value != "U" &&
        idhistoriafactMask_SAL401.unmaskedValue > 1
      ) {
        postData(
          {
            datosh: `${datosEnvio()}${idhistoriafactMask_SAL401.unmaskedValue.padStart(
              15,
              "0"
            )}|${fechafacturaMask_SAL401.value.replace(/-/g, "")}|${
              prefijofacturaMask_SAL401.value
            }${numerofacturaMask_SAL401.value.trim().padStart(6, "0")}|`,
          },
          get_url("APP/SALUD/SER836C.DLL")
        )
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      if ($_USUA_GLOBAL[0].NIT == 844003225 && this.SAL401.PACIENTE.CIUDAD.trim() != 85001) {
        this.SAL401.PACIENTE.DERECHO = "2";
      }
      if (
        this.SAL401.PACIENTE.DERECHO == "6" &&
        prefijofacturaMask_SAL401.value != "C" &&
        prefijofacturaMask_SAL401.value != "E" &&
        prefijofacturaMask_SAL401.value != "Ñ" &&
        prefijofacturaMask_SAL401.value != "U"
      ) {
        CON851("2T", "2T", null, "warning", "Advertencia!");
      }
      if (
        (this.SAL401.PACIENTE.DERECHO == "2" ||
          this.SAL401.PACIENTE.DERECHO == "5" ||
          this.SAL401.PACIENTE.DERECHO == "4" ||
          this.SAL401.PACIENTE.DERECHO == "7" ||
          this.SAL401.PACIENTE.DERECHO == "8" ||
          this.SAL401.PACIENTE.DERECHO == "A") &&
        prefijofacturaMask_SAL401.value != "C" &&
        prefijofacturaMask_SAL401.value != "E" &&
        prefijofacturaMask_SAL401.value != "Ñ" &&
        prefijofacturaMask_SAL401.value != "U"
      ) {
        if (this.SAL401.PACIENTE.DERECHO == "5") {
          CON851("2N", "2N", null, "error", "Error");
          if (this.form.puertaingreso_SAL401.substring(0, 1) == "2") {
            this._evaluaridhistoriafact_SAL401();
          } else {
            this._leerpaciente4_SAL401();
          }
        } else {
          CON851("80", "80", null, "error", "Error");
          if (this.form.puertaingreso_SAL401.substring(0, 1) == "2" && $_USUA_GLOBAL[0].NIT == 800037979) {
            this._evaluaridhistoriafact_SAL401();
          } else if ($_USUA_GLOBAL[0].NIT == 800162035 || $_USUA_GLOBAL[0].NIT == 900405505) {
            this._evaluaridhistoriafact_SAL401();
          } else {
            this._leerpaciente4_SAL401();
          }
        }
      } else {
        this._leerpaciente4_SAL401();
      }
    },
    _leerpaciente4_SAL401() {
      console.log("leer paciente 4");
      if (
        prefijofacturaMask_SAL401.value != "C" &&
        prefijofacturaMask_SAL401.value != "E" &&
        prefijofacturaMask_SAL401.value != "Ñ" &&
        prefijofacturaMask_SAL401.value != "U"
      ) {
        switch (prefijofacturaMask_SAL401.value) {
          case "0":
            if (
              this.SAL401.PACIENTE["REST-DROG"].trim() == "N" &&
              prefijofacturaMask_SAL401.value != "C" &&
              prefijofacturaMask_SAL401.value != "E" &&
              prefijofacturaMask_SAL401.value != "Ñ" &&
              prefijofacturaMask_SAL401.value != "U"
            ) {
              CON851("80", "80", null, "error", "Error");
              this._evaluaridhistoriafact_SAL401();
            } else {
              this._leerpaciente5_SAL401();
            }
            break;
          case "1":
            if (this.SAL401.PACIENTE["REST-CIRU"].trim() == "N") {
              CON851("80", "80", null, "error", "Error");
              this._evaluaridhistoriafact_SAL401();
            } else {
              this._leerpaciente5_SAL401();
            }
            break;
          case "2":
            if (this.SAL401.PACIENTE["REST-LABO"].trim() == "N") {
              CON851("80", "80", null, "error", "Error");
              this._evaluaridhistoriafact_SAL401();
            } else {
              this._leerpaciente5_SAL401();
            }
            break;
          case "3":
            if (this.SAL401.PACIENTE["REST-IMAG"].trim() == "N") {
              CON851("80", "80", null, "error", "Error");
              this._evaluaridhistoriafact_SAL401();
            } else {
              this._leerpaciente5_SAL401();
            }
            break;
          case "7":
            if (this.SAL401.PACIENTE["REST-PYP"].trim() == "N") {
              CON851("80", "80", null, "error", "Error");
              this._evaluaridhistoriafact_SAL401();
            } else {
              this._leerpaciente5_SAL401();
            }
            break;
          default:
            this._leerpaciente5_SAL401();
            break;
        }
      } else {
        this._leerpaciente5_SAL401();
      }
    },
    _leerpaciente5_SAL401() {
      if (this.SAL401.UNDEDADMAXSERV.trim() == "D" && this.SAL401.PACIENTE.EDAD.unid_edad != "D") {
        CON851("74", "74", this._evaluaridhistoriafact_SAL401(), "error", "Error");
      } else if (this.SAL401.UNDEDADMINSERV.trim() == "M" && this.SAL401.PACIENTE.EDAD.unid_edad == "D") {
        CON851("74", "74", this._evaluaridhistoriafact_SAL401(), "error", "Error");
      } else if (this.SAL401.UNDEDADMAXSERV.trim() == "M" && this.SAL401.PACIENTE.EDAD.unid_edad == "A") {
        CON851("74", "74", this._evaluaridhistoriafact_SAL401(), "error", "Error");
      } else if (this.SAL401.UNDEDADMINSERV.trim() == "A" && this.SAL401.PACIENTE.EDAD.unid_edad != "A") {
        CON851("74", "74", this._evaluaridhistoriafact_SAL401(), "error", "Error");
      } else if (
        this.SAL401.UNDEDADMAXSERV.trim() == "A" &&
        this.SAL401.PACIENTE.EDAD.unid_edad == "A" &&
        this.SAL401.PACIENTE.EDAD.vlr_edad > this.SAL401.VLREDADMAXSERV
      ) {
        CON851("74", "74", this._evaluaridhistoriafact_SAL401(), "error", "Error");
      } else if (
        this.SAL401.UNDEDADMINSERV.trim() == "A" &&
        this.SAL401.PACIENTE.EDAD.unid_edad == "A" &&
        this.SAL401.PACIENTE.EDAD.vlr_edad < this.SAL401.VLREDADMINSERV
      ) {
        CON851("74", "74", this._evaluaridhistoriafact_SAL401(), "error", "Error");
      } else {
        if (
          this.SAL401.CLIENTE.ENTIDAD.trim() != "SIN001" &&
          prefijofacturaMask_SAL401.value != "C" &&
          prefijofacturaMask_SAL401.value != "E" &&
          prefijofacturaMask_SAL401.value != "Ñ" &&
          prefijofacturaMask_SAL401.value != "U" &&
          prefijofacturaMask_SAL401.value != "T" &&
          this.SAL401.NUMERACION.PACIENTE_NUM.trim() != "ADRES - ADM VACUNACIÓN COVID-19 - 2021"
        ) {
          if (
            this.SAL401.CLIENTE.ENTIDAD.trim() != "EAR001" &&
            this.SAL401.PACIENTE.EPS.trim() != "EAR001" &&
            this.SAL401.PACIENTE.EPS.trim() != "EAR002" &&
            this.SAL401.PACIENTE.EPS.trim() != "EAR003" &&
            this.SAL401.PACIENTE.EPS.trim() != "EAR004" &&
            this.SAL401.PACIENTE.EPS.trim() != "EAR005"
          ) {
            if (
              this.SAL401.CLIENTE.ENTIDAD.trim() != "EAR000" &&
              this.SAL401.CLIENTE.ENTIDAD.trim() != "PEC004" &&
              this.SAL401.CLIENTE.ENTIDAD.trim() != "EAR027" &&
              this.SAL401.PACIENTE.EPS.trim() != "EAR000" &&
              this.SAL401.PACIENTE.EPS.trim() != "PEC004" &&
              this.SAL401.PACIENTE.EPS.trim() != "EAR027"
            ) {
              // if (clienteMask_SAL401.unmaskedValue.padStart(10,'0') != this.SAL401.PACIENTE['NIT-FACT'].trim()) {
              if (this.SAL401.CLIENTE.ENTIDAD.trim() != this.SAL401.PACIENTE.EPS.trim()) {
                CON851("9S", "9S", null, "warning", "Advertencia!");
                if (
                  clasedeservicioMask_SAL401.value == "7" &&
                  isNaN(this.SAL401.CLIENTE.VENDEDOR.trim().padStart(5, "0"))
                ) {
                  this._evaluaridhistoriafact_SAL401();
                } else if ($_USUA_GLOBAL[0] == 900229438 && this.SAL401.CLIENTE.ENTIDAD.trim() == "SIN438") {
                  this._evaluaridhistoriafact_SAL401();
                } else if (
                  $_USUA_GLOBAL[0].NIT == 800162035 ||
                  $_USUA_GLOBAL[0].NIT == 900405505 ||
                  $_USUA_GLOBAL[0].NIT == 900005594 ||
                  $_USUA_GLOBAL[0].NIT == 830512772 ||
                  $_USUA_GLOBAL[0].NIT == 830511298 ||
                  $_USUA_GLOBAL[0].NIT == 822001570 ||
                  $_USUA_GLOBAL[0].NIT == 844003225 ||
                  $_USUA_GLOBAL[0].NIT == 900073674
                ) {
                  this._evaluaridhistoriafact_SAL401();
                } else {
                  this._evaluaridhistoriafact_SAL401();
                  // this._leerpaciente6_SAL401();
                }
              } else {
                this._leerpaciente6_SAL401();
              }
            } else {
              this._leerpaciente6_SAL401();
            }
          } else {
            this._leerpaciente6_SAL401();
          }
        } else {
          this._leerpaciente6_SAL401();
        }
      }
    },
    _leerpaciente6_SAL401() {
      if (
        $_USUA_GLOBAL[0].NIT == 900229438 &&
        this.SAL401.PACIENTE.EPS.trim() == "SIN438" &&
        this.SAL401.PACIENTE["FECHA-VENCE"].trim() < this.SAL401.FECHAINGESTAD.trim()
      ) {
        CON851("80", "80", this._evaluaridhistoriafact_SAL401(), "error", "Error");
      } else if (
        ($_USUA_GLOBAL[0].NIT == 900004059 || $_USUA_GLOBAL[0].NIT == 891855847) &&
        this.SAL401.PACIENTE["NIT-FACT"].trim() != clienteMask_SAL401.unmaskedValue.padStart(10, "0") &&
        this.SAL401.PACIENTE["NIT-FACT"] == 9999
      ) {
        CON851("9S", "9S", this._evaluaridhistoriafact_SAL401(), "error", "Error");
      } else {
        this._buscarconsultas_SAL401();
      }
    },
    _buscarconsultas_SAL401() {
      this.SAL401.ORDSALIDAFACT = "";
      // CLINICA CASANARE BUSCARCONSULTAS
      setTimeout(() => {
        SER835(
          {
            PACIENTE: idhistoriafactMask_SAL401.unmaskedValue.padStart(15, "0"),
            CLFACT: clasedeservicioMask_SAL401.value,
            NITUSU: $_USUA_GLOBAL[0].NIT,
            DESCRIPPACI: this.form.paciented_SAL401.trim(),
          },
          this._evaluaridhistoriafact_SAL401,
          this._buscarconsultas2_SAL401
        );
      }, 300);
    },
    _buscarconsultas2_SAL401() {
      this._revisarbloqueos_SAL401(
        (data) => {},
        () => {
          this.SAL401.SWOCULTAR = 1;
        },
        (params = { CODIGO: "I4IO" })
      );
      if (clasedeservicioMask_SAL401.value == "0" && this.SAL401.TIPODRFACT == "2") {
        console.error("INV401D");
      }
      if (clasedeservicioMask_SAL401.value == "1") {
        let viasacceso = [
          { CODIGO: "1", DESCRIPCION: "ABDOMINAL" },
          { CODIGO: "2", DESCRIPCION: "CUELLO" },
          { CODIGO: "3", DESCRIPCION: "TORAXICA" },
          { CODIGO: "4", DESCRIPCION: "CRANEAL" },
          { CODIGO: "5", DESCRIPCION: "MIEMB.SUP.IZQ" },
          { CODIGO: "6", DESCRIPCION: "MIEMB.SUP.DER" },
          { CODIGO: "7", DESCRIPCION: "MIEMB.INF.IZQ" },
          { CODIGO: "8", DESCRIPCION: "MIEMB.INF.DER" },
          { CODIGO: "9", DESCRIPCION: "RECTAL" },
          { CODIGO: "A", DESCRIPCION: "VAGINAL" },
          { CODIGO: "B", DESCRIPCION: "OIDO" },
          { CODIGO: "C", DESCRIPCION: "NARIZ" },
          { CODIGO: "D", DESCRIPCION: "BOCA" },
          { CODIGO: "E", DESCRIPCION: "OCULAR" },
          { CODIGO: "G", DESCRIPCION: "OTRO" },
        ];
        setTimeout(() => {
          POPUP(
            {
              array: viasacceso,
              titulo: "VIA DE ACCESO",
              indices: [{ id: "CODIGO", label: "DESCRIPCION" }],
              callback_f: this._evaluaridhistoriafact_SAL401,
            },
            this._evaluarviaacceso_SAL401
          );
        }, 300);
      } else {
        this.SAL401.VIAFACT = "00";
        this.SAL401.CRUENTAFACT = "00";
        setTimeout(this._dato1_SAL401, 300);
      }
    },
    _evaluarviaacceso_SAL401(data) {
      let array = {
        A: "10",
        B: "11",
        C: "12",
        D: "13",
        E: "14",
        G: "15",
      };
      if (array[data.CODIGO]) {
        this.SAL401.VIAFACT = array[data.CODIGO];
      } else {
        this.SAL401.VIAFACT = data.CODIGO;
      }
      $("#CIRUGIA_SAL401").removeClass("hidden");
      this.form.viaacceso_SAL401 = `${this.SAL401.VIAFACT} ${data.DESCRIPCION}`;
      let intervenciones = [
        { CODIGO: "1", DESCRIPCION: "CRUENTA" },
        { CODIGO: "2", DESCRIPCION: "INCRUENTA" },
      ];
      setTimeout(() => {
        POPUP(
          {
            array: intervenciones,
            titulo: "TIPO DE INTERVENCION",
            indices: [{ id: "CODIGO", label: "DESCRIPCION" }],
            callback_f: this._evaluaridhistoriafact_SAL401,
          },
          (data) => {
            this.SAL401.CRUENTAFACT = data.CODIGO;
            this.form.cruenta_SAL401 = `${this.SAL401.CRUENTAFACT} ${data.DESCRIPCION}`;
            this._dato1_SAL401();
          }
        );
      }, 300);
    },
    _dato1_SAL401() {
      this.SAL401.TARIFFACT = this.SAL401.CODTABW;
      if (
        (clasedeservicioMask_SAL401.value == "3" ||
          clasedeservicioMask_SAL401.value == "4" ||
          clasedeservicioMask_SAL401.value == "5" ||
          clasedeservicioMask_SAL401.value == "7") &&
        this.SAL401.SWORDSERV == "N"
      ) {
        SER836(
          {
            PACIENTE: idhistoriafactMask_SAL401.unmaskedValue.padStart(15, "0"),
            FECHA: fechafacturaMask_SAL401.value.replace(/-/g, ""),
            ANO: this.SAL401.FECHAACT.substring(0, 4),
          },
          () => {
            this._validarcodigo_SAL401();
            this.SAL401.FINALIDESTAD = "";
          },
          (data) => {
            this.SAL401.CITAS = data;
            this.SAL401.FINALIDESTAD = data.FINALID_CIT;
            this.form.codigodeservicio_SAL401 = data.LLAVE_CIT.substring(34, 46);
            if (this.SAL401.CITAS.LLAVE_CIT.substring(46, 48) != this.form.sucursal_SAL401) {
              CON851("", "Revise la sucursal de la cita", null, "error", "Error");
              setTimeout(this._dato1_SAL401, 300);
            } else {
              postData(
                { datosh: `${datosEnvio()}5||||${data.MED_CIT.trim().padStart(10, "0")}|` },
                get_url("APP/SALUD/SAL401.DLL")
              )
                .then((data) => {
                  this.form.especialidad_SAL401 = data.TABLA_ESP[0].ESP;
                  atendidoMask_SAL401.typedValue = this.SAL401.CITAS.MED_CIT;
                })
                .catch((error) => {
                  console.error(error);
                });
              if (
                $_USUA_GLOBAL[0].NIT == 900405505 &&
                this.SAL401.CITAS.FECHA_CITA != fechafacturaMask_SAL401.value.replace(/-/g, "") &&
                idhistoriafactMask_SAL401.unmaskedValue != 1
              ) {
                con851("9F", "9F", null, "error", "Error");
                if (
                  clasedeservicioMask_SAL401.value != "2" &&
                  clasedeservicioMask_SAL401.value != "3" &&
                  clasedeservicioMask_SAL401.value != "7"
                ) {
                  this._revisarbloqueos_SAL401(
                    (data) => {
                      this._validarcodigo_SAL401();
                    },
                    this._evaluaridhistoriafact_SAL401,
                    (params = { CODIGO: "I41CI" })
                  );
                } else {
                  this._validarcodigo_SAL401();
                }
              } else {
                this._validarcodigo_SAL401();
              }
            }
          }
        );
      } else {
        this._validarcodigo_SAL401();
      }
    },
    _validarcodigo_SAL401() {
      if (this.SAL401.CONTEO == 30) {
        this._datodescuento_SAL401();
      } else if (this.SAL401.CONTEO == 1) {
        if (clasedeservicioMask_SAL401.value == "0") {
          this._datobarras_SAL401();
        } else {
          console.error("FALTA COLOCAR LOS PRIMEROS DE DIVISION CUP Y DIV2CUP Y DIAGNCUP Y ATENDIECUP");
          this._datobarras_SAL401();
        }
      } else {
        this._datobarras_SAL401();
      }
    },
    _datobarras_SAL401() {
      if (clasedeservicioMask_SAL401.value == "0" && $_USUA_GLOBAL[0].BARRAS == "S" && this.SAL401.TIPODRFACT == "1") {
        var $_this = this;
        var ventanaCodebar = bootbox.dialog({
          size: "small",
          title: "CODIGO DE BARRAS",
          message:
            '<div class="row"> ' +
            '<div class="col-md-12"> ' +
            '<div class="form-group"> ' +
            '<label class="col-md-6 control-label">' +
            "CODIGO" +
            "</label> " +
            '<div class="col-md-6" id="VALIDARVENTANACODIGO_SAL401"> ' +
            '<input id="codigodebarras_SAL401" class="form-control input-md" data-orden="1" maxlength="1"> ' +
            '<span class="help-block">' +
            "S/N" +
            "</span> " +
            "</div> " +
            "</div> " +
            "</div>" +
            "</div>",
          buttons: {
            confirm: {
              label: "Aceptar",
              className: "btn-primary",
              callback: function () {
                ventanaOrdserv.off("show.bs.modal");
                $_this._validarmacro_SAL401();
              },
            },
            cancelar: {
              label: "Cancelar",
              className: "btn-danger",
              callback: function () {
                ventanaOrdserv.off("show.bs.modal");
                $_this._evaluaridhistoriafact_SAL401();
              },
            },
          },
        });
        ventanaCodebar.init($(".modal-footer").hide());
        ventanaCodebar.init(this._evaluarcodigodebarras_SAL401());
        ventanaCodebar.on("shown.bs.modal", function () {
          $("#codigodebarras_SAL401").focus();
        });
      } else {
        this.SAL401.LLAVEBAR = "0";
        this._validarmacro_SAL401();
      }
    },
    _evaluarcodigodebarras_SAL401() {
      validarInputs(
        {
          form: "#VALIDARVENTANACODIGO_SAL401",
          orden: "1",
        },
        () => {
          $(".btn-danger").click();
        },
        () => {
          this.SAL401.LLAVEBAR = $("#codigodebarras_SAL401").val();
          if (this.SAL401.LLAVEBAR.trim() == "" || this.SAL401.LLAVEBAR.trim() == 0) {
            CON851("", "Digite un codigo de barras", this._evaluarcodigodebarras_SAL401(), "error", "Error");
          } else {
            postData(
              { datosh: `${datosEnvio()}6|||||${this.SAL401.LLAVEBAR.trim().padEnd(15, " ")}|` },
              get_url("APP/SALUD/SAL401.DLL")
            )
              .then((data) => {
                this.form.codigodeservicio_SAL401 = this.SAL401.LLAVEBAR;
                $(".btn-primary").click();
              })
              .catch((error) => {
                console.error(error);
                this._evaluarcodigodebarras_SAL401();
              });
          }
        }
      );
    },
    _validarmacro_SAL401() {
      this.SAL401.CUPPAQINT = "";
      if ($_USUA_GLOBAL[0].NIT == 844003225 && clasedeservicioMask_SAL401.value == "7") {
        console.error("MOVER ARTICULOS DE MACRO PARA LOS ARTICULOS FACTURADOS, TIENE F8");
        $("#CODMACRO_SAL401").removeClass("hidden");
        validarInputs(
          {
            form: "#MACRO_SAL401",
            orden: "1",
          },
          this._evaluaridhistoriafact_SAL401,
          () => {
            if (isNaN(this.form.macro_SAL401)) {
              // postData({ datosh: `${datosEnvio()}` },
              // get_url("APP/SALUD/SAL401.DLL"))
              // .then(data => {
              // })
              // .catch(err => {
              //     console.error(err);
              // });
              this._evaluarcodigoservicio_SAL401();
              // this._validarpaquete_SAL401();
            } else {
              this._validarmacro_SAL401();
            }
          }
        );
      } else {
        console.log("aca");
        // this._evaluarcodigoservicio_SAL401();
        if ($_USUA_GLOBAL[0].NIT == 892000264) {
          if (clasedeservicioMask_SAL401.value == "1") {
            this._validarpaquete_SAL401();
          } else {
            this._evaluarcodigoservicio_SAL401();
          }
        } else {
          if (this.SAL401.NROPEDW > 0) {
            this._evaluarcodigoservicio_SAL401(this.FACTURACION[0]);
          } else {
            this._evaluarcodigoservicio_SAL401();
          }
        }
      }
    },
    _validarpaquete_SAL401() {
      this.SAL401.CUPPAQINT = "";
      $("#PAQUETE_SAL401").removeClass("hidden");
      validarInputs(
        {
          form: "#PAQUETE_SAL401",
          orden: "1",
        },
        () => {
          $("#PAQUETE_SAL401").addClass("hidden");
          this._evaluaridhistoriafact_SAL401();
        },
        () => {
          if (
            this.form.paquete_SAL401.trim().toUpperCase() == "S" ||
            this.form.paquete_SAL401.trim().toUpperCase() == "N"
          ) {
            if (this.form.paquete_SAL401.trim().toUpperCase() == "S") {
              $("#PAQUETE_SAL401").addClass("hidden");
              this._evaluarpaqueteintegral_SAL401();
            } else {
              $("#CODIGOPAQUETE_SAL401").addClass("hidden");
              this._evaluarcodigoservicio_SAL401();
            }
          } else {
            this._validarpaquete_SAL401();
          }
        }
      );
    },
    _evaluarpaqueteintegral_SAL401() {
      $("#CODIGOPAQUETE_SAL401").removeClass("hidden");
      validarInputs(
        {
          form: "#CODIGOPAQUETE_SAL401",
          orden: "1",
        },
        () => {
          $("#CODIGOPAQUETE_SAL401").addClass("hidden");
          this._validarpaquete_SAL401();
        },
        () => {
          if (this.SAL401.OPCIONACTIVA == "09426") {
            if (this.SAL401.CUPPAQINT == this.form.paqueteint_SAL401) {
              this._evaluarcodigoservicio_SAL401();
            } else {
              CON851("03", "03", null, "error", "Error");
              this._evaluarpaqueteintegral_SAL401();
            }
          } else {
            postData(
              {
                datosh: `${datosEnvio()}K|||||${this.SAL401.CODTABW}${clasedeservicioMask_SAL401.value}${
                  this.form.paqueteint_SAL401
                }|`,
              },
              get_url("APP/SALUD/SAL401.DLL")
            )
              .then((data) => {
                this.SAL401.PAQUETES = data;
                $("#CODIGOPAQUETE_SAL401").addClass("hidden");
                this.SAL401.CUPPAQINT = this.form.paqueteint_SAL401;
                this._montarTablapaquetes(data);
                // this._evaluarcodigoservicio_SAL401();
              })
              .catch((err) => {
                console.error(err);
                this._evaluarpaqueteintegral_SAL401();
              });
          }
        }
      );
    },
    _evaluarbotoneditar_SAL401(data) {
      if (this.SAL401.BOTONEDITAR == 1) {
        _fin_validar_form();
        let tabla = document.getElementById("TABLA_401");
        tabla = tabla.firstElementChild.children[data];
        this._evaluarcodigoservicio_SAL401(tabla);
      }
    },
    _evaluarbotoneliminar_SAL401(data) {
      _fin_validar_form();
      this.FACTURACION.splice(data, 1);
      this._evaluarcodigoservicio_SAL401();
    },
    _evaluarcodigoservicio_SAL401(data) {
      console.log(data);
      this.SAL401.BOTONEDITAR = 1;
      if (data) {
        this.SAL401.CONTEO = data.cells[0].textContent.trim();
        if (clasedeservicioMask_SAL401.value == "0") {
          this.form.codigodeservicio_SAL401 = data.cells[1].textContent.trim().substring(0, 15);
          this.form.clasearticulo_SAL401 = data.cells[1].textContent.trim().substring(15, 17);
        } else {
          this.form.codigodeservicio_SAL401 = data.cells[1].textContent.trim();
        }
        this.form.almacen_SAL401 = data.cells[3].textContent.trim();
        cantidadMask_SAL401.typedValue = data.cells[4].textContent.trim();
        valorunitarioMask_SAL401.typedValue = data.cells[6].textContent.trim();
        this.SAL401.SWCAMBIO = 1;
      }
      if (data && this.form.paquete_SAL401.toUpperCase() == "S") {
        console.log("aca");
        this.SAL401.CONTEO = data.cells[0].textContent.trim();
        console.log(this.FACTURACION[this.SAL401.CONTEO].CLASE);
        if (this.FACTURACION[this.SAL401.CONTEO].CLASE.trim() == "0") {
          console.log(
            this.FACTURACION[this.SAL401.CONTEO].CLASE,
            data.cells[1].textContent.trim().substring(0, 15),
            data.cells[1].textContent.trim().substring(15, 17)
          );
          this.form.codigodeservicio_SAL401 = data.cells[1].textContent.trim().substring(0, 15);
          this.form.clasearticulo_SAL401 = data.cells[1].textContent.trim().substring(15, 17);
        } else {
          this.form.codigodeservicio_SAL401 = data.cells[1].textContent.trim();
        }
        this.form.almacen_SAL401 = data.cells[3].textContent.trim();
        cantidadMask_SAL401.typedValue = data.cells[4].textContent.trim();
        valorunitarioMask_SAL401.typedValue = data.cells[6].textContent.trim();
        this.SAL401.SWCAMBIO = 1;
      }

      if (this.SAL401.OPCIONACTIVA == "09426" && this.FACTURACION[this.SAL401.CONTEO]) {
        if (clasedeservicioMask_SAL401.value == "0") {
          this.form.codigodeservicio_SAL401 = this.FACTURACION[this.SAL401.CONTEO].ARTICULO.substring(0, 15);
          this.form.clasearticulo_SAL401 = this.FACTURACION[this.SAL401.CONTEO].ARTICULO.substring(15, 17);
        } else {
          this.form.codigodeservicio_SAL401 = this.FACTURACION[this.SAL401.CONTEO].ARTICULO.trim();
        }
        if (this.FACTURACION[this.SAL401.CONTEO].CODIGOLOTE)
          this.form.codlotefarmaceutico_SAL401 = parseInt(this.FACTURACION[this.SAL401.CONTEO].CODIGOLOTE).toString();
        this.form.almacen_SAL401 = this.FACTURACION[this.SAL401.CONTEO].ALMACEN;
        cantidadMask_SAL401.typedValue = this.FACTURACION[this.SAL401.CONTEO].CANTIDAD;
        valorunitarioMask_SAL401.typedValue = this.FACTURACION[this.SAL401.CONTEO].VALORUNIT;
        this.SAL401.SWCAMBIO = 1;
      }
      if (this.SAL401.NROPEDW > 0 && this.FACTURACION[this.SAL401.CONTEO]) {
        if (clasedeservicioMask_SAL401.value == "0") {
          this.form.codigodeservicio_SAL401 = this.FACTURACION[this.SAL401.CONTEO].ARTICULO.substring(0, 15);
          this.form.clasearticulo_SAL401 = this.FACTURACION[this.SAL401.CONTEO].ARTICULO.substring(15, 17);
        } else {
          this.form.codigodeservicio_SAL401 = this.FACTURACION[this.SAL401.CONTEO].ARTICULO.trim();
        }
        if (this.FACTURACION[this.SAL401.CONTEO].CODIGOLOTE)
          this.form.codlotefarmaceutico_SAL401 = parseInt(this.FACTURACION[this.SAL401.CONTEO].CODIGOLOTE).toString();
        this.form.almacen_SAL401 = this.FACTURACION[this.SAL401.CONTEO].ALMACEN;
        cantidadMask_SAL401.typedValue = this.FACTURACION[this.SAL401.CONTEO].CANTIDAD;
        valorunitarioMask_SAL401.typedValue = this.FACTURACION[this.SAL401.CONTEO].VALORUNIT;
        this.SAL401.SWCAMBIO = 1;
      }
      if (this.SAL401.TIPODRFACT == "2" && this.SAL401.SWCAMBIO == 1) {
        this._evaluarcantidad_SAL401();
      } else {
        let parametros = {
          estado: "on",
          msg: [
            { mensaje: "Oprima F3 para continuar" },
            { mensaje: "Oprima F5 para salir" },
            { mensaje: "Oprima F7 para modificar la tabla" },
          ],
        };
        _FloatText(parametros);
        if (this.SAL401.TIPODRFACT == "2" && clasedeservicioMask_SAL401.value == "0") {
          postData(
            {
              datosh: `${datosEnvio()}${idhistoriafactMask_SAL401.unmaskedValue.padStart(15, "0")}|${
                prefijofacturaMask_SAL401.value
              }${numerofacturaMask_SAL401.value.padStart(6, "0")}|`,
            },
            get_url("APP/SALUD/SAL401D.DLL")
          )
            .then((data) => {
              console.log(data);
              var $_this = this;
              data.MEDICAMENTOS.pop();
              let devoluciones = data.MEDICAMENTOS;
              _ventanaDatos({
                titulo: "TIPO DE SERVICIO",
                columnas: ["ARTICULO", "DESCRIPCION", "LABORATORIO", "CANTIDAD", "VALOR"],
                data: data.MEDICAMENTOS,
                callback_esc: function () {
                  $_this._evaluaridhistoriafact_SAL401();
                },
                callback: function (data) {
                  console.log(data);
                  if ($_this.FACTURACION.length > 0 && $_this.FACTURACION.length != devoluciones.length) {
                    for (var i in $_this.FACTURACION) {
                      if ($_this.FACTURACION[i].ARTICULO) {
                        console.log($_this.FACTURACION[i].ARTICULO, data.ARTICULO);
                        if (data.ARTICULO.trim() == $_this.FACTURACION[i].ARTICULO.trim()) {
                          CON851("05", "05", null, "error", "Error");
                          return setTimeout($_this._evaluarcodigoservicio_SAL401, 300);
                        }
                      }
                    }
                  }
                  $_this.SAL401.CANTDEVOL = data.CANTIDAD;
                  $_this.SAL401.VLRDEVOL = data.VALOR;
                  $_this.SAL401.ARTICULO = data.ARTICULO;
                  $_this.SAL401.DESCRIPCION = data.DESCRIPCION;
                  cantidadMask_SAL401.typedValue = parseFloat(data.CANTIDAD).toString();
                  valorunitarioMask_SAL401.typedValue = parseFloat(data.VALOR).toString();
                  $_this.form.codigodeservicio_SAL401 = data.ARTICULO.substring(0, 15);
                  $_this.form.clasearticulo_SAL401 = data.ARTICULO.substring(15, 17);
                  if ($_this.FACTURACION.length == devoluciones.length) {
                    return CON851P(
                      "Seguro que desea devolver todos los medicamentos?",
                      $_this._evaluarcodigoservicio_SAL401,
                      $_this._datoabono_SAL401
                    );
                  }
                  $_this._leerarticulo_SAL401();
                },
              });
            })
            .catch((error) => {
              console.error(error);
              this._evaluaridhistoriafact_SAL401();
            });
        } else {
          validarInputs(
            {
              form: "#VALIDAR9_SAL401",
              orden: "1",
              Supr: (data) => {
                this.FACTURACION.splice(data.cells[0].textContent.trim(), 1);
                this.SAL401.TIPOCOPAGO = "";
                this.SAL401.FPAGO = "";
                this._evaluarcodigoservicio_SAL401();
              },
              event_f3: () => {
                _FloatText({ estado: "off" });
                let val_almacen = this.FACTURACION.find((el) => !el.ALMACEN.trim()); // VALIDAR QUE TODOS LOS ARTICULOS TENGAN ALMACÉN
                if (this.FACTURACION.length == 0) {
                  CON851("", "No tiene nada para facturar", this._evaluarcodigoservicio_SAL401(), "error", "Error");
                } else if (val_almacen && clasedeservicioMask_SAL401.value == "0") {
                  CON851("", "Articulos sin almacén", null, "error", "Error");
                  this._evaluarcodigoservicio_SAL401();
                } else {
                  if (this.SAL401.OPCIONACTIVA == "09426") {
                    this._datodescuento_SAL401();
                  } else {
                    this._datoabono_SAL401();
                  }
                }
              },
              event_f5: () => {
                _FloatText({ estado: "off" });
                this._finImpresion_SAL401();
              },
              event_f7: () => {
                this.SAL401.SWCAMBIO = 1;
                _FloatText({ estado: "off" });
                if (this.FACTURACION.length == 0) {
                  this._evaluarcodigoservicio_SAL401();
                } else {
                  this._validartabla_SAL401("0");
                }
              },
            },
            () => {
              _FloatText({ estado: "off" });
              this._evaluaridhistoriafact_SAL401();
            },
            () => {
              if (this.FACTURACION.length == 0) {
                this._validarclasedearticulo_SAL401();
              } else {
                let repetido = this.FACTURACION.filter(
                  (x) => x.ARTICULO.trim() == this.form.codigodeservicio_SAL401.trim()
                );
                console.log(repetido.length);
                if (this.SAL401.SWCAMBIO == 1) {
                  if (this.FACTURACION[this.SAL401.CONTEO]) {
                    if (
                      this.FACTURACION[this.SAL401.CONTEO].ARTICULO.trim() == this.form.codigodeservicio_SAL401.trim()
                    ) {
                      this._validarclasedearticulo_SAL401();
                    } else if (repetido.length > 0) {
                      CON851("", "Cup repetido", this._evaluarcodigoservicio_SAL401(), "error", "Error");
                    } else {
                      this._validarclasedearticulo_SAL401();
                    }
                  } else {
                    this._validarclasedearticulo_SAL401();
                  }
                } else {
                  if (repetido.length > 0) {
                    CON851("", "Cup repetido", this._evaluarcodigoservicio_SAL401(), "error", "Error");
                  } else {
                    this._validarclasedearticulo_SAL401();
                  }
                }
              }
            }
          );
        }
      }
    },
    _validartabla_SAL401(orden) {
      validarTabla(
        {
          tabla: "#TABLA_401",
          orden: orden,
          event_f2: (data) => {
            this.SAL401.TABLAFOCO = data;
            console.log(data, data.cells[0].textContent.trim());
            if (localStorage.Usuario == "GEBC") {
              this.FACTURACION[data.cells[0].textContent.trim()].VALORTOTAL = "0.00";
              this.FACTURACION[data.cells[0].textContent.trim()].VALORUNIT = "0.00";
              this._validartabla_SAL401(data.cells[0].textContent.trim());
            } else {
              this._validartabla_SAL401(data.cells[0].textContent.trim());
            }
          },
          Supr: (data) => {
            this.FACTURACION.splice(data.cells[0].textContent.trim(), 1);
            this.SAL401.SWCAMBIO = 0;
            this._evaluarcodigoservicio_SAL401();
          },
          event_f3: () => {
            if (this.SAL401.OPCIONACTIVA == "09426") {
              this._datodescuento_SAL401();
            } else {
              this._datoabono_SAL401();
            }
          },
        },
        this._evaluarcodigoservicio_SAL401,
        () => {
          this._evaluarcodigoservicio_SAL401();
        },
        () => {
          if (this.SAL401.OPCIONACTIVA == "09426") {
            this._datodescuento_SAL401();
          } else {
            this._datoabono_SAL401();
          }
        }
      );
    },
    _validarclasedearticulo_SAL401() {
      if (clasedeservicioMask_SAL401.value == "0") {
        this._evaluarclasedearticulo_SAL401();
      } else {
        this._leerarticulo_SAL401();
      }
    },
    _evaluarclasedearticulo_SAL401() {
      $("#CLASEARTICULO_SAL401").removeClass("hidden");
      let ARTICULOS_SAL41 = [];
      let $_this = this;
      if (this.SAL401.SWCAMBIO == 1 || this.form.clasearticulo_SAL401.trim() == "") {
        return postData(
          { datosh: datosEnvio() + clasedeservicioMask_SAL401.value + "|", ALMACEN: "DR001" },
          get_url("APP/INVENT/INV507.DLL")
        )
          .then((data) => {
            loader("hide");
            ARTICULOS_SAL41 = data.SALDOS;
            ARTICULOS_SAL41.pop();
            ARTICULOS_SAL41 = ARTICULOS_SAL41.filter(
              (x) =>
                x.COD_ARTIC.substring(0, 13) ==
                `0${this.form.codigodeservicio_SAL401.substring(12, "0").padEnd(12, " ")}`
            );
            ARTICULOS_SAL41 = ARTICULOS_SAL41.filter((x) => x.SALDO_ACT_CANT.trim() != "");
            _ventanaDatos({
              titulo: "VENTANA CLASE DE ARTICULOS",
              columnas: ["COD_ARTIC", "DESCRIPCION_ARTICULO", "SALDO_ACT_CANT", "LABORATORIO"],
              data: ARTICULOS_SAL41,
              callback_esc: function () {
                $_this._evaluarcodigoservicio_SAL401();
              },
              callback: function (data) {
                console.log(data.COD_ARTIC.substring(16, 18));
                $_this.form.clasearticulo_SAL401 = data.COD_ARTIC.substring(16, 18);
                $_this._leerarticulo_SAL401();
              },
            });
          })
          .catch((error) => {
            loader("hide");
            console.error(error);
            CON851("", "Hubo un error consultando los saldos", null, "error", "Error");
            $_this._evaluarcodigoservicio_SAL401();
          });
      }

      this._leerarticulo_SAL401();
      // validarInputs({
      //     form: '#CLASEARTICULO_SAL401',
      //     orden: '1',
      // },
      //     () => { this._evaluarcodigoservicio_SAL401() },
      //     this._leerarticulo_SAL401
      // )
    },
    _leerarticulo_SAL401() {
      if (this.form.codigodeservicio_SAL401.trim() == "" || this.form.codigodeservicio_SAL401 == 0) {
        CON851("", "Digite un codigo valido", this._evaluarcodigoservicio_SAL401(), "error", "Error");
      } else if (clasedeservicioMask_SAL401.value == "3") {
        this._revisarpermisos_SAL401(
          this._leerarticulo2_SAL401,
          () => {
            this._evaluarcodigoservicio_SAL401();
          },
          (params = { CODIGO: `I413${this.form.codigodeservicio_SAL401.trim().substring(0, 2)}` })
        );
      } else {
        this._leerarticulo2_SAL401();
      }
    },
    _leerarticulo2_SAL401() {
      if (
        this.SAL401.PACIENTE["REST-APLI"] == "S" &&
        prefijofacturaMask_SAL401.value != "C" &&
        prefijofacturaMask_SAL401.value != "E" &&
        prefijofacturaMask_SAL401.value != "Ñ" &&
        prefijofacturaMask_SAL401.value != "P" &&
        prefijofacturaMask_SAL401.value != "T" &&
        prefijofacturaMask_SAL401.value != "U" &&
        clasedeservicioMask_SAL401.value == "5"
      ) {
        if (
          this.form.codigodeservicio_SAL401.trim().substring(0, 2) == "89" &&
          this.SAL401.PACIENTE["REST-CONS"] == "N" &&
          this.form.codigodeservicio_SAL401.trim() != "890103" &&
          this.form.codigodeservicio_SAL401.trim() != "890203" &&
          this.form.codigodeservicio_SAL401.trim() != "890303" &&
          this.form.codigodeservicio_SAL401.trim() != "890403"
        ) {
          CON851("80", "80", this._evaluarcodigoservicio_SAL401(), "error", "Error");
        } else if (
          this.form.codigodeservicio_SAL401.trim().substring(0, 2) == "93" &&
          this.form.codigodeservicio_SAL401.trim().substring(2, 3) == "1" &&
          this.SAL401.PACIENTE["REST-TERF"] == "N"
        ) {
          CON851("80", "80", this._evaluarcodigoservicio_SAL401(), "error", "Error");
        } else if (
          this.form.codigodeservicio_SAL401.trim().substring(0, 2) == "93" &&
          this.form.codigodeservicio_SAL401.trim().substring(2, 3) != "1" &&
          this.SAL401.PACIENTE["REST-TERO"] == "N"
        ) {
          CON851("80", "80", this._evaluarcodigoservicio_SAL401(), "error", "Error");
        } else if (
          (this.SAL401.PACIENTE["REST-ODON"] == "N" &&
            this.form.codigodeservicio_SAL401.trim().substring(0, 2) == "24") ||
          this.form.codigodeservicio_SAL401.trim() != "890103" ||
          this.form.codigodeservicio_SAL401.trim() == "890203" ||
          this.form.codigodeservicio_SAL401.trim() == "890303" ||
          this.form.codigodeservicio_SAL401.trim() == "890403"
        ) {
          CON851("80", "80", this._evaluarcodigoservicio_SAL401(), "error", "Error");
        } else {
          this._leerarticulo3_SAL401();
        }
      } else {
        this._leerarticulo3_SAL401();
      }
    },
    _leerarticulo3_SAL401() {
      if (
        prefijofacturaMask_SAL401.value != "C" &&
        prefijofacturaMask_SAL401.value != "E" &&
        prefijofacturaMask_SAL401.value != "Ñ" &&
        prefijofacturaMask_SAL401.value != "P" &&
        prefijofacturaMask_SAL401.value != "T" &&
        prefijofacturaMask_SAL401.value != "U" &&
        clasedeservicioMask_SAL401.value == "4" &&
        this.SAL401.PACIENTE["REST-ESTA"] == "N" &&
        isNaN(this.form.codigodeservicio_SAL401.trim().substring(0, 2))
      ) {
        CON851("80", "80", this._evaluaridhistoriafact_SAL401(), "error", "Error");
      } else {
        let clasedeservicio = clasedeservicioMask_SAL401.value;
        if (this.form.paquete_SAL401.toUpperCase() == "S")
          clasedeservicio = this.FACTURACION[this.SAL401.CONTEO].CLASE.trim();
        if (clasedeservicio == "0") {
          postData(
            {
              datosh: `${datosEnvio()}7||||||0${this.form.codigodeservicio_SAL401
                .trim()
                .padEnd(15, " ")}${this.form.clasearticulo_SAL401.trim().padEnd(2, " ")}|`,
            },
            get_url("APP/SALUD/SAL401.DLL")
          )
            .then((data) => {
              this.SAL401.ARTICULO = data;
              this.form.codigodeserviciod_SAL401 = data.DESCRIPCION;
              this.form.unidad_SAL401 = data.UNIDAD_ART;
              if (data.DESCRIPCION.substring(0, 1) == "*" && this.SAL401.TIPODRFACT) {
                CON851("13", "13", this._evaluarcodigoservicio_SAL401(), "error", "Error");
              } else if (this.SAL401.NUMERACION.ARTIVA_NUM == "N" && data.IVA != 0 && data.IVA.trim() != "") {
                CON851("7Z", "7Z", this._evaluarcodigoservicio_SAL401(), "error", "Error");
              } else if (
                prefijofacturaMask_SAL401.value != "C" &&
                prefijofacturaMask_SAL401.value != "E" &&
                prefijofacturaMask_SAL401.value != "Ñ" &&
                prefijofacturaMask_SAL401.value != "U" &&
                this.SAL401.NUMERACION.CLASIF_NUM == "1" &&
                this.form.codigodeservicio_SAL401.trim().substring(0, 2) != "PO" &&
                this.form.codigodeservicio_SAL401.trim().substring(0, 2) != "MQ"
              ) {
                CON851("7H", "7H", this._evaluarcodigoservicio_SAL401(), "error", "Error");
              } else if (
                prefijofacturaMask_SAL401.value != "C" &&
                prefijofacturaMask_SAL401.value != "E" &&
                prefijofacturaMask_SAL401.value != "Ñ" &&
                prefijofacturaMask_SAL401.value != "U" &&
                this.SAL401.NUMERACION.CLASIF_NUM == "1" &&
                this.form.codigodeservicio_SAL401.trim().substring(0, 2) != "NP" &&
                this.form.codigodeservicio_SAL401.trim().substring(0, 2) != "MQ" &&
                this.form.codigodeservicio_SAL401.trim().substring(0, 2) != "CO"
              ) {
                CON851("7H", "7H", this._evaluarcodigoservicio_SAL401(), "error", "Error");
              } else {
                this.SAL401.IVAART = data.IVA;
                this.SAL401.VLRPROMEDW = 0;
                if (data.IVA == 0) this.SAL401.TARIVA = 0;
                if (data.IVA == 1) this.SAL401.TARIVA = $_USUA_GLOBAL[0].IVA1;
                if (data.IVA == 2) this.SAL401.TARIVA = $_USUA_GLOBAL[0].IVA2;
                if (data.IVA == 3) this.SAL401.TARIVA = $_USUA_GLOBAL[0].IVA3;
                if (this.SAL401.CONVENIO.BASE_MED == 1) {
                  let prefijo = this.SAL401.PREFIJOS.TABLA.filter(
                    (x) => x.PREFIJO.trim() == prefijofacturaMask_SAL401.value.trim()
                  );
                  if (!prefijo) this.SAL401.ALMPREF = "ALM01";
                  else this.SAL401.ALMPREF = prefijo[0].ALMACEN;
                  this._leerpromedio_SAL401(this._leerarticulo4_SAL401, () => {
                    this._evaluarcodigoservicio_SAL401();
                  });
                } else if (this.SAL401.CONVENIO.BASE_MED == 2) {
                  this.SAL401.VLRPROMEDW = 0;
                  this.SAL401.ARTICULO.VR_VENTA1 = data.VLR_ULT_COMPRA;
                  this._leerarticulo4_SAL401();
                } else if (this.SAL401.CONVENIO.BASE_MED == 4) {
                  this.SAL401.VLRPROMEDW = 0;
                  if (data.REF > 0) {
                    this.SAL401.ARTICULO.VR_VENTA1 = data.REF;
                  }
                  this._leerarticulo4_SAL401();
                } else {
                  this._leerarticulo4_SAL401();
                }
              }
            })
            .catch((error) => {
              console.error(error);
              this._evaluarcodigoservicio_SAL401();
            });
        } else {
          postData(
            {
              datosh: `${datosEnvio()}8||||||${this.form.codigodeservicio_SAL401
                .trim()
                .padEnd(15, " ")}|${idhistoriafactMask_SAL401.unmaskedValue.trim().padStart(15, "0")}|${
                this.SAL401.PACIENTE.EDAD.unid_edad
              }${this.SAL401.PACIENTE.EDAD.vlr_edad.toString().padStart(3, "0")}|${
                prefijofacturaMask_SAL401.value
              }${numerofacturaMask_SAL401.value.trim().padStart(6, "0")}|${this.SAL401.CODTABW}${clasedeservicio}|`,
            },
            get_url("APP/SALUD/SAL401.DLL")
          )
            .then((data) => {
              this.SAL401.ARTICULO = data;
              this.form.codigodeserviciod_SAL401 = data.DESCRIPCION;
              if (data.FORMALIQ.trim() == "1")
                this.SAL401.VLRUNITW =
                  parseFloat(data.MONTO) * parseFloat(this.SAL401.CONVENIO.TABLA_TAR[29].HNQUIRTAR);
              else if (data.FORMALIQ.trim() == "2") this.SAL401.VLRUNITW = parseFloat(data.MONTO);
              else if (data.FORMALIQ.trim() == "3") this.SAL401.VLRUNITW = parseFloat(data.MONTO);
              else if (data.FORMALIQ.trim() == "4") {
                if (
                  $_USUA_GLOBAL[0].NIT == 892000401 ||
                  $_USUA_GLOBAL[0].NIT == 900475095 ||
                  $_USUA_GLOBAL[0].NIT == 900708318
                ) {
                  this.SAL401.FACTORW = 1;
                  this.SAL401.SWAPR = 100;
                  this.SAL401.VLRUNITW = parseFloat(data.MONTO) * this.SAL401.CONVENIO.SAL_MIN;
                  this.SAL401.VLRUNITW = (this.SAL401.VLRUNITW * 1) / 100;
                  this.SAL401.VLRUNITW = this.SAL401.VLRUNITW * 100;
                } else {
                  this.SAL401.VLRUNITW = data.MONTO * this.SAL401.CONVENIO.SAL_MIN;
                }
              } else if (data.FORMALIQ.trim() == "5") {
                let primero = this.FACTURACION[0].ARTICULO;
                if (!primero) primero = 0;
                this.SAL401.VLRUNITW = (parseFloat(data.MONTO) * primero) / 100;
              } else {
                this.SAL401.SWAPR = 1;
                this.SAL401.VLRUNITW = data.MONTO;
              }
              if (data.LLAVETIPO.trim() == "SO1" && data.CODPAQINT.trim() != "") {
                CON851(
                  "",
                  "Atencion ! este procedimiento esta clasificado como posible paquete integral",
                  null,
                  "warning",
                  "Avertencia!"
                );
              }
              this.SAL401.VLRUNITW = Math.round(this.SAL401.VLRUNITW);
              if (isNaN(this.SAL401.VLRUNITW)) this.SAL401.VLRUNITW = 0;
              console.log(this.SAL401.VLRUNITW);
              this.SAL401.IVAART = "0";
              this._leerarticulo4_SAL401();
            })
            .catch((error) => {
              console.error(error);
              this._evaluarcodigoservicio_SAL401();
            });
        }
      }
    },
    _leerarticulo4_SAL401() {
      this.SAL401.VLRUPC = "000000000000.00";
      this.SAL401.TABLAUSUARCAPIT = "00000000";
      this.SAL401.NROUSUARCAPIT = [];
      if (this.SAL401.TARIFFACT == "H4" && clasedeservicioMask_SAL401.value > 1) {
        this.SAL401.SWAPR = 1;
      }
      if (
        this.SAL401.NUMERACION.LLAVE_NUM.trim() == this.SAL401.NUMERACION.FACTCAPIT_NUM.trim() &&
        clasedeservicioMask_SAL401.value == 4 &&
        this.SAL401.CONTEO < 9 &&
        (this.form.codigodeservicio_SAL401.substring(0, 5) == "XXCAP" ||
          this.form.codigodeservicio_SAL401.substring(0, 5) == "XXXPG") &&
        $_USUA_GLOBAL[0].NIT != 900019291
      ) {
        this._ventanacapitacion_SAL401();
      } else if (
        this.SAL401.NUMERACION.LLAVE_NUM.trim() == this.SAL401.NUMERACION.FACTCAPIT_NUM.trim() &&
        clasedeservicioMask_SAL401.value == 4 &&
        this.SAL401.CONTEO < 9 &&
        this.form.codigodeservicio_SAL401.substring(0, 5) != "XXCAP" &&
        this.form.codigodeservicio_SAL401.substring(0, 5) != "XXXPG" &&
        $_USUA_GLOBAL[0].NIT == 900405505 &&
        this.form.codigodeservicio_SAL401.substring(0, 4) != "XX19"
      ) {
        this._ventanacapitacion_SAL401();
      } else if (
        this.form.codigodeservicio_SAL401.trim() == "39134" &&
        this.SAL401.PACIENTE.EDAD.unid_edad == "A" &&
        this.SAL401.PACIENTE.EDAD.vlr_edad > 13
      ) {
        CON851("76", "76", this._evaluarcodigoservicio_SAL401(), "error", "Error");
      } else if (
        clasedeservicioMask_SAL401.value == "7" ||
        (clasedeservicioMask_SAL401.value == "4" && this.form.codigodeservicio_SAL401.trim() == "898001")
      ) {
        // SER835RE
        this._datolateralidad_SAL401();
      } else if (
        clasedeservicioMask_SAL401.value == "7" ||
        (clasedeservicioMask_SAL401.value == "4" && this.form.codigodeservicio_SAL401.trim() == "892901")
      ) {
        // SER835RF
        this._datolateralidad_SAL401();
      } else if (
        clasedeservicioMask_SAL401.value == "7" ||
        (clasedeservicioMask_SAL401.value == "4" && this.form.codigodeservicio_SAL401.trim() == "950601")
      ) {
        // SER835RG
        this._datolateralidad_SAL401();
      } else {
        this._datolateralidad_SAL401();
      }
    },
    _ventanacapitacion_SAL401() {
      this.SAL401.VENTANACAPITACION_SAL401 = "VENTANACAPITACION_SAL401";
      _ventanaalterna_SALUD(
        (data = {
          ID: this.SAL401.VENTANACAPITACION_SAL401,
          callback: this._evaluarvlrupc_SAL401,
          titulo: "VENTANA DE CAPITACION",
          html: `
                <div class="form-group col-md-12 col-sm-12 col-xs-12" style="float: none; margin: 0 auto;">
                    <div class="col-md-4 col-sm-4 col-xs-12">
                        <div class="inline-inputs">
                            <label class="col-md-4 col-sm-4 col-xs-4">VLR UPC MES:</label>
                            <div class="input-group col-md-8 col-sm-8 col-xs-8" id="VALIDAR1VENTANACAPITACION_SAL401">
                                <input id="vlrupcmes_SAL401" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="16" data-orden="1">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2 col-sm-2 col-xs-12">
                        <div class="inline-inputs">
                            <label class="col-md-7 col-sm-7 col-xs-7">% DE LA UPC:</label>
                            <div class="input-group col-md-5 col-sm-5 col-xs-5" id="VALIDAR2VENTANACAPITACION_SAL401">
                                <input id="porcentajeupc_SAL401" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="16" data-orden="1">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2 col-sm-2 col-xs-12">
                        <div class="inline-inputs">
                            <label class="col-md-7 col-sm-7 col-xs-7">NRO USUARIOS:</label>
                            <div class="input-group col-md-5 col-sm-5 col-xs-5" id="VALIDAR3VENTANACAPITACION_SAL401">
                                <input id="nrousuarios_SAL401" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="8" data-orden="1">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-12">
                        <div class="inline-inputs">
                            <label class="col-md-4 col-sm-4 col-xs-4">VLR FACTURADO:</label>
                            <div class="input-group col-md-8 col-sm-8 col-xs-8" id="VALIDAR4VENTANACAPITACION_SAL401">
                                <input id="vlrfacturadocapitacion_SAL401" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="16" data-orden="1">
                            </div>
                        </div>
                    </div>
                </div>
                `,
        })
      );
      _inputControl("disabled");
      this._evaluarvlrupc_SAL401();
    },
    _evaluarvlrupc_SAL401() {
      var valorupcMask_SAL401 = IMask($("#vlrupcmes_SAL401")[0], {
        mask: Number,
        thousandsSeparator: ",",
        padFractionalZeros: false,
        normalizeZeros: true,
        radix: ".",
        mapToRadix: ["."],
      });
      if (this.SAL401.VLRUPC == 0 || this.SAL401.CONTEO == 0) {
        validarInputs(
          {
            form: "#VALIDAR1VENTANACAPITACION_SAL401",
            orden: "1",
          },
          () => {
            $(".brn-primary").click();
          },
          () => {
            if (valorupcMask_SAL401.unmaskedValue == 0) {
              CON851("02", "02", this._evaluarvlrupc_SAL401(), "error", "Error");
            } else {
              this.SAL401.VLRUPC = valorupcMask_SAL401.value.replace(/,/g, "");
              this._evaluarporcentajeupc_SAL401();
            }
          }
        );
      } else {
        valorupcMask_SAL401.typedValue = this.SAL401.VLRUPC;
        this._evaluarporcentajeupc_SAL401();
      }
    },
    _evaluarporcentajeupc_SAL401() {
      var valorporcentajeupcMask_SAL401 = IMask($("#porcentajeupc_SAL401")[0], {
        mask: Number,
        thousandsSeparator: ",",
        padFractionalZeros: false,
        normalizeZeros: true,
        radix: ".",
        mapToRadix: ["."],
      });
      validarInputs(
        {
          form: "#VALIDAR2VENTANACAPITACION_SAL401",
          orden: "1",
        },
        this._evaluarvlrupc_SAL401,
        () => {
          if (valorporcentajeupcMask_SAL401.unmaskedValue == 0) {
            CON851("02", "02", this._evaluarporcentajeupc_SAL401(), "error", "Error");
          } else {
            cantidadMask_SAL401.typedValue = valorporcentajeupcMask_SAL401.value;
            this._evaluarnrousuarios_SAL401();
          }
        }
      );
    },
    _evaluarnrousuarios_SAL401() {
      var nrousuariosMask_SAL401 = IMask($("#nrousuarios_SAL401")[0], {
        mask: Number,
        thousandsSeparator: ",",
        padFractionalZeros: false,
        normalizeZeros: true,
        radix: ",",
        mapToRadix: ["."],
      });
      validarInputs(
        {
          form: "#VALIDAR3VENTANACAPITACION_SAL401",
          orden: "1",
        },
        this._evaluarporcentajeupc_SAL401,
        () => {
          if (nrousuariosMask_SAL401.unmaskedValue == 0) {
            CON851("02", "02", this._evaluarnrousuarios_SAL401(), "error", "Error");
          } else {
            if (this.SAL401.NROUSUARCAPIT[this.SAL401.CONTEO]) {
              this.SAL401.NROUSUARCAPIT[this.SAL401.CONTEO] = nrousuariosMask_SAL401.value.padStart(8, "0");
            } else {
              this.SAL401.NROUSUARCAPIT.push(nrousuariosMask_SAL401.value.padStart(8, "0"));
            }
            this.SAL401.VALORTOTALCAPITA = Math.round(
              parseFloat(this.SAL401.VLRUPC) *
                (parseFloat(cantidadMask_SAL401.value.replace(/,/g, "")) * 100) *
                parseFloat(nrousuariosMask_SAL401.value.replace(/,/g, ""))
            );
            this._evaluartotalcapita_SAL401();
          }
        }
      );
    },
    _evaluartotalcapita_SAL401() {
      var valortotalcapitaMask_SAL401 = IMask($("#vlrfacturadocapitacion_SAL401")[0], {
        mask: Number,
        thousandsSeparator: ",",
        padFractionalZeros: false,
        normalizeZeros: true,
        radix: ",",
        mapToRadix: ["."],
      });
      valortotalcapitaMask_SAL401.typedValue = (Math.round(this.SAL401.VALORTOTALCAPITA * 100) / 100).toString();
      validarInputs(
        {
          form: "#VALIDAR4VENTANACAPITACION_SAL401",
          orden: "1",
        },
        this._evaluarnrousuarios_SAL401,
        () => {
          if (valortotalcapitaMask_SAL401.unmaskedValue == 0) {
            CON851("02", "02", this._evaluartotalcapita_SAL401(), "error", "Error");
          } else {
            valorunitarioMask_SAL401.typedValue = valortotalcapitaMask_SAL401.value;
            //$('.btn-primary').click();
            $(`#${this.SAL401.VENTANACAPITACION_SAL401}`).remove();
            this._dato5_SAL401();
          }
        }
      );
    },
    _datolateralidad_SAL401() {
      if ($_USUA_GLOBAL[0].NIT == 830092718 || $_USUA_GLOBAL[0].NIT == 830092719 || $_USUA_GLOBAL[0].NIT == 900193162) {
        RX822A(
          (data) => {
            this.SAL401.VLRLATERFACT = data.CODIGO;
            this._validardatoalmacen_SAL401();
          },
          () => {
            this._evaluarcodigoservicio_SAL401();
          }
        );
      } else {
        this.SAL401.VLRLATERFACT = "";
        this._validardatoalmacen_SAL401();
      }
    },
    _validardatoalmacen_SAL401() {
      let clasedeservicio = clasedeservicioMask_SAL401.value;
      if (this.form.paquete_SAL401.toUpperCase() == "S") clasedeservicio = this.FACTURACION[this.SAL401.CONTEO].CLASE;
      if (clasedeservicio > 0) {
        this._calcularmonto_SAL401(
          () => {
            if (clasedeservicioMask_SAL401.value == "1") {
              if (this.SAL401.CODTABW == "I4") {
                console.log(this.SAL401.FACTORW);
                this.SAL401.VLRUNITW =
                  parseFloat(this.SAL401.ARTICULO.MONTO) *
                  parseFloat(this.SAL401.CONVENIO.TABLA_TAR[29].HNQUIRTAR) *
                  this.SAL401.FACTORW;
                this._evaluarcantidad_SAL401();
              } else {
                if (this.FACTURACION[0]) {
                  this.FACTURACION[0].ARTICULO = this.form.codigodeservicio_SAL401.trim();
                  this.FACTURACION[0].DESCRIPCIONART = this.form.codigodeserviciod_SAL401.trim();
                } else {
                  this.FACTURACION.push({
                    ALMACEN: this.form.almacen_SAL401.trim(),
                    ARTICULO: this.form.codigodeservicio_SAL401.trim(),
                    DESCRIPCIONART: this.form.codigodeserviciod_SAL401.trim(),
                    CODIGOLOTE: this.form.codlotefarmaceutico_SAL401.trim().padStart(9, "0"),
                    CANTIDAD: cantidadMask_SAL401.value.replace(/,/g, ""),
                    VALORUNIT: "0.00",
                    DIASTRATA: diastratamientoMask_SAL401.value,
                    VALORTOTAL: "0.00",
                    UNIDAD: "",
                  });
                }
                this._datohonorarios_SAL401();
              }
            } else {
              this._evaluarcantidad_SAL401();
            }
          },
          () => {
            this._evaluarcodigoservicio_SAL401();
          }
        );
      } else {
        this._evaluaralmacen_SAL401();
      }
    },
    _evaluaralmacen_SAL401() {
      if ($_USUA_GLOBAL[0].NIT == 800037021 && localStorage.Usuario.slice(0, 3) == "UCI") this.form.almacen_SAL401 = "SIN97";

      if ($_USUA_GLOBAL[0].NIT == 892000264) {
        this.form.almacen_SAL401 = "DR001";
      } else {
        this.form.almacen_SAL401 = "ALM01";
      }
      validarInputs(
        {
          form: "#VALIDAR10_SAL401",
          orden: "1",
          event_f3: () => {
            if (clasedeservicioMask_SAL401.value == "0" && this.SAL401.TIPODRFACT == "2") {
              this._evaluarespecialidad_SAL401();
              this.SAL401.FPAGO = "";
            } else {
              this._evaluaralmacen_SAL401();
            }
          },
          event_f7: () => {
            // if (localStorage.Usuario == 'GEBC') {
            this.SAL401.SWCAMBIO = 1;
            this._validartabla_SAL401("0");
            // } else {
            // this._evaluaralmacen_SAL401();
            // }
          },
        },
        () => {
          this._evaluarcodigoservicio_SAL401();
        },
        () => {
          if (this.form.almacen_SAL401.trim() == "") {
            CON851("", "Digite un Almacen", null, "error", "Error");
            return this._evaluaralmacen_SAL401();
          }

          this._revisarpermisos_SAL401(
            this._permisosalmacenini_SAL401,
            this._evaluaralmacen_SAL401,
            (params = {
              CODIGO: `I410${this.form.almacen_SAL401.substring(0, 1)}${this.form.almacen_SAL401.substring(4, 5)}`,
            })
          );
        }
      );
    },
    _permisosalmacenini_SAL401() {
      if (this.SAL401.VLRPROMEDW == 0 && this.SAL401.CONVENIO.BASE_MED == 1) {
        this._leerpromedio_SAL401((data) => {
          if ($_USUA_GLOBAL[0].ASUME_IVA == "S")
            this.SAL401.VLRUNITW = (this.SAL401.ARTICULO.VR_VENTA1 * this.SAL401.TARIVA) / 100;
          else this.SAL401.ARTICULO.VR_VENTA1 = this.SAL401.VLRPROMEDW;
          this.SAL401.VLRUNITW = this.SAL401.VLRUNITW * 1;
          postData(
            { datosh: `${datosEnvio()}9|||||||||||${this.form.almacen_SAL401.trim()}|` },
            get_url("APP/SALUD/SAL401.DLL")
          )
            .then((data) => {
              this.SAL401.ALMACEN = data;
              if (
                clasedeservicioMask_SAL401.value == "0" &&
                this.form.almacen_SAL401.trim().substring(0, 3) == "SIN" &&
                (this.form.codigodeservicio_SAL401.trim().substring(0, 2) == "PO" ||
                  this.form.codigodeservicio_SAL401.trim().substring(0, 2) == "NP" ||
                  this.form.codigodeservicio_SAL401.trim().substring(0, 2) == "MQ")
              ) {
                this._revisarpermisos_SAL401(
                  this._permisosalmacen_SAL401,
                  this._evaluaralmacen_SAL401,
                  (params = { CODIGO: "I410M" })
                );
              } else {
                this._permisosalmacen_SAL401();
              }
            })
            .catch((error) => {
              console.error(error);
              this._evaluarcodigoservicio_SAL401();
            });
        }, this._evaluaralmacen_SAL401);
      } else {
        postData(
          { datosh: `${datosEnvio()}9|||||||||||${this.form.almacen_SAL401.trim()}|` },
          get_url("APP/SALUD/SAL401.DLL")
        )
          .then((data) => {
            this.SAL401.ALMACEN = data;
            if (
              clasedeservicioMask_SAL401.value == "0" &&
              this.form.almacen_SAL401.trim().substring(0, 3) == "SIN" &&
              (this.form.codigodeservicio_SAL401.trim().substring(0, 2) == "PO" ||
                this.form.codigodeservicio_SAL401.trim().substring(0, 2) == "NP" ||
                this.form.codigodeservicio_SAL401.trim().substring(0, 2) == "MQ")
            ) {
              this._revisarpermisos_SAL401(
                this._permisosalmacen_SAL401,
                this._evaluaralmacen_SAL401,
                (params = { CODIGO: "I410M" })
              );
            } else {
              this._permisosalmacen_SAL401();
            }
          })
          .catch((error) => {
            console.error(error);
            this._evaluarcodigoservicio_SAL401();
          });
      }
    },
    _permisosalmacen_SAL401() {
      console.log("permisos almacen");
      this._revisarpermisos_SAL401(
        this._permisosalmacen2_SAL401,
        this._evaluaralmacen_SAL401,
        (params = { CODIGO: `I4${clasedeservicioMask_SAL401.value}${this.form.almacen_SAL401.substring(0, 1)}` })
      );
    },
    _permisosalmacen2_SAL401(data) {
      console.log("permisos almacen", data);
      if (
        ($_USUA_GLOBAL[0].NIT == 892000401 ||
          $_USUA_GLOBAL[0].NIT == 900648993 ||
          $_USUA_GLOBAL[0].NIT == 900755133 ||
          $_USUA_GLOBAL[0].NIT == 900804411 ||
          $_USUA_GLOBAL[0].NIT == 900870633) &&
        this.form.almacen_SAL401.trim() == "DR099" &&
        (this.form.unidaddeservicio_SAL401.substring(0, 2) == "04" ||
          this.form.unidaddeservicio_SAL401.substring(0, 2) == "54")
      ) {
        CON851("B1", "B1", this._evaluaralmacen_SAL401(), "error", "Error");
      } else if (
        ($_USUA_GLOBAL[0].NIT == 892000401 || $_USUA_GLOBAL[0].NIT == 900648993 || $_USUA_GLOBAL[0].NIT == 900755133) &&
        this.form.almacen_SAL401.trim() == "CR001" &&
        (this.form.unidaddeservicio_SAL401.substring(0, 2) != "04" ||
          this.form.unidaddeservicio_SAL401.substring(0, 2) != "54")
      ) {
        CON851("B1", "B1", this._evaluaralmacen_SAL401(), "error", "Error");
      } else {
        if (this.form.almacen_SAL401.substring(0, 3) == "SIN") {
          this._validarventanalote_SAL401();
        } else {
          if (
            $_USUA_GLOBAL[0].NIT != 892000401 ||
            $_USUA_GLOBAL[0].NIT != 900648993 ||
            $_USUA_GLOBAL[0].NIT != 900755133 ||
            $_USUA_GLOBAL[0].NIT != 900804411 ||
            $_USUA_GLOBAL[0].NIT != 900870633
          ) {
            if (
              (this.form.codigodeservicio_SAL401.substring(0, 2) == "PO" ||
                this.form.codigodeservicio_SAL401.substring(0, 2) == "NP") &&
              this.SAL401.TIPODRFACT == "1" &&
              this.SAL401.LLAVEBAR.trim() == 0 &&
              this.SAL401.LLAVEBAR.trim() == "" &&
              $_USUA_GLOBAL[0].BARRAS == "S"
            ) {
              CON851("1P", "1P", this._evaluaralmacen_SAL401(), "error", "Error");
            } else if (
              (this.form.codigodeservicio_SAL401.substring(0, 2) == "PO" ||
                this.form.codigodeservicio_SAL401.substring(0, 2) == "NP") &&
              this.SAL401.LLAVEBAR.trim() != this.SAL401.ARTICULO.COD_BAR.trim() &&
              $_USUA_GLOBAL[0].BARRAS == "S"
            ) {
              CON851("1P", "1P", this._evaluaralmacen_SAL401(), "error", "Error");
            } else {
              if (
                this.form.codigodeservicio_SAL401.trim().substring(0, 2) == "MQ" &&
                this.SAL401.TIPODRFACT == 1 &&
                (this.SAL401.LLAVEBAR.trim() == 0 || this.SAL401.LLAVEBAR.trim() == "") &&
                $_USUA_GLOBAL[0].BARRAS == "S"
              ) {
                CON851("1P", "1P", this._evaluaralmacen_SAL401(), "error", "Error");
              } else {
                this._validarventanalote_SAL401();
              }
            }
          } else {
            this._validarventanalote_SAL401();
          }
        }
      }
    },
    _validarventanalote_SAL401() {
      postData(
        { datosh: `${datosEnvio()}A||||||||||||0${this.form.codigodeservicio_SAL401.trim().substring(0, 2)}|` },
        get_url("APP/SALUD/SAL401.DLL")
      )
        .then((data) => {
          this.SAL401.GRUPO = data;
          if (this.form.almacen_SAL401.trim().substring(0, 3) == "SIN") {
            this.SAL401.GRUPO.OPCLOTE = "N";
          }

          if (this.SAL401.GRUPO.OPCLOTE == "S" && $_USUA_GLOBAL[0].FECHALNK >= this.SAL401.GRUPO.INICIO) {
            this._evaluarlotefarmaceutico_SAL401();
          } else {
            this._leerpromedio_SAL401(this._buscarsaldo_SAL401, this._evaluaralmacen_SAL401, true);
          }
        })
        .catch((error) => {
          console.error(error);
          if (error.MENSAJE == "01") {
            this.SAL401.GRUPO = new Object();
            this.SAL401.GRUPO.DESCRIPCION = "GRUPO NO EXISTE!";
            this.SAL401.GRUPO.OPCLOTE = "N";
            this._leerpromedio_SAL401(this._buscarsaldo_SAL401, this._evaluaralmacen_SAL401, true);
          } else {
            this._evaluaralmacen_SAL401();
          }
        });
    },
    _evaluarlotefarmaceutico_SAL401() {
      $("#CODLOTEFACT_SAL401").removeClass("hidden");
      validarInputs(
        {
          form: "#LOTE_SAL401",
          orden: "1",
        },
        this._evaluaralmacen_SAL401,
        () => {
          if (this.form.almacen_SAL401 == "SIN99") {
            this.SAL401.ALMPREF = this.form.almacen_SAL401.trim(); // ASIGNACION NECESARIA PARA CONSULTAR LEER PROMEDIO
            this._leerpromedio_SAL401(this._buscarsaldo_SAL401, this._evaluarlotefarmaceutico_SAL401, true);
          } else {
            if (this.form.codlotefarmaceutico_SAL401.trim() == "") {
              CON851("02", "02", this._evaluarlotefarmaceutico_SAL401(), "error", "Error");
            } else {
              postData(
                {
                  datosh: `${datosEnvio()}B|||||||||||||${this.form.codlotefarmaceutico_SAL401
                    .trim()
                    .padStart(9, "0")}|`,
                },
                get_url("APP/SALUD/SAL401.DLL")
              )
                .then((data) => {
                  console.log(data);
                  this.SAL401.LOTE = data;
                  if (
                    `0${this.form.codigodeservicio_SAL401.padEnd(15, " ")}${this.form.clasearticulo_SAL401.padEnd(
                      2,
                      " "
                    )}` != data.ART.padEnd(18, " ")
                  ) {
                    CON851("1M", "1M", this._evaluarlotefarmaceutico_SAL401(), "error", "Error");
                  } else {
                    this.SAL401.ALMPREF = this.form.almacen_SAL401.trim(); // ASIGNACION NECESARIA PARA CONSULTAR LEER PROMEDIO
                    this._leerpromedio_SAL401(this._buscarsaldo_SAL401, this._evaluarlotefarmaceutico_SAL401, true);
                  }
                })
                .catch((error) => {
                  console.error(error);
                  this._evaluarlotefarmaceutico_SAL401();
                });
            }
          }
        }
      );
    },
    _buscarsaldo_SAL401(data) {
      console.log(data);
      valorunitarioMask_SAL401.typedValue = this.SAL401.ARTICULO.VR_VENTA1;
      // REALIZAR VENTANA QUE MUESTRE EL SALDO Y LUEGO HAGA ESTO :
      if (clasedeservicioMask_SAL401.value == "0" && this.SAL401.TIPODRFACT == "2") {
        // MIRAR CANTIDAD QUE PINTA DEVOLUCION
        this._evaluarcantidad_SAL401();
      } else {
        this._calcularmonto_SAL401(this._evaluarcantidad_SAL401);
      }
    },
    _evaluarcantidad_SAL401() {
      if (cantidadMask_SAL401.value.trim() == "") cantidadMask_SAL401.typedValue = "1";
      validarInputs(
        {
          form: "#VALIDAR11_SAL401",
          orden: "1",
        },
        () => {
          this._evaluarcodigoservicio_SAL401();
        },
        () => {
          if (cantidadMask_SAL401.value.trim() == "" || cantidadMask_SAL401.value.trim() == 0) {
            CON851("", "Digite una cantidad", this._evaluarcantidad_SAL401(), "error", "Error");
          } else if (
            cantidadMask_SAL401.value.replace(/,/g, "").trim() > 200 &&
            clasedeservicioMask_SAL401.value != "4"
          ) {
            CON851("03", "03", this._evaluarcantidad_SAL401(), "error", "Error");
          } else {
            if (this.form.paquete_SAL401.toUpperCase() == "S") {
              this.FACTURACION[this.SAL401.CONTEO].CANTIDAD = cantidadMask_SAL401.value.replace(/,/g, "");
              this.form.codigodeservicio_SAL401 = "";
              cantidadMask_SAL401.typedValue = "";
              this.form.unidad_SAL401 = "";
              vlrunit_SAL401.typedValue = "";
              this.form.almacen_SAL401 = "";
              this.form.codlotefarmaceutico_SAL401 = "";
              this._evaluarcodigoservicio_SAL401();
            } else {
              if (clasedeservicioMask_SAL401.value == "0") {
                console.log("DROGUERIA");
                if (this.SAL401.TIPODRFACT == "2") {
                  if (parseFloat(this.SAL401.CANTDEVOL) - parseFloat(cantidadMask_SAL401.value.replace(/,/g, "")) < 0) {
                    CON851("07", "07", this._evaluarcantidad_SAL401(), "error", "Error");
                  } else {
                    var valor =
                      parseFloat(valorunitarioMask_SAL401.value.replace(/,/g, "")) /
                      parseFloat(cantidadMask_SAL401.value.replace(/,/g, ""));
                    if (this.SAL401.VLRDEVOL.trim() == "" || this.SAL401.VLRDEVOL == 0) {
                      valorunitarioMask_SAL401.typedValue = "0.00";
                    }
                    this._dato5_SAL401();
                  }
                } else {
                  if (parseInt(cantidadMask_SAL401.value) < 0 && this.form.almacen_SAL401.substring(0, 1) != "S") {
                    console.log("DROGUERIA 2");
                    CON851("46", "46", this._evaluarcantidad_SAL401(), "error", "Error");
                  } else if (
                    $_USUA_GLOBAL[0].NIT == 892000458 &&
                    (this.form.almacen_SAL401.trim() == "DR002" ||
                      this.form.almacen_SAL401.trim() == "DR003" ||
                      this.form.almacen_SAL401.trim() == "URG01")
                  ) {
                    console.log("DROGUERIA 3");
                    this._validardiastratamiento_SAL401();
                  } else {
                    if (
                      this.form.almacen_SAL401.trim().substring(0, 3) != "SIN" &&
                      cantidadMask_SAL401.value > 0 &&
                      cantidadMask_SAL401.value > parseFloat(this.SAL401.SDOACTCANT)
                    ) {
                      CON851("07", "07", null, "error", "Error");
                      if ($_USUA_GLOBAL[0].RESTRIC_EX == "N") {
                        console.log("DROGUERIA 4");
                        this._evaluarcantidad_SAL401();
                      } else {
                        console.log("DROGUERIA 4");
                        this._validardiastratamiento_SAL401();
                      }
                    } else {
                      console.log("DROGUERIA 5");
                      this._validardiastratamiento_SAL401();
                    }
                  }
                }
                if (this.SAL401.SDOACTCANT < this.SAL401.ARTICULO.AUTORET) {
                  CON851("5K", "5K", null, "error", "Error");
                }
              } else {
                this._validardiastratamiento_SAL401();
              }
            }
          }
        }
      );
    },
    _validardiastratamiento_SAL401() {
      if (
        this.form.codigodeservicio_SAL401.substring(0, 2) != "93" &&
        this.form.codigodeservicio_SAL401.substring(0, 2) != "XX" &&
        this.form.codigodeservicio_SAL401.substring(0, 2) != "89" &&
        this.form.codigodeservicio_SAL401.substring(2, 3) != "3" &&
        cantidadMask_SAL401.unmaskedValue > this.SAL401.CANTMAX
      ) {
        console.log("TRATAMIENTO 1");
        CON851("07", "07", this._evaluarcantidad_SAL401(), "error", "Error");
      } else {
        if (
          ($_USUA_GLOBAL[0].NIT == 900658867 ||
            $_USUA_GLOBAL[0].NIT == 900541158 ||
            $_USUA_GLOBAL[0].NIT == 900566047 ||
            $_USUA_GLOBAL[0].NIT == 800037979) &&
          (this.form.codigodeservicio_SAL401.substring(0, 2) == "PO" ||
            this.form.codigodeservicio_SAL401.substring(0, 2) == "NP")
        ) {
          console.log("TRATAMIENTO 2");
          this._evaluardiastratamiento_SAL401();
        } else {
          this.SAL401.SWERROR = 0;
          if (
            this.SAL401.VLRUNITW == 0 ||
            (prefijofacturaMask_SAL401.value != "C" &&
              prefijofacturaMask_SAL401.value != "E" &&
              prefijofacturaMask_SAL401.value != "Ñ" &&
              prefijofacturaMask_SAL401.value != "U")
          ) {
            console.log("TRATAMIENTO 3");
            this._calcularprecio_SAL401();
          } else {
            console.log("TRATAMIENTO 4");
            this._datodesart_SAL401();
          }
        }
      }
    },
    _datodesart_SAL401() {
      if (
        $_USUA_GLOBAL[0].DESCTO == "N" ||
        (clasedeservicioMask_SAL401.value == "0" && this.SAL401.TIPODRFACT == "2")
      ) {
        this.SAL401.DESCTOW = "0";
        this._calcularprecio_SAL401();
      } else {
        // ACEPTAR PARA UNA EMPRESA EL DESCTO
        this.SAL401.DESCTOW = "0";
        this._calcularprecio_SAL401();
      }
    },
    _calcularprecio_SAL401() {
      this.SAL401.FACTORDESW = (100 - this.SAL401.DESCTOW) / 100;
      // MOSTRAR TODOS LOS DESCUENTOS
      if (
        $_USUA_GLOBAL[0].ASUME_IVA == "S" &&
        clasedeservicioMask_SAL401.value != "1" &&
        this.form.codigodeservicio_SAL401.trim().substring(0, 2) == "S1" &&
        this.form.codigodeservicio_SAL401.trim().substring(0, 2) == "XX" &&
        this.SAL401.VLRUNITW > 0
      ) {
        console.log("ENTRA DIFERENTE");
        this._dato5_SAL401();
      } else {
        this.SAL401.MACRO = "0";
        if (
          ((localStorage.Usuario == "GEBC" ||
            localStorage.Usuario == "ADMI" ||
            localStorage.Usuario == "LYRC" ||
            localStorage.Usuario == "LICC" ||
            localStorage.Usuario == "MSBR") &&
            $_USUA_GLOBAL[0].NIT == 892000264) ||
          $_USUA_GLOBAL[0].NIT == 822006883 ||
          $_USUA_GLOBAL[0].NIT == 16623180
        ) {
          this._evaluarvalorunitario_SAL401();
        } else {
          if (valorunitarioMask_SAL401.value.trim() == "")
            valorunitarioMask_SAL401.typedValue = this.SAL401.VLRUNITW.toString();
          this._valirdarlimite_SAL401();
        }
      }
    },
    _evaluarvalorunitario_SAL401() {
      if (valorunitarioMask_SAL401.value.trim() == "")
        valorunitarioMask_SAL401.typedValue = this.SAL401.VLRUNITW.toString();
      validarInputs(
        {
          form: "#VALIDAR12_SAL401",
          orden: "1",
        },
        this._evaluarcantidad_SAL401,
        () => {
          console.log(this.SAL401.VLRLIMIW, "VALOR FACT");
          if (this.SAL401.VLRLIMIW > 0 && this.SAL401.VLRUNITW > this.SAL401.VLRLIMIW) {
            CON851("9E", "9E", null, "error", "Error");
            if (
              $_USUA_GLOBAL[0].NIT == 891855847 ||
              $_USUA_GLOBAL[0].NIT == 24247556 ||
              $_USUA_GLOBAL[0].NIT == 900030814 ||
              $_USUA_GLOBAL[0].NIT == 800162035 ||
              $_USUA_GLOBAL[0].NIT == 900019291
            ) {
              CON851P("04", this._evaluarvalorunitario_SAL401, this._valirdarlimite_SAL401);
            } else {
              if (clienteMask_SAL401.value != 9999 || clienteMask_SAL401.value != 1111) {
                this._evaluarvalorunitario_SAL401();
              } else {
                this._valirdarlimite_SAL401();
              }
            }
          } else {
            this._valirdarlimite_SAL401();
          }
        }
      );
    },
    _valirdarlimite_SAL401() {
      if (this.SAL401.SWBONO == 1) {
        this.SAL401.DCTOW = this.SAL401.VLRUNITW * 0.2;
        this.SAL401.VLRUNITW = this.SAL401.VLRUNITW * 0.8;
      }
      this._dato5_SAL401();
    },
    _dato5_SAL401() {
      console.log(this.SAL401.VLRUNITW);
      if ($_USUA_GLOBAL[0].NIT == 892000401 || $_USUA_GLOBAL[0].NIT == 900475095 || $_USUA_GLOBAL[0].NIT == 900708318) {
        this.SAL401.VLRARTW = this.SAL401.VLRUNITW * parseFloat(cantidadMask_SAL401.unmaskedValue);
      } else {
        this.SAL401.VLRARTW = this.SAL401.VLRUNITW * parseFloat(cantidadMask_SAL401.unmaskedValue);
      }
      if ($_USUA_GLOBAL[0].NIT != 892000401 || $_USUA_GLOBAL[0].NIT != 900475095 || $_USUA_GLOBAL[0].NIT != 900708318) {
        this.SAL401.VLRARTW = this.SAL401.VLRARTW / this.SAL401.SWAPR;
        this.SAL401.VLRARTW = this.SAL401.VLRARTW * this.SAL401.SWAPR;
      }
      if (clasedeservicioMask_SAL401.value == "1" && this.SAL401.CODTABW == "I4") {
        this._ventanacirugia_SAL401();
      } else if (
        clasedeservicioMask_SAL401.value == "0" &&
        this.SAL401.TIPODRFACT == "2" &&
        (this.SAL401.VLRARTW > 0 || this.SAL401.VLRARTW + this.SAL401.VLRDEVOL < 0)
      ) {
        CON851("07", "07", this._evaluarvalorunitario_SAL401(), "error", "Error");
      } else {
        if (this.SAL401.IVAART == "1") this.SAL401.TARIVA = $_USUA_GLOBAL[0].IVA1;
        else if (this.SAL401.IVAART == "1") this.SAL401.TARIVA = $_USUA_GLOBAL[0].IVA2;
        else if (this.SAL401.IVAART == "1") this.SAL401.TARIVA = $_USUA_GLOBAL[0].IVA3;
        else this.SAL401.TARIVA = "0";
        if ($_USUA_GLOBAL[0].ASUME_IVA == "S") {
          let valorunitario =
            (parseFloat(valorunitarioMask_SAL401.value.replace(/,/g, "")) / (100 + parseFloat(this.SAL401.TARIVA))) *
            100;
          valorunitario = Math.round(valorunitario);
          valorunitarioMask_SAL401.typedValue = valorunitario.toString();
        }
        let valortotal =
          parseFloat(cantidadMask_SAL401.value.replace(/,/g, "")) *
          parseFloat(valorunitarioMask_SAL401.value.replace(/,/g, ""));
        valortotal = (Math.round(valortotal * 100) / 100).toString();
        if (valortotal.indexOf(".") == -1) valortotal = `${valortotal}.00`;

        if (this.SAL401.SWCAMBIO == 1) {
          if (this.FACTURACION[this.SAL401.CONTEO]) {
            this.FACTURACION[this.SAL401.CONTEO].ALMACEN = this.form.almacen_SAL401.trim();
            if (clasedeservicioMask_SAL401.value == "0") {
              this.FACTURACION[this.SAL401.CONTEO].ARTICULO = `${this.form.codigodeservicio_SAL401
                .trim()
                .padEnd(15, " ")}${this.form.clasearticulo_SAL401.trim().padEnd(2, " ")}`;
            } else {
              this.FACTURACION[this.SAL401.CONTEO].ARTICULO = this.form.codigodeservicio_SAL401.trim();
            }
            this.FACTURACION[this.SAL401.CONTEO].DESCRIPCIONART = this.form.codigodeserviciod_SAL401.trim();
            this.FACTURACION[this.SAL401.CONTEO].CODIGOLOTE = this.form.codlotefarmaceutico_SAL401
              .trim()
              .padStart(9, "0");
            this.FACTURACION[this.SAL401.CONTEO].CANTIDAD = cantidadMask_SAL401.value.replace(/,/g, "");
            this.FACTURACION[this.SAL401.CONTEO].VALORUNIT = valorunitarioMask_SAL401.value.replace(/,/g, "");
            this.FACTURACION[this.SAL401.CONTEO].DIASTRATA = diastratamientoMask_SAL401.value;
            this.FACTURACION[this.SAL401.CONTEO].VALORTOTAL = valortotal;
            this.FACTURACION[this.SAL401.CONTEO].UNIDAD = "";
          } else {
            if (clasedeservicioMask_SAL401.value == "0") {
              if (this.form.paquete_SAL401.trim() == "S" && $_USUA_GLOBAL[0].NIT == 892000264) {
                this.FACTURACION.push({
                  ALMACEN: this.form.almacen_SAL401.trim(),
                  ARTICULO: `${this.form.codigodeservicio_SAL401.trim().padEnd(15, " ")}`,
                  DESCRIPCIONART: this.form.codigodeserviciod_SAL401.trim(),
                  CODIGOLOTE: this.form.codlotefarmaceutico_SAL401.trim().padStart(9, "0"),
                  CANTIDAD: cantidadMask_SAL401.value.replace(/,/g, ""),
                  VALORUNIT: "0.00",
                  DIASTRATA: diastratamientoMask_SAL401.value,
                  VALORTOTAL: "0.00",
                  UNIDAD: "",
                  CLASEART: this.form.clasearticulo_SAL401.trim().padEnd(2, " "),
                });
              } else {
                this.FACTURACION.push({
                  ALMACEN: this.form.almacen_SAL401.trim(),
                  ARTICULO: `${this.form.codigodeservicio_SAL401.trim().padEnd(15, " ")}${this.form.clasearticulo_SAL401
                    .trim()
                    .padEnd(2, " ")}`,
                  DESCRIPCIONART: this.form.codigodeserviciod_SAL401.trim(),
                  CODIGOLOTE: this.form.codlotefarmaceutico_SAL401.trim().padStart(9, "0"),
                  CANTIDAD: cantidadMask_SAL401.value.replace(/,/g, ""),
                  VALORUNIT: valorunitarioMask_SAL401.value.replace(/,/g, ""),
                  DIASTRATA: diastratamientoMask_SAL401.value,
                  VALORTOTAL: valortotal,
                  UNIDAD: "",
                  CLASEART: this.form.clasearticulo_SAL401.trim().padEnd(2, " "),
                });
              }
            } else {
              this.FACTURACION.push({
                ALMACEN: this.form.almacen_SAL401.trim(),
                ARTICULO: this.form.codigodeservicio_SAL401.trim(),
                DESCRIPCIONART: this.form.codigodeserviciod_SAL401.trim(),
                CODIGOLOTE: this.form.codlotefarmaceutico_SAL401.trim().padStart(9, "0"),
                CANTIDAD: cantidadMask_SAL401.value.replace(/,/g, ""),
                VALORUNIT: valorunitarioMask_SAL401.value.replace(/,/g, ""),
                DIASTRATA: diastratamientoMask_SAL401.value,
                VALORTOTAL: valortotal,
                UNIDAD: "",
                CLASE: this.form.clasearticulo_SAL401.trim().padEnd(2, " "),
              });
            }
          }
        } else {
          if (clasedeservicioMask_SAL401.value == "0") {
            this.FACTURACION.push({
              ALMACEN: this.form.almacen_SAL401.trim(),
              ARTICULO: `${this.form.codigodeservicio_SAL401.trim().padEnd(15, " ")}${this.form.clasearticulo_SAL401
                .trim()
                .padEnd(2, " ")}`,
              DESCRIPCIONART: this.form.codigodeserviciod_SAL401.trim(),
              CODIGOLOTE: this.form.codlotefarmaceutico_SAL401.trim().padStart(9, "0"),
              CANTIDAD: cantidadMask_SAL401.value.replace(/,/g, ""),
              VALORUNIT: valorunitarioMask_SAL401.value.replace(/,/g, ""),
              DIASTRATA: diastratamientoMask_SAL401.value,
              VALORTOTAL: valortotal,
              UNIDAD: "",
            });
          } else {
            this.FACTURACION.push({
              ALMACEN: this.form.almacen_SAL401.trim(),
              ARTICULO: this.form.codigodeservicio_SAL401.trim(),
              DESCRIPCIONART: this.form.codigodeserviciod_SAL401.trim(),
              CODIGOLOTE: this.form.codlotefarmaceutico_SAL401.trim().padStart(9, "0"),
              CANTIDAD: cantidadMask_SAL401.value.replace(/,/g, ""),
              VALORUNIT: valorunitarioMask_SAL401.value.replace(/,/g, ""),
              DIASTRATA: diastratamientoMask_SAL401.value,
              VALORTOTAL: valortotal,
              UNIDAD: "",
            });
          }
        }
        let valorbruto = 0;
        if (this.form.paquete_SAL401.trim() != "S") {
          for (var i in this.FACTURACION) {
            let valor = parseFloat(this.FACTURACION[i].VALORTOTAL.replace(/,/g, ""));
            if (isNaN(valor)) valor = 0;
            valorbruto = valorbruto + valor;
          }
        } else {
          valorbruto = parseInt(netofacturaMask_SAL401.value.replace(/,/g, ""));
        }
        if (this.SAL401.IVAART == "1") {
          this.SAL401.VALORBASE1 = this.SAL401.VALORBASE1 + valortotal;
        }
        if (this.SAL401.IVAART == "2") {
          this.SAL401.VALORBASE2 = this.SAL401.VALORBASE2 + valortotal;
        }
        if (this.SAL401.IVAART == "3") {
          this.SAL401.VALORBASE3 = this.SAL401.VALORBASE3 + valortotal;
        }
        console.log(valorbruto);
        valortotalcomprobanteMask_SAL401.typedValue = valorbruto.toString();
        netofacturaMask_SAL401.typedValue = valorbruto.toString();
        if (this.SAL401.CONTEO == 0) {
          this.SAL401.MACRO = "0";
          if (clasedeservicioMask_SAL401.value == "3" || clasedeservicioMask_SAL401.value == "2") {
            this.SAL401.MACRO = "1";
            console.error("DLL CONSULTA MACRO INV -- PERFORM BUSCAR MACRO");
          }
        }
        if (this.SAL401.SWCAMBIO == 1) this.SAL401.CONTEO = this.FACTURACION.length;
        else this.SAL401.CONTEO++;
        this.SAL401.SWCAMBIO = 0;
        this._totalizarylimpiarcampostabla_SAL401();
        this._evaluarcodigoservicio_SAL401();
      }
    },
    _datodescuento_SAL401() {
      if (this.SAL401.SWBONO == "0") this.SAL401.VALORDESFACT = 0;
      this._datoabono_SAL401();
    },
    _datoabono_SAL401() {
      let valorbruto = 0;
      porcentajecopagoMask_SAL401.typedValue = "0";
      if (this.form.paquete_SAL401.toUpperCase().trim() != "S") {
        for (var i in this.FACTURACION) {
          let valor = parseFloat(this.FACTURACION[i].VALORTOTAL.replace(/,/g, ""));
          if (isNaN(valor)) valor = 0;
          valorbruto = valorbruto + valor;
        }
      } else {
        valorbruto = parseInt(netofacturaMask_SAL401.value.replace(/,/g, ""));
      }
      // for (var i in this.FACTURACION) {
      //     let valor = parseFloat(this.FACTURACION[i].VALORTOTAL.replace(/,/g, ''));
      //     if (isNaN(valor)) valor = 0;
      //     valorbruto = valorbruto + valor;
      // }
      valortotalcomprobanteMask_SAL401.typedValue = valorbruto.toString();
      netofacturaMask_SAL401.typedValue = valorbruto.toString();
      if ($_USUA_GLOBAL[0].NIT == 800175901) porcentajecopagoMask_SAL401.typedValue = "0";
      if (
        prefijofacturaMask_SAL401.value == "C" ||
        prefijofacturaMask_SAL401.value == "P" ||
        prefijofacturaMask_SAL401.value == "T" ||
        prefijofacturaMask_SAL401.value == "O" ||
        prefijofacturaMask_SAL401.value == "Q" ||
        prefijofacturaMask_SAL401.value == "R" ||
        prefijofacturaMask_SAL401.value == "U" ||
        prefijofacturaMask_SAL401.value == "V" ||
        prefijofacturaMask_SAL401.value == "W" ||
        prefijofacturaMask_SAL401.value == "X" ||
        prefijofacturaMask_SAL401.value == "Y" ||
        prefijofacturaMask_SAL401.value == "Z" ||
        this.SAL401.NUMERACION.FORMACOPAG_NUM == "2"
      ) {
        copagoestimfactMask_SAL401.typedValue = "0";
        porcentajecopagoMask_SAL401.typedValue = "0";
        this.SAL401.TIPOCOPAGO = "";
        this.SAL401.FPAGO = "";
        this._evaluarespecialidad_SAL401();
        // this._editarabono_SAL401();
      } else if (
        this.SAL401.NUMERACION.FORMACOPAG_NUM == "4" &&
        this.SAL401.NUMERACION.LLAVE_NUM == this.SAL401.NUMERACION.FACTCAPIT_NUM
      ) {
        this._evaluarcopago_SAL401();
      } else if (prefijofacturaMask_SAL401.value == "E") {
        porcentajecopagoMask_SAL401.typedValue = "9";
        copagoestimfactMask_SAL401.typedValue = parseInt(netofacturaMask_SAL401.value.replace(/,/g, "")).toString();
        if ($_USUA_GLOBAL[0].NIT == 892000401) {
          this._evaluarcopago_SAL401();
        } else {
          this._editarabono_SAL401();
        }
      } else if (
        ($_USUA_GLOBAL[0].NIT == 830092718 || $_USUA_GLOBAL[0].NIT == 830092719 || $_USUA_GLOBAL[0].NIT == 900193162) &&
        porcentajecopagoMask_SAL401.value == 99
      ) {
        copagoestimfactMask_SAL401.typedValue = valortotalcomprobanteMask_SAL401.value;
        this._editarabono_SAL401();
      } else if (
        ($_USUA_GLOBAL[0].NIT == 830092718 || $_USUA_GLOBAL[0].NIT == 830092719) &&
        this.SAL401.PACIENTE.COAPGO == "N"
      ) {
        copagoestimfactMask_SAL401.typedValue = "0";
        this._editarabono_SAL401();
      } else if ($_USUA_GLOBAL[0].NIT != 800156469 && clasedeservicioMask_SAL401.value == "7") {
        copagoestimfactMask_SAL401.typedValue = "0";
        this._editarabono_SAL401();
      } else if (clasedeservicioMask_SAL401.value == "0" && this.SAL401.TIPODRFACT == "2") {
        copagoestimfactMask_SAL401.typedValue = "0";
        this._editarabono_SAL401();
      } else if (
        prefijofacturaMask_SAL401.value != "C" &&
        prefijofacturaMask_SAL401.value != "E" &&
        prefijofacturaMask_SAL401.value != "Ñ" &&
        prefijofacturaMask_SAL401.value != "P" &&
        prefijofacturaMask_SAL401.value != "T" &&
        prefijofacturaMask_SAL401.value != "U" &&
        clienteMask_SAL401.value.replace(/,/g, "") == 9999 &&
        (this.SAL401.CLIENTE.ACT == "15" || this.SAL401.CLIENTE.ACT == "25")
      ) {
        porcentajecopagoMask_SAL401.typedValue = "9";
        copagoestimfactMask_SAL401.typedValue = netofacturaMask_SAL401.value;
        if ($_USUA_GLOBAL[0].NIT == 892000401) {
          this._evaluarcopago_SAL401();
        } else {
          this._editarabono_SAL401();
        }
      } else if (
        $_USUA_GLOBAL[0].NIT == clienteMask_SAL401.value.replace(/,/g, "") &&
        prefijofacturaMask_SAL401.value != "C" &&
        prefijofacturaMask_SAL401.value != "E" &&
        prefijofacturaMask_SAL401.value != "Ñ" &&
        prefijofacturaMask_SAL401.value != "P" &&
        prefijofacturaMask_SAL401.value != "T" &&
        prefijofacturaMask_SAL401.value != "U"
      ) {
        copagoestimfactMask_SAL401.typedValue = "0";
        this._editarabono_SAL401();
      } else if (
        $_USUA_GLOBAL[0].NIT == 900685768 &&
        prefijofacturaMask_SAL401.value != "C" &&
        prefijofacturaMask_SAL401.value != "E" &&
        prefijofacturaMask_SAL401.value != "Ñ" &&
        prefijofacturaMask_SAL401.value != "P" &&
        prefijofacturaMask_SAL401.value != "T" &&
        prefijofacturaMask_SAL401.value != "U" &&
        this.SAL401.CLIENTE.ACT == "25"
      ) {
        porcentajecopagoMask_SAL401.typedValue = "9";
        copagoestimfactMask_SAL401.typedValue = valortotalcomprobanteMask_SAL401.value;
        this._editarabono_SAL401();
      } else if (
        $_USUA_GLOBAL[0].NIT != 900405505 &&
        $_USUA_GLOBAL[0].NIT != 830511298 &&
        (this.SAL401.CLIENTE == "15" ||
          this.SAL401.CLIENTE == "25" ||
          this.SAL401.CLIENTE == "30" ||
          this.SAL401.CLIENTE == "22" ||
          this.SAL401.CLIENTE == "27")
      ) {
        this._evaluarcopago_SAL401();
      } else if (
        this.form.unidaddeservicio_SAL401.substring(0, 2) == "01" ||
        this.form.unidaddeservicio_SAL401.substring(0, 2) == "08" ||
        this.form.puertaingreso_SAL401.substring(0, 1) == "1" ||
        this.SAL401.PACIENTE.EPS.substring(0, 3) == "RES" ||
        this.SAL401.PACIENTE.EPS.substring(0, 3) == "EAR"
      ) {
        copagoestimfactMask_SAL401.typedValue = "0";
        this._editarabono_SAL401();
      } else if (porcentajecopagoMask_SAL401.value == 0) {
        if (
          this.SAL401.ARTICULO.COPAGOMOD == "1" &&
          (this.SAL401.PACIENTE["TIPO-AFIL"] == "0" || this.SAL401.PACIENTE["TIPO-AFIL"] == "2")
        ) {
          if (this.SAL401.PACIENTE.ESTRATO == "1") porcentajecopagoMask_SAL401.typedValue = "11.5";
          if (this.SAL401.PACIENTE.ESTRATO == "2") porcentajecopagoMask_SAL401.typedValue = "17.3";
          if (this.SAL401.PACIENTE.ESTRATO == "3") porcentajecopagoMask_SAL401.typedValue = "23";
          else porcentajecopagoMask_SAL401.typedValue = "11.5";
          this._validarcopago_SAL401();
        } else if (
          $_USUA_GLOBAL[0].NIT != 900405505 &&
          clasedeservicioMask_SAL401.value == "4" &&
          (this.SAL401.PACIENTE["TIPO-AFIL"] == "0" || this.SAL401.PACIENTE["TIPO-AFIL"] == "2")
        ) {
          if (this.SAL401.PACIENTE.ESTRATO == "0") {
            porcentajecopagoMask_SAL401.typedValue = "0";
            copagoestimfactMask_SAL401.typedValue = "0";
            this._datoabono2_SAL401();
          } else if (this.SAL401.PACIENTE.ESTRATO == "1") {
            if (this.SAL401.PACIENTE.TIPO == "S") {
              porcentajecopagoMask_SAL401.typedValue = "0";
              this._datoabono2_SAL401();
            } else {
              porcentajecopagoMask_SAL401.typedValue = "9";
              copagoestimfactMask_SAL401.typedValue = this.SAL401.VLRMODW[0].toString();
              this._evaluarcopago_SAL401();
            }
          } else if (this.SAL401.PACIENTE.ESTRATO == "2") {
            if (this.SAL401.PACIENTE.TIPO == "S") {
              porcentajecopagoMask_SAL401.typedValue = "10";
              this._datoabono2_SAL401();
            } else {
              porcentajecopagoMask_SAL401.typedValue = "9";
              copagoestimfactMask_SAL401.typedValue = this.SAL401.VLRMODW[1].toString();
              this._evaluarcopago_SAL401();
            }
          } else if (this.SAL401.PACIENTE.ESTRATO == "3") {
            if (this.SAL401.PACIENTE.TIPO == "S") {
              porcentajecopagoMask_SAL401.typedValue = "15";
              this._datoabono2_SAL401();
            } else {
              porcentajecopagoMask_SAL401.typedValue = "9";
              copagoestimfactMask_SAL401.typedValue = this.SAL401.VLRMODW[2].toString();
              this._evaluarcopago_SAL401();
            }
          } else {
            if (this.SAL401.PACIENTE.TIPO == "S") {
              porcentajecopagoMask_SAL401.typedValue = "15";
              this._datoabono2_SAL401();
            } else {
              porcentajecopagoMask_SAL401.typedValue = "9";
              copagoestimfactMask_SAL401.typedValue = this.SAL401.VLRMODW[2].toString();
              this._evaluarcopago_SAL401();
            }
          }
        } else {
          this._datoabono2_SAL401();
        }
      } else {
        this._revisarbloqueos_SAL401(
          (data) => {
            this._datoabono2_SAL401();
          },
          () => {
            if ($_USUA_GLOBAL[0].NIT == 900405505 && this.form.codigodeservicio_SAL401.substring(0, 2) == "93") {
              this._datoabono2_SAL401();
            } else {
              this._editarabono_SAL401();
            }
          },
          (params = { CODIGO: "I41C" })
        );
      }
    },
    _datoabono2_SAL401() {
      if (this.SAL401.SWORDSERV == "S" && copagoestimfactMask_SAL401.unmaskedValue > 0) {
        this._evaluarcopago_SAL401();
      } else {
        this._evaluarcopago_SAL401();
      }
      if (
        $_USUA_GLOBAL[0].NIT == 800162035 &&
        clienteMask_SAL401.value == 9999 &&
        clasedeservicioMask_SAL401.value == "0"
      )
        porcentajecopagoMask_SAL401.typedValue = "9";
    },
    _evaluarcopago_SAL401() {
      if ($_USUA_GLOBAL[0].NIT == 822002688) {
        this._validarcopago_SAL401();
      } else {
        validarInputs(
          {
            form: "#VALIDAR13_SAL401",
            orden: "1",
          },
          () => {
            this._evaluarcodigoservicio_SAL401();
          },
          this._validarcopago_SAL401
        );
      }
    },
    _validarcopago_SAL401() {
      if (porcentajecopagoMask_SAL401.value > 0) {
        copagoestimfactMask_SAL401.typedValue = (
          (parseFloat(valortotalcomprobanteMask_SAL401.value.replace(/,/g, "")) *
            parseFloat(porcentajecopagoMask_SAL401.value)) /
          100
        ).toString();
      } else {
        copagoestimfactMask_SAL401.typedValue = "0";
      }
      this._evaluarcopago_SAL401();
    },
    _evaluarcopago_SAL401() {
      if (
        $_USUA_GLOBAL[0].NIT == 800162035 &&
        clienteMask_SAL401.value == 9999 &&
        clasedeservicioMask_SAL401.value == "0"
      )
        copagoestimfactMask_SAL401.typedValue = valortotalcomprobanteMask_SAL401.value;
      this._revisarbloqueos_SAL401(
        (data) => {
          this._evaluarcopagofact_SAL401();
        },
        () => {
          if (
            ($_USUA_GLOBAL[0].NIT == 900405505 || $_USUA_GLOBAL[0].NIT == 830511298) &&
            this.form.codigodeservicio_SAL401.substring(0, 2) == "93"
          ) {
            this._evaluarcopagofact_SAL401();
          } else {
            this._editarabono_SAL401();
          }
        },
        (params = { CODIGO: "I41C" })
      );
    },
    _evaluarcopagofact_SAL401() {
      if (
        (this.SAL401.NUMERACION.FORMACOPAG_NUM != "2" && this.SAL401.PACIENTE.COPAGO.trim() != "N") ||
        clienteMask_SAL401.value.replace(/,/g, "") == "9999" ||
        clienteMask_SAL401.value.replace(/,/g, "") == "9998"
      ) {
        validarInputs(
          {
            form: "#VALIDAR14_SAL401",
            orden: "1",
          },
          () => {
            this._evaluarcodigoservicio_SAL401();
          },
          this._editarabono_SAL401
        );
      } else {
        copagoestimfactMask_SAL401.typedValue = "0";
        this.SAL401.TIPOCOPAGO = "";
        this.SAL401.FPAGO = "";
        this._evaluarespecialidad_SAL401();
      }
    },
    _editarabono_SAL401() {
      let valorfacturado = parseFloat(netofacturaMask_SAL401.value.replace(/,/g, ""));
      let valorcopago = parseFloat(copagoestimfactMask_SAL401.value.replace(/,/g, ""));
      let valortotal = valorfacturado - valorcopago;
      valortotalcomprobanteMask_SAL401.typedValue = valortotal.toString();
      if (
        parseInt(valortotalcomprobanteMask_SAL401.value) < 0 &&
        (clasedeservicioMask_SAL401.value == "1" ||
          clasedeservicioMask_SAL401.value == "2" ||
          clasedeservicioMask_SAL401.value == "3")
      ) {
        CON851("07", "07", this._evaluarcopagofact_SAL401(), "error", "Error");
      } else {
        this._aceptartipocopago_SAL401();
      }
    },
    _aceptartipocopago_SAL401() {
      if (copagoestimfactMask_SAL401.value.replace(/,/g, "") == 0) {
        this.SAL401.TIPOCOPAGO = "";
        this._aceptartipocopago2_SAL401();
      } else {
        if (valortotalcomprobanteMask_SAL401.value.replace(/,/g, "") == 0) {
          this.SAL401.TIPOCOPAGO = "3";
          this._aceptartipocopago2_SAL401();
        } else {
          if (
            $_USUA_GLOBAL[0].NIT == 845000038 &&
            (clasedeservicioMask_SAL401.value == "A" ||
              clasedeservicioMask_SAL401.value == "B" ||
              clasedeservicioMask_SAL401.value == "D" ||
              clasedeservicioMask_SAL401.value == "F" ||
              clasedeservicioMask_SAL401.value == "G" ||
              clasedeservicioMask_SAL401.value == "H" ||
              clasedeservicioMask_SAL401.value == "I" ||
              clasedeservicioMask_SAL401.value == "J" ||
              clasedeservicioMask_SAL401.value == "K" ||
              clasedeservicioMask_SAL401.value == "L" ||
              clasedeservicioMask_SAL401.value == "M" ||
              clasedeservicioMask_SAL401.value == "N")
          ) {
            this.SAL401.TIPOCOPAGO = "2";
            this._validarSER822C_SAL401();
          } else {
            this.SAL401.TIPOCOPAGO = "1";
            setTimeout(() => {
              SER822A(
                (data = { seleccion: this.SAL401.TIPOCOPAGO }),
                this._evaluarcopagofact_SAL401,
                this._evaluarSER822A_SAL401
              );
            }, 300);
          }
        }
      }
    },
    _evaluarSER822A_SAL401(data) {
      this.SAL401.TIPOCOPAGO = data.COD;
      $("#FORMACOPAGO_SAL401").removeClass("hidden");
      this.form.tipocopago_SAL401 = `${data.COD} - ${data.DESCRIP}`;
      this._validarSER822C_SAL401();
    },
    _validarSER822C_SAL401() {
      if ($_USUA_GLOBAL[0].NIT == 900405505 && this.SAL401.TIPOCOPAGO == 0) {
        CON851("", "Tipo de copago en 0", this._evaluarcodigoservicio_SAL401(), "error", "Error");
      } else {
        setTimeout(() => {
          SER822C(
            (data = { seleccion: this.SAL401.TIPOCOPAGO }),
            this._evaluarcopagofact_SAL401,
            this._evaluarSER822C_SAL401
          );
        }, 300);
      }
    },
    _evaluarSER822C_SAL401(data) {
      this.SAL401.TIPOPAGO = data.COD;
      $("#TIPOCOPAGO_SAL401").removeClass("hidden");
      this.form.tipopago_SAL401 = `${data.COD} - ${data.DESCRIP}`;
      this._aceptartipocopago2_SAL401();
    },
    _aceptartipocopago2_SAL401() {
      if (this.SAL401.TIPOCOPAGO == 0) {
        this._evaluarcopagofact_SAL401();
      } else if ($_USUA_GLOBAL[0].NIT == 800074996) {
        // this._datofpago();
        this._evaluarespecialidad_SAL401();
      } else {
        this.SAL401.FPAGO = "";
        this._evaluarespecialidad_SAL401();
      }
    },
    _evaluarespecialidad_SAL401() {
      let prefijo = prefijofacturaMask_SAL401.value.trim();
      let esp = this.form.especialidad_SAL401.trim() == "";
      if (["C", "E", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j"].includes(prefijo) && esp == "") {
        this.form.especialidad_SAL401 == "385";
      };

      // * SERVIMEDICOS
      if (
        $_USUA_GLOBAL[0].NIT == 800162035 &&
        clasedeservicioMask_SAL401.value == "7" &&
        this.form.convenio_SAL401.substring(0, 2) == "PE" &&
        (this.FACTURACION[0].ARTICULO.trim() == "903841" ||
          this.FACTURACION[0].ARTICULO.trim() == "903815" ||
          this.FACTURACION[0].ARTICULO.trim() == "903816" ||
          this.FACTURACION[0].ARTICULO.trim() == "903818")
      ) {
        CON851("3R", "3R", null, "warning", "Advertencia!");
      }
      if (
        $_USUA_GLOBAL[0].NIT == 800162035 &&
        clasedeservicioMask_SAL401.value == "7" &&
        this.form.convenio_SAL401.substring(0, 2) == "PE" &&
        this.NUMERACION[0].ARTICULO.trim() == "903868"
      ) {
        CON851("3S", "3S", null, "warning", "Advertencia!");
      }

      if (esp == "" && ([830092718, 900019291, 900193162].includes($_USUA_GLOBAL[0].NIT))) {
        this.form.especialidad_SAL401 == "602";
      }

      if (
        $_USUA_GLOBAL[0].NIT == 845000038 &&
        this.SAL401.TIPODRFACT == 1 &&
        copagoestimfactMask_SAL401.value.replace(/,/g, "") > netofacturaMask_SAL401.value.replace(/,/g, "")
      ) {
        CON851("11", "11", this._evaluarcodigoservicio_SAL401(), "error", "Error");
      } else {
        validarInputs(
          {
            form: "#VALIDAR15_SAL401",
            orden: "1",
          },
          () => {
            this._evaluarcodigoservicio_SAL401();
          },
          () => {
            if (this.form.especialidad_SAL401.trim() == "") {
              if (clasedeservicioMask_SAL401.value == "0") {
                this._aceptarcosto_SAL401();
              } else {
                CON851("02", "02", null, "error", "Error");
                this._evaluarespecialidad_SAL401();
              }
            } else {
              postData(
                {
                  datosh: `${datosEnvio()}C|||||${this.FACTURACION[0].ARTICULO.trim()}|||||||||${this.form.especialidad_SAL401.trim()}|`,
                },
                get_url("APP/SALUD/SAL401.DLL")
              )
                .then((data) => {
                  this.SAL401.ESPECIALIDAD = data;
                  this.form.especialidadd_SAL401 = data.NOMBRE;
                  
                  let unserv = this.form.unidaddeservicio_SAL401.slice(0, 2);
                  let strCosto1 = this.SAL401.ESPECIALIDAD.COSTO.slice(0, 1);
                  
                  if ($_USUA_GLOBAL[0].NIT == 800037021) {
                    if (!["2D", "26", "27", "28", "2H", "2Q", "2W", "2g"].includes(this.SAL401.ESPECIALIDAD.COSTO.trim())) {
                      switch (unserv) {
                        case "01":
                          strCosto1 = "B";
                          break;
                          case "02":
                          strCosto1 = "1";
                          break;
                          case "03":
                          strCosto1 = "A";
                          break;
                          case "04":
                          strCosto1 = "C";
                          break;
                      }
                      this.SAL401.ESPECIALIDAD.COSTO = strCosto1 + this.SAL401.ESPECIALIDAD.COSTO.slice(1);
                    }
                  };

                  if ($_USUA_GLOBAL[0].NIT == 845000038) {
                    if (!["2a", "2e", "2C", "2J", "2w", "2b", "3Q", "3s", "3g", "3h", "3m", "4n"].includes(this.SAL401.ESPECIALIDAD.COSTO.trim())) {
                      switch (unserv) {
                        case 01:
                          strCosto1 = "B";
                          break;
                        case 02:
                          strCosto1 = "H";
                          break;
                        case 03:
                          strCosto1 = "A";
                          break;
                        case 04:
                          strCosto1 = "C";
                          break;
                        case 05:
                          strCosto1 = "B";
                          break;
                        case 06:
                          strCosto1 = "E";
                          break;
                        case 08:
                          strCosto1 = "Y";
                          break;
                      }
                      this.SAL401.ESPECIALIDAD.COSTO = strCosto1 + this.SAL401.ESPECIALIDAD.COSTO.slice(1);
                    }
                  }

                  if (
                    $_USUA_GLOBAL[0].NIT == 800037021 &&
                    clasedeservicioMask_SAL401.value == "4" &&
                    ["S3", "60", "81", "T3"].includes(this.FACTURACION[0].ARTICULO.substring(0, 2))
                  ) {
                    this.SAL401.ESPECIALIDAD.COSTO = "41";
                  }

                  if (
                    $_USUA_GLOBAL[0].NIT == 800037021 &&
                    clasedeservicioMask_SAL401.value == "0" &&
                    ["PO", "NP", "MQ"].includes(this.FACTURACION[0].ARTICULO.substring(0, 2))
                  ) {
                    this.SAL401.ESPECIALIDAD.COSTO = "39";
                  }

                  if (
                    $_USUA_GLOBAL[0].NIT == 800037021 &&
                    clasedeservicioMask_SAL401.value == "4" &&
                    ["HG", "93"].includes(this.FACTURACION[0].ARTICULO.substring(0, 2))
                  ) {
                    this.SAL401.ESPECIALIDAD.COSTO = "39";
                  }

                  if (
                    $_USUA_GLOBAL[0].NIT == 900405505 &&
                    this.SAL401.NUMERACION.CIS_NUM == "S" &&
                    this.SAL401.ARTICULO.CIS == "S" &&
                    this.FACTURACION[0].ARTICULO.trim() == "890202" &&
                    (clienteMask_SAL401.value.replace(/,/g, "") == 830003564 ||
                      clienteMask_SAL401.value.replace(/,/g, "") == 830003565) &&
                    this.form.especialidad_SAL401 != "137" &&
                    this.form.especialidad_SAL401 != "200" &&
                    this.form.especialidad_SAL401 != "310" &&
                    this.form.especialidad_SAL401 != "311" &&
                    this.form.especialidad_SAL401 != "480" &&
                    this.form.especialidad_SAL401 != "514" &&
                    this.form.especialidad_SAL401 != "521" &&
                    this.form.especialidad_SAL401 != "750" &&
                    this.form.especialidad_SAL401 != "590"
                  ) {
                    CON851("5L", "5L", null, "error", "Error");
                    this._evaluarespecialidad_SAL401()
                  } else if (
                    $_USUA_GLOBAL[0].NIT == 900405505 &&
                    this.SAL401.NUMERACION.CIS_NUM == "N" &&
                    this.SAL401.ARTICULO.CIS == "S" &&
                    this.FACTURACION[0].ARTICULO.trim() == "890202" &&
                    (clienteMask_SAL401.value.replace(/,/g, "") == 830003564 ||
                      clienteMask_SAL401.value.replace(/,/g, "") == 830003565) &&
                    this.form.especialidad_SAL401 != "137" &&
                    this.form.especialidad_SAL401 != "200" &&
                    this.form.especialidad_SAL401 != "310" &&
                    this.form.especialidad_SAL401 != "311" &&
                    this.form.especialidad_SAL401 != "480" &&
                    this.form.especialidad_SAL401 != "514" &&
                    this.form.especialidad_SAL401 != "521" &&
                    this.form.especialidad_SAL401 != "750" &&
                    this.form.especialidad_SAL401 != "590"
                  ) {
                    CON851("5L", "5L", null, "error", "Error");
                    this._evaluarespecialidad_SAL401()
                  } else {
                    this._aceptarcosto_SAL401();
                  }
                })
                .catch((err) => {
                  CON851("01", "01", null, "error", "error");
                  console.error("Error consultando especialidad: ", err);
                  this._evaluarespecialidad_SAL401();
                });
            }
          }
        );
      }
    },
    _aceptarcosto_SAL401() {
      if ([830092718, 830092719, 900193162].includes($_USUA_GLOBAL[0].NIT)) this.form.centrocostos_SAL401 = "";
      
      if ([900541158, 900566047, 900565371, 901120152].includes($_USUA_GLOBAL[0].NIT)) {
        this.form.centrocostos_SAL401 = this.SAL401.NUMERACION.COSTO_NUM;
      }

      if ($_USUA_GLOBAL[0].NIT == 800037021 && this.FACTURACION[0].ARTICULO.substring(0, 2) == "HG") {
        if (this.FACTURACION[0].ARTICULO.slice(2, 4) == "OX") this.form.centrocostos_SAL401 = "39";
      }

      if (
        $_USUA_GLOBAL[0].NIT == 800037021 &&
        clasedeservicioMask_SAL401.value == 0 &&
        ["PO", "NP", "MQ", "MO"].includes(this.FACTURACION[0].ARTICULO.substring(0, 2))
      ) {
        this.form.centrocostos_SAL401 = "39";
      }
      
      if (
        $_USUA_GLOBAL[0].NIT == 800037021 &&
        clasedeservicioMask_SAL401.value == 4 &&
        ["HG", "93"].includes(this.FACTURACION[0].ARTICULO.substring(0, 2))
      ) {
        this.form.centrocostos_SAL401 = "39";
      }
      
      if (
        $_USUA_GLOBAL[0].NIT == 800037021 &&
        clasedeservicioMask_SAL401.value == 4 &&
        ["S3", "60", "81", "T3"].includes(this.FACTURACION[0].ARTICULO.substring(0, 2))
      ) {
        this.form.centrocostos_SAL401 = "41";
      }

      this._evaluarcosto_SAL401();
    },
    _evaluarcosto_SAL401() {
      validarInputs(
        {
          form: "#VALIDAR16_SAL401",
          orden: "1",
        },
        this._evaluarespecialidad_SAL401,
        () => {
          if (this.form.centrocostos_SAL401.trim() == "") {
            CON851("", "Digite un centro de costos", this._evaluarcosto_SAL401(), "error", "Error");
          } else {
            postData(
              {
                datosh: `${datosEnvio()}D|||||${this.form.codigodeservicio_SAL401.trim()}|||||||||${this.form.especialidad_SAL401.trim()}|${this.form.centrocostos_SAL401
                  .trim()
                  .padStart(4, "0")}|`,
              },
              get_url("APP/SALUD/SAL401.DLL")
            )
              .then((data) => {
                this.SAL401.COSTO = data;
                this.form.centroccostosd_SAL401 = data.NOMBRE;
                if ($_USUA_GLOBAL[0].NIT == 844003225 && this.form.centrocostos_SAL401.trim() == "0000") {
                  CON851("03", "03", this._evaluarcosto_SAL401(), "error", "Error");
                } else if (
                  ($_USUA_GLOBAL[0].NIT == 830092718 || $_USUA_GLOBAL[0].NIT == 830092719 || $_USUA_GLOBAL[0].NIT == 900193162) &&
                  this.form.centrocostos_SAL401.trim() == "HX"
                ) {
                  setTimeout(this._ventanacama_SAL401, 300);
                } else {
                  this.SAL401.CAMARX = "";
                  setTimeout(this._detalle_SAL401, 300);
                }
              })
              .catch((error) => {
                console.error(error);
                this._evaluarcosto_SAL401();
              });
          }
        }
      );
    },
    _ventanacama_SAL401() {
      this.SAL401.VENTANACAMA_SAL401 = "VENTANACAMA_SAL401";
      _ventanaalterna_SALUD(
        (data = {
          ID: this.SAL401.VENTANACAMA_SAL401,
          width: "col-md-4 col-sm-4 col-xs-12",
          titulo: "VENTANA DE CAMA",
          html: `
                <div class="form-group col-md-12 col-sm-12 col-xs-12" style="float: none; margin: 0 auto;">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                        <div class="inline-inputs">
                            <label class="col-md-8 col-sm-8 col-xs-8">Cama</label>
                            <div class="input-group col-md-4 col-sm-4 col-xs-4" id="VALIDAR1VENTANACAMA_SAL401">
                                <input id="cama_SAL401" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="4" data-orden="1">
                            </div>
                        </div>
                    </div>
                </div>
                `,
        })
      );
      _inputControl("disabled");
      this._evaluarcama_SAL401();
    },
    _evaluarcama_SAL401() {
      validarInputs(
        {
          form: "#VALIDAR1VENTANACAMA_SAL401",
          orden: "1",
        },
        () => {
          $(`#${this.SAL401.VENTANACAMA_SAL401}`).remove();
          this._evaluarcosto_SAL401();
        },
        () => {
          $(`#${this.SAL401.VENTANACAMA_SAL401}`).remove();
          this.SAL401.CAMARX = $("#cama_SAL401").val();
          this._detalle_SAL401();
        }
      );
    },
    _detalle_SAL401() {
      this.SAL401.VENTANADETALLE_SAL401 = "VENTANADETALLE_SAL401";
      _ventanaalterna_SALUD(
        (data = {
          ID: this.SAL401.VENTANADETALLE_SAL401,
          titulo: "VENTANA DETALLE Y AUTORIZACION",
          html: `
                <div class="form-group col-md-12 col-sm-12 col-xs-12" style="float: none; margin: 0 auto;">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                        <div class="inline-inputs">
                            <label class="col-md-2 col-sm-2 col-xs-2">DETALLE COMPROBANTE</label>
                            <div class="input-group col-md-10 col-sm-10 col-xs-10" id="VALIDAR1VENTANADETALLE_SAL401">
                                <input id="detallefactura_SAL401" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="300" data-orden="1">
                            </div>
                        </div>
                    </div>
                    <div class="salto-linea"></div>
                    <div class="col-md-6 col-sm-6 col-xs-6">
                        <div class="inline-inputs">
                            <label class="col-md-4 col-sm-4 col-xs-4">DETALLE COMPROBANTE</label>
                            <div class="input-group col-md-8 col-sm-8 col-xs-8" id="VALIDAR2VENTANADETALLE_SAL401">
                                <input id="detalle2_SAL401" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="50" data-orden="1">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-6 col-xs-6">
                        <div class="inline-inputs">
                            <label class="col-md-6 col-sm-6 col-xs-6">AUTORIZACION EPS</label>
                            <div class="input-group col-md-6 col-sm-6 col-xs-6" id="VALIDAR3VENTANADETALLE_SAL401">
                                <input id="autorizacion_SAL401" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="27" data-orden="1">
                            </div>
                        </div>
                    </div>
                </div>
                `,
        })
      );
      _inputControl("disabled");
      this._evaluardetalle_SAL401();
    },
    _evaluardetalle_SAL401() {
      if (this.SAL401.OPCIONACTIVA == '09426') {
        document.getElementById("detallefactura_SAL401").value = this.SAL401.COMPROBANTE.DETALLE_FACT;
        document.getElementById("autorizacion_SAL401").value = this.SAL401.COMPROBANTE.NRO_AUTOR_ELAB;
      }
      validarInputs(
        {
          form: "#VALIDAR1VENTANADETALLE_SAL401",
          orden: "1",
        },
        () => {
          $(`#${this.SAL401.VENTANADETALLE_SAL401}`).remove();
          this._evaluarcosto_SAL401();
        },
        () => {
          this.SAL401.DETALLE = $("#detallefactura_SAL401").val().trim();
          if ($_USUA_GLOBAL[0].NIT == 800251482) {
            return this._evaluardetalle2_SAL401();
          }
          this.SAL401.RECIBIDORX = "";
          this._aceptarautorizacion_SAL401();
        }
      );
    },
    _evaluardetalle2_SAL401() {
      validarInputs(
        {
          form: "#VALIDAR2VENTANACAMA_SAL401",
          orden: "1",
        },
        this._evaluardetalle_SAL401,
        () => {
          this.SAL401.RECIBIDORX = $("#detalle2_SAL401").val();
          this._aceptarautorizacion_SAL401();
        }
      );
    },
    _aceptarautorizacion_SAL401() {
      if ($_USUA_GLOBAL[0].NIT != 800162035 && this.SAL401.NUMERACION.FACTCAPIT_NUM.substring(1, 7) > 0) {
        this.SAL401.NROAUTOR = "";
        if (
          $_USUA_GLOBAL[0].NIT == 830512772 ||
          $_USUA_GLOBAL[0].NIT == 844002258 ||
          $_USUA_GLOBAL[0].NIT == 900565371 ||
          $_USUA_GLOBAL[0].NIT == 900471031 ||
          $_USUA_GLOBAL[0].NIT == 901120152
        ) {
          return this._aceptarautorizacion2_SAL401();
        }
        $(`#${this.SAL401.VENTANADETALLE_SAL401}`).remove();
        return this._datodiagnostico_SAL401();
      }
      this._aceptarautorizacion2_SAL401();
    },
    _aceptarautorizacion2_SAL401() {
      if (
        prefijofacturaMask_SAL401.value != "C" &&
        prefijofacturaMask_SAL401.value != "E" &&
        prefijofacturaMask_SAL401.value != "Ñ" &&
        prefijofacturaMask_SAL401.value != "T" &&
        prefijofacturaMask_SAL401.value != "V" &&
        prefijofacturaMask_SAL401.value != "W" &&
        prefijofacturaMask_SAL401.value != "X" &&
        prefijofacturaMask_SAL401.value != "Y" &&
        prefijofacturaMask_SAL401.value != "Z"
      ) {
        $("#autorizacion_SAL401").val(this.SAL401.NUMERACION.NROAUTORI_NUM);
      }
      this._evaluarautorizacion_SAL401();
    },
    _evaluarautorizacion_SAL401() {
      validarInputs(
        {
          form: "#VALIDAR3VENTANADETALLE_SAL401",
          orden: "1",
        },
        this._evaluardetalle_SAL401,
        () => {
          this.SAL401.NROAUTOR = $("#autorizacion_SAL401").val().trim();
          if (
            $_USUA_GLOBAL[0].NIT != 900405505 &&
            $_USUA_GLOBAL[0].NIT != 900005594 &&
            $_USUA_GLOBAL[0].NIT != 19233740 &&
            this.SAL401.NROAUTOR.trim() == "" &&
            clienteMask_SAL401.value.replace(/,/g, "") == 9999 &&
            this.form.unidaddeservicio_SAL401.substring(0, 2) == "02"
          ) {
            if (
              clasedeservicioMask_SAL401.value == "5" &&
              (this.SAL401.CLIENTE.ACT == "55" ||
                this.SAL401.CLIENTE.ACT == "21" ||
                this.SAL401.CLIENTE.ACT == "22" ||
                this.SAL401.CLIENTE.ACT == "23")
            ) {
              return this._evaluarautorizacion_SAL401();
            }
            return this._evaluarautorizacion2_SAL401();
          }
          this._evaluarautorizacion2_SAL401();
        }
      );
    },
    _evaluarautorizacion2_SAL401() {
      if (
        this.SAL401.NROAUTOR.trim() == "" &&
        ($_USUA_GLOBAL[0].NIT == 830092718 || $_USUA_GLOBAL[0].NIT == 900193162)
      ) {
        CON851("02", "02", null, "error", "Error");
        return this._evaluarautorizacion_SAL401();
      }
      if (this.SAL401.NROAUTOR.trim() != "") {
        console.error("REALIZAR SER836AC VERIFICA OTROS NUMEROS DE AUTORIZACION EN OTROS COMPROBANTES");
        $(`#${this.SAL401.VENTANADETALLE_SAL401}`).remove();
        return this._datodiagnostico_SAL401();
      }
      $(`#${this.SAL401.VENTANADETALLE_SAL401}`).remove();
      this._datodiagnostico_SAL401();
    },
    _datodiagnostico_SAL401() {
      if (
        this.SAL401.NUMERACION.CTRLXDIAG_NUM == "N" &&
        (this.SAL401.NUMERACION.NIT_NUM == 890102044 || this.SAL401.NUMERACION.NIT_NUM == 102044)
      ) {
        this.SAL401.NUMERACION.CTRLXDIAG_NUM = "S";
      }
      if (
        ($_USUA_GLOBAL[0].NIT == 830512772 ||
          $_USUA_GLOBAL[0].NIT == 900264583 ||
          $_USUA_GLOBAL[0].NIT == 800037021 ||
          $_USUA_GLOBAL[0].NIT == 900541158) &&
        this.SAL401.NUMERACION.CTRLXDIAG_NUM == "S" &&
        (this.form.unidaddeservicio_SAL401.substring(0, 2) == "02" ||
          this.form.unidaddeservicio_SAL401.substring(0, 2) == "08")
      ) {
        return this._ventanadiagnosticos_SAL401();
      }
      this._datopaqintegral_SAL401();
    },
    _ventanadiagnosticos_SAL401() {
      console.error("FALTA AGREGAR F8");
      $_this = this;
      var ventanadetalle = bootbox.dialog({
        size: "medium",
        title: "DIAGNOSTICOS",
        closeButton: false,
        message:
          '<div class="row" style="display:float!important">' +
          '<div class="col-md-12 col-sm-12 col-xs-12"' +
          '<div class="inline-inputs">' +
          '<label class="col-md-4 col-sm-4 col-xs-4">DIAGNOSTICO 1:</label>' +
          '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="VALIDAR1VENTANADIAGNOSTICO_SAL401">' +
          '<input id="diagnostico1_SAL401" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="3" data-orden="1">' +
          "</div>" +
          "</div>" +
          '<div class="salto-linea"></div>' +
          '<div class="col-md-12 col-sm-12 col-xs-12"' +
          '<div class="inline-inputs">' +
          '<label class="col-md-4 col-sm-4 col-xs-4">DIAGNOSTICO 2:</label>' +
          '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="VALIDAR2VENTANADIAGNOSTICO_SAL401">' +
          '<input id="diagnostico2_SAL401" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="3" data-orden="1">' +
          "</div>" +
          "</div>" +
          '<div class="salto-linea"></div>' +
          '<div class="col-md-12 col-sm-12 col-xs-12"' +
          '<div class="inline-inputs">' +
          '<label class="col-md-4 col-sm-4 col-xs-4">DIAGNOSTICO 3:</label>' +
          '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="VALIDAR3VENTANADIAGNOSTICO_SAL401">' +
          '<input id="diagnostico3_SAL401" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="3" data-orden="1">' +
          "</div>" +
          "</div>" +
          "</div>",
        buttons: {
          aceptar: {
            label: "Aceptar",
            callback: function () {
              ventanadetalle.off("shown.bs.modal");
              setTimeout($_this._datopaqintegral_SAL401, 300);
            },
            className: "btn-primary",
          },
          cancelar: {
            label: "Cancelar",
            callback: function () {
              ventanadetalle.off("shown.bs.modal");
              $_this._evaluarespecialidad_SAL401();
            },
            className: "btn-danger",
          },
        },
      });
      ventanadetalle.init($(".modal-footer").hide());
      ventanadetalle.on("shown.bs.modal", function () {
        $("#diagnostico1_SAL401").focus();
      });
      this._evaluardiagnostico1_SAL401();
    },
    _evaluardiagnostico1_SAL401() {
      _inputControl("disabled");
      validarInputs(
        {
          form: "#VALIDAR1VENTANADIAGNOSTICO_SAL401",
          orden: "1",
        },
        () => {
          $(".btn-danger").click();
        },
        () => {
          postData(
            { datosh: `${datosEnvio()}E|||||||||||2${$("#diagnostico1_SAL401").val().trim()}||||` },
            get_url("APP/SALUD/SAL401.DLL")
          )
            .then((data) => {
              this._evaluardiagnostico2_SAL401();
            })
            .catch((error) => {
              console.error(error);
              this._evaluardiagnostico1_SAL401();
            });
        }
      );
    },
    _evaluardiagnostico2_SAL401() {
      validarInputs(
        {
          form: "#VALIDAR2VENTANADIAGNOSTICO_SAL401",
          orden: "1",
        },
        () => {
          $(".btn-danger").click();
        },
        () => {
          postData(
            { datosh: `${datosEnvio()}E|||||||||||2${$("#diagnostico2_SAL401").val().trim()}||||` },
            get_url("APP/SALUD/SAL401.DLL")
          )
            .then((data) => {
              this._evaluardiagnostico3_SAL401();
              $(".btn-primary").click();
            })
            .catch((error) => {
              console.error(error);
              this._evaluardiagnostico2_SAL401();
            });
        }
      );
    },
    _evaluardiagnostico3_SAL401() {
      validarInputs(
        {
          form: "#VALIDAR3VENTANADIAGNOSTICO_SAL401",
          orden: "1",
        },
        () => {
          $(".btn-danger").click();
        },
        () => {
          postData(
            { datosh: `${datosEnvio()}E|||||||||||2${$("#diagnostico3_SAL401").val().trim()}||||` },
            get_url("APP/SALUD/SAL401.DLL")
          )
            .then((data) => {
              this._evaluardiagnostico2_SAL401();
            })
            .catch((error) => {
              console.error(error);
              this._evaluardiagnostico3_SAL401();
            });
        }
      );
    },
    _datopaqintegral_SAL401() {
      if (
        clasedeservicioMask_SAL401.value == "4" &&
        (this.FACTURACION[0].ARTICULO.trim() == "XXDIFT" || this.FACTURACION[0].ARTICULO.trim() == "XXDTOPA")
      ) {
        $_this = this;
        var ventanadetalle = bootbox.dialog({
          size: "small",
          title: "DATO PAQ INTEGRAL",
          closeButton: false,
          message:
            '<div class="row" style="display:float!important">' +
            '<div class="col-md-12 col-sm-12 col-xs-12"' +
            '<div class="inline-inputs">' +
            '<label class="col-md-4 col-sm-4 col-xs-4">CUP CIRUGIA PAQ :</label>' +
            '<div class="input-group col-md-8 col-sm-8 col-xs-8" id="VALIDAR1VENTANAPAQINTEGRAL_SAL401">' +
            '<input id="cupcirugia_SAL401" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="8" data-orden="1">' +
            "</div>" +
            "</div>" +
            "</div>",
          buttons: {
            aceptar: {
              label: "Aceptar",
              callback: function () {
                ventanadetalle.off("shown.bs.modal");
                $_this.SAL401.CAUSA = "";
                if (
                  $_USUA_GLOBAL[0].NIT == 830092718 ||
                  $_USUA_GLOBAL[0].NIT == 830092719 ||
                  $_USUA_GLOBAL[0].NIT == 900193162
                ) {
                  $_this.SAL401.PASOW = 0;
                  if (clienteMask_SAL401.unmaskedValue == 860011153) {
                    $_this._aceptarcausa_SAL401();
                  } else {
                    setTimeout($_this._ventanadiagnosticos_SAL401, 300);
                  }
                } else {
                  setTimeout($_this._validarventanafechaestancia_SAL401, 300);
                }
              },
              className: "btn-primary",
            },
            cancelar: {
              label: "Cancelar",
              callback: function () {
                ventanadetalle.off("shown.bs.modal");
                $_this._evaluarespecialidad_SAL401();
              },
              className: "btn-danger",
            },
          },
        });
        ventanadetalle.init($(".modal-footer").hide());
        ventanadetalle.on("shown.bs.modal", function () {
          $("#cupcirugia_SAL401").focus();
        });
        this._evaluarpaqintegral_SAL401();
      } else {
        if (this.SAL401.OPCIONACTIVA == "09421") {
          this.SAL401.CAUSA = "";
          this.SAL401.FECHAACCIDRIPS = "";
          this.SAL401.CODDIAGESTAD = "";
          this.SAL401.EMPRESAPACIRIPS = "";
        }
        if (
          $_USUA_GLOBAL[0].NIT == 830092718 ||
          $_USUA_GLOBAL[0].NIT == 830092719 ||
          $_USUA_GLOBAL[0].NIT == 900193162
        ) {
          $_this.SAL401.PASOW = 0;
          if (clienteMask_SAL401.unmaskedValue == 860011153) {
            this._aceptarcausa_SAL401();
          } else {
            setTimeout(this._ventanadiagnosticos_SAL401, 300);
          }
        } else {
          setTimeout(this._validarventanafechaestancia_SAL401, 300);
        }
      }
    },
    _evaluarpaqintegral_SAL401() {
      validarInputs(
        {
          form: "#VALIDAR1VENTANAPAQINTEGRAL_SAL401",
          orden: "1",
        },
        () => {
          $(".btn-danger").click();
        },
        () => {
          postData(
            { datosh: `${datosEnvio()}E|||||||||||2${$("#cupcirugia_SAL401").val().trim()}||||` },
            get_url("APP/SALUD/SAL401.DLL")
          )
            .then((data) => {
              this.SAL401.CUPPAQINT = $("#cupcirugia_SAL401").val().trim();
              $(".btn-primary").click();
            })
            .catch((error) => {
              console.error(error);
              this._evaluarpaqintegral_SAL401();
            });
        }
      );
    },
    _validarventanafechaestancia_SAL401() {
      if (this.SAL401.OPCIONACTIVA == "09421") {
        this.SAL401.FECHASALESTAD = "";
        this.SAL401.HORASALESTAD = "";
      }
      if (
        $_USUA_GLOBAL[0].NIT == 892000401 ||
        $_USUA_GLOBAL[0].NIT == 900541158 ||
        $_USUA_GLOBAL[0].NIT == 900566047 ||
        $_USUA_GLOBAL[0].NIT == 900658867 ||
        $_USUA_GLOBAL[0].NIT == 900565371 ||
        $_USUA_GLOBAL[0].NIT == 901120152
      ) {
        if (this.SAL401.OPCIONACTIVA == "09421") {
          this.SAL401.FECHASALESTAD = "";
          this.SAL401.HORAATENESTAD = "";
        }
        this._datomedico_SAL401();
      } else if (
        this.FACTURACION[0].ARTICULO.substring(0, 2) == "S1" ||
        this.FACTURACION[0].ARTICULO.substring(0, 2) == "FS" ||
        this.FACTURACION[0].ARTICULO.substring(0, 2) == "F8" ||
        this.FACTURACION[0].ARTICULO.substring(0, 2) == "10" ||
        this.FACTURACION[0].ARTICULO.substring(0, 2) == "11" ||
        this.FACTURACION[0].ARTICULO.substring(0, 2) == "12"
      ) {
        setTimeout(this._ventanaestancia_SAL401);
      } else {
        if (this.SAL401.OPCIONACTIVA == "09421") {
          this.SAL401.FECHASALESTAD = "";
          this.SAL401.HORAATENESTAD = "";
        }
        this._datomedico_SAL401();
      }
    },
    _ventanaestancia_SAL401() {
      $_this = this;
      var ventanafechaestancia = bootbox.dialog({
        size: "large",
        onEscape: false,
        title: "FECHA DE ESTANCIA",
        message:
          '<div class="row"> ' +
          '<div class="col-md-12"> ' +
          '<div class="form-group"> ' +
          '<label class="col-md-4 control-label">' +
          "FECHA DE INGRESO" +
          "</label> " +
          '<div class="col-md-6" id="VALIDARVENTANA1ESTANCIA_SAL401"> ' +
          '<input id="fechaingreso_SAL401" type="text" class="form-control input-md" data-orden="1" maxlength="16"> ' +
          '<span class="help-block">' +
          "YYYY-MM-DD HH:mm" +
          "</span> " +
          "</div> " +
          "</div> " +
          "</div>" +
          '<div class="col-md-12"> ' +
          '<div class="form-group"> ' +
          '<label class="col-md-4 control-label">' +
          "FECHA DE ESTANCIA" +
          "</label> " +
          '<div class="col-md-6" id="VALIDARVENTANA2ESTANCIA_SAL401"> ' +
          '<input id="fechaestancia_SAL401" type="text" class="form-control input-md" data-orden="1" maxlength="16"> ' +
          '<span class="help-block">' +
          "YYYY-MM-DD HH:mm" +
          "</span> " +
          "</div> " +
          "</div> " +
          "</div>" +
          "</div>",
        buttons: {
          confirm: {
            label: "Aceptar",
            className: "btn-primary",
            callback: function () {
              ventanafechaestancia.off("show.bs.modal");
              $_this.SAL401.FECHAINGESTAD = $("#fechaingreso_SAL401").val().trim().replace(/-/g, "").substring(0, 8);
              $_this.SAL401.HORAATENESTAD = $("#fechaingreso_SAL401")
                .val()
                .trim()
                .replace(/-/g, "")
                .replace(/:/g, "")
                .substring(9, 13);
              $_this.SAL401.FECHASALESTAD = $("#fechaestancia_SAL401").val().trim().replace(/-/g, "").substring(0, 8);
              $_this.SAL401.HORASALESTAD = $("#fechaestancia_SAL401")
                .val()
                .trim()
                .replace(/-/g, "")
                .replace(/:/g, "")
                .substring(9, 13);
              $_this._datomedico_SAL401();
            },
          },
          cancelar: {
            label: "Cancelar",
            className: "btn-danger",
            callback: function () {
              ventanafechaestancia.off("show.bs.modal");
              $_this._evaluarespecialidad_SAL401();
            },
          },
        },
      });
      ventanafechaestancia.init($(".modal-footer").hide());
      ventanafechaestancia.on("shown.bs.modal", function () {
        $("#fechaingreso_SAL401").focus();
      });
      this._evaluarfechaingreso_SAL401();
    },
    _evaluarfechaingreso_SAL401() {
      _inputControl("disabled");
      var fechainregsoMask_SAL401 = IMask($("#fechaingreso_SAL401")[0], {
        mask: Date,
        pattern: "Y-M-d H:m",
        lazy: true,
        blocks: {
          Y: { mask: IMask.MaskedRange, placeholderChar: "Y", from: "1980", to: moment().format("YYYY"), maxLength: 4 },
          M: { mask: IMask.MaskedRange, placeholderChar: "m", from: "01", to: "12", maxLength: 2 },
          d: { mask: IMask.MaskedRange, placeholderChar: "d", from: "01", to: "31", maxLength: 2 },
          H: { mask: IMask.MaskedRange, placeholderChar: "d", from: "00", to: "23", maxLength: 2 },
          m: { mask: IMask.MaskedRange, placeholderChar: "d", from: "00", to: "59", maxLength: 2 },
        },
        format: function (date) {
          return moment(date).format("YYYY-MM-DD HH:mm");
        },
        parse: function (str) {
          var fecha = moment(str).format("YYYY-MM-DD HH:mm");
          return str;
        },
      });
      if (this.SAL401.COMPROBANTE) {
        fechainregsoMask_SAL401.typedValue = `${this.SAL401.COMPROBANTE.FECHAING_NUM} ${this.SAL401.COMPROBANTE.HORA_ESTAD}`;
      }
      validarInputs(
        {
          form: "#VALIDARVENTANA1ESTANCIA_SAL401",
          orden: "1",
        },
        () => {
          $(".btn-danger").click();
        },
        () => {
          if (fechainregsoMask_SAL401.value.trim().length > 15) {
            this._evaluarfechaestancia_SAL401();
          } else {
            CON851(
              "",
              "El formato de la fecha no esta completo recuerde que debe ser AÑO/MES/DIA HORA/MINUTO",
              this._evaluarfechaingreso_SAL401(),
              "error",
              "Error"
            );
          }
        }
      );
    },
    _evaluarfechaestancia_SAL401() {
      var fechaestanciaMask_SAL401 = IMask($("#fechaestancia_SAL401")[0], {
        mask: Date,
        pattern: "Y-M-d H:m",
        lazy: true,
        blocks: {
          Y: { mask: IMask.MaskedRange, placeholderChar: "Y", from: "1980", to: moment().format("YYYY"), maxLength: 4 },
          M: { mask: IMask.MaskedRange, placeholderChar: "m", from: "01", to: "12", maxLength: 2 },
          d: { mask: IMask.MaskedRange, placeholderChar: "d", from: "01", to: "31", maxLength: 2 },
          H: { mask: IMask.MaskedRange, placeholderChar: "d", from: "00", to: "23", maxLength: 2 },
          m: { mask: IMask.MaskedRange, placeholderChar: "d", from: "00", to: "59", maxLength: 2 },
        },
        format: function (date) {
          return moment(date).format("YYYY-MM-DD HH:mm");
        },
        parse: function (str) {
          var fecha = moment(str).format("YYYY-MM-DD HH:mm");
          return str;
        },
      });
      if (this.SAL401.COMPROBANTE) {
        fechaestanciaMask_SAL401.typedValue = `${this.SAL401.COMPROBANTE.FECHA_SAL_ESTAD} ${this.SAL401.COMPROBANTE.HORA_SALID}`;
      }
      validarInputs(
        {
          form: "#VALIDARVENTANA2ESTANCIA_SAL401",
          orden: "1",
        },
        () => {
          $(".btn-danger").click();
        },
        () => {
          if (fechaestanciaMask_SAL401.value.trim().length > 15) {
            $(".btn-primary").click();
          } else {
            CON851(
              "",
              "El formato de la fecha no esta completo recuerde que debe ser AÑO/MES/DIA HORA/MINUTO",
              this._evaluarfechaestancia_SAL401(),
              "error",
              "Error"
            );
          }
        }
      );
    },
    _aceptarcausa_SAL401() {
      setTimeout(() => {
        SER828(
          this._evaluarSER828_SAL401,
          () => {
            setTimeout(this._detalle_SAL401, 300);
          },
          0
        );
      }, 300);
    },
    _evaluarSER828_SAL401(data) {
      this.SAL401.CAUSA = data.COD;
      setTimeout(this._ventanaacctransito_SAL401, 300);
    },
    _ventanaacctransito_SAL401() {
      $_this = this;
      var ventanaacctransito = bootbox.dialog({
        size: "large",
        onEscape: false,
        title: "FECHA DE ESTANCIA",
        message:
          '<div class="row"> ' +
          '<div class="col-md-12"> ' +
          '<div class="form-group"> ' +
          '<label class="col-md-4 control-label">' +
          "FECHA DEL EVENTO" +
          "</label> " +
          '<div class="col-md-6" id="VALIDARVENTANA1TRANSITO_SAL401"> ' +
          '<input id="fechaevento_SAL401" type="text" class="form-control input-md" data-orden="1" maxlength="16"> ' +
          '<span class="help-block">' +
          "YYYY-MM-DD" +
          "</span> " +
          "</div> " +
          "</div> " +
          "</div>" +
          '<div class="col-md-12"> ' +
          '<div class="form-group"> ' +
          '<label class="col-md-4 control-label">' +
          "DIAGNOSTICO" +
          "</label> " +
          '<div class="col-md-6" id="VALIDARVENTANA2TRANSITO_SAL401"> ' +
          '<input id="diagnosticoevento_SAL401" type="text" class="form-control input-md" data-orden="1" maxlength="3"> ' +
          "</div> " +
          "</div> " +
          "</div>" +
          '<div class="col-md-12"> ' +
          '<div class="form-group"> ' +
          '<label class="col-md-4 control-label">' +
          "NIT EMPRESA" +
          "</label> " +
          '<div class="col-md-6" id="VALIDARVENTANA3TRANSITO_SAL401"> ' +
          '<input id="empresaevento_SAL401" type="text" class="form-control input-md" data-orden="1" maxlength="50"> ' +
          "</div> " +
          "</div> " +
          "</div>" +
          "</div>",
        buttons: {
          confirm: {
            label: "Aceptar",
            className: "btn-primary",
            callback: function () {
              ventanaacctransito.off("show.bs.modal");
              $_this._datomedico_SAL401();
            },
          },
          cancelar: {
            label: "Cancelar",
            className: "btn-danger",
            callback: function () {
              ventanaacctransito.off("show.bs.modal");
              setTimeout($_this._detalle_SAL401, 300);
            },
          },
        },
      });
      ventanaacctransito.init($(".modal-footer").hide());
      ventanaacctransito.on("shown.bs.modal", function () {
        $("#fechaevento_SAL401").focus();
      });
      this._evaluarfechaevento_SAL401();
    },
    _evaluarfechaevento_SAL401() {
      var fechaeventoMask_SAL401 = IMask($("#fechaevento_SAL401")[0], {
        mask: Date,
        pattern: "Y-M-d",
        lazy: true,
        blocks: {
          Y: { mask: IMask.MaskedRange, placeholderChar: "Y", from: "1980", to: "2030", maxLength: 4 },
          M: { mask: IMask.MaskedRange, placeholderChar: "m", from: "01", to: "12", maxLength: 2 },
          d: { mask: IMask.MaskedRange, placeholderChar: "d", from: "01", to: "31", maxLength: 2 },
        },
        format: function (date) {
          return moment(date).format("YYYY-MM-DD HH:mm");
        },
        parse: function (str) {
          var fecha = moment(str).format("YYYY-MM-DD HH:mm");
          return str;
        },
      });
      validarInputs(
        {
          form: "#VALIDARVENTANA1ESTANCIA_SAL401",
          orden: "1",
        },
        () => {
          $(".btn-danger").click();
        },
        () => {
          if (fechaeventoMask_SAL401.value.trim().length > 10) {
            this.SAL401.FECHAACCIDRIPS = fechaeventoMask_SAL401.unmaskedValue;
            this._evaluardiagnosticoevento_SAL401();
          } else {
            CON851(
              "",
              "El formato de la fecha no esta completo recuerde que debe ser AÑO/MES/DIA HORA/MINUTO",
              this._evaluarfechaevento_SAL401(),
              "error",
              "Error"
            );
          }
        }
      );
    },
    _evaluardiagnosticoevento_SAL401() {
      validarInputs(
        {
          form: "#VALIDARVENTANA2ESTANCIA_SAL401",
          orden: "1",
        },
        this._evaluarfechaevento_SAL401,
        () => {
          postData(
            { datosh: `${datosEnvio()}E||||||||||| ${$("#diagnosticoevento_SAL401").val().trim()}||||` },
            get_url("APP/SALUD/SAL401.DLL")
          )
            .then((data) => {
              this.SAL401.CODDIAGESTAD = $("#diagnosticoevento_SAL401").val().trim();
              this._evaluarempresa_SAL401();
            })
            .catch((error) => {
              console.error(error);
              this._evaluardiagnosticoevento_SAL401();
            });
        }
      );
    },
    _evaluarempresa_SAL401() {
      validarInputs(
        {
          form: "#VALIDARVENTANA3ESTANCIA_SAL401",
          orden: "1",
        },
        this._evaluardiagnosticoevento_SAL401,
        () => {
          this.SAL401.EMPRESAPACIRIPS = $("#empresaevento_SAL401").val();
          $(".btn-primary").click();
        }
      );
    },
    _datomedico_SAL401() {
      validarInputs(
        {
          form: "#VALIDAR17_SAL401",
          orden: "1",
        },
        this._evaluarcosto_SAL401,
        () => {
          if (
            (atendidoMask_SAL401.value.trim() == "" && clasedeservicioMask_SAL401.value > 1) ||
            (atendidoMask_SAL401.value == 0 && clasedeservicioMask_SAL401.value > 1) ||
            atendidoMask_SAL401.value.trim() == ""
          ) {
            CON851("", "Digite un medico", this._datomedico_SAL401(), "error", "Error");
          } else {
            if (atendidoMask_SAL401.value.trim() == "" || atendidoMask_SAL401.value == 0) {
              this.SAL401.PROFESIONAL.TABLA_CL = ["S", "S"];
              this.SAL401.PROFESIONAL.TABLA_ESP = [""];
              this.SAL401.PROFESIONAL.ESTADO = "1";
              this.SAL401.ATIENDEW = "0";
              this.SAL401.PERSONALELAB = "0";
              this._validarcitas_SAL401();
            } else {
              postData(
                {
                  datosh: `${datosEnvio()}5||||${atendidoMask_SAL401.unmaskedValue
                    .trim()
                    .padStart(10, "0")}|||||||||||`,
                },
                get_url("APP/SALUD/SAL401.DLL")
              )
                .then((data) => {
                  console.log(data);
                  this.form.atendidod_SAL401 = data.DESCRIPCION;
                  this.SAL401.PROFESIONAL = data;
                  this.SAL401.PERSONALELAB = data.ATIENDE;
                  let j = {
                    0: "1",
                    1: "2",
                    2: "3",
                    3: "4",
                    4: "5",
                    5: "6",
                    6: "2",
                    7: "7",
                  };
                  if (data.ESTADO == "2") {
                    CON851("13", "13", this._datomedico_SAL401(), "error", "Error");
                  } else if (data.TABLA_CL[j[clasedeservicioMask_SAL401.value]] == "N") {
                    CON851("82", "82", this._datomedico_SAL401(), "error", "Error");
                  } else if (
                    data.TABLA_ESP[0].ESP.trim() == "" ||
                    this.FACTURACION[0].ARTICULO.substring(0, 1) == "87" ||
                    this.FACTURACION[0].ARTICULO.substring(0, 1) == "88" ||
                    this.FACTURACION[0].ARTICULO.substring(0, 1) == "90" ||
                    this.FACTURACION[0].ARTICULO.substring(0, 1) == "95"
                  ) {
                    this._validandomedico_SAL401();
                  } else if (
                    this.form.especialidad_SAL401 == data.TABLA_ESP[0].ESP ||
                    this.form.especialidad_SAL401 == data.TABLA_ESP[1].ESP ||
                    this.form.especialidad_SAL401 == data.TABLA_ESP[2].ESP ||
                    this.form.especialidad_SAL401 == data.TABLA_ESP[3].ESP ||
                    this.form.especialidad_SAL401 == data.TABLA_ESP[4].ESP
                  ) {
                    this._validandomedico_SAL401();
                  } else {
                    if ($_USUA_GLOBAL[0].NIT == 830092718 && this.form.sucursal_SAL401 == "SC") {
                      this._validandomedico_SAL401();
                    } else {
                      CON851("82", "82", null, "error", "Error");
                      if ($_USUA_GLOBAL[0].NIT == 892000401 && data.TABLA_ESP[0].CL == 999) {
                        this._validandomedico_SAL401();
                      } else {
                        this._datomedico_SAL401();
                      }
                    }
                  }
                })
                .catch((error) => {
                  console.error(error);
                  this._datomedico_SAL401();
                });
            }
          }
        }
      );
    },
    _validandomedico_SAL401() {
      if (this.SAL401.PROFESIONAL.DIV.trim() == "") {
        this._validarcitas_SAL401();
      } else {
        postData(
          {
            datosh: `${datosEnvio()}F||||||${this.FACTURACION[0].ARTICULO.trim().padEnd(
              15,
              " "
            )}|${idhistoriafactMask_SAL401.unmaskedValue.trim().padStart(15, "0")}|${
              this.SAL401.PACIENTE.EDAD.unid_edad
            }|${prefijofacturaMask_SAL401.value}${numerofacturaMask_SAL401.value.trim().padStart(6, "0")}|${
              this.SAL401.CODTABW
            }${this.SAL401.TIPOTABW}|`,
          },
          get_url("APP/SALUD/SAL401.DLL")
        )
          .then((data) => {
            if (
              this.SAL401.PROFESIONAL.DIV == data.DIVISION.trim().padStart(2, "0") ||
              this.SAL401.PROFESIONAL.DIV == data.DIV2.trim().padStart(2, "0")
            ) {
              this._validarcitas_SAL401();
            } else {
              if ($_USUA_GLOBAL[0].NIT == 830092718 && this.form.sucursal_SAL401 == "SC") {
                this._validarcitas_SAL401();
              } else {
                CON851("82", "82", null, "error", "Error");
                this._datomedico_SAL401();
              }
            }
          })
          .catch((error) => {
            console.error(error);
            this._datomedico_SAL401();
          });
      }
    },
    _validarcitas_SAL401() {
      this._evaluardatoremite_SAL401();
      console.error("CORREGIR DLL");
      // postData( { datosh: `${datosEnvio()}F||||||${this.FACTURACION[0].ARTICULO.trim().padEnd(15,' ')}||` },
      // get_url("APP/SALUD/SER891AD.DLL"))
      // .then(data => {
      //     // NO FUNCIONA POR EVALUACION = 0
      // })
      // .catch(error => {
      //     console.error(error);
      //     this._datomedico_SAL401();
      // });
    },
    _evaluardatoremite_SAL401() {
      validarInputs(
        {
          form: "#VALIDAR18_SAL401",
          orden: "1",
        },
        this._datomedico_SAL401,
        () => {
          if (solicitanteMask_SAL401.value.trim() == "" || solicitanteMask_SAL401.value.trim() == 0) {
            if (
              clasedeservicioMask_SAL401.value == "0" ||
              clasedeservicioMask_SAL401.value == "2" ||
              clasedeservicioMask_SAL401.value == "3"
            ) {
              CON851("02", "02", this._evaluardatoremite_SAL401(), "error", "Error");
            } else {
              if (clasedeservicioMask_SAL401.value == "7" && this.FACTURACION[0].ARTICULO.substring(0, 2) == "90") {
                CON851("02", "02", this._evaluardatoremite_SAL401(), "error", "Error");
              } else {
                this._claseprocedimiento_SAL401();
              }
            }
          } else {
            postData(
              {
                datosh: `${datosEnvio()}3|${prefijofacturaMask_SAL401.value.trim()}${numerofacturaMask_SAL401.value
                  .trim()
                  .padStart(6, "0")}|${
                  this.SAL401.NUMERACION.CONVENIO_NUM
                }|${solicitanteMask_SAL401.unmaskedValue.padStart(10, "0")}|`,
              },
              get_url("APP/SALUD/SAL401.DLL")
            )
              .then((data) => {
                postData(
                  { datosh: `${datosEnvio()}5||||${solicitanteMask_SAL401.unmaskedValue.trim().padStart(10, "0")}|` },
                  get_url("APP/SALUD/SAL401.DLL")
                )
                  .then((data) => {
                    this.form.solicd_SAL401 = data.DESCRIPCION;
                    if (prefijofacturaMask_SAL401.value == "C" || prefijofacturaMask_SAL401.value == "E") {
                      setTimeout(() => {
                        SER822C((data = { seleccion: "1" }), this._evaluarcopagofact_SAL401, (data) => {
                          this.SAL401.TIPOPAGO = data.COD;
                          this._claseprocedimiento_SAL401();
                        });
                      }, 300);
                    } else {
                      this._claseprocedimiento_SAL401();
                    }
                  })
                  .catch((error) => {
                    console.error(error);
                    this._datomedico_SAL401();
                  });
              })
              .catch((error) => {
                console.error(error);
                this._datomedico_SAL401();
              });
          }
        }
      );
    },
    _claseprocedimiento_SAL401() {
      this.SAL401.EMBARESTAD = "";
      this.SAL401.FINALIDESTAD = "";
      if (this.SAL401.OPCIONACTIVA == "09421") {
        this.SAL401.ESPECREMI = "";
      }
      if (
        prefijofacturaMask_SAL401.value == "P" ||
        prefijofacturaMask_SAL401.value == "T" ||
        prefijofacturaMask_SAL401.value == "O" ||
        prefijofacturaMask_SAL401.value == "Q" ||
        prefijofacturaMask_SAL401.value == "R" ||
        prefijofacturaMask_SAL401.value == "S" ||
        prefijofacturaMask_SAL401.value == "U" ||
        prefijofacturaMask_SAL401.value == "V" ||
        prefijofacturaMask_SAL401.value == "W" ||
        prefijofacturaMask_SAL401.value == "X" ||
        prefijofacturaMask_SAL401.value == "Y" ||
        prefijofacturaMask_SAL401.value == "Z"
      ) {
        this.SAL401.CLASEPROC = "2";
      } else if (this.form.puertaingreso_SAL401.substring(0, 1) == "1") {
        this.SAL401.CLASEPROC = "3";
      } else {
        this.SAL401.CLASEPROC = "1";
      }
      let claseproceso = {
        0: "",
        1: "ATENCION AMBULATOR",
        2: "ATENCION HOSPITAL",
        3: "EN URGENCIA",
      };
      $("#CLASEPROCE_SAL401").removeClass("hidden");
      this.form.claseprocedimiento_SAL401 = `${this.SAL401.CLASEPROC} ${claseproceso[this.SAL401.CLASEPROC]}`;
      if (clasedeservicioMask_SAL401.value == "0") {
        this.SAL401.ARTICULO.DIAGN = "N";
        this.SAL401.TIPOPROC = "0";
        this._controlcapitacion_SAL401();
      } else if (
        ($_USUA_GLOBAL[0].NIT == 830092718 || $_USUA_GLOBAL[0].NIT == 830092718) &&
        $_USUA_GLOBAL[0].PREFIJ == "SB"
      ) {
        this._datoespecremite_SAL401();
      } else {
        this._datocondicion_SAL401();
      }
    },
    _datocondicion_SAL401() {
      if (this.SAL401.PACIENTE.SEXO == "M" || clasedeservicioMask_SAL401.value == "0") {
        this._evaluarSER826_SAL401((data = { COD: "4", DESCRIP: "NO APLICA ESTADO" }));
      } else {
        if (
          this.SAL401.PACIENTE.EDAD.unid_edad == "D" ||
          this.SAL401.PACIENTE.EDAD.unid_edad == "M" ||
          (this.SAL401.PACIENTE.EDAD.unid_edad == "A" && this.SAL401.PACIENTE.EDAD.vlr_edad < 10)
        ) {
          this._evaluarSER826_SAL401((data = { COD: "4", DESCRIP: "NO ESTA EMBARAZADA" }));
        } else {
          SER826(
            this._evaluarSER826_SAL401,
            () => {
              setTimeout(this._detalle_SAL401, 300);
            },
            "4"
          );
        }
      }
    },
    _evaluarSER826_SAL401(data) {
      console.log(data);
      this.SAL401.EMBARESTAD = data.COD;
      $("#EMBARAZO_SAL401").removeClass("hidden");
      this.form.embarestado_SAL401 = `${data.COD} ${data.DESCRIP}`;
      if (clasedeservicioMask_SAL401.value == "7") {
        setTimeout(this._tipoprocedimiento_SAL401, 300);
      } else {
        if ($_USUA_GLOBAL[0].NIT == 900005594 && clasedeservicioMask_SAL401.value == "5") {
          if (this.SAL401.ARTICULO.DIAGN == "S") {
            $("#TIPOPROCEDIMIENTO_SAL401").removeClass("hidden");
            this.form.tipoprocedimiento_SAL401 = "0";
            this.SAL401.TIPOPROC = "0";
            this._datofinalidadconsulta_SAL401();
          } else {
            setTimeout(this._tipoprocedimiento_SAL401, 300);
          }
        } else {
          if (this.SAL401.ARTICULO.DIAGN == "S") {
            $("#TIPOPROCEDIMIENTO_SAL401").removeClass("hidden");
            this.form.tipoprocedimiento_SAL401 = "0";
            this.SAL401.TIPOPROC = "0";
            this._datofinalidadconsulta_SAL401();
          } else {
            setTimeout(this._tipoprocedimiento_SAL401, 300);
          }
        }
      }
    },
    _tipoprocedimiento_SAL401() {
      let j = {
        2: "1",
        3: "1",
        4: "2",
        6: "1",
        7: "4",
      };
      let seleccion = j[clasedeservicioMask_SAL401.value];
      if (!seleccion) seleccion = "1";
      SER829(
        seleccion,
        () => {
          setTimeout(this._detalle_SAL401, 300);
        },
        this._evaluarSER829_SAL401
      );
    },
    _evaluarSER829_SAL401(data) {
      this.form.tipoprocedimiento_SAL401 = `${data.COD} ${data.DESCRIP}`;
      this.SAL401.TIPOPROC = data.COD;
      if (this.SAL401.ESPECIALIDAD.TIPOPROC.trim() == "" || this.SAL401.ESPECIALIDAD.TIPOPROC.trim() == 0) {
        this._datofinalidadconsulta_SAL401();
      } else if (this.SAL401.ESPECIALIDAD.TIPOPROC.trim() == data.COD.trim()) {
        CON851("5R", "5R", setTimeout(this._tipoprocedimiento_SAL401, 300), "error", "Error");
      } else {
        this._datofinalidadconsulta_SAL401();
      }
    },
    _datofinalidadconsulta_SAL401() {
      if ($_USUA_GLOBAL[0].NIT == 900005594) {
        if (clasedeservicioMask_SAL401.value == "5" || clasedeservicioMask_SAL401.value == "7") {
          this._obtenerfinalidades_SAL041();
        } else {
          this.SAL401.FINALIDESTAD = "10";
          $("#FINALIDADESTADO_SAL401").removeClass("hidden");
          this.form.finalidadestad_SAL401 = `10 - NO APLICA`;
          this._controlcapitacion_SAL401();
        }
      } else {
        if (clasedeservicioMask_SAL401.value == "7") {
          this._obtenerfinalidades_SAL041();
        } else {
          this.SAL401.FINALIDESTAD = "10";
          $("#FINALIDADESTADO_SAL401").removeClass("hidden");
          this.form.finalidadestad_SAL401 = `10 - NO APLICA`;
          this._controlcapitacion_SAL401();
        }
      }
    },
    _obtenerfinalidades_SAL041() {
      setTimeout(() => {
        this.SAL401.DATOSFINALIDAD = datos_finalidad(
          $_USUA_GLOBAL[0].NIT,
          this.SAL401.PACIENTE.SEXO,
          this.SAL401.PACIENTE.EDAD
        );
        this._popupfinalidad_SAL401();
      }, 300);
    },
    _popupfinalidad_SAL401() {
      POPUP(
        {
          array: this.SAL401.DATOSFINALIDAD,
          titulo: "DATOS FINALIDAD:",
          indices: [{ label: "descripcion" }],
          callback_f: this._evaluardatoremite_SAL401,
        },
        (data) => {
          console.log(data);
          this.SAL401.FINALIDESTAD = data.codigo;
          $("#FINALIDADESTADO_SAL401").removeClass("hidden");
          this.form.finalidadestad_SAL401 = `${data.codigo} ${data.descripcion}`;
          if (
            $_USUA_GLOBAL[0].NIT == 900306771 &&
            this.FACTURACION[0].ARTICULO.trim().substring(0, 2) == "89" &&
            this.SAL401.FINALIDESTAD != this.SAL401.FINALIDESTAD
          ) {
            CON851("8E", "8E", null, "warning", "Advertencia!");
          }
          if (
            ($_USUA_GLOBAL[0].NIT == 845000038 || $_USUA_GLOBAL[0].NIT == 900405505) &&
            this.SAL401.FINALIDESTAD == "10"
          ) {
            CON851("4K", "4K", null, "error", "Error");
          }
          // if (this.SAL401.ESPECIALIDAD.FINALID.trim() != '' && this.SAL401.ESPECIALIDAD.FINALID.trim() != '0' && this.SAL401.ESPECIALIDAD.FINALID.trim() != '10' && this.SAL401.ESPECIALIDAD.FINALID.trim() != this.SAL401.FINALIDESTAD.trim()) {
          // CON851('3D', '3D', this._obtenerfinalidades_SAL041(), 'error', 'Error');
          // } else {
          this._datocronico_SAL401();
          // }
        }
      );
    },
    _datocronico_SAL401() {
      if (this.SAL401.FINALIDESTAD == "11") {
        $("#CRONICO_SAL401").removeClass("hidden");
        validarInputs(
          {
            form: "#CRONICO_41",
            orden: "1",
          },
          this._obtenerfinalidades_SAL041,
          () => {
            if (this.form.cronico_SAL401.trim() == "") {
              this.SAL401.CRONICO = "";
              this._controlcapitacion_SAL401();
            } else {
              postData(
                { datosh: `${datosEnvio()}G||||||||||${this.form.cronico_SAL401.trim()}|` },
                get_url("APP/SALUD/SAL401.DLL")
              )
                .then((data) => {
                  this.SAL401.CRONICO = this.form.cronico_SAL401;
                  this.form.cronicod_SAL401 = data.NOMBRE;
                  this._controlcapitacion_SAL401();
                })
                .catch((error) => {
                  console.error(error);
                  this._datocronico_SAL401();
                });
            }
          }
        );
      } else {
        this.SAL401.CRONICO = "";
        this._controlcapitacion_SAL401();
      }
    },
    _controlcapitacion_SAL401() {
      if ($_USUA_GLOBAL[0].NIT == 891855847 && clasedeservicioMask_SAL401.value == "0") {
        validarInputs(
          {
            form: "#CAP_SAL401",
            orden: "1",
          },
          this._obtenerfinalidades_SAL041,
          () => {
            if (this.form.cronico_SAL401.trim() == "") {
              this.SAL401.CRONICO = "";
            } else {
              postData(
                { datosh: `${datosEnvio()}F||${this.form.cronico_SAL401.trim()}|||||||||` },
                get_url("APP/SALUD/SAL401.DLL")
              )
                .then((data) => {
                  this.SAL401.CRONICO = this.form.cronico_SAL401;
                  this.form.cronicod_SAL401 = data.NOMBRE;
                  let j = clasedeservicioMask_SAL401.value;
                  if (clasedeservicioMask_SAL401.value == "0") j = "8";
                  if (data.TABLA_CLASE[j].CLASE == "N") {
                    CON851("03", "03", this._controlcapitacion_SAL401(), "error", "Error");
                  } else {
                    this._confirmargrabar_SAL401();
                  }
                })
                .catch((error) => {
                  console.error(error);
                  this._controlcapitacion_SAL401();
                });
            }
          }
        );
      } else {
        this.SAL401.CONTROLCAP = "";
        this._confirmargrabar_SAL401();
      }
    },
    _confirmargrabar_SAL401() {
      if (this.SAL401.OPCIONACTIVA == "09426") {
        CON851P(
          "01",
          () => {
            setTimeout(this._detalle_SAL401, 300);
          },
          this._grabarauditoria_SAL401
        );
      } else {
        CON851P(
          "01",
          () => {
            setTimeout(this._detalle_SAL401, 300);
          },
          () => {
            if (prefijofacturaMask_SAL401.value == "C") {
              this._consultarconsecutivo_SAL401(
                () => {
                  this._grabarconsecutivo_SAL401(
                    this._leerfactura_SAL401,
                    () => {
                      setTimeout(this._detalle_SAL401, 300);
                    },
                    "96"
                  );
                },
                this._detalle_SAL401,
                "96"
              );
            } else if (prefijofacturaMask_SAL401.value == "E") {
              this._consultarconsecutivo_SAL401(
                () => {
                  this._grabarconsecutivo_SAL401(
                    this._leerfactura_SAL401,
                    () => {
                      setTimeout(this._detalle_SAL401, 300);
                    },
                    "89"
                  );
                },
                this._detalle_SAL401,
                "89"
              );
            } else {
              this._leerfactura_SAL401();
            }
          }
        );
      }
    },
    _grabarauditoria_SAL401() {
      grabar_auditoria_SALUD(
        {
          TIPO: "I46",
          NOVED: 8,
          LLAVE: `${this.form.sucursal_SAL401}${
            clasedeservicioMask_SAL401.value
          }${comprobanteMask_SAL401.value.padStart(6, "0")}`,
          ARCH: "SALUD          ",
        },
        () => {
          loader("hide");
          console.log("volvi");
          setTimeout(this._leerfactura_SAL401, 100);
        }
      );
    },
    _leerfactura_SAL401() {
      console.log("leerfacturas");
      if (this.SAL401.OPCIONACTIVA == "09421") {
        this.SAL401.NROPENDI = "";
        this.SAL401.FECHAPENDI = "";
        this.SAL401.HORAPENDI = "";
        this.SAL401.CANTPENDI = "";
        this.SAL401.PENDIENTE = "";
        this.SAL401.TIPOPENDI = "";
      }
      if ($_USUA_GLOBAL[0].NIT == 830512772 && clasedeservicioMask_SAL401.value == "0") {
        let cantidad = 0;
        for (var i in this.FACTURACION) {
          if (this.FACTURACION[i].ALMACEN == "SIN99") {
            cantidad++;
          }
        }
        if (cantidad > 0) {
          this.SAL401.NROPENDI = `${this.form.sucursal_SAL401.trim()}${
            clasedeservicioMask_SAL401.value
          }${comprobanteMask_SAL401.value.padStart(6, "0")}`;
          this.SAL401.FECHAPENDI = fechafacturaMask_SAL401.value.replace(/-/g, "");
          this.SAL401.HORAPENDI = moment().format("HHmm");
          this.SAL401.CANTPENDI = cantidad.toString();
          this.SAL401.PENDIENTE = "S";
          this.SAL401.TIPOPENDI = "1";
        }
      }
      let data = {};
      if (this.SAL401.OPCIONACTIVA == "09421") {
        this.SAL401.OPERELAB = localStorage.Usuario;
        this.SAL401.FECHAELAB = moment().format("YYYYMMDD");
        this.SAL401.HORAELAB = moment().format("HHmm");
        this.SAL401.OPERCORREC = "";
        this.SAL401.FECHACORREC = "";
        this.SAL401.HORACORREC = "";
      }
      this.SAL401.VALORBASE1 = (Math.round(this.SAL401.VALORBASE1 * 100) / 100).toString();
      this.SAL401.VALORBASE2 = (Math.round(this.SAL401.VALORBASE2 * 100) / 100).toString();
      this.SAL401.VALORBASE3 = (Math.round(this.SAL401.VALORBASE3 * 100) / 100).toString();
      this.SAL401.VLRIVAFACT =
        (this.SAL401.VALORBASE1 * parseFloat($_USUA_GLOBAL[0].IVA1)) / 100 +
        (this.SAL401.VALORBASE2 * parseFloat($_USUA_GLOBAL[0].IVA2)) / 100 +
        (this.SAL401.VALORBASE3 * parseFloat($_USUA_GLOBAL[0].IVA3)) / 100;
      if (isNaN(this.SAL401.VLRIVAFACT)) this.SAL401.VLRIVAFACT = 0;
      this.SAL401.VLRIVAFACT = (Math.round(this.SAL401.VLRIVAFACT * 100) / 100).toString().padStart(12, "0");
      if (this.SAL401.VLRIVAFACT.indexOf(".") == -1) this.SAL401.VLRIVAFACT = `${this.SAL401.VLRIVAFACT}.00`;
      this.SAL401.VLRIVA1FACT = (parseFloat(this.SAL401.VALORBASE1) * parseFloat($_USUA_GLOBAL[0].IVA1)) / 100;
      this.SAL401.VLRIVA2FACT = (parseFloat(this.SAL401.VALORBASE2) * parseFloat($_USUA_GLOBAL[0].IVA2)) / 100;
      this.SAL401.VLRIVA3FACT = (parseFloat(this.SAL401.VALORBASE3) * parseFloat($_USUA_GLOBAL[0].IVA3)) / 100;
      if (isNaN(this.SAL401.VLRIVA1FACT)) this.SAL401.VLRIVA1FACT = 0;
      if (isNaN(this.SAL401.VLRIVA2FACT)) this.SAL401.VLRIVA1FACT = 0;
      if (isNaN(this.SAL401.VLRIVA3FACT)) this.SAL401.VLRIVA1FACT = 0;
      this.SAL401.VLRIVA1FACT = (Math.round(this.SAL401.VLRIVA1FACT * 100) / 100).toString().padStart(12, "0");
      this.SAL401.VLRIVA2FACT = (Math.round(this.SAL401.VLRIVA2FACT * 100) / 100).toString().padStart(12, "0");
      this.SAL401.VLRIVA3FACT = (Math.round(this.SAL401.VLRIVA3FACT * 100) / 100).toString().padStart(12, "0");
      if (this.SAL401.VLRIVA1FACT.indexOf(".") == -1) this.SAL401.VLRIVA1FACT = `${this.SAL401.VLRIVA1FACT}.00`;
      if (this.SAL401.VLRIVA2FACT.indexOf(".") == -1) this.SAL401.VLRIVA2FACT = `${this.SAL401.VLRIVA2FACT}.00`;
      if (this.SAL401.VLRIVA3FACT.indexOf(".") == -1) this.SAL401.VLRIVA3FACT = `${this.SAL401.VLRIVA3FACT}.00`;
      this.SAL401.VALORDESFACT = (Math.round(this.SAL401.VALORDESFACT * 100) / 100).toString().padStart(12, "0");
      if (this.SAL401.VALORDESFACT.indexOf(".") == -1) this.SAL401.VALORDESFACT = `${this.SAL401.VALORDESFACT}.00`;
      data.datosh = `${datosEnvio()}${this.form.sucursal_SAL401}${
        clasedeservicioMask_SAL401.value
      }${comprobanteMask_SAL401.value.padStart(6, "0")}|${fechafacturaMask_SAL401.value.replace(/-/g, "")}|${
        prefijofacturaMask_SAL401.value
      }${numerofacturaMask_SAL401.value.padStart(6, "0")}|`;
      data.datosh += `${clienteMask_SAL401.unmaskedValue.padStart(
        10,
        "0"
      )}|${idhistoriafactMask_SAL401.unmaskedValue.padStart(15, "0")}|${this.SAL401.FECHAINGESTAD.replace(
        /\//g,
        ""
      ).replace(/:/g, "")}|${this.SAL401.VALORDESFACT}|${
        this.SAL401.TIPOCOPAGO
      }|${copagoestimfactMask_SAL401.unmaskedValue.padStart(9, "0")}|`;
      data.datosh += `${this.SAL401.VLRIVAFACT}|${atendidoMask_SAL401.unmaskedValue.padStart(
        10,
        "0"
      )}|${this.SAL401.MEDCIR.padStart(10, "0")}|${this.SAL401.MEDAYU.padStart(10, "0")}|${this.SAL401.MEDANE.padStart(
        10,
        "0"
      )}|${this.SAL401.MEDINS.padStart(10, "0")}|${this.SAL401.VIAFACT.padStart(
        2,
        "0"
      )}|${this.SAL401.MULTFACT.padStart(2, " ")}|${this.SAL401.NROCIRFACT.padStart(
        2,
        " "
      )}|${this.SAL401.CRUENTAFACT.padStart(1, " ")}|`;
      data.datosh += `${this.SAL401.GRUPOCIRFACT.padStart(2, " ")}|${this.form.puertaingreso_SAL401.substring(
        0,
        1
      )}|${this.form.convenio_SAL401.substring(0, 2)}|${this.form.centrocostos_SAL401}|${
        this.form.especialidad_SAL401
      }|${this.SAL401.DETALLE.padEnd(300, " ")}|${this.SAL401.CONTROLCAP.padStart(
        2,
        " "
      )}|${this.SAL401.NROAUTOR.padEnd(27, " ")}|${this.SAL401.FPAGO.padStart(2, " ")}|${this.SAL401.NROFORMFACT.padEnd(
        16,
        " "
      )}|`;
      data.datosh += `${this.SAL401.CAMARX.padStart(4, " ")}|${this.SAL401.OPERELAB}|${this.SAL401.FECHAELAB}|${
        this.SAL401.HORAELAB
      }|${this.SAL401.HORAATENESTAD.padStart(4, "0")}|${this.SAL401.OPERCORREC.padStart(
        4,
        " "
      )}|${this.SAL401.FECHACORREC.padStart(8, "0")}|${this.SAL401.HORACORREC.padStart(4, "0")}|${
        this.SAL401.PACIENTE.EDAD.unid_edad
      }${this.SAL401.PACIENTE.EDAD.vlr_edad.toString().padStart(3, "0")}|`;
      data.datosh += `${this.SAL401.CAUSA.padStart(2, " ")}|${this.SAL401.EMBARESTAD.padStart(
        1,
        " "
      )}|${this.SAL401.PERSONALELAB.padStart(1, " ")}|${this.SAL401.CLASEPROC.padStart(
        1,
        " "
      )}|${this.SAL401.TIPOPROC.padStart(1, " ")}|${this.SAL401.FINALIDESTAD.padStart(
        2,
        " "
      )}| |${this.SAL401.FECHASALESTAD.padStart(8, "0")}|${this.SAL401.HORASALESTAD.padStart(
        4,
        "0"
      )}|${solicitanteMask_SAL401.unmaskedValue.padStart(10, "0")}|${this.SAL401.ESPECREMI.padStart(
        3,
        " "
      )}|${this.form.unidaddeservicio_SAL401.substring(0, 2)}|${this.SAL401.TIPODRFACT.padStart(1, " ")}|`;
      data.datosh += `${this.SAL401.MACRO}|${this.SAL401.CUPPAQINT.padEnd(8, " ")}|${this.SAL401.ORDSERVFACT.padEnd(
        9,
        " "
      )}|${this.SAL401.CRONICO.padStart(3, "0")}|${this.SAL401.PENDIENTE.padStart(
        1,
        " "
      )}|${this.SAL401.NROPENDI.padEnd(9, " ")}|${this.SAL401.FECHAPENDI.padStart(
        8,
        "0"
      )}|${this.SAL401.HORAPENDI.padStart(4, "0")}|${this.SAL401.CANTPENDI.padStart(
        3,
        "0"
      )}|${this.SAL401.TIPOPENDI.padStart(1, " ")}|${this.SAL401.FACTAUTOFACT.padStart(1, " ")}|${
        this.SAL401.VLRIVA1FACT
      }|${this.SAL401.VLRIVA2FACT}|${this.SAL401.VLRIVA3FACT}|`;
      data.datosh += `${this.SAL401.ORDSALIDAFACT.padStart(10, " ")}|${
        this.SAL401.VLRUPC
      }|${this.SAL401.FECHAACCIDRIPS.padStart(8, "0")}|${this.SAL401.EMPRESAPACIRIPS.padEnd(50, " ")}|${
        this.form.ciudad_SAL401
      }|${this.SAL401.NOVEDADW}|`;
      var lin = 1;
      for (var i in this.FACTURACION) {
        let negativo = 0;
        if (this.FACTURACION[i].VALORTOTAL.indexOf("-") >= 0) {
          this.FACTURACION[i].VALORTOTAL = this.FACTURACION[i].VALORTOTAL.replace("-", "");
          negativo = 1;
        } else {
          if (this.SAL401.TIPODRFACT == 2) negativo = 1;
        }
        let valor = parseFloat(this.FACTURACION[i].VALORTOTAL);
        if (isNaN(valor)) valor = "000000000000.00";
        else valor = this.FACTURACION[i].VALORTOTAL.toString().padStart(14, "0");
        if (negativo == 1) valor = `-${valor}`;
        negativo = 0;
        if (this.FACTURACION[i].CANTIDAD.indexOf("-") >= 0) {
          this.FACTURACION[i].CANTIDAD = this.FACTURACION[i].CANTIDAD.replace("-", "");
          console.log("aca");
          negativo = 1;
        } else {
          if (this.SAL401.TIPODRFACT == 2) negativo = 1;
        }
        let cantidad = parseFloat(this.FACTURACION[i].CANTIDAD);
        if (isNaN(cantidad)) cantidad = "000000000000.00";
        else cantidad = this.FACTURACION[i].CANTIDAD.toString().padStart(14, "0");
        if (negativo == 1) cantidad = `-${cantidad}`;
        data["LIN-" + lin.toString().padStart(3, "0")] =
          this.FACTURACION[i].ALMACEN +
          "|" +
          this.FACTURACION[i].ARTICULO +
          "|" +
          this.FACTURACION[i].CODIGOLOTE +
          "|" +
          cantidad +
          "|" +
          valor +
          "|" +
          this.FACTURACION[i].DIASTRATA +
          "|";
        lin++;
      }
      postData(data, get_url("APP/SALUD/SAL401-01.DLL"))
        .then((data) => {
          let valor = parseInt(data);
          console.debug(data, valor);
          comprobanteMask_SAL401.typedValue = parseInt(data).toString();
          if (this.SAL401.OPCIONACTIVA == "09426") {
            if (prefijofacturaMask_SAL401.value == "C" || prefijofacturaMask_SAL401.value == "E") {
              postData(
                {
                  datosh: `${datosEnvio()}${this.form.sucursal_SAL401}${
                    clasedeservicioMask_SAL401.value
                  }${comprobanteMask_SAL401.value.padStart(6, "0")}|${
                    prefijofacturaMask_SAL401.value
                  }|${fechafacturaMask_SAL401.value.replace(/-/g, "").substring(2, 8)}|`,
                },
                get_url("APP/SALUD/SAL021.DLL")
              )
                .then((data) => {
                  console.debug(data);
                })
                .catch((err) => {
                  console.error(err);
                });
            }
            if (
              clasedeservicioMask_SAL401.value == "3" ||
              (clasedeservicioMask_SAL401.value == "7" && this.FACTURACION[0].ARTICULO.substring(0, 2) == "88")
            ) {
              postData(
                {
                  datosh: `${datosEnvio()}${this.form.sucursal_SAL401}${
                    clasedeservicioMask_SAL401.value
                  }${comprobanteMask_SAL401.value.padStart(6, "0")}|`,
                },
                get_url("APP/SALUD/RX-WEB01.DLL")
              )
                .then((data) => {
                  console.debug(data);
                })
                .catch((err) => {
                  console.error(err);
                  CON851("", "Hubo un problema guardando en resultados de laboratorio", null, "error", "Error");
                });
            }
            this._validarcontabiliarcomprobante_SAL401();
          } else {
            this.SAL401.NOVEDADW = "8";
            if (prefijofacturaMask_SAL401.value == "C") {
              postData({ datosh: `${datosEnvio()}89|` }, get_url("APP/CONTAB/CON007.DLL"))
                .then((data) => {
                  console.debug(data);
                  data = data.split("|");
                  numerofacturaMask_SAL401.typedValue = parseInt(data[1].substring(3, 9)).toString();
                  postData(
                    {
                      datosh: `${datosEnvio()}89|${moment().format("YYMMDD")}|${numerofacturaMask_SAL401.value.padStart(
                        6,
                        "0"
                      )}|`,
                    },
                    get_url("APP/CONTAB/CON007X.DLL")
                  )
                    .then((data) => {
                      var data = data.split("|");
                      numerofacturaMask_SAL401.typedValue = parseInt(data[1].substring(3, 9)).toString();
                    })
                    .catch((err) => {
                      console.error(err);
                    });
                })
                .catch((err) => {
                  console.error(err);
                });
            }
            if (prefijofacturaMask_SAL401.value == "E") {
              postData({ datosh: `${datosEnvio()}96|` }, get_url("APP/CONTAB/CON007.DLL"))
                .then((data) => {
                  console.debug(data);
                  data = data.split("|");
                  numerofacturaMask_SAL401.typedValue = parseInt(data[1].substring(3, 9)).toString();
                  postData(
                    {
                      datosh: `${datosEnvio()}96|${moment().format("YYMMDD")}|${numerofacturaMask_SAL401.value.padStart(
                        6,
                        "0"
                      )}|`,
                    },
                    get_url("APP/CONTAB/CON007X.DLL")
                  )
                    .then((data) => {
                      var data = data.split("|");
                      numerofacturaMask_SAL401.typedValue = parseInt(data[1].substring(3, 9)).toString();
                    })
                    .catch((err) => {
                      console.error(err);
                    });
                })
                .catch((err) => {
                  console.error(err);
                });
            }
            this._grabarconsecutivo_SAL401(
              this._validarcontabiliarcomprobante_SAL401,
              this._evaluardatoremite_SAL401,
              `${this.SAL401.SECU1NUM}${this.SAL401.SECU2NUM}`
            );
          }
        })
        .catch((err) => {
          console.error(err);
          this._evaluarespecialidad_SAL401();
        });
    },
    _validarcontabiliarcomprobante_SAL401() {
      // SE COMENTA DISPENSACION HASTA ACTIVARLA
      if (clasedeservicioMask_SAL401.value == "0" && this.SAL401.NROPEDW > 0) {
        var data = {};
        data.datosh = `${datosEnvio()}2|${this.SAL401.NROPEDW}|${
          localStorage.Usuario
        }|${this.form.unidaddeservicio_SAL401.substring(0, 2)}|${this.form.sucursal_SAL401}${
          clasedeservicioMask_SAL401.value
        }${comprobanteMask_SAL401.value.padStart(6, "0")}|${this.SAL401.FECHAINGESTAD}|${this.SAL401.HORAATENESTAD}|${
          prefijofacturaMask_SAL401.value
        }${numerofacturaMask_SAL401.value.padStart(6, "0")}|`;
        var lin = 1;
        for (var i of this.FACTURACION) {
          let cantidad = parseFloat(i.CANTIDAD);
          if (isNaN(cantidad)) cantidad = "0000.0";
          else cantidad = i.CANTIDAD.toString().padStart(6, "0");
          data["LIN-" + lin.toString().padStart(3, "0")] = `${i.ARTICULO.substring(0, 2)}${i.ARTICULO.substring(
            2,
            15
          )}|${cantidad}|`;
          lin++;
        }
        postData(data, get_url("APP/SALUD/SER815.DLL"))
          .then((data) => {
            console.debug(data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      if (
        prefijofacturaMask_SAL401.value != "C" &&
        prefijofacturaMask_SAL401.value != "E" &&
        prefijofacturaMask_SAL401.value != "Ñ" &&
        prefijofacturaMask_SAL401.value != "U"
      ) {
        postData(
          {
            datosh: `${datosEnvio()}${prefijofacturaMask_SAL401.value}${numerofacturaMask_SAL401.value.padStart(
              6,
              "0"
            )}|${$_USUA_GLOBAL[0].FECHALNK}|`,
          },
          get_url("APP/SALUD/SAL020GA.DLL")
        )
          .then((data) => {
            console.debug(data);
            this._contabiliarcomprobante_SAL401();
          })
          .catch((error) => {
            console.error(error);
            this._evaluardatoremite_SAL401();
          });
      } else if (prefijofacturaMask_SAL401.value == "C" || prefijofacturaMask_SAL401.value == "E") {
        postData(
          {
            datosh: `${datosEnvio()}${this.form.sucursal_SAL401}${
              clasedeservicioMask_SAL401.value
            }${comprobanteMask_SAL401.value.padStart(6, "0")}|`,
          },
          get_url("APP/SALUD/SAL020.DLL")
        )
          .then((data) => {
            console.debug(data);
            this._contabiliarcomprobante_SAL401();
          })
          .catch((error) => {
            console.error(error);
            this._evaluardatoremite_SAL401();
          });
      } else {
        this._contabiliarcomprobante_SAL401();
      }
    },
    _contabiliarcomprobante_SAL401() {
      console.log("aca");
      if (prefijofacturaMask_SAL401.value == "E") {
        postData(
          {
            datosh: `${datosEnvio()}${this.form.sucursal_SAL401}${
              clasedeservicioMask_SAL401.value
            }${comprobanteMask_SAL401.value.padStart(6, "0")}|`,
          },
          get_url("APP/SALUD/SAL401-E.DLL")
        )
          .then((data) => {
            console.debug(data);
          })
          .catch((err) => {
            console.error(err);
            CON851("", "Guardando factura", null, "error", "Error");
          });
      }
      if (this.SAL401.OPCIONACTIVA == "09421") {
        if (copagoestimfactMask_SAL401.value.replace(/,/g, "") > 0 || prefijofacturaMask_SAL401.value == "E") {
          let { ipcRenderer } = require("electron");
          ipcRenderer.send(
            "another",
            (datos = {
              directorio: "SALUD/paginas/FAC135C.html",
              comprobante: comprobanteMask_SAL401.value.padStart(6, "0"),
              tipofact: clasedeservicioMask_SAL401.value,
            })
          );
          vector = ["on", "Ventana de Copagos"];
          _EventocrearSegventana(vector, this._validarSER4B1_SAL401);
        } else {
          if (
            clasedeservicioMask_SAL401.value == "1" ||
            clasedeservicioMask_SAL401.value == "4" ||
            clasedeservicioMask_SAL401.value == "5" ||
            clasedeservicioMask_SAL401.value == "7" ||
            (clasedeservicioMask_SAL401.value == "0" && this.FACTURACION[0].ARTICULO.substring(0, 2) == "MO")
          ) {
            if (
              this.form.especialidad_SAL401.trim() == "250" ||
              this.form.especialidad_SAL401.trim() == "460" ||
              this.form.especialidad_SAL401.trim() == "461" ||
              this.form.especialidad_SAL401.trim() == "462" ||
              this.form.especialidad_SAL401.trim() == "463" ||
              this.form.especialidad_SAL401.trim() == "464" ||
              this.form.especialidad_SAL401.trim() == "510" ||
              this.form.especialidad_SAL401.trim() == "220"
            ) {
              postData(
                {
                  datosh: `${datosEnvio()}${this.form.sucursal_SAL401}${
                    clasedeservicioMask_SAL401.value
                  }${comprobanteMask_SAL401.value.padStart(6, "0")}|`,
                },
                get_url("APP/SALUD/SER448O.DLL")
              )
                .then((data) => {
                  console.debug(data);
                  this._validarSER4B1_SAL401();
                })
                .catch((err) => {
                  console.error(err);
                  CON851("", "Hubo un problema guardando en RIPS", this._validarSER4B1_SAL401(), "error", "Error");
                });
            } else {
              postData(
                {
                  datosh: `${datosEnvio()}${this.form.sucursal_SAL401}${
                    clasedeservicioMask_SAL401.value
                  }${comprobanteMask_SAL401.value.padStart(6, "0")}|`,
                },
                get_url("APP/SALUD/SER448C.DLL")
              )
                .then((data) => {
                  console.debug(data);
                  this._validarSER4B1_SAL401();
                })
                .catch((err) => {
                  console.error(err);
                  CON851("", "Hubo un problema guardando RIPS", this._validarSER4B1_SAL401(), "error", "Error");
                });
            }
          } else {
            this._validarSER4B1_SAL401();
          }
        }
        var grupofact = () => {
          var lab = false;
          for (var i in this.FACTURACION) {
            if (
              this.FACTURACION[i].ARTICULO.substring(0, 2) == "87" ||
              this.FACTURACION[i].ARTICULO.substring(0, 2) == "88" ||
              this.FACTURACION[i].ARTICULO.substring(0, 2) == "89" ||
              this.FACTURACION[i].ARTICULO.substring(0, 2) == "90" ||
              this.FACTURACION[i].ARTICULO.substring(0, 2) == "91"
            ) {
              lab = true;
            }
          }
          return lab;
        };
        if (
          (grupofact() && clasedeservicioMask_SAL401.value == "2") ||
          (grupofact() && clasedeservicioMask_SAL401.value == "7")
        ) {
          postData(
            {
              datosh: `${datosEnvio()}${this.form.sucursal_SAL401}${
                clasedeservicioMask_SAL401.value
              }${comprobanteMask_SAL401.value.padStart(6, "0")}|`,
            },
            get_url("APP/SALUD/CREA-RESU20.DLL")
          )
            .then((data) => {
              console.debug(data);
            })
            .catch((err) => {
              console.error(err);
              CON851("", "Hubo un problema guardando en resultados de laboratorio", null, "error", "Error");
            });
        }
        if (
          clasedeservicioMask_SAL401.value == "3" ||
          (clasedeservicioMask_SAL401.value == "7" && this.FACTURACION[0].ARTICULO.substring(0, 2) == "88")
        ) {
          postData(
            {
              datosh: `${datosEnvio()}${this.form.sucursal_SAL401}${
                clasedeservicioMask_SAL401.value
              }${comprobanteMask_SAL401.value.padStart(6, "0")}|`,
            },
            get_url("APP/SALUD/RX-WEB01.DLL")
          )
            .then((data) => {
              console.debug(data);
            })
            .catch((err) => {
              console.error(err);
              CON851("", "Hubo un problema guardando en resultados de laboratorio", null, "error", "Error");
            });
        }
        if (
          $_USUA_GLOBAL[0].NIT != 822007038 &&
          this.form.unidaddeservicio_SAL401.substring(0, 2) == "01" &&
          clasedeservicioMask_SAL401.value == "5"
        ) {
          postData(
            {
              datosh: `${datosEnvio()}${this.form.sucursal_SAL401}${
                clasedeservicioMask_SAL401.value
              }${comprobanteMask_SAL401.value.padStart(6, "0")}|${fechafacturaMask_SAL401.value.replace(
                /-/g,
                ""
              )}|${idhistoriafactMask_SAL401.unmaskedValue.padStart(
                15,
                "0"
              )}|${$_USUA_GLOBAL[0].NIT.toString().padStart(10, "0")}|${localStorage.Usuario}|`,
            },
            get_url("APP/SALUD/SER880TG.DLL")
          )
            .then((data) => {
              console.debug(data);
            })
            .catch((err) => {
              console.error(err);
              CON851("", "Hubo un problema guardando en TRIAGE", null, "error", "Error");
            });
        }
        if (
          $_USUA_GLOBAL[0].RESTRIC_EX == "N" &&
          (clasedeservicioMask_SAL401.value == "0" || this.SAL401.CUPPAQINT > 0)
        ) {
          postData(
            {
              datosh: `${datosEnvio()}${this.form.sucursal_SAL401}${
                clasedeservicioMask_SAL401.value
              }${comprobanteMask_SAL401.value.padStart(6, "0")}|0|`,
            },
            get_url("APP/SALUD/SAL030.DLL")
          )
            .then((data) => {
              console.debug(data);
              postData(
                {
                  datosh: `${datosEnvio()}${this.form.sucursal_SAL401}${
                    clasedeservicioMask_SAL401.value
                  }${comprobanteMask_SAL401.value.padStart(6, "0")}|0|`,
                },
                get_url("APP/SALUD/SAL030V.DLL")
              )
                .then((data) => {
                  console.debug(data);
                })
                .catch((err) => {
                  console.error(err);
                  CON851("", "Hubo un problema en inventario", null, "error", "Error");
                });
            })
            .catch((err) => {
              console.error(err);
              CON851("", "Hubo un problema en inventario", null, "error", "Error");
            });
        }
        if (this.form.puertaingreso_SAL401.substring(0, 1) == "2") {
          if (
            clasedeservicioMask_SAL401.value == "1" ||
            clasedeservicioMask_SAL401.value == "5" ||
            this.FACTURACION[0].ARTICULO.substring(0, 2) == 99 ||
            this.FACTURACION[0].ARTICULO.substring(0, 2) == 93 ||
            this.FACTURACION[0].ARTICULO.substring(0, 2) == 23 ||
            this.FACTURACION[0].ARTICULO.substring(0, 2) == "F8" ||
            this.FACTURACION[0].ARTICULO.substring(0, 2) == 13 ||
            this.FACTURACION[0].ARTICULO.substring(0, 2) == 12 ||
            (clasedeservicioMask_SAL401.value == "7" && this.FACTURACION[0].ARTICULO.substring(0, 2) != 90) ||
            ($_USUA_GLOBAL[0].NIT == 830092718 && clasedeservicioMask_SAL401.value == "3")
          ) {
            postData(
              {
                datosh: `${datosEnvio()}${this.form.sucursal_SAL401}${
                  clasedeservicioMask_SAL401.value
                }${comprobanteMask_SAL401.value.padStart(6, "0")}|${this.SAL401.FINALIDESTAD}|F|${moment().format(
                  "YY"
                )}|${$_USUA_GLOBAL[0].NIT}|`,
              },
              get_url("APP/SALUD/SER891.DLL")
            )
              .then((data) => {
                console.debug(data);
              })
              .catch((err) => {
                console.error(err);
              });
          } else if (
            ($_USUA_GLOBAL[0].NIT == 900193162 && clasedeservicioMask_SAL401.value == "3") ||
            ($_USUA_GLOBAL[0].NIT == 830092719 && clasedeservicioMask_SAL401.value == "3") ||
            ($_USUA_GLOBAL[0].NIT == 800037979 && clasedeservicioMask_SAL401.value == "3") ||
            ($_USUA_GLOBAL[0].NIT == 800037979 && clasedeservicioMask_SAL401.value == "4") ||
            ($_USUA_GLOBAL[0].NIT == 900405505 && clasedeservicioMask_SAL401.value == "3") ||
            ($_USUA_GLOBAL[0].NIT == 900073674 && clasedeservicioMask_SAL401.value == "3") ||
            ($_USUA_GLOBAL[0].NIT == 800175901 && clasedeservicioMask_SAL401.value == "4")
          ) {
            postData(
              {
                datosh: `${datosEnvio()}${this.form.sucursal_SAL401}${
                  clasedeservicioMask_SAL401.value
                }${comprobanteMask_SAL401.value.padStart(6, "0")}|${this.SAL401.FINALIDESTAD}|F|${moment().format(
                  "YY"
                )}|${$_USUA_GLOBAL[0].NIT}|`,
              },
              get_url("APP/SALUD/SER891.DLL")
            )
              .then((data) => {
                console.debug(data);
              })
              .catch((err) => {
                console.error(err);
              });
          } else if (
            ($_USUA_GLOBAL[0].NIT == 830511298 && clasedeservicioMask_SAL401.value == "4") ||
            ($_USUA_GLOBAL[0].NIT == 830511298 && clasedeservicioMask_SAL401.value == "3") ||
            ($_USUA_GLOBAL[0].NIT == 900004059 && clasedeservicioMask_SAL401.value > 0) ||
            ($_USUA_GLOBAL[0].NIT == 900005594 && clasedeservicioMask_SAL401.value > 0) ||
            ($_USUA_GLOBAL[0].NIT == 900541158 && clasedeservicioMask_SAL401.value == "3") ||
            ($_USUA_GLOBAL[0].NIT == 900073674 && clasedeservicioMask_SAL401.value == "4") ||
            ($_USUA_GLOBAL[0].NIT == 844002258 && clasedeservicioMask_SAL401.value == "4")
          ) {
            postData(
              {
                datosh: `${datosEnvio()}${this.form.sucursal_SAL401}${
                  clasedeservicioMask_SAL401.value
                }${comprobanteMask_SAL401.value.padStart(6, "0")}|${this.SAL401.FINALIDESTAD}|F|${moment().format(
                  "YY"
                )}|${$_USUA_GLOBAL[0].NIT}|`,
              },
              get_url("APP/SALUD/SER891.DLL")
            )
              .then((data) => {
                console.debug(data);
              })
              .catch((err) => {
                console.error(err);
              });
          } else {
            if (
              ($_USUA_GLOBAL[0].NIT == 900004059 ||
                $_USUA_GLOBAL[0].NIT == 830092718 ||
                $_USUA_GLOBAL[0].NIT == 900193162 ||
                $_USUA_GLOBAL[0].NIT == 900405505 ||
                $_USUA_GLOBAL[0].NIT == 830092719 ||
                $_USUA_GLOBAL[0].NIT == 900405505 ||
                $_USUA_GLOBAL[0].NIT == 900005594 ||
                $_USUA_GLOBAL[0].NIT == 900073674) &&
              clasedeservicioMask_SAL401.value > 0
            ) {
              postData(
                {
                  datosh: `${datosEnvio()}${this.form.sucursal_SAL401}${
                    clasedeservicioMask_SAL401.value
                  }${comprobanteMask_SAL401.value.padStart(6, "0")}|${this.SAL401.FINALIDESTAD}|F|${moment().format(
                    "YY"
                  )}|${$_USUA_GLOBAL[0].NIT}|`,
                },
                get_url("APP/SALUD/SER891.DLL")
              )
                .then((data) => {
                  console.debug(data);
                })
                .catch((err) => {
                  console.error(err);
                });
            }
          }
        }
      } else {
        console.log("aca");
        this.SAL401.CONTEOLAB = 0;
        if (
          $_USUA_GLOBAL[0].RESTRIC_EX == "N" &&
          (clasedeservicioMask_SAL401.value == "0" || this.SAL401.CUPPAQINT > 0)
        ) {
          postData(
            {
              datosh: `${datosEnvio()}${this.form.sucursal_SAL401}${
                clasedeservicioMask_SAL401.value
              }${comprobanteMask_SAL401.value.padStart(6, "0")}|0|`,
            },
            get_url("APP/SALUD/SAL030.DLL")
          )
            .then((data) => {
              console.debug(data);
            })
            .catch((err) => {
              console.error(err);
              CON851("", "Hubo un problema en inventario", null, "error", "Error");
            });
        }
        if (clasedeservicioMask_SAL401.value == "2" || clasedeservicioMask_SAL401.value == "7") {
          this._evaluarmodificarlaboratorios_SAL401();
        } else {
          this._validarSER4B1_SAL401();
        }
      }
    },
    _evaluarmodificarlaboratorios_SAL401() {
      console.log("aca");
      console.log(this.FACTURACION[this.SAL401.CONTEOLAB]);
      if (this.FACTURACION[this.SAL401.CONTEOLAB]) {
        console.log("aca", this.FACTURACION[this.SAL401.CONTEOLAB]);
        if (
          this.FACTURACION[this.SAL401.CONTEOLAB].ARTICULO.substring(0, 2) == "87" ||
          this.FACTURACION[this.SAL401.CONTEOLAB].ARTICULO.substring(0, 2) == "88" ||
          this.FACTURACION[this.SAL401.CONTEOLAB].ARTICULO.substring(0, 2) == "89" ||
          this.FACTURACION[this.SAL401.CONTEOLAB].ARTICULO.substring(0, 2) == "90" ||
          this.FACTURACION[this.SAL401.CONTEOLAB].ARTICULO.substring(0, 2) == "91"
        ) {
          var grupofact = () => {
            var lab = false;
            for (var i in this.FACTURACION) {
              if (
                this.FACTURACION[i].ARTICULO.substring(0, 2) == "87" ||
                this.FACTURACION[i].ARTICULO.substring(0, 2) == "88" ||
                this.FACTURACION[i].ARTICULO.substring(0, 2) == "89" ||
                this.FACTURACION[i].ARTICULO.substring(0, 2) == "90" ||
                this.FACTURACION[i].ARTICULO.substring(0, 2) == "91"
              ) {
                lab = true;
              }
            }
            return lab;
          };
          if (
            (this.FACTURACION[this.SAL401.CONTEOLAB].ARTICULO.trim() !=
              this.TABLALAB[this.SAL401.CONTEOLAB].ARTICULO.trim() &&
              this.TABLALAB[this.SAL401.CONTEOLAB].ARTICULO.trim() != "") ||
            (this.FACTURACION[this.SAL401.CONTEOLAB].ARTICULO.trim() ==
              this.TABLALAB[this.SAL401.CONTEOLAB].ARTICULO.trim() &&
              this.TABLALAB[this.SAL401.CONTEOLAB].ARTICULO.trim() != "")
          ) {
            postData(
              {
                datosh: `${datosEnvio()}${this.form.sucursal_SAL401}${
                  clasedeservicioMask_SAL401.value
                }${comprobanteMask_SAL401.value.padStart(6, "0")}|${this.TABLALAB[
                  this.SAL401.CONTEOLAB
                ].ARTICULO.trim()}|${this.FACTURACION[this.SAL401.CONTEOLAB].ARTICULO.trim()}|S|`,
              },
              get_url("APP/SALUD/MODIF-RESU20.DLL")
            )
              .then((data) => {
                console.debug(data);
              })
              .catch((err) => {
                console.error(err);
              });
          } else {
            var grupofact = () => {
              var lab = false;
              for (var i in this.FACTURACION) {
                if (
                  this.FACTURACION[i].ARTICULO.substring(0, 2) == "87" ||
                  this.FACTURACION[i].ARTICULO.substring(0, 2) == "88" ||
                  this.FACTURACION[i].ARTICULO.substring(0, 2) == "89" ||
                  this.FACTURACION[i].ARTICULO.substring(0, 2) == "90" ||
                  this.FACTURACION[i].ARTICULO.substring(0, 2) == "91"
                ) {
                  lab = true;
                }
              }
              return lab;
            };
            postData(
              {
                datosh: `${datosEnvio()}${this.form.sucursal_SAL401}${
                  clasedeservicioMask_SAL401.value
                }${comprobanteMask_SAL401.value.padStart(6, "0")}|`,
              },
              get_url("APP/SALUD/CREA-RESU20.DLL")
            )
              .then((data) => {
                console.debug(data);
              })
              .catch((err) => {
                console.error(err);
              });
          }
        }
        this.SAL401.CONTEOLAB++;
        this._evaluarmodificarlaboratorios_SAL401();
      } else {
        this._validarSER4B1_SAL401();
      }
    },
    _validarSER4B1_SAL401() {
      postData(
        {
          datosh: `${datosEnvio()}${this.form.sucursal_SAL401.trim()}${clasedeservicioMask_SAL401.value.trim()}${comprobanteMask_SAL401.value
            .trim()
            .padStart(6, "0")}|`,
        },
        get_url("APP/SALUD/SAL450A.DLL")
      )
        .then((data) => {
          this.SAL401.COMPROBANTE = data.FACTURA[0];
          console.log(data, this.SAL401.COMPROBANTE);
          postData(
            { datosh: `${datosEnvio()}${idhistoriafactMask_SAL401.unmaskedValue.padStart(15, "0")}||` },
            get_url("APP/SALUD/SER810-1.DLL")
          )
            .then((data) => {
              this.SAL401.PACIENTE = data["REG-PACI"][0];
              this.SAL401.PACIENTE.EDAD = calcular_edad(moment(this.SAL401.PACIENTE.NACIM).format("YYYY-MM-DD"));
              if (
                clasedeservicioMask_SAL401.value == "1" ||
                clasedeservicioMask_SAL401.value == "4" ||
                clasedeservicioMask_SAL401.value == "5" ||
                clasedeservicioMask_SAL401.value == "7" ||
                (clasedeservicioMask_SAL401.value == "0" && this.FACTURACION[0].ARTICULO.substring(0, 2) == "MO")
              ) {
                if (prefijofacturaMask_SAL401.value.trim() == "E" && prefijofacturaMask_SAL401.value.trim() == "C") {
                  this._nacimientos_naci();
                } else {
                  if (
                    this.FACTURACION[0].ARTICULO.trim() != "890701" &&
                    this.FACTURACION[0].ARTICULO.trim() != "890702" &&
                    this.FACTURACION[0].ARTICULO.trim() != "890703" &&
                    this.FACTURACION[0].ARTICULO.trim() != "890704"
                  ) {
                    CON851("", "Articulos no compatibles", this._nacimientos_naci(), "warning", "Advertencia");
                  } else {
                    if (this.SAL401.COMPROBANTE.TABLA_DIAG[0].COD_DIAG.trim() == "") {
                      this._ventanaRIPS2_SAL401();
                    } else {
                      this.SAL401.NROCOMPROBANTE = comprobanteMask_SAL401.value;
                      this.SAL401.FECHA = fechafacturaMask_SAL401.value;
                      _impresion_SER4B1(this, () => {
                        setTimeout(() => {
                          this._nacimientos_naci();
                        }, 300);
                      });
                    }
                  }
                }
              } else {
                this._nacimientos_naci();
              }
            })
            .catch((err) => {
              console.error(err);
              this._nacimientos_naci();
            });
        })
        .catch((err) => {
          console.error(err);
          this._nacimientos_naci();
        });
    },
    _ventanaRIPS2_SAL401() {
      let { ipcRenderer } = require("electron");
      ipcRenderer.send("another", (datos = { directorio: "SALUD/paginas/SER421.html" }));
      _EventocrearSegventana(["on", "Actualizando RIPS ..."], this._imprimir_SAL401);
    },
    _pareimpresion_SAL401() {
      $("#IMPRIME_SAL401").removeClass("hidden");
      validarInputs(
        {
          form: "#IMPRIME_SAL401",
          orden: "1",
        },
        () => {
          this._inicializar_SAL401();
          this._evaluarcomprobante_SAL401();
        },
        () => {
          this._nacimientos_naci();
        }
      );
    },
    _nacimientos_naci() {
      if (!this.FACTURACION[1])
        this.FACTURACION.push({
          ARTICULO: "",
          DESCRIPCIONART: "",
          ALMACEN: "",
          CODIGOLOTE: "",
          CANTIDAD: "",
          VALORUNIT: "",
          DIASTRATA: "",
          VALORTOTAL: "",
          UNIDAD: "",
        });
      if (
        (this.FACTURACION[0].ARTICULO.substring(0, 2) == "73" ||
          this.FACTURACION[0].ARTICULO.substring(0, 2) == "74" ||
          this.FACTURACION[1].ARTICULO.substring(0, 2) == "73" ||
          this.FACTURACION[1].ARTICULO.substring(0, 2) == "74" ||
          this.FACTURACION[0].ARTICULO.substring(0, 2) == "F8" ||
          this.FACTURACION[0].ARTICULO.substring(0, 2) == "FS" ||
          this.FACTURACION[1].ARTICULO.substring(0, 2) == "F8" ||
          this.FACTURACION[1].ARTICULO.substring(0, 2) == "FS") &&
        (this.SAL401.OPCIONACTIVA != "09422" || this.SAL401.OPCIONACTIVA != "09423")
      ) {
        if (this.SAL401.RECIENNACIDO == 0) {
          this.SAL401.RECIENNACIDO = 1;
          this.datos_naci.comprobante = `${this.form.sucursal_SAL401}${
            clasedeservicioMask_SAL401.value
          }${comprobanteMask_SAL401.value.padStart(6, "0")}`;
          this.mostrarnacimientos = true;
          setTimeout(() => {
            this.params_naci.estado = true;
          }, 300);
        } else {
          this._imprimir_SAL401();
        }
      } else {
        this._imprimir_SAL401();
      }
    },
    validarEsc_naci() {
      this.mostrarnacimientos = false;
      setTimeout(() => {
        this.params_naci.estado = false;
      }, 300);
      this._imprimir_SAL401();
    },
    validarCallback_naci() {
      this.mostrarnacimientos = false;
      setTimeout(() => {
        this.params_naci.estado = false;
      }, 300);
      this._imprimir_SAL401();
    },

    _imprimir_SAL401() {
      let formatos = [
        { COD: "1", DESCRIP: "FORMATO NORMAL ORIGINAL" },
        { COD: "2", DESCRIP: "FORMATO NORMAL CON COPIA" },
        { COD: "3", DESCRIP: "FORMATO R.I.P.S ORIGINAL" },
        { COD: "4", DESCRIP: "FORMATO POS" },
        { COD: "5", DESCRIP: "PENDIENTE MEDICAMENTOS" },
        { COD: "6", DESCRIP: "NO IMPRIMIR" },
      ];
      POPUP(
        {
          array: formatos,
          titulo: "IMPRESION DE FORMATOS",
          indices: [{ label: "DESCRIP" }],
          // callback_f: () => {
          //     var FUNCION = new Function();
          //     let OPCIONES = new Object;
          //     OPCIONES = {
          //         '09421': _Evaluarremite_41,
          //         '09422': _Evaluarnumeroctl_41,
          //         '09426': _Evaluarremite_41
          //     }
          //     FUNCION = OPCIONES[SAL41.OPCIONACTIVA];
          //     setTimeout(FUNCION, 300);
          // }
          callback_f: _toggleNav,
        },
        this._evaluarformatosdeimpresion_SAL401
      );
    },
    _evaluarformatosdeimpresion_SAL401(data) {
      switch (data.COD) {
        case "1":
          this._imprimirINV411_SAL401(true);
          break;
        case "2":
          if ($_USUA_GLOBAL[0].POS == "S") {
            this._imprimirINV412_SAL401();
          } else {
            this._imprimirINV411_SAL401(false);
          }
          break;
        case "3":
          this.SAL401.ORIGINAL = "S";
          this._imprimirINV414_SAL401();
          break;
        case "4":
          this._imprimirINV412_SAL401(true);
          break;
        case "5":
          if ($_CLFACT == "0") {
            if (SAL41.NITUSU == "0800162035") {
              this._imprimirINV411_SAL401(true);
            } else {
              this._imprimirINV412_SAL401(true);
            }
          } else {
            CON851("", "La clase de servicio no corresponde a la impresión solicitada", null, "error", "Error");
            setTimeout(this._imprimir_SAL401, 300);
          }
          // no dejar imprimir si no es medicamentos
          break;
        case "6":
          this.FACTURACION = [];
          this._finImpresion_SAL401();
          break;
        default:
          _toggleNav();
          break;
      }
    },
    _imprimirINV411_SAL401(data) {
      let SAL41 = new Object();
      SAL41.IMPRESION = [];
      SAL41.IMPRESION.NOMBREUSU = $_USUA_GLOBAL[0].NOMBRE;
      SAL41.IMPRESION.NIT = $_USUA_GLOBAL[0].NIT;
      SAL41.IMPRESION.NITUSU = "NIT" + $_USUA_GLOBAL[0].NIT.toString();
      switch ($_USUA_GLOBAL[0].IVA_S) {
        case "C":
          SAL41.IMPRESION.IVAUSU = "IVA REG. COMUN-RETENEDOR";
          break;
        case "S":
          SAL41.IMPRESION.IVAUSU = "IVA REGIMEN SIMPLIFICADO";
          break;
        case "N":
          SAL41.IMPRESION.IVAUSU = "NO RESPONSABLES DE IVA";
          break;
        default:
          SAL41.IMPRESION.IVAUSU = "";
          break;
      }
      switch (this.form.puertaingreso_SAL401.substring(0, 1)) {
        case "1":
          SAL41.IMPRESION.PUERTAW = "A1";
          break;
        case "2":
          SAL41.IMPRESION.PUERTAW = "CE";
          break;
        case "3":
          SAL41.IMPRESION.PUERTAW = "RE";
          break;
        case "4":
          SAL41.IMPRESION.PUERTAW = "NA";
          break;
      }
      switch (prefijofacturaMask_SAL401.value) {
        case "E":
          SAL41.IMPRESION.FPAGO = "CONTADO";
          break;
        case "C":
          SAL41.IMPRESION.FPAGO = "CREDITO";
          break;
        case "P":
          SAL41.IMPRESION.FPAGO = "Hospit.";
          break;
        case "T":
          SAL41.IMPRESION.FPAGO = "A. Trans";
          break;
        default:
          SAL41.IMPRESION.FPAGO = "Ambulat.";
          break;
      }
      switch (this.SAL401.PACIENTE.TIPO) {
        case "C":
          SAL41.IMPRESION.TIPOUSUW = "CONTR.";
          break;
        case "S":
          SAL41.IMPRESION.TIPOUSUW = "SUBSID";
          break;
        case "V":
          SAL41.IMPRESION.TIPOUSUW = "VINCUL";
          break;
        case "P":
          SAL41.IMPRESION.TIPOUSUW = "PARTIC";
          break;
        case "O":
          SAL41.IMPRESION.TIPOUSUW = "OTRO";
          break;
        default:
          SAL41.IMPRESION.TIPOUSUW = this.SAL401.PACIENTE.TIPO;
          break;
      }
      if ($_USUA_GLOBAL[0].BARRAS == "N") {
        SAL41.IMPRESION.CODIGOBARRAS = "";
      }
      if ($_USUA_GLOBAL[0].BARRAS != "N") {
        SAL41.IMPRESION.CODIGOBARRAS = `${this.form.sucursal_SAL401}${
          clasedeservicioMask_SAL401.value
        }${comprobanteMask_SAL401.value.padStart(6, "0")}`;
      }
      SAL41.IMPRESION.DIRECCIONUSU = $_USUA_GLOBAL[0].DIRECC;
      SAL41.IMPRESION.TELEFONOUSU = $_USUA_GLOBAL[0].TEL.trim();
      SAL41.IMPRESION.NOMBRECIUUSU = $_USUA_GLOBAL[0].NOMBRE_CIU;
      SAL41.IMPRESION.CLASESERVICIO = `${clasedeservicioMask_SAL401.value} - ${this.form.clasedeserviciod_SAL401}`;
      SAL41.IMPRESION.FECHAFACT = moment(fechafacturaMask_SAL401.value.replace(/-/g, ""))
        .format("MMMM DD/YY")
        .toUpperCase();
      SAL41.IMPRESION.FECHAACT = moment().format("YYYYMMDD HH:mm");
      SAL41.IMPRESION.FACTURA = `${prefijofacturaMask_SAL401.value}${numerofacturaMask_SAL401.value.padStart(6, "0")}`;
      SAL41.IMPRESION.COMPROBANTE = comprobanteMask_SAL401.value.padStart(6, "0");
      SAL41.IMPRESION.DESCRIPTER = this.form.cliented_SAL401;
      SAL41.IMPRESION.CODIGOEPS = this.SAL401.PACIENTE.EPS;
      SAL41.IMPRESION.ATIENDE = this.form.atendidod_SAL401;
      SAL41.IMPRESION.ESPECIALIDAD = `${this.form.especialidad_SAL401} ${this.form.especialidadd_SAL401}`;
      SAL41.IMPRESION.COSTO = `${this.form.centrocostos_SAL401} ${this.form.centroccostosd_SAL401}`;
      SAL41.IMPRESION.PACIENTE = `${parseInt(idhistoriafactMask_SAL401.value)} ${this.SAL401.PACIENTE["TIPO-ID"]} ${
        this.form.paciented_SAL401
      }`;
      SAL41.IMPRESION.UNSERVFACT = this.form.unidaddeservicio_SAL401.substring(0, 2);
      SAL41.IMPRESION.OCUPACION = SAL41.OCUPACION;
      SAL41.IMPRESION.EDAD = `${this.SAL401.PACIENTE.EDAD.unid_edad}${this.SAL401.PACIENTE.EDAD.vlr_edad
        .toString()
        .padStart(3, "0")}`;
      SAL41.IMPRESION.SEXO = this.SAL401.PACIENTE.SEXO;
      SAL41.IMPRESION.CIUDAD = this.SAL401.PACIENTE.CIUDAD;
      SAL41.IMPRESION.ZONA = this.SAL401.PACIENTE.ZONA;
      SAL41.IMPRESION.DETALLE = this.SAL401.DETALLE;
      SAL41.IMPRESION.NROAUTOR = this.SAL401.NROAUTOR;
      SAL41.IMPRESION.SOLICITA = this.form.solicd_SAL401;
      let valorenletra = FAC146(netofacturaMask_SAL401.value.replace(/,/g, ""));
      SAL41.IMPRESION.SON = "SON : " + valorenletra;
      if (data) SAL41.IMPRESION.ORIGINAL = "*** ORIGINAL ***";
      else SAL41.IMPRESION.ORIGINAL = "*** COPIA ****";

      SAL41.IMPRESION.TABLA = this.FACTURACION;
      SAL41.IMPRESION.COLUMNAS = ["ARTICULO", "DESCRIPCIONART", "CANTIDAD", "VALORUNIT", "VALORTOTAL"];
      SAL41.IMPRESION.ACCESO = this.form.puertaingreso_SAL401.substring(0, 1);
      SAL41.IMPRESION.BARRASFACT = $_USUA_GLOBAL[0].BARRAS;
      // SAL41.IMPRESION.NUMEROBARRAFACT = $_SUCFACT + $_CLFACT + $_NROCTAFACT;
      // SAL41.IMPRESION.FECHAELABORADO = $_FECHASALESTAD + ' ' + $_HRELABFACT + ':' + $_MNELABFACT;
      SAL41.IMPRESION.FECHAELABORADO = `${this.SAL401.FECHAELAB} ${this.SAL401.HORAELAB}`;
      // SAL41.IMPRESION.RESOLDIAN = $_USUA_GLOBAL[0].RESOL_DIAN;
      for (var i in this.SAL401.PREFIJOS.TABLA) {
        if (this.SAL401.PREFIJOS.TABLA[i].PREFIJO.trim() == $_PREFIJOFACT.trim()) {
          this.SAL401.IMPRESION.RESOLDIAN = SAL41.PREFIJOS.TABLA[i].AUT_DIAN;
        }
      }
      SAL41.IMPRESION.VLRIVAFACT = this.SAL401.VLRIVAFACT;
      SAL41.IMPRESION.VLRTOTAL = netofacturaMask_SAL401.value;
      // if ($_COPAGOESTIMFACT.trim() == '') $_COPAGOESTIMFACT = '0';
      SAL41.IMPRESION.COPAGO = copagoestimfactMask_SAL401.value;
      // let saldo = parseInt($_VALORTOTAL) - $_COPAGOESTIMFACT;
      SAL41.IMPRESION.SALDO = valortotalcomprobanteMask_SAL401.value;
      SAL41.IMPRESION.OPERELABFACT = this.SAL401.OPERELAB;
      SAL41.IMPRESION.OPERCORRECFACT = this.SAL401.OPERCORREC;
      SAL41.IMPRESION.ADMINW = localStorage.Usuario;
      let prefijo = this.SAL401.PREFIJOS[0].TABLA.filter(
        (x) => x.PREFIJO.trim() == prefijofacturaMask_SAL401.value.trim()
      );
      console.log(prefijo);
      if (prefijo.length == 0) {
        prefijo[0] = new Object();
        prefijo[0].AUT_DIAN = "";
        prefijo[0].PREFIJO = prefijofacturaMask_SAL401.value;
        prefijo[0].DESDE_NRO = "";
        prefijo[0].HASTA_NRO = "";
      }
      SAL41.IMPRESION.PREFIJO = prefijo;
      _INV411(SAL41.IMPRESION, () => {
        CON851("", "Se ha impreso el comprobante", null, "success", "Exito");
        this._finImpresion_SAL401();
      });
    },
    _imprimirINV412_SAL401(data) {
      let SAL41 = new Object();
      SAL41.IMPRESION = [];
      SAL41.IMPRESION.NOMBREUSU = $_USUA_GLOBAL[0].NOMBRE;
      SAL41.IMPRESION.NIT = $_USUA_GLOBAL[0].NIT;
      SAL41.IMPRESION.NITUSU = $_USUA_GLOBAL[0].NIT.toString();
      switch ($_USUA_GLOBAL[0].IVA_S) {
        case "C":
          SAL41.IMPRESION.IVAUSU = "IVA REG. COMUN-RETENEDOR";
          break;
        case "S":
          SAL41.IMPRESION.IVAUSU = "IVA REGIMEN SIMPLIFICADO";
          break;
        case "N":
          SAL41.IMPRESION.IVAUSU = "NO RESPONSABLES DE IVA";
          break;
        default:
          SAL41.IMPRESION.IVAUSU = "";
          break;
      }
      switch (prefijofacturaMask_SAL401.value) {
        case "E":
          SAL41.IMPRESION.FPAGO = "F.PAGO: CONTADO";
          break;
        case "C":
          SAL41.IMPRESION.FPAGO = "F.PAGO: CREDITO";
          break;
        case "P":
          SAL41.IMPRESION.FPAGO = "F.PAGO: Hospit.";
          break;
        case "T":
          SAL41.IMPRESION.FPAGO = "F.PAGO: A. Trans";
          break;
        default:
          SAL41.IMPRESION.FPAGO = "F.PAGO: Ambulat.";
          break;
      }
      SAL41.IMPRESION.DIRECCIONUSU = $_USUA_GLOBAL[0].DIRECC;
      SAL41.IMPRESION.TELEFONOUSU = $_USUA_GLOBAL[0].TEL.trim();
      SAL41.IMPRESION.NOMBRECIUUSU = $_USUA_GLOBAL[0].NOMBRE_CIU;
      let departamento = $_USUA_GLOBAL[0].COD_CIUD.substring(0, 2).padEnd(5, "0");
      let depart = this.SAL401.CIUDADES.filter((x) => x.COD == departamento);
      if (depart.length > 0) SAL41.IMPRESION.DEPARTAMENTOUSU = depart[0].NOMBRE;
      else this.SAL401.IMPRESION.DEPARTAMENTOUSU = "";
      SAL41.IMPRESION.FECHAFACT =
        "FECHA: " + moment(fechafacturaMask_SAL401.value.replace(/-/g, "")).format("MMMM DD/YY").toUpperCase();
      SAL41.IMPRESION.FACTURA = `${prefijofacturaMask_SAL401.value}${numerofacturaMask_SAL401.value.padStart(6, "0")}`;
      SAL41.IMPRESION.DESCRIPTER = this.form.cliented_SAL401;
      SAL41.IMPRESION.NITTER = clienteMask_SAL401.value;
      departamento = this.SAL401.CLIENTE.CODCIU.substring(0, 2).padEnd(5, "0");
      depart = this.SAL401.CIUDADES.filter((x) => x.COD == departamento);
      if (depart.length > 0) SAL41.IMPRESION.DEPARTAMENTOTER = depart[0].NOMBRE;
      else SAL41.IMPRESION.DEPARTAMENTOTER = SAL41.IMPRESION.DEPARTAMENTOUSU;
      SAL41.IMPRESION.TABLA = this.FACTURACION;
      SAL41.IMPRESION.ACCESO = this.form.puertaingreso_SAL401.substring(0, 1);
      SAL41.IMPRESION.BARRASFACT = $_USUA_GLOBAL[0].BARRAS;
      SAL41.IMPRESION.FECHAELABORADO = `${this.SAL401.FECHAELAB} ${this.SAL401.HORAELAB}`;
      for (var i in this.SAL401.PREFIJOS.TABLA) {
        if (this.SAL401.PREFIJOS.TABLA[i].PREFIJO.trim() == $_PREFIJOFACT.trim()) {
          this.SAL401.IMPRESION.RESOLDIAN = SAL41.PREFIJOS.TABLA[i].AUT_DIAN;
        }
      }
      let cantidadtotal = 0;
      for (var i in this.FACTURACION) {
        if (this.FACTURACION[i].CANTIDAD.trim() != "") {
          cantidadtotal = parseInt(this.FACTURACION[i].CANTIDAD) + cantidadtotal;
        }
      }
      SAL41.IMPRESION.CANTIDADTOTAL = cantidadtotal;
      SAL41.IMPRESION.VLRIVAFACT = this.SAL401.VLRIVAFACT;
      SAL41.IMPRESION.VLRTOTAL = numeroencomas(parseFloat(netofacturaMask_SAL401.value.replace(/,/g, "")));
      SAL41.IMPRESION.COPAGO = copagoestimfactMask_SAL401.value;
      let copago = parseInt(copagoestimfactMask_SAL401.unmaskedValue);
      if (isNaN(copago)) copago = 0;
      let saldo = parseFloat(netofacturaMask_SAL401.value.replace(/,/g, "")) - copago;
      SAL41.IMPRESION.SALDO = numeroencomas(saldo);
      _INV412(SAL41.IMPRESION, () => {
        CON851("", "Se ha impreso el comprobante", null, "success", "Exito");
        this._finImpresion_SAL401();
      });
    },
    _finImpresion_SAL401() {
      $("#NITMEDICO_SAL401").addClass("hidden");
      $("#CLASEARTICULO_SAL401").addClass("hidden");
      $("#CODMACRO_SAL401").addClass("hidden");
      $("#CRONICO_SAL401").addClass("hidden");
      $("#FORMACOPAGO_SAL401").addClass("hidden");
      $("#TIPOCOPAGO_SAL401").addClass("hidden");
      $("#CLASSERV_450").addClass("hidden");
      $("#CODIGODIAG_SAL401").addClass("hidden");
      $("#ESPECIALIDADREMITE_SAL401").addClass("hidden");
      $("#INGRESO_SAL401").addClass("hidden");
      $("#CLASEPROCE_SAL401").addClass("hidden");
      $("#EMBARAZO_SAL401").addClass("hidden");
      $("#TIPOPROCEDIMIENTO_SAL401").addClass("hidden");
      $("#OPERCREA_SAL401").addClass("hidden");
      $(".page-breadcrumb")[1].remove();
      this.form.clasedeserviciod_SAL401 = "";
      this.form.cliented_SAL401 = "";
      this.form.puertaingreso_SAL401 = "";
      this.form.paciented_SAL401 = "";
      this.form.sexo_SAL401 = "";
      this.form.edad_SAL401 = "";
      this.form.especialidad_SAL401 = "";
      this.form.especialidadd_SAL401 = "";
      this.form.centrocostos_SAL401 = "";
      this.form.centroccostosd_SAL401 = "";
      this.form.convenio_SAL401 = "";
      this.form.estrato_SAL401 = "";
      this.form.ciudad_SAL401 = "";
      this.form.atendidod_SAL401 = "";
      this.form.solicd_SAL401 = "";
      this.form.tipoafiliacion_SAL401 = "";
      this.form.cap_SAL401 = "";
      this.form.unidaddeservicio_SAL401 = "";
      clasedeservicioMask_SAL401.typedValue = "";
      comprobanteMask_SAL401.typedValue = "";
      clienteMask_SAL401.typedValue = "";
      idhistoriafactMask_SAL401.typedValue = "";
      fechafacturaMask_SAL401.typedValue = "";
      prefijofacturaMask_SAL401.typedValue = "";
      numerofacturaMask_SAL401.typedValue = "";
      valortotalcomprobanteMask_SAL401.typedValue = "";
      porcentajecopagoMask_SAL401.typedValue = "";
      copagoestimfactMask_SAL401.typedValue = "";
      netofacturaMask_SAL401.typedValue = "";
      atendidoMask_SAL401.typedValue = "";
      solicitanteMask_SAL401.typedValue = "";
      $("#CIRUGIA_SAL401").addClass("hidden");
      this.FACTURACION = [];
      this._validarOpcion_SAL41();
    },
    _datohonorarios_SAL401() {
      _FloatText({ estado: "off" });
      valorunitarioMask_SAL401.typedValue = "0";
      if (
        fechafacturaMask_SAL401.value.replace(/-/g, "").substring(2, 4) > 01 &&
        this.SAL401.ARTICULO.FORMALIQ == "2"
      ) {
        if (clasedeservicioMask_SAL401.value == "1" || this.SAL401.CODTABW == "SO") {
          this.SAL401.ARTICULO.FORMALIQ = "4";
        }
      }
      switch (this.SAL401.ARTICULO.FORMALIQ) {
        case "1":
          this.SAL401.VLRCIRUW =
            parseFloat(this.SAL401.ARTICULO.MONTO) * parseFloat(this.SAL401.CONVENIO.TABLA_TAR[29].HNQUIRTAR);
          this.SAL401.VLRAYUDW =
            parseFloat(this.SAL401.ARTICULO.MONTO) * parseFloat(this.SAL401.CONVENIO.TABLA_TAR[29].HNAYUDTAR);
          this.SAL401.VLRANESW =
            parseFloat(this.SAL401.ARTICULO.MONTO) * parseFloat(this.SAL401.CONVENIO.TABLA_TAR[29].HNANESTAR);
          if (this.SAL401.ARTICULO.MONTO < 21) {
            this.SAL401.J = "0";
          } else {
            if (this.SAL401.ARTICULO.MONTO < 31) {
              this.SAL401.J = "1";
            } else {
              if (this.SAL401.ARTICULO.MONTO < 41) {
                this.SAL401.J = "2";
              } else {
                if (this.SAL401.ARTICULO.MONTO < 51) {
                  this.SAL401.J = "3";
                } else {
                  if (this.SAL401.ARTICULO.MONTO < 61) {
                    this.SAL401.J = "4";
                  } else {
                    if (this.SAL401.ARTICULO.MONTO < 71) {
                      this.SAL401.J = "5";
                    } else {
                      if (this.SAL401.ARTICULO.MONTO < 81) {
                        this.SAL401.J = "6";
                      } else {
                        if (this.SAL401.ARTICULO.MONTO < 91) {
                          this.SAL401.J = "7";
                        } else {
                          if (this.SAL401.ARTICULO.MONTO < 101) {
                            this.SAL401.J = "8";
                          } else {
                            if (this.SAL401.ARTICULO.MONTO < 111) {
                              this.SAL401.J = "9";
                            } else {
                              if (this.SAL401.ARTICULO.MONTO < 131) {
                                this.SAL401.J = "10";
                              } else {
                                if (this.SAL401.ARTICULO.MONTO < 151) {
                                  this.SAL401.J = "11";
                                } else {
                                  if (this.SAL401.ARTICULO.MONTO < 171) {
                                    this.SAL401.J = "12";
                                  } else {
                                    if (this.SAL401.ARTICULO.MONTO < 201) {
                                      this.SAL401.J = "13";
                                    } else {
                                      if (this.SAL401.ARTICULO.MONTO < 231) {
                                        this.SAL401.J = "14";
                                      } else {
                                        if (this.SAL401.ARTICULO.MONTO < 261) {
                                          this.SAL401.J = "15";
                                        } else {
                                          if (this.SAL401.ARTICULO.MONTO < 291) {
                                            this.SAL401.J = "16";
                                          } else {
                                            if (this.SAL401.ARTICULO.MONTO < 321) {
                                              this.SAL401.J = "17";
                                            } else {
                                              if (this.SAL401.ARTICULO.MONTO < 351) {
                                                this.SAL401.J = "18";
                                              } else {
                                                if (this.SAL401.ARTICULO.MONTO < 381) {
                                                  this.SAL401.J = "19";
                                                } else {
                                                  if (this.SAL401.ARTICULO.MONTO < 411) {
                                                    this.SAL401.J = "20";
                                                  } else {
                                                    this.SAL401.J = "21";
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          this.SAL401.VLRSALAW = this.SAL401.CONVENIO.TABLA_TAR[this.SAL401.J].DRSALATAR;
          this.SAL401.VLRMATW = this.SAL401.CONVENIO.TABLA_TAR[this.SAL401.J].MATQUITAR;
          break;
        case "2":
          this.SAL401.J = this.SAL401.MONTO;
          this.SAL401.VLRCIRUW = this.SAL401.CONVENIO.TABLA_TAR[this.SAL401.J].HNQUIRTAR;
          this.SAL401.VLRAYUDW = this.SAL401.CONVENIO.TABLA_TAR[this.SAL401.J].HNAYUDTAR;
          this.SAL401.VLRANESW = this.SAL401.CONVENIO.TABLA_TAR[this.SAL401.J].HNANESTAR;
          if (this.form.codigodeservicio_SAL401(0, 2) == "72" || this.form.codigodeservicio_SAL401(0, 2) == "73") {
            this.SAL401.VLRMATW = "0";
          } else {
            this.SAL401.VLRMATW = this.SAL401.CONVENIO.TABLA_TAR[this.SAL401.J].MATQUITAR;
          }
          if (this.SAL401.CRUENTAFACT == "2") {
            this.SAL401.VLRSALAW = parseFloat(this.SAL401.CONVENIO.TABLA_TAR[this.SAL401.J].DRSALATAR) * 0.45;
          } else {
            this.SAL401.VLRSALAW = this.SAL401.CONVENIO.TABLA_TAR[this.SAL401.J].DRSALATAR;
          }
          break;
        case "4":
          this.SAL401.J = parseInt(this.SAL401.ARTICULO.MONTO);
          this.SAL401.VLRCIRUW = this.SAL401.CONVENIO.TABLA_TAR[this.SAL401.J].HNQUIRTAR;
          this.SAL401.VLRAYUDW = this.SAL401.CONVENIO.TABLA_TAR[this.SAL401.J].HNAYUDTAR;
          this.SAL401.VLRANESW = this.SAL401.CONVENIO.TABLA_TAR[this.SAL401.J].HNANESTAR;
          if (
            this.form.codigodeservicio_SAL401.substring(0, 2) == "72" ||
            this.form.codigodeservicio_SAL401.substring(0, 2) == "73"
          ) {
            this.SAL401.VLRMATW = "0";
          } else {
            this.SAL401.VLRMATW = this.SAL401.CONVENIO.TABLA_TAR[this.SAL401.J].MATQUITAR;
          }
          if (this.SAL401.CRUENTAFACT == "2") {
            this.SAL401.VLRSALAW = parseFloat(this.SAL401.CONVENIO.TABLA_TAR[this.SAL401.J].DRSALATAR) * 0.45;
          } else {
            this.SAL401.VLRSALAW = this.SAL401.CONVENIO.TABLA_TAR[this.SAL401.J].DRSALATAR;
          }
          break;
        default:
          this.SAL401.VLRCIRUW = 0;
          this.SAL401.VLRAYUDW = 0;
          this.SAL401.VLRANESW = 0;
          this.SAL401.VLRMATW = 0;
          this.SAL401.VLRSALAW = 0;
          break;
      }
      if (this.SAL401.CONVENIO.COD == "H4") {
        this.SAL401.VLRCIRUW = (this.SAL401.VLRCIRUW / this.SAL401.SWAPR) * this.SAL401.SWAPR;
        this.SAL401.VLRAYUDW = (this.SAL401.VLRAYUDW / this.SAL401.SWAPR) * this.SAL401.SWAPR;
        this.SAL401.VLRANESW = (this.SAL401.VLRANESW / this.SAL401.SWAPR) * this.SAL401.SWAPR;
        this.SAL401.VLRMATW = (this.SAL401.VLRMATW / this.SAL401.SWAPR) * this.SAL401.SWAPR;
        this.SAL401.VLRSALAW = (this.SAL401.VLRSALAW / this.SAL401.SWAPR) * this.SAL401.SWAPR;
        this.SAL401.VLRCIRUW = this.SAL401.VLRCIRUW * this.SAL401.FACTORW;
        this.SAL401.VLRAYUDW = this.SAL401.VLRAYUDW * this.SAL401.FACTORW;
        this.SAL401.VLRANESW = this.SAL401.VLRANESW * this.SAL401.FACTORW;
        if (this.SAL401.FACTORW < 1) {
          this.SAL401.VLRMATW = this.SAL401.VLRMATW * this.SAL401.FACTORW;
          this.SAL401.VLRSALAW = this.SAL401.VLRSALAW * this.SAL401.FACTORW;
        } else {
          this.SAL401.VLRMATW = this.SAL401.VLRMATW * 1;
          this.SAL401.VLRSALAW = this.SAL401.VLRSALAW * 1;
        }
      } else {
        if ($_USUA_GLOBAL[0].NIT == 892000401) {
          this.SAL401.VLRCIRUW = (this.SAL401.VLRCIRUW / this.SAL401.SWAPR) * this.SAL401.SWAPR;
          this.SAL401.VLRCIRUW = this.SAL401.VLRCIRUW * this.SAL401.FACTORW;
          this.SAL401.VLRAYUDW = (this.SAL401.VLRAYUDW / this.SAL401.SWAPR) * this.SAL401.SWAPR;
          this.SAL401.VLRAYUDW = this.SAL401.VLRAYUDW * this.SAL401.FACTORW;
          this.SAL401.VLRANESW = (this.SAL401.VLRANESW / this.SAL401.SWAPR) * this.SAL401.SWAPR;
          this.SAL401.VLRANESW = this.SAL401.VLRANESW * this.SAL401.FACTORW;
          this.SAL401.VLRSALAW = (this.SAL401.VLRSALAW / this.SAL401.SWAPR) * this.SAL401.SWAPR;
          this.SAL401.VLRSALAW = this.SAL401.VLRSALAW * this.SAL401.FACTORW;
          if (this.SAL401.FACTORW < 1) {
            if (this.form.codigodeservicio_SAL401.trim() == "XX39305") {
              this.SAL401.VLRMATW = (this.SAL401.VLRMATW / this.SAL401.SWAPR) * this.SAL401.SWAPR;
              this.SAL401.VLRMATW = this.SAL401.VLRMATW * 1;
            } else {
              this.SAL401.VLRMATW = (this.SAL401.VLRMATW / this.SAL401.SWAPR) * this.SAL401.SWAPR;
              this.SAL401.VLRMATW = this.SAL401.VLRMATW * this.SAL401.FACTORW;
            }
          } else {
            this.SAL401.VLRMATW = (this.SAL401.VLRMATW / this.SAL401.SWAPR) * this.SAL401.SWAPR;
            this.SAL401.VLRMATW = this.SAL401.VLRMATW * this.SAL401.FACTORW;
          }
        } else {
          this.SAL401.VLRCIRUW = this.SAL401.VLRCIRUW * this.SAL401.FACTORW;
          this.SAL401.VLRAYUDW = this.SAL401.VLRAYUDW * this.SAL401.FACTORW;
          this.SAL401.VLRANESW = this.SAL401.VLRANESW * this.SAL401.FACTORW;
          this.SAL401.VLRSALAW = this.SAL401.VLRSALAW * this.SAL401.FACTORW;
          if (this.SAL401.FACTORW < 1) {
            if (this.form.codigodeservicio_SAL401.trim() == "XX39305") {
              this.SAL401.VLRMATW = this.SAL401.VLRMATW * 1;
            } else {
              this.SAL401.VLRMATW = this.SAL401.VLRMATW * this.SAL401.FACTORW;
            }
          } else {
            this.SAL401.VLRMATW = this.SAL401.VLRMATW * this.SAL401.FACTORW;
          }
        }
      }
      this._evaluarmedicocirugia_SAL401();
    },
    _evaluarmedicocirugia_SAL401() {
      $("#EVALUARCIRUGIA_SAL401").removeClass("hidden");
      $("#MEDICOCIRUGIA_SAL401").removeClass("hidden");
      $("#PRECIOCIRUGIA_SAL401").removeClass("hidden");
      if (this.SAL401.MEDCIR) nitmedicocirugia_SAL401.typedValue = parseInt(this.SAL401.MEDCIR).toString();
      validarInputs(
        {
          form: "#MEDICOCIRUGIA_SAL401",
          orden: "1",
        },
        () => {
          $("#MEDICOCIRUGIA_SAL401").addClass("hidden");
          $("#PRECIOCIRUGIA_SAL401").addClass("hidden");
          this._evaluarcodigoservicio_SAL401();
        },
        () => {
          this.SAL401.NROCIRFACT = "0";
          this.SAL401.MULTFACT = "1";
          postData(
            {
              datosh: `${datosEnvio()}${prefijofacturaMask_SAL401.value}${numerofacturaMask_SAL401.value.padStart(
                6,
                "0"
              )}|${this.form.sucursal_SAL401}${clasedeservicioMask_SAL401.value}${comprobanteMask_SAL401.value.padStart(
                6,
                "0"
              )}|${idhistoriafactMask_SAL401.unmaskedValue.padStart(15, "0")}|${fechafacturaMask_SAL401.value.replace(
                /-/g,
                ""
              )}|${this.SAL401.VIAFACT.padStart(2, "0")}|${nitmedicocirugia_SAL401.unmaskedValue.padStart(10, "0")}|`,
            },
            get_url("APP/SALUD/INV401M.DLL")
          )
            .then((data) => {
              console.debug(data);
              this.SAL401.INV401M = data.CIRUGIAS;
              this.SAL401.MULTFACT = this.SAL401.INV401M[0].MULT;
              this.SAL401.NROCIRFACT = this.SAL401.INV401M[0].NROCIR;
              this.SAL401.GRUPOCIRW = this.SAL401.INV401M[0].GRUPO;
              this.SAL401.DESCRIPMULT = this.SAL401.INV401M[0].DESCRIP;
              $_this = this;
              var ventanahonorarios_SAL41 = bootbox.dialog({
                message:
                  '<div class="col-12 text-center">' +
                  $_this.SAL401.MULTFACT +
                  " " +
                  $_this.SAL401.DESCRIPMULT +
                  "</div>",
                closeButton: false,
                buttons: {
                  aceptar: {
                    label: "Aceptar",
                    className: "btn-primary",
                    callback: function () {
                      ventanahonorarios_SAL41.on("off");
                      $_this._validarprofesionalcirugia_SAL401();
                    },
                  },
                },
              });
              ventanahonorarios_SAL41.init($(".modal-footer").hide());
              ventanahonorarios_SAL41.on("keyup", function (e) {
                $(".btn-primary").click();
              });
            })
            .catch((err) => {
              console.error(err);
              this._evaluarmedicocirugia_SAL401();
            });
        }
      );
    },
    _validarprofesionalcirugia_SAL401() {
      postData(
        { datosh: `${datosEnvio()}5||||${nitmedicocirugia_SAL401.unmaskedValue.trim().padStart(10, "0")}|||||||||||` },
        get_url("APP/SALUD/SAL401.DLL")
      )
        .then((data) => {
          console.log(data);
          this.SAL401.MEDCIR = nitmedicocirugia_SAL401.unmaskedValue.trim().padStart(10, "0");
          this.form.nitmedicocirugiad_SAL401 = data.DESCRIPCION;
          if (data.TABLA_CL[1] == "N") {
            CON851("82", "82", this._evaluarmedicocirugia_SAL401(), "error", "Error");
          } else {
            if (this.SAL401.MULTFACT == "6") {
              this.SAL401.VLRCIRUW = this.SAL401.VLRCIRUW * 1.75;
            } else {
              if (this.SAL401.NROCIRFACT == "00") this.SAL401.NROCIRFACT = "01";
              else if (this.SAL401.NROCIRFACT == "01") this.SAL401.NROCIRFACT = "01";
              else if (this.SAL401.NROCIRFACT == "02") {
                if (this.SAL401.GRUPOCIRW < this.SAL401.GRUPOCIRFACT) {
                  CON851("01", "01", null, "warning", "Advertencia!");
                }
                if (this.SAL401.MULTFACT == "2") {
                  if (this.SAL401.CONVENIO.COD == "I4") {
                    this.SAL401.VLRCIRUW = this.SAL401.VLRCIRUW * 0.4;
                  } else {
                    this.SAL401.VLRCIRUW = this.SAL401.VLRCIRUW * 0.5;
                  }
                } else if (this.SAL401.MULTFACT == "3") {
                  if (this.SAL401.CONVENIO.COD == "I4") {
                    this.SAL401.VLRCIRUW = this.SAL401.VLRCIRUW * 0.55;
                  } else {
                    this.SAL401.VLRCIRUW = this.SAL401.VLRCIRUW * 0.5;
                  }
                } else if (this.SAL401.MULTFACT == "4") {
                  this.SAL401.VLRCIRUW = this.SAL401.VLRCIRUW * 0.5;
                } else if (this.SAL401.MULTFACT == "5") {
                  if (this.SAL401.CONVENIO.COD == "I4") {
                    this.SAL401.VLRCIRUW = this.SAL401.VLRCIRUW * 0.65;
                  } else {
                    this.SAL401.VLRCIRUW = this.SAL401.VLRCIRUW * 0.75;
                  }
                } else {
                  this.SAL401.VLRCIRUW = this.SAL401.VLRCIRUW * 0.5;
                }
              } else {
                this.SAL401.VLRCIRUW = this.SAL401.VLRCIRUW * 0.5;
              }
              if (this.SAL401.CONVENIO.COD == "H4") {
                if ($_USUA_GLOBAL[0].PUC != "3") {
                  this.SAL401.VLRCIRUW = this.SAL401.VLRCIRUW / this.SAL401.SWAPR;
                  this.SAL401.VLRCIRUW = this.SAL401.VLRCIRUW * this.SAL401.SWAPR;
                }
              }
            }
            valorcirugiaMask_SAL401.typedValue = Math.round(this.SAL401.VLRCIRUW).toString();
            this._evaluarvalorcirugia_SAL401();
          }
        })
        .catch((error) => {
          console.error(error);
          this._evaluarmedicocirugia_SAL401();
        });
    },
    _evaluarvalorcirugia_SAL401() {
      validarInputs(
        {
          form: "#PRECIOCIRUGIA_SAL401",
          orden: "1",
        },
        this._evaluarmedicocirugia_SAL401,
        () => {
          if (this.FACTURACION[1]) {
            this.FACTURACION[1].ARTICULO = nitmedicocirugia_SAL401.unmaskedValue.padStart(10, "0");
            this.FACTURACION[1].DESCRIPCIONART = this.form.nitmedicocirugiad_SAL401;
            this.FACTURACION[1].VALORUNIT = valorcirugiaMask_SAL401.value.replace(/,/g, "");
            this.FACTURACION[1].VALORTOTAL = valorcirugiaMask_SAL401.value.replace(/,/g, "");
          } else {
            this.FACTURACION.push({
              ARTICULO: nitmedicocirugia_SAL401.unmaskedValue.padStart(10, "0"),
              DESCRIPCIONART: this.form.nitmedicocirugiad_SAL401,
              ALMACEN: this.form.almacen_SAL401.trim(),
              CODIGOLOTE: this.form.codlotefarmaceutico_SAL401.trim().padStart(9, "0"),
              CANTIDAD: cantidadMask_SAL401.value.replace(/,/g, ""),
              VALORUNIT: valorcirugiaMask_SAL401.value.replace(/,/g, ""),
              DIASTRATA: diastratamientoMask_SAL401.value,
              VALORTOTAL: valorcirugiaMask_SAL401.value.replace(/,/g, ""),
              UNIDAD: "",
            });
          }
          $("#MEDICOCIRUGIA_SAL401").addClass("hidden");
          $("#PRECIOCIRUGIA_SAL401").addClass("hidden");
          $("#AYUDANTE_SAL401").removeClass("hidden");
          $("#PRECIOAYUDANTE_SAL401").removeClass("hidden");
          this._evaluarayudante_SAL401();
        }
      );
    },
    _evaluarayudante_SAL401() {
      if (this.SAL401.MEDAYU) nitmedicocirugia_SAL401.typedValue = parseInt(this.SAL401.MEDAYU).toString();
      validarInputs(
        {
          form: "#AYUDANTE_SAL401",
          orden: "1",
        },
        () => {
          $("#MEDICOCIRUGIA_SAL401").removeClass("hidden");
          $("#PRECIOCIRUGIA_SAL401").removeClass("hidden");
          $("#AYUDANTE_SAL401").addClass("hidden");
          $("#PRECIOAYUDANTE_SAL401").addClass("hidden");
          this._evaluarmedicocirugia_SAL401();
        },
        () => {
          postData(
            {
              datosh: `${datosEnvio()}5||||${nitmedicoayudantia_SAL401.unmaskedValue
                .trim()
                .padStart(10, "0")}|||||||||||`,
            },
            get_url("APP/SALUD/SAL401.DLL")
          )
            .then((data) => {
              console.log(data);
              this.SAL401.MEDAYU = nitmedicoayudantia_SAL401.unmaskedValue.trim().padStart(10, "0");
              this.form.ayudantiad_SAL401 = data.DESCRIPCION;
              if (data.TABLA_CL[1] == "N") {
                CON851("82", "82", this._evaluarayudante_SAL401(), "error", "Error");
              } else {
                if (this.SAL401.MULTFACT == "6") {
                  this.SAL401.VLRAYUDW = this.SAL401.VLRAYUDW * 1.75;
                } else {
                  if (this.SAL401.NROCIRFACT == "00") this.SAL401.NROCIRFACT = "01";
                  else if (this.SAL401.NROCIRFACT == "01") this.SAL401.NROCIRFACT = "01";
                  else if (this.SAL401.NROCIRFACT == "02") {
                    if (this.SAL401.GRUPOCIRW < this.SAL401.GRUPOCIRFACT) {
                      CON851("01", "01", null, "warning", "Advertencia!");
                    }
                    if (this.SAL401.MULTFACT == "2") {
                      if (this.SAL401.CONVENIO.COD == "I4") {
                        this.SAL401.VLRAYUDW = this.SAL401.VLRAYUDW * 0.4;
                      } else {
                        this.SAL401.VLRAYUDW = this.SAL401.VLRAYUDW * 0.5;
                      }
                    } else if (this.SAL401.MULTFACT == "3") {
                      if (this.SAL401.CONVENIO.COD == "I4") {
                        this.SAL401.VLRAYUDW = this.SAL401.VLRAYUDW * 0.55;
                      } else {
                        this.SAL401.VLRAYUDW = this.SAL401.VLRAYUDW * 0.5;
                      }
                    } else if (this.SAL401.MULTFACT == "4") {
                      this.SAL401.VLRAYUDW = this.SAL401.VLRAYUDW * 0.5;
                    } else if (this.SAL401.MULTFACT == "5") {
                      if (this.SAL401.CONVENIO.COD == "I4") {
                        this.SAL401.VLRAYUDW = this.SAL401.VLRAYUDW * 0.65;
                      } else {
                        this.SAL401.VLRAYUDW = this.SAL401.VLRAYUDW * 0.75;
                      }
                    } else {
                      this.SAL401.VLRAYUDW = this.SAL401.VLRAYUDW * 0.5;
                    }
                  } else {
                    this.SAL401.VLRAYUDW = this.SAL401.VLRAYUDW * 0.5;
                  }
                  if (this.SAL401.CONVENIO.COD == "H4") {
                    if ($_USUA_GLOBAL[0].PUC != "3") {
                      this.SAL401.VLRAYUDW = this.SAL401.VLRAYUDW / this.SAL401.SWAPR;
                      this.SAL401.VLRAYUDW = this.SAL401.VLRAYUDW * this.SAL401.SWAPR;
                    }
                  }
                }
                valorayudantiaMask_SAL401.typedValue = Math.round(this.SAL401.VLRAYUDW).toString();
                this._evaluarvalorayudante_SAL401();
              }
            })
            .catch((error) => {
              console.error(error);
              this._evaluarayudante_SAL401();
            });
        }
      );
    },
    _evaluarvalorayudante_SAL401() {
      validarInputs(
        {
          form: "#PRECIOAYUDANTE_SAL401",
          orden: "1",
        },
        this._evaluarayudante_SAL401,
        () => {
          if (this.FACTURACION[2]) {
            this.FACTURACION[2].ARTICULO = nitmedicoayudantia_SAL401.unmaskedValue.padStart(10, "0");
            this.FACTURACION[2].DESCRIPCIONART = this.form.nitmedicocirugiad_SAL401;
            this.FACTURACION[2].VALORUNIT = valorayudantiaMask_SAL401.value.replace(/,/g, "");
            this.FACTURACION[2].VALORTOTAL = valorayudantiaMask_SAL401.value.replace(/,/g, "");
          } else {
            this.FACTURACION.push({
              ARTICULO: nitmedicoayudantia_SAL401.unmaskedValue.padStart(10, "0"),
              DESCRIPCIONART: this.form.nitmedicocirugiad_SAL401,
              ALMACEN: this.form.almacen_SAL401.trim(),
              CODIGOLOTE: this.form.codlotefarmaceutico_SAL401.trim().padStart(9, "0"),
              CANTIDAD: cantidadMask_SAL401.value.replace(/,/g, ""),
              VALORUNIT: valorayudantiaMask_SAL401.value.replace(/,/g, ""),
              DIASTRATA: diastratamientoMask_SAL401.value,
              VALORTOTAL: valorayudantiaMask_SAL401.value.replace(/,/g, ""),
              UNIDAD: "",
            });
          }
          $("#AYUDANTE_SAL401").addClass("hidden");
          $("#PRECIOAYUDANTE_SAL401").addClass("hidden");
          $("#ANESTESIOLOGO_SAL401").removeClass("hidden");
          $("#PRECIOANESTESIOLOGO_SAL401").removeClass("hidden");
          this._evaluaranestesiolgo_SAL401();
        }
      );
    },
    _evaluaranestesiolgo_SAL401() {
      if (this.SAL401.MEDANE) nitmedicocirugia_SAL401.typedValue = parseInt(this.SAL401.MEDANE).toString();
      validarInputs(
        {
          form: "#ANESTESIOLOGO_SAL401",
          orden: "1",
        },
        () => {
          $("#AYUDANTE_SAL401").removeClass("hidden");
          $("#AYUDANTE_SAL401").removeClass("hidden");
          $("#ANESTESIOLOGO_SAL401").addClass("hidden");
          $("#PRECIOANESTESIOLOGO_SAL401").addClass("hidden");
          this._evaluarayudante_SAL401();
        },
        () => {
          postData(
            {
              datosh: `${datosEnvio()}5||||${nitmedicoanesteciologo_SAL401.unmaskedValue
                .trim()
                .padStart(10, "0")}|||||||||||`,
            },
            get_url("APP/SALUD/SAL401.DLL")
          )
            .then((data) => {
              console.log(data);
              this.SAL401.MEDANE = nitmedicoanesteciologo_SAL401.unmaskedValue.trim().padStart(10, "0");
              this.form.anestesiad_SAL401 = data.DESCRIPCION;
              if (data.TABLA_CL[1] == "N") {
                CON851("82", "82", this._evaluaranestesiolgo_SAL401(), "error", "Error");
              } else {
                if (this.SAL401.MULTFACT == "6") {
                  this.SAL401.VLRANESW = this.SAL401.VLRANESW * 1.75;
                } else {
                  if (this.SAL401.NROCIRFACT == "00") this.SAL401.NROCIRFACT = "01";
                  else if (this.SAL401.NROCIRFACT == "01") this.SAL401.NROCIRFACT = "01";
                  else if (this.SAL401.NROCIRFACT == "02") {
                    if (this.SAL401.GRUPOCIRW < this.SAL401.GRUPOCIRFACT) {
                      CON851("01", "01", null, "warning", "Advertencia!");
                    }
                    if (this.SAL401.MULTFACT == "2") {
                      if (this.SAL401.CONVENIO.COD == "I4") {
                        this.SAL401.VLRANESW = this.SAL401.VLRANESW * 0.4;
                      } else {
                        this.SAL401.VLRANESW = this.SAL401.VLRANESW * 0.5;
                      }
                    } else if (this.SAL401.MULTFACT == "3") {
                      if (this.SAL401.CONVENIO.COD == "I4") {
                        this.SAL401.VLRANESW = this.SAL401.VLRANESW * 0.55;
                      } else {
                        this.SAL401.VLRANESW = this.SAL401.VLRANESW * 0.5;
                      }
                    } else if (this.SAL401.MULTFACT == "4") {
                      this.SAL401.VLRANESW = this.SAL401.VLRANESW * 0.5;
                    } else if (this.SAL401.MULTFACT == "5") {
                      if (this.SAL401.CONVENIO.COD == "I4") {
                        this.SAL401.VLRANESW = this.SAL401.VLRANESW * 0.65;
                      } else {
                        this.SAL401.VLRANESW = this.SAL401.VLRANESW * 0.75;
                      }
                    } else {
                      this.SAL401.VLRANESW = this.SAL401.VLRANESW * 0.5;
                    }
                  } else {
                    this.SAL401.VLRANESW = this.SAL401.VLRANESW * 0.5;
                  }
                  if (this.SAL401.CONVENIO.COD == "H4") {
                    if ($_USUA_GLOBAL[0].PUC != "3") {
                      this.SAL401.VLRANESW = this.SAL401.VLRANESW / this.SAL401.SWAPR;
                      this.SAL401.VLRANESW = this.SAL401.VLRANESW * this.SAL401.SWAPR;
                    }
                  }
                }
                valoranestesiologoMask_SAL401.typedValue = Math.round(this.SAL401.VLRANESW).toString();
                this._evaluarvaloranestesiologo_SAL401();
              }
            })
            .catch((error) => {
              console.error(error);
              this._evaluaranestesiolgo_SAL401();
            });
        }
      );
    },
    _evaluarvaloranestesiologo_SAL401() {
      validarInputs(
        {
          form: "#PRECIOANESTESIOLOGO_SAL401",
          orden: "1",
        },
        this._evaluaranestesiolgo_SAL401,
        () => {
          if (this.FACTURACION[3]) {
            this.FACTURACION[3].ARTICULO = nitmedicoanesteciologo_SAL401.unmaskedValue.padStart(10, "0");
            this.FACTURACION[3].DESCRIPCIONART = this.form.nitmedicocirugiad_SAL401;
            this.FACTURACION[3].VALORUNIT = valoranestesiologoMask_SAL401.value.replace(/,/g, "");
            this.FACTURACION[3].VALORTOTAL = valoranestesiologoMask_SAL401.value.replace(/,/g, "");
          } else {
            this.FACTURACION.push({
              ARTICULO: nitmedicoanesteciologo_SAL401.unmaskedValue.padStart(10, "0"),
              DESCRIPCIONART: this.form.nitmedicocirugiad_SAL401,
              ALMACEN: this.form.almacen_SAL401.trim(),
              CODIGOLOTE: this.form.codlotefarmaceutico_SAL401.trim().padStart(9, "0"),
              CANTIDAD: cantidadMask_SAL401.value.replace(/,/g, ""),
              VALORUNIT: valoranestesiologoMask_SAL401.value.replace(/,/g, ""),
              DIASTRATA: diastratamientoMask_SAL401.value,
              VALORTOTAL: valoranestesiologoMask_SAL401.value.replace(/,/g, ""),
              UNIDAD: "",
            });
          }
          $("#ANESTESIOLOGO_SAL401").addClass("hidden");
          $("#PRECIOANESTESIOLOGO_SAL401").addClass("hidden");
          $("#MATQUIRURG_SAL401").removeClass("hidden");
          if (this.SAL401.MULTFACT == "6") {
            this.SAL401.VLRMATW = this.SAL401.VLRMATW * 1.75;
          } else {
            if (this.SAL401.NROCIRFACT == "00") this.SAL401.NROCIRFACT = "01";
            else if (this.SAL401.NROCIRFACT == "01") this.SAL401.NROCIRFACT = "01";
            else if (this.SAL401.NROCIRFACT == "02") {
              if (this.SAL401.GRUPOCIRW < this.SAL401.GRUPOCIRFACT) {
                CON851("01", "01", null, "warning", "Advertencia!");
              }
              if (this.SAL401.MULTFACT == "2") {
                if (this.SAL401.CONVENIO.COD == "I4") {
                  this.SAL401.VLRMATW = this.SAL401.VLRMATW * 0.4;
                } else {
                  this.SAL401.VLRMATW = this.SAL401.VLRMATW * 0.5;
                }
              } else if (this.SAL401.MULTFACT == "3") {
                if (this.SAL401.CONVENIO.COD == "I4") {
                  this.SAL401.VLRMATW = this.SAL401.VLRMATW * 0.55;
                } else {
                  this.SAL401.VLRMATW = this.SAL401.VLRMATW * 0.5;
                }
              } else if (this.SAL401.MULTFACT == "4") {
                this.SAL401.VLRMATW = this.SAL401.VLRMATW * 0.5;
              } else if (this.SAL401.MULTFACT == "5") {
                if (this.SAL401.CONVENIO.COD == "I4") {
                  this.SAL401.VLRMATW = this.SAL401.VLRMATW * 0.65;
                } else {
                  this.SAL401.VLRMATW = this.SAL401.VLRMATW * 0.75;
                }
              } else {
                this.SAL401.VLRMATW = this.SAL401.VLRMATW * 0.5;
              }
            } else {
              this.SAL401.VLRMATW = this.SAL401.VLRMATW * 0.5;
            }
            if (this.SAL401.CONVENIO.COD == "H4") {
              if ($_USUA_GLOBAL[0].PUC != "3") {
                this.SAL401.VLRMATW = this.SAL401.VLRMATW / this.SAL401.SWAPR;
                this.SAL401.VLRMATW = this.SAL401.VLRMATW * this.SAL401.SWAPR;
              }
            }
          }
          valormatquirurgicoMask_SAL401.typedValue = Math.round(this.SAL401.VLRMATW).toString();
          this._evaluarmatquirur_SAL401();
        }
      );
    },
    _evaluarmatquirur_SAL401() {
      validarInputs(
        {
          form: "#MATQUIRURG_SAL401",
          orden: "1",
        },
        () => {
          $("#ANESTESIOLOGO_SAL401").removeClass("hidden");
          $("#PRECIOANESTESIOLOGO_SAL401").removeClass("hidden");
          $("#MATQUIRURG_SAL401").addClass("hidden");
          this._evaluaranestesiolgo_SAL401();
        },
        () => {
          if (this.FACTURACION[4]) {
            this.FACTURACION[4].VALORUNIT = valorayudantiaMask_SAL401.value.replace(/,/g, "");
            this.FACTURACION[4].VALORTOTAL = valorayudantiaMask_SAL401.value.replace(/,/g, "");
          } else {
            this.FACTURACION.push({
              ARTICULO: " ",
              DESCRIPCIONART: " ",
              ALMACEN: this.form.almacen_SAL401.trim(),
              CODIGOLOTE: this.form.codlotefarmaceutico_SAL401.trim().padStart(9, "0"),
              CANTIDAD: cantidadMask_SAL401.value.replace(/,/g, ""),
              VALORUNIT: valormatquirurgicoMask_SAL401.value.replace(/,/g, ""),
              DIASTRATA: diastratamientoMask_SAL401.value,
              VALORTOTAL: valormatquirurgicoMask_SAL401.value.replace(/,/g, ""),
              UNIDAD: "",
            });
          }
          $("#MATQUIRURG_SAL401").addClass("hidden");
          $("#DERECHSALA_SAL401").removeClass("hidden");
          if (this.SAL401.MULTFACT == "6") {
            this.SAL401.VLRSALAW = this.SAL401.VLRSALAW * 1.75;
          } else {
            if (this.SAL401.NROCIRFACT == "00") this.SAL401.NROCIRFACT = "01";
            else if (this.SAL401.NROCIRFACT == "01") this.SAL401.NROCIRFACT = "01";
            else if (this.SAL401.NROCIRFACT == "02") {
              if (this.SAL401.GRUPOCIRW < this.SAL401.GRUPOCIRFACT) {
                CON851("01", "01", null, "warning", "Advertencia!");
              }
              if (this.SAL401.MULTFACT == "2") {
                if (this.SAL401.CONVENIO.COD == "I4") {
                  this.SAL401.VLRSALAW = this.SAL401.VLRSALAW * 0.4;
                } else {
                  this.SAL401.VLRSALAW = this.SAL401.VLRSALAW * 0.5;
                }
              } else if (this.SAL401.MULTFACT == "3") {
                if (this.SAL401.CONVENIO.COD == "I4") {
                  this.SAL401.VLRSALAW = this.SAL401.VLRSALAW * 0.55;
                } else {
                  this.SAL401.VLRSALAW = this.SAL401.VLRSALAW * 0.5;
                }
              } else if (this.SAL401.MULTFACT == "4") {
                this.SAL401.VLRSALAW = this.SAL401.VLRSALAW * 0.5;
              } else if (this.SAL401.MULTFACT == "5") {
                if (this.SAL401.CONVENIO.COD == "I4") {
                  this.SAL401.VLRSALAW = this.SAL401.VLRSALAW * 0.65;
                } else {
                  this.SAL401.VLRSALAW = this.SAL401.VLRSALAW * 0.75;
                }
              } else {
                this.SAL401.VLRSALAW = this.SAL401.VLRSALAW * 0.5;
              }
            } else {
              this.SAL401.VLRSALAW = this.SAL401.VLRSALAW * 0.5;
            }
            if (this.SAL401.CONVENIO.COD == "H4") {
              if ($_USUA_GLOBAL[0].PUC != "3") {
                this.SAL401.VLRSALAW = this.SAL401.VLRSALAW / this.SAL401.SWAPR;
                this.SAL401.VLRSALAW = this.SAL401.VLRSALAW * this.SAL401.SWAPR;
              }
            }
          }
          valorderechsalaMask_SAL401.typedValue = Math.round(this.SAL401.VLRSALAW).toString();
          this._evaluarderechsala_SAL401();
        }
      );
    },
    _evaluarderechsala_SAL401() {
      validarInputs(
        {
          form: "#DERECHSALA_SAL401",
          orden: "1",
        },
        () => {
          $("#MATQUIRURG_SAL401").removeClass("hidden");
          $("#DERECHSALA_SAL401").addClass("hidden");
          this._evaluarmatquirur_SAL401();
        },
        () => {
          if (this.FACTURACION[5]) {
            this.FACTURACION[5].VALORUNIT = valorderechsalaMask_SAL401.value.replace(/,/g, "");
            this.FACTURACION[5].VALORTOTAL = valorderechsalaMask_SAL401.value.replace(/,/g, "");
          } else {
            this.FACTURACION.push({
              ARTICULO: " ",
              DESCRIPCIONART: " ",
              ALMACEN: this.form.almacen_SAL401.trim(),
              CODIGOLOTE: this.form.codlotefarmaceutico_SAL401.trim().padStart(9, "0"),
              CANTIDAD: cantidadMask_SAL401.value.replace(/,/g, ""),
              VALORUNIT: valorderechsalaMask_SAL401.value.replace(/,/g, ""),
              DIASTRATA: diastratamientoMask_SAL401.value,
              VALORTOTAL: valorderechsalaMask_SAL401.value.replace(/,/g, ""),
              UNIDAD: "",
            });
          }
          $("#DERECHSALA_SAL401").addClass("hidden");
          this._datoabono_SAL401();
        }
      );
    },
    // FUNCIONES GLOBALES
    _consultarconsecutivo_SAL401(callback, esccallback, secuencia) {
      postData({ datosh: `${datosEnvio()}${secuencia}|` }, get_url("APP/CONTAB/CON007.DLL"))
        .then((data) => {
          var data = data.split("|");
          comprobanteMask_SAL401.typedValue = parseInt(data[1].substring(3, 9)).toString();
          callback();
        })
        .catch((err) => {
          console.error(err);
          esccallback();
        });
    },
    _grabarconsecutivo_SAL401(callback, esccallback, secuencia) {
      console.log("secuencia", secuencia);
      postData(
        {
          datosh: `${datosEnvio()}${secuencia}|${moment().format("YYMMDD")}|${comprobanteMask_SAL401.value.padStart(
            6,
            "0"
          )}|`,
        },
        get_url("APP/CONTAB/CON007X.DLL")
      )
        .then((data) => {
          var data = data.split("|");
          comprobanteMask_SAL401.typedValue = parseInt(data[1].substring(3, 9)).toString();
          callback();
        })
        .catch((err) => {
          console.error(err);
          esccallback();
        });
    },
    _totalizarylimpiarcampostabla_SAL401() {
      this.form.codigodeservicio_SAL401 = "";
      this.form.codigodeserviciod_SAL401 = "";
      if (clasedeservicioMask_SAL401.value == "0") this.form.clasearticulo_SAL401 = "";
      this.form.almacen_SAL401 = "";
      cantidadMask_SAL401.typedValue = "";
      valorunitarioMask_SAL401.typedValue = "";
    },
    _revisarpermisos_SAL401(callback, back, params) {
      postData(
        { datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|${params.CODIGO}|` },
        get_url("APP/CONTAB/CON904.DLL")
      )
        .then((data) => {
          callback(data);
        })
        .catch((err) => {
          console.error(err);
          back();
        });
    },
    _revisarbloqueos_SAL401(callback, back, params) {
      postData(
        {
          datosh: `${datosEnvio()}${localStorage.Usuario}|${params.CODIGO}|`,
        },
        get_url("APP/CONTAB/CON904S.DLL")
      )
        .then((data) => {
          callback(data);
        })
        .catch((error) => {
          console.error(error);
          back();
        });
    },
    _calcularmonto_SAL401(callback) {
      let clasedeservicio = clasedeservicioMask_SAL401.value;
      if (this.form.paquete_SAL401.toUpperCase() == "S") clasedeservicio = this.FACTURACION[this.SAL401.CONTEO].CLASE;
      if (clasedeservicio == "0") {
        if (
          this.SAL401.CONVENIO.BASE_MED == "1" ||
          this.SAL401.CONVENIO.BASE_MED == "2" ||
          this.SAL401.CONVENIO.BASE_MED == "3" ||
          this.SAL401.CONVENIO.BASE_MED == "4"
        ) {
          if (this.form.codigodeservicio_SAL401.trim().substring(0, 2) == "PO")
            this.SAL401.FACTORW = parseFloat(this.SAL401.CONVENIO.PORC_PO) / 100;
          else if (this.form.codigodeservicio_SAL401.trim().substring(0, 2) == "NP")
            this.SAL401.FACTORW = parseFloat(this.SAL401.CONVENIO.PORC_NP) / 100;
          else if (this.form.codigodeservicio_SAL401.trim().substring(0, 2) == "MO")
            this.SAL401.FACTORW = parseFloat(this.SAL401.CONVENIO.PORC_MO) / 100;
          else this.SAL401.FACTORW = parseFloat(this.SAL401.CONVENIO.PORC_MQ) / 100;
        } else {
          this.SAL401.FACTORW = 1;
          this.SAL401.CONVENIO.BASE_MED = "3";
        }
        this.SAL401.VLRUNITW = this.SAL401.VLRUNITW * this.SAL401.FACTORW * 1; // APROXIMAR VALOR
        // DLL LEER TABLA DE MEDICAMENTOS
      } else {
        if (
          clasedeservicioMask_SAL401.value == "4" &&
          (this.form.codigodeservicio_SAL401.trim().substring(2, 18) == "XXCAPITA" ||
            this.form.codigodeservicio_SAL401.trim().substring(2, 18) == "XXUTI")
        ) {
          this.SAL401.SWAPR = 1;
        } else {
          if (this.SAL401.ARTICULO.INCREMEN == 0) {
            if (clasedeservicioMask_SAL401.value == "7") {
              if (this.form.codigodeservicio_SAL401.trim().substring(0, 2) == "90") this.SAL401.ARTICULO.INCREMEN = "2";
              else if (this.form.codigodeservicio_SAL401.trim().substring(0, 2) == "87")
                this.SAL401.ARTICULO.INCREMEN = "3";
              else if (this.form.codigodeservicio_SAL401.trim().substring(0, 2) == "88")
                this.SAL401.ARTICULO.INCREMEN = "3";
              else if (this.form.codigodeservicio_SAL401.trim().substring(0, 2) == "89")
                this.SAL401.ARTICULO.INCREMEN = "5";
              else {
                if (this.form.codigodeservicio_SAL401.trim().substring(0, 2) < 97) {
                  this.SAL401.ARTICULO.INCREMEN = "1";
                } else {
                  this.SAL401.ARTICULO.INCREMEN = "4";
                }
              }
            } else {
              this.SAL401.ARTICULO.INCREMEN = clasedeservicioMask_SAL401.value;
            }
          }
          if (this.SAL401.CONVENIO.SAL_MIN == 0) {
            this.SAL401.CONVENIO.SAL_MIN = this.SAL401.SALMINW;
          }
          if (this.SAL401.ARTICULO.INCREMEN == "9") {
            this.SAL401.FACTORW = 1;
          } else {
            if (
              $_USUA_GLOBAL[0].NIT == 892000401 ||
              $_USUA_GLOBAL[0].NIT == 900475095 ||
              $_USUA_GLOBAL[0].NIT == 900708318
            ) {
              this.SAL401.FACTORW =
                parseFloat(this.SAL401.CONVENIO.TABLA_TAB[parseInt(this.SAL401.ARTICULO.INCREMEN) - 1].PORCTABTAR) /
                100;
            } else {
              this.SAL401.FACTORW =
                parseFloat(this.SAL401.CONVENIO.TABLA_TAB[parseInt(this.SAL401.ARTICULO.INCREMEN) - 1].PORCTABTAR) /
                100;
            }
          }
          if (this.SAL401.ARTICULO.FORMALIQ == "5" || this.SAL401.FACTORW == 0) {
            this.SAL401.FACTORW = 1;
          }
          if (this.SAL401.ARTICULO.FORMALIQ.trim() == "1") this.SAL401.SWAPR = 1;
          else if (this.SAL401.ARTICULO.FORMALIQ.trim() == "2") this.SAL401.SWAPR = 100;
          else if (this.SAL401.ARTICULO.FORMALIQ.trim() == "3") this.SAL401.SWAPR = 1;
          else if (this.SAL401.ARTICULO.FORMALIQ.trim() == "4") this.SAL401.SWAPR = 100;
          else if (this.SAL401.ARTICULO.FORMALIQ.trim() == "5") this.SAL401.SWAPR = 1;
          else this.SAL401.SWAPR = 1;
          // this.SAL401.FACTORW = this.SAL401.FACTORW / 100;
          if (
            $_USUA_GLOBAL[0].NIT == 892000401 ||
            $_USUA_GLOBAL[0].NIT == 900475095 ||
            $_USUA_GLOBAL[0].NIT == 900708318
          ) {
            this.SAL401.VLRUNITW = (this.SAL401.VLRUNITW * this.SAL401.FACTORW) / this.SAL401.SWAPR;
            // this.SAL401.VLRUNITW = Math.round(this.SAL401.VLRUNITW);
            this.SAL401.VLRUNITW = this.SAL401.VLRUNITW * this.SAL401.SWAPR;
          } else {
            this.SAL401.VLRUNITW = (this.SAL401.VLRUNITW * this.SAL401.FACTORW) / this.SAL401.SWAPR;
            // this.SAL401.VLRUNITW = Math.round(this.SAL401.VLRUNITW);
            this.SAL401.VLRUNITW = this.SAL401.VLRUNITW * this.SAL401.SWAPR;
          }
          if (
            clasedeservicioMask_SAL401.value == "1" &&
            (this.SAL401.ARTICULO.FORMALIQ == "2" || this.SAL401.ARTICULO.FORMALIQ == "4")
          ) {
            this.SAL401.VALOREDIT = this.SAL401.ARTICULO.MONTO;
          } else {
            this.SAL401.VALOREDIT = this.SAL401.VLRUNITW;
          }
          this.SAL401.VLRUNITW = Math.round(this.SAL401.VLRUNITW);
          this.SAL401.VLRLIMIW = this.SAL401.VLRUNITW * 3;
          console.log(this.SAL401.VLRUNITW);
          // REVISAR CALCULAR MONTO
        }
      }
      callback();
    },
    _leerpromedio_SAL401(callback, back, ventana) {
      let $_this = this;
      if (clasedeservicioMask_SAL401.value == "0") {
        if (this.SAL401.TIPODRFACT == "2") {
          return callback((data = { SDO_ACT: 0, VLR_UNIT: 0 }));
        }
      }
      if ($_USUA_GLOBAL[0].RESTRIC_EX == "S") {
        callback((data = { SDO_ACT: 0, VLR_UNIT: 0 }));
      } else {
        if (this.form.codigodeservicio_SAL401.substring(0, 1) != "9") {
          postData(
            {
              datosh: `${datosEnvio()}${this.form.almacen_SAL401.trim()}0${this.form.codigodeservicio_SAL401
                .trim()
                .padEnd(15, " ")}${this.form.clasearticulo_SAL401.trim().padEnd(2, " ")}|${moment().format("DD")}|`,
            },
            get_url("APP/INVENT/INV808.DLL")
          )
            .then((data) => {
              let sdoactcant = 0;
              let sdoactvlr = 0;
              for (var i in data.SALDOS) {
                let cantidad = parseFloat(data.SALDOS[i].SDO_ACT);
                if (isNaN(cantidad)) cantidad = 0;
                let valorunit = parseFloat(data.SALDOS[i].VLR_UNIT);
                if (isNaN(valorunit)) valorunit = 0;
                sdoactcant = sdoactcant + cantidad;
                sdoactvlr = sdoactvlr + cantidad * valorunit;
              }
              if (sdoactcant == 0 || sdoactvlr == 0) {
                this.SAL401.VLRPROMEDW = 0;
              } else {
                this.SAL401.VLRPROMEDW = sdoactvlr / sdoactcant;
              }
              data.SALDOS.pop();
              let saldos_filtrado = [];
              if ($_USUA_GLOBAL[0].NIT == 892000264 && clasedeservicioMask_SAL401.value == "0") {
                saldos_filtrado = data.SALDOS.filter((el) => el.COD_ALM == this.form.almacen_SAL401.trim() && el.SDO_ACT.trim());
              } else saldos_filtrado = data.SALDOS;

              if (this.form.almacen_SAL401.substring(0, 3) == "SIN")
                return callback((data = { SDO_ACT: 0, VLR_UNIT: 0 }));
              if (ventana) {
                _ventanaDatos({
                  titulo: "VENTANA DE SALDOS",
                  columnas: ["COD_ARTIC", "DESCRIP_ARTIC", "SDO_ACT", "COD_ALM"],
                  data: saldos_filtrado,
                  callback_esc: function () {
                    back();
                  },
                  callback: function (data) {
                    data.SDO_ACT.trim() == "" ? (data.SDO_ACT = "0.00") : null;
                    let negativo = data.SDO_ACT.indexOf("-");
                    let valor = parseInt(data.SDO_ACT.replace(/-/g, "").replace(/,/g, ""));
                    negativo >= 0 ? (valor = valor * -1) : null;
                    if (valor <= 0) {
                      CON851("07", "07", null, "error", "Error");
                      return back();
                    }
                    $_this.SAL401.SDOACTCANT = valor;
                    callback(data);
                  },
                });
              } else callback((data = { SDO_ACT: sdoactcant, VLR_UNIT: sdoactvlr }));
            })
            .catch((error) => {
              console.error(error);
              back();
            });
        } else {
          this.SAL401.VLRPROMEDW = 0;
          callback((data = { SDO_ACT: 0, VLR_UNIT: 0 }));
        }
      }
    },
    // SEGUNDAS VENTANAS //
    _agendarcitas_SAL401() {
      let { ipcRenderer } = require("electron");
      ipcRenderer.send("another", (datos = { directorio: "SALUD/paginas/SAL7C11.html" }));
      _EventocrearSegventana(["on", "Agendando una cita..."], this._evaluarclasedeservicios_SAL401);
    },
    _aperturadefacturas_SAL401() {
      // let { ipcRenderer } = require("electron");
      // ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/SER108.html' });
      // _EventocrearSegventana(['on', 'Creando o modificando una factura...'], this._evaluarclasedeservicios_SAL401);
      this.mostrarapertura = true;
      setTimeout(() => {
        this.params_apertura.estado = true;
      }, 300);
    },
    validarEsc_apertura() {
      this.mostrarapertura = false;
      setTimeout(() => {
        this.params_apertura.estado = false;
      }, 300);
      this._evaluarclasedeservicios_SAL401();
    },
    validarCallback_apertura() {
      this.mostrarapertura = false;
      setTimeout(() => {
        this.params_apertura.estado = false;
      }, 300);
      this._evaluarclasedeservicios_SAL401();
    },
    _triage_SAL401() {
      let { ipcRenderer } = require("electron");
      ipcRenderer.send("another", (datos = { directorio: "SALUD/paginas/SER880.html" }));
      _EventocrearSegventana(["on", "Triage..."], this._evaluarclasedeservicios_SAL401);
    },
    _ventanacliente_SAL401() {
      let { ipcRenderer } = require("electron");
      ipcRenderer.send(
        "another",
        (datos = { directorio: "CONTAB/paginas/CON110C.html", cliente: clienteMask_SAL401.unmaskedValue })
      );
      _EventocrearSegventana(["on", "Actualizando maestro de terceros..."], this._evaluarcliente_SAL401);
    },
    _ventanapaciente_SAL401() {
      this.SAL401.SWCREAR = 1;
      this.mostrarpacientes = true;
      this.datos_pacientes.idpaciente = idhistoriafactMask_SAL401.unmaskedValue.padStart(15, "0");
      // this.datos_pacientes.novedad = "8"
      setTimeout(() => {
        this.params_pacientes.estado = true;
      }, 300);
    },
    validarEsc_pacientes() {
      this.mostrarpacientes = false;
      setTimeout(() => {
        this.params_pacientes.estado = false;
      }, 300);
      this._evaluaridhistoriafact_SAL401();
    },
    validarCallback_pacientes() {
      this.mostrarpacientes = false;
      setTimeout(() => {
        this.params_pacientes.estado = false;
      }, 300);
      this._evaluaridhistoriafact_SAL401();
    },
    // F8
    _ventanaclases_SAL401(e) {
      if (e.which == 119 || e.type == "click") {
        _ventanaDatos({
          titulo: "TIPO DE SERVICIO",
          columnas: ["COD", "DESCRIPCION"],
          data: this.SAL401.SERVICIOS,
          callback_esc: function () {
            $("#claseservicio_SAL41").focus();
          },
          callback: function (data) {
            clasedeservicioMask_SAL401.typedValue = data.COD;
            _enterInput("#clasedeservicio_SAL401");
          },
        });
      }
    },
    _ventanacomprobantes_SAL401(e) {
      if (e.which == 119 || e.type == "click") {
        set_Event_validar("#VALIDAR3_SAL401", "off");
        $("#comprobante_SAL401").attr("disabled", "true");
        SER825(this._evaluarcomprobante_SAL401, this.montarVentanaDoble, "1", "ventana_componente");
      }
    },
    montarVentanaDoble(data) {
      this.facturas_ser825 = data.FACTURAS[0].TABLA;
      this.paciente_ser825 = data.FACTURAS[0].NOMBRE_PACI;
      this.facturas_derecha_ser825 = this.facturas_ser825[0].TABLA_ARTICULOS;

      this.ESTADO_VENTANA_COMPROBANTES = true;
    },
    salirventanadoble_esc() {
      this.ESTADO_VENTANA_COMPROBANTES = false;
      this.facturas_ser825 = [];
      this.facturas_derecha_ser825 = [];
      this.paciente_ser825 = "";
      SER825(this._evaluarcomprobante_SAL401, this.montarVentanaDoble, "1", "ventana_componente");
    },
    cambiofocoventanadoble(data) {
      this.facturas_derecha_ser825 = this.facturas_ser825[data].TABLA_ARTICULOS;
    },
    salirventanadoble(data) {
      this.ESTADO_VENTANA_COMPROBANTES = false;
      if (data) {
        comprobanteMask_SAL401.typedValue = parseInt(data.cells[0].textContent.substring(3, 9)).toString();
        clasedeservicioMask_SAL401.typedValue = data.cells[0].textContent.substring(2, 3);
        this.form.sucursal_SAL401 = data.cells[0].textContent.substring(0, 2);
        this._validarcomprobante_SAL401();
      }
    },
    _evaluadatoscomprob_SAL401(data) {
      this.SAL401.CONSULTFACT = data.FACTURA[0];
      this.form.sucursal_SAL401 = this.SAL401.CONSULTFACT.SUC;
      clasedeservicioMask_SAL401.typedValue = this.SAL401.CONSULTFACT.CLASE.substring(0, 1);
      comprobanteMask_SAL401.typedValue = this.SAL401.CONSULTFACT.NRO;
      this._validarcomprobante_SAL401();
    },
    _ventanaformasdepago_SAL401(e) {
      if (e.which == 119 || e.type == "click") {
        _ventanaDatos({
          titulo: "TIPO DE PAGO",
          columnas: ["CODIGO", "DESCRIPCION"],
          data: [
            { CODIGO: "E", DESCRIPCION: "EFECTIVO" },
            { CODIGO: "C", DESCRIPCION: "CREDITO" },
            { CODIGO: "P", DESCRIPCION: "PENSIONADO" },
            { CODIGO: "A", DESCRIPCION: "AMBULATORIO" },
            { CODIGO: "T", DESCRIPCION: "ACC.TRANS." },
          ],
          callback_esc: function () {
            $("#prefijofactura_SAL401").focus();
          },
          callback: function (data) {
            prefijofacturaMask_SAL401.typedValue = data.CODIGO;
            _enterInput("#prefijofactura_SAL401");
          },
        });
      }
    },
    _ventananumerodefactura_SAL401(e) {
      if (e.which == 119 || e.type == "click") {
        parametros = {
          dll: "NUMERACION",
          valoresselect: ["Nombre del tercero", "buscar paciente"],
          f8data: "NUMERACION",
          columnas: [
            { title: "COD" },
            { title: "FECHA_ING" },
            { title: "DESCRIP" },
            { title: "NOM_PAC" },
            { title: "CONVENIO" },
            { title: "ESTADO" },
          ],
          filtro: prefijofacturaMask_SAL401.value.toUpperCase().trim(),
          fecha: `20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 4)}00`,
          prefijo: prefijofacturaMask_SAL401.value.toUpperCase().trim(),
          callback: (data) => {
            console.log(data, "NUMERACION");
            numerofacturaMask_SAL401.typedValue = data.COD.substring(1, 7).toString();
            console.log(numerofacturaMask_SAL401.typedValue);
            _enterInput("#numerofactura_SAL401");
          },
          cancel: () => {
            _enterInput("#numerofactura_SAL401");
          },
        };
        F8LITE(parametros);
      }
    },
    _ventanaclientes_SAL401(e) {
      if (e.which == 119 || e.type == "click") {
        parametros = {
          dll: "TERCEROS",
          valoresselect: ["Buscar por nombre tercero"],
          f8data: "TERCEROS",
          columnas: [{ title: "COD" }, { title: "NOMBRE" }, { title: "DIRREC" }, { title: "TELEF" }, { title: "ACT" }],
          callback: (data) => {
            clienteMask_SAL401.typedValue = parseInt(data.COD).toString();
            _enterInput("#cliente_SAL401");
          },
          cancel: () => {
            $("#cliente_SAL401").focus();
          },
        };
        F8LITE(parametros);
      }
    },
    _ventanapacientes_SAL401(e) {
      if (e.which == 119 || e.type == "click") {
        parametros = {
          dll: "PACIENTES",
          valoresselect: ["Nombre del paciente"],
          f8data: "PACIENTES",
          ancho: "95%",
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
            idhistoriafactMask_SAL401.typedValue = data.COD;
            _enterInput("#paciente_SAL401");
          },
          cancel: () => {
            $("#paciente_SAL401").focus();
          },
        };
        F8LITE(parametros);
      }
    },
    _ventanatabladetarifas_SAL401(e) {
      loader("show");
      $_this = this;
      if (e.which == 119 || e.type == "click") {
        if (clasedeservicioMask_SAL401.value == "0") {
          var ARTICULOS_SAL41 = [];
          postData(
            { datosh: datosEnvio() + clasedeservicioMask_SAL401.value + "|", ALMACEN: "DR001" },
            get_url("APP/INVENT/INV507.DLL")
          )
            .then((data) => {
              loader("hide");
              if (clasedeservicioMask_SAL401.value == "0") {
                ARTICULOS_SAL41 = data.SALDOS.filter((el) => el.SALDO_ACT_CANT.trim()); // SE MUESTRAN SOLO LOS ITEMS QUE TENGAN SALDO: RENZO
              } else ARTICULOS_SAL41 = data.SALDOS;
              //   ARTICULOS_SAL41.pop();
              if ($_this.form.codigodeservicio_SAL401.trim() != "") {
                ARTICULOS_SAL41 = ARTICULOS_SAL41.filter(
                  (x) =>
                    x.COD_ARTIC.substring(0, 13).trim() ===
                    `0${$_this.form.codigodeservicio_SAL401.substring(0, 13).trim()}`
                );
              }
              _ventanaDatos({
                titulo: "VENTANA TABLA DE TARIFAS",
                columnas: ["COD_ARTIC", "DESCRIPCION_ARTICULO", "SALDO_ACT_CANT", "LABORATORIO"],
                data: ARTICULOS_SAL41,
                callback_esc: function () {
                  $(".codigodeservicio_SAL401").focus();
                },
                callback: function (data) {
                  $_this.form.codigodeservicio_SAL401 = data.COD_ARTIC.substring(1, 16);
                  $_this.form.clasearticulo_SAL401 = data.COD_ARTIC.substring(16, 18);
                  _enterInput(".codigodeservicio_SAL401");
                },
              });
            })
            .catch((error) => {
              loader("hide");
              console.error(error);
              CON851("", "Hubo un error consultando los articulos", null, "error", "Error");
              $(".codigodeservicio_SAL401").focus();
            });
        } else {
          var ARTICULOS_SAL41 = [];
          postData(
            { datosh: `${datosEnvio()}${this.SAL401.CODTABW}${this.SAL401.TIPOTABW}|` },
            get_url("APP/SALUD/SER802.DLL")
          )
            .then((data) => {
              loader("hide");
              ARTICULOS_SAL41 = data.TABLA;
              ARTICULOS_SAL41.pop();
              _ventanaDatos({
                titulo: "VENTANA TABLA DE TARIFAS",
                columnas: ["COD", "TIPO", "COD_SER", "DESCRIP"],
                data: ARTICULOS_SAL41,
                callback_esc: function () {
                  $(".codigodeservicio_SAL401").focus();
                },
                callback: function (data) {
                  $_this.form.codigodeservicio_SAL401 = data.COD_SER;
                  _enterInput(".codigodeservicio_SAL401");
                },
              });
            })
            .catch((error) => {
              loader("hide");
              console.error(error);
              CON851("", "Hubo un error consultando los articulos", null, "error", "Error");
              $(".codigodeservicio_SAL401").focus();
            });
        }
      }
    },
    _ventanaClasesmedicamentos_SAL401(e) {
      let $_this = this;
      if (this.SAL401.NROPEDW.length > 0) {
        loader("show");
        if (clasedeservicioMask_SAL401.value == "0") {
          var ARTICULOS_SAL41 = [];
          postData(
            { datosh: datosEnvio() + clasedeservicioMask_SAL401.value + "|", ALMACEN: "DR001" },
            get_url("APP/INVENT/INV507.DLL")
          )
            .then((data) => {
              loader("hide");
              ARTICULOS_SAL41 = data.SALDOS;
              ARTICULOS_SAL41.pop();
              if ($_this.form.codigodeservicio_SAL401.trim() != "") {
                ARTICULOS_SAL41 = ARTICULOS_SAL41.filter(
                  (x) => x.COD_ARTIC.substring(0, 13) == `0${$_this.form.codigodeservicio_SAL401.substring(0, 12)}`
                );
              }
              _ventanaDatos({
                titulo: "VENTANA CLASE DE ARTICULOS",
                columnas: ["COD_ARTIC", "DESCRIPCION_ARTICULO", "SALDO_ACT_CANT", "LABORATORIO"],
                data: ARTICULOS_SAL41,
                callback_esc: function () {
                  $(".clasearticulo_SAL401").focus();
                },
                callback: function (data) {
                  $_this.form.codigodeservicio_SAL401 = data.COD_ARTIC.substring(1, 16);
                  $_this.form.clasearticulo_SAL401 = data.COD_ARTIC.substring(16, 18);
                  _enterInput(".clasearticulo_SAL401");
                },
              });
            })
            .catch((error) => {
              loader("hide");
              console.error(error);
              CON851("", "Hubo un error consultando los articulos", null, "error", "Error");
              $(".clasearticulo_SAL401").focus();
            });
        }
      }
    },
    _ventanaalmacenes_SAL401(e) {
      $_this = this;
      if (e.which == 119 || e.type == "click") {
        postData({ datosh: datosEnvio() }, get_url("APP/INVENT/INV801.DLL"))
          .then((data) => {
            loader("hide");
            $_this.SAL401.LOCALIZACION = data.LOCALIZACION;
            $_this.SAL401.LOCALIZACION.pop();
            _ventanaDatos({
              titulo: "VENTANA DE ALMACENES",
              columnas: ["CODIGO", "DESCRIPCION", "COSTO"],
              data: $_this.SAL401.LOCALIZACION,
              callback_esc: function () {
                $(".almacen_SAL401").focus();
              },
              callback: function (data) {
                $_this.form.almacen_SAL401 = data.CODIGO;
                _enterInput(".almacen_SAL401");
              },
            });
          })
          .catch((error) => {
            console.error(error);
            CON851("", "Ocurrio un error consultando las localizaciones", null, "error", "Error");
            $(".almacen_SAL401").focus();
          });
      }
    },
    _ventanaespecialidades_SAL401(e) {
      $_this = this;
      if (e.which == 119 || e.type == "click") {
        _ventanaDatos({
          titulo: "VENTANA DE ESPECIALIDADES",
          columnas: ["CODIGO", "NOMBRE"],
          data: this.SAL401.ESPECIALIDADES,
          callback_esc: function () {
            $(".especialidad_SAL401").focus();
          },
          callback: function (data) {
            $_this.form.especialidad_SAL401 = data.CODIGO;
            _enterInput(".especialidad_SAL401");
          },
        });
      }
    },
    _ventanacostos_SAL401(e) {
      $_this = this;
      if (e.which == 119 || e.type == "click") {
        postData({ datosh: datosEnvio() }, get_url("APP/CONTAB/CON803.DLL"))
          .then((data) => {
            loader("hide");
            $_this.SAL401.COSTOS = data.COSTO;
            $_this.SAL401.COSTOS.pop();
            _ventanaDatos({
              titulo: "VENTANA DE CONSULTA CENTRO DE COSTOS",
              columnas: ["COD", "NOMBRE", "DESCRIP"],
              data: $_this.SAL401.COSTOS,
              callback_esc: function () {
                $(".centrocostos_SAL401").focus();
              },
              callback: function (data) {
                $_this.form.centrocostos_SAL401 = data.COD;
                _enterInput(".centrocostos_SAL401");
              },
            });
          })
          .catch((error) => {
            loader("hide");
            console.error(error);
            CON851("", "Ocurrio un error consultando los centro de costo", null, "error", "Error");
            $(".centrocostos_SAL401").focus();
          });
      }
    },
    _ventanaprofesionales_SAL401(e) {
      $_this = this;
      loader("show");
      if (e.which == 119 || e.type == "click") {
        var PROFESIONALES_SAL41 = [];
        postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER819.DLL"))
          .then((data) => {
            loader("hide");
            data.ARCHPROF.pop();
            PROFESIONALES_SAL41 = data.ARCHPROF;
            let ESPECFILTER = PROFESIONALES_SAL41.filter((x) => {
              for (var i in x.TAB_ESPEC) {
                if (x.TAB_ESPEC[i].COD == $_this.form.especialidad_SAL401) return x;
              }
            });
            _ventanaDatos({
              titulo: "VENTANA DE PROFESIONALES",
              columnas: ["NOMBRE", "IDENTIFICACION", "DESCRIPCION"],
              data: ESPECFILTER,
              callback_esc: function () {
                $("#atendido_SAL401").focus();
              },
              callback: function (data) {
                atendidoMask_SAL401.typedValue = parseInt(data.IDENTIFICACION).toString();
                _enterInput("#atendido_SAL401");
              },
            });
          })
          .catch((error) => {
            loader("hide");
            console.error(error);
            CON851("", "Ocurrio un error consultando los profesionales", null, "error", "Error");
            $("#atendido_SAL401").focus();
          });
      }
    },
    _ventanaprofesionalesremite_SAL401(e) {
      loader("show");
      if (e.which == 119 || e.type == "click") {
        var PROFESIONALES_SAL41 = [];
        postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER819.DLL"))
          .then((data) => {
            loader("hide");
            PROFESIONALES_SAL41 = data.ARCHPROF;
            PROFESIONALES_SAL41.pop();
            _ventanaDatos({
              titulo: "VENTANA DE PROFESIONALES",
              columnas: ["NOMBRE", "IDENTIFICACION", "DESCRIPCION"],
              data: PROFESIONALES_SAL41,
              callback_esc: function () {
                $("#solic_SAL401").focus();
              },
              callback: function (data) {
                solicitanteMask_SAL401.typedValue = parseInt(data.IDENTIFICACION).toString();
                _enterInput("#solic_SAL401");
              },
            });
          })
          .catch((error) => {
            console.error(error);
            CON851("", "Ocurrio un error consultando los profesionales", null, "error", "Error");
            $("#solic_SAL401").focus();
          });
      }
    },
    _ventanaprofesionalescirugia_SAL401(e) {
      loader("show");
      if (e.which == 119 || e.type == "click") {
        var PROFESIONALES_SAL41 = [];
        postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER819.DLL"))
          .then((data) => {
            loader("hide");
            PROFESIONALES_SAL41 = data.ARCHPROF;
            PROFESIONALES_SAL41.pop();
            _ventanaDatos({
              titulo: "VENTANA DE PROFESIONALES",
              columnas: ["NOMBRE", "IDENTIFICACION", "DESCRIPCION"],
              data: PROFESIONALES_SAL41,
              callback_esc: function () {
                $("#nitmedicocirugia_SAL401").focus();
              },
              callback: function (data) {
                nitmedicocirugia_SAL401.typedValue = data.IDENTIFICACION.trim();
                _enterInput("#nitmedicocirugia_SAL401");
              },
            });
          })
          .catch((error) => {
            console.error(error);
            CON851("", "Ocurrio un error consultando los profesionales", null, "error", "Error");
            $("#nitmedicocirugia_SAL401").focus();
          });
      }
    },
    _ventanaprofesionalesayudante_SAL401(e) {
      loader("show");
      if (e.which == 119 || e.type == "click") {
        var PROFESIONALES_SAL41 = [];
        postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER819.DLL"))
          .then((data) => {
            loader("hide");
            PROFESIONALES_SAL41 = data.ARCHPROF;
            PROFESIONALES_SAL41.pop();
            _ventanaDatos({
              titulo: "VENTANA DE PROFESIONALES",
              columnas: ["NOMBRE", "IDENTIFICACION", "DESCRIPCION"],
              data: PROFESIONALES_SAL41,
              callback_esc: function () {
                $("#ayudantia_SAL401").focus();
              },
              callback: function (data) {
                nitmedicoayudantia_SAL401.typedValue = data.IDENTIFICACION.trim();
                _enterInput("#ayudantia_SAL401");
              },
            });
          })
          .catch((error) => {
            console.error(error);
            CON851("", "Ocurrio un error consultando los profesionales", null, "error", "Error");
            $("#ayudantia_SAL401").focus();
          });
      }
    },
    _ventanaprofesionalesanestesiologo_SAL401(e) {
      loader("show");
      if (e.which == 119 || e.type == "click") {
        var PROFESIONALES_SAL41 = [];
        postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER819.DLL"))
          .then((data) => {
            loader("hide");
            PROFESIONALES_SAL41 = data.ARCHPROF;
            PROFESIONALES_SAL41.pop();
            _ventanaDatos({
              titulo: "VENTANA DE PROFESIONALES",
              columnas: ["NOMBRE", "IDENTIFICACION", "DESCRIPCION"],
              data: PROFESIONALES_SAL41,
              callback_esc: function () {
                $("#anestesia_SAL401").focus();
              },
              callback: function (data) {
                nitmedicoanesteciologo_SAL401.typedValue = data.IDENTIFICACION.trim();
                _enterInput("#anestesia_SAL401");
              },
            });
          })
          .catch((error) => {
            console.error(error);
            CON851("", "Ocurrio un error consultando los profesionales", null, "error", "Error");
            $("#anestesia_SAL401").focus();
          });
      }
    },
    _ventanasaldoslote_SAL401(e) {
      loader("show");
      var $_this = this;
      if (e.which == 119 || e.type == "click") {
        var PROFESIONALES_SAL41 = [];
        postData(
          {
            datosh: `${datosEnvio()}${$_this.form.almacen_SAL401}0${$_this.form.codigodeservicio_SAL401.padEnd(
              13,
              " "
            )}${$_this.form.clasearticulo_SAL401.padEnd(2, " ")}|`,
          },
          get_url("APP/INVENT/INV814A.DLL")
        )
          .then((data) => {
            loader("hide");
            data.LOTESFARM.pop();
            _ventanaDatos({
              titulo: "VENTANA DE LOTES",
              columnas: ["COD", "ART", "DESCRIP", "ALMACEN"],
              data: data.LOTESFARM,
              callback_esc: function () {
                $(".codlotefarmaceutico_SAL401").focus();
              },
              callback: function (data) {
                $_this.form.codlotefarmaceutico_SAL401 = parseInt(data.COD).toString();
                _enterInput(".codlotefarmaceutico_SAL401");
              },
            });
          })
          .catch((error) => {
            console.error(error);
            loader("hide");
            CON851("", "Ocurrio un error consultando los profesionales", null, "error", "Error");
            $(".codlotefarmaceutico_SAL401").focus();
          });
      }
    },
    //// OPCION SER4B1
    _evaluarimpresion_SER4B1() {
      console.log(this.FACTURACION[0].ARTICULO.trim());
      if (
        this.FACTURACION[0].ARTICULO.trim() != "890701" &&
        this.FACTURACION[0].ARTICULO.trim() != "890702" &&
        this.FACTURACION[0].ARTICULO.trim() != "890703" &&
        this.FACTURACION[0].ARTICULO.trim() != "890704"
      ) {
        this.FACTURACION = [];
        CON851("2J", "2J", this._evaluarcomprobante_SAL401(), "error", "Error");
      } else {
        CON851P(
          "04",
          () => {
            this.FACTURACION = [];
            this._evaluarcomprobante_SAL401();
          },
          this._valirdarimpresion_SER4B1
        );
      }
    },
    _valirdarimpresion_SER4B1() {
      if (prefijofacturaMask_SAL401.value.trim() == "E" && prefijofacturaMask_SAL401.value.trim() == "C") {
        CON851("", "Prefijo de factura no válido", _toggleNav(), "error", "Error");
      } else {
        if (
          this.FACTURACION[0].ARTICULO.trim() != "890701" &&
          this.FACTURACION[0].ARTICULO.trim() != "890702" &&
          this.FACTURACION[0].ARTICULO.trim() != "890703" &&
          this.FACTURACION[0].ARTICULO.trim() != "890704"
        ) {
          CON851("", "Articulos no compatibles", _toggleNav(), "warning", "Advertencia");
        } else {
          if (this.SAL401.COMPROBANTE.TABLA_DIAG[0].COD_DIAG.trim() == "") {
            this._ventanaRIPS_SAL401();
          } else {
            this.SAL401.NROCOMPROBANTE = comprobanteMask_SAL401.value;
            this.SAL401.FECHA = fechafacturaMask_SAL401.value;
            _impresion_SER4B1(this, _toggleNav);
          }
        }
      }
    },
    _ventanaRIPS_SAL401() {
      let { ipcRenderer } = require("electron");
      ipcRenderer.send("another", (datos = { directorio: "SALUD/paginas/SER421.html" }));
      _EventocrearSegventana(["on", "Actualizando RIPS ..."], this._evaluarcomprobante_SAL401);
    },
    _inicializar_SAL401() {
      // clasedeservicioMask_SAL401.typedValue = '';
      // this.form.clasedeserviciod_SAL401 = '';
      // comprobanteMask_SAL401.typedValue = '';
      fechafacturaMask_SAL401.typedValue = "";
      prefijofacturaMask_SAL401.typedValue = "";
      numerofacturaMask_SAL401.typedValue = "";
      this.form.puertaingreso_SAL401 = "";
      clienteMask_SAL401.typedValue = "";
      this.form.cliented_SAL401 = "";
      idhistoriafactMask_SAL401.typedValue = "";
      this.form.paciented_SAL401 = "";
      this.form.sexo_SAL401 = "";
      this.form.edad_SAL401 = "";
      this.form.codigodeservicio_SAL401 = "";
      this.form.codigodeserviciod_SAL401 = "";
      this.form.almacen_SAL401 = "";
      cantidadMask_SAL401.typedValue = "";
      valorunitarioMask_SAL401.typedValue = "";
      valortotalMask_SAL401.typedValue = "";
      valortotalcomprobanteMask_SAL401.typedValue = "";
      copagoestimfactMask_SAL401.typedValue = "";
      porcentajecopagoMask_SAL401.typedValue = "";
      this.form.especialidad_SAL401 = "";
      this.form.especialidadd_SAL401 = "";
      this.form.centrocostos_SAL401 = "";
      this.form.centroccostosd_SAL401 = "";
      atendidoMask_SAL401.typedValue = "";
      this.form.atendidod_SAL401 = "";
      solicitanteMask_SAL401.typedValue = "";
      this.form.solicitanteMask_SAL401 = "";
      this.form.tipoafiliacion_SAL401 = "";
      this.form.convenio_SAL401 = "";
      this.form.estrato_SAL401 = "";
      this.form.ciudad_SAL401 = "";
      this.form.cap_SAL401 = "";
      this.form.solicd_SAL401 = "";
      this.form.unidaddeservicio_SAL401 = "";
      this.form.finalidadestado_SAL401 = "";
      netofacturaMask_SAL401.typedValue = "";
      $("#CLASEPROCE_SAL401").addClass("hidden");
      $("#EMBARAZO_SAL401").addClass("hidden");
      $("#TIPOPROCEDIMIENTO_SAL401").addClass("hidden");
      this.FACTURACION = [];
    },
    _montarTablapaquetes(data) {
      this.SAL401.VLRUPC = "000000000000.00";
      this.paquetes_integrales_SAL401 = data.PAQUETES;
      this.tabla_paquetes_integrales_SAL401 = data.PAQUETES[0].TABLA;

      this.ESTADO_VENTANA_PAQUETES = true;
    },
    salirventanapaquetes_SAL401() {
      this.ESTADO_VENTANA_PAQUETES = false;
      this.paquetes_integrales_SAL401 = [];
      this.tabla_paquetes_integrales_SAL401 = [];

      this._evaluarpaqueteintegral_SAL401();
    },
    seleccionpaqueteintegral_SAL401(data) {
      this.ESTADO_VENTANA_PAQUETES = false;
      console.log(this.SAL401.PAQUETES);
      for (var i in this.SAL401.PAQUETES.PAQUETES[0].TABLA) {
        if (this.SAL401.PAQUETES.PAQUETES[0].TABLA[i].CLASE == "0") {
          this.FACTURACION.push({
            ARTICULO: this.SAL401.PAQUETES.PAQUETES[0].TABLA[i].ARTICULO,
            CANTIDAD: this.SAL401.PAQUETES.PAQUETES[0].TABLA[i].CANTIDAD,
            DESCRIPCIONART: this.SAL401.PAQUETES.PAQUETES[0].TABLA[i].DESCRIPARTICULO,
            VALORTOTAL: "",
            UNIDAD: "",
            DIASTRATA: "",
            CODIGOLOTE: "",
            CLASE: this.SAL401.PAQUETES.PAQUETES[0].TABLA[i].CLASE,
            ALMACEN: "DR001",
          });
        } else {
          this.FACTURACION.push({
            ARTICULO: this.SAL401.PAQUETES.PAQUETES[0].TABLA[i].ARTICULO,
            CANTIDAD: this.SAL401.PAQUETES.PAQUETES[0].TABLA[i].CANTIDAD,
            DESCRIPCIONART: this.SAL401.PAQUETES.PAQUETES[0].TABLA[i].DESCRIPARTICULO,
            VALORTOTAL: "",
            UNIDAD: "",
            DIASTRATA: "",
            CODIGOLOTE: "",
            CLASE: this.SAL401.PAQUETES.PAQUETES[0].TABLA[i].CLASE,
            ALMACEN: "SIN99",
          });
        }
      }
      netofacturaMask_SAL401.typedValue = this.SAL401.PAQUETES.PAQUETES[0].VALOR.toString();
      valortotalcomprobanteMask_SAL401.typedValue = this.SAL401.PAQUETES.PAQUETES[0].VALOR.toString();
      this.SAL401.CONTEOINTEGRAL = 0;
      this.montarvalorespaqueteintegral_SAL401();
    },
    cambiofocoventanapaquetes(data) {
      this.paquetes_integrales_SAL401 = this.paquetes_integrales_SAL401[data].TABLA;
    },
    montarvalorespaqueteintegral_SAL401() {
      if (this.FACTURACION[this.SAL401.CONTEOINTEGRAL]) {
        if (this.FACTURACION[this.SAL401.CONTEOINTEGRAL].ARTICULO.trim() != "") {
          if (this.FACTURACION[this.SAL401.CONTEOINTEGRAL].CLASE == "0") {
            postData(
              {
                datosh: `${datosEnvio()}7||||||0${this.FACTURACION[this.SAL401.CONTEOINTEGRAL].ARTICULO.substring(
                  0,
                  15
                )}${this.FACTURACION[this.SAL401.CONTEOINTEGRAL].ARTICULO.substring(15, 17)}|`,
              },
              get_url("APP/SALUD/SAL401.DLL")
            )
              .then((data) => {
                this.SAL401.ARTICULO = data;
                this.form.codigodeserviciod_SAL401 = data.DESCRIPCION;
                this.form.unidad_SAL401 = data.UNIDAD_ART;
                if (data.DESCRIPCION.substring(0, 1) == "*" && this.SAL401.TIPODRFACT) {
                  CON851("13", "13", null, "error", "Error");
                } else if (this.SAL401.NUMERACION.ARTIVA_NUM == "N" && data.IVA != 0 && data.IVA.trim() != "") {
                  CON851("7Z", "7Z", null, "error", "Error");
                } else if (
                  prefijofacturaMask_SAL401.value != "C" &&
                  prefijofacturaMask_SAL401.value != "E" &&
                  prefijofacturaMask_SAL401.value != "Ñ" &&
                  prefijofacturaMask_SAL401.value != "U" &&
                  this.SAL401.NUMERACION.CLASIF_NUM == "1" &&
                  this.form.codigodeservicio_SAL401.trim().substring(0, 2) != "PO" &&
                  this.form.codigodeservicio_SAL401.trim().substring(0, 2) != "MQ"
                ) {
                  CON851("7H", "7H", null, "error", "Error");
                } else if (
                  prefijofacturaMask_SAL401.value != "C" &&
                  prefijofacturaMask_SAL401.value != "E" &&
                  prefijofacturaMask_SAL401.value != "Ñ" &&
                  prefijofacturaMask_SAL401.value != "U" &&
                  this.SAL401.NUMERACION.CLASIF_NUM == "1" &&
                  this.form.codigodeservicio_SAL401.trim().substring(0, 2) != "NP" &&
                  this.form.codigodeservicio_SAL401.trim().substring(0, 2) != "MQ" &&
                  this.form.codigodeservicio_SAL401.trim().substring(0, 2) != "CO"
                ) {
                  CON851("7H", "7H", null, "error", "Error");
                } else {
                  this.SAL401.IVAART = data.IVA;
                  this.SAL401.VLRPROMEDW = 0;
                  if (data.IVA == 0) this.SAL401.TARIVA = 0;
                  if (data.IVA == 1) this.SAL401.TARIVA = $_USUA_GLOBAL[0].IVA1;
                  if (data.IVA == 2) this.SAL401.TARIVA = $_USUA_GLOBAL[0].IVA2;
                  if (data.IVA == 3) this.SAL401.TARIVA = $_USUA_GLOBAL[0].IVA3;
                  if (this.SAL401.CONVENIO.BASE_MED == 1) {
                    let prefijo = this.SAL401.PREFIJOS.TABLA.filter(
                      (x) => x.PREFIJO.trim() == prefijofacturaMask_SAL401.value.trim()
                    );
                    if (!prefijo) this.SAL401.ALMPREF = "ALM01";
                    else this.SAL401.ALMPREF = prefijo[0].ALMACEN;
                  } else if (this.SAL401.CONVENIO.BASE_MED == 2) {
                    this.SAL401.VLRPROMEDW = 0;
                    this.SAL401.ARTICULOS.VR_VENTA1 = data.VLR_ULT_COMPRA;
                  } else if (this.SAL401.CONVENIO.BASE_MED == 4) {
                    this.SAL401.VLRPROMEDW = 0;
                    if (data.REF > 0) {
                      this.SAL401.ARTICULO.VR_VENTA1 = data.REF;
                    }
                  }
                }
                this.FACTURACION[this.SAL401.CONTEOINTEGRAL].VALORTOTAL = "0.00";
                let cantidad = parseFloat(this.FACTURACION[this.SAL401.CONTEOINTEGRAL].CANTIDAD);
                cantidadMask_SAL401.typedValue = cantidad.toString();
                this.FACTURACION[this.SAL401.CONTEOINTEGRAL].CANTIDAD = cantidadMask_SAL401.value;
                this.FACTURACION[this.SAL401.CONTEOINTEGRAL].VALORUNIT = "0.00";
                this.FACTURACION[this.SAL401.CONTEOINTEGRAL].DESCRIPCIONART = data.DESCRIPCION;
                this.SAL401.CONTEOINTEGRAL++;
                this.montarvalorespaqueteintegral_SAL401();
              })
              .catch((error) => {
                console.error(error);
                this.FACTURACION.splice(this.SAL401.CONTEOINTEGRAL, 1);
                this.montarvalorespaqueteintegral_SAL401();
              });
          } else {
            postData(
              {
                datosh: `${datosEnvio()}8||||||${this.FACTURACION[this.SAL401.CONTEOINTEGRAL].ARTICULO.trim().padEnd(
                  15,
                  " "
                )}|${idhistoriafactMask_SAL401.unmaskedValue.trim().padStart(15, "0")}|${
                  this.SAL401.PACIENTE.EDAD.unid_edad
                }${this.SAL401.PACIENTE.EDAD.vlr_edad.toString().padStart(3, "0")}|${
                  prefijofacturaMask_SAL401.value
                }${numerofacturaMask_SAL401.value.trim().padStart(6, "0")}|${this.SAL401.CODTABW}${
                  this.FACTURACION[this.SAL401.CONTEOINTEGRAL].CLASE
                }|`,
              },
              get_url("APP/SALUD/SAL401.DLL")
            )
              .then((data) => {
                this.SAL401.ARTICULO = data;
                if (data.FORMALIQ.trim() == "1")
                  this.SAL401.VLRUNITW =
                    parseFloat(data.MONTO) * parseFloat(this.SAL401.CONVENIO.TABLA_TAR[29].HNQUIRTAR);
                else if (data.FORMALIQ.trim() == "2") this.SAL401.VLRUNITW = parseFloat(data.MONTO);
                else if (data.FORMALIQ.trim() == "3") this.SAL401.VLRUNITW = parseFloat(data.MONTO);
                else if (data.FORMALIQ.trim() == "4") {
                  if (
                    $_USUA_GLOBAL[0].NIT == 892000401 ||
                    $_USUA_GLOBAL[0].NIT == 900475095 ||
                    $_USUA_GLOBAL[0].NIT == 900708318
                  ) {
                    this.SAL401.FACTORW = 1;
                    this.SAL401.SWAPR = 100;
                    this.SAL401.VLRUNITW = parseFloat(data.MONTO) * this.SAL401.CONVENIO.SAL_MIN;
                    this.SAL401.VLRUNITW = (this.SAL401.VLRUNITW * 1) / 100;
                    this.SAL401.VLRUNITW = this.SAL401.VLRUNITW * 100;
                  } else {
                    this.SAL401.VLRUNITW = data.MONTO * this.SAL401.CONVENIO.SAL_MIN;
                  }
                } else if (data.FORMALIQ.trim() == "5") {
                  let primero = this.FACTURACION[0].ARTICULO;
                  if (!primero) primero = 0;
                  this.SAL401.VLRUNITW = (parseFloat(data.MONTO) * primero) / 100;
                } else {
                  this.SAL401.SWAPR = 1;
                  this.SAL401.VLRUNITW = data.MONTO;
                }
                if (data.LLAVETIPO.trim() == "SO1" && data.CODPAQINT.trim() != "") {
                  CON851(
                    "",
                    "Atencion ! este procedimiento esta clasificado como posible paquete integral",
                    null,
                    "warning",
                    "Avertencia!"
                  );
                }
                this.FACTURACION[this.SAL401.CONTEOINTEGRAL].DESCRIPCIONART = data.DESCRIPCION;
                this.SAL401.VLRUNITW = Math.round(this.SAL401.VLRUNITW);
                if (isNaN(this.SAL401.VLRUNITW)) this.SAL401.VLRUNITW = 0;
                console.log(this.SAL401.VLRUNITW);
                this.SAL401.IVAART = "0";
                let valor = this.SAL401.VLRUNITW;
                valorunitarioMask_SAL401.typedValue = valor.toString();
                this.FACTURACION[this.SAL401.CONTEOINTEGRAL].VALORTOTAL = valorunitarioMask_SAL401.value.replace(
                  /,/g,
                  ""
                );
                let cantidad = parseFloat(this.FACTURACION[this.SAL401.CONTEOINTEGRAL].CANTIDAD);
                cantidadMask_SAL401.typedValue = cantidad.toString();
                let valorunitario = valor / cantidad;
                this.FACTURACION[this.SAL401.CONTEOINTEGRAL].CANTIDAD = cantidadMask_SAL401.value;
                valorunitarioMask_SAL401.typedValue = valorunitario.toString();
                this.FACTURACION[this.SAL401.CONTEOINTEGRAL].VALORUNIT = valorunitarioMask_SAL401.value;
                this.SAL401.CONTEOINTEGRAL++;
                this.montarvalorespaqueteintegral_SAL401();
              })
              .catch((error) => {
                console.error(error);
                this.FACTURACION.splice(this.SAL401.CONTEOINTEGRAL, 1);
                this.montarvalorespaqueteintegral_SAL401();
              });
          }
        } else {
          this.FACTURACION.splice(this.SAL401.CONTEOINTEGRAL, 1);
          this.SAL401.CONTEOINTEGRAL++;
          this.montarvalorespaqueteintegral_SAL401();
        }
      } else {
        this._evaluarcodigoservicio_SAL401();
      }
    },
  },
});

//  MASCARAS SAL401

var clasedeservicioMask_SAL401 = IMask($("#clasedeservicio_SAL401")[0], { mask: Number, min: 0, max: 7 });
var comprobanteMask_SAL401 = IMask($("#comprobante_SAL401")[0], { mask: Number });
// VARIABLES PARA QUE SOLO ACEPTE EL AÑO Y EL MES DE TRABAJO
var anofact = parseInt(`20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)}`);
var mesfact = parseInt($_USUA_GLOBAL[0].FECHALNK.substring(2, 4));
var fechafacturaMask_SAL401 = IMask($("#fecha_SAL401")[0], {
  mask: Date,
  pattern: "Y-m-d",
  lazy: true,
  blocks: {
    Y: { mask: IMask.MaskedRange, placeholderChar: "Y", from: anofact, to: anofact, maxLength: 4 },
    m: { mask: IMask.MaskedRange, placeholderChar: "m", from: mesfact, to: mesfact, maxLength: 2 },
    d: { mask: IMask.MaskedRange, placeholderChar: "d", from: "01", to: "31", maxLength: 2 },
  },
  format: function (date) {
    return moment(date).format("YYYY-MM-DD");
  },
  parse: function (str) {
    var fecha = moment(str).format("YYYY-MM-DD");
    return str;
  },
});
var prefijofacturaMask_SAL401 = IMask($("#prefijofactura_SAL401")[0], {
  mask: "a",
  prepare: function (str) {
    return str.toUpperCase();
  },
  commit: function (value, masked) {
    masked._value = value.toLowerCase();
  },
});
var numerofacturaMask_SAL401 = IMask($("#numerofactura_SAL401")[0], { mask: Number });
var idhistoriafactMask_SAL401 = IMask($("#paciente_SAL401")[0], { mask: "***************" });
var clienteMask_SAL401 = IMask($("#cliente_SAL401")[0], {
  mask: Number,
  thousandsSeparator: ",",
  padFractionalZeros: false,
  normalizeZeros: true,
  radix: ",",
  mapToRadix: ["."],
});
var cantidadMask_SAL401 = IMask($("#cantidad_SAL401")[0], {
  mask: Number,
  thousandsSeparator: ",",
  padFractionalZeros: true,
  normalizeZeros: true,
  radix: ".",
  mapToRadix: ["."],
  scale: 2,
});
var valorunitarioMask_SAL401 = IMask($("#vlrunit_SAL401")[0], {
  mask: Number,
  thousandsSeparator: ",",
  padFractionalZeros: true,
  normalizeZeros: true,
  radix: ".",
  mapToRadix: ["."],
  scale: 2,
});
var valortotalMask_SAL401 = IMask($("#vlrtotal_SAL401")[0], {
  mask: Number,
  thousandsSeparator: ",",
  padFractionalZeros: false,
  normalizeZeros: true,
  radix: ".",
  mapToRadix: ["."],
});
var valortotalcomprobanteMask_SAL401 = IMask($("#valortotalcomprobante_SAL401")[0], {
  mask: Number,
  thousandsSeparator: ",",
  padFractionalZeros: true,
  normalizeZeros: true,
  radix: ".",
  mapToRadix: ["."],
  min: -999999999999,
  max: 999999999999,
  scale: 2,
});
var netofacturaMask_SAL401 = IMask($("#netofact_SAL401")[0], {
  mask: Number,
  thousandsSeparator: ",",
  padFractionalZeros: true,
  normalizeZeros: true,
  radix: ".",
  mapToRadix: ["."],
  scale: 2,
});
var diastratamientoMask_SAL401 = IMask($("#diastratamiento_SAL401")[0], { mask: Number });
var copagoestimfactMask_SAL401 = IMask($("#copagoestimfact_SAL401")[0], {
  mask: Number,
  thousandsSeparator: ",",
  padFractionalZeros: false,
  normalizeZeros: true,
  radix: ",",
  mapToRadix: ["."],
});
var porcentajecopagoMask_SAL401 = IMask($("#porcentcopago_SAL401")[0], {
  mask: Number,
  thousandsSeparator: ",",
  padFractionalZeros: true,
  normalizeZeros: true,
  radix: ".",
  mapToRadix: ["."],
  scale: 2,
});
var atendidoMask_SAL401 = IMask($("#atendido_SAL401")[0], {
  mask: Number,
  thousandsSeparator: ",",
  padFractionalZeros: false,
  normalizeZeros: true,
  radix: ",",
  mapToRadix: ["."],
});
var solicitanteMask_SAL401 = IMask($("#solic_SAL401")[0], {
  mask: Number,
  thousandsSeparator: ",",
  padFractionalZeros: false,
  normalizeZeros: true,
  radix: ",",
  mapToRadix: ["."],
});
var nitmedicocirugia_SAL401 = IMask($("#nitmedicocirugia_SAL401")[0], {
  mask: Number,
  thousandsSeparator: ",",
  padFractionalZeros: false,
  normalizeZeros: true,
  radix: ",",
  mapToRadix: ["."],
});
var valorcirugiaMask_SAL401 = IMask($("#vlrcirugia_SAL401")[0], {
  mask: Number,
  thousandsSeparator: ",",
  padFractionalZeros: true,
  normalizeZeros: true,
  radix: ".",
  mapToRadix: ["."],
  scale: 2,
});
var nitmedicoayudantia_SAL401 = IMask($("#ayudantia_SAL401")[0], {
  mask: Number,
  thousandsSeparator: ",",
  padFractionalZeros: false,
  normalizeZeros: true,
  radix: ",",
  mapToRadix: ["."],
});
var valorayudantiaMask_SAL401 = IMask($("#vlrayudante_SAL401")[0], {
  mask: Number,
  thousandsSeparator: ",",
  padFractionalZeros: true,
  normalizeZeros: true,
  radix: ".",
  mapToRadix: ["."],
  scale: 2,
});
var nitmedicoanesteciologo_SAL401 = IMask($("#anestesia_SAL401")[0], {
  mask: Number,
  thousandsSeparator: ",",
  padFractionalZeros: false,
  normalizeZeros: true,
  radix: ",",
  mapToRadix: ["."],
});
var valoranestesiologoMask_SAL401 = IMask($("#vlranestesia_SAL401")[0], {
  mask: Number,
  thousandsSeparator: ",",
  padFractionalZeros: true,
  normalizeZeros: true,
  radix: ".",
  mapToRadix: ["."],
  scale: 2,
});
var valormatquirurgicoMask_SAL401 = IMask($("#matquirurgico_SAL401")[0], {
  mask: Number,
  thousandsSeparator: ",",
  padFractionalZeros: true,
  normalizeZeros: true,
  radix: ".",
  mapToRadix: ["."],
  scale: 2,
});
var valorderechsalaMask_SAL401 = IMask($("#derechosala_SAL401")[0], {
  mask: Number,
  thousandsSeparator: ",",
  padFractionalZeros: true,
  normalizeZeros: true,
  radix: ".",
  mapToRadix: ["."],
  scale: 2,
});
