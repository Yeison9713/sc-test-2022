var $_SURTIDORES_104E,
    $_VALES_104E,
    $_INFO_COMP_104E,
    $_VALORES_TMP_104E,
    $_VENDEDORES_104E,
    $_CUENTAS_104E,
    $_TERCEROS_104E,
    $_ARTICULOS_104E,
    $_DATOS_TABLA_104E = [],
    $_DATOS_VALES_104E = [],
    $_DIALOGO,
    $_OP_PRINT = false,
    $_SUCURSALES_104e = [],
    $_FORMATO_104e;

const { ventanaFiltro } = require("../../BOMBAS/scripts/ventanaFiltroComp.js");

var $_ANULADO = false

var numAnterior = new IMask(
    document.getElementById('numAnter_104e'),
    { mask: Number, min: -999999999999, max: 999999999999, scale: 3, thousandsSeparator: ',', radix: '.' }
);

var numActual = new IMask(
    document.getElementById('numActual_104e'),
    { mask: Number, min: -999999999999, max: 999999999999, scale: 3, thousandsSeparator: ',', radix: '.' }
);

var valorActualMask = new IMask(
    document.getElementById('valorActual_104e'),
    { mask: Number, min: -999999999999, max: 999999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var galonajeTotalMask = new IMask(
    document.getElementById('galonajeTotal_104e'),
    { mask: Number, min: -999999999999, max: 999999999999, scale: 3, thousandsSeparator: ',', radix: '.' }
);

var valorTotalMask = new IMask(
    document.getElementById('valorTotal_104e'),
    { mask: Number, min: -999999999999, max: 999999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var valorValeMask = new IMask(
    document.getElementById('valorVale_104e'),
    { mask: Number, min: -999999999999, max: 999999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var valorCombustibleMask = new IMask(
    document.getElementById('totalCombustible_104e'),
    { mask: Number, min: -999999999999, max: 999999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var valorCreditosMask = new IMask(
    document.getElementById('totalCreditos_104e'),
    { mask: Number, min: -999999999999, max: 999999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var valorFinanciacionMask = new IMask(
    document.getElementById('totalFinanciacion_104e'),
    { mask: Number, min: -999999999999, max: 999999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var valorChequesMask = new IMask(
    document.getElementById('totalCheques_104e'),
    { mask: Number, min: -999999999999, max: 999999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var valorEfectivoMask = new IMask(
    document.getElementById('totalEfectivo_104e'),
    { mask: Number, min: -999999999999, max: 999999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);

var valorVentaMask = null;
var valorSobreMask = null;

var cantidadVentanaMask;

$(document).ready(function () {
    _inputControl('reset');
    _inputControl('disabled');
    _crearJsonVendedores_104e();
    loader('show');
    $('#formatoImpresion_104e').select2().on('select2:close', validarFormato_104e);

    _toggleF8([
        { input: 'numComprobante', app: '104e', funct: _ventanaComp },
        { input: 'vendedor', app: '104e', funct: _ventanaVendedores },
        { input: 'codigoCuenta', app: '104e', funct: _ventanaCuentas_104e },
        { input: 'nitTerceroInpt', app: '104e', funct: _ventanaTerceros_104e }
    ]);
});

$(document).on('keydown', '#itemVales_104e', function (e) {
    if (e.which == 114) {
        $(this).attr('disabled', 'true');
        _validarFinanciacion_104e();
        set_Event_validar('#itemSegundaTabla_104e', 'off');
    }
})

// $(document).on('click', '#vendedorBtn', _ventanaVendedores);
// $(document).on('keydown', '#vendedor', _ventanaVendedores);

function _ventanaVendedores(e) {
    if (
        e.type == "keydown" && e.which == 119
        || e.type == 'click'
    ) {
        _ventanaDatos({
            titulo: 'Busqueda VENDEDORES',
            columnas: ["COD", "NOMBRE", "NIT"],
            data: $_VENDEDORES_104E,
            callback_esc: function () {
                $('#vendedor_104e').focus();
            },
            callback: function (data) {
                $('#vendedor_104e').val(data.COD.trim());
                _enterInput('#vendedor_104e');
            }
        });
    }
};

function _ventanaCuentas_104e(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Busqueda CUENTA',
            columnas: ["CTA", "DESCRIP", "TIPO"],
            data: $_CUENTAS_104E,
            callback_esc: function () {
                $('#codigoCuenta_104e').focus();
            },
            callback: function (data) {
                $('#codigoCuenta_104e').val(data.CTA.trim());
                _enterInput('#codigoCuenta_104e');
            }
        });
    }
}

function _ventanaTerceros_104e(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos_lite_v2({
            titulo: 'Busqueda terceros',
            data: $_TERCEROS_104E,
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
                $('#nitTerceroInpt_104e').focus();
            },
            callback: function (data) {
                $('#nitTerceroInpt_104e').val(data.COD.trim().replace(/\,/g, ''));
                _enterInput('#nitTerceroInpt_104e');
            }
        });
    }
}

function _crearJsonVendedores_104e() {
    postData({ datosh: datosEnvio() }, get_url("app/bombas/CON805.DLL"))
        .then(data => {
            $_VENDEDORES_104E = data.VENDEDORES;
            _crearJsonCuentas_104e();
        }).catch(err => {
            loader('hide');
            _toggleNav();
        })
}

function _crearJsonCuentas_104e() {
    postData({ datosh: datosEnvio() }, get_url("app/bombas/CON801.DLL"))
        .then(data => {
            $_CUENTAS_104E = data.CUENTAS;
            _crearJsonArticulos_104e();
        }).catch(err => {
            loader('hide');
            _toggleNav();
        })
}

function _crearJsonArticulos_104e() {
    postData({ datosh: datosEnvio() }, get_url("app/bombas/INV803.DLL"))
        .then(data => {
            $_ARTICULOS_104E = data.Articulos;
            _crearJsonTerceros_104e();
        }).catch(err => {
            loader('hide');
            _toggleNav();
        })
}

function _crearJsonTerceros_104e() {
    postData({ datosh: datosEnvio() }, get_url("app/bombas/CON802.DLL"))
        .then(data => {
            $_TERCEROS_104E = data.TERCEROS;
            _solicitarAcceso_104e();
        }).catch(err => {
            loader('hide');
            _toggleNav();
        })
}

function _solicitarAcceso_104e() {
    loader('hide');
    var psw = $_USUA_GLOBAL[0].CLAVE_2.trim();
    var fuente = ''
        + '<div style="width: 100%; height: 100%;text-align: center;">'
        + ' <input id="pwdAcceso" type="password" style="outline: none;padding: 5px 12px;box-sizing: border-box;" autofocus/>'
        + '</div>';

    jAlert({
        titulo: 'Clave de bloqueo',
        mensaje: fuente,
        autoclose: false,
        btnCancel: true
    }, function () {
        // Evento aceptar
        let pwdIn = $('#pwdAcceso').val();
        if (pwdIn == psw) {
            jAlert_close();
            // _init_104e();
            setTimeout(() => {
                _getSucursales_104e();
            }, 500);
        } else {
            // setTimeout(function () {
            $('#pwdAcceso').val('').focus();
            // }, 500);
            plantillaToast("99", "Clave de acceso inválida", null, 'error');
        }
    }, function () {
        // Evento cancelar
        jAlert_close();
        _toggleNav();
    });
}

function _getSucursales_104e() {
    postData({ datosh: datosEnvio() }, get_url("app/contab/CON823.DLL"))
        .then(res => {
            let array = [];
            res.SUCURSAL.forEach(element => {
                array.push({ cod: element.CODIGO, descripcion: element.DESCRIPCION })
            });

            $_SUCURSALES_104e = array;
            _vetanaSucursales_104e(array);
        })
        .catch(err => {
            console.log(err);
            _toggleNav()
        })
}

function _vetanaSucursales_104e(data) {
    _ventanaDatos({
        titulo: 'Busqueda sucursales',
        columnas: ["cod", "descripcion"],
        data,
        callback_esc: _toggleNav,
        callback: (data) => {
            document.getElementById("sucursal_104e").value = data.cod;
            document.getElementById("sucursalNom_104e").value = data.descripcion;
            _init_104e();
        }
    });
}

function _reset_104e() {
    $('#tablaVenta tbody').html('');
    $('#tablaVales_104e tbody').html('');

    $('#galonajeTablaVenta').html('');
    $('#ventaTablaVenta').html('');
    $('#totalTablaVales').html('');
    $_SURTIDORES_104E = '';
    $_VALES_104E = '';
    $_INFO_COMP_104E = '';
    $_VALORES_TMP_104E = '';
    // $_VENDEDORES_104E = '';
    // $_CUENTAS_104E = '';
    // $_TERCEROS_104E = '';
    // $_ARTICULOS_104E = '';
    $_DATOS_TABLA_104E = [];
    $_DATOS_VALES_104E = [];
    $_DIALOGO = '';
    $_OP_PRINT = false;
    $_FORMATO_104e = '';
    numAnterior.unmaskedValue = '';
    numActual.unmaskedValue = '';
    valorActualMask.unmaskedValue = '';
    galonajeTotalMask.unmaskedValue = '';
    valorTotalMask.unmaskedValue = '';
    valorValeMask.unmaskedValue = '';
    valorCombustibleMask.unmaskedValue = '';
    valorCreditosMask.unmaskedValue = '';
    valorFinanciacionMask.unmaskedValue = '';
    valorChequesMask.unmaskedValue = '';
    valorEfectivoMask.unmaskedValue = '';

    $('#añoInicial_104e,'
        + '#mesInicial_104e,'
        + '#diaInicial_104e,'
        + '#primeraIslaInpt_104e,'
        + '#segundaIslaInpt_104e,'
        + '#terceraIslaInpt_104e,'
        + '#detalle_104e,'
        + '#vendedor_104e,'
        + '#turno_104e').val('');

    $_ANULADO = false
}

function _init_104e() {
    $('#tablaVenta tbody').html('');
    $('#tablaVales_104e tbody').html('');

    $('#galonajeTablaVenta').html('');
    $('#ventaTablaVenta').html('');
    $('#totalTablaVales').html('');

    $_ANULADO = false

    _validarComprobante_104e();
}

function _ventanaComp(e) {
    if (e.type == "keydown" && e.which == 119) {
        $("#numComprobante_104e").attr("disabled", "true");
        set_Event_validar("#validarComprobante_104e", "off");

        ventanaFiltro(
            {
                callback: _terminarVentanaFiltro,
                vendedores: JSON.parse(JSON.stringify($_VENDEDORES_104E))
            },
        );
    }
}

function _terminarVentanaFiltro(data) {
    let consulta = $_SUCURSALES_104e.find(e => e.cod = data.suc);

    if (consulta) {
        document.getElementById("sucursal_104e").value = consulta.cod;
        document.getElementById("sucursalNom_104e").value = consulta.descripcion;
        document.getElementById("numComprobante_104e").value = data.nro || "";
    }

    _validarComprobante_104e();
}

function _validarComprobante_104e() {
    validarInputs(
        {
            form: '#validarComprobante_104e',
            orden: '1'
        },
        _toggleNav,
        function () {
            let sucursal = document.getElementById("sucursal_104e").value || "";
            let planilla = document.getElementById("numComprobante_104e").value || "";

            let datos = {
                datosh: datosEnvio(),
                sucursal,
                planilla
            }

            postData(datos, get_url("app/bombas/BOM105.DLL"))
                .then(data => {
                    _reset_104e()
                    $_SURTIDORES_104E = data['SURTIDORES'];
                    $_SURTIDORES_104E.map(e => {
                        e.CANTID = e.CANTID.replace(/\,/g, '');
                    })
                    $_VALES_104E = data['TBLA-DEUD'];
                    $_INFO_COMP_104E = data.TOTALES;
                    _llenarDatos_104e();
                }).catch(err => {
                    _validarComprobante_104e();
                })
        }
    )
}

function _llenarDatos_104e() {
    var datos = $_INFO_COMP_104E;
    let detalle = datos['3'].trim();

    $_ANULADO = detalle == 'ANULADO'

    let fecha = null

    if ($_ANULADO) fecha = datos['14'].trim();
    else fecha = datos['1'].trim();

    let año = fecha.substring(0, 4);
    $('#añoInicial_104e').val(año);

    let mes = fecha.substring(4, 6);
    $('#mesInicial_104e').val(mes);

    let dia = fecha.substring(6, 8);
    $('#diaInicial_104e').val(dia);

    let turno = datos['2'].trim();
    $('#turno_104e').val(turno);

    $('#detalle_104e').val(detalle);

    let vendedor = datos['12'].trim();
    $('#vendedor_104e').val(vendedor)

    let totalGalonaje = datos['6'].trim();
    $('#galonajeTablaVenta').html(totalGalonaje);

    let totalVenta = datos['7'].trim();
    $('#ventaTablaVenta').html(totalVenta);

    let valorCombustible = parseFloat(totalVenta.replace(/\,/g, '')).toFixed(0);
    valorCombustibleMask.unmaskedValue = valorCombustible.toString();

    let totalFinanciacion = parseFloat(datos['8'].trim().replace(/\,/g, '').replace(/\ /g, '')).toFixed(0);
    valorFinanciacionMask.unmaskedValue = totalFinanciacion
    // $('#totalFinanciacion').val(totalFinanciacion);

    let totalVales = datos['9'].trim();

    $('#totalTablaVales').html(totalVales);
    totalVales = parseFloat(totalVales.replace(/\,/g, '').replace(/\ /g, '')).toFixed(0);
    // console.log(totalVales,datos[9].trim().replace(/\,/g, ''))
    valorCreditosMask.unmaskedValue = totalVales;

    let totalCheques = parseFloat(datos['10'].trim().replace(/\,/g, '').replace(/\ /g, '')).toFixed(0);
    valorChequesMask.unmaskedValue = totalCheques.toString();
    // $('#totalCheques').val(totalCheques);

    let totalEfectivo = datos['11'].trim();
    totalEfectivo = parseFloat(totalEfectivo.replace(/\,/g, '').replace(/\ /g, '')).toFixed(0);
    valorEfectivoMask.unmaskedValue = totalEfectivo;

    let sw_fact = datos[16] || "N"

    if (sw_fact == "N") {
        on_validar_llenado()
    } else {
        jAlert(
            {
                titulo: "Advertencia",
                mensaje:
                    "El comprobante ya fue facturado y expedido en la Dian, no se podra modificar.",
            },
            function () {
                on_validar_llenado()
            }
        );
    }
}

function on_validar_llenado() {
    if (!$_ANULADO) _llenarTablaSurtidores_104e();
    else {
        var usuario = localStorage.Usuario;
        if (usuario == "ADMI" || usuario == "GEBC") {
            _validar_anio_104e()
        } else {
            _validarComprobante_104e();
        }
    }
}


function _llenarTablaSurtidores_104e() {
    for (var i in $_SURTIDORES_104E) {
        let item = $_SURTIDORES_104E[i].SURTI.trim() || false;
        if (item) {
            $('#tablaVenta tbody').append(''
                + '<tr data-anterior="' + $_SURTIDORES_104E[i]['NUM-ANT'] + '">'
                + ' <td class="index">' + item + '</td>'
                + ' <td>' + $_SURTIDORES_104E[i].CANTID.trim() + '</td>'
                + ' <td>' + $_SURTIDORES_104E[i].VALOR.trim() + '</td>'
                + '</tr>'
            )

            let galonaje = parseFloat($_SURTIDORES_104E[i].CANTID.trim().replace(/\,/g, '') || "0");
            let numAnt = $_SURTIDORES_104E[i]['NUM-ANT'].trim() || "0";
            let numeroAnterior = parseFloat(numAnt.replace(/\,/g, ''));
            // let numeroActual = parseFloat(numeroAnterior) + parseFloat(galonaje);
            // let numeroActual = $_SURTIDORES_104E[i]['NUM-ACT'].trim() || "0";
            // numeroActual = parseFloat(numeroActual.replace(/\,/g, ''));
            let numeroActual = (numeroAnterior + galonaje).toFixed(3);

            // console.log($_SURTIDORES_104E, numeroAnterior, galonaje, numeroActual)

            $_DATOS_TABLA_104E.push({
                itemSurtidor: item,
                galonaje: $_SURTIDORES_104E[i].CANTID.trim().replace(/\,/g, '') || "0",
                valor: $_SURTIDORES_104E[i].VALOR.trim().replace(/\,/g, '') || "0",
                codProducto: $_SURTIDORES_104E[i].ARTICU.trim(),
                descrProducto: "0",
                valorGlobal: $_SURTIDORES_104E[i]['VLR-VENT-GLB'].trim() || "0",
                valorSobretasa: $_SURTIDORES_104E[i]['VLR-VENT-SOB'].trim() || "0",
                valorVenta: $_SURTIDORES_104E[i]['VLR-VENT-ART'].trim() || "0",
                valorAnterior: numAnt.replace(/\,/g, ''),
                numeroActual: parseFloat(numeroActual),
                valorActual: "0",
                pesosSurti: "0"
            })
        }
    }

    _llenarTablaVales_104e();
}

function _llenarTablaVales_104e() {
    let item = 0;
    for (var i in $_VALES_104E) {
        if ($_VALES_104E[i].COD.trim().length > 0) {
            item++;
            $('#tablaVales_104e tbody').append(''
                + '<tr>'
                + ' <td>' + cerosIzq(item, 3) + '</td>'
                + ' <td>' + $_VALES_104E[i].COD.trim() + '</td>'
                + ' <td>' + $_VALES_104E[i].NIT.trim().replace(/\,/g, '') + '</td>'
                + ' <td>' + $_VALES_104E[i].DOCUM.toUpperCase().trim() + '</td>'
                + ' <td>' + $_VALES_104E[i].VLR.trim() + '</td>'
                + ' <td>' + $_VALES_104E[i].DESCRIP.trim().replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, ' ') + '</td>'
                + '</tr>'
            )

            $_DATOS_VALES_104E.push({
                item: cerosIzq(item, 3),
                codCuenta: $_VALES_104E[i].COD.trim(),
                nitTercero: $_VALES_104E[i].NIT.trim().replace(/\,/g, ''),
                nombreTercero: $_VALES_104E[i].DESCRIP.trim().replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, ' '),
                documento: $_VALES_104E[i].DOCUM.trim(),
                valorVale: $_VALES_104E[i].VLR.trim() || "0",
                codProducto: $_VALES_104E[i].ART.trim(),
                descripProducto: '',
                cantidad: $_VALES_104E[i].CANT.trim() || "0",
                placa: $_VALES_104E[i].PLACA.trim(),
                marca: $_VALES_104E[i].MARCA,
                suc_fact: $_VALES_104E[i].SUC_FACT,
                nro_fact: $_VALES_104E[i].FACT,
                sw_fact: $_VALES_104E[i].SW_FACT || ""
            })
        }
    }

    _validar_mes_104e();
}

function _validar_anio_104e() {
    validarInputs(
        {
            form: '#fase_anio104e',
            orden: '1'
        },
        _validarComprobante_104e,
        () => {
            console.log('llamado')
            _validar_mes_104e()
        }
    )
}

function _validar_mes_104e() {
    validarInputs(
        {
            form: '#fase_mes_104e',
            orden: '1'
        },
        _validarComprobante_104e,
        () => {
            _fase2_104e('1')
        }
    )
}


function _fase2_104e(orden) {
    validarInputs(
        {
            form: '#fase2_104e',
            orden: '1'
        },
        _validar_mes_104e,
        function () {
            let dia = $('#diaInicial_104e').val();
            let mes = $('#mesInicial_104e').val();
            if (parseInt(dia) > 31 || mes > 12) _fase2_104e("1");
            else {
                var usuario = localStorage.Usuario;
                if (usuario == "ADMI" || usuario == "GEBC") {
                    _faseIsla_104e()
                } else _validarVendedor_104e("1");
            }
        }
    )
}

function _faseIsla_104e() {
    validarInputs(
        {
            form: "#primeraIsla_104e",
            orden: "1"
        },
        () => {
            if ($_ANULADO) _initIslas()
            else _fase2_104e()
        },
        () => {
            var isla = $("#primeraIslaInpt_104e").val();
            if (!isla && !$_ANULADO) {
                _validarVendedor_104e("1");
            } else if (!isla && $_ANULADO) {
                _faseIsla_104e()
            } else {
                _consultarIsla_104e();
            }
        }
    )
}

function _initIslas() {
    $('#tablaVenta tbody').html('');
    $('#primeraIslaInpt_104e,#segundaIslaInpt_104e,#terceraIslaInpt_104e').val('').attr('disabled', 'true')
    // validarPrimeraIsla();
    $_DATOS_TABLA_104E = [];
    _modificarTabla_104e();
    _fase2_104e('1');
}

function _consultarIsla_104e() {
    var isla = $("#primeraIslaInpt_104e").val();
    var consulta = $_SURTIDORES_104E.find((e) => e.SURTI.substr(0, 1) == isla);

    if (consulta || $_ANULADO) {
        var url = get_url("app/bombas/BOM104_1.DLL");
        postData({ datosh: datosEnvio() + isla + "|" }, url)
            .then((data) => {
                if ($_ANULADO) {
                    _llenarTabla(data);
                    validarSegundaIsla();
                } else {
                    _addSurtidor(data.split(";"))
                    _validarVendedor_104e("1");
                }
            })
            .catch((err) => {
                _faseIsla_104e();
            });
    } else {
        plantillaToast("", "Dato inválido - isla no coincide", null, "error");
        _faseIsla_104e();
    }
}

function validarSegundaIsla() {
    validarInputs(
        { form: '#segundaIsla_104e', orden: '1' },
        _initIslas,
        on_validarSegunaIsla
    )
}

function on_validarSegunaIsla() {
    var filas_actual = $('#tablaVenta tbody tr').length
    var primeraIsla = $('#primeraIslaInpt_104e').val();
    var isla = $('#segundaIslaInpt_104e').val() ? $('#segundaIslaInpt_104e').val() : false;
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
        { form: '#terceraIsla_104e', orden: '1' },
        _initIslas,
        on_validarTerceraIsla
    )
}

function on_validarTerceraIsla() {
    var filas_actual = $('#tablaVenta tbody tr').length
    var primeraIsla = $('#primeraIslaInpt_104e').val();
    var segundaIsla = $('#segundaIslaInpt_104e').val();
    var isla = $('#terceraIslaInpt_104e').val() ? $('#terceraIslaInpt_104e').val() : false;
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
                        _validarVendedor_104e('1');
                    }).catch(validarTerceraIsla)
            }
        }
    } else {
        _validarVendedor_104e('1');
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

function _addSurtidor(array) {
    var filas = array.filter(e => e.trim());
    for (var i in filas) {
        var consulta = $_DATOS_TABLA_104E.find((e) => e.itemSurtidor == filas[i]);
        if (!consulta) {
            var contador = $('#tablaVenta tbody tr').length
            if (contador < 50) {
                var surtidor = _consultarSurtidor_104e(filas[i]);
                if (!surtidor) {
                    $("#tablaVenta tbody").append(''
                        + "<tr>"
                        + ' <td class="index">'
                        + filas[i]
                        + "</td>"
                        + " <td></td>"
                        + " <td></td>"
                        + "</tr>"
                    );
                }
            }
        }
    }
}

function _validarVendedor_104e(orden) {
    validarInputs(
        {
            form: '#fase3_104e',
            orden: orden
        },
        () => {
            // var usuario = localStorage.Usuario;
            if ($_ANULADO) _initIslas()
            else _fase2_104e()
        },
        function () {
            var codVendedor = espaciosIzq($('#vendedor_104e').val(), 5);
            var validacion = buscarVendedor_104e(codVendedor);
            if (validacion != false) {
                $('#vendedor_104e').val(validacion.COD.trim())


                if (localStorage.Usuario == 'GEBC' || localStorage.Usuario == 'ADMI') {
                    _validacionTabla_104e('0');
                } else {
                    _validacionSegundaTabla_104e();
                }
            } else {
                plantillaToast('99', '01', null, 'warning');
                _validarVendedor_104e('3');
            }
        }
    )
}

function _validacionTabla_104e(orden) {
    validarTabla(
        {
            tabla: '#tablaVenta',
            orden: orden,
            event_f3: _validacionSegundaTabla_104e
        },
        seleccion_104e,
        () => {
            _validarVendedor_104e("3")
        },
        _validacionSegundaTabla_104e
    );
}

function seleccion_104e(datos) {
    var element = $(datos).find('td.index')
    var surtidor = $(element).html();
    var valorAnterior = $(datos).data().anterior;

    galonajeTotalMask.unmaskedValue = '';
    valorTotalMask.unmaskedValue = '';

    var consulta = _consultarItemArray_104e(surtidor);
    if (consulta && consulta.array.valorAnterior != 0) {
        $('#codItem_104e').val(consulta.array.itemSurtidor)
        $('#codProducto_10e4').val(consulta.array.codProducto)
        $('#descProducto').val(consulta.array.descrProducto)

        numAnterior.unmaskedValue = consulta.array.valorAnterior;
        numActual.unmaskedValue = consulta.array.numeroActual.toString();
        valorActualMask.unmaskedValue = consulta.array.valorActual.toString();

        $_VALORES_TMP_104E = {
            item: consulta.array.itemSurtidor,
            pesosSurti: consulta.array.pesosSurti,
            valorVenta: consulta.array.valorVenta,
            valorSobretasa: consulta.array.valorSobretasa,
            valorGlobal: consulta.array.valorGlobal,
            codProducto: consulta.array.codProducto,
            descrProducto: consulta.array.descrProducto,
            numeroAnterior: consulta.array.valorAnterior
        }

        _numeroActual_104e();
    } else {
        consultaInfoSurtidor_104e(surtidor, valorAnterior);
    }
}

function consultaInfoSurtidor_104e(surtidor, valorAnterior) {
    let anio = document.getElementById("añoInicial_104e").value || "";
    let mes = document.getElementById("mesInicial_104e").value || "";
    let dia = document.getElementById("diaInicial_104e").value || "";

    let fecha = anio.padStart(4, "0") + mes.padStart(2, "0") + dia.padStart(2, "0");

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
            // var numeroActual = res[3].trim() ? res[3].trim() : '0';
            var pesos = res[4].trim() || 0;
            var valorVenta = res[5].trim() || 0;
            var valorSobretasa = res[6].trim() || 0;
            var valorGlobal = res[7].trim() || 0;

            // var numeroAnterior = valorAnterior || "";
            var numeroAnterior = res[3].trim() ? res[3].trim() : '0';

            $_VALORES_TMP_104E = {
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

            $('#codItem_104e').val(item)
            $('#codProducto_10e4').val(codProducto)
            $('#descProducto').val(descrProducto)
            numAnterior.unmaskedValue = numeroAnterior.toString();
            numActual.unmaskedValue = numeroAnterior.toString();

            _numeroActual_104e();
        })
        .catch(err => {
            _validacionTabla_104e('0')
        })
}

function _numeroActual_104e() {
    validarInputs(
        {
            form: '#validarNumeroActual_104e',
            orden: '1',
            event_f5: () => {
                _validarNumeroAnterior()
            },
            event_f6: () => {
                valorVentaMask = null
                _modificar_valor_venta()
            },
        },
        function () {
            var item = $('#codItem_104e').val();
            var indxTabla = _siguienteFilaTabla_104e(item - 1); // Buscar siguiente elemento en la tabla
            _validacionTabla_104e(indxTabla)
        },
        _validarNumeroActual_104e
    )
}

function _modificar_valor_venta() {
    const item = $_VALORES_TMP_104E
    const valor_venta = item.valorVenta
    const valor_sobreTasa = item.valorSobretasa

    valorVentaMask = null
    valorSobreMask = null

    var fuente = /*html*/`
        <div style="width: 100%; height: 100%;text-align: center;">
            <div class="row" style="display: flex; align-items: center;">
                <div class="col-md-4 text-right">
                    <label style="margin: 0;">Valor venta: </label>
                </div>
                <div class="col-md-8">
                    <input id="valorVenta_mod_104e" type="text" class="col-md-8"/>
                </div>
            </div>
        </div>
        <div style="width: 100%; height: 100%;text-align: center;padding-top: 10px;">
            <div class="row" style="display: flex; align-items: center;">
                <div class="col-md-4 text-right">
                    <label style="margin: 0;">Valor sobretasa: </label>
                </div>
                <div class="col-md-8">
                    <input id="valorSobre_mod_104e" type="text" class="col-md-8"/>
                </div>
            </div>
        </div>
    `

    setTimeout(() => {
        let config = { mask: Number, min: 0, max: 999999999999, scale: 2, thousandsSeparator: ',', radix: '.' }

        valorVentaMask = new IMask(document.getElementById('valorVenta_mod_104e'), config);
        valorVentaMask.unmaskedValue = valor_venta

        valorSobreMask = new IMask(document.getElementById('valorSobre_mod_104e'), config);
        valorSobreMask.unmaskedValue = valor_sobreTasa
        $("#valorVenta").focus();
    }, 500)

    jAlert({
        titulo: 'Valor venta',
        mensaje: fuente,
        autoclose: false,
        btnCancel: true
    }, () => {
        const nuevo_valor = valorVentaMask.unmaskedValue
        $_VALORES_TMP_104E.valorVenta = nuevo_valor

        const nuevo_valor_sobre = valorSobreMask.unmaskedValue
        $_VALORES_TMP_104E.valorSobretasa = nuevo_valor_sobre

        _numeroActual_104e()
        jAlert_close();
    }, () => {
        _numeroActual_104e()
        jAlert_close();
    });
}

function _validarNumeroAnterior() {
    validarInputs(
        {
            form: '#validarNumeroAnterior_104e',
            orden: '1'
        },
        () => {
            _numeroActual_104e()
        },
        () => {
            var item = document.getElementById('codItem_104e').value
            var info = _consultarItemArray_104e(item)
            var valorActual = numAnterior.unmaskedValue
            // console.log('F5', item, info, valorActual)
            $_DATOS_TABLA_104E[info.index].valorAnterior = valorActual
            $_VALORES_TMP_104E.numeroAnterior = valorActual
            _numeroActual_104e()
        }
    )
}

function _valorActual_104e() {
    validarInputs(
        { form: '#validarNumeroActual_104e', orden: '1' },
        _numeroActual,
        function () {
            let valorActual = valorActualMask || 0;
            if (parseFloat(valorA1ctual) < parseFloat($_VALORES_TMP_104E['pesosSurti'])) _valorActual_104e()
            else _calcularGalonaje_104e();
        }
    )
}

function _validarNumeroActual_104e() {
    var item = $('#codItem_104e').val();

    if (item == $_VALORES_TMP_104E['item']) {
        var numeroAnterior = parseFloat(numAnterior.unmaskedValue);
        var numeroActual = parseFloat(numActual.unmaskedValue);

        if (numeroActual == numeroAnterior) {
            galonajeTotalMask.unmaskedValue = '';
            valorTotalMask.unmaskedValue = '';
            valorActualMask.unmaskedValue = '';
            numAnterior.unmaskedValue = '';
            numActual.unmaskedValue = '';

            var consulta = _consultarItemArray_104e(item);
            if (consulta) {
                $_DATOS_TABLA_104E[consulta.index] = {
                    itemSurtidor: item,
                    estado: 0
                }
            }

            _modificarTabla_104e();
            var indxTabla = _siguienteFilaTabla_104e(item); // Buscar siguiente elemento en la tabla
            _validacionTabla_104e(indxTabla);
        } else if (numeroActual < numeroAnterior) {
            plantillaToast('', 'Dato inválido', null, 'error');
            _numeroActual_104e();
        } else {
            if (parseFloat($_VALORES_TMP_104E['pesosSurti']) == 0) {
                valorActualMask.unmaskedValue = '0';
                _calcularGalonaje_104e();
            } else {
                _valorActual_104e();
            }
        }
    } else {
        jAlert({
            titulo: 'Notificacion',
            mensaje: "Ha ocurrido un error con la consulta: <b>518</b>"
        }, function () { _validacionTabla_104e('0') });
    }
}

function _calcularGalonaje_104e() {
    var item = $('#codItem_104e').val();
    var numeroAnterior = parseFloat(numAnterior.unmaskedValue) || 0;
    var numeroActual = parseFloat(numActual.unmaskedValue) || 0;
    var valorActual = valorActualMask.unmaskedValue || 0;
    let galonajeActual = numeroActual - numeroAnterior;

    galonajeActual = parseFloat(galonajeActual.toFixed(3));

    let valorActualTmp = galonajeActual * parseFloat($_VALORES_TMP_104E['valorVenta']);
    let valorSobretasa = galonajeActual * parseFloat($_VALORES_TMP_104E['valorSobretasa']);
    let valorGlobal = galonajeActual * parseFloat($_VALORES_TMP_104E['valorGlobal']);
    // let valorTotal = valorActualTmp + valorSobretasa + valorGlobal;
    let valorTotal = parseFloat(valorActualTmp.toFixed(0)) + parseFloat(valorSobretasa.toFixed(0)) + valorGlobal;
    // console.log(valorActualTmp, valorSobretasa, valorGlobal);

    let pesosSurti = $_VALORES_TMP_104E['pesosSurti'] || 0;
    let difW = parseFloat(pesosSurti) + parseFloat(valorTotal) - parseFloat(valorActual);

    if (
        (parseFloat(pesosSurti) > 0)
        && (parseFloat(difW) > parseFloat($_VALORES_TMP_104E['valorVenta']))
    ) {
        plantillaToast('', 'Error en lectura precio', null, 'error');
        _numeroActual_104e();
    } else {
        valorTotalMask.unmaskedValue = valorTotal.toFixed(0);
        galonajeTotalMask.unmaskedValue = galonajeActual.toString();

        var consulta = _consultarItemArray_104e(item);
        if (consulta) {
            $_DATOS_TABLA_104E[consulta.index] = {
                itemSurtidor: item,
                galonaje: galonajeActual.toString(),
                valor: valorTotal.toFixed(0),
                codProducto: $_VALORES_TMP_104E['codProducto'],
                descrProducto: $_VALORES_TMP_104E['descrProducto'],
                valorGlobal: $_VALORES_TMP_104E['valorGlobal'],
                valorSobretasa: $_VALORES_TMP_104E['valorSobretasa'],
                valorVenta: $_VALORES_TMP_104E['valorVenta'],
                valorAnterior: $_VALORES_TMP_104E['numeroAnterior'],
                numeroActual: numeroActual,
                valorActual: valorActual,
                pesosSurti: $_VALORES_TMP_104E['pesosSurti']
            }
        } else {
            $_DATOS_TABLA_104E.push({
                itemSurtidor: item,
                galonaje: galonajeActual.toString(),
                valor: valorTotal.toFixed(0),
                codProducto: $_VALORES_TMP_104E['codProducto'],
                descrProducto: $_VALORES_TMP_104E['descrProducto'],
                valorGlobal: $_VALORES_TMP_104E['valorGlobal'],
                valorSobretasa: $_VALORES_TMP_104E['valorSobretasa'],
                valorVenta: $_VALORES_TMP_104E['valorVenta'],
                valorAnterior: $_VALORES_TMP_104E['numeroAnterior'],
                numeroActual: numeroActual,
                valorActual: valorActual,
                pesosSurti: $_VALORES_TMP_104E['pesosSurti']
            });
        }

        _modificarTabla_104e();

        var indxTabla = _siguienteFilaTabla_104e(item);// Buscar siguiente elemento en la tabla
        _validacionTabla_104e(indxTabla)
    }
}

function _modificarTabla_104e() {
    var items = $('#tablaVenta tbody tr');
    var totalGalonaje = 0, totalValor = 0;
    var masked = IMask.createMask({ mask: Number, min: -999999999999, max: 999999999999, scale: 3, thousandsSeparator: ',', radix: '.' });
    var masked2 = IMask.createMask({ mask: Number, min: -999999999999, max: 999999999999, scale: 3, thousandsSeparator: ',', radix: '.' });

    for (var i = 0; i < items.length; i++) {
        let elemento = $(items[i])
        var columnas = $(elemento).find('td');
        let elementoIndex = $(elemento).find('td.index')
        let itemTabla = $(elementoIndex).html();

        for (var j in $_DATOS_TABLA_104E) {
            if ($_DATOS_TABLA_104E[j].itemSurtidor == itemTabla) {
                if ($_DATOS_TABLA_104E[j].estado == 0) {
                    $(columnas[1]).html('');
                    $(columnas[2]).html('');
                    $_DATOS_TABLA_104E.splice(j, 1);
                } else {
                    totalGalonaje += parseFloat($_DATOS_TABLA_104E[j].galonaje);
                    totalValor = parseFloat(totalValor) + parseFloat($_DATOS_TABLA_104E[j].valor);
                    totalValor = parseFloat(totalValor).toFixed(0);

                    var maskedValue = masked.resolve($_DATOS_TABLA_104E[j].galonaje.toString());
                    $(columnas[1]).html(masked.value);

                    var valor = parseFloat($_DATOS_TABLA_104E[j].valor).toFixed(0);
                    var maskedValue = masked2.resolve(valor.toString());
                    $(columnas[2]).html(masked2.value);
                }
            }
        }
    }

    var maskedValue = masked.resolve(totalGalonaje.toFixed(2));
    $('#galonajeTablaVenta').html(masked.value);
    var maskedValue = masked2.resolve(totalValor.toString());
    $('#ventaTablaVenta').html(masked2.value);
    valorCombustibleMask.unmaskedValue = totalValor.toString();
}

function _siguienteFilaTabla_104e(item) {
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

function _validacionSegundaTabla_104e() {
    var input_item = document.getElementById('itemVales_104e').value || 0;
    var items = parseFloat(input_item) + 1;
    document.getElementById('itemVales_104e').value = items.toString().padStart(3, "0")
    validarInputs(
        {
            form: '#itemSegundaTabla_104e', orden: '1', event_f1: () => {
                var items = $('#tablaVenta tbody tr');
                if (localStorage.Usuario == 'GEBC' || localStorage.Usuario == 'ADMI') {
                    _validacionTabla_104e(items.length - 1)
                } else {
                    _validarVendedor_104e("3");
                }
            }
        },
        function () {
            var input_item = parseInt(document.getElementById('itemVales_104e').value) || 1
            if (input_item > 1) document.getElementById('itemVales_104e').value = (input_item - 1).toString().padStart(3, "0")
            _validacionSegundaTabla_104e()

        },
        on_validacionSegundaTabla_104e
    )
}

function on_validacionSegundaTabla_104e() {
    var segundoItem = cerosIzq($('#itemVales_104e').val(), 3)
    var itemsTabla = $('#tablaVales_104e tbody tr').length + 1;

    if (segundoItem > itemsTabla || segundoItem == '000') {
        $('#itemVales_104e').val(cerosIzq(itemsTabla, 3))
        _initBoxVales_104e();
        _validacionSegundaTabla_104e();
    } else {
        var consulta = _consultarItemArray_vales_104e(segundoItem);
        if (consulta) {
            $('#itemVales_104e').val(consulta.array.item);
            $('#codigoCuenta_104e').val(consulta.array.codCuenta);
            $('#nitTerceroInpt_104e').val(consulta.array.nitTercero);
            $('#documentoInpt_104e').val(consulta.array.documento);
            valorValeMask.unmaskedValue = consulta.array.valorVale.toString();
            $('#itemVales_104e').val(cerosIzq(segundoItem, 3))
        } else {
            $('#itemVales_104e').val(cerosIzq(segundoItem, 3))
            _initBoxVales_104e();
        }

        let codigoActual = $('#codigoCuenta_104e').val() || "";
        let sucursal = $('#sucursal_104e').val().trim();
        if (!consulta) {
            if (codigoActual.length == 0) {
                if (sucursal == '1') {
                    $('#codigoCuenta_104e').val('13459500001');
                } else {
                    $('#codigoCuenta_104e').val('13459500002');
                }
            }
        } else {
            document.getElementById('codigoCuenta_104e').value = consulta.array.codCuenta;
        }

        _validarPlanCuenta_104e();
    }
}

function _validarPlanCuenta_104e() {
    validarInputs(
        { form: "#validarCuenta_104e", orden: "1" },
        _validacionSegundaTabla_104e,
        onValidarCuenta,
    );
}

function onValidarCuenta() {
    var codCuenta = $("#codigoCuenta_104e").val();
    var validacion = buscarCuentaContable_104e(codCuenta);

    if (!codCuenta.trim()) {
        let item = $("#itemVales_104e").val();
        let busqueda = $_DATOS_VALES_104E.find((el) => el.item == item);
        let sw_fact = busqueda.sw_fact || "N";

        if (sw_fact == "S" || parseFloat(busqueda.nro_fact) > 0) {
            plantillaToast(
                "",
                "El vale ya fue facturado",
                null,
                "error"
            );
            _validarEliminarItem();
        } else {
            _validarEliminarItem();
        }
    } else if (validacion) {
        let cuenta_mayor = codCuenta.substring(0, 6);
        let array_cuentas = ["134595", "110505", "130505", "111005", "112005"];

        if (array_cuentas.includes(cuenta_mayor)) {
            let separa_caja = $_USUA_GLOBAL[0]["SEPARA_CAJA"].trim() || "N";

            if (separa_caja == "S") {
                $("#desCuenta_104e").val(validacion.DESCRIP.trim());
                _validarTercero_104e();
            } else {
                let auxiliar = parseFloat(codCuenta.substring(6));
                let sucursal = document.getElementById("sucursal_104e").value;

                if (auxiliar == parseFloat(sucursal)) {
                    $("#desCuenta_104e").val(validacion.DESCRIP.trim());
                    _validarTercero_104e();
                } else {
                    CON851(
                        "",
                        "La sucursal no coincide con el auxiliar de la cuenta",
                        null,
                        "error",
                        "Error"
                    );
                    _validarPlanCuenta_104e();
                }
            }
        } else {
            $("#desCuenta_104e").val(validacion.DESCRIP.trim());
            _validarTercero_104e();
        }
    } else {
        CON851("03", "03", null, "error", "Error");
        _validarPlanCuenta_104e()
    }
}

function _validarEliminarItem() {
    CON850_P(
        function (e) {
            if (e.id == "S") {
                let item = $('#itemVales_104e').val()
                let busqueda = $_DATOS_VALES_104E.filter(el => el.item != item)
                busqueda = busqueda.map((el, index) => {
                    el.item = (index + 1).toString().padStart(3, '0')
                    return el
                })

                $_DATOS_VALES_104E = []
                $_DATOS_VALES_104E = JSON.parse(JSON.stringify(busqueda))
                _modificarTablaVales_104e()
                _initBoxVales_104e()
                _validacionSegundaTabla_104e()
            } else {
                setTimeout(_validacionSegundaTabla_104e, 200);
            }
        },
        { msj: "Desea eliminar item?" }
    );
}


function _validarTercero_104e() {
    validarInputs(
        { form: '#nitTercero_104e', orden: '1' },
        _validarPlanCuenta_104e,
        function () {
            var nitTercero = $('#nitTerceroInpt_104e').val();
            var validacion = buscarTercero_104e(nitTercero);
            if (validacion) {
                $('#nitTerceroInpt_104e').val(validacion.COD.trim());
                $("#desCliente_104e").val(validacion.NOMBRE.trim());
                _validarDocumento_104e();
            } else {
                plantillaToast('99', '01', null, 'warning');
                _validarTercero_104e();
            }
        }
    )
}

function _validarDocumento_104e() {
    validarInputs(
        { form: '#documentoVale_104e', orden: '1' },
        _validarTercero_104e,
        function () {
            let documento = document.getElementById("documentoInpt_104e").value || "";
            let nitTercero = document.getElementById("nitTerceroInpt_104e").value || "";
            var item = document.getElementById('itemVales_104e').value || 0;
            var busqueda = $_DATOS_VALES_104E.find((e) => e.item == item)


            let anio = document.getElementById("añoInicial_104e").value || "";
            let mes = document.getElementById("mesInicial_104e").value || "";
            let dia = document.getElementById("diaInicial_104e").value || "";

            let fecha = anio.padStart(4, "0") + mes.padStart(2, "0") + dia.padStart(2, "0");


            let datos = {
                datosh: datosEnvio(),
                fecha,
                cliente: nitTercero,
                vale: documento.toUpperCase()
            }

            if (busqueda) {
                if (busqueda.documento.toUpperCase() == documento.toUpperCase()) _validarPopup_104e();
                else {
                    postData(datos, get_url("app/bombas/CON807B.DLL"))
                        .then(_validarPopup_104e)
                        .catch(on_validarDocumento_104e)
                }
            } else {
                var tableInfo = Array.prototype.map.call(document.querySelectorAll('#items_tablaVales_104e tr'), function (tr) {
                    return Array.prototype.map.call(tr.querySelectorAll('td'), function (td) {
                        return td.innerHTML;
                    });
                });

                var busqueda = tableInfo.find(e => e[0] == item)
                var coincidencias = 0;

                if (!busqueda) {
                    for (var i in tableInfo) {
                        var item = tableInfo[i][3];
                        if (item.toUpperCase() == documento.padStart(6, "0").toUpperCase()) coincidencias++;
                    }
                } else coincidencias = 0

                if (coincidencias > 0) {
                    plantillaToast("99", "El documento ya se encuentra en la tabla", null, 'error');
                    if ($_USUA_GLOBAL[0].NIT == 822007669) _validarDocumento_104e();
                    else _validarPopup_104e();
                } else {
                    postData(datos, get_url("app/bombas/CON807B.DLL"))
                        .then(_validarPopup_104e)
                        .catch(on_validarDocumento_104e)
                }
            }
        }
    )
}

function on_validarDocumento_104e(data) {
    if ($_USUA_GLOBAL[0].NIT == 822007669) _validarDocumento_104e();
    else _validarPopup_104e();
}

function _validarPopup_104e() {
    validarInputs(
        { form: '#validarPopup_104e', orden: '1' },
        _validarDocumento_104e,
        () => {
            var codCuenta = $("#codigoCuenta_104e").val();
            codCuenta = codCuenta.substr(0, 6);

            var nit_usu = $_USUA_GLOBAL[0].NIT;
            var nit_cliente = parseFloat(
                document.getElementById("nitTerceroInpt_104e").value
            );

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
                setTimeout(on_validarPopup_104e, 150);
            } else _validarItemVales_104e({});
        }
    )
}

function on_validarPopup_104e() {
    var fuente = $('#plantillaProducto_104e').html();
    $_DIALOGO = bootbox.dialog({
        title: "Producto consumido",
        message: fuente,
        closeButton: false,
        buttons: {
            main: {
                label: "Aceptar",
                className: "blue hidden"
            }
        },
    });

    $_DIALOGO.init(function () {
        // Inicia validación pop-up        
        cantidadVentanaMask = new IMask(
            document.getElementsByClassName('cantidadVentana')[1],
            { mask: Number, min: -999999999999, max: 9999, scale: 2, thousandsSeparator: ',', radix: '.' }
        );

        var item = cerosIzq($('#itemVales_104e').val(), 3)
        var consulta = _consultarItemArray_vales_104e(item);

        if (consulta) {
            let codProducto = $('.codArticuloVentana');
            $(codProducto[1]).val(consulta.array.codProducto)
            let descripProducto = $('.descripArticuloVentana');
            $(descripProducto[1]).val(consulta.array.descripProducto)
            cantidadVentanaMask.unmaskedValue = consulta.array.cantidad;
            let placaVentana = $('.placaVentanaPopup');
            $(placaVentana[1]).val(consulta.array.placa)
        }

        setTimeout(function () { validarArticuloPopup_104e() }, 500);

        $('.codArticuloVentana').unbind()
        $('.codArticuloVentana').bind('keydown', function (e) {
            if (e.which == 119) {
                _ventanaDatos({
                    titulo: "Ventana articulos",
                    columnas: ["GRP", "NUMERO", "DESCRIP", "UNID", "VALOR", "REFER"],
                    data: $_ARTICULOS_104E,
                    callback_esc: function () {
                        $('.codArticuloVentana').focus();
                    },
                    callback: function (data) {
                        let grp = data.GRP.trim()
                        $('.codArticuloVentana').val(grp + data.NUMERO.trim()).focus();
                        _enterInput('.codArticuloVentana');
                    }
                });
            }
        })

    })
}

function validarArticuloPopup_104e() {
    validarInputs(
        { form: '#productoPopup_104e', orden: '1' },
        function () {
            _validarPopup_104e();
            $('[data-bb-handler="main"]').click();
            setTimeout(() => {
                $('html').removeClass('modal-open')
            }, 200)
        },
        function () {
            var codProductoEl = $('.codArticuloVentana');
            var codProducto = $(codProductoEl[1]).val();
            var validacion = buscarProducto_104e(codProducto);
            if (codProducto.length < 1) {
                segundaFasePopup_104e('1');
                let descripProducto = $('.descripArticuloVentana');
                $(descripProducto[1]).val('')
            } else if (validacion) {
                let code = validacion.GRP.trim() + validacion.NUMERO.trim();
                $(codProductoEl[1]).val(code);
                let descripProducto = $('.descripArticuloVentana');
                $(descripProducto[1]).val(validacion.DESCRIP)
                segundaFasePopup_104e('1');
            } else {
                // $('#codArticuloVentana').val('');
                // let descripProducto = $('.descripArticuloVentana');
                // $(descripProducto[1]).val('')
                plantillaToast('99', '01', null, 'warning');
                validarArticuloPopup_104e();
            }
        }
    )
}

function segundaFasePopup_104e(orden) {
    validarInputs(
        { form: '#segundaFasePopup_104e', orden: orden },
        validarArticuloPopup_104e,
        function () {
            let codProducto = $('.codArticuloVentana');
            codProducto = $(codProducto[1]).val()
            let descripProducto = $('.descripArticuloVentana');
            descripProducto = $(descripProducto[1]).val()
            let placa = $('.placaVentanaPopup');
            placa = $(placa[1]).val()


            var data = {
                codProducto,
                descripProducto,
                placa,
            };

            bootbox.hideAll()
            $('html').removeClass('modal-open');
            _validarItemVales_104e(data)
        }
    )
}

function _validarItemVales_104e(data) {
    data.codProducto = data.codProducto || "";
    data.descripProducto = data.descripProducto || "";
    data.placa = data.placa || "";

    var item = $('#itemVales_104e').val();
    var codCuenta = $('#codigoCuenta_104e').val();

    var nitTercero = $('#nitTerceroInpt_104e').val();
    var infoTercero = buscarTercero_104e(nitTercero) || 'Sin definir';
    var documento = $('#documentoInpt_104e').val();
    var valorVale = valorValeMask.unmaskedValue;
    let cantidad = cantidadVentanaMask ? cantidadVentanaMask.unmaskedValue : "0";

    var consulta = _consultarItemArray_vales_104e(item);
    if (consulta) {
        $_DATOS_VALES_104E[consulta.index] = {
            item: item,
            codCuenta: codCuenta,
            nitTercero: nitTercero,
            nombreTercero: infoTercero.NOMBRE.trim(),
            documento: documento,
            valorVale: valorVale,
            codProducto: data.codProducto,
            descripProducto: data.descripProducto,
            cantidad: cantidad,
            placa: data.placa,
            marca: consulta.array.marca,
            suc_fact: consulta.array.suc_fact,
            nro_fact: consulta.array.nro_fact,
            sw_fact: consulta.array.sw_fact
        }
    } else {
        $_DATOS_VALES_104E.push({
            item: item,
            codCuenta: codCuenta,
            nitTercero: nitTercero,
            nombreTercero: infoTercero.NOMBRE.trim(),
            documento: documento,
            valorVale: valorVale,
            codProducto: data.codProducto,
            descripProducto: data.descripProducto,
            cantidad: cantidad,
            placa: data.placa,
            marca: "",
            suc_fact: "",
            nro_fact: "",
            sw_fact: "",
        })
    }

    _modificarTablaVales_104e();
    _initBoxVales_104e();
    // $('[data-bb-handler="main"]').click();
    // $_DIALOGO.modal('hide');
    _validacionSegundaTabla_104e();
}

function _modificarTablaVales_104e() {
    $('#tablaVales_104e tbody').html('');
    var masked = IMask.createMask({ mask: Number, min: -999999999999, max: 999999999999, scale: 0, thousandsSeparator: ',', radix: '.' });
    var valorTotal = 0;
    for (var i in $_DATOS_VALES_104E) {
        var maskedValue = masked.resolve($_DATOS_VALES_104E[i].valorVale.toString().replace(/\s\s+/g, ''));
        var valor = $_DATOS_VALES_104E[i].valorVale.trim().replace(/\s\s+/g, '')
        valorTotal += parseFloat(valor.replace(/\,/g, '')) || 0;

        $('#tablaVales_104e tbody').append(''
            + '<tr>'
            + '   <td>' + $_DATOS_VALES_104E[i].item + '</td>'
            + '   <td>' + $_DATOS_VALES_104E[i].codCuenta + '</td>'
            + '   <td>' + $_DATOS_VALES_104E[i].nitTercero + '</td>'
            + '   <td>' + $_DATOS_VALES_104E[i].documento.toUpperCase() + '</td>'
            + '   <td>' + masked.value + '</td>'
            + '   <td>' + $_DATOS_VALES_104E[i].nombreTercero + '</td>'
            + '</tr>'
        )
    }

    var maskedValue = masked.resolve(valorTotal.toString());
    $('#totalTablaVales').html(masked.value);
    valorCreditosMask.unmaskedValue = valorTotal.toString();
}

function _validarFinanciacion_104e() {
    validarInputs(
        { form: '#validarFinanciacion_104e', orden: '1' },
        _validacionSegundaTabla_104e,
        function () {
            let valorDeuda = valorCreditosMask.unmaskedValue || 0;
            let valorVenta = valorCombustibleMask.unmaskedValue || 0;
            let valorFinanciacion = valorFinanciacionMask.unmaskedValue || 0;

            console.log('Totales', valorDeuda, valorVenta, valorFinanciacion)
            if (parseFloat(valorDeuda) > (parseFloat(valorVenta) + parseFloat(valorFinanciacion))) {
                plantillaToast('99', '07', null, 'warning');
                _validarFinanciacion_104e();
            } else {
                _validarCheques_104e();
            }
        }
    )
}

function _validarCheques_104e() {
    setTimeout(() => {
        validarInputs(
            { form: '#validarCheques_104e', orden: '1' },
            _validarFinanciacion_104e,
            function () {
                var valorDeuda = valorCreditosMask.unmaskedValue || 0;
                var valorVenta = valorCombustibleMask.unmaskedValue || 0;
                var valorFinanciacion = valorFinanciacionMask.unmaskedValue || 0;
                var valorCheque = valorChequesMask.unmaskedValue || 0;

                var temp = parseFloat(valorDeuda) - parseFloat(valorFinanciacion) + parseFloat(valorCheque);
                if (parseFloat(valorVenta) < parseFloat(temp)) {
                    plantillaToast('99', '07', null, 'warning');
                    _validarCheques_104e();
                } else {
                    var totalEfectivo = parseFloat(valorVenta) + parseFloat(valorFinanciacion)
                        - parseFloat(valorDeuda) - parseFloat(valorCheque);

                    valorEfectivoMask.unmaskedValue = totalEfectivo.toString();
                    _validacionFinal_104e();
                }
            }
        )
    }, 150);
}

function _validacionFinal_104e() {
    CON850_P(function (e) {
        if (e.id == 'S') _bajarDatos_104e();
        else _validarCheques_104e();
    },
        {
            msj: '01'
        }
    )
}

function _bajarDatos_104e() {
    loader('show');

    var data = {},
        posicion = 0,
        linea = '',
        item = '',
        surtidores_tmp = [],
        deudas_tmp = [];

    surtidores_tmp = JSON.parse(JSON.stringify($_DATOS_TABLA_104E))

    if (surtidores_tmp.length < 1) surtidores_tmp = false;
    else {
        for (var i in surtidores_tmp) {
            let actualTmp = surtidores_tmp[i].numeroActual;
            let anteriorTmp = surtidores_tmp[i].valorAnterior;
            let cantidadTmp = parseFloat(actualTmp) - parseFloat(anteriorTmp);

            surtidores_tmp[i].galonaje = parseFloat(surtidores_tmp[i].galonaje).toFixed(3);
            surtidores_tmp[i].valorAnterior = parseFloat(surtidores_tmp[i].valorAnterior).toFixed(3);
            surtidores_tmp[i].numeroActual = parseFloat(surtidores_tmp[i].numeroActual).toFixed(3);

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

    deudas_tmp = JSON.parse(JSON.stringify($_DATOS_VALES_104E))

    if (deudas_tmp.length < 1) deudas_tmp = false;
    else {
        posicion = 0, linea = '', item = '';
        for (var i in $_DATOS_VALES_104E) {
            deudas_tmp[i].valorVale = parseFloat(deudas_tmp[i].valorVale.replace(/\s\s+/g, '').replace(/\,/g, '')).toFixed(0);
            deudas_tmp[i].cantidad = parseFloat(deudas_tmp[i].cantidad).toFixed(2);
            deudas_tmp[i].placa = espaciosDer(deudas_tmp[i].placa, 6);

            item = deudas_tmp[i];
            linea = item.codCuenta + "|"
                + item.nitTercero + "|"
                + item.documento.toUpperCase() + "|"
                + item.valorVale + "|"
                + item.codProducto + "|"
                + item.cantidad + "|"
                + item.placa + "|"
                + item.marca + "|"
                + item.suc_fact + "|"
                + item.nro_fact + "|";

            posicion++;
            data['TBL2-' + posicion.toString().padStart(3, '0')] = linea;
        }
    }

    let operador = localStorage.Usuario;

    let comprobante = $('#numComprobante_104e').val();

    let anio = document.getElementById("añoInicial_104e").value || "";
    let mes = document.getElementById("mesInicial_104e").value || "";
    let dia = document.getElementById("diaInicial_104e").value || "";

    let fecha = anio.padStart(4, "0") + mes.padStart(2, "0") + dia.padStart(2, "0");

    let turno = $('#turno_104e').val();
    let detalle = $('#detalle_104e').val();
    let vendedor = $('#vendedor_104e').val();

    let valorFinanciacion = valorFinanciacionMask.unmaskedValue || 0;
    valorFinanciacion = parseFloat(valorFinanciacion).toFixed(0);
    valorFinanciacion = cerosIzq(valorFinanciacion, 12);

    let valorEfectivo = valorEfectivoMask.unmaskedValue || 0;
    valorEfectivo = parseFloat(valorEfectivo).toFixed(0);
    valorEfectivo = cerosIzq(valorEfectivo, 12);

    let valorCheques = valorChequesMask.unmaskedValue || 0;
    valorCheques = parseFloat(valorCheques).toFixed(0);
    valorCheques = cerosIzq(valorCheques, 12);

    var datos_envio = datosEnvio()
        + operador + '|'
        + cerosIzq(comprobante, 6) + '|'
        + fecha + '|'
        + espaciosDer(turno, 1) + '|'
        + espaciosDer(detalle, 20) + '|'
        + espaciosDer(vendedor, 5) + '|'
        + valorFinanciacion + '|'
        + valorEfectivo + '|'
        + valorCheques + '|'
        + $("#sucursal_104e").val().trim() + "|";

    data.datosh = datos_envio;
    console.log(data);
    postData(data, get_url("app/bombas/BOM104_3E.DLL"))
        .then(on_enviarDatos_104e)
        .catch(err => {
            loader('hide')
            _validarCheques_104e()
        })
}

function on_enviarDatos_104e(data) {

    let anio = document.getElementById("añoInicial_104e").value || "";
    let mes = document.getElementById("mesInicial_104e").value || "";
    let dia = document.getElementById("diaInicial_104e").value || "";

    let fechaAnt = anio.padStart(4, "0") + mes.padStart(2, "0") + dia.padStart(2, "0");

    let sucursal = document.getElementById("sucursal_104e").value || "";
    let planilla = document.getElementById("numComprobante_104e").value || "";

    let datos = {
        datosh: datosEnvio(),
        sucursal,
        planilla,
        fecha: fechaAnt,
        paso: "2"
    }

    postData(datos, get_url("app/bombas/BOM106.DLL"))
        .then(on_segundaConsulta_104e)
        .catch(err => {
            loader('hide')
            _validarCheques_104e()
        })
}


function on_segundaConsulta_104e(data) {
    let sucursal = document.getElementById("sucursal_104e").value || "";
    let planilla = document.getElementById("numComprobante_104e").value || "";

    let datos = {
        datosh: datosEnvio() + "S|",
        sucursal,
        planilla,
    };

    postData(datos, get_url("app/bombas/BOM020.DLL"))
        .then(on_terceraConsulta_104e)
        .catch(err => {
            loader('hide')
            _validarCheques_104e()
        })
}

function on_terceraConsulta_104e(data) {
    if ($_USUA_GLOBAL[0].INVENT.trim() == 'S') {
        let sucursal = document.getElementById("sucursal_104e").value || "";
        let planilla = document.getElementById("numComprobante_104e").value || "";

        let datos = {
            datosh: datosEnvio(),
            sucursal,
            planilla
        }

        postData(datos, get_url("app/bombas/BOM030.DLL"))
            .then(data => {
                loader('hide');
                CON850_P(function (e) {

                    // if (e.id == 'S') _ventanaImpresion_104e();
                    if (e.id == 'S') {
                        setTimeout(_generarFactCombu_104e, 1000)
                    }
                    else _fin_104e();
                },
                    {
                        msj: '00'
                    }
                )
            })
            .catch(err => {
                loader('hide')
                _validarCheques_104e()
            })
    } else {
        _generarFactCombu_104e()
        // _fin_104e();
    }
}

function _generarFactCombu_104e() {
    CON850_P(function (e) {
        if (e.id == 'S') {
            let sucursal = document.getElementById("sucursal_104e").value || "";
            let planilla = document.getElementById("numComprobante_104e").value || "";

            let datos = {
                datosh: datosEnvio() + localStorage.Usuario + "|",
                sucursal,
                planilla
            }

            postData(datos, get_url("app/bombas/BOMFACT.DLL"))
                .then((data) => {
                    _ventanaImpresion_104e();
                })
                .catch((err) => {
                    loader("hide");
                    _validarCheques_104e();
                });
        } else {
            _ventanaImpresion_104e()
        }
    }, {
        msj: 'Desea refacturar contado?',
        overlay_show: false
    })

}

function _ventanaImpresion_104e() {
    $('#abrirPopupBtn_104e').click();
    setTimeout(function () { $('#formatoImpresion_104e').select2('open') }, 500)
}

function validarFormato_104e(e) {
    var seleccionado = $("#formatoImpresion_104e").val();
    seleccionado = seleccionado ? seleccionado : "3";
    if (seleccionado != "3") {
        if (seleccionado == "1") $_FORMATO_104e = "PDF";
        else if (seleccionado == "2") $_FORMATO_104e = "CSV";

        $(this).attr("disabled", "true");

        _validarPregunta_104e();
    } else {
        $(this).attr("disabled", "true");
        $("#closePopup").click();
        _fin_104e();
    }
}
function _validarPregunta_104e() {
    validarInputs(
        { form: '#preguntaImpresion', orden: '1' },
        _fin_104e,
        function () {
            let sucursal = document.getElementById("sucursal_104e").value || "";
            let planilla = document.getElementById("numComprobante_104e").value || "";
            var detallado = document.getElementById("detallado_104e").value || "N";

            let datos = {
                datosh: datosEnvio() + detallado + "|",
                sucursal,
                planilla
            }

            loader('show');
            postData(datos, get_url("app/bombas/BOM111.DLL"))
                .then(data => {
                    let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
                    let nitEmpresa = $_USUA_GLOBAL[0].NIT;
                    let comprobanteInicial = $('#numComprobante_104e').val();

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

                    if ($_FORMATO_104e == 'PDF') {
                        opcionesImpresiones.tipo = 'pdf';
                        imprimir(opcionesImpresiones, _fin_104e)
                    } else if ($_FORMATO_104e == 'CSV') {
                        opcionesImpresiones.tipo = 'csv';
                        imprimir(opcionesImpresiones, _fin_104e)
                    }
                })
                .catch(err => {
                    loader('hide');
                    validarFase1_105('1')
                })

            $('#formatoImpresion_104e').val(null).removeAttr('disabled').trigger('change');
            $('#closePopup').click();
        }
    )
}

function _fin_104e() {
    loader('hide');
    console.log('Reiniciar todo');
    jAlert({
        titulo: 'Modificado correctamente',
        mensaje: 'El comprobante ha sido modificado correctamente'
    }, function () {
        _reset_104e()
        _validarComprobante_104e()
    });
}

function _initBoxVales_104e() {
    $('#codigoCuenta_104e').val('');
    $('#desCuenta_104e').val('');
    $('#nitTerceroInpt_104e').val('');
    $('#desCliente_104e').val('');
    $('#documentoInpt_104e').val('');
    valorValeMask.unmaskedValue = '';
    if (cantidadVentanaMask) cantidadVentanaMask.unmaskedValue = '';
}

function _consultarItemArray_104e(item) {
    var retornar = false;

    for (var i in $_DATOS_TABLA_104E) {
        if (item == $_DATOS_TABLA_104E[i].itemSurtidor) {
            retornar = {
                index: i,
                array: $_DATOS_TABLA_104E[i]
            }
        }
    }

    return retornar;
}

function _consultarItemArray_vales_104e(item) {
    var retornar = false;

    for (var i in $_DATOS_VALES_104E) {
        if (item == $_DATOS_VALES_104E[i].item) {
            retornar = {
                index: i,
                array: $_DATOS_VALES_104E[i]
            }
        }
    }

    return retornar;
}

function _siguienteFilaTabla_104e(item) {
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

function _consultarItemArray_vales_104e(item) {
    var retornar = false;

    for (var i in $_DATOS_VALES_104E) {
        if (item == $_DATOS_VALES_104E[i].item) {
            retornar = {
                index: i,
                array: $_DATOS_VALES_104E[i]
            }
        }
    }

    return retornar;
}

function buscarProducto_104e(codigo) {
    var retornar = false;
    for (var i in $_ARTICULOS_104E) {
        let code = $_ARTICULOS_104E[i].GRP.trim().toLowerCase() + $_ARTICULOS_104E[i].NUMERO.trim().toLowerCase();
        if (code.trim() == codigo.toLowerCase()) {
            retornar = $_ARTICULOS_104E[i];
            break;
        }
    }

    return retornar;
}

function buscarVendedor_104e(codigo) {
    var retornar = false;
    for (var i in $_VENDEDORES_104E) {
        if ($_VENDEDORES_104E[i].COD.trim().toLowerCase() == codigo.trim().toLowerCase()) {
            retornar = $_VENDEDORES_104E[i];
            break;
        }
    }

    return retornar;
}

function buscarCuentaContable_104e(codigo) {
    var retornar = false;
    for (var i in $_CUENTAS_104E) {
        if ($_CUENTAS_104E[i].CTA.trim().toLowerCase() == codigo.trim().toLowerCase()) {
            retornar = $_CUENTAS_104E[i];
            break;
        }
    }

    return retornar;
}

function buscarTercero_104e(codigo) {
    let nit = cerosIzq(codigo.trim(), 10);
    var retornar = false;
    for (var i in $_TERCEROS_104E) {
        if ($_TERCEROS_104E[i].COD.trim().toLowerCase() == nit.toLowerCase()) {
            retornar = $_TERCEROS_104E[i];
            break;
        }
    }

    return retornar;
}

function _consultarSurtidor_104e(data) {
    var retornar = false,
        array = $("#tablaVenta tbody .index");

    for (var i in array) {
        if (array[i].innerHTML == data) retornar = true;
    }
    return retornar;
}