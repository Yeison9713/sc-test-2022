var $_FORMATO, $_LISTADO;

$(document).ready(function () {
    loader('hide');
    _inputControl('reset');
    _inputControl('disabled');

    $('#formatoImpresion').select2().on('select2:select', validarFormato);
    setTimeout(function () { $('#formatoImpresion').select2('open') }, 500)
    $('#logo_url').attr('src', $_RUTA_LOGO);
});

function habilitarFormato() {
    _inputControl('reset');
    $('#formatoImpresion').val(null).removeAttr('disabled').trigger('change');
    $('#formatoImpresion').select2('open')
}

function validarFormato(e) {
    var seleccionado = e.params.data.id;
    if (seleccionado != "3") {
        if (seleccionado == "1") $_FORMATO = 'PDF';
        else if (seleccionado == "2") $_FORMATO = 'CSV';

        $(this).attr('disabled', 'true');

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
        setTimeout(function () { validarFechas('1') }, 100);
    } else {
        $(this).attr('disabled', 'true');
        _toggleNav();
    }
}

function validarFechas(orden) {
    validarInputs(
        {
            form: '#validarFechas',
            orden: orden
        },
        habilitarFormato,
        _validarFecha_envio
    )
}

function _validarFecha_envio() {
    var sesion = localStorage.Sesion;

    var añoInicial = cerosIzq($('#añoInicial').val(), 2);
    var mesInicial = cerosIzq($('#mesInicial').val(), 2)
    var diaInicial = cerosIzq($('#diaInicial').val(), 2)
    var fechaEnvio = añoInicial + mesInicial + diaInicial;

    var datosEnvio = sesion + '|' + fechaEnvio;
    SolicitarDll({ datosh: datosEnvio }, on_validarFecha_envio, get_url("app/BOM108_1.DLL"));
}

function on_validarFecha_envio(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        validarFase1_108('1');
    } else {
        plantillaError(res[0], res[1], res[2], function () { validarFechas('1') });
    }
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
    var sesion = localStorage.Sesion;

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

    var datosEnvio = sesion;
    datosEnvio += '|';
    datosEnvio += fechaInicial;
    datosEnvio += '|';
    datosEnvio += fechaFinal;
    datosEnvio += '|';
    datosEnvio += vendedor;
    datosEnvio += '|';
    datosEnvio += isla;
    datosEnvio += '|';
    datosEnvio += turno;
    datosEnvio += '|';
    datosEnvio += imprGalones;

    loader('show');
    SolicitarDll({ datosh: datosEnvio }, on_enviarDatos_108, get_url("app/BOM108.DLL"));
}

function on_enviarDatos_108(data) {
    var res = data.split('|');
    if (res[0].trim() == '00') {
        var rutaJson = get_url('progdatos/json/SC-LISTGAL-' + localStorage.Sesion + '.JSON');
        SolicitarDatos(
            null,
            function (dataJson) {
                $_LISTADO = dataJson.LISTADO
                $_LISTADO.pop();
                montarImpresion_108(data);
            },
            rutaJson
        );
    } else {
        loader('hide');
        plantillaError(res[0], res[1], res[2], function () { validarFechas('3') });
    }
}

function montarImpresion_108(totales) {
    $('#nombreEmpresa').html($datosUsuar[0].trim())

    var añoFinal = cerosIzq($('#añoFinal').val(), 2);
    var mesFinal = cerosIzq($('#mesFinal').val(), 2)
    mesFinal = evaluarMes(mesFinal);
    var diaFinal = cerosIzq($('#diaFinal').val(), 2)
    $('#hastaFormato').html(mesFinal + ' ' + diaFinal + '/' + añoFinal)
    totales = totales.split('|');

    if ($_FORMATO == 'CSV') {
        for (var i in $_LISTADO) {
            $_LISTADO[i].GALONAJE = $_LISTADO[i].GALONAJE.replace(/,/g, '.');
            $_LISTADO[i].VALOR = $_LISTADO[i].VALOR.replace(/,/g, '.');
        }

        totales[1] = totales[1].replace(/,/g, '.');
        totales[2] = totales[2].replace(/,/g, '.');
    }

    for (var i in $_LISTADO) {
        $('#contenido table tbody').append(''
            + '<tr>'
            + ' <td>' + $_LISTADO[i].COMP + '</td>'
            + ' <td>' + $_LISTADO[i].SURTI + '</td>'
            + ' <td>' + $_LISTADO[i].TURNO + '</td>'
            + ' <td>' + $_LISTADO[i].FECHA + '</td>'
            + ' <td>' + $_LISTADO[i].GALONAJE + '</td>'
            + ' <td>' + $_LISTADO[i].VALOR + '</td>'
            + ' <td>' + $_LISTADO[i].VEN + '</td>'
            + '</tr>'
        );
    }

    $('#contenido table tbody').append('<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');

    $('#contenido table tbody').append(''
        + '<tr style="border-top: 1px solid #000">'
        + ' <td>TOTAL: </td>'
        + ' <td></td>'
        + ' <td></td>'
        + ' <td></td>'
        + ' <td>' + totales[1].trim() + '</td>'
        + ' <td>' + totales[2].trim() + '</td>'
        + ' <td></td>'
        + '</tr>'
    );

    if ($_FORMATO == 'PDF') {
        // imprimir(
        //     {
        //         'estilo': '#estiloImpresion',
        //         'maqueta': '#documento',
        //         'nombre': 'LISTADO-GALONAJE-' + localStorage.Sesion,
        //         'tipo': 'pdf'
        //     },
        //     finImpresion_108
        // )
        console.log('Impresion')
    } else if ($_FORMATO == 'CSV'){
        imprimirCsv('LISTADO-GALONAJE-' + localStorage.Sesion + '.csv');
        finImpresion_108();
    } 
}

function finImpresion_108() {
    loader('hide');
    $('#contenido table tbody').html('');
    habilitarFormato();
}

