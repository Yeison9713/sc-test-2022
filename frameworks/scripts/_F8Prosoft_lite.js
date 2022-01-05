(function ($) {
    $.ventanaDatos_lite = {
        overlay_id: 'overlay-f8_lite',
        content_id: 'content-f8_lite',
        css_id: 'css_ventanaDatos_lite',
        id_input: 'input_busquedaF8Lite',
        titulo: 'Ventana de búsqueda',
        callback: null,
        callback_esc: false,
        tablaSql: false,
        indice: false,
        minLength: 1,
        mascara: false,
        data_callback: false,
        db: null,

        _init: function () {
            if (this._open()) this._initSql()
        },

        _initSql: function () {
            console.log($CONEXION_BD)
            // var connection = mysql.createConnection($CONEXION_BD);
            var db_tmp = $.parseJSON((JSON.stringify($CONEXION_BD)));
            db_tmp.database = $.ventanaDatos_lite.db || db_tmp.database;
            var connection = mysql.createConnection(db_tmp);

            connection.connect(function (err) {
                if (err) {
                    errorSql(err.stack.substring(0, 100))
                } else {
                    console.log('->Cargando')
                    var pre_query = new Date().getTime();
                    connection.query(
                        `SELECT * FROM ${$.ventanaDatos_lite.tablaSql}`,
                        function (error, results, fields) {

                            if (error) {
                                errorSql(error.stack.substring(0, 100))
                            } else {
                                $('.loader-box').hide();
                                var post_query = new Date().getTime(),
                                    duration = (post_query - pre_query) / 1000;

                                $('#labelResultadosLite')
                                    .html(`<span><b>${results.length}</b> resultados cargados en <b>${duration}s</b></span>`)

                                $(`#${$.ventanaDatos_lite.id_input}`).removeAttr('disabled').focus();

                                $.ventanaDatos_lite._validarIndices(fields);

                                if ($.ventanaDatos_lite._validarIndices(fields)) {
                                    var indices = $.ventanaDatos_lite.indice;

                                    results.forEach(data => {
                                        idx = '';
                                        indices.forEach(ind => {
                                            idx += ` ${data[ind].toString().trim().replace(/\s\s+/g, ' ')} -`;
                                        })

                                        data.label = idx.slice(0, -1);
                                    })

                                    $(`#${$.ventanaDatos_lite.id_input}`).autocomplete({
                                        source: function (request, response) {
                                            var res = $.ui.autocomplete.filter(results, request.term);
                                            response(res.slice(0, 100));
                                        },
                                        minLength: $.ventanaDatos_lite.minLength,
                                        select: function (event, ui) {
                                            $.ventanaDatos_lite.data_callback = ui.item;
                                            $(`#${$.ventanaDatos_lite.content_id}_table tbody`).html('');
                                            var mask = $.ventanaDatos_lite.mascara;
                                            Object.getOwnPropertyNames(ui.item).forEach(function (val, idx, array) {
                                                var objMask = mask.find(o => o[val]),
                                                    hide = (objMask ? ((objMask[val] == 'hide') ? false : true) : true);

                                                if (val != 'label' && val != 'value' && hide) {
                                                    $(`#${$.ventanaDatos_lite.content_id}_table tbody`).append(`
                                                        <tr>
                                                            <td><b>${ objMask ? objMask[val] : val}</b></td>
                                                            <td>${ui.item[val]}</td>
                                                        </tr>
                                                    `)
                                                }

                                                $(`#${$.ventanaDatos_lite.content_id}_table`).show();
                                            });

                                            var objBtnLimpiar = $('<div />')
                                                .css({
                                                    'text-align': 'center',
                                                    'padding-top': '15px'
                                                })
                                                .html('<button type="button" class="btn green btn-outline" onclick="$.ventanaDatos_lite._limpiar(this)">Limpiar</button>');

                                            $(`#${$.ventanaDatos_lite.content_id}_contentTable`)
                                                .append(objBtnLimpiar);

                                            return false;
                                        }
                                    });

                                } else {
                                    alert(`Los indices enviados no coinciden con las columnas de la base de datos.`);
                                    console.error(`Los indices enviados no coinciden con las columnas de la base de datos.`)
                                }

                                connection.end();
                            }
                        }
                    );
                }
            });
        },

        _limpiar: function (el) {
            $(el)
                .closest('div')
                .remove();

            $(`#${$.ventanaDatos_lite.id_input}`)
                .val('')
                .focus()

            $(`#${$.ventanaDatos_lite.content_id}_table tbody`)
                .html('')
        },

        _validarIndices: function (columnas) {
            var columnasSql = [],
                columnasFront = $.ventanaDatos_lite.indice;

            columnas.forEach(data => { columnasSql.push(data.name) })

            return columnasFront.every(element => columnasSql.indexOf(element) > -1)
        },

        _sendData: function () {
            var data = $.ventanaDatos_lite.data_callback;
            if (data) {
                $.ventanaDatos_lite.callback(data);
                $.ventanaDatos_lite._close();
            } else console.error('Ningun dato seleccionado');
        },

        _close: function () {
            $(`#${$.ventanaDatos_lite.id_input}`).autocomplete("destroy");
            $('#' + $.ventanaDatos_lite.overlay_id).fadeOut('fast', function () {
                $(this).remove();
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
                .html($.ventanaDatos_lite.titulo)
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
                .html('<button type="button" class="btn red btn-outline" style="width: 100%" onclick="$.ventanaDatos_lite._close()">Cerrar</button>');

            var objBtnSeleccionar = $('<div />')
                .html('<button type="button" class="btn blue" style="width: 100%" onclick="$.ventanaDatos_lite._sendData()">Seleccionar</button>');

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
                    $('#' + $.ventanaDatos_lite.content_id)
                        .css({ width: '95%' });
                } else {
                    $('#' + $.ventanaDatos_lite.content_id)
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

    _ventanaDatos_lite = function (params) {
        $.ventanaDatos_lite.titulo = params.titulo || $.ventanaDatos_lite.titulo;
        if (!params.callback) {
            alert('Callback sin definir');
            console.error('Falta definir una función para retornar los datos');
        } else if (!params.tablaSql) {
            alert('Falta definir la tabla para realizar la consulta');
            console.error('Falta definir la tabla para realizar la consulta');
        } else if (!params.indice) {
            alert('Falta definir el indice para la consulta');
            console.error('Falta definir el indice para la consulta');
        } else {
            $.ventanaDatos_lite.callback = params.callback;
            $.ventanaDatos_lite.tablaSql = params.tablaSql;
            $.ventanaDatos_lite.indice = params.indice;
            $.ventanaDatos_lite.callback_esc = params.callback_esc || false;
            $.ventanaDatos_lite.minLength = params.minLength || $.ventanaDatos_lite.minLength;
            $.ventanaDatos_lite.mascara = params.mascara || false;
            $.ventanaDatos_lite.data_callback = false;
            $.ventanaDatos_lite.db = params.db;
            $.ventanaDatos_lite._init();
        }
    }
})(jQuery);