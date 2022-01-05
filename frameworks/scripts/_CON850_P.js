(function ($) {
    $.ventop_p = {
        overlay_id: 'ventop_p_overlay',
        container_id: 'ventop_p_container',
        header_class: 'ventop_p_header',
        body_class: 'ventop_p_body',
        callback: null,
        msj: null,
        overlay_show: null,
        title: 'Confirmación',

        _show: function () {
            if (this.overlay_show) $.ventop_p._overlay();
            $.ventop_p._import_css();
            $.ventop_p._popup();
            $.ventop_p._initEvent();
        },

        _popup: function () {
            if (this.overlay_show) $('#' + $.ventop_p.overlay_id).html('').append('<div id="' + $.ventop_p.container_id + '"></div>');
            else $('body').append('<div id="' + $.ventop_p.container_id + '"></div>');

            if (this.overlay_show) {
                $('#' + $.ventop_p.container_id).css({
                    background: '#FFF',
                    width: '20%',
                    height: 'auto',
                    margin: '0 auto',
                    'min-width': '220px',
                    'box-shadow': 'box-shadow: 0 25px 20px -20px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 0, 0, 0.06);',
                    'border-radius': '3px',
                    'padding': '2px 2px 0 2px'
                });
            } else {
                $('#' + $.ventop_p.container_id).css({
                    background: '#FFF',
                    width: '20%',
                    height: 'auto',
                    margin: '0 auto',
                    'min-width': '220px',
                    'box-shadow': 'box-shadow: 0 25px 20px -20px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 0, 0, 0.06);',
                    'border-radius': '3px',
                    'padding': '2px 2px 0 2px',
                    'position': 'absolute',
                    'top': '50%',
                    'z-index': '99999',
                    'left': '0',
                    'right': '0'
                });
            }

            var msjCon850 = CON850_P_MSG($.ventop_p.msj);

            $('#' + $.ventop_p.container_id).append(''
                + '<div class="' + $.ventop_p.header_class + '">'
                + ' <p style="padding: 15px 25px;margin: 0 auto;">'
                + $.ventop_p.title
                + ' </p>'
                + '</div>'
                + '<div class="' + $.ventop_p.body_class + '">'
                + ' <div class="' + $.ventop_p.body_class + '_container">'
                + msjCon850
                + '     <div class="botones" style="display: grid;grid-template-columns: 50% 50%;">'
                + '          <button class="btn si">Si</button>'
                + '         <button class="btn no">No</button>'
                + '     </div>'
                + ' </div>'
                + '</div>'
            );

            $('.' + $.ventop_p.header_class).css({
                width: '100%',
                height: 'auto',
                background: '#0a58ab',
                'max-width': '100%',
                'text-transform': 'uppercase',
                'font-weight': '600',
                'font-size': '12px',
                'text-align': 'center',
                'color': '#FFF',
                'border-radius': '3px 3px 0 0 ',
                'margin-bottom': '2px',
                'letter-spacing': '.8px'
            });

            $('.' + $.ventop_p.body_class + '_container').css({
                padding: '15px 0 5px 0',
                'text-align': 'center',
            });

            $('.' + $.ventop_p.body_class + '_container .btn').css({
                border: 'none',
                outline: 'none',
                margin: '15px 5px 0px 5px',
                padding: '10px 0',
                'text-transform': 'uppercase',
                // 'font-weight': 'bold',
                'cursor': 'pointer',
                'color': '#FFF',
                transition: 'all 200ms',
                'border-radius': '2px'
            })

            $('.' + $.ventop_p.body_class + '_container .si').css({
                background: '#FFF',
                border: '1px solid #1f9224',
                color: '#1f9224'

            }).hover(
                function () { $(this).css({ background: '#1f9224', color: '#FFF' }) },
                function () { $(this).css({ background: '#FFF', color: '#1f9224' }) }
            )


            $('.' + $.ventop_p.body_class + '_container .no').css({
                background: '#FFF',
                border: '1px solid rgb(171, 20, 9)',
                color: 'rgb(171, 20, 9)'

            }).hover(
                function () { $(this).css({ background: 'rgb(171, 20, 9)', color: '#FFF' }) },
                function () { $(this).css({ background: '#FFF', color: 'rgb(171, 20, 9)' }) }
            )
        },

        _initEvent: function () {
            $(document).on('keydown', $.ventop_p._controls)
            $('.' + $.ventop_p.body_class + '_container .si').on('click', $.ventop_p._seleccionSi)
            $('.' + $.ventop_p.body_class + '_container .no').on('click', $.ventop_p._seleccionNo)
        },

        _endEvent: function () {
            $(document).off('keydown', $.ventop_p._controls)
            $('.' + $.ventop_p.body_class + '_container .si').off('click', $.ventop_p._seleccionSi)
            $('.' + $.ventop_p.body_class + '_container .no').off('click', $.ventop_p._seleccionNo)
        },

        _seleccionSi: function () {
            var data = {
                id: 'S',
                descrip: 'Aceptar'
            }

            $.ventop_p._sendCallback(data);
        },

        _seleccionNo: function () {
            var data = {
                id: 'N',
                descrip: 'Rechazar'
            }

            $.ventop_p._sendCallback(data);
        },

        _controls: function (e) {
            var key = e.which;
            switch (key) {
                case 83:
                    $('.' + $.ventop_p.body_class + '_container .si').click();
                    break;
                case 78:
                case 27:
                    $('.' + $.ventop_p.body_class + '_container .no').click();
                    break;
            }
        },

        _sendCallback: function (data) {
            var callback_function = $.ventop_p.callback;
            callback_function(data);
            $.ventop_p._hide();
        },

        _hide: function () {
            $.ventop_p._endEvent();
            if ($.ventop_p.overlay_show) {
                $('#' + $.ventop_p.overlay_id).fadeOut('fast', function () {
                    $(this).remove();
                    $.ventop_p._delete_css();
                });
            } else {
                $('#' + $.ventop_p.container_id).fadeOut('fast', function () {
                    $(this).remove();
                    $.ventop_p._delete_css();
                });
            }
        },

        _overlay: function () {
            $('body').append('<div id="' + $.ventop_p.overlay_id + '"></div>');
            $('#' + $.ventop_p.overlay_id).css({
                position: 'fixed',
                width: '100%',
                height: '100%',
                top: '0',
                left: '0',
                background: 'rgba(0,0,0,0.2)',
                'align-items': 'center',
                'font-family': "'Roboto', sans-serif",
                'z-index': '999999'
            }).css("display", "flex")
                .hide()
                .fadeIn();
        },

        _delete_css: function () {
            $('#style_ventop_p').remove();
        },

        _import_css: function () {
            // $(""
            //     + "<style type='text/css' id='style_ventop_p'>
            // @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900');" se cambia por el font
            //     + "</style>"
            // ).appendTo("head");
        }
    }
    CON850_P = function (callback, opciones) {
        $.ventop_p.callback = callback;
        $.ventop_p.msj = opciones.msj ? opciones.msj : "01";
        
        if (opciones.overlay_show == false) $.ventop_p.overlay_show = false;
        else $.ventop_p.overlay_show = true;
        $.ventop_p._show();
    }

})(jQuery);