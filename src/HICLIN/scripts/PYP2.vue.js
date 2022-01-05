// Escala abreviada del desarrollo V-3 -- David.M -- 05/04/2021

const { get_WSPYP2 } = require("../../HICLIN/scripts/reg_evo.js");

module.exports = Vue.component("pyp2", {
  props: {
    params: {
      estado: false,
    },
    data: {},
  },
  data() {
    return {
      dato_pyp2: get_WSPYP2(),
      pantalla_orden: "",
      cambio: "",
      fecha_act: moment().format("YYYYMMDD"),
      edad_paciente: {},
      edad_edit_ws: 0,
      rango_edit: 0,
      hcprc: {},
      novedad_w: 0,
      opc_re_escr: "",
      historial: {
        MG: [],
        MF: [],
        AL: [],
        PS: [],
      },
      indice: 1,
      punto_cierre: {
        MG: false,
        MF: false,
        AL: false,
        PS: false,
      },
      punto_inicio: {
        MG: false,
        MF: false,
        AL: false,
        PS: false,
      },
      acumulado: {
        MG: 0,
        MF: 0,
        AL: 0,
        PS: 0,
      },
      items_correctos: {
        MG: 0,
        MF: 0,
        AL: 0,
        PS: 0,
      },
      pt_directa: {
        MG: 0,
        MF: 0,
        AL: 0,
        PS: 0,
      },
      pt_tipica: {
        MG: 0,
        MF: 0,
        AL: 0,
        PS: 0,
      },
      llave_ult_evo: "",
      existe_anterior: false,
    };
  },
  watch: {
    "params.estado": function (val) {
      if (val) this.abrirArchivos();
    },
  },
  computed: {
    titulo() {
      switch (this.pantalla_orden) {
        case "MG":
          return "MOTRICIDAD GRUESA - 1-4";
        case "MF":
          return "MOTRICIDAD FINO ADAPTATIVA - 2-4";
        case "AL":
          return "AUDICIÓN LENGUAJE - 3-4";
        case "PS":
          return "PERSONAL SOCIAL - 4-4";
        default:
          return "";
      }
    },
  },
  created() {
    loader("show");
    $this = this;
  },
  methods: {
    abrirArchivos() {
      this.leerPaciente();
    },

    async leerPaciente() {
      if ($_REG_PACI.DESCRIP == "NO EXITS PACIENTE!") {
        CON851("", "01", null, "error", "Error");
        this.salir();
      } else {
        this.edad_paciente = SC_EDAD_AMD($_REG_PACI.NACIM, this.fecha_act);
        this.edad_edit_ws = `${cerosIzq(this.edad_paciente.años, 2)}${cerosIzq(this.edad_paciente.meses, 2)}${cerosIzq(
          this.edad_paciente.dias,
          2
        )}`;

        if (this.edad_edit_ws <= 70000) {
          // Menor-igual a 7 años
          await this.rangoEdad();
          this.leerMedico();
        } else {
          CON851("", "Edad fuera de rango", null, "error", "Error");
          this.salir_esc();
        }
      }
    },

    async leerMedico() {
      await postData(
        { datosh: datosEnvio(), paso: 1, codigo: $_REG_PROF.IDENTIFICACION },
        get_url("APP/SALUD/SER819.DLL")
      )
        .then((data) => {
          this.medico = data;
          if (data.NOMBRE.trim() == "Personal no atiende") {
            CON851("9X", "9X", null, "error", "Error");
            this.salir();
          } else {
            if (this.medico.ATIENDE_PROF == 2 || this.medico.ATIENDE_PROF == 6) {
              this.abrirArchivoConvEad3();
            } else {
              this.salir();
            }
          }
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error leyendo datos", null, "error", "Error");
          this.salir_esc();
        });
    },

    abrirArchivoConvEad3() {
      // pendiente
      this.abrirHistoria();
    },

    abrirHistoria() {
      postData(
        { datosh: datosEnvio() + $_REG_HC.llave_hc + "|" + localStorage.Usuario.trim() + "|1|" },
        get_url("APP/HICLIN/GET_HC.DLL")
      )
        .then(async (data) => {
          this.hcprc = data;
          if (this.hcprc.serv != 08) {
            CON851("", "4B", null, "error", "error");
            this.salir();
          } else {
            this.buscarAnterior();
          }
        })
        .catch((err) => {
          CON851("", "Error consultando datos", null, "error", "error");
          console.error(err, "err");
          loader("hide");
          this.salir_esc();
        });
    },

    buscarAnterior() {
      postData(
        { datosh: datosEnvio() + $_REG_HC.llave_hc + "|" + this.rango_edit + "|" },
        get_url("APP/HICLIN/GET_PYP2.DLL")
      )
        .then((data) => {
          loader("hide");
          this.dato_pyp2 = data;
          this.datoNovedad();
        })
        .catch((error) => {
          CON851("", "Error consultando datos", null, "error", "Error");
          console.error(error);
          this.salir_esc();
        });
    },

    datoNovedad() {
      this.pantalla_MG();
    },

    async pantalla_MG() {
      console.log(this.dato_pyp2.novedad, "NOVEDAD PYP2");
      console.log(this.opc_re_escr, "REESCRIBE");
      if (this.dato_pyp2.novedad == 8 && !this.opc_re_escr.trim()) {
        this.existe_anterior = true;
        CON851P(
          "Este paciente ya realizo la escala abreviada de desarrollo, Desea realizar un nuevo test?",
          () => {
            this.opc_re_escr = "N";
            this.imprimir("MG");
          },
          () => {
            this.opc_re_escr = "S";
            this.llave_ult_evo = this.dato_pyp2.llave_ult_evo;
            this.dato_pyp2 = get_WSPYP2();
            this.pantalla_orden = "MG";
            this.evaluarRangoEdad();
            this.preguntas_MG();
          }
        );
      } else {
        this.pantalla_orden = "MG";
        this.evaluarRangoEdad();
        this.preguntas_MG();
      }
    },

    async pantalla_MF() {
      this.pantalla_orden = "MF";
      this.evaluarRangoEdad();
      this.preguntas_MF();
    },

    async pantalla_AL() {
      this.pantalla_orden = "AL";
      this.evaluarRangoEdad();
      this.preguntas_AL();
    },

    async pantalla_PS() {
      this.pantalla_orden = "PS";
      this.evaluarRangoEdad();
      this.preguntas_PS();
    },

    validar(id) {
      let pos_eliminada = false;
      let $this = this;
      let orden = this.pantalla_orden;
      let anterior = this.historial[orden].find((e) => e.INDEX == this.indice - 1);
      let siguiente = this.historial[orden].find((e) => e.INDEX == this.indice + 1);
      validarInputs(
        {
          form: `#${id}`,
        },
        async () => {
          let contador_esc = this.historial[orden].length - 1;
          if (this.indice == 1) {
            // reset historial (orden especifico)
            if (siguiente) {
              this.dato_pyp2[orden][id] = "";
              this.indice += 1;
              this[`preguntas_${orden}`]();
            } else {
              this.historial[orden] = [];
              this.volver(orden, id);
            }
          } else {
            this.dato_pyp2[orden][id] = "";
            if (this.historial[orden].find((e) => e.INDEX == this.indice)) {
              this.historial[orden].splice(contador_esc, 1);
              pos_eliminada = true;
            }

            await this.validar_inicio(orden);

            if (this.historial[orden].length < 1) {
              this.volver(orden, id);
            } else {
              if (pos_eliminada) {
                // Si el input actual no ha sido guardado en historial
                this.indice = this.historial[orden][contador_esc - 1].INDEX;
                this.validar(this.historial[orden][contador_esc - 1].ID);
              } else {
                // Si el input actual fue guardado en historial
                this.indice = this.historial[orden][contador_esc].INDEX;
                this.validar(this.historial[orden][contador_esc].ID);
              }
            }
          }
        },
        async () => {
          this.dato_pyp2[`${orden}`][id] = this.dato_pyp2[`${orden}`][id].toUpperCase();
          if (this.dato_pyp2[`${orden}`][id] != "S") this.dato_pyp2[`${orden}`][id] = "N";
          // Se agraga un historial de cada input
          let ya_existe = this.historial[orden].find((e) => e.INDEX == this.indice);
          if (ya_existe) {
            this.historial[orden].map((obj, index) => {
              // Si ya existe el item en el historial, se reemplaza
              if (obj.INDEX == $this.indice) {
                $this.historial[orden][index] = {
                  ID: id,
                  VALUE: $this.dato_pyp2[`${orden}`][id],
                  INDEX: $this.indice,
                };
              }
            });
          } else {
            this.historial[orden].push({
              ID: id,
              VALUE: this.dato_pyp2[`${orden}`][id],
              INDEX: this.indice,
            });
          }

          await this.validar_inicio(orden);

          if (this.dato_pyp2[`${orden}`][id] == "N") {
            if (this.punto_inicio[orden]) {
              if ((anterior ? anterior.VALUE == "N" : false) || (siguiente ? siguiente.VALUE == "N" : false)) {
                // si ya existe el punto de inicio y el anterior o siguiente input es NO, se crea punto de cierre y se avanza
                this.punto_cierre[orden] = this.historial[orden].find((e) => e.INDEX == this.indice);
                this.indice = 37;
                this[`preguntas_${orden}`]();
              } else {
                this.indice = this.indice + 1;
                this[`preguntas_${orden}`]();
              }
            } else {
              if (this.indice > 1) {
                if (anterior ? anterior.VALUE == "S" : false) {
                  let primer_indice = Math.min.apply(
                    Math,
                    this.historial[orden].map(function (o) {
                      return o.INDEX;
                    })
                  );
                  // pasa al input anterior a un SI
                  this.indice = parseInt(primer_indice) - 1;
                  this[`preguntas_${orden}`]();
                } else {
                  this.indice = this.indice - 1;
                  this[`preguntas_${orden}`]();
                }
              } else {
                if (siguiente) {
                  // sobre el primer input, pasa a una ventana anterior o sale
                  this.indice = this.indice - 1;
                  this[`preguntas_${orden}`]();
                } else {
                  this.indice = this.indice + 1;
                  this[`preguntas_${orden}`]();
                }
              }
            }
          } else {
            if (this.punto_inicio[orden]) {
              // Si el punto de inicio ya existe continua flujo hacia abajo
              this.indice = this.indice + 1;
              this[`preguntas_${orden}`]();
            } else {
              if (anterior || siguiente) {
                if ((anterior ? anterior.VALUE == "S" : false) || (siguiente ? siguiente.VALUE == "S" : false)) {
                  // Si el input anterior o siguiente es SI, se crea el punto de inicio
                  this.punto_inicio[orden] = this.historial[orden].find((e) => e.INDEX == this.indice);
                  if (siguiente) {
                    let ultimo_indice = Math.max.apply(
                      Math,
                      this.historial[orden].map(function (o) {
                        return o.INDEX;
                      })
                    );
                    // Si hay un input lleno despues del ultimo SI, se desplaza hacia el ultimo input vacio
                    this.indice = parseInt(ultimo_indice) + 1;
                    this[`preguntas_${orden}`]();
                  } else {
                    this.indice = this.indice + 1;
                    this[`preguntas_${orden}`]();
                  }
                } else {
                  // Si el input anterior o siguiente es NO y no existe el punto de inicio, se devuelve
                  this.indice = this.indice - 1;
                  this[`preguntas_${orden}`]();
                }
              } else {
                // Si es el primer input y es SI, avanza al siguiente
                this.indice = this.indice + 1;
                this[`preguntas_${orden}`]();
              }
            }
          }
        }
      );
    },

    async validar_inicio(orden) {
      // Restablece el punto de inicio si no se devuelve
      if (this.punto_inicio[orden]) {
        let aun_existe = this.historial[orden].find((e) => e.INDEX == this.punto_inicio[orden].INDEX);
        if (aun_existe ? aun_existe.VALUE == "S" : false) {
          // continue
        } else {
          this.punto_inicio[orden] = false;
        }
      }
    },

    cambiar_pantalla(orden) {
      switch (orden) {
        case "MG":
          this.pantalla_MF();
          break;
        case "MF":
          this.pantalla_AL();
          break;
        case "AL":
          this.pantalla_PS();
          break;
        case "PS":
          this.grabar(orden);
          break;
      }
    },

    grabar(orden) {
      let datos = {};

      this.dato_pyp2.rango_edad = this.rango_edit.toString();
      this.dato_pyp2.fecha_edad_paci = this.edad_edit_ws.toString();
      this.dato_pyp2.und_edad = this.edad_paciente.unidad;
      this.dato_pyp2.llave_ult_evo = this.llave_ult_evo;

      datos = _getObjetoSaveHc(this.dato_pyp2);

      datos.llave_hc = $_REG_HC.llave_hc;
      datos.admin = localStorage.Usuario;
      datos.medico = this.medico.IDENTIFICACION;
      datos.novedad = this.existe_anterior ? "8" : "7";
      datos.nombres_aco = this.hcprc.acompa;

      console.log(datos, "datos");

      postData(datos, get_url(`APP/HICLIN/SAVE_PYP2.DLL`))
        .then((data) => {
          CON851("", `Grabado correctamente`, null, "success", "Correcto");
          this.imprimir("PS");
        })
        .catch((err) => {
          console.error(err);
          CON851("", `Error grabando datos`, null, "error", "Error");
          this.validar(this.historial[orden][this.historial[orden].length - 1].ID);
        });
    },

    volver(orden, id) {
      CON851P(
        "03",
        () => {
          this.validar(id);
        },
        () => {
          let ult_reg = 0;
          // reset historial (orden especifico)
          this.historial[orden] = [];
          switch (orden) {
            case "MG":
              this.salir_esc();
              break;
            case "MF":
              ult_reg = this.historial.MG.length;
              // Devuelve el indice a donde quedó
              this.indice = this.historial.MG[ult_reg - 1].INDEX;
              this.pantalla_orden = "MG";
              this.preguntas_MG();
              break;
            case "AL":
              ult_reg = this.historial.MF.length;
              this.indice = this.historial.MF[ult_reg - 1].INDEX;
              this.pantalla_orden = "MF";
              this.preguntas_MF();
              break;
            case "PS":
              ult_reg = this.historial.AL.length;
              this.indice = this.historial.AL[ult_reg - 1].INDEX;
              this.pantalla_orden = "AL";
              this.preguntas_AL();
              break;
          }
        }
      );
    },

    preguntas_MG() {
      switch (this.indice) {
        case 00:
          this.cambiar_pantalla("MG");
          break;
        case 01:
          this.validar("reflej_busq_succi");
          break;
        case 02:
          this.validar("reflej_moro_pres_simet");
          break;
        case 03:
          this.validar("mueve_extremidades");
          break;
        case 04:
          this.validar("sost_cabe_levan_braz");
          break;
        case 05:
          this.validar("levan_cabe_pecho_prono");
          break;
        case 06:
          this.validar("gira_cobe_ln_media");
          break;
        case 07:
          this.validar("contr_cabe_sent_apo");
          break;
        case 08:
          this.validar("se_voltea");
          break;
        case 09:
          this.validar("se_mant_sent_moment");
          break;
        case 10:
          this.validar("se_mant_sent_sin_apo");
          break;
        case 11:
          this.validar("adopt_posic_sentado");
          break;
        case 12:
          this.validar("se_arrast_posic_prono");
          break;
        case 13:
          this.validar("gatea_despla_curzado");
          break;
        case 14:
          this.validar("adopt_posic_bipe_apo");
          break;
        case 15:
          this.validar("se_sost_pie_sin_apo");
          break;
        case 16:
          this.validar("pone_de_pie_sin_ayuda");
          break;
        case 17:
          this.validar("pasos_solo");
          break;
        case 18:
          this.validar("camin_desp_cruz_sin_ayud");
          break;
        case 19:
          this.validar("corre");
          break;
        case 20:
          this.validar("lanza_pelota");
          break;
        case 21:
          this.validar("patea_pelota");
          break;
        case 22:
          this.validar("salta_pies_juntos");
          break;
        case 23:
          this.validar("se_empina_ambos_pies");
          break;
        case 24:
          this.validar("sube_2_escal_sin_apo");
          break;
        case 25:
          this.validar("camin_punta_pies");
          break;
        case 26:
          this.validar("se_para_1_pie");
          break;
        case 27:
          this.validar("baja_2_escal_sin_apo");
          break;
        case 28:
          this.validar("camin_ln_rect_sin_apo");
          break;
        case 29:
          this.validar("salta_3_un_pie");
          break;
        case 30:
          this.validar("rebota_agarra_pelota");
          break;
        case 31:
          this.validar("hace_caballitos");
          break;
        case 32:
          this.validar("salt_lado_ln_pies_junt");
          break;
        case 33:
          this.validar("salt_despla_ambos_pies");
          break;
        case 34:
          this.validar("equi_punt_pies_ojos_cer");
          break;
        case 35:
          this.validar("saltos_alter_secuenc");
          break;
        case 36:
          this.validar("real_activ_integ_motora");
          break;
        case 37:
          this.calcularPuntuacion("MG");
          break;
      }
    },

    preguntas_MF() {
      switch (this.indice) {
        case 00:
          this.cambiar_pantalla("MF");
          break;
        case 01:
          this.validar("reflej_presion_palmar");
          break;
        case 02:
          this.validar("reacc_luz_sonidos");
          break;
        case 03:
          this.validar("sigue_movi_horiz");
          break;
        case 04:
          this.validar("abre_mira_sus_manos");
          break;
        case 05:
          this.validar("sotiene_obj_mano");
          break;
        case 06:
          this.validar("lleva_obj_boca");
          break;
        case 07:
          this.validar("agarra_obj_volunt");
          break;
        case 08:
          this.validar("ret_obj_quitar");
          break;
        case 09:
          this.validar("pasa_obj_manos");
          break;
        case 10:
          this.validar("sost_obj_cada_mano");
          break;
        case 11:
          this.validar("deja_caer_obj_inten");
          break;
        case 12:
          this.validar("agarra_pulgar_indice");
          break;
        case 13:
          this.validar("agarra_terc_obj_sin_solt");
          break;
        case 14:
          this.validar("saca_obj_contenedor");
          break;
        case 15:
          this.validar("busca_obj_escondido");
          break;
        case 16:
          this.validar("hace_torre_3_cubos");
          break;
        case 17:
          this.validar("pasa_hojas_libro");
          break;
        case 18:
          this.validar("agarra_cuchara_llev_boca");
          break;
        case 19:
          this.validar("garabatea_expont");
          break;
        case 20:
          this.validar("quita_tapa_contenedor");
          break;
        case 21:
          this.validar("hace_torre_5_cubos");
          break;
        case 22:
          this.validar("ensart_cuent_perf_pinza");
          break;
        case 23:
          this.validar("rasg_pap_pinza_2_manos");
          break;
        case 24:
          this.validar("copia_ln_vert_horiz");
          break;
        case 25:
          this.validar("hace_bola_pap_dedos");
          break;
        case 26:
          this.validar("copia_circulo");
          break;
        case 27:
          this.validar("fig_humana_rudiment");
          break;
        case 28:
          this.validar("imita_dibujo_escalera");
          break;
        case 29:
          this.validar("cort_pap_tijera");
          break;
        case 30:
          this.validar("fig_humana_2");
          break;
        case 31:
          this.validar("dibuja_hogar");
          break;
        case 32:
          this.validar("mod_cubos_escalera");
          break;
        case 33:
          this.validar("copia_triangulo");
          break;
        case 34:
          this.validar("copia_fig_puntos");
          break;
        case 35:
          this.validar("hace_fig_plegada");
          break;
        case 36:
          this.validar("ensart_cordon_cruzado");
          break;
        case 37:
          this.calcularPuntuacion("MF");
          break;
      }
    },

    preguntas_AL() {
      switch (this.indice) {
        case 00:
          this.cambiar_pantalla("AL");
          break;
        case 01:
          this.validar("se_sobresalta_ruido");
          break;
        case 02:
          this.validar("contemp_moment_persona");
          break;
        case 03:
          this.validar("llora_expre_necesi");
          break;
        case 04:
          this.validar("se_tranq_voz_humana");
          break;
        case 05:
          this.validar("produc_soni_gutur_indif");
          break;
        case 06:
          this.validar("busc_soni_mirada");
          break;
        case 07:
          this.validar("busc_dif_soni_mirada");
          break;
        case 08:
          this.validar("pone_atenc_conversacion");
          break;
        case 09:
          this.validar("produc_4_mas_soni_dif");
          break;
        case 10:
          this.validar("pronunc_3_mas_silabas");
          break;
        case 11:
          this.validar("reacc_llamado_nomre");
          break;
        case 12:
          this.validar("reacc_3_palabas_dif");
          break;
        case 13:
          this.validar("reacc_palab_no");
          break;
        case 14:
          this.validar("llama_cuidador");
          break;
        case 15:
          this.validar("resp_instruc_sencilla");
          break;
        case 16:
          this.validar("aprox_palab_intenc_comu");
          break;
        case 17:
          this.validar("recon_6_obj_imag");
          break;
        case 18:
          this.validar("sigue_instruc_2_pasos");
          break;
        case 19:
          this.validar("nombra_5_obj_imag");
          break;
        case 20:
          this.validar("uti_mas_20_palab");
          break;
        case 21:
          this.validar("usa_frac_2_palab");
          break;
        case 22:
          this.validar("dice_nom_completo");
          break;
        case 23:
          this.validar("dice_frac_3_palab");
          break;
        case 24:
          this.validar("recon_cualid_obj");
          break;
        case 25:
          this.validar("define_uso_5_obj");
          break;
        case 26:
          this.validar("hace_comparativos");
          break;
        case 27:
          this.validar("describe_dibujo");
          break;
        case 28:
          this.validar("recon_5_colores");
          break;
        case 29:
          this.validar("resp_3_preg_relato");
          break;
        case 30:
          this.validar("elab_relato_imag");
          break;
        case 31:
          this.validar("expresa_opiniones");
          break;
        case 32:
          this.validar("repit_palb_pronunc_corr");
          break;
        case 33:
          this.validar("absurdos_visuales");
          break;
        case 34:
          this.validar("ident_palab_soni_parec");
          break;
        case 35:
          this.validar("conoce_ayer_hoy_man");
          break;
        case 36:
          this.validar("ordena_hist_relata");
          break;
        case 37:
          this.calcularPuntuacion("AL");
          break;
      }
    },

    preguntas_PS() {
      switch (this.indice) {
        case 00:
          this.cambiar_pantalla("PS");
          break;
        case 01:
          this.validar("tranq_toma_brazos");
          break;
        case 02:
          this.validar("resp_caricias");
          break;
        case 03:
          this.validar("bebe_registrado");
          break;
        case 04:
          this.validar("recon_voz_cuidador_ppal");
          break;
        case 05:
          this.validar("sonrisa_social");
          break;
        case 06:
          this.validar("resp_conversacion");
          break;
        case 07:
          this.validar("coge_manos_examin");
          break;
        case 08:
          this.validar("rie_carcajadas");
          break;
        case 09:
          this.validar("busc_conti_juego");
          break;
        case 10:
          this.validar("reacc_desconf_extrano");
          break;
        case 11:
          this.validar("busc_apoyo_cuidador");
          break;
        case 12:
          this.validar("reacc_imag_espejo");
          break;
        case 13:
          this.validar("participa_juegos");
          break;
        case 14:
          this.validar("int_aliment_solo");
          break;
        case 15:
          this.validar("explora_entorno");
          break;
        case 16:
          this.validar("sigue_rutinas");
          break;
        case 17:
          this.validar("ayuda_desvestirse");
          break;
        case 18:
          this.validar("senala_5_part_cuerpo");
          break;
        case 19:
          this.validar("acce_tol_cont_piel_text");
          break;
        case 20:
          this.validar("expresa_satisf_logro");
          break;
        case 21:
          this.validar("ident_emoci_basic_imag");
          break;
        case 22:
          this.validar("ident_obj_prop_otros");
          break;
        case 23:
          this.validar("dice_nomb_famil_cerc");
          break;
        case 24:
          this.validar("expresa_verb_emoci");
          break;
        case 25:
          this.validar("recha_ayud_int_solo");
          break;
        case 26:
          this.validar("compart_juegos_otros");
          break;
        case 27:
          this.validar("recon_emoci_otros");
          break;
        case 28:
          this.validar("puede_vest_desv_solo");
          break;
        case 29:
          this.validar("propone_juegos");
          break;
        case 30:
          this.validar("sabe_su_edad");
          break;
        case 31:
          this.validar("part_juego_resp_reglas");
          break;
        case 32:
          this.validar("comenta_vida_familiar");
          break;
        case 33:
          this.validar("colab_inici_prop_activ");
          break;
        case 34:
          this.validar("manif_emoc_acomt_import");
          break;
        case 35:
          this.validar("recon_norma_prohib");
          break;
        case 36:
          this.validar("recon_emoci_complejas");
          break;
        case 37:
          this.calcularPuntuacion("PS");
          break;
      }
    },

    calcularPuntuacion(orden) {
      this.inicializar_variables(orden);

      for (let i in this.historial[orden]) {
        if (this.historial[orden][i].VALUE == "S") {
          // Items valorados positivos
          this.items_correctos[orden] += 1;
        }
      }

      if (this.punto_inicio) {
        let anterior = this.historial[orden].find((e) => e.INDEX == this.punto_inicio[orden].INDEX - 1);
        if (anterior) {
          this.acumulado[orden] = this.punto_inicio[orden].INDEX - 2;
        } else {
          if (this.punto_inicio[orden].INDEX > 1) {
            this.acumulado[orden] = this.punto_inicio[orden].INDEX - 1;
          } else {
            this.acumulado[orden] = 0;
          }
        }
      } else {
        this.acumulado[orden] = 0;
      }

      this.pt_directa[orden] = this.acumulado[orden] + this.items_correctos[orden];
      this.pt_tipica[orden] = conversiones_PT_TIPICA_PYP2(orden, this.pt_directa[orden], this.rango_edit);

      this.dato_pyp2[orden][`p_inicio_ead3_${orden.toLowerCase()}`] = this.punto_inicio[orden]
        ? this.punto_inicio[orden].INDEX.toString()
        : "00";
      this.dato_pyp2[orden][`p_cierre_ead3_${orden.toLowerCase()}`] = this.punto_cierre[orden]
        ? this.punto_cierre[orden].INDEX.toString()
        : "00";
      this.dato_pyp2[orden][`pt_directa_ead3_${orden.toLowerCase()}`] = this.pt_directa[orden].toString();
      this.dato_pyp2[orden][`pt_tipica_ead3_${orden.toLowerCase()}`] = this.pt_tipica[orden].toString();
      this.dato_pyp2[orden][`acumulado_ead3_${orden.toLowerCase()}`] = this.acumulado[orden].toString();
      this.dato_pyp2[orden][`items_correctos_ead3_${orden.toLowerCase()}`] = this.items_correctos[orden].toString();
      this.cambiar_pantalla(orden);
    },

    inicializar_variables(orden) {
      this.acumulado[orden] = 0;
      this.items_correctos[orden] = 0;
      this.pt_directa[orden] = 0;
      this.pt_tipica[orden] = 0;
    },

    async rangoEdad() {
      await rangoEdad_mainHc(this.edad_edit_ws).then((data) => {
        this.rango_edit = data;
      });
    },

    evaluarRangoEdad() {
      switch (this.rango_edit) {
        case 01:
          this.inicio_pregunta = 01;
          break;
        case 02:
          this.inicio_pregunta = 04;
          break;
        case 03:
          this.inicio_pregunta = 07;
          break;
        case 04:
          this.inicio_pregunta = 10;
          break;
        case 05:
          this.inicio_pregunta = 13;
          break;
        case 06:
          this.inicio_pregunta = 16;
          break;
        case 07:
          this.inicio_pregunta = 19;
          break;
        case 08:
          this.inicio_pregunta = 22;
          break;
        case 09:
          this.inicio_pregunta = 25;
          break;
        case 10:
          this.inicio_pregunta = 28;
          break;
        case 11:
          this.inicio_pregunta = 31;
          break;
        case 12:
          this.inicio_pregunta = 34;
          break;
      }
      this.indice = this.inicio_pregunta;
    },

    salir_esc() {
      loader("hide");
      this.opc_re_escr = "";
      this.$emit("callback_esc");
    },

    salir() {
      loader("hide");
      this.opc_re_escr = "";
      switch (this.params.estado) {
        case 1:
          this.$emit("callback");
          break;
        case 2:
          this.$emit("callback_esc");
          break;
      }
    },

    async imprimir(orden) {
      CON851P(
        "00",
        () => {
          this.salir();
        },
        () => {
          loader("hide");
          const { imprimir_PYP2I } = require("../../frameworks/pdf/hiclin/PYP2I.formato");

          imprimir_PYP2I({
            hcprc: this.hcprc,
            paci: $_REG_PACI,
            callback_error: () => {
              if (this.historial.MG.length > 0) {
                this.validar(this.historial[orden][this.historial[orden].length - 1].ID);
              } else {
                this.salir();
              }
            },
            callback: () => {
              this.salir();
            },
          });
        }
      );
    },
  },
  template: /*html*/ `
        <div class="col-md-12 form-group no-padding">
            <div class="portlet light no-padding">
                <div class="form-horizontal">

                    <div class="portlet light box-center box-title">
                        <div class="portlet-title">
                            <div class="caption" style="float: none;">
                                <span class="caption-subject bold">Escala abreviada del desarrollo - {{ titulo }}</span>
                            </div>
                        </div>
                    </div>

                    <div v-show="pantalla_orden == 'MG'" class="col-md-12 no-padding" style="display: flex;">
                        <div class="col-md-6 no-padding form-group box-center" style="padding-bottom: 5px !important;">
                            <div class="col-md-12 form-group no-padding">
                                <div class="col-md-2" style="background-color: #B0C4DE;">
                                    <div style="padding: 9px;" class="text-center">
                                        <label style="background: 0;">RANGO</label>
                                    </div>
                                </div>
                                <div class="col-md-10 text-center" style="background-color: #B0C4DE; padding: 9px;">
                                    <label style="background: 0;">ENUNCIADO</label>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 0 días a <br> a 1 mes <br> y 0 días </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Realiza reflejo de busqueda y succión</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="reflej_busq_succi">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MG.reflej_busq_succi" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Reflejo del moro esta presente y simetrico</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="reflej_moro_pres_simet">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MG.reflej_moro_pres_simet" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Mueve sus extremidades</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="mueve_extremidades">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MG.mueve_extremidades" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 1 mes y<br>1 día a<br>3 meses y<br>0 días </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Sostiene la cabeza al levantarlo de brazos</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="sost_cabe_levan_braz">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MG.sost_cabe_levan_braz" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Levanta la cabeza y pecho en prono</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="levan_cabe_pecho_prono">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MG.levan_cabe_pecho_prono" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Gira la cabeza desde la linea media</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="gira_cobe_ln_media">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MG.gira_cobe_ln_media" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 3 meses y<br>1 día a<br>6 meses y<br>0 días </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Control de cabeza sentado con apoyo</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="contr_cabe_sent_apo">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MG.contr_cabe_sent_apo" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Se voltea</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="se_voltea">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MG.se_voltea" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Se mantiene sentado momentaneamente</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="se_mant_sent_moment">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MG.se_mant_sent_moment" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 6 meses y<br>1 día a<br>9 meses y<br>0 días </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Se mantiene sentado sin apoyo</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="se_mant_sent_sin_apo">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MG.se_mant_sent_sin_apo" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Adopta posición de sentado</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="adopt_posic_sentado">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MG.adopt_posic_sentado" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Se arrastra en posición de prono</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="se_arrast_posic_prono">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MG.se_arrast_posic_prono" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 9 meses y<br>1 día a<br>12 meses y<br>0 días </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Gatea con desplazamiento cruzado</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="gatea_despla_curzado">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MG.gatea_despla_curzado" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Adopta posición bípeda y se sostiene de pie con apoyo</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="adopt_posic_bipe_apo">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MG.adopt_posic_bipe_apo" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Se sostiene de pie sin apoyo</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="se_sost_pie_sin_apo">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MG.se_sost_pie_sin_apo" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center;">
                                <div class="col-md-2 no-padding">
                                    <label> 12 meses y<br>1 día a<br>18 meses y<br>0 días </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Se pone de pie sin ayuda</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="pone_de_pie_sin_ayuda">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MG.pone_de_pie_sin_ayuda" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Da pasos solo(a)</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="pasos_solo">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MG.pasos_solo" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Camina con desplazamiento cruzado sin ayuda</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="camin_desp_cruz_sin_ayud">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MG.camin_desp_cruz_sin_ayud" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="col-md-6 no-padding form-group box-center" style="padding-bottom: 5px !important; float: right; margin-left: 8px !important; ">
                            <div class="col-md-12 form-group no-padding">
                                <div class="col-md-2" style="background-color: #B0C4DE;">
                                    <div style="padding: 9px;" class="text-center">
                                        <label style="background: 0;">RANGO</label>
                                    </div>
                                </div>
                                <div class="col-md-10 text-center" style="background-color: #B0C4DE; padding: 9px;">
                                    <label style="background: 0;">ENUNCIADO</label>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 18 meses y<br>1 día a<br>24 meses y<br>0 días </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Corre</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="corre">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MG.corre" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Lanza la pelota</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="lanza_pelota">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MG.lanza_pelota" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Patea la pelota</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="patea_pelota">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MG.patea_pelota" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 2 a 3 años<br>(24 meses y 1<br>día a 36 meses<br>y 0 días) </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Salta con los pies juntos</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="salta_pies_juntos">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MG.salta_pies_juntos" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Se empina en ambos pies</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="se_empina_ambos_pies">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MG.se_empina_ambos_pies" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Sube dos escalones sin apoyo</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="sube_2_escal_sin_apo">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MG.sube_2_escal_sin_apo" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 3 a 4 años<br>(36 meses y 1<br>día a 48 meses<br>y 0 días) </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Camina en puntas de pies</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="camin_punta_pies">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MG.camin_punta_pies" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Se para en un solo pie</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="se_para_1_pie">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MG.se_para_1_pie" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Baja dos escalones con apoyo mínimo, alternando los pies</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="baja_2_escal_sin_apo">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MG.baja_2_escal_sin_apo" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 4 a 5 años<br>(48 meses y 1<br>día a 60 meses<br>y 0 días) </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Camina sobre una línea recta sin apoyo visual</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="camin_ln_rect_sin_apo">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MG.camin_ln_rect_sin_apo" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Salta en tres o más ocasiones en un pie</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="salta_3_un_pie">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MG.salta_3_un_pie" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Hace rebotar y agarra la pelota</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="rebota_agarra_pelota">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MG.rebota_agarra_pelota" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 5 a 6 años<br>(60 meses y 1<br>día a 72 meses<br>y 0 días) </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Hace “caballitos” (alternando los pies).</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="hace_caballitos">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MG.hace_caballitos" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Salta de lado a lado de una línea con los pies juntos</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="salt_lado_ln_pies_junt">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MG.salt_lado_ln_pies_junt" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Salta desplazándose con ambos pies</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="salt_despla_ambos_pies">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MG.salt_despla_ambos_pies" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center;">
                                <div class="col-md-2 no-padding">
                                    <label> 6 a 7 años<br>(72 meses y 1<br>día a 84 meses<br>y 0 días </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Mantiene el equilibrio en la punta de los pies con los ojos cerrados.</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="equi_punt_pies_ojos_cer">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MG.equi_punt_pies_ojos_cer" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Realiza saltos alternados en secuencia</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="saltos_alter_secuenc">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MG.saltos_alter_secuenc" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Realiza alguna actividad de integración motora</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="real_activ_integ_motora">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MG.real_activ_integ_motora" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-show="pantalla_orden == 'MF'" class="col-md-12 no-padding" style="display: flex;">
                        <div class="col-md-6 no-padding form-group box-center" style="padding-bottom: 5px !important;">
                            <div class="col-md-12 form-group no-padding">
                                <div class="col-md-2" style="background-color: #B0C4DE;">
                                    <div style="padding: 9px;" class="text-center">
                                        <label style="background: 0;">RANGO</label>
                                    </div>
                                </div>
                                <div class="col-md-10 text-center" style="background-color: #B0C4DE; padding: 9px;">
                                    <label style="background: 0;">ENUNCIADO</label>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 0 días a<br>a 1 mes<br>y 0 días </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Reflejo de prensión palmar</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="reflej_presion_palmar">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MF.reflej_presion_palmar" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Reacciona ante luz y sonidos</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="reacc_luz_sonidos">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MF.reacc_luz_sonidos" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Sigue movimiento horizonta</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="sigue_movi_horiz">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MF.sigue_movi_horiz" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 1 mes y<br>1 día a<br>3 meses y<br>0 días </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Abre y mira sus manos</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="abre_mira_sus_manos">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MF.abre_mira_sus_manos" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Sostiene objeto en la mano</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="sotiene_obj_mano">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MF.sotiene_obj_mano" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Se lleva un objeto a la boca</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="lleva_obj_boca">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MF.lleva_obj_boca" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 3 meses y<br>1 día a<br>6 meses y<br>0 días </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Agarra objetos voluntariamente</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="agarra_obj_volunt">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MF.agarra_obj_volunt" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Retiene un objeto cuando se lo intentan quitar</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="ret_obj_quitar">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MF.ret_obj_quitar" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Pasa objeto de una mano a otra</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="pasa_obj_manos">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MF.pasa_obj_manos" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 6 meses y<br>1 día a<br>9 meses y<br>0 días </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Sostiene un objeto en cada mano</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="sost_obj_cada_mano">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MF.sost_obj_cada_mano" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Deja caer los objetos intencionalmente</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="deja_caer_obj_inten">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MF.deja_caer_obj_inten" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Agarra con pulgar e índice (pinza)</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="agarra_pulgar_indice">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MF.agarra_pulgar_indice" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 9 meses y<br>1 día a<br>12 meses y<br>0 días </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Agarra tercer objeto sin soltar otros</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="agarra_terc_obj_sin_solt">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MF.agarra_terc_obj_sin_solt" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Saca objetos del contenedor</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="saca_obj_contenedor">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MF.saca_obj_contenedor" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Busca objetos escondidos</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="busca_obj_escondido">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MF.busca_obj_escondido" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center;">
                                <div class="col-md-2 no-padding">
                                    <label> 12 meses y<br>1 día a<br>18 meses y<br>0 días </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Hace torre de tres cubos</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="hace_torre_3_cubos">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MF.hace_torre_3_cubos" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Pasa hojas de un libro</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="pasa_hojas_libro">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MF.pasa_hojas_libro" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Agarra una cuchara y se la lleva a la boca</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="agarra_cuchara_llev_boca">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MF.agarra_cuchara_llev_boca" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="col-md-6 no-padding form-group box-center" style="padding-bottom: 5px !important; float: right; margin-left: 8px !important; ">
                            <div class="col-md-12 form-group no-padding">
                                <div class="col-md-2" style="background-color: #B0C4DE;">
                                    <div style="padding: 9px;" class="text-center">
                                        <label style="background: 0;">RANGO</label>
                                    </div>
                                </div>
                                <div class="col-md-10 text-center" style="background-color: #B0C4DE; padding: 9px;">
                                    <label style="background: 0;">ENUNCIADO</label>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 18 meses y<br>1 día a<br>24 meses y<br>0 días </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Garabatea espontáneamente</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="garabatea_expont">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MF.garabatea_expont" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Quita la tapa del contenedor o frasco de muestra de orina</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="quita_tapa_contenedor">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MF.quita_tapa_contenedor" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Hace torre de cinco cubos</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="hace_torre_5_cubos">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MF.hace_torre_5_cubos" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 2 a 3 años<br>(24 meses y 1<br>día a 36 meses<br>y 0 días) </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Ensarta cuentas perforadas con pinza</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="ensart_cuent_perf_pinza">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MF.ensart_cuent_perf_pinza" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Rasga papel con pinza de ambas manos</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="rasg_pap_pinza_2_manos">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MF.rasg_pap_pinza_2_manos" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Copia línea horizontal y vertical</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="copia_ln_vert_horiz">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MF.copia_ln_vert_horiz" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 3 a 4 años<br>(36 meses y 1<br>día a 48 meses<br>y 0 días) </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Hace una bola de papel con sus dedos</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="hace_bola_pap_dedos">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MF.hace_bola_pap_dedos" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Copia círculo</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="copia_circulo">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MF.copia_circulo" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Figura humana rudimentaria</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="fig_humana_rudiment">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MF.fig_humana_rudiment" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 4 a 5 años<br>(48 meses y 1<br>día a 60 meses<br>y 0 días) </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Imita el dibujo de una escalera</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="imita_dibujo_escalera">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MF.imita_dibujo_escalera" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Corta papel con las tijeras</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="cort_pap_tijera">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MF.cort_pap_tijera" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Figura humana 2</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="fig_humana_2">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MF.fig_humana_2" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 5 a 6 años<br>(60 meses y 1<br>día a 72 meses<br>y 0 días) </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Dibuja el lugar en el que vive</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="dibuja_hogar">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MF.dibuja_hogar" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Modelo de cubos “escalera”</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="mod_cubos_escalera">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MF.mod_cubos_escalera" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Copia de un triángulo</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="copia_triangulo">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MF.copia_triangulo" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center;">
                                <div class="col-md-2 no-padding">
                                    <label> 6 a 7 años<br>(72 meses y 1<br>día a 84 meses<br>y 0 días </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Copia de una fgura de puntos</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="copia_fig_puntos">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MF.copia_fig_puntos" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Puede hacer una fgura plegada</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="hace_fig_plegada">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MF.hace_fig_plegada" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Ensarta cordón cruzado (cómo amarrarse los zapatos)</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="ensart_cordon_cruzado">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.MF.ensart_cordon_cruzado" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-show="pantalla_orden == 'AL'" class="col-md-12 no-padding" style="display: flex;">
                        <div class="col-md-6 no-padding form-group box-center" style="padding-bottom: 5px !important;">
                            <div class="col-md-12 form-group no-padding">
                                <div class="col-md-2" style="background-color: #B0C4DE;">
                                    <div style="padding: 9px;" class="text-center">
                                        <label style="background: 0;">RANGO</label>
                                    </div>
                                </div>
                                <div class="col-md-10 text-center" style="background-color: #B0C4DE; padding: 9px;">
                                    <label style="background: 0;">ENUNCIADO</label>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 0 días a<br>a 1 mes<br>y 0 días </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Se sobresalta con un ruido</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="se_sobresalta_ruido">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.AL.se_sobresalta_ruido" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Contempla momentáneamente a una persona</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="contemp_moment_persona">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.AL.contemp_moment_persona" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Llora para expresar necesidades</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="llora_expre_necesi">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.AL.llora_expre_necesi" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 1 mes y<br>1 día a<br>3 meses y<br>0 días </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Se tranquiliza con la voz humana</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="se_tranq_voz_humana">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.AL.se_tranq_voz_humana" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Produce sonidos guturales indiferenciados</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="produc_soni_gutur_indif">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.AL.produc_soni_gutur_indif" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Busca el sonido con la mirada</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="busc_soni_mirada">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.AL.busc_soni_mirada" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 3 meses y<br>1 día a<br>6 meses y<br>0 días </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Busca diferentes sonidos con la mirada.</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="busc_dif_soni_mirada">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.AL.busc_dif_soni_mirada" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Pone atención a la conversación</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="pone_atenc_conversacion">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.AL.pone_atenc_conversacion" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Produce cuatro o más sonidos diferentes</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="produc_4_mas_soni_dif">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.AL.produc_4_mas_soni_dif" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 6 meses y<br>1 día a<br>9 meses y<br>0 días </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Pronuncia tres o más sílabas</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="pronunc_3_mas_silabas">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.AL.pronunc_3_mas_silabas" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Reacciona cuando se le llama por su nombre</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="reacc_llamado_nomre">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.AL.reacc_llamado_nomre" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Reacciona a tres palabras familiares</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="reacc_3_palabas_dif">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.AL.reacc_3_palabas_dif" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 9 meses y<br>1 día a<br>12 meses y<br>0 días </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Reacciona a la palabra no</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="reacc_palab_no">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.AL.reacc_palab_no" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Llama al cuidador</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="llama_cuidador">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.AL.llama_cuidador" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Responde a una instrucción sencilla</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="resp_instruc_sencilla">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.AL.resp_instruc_sencilla" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center;">
                                <div class="col-md-2 no-padding">
                                    <label> 12 meses y<br>1 día a<br>18 meses y<br>0 días </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Aproximación a una palabra con intención comunicativa</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="aprox_palab_intenc_comu">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.AL.aprox_palab_intenc_comu" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Reconoce al menos 6 objetos o imágenes</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="recon_6_obj_imag">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.AL.recon_6_obj_imag" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Sigue instrucciones de dos pasos</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="sigue_instruc_2_pasos">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.AL.sigue_instruc_2_pasos" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="col-md-6 no-padding form-group box-center" style="padding-bottom: 5px !important; float: right; margin-left: 8px !important; ">
                            <div class="col-md-12 form-group no-padding">
                                <div class="col-md-2" style="background-color: #B0C4DE;">
                                    <div style="padding: 9px;" class="text-center">
                                        <label style="background: 0;">RANGO</label>
                                    </div>
                                </div>
                                <div class="col-md-10 text-center" style="background-color: #B0C4DE; padding: 9px;">
                                    <label style="background: 0;">ENUNCIADO</label>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 18 meses y<br>1 día a<br>24 meses y<br>0 días </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Nombra cinco objetos de una imagen</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="nombra_5_obj_imag">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.AL.nombra_5_obj_imag" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Utiliza más de 20 palabras</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="uti_mas_20_palab">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.AL.uti_mas_20_palab" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Usa frase de dos palabras</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="usa_frac_2_palab">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.AL.usa_frac_2_palab" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 2 a 3 años<br>(24 meses y 1<br>día a 36 meses<br>y 0 días) </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Dice su nombre completo</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="dice_nom_completo">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.AL.dice_nom_completo" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Dice frases de 3 palabras</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="dice_frac_3_palab">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.AL.dice_frac_3_palab" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Reconoce cualidades de los objetos</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="recon_cualid_obj">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.AL.recon_cualid_obj" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 3 a 4 años<br>(36 meses y 1<br>día a 48 meses<br>y 0 días) </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Defne por su uso cinco objetos</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="define_uso_5_obj">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.AL.define_uso_5_obj" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Hace comparativos</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="hace_comparativos">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.AL.hace_comparativos" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Describe el dibujo</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="describe_dibujo">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.AL.describe_dibujo" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 4 a 5 años<br>(48 meses y 1<br>día a 60 meses<br>y 0 días) </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Reconoce 5 colores</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="recon_5_colores">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.AL.recon_5_colores" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Responde tres preguntas sobre un relato</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="resp_3_preg_relato">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.AL.resp_3_preg_relato" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Elabora un relato a partir de una imagen</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="elab_relato_imag">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.AL.elab_relato_imag" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 5 a 6 años<br>(60 meses y 1<br>día a 72 meses<br>y 0 días) </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Expresa opiniones</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="expresa_opiniones">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.AL.expresa_opiniones" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Repite palabras con pronunciación correcta</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="repit_palb_pronunc_corr">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.AL.repit_palb_pronunc_corr" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Absurdos visuales</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="absurdos_visuales">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.AL.absurdos_visuales" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center;">
                                <div class="col-md-2 no-padding">
                                    <label> 6 a 7 años<br>(72 meses y 1<br>día a 84 meses<br>y 0 días </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Identifca palabras que inician con sonidos parecidos</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="ident_palab_soni_parec">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.AL.ident_palab_soni_parec" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Conoce: ayer, hoy y mañana</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="conoce_ayer_hoy_man">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.AL.conoce_ayer_hoy_man" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Ordena una historia y la relata</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="ordena_hist_relata">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.AL.ordena_hist_relata" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-show="pantalla_orden == 'PS'" class="col-md-12 no-padding" style="display: flex;">
                        <div class="col-md-6 no-padding form-group box-center" style="padding-bottom: 5px !important;">
                            <div class="col-md-12 form-group no-padding">
                                <div class="col-md-2" style="background-color: #B0C4DE;">
                                    <div style="padding: 9px;" class="text-center">
                                        <label style="background: 0;">RANGO</label>
                                    </div>
                                </div>
                                <div class="col-md-10 text-center" style="background-color: #B0C4DE; padding: 9px;">
                                    <label style="background: 0;">ENUNCIADO</label>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 0 días a<br>a 1 mes<br>y 0 días </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Se tranquiliza cuando se toma entre los brazos</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="tranq_toma_brazos">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.PS.tranq_toma_brazos" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Responde a las caricias</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="resp_caricias">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.PS.resp_caricias" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">El bebé ya está registrado</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="bebe_registrado">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.PS.bebe_registrado" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 1 mes y<br>1 día a<br>3 meses y<br>0 días </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Reconoce la voz del cuidador principal</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="recon_voz_cuidador_ppal">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.PS.recon_voz_cuidador_ppal" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Sonrisa social</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="sonrisa_social">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.PS.sonrisa_social" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Responde a una conversación</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="resp_conversacion">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.PS.resp_conversacion" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 3 meses y<br>1 día a<br>6 meses y<br>0 días </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Coge las manos del examinador</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="coge_manos_examin">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.PS.coge_manos_examin" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Ríe a carcajadas</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="rie_carcajadas">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.PS.rie_carcajadas" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Busca la continuación del juego</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="busc_conti_juego">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.PS.busc_conti_juego" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 6 meses y<br>1 día a<br>9 meses y<br>0 días </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Reacciona con desconfanza ante el extraño(a)</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="reacc_desconf_extrano">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.PS.reacc_desconf_extrano" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Busca apoyo del cuidador</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="busc_apoyo_cuidador">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.PS.busc_apoyo_cuidador" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Reacciona a su imagen en el espejo</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="reacc_imag_espejo">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.PS.reacc_imag_espejo" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 9 meses y<br>1 día a<br>12 meses y<br>0 días </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Participa en juegos</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="participa_juegos">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.PS.participa_juegos" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Muestra interés o intención en alimentarse solo</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="int_aliment_solo">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.PS.int_aliment_solo" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Explora el entorno</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="explora_entorno">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.PS.explora_entorno" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center;">
                                <div class="col-md-2 no-padding">
                                    <label> 12 meses y<br>1 día a<br>18 meses y<br>0 días </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Seguimiento de rutinas</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="sigue_rutinas">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.PS.sigue_rutinas" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Ayuda a desvestirse</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="ayuda_desvestirse">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.PS.ayuda_desvestirse" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Señala 5 partes de su cuerpo</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="senala_5_part_cuerpo">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.PS.senala_5_part_cuerpo" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="col-md-6 no-padding form-group box-center" style="padding-bottom: 5px !important; float: right; margin-left: 8px !important; ">
                            <div class="col-md-12 form-group no-padding">
                                <div class="col-md-2" style="background-color: #B0C4DE;">
                                    <div style="padding: 9px;" class="text-center">
                                        <label style="background: 0;">RANGO</label>
                                    </div>
                                </div>
                                <div class="col-md-10 text-center" style="background-color: #B0C4DE; padding: 9px;">
                                    <label style="background: 0;">ENUNCIADO</label>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 18 meses y<br>1 día a<br>24 meses y<br>0 días </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Acepta y tolera el contacto de su piel con diferentes texturas</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="acce_tol_cont_piel_text">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.PS.acce_tol_cont_piel_text" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Expresa su satisfacción cuando logra o consigue algo</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="expresa_satisf_logro">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.PS.expresa_satisf_logro" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Identifca emociones básicas en una imágen</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="ident_emoci_basic_imag">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.PS.ident_emoci_basic_imag" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 2 a 3 años<br>(24 meses y 1<br>día a 36 meses<br>y 0 días) </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Identifca qué es de él y qué es de otros</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="ident_obj_prop_otros">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.PS.ident_obj_prop_otros" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Dice nombres de las personas con quien vive o comparte</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="dice_nomb_famil_cerc">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.PS.dice_nomb_famil_cerc" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Expresa verbalmente emociones básicas (tristeza, alegría, miedo, rabia)</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="expresa_verb_emoci">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.PS.expresa_verb_emoci" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 3 a 4 años<br>(36 meses y 1<br>día a 48 meses<br>y 0 días) </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Rechaza la ayuda del cuidador cuando desea, intenta o hace algo por sí mismo</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="recha_ayud_int_solo">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.PS.recha_ayud_int_solo" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Comparte juego con otros(as) niños(as)</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="compart_juegos_otros">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.PS.compart_juegos_otros" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Reconoce las emociones básicas de los otros(as)</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="recon_emoci_otros">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.PS.recon_emoci_otros" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 4 a 5 años<br>(48 meses y 1<br>día a 60 meses<br>y 0 días) </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Puede vestirse y desvestirse solo(a)</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="puede_vest_desv_solo">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.PS.puede_vest_desv_solo" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Propone juegos</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="propone_juegos">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.PS.propone_juegos" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Sabe cuántos años tiene</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="sabe_su_edad">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.PS.sabe_su_edad" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center; border-bottom: 1px solid; padding-bottom: 5px !important; border-bottom-style: dotted;">
                                <div class="col-md-2 no-padding">
                                    <label> 5 a 6 años<br>(60 meses y 1<br>día a 72 meses<br>y 0 días) </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Participa en juegos respetando reglas y turnos</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="part_juego_resp_reglas">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.PS.part_juego_resp_reglas" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Comenta vida familiar</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="comenta_vida_familiar">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.PS.comenta_vida_familiar" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Colabora por iniciativa propia con actividades cotidianas</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="colab_inici_prop_activ">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.PS.colab_inici_prop_activ" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="salto-linea"></div>

                            <div class="col-md-12 no-padding" style="display: flex; align-items: center;">
                                <div class="col-md-2 no-padding">
                                    <label> 6 a 7 años<br>(72 meses y 1<br>día a 84 meses<br>y 0 días </label>
                                </div>
                                <div class="col-md-10 no-padding">
                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Manifesta emoción ante acontecimientos importantes de su grupo social</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="manif_emoc_acomt_import">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.PS.manif_emoc_acomt_import" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Reconocimientos de normas o prohibiciones</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="recon_norma_prohib">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.PS.recon_norma_prohib" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="salto-linea"></div>

                                    <div class="col-md-12 text-left no-padding" style="display: flex; align-items: center;">
                                        <div class="col-md-10">
                                            <label style="background: 0;">Reconoce emociones complejas (culpa, pena, etc.)</label>
                                        </div>
                                        <div class="col-md-2 no-padding" style="display: flex; justify-content: center;" id="recon_emoci_complejas">
                                            <div class="input-group col-md-7">
                                                <input v-model="dato_pyp2.PS.recon_emoci_complejas" type="text" class="form-control text-center" data-orden="1" maxlength="1" placeholder="N" disabled="disabled"></input>
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
    `,
});
