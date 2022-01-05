new Vue({
  el: "#PUB610",
  created() {
    nombreOpcion("6-A - Recalculo de Abonos Cartera");
    _inputControl("reset");
    _inputControl("disabled");
    this.confirmar();
  },
  methods: {
    confirmar() {
      CON851P("04", _toggleNav, this.llamarDLL);
    },

    llamarDLL() {
      loader("show");
      postData({ datosh: moduloDatosEnvio() + $_USUARIO_EMPRESA.ULT_PER + "|" }, get_url("app/SERVDOM/PUB201P.DLL"))
        .then((data) => {
          console.log(data);
          loader("hide");
          CON851("", "COMPLETADO", null, "success", "");
          _toggleNav();
        })
        .catch((err) => {
          console.error(err);
          loader("hide");
          CON851("", "Error consultando datos", null, "error", "Error");
          _toggleNav();
        });
    },
  },
});
