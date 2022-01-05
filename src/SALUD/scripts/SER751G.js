// LISTADO MORBILIDAD POR NUMERO DE ENVIO
// SANTIAGO - CREACION - 26/06/2020 - OPCION 9-7-7-5-1-6 SALUD
var $_SER751G = [], $_FORMATO_751G = [];

$(document).ready(() => {
	nombreOpcion('9,7,7,5,1,6 - Morbilidad por numero de envio');
	loader('show')
	_inputControl("reset");
	_inputControl("disabled");
	_cargarUnidServicios();

	_toggleF8([
		{ input: 'unidServ', app: 'SER751G', funct: _ventanaUnidServiciosSER751G },
		{ input: 'espec', app: 'SER751G', funct: _ventanaEspecialidadesSER751G },
		{ input: 'atiende', app: 'SER751G', funct: _ventanaAtiendeSER751G },
		{ input: 'entidad', app: 'SER751G', funct: _ventanaEntidadesSER751G },
		{ input: 'envio', app: 'SER751G', funct: _ventanaEnvioSER751G }
	]);
	$('#formatoimpresion_751G').select2().on('select2:select', validarFormato_751G);
})

function habilitarFORMATO_751G() {
	_inputControl('reset');
	$('#formatoimpresion_751G').val(null).removeAttr('disabled').trigger('change');
	$('#formatoimpresion_751G').select2('open')
}

function validarFormato_751G() {
	var seleccionado = $(this).val();
	if (seleccionado != "3") {
		if (seleccionado == "1") $_FORMATO_751G = 'PDF';
		else if (seleccionado == "2") $_FORMATO_751G = 'CSV';

		$(this).attr('disabled', 'true');
		validarUnidServSER751G();
	} else {
		$(this).attr('disabled', 'true');
		_toggleNav();
	}
}

function validarUnidServSER751G() {
	document.querySelector('#unidServ_SER751G').value == "" ? document.querySelector('#unidServ_SER751G').value = '**' : false;
	validarInputs(
		{
			form: '#validarUnidServ_751G',
			orden: '1'
		},
		() => {
			$('#formatoimpresion_751G').val(null).removeAttr('disabled').trigger('change');
			$('#formatoimpresion_751G').select2('open')
		},
		() => {
			$_SER751G['unidServ'] = document.getElementById("unidServ_SER751G").value.toUpperCase().trim();
			if ($_SER751G.unidServ == "**") {
				document.querySelector('#descripUnidServ_SER751G').value = "TODAS LAS UNIDADES DE SERV.";
				validarEspecialidadSER751G();
			} else {
				const res = $_SER751G.UNSERV.find(e => e.COD.trim() == $_SER751G.unidServ);
				if (res == undefined) {
					CON851('01', '01', null, 'error', 'error');
					validarUnidServSER751G();
				} else {
					document.querySelector('#descripUnidServ_SER751G').value = res.DESCRIP;
					validarEspecialidadSER751G();
				}
			}
		}
	);
}

function validarEspecialidadSER751G() {
	document.querySelector('#espec_SER751G').value == "" ? document.querySelector('#espec_SER751G').value = '***' : false;
	validarInputs(
		{
			form: '#validarEspec_751G',
			orden: '1'
		},
		() => {
			validarUnidServSER751G();
		},
		() => {
			$_SER751G['espec'] = document.getElementById("espec_SER751G").value.trim();
			if ($_SER751G.espec == "***") {
				document.querySelector('#descripEspec_SER751G').value = "TODAS LAS ESPECIALIDADES";
				validarAtiendeSER751G();
			} else {
				const res = $_SER751G.ESPEC.find(e => e.CODIGO.trim() == $_SER751G.espec);
				if (res == undefined) {
					CON851('01', '01', null, 'error', 'error');
					validarEspecialidadSER751G();
				} else {
					document.querySelector('#descripEspec_SER751G').value = res.NOMBRE;
					validarAtiendeSER751G();
				}
			}
		}
	);
}

function validarAtiendeSER751G() {
	document.querySelector('#atiende_SER751G').value == "" ? document.querySelector('#atiende_SER751G').value = '*' : false;
	validarInputs(
		{
			form: '#validarAtiende_751G',
			orden: '1'
		},
		() => {
			validarEspecialidadSER751G();
		},
		() => {
			$_SER751G['atiende'] = document.getElementById("atiende_SER751G").value.trim();
			if ($_SER751G.atiende == "*") {
				document.querySelector('#descripAtiende_SER751G').value = "TODO TIPO PERSONAL";
				validarEntidadSER751G();
			} else {
				const res = $_SER751G.SER830.find(e => e.COD.trim() == $_SER751G.atiende);
				if (res == undefined) {
					CON851('01', '01', null, 'error', 'error');
					validarAtiendeSER751G();
				} else {
					document.querySelector('#descripAtiende_SER751G').value = res.DESCRIP;
					validarEntidadSER751G();
				}
			}
		}
	);
}

function validarEntidadSER751G() {
	document.querySelector('#entidad_SER751G').value == "" ? document.querySelector('#entidad_SER751G').value = '******' : false;
	validarInputs(
		{
			form: '#validarEntidad_751G',
			orden: '1'
		},
		() => {
			validarAtiendeSER751G();
		},
		() => {
			$_SER751G['entidad'] = document.getElementById("entidad_SER751G").value.trim();
			if ($_SER751G.entidad == "******") {
				document.querySelector('#descripEntidad_SER751G').value = "TODOS LOS CODIGOS";
				validarEnvioSER751G();
			} else {
				const res = $_SER751G.ENTIDADES.find(e => e['COD-ENT'].trim() == $_SER751G.entidad);
				if (res == undefined) {
					CON851('01', '01', null, 'error', 'error');
					validarEntidadSER751G();
				} else {
					document.querySelector('#descripEntidad_SER751G').value = res['NOMBRE-ENT'];
					validarEnvioSER751G();
				}
			}
		}
	);
}

function validarEnvioSER751G() {
	validarInputs(
		{
			form: '#validarEnvio_751G',
			orden: '1'
		},
		() => {
			validarEntidadSER751G();
		},
		() => {
			$_SER751G['envio'] = document.getElementById("envio_SER751G").value.trim();
			const res = $_SER751G.ENVIOS.find(e => e.NRO.trim() == $_SER751G.envio);
			if (res == undefined) {
				CON851('01', '01', null, 'error', 'error');
				validarEnvioSER751G();
			} else {
				document.querySelector('#descripEnvio_SER751G').value = res.DESCRIPCION_TERCERO;
				validarListarPrimSER751G();
			
			}
		}
	);
}

function validarListarPrimSER751G() {
	document.querySelector('#listarPrim_SER751G').value == "" ? document.querySelector('#listarPrim_SER751G').value = '500' : false;
	validarInputs(
		{
			form: '#validarListarPrim_751G',
			orden: '1'
		},
		() => {
			validarEnvioSER751G();
		},
		() => {
			$_SER751G['listarPrim'] = document.getElementById("listarPrim_SER751G").value.toUpperCase().trim();
			if (parseInt($_SER751G.listarPrim) < 5) {
				validarListarPrimSER751G();
			} else {
				validarIncluirContrSER751G();
			}
		}
	);
}

function validarIncluirContrSER751G() {
	document.querySelector('#incluirContr_SER751G').value == "" ? document.querySelector('#incluirContr_SER751G').value = 'S' : false;
	document.getElementById("incluirContr_SER751G").setAttribute("placeholder", "S");
	validarInputs(
		{
			form: '#validarIncluirContr_751G',
			orden: '1'
		},
		() => {
			validarListarPrimSER751G();
		},
		() => {
			$_SER751G['incluirContr'] = document.getElementById("incluirContr_SER751G").value.toUpperCase().trim();
			($_SER751G.incluirContr == "S" || $_SER751G.incluirContr == "N") ? _envioImpresion() : validarIncluirContrSER751G();
		}
	);
}

function _envioImpresion() {
	CON850_P(function (e) {
		if (e.id == 'S') {

			loader('show')
			var datos_envio = datosEnvio() 
			+ localStorage.Usuario
			+ '|' + $_SER751G.unidServ
			+ '|' + $_SER751G.espec
			+ '|' + $_SER751G.atiende
			+ '|' + $_SER751G.entidad
			+ '|' + $_SER751G.envio
			+ '|' + $_SER751G.listarPrim
			+ '|' + $_SER751G.incluirContr;

			console.log(datos_envio, "datos_envio");

			postData({ datosh: datos_envio }, get_url('app/SALUD/SER752.DLL'))
				.then(_montarImpresion_SER751G)
				.catch(err => {
					console.log(err)
					validarIncluirContrSER751G();
				})
		} else {
			validarIncluirContrSER751G();
		}
	}, {
		msj: '00',
		overlay_show: true
	})
}

function _montarImpresion_SER751G(data) {
	data.Listado.pop();
	data.ENCABEZADO = [];

	let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
	let nit = $_USUA_GLOBAL[0].NIT.toString();
	let fecha = moment().format('MMM DD/YY');

	data.ENCABEZADO.push(nombreEmpresa);
	data.ENCABEZADO.push(nit);
	data.ENCABEZADO.push(fecha);
	data.ENCABEZADO.push(moment().format("HH:mm"));
	data.ENCABEZADO.push(document.querySelector('#descripAtiende_SER751G').value);

	var impresion = {
		datos: data,
		tipo: $_FORMATO_751G.toLowerCase(),
		formato: 'salud/SER751G.formato.html',
		nombre: 'LISTADO-MORBILIDAD-POR-NUMERO-ENVIO-' + localStorage.Sesion
	}
	loader('hide')

	imprimir(impresion, () => {
		_inputControl('reset');
		$('#formatoimpresion_751G').val(null).removeAttr('disabled').trigger('change');
		$('#formatoimpresion_751G').select2('open')
		// _toggleNav() 
	});
}

function _cargarUnidServicios() {
	postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER873.DLL"))
		.then(data => {
			$_SER751G.UNSERV = data.UNSERV;
			$_SER751G.UNSERV.pop();
			_cargarEspecialidades();
		}).catch(err => {
			loader('hide');
			_toggleNav();
		})
}

function _cargarEspecialidades() {
	postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER855.DLL"))
		.then(data => {
			$_SER751G.ESPEC = data.ESPECIALIDADES;
			$_SER751G.ESPEC.pop();
			_cargarAtiende();
		}).catch(err => {
			loader('hide');
			_toggleNav();
		})
}

function _cargarAtiende() {
	$_SER751G['SER830'] = [
		{ 'COD': '1', 'DESCRIP': consult_atiendProf('1') },
		{ 'COD': '2', 'DESCRIP': consult_atiendProf('2') },
		{ 'COD': '3', 'DESCRIP': consult_atiendProf('3') },
		{ 'COD': '4', 'DESCRIP': consult_atiendProf('4') },
		{ 'COD': '5', 'DESCRIP': consult_atiendProf('5') },
		{ 'COD': '6', 'DESCRIP': consult_atiendProf('6') },
		{ 'COD': '7', 'DESCRIP': consult_atiendProf('7') },
		{ 'COD': '8', 'DESCRIP': consult_atiendProf('8') },
		{ 'COD': '9', 'DESCRIP': consult_atiendProf('9') },
		{ 'COD': 'A', 'DESCRIP': consult_atiendProf('A') },
		{ 'COD': 'B', 'DESCRIP': consult_atiendProf('B') },
		{ 'COD': 'H', 'DESCRIP': consult_atiendProf('H') },
		{ 'COD': 'I,', 'DESCRIP': consult_atiendProf('I') },
		{ 'COD': 'O', 'DESCRIP': consult_atiendProf('O') },
		{ 'COD': 'T', 'DESCRIP': consult_atiendProf('T') }
	]
	loader('hide');
	setTimeout(function () { $('#formatoimpresion_751G').select2('open') }, 500)
	_cargarEntidades();
}

function _cargarEntidades() {
	postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER853.DLL"))
		.then(data => {
			$_SER751G.ENTIDADES = data.ENTIDADES;
			$_SER751G.ENTIDADES.pop();
			_cargarEnvio();
		}).catch(err => {
			loader('hide');
			_toggleNav();
		})
}

function _cargarEnvio() {
	postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER846.DLL"))
		.then(data => {
			loader('hide');
			$_SER751G.ENVIOS = data.ENVIOS;
			$_SER751G.ENVIOS.pop();
			console.log(data.ENVIOS);
			setTimeout(function () { $('#formatoimpresion_751G').select2('open') }, 500) 
		}).catch(err => {
			loader('hide');
			_toggleNav();
		})
}

function _ventanaUnidServiciosSER751G(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA UNIDADES DE SERVICIO",
			columnas: ["COD", "DESCRIP"],
			data: $_SER751G.UNSERV,
			callback_esc: function () {
				$("#unidServ_SER751G").focus();
			},
			callback: function (data) {
				document.getElementById('unidServ_SER751G').value = data.COD;
				_enterInput('#unidServ_SER751G');
			}
		});
	}
}

function _ventanaEspecialidadesSER751G(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA DE ESPECIALIDADES",
			columnas: ["CODIGO", "NOMBRE"],
			data: $_SER751G.ESPEC,
			callback_esc: function () {
				$("#espec_SER751G").focus();
			},
			callback: function (data) {
				document.getElementById('espec_SER751G').value = data.CODIGO;
				_enterInput('#espec_SER751G');
			}
		});
	}
}

function _ventanaAtiendeSER751G(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		SER830({ seleccion: $_SER751G.PERSONAL }, $('#atiende_SER751G'), (data) => {
			document.querySelector('#atiende_SER751G').value = data.COD;
			$_SER751G.atiende = data.COD;
			document.querySelector('#descripAtiende_SER751G').value = data.DESCRIP;
			_enterInput('#atiende_SER751G');
		})
	}
}

function _ventanaEntidadesSER751G(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA DE ENTIDADES",
			columnas: ["COD-ENT", "NOMBRE-ENT"],
			data: $_SER751G.ENTIDADES,
			callback_esc: function () {
				$("#entidad_SER751G").focus();
			},
			callback: function (data) {
				document.getElementById('entidad_SER751G').value = data['COD-ENT'];
				_enterInput('#entidad_SER751G');
			}
		});
	}
}

function _ventanaEnvioSER751G(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA DE ENVIOS",
			columnas: ["NRO", "NIT", "DESCRIPCION_TERCERO"],
			data: $_SER751G.ENVIOS,
			callback_esc: function () {
				$("#envio_SER751G").focus();
			},
			callback: function (data) {
				document.getElementById('envio_SER751G').value = data.NRO;
				_enterInput('#envio_SER751G');
			}
		});
	}
}