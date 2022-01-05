const path = require('path'),
    fs = require('fs'),
    exe = require('child_process').execFile
isDev = require('electron-is-dev');

const meses = [
    { value: 13, text: 'Control' },
    { value: 1, text: 'Ene' },
    { value: 2, text: 'Feb' },
    { value: 3, text: 'Mar' },
    { value: 4, text: 'Abr' },
    { value: 5, text: 'May' },
    { value: 6, text: 'Jun' },
    { value: 7, text: 'Jul' },
    { value: 8, text: 'Agt' },
    { value: 9, text: 'Sep' },
    { value: 10, text: 'Oct' },
    { value: 11, text: 'Nov' },
    { value: 12, text: 'Dic' },
    { value: 14, text: 'Cie' },
]

const { ipcRenderer } = require('electron');
var $_IP_DATOS = false, $_CONTAB = false, $_NOMINA = false, $_MODULO = false, $_ACTIVOS = [], $_MODULE = '';

ipcRenderer.on('ping', (e, m) => {
    localStorage.clear()
    $_MODULE = m.param
    if (localStorage.Modulo == 'SELECCIONE') jAlert({ titulo: "Error: ", mensaje: "Verique que el modulo se encuentre activo" })
    if (isDev) {
        _consultaJSON()
    } else {
        if ($_MODULE == 'Eds') $_MODULE = 'BOM';
        localStorage.Modulo = $_MODULE.substring(0, 3).toUpperCase().replace('-', ' ')
        _consultaJSON()
    }
});

function _consultaJSON() {
    fs.stat('C:/PROSOFT/config.JSON', (err, stats) => {
        if (err) {
            _ventanaIp()
        } else {
            SolicitarDatos({}, data => {
                data = JSON.parse(data);
                if (!data.CONFIGURACION[0].IP && !data.CONFIGURACION[0].MODULO || !data.CONFIGURACION[0].IP && data.CONFIGURACION[0].MODULO || data.CONFIGURACION[0].IP && !data.CONFIGURACION[0].MODULO) {
                    // jAlert({ titulo: 'Alerta', mensaje: 'No se ha ingresado una IP y un módulo', footer: false });
                    _ventanaIp();
                } else {
                    localStorage['IP_DATOS'] = data.CONFIGURACION[0].IP
                    if (isDev) {
                        localStorage['Modulo'] = data.CONFIGURACION[0].MODULO.trim()
                    }
                    var modulo = localStorage.getItem('Modulo')
                    if (modulo.trim() == 'RX' || modulo.trim() == 'SAL' || modulo.trim() == 'LAB') $('.header').append(` - ${modulo}`)
                    let {app} = require('electron').remote;
                    $('.footer').append(`- Versión ${app.getVersion()}`)
                    $('.imagen-cover').attr('style', `background: url(../imagenes/cover-${modulo.toLowerCase()}.webp)`)

                    inicio();
                }
            }, 'C:/PROSOFT/config.JSON')
        }
    })
}

function inicio() {
    $_IP_DATOS = localStorage.IP_DATOS;
    _render_meses_ingreso()
    _cargarDatos();
    _faseValidarUsuario();
    $('#validarForm').click(function () {
        $.validar._fin();
    });

    const html = document.querySelector('html');
    html.addEventListener('keyup', _validarCode);
}

function _render_meses_ingreso() {
    let parent = document.getElementById('mesIngreso')
    let validacion = (mes) => {
        let modulo = localStorage.Modulo

        // Validación TAXMETA
        if (modulo == 'TAX') {
            let fecha_obj = new Date()
            let mes_actual = fecha_obj.getMonth() + 1
            let mes_anterior = mes_actual - 1 == 0 ? 12 : mes_actual - 1
            let dia_actual = fecha_obj.getDate()

            if (mes_actual == mes) return true
            else if (dia_actual < 11 && mes_anterior == mes) return true
            return false
        }
        // ...

        return true
    }

    meses.forEach(el => {
        let value = el.value
        let html_el = document.createElement('option')
        html_el.value = value.toString().padStart(2, '0')
        html_el.innerHTML = el.text

        if (validacion(value)) parent.appendChild(html_el)
    })
}

function _validarCode(code) {
    if (code.which == 116) {
        terminarEvento()
        _ventanaOpcActualizacion();
    } else if (code.which == 112) {
        terminarEvento();
        _ventanaIp()
    }
}

function _faseValidarUsuario() {
    $('.mid form .content-grid').addClass('hidden');
    validarInputs({
        form: "#fase_usuario",
        orden: "1"
    },
        _faseValidarUsuario,
        function () {
            if ($('#usuario').val().length < 1) alerta('Ingrese un usuario', _faseValidarUsuario)
            else {
                _faseValidarClave();
                if ($('#usuario').val() != '99') validarInicioModulo();
            };
        }
    );
}

function validarInicioModulo() {
    var modulo = localStorage['Modulo'];
    $('.mid form .content-grid').removeClass('hidden');
    if (modulo == 'NOM' || modulo == 'DOM' || modulo == 'PRD' || modulo == 'PRS' || modulo == 'SEP' || modulo == 'MIG' || modulo == 'RX' || modulo == 'LAB' || modulo == 'BAR') {
        if (modulo == 'NOM') $('#mesIngreso').attr('hidden', true), $('#select-nomina').removeAttr('hidden');
        // if (modulo == 'PRD' || modulo == 'MIG' || modulo == 'BAR') $('.mid form .content-grid').addClass('hidden');
        if (modulo == 'PRD' || modulo == 'MIG') $('.mid form .content-grid').addClass('hidden');
        if (modulo == 'PRS' || modulo == 'SEP' || modulo == 'DOM') $('#mesIngreso').attr('hidden', true);
    }
    var mes = moment().format('MM');
    if (modulo == 'HIC') {
        $('#mesIngreso').val('13');
    } else {
        $('#mesIngreso').val(mes);
    }
}

function _faseValidarClave(data) {
    validarInputs({
        form: "#fase_clave",
        orden: "1"
    },
        function () {
            _faseValidarUsuario();
        },
        function () {
            verificarLogin();
        }
    );
}

$(document).on('click', '.btn-edit', function () {
    var select = $('#select-contabilidad');
    var input = $('#inpt-contabilidad');

    let state = select.is(':visible');
    if (state) {
        select.addClass('hidden');
        input.removeClass('hidden').val('').focus();
    } else {
        select.removeClass('hidden');
        input.addClass('hidden');
    }
});

function _cargarDatos() {
    var datos = { datosh: "GEBC|" }
    postData(datos, get_url("app/INDEX/SC-USUNET.DLL"))
        .then(data => {
            localStorage.Unidad = data.Usunet[0]['UNID-PROG'].toString().toUpperCase();
            $_CONTAB = data.Usunet[0].CONTAB;
            $_CONTAB.pop();

            $_NOMINA = data.Usunet[0].NOMINA;
            $_NOMINA.pop();

            $_MODULO = data.MODULOS;
            $_MODULO.pop();

            _cargarContabilidad();
            _cargarNomina();
            var nit = data.Usunet[0].NITUSU.slice(2),
                url = path.join(`P:\\PROG\\LOGOS\\${nit}.bmp`);
            fs.readFile(url, function (err, data) {
                if (err) throw err;
                var dataImg = Buffer.from(data).toString('base64');
                $('<img/>').attr('src', `data:image/jpeg;base64,${dataImg}`).appendTo('#logo')
            });
        })
        .catch(err => {
            jAlert({ titulo: "Error: 99", mensaje: "Ha ocurrido un error cargando los datos USUNET " });
        })
}

function _cargarContabilidad() {
    $('#select-contabilidad').html('');
    for (var i in $_CONTAB) {
        let objContab = $('<option/>',
            {
                text: $_CONTAB[i].DIR.trim(),
                value: $_CONTAB[i].DIR.trim()
            }
        );
        $('#select-contabilidad').append(objContab);
    }
}

function _cargarNomina() {
    for (var i in $_NOMINA) {
        let objNomina = $('<option/>',
            {
                text: $_NOMINA[i].NOM.trim(),
                value: $_NOMINA[i].NOM.trim()
            }
        );
        $('#select-nomina').append(objNomina);
    }
}

function verificarLogin() {
    var admin = $('#usuario').val().trim().toUpperCase(),
        clave = $('#clave').val().trim(),
        mes = $('#mesIngreso').val(),
        nomina = $('#select-nomina').val(),
        datos_envio = '';

    if (!admin) {
        alerta('Ingrese un usuario', _faseValidarUsuario);
    } else if (admin != '99') {
        if ($('#select-contabilidad').is(':visible') && !$('#select-contabilidad').val()) {
            alerta('Seleccione una contabilidad', _faseValidarClave);
        } else if ($('#inpt-contabilidad').is(':visible') && !$('#inpt-contabilidad').val()) {
            alerta('Ingrese una contabilidad', _faseValidarClave);
        } else if ($('#select-nomina').is(':visible') && !$('#select-nomina').val()) {
            alerta('Seleccione una nomina', _faseValidarClave);
        } else {
            if (clave == '') clave = SpacesIzq(clave, 8);
            datos_envio = admin + '|' + clave + '|' + localStorage['Modulo'] + "|"
            validarDataLoguin(datos_envio);
        }
    } else {
        if (clave.length < 1)
            alert('Debe ingresar un clave', _faseValidarClave)
        else
            admin = CerosIzq(admin, 4)
        datos_envio = admin + '|' + clave + '|'
        validarDataLoguin(datos_envio);
        ;
    }
}

function validarDataLoguin(datos) {
    postData({ datosh: datos }, get_url("app/INDEX/INDEX.dll"))
        .then(recibirLogin)
        .catch((err) => {
            console.error(err)
            _faseValidarClave()
        })
}

function recibirLogin(data) {
    var datos = data.Usunet[0];
    if (datos.EST == "01") {
        var modulo = localStorage['Modulo'];
        var clave = $('#clave').val().trim(),
            mes = $('#mesIngreso').val(),
            contab = $('#select-contabilidad').is(':visible') ? $('#select-contabilidad').val() : ($('#inpt-contabilidad').is(':visible') ? $('#inpt-contabilidad').val().trim().toUpperCase() : false),
            nomina = $('#select-nomina').val() || '',
            consulta = consultarModulo(modulo);

        console.log(consulta)

        if (consulta) {
            if (consulta.array.ACT == 'S') {
                localStorage.Clave = clave;
                localStorage.Usuario = datos.OPER.trim()
                localStorage.IDUSU = datos.IDUSU.trim()
                localStorage.Nombre = datos.NOMUSU.trim();
                localStorage.Sesion = datos.SESSIOUSU.trim();
                localStorage.Vendedor = datos.VENDEDOR.trim();
                localStorage.IdUsunet = datos.NITUSUNET.trim();
                localStorage.Contab = contab;
                localStorage.Nomina = nomina;
                localStorage.Mes = mes;

                if (modulo == "DOM") {
                  localStorage.Contab = "";
                  localStorage.Carpeta_modulo = contab;
                }

                let option = 'C'
                if (localStorage.Modulo.trim() == 'HIC'){
                    option = 'ISH'
                }

                let url_dll = localStorage.Unidad == 'S' ? get_url("APP/RM/CONTAB/CON904.DLL") : get_url("APP/CONTAB/CON904.DLL")

                postData({ datosh: `|${$('#select-contabilidad').val()}||${localStorage.Usuario.trim()}|${option}|` },
                url_dll)
                .then(data => {
                    url = path.join(`${__dirname}`, `../../frameworks/paginas/menu_user.html`);
                    window.location.href = url;
                })
                .catch(err => {
                    console.error(err);
                    _faseValidarClave()
                });

            } else {
                alert('Modulo no se encuentra habilitado', _faseValidarClave);
            }
        } else {
            alert('No se encontro modulo', _faseValidarClave);
        }
    } else {
        let url = path.join(__dirname, '../../frameworks/paginas/menu_config.html');
        window.location.href = url;
    }
}

var alerta = function (mensaje, func) {
    jAlert({ titulo: 'Alerta', mensaje: mensaje }, func);
}

function CerosIzq(obj, tam) {
    while (obj.length < tam) {
        obj = '0' + obj;
    }
    return obj;
}

function SpacesIzq(obj, tam) {
    while (obj.length < tam) {
        obj = ' ' + obj;
    }
    return obj;
}

function get_url(dll) {
    return "http://" + $_IP_DATOS + "/MAIN-ELECT/" + dll;
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

function _ventanaIp() {
    for (var i in $_MODULO) {
        if ($_MODULO[i].ACT == 'S') {
            $_ACTIVOS.push($_MODULO[i].COD);
        }
    }
    $('#pantalladecarga').removeClass('hidden');
    if ($('.ventanaheader p').text().length < 1) {
        $('.ventanaheader p').append('Dirección IP y Módulo');
        let html = '<div style="width: 100%; display: flex"> ' +
            '<div id="VALIDAR1_VENTANA" style="width: 50%; align-items: center; display:flex"> ' +
            '<label style="width: 30%;">IP: </label>' +
            '<input id="ipaccesopros" type="text" class="form-control input-md" data-orden="1" style="width: 60%;"> ' +
            '</div> ' +
            '<div style="width: 50%;" id="modulo_electron" class="hidden">' +
            '<div style="width: 100%; display:flex; align-items: center;">' +
            '<label style="width: 30%;">Módulo: </label>' +
            '<div style="width: 70%;">' +
            '<select id="modulepros" class="form-control col-md-12">' +
            '<option value="0" selected disabled>Seleccione</option>' +
            '</select>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        $('.ventanabody').append(html);
        if (isDev) $('#modulo_electron').removeClass('hidden')
        for (var i in $_ACTIVOS) {
            i = i++;
            $('#modulepros').append('<option value="' + i + '">' + $_ACTIVOS[i] + '</option>');
        }
        if (localStorage['Modulo']) {
            for (var i in $_ACTIVOS) {
                var ModuloActual = localStorage['Modulo'];
                console.log($_ACTIVOS[i], ModuloActual, ModuloActual.length, $_ACTIVOS[i].length);
                if ($_ACTIVOS[i].trim().toUpperCase() == ModuloActual.trim()) {
                    $('#modulepros').val(i);
                }
            }
        }
        if (localStorage['IP_DATOS']) $('#ipaccesopros').val(localStorage['IP_DATOS'].trim());
        $('.ventanafoot #ventanabutton_callback').text('Guardar');
        $('.ventanafoot #ventanabutton_cancel').text('Cancelar');
        $('.ventanafoot #ventanabutton_callback').attr('onclick', '_GuardarIp()');
        $('.ventanafoot #ventanabutton_cancel').attr('onclick', '_cancelarIp()');
    }
}

function _cancelarIp() {
    $('#pantalladecarga').addClass('hidden');
    _faseValidarUsuario();
}

function _GuardarIp() {
    localStorage['IP_DATOS'] = $('#ipaccesopros').val().trim();
    if (isDev) {
        localStorage['Modulo'] = $('#modulepros option:selected').text().toUpperCase();
    } else {
        for (var i in $_ACTIVOS) {
            if ($_ACTIVOS[i].trim().toUpperCase() == $_MODULE.trim()) {
                localStorage['Modulo'] = $_MODULE;
            }
        }
    }
    let data = {
        CONFIGURACION: [{
            IP: localStorage.getItem('IP_DATOS').trim(),
            MODULO: localStorage.getItem('Modulo')
        }]
    }
    data = JSON.stringify(data);
    fs.writeFile(
        'C:\\PROSOFT\\config.JSON',
        data,
        error => {
            if (error) console.error(error);
        }
    )
    $('.ventanabody').html('');
    $('.ventanaheader p').html('')
    $('#pantalladecarga').addClass('hidden');
    setTimeout(() => { window.location.reload(true); }, 100);

}

ipcRenderer.on("update_available", () => {
    console.log('update_available');
    _ventanaActualizacion();
});

ipcRenderer.on("message", (event, text) => {
    $('.progress').css('width', text);
    $('.progress').removeClass('hidden');
    $('.titulo-progreso').text(text.substring(0, 4) + ' %');
});

ipcRenderer.on("update_downloaded", () => {
    ipcRenderer.removeAllListeners("update_downloaded");
    _ventanadeInstalacion();
});

ipcRenderer.on("error_downloaded", data => {
    console.error(data);
});

function restartApp() {
    ipcRenderer.send("restart_app");
}
function actualizarApp() {
    ipcRenderer.send("update_app");
}

function _ventanaActualizacion() {
    if ($('#pantalladecarga')[0].className != '') {
        $('#pantalladecarga').removeClass('hidden');
        $('.ventanaheader p').append('Desea descargar la nueva Actualización');
        $('.ventanabody').addClass('hidden');
        $('.ventanafoot').css('display', 'grid');
        $('.ventanafoot #ventanabutton_callback').append('SI');
        $('.ventanafoot #ventanabutton_cancel').append('NO');
        $('.ventanafoot #ventanabutton_callback').attr('onclick', '_ventanaActualizacionenProgreso()');
        $('.ventanafoot #ventanabutton_cancel').attr('onclick', '_cerrarVentanaActializacion()');
        $(document).on('keydown', e => {
            switch (e.which) {
                case 13:
                    $('#ventanabutton_callback').click();
                    $(document).off('keydown');
                    break;
                case 27:
                    $('#ventanabutton_cancel').click();
                    $(document).off('keydown');
                    break;
            }
        });
    } else {
        ipcRenderer.removeAllListeners("update_available");
    }
}

function _ventanaActualizacionenProgreso() {
    actualizarApp();
    $('.ventanaheader p').html('');
    $('.ventanaheader p').append('Descargando actualización....');
    $('.titulo-progreso').text('Espere mientras se valida información');
    $('.ventanabody').removeClass('hidden')
    $('.ventanafoot').css('display', 'none');
    $('.ventanafoot #ventanabutton_callback').attr('onclick', '');
    $('.ventanafoot #ventanabutton_cancel').attr('onclick', '');
    $('.ventanafoot #ventanabutton_callback').html('');
    $('.ventanafoot #ventanabutton_cancel').html('');
}

function _ventanadeInstalacion() {
    $('.ventanaheader p').html('');
    $('.ventanaheader p').append('Desea instalar la nueva versión');
    $('.ventanabody').addClass('hidden');
    $('.ventanafoot').css('display', 'grid');
    $('.ventanafoot #ventanabutton_callback').append('SI');
    $('.ventanafoot #ventanabutton_cancel').append('NO');
    $('.ventanafoot #ventanabutton_callback').attr('onclick', 'restartApp()');
    $('.ventanafoot #ventanabutton_cancel').attr('onclick', '_cerrarVentanaActializacion()');
    $('#pantalladecarga').removeClass('hidden');
    $(document).on('keydown', e => {
        switch (e.which) {
            case 13:
                $('#ventanabutton_callback').click();
                $(document).off('keydown');
                break;
            case 27:
                $('#ventanabutton_cancel').click();
                $(document).off('keydown');
                break;
        }
    });
}

function _cerrarVentanaActializacion() {
    $('.ventanabody').html(''); $('.ventanaheader p').html('');
    $('.ventanabody').removeClass('hidden')
    $('.ventanafoot').css('display', 'none');
    $('.ventanafoot #ventanabutton_callback').attr('onclick', '');
    $('.ventanafoot #ventanabutton_cancel').attr('onclick', '');
    $('.ventanafoot #ventanabutton_callback').html('');
    $('.ventanafoot #ventanabutton_cancel').html('');
    $('#pantalladecarga').addClass('hidden');
    $('#usuario').focus();
}

function _ventanaOpcActualizacion() {
    var modulos = [
        { "COD": "1", "DESCRIP": "Contabilidad" },
        { "COD": "2", "DESCRIP": "Inventarios" },
        { "COD": "3", "DESCRIP": "Index" },
        { "COD": "4", "DESCRIP": "Páginas" },
        { "COD": "5", "DESCRIP": "Php" },
        { "COD": "6", "DESCRIP": "Estaciones de servicio" },
        { "COD": "7", "DESCRIP": "Transp. Intermunicipal" },
        { "COD": "8", "DESCRIP": "Salud" },
        { "COD": "9", "DESCRIP": "Hiclin" },
        { "COD": "10", "DESCRIP": "Rx" },
        { "COD": "11", "DESCRIP": "Laboratorios" },
        { "COD": "12", "DESCRIP": "Presupuesto" },
        { "COD": "13", "DESCRIP": "Servicios Domiciliarios" },
        { "COD": "14", "DESCRIP": "Correspondencia" },
    ]

    POPUP({
        array: modulos,
        titulo: 'Actualizaciones prosoft',
        indices: [
            { id: 'COD', label: 'DESCRIP' }
        ],
        seleccion: "CON",
        callback_f: _faseValidarUsuario
    },
        _validarOpcionActualizar
    );
}

function _validarOpcionActualizar(data) {
    var descarga = '';
    switch (data.COD) {
        case '1': descarga = 'SC-CONTAB-ELECTRON'; break;
        case '2': descarga = 'SC-INVENT-ELECTRON'; break;
        case '3': descarga = 'SC-INDEX-ELECTRON'; break;
        case '4': descarga = 'SC-PAGINAS-ELECTRON'; break;
        case '5': descarga = 'SC-INC-ELECTRON'; break;
        case '6': descarga = 'SC-BOMBAS-ELECTRON'; break;
        case '7': descarga = 'SC-TRANSP-ELECTRON'; break;
        case '8': descarga = 'SC-SALUD-ELECTRON'; break;
        case '9': descarga = 'SC-HICLIN-ELECTRON'; break;
        case '10': descarga = 'SC-RX-ELECTRON'; break;
        case '11': descarga = 'SC-LABOR-ELECTRON'; break;
        case '12': descarga = 'SC-PRESUP-ELECTRON'; break;
        case '13': descarga = 'SC-SERVDOM-ELECTRON'; break;
        case '14': descarga = 'SC-COR-ELECTRON'; break;
    }
    var nombre_bat = "C:\\PROSOFT\\TEMP\\" + descarga + ".BAT";
    var data_bat = `START http://www.sc-prosoft.com/descargas/${descarga}.exe`;
    fs.writeFile(nombre_bat, data_bat, function (err) {
        if (err) console.error('Error escribiendo bat: \n\n' + err);
        else {
            exe(nombre_bat, function (err, data) {
                if (err) console.error('Error ejecutando bat: \n\n' + err);
                else {
                    fs.unlink(nombre_bat, function (err) {
                        if (err) console.error('Error eliminando bat: \n\n' + err);
                        else {
                            _faseValidarUsuario();
                        }
                    });
                }
            })
        }
    })
}

function terminarEvento() {
    var form = $.validar.form;
    var anteriorItm = $(form + ' [data-orden="' + '1' + '"');
    anteriorItm.attr('disabled', 'true');
    $.validar._keyEvent($.validar.form, 'off');
}