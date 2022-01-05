var $_HC899 = [];
$_HC899.NIT_USU = $_USUA_GLOBAL[0].NIT;

$_HC899.reg_envio = {
	llave: null,
	admin: null,
	sw_atend: null
}

function _ventanaUmi_HC899() {
	var fuente = '<div id="UMI" style="width: 540px">' +
		'<div class="col-md-12">' +
		'<div class="portlet light no-padding">' +
		'<div class="portlet-body no-padding">' +
		'<div class="form-group col-md-12 col-sm-12 col-xs-12 no-padding" style="margin: 0 auto;">' +

		// INPUT ATENDIDOS
		'<div class="col-md-12" style="display: flex">' +

		'<div class="col-md-12" id="validarAtend_HC899">' +
		'<label class="col-md-8 text-center" style="margin-top: 5px;">Desea ver los ya atendidos?</label>' +
		'<div class="input-group col-md-2 col-sm-2 col-xs-2"> ' +
		'<input type="text" id="atend_HC899" placeholder="N" class="form-control col-md-6" disabled="disabled" maxlength="1" data-orden="1" style="text-align: center" />' +
		'</div>' +
		'</div>' +

		'</div>' +
		// 

		// LABEL FECHA ATENCION
		'<div class="col-md-12 " style="display: none" id="divFecha1_HC899">' +
		'<div class="salto-linea"></div>' +
		'<label class="col-md-12 col-sm-12 col-xs-12 text-center">Fecha Atencion:</label>' +
		'</div>' +
		// 


		// INPUTS FECHAS (F2) FECHA DE ATENCION
		'<div class="col-md-12" style="display: none" id="divFecha2_HC899">' +
		'<div class="salto-linea"></div>' +

		'<div class="col-md-12">' +
		'<div class="col-md-12 col-sm-12 col-xs-12" id="validarFecha_HC899">' +
		'<div class="col-md-4 col-sm-4 col-xs-4">' +
		'<label class="col-md-12 col-sm-6 col-xs-6 text-center">Año:</label>' +
		'<div class="input-group col-md-12 col-sm-5 col-xs-5">' +
		'<input id="año_HC899" type="number"' +
		'class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="4" disabled="disabled"' +
		'data-orden="1" required="true" style="text-align: center;">' +
		'</div>' +
		'</div>' +
		'<div class="col-md-4 col-sm-4 col-xs-4">' +
		'<label class="col-md-12 col-sm-6 col-xs-6 text-center">Mes:</label>' +
		'<div class="input-group col-md-12 col-sm-5 col-xs-5">' +
		'<input id="mes_HC899" type="number"' +
		'class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" disabled="disabled"' +
		'data-orden="2" required="true" style="text-align: center;">' +
		'</div>' +
		'</div>' +
		'<div class="col-md-4 col-sm-4 col-xs-4">' +
		'<label class="col-md-12 col-sm-12 col-xs-6 text-center">Dia:</label>' +
		'<div class="input-group col-md-12 col-sm-5 col-xs-5">' +
		'<input id="dia_HC899" type="number"' +
		'class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" disabled="disabled"' +
		'data-orden="3" required="true" style="text-align: center;">' +
		'</div>' +
		'</div>' +
		'</div>' +
		'</div>' +

		'</div>' +
		// 

		// INPUT BUSQ PACIENTE F8
		'<div class="col-md-12" style="display: none" id="divPacienteF8">' +

		'<div class="col-md-6 box-center text-center" id="validarPacienteF8_HC899">' +
		'<label>Paciente:</label>' +
		'<div class="inline-inputs">' +
		'<input type="text" id="pacienteF8_HC899" class="form-control" disabled="disabled" maxlength="15" data-orden="1" style="text-align: center" />' +
		'<button type="button" class="btn col-md-2 col-sm-2 col-xs-2 f8-Btn"> <i class="icon-magnifier"></i></button>' +
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

	$_HC899.dialogo = bootbox.dialog({
		title: 'PACIENTE PARA CONSULTA URGENCIAS (UMI)',
		message: fuente,
		size: 2500,
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

	$_HC899.dialogo.on('shown.bs.modal', async function (e) {
		$('.modal-content').css({ 'position': 'fixed', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%, -50%)' })
		var h5 = document.createElement("h5");
		h5.innerHTML = "F2 Busca otra fecha &nbsp&nbsp F8 Busca por paciente";
		$(".modal-footer").append(h5);
		$('.modal-footer').css({ 'height': '50px', 'margin-top': '-3px', 'color': '#476fad' })
		$('.modal-header h4').css({ 'color': '#476fad', 'font-weight': '500' })
		$('h5').css({ 'margin-top': '-3px', 'float': 'left' });

		validarAtendidos_HC899();

		_toggleF8([{
			input: 'atend', app: 'HC899', funct: (e) => {
				if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
					set_Event_validar('#validarAtend_HC899', 'off')
					$('#atend_HC899').attr('disabled', 'true')

					buscarPacienteF8_HC899();
				}
			}
		},])

		_toggleF8([{
			input: 'pacienteF8', app: 'HC899', funct: (e) => {
				if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
					set_Event_validar('#validarPacienteF8_HC899', 'off')
					$('#pacienteF8_HC899').attr('disabled', 'true')

					$('[data-bb-handler="main"]').click()
					FNFPacientes_HC899();
				}
			}
		},])
	})
}

async function validarAtendidos_HC899() {
	validarInputs(
		{
			form: "#validarAtend_HC899",
			orden: '1',
			event_f2: buscarFechaF2_HC899,
		},
		() => {
			$('[data-bb-handler="main"]').click()
			validarPaciente();
		},
		async () => {
			document.querySelector('#atend_HC899').value = document.querySelector('#atend_HC899').value.toUpperCase() == 'S' ? 'S' : 'N';
			var atend = document.querySelector('#atend_HC899').value.toUpperCase();
			$_HC899.reg_envio.llave = moment().format('YYYYMMDDHHmm') + '               ';
			$_HC899.reg_envio.admin = localStorage.Usuario;
			$_HC899.reg_envio.sw_atend = atend;
			await traerListadoUmi_HC899();
		}
	)
}

async function traerListadoUmi_HC899() {
	loader('show');
	await postData({ datosh: datosEnvio() + $_HC899.reg_envio.fecha + '|' + $_HC899.reg_envio.admin + '|' + $_HC899.reg_envio.sw_atend }, get_url("APP/HICLIN/HC899.DLL"))
		.then(async (data) => {
			$_HC899.arrayUmi = [];
			for (var i in data['REG-UMI']) {
				if (data['REG-UMI'][i].FECHA_TRIA.trim() != '' || data['REG-UMI'][i].HORA_TRIA.trim() != '' || data['REG-UMI'][i].OPER_TRIA.trim() != '' || data['REG-UMI'][i].CONDUCTA_TRIA.trim() != '') {
					$_HC899.arrayUmi.push(data['REG-UMI'][i]);
				}
			}
			$_HC899.arrayUmi = $_HC899.arrayUmi.reverse();
			await _mostrarListadoUmi_HC899();
		})
		.catch((err) => {
			$('[data-bb-handler="main"]').click()
			setTimeout(() => { _ventanaUmi_HC899(); }, 500);
			console.log(err, 'err')
			loader('hide')
		});
	loader('hide');
}

async function _mostrarListadoUmi_HC899() {
	for (var i in $_HC899.arrayUmi) {
		$_HC899.arrayUmi[i]['Prioridad'] = $_HC899.arrayUmi[i]['PRIORIDAD_TRIA'];
		$_HC899.arrayUmi[i]['Fecha'] = $_HC899.arrayUmi[i]['FECHA_TRIA'];
		$_HC899.arrayUmi[i]['Hora'] = $_HC899.arrayUmi[i]['HORA_TRIA'].substring(0, 2) + ':' + $_HC899.arrayUmi[i]['HORA_TRIA'].substring(2, 4);
		$_HC899.arrayUmi[i]['Paciente'] = $_HC899.arrayUmi[i]['DESCRIP_PACI_TRIA'].trim();
		$_HC899.arrayUmi[i]['Conducta'] = $_HC899.arrayUmi[i]['CONDUCTA_TRIA'];
		$_HC899.arrayUmi[i]['Semanas'] = $_HC899.arrayUmi[i]['SEMA_TRIA'];
		$_HC899.arrayUmi[i]['Espera'] = $_HC899.arrayUmi[i]['ESPERA_TRIA'];
		$_HC899.arrayUmi[i]['Operador'] = $_HC899.arrayUmi[i]['OPER_TRIA'];
		$_HC899.arrayUmi[i]['color'] = parseInt($_HC899.arrayUmi[i]['COLOR_TRIA']);

		var aux = '';
		switch ($_HC899.arrayUmi[i]['EDAD_TRIA'].substring(0, 1)) {
			case 'A': aux = ' Años'; break;
			case 'M': aux = ' Meses'; break;
			case 'D': aux = ' Dias'; break;
		}
		$_HC899.arrayUmi[i]['EDAD_TRIA'].substring(1, 4).trim() == '' ? $_HC899.arrayUmi[i]['EDAD_TRIA'] = $_HC899.arrayUmi[i]['EDAD_TRIA'].substring(0, 1) + '0  ' : false;
		$_HC899.arrayUmi[i]['Edad'] = parseFloat($_HC899.arrayUmi[i]['EDAD_TRIA'].substring(1, 4)) + aux;
		$_HC899.arrayUmi[i]['Entidad'] = $_HC899.arrayUmi[i]['ENTIDAD_TRIA'];
	}

	if ($_HC899.arrayUmi.length < 1) {
		CON851('08', '08', null, 'error', 'error')
		$('[data-bb-handler="main"]').click()
		setTimeout(() => { _ventanaUmi_HC899(); }, 500);
	} else {
		_ventanaDatos({
			titulo: `PACIENTE PARA CONSULTA URGENCIAS  &nbsp&nbsp&nbsp&nbsp ${moment().format('dddd DD MMM/YY')}`,
			columnas: ['Prioridad', 'Fecha', 'Hora', 'Paciente', 'Edad', 'Entidad', 'Conducta', 'Semanas', 'Espera', 'Operador'],
			ancho: 1300,
			data: $_HC899.arrayUmi,
			callback_esc: function () {
				$('[data-bb-handler="main"]').click()
				setTimeout(() => { _ventanaUmi_HC899(); }, 500);
			},
			callback: async function (data) {
				$_REG_HC.llave_triage_w = data.LLAVE_TRIA;
				$_REG_HC.edad_w = data.EDAD_TRIA;
				$('[data-bb-handler="main"]').click()
				document.querySelector("#busqpaci_his").value = data.LLAVE_TRIA.substring(12, 27);
				validarPaciente();
				setTimeout(() => { _enterInput('#busqpaci_his'); }, 200);
			},
			event_f3: (data) => { eliminarReg_HC899(data) },
		});
	}
}

function eliminarReg_HC899(data) {
	if (localStorage.Usuario == 'ADMI' || localStorage.Usuario == 'GEBC') {
		setTimeout(() => {
			CON851P('02',
				() => { traerListadoTriage_HC899($_HC899.reg_envio); },
				async () => {
					loader('show');
					await postData({ datosh: datosEnvio() + data.LLAVE_TRIA + '|' }, get_url("APP/HICLIN/HC810-1.DLL"))
						.then(async (data) => {
							toastr.success("Registro eliminado");
							traerListadoTriage_HC899($_HC899.reg_envio)
						})
						.catch((err) => {
							console.log(err, 'err')
							traerListadoTriage_HC899($_HC899.reg_envio)
						});
					loader('hide');
				}
			);
		}, 200);
	} else {
		traerListadoTriage_HC899($_HC899.reg_envio);
	}
}

//  ************************** BUSQUEDA DE TRIAGE POR FECHA *********************************

function buscarFechaF2_HC899() {
	$('#divFecha1_HC899').show()
	$('#divFecha2_HC899').show()

	validarInputs(
		{
			form: "#validarFecha_HC899",
			orden: '1',
		},
		() => {
			$('#divFecha1_HC899').hide()
			$('#divFecha2_HC899').hide()
			validarAtendidos_HC899()
		},
		async () => {
			var año = document.querySelector('#año_HC899').value;
			var mes = document.querySelector('#mes_HC899').value;
			var dia = document.querySelector('#dia_HC899').value;
			$_HC899.fechaF2 = año.toString() + mes.toString() + dia.toString();
			$_HC899.reg_envio.llave = $_HC899.fechaF2 + moment().format('HHmm') + '               ';
			$_HC899.reg_envio.admin = localStorage.Usuario;
			$_HC899.reg_envio.sw_atend = '';
			await traerListadoUmi_HC899();
		}
	)
}

//  ************************** BUSQUEDA DE TRIAGE POR PACIENTE *********************************

function buscarPacienteF8_HC899() {
	$('#divPacienteF8').show();
	validarInputs(
		{
			form: "#validarPacienteF8_HC899",
			orden: '1',
		},
		() => {
			$('#divPacienteF8').hide();
			validarAtendidos_HC899()
		},
		async () => {
			var pac = document.querySelector('#pacienteF8_HC899').value;
			$_HC899.reg_envio.llave = '            ' + cerosIzq(pac, 15)
			$_HC899.reg_envio.admin = localStorage.Usuario;
			$_HC899.reg_envio.sw_atend = '';
			await traerListadoUmi_HC899();
		}
	)
}

function FNFPacientes_HC899() {
	parametros = {
		dll: "PACIENTES",
		valoresselect: ["Nombre del paciente"],
		f8data: "PACIENTES",
		columnas: [{ title: "COD" }, { title: "NOMBRE" }, { title: "EPS" }, { title: "EDAD" }],
		callback: async data => {
			$_HC899.reg_envio.llave = '            ' + cerosIzq(data.COD, 15);
			$_HC899.reg_envio.admin = '';
			$_HC899.reg_envio.sw_atend = '';
			await traerListadoUmi_HC899();
		},
		cancel: async () => {
			_ventanaUmi_HC899();
		},
	};
	F8LITE(parametros);
}