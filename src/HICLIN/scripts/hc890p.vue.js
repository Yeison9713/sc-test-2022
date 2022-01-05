var component_hc890p = Vue.component("content_hc890p", {
  props: {
    params: {
      estado: false,
      llave_evo: null,
      cronico: null,
      nit: null,
    },
  },
  data: () => {
    return {
      imprimir_semestral: "N",
      datos: {},
      data_diagn: ["Z300", "Z304"],
    };
  },
  watch: {
    "params.estado": function (estado) {
      if (estado) this._validarEvolucion();
    },
  },
  methods: {
    _validarEvolucion() {
      loader("show");
      let hc890p = this;
      let datosh = datosEnvio() + this.params.llave_evo + "|2|";
      postData({ datosh }, get_url("APP/HICLIN/HC002F.DLL"))
        .then((data) => {
          loader("hide");
          hc890p.datos = data;
          hc890p._validarFormulacion();
        })
        .catch((err) => {
          console.error(err);
          loader("hide");
          hc890p._terminar();
        });
    },
    _validarFormulacion() {
      let _this = this;

      this._validarPeriodoFormu()
        .then((sw_o) => {
          if (sw_o == "S") {
            _this._FormulacionTrimestral();
          } else _this._terminar();
        })
        .catch((error) => {
          _this._terminar();
        });
    },
    _FormulacionTrimestral() {
      let _this = this,
        datosh =
          datosEnvio() +
          this.params.llave_evo +
          "|" +
          _this.imprimir_semestral +
          "|";

      loader("show");
      postData({ datosh }, get_url("APP/HICLIN/HC890P.DLL"))
        .then((fechas) => {
          _this._terminar(fechas);
          loader("hide");
        })
        .catch((err) => {
          console.log(err);
          _this._terminar();
          loader("hide");
        });
    },
    async _validarPeriodoFormu() {
      let _this = this;
      return new Promise((resolve, reject) => {
        if (
          _this.datos.sw_drog == "1" &&
          (_this.datos.unserv == 08 ||
            _this.datos.unserv == 63 ||
            _this.datos.unserv == 64 ||
            (_this.datos.unserv == 02 && _this.params.cronico == "S") ||
            (_this.datos.unserv == 02 && _this.params.nit == 892000264))
        ) {
          if (
            _this.params.nit == 844003225 &&
            _this.datos.unserv == 08 &&
            _this.datos.finalidad == 06
          ) {
            reject();
          } else {
            if (_this.datos.unserv == 08 && _this.datos.finalidad == 03) {
              _this.imprimir_semestral = "S";
              CON851P(
                "56",
                () => {
                  resolve("N");
                },
                () => {
                  resolve("S");
                }
              );
            } else {
              _this
                ._busquedad_diagn()
                .then((r) => {
                  _this.imprimir_semestral = "S";
                  CON851P(
                    "56",
                    () => {
                      resolve("N");
                    },
                    () => {
                      resolve("S");
                    }
                  );
                })
                .catch((err) => {
                  _this.imprimir_semestral = "N";
                  CON851P(
                    "42",
                    () => {
                      resolve("N");
                    },
                    () => {
                      resolve("S");
                    }
                  );
                });
            }
          }
        } else reject();
      });
    },
    _busquedad_diagn() {
      let {
          datos: { unserv, tabla },
          data_diagn,
        } = this,
        retornar = false;

      return new Promise((resolve, reject) => {
        for (var i in data_diagn) {
          let diagn = tabla.find((a) => a.diagn == data_diagn[i]);
          if (diagn) {
            retornar = diagn;
            break;
          }
        }

        if ((unserv == 63 || unserv == 64) && retornar) resolve(retornar);
        else reject(retornar);
      });
    },
    _terminar(fechas) {
      this.params.estado = false;
      this.params.finalidad = null;
      this.$emit("callback", fechas);
    },
  },
  template: `<div class="hidden"> Componete de valoracion trimestral / semestral</div>`,
});
