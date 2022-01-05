(function ($) {

    $.f8 = {
        _callback: null,
        _array: null,

        createModal: function () {
            $.f8._addFont();
            $("body").append('<div class="overlay-f8"></div>');

            $('.overlay-f8').append('<div id="modal_f8" class="modal-f8"></div>');

            $("#modal_f8").append(''
                + '<div class="header-f8">'
                // + ' <button type="button" data-dismiss="f8"></button>'
                + ' <div class="titulo-f8"></div>'
                + ' <div class="input_busqueda">'
                + '     <input id="busq_f8" autofocus placeholder="Buscar"/>'
                + ' </div>'
                + '</div>'
                + '<div class="body-f8">'
                + ' <div class="header_table">'
                + '     <table style="width: 100%;"><thead><tr></tr></thead></table>'
                + ' </div>'
                + ' <div id="contentTablaF8" style="max-height: 300px; overflow: auto !important;">'
                + '     <table id="table_f8">'
                + '         <tbody>  </tbody>'
                + '     </table>'
                + ' </div>'
                + '</div>'
            );

            $('#busq_f8').focus();

        },

        show: function (construct) {
            let titulo = construct.title ? construct.title : 'Alerta';
            $("#modal_f8 .header-f8 .titulo-f8").html(titulo);

            var array_columns = [];
            Object.getOwnPropertyNames(construct.array[0]).forEach(function (val, idx, array) {
                array_columns.push(val);
            });

            var respuesta_validar = $.f8._validarColumnas(array_columns, construct.columns);

            if (respuesta_validar != true) {
                alert(respuesta_validar);
                console.error(respuesta_validar)
                $.f8.hide();
            }

            for (let i = 0; i < construct.columns.length; i++) {
                $(".header_table thead tr").append("<th>" + construct.columns[i] + "</th>");
            }


            for ($i = 0; $i < construct.array.length; $i++) {
                $("#table_f8 tbody").append("<tr id='" + $i + "' class='bandera'></tr>");
                for (let i = 0; i < construct.columns.length; i++) {
                    $("#table_f8 tbody #" + $i).append(""
                        + "<td>"
                        + construct.array[$i][construct.columns[i]].trim()
                        + "</td>"
                    );
                }
            }


            // $('button[data-dismiss="f8"]').on('click', $.f8.hide);
        },

        _eventKey: function () {
            $(document).on('keydown', $.f8._functKey)
            $('#busq_f8').on('keydown', $.f8.search)
        },

        _functKey: function (e) {
            if ((e.which >= 38 && e.which <= 40) || (e.which === 27 || e.which === 13)) {
                $.f8.options(e.which);
            }
        },

        search: function (e) {
            if ((e.which >= 38 && e.which <= 40) || (e.which === 27 || e.which === 13)) {
                // $.f8.options(e.which);
            } else {
                var element = this;
                $(".focus-f8").removeClass('focus-f8');
                $.each($("#table_f8 tbody tr"), function () {
                    if ($(this).text().toLowerCase().indexOf($(element).val().toLowerCase()) === -1) {
                        $(this).hide().removeClass('bandera');
                    } else {
                        $(this).show().addClass('bandera');
                    }
                });
            }
        },

        options: function (e) {
            elementoActive = $(".focus-f8");
            elemento = $("#table_f8 tbody tr:visible");
            if (elementoActive.length === 0) { $(elemento[0]).addClass('focus-f8'); }
            if (elemento.length !== 0) {
                switch (e) {
                    case 40:
                        if (elementoActive.nextAll('tr.bandera').length != 0) {
                            let nextElement = elementoActive.nextAll('tr.bandera')[0];
                            elementoActive.removeClass('focus-f8');
                            $(nextElement).addClass('focus-f8');
                            $("#contentTablaF8").scrollTop($("#contentTablaF8").scrollTop() + parseInt(32));
                        }
                        break;
                    case 38:
                        if (elementoActive.prevAll('tr.bandera').length != 0) {
                            let prevElement = elementoActive.prevAll('tr.bandera')[0];
                            elementoActive.removeClass('focus-f8');
                            $(prevElement).addClass('focus-f8');
                            $("#contentTablaF8").scrollTop($("#contentTablaF8").scrollTop() - parseInt(32));
                        }
                        break;
                    case 27:
                        $.f8.hide();
                        break;
                    case 13:
                        if ($(elementoActive).length === 1) {
                            $.f8.select($(elementoActive));
                        }
                        break;
                }
            }

        },

        select: function (response) {
            var array = $.f8._array.array;
            var callback = $.f8._callback;
            var resp = '';
            $.each(array, function (k, v) {
                if (parseInt($(response).attr('id')) === k) {
                    resp = v;
                }
            });
            if (resp !== '') {
                callback(resp);
            } else {
                callback('99');
            }
            $.f8.hide();
        },

        hide: function () {
            $('#modal_f8').toggle();
            $(".overlay-f8").remove();
            $('#font-f8').remove();
            $(document).off('keydown', $.f8._functKey)
        },

        _setCss: function () {
            $('.overlay-f8').css({
                "display": "flex",
                "align-items": "center",
                "background": "rgba(0,0,0,0.8)",
                "position": "fixed",
                "top": "0",
                "left": "0",
                "width": "100%",
                "height": "100%",
                'z-index' : '999999'
            });

            $('#modal_f8').css({
                'background': '#FFF',
                'max-height': '80%',
                'width': '60%',
                'margin': '0 auto',
                'border-radius': '3px',
                'box-shadow': '0px 0px 10px 0px rgba(0,0,0,.08),0px 5px 10px 0px rgba(0,0,0,.08)',
                'font-family': "'Sarabun', sans-serif"
            });

            // Set HEADER_POPUP
            $('.header-f8').css({
                'padding': '20px'
            });

            $('.header-f8 .titulo-f8').css({
                'margin': '0 auto',
                'text-align': 'center',
                'font-size': '16px',
                'text-transform': 'uppercase',
                'font-weight': '700'
            });

            $('.header-f8 > .input_busqueda').css({
                'width': '100%',
                'margin': '15px 0 0 0',
            });

            $('.header-f8 > .input_busqueda > #busq_f8').css({
                'width': '100%',
                'border': 'none',
                'padding': '15px 20px',
                'outline': 'none',
                '-moz-box-sizing': 'border-box',
                '-webkit-box-sizing': 'border-box',
                'box-sizing': 'border-box',
                'transition': 'all 300ms',
                'border-radius': '2px'
            });

            $('.header-f8 > .input_busqueda > #busq_f8')
                .focus(function () {
                    $(this).css({
                        'background': 'aliceblue',
                        'box-shadow': 'inset 0 0 0px 1px #9ad0ff',
                    });
                })
                .focusout(function () {
                    $(this).css({
                        'background': '#f2f2f2',
                        'box-shadow': 'none'
                    });
                });

            // Set BODY_POPUP
            $('.body-f8').css({
                'padding': '0 20px 20px 20px'
            })

            // Set TABLE_POPUP
            $('#table_f8').css({
                'border-collapse': 'collapse',
                'width': '100%'
            })

            $('.header_table > table > thead').css({
                'background': '#a71111'
            })

            $("<style type='text/css' id='styleF8'>\
                #contentTablaF8::-webkit-scrollbar {\
                    width: 6px;\
                }\
                #contentTablaF8::-webkit-scrollbar-track{ \
                    background: #FFF;\
                }\
                #contentTablaF8::-webkit-scrollbar-thumb{\
                    background: rgba(0, 0, 0, 0.2);\
                }\
                #contentTablaF8::-webkit-scrollbar-thumb:hover{\
                    background: rgba(0, 0, 0, 0.3);\
                }\
                .focus-f8{\
                    background-color: #dddddd;\
                }\
                </style>")
                .appendTo("head");

            $("body").css({ "width": "100%", "height": "100%", "overflow": "hidden" });

            $('.header_table thead tr th').css({
                'padding': '10px 0px 10px 20px',
                'font-size': '14px',
                'text-align': 'left',
                'color': '#FFF',
                'text-rendering': 'optimizeLegibility',
                'font-weight': '800'
            })

            $('#table_f8 tbody tr td').css({
                'padding': '10px 0px 10px 20px',
                'font-size': '14px'
            })

        },

        _addFont: function () {
            var link = document.createElement('link');
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('id', 'font-f8');
            link.setAttribute('type', 'text/css');
            document.head.appendChild(link);
        },
        
        // link.setAttribute('href', 'https://fonts.googleapis.com/css?family=Sarabun:200,300,400,500,600,700');
        _validarColumnas: function (columnas_array, columnas_mostrar) {
            var flag = true;
            for (var i in columnas_mostrar) {
                const resultado = columnas_array.find(columna => columna === columnas_mostrar[i]);
                if (resultado == null) flag = "La columna " + columnas_mostrar[i] + " no existe"
            }

            return flag;

        }
    }

    f8Popup = function (array, callback) {
        $.f8._callback = callback;
        $.f8._array = array;


        $.f8.createModal();
        $.f8.show(array, callback);
        $.f8._setCss();
        $.f8._eventKey(array, callback);
        $('#table_f8 tbody tr').click(function () {
            $.f8.select(this)
        });
    }

})(jQuery);
