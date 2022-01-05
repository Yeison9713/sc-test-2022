/* NOMBRE RM --> SER106 // NOMBRE ELECTR --> SAL712 */

var SER106 = [];

///////////////////////////////MAESTRO DE NOMBRE DE TARIFAS////////////////////
$(document).ready(function () {
    nombreOpcion('9-7-1-2 - Actualización de nombre de tarifas');
    $_ADMINW = localStorage.cod_oper ? localStorage.cod_oper : false;
    _inputControl("reset");
    _inputControl("disabled");
    _toggleF8([
        { input: 'codigo', app: '712', funct: _ventanaGrptar }
    ]);

    obtenerDatosCompletos({
        nombreFd: "GRUPOTAR"
    }, function (data) {
        $_tarifas106 = data.NOMTAR;
        $_tarifas106.pop();
        CON850(_evaluarCON850);
    })
});

function _evaluarCON850(novedad) {
    _inputControl("reset");
    // _inputControl("disabled");
    $_NovedSer712 = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
        case 8:
        case 9:
            _validarDato712();
            break;
        default:
            _toggleNav();
            break;
    }
    $('#novSer712').val(novedad.id + ' - ' + novedad.descripcion)
}

function _validarDato712() {
    validarInputs(
        {
            form: "#dato",
            orden: '1'
        },
        function () { CON850(_evaluarCON850); },
        () => {
            SER106.CODIGOTAR = $('#codigo_712').val();
            if (SER106.CODIGOTAR.trim() == '') {
                CON851('01', '01', null, 'error', 'error');
                _validarDato712()
            } else {
                postData({
                    datosh: datosEnvio() + SER106.CODIGOTAR + '|'
                }, get_url("APP/SALUD/SER106_01.DLL"))
                    .then((data) => {
                        $_NOMTAR = data['NOMTAR'];
                        swinvalid = $_NOMTAR[0].ESTADO;
                        SER106.DESCRIPTAR = $_NOMTAR[0].DESCRIPTAR.trim();
                        $('#descripSer712').val(SER106.DESCRIPTAR);
                        if (($_NovedSer712 == '7') && (swinvalid == '00')) {
                            CON851('00', '00', null, 'error', 'error');
                            _validarDato712();
                        }
                        else if (($_NovedSer712 == '8') && (swinvalid == '00')) {                          
                            detalle712();
                        }
                        else if (($_NovedSer712 == '9') && (swinvalid == '00')) {
                            // $('#descripSer712').val(SER106.DESCRIPTAR);
                            CON851P('54', _validarDato712, consultadll_SER106)
                        }
        
                    })
                    .catch((error) => {
                        console.log(error);
                        if (($_NovedSer712 == '7') && (error.MENSAJE == '01')) {
                            detalle712();
                        } else if (($_NovedSer712 == '8') && (error.MENSAJE == '01')) {
                            // CON851('01', '01', null, 'error', 'Error');
                            _validarDato712();
                        } else if (($_NovedSer712 == '9') && (error.MENSAJE== '01')) {
                            // CON851('01', '01', null, 'error', 'Error');
                            _validarDato712();
                        }
                    });
            }
        }
    )
}



function detalle712() {
    validarInputs(
        {
            form: '#detalle',
            orden: '1'
        },
        function () { _validarDato712(); },
        function () {
            SER106.DESCRIPTAR = $('#descripSer712').val();

            if (SER106.DESCRIPTAR.trim() == '') {
                CON851('02', '02', null, 'error', 'Error');
                detalle712();
            } else {
                consultadll_SER106(); 
            }
        }
    )
}

function consultadll_SER106() {
    let datos_Envio = datosEnvio()
    datos_Envio += $_NovedSer712 + "|" + SER106.CODIGOTAR + "|" + SER106.DESCRIPTAR;
    let URL = get_url("APP/SALUD/SER106.DLL");
    postData({ datosh: datos_Envio }, URL)
        .then(function (data) {
            if ($_NovedSer712 = '7' || $_NovedSer712 == '8') {
                toastr.success('Se ha guardado', 'Nombre tarifas');
                // loader("hide")
                _toggleNav()
            } else {
                toastr.success('Eliminado', 'Correctamente');
                // loader("hide")
                _toggleNav()
            }

        })
        .catch(err => {

        })
}



// --> F8 NOMBRE-TAR //
function _ventanaGrptar(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA NOMBRE DE TARIFAS",
            columnas: ["COD", "DESCRIP"],
            data: $_tarifas106,
            callback_esc: function () {
                $("#codigo_712").focus();
            },
            callback: function (data) {
                $('#codigo_712').val(data.COD.trim())
                $('#descripSer712').val(data.DESCRIP.trim())
                _enterInput('#codigo_712');
            }
        });
    }
}