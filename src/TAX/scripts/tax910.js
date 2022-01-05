(() => {
    _inputControl('reset');
    _inputControl('disabled');

    var fechalnk = $_USUA_GLOBAL[0].FECHALNK;
    var año_num = fechalnk.substring(0, 2);
    var mes_num = fechalnk.substring(2, 4);
    var dia_num = fechalnk.substring(4, 6);

    document.getElementById("año_910").value = año_num
    document.getElementById("mes_910").value = mes_num
    document.getElementById("dia_910").value = dia_num

    document.getElementById("añoFin_910").value = año_num
    document.getElementById("mesFin_910").value = mes_num
    document.getElementById("diaFin_910").value = dia_num
    validarInicial_910();
})();

function validarInicial_910() {
    validarInputs({
        form: '#validarDia_910',
        orden: '1'
    },
        _toggleNav,
        () => {
            var dia = document.getElementById("dia_910").value
            if (!dia) validarInicial_910()
            else if (dia < 1 || dia > 31) validarInicial_910()
            else validarFinal_910()
        })
}

function validarFinal_910() {
    validarInputs({
        form: '#validarDiaFin_910',
        orden: '1'
    },
        validarInicial_910,
        () => {
            var dia = document.getElementById("diaFin_910").value
            if (!dia) validarFinal_910()
            else if (dia < 1 || dia > 31) validarFinal_910()
            else enviar_datos_910()
        })
}

function enviar_datos_910() {
    var año_ini = document.getElementById("año_910").value
    var mes_ini = document.getElementById("mes_910").value.toString().padStart(2, "0")
    var dia_ini = document.getElementById("dia_910").value.toString().padStart(2, "0")
    var fecha_ini = `20${año_ini}${mes_ini}${dia_ini}`

    var año_fin = document.getElementById("añoFin_910").value
    var mes_fin = document.getElementById("mesFin_910").value.toString().padStart(2, "0")
    var dia_fin = document.getElementById("diaFin_910").value.toString().padStart(2, "0")
    var fecha_fin = `20${año_fin}${mes_fin}${dia_fin}`

    var operador = localStorage.Usuario || ""

    var datos_envio = datosEnvio() + fecha_ini + "|" + fecha_fin + "|" + operador + "|";
    console.log(datos_envio)

    loader('show')
    postData({
        datosh: datos_envio
    }, get_url("APP/TAX/TAX910.DLL"))
        .then((data) => {
            console.log(data)
            loader('hide')
            jAlert({ titulo: 'Correcto', mensaje: "Re-contabilización terminada" }, _toggleNav);
        })
        .catch(err => {
            console.log(err)
            loader('hide')
            validarFinal_910();
            // jAlert({ titulo: 'Error', mensaje: "Ha ocurrido un error re-contabilizando" }, validarFinal_910);
        })
}