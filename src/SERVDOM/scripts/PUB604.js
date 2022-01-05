const { regs_dom } = require("../../SERVDOM/scripts/regs_dom.js");
const {
  mascara_valor,
  format_op,
  _ventana_PUB801,
  _editFecha2,
  _ventana_PUB813,
} = require("../../SERVDOM/scripts/globalDom.js");

var _this = new Vue({
  el: "#PUB604",
  data: {
    params_CLAVE: {
      estado: false,
    },
    mostrar_CLAVE: false,

    fecha_vence_edit: "",
    reg_ctl: regs_dom.CONTROL(),
    total_recaud: "",
    reg_pago: regs_dom.REG_PAGO(),
    reg_abo: regs_dom.ABONOS(),
    reg_fact: regs_dom.FACT(),

    fecha_act: moment().format("YYYYMMDD"),
    fecha_limite: "",

    indice_i: 0,
    indice_j: 0,
    indice_k: 0,

    variables_bar: {
      usu_bar_w: "",
      vlr_bar_w: "",
      fac_bar_w: "",
    },

    cod_barras: "",
    abono_w: "",
    mostrar_cod_barras: false,
    mostrar_abo: false,
    item: 1,

    reg_act: {
      nro_fac: "",
      vlr_fac: "",
      vlr_ser: [{ vlr: "" }, { vlr: "" }, { vlr: "" }, { vlr: "" }, { vlr: "" }, { vlr: "" }],
    },

    tot_reng: {
      tot_fac_r: 0,
      tot_ser_r: 0,
      vlr_ser_r: [{ vlr: 0 }, { vlr: 0 }, { vlr: 0 }, { vlr: 0 }, { vlr: 0 }, { vlr: 0 }],
    },

    tot_gen: {
      tot_nro: 0,
      tot_fac_t: 0,
      vlr_ser_t: [{ vlr: 0 }, { vlr: 0 }, { vlr: 0 }, { vlr: 0 }, { vlr: 0 }, { vlr: 0 }],
      gran_tot: 0,
      sw_dup: 0,
    },

    factor_w: 0,
    diferencia_w: 0,

    array_serv: [],
    array_puntos: [],
  },
  computed: {
    descripciones() {
      let servicios = {};
      for (let i = 1; i <= 6; i++) {
        let busqueda = this.array_serv.find((e) => e.cod == i);
        if (busqueda) {
          busqueda = JSON.parse(JSON.stringify(busqueda));
          busqueda.descrip = busqueda.descrip.split(" ");
        }

        servicios[`serv${i}`] = busqueda ? busqueda.descrip[0] : i.toString();
      }
      return servicios;
    },
    descrip_punto() {
      let busqueda = this.array_puntos.find((e) => e.cod == this.reg_pago.cod);
      return busqueda ? busqueda.descrip : "";
    },
  },
  components: {
    clave: require("../../SERVDOM/scripts/clave.vue"),
  },
  created() {
    nombreOpcion("6-4 - Corrección Pago en Bancos");
    _inputControl("reset");
    _inputControl("disabled");
    this.datoClave();
  },
  methods: {
    datoClave() {
      this.mostrar_CLAVE = true;
      setTimeout(() => {
        this.params_CLAVE.estado = true;
      }, 300);
    },

    callback_clave() {
      this.params_CLAVE.estado = false;
      this.mostrar_CLAVE = false;
      loader("show");
      this.traerServicios();
    },

    esc_clave() {
      this.params_CLAVE.estado = false;
      this.mostrar_CLAVE = false;
      _toggleNav();
    },

    iniciar() {
      loader("hide");
      this.iniciarFecha();
    },

    iniciarFecha() {
      this.reg_pago.ano = this.fecha_act.slice(0, 4);
      this.reg_pago.mes = this.fecha_act.slice(4, 6);
      this.reg_pago.dia = this.fecha_act.slice(6);
      this.fecha_limite = this.fecha_act;
      this.datoFecha();
    },

    datoFecha() {
      validarInputs(
        {
          form: "#fecha_pago",
        },
        _toggleNav,
        () => {
          this.reg_pago.ano = this.reg_pago.ano.padStart(4, "0");
          this.reg_pago.mes = this.reg_pago.mes.padStart(2, "0");
          this.reg_pago.dia = this.reg_pago.dia.padStart(2, "0");
          this.fecha_pago = `${this.reg_pago.ano}${this.reg_pago.mes}${this.reg_pago.dia}`;

          if (this.reg_pago.mes < 1 || this.reg_pago.mes > 12) {
            CON851("", "37", null, "error", "Error");
            this.datoFecha();
          } else if (this.reg_pago.dia < 1 || this.reg_pago.dia > 31) {
            CON851("", "37", null, "error", "Error");
            this.datoFecha();
          } else {
            setTimeout(() => {
              this.datoOficina();
            }, 200);
          }
        }
      );
    },

    datoOficina() {
      _fin_validar_form();

      let fecha_w = `000000${this.fecha_pago}`;

      _ventana_PUB813(fecha_w, this.datoFecha).then((data) => {
        this.reg_pago.ano = data.fecha_pag.slice(0, 4);
        this.reg_pago.mes = data.fecha_pag.slice(4, 6);
        this.reg_pago.dia = data.fecha_pag.slice(6);
        this.reg_pago.cod = data.cta;
        this.reg_pago.secu = data.secu;
        this.reg_pago.ano_gen = data.fecha_gen.slice(0, 4);
        this.reg_pago.mes_gen = data.fecha_gen.slice(4);

        this.consultarPago();
      });
    },

    consultarPago() {
      let llave_pago = `${this.reg_pago.ano_gen}${this.reg_pago.mes_gen}${this.reg_pago.ano}${this.reg_pago.mes}${this.reg_pago.dia}${this.reg_pago.cod}${this.reg_pago.secu}`;
      postData({ datosh: moduloDatosEnvio() + llave_pago + "|1|" }, get_url("app/SERVDOM/PUB601_01.DLL"))
        .then((data) => {
          this.reg_pago = Object.assign({}, data);
          this.leerRecaudo();
        })
        .catch((error) => {
          loader("hide");
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          this.datoFecha();
        });
    },

    leerRecaudo() {
      let busqueda = this.array_puntos.find((e) => e.cod == this.reg_pago.cod);
      if (!busqueda) {
        CON851("", "ERROR, NO EXISTE PUNTO RECAUDO!", null, "error", "Error");
        _toggleNav();
      } else {
        this.abrirControl();
      }
    },

    abrirControl() {
      postData(
        { datosh: moduloDatosEnvio() + `${this.reg_pago.ano_gen}${this.reg_pago.mes_gen}` + "|1|" },
        get_url("app/SERVDOM/PUB201_01.DLL")
      )
        .then((data) => {
          if (data.llave && data.llave != 0) {
            this.reg_ctl = data;
            this.fecha_vence_edit = _editFecha2(this.reg_ctl.fecha_vence);

            if (parseInt(this.fecha_pago) > parseInt(this.reg_ctl.fecha_vence)) {
              this.reg_pago.recargo = "S";
            } else {
              this.reg_pago.recargo = "N";
              this.reg_ctl.recargo = "";
            }

            this.datoArchivo();
          } else {
            CON851("", "ERROR, NO EXISTE CONTROL FACT.!", null, "error", "Error");
            _toggleNav();
          }
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          this.datoFecha();
        });
    },

    datoArchivo() {
      postData(
        { datosh: moduloDatosEnvio() + `${this.reg_pago.ano_gen}${this.reg_pago.mes_gen}` + "|1|" },
        get_url("app/SERVDOM/PUB201_02.DLL")
      )
        .then((data) => {
          loader("hide");
          if (data == 8) {
            this.datoInicio();
          } else {
            CON851("", "No existe el archivo", null, "error", "");
            _toggleNav();
          }
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          _toggleNav();
        });
    },

    async datoInicio() {
      this.sw_cambio = 0;
      await this.totalPago();
      this.indice_i = this.indice_k = 0;
      await this.mostrarTabla();

      this.datoRefer();
    },

    datoRefer() {
      validarInputs(
        {
          form: "#refer",
        },
        this.datoFecha,
        () => {
          this.reg_pago.refer = this.reg_pago.refer.toUpperCase();
          this.dato1();
        }
      );
    },

    async dato1() {
      if (this.indice_i < 0) this.indice_i = 0;
      if (this.indice_i > 249) this.indice_i = 249;

      if (this.indice_i < 24) this.indice_k = 0;
      else this.indice_k = parseInt(this.indice_i) - 20;

      await this.mostrarTabla();
      this.datoItem();
    },

    datoItem() {
      validarInputs(
        {
          form: "#item",
          event_f3: this.grabar,
          event_f5: () => {
            this.devolver("f5");
          },
        },
        () => {
          this.devolver("esc");
        },
        () => {
          if (this.item >= 1 && this.item <= 250) {
            this.indice_i = parseInt(this.item) - 1;
            this.reg_act = JSON.parse(JSON.stringify(this.reg_pago.datos_tab[this.indice_i]));
            this.datoFact();
          } else {
            this.datoItem();
          }
        }
      );
    },

    datoFact() {
      validarInputs(
        {
          form: "#fact",
          event_f3: this.grabar,
          event_f5: () => {
            this.devolver("f5");
          },
        },
        () => {
          this.devolver("esc");
        },
        async () => {
          this.reg_act.nro_fac = this.reg_act.nro_fac.padStart(9, "0");

          if (
            format_op(this.reg_act.nro_fac) > 0 &&
            format_op(this.reg_pago.datos_tab[this.indice_i].nro_fac) > 0 &&
            format_op(this.reg_act.nro_fac) != format_op(this.reg_pago.datos_tab[this.indice_i].nro_fac)
          ) {
            CON851("", "47", null, "error", "Error");
            this.dato1();
          } else {
            if (this.reg_act.nro_fac == 0) {
              if (format_op(this.reg_pago.datos_tab[this.indice_i].nro_fac) > 0) {
                await this.llamar_PUB604A();
                this.sw_cambio = 1;
              }
              this.inicializarRegPagos();
              await this.mostrarRenglon();
              await this.totalPago();
            }
            this.reg_pago.datos_tab[this.indice_i].nro_fac = JSON.parse(JSON.stringify(this.reg_act.nro_fac));

            this.leerFact();
          }
        }
      );
    },

    leerFact() {
      postData(
        {
          datosh: moduloDatosEnvio() + "1|",
          fecha: `${this.reg_pago.ano_gen}${this.reg_pago.mes_gen}`,
          nro_fac: format_op(this.reg_pago.datos_tab[this.indice_i].nro_fac).toString(),
        },
        get_url("app/SERVDOM/PUB203_02.DLL")
      )
        .then(async (data) => {
          this.reg_fact = Object.assign({}, data);
          loader("hide");

          if (data.llave == 0) data.llave = "";

          if (!data.llave.trim()) {
            CON851("", "01", null, "error", "Error");
            this.inicializarRegPagos(this.indice_i);
            this.datoItem();
          } else {
            //   inicializar TOT-RENG
            this.tot_reng.tot_fac_r = this.tot_reng.tot_ser_r = 0;
            this.tot_reng.vlr_ser_r = [{ vlr: 0 }, { vlr: 0 }, { vlr: 0 }, { vlr: 0 }, { vlr: 0 }, { vlr: 0 }];

            await this.sumarFact();
            await this.sumarAbo();

            if (this.tot_reng.tot_fac_r <= 0) CON851("", "07", null, "error", "Error");

            this.buscarRepetido();
          }
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          CON851("", "Error consultando datos", null, "error", "Error");
          _toggleNav();
        });
    },

    async llamar_PUB604A() {
      let llave_pago = `${this.reg_pago.ano_gen}${this.reg_pago.mes_gen}${this.reg_pago.ano}${this.reg_pago.mes}${this.reg_pago.dia}${this.reg_pago.cod}${this.reg_pago.secu}`;
      let nro_fact = format_op(this.reg_act.nro_fac).toString().padStart(9, "0");

      await postData(
        { datosh: moduloDatosEnvio() + llave_pago + "|" + nro_fact + "|" },
        get_url("app/SERVDOM/PUB604A.DLL")
      )
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          loader("hide");
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
        });
    },

    async leerArchivoAbonos() {
      loader("show");

      postData(
        {
          datosh: moduloDatosEnvio() + "3|",
          dia_abo: this.nro_fac_tem.slice(2, 4),
          fact_abo: this.nro_fac_tem.slice(4),
        },
        get_url("app/SERVDOM/PUB206_01.DLL")
      )
        .then((data) => {
          loader("hide");
          if (!data.fact) {
            CON851("", "08", null, "error", "Error");
            this.datoFact();
          } else {
            this.reg_abo = Object.assign({}, data);
            this.reg_act.nro_fac = this.reg_abo.fact;

            this.reg_pago.datos_tab[this.indice_i].nro_fac = JSON.parse(JSON.stringify(this.reg_abo.fact));
            this.reg_pago.datos_tab[this.indice_i].vlr_fac =
              format_op(this.reg_abo.tabla.vlr_abo) - format_op(this.reg_abo.tabla.recargo);

            this.reg_pago.datos_tab[this.indice_i].vlr_ser[0].vlr = this.reg_abo.tabla.vlr_ser[0].vlr;
            this.reg_pago.datos_tab[this.indice_i].vlr_ser[1].vlr = this.reg_abo.tabla.vlr_ser[1].vlr;
            this.reg_pago.datos_tab[this.indice_i].vlr_ser[2].vlr = this.reg_abo.tabla.vlr_ser[2].vlr;
            this.reg_pago.datos_tab[this.indice_i].vlr_ser[3].vlr = this.reg_abo.tabla.vlr_ser[3].vlr;
            this.reg_pago.datos_tab[this.indice_i].vlr_ser[4].vlr = this.reg_abo.tabla.vlr_ser[4].vlr;
            this.reg_pago.datos_tab[this.indice_i].vlr_ser[5].vlr = this.reg_abo.tabla.vlr_ser[5].vlr;

            // this.evaluarFact();
            // this.nro_fac = JSON.parse(JSON.stringify(this.reg_act.nro_fac_tem.slice(4)));
            this.buscarRepetido();
          }
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          CON851("", "Error consultando datos", null, "error", "Error");
          this.datoFact();
        });
    },

    async buscarRepetido() {
      this.tot_gen.sw_dup = 0;

      await this.leerTabla();

      if (this.tot_gen.sw_dup == 0) {
        if (this.reg_pago.datos_tab[this.indice_i].vlr_fac == 0) {
          this.reg_pago.datos_tab[this.indice_i].vlr_fac = this.tot_reng.tot_fac_r;
          this.reg_pago.datos_tab[this.indice_i].vlr_ser[0].vlr = this.tot_reng.vlr_ser_r[0].vlr;
          this.reg_pago.datos_tab[this.indice_i].vlr_ser[1].vlr = this.tot_reng.vlr_ser_r[1].vlr;
          this.reg_pago.datos_tab[this.indice_i].vlr_ser[2].vlr = this.tot_reng.vlr_ser_r[2].vlr;
          this.reg_pago.datos_tab[this.indice_i].vlr_ser[3].vlr = this.tot_reng.vlr_ser_r[3].vlr;
          this.reg_pago.datos_tab[this.indice_i].vlr_ser[4].vlr = this.tot_reng.vlr_ser_r[4].vlr;
          this.reg_pago.datos_tab[this.indice_i].vlr_ser[5].vlr = this.tot_reng.vlr_ser_r[5].vlr;
        }
        await this.mostrarRenglon();
        this.confirmarAbono();
      } else {
        CON851("", "05", null, "error", "Error");
        this.datoItem();
      }
    },

    confirmarAbono() {
      this.mostrar_abo = true;
      validarInputs(
        {
          form: "#abono_w",
          event_f1: () => {
            this.mostrar_abo = false;
            this.datoAbono();
          },
        },
        () => {
          this.mostrar_abo = false;
          this.datoItem();
        },
        () => {
          this.abono_w = this.abono_w.toUpperCase();
          this.mostrar_abo = false;
          if (this.abono_w == "S" || this.abono_w == "A") {
            this.datoAbono();
          } else {
            this.totalPago(true);
          }
        }
      );
    },

    async totalPago(callback) {
      // inicializar variables tot_gen
      this.tot_gen.tot_nro = this.tot_gen.tot_fac_t = this.tot_gen.gran_tot = this.sw_dup = 0;
      this.tot_gen.vlr_ser_t = [{ vlr: 0 }, { vlr: 0 }, { vlr: 0 }, { vlr: 0 }, { vlr: 0 }, { vlr: 0 }];

      await this.sumarPagos();

      this.reg_pago.acum_rec = Math.round(format_op(this.tot_gen.tot_nro) * format_op(this.reg_ctl.recargo));

      this.tot_gen.tot_fac_t = mascara_valor.resolve(format_op(this.tot_gen.tot_fac_t).toString());
      this.tot_gen.vlr_ser_t[0].vlr = mascara_valor.resolve(format_op(this.tot_gen.vlr_ser_t[0].vlr).toString());
      this.tot_gen.vlr_ser_t[1].vlr = mascara_valor.resolve(format_op(this.tot_gen.vlr_ser_t[1].vlr).toString());
      this.tot_gen.vlr_ser_t[2].vlr = mascara_valor.resolve(format_op(this.tot_gen.vlr_ser_t[2].vlr).toString());
      this.tot_gen.vlr_ser_t[3].vlr = mascara_valor.resolve(format_op(this.tot_gen.vlr_ser_t[3].vlr).toString());
      this.tot_gen.vlr_ser_t[4].vlr = mascara_valor.resolve(format_op(this.tot_gen.vlr_ser_t[4].vlr).toString());
      this.tot_gen.vlr_ser_t[5].vlr = mascara_valor.resolve(format_op(this.tot_gen.vlr_ser_t[5].vlr).toString());

      this.reg_pago.acum_rec = mascara_valor.resolve(format_op(this.reg_pago.acum_rec).toString());

      this.tot_gen.gran_tot = format_op(this.reg_pago.acum_rec) + format_op(this.tot_gen.tot_fac_t);
      this.tot_gen.gran_tot = mascara_valor.resolve(format_op(this.tot_gen.gran_tot).toString());

      if (callback) this.otroItem();
    },

    otroItem() {
      this.indice_i = parseInt(this.indice_i) + 1;
      this.item = (parseInt(this.indice_i) + 1).toString();
      this.dato1();
    },

    datoAbono() {
      validarInputs(
        {
          form: "#vlr_fac",
        },
        () => {
          this.reg_pago.datos_tab[this.indice_i].vlr_fac = this.tot_reng.tot_fac_r;
          this.datoItem();
        },
        async () => {
          this.reg_pago.datos_tab[this.indice_i].vlr_fac = JSON.parse(JSON.stringify(this.reg_act.vlr_fac));
          this.reg_act.vlr_fac = mascara_valor.resolve(format_op(this.reg_act.vlr_fac).toString());
          if (this.reg_pago.datos_tab[this.indice_i].vlr_fac > this.tot_reng.tot_fac_r)
            CON851("", "07", null, "error", "Error");

          this.reg_pago.datos_tab[this.indice_i].vlr_fac = mascara_valor.resolve(
            format_op(this.reg_pago.datos_tab[this.indice_i].vlr_fac).toString()
          );

          this.factor_w =
            format_op(this.reg_pago.datos_tab[this.indice_i].vlr_fac) / format_op(this.tot_reng.tot_fac_r);

          this.reg_pago.datos_tab[this.indice_i].vlr_ser[0].vlr = Math.round(
            format_op(this.tot_reng.vlr_ser_r[0].vlr) * format_op(this.factor_w)
          );

          this.reg_pago.datos_tab[this.indice_i].vlr_ser[1].vlr = Math.round(
            format_op(this.tot_reng.vlr_ser_r[1].vlr) * format_op(this.factor_w)
          );

          this.reg_pago.datos_tab[this.indice_i].vlr_ser[2].vlr = Math.round(
            format_op(this.tot_reng.vlr_ser_r[2].vlr) * format_op(this.factor_w)
          );

          this.reg_pago.datos_tab[this.indice_i].vlr_ser[3].vlr = Math.round(
            format_op(this.tot_reng.vlr_ser_r[3].vlr) * format_op(this.factor_w)
          );

          this.reg_pago.datos_tab[this.indice_i].vlr_ser[4].vlr = Math.round(
            format_op(this.tot_reng.vlr_ser_r[4].vlr) * format_op(this.factor_w)
          );

          this.reg_pago.datos_tab[this.indice_i].vlr_ser[5].vlr = Math.round(
            format_op(this.tot_reng.vlr_ser_r[5].vlr) * format_op(this.factor_w)
          );

          this.diferencia_w =
            format_op(this.reg_pago.datos_tab[this.indice_i].vlr_fac) -
            format_op(this.reg_pago.datos_tab[this.indice_i].vlr_ser[0].vlr) -
            format_op(this.reg_pago.datos_tab[this.indice_i].vlr_ser[1].vlr) -
            format_op(this.reg_pago.datos_tab[this.indice_i].vlr_ser[2].vlr) -
            format_op(this.reg_pago.datos_tab[this.indice_i].vlr_ser[3].vlr) -
            format_op(this.reg_pago.datos_tab[this.indice_i].vlr_ser[4].vlr) -
            format_op(this.reg_pago.datos_tab[this.indice_i].vlr_ser[5].vlr);

          if (this.diferencia_w != 0) {
            // this.diferencia_w = format_op(this.diferencia_w) * -1;
            if (format_op(this.reg_pago.datos_tab[this.indice_i].vlr_ser[0].vlr) > 0) {
              this.reg_pago.datos_tab[this.indice_i].vlr_ser[0].vlr =
                format_op(this.reg_pago.datos_tab[this.indice_i].vlr_ser[0].vlr) + format_op(this.diferencia_w);
            } else if (format_op(this.reg_pago.datos_tab[this.indice_i].vlr_ser[1].vlr) > 0) {
              this.reg_pago.datos_tab[this.indice_i].vlr_ser[1].vlr =
                format_op(this.reg_pago.datos_tab[this.indice_i].vlr_ser[1].vlr) + format_op(this.diferencia_w);
            } else if (format_op(this.reg_pago.datos_tab[this.indice_i].vlr_ser[2].vlr) > 0) {
              this.reg_pago.datos_tab[this.indice_i].vlr_ser[2].vlr =
                format_op(this.reg_pago.datos_tab[this.indice_i].vlr_ser[2].vlr) + format_op(this.diferencia_w);
            } else if (format_op(this.reg_pago.datos_tab[this.indice_i].vlr_ser[3].vlr) > 0) {
              this.reg_pago.datos_tab[this.indice_i].vlr_ser[3].vlr =
                format_op(this.reg_pago.datos_tab[this.indice_i].vlr_ser[3].vlr) + format_op(this.diferencia_w);
            } else if (format_op(this.reg_pago.datos_tab[this.indice_i].vlr_ser[4].vlr) > 0) {
              this.reg_pago.datos_tab[this.indice_i].vlr_ser[4].vlr =
                format_op(this.reg_pago.datos_tab[this.indice_i].vlr_ser[4].vlr) + format_op(this.diferencia_w);
            } else if (format_op(this.reg_pago.datos_tab[this.indice_i].vlr_ser[5].vlr) > 0) {
              this.reg_pago.datos_tab[this.indice_i].vlr_ser[5].vlr =
                format_op(this.reg_pago.datos_tab[this.indice_i].vlr_ser[5].vlr) + format_op(this.diferencia_w);
            }
          }
          await this.mostrarRenglon();

          this.indice_j = 0;
          this.datoServicio();
        }
      );
    },

    datoServicio() {
      if (this.indice_j < 0) {
        this.indice_j = 0;
        this.datoAbono();
      } else if (this.indice_j > 5) {
        this.indice_j = 5;
        this.finDatoServicio();
      } else {
        validarInputs(
          {
            form: `#serv${this.indice_j}`,
          },
          () => {
            if (this.indice_j == 0) {
              this.tot_reng.vlr_ser_r[this.indice_j].vlr =
                this.reg_pago.datos_tab[this.indice_i].vlr_ser[this.indice_j].vlr;
              this.datoAbono();
            } else {
              this.indice_j = parseInt(this.indice_j) - 1;
              this.datoServicio();
            }
          },
          () => {
            this.reg_pago.datos_tab[this.indice_i].vlr_ser[this.indice_j].vlr = JSON.parse(
              JSON.stringify(this.reg_act.vlr_ser[this.indice_j].vlr)
            );

            this.reg_act.vlr_ser[this.indice_j].vlr = mascara_valor.resolve(
              format_op(this.reg_act.vlr_ser[this.indice_j].vlr).toString()
            );

            if (
              format_op(this.reg_pago.datos_tab[this.indice_i].vlr_ser[this.indice_j].vlr) >
              format_op(this.tot_reng.vlr_ser_r[this.indice_j].vlr)
            ) {
              CON851("", "07", null, "error", "Error");
            }

            this.reg_pago.datos_tab[this.indice_i].vlr_ser[this.indice_j].vlr = mascara_valor.resolve(
              format_op(this.reg_pago.datos_tab[this.indice_i].vlr_ser[this.indice_j].vlr).toString()
            );

            this.indice_j = parseInt(this.indice_j) + 1;
            this.datoServicio();
          }
        );
      }
    },

    finDatoServicio() {
      let sub_tot_serv_w =
        format_op(this.reg_pago.datos_tab[this.indice_i].vlr_ser[0].vlr) +
        format_op(this.reg_pago.datos_tab[this.indice_i].vlr_ser[1].vlr) +
        format_op(this.reg_pago.datos_tab[this.indice_i].vlr_ser[2].vlr) +
        format_op(this.reg_pago.datos_tab[this.indice_i].vlr_ser[3].vlr) +
        format_op(this.reg_pago.datos_tab[this.indice_i].vlr_ser[4].vlr) +
        format_op(this.reg_pago.datos_tab[this.indice_i].vlr_ser[5].vlr);

      let descuadre_w = format_op(this.reg_pago.datos_tab[this.indice_i].vlr_fac) - format_op(sub_tot_serv_w);

      if (format_op(descuadre_w) > 0 || format_op(descuadre_w) < 0) {
        CON851("", `DESCUADRE: ${descuadre_w}`, null, "warning", "");
        CON851("", "51", null, "error", "Error");
        this.datoServicio();
      } else {
        this.totalPago(true);
      }
    },

    async grabar() {
      CON851P("01", this.dato1, this.llamarDLL);
    },

    async llamarDLL() {
      this.reg_pago.oper_cor = localStorage.Usuario;
      this.reg_pago.fech_cor = this.fecha_act;

      this.reg_pago.datos_tab.forEach((el) => {
        el.nro_fac = format_op(el.nro_fac).toString();
        el.vlr_fac = format_op(el.vlr_fac).toString();

        el.vlr_ser.forEach((x) => {
          x.vlr = format_op(x.vlr).toString();
        });
      });

      this.reg_pago.acum_rec = format_op(this.reg_pago.acum_rec).toString();

      let tabla_pagos = JSON.parse(JSON.stringify(this.reg_pago.datos_tab));
      let objeto = JSON.parse(JSON.stringify(this.reg_pago));

      objeto.datos_tab.forEach((el) => {
        delete el.vlr_ser;
      });

      let datos = _getObjetoSave(objeto, ["datos_tab"]);

      await this.desglosarTabla(tabla_pagos).then((data) => {
        datos = {
          ...datos,
          ...data,
        };
      });

      console.log(datos, "datos");

      datos = {
        ...datos,
        datosh: moduloDatosEnvio() + localStorage.Usuario + "|2|",
      };

      postData(datos, get_url("app/SERVDOM/PUB601.DLL"))
        .then((data) => {
          console.log(data);
          CON851("", "Guardado correctamente", null, "success", "");
          this.llamar_PUB601C();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error intentando grabar", null, "error", "Error");
          loader("hide");
          this.datoItem();
        });
    },

    llamar_PUB601C() {
      let llave_pago = `${this.reg_pago.ano_gen}${this.reg_pago.mes_gen}${this.reg_pago.ano}${this.reg_pago.mes}${this.reg_pago.dia}${this.reg_pago.cod}${this.reg_pago.secu}`;

      postData({ datosh: moduloDatosEnvio() + llave_pago + "|" }, get_url("app/SERVDOM/PUB601C.DLL"))
        .then(() => {
          CON851("", "Proceso completado", null, "success", "");
            CON851P("00", _toggleNav, this.imprimir);
        })
        .catch((error) => {
          loader("hide");
          console.error(error);
          if (!error.STATUS) CON851("", "Error consultando datos", null, "error", "Error");
          CON851P("00", _toggleNav, this.imprimir);
        });
    },

    desglosarTabla(tabla_pagos) {
      return new Promise((resolve) => {
        let new_obj = {};

        tabla_pagos.forEach(async (el, index) => {
          await _getDataTable_bidi(el, "vlr_ser", parseInt(index) + 1).then((data) => {
            new_obj = {
              ...new_obj,
              ...data,
            };
          });

          if (parseInt(index) + 1 == tabla_pagos.length) resolve(new_obj);
        });
      });
    },

    imprimir() {
      let llave_pago = `${this.reg_pago.ano_gen}${this.reg_pago.mes_gen}${this.reg_pago.ano}${this.reg_pago.mes}${this.reg_pago.dia}${this.reg_pago.cod}${this.reg_pago.secu}`;

      const { imprimir_PUB601B } = require("../../frameworks/pdf/servdom/PUB601B.formato.js");
      imprimir_PUB601B({
        llave_w: llave_pago,
        callback: () => {
          loader("hide");
          _toggleNav();
        },
        callback_err: () => {
          CON851("", "Error generando impresión", null, "error", "Error");
          _toggleNav();
        },
      });
    },

    leerTabla() {
      return new Promise((resolve) => {
        for (let i = 0; i < 250; i++) {
          if (this.indice_i != i && format_op(this.reg_pago.datos_tab[i].vlr_fac) == 0) {
            this.inicializarRegPagos(i);
          }

          if (this.indice_i != i && format_op(this.reg_act.nro_fac) == format_op(this.reg_pago.datos_tab[i].nro_fac)) {
            this.reg_pago.datos_tab[this.indice_i].nro_fac = "0";
            this.tot_gen.sw_dup = 1;
            i == 249;
          }

          if (i == 249 || this.tot_gen.sw_dup == 1) resolve();
        }
      });
    },

    sumarFact() {
      return new Promise((resolve) => {
        for (let j = 0; j < 6; j++) {
          this.tot_reng.tot_ser_r =
            format_op(this.reg_fact.tabla.serv_tab[j].sub_tot) +
            format_op(this.reg_fact.tabla.serv_tab[j].sdo_ant) +
            format_op(this.reg_fact.tabla.serv_tab[j].int_ant) +
            format_op(this.reg_fact.tabla.serv_tab[j].int_mes) +
            format_op(this.reg_fact.tabla.serv_tab[j].ajustes) +
            format_op(this.reg_fact.tabla.serv_tab[j].refinanc_mes);

          this.tot_reng.vlr_ser_r[j].vlr =
            format_op(this.tot_reng.vlr_ser_r[j].vlr) + format_op(this.tot_reng.tot_ser_r);
          this.tot_reng.tot_fac_r = format_op(this.tot_reng.tot_fac_r) + format_op(this.tot_reng.tot_ser_r);

          if (j == 5) resolve();
        }
      });
    },

    sumarAbo() {
      return new Promise((resolve) => {
        let llave_pag = `${this.reg_pago.ano}${this.reg_pago.mes}${this.reg_pago.dia}${this.reg_pago.cod}${this.reg_pago.secu}`;
        for (let j = 0; j < 5; j++) {
          let llave_pag_fac = `${this.reg_fact.tabla.datos_abon[j].fecha_pag}${this.reg_fact.tabla.datos_abon[j].cod_pag}${this.reg_fact.tabla.datos_abon[j].sec_pag}`;
          if (llave_pag_fac != llave_pag) {
            this.tot_reng.tot_fac_r =
              format_op(this.tot_reng.tot_fac_r) - format_op(this.reg_fact.tabla.datos_abon[j].tot_abon);
            this.tot_reng.vlr_ser_r[0].vlr =
              format_op(this.tot_reng.vlr_ser_r[0].vlr) -
              format_op(this.reg_fact.tabla.datos_abon[j].abonos_ser[0].abono_ser);
            this.tot_reng.vlr_ser_r[1].vlr =
              format_op(this.tot_reng.vlr_ser_r[1].vlr) -
              format_op(this.reg_fact.tabla.datos_abon[j].abonos_ser[1].abono_ser);
            this.tot_reng.vlr_ser_r[2].vlr =
              format_op(this.tot_reng.vlr_ser_r[2].vlr) -
              format_op(this.reg_fact.tabla.datos_abon[j].abonos_ser[2].abono_ser);
            this.tot_reng.vlr_ser_r[3].vlr =
              format_op(this.tot_reng.vlr_ser_r[3].vlr) -
              format_op(this.reg_fact.tabla.datos_abon[j].abonos_ser[3].abono_ser);
            this.tot_reng.vlr_ser_r[4].vlr =
              format_op(this.tot_reng.vlr_ser_r[4].vlr) -
              format_op(this.reg_fact.tabla.datos_abon[j].abonos_ser[4].abono_ser);
            this.tot_reng.vlr_ser_r[5].vlr =
              format_op(this.tot_reng.vlr_ser_r[5].vlr) -
              format_op(this.reg_fact.tabla.datos_abon[j].abonos_ser[5].abono_ser);
          }
          if (j == 4) resolve();
        }
      });
    },

    mostrarRenglon() {
      this.reg_pago.datos_tab[this.indice_i].nro_fac = mascara_valor.resolve(
        format_op(this.reg_pago.datos_tab[this.indice_i].nro_fac).toString()
      );
      this.reg_pago.datos_tab[this.indice_i].vlr_fac = mascara_valor.resolve(
        format_op(this.reg_pago.datos_tab[this.indice_i].vlr_fac).toString()
      );
      this.reg_pago.datos_tab[this.indice_i].vlr_ser[0].vlr = mascara_valor.resolve(
        format_op(this.reg_pago.datos_tab[this.indice_i].vlr_ser[0].vlr).toString()
      );
      this.reg_pago.datos_tab[this.indice_i].vlr_ser[1].vlr = mascara_valor.resolve(
        format_op(this.reg_pago.datos_tab[this.indice_i].vlr_ser[1].vlr).toString()
      );
      this.reg_pago.datos_tab[this.indice_i].vlr_ser[2].vlr = mascara_valor.resolve(
        format_op(this.reg_pago.datos_tab[this.indice_i].vlr_ser[2].vlr).toString()
      );
      this.reg_pago.datos_tab[this.indice_i].vlr_ser[3].vlr = mascara_valor.resolve(
        format_op(this.reg_pago.datos_tab[this.indice_i].vlr_ser[3].vlr).toString()
      );
      this.reg_pago.datos_tab[this.indice_i].vlr_ser[4].vlr = mascara_valor.resolve(
        format_op(this.reg_pago.datos_tab[this.indice_i].vlr_ser[4].vlr).toString()
      );
      this.reg_pago.datos_tab[this.indice_i].vlr_ser[5].vlr = mascara_valor.resolve(
        format_op(this.reg_pago.datos_tab[this.indice_i].vlr_ser[5].vlr).toString()
      );

      this.reg_act.nro_fac = JSON.parse(JSON.stringify(this.reg_pago.datos_tab[this.indice_i].nro_fac));
      this.reg_act.vlr_fac = JSON.parse(JSON.stringify(this.reg_pago.datos_tab[this.indice_i].vlr_fac));
      this.reg_act.vlr_ser[0].vlr = JSON.parse(JSON.stringify(this.reg_pago.datos_tab[this.indice_i].vlr_ser[0].vlr));
      this.reg_act.vlr_ser[1].vlr = JSON.parse(JSON.stringify(this.reg_pago.datos_tab[this.indice_i].vlr_ser[1].vlr));
      this.reg_act.vlr_ser[2].vlr = JSON.parse(JSON.stringify(this.reg_pago.datos_tab[this.indice_i].vlr_ser[2].vlr));
      this.reg_act.vlr_ser[3].vlr = JSON.parse(JSON.stringify(this.reg_pago.datos_tab[this.indice_i].vlr_ser[3].vlr));
      this.reg_act.vlr_ser[4].vlr = JSON.parse(JSON.stringify(this.reg_pago.datos_tab[this.indice_i].vlr_ser[4].vlr));
      this.reg_act.vlr_ser[5].vlr = JSON.parse(JSON.stringify(this.reg_pago.datos_tab[this.indice_i].vlr_ser[5].vlr));
    },

    sumarPagos() {
      return new Promise((resolve) => {
        for (let j = 0; j < 250; j++) {
          this.tot_gen.tot_fac_t = format_op(this.tot_gen.tot_fac_t) + format_op(this.reg_pago.datos_tab[j].vlr_fac);
          this.tot_gen.vlr_ser_t[0].vlr =
            format_op(this.tot_gen.vlr_ser_t[0].vlr) + format_op(this.reg_pago.datos_tab[j].vlr_ser[0].vlr);
          this.tot_gen.vlr_ser_t[1].vlr =
            format_op(this.tot_gen.vlr_ser_t[1].vlr) + format_op(this.reg_pago.datos_tab[j].vlr_ser[1].vlr);
          this.tot_gen.vlr_ser_t[2].vlr =
            format_op(this.tot_gen.vlr_ser_t[2].vlr) + format_op(this.reg_pago.datos_tab[j].vlr_ser[2].vlr);
          this.tot_gen.vlr_ser_t[3].vlr =
            format_op(this.tot_gen.vlr_ser_t[3].vlr) + format_op(this.reg_pago.datos_tab[j].vlr_ser[3].vlr);
          this.tot_gen.vlr_ser_t[4].vlr =
            format_op(this.tot_gen.vlr_ser_t[4].vlr) + format_op(this.reg_pago.datos_tab[j].vlr_ser[4].vlr);
          this.tot_gen.vlr_ser_t[5].vlr =
            format_op(this.tot_gen.vlr_ser_t[5].vlr) + format_op(this.reg_pago.datos_tab[j].vlr_ser[5].vlr);

          if (format_op(this.reg_pago.datos_tab[j].vlr_fac) > 0)
            this.tot_gen.tot_nro = format_op(this.tot_gen.tot_nro) + 1;

          if (j == 249) resolve();
        }
      });
    },

    mostrarTabla() {
      return new Promise((resolve) => {
        for (let k = 0; k < 250; k++) {
          this.reg_pago.datos_tab[k].nro_fac = mascara_valor.resolve(
            format_op(this.reg_pago.datos_tab[k].nro_fac).toString()
          );
          this.reg_pago.datos_tab[k].vlr_fac = mascara_valor.resolve(
            format_op(this.reg_pago.datos_tab[k].vlr_fac).toString()
          );
          this.reg_pago.datos_tab[k].vlr_ser[0].vlr = mascara_valor.resolve(
            format_op(this.reg_pago.datos_tab[k].vlr_ser[0].vlr).toString()
          );
          this.reg_pago.datos_tab[k].vlr_ser[1].vlr = mascara_valor.resolve(
            format_op(this.reg_pago.datos_tab[k].vlr_ser[1].vlr).toString()
          );
          this.reg_pago.datos_tab[k].vlr_ser[2].vlr = mascara_valor.resolve(
            format_op(this.reg_pago.datos_tab[k].vlr_ser[2].vlr).toString()
          );
          this.reg_pago.datos_tab[k].vlr_ser[3].vlr = mascara_valor.resolve(
            format_op(this.reg_pago.datos_tab[k].vlr_ser[3].vlr).toString()
          );
          this.reg_pago.datos_tab[k].vlr_ser[4].vlr = mascara_valor.resolve(
            format_op(this.reg_pago.datos_tab[k].vlr_ser[4].vlr).toString()
          );
          this.reg_pago.datos_tab[k].vlr_ser[5].vlr = mascara_valor.resolve(
            format_op(this.reg_pago.datos_tab[k].vlr_ser[5].vlr).toString()
          );

          if (k == 249) {
            this.reg_act = JSON.parse(JSON.stringify(this.reg_pago.datos_tab[this.indice_i]));
            resolve();
          }
        }
      });
    },

    devolver(uso) {
      switch (uso) {
        case "esc":
          this.indice_i = parseInt(this.indice_i) - 1;
          this.item = parseInt(this.indice_i) + 1;
          this.dato1();
          break;
        case "f5":
          CON851P("03", this.datoItem, _toggleNav);
          break;
        default:
          this.dato1();
          break;
      }
    },

    traerServicios() {
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB781.DLL"))
        .then((data) => {
          this.array_serv = data.SERVPQR;
          this.traerPuntosPago();
        })
        .catch((error) => {
          loader("hide");
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          _toggleNav();
        });
    },

    traerPuntosPago() {
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB807.DLL"))
        .then((data) => {
          this.array_puntos = data.PUNTO_PAGO;
          this.iniciar();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando archivo de punto de pago", null, "error", "");
          loader("hide");
          _toggleNav();
        });
    },

    _ventanaPuntosPago() {
      _ventanaDatos({
        titulo: "Ventana Puntos de Pago",
        columnas: ["cod", "descrip", "cta_contable"],
        data: this.array_puntos,
        callback_esc: () => {
          document.querySelector(".cod_punto").focus();
        },
        callback: (data) => {
          this.reg_pago.cod = data.cod;
          setTimeout(() => {
            _enterInput(".cod_punto");
          }, 200);
        },
      });
    },

    inicializarTablaPagos() {
      this.reg_pago.datos_tab = JSON.parse(JSON.stringify(regs_dom.REG_PAGO().datos_tab));
    },

    inicializarRegPagos(index) {
      if (index == undefined || index == null) {
        index = this.indice_i;
        Vue.set(this.reg_act, "nro_fac", "");
        Vue.set(this.reg_act, "vlr_fac", "");
        Vue.set(this.reg_act, "vlr_ser", [
          { vlr: "" },
          { vlr: "" },
          { vlr: "" },
          { vlr: "" },
          { vlr: "" },
          { vlr: "" },
        ]);
      }

      Vue.set(this.reg_pago.datos_tab[index], "nro_fac", "");
      Vue.set(this.reg_pago.datos_tab[index], "vlr_fac", "");
      Vue.set(this.reg_pago.datos_tab[index], "vlr_ser", [
        { vlr: "" },
        { vlr: "" },
        { vlr: "" },
        { vlr: "" },
        { vlr: "" },
        { vlr: "" },
      ]);
    },
  },
});
