// const exe = require('child_process').execFile,
// const fs = require('fs');
// const path = require('path');
var $_IP_DATOS;
var $_MODULO = [], $_NOMINA = [], $_FECHA = "";
$(document).ready(function () {
    _inputControl('disabled');
    consultarIp();
    $('#continuar_contab_conf').off('click');
    $('#guardar_conf').click(guardarConfig);

    $('#salir_conf').click(function () {
        let path = require('path');
        var url = path.join(__dirname, '../../login/login.html');
        window.location.href = url;
    });

    $('#habilitar_cont_conf').click(function () {
        _fin_validar_form();
        validarFaseContab();
    });

    $('#habilitar_cond_mod_conf').click(function () {
        _fin_validar_form();
        primeraFaseModulos();
    });

    $('#habilitar_nom_conf').click(function () {
        _fin_validar_form();
        validarFaseNomina();
    });
});

function consultarIp() {
    if (localStorage.IP_DATOS) {
        $_IP_DATOS = localStorage.IP_DATOS;        
        postData({ datosh: "GEBC" }, get_url("app/INDEX/SC-USUNET.DLL"))
            .then(respuestCargarJson)
            .catch(err => {
                console.log(err)
            })
    } else {
        jAlert({ titulo: 'Error 99', mensaje: 'No se encontro ip, favor y volver al logueo', autoclose: false });
    }
}

function respuestCargarJson(datos) {
    var conf = datos['Usunet'];
    $_MODULO = datos['MODULOS'];
    console.debug($_MODULO);
    $_MODULO.pop();
    $_NOMINA = conf[0]['NOMINA'];
    $_NOMINA.pop();

    $('#empr_conf').val(conf[0]['NOMUSU'].trim());
    $('#nit_conf').val(conf[0]['NITUSU'].trim());
    $('#dir_conf').val(conf[0]['DIRUSU'].trim());
    $('#email_conf').val(conf[0]['EMAILUSU'].trim());
    $('#contr_conf').val(conf[0]['CLAVEUSU'].trim());
    $('#serv_email_conf').val(conf[0]['SERVIDORUSU'].trim());
    $('#puerto_conf').val(conf[0]['PUERTOUSU'].trim());
    $('#ssl_conf').val(conf[0]['SSLUSU'].trim());
    $('#ip_datos_conf').val(conf[0]['IPUSU'].trim());
    $('#ip_datos2_conf').val(conf[0]['IPUSU2'].trim())
    $('#ip_desc_conf').val(conf[0]['IP-DESCARGA'].trim());
    $('#unid_prog_conf').val(conf[0]['UNID-PROG'].trim());
    var cont = conf[0].CONTAB.length;
    $('table tbody').html('');
    if (cont > 0) {
        for (var i = 0; i < cont - 1; i++) {
            montarDataContab(conf[0].CONTAB[i]['DIR'].trim());
        }
    }
    montarDataModulo();
    montarDataNom();
    //validarPrimeraFase('1');
    primeraFaseModulos();
}

function validarPrimeraFase(orden) {
    validarInputs({
        form: "#fase1",
        orden: orden
    },
        consultarIp,
        function () {
            validarSegundaFase('1');
        }
    );
}

function validarSegundaFase(orden) {
    validarInputs({
        form: '#fase2',
        orden: orden
    },
        function () {
            validarPrimeraFase('3');
        },
        function () {
            validarTerceraFase('1');
        }
    );
}

function validarTerceraFase(orden) {
    validarInputs({
        form: '#fase3',
        orden: orden
    },
        function () {
            validarSegundaFase('4')
        },
        validarCuartaFase
    );
}

function validarCuartaFase() {
    validarInputs({
        form: '#fase4',
        orden: '1'
    },
        function () {
            validarTerceraFase('4');
        },
        validarFaseContab
    );
}

function validarFaseContab() {
    validarInputs({
        form: '#fase_contab',
        orden: '1',
        event_f3: function () {
            primeraFaseModulos();
        }
    },
        function () {
            $('#continuar_contab_conf').attr('disabled', true);
            validarTerceraFase('4');
        },
        function () {
            if ($('#dir_cont_conf').val()) {
                montarDataContab($('#dir_cont_conf').val());
                validarFaseContab();
                $('#dir_cont_conf').val('');
            } else {
                jAlert({ titulo: 'Error 99', mensaje: 'Debe ingresar un valor', autoclose: true }, function () {
                    validarFaseContab();
                });
            }
        }
    );
}

function primeraFaseModulos() {
    validarInputs({
        form: '#primera_fase_modulo',
        orden: '1',
        event_f3: function () {
            validarFaseNomina();
        }
    },
        validarFaseContab,
        function () {
            if ($('#cod_modul_conf').val()) {
                var consulta = consultarModulo($('#cod_modul_conf').val().toString().toUpperCase());
                if (consulta) {
                    $('#des_modul_conf').val(consulta.array.DESCRIP);
                    $('#act_modul_conf').val(consulta.array.ACT);
                    segundaFaseModulos('1');
                } else {
                    jAlert({ titulo: 'Error 99', mensaje: 'Codigo no se encontro', autoclose: true }, primeraFaseModulos);
                }
            } else {
                jAlert({ titulo: 'Error 99', mensaje: 'Ingrese un codigo', autoclose: true }, primeraFaseModulos);
            }
        }
    );
}

function segundaFaseModulos(orden) {
    validarInputs({
        form: '#segunda_fase_modulo',
        orden: orden
    },
        primeraFaseModulos,
        function () {
            CON850_P(function (e) {
                if (e.id == 'S') {
                    var consulta = consultarModulo($('#cod_modul_conf').val().toString().toUpperCase());
                    $_MODULO[consulta.index]['DESCRIP'] = $('#des_modul_conf').val();
                    $_MODULO[consulta.index]['ACT'] = $('#act_modul_conf').val().toString().toUpperCase();
                    montarDataModulo();
                    $('#cod_modul_conf').val('');
                    $('#des_modul_conf').val('');
                    $('#act_modul_conf').val('');
                    primeraFaseModulos();
                } else {
                    segundaFaseModulos('2');
                }
            }, {
                msj: "Modificar item?"
            });
        }
    );
}

function validarFaseNomina() {
    validarInputs({
        form: '#fase_nom',
        orden: '1'
    },
        primeraFaseModulos,
        function () {
            if ($('#dir_nom_conf').val()) {
                var consulta = consultarNomina($('#dir_nom_conf').val().toString().toUpperCase());
                if (consulta) {
                    $_NOMINA[consulta.index]['NOM'] = $('#dir_nom_conf').val().toString().toUpperCase();
                } else {
                    var item = { "NOM": $('#dir_nom_conf').val().toString().toUpperCase() };
                    $_NOMINA.push(item);
                }
                montarDataNom();
                validarFaseNomina();
                $('#dir_nom_conf').val('');
            } else {
                jAlert({ titulo: 'Error 99', mensaje: 'Debe ingresar un valor', autoclose: true }, function () {
                    validarFaseNomina();
                });
            }
        }
    );
}

function montarDataContab(data) {
    var cont = $('#table_contab tbody tr').length + 1;
    if (cont > 60) {
        alert('Supero el maximo de contabilidades por usuario');
    } else {
        var plantilla = "<tr>" +
            "<td>" + cont + "</td>" +
            "<td>" + data + "</td>" +
            "<td>" +
            "<a delete>" +
            "<i class='fa fa-trash'></i>" +
            "</a>" +
            "</td>" +
            "</tr>";
        $('#table_contab tbody').append(plantilla);
    }
    $("a[delete]").click(function () {
        $(this).parents('tr').remove();
    });
}

function montarDataModulo() {
    $('#table_modulo tbody').html('');
    if ($_MODULO.length > 0) {
        for (var i in $_MODULO) {
            var plantilla = "<tr>" +
                "<td>" + $_MODULO[i].COD + "</td>" +
                "<td>" + $_MODULO[i].DESCRIP + "</td>" +
                "<td>" + $_MODULO[i].ACT + "</td>" +
                "</tr>";
            $('#table_modulo tbody').append(plantilla);
        }
    }
}

function montarDataNom() {
    $('#table_nom tbody').html('');
    if ($_NOMINA.length > 0) {
        for (var i in $_NOMINA) {
            var posi = parseInt(i) + 1;
            var plantilla = "<tr>" +
                "<td>" + posi + "</td>" +
                "<td>" + $_NOMINA[i].NOM + "</td>" +
                "<td>" +
                "<a delete>" +
                "<i class='fa fa-trash'></i>" +
                "</a>" +
                "</td>" +
                "</tr>";
            $('#table_nom tbody').append(plantilla);
        }
        $("a[delete]").click(function () {
            var td = $(this).parents('tr').children('td');
            var posicion = $(td[0]).html();
            $_NOMINA.splice(parseInt(posicion) - 1, 1);
            montarDataNom();
        });
    }
}

function guardarConfig() {
    if ($('#table_contab tbody tr').length > 0) {
        var datos = $('#empr_conf').val();
        datos += "|";
        datos += $('#nit_conf').val();
        datos += "|";
        datos += $('#dir_conf').val();
        datos += "|";
        datos += $('#email_conf').val();
        datos += "|";
        datos += $('#contr_conf').val();
        datos += "|";
        datos += $('#serv_email_conf').val();
        datos += "|";
        datos += $('#puerto_conf').val();
        datos += "|";
        datos += $('#ssl_conf').val();
        datos += "|";
        datos += $('#ip_datos_conf').val();
        datos += "|";
        datos += $('#ip_desc_conf').val();
        datos += "|";
        datos += $('#unid_prog_conf').val().toString().toUpperCase();
        datos += "|";
        datos += $('#ip_datos2_conf').val();
        datos += "|";

        var datos_envio = {}, posicion = 0;
        datos_envio.datosh = datos;
        $.each($('#table_contab tbody tr'), function (k, v) {
            posicion++;
            datos_envio['LN1-' + posicion.toString().padStart(3, "0")]
                = $(v).children('td:eq(1)').text().trim() + "|";
        });

        posicion = 0;
        for (var i in $_NOMINA) {
            posicion++;
            datos_envio['LN2-' + posicion.toString().padStart(3, "0")] = $_NOMINA[i]['NOM'] + "|";
        }

        posicion = 0;
        for (var i in $_MODULO) {
            posicion++;
            datos_envio['LN3-' + posicion.toString().padStart(3, "0")]
                = $_MODULO[i]['COD'] + "|"
                + $_MODULO[i]['DESCRIP'] + "|"
                + $_MODULO[i]['ACT'] + "|";
        }
        console.log(datos_envio)
        postData(datos_envio, get_url('app/INDEX/INDEX_CONFIG.DLL'))
            .then(data => {
                jAlert({ titulo: 'Guardado!', mensaje: 'Datos modificados correctamente.', autoclose: false }, () => {
                    window.location.reload();
                });

            })
            .catch(err => {
                console.log(err)
            })
    } else {
        jAlert({ titulo: 'Error', mensaje: 'Debe ingresar las contabilidades.', autoclose: false });
    }
}

function get_url(dll) {
    return "http://" + $_IP_DATOS + "/MAIN-ELECT/" + dll;
}

function _inputControl(set) {
    switch (set) {
        case 'disabled':
            $('input.form-control, button.f8-Btn').each(function () {
                $(this).attr('disabled', 'true');
            })
            break;
        case 'reset':
            $('input.form-control').each(function () {
                $(this).val('');
            })
            break;
    }
}

function consultarModulo(item) {
    var retornar = false;
    for (var i in $_MODULO) {
        if (item.trim() == $_MODULO[i].COD.trim()) {
            retornar = {
                index: i,
                array: $_MODULO[i]
            }
        }
    }
    return retornar;
}

function consultarNomina(item) {
    var retornar = false;
    for (var i in $_NOMINA) {
        if (item == $_NOMINA[i].COD) {
            retornar = {
                index: i,
                array: $_NOMINA[i]
            }
        }
    }
    return retornar;
}