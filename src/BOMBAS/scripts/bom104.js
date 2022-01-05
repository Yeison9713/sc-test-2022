
var $_VENDEDORES_104,
    $_CUENTAS_104,
    $_TERCEROS_104,
    $_ARTICULOS_104,
    $_VALORES_TMP,
    $_DATOS_TABLA = [],
    $_DATOS_VALES = [],
    $_FORMATO_104 = [],
    $_NRO_COMP_104 = null;

var dialogo_producto = null

// Máscaras inputs
var numAnterior = new IMask(
    document.getElementById('numAnter'),
    { mask: Number, min: -999999999999, max: 999999999999, scale: 3, thousandsSeparator: ',', radix: '.' }
);

var numActual = new IMask(
    document.getElementById('numActual'),
    { mask: Number, min: -999999999999, max: 999999999999, scale: 3, thousandsSeparator: ',', radix: '.' }
);

var valorActualMask = new IMask(
    document.getElementById('valorActual'),
    { mask: Number, min: -999999999, max: 999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var galonajeTotalMask = new IMask(
    document.getElementById('galonajeTotal'),
    { mask: Number, min: -9999999999, max: 9999999999, scale: 3, thousandsSeparator: ',', radix: '.' }
);

var valorTotalMask = new IMask(
    document.getElementById('valorTotal'),
    { mask: Number, min: -999999999999, max: 999999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var valorValeMask = new IMask(
    document.getElementById('valorVale'),
    { mask: Number, min: -999999999999, max: 999999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var valorCombustibleMask = new IMask(
    document.getElementById('valorCombustible'),
    { mask: Number, min: 0, max: 999999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var valorCreditosMask = new IMask(
    document.getElementById('totalCreditos'),
    { mask: Number, min: -999999999999, max: 999999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var valorFinanciacionMask = new IMask(
    document.getElementById('valorFinanciacion'),
    { mask: Number, min: 0, max: 999999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var valorChequesMask = new IMask(
    document.getElementById('valorCheques'),
    { mask: Number, min: 0, max: 999999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var valorEfectivoMask = new IMask(
    document.getElementById('valorEfectivo'),
    { mask: Number, min: 0, max: 999999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);


var cantidadVentanaMask = null;
// !Máscaras inputs

(() => {
    console.clear()
    loader('show')
    _inputControl('reset');
    _inputControl('disabled');
    _crearJsonVendedores_104();
    $('#formatoImpresion').select2().on('select2:close', validarFormato_104);

    _toggleF8([
        { input: 'vendedor', app: '104', funct: _ventanaVendedores },
        { input: 'codigoCuenta', app: '104', funct: _ventanaCuentas },
        { input: 'nitTerceroInpt', app: '104', funct: _ventanaTerceros },
    ]);
})();

function _ventanaVendedores(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "Busqueda vendedores",
            columnas: ["COD", "NOMBRE", "NIT", "TELEF"],
            data: $_VENDEDORES_104,
            callback_esc: function () {
                $('#vendedor_104').focus();
            },
            callback: function (data) {
                let cod = data.COD.trim()
                $('#vendedor_104').val(cod).focus();
                _enterInput('#vendedor_104');
            }
        });
    }
}


function _ventanaCuentas(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "Busqueda plan de cuentas",
            columnas: ["CTA", "DESCRIP", "TIPO"],
            data: $_CUENTAS_104,
            callback_esc: function () {
                $('#codigoCuenta_104').focus();
            },
            callback: function (data) {
                let cod = data.CTA.trim()
                $('#codigoCuenta_104').val(cod).focus();
                _enterInput('#codigoCuenta_104');
            }
        });
    }
}


// $(document).on('keydown', '#nitTerceroInpt_104', function (e) {
function _ventanaTerceros(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos_lite_v2({
            titulo: 'Busqueda terceros',
            data: $_TERCEROS_104,
            indice: ['COD', 'NOMBRE'],
            mascara: [
                {
                    COD: 'Identificacion',
                    NOMBRE: 'Nombre',
                    TELEF: 'Telefono',
                    CIUDAD: 'Ciudad',
                    ACT: 'Actividad',
                }
            ],
            minLength: 1,
            callback_esc: function () {
                $('#nitTerceroInpt_104').focus();
            },
            callback: function (data) {
                $('#nitTerceroInpt_104').val(data.COD.trim());
                _enterInput('#nitTerceroInpt_104');
            }
        });
    }
}
// });


function _crearJsonVendedores_104() {
    postData({ datosh: datosEnvio() }, get_url("app/bombas/CON805.DLL"))
        .then(data => {
            $_VENDEDORES_104 = data.VENDEDORES;
            _crearJsonCuentas_104()
        }).catch(err => {
            loader('hide');
            _toggleNav();
        })
}

function _crearJsonCuentas_104() {
    postData({ datosh: datosEnvio() }, get_url("app/bombas/CON801.DLL"))
        .then(data => {
            $_CUENTAS_104 = data.CUENTAS;
            _crearJsonArticulos_104();
        }).catch(err => {
            loader('hide');
            _toggleNav();
        })
}

function _crearJsonArticulos_104() {
    postData({ datosh: datosEnvio() }, get_url("app/bombas/INV803.DLL"))
        .then(data => {
            $_ARTICULOS_104 = data.Articulos;
            _crearJsonTerceros_014();
        }).catch(err => {
            loader('hide');
            _toggleNav();
        })
}

function _crearJsonTerceros_014() {
    postData({ datosh: datosEnvio() }, get_url("app/bombas/CON802.DLL"))
        .then(data => {
            loader('hide');
            $_TERCEROS_104 = data.TERCEROS;
            _getSucursales_104();
        }).catch(err => {
            loader('hide');
            _toggleNav();
        })
}

function _getSucursales_104() {
    postData({ datosh: datosEnvio() }, get_url("app/contab/CON823.DLL"))
        .then(res => {

            let array = [];
            res.SUCURSAL.forEach(element => {
                array.push({ cod: element.CODIGO, descripcion: element.DESCRIPCION })
            });

            _vetanaSucursales_104(array);
        })
        .catch(err => {
            console.log(err);
            _toggleNav()
        })
}

function _vetanaSucursales_104(data) {
    _ventanaDatos({
        titulo: 'Busqueda sucursales',
        columnas: ["cod", "descripcion"],
        data,
        callback_esc: _toggleNav,
        callback: consultarComprobante
    });
}

function consultarComprobante(sucursal) {
    document.getElementById("sucursal_104").value = sucursal.cod;
    document.getElementById("sucursalNom_104").value = sucursal.descripcion;

    let datos = {
        datosh: datosEnvio() + sucursal.cod + "|"
    }

    postData(datos, get_url("app/bombas/BOM104.DLL"))
        .then(data => {
            var res = data.split("|");
            $('#numComprobante').val(res[0]);
            $('#añoInicial').val(res[1].slice(0, 4))
            $('#mesInicial').val(res[1].slice(4, 6))
            $('#diaInicial').val(res[1].slice(6, 8))
            _initIslas();
        })
        .catch(err => {
            _toggleNav()
        })
}

function _initIslas() {
    $('#tablaVenta tbody').html('');
    $('#primeraIslaInpt,#segundaIslaInpt,#terceraIslaInpt').val('').attr('disabled', 'true')
    $_DATOS_TABLA = []
    // validarPrimeraIsla();

    _modificarTabla()
    _validarMes_104();
}


function _validarMes_104() {
    validarInputs(
        {
            form: "#validarMes",
            orden: "1"
        },
        _getSucursales_104,
        () => {
            var mes = parseFloat(document.getElementById('mesInicial').value) || 0;
            if (mes >= 1 && mes <= 12) {
                validarDia_104();
            } else {
                _validarMes_104();
            }
        }
    )
}

function validarDia_104() {
    validarInputs(
        { form: '#validarDia', orden: '1' },
        _validarMes_104,
        () => {
            var dia = parseFloat(document.getElementById('diaInicial').value) || 0,
                mes = parseFloat(document.getElementById('mesInicial').value) || 0,
                dia_max = 0;

            switch (mes) {
                case 1: dia_max = 31; break;
                case 2: dia_max = 29; break;
                case 3: dia_max = 31; break;
                case 4: dia_max = 30; break;
                case 5: dia_max = 31; break;
                case 6: dia_max = 30; break;
                case 7: dia_max = 31; break;
                case 8: dia_max = 31; break;
                case 9: dia_max = 30; break;
                case 10: dia_max = 31; break;
                case 11: dia_max = 30; break;
                case 12: dia_max = 31; break;
                default: dia_max = 30; break;
            }

            if (dia < 0 | dia > dia_max) validarDia_104()
            else _validarMovCombu()
        }
    )
}

function _validarMovCombu() {
    let anio = document.getElementById("añoInicial").value || "",
        dia = document.getElementById("diaInicial").value || "",
        mes = document.getElementById("mesInicial").value || "";

    let fecha =
        anio.padStart(4, "0") + mes.padStart(2, "0") + dia.padStart(2, "0");

    let datos = {
        datosh: datosEnvio(),
        fecha
    }

    postData(datos, get_url("app/bombas/BOM104_4.DLL"))
        .then(validarPrimeraIsla)
        .catch((err) => {
            console.log(err);
            validarDia_104();
        });
}

function validarPrimeraIsla() {
    validarInputs(
        { form: '#primeraIsla', orden: '1' },
        validarDia_104,
        on_validarPrimeraIsla
    )
}

function on_validarPrimeraIsla() {
    var isla = $('#primeraIslaInpt').val() || '0';
    postData({ datosh: datosEnvio() + isla + "|" }, get_url("app/bombas/BOM104_1.DLL"))
        .then(data => {
            _llenarTabla(data);
            validarSegundaIsla();
        }).catch(validarPrimeraIsla)
}

function validarSegundaIsla() {
    validarInputs(
        { form: '#segundaIsla', orden: '1' },
        _initIslas,
        on_validarSegunaIsla
    )
}

function on_validarSegunaIsla() {
    var filas_actual = $('#tablaVenta tbody tr').length
    var primeraIsla = $('#primeraIslaInpt').val();
    var isla = $('#segundaIslaInpt').val() ? $('#segundaIslaInpt').val() : false;
    var datos_envio = datosEnvio();
    datos_envio += isla + '|';

    if (primeraIsla == isla) validarSegundaIsla();
    else if (isla) {
        if (filas_actual >= 50) {
            plantillaToast('99', 'Máximo 50 surtidores en la tabla', null, 'warning');
            validarSegundaIsla()
        } else {
            postData({ datosh: datosEnvio() + isla + "|" }, get_url("app/bombas/BOM104_1.DLL"))
                .then(data => {
                    _llenarTabla(data);
                    validarTerceraIsla();
                }).catch(validarSegundaIsla)

        }
    } else validarTerceraIsla();
}

function validarTerceraIsla() {
    validarInputs(
        { form: '#terceraIsla', orden: '1' },
        _initIslas,
        on_validarTerceraIsla
    )
}

function on_validarTerceraIsla() {
    var filas_actual = $('#tablaVenta tbody tr').length
    var primeraIsla = $('#primeraIslaInpt').val();
    var segundaIsla = $('#segundaIslaInpt').val();
    var isla = $('#terceraIslaInpt').val() ? $('#terceraIslaInpt').val() : false;
    var datos_envio = datosEnvio();
    datos_envio += isla + '|';

    if (isla) {
        if (primeraIsla == isla) validarTerceraIsla();
        else if (segundaIsla == isla) validarTerceraIsla();
        else {
            if (filas_actual >= 50) {
                plantillaToast('99', 'Máximo 50 surtidores en la tabla', null, 'warning');
                validarTerceraIsla()
            } else {

                postData({ datosh: datosEnvio() + isla + "|" }, get_url("app/bombas/BOM104_1.DLL"))
                    .then(data => {
                        _llenarTabla(data);
                        _validarPrimeraFase_104('1');
                    }).catch(validarTerceraIsla)
            }
        }
    } else {
        _validarPrimeraFase_104('1');
    }

}

function _validarPrimeraFase_104(orden) {
    validarInputs(
        { form: '#primeraFase', orden: orden },
        _initIslas,
        _validarVendedor_104
    )
}

function _validarVendedor_104() {
    var codVendedor = espaciosIzq($('#vendedor_104').val(), 5);
    var validacion = buscarVendedor_104(codVendedor);
    if (validacion != false) {
        $('#vendedor_104').val(validacion.COD.trim())
        _validacionTabla_104('0');
    } else {
        plantillaToast('99', '01', null, 'warning');
        _validarPrimeraFase_104('3');
    }
}


function _validacionTabla_104(orden) {
    validarTabla(
        {
            tabla: '#tablaVenta',
            orden: orden,
            event_f3: () => {

                _validacionSegundaTabla_104()
            }
        },
        seleccion,
        function () {
            // $_VALORES_TMP = {};
            // $_DATOS_TABLA = [];
            // numAnterior.unmaskedValue = '';
            // numActual.unmaskedValue = '';
            // valorActualMask.unmaskedValue = '';
            // galonajeTotalMask.unmaskedValue = '';
            // valorTotalMask.unmaskedValue = '';
            // $('#codItem,#codProducto,#descProducto').val('');
            // $('#tablaVenta tbody').html('');
            _validarPrimeraFase_104('3')
        },
        () => {
            _validacionSegundaTabla_104()
        }
    );
}

function seleccion(datos) {
    var element = $(datos).find('td.index')
    var surtidor = $(element).html();

    galonajeTotalMask.unmaskedValue = '';
    valorTotalMask.unmaskedValue = '';

    var consulta = _consultarItemArray(surtidor);
    if (consulta) {
        $('#codItem').val(consulta.array.itemSurtidor)
        $('#codProducto').val(consulta.array.codProducto)
        $('#descProducto').val(consulta.array.descrProducto)

        numAnterior.unmaskedValue = consulta.array.valorAnterior;
        numActual.unmaskedValue = consulta.array.numeroActual.toString();
        valorActualMask.unmaskedValue = consulta.array.valorActual.toString();

        $_VALORES_TMP = {
            item: consulta.array.itemSurtidor,
            pesosSurti: consulta.array.pesosSurti,
            valorVenta: consulta.array.valorVenta,
            valorSobretasa: consulta.array.valorSobretasa,
            valorGlobal: consulta.array.valorGlobal,
            codProducto: consulta.array.codProducto,
            descrProducto: consulta.array.descrProducto,
            numeroAnterior: consulta.array.valorAnterior
        }

        _numeroActual();
    } else {
        consultaInfoSurtidor(surtidor)
    }
}

function consultaInfoSurtidor(surtidor) {
    var anio = $('#añoInicial').val() || ""
    var mes = $('#mesInicial').val() || ""
    var dia = $('#diaInicial').val() || ""

    var fecha = anio.padStart(4, "0") + mes.padStart(2, "0") + dia.padStart(2, "0");

    let datos = {
        datosh: datosEnvio(),
        surtidor,
        fecha,
    }

    postData(datos, get_url("app/bombas/BOM104_2.DLL"))
        .then(data => {
            var res = data.split("|");
            var item = res[0].trim();
            var codProducto = res[1].trim();
            var descrProducto = res[2].trim();
            var numeroAnterior = res[3].trim() ? res[3].trim() : '0';
            var pesos = res[4].trim() || 0;
            var valorVenta = res[5].trim() || 0;
            var valorSobretasa = res[6].trim() || 0;
            var valorGlobal = res[7].trim() || 0;

            $_VALORES_TMP = {
                item: item,
                pesosSurti: pesos,
                valorVenta: valorVenta,
                valorSobretasa: valorSobretasa,
                valorGlobal: valorGlobal,
                codProducto: codProducto,
                descrProducto: descrProducto,
                numeroAnterior: numeroAnterior,
                valorActual: 0
            }

            $('#codItem').val(item)
            $('#codProducto').val(codProducto)
            $('#descProducto').val(descrProducto)
            numAnterior.unmaskedValue = numeroAnterior;
            numActual.unmaskedValue = numeroAnterior;

            _numeroActual();
        }).catch(err => {
            _validacionTabla_104('0')
        })
}

function _numeroActual() {
    validarInputs(
        { form: '#validarNumeroActual', orden: '1' },
        function () {
            var item = $('#codItem').val();
            var indxTabla = _siguienteFilaTabla(item - 1); // Buscar siguiente elemento en la tabla
            _validacionTabla_104(indxTabla)
        },
        _validarNumeroActual
    )
}

function _valorActual() {
    validarInputs(
        { form: '#validarNumeroActual', orden: '1' },
        _numeroActual,
        function () {
            let valorActual = valorActualMask || 0;
            if (parseFloat(valorActual) < parseFloat($_VALORES_TMP['pesosSurti'])) _valorActual()
            else _calcularGalonaje();
        }
    )
}

function _validarNumeroActual() {
    var item = $('#codItem').val();
    if (item == $_VALORES_TMP['item']) {
        var numeroAnterior = parseFloat(numAnterior.unmaskedValue);
        var numeroActual = parseFloat(numActual.unmaskedValue);

        if (numeroActual == numeroAnterior) {
            galonajeTotalMask.unmaskedValue = '';
            valorTotalMask.unmaskedValue = '';
            valorActualMask.unmaskedValue = '';
            numAnterior.unmaskedValue = '';
            numActual.unmaskedValue = '';

            var consulta = _consultarItemArray(item);
            if (consulta) {
                $_DATOS_TABLA[consulta.index] = {
                    itemSurtidor: item,
                    estado: 0
                }
            }

            _modificarTabla();
            var indxTabla = _siguienteFilaTabla(item); // Buscar siguiente elemento en la tabla
            _validacionTabla_104(indxTabla);
        } else if (numeroActual < numeroAnterior) {
            _numeroActual();
        } else {
            if (parseFloat($_VALORES_TMP['pesosSurti']) == 0) {
                valorActualMask.unmaskedValue = '0';
                _calcularGalonaje();
            } else {
                _valorActual();
            }
        }
    } else {
        jAlert({
            titulo: 'Notificacion',
            mensaje: "Ha ocurrido un error con la consulta: <b>501</b>"
        }, function () { _validacionTabla_104('0') });
    }
}

function _calcularGalonaje() {
    var item = $('#codItem').val();
    var numeroAnterior = parseFloat(numAnterior.unmaskedValue);
    var numeroActual = parseFloat(numActual.unmaskedValue);
    var valorActual = valorActualMask.unmaskedValue || 0;
    let galonajeActual = numeroActual - numeroAnterior;

    galonajeActual = parseFloat(galonajeActual.toFixed(3));
    // console.log('->', numeroAnterior, numeroActual, galonajeActual)
    let valorActualTmp = galonajeActual * parseFloat($_VALORES_TMP['valorVenta']);
    let valorSobretasa = galonajeActual * parseFloat($_VALORES_TMP['valorSobretasa']);
    let valorGlobal = galonajeActual * parseFloat($_VALORES_TMP['valorGlobal']);

    let valorTotal = parseFloat(valorActualTmp.toFixed(0)) + parseFloat(valorSobretasa.toFixed(0)) + valorGlobal;
    // let valorTotal = parseFloat(valorActualTmp.toFixed(3)) + parseFloat(valorSobretasa.toFixed(3)) + valorGlobal;

    let pesosSurti = $_VALORES_TMP['pesosSurti'] || 0;
    let difW = parseFloat(pesosSurti) + parseFloat(valorTotal) - parseFloat(valorActual);

    if (
        (parseFloat(pesosSurti) > 0)
        && (parseFloat(difW) > parseFloat($_VALORES_TMP['valorVenta']))
    ) {
        plantillaToast('', 'Error en lectura precio', null, 'error');
        _numeroActual();
    } else {
        valorTotalMask.unmaskedValue = valorTotal.toFixed(0);
        galonajeTotalMask.unmaskedValue = galonajeActual.toString();

        var consulta = _consultarItemArray(item);
        if (consulta) {
            $_DATOS_TABLA[consulta.index] = {
                itemSurtidor: item,
                galonaje: galonajeActual.toString(),
                valor: valorTotal.toFixed(0),
                codProducto: $_VALORES_TMP['codProducto'],
                descrProducto: $_VALORES_TMP['descrProducto'],
                valorGlobal: $_VALORES_TMP['valorGlobal'],
                valorSobretasa: $_VALORES_TMP['valorSobretasa'],
                valorVenta: $_VALORES_TMP['valorVenta'],
                valorAnterior: $_VALORES_TMP['numeroAnterior'],
                numeroActual: numeroActual,
                valorActual: valorActual,
                pesosSurti: $_VALORES_TMP['pesosSurti']
            }
        } else {
            $_DATOS_TABLA.push({
                itemSurtidor: item,
                galonaje: galonajeActual.toString(),
                valor: valorTotal.toFixed(0),
                codProducto: $_VALORES_TMP['codProducto'],
                descrProducto: $_VALORES_TMP['descrProducto'],
                valorGlobal: $_VALORES_TMP['valorGlobal'],
                valorSobretasa: $_VALORES_TMP['valorSobretasa'],
                valorVenta: $_VALORES_TMP['valorVenta'],
                valorAnterior: $_VALORES_TMP['numeroAnterior'],
                numeroActual: numeroActual,
                valorActual: valorActual,
                pesosSurti: $_VALORES_TMP['pesosSurti']
            });
        }

        _modificarTabla();

        var indxTabla = _siguienteFilaTabla(item);// Buscar siguiente elemento en la tabla
        _validacionTabla_104(indxTabla)
    }
}


function _modificarTabla() {
    var items = $('#tablaVenta tbody tr');
    var totalGalonaje = 0, totalValor = 0;
    var masked = IMask.createMask({ mask: Number, min: 0, max: 999999999999, scale: 3, thousandsSeparator: ',', radix: '.' });
    var masked2 = IMask.createMask({ mask: Number, min: 0, max: 999999999999, scale: 3, thousandsSeparator: ',', radix: '.' });

    for (var i = 0; i < items.length; i++) {
        let elemento = $(items[i])
        var columnas = $(elemento).find('td');
        let elementoIndex = $(elemento).find('td.index')
        let itemTabla = $(elementoIndex).html();

        for (var j in $_DATOS_TABLA) {
            if ($_DATOS_TABLA[j].itemSurtidor == itemTabla) {
                if ($_DATOS_TABLA[j].estado == 0) {
                    $(columnas[1]).html('');
                    $(columnas[2]).html('');
                    $_DATOS_TABLA.splice(j, 1);
                } else {
                    totalGalonaje += parseFloat($_DATOS_TABLA[j].galonaje);
                    totalValor = parseFloat(totalValor) + parseFloat($_DATOS_TABLA[j].valor);
                    totalValor = parseFloat(totalValor).toFixed(0);

                    var maskedValue = masked.resolve($_DATOS_TABLA[j].galonaje.toString());
                    $(columnas[1]).html(masked.value);
                    var maskedValue = masked2.resolve($_DATOS_TABLA[j].valor.toString());
                    $(columnas[2]).html(masked2.value);
                }
            }
        }
    }

    var maskedValue = masked.resolve(totalGalonaje.toFixed(3));
    $('#galonajeTablaVenta').html(masked.value);
    var maskedValue = masked2.resolve(totalValor.toString());
    $('#ventaTablaVenta').html(masked2.value);
    valorCombustibleMask.unmaskedValue = totalValor.toString();
}

function _validacionSegundaTabla_104() {
    var items = $('#tablaVales tbody tr').length;
    var input_item = document.getElementById('itemVales').value
    if (!input_item) document.getElementById('itemVales').value = (items + 1).toString().padStart(3, "0")

    validarInputs(
        {
            form: "#itemSegundaTabla",
            orden: "1",
            event_f1: () => {
                var items = $("#tablaVenta tbody tr");
                _validacionTabla_104(items.length - 1);
            },
            event_f3: _validarFinanciacion,
            event_f6: () => {
                // let nit_empresa = $__USUA_GLOBAL[0].NIT
                // if (nit_empresa == 1120366660)
                solicitar_plano_104()
            }
        },
        function () {
            var input_item =
                parseInt(document.getElementById("itemVales").value) || 1;
            if (input_item > 1)
                document.getElementById("itemVales").value = (input_item - 1)
                    .toString()
                    .padStart(3, "0");
            _validacionSegundaTabla_104();
        },
        on_validacionSegundaTabla_104
    );
}

function solicitar_plano_104() {
    $('#modal_plano').modal('show')
}

document.getElementById("procesar_plano_btn").addEventListener("click", () => {
    let archivos = document.getElementById('archivo_vales').files

    if (archivos.length > 0) {
        let plano = archivos[0]
        var reader = new FileReader();
        reader.onload = function (e) {
            let string = reader.result
            var lineas = string
                .split(/\n/)
                .map(lineStr => lineStr.split(","))
                .slice(1);

            lineas.pop()
            procesar_plano_104(lineas)
        }
        reader.readAsText(plano, 'ISO-8859-1');

    } else {
        CON851('', 'Debes seleccionar una archivo plano', null, 'error', 'Error');
    }
});

function procesar_plano_104(data) {
    let vendedor_actual = document.getElementById('vendedor_104').value
    let info_vendedor = $_VENDEDORES_104.find(el => el.COD == vendedor_actual)

    let filtro = data.filter(el => {
        let cliente = el[9] != '0'
        let factura = el[1] == 'Factura'
        let tipo = el[13] == 'CONTADO' || el[13] == 'CREDITO'
        let vendedor = el[17].trim() == info_vendedor.NIT

        return cliente && factura && tipo && vendedor
    })

    let aceptados = []

    let surtidores = $_DATOS_TABLA
    filtro.forEach(el => {
        let surtidor = el[3].substr(0, 1)
        let manguera = el[4].substr(0, 1)
        let llave_surtidor = surtidor + manguera
        let busqueda_surtidor = surtidores.find(isla => isla.itemSurtidor == llave_surtidor)

        if (busqueda_surtidor) aceptados.push(el)
    })

    let datos_tabla = []
    let item_actual = $_DATOS_VALES.length
    console.debug('Aceptados', aceptados)
    aceptados.forEach(el => {
        let item = item_actual + 1
        item_actual = item

        let tipo = el[13]
        let cuenta = ''
        if (tipo == 'CONTADO') cuenta = '11050500001'
        else if (tipo == 'CREDITO') cuenta = '13459500001'

        let documento = el[2]
        let nit_tercero = el[9]
        let placa = el[12]
        let valor = el[7]
        let descripcionTercero = el[8]
        let valor_format = valor.replace(/\./g, '')

        let obj = {
            cantidad: "0",
            codCuenta: cuenta,
            codProducto: "",
            descripProducto: "",
            documento: documento,
            item: item.toString().padStart(3, '0'),
            nitTercero: nit_tercero,
            placa: placa,
            valorVale: valor_format,
            descripcionTercero
        }

        datos_tabla.push(obj)
    })

    $_DATOS_VALES = [
        ...$_DATOS_VALES,
        ...datos_tabla
    ]

    _modificarTablaVales()
    $('#modal_plano').modal('hide')

    $("#itemVales").val("");
    _initBoxVales();
    _validacionSegundaTabla_104();
}

document.getElementById("cancelar_plano_btn").addEventListener("click", () => {
    $('#modal_plano').modal('hide')
    setTimeout(_validacionSegundaTabla_104, 1000)
})

function on_validacionSegundaTabla_104() {
    var segundoItem = cerosIzq($('#itemVales').val(), 3)
    var itemsTabla = $('#tablaVales tbody tr').length + 1;

    if (segundoItem > itemsTabla || segundoItem == '000') {
        $('#itemVales').val(cerosIzq(itemsTabla, 3))
        _initBoxVales();
        _validacionSegundaTabla_104();
    } else {
        var consulta = _consultarItemArray_vales(segundoItem);
        if (consulta) {
            $('#itemVales').val(consulta.array.item);
            $('#codigoCuenta_104').val(consulta.array.codCuenta);
            $('#nitTerceroInpt_104').val(consulta.array.nitTercero);
            $('#documentoInpt').val(consulta.array.documento);
            valorValeMask.unmaskedValue = consulta.array.valorVale.toString();
            $('#itemVales').val(cerosIzq(segundoItem, 3))
        } else {
            $('#itemVales').val(cerosIzq(segundoItem, 3))
            _initBoxVales();
            $('#codigoCuenta_104').val('13459500001')
        }

        _validarPlanCuenta();
    }
}

function _validarPlanCuenta() {
    validarInputs(
        {
            form: '#validarCuenta',
            orden: '1',
            event_f9: () => {
                var length = $_DATOS_VALES.length - 1;
                var cuenta = length >= 0 ? $_DATOS_VALES[length].codCuenta : false;
                if (cuenta) $("#codigoCuenta_104").val(cuenta);

                _validarPlanCuenta();
            },
        },
        _validacionSegundaTabla_104,
        function () {
            var codCuenta = $('#codigoCuenta_104').val() || "";
            var validacion = buscarCuentaContable_104(codCuenta);

            if (!codCuenta.trim()) {
                CON850_P(
                    function (e) {
                        if (e.id == "S") {

                            let item = $('#itemVales').val()
                            let busqueda = $_DATOS_VALES.filter(el => el.item != item)
                            busqueda = busqueda.map((el, index) => {
                                el.item = (index + 1).toString().padStart(3, '0')

                                return el
                            })

                            $_DATOS_VALES = []
                            $_DATOS_VALES = JSON.parse(JSON.stringify(busqueda))
                            _modificarTablaVales()
                            _initBoxVales()
                            _validacionSegundaTabla_104()
                        } else {
                            setTimeout(_validacionSegundaTabla_104, 200);
                        }
                    },
                    { msj: "Desea eliminar item?" }
                );
            } else if (validacion) {
                let cuenta_mayor = codCuenta.substring(0, 6);
                let array_cuentas = ["134595", "110505", "130505", "111005", "112005"];

                if (array_cuentas.includes(cuenta_mayor)) {
                    let separa_caja = $_USUA_GLOBAL[0]["SEPARA_CAJA"].trim() || "N";
                    if (separa_caja == "S") {
                        $("#desCuenta_104").val(validacion.DESCRIP.trim());
                        _validarTercero();
                    } else {
                        let auxiliar = parseFloat(codCuenta.substring(6));
                        let sucursal = document.getElementById("sucursal_104").value || 0;

                        if (auxiliar == parseFloat(sucursal)) {
                            $("#desCuenta_104").val(validacion.DESCRIP.trim());
                            _validarTercero();
                        } else {
                            CON851("", "La sucursal no coincide con el auxiliar de la cuenta", null, "error", "Error");
                            _validarPlanCuenta();
                        }
                    }
                } else {
                    $("#desCuenta_104").val(validacion.DESCRIP.trim());
                    _validarTercero();
                }
            } else {
                plantillaToast('99', '01', null, 'warning');
                _validarPlanCuenta();
            }
        }
    )
}

function _validarTercero() {
    validarInputs(
        {
            form: "#nitTercero",
            orden: "1",
            event_f9: () => {
                var length = $_DATOS_VALES.length - 1,
                    tercero = length >= 0 ? $_DATOS_VALES[length].nitTercero : false;

                if (tercero) $("#nitTerceroInpt_104").val(tercero);

                _validarTercero();
            },
        },
        _validarPlanCuenta,
        function () {
            var nitTercero = $("#nitTerceroInpt_104").val();
            var validacion = buscarTercero_014(nitTercero);
            if (validacion) {
                $("#desCliente_104").val(validacion.NOMBRE.trim());
                $("#nitTerceroInpt_104").val(validacion.COD.trim());
                _validarDocumento();
            } else {
                plantillaToast("99", "01", null, "warning");
                _validarTercero();
            }
        }
    );
}

function _validarDocumento() {
    validarInputs(
        { form: '#documentoVale', orden: '1' },
        _validarTercero,
        function () {
            let documento = $('#documentoInpt').val();
            let nitTercero = $('#nitTerceroInpt_104').val();
            var itemActual = document.getElementById('itemVales').value;

            var tableInfo = Array.prototype.map.call(document.querySelectorAll('#items_tablaVales tr'), function (tr) {
                return Array.prototype.map.call(tr.querySelectorAll('td'), function (td) {
                    return td.innerHTML;
                });
            });
            var busqueda = tableInfo.find(e => e[0] == itemActual)
            var coincidencias = 0;
            if (!busqueda) {
                for (var i in tableInfo) {
                    var item = tableInfo[i][3];
                    if (item.toUpperCase() == documento.toUpperCase()) coincidencias++;
                }
            } else coincidencias = 0


            if (coincidencias > 0) {
                plantillaToast("99", "El documento ya se encuentra en la tabla", null, 'error');
                if ($_USUA_GLOBAL[0].NIT == 822007669) _validarDocumento();
                else _validarPopup();

            } else {
                let anio = $('#añoInicial').val() || ""
                let mes = $('#mesInicial').val() || ""
                let dia = $('#diaInicial').val() || ""

                let fecha =
                    anio.padStart(4, "0") +
                    mes.padStart(2, "0") +
                    dia.padStart(2, "0");

                let datos = {
                    datosh: datosEnvio(),
                    fecha,
                    cliente: nitTercero,
                    vale: documento.toUpperCase()
                }

                postData(datos, get_url("app/bombas/CON807B.DLL"))
                    .then(data => {
                        _validarPopup()
                    })
                    .catch(err => {
                        if ($_USUA_GLOBAL[0].NIT == 822007669) _validarDocumento();
                        else _validarPopup();
                    })
            }

        }
    )
}
function _validarPopup() {
    validarInputs(
        { form: "#validarPopup", orden: "1" },
        _validarDocumento,
        () => {
            var codCuenta = $("#codigoCuenta_104").val();
            codCuenta = codCuenta.substr(0, 6);

            var nit_usu = $_USUA_GLOBAL[0].NIT;
            var nit_cliente = parseFloat(document.getElementById('nitTerceroInpt_104').value);

            if (nit_usu == nit_cliente)
                $(".codArticuloVentana").removeAttr("required", true),
                    $(".cantidadVentana").removeAttr("required", true);
            else
                $(".codArticuloVentana").attr("required", true),
                    $(".cantidadVentana").attr("required", true);

            if (
                codCuenta == "130505" ||
                codCuenta == "110505" ||
                codCuenta == "111005" ||
                codCuenta == "112005" ||
                codCuenta == "134595"
            ) {
                setTimeout(on_validarPopup, 150);
            } else _validarItemVales({});
        }
    );
}

function on_validarPopup() {
    $('#modal_articulo').modal('show')
}

$('#modal_articulo').on('shown.bs.modal', function (e) {
    cantidadVentanaMask = new IMask(
        document.getElementById('cantidadVentana'),
        { mask: Number, min: 0, max: 9999, scale: 2, thousandsSeparator: ',', radix: '.' }
    );

    var item = cerosIzq($('#itemVales').val(), 3)
    var consulta = _consultarItemArray_vales(item);
    if (consulta) {

        cantidadVentanaMask.unmaskedValue = consulta.array.cantidad || "0";
        document.getElementById('codArticuloVentana').value = consulta.array.codProducto
        document.getElementById('descripArticuloVentana').value = consulta.array.descripProducto
        document.getElementById('placaVentana').value = consulta.array.placa
    }

    setTimeout(function () { validarArticuloPopup() }, 200);

    $('#codArticuloVentana').unbind()
    $('#codArticuloVentana').bind('keydown', function (e) {
        if (e.which == 119) {
            _ventanaDatos({
                titulo: "Ventana articulos",
                columnas: ["GRP", "NUMERO", "CLASE", "DESCRIP", "UNID", "VALOR", "REFER"],
                data: $_ARTICULOS_104,
                callback_esc: function () {
                    $('#codArticuloVentana').focus();
                },
                callback: function (data) {
                    let grp = data.GRP.trim()
                    let numero = data.NUMERO.trim()
                    let clase = data.CLASE.trim()
                    let codigo = grp + numero + clase
                    $('#codArticuloVentana').val(codigo).focus();
                    _enterInput('#codArticuloVentana');
                }
            });
        }
    })
})

$('#modal_articulo').on('hidden.bs.modal', function (e) {
    document.getElementById('codArticuloVentana').value = ''
    document.getElementById('descripArticuloVentana').value = ''
    document.getElementById('placaVentana').value = ''
    if (cantidadVentanaMask) {
        cantidadVentanaMask.destroy()
        cantidadVentanaMask = null
        document.getElementById('cantidadVentana').value = null
    }
})

function validarArticuloPopup() {
    validarInputs(
        { form: '#productoPopup', orden: '1' },
        function () {
            _validarPopup();
            $('#modal_articulo').modal('hide')
        },
        function () {
            var codProductoEl = $('#codArticuloVentana');
            var codProducto = codProductoEl.val();

            var validacion = $_ARTICULOS_104.find(el => {
                let llave = el.GRP.trim() + el.NUMERO.trim() + el.CLASE.trim()
                return llave == codProducto
            })

            if (!codProducto) {
                segundaFasePopup('1');
                $('#descripArticuloVentana').val('')
            } else if (validacion) {
                let code = validacion.GRP.trim() + validacion.NUMERO.trim() + validacion.CLASE.trim()
                codProductoEl.val(code);
                $('#descripArticuloVentana').val(validacion.DESCRIP)
                segundaFasePopup('1');
            } else {
                plantillaToast('99', '01', null, 'warning');
                validarArticuloPopup();
            }
        }
    )
}

function segundaFasePopup(orden) {
    validarInputs(
        { form: '#segundaFasePopup', orden: orden },
        validarArticuloPopup,
        function () {
            let codProducto = $('#codArticuloVentana').val();
            let descripProducto = $('#descripArticuloVentana').val();
            let placa = $('#placaVentana').val();

            var data = {
                codProducto,
                descripProducto,
                placa,
            };

            document.getElementById('codArticuloVentana').value = ''
            document.getElementById('descripArticuloVentana').value = ''
            document.getElementById('placaVentana').value = ''

            $('#modal_articulo').modal('hide')
            _validarItemVales(data);
        }
    )
}

function _validarItemVales(data) {
    data.codProducto = data.codProducto || "";
    data.descripProducto = data.descripProducto || "";
    data.placa = data.placa || "";

    var item = $("#itemVales").val();
    var codCuenta = $("#codigoCuenta_104").val();
    var nitTercero = $("#nitTerceroInpt_104").val();
    var descripcionTercero = $("#desCliente_104").val();
    var documento = $("#documentoInpt").val();
    var valorVale = valorValeMask.unmaskedValue;
    let cantidad = cantidadVentanaMask ? cantidadVentanaMask.unmaskedValue : "0";
    var consulta = _consultarItemArray_vales(item);

    if (consulta) {
        $_DATOS_VALES[consulta.index] = {
            item: item,
            codCuenta: codCuenta,
            nitTercero: nitTercero,
            documento: documento,
            valorVale: valorVale,
            codProducto: data.codProducto,
            descripProducto: data.descripProducto,
            cantidad: cantidad,
            placa: data.placa,
            descripcionTercero
        };
    } else {
        $_DATOS_VALES.push({
            item: item,
            codCuenta: codCuenta,
            nitTercero: nitTercero,
            documento: documento,
            valorVale: valorVale,
            codProducto: data.codProducto,
            descripProducto: data.descripProducto,
            cantidad: cantidad,
            placa: data.placa,
            descripcionTercero
        });
    }

    _modificarTablaVales();
    $("#itemVales").val("");
    _initBoxVales();
    _validacionSegundaTabla_104();
}

function _modificarTablaVales() {
    $('#tablaVales tbody').html('');
    var masked = IMask.createMask({ mask: Number, min: -999999999999, max: 999999999999, scale: 0, thousandsSeparator: ',', radix: '.' });
    var valorTotal = 0;
    for (var i in $_DATOS_VALES) {
        var valeTemp = $_DATOS_VALES[i].valorVale || '0';
        var maskedValue = masked.resolve(valeTemp.toString());
        valorTotal += parseFloat($_DATOS_VALES[i].valorVale);
        var documento = $_DATOS_VALES[i].documento

        $('#tablaVales tbody').append(''
            + '<tr>'
            + '   <td>' + $_DATOS_VALES[i].item + '</td>'
            + '   <td>' + $_DATOS_VALES[i].codCuenta + '</td>'
            + '   <td>' + $_DATOS_VALES[i].nitTercero + '</td>'
            + '   <td>' + documento.toUpperCase() + '</td>'
            + '   <td>' + masked.value + '</td>'
            + '</tr>'
        )
    }

    var maskedValue = masked.resolve(valorTotal.toString());
    $('#totalTablaVales').html(masked.value);
    valorCreditosMask.unmaskedValue = valorTotal.toString();
}

function _initBoxVales() {
    $('#codigoCuenta_104').val('');
    $('#desCuenta_104').val('');
    $('#nitTerceroInpt_104').val('');
    $('#desCliente_104').val('');
    $('#documentoInpt').val('');
    valorValeMask.unmaskedValue = '';
    if (cantidadVentanaMask) {
        cantidadVentanaMask.destroy();
        cantidadVentanaMask = null;
        document.getElementById('cantidadVentana').value = null
    }
}

function _llenarTabla(datos) {
    var filas_actual = $('#tablaVenta tbody tr').length
    var filas = datos.split(';');
    var filtro = filas.filter(e => e.trim())

    for (var i in filtro) {
        var contador = $('#tablaVenta tbody tr').length
        if (contador < 50) {
            $('#tablaVenta tbody').append(''
                + '<tr>'
                + ' <td class="index">' + filtro[i] + '</td>'
                + ' <td></td>'
                + ' <td></td>'
                + '</tr>'
            )
        }
    }

    var totalFilas = filtro.length + filas_actual
    if (totalFilas > 50) {
        plantillaToast('99', 'Máximo 50 surtidores en la tabla', null, 'warning');
    }
}

function _validarFinanciacion() {
    validarInputs(
        { form: '#validarFinanciacion', orden: '1' },
        _validacionSegundaTabla_104,
        function () {
            let valorDeuda = valorCreditosMask.unmaskedValue || 0;
            let valorVenta = valorCombustibleMask.unmaskedValue || 0;
            let valorFinanciacion = valorFinanciacionMask.unmaskedValue || 0;

            if (parseFloat(valorDeuda) > (parseFloat(valorVenta) + parseFloat(valorFinanciacion))) {
                plantillaToast('99', '07', null, 'warning');
                _validarFinanciacion();
            } else {
                setTimeout(_validarCheques, 100);
            }
        }
    )
}

function _validarCheques() {
    setTimeout(() => {
        validarInputs(
            { form: '#validarCheques', orden: '1' },
            _validarFinanciacion,
            function () {
                var valorDeuda = valorCreditosMask.unmaskedValue || 0;
                var valorVenta = valorCombustibleMask.unmaskedValue || 0;
                var valorFinanciacion = valorFinanciacionMask.unmaskedValue || 0;
                var valorCheque = valorChequesMask.unmaskedValue || 0;

                var temp = parseFloat(valorDeuda) - parseFloat(valorFinanciacion) + parseFloat(valorCheque);
                if (parseFloat(valorVenta) < parseFloat(temp)) {
                    plantillaToast('99', '07', null, 'warning');
                    _validarCheques();
                } else {
                    var totalEfectivo = parseFloat(valorVenta) + parseFloat(valorFinanciacion)
                        - parseFloat(valorDeuda) - parseFloat(valorCheque);

                    valorEfectivoMask.unmaskedValue = totalEfectivo.toString();
                    _validacionFinal_104();
                }
            }
        )
    }, 150);
}

function _validacionFinal_104() {
    console.log("llega")
    CON850_P(function (e) {
        console.log(e);
        if (e.id == 'S') {
            // _bajarDatos_104();
            _guardar_comprobante_104();
        } else {
            setTimeout(_validarCheques, 500)
        }
    }, {}
    )
}

function _guardar_comprobante_104() {
    loader('show')
    var data = {},
        posicion = 0,
        linea = '',
        item = '',
        surtidores_tmp = [],
        deudas_tmp = [];

    surtidores_tmp = JSON.parse(JSON.stringify($_DATOS_TABLA))

    if (surtidores_tmp.length < 1) surtidores_tmp = false;
    else {
        for (var i in surtidores_tmp) {
            let actualTmp = surtidores_tmp[i].numeroActual;
            let anteriorTmp = surtidores_tmp[i].valorAnterior;
            let cantidadTmp = parseFloat(actualTmp) - parseFloat(anteriorTmp);

            surtidores_tmp[i].galonaje = parseFloat(surtidores_tmp[i].galonaje).toFixed(3);
            surtidores_tmp[i].valorAnterior = parseFloat(surtidores_tmp[i].valorAnterior).toFixed(2);
            surtidores_tmp[i].numeroActual = parseFloat(surtidores_tmp[i].numeroActual).toFixed(2);

            // Calculos para almacenar los datos
            surtidores_tmp[i].valorUnit1 = parseFloat(surtidores_tmp[i].valorVenta)
            surtidores_tmp[i].valorUnit2 = parseFloat(surtidores_tmp[i].valorSobretasa)
            surtidores_tmp[i].valorUnit3 = parseFloat(surtidores_tmp[i].valorGlobal)

            let valor = parseFloat(surtidores_tmp[i].valorVenta) * parseFloat(cantidadTmp);
            surtidores_tmp[i].valor = valor.toFixed(0);

            let valorSobretasa = parseFloat(surtidores_tmp[i].valorSobretasa) * parseFloat(cantidadTmp);
            surtidores_tmp[i].valorSobretasa = valorSobretasa.toFixed(0);

            let valorGlobal = parseFloat(surtidores_tmp[i].valorGlobal) * parseFloat(cantidadTmp);
            surtidores_tmp[i].valorGlobal = valorGlobal.toFixed(0);

            item = surtidores_tmp[i];
            linea = item.itemSurtidor + "|"
                + item.codProducto + "|"
                + item.galonaje + "|"
                + item.valor + "|"
                + item.valorSobretasa + "|"
                + item.valorGlobal + "|"
                + item.valorAnterior + "|"
                + item.numeroActual + "|"
                + item.valorActual + "|"
                + item.valorUnit1 + "|"
                + item.valorUnit2 + "|"
                + item.valorUnit3 + "|";

            posicion++;
            data['TBL1-' + posicion.toString().padStart(3, '0')] = linea;
        }
    }

    deudas_tmp = JSON.parse(JSON.stringify($_DATOS_VALES))

    if (deudas_tmp.length < 1) deudas_tmp = false;
    else {
        posicion = 0, linea = '', item = '';
        for (var i in deudas_tmp) {
            deudas_tmp[i].valorVale = parseFloat(deudas_tmp[i].valorVale.replace(/\,/g, '')).toFixed(0);
            deudas_tmp[i].cantidad = parseFloat(deudas_tmp[i].cantidad).toFixed(2);

            let placa = deudas_tmp[i].placa || "";
            deudas_tmp[i].placa = placa.padEnd(6, " ");

            item = deudas_tmp[i];

            var validacionProducto = $_ARTICULOS_104.find(el => {
                let llave = el.GRP.trim() + el.NUMERO.trim() + el.CLASE.trim()
                return llave == item.codProducto
            })

            var llaveProducto = ''
            if (validacionProducto) {
                var grpProducto = validacionProducto.GRP.padEnd(2, ' ')
                var nroProducto = validacionProducto.NUMERO.padEnd(13, ' ')
                var claseProducto = validacionProducto.CLASE.padEnd(2, ' ')
                llaveProducto = grpProducto + nroProducto + claseProducto
            }

            linea = item.codCuenta + "|"
                + item.nitTercero + "|"
                + item.documento.toUpperCase() + "|"
                + item.valorVale + "|"
                + llaveProducto + "|"
                + item.cantidad + "|"
                + item.placa + "|"
                + item.descripcionTercero + "|"

            posicion++;
            data['TBL2-' + posicion.toString().padStart(3, '0')] = linea;
        }
    }

    let operador = localStorage.Usuario;
    let comprobante = $('#numComprobante').val();

    let anio = $('#añoInicial').val() || ""
    let mes = $('#mesInicial').val() || ""
    let dia = $('#diaInicial').val() || "";
    let fechaInicial = anio.padStart(4, "4") + mes.padStart(2, "0") + dia.padStart(2, "0");

    let turno = $('#numTurno').val();
    let detalle = $('#detalle').val();
    let vendedor = $('#vendedor_104').val();

    let valorFinanciacion = valorFinanciacionMask.unmaskedValue || 0;
    valorFinanciacion = parseFloat(valorFinanciacion).toFixed(0);
    valorFinanciacion = cerosIzq(valorFinanciacion, 12);

    let valorEfectivo = valorEfectivoMask.unmaskedValue || 0;
    valorEfectivo = parseFloat(valorEfectivo).toFixed(0);
    valorEfectivo = cerosIzq(valorEfectivo, 12);

    let valorCheques = valorChequesMask.unmaskedValue || 0;
    valorCheques = parseFloat(valorCheques).toFixed(0);
    valorCheques = cerosIzq(valorCheques, 12);

    var sucursal = document.getElementById("sucursal_104").value;

    var datos_envio = datosEnvio()
        + operador + '|'
        + cerosIzq(comprobante, 6) + '|'
        + fechaInicial + '|'
        + turno + '|'
        + detalle.padEnd(20, " ") + '|'
        + vendedor + '|'
        + valorFinanciacion + '|'
        + valorEfectivo + '|'
        + valorCheques + '|'
        + sucursal.padStart(2, '0') + "|";

    data.datosh = datos_envio;
    console.log('-> Datos envio', data)
    postData(data, get_url("app/bombas/BOM104_3.DLL"))
        .then(on_enviarDatos_020)
        .catch(err => {
            loader('hide')
            _validarCheques()
        })
}

function on_enviarDatos_020(data) {
    $_NRO_COMP_104 = data.trim().padStart(6, "0");
    let sucursal = document.getElementById("sucursal_104").value || "";

    let datos = {
        datosh: datosEnvio() + "S|",
        sucursal,
        planilla: $_NRO_COMP_104,
    };

    postData(datos, get_url("app/bombas/BOM020.DLL"))
        .then(on_segundaConsulta)
        .catch(err => {
            loader('hide')
            _validarCheques()
        })
}

function on_segundaConsulta(data) {
    if ($_USUA_GLOBAL[0].INVENT.trim() == 'S') {
        let sucursal = document.getElementById("sucursal_104").value || "";

        let datos = {
            datosh: datosEnvio(),
            sucursal,
            planilla: $_NRO_COMP_104,
        };

        postData(datos, get_url("app/bombas/BOM030.DLL"))
            .then(data => {
                loader('hide')
                CON850_P(function (e) {
                    if (e.id == 'S') {
                        _generarFactCombu()
                    } else {
                        _fin_104();
                    }
                }, {
                    msj: '00',
                    overlay_show: false
                })
            })
            .catch(err => {
                loader('hide')
                _validarCheques()
            })
    } else {
        _generarFactCombu();
    }
}

function _generarFactCombu() {
    let sucursal = document.getElementById("sucursal_104").value || "";
    let datos = {
        datosh: datosEnvio() + localStorage.Usuario + "|",
        sucursal,
        planilla: $_NRO_COMP_104,
    };

    postData(datos, get_url("app/bombas/BOMFACT.DLL"))
        .then((data) => {
            _popupImpresion();
        })
        .catch((err) => {
            loader("hide");
            _validarCheques();
        });
}

function _popupImpresion() {
    $('#abrirPopupBtn').click();
    setTimeout(function () { $('#formatoImpresion').select2('open') }, 500)
}

function validarFormato_104(e) {
    var seleccionado = $("#formatoImpresion").val();
    seleccionado = seleccionado ? seleccionado : "3";

    if (seleccionado != "3") {
        if (seleccionado == "1") $_FORMATO_104 = 'PDF';
        else if (seleccionado == "2") $_FORMATO_104 = 'CSV';

        $(this).attr('disabled', 'true');

        _validarPregunta_104();
    } else {
        $(this).attr('disabled', 'true');
        $('#closePopup').click();
        // _init_104();
        _fin_104();
    }
}

function _validarPregunta_104() {
    validarInputs(
        { form: '#preguntaImpresion', orden: '1' },
        habilitarFormato_104,
        function () {
            let detallado = espaciosIzq($('#detallado').val(), 1)
            let sucursal = document.getElementById("sucursal_104").value || "";

            let datos = {
                datosh: datosEnvio() + detallado + "|",
                sucursal,
                planilla: $_NRO_COMP_104,
            }
            // loader('show');
            postData(datos, get_url("app/bombas/BOM111.DLL"))
                .then(on_enviarDatos_104)
                .catch(err => {
                    $('#formatoImpresion').val(null).removeAttr('disabled').trigger('change');
                    loader('hide');
                    validarComprobante();
                });
        }
    )
}

function habilitarFormato_104() {
    $('#formatoImpresion').val(null).removeAttr('disabled').trigger('change');
    $('#formatoImpresion').select2('open')
}

function on_enviarDatos_104(data) {
    let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
    let nitEmpresa = $_USUA_GLOBAL[0].NIT.toString().trim();
    let comprobanteInicial = $_NRO_COMP_104;

    data.TOTALES.push(nombreEmpresa);
    data.TOTALES.push(nitEmpresa);
    data.TOTALES.push(comprobanteInicial);
    data.TOTALES.push($_USUA_GLOBAL[0].NIT.toString().padStart(10, "0"));

    var opcionesImpresiones = {
        datos: data,
        tipo: '',
        formato: 'bombas/bom109.formato.html',
        nombre: 'LISTADO-VENT-COMBUST-' + localStorage.Sesion
    };

    if ($_FORMATO_104 == 'PDF') {
        opcionesImpresiones.tipo = 'pdf';
        imprimir(opcionesImpresiones, on_finImpresion_104)
    } else if ($_FORMATO_104 == 'CSV') {
        opcionesImpresiones.tipo = 'csv';
        imprimir(opcionesImpresiones, on_finImpresion_104)
    }
}

function on_finImpresion_104() {
    loader('hide');
    $('#formatoImpresion').val(null).removeAttr('disabled').trigger('change');
    $('#closePopup').click();
    _fin_104();
}

function _fin_104() {
    loader('hide')

    $('#tablaVenta tbody').html('')
    $('#numComprobante').val('');
    $('#añoInicial').val('')
    $('#mesInicial').val('')
    $('#diaInicial').val('')
    $('#numTurno').val('')
    $('#detalle').val('')
    $('#vendedor_104').val('')
    $('#codProducto,#codItem,#descProducto').val('')
    $('#galonajeTablaVenta,#ventaTablaVenta').html('');

    numAnterior.unmaskedValue = '';
    numActual.unmaskedValue = '';
    valorActualMask.unmaskedValue = '';
    galonajeTotalMask.unmaskedValue = '';
    valorTotalMask.unmaskedValue = '';

    $('#tablaVales tbody').html('');
    $('#totalTablaVales').html('');

    valorCombustibleMask.unmaskedValue = '';
    valorFinanciacionMask.unmaskedValue = '';
    valorCreditosMask.unmaskedValue = '';
    valorChequesMask.unmaskedValue = '';
    valorEfectivoMask.unmaskedValue = '';

    $_DATOS_TABLA = [];
    $_DATOS_VALES = [];
    $_NRO_COMP_104 = null;

    jAlert({
        titulo: 'Guardado correctamente',
        mensaje: 'El comprobante ha sido guardado correctamente'
    }, function () {
        setTimeout(() => {
            _getSucursales_104();
        }, 500);
    });
}

function _consultarItemArray(item) {
    var retornar = false;

    for (var i in $_DATOS_TABLA) {
        if (item == $_DATOS_TABLA[i].itemSurtidor) {
            retornar = {
                index: i,
                array: $_DATOS_TABLA[i]
            }
        }
    }

    return retornar;
}

function _consultarItemArray_vales(item) {
    var retornar = false;

    for (var i in $_DATOS_VALES) {
        if (item == $_DATOS_VALES[i].item) {
            retornar = {
                index: i,
                array: $_DATOS_VALES[i]
            }
        }
    }

    return retornar;
}

function _siguienteFilaTabla(item) {
    var validacion = false;
    var items = $('#tablaVenta tbody tr');
    for (var i = 0; i < items.length; i++) {
        let elemento = $(items[i])
        let elementoIndex = $(elemento).find('td.index')
        let itemTabla = $(elementoIndex).html();
        if (itemTabla == item) {
            validacion = i + 1;
            if (items.length == validacion) validacion--;
        }
    }

    return validacion;
}

function buscarProducto_104(codigo) {
    var retornar = false;
    for (var i in $_ARTICULOS_104) {
        let code = $_ARTICULOS_104[i].GRP.trim().toLowerCase() + $_ARTICULOS_104[i].NUMERO.trim().toLowerCase();
        if (code.trim() == codigo.toLowerCase()) {
            retornar = $_ARTICULOS_104[i];
            break;
        }
    }

    return retornar;
}

function buscarVendedor_104(codigo) {
    var retornar = false;
    for (var i in $_VENDEDORES_104) {
        if ($_VENDEDORES_104[i].COD.trim().toLowerCase() == codigo.trim().toLowerCase()) {
            retornar = $_VENDEDORES_104[i];
            break;
        }
    }

    return retornar;
}

function buscarCuentaContable_104(codigo) {
    var retornar = false;
    for (var i in $_CUENTAS_104) {
        if ($_CUENTAS_104[i].CTA.trim().toLowerCase() == codigo.trim().toLowerCase()) {
            retornar = $_CUENTAS_104[i];
            break;
        }
    }

    return retornar;
}

function buscarTercero_014(codigo) {
    let nit = cerosIzq(codigo.trim(), 10);
    var retornar = false;
    for (var i in $_TERCEROS_104) {
        if ($_TERCEROS_104[i].COD.trim().toLowerCase() == nit.toLowerCase()) {
            retornar = $_TERCEROS_104[i];
            break;
        }
    }

    return retornar;
}