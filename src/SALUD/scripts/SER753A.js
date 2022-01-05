// MAESTRO - ACTUALIZA ENFERMEDADES TRANSMISIBLES DE NOTIFICACIÓN OBLIGATORIA
// DAVID.M -- SER753A -- OPCION 9-7-7-5-1-3-1

var $_SER753A = [];

$(document).ready(function () {
	loader('show');
	nombreOpcion('9, 7, 7, 5, 1, 3, 1 - Actualiza enfermedades transmisibles de notificación obligatoria');
	_inputControl('reset'); _inputControl('disabled');
	_cargarEnfermedades();
	_toggleF8([
		{ input: 'enfermedad', app: 'SER753A', funct: _ventanaEnfermedadesSER753A }
	]);
});

function _evaluarCON850_SER753A(novedad) {
	_inputControl('reset'); _inputControl('disabled');
	$_SER753A.novedad = novedad;
	document.getElementById('oper_SER753A').value = localStorage.Usuario;
	document.getElementById('fecha_SER753A').value = moment().format('YYYY/MM/DD');
	document.getElementById('novSER753A').value = ($_SER753A.novedad.id + ' - ' + $_SER753A.novedad.descripcion)
	console.log(novedad);
	switch (parseInt(novedad.id)) {
		case 7:
			validarEnfermedSER753A();
			break;
		case 8:
			validarEnfermedSER753A();
			break;
		case 9:
			validarEnfermedSER753A();
			break;
		default:
			_toggleNav();
			break;
	}
}

function validarEnfermedSER753A() {
	parseInt($_USUA_GLOBAL[0].FECHALNK) > 030100 ? $_SER753A.TIPO_ENF = 2 : $_SER753A.TIPO_ENF = 1;
	validarInputs(
		{
			form: "#validarEnfermedad_753A",
			orden: '1'
		},
		_toggleNav,
		() => {
			$_SER753A['enfermedad'] = document.getElementById("enfermedad_SER753A").value.trim().toUpperCase();
			if ($_SER753A.enfermedad.trim() != "") {
				const res = $_SER753A.ENFERMEDADES.find(e => e.COD_ENF == $_SER753A.enfermedad);
				if (res == undefined) {
					console.log($_SER753A.enfermedad)
					CON851('01', '01', false, 'error', 'error');
					validarEnfermedSER753A();
				} else {
					isNaN($_SER753A.enfermedad.substring(0, 3)) ? $_SER753A.TIPO_ENF = 2 : $_SER753A.TIPO_ENF = 1;
					document.querySelector('#descripEnfermedad_SER753A').value = res.NOMBRE_ENF;
					validarTipoSER753A();
				}
			} else {
				validarEnfermedSER753A();
			}
		}
	)
}

function validarTipoSER753A() {
	document.querySelector('#descripTipo_SER753A').value = "1 - MORDIBLIDAD,  2 - MORTALIDAD";
	document.getElementById("tipo_SER753A").value == "" ? document.getElementById("tipo_SER753A").value = "1" : false;
	validarInputs(
		{
			form: "#validarTipo_753A",
			orden: '1'
		},
		validarEnfermedSER753A,
		() => {
			$_SER753A['tipo'] = document.getElementById("tipo_SER753A").value.trim().toUpperCase();
			if ($_SER753A.tipo.trim() != "") {
				if ($_SER753A.tipo != "1" && $_SER753A.tipo != "2") {
					CON851('01', '01', validarTipoSER753A(), 'error', 'error');
				} else {
					$_SER753A.tipo == '1' ? document.querySelector('#descripTipo_SER753A').value = "MORBILIDAD" : document.querySelector('#descripTipo_SER753A').value = "MORTALIDAD";

					const res = $_SER753A.TRANSMISIBLES.find(e => e.COD_ENF_J + e.TIPO_ENF_J == $_SER753A.enfermedad + $_SER753A.tipo);
					switch ($_SER753A.novedad.id) {
						case '7':
							if (res == undefined) {
								validarOrdenSER753A()
							} else {
								CON851('00', '00', false, 'error', 'error');
								validarEnfermedSER753A();
							}
							break;
						case '8':
							if (res != undefined) {
								validarOrdenSER753A();
							} else {
								CON851('01', '01', false, 'error', 'error');
								validarEnfermedSER753A();
							}
							break;
						case '9':
							if (res != undefined) {
								$_SER753A.orden = "1";
								_envioDatoSER753A();
							} else {
								CON851('01', '01', false, 'error', 'error');
								validarEnfermedSER753A();
							}
							break;
					}
				}
			} else {
				validarTipoSER753A();
			}
		}
	)
}

function validarOrdenSER753A() {
	validarInputs(
		{
			form: "#validarOrden_753A",
			orden: '1'
		},
		validarTipoSER753A,
		() => {
			$_SER753A['orden'] = document.getElementById("orden_SER753A").value.trim().toUpperCase();
			if ($_SER753A.orden.trim() != "") {
				isNaN($_SER753A.orden) ? validarOrdenSER753A() : _envioDatoSER753A();
			} else {
				validarOrdenSER753A();
			}
		}
	)
}

function _envioDatoSER753A() {
	($_SER753A.enfermedad.trim() == "" || $_SER753A.tipo.trim() == "" || $_SER753A.orden.trim() == "") ? validarEnfermedSER753A() : on_guardarSER753A();
}

function on_guardarSER753A() {
	$_SER753A.FECHA = moment().format("YYYYMMDD");
	switch ($_SER753A.novedad.id) {
		case '7':
		case '8':
			$_SER753A.PARAMS = $_SER753A.enfermedad + '|' + $_SER753A.tipo + '|' + $_SER753A.orden + '|';
			console.log('nov 7 u 8')
			CON851P("01", validarOrdenSER753A, on_actualizarSER753A);
			break;
		case '9':
			$_SER753A.PARAMS = $_SER753A.enfermedad + '|' + $_SER753A.tipo + '|';
			console.log('nov 9')
			CON851P("54", validarEnfermedSER753A, on_actualizarSER753A);
			break;
	}
}

function on_actualizarSER753A() {
	let datos_envio = datosEnvio() + $_SER753A.novedad.id + '|' + $_SER753A.PARAMS;
	postData({
		datosh: datos_envio
	}, get_url('APP/SALUD/SER753A-01.DLL'))
		.then((data) => {
			if (data.split('|')[0] == "00") {
				if ($_SER753A.novedad.id == '7' || $_SER753A.novedad.id == '8') {
					toastr.success("Se ha actualizado correctamente el registro", "Actualiza enfermedades transmisibles");
				} else if ($_SER753A.novedad.id == '9') {
					toastr.success("Se ha eliminado correctamente el registro", "Actualiza enfermedades transmisibles");
				}
				_cargarEnfTransmisibles();
			} else {
				CON851('ERROR', 'ERROR AL ACTUALIZAR', validarOrdenSER753A());
			}
		})
		.catch((error) => {
			console.log(error)
			validarTipoSER753A();
		});
}

function _cargarEnfermedades() {
	postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER851.DLL"))
		.then(data => {
			$_SER753A.ENFERMEDADES = data.ENFERMEDADES;
			$_SER753A.ENFERMEDADES.pop()
			_cargarEnfTransmisibles();
		}).catch(err => {
			loader('hide');
			console.log('sale')
			_toggleNav();
		})
}

function _cargarEnfTransmisibles() {
	postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER753A.DLL"))
		.then(data => {
			$_SER753A.TRANSMISIBLES = data.TRANSMISIBLES;
			$_SER753A.TRANSMISIBLES.pop()
			llenarTablaSER753A();
			loader('hide');
		}).catch(err => {
			loader('hide');
			console.log('sale')
			_toggleNav();
		})
}

function _ventanaEnfermedadesSER753A(e) {
	console.debug(e, 'evento F8')
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos_lite_v2({
			titulo: 'VENTANA DE ENFERMEDADES',
			data: $_SER753A.ENFERMEDADES,
			indice: ["COD_ENF", 'NOMBRE_ENF'],
			mascara: [{
				"COD_ENF": 'CODIGO',
				"NOMBRE_ENF": "NOMBRE",
			}],
			minLength: 2,
			callback_esc: function () {
				$("#enfermedad_SER753A").focus();
			}, callback: function (data) {
				document.getElementById('enfermedad_SER753A').value = data.COD_ENF.trim();
				_enterInput('#enfermedad_SER753A');
			}
		});
	}
}

function llenarTablaSER753A() {
	$('#TABLA_SER753A tbody').html('');
	for (i in $_SER753A.TRANSMISIBLES) {
		const res = $_SER753A.ENFERMEDADES.find(e => e.COD_ENF == $_SER753A.TRANSMISIBLES[i].COD_ENF_J);
		$('#TABLA_SER753A tbody').append(
			'<tr>'
			+ '<td>' + parseInt($_SER753A.TRANSMISIBLES[i].ORDEN_ENF_J) + '</td>'
			+ '<td>' + $_SER753A.TRANSMISIBLES[i].COD_ENF_J + '</td>'
			+ '<td>' + $_SER753A.TRANSMISIBLES[i].TIPO_ENF_J + '</td>'
			+ '<td>' + res.NOMBRE_ENF + '</td>'
			+ "</tr>"
		)
	}
	CON850(_evaluarCON850_SER753A);
}