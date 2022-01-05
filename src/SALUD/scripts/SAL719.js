/* NOMBRE RM --> SER119 // NOMBRE ELECTR --> SAL719 */

var arraySucursal_719, arrayDivision_719, arrayOperador_719, arrayMaestros_719, arrayTerceros719, arrayProfesionales_719, arrayDatosCompletos719, arrayHorProf_119 = [];
var arrayHorProfMoment_119, $novPopUp
var salas119;
var fechaActual119
var teclaFuncEspec_119;
var $_NovedSal719, $_NovedPopUp719
var momentMaskFechaPopup
var maskFechas = [];
var maskHora = [];
var maskFrec = [];

var $_fechaPopUp_119 = '', $_fechaDeshabDesde_119, $_fechaDeshabHasta_119
var maskFechaPop = []
var maskHoraPop = [];
var maskFrecPop = [];

var datosTablaEnvio_119 = [];

$(".imaskFrec").each(function (index, element) {
    var blocksMaskFrec = IMask(element, {
        mask: 'VL',
        lazy: true,  // make placeholder always visible

        blocks: {
            VL: {
                mask: IMask.MaskedRange,
                from: 00,
                to: 60
            }
        }
    })
    maskFrec.push(blocksMaskFrec);
});


var momentFormat = 'YYYY/MM/DD-HH:mm';
var momentMaskFechaDesde = new IMask($("#desAgenDesde_ser119")[0], {
    mask: Date,
    pattern: momentFormat,
    lazy: true,
    min: new Date(2009, 0, 1, 0, 0),
    max: new Date(2080, 0, 1, 0, 0),

    format: function (date) {
        return moment(date).format(momentFormat);
    },
    parse: function (str) {
        $_fechaDeshabDesde_119 = str;
        return moment(str, momentFormat);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 2009,
            to: 2080
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

})

var momentMaskFechaHasta = new IMask($("#desAgenHasta_ser119")[0], {
    mask: Date,
    pattern: momentFormat,
    lazy: true,
    min: new Date(2009, 0, 1),
    max: new Date(2080, 0, 1),

    format: function (date) {
        return moment(date).format(momentFormat);
    },
    parse: function (str) {
        $_fechaDeshabHasta_119 = str;
        return moment(str, momentFormat);
    },

    blocks: {
        YYYY: {
            mask: IMask.MaskedRange,
            from: 2009,
            to: 2080
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

})

$(".imaskHora").each(function (index, element) {
    var blocksMaskHora = IMask(element, {
        mask: 'HH:MM',
        lazy: true,  // make placeholder always visible


        blocks: {
            HH: {
                mask: IMask.MaskedRange,
                from: 0,
                to: 23,
                placeholder: '00'
            },
            MM: {
                mask: IMask.MaskedRange,
                from: 0,
                to: 59,
                placeholder: '00'
            }
        }
    });
    maskHora.push(blocksMaskHora);
})

// NUEVA FUNCION DEL F8
$(document).ready(function () {
    nombreOpcion('9,7,1,9 - Actualizacion Datos Personal Que Atiende')
    // $_USUA_GLOBAL[0].NIT = 0830092718
    _inputControl('reset');
    _inputControl('disabled');

    _toggleF8([
        { input: 'identificacion', app: '719', funct: _ventanaIdentificacion719 },
        { input: 'divCups', app: '719', funct: _ventanaDivis719 },
        { input: 'sucursal', app: '719', funct: _ventanaSucursal719 },
        { input: 'cuentaRte', app: '719', funct: _ventanaCuentRte719 },
        { input: 'espec1', app: '719', funct: _Especialistas719 },
        { input: 'espec2', app: '719', funct: _Especialistas719 },
        { input: 'espec3', app: '719', funct: _Especialistas719 },
        { input: 'espec4', app: '719', funct: _Especialistas719 },
        { input: 'espec5', app: '719', funct: _Especialistas719 },
        { input: 'operAsig1', app: '719', funct: _ventanaOperador719 },
        { input: 'operAsig2', app: '719', funct: _ventanaOperador719 },
        { input: 'operAsig3', app: '719', funct: _ventanaOperador719 },
        { input: 'operAsig4', app: '719', funct: _ventanaOperador719 },
        { input: 'operAsig5', app: '719', funct: _ventanaOperador719 }
    ]);
    datosTerceros719();
});

function _ventanaIdentificacion719(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        switch ($_NovedSal719) {
            case '7': f8Terceros719();
                break;
            case '8':
            case '9':
                if ($_USUA_GLOBAL[0].NIT == 0830092718 || $_USUA_GLOBAL[0].NIT == 0830092719) {
                    bootbox.prompt({
                        size: "small",
                        title: "Mostrar solo salas?",
                        maxlength: 1,
                        placeholder: "S",
                        required: true,
                        callback: function (sala) {
                            switch (sala) {
                                case "S":
                                    var filtrados = []
                                    filtrados = arrayProfesionales_719.filter(data => parseInt(data.IDENTIFICACION.trim()) < 9999 && parseInt(data.IDENTIFICACION.trim()) > 1300)
                                    f8Profesionales719(filtrados);
                                    break;
                                case "N":
                                    f8Profesionales719(arrayProfesionales_719);
                                    break;
                                case null:
                                    setTimeout(() => $("#identificacion_719").focus(), 200)
                                    break;
                                default:
                                    _ventanaIdentificacion719()
                                    break;
                            }
                        }
                    });
                } else {
                    f8Profesionales719(arrayProfesionales_719);
                }
                break;
        }
    }
}

function f8Terceros719() {
    _ventanaDatos({
        titulo: "Ventana De Terceros",
        columnas: ["COD", "NOMBRE", "CODACT"],
        data: arrayTerceros719,
        callback_esc: function () {
            $("#identificacion_719").focus()
        },
        callback: function (data) {
            $("#identificacion_719").val(data.COD)
            $("#nombre_119").val(data.NOMBRE);
            _enterInput('#identificacion_719');
        }
    });
}

function f8Profesionales719(llegada) {
    _ventanaDatos({
        titulo: "Ventana De Profesionales",
        columnas: ["NOMBRE", "IDENTIFICACION"],
        data: llegada,
        callback_esc: function () {
            $("#identificacion_719").focus()
        },
        callback: function (data) {
            $("#nombre_119").val(data.NOMBRE);
            $("#identificacion_719").val(data.IDENTIFICACION)
            _enterInput('#identificacion_719');
        }
    });
}

function _ventanaCuentRte719(e) { // Habilitar F8
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        var filtroMaestros
        var cta_ret = $('#cuentaRte_719').val().trim()

        if (cta_ret.length < 1) {
            cta_ret = arrayDatosCompletos719.MAYORRET
            filtroMaestros = arrayMaestros_719.filter(maestro => maestro.CTA_MAY == cta_ret)
        } else {
            var ctaMayor = cta_ret.substring(0, 4)
            if (ctaMayor) {
                filtroMaestros = arrayMaestros_719.filter(maestro => maestro.CTA_MAY == ctaMayor)
                var subCta = cta_ret.substring(4, 6)
                if (subCta) {
                    filtroMaestros = filtroMaestros.filter(maestro => maestro.SUB_CTA == subCta)
                    var aux = cta_ret.substring(6, 11)
                    if (aux) {
                        filtroMaestros = filtroMaestros.filter(maestro => maestro.AUX_MAE == aux)
                    }
                }
            } else {
                filtroMaestros = arrayMaestros_719
            }
        }
        // var filtroMaestros = arrayMaestros_719.filter(maestro => (maestro.CTA_MAY == ctaMayor) && (maestro.SUB_CTA == subCta) && (maestro.AUX_MAE == aux))
        _ventanaDatos({
            titulo: "VENTANA PLAN DE CUENTAS",
            columnas: ["CTA_MAY", "SUB_CTA", "AUX_MAE", "NOMBRE_MAE", "TIPO_MAE"],
            data: filtroMaestros,
            callback_esc: function () {
                $("#cuentaRte_719").focus()
            },
            callback: function (data) {
                $("#cuentaRte_719").val(data.CTA_MAY.trim() + data.SUB_CTA.trim() + data.AUX_MAE.trim())
                _enterInput('#cuentaRte_719');
            }
        });
    }
}

function _ventanaDivis719(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: "Ventana De Divisiones",
            columnas: ["COD", "DESCRIP"],
            data: arrayDivision_719,
            callback_esc: function () {
                $("#divCups_719").focus()
            },
            callback: function (data) {
                $("#divCups_719").val(data.COD)
                $("#descDiv_119").val(data.DESCRIP)
                _enterInput('#divCups_719');
            }
        });
    }
}

function _ventanaSucursal719(e) { // Habilitar F8
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        _ventanaDatos({
            titulo: 'Ventana De Sucursales',
            columnas: ["CODIGO", "DESCRIPCION", "ALMACEN"],
            data: arraySucursal_719,
            callback_esc: function () {
                $("#sucursal_719").focus()
            },
            callback: function (data) {
                $("#sucursal_719").val(data.CODIGO)
                $("#descSuc_119").val(data.DESCRIPCION)
                _enterInput('#sucursal_719');
            }
        });
    }
}


$(document).on('keydown', '.f8sucursalTabla', function (e) { // Habilitar F8
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        var atributo = $(this).attr("id");
        var numero = atributo.split('')
        var idSucursal = '#sucursal' + numero[8] + '_' + numero[10]
        _ventanaDatos({
            titulo: 'Ventana De Sucursales',
            columnas: ["CODIGO", "DESCRIPCION", "ALMACEN"],
            data: arraySucursal_719,
            callback_esc: function () {
                $(idSucursal).focus();
            },
            callback: function (data) {
                $(idSucursal).val(data.CODIGO.trim())
                _enterInput(idSucursal);
            }
        });
    }
});

$(document).on('keydown', '.f8sucursalTablaPop', function (e) {
    if (e.which == 119) {
        var atributo = $(this).attr("id")
        var numero = atributo.split('')
        var idSucursal = '#sucurPop' + numero[8]
        _ventanaDatos({
            titulo: 'Ventana De Sucursales',
            columnas: ["CODIGO", "DESCRIPCION", "ALMACEN"],
            data: arraySucursal_719,
            callback_esc: function () {
                $(idSucursal).focus();
            },
            callback: function (data) {
                $(idSucursal).val(data.CODIGO.trim())
                _enterInput(idSucursal);
            }
        });
    }
});


function _ventanaOperador719(e) {
    var nomInput = $(this).attr("id");
    var numero = nomInput.split('')
    var id = numero[8]

    if (e.type == 'click') {
        _ventanaDatos({
            titulo: 'Ventana De Operadores',
            columnas: ["CODIGO", "DESCRIPCION"],
            data: arrayOperador_719,
            callback_esc: function () {
                $("#operAsig" + id + "_719").focus()
            },
            callback: function (data) {
                $("#operAsig" + id + "_719").val(data.CODIGO.trim())
                _enterInput('#operAsig' + id + '_719')
            }
        });
    } else {

        if (e.which == 119) {
            _ventanaDatos({
                titulo: 'Ventana De Operadores',
                columnas: ["CODIGO", "DESCRIPCION"],
                data: arrayOperador_719,
                callback_esc: function () {
                    $("#operAsig" + id + "_719").focus()
                },
                callback: function (data) {
                    $("#operAsig" + id + "_719").val(data.CODIGO.trim())
                    _enterInput('#operAsig' + id + '_719')
                }
            });
        }
    }
}

function _Especialistas719(e) {
    var atributo = $(this).attr("id");
    var numero = atributo.split('')
    var idEspec71A = '#espec' + numero[5] + '_719'
    var idDescp71A = '#DescEspec' + numero[5] + '_719'

    if (e.type == 'click') {
        _ventanaDatos({
            titulo: 'Ventana De Especialidades',
            columnas: ["CODIGO", "NOMBRE", "COSTO"],
            data: arrayeEspecialidades_719,
            callback_esc: function () {
                $(idEspec71A).focus()
            },
            callback: function (data) {
                $(idEspec71A).val(data.CODIGO)
                $(idDescp71A).val(data.NOMBRE)
                _enterInput(idEspec71A)
            }
        });
    } else {
        switch (e.which) {
            case 119:
                _ventanaDatos({
                    titulo: 'Ventana De Especialidades',
                    columnas: ["CODIGO", "NOMBRE", "COSTO"],
                    data: arrayeEspecialidades_719,
                    callback_esc: function () {
                        $(idEspec71A).focus()
                    },
                    callback: function (data) {
                        $(idEspec71A).val(data.CODIGO)
                        $(idDescp71A).val(data.NOMBRE)
                        _enterInput(idEspec71A)
                    }
                });
                break;
            case 116: //f5
                $(idEspec71A).attr('disabled', 'true')
                set_Event_validar('#validarEspec' + numero[5], 'off')
                detalle_119()
                break;
            case 114: //f3
                if (idEspec71A.trim().length < 0) {
                    _enterInput(idEspec)
                } else {
                    $(idEspec71A).attr('disabled', 'true')
                    set_Event_validar('#validarEspec' + numero[5], 'off')
                    validarOperador_119(1)
                }
                break;
        }
    }
}

// inicio json //
function datosTerceros719() {
    obtenerDatosCompletos({ nombreFd: 'TERCEROS' }, function (data) {
        arrayTerceros719 = data.TERCEROS;
        arrayTerceros719.pop();
        arrayTerceros719 = arrayTerceros719.filter(data => data.CODACT == '05')
        datosMaestros719()
    }, 'on');
}

function datosMaestros719() {
    obtenerDatosCompletos({ nombreFd: 'CTA-MAYOR' }, function (data) {
        arrayMaestros_719 = data.MAESTROS;
        arrayMaestros_719.pop();
        datosProfesionales719()
    });
}

function datosProfesionales719() {
    obtenerDatosCompletos({ nombreFd: 'PROFESIONALES' }, function (data) {
        arrayProfesionales_719 = data.ARCHPROF;
        arrayProfesionales_719.pop();
        for (var i in arrayProfesionales_719) {
            arrayProfesionales_719[i].NOMBRE = arrayProfesionales_719[i].NOMBRE.replace(/\�/g, "Ñ").trim()
        }
        datosDivision719()
    });
}

function datosDivision719() {
    obtenerDatosCompletos({ nombreFd: 'DIVISION' }, function (data) {
        arrayDivision_719 = data.CODIGOS;
        arrayDivision_719.pop();
        datosSucursales719();
    })
}

function datosSucursales719() {
    obtenerDatosCompletos({ nombreFd: 'SUCURSALES' }, function (data) {
        arraySucursal_719 = data.SUCURSAL;
        // arraySucursal_719.pop();
        datosOperador719();
    })
}

function datosOperador719() {
    obtenerDatosCompletos({ nombreFd: 'OPERADOR' }, function (data) {
        arrayOperador_719 = data.ARCHREST;
        arrayOperador_719.pop();
        datosEspecialidad719();
    })
}

function datosEspecialidad719() {
    obtenerDatosCompletos({ nombreFd: 'ESPECIALIDAD' }, function (data) {
        arrayeEspecialidades_719 = data.ESPECIALIDADES;
        arrayeEspecialidades_719.pop();
        datosProfesiones719();
    })
}

function datosProfesiones719() {
    obtenerDatosCompletos({ nombreFd: 'PROFESION' }, function (data) {
        arrayProfesion_719 = data.PROFESION
        CON850(evaluarNovedad_719);
    }, 'off');
}

/// FIN DLL /// 

// NOVEDAD //
function evaluarNovedad_719(novedad) {
    $_NovedSal719 = novedad.id;
    switch (novedad.id) {

        case '7':
        case '8':
        case '9': identificacion_719();
            break;
        case 'F':
            salir_719()
            break;
    }
    $('#novedad_119').val(novedad.id + ' - ' + novedad.descripcion)
}

function salir_719() {
    limpiarInputs_719()
    arrayMaestros_719 = []
    arrayProfesionales_719 = []
    arrayProfesion_719 = []
    arrayTerceros719 = []
    $_NovedSal719 = ''
    arrayDatosCompletos719 = []
    datosTablaEnvio_119 = []
    arrayOperador_719 = []
    _toggleNav()
}

function limpiarInputs_719() {
    _inputControl('reset');
    _inputControl('disabled');
    validarChecked('#Medicamentos_ser119', 'N')
    validarChecked('#procQuirur_ser119', 'N')
    validarChecked('#procDiag_ser119', 'N')
    validarChecked('#imagen_ser119', 'N')
    validarChecked('#serv_ser119', 'N')
    validarChecked('#consulter_ser119', 'N')
    validarChecked('#promPrev_ser119', 'N')
}

function identificacion_719() {

    validarInputs(
        {
            form: '#validarIdentificacion',
            orden: "1"
        },
        function () { CON850(evaluarNovedad_719); },
        function () {
            var Identificacion719 = $('#identificacion_719').val().trim()
            $('#identificacion_119').val(Identificacion719)
            var busquedaEnTerceros = arrayTerceros719.find(tercero => tercero.COD.trim() == Identificacion719)

            if (busquedaEnTerceros) {
                postData(
                    {
                        datosh: datosEnvio(),
                        paso: '1',
                        codigo: Identificacion719,
                    }, 
                    get_url("APP/SALUD/SER819.DLL")
                )
                .then((data) => {
                    console.log(data);
                    if ($_NovedSal719 == '7'){
                        if (data.NOMBRE.trim() == 'Personal no atiende'){
                            $('#nombre_119').val(busquedaEnTerceros.NOMBRE.trim())
                            return crearArrayCompleto_719(Identificacion719, busquedaEnTerceros.NOMBRE.trim())    
                        }
                        CON851('00', '00', null, 'error', 'error');
                        return identificacion_719()
                    }

                    $('#nombre_119').val(busquedaEnTerceros.NOMBRE.trim())
                    loader("show")
                    traerDatosCompletos_719(Identificacion719)
                })
                .catch((error) => {
                    console.error(error);
                    if ($_NovedSal719 == '7' && error.MENSAJE == '01'){
                        $('#nombre_119').val(busquedaEnTerceros.NOMBRE.trim())
                        return crearArrayCompleto_719(Identificacion719, busquedaEnTerceros.NOMBRE.trim())
                    }

                    return identificacion_719();
                });
            } else {
                CON851('01', 'No existe tercero', null, 'error', 'error');
                identificacion_719()
            }
        }
    )

}

function crearArrayCompleto_719(identificacion, nombre) {
    var mayorRet
    if ($_USUA_GLOBAL[0].PUC_USU == '4' || $_USUA_GLOBAL[0].PUC_USU == '6') {
        mayorRet = '2436'
    } else {
        mayorRet = '2365'
    }

    arrayDatosCompletos719 = {
        'ANOFIN': '',
        'ANOINI': '',
        'ATIENDE': '',
        'CITAS': '',
        'CONTRATO': '',
        'CTARET': '',
        'DATO_ASOCI': '',
        'DESCRIP': nombre,
        'DATO_BIRAD': '',
        'DATO_DVD': '',
        'DATO_NORM': '',
        'DETALLE': '',
        'DIAFIN': '',
        'DIAINI': '',
        'DIVISION': '',
        'ESTADO': '',
        'FORMAGEN': '',
        'HRFIN': '',
        'HRINI': '',
        'IDENTIFICACION': identificacion,
        'INTMIN': '',
        'MAYORRET': mayorRet,
        'MESFIN': '',
        'MESINI': '',
        'PORCENT': '',
        'RANGO': '',
        'REGISTRO': '',
        'SOBREAGEN': '',
        'SUCURSAL': '',
        'TABLA': [
            { 'SUCURSAL1': "", 'HORAING1': "", 'HORARET1': "", 'INTMINTAB1': "01", 'SUCURSAL2': "", 'SUCURSAL3': "", 'HORAING3': "", 'HORARET3': "", 'INTMINTAB3': "01", 'SUCURSAL4': "", 'HORAING4': "", 'HORARET4': "", 'INTMINTAB4': "01" },
            { 'SUCURSAL1': "", 'HORAING1': "", 'HORARET1': "", 'INTMINTAB1': "01", 'SUCURSAL2': "", 'SUCURSAL3': "", 'HORAING3': "", 'HORARET3': "", 'INTMINTAB3': "01", 'SUCURSAL4': "", 'HORAING4': "", 'HORARET4': "", 'INTMINTAB4': "01" },
            { 'SUCURSAL1': "", 'HORAING1': "", 'HORARET1': "", 'INTMINTAB1': "01", 'SUCURSAL2': "", 'SUCURSAL3': "", 'HORAING3': "", 'HORARET3': "", 'INTMINTAB3': "01", 'SUCURSAL4': "", 'HORAING4': "", 'HORARET4': "", 'INTMINTAB4': "01" },
            { 'SUCURSAL1': "", 'HORAING1': "", 'HORARET1': "", 'INTMINTAB1': "01", 'SUCURSAL2': "", 'SUCURSAL3': "", 'HORAING3': "", 'HORARET3': "", 'INTMINTAB3': "01", 'SUCURSAL4': "", 'HORAING4': "", 'HORARET4': "", 'INTMINTAB4': "01" },
            { 'SUCURSAL1': "", 'HORAING1': "", 'HORARET1': "", 'INTMINTAB1': "01", 'SUCURSAL2': "", 'SUCURSAL3': "", 'HORAING3': "", 'HORARET3': "", 'INTMINTAB3': "01", 'SUCURSAL4': "", 'HORAING4': "", 'HORARET4': "", 'INTMINTAB4': "01" },
            { 'SUCURSAL1': "", 'HORAING1': "", 'HORARET1': "", 'INTMINTAB1': "01", 'SUCURSAL2': "", 'SUCURSAL3': "", 'HORAING3': "", 'HORARET3': "", 'INTMINTAB3': "01", 'SUCURSAL4': "", 'HORAING4': "", 'HORARET4': "", 'INTMINTAB4': "01" },
            { 'SUCURSAL1': "", 'HORAING1': "", 'HORARET1': "", 'INTMINTAB1': "00", 'SUCURSAL2': "", 'SUCURSAL3': "", 'HORAING3': "", 'HORARET3': "", 'INTMINTAB3': "01", 'SUCURSAL4': "", 'HORAING4': "", 'HORARET4': "", 'INTMINTAB4': "01" }
        ]
    }

    $('#operAsig1_719').val('XXXX')
    $('#descAsig1_119').val('TODOS LOS OPERADORES')
    $('#operAsig2_719').val('XXXX')
    $('#descAsig2_119').val('TODOS LOS OPERADORES')
    $('#operAsig3_719').val('XXXX')
    $('#descAsig3_119').val('TODOS LOS OPERADORES')
    $('#operAsig4_719').val('XXXX')
    $('#descAsig4_119').val('TODOS LOS OPERADORES')
    $('#operAsig5_719').val('XXXX')
    $('#descAsig5_119').val('TODOS LOS OPERADORES')
    detalle_119()
}

function traerDatosCompletos_719(identificacion) {
    var datos_envio_719 = datosEnvio()
    datos_envio_719 += cerosIzq(identificacion.trim(), 10)
    datos_envio_719 += '|'

    let URL = get_url("APP/SALUD/SAL719-01.DLL");

    postData({
        datosh: datos_envio_719
    }, URL)
        .then((data) => {
            loader("hide")
            arrayDatosCompletos719 = data.PERSATI[0]
            mostrarDatosCompletos_719()
        })
        .catch(error => {
            console.error(error)
            _toggleNav()
        });

}

function mostrarDatosCompletos_719() {
    // $("#nombre_119").val(arrayDatosCompletos719.DESCRIP.trim());
    arrayDatosCompletos719.DESCRIP = $('#nombre_119').val().replace(/\s+/g, ' ');
    $('#oper_ser119').val(arrayDatosCompletos719.OPER.trim());
    $('#fecha_ser119').val(arrayDatosCompletos719.FECHA.trim());

    $('#detalle_119').val(arrayDatosCompletos719.DETALLE.trim());
    $('#registro_ser119').val(arrayDatosCompletos719.REGISTRO.trim());

    $('#profesion_119').val(arrayDatosCompletos719.ATIENDE.trim());

    var profesion_719 = arrayProfesion_719.find(profesion => profesion.COD == arrayDatosCompletos719.ATIENDE)
    if (profesion_719) {
        $('#descriprof_119').val(profesion_719.DESCRIP);
    }


    $('#cuentaRte_119').val(arrayDatosCompletos719.CTARET.trim());
    $('#descRetenfuente_119').val(arrayDatosCompletos719.NOMCTA.trim());

    if (arrayDatosCompletos719.DIVISION.trim() != '00') {
        $('#divCups_719').val(arrayDatosCompletos719.DIVISION.trim());
        $('#descCUPS_119').val(arrayDatosCompletos719.DESCDIV.trim());
    }

    if (arrayDatosCompletos719.SUCURSAL.trim() != '00') {
        $('#sucursal_719').val(arrayDatosCompletos719.SUCURSAL.trim());
        $('#descSuc_119').val(arrayDatosCompletos719.DESCSUC.trim());
    }

    $('#Medicamentos_ser119').val(arrayDatosCompletos719.CL1.trim())
    $('#procQuirur_ser119').val(arrayDatosCompletos719.CL2.trim())
    $('#procDiag_ser119').val(arrayDatosCompletos719.CL3.trim())
    $('#imagen_ser119').val(arrayDatosCompletos719.CL4.trim())
    $('#serv_ser119').val(arrayDatosCompletos719.CL5.trim())
    $('#consulter_ser119').val(arrayDatosCompletos719.CL6.trim())
    $('#promPrev_ser119').val(arrayDatosCompletos719.CL7.trim())

    var contratacion_119 = arrayDatosCompletos719.CONTRATO.trim();
    switch (contratacion_119) {
        case "1": $('#contratacion_119').val('Valor Fijo');
            $('#medico_119').val('000');
            break;
        case "2":
            $('#contratacion_119').val('% Sobre Facturacion');
            $('#medico_119').val(arrayDatosCompletos719.PORCENT.trim());
            break;
    }

    var estadoAct_119 = arrayDatosCompletos719.ESTADO.trim();
    switch (estadoAct_119) {
        case "1": $('#estAct_119').val('Activo')
            break;
        case "2": $('#estAct_119').val('Inactivo')
            break;
    }
    if (arrayDatosCompletos719.ESP1.trim() == '000') {
        $('#espec1_719').val('')
    } else {
        $('#espec1_719').val(arrayDatosCompletos719.ESP1.trim());
        $('#DescEspec1_119').val(arrayDatosCompletos719.DESCESP1.trim());
    }

    if (arrayDatosCompletos719.ESP2.trim() == '000') {
        $('#espec2_719').val('')
    } else {
        $('#espec2_719').val(arrayDatosCompletos719.ESP2.trim());
        $('#DescEspec2_119').val(arrayDatosCompletos719.DESCESP2.trim());
    }

    if (arrayDatosCompletos719.ESP3.trim() == '000') {
        $('#espec3_719').val('')
    } else {
        $('#espec3_719').val(arrayDatosCompletos719.ESP3.trim());
        $('#DescEspec3_119').val(arrayDatosCompletos719.DESCESP3.trim());
    }

    if (arrayDatosCompletos719.ESP4.trim() == '000') {
        $('#espec4_719').val('')
    } else {
        $('#espec4_719').val(arrayDatosCompletos719.ESP4.trim());
        $('#DescEspec4_119').val(arrayDatosCompletos719.DESCESP4.trim());
    }

    if (arrayDatosCompletos719.ESP5.trim() == '000') {
        $('#espec5_719').val('')
    } else {
        $('#espec5_719').val(arrayDatosCompletos719.ESP5.trim());
        $('#DescEspec5_119').val(arrayDatosCompletos719.DESCESP5.trim());
    }

    if (arrayDatosCompletos719.OPERAUT.trim() == '    ') {
        $('#operAsig1_719').val('XXXX')
        $('#descAsig1_119').val('TODOS LOS OPERADORES')
    } else {
        $('#operAsig1_719').val(arrayDatosCompletos719.OPERAUT.trim());
        $('#descAsig1_119').val(search_operador_119(arrayDatosCompletos719.OPERAUT.trim()));
    }

    if (arrayDatosCompletos719.OPERCIRU.trim() == '    ') {
        $('#operAsig2_719').val('XXXX')
        $('#descAsig2_119').val('TODOS LOS OPERADORES')
    } else {
        $('#operAsig2_719').val(arrayDatosCompletos719.OPERCIRU.trim());
        $('#descAsig2_119').val(search_operador_119(arrayDatosCompletos719.OPERCIRU.trim()));
    }

    if (arrayDatosCompletos719.OPEROTR.trim() == '    ') {
        $('#operAsig3_719').val('XXXX')
        $('#descAsig3_119').val('TODOS LOS OPERADORES')
    } else {
        $('#operAsig3_719').val(arrayDatosCompletos719.OPEROTR.trim());
        $('#descAsig3_119').val(search_operador_119(arrayDatosCompletos719.OPEROTR.trim()));
    }

    if (arrayDatosCompletos719.OPERAUT4.trim() == '    ') {
        $('#operAsig4_719').val('XXXX')
        $('#descAsig4_119').val('TODOS LOS OPERADORES')
    } else {
        $('#operAsig4_719').val(arrayDatosCompletos719.OPERAUT4.trim());
        $('#descAsig4_119').val(search_operador_119(arrayDatosCompletos719.OPERAUT4.trim()));
    }

    if (arrayDatosCompletos719.OPERAUT5.trim() == '    ') {
        $('#operAsig5_719').val('XXXX')
        $('#descAsig5_119').val('TODOS LOS OPERADORES')
    } else {
        $('#operAsig5_719').val(arrayDatosCompletos719.OPERAUT5.trim());
        $('#descAsig5_119').val(search_operador_119(arrayDatosCompletos719.OPERAUT5.trim()));
    }

    $('#asigCita_ser119').val(arrayDatosCompletos719.INTMIN);
    $('#cantMaxCitas_Ser119').val(arrayDatosCompletos719.CITAS);

    $('#agendaExcep719').val(arrayDatosCompletos719.FORMAGEN)
    $('#sobreAgenda719').val(arrayDatosCompletos719.SOBREAGEN)

    var fechaDesde_119 = arrayDatosCompletos719.FECHAINI.trim();
    fechaDesde_119 += ' ' + arrayDatosCompletos719.HORAINI.trim();
    var fechaHasta_119 = arrayDatosCompletos719.FECHAFIN.trim()
    fechaHasta_119 += ' ' + arrayDatosCompletos719.HORAFIN.trim();

    if (fechaDesde_119 != "00000000 0000") {
        momentMaskFechaDesde.typedValue = fechaDesde_119
        momentMaskFechaHasta.typedValue = fechaHasta_119
    }

    for (var i in arrayDatosCompletos719.TABLA) {
        var suc1 = ('sucursal1_' + i)
        $('#' + suc1).val(arrayDatosCompletos719.TABLA[i].SUCURSAL1);
    }

    for (var i in arrayDatosCompletos719.TABLA) {
        var index = buscarMaskHora('horaIngreso1_' + i)
        maskHora[index].unmaskedValue = arrayDatosCompletos719.TABLA[i].HORAING1
    }

    for (var i in arrayDatosCompletos719.TABLA) {
        var index = buscarMaskHora('horaSalida1_' + i)
        maskHora[index].unmaskedValue = arrayDatosCompletos719.TABLA[i].HORARET1
    }

    for (var i in arrayDatosCompletos719.TABLA) {
        var fre1 = ('fre1_' + i)
        $('#' + fre1).val(arrayDatosCompletos719.TABLA[i].INTMINTAB1);
    }

    for (var i in arrayDatosCompletos719.TABLA) {
        var suc2 = ('sucursal2_' + i)
        $('#' + suc2).val(arrayDatosCompletos719.TABLA[i].SUCURSAL2.trim());
    }

    for (var i in arrayDatosCompletos719.TABLA) {
        var index = buscarMaskHora('horaIngreso2_' + i)
        maskHora[index].unmaskedValue = arrayDatosCompletos719.TABLA[i].HORAING2
    }

    for (var i in arrayDatosCompletos719.TABLA) {
        var index = buscarMaskHora('horaSalida2_' + i)
        maskHora[index].unmaskedValue = arrayDatosCompletos719.TABLA[i].HORARET2
    }

    for (var i in arrayDatosCompletos719.TABLA) {
        var fre2 = ('fre2_' + i)
        $('#' + fre2).val(arrayDatosCompletos719.TABLA[i].INTMINTAB2);
    }

    for (var i in arrayDatosCompletos719.TABLA) {
        var suc3 = ('sucursal3_' + i)
        $('#' + suc3).val(arrayDatosCompletos719.TABLA[i].SUCURSAL3.trim());
    }

    for (var i in arrayDatosCompletos719.TABLA) {
        var index = buscarMaskHora('horaIngreso3_' + i)
        maskHora[index].unmaskedValue = arrayDatosCompletos719.TABLA[i].HORAING3
    }

    for (var i in arrayDatosCompletos719.TABLA) {
        var index = buscarMaskHora('horaSalida3_' + i)
        maskHora[index].unmaskedValue = arrayDatosCompletos719.TABLA[i].HORARET3
    }

    for (var i in arrayDatosCompletos719.TABLA) {
        var fre3 = ('fre3_' + i)
        $('#' + fre3).val(arrayDatosCompletos719.TABLA[i].INTMINTAB3);
    }

    for (var i in arrayDatosCompletos719.TABLA) {
        var suc4 = ('sucursal4_' + i)
        $('#' + suc4).val(arrayDatosCompletos719.TABLA[i].SUCURSAL4.trim());
    }

    for (var i in arrayDatosCompletos719.TABLA) {
        var index = buscarMaskHora('horaIngreso4_' + i)
        maskHora[index].unmaskedValue = arrayDatosCompletos719.TABLA[i].HORAING4
    }

    for (var i in arrayDatosCompletos719.TABLA) {
        var index = buscarMaskHora('horaSalida4_' + i)
        maskHora[index].unmaskedValue = arrayDatosCompletos719.TABLA[i].HORARET4
    }

    for (var i in arrayDatosCompletos719.TABLA) {
        var fre4 = ('fre4_' + i)
        $('#' + fre4).val(arrayDatosCompletos719.TABLA[i].INTMINTAB4);
    }

    loader('hide');
    switch ($_NovedSal719) {
        case '8':
            detalle_119();
            break;
        case '9':
            CON851P('54', identificacion_719, eliminarRegistro_719)
            break;
    }
}


function eliminarRegistro_719() {
    var datos_envio_719 = datosEnvio()
    datos_envio_719 += $_NovedSal719
    datos_envio_719 += '|'
    datos_envio_719 += arrayDatosCompletos719.IDENTIFICACION
    datos_envio_719 += '|'

    let URL = get_url("APP/SALUD/SAL719-03.DLL");

    postData({
        datosh: datos_envio_719
    }, URL)
        .then((data) => {
            jAlert(
                { titulo: 'SAL719-03', mensaje: data },
                volverInicio_719
            );
        })
        .catch(error => {
            console.error(error)
            _toggleNav()
        });
}

function volverInicio_719() {
    arrayDatosCompletos719 = []
    limpiarInputs_719()
    CON850(evaluarNovedad_719);
}

function buscarMaskFrecuencia(element) {
    var retornar = false;
    for (var i in maskFrec) {
        var input = maskFrec[i].el.input
        var id = $(input).attr('id');
        if (id == element) retornar = maskFrec[i];
    }
    return retornar;
}

function buscarMaskFecha(element) {
    var retornar = false;
    for (var i in maskFechas) {
        var input = maskFechas[i].el.input
        var id = $(input).attr('id');
        if (id == element) retornar = maskFechas[i];
    }
    return retornar;
}

function buscarMaskHora(element) {
    var retornar = false;
    for (var i in maskHora) {
        var input = maskHora[i].el.input
        var id = $(input).attr('id');
        //  if (id == element) retornar = maskHora[i];
        if (id == element) retornar = i;
    }

    return retornar;
}

function detalle_119() {

    validarInputs(
        {
            form: '#validarDetalle119',
            orden: "1"
        },
        function () { identificacion_719() },
        function () {
            arrayDatosCompletos719.DETALLE = $('#detalle_119').val().trim()

            registro_119();
        }
    )
}

function registro_119() {
    validarInputs(
        {
            form: '#validarRegistro119',
            orden: "1"
        },
        function () { detalle_119() },
        function () {
            arrayDatosCompletos719.REGISTRO = $('#registro_ser119').val().trim()
            _ventanaProfesion_119();
        }
    )
}


function _ventanaProfesion_119() {
    POPUP({
        titulo: "Personal que atiende",
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        array: arrayProfesion_719,
        callback_f: registro_119,
        seleccion: arrayDatosCompletos719.ATIENDE
    }, function (data) {
        arrayDatosCompletos719.ATIENDE = data.COD
        $("#profesion_119").val(data.COD.trim())
        $("#descriprof_119").val(data.DESCRIP.trim())
        ctaRetenfuente_119();

    })
}

function ctaRetenfuente_119() {
    validarInputs(
        {
            form: '#validarCtaRetenfuente119',
            orden: "1"
        },
        function () { registro_119(); },
        function () {
            var ctaRetFuente = $("#cuentaRte_719").val().trim()
            arrayDatosCompletos719.CTARET = ctaRetFuente

            if (ctaRetFuente.length > 0) {
                var mayor_Ret = ctaRetFuente.substring(0, 4)
                // arrayDatosCompletos719.MAYORRET = '2436'//SOLO PARA PRUEBAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                if (arrayDatosCompletos719.MAYORRET == mayor_Ret) {

                    var busqueda = arrayMaestros_719.find(cuenta => ((cuenta.TIPO_MAE == '4') && (cuenta.CTA_MAY + cuenta.SUB_CTA + cuenta.AUX_MAE == ctaRetFuente)))

                    if (busqueda) {
                        if (busqueda.PORCENT_RET.trim().length < 1) {
                            CON851('04', '04', null, 'error', 'error');
                            ctaRetenfuente_119()
                        } else {
                            $('#descRetenfuente_119').val(busqueda.NOMBRE_MAE.trim())
                            divisionCups_119()
                        }
                    } else {
                        CON851('01', '01', null, 'error', 'error');
                        ctaRetenfuente_119()
                    }

                } else {
                    CON851('04', '04', null, 'error', 'error');
                    ctaRetenfuente_119()
                }
            } else {
                divisionCups_119()
            }
        }
    )
}

function divisionCups_119() {
    validarInputs(
        {
            form: '#validarDivCups119',
            orden: '1'
        },
        function () {
            ctaRetenfuente_119();
        },
        function () {
            var divCups = $("#divCups_719").val().trim()
            arrayDatosCompletos719.DIVISION = divCups

            if (divCups.length > 0) {
                var busqueda = arrayDivision_719.find(division => division.COD == divCups)

                if (busqueda) {
                    $("#descDiv_119").val(busqueda.DESCRIP)
                    sucursal_119()
                } else {
                    CON851('01', '01', null, 'error', 'error');
                    divisionCups_119()
                }

            } else {
                sucursal_119();
            }
        }
    )
}

function sucursal_119() {
    validarInputs(
        {
            form: '#validarSucursal_719',
            orden: '1'
        },
        function () {
            divisionCups_119();
        },
        function () {
            var sucur = $("#sucursal_719").val().trim()
            arrayDatosCompletos719.SUCURSAL = sucur

            if (sucur.length > 0) {
                var busqueda = arraySucursal_719.find(sucursal => sucursal.CODIGO == sucur)

                if (busqueda) {
                    $("#descSuc_119").val(busqueda.DESCRIPCION)
                    validarMedicamento_119()
                } else {
                    CON851('01', '01', null, 'error', 'error');
                    sucursal_119()
                }
            } else {
                validarMedicamento_119()
            }
        }
    )
}

function validarMedicamento_119() {
    validarInputs(
        {
            form: '#validarMedicamentos_719',
            orden: '1'
        },
        function () {
            divisionCups_119();
        },
        function () {
            arrayDatosCompletos719.CL1 = $("#Medicamentos_ser119").val().toUpperCase().trim() != 'S' ? "N" : "S"
            $("#Medicamentos_ser119").val(arrayDatosCompletos719.CL1)

            validarProcQuirur_119();
        }
    )
}

function validarProcQuirur_119() {
    validarInputs(
        {
            form: '#validarProcQuirur_719',
            orden: '1'
        },
        validarMedicamento_119,
        function () {
            arrayDatosCompletos719.CL2 = $("#procQuirur_ser119").val().toUpperCase().trim() != 'S' ? "N" : "S"
            $("#procQuirur_ser119").val(arrayDatosCompletos719.CL2)

            validarProcDiag_119();
        }
    )
}

function validarProcDiag_119() {
    validarInputs(
        {
            form: '#validarProcDiagn_719',
            orden: '1'
        },
        validarProcQuirur_119,
        function () {
            arrayDatosCompletos719.CL3 = $("#procDiag_ser119").val().toUpperCase().trim() != 'S' ? "N" : "S"
            $("#procDiag_ser119").val(arrayDatosCompletos719.CL3)

            validarImagenologia_119();
        }
    )
}


function validarImagenologia_119() {
    validarInputs(
        {
            form: '#validarImagenologia_719',
            orden: '1'
        },
        validarProcDiag_119,
        function () {
            arrayDatosCompletos719.CL4 = $("#imagen_ser119").val().toUpperCase().trim() != 'S' ? "N" : "S"
            $("#imagen_ser119").val(arrayDatosCompletos719.CL4)

            validarOtrosServ_119();
        }
    )
}


function validarOtrosServ_119() {
    validarInputs(
        {
            form: '#validarOtrosServ_719',
            orden: '1'
        },
        validarImagenologia_119,
        function () {
            arrayDatosCompletos719.CL5 = $("#serv_ser119").val().toUpperCase().trim() != 'S' ? "N" : "S"
            $("#serv_ser119").val(arrayDatosCompletos719.CL5)

            validarConsulTerap_119();
        }
    )
}

function validarConsulTerap_119() {
    validarInputs(
        {
            form: '#validarConulTerap_719',
            orden: '1'
        },
        validarOtrosServ_119,
        function () {
            arrayDatosCompletos719.CL6 = $("#consulter_ser119").val().toUpperCase().trim() != 'S' ? "N" : "S"
            $("#consulter_ser119").val(arrayDatosCompletos719.CL6)

            validarPyP_119();
        }
    )
}

function validarPyP_119() {
    validarInputs(
        {
            form: '#validarPyP_719',
            orden: '1'
        },
        validarProcDiag_119,
        function () {
            arrayDatosCompletos719.CL7 = $("#promPrev_ser119").val().toUpperCase().trim() != 'S' ? "N" : "S"
            $("#promPrev_ser119").val(arrayDatosCompletos719.CL7)

            tipoContratacion_119();
        }
    )
}

function tipoContratacion_119() {
    var arrayContratacion_719 = [
        { "COD": "1", "DESCRIP": "Valor Fijo" },
        { "COD": "2", "DESCRIP": "% Sobre Facturacion" }
    ]

    POPUP({
        array: arrayContratacion_719,
        titulo: 'Tipo De Contratacion',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: sucursal_119,
        // callback_f: () => { setTimeout(sucursal_119()), 300 },
        seleccion: arrayDatosCompletos719.CONTRATO
    }, function (data) {
        arrayDatosCompletos719.CONTRATO = data.COD
        switch (data.COD) {
            case '1':
                $('#contratacion_119').val(data.COD + '. ' + data.DESCRIP)
                $('#medico_119').val('000')
                arrayDatosCompletos719.PORCENT = '000'
                estadoAct_119()
                break;
            case '2':
                $('#contratacion_119').val(data.COD + '. ' + data.DESCRIP)
                validarPorcentMed()
                break;
        }
    })
}



function validarPorcentMed() {
    validarInputs(
        {
            form: '#validarPorcMedico',
            orden: '1'
        },
        function () {
            tipoContratacion_119();
        },
        function () {
            var medico = $('#medico_119').val().trim()
            arrayDatosCompletos719.PORCENT = medico

            if (medico > 100) {
                validarPorcentMed()
            } else if (medico == 0) {
                jAlert(
                    { titulo: 'Atencion ', mensaje: '<b>Mensaje: </b>' + 'Si el tipo de contratacion es 2 y el % asignado es 0, el sistema asume el % del grupo del cup' }, estadoAct_119);
            } else if ((medico > 0) && (medico <= 100)) {
                estadoAct_119()
            }
        }

    )
}


function estadoAct_119() {
    var arrayEstadoAct_719 = [
        { "COD": "1", "DESCRIP": "ACTIVO" },
        { "COD": "2", "DESCRIP": "INACTIVO" }
    ]
    setTimeout(() => {
        POPUP({
            array: arrayEstadoAct_719,
            titulo: 'Estado Actual',
            indices: [
                { id: 'COD', label: 'DESCRIP' }
            ],
            callback_f: () => { setTimeout(tipoContratacion_119, 300) },
            seleccion: arrayDatosCompletos719.ESTADO
        }, function (data) {
            arrayDatosCompletos719.ESTADO = data.COD
            $('#estAct_119').val(data.COD + '. ' + data.DESCRIP)
            validarEspecialidad_119(1);
        })
    }, 300)
}


function search_Especialidad_119(codigo) {
    var retornar = false;
    for (var i in arrayEspecialidad_119) {
        if (arrayEspecialidad_119[i].CODIGO.trim() == codigo) {
            retornar = arrayEspecialidad_119[i].NOMBRE.trim();
            break;
        }
    }
    return retornar;
}


function validarEspecialidad_119(id) {
    validarInputs(
        {
            form: '#validarEspec' + id,
            orden: "1"
        },
        function () {
            if (id == '1') {
                detalle_119()
            } else {
                validarEspecialidad_119(parseInt(id) - 1)
            }
        },
        function () {
            var codigoEspec_119 = $('#espec' + id + '_719').val().trim();

            if (codigoEspec_119.length > 0) {
                var busqueda = arrayeEspecialidades_719.find(espec => espec.CODIGO == cerosIzq(codigoEspec_119, 3))

                if (busqueda) {
                    $('#espec' + id + '_719').val(cerosIzq(codigoEspec_119, 3))
                    $('#DescEspec' + id + '_119').val(busqueda.NOMBRE);

                    if (id == '5') {
                        validarOperador_119(1)
                    } else {
                        validarEspecialidad_119(parseInt(id) + 1)
                    }
                } else {
                    CON851('01', '01', null, 'error', 'error');
                    validarEspecialidad_119(id)
                }
            } else {
                $('#DescEspec' + id + '_119').val('')
                switch (id) {
                    case 5:
                        validarOperador_119(1)
                        break;
                    default:
                        validarEspecialidad_119(parseInt(id) + 1)
                }
            }
        }
    )

}

function search_operador_119(codigo) {
    var retornar = false;

    if (codigo === 'XXXX') {
        retornar = 'TODOS LOS OPERADORES';
    } else {
        var busqueda = arrayOperador_719.find(operador => operador.CODIGO == cerosIzq(codigo, 4))

        if (busqueda) {
            retornar = busqueda.DESCRIPCION
        } else {
            retornar = ''
        }
    }
    return retornar;
}

function validarOperador_119(id) {
    validarInputs(
        {
            form: '#validarOperAsig' + id,
            orden: "1"
        },
        function () {
            if (id == '1') {
                validarEspecialidad_119(5)
            } else {
                validarOperador_119(parseInt(id) - 1)
            }
        },
        function () {
            var codigoOper_119 = $('#operAsig' + id + '_719').val().trim().toUpperCase()

            var busqueda = arrayOperador_719.find(operador => operador.CODIGO == cerosIzq(codigoOper_119, 4))
            if (busqueda) {
                $('#operAsig' + id + '_719').val(cerosIzq(codigoOper_119, 4))
                $('#descAsig' + id + '_119').val(busqueda.DESCRIPCION);

                if (id == '5') {
                    validarFrecuencia_119()
                } else {
                    validarOperador_119(parseInt(id) + 1)
                }
            } else if (codigoOper_119 == 'XXXX') {
                $('#descAsig' + id + '_119').val('TODOS LOS OPERADORES');

                if (id == '5') {
                    validarFrecuencia_119()
                } else {
                    validarOperador_119(parseInt(id) + 1)
                }
            } else {
                CON851('01', '01', null, 'error', 'error');
                validarOperador_119(id)
            }
        }
    )
}

function validarFrecuencia_119() {
    validarInputs(
        {
            form: '#validarAsigCitas',
            orden: '1'
        },
        function () {
            validarOperador_119(5);
        },
        function () {
            var valorIntervalo = cerosIzq($('#asigCita_ser119').val(), 2)
            arrayDatosCompletos719.INTMIN = valorIntervalo

            switch (valorIntervalo) {
                case '00':
                case '01':
                case '02':
                case '05':
                case '07':
                case '10':
                case '12':
                case '15':
                case '20':
                case '25':
                case '30':
                case '40':
                case '60':
                    validarCantCitas_119()
                    // fechaActual119 = fechaActualGlobal() PENDIENTE
                    break;
                default:
                    CON851('03', '03', null, 'error');
                    validarFrecuencia_119()
                    break;
            }
        }
    )
}

function validarCantCitas_119() {
    validarInputs(
        {
            form: '#maxCitas_719',
            orden: '1'
        },
        function () {
            validarFrecuencia_119();
        },
        function () {
            var cantCitas = cerosIzq($('#cantMaxCitas_Ser119').val(), 2)
            arrayDatosCompletos719.CITAS = cantCitas

            if (arrayDatosCompletos719.INTMIN == '00') {
                arrayDatosCompletos719.FORMAGEN = 'N'
                $('#agendaExcep719').val('NO')
                arrayDatosCompletos719.SOBREAGEN = 'S'
                $('#sobreAgenda719').val('SI')
                sobreAgendar_719();
            } else {
                forma_Agendamiento_719()
            }

        }
    )
}

function forma_Agendamiento_719() {
    var arrayForma_agend = [
        { "COD": "S", "DESCRIP": "SI" },
        { "COD": "N", "DESCRIP": "NO" }
    ]

    POPUP({
        array: arrayForma_agend,
        titulo: 'Usar Agendamiento Por Excepciones?',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        callback_f: () => { validarFrecuencia_119() },
        seleccion: arrayDatosCompletos719.FORMAGEN,
        teclaAlterna: true
    }, function (data) {
        arrayDatosCompletos719.FORMAGEN = data.COD
        $('#agendaExcep719').val(data.DESCRIP)

        if (arrayDatosCompletos719.FORMAGEN == 'S') {
            validarPopup_119()
        } else {
            sobreAgendar_719()
        }
    })
}

function sobreAgendar_719() {
    var arraySobre_agend = [
        { "COD": "S", "DESCRIP": "SI" },
        { "COD": "N", "DESCRIP": "NO" }
    ]

    setTimeout(() => {
        POPUP({
            array: arraySobre_agend,
            titulo: 'Permitir sobre agendar?',
            indices: [
                { id: 'COD', label: 'DESCRIP' }
            ],
            callback_f: () => { setTimeout(forma_Agendamiento_719, 300) },
            seleccion: arrayDatosCompletos719.SOBREAGEN,
            teclaAlterna: true
        }, function (data) {
            arrayDatosCompletos719.SOBREAGEN = data.COD
            $('#sobreAgenda719').val(data.DESCRIP)
            validarDeshabilitarDesde_719()
        })
    }, 300)
}

function validarPopup_119() {
    loader('show')

    var fuente = '<div>' +
        '<div class="col-md-12">' +
        '<div class="portlet light no-padding">' +
        '<div class="portlet-body no-padding">' +
        '<div class="form-group col-md-12 col-sm-12 col-xs-12 no-padding" style="margin: 0 auto;">' +
        '<div class="col-md-12 col-sm-12 col-xs-12">' +
        '<div class="form-group col-md-12 col-sm-12 col-xs-12 no-padding" style="margin: 0 auto;">' +

        '<div style="display: flex">' +
        '<div class="col-md-8 inline-inputs">' +

        '<div class="col-md-12 col-sm-12 col-xs-12 no-padding" id="NovedadPopUp_SAL719">' +
        '<div class="col-md-6 inline-inputs">' +
        '<label class="col-md-7 col-sm-7 col-xs-7">Novedad:</label>' +
        '<div class="input-group col-md-5 col-sm-5 col-xs-5">' +
        '<input id="inputNovedadPopUp_119" class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled" maxlength="1" data-orden="1">' +
        '</div>' +
        '</div>' +
        '<div class="col-md-6 col-sm-6 col-xs-6">' +
        '<div class="input-group col-md-12 col-sm-12 col-xs-12">' +
        '<input id="descripNovedadPopUp_119" class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +

        '<div class="salto-linea"></div>' +

        '<div class="col-md-12 col-sm-12 col-xs-12 no-padding">' +

        '<div class="col-md-4 col-sm-4" id="fechaPopUp">' +
        '<label>Fecha Atencion:</label>' +
        '<div class="inline-inputs">' +
        '<div class="input-group col-md-10 col-sm-10 col-xs-10">' +
        '<input id="fechaPopUp_119" class="imaskFechaPop form-control col-md-12 col-sm-12 col-xs-12" required="true" maxlength="10" data-orden="1" disabled="disabled">' +
        '</div>' +
        '<button type="button" id="fechaPopUpBtn_119" class="btn f8-Btn btn-default col-md-2 col-sm-2 col-xs-2"><i class="icon-magnifier"></i>' +
        '</button>' +
        '</div>' +
        '</div>' +

        '<div class="col-md-2 col-sm-2 col-xs-2">' +
        '<label>Dia semana:</label>' +
        '<div class="inline-inputs">' +
        '<div class="input-group col-md-12 col-sm-12 col-xs-12">' +
        '<input id="diaMomentPopUp_119" style="text-align:center" class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">' +
        '</div>' +
        '</div>' +
        '</div>' +

        '<div class="col-md-6 col-sm-6 col-xs-6">' +
        '<label></label>' +
        '<div class="inline-inputs">' +
        '<div class="input-group col-md-12 col-sm-12 col-xs-12">' +
        '<input id="fechaMomentPopUp_119" style="text-align: center" class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">' +
        '</div>' +
        '</div>' +
        '</div>' +


        '</div>' +



        '<div class="salto-linea"></div>' +

        '<div class="col-md-12 col-sm-12 col-xs-12">' +
        '<label>Observaciones:</label>' +
        '<div class="inline-inputs" id="observPopUp_119">' +
        '<div class="input-group col-md-12 col-sm-12 col-xs-12">' +
        '<input id="observacionesPopUp_119" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="50" data-orden="1" disabled="disabled">' +
        '</div>' +
        '</div>' +
        '</div>' +

        '<div class="salto-linea"></div>' +

        '<div class="col-md-12 col-sm-12 col-xs-12 scrolling-wrapper_119 form-group" style="padding-right: 0;padding-left: 0;">' +

        '<div class="boxInScroll box-center" style="width: 1600px">' +

        '<div class="col-md-12 col-sm-12 col-xs-12">' +
        '<div class="inline-inputs">' +

        '<div class="col-md-3 col-sm-3 col-xs-3">' +
        '<label class="col-md-12 col-sm-12 col-xs-12">Sucursal</label>' +
        '</div>' +
        '<div class="col-md-3 col-sm-3 col-xs-3">' +
        '<label class="col-md-12 col-sm-12 col-xs-12">Entra</label>' +
        '</div>' +
        '<div class="col-md-3 col-sm-3 col-xs-3">' +
        '<label class="col-md-12 col-sm-12 col-xs-12">Sale</label>' +
        '</div>' +
        '<div class="col-md-3 col-sm-3 col-xs-3">' +
        '<label class="col-md-12 col-sm-12 col-xs-12">Fre</label>' +
        '</div>' +
        '<div class="col-md-3 col-sm-3 col-xs-3">' +
        '<label class="col-md-12 col-sm-12 col-xs-12">Sucursal</label>' +
        '</div>' +
        '<div class="col-md-3 col-sm-3 col-xs-3">' +
        '<label class="col-md-12 col-sm-12 col-xs-12">Entra</label>' +
        '</div>' +
        '<div class="col-md-3 col-sm-3 col-xs-3">' +
        '<label class="col-md-12 col-sm-12 col-xs-12">Sale</label>' +
        '</div>' +
        '<div class="col-md-3 col-sm-3 col-xs-3">' +
        '<label class="col-md-12 col-sm-12 col-xs-12">Fre</label>' +
        '</div>' +
        '<div class="col-md-3 col-sm-3 col-xs-3">' +
        '<label class="col-md-12 col-sm-12 col-xs-12">Sucursal</label>' +
        '</div>' +
        '<div class="col-md-3 col-sm-3 col-xs-3">' +
        '<label class="col-md-12 col-sm-12 col-xs-12">Entra</label>' +
        '</div>' +
        '<div class="col-md-3 col-sm-3 col-xs-3">' +
        '<label class="col-md-12 col-sm-12 col-xs-12">Sale</label>' +
        '</div>' +
        '<div class="col-md-3 col-sm-3 col-xs-3">' +
        '<label class="col-md-12 col-sm-12 col-xs-12">Fre</label>' +
        '</div>' +
        '<div class="col-md-3 col-sm-3 col-xs-3">' +
        '<label class="col-md-12 col-sm-12 col-xs-12">Sucursal</label>' +
        '</div>' +
        '<div class="col-md-3 col-sm-3 col-xs-3">' +
        '<label class="col-md-12 col-sm-12 col-xs-12">Entra</label>' +
        '</div>' +
        '<div class="col-md-3 col-sm-3 col-xs-3">' +
        '<label class="col-md-12 col-sm-12 col-xs-12">Sale</label>' +
        '</div>' +
        '<div class="col-md-3 col-sm-3 col-xs-3">' +
        '<label class="col-md-12 col-sm-12 col-xs-12">Fre</label>' +
        '</div>' +

        '</div>' +
        '</div>' +

        '<div class="salto-linea"></div>' +

        '<div class="col-md-12 col-sm-12 col-xs-12">' +
        '<div class="inline-inputs">' +

        '<div id="valTablaPopUp_1" class="input-group col-md-3 col-sm-3 col-xs-3" style="display:flex">' +
        '<div class=" col-md-12 inline-inputs">' +
        '<input id="sucurPop1" type="text" maxlength="2" data-orden="1" disabled="disabled" class="form-control f8sucursalTablaPop uppercase col-md-12 col-sm-12 col-xs-12">' +
        '</div>' +
        '</div>' +
        '<div id="valTablaPopUp_2" class="input-group col-md-3 col-sm-3 col-xs-3" style="display:flex">' +
        '<div class=" col-md-12 inline-inputs">' +
        '<input id="horaIng1" type="text" maxlength="5" data-orden="1" disabled="disabled" class="form-control ingPop1 uppercase imaskHoraPop col-md-12 col-sm-12 col-xs-12">' +
        '</div>' +
        '</div>' +
        '<div id="valTablaPopUp_3" class="input-group col-md-3 col-sm-3 col-xs-3" style="display:flex">' +
        '<div class="col-md-12 inline-inputs">' +
        '<input id="horaSal1" type="text" maxlength="5" data-orden="1" disabled="disabled" class="form-control salPop1 uppercase imaskHoraPop col-md-12 col-sm-12 col-xs-12">' +
        '</div>' +
        '</div>' +

        '<div id="valTablaPopUp_4" class="input-group col-md-3 col-sm-3 col-xs-3" style="display:flex">' +
        '<div class="col-md-12 inline-inputs">' +
        '<input id ="frec1" type="text" maxlength="2" data-orden="1" disabled="disabled" class="form-control imaskFrecPop uppercase col-md-12 col-sm-12 col-xs-12">' +
        '</div>' +
        '</div>' +

        '<div id="valTablaPopUp_5" class="input-group col-md-3 col-sm-3 col-xs-3" style="display:flex">' +
        '<div class=" col-md-12 inline-inputs">' +
        '<input id="sucurPop2" type="text" maxlength="2" data-orden="1" disabled="disabled" class="form-control f8sucursalTablaPop uppercase col-md-12 col-sm-12 col-xs-12">' +
        '</div>' +
        '</div>' +

        '<div id="valTablaPopUp_6" class="input-group col-md-3 col-sm-3 col-xs-3" style="display:flex">' +
        '<div class=" col-md-12 inline-inputs">' +
        '<input id="horaIng2" type="text" maxlength="5" disabled="disabled" data-orden="1" class="form-control ingPop2 uppercase imaskHoraPop col-md-12 col-sm-12 col-xs-12">' +
        '</div>' +
        '</div>' +
        '<div id="valTablaPopUp_7" class="input-group col-md-3 col-sm-3 col-xs-3" style="display:flex">' +
        '<div class="col-md-12 inline-inputs">' +
        '<input id="horaSal2" type="text" maxlength="5" disabled="disabled" data-orden="1" class="form-control salPop2 uppercase imaskHoraPop col-md-12 col-sm-12 col-xs-12">' +
        '</div>' +
        '</div>' +

        '<div id="valTablaPopUp_8" class="input-group col-md-3 col-sm-3 col-xs-3" style="display:flex">' +
        '<div class="col-md-12 inline-inputs">' +
        '<input id ="frec2" type="text" maxlength="2" data-orden="1" disabled="disabled" class="form-control imaskFrecPop uppercase col-md-12 col-sm-12 col-xs-12">' +
        '</div>' +
        '</div>' +

        '<div id="valTablaPopUp_9" class="input-group col-md-3 col-sm-3 col-xs-3" style="display:flex">' +
        '<div class=" col-md-12 inline-inputs">' +
        '<input id="sucurPop3" type="text" maxlength="2" data-orden="1" disabled="disabled" class="form-control f8sucursalTablaPop uppercase col-md-12 col-sm-12 col-xs-12">' +
        '</div>' +
        '</div>' +

        '<div id="valTablaPopUp_10" class="input-group col-md-3 col-sm-3 col-xs-3" style="display:flex">' +
        '<div class=" col-md-12 inline-inputs">' +
        '<input id="horaIng3" type="text" maxlength="5" disabled="disabled" data-orden="1" class="form-control ingPop3 uppercase imaskHoraPop col-md-12 col-sm-12 col-xs-12">' +
        '</div>' +
        '</div>' +
        '<div id="valTablaPopUp_11" class="input-group col-md-3 col-sm-3 col-xs-3" style="display:flex">' +
        '<div class="col-md-12 inline-inputs">' +
        '<input id="horaSal3" type="text" maxlength="5" disabled="disabled" data-orden="1" class="form-control salPop3 uppercase imaskHoraPop col-md-12 col-sm-12 col-xs-12">' +
        '</div>' +
        '</div>' +

        '<div id="valTablaPopUp_12" class="input-group col-md-3 col-sm-3 col-xs-3" style="display:flex">' +
        '<div class="col-md-12 inline-inputs">' +
        '<input id ="frec3" type="text" maxlength="2" data-orden="1" disabled="disabled" class="form-control imaskFrecPop uppercase col-md-12 col-sm-12 col-xs-12">' +
        '</div>' +
        '</div>' +

        '<div id="valTablaPopUp_13" class="input-group col-md-3 col-sm-3 col-xs-3" style="display:flex">' +
        '<div class=" col-md-12 inline-inputs">' +
        '<input id="sucurPop4" type="text" maxlength="2" data-orden="1" disabled="disabled" class="form-control f8sucursalTablaPop uppercase col-md-12 col-sm-12 col-xs-12">' +
        '</div>' +
        '</div>' +

        '<div id="valTablaPopUp_14" class="input-group col-md-3 col-sm-3 col-xs-3" style="display:flex">' +
        '<div class=" col-md-12 inline-inputs">' +
        '<input id="horaIng4" type="text" maxlength="5" disabled="disabled" data-orden="1" class="form-control ingPop4 uppercase imaskHoraPop col-md-12 col-sm-12 col-xs-12">' +
        '</div>' +
        '</div>' +
        '<div id="valTablaPopUp_15" class="input-group col-md-3 col-sm-3 col-xs-3" style="display:flex">' +
        '<div class="col-md-12 inline-inputs">' +
        '<input id="horaSal4" type="text" maxlength="5" disabled="disabled" data-orden="1" class="form-control salPop4 uppercase imaskHoraPop col-md-12 col-sm-12 col-xs-12">' +
        '</div>' +
        '</div>' +
        '<div id="valTablaPopUp_16" class="input-group col-md-3 col-sm-3 col-xs-3" style="display:flex">' +
        '<div class="col-md-12 inline-inputs">' +
        '<input id ="frec4" type="text" maxlength="2" disabled="disabled" data-orden="1" class="form-control imaskFrecPop uppercase col-md-12 col-sm-12 col-xs-12">' +
        '</div>' +
        '</div>' +

        '</div>' +
        '</div>' +


        '</div>' +
        '</div>' +

        '<div class="col-md-12 col-sm-12 col-xs-12 no-padding">' +

        '<div style="display: flex">' +
        '<div class="col-md-9 inline-inputs">' +

        '<div class="col-md-5 col-sm-5">' +
        '<div class="inline-inputs">' +
        '<label class="col-md-6 col-sm-6 col-xs-6">Modif:</label>' +
        '<div class="input-group col-md-6 col-sm-6 col-xs-6">' +
        '<input id="creacionPopup_719" class="imaskFechaPop form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">' +
        '</div>' +
        '</div>' +
        '</div>' +

        '<div class="col-md-7 col-sm-7 col-xs-7">' +
        '<div class="inline-inputs">' +
        '<label class="col-md-6 col-sm-6 col-xs-6">Fecha Modif:</label>' +
        '<div class="input-group col-md-6 col-sm-6 col-xs-6">' +
        '<input id="fechaCreaPopUp_119" style="text-align:center" class="form-control col-md-12 col-sm-12 col-xs-12" disabled="disabled">' +
        '</div>' +
        '</div>' +
        '</div>' +

        '</div>' +
        '</div>' +
        '</div>' +

        '</div>' +

        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div style="clear:both;"></div>' +
        '</div>'

    var dialogo = bootbox.dialog({
        title: "Fecha y Horario De Atencion",
        message: fuente,
        buttons: {
            main: {
                label: "Aceptar",
                className: "blue hidden",
                callback: function () {

                }
            }
        },
    });

    var momentFormatPop = 'YYYY/MM/DD';
    momentMaskFechaPopup = new IMask($("#fechaPopUp_119")[0], {
        mask: Date,
        pattern: momentFormatPop,
        lazy: true,
        min: new Date(2009, 0, 1, 0, 0),
        max: new Date(2080, 0, 1, 0, 0),

        format: function (date) {
            return moment(date).format(momentFormatPop);
        },
        parse: function (str) {
            $_fechaPopUp_119 = str;
            return moment(str, momentFormatPop);
        },

        blocks: {
            YYYY: {
                mask: IMask.MaskedRange,
                from: 2009,
                to: 2080
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

    })

    // $("#fechaPopUp_119").each(function (index, element) {
    //     $_fechaPopUp_119 = IMask(element, {
    //         mask: Date,
    //         pattern: momentFormat,
    //         lazy: true,
    //         min: new Date(2009, 0, 1),
    //         max: new Date(2024, 0, 1),

    //         format: function (date) {
    //             return moment(date).format(momentFormat);
    //         },
    //         parse: function (str) {
    //             // $_fechaPopUp_119 = str;
    //             return moment(str, momentFormat);
    //         },

    //         blocks: {
    //             YYYY: {
    //                 mask: IMask.MaskedRange,
    //                 from: 2009,
    //                 to: 2080
    //             },
    //             MM: {
    //                 mask: IMask.MaskedRange,
    //                 from: 1,
    //                 to: 12
    //             },
    //             DD: {
    //                 mask: IMask.MaskedRange,
    //                 from: 1,
    //                 to: 31
    //             }
    //         }

    // })
    // })

    dialogo.init(function () {
        // Inicia validaci�n pop-up
        $('.modal-content').css({ 'width': '820px', 'position': 'fixed', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%, -50%)' })



        $(".imaskHoraPop").each(function (index, element) {
            var blocksMaskHora = IMask(element, {
                mask: 'HH:MM',
                lazy: true,  // make placeholder always visible


                blocks: {
                    HH: {
                        mask: IMask.MaskedRange,
                        from: 0,
                        to: 23,
                    },
                    MM: {
                        mask: IMask.MaskedRange,
                        from: 0,
                        to: 59,
                    }
                }
            });
            maskHoraPop.push(blocksMaskHora);
        })

        _toggleF8([
            { input: 'fechaPopUp', app: '119', funct: _ventanaHorarios719 },
        ]);

        traerHorarios_sal719()
    })
}

function _ventanaHorarios719(e) {
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        var horario = arrayHorProf_119.filter(data => data.ID_PERSONAL == cerosIzq(arrayDatosCompletos719.IDENTIFICACION.trim(), 10))

        _ventanaDatos({
            titulo: "Ventana De Horario del profesional",
            columnas: ["FECHA_LETRAS", "DIA_SEMANA"],
            data: horario,
            callback_esc: function () {
                $("#fechaPopUp_119").focus()
            },
            callback: function (data) {
                momentMaskFechaPopup.typedValue = moment(data.FECHA).format('YYYY/MM/DD')
                _enterInput('#fechaPopUp_119');
            }
        });
    }
}

function traerHorarios_sal719() {
    obtenerDatosCompletos({ nombreFd: 'HORAR' }, function (data) {
        arrayHorProf_119 = data.DIASDISPONIBLES;
        arrayHorProf_119.pop();

        loader('hide')
        setTimeout(validarNovedadPopUp_119, 500);
    }, 'ONLY');
}

function validarNovedadPopUp_119() {
    validarInputs(
        {
            form: '#NovedadPopUp_SAL719',
            orden: 1
        },
        function () {
            $('[data-bb-handler="main"]').click()
            bootbox.hideAll()
            validarCantCitas_119()
        },
        function () {
            $_NovedPopUp719 = $('#inputNovedadPopUp_119').val();

            switch ($_NovedPopUp719) {
                case '7':
                    $('#descripNovedadPopUp_119').val('Nuevo')
                    validarFechaAtencion_119();
                    break;
                case '8':
                    $('#descripNovedadPopUp_119').val('Cambio')
                    validarFechaAtencion_119();
                    break;
                case '9':
                    $('#descripNovedadPopUp_119').val('Retiro')
                    validarFechaAtencion_119();
                    break;
                case 'f':
                case 'F':
                    $('[data-bb-handler="main"]').click()
                    bootbox.hideAll()
                    sobreAgendar_719();
                    break;
                default: validarNovedadPopUp_119()
                    break;
            }

        }
    )
}

function buscarMaskHoraPopUp(element) {
    var retornar = false;
    for (var i in maskHoraPop) {
        var input = maskHoraPop[i].el.input
        var id = $(input).attr('id');
        if (id == element) retornar = i;
    }
    return retornar;
}

function validarFechaAtencion_119() {
    validarInputs(
        {
            form: '#fechaPopUp',
            orden: 1
        },
        () => validarNovedadPopUp_119(),
        function () {
            var fechaMoment = moment($_fechaPopUp_119).format("YYYYMMDD")
            console.log(fechaMoment, 'FECHAAAAA')
            var fechaActualPopUp = moment().format("YYYYMMDD")

            if (parseInt(fechaMoment) < parseInt(fechaActualPopUp)) {
                CON851('37', '37', null, 'error', 'error');
                validarFechaAtencion_119()
            } else {
                var busquedaHorario = arrayHorProf_119.find(data => data.ID_PERSONAL == cerosIzq(arrayDatosCompletos719.IDENTIFICACION.trim(), 10) && data.FECHA == fechaMoment)
                console.log(busquedaHorario)

                var festivo = buscarFestivo(fechaMoment)
                console.log(festivo)

                if (festivo) {
                    CON851('9Q', '9Q', null, 'error', 'error');
                    jAlert(
                        { titulo: 'Atencion!,Dato fuera del horario establecido ', mensaje: moment($_fechaPopUp_119).format('dddd DD MMM/YYYY') + '           ' + '<b> Festivo: </b>' + festivo },
                        () => validarFechaPopup_SAL719(busquedaHorario, fechaMoment));
                } else {
                    validarFechaPopup_SAL719(busquedaHorario, fechaMoment)
                }

            }
        }
    )
}

function validarFechaPopup_SAL719(busquedaHorario, fechaMoment) {
    switch ($_NovedPopUp719) {
        case '7':
            if (!busquedaHorario) {
                $('#diaMomentPopUp_119').val(moment(fechaMoment).format("d"))
                $('#fechaMomentPopUp_119').val(moment(fechaMoment).format('dddd DD MMM/YYYY'))
                observacionesPopUp_119()
            } else {
                CON851('00', '00', null, 'error', 'error');
                validarFechaAtencion_119()
            }
            break;
        case '8':
            if (!busquedaHorario) {
                CON851('01', '01', null, 'error', 'error');
                validarFechaAtencion_119()
            } else {
                mostrarDatosPopUp_119(busquedaHorario)
                observacionesPopUp_119()
            }
            break;
        case '9':
            if (!busquedaHorario) {
                CON851('01', '01', null, 'error', 'error');
                validarFechaAtencion_119()
            } else {
                mostrarDatosPopUp_119(busquedaHorario)
                preguntaGrabarPopup(null, '54')
            }
            break;
    }
}

function mostrarDatosPopUp_119(data) {
    $('#diaMomentPopUp_119').val(data.DIA_SEMANA)
    $('#fechaMomentPopUp_119').val(data.FECHA_LETRAS)
    $('#creacionPopup_719').val(data.OPER_CREA)
    $('#fechaCreaPopUp_119').val(data.FECHA_CREA)

    $('#observacionesPopUp_119').val(data.OBSERVACION.trim())

    $('#sucurPop1').val(data.SUCURSAL1)
    maskHoraPop[buscarMaskHoraPopUp('horaIng1')].unmaskedValue = data.HORA_INGRESO1
    maskHoraPop[buscarMaskHoraPopUp('horaSal1')].unmaskedValue = data.HORA_SALIDA1
    $('#frec1').val(data.FREC_1)

    $('#sucurPop2').val(data.SUCURSAL2)
    maskHoraPop[buscarMaskHoraPopUp('horaIng2')].unmaskedValue = data.HORA_INGRESO2
    maskHoraPop[buscarMaskHoraPopUp('horaSal2')].unmaskedValue = data.HORA_SALIDA2
    $('#frec2').val(data.FREC_2)

    $('#sucurPop3').val(data.SUCURSAL3)
    maskHoraPop[buscarMaskHoraPopUp('horaIng3')].unmaskedValue = data.HORA_INGRESO3
    maskHoraPop[buscarMaskHoraPopUp('horaSal3')].unmaskedValue = data.HORA_SALIDA3
    $('#frec3').val(data.FREC_3)

    $('#sucurPop4').val(data.SUCURSAL4)
    maskHoraPop[buscarMaskHoraPopUp('horaIng4')].unmaskedValue = data.HORA_INGRESO4
    maskHoraPop[buscarMaskHoraPopUp('horaSal4')].unmaskedValue = data.HORA_SALIDA4
    $('#frec4').val(data.FREC_4)
}

function observacionesPopUp_119() {
    validarInputs(
        {
            form: '#observPopUp_119',
            orden: 1
        },
        function () {
            validarFechaAtencion_119();
        },
        function () {
            valPopUpEntraSalida_119(1)
        }
    )
}

function valPopUpEntraSalida_119(a) {
    validarInputs(
        {
            form: '#valTablaPopUp_' + a,
            orden: '1',
            event_f3: () => {
                switch (a) {
                    case 1:
                    case 5:
                    case 9:
                    case 13:
                        preguntaGrabarPopup(a, '01')
                        break;
                    default:
                        valPopUpEntraSalida_119(a)
                        break;
                }
            }
        },
        function () {
            if (a == '1') {
                observacionesPopUp_119(2)
            } else {
                valPopUpEntraSalida_119(parseInt(a) - 1)
            }
        },
        function () {
            var secuencia = encontrarGrupo_119(a)

            switch (a) {
                case 1:
                case 5:
                case 9:
                case 13:
                    var nomInputSuc = cerosIzq($('#sucurPop' + secuencia).val(), 2)
                    $('#sucurPop' + secuencia).val(nomInputSuc)
                    var busqueda = arraySucursal_719.find(sucursal => sucursal.CODIGO == nomInputSuc)


                    if (!busqueda) {
                        CON851('01', '01', null, 'error', 'error');
                        valPopUpEntraSalida_119(a)
                    } else {
                        valPopUpEntraSalida_119(parseInt(a) + 1)
                    }

                    break;
                //////////hora entrada
                case 2:
                case 6:
                case 10:
                case 14:
                    var idEntra1 = buscarMaskHoraPopUp('horaIng' + secuencia)

                    var entra1 = maskHoraPop[idEntra1].unmaskedValue

                    if (entra1.trim().length > 0) {
                        if (a == '2') {
                            maskHoraPop[idEntra1].typedValue = cerosDer(entra1, 4)
                            valPopUpEntraSalida_119(parseInt(a) + 1)
                        } else {
                            var idAnt = 'horaSal' + (parseInt(secuencia) - 1)
                            var saleAnterior = buscarMaskHoraPopUp(idAnt)
                            var saleAnt = maskHoraPop[saleAnterior].unmaskedValue

                            if (entra1 <= saleAnt) {
                                CON851('01', 'Verifique hora anterior!', null, 'error');
                                valPopUpEntraSalida_119(a)
                            } else {
                                maskHoraPop[idEntra1].typedValue = cerosDer(entra1, 4)
                                valPopUpEntraSalida_119(parseInt(a) + 1)
                            }
                        }
                    } else {
                        valPopUpEntraSalida_119(a)
                    }
                    break;
                ///////hora salida    
                case 3:
                case 7:
                case 11:
                case 15:
                    var idEntra2 = buscarMaskHoraPopUp('horaIng' + secuencia)

                    var entra2 = maskHoraPop[idEntra2].unmaskedValue

                    var idsale = buscarMaskHoraPopUp('horaSal' + secuencia)
                    var sale = maskHoraPop[idsale].unmaskedValue

                    if (sale < entra2) {
                        CON851('01', 'Verifique hora anterior!', null, 'error');
                        valPopUpEntraSalida_119(a)
                    } else {
                        maskHoraPop[idsale].typedValue = cerosDer(sale, 4)

                        var siguiente = parseInt(a) + 1
                        switch (siguiente) {
                            case 4:
                            case 8:
                            case 12:
                            case 16:
                                if ((arrayDatosCompletos719.INTMIN != '00') && ($('#frec' + secuencia).val().trim() == '')) {
                                    $('#frec' + secuencia).val(arrayDatosCompletos719.INTMIN)
                                }
                                valPopUpEntraSalida_119(siguiente)
                                break;
                            default:
                                valPopUpEntraSalida_119(siguiente)
                                break;
                        }
                    }
                    break;
                /////frecuencia    
                case 4:
                case 8:
                case 12:
                case 16:
                    var respuestaFrec = validarFrecuenciaTabla_119($('#frec' + secuencia).val())

                    switch (respuestaFrec) {
                        case false:
                            CON851('03', '03', null, 'error');
                            valPopUpEntraSalida_119(a)
                            break;
                        case true:
                            if (a == '16') {
                                preguntaGrabarPopup(a, '01')
                            } else {
                                valPopUpEntraSalida_119(parseInt(a) + 1)
                            }
                            break;
                    }
                    break;
            }
        }
    )
}

function preguntaGrabarPopup(a, mensaje) {
    CON851P(mensaje, () => {
        if ($_NovedPopUp719 != '9') {
            valPopUpEntraSalida_119(a)
        } else {
            validarFechaAtencion_119()
        }
    }, guardarPopUp_119)
}

function guardarPopUp_119() {
    loader('show')

    var envioDatos = datosEnvio()
    envioDatos += $_NovedPopUp719
    envioDatos += '|'
    envioDatos += cerosIzq(arrayDatosCompletos719.IDENTIFICACION.trim(), 10)
    envioDatos += '|'
    envioDatos += moment($_fechaPopUp_119).format("YYYYMMDD")
    envioDatos += '|'
    envioDatos += moment($_fechaPopUp_119).format("d")
    envioDatos += '|'
    envioDatos += moment($_fechaPopUp_119).format('dddd DD MMM/YYYY')
    envioDatos += '|'
    envioDatos += espaciosDer($('#observacionesPopUp_119').val(), 50)
    envioDatos += '|'
    envioDatos += $('#sucurPop1').val()
    envioDatos += '|'
    envioDatos += maskHoraPop[buscarMaskHoraPopUp('horaIng1')].unmaskedValue
    envioDatos += '|'
    envioDatos += maskHoraPop[buscarMaskHoraPopUp('horaSal1')].unmaskedValue
    envioDatos += '|'
    envioDatos += $('#frec1').val()
    envioDatos += '|'
    envioDatos += $('#sucurPop2').val()
    envioDatos += '|'
    envioDatos += maskHoraPop[buscarMaskHoraPopUp('horaIng2')].unmaskedValue
    envioDatos += '|'
    envioDatos += maskHoraPop[buscarMaskHoraPopUp('horaSal2')].unmaskedValue
    envioDatos += '|'
    envioDatos += $('#frec2').val()
    envioDatos += '|'
    envioDatos += $('#sucurPop3').val()
    envioDatos += '|'
    envioDatos += maskHoraPop[buscarMaskHoraPopUp('horaIng3')].unmaskedValue
    envioDatos += '|'
    envioDatos += maskHoraPop[buscarMaskHoraPopUp('horaSal3')].unmaskedValue
    envioDatos += '|'
    envioDatos += $('#frec3').val()
    envioDatos += '|'
    envioDatos += $('#sucurPop4').val()
    envioDatos += '|'
    envioDatos += maskHoraPop[buscarMaskHoraPopUp('horaIng4')].unmaskedValue
    envioDatos += '|'
    envioDatos += maskHoraPop[buscarMaskHoraPopUp('horaSal4')].unmaskedValue
    envioDatos += '|'
    envioDatos += $('#frec4').val()
    envioDatos += '|'
    envioDatos += localStorage.Usuario
    envioDatos += '|'
    envioDatos += moment().format("YYYYMMDD")
    envioDatos += '|'

    //cuando acaba
    let URL = get_url("APP/SALUD/SAL719-02.DLL");
    postData({
        datosh: envioDatos
    }, URL)
        .then((data) => {
            console.log(data)

            var mensaje
            switch ($_NovedPopUp719) {
                case '7': mensaje = 'Creado correctamente'
                    break;
                case '8': mensaje = 'Modificado correctamente'
                    break;
                case '9': mensaje = 'Eliminado correctamente'
                    break;
            }

            CON851('', mensaje, null, 'success', 'Exitoso');
            arrayHorProf_119 = []
            $('#diaMomentPopUp_119').val('')

            $('#observacionesPopUp_119').val('')

            $('#sucurPop1').val('')
            maskHoraPop[buscarMaskHoraPopUp('horaIng1')].unmaskedValue = ''
            maskHoraPop[buscarMaskHoraPopUp('horaSal1')].unmaskedValue = ''
            $('#frec1').val('')

            $('#sucurPop2').val('')
            maskHoraPop[buscarMaskHoraPopUp('horaIng2')].unmaskedValue = ''
            maskHoraPop[buscarMaskHoraPopUp('horaSal2')].unmaskedValue = ''
            $('#frec2').val('')

            $('#sucurPop3').val('')
            maskHoraPop[buscarMaskHoraPopUp('horaIng3')].unmaskedValue = ''
            maskHoraPop[buscarMaskHoraPopUp('horaSal3')].unmaskedValue = ''
            $('#frec3').val('')

            $('#sucurPop4').val('')
            maskHoraPop[buscarMaskHoraPopUp('horaIng4')].unmaskedValue = ''
            maskHoraPop[buscarMaskHoraPopUp('horaSal4')].unmaskedValue = ''
            $('#frec4').val('')

            $('#creacionPopup_719').val('')
            $('#fechaCreaPopUp_119').val('')
            $('#diaMomentPopUp_119').val('')
            $('#fechaMomentPopUp_119').val('')

            traerHorarios_sal719()
        })
        .catch(error => {
            console.error(error)
            _toggleNav()
        });
}

function validarDeshabilitarDesde_719() {
    validarInputs(
        {
            form: '#validarDeshabilitarDesde_719',
            orden: "1"
        },
        function () { validarCantCitas_119(); },
        function () {
            var fechaDig = $('#desAgenDesde_ser119').val()

            if (fechaDig.trim().length < 1) {
                $('#desAgenDesde_ser119').val('')
                $('#desAgenHasta_ser119').val('')
                validarPopUpRango_119()
            } else {
                var fechaDeshabDesde = parseInt(moment($_fechaDeshabDesde_119).format("YYYYMMDDHHmm"))
                var fechaActual = moment().format("YYYYMMDDHHmm")
                if (fechaDeshabDesde < fechaActual) {
                    CON851('37', '37', null, 'error', 'error');
                    validarDeshabilitarDesde_719()
                } else {
                    validarDeshabilitarHasta_719();
                }
            }
        }
    )
}

function validarDeshabilitarHasta_719() {
    validarInputs(
        {
            form: '#validarDeshabilitarHasta_719',
            orden: "1"
        },
        function () {
            validarDeshabilitarDesde_719();
        },
        function () {
            if ($_fechaDeshabHasta_119 <= $_fechaDeshabDesde_119) {
                CON851('37', '37', null, 'error', 'error');
                validarDeshabilitarHasta_719()
            } else {
                validarPopUpRango_119()
            }

        }
    )
}

function validarPopUpRango_119() {
    if ($_USUA_GLOBAL[0].NIT == 0830092718 || $_USUA_GLOBAL[0].NIT == 0830092719) {
        popUpRango_119()
    } else {
        arrayDatosCompletos719.RANGO = '00'
        validar_Confirmar_119()
    }
}

function popUpRango_119() {
    bootbox.prompt({
        size: "small",
        title: "Rango de bloqueo",
        maxlength: 2,
        callback: function (result) {
            switch (result) {
                case result > 15:
                    CON851('03', '03', null, 'error', 'error');
                    popUpRango_119()
                    break;
                case null:
                    popUpRango_119()
                    break;
                default:
                    arrayDatosCompletos719.RANGO = cerosIzq(result, 2)
                    validar_Confirmar_119()
                    break;
            }
        }
    });
}

function validar_Confirmar_119() {
    if (arrayDatosCompletos719.FORMAGEN == 'S' || arrayDatosCompletos719.INTMIN == '00') {
        guardarDatosCompletos_119()
    } else {
        validarLunes_119(1)
    }
}


function validarFrecuenciaTabla_119(valor) {
    var retornar = false
    switch (parseInt(valor)) {
        case 00:
        case 01:
        case 05:
        case 07:
        case 10:
        case 12:
        case 15:
        case 20:
        case 25:
        case 30:
        case 40:
        case 60:
            retornar = true
            break;
    }
    return retornar
}

function encontrarGrupo_119(a) {
    var retornar = false
    switch (a) {
        case 1:
        case 2:
        case 3:
        case 4:
            retornar = 1;
            break;
        case 5:
        case 6:
        case 7:
        case 8:
            retornar = 2;
            break;
        case 9:
        case 10:
        case 11:
        case 12:
            retornar = 3;
            break;
        case 13:
        case 14:
        case 15:
        case 16:
            retornar = 4;
            break;
    }
    return retornar;
}


function duplicarHorario_sal719(dia) {
    arrayDatosCompletos719.TABLA[dia].SUCURSAL1 = $('#sucursal1_' + (dia - 1)).val()
    $('#sucursal1_' + dia).val(arrayDatosCompletos719.TABLA[dia].SUCURSAL1.trim())

    var ing1 = buscarMaskHora('horaIngreso1_' + dia)
    maskHora[ing1].unmaskedValue = $('#horaIngreso1_' + (dia - 1)).val()

    var sal1 = buscarMaskHora('horaSalida1_' + dia)
    maskHora[sal1].unmaskedValue = $('#horaSalida1_' + (dia - 1)).val()

    arrayDatosCompletos719.TABLA[dia].INTMINTAB1 = $('#fre1_' + (dia - 1)).val()
    $('#fre1_' + dia).val(arrayDatosCompletos719.TABLA[dia].INTMINTAB1);



    arrayDatosCompletos719.TABLA[dia].SUCURSAL2 = $('#sucursal2_' + (dia - 1)).val()
    $('#sucursal2_' + dia).val(arrayDatosCompletos719.TABLA[dia].SUCURSAL2.trim())

    var ing2 = buscarMaskHora('horaIngreso2_' + dia)
    maskHora[ing2].unmaskedValue = $('#horaIngreso2_' + (dia - 1)).val()

    var sal2 = buscarMaskHora('horaSalida2_' + dia)
    maskHora[sal2].unmaskedValue = $('#horaSalida2_' + (dia - 1)).val()

    arrayDatosCompletos719.TABLA[dia].INTMINTAB2 = $('#fre2_' + (dia - 1)).val()
    $('#fre2_' + dia).val(arrayDatosCompletos719.TABLA[dia].INTMINTAB2);



    arrayDatosCompletos719.TABLA[dia].SUCURSAL3 = $('#sucursal3_' + (dia - 1)).val()
    $('#sucursal3_' + dia).val(arrayDatosCompletos719.TABLA[dia].SUCURSAL3.trim())

    var ing3 = buscarMaskHora('horaIngreso3_' + dia)
    maskHora[ing3].unmaskedValue = $('#horaIngreso3_' + (dia - 1)).val()

    var sal3 = buscarMaskHora('horaSalida3_' + dia)
    maskHora[sal3].unmaskedValue = $('#horaSalida3_' + (dia - 1)).val()

    arrayDatosCompletos719.TABLA[dia].INTMINTAB3 = $('#fre3_' + (dia - 1)).val()
    $('#fre3_' + dia).val(arrayDatosCompletos719.TABLA[dia].INTMINTAB3);



    arrayDatosCompletos719.TABLA[dia].SUCURSAL4 = $('#sucursal4_' + (dia - 1)).val()
    $('#sucursal4_' + dia).val(arrayDatosCompletos719.TABLA[dia].SUCURSAL4.trim())

    var ing4 = buscarMaskHora('horaIngreso4_' + dia)
    maskHora[ing4].unmaskedValue = $('#horaIngreso4_' + (dia - 1)).val()

    var sal4 = buscarMaskHora('horaSalida4_' + dia)
    maskHora[sal4].unmaskedValue = $('#horaSalida4_' + (dia - 1)).val()

    arrayDatosCompletos719.TABLA[dia].INTMINTAB4 = $('#fre4_' + (dia - 1)).val()
    $('#fre4_' + dia).val(arrayDatosCompletos719.TABLA[dia].INTMINTAB4);

    CON851('', 'Horario duplicado!', null, 'success', 'Exitoso');

    switch (dia) {
        case 1:
            validarMartes_119(1)
            break;
        case 2:
            validarMiercoles_119(1)
            break;
        case 3:
            validarJueves_119(1)
            break;
        case 4:
            validarViernes_119(1)
            break;
        case 5:
            validarSabado_119(1)
            break;
        case 6:
            validarDomingo_119(1)
            break;
    }
}


function validarLunes_119(a) {
    validarInputs(
        {
            form: '#valTablaLunes_' + a,
            orden: '1',
            event_f3: () => {
                switch (a) {
                    case 1:
                        validarCerrarHorario()
                        break;
                    case 5:
                    case 9:
                    case 13:
                        validarMartes_119(1)
                        break;
                    default:
                        validarLunes_119(a)
                        break;
                }
            },
            event_flecha_abajo: () => {
                switch (a) {
                    case 1:
                        validarMartes_119(1)
                        break;
                }
            }
        },
        function () {
            if (a == '1') {
                validarDeshabilitarDesde_719()
            } else {
                validarLunes_119(parseInt(a) - 1)
            }
        },
        function () {
            var secuencia = encontrarGrupo_119(a);
            switch (a) {
                case 1:
                case 5:
                case 9:
                case 13:
                    var nomInputSuc = cerosIzq($('#sucursal' + secuencia + '_0').val(), 2)
                    $('#sucursal' + secuencia + '_0').val(nomInputSuc)
                    var busqueda = arraySucursal_719.find(sucursal => sucursal.CODIGO == nomInputSuc)

                    if (nomInputSuc.trim().length > 0) {
                        if (!busqueda) {
                            CON851('01', '01', null, 'error', 'error');
                            validarLunes_119(a)
                        } else {
                            validarLunes_119(parseInt(a) + 1)
                        }
                    } else {
                        validarMartes_119(1)
                    }
                    break;
                //////////hora entrada
                case 2:
                case 6:
                case 10:
                case 14:
                    var idEntra1 = buscarMaskHora('horaIngreso' + secuencia + '_0')
                    var entra1 = maskHora[idEntra1].unmaskedValue

                    if (entra1.trim().length > 0) {
                        if (a == '2') {
                            maskHora[idEntra1].typedValue = cerosDer(entra1, 4)
                            validarLunes_119(parseInt(a) + 1)
                        } else {
                            var idAnt = 'horaSalida' + (parseInt(secuencia) - 1) + '_0'
                            var saleAnterior = buscarMaskHora(idAnt)
                            var saleAnt = maskHora[saleAnterior].unmaskedValue

                            if (entra1 <= saleAnt) {
                                CON851('01', 'Verifique hora anterior!', null, 'error');
                                validarLunes_119(a)
                            } else {
                                maskHora[idEntra1].typedValue = cerosDer(entra1, 4)
                                validarLunes_119(parseInt(a) + 1)
                            }
                        }
                    } else {
                        validarLunes_119(a)
                    }
                    break;
                ///////hora salida    
                case 3:
                case 7:
                case 11:
                case 15:
                    var idEntra2 = buscarMaskHora('horaIngreso' + secuencia + '_0')
                    var entra2 = maskHora[idEntra2].unmaskedValue

                    var idSale = buscarMaskHora('horaSalida' + secuencia + '_0')
                    var sale = maskHora[idSale].unmaskedValue

                    if (sale <= entra2) {
                        CON851('01', 'Verifique hora anterior!', null, 'error');
                        validarLunes_119(a)
                    } else {
                        maskHora[idSale].typedValue = cerosDer(sale, 4)
                        var siguiente = parseInt(a) + 1
                        switch (siguiente) {
                            case 4:
                            case 8:
                            case 12:
                            case 16:
                                if ((arrayDatosCompletos719.INTMIN != '00') && ($('#fre' + secuencia + '_0').val().trim() == '')) {
                                    $('#fre' + secuencia + '_0').val(arrayDatosCompletos719.INTMIN)
                                }
                                validarLunes_119(siguiente)
                                break;
                            default:
                                validarLunes_119(siguiente)
                                break;
                        }
                    }
                    break;
                /////frecuencia    
                case 4:
                case 8:
                case 12:
                case 16:
                    var index = buscarMaskFrecuencia('fre' + secuencia + '_0')
                    var valMask = index.unmaskedValue
                    var respuestaFrec = validarFrecuenciaTabla_119(valMask)

                    switch (respuestaFrec) {
                        case false:
                            CON851('03', '03', null, 'error');
                            validarLunes_119(a)
                            break;
                        case true:
                            if (a == '16') {
                                validarMartes_119(1)
                            } else {
                                validarLunes_119(parseInt(a) + 1)
                            }
                            break;
                    }
                    break;
            }
        }
    )
}

function validarMartes_119(a) {
    validarInputs(
        {
            form: '#valTablaMartes_' + a,
            orden: '1',
            event_f3: () => {
                switch (a) {
                    case 1:
                        validarCerrarHorario()
                        break;
                    case 5:
                    case 9:
                    case 13:
                        validarMiercoles_119(1)
                        break;
                    default:
                        validarMartes_119(a)
                        break;
                }
            },
            event_f9: () => {
                switch (a) {
                    case 1:
                        duplicarHorario_sal719(1)
                        break;
                }
            },
            event_flecha_arriba: () => {
                switch (a) {
                    case 1:
                        validarLunes_119(1)
                        break;
                }
            },
            event_flecha_abajo: () => {
                switch (a) {
                    case 1:
                        validarMiercoles_119(1)
                        break;
                }
            }
        },
        function () {
            if (a == '1') {
                validarLunes_119(1)
            } else {
                validarMartes_119(parseInt(a) - 1)
            }
        },
        function () {
            var secuencia = encontrarGrupo_119(a)

            switch (a) {
                case 1:
                case 5:
                case 9:
                case 13:
                    var nomInputSuc = cerosIzq($('#sucursal' + secuencia + '_1').val(), 2)
                    $('#sucursal' + secuencia + '_1').val(nomInputSuc)
                    var busqueda = arraySucursal_719.find(sucursal => sucursal.CODIGO == nomInputSuc)

                    if (nomInputSuc.trim().length > 0) {
                        if (!busqueda) {
                            CON851('01', '01', null, 'error', 'error');
                            validarMartes_119(a)
                        } else {
                            validarMartes_119(parseInt(a) + 1)
                        }
                    } else {
                        validarMiercoles_119(1)
                    }
                    break;
                //////////hora entrada
                case 2:
                case 6:
                case 10:
                case 14:
                    var idEntra1 = buscarMaskHora('horaIngreso' + secuencia + '_1')
                    var entra1 = maskHora[idEntra1].unmaskedValue

                    if (entra1.trim().length > 0) {
                        if (a == '2') {
                            maskHora[idEntra1].typedValue = cerosDer(entra1, 4)
                            validarMartes_119(parseInt(a) + 1)
                        } else {
                            var idAnt = 'horaSalida' + (parseInt(secuencia) - 1) + '_1'
                            var saleAnterior = buscarMaskHora(idAnt)
                            var saleAnt = maskHora[saleAnterior].unmaskedValue

                            if (entra1 <= saleAnt) {
                                CON851('01', 'Verifique hora anterior!', null, 'error');
                                validarMartes_119(a)
                            } else {
                                maskHora[idEntra1].typedValue = cerosDer(entra1, 4)
                                validarMartes_119(parseInt(a) + 1)
                            }
                        }
                    } else {
                        validarMartes_119(a)
                    }
                    break;
                ///////hora salida    
                case 3:
                case 7:
                case 11:
                case 15:
                    var idEntra2 = buscarMaskHora('horaIngreso' + secuencia + '_1')
                    var entra2 = maskHora[idEntra2].unmaskedValue

                    var idSale = buscarMaskHora('horaSalida' + secuencia + '_1')
                    var sale = maskHora[idSale].unmaskedValue

                    if (sale <= entra2) {
                        CON851('01', 'Verifique hora anterior!', null, 'error');
                        validarMartes_119(a)
                    } else {
                        maskHora[idSale].typedValue = cerosDer(sale, 4)
                        var siguiente = parseInt(a) + 1
                        switch (siguiente) {
                            case 4:
                            case 8:
                            case 12:
                            case 16:
                                if ((arrayDatosCompletos719.INTMIN != '00') && ($('#fre' + secuencia + '_1').val().trim() == '')) {
                                    $('#fre' + secuencia + '_1').val(arrayDatosCompletos719.INTMIN)
                                }
                                validarMartes_119(siguiente)
                                break;
                            default:
                                validarMartes_119(siguiente)
                                break;
                        }
                    }
                    break;
                /////frecuencia    
                case 4:
                case 8:
                case 12:
                case 16:
                    var index = buscarMaskFrecuencia('fre' + secuencia + '_1')
                    var valMask = index.unmaskedValue
                    var respuestaFrec = validarFrecuenciaTabla_119(valMask)

                    switch (respuestaFrec) {
                        case false:
                            CON851('03', '03', null, 'error');
                            validarMartes_119(a)
                            break;
                        case true:
                            if (a == '16') {
                                validarMiercoles_119(1)
                            } else {
                                validarMartes_119(parseInt(a) + 1)
                            }
                            break;
                    }
                    break;
            }
        }
    )
}

function validarMiercoles_119(a) {
    validarInputs(
        {
            form: '#valTablaMiercoles_' + a,
            orden: '1',
            event_f3: () => {
                switch (a) {
                    case 1:
                        validarCerrarHorario()
                        break;
                    case 5:
                    case 9:
                    case 13:
                        validarJueves_119(1)
                        break;
                    default:
                        validarMiercoles_119(a)
                        break;
                }
            },
            event_f9: () => {
                switch (a) {
                    case 1:
                        duplicarHorario_sal719(2)
                        break;
                }
            },
            event_flecha_arriba: () => {
                switch (a) {
                    case 1:
                        validarMartes_119(1)
                        break;
                }
            },
            event_flecha_abajo: () => {
                switch (a) {
                    case 1:
                        validarJueves_119(1)
                        break;
                }
            }
        },
        function () {
            if (a == '1') {
                validarMartes_119(1)
            } else {
                validarMiercoles_119(parseInt(a) - 1)
            }
        },
        function () {
            var secuencia = encontrarGrupo_119(a)
            switch (a) {
                case 1:
                case 5:
                case 9:
                case 13:
                    var nomInputSuc = cerosIzq($('#sucursal' + secuencia + '_2').val(), 2)
                    $('#sucursal' + secuencia + '_2').val(nomInputSuc)
                    var busqueda = arraySucursal_719.find(sucursal => sucursal.CODIGO == nomInputSuc)

                    if (nomInputSuc.trim().length > 0) {
                        if (!busqueda) {
                            CON851('01', '01', null, 'error', 'error');
                            validarMiercoles_119(a)
                        } else {
                            validarMiercoles_119(parseInt(a) + 1)
                        }
                    } else {
                        validarJueves_119(1)
                    }
                    break;
                //////////hora entrada
                case 2:
                case 6:
                case 10:
                case 14:
                    var idEntra1 = buscarMaskHora('horaIngreso' + secuencia + '_2')
                    var entra1 = maskHora[idEntra1].unmaskedValue

                    if (entra1.trim().length > 0) {
                        if (a == '2') {
                            maskHora[idEntra1].typedValue = cerosDer(entra1, 4)
                            validarMiercoles_119(parseInt(a) + 1)
                        } else {
                            var idAnt = 'horaSalida' + (parseInt(secuencia) - 1) + '_2'
                            var saleAnterior = buscarMaskHora(idAnt)
                            var saleAnt = maskHora[saleAnterior].unmaskedValue

                            if (entra1 <= saleAnt) {
                                CON851('01', 'Verifique hora anterior!', null, 'error');
                                validarMiercoles_119(a)
                            } else {
                                maskHora[idEntra1].typedValue = cerosDer(entra1, 4)
                                validarMiercoles_119(parseInt(a) + 1)
                            }
                        }
                    } else {
                        validarMiercoles_119(a)
                    }
                    break;
                ///////hora salida    
                case 3:
                case 7:
                case 11:
                case 15:
                    var idEntra2 = buscarMaskHora('horaIngreso' + secuencia + '_2')
                    var entra2 = maskHora[idEntra2].unmaskedValue

                    var idSale = buscarMaskHora('horaSalida' + secuencia + '_2')
                    var sale = maskHora[idSale].unmaskedValue

                    if (sale <= entra2) {
                        CON851('01', 'Verifique hora anterior!', null, 'error');
                        validarMiercoles_119(a)
                    } else {
                        maskHora[idSale].typedValue = cerosDer(sale, 4)
                        var siguiente = parseInt(a) + 1
                        switch (siguiente) {
                            case 4:
                            case 8:
                            case 12:
                            case 16:
                                if ((arrayDatosCompletos719.INTMIN != '00') && ($('#fre' + secuencia + '_2').val().trim() == '')) {
                                    $('#fre' + secuencia + '_2').val(arrayDatosCompletos719.INTMIN)
                                }
                                validarMiercoles_119(siguiente)
                                break;
                            default:
                                validarMiercoles_119(siguiente)
                                break;
                        }
                    }
                    break;

                /////frecuencia    
                case 4:
                case 8:
                case 12:
                case 16:
                    var index = buscarMaskFrecuencia('fre' + secuencia + '_2')
                    var valMask = index.unmaskedValue
                    var respuestaFrec = validarFrecuenciaTabla_119(valMask)

                    switch (respuestaFrec) {
                        case false:
                            CON851('03', '03', null, 'error');
                            validarMiercoles_119(a)
                            break;
                        case true:
                            if (a == '16') {
                                validarJueves_119(1)
                            } else {
                                validarMiercoles_119(parseInt(a) + 1)
                            }
                            break;
                    }
                    break;
            }
        }
    )
}

function validarJueves_119(a) {
    validarInputs(
        {
            form: '#valTablaJueves_' + a,
            orden: '1',
            event_f3: () => {
                switch (a) {
                    case 1:
                        validarCerrarHorario()
                        break;
                    case 5:
                    case 9:
                    case 13:
                        validarViernes_119(1)
                        break;
                    default:
                        validarJueves_119(a)
                        break;
                }
            },
            event_f9: () => {
                switch (a) {
                    case 1:
                        duplicarHorario_sal719(3)
                        break;
                }
            },
            event_flecha_arriba: () => {
                switch (a) {
                    case 1:
                        validarMiercoles_119(1)
                        break;
                }
            },
            event_flecha_abajo: () => {
                switch (a) {
                    case 1:
                        validarViernes_119(1)
                        break;
                }
            }
        },
        function () {
            if (a == '1') {
                validarMiercoles_119(1)
            } else {
                validarJueves_119(parseInt(a) - 1)
            }
        },
        function () {
            var secuencia = encontrarGrupo_119(a)

            switch (a) {
                case 1:
                case 5:
                case 9:
                case 13:
                    var nomInputSuc = cerosIzq($('#sucursal' + secuencia + '_3').val(), 2)
                    $('#sucursal' + secuencia + '_3').val(nomInputSuc)
                    var busqueda = arraySucursal_719.find(sucursal => sucursal.CODIGO == nomInputSuc)

                    if (nomInputSuc.trim().length > 0) {
                        if (!busqueda) {
                            CON851('01', '01', null, 'error', 'error');
                            validarJueves_119(a)
                        } else {
                            validarJueves_119(parseInt(a) + 1)
                        }
                    } else {
                        validarViernes_119(1)
                    }
                    break;
                //////////hora entrada
                case 2:
                case 6:
                case 10:
                case 14:
                    var idEntra1 = buscarMaskHora('horaIngreso' + secuencia + '_3')
                    var entra1 = maskHora[idEntra1].unmaskedValue

                    if (entra1.trim().length > 0) {
                        if (a == '2') {
                            maskHora[idEntra1].typedValue = cerosDer(entra1, 4)
                            validarJueves_119(parseInt(a) + 1)
                        } else {
                            var idAnt = 'horaSalida' + (parseInt(secuencia) - 1) + '_3'
                            var saleAnterior = buscarMaskHora(idAnt)
                            var saleAnt = maskHora[saleAnterior].unmaskedValue

                            if (entra1 <= saleAnt) {
                                CON851('01', 'Verifique hora anterior!', null, 'error');
                                validarJueves_119(a)
                            } else {
                                maskHora[idEntra1].typedValue = cerosDer(entra1, 4)
                                validarJueves_119(parseInt(a) + 1)
                            }
                        }
                    } else {
                        validarJueves_119(a)
                    }
                    break;
                ///////hora salida    
                case 3:
                case 7:
                case 11:
                case 15:
                    var idEntra2 = buscarMaskHora('horaIngreso' + secuencia + '_3')
                    var entra2 = maskHora[idEntra2].unmaskedValue

                    var idSale = buscarMaskHora('horaSalida' + secuencia + '_3')
                    var sale = maskHora[idSale].unmaskedValue

                    if (sale <= entra2) {
                        CON851('01', 'Verifique hora anterior!', null, 'error');
                        validarJueves_119(a)
                    } else {
                        maskHora[idSale].typedValue = cerosDer(sale, 4)
                        var siguiente = parseInt(a) + 1
                        switch (siguiente) {
                            case 4:
                            case 8:
                            case 12:
                            case 16:
                                if ((arrayDatosCompletos719.INTMIN != '00') && ($('#fre' + secuencia + '_3').val().trim() == '')) {
                                    $('#fre' + secuencia + '_3').val(arrayDatosCompletos719.INTMIN)
                                }
                                validarJueves_119(siguiente)
                                break;
                            default:
                                validarJueves_119(siguiente)
                                break;
                        }
                    }
                    break;
                /////frecuencia    
                case 4:
                case 8:
                case 12:
                case 16:
                    var index = buscarMaskFrecuencia('fre' + secuencia + '_3')
                    var valMask = index.unmaskedValue
                    var respuestaFrec = validarFrecuenciaTabla_119(valMask)

                    switch (respuestaFrec) {
                        case false:
                            CON851('03', '03', null, 'error');
                            validarJueves_119(a)
                            break;
                        case true:
                            if (a == '16') {
                                validarViernes_119(1)
                            } else {
                                validarJueves_119(parseInt(a) + 1)
                            }
                            break;
                    }
                    break;
            }
        }
    )
}

function validarViernes_119(a) {
    validarInputs(
        {
            form: '#valTablaViernes_' + a,
            orden: '1',
            event_f3: () => {
                switch (a) {
                    case 1:
                        validarCerrarHorario()
                        break;
                    case 5:
                    case 9:
                    case 13:
                        validarSabado_119(1)
                        break;
                    default:
                        validarViernes_119(a)
                        break;
                }
            },
            event_f9: () => {
                switch (a) {
                    case 1:
                        duplicarHorario_sal719(4)
                        break;
                }
            },
            event_flecha_arriba: () => {
                switch (a) {
                    case 1:
                        validarJueves_119(1)
                        break;
                }
            },
            event_flecha_abajo: () => {
                switch (a) {
                    case 1:
                        validarSabado_119(1)
                        break;
                }
            }
        },
        function () {
            if (a == '1') {
                validarJueves_119(1)
            } else {
                validarViernes_119(parseInt(a) - 1)
            }
        },
        function () {
            var secuencia = encontrarGrupo_119(a)

            switch (a) {
                case 1:
                case 5:
                case 9:
                case 13:
                    var nomInputSuc = cerosIzq($('#sucursal' + secuencia + '_4').val(), 2)
                    $('#sucursal' + secuencia + '_4').val(nomInputSuc)
                    var busqueda = arraySucursal_719.find(sucursal => sucursal.CODIGO == nomInputSuc)

                    if (nomInputSuc.trim().length > 0) {
                        if (!busqueda) {
                            CON851('01', '01', null, 'error', 'error');
                            validarViernes_119(a)
                        } else {
                            validarViernes_119(parseInt(a) + 1)
                        }
                    } else {
                        validarSabado_119(1)
                    }
                    break;
                //////////hora entrada
                case 2:
                case 6:
                case 10:
                case 14:
                    var idEntra1 = buscarMaskHora('horaIngreso' + secuencia + '_4')
                    var entra1 = maskHora[idEntra1].unmaskedValue

                    if (entra1.trim().length > 0) {
                        if (a == '2') {
                            maskHora[idEntra1].typedValue = cerosDer(entra1, 4)
                            validarViernes_119(parseInt(a) + 1)
                        } else {
                            var idAnt = 'horaSalida' + (parseInt(secuencia) - 1) + '_4'
                            var saleAnterior = buscarMaskHora(idAnt)
                            var saleAnt = maskHora[saleAnterior].unmaskedValue

                            if (entra1 <= saleAnt) {
                                CON851('01', 'Verifique hora anterior!', null, 'error');
                                validarViernes_119(a)
                            } else {
                                maskHora[idEntra1].typedValue = cerosDer(entra1, 4)
                                validarViernes_119(parseInt(a) + 1)
                            }
                        }
                    } else {
                        validarViernes_119(a)
                    }
                    break;
                ///////hora salida    
                case 3:
                case 7:
                case 11:
                case 15:
                    var idEntra2 = buscarMaskHora('horaIngreso' + secuencia + '_4')
                    var entra2 = maskHora[idEntra2].unmaskedValue

                    var idSale = buscarMaskHora('horaSalida' + secuencia + '_4')
                    var sale = maskHora[idSale].unmaskedValue

                    if (sale <= entra2) {
                        CON851('01', 'Verifique hora anterior!', null, 'error');
                        validarViernes_119(a)
                    } else {
                        maskHora[idSale].typedValue = cerosDer(sale, 4)
                        var siguiente = parseInt(a) + 1
                        switch (siguiente) {
                            case 4:
                            case 8:
                            case 12:
                            case 16:
                                if ((arrayDatosCompletos719.INTMIN != '00') && ($('#fre' + secuencia + '_4').val().trim() == '')) {
                                    $('#fre' + secuencia + '_4').val(arrayDatosCompletos719.INTMIN)
                                }
                                validarViernes_119(siguiente)
                                break;
                            default:
                                validarViernes_119(siguiente)
                                break;
                        }
                    }
                    break;
                /////frecuencia    
                case 4:
                case 8:
                case 12:
                case 16:
                    var index = buscarMaskFrecuencia('fre' + secuencia + '_4')
                    var valMask = index.unmaskedValue
                    var respuestaFrec = validarFrecuenciaTabla_119(valMask)

                    switch (respuestaFrec) {
                        case false:
                            CON851('03', '03', null, 'error');
                            validarViernes_119(a)
                            break;
                        case true:
                            if (a == '16') {
                                validarSabado_119(1)
                            } else {
                                validarViernes_119(parseInt(a) + 1)
                            }
                            break;
                    }
                    break;
            }
        }
    )
}

function validarSabado_119(a) {
    validarInputs(
        {
            form: '#valTablaSabado_' + a,
            orden: '1',
            event_f3: () => {
                switch (a) {
                    case 1:
                        validarCerrarHorario()
                        break;
                    case 5:
                    case 9:
                    case 13:
                        validarDomingo_119(1)
                        break;
                    default:
                        validarSabado_119(a)
                        break;
                }
            },
            event_f9: () => {
                switch (a) {
                    case 1:
                        duplicarHorario_sal719(5)
                        break;
                }
            },
            event_flecha_arriba: () => {
                switch (a) {
                    case 1:
                        validarViernes_119(1)
                        break;
                }
            },
            event_flecha_abajo: () => {
                switch (a) {
                    case 1:
                        validarDomingo_119(1)
                        break;
                }
            }
        },
        function () {
            if (a == '1') {
                validarViernes_119(1)
            } else {
                validarSabado_119(parseInt(a) - 1)
            }
        },
        function () {
            var secuencia = encontrarGrupo_119(a)

            switch (a) {
                case 1:
                case 5:
                case 9:
                case 13:
                    var nomInputSuc = cerosIzq($('#sucursal' + secuencia + '_5').val(), 2)
                    $('#sucursal' + secuencia + '_5').val(nomInputSuc)
                    var busqueda = arraySucursal_719.find(sucursal => sucursal.CODIGO == nomInputSuc)

                    if (nomInputSuc.trim().length > 0) {
                        if (!busqueda) {
                            CON851('01', '01', null, 'error', 'error');
                            validarSabado_119(a)
                        } else {
                            validarSabado_119(parseInt(a) + 1)
                        }
                    } else {
                        validarDomingo_119(1)
                    }
                    break;
                //////////hora entrada
                case 2:
                case 6:
                case 10:
                case 14:
                    var idEntra1 = buscarMaskHora('horaIngreso' + secuencia + '_5')
                    var entra1 = maskHora[idEntra1].unmaskedValue

                    if (entra1.trim().length > 0) {
                        if (a == '2') {
                            maskHora[idEntra1].typedValue = cerosDer(entra1, 4)
                            validarSabado_119(parseInt(a) + 1)
                        } else {
                            var idAnt = 'horaSalida' + (parseInt(secuencia) - 1) + '_5'
                            var saleAnterior = buscarMaskHora(idAnt)
                            var saleAnt = maskHora[saleAnterior].unmaskedValue

                            if (entra1 <= saleAnt) {
                                CON851('01', 'Verifique hora anterior!', null, 'error');
                                validarSabado_119(a)
                            } else {
                                maskHora[idEntra1].typedValue = cerosDer(entra1, 4)
                                validarSabado_119(parseInt(a) + 1)
                            }
                        }
                    } else {
                        validarSabado_119(a)
                    }
                    break;
                ///////hora salida    
                case 3:
                case 7:
                case 11:
                case 15:
                    var idEntra2 = buscarMaskHora('horaIngreso' + secuencia + '_5')
                    var entra2 = maskHora[idEntra2].unmaskedValue

                    var idSale = buscarMaskHora('horaSalida' + secuencia + '_5')
                    var sale = maskHora[idSale].unmaskedValue

                    if (sale <= entra2) {
                        CON851('01', 'Verifique hora anterior!', null, 'error');
                        validarSabado_119(a)
                    } else {
                        maskHora[idSale].typedValue = cerosDer(sale, 4)
                        var siguiente = parseInt(a) + 1
                        switch (siguiente) {
                            case 4:
                            case 8:
                            case 12:
                            case 16:
                                if ((arrayDatosCompletos719.INTMIN != '00') && ($('#fre' + secuencia + '_5').val().trim() == '')) {
                                    $('#fre' + secuencia + '_5').val(arrayDatosCompletos719.INTMIN)
                                }
                                validarSabado_119(siguiente)
                                break;
                            default:
                                validarSabado_119(siguiente)
                                break;
                        }
                    }
                    break;
                /////frecuencia    
                case 4:
                case 8:
                case 12:
                case 16:
                    var index = buscarMaskFrecuencia('fre' + secuencia + '_5')
                    var valMask = index.unmaskedValue
                    var respuestaFrec = validarFrecuenciaTabla_119(valMask)

                    switch (respuestaFrec) {
                        case false:
                            CON851('03', '03', null, 'error');
                            validarSabado_119(a)
                            break;
                        case true:
                            if (a == '16') {
                                validarDomingo_119(1)
                            } else {
                                validarSabado_119(parseInt(a) + 1)
                            }
                            break;
                    }
                    break;
            }
        }
    )
}

function validarDomingo_119(a) {
    validarInputs(
        {
            form: '#valTablaDomingo_' + a,
            orden: '1',
            event_f3: () => {
                switch (a) {
                    case 1:
                    case 5:
                    case 9:
                    case 13:
                        validarCerrarHorario()
                        break;
                    default:
                        validarDomingo_119(a)
                        break;
                }
            },
            event_flecha_arriba: () => {
                switch (a) {
                    case 1:
                        validarSabado_119(1)
                        break;
                }
            },
            event_f9: () => {
                switch (a) {
                    case 1:
                        duplicarHorario_sal719(6)
                        break;
                }
            }
        },
        function () {
            if (a == '1') {
                validarSabado_119(1)
            } else {
                validarDomingo_119(parseInt(a) - 1)
            }
        },
        function () {
            var secuencia = encontrarGrupo_119(a)

            switch (a) {
                case 1:
                case 5:
                case 9:
                case 13:
                    var nomInputSuc = cerosIzq($('#sucursal' + secuencia + '_6').val(), 2)
                    $('#sucursal' + secuencia + '_6').val(nomInputSuc)
                    var busqueda = arraySucursal_719.find(sucursal => sucursal.CODIGO == nomInputSuc)

                    if (nomInputSuc.trim().length > 0) {
                        if (!busqueda) {
                            CON851('01', '01', null, 'error', 'error');
                            validarDomingo_119(a)
                        } else {
                            validarDomingo_119(parseInt(a) + 1)
                        }
                    } else {
                        validarCerrarHorario()
                    }
                    break;
                //////////hora entrada
                case 2:
                case 6:
                case 10:
                case 14:
                    var idEntra1 = buscarMaskHora('horaIngreso' + secuencia + '_6')
                    var entra1 = maskHora[idEntra1].unmaskedValue

                    if (entra1.trim().length > 0) {
                        if (a == '2') {
                            maskHora[idEntra1].typedValue = cerosDer(entra1, 4)
                            validarDomingo_119(parseInt(a) + 1)
                        } else {
                            var idAnt = 'horaSalida' + (parseInt(secuencia) - 1) + '_6'
                            var saleAnterior = buscarMaskHora(idAnt)
                            var saleAnt = maskHora[saleAnterior].unmaskedValue

                            if (entra1 <= saleAnt) {
                                CON851('01', 'Verifique hora anterior!', null, 'error');
                                validarDomingo_119(a)
                            } else {
                                maskHora[idEntra1].typedValue = cerosDer(entra1, 4)
                                validarDomingo_119(parseInt(a) + 1)
                            }
                        }
                    } else {
                        validarDomingo_119(a)
                    }
                    break;
                ///////hora salida    
                case 3:
                case 7:
                case 11:
                case 15:
                    var idEntra2 = buscarMaskHora('horaIngreso' + secuencia + '_6')
                    var entra2 = maskHora[idEntra2].unmaskedValue

                    var idSale = buscarMaskHora('horaSalida' + secuencia + '_6')
                    var sale = maskHora[idSale].unmaskedValue

                    if (sale <= entra2) {
                        CON851('01', 'Verifique hora anterior!', null, 'error');
                        validarDomingo_119(a)
                    } else {
                        maskHora[idSale].typedValue = cerosDer(sale, 4)
                        var siguiente = parseInt(a) + 1
                        switch (siguiente) {
                            case 4:
                            case 8:
                            case 12:
                            case 16:
                                if ((arrayDatosCompletos719.INTMIN != '00') && ($('#fre' + secuencia + '_6').val().trim() == '')) {
                                    $('#fre' + secuencia + '_6').val(arrayDatosCompletos719.INTMIN)
                                }
                                validarDomingo_119(siguiente)
                                break;
                            default:
                                validarDomingo_119(siguiente)
                                break;
                        }
                    }
                    break;
                /////frecuencia    
                case 4:
                case 8:
                case 12:
                case 16:
                    var index = buscarMaskFrecuencia('fre' + secuencia + '_6')
                    var valMask = index.unmaskedValue
                    var respuestaFrec = validarFrecuenciaTabla_119(valMask)

                    switch (respuestaFrec) {
                        case false:
                            CON851('03', '03', null, 'error');
                            validarDomingo_119(a)
                            break;
                        case true:
                            if (a == '16') {
                                validarCerrarHorario()
                            } else {
                                validarDomingo_119(parseInt(a) + 1)
                            }
                            break;
                    }
                    break;
            }
        }
    )
}


function validarCerrarHorario() {
    if ($_USUA_GLOBAL[0].NIT == '0830092718' || $_USUA_GLOBAL[0].NIT == '0830092719') {
        popUpMensajeImpresion_119()
    } else {
        arrayDatosCompletos719.DATO_DVD = 'N'
        arrayDatosCompletos719.DATO_BIRAD = 'N'
        arrayDatosCompletos719.DATO_NORM = 'N'
        arrayDatosCompletos719.DATO_ASOCI = 'N'
        guardarDatosCompletos_119()
    }
}


function popUpMensajeImpresion_119() {
    if ($_NovedSal719 == '7') {
        validarChecked('#impDVD_119', 'N')
        validarChecked('#impMenBir_119', 'N')
        validarChecked('#impMenNorm_119', 'N')
        validarChecked('#asocRad_119', 'N')
    } else {
        validarChecked('#impDVD_119', arrayDatosCompletos719.DATO_DVD)
        validarChecked('#impMenBir_119', arrayDatosCompletos719.DATO_BIRAD)
        validarChecked('#impMenNorm_119', arrayDatosCompletos719.DATO_NORM)
        validarChecked('#asocRad_119', arrayDatosCompletos719.DATO_ASOCI)
    }
    var fuente = $('#popUpMensajeImpresion_119').html();
    var configimpre = bootbox.dialog({
        title: "Config. Impresion Resultado",
        message: fuente,
        buttons: {
            main: {
                label: "Aceptar",
                className: "blue",
                callback: function () {
                    if ($("#impDVD_119").prop('checked')) { arrayDatosCompletos719.DATO_DVD = 'S' } else { arrayDatosCompletos719.DATO_DVD = 'N' }
                    if ($("#impMenBir_119").prop('checked')) { arrayDatosCompletos719.DATO_BIRAD = 'S' } else { arrayDatosCompletos719.DATO_BIRAD = 'N' }
                    if ($("#impMenNorm_119").prop('checked')) { arrayDatosCompletos719.DATO_NORM = 'S' } else { arrayDatosCompletos719.DATO_NORM = 'N' }
                    if ($("#asocRad_119").prop('checked')) { arrayDatosCompletos719.DATO_ASOCI = 'S' } else { arrayDatosCompletos719.DATO_ASOCI = 'N' }
                    guardarDatosCompletos_119()
                }
            }
        },
    });
}

function buscarSucursalTabla(grupo, posicion) {
    var retornar = false
    var nombreDato = '#sucursal' + grupo + '_' + posicion
    retornar = espaciosDer($(nombreDato).val(), 2)
    return retornar
}


function buscarHoraTabla_119(tipo, grupo, posicion) {
    var nombreDato;
    if (tipo == 'ing') {
        nombreDato = 'horaIngreso' + grupo + '_' + posicion
    } else if (tipo == 'sal') {
        nombreDato = 'horaSalida' + grupo + '_' + posicion
    }

    var retornar = false;
    for (var i in maskHora) {
        var input = maskHora[i].el.input
        var id = $(input).attr('id');
        if (id == nombreDato) retornar = cerosDer(maskHora[i].unmaskedValue, 4);
    }

    return retornar;
}

function buscarFrecuenciaTabla_119(grupo, posicion) {
    var nombreDato = '#fre' + grupo + '_' + posicion
    retornar = espaciosDer($(nombreDato).val().trim(), 2)
    return retornar
}

function pushArrayTabla(posicion) {

    let suc1 = buscarSucursalTabla('1', posicion)

    let ing1 = buscarHoraTabla_119('ing', '1', posicion)

    let ret1 = buscarHoraTabla_119('sal', '1', posicion)

    let frec1 = buscarFrecuenciaTabla_119('1', posicion)

    let suc2 = buscarSucursalTabla('2', posicion)
    let ing2 = buscarHoraTabla_119('ing', '2', posicion)
    let ret2 = buscarHoraTabla_119('sal', '2', posicion)
    let frec2 = buscarFrecuenciaTabla_119('2', posicion)

    let suc3 = buscarSucursalTabla('3', posicion)
    let ing3 = buscarHoraTabla_119('ing', '3', posicion)
    let ret3 = buscarHoraTabla_119('sal', '3', posicion)
    let frec3 = buscarFrecuenciaTabla_119('3', posicion)

    let suc4 = buscarSucursalTabla('4', posicion)
    let ing4 = buscarHoraTabla_119('ing', '4', posicion)
    let ret4 = buscarHoraTabla_119('sal', '4', posicion)
    let frec4 = buscarFrecuenciaTabla_119('4', posicion)

    var linea = suc1
    linea += '|'
    linea += ing1
    linea += '|'
    linea += ret1
    linea += '|'
    linea += frec1
    linea += '|'
    linea += suc2
    linea += '|'
    linea += ing2
    linea += '|'
    linea += ret2
    linea += '|'
    linea += frec2
    linea += '|'
    linea += suc3
    linea += '|'
    linea += ing3
    linea += '|'
    linea += ret3
    linea += '|'
    linea += frec3
    linea += '|'
    linea += suc4
    linea += '|'
    linea += ing4
    linea += '|'
    linea += ret4
    linea += '|'
    linea += frec4
    linea += '|'

    return linea
}

function guardarDatosCompletos_119() {
    CON851P('01', validarDeshabilitarDesde_719, enviarDatosCompletos_119)
}

function enviarDatosCompletos_119() {
    var identificacion = cerosIzq(arrayDatosCompletos719.IDENTIFICACION.trim(), 10)
    var nombre = espaciosDer(arrayDatosCompletos719.DESCRIP, 30)
    var detalle = espaciosDer(arrayDatosCompletos719.DETALLE, 30)
    var registro = espaciosDer(arrayDatosCompletos719.REGISTRO, 10)
    var atiende = arrayDatosCompletos719.ATIENDE
    var ctaRet = cerosIzq(arrayDatosCompletos719.CTARET, 12)
    var divCup = cerosIzq(arrayDatosCompletos719.DIVISION, 2)
    var sucursal = cerosIzq(arrayDatosCompletos719.SUCURSAL, 2)
    var contrato = cerosIzq(arrayDatosCompletos719.CONTRATO, 1)
    var porcenMed = cerosIzq(arrayDatosCompletos719.PORCENT, 3)
    var estado = cerosIzq(arrayDatosCompletos719.ESTADO, 1)

    var medicamentos = arrayDatosCompletos719.CL1
    var procQuir = arrayDatosCompletos719.CL2
    var procDiag = arrayDatosCompletos719.CL3
    var imagen = arrayDatosCompletos719.CL4
    var servicios = arrayDatosCompletos719.CL5
    var consultasTer = arrayDatosCompletos719.CL6
    var promPrev = arrayDatosCompletos719.CL7

    var espec1 = cerosIzq($("#espec1_719").val(), 3)
    var espec2 = cerosIzq($("#espec2_719").val(), 3)
    var espec3 = cerosIzq($("#espec3_719").val(), 3)
    var espec4 = cerosIzq($("#espec4_719").val(), 3)
    var espec5 = cerosIzq($("#espec5_719").val(), 3)

    var oper1 = cerosIzq($("#operAsig1_719").val().toUpperCase(), 4)
    var oper2 = cerosIzq($("#operAsig2_719").val().toUpperCase(), 4)
    var oper3 = cerosIzq($("#operAsig3_719").val().toUpperCase(), 4)
    var oper4 = cerosIzq($("#operAsig4_719").val().toUpperCase(), 4)
    var oper5 = cerosIzq($("#operAsig5_719").val().toUpperCase(), 4)

    var intMin = arrayDatosCompletos719.INTMIN
    var cantMax = arrayDatosCompletos719.CITAS

    var formaAgen = arrayDatosCompletos719.FORMAGEN
    var sobreAgen = arrayDatosCompletos719.SOBREAGEN
    var rango = arrayDatosCompletos719.RANGO


    var fechaDesde, horaDesde
    var fechaDigDesde = $('#desAgenDesde_ser119').val().trim()
    if (fechaDigDesde.length < 1) {
        fechaDesde = '00000000'
        horaDesde = '0000'
        fechaHasta = '00000000'
        horaHasta = '0000'
    } else {
        fechaDesde = parseInt(moment($_fechaDeshabDesde_119).format("YYYYMMDD"))
        if (isNaN(fechaDesde)) {
            fechaDesde = 0
            fechaDesde = cerosIzq(fechaDesde, 8)
        } else {
            fechaDesde = cerosIzq(fechaDesde, 8)
        }
        horaDesde = parseInt(moment($_fechaDeshabDesde_119).format("HHmm"))
        if (isNaN(fechaDesde)) {
            horaDesde = 0
            horaDesde = cerosIzq(horaDesde, 4)
        } else {
            horaDesde = cerosIzq(horaDesde, 4)
        }
        fechaHasta = parseInt(moment($_fechaDeshabHasta_119).format("YYYYMMDD"));
        if (isNaN(fechaHasta)) {
            fechaHasta = 0
            fechaHasta = cerosIzq(fechaHasta, 8)
        } else {
            fechaHasta = cerosIzq(fechaHasta, 8)
        }

        horaHasta = parseInt(moment($_fechaDeshabHasta_119).format("HHmm"))
        if (isNaN(fechaDesde)) {
            horaHasta = 0
            horaHasta = cerosIzq(horaHasta, 4)
        } else {
            horaHasta = cerosIzq(horaHasta, 4)
        }
    }

    var impDvd = arrayDatosCompletos719.DATO_DVD
    var impBir = arrayDatosCompletos719.DATO_BIRAD
    var impNorm = arrayDatosCompletos719.DATO_NORM
    var impRad = arrayDatosCompletos719.DATO_ASOCI

    var data = {}

    var datos_EnvioComp_719 = datosEnvio()
    datos_EnvioComp_719 += $_NovedSal719
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += identificacion
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += nombre
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += detalle
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += registro
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += atiende
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += ctaRet
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += divCup
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += sucursal
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += contrato
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += porcenMed
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += estado
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += medicamentos
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += procQuir
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += procDiag
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += imagen
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += servicios
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += consultasTer
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += promPrev
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += espec1
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += espec2
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += espec3
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += espec4
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += espec5
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += oper1
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += oper2
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += oper3
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += oper4
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += oper5
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += intMin
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += cantMax
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += formaAgen
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += sobreAgen
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += rango
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += fechaDesde
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += horaDesde
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += fechaHasta
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += horaHasta
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += impDvd
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += impBir
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += impNorm
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += impRad
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += localStorage.Usuario
    datos_EnvioComp_719 += '|'
    datos_EnvioComp_719 += moment().format('YYYYMMDD')
    datos_EnvioComp_719 += '|'

    data['datosh'] = datos_EnvioComp_719

    data['lunes'] = pushArrayTabla(0)

    data['martes'] = pushArrayTabla(1)

    data['miercoles'] = pushArrayTabla(2)

    data['jueves'] = pushArrayTabla(3)

    data['viernes'] = pushArrayTabla(4)

    data['sabado'] = pushArrayTabla(5)

    data['domingo'] = pushArrayTabla(6)

    let URL = get_url("APP/SALUD/SAL719-03.DLL");

    console.log(data)
    postData(data, URL)
        .then((data) => {
            var mensaje
            switch ($_NovedSal719) {
                case '7': mensaje = 'Creado correctamente'
                    break;
                case '8': mensaje = 'Modificado correctamente'
                    break;
                case '9': mensaje = 'Eliminado correctamente'
                    break;
            }
            CON851('', mensaje, null, 'success', 'Exitoso');
            salir_719()
        })
        .catch(error => {
            console.error(error)
            _toggleNav()
        });
}


