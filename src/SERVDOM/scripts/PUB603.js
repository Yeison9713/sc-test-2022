// Re imprime recibos de pago en bancos - Opcion 5-C - David.M - 22/08/2021

new Vue({
  el: "#PUB603",
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
    ano_pag: "",
    mes_pag: "",
    dia_pag: "",
    cod: "",
    secu: "",

    array_datos: [],
  },
  created() {
    nombreOpcion("6-3 - Re imprime recibos de pago en bancos");
    _inputControl("reset");
    _inputControl("disabled");
    this.datoFechaPag();
  },
  methods: {
    datoFechaPag() {
      if (!this.ano_pag.trim()) this.ano_pag = $_USUARIO_EMPRESA.ULT_PER.slice(0, 4);
      if (!this.mes_pag.trim()) this.mes_pag = $_USUARIO_EMPRESA.ULT_PER.slice(4);
      if (!this.dia_pag.trim()) this.dia_pag = "01";
      validarInputs(
        {
          form: "#fecha_pag",
        },
        _toggleNav,
        () => {
          this.ano_pag = this.ano_pag.padStart(4, "0");
          this.mes_pag = this.mes_pag.padStart(2, "0");
          this.dia_pag = this.dia_pag.padStart(2, "0");
          this.fecha_pago = `${this.ano_pag}${this.mes_pag}${this.dia_pag}`;

          if (this.mes_pag < 1 || this.mes_pag > 12) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaPag();
          } else if (this.dia_pag < 1 || this.dia_pag > 31) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaPag();
          } else {
            setTimeout(() => {
              this._ventanaPagos();
            }, 200);
          }
        }
      );
    },

    _ventanaPagos() {
      _fin_validar_form();
      loader("show");

      let fecha_w = `000000${this.ano_pag}${this.mes_pag}${this.dia_pag}`;
      postData({ datosh: moduloDatosEnvio() + fecha_w + "|" }, get_url("app/SERVDOM/PUB813.DLL"))
        .then((data) => {
          data.DATOS.pop();
          this.array_datos = data.DATOS;
          loader("hide");
          _ventanaDatos({
            titulo: "Consulta de Pagos del Dia",
            columnas: ["fecha", "cta", "secu", "vlr", "fecha_gen"],
            data: this.array_datos,
            callback_esc: this.datoFechaPag,
            callback: (data) => {
              this.ano_pag = data.fecha_pag.slice(0, 4);
              this.mes_pag = data.fecha_pag.slice(4, 6);
              this.dia_pag = data.fecha_pag.slice(6);
              this.cod = data.cta;
              this.secu = data.secu;
              this.ano_gen = data.fecha_gen.slice(0, 4);
              this.mes_gen = data.fecha_gen.slice(4);
              setTimeout(() => {
                this.confirmar();
              }, 200);
            },
          });
        })
        .catch((error) => {
          loader("hide");
          console.error(error);
          if (!error.STATUS) CON851("", "Error consultando datos", null, "error", "Error");
          this.datoFechaPag();
        });
    },

    confirmar() {
      CON851P("00", this.datoFechaPag, this.imprimir);
    },

    imprimir() {
      loader("show");
      let llave_pago = `${this.ano_gen}${this.mes_gen}${this.ano_pag}${this.mes_pag}${this.dia_pag}${this.cod}${this.secu}`;

      const { imprimir_PUB601B } = require("../../frameworks/pdf/servdom/PUB601B.formato.js");
      imprimir_PUB601B({
        llave_w: llave_pago,
        callback: () => {
          loader("hide");
          _toggleNav();
        },
        callback_err: () => {
          CON851("", "Error generando impresión", null, "error", "Error");
          _toggleNav();
        },
      });
    },
  },
});
