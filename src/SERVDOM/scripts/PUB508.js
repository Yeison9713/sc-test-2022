// Comparativo pagos x estrato - Opcion 5-8 - David.M - 06/08/2021

new Vue({
  el: "#PUB508",
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
    discr_fact: "",
    ruta: "",

    array_rutas: [],
  },
  created() {
    nombreOpcion("5-8 - Comparativo Pagos por Estrato");
    _inputControl("reset");
    _inputControl("disabled");
    loader("show");
    this.traerRutas();
  },
  computed: {
    descrip_ruta() {
      if (this.ruta == 99) {
        return "TODAS LAS RUTAS";
      } else {
        let busqueda = this.array_rutas.find((e) => e.cod == this.ruta);
        return busqueda ? busqueda.descrip : "";
      }
    },
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
          this.datoDiscr();
        }
      );
    },

    datoDiscr() {
      if (!this.discr_fact.trim()) this.discr_fact = "N";

      validarInputs(
        {
          form: "#discr_fact",
        },
        this.datoFechaArchivo,
        () => {
          this.discr_fact = this.discr_fact.toUpperCase();
          if (this.discr_fact != "S") this.discr_fact = "N";
          this.datoRuta();
        }
      );
    },

    datoRuta() {
      if (!this.ruta.trim()) this.ruta = "99";

      validarInputs(
        {
          form: "#ruta",
        },
        this.datoDiscr,
        () => {
          if (this.ruta == 99) {
            this.llamarDLL();
          } else {
            let busqueda = this.array_rutas.find((e) => e.cod == this.ruta);

            if (busqueda) this.llamarDLL();
            else {
              CON851("", "01", null, "error", "Error");
              this.datoRuta();
            }
          }
        }
      );
    },

    llamarDLL() {
      CON851P("00", this.datoFechaArchivo, () => {
        var datos_envio = [`${this.ano_gen}${this.mes_gen}`, this.discr_fact, this.ruta, localStorage.Usuario];

        this.estado_loader = true;
        this.label_loader = `Procesando: ${this.ano_gen}/${this.mes_gen}`;
        this.progreso = { transferred: 0, speed: 0 };

        postData({ datosh: moduloDatosEnvio() + datos_envio.join("|") + "|" }, get_url("app/SERVDOM/PUB508.DLL"), {
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
            this.datoRuta();
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
        this.datoRuta();
      } else {
        let header_format = [];
        header_format = [
          { text: `${nombreEmpresa}`, bold: true, size: 16 },
          `RESUMEN POR ESTRATO   FECHA GENERACIÓN: ${this.ano_gen}-${this.mes_gen}   RUTA: ${this.ruta}   NIT: ${nit_edit}`,
          `Fecha de reporte: ${fecha}`,
        ];

        listado.forEach((el) => {
          el.vlr_ant = el.vlr_ant.replace(/\ /g, "");
          el.vlr_act = el.vlr_act.replace(/\ /g, "");
          el.vlr_aju = el.vlr_aju.replace(/\ /g, "");
          el.vlr_int_mes = el.vlr_int_mes.replace(/\ /g, "");
          el.vlr_int_ant = el.vlr_int_ant.replace(/\ /g, "");
          el.vlr_ref = el.vlr_ref.replace(/\ /g, "");
          el.vlr_cnx = el.vlr_cnx.replace(/\ /g, "");
          el.vlr_tot = el.vlr_tot.replace(/\ /g, "");
          el.vlr_recaud = el.vlr_recaud.replace(/\ /g, "");
          el.porc = el.porc.replace(/\ /g, "");
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
            this.datoRuta();
            this.estado_loader = false;
          });
      }
    },

    traerRutas() {
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB804.DLL"))
        .then((data) => {
          this.array_rutas = data.RUTAS;
          loader("hide");
          this.datoFechaArchivo();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando archivo de rutas", null, "error", "");
          loader("hide");
          _toggleNav();
        });
    },

    _ventanaRutas() {
      _ventanaDatos({
        titulo: "Ventana de Rutas",
        columnas: ["cod", "descrip"],
        data: this.array_rutas,
        callback_esc: () => {
          document.querySelector(".ruta").focus();
        },
        callback: (data) => {
          this.ruta = data.cod;
          setTimeout(() => {
            _enterInput(".ruta");
          }, 200);
        },
      });
    },

    columnas_listado() {
      let columns = [
        {
          title: "Servicio",
          value: "descrip_serpq",
        },
        {
          title: "Tarifa",
          value: "llave_tar",
        },
        {
          title: "Saldo Anterior",
          value: "vlr_ant",
          format: "money",
        },
        {
          title: "Cargos del mes",
          value: "vlr_act",
          format: "money",
        },
        {
          title: "Ajustes",
          value: "vlr_aju",
          format: "money",
        },
        {
          title: "Intereses mes",
          value: "vlr_int_mes",
          format: "money",
        },
        {
          title: "Interes Anterior",
          value: "vlr_int_ant",
          format: "money",
        },
        {
          title: "Cuota Refinanciación",
          value: "vlr_ref",
          format: "money",
        },
        {
          title: "Reconexiones",
          value: "vlr_cnx",
          format: "money",
        },
        {
          title: "Subtotal",
          value: "vlr_tot",
          format: "money",
        },
        {
          title: "Nro Usuarios",
          value: "nro_usuar",
        },
        {
          title: "Vlr Recaudos",
          value: "vlr_recaud",
          format: "money",
        },
        {
          title: "Nro Pagos",
          value: "nro_recaud",
        },
        {
          title: "% Recaudo",
          value: "porc",
          format: "string"
        },
      ];

      return columns;
    },
  },
});
