// 23/07/20 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SER110",
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,
    tipo_impresion: null,
    ser110: {
      _terceros: [],
      _costos: [],
      _servhosp: [],
      _envios: [],
      _operador: [],
      _ciudad: [],
    },
    SER110:[],
    form: {
      prefijo_SER110: "",
      anolistarini_SER110: "",
      meslistarini_SER110: "",
      dialistarini_SER110: "",
      anolistarfin_SER110: "",
      meslistarfin_SER110: "",
      dialistarfin_SER110: "",
      anoabonoini_SER110: "",
      mesabonoini_SER110: "",
      diaabonoini_SER110: "",
      recalcular_SER110: "",
      fechabase_SER110: "",
      ordenar_SER110: "",
      tercero_SER110: "",
      movimiento_SER110: "",
      nrohabitacion_SER110: "",
      copagoestim_SER110: "",
      costos_SER110: "",
      descripcostos_SER110: "",
      servhosp_SER110: "",
      descripservhosp_SER110: "",
      facsinsaldo_SER110: "",
      envio1_SER110: "",
      envio2_SER110: "",
      envio3_SER110: "",
      envio4_SER110: "",
      envio5_SER110: "",
      factcartera_SER110: "",
      operador_SER110: "",
      plan_SER110: "",
      codnit_SER110: "",
      capitacion_SER110: "",
      ciudad_SER110: "",
      descripciudad_SER110: "",
      infresumido_SER110: "",
      operador_SER110: "",
      listado_SER110: "",
      decripter_SER110: "",
    },
    filtroenvios: "",
    variableter: ""
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,4,2,1 - Listado de numeraciones");
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_ANO_LNK = $_FECHA_LNK.substring(0, 2);
    $_MES_LNK = $_FECHA_LNK.substring(2, 4);
    $_DIA_LNK = $_FECHA_LNK.substring(4, 6);
    $_this = this;
    obtenerDatosCompletos(
      {
        nombreFd: "OPERADOR",
      },
      function (data) {
        $_this.ser110._operador = data.ARCHREST;
        $_this.ser110._operador.pop();
        loader("hide");
        $_this._validarprefijo_SER110();
        obtenerDatosCompletos(
          {
            nombreFd: "COSTOS",
          },
          function (data) {
            $_this.ser110._costos = data.COSTO;
            $_this.ser110._costos.pop();
            obtenerDatosCompletos(
              {
                nombreFd: "SERV_HOSP",
              },
              function (data) {
                $_this.ser110._servhosp = data.SERVICIO;
                $_this.ser110._servhosp.pop();
                obtenerDatosCompletos(
                  {
                    nombreFd: "CIUDADES",
                  },
                  function (data) {
                    $_this.ser110._ciudad = data.CIUDAD;
                    $_this.ser110._ciudad.pop();
                  });
              });
          });
      });
  },
  methods: {
    _validarprefijo_SER110() {
      validarInputs(
        {
          form: "#prefijoalistar_110",
          orden: "1",
        },
        _toggleNav,
        () => {
          this.form.prefijo_SER110 = this.form.prefijo_SER110.toUpperCase();
          if (this.form.prefijo_SER110 != "C" && this.form.prefijo_SER110 != "Ñ" && this.form.prefijo_SER110 != "U") {
            this.form.anolistarini_SER110 = 20 + $_ANO_LNK;
            this.form.meslistarini_SER110 = $_MES_LNK;
            this.form.dialistarini_SER110 = "01";
            this.form.anolistarfin_SER110 = 20 + $_ANO_LNK;
            this.form.meslistarfin_SER110 = $_MES_LNK;
            this.form.dialistarfin_SER110 = $_DIA_LNK;
            postData({ datosh: datosEnvio() + "1|" + this.form.prefijo_SER110 + "|" }, get_url("APP/SALUD/SER110.DLL"))
              .then(data => {
                this._validaranolistarini_SER110("1");
              })
              .catch(err => {
                CON851("01", "01", this._validarprefijo_SER110(), "error", "error");
              });
          } else {
            CON851("", "Prefijo incorrecto! ", null, "error", "error");
            this._validarprefijo_SER110();
          }
        },
      );
    },
    _validaranolistarini_SER110(orden) {
      validarInputs(
        {
          form: "#fechalistarInicial_110",
          orden: orden,
        },
        this._validarprefijo_SER110,
        () => {
          if (this.form.anolistarini_SER110.trim() == "" || this.form.anolistarini_SER110 < 1990) {
            CON851("", "Año incorrecto! ", this._validaranolistarini_SER110("1"), "error", "error");
          } else {
            this.form.meslistarini_SER110 = this.form.meslistarini_SER110.padStart(2, "0");
            if (this.form.meslistarini_SER110.trim() == "" || this.form.meslistarini_SER110 < 1 || this.form.meslistarini_SER110 > 12) {
              CON851("", "Mes incorrecto! ", this._validaranolistarini_SER110("2"), "error", "error");
            } else {
              this.form.dialistarini_SER110 = this.form.dialistarini_SER110.padStart(2, "0");
              if (this.form.dialistarini_SER110.trim() == "" || this.form.dialistarini_SER110 < 1 || this.form.dialistarini_SER110 > 31) {
                CON851("", "Dia incorrecto! ", this._validaranolistarini_SER110("3"), "error", "error");
              } else {
                this.SER110.FECHAINIW = this.form.anolistarini_SER110 + this.form.meslistarini_SER110 + this.form.dialistarini_SER110
                if (moment(this.SER110.FECHAINIW).format('YYYYMMDD').trim() == 'Fecha inválida') {
                  CON851('', 'Dia invalido del mes', null, 'error', 'Error');
                  return this._validaranolistarini_SER110("3")
                }
                this._validarfechalistarfin_SER110("1");
              }
            }
          }
        },
      );
    },

    _validarfechalistarfin_SER110(orden) {
      validarInputs(
        {
          form: "#fechalistarFinal_110",
          orden: orden,
        },
        () => { this._validaranolistarini_SER110('3') },
        () => {
          if (this.form.anolistarfin_SER110.trim() == "") {
            CON851("", "Año incorrecto! ", this._validarfechalistarfin_SER110("1"), "error", "error");
          } else {
            this.form.meslistarfin_SER110 = this.form.meslistarfin_SER110.padStart(2, "0");
            if (this.form.meslistarfin_SER110.trim() == "" || this.form.meslistarfin_SER110 < 1 || this.form.meslistarfin_SER110 > 12) {
              CON851("", "Mes incorrecto! ", this._validarfechalistarfin_SER110("2"), "error", "error");
            } else {
              this.form.dialistarfin_SER110 = this.form.dialistarfin_SER110.padStart(2, "0");
              if (this.form.dialistarfin_SER110.trim() == "" || this.form.dialistarfin_SER110 < 1 || this.form.dialistarfin_SER110 > 31) {
                CON851("", "Dia incorrecto! ", this._validarfechalistarfin_SER110("3"), "error", "error");
              } else {
                this.SER110.FECHAFINW = this.form.anolistarfin_SER110 + this.form.meslistarfin_SER110 + this.form.dialistarfin_SER110
                if (moment(this.SER110.FECHAFINW).format('YYYYMMDD').trim() == 'Fecha inválida') {
                  CON851('', 'Dia invalido del mes', null, 'error', 'Error');
                  return this._validarfechalistarfin_SER110("3")
                }
                this.form.anoabonoini_SER110 = this.form.anolistarfin_SER110;
                this.form.mesabonoini_SER110 = this.form.meslistarfin_SER110;
                this.form.diaabonoini_SER110 = this.form.dialistarfin_SER110;
                this._validarfechaabonos_SER110("1");
              }
            }
          }
        },
      );
    },
    _validarfechaabonos_SER110(orden) {
      validarInputs(
        {
          form: "#fechaabonoInicial_110",
          orden: orden,
        },
        () => { this._validarfechalistarfin_SER110('3') },
        () => {
          if (this.form.anoabonoini_SER110.trim() == "") {
            CON851("", "Año incorrecto! ", this._validarfechalistarfin_SER110("1"), "error", "error");
          } else {
            if (this.form.mesabonoini_SER110.trim() == "" || this.form.mesabonoini_SER110 < 1 || this.form.mesabonoini_SER110 > 12) {
              CON851("", "Mes incorrecto! ", this._validarfechalistarfin_SER110("2"), "error", "error");
            } else {
              if (this.form.diaabonoini_SER110.trim() == "" || this.form.diaabonoini_SER110 < 1 || this.form.diaabonoini_SER110 > 31) {
                CON851("", "Dia incorrecto! ", this._validarfechalistarfin_SER110("3"), "error", "error");
              } else {
                this._evaluarrecalcular_SER110();
              }
            }
          }
        },
      );
    },
    _evaluarrecalcular_SER110() {
      if (this.form.recalcular_SER110.trim() == '') {
        this.form.recalcular_SER110 = 'N'
      }
      if($_USUA_GLOBAL[0].NIT == 892000264){
        this.form.recalcular_SER110 = 'S'
      }
      validarInputs(
        {
          form: "#validarrecalcular_110",
          orden: "1",
        },
        () => { this._validarfechaabonos_SER110('3') },
        () => {
          this.form.recalcular_SER110 = this.form.recalcular_SER110.toUpperCase();
          if (this.form.recalcular_SER110 == "S" || this.form.recalcular_SER110 == "N") {
            this._evaluarfechabase_SER110();
          } else {
            CON851("01", "01", this._evaluarrecalcular_SER110(), "error", "error");
          }
        },
      );
    },
    _evaluarfechabase_SER110() {
      var fechabase = [
        { COD: "1", DESCRIP: "Ingreso" },
        { COD: "2", DESCRIP: "Retiro" },
        { COD: "3", DESCRIP: "Present" },
      ];
      POPUP(
        {
          array: fechabase,
          titulo: "FECHA BASE",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          seleccion: '1',
          callback_f: () => {
            this._evaluarrecalcular_SER110();
          },
        },
        fechabase => {
          this.form.fechabase_SER110 = fechabase.COD + " - " + fechabase.DESCRIP;
          setTimeout(this._evaluarordenar_SER110, 300);
        },
      );
    },
    _evaluarordenar_SER110() {
      var ordenar = [
        { COD: "1", DESCRIP: "Factura" },
        { COD: "2", DESCRIP: "Entidad" },
      ];
      POPUP(
        {
          array: ordenar,
          titulo: "ORDENAR",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          seleccion: '1',
          callback_f: () => {
            setTimeout(this._evaluarfechabase_SER110, 300)
          },
        },
        ordenar => {
          this.form.ordenar_SER110 = ordenar.COD + " - " + ordenar.DESCRIP;
          this._evaluarnitalistar_SER110();
        },
      );
    },
    _evaluarnitalistar_SER110() {
      if (this.form.tercero_SER110.trim() == "") this.form.tercero_SER110 = "99";
      validarInputs(
        {
          form: "#validarterceros_110",
          orden: "1",
        },
        this._evaluarordenar_SER110,
        () => {
          if (this.form.tercero_SER110 == "99") {
            this.form.decripter_SER110 = "PROCESO TOTAL";
            this._evaluarmovimientomes_SER110();
          } else {
            this.form.tercero_SER110 = this.form.tercero_SER110.padStart(10, "0")
            let URL = get_url("APP/CONTAB/CON802_01.DLL");
            postData({
              datosh: datosEnvio() + this.form.tercero_SER110 + "|",
            }, URL)
              .then(data => {
                this.ser110._terceros = data.TERCER[0];
                obtenerDatosCompletos(
                  {
                    nombreFd: "ENVIOS",
                  },
                  function (data) {
                    $_this.ser110._envios = data.ENVIOS;
                    $_this.ser110._envios.pop();
                  },
                );
                this.form.decripter_SER110 = this.ser110._terceros.DESCRIP_TER.trim();
                this._evaluarmovimientomes_SER110();

              }).catch(error => {
                console.error(error);
                this._evaluarnitalistar_SER110()
              });
          }
        },
      );
    },
    _evaluarmovimientomes_SER110() {
      if (this.form.movimiento_SER110.trim() == '') {
        this.form.movimiento_SER110 = 'N'
      }
      validarInputs(
        {
          form: "#validarmovimiento_110",
          orden: "1",
        },
        this._evaluarnitalistar_SER110,
        () => {
          this.form.movimiento_SER110 = this.form.movimiento_SER110.toUpperCase();
          if (this.form.movimiento_SER110 == "S" || this.form.movimiento_SER110 == "N") {
            if (this.form.nrohabitacion_SER110.length < 1) this.form.nrohabitacion_SER110 = "****"
            validarInputs(
              {
                form: "#validarhabitacion_110",
                orden: "1",
              },
              this._evaluarnitalistar_SER110,
              this._evaluarvercopago_SER110,
            );
          } else {
            CON851("01", "01", this._evaluarmovimientomes_SER110(), "error", "error");
          }
        },
      );
    },

    _evaluarvercopago_SER110() {
      if (this.form.copagoestim_SER110.trim() == '') {
        this.form.copagoestim_SER110 = 'N'
      }
      validarInputs(
        {
          form: "#validarcopago_110",
          orden: "1",
        },
        this._evaluarmovimientomes_SER110,
        () => {
          this.form.copagoestim_SER110 = this.form.copagoestim_SER110.toUpperCase();
          if (this.form.copagoestim_SER110 == "N" || this.form.copagoestim_SER110 == "S") {
            this._evaluarcentrocosto_SER110();
          } else {
            CON851("01", "01", this._evaluarvercopago_SER110(), "error", "error");
          }
        },
      );
    },
    _evaluarcentrocosto_SER110() {
      if (this.form.costos_SER110.length < 1) this.form.costos_SER110 = "****"
      validarInputs(
        {
          form: "#validarcostos_110",
          orden: "1",
        },
        this._evaluarvercopago_SER110,
        () => {
          if (this.form.costos_SER110 == "****") {
            this.form.descripcostos_SER110 = "TODOS LOS COSTOS";
            this._evaluarservhospitalario_SER110();
          } else {
            const res = this.ser110._costos.find(e => e.COD == this.form.costos_SER110);
            if (res == undefined) {
              CON851("01", "01", this._evaluarcentrocosto_SER110(), "error", "error");
            } else {
              this.form.descripcostos_SER110 = res.NOMBRE;
              this._evaluarservhospitalario_SER110();
            }
          }
        },
      );
    },
    _evaluarservhospitalario_SER110() {
      if (this.form.servhosp_SER110.length < 1) this.form.servhosp_SER110 = "**"
      validarInputs(
        {
          form: "#validarservhosp_110",
          orden: "1",
        },
        this._evaluarcentrocosto_SER110,
        () => {
          if (this.form.servhosp_SER110 == "**") {
            this.form.descripservhosp_SER110 = "TODOS LOS SERVICIOS";
            this._evaluarfacsinsaldo_SER110();
          } else {
            let res = this.ser110._servhosp.find(e => e.ID == this.form.servhosp_SER110);
            if (res == undefined) {
              CON851("01", "01", this._evaluarservhospitalario_SER110(), "error", "error");
            } else {
              this.form.descripservhosp_SER110 = res.DESCRIP;
              this._evaluarfacsinsaldo_SER110();
            }
          }
        },
      );
    },
    _evaluarfacsinsaldo_SER110() {
      if (this.form.facsinsaldo_SER110.trim() == '') {
        this.form.facsinsaldo_SER110 = 'S'
      }
      validarInputs(
        {
          form: "#validarsinsaldo_110",
          orden: "1",
        },
        this._evaluarservhospitalario_SER110,
        () => {
          this.form.facsinsaldo_SER110 = this.form.facsinsaldo_SER110.toUpperCase();
          if (this.form.facsinsaldo_SER110 == "S" || this.form.facsinsaldo_SER110 == "N") {
            this._evaluartipolistado_SER110();
          } else {
            CON851("01", "01", this._evaluarfacsinsaldo_SER110(), "error", "error");
          }
        },
      );
    },
    _evaluartipolistado_SER110() {
      var tipo = [
        { COD: "1", DESCRIP: "Listar solo fact. activas" },
        { COD: "2", DESCRIP: "Listar solo fact. cerradas" },
        { COD: "3", DESCRIP: "Listar todas las facturas" },
        { COD: "4", DESCRIP: "Listar solo fact. anuladas" },
        { COD: "5", DESCRIP: "Listar solo fact. con rips" },
        { COD: "6", DESCRIP: "Listar solo fact. bloqueada" },
      ];
      POPUP(
        {
          array: tipo,
          titulo: "TIPO LISTADO",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          seleccion: '3',
          callback_f: this._evaluarfacsinsaldo_SER110,
        },
        tipo => {
          this.form.listado_SER110 = tipo.COD + " - " + tipo.DESCRIP;
          switch (tipo.COD) {
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
              if (this.form.tercero_SER110 == "99") {
                this._evaluarfactcartera_SER110();
              } else {
                filtroenvios = this.ser110._envios.filter(clase => clase.NIT == this.form.tercero_SER110.trim().padStart(10, "0"));
                this._evaluarenvio1_SER110();
              }
              break;
          }
        },
      );
    },
    _evaluarenvio1_SER110() {
      this.form.envio1_SER110 = "999999";
      validarInputs(
        {
          form: "#validarenvio1_110",
          orden: "1",
        },
        this._evaluartipolistado_SER110,
        () => {
          if (this.form.envio1_SER110 == "999999") {
            this._evaluarfactcartera_SER110();
          } else {
            const res = filtroenvios.find(e => e.NRO == this.form.envio1_SER110);
            if (res == undefined) {
              CON851("01", "01", null, "error", "error");
              this._evaluarenvio1_SER110();
            } else {
              this._evaluarenvio2_SER110();
            }
          }
        },
      );
    },
    _evaluarenvio2_SER110() {
      this.form.envio2_SER110 = "000000";
      validarInputs(
        {
          form: "#validarenvio2_110",
          orden: "1",
        },
        this._evaluartipolistado_SER110,
        () => {
          if (this.form.envio2_SER110.trim() == "" || this.form.envio2_SER110 == "000000") {
            this._evaluarenvio3_SER110();
          } else {
            const res = filtroenvios.find(e => e.NRO == this.form.envio2_SER110);
            if (res == undefined) {
              CON851("01", "01", this._evaluarenvio2_SER110(), "error", "error");
            } else {
              this._evaluarenvio3_SER110();
            }
          }
        },
      );
    },
    _evaluarenvio3_SER110() {
      this.form.envio3_SER110 = "000000";
      validarInputs(
        {
          form: "#validarenvio3_110",
          orden: "1",
        },
        this._evaluartipolistado_SER110,
        () => {
          if (this.form.envio3_SER110.trim() == "" || this.form.envio3_SER110 == "000000") {
            this._evaluarenvio4_SER110();
          } else {
            const res = filtroenvios.find(e => e.NRO == this.form.envio3_SER110);
            if (res == undefined) {
              CON851("01", "01", this._evaluarenvio3_SER110(), "error", "error");
            } else {
              this._evaluarenvio4_SER110();
            }
          }
        },
      );
    },
    _evaluarenvio4_SER110() {
      this.form.envio4_SER110 = "000000";
      validarInputs(
        {
          form: "#validarenvio4_110",
          orden: "1",
        },
        this._evaluartipolistado_SER110,
        () => {
          if (this.form.envio4_SER110.trim() == "" || this.form.envio4_SER110 == "000000") {
            this._evaluarenvio5_SER110();
          } else {
            const res = filtroenvios.find(e => e.NRO == this.form.envio4_SER110);
            if (res == undefined) {
              CON851("01", "01", this._evaluarenvio4_SER110(), "error", "error");
            } else {
              this._evaluarenvio5_SER110();
            }
          }
        },
      );
    },
    _evaluarenvio5_SER110() {
      this.form.envio5_SER110 = "000000";
      validarInputs(
        {
          form: "#validarenvio5_110",
          orden: "1",
        },
        this._evaluartipolistado_SER110,
        () => {
          if (this.form.envio5_SER110.trim() == "" || this.form.envio5_SER110 == "000000") {
            this._evaluarfactcartera_SER110();
          } else {
            const res = filtroenvios.find(e => e.NRO == this.form.envio5_SER110);
            if (res == undefined) {
              CON851("01", "01", this._evaluarenvio5_SER110(), "error", "error");
            } else {
              this._evaluarfactcartera_SER110();
            }
          }
        },
      );
    },

    _evaluarfactcartera_SER110() {
      if (this.form.factcartera_SER110.trim() == '') {
        this.form.factcartera_SER110 = "N";
      }
      validarInputs(
        {
          form: "#validarfactcartera_110",
          orden: "1",
        },
        this._evaluartipolistado_SER110,
        () => {
          this.form.factcartera_SER110 = this.form.factcartera_SER110.toUpperCase();
          if (this.form.factcartera_SER110 == "S" || this.form.factcartera_SER110 == "N") {
            this._evaluaroperadorbloq_SER110();
          } else {
            CON851("01", "01", this._evaluarfactcartera_SER110(), "error", "error");
          }
        },
      );
    },
    _evaluaroperadorbloq_SER110() {
      this.form.operador_SER110 = "****";
      validarInputs(
        {
          form: "#validaroperador_110",
          orden: "1",
        },
        this._evaluartipolistado_SER110,
        () => {
          if (this.form.operador_SER110.trim() == "" || this.form.operador_SER110 == "****") {
            this._evaluarplanbeneficios_SER110();
          } else {
            postData(
              {
                datosh: (datos_envio = datosEnvio() + this.operador_SER110 + "|"),
              },
              get_url("app/CONTAB/CON003.DLL"),
            )
              .then(data => {
                this._evaluarplanbeneficios_SER110();
              })
              .catch(error => {
                this._evaluaroperadorbloq_SER110();
              });
          }
        },
      );
    },
    _evaluarplanbeneficios_SER110() {
      if (($_USUA_GLOBAL[0].PUC == "4" || $_USUA_GLOBAL[0].PUC == "6") && this.form.tercero_SER110 == "9999") {
        var plan = [
          { COD: "1", DESCRIP: "Pos" },
          { COD: "2", DESCRIP: "No Pos" },
          { COD: "3", DESCRIP: "Todos" },
        ];
        POPUP(
          {
            array: plan,
            titulo: "PLAN DE BENEFICIOS",
            indices: [
              {
                id: "COD",
                label: "DESCRIP",
              },
            ],
            seleccion: '1',
            callback_f: this._evaluaroperadorbloq_SER110,
          },
          plan => {
            this.form.plan_SER110 = plan.COD + " - " + plan.DESCRIP;
            this._evaluarreemplazarnit_SER110();
          },
        );
      } else {
        this.form.plan_SER110 = "3 - Todos";
        this._evaluarreemplazarnit_SER110();
      }
    },
    _evaluarreemplazarnit_SER110() {
      if (this.form.codnit_SER110.trim() == '') {
        this.form.codnit_SER110 = "N";
      }
      validarInputs(
        {
          form: "#validarcodnit_110",
          orden: "1",
        },
        this._evaluaroperadorbloq_SER110,
        () => {
          this.form.codnit_SER110 = this.form.codnit_SER110.toUpperCase();
          if (this.form.codnit_SER110 == "S" || this.form.codnit_SER110 == "N") {
            if (this.form.codnit_SER110 == "S" || this.form.tercero_SER110 == "99") {
              if (this.form.fechabase_SER110.substring(0, 1) == "1") {
                postData({ datosh: datosEnvio() + "2|" + " |" + this.form.codnit_SER110 + "|" + this.form.tercero_SER110 + "|" + this.form.fechabase_SER110.substring(0,1) + "|" + this.form.anolistarini_SER110.padEnd(4, "0") + this.form.meslistarini_SER110.padStart(2, "0") + this.form.dialistarini_SER110.padStart(2, "0") }, get_url("APP/SALUD/SER110.DLL"))
                  .then(data => {
                    this._evaluarfactcapitacion_SER110();
                  })
                  .catch(err => {
                    CON851("08", "08", this._validaranolistarini_SER110("1"), "error", "error");
                  });
              } else {
                postData({ datosh: datosEnvio() + "2|" + " |" + this.form.codnit_SER110 + "|" + this.form.tercero_SER110 + "|" + this.form.fechabase_SER110.substring(0,1) + "|" + this.form.anolistarini_SER110.padEnd(4, "0") + this.form.meslistarini_SER110.padStart(2, "0") + this.form.dialistarini_SER110.padStart(2, "0") }, get_url("APP/SALUD/SER110.DLL"))
                  .then(data => {
                    this._evaluarfactcapitacion_SER110();
                  })
                  .catch(err => {
                    CON851("08", "08", this._validaranolistarini_SER110("1"), "error", "error");
                  });
              }
            } else {
              postData({ datosh: datosEnvio() + "2|" + " |" + this.form.codnit_SER110 + "|" + this.form.tercero_SER110 + "|" + this.form.fechabase_SER110.substring(0,1) + "|" + this.form.anolistarini_SER110.padEnd(4, "0") + this.form.meslistarini_SER110.padStart(2, "0") + this.form.dialistarini_SER110.padStart(2, "0") }, get_url("APP/SALUD/SER110.DLL"))
                .then(data => {
                  this._evaluarfactcapitacion_SER110();
                })
                .catch(err => {
                  CON851("01", "01", this._evaluarnitalistar_SER110(), "error", "error");
                });
            }
          } else {
            CON851("01", "01", this._evaluarreemplazarnit_SER110(), "error", "error");
          }
        },
      );
    },
    _evaluarfactcapitacion_SER110() {
      var capita = [
        { COD: "1", DESCRIP: "SOLO MAESTRAS" },
        { COD: "2", DESCRIP: "SOLO PREST. SERVIC" },
        { COD: "3", DESCRIP: "MAESTRAS Y SERVIC" },
        { COD: "4", DESCRIP: "NO MOSTRAR NINGUNA" },
        { COD: "5", DESCRIP: "MAESTRAS Y EVENTO" },
      ];
      POPUP(
        {
          array: capita,
          titulo: "FACT. CAPITACIÓN",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          seleccion: '4',
          callback_f: this._evaluarreemplazarnit_SER110,
        },
        capita => {
          this.form.capitacion_SER110 = capita.COD + " - " + capita.DESCRIP;
          this._evaluarciudad_SER110();
        },
      );
    },
    _evaluarciudad_SER110() {
      this.form.ciudad_SER110 = "*****";
      validarInputs(
        {
          form: "#validarciudad_110",
          orden: "1",
        },
        this._evaluarfactcapitacion_SER110,
        () => {
          if (this.form.ciudad_SER110.trim() == "*****") {
            this.form.descripciudad_SER110 = "TODAS LAS CIUDADES";
            this._evaluarinformeresumido_SER110();
          } else {
            const res = this.ser110._ciudad.find(e => e.COD == this.form.ciudad_SER110);
            if (res == undefined) {
              CON851("01", "01", this._evaluarciudad_SER110(), "error", "error");
            } else {
              this.form.descripciudad_SER110 = res.NOMBRE;
              this._evaluarinformeresumido_SER110();
            }
          }
        },
      );
    },
    _evaluarinformeresumido_SER110() {
      if ($_USUA_GLOBAL[0].NIT == 844003225) {
        $("#validarcodnit_110").removeClass("hidden");
        if (this.form.infresumido_SER110.trim() == '') {
          this.form.infresumido_SER110 = "N";
        }
        validarInputs(
          {
            form: "#validarcodnit_110",
            orden: "1",
          },
          this._evaluarfactcapitacion_SER110,
          () => {
            this.form.infresumido_SER110 = this.form.infresumido_SER110.toUpperCase();
            if (this.form.infresumido_SER110 == "S" || this.form.infresumido_SER110 == "N") {
              if (this.form.infresumido_SER110 == "S") {
                this._evaluarfiltraroper_SER110();
              } else {
                this._validarformato_SER110();
              }
            } else {
              CON851("01", "01", this._evaluarinformeresumido_SER110(), "error", "error");
            }
          },
        );
      } else {
        this.form.codnit_SER110 = "N";
        this._validarformato_SER110();
      }
    },
    _evaluarfiltraroper_SER110() {
      $("#validarcapitacion_110").removeClass("hidden");
      this.form.operador_SER110 = "****";
      validarInputs(
        {
          form: "#validarcapitacion_110",
          orden: "1",
        },
        this._evaluarfactcapitacion_SER110,
        () => {
          if (this.form.operador_SER110.trim() == "" || this.form.operador_SER110 == "****") {
            this._validarformato_SER110();
          } else {
            postData(
              {
                datosh: datosEnvio() + this.form.operador_SER110 + "|",
              },
              get_url("app/CONTAB/CON003.DLL"),
            )
              .then(data => {
                console.log(data)
                this._validarformato_SER110();
              })
              .catch(error => {
                console.error(error)
                this._evaluarfiltraroper_SER110();
              });
          }
        },
      );
    },
    _validarformato_SER110(){
      const _this = this
      POPUP({
        titulo: "FORMATO DE IMPRESIÓN",
        indices: [{ id: 'id', label: 'label' }],
        seleccion: this.tipo_impresion || '1',
        array: [
          { id: 1, label: 'EXCEL' },
          { id: 2, label: 'CSV' },
        ],
        callback_f: () => {
          setTimeout(() => {
            _this._evaluarciudad_SER110()
          }, 300)
        },
      }, (data) => {
        _this.tipo_impresion = data.id
        setTimeout(_this._consultafinal_SER110, 500)
      })
    },
    async _consultafinal_SER110() {
      let fecha_ini = this.form.anolistarini_SER110 + this.form.meslistarini_SER110 + this.form.dialistarini_SER110
      let fecha_fin = this.form.anolistarfin_SER110 + this.form.meslistarfin_SER110 + this.form.dialistarfin_SER110
      // let rango_fechas = rango_fecha_meses(fecha_ini, fecha_fin)
      let consulta_general = [] 
      let datos_envio = [
        "3",
        this.form.prefijo_SER110,
        this.form.codnit_SER110,
        this.form.tercero_SER110,
        this.form.fechabase_SER110.substring(0, 1),
        this.form.plan_SER110.substring(0, 1),
        this.form.operador_SER110,
        this.form.envio1_SER110,
        this.form.envio2_SER110,
        this.form.envio3_SER110,
        this.form.envio4_SER110,
        this.form.envio5_SER110,
        this.form.listado_SER110.substring(0, 1),
        this.form.costos_SER110,
        this.form.servhosp_SER110,
        this.form.nrohabitacion_SER110,
        this.form.capitacion_SER110.substring(0, 1),
        this.form.ordenar_SER110.substring(0, 1),
        this.form.ciudad_SER110,
        this.form.movimiento_SER110,
        this.form.facsinsaldo_SER110,
        this.form.factcartera_SER110,
        this.form.anolistarini_SER110 + this.form.meslistarini_SER110 + this.form.dialistarini_SER110,
        this.form.anolistarfin_SER110 + this.form.meslistarfin_SER110 + this.form.dialistarfin_SER110,
        this.form.operador_SER110,
        this.form.infresumido_SER110,
        this.form.recalcular_SER110,
        localStorage.Usuario
      ];
      this.estado_loader = true;
      this.label_loader = `Procesando mes: ${moment(fecha_ini).format('YYYY/MM/DD')} - ${moment(fecha_fin).format('YYYY/MM/DD')}`;
      this.progreso = { transferred: 0, speed: 0 }
      let data = await this.procesar_envio(datos_envio)
      consulta_general = consulta_general.concat(data)
      this.loader = false
      this.label_loader = `GENERANDO IMPRESIÓN...`;
      this.progreso.completado = true
      setTimeout(() => {
        let tipo_impresion = this.tipo_impresion
        if (tipo_impresion == 1) this.format_impresion(consulta_general)
        else if (tipo_impresion == 2) this.format_csv(consulta_general)
      }, 700)
    },
    procesar_envio(datos_envio) {
      console.log(datos_envio)
      const _this = this
      return new Promise((resolve) => {
        let URL = get_url("APP/SALUD/SER110.DLL");
        postData({
          datosh: datosEnvio() + datos_envio.join('|')
        }, URL, {
          onProgress: (progress) => {
            _this.progreso = progress;
          }
        })
          .then(data => {
            data = data.FACTURAS
            data.pop()
            resolve(data)
          })
          .catch(err => {
            console.error('Ha ocurrido un error durante la consulta:', err)
            resolve([])
          })
      })
    },
    format_csv(datos){
      _impresion2({
        tipo: 'csv',
        datos: datos,
        columnas: false
      })
        .then(() => {
          this.estado_loader = false
          CON851(
            "",
            "Impreso Correctamente",
            null,
            "success",
            "Exito"
          );
          _toggleNav()
        })
        .catch(() => {
          this.estado_loader = false
          CON851('', 'Ha ocurrido un error generando la impresión.', null, 'error', 'Error')
          this._evaluarciudad_SER110()
        })
    },
    format_impresion(data) {
      columnas = [
        {
          title: "FACT.",
          value: 'LLAVE',
        },
        {
          title: "FACTURA ELECTRONICA",
          value: 'ESTADOELEC',
          format: 'string',
        },
        {
          title: "FECHA ELECTRONICA",
          value: 'FECHA_RAD_ELEC',
        },
        {
          title: "NIT",
          value: 'NIT',
        },
        {
          title: "ENTIDAD",
          value: 'DESCRIP',
        },
        {
          title: "MODALIDAD",
          value: 'DESCRIPZONA_TER',
        },
        {
          title: "TIPO DOCUMENTO",
          value: 'TIPOID_PACI',
        },
        {
          title: "No DOCUMENTO",
          value: 'ID_PACIENTE',
        },
        {
          title: "PACIENTE",
          value: 'NOMBRE_PACIENTE',
        },
        {
          title: "EDAD",
          value: 'EDAD_PACI',
        },
        {
          title: "SEXO",
          value: 'SEXO',
        },
        {
          title: "HAB",
          value: 'HABITACION',
        },
        {
          title: "F.INGRES",
          value: 'FECHA_ING',
          format: 'fecha',
        },
        {
          title: "F.EGRESO",
          value: 'FECHA_RET',
          format: 'fecha',
        },
        {
          title: "F.PRESEN",
          value: 'FECHA_PRE',
          format: 'fecha',
        },
        {
          title: "OPER ABR",
          value: 'OPER',
        },
        {
          title: "OPER MOD",
          value: 'OPER_MOD',
        },
        {
          title: "OPER CERRO",
          value: 'OPER_BLOQ',
        },
        {
          title: "EST.",
          value: 'ESTADO',
        },
        {
          title: "F.MOD",
          value: 'FECHA_BLOQ',
          format: 'fecha',
        },
        {
          title: "NRO ENV",
          value: 'ENVIO',
        },
        {
          title: "F.ENVIO",
          value: 'FECHA_ENV',
          format: 'fecha',
        },
        {
          title: "VLR BRUTO",
          value: 'VLR_BRUTO',
          format: 'money'
        },
        {
          title: "NUMERO RECIBO DE CAJA",
          value: 'VALOR_ABONOS',
          format: 'money'
        },
        {
          title: "FECHA RECIBO DE CAJA",
          value: 'FECHA_ABON',
          format: 'fecha',
        },
        {
          title: "CTAS MODERA",
          value: 'VLR_COPAGOS',
          format: 'money'
        },
        {
          title: "GLOSAS ACPET",
          value: 'VLR_GLOSAS',
          format: 'money'
        },
        {
          title: "NOTAS",
          value: 'VLR_NOTAS',
          format: 'money'
        },
        {
          title: "ABONOS",
          value: 'VLR_ABONOS',
          format: 'money'
        },
        {
          title: "NETO",
          value: 'VLR_NETO',
          format: 'money'
        },
        {
          title: "VLR RADICADO",
          value: 'VLR_RADICADO',
          format: 'money'
        },
        {
          title: "VLR SIN RADICAR",
          value: 'VLR_NORADICADO',
          format: 'money'
        },
        {
          title: "COD CIUDAD",
          value: 'COD_CIU',
        },
        {
          title: "CIUDAD",
          value: 'CIUDAD',
        },
        {
          title: "% COPAGO",
          value: 'PORC_COPAGO',
        },
        {
          title: "VLR COPAGO",
          value: 'COPAGO_EST',
        },
        {
          title: "DIRECCION",
          value: 'DIRECC',
        },
        {
          title: "TELEFONO",
          value: 'TEL',
        },
        {
          title: "AUTORIZACION",
          value: 'NRO_AUTORI',
        },
        {
          title: "OBSERVACIONES",
          value: 'OBSERV',
        },
        {
          title: "ANEXOS",
          value: 'ANEXOS',
          format: 'string',
        },
        {
          title: "FECHA ABONO",
          value: 'FECHA_ABON',
          format: 'fecha',
        },
        {
          title: "CONVENIO",
          value: 'CONVENIO',
        },
        {
          title: "CONTRATO",
          value: 'CONTRATO',
        },
        {
          title: "MYT",
          value: 'MYT',
        },
        {
          title: "T. PACIENTE",
          value: 'TIPO_PACI',
        },
        {
          title: "FECHA TRASA",
          value: 'FECHA_ENTRE',
          format: 'fecha',
        },
        {
          title: "ESTADO TRASA",
          value: 'ESTA_ENTRE',
        },
        {
          title: "ACTIVIDAD",
          value: 'ACTIVIDAD',
        },
        {
          title: "NOMBRE ACT",
          value: 'NOMBRE_ACT',
        },
        {
          title: "TIPO FACT",
          value: 'TIPO_FACTU',
        },
        {
          title: "NRO ENVIO FURIPS",
          value: 'ENVIO_FURIPS',
        },
        {
          title: "BLOQUEO X RIPS",
          value: 'SEG_RIPS',
        },
        {
          title: "FECHA DE CREADA CENTRO COS",
          value: 'FECHA_CRE',
          format: 'fecha',
        },
        {
          title: "VALOR AJUSTE CAP",
          value: 'VLR_AJUSCAP',
        },
        {
          title: "CANTIDAD MEDICAM",
          value: 'CANT_CL0',
        },
        {
          title: "CANTIDAD QX CANT LABOR",
          value: 'CANT_CL1',
        },
        {
          title: "CANTIDAD RX CANT SERV",
          value: 'CANT_CL3',
        },
        {
          title: "CANTIDAD CONS",
          value: 'CANT_CL5',
        },
        {
          title: "CANTIDAD PYP",
          value: 'CANT_CL7',
        },
        {
          title: "DIAG",
          value: 'DIAG_FACT',
        },
        {
          title: "DESCRIP DIAG",
          value: 'NOMBRE_ENF',
        },
        {
          title: "NRO DE RADICADO EXTERNO",
          value: 'READICADO_EXTER',
        },
        {
          title: "CUFE",
          value: 'CUFE',
          format: 'string',
        },
        {
          title: "NOTA CREDITO",
          value: 'NOTA_CREDITO',
          format: 'string',
        },
        {
          title: "VALOR NOTA CREDITO",
          value: 'VALOR_CREDITO',
          format: 'string',
        },
        {
          title: "LISTO PARA RIPS",
          value: 'LISTRIPS',
          format: 'string',
        },
      ]
      _impresion2({
        tipo: 'excel',
        header: [
          { text: `${$_USUA_GLOBAL[0].NOMBRE}`, bold: true, size: 16 },
          `LISTA DE FACTURACION`,
        ],
        logo: `${$_USUA_GLOBAL[0].NIT}.png`,
        tabla: {
          columnas,
          data: data,
        },
        archivo: localStorage.getItem('Usuario') + moment().format('YYYYMMDDHHmmssS'),
      })
        .then(() => {
          this.estado_loader = false
          CON851('', 'Impreso Correctamente', _toggleNav(), 'success', 'Exito')
        })
        .catch(() => {
          this.estado_loader = false
          CON851('', 'Hubo un error en la impresión', this._evaluarciudad_SER110(), 'error', 'Error')
        })
    },

    _f8terceros_SER110() {
      var $_this = this;
      parametros = {
        dll: 'TERCEROS',
        valoresselect: ['Buscar por nombre tercero'],
        f8data: 'TERCEROS',
        columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }],
        callback: (data) => {
          $_this.variableter = data.COD
          $_this.form.tercero_SER110 = $_this.variableter.trim().padStart(10, '0')
          _enterInput(".terceros_SER110");
        },
        cancel: () => {
          $(".terceros_SER110").focus();
        }
      };
      F8LITE(parametros);
    },
    _f8costos_SER110() {
      var $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE CONSULTA CENTRO DE COSTOS",
        columnas: ["COD", "NOMBRE"],
        data: $_this.ser110._costos,
        callback_esc: function () {
          $(".costos_SER110").focus();
        },
        callback: function (data) {
          $_this.form.costos_SER110 = data.COD.trim();
          _enterInput(".costos_SER110");
        },
      });
    },
    _f8operador_SER110() {
      var $_this = this;
      _ventanaDatos({
        titulo: "GRUPOS DE OPERADORES",
        columnas: ["CODIGO", "DESCRIPCION", "ID"],
        data: $_this.ser110._operador,
        callback_esc: function () {
          $(".operador_SER110").focus();
        },
        callback: function (data) {
          $_this.form.operador_SER110 = data.CODIGO.trim();
          _enterInput(".operador_SER110");
        },
      });
    },
    _f8ciudad_SER110() {
      var $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE CONSULTA DE CIUDADES",
        columnas: ["COD", "NOMBRE", "PAIS", "NOM_PAIS", "DEPART"],
        data: $_this.ser110._ciudad,
        callback_esc: function () {
          $(".ciudad_SER110").focus();
        },
        callback: function (data) {
          $_this.form.ciudad_SER110 = data.COD.trim();
          _enterInput(".ciudad_SER110");
        },
      });
    },
    _f8envios_SER110() {
      var $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE ENVIOS",
        columnas: ["NRO", "NIT", "DESCRIPCION_TERCERO", "FECHA", "OBSERVACION"],
        data: filtroenvios,
        callback_esc: function () {
          $(".envios1_ser110").focus();
        },
        callback: function (data) {
          $_this.form.envio1_SER110 = data.NRO.trim();
          _enterInput(".envios1_ser110");
        },
      });
    },
    _f8envios2_SER110() {
      var $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE ENVIOS",
        columnas: ["NRO", "NIT", "DESCRIPCION_TERCERO", "FECHA", "OBSERVACION"],
        data: filtroenvios,
        callback_esc: function () {
          $(".envios2_ser110").focus();
        },
        callback: function (data) {
          $_this.form.envio2_SER110 = data.NRO.trim();
          _enterInput(".envios2_ser110");
        },
      });
    },
    _f8envios3_SER110() {
      var $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE ENVIOS",
        columnas: ["NRO", "NIT", "DESCRIPCION_TERCERO", "FECHA", "OBSERVACION"],
        data: filtroenvios,
        callback_esc: function () {
          $(".envios3_ser110").focus();
        },
        callback: function (data) {
          $_this.form.envio3_SER110 = data.NRO.trim();
          _enterInput(".envios3_ser110");
        },
      });
    },
    _f8envios4_SER110() {
      var $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE ENVIOS",
        columnas: ["NRO", "NIT", "DESCRIPCION_TERCERO", "FECHA", "OBSERVACION"],
        data: filtroenvios,
        callback_esc: function () {
          $(".envios4_ser110").focus();
        },
        callback: function (data) {
          $_this.form.envio4_SER110 = data.NRO.trim();
          _enterInput(".envios4_ser110");
        },
      });
    },
    _f8envios5_SER110() {
      var $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE ENVIOS",
        columnas: ["NRO", "NIT", "DESCRIPCION_TERCERO", "FECHA", "OBSERVACION"],
        data: filtroenvios,
        callback_esc: function () {
          $(".envios5_ser110").focus();
        },
        callback: function (data) {
          $_this.form.envio5_SER110 = data.NRO.trim();
          _enterInput(".envios5_ser110");
        },
      });
    },
    _f8servhospitalarios_SER110() {
      var $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE SERVICIOS HOSPITALARIOS",
        columnas: ["ID", "DESCRIPCION"],
        data: $_this.ser110._servhosp,
        callback_esc: function () {
          $(".servhosp_SER110").focus();
        },
        callback: function (data) {
          $_this.form.servhosp_SER110 = data.ID.trim();
          _enterInput(".servhosp_SER110");
        },
      });
    },
  },
});
