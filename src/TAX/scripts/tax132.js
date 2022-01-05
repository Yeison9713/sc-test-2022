var $_TAX132 = [], $_REG_TEMP = {}, $_TABLA_LIBROS = [];

var vlrBruto_132 = new IMask(
    document.getElementById('vlrBruto_132'),
    { mask: Number, min: -9999999999, max: 9999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var seguro_132 = new IMask(
    document.getElementById('seguro_132'),
    { mask: Number, min: -9999999999, max: 9999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var remesas_132 = new IMask(
    document.getElementById('remesas_132'),
    { mask: Number, min: -9999999999, max: 9999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var avances_132 = new IMask(
    document.getElementById('avances_132'),
    { mask: Number, min: -9999999999, max: 9999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var abonos_132 = new IMask(
    document.getElementById('abonos_132'),
    { mask: Number, min: -9999999999, max: 9999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var descuadre_132 = new IMask(
    document.getElementById('descuadre_132'),
    { mask: Number, min: -9999999999, max: 9999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var vlr_pago_caja = new IMask(
    document.getElementById('valorPago1_132'),
    { mask: Number, min: -9999999999, max: 9999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var vlr_pago_banco = new IMask(
    document.getElementById('valorPago2_132'),
    { mask: Number, min: -9999999999, max: 9999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

(() => {
    loader('show')
    _inputControl('reset');
    _inputControl('disabled');
    agencias_132();

    _toggleF8([
        { input: 'agencia', app: '132', funct: _ventanaAgencias_tax132 },
        { input: 'placa', app: '132', funct: _ventanaPlacas_tax132 },
        { input: 'sctaBanco', app: '132', funct: _ventanaMaestro_tax132 },
        { input: 'sctaCaja', app: '132', funct: _ventanaCaja_tax132 }
    ]);

})();

function _ventanaCaja_tax132(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Busqueda de plan de cuentas',
            columnas: ["CTA", "TIPO", "DESCRIP"],
            data: $_TAX132.MAESTROS,
            callback_esc: function () {
                $('#sctaCaja_132').focus();
            },
            callback: function (data) {
                document.getElementById('sctaCaja_132').value = data.CTA.trim()
                document.getElementById('descripcionCuenta_1').value = data.DESCRIP.trim()
                _enterInput('#sctaCaja_132');
            }
        });
    }
}

function _ventanaAgencias_tax132(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Busqueda de agencias',
            columnas: ["CODIGO", "DESCRIP"],
            data: $_TAX132.AGENCIAS,
            callback_esc: function () {
                $('#agencia_132').focus();
            },
            callback: function (data) {
                document.getElementById('agencia_132').value = data.CODIGO.trim()
                _enterInput('#agencia_132');
            }
        });
    }
}

function _ventanaPlacas_tax132(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Busqueda de placas',
            columnas: ["PLACA", "DESCRIP", "DESCRIP-MOD"],
            data: $_TAX132.PLACAS,
            callback_esc: function () {
                $('#agencia_132').focus();
            },
            callback: function (data) {
                document.getElementById('placa_132').value = data.PLACA.trim()
                _enterInput('#placa_132');
            }
        });
    }
}

function _ventanaMaestro_tax132(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Busqueda de plan de cuentas',
            columnas: ["CTA", "TIPO", "DESCRIP"],
            data: $_TAX132.MAESTROS,
            callback_esc: function () {
                $('#sctaBanco_132').focus();
            },
            callback: function (data) {
                document.getElementById('sctaBanco_132').value = data.CTA.trim()
                document.getElementById('descripcionCuenta_2').value = data.DESCRIP.trim()
                _enterInput('#sctaBanco_132');
            }
        });
    }
}

function agencias_132() {
    postData({ datosh: datosEnvio() }, get_url("app/TAX/TAX801.DLL"))
        .then(data => {
            $_TAX132.AGENCIAS = data.Agencias;
            $_TAX132.AGENCIAS.pop()
            placas_132()
        }).catch(err => {
            _toggleNav();
        })
}

function placas_132() {
    postData({ datosh: datosEnvio() }, get_url("app/TAX/TAX802.DLL"))
        .then(data => {
            $_TAX132.PLACAS = data.Carros;
            $_TAX132.PLACAS.pop()
            terceros_132()
        }).catch(err => {
            _toggleNav();
        })
}

function terceros_132() {
    postData({ datosh: datosEnvio() }, get_url("app/TAX/CON802.DLL"))
        .then(data => {
            $_TAX132.TERCEROS = data.TERCEROS;
            $_TAX132.TERCEROS.pop()
            maestros_132();
        }).catch(err => {
            _toggleNav();
        })
}

function maestros_132() {
    postData({ datosh: datosEnvio() }, get_url("app/TAX/CON801.DLL"))
        .then(data => {
            $_TAX132.MAESTROS = data.CUENTAS;
            $_TAX132.MAESTROS.pop()
            _consultarConsecutivo()
        }).catch(err => {
            _toggleNav();
        })
}

function _consultarConsecutivo() {
    postData({
        datosh: datosEnvio() + "01I" + "|"
    }, get_url("APP/TAX/TAX132-1.DLL"))
        .then(data => {
            loader('hide');
            let resp = data.split("|");
            $_TAX132.fecha_comp = resp[0];
            $_TAX132.comprobante = resp[1];
            $("#añoComp_132").val(resp[0].substr(0, 2));
            $("#mesComp_132").val(resp[0].substr(2, 2));
            $("#diaComp_132").val(resp[0].substr(4, 2));
            $("#comprobante_132").val(resp[1]);
            // validarAgencia();
            _ValidarFechaComp();
        })
        .catch(error => {
            _toggleNav();
        });
}

function _ValidarFechaComp() {
    validarInputs(
        {
            form: "#faseFechaComp_132",
            orden: "1"
        },
        _toggleNav,
        () => {
            var año = document.getElementById('añoComp_132').value;
            var mes = document.getElementById('mesComp_132').value;
            var dia = document.getElementById('diaComp_132').value;
            if ((parseFloat(mes) > 12 || parseFloat(mes) < 1) || (parseFloat(dia) > 31 || parseFloat(dia) < 1)) {
                plantillaError('01', '01', 'TAX908A', _ValidarFechaComp);
            } else {
                $_TAX132.fecha_comp = año + mes.padStart(2, "0") + dia.padStart(2, "0");
                validarAgencia();
            }
        }
    )
}

function validarAgencia() {
    validarInputs(
        {
            form: '#faseAgencia_132',
            orden: '1'
        },
        _ValidarFechaComp,
        function () {
            let date = new Date(), consulta = _consultarAgencia($("#agencia_132").val());
            if (consulta) {
                document.getElementById('descripAgenc_132').value = consulta.DESCRIP;
                document.getElementById('añoPlanilla_132').value = $_TAX132.fecha_comp.substr(0, 2)
                document.getElementById('mesPlanilla_132').value = $_TAX132.fecha_comp.substr(2, 2)
                document.getElementById('diaPlanilla_132').value = $_TAX132.fecha_comp.substr(4, 6);
                _evaluarDia();
            } else {
                jAlert({ titulo: 'Error', mensaje: "No se encontro agencia" }, validarAgencia);
            }
        }
    )
}

function _evaluarDia() {
    validarInputs(
        {
            form: "#faseDia_132",
            orden: "1"
        },
        validarAgencia,
        function () {
            let fecha_planilla = $("#añoPlanilla_132").val() + $("#mesPlanilla_132").val() + $("#diaPlanilla_132").val().padStart(2, "0"),
                fecha_comp = $_TAX132.fecha_comp;
            if (fecha_comp < fecha_planilla) {
                plantillaToast('99', '37', null, 'warning');
                _evaluarDia();
            } else {
                $_TAX132.fecha_planilla = fecha_planilla;
                _evaluarLibro()
            }
        }
    )
}

function _evaluarLibro() {
    validarInputs(
        {
            form: "#validarLibro",
            orden: "1",
            event_f9: _eliminarLibro_132,
            event_f3: _validarFormaPago_132
        },
        _evaluarDia,
        _validarLibro
    )
}

function _eliminarLibro_132() {
    var libro = document.getElementById("libro_132").value, consulta = _consultarTablaLibros(libro);
    if (consulta) {
        CON850_P(
            (e) => {
                if (e.id == "S") {
                    var filtro = $_TABLA_LIBROS.filter((e) => e.libro != libro);
                    $_TABLA_LIBROS = JSON.parse(JSON.stringify(filtro));

                    $_REG_TEMP = {};
                    document.getElementById("placa_132").value = "";
                    document.getElementById("libro_132").value = "";
                    vlrBruto_132.unmaskedValue = "";
                    seguro_132.unmaskedValue = "";
                    remesas_132.unmaskedValue = "";
                    avances_132.unmaskedValue = "";
                    abonos_132.unmaskedValue = "";
                    descuadre_132.unmaskedValue = "";

                    _cargarTabla();
                    _evaluarLibro();
                } else {
                    _evaluarLibro();
                }
            },
            { msj: "Desea eliminar item?" }
        );
    } else {
        _evaluarLibro();
    }
}



function _validarLibro() {
    $_REG_TEMP.libro = $("#libro_132").val();
    let datos = datosEnvio() + $_REG_TEMP.libro + "|01|";
    postData({ datosh: datos }, get_url("app/TAX/TAX132-2.DLL"))
        .then(data => {
            let items = $('#tablaLibros tbody tr');
            if (items.length == 0) {
                $_TABLA_LIBROS = [];
                _evaluarPlaca();
            } else {
                let consulta = _consultarTablaLibros($_REG_TEMP.libro);
                if (!consulta) {
                    _evaluarPlaca();
                } else {
                    document.getElementById("placa_132").value = consulta.placa;
                    vlrBruto_132.unmaskedValue = consulta.vlrBruto;
                    seguro_132.unmaskedValue = consulta.seguro;
                    remesas_132.unmaskedValue = consulta.remesas;
                    avances_132.unmaskedValue = consulta.avances;
                    abonos_132.unmaskedValue = consulta.abonos;
                    descuadre_132.unmaskedValue = consulta.descuadre;
                    _evaluarPlaca();
                }
            }
        })
        .catch(err => {
            console.log(err)
            _evaluarLibro();
        })
}

function _evaluarPlaca() {
    validarInputs(
        {
            form: "#validarPlaca",
            orden: "1"
        },
        _evaluarLibro,
        () => {
            let placa = $("#placa_132").val().toString().toUpperCase(), busqueda_placa = _consutarPlaca(placa);
            if (!busqueda_placa) {
                jAlert({ titulo: 'Error', mensaje: "No se encontro placa" }, _evaluarPlaca);
            } else {
                if (busqueda_placa.MODALIDAD == 'O' ||
                    busqueda_placa.MODALIDAD == 'E' ||
                    busqueda_placa.MODALIDAD == 'N' ||
                    busqueda_placa.MODALIDAD == 'K' ||
                    busqueda_placa.MODALIDAD == 'F'
                ) {

                    let consulta_tercero = _consultarTercero(busqueda_placa['COD-PRO']), c_costo = '', naturaleza = '';
                    if (consulta_tercero) {
                        if (busqueda_placa.NATURALEZA == '2') {
                            naturaleza = '2';
                            c_costo = busqueda_placa['C-COSTO'];
                        } else {
                            naturaleza = '1';
                            if ($_USUA_GLOBAL[0].NIT == 892002960) {
                                c_costo = $("#agencia_132").val();
                            } else {
                                c_costo = '0000';
                            }
                        }
                        $_REG_TEMP.placa = placa;
                        $_REG_TEMP.modalidad = busqueda_placa.MODALIDAD;
                        $_REG_TEMP.prop = consulta_tercero.COD;
                        $_REG_TEMP.naturaleza = naturaleza;
                        $_REG_TEMP.c_costo = c_costo;
                        $_REG_TEMP.porce_empre = $_REG_TEMP.porce_empre || busqueda_placa['PORC-EMPR'];


                        if ($_USUA_GLOBAL[0].NIT != 892000113) {
                            if ($_REG_TEMP.porce_empre != 0) {
                                let consulta = _consultarAgencia($("#agencia_132").val())
                                $_REG_TEMP.porce_empre = consulta['PRODUCT-EMPR'];
                            }
                        }
                        _evaluarVlrBruto();
                    } else {
                        jAlert({ titulo: 'Error', mensaje: "No se encontro propietario" }, _evaluarPlaca);
                    }
                } else {
                    jAlert({ titulo: 'Error', mensaje: "No es intermunicipal" }, _evaluarPlaca);
                }
            }
        }
    )
}

function _evaluarVlrBruto() {
    validarInputs(
        {
            form: "#validarVlrBruto",
            orden: "1"
        },
        _evaluarPlaca,
        _evaluarSeguro
    )
}

function _evaluarSeguro() {
    validarInputs(
        {
            form: "#validarseguro",
            orden: "1"
        },
        _evaluarVlrBruto,
        _evaluarRemesas
    )
}

function _evaluarRemesas() {
    validarInputs(
        {
            form: "#validarRemesas",
            orden: "1"
        },
        _evaluarSeguro,
        _evaluarAvances
    )
}

function _evaluarAvances() {
    validarInputs(
        {
            form: "#validarAvances",
            orden: "1"
        },
        _evaluarRemesas,
        _evaluarAbonos
    )
}

function _evaluarAbonos() {
    validarInputs(
        {
            form: "#validarAbonos",
            orden: "1"
        },
        _evaluarAvances,
        _evaluarDescuadre
    )
}

function _evaluarDescuadre() {
    validarInputs(
        {
            form: "#validarDescuadre",
            orden: "1"
        },
        _evaluarAbonos,
        () => {
            let vlrBruto = vlrBruto_132.unmaskedValue || "0"
            let seguro = seguro_132.unmaskedValue || "0"
            let remesas = remesas_132.unmaskedValue || "0"
            let avances = avances_132.unmaskedValue || "0"
            let abonos = abonos_132.unmaskedValue || "0"
            let descuadre = descuadre_132.unmaskedValue || "0"

            let descuadre_total = parseFloat(vlrBruto) + parseFloat(seguro) + parseFloat(remesas) - parseFloat(avances) + parseFloat(abonos) - parseFloat(descuadre)

            $_REG_TEMP.vlrBruto = vlrBruto;
            $_REG_TEMP.seguro = seguro;
            $_REG_TEMP.remesas = remesas;
            $_REG_TEMP.avances = avances;
            $_REG_TEMP.abonos = abonos;
            // $_REG_TEMP.descuadre = (descuadre_total * -1).toString();
            $_REG_TEMP.descuadre = '0';

            if (descuadre_total < 0) {
                plantillaError('', '07', 'TAX132', (data) => {
                    var index = $_TABLA_LIBROS.findIndex(e => e.libro == $_REG_TEMP.libro);

                    if (index < 0) $_TABLA_LIBROS.push({ ...$_REG_TEMP });
                    else $_TABLA_LIBROS[index] = { ...$_REG_TEMP };

                    _limpiarVlr();
                    _cargarTabla();
                });
            } else {
                var index = $_TABLA_LIBROS.findIndex(e => e.libro == $_REG_TEMP.libro);

                if (index < 0) $_TABLA_LIBROS.push({ ...$_REG_TEMP });
                else $_TABLA_LIBROS[index] = { ...$_REG_TEMP };

                _limpiarVlr();
                _cargarTabla();
            }


        }
    )
}

function _limpiarVlr() {
    document.getElementById('libro_132').value = '';
    document.getElementById('placa_132').value = '';
    libro_132
    $_REG_TEMP = {};
    vlrBruto_132.value = '';
    seguro_132.value = '';
    remesas_132.value = '';
    avances_132.value = '';
    abonos_132.value = '';
    descuadre_132.value = '';
    _evaluarLibro();
}

function _cargarTabla() {
    $('#tablaLibros tbody').html('');
    for (var i in $_TABLA_LIBROS) {
        $('#tablaLibros tbody').append(''
            + '<tr>'
            + ' <td class="index">' + $_TABLA_LIBROS[i].libro + '</td>'
            + ' <td>' + $_TABLA_LIBROS[i].placa + '</td>'
            + ' <td>' + $_TABLA_LIBROS[i].vlrBruto + '</td>'
            + ' <td>' + $_TABLA_LIBROS[i].seguro + '</td>'
            + ' <td>' + $_TABLA_LIBROS[i].remesas + '</td>'
            + ' <td>' + $_TABLA_LIBROS[i].avances + '</td>'
            + ' <td>' + $_TABLA_LIBROS[i].abonos + '</td>'
            + ' <td>' + $_TABLA_LIBROS[i].descuadre + '</td>'
            + '</tr>'

        )
    }

    getTotal_132()
}

function _validarFormaPago_132() {
    let nit = $_USUA_GLOBAL[0].NIT,
        agencia = $("#agencia_132").val(),
        vlr_total = getTotal_132();

    if (vlr_total < 0) {
        plantillaError(
            "",
            `El valor total no puede ser negativo - Descuadre: ${vlr_total}`,
            "TAX132",
            _evaluarLibro
        );
    } else {
        document.getElementById('vlrTotal_132').value = _formatNum_132(vlr_total);

        if ((nit == 892000113)
            && (agencia == '03' ||
                agencia == '46' ||
                agencia == '54' ||
                agencia == '55' ||
                agencia == '47')
        ) {
            let ctaBanco = '';

            if (agencia == "03") {
                ctaBanco = "11201010002";
            } else if (agencia == 54 || agencia == 55) {
                ctaBanco = "11200512702";
            } else {
                ctaBanco = "13050560006";
            }





            vlr_pago_banco.unmaskedValue = vlr_total.toString();
            document.getElementById('sctaBanco_132').value = ctaBanco;
            _ctaBancos_132();
        } else {
            document.getElementById('sctaCaja_132').value = '11050500002'
            document.getElementById('vlrTotal_132').value = _formatNum_132(vlr_total);
            vlr_pago_caja.unmaskedValue = vlr_total.toString();
            _formaPago1_132();
        }
    }
}

function getTotal_132() {
    var vlr_total = 0;
    var total_bruto = 0;
    var total_seguro = 0;
    var total_remesas = 0;
    var total_avances = 0;
    var total_abonos = 0;
    var total_descuadres = 0;


    for (var i in $_TABLA_LIBROS) {
        var item = $_TABLA_LIBROS[i]
        var vlr_bruto = parseFloat(item.vlrBruto) || 0;
        var vlr_seguro = parseFloat(item.seguro) || 0;
        var vlr_remesas = parseFloat(item.remesas) || 0;
        var vlr_avances = parseFloat(item.avances) || 0;
        var vlr_abonos = parseFloat(item.abonos) || 0;
        var vlr_descuadre = parseFloat(item.descuadre) || 0;

        total_bruto += vlr_bruto;
        total_seguro += vlr_seguro;
        total_remesas += vlr_remesas;
        total_avances += vlr_avances;
        total_abonos += vlr_abonos;
        total_descuadres += vlr_descuadre;

        vlr_total += (vlr_bruto + vlr_seguro + vlr_remesas - vlr_avances + vlr_abonos);
    }


    $('#tablaLibros tfoot').html(
        `<tr>
            <td></td>
            <td></td>
            <td>${_formatNum_132(total_bruto)}</td>
            <td>${_formatNum_132(total_seguro)}</td>
            <td>${_formatNum_132(total_remesas)}</td>
            <td>${_formatNum_132(total_avances)}</td>
            <td>${_formatNum_132(total_abonos)}</td>
            <td>${_formatNum_132(total_descuadres)}</td>
        </tr>`
    )
    return vlr_total;
}

function _formaPago1_132() {
    validarInputs(
        {
            form: '#_validarFormaPago1',
            orden: '1'
        },
        _evaluarLibro,
        () => {
            var cuentaCaja = document.getElementById('sctaCaja_132').value
            var busqueda = $_TAX132.MAESTROS.find(el => el.CTA.trim() == cuentaCaja)
            if (busqueda) {
                document.getElementById('descripcionCuenta_1').value = busqueda.DESCRIP.trim()
                _validarPago1()
            } else {
                _formaPago1_132()
            }
        }
    )
}

function _validarPago1() {
    validarInputs(
        {
            form: '#_validarPago1',
            orden: '1'
        },
        _formaPago1_132,
        () => {
            let ctaCaja = document.getElementById('sctaCaja_132').value,
                consultaCta = _consultarMaestro(ctaCaja),
                vlr_total = getTotal_132(),
                vlr_caja = vlr_pago_caja.unmaskedValue;

            if (consultaCta) {
                if (vlr_total == parseInt(vlr_caja)) {
                    _confirmarGuardado();
                } else {
                    _ctaBancos_132();
                    var agencia = $("#agencia_132").val()
                    var ctaBanco = agencia == "03" ? "11201010002" : "11200512702";

                    document.getElementById('sctaBanco_132').value = ctaBanco;
                }
            } else {
                plantillaToast('99', '01', null, 'warning');
                _evaluarLibro();
            }
        }
    )
}

function _ctaBancos_132() {
    validarInputs(
        {
            form: "#_validarSctBanco",
            orden: "1"
        },
        _evaluarLibro,
        () => {
            let ctaBanco = document.getElementById('sctaBanco_132').value,
                consultaCta = _consultarMaestro(ctaBanco)

            if (consultaCta) {
                var ctaMayor = consultaCta.CTA.substr(0, 2);
                if (parseFloat(ctaMayor) < 20) {
                    document.getElementById('descripcionCuenta_2').value = consultaCta.DESCRIP.trim()
                    _formaPago2_132();
                } else {
                    plantillaToast('03', '03', null, 'warning');
                    _ctaBancos_132();
                }
            } else {
                _ctaBancos_132();
            }
        }
    )
}

function _formaPago2_132() {
    validarInputs(
        {
            form: "#_validarFormaPago2",
            orden: "1"
        },
        _ctaBancos_132,
        () => {
            let vlr_total = getTotal_132(),
                vlr_subTotal = parseInt(vlr_pago_caja.unmaskedValue || "0") + parseInt(vlr_pago_banco.unmaskedValue || "0");

            if (vlr_subTotal == vlr_total) {
                _confirmarGuardado();
            } else {
                plantillaToast('99', '03', null, 'warning');
                _formaPago2_132();
            }

        }
    )
}

function _confirmarGuardado() {
    CON850_P(function (e) {
        if (e.id == 'S') {
            if ($_TABLA_LIBROS.length != 0) {
                _guardar_132();
            } else {
                jAlert({ titulo: 'Error', mensaje: "No se han digitado libros" }, _evaluarLibro);
            }
        } else {
            setTimeout(_evaluarLibro, 500)
        }
    }, {}
    )
}

function _guardar_132() {
    let datos_envio = {}, posicion = 0;
    let fecha_pla = document.getElementById('añoPlanilla_132').value +
        document.getElementById('mesPlanilla_132').value +
        document.getElementById('diaPlanilla_132').value.padStart(2, "0");

    let ctaCaja = document.getElementById('sctaCaja_132').value || 0,
        ctaBanco = document.getElementById('sctaBanco_132').value || 0,
        vlr_pago1 = vlr_pago_caja.unmaskedValue || 0,
        vlr_pago2 = vlr_pago_banco.unmaskedValue || 0;

    datos_envio.datosh = datosEnvio() +
        $("#agencia_132").val() +
        "|" +
        fecha_pla +
        "|" +
        $_TAX132.comprobante +
        "|" +
        $_TAX132.fecha_comp +
        "|" +
        localStorage.Usuario +
        "|" +
        ctaCaja +
        "|" +
        vlr_pago1 +
        "|" +
        ctaBanco +
        "|" +
        vlr_pago2 +
        "|";

    for (var i in $_TABLA_LIBROS) {
        let linea = '', vlrBruto,
            seguro, remesas, avances,
            abonos, descuadre, porce_empre;

        vlrBruto = $_TABLA_LIBROS[i].vlrBruto || 0;
        vlrBruto = parseFloat(vlrBruto).toFixed(0);
        vlrBruto = vlrBruto.padStart(12, "0");

        seguro = $_TABLA_LIBROS[i].seguro || 0;
        seguro = parseFloat(seguro).toFixed(0);
        seguro = seguro.padStart(12, "0");

        remesas = $_TABLA_LIBROS[i].remesas || 0;
        remesas = parseFloat(remesas).toFixed(0);
        remesas = remesas.padStart(12, "0");

        avances = $_TABLA_LIBROS[i].avances || 0;
        avances = parseFloat(avances).toFixed(0);
        avances = avances.padStart(12, "0");

        abonos = $_TABLA_LIBROS[i].abonos || 0;
        abonos = parseFloat(abonos).toFixed(0);
        abonos = abonos.padStart(12, "0");

        descuadre = $_TABLA_LIBROS[i].descuadre || 0;
        descuadre = parseFloat(descuadre).toFixed(0);
        descuadre = descuadre.padStart(12, "0");

        porce_empre = $_TABLA_LIBROS[i].porce_empre || 0;
        porce_empre = parseFloat(porce_empre).toFixed(2).replace(/\./g, '');
        porce_empre = porce_empre.padStart(4, "0");

        linea = $("#agencia_132").val() + "|"
            + $_TABLA_LIBROS[i].libro.padStart(9, "0") + "|"
            + $_TABLA_LIBROS[i].placa + "|"
            + vlrBruto + "|"
            + seguro + "|"
            + remesas + "|"
            + avances + "|"
            + abonos + "|"
            + descuadre + "|"
            + $_TABLA_LIBROS[i].modalidad + "|"
            + $_TABLA_LIBROS[i].prop + "|"
            + $_TABLA_LIBROS[i].naturaleza + "|"
            + $_TABLA_LIBROS[i].c_costo + "|"
            + porce_empre + "|";
        posicion++;
        datos_envio['LIN-' + posicion.toString().padStart(3, "0")] = linea;
    }
    console.log(datos_envio);
    loader('show')
    postData(datos_envio, get_url("app/TAX/TAX132-3.DLL"))
        .then((numero) => {
            console.log(numero);
            document.getElementById("comprobante_132").value = numero;
            setTimeout(() => {
                _validarImpresion_132();
            }, 500);
        })
        .catch((err) => {
            loader("hide");
            console.log(err);
            _evaluarLibro();
        });
}

function _validarImpresion_132(data) {
    loader('hide')
    CON850_P(function (e) {
        if (e.id == 'S') {
            loader('show')
            var datosh = datosEnvio() +
                document.getElementById("comprobante_132").value +
                "|";

            postData({ datosh }, get_url("APP/TAX/TAX142.DLL"))
                .then(_imprimir_132)
                .catch((err) => {
                    reset_132();
                });
        } else reset_132()
    }, { msj: "00" })
}

function _imprimir_132(data) {
    var consecutivo = document.getElementById('comprobante_132').value
    var empresa = $_USUA_GLOBAL[0].NOMBRE.trim();
    var nit = $_USUA_GLOBAL[0].NIT.toString();
    var opcionesImpresiones = {
        datos: data,
        extra: { empresa, nit, consecutivo },
        tipo: 'pdf',
        formato: 'tax/tax143.formato.html',
        nombre: 'PLANILLA INTERMUNICIPAL' + localStorage.Sesion
    };

    imprimir(opcionesImpresiones, () => {
        reset_132()
    })
}

function reset_132() {
    loader('hide')
    _inputControl('reset');
    _inputControl('disabled');
    $('#tablaLibros tbody').html('');
    $('#tablaLibros tfoot').html('');

    $_TAX132 = [];
    $_REG_TEMP = {};
    $_TABLA_LIBROS = [];

    vlrBruto_132.unmaskedValue = '';
    seguro_132.unmaskedValue = '';
    remesas_132.unmaskedValue = '';
    avances_132.unmaskedValue = '';
    abonos_132.unmaskedValue = '';
    descuadre_132.unmaskedValue = '';
    vlr_pago_caja.unmaskedValue = '';
    vlr_pago_banco.unmaskedValue = '';

    agencias_132()
}

function _formatNum_132(val) {
    var masked = IMask.createMask({ mask: Number, min: -999999999, max: 999999999, scale: 3, thousandsSeparator: ',', radix: '.' });
    masked.resolve(val.toString());
    return masked.value
}

function _consultarAgencia(cod) {
    return $_TAX132.AGENCIAS.find((e) => {
        if (e.CODIGO == cod) return e;
    });
}

function _consutarPlaca(cod) {
    return $_TAX132.PLACAS.find((e) => {
        if (e.PLACA == cod) return e;
    });
}

function _consultarTercero(cod) {
    return $_TAX132.TERCEROS.find((e) => {
        if (e.COD == cod) return e;
    });
}

function _consultarMaestro(cta) {
    return $_TAX132.MAESTROS.find((e) => {
        if (e.CTA == cta) return e;
    });
}

function _consultarTablaLibros(cod) {
    return $_TABLA_LIBROS.find((e) => {
        if (e.libro == cod) return e;
    });

}