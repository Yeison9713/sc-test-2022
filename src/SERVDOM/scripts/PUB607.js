const { regs_dom } = require("../../SERVDOM/scripts/regs_dom");
const { _ventana_PUB801 } = require("../../SERVDOM/scripts/globalDom");

new Vue({
  el: "#PUB607",
  data: {
    ano_gen: "",
    mes_gen: "",
    reg_fact: regs_dom.FACT(),
    tabla: [],
    mostrar_tabla: false,
    array_usuar_ser: [],
  },
  created() {
    nombreOpcion("6-7 - Busqueda de Facturas en Recaudos");
    _inputControl("reset");
    _inputControl("disabled");
    this.traerUsuarSer();
  },
  computed: {
    nombre_cat() {
      let busqueda = this.array_usuar_ser.find((e) => e.CUENTA == this.reg_fact.cat);
      return busqueda ? busqueda.NOMBRE : "";
    },
  },
  methods: {
    datoFechaArchivo() {
      if (!this.ano_gen.trim()) this.ano_gen = $_USUARIO_EMPRESA.ULT_PER.slice(0, 4);
      if (!this.mes_gen.trim()) this.mes_gen = $_USUARIO_EMPRESA.ULT_PER.slice(4);

      validarInputs(
        {
          form: "#fecha_gen",
        },
        _toggleNav,
        () => {
          this.ano_gen = this.ano_gen.padStart(4, "0");
          this.mes_gen = this.mes_gen.padStart(2, "0");

          this.leerArchivo();
        }
      );
    },

    leerArchivo() {
      loader("show");
      postData(
        { datosh: moduloDatosEnvio() + `${this.ano_gen}${this.mes_gen}` + "|1|" },
        get_url("app/SERVDOM/PUB201_02.DLL")
      )
        .then((data) => {
          loader("hide");
          if (data == 8) {
            this.datoFact();
          } else {
            CON851("", "No existe el archivo", null, "error", "");
            this.datoFechaArchivo();
          }
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          CON851("", "Error consultando datos", null, "error", "Error");
          this.datoFechaArchivo();
        });
    },

    datoFact() {
      validarInputs(
        {
          form: "#llave",
        },
        this.datoFechaArchivo,
        () => {
          this.leerFact();
        }
      );
    },

    leerFact() {
      if (this.reg_fact.llave <= 0) {
        this.datoFact();
      } else {
        postData(
          {
            datosh: moduloDatosEnvio() + "1|",
            fecha: `${this.ano_gen}${this.mes_gen}`,
            nro_fac: this.reg_fact.llave,
          },
          get_url("app/SERVDOM/PUB203_02.DLL")
        )
          .then((data) => {
            loader("hide");

            if (data.llave == 0) data.llave = "";

            if (data.llave.trim()) {
              this.reg_fact = Object.assign({}, data);

              let busqueda = this.array_usuar_ser.find((e) => e.CUENTA == this.reg_fact.cat);
              if (!busqueda) this.nombre_cat = "USUARIO NO EXISTE!";

              this.confirmar();
            } else {
              CON851("", "08", null, "error", "Error");
              this.datoFact();
            }
          })
          .catch((error) => {
            console.error(error);
            loader("hide");
            CON851("", "Error consultando datos", null, "error", "Error");
            _toggleNav();
          });
      }
    },

    confirmar() {
      CON851P("04", this.datoFact, this.arrancarPagos);
    },

    arrancarPagos() {
      loader("show");

      datos = {
        fact: this.reg_fact.llave,
        fecha_gen: `${this.ano_gen}${this.mes_gen}`,
        datosh: moduloDatosEnvio(),
      };

      postData(datos, get_url("app/SERVDOM/PUB607.DLL"))
        .then(async (data) => {
          loader("hide");
          data.LISTADO.pop();
          this.tabla = data.LISTADO;

          this.mostrar_tabla = true;
          setTimeout(() => {
            this.$refs.btn_tabla.focus();
          }, 400);
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          CON851("", "Error consultando datos", null, "error", "");
          this.datoFact();
        });
    },

    callback_tabla() {
      this.mostrar_tabla = false;
      this.datoFact();
    },

    traerUsuarSer() {
      postData({ datosh: moduloDatosEnvio() + "1" }, get_url("app/SERVDOM/PUB801.DLL"))
        .then((data) => {
          this.array_usuar_ser = data.USDOM;
          loader("hide");
          this.datoFechaArchivo();
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          CON851("", "Error consultando datos", null, "error", "");
          _toggleNav();
        });
    },

    _ventanaUsuarSer() {
      _fin_validar_form();

      _ventana_PUB801(this.datoFact).then((data) => {
        this.array_usuar_ser = data.datos;
        Vue.set(this.reg_fact, "cat", data.cuenta);

        postData(
          { datosh: moduloDatosEnvio() + "2|", fecha: `${this.ano_gen}${this.mes_gen}`, cat: this.reg_fact.cat },
          get_url("app/SERVDOM/PUB203_02.DLL")
        )
          .then((data) => {
            loader("hide");
            if (data.llave == 0) data.llave = "";

            if (!data.llave) {
              CON851("", "08", null, "error", "Error");
              this.reg_fact.llave = "";
              this.datoFact();
            } else {
              this.reg_fact.llave = data.llave;
              this.leerFact();
            }
          })
          .catch((error) => {
            console.error(error);
            loader("hide");
            CON851("", "Error consultando datos", null, "error", "Error");
            this.datoFact();
          });
      });
    },
  },
});
