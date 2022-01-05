// Se actualiza opcion a Vue - 20/03/2021 - David.M

new Vue({
  el: "#SER504",
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,

    ano_ini: 0,
    mes_ini: 0,
    dia_ini: 0,
    ano_fin: 0,
    mes_fin: 0,
    dia_fin: 0,
    ano_abo: 0,
    mes_abo: 0,
    dia_abo: 0,
    tercero: "",
    mostrar_no_rad: "",
    separar_no_rad: "",
    prefijo: "",
    serv_hosp: "",
    incluir_fact_canc: "",
    discrim_fact: "",
    asume_glosa: "",
    asume_radic: "",
    saldo_mayor: "",
    orden_alfab: "",
    saldo_negativo: "",
    asociar_nit: "",
    array_terceros: [],
    array_serv_hosp: [],
    fecha_act: moment().format("YYYYMMDD"),
    nit_usu: $_USUA_GLOBAL[0].NIT,
  },
  created() {
    nombreOpcion("9-7-5-2 Listado de cartera por edades");
    _inputControl("reset");
    _inputControl("disabled");
    loader("show");
    this.traerTerceros();
  },
  computed: {
    descrip_tercero() {
      if (this.tercero == "99") {
        return "Proceso Total";
      } else {
        let busqueda = this.array_terceros.find((e) => e.COD.trim() == this.tercero.trim());
        return busqueda ? busqueda.NOMBRE : "";
      }
    },

    descrip_serv_hosp() {
      if (this.serv_hosp == "**") {
        return "Todos los servicios";
      } else {
        let busqueda = this.array_serv_hosp.find((e) => e.ID == this.serv_hosp);
        return busqueda ? busqueda.DESCRIPCION : "";
      }
    },
  },
  methods: {
    datoInicial() {
      this.dia_ini = "01";
      this.mes_ini = $_USUA_GLOBAL[0].FECHALNK.slice(2, 4);
      this.ano_ini = "20" + $_USUA_GLOBAL[0].FECHALNK.slice(0, 2);

      this.dia_fin = $_USUA_GLOBAL[0].FECHALNK.slice(4);
      this.mes_fin = $_USUA_GLOBAL[0].FECHALNK.slice(2, 4);
      this.ano_fin = "20" + $_USUA_GLOBAL[0].FECHALNK.slice(0, 2);

      this.dia_abo = $_USUA_GLOBAL[0].FECHALNK.slice(4);
      this.mes_abo = $_USUA_GLOBAL[0].FECHALNK.slice(2, 4);
      this.ano_abo = "20" + $_USUA_GLOBAL[0].FECHALNK.slice(0, 2);

      this.fechaInicial("1");
    },

    fechaInicial(orden) {
      validarInputs(
        {
          form: "#fecha_inicial",
          orden: orden,
        },
        () => {
          _toggleNav();
        },
        () => {
          this.ano_ini = cerosIzq(this.ano_ini, 4);
          this.mes_ini = cerosIzq(this.mes_ini, 2);
          this.dia_ini = cerosIzq(this.dia_ini, 2);

          this.inicial = this.ano_ini.toString() + this.mes_ini.toString() + this.dia_ini.toString();

          if (this.ano_ini < 2000) {
            CON851("37", "37", null, "error", "error");
            this.fechaInicial("1");
          } else if (this.mes_ini < 1 || this.mes_ini > 12) {
            CON851("37", "37", null, "error", "error");
            this.fechaInicial("2");
          } else if (this.dia_ini < 1 || this.dia_ini > 31) {
            CON851("37", "37", null, "error", "error");
            this.fechaInicial("3");
          } else {
            this.fechaFinal("1");
          }
        }
      );
    },

    fechaFinal(orden) {
      validarInputs(
        {
          form: "#fecha_final",
          orden: orden,
        },
        () => {
          this.fechaInicial("3");
        },
        () => {
          this.ano_fin = cerosIzq(this.ano_fin, 4);
          this.mes_fin = cerosIzq(this.mes_fin, 2);
          this.dia_fin = cerosIzq(this.dia_fin, 2);

          this.final = this.ano_fin.toString() + this.mes_fin.toString() + this.dia_fin.toString();

          if (this.ano_fin < 2000) {
            CON851("37", "37", null, "error", "error");
            this.fechaFinal("1");
          } else if (this.mes_fin < 1 || this.mes_fin > 12) {
            CON851("37", "37", null, "error", "error");
            this.fechaFinal("2");
          } else if (this.dia_fin < 1 || this.dia_fin > 31) {
            CON851("37", "37", null, "error", "error");
            this.fechaFinal("3");
          } else if (this.final < this.inicial) {
            CON851("03", "Fecha de vencimiento debe ser mayor", null, "error", "error");
            this.fechaFinal("1");
          } else {
            this.fechaAbonos("1");
          }
        }
      );
    },

    fechaAbonos(orden) {
      validarInputs(
        {
          form: "#fecha_abonos",
          orden: orden,
        },
        () => {
          this.fechaFinal("3");
        },
        () => {
          this.ano_abo = cerosIzq(this.ano_abo, 4);
          this.mes_abo = cerosIzq(this.mes_abo, 2);
          this.dia_abo = cerosIzq(this.dia_abo, 2);

          this.abonos = this.ano_abo.toString() + this.mes_abo.toString() + this.dia_abo.toString();

          if (this.ano_abo < 2000) {
            CON851("37", "37", null, "error", "error");
            this.fechaAbonos("1");
          } else if (this.mes_abo < 1 || this.mes_abo > 12) {
            CON851("37", "37", null, "error", "error");
            this.fechaAbonos("2");
          } else if (this.dia_abo < 1 || this.dia_abo > 31) {
            CON851("37", "37", null, "error", "error");
            this.fechaAbonos("3");
          } else if (this.abonos < this.inicial) {
            CON851("37", "37", null, "error", "error");
            this.fechaAbonos("1");
          } else {
            this.datoTercero();
          }
        }
      );
    },

    datoTercero() {
      if (!this.tercero.trim()) this.tercero = "99";

      validarInputs(
        {
          form: "#tercero",
        },
        () => {
          this.fechaAbonos("3");
        },
        () => {
          if (this.tercero == "99") {
            this.mostrarNoRad();
          } else {
            let busqueda = this.array_terceros.find((e) => e.COD == this.tercero);
            if (!busqueda) {
              CON851("01", "01", null, "error", "error");
              this.datoTercero();
            } else {
              this.mostrarNoRad();
            }
          }
        }
      );
    },

    mostrarNoRad() {
      if (!this.mostrar_no_rad.trim()) this.mostrar_no_rad = "S";
      validarInputs(
        {
          form: "#mostrar_no_rad",
        },
        () => {
          this.datoTercero();
        },
        () => {
          this.mostrar_no_rad = this.mostrar_no_rad.toUpperCase();
          if (this.mostrar_no_rad != "S") this.mostrar_no_rad = "N";
          if (this.mostrar_no_rad == "N") this.datoPrefijo();
          else this.separarNoRad();
        }
      );
    },

    separarNoRad() {
      if (!this.separar_no_rad.trim()) this.separar_no_rad = "S";
      validarInputs(
        {
          form: "#separar_no_rad",
        },
        () => {
          this.mostrarNoRad();
        },
        () => {
          this.separar_no_rad = this.separar_no_rad.toUpperCase();
          if (this.separar_no_rad != "S") this.separar_no_rad = "N";
          this.datoPrefijo();
        }
      );
    },

    datoPrefijo() {
      if (!this.prefijo.trim()) this.prefijo = "*";
      validarInputs(
        {
          form: "#prefijo",
        },
        () => {
          this.mostrarNoRad();
        },
        () => {
          this.prefijo = this.prefijo.toUpperCase();
          if (this.prefijo == "*") {
            this.datoServHosp();
          } else {
            if (
              [
                "A",
                "P",
                "T",
                "B",
                "D",
                "F",
                "G",
                "H",
                "I",
                "J",
                "K",
                "L",
                "M",
                "N",
                "O",
                "Q",
                "R",
                "S",
                "V",
                "W",
                "X",
                "Y",
                "Z",
              ].includes(this.prefijo)
            ) {
              this.datoServHosp();
            } else this.datoPrefijo();
          }
        }
      );
    },

    datoServHosp() {
      if (!this.serv_hosp.trim()) this.serv_hosp = "**";

      validarInputs(
        {
          form: "#serv_hosp",
        },
        () => {
          this.datoPrefijo();
        },
        () => {
          if (this.serv_hosp == "**") {
            this.incluirFactCanc();
          } else {
            let busqueda = this.array_serv_hosp.find((e) => e.ID == this.serv_hosp);
            if (!busqueda) {
              CON851("01", "01", null, "error", "error");
              this.datoServHosp();
            } else this.incluirFactCanc();
          }
        }
      );
    },

    incluirFactCanc() {
      if (!this.incluir_fact_canc.trim()) this.incluir_fact_canc = "N";
      validarInputs(
        {
          form: "#incluir_fact_canc",
        },
        () => {
          this.datoServHosp();
        },
        () => {
          this.incluir_fact_canc = this.incluir_fact_canc.toUpperCase();
          if (this.incluir_fact_canc != "S") this.incluir_fact_canc = "N";
          this.discrimFact();
        }
      );
    },

    discrimFact() {
      if (!this.discrim_fact.trim()) this.discrim_fact = "S";
      validarInputs(
        {
          form: "#discrim_fact",
        },
        () => {
          this.incluirFactCanc();
        },
        () => {
          this.discrim_fact = this.discrim_fact.toUpperCase();
          if (this.discrim_fact != "S") this.discrim_fact = "N";
          if ([830092718, 830092719].includes(this.nit_usu)) {
            this.asume_radic = "S";
            this.asumeRadic();
          } else {
            this.asume_radic = "";
            this.asumeGlosa();
          }
        }
      );
    },

    asumeGlosa() {
      if (!this.asume_glosa.trim()) this.asume_glosa = "N";
      validarInputs(
        {
          form: "#asume_glosa",
        },
        () => {
          this.discrimFact();
        },
        () => {
          this.asume_glosa = this.asume_glosa.toUpperCase();
          if (this.asume_glosa != "S") this.asume_glosa = "N";
          this.asume_radic = "N";
          this.saldoMayor();
        }
      );
    },

    asumeRadic() {
      if (!this.asume_radic.trim()) this.asume_radic = "N";
      validarInputs(
        {
          form: "#asume_radic",
        },
        () => {
          this.discrimFact();
        },
        () => {
          this.asume_radic = this.asume_radic.toUpperCase();
          if (this.asume_radic != "S") this.asume_radic = "N";
          this.saldoMayor();
        }
      );
    },

    saldoMayor() {
      if (!this.saldo_mayor) this.saldo_mayor = 0;
      validarInputs(
        {
          form: "#saldo_mayor",
        },
        () => {
          this.discrimFact();
        },
        () => {
          if (this.saldo_mayor < 0) {
            this.saldo_mayor = 0;
          }
          this.ordenAlfab();
        }
      );
    },

    ordenAlfab() {
      if (!this.orden_alfab.trim()) this.orden_alfab = "N";
      validarInputs(
        {
          form: "#orden_alfab",
        },
        () => {
          this.saldoMayor();
        },
        () => {
          this.orden_alfab = this.orden_alfab.toUpperCase();
          if (this.orden_alfab != "S") this.orden_alfab = "N";
          this.saldoNegativo();
        }
      );
    },

    saldoNegativo() {
      if (!this.saldo_negativo.trim()) this.saldo_negativo = "N";
      validarInputs(
        {
          form: "#saldo_negativo",
        },
        () => {
          this.ordenAlfab();
        },
        () => {
          this.saldo_negativo = this.saldo_negativo.toUpperCase();
          if (this.saldo_negativo != "S") this.saldo_negativo = "N";
          this.asociarNit();
        }
      );
    },

    asociarNit() {
      if (!this.asociar_nit.trim()) this.asociar_nit = "N";
      validarInputs(
        {
          form: "#asociar_nit",
        },
        () => {
          this.saldoNegativo();
        },
        () => {
          this.asociar_nit = this.asociar_nit.toUpperCase();
          if (this.asociar_nit != "S") this.asociar_nit = "N";
          this.consultaDll();
        }
      );
    },

    consultaDll() {
      CON851P(
        "00",
        () => {
          this.asociarNit();
        },
        () => {
          var datos_envio =
            datosEnvio() +
            localStorage.Usuario +
            "|" +
            this.inicial +
            "|" +
            this.final +
            "|" +
            this.abonos +
            "|" +
            this.tercero +
            "|" +
            this.mostrar_no_rad +
            "|" +
            this.separar_no_rad +
            "|" +
            this.prefijo +
            "|" +
            this.serv_hosp +
            "|" +
            this.incluir_fact_canc +
            "|" +
            this.discrim_fact +
            "|" +
            this.asume_glosa +
            "|" +
            this.asume_radic +
            "|" +
            this.saldo_mayor +
            "|" +
            this.orden_alfab +
            "|" +
            this.saldo_negativo +
            "|" +
            this.asociar_nit +
            "|";

          this.estado_loader = true;
          this.label_loader = `Procesando: ${moment(this.inicial).format('YYYY/MM/DD')} - ${moment(this.final).format('YYYY/MM/DD')}`;
          this.progreso = { transferred: 0, speed: 0 };

          postData({ datosh: datos_envio }, get_url("app/SALUD/SER504.DLL"),
          {
            onProgress: (progress) => {
              this.progreso = progress
            }
          })
            .then((data) => {
              this.loader = false;
              this.label_loader = `GENERANDO IMPRESIÓN...`;
              this.progreso.completado = true;
              this.imprimir(data)
            })
            .catch((err) => {
              console.error(err);
              CON851("", "Error consultando datos", null, "error", "Error");
              this.loader = false;
              this.estado_loader = false;
              this.asociarNit();
            });
        }
      );
    },

    imprimir(data) {
      data.LISTADO.pop();

      let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
      let nit = this.nit_usu.toString();
      let fecha = moment().format("MMM DD/YY");

      if (data.LISTADO.length < 1) {
        CON851("", "08", null, "error", "error");
        this.asociarNit();
      } else {
        let columnas = [
          {
            title: "FACT",
            value: "FACT_LN",
            filterButton: true,
          },
          {
            title: "FECHA CIERRE",
            value: "FECHA_CIERRE_LN",
            format: "fecha",
            filterButton: true,
          },
          {
            title: "FECHA PRES",
            value: "FECHA_PRES_LN",
            filterButton: true,
            format: "fecha",
          },
          {
            title: "PLAZO",
            value: "PLAZO_LN",
          },
          {
            title: "FECHA VENC",
            value: "FECHA_VENCE_LN",
            format: "fecha",
          },
          {
            title: "PACIENTE",
            value: "NOM_PACIENTE_LN",
            filterButton: true,
          },
          {
            title: "ENTIDAD",
            value: "NOM_ENTIDAD_LN",
          },
          {
            title: "TARIFA",
            value: "TARIFA_LN",
          },
          {
            title: "POLIZA",
            value: "POLIZA_LN",
          },
          {
            title: "NRO DIAS",
            value: "NRO_DIAS_LN",
          },
          {
            title: "FACT SIN RADICAR",
            value: "FACT_SIN_RAD_LN",
            format: "money",
          },
          {
            title: "FACT POR VENCER",
            value: "FACT_POR_VENCER_LN",
            format: "money",
          },
          {
            title: "0 A 30 DIAS VEN",
            value: "0_30_DIAS_LN",
            format: "money",
          },
          {
            title: "31 A 60 DIAS VEN",
            value: "31_60_DIAS_LN",
            format: "money",
          },
          {
            title: "61 A 90 DIAS VEN",
            value: "61_90_DIAS_LN",
            format: "money",
          },
          {
            title: "91 A 120 DIAS VEN",
            value: "91_120_DIAS_LN",
            format: "money",
          },
          {
            title: "121 A 180 DIAS VEN",
            value: "121_180_DIAS_LN",
            format: "money",
          },
          {
            title: "181 A 360 DIAS VEN",
            value: "181_360_DIAS_LN",
            format: "money",
          },
          {
            title: "MAS 360 DIAS VEN",
            value: "MAS_360_DIAS_LN",
            format: "money",
          },
          {
            title: "ACUMULADO",
            value: "ACUMULADO_LN",
            format: "money",
          },
          {
            title: "FECHA GLOSA",
            value: "FECHA_GLOSA_LN",
            format: "fecha",
          },
          {
            title: "FECHA RAD GLOSA",
            value: "FECHA_RAD_GLOSA_LN",
            format: "fecha",
          },
          {
            title: "GLOSA INICIAL",
            value: "GLOSA_INICIAL_LN",
          },
          {
            title: "GLOSA POR DEFINIR",
            value: "GLOSA_POR_DEF_LN",
          },
          {
            title: "GLOSA SOPORTADA",
            value: "GLOSA_SOP_LN",
          },
          {
            title: "VALOR BRUTO",
            value: "VLR_BRUTO_LN",
            format: "money",
          },
          {
            title: "VALOR COPAGOS",
            value: "VLR_COPAGOS_LN",
            format: "money",
          },
          {
            title: "FECHA ABONO 1",
            value: "FECHA_ABON_1",
            format: "fecha",
          },
          {
            title: "VALOR ABONO 1",
            value: "VLR_ABON_1",
            format: "money",
          },
          {
            title: "FECHA ABONO 2",
            value: "FECHA_ABON_2",
            format: "fecha",
          },
          {
            title: "VALOR ABONO 2",
            value: "VLR_ABON_2",
            format: "money",
          },
          {
            title: "FECHA ABONO 3",
            value: "FECHA_ABON_3",
            format: "fecha",
          },
          {
            title: "VALOR ABONO 3",
            value: "VLR_ABON_3",
            format: "money",
          },
          {
            title: "VALOR ABONOS",
            value: "VLR_ABONOS_LN",
            format: "money",
          },
          {
            title: "GLOSAS ACEPTADAS",
            value: "GLOSAS_ACEPT_LN",
          },
          {
            title: "NETO POR COBRAR",
            value: "NETO_COBRAR_LN",
            format: "money",
          },
          {
            title: "FECHA FACT",
            value: "FECHA_FACT_LN",
            format: "fecha",
          },
          {
            title: "FECHA DE ENVIO",
            value: "FECHA_ENVIO_LN",
            format: "fecha",
          },
          {
            title: "ENVIO",
            value: "ENVIO_LN",
          },
          {
            title: "TOTAL DESCONTANDO SIN IDENTIFICAR",
            value: "TOTAL_DESC_LN",
            format: "money",
          },
          {
            title: "CONVENIO",
            value: "CONVENIO_LN",
          },
          {
            title: "ESTADO DE COBRA",
            value: "ESTADO_COBRA_LN",
          },
          {
            title: "NRO RADICADO",
            value: "NRO_RADICADO_LN",
          },
          {
            title: "ACTIVIDAD",
            value: "ACTIVIDAD_LN",
          },
          {
            title: "CTA CONT RADICADA",
            value: "CTA_CONT_RAD_LN",
          },
        ];

        let header_format = [
          { text: `${nombreEmpresa}`, bold: true, size: 16 },
          `FACTURACION RESUMEN GENERAL DE CARTERA     NIT: ${nit}`,
          `Fecha de reporte: ${fecha}`,
          `Periodo desde: ${this.inicial}  Hasta: ${this.final}`,
        ];

        _impresion2({
          tipo: "excel",
          header: header_format,
          logo: `${nit}.png`,
          tabla: {
            columnas,
            data: data.LISTADO,
          },
          archivo: "INFORME-GENERAL-CARTERA" + localStorage.Usuario + moment().format('HHmmss'),
          scale: "75",
          orientation: "landscape",
        })
          .then(() => {
            CON851("", "Generando informe", null, "success", "");
            loader("hide");
            _toggleNav();
            this.estado_loader = false
          })
          .catch((error) => {
            console.error(error);
            CON851("", "Error generando impresion", null, "error", "Error");
            loader("hide");
            this.asociarNit();
            this.estado_loader = false
          });
      }
    },

    _ventanaTerceros() {
      $this = this;
      for (let i in this.array_terceros) {
        this.array_terceros[i]["IDENTIFICACION"] = this.array_terceros[i].COD;
        this.array_terceros[i]["TELEFONO"] = this.array_terceros[i].TELEF;
        this.array_terceros[i]["ACTIVIDAD"] = this.array_terceros[i].ACT;
      }
      _ventanaDatos({
        titulo: "VENTANA DE TERCEROS",
        columnas: ["IDENTIFICACION", "NOMBRE", "TELEFONO", "CIUDAD", "ACTIVIDAD"],
        data: this.array_terceros,
        ancho: 900,
        callback_esc: () => {
          document.querySelector(".tercero").focus();
        },
        callback: (data) => {
          $this.tercero = data.COD.trim();
          setTimeout(() => {
            _enterInput(".tercero");
          }, 200);
        },
      });
    },

    _ventanaServHosp() {
      $this = this;
      _ventanaDatos({
        titulo: "VENTANA DE SERVICIOS HOSPITALARIOS",
        columnas: ["ID", "DESCRIPCION"],
        data: this.array_serv_hosp,
        callback_esc: () => {
          document.querySelector(".serv_hosp").focus();
        },
        callback: (data) => {
          $this.serv_hosp = data.ID;
          setTimeout(() => {
            _enterInput(".serv_hosp");
          }, 200);
        },
      });
    },

    traerTerceros() {
      postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON802.DLL"))
        .then((data) => {
          this.array_terceros = data.TERCEROS;
          this.array_terceros.pop();
          this.traerServHosp();
        })
        .catch((error) => {
          loader("hide");
          console.error(error);
          CON851("", "Error consultando terceros", null, "error", "Error");
          _toggleNav();
        });
    },

    traerServHosp() {
      postData({ datosh: datosEnvio() + "1|||" }, get_url("app/SALUD/SER812.DLL"))
        .then((data) => {
          this.array_serv_hosp = data.SERVICIO;
          loader("hide");
          this.datoInicial();
        })
        .catch((error) => {
          loader("hide");
          console.error(error);
          CON851("", "Error consultando servicios", null, "error", "Error");
          _toggleNav();
        });
    },
  },
});
