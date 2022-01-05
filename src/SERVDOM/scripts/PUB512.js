// Resumen de recaudos aplicados - Opcion 5-C - David.M - 13/08/2021

new Vue({
  el: "#PUB512",
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,

    ano_gen: "",
    mes_gen: "",
    ano_ini: "",
    mes_ini: "",
    dia_ini: "",
    ano_fin: "",
    mes_fin: "",
    dia_fin: "",
    sdo_ant: "",

    serv_tit: {},
    array_serv: [],
  },
  created() {
    nombreOpcion("5-C - Resumen de Recaudos Aplicados");
    _inputControl("reset");
    _inputControl("disabled");
    loader("show");
    this.traerServicios();
  },
  methods: {
    datoFechaArchivo() {
      validarInputs(
        {
          form: "#fecha_gen",
        },
        _toggleNav,
        () => {
          this.ano_gen = this.ano_gen.padStart(4, "0");
          this.mes_gen = this.mes_gen.padStart(2, "0");
          this.datoFechaInicial();
        }
      );
    },

    datoFechaInicial() {
      if (!this.ano_ini.trim()) this.ano_ini = this.ano_gen;
      if (!this.mes_ini.trim()) this.mes_ini = this.mes_gen;
      if (!this.dia_ini.trim()) this.dia_ini = "01";
      validarInputs(
        {
          form: "#fecha_ini",
        },
        this.datoFechaArchivo,
        () => {
          this.ano_ini = this.ano_ini.padStart(4, "0");
          this.mes_ini = this.mes_ini.padStart(2, "0");
          this.dia_ini = this.dia_ini.padStart(2, "0");
          this.inicial = `${this.ano_ini}${this.mes_ini}${this.dia_ini}`;

          if (this.mes_ini < 1 || this.mes_ini > 12) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaInicial();
          } else if (this.dia_ini < 1 || this.dia_ini > 31) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaInicial();
          } else {
            setTimeout(() => {
              this.datoFechaFinal();
            }, 200);
          }
        }
      );
    },

    datoFechaFinal() {
      if (!this.ano_fin.trim()) this.ano_fin = this.ano_ini;
      if (!this.mes_fin.trim()) this.mes_fin = this.mes_ini;
      if (!this.dia_fin.trim()) this.dia_fin = "30";
      validarInputs(
        {
          form: "#fecha_fin",
        },
        this.datoFechaInicial,
        () => {
          this.ano_fin = this.ano_fin.padStart(4, "0");
          this.mes_fin = this.mes_fin.padStart(2, "0");
          this.dia_fin = this.dia_fin.padStart(2, "0");
          this.final = `${this.ano_fin}${this.mes_fin}${this.dia_fin}`;

          if (this.mes_fin < 1 || this.mes_fin > 12) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaFinal();
          } else if (this.dia_fin < 1 || this.dia_fin > 31) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaFinal();
          } else if (this.final < this.inicial) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaFinal();
          } else {
            setTimeout(() => {
              this.datoAnterior();
            }, 200);
          }
        }
      );
    },

    datoAnterior() {
      if (!this.sdo_ant.trim()) this.sdo_ant = "N";
      validarInputs(
        {
          form: "#sdo_ant",
        },
        this.datoFechaFinal,
        () => {
          this.sdo_ant = this.sdo_ant.toUpperCase();
          if (this.sdo_ant != "S") this.sdo_ant = "N";
          this.titulosServ();
        }
      );
    },

    titulosServ() {
      for (let i = 0; i < 6; i++) {
        let busqueda = this.array_serv.find((e) => e.cod == (parseInt(i) + 1).toString());
        this.serv_tit[`serv${parseInt(i) + 1}`] = busqueda ? busqueda.descrip : `Serv ${parseInt(i) + 1}`;

        if (i == 5) this.llamarDLL();
      }
    },

    llamarDLL() {
      CON851P("00", this.datoAnterior, () => {
        var datos_envio = [
          `${this.ano_gen}${this.mes_gen}`,
          this.inicial.toString(),
          this.final.toString(),
          this.sdo_ant.toString(),
        ];

        this.estado_loader = true;
        this.label_loader = `Procesando: ${this.inicial} - ${this.final}`;
        this.progreso = { transferred: 0, speed: 0 };

        postData({ datosh: moduloDatosEnvio() + datos_envio.join("|") + "|" }, get_url("app/SERVDOM/PUB512.DLL"), {
          onProgress: (progress) => {
            this.progreso = progress;
          },
        })
          .then((data) => {
            data.LISTADO.pop();
            data = data.LISTADO;
            this.loader = false;
            this.label_loader = `GENERANDO IMPRESIÓN...`;
            this.progreso.completado = true;
            this.imprimir(data);
          })
          .catch((err) => {
            console.error(err);
            CON851("", "Error consultando datos", null, "error", "Error");
            this.loader = false;
            this.estado_loader = false;
            this.datoAnterior();
          });
      });
    },

    imprimir(data) {
      let listado = data;

      let nombreEmpresa = $_USUARIO_EMPRESA.NOMBRE.trim();
      let nit = $_USUARIO_EMPRESA.NIT.toString();
      let nit_edit = !isNaN(nit) ? new Intl.NumberFormat("ja-JP").format(nit) : nit;
      let fecha = moment().format("MMM DD/YY - HH:mm");

      if (listado.length < 1) {
        CON851("", "08", null, "warning", "");
        this.estado_loader = false;
        this.datoAnterior();
      } else {
        let header_format = [
          { text: `${nombreEmpresa}`, bold: true, size: 16 },
          `INFORME DE RECAUDOS    DESDE: ${this.inicial} HASTA: ${this.final}    NIT: ${nit_edit}`,
          `Fecha de reporte: ${fecha}`,
        ];

        listado.forEach((el) => {
          el.vlr_recaud = el.vlr_recaud.replace(/\ /g, "");
          el.abono_1 = el.abono_1.replace(/\ /g, "");
          el.abono_2 = el.abono_2.replace(/\ /g, "");
          el.abono_3 = el.abono_3.replace(/\ /g, "");
          el.abono_4 = el.abono_4.replace(/\ /g, "");
          el.abono_5 = el.abono_5.replace(/\ /g, "");
          el.abono_6 = el.abono_6.replace(/\ /g, "");
        });

        _impresion2({
          tipo: "excel",
          header: header_format,
          logo: `${nit}.png`,
          tabla: {
            columnas: this.columnas_listado(),
            data: listado,
          },
          archivo: localStorage.Usuario + moment().format("-YYMMDD-HHmmss"),
          scale: "75",
          orientation: "landscape",
        })
          .then(() => {
            CON851("", "Generando informe", null, "success", "");
            loader("hide");
            _toggleNav();
            this.estado_loader = false;
          })
          .catch((error) => {
            console.error(error);
            CON851("", "Error generando impresion", null, "error", "Error");
            loader("hide");
            this.datoAnterior();
            this.estado_loader = false;
          });
      }
    },

    traerServicios() {
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB781.DLL"))
        .then((data) => {
          this.array_serv = data.SERVPQR;
          loader("hide");
          this.datoFechaArchivo();
        })
        .catch((error) => {
          loader("hide");
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          _toggleNav();
        });
    },

    columnas_listado() {
      let columns = [
        {
          title: "Fecha Pago",
          value: "fecha",
          format: "fecha",
        },
        {
          title: "Factura",
          value: "fact",
          format: "number",
        },
        {
          title: "Valor Recaudo",
          value: "vlr_recaud",
          format: "money",
        },
        {
          title: this.serv_tit.serv1,
          value: "abono_1",
          format: "money",
        },
        {
          title: this.serv_tit.serv2,
          value: "abono_2",
          format: "money",
        },
        {
          title: this.serv_tit.serv3,
          value: "abono_3",
          format: "money",
        },
        {
          title: this.serv_tit.serv4,
          value: "abono_4",
          format: "money",
        },
        {
          title: this.serv_tit.serv5,
          value: "abono_5",
          format: "money",
        },
        {
          title: this.serv_tit.serv6,
          value: "abono_6",
          format: "money",
        },
        {
          title: "USUARIO",
          value: "nombre",
          format: "string",
        },
      ];

      return columns;
    },
  },
});
