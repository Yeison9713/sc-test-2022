new Vue({
  el: "#PUB609",
  created() {
    nombreOpcion("6-9 - Revisando Usuarios Nuevos con Medidor");
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
      postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB609.DLL"))
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
