// Configuracion de novedades de lectura - 1-A - David.M - 12-06-2021
const { regs_dom } = require("../../SERVDOM/scripts/regs_dom.js");

new Vue({
  el: "#PUB111",
  data: {
    reg_lec: regs_dom.CONFIG_LECT(),
    fecha_act: moment().format("YYYYMMDD"),
    reg_tabla: {
      codigo: "",
      concep: "",
      normal: "",
      increm: "",
      invert: "",
      promed: "",
      consum: "",
    },
  },
  created() {
    nombreOpcion("1-A - Configura novedades de lectura");
    _inputControl("reset");
    _inputControl("disabled");
    loader("show");
    this.traerConfig();
  },
  methods: {
    datoCodigo() {
      if (this.reg_tabla.codigo < 1) this.reg_tabla.codigo = "01";
      if (this.reg_tabla.codigo > 20) {
        this.reg_tabla.codigo = "20";
        this.confirmar();
      } else {
        validarInputs(
          {
            form: "#codigo",
            event_f3: this.confirmar,
            event_f5: () => {
              CON851P("03", this.datoCodigo, _toggleNav);
            },
          },
          () => {
            if (this.reg_tabla.codigo == 1) {
              CON851P("03", this.datoCodigo, _toggleNav);
            } else {
              this.reg_tabla.codigo = (parseInt(this.reg_tabla.codigo) - 1).toString().padStart(2, "0");
              this.datoCodigo();
            }
          },
          () => {
            this.reg_tabla = Object.assign({}, this.reg_lec.tabla_lec[parseInt(this.reg_tabla.codigo) - 1]);
            this.datoConcep();
          }
        );
      }
    },

    datoConcep() {
      validarInputs(
        {
          form: "#concep",
          event_f3: this.confirmar,
          event_f5: () => {
            CON851P("03", this.datoCodigo, _toggleNav);
          },
        },
        this.datoCodigo,
        () => {
          this.reg_tabla.concep = this.reg_tabla.concep.toUpperCase();
          if (!this.reg_tabla.concep.trim()) {
            this.reg_tabla = {
              codigo: this.reg_tabla.codigo,
              concep: "",
              normal: "",
              increm: "",
              invert: "",
              promed: "",
              consum: "",
            };
            this.otraLinea();
          } else {
            this.datoNormal();
          }
        }
      );
    },

    datoNormal() {
      if (!this.reg_tabla.normal.trim()) this.reg_tabla.normal = "N";
      validarInputs(
        {
          form: "#normal",
        },
        this.datoConcep,
        () => {
          this.reg_tabla.normal = this.reg_tabla.normal.toUpperCase();
          if (this.reg_tabla.normal != "S") this.reg_tabla.normal = "N";
          if (this.reg_tabla.normal == "S") {
            this.reg_tabla = {
              codigo: this.reg_tabla.codigo,
              concep: this.reg_tabla.concep,
              normal: this.reg_tabla.normal,
              increm: "",
              invert: "",
              promed: "",
              consum: "",
            };
            this.otraLinea();
          } else {
            this.datoIncrem();
          }
        }
      );
    },

    datoIncrem() {
      if (!this.reg_tabla.increm.trim()) this.reg_tabla.increm = "N";
      validarInputs(
        {
          form: "#increm",
        },
        this.datoNormal,
        () => {
          this.reg_tabla.increm = this.reg_tabla.increm.toUpperCase();
          if (this.reg_tabla.increm != "S") this.reg_tabla.increm = "N";
          this.datoPromed();
        }
      );
    },

    datoPromed() {
      if (!this.reg_tabla.promed.trim()) this.reg_tabla.promed = "S";
      validarInputs(
        {
          form: "#promed",
        },
        this.datoIncrem,
        () => {
          this.reg_tabla.promed = this.reg_tabla.promed.toUpperCase();
          if (this.reg_tabla.promed != "S") this.reg_tabla.promed = "N";
          if (this.reg_tabla.promed == "S") {
            this.reg_tabla.consum = "";
            this.reg_tabla.invert = "";
            this.otraLinea();
          } else {
            this.datoConsumo();
          }
        }
      );
    },

    datoConsumo() {
      validarInputs(
        {
          form: "#consum",
        },
        this.datoPromed,
        () => {
          if (this.reg_tabla.consum > 0) {
            this.reg_tabla.invert = "";
            this.otraLinea();
          } else {
            this.datoInvert();
          }
        }
      );
    },

    datoInvert() {
      if (!this.reg_tabla.invert.trim()) this.reg_tabla.invert = "S";
      validarInputs(
        {
          form: "#invert",
        },
        this.datoConsumo,
        () => {
          this.reg_tabla.invert = this.reg_tabla.invert.toUpperCase();
          if (this.reg_tabla.invert != "S") this.reg_tabla.invert = "N";
          if (this.reg_tabla.invert == "N" && this.reg_tabla.increm == "N" && this.reg_tabla.consum == 0) {
            this.datoInvert();
          } else {
            this.otraLinea();
          }
        }
      );
    },

    otraLinea() {
      this.reg_lec.tabla_lec[parseInt(this.reg_tabla.codigo) - 1] = Object.assign({}, this.reg_tabla);
      this.reg_tabla.codigo = (parseInt(this.reg_tabla.codigo) + 1).toString().padStart(2, "0");
      this.datoCodigo();
    },

    confirmar() {
      CON851P("01", this.datoCodigo, this.grabar);
    },

    grabar() {
      loader("show");

      let datos = _getObjetoSave(this.reg_lec, ["tabla_lec"]);

      datos = {
        ...datos,
        datosh: moduloDatosEnvio() + localStorage.Usuario + "|",
      };

      console.log(datos, "datos");

      postData(datos, get_url("app/SERVDOM/PUB111.DLL"))
        .then((data) => {
          switch (data) {
            case "7":
              CON851("", "Guardado con éxito", null, "success", "");
              break;
          }
          loader("hide");
          _toggleNav();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error", null, "error", "");
          loader("hide");
          this.datoCodigo();
        });
    },

    traerConfig() {
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB111_01.DLL"))
        .then((data) => {
          this.reg_lec = data;
          loader("hide");
          this.datoCodigo();
        })
        .catch((error) => {
          loader("hide");
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          _toggleNav();
        });
    },
  },
});
