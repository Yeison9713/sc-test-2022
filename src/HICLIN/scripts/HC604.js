new Vue({
  el: "#HC604",
  data() {
    return {
      paramsHC604: {
        estado: false,
      },

      datosHC604: {
        admin: localStorage.Usuario,
        llave: {
          id: $_REG_HC.llave_hc.slice(0, 15),
          folio: $_REG_HC.llave_hc.slice(15),
        },
        edad: {
          unidad: $_REG_HC.edad_hc.unid_edad,
          valor: $_REG_HC.edad_hc.vlr_edad.toString(3, "0"),
        },
        medico: localStorage.IDUSU,
      },
    };
  },
  async created() {
    _toggleNav();
    nombreOpcion("6,4 - Habilitar historias en blanco");
    _vm = this;
  },
  mounted() {
    this.init();
  },
  components: {
    "nuevo-folio": component_hc604,
  },
  methods: {
    init() {
      this.paramsHC604.estado = true;
    },

    validarEsc_nuevoFolio() {
      this.paramsHC604.estado = false;
      this.salir();
    },

    validarCallback_nuevoFolio() {
      this.paramsHC604.estado = false;
      setTimeout(() => {
        this.salir();
      }, 300);
    },

    salir() {
      _regresar_menuhis();
    },
  },
});
