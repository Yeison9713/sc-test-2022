// Maestro de usos de tarifas - David.M - 01/06/2021

new Vue({
  el: "#PUB106",
  data: {
    novedad: "",
    codigo: "",
    descripcion: "",
    array_uso_tarif: [],
  },
  created() {
    nombreOpcion("1-6 - Actualización de Usos de Tarifas");
    _inputControl("reset");
    _inputControl("disabled");
    loader("show");
    this.traerUsoTarif();
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
          if (this.codigo.trim()) {
            this.codigo = this.codigo.toUpperCase();
            this.leerSer();
          } else {
            this.datoCodigo();
          }
        }
      );
    },

    leerSer() {
        let busqueda = this.array_uso_tarif.find((e) => e.cod == this.codigo);
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
    },

    datoDescripcion() {
      switch (this.codigo) {
        case "1":
          this.descripcion = "CONEXIONES";
          break;
        case "2":
          this.descripcion = "RECONEXIONES";
          break;
        case "3":
          this.descripcion = "MEDIDORES";
          break;
        case "C":
          this.descripcion = "COMERCIAL";
          break;
      }

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

      postData({ datosh: moduloDatosEnvio() + datos.join("|") + "|" }, get_url("app/SERVDOM/PUB106.DLL"))
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

    _ventanaUsoTarifas() {
      _ventanaDatos({
        titulo: "Ventana de Usos de Tarifas",
        columnas: ["cod", "descrip"],
        data: this.array_uso_tarif,
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

    traerUsoTarif() {
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB806.DLL"))
        .then((data) => {
          this.array_uso_tarif = data.USTAR;
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
