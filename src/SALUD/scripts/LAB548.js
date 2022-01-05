// INFORME RESULTADOS POR CUPS (LABORATORIOS)
// DAVID.M - CREACION - 03/07/2020 - OPCION 9-5-4-2-1-2-G SALUD
var $_LAB548 = [];
var indice = 1;

$(document).ready(() => {
	loader('show')
	_inputControl("reset");
	_inputControl("disabled");
	localStorage.Modulo == "SAL" ? nombreOpcion('9-5-4-2-1-2-G - INFORME RESULTADOS LAB X CUP') : nombreOpcion('5, 1 - Informe laboratorios por CUP')
	_cargarCups();

	_toggleF8([
		{ input: 'grupo1', app: 'LAB548', funct: _ventanaGruposLAB548 },
		{ input: 'articulo1', app: 'LAB548', funct: _ventanaCupsLAB548 },
		{ input: 'grupo2', app: 'LAB548', funct: _ventanaGruposLAB548 },
		{ input: 'articulo2', app: 'LAB548', funct: _ventanaCupsLAB548 },
		{ input: 'grupo3', app: 'LAB548', funct: _ventanaGruposLAB548 },
		{ input: 'articulo3', app: 'LAB548', funct: _ventanaCupsLAB548 },
		{ input: 'grupo4', app: 'LAB548', funct: _ventanaGruposLAB548 },
		{ input: 'articulo4', app: 'LAB548', funct: _ventanaCupsLAB548 },
		{ input: 'sucursal', app: 'LAB548', funct: _ventanaSucursalesLAB548 }
	]);
})

function datoInicialLAB548() {
	document.querySelector('#diaInicial_548').value = "01";
	document.querySelector('#mesInicial_548').value = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
	document.querySelector('#añoInicial_548').value = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

	document.querySelector('#diaFinal_548').value = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
	document.querySelector('#mesFinal_548').value = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
	document.querySelector('#añoFinal_548').value = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

	validarFechaInicialLAB548('2');
}

function validarFechaInicialLAB548(orden) {
	setTimeout(function () {
		validarInputs(
			{
				form: '#fechaInicial_548',
				orden: orden
			},
			() => {
				_toggleNav()
			},
			() => {
				document.querySelector('#diaInicial_548').value = cerosIzq(document.querySelector('#diaInicial_548').value, 2);
				document.querySelector('#mesInicial_548').value = cerosIzq(document.querySelector('#mesInicial_548').value, 2);
				$_LAB548.fechaInicial = parseInt(document.querySelector('#añoInicial_548').value + document.querySelector('#mesInicial_548').value + document.querySelector('#diaInicial_548').value);
				$_LAB548.diaInicial = parseInt(document.querySelector('#diaInicial_548').value);
				$_LAB548.mesInicial = parseInt(document.querySelector('#mesInicial_548').value);
				$_LAB548.añoInicial = parseInt(document.querySelector('#añoInicial_548').value);
				if ($_LAB548.diaInicial < 1 || $_LAB548.diaInicial > 31) {
					validarFechaInicialLAB548('3');
				} else if ($_LAB548.mesInicial < 1 || $_LAB548.mesInicial > 12) {
					validarFechaInicialLAB548('2');
				} else {
					postData({ datosh: datosEnvio() + $_LAB548.fechaInicial }, get_url('app/SALUD/LAB548-1.DLL'))
						.then(data => {
							console.log(data, 'data')
							if (data == "01") {
								CON851('08', '08', null, 'error', 'error');
								validarFechaInicialLAB548('2');
								console.log('es 01')
							} else if (data == "00") {
								console.log('es 00')
								validarFechaFinalLAB548('2')
							}
						})
						.catch(err => {
							console.log(err)
						})
				}
			}
		);
	}, 100);
}

function validarFechaFinalLAB548(orden) {
	setTimeout(function () {
		validarInputs(
			{
				form: '#fechaFinal_548',
				orden: orden
			},
			() => {
				validarFechaInicialLAB548('2')
			},
			() => {
				document.querySelector('#diaFinal_548').value = cerosIzq(document.querySelector('#diaFinal_548').value, 2);
				document.querySelector('#mesFinal_548').value = cerosIzq(document.querySelector('#mesFinal_548').value, 2);
				$_LAB548.fechaFinal = parseInt(document.querySelector('#añoFinal_548').value + document.querySelector('#mesFinal_548').value + document.querySelector('#diaFinal_548').value);
				$_LAB548.diaFinal = parseInt(document.querySelector('#diaFinal_548').value);
				$_LAB548.mesFinal = parseInt(document.querySelector('#mesFinal_548').value);
				$_LAB548.añoFinal = parseInt(document.querySelector('#añoFinal_548').value);
				if ($_LAB548.diaFinal < 1 || $_LAB548.diaFinal > 31) {
					CON851('37', '37', null, 'error', 'error');
					validarFechaFinalLAB548('3');
				} else if ($_LAB548.mesFinal < 1 || $_LAB548.mesFinal > 12) {
					CON851('37', '37', null, 'error', 'error');
					validarFechaFinalLAB548('2');
				} else if ($_LAB548.fechaFinal < $_LAB548.fechaInicial) {
					CON851('03', 'Fecha de vencimiento debe ser mayor', null, 'error', 'error');
					validarFechaFinalLAB548('2');
				} else {
					validarGrupoLAB548();
				}
			}
		);
	}, 100);
}

function validarGrupoLAB548() {
	if (indice > 4) {
		validarSucursalLAB548();
	} else {
		document.querySelector(`#grupo${indice}_LAB548`).value == "" ? document.querySelector(`#grupo${indice}_LAB548`).value = '90' : false;
		validarInputs(
			{
				form: `#validarGrupo${indice}_548`,
				orden: '1'
			},
			() => {
				if (indice > 1) {
					$_LAB548[`grupo${indice}`] = '';
					document.querySelector(`#grupo${indice}_LAB548`).value = '';
					document.querySelector(`#descripGrupo${indice}_LAB548`).value = '';
					indice = (indice - 1);
					document.querySelector(`#descripArticulo${indice}_LAB548`).value = '';
					validarCupLAB548();
				} else {
					validarFechaFinalLAB548('2');
				}
			},
			() => {
				$_LAB548[`grupo${indice}`] = document.getElementById(`grupo${indice}_LAB548`).value.trim();
				if ($_LAB548[`grupo${indice}`].trim() == "" && indice > 1) {
					validarSucursalLAB548();
				} else {
					const res = $_LAB548.GRPSER.find(e => e.COD.trim() == $_LAB548[`grupo${indice}`]);
					if (res == undefined) {
						CON851('01', '01', null, 'error', 'error');
						validarGrupoLAB548();
					} else {
						document.querySelector(`#descripGrupo${indice}_LAB548`).value = res.DESCRIP;
						validarCupLAB548();
					}
				}
			}
		);
	}
}

function validarCupLAB548() {
	validarInputs(
		{
			form: `#validarArticulo${indice}_548`,
			orden: '1'
		},
		() => {
			$_LAB548[`articulo${indice}`] = '';
			document.querySelector(`#descripGrupo${indice}_LAB548`).value = '';
			document.querySelector(`#articulo${indice}_LAB548`).value = '';
			document.querySelector(`#descripArticulo${indice}_LAB548`).value = '';
			validarGrupoLAB548();
		},
		() => {
			$_LAB548[`articulo${indice}`] = document.getElementById(`articulo${indice}_LAB548`).value.trim();
			if ($_LAB548[`articulo${indice}`] == "") {
				validarCupLAB548();
			} else {
				const res2 = $_LAB548.CUPS.find(e => e.LLAVE.trim() == $_LAB548[`grupo${indice}`] + $_LAB548[`articulo${indice}`].trim());
				if (res2 == undefined) {
					CON851('01', '01', null, 'error', 'error');
					validarCupLAB548();
				} else {
					document.querySelector(`#descripArticulo${indice}_LAB548`).value = res2.DESCRIP;
					indice = (indice + 1);
					validarGrupoLAB548();
				}
			}
		}
	);
}

function validarSucursalLAB548() {
	document.querySelector('#sucursal_LAB548').value == "" ? document.querySelector('#sucursal_LAB548').value = '**' : false;
	validarInputs(
		{
			form: '#validarSucursal_548',
			orden: '1'
		},
		() => {
			indice = (indice - 1);
			validarGrupoLAB548();
		},
		() => {
			$_LAB548['sucursal'] = document.getElementById("sucursal_LAB548").value.trim();
			if ($_LAB548.sucursal == "**") {
				_envioImpresion();
			} else {
				const res = $_LAB548.SUCURSALES.find(e => e.CODIGO.trim() == $_LAB548.sucursal);
				if (res == undefined) {
					CON851('01', '01', null, 'error', 'error');
					validarSucursalLAB548();
				} else {
					_envioImpresion();
				}
			}
		}
	);
}

function _envioImpresion() {
	CON851P('00', validarSucursalLAB548, () => {
		$_LAB548.grupo2 == undefined ? $_LAB548.grupo2 = "  " : false;
		$_LAB548.articulo2 == undefined ? $_LAB548.articulo2 = "          " : false;
		$_LAB548.grupo3 == undefined ? $_LAB548.grupo3 = "  " : false;
		$_LAB548.articulo3 == undefined ? $_LAB548.articulo3 = "          " : false;
		$_LAB548.grupo4 == undefined ? $_LAB548.grupo4 = "  " : false;
		$_LAB548.articulo4 == undefined ? $_LAB548.articulo4 = "          " : false;
		loader('show')
		var datos_envio = datosEnvio()
			+ $_LAB548.fechaInicial.toString()
			+ '|' + $_LAB548.fechaFinal.toString()
			+ '|' + $_LAB548.grupo1 + $_LAB548.articulo1
			+ '|' + $_LAB548.grupo2 + $_LAB548.articulo2
			+ '|' + $_LAB548.grupo3 + $_LAB548.articulo3
			+ '|' + $_LAB548.grupo4 + $_LAB548.articulo4
			+ '|' + $_LAB548.sucursal + '|';

		console.log(datos_envio, "datos_envio");

		postData({ datosh: datos_envio }, get_url('app/SALUD/LAB548.DLL'))
			.then(data => {
				loader('hide');
				$_LAB548.DATA = data.LISTADO;
				for (i in $_LAB548.DATA) {
					$_LAB548.DATA[i]['1ER_APELLIDO_LN'].replace(/\�/g, "Ñ")
					$_LAB548.DATA[i]['1ER_NOMBRE_LN'].replace(/\�/g, "Ñ")
				}
				console.log($_LAB548.DATA, 'data')
				_montarImpresion_LAB548(data);
			})
			.catch(err => {
				console.log(err)
				loader('hide');
				validarSucursalLAB548();
			})
	})
}

function _cargarCups() {
	postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER802C.DLL"))
		.then(data => {
			$_LAB548.CUPS = data.CODIGOS;
			_cargarSucursales();
		}).catch(err => {
			console.log(err, 'err')
			loader('hide');
			_toggleNav();
		})
}

function _cargarSucursales() {
	postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON823.DLL"))
		.then(data => {
			$_LAB548.SUCURSALES = data.SUCURSAL;
			$_LAB548.SUCURSALES.pop();
			_cargarGrpSer();
		}).catch(err => {
			console.log(err, 'err')
			loader('hide');
			_toggleNav();
		})
}

function _cargarGrpSer() {
	postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER801.DLL"))
		.then(data => {
			loader('hide');
			$_LAB548.GRPSER = data.CODIGOS;
			$_LAB548.GRPSER.pop();
			datoInicialLAB548();
		}).catch(err => {
			console.log(err, 'err')
			loader('hide');
			_toggleNav();
		})
}

function _ventanaCupsLAB548(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		$_LAB548.CUPS_FILTRO = $_LAB548.CUPS.filter(e => e.LLAVE.substring(0, 2) == $_LAB548[`grupo${indice}`]);
		for (i in $_LAB548.CUPS_FILTRO) {
			$_LAB548.CUPS_FILTRO[i]['GRUPO'] = $_LAB548.CUPS_FILTRO[i].LLAVE.substring(0, 2);
			$_LAB548.CUPS_FILTRO[i]['CODIGO'] = $_LAB548.CUPS_FILTRO[i].LLAVE.substring(2, 12);
			$_LAB548.CUPS_FILTRO[i]['DESCRIPCION'] = $_LAB548.CUPS_FILTRO[i].DESCRIP;
		}
		_ventanaDatos({
			titulo: "VENTANA DE CODIGOS CUPS",
			columnas: ["GRUPO", "CODIGO", "DESCRIPCION"],
			data: $_LAB548.CUPS_FILTRO,
			ancho: 1000,
			callback_esc: function () {
				$(`#articulo${indice}_LAB548`).focus();
			},
			callback: function (data) {
				document.getElementById(`articulo${indice}_LAB548`).value = data.CODIGO;
				_enterInput(`#articulo${indice}_LAB548`);
			}
		});
	}
}

function _ventanaGruposLAB548(e) {
	console.debug(e, 'evento F8')
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "GRUPOS DE SERVICIO",
			columnas: ["COD", "DESCRIP"],
			data: $_LAB548.GRPSER,
			callback_esc: function () {
				$(`#grupo${indice}_LAB548`).focus();
			},
			callback: function (data) {
				console.debug(data);
				$(`#grupo${indice}_LAB548`).val(data.COD.trim())
				_enterInput(`#grupo${indice}_LAB548`);
			}
		});
	}
}

function _ventanaSucursalesLAB548(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA DE SUCURSALES",
			columnas: ["CODIGO", "DESCRIPCION", "ALMACEN"],
			data: $_LAB548.SUCURSALES,
			callback_esc: function () {
				$("#sucursal_LAB548").focus();
			},
			callback: function (data) {
				document.getElementById('sucursal_LAB548').value = data.CODIGO;
				_enterInput('#sucursal_LAB548');
			}
		});
	}
}

function _montarImpresion_LAB548(data) {
	data.LISTADO.pop();
	data.ENCABEZADO = [];

	let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
	let nit = $_USUA_GLOBAL[0].NIT.toString();
	let fecha = moment().format('MMM DD/YY');

	data.ENCABEZADO.push(nombreEmpresa);
	data.ENCABEZADO.push(nit);
	data.ENCABEZADO.push(fecha);

	for (i in data.LISTADO) {
		data.LISTADO[i]['1ER_APELLIDO_LN'] = data.LISTADO[i]['1ER_APELLIDO_LN'].replace(/\�/g, "Ñ")
		data.LISTADO[i]['2DO_APELLIDO_LN'] = data.LISTADO[i]['2DO_APELLIDO_LN'].replace(/\�/g, "Ñ")
		data.LISTADO[i]['1ER_NOMBRE_LN'] = data.LISTADO[i]['1ER_NOMBRE_LN'].replace(/\�/g, "Ñ")
		data.LISTADO[i]['2DO_NOMBRE_LN'] = data.LISTADO[i]['2DO_NOMBRE_LN'].replace(/\�/g, "Ñ")
		for (y in data.LISTADO[i].RESULTADOS_LN) {
			data.LISTADO[i][`TITULO${y}_LN`] = data.LISTADO[i].RESULTADOS_LN[y].TITULO_LN;
			data.LISTADO[i][`RESULTADO${y}_LN`] = data.LISTADO[i].RESULTADOS_LN[y].RESULTADO_LN;
		}

		if (data.LISTADO[i]['REGISTRO_ESCRITO_LN'].trim() == '' || data.LISTADO[i]['REGISTRO_ESCRITO_LN'] == 'N') {
			data.LISTADO[i]['REGISTRO_ESCRITO_LN'] = 'No'
		} else if (data.LISTADO[i]['REGISTRO_ESCRITO_LN'].trim() == 'S') {
			data.LISTADO[i]['REGISTRO_ESCRITO_LN'] = 'Si'
		}
	}

	if (data.LISTADO.length < 1) {
		CON851('08', '08', null, 'error', 'error');
		loader('hide');
		validarSucursalLAB548();
	} else {
		if (((($_LAB548.grupo1 + $_LAB548.articulo1 == '881210') || ($_LAB548.grupo1 + $_LAB548.articulo1 == '88121001') || ($_LAB548.grupo1 + $_LAB548.articulo1 == '88121002') || ($_LAB548.grupo1 + $_LAB548.articulo1 == '894102')) && parseInt($_USUA_GLOBAL[0].NIT) != 822006883)
			&& $_LAB548.articulo2.trim() == '' && $_LAB548.articulo3.trim() == '' && $_LAB548.articulo4.trim() == '') {
			var columnas = [
				{
					title: "FECHA",
					value: "FECHA_LN",
					format: 'fecha',
					filterButton: true
				},
				{
					title: "SUC",
					value: "SUC_LN",
					format: 'string',
					filterButton: true
				},
				{
					title: "CL",
					value: "CL_LN",
					filterButton: true
				},
				{
					title: "COMPROB",
					value: "COMPROB_LN"
				},
				{
					title: "FACTURA",
					value: "FACTURA_LN"
				},
				{
					title: "CUPS",
					value: "CUP_LN",
					filterButton: true
				},
				{
					title: "DESCRIPCIÓN CUPS",
					value: "DESCRIP_CUP_LN",
				},
				{
					title: "ENTIDAD",
					value: "ENTIDAD_LN"
				},
				{
					title: "EDAD",
					value: "EDAD_LN"
				},
				{
					title: "SEXO",
					value: "SEXO_LN"
				},
				{
					title: "TIP DOC",
					value: "TIP_DOC_LN"
				},
				{
					title: "ID PACIENTE",
					value: "ID_PACIENTE_LN"
				},
				{
					title: "1ER APELLIDO",
					value: "1ER_APELLIDO_LN"
				},
				{
					title: "2DO APELLIDO",
					value: "2DO_APELLIDO_LN"
				},
				{
					title: "1ER NOMBRE",
					value: "1ER_NOMBRE_LN"
				},
				{
					title: "2DO NOMBRE",
					value: "2DO_NOMBRE_LN"
				},
				{
					title: "FECHA NAC",
					value: "FECHA_NAC_LN",
					format: 'fecha'
				},
				{
					title: "FINALID",
					value: "FINALID_LN"
				},
				{
					title: "EMBARAZO",
					value: "EMBARAZO_LN"
				},
				{
					title: "DILIGENCIADO",
					value: "REGISTRO_ESCRITO_LN",
					filterButton: true
				}
			]
		} else {
			var columnas = [
				{
					title: "FECHA",
					value: "FECHA_LN",
					format: 'fecha',
					filterButton: true
				},
				{
					title: "SUC",
					value: "SUC_LN",
					format: 'string',
					filterButton: true
				},
				{
					title: "CL",
					value: "CL_LN",
					filterButton: true
				},
				{
					title: "COMPROB",
					value: "COMPROB_LN"
				},
				{
					title: "FACTURA",
					value: "FACTURA_LN"
				},
				{
					title: "CUPS",
					value: "CUP_LN",
					filterButton: true
				},
				{
					title: "ENTIDAD",
					value: "ENTIDAD_LN"
				},
				{
					title: "EDAD",
					value: "EDAD_LN"
				},
				{
					title: "SEXO",
					value: "SEXO_LN"
				},
				{
					title: "TIP DOC",
					value: "TIP_DOC_LN"
				},
				{
					title: "ID PACIENTE",
					value: "ID_PACIENTE_LN"
				},
				{
					title: "1ER APELLIDO",
					value: "1ER_APELLIDO_LN"
				},
				{
					title: "2DO APELLIDO",
					value: "2DO_APELLIDO_LN"
				},
				{
					title: "1ER NOMBRE",
					value: "1ER_NOMBRE_LN"
				},
				{
					title: "2DO NOMBRE",
					value: "2DO_NOMBRE_LN"
				},
				{
					title: "FECHA NAC",
					value: "FECHA_NAC_LN",
					format: 'fecha'
				},
				{
					title: "FINALID",
					value: "FINALID_LN"
				},
				{
					title: "EMBARAZO",
					value: "EMBARAZO_LN"
				},
				{
					title: "DILIGENCIADO",
					value: "REGISTRO_ESCRITO_LN",
					filterButton: true
				},
				{
					title: "TITULO",
					value: "TITULO0_LN"
				},
				{
					title: "RESULTADO",
					value: "RESULTADO0_LN"
				},
				{
					title: "TITULO RENG 2",
					value: "TITULO1_LN"
				},
				{
					title: "RESULTADO RENG 2",
					value: "RESULTADO1_LN"
				},
				{
					title: "TITULO RENG 3",
					value: "TITULO2_LN"
				},
				{
					title: "RESULTADO RENG 3",
					value: "RESULTADO2_LN"
				},
				{
					title: "TITULO RENG 4",
					value: "TITULO3_LN"
				},
				{
					title: "RESULTADO RENG 4",
					value: "RESULTADO3_LN"
				},
				{
					title: "TITULO RENG 5",
					value: "TITULO4_LN"
				},
				{
					title: "RESULTADO RENG 5",
					value: "RESULTADO4_LN"
				},
				{
					title: "TITULO RENG 6",
					value: "TITULO5_LN"
				},
				{
					title: "RESULTADO RENG 6",
					value: "RESULTADO5_LN"
				},
				{
					title: "TITULO RENG 7",
					value: "TITULO6_LN"
				},
				{
					title: "RESULTADO RENG 7",
					value: "RESULTADO6_LN"
				},
				{
					title: "TITULO RENG 8",
					value: "TITULO7_LN"
				},
				{
					title: "RESULTADO RENG 8",
					value: "RESULTADO7_LN"
				},
				{
					title: "TITULO RENG 9",
					value: "TITULO8_LN"
				},
				{
					title: "RESULTADO RENG 9",
					value: "RESULTADO8_LN"
				},
				{
					title: "TITULO RENG 10",
					value: "TITULO9_LN"
				},
				{
					title: "RESULTADO RENG 10",
					value: "RESULTADO9_LN"
				},
				{
					title: "TITULO RENG 11",
					value: "TITULO10_LN"
				},
				{
					title: "RESULTADO RENG 11",
					value: "RESULTADO10_LN"
				},
				{
					title: "TITULO RENG 12",
					value: "TITULO11_LN"
				},
				{
					title: "RESULTADO RENG 12",
					value: "RESULTADO11_LN"
				},
				{
					title: "TITULO RENG 13",
					value: "TITULO12_LN"
				},
				{
					title: "RESULTADO RENG 13",
					value: "RESULTADO12_LN"
				},
				{
					title: "TITULO RENG 14",
					value: "TITULO13_LN"
				},
				{
					title: "RESULTADO RENG 14",
					value: "RESULTADO13_LN"
				},
				{
					title: "TITULO RENG 15",
					value: "TITULO14_LN"
				},
				{
					title: "RESULTADO RENG 15",
					value: "RESULTADO14_LN"
				},
			]
		}

		var header_format = [
			{ text: `${nombreEmpresa}`, bold: true, size: 16 },
			'INFORME DE RESULTADOS POR CUPS',
			`Fecha de reporte: ${fecha}`,
			`NIT: ${nit}`,
		]

		_impresion2({
			tipo: 'excel',
			header: header_format,
			logo: `${nit}.png`,
			// ruta_logo: 'C:\\LOGOS\\', //
			tabla: {
				columnas,
				data: data.LISTADO,
			},
			archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmss')}`
		})
			.then(() => {
				console.log('Proceso terminado')
				_inputControl('reset');
				indice = 1;
				datoInicialLAB548()
				loader('hide')
				toastr.success("Listado generado");
			})
			.catch(() => {
				console.log('Proceso error')
			})
	}
}
