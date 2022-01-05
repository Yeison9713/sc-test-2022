const path = require('path');
const mysql = require('mysql');
const { BrowserWindow } = require('electron').remote;
const moment = require('moment');
const { shell } = require('electron')
var child = require('child_process').exec;
const exe = require('child_process').exec;
var VueSelect = require("vue-select");
require("moment/min/locales.min");
const Excel = require("exceljs");
const { InputMask } = require('imask');
const { VMoney } = require("v-money");
const PDFMerger = require('pdf-merger-js');
const JsBarcode = require('jsbarcode');
const clarinet = require('clarinet');
const { degrees, PDFDocument, rgb, StandardFonts } = require('pdf-lib');

$CONTROL = "";
$_USUA_GLOBAL = [{}];
$_USUARIO_EMPRESA = {};
$_PARENT = false;

function _cerrarSesion() {
    var url = path.join(__dirname, '../../src/login/login.html');
    window.location.href = url;
}

const _cargarScripts = () => {
    let modulo = localStorage.Modulo.trim();
    var $_SCRIPTS;

    fetch('../scripts/scripts.json')
        .then(res => res.json())
        .then(data => {
            $_SCRIPTS = data.Scripts;
            console.log(data.Scripts)
            const salud_includes = ['SAL', 'RX', 'LAB', 'HIC'];
            const otros_includes = ['MAN'];

            $_SCRIPTS[0].Scripts.forEach(item => {
                var element = document.createElement("script");
                element.type = "text/javascript";
                element.src = item;
                $("head").append(element);
            });

            if (salud_includes.includes(modulo)) {
                $_SCRIPTS[1].Scripts.forEach(item => {
                    var element = document.createElement("script");
                    element.type = "text/javascript";
                    element.src = item;
                    $("head").append(element);
                })
            } else if (otros_includes.includes(modulo)) {
                switch (modulo) {
                    case 'MAN':
                        $_SCRIPTS[2].Scripts.forEach(item => {
                            var element = document.createElement("script");
                            element.type = "text/javascript";
                            element.src = item;
                            $("head").append(element);
                        })
                        break;
                    default: break;
                }
            }

            setTimeout(async () => {
                var element = document.createElement("script");
                element.type = "text/javascript";
                element.src = "../assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.js";
                $("head").append(element);

                if (["DOM", "NOM"].includes(modulo)) {
                    await _usuarioModulo({ modulo, datosh: moduloDatosEnvio() })
                        .then((data) => {
                            localStorage.Contab = data.DATOSUSUA.DIR_CONT;
                            $_USUARIO_EMPRESA = data.DATOSUSUA;
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }

                if (["DOM", "NOM"].includes(modulo)) {
                    if ($_USUARIO_EMPRESA.DIR_CONT.trim()) get_usuarios(modulo);
                    else _cargueInfoUsuario();
                } else get_usuarios(modulo)
            }, 100)

        })
        .catch(err => { console.log(err) })
}

const get_usuarios = (modulo) => {
    if (["DOM", "NOM"].includes(modulo)) modulo = "NEW";
    _usuarioModulo({ modulo, datosh: datosEnvio() })
        .then((data) => {
            $_USUA_GLOBAL = data.DATOSUSUA;
            _cargueInfoUsuario();
        })
        .catch((err) => {
            console.log(err);
        });
}

function _cargueInfoUsuario() {
    let modulo = localStorage.Modulo || "";
    cargarMenu();
    $_USUA_GLOBAL[0].NIT = parseInt($_USUA_GLOBAL[0].NIT);
    $_USUA_GLOBAL[0].RUTA_LOGO = path.join(
        "file://",
        __dirname,
        "../imagenes/logo/" + $_USUA_GLOBAL[0].NIT + ".BMP"
    );
    let mes = evaluarMes_min(localStorage.Mes);
    $("title").html(`
                \\${localStorage.Contab}\\${mes}
                &nbsp&nbsp&nbsp&nbsp&nbsp
                ${localStorage.Usuario} 
                ${localStorage.Nombre} 
                `);

    $("#user_menu_user").html(localStorage.Usuario + " - " + localStorage.Nombre);
    $("#lblEmpresa").html($_USUA_GLOBAL[0].NOMBRE);
    $CONTROL = localStorage.Contab + "_13";
    if (
        $_USUA_GLOBAL[0].TIPO_EMPRE == "H" ||
        modulo == "RX" ||
        modulo == "LAB" ||
        modulo == "HIC"
    ) {
        $(".loader").html(
            '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-466.4 259.6 280.2 47.3" enable-background="new -466.4 259.6 280.2 47.3" xml:space="preserve" style="width: 50%; display: block; margin: 0 auto;">' +
            '<polyline fill="none" stroke="#476fAD" class="ekg" stroke-width="1" stroke-linecap="square" stroke-miterlimit="10" points="-465.4,281 -436,281 -435.3,280.6 -431.5,275.2 -426.9,281 -418.9,281 -423.9,281 -363.2,281 -355.2,269 -345.2,303 -335.2,263 -325.2,291 -319.2,281 -187.2,281 "/>' +
            "</svg>"
        );
        $(".loader").css("align-items", "center");
        $(".wrapper").css("display", "contents", "height", "");
    }
}


const _usuarioModulo = (params) => {
    let array_modulos = [
        { cod: "BAR", text: "contab" },
        { cod: "BOM", text: "contab" },
        { cod: "NEW", text: "contab" },
        { cod: "COR", text: "contab" },
        { cod: "HIC", text: "contab" },
        { cod: "LAB", text: "contab" },
        { cod: "MAN", text: "contab" },
        { cod: "RX", text: "contab" },
        { cod: "SAL", text: "contab" },
        { cod: "DOM", text: "SERVDOM" },
        { cod: "TAX", text: "contab" },
        { cod: "NOM", text: "NOMINA" },
    ];

    return new Promise((resolve, reject) => {
        let modulo = params.modulo || "";
        let nombre_modulo = array_modulos.find((e) => e.cod == modulo);
        let url = `APP/${nombre_modulo.text}/CONUSUA.dll`;

        postData(params, get_url(url)).then(data => {
            resolve(data);
        })
            .catch(err => {
                if (["DOM", "NOM", "NEW"].includes(modulo) && err.STATUS) {
                    console.log("ENTRA")
                    CON851("Error en contabilidad", "Verifique la contabilidad escrita", null, "error", "");
                    if (err.STATUS == "35") _cargueInfoUsuario();
                }
                console.error("Error cargando datos del modulo ", err);
                reject(err);
            })
    })
}

function _cargarUsuario() {
    localStorage.Unidad = localStorage.Unidad.toUpperCase();
    var modulo = localStorage.Modulo.trim(),
        url = get_url("APP/CONTAB/CONUSUA.dll");

    postData({ datosh: datosEnvio() }, url)
        .then(data => {
            $_USUA_GLOBAL = data.DATOSUSUA;
        })
        .catch(err => {
            console.error(err);
        });
}

function _validarArchivos_SC() {
    postData({ datosh: datosEnvio() }, get_url("APP/CONTAB/ARCHIVOS-SC.DLL"))
        .then(data => {
            console.log(data)
        })
}

function CON851B(code, func) {
    var form =
        '<form>'
        + '<div class="containerCon851B">'
        + '<label class= "labelUncheckedCon851B" id="contab_851B">Contabilidad</label>'
        + '<label class= "labelUncheckedCon851B" id="invent_851B">Inventarios</label>'
        + '<label class= "labelUncheckedCon851B" id="fact_851B">Facturacion</label>'
        + '<label class= "labelUncheckedCon851B" id="nomina_851B">Nomina</label>'
        + '</div>'
        + '</form>'

    var msj_B

    switch (parseInt(code)) {
        case 1: msj_B = 'Bloqueado solo menu contab.'
            con851B_Deshab('contab_851B')
            break;
        case 2: msj_B = 'Bloqueado solo inventarios'
            con851B_Deshab('invent_851B')
            break;
        case 3: msj_B = 'Periodo de Nomina bloqueado'
            con851B_Deshab('nomina_851B')
            break;
        case 4: msj_B = 'Mes de trabajo bloqueado tot'
            con851B_Deshab('contab_851B')
            con851B_Deshab('invent_851B')
            con851B_Deshab('fact_851B')
            con851B_Deshab('nomina_851B')
            break;
        case 5: msj_B = 'Bloqueo solo FACTURACION'
            con851B_Deshab('fact_851B')
            break;
        case 6: msj_B = 'BLOQUEO FACTURACION Y NOMINA'
            con851B_Deshab('fact_851B')
            con851B_Deshab('nomina_851B')
            break;
        case 7: msj_B = 'BLOQUEO FACTURACION E INVENT'
            con851B_Deshab('invent_851B')
            con851B_Deshab('fact_851B')
            break;
        case 8: msj_B = 'BLOQUEO FACT, INVENT, NOMINA'
            con851B_Deshab('invent_851B')
            con851B_Deshab('fact_851B')
            con851B_Deshab('nomina_851B')
            break;
        default: msj_B = 'Mes de trabajo No bloqueado'
            break;
    }

    var msj = 'Error ' + code + ' ' + msj_B

    jAlert(
        { titulo: msj, mensaje: form },
        func
    );
}

function con851B_Deshab(id) {
    setTimeout(function () {
        $('#' + id).css('background-color', '#cc0000');
    }, 300);

    //$(id).css("background-color", "#ca3c3c !important");
}

function _eliminarJson(arrayFiles, func) {
    $.ajax({
        type: "POST",
        data: { files: arrayFiles },
        async: false,
        url: get_url("app/inc/eliminarJson.php")
    }).done(function (msg) {
        func(msg);
    });
}

$(document).on('click', '.menuToggle', _toggleNav);

function _toggleNav() {
    var nav = $('.navbar-collapse');
    var visible = nav.is(':visible');
    var widthScreen = $(document).width();

    if (widthScreen > 992) {
        if (visible) {
            if (widthScreen > 992) {
                nav.hide('slide', function () {
                    $(this).attr('style', 'display:none!important;');
                });

                $('.page-fixed-main-content').animate({
                    'margin-left': '0'
                });
            } else {
                nav.slideToggle('slow', function () {
                    $(this).attr('style', 'display:none!important;');
                });
            }

            _cargarEventos('off');
        } else {
            let active = $('#navegacion').find('li.opcion-menu.active');
            if (active) active.removeClass('active');
            if ($('.page-breadcrumb')[1]) $('.page-breadcrumb')[1].remove();

            if (widthScreen > 992) {
                nav.show('slide', function () {
                    $(this).removeAttr('style');
                });

                $('.page-fixed-main-content').animate({
                    'margin-left': '280px'
                });
            } else {
                nav.slideToggle('slow', function () {
                    $(this).attr('style', 'display:block!important;');
                });
            }
            _cargarEventos('on');
            var modulo = localStorage.Modulo;
            if (modulo != "HIC")
                $("#body_main").html(
                    '<img src="../../src/imagenes/PENSADOR SUELTO-lite.png" style="width: 400px;">'
                );

        }
        $("html, body").animate({ scrollTop: 0 }, "slow");
    }
}

function _EventocrearSegventana(data, callbackfunction, cancelfunction) {
    if (data[0] == 'on') {
        if (cancelfunction != undefined) {
            var ventanaespera = bootbox.dialog({
                message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i>' + data[1] + '</div>',
                closeButton: false,
                buttons: {
                    aceptar: {
                        label: 'Continue',
                        className: 'btn-primary',
                        callback: function () {
                            callbackfunction();
                        }
                    },
                    cancelar: {
                        label: 'Cancelar',
                        className: 'btn-danger',
                        callback: function () {
                            cancelfunction();
                        }
                    }
                }
            });
            ventanaespera.init($('.modal-footer').hide());
        } else {
            var ventanaespera = bootbox.dialog({
                message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i>' + data[1] + '</div>',
                closeButton: false,
                buttons: {
                    aceptar: {
                        label: 'Continue',
                        className: 'btn-success',
                        callback: function () {
                            console.debug('callbackfunction');
                            callbackfunction();
                        }
                    }
                }
            });
            ventanaespera.init($('.modal-footer').hide());
        }
    } else if (data[0] == 'off') {
        $('.btn-success').click();
    } else if (data[0] == 'cancelar') {
        $('.btn-danger').click();
    }
}

require('electron').ipcRenderer.on('closed2', (event, message) => {
    console.debug(event, message);
    _EventocrearSegventana(['off']);
});
function nombreOpcion(nombre) {
    $('.page-content-fixed-header').append('<ul class="page-breadcrumb">' +
        '<li>' +
        '<span id="nombreOpcion">' + nombre + '</span>' +
        '</li>' +
        '</ul>')
}
function _cerrarSegundaVentana() {
    let { ipcRenderer } = require('electron');
    let vector = ['salir', 'ejemplo'];
    ipcRenderer.send('ventana2', { param: vector });
}

//---------------------------------------------------------------------------//
function _organizarTabla(data) {
    var table, rows, switching, i, x, y, shouldSwitch
    table = document.getElementById(data)
    switching = true
    while (switching) {
        switching = false
        rows = table.rows
        for (i = 0; i < (rows.length - 1); i++) {
            shouldSwitch = false
            x = rows[i].getElementsByTagName("TD")[0]
            y = rows[i + 1].getElementsByTagName("TD")[0]
            if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
                shouldSwitch = true
                break
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i])
            switching = true
        }
    }
}

// Uso:
// "STRING DE PRUEBA".strToTable('test')
// Salida:
// {
//   test_001: 'STRING DE PRUEBA'
// }
String.prototype.strToTable = function (obj_name) {
    let data = this.toString()
    let name = obj_name || 'fila'
    let array = data.match(/.{1,90}/g) || [];
    let obj = {}
    array.forEach((el, index) => {
        if (el.trim()) {
            let idx = (index + 1).toString().padStart(3, '0')
            obj[`${name}_${idx}`] = el.trim()
        }
    })

    return obj
};

// "STRING DE PRUEBA".replaceEsp()
// Reemplazo carácteres especiales
String.prototype.replaceEsp = function () {
    return this.toString().replace(/[\!\*\]\[\}\{\"\'\&\t]/g, "")
};

// "STRING DE PRUEBA".enterReplace()
// Reemplazo salto de línea/enter por caracter &
String.prototype.enterReplace = function () {
    return this.toString().replace(/(\r\n|\n|\r)/gm, "&");
};

// "STRING DE PRUEBA".enterPut()
// Reemplazo caracter & por salto de línea
String.prototype.enterPut = function () {
    return this.toString().replace(/(?:\&)/g, "\n");
};


const scrollProsoft = (element, behavior, block) => {
    setTimeout(() => {
        document.getElementById(element).scrollIntoView({
            behavior,
            block,
        });
    }, 100);
};


function rango_fecha_meses(fecha_ini, fecha_fin) {
    let fecha_ini_format = moment(fecha_ini);
    let fecha_fin_format = moment(fecha_fin);
    let fecha_ini_obj = fecha_ini_format.toDate()
    let fecha_fin_obj = fecha_fin_format.toDate()

    let diferencia = monthDiff(fecha_ini_obj, fecha_fin_obj)
    let rango_fechas = []
    for (let i = 0; i < diferencia; i++) {
        let actual = i == 0 ? fecha_ini_format.clone().add(i, 'M') : fecha_ini_format.clone().add(i, 'M').startOf('month')
        let final = i == diferencia - 1 ? fecha_fin_format.clone() : actual.clone().endOf('month')
        let label = actual.format('MMMM/YYYY')

        rango_fechas.push({ ini: actual.format('YYYYMMDD'), fin: final.format('YYYYMMDD'), label })
    }

    return rango_fechas
}

function monthDiff(date1, date2) {
    var months;
    months = (date2.getFullYear() - date1.getFullYear()) * 12;
    months -= date1.getMonth();
    months += date2.getMonth();
    return months <= 0 ? 1 : months + 1;
}

function set_script(ruta) {
    let url = 'http://localhost/sc-test-2022' + ruta
    var element = document.createElement("script");
    element.type = "text/javascript";
    element.src = url;

    $("head").append(element);
}


(() => {
    moment.locale('es')
    _cargarScripts();
    $('#cerrar_menu_user').click(_cerrarSesion);
})()