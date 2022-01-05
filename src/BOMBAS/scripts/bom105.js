var $_SURTIDORES_105,
    $_DATOS_TABLA_105,
    $_INFO_COMP_105,
    $_FORMATO_105,
    $_LISTADO_105,
    $_SUCURSAL_105;

const { ventanaFiltro } = require("../../BOMBAS/scripts/ventanaFiltroComp.js");

(() => {
    _inputControl('reset');
    _inputControl('disabled');

    loader('show');
    _getSucursales_105();

    $("#formatoImpresion")
        .select2()
        .on("select2:close", () => {
            setTimeout(() => {
                validarFormato_105();
            }, 500);
        });

    _toggleF8([
        { input: 'numComprobante', app: '105', funct: _ventanaComp },
    ]);
})();

function _getSucursales_105() {
    postData({ datosh: datosEnvio() }, get_url("app/contab/CON823.DLL"))
        .then(res => {
            loader('hide');

            let array = [];
            res.SUCURSAL.forEach(element => {
                array.push({ cod: element.CODIGO, descripcion: element.DESCRIPCION })
            });

            _vetanaSucursales_105(array);
        })
        .catch(err => {
            loader('hide');
            _toggleNav()
        })
}

function _vetanaSucursales_105(data) {
    _ventanaDatos({
        titulo: 'Busqueda sucursales',
        columnas: ["cod", "descripcion"],
        data,
        callback_esc: _toggleNav,
        callback: (data) => {
            $_SUCURSAL_105 = data;
            _init_105();
        }
    });
}

function _ventanaComp(e) {
    if (e.type == "keydown" && e.which == 119) {
        $("#numComprobante_105").attr("disabled", "true");
        set_Event_validar("#validarComprobante", "off");

        ventanaFiltro({ callback: _terminarVentanaFiltro });
    }
}

function _terminarVentanaFiltro(data) {
    $_SUCURSAL_105.cod = data.suc;
    document.getElementById("numComprobante_105").value = data.nro || "";
    validarComprobante();
}

function habilitarFormato_105() {
    $('#formatoImpresion').val(null).removeAttr('disabled').trigger('change');
    $('#formatoImpresion').select2('open')
}

function _init_105() {
    _inputControl('reset');
    _inputControl('disabled');
    $('#tablaVenta tbody').html('')
    $('#tablaVales tbody').html('')

    $('#galonajeTablaVenta').html('');
    $('#ventaTablaVenta').html('');
    $('#totalTablaVales').html('');

    validarComprobante();
}

function validarComprobante() {
    validarInputs(
        { form: '#validarComprobante', orden: '1' },
        _toggleNav,
        function () {
            loader('show');
            let comprobante = $('#numComprobante_105').val() ? $('#numComprobante_105').val() : '0';
            $('#numComprobante_105').val(cerosIzq(comprobante, 6));
            let datos = {
                datosh: datosEnvio(),
                sucursal: $_SUCURSAL_105.cod,
                planilla: comprobante,
            };

            postData(datos, get_url("app/bombas/BOM105.DLL"))
                .then(data => {
                    $_SURTIDORES_105 = data.SURTIDORES;
                    $_DATOS_TABLA_105 = data['TBLA-DEUD'];
                    $_INFO_COMP_105 = data.TOTALES;
                    loader('hide');
                    _llenarDatos_105();
                })
                .catch(err => {
                    console.log(err);
                    loader('hide');
                    validarComprobante();
                })
        }
    )
}

function _llenarDatos_105() {
    let fecha = $_INFO_COMP_105['1'].trim();
    let año = fecha.substring(0, 4);
    $('#añoInicial').val(año);

    let mes = fecha.substring(4, 6);
    $('#mesInicial').val(mes);

    let dia = fecha.substring(6, 8);
    $('#diaInicial').val(dia);

    let turno = $_INFO_COMP_105['2'].trim();
    $('#turno').val(turno);

    let detalle = $_INFO_COMP_105['3'].trim();
    $('#detalle').val(detalle);

    let totalGalonaje = $_INFO_COMP_105['6'].trim();
    $('#galonajeTablaVenta').html(totalGalonaje);

    let totalVenta = $_INFO_COMP_105['7'].trim();
    $('#ventaTablaVenta').html(totalVenta);
    $('#totalCombustible').val(totalVenta);

    let totalFinanciacion = $_INFO_COMP_105['8'].trim();
    $('#totalFinanciacion').val(totalFinanciacion);

    let totalVales = $_INFO_COMP_105['9'].trim();
    $('#totalTablaVales').html(totalVales);
    $('#totalCreditos').val(totalVales);

    let totalCheques = $_INFO_COMP_105['10'].trim();
    $('#totalCheques').val(totalCheques);

    let totalEfectivo = $_INFO_COMP_105['11'].trim();
    $('#totalEfectivo').val(totalEfectivo);

    if (detalle != "ANULADO") _llenarTablaSurtidores_105();
    else {
        jAlert(
            {
                titulo: "Advertencia ",
                mensaje: "El comprobante fue anulado: <b>" + $("#numComprobante_105").val() + "</b>",
            },
            () => {
                validarComprobante();
            }
        );
    }

}

function _llenarTablaSurtidores_105() {
    for (var i in $_SURTIDORES_105) {
        let item = $_SURTIDORES_105[i].SURTI.trim() ? $_SURTIDORES_105[i].SURTI.trim() : false;
        if (item) {
            $('#tablaVenta tbody').append(''
                + '<tr>'
                + ' <td>' + item + '</td>'
                + ' <td>' + $_SURTIDORES_105[i].CANTID.trim() + '</td>'
                + ' <td>' + $_SURTIDORES_105[i].VALOR.trim() + '</td>'
                + '</tr>'
            )
        }
    }

    _llenarTablaVales_105();
}

function _llenarTablaVales_105() {
    for (var i in $_DATOS_TABLA_105) {
        if ($_DATOS_TABLA_105[i].COD.trim().length > 0) {
            let item = parseInt(i) + parseInt(1);
            $('#tablaVales tbody').append(''
                + '<tr>'
                + ' <td>' + cerosIzq(item, 3) + '</td>'
                + ' <td>' + $_DATOS_TABLA_105[i].COD.trim() + '</td>'
                + ' <td>' + $_DATOS_TABLA_105[i].NIT.trim() + '</td>'
                + ' <td>' + $_DATOS_TABLA_105[i].DOCUM.trim() + '</td>'
                + ' <td>' + $_DATOS_TABLA_105[i].VLR.trim() + '</td>'
                + ' <td>' + $_DATOS_TABLA_105[i].DESCRIP.trim().replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, ' ') + '</td>'
                + '</tr>'
            )
        }
    }

    _validacionFinal_105();
}

function _validacionFinal_105() {
    CON850_P(function (e) {
        if (e.id == 'S') {
            _popupImpresion();
        } else {
            _init_105();
        }
    }, {
        msj: '00',
        overlay_show: false
    })
}

function _popupImpresion() {
    $('#abrirPopupBtn').click();
    setTimeout(function () {
        $("#formatoImpresion").select2("open");
    }, 500);
}

function validarFormato_105(e) {
    var seleccionado = $("#formatoImpresion").val();
    seleccionado = seleccionado ? seleccionado : "3";
    if (seleccionado != "3") {
        if (seleccionado == "1") $_FORMATO_105 = "PDF";
        else if (seleccionado == "2") $_FORMATO_105 = "CSV";

        $(this).attr("disabled", "true");

        _validarPregunta_105();
    } else {
        $(this).attr("disabled", "true");
        $("#closePopup").click();
        _init_105();
    }
}

function _validarPregunta_105() {
    validarInputs(
        { form: '#preguntaImpresion', orden: '1' },
        habilitarFormato_105,
        function () {
            let planilla = cerosIzq($('#numComprobante_105').val(), 6);
            let detallado = espaciosIzq($('#detallado').val(), 1)

            let datos = {
                datosh: datosEnvio() + detallado + "|",
                sucursal: $_SUCURSAL_105.cod,
                planilla,
            }

            postData(datos, get_url("app/bombas/BOM111.DLL"))
                .then(on_enviarDatos_105)
                .catch(err => {
                    $('#formatoImpresion').val(null).removeAttr('disabled').trigger('change');
                    loader('hide');
                    validarComprobante();
                });
        }
    )
}

function on_enviarDatos_105(data) {
    console.log(data);
    let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
    let nitEmpresa = $_USUA_GLOBAL[0].NIT.toString().trim();
    let comprobanteInicial = $('#numComprobante_105').val();

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

    if ($_FORMATO_105 == 'PDF') {
        opcionesImpresiones.tipo = 'pdf';
        imprimir(opcionesImpresiones, on_finImpresion_105)
    } else if ($_FORMATO_105 == 'CSV') {
        opcionesImpresiones.tipo = 'csv';
        imprimir(opcionesImpresiones, on_finImpresion_105)
    }
}

function on_finImpresion_105() {
    loader('hide');
    $('#contenido table#tabla-principal tbody').html('');
    $('#contenido table#tabla-secundaria tbody').html('');
    $('#formatoImpresion').val(null).removeAttr('disabled').trigger('change');
    $('#closePopup').click();
    _init_105();
}