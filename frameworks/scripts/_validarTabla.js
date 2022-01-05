// Se agregan eventos A, C, P y N - David.M - 25/05/2021
// Se agrega bloqEnter, parametro opcional - David.M - 25/05/2021

(function ($) {
  $.validarTabla = {
    tabla: null,
    orden: null,
    select: null,
    back: null,
    end: null,
    event_f2: false,
    event_f3: false,
    event_A: false,
    event_C: false,
    event_P: false,
    event_N: false,
    cambioFoco: false,
    event_Supr: false,
    Esc: false,
    bloqEnter: false,

    init: function () {
      this._insertCss();
      this._ordenar(this.orden);
      $(".tablaActivo").get(0).scrollIntoView(true);
      this._keyEvent("on");
    },

    _keyEvent: function (estado) {
      switch (estado) {
        case "on":
          $(document).on("keyup", this._validacionKey);
          break;
        case "off":
          $(document).off("keyup", this._validacionKey);
          break;
      }
    },

    _validacionKey: function (e) {
      var elementoActivo = $(".tablaActivo");
      var siguienteItm = elementoActivo.next("tr");
      var anteriorItm = elementoActivo.prev("tr");

      switch (e.which) {
        case 13:
          if ($.validarTabla.bloqEnter) {
            console.log("bloqEnter activado");
          } else {
            $(".tablaActivo").removeClass("tablaActivo");
            if ($.validarTabla.select) {
              $.validarTabla.select(elementoActivo[0]);
            } else {
              console.error("Acción de selección no definida");
            }
            $.validarTabla._fin();
          }

          break;
        case 40:
          $(".tablaActivo").removeClass("tablaActivo");
          if (siguienteItm.length > 0) {
            $(siguienteItm).addClass("tablaActivo");
            $(".tablaActivo").get(0).scrollIntoView(true);
            if ($.validarTabla.cambioFoco) $.validarTabla.cambioFoco(siguienteItm[0].rowIndex);
          } else {
            if ($.validarTabla.end) $.validarTabla.end($.validarTabla.end);
            else console.error("Acción de finalización no definida");
            $.validarTabla._fin();
          }
          break;
        case 27:
          if ($.validarTabla.Esc) {
            $(".tablaActivo").removeClass("tablaActivo");
            $.validarTabla.Esc($.validarTabla.Esc);
            $.validarTabla._fin();
          } else console.error("Acción de escape no definida");
          break;
        case 38:
          $(".tablaActivo").removeClass("tablaActivo");
          if (anteriorItm.length > 0) {
            $(anteriorItm).addClass("tablaActivo");
            $(".tablaActivo").get(0).scrollIntoView(true);
            if ($.validarTabla.cambioFoco) $.validarTabla.cambioFoco(anteriorItm[0].rowIndex);
          } else {
            if ($.validarTabla.back) $.validarTabla.back($.validarTabla.back);
            else console.error("Acción de salida no definida");
            $.validarTabla._fin();
          }
          break;
        case 113:
          if ($.validarTabla.event_f2) {
            $(".tablaActivo").removeClass("tablaActivo");
            $.validarTabla.event_f2(elementoActivo[0]);
            $.validarTabla._fin();
          }
          break;
        case 114:
          if ($.validarTabla.event_f3) {
            $(".tablaActivo").removeClass("tablaActivo");
            $.validarTabla.event_f3($.validarTabla.event_f3);
            $.validarTabla._fin();
          }
          break;
        case 46:
          if ($.validarTabla.event_Supr) {
            CON851P(
              "¿Seguro que desea eliminar este elemento de la tabla?",
              () => {},
              () => {
                $.validarTabla._fin();
                $(".tablaActivo").removeClass("tablaActivo");
                $.validarTabla.event_Supr(elementoActivo[0]);
              }
            );
          }
        case 65:
          if ($.validarTabla.event_A) {
            $(".tablaActivo").removeClass("tablaActivo");
            $.validarTabla.event_A(elementoActivo[0]);
            $.validarTabla._fin();
          }
          break;
        case 67:
          if ($.validarTabla.event_C) {
            $(".tablaActivo").removeClass("tablaActivo");
            $.validarTabla.event_C(elementoActivo[0]);
            $.validarTabla._fin();
          }
          break;
        case 80:
          if ($.validarTabla.event_P) {
            $(".tablaActivo").removeClass("tablaActivo");
            $.validarTabla.event_P(elementoActivo[0]);
            $.validarTabla._fin();
          }
          break;
        case 78:
          if ($.validarTabla.event_N) {
            $(".tablaActivo").removeClass("tablaActivo");
            $.validarTabla.event_N(elementoActivo[0]);
            $.validarTabla._fin();
          }
          break;
      }
    },

    _fin: function () {
      this._keyEvent("off");
    },

    _ordenar: function (orden) {
      var elementosTabla = $($.validarTabla.tabla + " tbody tr");
      var siguienteItm = elementosTabla[orden] ? elementosTabla[orden] : false;

      $(".tablaActivo").removeClass("tablaActivo");
      if (siguienteItm) $(siguienteItm).addClass("tablaActivo");
    },

    _insertCss: function () {
      $(
        "" +
          "<style type='text/css' id='style_validarTabla'>" +
          ".tablaActivo > td { background:  #2e76b5!important; color: #FFF!important;}" +
          "</style>"
      ).appendTo("head");
    },
  };

  validarTabla = function (params, select, back, end) {
    $.validarTabla.tabla = params.tabla || false;
    $.validarTabla.orden = params.orden || "0";
    $.validarTabla.select = select || false;
    $.validarTabla.back = back || false;
    $.validarTabla.end = end || false;
    $.validarTabla.event_f3 = params.event_f3 || false;
    $.validarTabla.event_f2 = params.event_f2 || false;
    $.validarTabla.event_A = params.event_A || false;
    $.validarTabla.event_C = params.event_C || false;
    $.validarTabla.event_P = params.event_P || false;
    $.validarTabla.event_N = params.event_N || false;
    $.validarTabla.cambioFoco = params.cambioFoco || false;
    $.validarTabla.event_Supr = params.Supr || false;
    $.validarTabla.Esc = params.Esc || false;
    $.validarTabla.bloqEnter = params.bloqEnter || false;
    if ($.validarTabla.tabla)
      setTimeout(function () {
        $.validarTabla.init();
      }, 100);
    else alert("Ninguna tabla definida para validar.");
  };
})(jQuery);
