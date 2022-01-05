(function ($) {
    $.ventanaMain = {
        id: null,
        descripcion: null,
        href: null,
        js: null,
        seg_w: [],
        opc_segu: null,
        tipo: null,
        params: [],
        lote: [],
        callback: null,
        datosRm: {
            params: []
        },

        _init: function () {
            switch ($.ventanaMain.tipo) {
                case 'HTML':
                    $.ventanaMain._ventana_html();
                    break;
                case 'JS':
                    $.ventanaMain._loadScript();
                    break;
                case 'F01':
                case 'POWER':
                    $.ventanaMain._ventana_power();
                    break;
                case 'RM':
                    $.ventanaMain._ventana_rm()
                    break;
            }
        },
        _ventana_rm: function () {
            var script_bat = _infoRm_bat($.ventanaMain)
            console.log(script_bat)
            // if (script_bat) {
            fs.writeFile(
                script_bat.nombre_bat,
                script_bat.batch,
                (err) => {
                    if (err) console.error('Error escribiendo bat: \n\n' + err);
                    else {
                        jAlert({
                            mensaje: `<div style="text-align: center;">`
                                + `Debe cerrar el siguiente programa: <br>`
                                + `<b>${$.ventanaMain.id.substring(1, $.ventanaMain.id.length).split('').join('-')} - ${$.ventanaMain.descripcion}</b>`
                                + `</div>`,
                            titulo: 'Esperando RM',
                            autoclose: false,
                            btnCancel: false,
                            footer: false
                        }, function () { });

                        exe(script_bat.nombre_bat, function (err, data) {
                            if (err) console.error('Error ejecutando bat: \n\n' + err), $.ventanaMain._activarEvent();
                            else {
                                fs.unlink(script_bat.nombre_bat, function (err) {
                                    if (err) console.error('Error eliminando bat: \n\n' + err), $.ventanaMain._activarEvent();
                                    else {
                                        jAlert_close();
                                        if ($.ventanaMain.callback) {
                                            $.ventanaMain.callback();
                                        } else {
                                            _cargarEventos('on');
                                        }
                                    }
                                });
                            }
                        });
                    }
                }
            )
        },
        _ventana_html: function () {
            // YeissonO. -> validacion de personal que atiende para historias clinicas
            if (localStorage.Modulo == 'HIC') {
                let active = $('#navegacion').find('li.opcion-menu.active');
                var opcionIngresada = active[0] == undefined ? '' : active[0].attributes[2].nodeValue

                if (opcionIngresada != '073' && opcionIngresada != '074') {
                    _validarOpcionMainHc($.ventanaMain, () => {
                        $("#body_main").load($.ventanaMain.href, function () {

                            var nav = $(".navbar-collapse");
                            if (nav.is(":visible")) _toggleNav();
                        });
                        $(`li[data-id='${$.ventanaMain.id}']`).addClass("active");
                    },
                        () => {
                            _cargarEventos("on");
                        });
                } else {
                    $("#body_main").load($.ventanaMain.href, function () {

                        var nav = $(".navbar-collapse");
                        if (nav.is(":visible")) _toggleNav();
                    });
                    $(`li[data-id='${$.ventanaMain.id}']`).addClass("active");
                }
            } else {
                $('#body_main').load($.ventanaMain.href, function () {
                    var nav = $('.navbar-collapse');
                    if (nav.is(':visible')) {
                        _toggleNav()
                    }
                })
                $(`li[data-id='${$.ventanaMain.id}']`).addClass('active');
            }
        },
        _loadScript: function () {
            let elemento = document.createElement("script");
            elemento.src = $.ventanaMain.js;
            document.querySelector("head").appendChild(elemento);
            $(`li[data-id='${$.ventanaMain.id}']`).addClass('active');
        },
        _ventana_power: function () {
            let script_bat = _validarScript_bat($.ventanaMain);
            if (script_bat) {
                fs.writeFile(script_bat.nombre_bat, script_bat.batch, function (err) {
                    if (err) console.error('Error escribiendo bat: \n\n' + err);
                    else {
                        jAlert({
                            mensaje: `<div style="text-align: center;">`
                                + `Debe cerrar el siguiente programa: <br>`
                                + `<b>${$.ventanaMain.id.substring(1, $.ventanaMain.id.length).split('').join('-')} - ${$.ventanaMain.descripcion}</b>`
                                + `</div>`,
                            titulo: 'Esperando power',
                            autoclose: false,
                            btnCancel: false,
                            footer: false
                        }, function () { });

                        exe(script_bat.nombre_bat, function (err, data) {
                            if (err) console.error('Error ejecutando bat: \n\n' + err), $.ventanaMain._activarEvent();
                            else {
                                fs.unlink(script_bat.nombre_bat, function (err) {
                                    if (err) console.error('Error eliminando bat: \n\n' + err), $.ventanaMain._activarEvent();
                                    else {
                                        jAlert_close();
                                        if ($.ventanaMain.callback) {
                                            $.ventanaMain.callback();
                                        } else {
                                            _cargarEventos('on');
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
            }
        },
        _activarEvent: function () {
            jAlert_close();
            if ($.ventanaMain.callback) {
                $.ventanaMain.callback();
            } else {
                _cargarEventos("on");
            }
        }
    }

    _validarVentanaMain = function (params, callback) {
        $.ventanaMain.id = params.Id;
        $.ventanaMain.descripcion = params.Descripcion;
        $.ventanaMain.href = 'http://localhost/sc-test-2022/src' + params.Href;
        $.ventanaMain.js = params.JS;
        $.ventanaMain.seg_w = params['Seg-w'];
        $.ventanaMain.opc_segu = params['Opc-segu'];
        $.ventanaMain.tipo = params.Tipo;
        $.ventanaMain.params = params.Params;
        $.ventanaMain.lote = params.lote;
        $.ventanaMain.callback = callback ? callback : false;

        if (localStorage.Modulo != "RX") {
          _cargarEventos("off");
          _validarSegu(params,
            () => {
              $.ventanaMain._init();
            },
            (err) => {
              _cargarEventos("on");
              console.log(err);
            }
          );
        } else {
          $.ventanaMain._init();
        }
    }
}(jQuery));