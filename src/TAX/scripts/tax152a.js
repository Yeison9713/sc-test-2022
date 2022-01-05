(() => {
    _inputControl('reset');
    _inputControl('disabled');

    var fecha = new Date();
    var año = fecha.getFullYear();
    var mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    var dia = fecha.getDate().toString().padStart(2, "0");

    // console.log(año, mes, dia)
    document.getElementById("año_152a").value = año
    document.getElementById("mes_152a").value = mes
    document.getElementById("dia_152a").value = dia
    validarFecha_152a();

})();

function validarFecha_152a() {
    validarInputs({
        form: '#validarDia_152a',
        orden: '1'
    },
        _toggleNav,
        () => {
            var dia = document.getElementById("dia_152a").value
            if (!dia) validarFecha_152a()
            else {
                var mes = document.getElementById("mes_152a").value
                var año = document.getElementById("año_152a").value

                postData({
                    datosh: datosEnvio() + `${año}${mes}${dia}`
                }, get_url("APP/TAX/TAX152A.DLL"))
                    .then((data) => {
                        jAlert({ titulo: 'Movimiento anulado correctamente', mensaje: "Prueba" }, validarFecha_152a);
                    })
                    .catch(validarFecha_152a)
            }
        })
}