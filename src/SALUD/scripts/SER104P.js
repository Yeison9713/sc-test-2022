// CLINICAS - LISTADO DE TARIFAS X CONTRATO

const { format } = require("mysql");

// DAVID.M - 12/06/2020 - OPCION 9-7-2-6 SALUD
var $_SER104P = [];

$(document).ready(() => {
	loader('show')
	_inputControl("reset");
	_inputControl("disabled");
	nombreOpcion('9-7-2-6 - Listado de tarifas x contrato');
	_cargarContratos();
	_toggleF8([
		{ input: 'contrato', app: 'SER104P', funct: _ventanaContratosSER104P },
		{ input: 'grupo', app: 'SER104P', funct: _ventanaGrupoSER104P }
	]);
})

function validarContratoSER104P() {
	validarInputs(
		{
			form: '#validarContrato_104P',
			orden: '1'
		},
		() => {
			_toggleNav()
		},
		() => {
			$_SER104P['contrato'] = document.getElementById("contrato_SER104P").value.toUpperCase().trim();
			if ($_SER104P.contrato == "9999") {
				document.querySelector('#descripContrato_SER104P').value = "PROCESO TOTAL";
				validarGrupoSER104P();
			} else {
				const res = $_SER104P.CONTRATOS.find(e => e.CUENTA.trim() == $_SER104P.contrato);
				if (res == undefined) {
					CON851('01', '01', null, 'error', 'error');
					validarContratoSER104P();
				} else {
					document.querySelector('#descripContrato_SER104P').value = res.DESCRIP;
					// validarGrupoSER104P();
					$_SER104P.NITCNCAP = res.NIT;
					consultarTerceroSAL201();
				}
			}
		}
	);
}

function consultarTerceroSAL201() {
	let datos_envio = datosEnvio()
	datos_envio += $_SER104P.NITCNCAP;
	SolicitarDll({ datosh: datos_envio }, dataCON110C_02, get_url('/APP/CONTAB/CON110C_02.DLL'));
	function dataCON110C_02(data) {
		var date = data.split("|");
		$_SER104P.DESCRIP_TER = date[5].trim();
		$('#divTercero_104P').css("display", "block");
		console.log($_SER104P.DESCRIP_TER, "NIT")
		document.querySelector('#descripTercero_SER104P').value = $_SER104P.DESCRIP_TER;
	}
	validarGrupoSER104P();
}

function validarGrupoSER104P() {
	validarInputs(
		{
			form: '#validarGrupo_104P',
			orden: '1'
		},
		() => {
			document.querySelector('#descripTercero_SER104P').value = "";
			$('#divTercero_104P').css("display", "none");
			validarContratoSER104P();
		},
		() => {
			$_SER104P['grupo'] = document.getElementById("grupo_SER104P").value.toUpperCase().trim();
			if ($_SER104P.grupo == "**") {
				document.querySelector('#descripGrupo_SER104P').value = "TODOS LOS GRUPOS";
				_envioImpresion();
			} else {
				const res = $_SER104P.GRPSER.find(e => e.COD == $_SER104P.grupo);
				if (res == undefined) {
					document.getElementById("grupo_SER104P").value = "";
					CON851('01', '01', null, 'error', 'error');
					validarGrupoSER104P();
				} else {
					document.querySelector('#descripGrupo_SER104P').value = res.DESCRIP;
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
			var datos_envio = datosEnvio() + $_SER104P.contrato + '|' + $_SER104P.grupo;
			postData({ datosh: datos_envio }, get_url('app/SALUD/SER104P.DLL'))
				.then(_montarImpresion_SER104P)
				.catch(err => {
					console.log(err)
					validarContratoSER104P();
					loader('hide')
				})
		} else {
			validarGrupoSER104P();
		}
	}, {
		msj: '00',
		overlay_show: true
	})
}

function _cargarContratos() {
	postData({ datosh: datosEnvio() + localStorage['Usuario'] + "|" }, get_url("app/SALUD/SER872.DLL"))
		.then(data => {
			$_SER104P.CONTRATOS = data.CONTRATOS;
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
			$_SER104P.GRPSER = data.CODIGOS;
			$_SER104P.GRPSER.pop();
			validarContratoSER104P();
		}).catch(err => {
			loader('hide');
			_toggleNav();
		})
}

function _ventanaContratosSER104P(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA DE CONTROL CONTRATOS",
			columnas: ["CUENTA", "NIT", 'DESCRIP', 'ESTADO'],
			data: $_SER104P.CONTRATOS,
			callback_esc: function () {
				$("#contrato_SER104P").focus();
			},
			callback: function (data) {
				document.getElementById('contrato_SER104P').value = data.CUENTA;
				_enterInput('#contrato_SER104P');
			}
		});
	}
}

function _ventanaGrupoSER104P(e) {
	console.debug(e, 'evento F8')
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "GRUPOS DE SERVICIO",
			columnas: ["COD", "DESCRIP"],
			data: $_SER104P.GRPSER,
			callback_esc: function () {
				$('#grupo_SER104P').focus();
			},
			callback: function (data) {
				console.debug(data);
				$('#grupo_SER104P').val(data.COD.trim())
				$('#descripGrupo_SER104P').val(data.DESCRIP.trim())
				_enterInput('#grupo_SER104P');
			}
		});
	}
}

function _montarImpresion_SER104P(data) {
	data.LISTADO.pop();
	data.ENCABEZADO = [];

	let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
	let nit = $_USUA_GLOBAL[0].NIT.toString();
	let fecha = moment().format('MMM DD/YY');

	data.ENCABEZADO.push(nombreEmpresa);
	data.ENCABEZADO.push(nit);
	data.ENCABEZADO.push(fecha);

	for (i in data.LISTADO) {
		data.LISTADO[i]['CODIGO_L'] = data.LISTADO[i]['COD_TAB_L'] + data.LISTADO[i]['GRSER_TAB_L'] + data.LISTADO[i]['CDSER_TAB_L']
		data.LISTADO[i]['DESCRIP_TAB_L'] = data.LISTADO[i]['DESCRIP_TAB_L'].replace(/\�/g, "Ñ")
		data.LISTADO[i]['TIPO_L'] = data.LISTADO[i]['TIPO_L'].replace(/\�/g, "Ñ")
		data.LISTADO[i]['FORMA_LIQ_L'] = data.LISTADO[i]['FORMA_LIQ_L'].replace(/\�/g, "Ñ")
	}

	console.log(data.LISTADO, 'DATA')

	if (data.LISTADO.length < 1) {
		CON851('08', '08', null, 'error', 'error');
		validarGrupoSER104P();
	} else {
		var columnas = [
			{
				title: "CODIGO",
				value: "CODIGO_L",
				filterButton: true
			},
			{
				title: "SERVICIO",
				value: "DESCRIP_TAB_L"
			},
			{
				title: "PORC",
				value: "PORC_CL_GRSER_L"
			},
			{
				title: "TIPO",
				value: "TIPO_L",
				filterButton: true
			},
			{
				title: "MONTO",
				value: "MONTO_TAB_L",
			},
			{
				title: "F LIQUIDAR",
				value: "FORMA_LIQ_L",
				filterButton: true,
				format: 'string'
			},
			{
				title: "COD RIPS",
				value: "COD_RIPS_TAB_L"
			},
		]

		var header_format = [
			{ text: `${nombreEmpresa}`, bold: true, size: 16 },
			`LISTADO DE TARIFAS POR CONTRATOS `,
			`NIT: ${nit}`,
			`Fecha de reporte: ${fecha}`
		]

		_impresion2({
			tipo: 'excel',
			// sheetName: 'Listado validación',
			header: header_format,
			logo: `${nit}.bmp`,
			// ruta_logo: 'C:\\LOGOS\\', //
			tabla: {
				columnas,
				data: data.LISTADO,
			},
			archivo: 'LISTADO-TARIFAS-CONTRATO',
			scale: 75,
			orientation: 'landscape'
		})
			.then(() => {
				console.log('Proceso terminado')
				_inputControl('reset');
		        validarContratoSER104P();
				loader('hide')
			})
			.catch(() => {
				console.log('Proceso error')
			})
	}
}