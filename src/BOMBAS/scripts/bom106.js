var $_SURTIDORES_106, $_DATOS_TABLA_106, $_INFO_COMP_106, $_SUCURSAL_106, $_VENDEDORES_106;

const { ventanaFiltro } = require("../../BOMBAS/scripts/ventanaFiltroComp.js");

(() => {
    _init_106();
})();

function _init_106() {
    _inputControl('reset');
    _inputControl('disabled');
    $('#tablaVenta tbody').html('')
    $('#tablaVales tbody').html('')

    $('#galonajeTablaVenta').html('');
    $('#ventaTablaVenta').html('');
    $('#totalTablaVales').html('');

    loader("show");
    _getSucursales_106();

    _toggleF8([
        { input: 'numComprobante', app: '106', funct: _ventanaComp_106 },
    ]);
}

function _getSucursales_106() {
    postData({ datosh: datosEnvio() }, get_url("app/contab/CON823.DLL"))
        .then(res => {
            loader("hide");

            let array = [];
            res.SUCURSAL.forEach(element => {
                array.push({ cod: element.CODIGO, descripcion: element.DESCRIPCION })
            });

            _vetanaSucursales_106(array);
        })
        .catch(err => {
            loader("hide");
            console.log(err);
            _toggleNav()
        })
}

function _vetanaSucursales_106(data) {
    _ventanaDatos({
        titulo: 'Busqueda sucursales',
        columnas: ["cod", "descripcion"],
        data,
        callback_esc: _toggleNav,
        callback: (data) => {
            $_SUCURSAL_106 = data;
            validarComprobante();
        }
    });
}

function _ventanaComp_106(e) {
    if (e.type == "keydown" && e.which == 119) {
        $("#numComprobante_106").attr("disabled", "true");
        set_Event_validar("#validarComprobante", "off");

        ventanaFiltro({ callback: _terminarVentanaFiltro_106 });
    }
}

function _terminarVentanaFiltro_106(data) {
    $_SUCURSAL_106.cod = data.suc;
    document.getElementById("numComprobante_106").value = data.nro || "";
    validarComprobante();
}

function validarComprobante() {
    validarInputs(
        { form: '#validarComprobante', orden: '1' },
        _toggleNav,
        _get_datos_106
    )
}

function _get_datos_106() {
    loader("show");

    let planilla = $("#numComprobante_106").val()
        ? $("#numComprobante_106").val()
        : "0";

    let datos = {
        datosh: datosEnvio(),
        sucursal: $_SUCURSAL_106.cod,
        planilla,
    };

    postData(datos, get_url("app/bombas/BOM105.DLL"))
        .then((data) => {
            $_SURTIDORES_106 = data.SURTIDORES;
            $_DATOS_TABLA_106 = data["TBLA-DEUD"];
            $_INFO_COMP_106 = data.TOTALES;
            _llenarDatos_106();
            loader("hide");
        })
        .catch((err) => {
            loader("hide");
            validarComprobante();
        });
}

function _llenarDatos_106() {
    let fecha = $_INFO_COMP_106['1'].trim();
    let año = fecha.substring(0, 4)
    $('#añoInicial').val(año);

    let mes = fecha.substring(4, 6);
    $('#mesInicial').val(mes);

    let dia = fecha.substring(6, 8);
    $('#diaInicial').val(dia);

    let turno = $_INFO_COMP_106['2'].trim();
    $('#turno').val(turno);

    let detalle = $_INFO_COMP_106['3'].trim();
    $('#detalle').val(detalle);

    let totalGalonaje = $_INFO_COMP_106['6'].trim();
    $('#galonajeTablaVenta').html(totalGalonaje);

    let totalVenta = $_INFO_COMP_106['7'].trim();
    $('#ventaTablaVenta').html(totalVenta);
    $('#totalCombustible').val(totalVenta);

    let totalFinanciacion = $_INFO_COMP_106['8'].trim();
    $('#totalFinanciacion').val(totalFinanciacion);

    let totalVales = $_INFO_COMP_106['9'].trim();
    $('#totalTablaVales').html(totalVales);
    $('#totalCreditos').val(totalVales);

    let totalCheques = $_INFO_COMP_106['10'].trim();
    $('#totalCheques').val(totalCheques);

    let totalEfectivo = $_INFO_COMP_106['11'].trim();
    $('#totalEfectivo').val(totalEfectivo);

    _llenarTablaSurtidores_106();
}

function _llenarTablaSurtidores_106() {
    for (var i in $_SURTIDORES_106) {
        let item = $_SURTIDORES_106[i].SURTI.trim() ? $_SURTIDORES_106[i].SURTI.trim() : false;
        if (item) {
            $('#tablaVenta tbody').append(''
                + '<tr>'
                + ' <td>' + item + '</td>'
                + ' <td>' + $_SURTIDORES_106[i].CANTID.trim() + '</td>'
                + ' <td>' + $_SURTIDORES_106[i].VALOR.trim() + '</td>'
                + '</tr>'
            )
        }
    }

    _llenarTablaVales_106();
}

function _llenarTablaVales_106() {
    for (var i in $_DATOS_TABLA_106) {
        let item = parseInt(i) + parseInt(1);
        $('#tablaVales tbody').append(''
            + '<tr>'
            + ' <td>' + cerosIzq(item, 3) + '</td>'
            + ' <td>' + $_DATOS_TABLA_106[i].COD.trim() + '</td>'
            + ' <td>' + $_DATOS_TABLA_106[i].NIT.trim() + '</td>'
            + ' <td>' + $_DATOS_TABLA_106[i].DOCUM.trim() + '</td>'
            + ' <td>' + $_DATOS_TABLA_106[i].VLR.trim() + '</td>'
            + ' <td>' + $_DATOS_TABLA_106[i].DESCRIP.trim().replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, ' ') + '</td>'
            + '</tr>'
        )
    }

    _validacionFinal_106();
}

function _validacionFinal_106() {
    CON850_P(function (e) {
        if (e.id == 'S') {
            loader('show');

            let planilla = $('#numComprobante_106').val() ? $('#numComprobante_106').val() : '0';
            let datos = {
                datosh: datosEnvio(),
                sucursal: $_SUCURSAL_106.cod,
                planilla,
                fecha: "",
                paso: "1"
            }

            postData(datos, get_url("app/bombas/BOM106.DLL"))
                .then(data => {
                    jAlert(
                        {
                            titulo: 'Correcto ',
                            mensaje: 'El comprobante <b>' + $('#numComprobante_106').val() + '</b> ha sido anulado.'
                        },
                        () => {
                            _init_106()
                            loader('hide');
                        }
                    );
                })
                .catch(err => {
                    loader('hide');
                    _init_106();
                })
        } else {
            _init_106();
        }
    }, {
        msj: '02',
        overlay_show: false
    })
}