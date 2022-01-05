var $_FORMATO_109, $_LISTADO_109,
    $_RANGO = [], $_IDX_ACTUAL = 0;

(() => {
    loader('hide');
    _inputControl('reset');
    _inputControl('disabled');

    _getSucursales_109();
})();

function _getSucursales_109() {
    postData({ datosh: datosEnvio() }, get_url("app/contab/CON823.DLL"))
        .then(res => {
            let array = [];
            res.SUCURSAL.forEach(element => {
                array.push({ cod: element.CODIGO, descripcion: element.DESCRIPCION })
            });

            _vetanaSucursales_109(array);
        })
        .catch(err => {
            console.log(err);
            _toggleNav()
        })
}

function _vetanaSucursales_109(data) {
    _ventanaDatos({
        titulo: 'Busqueda sucursales',
        columnas: ["cod", "descripcion"],
        data,
        callback_esc: _toggleNav,
        callback: (data) => {
            document.getElementById("sucursal").value = data.cod;
            document.getElementById("descripcion").value = data.descripcion;
            _ventanaFormatoBom109();
        }
    });
}

function _ventanaFormatoBom109() {
    let selecion = $_FORMATO_109 == "CSV" ? 2 : 1;

    let array = [
        { value: 1, text: "En formato .PDF" },
        { value: 2, text: "En formato .CSV" }
    ]

    POPUP(
        {
            array,
            titulo: "Formato de impresion",
            indices: [{ id: "value", label: "text" }],
            seleccion: selecion,
            callback_f: _getSucursales_109,
        },
        validarFormato
    );
}

function validarFormato(seleccionado) {
    let cod = document.getElementById("sucursal").value;
    let datos = {
        datosh: datosEnvio() + cod + "|"
    }

    if (seleccionado.value == "1") $_FORMATO_109 = 'PDF';
    else if (seleccionado.value == "2") $_FORMATO_109 = 'CSV';


    postData(datos, get_url("app/bombas/BOM109.DLL"))
        .then(data => {
            var res = data.split('|');
            $('#comprobanteInicial').val(res[0].trim().replace(/^0+/, ''))
            $('#comprobanteFinal').val(res[1].trim())
            validarFase1_109('1');
        })
        .catch(err => {
            console.log(err)
            _ventanaFormatoBom109();
        })
}

function validarFase1_109(orden) {
    validarInputs(
        {
            form: '#fase1',
            orden: orden
        },
        _ventanaFormatoBom109,
        _formatRango_109
    )
}

function _formatRango_109() {
    var comprobanteInicial = document.getElementById('comprobanteInicial').value.padStart(6, "0"),
        comprobanteFinal = document.getElementById('comprobanteFinal').value.padStart(6, "0"),
        actual = comprobanteInicial;


    while (actual <= parseFloat(comprobanteFinal)) {
        $_RANGO.push(actual.toString().padStart(6, "0"))
        actual = parseFloat(actual) + 1;
    }

    _enviarDatos_109()
}

function _enviarDatos_109() {
    validarDetallado_109()
}

function validarDetallado_109() {
    validarInputs(
        {
            form: '#fase2',
            orden: '1'
        },
        () => {
            $('#contenido table#tabla-principal tbody').html('');
            $('#contenido table#tabla-secundaria tbody').html('');
            _ventanaFormatoBom109();
            $_RANGO = [];
            $_IDX_ACTUAL = 0;
        },
        on_validarDetallado_109
    )
}

function on_validarDetallado_109() {
    let sucursal = document.getElementById("sucursal").value;
    let planilla = $_RANGO[$_IDX_ACTUAL]
    let detallado = espaciosIzq($('#detallado').val(), 1)

    let datos = {
        datosh: datosEnvio() + detallado + '|',
        sucursal,
        planilla
    }

    console.log(datos)

    loader('show');
    postData(datos, get_url("app/bombas/BOM111.DLL"))
        .then(on_enviarDatos_109)
        .catch(err => {
            loader('hide');
            console.log(err);
            validarFase1_109('1')
        })
}

function on_enviarDatos_109(data) {
    let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
    let nitEmpresa = $_USUA_GLOBAL[0].NIT.toString().trim();
    // let comprobanteInicial = $('#comprobanteInicial').val();

    data.TOTALES.push(nombreEmpresa);
    data.TOTALES.push(nitEmpresa);
    data.TOTALES.push($_RANGO[$_IDX_ACTUAL]);
    data.TOTALES.push($_USUA_GLOBAL[0].NIT.toString().padStart(10, "0"));

    var date = new Date(),
        str = date.getFullYear().toString() + (date.getMonth() + 1).toString() + date.getDate().toString() + date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString();

    var opcionesImpresiones = {
        datos: data,
        tipo: '',
        formato: 'bombas/bom109.formato.html',
        nombre: 'LISTADO-VENT-COMBUST-' + str
    };

    if ($_FORMATO_109 == 'PDF') {
        opcionesImpresiones.tipo = 'pdf';
        imprimir(opcionesImpresiones, finImpresion_109)
    } else if ($_FORMATO_109 == 'CSV') {
        opcionesImpresiones.tipo = 'csv';
        imprimir(opcionesImpresiones, finImpresion_109)
    }

}

function finImpresion_109() {
    console.log($_IDX_ACTUAL, $_RANGO.length - 1)
    loader('hide');
    if ($_IDX_ACTUAL != ($_RANGO.length - 1)) {
        $_IDX_ACTUAL = $_IDX_ACTUAL + 1;
        _enviarDatos_109()
    } else {
        $('#contenido table#tabla-principal tbody').html('');
        $('#contenido table#tabla-secundaria tbody').html('');
        _ventanaFormatoBom109();
    }
}