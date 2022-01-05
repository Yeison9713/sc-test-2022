new Vue({
  el: '#COR501',
  data() {
    return {
      estado: false,
    }
  },
  components: {
    cor_pend: require('../../COR/scripts/COR-PEND.vue.js'),
  },
  mounted() {
    this.estado = true
  },
  methods: {
    cerrar() {
      setTimeout(_toggleNav, 300)
    },
  },
})
