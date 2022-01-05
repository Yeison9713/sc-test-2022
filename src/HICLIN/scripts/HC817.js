var $_HC817 = [];
$_HC817.NIT_USU = $_USUA_GLOBAL[0].NIT;

function _ventanaF7_HC817() {
	var fuente = '<div id="F7_HC" style="width: 640px">' +
		'<div class="col-md-12">' +
		'<div class="portlet light no-padding">' +
		'<div class="portlet-body no-padding">' +
		'<div class="form-group col-md-12 col-sm-12 col-xs-12 no-padding" style="margin: 0 auto;">' +

		// INPUT ATENDIDOS
		'<div class="col-md-12">' +

		'<label class="col-md-12">Unidad de servicio</label>' +
		'<div class="col-md-12 no-padding" id="validarUnserv_HC817" style="margin-top: 5px;">' +
		'<div class="inline-inputs">' +
		'<div class="input-group col-md-2 col-sm-2 col-xs-2"> ' +
		'<input type="text" id="unserv_HC817" class="form-control" disabled="disabled" maxlength="2" data-orden="1" style="text-align: center" />' +
		'</div>' +
		'<button id="unservBtn_HC817" type="button" class="btn col-md-1 col-sm-1 col-xs-1 f8-Btn"> <i class="icon-magnifier"></i></button>' +
		'<div class="input-group col-md-9 col-sm-9 col-xs-9" style="margin-left: 10px;"> ' +
		'<input type="text" id="descripUnserv_HC817" class="form-control col-md-6" disabled="disabled" maxlength="1" data-orden="" style="text-align: left" />' +
		'</div>' +
		'</div>' +
		'</div>' +

		'</div>' +
		// 

		// INPUTS FECHA INICIAL
		'<div class="col-md-12" id="divFechaIni_HC817">' +
		'<div class="salto-linea"></div>' +

		'<div class="col-md-12 no-padding">' +
		'<div class="col-md-12 col-sm-12 col-xs-12 no-padding" id="validarFechaIni_HC817">' +
		'<div class="col-md-3 no-padding">' +
		'<div class="col-md-12 box-center no-padding">' +
		'<label style="margin-top: 27px; margin-bottom: 6px;" box-center>Fecha Inicial:</label>' +
		'</div>' +
		'</div>' +
		'<div class="col-md-3 col-sm-3 col-xs-3">' +
		'<label class="col-md-12 col-sm-6 col-xs-6 text-center">Año:</label>' +
		'<div class="input-group col-md-12 col-sm-5 col-xs-5">' +
		'<input id="añoIni_HC817" type="number"' +
		'class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="4" disabled="disabled"' +
		'data-orden="1" required="true" style="text-align: center;">' +
		'</div>' +
		'</div>' +
		'<div class="col-md-3 col-sm-3 col-xs-3">' +
		'<label class="col-md-12 col-sm-6 col-xs-6 text-center">Mes:</label>' +
		'<div class="input-group col-md-12 col-sm-5 col-xs-5">' +
		'<input id="mesIni_HC817" type="number"' +
		'class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" disabled="disabled"' +
		'data-orden="2" required="true" style="text-align: center;">' +
		'</div>' +
		'</div>' +
		'<div class="col-md-3 col-sm-3 col-xs-3">' +
		'<label class="col-md-12 col-sm-12 col-xs-6 text-center">Dia:</label>' +
		'<div class="input-group col-md-12 col-sm-5 col-xs-5">' +
		'<input id="diaIni_HC817" type="number"' +
		'class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" disabled="disabled"' +
		'data-orden="3" required="true" style="text-align: center;">' +
		'</div>' +
		'</div>' +
		'</div>' +
		'</div>' +

		'</div>' +
		// 

		// INPUTS FECHA FINAL
		'<div class="col-md-12" id="divFechaFin_HC817">' +
		'<div class="salto-linea"></div>' +

		'<div class="col-md-12 no-padding">' +
		'<div class="col-md-12 col-sm-12 col-xs-12 no-padding" id="validarFechaFin_HC817">' +
		'<div class="col-md-3 no-padding">' +
		'<div class="col-md-12 box-center no-padding">' +
		'<label style="margin-top: 27px; margin-bottom: 6px;" box-center>Fecha Final:</label>' +
		'</div>' +
		'</div>' +
		'<div class="col-md-3 col-sm-3 col-xs-3">' +
		'<label class="col-md-12 col-sm-6 col-xs-6 text-center">Año:</label>' +
		'<div class="input-group col-md-12 col-sm-5 col-xs-5">' +
		'<input id="añoFin_HC817" type="number"' +
		'class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="4" disabled="disabled"' +
		'data-orden="1" required="true" style="text-align: center;">' +
		'</div>' +
		'</div>' +
		'<div class="col-md-3 col-sm-3 col-xs-3">' +
		'<label class="col-md-12 col-sm-6 col-xs-6 text-center">Mes:</label>' +
		'<div class="input-group col-md-12 col-sm-5 col-xs-5">' +
		'<input id="mesFin_HC817" type="number"' +
		'class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" disabled="disabled"' +
		'data-orden="2" required="true" style="text-align: center;">' +
		'</div>' +
		'</div>' +
		'<div class="col-md-3 col-sm-3 col-xs-3">' +
		'<label class="col-md-12 col-sm-12 col-xs-6 text-center">Dia:</label>' +
		'<div class="input-group col-md-12 col-sm-5 col-xs-5">' +
		'<input id="diaFin_HC817" type="number"' +
		'class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" disabled="disabled"' +
		'data-orden="3" required="true" style="text-align: center;">' +
		'</div>' +
		'</div>' +
		'</div>' +
		'</div>' +

		'</div>' +
		// 

		'</div>' +

		'</div>' +
		'</div>' +
		'</div>' +
		'<div style="clear:both;"></div>' +
		'</div>'

	$_HC817.dialogo = bootbox.dialog({
		title: 'CONSULTA DE HISTORIAS POR FECHA',
		message: fuente,
		size: 'large',
		closeButton: false,
		buttons: {
			main: {
				label: "Aceptar",
				className: "blue hidden",
				callback: function () {

				}
			}
		},
	});

	$_HC817.dialogo.on('shown.bs.modal', async function (e) {
		$('.modal-content').css({ 'position': 'fixed', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%, -50%)' })
		var h5 = document.createElement("h5");
		h5.innerHTML = "F8 Consultar cod. unidades &nbsp&nbsp&nbsp ** Busca todos los hospitalizados";
		$(".modal-footer").append(h5);
		$('.modal-footer').css({ 'height': '50px', 'margin-top': '-3px', 'color': '#476fad' })
		$('.modal-header h4').css({ 'color': '#476fad', 'font-w eight': '500' })
		$('h5').css({ 'margin-top': '-3px', 'float': 'left' });

		loader('show');
		await cargarArchivos_HC817();
		loader('hide');
		iniciar_HC817();

		_toggleF8([{
			input: 'unserv', app: 'HC817', funct: (e) => {
				if (e.type == "keydown" && e.which == 119 || e.type == 'click') {

					ventanaUnidades_HC817();
				}
			}
		},])
	})
}

async function iniciar_HC817() {
	$_HC817.fecha_w = moment().format('YYYYMMDD');
	var sig_w = $_HC817.fecha_w.substring(0, 2);
	var año_w = $_HC817.fecha_w.substring(2, 4);
	var mes_w = $_HC817.fecha_w.substring(4, 6);
	var dia_w = $_HC817.fecha_w.substring(6, 8);
	if (parseInt($_HC817.fecha_w.substring(2, 4)) > 90) {
		sig_w = 19;
	} else {
		sig_w = 20;
	}

	if (parseInt(dia_w) > 1) {
		dia_w = parseInt(dia_w) - 1;
	} else {
		if (parseInt(mes_w) > 1) {
			mes_w = parseInt(mes_w) - 1;
			switch (parseInt(mes_w)) {
				case 01: dia_w = 31; break;
				case 02: dia_w = 28; break;
				case 03: dia_w = 31; break;
				case 04: dia_w = 30; break;
				case 05: dia_w = 31; break;
				case 06: dia_w = 30; break;
				case 07: dia_w = 31; break;
				case 08: dia_w = 31; break;
				case 09: dia_w = 30; break;
				case 10: dia_w = 31; break;
				case 11: dia_w = 30; break;
				case 12: dia_w = 31; break;
			}
		} else {
			año_w = parseInt(año_w) - 1;
			mes_w = 12;
			dia_w = 31;
		}
	}

	$_HC817.fecha_w = sig_w.toString() + año_w.toString() + mes_w.toString() + dia_w.toString();
	validarUnserv_HC817();
}

async function validarUnserv_HC817() {
	validarInputs(
		{
			form: "#validarUnserv_HC817",
			orden: '1',
		},
		() => {
			$('[data-bb-handler="main"]').click()
			validarPaciente();
		},
		async () => {
			var unid = document.querySelector('#unserv_HC817').value.toUpperCase();
			if (unid == '**') {
				document.querySelector('#descripUnserv_HC817').value = 'TODOS LOS HOSPITALIZADOS';
				validarFechaInicial_HC817('1');
			} else {
				var busq = await $_HC817._unserv.find(e => e.COD.trim() == unid.trim());
				if (busq == undefined) {
					CON851('01', '01', null, 'error', 'error');
					validarUnserv_HC817();
				} else {
					document.querySelector('#descripUnserv_HC817').value = busq.DESCRIP;
					validarFechaInicial_HC817('1');
				}
			}
		}
	)
}

async function traerListadoF7_HC817(unserv, fechaIni, fechaFin) {
	loader('show');
	await postData({ datosh: datosEnvio() + unserv + '|' + fechaIni + '|' + fechaFin + '|' }, get_url("APP/HICLIN/HC817.DLL"))
		.then(async (data) => {
			$_HC817.arrayF7 = data['F7-HC'];
			$_HC817.arrayF7.pop();
			await _mostrarListadoF7_HC817();
		})
		.catch((err) => {
			console.log(err, 'error')
			validarUnserv_HC817();
			loader('hide')
		});
	loader('hide');
}

async function _mostrarListadoF7_HC817() {
	for (var i in $_HC817.arrayF7) {
		$_HC817.arrayF7[i]['Paciente'] = $_HC817.arrayF7[i]['DESCRIP_PACI'].trim();
		$_HC817.arrayF7[i]['Hab'] = $_HC817.arrayF7[i]['HAB'];
		$_HC817.arrayF7[i]['Folio'] = $_HC817.arrayF7[i]['FOLIO'];
		$_HC817.arrayF7[i]['Serv'] = $_HC817.arrayF7[i]['SERV'];
		$_HC817.arrayF7[i]['Fecha'] = $_HC817.arrayF7[i]['FECHA'];
		$_HC817.arrayF7[i]['Medico'] = $_HC817.arrayF7[i]['MEDICO'];

		var aux = '';
		switch ($_HC817.arrayF7[i]['EDAD'].substring(0, 1)) {
			case 'A': aux = ' Años'; break;
			case 'M': aux = ' Meses'; break;
			case 'D': aux = ' Dias'; break;
		}
		$_HC817.arrayF7[i]['EDAD'].substring(1, 4).trim() == '' ? $_HC817.arrayF7[i]['EDAD'] = $_HC817.arrayF7[i]['EDAD'].substring(0, 1) + '0  ' : false;
		$_HC817.arrayF7[i]['Edad'] = parseFloat($_HC817.arrayF7[i]['EDAD'].substring(1, 4)) + aux;
	}

	if ($_HC817.arrayF7.length < 1) {
		CON851('08', '08', null, 'error', 'error');
		validarUnserv_HC817();
	} else {
		_ventanaDatos({
			titulo: `CONSULTA DE HISTORIAS POR FECHA`,
			columnas: ['Paciente', 'Edad', 'Hab', 'Folio', 'Serv', 'Fecha', 'Medico'],
			ancho: 1300,
			data: $_HC817.arrayF7,
			callback_esc: function () {
				validarUnserv_HC817();
			},
			callback: function (data) {
				$('[data-bb-handler="main"]').click();
				cargarDatosPaci(data.LLAVE.trim())
			}
		});
	}
}

function validarFechaInicial_HC817(orden) {
	if(document.querySelector('#mesIni_HC817').value.trim() < 1) {
		document.querySelector('#añoIni_HC817').value = $_HC817.fecha_w.substring(0,4);
		document.querySelector('#mesIni_HC817').value = $_HC817.fecha_w.substring(4,6);
		document.querySelector('#diaIni_HC817').value = $_HC817.fecha_w.substring(6,8);
	}
	validarInputs(
		{
			form: "#validarFechaIni_HC817",
			orden: orden,
		},
		() => {
			validarUnserv_HC817()
		},
		async () => {
			var año = document.querySelector('#añoIni_HC817').value;
			var mes = document.querySelector('#mesIni_HC817').value;
			var dia = document.querySelector('#diaIni_HC817').value;
			$_HC817.fechaIni = año.toString() + mes.toString() + dia.toString();
			validarFechaFinal_HC817('1');
		}
	)
}

function validarFechaFinal_HC817(orden) {
	if(document.querySelector('#mesFin_HC817').value.trim() < 1) {
		document.querySelector('#añoFin_HC817').value = document.querySelector('#añoIni_HC817').value;
		document.querySelector('#mesFin_HC817').value = document.querySelector('#mesIni_HC817').value;
		document.querySelector('#diaFin_HC817').value = document.querySelector('#diaIni_HC817').value;
	}
	validarInputs(
		{
			form: "#validarFechaFin_HC817",
			orden: orden,
		},
		() => {
			validarFechaInicial_HC817('3')
		},
		async () => {
			var año = document.querySelector('#añoFin_HC817').value;
			var mes = document.querySelector('#mesFin_HC817').value;
			var dia = document.querySelector('#diaFin_HC817').value;
			$_HC817.fechaFin = año.toString() + mes.toString() + dia.toString();
			await traerListadoF7_HC817( document.querySelector('#unserv_HC817').value, $_HC817.fechaIni, $_HC817.fechaFin);
		}
	)
}

function ventanaUnidades_HC817() {
	_ventanaDatos({
		titulo: "VENTANA UNIDADES DE SERVICIO",
		columnas: ["COD", "DESCRIP"],
		data: $_HC817._unserv,
		callback_esc: function () {
			document.querySelector('#unserv_HC817').focus();
		},
		callback: function (data) {
			document.querySelector('#unserv_HC817').value = data.COD.trim();
			document.querySelector('#descripUnserv_HC817').value = data.DESCRIP.trim();
			_enterInput('#unserv_HC817');
		}
	});
}

async function cargarArchivos_HC817() {
	await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER873.DLL"))
		.then(data => {
			$_HC817._unserv = data['UNSERV'];
			$_HC817._unserv.pop();
		}).catch(err => {
			$('[data-bb-handler="main"]').click()
			CON851('', 'Error trayendo Unidades de servicio', null, 'error', 'error')
			validarPaciente();
			console.log(err, 'error')
			loader('hide')
		})
}