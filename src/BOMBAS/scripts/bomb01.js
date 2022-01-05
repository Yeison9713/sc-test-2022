var $_NOVEDAD, $_TABLA_CLTANQUES, $_CONSULT_CL;
$(document).ready(function () {
    loader('hide');
    _solicitarAcceso();
});

$(document).on('keydown', '#med_01', function (e) { // f3 guardar
    // if (e.which == 114) {
    //     _crearPlano();
    // }
});

function _solicitarAcceso() {
    _inputControl('reset');
    _inputControl('disabled');
    var psw = $_USUA_GLOBAL[0].CLAVE_2.trim();
    var fuente = ''
        + '<div style="width: 100%; height: 100%;text-align: center;">'
        + ' <input id="pwdAcceso" type="password" style="outline: none;padding: 5px 12px;box-sizing: border-box;" autofocus/>'
        + '</div>';

    jAlert({
        titulo: 'Clave de bloqueo',
        mensaje: fuente,
        autoclose: false,
        btnCancel: true
    }, function () {
        let pwdIn = $('#pwdAcceso').val();
        if (pwdIn == psw) {
            jAlert_close();
            $('#claveAcceso_02').val(psw);
            CON850(_evaluarNovedad_01, { opcion9: false });
        } else {
            $('#pwdAcceso').val('').focus();
            plantillaToast("99", "Clave de acceso inválida", null, 'error');
        }
    }, function () {
        jAlert_close();
        _toggleNav();
    });
}

function _evaluarNovedad_01(novedad) {
    $_NOVEDAD = novedad.id;
    switch (parseInt(novedad.id)) {
        case 7:
        case 8:
        case 9:
            modificar_01();
            break;
        default:
            _solicitarAcceso();
            break;
    }
    $('#novedad_01').val(novedad.id + ' - ' + novedad.descripcion);
}

function modificar_01() {
    _initBox_01();
    validarInputs(
        {
            form: '#consulta',
            orden: '1'
        },
        function () { CON850(_evaluarNovedad_01); },
        _infoClTanque
    )
}

function _infoClTanque() {
    let clTanque = $('#clTaan_01').val();

    var datos_envio = datosEnvio() + cerosIzq(clTanque, 2) + '|' + $_NOVEDAD + "|";

    postData({ datosh: datos_envio }, get_url("app/bombas/BOMB01.DLL"))
        .then(data => {
            $('#Descrip_cl_01').val(data.DESCRIP[0]);
            $_TABLA_CLTANQUES = data.LISTADO;
            _montarTabla();

            switch ($_NOVEDAD) {
                case '7': validarPrimeraFase('1'); break;
                case '8': validarPrimeraFase('1'); break;
                case '9': _eliminar01(); break;
                default: console.log('novedad no definida'); break;
            }
        }).catch(err => {
            console.log(err)
            modificar_01();
        })
}

function validarPrimeraFase(orden) {
    validarInputs(
        {
            form: '#fase1',
            orden: orden
        },
        modificar_01,
        validarClTanq_01
    )
}

function validarClTanq_01() {
    var segundoItem = cerosIzq($('#cm_01').val(), 3)
    var itemsTabla = $('#tabla_cl_tanq tbody td').length + 1;
    if (segundoItem > itemsTabla || segundoItem == '000') {
        $('#cm_01').val(cerosIzq(itemsTabla, 3));
        validarPrimeraFase('2');
    } else {
        $_CONSULT_CL = _consultarItemArray_clTanques(segundoItem);
        if ($_CONSULT_CL) {
            $('#med_01').val(parseFloat($_CONSULT_CL.array.COMP));
            _validarSegundaFase();
        } else {
            $('#cm_01').val(cerosIzq(segundoItem, 3));
            validarPrimeraFase('2');
        }
    }
}

function _validarSegundaFase() {
    validarInputs(
        {
            form: '#fase2',
            orden: '1',
            event_f3: _guardar_01
        },
        function () { validarPrimeraFase('2') },
        validarMedid
    )
}

function validarMedid() {
    var index = $_CONSULT_CL.index;
    if (index > 1 && parseFloat($('#med_01').val()) > 0 && parseFloat($('#med_01').val()) < $_TABLA_CLTANQUES[index - 2].COMP) {
        plantillaError('', '07', 'BOMB01', function () {
            _validarSegundaFase();
        });
    } else {
        if (index > 280) {
            _guardar_01();
        } else {
            $_TABLA_CLTANQUES[index - 1].COMP = cerosIzq($('#med_01').val(), 6);
            _montarTabla();
            $('#cm_01').val(parseFloat($('#cm_01').val()) + 1);
            validarPrimeraFase('2');
        }
    }
}

function _guardar_01() {
    // set_Event_validar('#fase2', 'off');
    CON850_P(function (e) {
        if (e.id == 'S') {
            _onDllBomb01_1();
        } else {
            _validarSegundaFase();
        }
    }, {});
}

function _eliminar01() {
    // set_Event_validar('#fase2', 'off');
    CON850_P(function (e) {
        if (e.id) {
            _onDllBomb01_1();
        } else {
            _validarSegundaFase();
        }
    }, {
        msj: '02'
    });
}

function _onDllBomb01_1() {
    var data = {}, posicion = 0;
    for (const i in $_TABLA_CLTANQUES) {
        posicion++;
        data['LIN-' + posicion.toString().padStart(3, '0')] = $_TABLA_CLTANQUES[i].COMP;
    }

    data.datosh = datosEnvio()
        + $_NOVEDAD + "|"
        + cerosIzq($('#clTaan_01').val(), 2) + "|"
        + $('#Descrip_cl_01').val() + "|";

    postData(data, get_url("app/bombas/BOMB01_1.DLL"))
        .then(data => {
            jAlert({ titulo: 'Notificacion', mensaje: "Modificado correctamente" }, function () {
                modificar_01();
            });
        }).catch(_solicitarAcceso)
}

function _montarTabla() {
    $('#fase3').removeAttr('hidden', true);
    $('#tabla_cl_tanq tbody').html('');
    var num = 1;
    for (var i = 1; i <= 12; i++) {
        var column = $('<tr/>', { id: 'columna-' + i });
        for (var j = 1; j <= 25; j++) {
            column.append(
                $('<td/>',
                    { id: 'fila-' + num })
                    .html(num + ' - ').append($('<span/>', { class: 'bold' }).html($_TABLA_CLTANQUES[num - 1]['COMP']))
            );
            num++;
        }
        $('table tbody').append(column)
    }
}

function _initBox_01() {
    $('#clTaan_01').val('');
    $('#Descrip_cl_01').val('');
    $('#cm_01').val('');
    $('#med_01').val('');
    $('#galon_01').val('');
    $('#tabla_cl_tanq tbody').html('');
    $('#fase3').attr('hidden', true);
}

function _consultarItemArray_clTanques(item) {
    var retornar = false;
    for (var i in $_TABLA_CLTANQUES) {
        if (parseFloat(item) == parseFloat(i) + 1) {
            retornar = {
                index: parseFloat(i) + 1,
                array: $_TABLA_CLTANQUES[i]
            };
        }
    }
    return retornar;
}