(() => {
    _inputControl('reset');
    _inputControl('disabled');

    _validarContinuar_in();
})();

function _validarContinuar_in() {
    validarInputs({
        form: '#validarContinuar_exp',
        orden: '1'
    },
        _toggleNav,
        () => {
            var opcion = document.getElementById("validacion_exp").value
            if (opcion.toUpperCase() == 'S') {
                loader('show')
                postData({
                    datosh: datosEnvio()
                }, get_url("APP/TAX/IMPO-INT.DLL"))
                    .then((data) => {
                        console.log(data)
                        loader('hide')
                        jAlert({ titulo: 'Correcto', mensaje: "Archivo importado correctamente" }, _toggleNav);
                    })
                    .catch(err => {
                        console.log(err)
                        loader('hide')
                        jAlert({ titulo: 'Error', mensaje: "Ha ocurrido un error importando el archivo" }, ()=>{
                            setTimeout(() => {
                                _validarContinuar_in();
                            }, 400);
                        });
                    })
            } else _toggleNav()
        })
}