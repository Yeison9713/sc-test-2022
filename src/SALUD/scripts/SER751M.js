// LISTADO MORBILIDAD POR CONSULTA TIPO DE PACIENTE
// DAVID.M - CREACION - 29/06/2020 - OPCION 9-7-7-5-1-8 SALUD
var $_SER751M = [], $_FORMATO_751M = [];

$(document).ready(() => {
	loader('show')
	_inputControl("reset");
	_inputControl("disabled");
	nombreOpcion('9,7,7,5,1,8 - Morbilidad por consulta x tipo de paciente');
	_cargarUnidServicios();


	_toggleF8([
		{ input: 'unidServ', app: 'SER751M', funct: _ventanaUnidServiciosSER751M },
		{ input: 'espec', app: 'SER751M', funct: _ventanaEspecialidadesSER751M },
		{ input: 'costo', app: 'SER751M', funct: _ventanaCostosSER751M },
		{ input: 'tipoUsua', app: 'SER751M', funct: _ventanaTipoUsuarioSER751M },
		{ input: 'entidad', app: 'SER751M', funct: _ventanaEntidadesSER751M },
		{ input: 'numero', app: 'SER751M', funct: _ventanaFacturacionSER751M },
		{ input: 'atiende', app: 'SER751M', funct: _ventanaAtiendeSER751M }
	]);
	$('#formatoimpresion_751M').select2().on('select2:select', validarFormato_751M);
})

function habilitarFORMATO_751M() {
	_inputControl('reset');
	$('#formatoimpresion_751M').val(null).removeAttr('disabled').trigger('change');
	$('#formatoimpresion_751M').select2('open')
}

function validarFormato_751M() {
	var seleccionado = $(this).val();
	if (seleccionado != "3") {
		if (seleccionado == "1") $_FORMATO_751M = 'PDF';
		else if (seleccionado == "2") $_FORMATO_751M = 'CSV';

		$(this).attr('disabled', 'true');
		validarUnidServSER751M();
	} else {
		$(this).attr('disabled', 'true');
		_toggleNav();
	}
}

function validarUnidServSER751M() {
	document.querySelector('#unidServ_SER751M').value == "" ? document.querySelector('#unidServ_SER751M').value = '**' : false;
	validarInputs(
		{
			form: '#validarUnidServ_751M',
			orden: '1'
		},
		() => {
			$('#formatoimpresion_751M').val(null).removeAttr('disabled').trigger('change');
			$('#formatoimpresion_751M').select2('open')
		},
		() => {
			$_SER751M['unidServ'] = document.getElementById("unidServ_SER751M").value.toUpperCase().trim();
			if ($_SER751M.unidServ == "**") {
				document.querySelector('#descripUnidServ_SER751M').value = "TODAS LAS UNIDADES DE SERV.";
				validarPrefijoSER751M();
			} else {
				const res = $_SER751M.UNSERV.find(e => e.COD.trim() == $_SER751M.unidServ);
				if (res == undefined) {
					CON851('01', '01', null, 'error', 'error');
					validarUnidServSER751M();
				} else {
					document.querySelector('#descripUnidServ_SER751M').value = res.DESCRIP;
					validarPrefijoSER751M();
				}
			}
		}
	);
}

function validarPrefijoSER751M() {
	document.querySelector('#prefijo_SER751M').value == "" ? document.querySelector('#prefijo_SER751M').value = '*' : false;
	validarInputs(
		{
			form: '#validarPrefijo_751M',
			orden: '1'
		},
		() => {
			validarUnidServSER751M();
		},
		() => {
			$_SER751M['prefijo'] = document.getElementById("prefijo_SER751M").value.toUpperCase().trim();
			if ($_SER751M.prefijo == "*") {
				$_SER751M.numero = "000000";
				document.querySelector('#numero_SER751M').value = $_SER751M.numero;
				document.querySelector('#descripNumero_SER751M').value = "TODAS LAS FACTURAS";
				datoInicialSER751M();
			} else {
				var arrayPrefijos = ["A", "P", "T", "B", "D", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "Q",
					"R", "S", "V", "W", "X", "Y", "Z"];
				const res = arrayPrefijos.find(e => e == $_SER751M.prefijo);
				res == undefined ? validarPrefijoSER751M() : validarNumeroSER751M();
			}
		}
	);
}

function validarNumeroSER751M() {
	validarInputs(
		{
			form: '#validarNumero_751M',
			orden: '1'
		},
		() => {
			validarPrefijoSER751M();
		},
		() => {
			$_SER751M['numero'] = document.getElementById("numero_SER751M").value.toUpperCase().trim();
			const res = $_SER751M.FACTURAS.find(e => e.COD.substring(1, 7).trim() == $_SER751M.numero);
			if (res == undefined) {
				CON851('01', '01', null, 'error', 'error');
				validarNumeroSER751M();
			} else {
				document.querySelector('#descripNumero_SER751M').value = res.DESCRIP;
				console.log(res.FECHA_ING, "fecha");
				datoInicialSER751M(res);
				// validarFechaInicialSER751M('1');
			}
		}
	);
}

function datoInicialSER751M(res) {
	if ($_SER751M.prefijo != "*") {
		document.querySelector('#diaInicial_751M').value = res.FECHA_ING.substring(6, 8);
		document.querySelector('#mesInicial_751M').value = res.FECHA_ING.substring(4, 6);
		document.querySelector('#añoInicial_751M').value = res.FECHA_ING.substring(0, 4);

		if (res.FECHARET != "00000000" && res.FECHARET.trim() != "") {
			document.querySelector('#diaFinal_751M').value = res.FECHARET.substring(6, 8);
			document.querySelector('#mesFinal_751M').value = res.FECHARET.substring(4, 6);
			document.querySelector('#añoFinal_751M').value = res.FECHARET.substring(0, 4);
		} else {
			document.querySelector('#diaFinal_751M').value = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
			document.querySelector('#mesFinal_751M').value = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
			document.querySelector('#añoFinal_751M').value = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);
		}
	} else {
		console.log("*")
		document.querySelector('#diaInicial_751M').value = "01"
		document.querySelector('#mesInicial_751M').value = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
		document.querySelector('#añoInicial_751M').value = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

		document.querySelector('#diaFinal_751M').value = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
		document.querySelector('#mesFinal_751M').value = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
		document.querySelector('#añoFinal_751M').value = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);
	}

	validarFechaInicialSER751M('2');
}

function validarFechaInicialSER751M(orden) {
	setTimeout(function () {
		validarInputs(
			{
				form: '#fechaInicial_751M',
				orden: orden
			},
			() => {
				$_SER751M.prefijo == "*" ? validarPrefijoSER751M() : validarNumeroSER751M();
			},
			() => {
				document.querySelector('#diaInicial_751M').value = cerosIzq(document.querySelector('#diaInicial_751M').value, 2);
			  document.querySelector('#mesInicial_751M').value = cerosIzq(document.querySelector('#mesInicial_751M').value, 2);
				$_SER751M.fechaInicial = parseInt(document.querySelector('#añoInicial_751M').value + document.querySelector('#mesInicial_751M').value + document.querySelector('#diaInicial_751M').value);
				$_SER751M.diaInicial = parseInt(document.querySelector('#diaInicial_751M').value);
				$_SER751M.mesInicial = parseInt(document.querySelector('#mesInicial_751M').value);
				$_SER751M.añoInicial = parseInt(document.querySelector('#añoInicial_751M').value);
				if ($_SER751M.diaInicial < 1 || $_SER751M.diaInicial > 31) {
					validarFechaInicialSER751M('3');
				} else if ($_SER751M.mesInicial < 1 || $_SER751M.mesInicial > 12) {
					validarFechaInicialSER751M('2');
				} else {
					validarFechaFinalSER751M('2');
				}
			}
		);
	}, 100);
}

function validarFechaFinalSER751M(orden) {
	setTimeout(function () {
		validarInputs(
			{
				form: '#fechaFinal_751M',
				orden: orden
			},
			() => {
				validarFechaInicialSER751M('2')
			},
			() => {
				document.querySelector('#diaFinal_751M').value = cerosIzq(document.querySelector('#diaFinal_751M').value, 2);
			  document.querySelector('#mesFinal_751M').value = cerosIzq(document.querySelector('#mesFinal_751M').value, 2);
				$_SER751M.fechaFinal = parseInt(document.querySelector('#añoFinal_751M').value + document.querySelector('#mesFinal_751M').value + document.querySelector('#diaFinal_751M').value);
				$_SER751M.diaFinal = parseInt(document.querySelector('#diaFinal_751M').value);
				$_SER751M.mesFinal = parseInt(document.querySelector('#mesFinal_751M').value);
				$_SER751M.añoFinal = parseInt(document.querySelector('#añoFinal_751M').value);
				if ($_SER751M.diaFinal < 1 || $_SER751M.diaFinal > 31) {
					validarFechaFinalSER751M('3');
				} else if ($_SER751M.mesFinal < 1 || $_SER751M.mesFinal > 12) {
					validarFechaFinalSER751M('2');
				} else if ($_SER751M.fechaFinal < $_SER751M.fechaInicial) {
					CON851('03', 'Fecha de vencimiento debe ser mayor', null, 'error', 'error');
					validarFechaFinalSER751M('2');
				} else {
					validarTipoServicioSER751M();
				}
			}
		);
	}, 100);
}

function validarTipoServicioSER751M() {
	document.querySelector('#tipoServ_SER751M').value == "" ? document.querySelector('#tipoServ_SER751M').value = '1' : false;
	document.querySelector('#descripTipoServ_SER751M').value = "1. CIRUGIAS   5. CONSULTAS"
	validarInputs(
		{
			form: '#validarTipoServ_751M',
			orden: '1'
		},
		() => {
			validarFechaFinalSER751M('2');
		},
		() => {
			$_SER751M['tipoServ'] = document.getElementById("tipoServ_SER751M").value.trim();
			if ($_SER751M.tipoServ == "1" || $_SER751M.tipoServ == "5") {
				$_SER751M.tipoServ == "1" ? document.querySelector('#descripTipoServ_SER751M').value = "CIRUGIAS" : document.querySelector('#descripTipoServ_SER751M').value = "CONSULTAS";
				validarEspecialidadSER751M();
			} else {
				validarTipoServicioSER751M();
			}
		}
	);
}

function validarEspecialidadSER751M() {
	document.querySelector('#espec_SER751M').value == "" ? document.querySelector('#espec_SER751M').value = '***' : false;
	validarInputs(
		{
			form: '#validarEspec_751M',
			orden: '1'
		},
		() => {
			validarTipoServicioSER751M();
		},
		() => {
			$_SER751M['espec'] = document.getElementById("espec_SER751M").value.trim();
			if ($_SER751M.espec == "***") {
				document.querySelector('#descripEspec_SER751M').value = "TODAS LAS ESPECIALIDADES";
				validarCentroCostosSER751M();
			} else {
				const res = $_SER751M.ESPEC.find(e => e.CODIGO.trim() == $_SER751M.espec);
				if (res == undefined) {
					CON851('01', '01', null, 'error', 'error');
					validarEspecialidadSER751M();
				} else {
					document.querySelector('#descripEspec_SER751M').value = res.NOMBRE;
					validarCentroCostosSER751M();
				}
			}
		}
	);
}

function validarCentroCostosSER751M() {
	document.querySelector('#costo_SER751M').value == "" ? document.querySelector('#costo_SER751M').value = '****' : false;
	validarInputs(
		{
			form: '#validarCosto_751M',
			orden: '1'
		},
		() => {
			validarEspecialidadSER751M();
		},
		() => {
			$_SER751M['costo'] = document.getElementById("costo_SER751M").value.trim();
			if ($_SER751M.costo == "****") {
				document.querySelector('#descripCosto_SER751M').value = "TODOS LOS C. COSTOS";
				validarTipoUsuariosSER751M();
			} else {
				const res = $_SER751M.COSTOS.find(e => e.COD.trim() == $_SER751M.costo);
				if (res == undefined) {
					CON851('01', '01', null, 'error', 'error');
					validarCentroCostosSER751M();
				} else {
					document.querySelector('#descripCosto_SER751M').value = res.NOMBRE;
					validarTipoUsuariosSER751M();
				}
			}
		}
	);
}

function validarTipoUsuariosSER751M() {
	document.querySelector('#tipoUsua_SER751M').value == "" ? document.querySelector('#tipoUsua_SER751M').value = '*' : false;
	validarInputs(
		{
			form: '#validarTipoUsua_751M',
			orden: '1'
		},
		() => {
			validarCentroCostosSER751M();
		},
		() => {
			$_SER751M['tipoUsuario'] = document.getElementById("tipoUsua_SER751M").value.toUpperCase().trim();
			if ($_SER751M.tipoUsuario == "*") {
				document.querySelector('#descripTipoUsua_SER751M').value = "TODOS LOS TIPOS";
				validarEntidadSER751M();
			} else {
				const res = $_SER751M.TIPOUSUA.find(e => e.COD.trim() == $_SER751M.tipoUsuario);
				if (res == undefined) {
					CON851('01', '01', null, 'error', 'error');
					validarTipoUsuariosSER751M();
				} else {
					if (res.COD == "E" || res.COD == "F") {
						validarTipoUsuariosSER751M();
					} else {
						document.querySelector('#descripTipoUsua_SER751M').value = res.DESCRIP;
						validarEntidadSER751M();
					}
				}
			}
		}
	);
}

function validarEntidadSER751M() {
	document.querySelector('#entidad_SER751M').value == "" ? document.querySelector('#entidad_SER751M').value = '******' : false;
	validarInputs(
		{
			form: '#validarEntidad_751M',
			orden: '1'
		},
		() => {
			validarTipoUsuariosSER751M();
		},
		() => {
			$_SER751M['entidad'] = document.getElementById("entidad_SER751M").value.trim();
			if ($_SER751M.entidad == "******") {
				document.querySelector('#descripEntidad_SER751M').value = "TODOS LOS CODIGOS";
				validarAtiendeSER751M();
			} else {
				const res = $_SER751M.ENTIDADES.find(e => e['COD-ENT'].trim() == $_SER751M.entidad);
				if (res == undefined) {
					CON851('01', '01', null, 'error', 'error');
					validarEntidadSER751M();
				} else {
					document.querySelector('#descripEntidad_SER751M').value = res['NOMBRE-ENT'];
					validarAtiendeSER751M();
				}
			}
		}
	);
}

function validarAtiendeSER751M() {
	document.querySelector('#atiende_SER751M').value == "" ? document.querySelector('#atiende_SER751M').value = '*' : false;
	validarInputs(
		{
			form: '#validarAtiende_751M',
			orden: '1'
		},
		() => {
			validarEntidadSER751M();
		},
		() => {
			$_SER751M['atiende'] = document.getElementById("atiende_SER751M").value.trim();
			if ($_SER751M.atiende == "*") {
				document.querySelector('#descripAtiende_SER751M').value = "TODO TIPO PERSONAL";
				_envioImpresion();
			} else {
				const res = $_SER751M.SER830.find(e => e.COD.trim() == $_SER751M.atiende);
				if (res == undefined) {
					CON851('01', '01', null, 'error', 'error');
					validarAtiendeSER751M();
				} else {
					document.querySelector('#descripAtiende_SER751M').value = res.DESCRIP;
					_envioImpresion();
				}
			}
		}
	);
}

function _envioImpresion() {
	CON850_P(function (e) {
		if (e.id == 'S') {

			loader('show')
			var datos_envio = datosEnvio()
				+ localStorage.Usuario
				+ '|' + $_SER751M.unidServ
				+ '|' + $_SER751M.prefijo
				+ '|' + $_SER751M.numero
				+ '|' + $_SER751M.fechaInicial.toString()
				+ '|' + $_SER751M.fechaFinal.toString()
				+ '|' + $_SER751M.tipoServ
				+ '|' + $_SER751M.espec
				+ '|' + $_SER751M.costo
				+ '|' + $_SER751M.tipoUsuario
				+ '|' + $_SER751M.entidad
				+ '|' + $_SER751M.atiende;

			console.log(datos_envio, "datos_envio");

			postData({ datosh: datos_envio }, get_url('app/SALUD/SER751M.DLL'))
				.then(_montarImpresion_SER751M)
				.catch(err => {
					console.log(err)
					validarAtiendeSER751M();
				})
		} else {
			validarAtiendeSER751M();
		}
	}, {
		msj: '00',
		overlay_show: true
	})
}

function _montarImpresion_SER751M(data) {
	data.LISTADO.pop();
	data.ENCABEZADO = [];

	let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
	let nit = $_USUA_GLOBAL[0].NIT.toString();
	let fecha = moment().format('MMM DD/YY');

	data.ENCABEZADO.push(nombreEmpresa);
	data.ENCABEZADO.push(nit);
	data.ENCABEZADO.push(fecha);
	data.ENCABEZADO.push($_SER751M.fechaInicial);
	data.ENCABEZADO.push($_SER751M.fechaFinal);
	data.ENCABEZADO.push($_SER751M.numero);
	data.ENCABEZADO.push(moment().format("HH:mm"));
	data.ENCABEZADO.push(document.querySelector('#descripCosto_SER751M').value);
	data.ENCABEZADO.push(document.querySelector('#descripEspec_SER751M').value);
	data.ENCABEZADO.push(document.querySelector('#descripAtiende_SER751M').value);

	var impresion = {
		datos: data,
		tipo: $_FORMATO_751M.toLowerCase(),
		formato: 'salud/SER751M.formato.html',
		nombre: 'LISTADO-MORBILIDAD-POR-CONSULTA-TIPO-PACIENTE-' + localStorage.Sesion
	}
	loader('hide')

	imprimir(impresion, () => {
		_inputControl('reset');
		$('#formatoimpresion_751M').val(null).removeAttr('disabled').trigger('change');
		$('#formatoimpresion_751M').select2('open')
		// _toggleNav() 
	});
}

function _cargarUnidServicios() {
	postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER873.DLL"))
		.then(data => {
			$_SER751M.UNSERV = data.UNSERV;
			$_SER751M.UNSERV.pop();
			_cargarFacturas();
		}).catch(err => {
			loader('hide');
			_toggleNav();
		})
}

function _cargarFacturas() {
	postData({ datosh: datosEnvio() + '1' + '|||' }, get_url("app/SALUD/SER808.DLL"))
		.then(data => {
			$_SER751M.FACTURAS = data.NUMERACION;
			$_SER751M.FACTURAS.pop();
			console.log($_SER751M.FACTURAS, "FACTURAS")
			_cargarEspecialidades();
		}).catch(err => {
			loader('hide');
			console.log("error facturas")
			_toggleNav();
		})
}

function _cargarEspecialidades() {
	postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER855.DLL"))
		.then(data => {
			$_SER751M.ESPEC = data.ESPECIALIDADES;
			$_SER751M.ESPEC.pop();
			console.log(data);
			_cargarCostos();
		}).catch(err => {
			loader('hide');
			_toggleNav();
		})
}

function _cargarCostos() {
	postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON803.DLL"))
		.then(data => {
			$_SER751M.COSTOS = data.COSTO;
			$_SER751M.COSTOS.pop();
			console.log(data);
			_cargarTipoUsuarios();
		}).catch(err => {
			loader('hide');
			_toggleNav();
		})
}

function _cargarTipoUsuarios() {
	$_SER751M.TIPOUSUA = [
		{ "COD": "*", "DESCRIP": "TODOS" },
		{ "COD": "C", "DESCRIP": "CONTRIBUTIVO" },
		{ "COD": "S", "DESCRIP": "SUBSIDIADO" },
		{ "COD": "V", "DESCRIP": "VINCULADO" },
		{ "COD": "P", "DESCRIP": "PARTICULAR" },
		{ "COD": "O", "DESCRIP": "OTRO TIPO" },
		{ "COD": "D", "DESCRIP": "DESP.CONT" },
		{ "COD": "E", "DESCRIP": "DESP. SUBS" },
		{ "COD": "F", "DESCRIP": "DESP. VINC" }
	]
	_cargarEntidades();
}

function _cargarEntidades() {
	postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER853.DLL"))
		.then(data => {
			$_SER751M.ENTIDADES = data.ENTIDADES;
			_cargarAtiende();
		}).catch(err => {
			loader('hide');
			_toggleNav();
		})
}

function _cargarAtiende() {
	$_SER751M['SER830'] = [
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
	setTimeout(function () { $('#formatoimpresion_751M').select2('open') }, 500)
}

function _ventanaUnidServiciosSER751M(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA UNIDADES DE SERVICIO",
			columnas: ["COD", "DESCRIP"],
			data: $_SER751M.UNSERV,
			callback_esc: function () {
				$("#unidServ_SER751M").focus();
			},
			callback: function (data) {
				document.getElementById('unidServ_SER751M').value = data.COD;
				_enterInput('#unidServ_SER751M');
			}
		});
	}
}

function _ventanaEspecialidadesSER751M(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA DE ESPECIALIDADES",
			columnas: ["CODIGO", "NOMBRE"],
			data: $_SER751M.ESPEC,
			callback_esc: function () {
				$("#espec_SER751M").focus();
			},
			callback: function (data) {
				document.getElementById('espec_SER751M').value = data.CODIGO;
				_enterInput('#espec_SER751M');
			}
		});
	}
}

function _ventanaCostosSER751M(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA DE CENTROS DE COSTOS",
			columnas: ["COD", "NOMBRE", "DESCRIP"],
			data: $_SER751M.COSTOS,
			callback_esc: function () {
				$("#costo_SER751M").focus();
			},
			callback: function (data) {
				document.getElementById('costo_SER751M').value = data.COD;
				_enterInput('#costo_SER751M');
			}
		});
	}
}

function _ventanaTipoUsuarioSER751M(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		var tipac = $_SER751M.TIPOUSUA;
		POPUP({
			array: tipac,
			titulo: 'Tipo Usuario',
			indices: [
				{ id: 'COD', label: 'DESCRIP' }
			],
			seleccion: $_SER751M.TIPO,
			callback_f: $('#tipoUsua_SER751M').focus(),
			teclaAlterna: true
		},
			_evaluardatotipodepaciente_751M);
	}
}

function _evaluardatotipodepaciente_751M(tipac) {
	console.log(tipac)
	switch (tipac.COD) {
		case '*':
			$('#tipoUsua_SER751M').val("*");
			_enterInput('#tipoUsua_SER751M');
			break;
		case 'C':
		case 'S':
		case 'V':
		case 'P':
		case 'O':
		case 'D':
			$('#tipoUsua_SER751M').val(tipac.COD);
			_enterInput('#tipoUsua_SER751M');
			break;
		default:
			$('#tipoUsua_SER751M').focus();
			break;
	}
}

function _ventanaEntidadesSER751M(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA DE ENTIDADES",
			columnas: ["COD-ENT", "NOMBRE-ENT"],
			data: $_SER751M.ENTIDADES,
			callback_esc: function () {
				$("#entidad_SER751M").focus();
			},
			callback: function (data) {
				document.getElementById('entidad_SER751M').value = data['COD-ENT'];
				_enterInput('#entidad_SER751M');
			}
		});
	}
}

function _ventanaAtiendeSER751M(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		SER830({ seleccion: $_SER751M.PERSONAL }, $('#atiende_SER751M'), (data) => {
			document.querySelector('#atiende_SER751M').value = data.COD;
			$_SER751M.atiende = data.COD;
			document.querySelector('#descripAtiende_SER751M').value = data.DESCRIP;
			_enterInput('#atiende_SER751M');
		})
	}
}

function _ventanaFacturacionSER751M(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		bootbox.prompt({
			title: 'Mostrar facturas cerradas?',
			placeholder: 'N',
			className: '',
			size: 'small',
			maxlength: 1,
			buttons: {
				confirm: {
					label: 'Ok'
				}, cancel: {
					label: 'Cancelar'
				}
			},
			callback: function (value) {
				if (value == undefined) {
					validarNumeroSER751M();
				} else {
					if (value == "S" || value == "N") {
						console.log(value, "value")
						value == "S" ? filtro = "N" : filtro = "S";
						postData({ datosh: datosEnvio() + '1' + '|' + '|' + filtro + '|' + $_SER751M.prefijo }, get_url("app/SALUD/SER808.DLL"))
							.then(data => {
								$_SER751M.FACTURAS2 = data.NUMERACION;
								$_SER751M.FACTURAS2.pop();
								_ventanaFacturacion2SER751M();
							}).catch(err => {
								loader('hide');
								_toggleNav();
							})
					} else {
						validarNumeroSER751M();
					}
				}
			}
		});
	}
}

function _ventanaFacturacion2SER751M() {
	_ventanaDatos({
		titulo: "VENTANA DE FACTURAS",
		columnas: ["COD", "FECHA_ING", "DESCRIP", "NOM_PAC", "CONVENIO"],
		data: $_SER751M.FACTURAS2,
		ancho: "1100",
		callback_esc: function () {
			$("#numero_SER751M").focus();
		},
		callback: function (data) {
			document.getElementById('numero_SER751M').value = data.COD.substring(1, 7).trim();
			_enterInput('#numero_SER751M');
		}
	});
}


function _ventanaGrupoSER751M(e) {
	console.debug(e, 'evento F8')
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "GRUPOS DE SERVICIO",
			columnas: ["COD", "DESCRIP"],
			data: $_SER751M.GRPSER,
			callback_esc: function () {
				$('#grupo_SER751M').focus();
			},
			callback: function (data) {
				console.debug(data);
				$('#grupo_SER751M').val(data.COD.trim())
				$('#descripGrupo_SER751M').val(data.DESCRIP.trim())
				_enterInput('#grupo_SER751M');
			}
		});
	}
}