var $_TAX012 = {
    NOVEDAD: false,
    AGENCIAS: [],
    SUCURSALES: []
};

// producidos 
var producidoEmpresa_tax012 = new IMask(
    document.getElementById('producidoEmpresa_tax012'),
    { mask: "00,00", min: 0, max: 9999, scale: 2, radix: ',' }
);

var producidoAgencia_tax012 = new IMask(
    document.getElementById('producidoAgencia_tax012'),
    { mask: "00,00", min: 0, max: 9999, scale: 0, radix: ',' }
);

var producidoPropietario_tax012 = new IMask(
    document.getElementById('producidoPropietario_tax012'),
    { mask: "000,00", min: 0, max: 9999, scale: 0, radix: ',' }
);

// remesas
var remesasEmpresa_tax012 = new IMask(
    document.getElementById('remesasEmpresa_tax012'),
    { mask: "00,00", min: 0, max: 9999, scale: 2, radix: '.' }
);

var remesasAgencia_tax012 = new IMask(
    document.getElementById('remesasAgencia_tax012'),
    { mask: "00,00", min: 0, max: 9999, scale: 0, radix: ',' }
);

var remesasPropietario_tax012 = new IMask(
    document.getElementById('remesasPropietario_tax012'),
    { mask: "000,00", min: 0, max: 9999, scale: 0, radix: ',' }
);

(() => {
    loader('show');
    _inputControl('reset');
    _inputControl('disabled');
    agencias_tax012();
    _toggleF8([
        { input: 'agencia', app: 'tax012', funct: _ventanaAgencias_tax012 },
        { input: 'sucursal', app: 'tax012', funct: _ventanaSucursal_tax012 }
    ]);
})();

function _ventanaAgencias_tax012(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Busqueda de agencias',
            columnas: ["CODIGO", "DESCRIP"],
            data: $_TAX012.AGENCIAS,
            callback_esc: function () {
                $('#agencia_tax012').focus();
            },
            callback: function (data) {
                document.getElementById('agencia_tax012').value = data.CODIGO.trim()
                _enterInput('#agencia_tax012');
            }
        });
    }
}

function _ventanaSucursal_tax012(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Busqueda de sucursales',
            columnas: ["COD", "DESCRIP"],
            data: $_TAX012.SUCURSALES,
            callback_esc: function () {
                $('#sucursal_tax012').focus();
            },
            callback: function (data) {
                document.getElementById('sucursal_tax012').value = data.COD.trim()
                _enterInput('#sucursal_tax012');
            }
        });
    }
}

function agencias_tax012() {
    postData({ datosh: datosEnvio() }, get_url("app/TAX/TAX801.DLL"))
        .then(data => {
            $_TAX012.AGENCIAS = data.Agencias;
            $_TAX012.AGENCIAS.pop();
            sucursales_tax012();
        }).catch(err => {
            _toggleNav();
        })
}

function sucursales_tax012() {
    postData({ datosh: datosEnvio() }, get_url("app/TAX/CON823.DLL"))
        .then(data => {
            $_TAX012.SUCURSALES = data.Sucur;
            $_TAX012.SUCURSALES.pop();
            loader('hide');
            CON850(_evaluarNovedad_tax012);
        }).catch(err => {
            _toggleNav();
        })
}

function _evaluarNovedad_tax012(data) {
    _inputControl('reset');
    _inputControl('disabled');

    if (data.id != 'F') {
        $_TAX012.NOVEDAD = data.id
        document.getElementById('novedad_tax012').value = data.id + ' - ' + data.descripcion
        evaluarAgencia_tax012();
    } else {
        _toggleNav();
    }
}

function evaluarAgencia_tax012() {
    validarInputs(
        {
            form: '#faseAgencia',
            orden: '1'
        },
        () => { CON850(_evaluarNovedad_tax012) },
        _validarAgencia_tax012
    )
}

function _validarAgencia_tax012() {
    var idAgencia = document.getElementById('agencia_tax012').value,
        busqueda = $_TAX012.AGENCIAS.find(e => {
            return e.CODIGO == idAgencia.toUpperCase();
        })

    if (busqueda && $_TAX012.NOVEDAD != '7') {
        document.getElementById('agenciaDescrip_tax012').value = busqueda.DESCRIP.trim()
        producidoEmpresa_tax012.unmaskedValue = busqueda['PRODUCT-EMPR'].trim() ? busqueda['PRODUCT-EMPR'] : '0';
        producidoAgencia_tax012.unmaskedValue = busqueda['PRODUCT-AGEN'].trim() ? busqueda['PRODUCT-AGEN'] : '0';
        var propitearioEmpresa = 100 - (parseFloat(producidoEmpresa_tax012.unmaskedValue) + parseFloat(producidoAgencia_tax012.unmaskedValue));
        producidoPropietario_tax012.unmaskedValue = propitearioEmpresa.toString();

        remesasEmpresa_tax012.unmaskedValue = busqueda['REMESA-EMPR'].trim() ? busqueda['REMESA-EMPR'] : '0';
        remesasAgencia_tax012.unmaskedValue = busqueda['REMESA-AGEN'].trim() ? busqueda['REMESA-AGEN'] : '0';
        var propietarioRemesas = 100 - parseFloat(remesasEmpresa_tax012.unmaskedValue) - parseFloat(remesasAgencia_tax012.unmaskedValue);
        remesasPropietario_tax012.unmaskedValue = propietarioRemesas.toString();

        if ($_TAX012.NOVEDAD == '8') {
            evaluarDescripcionAgencia();
        } else {
            CON850_P(function (e) {
                if (e.id == 'S') {
                    var datos_envio = datosEnvio();
                    datos_envio += $_TAX012.NOVEDAD;
                    datos_envio += "|";
                    datos_envio += idAgencia + "|";
                    postData({ datosh: datos_envio }, get_url("app/TAX/TAX012.DLL"))
                        .then(data => {
                            console.log(data)
                            jAlert({ titulo: 'Notificacion', mensaje: "Eliminado correctamente" }, agencias_tax012);
                        })
                        .catch(err => {
                            console.log(err);
                            evaluarAgencia_tax012();
                        })
                } else {
                    evaluarAgencia_tax012();
                }
            }, {
                msj: '02'
            })
        }
    } else {
        if ($_TAX012.NOVEDAD == '7' && !busqueda) {
            producidoEmpresa_tax012.unmaskedValue = '0';
            producidoAgencia_tax012.unmaskedValue = '0';
            remesasEmpresa_tax012.unmaskedValue = '0';
            remesasAgencia_tax012.unmaskedValue = '0';
            evaluarDescripcionAgencia();
        } else {
            plantillaToast('99', '01', null, 'warning');
            evaluarAgencia_tax012();
        }
    }
}

function evaluarDescripcionAgencia() {
    validarInputs(
        {
            form: "#faseDescripcion",
            orden: "1"
        },
        evaluarAgencia_tax012,
        evaluarProducidoEmpresa
    )
}

function evaluarProducidoEmpresa() {
    validarInputs(
        {
            form: "#faseProducidoEmpresa",
            orden: "1"
        },
        evaluarAgencia_tax012,
        _validarProducidoEmpresa
    )
}

function _validarProducidoEmpresa() {
    if (parseFloat(producidoEmpresa_tax012.unmaskedValue) < 5) {
        plantillaToast('99', '01', null, 'warning');
        evaluarProducidoEmpresa();
    } else {
        evaluarProducidoAgencia();
    }
}

function evaluarProducidoAgencia() {
    validarInputs(
        {
            form: "#faseProducidoAgencia",
            orden: "1"
        },
        evaluarProducidoEmpresa,
        _validarProducidoAgencia
    )
}

function _validarProducidoAgencia() {
    let producidoEmpresa = parseFloat(producidoEmpresa_tax012.unmaskedValue) + parseFloat(producidoAgencia_tax012.unmaskedValue),
        idAgencia = document.getElementById('agencia_tax012').value;
    if (producidoEmpresa > 30) {
        if (idAgencia == '42') {
            evaludarRemesaEmpresa();
        } else {
            plantillaToast('99', '01', null, 'warning');
            evaluarProducidoAgencia();
        }
    } else {
        evaludarRemesaEmpresa();
    }
    producidoEmpresa = 100 - producidoEmpresa;
    producidoPropietario_tax012.unmaskedValue = producidoEmpresa.toString();
}

function evaludarRemesaEmpresa() {
    validarInputs(
        {
            form: "#faseRemesaEmpresa",
            orden: "1"
        },
        evaluarProducidoAgencia,
        () => {
            if (parseFloat(remesasEmpresa_tax012.unmaskedValue) < 5) {
                plantillaToast('99', '01', null, 'warning');
                evaludarRemesaEmpresa();
            } else {
                evaluarRemesaAgencia();
            }
        }
    )
}

function evaluarRemesaAgencia() {
    validarInputs(
        {
            form: "#faseRemesaAgencia",
            orden: "1"
        },
        evaludarRemesaEmpresa,
        () => {
            let remesasPropietari = parseFloat(remesasEmpresa_tax012.unmaskedValue) + parseFloat(remesasAgencia_tax012.unmaskedValue),
                idAgencia = document.getElementById('agencia_tax012').value;
            console.log(remesasPropietari)
            if (remesasPropietari > 60) {
                if (idAgencia == '42') {
                    confirmarTax012();
                } else {
                    plantillaToast('99', '01', null, 'warning');
                    evaluarRemesaAgencia();
                }
            } else {
                evaluarSucursal()
            }
            remesasPropietari = 100 - remesasPropietari;
            remesasPropietario_tax012.unmaskedValue = remesasPropietari.toString();
        }
    )
}

function evaluarSucursal() {
    validarInputs(
        {
            form: "#faseSucursal",
            orden: "1"
        },
        evaluarRemesaAgencia,
        () => {
            var idSucur = document.getElementById('sucursal_tax012').value,
                busqueda = $_TAX012.SUCURSALES.find(e => {
                    return e.COD == idSucur.toUpperCase();
                })
            if (busqueda) {
                document.getElementById('descripSucur_tax012').value = busqueda.DESCRIP;
                confirmarTax012();
            } else {
                plantillaToast('99', '01', null, 'warning');
                evaluarSucursal();
            }
        }
    )
}

function confirmarTax012() {
    CON850_P((e) => {
        console.log(e)
        if (e.id == 'S') {
            var datos_envio = datosEnvio() + $_TAX012.NOVEDAD + "|" + bajarDatosTax012();
            console.log(datos_envio);
            postData({ datosh: datos_envio }, get_url("app/TAX/TAX012.DLL"))
                .then(data => {
                    console.log(data)
                    jAlert({ titulo: 'Notificacion', mensaje: "Modificado correctamente" }, agencias_tax012);
                })
                .catch(err => {
                    console.log(err);
                    evaluarSucursal();
                })
        } else {
            evaluarSucursal();
        }
    }, {})
}

function bajarDatosTax012() {
    return document.getElementById('agencia_tax012').value
        + "|"
        + document.getElementById('agenciaDescrip_tax012').value
        + "|"
        + document.getElementById('producidoAgencia_tax012').value
        + "|"
        + document.getElementById('remesasAgencia_tax012').value
        + "|"
        + document.getElementById('producidoEmpresa_tax012').value
        + "|"
        + document.getElementById('remesasEmpresa_tax012').value
        + "|"
        + document.getElementById('sucursal_tax012').value
        + "|";
}