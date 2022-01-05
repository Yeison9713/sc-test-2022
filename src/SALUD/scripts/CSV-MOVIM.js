const { defaultOptionListAppearanceProvider } = require("pdf-lib");

new Vue({
  el: "#CSV-MOVIM",
  data: {
    nombre_archivo: "RECIBOS.CSV",
    fecha_recibo: _getObjDate(moment().format("YYYYMMDD")),
    detalle: "",
    cta_contable: "",

    array_datos: [],
    indice: "",
    indice_max: "",

    CUENTAS: [],
    PREFIJOS: [],
    CONSEC_LOTE: {},

    fecha_actual: _getObjDate(moment().format("YYYYMMDD")),
    valores_CSVMOVIM: IMask.createPipe({
      mask: Number,
      scale: 2,
      radix: ".",
      thousandsSeparator: ",",
      normalizeZeros: true,
      padFractionalZeros: true,
    }),
  },
  created() {
    _vm = this;
    nombreOpcion("3 - A - Cargue de recibos de caja por csv");
    this.getCuentas();
  },
  watch: {
    detalle: function (val) {
      this.detalle = val ? val.replaceEsp() : "";
    },
  },
  computed: {
    descripCuenta() {
      let cuenta = this.CUENTAS.find((el) => el.LLAVE_MAE.slice(0, 11).trim() == this.cta_contable);
      return cuenta ? cuenta.NOMBRE_MAE : "";
    },
  },
  methods: {
    getCuentas() {
      loader("show");
      postData({ datosh: datosEnvio() + "4|" }, get_url("APP/CONTAB/CON801.DLL"))
        .then((data) => {
          this.CUENTAS = data.MAESTROS;
          this.getPrefijos();
        })
        .catch((err) => {
          loader("hide");
          console.error("Error consultando cuentas contables: ", err);
          CON851("", "consultando cuentas contables", null, "error", "Error");
          _toggleNav();
        });
    },

    getPrefijos() {
      postData({ datosh: datosEnvio() }, get_url("APP/INVENT/INV109.DLL"))
        .then((data) => {
          loader("hide");
          this.PREFIJOS = data.PREFIJOS;
          this.datoNombreArchivo();
        })
        .catch((err) => {
          loader("hide");
          console.error("Error consultando prefijos: ", err);
          CON851("", "consultando prefijos", null, "error", "Error");
          _toggleNav();
        });
    },

    datoNombreArchivo() {
      this.$refs.btn_adj.disabled = false;
      this.$refs.btn_adj.focus();
    },

    callbackEscBtn() {
      this.$refs.btn_adj.disabled = true;
      setTimeout(() => CON851P("03", this.datoNombreArchivo, _toggleNav), 100);
    },

    callbackBtn() {
      _fin_validar_form();
      this.$refs.btn_adj.disabled = true;
      let archivos = document.getElementById("archivo_lect").files;

      if (archivos.length > 0) {
        let plano = archivos[0];
        var reader = new FileReader();
        reader.onload = (e) => {
          // let encode = encodeURI(reader.result);
          // encode = encode.replace(/%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20/g, "");
          // encode = encode.replace(/%0D%0A/g, "");
          // encode = encode.replace(/%0A/g, "");
          // encode = encode.replace(/%0D/g, "");

          let string = reader.result;
          var lineas = string.split(/\n/).map((lineStr) => lineStr.split(","));

          this.array_datos = lineas.filter((el) => el.join("").trim() != "");
          if (this.array_datos.length > 0) {
            this.datoAnioRecibo();
          } else {
            CON851("", "Datos no encontrados", null, "error", "Error");
            this.datoNombreArchivo();
          }
        };
        reader.readAsText(plano, "ISO-8859-1");
      } else {
        CON851("", "Debes seleccionar una archivo plano", null, "error", "Error");
        this.datoNombreArchivo();
      }
    },

    datoAnioRecibo() {
      validarInputs(
        {
          form: "#datoAnioRecibo",
        },
        () => {
          this.datoNombreArchivo();
        },
        () => {
          let anio = parseInt((this.fecha_recibo.anio = this.fecha_recibo.anio.padStart(4, "0")));
          if (anio > this.fecha_actual.anio) {
            CON851("37", "37", null, "error", "Error");
            this.datoAnioRecibo();
          } else {
            this.datoMesRecibo();
          }
        }
      );
    },
    datoMesRecibo() {
      validarInputs(
        {
          form: "#datoMesRecibo",
        },
        () => {
          this.datoAnioRecibo();
        },
        () => {
          let mes = parseInt((this.fecha_recibo.mes = this.fecha_recibo.mes.padStart(2, "0")));
          if (mes < 1 || mes > 12) {
            CON851("37", "37", null, "error", "Error");
            this.datoMesRecibo();
          } else this.datoDiaRecibo();
        }
      );
    },
    datoDiaRecibo() {
      validarInputs(
        {
          form: "#datoDiaRecibo",
        },
        () => {
          this.datoMesRecibo();
        },
        () => {
          let dia = parseInt((this.fecha_recibo.dia = this.fecha_recibo.dia.padStart(2, "0")));
          if (
            dia < 1 ||
            dia > 31 ||
            !_validarFecha(...Object.values(this.fecha_recibo)) ||
            _getStrDate(this.fecha_recibo) > parseInt(_getStrDate(this.fecha_actual))
          ) {
            CON851("37", "37", null, "error", "Error");
            this.datoDiaRecibo();
          } else this.datoDetalleRecibo();
        }
      );
    },
    datoDetalleRecibo() {
      validarInputs(
        {
          form: "#datoDetalleRecibo",
        },
        () => {
          this.datoDiaRecibo();
        },
        () => {
          this.detalle = this.detalle.trim().toUpperCase().replaceEsp();
          this.datoCtaContable();
        }
      );
    },
    datoCtaContable() {
      validarInputs(
        {
          form: "#datoCtaContable",
        },
        () => {
          this.datoDetalleRecibo();
        },
        () => {
          this.cta_contable = this.cta_contable.trim();
          this.datoCofirmar();
        }
      );
    },
    ventanaCtaContable() {
      _fin_validar_form();
      _ventanaDatos({
        titulo: "CUENTAS CONTABLES",
        columnas: [
          { value: "CTA_MAY", labform: "CTA MAYOR" },
          { value: "SUB_CTA", labform: "SUB CTA" },
          { value: "AUX_MAE", labform: "AUX MAE" },
          { value: "TIPO_MAE", labform: "TIPO" },
          { value: "NOMBRE_MAE", labform: "DESCRIPCIÓN" },
        ],
        data: this.CUENTAS,
        callback_esc: () => {
          this.datoCtaContable();
        },
        callback: (data) => {
          this.cta_contable = data.LLAVE_MAE.slice(0, 11);
          this.datoCofirmar();
        },
      });
    },
    datoCofirmar() {
      let cuenta = this.CUENTAS.find((el) => el.LLAVE_MAE.slice(0, 11).trim() == this.cta_contable.trim());
      if (cuenta) {
        CON851P("01", this.datoCtaContable, this.grabarRecibos);
      } else {
        CON851("03", "03", null, "error", "Error");
        this.datoCtaContable();
      }
    },
    grabarRecibos() {
      loader("show");
      datos_envio = {
        datosh: datosEnvio(),
        fecha: _getStrDate(this.fecha_recibo),
        detalle: this.detalle,
        cuenta: this.cta_contable,
      };

      // this.array_datos
      //   .map((el) => el.join("|"))
      //   .forEach((e, i) => {
      //     let index = (i + 1).toString().padStart(3, "0");

      //     datos_envio[`LIN_${index}`] = e + "|";
      //   });
      let datos = []
      _vm.array_datos
        .map((el) => el.join("|"))
        .forEach((e, i) => {
          let encode = encodeURI(e);
          let decode = decodeURI(encode.replace(/%0D/g, ""));
          datos.push(decode);
        });

        datos.forEach((el, i) => {
          let index = (i + 1).toString().padStart(3, "0");
          datos_envio[`LIN_${index}`] = el + "|";
        })

        console.log(datos[0])
        console.log(encodeURI(datos[0]))
      console.log(datos_envio);

      postData(datos_envio, get_url("APP/SALUD/CSV-MOVIM.DLL"))
        .then((data) => {
          loader("hide");
          if (data.ERRORES) {
            CON851("", "Error datos archivo plano", null, "error", "");
            if (data.ERRORES.length) this.impresionErrores(data.ERRORES);
            else _toggleNav();
          } else {
            CON851("", "Proceso terminado con exito!", null, "success", "Exito");
            let llave = Array.from(data.MOVIMIENTOS).pop();
            this.validarImpresion(llave);
          }
        })
        .catch((err) => {
          loader("hide");
          console.log("Error grabando recibos: ", err);
          CON851("", "Error grabando recibos", null, "error", "Error");
          this.datoCtaContable();
        });
    },

    impresionErrores(datos) {
      _impresion2({
        tipo: "csv",
        datos: datos,
        columnas: false,
      })
        .then(() => {
          CON851("", "Plano errores generado correctamente!", null, "success", "");
          this.datoCtaContable();
        })
        .catch((err) => {
          CON851("", "Error generando .CSV errores plano", null, "error", "");
          this.datoCtaContable();
        });
    },

    validarImpresion(llave) {
      CON851P("00", _toggleNav, () => this.impresion(llave));
    },

    impresion(data) {
      let impresion = new Object();
      console.log(data);
      let lote = data.RECIBO.slice(0, 2);
      let comp = data.RECIBO.slice(2);
      postData({ datosh: `${datosEnvio()}${lote}|${comp}|` }, (URL = get_url("APP/SALUD/FAC145.DLL")))
        .then((data) => {
          data.IMPRESION.pop();
          var totaldebito = 0;
          var acumulado = 0;
          let fecha_elab = moment(data.IMPRESION[0].FECHA_MOV, "YYMMDD").format("MMMM DD YYYY");
          for (var [index, tabla] of data.IMPRESION.entries()) {
            if (index == 0) {
              if (typeof tabla.TOTAL_CR == "string") {
                tabla.TOTAL_CR = tabla.TOTAL_CR.replace(/-/g, "");
              }
              tabla.TOTAL_CR = `-${tabla.TOTAL_CR}`;
            }
            if (index !== 0) {
              let valor1 = data.IMPRESION[index - 1].TOTAL_CR;
              if (typeof valor1 == "string") {
                valor1 = parseFloat(valor1.replace(/-/g, "").replace(/,/g, ""));
              }
              acumulado = valor1 + acumulado;
              if (typeof tabla.TOTAL_CR == "string") {
                tabla.TOTAL_CR = parseFloat(tabla.TOTAL_CR.replace(/-/g, "").replace(/,/g, ""));
              }
              tabla.TOTAL_CR = tabla.TOTAL_CR - acumulado;
              tabla.TOTAL_CR = `-${this.valores_CSVMOVIM(tabla.TOTAL_CR.toString())}`;
              let valordebito = parseFloat(tabla.TOTAL_DB.padStart("0", 6));
              if (valordebito > 0) {
                valordebito = valordebito * 100;
                valordebito = parseInt(valordebito) / 100;
                totaldebito = valordebito + totaldebito;
              }
            }
          }
          data.IMPRESION[data.IMPRESION.length - 1].TOTAL_CR = "";
          impresion.DIRECCPACI = data.IMPRESION[0].DIRECC_PACI;
          impresion.TELTER = data.IMPRESION[0].TEL_TER;
          impresion.OPERMOV = data.IMPRESION[0].OPER_MOV;
          impresion.APELLIDOPACI = data.IMPRESION[0].APELLIDO_PACI;
          impresion.TELEFONOPACI = data.IMPRESION[0].TELEFONO_PACI;
          impresion.NETO = data.IMPRESION[0].NETO;
          impresion.DESCRIPCIONTERCERO = data.IMPRESION[0].DESCRIP_TER;
          impresion.IDTERCERO = numeroencomas(parseInt(data.IMPRESION[0].ID_PAC));
          impresion.DESCRIPCIONID = $_USUA_GLOBAL[0].NOMBRE;
          impresion.IDMOV = numeroencomas($_USUA_GLOBAL[0].NIT);
          impresion.COLUMNAS = ["CUENTA_MOV", "NOMBRE_MAE", "DOCUM_MOV", "TOTAL_DB", "TOTAL_CR"];
          impresion.WIDTH = ["13%", "43%", "15%", "15%", "15%"];
          impresion.LOTE = "1R";
          impresion.NOMBRELOTE = "RECIBOS DE CAJA";
          impresion.COMPROBANTE = comp;
          impresion.FECHA = fecha_elab;
          impresion.VLRCREDITO = acumulado * -1;
          impresion.VLRDEBITO = totaldebito;
          impresion.VALORENLETRAS = FAC146(acumulado);
          impresion.DETALLEMOV = data.IMPRESION[0].DETALLE_MOV;
          impresion.REFERMOV = data.IMPRESION[0].REFERMOV;
          impresion.OTROMOV = data.IMPRESION[0].OTROMOV;
          impresion.OPER = localStorage.Usuario;
          impresion.TIPOCOMP = lote;
          impresion.TABLA = data.IMPRESION;
          _impresioncopagosyrecibosdecaja(impresion, this._evaluarcuentacontable_CSVMOVIM, () => {
            CON851("", "Impresion finalizada", null, "success", "");
            _toggleNav();
          });
        })
        .catch((err) => {
          console.error("Error en impresión", err);
          CON851("", "Error en impresión", null, "error", "Error");
          this.validarImpresion();
        });
    },
  },
});
