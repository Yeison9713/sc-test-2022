/* NOMBRE RM --> SER601 // 15-02-2020- DESARROLLADO: DIANA ESCOBAR */
var SER108B = [];
var $_FECHAACTUAL = moment().format('YYYYMMDD');
$_ANOACTUALW = $_FECHAACTUAL.substring(0, 4);
$_MESACTUALW = $_FECHAACTUAL.substring(4, 6);
$_DIAACTUALW = $_FECHAACTUAL.substring(6, 8);

$(document).ready(function () {
    nombreOpcion('9,7,4,1,2,2 - Dispersion por paciente');
    _inputControl('reset');
    _inputControl('disabled');
    $_IP_DATOS = localStorage.ip_server ? localStorage.ip_server : false;
    $_ADMINW = localStorage.Usuario ? localStorage.Usuario : false;
    $_FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_DIALNK = $_FECHA_LNK.substring(4, 6);
    $_MESLNK = $_FECHA_LNK.substring(2, 4);
    $_ANOLNK = $_FECHA_LNK.substring(0, 2);
    $_NITUSU = $_USUA_GLOBAL[0].NIT;
    $_NOMBREUSU = $_USUA_GLOBAL[0].NOMBRE;
    SER108B.HORASISTEMA = moment().format('HHmmss');
    SER108B.TABLAPAC = [];
    _leerusuario_SER108B();
});


function _leerusuario_SER108B() {

    if (($_ADMINW == "GEBC") || ($_ADMINW == "0101") || ($_ADMINW == "ADMI")) {
        SER108B.SWINVALID = '00';
        _validacionusuario_SER108B();
    } else {
        SER108B.SWINVALID = '49';
        switch ($_NITUSU) {
            case 830092718:
                if (($_ADMINW == 'ROJ2') || ($_ADMINW == 'ADMI')) {
                    SER108B.SWINVALID = '00';
                    _validacionusuario_SER108B();
                } else {
                    _validacionusuario_SER108B();
                }
                break;
            case 830092719:
                if (($_ADMINW == 'ROJ2') || ($_ADMINW == 'ADMI')) {
                    SER108B.SWINVALID = '00';
                    _validacionusuario_SER108B();
                } else {
                    _validacionusuario_SER108B();
                }
                break;
            case 900004059:
                if ($_ADMINW == 'JOHA') {
                    SER108B.SWINVALID = '00';
                    _validacionusuario_SER108B();
                } else {
                    _validacionusuario_SER108B();
                }
                break;
            case 800162035:
                if (($_ADMINW == 'ROJ2') || ($_ADMINW == 'ADMI')) {
                    SER108B.SWINVALID = '00';
                    _validacionusuario_SER108B();
                } else {
                    _validacionusuario_SER108B();
                }
                break;
            case 900161116:
                SER108B.SWINVALID = '00';
                _validacionusuario_SER108B()
                break;
            case 830511298:
                SER108B.SWINVALID = '00';
                _validacionusuario_SER108B()
                break;
            case 900541158:
                SER108B.SWINVALID = '00';
                _validacionusuario_SER108B()
                break;
            case 900566047:
                SER108B.SWINVALID = '00';
                _validacionusuario_SER108B()
                break;
            case 900658867:
                SER108B.SWINVALID = '00';
                _validacionusuario_SER108B()
                break;
            case 900565371:
                SER108B.SWINVALID = '00';
                _validacionusuario_SER108B()
                break;
            case 901120152:
                SER108B.SWINVALID = '00';
                _validacionusuario_SER108B()
                break;
            // DEI
            default:
                SER108B.SWINVALID = '00';
                _validacionusuario_SER108B();
                break;
        }
    }
}

function _validacionusuario_SER108B() {
    if (SER108B.SWINVALID == '49') {
        CON851('49', '49', null, 'error', 'error');
        setTimeout(_toggleNav, 500);
    } else {
        if ($_ANOLNK > 90) {
            SER108B.ANOALFA = parseInt($_ANOLNK) + 1900;
        } else {
            SER108B.ANOALFA = parseInt($_ANOLNK) + 2000;
        }
        _dato1_SER108B();
    }
}

function _dato1_SER108B() {
    SER108B.PREFW = 'A';
    $('#prefijo_108B').val(SER108B.PREFW);
    validarInputs(
        {
            form: "#PREFIJO_SER108B",
            orden: '1'
        },
        () => { _toggleNav(); },
        () => {
            SER108B.PREFW = $('#prefijo_108B').val();
            if ((SER108B.PREFW == 'A') || (SER108B.PREFW == 'P') || (SER108B.PREFW == 'T')) {
                _aceptarnumero_SER108B();
            } else {
                CON851('03', '03', null, 'error', 'error');
                _dato1_SER108B();
            }
        }
    )
}


function _aceptarnumero_SER108B() {
    validarInputs(
        {
            form: "#NUMERO_SER108B",
            orden: '1'
        },
        () => { _dato1_SER108B(); },
        () => {
            SER108B.NROFACT = $('#numero_108B').val();
            SER108B.NROFACT = cerosIzq(SER108B.NROFACT, 6);
            $('#numero_108B').val(SER108B.NROFACT);
            if ((SER108B.NROFACT.trim() == '') || (SER108B.NROFACT == '0')) {
                _aceptarnumero_SER108B();
            } else {
                SER108B.LLAVENUM = SER108B.PREFW + SER108B.NROFACT;
                let datos_envio = datosEnvio() + SER108B.LLAVENUM + '|';
                SolicitarDll({ datosh: datos_envio }, dato => {
                    var date = dato.split("|");
                    var SWINVALID = date[0];
                    SER108B.NITNUM = date[2].trim();
                    SER108B.DESCRIPNUM = date[3].trim();
                    SER108B.CONVENIONUM = date[4].trim();
                    SER108B.DESCRIPTAR = date[5].trim();
                    SER108B.ESTADONUM = date[6].trim();
                    SER108B.IDPACNUM = date[10].trim();
                    SER108B.DESCRIPPACINUM = date[11].trim();
                    SER108B.FECHAINGNUM = date[15].trim();
                    SER108B.FECHASALNUM = date[16].trim();
                    SER108B.HORAINGNUMW = date[17].trim();
                    SER108B.HORARETNUMW = date[18].trim();
                    if (SWINVALID == '00') {
                        $('#nit_108B').val(SER108B.NITNUM);
                        $('#descripnit_108B').val(SER108B.DESCRIPNUM);
                        $('#convenio_108B').val(SER108B.CONVENIONUM);
                        $('#descripconvenio_108B').val(SER108B.DESCRIPTAR);
                        if (SER108B.ESTADONUM == '0') {
                            $('#estado_108B').val('0 - ACTIVA');
                        } else if (SER108B.ESTADONUM == '1') {
                            $('#estado_108B').val('1 - INACTIVA');
                        } else if (SER108B.ESTADONUM == '2') {
                            $('#estado_108B').val('2 - BLOQUEADA');
                        }
                        $('#idpaci_108B').val(SER108B.IDPACNUM);
                        $('#descrippaci_108B').val(SER108B.DESCRIPPACINUM);
                        $('#fechaing_108B').val(SER108B.FECHAINGNUM);
                        $('#horaing_108B').val(SER108B.HORAINGNUMW);
                        $('#fecharet_108B').val(SER108B.FECHASALNUM);
                        $('#horaret_108B').val(SER108B.HORARETNUMW);
                        if ((SER108B.ESTADONUM == '0') || (SER108B.ESTADONUM == '3')) {
                            _ventanaprefijodest_SER108B();
                        } else {
                            CON851('70', '70', null, 'error', 'error');
                            _aceptarnumero_SER108B();
                        }
                    } else if (SWINVALID == '01') {
                        CON851('01', '01', null, 'error', 'error');
                        _aceptarnumero_SER108B();
                    }
                }, get_url('APP/SALUD/SER108-01.DLL'));
            }

        }
    )
}

function _ventanaprefijodest_SER108B() {
    var ventanaprefijodest = bootbox.dialog({
        size: 'large',
        title: 'PERMITE LISTAR HASTA 20 PACIENTES ',
        message: '<div class="row"> ' +
            '<div class="col-md-12"> ' +

            '<div class="col-md-12 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-4 col-sm-6 col-xs-6 control-label" for="name">' + "PREFIJO DE DESTINO: " + '</label> ' +
            '<div class="col-md-3 col-sm-6 col-xs-6"  id="PREFIJODEST_SER108B"> ' +
            '<input id="prefijodest_108B" class="form-control input-md" data-orden="1" maxlength="1"> ' +
            '</div> ' +
            '<div class="col-md-5 col-sm-6 col-xs-6"> ' +
            '<input id="descripdest_108B" class="form-control input-md"> ' +
            '</div> ' +
            '</div> ' +
            '<div class="salto-linea"></div>' +
            '<div class="col-md-12 col-sm-6 col-xs-6"> ' +
            '<label class="col-md-12 col-sm-12 col-xs-12 control-label" for="name">' + "-Oprima F3 para grabar - Oprima F7 para modificar la tabla" + '</label> ' +
            '</div> ' +
            '</div>' +
            '</div>' +
            '<div class="form-group col-md-12 col-sm-12 col-xs-12 box-center">' +
            '<div class="col-md-12 col-sm-12 col-xs-12" style="display: flex">' +
            '<div class="col-md-12 col-sm-12 col-xs-12 inline-inputs">' +
            '<div class="col-md-12 col-sm-2 col-xs-2">' +
            ' <div class="inline-inputs">' +
            '<label class="col-md-7 col-sm-6 col-xs-6 text-label">' + "Paciente a dispensar:" + '</label>' +
            '<div class="input-group col-md-6 col-sm-12 col-xs-12" id="CEDULA_SER108B">' +
            '<input id="cedulapac_108B" maxlength="15" data-orden="1" type="text" class="form-control col-md-12 col-sm-12 col-xs-12" onkeyup="this.value = this.value.toUpperCase();">' +
            ' </div>' +
            // '<button type="button" id="cedulapacBtn_108B" class="btn f8-Btn btn-default col-md-1 col-sm-1 col-xs-1">' +
            // '<i class="icon-magnifier"></i>' +
            // '</button>' +
            '<div class="input-group col-md-12 col-sm-12 col-xs-12">' +
            '<input id="descrippac_108B" type="text" class="form-control col-md-12 col-sm-12 col-xs-12" onkeyup="this.value = this.value.toUpperCase();">' +
            ' </div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '<div style="clear:both;"></div>' +
            '<hr>' +
            '<div class="salto-linea"></div>' +
            '<table id="TABLAPACIENTE_SER108B" class="table table-light table-striped">' +
            '<thead>' +
            '<tr>' +
            '<th>Cedula</th>' +
            '<th>Paciente</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>' +
            '</tbody>' +
            '</table>' +
            '</div>',

        buttons: {
            confirm: {
                label: 'Aceptar',
                className: 'btn-primary',
                callback: function () {
                    ventanaprefijodest.off('show.bs.modal');
                    setTimeout(_fechainicapital_SER10B, 300)

                }
            },
            cancelar: {
                label: 'Cancelar',
                className: 'btn-danger',
                callback: function () {
                    ventanaprefijodest.off('show.bs.modal');
                    setTimeout(_aceptarnumero_SER108B, 300)
                }
            },
            // f8pacientes: {
            //     label: 'Pacientes',
            //     className: 'btn-info',
            //     callback: function () {
            //         ventanaprefijodest.off('show.bs.modal');
            //         setTimeout(_ventanaacompañante_SER108B, 300);
            //     }
            // }
        }
    });
    ventanaprefijodest.init($('.modal-footer').hide());
    ventanaprefijodest.init(_ingresopaciente_SER108B());
    ventanaprefijodest.on('shown.bs.modal', function () {
        $("#prefijodest_108B").focus();
    });
    // ventanaprefijodest.on('shown.bs.modal', function (e) {
    //     _toggleF8([{
    //         input: 'cedulapac', app: '108B', funct: (e) => {
    //             if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
    //                 set_Event_validar('#CEDULA_SER108B', 'off')
    //                 $('.btn-info').click();
    //             }
    //         }
    //     },])
    // });
}

// function _ventanaacompañante_SER108B(e){
//     parametros = {
//         dll: 'PACIENTES',
//         valoresselect: ['Nombre del paciente'],
//         f8data: 'PACIENTES',
//         columnas: [{
//             title: 'COD'
//         }, {
//             title: 'NOMBRE'
//         }, {
//             title: 'EPS'
//         }],
//         callback: (data) => {
//             setTimeout(_ventanaprefijodest_SER108B, 300)
//             setTimeout(() => { $('#cedulapac_108B').val(data.COD) }, 400);
//         },
//         cancel: () => {
//             setTimeout(_ventanaprefijodest_SER108B, 300)
//         }
//     };
//     F8LITE(parametros);
// }

function _ingresopaciente_SER108B() {
    _inputControl("disabled");
    $('#TABLAPACIENTE_SER108B tbody').remove();
    $('#TABLAPACIENTE_SER108B').append('<tbody></tbody>');
    SER108B.TABLAPAC = []
    SER108B.PACIENTEW = '';
    validarInputs({
        form: '#PREFIJODEST_SER108B',
        orden: "1"
    },
        () => { $('.btn-danger').click() },
        () => {
            SER108B.PREFIJODESTW = $('#prefijodest_108B').val().toUpperCase(); $("#prefijodest_108B").val(SER108B.PREFIJODESTW)
            if (SER108B.PREFIJODESTW != 'E' || SER108B.PREFIJODESTW != 'C' || SER108B.PREFIJODESTW != 'H' || SER108B.PREFIJODESTW != 'U') {
                switch (SER108B.PREFIJODESTW) {
                    case 'A':
                        $('#descripdest_108B').val('Ambulatorio');
                        _aceptarpaciente_SER108B();
                        break;
                    case 'P':
                        $('#descripdest_108B').val('Hospitalizado');
                        _aceptarpaciente_SER108B();
                        break;
                    case 'T':
                        $('#descripdest_108B').val('Acc. Transito');
                        _aceptarpaciente_SER108B();
                        break;
                    default:
                        $('#descripdest_108B').val('Ambulatorio');
                        _aceptarpaciente_SER108B();
                        break;
                }
            } else {
                _ingresopaciente_SER108B();
            }
        }
    )
}
function _aceptarpaciente_SER108B() {
    if (SER108B.PACIENTEW == '') {
        SER108B.PACIENTEW = "99";
        $('#cedulapac_108B').val(SER108B.PACIENTEW);
    }
    // if(SER108B.TABLAPAC > 20)_ubicargrabar_ser108B()
    validarInputs({
        form: '#CEDULA_SER108B',
        orden: "1",
        event_f3: () => { _movertabla_SER108B() },
        event_f7: ()=>{_validaciontablapac_SER108B()}
    },
        () => { _ingresopaciente_SER108B() },
        () => {
            SER108B.PACIENTEW = $('#cedulapac_108B').val();
            if (SER108B.PACIENTEW == "000000000000000") {
                CON851('01', '01', _aceptarpaciente_SER108B(), 'error', 'error');
            } else {
                SER108B.PACIENTEW = SER108B.PACIENTEW.padStart(15, '0')
                $('#cedulapac_108B').val(SER108B.PACIENTEW);
                if (SER108B.PACIENTEW == "000000000000099") {
                    $('#descrippac_108B').val("TODOS LOS PACIENTES");
                    _adicionatablapaci_SER108B();
                } else {
                    let URL = get_url("APP/SALUD/SER810-1.DLL");
                    postData({
                        datosh: datosEnvio() + SER108B.PACIENTEW + "|",
                    }, URL)
                        .then(data => {
                            SER108B.PACIENTE = data["REG-PACI"];
                            SER108B.DECRIPACOMPPACIW = SER108B.PACIENTE[0]["DESCRIP"].trim();
                            $('#descrippac_108B').val(SER108B.DECRIPACOMPPACIW);
                            _adicionatablapaci_SER108B();
                        })
                        .catch(error => {
                            console.error(error)
                            _aceptarpaciente_SER108B();
                        });
                }
            }
        }
    )
}

function _adicionatablapaci_SER108B() {
    let existeregistro_SER442 = _validarpacientetabla_SER108B();
    if (!existeregistro_SER442) {
        $('#TABLAPACIENTE_SER108B tbody').append(
            '<tr>' +
            '<td>' + $('#cedulapac_108B').val() + '</td>' +
            '<td>' + $('#descrippac_108B').val() + '</td>' +
            '</tr>'
        );
        _validaciontablapac_SER108B();
    } else {
        var cambiar = $('#cedulapac_108B').val();
        cambiar = parseInt(cambiar) - 1;
        let fila = $('#TABLAPACIENTE_SER108B tbody tr:eq(' + cambiar + ')');
        let html = '<td>' + $('#cedulapac_108B').val() +
            '</td><td>' + $('#descrippac_108B').val() +
            '</td>';
        fila.html(html);
        _validaciontablapac_SER108B();
    }
}

function _validarpacientetabla_SER108B() {
    var found = false;
    $('#TABLAPACIENTE_SER108B tbody tr').each((index, element) => {
        var paciente = $(element).text().substring(0,15)
        if (SER108B.PACIENTEW.trim() == paciente) {
            found = true;
        }
    })
    return found;
}

function _validaciontablapac_SER108B(orden) {
    validarTabla(
        {
            tabla: '#TABLAPACIENTE_SER108B',
            orden: orden,
            Supr: data => {
                $('#TABLAPACIENTE_SER108B tbody tr').each((index, element) => {
                    var paciente = $(element).text().substring(0,15)
                    if (SER108B.PACIENTEW.trim() == paciente) {
                        $(element).remove();
                    }
                })
                _aceptarpaciente_SER108B()
              },
        },
        _pacientes,
        function () {
            _ingresopaciente_SER108B()
        },
        () => {
            _movertabla_SER108B()
        }
    );
}

function _pacientes(datos) {
    $('#cedulapac_108B').val(datos.cells[0].textContent);
    $('#descrippac_108B').val(datos.cells[1].textContent);
    if (SER108B.PACIENTEW == "000000000000099") {
        _movertabla_SER108B()

    } else {
        $('#cedulapac_108B').val('');
        $('#descrippac_108B').val('');
        _aceptarpaciente_SER108B()
    }
}

function _movertabla_SER108B() {
    $('#TABLAPACIENTE_SER108B tbody tr').each((index, element) => {
        var paciente = $(element).text();
        console.log(paciente, 'paciente')
        var a = {
            'cedulapac': paciente.substring(0, 15),
            'descripac': paciente.substring(15, 60)
        };
        SER108B.TABLAPAC.push(a);
        console.log(SER108B.TABLAPAC, 'sube paciente tabla')
    });
    $('.btn-primary').click();
}

function _fechainicapital_SER10B() {
    SER108B.MESFINW = $_MESLNK;
    SER108B.ANOFINW = parseInt($_ANOLNK) + 2000;
    $('#meshasta_108B').val(SER108B.MESFINW);
    $('#anohasta_108B').val(SER108B.ANOFINW);
    if (SER108B.NITNUM == '0900298372') {
        if (SER108B.ANONUM != $_ANOACTUALW || SER108B.MESNUM != $_MESACTUALW) {
            SER108B.DIAFINW = $_DIALNK;
            $('#diahasta_108B').val(SER108B.DIAFINW);
        } else {
            if ($_DIAACTUALW < 10) {
                SER108B.DIAFINW = '05';
            } else if ($_DIAACTUALW < 15) {
                SER108B.DIAFINW = '10';
            } else if ($_DIAACTUALW < 20) {
                SER108B.DIAFINW = '15';
            } else if ($_DIAACTUALW < 25) {
                SER108B.DIAFINW = '20';
            } else {
                SER108B.DIAFINW = '25';
            }
            $('#diahasta_108B').val(SER108B.DIAFINW);
        }
        validarInputs(
            {
                form: "#HASTADIA_SER108B",
                orden: '1'
            },
            () => { _aceptarnumero_SER108B(); },
            () => {
                SER108B.DIAFINW = $('#diahasta_108B').val();
                if (SER108B.DIAFINW < 01) {
                    CON851('03', '03', null, 'error', 'error');
                    _fechainicapital_SER10B();
                } else {
                    _confirmardll_SER108B();
                }
            }
        )
    } else {
        SER108B.DIAFINW = $_DIALNK;
        $('#diahasta_108B').val(SER108B.DIAFINW);
        _confirmardll_SER108B();
    }
}

function _confirmardll_SER108B() {
    SER108B.FECHAFINW = SER108B.ANOFINW + SER108B.MESFINW + SER108B.DIAFINW;
    CON851P('01', _aceptarnumero_SER108B, _ubicargrabar_ser108B)
}
function _ubicargrabar_ser108B() {
    let fecha = moment().format('YY/MM/DD HH:mm:ss:ms');
    let nombretxt = $_ADMINW + '_' + fecha.substring(0, 2) + fecha.substring(3, 5) + fecha.substring(6, 8) + fecha.substring(9, 11) + fecha.substring(12, 14) + fecha.substring(15, 17) + fecha.substring(18, 20);
    SER108B['NOMBRETABLA'] = nombretxt;
    let datosEnvio = {
        nombre_archivo: SER108B.NOMBRETABLA,
        datos_disppaci: SER108B.TABLAPAC,
    };
    $.ajax({
        data: datosEnvio,
        type: 'POST',
        async: false,
        url: get_url('app/Inc/_datostabla_SER108B.php')
    }).done(function (data) {
        if (data == '00') {
            _consultadllgrabar_ser108B();
        } else {
            _aceptarnumero_SER108B()
            console.debug('problemas para crear el txt');
        }
    });
}


function _consultadllgrabar_ser108B() {
    $_FECHACREAW = moment().format('YYYYMMDD');
    let URL = get_url("APP/SALUD/SER108B.DLL");
    postData({
        datosh: datosEnvio() + SER108B.LLAVENUM + '|' + SER108B.PREFIJODESTW + '|' + SER108B.FECHAFINW + '|' + $_ADMINW + '|' + $_FECHACREAW + '|' + SER108B.HORASISTEMA + '|' + SER108B.NOMBRETABLA + '|',
    }, URL)
        .then(data => {
            console.log(data, 'ESTADO GRABADO')
            CON851('','Proceso terminado',_toggleNav(),'success','Exito');

        })
        .catch(error => {
            console.error(error)
            _aceptarnumero_SER108B()
        });
}










