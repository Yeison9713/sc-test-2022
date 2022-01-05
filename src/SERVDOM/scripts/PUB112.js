const { claveProsoft } = require("../../frameworks/scripts/claveProsoft.js");

new Vue({
  el: "#PUB112",
  data: {},
  created() {
    CON851("", "Opcion solo de uso para administrador del sistema", "", "warning", "");
    claveProsoft({
      callback: (res) => {
        CON851P("Crear archivos?", _toggleNav, this._iniciarCreacion);
      },
      esc_callback: _toggleNav,
    });
  },
  methods: {
    _iniciarCreacion() {
      postData({datosh: moduloDatosEnvio()}, get_url("APP/SERVDOM/SC-DOM.DLL"))
        .then((data) => {
          console.log(data);
          CON851("", "Archivos generados", null, "success", "Completado");
          _toggleNav();
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error en archivo", null, "error", "Error");
          _toggleNav();
        });
    },
  },
});
