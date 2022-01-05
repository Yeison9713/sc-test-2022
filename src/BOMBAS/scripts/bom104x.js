// import { globalAgent } from "https";

// import { parse } from "semver";

var $_104x = {
    SURTIDORES: null,
    VALES: null,
    INFO_COMP: null,
    DATOS_TABLA: [],
    VALORES_TEMP: null
}

var valorVentaMask = new IMask(
    document.getElementById('valorVentaMask'),
    { mask: Number, min: -9999999999, max: 9999999999, scale: 2, thousandsSeparator: ',', radix: '.' }
);

var valorSobretasaMask = new IMask(
    document.getElementById('valorSobretasaMask'),
    { mask: Number, min: -9999999999, max: 9999999999, scale: 2, thousandsSeparator: ',', radix: '.' }
);

var valorGlobalMask = new IMask(
    document.getElementById('valorGlobalMask'),
    { mask: Number, min: -9999999999, max: 9999999999, scale: 2, thousandsSeparator: ',', radix: '.' }
);

var galonajeTotalMask = new IMask(
    document.getElementById('galonajeTotal'),
    { mask: Number, min: -9999999999, max: 9999999999, scale: 3, thousandsSeparator: ',', radix: '.' }
);

// var valorTotalMask = new IMask(
//     document.getElementById('valorTotal'),
//     { mask: Number, min: -9999999999, max: 999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
// );

$(document).ready(function () {
    _inputControl('reset');
    _inputControl('disabled');
    _validarComprobante_104x();
})

function _validarComprobante_104x() {
    $('#tablaVenta tbody').html('');

    validarInputs(
        { form: '#validarComprobante_104x', orden: '1' },
        _toggleNav,
        function () {
            loader('show');
            var comprobante = $('#numComprobante_104x').val() || '0';

            $('#numComprobante_104x').val(comprobante.padStart(6, "0"));

            var datos_envio = datosEnvio();
            datos_envio += comprobante.padStart(6, "0");
            postData({ datosh: datos_envio }, get_url("app/bombas/BOM105.DLL"))
                .then(data => {
                    $_104x.SURTIDORES = data['SURTIDORES'];
                    $_104x.SURTIDORES.map(e => {
                        e.CANTID = e.CANTID.replace(/\,/g, '');
                    })

                    $_104x.SURTIDORES.pop();
                    $_104x.VALES = data['TBLA-DEUD'];
                    $_104x.INFO_COMP = data.TOTALES;
                    loader('hide')
                    _llenarDatos_104x();
                }).catch(err => {
                    loader('hide')
                    _validarComprobante_104x()
                })
        }
    )
}

function _llenarDatos_104x() {
    var datos = $_104x.INFO_COMP;

    let fecha = datos['1'].trim();
    let año = fecha.substr(0, 2);
    $('#añoInicial_104x').val(año);

    let mes = fecha.substr(2, 2);
    $('#mesInicial_104x').val(mes);

    let dia = fecha.substr(4, 6);
    $('#diaInicial_104x').val(dia);

    let turno = datos['2'].trim();
    $('#turno_104x').val(turno);

    let detalle = datos['3'].trim();
    $('#detalle_104x').val(detalle);

    let vendedor = datos['12'].trim();
    $('#vendedor_104x').val(vendedor)

    // _validarComprobante_104x();

    if (detalle != 'ANULADO') _llenarTablaSurtidores_104x();
}

function _llenarTablaSurtidores_104x() {
    var surtidores = $_104x.SURTIDORES;

    for (var i in surtidores) {
        let item = surtidores[i].SURTI.trim() || false;
        if (item) {
            $('#tablaVenta tbody').append(''
                + '<tr data-anterior="' + surtidores[i]['NUM-ANT'] + '">'
                + ' <td class="index">' + item + '</td>'
                + ' <td>' + surtidores[i].CANTID.trim() + '</td>'
                + ' <td>' + surtidores[i].VALOR.trim() + '</td>'
                + '</tr>'
            )

            let galonaje = parseFloat(surtidores[i].CANTID.trim() || "0");
            let numAnt = surtidores[i]['NUM-ANT'].trim() || "0";
            let numeroAnterior = parseFloat(numAnt.replace(/\,/g, ''));
            let numeroActual = parseFloat(galonaje) + parseFloat(numeroAnterior);

            // let sobretasa = parseFloat(surtidores[i]['SOBRETA'].trim() || "0");
            // let global = parseFloat(surtidores[i]['GLB-SOBRETA'].trim() || "0");
            let venta = surtidores[i].VALOR.trim().replace(/\,/g, '') || "0";
            // let valor = parseFloat(venta) - parseFloat(sobretasa) - parseFloat(global);


            $_104x.DATOS_TABLA.push({
                itemSurtidor: item,
                galonaje: surtidores[i].CANTID.trim().replace(/\,/g, '') || "0",
                valor: venta,
                codProducto: surtidores[i].ARTICU.trim(),
                descrProducto: "0",
                valorGlobal: surtidores[i]['GLB-SOBRETA'].trim() || "0",
                valorSobretasa: surtidores[i].SOBRETA.trim() || "0",
                valorVenta: surtidores[i]['VLR-VENT-ART'].trim() || "0",
                valorAnterior: numAnt.replace(/\,/g, ''),
                numeroActual: numeroActual,
                valorActual: "0",
                pesosSurti: "0",
                numeroAnterior: numAnt.replace(/\,/g, '')
            })
        }
    }

    _validacionTabla_104x('0')
}

function _validacionTabla_104x(orden) {
    validarTabla(
        {
            tabla: '#tablaVenta',
            orden: orden,
            event_f3: _validacionFinal
        },
        seleccion_104x,
        _finTabla_104x,
        _validacionFinal
    );
}

function seleccion_104x(datos) {
    var element = $(datos).find('td.index')
    var surtidor = $(element).html();
    var valorAnterior = $(datos).data().anterior;

    galonajeTotalMask.unmaskedValue = '';
    // valorTotalMask.unmaskedValue = '';

    var consulta = _consultarItemArray_104x(surtidor);
    if (consulta && consulta.array.valorAnterior != 0) {
        $('#codItem').val(consulta.array.itemSurtidor)
        $('#codProducto').val(consulta.array.codProducto)
        $('#descProducto').val(consulta.array.descrProducto)

        // numAnterior.unmaskedValue = consulta.array.valorAnterior;
        // numActual.unmaskedValue = consulta.array.numeroActual.toString();
        let valorCombu = parseFloat(consulta.array.valor) - parseFloat(consulta.array.valorSobretasa) - parseFloat(consulta.array.valorGlobal);
        galonajeTotalMask.unmaskedValue = consulta.array.galonaje.toString();
        valorVentaMask.unmaskedValue = valorCombu.toFixed(0);
        valorSobretasaMask.unmaskedValue = consulta.array.valorSobretasa.toString();
        valorGlobalMask.unmaskedValue = consulta.array.valorGlobal.trim() || "0";

        $_104x.VALORES_TEMP = {
            item: consulta.array.itemSurtidor,
            pesosSurti: consulta.array.pesosSurti,
            valorVenta: consulta.array.valorVenta,
            valorSobretasa: consulta.array.valorSobretasa,
            valorGlobal: consulta.array.valorGlobal,
            codProducto: consulta.array.codProducto,
            descrProducto: consulta.array.descrProducto,
            numeroAnterior: consulta.array.valorAnterior,
            numeroActual: consulta.array.numeroActual
        }

        _valorVenta_104x();

        // _numeroActual_104e();
    }
}

function _validacionFinal() {
    CON850_P(function (e) {
        if (e.id == 'S') {
            _bajarDatos_104x();
        } else {
            setTimeout(function () {
                _validacionTabla_104x('0')
            }, 500)
        }
    }, {}
    )
}

function _bajarDatos_104x() {
    var datos_envio = {}, posicion = 0;
    datos_envio.datosh = datosEnvio() + cerosIzq(document.getElementById('numComprobante_104x').value, 6) + "|";
    for (var i in $_104x.DATOS_TABLA) {
        var item = $_104x.DATOS_TABLA[i];

        let galonaje = parseFloat(item.galonaje).toFixed(3).replace(/\./g, '');
        galonaje = cerosIzq(galonaje, 15);

        let valorAnterior = parseFloat(item.valorAnterior).toFixed(3).replace(/\./g, '');
        valorAnterior = cerosIzq(valorAnterior, 15);

        let numeroActual = parseFloat(item.numeroActual).toFixed(3).replace(/\./g, '');
        numeroActual = cerosIzq(numeroActual, 15);

        var valorCombu = parseFloat(item.valorVenta) * parseFloat(item.galonaje);
        valorCombu = valorCombu.toFixed(0);

        var linea = item.itemSurtidor +
            "|" + item.codProducto +
            "|" + galonaje +
            "|" + valorCombu +
            "|" + parseFloat(item.valorSobretasa).toFixed(0).replace(/\./g, '') +
            "|" + parseFloat(item.valorGlobal).toFixed(0).replace(/\./g, '') +
            "|" + valorAnterior +
            "|" + numeroActual + "|";

        posicion++;
        datos_envio['LIN-' + posicion.toString().padStart(3, "0")] = linea;
    }

    postData(datos_envio, get_url("app/BOMBAS/BOM104X.DLL"))
        .then(data => {
            postData(datos_envio, get_url("app/BOMBAS/BOM020.DLL"))
                .then(on_segundaConsulta_104x)
                .catch(err => {
                    loader('hide')
                    _validacionTabla_104x('0')
                })
        })
        .catch(err => {
            plantillaError("Error", "Ocurrio un error al grabar comprobante", "BOM104X", () => {
                _validacionTabla_104x('0')
            });
        })
}

function on_segundaConsulta_104x(data) {
    if ($_USUA_GLOBAL[0].INVENT.trim() == 'S') {
        let comprobante = $('#numComprobante_104x').val();
        var datos_envio = datosEnvio() + cerosIzq(comprobante, 6) + '|';
        postData({datosh: datos_envio}, get_url("app/BOMBAS/BOM030.DLL"))
            .then(data => {
                jAlert({
                    titulo: 'Guardado correctamente',
                    mensaje: 'El comprobante ha sido guardado correctamente'
                }, _finTabla_104x);
            }).catch(err => {
                loader('hide')
                _validacionTabla_104x('0');
            })
    } else {
        _finTabla_104x();
    }
}

function _finTabla_104x() {
    $('#tablaVenta tbody').html('');
    document.getElementById('galonajeTablaVenta').innerHTML = '';
    document.getElementById('ventaTablaVenta').innerHTML = '';

    galonajeTotalMask.unmaskedValue = '';
    valorVentaMask.unmaskedValue = '';
    valorSobretasaMask.unmaskedValue = '';
    valorGlobalMask.unmaskedValue = '';

    $_104x = {
        SURTIDORES: null,
        VALES: null,
        INFO_COMP: null,
        DATOS_TABLA: [],
        VALORES_TEMP: null
    };

    _inputControl('disabled');
    _inputControl('reset');
    _validarComprobante_104x();

}

function _valorVenta_104x() {
    validarInputs(
        { form: '#validarValorVenta', orden: '1' },
        function () {
            var item = $('#codItem').val()
            var indxTabla = _siguienteFilaTabla_104x(item - 1);
            _validacionTabla_104x(indxTabla)
        },
        () => {
            _valorSobretasa_104x()
        }
    )
}

function _valorSobretasa_104x() {
    validarInputs(
        { form: '#validarSobretasa', orden: '1' },
        _valorVenta_104x,
        _valorGlobal_104x
    )
}

function _valorGlobal_104x() {
    validarInputs(
        { form: "#validarSobretasaGlobal", orden: '1' },
        _valorSobretasa_104x,
        () => {
            var valorCombu = parseFloat(valorVentaMask.unmaskedValue);
            var sobretasa = parseFloat(valorSobretasaMask.unmaskedValue);
            var global = parseFloat(valorGlobalMask.unmaskedValue);
            var valorTotal = valorCombu + sobretasa + global;
            var vlrVenta = valorCombu / parseFloat(galonajeTotalMask.unmaskedValue);
            var item = JSON.parse(JSON.stringify($_104x.VALORES_TEMP));
            var surtidor = item.item;

            var consulta = _consultarItemArray_104x(surtidor);
            if (consulta) {
                $_104x.DATOS_TABLA[consulta.index] = {
                    itemSurtidor: surtidor,
                    galonaje: parseFloat(galonajeTotalMask.unmaskedValue).toFixed(2),
                    valor: valorTotal.toFixed(0),
                    codProducto: item.codProducto,
                    descrProducto: item.descrProducto,
                    valorGlobal: parseFloat(valorGlobalMask.unmaskedValue).toFixed(0),
                    valorSobretasa: parseFloat(valorSobretasaMask.unmaskedValue).toFixed(0),
                    valorVenta: vlrVenta.toFixed(2),
                    valorAnterior: item.numeroAnterior,
                    numeroActual: item.numeroActual,
                    pesosSurti: item.pesosSurti
                }
                var indxTabla = _siguienteFilaTabla_104x(surtidor);
                _validacionTabla_104x(indxTabla)
                _emptyInputs();
                _modificarTabla();
            } else {
                jAlert({
                    titulo: 'Error',
                    mensaje: 'No se encontro surtidor'
                }, function () {
                    _valorGlobal_104x()
                });
            }
        }
    )
}

function _emptyInputs() {
    $_104x.VALORES_TEMP = [];
    document.getElementById("codItem").value = "";
    document.getElementById("codProducto").value = "";
    document.getElementById("descProducto").value = "";
    galonajeTotalMask.unmaskedValue = '';
    valorVentaMask.unmaskedValue = '';
    valorSobretasaMask.unmaskedValue = '';
    valorGlobalMask.unmaskedValue = '';
}

function _modificarTabla() {
    var items = $('#tablaVenta tbody tr');
    var totalGalonaje = 0, totalValor = 0;
    var masked = IMask.createMask({ mask: Number, min: 0, max: 999999999, scale: 2, thousandsSeparator: ',', radix: '.' });
    var masked2 = IMask.createMask({ mask: Number, min: 0, max: 999999999, scale: 0, thousandsSeparator: ',', radix: '.' });

    for (var i = 0; i < items.length; i++) {
        let elemento = $(items[i])
        var columnas = $(elemento).find('td');
        let elementoIndex = $(elemento).find('td.index')
        let itemTabla = $(elementoIndex).html();

        for (var j in $_104x.DATOS_TABLA) {
            if ($_104x.DATOS_TABLA[j].itemSurtidor == itemTabla) {
                if ($_104x.DATOS_TABLA[j].estado == 0) {
                    $(columnas[1]).html('');
                    $(columnas[2]).html('');
                    $_104x.DATOS_TABLA.splice(j, 1);
                } else {
                    totalGalonaje += parseFloat($_104x.DATOS_TABLA[j].galonaje);
                    totalValor = parseFloat(totalValor) + parseFloat($_104x.DATOS_TABLA[j].valor);
                    totalValor = parseFloat(totalValor).toFixed(0);

                    var maskedValue = masked.resolve($_104x.DATOS_TABLA[j].galonaje.toString());
                    $(columnas[1]).html(masked.value);
                    var maskedValue = masked2.resolve($_104x.DATOS_TABLA[j].valor.toString());
                    $(columnas[2]).html(masked2.value);
                }
            }
        }
    }

    var maskedValue = masked.resolve(totalGalonaje.toFixed(1));
    $('#galonajeTablaVenta').html(masked.value);
    var maskedValue = masked2.resolve(totalValor.toString());
    $('#ventaTablaVenta').html(masked2.value);
    // valorCombustibleMask.unmaskedValue = totalValor.toString();
}

function _consultarItemArray_104x(item) {
    var retornar = false;

    for (var i in $_104x.DATOS_TABLA) {
        if (item == $_104x.DATOS_TABLA[i].itemSurtidor) {
            retornar = {
                index: i,
                array: $_104x.DATOS_TABLA[i]
            }
        }
    }

    return retornar;
}

function _siguienteFilaTabla_104x(item) {
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