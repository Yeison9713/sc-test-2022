// Listado para corte - Opcion 5-3 - David.M - 03/08/2021

new Vue({
  el: "#PUB503",
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,

    formato: "",
    ano_gen: "",
    mes_gen: "",
    serv: "",

    array_serv: [],
  },
  created() {
    nombreOpcion("5-3 - Listado para Corte");
    _inputControl("reset");
    _inputControl("disabled");
    this.traerServicios();
  },
  computed: {
    descrip_serv() {
      let busqueda = this.array_serv.find((e) => e.cod == this.serv);
      return busqueda ? busqueda.descrip : "";
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
            this.datoServ();
          }, 200);
        }
      );
    },

    datoServ() {
      if (!this.serv.trim()) this.serv = "1";
      validarInputs(
        {
          form: "#serv",
        },
        this.datoFormato,
        () => {
          let busqueda = this.array_serv.find((e) => e.cod == this.serv);
          if (busqueda) this.datoFechaArchivo();
          else {
            CON851("", "01", null, "error", "Error");
            this.datoServ();
          }
        }
      );
    },

    datoFechaArchivo() {
      validarInputs(
        {
          form: "#fecha_gen",
        },
        this.datoServ,
        () => {
          this.ano_gen = this.ano_gen.padStart(4, "0");
          this.mes_gen = this.mes_gen.padStart(2, "0");
          this.llamarDLL();
        }
      );
    },

    llamarDLL() {
      CON851P("00", this.datoFechaArchivo, () => {
        var datos_envio = [this.serv.toString(), `${this.ano_gen}${this.mes_gen}`];

        this.estado_loader = true;
        this.label_loader = `Procesando: ${this.ano_gen}/${this.mes_gen}`;
        this.progreso = { transferred: 0, speed: 0 };

        postData({ datosh: moduloDatosEnvio() + datos_envio.join("|") + "|" }, get_url("app/SERVDOM/PUB503.DLL"), {
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
            this.datoFechaArchivo();
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
        this.datoFechaArchivo();
      } else {
        let header_format = [];
        if (this.formato == 3) {
          header_format = [
            { text: `${nombreEmpresa}`, bold: true, size: 16 },
            `LISTADO PARA CORTE   ${this.descrip_serv} - ${this.ano_gen}/${this.mes_gen}    NIT: ${nit_edit}`,
            `Fecha de reporte: ${fecha}`,
          ];
        } else {
          header_format = [`${nombreEmpresa}`, `${nit_edit}`, { text: `LISTADO PARA CORTE`, marginTop: 4 }];
        }

        listado.forEach((el) => {
          el.sdo_ant = el.sdo_ant.replace(/\ /g, "");
          el.cargos = el.cargos.replace(/\ /g, "");
          el.int_mes = el.int_mes.replace(/\ /g, "");
          el.vlr_aju = el.vlr_aju.replace(/\ /g, "");
          el.refinan = el.refinan.replace(/\ /g, "");
          el.sub_tot = el.sub_tot.replace(/\ /g, "");
          el.abonos = el.abonos.replace(/\ /g, "");
          el.sdo_act = el.sdo_act.replace(/\ /g, "");
        });

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
            this.datoFechaArchivo();
            this.estado_loader = false;
          });
      }
    },

    traerServicios() {
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB781.DLL"))
        .then((data) => {
          this.array_serv = data.SERVPQR;
          this.datoFormato();
        })
        .catch((error) => {
          loader("hide");
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          _toggleNav();
        });
    },

    _ventanaServicios() {
      _ventanaDatos({
        titulo: "Ventana de Servicios P.Q.R.",
        columnas: ["cod", "descrip"],
        data: this.array_serv,
        callback_esc: () => {
          document.querySelector(".serv").focus();
        },
        callback: (data) => {
          this.serv = data.cod;
          setTimeout(() => {
            _enterInput(".serv");
          }, 200);
        },
      });
    },

    columnas_listado() {
      let columns = [
        {
          title: "Fact",
          value: "llave",
          width: "4%",
        },
        {
          title: "Nombre del Usuario",
          value: "nombre_pub",
          width: "22%",
        },
        {
          title: "Dirección",
          value: "direcc_pub",
          width: "22%",
        },
        {
          title: "Est",
          value: "est",
          format: "string",
          width: "3%",
        },
        {
          title: "Saldo ant",
          value: "sdo_ant",
          format: "money",
          width: "7%",
        },
        {
          title: "Vlr servic",
          value: "cargos",
          format: "money",
          width: "7%",
        },
        {
          title: "Int mes",
          value: "int_mes",
          format: "money",
          width: "5%",
        },
        {
          title: "Ajustes",
          value: "vlr_aju",
          format: "money",
          width: "5%",
        },
        {
          title: "Refinanc",
          value: "refinan",
          format: "money",
          width: "6%",
        },
        {
          title: "Subtotal",
          value: "sub_tot",
          format: "money",
          width: "7%",
        },
        {
          title: "Abonos",
          value: "abonos",
          format: "money",
          width: "5%",
        },
        {
          title: "Saldo",
          value: "sdo_act",
          format: "money",
          width: "7%",
        },
      ];

      return columns;
    },
  },
});
