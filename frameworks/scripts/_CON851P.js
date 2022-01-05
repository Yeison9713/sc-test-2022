(function ($) {
    $.ventop_p2 = {
        overlay_id: 'ventop_p2_overlay',
        container_id: 'ventop_p2_container',
        header_class: 'ventop_p2_header',
        body_class: 'ventop_p2_body',
        callback: null,
        msj: null,
        overlay_show: null,
        title: 'Confirmación',
        reject: null,
        res: null,

        _show: function () {
            let random = new Date().getTime();

            this.overlay_id = `ventop_p2_overlay${random}`;
            this.container_id = `ventop_p2_container${random}`;
            
            if (this.overlay_show) $.ventop_p2._overlay();
            $.ventop_p2._import_css();
            $.ventop_p2._popup();
            $.ventop_p2._initEvent();
        },

        _popup: function () {
            if (this.overlay_show) $('#' + $.ventop_p2.overlay_id).html('').append('<div id="' + $.ventop_p2.container_id + '"></div>');
            else $('body').append('<div id="' + $.ventop_p2.container_id + '"></div>');

            if (this.overlay_show) {
                $('#' + $.ventop_p2.container_id).css({
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
                $('#' + $.ventop_p2.container_id).css({
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
                    'z-index': '9999999',
                    'left': '0',
                    'right': '0'
                });
            }

            var msjCon850 = CON851P_MSG($.ventop_p2.msj);

            $('#' + $.ventop_p2.container_id).append(''
                + '<div class="' + $.ventop_p2.header_class + '">'
                + ' <p style="padding: 15px 25px;margin: 0 auto;">'
                + $.ventop_p2.title
                + ' </p>'
                + '</div>'
                + '<div class="' + $.ventop_p2.body_class + '">'
                + ' <div class="' + $.ventop_p2.body_class + '_container">'
                + '<div>' + msjCon850 + '</div>'
                + '     <div class="botones" style="display: grid;grid-template-columns: 50% 50%;">'
                + '          <button class="btn no">No</button>'
                + '          <button class="btn si">Si</button>'
                + '     </div>'
                + ' </div>'
                + '</div>'
            );

            $('.' + $.ventop_p2.header_class).css({
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

            $('.' + $.ventop_p2.body_class + '_container').css({
                padding: '15px 15px',
                'text-align': 'center',
            });

            $('.' + $.ventop_p2.body_class + '_container .btn').css({
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

            $('.' + $.ventop_p2.body_class + '_container .si').css({
                background: '#FFF',
                border: '1px solid #1f9224',
                color: '#1f9224'

            }).hover(
                function () { $(this).css({ background: '#1f9224', color: '#FFF' }) },
                function () { $(this).css({ background: '#FFF', color: '#1f9224' }) }
            )


            $('.' + $.ventop_p2.body_class + '_container .no').css({
                background: '#FFF',
                border: '1px solid rgb(171, 20, 9)',
                color: 'rgb(171, 20, 9)'

            }).hover(
                function () { $(this).css({ background: 'rgb(171, 20, 9)', color: '#FFF' }) },
                function () { $(this).css({ background: '#FFF', color: 'rgb(171, 20, 9)' }) }
            )
        },

        _initEvent: function () {
            $(document).on('keydown', $.ventop_p2._controls)
            $('.' + $.ventop_p2.body_class + '_container .si').on('click', $.ventop_p2._seleccionSi)
            $('.' + $.ventop_p2.body_class + '_container .no').on('click', $.ventop_p2._seleccionNo)
        },

        _endEvent: function () {
            $(document).off('keydown', $.ventop_p2._controls)
            $('.' + $.ventop_p2.body_class + '_container .si').off('click', $.ventop_p2._seleccionSi)
            $('.' + $.ventop_p2.body_class + '_container .no').off('click', $.ventop_p2._seleccionNo)
        },

        _seleccionSi: function () {
            $.ventop_p2._hide();
            setTimeout(()=>{
                $.ventop_p2.res()
            }, 300)
        },

        _seleccionNo: function () {
            $.ventop_p2._hide();
            setTimeout(()=>{
                $.ventop_p2.reject()
            }, 300)
        },

        _controls: function (e) {
            var key = e.which;
            switch (key) {
                case 83:
                case 13:
                    $('.' + $.ventop_p2.body_class + '_container .si').click();
                    break;
                case 78:
                case 27:
                    $('.' + $.ventop_p2.body_class + '_container .no').click();
                    break;
            }
        },
        _hide: function () {
            $.ventop_p2._endEvent();
            if ($.ventop_p2.overlay_show) {
                $('#' + $.ventop_p2.overlay_id).fadeOut('fast', function () {
                    $(this).remove();
                    $.ventop_p2._delete_css();
                });
            } else {
                $('#' + $.ventop_p2.container_id).fadeOut('fast', function () {
                    $(this).remove();
                    $.ventop_p2._delete_css();
                });
            }
        },

        _overlay: function () {
            $('body').append('<div id="' + $.ventop_p2.overlay_id + '"></div>');
            $('#' + $.ventop_p2.overlay_id).css({
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
            $('#style_ventop_p2').remove();
        },

        _import_css: function () {
            // $(""
            //     + "<style type='text/css' id='style_ventop_p2'>
            // @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900');" se cambia por el font
            //     + "</style>"
            // ).appendTo("head");
        }
    }
    CON851P = function (error, reject, res) {
        $.ventop_p2.reject = reject;
        $.ventop_p2.res = res;
        $.ventop_p2.msj = error || "01";
        $.ventop_p2.overlay_show = true;

        $.ventop_p2._show();
    }

})(jQuery);