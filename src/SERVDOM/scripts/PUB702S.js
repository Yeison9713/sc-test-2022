// Actualizacion Causales P.Q.R SUI - David.M - 07/09/2021

const { regs_dom } = require("../../SERVDOM/scripts/regs_dom");

new Vue({
  el: "#PUB702S",
  data: {
    novedad: "",
    reg_pqr_s: regs_dom.PQR_SUI(),
    array_clases: [
      { COD: "1", DESCRIP: "Reclamaciones" },
      { COD: "2", DESCRIP: "Peticiones que no constituyen una declaración" },
    ],

    array_sui: [],
  },
  created() {
    nombreOpcion("7-8 - Actualización Causales P.Q.R SUI");
    _inputControl("reset");
    _inputControl("disabled");
    loader("show");
    this.traerSUI();
  },
  watch: {
    "reg_pqr_s.definicion": function (val) {
      this.reg_pqr_s.definicion = val.enterPut().replaceEsp();
    },
  },
  computed: {
    descrip_sui() {
      let busqueda = this.array_sui.find((e) => e.llave == this.reg_pqr_s.cod);
      return busqueda ? busqueda.descrip : "";
    },
    clase_edit() {
      let busqueda = this.array_clases.find((e) => e.COD == this.reg_pqr_s.clase);
      return busqueda ? `${busqueda.COD} - ${busqueda.DESCRIP}` : "";
    },
  },
  methods: {
    _ventanaNovedad() {
      CON850((data) => {
        this.novedad = data.id;
        if (this.novedad == "F") _toggleNav();
        else this.datoClase();
      });
    },

    datoClase() {
      POPUP(
        {
          array: this.array_clases,
          titulo: "CLASE",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: this.reg_pqr_s.clase || "1",
          callback_f: this._ventanaNovedad,
        },
        async (data) => {
          this.reg_pqr_s.clase = data.COD;
          this.datoCodigo();
        }
      );
    },

    datoCodigo() {
      validarInputs(
        {
          form: "#cod",
        },
        this.datoClase,
        () => {
          this.reg_pqr_s.cod = this.reg_pqr_s.cod.padStart(2, "0");
          if (this.reg_pqr_s.cod.trim() && this.reg_pqr_s.cod != 0) {
            this.leerSUI();
          } else {
            this.datoCodigo();
          }
        }
      );
    },

    leerSUI() {
      let busqueda = this.array_sui.find((e) => `${e.clase}${e.cod}` == `${this.reg_pqr_s.clase}${this.reg_pqr_s.cod}`);
      if (busqueda) {
        this.reg_pqr_s.descrip = busqueda.descrip;
        this.reg_pqr_s.definicion = busqueda.definicion;
      } else if (this.novedad == 7) {
        this.reg_pqr_s.descrip = "";
        this.reg_pqr_s.definicion = "";
      }

      switch (this.novedad) {
        case "7":
          if (!busqueda) this.datoDescripcion();
          else {
            CON851("", "00", null, "error", "Error");
            this.datoCodigo();
          }
          break;
        case "8":
          if (busqueda) this.datoDescripcion();
          else {
            CON851("", "01", null, "error", "Error");
            this.datoCodigo();
          }
          break;
        case "9":
          if (busqueda) {
            CON851P("02", this.datoCodigo, () => {
              this.llamarDll();
            });
          } else {
            CON851("", "01", null, "error", "Error");
            this.datoCodigo();
          }
          break;
      }
    },

    datoDescripcion() {
      validarInputs(
        {
          form: "#descrip",
        },
        this.datoCodigo,
        () => {
          if (this.reg_pqr_s.descrip.trim()) this.datoDefinicion();
          else {
            CON851("", "02", null, "error", "Error");
            this.datoDescripcion();
          }
        }
      );
    },

    datoDefinicion() {
      validarInputs(
        {
          form: "#definicion",
        },
        this.datoDescripcion,
        () => {
          this.reg_pqr_s.definicion = this.reg_pqr_s.definicion.replaceEsp();
          if (this.reg_pqr_s.definicion.trim() && this.reg_pqr_s.definicion != 0) {
            this.confirmar();
          } else {
            this.datoCodigo();
          }
        }
      );
    },

    confirmar() {
      CON851P("01", this.datoDefinicion, this.llamarDll);
    },

    async llamarDll() {
      loader("show");

      let datos = {
        ..._getObjetoSave(this.reg_pqr_s),
        novedad: this.novedad.toString(),
        datosh: moduloDatosEnvio(),
      };

      postData(datos, get_url("app/SERVDOM/PUB702S.DLL"))
        .then((data) => {
          switch (data) {
            case "7":
              CON851("", "Guardado con éxito", null, "success", "");
              break;
            case "8":
              CON851("", "Modificado con éxito", null, "success", "");
              break;
            case "9":
              CON851("", "Eliminado con éxito", null, "success", "");
              break;
          }
          loader("hide");
          _toggleNav();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error", null, "error", "");
          loader("hide");
          this.datoDefinicion();
        });
    },

    _ventanaSUI() {
      _ventanaDatos({
        titulo: "Ventana de Causales de P.Q.R.",
        columnas: [
          { value: "clase", label: "Clase" },
          { value: "cod", label: "Codigo" },
          { value: "descrip", label: "Descripción" },
          { value: "definicion", label: "Definición" },
        ],
        data: this.array_sui.filter((e) => e.clase == this.reg_pqr_s.clase),
        callback_esc: () => {
          document.querySelector(".cod").focus();
        },
        callback: (data) => {
          this.reg_pqr_s.cod = data.cod;
          setTimeout(() => {
            _enterInput(".cod");
          }, 200);
        },
      });
    },

    traerSUI() {
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB782S.DLL"))
        .then((data) => {
          this.array_sui = data.DATOS;
          loader("hide");
          this._ventanaNovedad();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "");
          loader("hide");
          _toggleNav();
        });
    },
  },
});
