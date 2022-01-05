const { regs_dom } = require("../../SERVDOM/scripts/regs_dom.js");
const { _ventana_PUB801, format_op } = require("../../SERVDOM/scripts/globalDom.js");

var _this = new Vue({
  el: "#PUB203",
  data: {
    params_CLAVE: {
      estado: false,
    },
    mostrar_CLAVE: false,

    novedad: "",
    reg_fact: regs_dom.FACT(),
    array_usuar_ser: [],
    array_serv: [],
    array_tarifas: [],
    ano_gen: "",
    mes_gen: "",
    tabla_serv: [],
    total_fac_tabla_serv: 0,
    menos_abo_tabla_serv: 0,
    nuevo_sdo_tabla_serv: 0,
    tabla_abonos: regs_dom.FACT().tabla.datos_abon,
    valor_tabla_abonos: 0,
    mascara12: IMask.createMask({
      mask: Number,
      thousandsSeparator: ",",
      radix: ".",
      padFractionalZeros: true,
      signed: false,
      scale: 2,
      min: -99999999.9,
      max: 999999999.9,
    }),
    mascara11: IMask.createMask({
      mask: Number,
      thousandsSeparator: ",",
      radix: ".",
      padFractionalZeros: true,
      signed: false,
      scale: 1,
      min: -99999999.9,
      max: 999999999.9,
    }),
    mascara_valor: IMask.createMask({
      mask: Number,
      thousandsSeparator: ",",
      min: -999999999999,
      max: 9999999999999,
    }),

    tabla_fac_w: regs_dom.FACT().tabla.serv_tab[0].datos_tab,
    serv_w: 0,
    indice_k: 0,
    indice_i: 0,
    sub_tot_t: 0,
    abonos_t: 0,
    sdo_act_t: 0,
    total_serv_w: 0,
    menos_abonos_serv_w: 0,
    nuevo_saldo_serv_w: 0,
    saldo_refinanc_w: 0,
    reg_fact_espejo: {},
  },
  created() {
    if (localStorage.idOpciondata == "025") nombreOpcion("2-5 - Re-imprimir facturación");
    else nombreOpcion("2-3 - Corrección de facturas");
    _inputControl("reset");
    _inputControl("disabled");
    this.datoClave();
  },
  components: {
    clave: require("../../SERVDOM/scripts/clave.vue"),
  },
  computed: {
    nombre_cat() {
      let busqueda = this.array_usuar_ser.find((e) => e.CUENTA == this.reg_fact.cat);
      return busqueda ? busqueda.NOMBRE : "";
    },
    descrip_serv() {
      let busqueda = this.array_serv.find((e) => e.cod == parseInt(this.indice_k) + 1);
      return busqueda ? busqueda.descrip : "";
    },
    descripciones_tar() {
      let descripciones = {};

      for (let i = 0; i < 5; i++) {
        let llave = `${this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[i].ano}${
          parseInt(this.indice_k) + 1
        }${this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[i].conc.slice(1, 2)}${this.reg_fact.tabla.serv_tab[
          this.indice_k
        ].datos_tab[i].conc.slice(2)}`;
        let busqueda = this.array_tarifas.find((e) => e.llave == llave);

        descripciones[`descrip_tar_${i}`] = busqueda ? busqueda.descrip : "";
      }

      return descripciones;
    },
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

    init() {
      this.serv_w = 0;
      let busqueda = this.array_serv.find((e) => e.cod >= this.serv_w);
      if (busqueda) this.serv_w = busqueda.cod;
      else this.serv_w = 1;

      this.datoFechaArchivo();
    },

    datoFechaArchivo() {
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
            this.leerCtl();
          } else {
            CON851("", "No existe el archivo", null, "error", "");
            this.datoFechaArchivo();
          }
          loader("hide");
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          this.datoFechaArchivo();
          loader("hide");
        });
    },

    leerCtl() {
      loader("show");
      postData(
        { datosh: moduloDatosEnvio() + `${this.ano_gen}${this.mes_gen}` + "|1|" },
        get_url("app/SERVDOM/PUB201_01.DLL")
      )
        .then((data) => {
          if (data.llave && data.llave != 0) {
            this.reg_ctl = data;
          } else {
            this.reg_ctl = regs_dom.CONTROL();
          }

          if (!this.reg_ctl.periodo[0].ano_per.trim()) {
            this.ano_tar_w = this.reg_ctl.llave.slice(0, 4);
          } else {
            this.ano_tar_w = this.reg_ctl.periodo[0].ano_per;
          }

          loader("hide");

          if (localStorage.idOpciondata == "025") {
            this.novedad = "CONS";
            this.datoFact();
          } else this._ventanaNovedad();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          this.datoFechaCtl();
          loader("hide");
        });
    },

    _ventanaNovedad() {
      CON850((data) => {
        this.novedad = data.id;
        if (this.novedad == "F") _toggleNav();
        else if (this.novedad == "7") {
          this.reg_fact.llave = this.reg_ctl.nro_fin;
          this.buscarUltFact();
        } else this.datoFact();
      });
    },

    datoFact() {
      validarInputs(
        {
          form: "#llave",
        },
        this._ventanaNovedad,
        () => {
          this.leerFact();
        }
      );
    },

    leerFact() {
      if (localStorage.idOpciondata == "025") this.leerFact_imp();
      else {
        if (this.novedad == 7 && this.reg_fact.llave <= 0) {
          this.datoFact();
        } else {
          postData(
            {
              datosh: moduloDatosEnvio() + "1|",
              fecha: `${this.ano_gen}${this.mes_gen}`,
              nro_fac: this.reg_fact.llave,
            },
            get_url("app/SERVDOM/PUB203_02.DLL")
          )
            .then((data) => {
              loader("hide");

              if (data.llave == 0) data.llave = "";

              switch (this.novedad) {
                case "7":
                  if (!data.llave.trim()) {
                    this.reg_fact_espejo = JSON.parse(JSON.stringify(this.reg_fact));
                    this.nuevo();
                  } else {
                    CON851("", "00", null, "error", "Error");
                    this.datoFact();
                  }
                  break;
                case "8":
                  if (data.llave.trim()) {
                    this.reg_fact = Object.assign({}, data);
                    this.reg_fact_espejo = JSON.parse(JSON.stringify(data));
                    this.cambio();
                  } else {
                    CON851("", "01", null, "error", "Error");
                    this.datoFact();
                  }
                  break;
                case "9":
                  if (data.llave.trim()) {
                    CON851P("02", this.datoFact, () => {
                      this.llamarDLL("9");
                    });
                  } else {
                    CON851("", "01", null, "error", "Error");
                    this.datoFact();
                  }
                  break;
              }
            })
            .catch((error) => {
              console.error(error);
              loader("hide");
              CON851("", "Error consultando datos", null, "error", "Error");
              _toggleNav();
            });
        }
      }
    },

    async cambio() {
      await this.mostrarDatos();
      this.nuevo();
    },

    nuevo() {
      if (this.novedad == 7) {
        this.inicializarDatos();
        this.datoCat();
      } else this.datoEstrato();
    },

    datoEstrato() {
      validarInputs(
        {
          form: "#est",
        },
        this.datoFact,
        () => {
          let busqueda = [1, 2, 3, 4, 5, 6, 7].includes(parseInt(this.reg_fact.est));
          if (busqueda) this.datoCat();
          else {
            CON851("", "03", null, "error", "Error");
            this.datoEstrato();
          }
        }
      );
    },

    datoCat() {
      validarInputs(
        {
          form: "#cat",
        },
        this.datoEstrato,
        () => {
          this.reg_fact.cat = this.reg_fact.cat.padStart(15, "0");
          this.leerCat();
        }
      );
    },

    leerCat() {
      let busqueda = this.array_usuar_ser.find((e) => e.CUENTA == this.reg_fact.cat);

      if (busqueda) {
        this.reg_fact.direcc = busqueda.DIRECCION;

        if (this.novedad == 7) {
          this.reg_fact.est = busqueda.ESTRATO;
          loader("show");
          postData(
            {
              datosh: moduloDatosEnvio() + "2|",
              fecha: `${this.ano_gen}${this.mes_gen}`,
              cat: this.reg_fact.cat,
            },
            get_url("app/SERVDOM/PUB203_02.DLL")
          )
            .then((data) => {
              loader("hide");
              if (!data.llave.trim() || data.llave == 0) {
                this.datoServicio();
              } else {
                CON851("", "05", null, "error", "Error");
                this.datoCat();
              }
            })
            .catch((error) => {
              console.error(error);
              loader("hide");
              CON851("", "Error consultando datos", null, "error", "Error");
              datoCat();
            });
        } else {
          this.datoServicio();
        }
      } else {
        CON851("", "01", null, "error", "Error");
        this.datoCat();
      }
    },

    async datoServicio() {
      validarInputs(
        {
          form: "#serv_w",
          event_f3: this.datoObserv,
        },
        this.datoCat,
        async () => {
          let busqueda = this.array_serv.find((e) => e.cod == this.serv_w);
          if (!busqueda) {
            CON851("", "01", null, "error", "Error");
            this.datoServicio();
          } else {
            this.indice_k = parseInt(this.serv_w) - 1;
            await this.mostrarServicio();
            await this.mostrarTotales();
            await this.traerDatosComplem();
            this.datoSaldoAnt();
          }
        }
      );
    },

    iniciarTabla() {
      this.indice_i = 0;
      this.datoBasico();
    },

    datoBasico() {
      validarInputs(
        {
          form: "#basico",
        },
        this.datoServicio,
        () => {
          this.reg_fact.tabla.serv_tab[this.indice_k].basico = this.mascara11.resolve(
            this.reg_fact.tabla.serv_tab[this.indice_k].basico
          );
          this.datoComplem();
        }
      );
    },

    datoComplem() {
      validarInputs(
        {
          form: "#complem",
        },
        this.datoBasico,
        () => {
          this.reg_fact.tabla.serv_tab[this.indice_k].complem = this.mascara11.resolve(
            this.reg_fact.tabla.serv_tab[this.indice_k].complem
          );
          this.datoSuntuar();
        }
      );
    },

    datoSuntuar() {
      validarInputs(
        {
          form: "#suntuar",
        },
        this.datoComplem,
        () => {
          this.reg_fact.tabla.serv_tab[this.indice_k].suntuar = this.mascara11.resolve(
            this.reg_fact.tabla.serv_tab[this.indice_k].suntuar
          );
          let consumo_w =
            format_op(this.reg_fact.tabla.serv_tab[this.indice_k].basico) +
            format_op(this.reg_fact.tabla.serv_tab[this.indice_k].complem) +
            format_op(this.reg_fact.tabla.serv_tab[this.indice_k].suntuar);
          console.log(consumo_w);

          if (consumo_w > 10000) CON851("", "9E", null, "warning", "Advertencia");
          this.datoConcepto();
        }
      );
    },

    async datoConcepto() {
      if (this.indice_i < 0) this.indice_i = 0;
      if (this.indice_i > 4) this.indice_i = 4;

      await this.mostrarTabla();
      validarInputs(
        {
          form: `#conc_${this.indice_i}`,
          event_f5: () => {
            CON851P("03", this.datoConcepto, this.datoServicio);
          },
          event_f3: this.datoSaldoAnt,
        },
        () => {
          if (this.indice_i == 0) {
            this.datoServicio();
          } else {
            this.indice_i -= 1;
            this.datoConcepto();
          }
        },
        async () => {
          if (!this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[this.indice_i].conc.slice(2).trim()) {
            // inicializa registro
            Vue.set(this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab, this.indice_i, {
              conc: "",
              ano: "",
              mes: "",
              cant: "",
              vlr: "",
              cuota: "",
            });

            this.reg_fact.tabla.serv_tab[this.indice_k].sub_tot = "0";
            await this.mostrarTabla();

            if (this.indice_i < 4) {
              this.indice_i += 1;
              this.datoConcepto();
            } else {
              this.otroDatoTab();
            }
          } else {
            if (
              this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[this.indice_i].conc.slice(0, 1).trim() !=
                parseInt(this.indice_k) + 1 ||
              this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[this.indice_i].conc.slice(1, 2).trim() !=
                this.reg_fact.est
            ) {
              this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[this.indice_i].conc = "";
              CON851("", "03", null, "error", "Error");
              this.datoConcepto();
            } else {
              if (this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[this.indice_i].ano.trim() == 0) {
                this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[this.indice_i].ano = this.ano_tar_w;
              }

              let llave = `${this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[this.indice_i].ano}${
                parseInt(this.indice_k) + 1
              }${this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[this.indice_i].conc.slice(1)}`;
              console.log("LLAVE", llave);
              this.reg_tar = this.array_tarifas.find((e) => e.llave == llave);
              if (!this.reg_tar) {
                CON851("", "01", null, "error", "Error");
                this.datoConcepto();
              } else {
                await this.traerDatosComplem();
                this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[this.indice_i].descrip_tar = this.reg_tar.descrip;
                this.datoPeriodoTab();
              }
            }
          }
        }
      );
    },

    datoPeriodoTab() {
      this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[this.indice_i].ano = this.ano_tar_w;
      validarInputs(
        {
          form: `#mes_${this.indice_i}`,
        },
        this.datoConcepto,
        () => {
          this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[this.indice_i].mes = this.reg_fact.tabla.serv_tab[
            this.indice_k
          ].datos_tab[this.indice_i].mes.padStart(2, "0");
          this.mes_w = parseInt(this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[this.indice_i].mes);
          if (this.mes_w < 1 || this.mes_w > 12) this.datoPeriodoTab();
          else this.datoCantTab();
        }
      );
    },

    datoCantTab() {
      // if (!this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[this.indice_i].cant.toString().trim()) {
      if (this.reg_tar.medic == "S") {
        this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[this.indice_i].cant =
          format_op(this.reg_fact.tabla.serv_tab[this.indice_k].basico) +
          format_op(this.reg_fact.tabla.serv_tab[this.indice_k].complem) +
          format_op(this.reg_fact.tabla.serv_tab[this.indice_k].suntuar);
      } else {
        this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[this.indice_i].cant = format_op(
          this.reg_tar.cant_basi
        ).toString();
      }
      // }

      this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[this.indice_i].cant = this.mascara11.resolve(
        this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[this.indice_i].cant.toString()
      );

      // this.reg_fact_espejo.tabla.serv_tab[this.indice_k].datos_tab[this.indice_i].cant = JSON.parse(
      //   JSON.stringify(this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[this.indice_i].cant)
      // );

      validarInputs(
        {
          form: `#cant_${this.indice_i}`,
        },
        this.datoPeriodoTab,
        () => {
          this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[this.indice_i].cant = this.mascara11.resolve(
            this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[this.indice_i].cant.toString()
          );

          this.datoVlrTab();
        }
      );
    },

    datoVlrTab() {
      let mes_w = parseInt(this.mes_w) - 1;

      let vr_basi_w = 0;
      let vr_comp_w = 0;
      let vr_sunt_w = 0;
      let vr_subsidio_w = 0;

      if (
        this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[this.indice_i].vlr == 0 ||
        this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[this.indice_i].cant !=
          this.reg_fact_espejo.tabla.serv_tab[this.indice_k].datos_tab[this.indice_i].cant
      ) {
        if (this.reg_tar.medic == "S") {
          vr_basi_w =
            format_op(this.reg_tar.tabla[mes_w].con_basi) *
            format_op(this.reg_fact.tabla.serv_tab[this.indice_k].basico);
          vr_comp_w = Math.round(
            format_op(this.reg_tar.tabla[mes_w].con_comp) *
              format_op(this.reg_fact.tabla.serv_tab[this.indice_k].complem)
          );
          vr_sunt_w = Math.round(
            format_op(this.reg_tar.tabla[mes_w].con_sunt) *
              format_op(this.reg_fact.tabla.serv_tab[this.indice_k].suntuar)
          );

          if (this.reg_tar.tabla[mes_w].subsid > 0) {
            vr_subsidio_w = Math.round(
              (format_op(this.reg_tar.tabla[mes_w].car_fijo) + vr_basi_w + vr_comp_w + vr_sunt_w) *
                (format_op(this.reg_tar.tabla[mes_w].subsid) / 100)
            );
          } else {
            vr_subsidio_w =
              (format_op(this.reg_tar.tabla[mes_w].car_fijo) + vr_basi_w) *
              (format_op(this.reg_tar.tabla[mes_w].subsid) / 100);
          }

          this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[this.indice_i].vlr = parseInt(
            format_op(this.reg_tar.tabla[mes_w].car_fijo) + vr_basi_w + vr_comp_w + vr_sunt_w + vr_subsidio_w
          );

        } else {
          this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[this.indice_i].vlr = this.mascara_valor.resolve(
            this.reg_tar.tabla[mes_w].neto.toString()
          );
        }
      }

      validarInputs(
        {
          form: `#vlr_${this.indice_i}`,
        },
        this.datoCantTab,
        () => {
          this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[this.indice_i].vlr = this.mascara_valor.resolve(
            this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[this.indice_i].vlr.toString()
          );

          this.datoCuota();
        }
      );
    },

    datoCuota() {
      validarInputs(
        {
          form: `#cuota_${this.indice_i}`,
        },
        this.datoVlrTab,
        () => {
          this.otroDatoTab();
        }
      );
    },

    async otroDatoTab() {
      await this.mostrarTabla();

      if (this.indice_i < 4) {
        this.indice_i += 1;
        this.datoConcepto();
      } else {
        this.datoSaldoAnt();
      }
    },

    datoSaldoAnt() {
      validarInputs(
        {
          form: "#sdo_ant",
        },
        this.iniciarTabla,
        async () => {
          await this.mostrarServicio();
          this.datoIntAnt();
        }
      );
    },

    datoIntAnt() {
      validarInputs(
        {
          form: "#int_ant",
        },
        this.datoSaldoAnt,
        async () => {
          await this.mostrarServicio();
          this.datoIntMes();
        }
      );
    },

    datoIntMes() {
      validarInputs(
        {
          form: "#int_mes",
        },
        this.datoIntAnt,
        async () => {
          await this.mostrarServicio();
          this.datoAjustes();
        }
      );
    },

    datoAjustes() {
      validarInputs(
        {
          form: "#ajustes",
        },
        this.datoIntMes,
        async () => {
          await this.mostrarServicio();
          this.datoRefinMes();
        }
      );
    },

    datoRefinMes() {
      validarInputs(
        {
          form: "#refinanc_mes",
        },
        this.datoAjustes,
        async () => {
          await this.mostrarServicio();
          this.datoNroCta();
        }
      );
    },

    datoNroCta() {
      validarInputs(
        {
          form: "#nro_cta",
        },
        this.datoRefinMes,
        async () => {
          await this.mostrarServicio();
          this.datoOtroServicio();
        }
      );
    },

    async datoOtroServicio() {
      await this.mostrarTotales();
      this.datoServicio();
    },

    datoObserv() {
      validarInputs(
        {
          form: "#observ",
        },
        this.datoServicio,
        () => {
          this.reg_fact.observ = this.reg_fact.observ.replaceEsp();
          this.evaluarNovedad();
        }
      );
    },

    evaluarNovedad() {
      switch (this.novedad.toString()) {
        case "7":
        case "8":
          CON851P("01", this.datoObserv, () => {
            this.llamarDLL(this.novedad);
          });
          break;
        default:
          CON851("", "Error en novedad", null, "error", "Error");
          this.datoObserv();
          break;
      }
    },

    async llamarDLL(novedad) {
      loader("show");

      this.reg_fact.llave = this.reg_fact.llave.padStart(9, "0");

      for (let i in this.reg_fact.tabla.serv_tab) {
        for (let j in this.reg_fact.tabla.serv_tab[i].datos_tab) {
          this.reg_fact.tabla.serv_tab[i].datos_tab[j].cant = format_op(
            this.reg_fact.tabla.serv_tab[i].datos_tab[j].cant
          ).toString();
          this.reg_fact.tabla.serv_tab[i].datos_tab[j].vlr = format_op(
            this.reg_fact.tabla.serv_tab[i].datos_tab[j].vlr
          ).toString();
          this.reg_fact.tabla.serv_tab[i].datos_tab[j].cuota = format_op(
            this.reg_fact.tabla.serv_tab[i].datos_tab[j].cuota
          ).toString();
        }

        for (let j in this.reg_fact.tabla.serv_tab[i].tabla_consu) {
          this.reg_fact.tabla.serv_tab[i].tabla_consu[j].ult_cons = format_op(
            this.reg_fact.tabla.serv_tab[i].tabla_consu[j].ult_cons
          ).toString();
        }

        this.reg_fact.tabla.serv_tab[i].sub_tot = format_op(this.reg_fact.tabla.serv_tab[i].sub_tot).toString();
        this.reg_fact.tabla.serv_tab[i].sdo_ant = format_op(this.reg_fact.tabla.serv_tab[i].sdo_ant).toString();
        this.reg_fact.tabla.serv_tab[i].int_ant = format_op(this.reg_fact.tabla.serv_tab[i].int_ant).toString();
        this.reg_fact.tabla.serv_tab[i].int_mes = format_op(this.reg_fact.tabla.serv_tab[i].int_mes).toString();
        this.reg_fact.tabla.serv_tab[i].ajustes = format_op(this.reg_fact.tabla.serv_tab[i].ajustes).toString();
        this.reg_fact.tabla.serv_tab[i].refinanc_mes = format_op(
          this.reg_fact.tabla.serv_tab[i].refinanc_mes
        ).toString();
        this.reg_fact.tabla.serv_tab[i].refinanc_sdo = format_op(
          this.reg_fact.tabla.serv_tab[i].refinanc_sdo
        ).toString();
        this.reg_fact.tabla.serv_tab[i].nro_cta = format_op(this.reg_fact.tabla.serv_tab[i].nro_cta).toString();
        this.reg_fact.tabla.serv_tab[i].lec_ant_med = format_op(this.reg_fact.tabla.serv_tab[i].lec_ant_med).toString();
        this.reg_fact.tabla.serv_tab[i].lec_act_med = format_op(this.reg_fact.tabla.serv_tab[i].lec_act_med).toString();
        this.reg_fact.tabla.serv_tab[i].lec_prx_med = format_op(this.reg_fact.tabla.serv_tab[i].lec_prx_med).toString();
        this.reg_fact.tabla.serv_tab[i].basico = format_op(this.reg_fact.tabla.serv_tab[i].basico).toString();
        this.reg_fact.tabla.serv_tab[i].complem = format_op(this.reg_fact.tabla.serv_tab[i].complem).toString();
        this.reg_fact.tabla.serv_tab[i].suntuar = format_op(this.reg_fact.tabla.serv_tab[i].suntuar).toString();
        this.reg_fact.tabla.serv_tab[i].noved_lect = format_op(this.reg_fact.tabla.serv_tab[i].noved_lect).toString();
      }

      for (let i in this.reg_fact.tabla.datos_abon) {
        for (let j in this.reg_fact.tabla.datos_abon[i].abonos_ser) {
          this.reg_fact.tabla.datos_abon[i].abonos_ser[j].abono_ser = format_op(
            this.reg_fact.tabla.datos_abon[i].abonos_ser[j].abono_ser
          ).toString();
        }

        this.reg_fact.tabla.datos_abon[i].fecha_pag = format_op(this.reg_fact.tabla.datos_abon[i].fecha_pag).toString();
        this.reg_fact.tabla.datos_abon[i].cod_pag = format_op(this.reg_fact.tabla.datos_abon[i].cod_pag).toString();
        this.reg_fact.tabla.datos_abon[i].sec_pag = format_op(this.reg_fact.tabla.datos_abon[i].sec_pag).toString();
        this.reg_fact.tabla.datos_abon[i].tot_abon = format_op(this.reg_fact.tabla.datos_abon[i].tot_abon).toString();
      }

      let tabla = JSON.parse(JSON.stringify(this.reg_fact.tabla));
      let objeto = JSON.parse(JSON.stringify(this.reg_fact));

      for (let i in objeto.tabla.serv_tab) {
        delete objeto.tabla.serv_tab[i].datos_tab;
        delete objeto.tabla.serv_tab[i].tabla_consu;
      }

      for (let i in objeto.tabla.datos_abon) {
        delete objeto.tabla.datos_abon[i].abonos_ser;
      }

      let datos = _getObjetoSave(objeto, ["serv_tab", "datos_abon"]);

      for (let i in tabla.serv_tab) {
        await _getDataTable_bidi(tabla.serv_tab[i], "datos_tab", parseInt(i) + 1).then((data) => {
          datos = {
            ...datos,
            ...data,
          };
        });
        await _getDataTable_bidi(tabla.serv_tab[i], "tabla_consu", parseInt(i) + 1).then((data) => {
          datos = {
            ...datos,
            ...data,
          };
        });
      }

      for (let i in tabla.datos_abon) {
        await _getDataTable_bidi(tabla.datos_abon[i], "abonos_ser", parseInt(i) + 1).then((data) => {
          datos = {
            ...datos,
            ...data,
          };
        });
      }

      datos = {
        ...datos,
        datosh:
          moduloDatosEnvio() + localStorage.Usuario + "|" + `${this.ano_gen}${this.mes_gen}` + "|1|" + `${novedad}|`,
      };

      _this.datos = datos;
      console.log(datos, "datos 2");

      postData(datos, get_url("app/SERVDOM/SAVE_FACT.DLL"))
        .then((data) => {
          console.log(data);
          switch (novedad) {
            case "7":
              CON851("", "Guardado correctamente", null, "success", "");
              break;
            case "8":
              CON851("", "Modificado correctamente", null, "success", "");
              break;
            case "9":
              CON851("", "Eliminado correctamente", null, "success", "");
              break;
          }
          loader("hide");
          if (novedad == "9") _toggleNav();
          else this.confirmar_imp();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error intentando grabar", null, "error", "Error");
          loader("hide");
          this.datoObserv();
        });
    },

    buscarUltFact() {
      loader("show");
      postData(
        { datosh: moduloDatosEnvio() + `${this.ano_gen}${this.mes_gen}` + "|" + this.reg_fact.llave + "|" },
        get_url("app/SERVDOM/PUB203_01.DLL")
      )
        .then((data) => {
          this.reg_fact.llave = data;
          loader("hide");
          this.datoFact();
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          CON851("", "Error consultando datos", null, "error", "Error");
          _toggleNav();
        });
    },

    _ventanaUsuarSer(esc) {
      _fin_validar_form();

      _ventana_PUB801(() => {
        this[esc]();
      }).then((data) => {
        this.array_usuar_ser = data.datos;
        Vue.set(this.reg_fact, "cat", data.cuenta);

        postData(
          { datosh: moduloDatosEnvio() + "2|", fecha: `${this.ano_gen}${this.mes_gen}`, cat: this.reg_fact.cat },
          get_url("app/SERVDOM/PUB203_02.DLL")
        )
          .then((data) => {
            loader("hide");
            if (data.llave == 0) data.llave = "";

            console.log(data.llave, data);

            if (!data.llave) {
              if (esc == "datoFact") {
                if (this.novedad == 7) this.leerFact();
                else {
                  CON851("", "08", null, "error", "Error");
                  this.reg_fact.llave = "";
                  this.datoFact();
                }
              } else {
                console.log("NO EXISTE LLAVE");
                this.datoCat();
              }
            } else {
              if (esc == "datoCat" && this.novedad == 7) {
                CON851("", "05", null, "error", "Error");
                this.datoFact();
                console.log("SI EXISTE LLAVE");
              } else if (esc == "datoCat" && this.novedad == 8) {
                console.log("DEJA PASAR NOV 8");
                this.leerCat();
              } else {
                this.reg_fact.llave = data.llave;
                this.leerFact();
              }
            }
          })
          .catch((error) => {
            console.error(error);
            loader("hide");
            CON851("", "Error consultando datos", null, "error", "Error");
            _toggleNav();
          });
      });
    },

    _ventanaServicios() {
      _ventanaDatos({
        titulo: "Ventana de Servicios P.Q.R.",
        columnas: ["cod", "descrip"],
        data: this.array_serv,
        callback_esc: () => {
          document.querySelector(".serv_w").focus();
        },
        callback: (data) => {
          this.serv_w = data.cod;
          setTimeout(() => {
            _enterInput(".serv_w");
          }, 200);
        },
      });
    },

    _ventanaTarifas() {
      _ventanaDatos({
        titulo: "Ventana de Tarifas",
        columnas: ["llave", "descrip"],
        data: this.array_tarifas.filter(
          (e) => e.llave.slice(0, 5) == `${this.ano_tar_w}${parseInt(this.indice_k) + 1}`
        ),
        callback_esc: () => {
          document.querySelector(`.conc_${this.indice_i}`).focus();
        },
        callback: (data) => {
          Vue.set(this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[this.indice_i], "conc", data.llave.slice(4));
          setTimeout(() => {
            _enterInput(`.conc_${this.indice_i}`);
          }, 200);
        },
      });
    },

    traerServicios() {
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB781.DLL"))
        .then((data) => {
          this.array_serv = data.SERVPQR;
          this.traerTarifas();
        })
        .catch((error) => {
          loader("hide");
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          _toggleNav();
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
          _toggleNav();
        });
    },

    traerUsuarSer() {
      postData({ datosh: moduloDatosEnvio() + "1" }, get_url("app/SERVDOM/PUB801.DLL"))
        .then((data) => {
          this.array_usuar_ser = data.USDOM;
          loader("hide");
          this.init();
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          CON851("", "Error consultando datos", null, "error", "");
          _toggleNav();
        });
    },

    inicializarDatos() {
      this.tabla_serv = [];
      this.total_fac_tabla_serv = 0;
      this.menos_abo_tabla_serv = 0;
      this.nuevo_sdo_tabla_serv = 0;
      this.total_serv_w = 0;
      this.menos_abonos_serv_w = 0;
      this.nuevo_saldo_serv_w = 0;
      this.reg_fact = regs_dom.FACT();
      this.reg_fact.llave = this.reg_fact_espejo.llave;
    },

    mostrarDatos() {
      let busqueda = this.array_usuar_ser.find((e) => e.CUENTA == this.reg_fact.cat);
      if (!busqueda) this.nombre_cat = "USUARIO NO EXISTE!";
      else {
        this.reg_fact.est = busqueda.ESTRATO;
      }

      this.mostrarTotales();

      if (this.indice_k < 0 || this.indice_k > 5) this.indice_k = parseInt(this.serv_w) - 1;

      this.mostrarServicio();
    },

    async mostrarServicio() {
      this.reg_fact.tabla.serv_tab[this.indice_k].basico = this.mascara11.resolve(
        this.reg_fact.tabla.serv_tab[this.indice_k].basico
      );

      this.reg_fact.tabla.serv_tab[this.indice_k].complem = this.mascara11.resolve(
        this.reg_fact.tabla.serv_tab[this.indice_k].complem
      );

      this.reg_fact.tabla.serv_tab[this.indice_k].suntuar = this.mascara11.resolve(
        this.reg_fact.tabla.serv_tab[this.indice_k].suntuar
      );

      await this.mostrarTabla();

      this.reg_fact.tabla.serv_tab[this.indice_k].sub_tot =
        this.mascara_valor.resolve(this.reg_fact.tabla.serv_tab[this.indice_k].sub_tot) || "0";

      this.reg_fact.tabla.serv_tab[this.indice_k].sdo_ant =
        this.mascara_valor.resolve(this.reg_fact.tabla.serv_tab[this.indice_k].sdo_ant) || "0";

      this.reg_fact.tabla.serv_tab[this.indice_k].int_ant =
        this.mascara_valor.resolve(this.reg_fact.tabla.serv_tab[this.indice_k].int_ant) || "0";

      this.reg_fact.tabla.serv_tab[this.indice_k].int_mes =
        this.mascara_valor.resolve(this.reg_fact.tabla.serv_tab[this.indice_k].int_mes) || "0";

      this.reg_fact.tabla.serv_tab[this.indice_k].ajustes =
        this.mascara_valor.resolve(this.reg_fact.tabla.serv_tab[this.indice_k].ajustes) || "0";

      this.reg_fact.tabla.serv_tab[this.indice_k].refinanc_mes =
        this.mascara_valor.resolve(this.reg_fact.tabla.serv_tab[this.indice_k].refinanc_mes) || "0";

      this.total_serv_w =
        format_op(this.reg_fact.tabla.serv_tab[this.indice_k].sub_tot) +
        format_op(this.reg_fact.tabla.serv_tab[this.indice_k].sdo_ant) +
        format_op(this.reg_fact.tabla.serv_tab[this.indice_k].int_ant) +
        format_op(this.reg_fact.tabla.serv_tab[this.indice_k].int_mes) +
        format_op(this.reg_fact.tabla.serv_tab[this.indice_k].ajustes) +
        format_op(this.reg_fact.tabla.serv_tab[this.indice_k].refinanc_mes);

      this.total_serv_w = this.mascara_valor.resolve(this.total_serv_w.toString()) || "0";

      await this.sumarAbonosServ();
      this.menos_abonos_serv_w = this.mascara_valor.resolve(this.menos_abonos_serv_w.toString()) || "0";

      this.nuevo_saldo_serv_w =
        format_op(this.total_serv_w.toString()) - format_op(this.menos_abonos_serv_w.toString());
      this.nuevo_saldo_serv_w = this.mascara_valor.resolve(this.nuevo_saldo_serv_w.toString()) || "0";

      this.saldo_refinanc_w =
        this.mascara_valor.resolve(this.reg_fact.tabla.serv_tab[this.indice_k].refinanc_sdo.toString()) || "0";
    },

    async sumarAbonosServ() {
      this.menos_abonos_serv_w = 0;

      for (let j = 0; j < 5; j++) {
        this.menos_abonos_serv_w += format_op(this.reg_fact.tabla.datos_abon[j].abonos_ser[this.indice_k].abono_ser);
      }
    },

    async mostrarTabla() {
      this.reg_fact.tabla.serv_tab[this.indice_k].sub_tot = 0;

      for (let j = 0; j < 5; j++) {
        if (this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[j].vlr == 0) {
          if (this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[j].conc == 0)
            this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[j].conc = "";
          if (this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[j].ano == 0)
            this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[j].ano = "";
          if (this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[j].mes == 0)
            this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[j].mes = "";
          if (this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[j].cuota == 0)
            this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[j].cuota = "";
        } else {
          let llave = `${this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[j].ano}${
            parseInt(this.indice_k) + 1
          }${this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[j].conc.slice(1, 2)}${this.reg_fact.tabla.serv_tab[
            this.indice_k
          ].datos_tab[j].conc.slice(2)}`;
          let busqueda = this.array_tarifas.find((e) => e.llave == llave);
          this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[j].descrip_tar = busqueda ? busqueda.descrip : "";

          this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[j].cant = this.mascara11.resolve(
            this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[j].cant.toString()
          );

          this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[j].vlr = this.mascara_valor.resolve(
            this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[j].vlr.toString()
          );
        }

        this.reg_fact.tabla.serv_tab[this.indice_k].sub_tot =
          format_op(this.reg_fact.tabla.serv_tab[this.indice_k].sub_tot) +
          format_op(this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[j].vlr);
      }

      this.reg_fact.tabla.serv_tab[this.indice_k].sub_tot = this.mascara_valor.resolve(
        this.reg_fact.tabla.serv_tab[this.indice_k].sub_tot.toString()
      );
    },

    async mostrarTotales() {
      await this.totalizarServicio();
      this.total_fac_tabla_serv = this.mascara_valor.resolve(this.sub_tot_t.toString());

      await this.totalizarAbonos();
      this.menos_abo_tabla_serv = this.mascara_valor.resolve(this.abonos_t.toString());
      this.valor_tabla_abonos = this.mascara_valor.resolve(this.abonos_t.toString());

      this.sdo_act_t = format_op(this.sub_tot_t.toString()) - format_op(this.abonos_t.toString());
      this.nuevo_sdo_tabla_serv = this.mascara_valor.resolve(this.sdo_act_t.toString());
    },

    async totalizarServicio() {
      this.tabla_serv = [];
      this.sub_tot_t = 0;
      for (let j = 0; j < 6; j++) {
        let servicio_t =
          format_op(this.reg_fact.tabla.serv_tab[j].sub_tot) +
          format_op(this.reg_fact.tabla.serv_tab[j].sdo_ant) +
          format_op(this.reg_fact.tabla.serv_tab[j].int_ant) +
          format_op(this.reg_fact.tabla.serv_tab[j].int_mes) +
          format_op(this.reg_fact.tabla.serv_tab[j].ajustes) +
          format_op(this.reg_fact.tabla.serv_tab[j].refinanc_mes);

        let busqueda = this.array_serv.find((e) => e.cod == parseInt(j) + 1);

        this.tabla_serv.push(
          JSON.parse(
            JSON.stringify({
              serv: parseInt(j) + 1,
              descrip_serv: busqueda ? busqueda.descrip : "",
              valor: this.mascara_valor.resolve(servicio_t.toString()),
            })
          )
        );

        this.sub_tot_t += servicio_t;
      }
    },

    async totalizarAbonos() {
      this.abonos_t = 0;
      for (let j = 0; j < 5; j++) {
        let tot_abon = this.reg_fact.tabla.datos_abon[j].tot_abon;
        if (tot_abon != 0) {
          this.reg_fact.tabla.datos_abon[j].tot_abon = this.mascara_valor.resolve(tot_abon.toString());
          this.abonos_t += format_op(tot_abon);
        }
      }
    },

    flecha_arriba() {
      _fin_validar_form();

      if (this.indice_i > 0) this.indice_i -= 1;
      this.datoConcepto();
    },

    flecha_abajo() {
      _fin_validar_form();

      if (this.indice_i < 4) this.indice_i += 1;
      this.datoConcepto();
    },

    leerFact_imp() {
      postData(
        { datosh: moduloDatosEnvio() + "1|", fecha: `${this.ano_gen}${this.mes_gen}`, nro_fac: this.reg_fact.llave },
        get_url("app/SERVDOM/PUB203_02.DLL")
      )
        .then(async (data) => {
          loader("hide");
          if (data.llave == 0) data.llave = "";
          
          if(localStorage.idOpciondata == "025") {
            let busqueda = this.array_serv.find(e => e.cod.trim() != "");
            if(busqueda) this.indice_k = parseInt(busqueda.cod) - 1;
          }

          if (!data.llave.trim()) {
            CON851("", "01", null, "error", "Error");
            this.datoFact();
          } else {
            this.reg_fact = data;
            this.serv_w = this.indice_k;
            await this.mostrarDatos();
            this.confirmar_imp();
          }
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          CON851("", "Error consultando datos", null, "error", "Error");
          _toggleNav();
        });
    },

    confirmar_imp() {
      CON851P("00", this.datoFact, this.imprimir);
    },

    async imprimir() {
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

      let envio = {
        nro_fact_w: this.reg_fact.llave,
        nom_fac_w: `${this.ano_gen}${this.mes_gen}`,
        array_serv: this.array_serv,
        array_usuar_ser: this.array_usuar_ser,
        array_tarifas: this.array_tarifas,
        admin_w: localStorage.Usuario,
        callback: (data) => {
          _toggleNav();
        },
        callback_err: _toggleNav,
      };

      let url = variable_emp
        ? `../../frameworks/pdf/servdom/${variable_emp}/PUB205A.formato`
        : "../../frameworks/pdf/servdom/PUB205A.formato";

      const { imprimir_PUB205A } = require(url);
      imprimir_PUB205A(envio);
    },

    async traerDatosComplem(ind) {
      ind = ind || 0;
      return new Promise((resolve) => {
        if ($_USUARIO_EMPRESA.NIT == 892099475) {
          let llave = `${this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[ind].ano}${
            parseInt(this.indice_k) + 1
          }${this.reg_fact.tabla.serv_tab[this.indice_k].datos_tab[ind].conc.slice(1)}`;
          console.log("LLAVE 1", llave);
          let tarifa = this.array_tarifas.find((e) => e.llave == llave);

          if (tarifa) {
            if (!this.reg_fact.tabla.serv_tab[this.indice_k].basico.trim()) {
              this.reg_fact.tabla.serv_tab[this.indice_k].basico = format_op(tarifa.cant_basi).toString();
              this.reg_fact.tabla.serv_tab[this.indice_k].complem = format_op(tarifa.cant_comp).toString();
              this.reg_fact.tabla.serv_tab[this.indice_k].suntuar = format_op(tarifa.cant_sunt).toString();
            }
          }
        }

        resolve();
      });
    },
  },
});
