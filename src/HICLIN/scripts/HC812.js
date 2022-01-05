var $_HC812 = [];
$_HC812.NIT_USU = $_USUA_GLOBAL[0].NIT;

$_HC812.reg_envio = {
	llave: null,
	admin: null,
	sw_atend: null,
	era: ''
}

function _ventanaUrgencias_HC812() {
	var fuente = '<div id="URGENCIAS" style="width: 540px">' +
		'<div class="col-md-12">' +
		'<div class="portlet light no-padding">' +
		'<div class="portlet-body no-padding">' +
		'<div class="form-group col-md-12 col-sm-12 col-xs-12 no-padding" style="margin: 0 auto;">' +

		// INPUT ATENDIDOS
		'<div class="col-md-12" style="display: flex">' +

		'<div class="col-md-12" id="validarAtend_HC812">' +
		'<label class="col-md-8" style="margin-top: 5px;">Desea ver los ya atendidos?</label>' +
		'<div class="input-group col-md-2 col-sm-2 col-xs-2"> ' +
		'<input type="text" id="atend_HC812" placeholder="N" class="form-control col-md-6" disabled="disabled" maxlength="1" data-orden="1" style="text-align: center" />' +
		'</div>' +
		'</div>' +

		'</div>' +
		// 

		'<div class="salto-linea"></div>' +

		// INPUT PAC.ERA
		'<div class="col-md-12" style="display: flex">' +

		'<div class="col-md-12" id="validarEra_HC812">' +
		'<label class="col-md-8" style="margin-top: 5px;">LISTAR SOLO PAC.ERA?</label>' +
		'<div class="input-group col-md-2 col-sm-2 col-xs-2"> ' +
		'<input type="text" id="era_HC812" placeholder="N" class="form-control col-md-6" disabled="disabled" maxlength="1" data-orden="1" style="text-align: center" />' +
		'</div>' +
		'</div>' +

		'</div>' +
		// 

		// LABEL FECHA ATENCION
		'<div class="col-md-12 " style="display: none" id="divFecha1">' +
		'<div class="salto-linea"></div>' +
		'<label class="col-md-12 col-sm-12 col-xs-12 text-center">Fecha Atencion:</label>' +
		'</div>' +
		// 


		// INPUTS FECHAS (F2) FECHA DE ATENCION
		'<div class="col-md-12" style="display: none" id="divFecha2">' +
		'<div class="salto-linea"></div>' +

		'<div class="col-md-12">' +
		'<div class="col-md-12 col-sm-12 col-xs-12" id="validarFecha_HC812">' +
		'<div class="col-md-4 col-sm-4 col-xs-4">' +
		'<label class="col-md-12 col-sm-6 col-xs-6 text-center">Año:</label>' +
		'<div class="input-group col-md-12 col-sm-5 col-xs-5">' +
		'<input id="año_HC812" type="number"' +
		'class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="4" disabled="disabled"' +
		'data-orden="1" required="true" style="text-align: center;">' +
		'</div>' +
		'</div>' +
		'<div class="col-md-4 col-sm-4 col-xs-4">' +
		'<label class="col-md-12 col-sm-6 col-xs-6 text-center">Mes:</label>' +
		'<div class="input-group col-md-12 col-sm-5 col-xs-5">' +
		'<input id="mes_HC812" type="number"' +
		'class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" disabled="disabled"' +
		'data-orden="2" required="true" style="text-align: center;">' +
		'</div>' +
		'</div>' +
		'<div class="col-md-4 col-sm-4 col-xs-4">' +
		'<label class="col-md-12 col-sm-12 col-xs-6 text-center">Dia:</label>' +
		'<div class="input-group col-md-12 col-sm-5 col-xs-5">' +
		'<input id="dia_HC812" type="number"' +
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

		'<div class="col-md-6 box-center text-center" id="validarPacienteF8_HC812">' +
		'<label>Paciente:</label>' +
		'<div class="inline-inputs">' +
		'<input type="text" id="pacienteF8_HC812" class="form-control" disabled="disabled" maxlength="15" data-orden="1" style="text-align: center" />' +
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

	$_HC812.dialogo = bootbox.dialog({
		title: 'PACIENTE PARA CONSULTA URGENCIAS',
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

	$_HC812.dialogo.on('shown.bs.modal', async function (e) {
		$('.modal-content').css({ 'position': 'fixed', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%, -50%)' })
		var h5 = document.createElement("h5");
		h5.innerHTML = "F2 Busca otra fecha &nbsp&nbsp F8 Busca por paciente";
		$(".modal-footer").append(h5);
		$('.modal-footer').css({ 'height': '50px', 'margin-top': '-3px', 'color': '#476fad' })
		$('.modal-header h4').css({ 'color': '#476fad', 'font-weight': '500' })
		$('h5').css({ 'margin-top': '-3px', 'float': 'left' });

		validarAtendidos_HC812();

		_toggleF8([{
			input: 'atend', app: 'HC812', funct: (e) => {
				if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
					set_Event_validar('#validarAtend_HC812', 'off')
					$('#atend_HC812').attr('disabled', 'true')

					buscarPacienteF8_HC812();
				}
			}
		},])

		_toggleF8([{
			input: 'pacienteF8', app: 'HC812', funct: (e) => {
				if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
					set_Event_validar('#validarPacienteF8_HC812', 'off')
					$('#pacienteF8_HC812').attr('disabled', 'true')

					$('[data-bb-handler="main"]').click()
					FNFPacientes_HC812();
				}
			}
		},])
	})
}

async function validarAtendidos_HC812() {
	validarInputs(
		{
			form: "#validarAtend_HC812",
			orden: '1',
			event_f2: buscarFechaF2_HC812,
		},
		() => {
			$('[data-bb-handler="main"]').click()
			validarPaciente();
		},
		async () => {
			document.querySelector('#atend_HC812').value = document.querySelector('#atend_HC812').value.toUpperCase() == 'S' ? 'S' : 'N';
			var atend = document.querySelector('#atend_HC812').value.toUpperCase();
			$_HC812.reg_envio.sw_atend = atend;
			datoCovid19_HC812();
		}
	)
}

function datoCovid19_HC812() {
	validarInputs(
		{
			form: "#validarEra_HC812",
			orden: '1',
		},
		() => {
			validarAtendidos_HC812();
		},
		async () => {
			document.querySelector('#era_HC812').value = document.querySelector('#era_HC812').value.toUpperCase() == 'S' ? 'S' : 'N';
			var era = document.querySelector('#era_HC812').value.toUpperCase();
			$_HC812.reg_envio.llave = moment().format('YYYYMMDDHHmm') + '               ';
			$_HC812.reg_envio.admin = localStorage.Usuario;
			$_HC812.reg_envio.era = era;
			await traerListadoUrgencias_HC812();
		}
	)
}

async function traerListadoUrgencias_HC812() {
	loader('show');
	await postData({ datosh: datosEnvio() + $_HC812.reg_envio.llave + '|' + $_HC812.reg_envio.admin + '|' + $_HC812.reg_envio.sw_atend + '|' + $_HC812.reg_envio.era }, get_url("APP/HICLIN/HC812.DLL"))
		.then(async (data) => {
			$_HC812.arrayUrgencias = [];
			for (var i in data['REG-URG']) {
				if (data['REG-URG'][i].FECHA_TRIA.trim() != '' || data['REG-URG'][i].HORA_TRIA.trim() != '' || data['REG-URG'][i].OPER_TRIA.trim() != '' || data['REG-URG'][i].CONDUCTA_TRIA.trim() != '') {
					$_HC812.arrayUrgencias.push(data['REG-URG'][i]);
				}
			}
			$_HC812.arrayUrgencias = $_HC812.arrayUrgencias.reverse();
			await _mostrarListadoUrgencias_HC812();
		})
		.catch((err) => {
			$('[data-bb-handler="main"]').click()
			setTimeout(() => { _ventanaUrgencias_HC812(); }, 500);
			console.log(err, 'err')
			loader('hide')
		});
	loader('hide');
}

async function _mostrarListadoUrgencias_HC812() {
	for (var i in $_HC812.arrayUrgencias) {
		$_HC812.arrayUrgencias[i]['Prioridad'] = $_HC812.arrayUrgencias[i]['PRIORIDAD_TRIA'];
		$_HC812.arrayUrgencias[i]['Fecha'] = $_HC812.arrayUrgencias[i]['FECHA_TRIA'];
		$_HC812.arrayUrgencias[i]['Hora'] = $_HC812.arrayUrgencias[i]['HORA_TRIA'].substring(0, 2) + ':' + $_HC812.arrayUrgencias[i]['HORA_TRIA'].substring(2, 4);
		$_HC812.arrayUrgencias[i]['Paciente'] = $_HC812.arrayUrgencias[i]['DESCRIP_PACI_TRIA'].trim();
		$_HC812.arrayUrgencias[i]['Conducta'] = $_HC812.arrayUrgencias[i]['CONDUCTA_TRIA'];
		$_HC812.arrayUrgencias[i]['Estado'] = $_HC812.arrayUrgencias[i]['ESTADO_TRIA'];
		$_HC812.arrayUrgencias[i]['Estado_descrip'] = $_HC812.arrayUrgencias[i]['ESTADO_DESCRIP'];
		$_HC812.arrayUrgencias[i]['Consult'] = $_HC812.arrayUrgencias[i]['CONSUL_TRIA'];
		// $_HC812.arrayUrgencias[i]['Espera'] = $_HC812.arrayUrgencias[i]['ESPERA_TRIA'];
		$_HC812.arrayUrgencias[i]['Espera'] = parseFloat($_HC812.arrayUrgencias[i]['ESPERA_TRIA'].replace(/\s/g, '')) || 0;
		$_HC812.arrayUrgencias[i]['Operador'] = $_HC812.arrayUrgencias[i]['OPER_TRIA'];
		$_HC812.arrayUrgencias[i]['color'] = parseInt($_HC812.arrayUrgencias[i]['COLOR_TRIA']);

		var aux = '';
		switch ($_HC812.arrayUrgencias[i]['EDAD_TRIA'].substring(0, 1)) {
			case 'A': aux = ' Años'; break;
			case 'M': aux = ' Meses'; break;
			case 'D': aux = ' Dias'; break;
		}
		$_HC812.arrayUrgencias[i]['EDAD_TRIA'].substring(1, 4).trim() == '' ? $_HC812.arrayUrgencias[i]['EDAD_TRIA'] = $_HC812.arrayUrgencias[i]['EDAD_TRIA'].substring(0, 1) + '0  ' : false;
		$_HC812.arrayUrgencias[i]['Edad'] = parseFloat($_HC812.arrayUrgencias[i]['EDAD_TRIA'].substring(1, 4)) + aux;
		$_HC812.arrayUrgencias[i]['Entidad'] = $_HC812.arrayUrgencias[i]['ENTIDAD_TRIA'];
		$_HC812.arrayUrgencias[i]['Fact'] = $_HC812.arrayUrgencias[i]['FACTURA_TRIA'];
	}

	if ($_HC812.arrayUrgencias.length < 1) {
		CON851('08', '08', null, 'error', 'error')
		$('[data-bb-handler="main"]').click()
		setTimeout(() => { _ventanaUrgencias_HC812(); }, 500);
	} else {
		let obj_urgencias = $_HC812.arrayUrgencias.sort((a, b)=>{return b.Espera - a.Espera});
		_ventanaDatos({
			titulo: `PACIENTE PARA CONSULTA URGENCIAS  &nbsp&nbsp&nbsp&nbsp ${moment().format('dddd DD MMM/YY')}`,
			columnas: ['Prioridad', 'Fecha', 'Hora', 'Paciente', 'Edad', 'Entidad', 'Fact', 'Conducta', 'Estado_descrip', 'Consult', 'Espera', 'Operador'],
			ancho: 1300,
			data: obj_urgencias,
			callback_esc: function () {
				$('[data-bb-handler="main"]').click()
				setTimeout(() => { _ventanaUrgencias_HC812(); }, 500);
			},
			callback: async function (data) {
				$_REG_HC.llave_triage_w = data.LLAVE_TRIA;
				$_REG_HC.edad_w = data.EDAD_TRIA;
				$('[data-bb-handler="main"]').click()
				document.querySelector("#busqpaci_his").value = data.LLAVE_TRIA.substring(12, 27);
				validarPaciente();
				setTimeout(() => { _enterInput('#busqpaci_his'); }, 200);
			},
			event_f3: (data) => { eliminarReg_HC812(data) },
		});
	}
}

function eliminarReg_HC812(data) {
	if ((localStorage.Usuario == 'ADMI' || localStorage.Usuario == 'GEBC') || (localStorage.Usuario == "LECP" && $_HC812.NIT_USU == 892000458)) {
		setTimeout(() => {
			CON851P('02',
				() => { traerListadoUrgencias_HC812($_HC812.reg_envio); },
				async () => {
					loader('show');
					await postData({ datosh: datosEnvio() + data.LLAVE_TRIA + '|' }, get_url("APP/HICLIN/HC810-1.DLL"))
						.then(async (data) => {
							toastr.success("Registro eliminado");
							traerListadoUrgencias_HC812($_HC812.reg_envio)
						})
						.catch((err) => {
							console.log(err, 'err')
							traerListadoUrgencias_HC812($_HC812.reg_envio)
						});
					loader('hide');
				}
			);
		}, 200);
	} else {
		traerListadoUrgencias_HC812($_HC812.reg_envio);
	}
}

function datoCovid19() {
	console.log('PENDIENTE DATO-COVID19 POR NIT');
}

//  ************************** BUSQUEDA DE TRIAGE POR FECHA *********************************

function buscarFechaF2_HC812() {
	$('#divFecha1').show()
	$('#divFecha2').show()

	validarInputs(
		{
			form: "#validarFecha_HC812",
			orden: '1',
		},
		() => {
			$('#divFecha1').hide()
			$('#divFecha2').hide()
			validarAtendidos_HC812()
		},
		async () => {
			var año = document.querySelector('#año_HC812').value;
			var mes = document.querySelector('#mes_HC812').value;
			var dia = document.querySelector('#dia_HC812').value;
			$_HC812.fechaF2 = año.toString() + mes.toString() + dia.toString();
			$_HC812.reg_envio.llave = $_HC812.fechaF2 + moment().format('HHmm') + '               ';
			$_HC812.reg_envio.admin = localStorage.Usuario;
			$_HC812.reg_envio.sw_atend = '';
			await traerListadoUrgencias_HC812();
		}
	)
}

//  ************************** BUSQUEDA DE TRIAGE POR PACIENTE *********************************

function buscarPacienteF8_HC812() {
	$('#divPacienteF8').show();
	validarInputs(
		{
			form: "#validarPacienteF8_HC812",
			orden: '1',
		},
		() => {
			$('#divPacienteF8').hide();
			validarAtendidos_HC812()
		},
		async () => {
			var pac = document.querySelector('#pacienteF8_HC812').value;
			$_HC812.reg_envio.llave = '            ' + cerosIzq(pac, 15);
			$_HC812.reg_envio.admin = localStorage.Usuario;
			$_HC812.reg_envio.sw_atend = '';
			await traerListadoUrgencias_HC812();
		}
	)
}

function FNFPacientes_HC812() {
	parametros = {
		dll: "PACIENTES",
		valoresselect: ["Nombre del paciente"],
		f8data: "PACIENTES",
		columnas: [{ title: "COD" }, { title: "NOMBRE" }, { title: "EPS" }, { title: "EDAD" }],
		callback: async data => {
			$_HC812.reg_envio.llave = '            ' + cerosIzq(data.COD, 15);
			$_HC812.reg_envio.admin = '';
			$_HC812.reg_envio.sw_atend = '';
			await traerListadoUrgencias_HC812();
		},
		cancel: async () => {
			_ventanaUrgencias_HC812();
		},
	};
	F8LITE(parametros);
}