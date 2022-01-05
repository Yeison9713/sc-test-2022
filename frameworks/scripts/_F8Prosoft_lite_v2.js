(function ($) {
    $.ventanaDatos_lite_v2 = {
        overlay_id: 'overlay-f8_lite',
        content_id: 'content-f8_lite',
        css_id: 'css_ventanaDatos_lite',
        id_input: 'input_busquedaF8Lite',
        titulo: 'Ventana de búsqueda',
        callback: null,
        callback_esc: false,
        data: false,
        indice: false,
        minLength: 1,
        mascara: false,
        data_callback: false,

        _init: function () {
            if (this._open()) this._initSql()
        },

        _initSql: function () {
            $('.loader-box').hide();

            $(`#${$.ventanaDatos_lite_v2.id_input}`).removeAttr('disabled').focus();

            var indices = $.ventanaDatos_lite_v2.indice;

            this.data.map(data => {
                idx = '';
                indices.forEach(ind => {
                    idx += ` ${data[ind].trim().replace(/\s\s+/g, ' ')} -`;
                })

                data.label = idx.slice(0, -1);

                return data;
            })

            $(`#${$.ventanaDatos_lite_v2.id_input}`).autocomplete({
                source: function (request, response) {
                    var res = $.ui.autocomplete.filter($.ventanaDatos_lite_v2.data, request.term);
                    response(res.slice(0, 100));
                },
                minLength: $.ventanaDatos_lite_v2.minLength,
                select: function (event, ui) {
                    $.ventanaDatos_lite_v2.data_callback = ui.item;
                    $(`#${$.ventanaDatos_lite_v2.content_id}_table tbody`).html('');
                    var mask = $.ventanaDatos_lite_v2.mascara;
                    Object.getOwnPropertyNames(ui.item).forEach(function (val, idx, array) {
                        var objMask = mask.find(o => o[val]),
                            hide = (objMask ? ((objMask[val] == 'hide') ? false : true) : true);

                        if (val != 'label' && val != 'value' && hide) {
                            $(`#${$.ventanaDatos_lite_v2.content_id}_table tbody`).append(`
                                                        <tr>
                                                            <td><b>${ objMask ? objMask[val] : val}</b></td>
                                                            <td>${ui.item[val]}</td>
                                                        </tr>
                                                    `)
                        }

                        $(`#${$.ventanaDatos_lite_v2.content_id}_table`).show();
                    });

                    var objBtnLimpiar = $('<div />')
                        .css({
                            'text-align': 'center',
                            'padding-top': '15px'
                        })
                        .html('<button type="button" class="btn green btn-outline" onclick="$.ventanaDatos_lite_v2._limpiar(this)">Limpiar</button>');

                    $(`#${$.ventanaDatos_lite_v2.content_id}_contentTable`)
                        .append(objBtnLimpiar);

                    $('.btn.blue').click();

                    return false;
                }
            })

            $( "#input_busquedaF8Lite" ).keydown(function(e) {    
                var keyCode = e.keyCode || e.which;
                if(keyCode == 27){
                    $.ventanaDatos_lite_v2._close();
                }
            })
        },

        _limpiar: function (el) {
            $(el)
                .closest('div')
                .remove();

            $(`#${$.ventanaDatos_lite_v2.id_input}`)
                .val('')
                .focus()

            $(`#${$.ventanaDatos_lite_v2.content_id}_table tbody`)
                .html('')
        },

        _sendData: function () {
            var data = $.ventanaDatos_lite_v2.data_callback;
            if (data) {
                $.ventanaDatos_lite_v2.callback(data);
                $.ventanaDatos_lite_v2._close();
            } else console.error('Ningun dato seleccionado');
        },

        _close: function () {
            $(`#${$.ventanaDatos_lite_v2.id_input}`).autocomplete("destroy");
            $('#' + $.ventanaDatos_lite_v2.overlay_id).fadeOut('fast', function () {
                $(this).remove();
                if ($.ventanaDatos_lite_v2.callback_esc) {
                    setTimeout(function () {
                        $.ventanaDatos_lite_v2.callback_esc($.ventanaDatos_lite_v2.callback_esc);
                    }, 200)
                }
            });
        },

        _open: function () {
            var wWindow = $(window).width();

            // Crear overlay F8
            $('<div/>', {
                id: this.overlay_id
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

            // Box contenido F8
            $('<div/>', {
                id: this.content_id
            })
                .css({
                    width: wWindow < 426 ? '95%' : '800px',
                    background: '#FFF',
                    margin: '0 auto',
                    position: 'relative',
                    'border-radius': '3px'
                })
                .appendTo('#' + this.overlay_id);
            // !End contenido F8

            // Header 
            $('<div/>', {
                id: this.content_id + '_header'
            })
                .css({
                    width: '100%',
                    padding: '15px 0 15px 20px',
                    'text-align': 'center',
                    'border-bottom': '1px solid rgba(0,0,0,0.08)',
                    'box-sizing': 'border-box',
                    'font-weight': '500'
                })
                .html($.ventanaDatos_lite_v2.titulo)
                .appendTo('#' + this.content_id);


            // Body
            $('<div/>', {
                id: this.content_id + '_body'
            })
                .css({
                    width: '100%',
                    padding: '15px',
                    'overflow-x': 'auto',
                    'box-sizing': 'border-box',
                })
                .appendTo('#' + this.content_id);

            // Footer
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
                .html('<button type="button" class="btn red btn-outline" style="width: 100%" onclick="$.ventanaDatos_lite_v2._close()">Cerrar</button>');

            var objBtnSeleccionar = $('<div />')
                .html('<button type="button" class="btn blue" style="width: 100%" onclick="$.ventanaDatos_lite_v2._sendData()">Seleccionar</button>');

            $('<div/>', {
                id: this.content_id + '_foot'
            })
                .css({
                    width: '100%',
                    padding: '15px',
                    background: '#f1f1f1',
                    'box-sizing': 'border-box',
                    'border-radius': '0 0 2px 2px',
                    'display': 'grid',
                    'grid-template-columns': '2fr .8fr .5fr',
                    'grid-gap': '5px'
                })
                .html(objResultados)
                .append(objBtnSeleccionar)
                .append(objBtnCerrar)
                .appendTo('#' + this.content_id);

            // Responsive            
            jQuery.ui.autocomplete.prototype._resizeMenu = function () {
                var ul = this.menu.element;
                ul.outerWidth(this.element.outerWidth());
            }

            $(window).resize(function () {
                if ($(window).width() < 426) {
                    $('#' + $.ventanaDatos_lite_v2.content_id)
                        .css({ width: '95%' });
                } else {
                    $('#' + $.ventanaDatos_lite_v2.content_id)
                        .css({ width: '800px' });
                }
            });
            // End responsive

            // Insertar formulario
            $('<input />', {
                id: this.id_input
            })
                .css({
                    width: '100%',
                    background: '#f2fbff',
                    padding: '10px 8px',
                    border: '1px solid #becdda',
                    outline: 'none',
                    'border-radius': '2px 2px 0 0',
                })
                // .attr('disabled', true)
                .appendTo(`#${this.content_id}_body`);

            $('<div />', {
                id: `${this.content_id}_contentTable`
            })
                .css({ 'max-height': '400px' })
                .appendTo(`#${this.content_id}_body`)

            $('<table />', {
                id: `${this.content_id}_table`,
                class: 'table table-bordered'
            })
                .css({
                    width: '100%',
                    'margin-bottom': '0',
                    'margin-top': '15px'
                })
                .html(`<tbody></tbody>`)
                .hide()
                .appendTo(`#${this.content_id}_contentTable`);

            $('#' + this.content_id).append('<div class="loader-box"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>');
            return true;
        }
    }

    _ventanaDatos_lite_v2 = function (params) {
        $.ventanaDatos_lite_v2.titulo = params.titulo || $.ventanaDatos_lite_v2.titulo;
        if (!params.callback) {
            alert('Callback sin definir');
            console.error('Falta definir una función para retornar los datos');
        } else if (!params.indice) {
            alert('Falta definir el indice para la consulta');
            console.error('Falta definir el indice para la consulta');
        } else {
            $.ventanaDatos_lite_v2.callback = params.callback;
            $.ventanaDatos_lite_v2.data = params.data;
            $.ventanaDatos_lite_v2.indice = params.indice;
            $.ventanaDatos_lite_v2.callback_esc = params.callback_esc || false;
            $.ventanaDatos_lite_v2.minLength = params.minLength || $.ventanaDatos_lite_v2.minLength;
            $.ventanaDatos_lite_v2.mascara = params.mascara || false;
            $.ventanaDatos_lite_v2.data_callback = false;
            $.ventanaDatos_lite_v2._init();
        }
    }
})(jQuery);