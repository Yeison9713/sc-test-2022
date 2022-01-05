// Maestro servicios domiciliarios P.Q.R. - David.M - 01/06/2021

new Vue({
  el: "#PUB105",
  data: {
    novedad: "",
    codigo: "",
    descripcion: "",
    array_serv: [],
  },
  created() {
    if (localStorage.idOpciondata == "071") {
      nombreOpcion("7-1 - Actualización Servicios para P.Q.R");
    } else {
      nombreOpcion("1-5 - Actualización Servicios Domiciliarios");
    }
    _inputControl("reset");
    _inputControl("disabled");
    loader("show");
    this.traerServicios();
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
          form: "#codigo",
        },
        this._ventanaNovedad,
        () => {
          if (this.codigo.trim() && this.codigo != 0) {
            this.leerServ();
          } else {
            this.datoCodigo();
          }
        }
      );
    },

    leerServ() {
      if ([1, 2, 3, 4, 5, 6].includes(parseInt(this.codigo))) {
        let busqueda = this.array_serv.find((e) => e.cod == this.codigo);
        if (busqueda) this.descripcion = busqueda.descrip;

        switch (this.novedad) {
          case "7":
            if (!busqueda) this.datoDescripcion();
            else this.error("00", this.datoCodigo);
            break;
          case "8":
            if (busqueda) this.datoDescripcion();
            else this.error("01", this.datoCodigo);
            break;
          case "9":
            if (busqueda) {
              CON851P("02", this.datoCodigo, () => {
                this.llamarDll("9");
              });
            } else this.error("01", this.datoCodigo);
            break;
        }
      } else {
        this.error("03", this.datoCodigo);
      }
    },

    datoDescripcion() {
      validarInputs(
        {
          form: "#descripcion",
        },
        this.datoCodigo,
        () => {
          if (this.descripcion.trim()) this.confirmar();
          else this.error("02", this.datoDescripcion);
        }
      );
    },

    confirmar() {
      CON851P("01", this.datoDescripcion, () => {
        if (this.novedad == "8") this.llamarDll("8");
        else this.llamarDll("7");
      });
    },

    llamarDll(novedad) {
      loader("show");
      let datos = [novedad, this.codigo.toString(), this.descripcion.toString()];

      postData({ datosh: moduloDatosEnvio() + datos.join("|") + "|" }, get_url("app/SERVDOM/PUB105.DLL"))
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
          this.datoCodigo();
        });
    },

    error(cod, callback) {
      CON851("", cod, null, "error", "Error");
      callback();
    },

    _ventanaServPQR() {
      _ventanaDatos({
        titulo: "Ventana de Servicios P.Q.R.",
        columnas: ["cod", "descrip"],
        data: this.array_serv,
        callback_esc: () => {
          document.querySelector(".codigo").focus();
        },
        callback: (data) => {
          this.codigo = data.cod;
          this.descripcion = data.descrip;
          setTimeout(() => {
            _enterInput(".codigo");
          }, 200);
        },
      });
    },

    traerServicios() {
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB781.DLL"))
        .then((data) => {
          this.array_serv = data.SERVPQR;
          loader("hide");
          this._ventanaNovedad();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando archivo de servicios", null, "error", "");
          loader("hide");
          _toggleNav();
        });
    },
  },
});
