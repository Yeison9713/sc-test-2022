// Maestro Punto Pago - Kaleth.v - 03/06/2021

new Vue({
  el: "#PUB107",
  data: {
    novedad: "",
    codigo: "",
    descripcion: "",
    cta_contable: "",
    array_punto_pago: [],
    array_plan_cuenta: [],
  },
  created() {
    nombreOpcion("1-8 - Configurar Puntos de Recaudo");
    _inputControl("reset");
    _inputControl("disabled");
    loader("show");
    this.cargarDll()
  },
  methods: {
    async cargarDll(){
      try {
        await this.traerPlandeCuentas();
        await this.traerPuntoPago();
      } catch (err) {
        console.log('error -> ', err);
      }

    },
    _ventanaNovedad() {
      CON850(
        (data) => {
          this.novedad = data.id;
          if(this.novedad == "F") _toggleNav();
          else this.datoPago();
        }
      )
    },

    datoPago() {
      validarInputs(
        {
          form: "#codigo",
          orden: "1",
        },
        this._ventanaNovedad,
        () => {
          if (this.codigo.trim() && this.codigo != 0) {
            this.leerActividad();
          } else {
            this.datoPago();
          }
        }
      );
    },

    leerActividad() {
      let busqueda = this.array_punto_pago.find((e) => e.cod == this.codigo);
      if (busqueda) this.descripcion = busqueda.descrip;

      switch (this.novedad) {
        case "7":
          if (!busqueda) this.datoNombrePago();
          else this.error("00", this.datoPago);
          break;
        case "8":
          if (busqueda) this.datoNombrePago();
          else this.error("01", this.datoPago);
          break;
        case "9":
          if (busqueda) {
            CON851P("02", this.datoPago, () => {
              this.llamarDll("9");
            });
          } else this.error("01", this.datoPago);
          break;
      }
    },

    datoNombrePago() {
      validarInputs(
        {
          form: "#descripcion",
          orden: "1",
        },
        this.datoPago,
        () => {
          if (this.descripcion.trim()) {
            this.datoCuentaContable();
          } else {
            this.datoNombrePago();
          }
        }
      );
    },
    
    datoCuentaContable(){
      validarInputs(
        {
          form: "#cta_contable",
          orden: "1",
        },
        this.datoNombrePago,
        () => {
          if (this.codigo.trim() && this.codigo != 0) {
            this.confirmar();
          } else {
            CON851("", "02", null, "error", "Error");
            datoCuentaContable();
          }

        }
      );
    },
    confirmar() {
      CON851P("01", this.datoNombrePago, () => {
        if (this.novedad == "8") this.llamarDll("8");
        else this.llamarDll("7");
      });
    },

    llamarDll(novedad) {
      loader("show");
      let datos = [
        novedad,
        this.codigo.toString(),
        this.descripcion.toString(),
        this.cta_contable.toString(),
      ];

      postData(
        { datosh: moduloDatosEnvio() + datos.join("|") + "|" },
        get_url("app/SERVDOM/PUB107.DLL")
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
          this.datoPago();
        });
    },

    error(cod, callback) {
      CON851("", cod, null, "error", "Error");
      callback();
    },

    _ventanaPuntoPago() {
      _ventanaDatos({
        titulo: "Ventana Punto de Pago",
        columnas: ["cod", "descrip", "cta_contable"],
        data: this.array_punto_pago,
        callback_esc: () => {
          document.querySelector(".codigo").focus();
        },
        callback: (data) => {
          this.codigo = data.cod;
          this.descripcion = data.descrip;
          this.cta_contable = data.cta_contable
          setTimeout(() => {
            _enterInput(".codigo");
          }, 200);
        },
      });
    },
    _ventanaPlanCuenta() {
      _ventanaDatos({
        titulo: "Ventana Plan de Cuentas",
        columnas: ["LLAVE_MAE", "TIPO_MAE", "NOMBRE_MAE"],
        data: this.array_plan_cuenta,
        callback_esc: () => {
          document.querySelector(".cta_contable").focus();
        },
        callback: (data) => {
          this.cta_contable = `${data.CTA_MAY}${data.SUB_CTA}${data.AUX_MAE}`
          setTimeout(() => {
            _enterInput(".cta_contable");
          }, 200);
        },
      });
    },

    traerPuntoPago() {
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB807.DLL"))
        .then((data) => {
          this.array_punto_pago = data.PUNTO_PAGO;
          loader("hide");
          this._ventanaNovedad();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando archivo de punto de pago", null, "error", "");
          loader("hide");
          _toggleNav();
        });
    },
    traerPlandeCuentas(){
      postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON801.DLL"))
        .then((data) => {
          this.array_plan_cuenta = data.MAESTROS.filter((e) => parseInt(e.CTA_MAY) > 1100);
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando archivo Maestros", null, "error", "");
          loader("hide");
          _toggleNav();
        });
    },
  },
});
