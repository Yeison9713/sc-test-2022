// CREADO POR DIANA ESCOBAR
var SER110D = new Object;

var $FECHAACTUAL_SER110D = moment().format('YYYYMMDD');
$_ANOACTUALW = $FECHAACTUAL_SER110D.substring(0, 4);
$_MESACTUALW = $FECHAACTUAL_SER110D.substring(4, 6);
$_DIAACTUAL = $FECHAACTUAL_SER110D.substring(6, 8);

$(document).ready(function () {
    _inputControl('reset');
    _inputControl('disabled');
    nombreOpcion(' - Actualiza Desplazados');
    let Window = BrowserWindow.getAllWindows();
    SER110D.VENTANA = 0;
    if (Window.length > 1) {
        $('#identif_SER110D').val($_MESSAGE[2].cedula);
        SER110D.NOVEDADW = '8';
        SER110D.VENTANA = 1;
        _consultadoc_SER110D();
    }

    _toggleF8([
        { input: 'lugar', app: 'SER110D', funct: _ventanaciudad_SER110D },
        { input: 'identif', app: 'SER110D', funct: _ventanaident_SER110D },
        { input: 'ciudaddesp', app: 'SER110D', funct: _ventanaciudaddesp_SER110D }
    ]);
    obtenerDatosCompletos({
        nombreFd: 'CIUDADES'
    }, function (data) {
        $_CIUDAD_SER110D = data.CIUDAD;
        $_CIUDAD_SER110D.pop();
        // CON850(_evaluarCON850_SER110D)
        obtenerDatosCompletos({
            nombreFd: 'DESPLAZADO'
        }, function (data) {
            $_DESPLAZ_SER110D = data.DESPLAZADO;
            $_DESPLAZ_SER110D.pop();
            CON850(_evaluarCON850_SER110D);
        })

    })

});


// NOVEDAD //
function _evaluarCON850_SER110D(novedad) {
    SER110D.NOVEDADW = novedad.id;
    switch (novedad.id) {
        case "7":
        case "8":
        case "9":
            SER110D.VENTANA = 0;
            _validardocumen_SER110D();
            break;
        default:
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
            break;
    }
    $('#novedad_SER110D').val(novedad.id + ' - ' + novedad.descripcion)
}

function _validardocumen_SER110D() {
    validarInputs(
        {
            form: "#DOC_SER110D",
            orden: '1'
        },
        function () { CON850(_evaluarCON850_SER110D); },
        _consultadoc_SER110D
    )
}

function _consultadoc_SER110D() {
    SER110D.DOCUMENTO = $('#identif_SER110D').val();
    SER110D.DOCUMENTO = SER110D.DOCUMENTO.padStart(15, '0')
    $('#identif_SER110D').val(SER110D.DOCUMENTO);

    if (SER110D.DOCUMENTO.trim() == '') {
        $('#identif_SER110D').val('000000000000000');
        _validardocumen_SER110D();
    } else {
        postData({
            datosh: datosEnvio() + SER110D.DOCUMENTO + '|'
        }, get_url("APP/SALUD/SER110D-01.DLL"))
            .then((data) => {
                console.debug(data);
                $_DESPLAZ = data['DESPLAZADO'];
                swinvalid = $_DESPLAZ[0].ESTADO;
                SER110D.LUGARDOC = $_DESPLAZ[0].LUGAR;
                SER110D.DESCCRIPLUGAR = $_DESPLAZ[0].DESCRIPLUGAR;
                SER110D.PRIMERAPELL = $_DESPLAZ[0].PRIAPELLIDO;
                SER110D.SEGUNDOAPELL = $_DESPLAZ[0].SEGAPELLIDO;
                SER110D.PRIMERNOM = $_DESPLAZ[0].PRINOMBRE;
                SER110D.SEGUNDONOM = $_DESPLAZ[0].SEGNOMBRE;
                SER110D.SITIODES = $_DESPLAZ[0].SITIO;
                SER110D.FECHADESPL = $_DESPLAZ[0].FECHADESP;
                SER110D.ANODESPL = SER110D.FECHADESPL.substring(0, 4);
                SER110D.MESDESPL = SER110D.FECHADESPL.substring(4, 6);
                SER110D.DIADESPL = SER110D.FECHADESPL.substring(6, 8);
                SER110D.CIUDADDESP = $_DESPLAZ[0].CIUDESP;
                SER110D.DESCRIPCIUDADDESP = $_DESPLAZ[0].DESCRIPCIUDESP;
                SER110D.ZONA = $_DESPLAZ[0].ZONADESP;
                SER110D.FUNCI = $_DESPLAZ[0].FUNC;
                SER110D.EXPLOS = $_DESPLAZ[0].EXPLOS;
                SER110D.INCEND = $_DESPLAZ[0].INCEND;
                SER110D.DESPLAZ = $_DESPLAZ[0].DESPLAZ;


                if ((SER110D.NOVEDADW == '7') && (swinvalid == '00')) {
                    CON851('00', '00', null, 'error', 'Error');
                    if (SER110D.VENTANA == 0) {
                        CON850(_evaluarCON850_SER110D);
                    }
                }
                else if ((SER110D.NOVEDADW == '8') && (swinvalid == '00')) {
                    _llenarCampos_SER110D();
                }
                else if ((SER110D.NOVEDADW == '9') && (swinvalid == '00')) {
                    _llenarCampos_SER110D();
                }

            })
            .catch((error) => {
                console.log(error);
                if ((SER110D.NOVEDADW == '7') && (error.MENSAJE == '01')) {
                    if (SER110D.VENTANA == 0) {
                        _validarciudaddoc_SER110D();
                    }
                } else if ((SER110D.NOVEDADW == '8') && (swinvalid == '01')) {
                    CON851('01', '01', null, 'error', 'Error');
                    if (SER110D.VENTANA == 0) {
                        CON850(_evaluarCON850_SER110D);
                    }
                } else if ((SER110D.NOVEDADW == '9') && (swinvalid == '01')) {
                    CON851('01', '01', null, 'error', 'Error');
                    if (SER110D.VENTANA == 0) {
                        CON850(_evaluarCON850_SER110D);
                    }
                }
            });
    }
}

function _validarciudaddoc_SER110D() {
    validarInputs(
        {
            form: '#LUGARDOC_SER110D',
            orden: '1'
        },
        () => { _validardocumen_SER110D() },
        () => {
            SER110D.LUGARDOC = $('#lugar_SER110D').val();
            if (SER110D.LUGARDOC.trim() == '') {
                CON851('01', '01', null, 'error', 'error');
                _validarciudaddoc_SER110D();
            } else {
                LLAMADO_DLL({
                    dato: [SER110D.LUGARDOC],
                    callback: _consultadocciudad_SER110D,
                    nombredll: 'SER110C_04',
                    carpeta: 'SALUD'
                });
            }
        }
    )
}
function _consultadocciudad_SER110D(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    SER110D.DESCCRIPLUGAR = date[1].trim();
    if (swinvalid == "00") {
        $("#descriplugar_SER110D").val(SER110D.DESCCRIPLUGAR);
        _validarprimerapel_SER110D();
    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _validarciudaddoc_SER110D();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}
function _validarprimerapel_SER110D() {
    validarInputs(
        {
            form: '#APELLIDO1_SER110D',
            orden: '1'
        },
        () => { _validarciudaddoc_SER110D() },
        () => {
            SER110D.PRIMERAPELL = $('#apellido1_SER110D').val();
            if (SER110D.PRIMERAPELL.trim() == '') {
                console.log('error primer apellido')
                CON851('02', '02', null, 'error', 'error');
                _validarprimerapel_SER110D();
            } else {
                console.log('primer apellido')
                _validarsegundoapel_SER110D();
            }
        }
    )
}

function _validarsegundoapel_SER110D() {
    validarInputs(
        {
            form: '#APELLIDO2_SER110D',
            orden: '1'
        },
        () => { _validarprimerapel_SER110D() },
        () => {
            SER110D.SEGUNDOAPELL = $('#apellido2_SER110D').val();
            console.log('segundo apellido')
            _validarprimernom_SER110D();

        }
    )
}

function _validarprimernom_SER110D() {
    validarInputs(
        {
            form: '#NOMBRE1_SER110D',
            orden: '1'
        },
        () => { _validarsegundoapel_SER110D() },
        () => {
            SER110D.PRIMERNOM = $('#nombre1_SER110D').val();
            if (SER110D.PRIMERNOM.trim() == '') {
                console.log('error primer nombre')
                CON851('02', '02', null, 'error', 'error');
                _validarprimernom_SER110D();
            } else {
                console.log('primer nombre')
                _validarsegundnom_SER110D();
            }
        }
    )
}
function _validarsegundnom_SER110D() {
    validarInputs(
        {
            form: '#NOMBRE2_SER110D',
            orden: '1'
        },
        () => { _validarprimernom_SER110D() },
        () => {
            SER110D.SEGUNDONOM = $('#nombre2_SER110D').val();
            _validarsitiodesplaz_SER110D();

        }
    )
}
function _validarsitiodesplaz_SER110D() {
    validarInputs(
        {
            form: '#SITIODES_SER110D',
            orden: '1'
        },
        () => { _validarsegundnom_SER110D() },
        () => {
            SER110D.SITIODES = $('#sitiodesplaz_SER110D').val();
            _validarfechadesplaz_SER110D();
        }
    )
}
function _validarfechadesplaz_SER110D() {
    momentfechades_Mask.updateValue();
    validarInputs(
        {
            form: '#FECHA_SER110D',
            orden: '1'
        },
        () => { _validarsitiodesplaz_SER110D() },
        () => {
            SER110D.FECHADESPL = momentfechades_Mask.unmaskedValue;
            console.log(SER110D.FECHADESPL, 'fecha')
            if (SER110D.FECHADESPL.trim() == '') {
                _validarfechadesplaz_SER110D();
            } else if (SER110D.FECHADESPL > $FECHAACTUAL_SER110D) {
                CON851('37', '37', null, 'error', 'error');
                _evaluarfechanac_7767();
            } else {
                _validarciudaddespl_SER110D();
            }
        }
    )
}
function _validarciudaddespl_SER110D() {
    validarInputs(
        {
            form: '#CIUDADDESP_SER110D',
            orden: '1'
        },
        () => { _validarfechadesplaz_SER110D() },
        () => {
            SER110D.CIUDADDESP = $('#ciudaddesp_SER110D').val();

            if (SER110D.CIUDADDESP.trim() == '') {
                _validarciudaddespl_SER110D();
            } else {
                LLAMADO_DLL({
                    dato: [SER110D.CIUDADDESP],
                    callback: _consultaciudaddesp_SER110D,
                    nombredll: 'SER110C_04',
                    carpeta: 'SALUD'
                });
            }

        }
    )
}
function _consultaciudaddesp_SER110D(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        _validarzona_SER110D();
    } else if (swinvalid == "01") {
        CON851('01', '01', null, 'error', 'error');
        _validarciudaddespl_SER110D();
    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

function _validarzona_SER110D() {
    validarInputs(
        {
            form: '#ZONA_SER110D',
            orden: '1'
        },
        () => { _validarciudaddespl_SER110D() },
        () => {
            SER110D.ZONA = $('#zona_ser110D').val();
            if (SER110D.ZONA.trim() == '') {
                _validarzona_SER110D();
            } else if ((SER110D.ZONA == 'U') || (SER110D.ZONA == 'R')) {
                _validarfuncionario_SER110D()
            } else {
                _validarzona_SER110D();
            }
        }
    )
}
function _validarfuncionario_SER110D() {
    validarInputs(
        {
            form: '#FUNCIONARIO_SER110D',
            orden: '1'
        },
        () => { _validarzona_SER110D() },
        () => {
            SER110D.FUNCI = $('#funcionario_SER110D').val();
            if (SER110D.FUNCI.trim() == '') {
                CON851('02', '02', null, 'error', 'error');
                _validarfuncionario_SER110D();
            } else {
                _validarexplosion_SER110D();
            }
        }
    )
}

function _validarexplosion_SER110D() {
    validarInputs(
        {
            form: '#EXPLOSION_SER110D',
            orden: '1'
        },
        () => { _validarfuncionario_SER110D() },
        () => {
            SER110D.EXPLOS = $('#explosion_SER110D').val();
            if (SER110D.EXPLOS.trim() == '') {
                SER110D.EXPLOS = 'N';
                $('#explosion_SER110D').val(SER110D.EXPLOS);
                _validarincendio_SER110D();
            } else if ((SER110D.EXPLOS == 'S') || (SER110D.EXPLOS == 'N')) {
                _validarincendio_SER110D();
            } else {
                _validarexplosion_SER110D();
            }
        }
    )
}

function _validarincendio_SER110D() {
    validarInputs(
        {
            form: '#INCENDIO3_SER110D',
            orden: '1'
        },
        () => { _validarexplosion_SER110D() },
        () => {
            SER110D.INCEND = $('#incendio3_SER110D').val();
            if (SER110D.INCEND.trim() == '') {
                SER110D.INCEND = 'N';
                $('#incendio3_SER110D').val(SER110D.INCEND);
                _validarincendio_SER110D();
            } else if ((SER110D.INCEND == 'S') || (SER110D.INCEND == 'N')) {
                _validardesplaz_SER110D();
            } else {
                _validarexplosion_SER110D();
            }
        }
    )
}
function _validardesplaz_SER110D() {
    validarInputs(
        {
            form: '#DESPLAZADOS_SER110D',
            orden: '1'
        },
        () => { _validarexplosion_SER110D() },
        () => {
            SER110D.DESPLAZ = $('#desplazados_SER110D').val();
            if (SER110D.DESPLAZ.trim() == '') {
                SER110D.DESPLAZ = 'N';
                $('#desplazados_SER110D').val(SER110D.DESPLAZ);
                _validarincendio_SER110D();
            } else if ((SER110D.DESPLAZ == 'S') || (SER110D.DESPLAZ == 'N')) {
                CON851P('01', _validardesplaz_SER110D, _grabar_SER110D)
            } else {
                _validarexplosion_SER110D();
            }
        }
    )
}

function _grabar_SER110D() {
    LLAMADO_DLL({
        dato: [SER110D.NOVEDADW, SER110D.DOCUMENTO, SER110D.PRIMERAPELL, SER110D.SEGUNDOAPELL, SER110D.PRIMERNOM, SER110D.SEGUNDONOM, SER110D.LUGARDOC, SER110D.SITIODES, SER110D.CIUDADDESP, SER110D.ZONA, SER110D.FECHADESPL, SER110D.FUNCI, SER110D.EXPLOS, SER110D.INCEND, SER110D.DESPLAZ],
        callback: _validargrabar_SER110D,
        nombredll: 'SER110D-02',
        carpeta: 'SALUD'
    })
}
function _eliminar_SER110D() {
    LLAMADO_DLL({
        dato: [SER110D.NOVEDADW, SER110D.DOCUMENTO, SER110D.PRIMERAPELL, SER110D.SEGUNDOAPELL, SER110D.PRIMERNOM, SER110D.SEGUNDONOM, SER110D.LUGARDOC, SER110D.SITIODES, SER110D.CIUDADDESP, SER110D.ZONA, SER110D.FECHADESPL, SER110D.FUNCI, SER110D.EXPLOS, SER110D.INCEND, SER110D.DESPLAZ],
        callback: _validargrabar_SER110D,
        nombredll: 'SER110D-02',
        carpeta: 'SALUD'
    })
}


function _validargrabar_SER110D(data) {
    var date = data.split('|');
    var swinvalid = date[0].trim();
    if (swinvalid == "00") {
        if (SER110D.NOVEDADW == '9') {
            toastr.success('Se ha retirado');
            _inputControl('reset');
            _inputControl('disabled');
            // CON850(_evaluarCON850_SER110D);
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        } else {
            toastr.success('Se ha guardado');
            _inputControl('reset');
            _inputControl('disabled');
            // CON850(_evaluarCON850_SER110D);
            let Window = BrowserWindow.getAllWindows();
            if (Window.length > 1) {
                _cerrarSegundaVentana();
            } else {
                _toggleNav()
            };
        }
    } else if (swinvalid == "01") {
        CON851('ERROR', 'ERROR AL ACTUALIZAR', null, 'error', 'error');

    } else {
        CON852(date[0], date[1], date[2], _toggleNav);
    }
}

//////// NOVEDAD 8 Y 9 ////////////////////////
function _llenarCampos_SER110D() {

    $('#lugar_SER110D').val(SER110D.LUGARDOC);
    $("#descriplugar_SER110D").val(SER110D.DESCCRIPLUGAR);
    $('#apellido1_SER110D').val(SER110D.PRIMERAPELL);
    $('#apellido2_SER110D').val(SER110D.SEGUNDOAPELL);
    $('#nombre1_SER110D').val(SER110D.PRIMERNOM);
    $('#nombre2_SER110D').val(SER110D.SEGUNDONOM);
    $('#sitiodesplaz_SER110D').val(SER110D.SITIODES);



    SER110D.ANODESPL = SER110D.FECHADESPL.substring(0, 4);
    SER110D.MESDESPL = SER110D.FECHADESPL.substring(4, 6);
    SER110D.DIADESPL = SER110D.FECHADESPL.substring(6, 8);

    $('#fecha_SER110D').val(SER110D.FECHADESPL);
    $('#ciudaddesp_SER110D').val(SER110D.CIUDADDESP);
    $('#zona_ser110D').val(SER110D.ZONA);
    $('#funcionario_SER110D').val(SER110D.FUNCI);
    $('#explosion_SER110D').val(SER110D.EXPLOS);
    $('#incendio3_SER110D').val(SER110D.INCEND);
    $('#desplazados_SER110D').val(SER110D.DESPLAZ);

    switch (SER110D.NOVEDADW) {
        case "8":
            if (SER110D.VENTANA == 0) {
                _validarciudaddoc_SER110D();
            }
            break;
        case "9":
            if (SER110D.VENTANA == 0) {
                CON851P('54', _validardocumen_SER110D, _eliminar_SER110D)
            }
            break;
    }
}


//////////MASCARAS//////////////////////
var momentFormat = 'YYYY/MM/DD HH:mm';

var momentfechades_Mask = IMask($("#fecha_SER110D")[0], {
    mask: Date,
    pattern: momentFormat,
    lazy: true,
    min: new Date(1920, 0, 1),
    max: new Date(2022, 0, 1),

    format: function (date) {
        return moment(date).format(momentFormat);
    },
    parse: function (str) {
        return moment(str, momentFormat);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 1920,
            to: 2022
        },
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        },
        DD: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31
        },
        HH: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 23
        },
        mm: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59
        }
    }
});

////////////////////////////F8- VENTANAS///////////////////////
function _ventanaciudad_SER110D(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE CONSULTA DE CIUDADES",
            columnas: ["COD", "NOMBRE", "PAIS", "NOM_PAIS", "DEPART"],
            data: $_CIUDAD_SER110D,
            callback_esc: function () {
                $("#lugar_SER110D").focus();
            },
            callback: function (data) {
                document.getElementById('lugar_SER110D').value = data.COD.trim();
                // document.getElementById('ciudadd_110c').value = data.NOMBRE;
                _enterInput('#lugar_SER110D');
            }
        });
    }
}

function _ventanaciudaddesp_SER110D(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE CONSULTA DE CIUDADES",
            columnas: ["COD", "NOMBRE", "PAIS", "NOM_PAIS", "DEPART"],
            data: $_CIUDAD_SER110D,
            callback_esc: function () {
                $("#ciudaddesp_SER110D").focus();
            },
            callback: function (data) {
                document.getElementById('ciudaddesp_SER110D').value = data.COD.trim();
                // document.getElementById('ciudadd_110c').value = data.NOMBRE;
                _enterInput('#ciudaddesp_SER110D');
            }
        });
    }
}
function _ventanaident_SER110D(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "VENTANA DE DESPLAZADOS",
            columnas: ["CEDULA", "PRIAPELLIDO", "SEGAPELLIDO", "PRINOMBRE", "SEGNOMBRE"],
            data: $_DESPLAZ_SER110D,
            callback_esc: function () {
                $("#identif_SER110D").focus();
            },
            callback: function (data) {
                document.getElementById('identif_SER110D').value = data.CEDULA.trim();
                // document.getElementById('ciudadd_110c').value = data.NOMBRE;
                _enterInput('#identif_SER110D');
            }
        });
    }
}