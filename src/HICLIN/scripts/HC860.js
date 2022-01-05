var $_HC860 = [];
$_HC860.NIT_USU = $_USUA_GLOBAL[0].NIT;

$_HC860.reg_envio = {
	llave: null,
	admin: null,
	sw_atend: null
}

function _ventanaInter_HC860() {
	var fuente = '<div id="INTCONS" style="width: 540px">' +
		'<div class="col-md-12">' +
		'<div class="portlet light no-padding">' +
		'<div class="portlet-body no-padding">' +
		'<div class="form-group col-md-12 col-sm-12 col-xs-12 no-padding" style="margin: 0 auto;">' +

		// INPUT ATENDIDOS
		'<div class="col-md-12" style="display: flex">' +

		'<div class="col-md-12" id="validarAtend_HC860">' +
		'<label class="col-md-8 text-center" style="margin-top: 5px;">Desea ver los ya atendidos?</label>' +
		'<div class="input-group col-md-2 col-sm-2 col-xs-2"> ' +
		'<input type="text" id="atend_HC860" class="form-control col-md-6" disabled="disabled" maxlength="1" data-orden="1" style="text-align: center" />' +
		'</div>' +
		'</div>' +

		'</div>' +
		// 

		// LABEL FECHA ATENCION
		'<div class="col-md-12 " style="display: none" id="divFecha1_HC860">' +
		'<div class="salto-linea"></div>' +
		'<label class="col-md-12 col-sm-12 col-xs-12 text-center">Fecha Atencion:</label>' +
		'</div>' +
		// 


		// INPUTS FECHAS (F2) FECHA DE ATENCION
		'<div class="col-md-12" style="display: none" id="divFecha2_HC860">' +
		'<div class="salto-linea"></div>' +

		'<div class="col-md-12">' +
		'<div class="col-md-12 col-sm-12 col-xs-12" id="validarFecha_HC860">' +
		'<div class="col-md-4 col-sm-4 col-xs-4">' +
		'<label class="col-md-12 col-sm-6 col-xs-6 text-center">Año:</label>' +
		'<div class="input-group col-md-12 col-sm-5 col-xs-5">' +
		'<input id="año_HC860" type="number"' +
		'class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="4" disabled="disabled"' +
		'data-orden="1" required="true" style="text-align: center;">' +
		'</div>' +
		'</div>' +
		'<div class="col-md-4 col-sm-4 col-xs-4">' +
		'<label class="col-md-12 col-sm-6 col-xs-6 text-center">Mes:</label>' +
		'<div class="input-group col-md-12 col-sm-5 col-xs-5">' +
		'<input id="mes_HC860" type="number"' +
		'class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" disabled="disabled"' +
		'data-orden="2" required="true" style="text-align: center;">' +
		'</div>' +
		'</div>' +
		'<div class="col-md-4 col-sm-4 col-xs-4">' +
		'<label class="col-md-12 col-sm-12 col-xs-6 text-center">Dia:</label>' +
		'<div class="input-group col-md-12 col-sm-5 col-xs-5">' +
		'<input id="dia_HC860" type="number"' +
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

		'<div class="col-md-6 box-center text-center" id="validarPacienteF8_HC860">' +
		'<label>Paciente:</label>' +
		'<div class="inline-inputs">' +
		'<input type="text" id="pacienteF8_HC860" class="form-control" disabled="disabled" maxlength="15" data-orden="1" style="text-align: center" />' +
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

	$_HC860.dialogo = bootbox.dialog({
		title: 'PACIENTES PARA INTERCONSULTAS',
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

	$_HC860.dialogo.on('shown.bs.modal', async function (e) {
		$('.modal-content').css({ 'position': 'fixed', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%, -50%)' })
		var h5 = document.createElement("h5");
		h5.innerHTML = "F2 Busca otra fecha &nbsp&nbsp F8 Busca por paciente";
		$(".modal-footer").append(h5);
		$('.modal-footer').css({ 'height': '50px', 'margin-top': '-3px', 'color': '#476fad' })
		$('.modal-header h4').css({ 'color': '#476fad', 'font-weight': '500' })
		$('h5').css({ 'margin-top': '-3px', 'float': 'left' });

		validarAtendidos_HC860();

		_toggleF8([{
			input: 'atend', app: 'HC860', funct: (e) => {
				if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
					set_Event_validar('#validarAtend_HC860', 'off')
					$('#atend_HC860').attr('disabled', 'true')

					buscarPacienteF8_HC860();
				}
			}
		},])

		_toggleF8([{
			input: 'pacienteF8', app: 'HC860', funct: (e) => {
				if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
					set_Event_validar('#validarPacienteF8_HC860', 'off')
					$('#pacienteF8_HC860').attr('disabled', 'true')

					$('[data-bb-handler="main"]').click()
					FNFPacientes_HC860();
				}
			}
		},])
	})
}

async function validarAtendidos_HC860() {
	validarInputs(
		{
			form: "#validarAtend_HC860",
			orden: '1',
			event_f2: buscarFechaF2_HC860,
		},
		() => {
			$('[data-bb-handler="main"]').click()
			validarPaciente();
		},
		async () => {
			var atend = document.querySelector('#atend_HC860').value.toUpperCase();
			if (atend == 'S' || atend == 'N') {
				$_HC860.reg_envio.llave = '000000000000' + '               ';
				$_HC860.reg_envio.admin = localStorage.Usuario;
				$_HC860.reg_envio.sw_atend = atend;
				await traerListadoInter_HC860();
			} else {
				validarAtendidos_HC860();
			}
		}
	)
}

async function traerListadoInter_HC860() {
	loader('show');
	await postData({ datosh: datosEnvio() + $_HC860.reg_envio.llave + '|' + $_HC860.reg_envio.admin + '|' + $_HC860.reg_envio.sw_atend }, get_url("APP/HICLIN/HC860.DLL"))
		.then(async (data) => {
			$_HC860.arrayInter = [];
			for (var i in data['REG-INT']) {
				if (data['REG-INT'][i].FECHA.trim() != '' || data['REG-INT'][i].HORA.trim() != '' || data['REG-INT'][i].OPER.trim() != '') {
					$_HC860.arrayInter.push(data['REG-INT'][i]);
				}
			}
			await _mostrarListadoInter_HC860();
		})
		.catch((err) => {
			$('[data-bb-handler="main"]').click()
			setTimeout(() => { _ventanaInter_HC860(); }, 500);
			CON851('', 'Error trayendo datos', null, 'error', 'error')
			console.log(err, 'err')
			loader('hide')
		});
	loader('hide');
}

async function _mostrarListadoInter_HC860() {
	for (var i in $_HC860.arrayInter) {
		$_HC860.arrayInter[i]['Prioridad'] = $_HC860.arrayInter[i]['PRIORIDAD'];
		$_HC860.arrayInter[i]['Fecha'] = $_HC860.arrayInter[i]['FECHA'];
		$_HC860.arrayInter[i]['Hora'] = $_HC860.arrayInter[i]['HORA'].substring(0, 2) + ':' + $_HC860.arrayInter[i]['HORA'].substring(2, 4);
		$_HC860.arrayInter[i]['Paciente'] = $_HC860.arrayInter[i]['DESCRIP_PACI'].trim();
		$_HC860.arrayInter[i]['Entidad'] = $_HC860.arrayInter[i]['ENTIDAD'];
		$_HC860.arrayInter[i]['Especialidad'] = $_HC860.arrayInter[i]['ESP'];
		$_HC860.arrayInter[i]['Unid Serv'] = $_HC860.arrayInter[i]['UNSERV'];
		$_HC860.arrayInter[i]['Operador'] = $_HC860.arrayInter[i]['OPER'];
		$_HC860.arrayInter[i]['color'] = parseInt($_HC860.arrayInter[i]['COLOR']);

		var aux = '';
		switch ($_HC860.arrayInter[i]['EDAD'].substring(0, 1)) {
			case 'A': aux = ' Años'; break;
			case 'M': aux = ' Meses'; break;
			case 'D': aux = ' Dias'; break;
		}
		$_HC860.arrayInter[i]['EDAD'].substring(1, 4).trim() == '' ? $_HC860.arrayInter[i]['EDAD'] = $_HC860.arrayInter[i]['EDAD'].substring(0, 1) + '0  ' : false;
		$_HC860.arrayInter[i]['Edad'] = parseFloat($_HC860.arrayInter[i]['EDAD'].substring(1, 4)) + aux;
	}

	if ($_HC860.arrayInter.length < 1) {
		CON851('08', '08', null, 'error', 'error')
		$('[data-bb-handler="main"]').click()
		setTimeout(() => { _ventanaInter_HC860(); }, 500);
	} else {
		_ventanaDatos({
			titulo: `PACIENTES PARA INTERCONSULTAS  &nbsp&nbsp&nbsp&nbsp ${moment().format('dddd DD MMM/YY')}`,
			columnas: ['Prioridad', 'Fecha', 'Hora', 'Paciente', 'Edad', 'Entidad', 'Especialidad', 'Unid Serv', 'Operador'],
			ancho: 1300,
			data: $_HC860.arrayInter,
			callback_esc: function () {
				$('[data-bb-handler="main"]').click()
				setTimeout(() => { _ventanaInter_HC860(); }, 500);
			},
			callback: async function (data) {
				$_REG_HC.llave_triage_w = data.LLAVE;
				$_REG_HC.edad_w = data.EDAD;
				$('[data-bb-handler="main"]').click()
				document.querySelector("#busqpaci_his").value = data.LLAVE.substring(12, 27);
				validarPaciente();
				setTimeout(() => { _enterInput('#busqpaci_his'); }, 200);
			},
		});
	}
}

//  ************************** BUSQUEDA DE INTERCONSULTAS POR FECHA *********************************

function buscarFechaF2_HC860() {
	$('#divFecha1_HC860').show()
	$('#divFecha2_HC860').show()

	validarInputs(
		{
			form: "#validarFecha_HC860",
			orden: '1',
		},
		() => {
			$('#divFecha1_HC860').hide()
			$('#divFecha2_HC860').hide()
			validarAtendidos_HC860()
		},
		async () => {
			var año = document.querySelector('#año_HC860').value;
			var mes = document.querySelector('#mes_HC860').value;
			var dia = document.querySelector('#dia_HC860').value;
			$_HC860.fechaF2 = año.toString() + mes.toString() + dia.toString();
			$_HC860.reg_envio.llave = $_HC860.fechaF2 + moment().format('HHmm') + '               ';
			$_HC860.reg_envio.admin = localStorage.Usuario;
			$_HC860.reg_envio.sw_atend = '';
			await traerListadoInter_HC860();
		}
	)
}

//  ************************** BUSQUEDA DE INTERCONSULTAS POR PACIENTE *********************************

function buscarPacienteF8_HC860() {
	$('#divPacienteF8').show();
	validarInputs(
		{
			form: "#validarPacienteF8_HC860",
			orden: '1',
		},
		() => {
			$('#divPacienteF8').hide();
			validarAtendidos_HC860()
		},
		async () => {
			var pac = document.querySelector('#pacienteF8_HC860').value;
			$_HC860.reg_envio.llave = '000000000000' + cerosIzq(pac, 15)
			$_HC860.reg_envio.admin = localStorage.Usuario;
			$_HC860.reg_envio.sw_atend = '';
			await traerListadoInter_HC860();
		}
	)
}

function FNFPacientes_HC860() {
	parametros = {
		dll: "PACIENTES",
		valoresselect: ["Nombre del paciente"],
		f8data: "PACIENTES",
		columnas: [{ title: "COD" }, { title: "NOMBRE" }, { title: "EPS" }, { title: "EDAD" }],
		callback: async data => {
			$_HC860.reg_envio.llave = '000000000000' + cerosIzq(data.COD, 15);
			$_HC860.reg_envio.admin = '';
			$_HC860.reg_envio.sw_atend = '';
			await traerListadoInter_HC860();
		},
		cancel: async () => {
			_ventanaInter_HC860();
		},
	};
	F8LITE(parametros);
}