const { ventanaBloqueo } = require("../../BOMBAS/scripts/ventanaBloqueo.js");

(() => {
    CON851("", "Opcion solo de uso para administrador del sistema", "", "warning", "");
    ventanaBloqueo({
        callback: (res) => {
            CON851P(
                "Iniciar re cuperacion de placas ? ",
                _toggleNav,
                _iniciarRecuperacion
            );
        },
        esc_callback: _toggleNav,
    });
})();

function _iniciarRecuperacion() {
    loader("show");
    postData({ datosh: datosEnvio() }, get_url("APP/BOMBAS/ARRE-PLACA-COMBU.DLL"))
        .then(() => {
            loader("hide");
            CON851("", "Proceso correcto !", "", "success", "");
            _toggleNav()
        })
        .catch((err) => {
            console.log(err)
            loader("hide");
            _toggleNav()
        });
}