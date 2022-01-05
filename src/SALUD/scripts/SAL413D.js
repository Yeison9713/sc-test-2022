// 02/06/2021 - DIANA ESCOBAR: CREADO
new Vue({
  el: "#SAL413D",
  data: {
    SAL413D: [],
    form: {
      anoini_SAL413D: "",
      mesini_SAL413D: "",
      diaini_SAL413D: "",
      anofin_SAL413D: "",
      mesfin_SAL413D: "",
      diafin_SAL413D: "",
      terceros_SAL413D: "",
      descripterceros_SAL413D: "",
      prefijo_SAL413D: "",
      numero_SAL413D: "",
      tipocomp_SAL413D: "",
      descriptipo_SAL413D: "",
      sucursal_SAL413D: "",
      descripsuc_SAL413D: "",
      paciente_SAL413D: "",
      descrippaci_SAL413D: "",
      descripnumero_SAL413D: "",
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,4,B - Impresion masiva comprobantes");
    $_this = this;
    $_this.SAL413D.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SAL413D.ANO_LNK = $_this.SAL413D.FECHA_LNK.substring(0, 2);
    $_this.SAL413D.MES_LNK = $_this.SAL413D.FECHA_LNK.substring(2, 4);
    $_this.SAL413D.DIA_LNK = $_this.SAL413D.FECHA_LNK.substring(4, 6);
    if ($_USUA_GLOBAL[0].NIT == "0800156469") {
      $_this.SAL413D.SERVICIOS = [
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
      $_this.SAL413D.SERVICIOS = [
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
    obtenerDatosCompletos(
      {
        nombreFd: "SUCURSALES",
      },
      function (data) {
        $_this.SAL413D.SUCURSAL = data.SUCURSAL;
        // $_this.SAL413D.SUCURSAL.pop();
        obtenerDatosCompletos({ nombreFd: "PREFIJOS" }, (data) => {
          data = data.PREFIJOS;
          $_this.SAL413D.PREFIJOS = data;
          loader("hide");
          $_this._evaluarfechaini_SAL413D("1");
        });
      }
    );
  },
  methods: {
    _evaluarfechaini_SAL413D(orden) {
      this.form.anoini_SAL413D = 20 + this.SAL413D.ANO_LNK;
      this.form.mesini_SAL413D = this.SAL413D.MES_LNK;
      this.form.diaini_SAL413D = "01";
      validarInputs(
        {
          form: "#fechaInicial_SAL413D",
          orden: orden,
        },
        () => {
          _toggleNav();
        },
        () => {
          if (this.form.anoini_SAL413D.trim() == "") {
            CON851("", "Año incorrecto! ", null, "error", "error");
            this._validarfecha_SAL413D("1");
          } else {
            if (
              this.form.mesini_SAL413D.trim() == "" ||
              this.form.mesini_SAL413D < 01 ||
              this.form.mesini_SAL413D > 12
            ) {
              CON851("", "Mes incorrecto! ", null, "error", "error");
              this._validarfecha_SAL413D("2");
            } else {
              if (
                this.form.diaini_SAL413D.trim() == "" ||
                this.form.diaini_SAL413D < 01 ||
                this.form.diaini_SAL413D > 31
              ) {
                CON851("", "dia incorrecto! ", this._validarfecha_SAL413D("3"), "error", "error");
              } else {
                this.SAL413D.FECHAINIW = this.form.anoini_SAL413D + this.form.mesini_SAL413D + this.form.diaini_SAL413D;
                postData(
                  { datosh: datosEnvio() + "1|" + this.SAL413D.FECHAINIW + "|" },
                  get_url("APP/SALUD/SAL544C.DLL")
                )
                  .then((data) => {
                    console.log(data, "PASO 1 ");
                    this._evaluarfechafin_SAL413D("1");
                  })
                  .catch((err) => {
                    console.error(err);
                    this._evaluarfechaini_SAL413D("1");
                  });
              }
            }
          }
        }
      );
    },
    _evaluarfechafin_SAL413D(orden) {
      this.form.anofin_SAL413D = 20 + this.SAL413D.ANO_LNK;
      this.form.mesfin_SAL413D = this.SAL413D.MES_LNK;
      this.form.diafin_SAL413D = this.SAL413D.DIA_LNK;
      validarInputs(
        {
          form: "#fechaFinal_SAL413D",
          orden: orden,
        },
        () => {
          this._evaluarfechaini_SAL413D("3");
        },
        () => {
          if (this.form.anofin_SAL413D.trim() == "") {
            CON851("", "Año incorrecto! ", null, "error", "error");
            this._evaluarfechafin_SAL413D("1");
          } else {
            if (
              this.form.mesfin_SAL413D.trim() == "" ||
              this.form.mesfin_SAL413D < 01 ||
              this.form.mesfin_SAL413D > 12
            ) {
              CON851("", "Mes incorrecto! ", null, "error", "error");
              this._evaluarfechafin_SAL413D("2");
            } else {
              if (
                this.form.diafin_SAL413D.trim() == "" ||
                this.form.diafin_SAL413D < 01 ||
                this.form.diafin_SAL413D > 31
              ) {
                CON851("", "dia incorrecto! ", this._evaluarfechafin_SAL413D("3"), "error", "error");
              } else {
                this.SAL413D.FECHAFINW = this.form.anofin_SAL413D + this.form.mesfin_SAL413D + this.form.diafin_SAL413D;
                if (this.SAL413D.FECHAFINW < this.SAL413D.FECHAINIW) {
                  CON851("37", "37", this._evaluarfechafin_SAL413D("3"), "error", "error");
                } else {
                  this._evaluarnitentidad_SAL413D();
                }
              }
            }
          }
        }
      );
    },
    _evaluarnitentidad_SAL413D() {
      if (this.form.terceros_SAL413D.trim() == "") this.form.terceros_SAL413D = "99";
      validarInputs(
        {
          form: "#VALIDAR1_SAL413D",
          orden: "1",
        },
        () => {
          this._evaluarfechafin_SAL413D("3");
        },
        () => {
          if (this.form.terceros_SAL413D == "99") {
            this.form.descripterceros_SAL413D = "PROCESA TOTAL";
            this._evaluarprefijo_SAL413D();
          } else {
            this.form.terceros_SAL413D = this.form.terceros_SAL413D.padStart(10, "0");
            let URL = get_url("APP/CONTAB/CON802_01.DLL");
            postData(
              {
                datosh: datosEnvio() + this.form.terceros_SAL413D + "|",
              },
              URL
            )
              .then((data) => {
                this.SAL413D.TERCEROS = data.TERCER[0];
                this.form.descripterceros_SAL413D = this.SAL413D.TERCEROS.DESCRIP_TER.trim();
                this._evaluarprefijo_SAL413D();
              })
              .catch((error) => {
                console.error(error);
                this._evaluarnitentidad_SAL413D();
              });
          }
        }
      );
    },
    _evaluarprefijo_SAL413D() {
      if (this.form.prefijo_SAL413D.trim() == "") this.form.prefijo_SAL413D = "*";
      validarInputs(
        {
          form: "#VALIDAR2_SAL413D",
          orden: "1",
        },
        () => {
          this._evaluarnitentidad_SAL413D();
        },
        () => {
          this.form.prefijo_SAL413D = this.form.prefijo_SAL413D.toUpperCase();
          if (this.form.prefijo_SAL413D == "*") {
            this.form.numero_SAL413D = "000000";
            this._mostrarfactura_SAL413D();
          } else {
            if (
              this.form.prefijo_SAL413D != "C" ||
              this.form.prefijo_SAL413D != "E" ||
              this.form.prefijo_SAL413D != "U" ||
              this.form.prefijo_SAL413D.trim() != ""
            ) {
              this._evaluarnumero_SAL413D();
            } else {
              CON851("03", "03", null, "error", "error");
              this._evaluarprefijo_SAL413D();
            }
          }
        }
      );
    },
    _evaluarnumero_SAL413D() {
      validarInputs(
        {
          form: "#VALIDAR3_SAL413D",
          orden: "1",
        },
        () => {
          this._evaluarprefijo_SAL413D();
        },
        () => {
          this.form.numero_SAL413D = this.form.numero_SAL413D.toString().padStart(6, "0");
          this._mostrarfactura_SAL413D();
        }
      );
    },
    _mostrarfactura_SAL413D() {
      if (this.form.prefijo_SAL413D == "*") {
        this.form.descripnumero_SAL413D = "TODOS LAS FACTURAS";
        this._evaluartipo_SAL413D();
      } else {
        let URL = get_url("APP/SALUD/SER808-01.DLL");
        postData(
          {
            datosh: datosEnvio() + this.form.prefijo_SAL413D + this.form.numero_SAL413D + "|",
          },
          URL
        )
          .then((data) => {
            this.SAL413D.FACTURACION = data.NUMER19[0];
            this.form.descripnumero_SAL413D = this.SAL413D.FACTURACION.DESCRIP_NUM;
            this._evaluartipo_SAL413D();
          })
          .catch((error) => {
            this._evaluarnumero_SAL413D();
          });
      }
    },
    _evaluartipo_SAL413D() {
      if (this.form.tipocomp_SAL413D.trim() == "") this.form.tipocomp_SAL413D = "*";
      validarInputs(
        {
          form: "#VALIDAR4_SAL413D",
          orden: "1",
        },
        () => {
          this._evaluarprefijo_SAL413D();
        },
        () => {
          if (this.form.tipocomp_SAL413D == "*") {
            this.form.descriptipo_SAL413D = "TODOS LOS TIPOS";
            this._evaluarsucursal_SAL413D();
          } else {
            let array = this.SAL413D.SERVICIOS.filter((x) => x.COD == this.form.tipocomp_SAL413D.trim());
            if (array.length > 0) {
              this.form.tipocomp_SAL413D = array[0].COD;
              this.form.descriptipo_SAL413D = array[0].DESCRIPCION;
              this._evaluarsucursal_SAL413D();
            } else {
              CON851("03", "03", this._datotipo_SAL413D(), "error", "error");
            }
          }
        }
      );
    },
    _evaluarsucursal_SAL413D() {
      if (this.form.sucursal_SAL413D.trim() == "") this.form.sucursal_SAL413D = "**";
      validarInputs(
        {
          form: "#VALIDAR5_SAL413D",
          orden: "1",
        },
        () => {
          this._evaluartipo_SAL413D();
        },
        () => {
          this.form.sucursal_SAL413D = this.form.sucursal_SAL413D.toUpperCase();
          if (this.form.sucursal_SAL413D == "**") {
            this.form.descripsuc_SAL413D = "TODAS LAS SUCURSALES";
            this._evaluarpaciente_SAL413D();
          } else {
            const res = this.SAL413D.SUCURSAL.find((e) => e.CODIGO == this.form.sucursal_SAL413D);
            if (res == undefined) {
              CON851("01", "01", this._evaluarsucursal_SAL413D(), "error", "error");
            } else {
              this.form.descripsuc_SAL413D = res.DESCRIPCION;
              this._evaluarpaciente_SAL413D();
            }
          }
        }
      );
    },
    _evaluarpaciente_SAL413D() {
      if (this.form.paciente_SAL413D.trim() == "") this.form.paciente_SAL413D = "99";
      validarInputs(
        {
          form: "#VALIDAR6_SAL413D",
          orden: "1",
        },
        () => {
          this._evaluarsucursal_SAL413D();
        },
        () => {
          if (this.form.paciente_SAL413D == "99") {
            this.form.descrippaci_SAL413D = "TODOS LOS PACIENTES";
            this._evaluardll_impresion_SER413D();
          } else {
            this.form.paciente_SAL413D = this.form.paciente_SAL413D.padStart(15, "0").toUpperCase();
            let URL = get_url("APP/SALUD/SER810-1.DLL");
            postData(
              {
                datosh: datosEnvio() + this.form.paciente_SAL413D + "|",
              },
              URL
            )
              .then((data) => {
                this.SAL413D.PACIENTES = data["REG-PACI"];
                this.form.descrippaci_SAL413D = this.SAL413D.PACIENTES.DESCRIP;
                this._evaluardll_impresion_SER413D();
              })
              .catch((error) => {
                console.error(error);
                this._evaluarpaciente_SAL413D();
              });
          }
        }
      );
    },
    _evaluardll_impresion_SER413D() {
      loader("show");
      let URL = get_url("APP/SALUD/SAL413D.DLL");
      postData(
        {
          datosh:
            datosEnvio() +
            this.SAL413D.FECHAINIW +
            "|" +
            this.SAL413D.FECHAFINW +
            "|" +
            this.form.terceros_SAL413D +
            "|" +
            this.form.prefijo_SAL413D +
            "|" +
            this.form.numero_SAL413D +
            "|" +
            this.form.tipocomp_SAL413D +
            "|" +
            this.form.sucursal_SAL413D +
            "|" +
            this.form.paciente_SAL413D +
            "|",
        },
        URL
      )
        .then(async (data) => {
          this.SAL413D.COMPROBANTES = data["FACTURA"];
          let datos = data.FACTURA;
          datos.pop();
          if (datos.length > 0) {
            for (let i in datos) {
              datos[i].FACTURACION = [];
              for (let x in datos[i].TABLA) {
                if (datos[i].TABLA[x].ARTICULO.trim() != "") {
                  datos[i].FACTURACION.push({
                    ARTICULO: datos[i].TABLA[x].ARTICULO,
                    DESCRIPCIONART: datos[i].TABLA[x].DESCRIP_ART,
                    ALMACEN: datos[i].TABLA[x].ALMACEN,
                    CANTIDAD: datos[i].TABLA[x].CANTIDAD,
                    UNIDAD: datos[i].TABLA[x].UNIDAD,
                    VALORUNIT: datos[i].TABLA[x].VALOR_UNIT,
                    VALORTOTAL: datos[i].TABLA[x].VALOR_FACT,
                    CODIGOLOTE: datos[i].TABLA[x].COD_LOTE,
                    DIASTRATA: datos[i].TABLA[x].DIASTRATAFACT,
                  });
                }
              }

              this._impresion(datos[i]);
            }
            _toggleNav();
          } else {
            CON851("", "08", null, "error", "Error");
            this._evaluarpaciente_SAL413D();
          }
          loader("hide");
        })
        .catch((error) => {
          console.error(error);
          this._evaluarpaciente_SAL413D();
        });
    },

    _impresion(data) {
      return new Promise((resolve) => {
        let SAL413D = new Object();
        SAL413D.IMPRESION = [];
        SAL413D.VLRIVAFACT = 0;

        SAL413D.IMPRESION.NOMBREUSU = $_USUA_GLOBAL[0].NOMBRE;
        SAL413D.IMPRESION.NIT = $_USUA_GLOBAL[0].NIT;
        SAL413D.IMPRESION.NITUSU = "NIT" + $_USUA_GLOBAL[0].NIT.toString();
        switch ($_USUA_GLOBAL[0].IVA_S) {
          case "C":
            SAL413D.IMPRESION.IVAUSU = "IVA REG. COMUN-RETENEDOR";
            break;
          case "S":
            SAL413D.IMPRESION.IVAUSU = "IVA REGIMEN SIMPLIFICADO";
            break;
          case "N":
            SAL413D.IMPRESION.IVAUSU = "NO RESPONSABLES DE IVA";
            break;
          default:
            SAL413D.IMPRESION.IVAUSU = "";
            break;
        }
        switch (data.PUERTA_ESTAD) {
          case "1":
            SAL413D.IMPRESION.PUERTAW = "A1";
            break;
          case "2":
            SAL413D.IMPRESION.PUERTAW = "CE";
            break;
          case "3":
            SAL413D.IMPRESION.PUERTAW = "RE";
            break;
          case "4":
            SAL413D.IMPRESION.PUERTAW = "NA";
            break;
        }
        switch (data.PREFIJO) {
          case "E":
            SAL413D.IMPRESION.FPAGO = "CONTADO";
            break;
          case "C":
            SAL413D.IMPRESION.FPAGO = "CREDITO";
            break;
          case "P":
            SAL413D.IMPRESION.FPAGO = "Hospit.";
            break;
          case "T":
            SAL413D.IMPRESION.FPAGO = "A. Trans";
            break;
          default:
            SAL413D.IMPRESION.FPAGO = "Ambulat.";
            break;
        }
        switch (data.TIPO_PACI) {
          case "C":
            SAL413D.IMPRESION.TIPOUSUW = "CONTR.";
            break;
          case "S":
            SAL413D.IMPRESION.TIPOUSUW = "SUBSID";
            break;
          case "V":
            SAL413D.IMPRESION.TIPOUSUW = "VINCUL";
            break;
          case "P":
            SAL413D.IMPRESION.TIPOUSUW = "PARTIC";
            break;
          case "0":
            SAL413D.IMPRESION.TIPOUSUW = "OTRO";
            break;
          default:
            SAL413D.IMPRESION.TIPOUSUW = "";
            break;
        }
        if ($_USUA_GLOBAL[0].BARRAS == "N") {
          SAL413D.IMPRESION.CODIGOBARRAS = "";
        }
        if ($_USUA_GLOBAL[0].BARRAS != "N") {
          SAL413D.IMPRESION.CODIGOBARRAS = `${data.SUC}${data.CLASE.slice(0, 1)}${data.NRO.padStart(6, "0")}`;
        }
        SAL413D.IMPRESION.DIRECCIONUSU = $_USUA_GLOBAL[0].DIRECC;
        SAL413D.IMPRESION.TELEFONOUSU = $_USUA_GLOBAL[0].TEL.trim();
        SAL413D.IMPRESION.NOMBRECIUUSU = $_USUA_GLOBAL[0].NOMBRE_CIU;
        SAL413D.IMPRESION.CLASESERVICIO = `${data.CLASE.slice(0, 1)}${data.CLASE.slice(1)}`;
        SAL413D.IMPRESION.FECHAFACT = moment(data.FECHA).format("MMMM DD/YY").toUpperCase();
        SAL413D.IMPRESION.FECHAACT = moment().format("YYYYMMDD HH:mm");
        SAL413D.IMPRESION.FACTURA = `${data.PREFIJO}${data.NRO_CTA.padStart(6, "0")}`;
        SAL413D.IMPRESION.COMPROBANTE = data.NRO.padStart(6, "0");
        SAL413D.IMPRESION.DESCRIPTER = data.DESCRIP_TER;
        SAL413D.IMPRESION.CODIGOEPS = data.EPS_PACI;
        SAL413D.IMPRESION.ATIENDE = data.DESCRIP_MED1;
        SAL413D.IMPRESION.ESPECIALIDAD = `${data.ESPEC} ${data.DESCRIP_ESPEC}`;
        SAL413D.IMPRESION.COSTO = `${data.COSTO_FACT} ${data.NOMBRE_COSTO}`;
        SAL413D.IMPRESION.PACIENTE = `${parseInt(data.ID_PACIENTE)} ${data.TIPO_ID_PACI} ${data.DESCRIP_PACI}`;
        SAL413D.IMPRESION.UNSERVFACT = data.UNIDAD_SERVICIO;
        SAL413D.IMPRESION.OCUPACION = data.OCUP_PACI;
        SAL413D.IMPRESION.EDAD = data.EDAD;
        SAL413D.IMPRESION.SEXO = data.SEXO;
        SAL413D.IMPRESION.CIUDAD = data.CIUDAD_PACI;
        SAL413D.IMPRESION.ZONA = data.ZONA_PACI;
        SAL413D.IMPRESION.DETALLE = data.DETALLE_FACT;
        SAL413D.IMPRESION.NROAUTOR = data.NRO_AUTOR_ELAB;
        SAL413D.IMPRESION.SOLICITA = data.DESCRIP_MED2;
        let valorenletra = FAC146(data.VALOR_BRUTO.replace(/,/g, ""));
        SAL413D.IMPRESION.SON = "SON : " + valorenletra;
        if (data) SAL413D.IMPRESION.ORIGINAL = "*** ORIGINAL ***";
        else SAL413D.IMPRESION.ORIGINAL = "*** COPIA ****";

        SAL413D.IMPRESION.TABLA = data.FACTURACION;
        SAL413D.IMPRESION.COLUMNAS = ["ARTICULO", "DESCRIPCIONART", "CANTIDAD", "VALORUNIT", "VALORTOTAL"];
        SAL413D.IMPRESION.ACCESO = data.PUERTA_ESTAD;
        SAL413D.IMPRESION.BARRASFACT = $_USUA_GLOBAL[0].BARRAS;
        SAL413D.IMPRESION.FECHAELABORADO = `${data.FECHA_ELAB} ${data.HORA_ELAB}`;
        for (var i in this.SAL413D.PREFIJOS.TABLA) {
          if (this.SAL413D.PREFIJOS.TABLA[i].PREFIJO.trim() == data.PREFIJO.trim()) {
            SAL413D.IMPRESION.RESOLDIAN = this.SAL413D.PREFIJOS.TABLA[i].AUT_DIAN;
          }
        }
        SAL413D.IMPRESION.VLRIVAFACT = SAL413D.VLRIVAFACT;
        SAL413D.IMPRESION.VLRTOTAL = data.VALOR_BRUTO;
        SAL413D.IMPRESION.COPAGO = data.COPAGO_ESTIM_PAGO;
        if (isNaN(parseInt(data.COPAGO_ESTIM_PAGO))) data.COPAGO_ESTIM_PAGO = "0.00";
        SAL413D.IMPRESION.SALDO = (parseInt(data.VALOR_BRUTO.replace(/,/g, "")) - parseInt(data.COPAGO_ESTIM_PAGO.replace(/,/g, "")));
        SAL413D.IMPRESION.OPERELABFACT = data.OPER_ELAB;
        SAL413D.IMPRESION.OPERCORRECFACT = data.OPER_CORREC;
        SAL413D.IMPRESION.ADMINW = localStorage.Usuario;
        let prefijo = this.SAL413D.PREFIJOS[0].TABLA.filter(
          (x) => x.PREFIJO.trim() == data.PREFIJO.trim()
        );

        if (prefijo.length == 0) {
          prefijo[0] = new Object();
          prefijo[0].AUT_DIAN = "";
          prefijo[0].PREFIJO = data.PREFIJO;
          prefijo[0].DESDE_NRO = "";
          prefijo[0].HASTA_NRO = "";
        }
        SAL413D.IMPRESION.PREFIJO = prefijo;
        _INV411(SAL413D.IMPRESION, resolve);
      });
    },

    _f8tipo_SAL413D() {
      var $_this = this;
      _ventanaDatos({
        titulo: "TIPO DE SERVICIO",
        columnas: ["COD", "DESCRIPCION"],
        data: this.SAL413D.SERVICIOS,
        callback_esc: function () {
          $(".tipocomp_SAL413D").focus();
        },
        callback: function (data) {
          $_this.form.tipocomp_SAL413D = data.COD;
          _enterInput(".tipocomp_SAL413D");
        },
      });
    },

    _f8paciente_SAL413D() {
      $_this = this
      parametros = {
        dll: 'PACIENTES',
        valoresselect: ['Nombre del paciente'],
        f8data: 'PACIENTES',
        columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'EPS' }],
        callback: (data) => {
          $_this.form.paciente_SAL413D = data.COD
          _enterInput('.paciente_SAL413D');
        },
        cancel: () => {
          _enterInput('.paciente_SAL413D');
        }
      };
      F8LITE(parametros);
    },
    _f8numero_SAL413D() {
      $_this = this
      parametros = {
        dll: 'NUMERACION',
        valoresselect: ['Nombre del tercero', 'buscar paciente'],
        f8data: 'NUMERACION',
        columnas: [{ title: 'COD' }, { title: 'FECHA_ING' }, { title: 'DESCRIP' }, { title: 'NOM_PAC' }, { title: 'CONVENIO' }, { title: 'ESTADO' }],
        callback: (data) => {
          console.log(data.COD, 'FACTURA')
          $_this.form.numero_SAL413D = data.COD.substring(1, 7)
          $_this.form.prefijo_SAL413D = data.COD.substring(0, 1)
          _enterInput('.numero_SAL413D');
        },
        cancel: () => {
          _enterInput('.numero_SAL413D');
        }
      };
      F8LITE(parametros);
    },
    _f8terceros_SAL413D() {
      parametros = {
        dll: "TERCEROS",
        valoresselect: ["Buscar por nombre tercero"],
        f8data: "TERCEROS",
        columnas: [{ title: "COD" }, { title: "NOMBRE" }, { title: "DIRREC" }, { title: "TELEF" }, { title: "ACT" }],
        callback: (data) => {
          console.log(data, "TERCERO");
          this.form.terceros_SAL413D = data.COD.trim();
          _enterInput(".terceros_SAL413D");
        },
        cancel: () => {
          _enterInput(".terceros_SAL413D");
        },
      };
      F8LITE(parametros);
    },
    _f8sucursal_SAL413D() {
      var $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE SUCURSALES",
        columnas: ["CODIGO", "DESCRIPCION"],
        data: $_this.SAL413D.SUCURSAL,
        callback_esc: function () {
          $(".Sucursal_SAL413D").focus();
        },
        callback: function (data) {
          $_this.form.sucursal_SAL413D = data.CODIGO.trim();
          _enterInput(".Sucursal_SAL413D");
        },
      });
    },
  },
});
