var $_TERCEROS_013, $_LISTADO_013, $_FORMATO;

(() => {
    _inputControl('reset');
    _inputControl('disabled');

    loader("show")

    _crearJsonTerceros_013();

    _toggleF8([
        { input: 'tercero', app: '013', funct: _ventanaTerceros_13 }
    ]);
})();

function _crearJsonTerceros_013() {
    postData({ datosh: datosEnvio() }, get_url("app/bombas/CON802.DLL"))
        .then(data => {
            $_TERCEROS_013 = data.TERCEROS;
            _getSucursales_13();
        })
        .catch(err => {
            loader("hide")
            console.log(err)
            _toggleNav()
        })
}

function _getSucursales_13() {
    postData({ datosh: datosEnvio() }, get_url("app/contab/CON823.DLL"))
        .then(res => {
            loader("hide")
            let array = [];
            res.SUCURSAL.forEach(element => {
                array.push({ cod: element.CODIGO, descripcion: element.DESCRIPCION })
            });

            _vetanaSucursales_13(array);
        })
        .catch(err => {
            loader("hide")
            console.log(err);
            _toggleNav()
        })
}

function _vetanaSucursales_13(data) {
    _ventanaDatos({
        titulo: 'Busqueda sucursales',
        columnas: ["cod", "descripcion"],
        data,
        callback_esc: _toggleNav,
        callback: (data) => {
            document.getElementById("sucursal").value = data.cod;
            document.getElementById("descripcion").value = data.descripcion;
            _ventanaFormatoBom13();
        }
    });
}

function _ventanaFormatoBom13() {
    let selecion = $_FORMATO == "CSV" ? 1 : 0;

    let array = [
        { value: 1, text: "En formato .CSV" }
    ]

    POPUP(
        {
            array,
            titulo: "Formato de impresion",
            indices: [{ id: "value", label: "text" }],
            seleccion: selecion,
            callback_f: _getSucursales_13,
        },
        validarFormato
    );
}

function validarFormato(seleccionado) {
    if (seleccionado.value == "2") $_FORMATO = "CSV";
    var fecha = new Date();
    var year = fecha.getFullYear();
    var mes = fecha.getMonth() + 1;
    var dia = fecha.getDate();

    $("#añoInicial, #añoFinal").val(year);
    $("#mesInicial, #mesFinal").val(mes);
    $("#diaInicial, #diaFinal").val(dia);
    validarPrimeraFase_013("1");
}

function validarPrimeraFase_013(orden) {
    validarInputs(
        {
            form: '#fase1',
            orden: orden
        },
        _ventanaFormatoBom13,
        _validarTercero_013
    )
}

function _validarTercero_013() {
    var codTercero = cerosIzq($('#tercero_013').val(), 10);
    var validacion = buscarTercero_013(codTercero);
    if (validacion != false) {
        _enviarDatos_013();
    } else {
        $('#tercero_013').val('');
        plantillaError('99', '01', '-', function () { validarPrimeraFase_013('7'); });
    }
}

function _enviarDatos_013() {
    var sesion = localStorage.Sesion;

    var añoInicial = cerosIzq($('#añoInicial').val(), 2);
    var mesInicial = cerosIzq($('#mesInicial').val(), 2)
    var diaInicial = cerosIzq($('#diaInicial').val(), 2)
    var fechaInicial = añoInicial + mesInicial + diaInicial;

    var añoFinal = cerosIzq($('#añoFinal').val(), 2);
    var mesFinal = cerosIzq($('#mesFinal').val(), 2)
    var diaFinal = cerosIzq($('#diaFinal').val(), 2)
    var fechaFinal = añoFinal + mesFinal + diaFinal;

    var tercero = cerosIzq($('#tercero_013').val(), 10);

    var datos_envio = datosEnvio();
    datos_envio += fechaInicial;
    datos_envio += '|';
    datos_envio += fechaFinal;
    datos_envio += '|';
    datos_envio += tercero + "|";

    console.debug(datos_envio);
    loader('show');
    postData({ datosh: datos_envio }, get_url("app/bombas/BOMB13.DLL"))
        .then(on_enviarDatos_013)
        .catch(err => {
            loader('hide');
            validarPrimeraFase_013('1');
        })
}

function on_enviarDatos_013(data) {
    console.debug(data)

    let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
    var nitTercero = $('#tercero_013').val();

    data.TOTALES.push(nombreEmpresa)
    data.TOTALES.push(nitTercero)

    imprimir({
        datos: data,
        tipo: 'csv',
        formato: 'bombas/bomb13.formato.html',
        nombre: 'LISTADO-VALESxCLIENTE-' + localStorage.Sesion
    }, finImpresion_013)

}

function finImpresion_013() {
    loader('hide');
    $('#contenido table#tabla-principal tbody').html('');
    _ventanaFormatoBom13();
}

function _ventanaTerceros_13(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos_lite_v2({
            titulo: 'Busqueda terceros',
            data: $_TERCEROS_013,
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
                $('#tercero_013').focus();
            },
            callback: function (data) {
                $('#tercero_013').val(data.COD.trim());
                _enterInput('#tercero_013');
            }
        });
    }
}

function buscarTercero_013(codigo) {
    var retornar = false;
    for (var i in $_TERCEROS_013) {
        if ($_TERCEROS_013[i].COD.trim().toLowerCase() == codigo.trim().toLowerCase()) {
            retornar = $_TERCEROS_013[i];
            break;
        }
    }

    return retornar;
}
