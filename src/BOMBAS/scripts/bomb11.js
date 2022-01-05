var $_DATOS_BOMB11, $_FECHA_INI, $_FECHA_FIN, $_FECHA_NUM, $_FECHA_ACT, $_NIT, $_TERCEROS_11, $_PREFIJO;
var fechaActual = null;
var $_REFERENCIA = null;
var $_SUCURSAL_11 = null;

(() => {
    loader('show')
    _inputControl('reset');
    _inputControl('disabled');
    $_FECHA_ACT = moment().format('YY-MM-DD');
    _getSucursales_11();
    // _crearJsonTerceros();

    _toggleF8([
        { input: 'nitBomb', app: '11', funct: _ventanatTerceros },
    ]);
})();

function _getSucursales_11() {
    postData({ datosh: datosEnvio() }, get_url("app/contab/CON823.DLL"))
        .then(res => {
            loader('hide')

            let array = [];
            res.SUCURSAL.forEach(element => {
                array.push({ cod: element.CODIGO, descripcion: element.DESCRIPCION })
            });

            _vetanaSucursales_11(array);
        })
        .catch(err => {
            loader('hide')
            console.log(err);
            _toggleNav()
        })
}

function _vetanaSucursales_11(data) {
    _ventanaDatos({
        titulo: 'Sucursal EDS a facturar',
        columnas: ["cod", "descripcion"],
        data,
        callback_esc: _toggleNav,
        callback: (data) => {
            loader('show')
            $_SUCURSAL_11 = data;
            _crearJsonTerceros();
        }
    });
}

function _crearJsonTerceros() {
    postData({ datosh: datosEnvio() }, get_url("app/bombas/CON802.DLL"))
        .then(data => {
            loader('hide')
            $_TERCEROS_11 = data.TERCEROS;
            var diaActual = new Date().getDate()
            let nit = $_USUA_GLOBAL[0].NIT;

            if (diaActual <= 25 && nit != 900065822) {
                fechaActual = false
                solicitarMes()
            } else {
                fechaActual = true
                SolicitarPrefijo();
            }
        })
        .catch(err => {
            console.log(err)
            loader('hide');
            _toggleNav()
        })
}


function solicitarMes() {
    let nit = $_USUA_GLOBAL[0].NIT;
    let meses = []
    let limite = nit == 900065822 ? 6 : 2

    for (let i = 0; i < limite; i++) {
        let fecha = moment().subtract(i, 'month')
        let fecha_format = fecha.format('MMM /YYYY').toUpperCase()
        meses.push({
            id: i + 1,
            label: fecha_format,
            fecha: fecha
        })
    }

    setTimeout(() => {
        POPUP({
            titulo: "MES DE LOS VALES",
            indices: [
                { id: 'id', label: 'label' }
            ],
            array: meses,
            callback_f: () => { _toggleNav() },
        }, (data) => {
            var inicial = data.fecha.clone().set("date", 1).format('YYMMDD')
            var final = data.fecha.clone().format('YYMMDD')
            $_FECHA_INI = inicial
            $_FECHA_NUM = final

            setTimeout(() => {
                SolicitarPrefijo()
            }, 500)
        })
    }, 300)
}

function SolicitarPrefijo() {
    var fuente = ''
        + '<div style="width: 100%; height: 100%;text-align: center;">'
        + ' <input id="prefijo" type="text" style="outline: none;padding: 5px 12px;box-sizing: border-box;" autofocus/>'
        + '</div>';

    setTimeout(() => {
        $("#prefijo").focus();
    }, 300)

    jAlert({
        titulo: 'Prefijo',
        mensaje: fuente,
        autoclose: false,
        btnCancel: true
    }, () => {
        $_PREFIJO = $('#prefijo').val().trim();
        var nit = $_USUA_GLOBAL[0].NIT;
        if (
            $_PREFIJO == "7" ||
            $_PREFIJO == "8" ||
            ($_PREFIJO == 14) & (nit == 41763240 || nit == 900065822) ||
            ($_PREFIJO == 9 && nit == 844001343)
        ) {
            jAlert_close();
            setTimeout(() => {
                let datos = {
                    datosh: datosEnvio(),
                    prefijo: $_PREFIJO
                }
                postData(datos, get_url("app/bombas/BOMB11.DLL"))
                    .then((data) => {
                        $_DATOS_BOMB11 = data.split("|");
                        if (fechaActual) {
                            $_FECHA_INI = $_DATOS_BOMB11[0];
                            $_FECHA_NUM = $_DATOS_BOMB11[4];
                        }

                        $('#añoInicial').val($_FECHA_INI.toString().substr(0, 2));
                        $('#mesInicial').val($_FECHA_INI.toString().substr(2, 2));
                        $('#diaInicial').val($_FECHA_INI.toString().substr(4, 2));

                        if (nit == 900065822) {
                            validar_mes_inicial_11()
                        } else {
                            fechaInicial("1");
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        setTimeout(SolicitarPrefijo, 500);
                        // loader('hide');
                    });
            }, 500);
        } else {
            $("#prefijo").val("").focus();
            // alert('Prefijo invalido')
            plantillaToast("03", "03", null, "warning", "Error");
        }
    }, () => {
        jAlert_close();
        var diaActual = new Date().getDate()
        if (diaActual <= 25) {
            fechaActual = false
            solicitarMes()
        } else {
            fechaActual = true
            _toggleNav()
        }
    });
}

function validar_mes_inicial_11() {
    validarInputs(
        {
            form: '#mes_inicial_bomb11',
            orden: '1'
        },
        SolicitarPrefijo,
        () => {
            fechaInicial('1')
        },
    );
}

function fechaInicial(orden) {
    validarInputs(
        {
            form: '#validarFechas',
            orden: orden
        },
        () => {
            var diaActual = new Date().getDate()
            var nit = $_USUA_GLOBAL[0].NIT;

            if (nit == 900065822) {
                validar_mes_inicial_11()
            } else if (diaActual <= 25) {
                fechaActual = false
                solicitarMes()
            } else {
                fechaActual = true
                SolicitarPrefijo();
            }
        },
        validarFechaInicial
    );
}

function validarFechaInicial() {
    ano = $('#añoInicial').val();
    mes = $('#mesInicial').val().padStart(2, '0');
    dia = $('#diaInicial').val().padStart(2, '0');
    if (mes < 1 || mes > 12 || dia < 1 || dia > 31) {
        fechaInicial('1');
    } else {
        $_FECHA_INI = ano + mes + dia;

        if ($_FECHA_NUM.toString().substr(0, 2) == $_FECHA_ACT.split('-')[0]
            && $_FECHA_NUM.toString().substr(2, 2) == $_FECHA_ACT.split('-')[1]) {
            dia = $_FECHA_ACT.split('-')[2];
        } else {
            dia = $_FECHA_NUM.toString().substr(4, 2);
        }
        $_FECHA_FIN = ano + mes + dia;

        $('#añoFinal').val($_FECHA_FIN.toString().substr(0, 2));

        var nit = $_USUA_GLOBAL[0].NIT;
        if (nit == 900065822) {
            validar_mes_final_11()
        } else {
            $('#mesFinal').val($_FECHA_FIN.toString().substr(2, 2));
            $('#diaFinal').val(dia);
            fechaFinal('1');
        }
    }
}


function validar_mes_final_11() {
    validarInputs(
        {
            form: '#mes_final_bomb11',
            orden: '1'
        },
        () => {
            fechaInicial('1')
        },
        () => {
            let mes = $('#mesFinal').val().padStart(2, '0')
            $('#mesFinal').val(mes)
            fechaFinal()
        }
    );
}


function fechaFinal(orden) {
    validarInputs(
        {
            form: '#fase1',
            orden: '1'
        },
        () => {
            var nit = $_USUA_GLOBAL[0].NIT;
            if (nit == 900065822) {
                validar_mes_final_11()
            } else {
                fechaInicial('1')
            }
        },
        validarFechaFinal
    );
}

function validarFechaFinal() {
    ano = $('#añoFinal').val();
    mes = $('#mesFinal').val();
    dia = $('#diaFinal').val().padStart(2, '0');
    var nit = $_USUA_GLOBAL[0].NIT;

    if (mes < 1 || mes > 12) {
        fechaFinal('1');
    } else {
        mes_ini = $_FECHA_INI.toString().substr(2, 2);
        $_FECHA_FIN = ano + mes + dia;
        if ((mes == mes_ini || mes == (mes_ini + 1)) || nit == 900065822) {
            if ($_FECHA_FIN < $_FECHA_INI) {
                fechaFinal('1');
            } else {
                nitProcesar();
            }
        } else {
            fechaFinal('1');
        }
    }
}

function nitProcesar() {
    validarInputs(
        {
            form: '#fase2',
            orden: '1'
        },
        () => { fechaFinal('1') },
        _validarTercero_11
    );
}

function _solicitar_order_reference() {
    var fuente = /*html*/`
        <div style="width: 100%; height: 100%;text-align: center;">
            <input id="referencia" type="text" style="outline: none;padding: 5px 12px;box-sizing: border-box;" class="uppercase" autofocus/>
        </div>
    `

    setTimeout(() => {
        $("#referencia").focus();
    }, 300)

    jAlert({
        titulo: 'Order reference',
        mensaje: fuente,
        autoclose: false,
        btnCancel: true
    }, () => {
        var referencia = $('#referencia').val().trim().toUpperCase()
        if (referencia) {
            $_REFERENCIA = referencia
        } else {
            $_REFERENCIA = null
        }

        jAlert_close();
        setTimeout(() => {
            confirmarProceso()
        }, 200)
    }, () => {
        jAlert_close();
        nitProcesar()
    });
}

function _validarTercero_11() {
    var nit_cliente = $('#nitBomb_11').val()
    var descript = buscarTercero_11(nit_cliente);
    if (descript || nit_cliente == '99') {
        if (nit_cliente == '99') {
            $('#descripBomb11').val('PROCESO TOTAL');
        } else {
            $('#descripBomb11').val(descript.NOMBRE);
        }

        $_REFERENCIA = null

        if (descript.ORD_REF == 'S') {
            // if (parseInt(nit_cliente) == 830095213) {
            _solicitar_order_reference()
        } else {
            confirmarProceso()
        }
    } else {
        nitProcesar();
    }
}

function confirmarProceso() {
    CON850_P(function (data) {
        if (data.id == 'S') {
            loader('show');

            var contabilidad = localStorage.Contab
            var contabilidad_text = contabilidad.substr(0, contabilidad.length - 2)

            var anioInicial = $_FECHA_INI.substr(0, 2)
            var anioEnvio = contabilidad_text + anioInicial
            let referencia = $_REFERENCIA || '';


            let datos = {
                datosh: datosEnvio() + $_DATOS_BOMB11[3] + "|" + anioEnvio + "|" + anioEnvio + "|" + referencia + "|",
                operador: localStorage.Usuario,
                fecha_ini: $_FECHA_INI,
                fecha_fin: $_FECHA_FIN,
                cliente: $('#nitBomb_11').val(),
                nro_fact: $_DATOS_BOMB11[1],
                prefijo: $_PREFIJO,
                sucursal: $_SUCURSAL_11.cod
            }

            postData(datos, get_url("app/bombas/BOMB11_1.DLL"))
                .then(data => {
                    loader('hide');
                    _inputControl('disabled');
                    fechaInicial('1');

                    $('#nitBomb_11').val("")
                    $('#descripBomb11').val("");
                    CON851('', data, null, 'success', '');
                }).catch(err => {
                    nitProcesar()
                    loader('hide');
                })
        } else {
            nitProcesar();
        }
    }, { msj: '04' });
}

function buscarTercero_11(codigo) {
    var retornar = false;
    for (var i in $_TERCEROS_11) {
        let code = $_TERCEROS_11[i].COD.trim().toLowerCase();
        if (code.trim() == codigo.padStart(10, '0')) {
            retornar = $_TERCEROS_11[i];
            break;
        }
    }
    return retornar;
}

function _ventanatTerceros(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Busqueda terceros',
            columnas: ["COD", "NOMBRE"],
            data: $_TERCEROS_11,
            callback: function (data) {
                $('#nitBomb_11').val(data.COD);
                $('#nitBomb_11').focus();
            }
        });
    }
}