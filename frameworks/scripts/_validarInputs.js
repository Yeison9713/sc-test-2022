(function ($) {

    $.validar = {
        form: null,
        orden: null,
        back: null,
        next: null,
        key: null,
        event_av_pag: false,
        event_f1: false,
        event_f2: false,
        event_f3: false,
        event_f4: false,
        event_f5: false,
        event_f6: false,
        event_f7: false,
        event_f8: false,
        event_f9: false,
        event_f10: false,
        event_f11: false,
        event_flecha_abajo: false,
        event_flecha_arriba: false,

        init: function () {
            if ($.validar.key == 'keyup') {
                $.validar._siguiente($.validar.orden);
                $.validar._keyEvent($.validar.form, 'on');
            } else {
                $.validar._siguiente($.validar.orden);
                $.validar._keyEvent2($.validar.form, 'on');
            }
        },

        _keyEvent: function (form, estado) {
            switch (estado) {
                case 'on':
                    $(document).on('keyup', form + ' input.form-control, ' + form + ' textarea.form-control', $.validar._validacionKey)
                    break;
                case 'off':
                    $(document).off('keyup', form + ' input.form-control, ' + form + ' textarea.form-control', $.validar._validacionKey)
                    break;
            }
        },

        _keyEvent2: function (form, estado) {
            switch (estado) {
                case 'on':
                    $(document).on('keydown', form + ' input.form-control, ' + form + ' textarea.form-control', $.validar._validacionKey)
                    break;
                case 'off':
                    $(document).off('keydown', form + ' input.form-control, ' + form + ' textarea.form-control', $.validar._validacionKey)
                    break;
            }
        },

        _validacionKey: function (e) {
            var tipoElemento = e.currentTarget.localName;
            switch (tipoElemento) {
                case 'input':
                    $.validar._validarInput(e, this);
                    break;
                case 'textarea':
                    $.validar._validarTextarea(e, this);
                    break;
            }
        },
        _validarTextarea: function (e, el) {
            var ant_orden = parseInt($(el).data().orden) - 1;
            var sig_orden = parseInt($(el).data().orden) + 1;
            var max_longitud = parseInt($(el).attr('maxlength'));
            var requerido = $(el).attr('required') || false;
            var act_longitud = $(el).val().length;
            if (
                e.which != 35 &&
                e.which != 36 &&
                e.which != 37 &&
                e.which != 38 &&
                e.which != 39 &&
                e.which != 40 &&
                e.which != 16 &&
                e.which != 17 &&
                e.which != 18
                // e.which != 119
            ) {
                switch (e.which) {
                    case 27:
                        $.validar._anterior(ant_orden);
                        break;
                    case 34:
                        if ($.validar.event_av_pag) $.validar._eventAvPag();
                        break;
                    case 114:
                        e.preventDefault();
                        if (requerido) {
                            if (act_longitud > 0) $.validar._siguiente(sig_orden)
                            else plantillaToast('', 'Campo obligatorio', null, 'error', 'Error');
                        } else {
                            $.validar._siguiente(sig_orden)
                        }
                        break;
                    case 112:
                        if ($.validar.event_f1) $.validar._eventf1();
                        break;
                    case 113:
                        if ($.validar.event_f2) $.validar._eventf2();
                        break;
                    case 115:
                        if ($.validar.event_f4) $.validar._eventf4();
                        break;
                    case 116:
                        if ($.validar.event_f5) $.validar._eventf5();
                        break;
                    case 117:
                        if ($.validar.event_f6) $.validar._eventf6();
                        break;
                    case 118:
                        if ($.validar.event_f7) $.validar._eventf7();
                        break;
                    case 119:
                        if ($.validar.event_f8) $.validar._eventf8();
                        break;
                    case 120:
                        if ($.validar.event_f9) $.validar._eventf9();
                        break;
                    case 121:
                        if ($.validar.event_f10) $.validar._eventf10();
                        break;
                    case 122:
                        if ($.validar.event_f11) $.validar._eventf11();
                        break;
                    default:

                        if (act_longitud > 0)
                            if (max_longitud == act_longitud) {
                                $.validar._siguiente(sig_orden);
                            }
                        break;
                }
            }
        },
        _validarInput: function (e, el) {
            var sig_orden = parseInt($(el).data().orden) + 1
            var ant_orden = parseInt($(el).data().orden) - 1
            var max_longitud = parseInt($(el).attr('maxlength'));
            var requerido = $(el).attr('required') ? $(el).attr('required') : false;
            var act_longitud = $(el).val().length;


            if (
                e.which != 35 &&
                e.which != 36 &&
                e.which != 37 &&
                e.which != 39 &&
                e.which != 16 &&
                e.which != 17 &&
                e.which != 18
                // e.which != 119
            ) {
                switch (e.which) {
                    case 13:
                        if (requerido) {
                            if (act_longitud > 0) $.validar._siguiente(sig_orden)
                            else plantillaToast('', 'Campo obligatorio', null, 'error', 'Error');
                        } else {
                            $.validar._siguiente(sig_orden)
                        }
                        break;
                    case 27:
                        $.validar._anterior(ant_orden);
                        break;
                    case 34:
                        if ($.validar.event_av_pag) $.validar._eventAvPag();
                        break;
                    case 38:
                        if ($.validar.event_flecha_arriba) $.validar._eventFlechaArriba();
                        break;
                    case 40:
                        if ($.validar.event_flecha_abajo) $.validar._eventFlechaAbajo();
                        break;
                    case 112:
                        if ($.validar.event_f1) $.validar._eventf1();
                        break;
                    case 113:
                        if ($.validar.event_f2) $.validar._eventf2();
                        break;
                    case 114:
                        if ($.validar.event_f3) $.validar._eventf3();
                        break;
                    case 115:
                        if ($.validar.event_f4) $.validar._eventf4();
                        break;
                    case 116:
                        if ($.validar.event_f5) $.validar._eventf5();
                        break;
                    case 117:
                        if ($.validar.event_f6) $.validar._eventf6();
                        break;
                    case 118:
                        if ($.validar.event_f7) $.validar._eventf7();
                        break;
                    case 119:
                        if ($.validar.event_f8) $.validar._eventf8();
                        break;
                    case 120:
                        if ($.validar.event_f9) $.validar._eventf9();
                        break;
                    case 121:
                        if ($.validar.event_f10) $.validar._eventf10();
                        break;
                    case 122:
                        if ($.validar.event_f11) $.validar._eventf11();
                        break;
                    default:
                        // if (requerido) {
                        if (act_longitud > 0) {
                            if (max_longitud == act_longitud) {
                                $.validar._siguiente(sig_orden);
                            }
                        }
                        // } else {
                        //     if (max_longitud == act_longitud) $.validar._siguiente(sig_orden);
                        // }
                        break;
                }
            }
        },

        _eventFlechaArriba: function () {
            _fin_validar_form();
            $.validar.event_flecha_arriba($.validar.event_flecha_arriba);
        },

        _eventFlechaAbajo: function () {
            _fin_validar_form();
            $.validar.event_flecha_abajo($.validar.event_flecha_abajo);
        },

        _eventAvPag: function () {
            _fin_validar_form();
            $.validar.event_av_pag($.validar.event_av_pag);
        },
        _eventf1: function () {
            _fin_validar_form();
            $.validar.event_f1($.validar.event_f1);
        },

        _eventf2: function () {
            _fin_validar_form();
            $.validar.event_f2($.validar.event_f2);
        },

        _eventf3: function () {
            _fin_validar_form();
            $.validar.event_f3($.validar.event_f3);
        },

        _eventf4: function () {
            _fin_validar_form();
            $.validar.event_f4($.validar.event_f4);
        },

        _eventf5: () => {
            _fin_validar_form();
            $.validar.event_f5($.validar.event_f5)
        },

        _eventf6: function () {
            _fin_validar_form();
            $.validar.event_f6($.validar.event_f6);
        },

        _eventf7: function () {
            _fin_validar_form();
            $.validar.event_f7($.validar.event_f7);
        },

        _eventf8: function () {
            _fin_validar_form();
            $.validar.event_f8($.validar.event_f8);
        },

        _eventf9: function () {
            _fin_validar_form();
            $.validar.event_f9($.validar.event_f9);
        },

        _eventf10: function () {
            _fin_validar_form();
            $.validar.event_f10($.validar.event_f10);
        },

        _eventf11: function () {
            _fin_validar_form();
            $.validar.event_f11($.validar.event_f11);
        },

        _fin: function () {
            if ($.validar.key == 'keyup') {
                $.validar._keyEvent($.validar.form, 'off');
                $.validar.next($.validar.next);
            } else {
                $.validar._keyEvent2($.validar.form, 'off');
                $.validar.next($.validar.next);
            }
        },

        _inicio: function () {
            if ($.validar.key == 'keyup') {
                $.validar._keyEvent($.validar.form, 'off');
                $.validar.back($.validar.back);
            } else {
                $.validar._keyEvent2($.validar.form, 'off');
                $.validar.back($.validar.back);
            }
        },

        _siguiente: function (orden) {
            var form = $.validar.form;
            var siguiente = parseInt(orden);
            var anterior = parseInt(orden) - 1;
            var siguienteItm = $(form + ' [data-orden="' + siguiente + '"');
            var anteriorItm = $(form + ' [data-orden="' + anterior + '"');

            anteriorItm.attr('disabled', 'true');
            $(anteriorItm)
                .parent('div')
                .next('button.f8-Btn')
                .attr('disabled', 'true');

            $(anteriorItm)
                .parent("div")
                .find("button.f8-Btn")
                .attr('disabled', 'true');

            if (siguienteItm.length > 0) {
                $(siguienteItm)
                    .parent("div")
                    .next("button.f8-Btn")
                    .removeAttr("disabled");

                /* para textarea */
                $(siguienteItm)
                    .parent("div")
                    .find("button.f8-Btn")
                    .removeAttr("disabled");

                if (siguienteItm[0].tagName === 'TEXTAREA') {
                    siguienteItm.removeAttr('disabled').focus();
                } else {
                    siguienteItm.removeAttr('disabled').focus().select();
                }
            } else $.validar._fin();
        },


        _anterior: function (orden) {
            var form = $.validar.form;
            var siguiente = parseInt(orden) + 1;
            var anterior = parseInt(orden);
            var siguienteItm = $(form + ' [data-orden="' + siguiente + '"');
            var anteriorItm = $(form + ' [data-orden="' + anterior + '"');

            siguienteItm.attr('disabled', 'true');
            $(siguienteItm)
                .parent('div')
                .next('button.f8-Btn')
                .attr('disabled', 'true');

            $(siguienteItm)
                .parent("div")
                .find("button.f8-Btn")
                .attr("disabled", "true");

            if (anteriorItm.length > 0) {
                anteriorItm.removeAttr('disabled').focus().select();

                $(anteriorItm)
                    .parent("div")
                    .next("button.f8-Btn")
                    .removeAttr("disabled");

                $(anteriorItm)
                    .parent("div")
                    .find("button.f8-Btn")
                    .removeAttr("disabled");
            }
            else $.validar._inicio();
        }
    }

    validarInputs = function (params, back, next) {
        $.validar.form = params.form;
        $.validar.orden = params.orden ? params.orden : '1';
        $.validar.back = back;
        $.validar.next = next;
        $.validar.event_av_pag = params.event_av_pag ? params.event_av_pag : false;
        $.validar.event_f1 = params.event_f1 ? params.event_f1 : false;
        $.validar.event_f2 = params.event_f2 ? params.event_f2 : false;
        $.validar.event_f3 = params.event_f3 ? params.event_f3 : false;
        $.validar.event_f4 = params.event_f4 ? params.event_f4 : false;
        $.validar.event_f5 = params.event_f5 ? params.event_f5 : false;
        $.validar.event_f6 = params.event_f6 ? params.event_f6 : false;
        $.validar.event_f7 = params.event_f7 ? params.event_f7 : false;
        $.validar.event_f8 = params.event_f8 ? params.event_f8 : false;
        $.validar.event_f9 = params.event_f9 ? params.event_f9 : false;
        $.validar.event_f10 = params.event_f10 ? params.event_f10 : false;
        $.validar.event_f11 = params.event_f11 ? params.event_f11 : false;
        $.validar.event_flecha_abajo = params.event_flecha_abajo ? params.event_flecha_abajo : false;
        $.validar.event_flecha_arriba = params.event_flecha_arriba ? params.event_flecha_arriba : false;
        $.validar.key = params.key ? params.key : 'keyup';
        setTimeout(function () { $.validar.init(); }, 100)
    }

    set_Event_validar = function (form, estado) {
        $.validar._keyEvent(form, estado);
    }

    _fin_validar_form = function () {
        var form = $.validar.form,
            posicion = parseFloat($.validar.orden),
            item = $(form + ' [data-orden="' + posicion + '"');

        item.attr('disabled', 'true');
        $(item).parent("div").next("button.f8-Btn").attr("disabled", "true");
        $(item).parent("div").find("button.f8-Btn").attr('disabled', 'true');
        $.validar._keyEvent($.validar.form, 'off');
    }

})(jQuery);