// REGISTRO SUMINISTRO DE OXIGENO - JAVIER.L - 14-12-2020
// SE ACTUALIZA FORMULARIO CON IMPRESION - SANTIAGO FRANCO - 26-11-2021
const { getObjRegHC } = require("../../HICLIN/scripts/reg_hc.js");
const { getObjRegEvoV2 } = require("../../HICLIN/scripts/reg_evo_v2.js");

new Vue({
  el: "#HC524",
  data: {
    historia_clinica: getObjRegHC(),
    reg_evo: getObjRegEvoV2(),
    datosProfesional: {},
    datosPaciente: {},
    arrayUnserv: {},
    arrayCiudades: {},

    unserv: '',
    descripUnserv: '',

    datos_med: {
      med: '',
      atiende: '',
    },

    fechaIni: {
      anio: '',
      mes: '',
      dia: '',
      hora: '',
      minuto: '',
    },
    fechasuspen: {
      anio: '',
      mes: '',
      dia: '',
      hora: '',
      minuto: '',
    },

    fecha_lim_neg: {
      anio: '',
      mes: '',
      dia: '',
    },
    hora_lim_neg: {
      hora: '',
      minuto: '',
    },

    fecha_limi_pos: {
      anio: '',
      mes: '',
      dia: '',
    },
    hora_limi_pos: {
      hora: '',
      minuto: '',
    },

    fechaAct: {
      anio: '',
      mes: '',
      dia: '',
    },
    horaAct: {
      hora: '',
      minuto: '',
    },

    arrayMetodoOxig: [
      { cod: "1", descrip: "Ventury" },
      { cod: "2", descrip: "Canula Nasal" },
      { cod: "3", descrip: "Ventilación Mecanica" },
      { cod: "4", descrip: "Ambu" },
      { cod: "5", descrip: "Cámara Hood" },
      { cod: "6", descrip: "Máscara Reserv" },
      { cod: "7", descrip: "Máscara Sin Reserv" },
      { cod: "8", descrip: "Ventilación Mecánica No Invasiva" },
      { cod: "9", descrip: "Oxigeno Libre" },
      { cod: "A", descrip: "Canula Alto Flujo" },
    ],

    globalOxig: {
      reg_oxigeno: '',
      itm: 0,

      metOxig: '',
      descripMetOxig: '',
      descMetOxi: '',
      dosis: '',

      totalMin: 0,
      Cant: 0,

      usuario: '',

      totalMinTabla: 0,

      fechaIni_impre: {
        anio: '',
        mes: '',
        dia: '',
      },

      fechaFin_impre: {
        anio: '',
        mes: '',
        dia: '',
      }
    },

    tablaOxig: [],
    ventana_impresion: false,

    nit_usu: $_USUA_GLOBAL[0].NIT,
  },
  async created() {
    loader("show");
    _inputControl("disabled");
    _inputControl("reset");
    nombreOpcion("5-2-4 - Procesos de enfermeria - Suministro de oxigeno");
    _vm = this;

    this.datosPaciente = JSON.parse(JSON.stringify($_REG_PACI));
    this.datosProfesional = JSON.parse(JSON.stringify($_REG_PROF));

    await this.traerHistoriaClinica();
  },
  watch: {
    'globalOxig.descMetOxi': function (val) {
      this.globalOxig.descMetOxi = val ? val.replaceEsp() : ''
    },
  },
  methods: {
    traerHistoriaClinica() {
      postData(
        {
          datosh: datosEnvio() + $_REG_HC.llave_hc + "|" + localStorage.Usuario + "|" + "1" + "|",
        },
        get_url("APP/HICLIN/GET_HC.DLL")
      )
        .then((data) => {
          this.historia_clinica = data;

          if (this.historia_clinica.novedad == '7') {
            CON851("3A", "No existe historia", null, "error", "error");
            this.salir_hc524();
          } else {
            this.traerCiudades();
          }
        })
        .catch((err) => {
          console.error(err);
          loader("hide");
          CON851("", "Error consultando historia clinica", null, "error", "Error");
          this.salir_hc524();
        });
    },

    traerCiudades() {
      postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON809.DLL"))
        .then((data) => {
          this.arrayCiudades = data.CIUDAD;
          this.traerUnserv();
        })
        .catch((err) => {
          loader("hide");
          CON851("", "Error consultando ciudades", null, "error", "Error");
          this.salir_hc524();
        });
    },

    traerUnserv() {
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER873.DLL"))
        .then(async (data) => {
          this.arrayUnserv = data.UNSERV;
          await this.llenar_tabla();
          await this.llenarDatos();
        })
        .catch((err) => {
          loader("hide");
          CON851("", "leyendo unidades de servicio", null, "error", "Error");
          this.salir_hc524();
        });
    },

    async llenarDatos() {
      this.vaciarCampos();
      await this.getFechaHora();

      this.globalOxig.usuario = localStorage.Usuario;
      this.datos_med.med = this.datosProfesional.NOMBRE;

      switch (this.datosProfesional.ATIENDE_PROF) {
        case '1': this.datos_med.atiende = 'MEDICO ESPECIALISTA'; break;
        case '2': this.datos_med.atiende = 'MEDICO GENERAL'; break;
        case '3': this.datos_med.atiende = 'ENFERMERA'; break;
        case '4': this.datos_med.atiende = 'MEDICO AUX. ENFERMERIA'; break;
        case '5': this.datos_med.atiende = 'TERAPIAS Y OTROS'; break;
        case '6': this.datos_med.atiende = 'ENFERMERA GEFE PYP'; break;
        case '7': this.datos_med.atiende = 'SICOLOGIA'; break;
        case '8': this.datos_med.atiende = 'NUTRICIONISTA'; break;
        case 'A': this.datos_med.atiende = 'ODONTOLOGO'; break;
        case 'H': this.datos_med.atiende = 'HIGIENISTA ORAL'; break;
        case 'I': this.datos_med.atiende = 'INSTRUMENTACION'; break;
        case 'O': this.datos_med.atiende = 'OPTOMETRIA'; break;
        case 'T': this.datos_med.atiende = 'TRABAJO SOCIAL'; break;
        case 'U': this.datos_med.atiende = 'ATENCION AL USUARIO'; break;
      }

      loader("hide");
      await this.calcular_fechaLimi();
    },

    calcular_fechaLimi() {
      if (this.nit_usu == 800162035 && (localStorage.Usuario == 'MXGA' || localStorage.Usuario == 'LFAR')) {
        var fecha_act = new Date();
        let fecha_limi = this.sumarRestarDias(fecha_act, -60);
        [this.fecha_lim_neg.anio, this.fecha_lim_neg.mes, this.fecha_lim_neg.dia] = fecha_limi;
      } else {
        var fecha_act = new Date();
        let fecha_limi = this.sumarRestarDias(fecha_act, -30);
        [this.fecha_lim_neg.anio, this.fecha_lim_neg.mes, this.fecha_lim_neg.dia] = fecha_limi;
      }

      this.ventanaUnserv();
    },

    ventanaUnserv() {
      SER873(this.salir_hc524, this.datoUnserv, 1);
    },

    datoUnserv(data) {
      this.unserv = data.COD;
      let busqUnserv = this.arrayUnserv.find((el) => el.COD == this.unserv);
      if (busqUnserv) {
        this.descripUnserv = busqUnserv.DESCRIP;
      } else {
        this.descripUnserv = '';
      }

      if (data.ESTADO == "N") CON851("13", "13", null, "error", "error"), this.ventanaUnserv();
      else this.sumar_item();
    },

    sumar_item() {
      this.globalOxig.itm = this.tablaOxig.length + 1;
      this.datoAnioIni();
    },

    datoAnioIni() {
      if (this.fechaIni.anio == 0 || this.fechaIni.anio == '') {
        this.fechaIni.anio = this.fechaAct.anio || 0;
        this.fechaIni.mes = this.fechaAct.mes || 0;
        this.fechaIni.dia = this.fechaAct.dia || 0;
      }
      validarInputs(
        {
          form: "#validarAnioIni",
          event_f5: () => {
            CON851P("03", this.datoAnioIni, this.salir_hc524);
          },
          event_f11: () => this.datoImprimir(),
        },
        () => {
          CON851P("03", this.datoAnioIni, this.salir_hc524);
        },
        () => {
          let anio = (this.fechaIni.anio = this.fechaIni.anio.padStart(4, "0"));

          if (anio < this.fecha_lim_neg.anio) {
            CON851("03", "03", null, "warning", "Advertencia");
            this.datoAnioIni();
          } else {
            this.datoMesIni();
          }
        }
      );
    },

    datoMesIni() {
      validarInputs(
        {
          form: "#validarMesIni",
          event_f5: () => {
            CON851P("03", this.datoAnioIni, this.salir_hc524);
          },
          event_f11: () => this.datoImprimir(),
        },
        () => {
          this.datoAnioIni();
        },
        () => {
          let mes = (this.fechaIni.mes = this.fechaIni.mes.padStart(2, "0"));

          if ((mes < 1 || mes > 12) || mes < this.fecha_lim_neg.mes || mes < this.fechaAct.mes) {
            CON851("03", "03", null, "warning", "Advertencia");
            this.datoMesIni();
          } else {
            this.datoDiaIni();
          }
        }
      );
    },

    datoDiaIni() {
      validarInputs(
        {
          form: "#validardiaIni",
          event_f5: () => {
            CON851P("03", this.datoAnioIni, this.salir_hc524);
          },
          event_f11: () => this.datoImprimir(),
        },
        () => {
          this.datoMesIni();
        },
        () => {
          let dia = (this.fechaIni.dia = this.fechaIni.dia.padStart(2, "0"));

          let fecha = parseFloat(`${this.fechaIni.anio}${this.fechaIni.mes}${this.fechaIni.dia}`);
          let fecha_limi = parseFloat(`${this.fecha_lim_neg.anio}${this.fecha_lim_neg.mes}${this.fecha_lim_neg.dia}`);
          let fecha_act = parseFloat(`${this.fechaAct.anio}${this.fechaAct.mes}${this.fechaAct.dia}`);

          if (dia < 1 || dia > 31) {
            CON851("03", "03", null, "warning", "Advertencia");
            this.datoDiaIni();
          } else if (fecha < fecha_limi || fecha > fecha_act) {
            CON851("03", "03", null, "warning", "Advertencia");
            this.datoAnioIni();
          } else {
            this.datoHorIni();
          }
        }
      );
    },

    datoHorIni() {
      if (this.fechaIni.hora == 0 || this.fechaIni.hora == '') {
        this.fechaIni.hora = this.horaAct.hora || 0;
        this.fechaIni.minuto = this.horaAct.minuto || 0;
      }
      validarInputs(
        {
          form: "#validarHorIni",
          event_f5: () => {
            CON851P("03", this.datoAnioIni, this.salir_hc524);
          },
          event_f11: () => this.datoImprimir(),
        },
        () => {
          this.datoAnioIni();
        },
        () => {
          let hora = (this.fechaIni.hora = this.fechaIni.hora.padStart(2, "0"));

          let fecha = parseFloat(`${this.fechaIni.anio}${this.fechaIni.mes}${this.fechaIni.dia}`);
          let fecha_act = parseFloat(`${this.fechaAct.anio}${this.fechaAct.mes}${this.fechaAct.dia}`);

          if (hora > 23) {
            CON851("9Q", "9Q", null, "warning", "Advertencia");
            this.datoHorIni();
          } else if ((fecha == fecha_act) && hora > this.horaAct.hora) {
            CON851("9Q", "9Q", null, "warning", "Advertencia");
            this.datoHorIni();
          } else {
            this.datoMinIni();
          }
        }
      );
    },

    datoMinIni() {
      validarInputs(
        {
          form: "#validarMinIni",
          event_f5: () => {
            CON851P("03", this.datoAnioIni, this.salir_hc524);
          },
          event_f11: () => this.datoImprimir(),
        },
        () => {
          this.datoHorIni();
        },
        () => {
          let minuto = (this.fechaIni.minuto = this.fechaIni.minuto.padStart(2, "0"));

          let fecha = parseFloat(`${this.fechaIni.anio}${this.fechaIni.mes}${this.fechaIni.dia}`);
          let fecha_act = parseFloat(`${this.fechaAct.anio}${this.fechaAct.mes}${this.fechaAct.dia}`);
          let hora = parseFloat(`${this.fechaIni.hora}${this.fechaIni.minuto}`);
          let hora_act = parseFloat(`${this.horaAct.hora}${this.horaAct.minuto}`);

          if (minuto > 59) {
            CON851("9Q", "9Q", null, "warning", "Advertencia");
            this.datoHorIni();
          } else if (fecha < fecha_act) {
            this.calcular_fechaLimiSusp();
          } else if ((fecha == fecha_act) && hora <= hora_act) {
            this.calcular_fechaLimiSusp();
          } else if (hora > hora_act) {
            CON851("9Q", "9Q", null, "warning", "Advertencia");
            this.datoMinIni();
          } else {
            this.calcular_fechaLimiSusp();
          }
        }
      );
    },

    calcular_fechaLimiSusp() {
      let mes = this.fechaIni.mes - 1;
      let fecha = moment(new Date(this.fechaIni.anio, mes, this.fechaIni.dia, this.fechaIni.hora, this.fechaIni.minuto)).add(12, 'h').format('YYYYMMDDHHmm')

      this.fecha_limi_pos.anio = fecha.substring(0, 4);
      this.fecha_limi_pos.mes = fecha.substring(4, 6);
      this.fecha_limi_pos.dia = fecha.substring(6, 8);
      this.hora_limi_pos.hora = fecha.substring(8, 10);
      this.hora_limi_pos.minuto = fecha.substring(10, 12);
      this.datoAnioSusp();
    },

    datoAnioSusp() {
      if (this.fechasuspen.anio == 0 || this.fechasuspen.anio == '') {
        this.fechasuspen.anio = this.fechaIni.anio || 0;
        this.fechasuspen.mes = this.fechaIni.mes || 0;
        this.fechasuspen.dia = this.fechaIni.dia || 0;
      }
      validarInputs(
        {
          form: "#validarAnioSusp",
          event_f5: () => {
            CON851P("03", this.datoAnioIni, this.salir_hc524);
          },
          event_f11: () => this.datoImprimir(),
        },
        () => {
          this.datoHorIni();
        },
        () => {
          let anio = (this.fechasuspen.anio = this.fechasuspen.anio.padStart(4, "0"));

          if ((anio > this.fecha_limi_pos.anio) || (anio < this.fechaIni.anio)) {
            CON851("03", "03", null, "warning", "Advertencia");
            this.datoAnioSusp();
          } else {
            this.datoMesSusp();
          }
        }
      );
    },

    datoMesSusp() {
      validarInputs(
        {
          form: "#validarMesSusp",
          event_f5: () => {
            CON851P("03", this.datoAnioIni, this.salir_hc524);
          },
          event_f11: () => this.datoImprimir(),
        },
        () => {
          this.datoAnioSusp();
        },
        () => {
          let mes = (this.fechasuspen.mes = this.fechasuspen.mes.padStart(2, "0"));

          if ((mes < 1 || mes > 12) || mes < this.fechaIni.mes || mes > this.fecha_limi_pos.mes) {
            CON851("03", "03", null, "warning", "Advertencia");
            this.datoMesSusp();
          } else {
            this.datoDiaSusp();
          }
        }
      );
    },

    datoDiaSusp() {
      validarInputs(
        {
          form: "#validarDiaSusp",
          event_f5: () => {
            CON851P("03", this.datoAnioIni, this.salir_hc524);
          },
          event_f11: () => this.datoImprimir(),
        },
        () => {
          this.datoMesSusp();
        },
        () => {
          let dia = (this.fechasuspen.dia = this.fechasuspen.dia.padStart(2, "0"));

          let fecha_ini = parseFloat(`${this.fechaIni.anio}${this.fechaIni.mes}${this.fechaIni.dia}`);
          let fecha_susp = parseFloat(`${this.fechasuspen.anio}${this.fechasuspen.mes}${this.fechasuspen.dia}`);
          let fecha_limi = parseFloat(`${this.fecha_limi_pos.anio}${this.fecha_limi_pos.mes}${this.fecha_limi_pos.dia}`);

          if ((dia < 1 || dia > 31) || fecha_susp < fecha_ini || fecha_susp > fecha_limi) {
            CON851("37", "37", null, "warning", "Advertencia");
            this.datoDiaSusp();
          } else {
            this.datoHoraSusp();
          }
        }
      );
    },

    datoHoraSusp() {
      if (this.fechasuspen.hora == 0 || this.fechasuspen.hora == '') {
        this.fechasuspen.hora = this.fechaIni.hora || 0;
        this.fechasuspen.minuto = this.fechaIni.minuto || 0;
      }
      validarInputs(
        {
          form: "#validarHorSusp",
          event_f5: () => {
            CON851P("03", this.datoAnioIni, this.salir_hc524);
          },
          event_f11: () => this.datoImprimir(),
        },
        () => {
          this.datoAnioSusp();
        },
        () => {
          let hora = (this.fechasuspen.hora = this.fechasuspen.hora.padStart(2, "0"));

          let fecha_susp = parseFloat(`${this.fechasuspen.anio}${this.fechasuspen.mes}${this.fechasuspen.dia}`);
          let fecha_ini = parseFloat(`${this.fechaIni.anio}${this.fechaIni.mes}${this.fechaIni.dia}`);
          let fecha_limi = parseFloat(`${this.fecha_limi_pos.anio}${this.fecha_limi_pos.mes}${this.fecha_limi_pos.dia}`);

          if (hora > 23) {
            CON851("9Q", "9Q", null, "warning", "Advertencia");
            this.datoHoraSusp();
          } else if ((fecha_susp == fecha_limi) && hora > this.hora_limi_pos.hora) {
            CON851("9Q", "9Q", null, "warning", "Advertencia");
            this.datoHoraSusp();
          } else if ((fecha_susp == fecha_ini) && hora < this.fechaIni.hora) {
            CON851("9Q", "9Q", null, "warning", "Advertencia");
            this.datoHoraSusp();
          } else {
            this.datoMinSusp();
          }
        }
      );
    },

    datoMinSusp() {
      validarInputs(
        {
          form: "#validarMinSusp",
          event_f5: () => {
            CON851P("03", this.datoAnioIni, this.salir_hc524);
          },
          event_f11: () => this.datoImprimir(),
        },
        () => {
          this.datoHoraSusp();
        },
        () => {
          let minuto = (this.fechasuspen.minuto = this.fechasuspen.minuto.padStart(2, "0"));

          let fecha_susp = parseFloat(`${this.fechasuspen.anio}${this.fechasuspen.mes}${this.fechasuspen.dia}`);
          let hora_susp = parseFloat(`${this.fechasuspen.hora}${this.fechasuspen.minuto}`);
          let fecha_ini = parseFloat(`${this.fechaIni.anio}${this.fechaIni.mes}${this.fechaIni.dia}`);
          let hora_ini = parseFloat(`${this.fechaIni.hora}${this.fechaIni.minuto}`);
          let fecha_limi = parseFloat(`${this.fecha_limi_pos.anio}${this.fecha_limi_pos.mes}${this.fecha_limi_pos.dia}`);
          let hora_limi = parseFloat(`${this.hora_limi_pos.hora}${this.hora_limi_pos.minuto}`);

          if (minuto > 59) {
            CON851("9Q", "9Q", null, "warning", "Advertencia");
            this.datoMinSusp();
          } else if ((fecha_susp == fecha_limi) && hora_susp > hora_limi) {
            CON851("9Q", "9Q", null, "warning", "Advertencia");
            this.datoMinSusp();
          } else if (fecha_susp > fecha_ini) {
            this.dato_metodo();
          } else if ((fecha_susp == fecha_ini) && hora_susp > hora_ini) {
            this.dato_metodo();
          } else if (hora_susp <= hora_ini) {
            CON851("9Q", "9Q", null, "warning", "Advertencia");
            this.datoMinSusp();
          }
        }
      );
    },

    dato_metodo() {
      POPUP({
        array: this.arrayMetodoOxig,
        titulo: "Metodo oxigenación",
        indices: [{ id: "cod", label: "descrip" }],
        seleccion: 1,
        teclaAlterna: true,
        id_input: '#validarMetodOxigena',
        callback_f: () => {
          this.datoAnioSusp();
        },
      },
        async (data) => {
          this.globalOxig.metOxig = data.cod;
          this.globalOxig.descripMetOxig = data.descrip;

          if (data.cod == '1' || data.cod == '5') {
            this.dato_ObserMet();
          } else {
            this.dato_dosis();
          }
        }
      )
    },

    dato_ObserMet() {
      validarInputs(
        {
          form: "#validarObser",
        },
        () => {
          this.dato_metodo();
        },
        () => {
          this.dato_dosis();
        }
      );
    },

    dato_dosis() {
      validarInputs(
        {
          form: "#validarDosis",
        },
        () => {
          this.dato_metodo();
        },
        async () => {
          let dosis = (this.globalOxig.dosis = this.globalOxig.dosis.padStart(2, "0"));

          let fecha_ini = `${this.fechaIni.anio}${this.fechaIni.mes}${this.fechaIni.dia}`;
          let hora_ini = `${this.fechaIni.hora}${this.fechaIni.minuto}`;
          let fecha_susp = `${this.fechasuspen.anio}${this.fechasuspen.mes}${this.fechasuspen.dia}`;
          let hora_susp = `${this.fechasuspen.hora}${this.fechasuspen.minuto}`;

          if (dosis == 0) {
            CON851("", "Debe digitar dosis", null, "warning", "Advertencia");
            this.dato_dosis();
          } else if (dosis > 50) {
            CON851("", "Dosis no puede ser mayor a 50", null, "warning", "Advertencia");
            this.dato_dosis();
          } else {
            let totales = this.dato_cantidad_minutos(fecha_ini, hora_ini, fecha_susp, hora_susp, dosis);
            this.globalOxig.Cant = totales.totalCant;
            this.globalOxig.totalMin = totales.totalMin;
            this.subir_registro();
          }
        }
      );
    },

    subir_registro() {
      CON851P(
        "01",
        () => {
          this.datoAnioIni();
        },
        () => {
          // this.tablaOxig.push({
          //   item: this.globalOxig.itm,
          //   fechaIni: `${this.fechaIni.anio}/${this.fechaIni.mes}/${this.fechaIni.dia}`,
          //   horaIni: `${this.fechaIni.hora}:${this.fechaIni.minuto}`,
          //   fechaSusp: `${this.fechasuspen.anio}/${this.fechasuspen.mes}/${this.fechasuspen.dia}`,
          //   horaSusp: `${this.fechasuspen.hora}:${this.fechasuspen.minuto}`,
          //   minuto: this.globalOxig.totalMin,
          //   metodoOxig: this.globalOxig.descripMetOxig,
          //   observ: this.globalOxig.descMetOxi,
          //   dosis: this.globalOxig.dosis,
          //   cantLts: this.globalOxig.Cant,
          //   usuario: this.globalOxig.usuario,
          //   descripUsu: '',
          // });
          let fecha_evo = `${this.fechaIni.anio}${this.fechaIni.mes}${this.fechaIni.dia}`;
          let hora_evo = `${this.fechaIni.hora}${this.fechaIni.minuto}`;
          let fecha_susp = `${this.fechasuspen.anio}${this.fechasuspen.mes}${this.fechasuspen.dia}`;
          let hora_susp = `${this.fechasuspen.hora}${this.fechasuspen.minuto}`;
          let fechaCompletaEvo = `${this.fechaIni.anio}${this.fechaIni.mes}${this.fechaIni.dia} ${this.fechaIni.hora}${this.fechaIni.minuto}`;
          let dosis = this.globalOxig.dosis;

          let busq = this.globalOxig.reg_oxigeno.EVO_OXIGENO.find((el) => el.FECHA == fecha_evo && el.HORA == hora_evo);
          if (busq) {
            let fechaSumatoriaEvo = moment(fechaCompletaEvo).add(1, 'm').format("YYYYMMDD HHmm");

            this.fechaIni.anio = fechaSumatoriaEvo.slice(0,4) || 0;
            this.fechaIni.mes = fechaSumatoriaEvo.slice(4,6) || 0;
            this.fechaIni.dia = fechaSumatoriaEvo.slice(6,8) || 0;

            this.fechaIni.hora = fechaSumatoriaEvo.slice(9,11) || 0;
            this.fechaIni.minuto = fechaSumatoriaEvo.slice(11,13) || 0;

            let totales = this.dato_cantidad_minutos(fecha_evo, hora_evo, fecha_susp, hora_susp, dosis);
            this.globalOxig.Cant = totales.totalCant;
            this.globalOxig.totalMin = totales.totalMin;

            console.log(this.fechaIni.anio);
            console.log(this.fechaIni.mes);
            console.log(this.fechaIni.dia);
            console.log(this.fechaIni.hora);
            console.log(this.fechaIni.minuto);
          }
          this.grabar_registro();
        }
      );
    },

    async grabar_registro() {
      loader("show");
      let evolucion = JSON.parse(JSON.stringify(this.reg_evo));

      let fecha_evo = `${this.fechaIni.anio}${this.fechaIni.mes}${this.fechaIni.dia}`;
      let hora_evo = `${this.fechaIni.hora}${this.fechaIni.minuto}`;

      let fecha_susp_oxi = `${this.fechasuspen.anio}${this.fechasuspen.mes}${this.fechasuspen.dia}`;
      let hora_susp_oxi = `${this.fechasuspen.hora}${this.fechasuspen.minuto}`;

      evolucion.llave = `${this.historia_clinica.llave}${fecha_evo}${hora_evo}${this.globalOxig.usuario}`;
      evolucion.tipo = '2';
      evolucion.med = this.datosProfesional.IDENTIFICACION.padStart(10, "0");
      evolucion.unserv = this.unserv;
      evolucion.estad.rips.unid_edad = this.historia_clinica.unid_edad;
      evolucion.estad.rips.vlr_edad = this.historia_clinica.vlr_edad;

      evolucion.fecha_susp_oxi = fecha_susp_oxi;
      evolucion.hora_susp_oxi = hora_susp_oxi;
      evolucion.metodo_oxi.tipo_met_oxi = this.globalOxig.metOxig;
      evolucion.metodo_oxi.desc_met_oxi = this.globalOxig.descMetOxi;
      evolucion.dosis_oxigeno = this.globalOxig.dosis;
      evolucion.cant_oxi = this.globalOxig.Cant;

      evolucion.hab = this.historia_clinica.cierre.hab;

      evolucion.novedad = '7';

      let datos = _getObjetoSaveEvo(evolucion);

      postData(datos, get_url("APP/HICLIN/SAVE_EVOL_2.DLL"))
        .then((data) => {
          console.log(data, 'GUARDA')
          loader("hide");
          this.adicionar_resgistros();
        })
        .catch(async (error) => {
          loader("hide");
          console.log(error, 'ERROR')
          await this.llenar_tabla();
          await this.llenarDatos();
        });
    },

    adicionar_resgistros() {
      CON851P(
        "14",
        () => {
          this.datoImprimir();
        },
        async () => {
          await this.llenar_tabla();
          await this.llenarDatos();
        }
      );
    },

    datoImprimir() {
      this.ventana_impresion = true;

      this.globalOxig.fechaIni_impre.anio = this.fechaAct.anio;
      this.globalOxig.fechaIni_impre.mes = this.fechaAct.mes;
      this.globalOxig.fechaIni_impre.dia = '1';

      this.globalOxig.fechaFin_impre.anio = this.fechaAct.anio;
      this.globalOxig.fechaFin_impre.mes = this.fechaAct.mes;
      this.globalOxig.fechaFin_impre.dia = '31';
      this.validarAnioIni_impre();
    },

    validarAnioIni_impre() {
      validarInputs(
        {
          form: "#validarAnioIni_impre",
        },
        async () => {
          this.ventana_impresion = false;
          await this.llenar_tabla();
          await this.llenarDatos();
        },
        () => {
          let anio = (this.globalOxig.fechaIni_impre.anio = this.globalOxig.fechaIni_impre.anio.padStart(4, "0"));

          if (anio < this.fechaAct.anio) {
            CON851("", "Año no debe ser menor al actual", null, "warning", "Advertencia");
            this.validarAnioIni_impre();
          } else {
            this.validarMesIni_impre();
          }
        }
      );
    },

    validarMesIni_impre() {
      validarInputs(
        {
          form: "#validarMesIni_impre",
        },
        () => {
          this.validarAnioIni_impre();
        },
        () => {
          let mes = (this.globalOxig.fechaIni_impre.mes = this.globalOxig.fechaIni_impre.mes.padStart(2, "0"));

          if (mes < 1 || mes > 12) {
            this.validarMesIni_impre();
          } else {
            this.validarDiaIni_impre();
          }
        }
      );
    },


    validarDiaIni_impre() {
      validarInputs(
        {
          form: "#validardiaIni_impre",
        },
        () => {
          this.validarMesIni_impre();
        },
        () => {
          let dia = (this.globalOxig.fechaIni_impre.dia = this.globalOxig.fechaIni_impre.dia.padStart(2, "0"));

          if (dia < 1 || dia > 31) {
            this.validarDiaIni_impre();
          } else {
            this.validarAnioFin_impre();
          }
        }
      );
    },

    validarAnioFin_impre() {
      validarInputs(
        {
          form: "#validarAnioFin_impre",
        },
        () => {
          this.validarAnioIni_impre();
        },
        () => {
          let anio = (this.globalOxig.fechaFin_impre.anio = this.globalOxig.fechaFin_impre.anio.padStart(4, "0"));

          if (anio < this.fechaAct.anio) {
            CON851("", "Año no debe ser menor al actual", null, "warning", "Advertencia");
            this.validarAnioFin_impre();
          } else {
            this.validarMesFin_impre();
          }
        }
      );
    },

    validarMesFin_impre() {
      validarInputs(
        {
          form: "#validarMesFin_impre",
        },
        () => {
          this.validarAnioFin_impre();
        },
        () => {
          let mes = (this.globalOxig.fechaFin_impre.mes = this.globalOxig.fechaFin_impre.mes.padStart(2, "0"));

          if (mes < 1 || mes > 12) {
            this.validarMesFin_impre();
          } else {
            this.validarDiaFin_impre();
          }
        }
      );
    },

    validarDiaFin_impre() {
      validarInputs(
        {
          form: "#validardiaFin_impre",
        },
        () => {
          this.validarMesFin_impre();
        },
        () => {
          let dia = (this.globalOxig.fechaFin_impre.dia = this.globalOxig.fechaFin_impre.dia.padStart(2, "0"));

          let fechaIni = `${this.globalOxig.fechaIni_impre.anio}${this.globalOxig.fechaIni_impre.mes}${this.globalOxig.fechaIni_impre.dia}`;
          let fechaFin = `${this.globalOxig.fechaFin_impre.anio}${this.globalOxig.fechaFin_impre.mes}${this.globalOxig.fechaFin_impre.dia}`;

          if (dia < 1 || dia > 31) {
            this.validarDiaFin_impre();
          } else {
            if (fechaFin < fechaIni) {
              CON851("", "Fecha final debe ser mayor a la inicial", null, "warning", "Advertencia");
              this.validarAnioFin_impre();
            } else {
              this.ventana_impresion = false;
              this.llamarImpresion();
            }
          }
        }
      );
    },

    async llamarImpresion() {
      await this.llenar_tabla();
      let datos = {
        paciente: {},
        oxigenometria: [],
        calculos: {},
        oxigenoAgrupados: [],
      };

      datos.paciente.fecha = moment().format("YYYY/MM/DD");
      datos.paciente.hora = moment().format("HH:mm");
      datos.paciente.tipoId = $_REG_PACI["TIPO-ID"];

      datos.paciente.id = isNaN($_REG_PACI.COD)
        ? $_REG_PACI.COD
        : new Intl.NumberFormat("ja-JP").format($_REG_PACI.COD);
      datos.paciente.nombre = $_REG_PACI.DESCRIP.replace(/\s+/g, " ");
      datos.paciente.edad = this.historia_clinica.unid_edad + this.historia_clinica.vlr_edad;
      datos.paciente.sexo = $_REG_PACI.SEXO == "F" ? "Femenino" : "Masculino";

      let busq = this.arrayCiudades.find((e) => e.COD.trim() == $_REG_PACI.CIUDAD.trim());
      datos.paciente.municipio = busq.NOMBRE.replace(/\s+/g, " ") || "";

      datos.paciente.telefono = $_REG_PACI.TELEFONO;
      datos.paciente.unserv = this.unserv;
      datos.paciente.fact = this.historia_clinica.cierre.fact;

      datos.titulo = "SUMINISTRO DE OXIGENO";

      let fechaIni = `${this.globalOxig.fechaIni_impre.anio}${this.globalOxig.fechaIni_impre.mes}${this.globalOxig.fechaIni_impre.dia}`;
      let fechaFin = `${this.globalOxig.fechaFin_impre.anio}${this.globalOxig.fechaFin_impre.mes}${this.globalOxig.fechaFin_impre.dia}`;
      datos.calculos.totLitrosOxig = 0;
      datos.calculos.totMinOxig = 0;

      this.tablaOxig.forEach((reg) => {
        let fechaIni_impre = `${reg.fechaIni.slice(0, 4)}${reg.fechaIni.slice(5, 7)}${reg.fechaIni.slice(8, 10)}`;
        let fechaSus_impre = `${reg.fechaSusp.slice(0, 4)}${reg.fechaSusp.slice(5, 7)}${reg.fechaSusp.slice(8, 10)}`;
        if (fechaIni_impre >= fechaIni && fechaSus_impre <= fechaFin) {
          let mesIni = reg.fechaIni.slice(5, 7);
          let mesSus = reg.fechaSusp.slice(5, 7);

          let descripMesIni = this.descripMes(mesIni);
          let descripMesSus = this.descripMes(mesSus);

          let datoHora = moment("0000", "HHmm").add(reg.minuto, "minutes");
          let hor = datoHora.format("HH");
          let min = datoHora.format("mm");

          datos.oxigenometria.push({
            item: reg.item,
            fechaIni: `${descripMesIni} ${reg.fechaIni.slice(8, 10)}/${reg.fechaIni.slice(0, 4)} ${reg.horaIni}`,
            fechaSuspen: `${descripMesSus} ${reg.fechaSusp.slice(8, 10)}/${reg.fechaSusp.slice(0, 4)} ${reg.horaSusp}`,
            minutos: reg.minuto,
            hor: hor,
            min: min,
            metodo: reg.metodoOxig,
            observacion: reg.observ,
            dosis: reg.dosis,
            cantidad: reg.cantLts,
            usuario: reg.descripUsu,
          });

          let busq = datos.oxigenoAgrupados.find((el) => el.codMetodoAgrupados == reg.codMetodoOxig);
          if (!busq) {
            let tiempoAgr = moment("0000", "HHmm").add(reg.minuto, "minutes");
            datos.oxigenoAgrupados.push({
              codMetodoAgrupados: reg.codMetodoOxig,
              metodoAgrupados: reg.metodoOxig,
              litrosAgrupados: reg.cantLts,
              tiempoAgrupados: `${tiempoAgr.format("HH")} Hrs ${tiempoAgr.format("mm")} Min`,
              minutosAgrupados: reg.minuto,
            });
          } else {
            let index = datos.oxigenoAgrupados.indexOf(busq);
            datos.oxigenoAgrupados[index].litrosAgrupados = parseFloat(datos.oxigenoAgrupados[index].litrosAgrupados) + parseFloat(reg.cantLts);
            datos.oxigenoAgrupados[index].minutosAgrupados = parseFloat(datos.oxigenoAgrupados[index].minutosAgrupados) + reg.minuto;
            let tiempoAgr = moment("0000", "HHmm").add(datos.oxigenoAgrupados[index].minutosAgrupados, "minutes");
            datos.oxigenoAgrupados[index].tiempoAgrupados = `${tiempoAgr.format("HH")} Hrs ${tiempoAgr.format("mm")} Min`;
          }

          datos.calculos.totMinOxig = datos.calculos.totMinOxig + parseInt(reg.minuto);

          datos.calculos.totLitrosOxig = datos.calculos.totLitrosOxig + parseInt(reg.cantLts);
        }
      })

      let totSuministroOxi = moment("0000", "HHmm").add(datos.calculos.totMinOxig, "minutes");
      datos.calculos.totSuministroOxig = `${parseInt(totSuministroOxi.format("HH"))} Hrs ${totSuministroOxi.format("mm")} Min`;

      console.log(datos.oxigenometria);
      console.log(datos.calculos);
      console.log(datos.oxigenoAgrupados);

      await _impresion2({
        tipo: "pdf",
        archivo: `${localStorage.Usuario + moment().format("-YYMMDD-HHmmssS")}.pdf`,
        content: await _imprimirHC524(datos),
      })
        .then((data) => {
          loader("hide");
          CON851("", "Cargando Impresión", null, "success", "Exito!");
          $('[data-bb-handler="main"]').click();
          setTimeout(() => {
            this.salir_hc524();
          }, 300);
        })
        .catch(async (err) => {
          loader("hide");
          CON851("", "Error generando impresión", null, "error", "Error");
          console.error(err);
          await this.llenar_tabla();
          await this.llenarDatos();
        });
    },

    salir_hc524() {
      _regresar_menuhis();
    },

    descripMes(mes) {
      let descripMes = '';
      switch (mes) {
        case '01': descripMes = 'Ene.'; break;
        case '02': descripMes = 'Feb.'; break;
        case '03': descripMes = 'Mar.'; break;
        case '04': descripMes = 'Abr.'; break;
        case '05': descripMes = 'May.'; break;
        case '06': descripMes = 'Jun.'; break;
        case '07': descripMes = 'Jul.'; break;
        case '08': descripMes = 'Agt.'; break;
        case '09': descripMes = 'Sep.'; break;
        case '10': descripMes = 'Oct.'; break;
        case '11': descripMes = 'Nov.'; break;
        case '12': descripMes = 'Dic.'; break;
      }
      return descripMes;
    },

    getFechaHora() {
      [this.fechaAct.anio, this.fechaAct.mes, this.fechaAct.dia] = moment().format("YYYY-MM-DD").split("-");
      [this.horaAct.hora, this.horaAct.minuto] = moment().format("HH-mm").split("-");
    },

    sumarRestarDias(fecha, dias) {
      fecha.setDate(fecha.getDate() + dias);
      return fecha.toISOString().slice(0, 10).split("-");
    },

    dato_cantidad_minutos(fechaIni, horaIni, fechaSusp, horaSusp, dosis) {
      let fecha_ini = parseFloat(fechaIni);
      let hora_ini = parseFloat(horaIni);
      let fecha_susp = parseFloat(fechaSusp);
      let hora_susp = parseFloat(horaSusp);

      let hor_ini = parseFloat(horaIni.slice(0, 2));
      let min_ini = parseFloat(horaIni.slice(2, 4));
      let hor_susp = parseFloat(horaSusp.slice(0, 2));
      let min_susp = parseFloat(horaSusp.slice(2, 4));

      let dias = SC_DIAS(fecha_ini.toString(), fecha_susp.toString());

      let totalMin = 0;
      let totalCant = 0;

      if (fecha_susp > fecha_ini) {
        if (hora_susp >= hora_ini) {
          totalMin = ((dias * 24) * 60) + ((hor_susp * 60) + min_susp) + ((hor_ini * 60) + min_ini);
        } else {
          dias = dias - 1;
          totalMin = ((dias * 24) * 60) + ((hor_susp * 60) + min_susp) + (1440 - ((hor_ini * 60) + min_ini));
        }
      } else {
        totalMin = ((hor_susp * 60) + min_susp) - ((hor_ini * 60) + min_ini);
      }

      totalCant = dosis * totalMin;

      return {
        totalMin: totalMin,
        totalCant: totalCant,
      }
    },

    vaciarCampos() {
      this.fechaIni = {
        anio: '',
        mes: '',
        dia: '',
        hora: '',
        minuto: '',
      };
      this.fechasuspen = {
        anio: '',
        mes: '',
        dia: '',
        hora: '',
        minuto: '',
      };
      this.fecha_lim_neg = {
        anio: '',
        mes: '',
        dia: '',
      };
      this.hora_lim_neg = {
        hora: '',
        minuto: '',
      };

      this.fecha_limi_pos = {
        anio: '',
        mes: '',
        dia: '',
      };
      this.hora_limi_pos = {
        hora: '',
        minuto: '',
      };

      this.globalOxig = {
        reg_oxigeno: '',
        itm: 0,

        metOxig: '',
        descripMetOxig: '',
        descMetOxi: '',
        dosis: '',

        totalMin: 0,
        Cant: 0,

        usuario: '',

        totalMinTabla: 0,

        fechaIni_impre: {
          anio: '',
          mes: '',
          dia: '',
        },

        fechaFin_impre: {
          anio: '',
          mes: '',
          dia: '',
        }
      };
    },

    async llenar_tabla() {
      loader("show");
      postData(
        { datosh: datosEnvio() + this.historia_clinica.llave + "|" + "|" + "|" + '1' + "|" },
        get_url("APP/HICLIN/HC524.DLL")
      )
        .then((data) => {
          console.log(data);
          this.globalOxig.reg_oxigeno = data;
          this.globalOxig.reg_oxigeno.EVO_OXIGENO.pop();
          let metodoOxige = '';
          this.tablaOxig = [],

            this.globalOxig.reg_oxigeno.EVO_OXIGENO.forEach((i, index) => {
              this.globalOxig.totalMinTabla = 0;
              let totales = this.dato_cantidad_minutos(i.FECHA, i.HORA, i.FECHA_SUSP_OXI, i.HORA_SUSP_OXI, 0);
              this.globalOxig.totalMinTabla = totales.totalMin;

              switch (i.TIPO_MET_OXI) {
                case '1': metodoOxige = 'Ventury'; break;
                case '2': metodoOxige = 'Canula Nasal'; break;
                case '3': metodoOxige = 'Ventilación Mecanica'; break;
                case '4': metodoOxige = 'Ambu'; break;
                case '5': metodoOxige = 'Cámara Hood'; break;
                case '6': metodoOxige = 'Máscara Reserv'; break;
                case '7': metodoOxige = 'Máscara Sin Reserv'; break;
                case '8': metodoOxige = 'Ventilación Mecánica No Invasiva'; break;
                case '9': metodoOxige = 'Oxigeno Libre'; break;
                case 'A': metodoOxige = 'Canula Alto Flujo'; break;
              }

              this.tablaOxig.push({
                item: (index + 1),
                fechaIni: `${i.FECHA.slice(0, 4)}/${i.FECHA.slice(4, 6)}/${i.FECHA.slice(6, 8)}`,
                horaIni: `${i.HORA.slice(0, 2)}:${i.HORA.slice(2, 4)}`,
                fechaSusp: `${i.FECHA_SUSP_OXI.slice(0, 4)}/${i.FECHA_SUSP_OXI.slice(4, 6)}/${i.FECHA_SUSP_OXI.slice(6, 8)}`,
                horaSusp: `${i.HORA_SUSP_OXI.slice(0, 2)}:${i.HORA_SUSP_OXI.slice(2, 4)}`,
                minuto: this.globalOxig.totalMinTabla,
                codMetodoOxig: i.TIPO_MET_OXI,
                metodoOxig: metodoOxige,
                observ: i.DESC_MET_OXI,
                dosis: i.DOSIS_OXIGENO,
                cantLts: i.CANT_OXI,
                usuario: i.OPER_ELAB,
                descripUsu: i.DESCRIP_OPER_ELAB,
              });
            })
        })
        .catch((err) => {
          console.error(err);
          loader("hide");
          CON851("", "Error llenando tabla", null, "error", "Error");
          this.salir_hc524();
        });
    },
  },
});
