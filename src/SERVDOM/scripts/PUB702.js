// Actualizacion Motivo para P.Q.R. - David.M - 27/08/2021

new Vue({
  el: "#PUB702",
  data: {
    novedad: "",
    clase: "",
    codigo: "",
    descripcion: "",
    cod_sui: "",
    array_clases: [
      { COD: "1", DESCRIP: "Reclamaciones" },
      { COD: "2", DESCRIP: "Peticiones No son reclam" },
      { COD: "3", DESCRIP: "Solicitud Información" },
      { COD: "4", DESCRIP: "Otros" },
    ],

    array_motivos: [],
    array_sui: [],
  },
  created() {
    nombreOpcion("7-2 - Actualización Motivo para P.Q.R");
    _inputControl("reset");
    _inputControl("disabled");
    loader("show");
    this.traerMotivos();
  },
  computed: {
    descrip_sui() {
      let busqueda = this.array_sui.find((e) => `${e.clase}${e.cod}` == this.cod_sui);
      return busqueda ? busqueda.descrip : "";
    },
    clase_edit() {
      let busqueda = this.array_clases.find((e) => e.COD == this.clase);
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
          seleccion: this.clase || "1",
          callback_f: this._ventanaNovedad,
        },
        async (data) => {
          this.clase = data.COD;
          this.datoCodigo();
        }
      );
    },

    datoCodigo() {
      validarInputs(
        {
          form: "#codigo",
        },
        this.datoClase,
        () => {
          if (this.codigo.trim() && this.codigo != 0) {
            this.leerMotivo();
          } else {
            this.datoCodigo();
          }
        }
      );
    },

    leerMotivo() {
      let busqueda = this.array_motivos.find((e) => e.llave == `${this.clase}${this.codigo}`);
      if (busqueda) {
        this.descripcion = busqueda.descrip;
        this.cod_sui = busqueda.equiv;
      } else if (this.novedad != 7) this.descripcion = "";

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
          form: "#descripcion",
        },
        this.datoCodigo,
        () => {
          if (this.descripcion.trim()) this.datoSUI();
          else {
            CON851("", "02", null, "error", "Error");
            this.datoDescripcion();
          }
        }
      );
    },

    datoSUI() {
      validarInputs(
        {
          form: "#cod_sui",
        },
        this.datoDescripcion,
        () => {
          if (this.cod_sui.trim() && this.cod_sui != 0) {
            let busqueda = this.array_sui.find((e) => `${e.clase}${e.cod}` == this.cod_sui);
            if (busqueda) this.confirmar();
            else this.datoSUI();
          } else {
            this.datoCodigo();
          }
        }
      );
    },

    confirmar() {
      CON851P("01", this.datoSUI, () => {
        if (this.novedad == "8") this.llamarDll();
        else this.llamarDll();
      });
    },

    llamarDll() {
      loader("show");
      let datos = {
        datosh: moduloDatosEnvio(),
        novedad: this.novedad.toString(),
        llave: `${this.clase.toString()}${this.codigo.toString()}`,
        descripcion: this.descripcion.toString(),
        cod_sui: this.cod_sui.toString(),
      };

      postData(datos, get_url("app/SERVDOM/PUB702.DLL"))
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
          this.datoSUI();
        });
    },

    _ventanaMotivos() {
      _ventanaDatos({
        titulo: "Ventana de Motivos de P.Q.R.",
        columnas: ["llave", "descrip"],
        data: this.array_motivos,
        callback_esc: () => {
          document.querySelector(".codigo").focus();
        },
        callback: (data) => {
          this.clase = data.llave.slice(0, 1);
          this.codigo = data.llave.slice(1);
          this.descripcion = data.descrip;
          setTimeout(() => {
            _enterInput(".codigo");
          }, 200);
        },
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
        data: this.array_sui,
        callback_esc: () => {
          document.querySelector(".cod_sui").focus();
        },
        callback: (data) => {
          this.cod_sui = `${data.clase}${data.cod}`;
          setTimeout(() => {
            _enterInput(".cod_sui");
          }, 200);
        },
      });
    },

    traerMotivos() {
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB782.DLL"))
        .then((data) => {
          this.array_motivos = data.DATOS;
          this.traerSUI();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "");
          loader("hide");
          _toggleNav();
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
