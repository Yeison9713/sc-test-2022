RX505 = [];

$(document).ready(() => {
    _inputControl('disabled');
    validarInputs({
        form: '#VALIDAR1_RX505',
        orden: '1'
    },
        () => { _toggleNav() },
        () => {
            RX505.FECHAINICIAL = fechainicialMask.value.replace(/-/g,'');
            let URL = get_url("APP/RX/RX505.DLL");
            postData({
                datosh: datosEnvio() + '1|' + RX505.FECHAINICIAL + '|'
            }, URL)
                .then((data) => {
                    console.debug(data);
                    _evaluarfechafinal_RX505();
                })
                .catch((error) => {
                    console.log(error);
                    fechainicialMask.typedValue = '';
                    $('#fechadesde_RX505').focus();
                });
        }
    )
})

function _evaluarfechafinal_RX505(){
    validarInputs({
        form: '#VALIDAR2_RX505',
        orden: '1'
    },
        () => { _toggleNav() },
        () => {
            RX505.FECHAFINAL = fechafinalMask.value.replace(/-/g,'');
            let URL = get_url("APP/RX/RX505.DLL");
            postData({
                datosh: datosEnvio() + '2|' + RX505.FECHAINICIAL + '|' + RX505.FECHAFINAL +' |'
            }, URL)
                .then((data) => {
                    console.debug(data);
                    let IMPRESION = [];
                    IMPRESION = data.FACTURA;
                    opcionesImpresion_RX505 = {
                        datos: IMPRESION,
                        tipo: 'csv',
                        formato: 'rx/RX505.html',
                        nombre: 'PRUEBA_CSV'
                    }
                    imprimir(opcionesImpresion_RX505, finImpresion_RX505)
                })
                .catch((error) => {
                    console.log(error);
                    fechafinalMask.typedValue = '';
                    $('#fechahasta_RX505').focus();
                });
        }
    )
}


function finImpresion_RX505(){
    CON851('','Procesio Satisfactorio',null,'success','');
    _toggleNav();
}

/////////////////////// fin ///////////////////////////////////////////
//////////////////// MASCARAS ////////////////////////////////////////

var fechainicialMask = IMask($("#fechadesde_RX505")[0], {
    mask: Date,
    pattern: 'Y-M-d',
    lazy: true,
    overwrite: true,
    autofix: true,
    blocks: {
        Y: { mask: IMask.MaskedRange, placeholderChar: 'y', from: 2000, to: 2030, maxLength: 4 },
        M: { mask: IMask.MaskedRange, placeholderChar: 'M', from: 01, to: 12, maxLength: 2 },
        d: { mask: IMask.MaskedRange, placeholderChar: 'd', from: 1, to: 31, maxLength: 2 },
    },
    format: function (date) {
        return moment(date).format("YYYY-MM-DD");
    },
    parse: function (str) {
        var fecha = moment(str).format('YYYY-MM-DD');
        if (fecha == "Invalid date") {
            CON851('01', '01', null, 'error', 'error');
        }
        else {
            return str;
        }
    }
});

var fechafinalMask = IMask($("#fechahasta_RX505")[0], {
    mask: Date,
    pattern: 'Y-M-d',
    lazy: true,
    overwrite: true,
    autofix: true,
    blocks: {
        Y: { mask: IMask.MaskedRange, placeholderChar: 'y', from: 2000, to: 2030, maxLength: 4 },
        M: { mask: IMask.MaskedRange, placeholderChar: 'M', from: 01, to: 12, maxLength: 2 },
        d: { mask: IMask.MaskedRange, placeholderChar: 'd', from: 1, to: 31, maxLength: 2 },
    },
    format: function (date) {
        return moment(date).format("YYYY-MM-DD");
    },
    parse: function (str) {
        var fecha = moment(str).format('YYYY-MM-DD');
        if (fecha == "Invalid date") {
            CON851('01', '01', null, 'error', 'error');
        }
        else {
            return str;
        }
    }
});