var CON110L1 = [];
$(document).ready(() => {
    if ($_USUA_GLOBAL[0].TIPO_EMPRE != 'H') $('#DATOALMACEN_CON110L1').hide();
    _inputControl('reset');
    _inputControl('disabled');
    obtenerDatosCompletos({nombreFd: 'SUCURSALES'}, data => { 
        data = data.SUCURSAL;
        data.pop();
        CON110L1.SUCURSALES = data;
        obtenerDatosCompletos({nombreFd: 'LOCALIZACION'}, data => { 
            data = data.LOCALIZACION;
            data.pop();
            CON110L1.ALMACENES = data;
            _evaluarnovedad_CON110L1();
        }, 'OFF');
    }, 'ON');
    _toggleF8([
        { input: 'codigo', app: 'CON110L1', funct: _ventanaSucursales },
        { input: 'almacen', app: 'CON110L1', funct: _ventanaAlmacenes },
    ])
})

function _ventanaSucursales(e){
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE SUCURSALES",
            columnas: ["CODIGO", "DESCRIPCION", "ALMACEN"],
            data: CON110L1.SUCURSALES,
            callback_esc: function () {
                $("#codigo_CON110L1").focus();
            },
            callback: function (data) {
                $('#codigo_CON110L1').val(data.CODIGO);
                _enterInput('#codigo_CON110L1');
            }
        });
    }
}

function _ventanaAlmacenes(e){
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE ALMACENES",
            columnas: ["CODIGO", "DESCRIPCION", "RESPONSABLE"],
            data: CON110L1.ALMACENES,
            callback_esc: function () {
                $("#almacen_CON110L1").focus();
            },
            callback: function (data) {
                $('#almacen_CON110L1').val(data.CODIGO);
                _enterInput('#almacen_CON110L1');
            }
        });
    }
}

function _evaluarnovedad_CON110L1() {
    CON850(data => {
        switch (data.id) {
            case '7':
            case '8':
            case '9':
                $('#novedad_CON110L1').val(data.id + ' - ' + data.descripcion);
                CON110L1.NOVEDADW = data.id;
                _evaluarcodsucur_CON110L1();
                break;
            default:
                _toggleNav();
                break;
        }
    })
}

function _evaluarcodsucur_CON110L1() {
    validarInputs({
        form: '#VALIDAR1_CON110L1',
        orden: "1"
    },
        () => { _evaluarnovedad_CON110L1() },
        () => {
            CON110L1.CODSUCUR = $('#codigo_CON110L1').val();
            let URL = get_url("APP/CONTAB/CON110L1.DLL");
            postData({ datosh: datosEnvio() + '1|' + CON110L1.CODSUCUR + '|' }, URL)
                .then(data => {
                    switch (CON110L1.NOVEDADW) {
                        case '7':
                            CON851('', '00', null, 'error', 'Error');
                            _evaluarcodsucur_CON110L1();
                            break;
                        case '8':
                            CON110L1.DESCRIPSUCUR = data.CONSULTA[0].DESCRIP_SUCUR;
                            CON110L1.ALMACENSUCUR = data.CONSULTA[0].ALMACEN_SUCUR;
                            $('#descripcion_CON110L1').val(CON110L1.DESCRIPSUCUR);
                            _evaluardescripcion_CON110L1();
                            break;
                        case '9':
                            CON110L1.DESCRIPSUCUR = data.CONSULTA[0].DESCRIP_SUCUR;
                            CON110L1.ALMACENSUCUR = data.CONSULTA[0].ALMACEN_SUCUR;
                            $('#descripcion_CON110L1').val(CON110L1.DESCRIPSUCUR);
                            CON851P('01', () => { _evaluardescripcion_CON110L1() }, () => {
                                let URL = get_url("APP/CONTAB/CON110L1.DLL");
                                postData({ datosh: datosEnvio() + '5|' + CON110L1.CODSUCUR + '|' + CON110L1.DESCRIPSUCUR.trim() + '|' }, URL)
                                    .then(data => {
                                        CON851('', 'Se ha eliminado el registro', null, 'success', 'Exito');
                                        _toggleNav();
                                    })
                                    .catch(err => {
                                        console.debug(err);
                                    })
                            });
                            break;
                    }
                })
                .catch(err => {
                    console.debug(err);
                    if (CON110L1.NOVEDADW == '7') {
                        _evaluardescripcion_CON110L1();
                    } else {
                        _evaluarcodsucur_CON110L1();
                    }
                })
        }
    )
}

function _evaluardescripcion_CON110L1() {
    validarInputs({
        form: '#VALIDAR2_CON110L1',
        orden: "1"
    },
        () => { _evaluarcodsucur_CON110L1() },
        () => {
            CON110L1.DESCRIPSUCUR = $('#descripcion_CON110L1').val();
            if (CON110L1.DESCRIPSUCUR.trim() == '') {
                CON851('', '02', null, 'error', 'Error');
                _evaluardescripcion_CON110L1();
            } else {
                if ($_USUA_GLOBAL[0].TIPO_EMPRE != 'H') {
                    _confirmar_CON110L1();
                } else {
                    $('#almacen_CON110L1').val(CON110L1.ALMACENSUCUR);
                    _evaluaralmacen_CON110L1();
                }
            }
        }
    )
}

function _evaluaralmacen_CON110L1() {
    validarInputs({
        form: '#VALIDAR3_CON110L1',
        orden: "1"
    },
        () => { _evaluardescripcion_CON110L1() },
        () => {
            CON110L1.ALMACENSUCUR = $('#almacen_CON110L1').val();
            let URL = get_url("APP/CONTAB/CON110L1.DLL");
            postData({ datosh: datosEnvio() + '2|' + CON110L1.CODSUCUR + '|' + CON110L1.DESCRIPSUCUR.trim() + '|' + CON110L1.ALMACENSUCUR + '|' }, URL)
                .then(data => {
                    CON110L1.ALMACENSUCUR = data.CONSULTA[0].DESCRIP_SUCUR;
                    CON110L1.ALMACENSUCUR = $('#almacen_CON110L1').val();
                    _confirmar_CON110L1();
                })
                .catch(err => {
                    console.debug(err);
                    _evaluaralmacen_CON110L1();
                })
        }
    )
}

function _confirmar_CON110L1() {
    CON851P('01', () => { _evaluardescripcion_CON110L1() }, () => {
        if (CON110L1.NOVEDADW == '7') {
            let URL = get_url("APP/CONTAB/CON110L1.DLL");
            postData({ datosh: datosEnvio() + '3|' + CON110L1.CODSUCUR + '|' + CON110L1.DESCRIPSUCUR.trim() + '|' + CON110L1.ALMACENSUCUR + '|' }, URL)
                .then(data => {
                    CON851('', 'Se ha guardado el registro', null, 'success', 'Exito');
                    _toggleNav();
                })
                .catch(err => {
                    console.debug(err);
                })
        } else {
            let URL = get_url("APP/CONTAB/CON110L1.DLL");
            postData({ datosh: datosEnvio() + '4|' + CON110L1.CODSUCUR + '|' + CON110L1.DESCRIPSUCUR.trim() + '|' + CON110L1.ALMACENSUCUR + '|' }, URL)
                .then(data => {
                    CON851('', 'Se ha modificado el registro', null, 'success', 'Exito');
                    _toggleNav();
                })
                .catch(err => {
                    console.debug(err);
                })
        }
    });
}