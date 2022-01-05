var $_FORMATO_014, $_LISTADO_014;

(()=>{
    loader('hide');
    _inputControl('reset');
    _inputControl('disabled');

    _ventanaFormatoBom14()
})();

function _ventanaFormatoBom14() {
    let selecion = $_FORMATO_014 == "CSV" ? 2 : 1;

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
            callback_f: _toggleNav,
        },
        validarFormato_014
    );
}

function validarFormato_014(seleccionado) {
        if (seleccionado.value == "1") $_FORMATO_014 = "PDF";
        else if (seleccionado.value == "2") $_FORMATO_014 = "CSV";

        var fecha = new Date();
        var year = fecha.getFullYear();
        year = String(year).substr(2, 4);
        var mes = fecha.getMonth() + 1;
        var dia = fecha.getDate();

        $("#añoInicial, #añoFinal").val(year);
        $("#mesInicial, #mesFinal").val(mes);
        $("#diaInicial, #diaFinal").val(dia);
        validarFechas_014("1");
}

function validarFechas_014(orden) {
    validarInputs(
        {
            form: '#validarFechas',
            orden: orden
        },
        function () { _ventanaFormatoBom14(); },
        _enviarDatos_014
    )
}

function _enviarDatos_014() {
    var sesion = localStorage.Sesion;

    var añoInicial = cerosIzq($('#añoInicial').val(), 2);
    var mesInicial = cerosIzq($('#mesInicial').val(), 2)
    var diaInicial = cerosIzq($('#diaInicial').val(), 2)
    var fechaInicial = añoInicial + mesInicial + diaInicial;

    var añoFinal = cerosIzq($('#añoFinal').val(), 2);
    var mesFinal = cerosIzq($('#mesFinal').val(), 2)
    var diaFinal = cerosIzq($('#diaFinal').val(), 2)
    var fechaFinal = añoFinal + mesFinal + diaFinal;

    var datos_envio = datosEnvio();
    datos_envio += fechaInicial;
    datos_envio += '|';
    datos_envio += fechaFinal + "|";

    loader('show');
    console.debug(datos_envio)
    postData({ datosh: datos_envio }, get_url("app/bombas/BOMB14.DLL"))
        .then(on_enviarDatos_014).catch(err => {
            loader('hide');
            validarFechas_014('6');
        })
}

function on_enviarDatos_014(data) {
    var añoInicial = cerosIzq($('#añoInicial').val(), 2);
    var mesInicial = cerosIzq($('#mesInicial').val(), 2);
    mesInicial = evaluarMes(mesInicial);
    var diaInicial = cerosIzq($('#diaInicial').val(), 2);
    let fechaDesde = 'Desde: ' + mesInicial + ' ' + diaInicial + '/' + añoInicial;

    var añoFinal = cerosIzq($('#añoFinal').val(), 2);
    var mesFinal = cerosIzq($('#mesFinal').val(), 2)
    mesFinal = evaluarMes(mesFinal);
    var diaFinal = cerosIzq($('#diaFinal').val(), 2)
    let fechaHasta = 'Hasta: ' + mesFinal + ' ' + diaFinal + '/' + añoFinal;

    let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();

    data.TOTALES.push(nombreEmpresa)
    data.TOTALES.push(fechaDesde)
    data.TOTALES.push(fechaHasta)
    data.TOTALES.push($_USUA_GLOBAL[0].NIT.toString().padStart(10, "0"))

    var opcionesImpresiones = {
        datos: data,
        tipo: '',
        formato: 'bombas/bomb14.formato.html',
        nombre: 'LISTADO-GALONAJExVEND-' + localStorage.Sesion
    };

    if ($_FORMATO_014 == 'PDF') {
        opcionesImpresiones.tipo = 'pdf';
        imprimir(opcionesImpresiones, finImpresion_014)
    } else if ($_FORMATO_014 == 'CSV') {
        opcionesImpresiones.tipo = 'csv';
        imprimir(opcionesImpresiones, finImpresion_014)
    }
}

function finImpresion_014() {
    loader('hide');
    $('#contenido table tbody').html('');
    _ventanaFormatoBom14();
}

