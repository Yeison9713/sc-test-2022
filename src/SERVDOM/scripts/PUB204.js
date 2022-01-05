const { unirPdfs_dom } = require("../../SERVDOM/scripts/globalDom.js");

new Vue({
  el: "#PUB204",
  data: {
    ano_gen: "",
    mes_gen: "",
    fac_ini: "0",
    fac_fin: "999999",

    array_serv: [],
    array_tarifas: [],
    array_usuar_ser: [],
    array_pdf: [],

    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,
  },
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  created() {
    _this = this;
    nombreOpcion("2-4 - Impresión de facturas");
    _inputControl("reset");
    _inputControl("disabled");
    this.datoFecha();
  },
  methods: {
    datoFecha() {
      validarInputs(
        {
          form: "#fecha_gen",
        },
        _toggleNav,
        () => {
          this.ano_gen = this.ano_gen.padStart(4, "0");
          this.mes_gen = this.mes_gen.padStart(2, "0");
          this.leerArchivo();
        }
      );
    },

    leerArchivo() {
      loader("show");
      postData(
        { datosh: moduloDatosEnvio() + `${this.ano_gen}${this.mes_gen}` + "|1|" },
        get_url("app/SERVDOM/PUB201_02.DLL")
      )
        .then((data) => {
          if (data == 8) {
            this.datoFacIni();
          } else {
            CON851("", "No existe el archivo", null, "error", "");
            this.datoFecha();
          }
          loader("hide");
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          this.datoFecha();
          loader("hide");
        });
    },

    datoFacIni() {
      validarInputs(
        {
          form: "#fac_ini",
        },
        this.datoFecha,
        this.datoFacFin
      );
    },

    datoFacFin() {
      if (!this.fac_fin.trim()) this.fac_fin = "9999999";
      validarInputs(
        {
          form: "#fac_fin",
        },
        this.datoFacIni,
        () => {
          if (parseInt(this.fac_fin) < parseInt(this.fac_ini)) this.datoFacFin();
          else this.traerServicios();
        }
      );
    },

    traerServicios() {
      this.label_loader = `Procesando: Fecha Generación: ${this.ano_gen} - ${this.mes_gen}`;
      this.estado_loader = true;

      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB781.DLL"))
        .then((data) => {
          this.array_serv = data.SERVPQR;
          this.traerTarifas();
        })
        .catch((error) => {
          loader("hide");
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          this.datoFacFin();
        });
    },

    traerTarifas() {
      postData(
        {
          datosh: moduloDatosEnvio(),
        },
        get_url("app/SERVDOM/GET_TARIF.DLL")
      )
        .then((data) => {
          this.array_tarifas = data.TARIFAS;
          this.traerUsuarSer();
        })
        .catch((error) => {
          loader("hide");
          if (!error.STATUS) CON851("", "Error consultando datos", null, "error", "Error");
          this.datoFacFin();
        });
    },

    traerUsuarSer() {
      postData({ datosh: moduloDatosEnvio() + "1" }, get_url("app/SERVDOM/PUB801.DLL"))
        .then((data) => {
          this.array_usuar_ser = data.USDOM;
          loader("hide");
          this.leerCtl();
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          CON851("", "Error consultando datos", null, "error", "");
          this.datoFacFin();
        });
    },

    leerCtl() {
      postData(
        { datosh: moduloDatosEnvio() + `${this.ano_gen}${this.mes_gen}` + "|1|" },
        get_url("app/SERVDOM/PUB201_01.DLL")
      )
        .then((data) => {
          this.reg_ctl = data;
          if (!this.reg_ctl.llave) {
            CON851("", "No se encontro Registro Control", null, "error", "Error");
            this.datoFacFin();
          } else this.leerFacturas();
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          if (!error.STATUS) CON851("", "Error consultando datos", null, "error", "");
          this.datoFacFin();
        });
    },

    async leerFacturas() {
      let _this = this;
      postData(
        {
          datosh: moduloDatosEnvio() + "3|",
          fecha: `${this.ano_gen}${this.mes_gen}`,
          numero_w: this.fac_ini,
          hasta_w: this.fac_fin,
        },
        get_url("app/SERVDOM/PUB203_02.DLL"),
        {
          onProgress: (progress) => {
            _this.progreso = progress;
          },
        }
      )
        .then(async (data) => {
          data = data.REGS;
          data.pop();
          if (data.length < 1) {
            CON851("", "08", null, "warning", "Advertencia");
            this.datoFecha();
          } else {
            this.regs = data;
            this.loader = false;
            this.label_loader = `GENERANDO IMPRESIÓN, POR FAVOR ESPERE...`;
            await this.llamarImpresion();
          }
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          this.datoFacFin();
          this.loader = false;
          this.estado_loader = false;
        });
    },

    async llamarImpresion() {
      return new Promise((resolve, reject) => {
        let variable_emp = "";

        switch (parseInt($_USUARIO_EMPRESA.NIT)) {
          case 800099431:
            variable_emp = false;
            break;
          case 832000605:
            variable_emp = "caruru";
            break;
          default:
            variable_emp = false;
            break;
        }

        this.array_pdf = [];

        let url = variable_emp
          ? `../../frameworks/pdf/servdom/${variable_emp}/PUB205A.formato`
          : "../../frameworks/pdf/servdom/PUB205A.formato";

        const { imprimir_PUB205A } = require(url);

        for (let i in this.regs) {
          imprimir_PUB205A({
            nro_fact_w: "",
            nom_fac_w: `${this.ano_gen}${this.mes_gen}`,
            array_serv: this.array_serv,
            array_usuar_ser: this.array_usuar_ser,
            array_tarifas: this.array_tarifas,
            admin_w: localStorage.Usuario,
            reg_fact: this.regs[i].FACT,
            reg_usuar_ser: this.regs[i].USDOM,
            reg_ctl: this.reg_ctl,
            masiva: true,
            callback: async (data) => {
              this.array_pdf.push(data);
              console.log(data, "data");
              if (i == this.regs.length - 1) {
                await unirPdfs_dom(this.array_pdf);
                this.estado_loader = false;
                this.progreso.completado = true;
                resolve();
                _toggleNav();
              }
            },
            callback_err: _toggleNav,
          });
        }
      });
    },
  },
});
