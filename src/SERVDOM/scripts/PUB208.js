// Importa lecturas csv - 2-8 - David.M - 28/07/2021

const { regs_dom } = require("../../SERVDOM/scripts/regs_dom.js");
const {
  mascara_valor_2,
  format_op,
  _ventana_PUB801,
  mascara11,
  _ventana_PUB808,
} = require("../../SERVDOM/scripts/globalDom.js");

var _this = new Vue({
  el: "#PUB208",
  data: {
    params_CLAVE: {
      estado: false,
    },
    mostrar_CLAVE: false,

    nom_arch: "",
    indice: 0,
    indice_max: 0,
    sw_error: 0,
    reg_act_csv: {},
    mensaje_w: "",

    ano_gen: "",
    mes_gen: "",
    nom_fac: "",
    sw_nuevos: 0,
    nro_med_w: "",
    servicio: "",
    serv_w: 0,

    acum_consu_w: 0,
    item_consu_w: 0,
    consumo_est_w: 0,
    consumo_w: 0,
    reg_tar: regs_dom.TARIF(),
    descrip_noved: "",
    mt_basic_w: "",
    mt_compl_w: "",
    mt_suntu_w: "",
    vr_basic_w: "",
    vr_compl_w: "",
    vr_suntu_w: "",
    vr_total_w: "",
    indice_k: 0,
    reg_fact: regs_dom.FACT(),
    reg_usuar_ser: regs_dom.USUAR_SER(),
    reg_lect: regs_dom.CONFIG_LECT(),
    array_serv: [],
    array_tarifas: [],
    array_lect: [],
    fecha_act: moment().format("YYYYMMDD"),
  },
  created() {
    nombreOpcion("2-8 - Actualización de Lecturas datos tomados desde Archivo Plano");
    _inputControl("reset");
    _inputControl("disabled");
    this.datoClave();
  },
  components: {
    clave: require("../../SERVDOM/scripts/clave.vue"),
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

    abrirArchivo() {
      loader("hide");
      this.$refs.btn_adj.focus();

      //   this.nom_fac = `${$_USUARIO_EMPRESA.ULT_PER.slice(0, 4)}${$_USUARIO_EMPRESA.ULT_PER.slice(4)}`;
      //   this.datoFechaArchivo();
    },

    callbackBtn() {
      _fin_validar_form();
      let archivos = document.getElementById("archivo_lect").files;

      if (archivos.length > 0) {
        let plano = archivos[0];
        var reader = new FileReader();
        reader.onload = (e) => {
          let string = reader.result;
          var lineas = string.split(/\n/).map((lineStr) => lineStr.split(","));

          //   lineas.pop();
          this.array_datos = lineas;
          this.indice = 0;
          this.indice_max = this.array_datos.length - 1;
          if (this.array_datos.length > 0) {
            this.datoFechaArchivo();
          } else {
            CON851("", "Datos no encontrados", null, "error", "Error");
            this.abrirArchivo();
          }
        };
        reader.readAsText(plano, "ISO-8859-1");
      } else {
        CON851("", "Debes seleccionar una archivo plano", null, "error", "Error");
      }

      console.log(archivos);
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
      this.nom_fac = `${this.ano_gen}${this.mes_gen}`;
      loader("show");
      postData({ datosh: moduloDatosEnvio() + this.nom_fac + "|1|" }, get_url("app/SERVDOM/PUB201_02.DLL"))
        .then((data) => {
          if (data == 8) this.datoServicio();
          else {
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

    datoServicio() {
      validarInputs(
        {
          form: "#servicio",
        },
        _toggleNav,
        () => {
          let busqueda = this.array_serv.find((e) => e.cod == this.servicio);
          if (!busqueda) {
            CON851("", "01", null, "error", "Error");
            this.datoServicio();
          } else {
            if (this.servicio == 2 || this.servicio == 4) {
              CON851("", "01", null, "error", "Error");
              this.datoServicio();
            } else {
              this.serv_w = parseInt(this.servicio) - 1;
              this.leerDatos();
            }
          }
        }
      );
    },

    async leerDatos() {
      if (this.indice > this.indice_max) {
        _toggleNav();
      } else {
        this.reg_act_csv = {
          serv: this.array_datos[this.indice][0],
          cat: this.array_datos[this.indice][1],
          lec_act: this.array_datos[this.indice][2],
        };

        this.sw_error = 0;
        if (this.reg_act_csv.serv != this.servicio) this.sw_error = 1;

        postData(
          {
            datosh: moduloDatosEnvio() + "2|",
            fecha: this.nom_fac,
            cat: this.reg_act_csv.cat,
          },
          get_url("app/SERVDOM/PUB203_02.DLL")
        )
          .then(async (data) => {
            loader("hide");
            if (data.llave == 0) data.llave = "";

            if (!data.llave.trim()) {
              this.sw_error = 2;
            } else {
              this.reg_fact = Object.assign({}, data);
            }

            switch (this.sw_error) {
              case 1:
                this.mensaje_w = "ERROR EN SERVICIO";
                break;
              case 2:
                this.mensaje_w = "FACTURA NO EXISTE";
                break;
              default:
                this.mensaje_w = "";
                break;
            }

            if (this.sw_error > 0) {
              jAlert(
                {
                  titulo: "ERROR LEYENDO CSV",
                  mensaje: `${this.mensaje_w} - REGISTRO NRO: ${parseInt(this.indice) + 1}`,
                },
                () => {
                  this.indice += 1;
                  this.leerDatos();
                }
              );
            } else await this.cambio();
          })
          .catch((error) => {
            console.error(error);
            loader("hide");
            CON851("", "Error consultando datos", null, "error", "Error");
            _toggleNav();
          });
      }
    },

    async cambio() {
      if (this.ano_gen == 2009 && this.mes_gen == 03 && this.reg_fact.tabla.serv_tab[this.serv_w].lec_act_med == 0) {
        this.reg_fact.tabla.serv_tab[this.serv_w].lec_act_med = this.reg_act_csv.lec_act;
      } else {
        this.reg_fact.tabla.serv_tab[this.serv_w].lec_prx_med = this.reg_act_csv.lec_act;
      }

      await this.mostrarDatos();

      if (format_op(this.reg_fact.tabla.serv_tab[this.serv_w].lec_prx_med) > 0) {
        this.calcularConsumo()
          .then(() => {
            this.depurarNovedad();
          })
          .catch((error) => {
            console.log(error);
            this.datoPrx();
          });
      } else if (format_op(this.reg_fact.tabla.serv_tab[this.serv_w].lec_act_med) > 0) {
        this.datoPrx();
      } else if (format_op(this.reg_fact.tabla.serv_tab[this.serv_w].lec_ant_med) > 0) {
        this.datoAct();
      } else {
        this.datoAnt();
      }
    },

    datoAnt() {
      validarInputs(
        {
          form: "#lec_ant",
          event_f5: _toggleNav,
        },
        () => {
          if (this.indice > 0) {
            this.indice -= 1;
            this.leerDatos();
          } else {
            this.indice = 0;
            this.datoServicio();
          }
        },
        () => {
          this.reg_fact.tabla.serv_tab[this.serv_w].lec_ant_med = mascara11.resolve(
            format_op(this.reg_fact.tabla.serv_tab[this.serv_w].lec_ant_med).toString()
          );
          this.datoAct();
        }
      );
    },

    datoAct() {
      validarInputs(
        {
          form: "#lec_act",
          event_f5: this.datoAnt,
        },
        () => {
          if (this.indice > 0) {
            this.indice -= 1;
            this.leerDatos();
          } else {
            this.datoServicio();
          }
        },
        () => {
          this.reg_fact.tabla.serv_tab[this.serv_w].lec_act_med = mascara11.resolve(
            format_op(this.reg_fact.tabla.serv_tab[this.serv_w].lec_act_med).toString()
          );
          this.datoPrx();
        }
      );
    },

    datoPrx() {
      validarInputs(
        {
          form: "#lec_prx",
          event_f5: this.datoAct,
        },
        () => {
          if (this.indice > 0) {
            this.indice -= 1;
            this.leerDatos();
          } else {
            this.datoServicio();
          }
        },
        async () => {
          this.reg_fact.tabla.serv_tab[this.serv_w].lec_prx_med = mascara11.resolve(
            format_op(this.reg_fact.tabla.serv_tab[this.serv_w].lec_prx_med).toString()
          );
          this.calcularConsumo()
            .then(() => {
              this.depurarNovedad();
            })
            .catch((error) => {
              console.error(error);
              this.datoPrx();
            });
        }
      );
    },

    calcularConsumo() {
      return new Promise((resolve, reject) => {
        if (
          format_op(this.reg_fact.tabla.serv_tab[this.serv_w].lec_prx_med) <
          format_op(this.reg_fact.tabla.serv_tab[this.serv_w].lec_act_med)
        ) {
          CON851("", "34", null, "error", "Error");
          reject("34");
        } else {
          this.consumo_est_w =
            format_op(this.reg_fact.tabla.serv_tab[this.serv_w].lec_prx_med) -
            format_op(this.reg_fact.tabla.serv_tab[this.serv_w].lec_act_med);

          this.consumo_est_w = mascara11.resolve(format_op(this.consumo_est_w).toString());
          resolve();
        }
      });
    },

    depurarNovedad() {
      if (this.reg_fact.tabla.serv_tab[this.serv_w].datos_tab[0].mes == 0) {
        this.indice_k = format_op(this.mes_gen) - 1;
      } else {
        this.indice_k = format_op(this.reg_fact.tabla.serv_tab[this.serv_w].datos_tab[0].mes) - 1;
      }

      this.consumo_w = this.consumo_est_w;

      if (this.reg_fact.est < 4) this.consumo_limi_w = 200;
      else this.consumo_limi_w = 2000;

      if (
        format_op(this.consumo_est_w) < 1 ||
        format_op(this.consumo_est_w) > format_op(this.consumo_limi_w) ||
        this.reg_fact.tabla.serv_tab[this.serv_w].lec_prx_med == 0
      ) {
        this.aceptarNovedad();
      } else {
        this.distribuirConsumo();
      }
    },

    aceptarNovedad() {
      if (this.reg_fact.tabla.serv_tab[this.serv_w].noved_lect == 0) {
        this.llamar_PUB808();
      } else {
        validarInputs(
          {
            form: "#noved_lect",
          },
          this.datoPrx,
          () => {
            let novedad = this.reg_fact.tabla.serv_tab[this.serv_w].noved_lect;
            let busqueda = this.array_lect.find((e) => parseInt(e.codigo) == parseInt(novedad));
            if (busqueda) {
              this.reg_lect = Object.assign({}, busqueda);
              this.reg_fact.tabla.serv_tab[this.serv_w].noved_lect = busqueda.codigo;
              this.descrip_noved = busqueda.concep;
              this.leerNovedad();
            } else {
              CON851("", "01", null, "error", "Error");
              this.aceptarNovedad();
            }
          }
        );
      }
    },

    async leerNovedad() {
      let sw9 = 0;

      let novedad = this.reg_fact.tabla.serv_tab[this.serv_w].noved_lect;
      if (novedad < 1 || novedad > 20) {
        CON851("", "03", null, "error", "Error");
        this.aceptarNovedad();
      } else if (!this.descrip_noved.trim()) {
        CON851("", "01", null, "error", "Error");
        this.aceptarNovedad();
      } else {
        if (this.reg_lect.normal == "S") {
          this.consumo_w = this.consumo_est_w;
          sw9 = 1;
          this.distribuirConsumo();
        } else {
          if (this.reg_lect.increm == "N" && this.reg_fact.tabla.serv_tab[this.serv_w].lec_prx_med == 0) {
            this.reg_fact.tabla.serv_tab[this.serv_w].lec_prx_med =
              this.reg_fact.tabla.serv_tab[this.serv_w].lec_act_med;

            this.reg_fact.tabla.serv_tab[this.serv_w].lec_prx_med = mascara11.resolve(
              format_op(this.reg_fact.tabla.serv_tab[this.serv_w].lec_prx_med).toString()
            );
          }

          if (this.reg_lect.promed == "S") {
            this.consumo_w = this.promedio_w;
            if (this.reg_lect.increm == "S") {
              this.reg_fact.tabla.serv_tab[this.serv_w].lec_prx_med =
                format_op(this.reg_fact.tabla.serv_tab[this.serv_w].lec_act_med) + format_op(this.consumo_w);

              this.reg_fact.tabla.serv_tab[this.serv_w].lec_prx_med = mascara11.resolve(
                format_op(this.reg_fact.tabla.serv_tab[this.serv_w].lec_prx_med).toString()
              );

              sw9 = 1;
              this.distribuirConsumo();
            }
          }

          if (this.reg_lect.consum > 0 && sw9 == 0) {
            this.consumo_w = this.reg_lect.consum;
            if (this.reg_lect.increm == "S") {
              this.reg_fact.tabla.serv_tab[this.serv_w].lec_prx_med =
                format_op(this.reg_fact.tabla.serv_tab[this.serv_w].lec_act_med) + format_op(this.consumo_w);

              this.reg_fact.tabla.serv_tab[this.serv_w].lec_prx_med = mascara11.resolve(
                format_op(this.reg_fact.tabla.serv_tab[this.serv_w].lec_prx_med).toString()
              );

              sw9 = 1;
              this.distribuirConsumo();
            }
          }

          if (this.reg_lect.invert == "S" && format_op(this.consumo_est_w) < 0 && sw9 == 0) {
            this.consumo_w = format_op(this.consumo_est_w) * -1;
          }

          if (sw9 == 0) this.distribuirConsumo();
        }
      }
    },

    async distribuirConsumo() {
      if (this.consumo_w < 0) this.consumo_w = 0;

      if (format_op(this.consumo_w) <= format_op(this.reg_tar.cant_basi) || format_op(this.reg_tar.cant_basi) == 0) {
        this.mt_basic_w = this.consumo_w;
        this.mt_compl_w = this.mt_suntu_w = 0;
      } else if (
        format_op(this.consumo_w) <= format_op(this.reg_tar.cant_comp) ||
        format_op(this.reg_tar.cant_comp) == 0
      ) {
        this.mt_basic_w = this.reg_tar.cant_basi;
        this.mt_compl_w = format_op(this.consumo_w) - format_op(this.mt_basic_w);
        this.mt_suntu_w = 0;
      } else {
        this.mt_basic_w = this.reg_tar.cant_basi;
        this.mt_compl_w = this.reg_tar.cant_comp;
        this.mt_suntu_w = format_op(this.consumo_w) - format_op(this.mt_basic_w) - format_op(this.mt_compl_w);
      }

      this.vr_basic_w = format_op(this.mt_basic_w) * format_op(this.reg_tar.tabla[this.indice_k].con_basi);
      this.vr_compl_w = format_op(this.mt_compl_w) * format_op(this.reg_tar.tabla[this.indice_k].con_comp);
      this.vr_suntu_w = format_op(this.mt_suntu_w) * format_op(this.reg_tar.tabla[this.indice_k].con_sunt);

      this.mt_basic_w = mascara11.resolve(format_op(this.mt_basic_w).toString());
      this.mt_compl_w = mascara11.resolve(format_op(this.mt_compl_w).toString());
      this.mt_suntu_w = mascara11.resolve(format_op(this.mt_suntu_w).toString());
      this.consumo_w = mascara11.resolve(format_op(this.consumo_w).toString());

      this.reg_tar.tabla[this.indice_k].con_basi = mascara_valor_2.resolve(
        this.reg_tar.tabla[this.indice_k].con_basi.toString()
      );
      this.reg_tar.tabla[this.indice_k].con_comp = mascara_valor_2.resolve(
        this.reg_tar.tabla[this.indice_k].con_comp.toString()
      );
      this.reg_tar.tabla[this.indice_k].con_sunt = mascara_valor_2.resolve(
        this.reg_tar.tabla[this.indice_k].con_sunt.toString()
      );

      this.vr_basic_w = mascara_valor_2.resolve(this.vr_basic_w.toString());
      this.vr_compl_w = mascara_valor_2.resolve(this.vr_compl_w.toString());
      this.vr_suntu_w = mascara_valor_2.resolve(this.vr_suntu_w.toString());

      this.vr_total_w = format_op(this.vr_basic_w) + format_op(this.vr_compl_w) + format_op(this.vr_suntu_w);
      this.vr_total_w = mascara_valor_2.resolve(this.vr_total_w.toString());

      // this.confirmar();
      this.datoObserv();
    },

    datoObserv() {
      validarInputs(
        {
          form: "#observ",
        },
        this.datoAct,
        () => {
          this.reg_fact.observ = this.reg_fact.observ.replaceEsp();
          this.llamarDLL();
        }
      );
    },

    confirmar() {
      // this.llamarDLL();
      // CON851P("01", this.datoObserv, this.llamarDLL);
    },

    async llamarDLL() {
      loader("show");

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
        datosh: moduloDatosEnvio() + localStorage.Usuario + "|" + this.nom_fac + "|2|",
      };

      _this.datos = datos;
      console.log(datos, "datos 2");

      postData(datos, get_url("app/SERVDOM/SAVE_FACT.DLL"))
        .then((data) => {
          console.log(data);
          if (data == 8) CON851("", "Modificado correctamente", null, "success", "");
          loader("hide");
          this.indice += 1;
          this.leerDatos();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error intentando grabar", null, "error", "Error");
          loader("hide");
          this.datoObserv();
        });
    },

    async mostrarDatos() {
      loader("show");
      return new Promise(async (resolve) => {
        await this.leerRegUsuarSer();

        await this.buscarTarifa();
        await this.buscarMedidor();

        let ano_tar_w = "",
          serv_tar_w = "",
          estrato_tar_w = "",
          tarifa_tar_w = "";

        if (this.reg_fact.tabla.serv_tab[this.serv_w].datos_tab[0].ano == 0) {
          ano_tar_w = this.ano_gen;
        } else {
          ano_tar_w = this.reg_fact.tabla.serv_tab[this.serv_w].datos_tab[0].ano;
        }
        serv_tar_w = this.servicio;
        estrato_tar_w = this.reg_fact.tabla.serv_tab[this.serv_w].datos_tab[0].conc.slice(1, 2);
        tarifa_tar_w = this.reg_fact.tabla.serv_tab[this.serv_w].datos_tab[0].conc.slice(2);

        let llave = `${ano_tar_w}${serv_tar_w}${estrato_tar_w}${tarifa_tar_w}`;
        let busqueda = this.array_tarifas.find((e) => e.llave == llave);
        if (!busqueda) {
          this.reg_tar = regs_dom.TARIF();
          this.reg_tar.descrip = "ERROR EN TARIFA";
        } else {
          this.reg_tar = Object.assign({}, busqueda);
        }

        this.reg_fact.tabla.serv_tab[this.serv_w].lec_ant_med = mascara11.resolve(
          format_op(this.reg_fact.tabla.serv_tab[this.serv_w].lec_ant_med).toString()
        );
        this.reg_fact.tabla.serv_tab[this.serv_w].lec_act_med = mascara11.resolve(
          format_op(this.reg_fact.tabla.serv_tab[this.serv_w].lec_act_med).toString()
        );
        this.reg_fact.tabla.serv_tab[this.serv_w].lec_prx_med = mascara11.resolve(
          format_op(this.reg_fact.tabla.serv_tab[this.serv_w].lec_prx_med).toString()
        );

        this.acum_consu_w = 0;
        this.item_consu_w = 0;
        await this.sumarPromedio();

        if (this.item_consu_w == 0) {
          this.promedio_w = 20;
        } else {
          this.promedio_w = format_op(this.acum_consu_w) / format_op(this.item_consu_w);
        }

        this.promedio_w = mascara11.resolve(format_op(this.promedio_w).toString());

        this.calcularConsumo()
          .then(() => {
            loader("hide");
            resolve();
          })
          .catch((error) => {
            console.error(error);
            this.datoPrx();
          });
      });
    },

    leerRegUsuarSer() {
      return new Promise(async (resolve) => {
        postData(
          {
            datosh: moduloDatosEnvio() + this.reg_fact.cat + "|" + $_USUARIO_EMPRESA.ULT_PER.slice(0, 4) + "|",
          },
          get_url("app/SERVDOM/PUB801_01.DLL")
        )
          .then((data) => {
            if (data.nro_cat) {
              this.reg_usuar_ser = data;
            } else {
              this.reg_usuar_ser.nombre = "USUARIO NO EXISTE";
              this.reg_usuar_ser.direcc = "";
            }
            this.reg_fact.tabla.serv_tab[this.serv_w].datos_tab[0].estr = this.reg_usuar_ser.estrato;
            loader("hide");
            resolve();
          })
          .catch((error) => {
            console.error(error);
            CON851("", "Error consultando datos", null, "error", "Error");
            loader("hide");
            this.datoFact();
          });
      });
    },

    buscarTarifa() {
      return new Promise(async (resolve) => {
        for (let i = 0; i < 10; i++) {
          if (
            this.reg_usuar_ser.tabla_serv[i].serv == this.servicio &&
            this.reg_usuar_ser.tabla_serv[i].estr == this.reg_usuar_ser.estrato
          ) {
            if (this.reg_fact.tabla.serv_tab[this.serv_w].datos_tab[0].conc) {
              this.reg_fact.tabla.serv_tab[this.serv_w].datos_tab[0].conc = `${this.reg_fact.tabla.serv_tab[
                this.serv_w
              ].datos_tab[0].conc.slice(0, 2)}${this.reg_usuar_ser.tabla_serv[i].tari}`;
            } else {
              this.reg_fact.tabla.serv_tab[
                this.serv_w
              ].datos_tab[0].conc = `00${this.reg_usuar_ser.tabla_serv[i].tari}`;
            }
            i = 9;
          }

          if (i == 9) resolve();
        }
      });
    },

    buscarMedidor() {
      return new Promise((resolve) => {
        let llave_tab = "";
        for (let i = 0; i < 10; i++) {
          llave_tab = `${this.reg_usuar_ser.tabla_serv[i].serv}${this.reg_usuar_ser.tabla_serv[i].estr}${this.reg_usuar_ser.tabla_serv[i].tari}`;
          if (this.reg_fact.tabla.serv_tab[this.serv_w].datos_tab[0].conc == llave_tab) {
            this.nro_med_w = this.reg_usuar_ser.tabla_serv[i].med;
            i = 9;
          }

          if (i == 9) resolve();
        }
      });
    },

    sumarPromedio() {
      return new Promise((resolve) => {
        for (let i = 0; i < 6; i++) {
          if (format_op(this.reg_fact.tabla.serv_tab[this.serv_w].tabla_consu[i].ult_cons) > 0) {
            this.acum_consu_w =
              format_op(this.acum_consu_w) +
              format_op(this.reg_fact.tabla.serv_tab[this.serv_w].tabla_consu[i].ult_cons);
            this.item_consu_w = format_op(this.item_consu_w) + 1;
          }

          if (i == 5) resolve();
        }
      });
    },

    mostrarUsuario() {
      return new Promise(async (resolve) => {
        postData(
          {
            datosh: moduloDatosEnvio() + this.reg_fact.cat + "|" + this.reg_ctl.periodo[0].ano_per + "|",
          },
          get_url("app/SERVDOM/PUB801_01.DLL")
        )
          .then((data) => {
            if (data.nro_cat) this.reg_usuar_ser = data;
            else {
              this.reg_usuar_ser = regs_dom.USUAR_SER();
              this.reg_usuar_ser.nombre = "USUARIO NO EXISTE";
            }

            resolve();
          })
          .catch((error) => {
            console.error(error);
            CON851("", "Error leyendo usuario", null, "error", "Error");
            loader("hide");
            this.datoFact();
          });
      });
    },

    traerServicios() {
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB781.DLL"))
        .then((data) => {
          this.array_serv = data.SERVPQR;
          this.traerUsuarSer();
        })
        .catch((error) => {
          loader("hide");
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          _toggleNav();
        });
    },

    traerUsuarSer() {
      postData({ datosh: moduloDatosEnvio() + "1" }, get_url("app/SERVDOM/PUB801.DLL"))
        .then((data) => {
          this.array_usuar_ser = data.USDOM;
          this.traerTarifas();
        })
        .catch((error) => {
          console.error(error);
          loader("hide");
          CON851("", "Error consultando datos", null, "error", "");
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
          this.traerLecturas();
        })
        .catch((error) => {
          loader("hide");
          if (!error.STATUS) CON851("", "Error consultando datos", null, "error", "Error");
          _toggleNav();
        });
    },

    traerLecturas() {
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB111_01.DLL"))
        .then((data) => {
          this.array_lect = data.tabla_lec;
          this.abrirArchivo();
        })
        .catch((error) => {
          console.error(error);
          if (!error.STATUS) CON851("", "Error consultando datos", null, "error", "Error");
          loader("hide");
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
          {
            datosh: moduloDatosEnvio() + "2|",
            fecha: `${this.ano_gen}${this.mes_gen}`,
            cat: this.reg_fact.cat,
          },
          get_url("app/SERVDOM/PUB203_02.DLL")
        )
          .then((data) => {
            loader("hide");
            if (data.llave == 0) data.llave = "";

            if (!data.llave) {
              CON851("", "01", null, "error", "Error");
              this.datoFact();
            } else {
              this.reg_fact.llave = data.llave;
              this.leerFact();
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

    llamar_PUB808() {
      _fin_validar_form();

      _ventana_PUB808(this.aceptarNovedad).then((data) => {
        this.reg_fact.tabla.serv_tab[this.serv_w].noved_lect = data.codigo;
        this.descrip_noved = data.concep;
        this.reg_lect = Object.assign({}, data);
        this.leerNovedad();
      });
    },
  },
});
