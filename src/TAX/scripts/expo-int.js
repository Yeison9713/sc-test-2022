(() => {
    _inputControl('reset');
    _inputControl('disabled');

    var fechalnk = $_USUA_GLOBAL[0].FECHALNK;
    var año_num = fechalnk.substring(0, 2);
    var mes_num = fechalnk.substring(2, 4);
    var dia_num = fechalnk.substring(4, 6);

    console.log(año_num, mes_num, dia_num)

    var dia_ini = 0;
    var mes_ini = mes_num;
    var año_ini = año_num;

    var dia_fin = 0;
    var mes_fin = mes_num;
    var año_fin = año_num;

    var fecha = new Date();
    var año_act = fecha.getFullYear().toString().substring(2, 4);
    var mes_act = (fecha.getMonth() + 1).toString().padStart(2, "0");
    var dia_act = fecha.getDate().toString().padStart(2, "0");

    if (año_num == año_act && mes_num == mes_act) {
        dia_ini = dia_act
        dia_fin = dia_act
    } else {
        dia_ini = "01"
        dia_fin = dia_num
    }


    document.getElementById("año_152a").value = año_ini
    document.getElementById("mes_152a").value = mes_ini
    document.getElementById("dia_152a").value = dia_ini

    document.getElementById("añoFin_152a").value = año_fin
    document.getElementById("mesFin_152a").value = mes_fin
    document.getElementById("diaFin_152a").value = dia_fin

    validarInicial_exp();
})();

function validarInicial_exp() {
    validarInputs({
        form: '#validarDia_exp',
        orden: '1'
    },
        _toggleNav,
        () => {
            var dia = document.getElementById("dia_152a").value
            if (!dia) validarInicial_exp()
            else if (dia < 0 || dia > 31) validarInicial_exp()
            else validarFinal_exp()
        })
}

function validarFinal_exp() {
    validarInputs({
        form: '#validarDiaFin_exp',
        orden: '1'
    },
        validarInicial_exp,
        () => {
            var dia = document.getElementById("diaFin_152a").value
            if (!dia) validarFinal_exp()
            else if (dia < 01 || dia > 31) validarFinal_exp()
            else enviar_datos();
        })
}

function enviar_datos() {
    var año_ini = document.getElementById("año_152a").value
    var mes_ini = document.getElementById("mes_152a").value.toString().padStart(2, "0")
    var dia_ini = document.getElementById("dia_152a").value.toString().padStart(2, "0")
    var fecha_ini = `20${año_ini}${mes_ini}${dia_ini}`

    var año_fin = document.getElementById("añoFin_152a").value
    var mes_fin = document.getElementById("mesFin_152a").value.toString().padStart(2, "0")
    var dia_fin = document.getElementById("diaFin_152a").value.toString().padStart(2, "0")
    var fecha_fin = `20${año_fin}${mes_fin}${dia_fin}`

    var datos_envio = datosEnvio() + fecha_ini + "|" + fecha_fin
    console.log(datos_envio)

    loader('show')
    postData({
        datosh: datos_envio
    }, get_url("APP/TAX/EXPO-INT.DLL"))
        .then((data) => {
            console.log(data)
            loader('hide')
            jAlert({ titulo: 'Correcto', mensaje: "Archivo exportado correctamente" }, _toggleNav);
        })
        .catch(err => {
            console.log(err)
            loader('hide')
            jAlert({ titulo: 'Error', mensaje: "Ha ocurrido un error generando el archivo" }, _toggleNav);
        })
}

