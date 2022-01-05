// LISTADO MORBILIDAD POR CONSULTA SECRETARIA SALUD
// DAVID.M - CREACION - 25/06/2020 - OPCION 9-7-7-5-1-7 SALUD
var $_SER751J = [], $_FORMATO_751J = [];

$(document).ready(() => {
	loader('show')
	_inputControl("reset");
	_inputControl("disabled");
	nombreOpcion('9,7,7,5,1,7 - Morbilidad por consulta secretaria salud');
	_cargarUnidServicios();


	_toggleF8([
		{ input: 'unidServ', app: 'SER751J', funct: _ventanaUnidServiciosSER751J },
		{ input: 'espec', app: 'SER751J', funct: _ventanaEspecialidadesSER751J },
		{ input: 'costo', app: 'SER751J', funct: _ventanaCostosSER751J },
		{ input: 'tipoUsua', app: 'SER751J', funct: _ventanaTipoUsuarioSER751J },
		{ input: 'entidad', app: 'SER751J', funct: _ventanaEntidadesSER751J },
		{ input: 'numero', app: 'SER751J', funct: _ventanaFacturacionSER751J },
		{ input: 'atiende', app: 'SER751J', funct: _ventanaAtiendeSER751J }
	]);
	$('#formatoimpresion_751J').select2().on('select2:select', validarFormato_751J);
})

function habilitarFORMATO_751J() {
	_inputControl('reset');
	$('#formatoimpresion_751J').val(null).removeAttr('disabled').trigger('change');
	$('#formatoimpresion_751J').select2('open')
}

function validarFormato_751J() {
	var seleccionado = $(this).val();
	if (seleccionado != "3") {
		if (seleccionado == "1") $_FORMATO_751J = 'PDF';
		else if (seleccionado == "2") $_FORMATO_751J = 'CSV';

		$(this).attr('disabled', 'true');
		validarUnidServSER751J();
	} else {
		$(this).attr('disabled', 'true');
		_toggleNav();
	}
}

function validarUnidServSER751J() {
	document.querySelector('#unidServ_SER751J').value == "" ? document.querySelector('#unidServ_SER751J').value = '**' : false;
	validarInputs(
		{
			form: '#validarUnidServ_751J',
			orden: '1'
		},
		() => {
			$('#formatoimpresion_751J').val(null).removeAttr('disabled').trigger('change');
			$('#formatoimpresion_751J').select2('open')
		},
		() => {
			$_SER751J['unidServ'] = document.getElementById("unidServ_SER751J").value.toUpperCase().trim();
			if ($_SER751J.unidServ == "**") {
				document.querySelector('#descripUnidServ_SER751J').value = "TODAS LAS UNIDADES DE SERV.";
				validarPrefijoSER751J();
			} else {
				const res = $_SER751J.UNSERV.find(e => e.COD.trim() == $_SER751J.unidServ);
				if (res == undefined) {
					CON851('01', '01', null, 'error', 'error');
					validarUnidServSER751J();
				} else {
					document.querySelector('#descripUnidServ_SER751J').value = res.DESCRIP;
					validarPrefijoSER751J();
				}
			}
		}
	);
}

function validarPrefijoSER751J() {
	document.querySelector('#prefijo_SER751J').value == "" ? document.querySelector('#prefijo_SER751J').value = '*' : false;
	validarInputs(
		{
			form: '#validarPrefijo_751J',
			orden: '1'
		},
		() => {
			validarUnidServSER751J();
		},
		() => {
			$_SER751J['prefijo'] = document.getElementById("prefijo_SER751J").value.toUpperCase().trim();
			if ($_SER751J.prefijo == "*") {
				$_SER751J.numero = "000000";
				document.querySelector('#numero_SER751J').value = $_SER751J.numero;
				document.querySelector('#descripNumero_SER751J').value = "TODAS LAS FACTURAS";
				datoInicialSER751J();
			} else {
				var arrayPrefijos = ["A", "P", "T", "B", "D", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "Q",
					"R", "S", "V", "W", "X", "Y", "Z"];
				const res = arrayPrefijos.find(e => e == $_SER751J.prefijo);
				res == undefined ? validarPrefijoSER751J() : validarNumeroSER751J();
			}
		}
	);
}

function validarNumeroSER751J() {
	validarInputs(
		{
			form: '#validarNumero_751J',
			orden: '1'
		},
		() => {
			validarPrefijoSER751J();
		},
		() => {
			$_SER751J['numero'] = document.getElementById("numero_SER751J").value.toUpperCase().trim();
			const res = $_SER751J.FACTURAS.find(e => e.COD.substring(1, 7).trim() == $_SER751J.numero);
			if (res == undefined) {
				CON851('01', '01', null, 'error', 'error');
				validarNumeroSER751J();
			} else {
				document.querySelector('#descripNumero_SER751J').value = res.DESCRIP;
				console.log(res.FECHA_ING, "fecha");
				datoInicialSER751J(res);
				// validarFechaInicialSER751J('1');
			}
		}
	);
}

function datoInicialSER751J(res) {
	if ($_SER751J.prefijo != "*") {
		document.querySelector('#diaInicial_751J').value = res.FECHA_ING.substring(6, 8);
		document.querySelector('#mesInicial_751J').value = res.FECHA_ING.substring(4, 6);
		document.querySelector('#añoInicial_751J').value = res.FECHA_ING.substring(0, 4);

		if (res.FECHARET != "00000000" && res.FECHARET.trim() != "") {
			document.querySelector('#diaFinal_751J').value = res.FECHARET.substring(6, 8);
			document.querySelector('#mesFinal_751J').value = res.FECHARET.substring(4, 6);
			document.querySelector('#añoFinal_751J').value = res.FECHARET.substring(0, 4);
		} else {
			document.querySelector('#diaFinal_751J').value = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
			document.querySelector('#mesFinal_751J').value = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
			document.querySelector('#añoFinal_751J').value = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);
		}
	} else {
		console.log("*")
		document.querySelector('#diaInicial_751J').value = "01"
		document.querySelector('#mesInicial_751J').value = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
		document.querySelector('#añoInicial_751J').value = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

		document.querySelector('#diaFinal_751J').value = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
		document.querySelector('#mesFinal_751J').value = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
		document.querySelector('#añoFinal_751J').value = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);
	}

	validarFechaInicialSER751J('2');
}

function validarFechaInicialSER751J(orden) {
	setTimeout(function () {
		validarInputs(
			{
				form: '#fechaInicial_751J',
				orden: orden
			},
			() => {
				$_SER751J.prefijo == "*" ? validarPrefijoSER751J() : validarNumeroSER751J();
			},
			() => {
				document.querySelector('#diaInicial_751J').value = cerosIzq(document.querySelector('#diaInicial_751J').value, 2);
			  document.querySelector('#mesInicial_751J').value = cerosIzq(document.querySelector('#mesInicial_751J').value, 2);
				$_SER751J.fechaInicial = parseInt(document.querySelector('#añoInicial_751J').value + document.querySelector('#mesInicial_751J').value + document.querySelector('#diaInicial_751J').value);
				$_SER751J.diaInicial = parseInt(document.querySelector('#diaInicial_751J').value);
				$_SER751J.mesInicial = parseInt(document.querySelector('#mesInicial_751J').value);
				$_SER751J.añoInicial = parseInt(document.querySelector('#añoInicial_751J').value);
				if ($_SER751J.diaInicial < 1 || $_SER751J.diaInicial > 31) {
					validarFechaInicialSER751J('3');
				} else if ($_SER751J.mesInicial < 1 || $_SER751J.mesInicial > 12) {
					validarFechaInicialSER751J('2');
				} else {
					validarFechaFinalSER751J('2');
				}
			}
		);
	}, 100);
}

function validarFechaFinalSER751J(orden) {
	setTimeout(function () {
		validarInputs(
			{
				form: '#fechaFinal_751J',
				orden: orden
			},
			() => {
				validarFechaInicialSER751J('2')
			},
			() => {
				document.querySelector('#diaFinal_751J').value = cerosIzq(document.querySelector('#diaFinal_751J').value, 2);
			  document.querySelector('#mesFinal_751J').value = cerosIzq(document.querySelector('#mesFinal_751J').value, 2);
				$_SER751J.fechaFinal = parseInt(document.querySelector('#añoFinal_751J').value + document.querySelector('#mesFinal_751J').value + document.querySelector('#diaFinal_751J').value);
				$_SER751J.diaFinal = parseInt(document.querySelector('#diaFinal_751J').value);
				$_SER751J.mesFinal = parseInt(document.querySelector('#mesFinal_751J').value);
				$_SER751J.añoFinal = parseInt(document.querySelector('#añoFinal_751J').value);
				if ($_SER751J.diaFinal < 1 || $_SER751J.diaFinal > 31) {
					validarFechaFinalSER751J('3');
				} else if ($_SER751J.mesFinal < 1 || $_SER751J.mesFinal > 12) {
					validarFechaFinalSER751J('2');
				} else if ($_SER751J.fechaFinal < $_SER751J.fechaInicial) {
					CON851('03', 'Fecha de vencimiento debe ser mayor', null, 'error', 'error');
					validarFechaFinalSER751J('2');
				} else {
					validarTipoServicioSER751J();
				}
			}
		);
	}, 100);
}

function validarTipoServicioSER751J() {
	document.querySelector('#tipoServ_SER751J').value == "" ? document.querySelector('#tipoServ_SER751J').value = '1' : false;
	document.querySelector('#descripTipoServ_SER751J').value = "1. CIRUGIAS   5. CONSULTAS"
	validarInputs(
		{
			form: '#validarTipoServ_751J',
			orden: '1'
		},
		() => {
			validarFechaFinalSER751J('2');
		},
		() => {
			$_SER751J['tipoServ'] = document.getElementById("tipoServ_SER751J").value.trim();
			if ($_SER751J.tipoServ == "1" || $_SER751J.tipoServ == "5") {
				$_SER751J.tipoServ == "1" ? document.querySelector('#descripTipoServ_SER751J').value = "CIRUGIAS" : document.querySelector('#descripTipoServ_SER751J').value = "CONSULTAS";
				validarEspecialidadSER751J();
			} else {
				validarTipoServicioSER751J();
			}
		}
	);
}

function validarEspecialidadSER751J() {
	document.querySelector('#espec_SER751J').value == "" ? document.querySelector('#espec_SER751J').value = '***' : false;
	validarInputs(
		{
			form: '#validarEspec_751J',
			orden: '1'
		},
		() => {
			validarTipoServicioSER751J();
		},
		() => {
			$_SER751J['espec'] = document.getElementById("espec_SER751J").value.trim();
			if ($_SER751J.espec == "***") {
				document.querySelector('#descripEspec_SER751J').value = "TODAS LAS ESPECIALIDADES";
				validarCentroCostosSER751J();
			} else {
				const res = $_SER751J.ESPEC.find(e => e.CODIGO.trim() == $_SER751J.espec);
				if (res == undefined) {
					CON851('01', '01', null, 'error', 'error');
					validarEspecialidadSER751J();
				} else {
					document.querySelector('#descripEspec_SER751J').value = res.NOMBRE;
					validarCentroCostosSER751J();
				}
			}
		}
	);
}

function validarCentroCostosSER751J() {
	document.querySelector('#costo_SER751J').value == "" ? document.querySelector('#costo_SER751J').value = '****' : false;
	validarInputs(
		{
			form: '#validarCosto_751J',
			orden: '1'
		},
		() => {
			validarEspecialidadSER751J();
		},
		() => {
			$_SER751J['costo'] = document.getElementById("costo_SER751J").value.trim();
			if ($_SER751J.costo == "****") {
				document.querySelector('#descripCosto_SER751J').value = "TODOS LOS C. COSTOS";
				validarTipoUsuariosSER751J();
			} else {
				const res = $_SER751J.COSTOS.find(e => e.COD.trim() == $_SER751J.costo);
				if (res == undefined) {
					CON851('01', '01', null, 'error', 'error');
					validarCentroCostosSER751J();
				} else {
					document.querySelector('#descripCosto_SER751J').value = res.NOMBRE;
					validarTipoUsuariosSER751J();
				}
			}
		}
	);
}

function validarTipoUsuariosSER751J() {
	document.querySelector('#tipoUsua_SER751J').value == "" ? document.querySelector('#tipoUsua_SER751J').value = '*' : false;
	validarInputs(
		{
			form: '#validarTipoUsua_751J',
			orden: '1'
		},
		() => {
			validarCentroCostosSER751J();
		},
		() => {
			$_SER751J['tipoUsuario'] = document.getElementById("tipoUsua_SER751J").value.toUpperCase().trim();
			if ($_SER751J.tipoUsuario == "*") {
				document.querySelector('#descripTipoUsua_SER751J').value = "TODOS LOS TIPOS";
				validarEntidadSER751J();
			} else {
				const res = $_SER751J.TIPOUSUA.find(e => e.COD.trim() == $_SER751J.tipoUsuario);
				if (res == undefined) {
					CON851('01', '01', null, 'error', 'error');
					validarTipoUsuariosSER751J();
				} else {
					if (res.COD == "E" || res.COD == "F") {
						validarTipoUsuariosSER751J();
					} else {
						document.querySelector('#descripTipoUsua_SER751J').value = res.DESCRIP;
						validarEntidadSER751J();
					}
				}
			}
		}
	);
}

function validarEntidadSER751J() {
	document.querySelector('#entidad_SER751J').value == "" ? document.querySelector('#entidad_SER751J').value = '******' : false;
	validarInputs(
		{
			form: '#validarEntidad_751J',
			orden: '1'
		},
		() => {
			validarTipoUsuariosSER751J();
		},
		() => {
			$_SER751J['entidad'] = document.getElementById("entidad_SER751J").value.trim();
			if ($_SER751J.entidad == "******") {
				document.querySelector('#descripEntidad_SER751J').value = "TODOS LOS CODIGOS";
				validarAtiendeSER751J();
			} else {
				const res = $_SER751J.ENTIDADES.find(e => e['COD-ENT'].trim() == $_SER751J.entidad);
				if (res == undefined) {
					CON851('01', '01', null, 'error', 'error');
					validarEntidadSER751J();
				} else {
					document.querySelector('#descripEntidad_SER751J').value = res['NOMBRE-ENT'];
					validarAtiendeSER751J();
				}
			}
		}
	);
}

function validarAtiendeSER751J() {
	document.querySelector('#atiende_SER751J').value == "" ? document.querySelector('#atiende_SER751J').value = '*' : false;
	validarInputs(
		{
			form: '#validarAtiende_751J',
			orden: '1'
		},
		() => {
			validarEntidadSER751J();
		},
		() => {
			$_SER751J['atiende'] = document.getElementById("atiende_SER751J").value.trim();
			if ($_SER751J.atiende == "*") {
				document.querySelector('#descripAtiende_SER751J').value = "TODO TIPO PERSONAL";
				validarListarPrimSER751J();
			} else {
				const res = $_SER751J.SER830.find(e => e.COD.trim() == $_SER751J.atiende);
				if (res == undefined) {
					CON851('01', '01', null, 'error', 'error');
					validarAtiendeSER751J();
				} else {
					document.querySelector('#descripAtiende_SER751J').value = res.DESCRIP;
					validarListarPrimSER751J();
				}
			}
		}
	);
}

function validarListarPrimSER751J() {
	document.querySelector('#listarPrim_SER751J').value == "" ? document.querySelector('#listarPrim_SER751J').value = '500' : false;
	validarInputs(
		{
			form: '#validarListarPrim_751J',
			orden: '1'
		},
		() => {
			validarAtiendeSER751J();
		},
		() => {
			$_SER751J['listarPrim'] = document.getElementById("listarPrim_SER751J").value.toUpperCase().trim();
			if (parseInt($_SER751J.listarPrim) < 5) {
				validarListarPrimSER751J();
			} else {
				validarIncluirContrSER751J();
			}
		}
	);
}

function validarIncluirContrSER751J() {
	document.querySelector('#incluirContr_SER751J').value == "" ? document.querySelector('#incluirContr_SER751J').value = 'N' : false;
	document.getElementById("incluirContr_SER751J").setAttribute("placeholder", "N");
	validarInputs(
		{
			form: '#validarIncluirContr_751J',
			orden: '1'
		},
		() => {
			validarListarPrimSER751J();
		},
		() => {
			$_SER751J['incluirContr'] = document.getElementById("incluirContr_SER751J").value.toUpperCase().trim();
			($_SER751J.incluirContr == "S" || $_SER751J.incluirContr == "N") ? _envioImpresion() : validarIncluirContrSER751J();
		}
	);
}

function _envioImpresion() {
	CON850_P(function (e) {
		if (e.id == 'S') {

			loader('show')
			var datos_envio = datosEnvio()
				+ localStorage.Usuario
				+ '|' + $_SER751J.unidServ
				+ '|' + $_SER751J.prefijo
				+ '|' + $_SER751J.numero
				+ '|' + $_SER751J.fechaInicial.toString()
				+ '|' + $_SER751J.fechaFinal.toString()
				+ '|' + $_SER751J.tipoServ
				+ '|' + $_SER751J.espec
				+ '|' + $_SER751J.costo
				+ '|' + $_SER751J.tipoUsuario
				+ '|' + $_SER751J.entidad
				+ '|' + $_SER751J.atiende
				+ '|' + $_SER751J.listarPrim
				+ '|' + $_SER751J.incluirContr
				+ '|' + $_SER751J.ordenarEven;

			console.log(datos_envio, "datos_envio");

			postData({ datosh: datos_envio }, get_url('app/SALUD/SER751J.DLL'))
				.then(_montarImpresion_SER751J)
				.catch(err => {
					console.log(err)
					validarIncluirContrSER751J();
				})
		} else {
			validarIncluirContrSER751J();
		}
	}, {
		msj: '00',
		overlay_show: true
	})
}

function _montarImpresion_SER751J(data) {
	data.LISTADO.pop();
	data.ENCABEZADO = [];

	let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
	let nit = $_USUA_GLOBAL[0].NIT.toString();
	let fecha = moment().format('MMM DD/YY');

	data.ENCABEZADO.push(nombreEmpresa);
	data.ENCABEZADO.push(nit);
	data.ENCABEZADO.push(fecha);
	data.ENCABEZADO.push($_SER751J.fechaInicial);
	data.ENCABEZADO.push($_SER751J.fechaFinal);
	data.ENCABEZADO.push($_SER751J.numero);
	data.ENCABEZADO.push(moment().format("HH:mm"));
	data.ENCABEZADO.push(document.querySelector('#descripCosto_SER751J').value);
	data.ENCABEZADO.push(document.querySelector('#descripEspec_SER751J').value);
	data.ENCABEZADO.push(document.querySelector('#descripAtiende_SER751J').value);

	var impresion = {
		datos: data,
		tipo: $_FORMATO_751J.toLowerCase(),
		formato: 'salud/SER751J.formato.html',
		nombre: 'LISTADO-MORBILIDAD-POR-CONSULTA-SECRETARIA-SALUD-' + localStorage.Sesion
	}
	loader('hide')

	imprimir(impresion, () => {
		_inputControl('reset');
		$('#formatoimpresion_751J').val(null).removeAttr('disabled').trigger('change');
		$('#formatoimpresion_751J').select2('open')
		// _toggleNav() 
	});
}

function _cargarUnidServicios() {
	postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER873.DLL"))
		.then(data => {
			$_SER751J.UNSERV = data.UNSERV;
			$_SER751J.UNSERV.pop();
			_cargarFacturas();
		}).catch(err => {
			loader('hide');
			_toggleNav();
		})
}

function _cargarFacturas() {
	postData({ datosh: datosEnvio() + '1' + '|||' }, get_url("app/SALUD/SER808.DLL"))
		.then(data => {
			$_SER751J.FACTURAS = data.NUMERACION;
			$_SER751J.FACTURAS.pop();
			console.log($_SER751J.FACTURAS, "FACTURAS")
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
			$_SER751J.ESPEC = data.ESPECIALIDADES;
			$_SER751J.ESPEC.pop();
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
			$_SER751J.COSTOS = data.COSTO;
			$_SER751J.COSTOS.pop();
			console.log(data);
			_cargarTipoUsuarios();
		}).catch(err => {
			loader('hide');
			_toggleNav();
		})
}

function _cargarTipoUsuarios() {
	$_SER751J.TIPOUSUA = [
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
			$_SER751J.ENTIDADES = data.ENTIDADES;
			_cargarAtiende();
		}).catch(err => {
			loader('hide');
			_toggleNav();
		})
}

function _cargarAtiende() {
	$_SER751J['SER830'] = [
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
	setTimeout(function () { $('#formatoimpresion_751J').select2('open') }, 500)
}

function _ventanaUnidServiciosSER751J(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA UNIDADES DE SERVICIO",
			columnas: ["COD", "DESCRIP"],
			data: $_SER751J.UNSERV,
			callback_esc: function () {
				$("#unidServ_SER751J").focus();
			},
			callback: function (data) {
				document.getElementById('unidServ_SER751J').value = data.COD;
				_enterInput('#unidServ_SER751J');
			}
		});
	}
}

function _ventanaEspecialidadesSER751J(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA DE ESPECIALIDADES",
			columnas: ["CODIGO", "NOMBRE"],
			data: $_SER751J.ESPEC,
			callback_esc: function () {
				$("#espec_SER751J").focus();
			},
			callback: function (data) {
				document.getElementById('espec_SER751J').value = data.CODIGO;
				_enterInput('#espec_SER751J');
			}
		});
	}
}

function _ventanaCostosSER751J(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA DE CENTROS DE COSTOS",
			columnas: ["COD", "NOMBRE", "DESCRIP"],
			data: $_SER751J.COSTOS,
			callback_esc: function () {
				$("#costo_SER751J").focus();
			},
			callback: function (data) {
				document.getElementById('costo_SER751J').value = data.COD;
				_enterInput('#costo_SER751J');
			}
		});
	}
}

function _ventanaTipoUsuarioSER751J(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		var tipac = $_SER751J.TIPOUSUA;
		POPUP({
			array: tipac,
			titulo: 'Tipo Usuario',
			indices: [
				{ id: 'COD', label: 'DESCRIP' }
			],
			seleccion: $_SER751J.TIPO,
			callback_f: $('#tipoUsua_SER751J').focus(),
			teclaAlterna: true
		},
			_evaluardatotipodepaciente_751J);
	}
}

function _evaluardatotipodepaciente_751J(tipac) {
	console.log(tipac)
	switch (tipac.COD) {
		case '*':
			$('#tipoUsua_SER751J').val("*");
			_enterInput('#tipoUsua_SER751J');
			break;
		case 'C':
		case 'S':
		case 'V':
		case 'P':
		case 'O':
		case 'D':
			$('#tipoUsua_SER751J').val(tipac.COD);
			_enterInput('#tipoUsua_SER751J');
			break;
		default:
			$('#tipoUsua_SER751J').focus();
			break;
	}
}

function _ventanaEntidadesSER751J(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA DE ENTIDADES",
			columnas: ["COD-ENT", "NOMBRE-ENT"],
			data: $_SER751J.ENTIDADES,
			callback_esc: function () {
				$("#entidad_SER751J").focus();
			},
			callback: function (data) {
				document.getElementById('entidad_SER751J').value = data['COD-ENT'];
				_enterInput('#entidad_SER751J');
			}
		});
	}
}

function _ventanaAtiendeSER751J(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		SER830({ seleccion: $_SER751J.PERSONAL }, $('#atiende_SER751J'), (data) => {
			document.querySelector('#atiende_SER751J').value = data.COD;
			$_SER751J.atiende = data.COD;
			document.querySelector('#descripAtiende_SER751J').value = data.DESCRIP;
			_enterInput('#atiende_SER751J');
		})
	}
}

function _ventanaFacturacionSER751J(e) {
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
					validarNumeroSER751J();
				} else {
					if (value == "S" || value == "N") {
						console.log(value, "value")
						value == "S" ? filtro = "N" : filtro = "S";
						postData({ datosh: datosEnvio() + '1' + '|' + '|' + filtro + '|' + $_SER751J.prefijo }, get_url("app/SALUD/SER808.DLL"))
							.then(data => {
								$_SER751J.FACTURAS2 = data.NUMERACION;
								$_SER751J.FACTURAS2.pop();
								_ventanaFacturacion2SER751J();
							}).catch(err => {
								loader('hide');
								_toggleNav();
							})
					} else {
						validarNumeroSER751J();
					}
				}
			}
		});
	}
}

function _ventanaFacturacion2SER751J() {
	_ventanaDatos({
		titulo: "VENTANA DE FACTURAS",
		columnas: ["COD", "FECHA_ING", "DESCRIP", "NOM_PAC", "CONVENIO"],
		data: $_SER751J.FACTURAS2,
		ancho: "1100",
		callback_esc: function () {
			$("#numero_SER751J").focus();
		},
		callback: function (data) {
			document.getElementById('numero_SER751J').value = data.COD.substring(1, 7).trim();
			_enterInput('#numero_SER751J');
		}
	});
}


function _ventanaGrupoSER751J(e) {
	console.debug(e, 'evento F8')
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "GRUPOS DE SERVICIO",
			columnas: ["COD", "DESCRIP"],
			data: $_SER751J.GRPSER,
			callback_esc: function () {
				$('#grupo_SER751J').focus();
			},
			callback: function (data) {
				console.debug(data);
				$('#grupo_SER751J').val(data.COD.trim())
				$('#descripGrupo_SER751J').val(data.DESCRIP.trim())
				_enterInput('#grupo_SER751J');
			}
		});
	}
}