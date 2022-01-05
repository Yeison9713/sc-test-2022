const { ventanaBloqueo } = require("../../BOMBAS/scripts/ventanaBloqueo.js");

(() => {
  CON851("", "Opcion solo de uso para administrador del sistema", "", "warning", "");
  ventanaBloqueo({
    callback: (res) => {
      CON851P("Desea crear archivos faltantes?", _toggleNav, _validarArchivos);
    },
    esc_callback: _toggleNav,
  });
})();

function _validarArchivos() {
  loader("show");
  postData(
    { datosh: datosEnvio() },
    get_url("APP/BOMBAS/CREA-ARCHIVOS-EDS.DLL")
  )
    .then(() => {
      loader("hide");
      CON851("", "Archivos creados correctamente", "", "success", "");
      _toggleNav();
    })
    .catch((err) => {
      loader("hide");
      _toggleNav();
    });
}
