// Maestro rutas - David.M - 01/06/2021

new Vue({
  el: "#PUB104",
  data: {
    novedad: "",
    cod_ruta: "",
    descrip_ruta: "",
    array_rutas: [],
  },
  created() {
    nombreOpcion("1-4 - Actualización de Rutas");
    _inputControl("reset");
    _inputControl("disabled");
    loader("show");
    this.traerRutas();
  },
  methods: {
    _ventanaNovedad() {
      CON850(
        (data) => {
          this.novedad = data.id;
          if(this.novedad == "F") _toggleNav();
          else this.datoRuta();
        }
      )
    },

    datoRuta() {
      validarInputs(
        {
          form: "#cod_ruta",
        },
        this._ventanaNovedad,
        () => {
          if (this.cod_ruta.trim() && this.cod_ruta != 0) {
            this.leerActividad();
          } else {
            this.datoRuta();
          }
        }
      );
    },

    leerActividad() {
      let busqueda = this.array_rutas.find((e) => e.cod == this.cod_ruta);
      if (busqueda) this.descrip_ruta = busqueda.descrip;

      switch (this.novedad) {
        case "7":
          if (!busqueda) this.datoNombreRuta();
          else this.error("00", this.datoRuta);
          break;
        case "8":
          if (busqueda) this.datoNombreRuta();
          else this.error("01", this.datoRuta);
          break;
        case "9":
          if (busqueda) {
            CON851P("02", this.datoRuta, () => {
              this.llamarDll("9");
            });
          } else this.error("01", this.datoRuta);
          break;
      }
    },

    datoNombreRuta() {
      validarInputs(
        {
          form: "#descrip_ruta",
        },
        this.datoRuta,
        () => {
          if (this.descrip_ruta.trim()) {
            this.confirmar();
          } else {
            CON851("", "02", null, "error", "Error");
            this.datoNombreRuta();
          }
        }
      );
    },

    confirmar() {
      CON851P("01", this.datoNombreRuta, () => {
        if (this.novedad == "8") this.llamarDll("8");
        else this.llamarDll("7");
      });
    },

    llamarDll(novedad) {
      loader("show");
      let datos = [
        novedad,
        this.cod_ruta.toString(),
        this.descrip_ruta.toString(),
      ];

      postData(
        { datosh: moduloDatosEnvio() + datos.join("|") + "|" },
        get_url("app/SERVDOM/PUB104.DLL")
      )
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
          this.datoRuta();
        });
    },

    error(cod, callback) {
      CON851("", cod, null, "error", "Error");
      callback();
    },

    _ventanaRutas() {
      _ventanaDatos({
        titulo: "Ventana de Rutas",
        columnas: ["cod", "descrip"],
        data: this.array_rutas,
        callback_esc: () => {
          document.querySelector(".cod_ruta").focus();
        },
        callback: (data) => {
          this.cod_ruta = data.cod;
          this.descrip_ruta = data.descrip;
          setTimeout(() => {
            _enterInput(".cod_ruta");
          }, 200);
        },
      });
    },

    traerRutas() {
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB804.DLL"))
        .then((data) => {
          this.array_rutas = data.RUTAS;
          loader("hide");
          this._ventanaNovedad();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando archivo de rutas", null, "error", "");
          loader("hide");
          _toggleNav();
        });
    },
  },
});
