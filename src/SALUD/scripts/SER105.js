/* NOMBRE RM --> SER105 // NOMBRE ELECTR --> SAL715 */
var SER105 = new Object;

$(document).ready(function () {
    _inputControl("reset");
    _inputControl('disabled');
    nombreOpcion('9,7,1,5 - Incrementar tarifas');
    SER105.GRUPO = '';
    _toggleF8([
        { input: 'codigo', app: '715', funct: _ventanaConvenios715 }
    ]);
    _validarCodigo715();
});

function _validarCodigo715() {
    validarInputs(
        {
            form: "#codincrem715",
            orden: '1'
        },
        _toggleNav,
        () => {
            SER105.CODIGO = $('#codigo_715').val();
            if (SER105.CODIGO.trim() == '') {
                CON851('01', '01', null, 'error', 'Error');
                $('#descrip715').val('TARIFA NO EXISTE - REPITA');
                _validarCodigo715();
            } else {
                LLAMADO_DLL({
                    dato: [SER105.CODIGO],
                    callback: _dataCONSULTANOMTAR_715,
                    nombredll: 'SER105_01',
                    carpeta: 'SALUD'
                });
            }
        }
    )
}

function _dataCONSULTANOMTAR_715(data) {
    data = data.split('|');
    $_DESCRIPNOMTAR_715 = data[1].trim();
    if (data[0].trim() == "00") {
        if (SER105.CODIGO == '99') {
            $('#descrip715').val('PROCESO TOTAL')
        } else {
            $('#descrip715').val($_DESCRIPNOMTAR_715)
        }
        porcent715()
    } else if (data[0].trim() == "01") {
        CON851('01', '01', null, 'error', 'error')
        _validarCodigo715()
    } else {
        CON852(data[0], data[1], data[2], _toggleNav)
    }
}

function porcent715() {
    validarInputs(
        {
            form: '#porcentaje715',
            orden: '1'
        },
        _validarCodigo715,
        _validarporcentaje_715
    )
}

function _validarporcentaje_715() {
    SER105.PORCENTAJE = vlrporcentaje_7411Mask.value.padEnd(4, '0').padStart(5, '0');
    if (parseFloat(SER105.PORCENTAJE) < 1 || parseFloat(SER105.PORCENTAJE) > 30) {
        CON851('','Digite un porcentaje de incremento válido', null,'error','Error');
        porcent715();
    } else {
        grupo715();
    }
}

function grupo715() {
    if (SER105.GRUPO.trim() == '') $('#grupo715').val('**')
    validarInputs(
        {
            form: '#GRUPO_715',
            orden: '1'
        },
        porcent715,
        () => {
            SER105.GRUPO = $('#grupo715').val();
            if (SER105.GRUPO.trim() == '') {
                SER105.GRUPO = '**';
                $('#grupo715').val(SER105.GRUPO);
            }
            loader('show');
            _rutinamovimiento_SER105();
        }
    )
}

function _rutinamovimiento_SER105() {
    let URL = get_url("APP/SALUD/SER105_02.DLL");
    postData({ datosh: datosEnvio() + SER105.CODIGO + '|' + SER105.GRUPO + '|' + SER105.PORCENTAJE.replace('.', '') + '|' }, URL)
        .then(data => {
            SER105.INCREMENTO = data.INCREMENTO;
            swinvalid = SER105.INCREMENTO[0].ESTADO;
            if (swinvalid == '00') {
                CON851('','La tarifa se ha incrementado',null,'success','Exito');
            } else {
                CON851('01', 'No existe grupo en tarifas', null, 'error', 'Error');
            }
            loader('hide');
            _toggleNav();
        })
        .catch(err => {
            console.debug(err);
            grupo715();
        })
}


/////////////////////////////////////// F8 //////////////////////////////////////////

function _ventanaConvenios715(e) {
    var $_CONVENIO_715 = [];
    let URL = get_url("APP/" + "SALUD/SER803" + ".DLL");
    postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
    }, URL)
        .then((data) => {
            loader("hide");
            $_CONVENIO_715 = data;
            if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
                _ventanaDatos({
                    titulo: "VENTANA DE CONVENIOS",
                    columnas: ["COD", "DESCRIP"],
                    data: $_CONVENIO_715.NOMTAR,
                    callback_esc: function () {
                        $("#codigo_715").focus();
                    },
                    callback: function (data) {
                        $('#codigo_715').val(data.COD);
                        $('#descrip715').val(data.DESCRIP.trim());
                        _enterInput('#codigo_715');
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

///////////////////////////////////// MASCARAS ////////////////////////////////////////////////

var vlrporcentaje_7411Mask = new IMask(document.getElementById('porcnt715'),
    { mask: Number, min: 0, max: 99, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
);





