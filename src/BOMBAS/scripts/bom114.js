const { ventanaBloqueo } = require("../../BOMBAS/scripts/ventanaBloqueo.js");

(() => {
  CON851("", "Opcion solo de uso para administrador del sistema", "", "warning", "");
  ventanaBloqueo({
    callback: (res) => {
      CON851P(
        "Iniciar conversion del archivo?",
        _toggleNav,
        _iniciarConversion
      );
    },
    esc_callback: _toggleNav,
  });
})();

function _iniciarConversion() {
  loader("show");
  postData({ datosh: datosEnvio() }, get_url("APP/BOMBAS/CNV-COMBU.DLL"))
    .then(() => {
      loader("hide");
      _cambiarNombreCombustibles()
    })
    .catch((err) => {
      loader("hide");
      _toggleNav();
    });
}


function _cambiarNombreCombustibles() {
  let contab = localStorage.Contab;
  let data = `@echo off \n
              P: \n
              TITLE RENOMBRAR ARCHIVO DE CONVERSION ! \n
              cd ${contab}\\control \n
              REN SC-ARCOMBU.DAT SC-ARCOMBU-1.DAT \n
              REN SC-ARCOMBU-COPIA.DAT SC-ARCOMBU.DAT \n
              `;

  let random = new Date().getTime();
  let dir = `c:\\prosoft\\temp\\${random}.bat`

  fs.writeFile(dir, data, (err) => {
    if (err) {
      CON851(
        "",
        "No se logro cambiar el nombre del archivo, contactese con prosoft",
        "",
        "warning",
        ""
      )
      _toggleNav();
    } else {
      exe(dir, function (err, data) { });

      CON851("", "Proceso correcto !", "", "success", "");
      _toggleNav();
    }
  });
}