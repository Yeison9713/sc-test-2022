// LISTADO MORBILIDAD POR ENTIDAD
// SANTIAGO - CREACION - 17/06/2020 - OPCION 9-7-7-5-1-2 SALUD
var $_SER752 = [], $_FORMATO_752 = [];

$(document).ready(() => {
	nombreOpcion('9,7,7,5,1,2 - Listado morbilidad por entidad');
	loader('show')
	_inputControl("reset");
	_inputControl("disabled");
	_cargarUnidServicios();

	_toggleF8([
		{ input: 'unidServ', app: 'SER752', funct: _ventanaUnidServiciosSER752 },
		{ input: 'numero', app: 'SER752', funct: _ventanaFacturacionSER752 },
		{ input: 'entidad', app: 'SER752', funct: _ventanaEntidadesSER752 },
		{ input: 'eps', app: 'SER752', funct: _ventanaEpsSER752 },
		{ input: 'costo', app: 'SER752', funct: _ventanaCostosSER752 },
		{ input: 'atiende', app: 'SER752', funct: _ventanaAtiendeSER752 }
	]);
	$('#formatoimpresion_752').select2().on('select2:select', validarFormato_752);
})

function habilitarFORMATO_752() {
	_inputControl('reset');
	$('#formatoimpresion_752').val(null).removeAttr('disabled').trigger('change');
	$('#formatoimpresion_752').select2('open')
}

function validarFormato_752() {
	var seleccionado = $(this).val();
	if (seleccionado != "3") {
		if (seleccionado == "1") $_FORMATO_752 = 'PDF';
		else if (seleccionado == "2") $_FORMATO_752 = 'CSV';

		$(this).attr('disabled', 'true');
		validarUnidServSER752();
	} else {
		$(this).attr('disabled', 'true');
		_toggleNav();
	}
}

function validarUnidServSER752() {
	document.querySelector('#unidServ_SER752').value == "" ? document.querySelector('#unidServ_SER752').value = '**' : false;
	validarInputs(
		{
			form: '#validarUnidServ_752',
			orden: '1'
		},
		() => {
			$('#formatoimpresion_752').val(null).removeAttr('disabled').trigger('change');
			$('#formatoimpresion_752').select2('open')
		},
		() => {
			$_SER752['unidServ'] = document.getElementById("unidServ_SER752").value.toUpperCase().trim();
			if ($_SER752.unidServ == "**") {
				document.querySelector('#descripUnidServ_SER752').value = "TODAS LAS UNIDADES DE SERV.";
				validarPrefijoSER752();
			} else {
				const res = $_SER752.UNSERV.find(e => e.COD.trim() == $_SER752.unidServ);
				if (res == undefined) {
					CON851('01', '01', null, 'error', 'error');
					validarUnidServSER752();
				} else {
					document.querySelector('#descripUnidServ_SER752').value = res.DESCRIP;
					validarPrefijoSER752();
				}
			}
		}
	);
}

function validarPrefijoSER752() {
	document.querySelector('#prefijo_SER752').value == "" ? document.querySelector('#prefijo_SER752').value = '*' : false;
	validarInputs(
		{
			form: '#validarPrefijo_752',
			orden: '1'
		},
		() => {
			validarUnidServSER752();
		},
		() => {
			$_SER752['prefijo'] = document.getElementById("prefijo_SER752").value.toUpperCase().trim();
			if ($_SER752.prefijo == "*") {
				$_SER752.numero = "000000";
				document.querySelector('#numero_SER752').value = $_SER752.numero;
				document.querySelector('#descripNumero_SER752').value = "TODAS LAS FACTURAS";
				datoInicialSER752();
			} else {
				arrayPrefijos = ["A", "P", "T", "B", "D", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "Q",
					"R", "S", "V", "W", "X", "Y", "Z"];
				const res = arrayPrefijos.find(e => e == $_SER752.prefijo);
				res == undefined ? validarPrefijoSER752() : validarNumeroSER752();
			}
		}
	);
}

function validarNumeroSER752() {
	validarInputs(
		{
			form: '#validarNumero_752',
			orden: '1'
		},
		() => {
			validarPrefijoSER752();
		},
		() => {
			$_SER752['numero'] = document.getElementById("numero_SER752").value.toUpperCase().trim();
			const res = $_SER752.FACTURAS.find(e => e.COD.substring(1,7).trim() == $_SER752.numero);
			if (res == undefined) {
				CON851('01', '01', null, 'error', 'error');
				validarNumeroSER752();
			} else {
				document.querySelector('#descripNumero_SER752').value = res.DESCRIP;
				console.log(res.FECHA_ING, "fecha");
				datoInicialSER752(res);
			}
		}
	);
}

function datoInicialSER752(res) {
	if ($_SER752.prefijo != "*") {
		document.querySelector('#diaInicial_752').value = res.FECHA_ING.substring(6, 8);
		document.querySelector('#mesInicial_752').value = res.FECHA_ING.substring(4, 6);
		document.querySelector('#añoInicial_752').value = res.FECHA_ING.substring(0, 4);

		if (res.FECHARET != "00000000" && res.FECHARET.trim() != "") {
			document.querySelector('#diaFinal_752').value = res.FECHARET.substring(6, 8);
			document.querySelector('#mesFinal_752').value = res.FECHARET.substring(4, 6);
			document.querySelector('#añoFinal_752').value = res.FECHARET.substring(0, 4);
		} else {
			document.querySelector('#diaFinal_752').value = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
			document.querySelector('#mesFinal_752').value = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
			document.querySelector('#añoFinal_752').value = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);
		}
	} else {
		console.log("*")
		document.querySelector('#diaInicial_752').value = "01"
		document.querySelector('#mesInicial_752').value = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
		document.querySelector('#añoInicial_752').value = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

		document.querySelector('#diaFinal_752').value = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
		document.querySelector('#mesFinal_752').value = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
		document.querySelector('#añoFinal_752').value = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);
	}
	validarFechaInicialSER752('2')
}

function validarFechaInicialSER752(orden) {
	setTimeout(function () {
		validarInputs(
			{
				form: '#fechaInicial_752',
				orden: orden
			},
			() => {
			$_SER752.prefijo == "*" ? validarPrefijoSER752() : validarNumeroSER752();
		    },
			() => {
				document.querySelector('#diaInicial_752').value = cerosIzq(document.querySelector('#diaInicial_752').value, 2);
			    document.querySelector('#mesInicial_752').value = cerosIzq(document.querySelector('#mesInicial_752').value, 2);
				$_SER752.fechaInicial = parseInt(document.querySelector('#añoInicial_752').value + document.querySelector('#mesInicial_752').value + document.querySelector('#diaInicial_752').value);
				$_SER752.diaInicial = parseInt(document.querySelector('#diaInicial_752').value);
				$_SER752.mesInicial = parseInt(document.querySelector('#mesInicial_752').value);
				$_SER752.añoInicial = parseInt(document.querySelector('#añoInicial_752').value);
				if ($_SER752.diaInicial < 1 || $_SER752.diaInicial > 31) {
					validarFechaInicialSER752('3');
				} else if ($_SER752.mesInicial < 1 || $_SER752.mesInicial > 12) {
					validarFechaInicialSER752('2');
				} else {
					validarFechaFinalSER752('2')
				}
			}
		);
	}, 100);
}

function validarFechaFinalSER752(orden) {
	setTimeout(function () {
		validarInputs(
			{
				form: '#fechaFinal_752',
				orden: orden
			},
			() => {
				validarFechaInicialSER752('2')
			},
			() => {
				document.querySelector('#diaFinal_752').value = cerosIzq(document.querySelector('#diaFinal_752').value, 2);
			    document.querySelector('#mesFinal_752').value = cerosIzq(document.querySelector('#mesFinal_752').value, 2);
				$_SER752.fechaFinal = parseInt(document.querySelector('#añoFinal_752').value + document.querySelector('#mesFinal_752').value + document.querySelector('#diaFinal_752').value);
				$_SER752.diaFinal = parseInt(document.querySelector('#diaFinal_752').value);
				$_SER752.mesFinal = parseInt(document.querySelector('#mesFinal_752').value);
				$_SER752.añoFinal = parseInt(document.querySelector('#añoFinal_752').value);
				if ($_SER752.diaFinal < 1 || $_SER752.diaFinal > 31) {
					validarFechaFinalSER752('3');
				} else if ($_SER752.mesFinal < 1 || $_SER752.mesFinal > 12) {
					validarFechaFinalSER752('2');
				} else if ($_SER752.fechaFinal < $_SER752.fechaInicial) {
					CON851('03', 'Fecha de vencimiento debe ser mayor', null, 'error', 'error');
					validarFechaFinalSER752('2');
				} else {
					validarTipoServicioSER752();
				}
			}
		);
	}, 100);
}

function validarTipoServicioSER752() {
	document.querySelector('#tipoServ_SER752').value == "" ? document.querySelector('#tipoServ_SER752').value = '5' : false;
	document.querySelector('#descripTipoServ_SER752').value = "1. CIRUGIAS   5. CONSULTAS"
	validarInputs(
		{
			form: '#validarTipoServ_752',
			orden: '1'
		},
		() => {
			validarFechaFinalSER752('2');
		},
		() => {
			$_SER752['tipoServ'] = document.getElementById("tipoServ_SER752").value.trim();
			if ($_SER752.tipoServ == "1" || $_SER752.tipoServ == "5") {
				$_SER752.tipoServ == "1" ? document.querySelector('#descripTipoServ_SER752').value = "CIRUGIAS" : document.querySelector('#descripTipoServ_SER752').value = "CONSULTAS";
				validarEntidadSER752();
			} else {
				validarEntidadSER752();
			}
		}
	);
}

function validarEntidadSER752() {
	// document.querySelector('#entidad_SER752').value == "" ? document.querySelector('#entidad_SER752').value = '****' : false;
	validarInputs(
		{
			form: '#validarEntidad_752',
			orden: '1'
		},
		() => {
			validarTipoServicioSER752();
		},
		() => {
			$_SER752['entidad'] = document.getElementById("entidad_SER752").value.trim();
			if ($_SER752.entidad == "99") {
				document.querySelector('#descripEntidad_SER752').value = "TODOS LOS TERCEROS";
				validarEpsSER752();
			} else {
			    const res = $_SER752.TERCEROS.find(e => e.COD.trim() == $_SER752.entidad);
			    if (res == undefined) {
				    document.getElementById("entidad_SER752").value = "";
				    CON851('01', '01', null, 'error', 'error');
				    validarEntidadSER752();
			    } else {
				    console.log("valido");
				    document.querySelector('#descripEntidad_SER752').value = res.NOMBRE;
					validarEpsSER752();
				}
			}
		
		}
	);
}

function validarEpsSER752() {
	document.querySelector('#eps_SER752').value == "" ? document.querySelector('#eps_SER752').value = '******' : false;
	validarInputs(
		{
			form: '#validarEps_752',
			orden: '1'
		},
		() => {
			validarEntidadSER752();
		},
		() => {
			$_SER752['eps'] = document.getElementById("eps_SER752").value.trim();
			if ($_SER752.eps == "******") {
				document.querySelector('#descripEps_SER752').value = "TODOS LOS CODIGOS";
				validarCentroCostosSER752();
			} else {
				const res = $_SER752.ENTIDADES.find(e => e['COD-ENT'].trim() == $_SER752.eps);
				if (res == undefined) {
					CON851('01', '01', null, 'error', 'error');
					validarEpsSER752();
				} else {
					document.querySelector('#descripEps_SER752').value = res['NOMBRE-ENT'];
					validarCentroCostosSER752();
				}
			}
		}
	);
}

function validarCentroCostosSER752() {
	document.querySelector('#costo_SER752').value == "" ? document.querySelector('#costo_SER752').value = '****' : false;
	validarInputs(
		{
			form: '#validarCosto_752',
			orden: '1'
		},
		() => {
			validarEpsSER752();
		},
		() => {
			$_SER752['costo'] = document.getElementById("costo_SER752").value.trim();
			if ($_SER752.costo == "****") {
				document.querySelector('#descripCosto_SER752').value = "TODOS LOS C. COSTOS";
				validarAtiendeSER752();
			} else {
				const res = $_SER752.COSTOS.find(e => e.COD.trim() == $_SER752.costo);
				if (res == undefined) {
					CON851('01', '01', null, 'error', 'error');
					validarCentroCostosSER752();
				} else {
					document.querySelector('#descripCosto_SER752').value = res.NOMBRE;
					validarAtiendeSER752();
				}
			}
		}
	);
}

function validarAtiendeSER752() {
	document.querySelector('#atiende_SER752').value == "" ? document.querySelector('#atiende_SER752').value = '*' : false;
	validarInputs(
		{
			form: '#validarAtiende_752',
			orden: '1'
		},
		() => {
			validarCentroCostosSER752();
		},
		() => {
			$_SER752['atiende'] = document.getElementById("atiende_SER752").value.trim();
			if ($_SER752.atiende == "*") {
				document.querySelector('#descripAtiende_SER752').value = "TODO TIPO PERSONAL";
				validarCausaSER752();
			} else {
				const res = $_SER752.SER830.find(e => e.COD.trim() == $_SER752.atiende);
				if (res == undefined) {
					CON851('01', '01', null, 'error', 'error');
					validarAtiendeSER752();
				} else {
					document.querySelector('#descripAtiende_SER752').value = res.DESCRIP;
					validarCausaSER752();
				}
			}
		}
	);
}

function validarCausaSER752() {
	document.querySelector('#causa_SER752').value == "" ? document.querySelector('#causa_SER752').value = '500' : false;
	validarInputs(
		{
			form: '#validarCausa_752',
			orden: '1'
		},
		() => {
			validarAtiendeSER752();
		},
		() => {
			$_SER752['causa'] = document.getElementById("causa_SER752").value.toUpperCase().trim();
			if (parseInt($_SER752.causa) < 5) {
				validarCausaSER752()
			} else {
				validarIncluirSER752()
			}
		}
	);
}

function validarIncluirSER752() {
	document.querySelector('#incluir_SER752').value == "" ? document.querySelector('#incluir_SER752').value = 'N' : false;
	document.getElementById("incluir_SER752").setAttribute("placeholder", "N");
	validarInputs(
		{
			form: '#validarIncluir_752',
			orden: '1'
		},
		() => {
			validarCausaSER752();
		},
		() => {
			$_SER752['incluir'] = document.getElementById("incluir_SER752").value.toUpperCase().trim();
			($_SER752.incluir == "S" || $_SER752.incluir == "N") ? validarOrdenarEvenSER752() : validarIncluirSER752();
		}
	);
}

function validarOrdenarEvenSER752() {
	document.querySelector('#ordenarEven_SER752').value == "" ? document.querySelector('#ordenarEven_SER752').value = 'S' : false;
	document.getElementById("ordenarEven_SER752").setAttribute("placeholder", "S");
	validarInputs(
		{
			form: '#validarOrdenarEven_752',
			orden: '1'
		},
		() => {
			validarIncluirSER752();
		},
		() => {
			$_SER752['ordenarEven'] = document.getElementById("ordenarEven_SER752").value.toUpperCase().trim();
			($_SER752.ordenarEven == "S" || $_SER752.ordenarEven == "N") ? _envioImpresion() : validarOrdenarEvenSER752();
		}
	);
}

function _envioImpresion() {
	CON850_P(function (e) {
		if (e.id == 'S') {

			loader('show')
			var datos_envio = datosEnvio() 
			+ localStorage.Usuario
			+ '|' + $_SER752.unidServ
			+ '|' + $_SER752.prefijo
			+ '|' + $_SER752.numero
			+ '|' + $_SER752.fechaInicial.toString()
			+ '|' + $_SER752.fechaFinal.toString()
			+ '|' + $_SER752.tipoServ
			+ '|' + $_SER752.entidad
			+ '|' + $_SER752.eps
			+ '|' + $_SER752.costo
			+ '|' + $_SER752.atiende
			+ '|' + $_SER752.causa
			+ '|' + $_SER752.incluir
			+ '|' + $_SER752.ordenarEven;

			console.log(datos_envio, "datos_envio");

			postData({ datosh: datos_envio }, get_url('app/SALUD/SER752.DLL'))
				.then(_montarImpresion_SER752)
				.catch(err => {
					console.log(err)
					validarOrdenarEvenSER752();
				})
		} else {
			validarOrdenarEvenSER752();
		}
	}, {
		msj: '00',
		overlay_show: true
	})
}

function _montarImpresion_SER752(data) {
	data.Listado.pop();
	data.ENCABEZADO = [];

	let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
	let nit = $_USUA_GLOBAL[0].NIT.toString();
	let fecha = moment().format('MMM DD/YY');

	data.ENCABEZADO.push(nombreEmpresa);
	data.ENCABEZADO.push(nit);
	data.ENCABEZADO.push(fecha);
	data.ENCABEZADO.push($_SER752.fechaInicial);
	data.ENCABEZADO.push($_SER752.fechaFinal);
	data.ENCABEZADO.push($_SER752.numero);
	data.ENCABEZADO.push(moment().format("HH:mm"));
	data.ENCABEZADO.push(document.querySelector('#descripCosto_SER752').value);
	data.ENCABEZADO.push(document.querySelector('#descripAtiende_SER752').value);

	var impresion = {
		datos: data,
		tipo: $_FORMATO_752.toLowerCase(),
		formato: 'salud/SER752.formato.html',
		nombre: 'LISTADO-MORBILIDAD-POR-ENTIDAD-' + localStorage.Sesion
	}
	loader('hide')

	imprimir(impresion, () => {
		_inputControl('reset');
		$('#formatoimpresion_752').val(null).removeAttr('disabled').trigger('change');
		$('#formatoimpresion_752').select2('open')
		// _toggleNav() 
	});
}

function _cargarUnidServicios() {
	postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER873.DLL"))
		.then(data => {
			$_SER752.UNSERV = data.UNSERV;
			$_SER752.UNSERV.pop();
			_cargarFacturas();
		}).catch(err => {
			loader('hide');
			_toggleNav();
		})
}

function _cargarFacturas() {
	postData({ datosh: datosEnvio() + '1' + '|||' }, get_url("app/SALUD/SER808.DLL"))
		.then(data => {
			$_SER752.FACTURAS = data.NUMERACION;
			$_SER752.FACTURAS.pop();
			_cargarEntidades();
		}).catch(err => {
			loader('hide');
			_toggleNav();
		})
}

function _cargarEntidades() {
	postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON802.DLL"))
		.then(data => {
			$_SER752.TERCEROS = data.TERCEROS;
			$_SER752.TERCEROS.pop();
			console.log($_SER752.TERCEROS, "ENTIDADES")
			_cargarEps();
		}).catch(err => {
			loader('hide');
			console.log("error entidades")
			_toggleNav();
		})
}

function _cargarEps() {
	postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER853.DLL"))
		.then(data => {
			$_SER752.ENTIDADES = data.ENTIDADES;
			_cargarCostos();
		}).catch(err => {
			loader('hide');
			_toggleNav();
		})
}

function _cargarCostos() {
	postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON803.DLL"))
		.then(data => {
			$_SER752.COSTOS = data.COSTO;
			$_SER752.COSTOS.pop();
			console.log(data);
			_cargarAtiende();
		}).catch(err => {
			loader('hide');
			_toggleNav();
		})
}

function _cargarAtiende() {
	$_SER752['SER830'] = [
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
	setTimeout(function () { $('#formatoimpresion_752').select2('open') }, 500)
}



function _ventanaUnidServiciosSER752(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA UNIDADES DE SERVICIO",
			columnas: ["COD", "DESCRIP"],
			data: $_SER752.UNSERV,
			callback_esc: function () {
				$("#unidServ_SER752").focus();
			},
			callback: function (data) {
				document.getElementById('unidServ_SER752').value = data.COD;
				_enterInput('#unidServ_SER752');
			}
		});
	}
}

function _ventanaFacturacionSER752(e) {
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
					validarNumeroSER752();
				} else {
					if(value == "S" || value == "N"){
					console.log(value, "value")
					value == "S" ? filtro = "N" : filtro = "S";
					postData({ datosh: datosEnvio() + '1' + '|' + '|' + filtro + '|' + $_SER752.prefijo }, get_url("app/SALUD/SER808.DLL"))
						.then(data => {
							$_SER752.FACTURAS2 = data.NUMERACION;
							$_SER752.FACTURAS2.pop();
							_ventanaFacturacion2SER752();
						}).catch(err => {
							loader('hide');
							_toggleNav();
						})
					}else{
						validarNumeroSER752();
					}
				}
			}
		});
	}
}

function _ventanaFacturacion2SER752() {
	_ventanaDatos({
		titulo: "VENTANA DE FACTURAS",
		columnas: ["COD", "FECHA_ING" ,"DESCRIP", "NOM_PAC", "CONVENIO"],
		data: $_SER752.FACTURAS2,
		ancho: "1100",
		callback_esc: function () {
			$("#numero_SER752").focus();
		},
		callback: function (data) {
			document.getElementById('numero_SER752').value = data.COD.substring(1,7).trim();
			_enterInput('#numero_SER752');
		}
	});
}

function _ventanaEntidadesSER752(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA DE TERCEROS",
			columnas: ["COD", "NOMBRE"],
			data: $_SER752.TERCEROS,
			callback_esc: () => {
				$("#entidad_SER752").focus();
			},
			callback: (data) => {
				document.querySelector('#entidad_SER752').value = data.COD;
				document.querySelector('#descripEntidad_SER752').value = data.NOMBRE;
				_enterInput('#entidad_SER752');
			}
		});
	}
}

function _ventanaEpsSER752(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA DE ENTIDADES",
			columnas: ["COD-ENT", "NOMBRE-ENT"],
			data: $_SER752.ENTIDADES,
			callback_esc: function () {
				$("#eps_SER752").focus();
			},
			callback: function (data) {
				document.getElementById('eps_SER752').value = data['COD-ENT'];
				_enterInput('#eps_SER752');
			}
		});
	}
}

function _ventanaCostosSER752(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA DE CENTROS DE COSTOS",
			columnas: ["COD", "NOMBRE", "DESCRIP"],
			data: $_SER752.COSTOS,
			callback_esc: function () {
				$("#costo_SER752").focus();
			},
			callback: function (data) {
				document.getElementById('costo_SER752').value = data.COD;
				_enterInput('#costo_SER752');
			}
		});
	}
}

function _ventanaAtiendeSER752(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		SER830({ seleccion: $_SER752.PERSONAL }, $('#atiende_SER752'), (data) => {
			document.querySelector('#atiende_SER752').value = data.COD;
			$_SER752.atiende = data.COD;
			document.querySelector('#descripAtiende_SER752').value = data.DESCRIP;
			_enterInput('#atiende_SER752');
		})
	}
}