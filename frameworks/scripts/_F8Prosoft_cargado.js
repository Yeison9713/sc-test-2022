($ => {
    $.F8LITE = {
        overlay_id: 'overlay-f8_lite',
        content_id: 'content-f8_lite',
        css_id: 'css_ventanaDatos_lite',
        tabla_id: 'datoslite',
        id_input: 'input_busquedaF8Lite',
        id_select: 'select_busquedaF8Lite',
        datatable: [],
        titulo: 'Ventana de búsqueda',
        valoresselect: '',
        close: false,
        dll: null,
        columnas: '',
        f8data: '',
        table: null,
        filtro: null,
        ancho_usuario: null,
        ruta: '',

        _init: () => {
            if ($.F8LITE._open()) {
                var thead = $('<thead/>')
                    .append($('<tr/>'));

                $('#' + $.F8LITE.content_id + '_body').append(
                    $('<table/>', {
                        id: $.F8LITE.tabla_id,
                        class: 'display responsive nowrap'
                    })
                        .css({ width: '100%', })
                        .append(thead)
                );

                $('#' + $.F8LITE.id_input).focus();

                if ($.F8LITE.close) $.F8LITE._close();
            }
        },

        _open: () => {
            var wWindow = $(window).width();

            // Crear overlay F8
            $('<div/>', {
                id: $.F8LITE.overlay_id
            })
                .css({
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.2)',
                    position: 'absolute',
                    top: 0,
                    display: 'flex',
                    'z-index': '99999999',
                    'align-items': 'center'

                })
                .appendTo('body');
            // !End overlay F8
            var ancho_tmp = $.F8LITE.ancho_usuario || '95%';
            // Box contenido F8
            $('<div/>', {
                id: $.F8LITE.content_id
            })
                .css({
                    width: wWindow < 426 ? '95%' : ancho_tmp,
                    background: '#FFF',
                    margin: '0 auto',
                    'border-radius': '3px'
                })
                .appendTo('#' + $.F8LITE.overlay_id);
            // !End contenido F8

            // Header 
            $('<div/>', {
                id: $.F8LITE.content_id + '_header'
            })
                .css({
                    width: '100%',
                    padding: '15px 0 15px 20px',
                    background: '#f1f1f1',
                    'text-align': 'center',
                    'border-bottom': '1px solid rgba(0,0,0,0.08)',
                    'box-sizing': 'border-box'
                })
                .html($.F8LITE.titulo)
                .appendTo('#' + $.F8LITE.content_id);


            // Body
            $('<div/>', {
                id: $.F8LITE.content_id + '_body'
            })
                .css({
                    width: '100%',
                    padding: '15px',
                    'overflow-x': 'auto',
                    'box-sizing': 'border-box'
                })
                .appendTo('#' + $.F8LITE.content_id);

            // Responsive            
            $(window).resize(function () {
                if ($(window).width() < 426) {
                    $('#' + $.F8LITE.content_id)
                        .css({ width: '95%' });
                } else {
                    $('#' + $.F8LITE.content_id)
                        .css({ width: ancho_tmp });
                }
            });
            // End responsive

            // Insertar formulario
            $('<select />', {
                id: $.F8LITE.id_select

            })
                .css({
                    width: '40%',
                    background: '#f2fbff',
                    padding: '10px 8px',
                    border: '1px solid #becdda',
                    outline: 'none',
                    'border-radius': '2px 2px 0 0',
                })
                // .attr('disabled', true)
                .appendTo(`#${$.F8LITE.content_id}_body`);

            $('<input />', {
                id: $.F8LITE.id_input
            })
                .css({
                    width: '60%',
                    background: '#f2fbff',
                    padding: '10px 8px',
                    border: '1px solid #becdda',
                    outline: 'none',
                    'border-radius': '2px 2px 0 0',
                })
                // .attr('disabled', true)
                .appendTo(`#${$.F8LITE.content_id}_body`);

            // $.F8LITE.valoresselect.forEach(data => {
            //     $(`#${$.F8LITE.id_select}`).append(new Option(data, data));
            // })

            for (var i in $.F8LITE.valoresselect) {
                $(`#${$.F8LITE.id_select}`).append(new Option($.F8LITE.valoresselect[i], parseInt(i) + 1));
            }

            // Footer
            $(`#${$.F8LITE.content_id}_body`).append(
                '<span> Debe digitar al menos 3 caracteres y un maximo de 10 </span>'
            )

            var objResultados = $('<div />', {
                id: 'labelResultadosLite'
            })
                .css({
                    color: '#666',
                    'font-size': '12px',
                    'display': 'flex',
                    'align-items': 'center'
                })

            var objBtnCerrar = $('<div />')
                .html('<button type="button" class="btn red btn-outline" style="width: 100%" onclick="$.F8LITE._preClose()">Cerrar</button>');

            var objBtnSeleccionar = $('<div />')
                .html('<button type="button" class="btn blue" style="width: 100%" onclick="$.F8LITE._sendData()">Buscar</button>');

            $('<div/>', {
                id: $.F8LITE.content_id + '_foot'
            })
                .css({
                    width: '100%',
                    padding: '15px',
                    background: '#f1f1f1',
                    'box-sizing': 'border-box',
                    'border-radius': '0 0 2px 2px',
                    'display': 'grid',
                    'grid-template-columns': '2fr .5fr .5fr',
                    'grid-gap': '5px'
                })
                .html(objResultados)
                .append(objBtnSeleccionar)
                .append(objBtnCerrar)
                .appendTo('#' + $.F8LITE.content_id);

            // $('<div/>', {
            //     id: $.F8LITE.content_id + '_footer'
            // })
            //     .css({
            //         width: '100%',
            //         padding: '15px 0 15px 20px',
            //         'text-align': 'center',
            //         'border-bottom': '1px solid rgba(0,0,0,0.08)',
            //         'box-sizing': 'border-box'
            //     })
            //     .appendTo('#' + $.F8LITE.content_id);

            $("<style/>", {
                id: $.F8LITE.css_id
            })
                .prop("type", "text/css")
                .html("\
                        table tbody tr.focus-table td.sorting_1, \
                        table tbody tr.focus-table td{\
                            background-color: #2196F3!important;\
                            color: #FFF;\
                        }")
                .appendTo("head");

            $.F8LITE._initenterinput('on');
            return true;

        },

        _initenterinput: estado => {
            switch (estado) {
                case 'on':
                    $('#' + $.F8LITE.id_input).on('keydown', e => {
                        switch (e.which) {
                            case 13:
                                $('.btn.blue').click();
                                break;
                            case 27:
                                console.log('va a cerrar')
                                $('.btn.red').click();
                                break;
                        }
                    })
                    break;
                case 'off':
                    $('#' + $.F8LITE.id_input).off('key');
                    break;
                default:
                    break;
            }
        },

        _sendData: () => {
            if ($.F8LITE.dll != 'PACIENTES') {
                let DLL = {
                    'NUMERACION': 'APP/SALUD/SER808.DLL',
                    'PACIBASE09': 'APP/SALUD/SER810X.DLL',
                    'TERCEROS': 'APP/CONTAB/CON802_02.DLL',
                    'CUPS': 'APP/SALUD/SER802C-01.DLL'
                }
                let rutaDLL = DLL[$.F8LITE.dll];
                $('#content-f8_lite_body span').remove();
                let URL = get_url(rutaDLL);
                $(`#${$.F8LITE.id_input}`).hide(); $(`#${$.F8LITE.id_select}`).hide();
                $('#content-f8_lite_body').append('<div id="cargando_F8cargarndo" style="display:flex;justify-content:center;"><i class="fa fa-spin fa-spinner fa-3x"></i></div>');
                $.F8LITE.filtro == null ? $.F8LITE.filtro = ' ' : $.F8LITE.filtro
                postData({
                    datosh: datosEnvio() + $(`#${$.F8LITE.id_select}`).val() + '|' + $(`#${$.F8LITE.id_input}`).val().toUpperCase() + '|' + $.F8LITE.filtro + '|' 
                }, URL)
                    .then(data => {
                        console.log(data, 'datanumeracion');
                        $('#cargando_F8cargarndo').remove();
                        $('.btn.blue').addClass('hidden');
                        var array = data[$.F8LITE.f8data];
                        if ($.F8LITE.prefijo) array = array.filter(x => x.COD.substring(0,1) == $.F8LITE.prefijo)
                        if ($.F8LITE.fecha) array = array.filter(x => parseInt(x.FECHA_ING) > parseInt($.F8LITE.fecha))
                        table = [];
                        $.F8LITE.datatable = array;
                        var columnas = $.F8LITE.columnas;
                        array.forEach(index => {
                            var contenido = [];
                            for (var i in columnas) {
                                contenido.push(index[columnas[i].title]);
                            }
                            if (contenido[0].trim() != '') {
                                table.push(contenido);
                            }
                        });
                        $.F8LITE.table = $(`#${$.F8LITE.tabla_id}`).DataTable({
                            data: table,
                            columns: columnas,
                            responsive: true,
                            scrollY: '50vh',
                            scrollCollapse: true,
                            createdRow: function (row, data, index) {
                                $(row)
                                    .css({ cursor: 'pointer' })
                                    .attr('data-index', index);
                            },
                            initComplete: function () {
                                var api = this.api();

                                // Evento click en fila
                                api.$('td').click(function () {
                                    var indx = $(this).hasClass('sorting_1');
                                    if (!indx) {
                                        var parent = $(this).closest('tr');
                                        var item = $(parent).data().index;
                                        $.F8LITE._selected(item);
                                    }
                                })

                                // Reset foco table
                                api.on('page search', function () {
                                    $(".focus-table").removeClass("focus-table");
                                })

                                // Set focus search
                                $('#' + $.F8LITE.tabla_id + '_filter label input').focus();

                                // Init teclas
                                $.F8LITE._initControls(true);
                            },
                            language: {
                                lengthMenu: "Mostrar _MENU_ por página",
                                zeroRecords: "No hay datos disponibles",
                                info: "Página _PAGE_ de _PAGES_",
                                infoEmpty: "No hay datos disponibles",
                                infoFiltered: "(filtrado de  _MAX_ registros)",
                                loadingRecords: "Cargando...",
                                processing: "Procesando...",
                                sSearch: 'Buscar:',
                                paginate: {
                                    first: "Primera",
                                    last: "Final",
                                    next: "Siguiente",
                                    previous: "Anterior"
                                },
                            }
                        })
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            } else {
                if ($(`#${$.F8LITE.id_input}`).val().length > 10) {
                    CON851('', 'Ingresar menos de 10 caracteres', null, 'error', 'Error')
                    $(`#${$.F8LITE.id_input}`).focus();
                } else if ($(`#${$.F8LITE.id_input}`).val().length < 3) {
                    CON851('', 'Ingresar minimo 3 caracteres', null, 'error', 'Error');
                    $(`#${$.F8LITE.id_input}`).focus();
                } else {
                    $('#content-f8_lite_body span').remove();
                    let URL = get_url("APP/SALUD/SER810.DLL");
                    $(`#${$.F8LITE.id_input}`).hide(); $(`#${$.F8LITE.id_select}`).hide();
                    $('#content-f8_lite_body').append('<div id="cargando_F8cargarndo" style="display:flex;justify-content:center;"><i class="fa fa-spin fa-spinner fa-3x"></i></div>');
                    datos_envio = datosEnvio() + $(`#${$.F8LITE.id_select}`).val() + '|' + $(`#${$.F8LITE.id_input}`).val().toUpperCase() + '|';
                    if ($.F8LITE.ruta == 'newcobol') URL = get_url("APP/RX/SER810.DLL");
                    postData({
                        datosh: datos_envio
                    }, URL)
                        .then(data => {
                            console.log(data, 'PACIENTES');
                            $('.btn.blue').addClass('hidden');
                            $('#cargando_F8cargarndo').remove();
                            var array = data[$.F8LITE.f8data];
                            table = [];
                            array.forEach(index => {
                                var edad = calcular_edad(index.NACIMIENTO);
                                index.EDAD = edad.unid_edad + edad.vlr_edad.toString().padStart(3, '0');
                            });
                            $.F8LITE.datatable = array;
                            var columnas = $.F8LITE.columnas;
                            array.forEach(index => {
                                var contenido = [];
                                for (var i in columnas) {
                                    contenido.push(index[columnas[i].title]);
                                }
                                if (contenido[0].trim() != '') {
                                    table.push(contenido);
                                }
                            });
                            $.F8LITE.table = $(`#${$.F8LITE.tabla_id}`).DataTable({
                                data: table,
                                columns: columnas,
                                responsive: true,
                                scrollY: '50vh',
                                scrollCollapse: true,
                                createdRow: function (row, data, index) {
                                    $(row)
                                        .css({ cursor: 'pointer' })
                                        .attr('data-index', index);
                                },
                                initComplete: function () {
                                    var api = this.api();

                                    // Evento click en fila
                                    api.$('td').click(function () {
                                        var indx = $(this).hasClass('sorting_1');
                                        if (!indx) {
                                            var parent = $(this).closest('tr');
                                            var item = $(parent).data().index;
                                            $.F8LITE._selected(item);
                                        }
                                    })

                                    // Reset foco table
                                    api.on('page search', function () {
                                        $(".focus-table").removeClass("focus-table");
                                    })

                                    // Set focus search
                                    $('#' + $.F8LITE.tabla_id + '_filter label input').focus();

                                    // Init teclas
                                    $.F8LITE._initControls(true);
                                },
                                language: {
                                    lengthMenu: "Mostrar _MENU_ por página",
                                    zeroRecords: "No hay datos disponibles",
                                    info: "Página _PAGE_ de _PAGES_",
                                    infoEmpty: "No hay datos disponibles",
                                    infoFiltered: "(filtrado de  _MAX_ registros)",
                                    loadingRecords: "Cargando...",
                                    processing: "Procesando...",
                                    sSearch: 'Buscar:',
                                    paginate: {
                                        first: "Primera",
                                        last: "Final",
                                        next: "Siguiente",
                                        previous: "Anterior"
                                    },
                                }
                            })
                        })
                        .catch((error) => {
                            console.log(error)
                        });
                }
            }
        },

        _selected: data => {
            $.F8LITE._close();
            $.F8LITE.callback($.F8LITE.datatable[data]);
        },

        _initControls: estado => {
            switch (estado) {
                case true:
                    $(document).on('keydown', $.F8LITE._validarKey);
                    break;
                case false:
                    console.log('entro a false')
                    $(document).off('keydown', $.F8LITE._validarKey);
                    break;
            }
        },
        _preClose: () => {
            if ($.F8LITE.cancelcallback) setTimeout(() => { $.F8LITE.cancelcallback($.F8LITE.cancelcallback) }, 200);
            $.F8LITE._close();
        },

        _validarKey: function (e) {
            var key = e.which;
            switch (key) {
                case 34:
                    $('#' + $.F8LITE.tabla_id + '_paginate li.next a').click();
                    break;
                case 33:
                    $('#' + $.F8LITE.tabla_id + '_paginate li.prev a').click();
                    break;
                case 37:
                case 38:
                    $.F8LITE._prev();
                    break;
                case 39:
                case 40:
                    $.F8LITE._next();
                    break;
                case 13:
                    if ($(".focus-table").length > 0) $(".focus-table td:nth-child(2)").click();
                    break;
                case 27:
                    // Esc
                    $.F8LITE._preClose();
                    break;
            }
        },

        _prev: () => {
            elementoActive = $(".focus-table");
            elemento = $("#" + $.F8LITE.tabla_id + " tbody tr:visible");
            if (elementoActive.length === 0) $(elemento[0]).addClass('focus-table');
            else if (elementoActive.prevAll('tr').length != 0) {
                let nextElement = elementoActive.prevAll('tr')[0];
                elementoActive.removeClass('focus-table');
                $(nextElement).addClass('focus-table');
            }
            $(".focus-table").get(0).scrollIntoView(true);
        },

        _next: () => {
            elementoActive = $(".focus-table");
            elemento = $("#" + $.F8LITE.tabla_id + " tbody tr:visible");
            if (elementoActive.length === 0) $(elemento[0]).addClass('focus-table');
            else if (elementoActive.nextAll('tr').length != 0) {
                let nextElement = elementoActive.nextAll('tr')[0];
                elementoActive.removeClass('focus-table');
                $(nextElement).addClass('focus-table');
            }
            $(".focus-table").get(0).scrollIntoView(true);
        },

        _close: () => {
            console.log('cerrar f8')
            $('#' + $.F8LITE.overlay_id).remove();
            $.F8LITE._initenterinput('off');
            if ($(`#${$.F8LITE.tabla_id} tbody`).length > 0) {
                $.F8LITE.table.destroy();
            }
            $.F8LITE._initControls(false);
        },

    }
    F8LITE = params => {
        if (!params.callback) {
            $.F8LITE.close = true;
            console.error('Falta definir callback para retornar los datos');
        } if (!params.cancel) {
            $.F8LITE.close = true;
            console.error('Falta definir cancelcallback para retornar los datos');
        } if (!params.dll) {
            $.F8LITE.close = true;
            console.error('Falta definir el DLL a consultar para retornar los datos');
        }
        $.F8LITE.valoresselect = params.valoresselect || ['Seleccionar'];
        $.F8LITE.f8data = params.f8data || null;
        $.F8LITE.columnas = params.columnas || ['NOMBRE', 'DESCRIPCION'];
        $.F8LITE.callback = params.callback || null;
        $.F8LITE.cancelcallback = params.cancel || null;
        $.F8LITE.dll = params.dll;
        $.F8LITE.consulta = '1';
        $.F8LITE.ruta = params.ruta;
        if (params.consulta) $.F8LITE.consulta = params.consulta
        $.F8LITE.ancho_usuario = params.ancho || null
        $.F8LITE.filtro = params.filtro || null
        $.F8LITE.fecha = params.fecha || null
        $.F8LITE.prefijo = params.prefijo || null
        $.F8LITE._init();
    }
})(jQuery)