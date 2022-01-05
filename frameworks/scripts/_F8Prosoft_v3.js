var CONSOLE = '';
(function ($) {

	$.ventanaDatos = {
		overlay_id: 'overlay-f8',
		content_id: 'content-f8',
		tabla_id: 'datos',
		css_id: 'css_ventanaDatos',
		titulo: 'Ventana de búsqueda',
		data_table: null,
		columnas: null,
		data: null,
		callback: null,
		orden: false,
		callback_esc: false,
		tipo: 'json',
		totalizar: null,
		ancho_usuario: null,
		pluss: null,
		arrayData: [],
		event_f3: null,
		event_f6: null,
		event_f8: null,
		event_f9: null,
		event_A: null,
		event_C: null,
		event_P: null,
		event_N: null,
		lenguaje: {
			lengthMenu: "Mostrar _MENU_ por página",
			zeroRecords: "No hay datos disponibles",
			info: "Página _PAGE_ de _PAGES_",
			infoEmpty: "No hay datos disponibles",
			infoFiltered: "(filtrado de  _MAX_ registros)",
			loadingRecords: "Cargando...",
			processing: "Procesando...",
			sSearch: 'Buscar:',
			paginate: {
				first: "Primera",
				last: "Final",
				next: "Siguiente",
				previous: "Anterior"
			},
		},
		footer_row: null,
		footer_global: null,
		bloqEnter: null,


		_init: function () {
			if (this._open()) {

				// Insertar tabla
				var thead = $('<thead/>')
					.append($('<tr/>'));

				$('#' + this.content_id + '_body').html(
					$('<table/>', {
						id: $.ventanaDatos.tabla_id,
						class: 'display responsive nowrap'
					})
						.css({ width: '100%', })
						.append(thead)


				)
				if (this._addColumnas_head($.ventanaDatos.columnas)) this._initDataTable();
			}
		},

		_initDataTable: function () {
			var columnas_show = [];
        	$.ventanaDatos.columnas.forEach(function (col) {
				typeof col == 'string' ? columnas_show.push({data: col}) : columnas_show.push({data: col.value});
        	});

	  		if ($.ventanaDatos.footer_global) {
      			$(`#${this.content_id}_footer`).show();
      			$(`#${this.content_id}_footer`).append(
        			`<h5 id='footer' style='text-align: center; font-weight: 600; margin-top: -2px; color: #476fad'>${$.ventanaDatos.footer_global}</h5>`,
      			);
    		} else if ($.ventanaDatos.footer_row) {
	      		$(`#${this.content_id}_footer`).show();
      			$(`#${this.content_id}_footer`).append(
	        		"<h5 id='footer' style='text-align: center; font-weight: 600; margin-top: -2px; color: #476fad'></h5>",
      			);
    		} else {
	      		$(`#${this.content_id}_footer`).hide();
    		}
			// if (!$.ventanaDatos.suma) {
			// 	$(`#${this.content_id}_footer`).hide()
			// } else {
			// 	$(`#${this.content_id}_footer`).append('<div class="col-md-12 col-sm-12 col-xs-12">' +
			// 		'<div class="inline-inputs">' +
			// 		'<label class="col-md-6 col-sm-6 col-xs-12">Centro costo:</label>' +
			// 		'<div class="input-group col-md-6 col-sm-6 col-xs-12">' +
			// 		'<input id="saldoF8" maxlength="12" class="form-control col-md-12 col-sm-12 col-xs-12">' +
			// 		'</div>' +
			// 		'</div>' +
			// 		'</div>')
			// 	$('#saldoF8').val('0');
			// }

			this.data_table = $('#' + $.ventanaDatos.tabla_id).DataTable({
				data: $.ventanaDatos.data,
				columns: columnas_show,
				responsive: true,
				scrollY: '50vh',
				scrollCollapse: true,
				language: $.ventanaDatos.lenguaje,
				ordering: $.ventanaDatos.orden,
				select: true,
				createdRow: function (row, data, index) {
					var color = $.ventanaDatos.data[index].color || false;

					$(row).css({ cursor: "pointer" }).attr("data-index", index);
					if (color) $(row).addClass(`${$.ventanaDatos._formatColor(color)}`);
				},
				initComplete: function () {
					var api = this.api();

					// Evento click en fila
					api.$('td').click(function () {
						var items = [];
						if ($.ventanaDatos.pluss) {
							if ($.ventanaDatos.arrayData != void 0 && $.ventanaDatos.arrayData.length > 0) {
								for (i in $.ventanaDatos.arrayData) {
									// console.log($.ventanaDatos.arrayData[i], 'data_ventanaDatos')
									if ($.ventanaDatos.arrayData[i] != undefined) {
										let x = $.ventanaDatos.arrayData.indexOf(undefined);
										$.ventanaDatos.arrayData.splice(x, x);
									}
									var indx = $.ventanaDatos.arrayData[i].attributes[0].value;
									// console.log(indx, 'value')
									items.push(indx);
								}
							} else {
								var indx = $(".focus-table")[0].attributes[0].value;
								items[0] = indx;
							}
							$.ventanaDatos._sendData(items);
						} else {
							var indx = $(this).attr('tabindex');
							// Se bloquea click, parametro bloqEnter - David.M
							if (typeof indx === typeof undefined && !$.ventanaDatos.bloqEnter) {
								var parent = $(this).closest('tr');
								var item = $(parent).data().index;
								$.ventanaDatos._sendData(item);
							}
						}
					})

					// Reset foco table
					api.on('page search', function () {
						$(".focus-table").removeClass("focus-table");
					})

					// Set focus search
					setTimeout(() => {
						if ($.ventanaDatos.foco) {
							elementoActive = $(".focus-table");
							console.log($.ventanaDatos.tabla_id);
							elemento = $("#" + $.ventanaDatos.tabla_id + " tbody tr:visible");
							if (elementoActive.length === 0) $(elemento[0]).addClass('focus-table');
							else if (elementoActive.nextAll('tr').length != 0) {
								let nextElement = elementoActive.nextAll('tr')[0];
								if (nextElement.classList.contains('focus-table select-table') == true) {
									$(nextElement).addClass('focus-table ');
									elementoActive.addClass('select-table focus-table');
								} else {
									elementoActive.removeClass('focus-table');
									$(nextElement).addClass('focus-table');
								}
							}
							$(".focus-table").get(0).scrollIntoView(true);
						} else {
							$('#' + $.ventanaDatos.tabla_id + '_filter label input').focus();
						}
						if ($.ventanaDatos.pluss) {
							$('#' + $.ventanaDatos.tabla_id + '_filter label input').keydown(function (e) {
								if (e.keyCode == 107 || e.keyCode == 187) {
									e.preventDefault();
								}
							})
						}
					}, 500);
					// Init teclas
					$.ventanaDatos._initControls(true);
				}
			});
		},
		_formatColor: function (value) {
			var retornar = '';
			switch (parseInt(value)) {
				case 1: retornar = 'select-red'; break;
				case 2: retornar = 'select-green'; break;
				case 3: retornar = 'select-yellow'; break;
				case 4: retornar = 'select-brown'; break;
				case 5: retornar = 'select-blue'; break;
			}
			return retornar;
		},
		_sendData: function (idx) {
			if ($.ventanaDatos.pluss) {
				let data = $.ventanaDatos.data;
				let rData = [];
				for (i in idx) rData[i] = data[idx[i]];
				$.ventanaDatos._close();
				$.ventanaDatos.callback(rData);
			} else {
				$.ventanaDatos._close();
				$.ventanaDatos.callback($.ventanaDatos.data[idx]);
			}
		},
		_event_f9(idx) {
			if ($.ventanaDatos.event_f9) {
				var data = $.ventanaDatos.data[idx];
				$.ventanaDatos._close();
				$.ventanaDatos.event_f9(data);
			}
		},
		_event_f3(idx) {
			if ($.ventanaDatos.event_f3) {
				var data = $.ventanaDatos.data[idx];
				$.ventanaDatos._close();
				$.ventanaDatos.event_f3(data);
			}
		},
		_event_f6(idx) {
			if ($.ventanaDatos.event_f6) {
				var data = $.ventanaDatos.data[idx];
				$.ventanaDatos._close();
				$.ventanaDatos.event_f6(data);
			}
		},
		_event_f8(idx) {
			if ($.ventanaDatos.event_f8) {
				var data = $.ventanaDatos.data[idx];
				$.ventanaDatos._close();
				$.ventanaDatos.event_f8(data);
			}
		},
		_event_A(idx) {
			if ($.ventanaDatos.event_A) {
				var data = $.ventanaDatos.data[idx];
				$.ventanaDatos._close();
				$.ventanaDatos.event_A(data);
			}
		},
		_event_C(idx) {
			if ($.ventanaDatos.event_C) {
				var data = $.ventanaDatos.data[idx];
				$.ventanaDatos._close();
				$.ventanaDatos.event_C(data);
			}
		},
		_event_P(idx) {
			if ($.ventanaDatos.event_P) {
				var data = $.ventanaDatos.data[idx];
				$.ventanaDatos._close();
				$.ventanaDatos.event_P(data);
			}
		},
		_event_N(idx) {
			if ($.ventanaDatos.event_N) {
				var data = $.ventanaDatos.data[idx];
				$.ventanaDatos._close();
				$.ventanaDatos.event_N(data);
			}
		},
		_close: function () {
			$('#' + $.ventanaDatos.overlay_id).remove();
			$('#' + $.ventanaDatos.css_id).remove();
			$.ventanaDatos._initControls(false);
			$.ventanaDatos.data_table.destroy();
			document.getElementsByTagName('body')[0].style.removeProperty('overflow-y')
		},

		_initControls: function (estado) {
			switch (estado) {
				case true:
					$(document).on('keydown', this._validarKey);
					break;
				case false:
					$(document).off('keydown', this._validarKey);
					break;
			}
		},

		_validarKey: function (e) {
			var key = e.which;
			var item = $(".focus-table").attr('data-index') || false;
			switch (key) {
				case 34:
					$('#' + $.ventanaDatos.tabla_id + '_paginate li.next a').click();
					break;
				case 107:
				case 187:
					if ($.ventanaDatos.pluss) {
						$.ventanaDatos._pluss();
					}
					break;
				case 33:
					$('#' + $.ventanaDatos.tabla_id + '_paginate li.prev a').click();
					break;
				case 37:
				case 38:
					$.ventanaDatos._prev();
					if($.ventanaDatos.footer_row) $.ventanaDatos.set_footer_row();
					break;
				case 39:
				case 40:
					$.ventanaDatos._next();
					if($.ventanaDatos.footer_row) $.ventanaDatos.set_footer_row();
					break;
				case 13:
					if ($(".focus-table").length > 0) $(".focus-table td:nth-child(2)").click();
					break;
				case 114:
					if (item && $.ventanaDatos.event_f3) $.ventanaDatos._event_f3(item);
					break;
				case 117:
					if (item && $.ventanaDatos.event_f6) $.ventanaDatos._event_f6(item);
					break;
				case 119:
					if (item && $.ventanaDatos.event_f8) $.ventanaDatos._event_f8(item);
					break;
				case 120:
					if (item && $.ventanaDatos.event_f9) $.ventanaDatos._event_f9(item);
					break;
				case 27:
					// Esc
					if ($.ventanaDatos.callback_esc) {
						setTimeout(function () {
							$.ventanaDatos.callback_esc($.ventanaDatos.callback_esc);
						}, 200)
					}
					$.ventanaDatos._close();
					break;
				case 65:
					if (item && $.ventanaDatos.event_A) $.ventanaDatos._event_A(item);
					break;
				case 67:
					if (item && $.ventanaDatos.event_C) $.ventanaDatos._event_C(item);
					break;
				case 80:
					if (item && $.ventanaDatos.event_P) $.ventanaDatos._event_P(item);
					break;
				case 78:
					if (item && $.ventanaDatos.event_N) $.ventanaDatos._event_N(item);
					break;
			}
		},
		set_footer_row: function() {
			var item = $(".focus-table").attr('data-index') || false;
			var data = $.ventanaDatos.data[item];
			if(data) {
				if(data.footer) {
					let footer = data.footer.join(" ");
					$("#footer").text(footer);
				} else $("#footer").text("");
			} else $("#footer").text("");
		},
		_pluss: function () {
			el = $(".focus-table")[0];
			if (el.classList.contains('select-table')) {
				el.classList.remove('select-table')
				$.ventanaDatos.arrayData = $.ventanaDatos.arrayData.map(obj => {
					let rObj = [];
					if (obj.classList.contains('select-table') && obj != undefined
						&& obj.children[0].textContent != el.children[0].textContent && el.nodeName == 'TR') {
						rObj = obj;
						return rObj
					}
				})
			} else {
				el.classList.add('select-table')
				$.ventanaDatos.arrayData.push(el);
				CONSOLE = el;
				let valor = el.cells[4].innerText.replace(/,/g, '');
				let total = parseInt($('#saldoF8').val()) + parseInt(valor);
				$('#saldoF8').val(valor);
			}
		},
		_prev: function () {
			elementoActive = $(".focus-table");
			elemento = $("#" + this.tabla_id + " tbody tr:visible");
			if (elementoActive.length === 0) $(elemento[0]).addClass('focus-table');
			else if (elementoActive.prevAll('tr').length != 0) {
				let nextElement = elementoActive.prevAll('tr')[0];
				if (nextElement.classList.contains('focus-table select-table') == true) {
					$(nextElement).addClass('focus-table ');
					elementoActive.addClass('select-table focus-table');
				} else {
					elementoActive.removeClass('focus-table');
					$(nextElement).addClass('focus-table');
				}
			}
			$(".focus-table").get(0).scrollIntoView(true);
		},
		_next: function () {
			elementoActive = $(".focus-table");
			elemento = $("#" + this.tabla_id + " tbody tr:visible");
			if (elementoActive.length === 0) $(elemento[0]).addClass('focus-table');
			else if (elementoActive.nextAll('tr').length != 0) {
				let nextElement = elementoActive.nextAll('tr')[0];
				if (nextElement.classList.contains('focus-table select-table') == true) {
					$(nextElement).addClass('focus-table ');
					elementoActive.addClass('select-table focus-table');
				} else {
					elementoActive.removeClass('focus-table');
					$(nextElement).addClass('focus-table');
				}
			}
			$(".focus-table").get(0).scrollIntoView(true);
		},

		_addColumnas_head: function (data) {
			var columnas = data;
			columnas.forEach(function (val) {
				var row_column = typeof val == 'string' ? $('<th/>').html(val) : $('<th/>').html(val.label);
				$('table#' + $.ventanaDatos.tabla_id + ' thead tr')
					.append(row_column);

			});

			return true;
		},

		_open: function () {
			var wWindow = $(window).width();

			$('body').css({'overflow-y': 'hidden'})
			// Crear overlay F8
			$('<div/>', {
				id: this.overlay_id
			})
				.css({
					width: '100%',
					height: '100%',
					background: 'rgba(0,0,0,0.2)',
					position: 'fixed',
					top: 0,
					display: 'flex',
					'z-index': '99999999',
					'align-items': 'center'

				})
				.appendTo('body');
			// !End overlay F8

			var ancho_tmp = this.ancho_usuario || '800px';
			// Box contenido F8
			$('<div/>', {
				id: this.content_id
			})
				.css({
					width: wWindow < 426 ? '95%' : ancho_tmp,
					background: '#FFF',
					margin: '0 auto',
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
					'box-sizing': 'border-box'
				})
				.html($.ventanaDatos.titulo)
				.appendTo('#' + this.content_id);


			// Body
			$('<div/>', {
				id: this.content_id + '_body'
			})
				.css({
					width: '100%',
					padding: '15px',
					'overflow-x': 'auto',
					'box-sizing': 'border-box'
				})
				.html('Contenido')
				.appendTo('#' + this.content_id);

			$('<div/>', {
				id: this.content_id + '_footer'
			})
				.css({
					width: '100%',
					padding: '0px',
					'overflow-x': 'auto',
					'box-sizing': 'border-box'
				})
				.appendTo('#' + this.content_id);

			// Responsive
			$(window).resize(function () {
				if ($(window).width() < 426) {
					$('#' + $.ventanaDatos.content_id)
						.css({ width: '95%' });
				} else {
					$('#' + $.ventanaDatos.content_id)
						.css({ width: ancho_tmp });
				}
			});
			// End responsive


			//Crear clase
			$("<style/>", {
				id: $.ventanaDatos.css_id
			})
				.prop("type", "text/css")
				.html("\
											table tbody tr.focus-table td.sorting_1, \
											table tbody tr.focus-table td{\
													background-color: #2196F3!important;\
													color: #FFF;\
											}\
											table tbody tr.select-table td.sorting_1, \
											table tbody tr.select-table td{\
												background-color: #1ba056;\
												color: #FFF;\
											}\
											table tbody tr.select-green td.sorting_1, \
											table tbody tr.select-green td{\
												background-color: #1ba056;\
												color: #FFF;\
											}\
											table tbody tr.select-red td.sorting_1, \
											table tbody tr.select-red td{\
												background-color: #eb4d4b;\
												color: #FFF;\
											}\
											table tbody tr.select-yellow td.sorting_1, \
											table tbody tr.select-yellow td{\
												background-color: #FFA726;\
												color: #FFF;\
											}\
											table tbody tr.select-brown td.sorting_1, \
											table tbody tr.select-brown td{\
												background-color: #8F5C2B;\
												color: #FFF;\
											}\
											table tbody tr.select-blue td.sorting_1, \
											table tbody tr.select-blue td{\
												background-color: #476fad ;\
												color: #FFF;\
											}\
										}")
				.appendTo("head");

			$('.modal').removeAttr('tabindex')

			return true;
		}
	}

	_ventanaDatos = function (params) {
		$.ventanaDatos.titulo = params.titulo || $.ventanaDatos.titulo;
		$.ventanaDatos.totalizar = params.totalizar || $.ventanaDatos.totalizar;
		$.ventanaDatos.pluss = params.pluss || $.ventanaDatos.pluss;
		$.ventanaDatos.tipo = 'json';
		$.ventanaDatos.arrayData = [];
		$.ventanaDatos.tipo = params.tipo || $.ventanaDatos.tipo;
		$.ventanaDatos.event_f3 = params.event_f3 || false;
		$.ventanaDatos.event_f6 = params.event_f6 || false;
		$.ventanaDatos.event_f8 = params.event_f8 || false;
		$.ventanaDatos.event_f9 = params.event_f9 || false;
		$.ventanaDatos.event_A = params.event_A || false;
		$.ventanaDatos.event_C = params.event_C || false;
		$.ventanaDatos.event_P = params.event_P || false;
		$.ventanaDatos.event_N = params.event_N || false;
		$.ventanaDatos.foco = params.foco || false;
		$.ventanaDatos.footer_row = params.footer_row || false;
		$.ventanaDatos.footer_global = params.footer_global || false;
		$.ventanaDatos.bloqEnter = params.bloqEnter || false;

		if (!params.columnas) {
			alert('Columnas sin definir');
			console.error('Falta definir las columnas a mostrar');
		} else if (!params.data) {
			alert('Datos sin definir');
			console.error('Falta definir los datos de la ventana');
		} else if (!params.callback) {
			alert('Callback sin definir');
			console.error('Falta definir una función para retornar los datos');
		} else {
			$.ventanaDatos.columnas = params.columnas;
			$.ventanaDatos.data = params.data;
			$.ventanaDatos.callback = params.callback;
			$.ventanaDatos.orden = params.orden || false;
			$.ventanaDatos.callback_esc = params.callback_esc;
			$.ventanaDatos.ancho_usuario = params.ancho || null
			$.ventanaDatos._init();
		}
	}
})(jQuery);