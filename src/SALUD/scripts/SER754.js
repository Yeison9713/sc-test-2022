// LISTADO MORBILIDAD POR HOSPITALIZACION
// DAVID.M - CREACION - 23/06/2020 - OPCION 9-7-7-5-1-4 SALUD
var $_SER754 = [], $_FORMATO_754 = [];

$(document).ready(() => {
	loader('show')
	_inputControl("reset");
	_inputControl("disabled");
	nombreOpcion('9-7-7-5-1-4 - Morbilidad por hospitalizacion');
	_cargarTerceros();

	_toggleF8([
		{ input: 'tercero', app: 'SER754', funct: _ventanaTercerosSER754 },
		{ input: 'espec', app: 'SER754', funct: _ventanaEspecialidadesSER754 },
		{ input: 'costo', app: 'SER754', funct: _ventanaCostosSER754 },
		{ input: 'entidad', app: 'SER754', funct: _ventanaEntidadesSER754 },
		{ input: 'grupo', app: 'SER754', funct: _ventanaGrupoSER754 }
	]);
	$('#formatoimpresion_754').select2().on('select2:select', validarFormato_754);
})

function habilitarFORMATO_754() {
	_inputControl('reset');
	$('#formatoimpresion_754').val(null).removeAttr('disabled').trigger('change');
	$('#formatoimpresion_754').select2('open')
}

function validarFormato_754() {
	var seleccionado = $(this).val();
	if (seleccionado != "3") {
		if (seleccionado == "1") $_FORMATO_754 = 'PDF';
		else if (seleccionado == "2") $_FORMATO_754 = 'CSV';

		$(this).attr('disabled', 'true');
		datoInicialSER754();
	} else {
		$(this).attr('disabled', 'true');
		_toggleNav();
	}
}

function datoInicialSER754() {
	document.querySelector('#diaInicial_754').value = "01";
	document.querySelector('#mesInicial_754').value = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
	document.querySelector('#añoInicial_754').value = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

	document.querySelector('#diaFinal_754').value = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
	document.querySelector('#mesFinal_754').value = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
	document.querySelector('#añoFinal_754').value = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

	validarFechaInicialSER754('2');
}

function validarFechaInicialSER754(orden) {
	setTimeout(function () {
		validarInputs(
			{
				form: '#fechaInicial_754',
				orden: orden
			},
			() => {
				$('#formatoimpresion_754').val(null).removeAttr('disabled').trigger('change');
				$('#formatoimpresion_754').select2('open');
			},
			() => {
				document.querySelector('#diaInicial_754').value = cerosIzq(document.querySelector('#diaInicial_754').value, 2);
				document.querySelector('#mesInicial_754').value = cerosIzq(document.querySelector('#mesInicial_754').value, 2);
				$_SER754.fechaInicial = parseInt(document.querySelector('#añoInicial_754').value + document.querySelector('#mesInicial_754').value + document.querySelector('#diaInicial_754').value);
				$_SER754.diaInicial = parseInt(document.querySelector('#diaInicial_754').value);
				$_SER754.mesInicial = parseInt(document.querySelector('#mesInicial_754').value);
				$_SER754.añoInicial = parseInt(document.querySelector('#añoInicial_754').value);
				if ($_SER754.diaInicial < 1 || $_SER754.diaInicial > 31) {
					validarFechaInicialSER754('3');
				} else if ($_SER754.mesInicial < 1 || $_SER754.mesInicial > 12) {
					validarFechaInicialSER754('2');
				} else {
					validarFechaFinalSER754('2');
				}
			}
		);
	}, 100);
}

function validarFechaFinalSER754(orden) {
	setTimeout(function () {
		validarInputs(
			{
				form: '#fechaFinal_754',
				orden: orden
			},
			() => {
				validarFechaInicialSER754('2')
			},
			() => {
				document.querySelector('#diaFinal_754').value = cerosIzq(document.querySelector('#diaFinal_754').value, 2);
				document.querySelector('#mesFinal_754').value = cerosIzq(document.querySelector('#mesFinal_754').value, 2);
				$_SER754.fechaFinal = parseInt(document.querySelector('#añoFinal_754').value + document.querySelector('#mesFinal_754').value + document.querySelector('#diaFinal_754').value);
				$_SER754.diaFinal = parseInt(document.querySelector('#diaFinal_754').value);
				$_SER754.mesFinal = parseInt(document.querySelector('#mesFinal_754').value);
				$_SER754.añoFinal = parseInt(document.querySelector('#añoFinal_754').value);
				if ($_SER754.diaFinal < 1 || $_SER754.diaFinal > 31) {
					validarFechaFinalSER754('3');
				} else if ($_SER754.mesFinal < 1 || $_SER754.mesFinal > 12) {
					validarFechaFinalSER754('2');
				} else if ($_SER754.fechaFinal < $_SER754.fechaInicial) {
					CON851('03', 'Fecha de vencimiento debe ser mayor', null, 'error', 'error');
					validarFechaFinalSER754('2');
				} else {
					validarTipoServicioSER754();
				}
			}
		);
	}, 100);
}

function validarTipoServicioSER754() {
	document.querySelector('#descripTipoServ_SER754').value = "HOSPITALIZACIÓN";
	validarTerceroSER754();
}

function validarTerceroSER754() {
	document.querySelector('#tercero_SER754').value == "" ? document.querySelector('#tercero_SER754').value = '99' : false;
	validarInputs(
		{
			form: '#validarTercero_754',
			orden: '1'
		},
		() => {
			validarFechaFinalSER754('2');
		},
		() => {
			$_SER754['tercero'] = document.getElementById("tercero_SER754").value.trim();
			if ($_SER754.tercero == "99") {
				document.querySelector('#descripTercero_SER754').value = "PROCESO TOTAL";
				validarEspecialidadSER754();
			} else {
				const res = $_SER754.TERCEROS.find(e => e.COD.trim() == $_SER754.tercero);
				if (res == undefined) {
					CON851('01', '01', null, 'error', 'error');
					validarTerceroSER754();
				} else {
					document.querySelector('#descripTercero_SER754').value = res.NOMBRE;
					validarEspecialidadSER754();
				}
			}
		}
	);
}

function validarEspecialidadSER754() {
	document.querySelector('#espec_SER754').value == "" ? document.querySelector('#espec_SER754').value = '***' : false;
	validarInputs(
		{
			form: '#validarEspec_754',
			orden: '1'
		},
		() => {
			validarTipoServicioSER754();
		},
		() => {
			$_SER754['espec'] = document.getElementById("espec_SER754").value.trim();
			if ($_SER754.espec == "***") {
				document.querySelector('#descripEspec_SER754').value = "TODAS LAS ESPECIALIDADES";
				validarCentroCostosSER754();
			} else {
				const res = $_SER754.ESPEC.find(e => e.CODIGO.trim() == $_SER754.espec);
				if (res == undefined) {
					CON851('01', '01', null, 'error', 'error');
					validarEspecialidadSER754();
				} else {
					document.querySelector('#descripEspec_SER754').value = res.NOMBRE;
					validarCentroCostosSER754();
				}
			}
		}
	);
}

function validarCentroCostosSER754() {
	document.querySelector('#costo_SER754').value == "" ? document.querySelector('#costo_SER754').value = '****' : false;
	validarInputs(
		{
			form: '#validarCosto_754',
			orden: '1'
		},
		() => {
			validarEspecialidadSER754();
		},
		() => {
			$_SER754['costo'] = document.getElementById("costo_SER754").value.trim();
			if ($_SER754.costo == "****") {
				document.querySelector('#descripCosto_SER754').value = "TODOS LOS C. COSTOS";
				validarGrupoSER754();
			} else {
				const res = $_SER754.COSTOS.find(e => e.COD.trim() == $_SER754.costo);
				if (res == undefined) {
					CON851('01', '01', null, 'error', 'error');
					validarCentroCostosSER754();
				} else {
					document.querySelector('#descripCosto_SER754').value = res.NOMBRE;
					validarGrupoSER754();
				}
			}
		}
	);
}

function validarGrupoSER754() {
	document.querySelector('#grupo_SER754').value == "" ? document.querySelector('#grupo_SER754').value = '**' : false;
	validarInputs(
		{
			form: '#validarGrupo_754',
			orden: '1'
		},
		() => {
			validarCentroCostosSER754();
		},
		() => {
			$_SER754['grupo'] = document.getElementById("grupo_SER754").value.toUpperCase().trim();
			if ($_SER754.grupo == "**") {
				document.querySelector('#descripGrupo_SER754').value = "TODOS LOS GRUPOS";
				validarVariosDiagSER754();
			} else {
				const res = $_SER754.GRPSER.find(e => e.COD.trim() == $_SER754.grupo);
				if (res == undefined) {
					CON851('01', '01', null, 'error', 'error');
					validarGrupoSER754();
				} else {
					document.querySelector('#descripGrupo_SER754').value = res.DESCRIP;
					validarVariosDiagSER754();
				}
			}
		}
	);
}

function validarVariosDiagSER754() {
	document.querySelector('#variosDiag_SER754').value == "" ? document.querySelector('#variosDiag_SER754').value = 'N' : false;
	document.getElementById("variosDiag_SER754").setAttribute("placeholder", "N");
	validarInputs(
		{
			form: '#validarVariosDiag_754',
			orden: '1'
		},
		() => {
			validarGrupoSER754();
		},
		() => {
			$_SER754['variosDiag'] = document.getElementById("variosDiag_SER754").value.toUpperCase().trim();
			($_SER754.variosDiag == "S" || $_SER754.variosDiag == "N") ? validarSoloReingresosSER754() : validarVariosDiagSER754();
		}
	);
}

function validarSoloReingresosSER754() {
	document.querySelector('#soloReing_SER754').value == "" ? document.querySelector('#soloReing_SER754').value = 'N' : false;
	document.getElementById("soloReing_SER754").setAttribute("placeholder", "N");
	validarInputs(
		{
			form: '#validarSoloReing_754',
			orden: '1'
		},
		() => {
			validarVariosDiagSER754();
		},
		() => {
			$_SER754['soloReing'] = document.getElementById("soloReing_SER754").value.toUpperCase().trim();
			($_SER754.soloReing == "S" || $_SER754.soloReing == "N") ? validarComprobantesSER754() : validarSoloReingresosSER754();
		}
	);
}

function validarComprobantesSER754() {
	document.querySelector('#comprobantes_SER754').value == "" ? document.querySelector('#comprobantes_SER754').value = 'N' : false;
	document.getElementById("comprobantes_SER754").setAttribute("placeholder", "N");
	validarInputs(
		{
			form: '#validarComprobantes_754',
			orden: '1'
		},
		() => {
			validarSoloReingresosSER754();
		},
		() => {
			$_SER754['valComprobantes'] = document.getElementById("comprobantes_SER754").value.toUpperCase().trim();
			($_SER754.valComprobantes == "S" || $_SER754.valComprobantes == "N") ? false : validarComprobantesSER754();
			if($_SER754.valComprobantes == 'N') { validarEntidadSER754() }
			else if($_SER754.valComprobantes == 'S'){ validarDiagnosticoSER754() };
		}
	);
}

function validarDiagnosticoSER754() {
	document.querySelector('#diagnostico_SER754').value == "" ? document.querySelector('#diagnostico_SER754').value = '****' : false;
	validarInputs(
		{
			form: '#validarDiagnostico_754',
			orden: '1'
		},
		() => {
			validarComprobantesSER754();
		},
		() => {
			$_SER754['diagnostico'] = document.getElementById("diagnostico_SER754").value.toUpperCase().trim();
			validarEntidadSER754();
		}
	);
}

function validarEntidadSER754() {
	document.querySelector('#entidad_SER754').value == "" ? document.querySelector('#entidad_SER754').value = '******' : false;
	validarInputs(
		{
			form: '#validarEntidad_754',
			orden: '1'
		},
		() => {
      ($_SER754.valComprobantes == 'N') ? validarComprobantesSER754() : validarDiagnosticoSER754();
		},
		() => {
			$_SER754['entidad'] = document.getElementById("entidad_SER754").value.trim();
			if ($_SER754.entidad == "******") {
				document.querySelector('#descripEntidad_SER754').value = "TODOS LOS CODIGOS";
				validarListarPrimSER754();
			} else {
				const res = $_SER754.ENTIDADES.find(e => e['COD-ENT'].trim() == $_SER754.entidad);
				if (res == undefined) {
					CON851('01', '01', null, 'error', 'error');
					validarEntidadSER754();
				} else {
					document.querySelector('#descripEntidad_SER754').value = res['NOMBRE-ENT'];
					validarListarPrimSER754();
				}
			}
		}
	);
}

function validarListarPrimSER754() {
	document.querySelector('#listarPrim_SER754').value == "" ? document.querySelector('#listarPrim_SER754').value = '500' : false;
	validarInputs(
		{
			form: '#validarListarPrim_754',
			orden: '1'
		},
		() => {
			validarEntidadSER754();
		},
		() => {
			$_SER754['listarPrim'] = document.getElementById("listarPrim_SER754").value.toUpperCase().trim();
			if (parseInt($_SER754.listarPrim) < 5) {
				validarListarPrimSER754();
			} else {
				validarIncluirContrSER754();
			}
		}
	);
}

function validarIncluirContrSER754() {
	document.querySelector('#incluirContr_SER754').value == "" ? document.querySelector('#incluirContr_SER754').value = 'N' : false;
	document.getElementById("incluirContr_SER754").setAttribute("placeholder", "N");
	validarInputs(
		{
			form: '#validarIncluirContr_754',
			orden: '1'
		},
		() => {
			validarListarPrimSER754();
		},
		() => {
			$_SER754['incluirContr'] = document.getElementById("incluirContr_SER754").value.toUpperCase().trim();
			($_SER754.incluirContr == "S" || $_SER754.incluirContr == "N") ? validarOrdenarEvenSER754() : validarIncluirContrSER754();
		}
	);
}

function validarOrdenarEvenSER754() {
	document.querySelector('#ordenarEven_SER754').value == "" ? document.querySelector('#ordenarEven_SER754').value = 'S' : false;
	document.getElementById("ordenarEven_SER754").setAttribute("placeholder", "N");
	validarInputs(
		{
			form: '#validarOrdenarEven_754',
			orden: '1'
		},
		() => {
			validarIncluirContrSER754();
		},
		() => {
			$_SER754['ordenarEven'] = document.getElementById("ordenarEven_SER754").value.toUpperCase().trim();
			($_SER754.ordenarEven == "S" || $_SER754.ordenarEven == "N") ? _envioImpresion() : validarOrdenarEvenSER754();
		}
	);
}

function _envioImpresion() {
	CON850_P(function (e) {
		if (e.id == 'S') {

			loader('show')
			var datos_envio = datosEnvio()
				+ localStorage.Usuario
				+ '|' + $_SER754.fechaInicial.toString()
				+ '|' + $_SER754.fechaFinal.toString()
				+ '|' + cerosIzq($_SER754.tercero, 10)
				+ '|' + $_SER754.espec
				+ '|' + $_SER754.costo
				+ '|' + $_SER754.grupo
				+ '|' + $_SER754.variosDiag
				+ '|' + $_SER754.soloReing
				+ '|' + $_SER754.valComprobantes
				+ '|' + $_SER754.diagnostico
				+ '|' + $_SER754.entidad
				+ '|' + $_SER754.listarPrim
				+ '|' + $_SER754.incluirContr
				+ '|' + $_SER754.ordenarEven;

			console.log(datos_envio, "datos_envio");

			postData({ datosh: datos_envio }, get_url('app/SALUD/SER754.DLL'))
				.then(_montarImpresion_SER754)
				.catch(err => {
					console.log(err)
					validarOrdenarEvenSER754();
				})
		} else {
			validarOrdenarEvenSER754();
		}
	}, {
		msj: '00',
		overlay_show: true
	})
}

function _montarImpresion_SER754(data) {
	data.LISTADO.pop();
	data.ENCABEZADO = [];

	let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
	let nit = $_USUA_GLOBAL[0].NIT.toString();
	let fecha = moment().format('MMM DD/YY');

	data.ENCABEZADO.push(nombreEmpresa);
	data.ENCABEZADO.push(nit);
	data.ENCABEZADO.push(fecha);
	data.ENCABEZADO.push($_SER754.fechaInicial);
	data.ENCABEZADO.push($_SER754.fechaFinal);
	data.ENCABEZADO.push(moment().format("HH:mm"));
	data.ENCABEZADO.push(document.querySelector('#descripCosto_SER754').value);
	data.ENCABEZADO.push(document.querySelector('#descripEspec_SER754').value);

	var impresion = {
		datos: data,
		tipo: $_FORMATO_754.toLowerCase(),
		formato: 'salud/SER754.formato.html',
		nombre: 'LISTADO-MORBILIDAD-POR-HOSPITALIZACION-' + localStorage.Sesion
	}
	loader('hide')

	imprimir(impresion, () => {
		_inputControl('reset');
		$('#formatoimpresion_754').val(null).removeAttr('disabled').trigger('change');
		$('#formatoimpresion_754').select2('open')
		// _toggleNav() 
	});
}

function _cargarTerceros() {
	postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON802.DLL"))
		.then(data => {
			$_SER754.TERCEROS = data.TERCEROS;
			$_SER754.TERCEROS.pop();
			_cargarEspecialidades();
		}).catch(err => {
			loader('hide');
			_toggleNav();
		})
}

function _cargarEspecialidades() {
	postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER855.DLL"))
		.then(data => {
			$_SER754.ESPEC = data.ESPECIALIDADES;
			$_SER754.ESPEC.pop();
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
			$_SER754.COSTOS = data.COSTO;
			$_SER754.COSTOS.pop();
			console.log(data);
			_cargarEntidades();
		}).catch(err => {
			loader('hide');
			_toggleNav();
		})
}

function _cargarEntidades() {
	postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER853.DLL"))
		.then(data => {
			$_SER754.ENTIDADES = data.ENTIDADES;
			_cargarGrpSer();
		}).catch(err => {
			loader('hide');
			_toggleNav();
		})
}

function _cargarGrpSer() {
	postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER801.DLL"))
		.then(data => {
			loader('hide');
			$_SER754.GRPSER = data.CODIGOS;
			$_SER754.GRPSER.pop();
			setTimeout(function () { $('#formatoimpresion_754').select2('open') }, 500)
		}).catch(err => {
			loader('hide');
			_toggleNav();
		})
}

function _ventanaTercerosSER754(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		for (i in $_SER754.TERCEROS) {
			$_SER754.TERCEROS[i]['IDENTIFICACION'] = $_SER754.TERCEROS[i].COD;
			$_SER754.TERCEROS[i]['TELEFONO'] = $_SER754.TERCEROS[i].TELEF;
			$_SER754.TERCEROS[i]['ACTIVIDAD'] = $_SER754.TERCEROS[i].ACT;
		}
		_ventanaDatos({
			titulo: "VENTANA DE TERCEROS",
			columnas: ["IDENTIFICACION", "NOMBRE", "TELEFONO", "CIUDAD", "ACTIVIDAD"],
			data: $_SER754.TERCEROS,
			ancho: 900,
			callback_esc: function () {
				$("#tercero_SER754").focus();
			},
			callback: function (data) {
				document.getElementById('tercero_SER754').value = data.COD;
				_enterInput('#tercero_SER754');
			}
		});
	}
}

function _ventanaEspecialidadesSER754(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA DE ESPECIALIDADES",
			columnas: ["CODIGO", "NOMBRE"],
			data: $_SER754.ESPEC,
			callback_esc: function () {
				$("#espec_SER754").focus();
			},
			callback: function (data) {
				document.getElementById('espec_SER754').value = data.CODIGO;
				_enterInput('#espec_SER754');
			}
		});
	}
}

function _ventanaCostosSER754(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA DE CENTROS DE COSTOS",
			columnas: ["COD", "NOMBRE", "DESCRIP"],
			data: $_SER754.COSTOS,
			callback_esc: function () {
				$("#costo_SER754").focus();
			},
			callback: function (data) {
				document.getElementById('costo_SER754').value = data.COD;
				_enterInput('#costo_SER754');
			}
		});
	}
}

function _ventanaEntidadesSER754(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA DE ENTIDADES",
			columnas: ["COD-ENT", "NOMBRE-ENT"],
			data: $_SER754.ENTIDADES,
			callback_esc: function () {
				$("#entidad_SER754").focus();
			},
			callback: function (data) {
				document.getElementById('entidad_SER754').value = data['COD-ENT'];
				_enterInput('#entidad_SER754');
			}
		});
	}
}

function _ventanaGrupoSER754(e) {
	console.debug(e, 'evento F8')
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "GRUPOS DE SERVICIO",
			columnas: ["COD", "DESCRIP"],
			data: $_SER754.GRPSER,
			callback_esc: function () {
				$('#grupo_SER754').focus();
			},
			callback: function (data) {
				console.debug(data);
				$('#grupo_SER754').val(data.COD.trim())
				$('#descripGrupo_SER754').val(data.DESCRIP.trim())
				_enterInput('#grupo_SER754');
			}
		});
	}
}