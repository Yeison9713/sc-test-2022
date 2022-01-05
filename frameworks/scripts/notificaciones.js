var toastCount = 0;

(function ($) {
    $.toast = {
        init: function () {
            var i = -1,
                    $toastlast,
                    getMessage = function () {
                        var msgs = ['Hello, some notification sample goes here',
                            '<div><input class="form-control input-small" value="textbox"/>&nbsp;<a href="http://themeforest.net/item/metronic-responsive-admin-dashboard-template/4021469?ref=keenthemes" target="_blank">Check this out</a></div><div><button type="button" id="okBtn" class="btn blue">Close me</button><button type="button" id="surpriseBtn" class="btn default" style="margin: 0 8px 0 8px">Surprise me</button></div>',
                            'Did you like this one ? :)',
                            'Totally Awesome!!!',
                            'Yeah, this is the Metronic!',
                            'Explore the power of App. Purchase it now!'
                        ];
                        i++;
                        if (i === msgs.length) {
                            i = 0;
                        }

                        return msgs[i];
                    };
        },
        show_toast: function (title, msj, type) {
            var shortCutFunction = type;
            var msg = msj || 'Mensaje no definido';
            var title = title || 'Titulo no definido';
            var toastIndex = toastCount++;
            toastr.options = {
                closeButton: 'checked',
                debug: null,
                positionClass: 'toast-bottom-right',
                onclick: null,
                showDuration: 1000,
                hideDuration: '1000',
                timeOut: '5000',
                extendedTimeOut: '3000',
                showEasing: 'swing',
                hideEasing: 'linear',
                showMethod: 'fadeIn',
                hideMethod: 'fadeOut'
            };

            if (!msg) {
                msg = $.toast.init.getMessage();
            }
            var $toast = toastr[shortCutFunction](msg, title);
            $toastlast = $toast;
            if ($toast.find('#okBtn').length) {
                $toast.delegate('#okBtn', 'click', function () {
                    alert('you clicked me. i was toast #' + toastIndex + '. goodbye!');
                    $toast.remove();
                });
            }
            if ($toast.find('#surpriseBtn').length) {
                $toast.delegate('#surpriseBtn', 'click', function () {
                    alert('Surprise! you clicked me. i was toast #' + toastIndex + '. You could perform an action here.');
                });
            }

            $('#clearlasttoast').click(function () {
                toastr.clear($toastlast);
            });
        }
    };
    
    toast = function (title, msj, type) {
        $.toast.init();
        $.toast.show_toast(title, msj, type);
    };
})(jQuery);