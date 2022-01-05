// Actualizacion Dependencias para P.Q.R. - David.M - 27/08/2021

const { regs_dom } = require("../../SERVDOM/scripts/regs_dom.js");

new Vue({
  el: "#PUB703",
  data: {
    novedad: "",

    reg_dep: regs_dom.DEPEN(),
    array_dependencias: [],
  },
  created() {
    nombreOpcion("7-3 - Actualización Dependencias P.Q.R");
    _inputControl("reset");
    _inputControl("disabled");
    loader("show");
    this.traerDependencias();
  },
  methods: {
    _ventanaNovedad() {
      CON850((data) => {
        this.novedad = data.id;
        if (this.novedad == "F") _toggleNav();
        else this.datoCodigo();
      });
    },

    datoCodigo() {
      validarInputs(
        {
          form: "#cod",
        },
        this._ventanaNovedad,
        () => {
          if (this.reg_dep.cod.trim() && this.reg_dep.cod != 0 && !isNaN(parseInt(this.reg_dep.cod))) {
            this.leerDependencia();
          } else {
            this.datoCodigo();
          }
        }
      );
    },

    leerDependencia() {
      let busqueda = this.array_dependencias.find((e) => e.cod == this.reg_dep.cod);
      if (busqueda) {
        this.reg_dep.descrip = busqueda.descrip;
        this.reg_dep.responsable = busqueda.responsable;
      } else if (this.novedad != 7) this.reg_dep.descrip = "";

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
          if (this.reg_dep.descrip.trim()) this.datoResponsable();
          else {
            CON851("", "02", null, "error", "Error");
            this.datoDescripcion();
          }
        }
      );
    },

    datoResponsable() {
      validarInputs(
        {
          form: "#responsable",
        },
        this.datoDescripcion,
        () => {
          if (this.reg_dep.responsable.trim()) this.confirmar();
          else {
            CON851("", "02", null, "error", "Error");
            this.datoDescripcion();
          }
        }
      );
    },

    confirmar() {
      CON851P("01", this.datoResponsable, this.llamarDll);
    },

    llamarDll() {
      loader("show");
      let datos = {
        datosh: moduloDatosEnvio(),
        novedad: this.novedad.toString(),
        cod: this.reg_dep.cod.toString(),
        descrip: this.reg_dep.descrip.toString(),
        responsable: this.reg_dep.responsable.toString(),
      };

      postData(datos, get_url("app/SERVDOM/PUB703.DLL"))
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
          this.datoResponsable();
        });
    },

    _ventanaDependencias() {
      _ventanaDatos({
        titulo: "Ventana de Dependencias P.Q.R.",
        columnas: [
          { value: "cod", label: "Codigo" },
          { value: "descrip", label: "Descripción" },
          { value: "responsable", label: "Responsable" },
        ],
        data: this.array_dependencias,
        callback_esc: () => {
          document.querySelector(".cod").focus();
        },
        callback: (data) => {
          this.reg_dep.cod = data.cod;
          this.reg_dep.descrip = data.descrip;
          setTimeout(() => {
            _enterInput(".cod");
          }, 200);
        },
      });
    },

    traerDependencias() {
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB783.DLL"))
        .then((data) => {
          this.array_dependencias = data.DATOS;
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
