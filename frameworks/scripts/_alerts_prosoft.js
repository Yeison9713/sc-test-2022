(function ($) {

    $.alerts = {
        overlay_id: 'alert_overlay',
        container_id: 'alert_container',
        header_class: 'alert_header',
        body_class: 'alert_body',
        foot_class: 'alert_footer',
        btn_id: 'alert_btn',
        btn_text: 'Aceptar',
        auto_close: null,
        callback: null,
        callback_cancel: null,
        btn_cancel: null,
        footer: true,

        alert: function (params, callback, callback_cancel) {
            $.alerts.auto_close = true;
            $.alerts.callback = callback ? callback : false;
            $.alerts.callback_cancel = callback_cancel ? callback_cancel : false;
            params.tipo = params.tipo ? params.tipo : 'Alert';
            params.titulo = params.titulo ? params.titulo : 'Alerta';
            if (params.autoclose != null) $.alerts.auto_close = params.autoclose;
            $.alerts.btn_cancel = params.btnCancel ? params.btnCancel : false;
            $.alerts.footer = params.footer == false ? false : true;
            $.alerts._show(params);
            $.alerts._initEvents();
        },

        _show: function (params) {
            $.alerts._overlay('show');

            // Container main alert
            $('#' + $.alerts.overlay_id).html('').append('<div id="' + $.alerts.container_id + '"></div>');
            $('#' + $.alerts.container_id).css({
                background: '#FFF',
                height: 'auto',
                margin: '0 auto',
                'box-shadow': 'box-shadow: 0 25px 20px -20px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 0, 0, 0.06);',
                'border-radius': '3px',
                'min-width': '300px',
                width: '40%',

            });

            $('#' + $.alerts.container_id).append(''
                + '<div class="' + $.alerts.header_class + '">'
                + ' <p style="padding: 15px 25px;margin: 0 auto;">'
                + params.titulo
                + ' </p>'
                + '</div>'
                + '<div class="' + $.alerts.body_class + '">'
                + ' <div class="' + $.alerts.body_class + '_container">'
                + params.mensaje
                + '  </div>'
                + '</div>'
                + '<div class="' + $.alerts.foot_class + '">'
                + ' <div class="' + $.alerts.foot_class + '_container">'
                + ' </div>'
                + '</div>'
            );

            // Header alert style
            $('.' + $.alerts.header_class).css({
                width: '100%',
                height: 'auto',
                background: 'rgba(0,0,0,.03)',
                'max-width': '100%',
                'text-transform': 'uppercase',
                'font-weight': '700',
                'font-size': '14px',
                'text-align': 'center'
            });

            // Body y body_container alert style            
            $('.' + $.alerts.body_class).css({
                width: '100%',
                height: 'auto',
            });

            $('.' + $.alerts.body_class + '_container').css({
                padding: '20px 20px',
                'font-size': '16px'
            });

            //Footer alert style
            $('.' + $.alerts.foot_class)
                .css({
                    width: '100%',
                    height: 'auto',
                    background: '#f6fbff',
                    // display: $.alerts.footer ? 'show' : 'none',
                    display: 'show',
                    'border-radius': '0px 0px 3px 3px'
                })
                .css("display", $.alerts.footer ? "show" : "none");

            //Footer btn style
            $('.' + $.alerts.foot_class + "_container").append(''
                + '<button id="' + $.alerts.btn_id + '">'
                + $.alerts.btn_text
                + '</button>');

            $('#' + $.alerts.btn_id).css({
                width: 'auto',
                height: 'auto',
                padding: '8px 25px',
                margin: '10px 10px 10px 5px',
                float: 'right',
                background: '#0e86cc',
                color: '#FFF',
                border: '1px solid #0e86cc',
                transition: 'all 200ms',
                outline: 'none',
                'border-radius': '2px',
                'font-size': '12px',
                'text-rendering': 'optimizeLegibility',
            }).hover(
                function () {
                    $(this).css({
                        'background': '#08659c'
                    })
                },
                function () {
                    $(this).css({
                        'background': '#0e86cc'
                    })
                }
            );

            if ($.alerts.btn_cancel) {
                $('.' + $.alerts.foot_class + "_container").append(''
                    + '<button id="btn_alert_salir">Cancelar</button>');

                $('#btn_alert_salir').css({
                    width: 'auto',
                    height: 'auto',
                    padding: '8px 25px',
                    margin: '10px 5px',
                    float: 'right',
                    background: '#FFF',
                    color: '#ab1409',
                    border: '1px solid #ab1409',
                    transition: 'all 200ms',
                    outline: 'none',
                    'border-radius': '2px',
                    'font-size': '12px',
                    'text-rendering': 'optimizeLegibility',
                }).hover(
                    function () {
                        $(this).css({
                            'background': '#ab1409',
                            'color': '#FFF'
                        })
                    },
                    function () {
                        $(this).css({
                            'background': '#FFF',
                            'color': '#ab1409'
                        })
                    }
                );
            }

            $('.' + $.alerts.foot_class + "_container").append('<div style="clear:both"></div>');

        },

        _overlay: function (estado) {
            $('body').append('<div id="' + $.alerts.overlay_id + '"></div>');
            $('#alert_overlay').css({
                position: 'fixed',
                width: '100%',
                height: '100%',
                top: '0',
                left: '0',
                background: 'rgba(0,0,0,0.2)',
                'align-items': 'center',
                'z-index': '99999999'
            }).css("display", "flex")
                .hide()
                .fadeIn();
        },

        _initEvents: function () {
            $('#' + $.alerts.btn_id).on('click', $.alerts._eventBtn)
            if ($.alerts.btn_cancel) $('#btn_alert_salir').on('click', $.alerts._eventBtnCancel)
            $(document).on('keydown', $.alerts._controls)
        },

        _controls: function (e) {
            switch (e.which) {
                case 13:
                    $('#' + $.alerts.btn_id).click()
                    break;
                case 27:
                    if ($.alerts.btn_cancel) $('#btn_alert_salir').click();
                    break;
            }
        },

        _eventBtn: function () {
            if ($.alerts.callback) setTimeout(function () { $.alerts.callback($.alerts.callback) }, 100);
            if ($.alerts.auto_close) $.alerts._hide();
        },

        _eventBtnCancel: function () {
            if ($.alerts.btn_cancel) {
                if ($.alerts.callback_cancel) setTimeout(function () {
                    $.alerts.callback_cancel($.alerts.callback_cancel)
                }, 100);
            }
            if ($.alerts.auto_close) $.alerts._hide();
        },

        _hide: function () {
            $('#' + $.alerts.overlay_id).fadeOut('fast', function () {
                $(this).remove();
                $('#' + $.alerts.btn_id).off('click', $.alerts._eventBtn)
                if ($.alerts.btn_cancel) $('#btn_alert_salir').on('click', $.alerts._eventBtnCancel)
                $(document).off('keydown', $.alerts._controls)
            });
        },
    }

    jAlert = function (params, callback, callback_cancel) {
        $.alerts.alert(params, callback, callback_cancel);
    }

    jAlert_close = function () {
        $.alerts._hide();
    }

})(jQuery);