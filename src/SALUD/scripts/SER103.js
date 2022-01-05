// CLINICAS - LISTADO GENERAL DE TARIFAS
// SANTIAGO - 09/06/2020 - OPCION 9-7-2-1 SALUD
var $_SER103 = [], $_FORMATO_103 = [];

$(document).ready(() => {
	nombreOpcion('9,7,2,1 - Listado general de tarifas');
	loader('show')
	_inputControl("reset");
	_inputControl("disabled");
	_cargarNomTar();

	_toggleF8([
		{ input: 'tarifa', app: 'SER103', funct: _ventanaTarifasSER103 },
		{ input: 'listaCod', app: 'SER103', funct: _ventanaListaCodSER103 },
		{ input: 'grupo', app: 'SER103', funct: _ventanaGrupoSER103 }
	]);
	// $('#formatoimpresion_103').select2().on('select2:select', validarFormato_103);
	loader('hide');
	validarTarifasSER103();
})

// function habilitarFORMATO_103() {
// 	_inputControl('reset');
// 	$('#formatoimpresion_103').val(null).removeAttr('disabled').trigger('change');
// 	$('#formatoimpresion_103').select2('open')
// }

// function validarFormato_103() {
// 	var seleccionado = $(this).val();
// 	if (seleccionado != "3") {
// 		if (seleccionado == "1") $_FORMATO_103 = 'PDF';
// 		else if (seleccionado == "2") $_FORMATO_103 = 'CSV';

// 		$(this).attr('disabled', 'true');
// 		validarTarifasSER103();
// 	} else {
// 		$(this).attr('disabled', 'true');
// 		_toggleNav();
// 	}
// }

function validarTarifasSER103() {
	validarInputs(
		{
			form: '#validarTarifa_103',
			orden: '1'
		},
		() => {
			// $('#formatoimpresion_103').val(null).removeAttr('disabled').trigger('change');
			// $('#formatoimpresion_103').select2('open')
			_toggleNav();
		},
		() => {
			$_SER103['tarifa'] = document.getElementById("tarifa_SER103").value.toUpperCase().trim();
			if ($_SER103.tarifa == "**") {
				document.querySelector('#descripTarifa_SER103').value = "PROCESO TOTAL";
				validarListaCodSER103();
			} else {
				const res = $_SER103.NOMTAR.find(e => e.COD == $_SER103.tarifa);
				if (res == undefined) {
					document.getElementById("tarifa_SER103").value = "";
					CON851('01', '01', null, 'error', 'error');
					validarTarifasSER103();
				} else {
					console.log("valido");
					document.querySelector('#descripTarifa_SER103').value = res.DESCRIP;
					validarListaCodSER103();
				}
			}
		}
	);
}

function validarListaCodSER103() {
	validarInputs(
		{
			form: '#validarListaCod_103',
			orden: '1'
		},
		() => {
			validarTarifasSER103();
		},
		() => {
			$_SER103['listaCod'] = document.getElementById("listaCod_SER103").value.toUpperCase().trim();
			if ($_SER103.listaCod == "****") {
				document.querySelector('#descripListaCod_SER103').value = "TODOS LOS CODIGOS";
				validarGrupoSER103();
			} else {
				const res = $_SER103.MAESTROS.find(e => e.LLAVE_MAE.substring(0, 11) == $_SER103.listaCod);
				if (res == undefined) {
					document.getElementById("listaCod_SER103").value = "";
					CON851('01', '01', null, 'error', 'error');
					validarListaCodSER103();
				} else {
					console.log("Funciona");
					document.querySelector('#descripListaCod_SER103').value = res.NOMBRE_MAE;
					validarGrupoSER103();
				}
			}
		}
	);
}

function validarGrupoSER103() {
	validarInputs(
		{
			form: '#validarGrupo_103',
			orden: '1'
		},
		() => {
			validarListaCodSER103();
		},
		() => {
			$_SER103['grupo'] = document.getElementById("grupo_SER103").value.toUpperCase().trim();
			if ($_SER103.grupo == "**") {
				document.querySelector('#descripGrupo_SER103').value = "TODOS LOS GRUPOS";
				validarNivelSER103();
			} else {
				const res = $_SER103.GRPSER.find(e => e.COD == $_SER103.grupo);
				if (res == undefined) {
					document.getElementById("grupo_SER103").value = "";
					CON851('01', '01', null, 'error', 'error');
					validarGrupoSER103();
				} else {
					console.log("valido");
					document.querySelector('#descripGrupo_SER103').value = res.DESCRIP;
					validarNivelSER103();
				}
			}
		}
	);
}

function validarNivelSER103() {
	validarInputs(
		{
			form: '#validarNivel_103',
			orden: '1'
		},
		() => {
			validarGrupoSER103();
			console.log('esc')
		},
		() => {
			$_SER103['nivel'] = document.getElementById("nivel_SER103").value;
			const res = ["1", "2", "3", "4", "5", "*"].find(e => e == $_SER103.nivel);
			if (res == undefined) {
				document.getElementById("nivel_SER103").value = "";
				CON851('01', '01', null, 'error', 'error');
				validarNivelSER103();
			} else {
				console.log("Nivel valido");
				_envioImpresion();
			}
		}
	); $_SER103.listaCod
}

function _envioImpresion() {
	CON850_P(function (e) {
		if (e.id == 'S') {

			loader('show')
			var datos_envio = datosEnvio() + $_SER103.tarifa + '|' + $_SER103.grupo + '|' + $_SER103.nivel + '|' + $_SER103.listaCod;
			postData({ datosh: datos_envio }, get_url('app/SALUD/SER103.DLL'))
				.then(_montarImpresion_SER103)
				.catch(err => {
					console.log(err)
					validarTarifasSER103();
				})

		} else {
			validarNivelSER103();
		}
	}, {
		msj: '00',
		overlay_show: true
	})
}

function _montarImpresion_SER103(data) {
	data.ENCABEZADO = [];
	data.Listado.pop();

	let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
	let nit = $_USUA_GLOBAL[0].NIT.toString();
	let fecha = moment().format('MMM DD/YY');

	data.ENCABEZADO.push(nombreEmpresa);
	data.ENCABEZADO.push(nit);
	data.ENCABEZADO.push(fecha);

	for (i in data.Listado) {
		data.Listado[i]['DESCRIP_J'] = data.Listado[i]['DESCRIP_J'].replace(/\�/g, "Ñ")
		data.Listado[i]['VALOR_J'] = data.Listado[i]['VALOR_J'].replace(/\ /g, "")
		data.Listado[i]['VALOR_J'] = data.Listado[i]['VALOR_J'].replace(/\,/g, "")
	}

	if (data.Listado.length < 1) {
		CON851('08', '08', null, 'error', 'error');
		validarAsociarNitSER504();
	} else {
		var columnas = [
			{
				title: "CODIGO",
				value: "COD_J",
				format: "string",
				filterButton: true
			},
			{
				title: "SERVICIO",
				value: "DESCRIP_J",
			},
			{
				title: "PORC",
				value: "PORC_J",
			},
			{
				title: "TIPO",
				value: "TIPO_J"
			},
			{
				title: "MONTO",
				value: "VALOR_J",
				format: 'money'
			},
			{
				title: "F.LIQUIDAR",
				value: "FORMA_LIQ_J",
			},
			{
				title: "CUENTA CONTABLE",
				value: "CTA_L",
			},
			{
				title: "COD RIPS",
				value: "COD_RIPS_J",
			},
		]

		var header_format = [
			{ text: `${nombreEmpresa}`, bold: true, size: 16 },
			`FACTURACION RESUMEN GENERAL DE CARTERA     NIT: ${nit}`,
			`Fecha de reporte: ${fecha}`,
		]

		_impresion2({
			tipo: 'excel',
			// sheetName: 'Listado validación',
			header: header_format,
			logo: '892000458.bmp',
			ruta_logo: 'C:\\LOGOS\\', //
			tabla: {
				columnas,
				// totalsRow: true,
				data: data.Listado,
				// heightRow: 35,
				// theme: 'TableStyleDark1'
			},
			archivo: `${localStorage.Usuario + moment().format(`YYMMDD-HHmmss`)}`
			// scale: 65,
			// orientation: 'landscape'
		})
			.then(() => {
				console.log('Proceso terminado')
				_inputControl('reset');
				validarTarifasSER103();
				loader('hide')
			})
			.catch((err) => {
				console.log('Proceso error')
				console.log(err)
			})
	}

	// var impresion = {
	// 	datos: data,
	// 	tipo: $_FORMATO_103.toLowerCase(),
	// 	formato: 'salud/SER103.formato.html',
	// 	nombre: 'LISTADO-GENERAL-TARIFAS-' + localStorage.Sesion
	// }
	// loader('hide')

	// imprimir(impresion, () => {
	// 	_inputControl('reset');
	// 	$('#formatoimpresion_103').val(null).removeAttr('disabled').trigger('change');
	// 	$('#formatoimpresion_103').select2('open')
	// 	// _toggleNav() 
	// });
}


function _cargarNomTar() {
	postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER803.DLL"))
		.then(data => {
			console.log(data);
			$_SER103.NOMTAR = data.NOMTAR;
			_cargarMaestros();
		}).catch(err => {
			loader('hide');
			_toggleNav();
		})
}

function _cargarMaestros() {
	postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON801.DLL"))
		.then(data => {
			$_SER103.MAESTROS = data.MAESTROS;
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
			$_SER103.GRPSER = data.CODIGOS;
			setTimeout(function () { $('#formatoimpresion_103').select2('open') }, 500)
		}).catch(err => {
			loader('hide');
			_toggleNav();
		})
}

function _ventanaTarifasSER103(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA DE NOMBRE TARIFAS",
			columnas: ["COD", "DESCRIP"],
			data: $_SER103.NOMTAR,
			callback_esc: () => { $('#tarifa_SER103').focus() },
			callback: (data) => {
				document.querySelector('#tarifa_SER103').value = (data.COD);
				document.querySelector('#descripTarifa_SER103').value = (data.DESCRIP);
				_enterInput('#tarifa_SER103');
			}
		});
	}
}

function _ventanaListaCodSER103(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos_lite_v2({
			titulo: "VENTANA PLAN DE CUENTAS",
			data: $_SER103.MAESTROS,
			indice: ["LLAVE_MAE", "NOMBRE_MAE", "TIPO_MAE"],
			mascara: [{
				"LLAVE_MAE": "NUMERO DE CUENTA"
			}],
			minLength: 3,
			callback_esc: function () {
				$('#listaCod_SER103').focus();
			}, callback: function (data) {
				console.log(data, "data")
				document.querySelector('#listaCod_SER103').value = data.LLAVE_MAE.substring(0, 11);
				document.querySelector('#descripListaCod_SER103').value = (data.DESCRIP);
				_enterInput('#listaCod_SER103');
			}
		});
	}
}

function _ventanaGrupoSER103(e) {
	console.debug(e, 'evento F8')
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "GRUPOS DE SERVICIO",
			columnas: ["COD", "DESCRIP"],
			data: $_SER103.GRPSER,
			callback_esc: function () {
				$('#grupo_SER103').focus();
			},
			callback: function (data) {
				console.debug(data);
				$('#grupo_SER103').val(data.COD.trim())
				$('#descripGrupo_SER103').val(data.DESCRIP.trim())
				_enterInput('#grupo_SER103');
			}
		});
	}
}