var $_FORMATO, $_LISTADO;

(() => {
    loader('hide');
    _inputControl('reset');
    _inputControl('disabled');

    $('#logo_url').attr('src', $_USUA_GLOBAL[0].RUTA_LOGO);
    _ventanaFormatoBom108();
})();

function _ventanaFormatoBom108() {
    let selecion = $_FORMATO == "CSV" ? 2 : 1;

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
        validarFormato
    );
}

function validarFormato(seleccionado) {
    if (seleccionado.value == "1") $_FORMATO = 'PDF';
    else if (seleccionado.value == "2") $_FORMATO = 'CSV';

    var fecha = new Date();
    var year = fecha.getFullYear()
    year = String(year).substr(2, 4);
    var mes = fecha.getMonth() + 1;
    var dia = fecha.getDate();

    $('#añoInicial, #añoFinal').val(year);
    $('#mesInicial, #mesFinal').val(mes);
    $('#diaInicial, #diaFinal').val(dia);

    $('#vendedor').val('*');
    $('#isla').val('*');
    $('#turno').val('*');
    $('#imprGalones').val('S');
    validarFechas('1')
}

function validarFechas(orden) {
    validarInputs(
        {
            form: '#validarFechas',
            orden: orden
        },
        _ventanaFormatoBom108,
        _validarFecha_envio
    )
}

function _validarFecha_envio() {
    var añoInicial = cerosIzq($('#añoInicial').val(), 2);
    var mesInicial = cerosIzq($('#mesInicial').val(), 2)
    var diaInicial = cerosIzq($('#diaInicial').val(), 2)
    var fechaEnvio = añoInicial + mesInicial + diaInicial;

    var datos_envio = datosEnvio() + fechaEnvio + '|';
    postData({ datosh: datos_envio }, get_url("app/bombas/BOM108_1.DLL"))
        .then(data => {
            validarFase1_108('1');
        })
        .catch(err => {
            validarFechas('1')
        })
}

function validarFase1_108(orden) {
    validarInputs(
        {
            form: '#fase1',
            orden: orden
        },
        function () { validarFechas('3'); },
        _enviarDatos_108
    )
}

function _enviarDatos_108() {
    var añoInicial = cerosIzq($('#añoInicial').val(), 2);
    var mesInicial = cerosIzq($('#mesInicial').val(), 2)
    var diaInicial = cerosIzq($('#diaInicial').val(), 2)
    var fechaInicial = añoInicial + mesInicial + diaInicial;

    var añoFinal = cerosIzq($('#añoFinal').val(), 2);
    var mesFinal = cerosIzq($('#mesFinal').val(), 2)
    var diaFinal = cerosIzq($('#diaFinal').val(), 2)
    var fechaFinal = añoFinal + mesFinal + diaFinal;

    var vendedor = $('#vendedor').val();
    if (vendedor == '*' || vendedor == '*****') vendedor = '     ';
    else espaciosIzq(vendedor, 5);

    var isla = espaciosIzq($('#isla').val(), 1);
    var turno = espaciosIzq($('#turno').val(), 1);
    var imprGalones = espaciosIzq($('#imprGalones').val(), 1);

    var datos_envio = datosEnvio();
    datos_envio += fechaInicial;
    datos_envio += '|';
    datos_envio += fechaFinal;
    datos_envio += '|';
    datos_envio += vendedor;
    datos_envio += '|';
    datos_envio += isla;
    datos_envio += '|';
    datos_envio += turno;
    datos_envio += '|';
    datos_envio += imprGalones + "|";
    console.debug(datos_envio);

    loader('show');
    postData({ datosh: datos_envio }, get_url("app/bombas/BOM108.DLL"))
        .then(on_enviarDatos_108)
        .catch(err => {
            console.log(err)
            validarFase1_108("1")
        })
}

function on_enviarDatos_108(data) {

    let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();

    var añoFinal = cerosIzq($('#añoFinal').val(), 2);
    var mesFinal = cerosIzq($('#mesFinal').val(), 2)
    mesFinal = evaluarMes(mesFinal);
    var diaFinal = cerosIzq($('#diaFinal').val(), 2)

    data.TOTALES.push(nombreEmpresa)
    data.TOTALES.push(mesFinal + ' ' + diaFinal + '/' + añoFinal)
    data.TOTALES.push($_USUA_GLOBAL[0].NIT.toString().padStart(10, "0"));

    var opcionesImpresiones = {
        datos: data,
        tipo: '',
        formato: 'bombas/bom108.formato.html',
        nombre: 'LISTADO-GALONAJE-' + localStorage.Sesion
    };

    if ($_FORMATO == 'PDF') {
        opcionesImpresiones.tipo = 'pdf';
        imprimir(opcionesImpresiones, finImpresion_108)

    } else if ($_FORMATO == 'CSV') {
        opcionesImpresiones.tipo = 'csv';
        imprimir(opcionesImpresiones, finImpresion_108
        )
    }
}

function finImpresion_108() {
    loader("hide");
    $("#contenido table tbody").html("");
    _ventanaFormatoBom108();
}

