const { PUB827, PUB828, format_op } = require("../../SERVDOM/scripts/globalDom.js");
const { regs_dom } = require("../../SERVDOM/scripts/regs_dom.js");

new Vue({
  el: "#PUB102",
  data: {
    params_CLAVE: {
      estado: false,
    },
    mostrar_CLAVE: false,

    novedad: "7",
    reg_tarifa: regs_dom.TARIF(),
    fecha_act: moment().format("YYYYMMDD"),
    array_serv: [],
    array_uso_tarif: [],
    array_tarifas: [],
    array_centros_costos: [],
    array_cuentas: [],
    array_clases: [
      { COD: "01", DESCRIP: "BAJO - BAJO" },
      { COD: "02", DESCRIP: "BAJO" },
      { COD: "03", DESCRIP: "MEDIO - BAJO" },
      { COD: "04", DESCRIP: "MEDIO" },
      { COD: "05", DESCRIP: "MEDIO-ALTO" },
      { COD: "06", DESCRIP: "ALTO" },
      { COD: "10", DESCRIP: "INDUSTRIAL" },
      { COD: "11", DESCRIP: "COMERCIAL" },
      { COD: "12", DESCRIP: "OFICIAL" },
      { COD: "13", DESCRIP: "ESPECIAL" },
      { COD: "14", DESCRIP: "TEMPORAL" },
      { COD: "15", DESCRIP: "PROVISIONAL" },
    ],
    indice: 0,
    mostrar_comp_AcueAlc: false,
    mostrar_comp_Aseo: false,
    array_aforo: [
      { COD: "1", DESCRIP: "No tiene aforo" },
      { COD: "2", DESCRIP: "Aforo ordinario" },
      { COD: "3", DESCRIP: "Aforo extraordinario" },
      { COD: "4", DESCRIP: "Aforo permanente" },
    ],
    mascara9: IMask.createMask({
      mask: Number,
      thousandsSeparator: ",",
      radix: ".",
      padFractionalZeros: true,
      signed: false,
      scale: 2,
      min: -99999.99,
      max: 999999.99,
    }),
    mascara11: IMask.createMask({
      mask: Number,
      thousandsSeparator: ",",
      radix: ".",
      padFractionalZeros: true,
      signed: false,
      scale: 2,
      min: -9999999.99,
      max: 99999999.99,
    }),
    mascaraTotales: IMask.createMask({
      mask: Number,
      thousandsSeparator: ",",
      radix: ".",
      padFractionalZeros: true,
      signed: false,
      scale: 2,
      min: -9999999999.99,
      max: 99999999999.99,
    }),
    mascara5: IMask.createMask({
      mask: Number,
      thousandsSeparator: ",",
      radix: ".",
      padFractionalZeros: true,
      signed: false,
      scale: 2,
      min: -9.99,
      max: 99.99,
    }),
  },
  created() {
    nombreOpcion("1-2 - Actualización de tarifas");
    _inputControl("reset");
    _inputControl("disabled");
    this.datoClave();
  },
  components: {
    clave: require("../../SERVDOM/scripts/clave.vue"),
  },
  computed: {
    descrip_serv() {
      let busqueda = this.array_serv.find((e) => e.cod == this.reg_tarifa.serv);
      return busqueda ? busqueda.descrip : "";
    },
    descrip_ubicacion() {
      let busqueda = PUB827.find((e) => e.COD == this.reg_tarifa.ubicacion);
      return busqueda ? busqueda.DESCRIP : "";
    },
    descrip_prod() {
      let busqueda = PUB828.find((e) => e.COD == this.reg_tarifa.prod);
      return busqueda ? busqueda.DESCRIP : "";
    },
    descrip_clase() {
      let busqueda = this.array_clases.find((e) => e.COD == this.reg_tarifa.clase);
      return busqueda ? busqueda.DESCRIP : "";
    },
    descrip_c_costo() {
      let busqueda = this.array_centros_costos.find((e) => e.COD == this.reg_tarifa.contab.c_costo);
      return busqueda ? busqueda.NOMBRE : "";
    },
    descrip_cod_inter() {
      let busqueda = this.array_cuentas.find((e) => e.LLAVE_MAE.slice(0, 11) == this.reg_tarifa.contab.cod_inter);
      return busqueda ? busqueda.NOMBRE_MAE : "";
    },
    descrip_aforo() {
      let busqueda = this.array_aforo.find((e) => e.COD == this.reg_tarifa.aforo);
      return busqueda ? busqueda.DESCRIP : "";
    },
    descrip_cod_fijo() {
      let busqueda = this.array_cuentas.find((e) => e.LLAVE_MAE.slice(0, 11) == this.reg_tarifa.contab.cod_fijo);
      return busqueda ? busqueda.NOMBRE_MAE : "";
    },
    descrip_cod_basi() {
      let busqueda = this.array_cuentas.find((e) => e.LLAVE_MAE.slice(0, 11) == this.reg_tarifa.contab.cod_basi);
      return busqueda ? busqueda.NOMBRE_MAE : "";
    },
    descrip_cod_comp() {
      let busqueda = this.array_cuentas.find((e) => e.LLAVE_MAE.slice(0, 11) == this.reg_tarifa.contab.cod_comp);
      return busqueda ? busqueda.NOMBRE_MAE : "";
    },
    descrip_cod_sunt() {
      let busqueda = this.array_cuentas.find((e) => e.LLAVE_MAE.slice(0, 11) == this.reg_tarifa.contab.cod_sunt);
      return busqueda ? busqueda.NOMBRE_MAE : "";
    },
    descrip_cod_subs() {
      let busqueda = this.array_cuentas.find((e) => e.LLAVE_MAE.slice(0, 11) == this.reg_tarifa.contab.cod_subs);
      return busqueda ? busqueda.NOMBRE_MAE : "";
    },
    descrip_cod_otr() {
      let busqueda = this.array_cuentas.find((e) => e.LLAVE_MAE.slice(0, 11) == this.reg_tarifa.contab.cod_otr);
      return busqueda ? busqueda.NOMBRE_MAE : "";
    },
    descrip_cod_neto() {
      let busqueda = this.array_cuentas.find((e) => e.LLAVE_MAE.slice(0, 11) == this.reg_tarifa.contab.cod_neto);
      return busqueda ? busqueda.NOMBRE_MAE : "";
    },
    componente() {
      if (this.indice >= 0 && this.indice <= 11) {
        return this.reg_tarifa.tabla2[this.indice];
      } else
        return {
          tn_resi_limp: "",
          tn_resi_barr: "",
          tn_resi_noap: "",
          comp1: "",
          comp2: "",
          comp3: "",
          comp4: "",
          comp5: "",
          comp6: "",
          comp7: "",
          comp8: "",
          comp9: "",
          comp10: "",
        };
    },
    total_comp_AcueAlc() {
      if (this.indice >= 0 && this.indice <= 11) {
        // se inicializa parte del objeto restante
        this.reg_tarifa.tabla2[this.indice] = {
          tn_resi_limp: "",
          tn_resi_barr: "",
          tn_resi_noap: "",
          comp1: "",
          comp2: this.componente.comp2,
          comp3: this.componente.comp3,
          comp4: this.componente.comp4,
          comp5: "",
          comp6: "",
          comp7: "",
          comp8: "",
          comp9: "",
          comp10: "",
        };

        let suma =
          format_op(this.componente.comp2) + format_op(this.componente.comp3) + format_op(this.componente.comp4);

        suma = this.mascaraTotales.resolve(suma.toString().trim());
        return suma;
      } else return 0;
    },
    mes() {
      switch (this.indice) {
        case 0:
          return "ENE";
        case 1:
          return "FEB";
        case 2:
          return "MAR";
        case 3:
          return "ABR";
        case 4:
          return "MAY";
        case 5:
          return "JUN";
        case 6:
          return "JUL";
        case 7:
          return "AGO";
        case 8:
          return "SEP";
        case 9:
          return "OCT";
        case 10:
          return "NOV";
        case 11:
          return "DIC";
      }
    },
    total_comp_Aseo() {
      let suma =
        format_op(this.componente.comp1) +
        format_op(this.componente.comp2) +
        format_op(this.componente.comp3) +
        format_op(this.componente.comp4) +
        format_op(this.componente.comp5) +
        format_op(this.componente.comp6) +
        format_op(this.componente.comp7) +
        format_op(this.componente.comp8) +
        format_op(this.componente.comp9);

      suma = this.mascaraTotales.resolve(suma.toString().trim());

      return suma;
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

    _ventanaNovedad() {
      CON850((data) => {
        this.novedad = data.id;
        if (this.novedad == "F") _toggleNav();
        else this.datoAño();
      });
    },

    datoAño() {
      if (!this.reg_tarifa.ano.trim()) this.reg_tarifa.ano = this.fecha_act.slice(0, 4);
      validarInputs(
        {
          form: "#ano",
        },
        this._ventanaNovedad,
        () => {
          if (this.reg_tarifa.ano < 1996 || this.reg_tarifa.ano == 0) {
            CON851("", "03", null, "error", "Error");
            this.datoAño();
          } else this.datoServ();
        }
      );
    },

    datoServ() {
      validarInputs(
        {
          form: "#serv",
        },
        this.datoAño,
        async () => {
          if (this.reg_tarifa.serv.trim()) {
            let busqueda = this.array_serv.find((e) => e.cod == this.reg_tarifa.serv);
            if (busqueda) {
              await this.traerTarifas()
                .then(() => {
                  this.datoEstrato();
                })
                .catch((error) => {
                  if (error.STATUS) this.datoEstrato();
                  else {
                    console.error(error);
                    this.datoServ();
                  }
                });
            } else {
              CON851("", "01", null, "error", "Error");
              this.datoServ();
            }
          } else this.datoServ();
        }
      );
    },

    datoEstrato() {
      validarInputs(
        {
          form: "#estrato",
        },
        this.datoServ,
        () => {
          if (this.reg_tarifa.estrato == 0 || isNaN(parseInt(this.reg_tarifa.estrato))) {
            CON851("", "03", null, "error", "Error");
            this.datoEstrato();
          } else {
            if (!this.reg_tarifa.tarifa.trim()) {
              this.reg_tarifa.tarifa = "R";
              this.datoUsoTarifa();
            } else {
              this.datoUsoTarifa();
            }
          }
        }
      );
    },

    datoUsoTarifa() {
      validarInputs(
        {
          form: "#tarifa",
        },
        this.datoEstrato,
        () => {
          this.reg_tarifa.tarifa = this.reg_tarifa.tarifa.toUpperCase();
          if (this.reg_tarifa.tarifa.trim()) {
            let busqueda = this.array_uso_tarif.find((e) => e.cod == this.reg_tarifa.tarifa);
            if (busqueda) this.leerTarifa();
            else {
              CON851("", "01", null, "error", "Error");
              this.datoUsoTarifa();
            }
          } else {
            this.datoUsoTarifa();
          }
        }
      );
    },

    leerTarifa() {
      this.llave_w = `${this.reg_tarifa.ano}${this.reg_tarifa.serv}${this.reg_tarifa.estrato}${this.reg_tarifa.tarifa}`;
      let busqueda = this.array_tarifas.find((e) => e.llave == this.llave_w);

      switch (this.novedad) {
        case "7":
          if (!busqueda) {
            this.datoDescripTarifa();
          } else {
            CON851("", "00", null, "error", "Error");
            this.datoUsoTarifa();
          }
          break;
        case "8":
          if (busqueda) {
            this.reg_tarifa = busqueda;
            this.datoCambio();
          } else {
            CON851("", "01", null, "error", "Error");
            this.datoUsoTarifa();
          }
          break;
        case "9":
          if (busqueda) {
            this.reg_tarifa = busqueda;
            CON851P("02", this.datoUsoTarifa, () => {
              this.grabar();
            });
          } else {
            CON851("", "01", null, "error", "Error");
            this.datoUsoTarifa();
          }
          break;
      }
    },

    datoCambio() {
      this.datoDescripTarifa();
    },

    datoDescripTarifa() {
      validarInputs(
        {
          form: "#descrip",
        },
        this.datoUsoTarifa,
        () => {
          if (this.reg_tarifa.descrip.trim()) {
            this.datoUbicacion();
          } else {
            CON851("", "03", null, "error", "Error");
            this.datoDescripTarifa();
          }
        }
      );
    },

    datoUbicacion() {
      POPUP(
        {
          array: PUB827,
          titulo: "ZONA",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: this.reg_tarifa.ubicacion || "1",
          callback_f: this.datoDescripTarifa,
        },
        async (data) => {
          this.reg_tarifa.ubicacion = data.COD;
          this.datoProd();
        }
      );
    },

    datoProd() {
      if (this.reg_tarifa.serv == 3) {
        POPUP(
          {
            array: PUB828,
            titulo: "TIPO DE PRODUCTOR",
            indices: [{ id: "COD", label: "DESCRIP" }],
            seleccion: this.reg_tarifa.prod || "1",
            callback_f: this.datoUbicacion,
          },
          async (data) => {
            this.reg_tarifa.prod = data.COD;
            this.datoClase();
          }
        );
      } else {
        this.datoClase();
      }
    },

    datoClase() {
      POPUP(
        {
          array: this.array_clases,
          titulo: "CLASE DE USO",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: this.reg_tarifa.clase || "01",
          callback_f: this.datoDescripTarifa,
        },
        async (data) => {
          this.reg_tarifa.clase = data.COD;
          this.reg_tarifa.descrip_clase = data.DESCRIP;
          this.datoMedic();
        }
      );
    },

    datoMedic() {
      // if (this.reg_tarifa.serv == 4) {
      //   this.reg_tarifa.medic = "N";
      //   this.datoPeriod();
      // } else {
      if (!this.reg_tarifa.medic.trim()) this.reg_tarifa.medic = "N";
      validarInputs(
        {
          form: "#medic",
        },
        this.datoClase,
        () => {
          this.reg_tarifa.medic = this.reg_tarifa.medic.toUpperCase();
          if (this.reg_tarifa.medic != "S") this.reg_tarifa.medic = "N";
          this.datoPeriod();
        }
      );
      // }
    },

    datoPeriod() {
      if (this.reg_tarifa.medic == "S") {
        this.reg_tarifa.period = "S";
        this.datoCantBasi();
      } else {
        if (!this.reg_tarifa.period.trim()) this.reg_tarifa.period = "S";
        validarInputs(
          {
            form: "#period",
          },
          this.datoMedic,
          () => {
            this.reg_tarifa.period = this.reg_tarifa.period.toUpperCase();
            if (this.reg_tarifa.period != "S") this.reg_tarifa.period = "N";
            this.datoCantBasi();
          }
        );
      }
    },

    datoCantBasi() {
      validarInputs(
        {
          form: "#cant_basi",
        },
        this.datoClase,
        () => {
          if ((this.reg_tarifa.serv == 1 || this.reg_tarifa.serv == 2) && this.reg_tarifa.cant_basi == 0) {
            CON851("", "02", null, "error", "Error");
            this.datoCantBasi();
          } else {
            this.datoCantComp();
          }
        }
      );
    },

    datoCantComp() {
      validarInputs(
        {
          form: "#cant_comp",
        },
        this.datoCantBasi,
        () => {
          if (
            this.reg_tarifa.medic == "S" &&
            (this.reg_tarifa.serv == 1 || this.reg_tarifa.serv == 2) &&
            this.reg_tarifa.cant_comp == 0
          ) {
            this.reg_tarifa.cant_comp = this.reg_tarifa.cant_basi;
            this.datoCantSunt();
          } else if (
            this.reg_tarifa.cant_comp > 0 &&
            parseInt(this.reg_tarifa.cant_comp) < parseInt(this.reg_tarifa.cant_basi)
          ) {
            CON851("", "43", null, "error", "Error");
            this.datoCantComp();
          } else {
            this.datoCantSunt();
          }
        }
      );
    },

    datoCantSunt() {
      validarInputs(
        {
          form: "#cant_sunt",
        },
        this.datoCantComp,
        () => {
          if (
            this.reg_tarifa.cant_sunt > 0 &&
            parseInt(this.reg_tarifa.cant_sunt) < parseInt(this.reg_tarifa.cant_comp)
          ) {
            CON851("", "43", null, "error", "Error");
            this.datoCantSunt();
          } else {
            this.datoInterfaz();
          }
        }
      );
    },

    datoInterfaz() {
      // if(!directorio.trim()) {            // PENDIENTE CONTABILIDAD
      //   this.reg_tarifa.contab.interfaz = "N";
      //   this.iniciarTabla();
      // }
      if (!this.reg_tarifa.contab.interfaz.trim()) this.reg_tarifa.contab.interfaz = "S";
      validarInputs(
        {
          form: "#interfaz",
        },
        this.datoCantSunt,
        () => {
          this.reg_tarifa.contab.interfaz = this.reg_tarifa.contab.interfaz.toUpperCase();
          if (this.reg_tarifa.contab.interfaz != "S") this.reg_tarifa.contab.interfaz = "N";
          if (this.reg_tarifa.contab.interfaz == "N") this.iniciarTabla();
          else this.datoCCosto();
        }
      );
    },

    datoCCosto() {
      validarInputs(
        {
          form: "#c_costo",
        },
        this.datoInterfaz,
        () => {
          if (this.reg_tarifa.contab.c_costo.trim()) {
            let busqueda = this.array_centros_costos.find((e) => e.COD == this.reg_tarifa.contab.c_costo);
            if (busqueda) {
              this.datoCodInter();
            } else {
              CON851("", "01", null, "error", "Error");
              this.datoCCosto();
            }
          }
        }
      );
    },

    datoCodInter() {
      if (this.reg_tarifa.contab.interfaz == "N") {
        this.iniciarTabla();
      } else {
        validarInputs(
          {
            form: "#cod_inter",
          },
          this.datoCCosto,
          () => {
            if (this.reg_tarifa.contab.cod_inter.trim()) {
              let busqueda = this.array_cuentas.find((e) => e.LLAVE_MAE == `${this.reg_tarifa.contab.cod_inter}4`);
              if (busqueda) {
                this.iniciarTabla();
              } else {
                CON851("", "01", null, "error", "Error");
                this.datoCodInter();
              }
            }
          }
        );
      }
    },

    iniciarTabla() {
      this.indice = 0;
      this.ubicarMes();
    },

    datoFijo() {
      switch (parseInt(this.reg_tarifa.serv)) {
        case 1:
        case 2:
          this.datoFijo2();
          break;
        case 3:
          this.ventanaFrecuencia();
          break;
        default:
          this.datoFijo2();
          break;
      }
    },

    datoFijo2() {
      if (this.reg_tarifa.serv == 3) {
        this.datoBasico();
      } else {
        this.datoCarFijo();
      }
    },

    datoCarFijo() {
      validarInputs(
        {
          form: `#car_fijo_${this.indice}`,
          event_f3: this.datoCodFijo,
          event_f5: this.datoAño,
          event_f9: () => {
            this.dato_f9("datoCarFijo");
          },
        },
        () => {
          this.ubicarMes();
        },
        () => {
          Vue.set(
            this.reg_tarifa.tabla[this.indice],
            "car_fijo",
            this.mascara9.resolve(this.reg_tarifa.tabla[this.indice].car_fijo.toString().trim())
          );
          this.datoFrecuBasico();
        }
      );
    },

    datoFrecuBasico() {
      switch (parseInt(this.reg_tarifa.serv)) {
        case 1:
        case 2:
          this.ventanaFrecuencia_AcueAlc();
          break;
        default:
          this.datoBasico();
          break;
      }
    },

    valDatoBasico() {
      if (this.reg_tarifa.serv == 1 || this.reg_tarifa.serv == 2) {
        this.datoComplem();
      } else {
        this.datoBasico();
      }
    },

    datoBasico() {
      validarInputs(
        {
          form: `#con_basi_${this.indice}`,
          event_f3: this.datoCodFijo,
          event_f5: this.datoAño,
        },
        () => {
          this.datoCarFijo();
        },
        () => {
          Vue.set(
            this.reg_tarifa.tabla[this.indice],
            "con_basi",
            this.mascara9.resolve(this.reg_tarifa.tabla[this.indice].con_basi.toString().trim())
          );
          this.datoComplem();
        }
      );
    },

    datoComplem() {
      validarInputs(
        {
          form: `#con_comp_${this.indice}`,
          event_f3: this.datoCodFijo,
          event_f5: this.datoAño,
        },
        () => {
          this.datoBasico();
        },
        () => {
          Vue.set(
            this.reg_tarifa.tabla[this.indice],
            "con_comp",
            this.mascara9.resolve(this.reg_tarifa.tabla[this.indice].con_comp.toString().trim())
          );
          this.datoSunt();
        }
      );
    },

    datoSunt() {
      validarInputs(
        {
          form: `#con_sunt_${this.indice}`,
          event_f3: this.datoCodFijo,
          event_f5: this.datoAño,
        },
        () => {
          this.datoComplem();
        },
        () => {
          Vue.set(
            this.reg_tarifa.tabla[this.indice],
            "con_sunt",
            this.mascara9.resolve(this.reg_tarifa.tabla[this.indice].con_sunt.toString().trim())
          );
          this.datoSubsid();
        }
      );
    },

    datoSubsid() {
      validarInputs(
        {
          form: `#subsid_${this.indice}`,
          event_f3: this.datoCodFijo,
          event_f5: this.datoAño,
        },
        () => {
          this.datoSunt();
        },
        () => {
          if (this.reg_tarifa.tabla[this.indice].subsid < -100 || this.reg_tarifa.tabla[this.indice].subsid > 100) {
            CON851("No puede ser mayor a 100", "Error el dato debe ser un porcentaje", null, "error", "Error");
            this.datoSubsid();
          } else {
            this.datoOtro();
          }
        }
      );
    },

    datoOtro() {
      validarInputs(
        {
          form: `#otro_${this.indice}`,
          event_f3: this.datoCodFijo,
          event_f5: this.datoAño,
        },
        () => {
          this.datoSubsid();
        },
        () => {
          Vue.set(
            this.reg_tarifa.tabla[this.indice],
            "otro",
            this.mascara9.resolve(this.reg_tarifa.tabla[this.indice].otro.toString().trim())
          );

          let reg_act = this.reg_tarifa.tabla[this.indice];
          if (reg_act.otro + reg_act.car_fijo < 0) {
            CON851("", "07", null, "error", "Error");
          }

          let basico_x = format_op(reg_act.con_basi) * format_op(this.reg_tarifa.cant_basi);
          let complem_x = null;
          if (this.reg_tarifa.cant_comp == 0 || this.reg_tarifa.cant_comp == 9999) { // Se agrega condicion para cant_comp = 9999
            complem_x = 0;
          } else {
            complem_x =
              format_op(reg_act.con_comp) *
              (format_op(this.reg_tarifa.cant_comp) - format_op(this.reg_tarifa.cant_basi));
          }

          let suntuar_x = null;
          if (this.reg_tarifa.medic == "S" || this.reg_tarifa.cant_sunt == 0) {
            suntuar_x = 0;
          } else {
            suntuar_x =
              format_op(reg_act.con_sunt) *
              (format_op(this.reg_tarifa.cant_sunt) - format_op(this.reg_tarifa.cant_comp));
          }

          let subsid_x = null;
          if (reg_act.subsid >= 0) {
            subsid_x =
              (format_op(reg_act.car_fijo) + format_op(basico_x) + format_op(complem_x) + format_op(suntuar_x)) *
              (reg_act.subsid / 100);
          } else {
            subsid_x = (format_op(reg_act.car_fijo) + format_op(basico_x)) * (format_op(reg_act.subsid) / 100);
          }

          this.reg_tarifa.tabla[this.indice].neto =
            format_op(reg_act.car_fijo) +
            format_op(basico_x) +
            format_op(complem_x) +
            format_op(suntuar_x) +
            format_op(subsid_x) +
            format_op(reg_act.otro);

          Vue.set(
            this.reg_tarifa.tabla[this.indice],
            "neto",
            this.mascara11.resolve(this.reg_tarifa.tabla[this.indice].neto.toString().trim())
          );

          this.indice += 1;
          this.ubicarMes();
        }
      );
    },

    ubicarMes() {
      if (this.indice >= 0 && this.indice <= 11) {
        document.querySelector(`#btn_${this.indice}`).focus();
      } else {
        if (this.indice < 0) {
          this.indice = 0;
          document.querySelector(`#btn_${this.indice}`).focus();
        } else {
          this.indice = 12;
          this.datoCodFijo();
        }
      }
    },

    datoCodFijo() {
      if (this.reg_tarifa.contab.interfaz == "N") {
        this.datoInteres();
      } else {
        validarInputs(
          {
            form: "#cod_fijo",
            event_f3: this.datoInteres,
            event_f5: this.datoAño,
          },
          this.iniciarTabla,
          () => {
            if (!this.reg_tarifa.contab.cod_fijo.trim()) {
              this.datoCodBasi();
            } else {
              let busqueda = this.array_cuentas.find((e) => e.LLAVE_MAE == `${this.reg_tarifa.contab.cod_fijo}4`);
              if (busqueda) this.datoCodBasi();
              else {
                CON851("", "01", null, "error", "Error");
                this.datoCodFijo();
              }
            }
          }
        );
      }
    },

    datoCodBasi() {
      validarInputs(
        {
          form: "#cod_basi",
          event_f3: this.datoInteres,
          event_f5: this.datoAño,
        },
        this.datoCodFijo,
        () => {
          if (!this.reg_tarifa.contab.cod_basi.trim()) {
            this.datoCodComp();
          } else {
            let busqueda = this.array_cuentas.find((e) => e.LLAVE_MAE == `${this.reg_tarifa.contab.cod_basi}4`);
            if (busqueda) this.datoCodComp();
            else {
              CON851("", "01", null, "error", "Error");
              this.datoCodBasi();
            }
          }
        }
      );
    },

    datoCodComp() {
      validarInputs(
        {
          form: "#cod_comp",
          event_f3: this.datoInteres,
          event_f5: this.datoAño,
        },
        this.datoCodBasi,
        () => {
          if (!this.reg_tarifa.contab.cod_comp.trim()) {
            this.datoCodSunt();
          } else {
            let busqueda = this.array_cuentas.find((e) => e.LLAVE_MAE == `${this.reg_tarifa.contab.cod_comp}4`);
            if (busqueda) this.datoCodSunt();
            else {
              CON851("", "01", null, "error", "Error");
              this.datoCodComp();
            }
          }
        }
      );
    },

    datoCodSunt() {
      validarInputs(
        {
          form: "#cod_sunt",
          event_f3: this.datoInteres,
          event_f5: this.datoAño,
        },
        this.datoCodComp,
        () => {
          if (!this.reg_tarifa.contab.cod_sunt.trim()) {
            this.datoCodSubs();
          } else {
            let busqueda = this.array_cuentas.find((e) => e.LLAVE_MAE == `${this.reg_tarifa.contab.cod_sunt}4`);
            if (busqueda) this.datoCodSubs();
            else {
              CON851("", "01", null, "error", "Error");
              this.datoCodSunt();
            }
          }
        }
      );
    },

    datoCodSubs() {
      validarInputs(
        {
          form: "#cod_subs",
          event_f3: this.datoInteres,
          event_f5: this.datoAño,
        },
        this.datoCodSunt,
        () => {
          if (!this.reg_tarifa.contab.cod_subs.trim()) {
            this.datoCodOtro();
          } else {
            let busqueda = this.array_cuentas.find((e) => e.LLAVE_MAE == `${this.reg_tarifa.contab.cod_subs}4`);
            if (busqueda) this.datoCodOtro();
            else {
              CON851("", "01", null, "error", "Error");
              this.datoCodSubs();
            }
          }
        }
      );
    },

    datoCodOtro() {
      validarInputs(
        {
          form: "#cod_otr",
          event_f3: this.datoInteres,
          event_f5: this.datoAño,
        },
        this.datoCodSubs,
        () => {
          if (!this.reg_tarifa.contab.cod_otr.trim()) {
            this.datoCodNeto();
          } else {
            let busqueda = this.array_cuentas.find((e) => e.LLAVE_MAE == `${this.reg_tarifa.contab.cod_otr}4`);
            if (busqueda) this.datoCodNeto();
            else {
              CON851("", "01", null, "error", "Error");
              this.datoCodOtro();
            }
          }
        }
      );
    },

    datoCodNeto() {
      validarInputs(
        {
          form: "#cod_neto",
          event_f3: this.datoInteres,
          event_f5: this.datoAño,
        },
        this.datoCodOtro,
        () => {
          if (!this.reg_tarifa.contab.cod_neto.trim()) {
            this.datoInteres();
          } else {
            let busqueda = this.array_cuentas.find((e) => e.LLAVE_MAE == `${this.reg_tarifa.contab.cod_neto}4`);
            if (busqueda) this.datoInteres();
            else {
              CON851("", "01", null, "error", "Error");
              this.datoCodNeto();
            }
          }
        }
      );
    },

    datoInteres() {
      if (!this.reg_tarifa.tasa_int.trim()) this.reg_tarifa.tasa_int = $_USUARIO_EMPRESA.INT_MENSUAL_MORA;

      validarInputs(
        {
          form: "#tasa_int",
          event_f5: this.datoAño,
        },
        this.datoCodNeto,
        () => {
          Vue.set(this.reg_tarifa, "tasa_int", this.mascara5.resolve(this.reg_tarifa.tasa_int));
          this.confirmar();
        }
      );
    },

    confirmar() {
      CON851P("01", this.datoFijo, this.grabar);
    },

    async grabar() {
      loader("show");

      this.reg_tarifa.tn_resi_apro = format_op(this.reg_tarifa.tn_resi_apro).toString();
      this.reg_tarifa.tn_resi_rech = format_op(this.reg_tarifa.tn_resi_rech).toString();
      this.reg_tarifa.base_vba = format_op(this.reg_tarifa.base_vba).toString();

      for (let i in this.reg_tarifa.tabla) {
        this.reg_tarifa.tabla[i].car_fijo = format_op(this.reg_tarifa.tabla[i].car_fijo).toString();
        this.reg_tarifa.tabla[i].con_basi = format_op(this.reg_tarifa.tabla[i].con_basi).toString();
        this.reg_tarifa.tabla[i].con_comp = format_op(this.reg_tarifa.tabla[i].con_comp).toString();
        this.reg_tarifa.tabla[i].con_sunt = format_op(this.reg_tarifa.tabla[i].con_sunt).toString();
        this.reg_tarifa.tabla[i].subsid = format_op(this.reg_tarifa.tabla[i].subsid).toString();
        this.reg_tarifa.tabla[i].otro = format_op(this.reg_tarifa.tabla[i].otro).toString();
        this.reg_tarifa.tabla[i].neto = format_op(this.reg_tarifa.tabla[i].neto).toString();
      }

      for (let i in this.reg_tarifa.tabla2) {
        this.reg_tarifa.tabla2[i].tn_resi_limp = format_op(this.reg_tarifa.tabla2[i].tn_resi_limp).toString();
        this.reg_tarifa.tabla2[i].tn_resi_barr = format_op(this.reg_tarifa.tabla2[i].tn_resi_barr).toString();
        this.reg_tarifa.tabla2[i].tn_resi_noap = format_op(this.reg_tarifa.tabla2[i].tn_resi_noap).toString();
        this.reg_tarifa.tabla2[i].comp1 = format_op(this.reg_tarifa.tabla2[i].comp1).toString();
        this.reg_tarifa.tabla2[i].comp2 = format_op(this.reg_tarifa.tabla2[i].comp2).toString();
        this.reg_tarifa.tabla2[i].comp3 = format_op(this.reg_tarifa.tabla2[i].comp3).toString();
        this.reg_tarifa.tabla2[i].comp4 = format_op(this.reg_tarifa.tabla2[i].comp4).toString();
        this.reg_tarifa.tabla2[i].comp5 = format_op(this.reg_tarifa.tabla2[i].comp5).toString();
        this.reg_tarifa.tabla2[i].comp6 = format_op(this.reg_tarifa.tabla2[i].comp6).toString();
        this.reg_tarifa.tabla2[i].comp7 = format_op(this.reg_tarifa.tabla2[i].comp7).toString();
        this.reg_tarifa.tabla2[i].comp8 = format_op(this.reg_tarifa.tabla2[i].comp8).toString();
        this.reg_tarifa.tabla2[i].comp9 = format_op(this.reg_tarifa.tabla2[i].comp9).toString();
        this.reg_tarifa.tabla2[i].comp10 = format_op(this.reg_tarifa.tabla2[i].comp10).toString();
      }

      let datos = _getObjetoSave(this.reg_tarifa, ["tabla", "tabla2", "tabla_compon"]);

      datos = {
        ...datos,
        novedad: this.novedad,
        datosh: moduloDatosEnvio() + localStorage.Usuario + "|",
      };

      postData(datos, get_url("app/SERVDOM/PUB102.DLL"))
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
          this.datoInteres();
        });
    },

    // inicia componente para acueducto y alcantarillado
    ventanaFrecuencia_AcueAlc() {
      this.mostrar_comp_AcueAlc = true;
      this.datoComp1_AcueAlc();
    },

    datoComp1_AcueAlc() {
      validarInputs(
        {
          form: `#CMO`,
          event_f9: () => {
            this.dato_f9_comp("datoComp1_AcueAlc");
          },
        },
        () => {
          this.mostrar_comp_AcueAlc = false;
          this.datoFijo2();
        },
        () => {
          Vue.set(this.componente, "comp2", this.mascara9.resolve(this.componente.comp2.toString().trim()));
          this.datoComp2_AcueAlc();
        }
      );
    },

    datoComp2_AcueAlc() {
      validarInputs(
        {
          form: `#CMI`,
        },
        () => {
          this.datoComp1_AcueAlc();
        },
        () => {
          Vue.set(this.componente, "comp3", this.mascara9.resolve(this.componente.comp3.toString().trim()));
          this.datoComp3_AcueAlc();
        }
      );
    },

    datoComp3_AcueAlc() {
      validarInputs(
        {
          form: `#CMT`,
        },
        () => {
          this.datoComp2_AcueAlc();
        },
        () => {
          Vue.set(this.componente, "comp4", this.mascara9.resolve(this.componente.comp4.toString().trim()));

          this.reg_tarifa.tabla2[this.indice] = this.componente;

          this.reg_tarifa.tabla[this.indice].con_basi =
            format_op(this.reg_tarifa.tabla2[this.indice].comp1) +
            format_op(this.reg_tarifa.tabla2[this.indice].comp2) +
            format_op(this.reg_tarifa.tabla2[this.indice].comp3) +
            format_op(this.reg_tarifa.tabla2[this.indice].comp4);

          Vue.set(
            this.reg_tarifa.tabla[this.indice],
            "con_basi",
            this.mascara9.resolve(this.reg_tarifa.tabla[this.indice].con_basi.toString().trim())
          );

          _fin_validar_form();
          this.$refs.btn_AcueAlc.focus();
        }
      );
    },

    callbackComp_AcueAlc() {
      _fin_validar_form();

      this.mostrar_comp_AcueAlc = false;
      this.valDatoBasico();
    },
    // termina componente para acueducto y alcantarillado

    // inicia componente para aseo
    ventanaFrecuencia() {
      this.reg_tarifa.tabla_compon = [
        { sigla_comp: "TC" },
        { sigla_comp: "TLU" },
        { sigla_comp: "TBL" },
        { sigla_comp: "TRT" },
        { sigla_comp: "TDF" },
        { sigla_comp: "TA" },
        { sigla_comp: "TTE" },
        { sigla_comp: "TTL" },
        { sigla_comp: "CCS" },
        { sigla_comp: "" },
      ];

      this.mostrar_comp_Aseo = true;
      this.datoFrecRec_Aseo();
    },

    datoFrecRec_Aseo() {
      validarInputs(
        {
          form: `#frec_rec`,
          event_f3: this.datoVba_Aseo,
          event_f9: () => {
            this.dato_f9_comp("datoFrecRec_Aseo");
          },
        },
        async () => {
          if (this.indice > 0) this.indice -= 1;
          this.mostrar_comp_Aseo = false;
          this.ubicarMes();
        },
        () => {
          if (this.reg_tarifa.frec_rec == 0) {
            CON851("", "02", null, "error", "Error");
            this.datoFrecRec_Aseo();
          } else {
            this.datoFrecBar_Aseo();
          }
        }
      );
    },

    datoFrecBar_Aseo() {
      validarInputs(
        {
          form: `#frec_bar`,
        },
        () => {
          this.datoFrecRec_Aseo();
        },
        () => {
          if (this.reg_tarifa.frec_bar == 0) {
            CON851("", "02", null, "error", "Error");
            this.datoFrecBar_Aseo();
          } else {
            this.datoAforo_Aseo();
          }
        }
      );
    },

    datoAforo_Aseo() {
      POPUP(
        {
          array: this.array_aforo,
          titulo: "AFORO",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: this.reg_tarifa.aforo || "1",
          callback_f: this.datoFrecBar_Aseo,
        },
        async (data) => {
          this.reg_tarifa.aforo = data.COD;
          this.datoPuerta_Aseo();
        }
      );
    },

    datoPuerta_Aseo() {
      validarInputs(
        {
          form: `#puerta`,
        },
        () => {
          this.datoAforo_Aseo();
        },
        () => {
          this.reg_tarifa.puerta = this.reg_tarifa.puerta.toUpperCase();
          if (this.reg_tarifa.puerta != "S") this.reg_tarifa.puerta = "N";
          this.datoComp_Aseo(1);
        }
      );
    },

    datoComp_Aseo(index) {
      validarInputs(
        {
          form: `#comp${index}_Aseo`,
        },
        () => {
          if (index == 1) this.datoPuerta_Aseo();
          else this.datoComp_Aseo(parseInt(index) - 1);
        },
        () => {
          Vue.set(
            this.componente,
            `comp${index}`,
            this.mascara9.resolve(this.componente[`comp${index}`].toString().trim())
          );
          if (index >= 9) {
            this.datoResiLimp_Aseo();
          } else {
            this.datoComp_Aseo(parseInt(index) + 1);
          }
        }
      );
    },

    datoResiLimp_Aseo() {
      validarInputs(
        {
          form: `#tn_resi_limp`,
        },
        () => {
          this.datoComp_Aseo(8);
        },
        () => {
          Vue.set(
            this.componente,
            "tn_resi_limp",
            this.mascara9.resolve(this.componente.tn_resi_limp.toString().trim())
          );
          this.datoResiBarr_Aseo();
        }
      );
    },

    datoResiBarr_Aseo() {
      validarInputs(
        {
          form: `#tn_resi_barr`,
        },
        () => {
          this.datoResiLimp_Aseo();
        },
        () => {
          Vue.set(
            this.componente,
            "tn_resi_barr",
            this.mascara9.resolve(this.componente.tn_resi_barr.toString().trim())
          );
          this.datoResiNoap_Aseo();
        }
      );
    },

    datoResiNoap_Aseo() {
      validarInputs(
        {
          form: `#tn_resi_noap`,
        },
        () => {
          this.datoResiBarr_Aseo();
        },
        () => {
          Vue.set(
            this.componente,
            "tn_resi_noap",
            this.mascara9.resolve(this.componente.tn_resi_noap.toString().trim())
          );
          this.datoResiApro_Aseo();
        }
      );
    },

    datoResiApro_Aseo() {
      validarInputs(
        {
          form: `#tn_resi_apro`,
        },
        () => {
          this.datoResiNoap_Aseo();
        },
        () => {
          Vue.set(
            this.reg_tarifa,
            "tn_resi_apro",
            this.mascara9.resolve(this.reg_tarifa.tn_resi_apro.toString().trim())
          );
          this.datoResiRech_Aseo();
        }
      );
    },

    datoResiRech_Aseo() {
      validarInputs(
        {
          form: `#tn_resi_rech`,
        },
        () => {
          this.datoResiApro_Aseo();
        },
        () => {
          Vue.set(
            this.reg_tarifa,
            "tn_resi_rech",
            this.mascara9.resolve(this.reg_tarifa.tn_resi_rech.toString().trim())
          );
          this.datoVba_Aseo();
        }
      );
    },

    datoVba_Aseo() {
      validarInputs(
        {
          form: `#base_vba`,
        },
        () => {
          this.datoResiRech_Aseo();
        },
        () => {
          Vue.set(this.reg_tarifa, "base_vba", this.mascara11.resolve(this.reg_tarifa.base_vba.toString().trim()));
          this.$refs.btn_Aseo.focus();
        }
      );
    },

    callbackComp_Aseo() {
      _fin_validar_form();

      this.reg_tarifa.tabla[this.indice].car_fijo = this.total_comp_Aseo;

      this.mostrar_comp_Aseo = false;
      this.datoFijo2();
    },

    _ventanaServicios() {
      _ventanaDatos({
        titulo: "Ventana de Servicios P.Q.R.",
        columnas: ["cod", "descrip"],
        data: this.array_serv,
        callback_esc: () => {
          document.querySelector(".serv").focus();
        },
        callback: (data) => {
          this.reg_tarifa.serv = data.cod;
          setTimeout(() => {
            _enterInput(".serv");
          }, 200);
        },
      });
    },

    _ventanaEstratos() {
      for (let i in this.array_tarifas) {
        this.array_tarifas[i].cod = this.array_tarifas[i].llave.slice(4);
      }
      _ventanaDatos({
        titulo: "Ventana de Consulta de Tarifas por Periodo",
        columnas: ["cod", "descrip", "clase", "medic"],
        data: this.array_tarifas,
        callback_esc: () => {
          document.querySelector(".estrato").focus();
        },
        callback: (data) => {
          this.reg_tarifa.estrato = data.cod.slice(1, 2);
          this.reg_tarifa.tarifa = data.cod.slice(2);
          setTimeout(() => {
            _enterInput(".estrato");
          }, 200);
        },
      });
    },

    _ventanaUsosTarif() {
      _ventanaDatos({
        titulo: "Ventana de Usos de Tarifas",
        columnas: ["cod", "descrip"],
        data: this.array_uso_tarif,
        callback_esc: () => {
          document.querySelector(".tarifa").focus();
        },
        callback: (data) => {
          this.reg_tarifa.tarifa = data.cod;
          setTimeout(() => {
            _enterInput(".tarifa");
          }, 200);
        },
      });
    },

    _ventanaCentroCostos() {
      _ventanaDatos({
        titulo: "Ventana de Centros de Costos",
        columnas: ["COD", "NOMBRE", "DESCRIP"],
        data: this.array_centros_costos,
        callback_esc: () => {
          document.querySelector(".c_costo").focus();
        },
        callback: (data) => {
          this.reg_tarifa.contab.c_costo = data.COD;
          setTimeout(() => {
            _enterInput(".c_costo");
          }, 200);
        },
      });
    },
    _ventanaCuentas(variable) {
      for (let i in this.array_cuentas) {
        this.array_cuentas[i].CUENTA = this.array_cuentas[i].LLAVE_MAE.slice(0, 11);
        this.array_cuentas[i].NOMBRE = this.array_cuentas[i].NOMBRE_MAE;
        this.array_cuentas[i].NIVEL = this.array_cuentas[i].TIPO_MAE;
        this.array_cuentas[i].PORCENT = this.array_cuentas[i].PORCENT_RET == 0 ? "" : this.array_cuentas[i].PORCENT_RET;
      }
      _ventanaDatos({
        titulo: "Ventana de Plan de Cuentas",
        columnas: ["CUENTA", "NOMBRE", "NIVEL", "PORCENT"],
        data: this.array_cuentas,
        callback_esc: () => {
          document.querySelector(`.${variable}`).focus();
        },
        callback: (data) => {
          this.reg_tarifa.contab[variable] = data.LLAVE_MAE.slice(0, 11);
          setTimeout(() => {
            _enterInput(`.${variable}`);
          }, 200);
        },
      });
    },

    traerServicios() {
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB781.DLL"))
        .then((data) => {
          this.array_serv = data.SERVPQR;
          this.traerUsoTarif();
        })
        .catch((error) => {
          loader("hide");
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          _toggleNav();
        });
    },

    traerTarifas() {
      return new Promise((resolve, reject) => {
        loader("show");
        postData(
          {
            datosh: moduloDatosEnvio() + this.reg_tarifa.ano + "|" + this.reg_tarifa.serv + "|",
          },
          get_url("app/SERVDOM/PUB805.DLL")
        )
          .then((data) => {
            loader("hide");
            this.array_tarifas = data.TARIFAS;
            resolve();
          })
          .catch((error) => {
            loader("hide");
            if (!error.STATUS) CON851("", "Error consultando datos", null, "error", "Error");
            reject(error);
          });
      });
    },

    traerUsoTarif() {
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB806.DLL"))
        .then((data) => {
          this.array_uso_tarif = data.USTAR;
          this.traerCentroCostos();
        })
        .catch((error) => {
          loader("hide");
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          _toggleNav();
        });
    },

    traerCentroCostos() {
      postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON803.DLL"))
        .then((data) => {
          this.array_centros_costos = data.COSTO;
          this.array_centros_costos.pop();
          this.traerCuentas();
        })
        .catch((error) => {
          loader("hide");
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          _toggleNav();
        });
    },

    traerCuentas() {
      postData({ datosh: datosEnvio() + "4|" }, get_url("app/CONTAB/CON801.DLL"))
        .then((data) => {
          this.array_cuentas = data.MAESTROS;
          this.array_cuentas.pop();
          loader("hide");
          this._ventanaNovedad();
        })
        .catch((error) => {
          loader("hide");
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          _toggleNav();
        });
    },

    flecha_arriba() {
      _fin_validar_form();

      setTimeout(() => {
        if (this.indice > 0) {
          this.indice -= 1;
          document.querySelector(`#btn_${this.indice}`).focus();
        } else {
          document.querySelector(`#btn_0`).focus();
        }
      }, 200);
    },

    flecha_abajo() {
      _fin_validar_form();

      setTimeout(() => {
        if (this.indice < 11) {
          this.indice += 1;
          document.querySelector(`#btn_${this.indice}`).focus();
        } else {
          document.querySelector(`#btn_11`).focus();
        }
      }, 200);
    },

    callbackBtn_mes(index) {
      _fin_validar_form();

      this.indice = index;
      this.datoFijo();
    },

    callbackEscBtn_mes(index) {
      _fin_validar_form();

      this.indice = index;
      if (index == 0) this.datoInterfaz();
      else {
        this.indice -= 1;
        document.querySelector(`#btn_${this.indice}`).focus();
      }
    },

    dato_f9(callback) {
      if (this.indice > 0) {
        this.reg_tarifa.tabla[this.indice].car_fijo = this.reg_tarifa.tabla[parseInt(this.indice) - 1].car_fijo;
        this.reg_tarifa.tabla[this.indice].con_basi = this.reg_tarifa.tabla[parseInt(this.indice) - 1].con_basi;
        this.reg_tarifa.tabla[this.indice].con_comp = this.reg_tarifa.tabla[parseInt(this.indice) - 1].con_comp;
        this.reg_tarifa.tabla[this.indice].con_sunt = this.reg_tarifa.tabla[parseInt(this.indice) - 1].con_sunt;
        this.reg_tarifa.tabla[this.indice].subsid = this.reg_tarifa.tabla[parseInt(this.indice) - 1].subsid;
        this.reg_tarifa.tabla[this.indice].otro = this.reg_tarifa.tabla[parseInt(this.indice) - 1].otro;
        this.reg_tarifa.tabla[this.indice].neto = this.reg_tarifa.tabla[parseInt(this.indice) - 1].neto;
        this.reg_tarifa.tabla[this.indice].cant_kva = this.reg_tarifa.tabla[parseInt(this.indice) - 1].cant_kva;

        this.componente.tn_resi_limp = this.reg_tarifa.tabla2[parseInt(this.indice) - 1].tn_resi_limp;
        this.componente.tn_resi_barr = this.reg_tarifa.tabla2[parseInt(this.indice) - 1].tn_resi_barr;
        this.componente.tn_resi_noap = this.reg_tarifa.tabla2[parseInt(this.indice) - 1].tn_resi_noap;
        this.componente.comp1 = this.reg_tarifa.tabla2[parseInt(this.indice) - 1].comp1;
        this.componente.comp2 = this.reg_tarifa.tabla2[parseInt(this.indice) - 1].comp2;
        this.componente.comp3 = this.reg_tarifa.tabla2[parseInt(this.indice) - 1].comp3;
        this.componente.comp4 = this.reg_tarifa.tabla2[parseInt(this.indice) - 1].comp4;
        this.componente.comp5 = this.reg_tarifa.tabla2[parseInt(this.indice) - 1].comp5;
        this.componente.comp6 = this.reg_tarifa.tabla2[parseInt(this.indice) - 1].comp6;
        this.componente.comp7 = this.reg_tarifa.tabla2[parseInt(this.indice) - 1].comp7;
        this.componente.comp8 = this.reg_tarifa.tabla2[parseInt(this.indice) - 1].comp8;
        this.componente.comp9 = this.reg_tarifa.tabla2[parseInt(this.indice) - 1].comp9;
        this.componente.comp10 = this.reg_tarifa.tabla2[parseInt(this.indice) - 1].comp10;
      }
      this[callback]();
    },

    dato_f9_comp(callback) {
      if (this.indice > 0) {
        this.componente.tn_resi_limp = this.reg_tarifa.tabla2[parseInt(this.indice) - 1].tn_resi_limp;
        this.componente.tn_resi_barr = this.reg_tarifa.tabla2[parseInt(this.indice) - 1].tn_resi_barr;
        this.componente.tn_resi_noap = this.reg_tarifa.tabla2[parseInt(this.indice) - 1].tn_resi_noap;
        this.componente.comp1 = this.reg_tarifa.tabla2[parseInt(this.indice) - 1].comp1;
        this.componente.comp2 = this.reg_tarifa.tabla2[parseInt(this.indice) - 1].comp2;
        this.componente.comp3 = this.reg_tarifa.tabla2[parseInt(this.indice) - 1].comp3;
        this.componente.comp4 = this.reg_tarifa.tabla2[parseInt(this.indice) - 1].comp4;
        this.componente.comp5 = this.reg_tarifa.tabla2[parseInt(this.indice) - 1].comp5;
        this.componente.comp6 = this.reg_tarifa.tabla2[parseInt(this.indice) - 1].comp6;
        this.componente.comp7 = this.reg_tarifa.tabla2[parseInt(this.indice) - 1].comp7;
        this.componente.comp8 = this.reg_tarifa.tabla2[parseInt(this.indice) - 1].comp8;
        this.componente.comp9 = this.reg_tarifa.tabla2[parseInt(this.indice) - 1].comp9;
        this.componente.comp10 = this.reg_tarifa.tabla2[parseInt(this.indice) - 1].comp10;
      }
      this[callback]();
    },
  },
});
