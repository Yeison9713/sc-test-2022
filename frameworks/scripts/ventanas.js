(function ($) {
    $.windowbootbox = {
        callback: null,
        cancel: null,
        tipo: null,

        window: function (params, callback, cancel) {
            $.windowbootbox.callback = callback ? callback : false;
            $.windowbootbox.cancel = cancel ? cancel : false;
            $.windowbootbox.tipo = params.tipo ? params.tipo = params.tipo : 'evaluar';

            if(params.tipo == 'mostrar'){
                $.windowbootbox._initm(params, callback, cancel);
            } else {
                $.windowbootbox._init(params, callback, cancel);
                $.windowbootbox._evaluar(params, cancel);
            }
        },
        _init: function (params, callback, cancel) {
            var ventanaunica = bootbox.dialog({
                size: params.size,
                title: params.title,
                closeButton: params.escape,
                animate: false,
                message: "<div class='row'>" +
                    "<div class='col-md-12 col-sm-12 col-xs-12'>" +
                    params.source +
                    "</div>" +
                    "</div>",
                buttons: {
                    aceptar: {
                        label: 'Aceptar',
                        callback: callback,
                        className: 'btn-primary'
                    },
                    cancelar: {
                        label: 'Cancelar',
                        callback: cancel,
                        className: 'btn-danger'
                    }
                }
            });
            ventanaunica.init($('.modal-footer').hide());
            ventanaunica.on('shown.bs.modal', function () {
                $(params.focus).focus();
                if (params.mascara){ params.mascara };
            });
        },

        _evaluar: function (params) {
            _inputControl('disabled');
            validarInputs({
                form: params.form,
                orden: params.orden
            },
                function () { $('.btn-danger').click() },
                function () {
                    window[params.global1]= $(params.inputglobal1).val();
                    $('.btn-primary').click();
                }
            );
        },

        _initm: (params, callback, cancel) => {
            var ventanaunica = bootbox.dialog({
                size: params.size,
                title: params.title,
                closeButton: params.escape,
                message: "<div class='row'>" +
                    "<div class='col-md-12 col-sm-12 col-xs-12'>" +
                    params.source +
                    "</div>" +
                    "</div>",
                buttons: {
                    aceptar: {
                        label: 'Aceptar',
                        callback: callback,
                        className: 'btn-primary'
                    },
                    cancelar: {
                        label: 'Cancelar',
                        callback: cancel,
                        className: 'btn-danger'
                    }
                }
            });
            ventanaunica.init($('.modal-footer').hide(), _inputControl('disabled'));
            params.inputs.forEach(element => {
                $(`#${element.input}`).val(element.valor);
            });
            ventanaunica.on('keydown', e => {
                $('.btn-primary').click();
            })
        }
    }

    _ventana = function (params, callback, cancel) {
        $.windowbootbox.window(params, callback, cancel);
    }

})(jQuery);