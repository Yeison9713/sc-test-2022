var $_HC818 = [];
$_HC818.NIT_USU = $_USUA_GLOBAL[0].NIT;

function _ventanaF10_HC818() {
	var fuente = '<div id="F10_HC" style="width: 640px">' +
		'<div class="col-md-12">' +
		'<div class="portlet light no-padding">' +
		'<div class="portlet-body no-padding">' +
		'<div class="form-group col-md-12 col-sm-12 col-xs-12 no-padding" style="margin: 0 auto;">' +

		// INPUT ATENDIDOS
		'<div class="col-md-12">' +

		'<label class="col-md-12">Unidad de servicio</label>' +
		'<div class="col-md-12 no-padding" id="validarUnserv_HC818" style="margin-top: 5px;">' +
		'<div class="inline-inputs">' +
		'<div class="input-group col-md-2 col-sm-2 col-xs-2"> ' +
		'<input type="text" id="unserv_HC818" class="form-control" disabled="disabled" maxlength="2" data-orden="1" style="text-align: center" />' +
		'</div>' +
		'<button id="unservBtn_HC818" type="button" class="btn col-md-1 col-sm-1 col-xs-1 f8-Btn"> <i class="icon-magnifier"></i></button>' +
		'<div class="input-group col-md-9 col-sm-9 col-xs-9" style="margin-left: 10px;"> ' +
		'<input type="text" id="descripUnserv_HC818" class="form-control col-md-6" disabled="disabled" maxlength="1" data-orden="" style="text-align: left" />' +
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

	$_HC818.dialogo = bootbox.dialog({
		title: 'CONSULTA DE HISTORIAS ABIERTAS',
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

	$_HC818.dialogo.on('shown.bs.modal', async function (e) {
		$('.modal-content').css({ 'position': 'fixed', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%, -50%)' })
		var h5 = document.createElement("h5");
		h5.innerHTML = "F8 Consultar cod. unidades &nbsp&nbsp&nbsp ** Busca todos los hospitalizados";
		$(".modal-footer").append(h5);
		$('.modal-footer').css({ 'height': '50px', 'margin-top': '-3px', 'color': '#476fad' })
		$('.modal-header h4').css({ 'color': '#476fad', 'font-w eight': '500' })
		$('h5').css({ 'margin-top': '-3px', 'float': 'left' });

		loader('show');
		await cargarArchivos_HC818();
		loader('hide');
		validarUnserv_HC818();

		_toggleF8([{
			input: 'unserv', app: 'HC818', funct: (e) => {
				if (e.type == "keydown" && e.which == 119 || e.type == 'click') {

					ventanaUnidades_HC818();
				}
			}
		},])
	})
}

async function validarUnserv_HC818() {
	validarInputs(
		{
			form: "#validarUnserv_HC818",
			orden: '1',
		},
		() => {
			$('[data-bb-handler="main"]').click()
			validarPaciente();
		},
		async () => {
			var unid = document.querySelector('#unserv_HC818').value.toUpperCase();
			if (unid == '**') {
				document.querySelector('#descripUnserv_HC818').value = 'TODOS LOS HOSPITALIZADOS';
				await traerListadoF10_HC818(unid);
			} else {
				var busq = await $_HC818._unserv.find(e => e.COD.trim() == unid.trim());
				if (busq == undefined) {
					CON851('01', '01', null, 'error', 'error');
					validarUnserv_HC818();
				} else {
					document.querySelector('#descripUnserv_HC818').value = busq.DESCRIP;
					await traerListadoF10_HC818(unid);
				}
			}
		}
	)
}

async function traerListadoF10_HC818(unserv) {
	loader('show');
	await postData({ datosh: datosEnvio() + unserv + '|' }, get_url("APP/HICLIN/HC818.DLL"))
		.then(async (data) => {
			$_HC818.arrayF10 = data['F10-HC'];
			$_HC818.arrayF10.pop();
			await _mostrarListadoF10_HC818();
		})
		.catch((err) => {
			console.log(err, 'error')
			validarUnserv_HC818();
			loader('hide')
		});
	loader('hide');
}

async function _mostrarListadoF10_HC818() {
	for (var i in $_HC818.arrayF10) {
		$_HC818.arrayF10[i]['Paciente'] = $_HC818.arrayF10[i]['DESCRIP_PACI'].trim();
		$_HC818.arrayF10[i]['Hab'] = $_HC818.arrayF10[i]['HAB'];
		$_HC818.arrayF10[i]['Folio'] = $_HC818.arrayF10[i]['FOLIO'];
		$_HC818.arrayF10[i]['Serv'] = $_HC818.arrayF10[i]['SERV'];
		$_HC818.arrayF10[i]['Fecha'] = $_HC818.arrayF10[i]['FECHA'];
		$_HC818.arrayF10[i]['Medico'] = $_HC818.arrayF10[i]['MEDICO'];
		$_HC818.arrayF10[i]['IRA'] = $_HC818.arrayF10[i]['ERA_TRIA'];

		if($_HC818.arrayF10[i]['IRA'] == "S") {
			$_HC818.arrayF10[i]['color'] = "1";
		}

		var aux = '';
		switch ($_HC818.arrayF10[i]['EDAD'].substring(0, 1)) {
			case 'A': aux = ' Años'; break;
			case 'M': aux = ' Meses'; break;
			case 'D': aux = ' Dias'; break;
		}
		$_HC818.arrayF10[i]['EDAD'].substring(1, 4).trim() == '' ? $_HC818.arrayF10[i]['EDAD'] = $_HC818.arrayF10[i]['EDAD'].substring(0, 1) + '0  ' : false;
		$_HC818.arrayF10[i]['Edad'] = parseFloat($_HC818.arrayF10[i]['EDAD'].substring(1, 4)) + aux;
	}

	if ($_HC818.arrayF10.length < 1) {
		CON851('08', '08', null, 'error', 'error');
		validarUnserv_HC818();
	} else {
		_ventanaDatos({
			titulo: `CONSULTA DE HISTORIAS ABIERTAS`,
			columnas: ['Paciente', 'Edad', 'Hab', 'Folio', 'Serv', 'Fecha', "IRA", 'Medico'],
			ancho: 1300,
			data: $_HC818.arrayF10,
			callback_esc: function () {
				validarUnserv_HC818();
			},
			callback: function (data) {
				$('[data-bb-handler="main"]').click();
				cargarDatosPaci(data.LLAVE.trim())
			},
			event_f8: (data) => { ventanaAmpliada_HC818(data) }
		});
	}
}

function ventanaUnidades_HC818() {
	_ventanaDatos({
		titulo: "VENTANA UNIDADES DE SERVICIO",
		columnas: ["COD", "DESCRIP"],
		data: $_HC818._unserv,
		callback_esc: function () {
			document.querySelector('#unserv_HC818').focus();
		},
		callback: function (data) {
			document.querySelector('#unserv_HC818').value = data.COD.trim();
			document.querySelector('#descripUnserv_HC818').value = data.DESCRIP.trim();
			_enterInput('#unserv_HC818');
		}
	});
}

async function cargarArchivos_HC818() {
	await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER873.DLL"))
		.then(data => {
			$_HC818._unserv = data['UNSERV'];
			$_HC818._unserv.pop();
		}).catch(err => {
			$('[data-bb-handler="main"]').click()
			CON851('', 'Error trayendo Unidades de servicio', null, 'error', 'error')
			validarPaciente();
			console.log(err, 'error')
			loader('hide')
		})
}

function ventanaAmpliada_HC818(data) {
	var titulo = data.MOTIVO;
	var fuente = '<div id="ampliada_HC818" style="width: 530px">' +
		'<div class="col-md-12" style="padding: 0">' +
		'<div class="portlet light no-padding">' +
		'<div class="portlet-body no-padding">' +
		'<div class="form-group col-md-12 col-sm-12 col-xs-12 no-padding" style="margin: 0 auto;">' +

		// INPUT MEDICO APERT
		'<div class="col-md-12" style="padding: 0">' +

		'<div class="inline-inputs">' +
		'<label class="col-md-3">MEDICO APERT:</label>' +
		'<div class="col-md-9 no-padding">' +
		'<div class="input-group col-md-12 col-sm-12 col-xs-12"> ' +
		'<input type="text" id="medicoApert_HC818" class="form-control" disabled="disabled" maxlength="2" data-orden="1" />' +
		'</div>' +
		'</div>' +
		'</div>' +

		'</div>' +

		'<div class="salto-linea"></div>' +
		
		// INPUT ESPECIALIDAD
		'<div class="col-md-12" style="padding: 0">' +

		'<div class="inline-inputs">' +
		'<label class="col-md-3">ESPECIALIDAD:</label>' +
		'<div class="col-md-9 no-padding">' +
		'<div class="input-group col-md-12 col-sm-12 col-xs-12"> ' +
		'<input type="text" id="especialidad_HC818" class="form-control" disabled="disabled" />' +
		'</div>' +
		'</div>' +
		'</div>' +

		'</div>' +

		'<div class="salto-linea"></div>' +
		
		// INPUT UNIDAD APERT Y FOLIO
		'<div class="col-md-12" style="padding: 0">' +

		'<div class="inline-inputs col-md-6 no-padding">' +
		'<label class="col-md-6">UNIDAD APERT:</label>' +
		'<div class="col-md-6 no-padding">' +
		'<div class="input-group col-md-12 col-sm-12 col-xs-12"> ' +
		'<input type="text" id="unidadApert_HC818" class="form-control" disabled="disabled" />' +
		'</div>' +
		'</div>' +
		'</div>' +

		'<div class="inline-inputs col-md-6" style="padding-right: 0;">' +
		'<label class="col-md-6">FOLIO:</label>' +
		'<div class="col-md-6 no-padding">' +
		'<div class="input-group col-md-12 col-sm-12 col-xs-12"> ' +
		'<input type="text" id="folio_HC818" class="form-control" disabled="disabled" />' +
		'</div>' +
		'</div>' +
		'</div>' +

		'</div>' +

		'<div class="salto-linea"></div>' +

		// INPUT FACTURA Y DESCRIP-TER
		'<div class="col-md-12" style="padding: 0">' +

		'<div class="inline-inputs col-md-6 no-padding">' +
		'<label class="col-md-6">FACTURA:</label>' +
		'<div class="col-md-6 no-padding">' +
		'<div class="input-group col-md-12 col-sm-12 col-xs-12"> ' +
		'<input type="text" id="factura_HC818" class="form-control" disabled="disabled" />' +
		'</div>' +
		'</div>' +
		'</div>' +

		'<div class="inline-inputs col-md-6" style="padding-right: 0;">' +
		'<div class="col-md-12 no-padding">' +
		'<div class="input-group col-md-12 col-sm-12 col-xs-12"> ' +
		'<input type="text" id="tercero_HC818" class="form-control" disabled="disabled" />' +
		'</div>' +
		'</div>' +
		'</div>' +

		'</div>' +

		'<div class="salto-linea"></div>' +
		
		// INPUT HAB Y PYP
		'<div class="col-md-12" style="padding: 0">' +

		'<div class="inline-inputs col-md-6 no-padding">' +
		'<label class="col-md-6">HABITACIÓN:</label>' +
		'<div class="col-md-6 no-padding">' +
		'<div class="input-group col-md-12 col-sm-12 col-xs-12"> ' +
		'<input type="text" id="hab_HC818" class="form-control" disabled="disabled" />' +
		'</div>' +
		'</div>' +
		'</div>' +

		'<div class="inline-inputs col-md-6" style="padding-right: 0;">' +
		'<label class="col-md-6">PYP:</label>' +
		'<div class="col-md-6 no-padding">' +
		'<div class="input-group col-md-12 col-sm-12 col-xs-12"> ' +
		'<input type="text" id="pyp_HC818" class="form-control" disabled="disabled" />' +
		'</div>' +
		'</div>' +
		'</div>' +

		'</div>' +

		'<div class="salto-linea"></div>' +
		
		// INPUT CIERRE Y DIAG-MUER
		'<div class="col-md-12" style="padding: 0">' +

		'<div class="inline-inputs col-md-6 no-padding">' +
		'<label class="col-md-6">CIERRE H.C.:</label>' +
		'<div class="col-md-6 no-padding">' +
		'<div class="input-group col-md-12 col-sm-12 col-xs-12"> ' +
		'<input type="text" id="cierre_HC818" class="form-control" disabled="disabled" />' +
		'</div>' +
		'</div>' +
		'</div>' +

		'<div class="inline-inputs col-md-6" style="padding-right: 0; display: none;" id="divDiagMuerte_HC818">' +
		'<label class="col-md-6">DIAG. MUERTE:</label>' +
		'<div class="col-md-6 no-padding">' +
		'<div class="input-group col-md-12 col-sm-12 col-xs-12"> ' +
		'<input type="text" id="diagMuerte_HC818" class="form-control" disabled="disabled" />' +
		'</div>' +
		'</div>' +
		'</div>' +

		'</div>' +

		'<div class="salto-linea"></div>' +
		
		// INPUT ORDEN SALIDA
		'<div class="col-md-12" style="padding: 0">' +

		'<div class="inline-inputs col-md-12 no-padding">' +
		'<label class="col-md-3">ORDEN SALIDA:</label>' +
		'<div class="col-md-9 no-padding">' +
		'<div class="input-group col-md-12 col-sm-12 col-xs-12"> ' +
		'<input type="text" id="salida_HC818" class="form-control" disabled="disabled" />' +
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

	$_HC818.ventanaAmpliada = bootbox.dialog({
		title: titulo,
		message: fuente,
		size: 'small',
		closeButton: false,
		buttons: {
			main: {
				label: "Aceptar",
				className: "btn btn-default",
				callback: function () {
					traerListadoF10_HC818(document.querySelector('#unserv_HC818').value.toUpperCase());
				}
			}
		},
	});

	$_HC818.ventanaAmpliada.on('shown.bs.modal', async function (e) {
		$('.modal-content').css({ 'position': 'fixed', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%, -50%)' })

		if(data.DIAG_MUER.trim() != '') {
			$('#divDiagMuerte_HC818').show();
		}

		document.querySelector('#medicoApert_HC818').value = data.MEDICO.trim();
		document.querySelector('#especialidad_HC818').value = data.ESPEC.trim();
		document.querySelector('#unidadApert_HC818').value = data.SERV.trim();
		document.querySelector('#folio_HC818').value = data.FOLIO.trim();
		document.querySelector('#factura_HC818').value = data.FACT.trim();
		document.querySelector('#tercero_HC818').value = data.DESCRIP_TER.trim();
		document.querySelector('#hab_HC818').value = data.HAB.trim();
		document.querySelector('#pyp_HC818').value = data.PYP.trim();
		document.querySelector('#cierre_HC818').value = data.EGRESO.trim() + '   ' + data.OPER_CIE.trim();
		document.querySelector('#diagMuerte_HC818').value = data.DIAG_MUER.trim();
		document.querySelector('#salida_HC818').value = data.OPER_SAL.trim() + '   ' + data.FECHA_SAL.trim() + '   ' + data.HORA_SAL.trim();
	})
}