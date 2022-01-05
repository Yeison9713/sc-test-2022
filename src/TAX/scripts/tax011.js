var $_TAX011 = {
    NOVEDAD: false,
    MODALIDADES: [],
    ARTICULOS: [],

};


var sostenimiento_011 = new IMask(
    document.getElementById('sostenimiento_011'),
    { mask: Number, min: 0, max: 9999999999, scale: 0, thousandsSeparator: ',', radix: '.' }
);


(() => {
    loader('show');
    _inputControl('reset');
    _inputControl('disabled');

    _toggleF8([
        { input: 'modalidad', app: '011', funct: _ventanaModalidades_tax011 },
        { input: 'codArticulo', app: '011', funct: _ventanaArticulos_tax011 },
        { input: 'cuentaDebito', app: '011', funct: _ventanaDebito_tax011 },
        { input: 'cuentaCredito', app: '011', funct: _ventanaCredito_tax011 },
    ]);

    modalidades_tax011();
})();

function _ventanaModalidades_tax011(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Busqueda de modalidades',
            columnas: ["CODIGO", "DESCRIP"],
            data: $_TAX011.MODALIDADES,
            callback_esc: function () {
                $('#modalidad_011').focus();
            },
            callback: function (data) {
                document.getElementById('modalidad_011').value = data.CODIGO.trim()
                _enterInput('#modalidad_011');
            }
        });
    }
}

function _ventanaArticulos_tax011(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Busqueda de articulos',
            columnas: ["TIP", "GRP", "NUMERO", "DESCRIP"],
            data: $_TAX011.ARTICULOS,
            callback_esc: function () {
                $('#codArticulo_011').focus();
            },
            callback: function (e) {
                let cod = e.TIP.trim() || "0",
                    grp = e.GRP,
                    numero = e.NUMERO.trim(),
                    articulo = cod + grp + numero;

                document.getElementById('codArticulo_011').value = articulo.trim()
                _enterInput('#codArticulo_011');
            }
        });
    }
}

function _ventanaDebito_tax011(e){
    console.log(e)
    if ((e.type == "keydown" && e.which == 119) || e.type == "click") {
      _ventanaDatos({
        titulo: "Busqueda de cuentas",
        columnas: ["CTA", "TIPO", "DESCRIP"],
        data: $_TAX011.MAESTROS,
        callback_esc: function () {
          $("#cuentaDebito_011").focus();
        },
        callback: function (e) {
          $("#cuentaDebito_011").val(e.CTA);
          _enterInput("#cuentaDebito_011");
        },
      });
    }
}

function _ventanaCredito_tax011(e){
    if ((e.type == "keydown" && e.which == 119) || e.type == "click") {
      _ventanaDatos({
        titulo: "Busqueda de cuentas",
        columnas: ["CTA", "TIPO", "DESCRIP"],
        data: $_TAX011.MAESTROS,
        callback_esc: function () {
          $("#cuentaCredito_011").focus();
        },
        callback: function (e) {
          $("#cuentaCredito_011").val(e.CTA);
          _enterInput("#cuentaCredito_011");
        },
      });
    }
}

function modalidades_tax011() {
    postData({ datosh: datosEnvio() }, get_url("app/TAX/TAX815.DLL"))
        .then(data => {
            $_TAX011.MODALIDADES = data.Modalidad;
            $_TAX011.MODALIDADES.pop()
            articulos_tax011()
        }).catch(err => {
            _toggleNav();
        })
}

function articulos_tax011() {
    postData({ datosh: datosEnvio() }, get_url("app/TAX/INV803.DLL"))
        .then(data => {
            $_TAX011.ARTICULOS = data.Articulos;
            $_TAX011.ARTICULOS.pop()
            _getMaestros_tax011();
        }).catch(err => {
            _toggleNav();
        });
}

function _getMaestros_tax011(){
    postData({ datosh: datosEnvio() }, get_url("app/TAX/CON801.DLL"))
      .then((data) => {
          $_TAX011.MAESTROS = data.CUENTAS;
          $_TAX011.MAESTROS.pop();
          CON850(_evaluarNovedad_tax011);
          loader("hide");
      })
      .catch((err) => {
        _toggleNav();
      });
}

function _evaluarNovedad_tax011(data) {
    _inputControl('reset');
    _inputControl('disabled');

    if (data.id != 'F') {
        $_TAX011.NOVEDAD = data.id
        document.getElementById('novedad_tax011').value = data.id + ' - ' + data.descripcion
        evaluarModalidad_tax011();
    } else {
        _toggleNav();
    }
}

function evaluarModalidad_tax011() {
    validarInputs(
        {
            form: '#faseModalidad',
            orden: '1'
        },
        () => { CON850(_evaluarNovedad_tax011) },
        _validadModalidad_tax011
    )
}

function _validadModalidad_tax011() {
    var idModalidad = document.getElementById('modalidad_011').value,
        busqueda = $_TAX011.MODALIDADES.find(e => {
            return e.CODIGO == idModalidad.toUpperCase();
        })

    if (busqueda && $_TAX011.NOVEDAD != '7') {
        
        document.getElementById('modalidadDescrip_011').value = busqueda.DESCRIP.trim()
        document.getElementById('codArticulo_011').value = busqueda['COD-ART'].trim()
        document.getElementById('cuentaDebito_011').value = busqueda['CTA-DEB'].trim();
        document.getElementById('cuentaCredito_011').value = busqueda['CTA-CRE'].trim();

        sostenimiento_011.unmaskedValue = busqueda.SOSTENI

        
        var busquedaArticulo = buscarArticulo_011(busqueda['COD-ART'].trim());
        if (busquedaArticulo) document.getElementById('descripArticulo_011').value = busquedaArticulo.DESCRIP.trim()

        if ($_TAX011.NOVEDAD == '8') {
            evaluarDescrp_011('1')
        } else {
            CON850_P(function (e) {
                if (e.id == 'S') {
                    var datos_envio = datosEnvio();
                    datos_envio += $_TAX011.NOVEDAD;
                    datos_envio += "|";
                    datos_envio += idModalidad;
                    datos_envio += "|";
                    postData({ datosh: datos_envio }, get_url("app/TAX/TAX011.DLL"))
                        .then(data => {
                            jAlert({ titulo: 'Notificacion', mensaje: "Eliminado correctamente" }, modalidades_tax011);
                        })
                        .catch(err => {
                            evaluarModalidad_tax011();
                        })
                } else {
                    evaluarModalidad_tax011();
                }
            }, {
                msj: '02'
            });
        }
    } else {
        if ($_TAX011.NOVEDAD == '7' && !busqueda) {
            evaluarDescrp_011();
        } else {
            plantillaToast('99', '01', null, 'warning');
            evaluarModalidad_tax011()
        }
    }
}

function evaluarDescrp_011(orden) {
    validarInputs(
        {
            form: '#faseDescripcion',
            orden: orden
        },
        evaluarModalidad_tax011,
        _evaluarCuota_011
    )
}


function _evaluarCuota_011() {
    validarInputs(
        {
            form: '#validarCuota',
            orden: '1'
        },
        () => { evaluarDescrp_011('1') },
        _evaluarArticulo_011
    )
}

function _evaluarArticulo_011() {
    validarInputs(
        {
            form: '#validarArticulo',
            orden: '1'
        },
        _evaluarCuota_011,
        () => {
            var codigo = document.getElementById('codArticulo_011').value,
                busquedaArticulo = buscarArticulo_011(codigo);

            if (busquedaArticulo) {
                document.getElementById('descripArticulo_011').value = busquedaArticulo.DESCRIP.trim();
                if ($_USUA_GLOBAL[0].NIT == 892000113) _validacionFinal_011(); else _cuentaDebito_011();
            } else {
                plantillaToast('99', '01', null, 'warning');
                _evaluarArticulo_011()
            }

        }
    )
}

function _cuentaDebito_011(){
    validarInputs(
        {
            form: "#faseDebito_011",
            orden: "1"
        },
        _evaluarArticulo_011,
        ()=>{
            var debito = document.getElementById("cuentaDebito_011").value,
              ctaMayor = debito.substr(0, 4);
            if (ctaMayor == 1305){
                var busqueda = $_TAX011.MAESTROS.find(el => el.CTA.trim() == debito)
                if (busqueda){
                    _cuentaCredito_011();
                }else{
                    jAlert({ titulo: 'Error', mensaje: "Dato invalido - No se encontro cuenta" }, _cuentaDebito_011);
                }
            }else{
                jAlert({ titulo: 'Error', mensaje: "Dato invalido - Cuenta no corresponde" }, _cuentaDebito_011);
            }
        }
    )
}

function _cuentaCredito_011(){
    validarInputs(
        {
            form: "#faseCredito_011",
            orden: "1"
        },
        _evaluarArticulo_011,
        ()=>{
            var credito = document.getElementById("cuentaCredito_011").value, ctaMayor = credito.substr(0, 6);
            if (ctaMayor == 414505){
                var busqueda = $_TAX011.MAESTROS.find(el => el.CTA.trim() == credito)
                if (busqueda){
                    _validacionFinal_011();
                }else{
                    jAlert({ titulo: 'Error', mensaje: "Dato invalido - No se encontro cuenta" }, _cuentaCredito_011);
                }
            }else{
                jAlert({ titulo: 'Error', mensaje: "Dato invalido - Cuenta no corresponde" }, _cuentaCredito_011);
            }
        }
    )
}

function _validacionFinal_011() {
    CON850_P(function (e) {
        if (e.id == 'S') {
            var codModalidad = document.getElementById('modalidad_011').value,
                descripModalidad = document.getElementById('modalidadDescrip_011').value.trim(),
                sostenimiento = sostenimiento_011.unmaskedValue || "0",
                cuentaCredito = document.getElementById('cuentaCredito_011').value,
                cuentaDebito = document.getElementById('cuentaDebito_011').value,
                articulo = document.getElementById('codArticulo_011').value;

            var datos = datosEnvio()
                + $_TAX011.NOVEDAD
                + '|' + codModalidad.toUpperCase()
                + '|' + descripModalidad
                + '|' + sostenimiento.padStart(10, "0")
                + '|' + cuentaDebito
                + '|' + cuentaCredito
                + '|' + articulo.padEnd(18, " ")
                + '|';
            postData({ datosh: datos }, get_url("app/TAX/TAX011.DLL"))
                .then(data => {
                    console.log(data)
                    jAlert({ titulo: 'Notificacion', mensaje: "Modificado correctamente" }, modalidades_tax011);
                })
                .catch(err => {
                    _evaluarArticulo_011();
                })
        } else {
            setTimeout(_evaluarArticulo_011, 500)
        }
    }, {})
}

function buscarArticulo_011(codigo) {
    var busqueda = $_TAX011.ARTICULOS.find(e => {
        let cod = e.TIP.trim() || "0",
            grp = e.GRP,
            numero = e.NUMERO.trim(),
            articulo = cod + grp + numero;

        return articulo == codigo;
    })

    return busqueda;
}