(() => {
    _validarContinuar_909();
})();

function _validarContinuar_909() {
    validarInputs({
        form: '#faseContinuar',
        orden: '1'
    },
        _toggleNav,
        () => {
            var opción = document.getElementById('continuar_909').value

            if (opción.toUpperCase() == 'S') _llamarPrograma_909()
            else _toggleNav()
        })
}

function _llamarPrograma_909() {
    postData({ datosh: datosEnvio() }, get_url("APP/TAX/TAX909.DLL"))
        .then((data) => {
            console.log(data)
            jAlert({ titulo: 'Correcto', mensaje: "Contabilización terminada correctamente" }, _toggleNav);
        })
        .catch(err => {
            jAlert({ titulo: 'Error', mensaje: "Ha ocurrido un error contabilizando" }, _toggleNav);
        })
}