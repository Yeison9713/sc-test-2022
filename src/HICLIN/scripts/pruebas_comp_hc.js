new Vue({
  el: "#PADRE",
  data: {
    params_hc890g: {
      estado: false,
    },
    params_hc832a: {
      estado: false,
    },
    params_evaldnt: {
      estado: false,
    },
    examen_visual: {
      agudeza_visual_oi_1: "",
      agudeza_visual_oi_2: "",
      agudeza_visual_od_1: "",
      agudeza_visual_od_2: "",
      estructuras_oculares_oi: "",
      estructuras_oculares_od: "",
      distancia_agud: "",
    },
    mostrarAnomalia: false,
    mostrarAgud: false,
    anomalias_congenitas: {
      descrip_anomalia: "",
      seguimien_anomal: "",
      laboratorio_anomal: "",
      fecha_prox_ctl: "",
      fecha_ult_cyd: "",
      fecha_vac_anomal: "",
      fecha_hig_oral_anomal: "",
    },
    evaldnt: {
      edema: "s",
      apetito: "2",
      inscrito_cyd: "S",
      fecha_inscrito_cyd: "20210202",
      nro_controles: "",
      manejo_dnt: "3",
      tabla_controles: [
        { fecha_controles: "20210102" },
        { fecha_controles: "" },
        { fecha_controles: "" },
        { fecha_controles: "" },
        { fecha_controles: "" },
      ],
      fecha_pediatria: "20210131",
      fecha_nutricion: "20201201",
      recupera_nutric: "S",
      micronutri_pol: "N",
    },
    mostrar_cyd: false,
  },
  components: {
    // agudeza_visual: require("../../HICLIN/scripts/HC890G.vue.js"),
    // anomalias: require("../../HICLIN/scripts/HC832A.vue.js"),
    evaldnt: require("../../HICLIN/scripts/EVALDNT.vue.js"),
  },
  created() {
    _vm = this;
    _inputControl("disabled");
    _inputControl("reset");
  },
  mounted() {
    this.llamado();
  },
  methods: {
    llamado() {
      this.mostrar_cyd = true;
      setTimeout(() => {
        this.params_evaldnt.estado = true;
      }, 300);
      console.log("params parent", this.params_evaldnt);
    },
    validar_otrocampo() {
      console.log("se fue a otro campo");
    },
    validarCallback(data) {
      console.log({ dta_retorno: data });
    },
    validarEsc() {
      this.params_evaldnt.estado = false;
      console.log("presiono ESC");
    },
  },
});
