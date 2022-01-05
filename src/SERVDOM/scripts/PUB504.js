// Listado de recaudos - Opcion 5-4 - David.M - 03/08/2021

new Vue({
  el: "#PUB504",
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,

    formato: "",
    ano_ini: "",
    mes_ini: "",
    dia_ini: "",
    ano_fin: "",
    mes_fin: "",
    dia_fin: "",
    punto: "",

    serv_tit: {},
    puntos_tit: {},

    array_punto_pago: [],
    array_serv: [],
  },
  created() {
    nombreOpcion("5-4 - Listado de Recaudos");
    _inputControl("reset");
    _inputControl("disabled");
    loader("show");
    this.traerPuntoPago();
  },
  computed: {
    descrip_punto() {
      if (this.punto == "***") {
        return "TODOS LOS PUNTOS";
      } else {
        let busqueda = this.array_punto_pago.find((e) => e.cod == this.punto);
        return busqueda ? busqueda.descrip : "";
      }
    },
  },
  methods: {
    datoFormato() {
      POPUP(
        {
          titulo: "FORMATO DE IMPRESIÓN",
          indices: [{ id: "id", label: "label" }],
          seleccion: this.formato || 3,
          teclaAlterna: true,
          array: [
            { id: 3, label: "EXCEL" },
            { id: 4, label: "PDF" },
          ],
          callback_f: _toggleNav,
        },
        (data) => {
          this.formato = data.id;
          setTimeout(() => {
            this.datoFechaInicial();
          }, 200);
        }
      );
    },

    datoFechaInicial() {
      validarInputs(
        {
          form: "#fecha_ini",
        },
        this.datoFormato,
        () => {
          this.ano_ini = this.ano_ini.padStart(4, "0");
          this.mes_ini = this.mes_ini.padStart(2, "0");
          this.dia_ini = this.dia_ini.padStart(2, "0");
          this.inicial = `${this.ano_ini}${this.mes_ini}${this.dia_ini}`;

          this.ano_fin = this.ano_ini;
          this.mes_fin = this.mes_ini;
          if (["01", "03", "05", "07", "08", "10", "12"].includes(this.mes_fin)) {
            this.dia_fin = "31";
          } else this.dia_fin = "30";

          this.datoFechaFinal();
        }
      );
    },

    datoFechaFinal() {
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

          this.datoPunto();
        }
      );
    },

    datoPunto() {
      if (!this.punto.trim()) this.punto = "***";
      validarInputs(
        {
          form: "#punto",
        },
        this.datoFechaFinal,
        () => {
          if (this.punto == "***") {
            this.titulosServ();
          } else {
            let busqueda = this.array_punto_pago.find((e) => e.cod == this.punto);
            if (busqueda) this.titulosServ();
            else {
              CON851("", "01", null, "error", "Error");
              this.datoPunto();
            }
          }
        }
      );
    },

    titulosServ() {
      for (let i = 0; i < 6; i++) {
        let busqueda = this.array_serv.find((e) => e.cod == (parseInt(i) + 1).toString());
        this.serv_tit[`serv${parseInt(i) + 1}`] = busqueda ? busqueda.descrip : `Serv ${parseInt(i) + 1}`;

        if (i == 5) this.titulosPuntos();
      }
    },

    titulosPuntos() {
      for (let i = 0; i < 3; i++) {
        let busqueda = this.array_punto_pago[i];
        this.puntos_tit[`punto${parseInt(i) + 1}`] = busqueda ? busqueda.descrip : `_${parseInt(i) + 1}`;

        if (i == 2) this.llamarDLL();
      }
    },

    llamarDLL() {
      CON851P("00", this.datoPunto, () => {
        var datos_envio = [this.inicial.toString(), this.final.toString(), this.punto.toString()];

        this.estado_loader = true;
        this.label_loader = `Procesando: ${this.inicial} - ${this.final}`;
        this.progreso = { transferred: 0, speed: 0 };

        postData({ datosh: moduloDatosEnvio() + datos_envio.join("|") + "|" }, get_url("app/SERVDOM/PUB504.DLL"), {
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
            this.datoPunto();
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
        this.datoPunto();
      } else {
        let header_format = [];
        if (this.formato == 3) {
          header_format = [
            { text: `${nombreEmpresa}`, bold: true, size: 16 },
            `LISTADO DE PAGOS   DESDE: ${this.inicial} - HASTA: ${this.final}    NIT: ${nit_edit}`,
            `Fecha de reporte: ${fecha}`,
          ];
        } else {
          header_format = [
            `${nombreEmpresa}`,
            `${nit_edit}`,
            { text: `LISTADO DE PAGOS`, marginTop: 4 },
            { text: `DESDE: ${this.inicial} HASTA: ${this.final}` },
          ];
        }

        _impresion2({
          tipo: this.formato == 3 ? "excel" : "list_pdf",
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
            this.datoPunto();
            this.estado_loader = false;
          });
      }
    },

    traerPuntoPago() {
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB807.DLL"))
        .then((data) => {
          this.array_punto_pago = data.PUNTO_PAGO;
          this.traerServicios();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando archivo de punto de pago", null, "error", "");
          loader("hide");
          _toggleNav();
        });
    },

    traerServicios() {
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB781.DLL"))
        .then((data) => {
          this.array_serv = data.SERVPQR;
          loader("hide");
          this.datoFormato();
        })
        .catch((error) => {
          loader("hide");
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          _toggleNav();
        });
    },

    _ventanaPuntoPago() {
      _ventanaDatos({
        titulo: "Ventana Punto de Pago",
        columnas: ["cod", "descrip", "cta_contable"],
        data: this.array_punto_pago,
        callback_esc: () => {
          document.querySelector(".punto").focus();
        },
        callback: (data) => {
          this.punto = data.cod;
          setTimeout(() => {
            _enterInput(".punto");
          }, 200);
        },
      });
    },

    columnas_listado() {
      let columns = [
        {
          title: "Fecha Pago",
          value: "fecha_sec",
          format: "fecha",
          width: "7.5%",
        },
        {
          title: this.puntos_tit.punto1,
          value: "punto_1",
          format: "money",
          width: "7.5%",
        },
        {
          title: this.puntos_tit.punto2,
          value: "punto_2",
          format: "money",
          width: "7.5%",
        },
        {
          title: this.puntos_tit.punto3,
          value: "punto_3",
          format: "money",
          width: "7.5%",
        },
        {
          title: "Otros",
          value: "punto_otr",
          format: "money",
          width: "7.5%",
        },
        {
          title: "Total",
          value: "punto_tot",
          format: "money",
          width: "7.5%",
        },
        {
          title: this.serv_tit.serv1,
          value: "vlr_ser_1",
          format: "money",
          width: "7.5%",
        },
        {
          title: this.serv_tit.serv2,
          value: "vlr_ser_2",
          format: "money",
          width: "7.5%",
        },
        {
          title: this.serv_tit.serv3,
          value: "vlr_ser_3",
          format: "money",
          width: "7.5%",
        },
        {
          title: this.serv_tit.serv4,
          value: "vlr_ser_4",
          format: "money",
          width: "7.5%",
        },
        {
          title: this.serv_tit.serv5,
          value: "vlr_ser_5",
          format: "money",
          width: "7.5%",
        },
        {
          title: this.serv_tit.serv6,
          value: "vlr_ser_6",
          format: "money",
          width: "7.5%",
        },
        {
          title: "Recargo",
          value: "vlr_rec",
          format: "money",
          width: "5%",
        },
        {
          title: "Gen Fact",
          value: "genera_sec",
          width: "5%",
        },
      ];

      return columns;
    },
  },
});
