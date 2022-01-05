(() => {
    _validarFecha_911();
})();

function _validarFecha_911() {
    var fecha_num = $_USUA_GLOBAL[0].FECHALNK;
    var año_num = 2000 + parseFloat(fecha_num.substr(0, 2))
    var mes_num = parseFloat(fecha_num.substr(2, 2));
    var dia_num = fecha_num.substr(4, 2);


    var today = new Date();
    var año_act = today.getFullYear();
    var mes_act = today.getMonth() + 1;
    var dia_act = today.getDate();

    var letra_mes = carpetaTrabajo(fecha_num.substr(2, 2));

    document.getElementById('letraMes_911').innerHTML = `${letra_mes.split('/').join(' ')} ${año_num}`
    document.getElementById('fechaNum_911').innerHTML = `${año_act}/${mes_act.toString().padStart(2, '0')}/${dia_act.toString().padStart(2, '0')}`;

    var mensaje = false;

    if (año_num != año_act) {
        mensaje = "No se puede generar facturas de otro año.";
    }

    if (mes_act == mes_num || (mes_act == mes_num - 1  && dia_act < 28)) {
        mensaje = false;
    } else {
        mensaje = "No se puede generar facturas de otro mes.";
    }

    if (mes_act == mes_num && dia_act > 5) {
        mensaje = "No se puede generar facturas despues del 5.";
    } else if (mes_act < mes_num && dia_act < 25) {
        mensaje = "No se puede generar facturas SIG. Mes antes del 25."
    }

    if (mensaje) {
        jAlert({ titulo: 'Error', mensaje: mensaje }, () => {
            setTimeout(_consultarNumeracion, 500);
        });
    } else {
        _consultarNumeracion();
    }
}

function _consultarNumeracion() {
    var today = new Date();
    var año_act = today.getFullYear();
    var mes_act = today.getMonth() + 1;
    var dia_act = today.getDate();

    var fecha_act = año_act.toString().substr(2, 2) + mes_act.toString().padStart(2, '0') + dia_act.toString().padStart(2, '0');

    postData({ datosh: datosEnvio() + "F01" + "|2|" }, get_url("APP/TAX/TAX132-1.DLL"))
        .then(data => {

            var resp = data.split('|');
            resp[1] = parseFloat(resp[1]) - 1;
            document.getElementById('numer_tax911').value = resp[1];
            document.getElementById('fecha_tax911').value = resp[0];

            if (resp[0] > fecha_act) {
                plantillaError("37", "37", "TAX908", () => {
                    _toggleNav();
                });
            } else {
                CON850_P(function (e) {
                    if (e.id == 'S') {
                        loader('show')
                        var datosh = datosEnvio() + resp[1].toString().padStart(6, '0') + "|" + localStorage.Usuario + "|"
                        postData({ datosh }, get_url('app/tax/tax911f.dll'))
                            .then(_contabilizar_tax911).catch(err => {
                                console.log(err);
                                loader('hide')
                                _toggleNav();
                            })

                    } else {
                        _toggleNav();
                    }
                },
                    { msj: 'Desea continuar?' }
                )
            }
        })
        .catch(error => {
            _toggleNav();
        });
}

function _contabilizar_tax911(data) {
    console.log(data, data.LISTA);
    let datos_envio = {}, posicion = 0, lista = data.LISTA;
    for (var i in lista) {
        var linea = '';
        if (lista[i].COMPR.trim()) {
            linea = "01|" + lista[i].COMPR + "|" + localStorage.Usuario + "|";
            posicion++;
            datos_envio['LIN-' + posicion.toString().padStart(3, "0")] = linea;
        }
    }
    datos_envio.datosh = datosEnvio();
    postData(datos_envio, get_url('app/invent/inv020.dll'))
        .then(data => {
            loader('hide')
            jAlert({ titulo: 'Confirmacion', mensaje: "Facturacion generada correctamenete" }, _toggleNav);
        }).catch(err => {
            loader('hide')
            console.log(err)
            _toggleNav();
        })
}