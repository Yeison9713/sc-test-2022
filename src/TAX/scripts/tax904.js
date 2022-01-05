var TAX904 = {
    FORMATO: null
};

$(document).ready(() => {
    $('#formatoimpresion_TAX904').select2().on('select2:close', validarFormato_904);
    setTimeout(() => {
        $('#formatoimpresion_TAX904').select2('open')
    }, 500)
})

function validarFormato_904() {
    var seleccionado = $(this).val();
    if (seleccionado != "3") {
        if (seleccionado == "1") TAX904.FORMATO = 'pdf';
        else if (seleccionado == "2") TAX904.FORMATO = 'csv';
        getDataImpresion()
    } else {
        $(this).attr('disabled', 'true');
        _toggleNav();
    }
}

function getDataImpresion(formato) {
    loader('show')
    postData({ datosh: datosEnvio() + '2|' }, get_url('APP/TAX/TAX903.DLL'))
        .then((data) => {
            data.TOTALES = [];

            let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
            let nit = $_USUA_GLOBAL[0].NIT.toString();
            let fecha = moment().format('MMM DD/YY');

            data.TOTALES.push(nombreEmpresa);
            data.TOTALES.push(nit);
            data.TOTALES.push(fecha);

            var impresion = {
                datos: data,
                tipo: TAX904.FORMATO,
                formato: 'tax/tax903.formato.html',
                nombre: 'LISTADO-AUTOMOTOR-PROPIETARIO-' + localStorage.Sesion
            }

            imprimir(impresion, () => {
                loader('hide')
                $('#formatoimpresion_TAX904').val(null).removeAttr('disabled').trigger('change');
                $('#formatoimpresion_TAX904').select2('open')
            });
        }).catch((error) => {
            loader('hide')
            console.log(error);
            _toggleNav();
        });
}