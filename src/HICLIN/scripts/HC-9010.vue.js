const { detallesHc, grabarDetalles } = require("../../HICLIN/scripts/reg_dethc.js");

module.exports = Vue.component("vale", {
  props: {
    params: {
      estado: false,
    },
    data: {},
  },
  data() {
    return {
      dato_9010: detallesHc.WS_9010(),
      pantalla_orden: 0,
      resp_neg_compren: 0,
      resp_neg_expres: 0,
      resp_neg_interac: 0,
      resp_neg_vesitb: 0,
      total_resp_neg: 0,
      total_resp_afi: 0,
    };
  },
  watch: {
    // "params.estado": function (val) {
    //   console.log(val)
    //   if (val) this.abrirArchivos();
    // },
  },

  mounted() {
    this.abrirArchivos()
  },

  methods: {
    abrirArchivos() {
      postData(
        {
          datosh: datosEnvio() + $_REG_HC.llave_hc + "|||9010|" + $_REG_HC.serv_hc + "|",
        },
        get_url("app/HICLIN/HCDETAL_PRC.DLL")
      )
        .then((data) => {
          loader("hide")
          let detalles = data["DETHC"];

          let detalle9010 = detalles.find((e) => e["COD-DETHC"] == "9010");

          this.dato_9010 = detalle9010 ? detalle9010.DETALLE : this.dato_9010;

          this.leerPaciente();
        })
        .catch((error) => {
          loader("hide")
          CON851("", "Error consultando datos", null, "error", "error");
          console.log(error);
          this.salir_esc();
        });
    },

    leerPaciente() {
      if ($_REG_PACI.DESCRIP == "NO EXITS PACIENTE!") this.salir_esc();
      else {
        this.edad_paci_w = SC_DIAS_MESES($_REG_PACI.NACIM, this.fecha_act);
        this.validarUltResp();
      }
    },

    validarUltResp() {
      if (!this.dato_9010.bajo_peso_nacer.trim()) {
        // Menores de 2 años
        this.pantalla_orden = 1;
        this.datoBajoPesoNacer();
      } else if (!this.dato_9010.nn_uti_posesivos.trim()) {
        // 25 a 36 Meses
        this.pantalla_orden = 5;
        this.datoNnAcompGestHabla();
      } else if (!this.dato_9010.nn_resp_preg_hist.trim()) {
        // 3 años 1 mes a 4 años
        this.pantalla_orden = 5;
        this.datoNnDemIntJugar();
      } else if (!this.dato_9010.nn_sab_rep_canc.trim()) {
        // 4 años 1 mes a 5 años
        this.pantalla_orden = 6;
        this.datoNnExpSentPerCer();
      } else if (!this.dato_9010.nn_ejec_acc_consec.trim()) {
        // 5 años 1 mes a 9 años
        this.pantalla_orden = 6;
        this.datoNnSalDesp();
      } else if (!this.dato_9010.nn_ident_err_corri.trim()) {
        // 4 años 1 mes a 5 años
        this.pantalla_orden = 7;
        this.datoNnExpOpinion();
      } else {
        // 5 años 1 mes a 9 años
        this.pantalla_orden = 8;
        this.datoNnDisfJuegoExtre();
      }
    },

    mostrarPantalla01() {
      this.pantalla_orden = 1;
      this.datoBajoPesoNacer();
    },

    datoBajoPesoNacer() {
      validarInputs(
        {
          form: "#bajo_peso_nacer",
        },
        () =>
          CON851P(
            "03",
            () => {
              this.datoBajoPesoNacer();
            },
            () => {
              this.salir_esc();
            }
          ),
        () => {
          this.dato_9010.bajo_peso_nacer = this.dato_9010.bajo_peso_nacer.toUpperCase();
          if (this.dato_9010.bajo_peso_nacer.toUpperCase() != "S") this.dato_9010.bajo_peso_nacer = "N";
          this.datoNaciAnt30sem();
        }
      );
    },

    datoNaciAnt30sem() {
      validarInputs(
        {
          form: "#naci_ant_30sem",
        },
        () => {
          this.datoBajoPesoNacer();
        },
        () => {
          this.dato_9010.naci_ant_30sem = this.dato_9010.naci_ant_30sem.toUpperCase();
          if (this.dato_9010.naci_ant_30sem.toUpperCase() != "S") this.dato_9010.naci_ant_30sem = "N";
          this.datoEstancSup3odias();
        }
      );
    },

    datoEstancSup3odias() {
      validarInputs(
        {
          form: "#estanc_sup_3odias",
        },
        () => {
          this.datoNaciAnt30sem();
        },
        () => {
          this.dato_9010.estanc_sup_3odias = this.dato_9010.estanc_sup_3odias.toUpperCase();
          if (this.dato_9010.estanc_sup_3odias.toUpperCase() != "S") this.dato_9010.estanc_sup_3odias = "N";
          this.datoComplicProcNaci();
        }
      );
    },

    // TODAS LAS EDADES
    datoComplicProcNaci() {
      validarInputs(
        {
          form: "#complic_proc_naci",
        },
        () => {
          this.datoEstancSup3odias();
        },
        () => {
          this.dato_9010.complic_proc_naci = this.dato_9010.complic_proc_naci.toUpperCase();
          if (this.dato_9010.complic_proc_naci.toUpperCase() != "S") this.dato_9010.complic_proc_naci = "N";
          this.datoDiagCondSalud();
        }
      );
    },

    datoDiagCondSalud() {
      validarInputs(
        {
          form: "#diag_cond_salud",
        },
        () => {
          this.datoComplicProcNaci();
        },
        () => {
          this.dato_9010.diag_cond_salud = this.dato_9010.diag_cond_salud.toUpperCase();
          if (this.dato_9010.diag_cond_salud.toUpperCase() != "S") this.dato_9010.diag_cond_salud = "N";
          this.datoRiesgoSocial();
        }
      );
    },

    datoRiesgoSocial() {
      validarInputs(
        {
          form: "#riesgo_social",
        },
        () => {
          this.datoDiagCondSalud();
        },
        () => {
          this.dato_9010.riesgo_social = this.dato_9010.riesgo_social.toUpperCase();
          if (this.dato_9010.riesgo_social.toUpperCase() != "S") this.dato_9010.riesgo_social = "N";
          this.datoDificApren();
        }
      );
    },

    datoDificApren() {
      validarInputs(
        {
          form: "#dific_apren",
        },
        () => {
          this.datoRiesgoSocial();
        },
        () => {
          this.dato_9010.dific_apren = this.dato_9010.dific_apren.toUpperCase();
          if (this.dato_9010.dific_apren.toUpperCase() != "S") this.dato_9010.dific_apren = "N";
          this.saltoPag1();
        }
      );
    },

    saltoPag1() {
      this.mostrarPantalla02();
    },

    mostrarPantalla02() {
      this.pantalla_orden = 2;
      this.datoPreseOrejas();
    },

    datoPreseOrejas() {
      validarInputs(
        {
          form: "#prese_orejas",
        },
        () => {
          this.pantalla_orden = 1;
          this.datoDificApren();
        },
        () => {
          this.dato_9010.prese_orejas = this.dato_9010.prese_orejas.toUpperCase();
          if (this.dato_9010.prese_orejas.toUpperCase() != "S") this.dato_9010.prese_orejas = "N";
          this.datoIntegOrejas();
        }
      );
    },

    datoIntegOrejas() {
      validarInputs(
        {
          form: "#integ_orejas",
        },
        () => {
          this.datoPreseOrejas();
        },
        () => {
          this.dato_9010.integ_orejas = this.dato_9010.integ_orejas.toUpperCase();
          if (this.dato_9010.integ_orejas.toUpperCase() != "S") this.dato_9010.integ_orejas = "N";
          this.datoPreseLabios();
        }
      );
    },

    datoPreseLabios() {
      validarInputs(
        {
          form: "#prese_labios",
        },
        () => {
          this.datoIntegOrejas();
        },
        () => {
          this.dato_9010.prese_labios = this.dato_9010.prese_labios.toUpperCase();
          if (this.dato_9010.prese_labios.toUpperCase() != "S") this.dato_9010.prese_labios = "N";
          this.datoIntegLabios();
        }
      );
    },

    datoIntegLabios() {
      validarInputs(
        {
          form: "#integ_labios",
        },
        () => {
          this.datoPreseLabios();
        },
        () => {
          this.dato_9010.integ_labios = this.dato_9010.integ_labios.toUpperCase();
          if (this.dato_9010.integ_labios.toUpperCase() != "S") this.dato_9010.integ_labios = "N";
          this.datoPreseLengua();
        }
      );
    },

    datoPreseLengua() {
      validarInputs(
        {
          form: "#prese_lengua",
        },
        () => {
          this.datoIntegLabios();
        },
        () => {
          this.dato_9010.prese_lengua = this.dato_9010.prese_lengua.toUpperCase();
          if (this.dato_9010.prese_lengua.toUpperCase() != "S") this.dato_9010.prese_lengua = "N";
          this.datoIntegLengua();
        }
      );
    },

    datoIntegLengua() {
      validarInputs(
        {
          form: "#integ_lengua",
        },
        () => {
          this.datoPreseLengua();
        },
        () => {
          this.dato_9010.integ_lengua = this.dato_9010.integ_lengua.toUpperCase();
          if (this.dato_9010.integ_lengua.toUpperCase() != "S") this.dato_9010.integ_lengua = "N";
          this.datoPreseNariz();
        }
      );
    },

    datoPreseNariz() {
      validarInputs(
        {
          form: "#prese_nariz",
        },
        () => {
          this.datoIntegLengua();
        },
        () => {
          this.dato_9010.prese_nariz = this.dato_9010.prese_nariz.toUpperCase();
          if (this.dato_9010.prese_nariz.toUpperCase() != "S") this.dato_9010.prese_nariz = "N";
          this.datoIntegNariz();
        }
      );
    },

    datoIntegNariz() {
      validarInputs(
        {
          form: "#integ_nariz",
        },
        () => {
          this.datoPreseNariz();
        },
        () => {
          this.dato_9010.integ_nariz = this.dato_9010.integ_nariz.toUpperCase();
          if (this.dato_9010.integ_nariz.toUpperCase() != "S") this.dato_9010.integ_nariz = "N";
          this.datoPresePaladar();
        }
      );
    },

    datoPresePaladar() {
      validarInputs(
        {
          form: "#prese_paladar",
        },
        () => {
          this.datoIntegNariz();
        },
        () => {
          this.dato_9010.prese_paladar = this.dato_9010.prese_paladar.toUpperCase();
          if (this.dato_9010.prese_paladar.toUpperCase() != "S") this.dato_9010.prese_paladar = "N";
          this.datoIntegPaladar();
        }
      );
    },

    datoIntegPaladar() {
      validarInputs(
        {
          form: "#integ_paladar",
        },
        () => {
          this.datoPresePaladar();
        },
        () => {
          this.dato_9010.integ_paladar = this.dato_9010.integ_paladar.toUpperCase();
          if (this.dato_9010.integ_paladar.toUpperCase() != "S") this.dato_9010.integ_paladar = "N";
          this.datoPreseOjos();
        }
      );
    },

    datoPreseOjos() {
      validarInputs(
        {
          form: "#prese_ojos",
        },
        () => {
          this.datoIntegPaladar();
        },
        () => {
          this.dato_9010.prese_ojos = this.dato_9010.prese_ojos.toUpperCase();
          if (this.dato_9010.prese_ojos.toUpperCase() != "S") this.dato_9010.prese_ojos = "N";
          this.datoIntegOjos();
        }
      );
    },

    datoIntegOjos() {
      validarInputs(
        {
          form: "#integ_ojos",
        },
        () => {
          this.datoPreseOjos();
        },
        () => {
          this.dato_9010.integ_ojos = this.dato_9010.integ_ojos.toUpperCase();
          if (this.dato_9010.integ_ojos.toUpperCase() != "S") this.dato_9010.integ_ojos = "N";
          this.datoPreseDientes();
        }
      );
    },

    datoPreseDientes() {
      validarInputs(
        {
          form: "#prese_dientes",
        },
        () => {
          this.datoIntegOjos();
        },
        () => {
          this.dato_9010.prese_dientes = this.dato_9010.prese_dientes.toUpperCase();
          if (this.dato_9010.prese_dientes.toUpperCase() != "S") this.dato_9010.prese_dientes = "N";
          this.datoIntegDientes();
        }
      );
    },

    datoIntegDientes() {
      validarInputs(
        {
          form: "#integ_dientes",
        },
        () => {
          this.datoPreseDientes();
        },
        () => {
          this.dato_9010.integ_dientes = this.dato_9010.integ_dientes.toUpperCase();
          if (this.dato_9010.integ_dientes.toUpperCase() != "S") this.dato_9010.integ_dientes = "N";
          this.datoPreseCuello();
        }
      );
    },

    datoPreseCuello() {
      validarInputs(
        {
          form: "#prese_cuello",
        },
        () => {
          this.datoIntegDientes();
        },
        () => {
          this.dato_9010.prese_cuello = this.dato_9010.prese_cuello.toUpperCase();
          if (this.dato_9010.prese_cuello.toUpperCase() != "S") this.dato_9010.prese_cuello = "N";
          this.datoIntegCuello();
        }
      );
    },

    datoIntegCuello() {
      validarInputs(
        {
          form: "#integ_cuello",
        },
        () => {
          this.datoPreseCuello();
        },
        () => {
          this.dato_9010.integ_cuello = this.dato_9010.integ_cuello.toUpperCase();
          if (this.dato_9010.integ_cuello.toUpperCase() != "S") this.dato_9010.integ_cuello = "N";
          this.datoPreseHombros();
        }
      );
    },

    datoPreseHombros() {
      validarInputs(
        {
          form: "#prese_hombros",
        },
        () => {
          this.datoIntegCuello();
        },
        () => {
          this.dato_9010.prese_hombros = this.dato_9010.prese_hombros.toUpperCase();
          if (this.dato_9010.prese_hombros.toUpperCase() != "S") this.dato_9010.prese_hombros = "N";
          this.datoIntegHombros();
        }
      );
    },

    datoIntegHombros() {
      validarInputs(
        {
          form: "#integ_hombros",
        },
        () => {
          this.datoPreseHombros();
        },
        () => {
          this.dato_9010.integ_hombros = this.dato_9010.integ_hombros.toUpperCase();
          if (this.dato_9010.integ_hombros.toUpperCase() != "S") this.dato_9010.integ_hombros = "N";
          this.saltoPag2();
        }
      );
    },

    // Reporte de Padres
    saltoPag2() {
      this.mostrarPantalla03();
    },

    mostrarPantalla03() {
      this.pantalla_orden = 3;
      this.bb_raccio_ruido();
    },

    bb_raccio_ruido() {
      validarInputs(
        {
          form: "#bb_reaccio_ruido",
        },
        () => {
          this.pantalla_orden = 2;
          this.datoIntegHombros();
        },
        () => {
          this.dato_9010.bb_reaccio_ruido = this.dato_9010.bb_reaccio_ruido.toUpperCase();
          if (this.dato_9010.bb_reaccio_ruido.toUpperCase() != "S") this.dato_9010.bb_reaccio_ruido = "N";
          this.datoDifLlantoBb();
        }
      );
    },

    datoDifLlantoBb() {
      validarInputs(
        {
          form: "#dif_llanto_bb",
        },
        () => {
          this.bb_raccio_ruido();
        },
        () => {
          this.dato_9010.dif_llanto_bb = this.dato_9010.dif_llanto_bb.toUpperCase();
          if (this.dato_9010.dif_llanto_bb.toUpperCase() != "S") this.dato_9010.dif_llanto_bb = "N";
          this.datoBbSuccionaFuerza();
        }
      );
    },

    datoBbSuccionaFuerza() {
      validarInputs(
        {
          form: "#bb_succiona_fuerza",
        },
        () => {
          this.datoDifLlantoBb();
        },
        () => {
          this.dato_9010.bb_succiona_fuerza = this.dato_9010.bb_succiona_fuerza.toUpperCase();
          if (this.dato_9010.bb_succiona_fuerza.toUpperCase() != "S") this.dato_9010.bb_succiona_fuerza = "N";
          this.datoBbReacHabla();
        }
      );
    },

    datoBbReacHabla() {
      validarInputs(
        {
          form: "#bb_reac_habla",
        },
        () => {
          this.datoBbSuccionaFuerza();
        },
        () => {
          this.dato_9010.bb_reac_habla = this.dato_9010.bb_reac_habla.toUpperCase();
          if (this.dato_9010.bb_reac_habla.toUpperCase() != "S") this.dato_9010.bb_reac_habla = "N";
          this.datoBbGiraCabezRuido();
        }
      );
    },

    // 4 a 6 meses
    datoBbGiraCabezRuido() {
      if (this.edad_paci_w < 4) {
        this.mostrarPantalla08();
      } else {
        validarInputs(
          {
            form: "#bb_gira_cabez_ruido",
          },
          () => {
            this.datoBbReacHabla();
          },
          () => {
            this.dato_9010.bb_gira_cabez_ruido = this.dato_9010.bb_gira_cabez_ruido.toUpperCase();
            if (this.dato_9010.bb_gira_cabez_ruido.toUpperCase() != "S") this.dato_9010.bb_gira_cabez_ruido = "N";
            this.datoBbRepiteSonidos();
          }
        );
      }
    },

    datoBbRepiteSonidos() {
      validarInputs(
        {
          form: "#bb_repite_sonidos",
        },
        () => {
          this.datoBbGiraCabezRuido();
        },
        () => {
          this.dato_9010.bb_repite_sonidos = this.dato_9010.bb_repite_sonidos.toUpperCase();
          if (this.dato_9010.bb_repite_sonidos.toUpperCase() != "S") this.dato_9010.bb_repite_sonidos = "N";
          this.datoBbRieConJuegos();
        }
      );
    },

    datoBbRieConJuegos() {
      validarInputs(
        {
          form: "#bb_rie_con_juegos",
        },
        () => {
          this.datoBbRepiteSonidos();
        },
        () => {
          this.dato_9010.bb_rie_con_juegos = this.dato_9010.bb_rie_con_juegos.toUpperCase();
          if (this.dato_9010.bb_rie_con_juegos.toUpperCase() != "S") this.dato_9010.bb_rie_con_juegos = "N";
          this.datoBbDemIntCantoHab();
        }
      );
    },

    datoBbDemIntCantoHab() {
      if (this.edad_paci_w < 7) {
        this.mostrarPantalla08();
      } else {
        validarInputs(
          {
            form: "#bb_dem_int_canto_hab",
          },
          () => {
            this.datoBbRieConJuegos();
          },
          () => {
            this.dato_9010.bb_dem_int_canto_hab = this.dato_9010.bb_dem_int_canto_hab.toUpperCase();
            if (this.dato_9010.bb_dem_int_canto_hab.toUpperCase() != "S") this.dato_9010.bb_dem_int_canto_hab = "N";
            this.datoBbEmitSonidoPedi();
          }
        );
      }
    },

    datoBbEmitSonidoPedi() {
      validarInputs(
        {
          form: "#bb_emit_sonido_pedi",
        },
        () => {
          this.datoBbDemIntCantoHab();
        },
        () => {
          this.dato_9010.bb_emit_sonido_pedi = this.dato_9010.bb_emit_sonido_pedi.toUpperCase();
          if (this.dato_9010.bb_emit_sonido_pedi.toUpperCase() != "S") this.dato_9010.bb_emit_sonido_pedi = "N";
          this.saltoPag3();
        }
      );
    },

    saltoPag3() {
      this.mostrarPantalla04();
    },

    mostrarPantalla04() {
      this.pantalla_orden = 4;
      this.datoBbEmitSonidoIncom();
    },

    // 7 a 9 meses
    datoBbEmitSonidoIncom() {
      if (this.edad_paci_w < 7) {
        this.mostrarPantalla08();
      } else {
        validarInputs(
          {
            form: "#bb_emit_sonido_incom",
          },
          () => {
            this.pantalla_orden = 3;
            this.datoBbEmitSonidoPedi();
          },
          () => {
            this.dato_9010.bb_emit_sonido_incom = this.dato_9010.bb_emit_sonido_incom.toUpperCase();
            if (this.dato_9010.bb_emit_sonido_incom.toUpperCase() != "S") this.dato_9010.bb_emit_sonido_incom = "N";
            this.datoNnDemAtenHablan();
          }
        );
      }
    },

    datoNnDemAtenHablan() {
      if (this.edad_paci_w < 10) {
        this.mostrarPantalla08();
      } else {
        validarInputs(
          {
            form: "#nn_dem_aten_hablan",
          },
          () => {
            this.datoBbEmitSonidoIncom();
          },
          () => {
            this.dato_9010.nn_dem_aten_hablan = this.dato_9010.nn_dem_aten_hablan.toUpperCase();
            if (this.dato_9010.nn_dem_aten_hablan.toUpperCase() != "S") this.dato_9010.nn_dem_aten_hablan = "N";
            this.datoNnImitPalabNuev();
          }
        );
      }
    },

    datoNnImitPalabNuev() {
      validarInputs(
        {
          form: "#nn_imit_palab_nuev",
        },
        () => {
          this.datoNnDemAtenHablan();
        },
        () => {
          this.dato_9010.nn_imit_palab_nuev = this.dato_9010.nn_imit_palab_nuev.toUpperCase();
          if (this.dato_9010.nn_imit_palab_nuev.toUpperCase() != "S") this.dato_9010.nn_imit_palab_nuev = "N";
          this.datoNnConsDifAlim();
        }
      );
    },

    datoNnConsDifAlim() {
      validarInputs(
        {
          form: "#nn_cons_dif_alim",
        },
        () => {
          this.datoNnImitPalabNuev();
        },
        () => {
          this.dato_9010.nn_cons_dif_alim = this.dato_9010.nn_cons_dif_alim.toUpperCase();
          if (this.dato_9010.nn_cons_dif_alim.toUpperCase() != "S") this.dato_9010.nn_cons_dif_alim = "N";
          this.datoNnEmitSonidoPedi();
        }
      );
    },

    datoNnEmitSonidoPedi() {
      validarInputs(
        {
          form: "#nn_emit_sonido_pedi",
        },
        () => {
          this.datoNnConsDifAlim();
        },
        () => {
          this.dato_9010.nn_emit_sonido_pedi = this.dato_9010.nn_emit_sonido_pedi.toUpperCase();
          if (this.dato_9010.nn_emit_sonido_pedi.toUpperCase() != "S") this.dato_9010.nn_emit_sonido_pedi = "N";
          this.datoNnMuestPartCuerp();
        }
      );
    },

    // 13 a 15 meses
    datoNnMuestPartCuerp() {
      if (this.edad_paci_w < 13) {
        this.mostrarPantalla08();
      } else {
        validarInputs(
          {
            form: "#nn_muest_part_cuerp",
          },
          () => {
            this.datoNnEmitSonidoPedi();
          },
          () => {
            this.dato_9010.nn_muest_part_cuerp = this.dato_9010.nn_muest_part_cuerp.toUpperCase();
            if (this.dato_9010.nn_muest_part_cuerp.toUpperCase() != "S") this.dato_9010.nn_muest_part_cuerp = "N";
            this.datoNnImitSonidoAnim();
          }
        );
      }
    },

    datoNnImitSonidoAnim() {
      validarInputs(
        {
          form: "#nn_imit_sonido_anim",
        },
        () => {
          this.datoNnMuestPartCuerp();
        },
        () => {
          this.dato_9010.nn_imit_sonido_anim = this.dato_9010.nn_imit_sonido_anim.toUpperCase();
          if (this.dato_9010.nn_imit_sonido_anim.toUpperCase() != "S") this.dato_9010.nn_imit_sonido_anim = "N";
          this.datoNnTomaObj();
        }
      );
    },

    datoNnTomaObj() {
      validarInputs(
        {
          form: "#nn_toma_obj",
        },
        () => {
          this.datoNnImitSonidoAnim();
        },
        () => {
          this.dato_9010.nn_toma_obj = this.dato_9010.nn_toma_obj.toUpperCase();
          if (this.dato_9010.nn_toma_obj.toUpperCase() != "S") this.dato_9010.nn_toma_obj = "N";
          this.datoNnEjeAccBasicas();
        }
      );
    },

    datoNnEjeAccBasicas() {
      if (this.edad_paci_w < 16) {
        this.mostrarPantalla08();
      } else {
        validarInputs(
          {
            form: "#nn_eje_acc_basicas",
          },
          () => {
            this.datoNnTomaObj();
          },
          () => {
            this.dato_9010.nn_eje_acc_basicas = this.dato_9010.nn_eje_acc_basicas.toUpperCase();
            if (this.dato_9010.nn_eje_acc_basicas.toUpperCase() != "S") this.dato_9010.nn_eje_acc_basicas = "N";
            this.datoNnPronuNomb();
          }
        );
      }
    },

    datoNnPronuNomb() {
      validarInputs(
        {
          form: "#nn_pronu_nomb_obj",
        },
        () => {
          this.datoNnEjeAccBasicas();
        },
        () => {
          this.dato_9010.nn_pronu_nomb_obj = this.dato_9010.nn_pronu_nomb_obj.toUpperCase();
          if (this.dato_9010.nn_pronu_nomb_obj.toUpperCase() != "S") this.dato_9010.nn_pronu_nomb_obj = "N";
          this.saltoPag4();
        }
      );
    },

    saltoPag4() {
      this.mostrarPantalla05();
    },

    mostrarPantalla05() {
      this.pantalla_orden = 5;
      this.datoNnPideObjPalb();
    },

    datoNnPideObjPalb() {
      if (this.edad_paci_w < 16) {
        this.mostrarPantalla08();
      } else {
        validarInputs(
          {
            form: "#nn_pide_obj_palb",
          },
          () => {
            this.pantalla_orden = 4;
            this.datoNnPronuNomb();
          },
          () => {
            this.dato_9010.nn_pide_obj_palb = this.dato_9010.nn_pide_obj_palb.toUpperCase();
            if (this.dato_9010.nn_pide_obj_palb.toUpperCase() != "S") this.dato_9010.nn_pide_obj_palb = "N";
            this.datoNnEjecOrdenes();
          }
        );
      }
    },

    datoNnEjecOrdenes() {
      if (this.edad_paci_w < 19) {
        this.mostrarPantalla08();
      } else {
        validarInputs(
          {
            form: "#nn_ejec_ordenes",
          },
          () => {
            this.datoNnPideObjPalb();
          },
          () => {
            this.dato_9010.nn_ejec_ordenes = this.dato_9010.nn_ejec_ordenes.toUpperCase();
            if (this.dato_9010.nn_ejec_ordenes.toUpperCase() != "S") this.dato_9010.nn_ejec_ordenes = "N";
            this.datoNnPronMasPalab();
          }
        );
      }
    },

    datoNnPronMasPalab() {
      validarInputs(
        {
          form: "#nn_pron_mas_palab",
        },
        () => {
          this.datoNnEjecOrdenes();
        },
        () => {
          this.dato_9010.nn_pron_mas_palab = this.dato_9010.nn_pron_mas_palab.toUpperCase();
          if (this.dato_9010.nn_pron_mas_palab.toUpperCase() != "S") this.dato_9010.nn_pron_mas_palab = "N";
          this.datoNnAcompGestHabla();
        }
      );
    },

    datoNnAcompGestHabla() {
      validarInputs(
        {
          form: "#nn_acomp_gest_habla",
        },
        () => {
          this.datoNnPronMasPalab();
        },
        () => {
          this.dato_9010.nn_acomp_gest_habla = this.dato_9010.nn_acomp_gest_habla.toUpperCase();
          if (this.dato_9010.nn_acomp_gest_habla.toUpperCase() != "S") this.dato_9010.nn_acomp_gest_habla = "N";
          this.datoNnUtiPosesivos();
        }
      );
    },

    // 25 a 36 meses
    datoNnUtiPosesivos() {
      if (this.edad_paci_w < 25) {
        this.mostrarPantalla08();
      } else {
        validarInputs(
          {
            form: "#nn_uti_posesivos",
          },
          () => {
            this.datoNnAcompGestHabla();
          },
          () => {
            this.dato_9010.nn_uti_posesivos = this.dato_9010.nn_uti_posesivos.toUpperCase();
            if (this.dato_9010.nn_uti_posesivos.toUpperCase() != "S") this.dato_9010.nn_uti_posesivos = "N";
            this.datoNnExpEmociMusica();
          }
        );
      }
    },

    datoNnExpEmociMusica() {
      validarInputs(
        {
          form: "#nn_exp_emoci_musica",
        },
        () => {
          this.datoNnUtiPosesivos();
        },
        () => {
          this.dato_9010.nn_exp_emoci_musica = this.dato_9010.nn_exp_emoci_musica.toUpperCase();
          if (this.dato_9010.nn_exp_emoci_musica.toUpperCase() != "S") this.dato_9010.nn_exp_emoci_musica = "N";
          this.datoNnConsAlimDuros();
        }
      );
    },

    datoNnConsAlimDuros() {
      validarInputs(
        {
          form: "#nn_cons_alim_duros",
        },
        () => {
          this.datoNnExpEmociMusica();
        },
        () => {
          this.dato_9010.nn_cons_alim_duros = this.dato_9010.nn_cons_alim_duros.toUpperCase();
          if (this.dato_9010.nn_cons_alim_duros.toUpperCase() != "S") this.dato_9010.nn_cons_alim_duros = "N";
          this.datoNnDemIntJugar();
        }
      );
    },

    datoNnDemIntJugar() {
      validarInputs(
        {
          form: "#nn_dem_int_jugar",
        },
        () => {
          this.datoNnConsAlimDuros();
        },
        () => {
          this.dato_9010.nn_dem_int_jugar = this.dato_9010.nn_dem_int_jugar.toUpperCase();
          if (this.dato_9010.nn_dem_int_jugar.toUpperCase() != "S") this.dato_9010.nn_dem_int_jugar = "N";
          this.saltoPag5();
        }
      );
    },

    saltoPag5() {
      this.mostrarPantalla06();
    },

    mostrarPantalla06() {
      this.pantalla_orden = 6;
      this.datoNnRespPregHist();
    },

    // 3 años 1 mes a 4 años
    datoNnRespPregHist() {
      if (this.edad_paci_w < 37) {
        this.mostrarPantalla08();
      } else {
        validarInputs(
          {
            form: "#nn_resp_preg_hist",
          },
          () => {
            this.pantalla_orden = 5;
            this.datoNnDemIntJugar();
          },
          () => {
            this.dato_9010.nn_resp_preg_hist = this.dato_9010.nn_resp_preg_hist.toUpperCase();
            if (this.dato_9010.nn_resp_preg_hist.toUpperCase() != "S") this.dato_9010.nn_resp_preg_hist = "N";
            this.datoNnCuestSituNuev();
          }
        );
      }
    },

    datoNnCuestSituNuev() {
      validarInputs(
        {
          form: "#nn_cuest_situ_nuev",
        },
        () => {
          this.datoNnRespPregHist();
        },
        () => {
          this.dato_9010.nn_cuest_situ_nuev = this.dato_9010.nn_cuest_situ_nuev.toUpperCase();
          if (this.dato_9010.nn_cuest_situ_nuev.toUpperCase() != "S") this.dato_9010.nn_cuest_situ_nuev = "N";
          this.datoNnExpSentPerCer();
        }
      );
    },

    datoNnExpSentPerCer() {
      validarInputs(
        {
          form: "#nn_exp_sent_per_cer",
        },
        () => {
          this.datoNnCuestSituNuev();
        },
        () => {
          this.dato_9010.nn_exp_sent_per_cer = this.dato_9010.nn_exp_sent_per_cer.toUpperCase();
          if (this.dato_9010.nn_exp_sent_per_cer.toUpperCase() != "S") this.dato_9010.nn_exp_sent_per_cer = "N";
          this.datoNnSabRepCanc();
        }
      );
    },

    // 4 años 1 mes a 5 años
    datoNnSabRepCanc() {
      if (this.edad_paci_w < 49) {
        this.mostrarPantalla08();
      } else {
        validarInputs(
          {
            form: "#nn_sab_rep_canc",
          },
          () => {
            this.datoNnExpSentPerCer();
          },
          () => {
            this.dato_9010.nn_sab_rep_canc = this.dato_9010.nn_sab_rep_canc.toUpperCase();
            if (this.dato_9010.nn_sab_rep_canc.toUpperCase() != "S") this.dato_9010.nn_sab_rep_canc = "N";
            this.datoNnExpOrac4Palb();
          }
        );
      }
    },

    datoNnExpOrac4Palb() {
      validarInputs(
        {
          form: "#nn_exp_orac_4palb",
        },
        () => {
          this.datoNnSabRepCanc();
        },
        () => {
          this.dato_9010.nn_exp_orac_4palb = this.dato_9010.nn_exp_orac_4palb.toUpperCase();
          if (this.dato_9010.nn_exp_orac_4palb.toUpperCase() != "S") this.dato_9010.nn_exp_orac_4palb = "N";
          this.datoNnSalDesp();
        }
      );
    },

    datoNnSalDesp() {
      validarInputs(
        {
          form: "#nn_sal_desp",
        },
        () => {
          this.datoNnExpOrac4Palb();
        },
        () => {
          this.dato_9010.nn_sal_desp = this.dato_9010.nn_sal_desp.toUpperCase();
          if (this.dato_9010.nn_sal_desp.toUpperCase() != "S") this.dato_9010.nn_sal_desp = "N";
          this.datoNnEjecAccConsec();
        }
      );
    },

    datoNnEjecAccConsec() {
      if (this.edad_paci_w < 61) {
        this.mostrarPantalla08();
      } else {
        validarInputs(
          {
            form: "#nn_ejec_acc_consec",
          },
          () => {
            this.datoNnSalDesp();
          },
          () => {
            this.dato_9010.nn_ejec_acc_consec = this.dato_9010.nn_ejec_acc_consec.toUpperCase();
            if (this.dato_9010.nn_ejec_acc_consec.toUpperCase() != "S") this.dato_9010.nn_ejec_acc_consec = "N";
            this.datoNnHablaClaridad();
          }
        );
      }
    },

    datoNnHablaClaridad() {
      validarInputs(
        {
          form: "#nn_habla_claridad",
        },
        () => {
          this.datoNnEjecAccConsec();
        },
        () => {
          this.dato_9010.nn_habla_claridad = this.dato_9010.nn_habla_claridad.toUpperCase();
          if (this.dato_9010.nn_habla_claridad.toUpperCase() != "S") this.dato_9010.nn_habla_claridad = "N";
          this.saltoPag6();
        }
      );
    },

    saltoPag6() {
      this.mostrarPantalla07();
    },

    mostrarPantalla07() {
      this.pantalla_orden = 7;
      this.datoNnExpOpinion();
    },

    // 5 años 1 mes a 9 años
    datoNnExpOpinion() {
      if (this.edad_paci_w < 61) {
        this.mostrarPantalla08();
      } else {
        validarInputs(
          {
            form: "#nn_exp_opinion",
          },
          () => {
            this.pantalla_orden = 6;
            this.datoNnHablaClaridad();
          },
          () => {
            this.dato_9010.nn_exp_opinion = this.dato_9010.nn_exp_opinion.toUpperCase();
            if (this.dato_9010.nn_exp_opinion.toUpperCase() != "S") this.dato_9010.nn_exp_opinion = "N";
            this.datoNnIdentErrCorri();
          }
        );
      }
    },

    // 9 años 1 mes a 12 años 11 meses
    datoNnIdentErrCorri() {
      if (this.edad_paci_w < 109) {
        this.mostrarPantalla08();
      } else {
        validarInputs(
          {
            form: "#nn_ident_err_corri",
          },
          () => {
            this.datoNnExpOpinion();
          },
          () => {
            this.dato_9010.nn_ident_err_corri = this.dato_9010.nn_ident_err_corri.toUpperCase();
            if (this.dato_9010.nn_ident_err_corri.toUpperCase() != "S") this.dato_9010.nn_ident_err_corri = "N";
            this.datoNnUtiPalbAbst();
          }
        );
      }
    },

    datoNnUtiPalbAbst() {
      validarInputs(
        {
          form: "#nn_uti_palb_abst",
        },
        () => {
          this.datoNnIdentErrCorri();
        },
        () => {
          this.dato_9010.nn_uti_palb_abst = this.dato_9010.nn_uti_palb_abst.toUpperCase();
          if (this.dato_9010.nn_uti_palb_abst.toUpperCase() != "S") this.dato_9010.nn_uti_palb_abst = "N";
          this.datoNnExpArgAcuDesc();
        }
      );
    },

    datoNnExpArgAcuDesc() {
      validarInputs(
        {
          form: "#nn_exp_arg_acu_desc",
        },
        () => {
          this.datoNnUtiPalbAbst();
        },
        () => {
          this.dato_9010.nn_exp_arg_acu_desc = this.dato_9010.nn_exp_arg_acu_desc.toUpperCase();
          if (this.dato_9010.nn_exp_arg_acu_desc.toUpperCase() != "S") this.dato_9010.nn_exp_arg_acu_desc = "N";
          this.saltoPag7();
        }
      );
    },

    saltoPag7() {
      this.mostrarPantalla08();
    },

    mostrarPantalla08() {
      this.pantalla_orden = 8;
      if (this.edad_paci_w < 36) {
        this.sumatoriaRespNeg();
      } else {
        this.datoNnDisfActFis();
      }
    },

    // 3 años a 5 años
    datoNnDisfActFis() {
      if (this.edad_paci_w < 36) {
        this.saltoPag();
      } else {
        validarInputs(
          {
            form: "#nn_disf_act_fis",
          },
          () => {
            switch (true) {
              case this.edad_paci_w > 108:
                console.log("entra a condicion");
                this.pantalla_orden = 7;
                this.datoNnExpArgAcuDesc();
                break;
              case this.edad_paci_w > 60 && this.edad_paci_w < 109:
                this.pantalla_orden = 7;
                this.datoNnExpOpinion();
                break;
              case this.edad_paci_w > 48 && this.edad_paci_w < 61:
                this.pantalla_orden = 6;
                this.datoNnSalDesp();
                break;
              case this.edad_paci_w > 36 && this.edad_paci_w < 49:
                this.pantalla_orden = 6;
                this.datoNnExpSentPerCer();
                break;
              default:
                this.pantalla_orden = 8;
                this.datoNnDisfActFis();
                break;
            }
          },
          () => {
            this.dato_9010.nn_disf_act_fis = this.dato_9010.nn_disf_act_fis.toUpperCase();
            if (this.dato_9010.nn_disf_act_fis.toUpperCase() != "S") this.dato_9010.nn_disf_act_fis = "N";
            this.datoNnCaminaCorrect();
          }
        );
      }
    },

    datoNnCaminaCorrect() {
      validarInputs(
        {
          form: "#nn_camina_correct",
        },
        () => {
          this.datoNnDisfActFis();
        },
        () => {
          this.dato_9010.nn_camina_correct = this.dato_9010.nn_camina_correct.toUpperCase();
          if (this.dato_9010.nn_camina_correct.toUpperCase() != "S") this.dato_9010.nn_camina_correct = "N";
          this.datoNnDisfVueltSinCaer();
        }
      );
    },

    // 5 años 1 mes a 12 años 11 meses
    datoNnDisfVueltSinCaer() {
      if (this.edad_paci_w < 61) {
        this.sumatoriaRespNeg();
      } else {
        validarInputs(
          {
            form: "#nn_disf_vuelt_sin_caer",
          },
          () => {
            this.datoNnCaminaCorrect();
          },
          () => {
            this.dato_9010.nn_disf_vuelt_sin_caer = this.dato_9010.nn_disf_vuelt_sin_caer.toUpperCase();
            if (this.dato_9010.nn_disf_vuelt_sin_caer.toUpperCase() != "S") this.dato_9010.nn_disf_vuelt_sin_caer = "N";
            this.datoNnProtegeCae();
          }
        );
      }
    },

    datoNnProtegeCae() {
      validarInputs(
        {
          form: "#nn_protege_cae",
        },
        () => {
          this.datoNnDisfVueltSinCaer();
        },
        () => {
          this.dato_9010.nn_protege_cae = this.dato_9010.nn_protege_cae.toUpperCase();
          if (this.dato_9010.nn_protege_cae.toUpperCase() != "S") this.dato_9010.nn_protege_cae = "N";
          this.datoNnDisfJuegoExtre();
        }
      );
    },

    datoNnDisfJuegoExtre() {
      validarInputs(
        {
          form: "#nn_disf_juego_extre",
        },
        () => {
          this.datoNnProtegeCae();
        },
        () => {
          this.dato_9010.nn_disf_juego_extre = this.dato_9010.nn_disf_juego_extre.toUpperCase();
          if (this.dato_9010.nn_disf_juego_extre.toUpperCase() != "S") this.dato_9010.nn_disf_juego_extre = "N";
          this.sumatoriaRespNeg();
        }
      );
    },

    sumatoriaRespNeg() {
      this.resp_neg_compren = 0;
      this.resp_neg_expres = 0;
      this.resp_neg_interac = 0;
      this.resp_neg_vesitb = 0;
      this.total_resp_neg = 0;
      this.total_resp_afi = 0;

      switch (this.dato_9010.bb_reaccio_ruido) {
        case "N":
          this.resp_neg_compren += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.dif_llanto_bb) {
        case "N":
          this.resp_neg_expres += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.bb_succiona_fuerza) {
        case "N":
          this.resp_neg_expres += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.bb_reac_habla) {
        case "N":
          this.resp_neg_interac += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.bb_gira_cabez_ruido) {
        case "N":
          this.resp_neg_compren += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.bb_repite_sonidos) {
        case "N":
          this.resp_neg_expres += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.bb_rie_con_juegos) {
        case "N":
          this.resp_neg_interac += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.bb_dem_int_canto_hab) {
        case "N":
          this.resp_neg_compren += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.bb_emit_sonido_pedi) {
        case "N":
          this.resp_neg_expres += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.bb_emit_sonido_incom) {
        case "N":
          this.resp_neg_interac += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.nn_dem_aten_hablan) {
        case "N":
          this.resp_neg_compren += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.nn_imit_palab_nuev) {
        case "N":
          this.resp_neg_expres += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.nn_cons_dif_alim) {
        case "N":
          this.resp_neg_expres += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.nn_emit_sonido_pedi) {
        case "N":
          this.resp_neg_interac += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.nn_muest_part_cuerp) {
        case "N":
          this.resp_neg_compren += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.nn_imit_sonido_anim) {
        case "N":
          this.resp_neg_expres += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.nn_toma_obj) {
        case "N":
          this.resp_neg_interac += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.nn_eje_acc_basicas) {
        case "N":
          this.resp_neg_compren += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.nn_pronu_nomb_obj) {
        case "N":
          this.resp_neg_expres += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.nn_pide_obj_palb) {
        case "N":
          this.resp_neg_interac += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.nn_ejec_ordenes) {
        case "N":
          this.resp_neg_compren += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.nn_pron_mas_palab) {
        case "N":
          this.resp_neg_expres += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.nn_acomp_gest_habla) {
        case "N":
          this.resp_neg_interac += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.nn_uti_posesivos) {
        case "N":
          this.resp_neg_compren += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.nn_exp_emoci_musica) {
        case "N":
          this.resp_neg_expres += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.nn_cons_alim_duros) {
        case "N":
          this.resp_neg_expres += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.nn_dem_int_jugar) {
        case "N":
          this.resp_neg_interac += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.nn_resp_preg_hist) {
        case "N":
          this.resp_neg_compren += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.nn_cuest_situ_nuev) {
        case "N":
          this.resp_neg_expres += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.nn_exp_sent_per_cer) {
        case "N":
          this.resp_neg_interac += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.nn_sab_rep_canc) {
        case "N":
          this.resp_neg_compren += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.nn_exp_orac_4palb) {
        case "N":
          this.resp_neg_expres += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.nn_sal_desp) {
        case "N":
          this.resp_neg_interac += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.nn_ejec_acc_consec) {
        case "N":
          this.resp_neg_compren += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.nn_habla_claridad) {
        case "N":
          this.resp_neg_expres += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.nn_exp_opinion) {
        case "N":
          this.resp_neg_interac += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.nn_ident_err_corri) {
        case "N":
          this.resp_neg_compren += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.nn_uti_palb_abst) {
        case "N":
          this.resp_neg_expres += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.nn_exp_arg_acu_desc) {
        case "N":
          this.resp_neg_interac += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.nn_disf_act_fis) {
        case "N":
          this.resp_neg_vesitb += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.nn_camina_correct) {
        case "N":
          this.resp_neg_vesitb += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.nn_disf_vuelt_sin_caer) {
        case "N":
          this.resp_neg_vesitb += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.nn_protege_cae) {
        case "N":
          this.resp_neg_vesitb += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      switch (this.dato_9010.nn_disf_juego_extre) {
        case "N":
          this.resp_neg_vesitb += 1;
          break;
        case "S":
          this.total_resp_afi += 1;
          break;
      }

      this.total_resp_neg = this.resp_neg_compren + this.resp_neg_expres + this.resp_neg_interac + this.resp_neg_vesitb;

      if (this.total_resp_neg > 0) CON851("", "INDICIO DE UNA ALTERACIÓN", null, "warning", "");
      else CON851("", "NO HAY ALTERACIÓN", null, "success", "");

      this.ventanaRemisionEvalu();
    },

    ventanaRemisionEvalu() {
      console.log(this.total_resp_neg);
      if (this.total_resp_neg == 0) {
        this.confirmar();
      } else {
        this.datoRemEval();
      }
    },

    datoRemEval() {
      validarInputs(
        {
          form: "#rem_eval",
        },
        () => {
          this.saltoPag();
        },
        () => {
          this.dato_9010.rem_eval = this.dato_9010.rem_eval.toUpperCase();
          if (this.dato_9010.rem_eval.toUpperCase() != "S") this.dato_9010.rem_eval = "N";
          this.datoRemUrgEval();
        }
      );
    },

    datoRemUrgEval() {
      validarInputs(
        {
          form: "#rem_urgent",
        },
        () => {
          this.datoRemEval();
        },
        () => {
          this.dato_9010.rem_urgent = this.dato_9010.rem_urgent.toUpperCase();
          if (this.dato_9010.rem_urgent.toUpperCase() != "S") this.dato_9010.rem_urgent = "N";
          this.confirmar();
        }
      );
    },

    saltoPag() {
      switch (true) {
        case this.edad_paci_w < 4:
          this.pantalla_orden = 3;
          this.datoBbReacHabla();
          break;
        case this.edad_paci_w < 7:
          this.pantalla_orden = 3;
          this.datoBbRieConJuegos();
          break;
        case this.edad_paci_w < 10:
          this.pantalla_orden = 4;
          this.datoBbEmitSonidoIncom();
          break;
        case this.edad_paci_w < 13:
          this.pantalla_orden = 4;
          this.datoNnEmitSonidoPedi();
          break;
        case this.edad_paci_w < 16:
          this.pantalla_orden = 4;
          this.datoNnTomaObj();
          break;
        case this.edad_paci_w < 19:
          this.pantalla_orden = 5;
          this.datoNnPideObjPalb();
          break;
        case this.edad_paci_w < 25:
          this.pantalla_orden = 5;
          this.datoNnAcompGestHabla();
          break;
        case this.edad_paci_w < 37:
          this.pantalla_orden = 5;
          this.datoNnDemIntJugar();
          break;
        case this.edad_paci_w < 61:
          this.pantalla_orden = 8;
          this.datoNnCaminaCorrect();
          break;
        case this.edad_paci_w > 60:
          this.pantalla_orden = 8;
          this.datoNnDisfJuegoExtre();
          break;
        default:
          this.confirmar();
          break;
      }
    },

    confirmar() {
      CON851P("01", this.saltoPag, this.grabar);
    },

    grabar() {
      let detalles = {
        9010: _getObjetoSaveHc(this.dato_9010, []),
      };

      grabarDetalles(detalles, $_REG_HC.llave_hc)
        .then((data) => {
          console.log(data);
          CON851("", "Guardado correctamente", null, "success", "Correcto");
          this.salir_fin();
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error en guardado de detalles", null, "error", "Error");
          this.validarUltResp();
        });
    },

    salir_esc() {
      this.$emit("callback_esc");
    },

    salir_fin() {
      this.$emit("callback");
    },
  },

  template: /*html*/ `
            <div class="col-md-12 form-group box-center no-padding">
                <div class="portlet light no-padding">
                    <div class="portlet-body">
                        <div class="form-horizontal">

                            <div v-show="pantalla_orden == 1" style="padding: 0 0 1rem 0;" class="col-md-12">
                                <div class="col-md-12 no-padding">
                                    <div class="form-group col-md-12" style="display: flex;">
                                        <div class="col-md-2" style="background-color: #B0C4DE;">
                                            <div style="padding: 9px;" class="text-center">
                                                <label style="background: 0;">RANGO DE EDAD</label>
                                            </div>
                                        </div>
                                        <div class="col-md-10 no-padding">
                                            <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                <div class="col-md-10 text-center" style="background-color: #B0C4DE; padding: 9px;">
                                                    <label style="background: 0;">CONDICIONES PERINATALES Y POSNATALES</label>
                                                </div>
                                                <div class="col-md-2 text-center" style="background-color: #B0C4DE; padding: 9px;">
                                                    <label style="background: 0;">RESPUESTA</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
    
                                <div class="salto-linea"></div>
                                <div class="salto-linea"></div>
    
                                <div class="col-md-12 no-padding">
                                    <div class="form-group col-md-12" style="display: flex;">
                                        <div class="col-md-2" style="background-color: #B0C4DE; display: flex; align-items: center;">
                                            <div class="col-md-12">
                                                <label style="background: 0;">MENOR DE 2 AÑOS</label>
                                            </div>
                                        </div>
                                        <div class="col-md-10 no-padding">
                                            <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                <div class="col-md-10">
                                                    <label style="background: 0;">Bajo peso al nacer (menor de 1500 gr)</label>
                                                </div>
                                                <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="bajo_peso_nacer">
                                                    <div class="input-group col-md-7">
                                                        <input v-model="dato_9010.bajo_peso_nacer" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                    </div>
                                                </div>
                                            </div>
    
                                            <div class="salto-linea"></div>
    
                                            <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                <div class="col-md-10">
                                                    <label style="background: 0;">Nació antes de las 30 semanas de gestación (Prematuro extremo)</label>
                                                </div>
                                                <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="naci_ant_30sem">
                                                    <div class="input-group col-md-7">
                                                        <input v-model="dato_9010.naci_ant_30sem" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                    </div>
                                                </div>
                                            </div>
    
                                            <div class="salto-linea"></div>
    
                                            <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                <div class="col-md-10">
                                                    <label style="background: 0;">Estancia superior a 30 días en la unidad de cuidados intensivos neonatales</label>
                                                </div>
                                                <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="estanc_sup_3odias">
                                                    <div class="input-group col-md-7">
                                                        <input v-model="dato_9010.estanc_sup_3odias" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>    
                                    </div>
                                </div>
    
                                <div class="salto-linea"></div>
                                <div class="salto-linea"></div>
                                <div class="salto-linea"></div>
    
                                <div class="col-md-12 no-padding">
                                    <div class="form-group col-md-12" style="display: flex;">
                                        <div class="col-md-2" style="background-color: #B0C4DE; display: flex; align-items: center;">
                                            <div class="col-md-12">
                                                <label style="background: 0;">TODAS LAS EDADES</label>
                                            </div>
                                        </div>
                                        <div class="col-md-10 no-padding">
                                            <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                <div class="col-md-10">
                                                    <label style="background: 0;">¿Antes, durante o poco después del nacimiento hubo alguna complicación?</label>
                                                </div>
                                                <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="complic_proc_naci">
                                                    <div class="input-group col-md-7">
                                                        <input v-model="dato_9010.complic_proc_naci" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                    </div>
                                                </div>
                                            </div>
    
                                            <div class="salto-linea"></div>
    
                                            <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                <div class="col-md-10">
                                                    <label style="background: 0;">¿El niño / niña ha sido diagnosticado(a) con alguna condición de salud?</label>
                                                </div>
                                                <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="diag_cond_salud">
                                                    <div class="input-group col-md-7">
                                                        <input v-model="dato_9010.diag_cond_salud" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                    </div>
                                                </div>
                                            </div>
    
                                            <div class="salto-linea"></div>
    
                                            <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                <div class="col-md-10">
                                                    <label style="background: 0;">¿Hay alguna condición de riesgo social (maltrato, abandono, otras) en la que se encuentre el niño?</label>
                                                </div>
                                                <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="riesgo_social">
                                                    <div class="input-group col-md-7">
                                                        <input v-model="dato_9010.riesgo_social" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                    </div>
                                                </div>
                                            </div>
    
                                            <div class="salto-linea"></div>
    
                                            <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                <div class="col-md-10">
                                                    <label style="background: 0;">¿El niño presenta dificultades en el aprendizaje de la lectura y la escritura o en su desempeño escolar?</label>
                                                </div>
                                                <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="dific_apren">
                                                    <div class="input-group col-md-7">
                                                        <input v-model="dato_9010.dific_apren" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-show="pantalla_orden == 2" style="padding: 0 0 1rem 0;" class="col-md-12">
                                <div class="col-md-12 no-padding">
                                    <div class="form-group col-md-12" style="display: flex;">
                                        <div class="col-md-3" style="background-color: #B0C4DE;">
                                            <div style="padding: 9px;" class="text-center">
                                                <label style="background: 0;">RANGO DE EDADES</label>
                                            </div>
                                        </div>
                                        <div class="col-md-9 no-padding">
                                            <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                <div class="col-md-8 text-center" style="background-color: #B0C4DE; padding: 9px;">
                                                    <label style="background: 0;">CONDICIONES ESTRUCTURALES</label>
                                                </div>
                                                <div class="col-md-2 text-center" style="background-color: #B0C4DE; padding: 9px;">
                                                    <label style="background: 0;">PRESENCIA</label>
                                                </div>
                                                <div class="col-md-2 text-center" style="background-color: #B0C4DE; padding: 9px;">
                                                    <label style="background: 0;">INTEGRIDAD</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="salto-linea"></div>
                                <div class="salto-linea"></div>
    
                                <div class="col-md-12 no-padding">
                                    <div class="form-group col-md-12" style="display: flex;">
                                        <div class="col-md-3" style="background-color: #B0C4DE; display: flex; align-items: center;">
                                            <div class="col-md-12">
                                                <label style="background: 0;">TODAS LAS EDADES</label>
                                            </div>
                                        </div>
                                        <div class="col-md-9 no-padding">
                                            <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                <div class="col-md-8">
                                                    <label style="background: 0;">Orejas</label>
                                                </div>
                                                <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="prese_orejas">
                                                    <div class="input-group col-md-7">
                                                        <input v-model="dato_9010.prese_orejas" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                    </div>
                                                </div>
                                                <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="integ_orejas">
                                                    <div class="input-group col-md-7">
                                                        <input v-model="dato_9010.integ_orejas" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                    </div>
                                                </div>
                                            </div>
    
                                            <div class="salto-linea"></div>
    
                                            <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                <div class="col-md-8">
                                                    <label style="background: 0;">Labios</label>
                                                </div>
                                                <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="prese_labios">
                                                    <div class="input-group col-md-7">
                                                        <input v-model="dato_9010.prese_labios" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                    </div>
                                                </div>
                                                <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="integ_labios">
                                                    <div class="input-group col-md-7">
                                                        <input v-model="dato_9010.integ_labios" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                    </div>
                                                </div>
                                            </div>
    
                                            <div class="salto-linea"></div>
    
                                            <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                <div class="col-md-8">
                                                    <label style="background: 0;">Lengua</label>
                                                </div>
                                                <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="prese_lengua">
                                                    <div class="input-group col-md-7">
                                                        <input v-model="dato_9010.prese_lengua" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                    </div>
                                                </div>
                                                <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="integ_lengua">
                                                    <div class="input-group col-md-7">
                                                        <input v-model="dato_9010.integ_lengua" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                    </div>
                                                </div>
                                            </div>
    
                                            <div class="salto-linea"></div>
    
                                            <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                <div class="col-md-8">
                                                    <label style="background: 0;">Nariz</label>
                                                </div>
                                                <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="prese_nariz">
                                                    <div class="input-group col-md-7">
                                                        <input v-model="dato_9010.prese_nariz" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                    </div>
                                                </div>
                                                <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="integ_nariz">
                                                    <div class="input-group col-md-7">
                                                        <input v-model="dato_9010.integ_nariz" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="salto-linea"></div>
                                            
                                            <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                <div class="col-md-8">
                                                    <label style="background: 0;">Paladar</label>
                                                </div>
                                                <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="prese_paladar">
                                                    <div class="input-group col-md-7">
                                                        <input v-model="dato_9010.prese_paladar" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                    </div>
                                                </div>
                                                <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="integ_paladar">
                                                    <div class="input-group col-md-7">
                                                        <input v-model="dato_9010.integ_paladar" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="salto-linea"></div>

                                            <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                <div class="col-md-8">
                                                    <label style="background: 0;">Ojos</label>
                                                </div>
                                                <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="prese_ojos">
                                                    <div class="input-group col-md-7">
                                                        <input v-model="dato_9010.prese_ojos" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                    </div>
                                                </div>
                                                <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="integ_ojos">
                                                    <div class="input-group col-md-7">
                                                        <input v-model="dato_9010.integ_ojos" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="salto-linea"></div>

                                            <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                <div class="col-md-8">
                                                    <label style="background: 0;">Dientes (acorde edad)</label>
                                                </div>
                                                <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="prese_dientes">
                                                    <div class="input-group col-md-7">
                                                        <input v-model="dato_9010.prese_dientes" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                    </div>
                                                </div>
                                                <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="integ_dientes">
                                                    <div class="input-group col-md-7">
                                                        <input v-model="dato_9010.integ_dientes" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="salto-linea"></div>

                                            <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                <div class="col-md-8">
                                                    <label style="background: 0;">Cuello</label>
                                                </div>
                                                <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="prese_cuello">
                                                    <div class="input-group col-md-7">
                                                        <input v-model="dato_9010.prese_cuello" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                    </div>
                                                </div>
                                                <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="integ_cuello">
                                                    <div class="input-group col-md-7">
                                                        <input v-model="dato_9010.integ_cuello" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="salto-linea"></div>

                                            <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                <div class="col-md-8">
                                                    <label style="background: 0;">Hombros</label>
                                                </div>
                                                <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="prese_hombros">
                                                    <div class="input-group col-md-7">
                                                        <input v-model="dato_9010.prese_hombros" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                    </div>
                                                </div>
                                                <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="integ_hombros">
                                                    <div class="input-group col-md-7">
                                                        <input v-model="dato_9010.integ_hombros" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>    
                                    </div>
                                </div>
                            </div>

                            <div v-show="[3,4,5,6,7,8].includes(pantalla_orden)" style="padding: 0 0 1rem 0;" class="col-md-12">
                                <div class="col-md-12 no-padding">
                                    <div class="form-group col-md-12" style="display: flex;">
                                        <div class="col-md-2" style="background-color: #B0C4DE;">
                                            <div style="padding: 9px;" class="text-center">
                                                <label style="background: 0;">RANGO DE EDAD</label>
                                            </div>
                                        </div>
                                        <div class="col-md-10 no-padding">
                                            <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                <div class="col-md-10 text-center" style="background-color: #B0C4DE; padding: 9px;">
                                                    <label style="background: 0;">REPORTE DE PADRES</label>
                                                </div>
                                                <div class="col-md-2 text-center" style="background-color: #B0C4DE; padding: 9px;">
                                                    <label style="background: 0;">RESPUESTA</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
    
                                <div class="salto-linea"></div>
                                <div class="salto-linea"></div>

                                <div v-if="pantalla_orden == 3" class="col-md-12 no-padding">
                                    <div class="col-md-12 no-padding">
                                        <div class="form-group col-md-12" style="display: flex;">
                                            <div class="col-md-2" style="background-color: #B0C4DE; display: flex; align-items: center;">
                                                <div class="col-md-12">
                                                    <label style="background: 0;">0 A 3 MESES</label>
                                                </div>
                                            </div>
                                            <div class="col-md-10 no-padding">
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">C: Cuando en casa se cierra una puerta, se cae un objeto o se escucha un ruido muy fuerte ¿el bebé se mueve, se queda quieto o llora?</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="bb_reaccio_ruido">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.bb_reaccio_ruido" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
        
                                                <div class="salto-linea"></div>
        
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">E: ¿Usted siente diferencias en el llanto del bebé dependiendo si es por hambre, por sueño, porque está mojado, o de mal humor?</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="dif_llanto_bb">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.dif_llanto_bb" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
        
                                                <div class="salto-linea"></div>
        
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">E: ¿El bebé succiona con fuerza el alimento u otros objetos?</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="bb_succiona_fuerza">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.bb_succiona_fuerza" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
    
                                                <div class="salto-linea"></div>
        
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">I: Cuando le habla al bebé, ¿él o ella lo mira?</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="bb_reac_habla">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.bb_reac_habla" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>    
                                        </div>
                                    </div>
        
                                    <div class="salto-linea"></div>
                                    <div class="salto-linea"></div>
                                    <div class="salto-linea"></div>
        
                                    <div class="col-md-12 no-padding">
                                        <div class="form-group col-md-12" style="display: flex;">
                                            <div class="col-md-2" style="background-color: #B0C4DE; display: flex; align-items: center;">
                                                <div class="col-md-12">
                                                    <label style="background: 0;">4 A 6 MESES</label>
                                                </div>
                                            </div>
                                            <div class="col-md-10 no-padding">
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">C: Cuando se escucha una puerta, timbre u otro sonido familiar ¿el bebé voltea la cabeza buscando el sonido?</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="bb_gira_cabez_ruido">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.bb_gira_cabez_ruido" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
        
                                                <div class="salto-linea"></div>
        
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">E: Cuando alguien le dice repeticiones de gestos y vocalizaciones como vocales “aaa”, “eee” o sílabas mamama o papapa ¿el bebé intenta emitir sonidos similares?</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="bb_repite_sonidos">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.bb_repite_sonidos" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
        
                                                <div class="salto-linea"></div>
        
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">I: Cuando interactúa, juega, canta, habla con su bebé, ¿él/ella hace sonidos o sonríe?</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="bb_rie_con_juegos">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.bb_rie_con_juegos" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>
                                    <div class="salto-linea"></div>
                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 no-padding">
                                        <div class="form-group col-md-12" style="display: flex;">
                                            <div class="col-md-2" style="background-color: #B0C4DE; display: flex; align-items: center;">
                                                <div class="col-md-12">
                                                    <label style="background: 0;">7 A 9 MESES</label>
                                                </div>
                                            </div>
                                            <div class="col-md-10 no-padding">
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">C: Cuando usted le canta o le conversa ¿el bebé muestra interés?</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="bb_dem_int_canto_hab">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.bb_dem_int_canto_hab" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
        
                                                <div class="salto-linea"></div>
        
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">E: Cuando el bebé quiere algo, ¿utiliza sonidos, sílabas palabras o gestos para solicitarlo?</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="bb_emit_sonido_pedi">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.bb_emit_sonido_pedi" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="pantalla_orden == 4" class="col-md-12 no-padding">
                                    <div class="col-md-12 no-padding">
                                        <div class="form-group col-md-12" style="display: flex;">
                                            <div class="col-md-2" style="background-color: #B0C4DE; display: flex; align-items: center;">
                                                <div class="col-md-12">
                                                    <label style="background: 0;">7 A 9 MESES</label>
                                                </div>
                                            </div>
                                            <div class="col-md-10 no-padding">
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">I: Cuando el bebé tiene alguna necesidad (por ejemplo, quiere algo, está incómodo o tiene hambre), ¿emite balbuceos, sonidos, señala o llora, para satisfacerla?</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="bb_emit_sonido_incom">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.bb_emit_sonido_incom" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>    
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>
                                    <div class="salto-linea"></div>
                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 no-padding">
                                        <div class="form-group col-md-12" style="display: flex;">
                                            <div class="col-md-2" style="background-color: #B0C4DE; display: flex; align-items: center;">
                                                <div class="col-md-12">
                                                    <label style="background: 0;">10 A 12 MESES</label>
                                                </div>
                                            </div>
                                            <div class="col-md-10 no-padding">
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">C: Cuando las personas le hablan, ¿el niño/a les presta atención?</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="nn_dem_aten_hablan">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.nn_dem_aten_hablan" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
        
                                                <div class="salto-linea"></div>
        
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">E: Cuando le dicen palabras nuevas, ¿el niño/a trata de imitarlas?</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="nn_imit_palab_nuev">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.nn_imit_palab_nuev" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
        
                                                <div class="salto-linea"></div>
        
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">E: El niño/a consume alimentos como papillas, jugos espesos, o galletas diariamente</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="nn_cons_dif_alim">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.nn_cons_dif_alim" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
    
                                                <div class="salto-linea"></div>
        
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">I: Cuando el niño/a quiere algún objeto (por ejemplo un juguete) ¿lo señala y/o hace sonidos para obtenerlo?</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="nn_emit_sonido_pedi">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.nn_emit_sonido_pedi" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>    
                                        </div>
                                    </div>
        
                                    <div class="salto-linea"></div>
                                    <div class="salto-linea"></div>
                                    <div class="salto-linea"></div>
        
                                    <div class="col-md-12 no-padding">
                                        <div class="form-group col-md-12" style="display: flex;">
                                            <div class="col-md-2" style="background-color: #B0C4DE; display: flex; align-items: center;">
                                                <div class="col-md-12">
                                                    <label style="background: 0;">13 A 15 MESES</label>
                                                </div>
                                            </div>
                                            <div class="col-md-10 no-padding">
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">C: Cuando usted le pide al niño/a que le muestre los ojos, la nariz, u otra parte del cuerpo (que él conozca) ¿lo hace?</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="nn_muest_part_cuerp">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.nn_muest_part_cuerp" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
        
                                                <div class="salto-linea"></div>
        
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">E: ¿El niño/a produce sonidos de animales o de objetos conocidos, por ejemplo gato, vaca, teléfono, etc.?</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="nn_imit_sonido_anim">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.nn_imit_sonido_anim" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
        
                                                <div class="salto-linea"></div>
        
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">I: ¿El niño/a toma y trae un objeto cuando quiere jugar con usted?</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="nn_toma_obj">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.nn_toma_obj" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>
                                    <div class="salto-linea"></div>
                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 no-padding">
                                        <div class="form-group col-md-12" style="display: flex;">
                                            <div class="col-md-2" style="background-color: #B0C4DE; display: flex; align-items: center;">
                                                <div class="col-md-12">
                                                    <label style="background: 0;">16 A 18 MESES</label>
                                                </div>
                                            </div>
                                            <div class="col-md-10 no-padding">
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">C: ¿El niño/a ejecuta acciones u órdenes sencillas cuando alguien se las solicita? Por ejemplo: “donde está la abuela”</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="nn_eje_acc_basicas">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.nn_eje_acc_basicas" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
        
                                                <div class="salto-linea"></div>
        
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">E: ¿El niño/a dice el nombre de diferentes objetos cotidianos cuando se le pregunta “Qué es esto?”</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="nn_pronu_nomb_obj">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.nn_pronu_nomb_obj" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="pantalla_orden == 5" class="col-md-12 no-padding">
                                    <div class="col-md-12 no-padding">
                                        <div class="form-group col-md-12" style="display: flex;">
                                            <div class="col-md-2" style="background-color: #B0C4DE; display: flex; align-items: center;">
                                                <div class="col-md-12">
                                                    <label style="background: 0;">16 A 18 MESES</label>
                                                </div>
                                            </div>
                                            <div class="col-md-10 no-padding">
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">I: ¿El niño/a pide cosas usando palabras, sílabas o sonidos vocálicos?</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="nn_pide_obj_palb">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.nn_pide_obj_palb" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>    
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>
                                    <div class="salto-linea"></div>
                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 no-padding">
                                        <div class="form-group col-md-12" style="display: flex;">
                                            <div class="col-md-2" style="background-color: #B0C4DE; display: flex; align-items: center;">
                                                <div class="col-md-12">
                                                    <label style="background: 0;">19 A 24 MESES</label>
                                                </div>
                                            </div>
                                            <div class="col-md-10 no-padding">
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">C: ¿El niño/a entiende y ejecuta órdenes? por ejemplo si le dicen: "Trae la cuchara de la cocina".</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="nn_ejec_ordenes">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.nn_ejec_ordenes" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
        
                                                <div class="salto-linea"></div>
        
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">E: ¿El niño/a dice cada vez más palabras, incluyendo: “Yo, mío, no, arriba, abajo” y nombres de objetos y acciones cotidianas?</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="nn_pron_mas_palab">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.nn_pron_mas_palab" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
        
                                                <div class="salto-linea"></div>
        
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">I: ¿El niño/a produce sonidos, sílabas y palabras, acompañadas de gestos, señalamientos, miradas y entonaciones de habla cuando quiere interactuar con otros?</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="nn_acomp_gest_habla">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.nn_acomp_gest_habla" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>    
                                        </div>
                                    </div>
        
                                    <div class="salto-linea"></div>
                                    <div class="salto-linea"></div>
                                    <div class="salto-linea"></div>
        
                                    <div class="col-md-12 no-padding">
                                        <div class="form-group col-md-12" style="display: flex;">
                                            <div class="col-md-2" style="background-color: #B0C4DE; display: flex; align-items: center;">
                                                <div class="col-md-12">
                                                    <label style="background: 0;">25 A 36 MESES</label>
                                                </div>
                                            </div>
                                            <div class="col-md-10 no-padding">
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">C: ¿El niño/a utiliza palabras como “Mío, tuyo, suyo, etc.” cuando se le pregunta a quién pertenece algún objeto conocido, por ejemplo: “De quién es esta camisa, de quién es este muñeco?”</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="nn_uti_posesivos">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.nn_uti_posesivos" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
        
                                                <div class="salto-linea"></div>
        
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">E: ¿El niño/a se mueve, se emociona, canta, aplaude, cuando le ponen música?</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="nn_exp_emoci_musica">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.nn_exp_emoci_musica" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
        
                                                <div class="salto-linea"></div>
        
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">E: ¿El niño/a muerde alimentos duros (por ejemplo galletas) y los come sin atorarse?</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="nn_cons_alim_duros">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.nn_cons_alim_duros" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
        
                                                <div class="salto-linea"></div>
        
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">I: ¿El niño/a se muestra interesado por comunicarse, por interactuar, conversar y jugar con otros niños de su edad, en diferentes situaciones?</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="nn_dem_int_jugar">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.nn_dem_int_jugar" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="pantalla_orden == 6" class="col-md-12 no-padding">
                                    <div class="col-md-12 no-padding">
                                        <div class="form-group col-md-12" style="display: flex;">
                                            <div class="col-md-2" style="background-color: #B0C4DE; display: flex; align-items: center;">
                                                <div class="col-md-12">
                                                    <label style="background: 0;">3 AÑOS 1 MES, A 4 AÑOS</label>
                                                </div>
                                            </div>
                                            <div class="col-md-10 no-padding">
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">C: En narraciones de hechos, cuentos o historias ¿el niño/a responde a preguntas de Qué, Cómo, Cuándo, etc.?</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="nn_resp_preg_hist">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.nn_resp_preg_hist" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="salto-linea"></div>
        
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">E: ¿El niño/a hace preguntas cuando se presenta una situación nueva para él?</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="nn_cuest_situ_nuev">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.nn_cuest_situ_nuev" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="salto-linea"></div>
        
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">I: ¿El niño/a expresa sus sentimientos, pensamientos, emociones, ideas cuando interactúa con personas cercanas?</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="nn_exp_sent_per_cer">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.nn_exp_sent_per_cer" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>    
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>
                                    <div class="salto-linea"></div>
                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 no-padding">
                                        <div class="form-group col-md-12" style="display: flex;">
                                            <div class="col-md-2" style="background-color: #B0C4DE; display: flex; align-items: center;">
                                                <div class="col-md-12">
                                                    <label style="background: 0;">4 AÑOS 1 MES, A 5 AÑOS</label>
                                                </div>
                                            </div>
                                            <div class="col-md-10 no-padding">
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">C: ¿El niño/a sabe y repite rondas, canciones, cuentos, historias cortas o fragmentos?</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="nn_sab_rep_canc">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.nn_sab_rep_canc" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
        
                                                <div class="salto-linea"></div>
        
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">E: ¿El niño/a habla utilizando frases de al menos cuatro palabras para contar hechos o expresar diferentes situaciones?</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="nn_exp_orac_4palb">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.nn_exp_orac_4palb" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
        
                                                <div class="salto-linea"></div>
        
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">I: ¿El niño/a comprende y responde cuando las personas saludan, se despiden, dicen “gracias” o "por favor"?</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="nn_sal_desp">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.nn_sal_desp" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>    
                                        </div>
                                    </div>
        
                                    <div class="salto-linea"></div>
                                    <div class="salto-linea"></div>
                                    <div class="salto-linea"></div>
        
                                    <div class="col-md-12 no-padding">
                                        <div class="form-group col-md-12" style="display: flex;">
                                            <div class="col-md-2" style="background-color: #B0C4DE; display: flex; align-items: center;">
                                                <div class="col-md-12">
                                                    <label style="background: 0;">5 AÑOS 1 MES, A 9 AÑOS</label>
                                                </div>
                                            </div>
                                            <div class="col-md-10 no-padding">
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">C: El niño/a cumple con varias indicaciones que se le dan al mismo tiempo, por ejemplo cuando usted le dice: “Primero te pones de pie, luego vas corriendo hasta la puerta y después das dos golpes con la mano” o “Trae el caballito, ponlo en el corral y dale de comer” </label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="nn_ejec_acc_consec">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.nn_ejec_acc_consec" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
        
                                                <div class="salto-linea"></div>
        
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">E: ¿Cuándo el niño/a habla o cuenta una historia se entiende claramente lo que dice y pronuncia bien todos los sonidos?</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="nn_habla_claridad">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.nn_habla_claridad" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="pantalla_orden == 7" class="col-md-12 no-padding">
                                    <div class="col-md-12 no-padding">
                                        <div class="form-group col-md-12" style="display: flex;">
                                            <div class="col-md-2" style="background-color: #B0C4DE; display: flex; align-items: center;">
                                                <div class="col-md-12">
                                                    <label style="background: 0;">5 AÑOS 1 MES, A 9 AÑOS</label>
                                                </div>
                                            </div>
                                            <div class="col-md-10 no-padding">
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">I: ¿El niño/a sostiene conversaciones con familiares y no familiares para expresar opiniones e intentar convencer de sus ideas a los demás?</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="nn_exp_opinion">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.nn_exp_opinion" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>    
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>
                                    <div class="salto-linea"></div>
                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 no-padding">
                                        <div class="form-group col-md-12" style="display: flex;">
                                            <div class="col-md-2" style="background-color: #B0C4DE; display: flex; align-items: center;">
                                                <div class="col-md-12">
                                                    <label style="background: 0;">9 AÑOS 1 MES, A 12 AÑOS 11 MESES</label>
                                                </div>
                                            </div>
                                            <div class="col-md-10 no-padding">
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">C: ¿El niño/a identifica errores, se ríe de errores e intenta corregirlos, cuando alguien los dice, por ejemplo, "la pelota tiene patas" “por la noche me como el desayuno”? </label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="nn_ident_err_corri">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.nn_ident_err_corri" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
        
                                                <div class="salto-linea"></div>
        
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">E: ¿El niño/a habla y explica el por qué de diversas situaciones, sentimientos y pensamientos utilizando palabras abstractas como orgullo, valor, amar, etc.?</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="nn_uti_palb_abst">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.nn_uti_palb_abst" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
        
                                                <div class="salto-linea"></div>
        
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">I: ¿El niño/a conversa con otros de diferentes temas, escuchando sus ideas y expresando con argumentos su acuerdo o desacuerdo?</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="nn_exp_arg_acu_desc">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.nn_exp_arg_acu_desc" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>    
                                        </div>
                                    </div>
                                </div>

                                <div v-if="pantalla_orden == 8" class="col-md-12 no-padding">
                                    <div class="col-md-12 no-padding">
                                        <div class="form-group col-md-12" style="display: flex;">
                                            <div class="col-md-2" style="background-color: #B0C4DE; display: flex; align-items: center;">
                                                <div class="col-md-12">
                                                    <label style="background: 0;">3 AÑOS A 5 AÑOS</label>
                                                </div>
                                            </div>
                                            <div class="col-md-10 no-padding">
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">V: ¿El niño/a disfruta actividades de movimientos del cuerpo como columpiarse, girar, dar botes, saltar?</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="nn_disf_act_fis">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.nn_disf_act_fis" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="salto-linea"></div>
        
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">V: ¿El niño/a camina recto, sin inclinarse hacia los lados y sin caerse constantemente?</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="nn_camina_correct">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.nn_camina_correct" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>    
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>
                                    <div class="salto-linea"></div>
                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 no-padding">
                                        <div class="form-group col-md-12" style="display: flex;">
                                            <div class="col-md-2" style="background-color: #B0C4DE; display: flex; align-items: center;">
                                                <div class="col-md-12">
                                                    <label style="background: 0;">5 AÑOS 1 MES, A 12 AÑOS 11 MESES</label>
                                                </div>
                                            </div>
                                            <div class="col-md-10 no-padding">
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">V: ¿El niño/a disfruta dar algunas vueltas sobre sí mismo, sin caerse? </label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="nn_disf_vuelt_sin_caer">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.nn_disf_vuelt_sin_caer" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
        
                                                <div class="salto-linea"></div>
        
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">V: ¿Cuándo el niño/a se tropieza, o siente que se va a caer, pone las manos para protegerse?</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="nn_protege_cae">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.nn_protege_cae" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
        
                                                <div class="salto-linea"></div>
        
                                                <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                                    <div class="col-md-10">
                                                        <label style="background: 0;">V: ¿El niño/a disfruta del movimiento en varias direcciones, velocidades y alturas? por ejemplo: subir al rodadero3, ¿sube y baja, montaña rusa, que lo suban o bajen rápidamente?</label>
                                                    </div>
                                                    <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="nn_disf_juego_extre">
                                                        <div class="input-group col-md-7">
                                                            <input v-model="dato_9010.nn_disf_juego_extre" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>    
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>
                                    <div class="salto-linea"></div>
                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 no-padding">
                                      <div class="col-md-4 no-padding">
                                          <div class="col-md-12 no-padding">
                                              <div class="form-group col-md-12" style="display: flex;">
                                                  <div class="col-md-12" style="background-color: #B0C4DE; display: flex; align-items: center; padding: 5px; border: 1px solid; border-bottom: 0;">
                                                      <div class="col-md-12 text-left" style="display: flex; align-items: center;">
                                                          <div class="col-md-6 no-padding">
                                                              <label style="background: 0;">Items</label>
                                                          </div>
                                                          <div class="col-md-6 text-center no-padding">
                                                              <label style="background: 0;">Respuestas Negativas</label>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                          <div class="col-md-12 no-padding">
                                              <div class="form-group col-md-12" style="display: flex;">
                                                  <div class="col-md-12 no-padding" style="border: 1px solid;">
                                                      <div class="col-md-12 text-left" style="display: flex; align-items: center; padding: 7px;">
                                                          <div class="col-md-6 no-padding">
                                                              <label style="background: 0;">Comprensión (C)</label>
                                                          </div>
                                                          <div class="col-md-6 text-center no-padding">
                                                              <label style="background: 0;">{{ resp_neg_compren }}</label>
                                                          </div>
                                                      </div>
                                                      <div class="salto-linea"></div>
                                                      <div class="col-md-12 text-left" style="display: flex; align-items: center; padding: 7px;">
                                                          <div class="col-md-6 no-padding">
                                                              <label style="background: 0;">Expresión (E)</label>
                                                          </div>
                                                          <div class="col-md-6 text-center no-padding">
                                                              <label style="background: 0;">{{ resp_neg_expres }}</label>
                                                          </div>
                                                      </div>
                                                      <div class="salto-linea"></div>
                                                      <div class="col-md-12 text-left" style="display: flex; align-items: center; padding: 7px;">
                                                          <div class="col-md-6 no-padding">
                                                              <label style="background: 0;">Interacción (I)</label>
                                                          </div>
                                                          <div class="col-md-6 text-center no-padding">
                                                              <label style="background: 0;">{{ resp_neg_interac }}</label>
                                                          </div>
                                                      </div>
                                                      <div class="salto-linea"></div>
                                                      <div class="col-md-12 text-left" style="display: flex; align-items: center; padding: 7px;">
                                                          <div class="col-md-6 no-padding">
                                                              <label style="background: 0;">Vestibular (V)</label>
                                                          </div>
                                                          <div class="col-md-6 text-center no-padding">
                                                              <label style="background: 0;">{{ resp_neg_vesitb }}</label>
                                                          </div>
                                                      </div>
                                                      <div class="salto-linea"></div>
                                                      <div class="col-md-12 text-right" style="display: flex; align-items: center; padding: 7px;">
                                                          <div class="col-md-6 no-padding">
                                                              <label style="background: 0;">Total</label>
                                                          </div>
                                                          <div class="col-md-6 text-center no-padding">
                                                              <label style="background: 0;">{{ total_resp_neg }}</label>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <div class="col-md-8 no-padding">
                                          <div class="col-md-12 no-padding">
                                              <div class="form-group col-md-12" style="display: flex;">
                                                  <div class="col-md-12" style="background-color: #B0C4DE; display: flex; align-items: center; padding: 5px; border: 1px solid;">
                                                      <div class="col-md-12">
                                                          <label style="background: 0;">Remisión</label>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>

                                          <div class="col-md-12 no-padding">
                                              <div class="col-md-12">
                                                  <div class="form-group col-md-12" style="border: 1px solid;">
                                                    <div class="col-md-12" style="display: flex; align-items: center; padding: 5px;">
                                                        <div class="col-md-9">
                                                            <label style="background: 0;">Remisión a evaluación de procesos de habla y lenguaje por fonoaudiologia, evaluación audiológica o servicio de urgencias</label>
                                                        </div>
                                                        <div class="col-md-3 no-padding" style="display: flex; justify-content: center;" id="rem_eval">
                                                            <div class="input-group col-md-7">
                                                                <input v-model="dato_9010.rem_eval" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-12" style="display: flex; align-items: center; padding: 5px;">
                                                        <div class="col-md-9">
                                                            <label style="background: 0;">La remisión es urgente?</label>
                                                        </div>
                                                        <div class="col-md-3 no-padding" style="display: flex; justify-content: center;" id="rem_urgent">
                                                            <div class="input-group col-md-7">
                                                                <input v-model="dato_9010.rem_urgent" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                                            </div>
                                                        </div>
                                                    </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`,
});
