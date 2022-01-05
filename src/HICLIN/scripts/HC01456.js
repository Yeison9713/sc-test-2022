const { getDatos } = require("../../frameworks/scripts/getDatos");

new Vue({
  el: "#HC01456",
  data: {
    hcprc: {},
    detalles: {},
    medico: {},
    opc_ing: "",
    opc_audi: "",
    opc_opto: "",
    opc_espi: "",
    opc_psic: "",
    mostrarPsicologia: false,
  },
  created() {
    this.leerDatos();
  },
  methods: {
    ventanaOpciones() {
      if ($_USUA_GLOBAL[0].NIT == 844003225) this.mostrarPsicologia = true;
      this.datoIngreso();
    },
    datoIngreso() {
      validarInputs(
        {
          form: "#opc_ing",
        },
        _regresar_menuhis,
        () => {
          this.opc_ing = this.opc_ing.toUpperCase();
          if (this.opc_ing != "S") this.opc_ing = "N";
          this.datoAudiometria();
        }
      );
    },
    datoAudiometria() {
      validarInputs(
        {
          form: "#opc_audi",
        },
        this.datoIngreso,
        () => {
          this.opc_audi = this.opc_audi.toUpperCase();
          if (this.opc_audi != "S") this.opc_audi = "N";
          this.datoOptometria();
        }
      );
    },
    datoOptometria() {
      validarInputs(
        {
          form: "#opc_opto",
        },
        this.datoAudiometria,
        () => {
          this.opc_opto = this.opc_opto.toUpperCase();
          if (this.opc_opto != "S") this.opc_opto = "N";
          this.datoEspirometria();
        }
      );
    },
    datoEspirometria() {
      validarInputs(
        {
          form: "#opc_espi",
        },
        this.datoOptometria,
        () => {
          this.opc_espi = this.opc_espi.toUpperCase();
          if (this.opc_espi != "S") this.opc_espi = "N";
          if ($_USUA_GLOBAL[0].NIT == 844003225) this.datoPsicologia();
          else this.imprimir();
        }
      );
    },
    datoPsicologia() {
      validarInputs(
        {
          form: "#opc_psic",
        },
        this.datoEspirometria,
        () => {
          this.opc_psic = this.opc_psic.toUpperCase();
          if (this.opc_psic != "S") this.opc_psic = "N";
          this.imprimir();
        }
      );
    },
    async imprimir() {
      if (this.opc_ing == "S") {
        const { imprimir_OCUP010 } = require("../../frameworks/pdf/hiclin/OCUP010.formato");

        loader("show");

        imprimir_OCUP010({
          hcprc: this.hcprc,
          detalles: this.detalles,
          paci: $_REG_PACI,
          callback_error: () => {
            _regresar_menuhis();
          },
          callback: () => {
            loader("hide");
            CON851("", "Impreso correctamente", null, "success", "Completado");
            _regresar_menuhis();
          },
        });
      } else {
        _regresar_menuhis();
      }
    },
    async leerDatos() {
      try {
        loader("show");

        // LEER-HISTORIA
        this.hcprc = await getDatos._historia_new({
          datosh: `${datosEnvio()}${$_REG_HC.llave_hc}|${localStorage["Usuario"].trim()}|1|`,
        });
        await this.validarHistoria();

        // LEER-DETALLE
        this.detalles = await getDatos._detalles({ datosh: datosEnvio() + this.hcprc.llave + "|**|||" });
        this.dato_9520 = this.detalles.find((e) => e["COD-DETHC"] == "9520" && e["LLAVE-HC"] == this.hcprc.llave);

        // LEER-MEDICO
        await this.consultarProf({
          datosh: datosEnvio(),
          paso: "1",
          codigo: cerosIzq(this.hcprc.med.trim(), 10),
        });

        loader("hide");
        this.ventanaOpciones();
      } catch (err) {
        loader("hide");
        console.error(err);
        if (err != "omitir") CON851("", "Error consultando datos", null, "error", "Error");
        _regresar_menuhis();
      }
    },

    consultarProf(datos_envio) {
      return new Promise((resolve, reject) => {
        datos_envio = datos_envio || { datosh: datosEnvio() };
        postData(datos_envio, get_url("APP/SALUD/SER819.DLL"))
          .then((data) => {
            if (!datos_envio.paso) {
              data = data.ARCHPROF;
              data.pop();
            }
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    validarHistoria() {
      return new Promise((resolve, reject) => {
        if (!this.hcprc.llave) {
          CON851("01", "01", null, "error", "error");
          reject("omitir");
        } else resolve();
      });
    },
  },
});
