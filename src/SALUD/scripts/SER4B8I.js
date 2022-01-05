const get_solau = require("../../SALUD/scripts/reg_solau.js");
const { getDatos, consulta } = require("../../frameworks/scripts/getDatos.js");

new Vue({
  el: "#SER4B8I",
  data: {
    reg_solau: get_solau.getObjRegSolau(),
    reg_activ: {},
    reg_num: {},
    reg_tercero: {},
    reg_paci: {},

    ano_ini: "",
    mes_ini: "",
    dia_ini: "",
    ano_fin: "",
    mes_fin: "",
    dia_fin: "",

    seleccion: "",
    ventanaPaci: false,
    array_pdf: [],
  },
  components: {
    ser802c: require("../../SALUD/scripts/SER802C.vue.js"),
    ser810: require("../../SALUD/scripts/SER810.vue.js"),
  },
  async created() {
    nombreOpcion("9-7-4-B-7 - REIMPRESIÓN DE SOLICITUD DE AUTORIZACIONES");
    _inputControl("disabled");

    this.tipoListado();
  },
  methods: {
    async tipoListado() {
      POPUP(
        {
          array: [
            { cod: "1", descrip: "HISTORIAL POR FECHA" },
            { cod: "2", descrip: "SELECCIONAR FACTURA" },
          ],
          titulo: "TIPO DE LISTADO",
          indices: [{ id: "cod", label: "descrip" }],
          seleccion: this.seleccion || "1",
          callback_f: _toggleNav,
        },
        (data) => {
          this.seleccion = data.cod;
          this.datoPaciente();
        }
      );
    },

    datoPaciente() {
      validarInputs(
        {
          form: "#paci",
        },
        this.tipoListado,
        () => {
          this.reg_solau.paci = this.reg_solau.paci.replaceEsp();
          if (!isNaN(this.reg_solau.paci)) this.reg_solau.paci = this.reg_solau.paci.padStart(15, "0");
          else this.reg_solau.paci.padStart(15, "0");

          if (this.reg_solau.paci == 0 || !this.reg_solau.paci.trim()) {
            CON851("", "03", null, "error", "Error");
            this.datoPaciente();
          } else {
            this.consultarPaciente();
          }
        }
      );
    },

    async consultarPaciente() {
      try {
        this.reg_paci = await consulta._paci({ cod_paci: this.reg_solau.paci });

        this.reg_paci.descrip = `${this.reg_paci._1er_nom} ${this.reg_paci._2do_nom} ${this.reg_paci._1er_apel} ${this.reg_paci._2do_apel}`;
        if (this.reg_paci.cod == this.reg_paci.id_cotiz) this.tipo_afil = "COTIZANTE";
        else this.tipo_afil = "BENEFICIARIO";

        if (this.seleccion == 1) this.seleccion1();
        else this.seleccion2();
      } catch {
        this.datoPaciente();
      }
    },

    seleccion1() {
      this.datoAnoIni();
    },

    datoAnoIni() {
      validarInputs(
        {
          form: "#ano_ini",
        },
        this.datoPaciente,
        () => {
          this.datoMesIni();
        }
      );
    },

    datoMesIni() {
      validarInputs(
        {
          form: "#mes_ini",
        },
        this.datoAnoIni,
        () => {
          this.datoDiaIni();
        }
      );
    },

    datoDiaIni() {
      validarInputs(
        {
          form: "#dia_ini",
        },
        this.datoMesIni,
        () => {
          this.ano_ini = this.ano_ini.padStart(4, "0");
          this.mes_ini = this.mes_ini.padStart(2, "0");
          this.dia_ini = this.dia_ini.padStart(2, "0");
          if (_validarFecha(this.ano_ini, this.mes_ini, this.dia_ini)) {
            this.datoAnoFin();
          } else {
            CON851("", "37", null, "error", "Error");
            this.datoAnoIni();
          }
        }
      );
    },

    datoAnoFin() {
      validarInputs(
        {
          form: "#ano_fin",
        },
        this.datoAnoIni,
        () => {
          this.datoMesFin();
        }
      );
    },

    datoMesFin() {
      validarInputs(
        {
          form: "#mes_fin",
        },
        this.datoAnoFin,
        () => {
          this.datoDiaFin();
        }
      );
    },

    datoDiaFin() {
      validarInputs(
        {
          form: "#dia_fin",
        },
        this.datoMesFin,
        () => {
          this.ano_fin = this.ano_fin.padStart(4, "0");
          this.mes_fin = this.mes_fin.padStart(2, "0");
          this.dia_fin = this.dia_fin.padStart(2, "0");
          if (_validarFecha(this.ano_fin, this.mes_fin, this.dia_fin)) {
            this.traerDatos();
          } else {
            CON851("", "37", null, "error", "Error");
            this.datoAnoFin();
          }
        }
      );
    },

    seleccion2() {
      this.traerDatos();
    },

    async traerDatos() {
      try {
        this.array_solau = await getDatos._solau({ llave_fact: this.reg_solau.paci, paso: "3" });
        if (this.seleccion == 1) this.imprimir();
        else this.SER894();
      } catch {
        this.datoAnoFin();
      }
    },

    async SER894() {
      for (let i in this.array_solau) {
        this.array_solau[i].fact_edit = `${this.array_solau[i].fact.prefijo}${this.array_solau[i].fact.nro}`;
      }
      _ventanaDatos({
        titulo: "CONSULTA DE AUTORIZACIONES",
        columnas: ["consecutivo", "fact_edit", "nro_autorizaciones"],
        data: this.array_solau,
        callback_esc: this.datoPaciente,
        callback: (data) => {
          this.reg_solau = JSON.parse(JSON.stringify(data));
          this.array_solau = [];
          this.array_solau.push(this.reg_solau);
          this.imprimir();
        },
      });
    },

    async imprimir() {
      loader("show");
      const { imprimir_SER4B8I } = require("../../frameworks/pdf/salud/SER4B8I.formato");

      for (let i in this.array_solau) {
        imprimir_SER4B8I({
          llave_fact: `${this.array_solau[i].paci}${this.array_solau[i].fact.prefijo}${this.array_solau[i].fact.nro}`,
          consecutivo: this.array_solau[i].consecutivo,
          paci: this.array_solau[i].paci,
          seleccion: this.seleccion,
          fecha_ini: `${this.ano_ini}${this.mes_ini}${this.dia_ini}`,
          fecha_fin: `${this.ano_fin}${this.mes_fin}${this.dia_fin}`,
          callback: () => {
            if (i == this.array_solau.length - 1) {
              CON851("", "Impreso correctamente", null, "success", "Completado");
              loader("hide");
              _toggleNav();
            }
          },
          callback_error: (err) => {
            loader("hide");
            console.error(err);
            CON851("", "Error en impresión", null, "error", "Error");
            this.datoDiaFin();
          },
        });
      }
    },

    _ventanaPaci() {
      _fin_validar_form();
      this.ventanaPaci = true;
    },

    escVentanaPaci() {
      this.ventanaPaci = false;
      this.datoPaciente();
    },

    successVentanaPaci(data) {
      this.ventanaPaci = false;
      this.reg_solau.paci = data.cod;
      this.reg_solau.descrip_paci = data.descrip;
      this.datoPaciente();
    },
  },
});
