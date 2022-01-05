var $_HC810 = [];
$_HC810.NIT_USU = $_USUA_GLOBAL[0].NIT;

$_HC810.reg_envio = {
	fecha: null,
	paci: null,
	admin: null,
	sw_atend: null,
	era: '',
	suc: "",
	fechaFin: ""
}

$_HC810.fecha_act = moment().format("YYYYMMDD");

function _ventanaTriage_HC810(callback, esccallback) {
	var fuente = 
	/*html*/
	`<div id="TRIAGE" style="width: 540px">
		<div class="col-md-12">
			<div class="portlet light no-padding">
				<div class="portlet-body no-padding">
					<div class="form-group col-md-12 col-sm-12 col-xs-12 no-padding" style="margin: 0 auto;">

						<div class="col-md-12" style="display: flex">
							<div class="col-md-12" id="validarAtend_HC810">
								<label class="col-md-8" style="margin-top: 5px;">Desea ver los ya atendidos?</label>
								<div class="input-group col-md-2 col-sm-2 col-xs-2"> 
									<input type="text" id="atend_HC810" placeholder="N" class="form-control col-md-6" disabled="disabled" maxlength="1" data-orden="1" style="text-align: center" />
								</div>
							</div>
						</div>

						<div class="salto-linea"></div>

						<div class="col-md-12" style="display: flex">
							<div class="col-md-12" id="validarEra_HC810">
								<label class="col-md-8" style="margin-top: 5px;">LISTAR SOLO PAC.ERA?</label>
								<div class="input-group col-md-2 col-sm-2 col-xs-2"> 
									<input type="text" id="era_HC810" placeholder="N" class="form-control col-md-6" disabled="disabled" maxlength="1" data-orden="1" style="text-align: center" />
								</div>
							</div>
						</div>

						<div class="col-md-12 no-padding" style="display: none; margin-top: 11px;" id="divF2">
							<div class="col-md-12">
								<label class="col-md-12 text-center">Fecha Atención Inicial:</label>

								<div class="salto-linea"></div>

								<div class="col-md-12">	
									<div class="col-md-12 col-sm-12 col-xs-12" id="iniF2_HC810">
										<div class="col-md-4 col-sm-4 col-xs-4">
											<label class="col-md-12 col-sm-6 col-xs-6 text-center">Año:</label>
											<div class="input-group col-md-12 col-sm-5 col-xs-5">
											<input id="añoIniF2_HC810" type="number" class="form-control" maxlength="4" disabled="disabled" data-orden="1" required="true" style="text-align: center;">
											</div>
										</div>
			
										<div class="col-md-4 col-sm-4 col-xs-4">
											<label class="col-md-12 col-sm-6 col-xs-6 text-center">Mes:</label>
											<div class="input-group col-md-12 col-sm-5 col-xs-5">
												<input id="mesIniF2_HC810" type="number" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" disabled="disabled" data-orden="2" required="true" style="text-align: center;">
											</div>
										</div>
										<div class="col-md-4 col-sm-4 col-xs-4">
											<label class="col-md-12 col-sm-12 col-xs-6 text-center">Dia:</label>
											<div class="input-group col-md-12 col-sm-5 col-xs-5">
												<input id="diaIniF2_HC810" type="number" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" disabled="disabled" data-orden="3" required="true" style="text-align: center;">
											</div>
										</div>
									</div>
								</div>
							</div>

							<div class="col-md-12" style="margin-top: 7px;">
								<label class="col-md-12 text-center">Fecha Atención Final:</label>

								<div class="salto-linea"></div>

								<div class="col-md-12">	
									<div class="col-md-12 col-sm-12 col-xs-12" id="finF2_HC810">
										<div class="col-md-4 col-sm-4 col-xs-4">
											<label class="col-md-12 col-sm-6 col-xs-6 text-center">Año:</label>
											<div class="input-group col-md-12 col-sm-5 col-xs-5">
											<input id="añoFinF2_HC810" type="number" class="form-control" maxlength="4" disabled="disabled" data-orden="1" required="true" style="text-align: center;">
											</div>
										</div>
			
										<div class="col-md-4 col-sm-4 col-xs-4">
											<label class="col-md-12 col-sm-6 col-xs-6 text-center">Mes:</label>
											<div class="input-group col-md-12 col-sm-5 col-xs-5">
												<input id="mesFinF2_HC810" type="number" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" disabled="disabled" data-orden="2" required="true" style="text-align: center;">
											</div>
										</div>
										<div class="col-md-4 col-sm-4 col-xs-4">
											<label class="col-md-12 col-sm-12 col-xs-6 text-center">Dia:</label>
											<div class="input-group col-md-12 col-sm-5 col-xs-5">
												<input id="diaFinF2_HC810" type="number" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" disabled="disabled" data-orden="3" required="true" style="text-align: center;">
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>


						<div class="col-md-12" style="display: none" id="divPacienteF8">
							<div class="col-md-6 box-center text-center" id="validarPacienteF8_HC810">
								<label>Paciente:</label>
								<div class="inline-inputs">
									<input type="text" id="pacienteF8_HC810" class="form-control" disabled="disabled" maxlength="15" data-orden="1" style="text-align: center" />
									<button type="button" class="btn col-md-2 col-sm-2 col-xs-2 f8-Btn"> <i class="icon-magnifier"></i></button>
								</div>
							</div>
						</div>

						<div class="col-md-12" style="display: none" id="divFechaIni_HC810">

							<div class="salto-linea"></div>

							<div class="col-md-12 head-box">
								<label class="col-md-12 col-sm-12 col-xs-12 text-center">Impresión Masiva:</label>
							</div>

							<label class="col-md-12 col-sm-12 col-xs-12 text-center">Fecha Inicial:</label>

							<div class="col-md-12">
								<div class="col-md-12 col-sm-12 col-xs-12" id="validarFechaIniF9_HC810">
									<div class="col-md-4 col-sm-4 col-xs-4">
										<label class="col-md-12 col-sm-6 col-xs-6 text-center">Año:</label>
										<div class="input-group col-md-12 col-sm-5 col-xs-5">
											<input id="añoIni_HC810" type="number" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="4" disabled="disabled" data-orden="1" required="true" style="text-align: center;">
										</div>
									</div>

									<div class="col-md-4 col-sm-4 col-xs-4">
										<label class="col-md-12 col-sm-6 col-xs-6 text-center">Mes:</label>
										<div class="input-group col-md-12 col-sm-5 col-xs-5">
											<input id="mesIni_HC810" type="number" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" disabled="disabled" data-orden="2" required="true" style="text-align: center;">
										</div>
									</div>
									<div class="col-md-4 col-sm-4 col-xs-4">
										<label class="col-md-12 col-sm-12 col-xs-6 text-center">Dia:</label>
										<div class="input-group col-md-12 col-sm-5 col-xs-5">
											<input id="diaIni_HC810" type="number" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" disabled="disabled" data-orden="3" required="true" style="text-align: center;">
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="col-md-12" style="display: none" id="divFechaFin_HC810">
							<div class="salto-linea"></div>

							<label class="col-md-12 col-sm-12 col-xs-12 text-center">Fecha Final:</label>

							<div class="col-md-12">
								<div class="col-md-12 col-sm-12 col-xs-12" id="validarFechaFinF9_HC810">
									<div class="col-md-4 col-sm-4 col-xs-4">
										<label class="col-md-12 col-sm-6 col-xs-6 text-center">Año:</label>
										<div class="input-group col-md-12 col-sm-5 col-xs-5">
											<input id="añoFin_HC810" type="number" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="4" disabled="disabled" data-orden="1" required="true" style="text-align: center;">
										</div>
									</div>
									<div class="col-md-4 col-sm-4 col-xs-4">
										<label class="col-md-12 col-sm-6 col-xs-6 text-center">Mes:</label>
										<div class="input-group col-md-12 col-sm-5 col-xs-5">
											<input id="mesFin_HC810" type="number" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" disabled="disabled" data-orden="2" required="true" style="text-align: center;">
										</div>
									</div>
									<div class="col-md-4 col-sm-4 col-xs-4">
										<label class="col-md-12 col-sm-12 col-xs-6 text-center">Dia:</label>
										<div class="input-group col-md-12 col-sm-5 col-xs-5">
											<input id="diaFin_HC810" type="number" class="form-control col-md-12 col-sm-12 col-xs-12" maxlength="2" disabled="disabled" data-orden="3" required="true" style="text-align: center;">
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div style="clear:both;"></div>
	</div>`

	$_HC810.dialogo = bootbox.dialog({
		title: 'PACIENTE PARA TRIAGE',
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

	$_HC810.dialogo.on('shown.bs.modal', async function (e) {
		$('.modal-content').css({ 'position': 'fixed', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%, -50%)' })
		var h5 = document.createElement("h5");
		h5.innerHTML = "F2 Busca otra fecha &nbsp&nbsp F8 Busca por paciente &nbsp&nbsp F9 Impresión &nbsp&nbsp F10 Ingresa lista espera";
		$(".modal-footer").append(h5);
		$('.modal-footer').css({ 'height': '50px', 'margin-top': '-3px', 'color': '#476fad' })
		$('.modal-header h4').css({ 'color': '#476fad', 'font-weight': '500' })
		$('h5').css({ 'margin-top': '-3px', 'float': 'left' });

		validarAtendidos_HC810(callback, esccallback);

		_toggleF8([{
			input: 'atend', app: 'HC810', funct: (e) => {
				if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
					set_Event_validar('#validarAtend_HC810', 'off')
					$('#atend_HC810').attr('disabled', 'true')
					// $('[data-bb-handler="main"]').click();

					buscarPacienteF8();
				}
			}
		},])

		_toggleF8([{
			input: 'pacienteF8', app: 'HC810', funct: (e) => {
				if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
					set_Event_validar('#validarPacienteF8_HC810', 'off')
					$('#pacienteF8_HC810').attr('disabled', 'true')

					$('[data-bb-handler="main"]').click()
					FNFPacientes_HC810();
				}
			}
		},])
	})
}

async function validarAtendidos_HC810(callback, esccallback) {
	validarInputs(
		{
			form: "#validarAtend_HC810",
			orden: '1',
			event_f2: buscarFechaF2_HC810,
			event_f9: HC810B,
			event_f10: _Triage_HC810
		},
		() => {
			$('[data-bb-handler="main"]').click()
			if (localStorage.Modulo.trim() == 'SAL') {
				esccallback()
			} else {
				validarPaciente();
			}
		},
		() => {
			document.querySelector('#atend_HC810').value = document.querySelector('#atend_HC810').value.toUpperCase() == 'S' ? 'S' : 'N';
			var atend = document.querySelector('#atend_HC810').value.toUpperCase();
			$_HC810.reg_envio.sw_atend = atend;
			datoCovid19_HC810(callback, esccallback);
		}
	)
}

function datoCovid19_HC810(callback, esccallback) {
	validarInputs(
		{
			form: "#validarEra_HC810",
			orden: '1',
		},
		() => {
			validarAtendidos_HC810(callback, esccallback);
		},
		async () => {
			document.querySelector('#era_HC810').value = document.querySelector('#era_HC810').value.toUpperCase() == 'S' ? 'S' : 'N';
			var era = document.querySelector('#era_HC810').value.toUpperCase();
			$_HC810.reg_envio.fecha = moment().format('YYYYMMDD');
			$_HC810.reg_envio.paci = '';
			$_HC810.reg_envio.admin = localStorage.Usuario;
			$_HC810.reg_envio.era = era;
			await traerListadoTriage_HC810(callback, esccallback);
		}
	)
}

async function traerListadoTriage_HC810(callback, esccallback) {
	loader('show');
	let datos_envio = [
		$_HC810.reg_envio.fecha,
		$_HC810.reg_envio.paci,
		$_HC810.reg_envio.admin,
		$_HC810.reg_envio.sw_atend,
		$_HC810.reg_envio.era,
		$_HC810.reg_envio.suc,
		$_HC810.reg_envio.fechaFin
	]

	await postData({ datosh: datosEnvio() + datos_envio.join("|") + "|" }, get_url("APP/HICLIN/HC810.DLL"))
		.then(async (data) => {
			$_HC810.arrayTriage = [];
			for (var i in data['REG-TRIAG']) {
				if (data['REG-TRIAG'][i].FECHA_TRIA.trim() != '' || data['REG-TRIAG'][i].HORA_TRIA.trim() != '' || data['REG-TRIAG'][i].OPER_TRIA.trim() != '' || data['REG-TRIAG'][i].CONDUCTA_TRIA.trim() != '') {
					$_HC810.arrayTriage.push(data['REG-TRIAG'][i]);
				}
			}
			$_HC810.arrayTriage = $_HC810.arrayTriage.reverse();
			await _mostrarListadoTriage_HC810(callback, esccallback);
		})
		.catch((err) => {
			$('[data-bb-handler="main"]').click()
			console.log(err, 'err')
			loader('hide')
			if (localStorage.Modulo.trim() == 'SAL'){
				esccallback();
			} else {
				setTimeout(() => { _ventanaTriage_HC810(callback, esccallback); }, 450);
			}
		});
	loader('hide');
}

async function _mostrarListadoTriage_HC810(callback, esccallback) {
	for (var i in $_HC810.arrayTriage) {
		$_HC810.arrayTriage[i]['Turno'] = $_HC810.arrayTriage[i]['TURNO_TRIA'];
		$_HC810.arrayTriage[i]['Fecha'] = $_HC810.arrayTriage[i]['FECHA_TRIA'];
		$_HC810.arrayTriage[i]['Hora'] = $_HC810.arrayTriage[i]['HORA_TRIA'].substring(0, 2) + ':' + $_HC810.arrayTriage[i]['HORA_TRIA'].substring(2, 4);
		$_HC810.arrayTriage[i]['Apellido 1'] = $_HC810.arrayTriage[i]['1ER_APEL_TRIA'].trim();
		$_HC810.arrayTriage[i]['Apellido 2'] = $_HC810.arrayTriage[i]['2DO_APEL_TRIA'].trim();
		$_HC810.arrayTriage[i]['Nombre'] = $_HC810.arrayTriage[i]['1ER_NOM_TRIA'].trim();
		$_HC810.arrayTriage[i]['Conducta'] = $_HC810.arrayTriage[i]['CONDUCTA_TRIA'];
		$_HC810.arrayTriage[i]['Estado'] = $_HC810.arrayTriage[i]['ESTADO_TRIA'];
		$_HC810.arrayTriage[i]['Estado_descrip'] = $_HC810.arrayTriage[i]['ESTADO_DESCRIP'];
		$_HC810.arrayTriage[i]['Espera'] = parseFloat($_HC810.arrayTriage[i]['ESPERA_TRIA'].replace(/\s/g, '')) || 0;
		$_HC810.arrayTriage[i]['Operador'] = $_HC810.arrayTriage[i]['OPER_TRIA'];
		$_HC810.arrayTriage[i]['Prioridad'] = $_HC810.arrayTriage[i]['PRIORIDAD_TRIA'];
		$_HC810.arrayTriage[i]['color'] = parseInt($_HC810.arrayTriage[i]['COLOR_TRIA']);

		var aux = '';
		switch ($_HC810.arrayTriage[i]['EDAD_TRIA'].substring(0, 1)) {
			case 'A': aux = ' Años'; break;
			case 'M': aux = ' Meses'; break;
			case 'D': aux = ' Dias'; break;
		}
		$_HC810.arrayTriage[i]['EDAD_TRIA'].substring(1, 4).trim() == '' ? $_HC810.arrayTriage[i]['EDAD_TRIA'] = $_HC810.arrayTriage[i]['EDAD_TRIA'].substring(0, 1) + '0  ' : false;
		$_HC810.arrayTriage[i]['Edad'] = parseFloat($_HC810.arrayTriage[i]['EDAD_TRIA'].substring(1, 4)) + aux;
		$_HC810.arrayTriage[i]['Entidad'] = $_HC810.arrayTriage[i]['ENTIDAD_TRIA'];
	}

	if ($_HC810.arrayTriage.length < 1) {
		CON851('08', '08', null, 'error', 'error')
		$('[data-bb-handler="main"]').click()
		setTimeout(() => { _ventanaTriage_HC810(callback, esccallback); }, 450);
	} else {
		let obj_triage = $_HC810.arrayTriage.sort((a, b)=>{return b.Espera - a.Espera});
		obj_triage.reverse().map((a, b) => {
			a.Item = b + 1;
		});

		_ventanaDatos({
			titulo: `PACIENTE PARA TRIAGE  &nbsp&nbsp&nbsp&nbsp ${moment().format('dddd DD MMM/YY')}`,
			columnas: ["Item","Turno", "Fecha", 'Hora', 'Apellido 1', 'Apellido 2', 'Nombre', 'Edad', 'Entidad', 'Conducta', 'Estado_descrip', 'Espera', 'Prioridad', 'Operador'],
			ancho: 1300,
			data: obj_triage.reverse(),
			orden: false,
			footer_global: "F9 - Imprimir registro",
			// data: $_HC810.arrayTriage,
			callback_esc: function () {
				$('[data-bb-handler="main"]').click()
				if (localStorage.Modulo.trim() == 'SAL') {
					esccallback()
				} else {
					setTimeout(() => { _ventanaTriage_HC810(); }, 500);
				}
			},
			callback: function (data) {
				$('[data-bb-handler="main"]').click()
				if (localStorage.Modulo.trim() == 'SAL') {
					callback();
				} else {
					$_REG_HC.llave_triage_w = data.LLAVE_TRIA;
					$_REG_HC.edad_w = data.EDAD_TRIA;
					llamarHC000();
				}
			},
			event_f3: (data) => { eliminarReg_HC810(data) },
			event_f9: async (data) => {
				loader("show");
				await _impresion2({
					tipo: 'pdf',
					archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmssS')}.pdf`,
					content: await _imprimirTriage({}, null, { data: data }),
			    }).then(data => {
					console.log('Impresión terminada')
					loader('hide');
					$('#divF2').hide();
					$('#divPacienteF8').hide();
					validarAtendidos_HC810()
				}).catch((err) => {
					loader('hide');
					console.error(err);
					$('#divF2').hide();
					$('#divPacienteF8').hide();
					validarAtendidos_HC810()
				});
			}
		});
	}
}

function eliminarReg_HC810(data) {
	if (localStorage.Usuario == 'ADMI' || localStorage.Usuario == 'GEBC') {
		setTimeout(() => {
			CON851P('02',
				() => { traerListadoTriage_HC810($_HC810.reg_envio); },
				async () => {
					loader('show');
					await postData({ datosh: datosEnvio() + data.LLAVE_TRIA + '|' }, get_url("APP/HICLIN/HC810-1.DLL"))
						.then(async (data) => {
							toastr.success("Registro eliminado");
							traerListadoTriage_HC810($_HC810.reg_envio)
						})
						.catch((err) => {
							console.log(err, 'err')
							traerListadoTriage_HC810($_HC810.reg_envio)
						});
					loader('hide');
				}
			);
		}, 200);
	} else {
		traerListadoTriage_HC810($_HC810.reg_envio);
	}
}

function _Triage_HC810() {
	if ($_HC810.NIT_USU == 800037021) {
		console.log('BLOQUEA F10')
		validarAtendidos_HC810();
	} else {
		set_Event_validar('#atend_HC810', 'off');
		$('[data-bb-handler="main"]').click()

		set_Event_validar('#busqpaci_his', 'off');
		let { ipcRenderer } = require("electron");
		ipcRenderer.send('another', datos = { directorio: 'SALUD/paginas/SER880.html' });
		_EventocrearSegventana(['on', 'Triage...'], () => { _ventanaTriage_HC810(); });
	}
}

//  ************************** BUSQUEDA DE TRIAGE POR FECHA *********************************

function buscarFechaF2_HC810() {
	$('#divF2').show()

	if(document.querySelector('#mesIniF2_HC810').value == 0) {
	   document.querySelector('#añoIniF2_HC810').value = $_HC810.fecha_act.slice(0,4);
	   document.querySelector('#mesIniF2_HC810').value = $_HC810.fecha_act.slice(4,6);
	   document.querySelector('#diaIniF2_HC810').value = $_HC810.fecha_act.slice(6,8);
	}

	validarInputs(
		{
			form: "#iniF2_HC810",
			orden: '1',
		},
		() => {
			$('#divF2').hide()
			validarAtendidos_HC810()
		},
		async () => {
			var año = document.querySelector('#añoIniF2_HC810').value;
			var mes = document.querySelector('#mesIniF2_HC810').value;
			var dia = document.querySelector('#diaIniF2_HC810').value;
			$_HC810.fechaF2 = año.toString() + mes.toString() + dia.toString();
			$_HC810.reg_envio.fecha = $_HC810.fechaF2;
			$_HC810.reg_envio.paci = '';
			$_HC810.reg_envio.admin = '';
			$_HC810.reg_envio.sw_atend = '';
			datoFechaFin_HC810();
			// await traerListadoTriage_HC810();
		}
	)
}

function datoFechaFin_HC810() {
	if(document.querySelector('#mesFinF2_HC810').value == 0) {
	   document.querySelector('#añoFinF2_HC810').value = $_HC810.fecha_act.slice(0,4);
	   document.querySelector('#mesFinF2_HC810').value = $_HC810.fecha_act.slice(4,6);
	   document.querySelector('#diaFinF2_HC810').value = $_HC810.fecha_act.slice(6,8);
	}

	validarInputs(
		{
			form: "#finF2_HC810",
			orden: '1',
		},
		() => {
			$('#divF2').hide()
			buscarFechaF2_HC810()
		},
		async () => {
			var año = document.querySelector('#añoFinF2_HC810').value;
			var mes = document.querySelector('#mesFinF2_HC810').value;
			var dia = document.querySelector('#diaFinF2_HC810').value;
			$_HC810.fechaFinF2 = año.toString() + mes.toString() + dia.toString();
			$_HC810.reg_envio.fechaFin = $_HC810.fechaFinF2;
			await traerListadoTriage_HC810();
		}
	)
}

//  ************************** BUSQUEDA DE TRIAGE POR PACIENTE *********************************

function buscarPacienteF8() {
	$('#divPacienteF8').show();
	validarInputs(
		{
			form: "#validarPacienteF8_HC810",
			orden: '1',
		},
		() => {
			$('#divPacienteF8').hide();
			validarAtendidos_HC810()
		},
		async () => {
			var pac = document.querySelector('#pacienteF8_HC810').value;
			$_HC810.reg_envio.fecha = '0';
			$_HC810.reg_envio.paci = cerosIzq(pac, 15);
			$_HC810.reg_envio.admin = '';
			$_HC810.reg_envio.sw_atend = '';
			await traerListadoTriage_HC810();
		}
	)
}

//  ************************** IMPRESION MASIVA TRIAGE POR FECHA *********************************

function HC810B() {
	$('#divFechaIni_HC810').show()

	validarFechaInicial_HC810();
}

function validarFechaInicial_HC810() {
	validarInputs(
		{
			form: "#validarFechaIniF9_HC810",
			orden: '1',
		},
		() => {
			$('#divFechaIni_HC810').hide()

			validarAtendidos_HC810()
		},
		async () => {
			var añoIni = document.querySelector('#añoIni_HC810').value;
			var mesIni = document.querySelector('#mesIni_HC810').value;
			var diaIni = document.querySelector('#diaIni_HC810').value;
			$_HC810.fechaIniF9 = añoIni.toString() + mesIni.toString() + diaIni.toString();

			validarFechaFinal_HC810();
		}
	)
}

function validarFechaFinal_HC810() {
	$('#divFechaFin_HC810').show()

	validarInputs(
		{
			form: "#validarFechaFinF9_HC810",
			orden: '1',
		},
		() => {
			$('#divFechaFin_HC810').hide()

			validarFechaInicial_HC810()
		},
		async () => {
			var añoFin = document.querySelector('#añoFin_HC810').value;
			var mesFin = document.querySelector('#mesFin_HC810').value;
			var diaFin = document.querySelector('#diaFin_HC810').value;
			$_HC810.fechaFinF9 = añoFin.toString() + mesFin.toString() + diaFin.toString();

			buscarTriageImpresion_HC810();
		}
	)
}

async function buscarTriageImpresion_HC810() {
	loader('show');
	$_HC810.dataBase64 = [];
	await postData({ datosh: datosEnvio() + $_HC810.fechaIniF9 + '|' + '' + '|' + localStorage.Usuario + '|' + '' + '|' + '' + '|' + $_HC810.fechaFinF9 }, get_url("APP/HICLIN/HC810.DLL"))
		.then(async (data) => {
			$_HC810.arrayTriage = [];
			for (var i in data['REG-TRIAG']) {
				if (data['REG-TRIAG'][i].FECHA_TRIA.trim() != '' || data['REG-TRIAG'][i].HORA_TRIA.trim() != '' || data['REG-TRIAG'][i].OPER_TRIA.trim() != '' || data['REG-TRIAG'][i].CONDUCTA_TRIA.trim() != '') {
					$_HC810.arrayTriage.push(data['REG-TRIAG'][i]);
				}
			}

			for (var i in $_HC810.arrayTriage) {
				var lnk = {};
				lnk.llave_triage_w = $_HC810.arrayTriage[i].LLAVE_TRIA;
				lnk.edad_w = $_HC810.arrayTriage[i].EDAD_TRIA;

				await llamarImpresionMasiva_HC810(lnk);
			}

			$('#divFechaIni_HC810').hide()
			$('#divFechaFin_HC810').hide()

			var merger = new PDFMerger();

			for (var i in $_HC810.dataBase64) {
				if ($_HC810.dataBase64[i] != undefined) {
					var x = await new Buffer.from($_HC810.dataBase64[i]);
					await merger.add(x);
				}
			}

			$_HC810.nombre_pdf2 = `C:/PROSOFT/TEMP/${localStorage.Usuario + moment().format('-YYMMDD-HHmmssS')}.pdf`
			await merger.save($_HC810.nombre_pdf2);

			child(`start ${$_HC810.nombre_pdf2}`);

			validarAtendidos_HC810();

		})
		.catch((err) => {
			$('#divFechaIni_HC810').hide()
			$('#divFechaFin_HC810').hide()
			validarAtendidos_HC810();
			console.log(err, 'err')
		});
	loader('hide');
}

async function llamarImpresionMasiva_HC810(lnk) {
	await postData({ datosh: datosEnvio() + localStorage.Usuario + '|' + lnk.edad_w + '|' + localStorage.IDUSU + '|' + lnk.llave_triage_w + '|' + 'S' + '|' }, get_url("APP/HICLIN/HC000.DLL"))
		.then(async (data) => {
			data.ANALISIS_TRIA = data.ANALISIS_TRIA.replace(/\&/g, "\n").trim();
			data.ANTECED_FAMIL_TRIA = data.ANTECED_FAMIL_TRIA.replace(/\&/g, "\n").trim();
			data.ANTECED_PATOL_TRIA = data.ANTECED_PATOL_TRIA.replace(/\&/g, "\n").trim();
			data.ANTECED_QUIRUR_TRIA = data.ANTECED_QUIRUR_TRIA.replace(/\&/g, "\n").trim();
			data.ANTECED_ALERGICOS_TRIA = data.ANTECED_ALERGICOS_TRIA.replace(/\&/g, "\n").trim();
			data.ATIENDE_PROF = data.ATIENDE_PROF.trim();
			data.CAUSA_TRIA = data.CAUSA_TRIA.trim();
			data.CHIKUN_TRIA = data.CHIKUN_TRIA.trim();
			data.COMP_SERV_TRIA = data.COMP_SERV_TRIA.trim();
			data.CONDUCTA_TRIA = data.CONDUCTA_TRIA.trim();
			data.CONSUL_TRIA = data.CONSUL_TRIA.trim();
			data.DESCRIP_CAUSA_TRIA = data.DESCRIP_CAUSA_TRIA.trim();
			data.DESCRIP_CONDUCTA_TRIA = data.DESCRIP_CONDUCTA_TRIA.trim();
			data.DESCRIP_EMBAR_TRIA = data.DESCRIP_EMBAR_TRIA.trim();
			data.DESCRIP_FINALID_TRIA = data.DESCRIP_FINALID_TRIA.trim();
			data.DESCRIP_PROF = data.DESCRIP_PROF.trim();
			data.EDAD_GEST_TRIA = data.EDAD_GEST_TRIA.trim();
			data.EDAD_TRIA = isNaN(parseFloat(data.EDAD_TRIA.substring(1, 4))) ? data.EDAD_TRIA.substring(0, 1) + '0  ' : data.EDAD_TRIA;
			data.EMBAR_TRIA = data.EMBAR_TRIA.trim();
			data.EPS_TRIA = data.EPS_TRIA.trim();
			data.ENTIDAD = data.ENTIDAD.trim();
			data.ERA_TRIA = data.ERA_TRIA.trim();

			for (var i in data.EXAMEN_FISICO_TRIA) {
				data.EXAMEN_FISICO_TRIA[i].ALTERADO_EXA_TRIA = data.EXAMEN_FISICO_TRIA[i].ALTERADO_EXA_TRIA.trim();
				data.EXAMEN_FISICO_TRIA[i].EXA_FISICO_TRIA = data.EXAMEN_FISICO_TRIA[i].EXA_FISICO_TRIA.replace(/\&/g, "\n").trim();
			}

			data.FACT_TRIA = data.FACT_TRIA.trim();
			data.FCARD_TRIA = isNaN(parseFloat(data.FCARD_TRIA)) ? 0 : parseFloat(data.FCARD_TRIA);
			data.FECHA_ATEN_TRIA = data.FECHA_ATEN_TRIA.trim();
			data.FECHA_REGLA_TRIA = data.FECHA_REGLA_TRIA.trim();
			data.FINALID_TRIA = data.FINALID_TRIA.trim();
			data.FOLIO_CONSUL_TRIA = data.FOLIO_CONSUL_TRIA.trim();
			data.FRESP_TRIA = isNaN(parseFloat(data.FRESP_TRIA)) ? 0 : parseFloat(data.FRESP_TRIA);
			data.GLASG_EDIT_TRIA = data.GLASG_EDIT_TRIA.trim();
			data.GLASG_TRIA = data.GLASG_TRIA.trim();
			data.HORA_ATEN_TRIA = data.HORA_ATEN_TRIA.trim();
			data.INDICACIONES_TRIA = data.INDICACIONES_TRIA.replace(/\&/g, "\n").trim();
			data.ING_REMITIDO_TRIA = data.ING_REMITIDO_TRIA.trim();
			data.LLAVE_TRIA = data.LLAVE_TRIA.trim();
			data.MEDICO_TRIA = data.MEDICO_TRIA.trim();
			data.DESCRIP_PROF = data.DESCRIP_PROF.trim();
			data.MEDLEGAL_TRIA = data.MEDLEGAL_TRIA.trim();
			data.MOTIV_TRIA = data.MOTIV_TRIA.replace(/\&/g, "\n").trim();
			data.MSJ_ENCAB = data.MSJ_ENCAB.trim();
			data.NOMBRE_CIU = data.NOMBRE_CIU.trim();
			data.NOMBRE_ENT = data.NOMBRE_ENT.trim();
			data.OBSER_INI_TRIA = data.OBSER_INI_TRIA.replace(/\&/g, "\n").trim();
			data.OBSER_TRIA = data.OBSER_TRIA.replace(/\&/g, "\n").trim();
			data.OPER_ELABHC_TRIA = data.OPER_ELABHC_TRIA.trim();
			data.OPER_ELAB_TRIA = data.OPER_ELAB_TRIA.trim();
			data.OPER_MODIHC_TRIA = data.OPER_MODIHC_TRIA.trim();
			data.OPER_MODI_TRIA = data.OPER_MODI_TRIA.trim();
			data.OXIMETRIA_TRIA = data.OXIMETRIA_TRIA.trim();
			data.PESO_EDIT = data.PESO_EDIT.trim();
			data.PESO_GRAMOS_TRIA = isNaN(parseFloat(data.PESO_GRAMOS_TRIA)) ? 0 : parseFloat(data.PESO_GRAMOS_TRIA);
			data.PESO_TRIA = isNaN(parseFloat(data.PESO_TRIA)) ? 0 : parseFloat(data.PESO_TRIA);
			data.PREFE_TRIA = data.PREFE_TRIA.trim();
			data.PRIORIDAD_TRIA = data.PRIORIDAD_TRIA;
			data.PROCED_TRIA = data.PROCED_TRIA.replace(/\&/g, "\n").trim();
			data.PUERTA_ING_TRIA = data.PUERTA_ING_TRIA.trim();
			data.PYP_TRIA = data.PYP_TRIA.trim();
			data.REINGRESO_TRIA = data.REINGRESO_TRIA.trim();
			data.REMITIDO_TRIA = data.REMITIDO_TRIA.trim();
			data.SINTOM_OBSTE_TRIA = data.SINTOM_OBSTE_TRIA.trim();
			data.SUCURSAL_TRIA = data.SUCURSAL_TRIA.trim();
			data.TALLA_TRIA = isNaN(parseFloat(data.TALLA_TRIA)) ? 0 : parseFloat(data.TALLA_TRIA);
			data.TEMP_TRIA = isNaN(parseFloat(data.TEMP_TRIA)) ? 0 : parseFloat(data.TEMP_TRIA);
			data.TENS1_TRIA = isNaN(parseFloat(data.TENS1_TRIA)) ? 0 : parseFloat(data.TENS1_TRIA);
			data.TENS2_TRIA = isNaN(parseFloat(data.TENS2_TRIA)) ? 0 : parseFloat(data.TENS2_TRIA);
			data.TRAUMA_TRIA = data.TRAUMA_TRIA;
			data.TURNO_TRIA = data.TURNO_TRIA;
			data.UMI_TRIA = data.UMI_TRIA;
			data.UND_PESO_TRIA = isNaN(parseFloat(data.UND_PESO_TRIA)) ? 0 : parseFloat(data.UND_PESO_TRIA);
			data.DESCRIP_PACI = data.DESCRIP_PACI;
			data.COD_PACI = data.COD_PACI;
			data.SEXO_PACI = data.SEXO_PACI;
			data.DIRECC_PACI = data.DIRECC_PACI;
			data.TELEFONO_PACI = data.TELEFONO_PACI;
			data.NOMBRE_ESP_MEDICO = data.NOMBRE_ESP_MEDICO;
			data.REG_MEDICO = data.REG_MEDICO;

			await _impresion2({
				tipo: 'pdf',
				archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmssS')}.pdf`,
				content: await _imprimirTriage(data),
				retornar: true
			}).then(data => {
				$_HC810.dataBase64.push(data);
			}).catch((err) => {
				console.error(err);
			});
		})
		.catch((err) => {
			console.log(err, 'err')
			//   salir_HC000();
			loader('hide')
		});
}

function FNFPacientes_HC810() {
	parametros = {
		dll: "PACIENTES",
		valoresselect: ["Nombre del paciente"],
		f8data: "PACIENTES",
		columnas: [{ title: "COD" }, { title: "NOMBRE" }, { title: "EPS" }, { title: "EDAD" }],
		callback: async data => {
			$_HC810.reg_envio.fecha = '            ';
			$_HC810.reg_envio.paci = cerosIzq(data.COD, 15);
			$_HC810.reg_envio.admin = '';
			$_HC810.reg_envio.sw_atend = '';
			await traerListadoTriage_HC810();
		},
		cancel: async () => {
			_ventanaTriage_HC810();
		},
	};
	F8LITE(parametros);
}