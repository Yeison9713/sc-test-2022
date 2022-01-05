/* NOMBRE RM --> SER134 // NOMBRE ELECTR --> SER134 */
var SER134 = [];
var $FECHAACT = new Date(),
    $ANOACT = parseInt($FECHAACT.getFullYear()),
    $MESACT = parseInt($FECHAACT.getMonth() + 1),
    $DIAACT = parseInt($FECHAACT.getDate()),
    $DIAMAX_APER, fechaAperMask;

function _MaskDate_SER134() {
    fechaAperMask = IMask($("#FECHAPER_SER134")[0], {
        mask: Date,
        pattern: 'YYYY/MM/DD',
        lazy: true,
        blocks: {
            YYYY: {
                mask: IMask.MaskedRange,
                placeholderChar: 'y',
                from: 2000,
                to: 2030,
                maxLength: 4
            },
            MM: {
                mask: IMask.MaskedRange,
                placeholderChar: 'M',
                from: 01,
                to: 12,
                maxLength: 2,
            },
            DD: {
                mask: IMask.MaskedRange,
                placeholderChar: 'd',
                from: 01,
                to: 31,
                maxLength: 2,
            },
        },
        format: function (date) {
            return moment(date).format("YYYY/MM/DD");
        },
        parse: function (str) {
            return str
        }
    });
}

$(document).ready(function () {
    loader('hide'); _inputControl('reset'); _inputControl('disabled');
    nombreOpcion('9, 7 , 1, 4 - Actualiza ficha sisvan');
    _toggleF8([{
        input: 'CODPACI',
        app: 'SER134',
        funct: _ventanaPacientes_SER134
    }, {
        input: 'PROGRAMA',
        app: 'SER134',
        funct: validarProgramaSER134
    }]);
    CON850(_evaluarCON850_SER134);
});

// F8 PACIENTES
function _ventanaPacientes_SER134(e) {
    loader('hide');
    if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
        parametros = {
            dll: 'PACIENTES',
            valoresselect: ['Nombre del paciente'],
            f8data: 'PACIENTES',
            columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'EPS' }, { title: 'EDAD' }],
            callback: data => { document.querySelector("#CODPACI_SER134").value = cerosIzq(data.COD, 15); _enterInput('#CODPACI_SER134'); },
            cancel: () => { $('#CODPACI_SER134').focus(); }
        };
        F8LITE(parametros);
    }
}

function _evaluarCON850_SER134(novedad) {
    _inputControl('reset');
    _inputControl('disabled');
    SER134['NOVEDADW'] = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
            validarCodPacienteSER134();
            break;
        case 8:
        case 9:
            validarCodPacienteSER134();
            break;
        default:
            _toggleNav();
            break;
    }
    $('#NOVSER_SER134').val(novedad.id + ' - ' + novedad.descripcion)
}


function validarCodPacienteSER134() {
    validarInputs({
        form: "#codpaciente",
        orden: '1'
    },
        function () {
            CON850(_evaluarCON850_SER134);
        },
        evaluarPacienteSER134
    )
}


function evaluarPacienteSER134() {

    SER134.COD_SISVAN = $('#CODPACI_SER134').val();
    datos_envio = datosEnvio() + cerosIzq(SER134.COD_SISVAN, 15);
    postData({
        datosh: datos_envio
    }, get_url("APP/SALUD/SER134-01.DLL"))
        .then((data) => {
            let res = data.split('|');
            console.debug('respuesta SER134-01', res)
            switch (parseInt(SER134['NOVEDADW'])) {
                case 7:
                    // Existe el paciente
                    if (res[0] == 00) {
                        if (res[1] == 01) validarEdadPacienteSER134(res);
                        else CON851('00', '00', validarCodPacienteSER134(), 'error', 'error');
                        break;
                    } else {
                        // No existe el paciente
                        if (res[1] == 01) CON851('01', '01', validarCodPacienteSER134(), 'error', 'error');
                        else CON851('00', '00', validarCodPacienteSER134(), 'error', 'error');
                        break;
                    }

                case 8:
                case 9:
                    if (res[1] == '00' && res[0] == '00') validarEdadPacienteSER134(res);
                    else CON851('01', '01', validarCodPacienteSER134(), 'error', 'error');
                    break;
                default:
                    _toggleNav();
                    break;
            }
        })
    // .catch((error) => {
    //     console.log(error)
    // });
}

function validarEdadPacienteSER134(data) {
    var res = data;
    var fechaInicio = moment().format('YYYY-MM-DD');
    var nacimiento = moment(res[6].trim()).format('YYYY-MM-DD');
    var meses = moment(fechaInicio).diff(moment(nacimiento), 'months');
    var edad = calcular_edad(parseInt(res[6]));
    SER134.EDAD_PACI = edad.vlr_edad + ' ' + edad.unid_edad;
    SER134.EDADMES_PACI = meses;
    if (SER134.NOVEDADW == '7') {
        if (SER134.EDADMES_PACI > 216 && (res[7].trim() == 'M' || res[7].trim() == 'm')) {
            CON851('74', '74', (CON850(_evaluarCON850_SER134)), 'error', 'error')
        } else {
            on_datoSisvanSER134(res)
        }
    } else {
        if(SER134.EDADMES_PACI<=60||(SER134.EDADMES_PACI>216 && (res[7].trim() == 'F' || res[7].trim() == 'f')))
        on_datoSisvanSER134(res)// es menor 5 años | es mujer - lactante ;
    }
}

function on_datoSisvanSER134(data) {
    var camposSisvan = ['SWINVALID_PACI', 'SWINVALID_SISVAN', 'COD_SISVAN', 'NOMBRE_SISVAN',
        'FICHA_SISVAN', 'FECHA_SISVAN', 'FECHANACI_PACI', 'SEXO_PACI', 'DIRECCION_PACI', 'CIUDAD_PACI', 'TELEFONO_PACI', 'ZONA_PACI', 'REGIMEN_PACI', 'ETNIA_PACI',
        'CNTSALUD_SISVAN', 'BARRIO_SISVAN', 'PROGRAM_SISVAN', 'LACT_SISVAN', 'EXCLUSIV_SISVAN', 'MESLACT_SISVAN', 'OPERCREA_SISVAN', 'FECHACREA_SISVAN', 'OPERMODIF_SISVAN',
        'FECHAMODIF_SISVAN'
    ];
    for (campo in camposSisvan) {
        if (data[campo].trim() == null || typeof data[campo].trim() == "undefined" || data[campo].trim() == void 0) SER134[camposSisvan[campo]] = " ";
        else SER134[camposSisvan[campo]] = data[campo].trim();
    };
    //llenar campos sisvan
    if (SER134.NOVEDADW == '8' || SER134.NOVEDADW == '9') {
        document.getElementById('CODPACI_SER134').value = SER134.COD_SISVAN;
        document.getElementById('NOMBRE_SER134').value = SER134.NOMBRE_SISVAN;
        document.getElementById('NUMEROFIC_SER134').value = SER134.FICHA_SISVAN
        document.getElementById('FECHAPER_SER134').value = SER134.FECHA_SISVAN
        document.getElementById('EDADSER_SER134').value = SER134.EDAD_PACI;
        document.getElementById('EDADMES_SER134').value = SER134.EDADMES_PACI
        document.getElementById('SEXOSER_SER134').value = _validarSexoSER134(SER134.SEXO_PACI)
        document.getElementById('DIRECCSER_SER134').value = SER134.DIRECCION_PACI
        document.getElementById('CIUDADSER_SER134').value = SER134.CIUDAD_PACI
        document.getElementById('TELEFSER_SER134').value = SER134.TELEFONO_PACI
        document.getElementById('ZONASER_SER134').value = _validarZonaSER134(SER134.ZONA_PACI)
        document.getElementById('REGMNSER_SER134').value = _validarRegimenSER134(SER134.REGIMEN_PACI)
        document.getElementById('ETNIASER_SER134').value = _validarEtniaSER134(SER134.ETNIA_PACI)
        document.getElementById('CENTROSER_SER134').value = SER134.CNTSALUD_SISVAN
        document.getElementById('BARRIOSER_SER134').value = SER134.BARRIO_SISVAN
        document.getElementById('PROGRAMA_SER134').value = SER134.PROGRAM_SISVAN
        document.getElementById('LACTASER_SER134').value = SER134.LACT_SISVAN
        document.getElementById('EXCLSER_SER134').value = SER134.EXCLUSIV_SISVAN
        document.getElementById('MESLACTASER_SER134').value = SER134.MESLACT_SISVAN
        document.getElementById('OPERDCREA_SER134').value = SER134.OPERCREA_SISVAN
        document.getElementById('FECHACREA_SER134').value = moment(SER134.FECHACREA_SISVAN, "YYYYMMDD").format("YYYY/MM/DD");
        document.getElementById('OPERMODF_SER134').value = SER134.OPERMODIF_SISVAN
        document.getElementById('FECHAMODF_SER134').value = SER134.FECHAMODIF_SISVAN
        if (SER134.NOVEDADW == '9') {
            actualizarSisvanSER134()
        } else {
            consultarTablasSisvanSER134();
        }
    } else {
        document.getElementById('NOMBRE_SER134').value = SER134.NOMBRE_SISVAN;
        document.getElementById('EDADSER_SER134').value = SER134.EDAD_PACI;
        document.getElementById('EDADMES_SER134').value = SER134.EDADMES_PACI
        document.getElementById('SEXOSER_SER134').value = _validarSexoSER134(SER134.SEXO_PACI)
        document.getElementById('DIRECCSER_SER134').value = SER134.DIRECCION_PACI
        document.getElementById('CIUDADSER_SER134').value = SER134.CIUDAD_PACI
        document.getElementById('TELEFSER_SER134').value = SER134.TELEFONO_PACI
        document.getElementById('ZONASER_SER134').value = _validarZonaSER134(SER134.ZONA_PACI)
        document.getElementById('REGMNSER_SER134').value = _validarRegimenSER134(SER134.REGIMEN_PACI)
        document.getElementById('ETNIASER_SER134').value = _validarEtniaSER134(SER134.ETNIA_PACI)
        document.getElementById('OPERDCREA_SER134').value = localStorage['Usuario'] + ' ' + localStorage['Nombre'];
        document.getElementById('FECHACREA_SER134').value = moment().format('YYYY/MM/DD');

        _validarFechAperSER134();
    }

}


function _validarFechAperSER134() {
    _MaskDate_SER134();

    validarInputs({
        form: "#fechaapertura",
        orden: '1'
    },
        function () {
            validarCodPacienteSER134()
        },
        function () {
            if ($('#FECHAPER_SER134').val().length == 0) {
                document.getElementById('FECHAPER_SER134').value = moment().format('YYYY/MM/DD');
            }

            evaluarFechAperSER134();
        }
    )
}

function evaluarFechAperSER134() {
    let $fecha = fechaAperMask._value;
    $fecha = $fecha.split('/')[0] + $fecha.split('/')[1] + $fecha.split('/')[2];
    if ($fecha.length < 8) {
        CON851('03', '03', _validarFechAperSER134(), 'error', 'error')
    } else {
        let $FECHA_CREAW = $fecha;
        var $ANOCREACW = $FECHA_CREAW.substring(0, 4);
        var $MESCREACW = cerosIzq($FECHA_CREAW.substring(4, 6), 2);
        var $DIACREACW = cerosIzq($FECHA_CREAW.substring(6, 8), 2);
        var $DIAMAX_APER;
        switch (parseInt($MESCREACW)) {
            case 01:
            case 03:
            case 05:
            case 07:
            case 08:
            case 10:
            case 12:
                $DIAMAX_APER = 31
                break;
            case 04:
            case 06:
            case 09:
            case 11:
                $DIAMAX_APER = 30
                break;
            case 02:
                (() => ['2012', '2016', '2020', '2024', '2028', '2032', '2036', '2040', '2044', '2048'].find($ANOCREACW)) == true ? $DIAMAX_APER = 29 : $DIAMAX_APER = 28;
                break;
        }
        if ($DIACREACW > $DIAMAX_APER) {
            CON851('37', '37', _validarFechAperSER134(), 'error', 'error')
        } else {
            SER134.FECHA_SISVAN = $fecha;
            validarFichaSER134()
        }
    }

}

function validarFichaSER134() {
    validarInputs({
        form: "#numficha",
        orden: '1'
    },
        function () {
            _validarFechAperSER134();
        },
        validarBarrioSER134
    )
}

function _validarZonaSER134(zona) {
    var msj;
    switch (zona) {
        case "U":
            msj = "U - URBANA"
            break;
        case "R":
            msj = "R - RURAL"
            break;
        default:
            msj = "NO REGISTRA"
            break;
    }
    return msj;
}

function _validarSexoSER134(sexo) {
    var msj;
    switch (sexo) {
        case "F":
            msj = "F - FEMENINO"
            break;
        case "M":
            msj = "M - MASCULINO";
            break;
        default:
            msj = "NO REGISTRA"
            break;
    }
    return msj;
}

function _validarRegimenSER134(regimen) {
    var msj;
    switch (regimen) {
        case "C":
            msj = "C - CONTRIBUTIVO"
            break;
        case "S":
            msj = "S - SUBSIDIADO"
            break;
        case "V":
            msj = "V - VINCULADO"
            break;
        case "P":
            msj = "P - PARTICULAR"
            break;
        case "O":
            msj = "O - OTRO TIPO"
            break;
        case "D":
            msj = "D - DESPLAZ CONT"
            break;
        case "E":
            msj = "E - DESPLAZ SUBS"
            break;
        case "F":
            msj = "F - DESPLAZ VINC"
            break;
        default:
            msj = "NO REGISTRA"
            break;
    }
    return msj;
}

function _validarEtniaSER134(etnia) {
    var msj;
    switch (etnia) {
        case "1":
            msj = "1 - INDIGENA"
            break;
        case "2":
            msj = "2 - RAIZAL"
            break;
        case "3":
            msj = "3 - GITANO"
            break;
        case "4":
            msj = "4 - AFROCOL"
            break;
        case "5":
            msj = "5 - ROM"
            break;
        case "6":
            msj = "6 - MESTIZO"
            break;
        case "9":
            msj = "9 - NO APLICA"
            break;
        default:
            msj = "NO REGISTRA"
            break;
    }
    return msj
}

function validarBarrioSER134() {
    validarInputs({
        form: "#barrio",
        orden: '1'
    },
        function () {
            validarFichaSER134();
        },
        _validarCntrSaludSER134
    )
}

function _validarCntrSaludSER134() {
    SER134.BARRIO_SISVAN = $('#BARRIOSER_SER134').val();
    validarInputs({
        form: "#centrosalud",
        orden: '1'
    },
        validarBarrioSER134,
        () => {
            SER134.CNTSALUD_SISVAN = $('#CENTROSER_SER134').val();
            validarLactanSER134()
        }

    )
}

function validarLactanSER134() {
    validarInputs({
        form: "#lactsisvan",
        orden: '1'
    },
        _validarCntrSaludSER134,
        function () {
            SER134.LACT_SISVAN = (document.getElementById('LACTASER_SER134').value).toUpperCase();
            if (SER134.LACT_SISVAN == 'S' || SER134.LACT_SISVAN == 'N') {
                validarExclusivaSER134();
            } else {
                SER134.LACT_SISVAN = 'N'; document.getElementById('LACTASER_SER134').valueSER134.LACT_SISVAN;
                validarExclusivaSER134();
            }
        }
    )
}

function validarExclusivaSER134() {
    validarInputs({
        form: "#exclusivasisvan",
        orden: '1'
    },
        validarLactanSER134,
        () => {
            SER134.EXCLUSIV_SISVAN = (document.getElementById('EXCLSER_SER134').value).toUpperCase();
            if (SER134.EXCLUSIV_SISVAN.length == 0) {
                CON851('03', '03', validarExclusivaSER134(), 'error', 'error');
            } else {
                switch (SER134.EXCLUSIV_SISVAN.toUpperCase()) {
                    case 'S': validarMesLacSER134(); break;
                    case 'N': validarProgramaSER134(); break;
                    default: document.getElementById('EXCLSER_SER134').value = 'N'; SER134.EXCLUSIV_SISVAN = 'N'; validarProgramaSER134(); break;
                }
            }
        }
    )
}

function validarMesLacSER134() {
    validarInputs({
        form: "#meslactancia",
        orden: '1'
    },
        validarExclusivaSER134,
        () => {
            SER134.MESLACT_SISVAN = parseInt(document.getElementById('MESLACTASER_SER134').value);
            SER134.MESLACT_SISVAN.length == 0 ? document.getElementById('MESLACTASER_SER134').value = 0 : false;
            validarProgramaSER134()
        }
    )
}

function validarProgramaSER134() {
    validarInputs({
        form: "#programasisvan",
        orden: '1'
    },
        validarMesLacSER134,
        () => {
            SER134.PROGRAM_SISVAN = (document.getElementById('PROGRAMA_SER134').value).toUpperCase();
        }
    )
}

function validarProgramaSER134() {

    var datoProgr = [{
        "COD": "1",
        "DESCRIP": "DESAYUNO INFANTIL"
    },
    {
        "COD": "2",
        "DESCRIP": "RESTAURANTE ESCOLAR"
    },
    {
        "COD": "3",
        "DESCRIP": "RECUPERACION NUTRICIONAL"
    },
    {
        "COD": "4",
        "DESCRIP": "REFRIGERIOS"
    },
    {
        "COD": "5",
        "DESCRIP": "FAMILIAS EN ACCION"
    },
    {
        "COD": "6",
        "DESCRIP": "HOGAR INFANTIL"
    },
    {
        "COD": "7",
        "DESCRIP": "RED UNIDOS"
    },
    {
        "COD": "8",
        "DESCRIP": "NO SABE"
    },
    {
        "COD": "9",
        "DESCRIP": "NINGUNO"
    }
    ]
    POPUP({
        array: datoProgr,
        titulo: 'SELECCIONAR PROGRAMA',
        indices: [{
            id: 'COD',
            label: 'DESCRIP'
        }],
        seleccion: SER134.PROGRAM_SISVAN,
        callback_f: validarExclusivaSER134
    }, evaluarProgramaSER134)

}

function evaluarProgramaSER134(programa) {
    switch (programa.COD.trim()) {
        case '1':

            $("#PROGRAMA_SER134").val('DI' + ' - ' + programa.DESCRIP.trim());
            break;
        case '2':
            $("#PROGRAMA_SER134").val("RE" + ' - ' + programa.DESCRIP.trim());
            break;
        case '3':
            $("#PROGRAMA_SER134").val("RN" + ' - ' + programa.DESCRIP.trim());

            break;
        case '4':
            $("#PROGRAMA_SER134").val("RF" + ' - ' + programa.DESCRIP.trim());
            break;
        case '5':
            $("#PROGRAMA_SER134").val("FA" + ' - ' + programa.DESCRIP.trim());
            break;
        case '6':
            $("#PROGRAMA_SER134").val("HI" + ' - ' + programa.DESCRIP.trim());
            break;
        case '7':
            $("#PROGRAMA_SER134").val("RU" + ' - ' + programa.DESCRIP.trim());
            break;
        case '8':
            $("#PROGRAMA_SER134").val("NS" + ' - ' + programa.DESCRIP.trim());
            break;
        case '9':
            $("#PROGRAMA_SER134").val("NI" + ' - ' + programa.DESCRIP.trim());
            break;
    }
    SER134.PROGRAM_SISVAN = programa.COD;
    // Escoger Paso-W segun NOVEDADW
    actualizarSisvanSER134()
}

function consultarTablasSisvanSER134() {
    let datos_envio = datosEnvio() + SER134.COD_SISVAN.padStart(15, '0')
    postData({
        datosh: datos_envio
    }, get_url("APP/SALUD/SER134-03.DLL"))
        .then((data) => {
            $('#contenedortabla1').removeClass('hide')
            let tablacontrol = data.TABLA;
            let controlSisvan = [];
            tablacontrol.forEach(function (val, index, array) {
                controlSisvan.push(array[index])
            });
            $('#TABLASISVA_SER134').DataTable({
                ajax: {
                    dataType: "JSON",
                    data: controlSisvan,
                    error: function (xhr, error, code) {
                        console.debug(xhr)
                        console.debug(code)
                    }
                },
                columns: [
                    { title: "FECHA" },
                    { title: "EDADMES" },
                    { title: "MESES" },
                    { title: "PESO" },
                    { title: "TALLA" },
                    { title: "IMC" },
                    { title: "PERCEF" },
                    { title: "FINALIDAD" },
                ]
            })

            if (SER134.SEXO_PACI == 'F' || SER134.SEXO_PACI == 'f') {
                if (tablacontrol.CONTROL_MATERNO !== null || typeof tablacontrol.CONTROL_MATERNO != 'undefined') {
                    $('#contenedortabla2').removeClass('hide')

                    $('#TABLASISVA2_SER134').DataTable({
                        ajax: {
                            dataType: "JSON",
                            data: tablacontrol['CONTROL_MATERNO'],
                            error: function (xhr, error, code) {
                                console.debug(xhr)
                                console.debug(code)
                            }
                        },
                        columns: [
                            { title: "FECHA" },
                            { title: "PESO" },
                            { title: "IMC" },
                            { title: "EST-NUT" },
                            { title: "ALT-UTE" },
                            { title: "TENS-MEDIA" },
                            { title: "FECHA-FUR" },
                            { title: "TALLA" },
                            { title: "HEMOGLOB" },
                            { title: "TRIMESTRE" },
                            { title: "CALCIO" },
                            { title: "HIERRO" },
                            { title: "ACIDOF" }
                        ]
                    })
                }

            }
        }, _validarFechAperSER134())
        .catch((error) => {
            console.log(error)
        });
}

function actualizarSisvanSER134() {
    var parametros, msj, aperfecha, d, respuesta;
    switch (parseInt(SER134['NOVEDADW'])) {
        case 7:
            SER134.FICHA_SISVAN = document.getElementById('NUMEROFIC_SER134').value;
            aperfecha = fechaAperMask._value;
            aperfecha = aperfecha.split('/')[0] + aperfecha.split('/')[1] + aperfecha.split('/')[2];
            SER134.FECHA_SISVAN = aperfecha
            d = new Date();
            SER134.FECHACREA_SISVAN = moment().format("YYYYMMDD");
            SER134.CNTSALUD_SISVA = document.getElementById('CENTROSER_SER134').value;
            SER134.BARRIO_SISVAN = document.getElementById('BARRIOSER_SER134').value;
            SER134.LACT_SISVAN = document.getElementById('LACTASER_SER134').value;
            SER134.EXCLUSIV_SISVAN = document.getElementById('EXCLSER_SER134').value;
            SER134.MESLACT_SISVAN = document.getElementById('MESLACTASER_SER134').value
            SER134.OPERMODIF_SISVAN = '    ';
            SER134.FECHAMODIF_SISVAN = '        ';
            d = new Date();
            parametros = SER134.COD_SISVAN + '|' +
                SER134.FICHA_SISVAN + '|' +
                SER134.FECHA_SISVAN + '|' +
                SER134.CNTSALUD_SISVAN + '|' +
                SER134.BARRIO_SISVAN + '|' +
                SER134.PROGRAM_SISVAN + '|' +
                SER134.LACT_SISVAN + '|' +
                SER134.EXCLUSIV_SISVAN + '|' +
                SER134.MESLACT_SISVAN + '|' +
                SER134.OPERCREA_SISVAN + '|' +
                SER134.FECHACREA_SISVAN + '|'
            msj = '¿DESEA GRABAR LOS DATOS?'
            respuesta = "Datos grabados corectamente"

            break;
        case 8:
            SER134.FICHA_SISVAN = document.getElementById('NUMEROFIC_SER134').value;
            aperfecha = fechaAperMask._value;
            aperfecha = aperfecha.split('/')[0] + aperfecha.split('/')[1] + aperfecha.split('/')[2];
            SER134.FECHA_SISVAN = aperfecha
            SER134.CNTSALUD_SISVA = document.getElementById('CENTROSER_SER134').value;
            SER134.BARRIO_SISVAN = document.getElementById('BARRIOSER_SER134').value;
            SER134.LACT_SISVAN = document.getElementById('LACTASER_SER134').value;
            SER134.EXCLUSIV_SISVAN = document.getElementById('EXCLSER_SER134').value;
            SER134.OPERMODIF_SISVAN = localStorage['Usuario'];
            d = new Date();
            SER134.FECHAMODIF_SISVAN = d.getFullYear() + (d.getMonth() + 1) + cerosIzq(d.getDate(), 2);
            parametros = SER134.COD_SISVAN + '|' +
                SER134.FICHA_SISVAN + '|' +
                SER134.FECHA_SISVAN + '|' +
                SER134.CNTSALUD_SISVAN + '|' +
                SER134.BARRIO_SISVAN + '|' +
                SER134.PROGRAM_SISVAN + '|' +
                SER134.LACT_SISVAN + '|' +
                SER134.EXCLUSIV_SISVAN + '|' +
                SER134.MESLACT_SISVAN + '|' +
                SER134.OPERCREA_SISVAN + '|' +
                SER134.FECHACREA_SISVAN + '|' +
                SER134.OPERMODIF_SISVAN + '|' +
                SER134.FECHAMODIF_SISVAN + '|';
            msj = '¿DESEA MODIFICAR EL REGISTRO?'
            respuesta = "Datos modificados corectamente"
            break;
        case 9:
            parametros = SER134.COD_SISVAN + '|'
            msj = '¿DESEA ELIMINAR EL REGISTRO?'
            respuesta = "El registro se eliminó con exito"
            break;
    }
    bootbox.confirm({
        size: "small",
        onEscape: false,
        message: msj,
        buttons: {
            confirm: {
                label: 'Si',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result == true) {
                on_actualizarSisvanSER134(parametros, SER134['NOVEDADW'], respuesta);

            } else {
                validarProgramaSER134();
            }
        }
    });
}

function on_actualizarSisvanSER134(parametros, novedad, respuesta) {
    let datos_envio = datosEnvio() + novedad + "|" + parametros
    postData({
        datosh: datos_envio
    }, get_url("APP/SALUD/SER134-02.DLL"))
        .then((data) => {
            if (data[0] == "00") {
                toastr.success('Se actualizado correctamente el registro ' + mensaje, 'MAESTRO FICHA SISVAN');
                limpiarCajas_SER134()
            } else {
                CON851('ERROR', 'ERROR AL ACTUALIZAR', limpiarCajas_SER134(), 'error', 'error');
            };
        })

        .catch((error) => {
            console.log(error)
        })

}

function limpiarCajas_SER134() {
    _toggleNav();
    CON850(_evaluarCON850_SER134);
}