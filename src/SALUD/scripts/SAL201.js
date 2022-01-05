var SAL201 = [];
var $_ArraytransaccionesSAL201, $_ArraynitsSAL201, $_ArrayarticulosSAL201, $arraygruposSAL201
	, $_ArraytarifasSAL201, $_ArraygruposSAL201, $_ArrayclasesSAL201, $_ArrayalmacenesSAL201, $_ArrayPrefijosSAL201, $_ArrayCentroCostosSAL201
	, $_ArrayOrdenesComprasSAL201, $_ArrayDespachosSAL201, $_ArrayOrdenesServiciosSAL201, $_ArrayReservasSAL201, $_ArrayDivisionesSAL201;
$_ADMINW = localStorage.Usuario || false;
var comprobante = "1  ", swinvalid = '';
var SAL201_COBOL = [];
var nit_con_ceros;
var arrayTablaOrden = [];
var SW9 = "1";
var DATOS_RESERVA = [];
var INDICE = 1;
DATOS_RESERVA.TIP_RESERV_INV_W = "0";
var CANTIDAD_W = 0;
var $_datos_saldos = [];
var item_comp_lnk = "01";
var totalCantidad;
var totalValor;
var MOV_INVENT = [];
var sumaTotalCantidadArray = 0;
var sumaTotalValorArray = 0;

var cantidadMask_201 = new IMask($('#cantidad_SAL201')[0], { mask: Number, thousandsSeparator: ',' });
var valorCostoMask_201 = new IMask($('#valorCosto_SAL201')[0], { mask: Number, thousandsSeparator: '.' });
// var LimiteMask_104C = new IMask($('#limite_SER104C')[0], { mask: Number, thousandsSeparator: ',' });
// var MinimoMask_104C = new IMask($('#minimo_SER104C')[0], { mask: Number, min: 0, max: 99999, scale: 3, thousandsSeparator: ',', radix: '.', padFractionalZeros: true });
// var MaximoMask_104C = new IMask($('#maximo_SER104C')[0], { mask: Number, min: 0, max: 99999, scale: 3, thousandsSeparator: ',', radix: '.', padFractionalZeros: true });
//  var MountMask_201 = new IMask($('#fecha_vence_SAL201')[0], { mask: Date, pattern: 'Y-`m-`d' });
var momentFormat = 'YYYY/MM/DD';
let fecha_act = new Date();
fechaVenceSAL201 = IMask($("#fecha_vence_SAL201")[0], {
	mask: Date,
	pattern: 'YYYY/MM/DD',
	lazy: true,
	// max: new Date(fecha_act.getFullYear(), 00, 01, 00, 00),
	// min: new Date(2000, 00, 01, 00, 00),
	format: function (date) { return moment(date).format(momentFormat); },

	parse: function (str) {
		return moment(str, momentFormat);
	},
	blocks: {
		YYYY: {
			mask: IMask.MaskedRange,
			placeholderChar: 'y',
			from: 2000,
			to: 2030,
			maxLength: 4
		},
		MM: {
			mask: IMask.MaskedRange,
			placeholderChar: 'M',
			from: 01,
			to: 12,
			maxLength: 2,
		},
		DD: {
			mask: IMask.MaskedRange,
			placeholderChar: 'd',
			from: 01,
			to: 31,
			maxLength: 2

		},
	}
});

$(document).ready(function () {
	loader('hide');
	nombreOpcion('9, 2, 1 - Entrada datos movimiento');
	_inputControl('reset'); _inputControl('disabled');
	_toggleF8([
		{ input: 'nit', app: 'SAL201', funct: _ventanaNitsSAL201 }
		, { input: 'transaccion', app: 'SAL201', funct: _ventanaTransSAL201 }
		, { input: 'grupo', app: 'SAL201', funct: _ventanaGruposSAL201 }
		, { input: 'codigo', app: 'SAL201', funct: _ventanaArticulosSAL201 }
		, { input: 'clase', app: 'SAL201', funct: _ventanaClasesSAL201 }
		, { input: 'almac', app: 'SAL201', funct: _ventanaAlmacenesSAL201 }
		, { input: 'orden', app: 'SAL201', funct: _ventanaOrdenesSAL201 }
		, { input: 'contr', app: 'SAL201', funct: _ventanaOrdenesServiciosSAL201 }
		, { input: 'nro_reserva', app: 'SAL201', funct: _ventanaReservaSAL201 }
		, { input: 'division', app: 'SAL201', funct: _ventanaDivisionesSAL201 }
		, { input: 'centcosto', app: 'SAL201', funct: _ventanaCentroCostosSAL201 }
		, { input: 'funcionario', app: 'SAL201', funct: _ventanaNitsRecibeSAL201 }
		, { input: 'item', app: 'SAL201', funct: grabarTablaSAL201 }
	]);
	on_SAL201();
});

function on_SAL201() {
	iniciarObjetosFNF8();
	var fecha = moment().format('YYYYMMDD');
	document.getElementById('fecha_año_SAL201').value = moment().format('YYYY');
	document.getElementById('fecha_mes_SAL201').value = moment().format('MM');
	document.getElementById('fecha_dia_SAL201').value = moment().format('DD');
	let URL = get_url("APP/CONTAB/CON003A.DLL");
	postData({ datosh: datosEnvio() + localStorage.getItem('Usuario').trim() + '|' }, URL)
		.then(data => {
			console.log(data, 'data_onSal201'); SAL201.dependencia = data;
			evaluarTipoEmpresa_SAL201();
		})
		.catch(err => {
			console.debug(err);
		})
}
function evaluarTipoEmpresa_SAL201() {
	// Si la empresa es del sector Salud
	if ($_USUA_GLOBAL[0].TIPO_EMPRE == 'H') {
		if ($_USUA_GLOBAL[0].LOTE_FARM != 'N' || $_USUA_GLOBAL[0].LOTE_FARM != 'S') {
			switch ($_USUA_GLOBAL[0].PUC) {
				case '4':
					$('#tip_rest').show(); $('#nro_rest').show();
					$_USUA_GLOBAL[0].TIPO_EMPRE == 'H' ? $_USUA_GLOBAL[0].LOTE_FARM = 'S' : $_USUA_GLOBAL[0].LOTE_FARM = false;
					break;
				case '6':
					$_USUA_GLOBAL[0].TIPO_EMPRE == 'H' ? $_USUA_GLOBAL[0].LOTE_FARM = 'S' : $_USUA_GLOBAL[0].LOTE_FARM = false;
				default:
					$_USUA_GLOBAL[0].TIPO_EMPRE == 'H' ? $_USUA_GLOBAL[0].LOTE_FARM = 'N' : $_USUA_GLOBAL[0].LOTE_FARM = false;
			}
		}
		evaluarPrefijos_SAL201();
	} else { // Cualquier otra empresa
		switch ($_USUA_GLOBAL[0].PUC) {
			case '4':
				$('#tip_rest').show(); $('#nro_rest').show();
				break;
		}
	}
	validarTransSAL201();
}
function evaluarPrefijos_SAL201() {
	if ($_ArrayPrefijosSAL201.TABLA[0].PREFIJO.trim() == '') {
		SAL201.FPREF_NUM = "1";
		SAL201.PREFIJO = $_USUA_GLOBAL[0].PREFIJO;
		SAL201.DESC_PREF = "Principal";
		SAL201.AUT_DIAN = $_USUA_GLOBAL[0].RESOL_DIAN;
	}
}
function iniciarObjetosFNF8(callback) {
	SAL201 = []; $_ArraytarifasSAL201 = []; $_ArraytransaccionesSAL201 = []; $_ArraygruposSAL201 = [];
	$_ArraynitsSAL201 = []; $_ArrayarticulosSAL201 = []; $_ArrayPrefijosSAL201 = [], $_ArrayReservasSAL201 = [];
	obtenerDatosCompletos({ nombreFd: 'TARIFAS' }, (data) => {
		$_ArraytarifasSAL201 = data.TARIFAS;
		obtenerDatosCompletos({ nombreFd: 'TERCEROS' }, (data) => {
			$_ArraynitsSAL201 = data.TERCEROS;
			obtenerDatosCompletos({ nombreFd: 'TRANSACCIONES' }, (data) => {
				$_ArraytransaccionesSAL201 = data.TRANSACCIONES;
				$_ArraytransaccionesSAL201.pop();
				obtenerDatosCompletos({ nombreFd: 'ARTICULOS' }, (data) => {
					$_ArrayarticulosSAL201 = data.ARTICULOS;
					obtenerDatosCompletos({ nombreFd: 'GRUPOS' }, (data) => {
						$_ArraygruposSAL201 = data.GRUPOS;
						obtenerDatosCompletos({ nombreFd: 'USO' }, (data) => {
							$_ArrayclasesSAL201 = data.USO;
							$_ArrayclasesSAL201.pop();
							obtenerDatosCompletos({ nombreFd: 'LOCALIZACION' }, (data) => {
								$_ArrayalmacenesSAL201 = data.LOCALIZACION;
								$_ArrayalmacenesSAL201.pop();
								obtenerDatosCompletos({ nombreFd: 'PREFIJOS' }, (data) => {
									$_ArrayPrefijosSAL201 = data.PREFIJOS[0];
									obtenerDatosCompletos({ nombreFd: 'ORDENES_COMPRA' }, (data) => {
										$_ArrayOrdenesComprasSAL201 = data.ORDENES_COMPRA;
										$_ArrayOrdenesComprasSAL201.pop();
										obtenerDatosCompletos({ nombreFd: 'ORDENES_SERV' }, (data) => {
											$_ArrayOrdenesServiciosSAL201 = data.ORDENES_SERV;
											$_ArrayOrdenesServiciosSAL201.pop();
											obtenerDatosCompletos({ nombreFd: 'MOVIM_PRE' }, (data) => {
												$_ArrayReservasSAL201 = data.MOVIM_PRE;
												$_ArrayReservasSAL201.pop();
												obtenerDatosCompletos({ nombreFd: 'DIVISION' }, (data) => {
													$_ArrayDivisionesSAL201 = data.CODIGOS;
													$_ArrayDivisionesSAL201.pop();
													obtenerDatosCompletos({ nombreFd: 'COSTOS' }, (data) => {
														$_ArrayCentroCostosSAL201 = data.COSTO;
														$_ArrayCentroCostosSAL201.pop();
														validarTransSAL201();
													}, 'ONLY')
												}, 'ONLY')
											}, 'ONLY')
										}, 'ONLY')
									}, 'ONLY')
								}, 'ONLY')
							}, 'ONLY')
						}, 'ONLY')
					}, 'ONLY')
				}, 'ONLY')
			}, 'ONLY')
		}, 'ONLY')
	}, 'ONLY')
}

function _ventanaTransSAL201(e) {
	console.debug(e, 'evento F8')
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		for (i in $_ArraytransaccionesSAL201) {
			$_ArraytransaccionesSAL201[i]['CODIGO'] = $_ArraytransaccionesSAL201[i]['LLAVE_TRANS'];
			$_ArraytransaccionesSAL201[i]['DESCRIPCION'] = $_ArraytransaccionesSAL201[i]['DESCRIP_TRANS'];
		};
		_ventanaDatos({
			titulo: "VENTANA DE TRANSACCIONES",
			columnas: ["CODIGO", "DESCRIPCION"],
			data: $_ArraytransaccionesSAL201,
			callback_esc: () => { $('#transaccion_SAL201').focus() },
			callback: (data) => {
				SAL201.LLAVE_TRANS = data.LLAVE_TRANS.substring(0, 3); SAL201.DESCRIP_TRANS = data.DESCRIP_TRANS;
				document.querySelector('#transaccion_SAL201').value = (SAL201.LLAVE_TRANS + " - " + SAL201.DESCRIP_TRANS);
				_enterInput('#transaccion_SAL201');
				// validarNitsSAL201();
			}
		});
	}
}

function _ventanaDocums(e) {
	var $_ArrayINV821 = [
		{ 'COD': '1', 'DESCRIP': 'FACTURA' },
		{ 'COD': '2', 'DESCRIP': 'REMISION' },
		{ 'COD': '3', 'DESCRIP': 'ORDEN DE COMPRA' },
		{ 'COD': '4', 'DESCRIP': 'OTRO DOCUMENTO' },
		{ 'COD': '5', 'DESCRIP': 'NOTA DESPACHO' }
	]
	POPUP({
		titulo: "TIPO DOCUMENTO",
		indices: [
			{ id: 'COD', label: 'DESCRIP' }
		],
		array: $_ArrayINV821,
		callback_f: validarTransSAL201,
		seleccion: SAL201.OPCION_TIPO_DOCUM
	}, function (data) {
		SAL201.OPCION_TIPO_DOCUM = data.COD
		SAL201.FACT_REM = data.COD
		console.log(SAL201.FACT_REM, 'FACT VENTANA');
		$("#docum_SAL201").val(data.COD.trim() + ' - ' + data.DESCRIP.trim());
		if (SAL201.FACT_REM == '3') {
			validarOrdenSAL201();
		} else {
			document.getElementById("orden_SAL201").value = "";
			SAL201.orden_SAL201 = 0;
			validarNumeroSAL201();
		}
	})
}

function _ventanaOrdenesSAL201(e) {
	console.debug(e, 'evento F8')
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		for (i in $_ArrayOrdenesComprasSAL201) {
			$_ArrayOrdenesComprasSAL201[i]['NUMERO'] = $_ArrayOrdenesComprasSAL201[i]['LLAVE_ORD'];
			$_ArrayOrdenesComprasSAL201[i]['FECHA'] = $_ArrayOrdenesComprasSAL201[i]['FECHA_ORD_FORMAT'];
			$_ArrayOrdenesComprasSAL201[i]['VALOR'] = $_ArrayOrdenesComprasSAL201[i].DATOS_PRESUP_ORD[0].VLR_PRE_ORD;
			$_ArrayOrdenesComprasSAL201[i]['DESCRIPCION'] = $_ArrayOrdenesComprasSAL201[i].OBJETO_ORD[0].OBJETOA_ORD;
		};
		_ventanaDatos({
			titulo: "VENTANA DE ORDENES DE COMPRA",
			columnas: ["NUMERO", "FECHA", "VALOR", "DESCRIPCION"],
			data: $_ArrayOrdenesComprasSAL201,
			callback_esc: () => { $('#orden_SAL201').focus(); },
			callback: (data) => {
				SAL201.NUMERO_ORDEN = data.NUMERO;
				document.querySelector('#orden_SAL201').value = (SAL201.NUMERO_ORDEN);
				_enterInput('#orden_SAL201');
			}
		});
	}
}

function _ventanaNitsSAL201(e) {
	console.debug(e, 'evento F8')
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		for (i in $_ArraynitsSAL201) {
			$_ArraynitsSAL201[i]['IDENTIFICACION'] = $_ArraynitsSAL201[i]['COD'];
		};
		_ventanaDatos_lite_v2({
			titulo: 'VENTANA DE TERCEROS',
			data: $_ArraynitsSAL201,
			indice: ["NOMBRE", 'IDENTIFICACION', "TELEF", "CIUDAD", "ACT"],
			mascara: [{
				"NOMBRE": 'NOMBRE',
				"DIRREC": "DIRECCION",
				"TELEF": "TELEFONO"
			}],
			minLength: 3,
			callback_esc: function () {
				$("#nit_SAL201").focus();
			}, callback: function (data) {
				SAL201.COD_NIT = data.COD.trim(); SAL201.NOMBRE = data.NOMBRE_NIT;
				document.getElementById("nit_SAL201").value = SAL201.COD_NIT;
				_enterInput('#nit_SAL201');
			}
		});
	}
}

function _ventanaNitsRecibeSAL201(e) {
	console.debug(e, 'evento F8')
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		for (i in $_ArraynitsSAL201) {
			$_ArraynitsSAL201[i]['IDENTIFICACION'] = $_ArraynitsSAL201[i]['COD'];
		};
		_ventanaDatos_lite_v2({
			titulo: 'VENTANA DE TERCEROS',
			data: $_ArraynitsSAL201,
			indice: ["NOMBRE", 'IDENTIFICACION', "TELEF", "CIUDAD", "ACT"],
			mascara: [{
				"NOMBRE": 'NOMBRE',
				"DIRREC": "DIRECCION",
				"TELEF": "TELEFONO"
			}],
			minLength: 3,
			callback_esc: function () {
				$("#nit_SAL201").focus();
			}, callback: function (data) {
				SAL201.COD_NIT = data.COD.trim(); SAL201.NOMBRE = data.NOMBRE_NIT;
				document.getElementById("funcionario_SAL201").value = SAL201.COD_NIT;
				_enterInput('#funcionario_SAL201');
			}
		});
	}
}

function _ventanaReservaSAL201(e) {
	console.debug(e, 'evento F8')
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaF8Reserva_PRE802($_ArrayReservasSAL201, "04", SAL201.COD_TRANS.substring(0, 2), SAL201.COD_NIT, "#nro_reserva_SAL201", "#nro_reserva_SAL201", $_ArraynitsSAL201);
	}
}
function _ventanaTipoContratoSAL201(e) {
	var $_ArrayTipoContratoPOPUP = [
		{ 'COD': '1', 'DESCRIP': 'TODAS LAS O.P.S.  ' },
		{ 'COD': '2', 'DESCRIP': 'TODAS LAS CONSULTORIAS' },
		{ 'COD': '3', 'DESCRIP': 'TODOS LOS MANTENIMIENTO' },
		{ 'COD': '4', 'DESCRIP': 'TODAS LAS OBRAS PUBLICAS' },
		{ 'COD': '5', 'DESCRIP': 'TODAS LOS SUMINISTROS' },
		{ 'COD': '6', 'DESCRIP': 'TODAS LAS CONSECIONES' },
		{ 'COD': '7', 'DESCRIP': 'TODAS LOS COMODATOS' },
		{ 'COD': '8', 'DESCRIP': 'TODAS LOS ARRENDAMIENTOS' },
		{ 'COD': '9', 'DESCRIP': 'TODAS LOS SEGUROS       ' },
		{ 'COD': 'A', 'DESCRIP': 'TODAS LOS OTROS CONTRATOS' },
		{ 'COD': 'B', 'DESCRIP': 'TODAS LOS TRANSPORTES    ' },
		{ 'COD': 'C', 'DESCRIP': 'TODAS LOS PUBLICIDAD     ' },
		{ 'COD': 'D', 'DESCRIP': 'TODAS PREST. SERV. SALUD ' },
		{ 'COD': 'E', 'DESCRIP': 'TODAS PRESTAMO O MUTUO   ' },
		{ 'COD': 'F', 'DESCRIP': 'TODAS CONT. INTERADMINIST' },
		{ 'COD': 'G', 'DESCRIP': 'TODAS ACTIV. CIENT Y TECN' },
		{ 'COD': 'I', 'DESCRIP': 'TODAS INTERVENTORIAS     ' }
	]
	POPUP({
		titulo: "TIPO DE CONTRATO",
		indices: [
			{ id: 'COD', label: 'DESCRIP' }
		],
		array: $_ArrayTipoContratoPOPUP,
		callback_f: validarNitsSAL201,
		seleccion: SAL201.OPCION_TIPO_ORDEN_SERV
	}, function (data) {
		SAL201.OPCION_TIPO_ORDEN_SERV = data.COD
		SAL201.DESCRIP_ORDEN_SERV = data.DESCRIP
		console.log(data);
		// $("#tipo_SAL201").val(data.COD.trim())
		validarContratoSAL201();
	})
}


function _ventanaOrdenesServiciosSAL201(e) {
	console.debug(e, 'evento F8')
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		// var varString = "";
		// for(i in $_ArrayOrdenesServiciosSAL201[0].RENG_OBJ_S){
		// 	varString = varString.concat($_ArrayOrdenesServiciosSAL201[0].RENG_OBJ_S[i]);
		// 	console.log(varString.trim(), "varString");
		// }
		const result = $_ArrayOrdenesServiciosSAL201.find(element => element.NIT_ORD_S.trim() == document.getElementById('nit_SAL201').value.trim());
		if (result != undefined) {
			switch (result.LLAVE_ORD_S.substring(1, 2)) {
				case "1":
					result.TIPO_VEN = "O.P.S.  ";
					break;
				case "2":
					result.TIPO_VEN = "CONSULTORIAS";
					break;
				case "3":
					result.TIPO_VEN = "MANTENIMIENTO";
					break;
				case "4":
					result.TIPO_VEN = "OBRAS PUBLICAS";
					break;
				case "5":
					result.TIPO_VEN = "SUMINISTROS";
					break;
				case "6":
					result.TIPO_VEN = "CONCESIONES";
					break;
				case "7":
					result.TIPO_VEN = "COMODATOS";
					break;
				case "8":
					result.TIPO_VEN = "ARRENDAMIENTOS";
					break;
				case "9":
					result.TIPO_VEN = "SEGUROS       ";
					break;
				case "A":
					result.TIPO_VEN = "OTROS CONTRATOS";
					break;
				case "B":
					result.TIPO_VEN = "TRANSPORTES    ";
					break;
				case "C":
					result.TIPO_VEN = "PUBLICIDAD     ";
					break;
				case "D":
					result.TIPO_VEN = "SERV. SALUD    ";
					break;
				case "E":
					result.TIPO_VEN = "PRESTAMO       ";
					break;
				case "F":
					result.TIPO_VEN = "INTERADMINISTR.";
					break;
				case "G":
					result.TIPO_VEN = "CIENTIF. Y TECN";
					break;
				case "I":
					result.TIPO_VEN = "INTERVENTORIA  ";
					break;
				default:
					result.TIPO_VEN = "               ";
					break;
			}
			for (i in $_ArrayOrdenesServiciosSAL201) {
				$_ArrayOrdenesServiciosSAL201[i]['NUMERO'] = $_ArrayOrdenesServiciosSAL201[i]['LLAVE_ORD_S'];
				$_ArrayOrdenesServiciosSAL201[i]['NIT'] = $_ArrayOrdenesServiciosSAL201[i]['NIT_ORD_S'];
				$_ArrayOrdenesServiciosSAL201[i]['PRECIO'] = $_ArrayOrdenesServiciosSAL201[i]['MONTO_ANT_S'];
				$_ArrayOrdenesServiciosSAL201[i]['TIPO_VEN'] = result.TIPO_VEN;
				$_ArrayOrdenesServiciosSAL201[i]['FECHA'] = $_ArrayOrdenesServiciosSAL201[i]['FECHA_ORD_S_FORMAT'];
				$_ArrayOrdenesServiciosSAL201[i]['DETALLE'] = $_ArrayOrdenesServiciosSAL201[i]['RENG_OBJ_S'][0];
			};
			if (SAL201.OPCION_TIPO_ORDEN_SERV != undefined) {
				result.NIT_ORD_S = SAL201.OPCION_TIPO_ORDEN_SERV;
				document.getElementById("nom_tercero_SAL201").value = SAL201.DESCRIP_ORDEN_SERV;
			}
			_ventanaDatos({
				titulo: ("VENTANA DE ORDENES DE SERVICIOS"
					+ "  ---------------------  " + " NIT: " + result.NIT_ORD_S
					+ " -- " + document.getElementById("nom_tercero_SAL201").value.trim()),
				columnas: ["NUMERO", "TIPO_VEN", "FECHA", "PRECIO", "DETALLE"],
				data: $_ArrayOrdenesServiciosSAL201.filter(element => element.NIT_ORD_S.trim() == document.getElementById('nit_SAL201').value.trim()),
				ancho: "1200",
				callback_esc: () => { $("#contr_SAL201").focus(); },
				callback: (data) => {
					document.querySelector('#contr_SAL201').value = (data.LLAVE_ORD_S.trim());
					_enterInput('#contr_SAL201');
				}
			});
		}
		else {
			CON851('1T', 'La entidad no tiene contratos registrados', false, 'error', 'error');
			CON851('1T', '1T', $("#contr_SAL201").focus(), 'error', 'error');
		}
	}
}

function _ventanaTiposSAL201() {
	console.log("llega a ventanaTipo")
	var $_ArrayTipo = [
		{ 'COD': '0', 'DESCRIP': 'MERCANCIAS PARA VENTA' },
		{ 'COD': '1', 'DESCRIP': 'BIENES DE CONSUMO' },
		{ 'COD': '2', 'DESCRIP': 'BIENES DEVOLUTIVOS' },
		{ 'COD': '3', 'DESCRIP': 'BIENES INMUEBLES' },
		{ 'COD': '4', 'DESCRIP': 'BIENES DE MENOR CUANTIA' }
	]
	POPUP({
		titulo: "TIPO GRUPOS",
		indices: [
			{ id: 'COD', label: 'DESCRIP' }
		],
		array: $_ArrayTipo,
		callback_f: validarItemSAL201,
		seleccion: SAL201.OPCION_TIPO,
		teclaAlterna: true
	}, function (data) {
		SAL201.OPCION_TIPO = data.COD;
		console.log(data);
		document.getElementById("tipo_SAL201").value = SAL201.OPCION_TIPO;
		// document.getElementById("item_SAL201").value = cerosIzq(INDICE, 3);

		validarGruposSAL201();
	})
}

function _ventanaGruposSAL201(e) {
	console.debug(e, 'evento F8')
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA DE GRUPOS",
			columnas: ["TIPO", "GRUPO", "DESCRIP"],
			data: $_ArraygruposSAL201.filter(element => element.TIPO.trim() == SAL201.OPCION_TIPO.trim()),
			callback_esc: () => { $("#grupo_SAL201").focus(); },
			callback: (data) => {
				document.querySelector('#grupo_SAL201').value = (data.GRUPO.trim() + " - " + data.DESCRIP.trim());
				_enterInput('#grupo_SAL201');
			}
		});
	}
}

function _ventanaArticulosSAL201(e) {
	console.debug(e, 'evento F8')
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		for (i in $_ArrayarticulosSAL201) {
			$_ArrayarticulosSAL201[i]['TIPO'] = $_ArrayarticulosSAL201[i]['LLAVE_ART'].substring(0, 1);
			$_ArrayarticulosSAL201[i]['GRUPO'] = $_ArrayarticulosSAL201[i]['LLAVE_ART'].substring(1, 3);
			$_ArrayarticulosSAL201[i]['CODIGO'] = $_ArrayarticulosSAL201[i]['LLAVE_ART'].substring(3, 16);
		};
		_ventanaDatos({
			titulo: "VENTANA DE ARTICULOS",
			columnas: ["TIPO", "GRUPO", 'CODIGO', "DESCRIP_ART"],
			data: $_ArrayarticulosSAL201.filter(element => element.LLAVE_ART.substring(0, 3) == (SAL201.OPCION_TIPO.concat(SAL201.grupo))),
			callback_esc: () => { $("#codigo_SAL201").focus(); },
			callback: (data) => {
				SAL201.DATA_LLAVE_ART = data.LLAVE_ART.substring(3, 15);
				document.querySelector('#codigo_SAL201').value = (data.LLAVE_ART.substring(3, 16).trim());
				document.querySelector('#descripcion_codigo_SAL201').value = (data.DESCRIP_ART.trim());
				_enterInput('#codigo_SAL201');
			}
		});
	}
}

function _ventanaClasesSAL201(e) {
	console.debug(e, 'evento F8')
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA DE CLASES",
			columnas: ["COD", "DESCRIP"],
			data: $_ArrayclasesSAL201,
			callback_esc: () => { $("#clase_SAL201").focus(); },
			callback: (data) => {
				document.querySelector('#clase_SAL201').value = (data.COD.trim());
				_enterInput('#clase_SAL201');
			}
		});
	}
}

function _ventanaAlmacenesSAL201(e) {
	console.debug(e, 'evento F8')
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA DE ALMACENES",
			columnas: ["CODIGO", "DESCRIPCION", "RESPONSABLE"],
			data: $_ArrayalmacenesSAL201,
			callback_esc: () => { $("#almac_SAL201").focus(); },
			callback: (data) => {
				document.querySelector('#almac_SAL201').value = (data.CODIGO.trim());
				_enterInput('#almac_SAL201');
			}
		});
	}
}

function _ventanaCentroCostosSAL201(e) {
	console.debug(e, 'evento F8')
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		for (i in $_ArrayCentroCostosSAL201) {
			$_ArrayCentroCostosSAL201[i]["DESCRIPCION"] = $_ArrayCentroCostosSAL201[i]["DESCRIP"];
		}
		_ventanaDatos({
			titulo: "VENTANA DE CENTROS DE COSTOS",
			columnas: ["COD", "NOMBRE", "DESCRIPCION"],
			data: $_ArrayCentroCostosSAL201,
			callback_esc: () => { $("#centcosto_SAL201").focus(); },
			callback: (data) => {
				document.querySelector('#centcosto_SAL201').value = (data.COD.trim());
				_enterInput('#centcosto_SAL201');
			}
		});
	}
}

function _ventanaDivisionesSAL201(e) {
	console.debug(e, 'evento F8')
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		for (i in $_ArrayDivisionesSAL201) {
			$_ArrayDivisionesSAL201[i]["CUENTA"] = $_ArrayDivisionesSAL201[i]["COD"];
			$_ArrayDivisionesSAL201[i]["DESCRIPCION"] = $_ArrayDivisionesSAL201[i]["DESCRIP"];
		}
		_ventanaDatos({
			titulo: "VENTANA DE DIVISION",
			columnas: ["CUENTA", "DESCRIPCION"],
			data: $_ArrayDivisionesSAL201,
			callback_esc: () => { $("#division_SAL201").focus(); },
			callback: (data) => {
				document.querySelector('#division_SAL201').value = (data.COD.trim());
				_enterInput('#division_SAL201');
			}
		});
	}
}

/*  ----------------------------------------  FUNCIONES VALIDAR --------------------------------- */
function validarTransSAL201() {
	validarInputs(
		{
			form: "#transaccion",
			orden: '1'
		}, _toggleNav,
		function () {
			SAL201['llave_trans_inv_w'] = document.getElementById("transaccion_SAL201").value.substring(0, 3).trim().toUpperCase();
			if (SAL201['llave_trans_inv_w'].trim() == "") { validarTransSAL201() }
			else {
				const result = $_ArraytransaccionesSAL201.find(element => element.LLAVE_TRANS.substring(0, 3) == SAL201.llave_trans_inv_w);
				SAL201.result_transacciones = result;
				SAL201.COD_TRANS = SAL201.llave_trans_inv_w.substring(0, 2);
				if (result == undefined) { CON851('01', '01', validarTransSAL201(), 'error', 'error'); }
				else {
					document.getElementById('transaccion_SAL201').value = (result.LLAVE_TRANS.substring(0, 3).trim() + " - " + result.DESCRIP_TRANS.trim());
					// SAL201.FACT_REM = '4';

					obtenerDatoSucPrn_SAL201();
				}
			}
		}
	)
}

// PRIMER LLAMADO SAL201.DLL -- VALIDACIONES DATO-COMP
function obtenerDatoSucPrn_SAL201() {
	try {
		registroTrans = $_ArraytransaccionesSAL201.find(element => element.LLAVE_TRANS.substring(0, 2) == SAL201.llave_trans_inv_w.substring(0, 2));
		let URL = get_url("APP/SALUD/SAL201.DLL");
		let parametros = SAL201.dependencia + '$' + registroTrans.NUM_ANO_TRANS + '$' + SAL201.llave_trans_inv_w;
		const datos_envio = datosEnvio() + '1' + '|' + parametros;
		console.log(datos_envio);
		postData(
			{
				datosh: datos_envio
			}, URL)
			.then(data => {
				console.log(data, 'data sal201')
				const res = data.split('|');
				SAL201_COBOL.LLAVE_TRANS = res[0];
				SAL201_COBOL.COMPROBANTE = res[1];
				SAL201_COBOL.NUMERO = res[2];
				SAL201_COBOL.OBSERVACIONES = res[3].trim();
				SAL201.SUC_PRN = res[4];
				SAL201_COBOL.SECU_INV_W = res[5];
				SW9 = "0";
				var datos_pref = $_ArrayPrefijosSAL201.TABLA[0];
				console.log(datos_pref, 'datos pref')
				// Evalúa Sucursal Impresion para empresas del sector SALUD
				if ($_USUA_GLOBAL[0].TIPO_EMPRE == 'H') {
					switch (SAL201.SUC_PRN) {
						case '01':
							if ($_USUA_GLOBAL[0].PUC == '4' || $_USUA_GLOBAL[0].PUC == '6') {
								datos_pref.ALMACEN = "DR001";
							} else if ($_USUA_GLOBAL[0].NIT == 800162035 && $_USUA_GLOBAL[0].PREFIJO == "08") {
								datos_pref.ALMACEN = "SIN99";
							}/* CLINICA CASANARE MANEJA ALM02 PARA FARMACIA*/
							else if ($_USUA_GLOBAL[0].NIT == 891855847 && $_USUA_GLOBAL[0].FECHALNK == "150430") {
								datos_pref.ALMACEN = "ALM02";
							} else {
								datos_pref.ALMACEN = "ALM01";
							}
							break;
						case '02':
							switch (parseInt($_USUA_GLOBAL[0].NIT)) {
								// NIT 845000038  HTAL DPTAL SAN ANTONIO
								case 845000038:
									datos_pref.ALMACEN = "DR003";
									break;
								case 800162035:
									datos_pref.ALMACEN = "ALM02";
									break;
								case 800037979:
									datos_pref.ALMACEN = "URG01";
									break;
								// HTAL DEPTAL GRANADA								
								case 800037021:
									datos_pref.ALMACEN = "DR047";
									break;
								default:
									datos_pref.ALMACEN = "DR002";
									break;
							}
							break;
						case '03':
							parseInt($_USUA_GLOBAL[0].NIT) == 845000038 ? datos_pref.ALMACEN = "DR002" : datos_pref.ALMACEN = "DR003";
							break;
						case '04':
							parseInt($_USUA_GLOBAL[0].NIT) == 800162035 ? datos_pref.ALMACEN = "ALM00" : datos_pref.ALMACEN = "DR004";
							break;
						case '05':
							// HTAL DEPTAL GRANADA								
							parseInt($_USUA_GLOBAL[0].NIT) == 800037021 ? datos_pref.ALMACEN = "DR034" : datos_pref.ALMACEN = "DR005";
							break;
						case '08':
							datos_pref.ALMACEN = "SIN98";
							break;
						case '09':
							datos_pref.ALMACEN = "SIN99";
							break;
						default:
							if (localStorage.Usuario == "RLSY" && $_USUA_GLOBAL[0].PUC == '4' || $_USUA_GLOBAL[0].PUC == '6') {
								datos_pref.ALMACEN = "DR001";
							} else {
								datos_pref.ALMACEN = "ALM01";
							}
							break;
					}
				}
				document.getElementById('comprobante_SAL201').value = SAL201_COBOL.COMPROBANTE;
				document.getElementById('numero_SAL201').value = "0";
				document.getElementById('observacion_SAL201').value = SAL201_COBOL.OBSERVACIONES;
				res3 = ['10', '1A', '1B', '1C'].find(e => e == SAL201.COD_TRANS.substring(0, 2));
				if (res3 != undefined) {
					// MOVE ANO-VENCE-INV-W   TO POW-TEXT OF ANOV-L
					// MOVE MES-VENCE-INV-W   TO POW-TEXT OF MESV-L
					// MOVE DIA-VENCE-INV-W   TO POW-TEXT OF DIAV-L  
				} else {
					// $('#labelVence').text("Division");
				}

				validarCodTrans_SAL201();
			})
			.catch(err => {
				console.debug(err);
			})
	} catch (ex) {
		console.error("error catch", ex);
	}
}

// VALIDAR-TRANSACCION
function validarCodTrans_SAL201() {
	switch (parseInt($_USUA_GLOBAL[0].NIT)) {
		// SIAGRO LTDA
		case 822006141:
			if (SAL201.SUC_PRN == '00' || SAL201.SUC_PRN == '01') {
				if (SAL201.COD_TRANS == '1A' || SAL201.COD_TRANS == '15' || SAL201.COD_TRANS == '25') {
					swinvalid = '00';
				} else { CON851('14', '14', validarTransSAL201, 'error', 'error'); }
			}
			break;
		// ALEXANDER-SM
		case 17355476:
			SAL201.COD_TRANS == '11' || SAL201.COD_TRANS == '21' ? $_USUA_GLOBAL[0].CLAVE_INV = '55476' : false;
			break;
		// AGROCOM
		case 800237815:
			if (SAL201.COD_TRANS == '1E') {
				var tipo_lnk = SAL201.OPCION_TIPO;
				var pref_lnk = SAL201.SAL201.llave_trans_inv_w.substring(0, 2);
				jAlert({ titulo: 'Notificacion', mensaje: "LLAMADO CER502" }, fin_SAL201);
				SAL201.FACT_REM = '4';
			} break;
	}
	leerDatoTransSAL201();
}

// LEER-DATO-TRANS.
function leerDatoTransSAL201() {
	(SAL201.COD_TRANS == "1N" || SAL201.COD_TRANS == "2N") ? SAL201.sw_niif = "S" : false;

	if ((SAL201.COD_TRANS == "1H" || SAL201.COD_TRANS == "2H") && $_USUA_GLOBAL[0].NIT != 800037021) {
		swinvalid = "14";
		CON851('14', '14', validarTransSAL201, 'error', 'error');
	} else {
		let res = ["19", "29", '20', '2A', '1D', '1O', '2O'].find(element => element == SAL201.COD_TRANS);
		if (res != undefined) {
			SAL201.MOVIM_TRANS = 'N';
			swinvalid = "14";
			CON851('14', '14', validarTransSAL201, 'error', 'error')
		}
	}

	if (SAL201.COD_TRANS == "1N" || SAL201.COD_TRANS == "2N") {
		if (!$_USUA_GLOBAL[0].CTA_EFECT == 'S') {
			// CONTINUE
		} else {
			swinvalid = "14";
			CON851('14', '14', validarTransSAL201, 'error', 'error');
		}
	}

	// if (SAL201.SW_CERE != '00') {
	// 	let res = ['1T', '2T', '1U', '2U', '1S', '2S', '1R', '2R'].find(element => element == SAL201.COD_TRANS);
	// 	if (res != 'undefined') CON851('14', '14', validarTransSAL201, 'error', 'error');
	// }

	registroTrans = $_ArraytransaccionesSAL201.find(element => element.LLAVE_TRANS.substring(0, 2) == SAL201.COD_TRANS);
	if (registroTrans == undefined) {
		swinvalid = "00";
		CON851('01', '01', validarTransSAL201, 'error', 'error')
	};
	if (registroTrans.NUM_ANO_TRANS.trim() == "") {
		$_USUA_GLOBAL[0].PUC == '4' ? registroTrans.NUM_ANO_TRANS = 'S' : registroTrans.NUM_ANO_TRANS = 'N';
	}

	_buscarrestriccion("I21".concat(SAL201.llave_trans_inv_w.substring(0, 3)), _dataCON904_01);

	if (SAL201.llave_trans_inv_w.substring(0, 2) == "1F") {
		// PERFORM CERRAR-ARCHIVOS
		//     INVOKE POW-SELF "CALLFORM" USING "CON851" "C:\PROG\CONTAB\CON851.DLL"
		//     INVOKE POW-SELF "CALLFORM" USING "INV201A" "C:\PROG\INVENT\INV201A.DLL"
		// GO TO SALIR
		jAlert({ titulo: 'Notificacion', mensaje: "Hace llamado a INV201A" }, NULL);
	}

	swinvalid = restriccionTransSucurSAL201();

	_inicializarDocums();

	if (SAL201.FACT_REM == '4' && document.getElementById('docum_SAL201').value.substring(0, 1) == '4') {
		validarNumeroSAL201();
	}
	else { _ventanaDocums(); }
	console.log(SAL201.FACT_REM, 'FACT')
}

function restriccionTransSucurSAL201() {
	if ($_USUA_GLOBAL[0].NIT == 800202522) {
		// CONTINUE
	} else {
		swinvalid = _buscarrestriccion("I21T".concat(item_comp_lnk), _dataCON904_01);
	}
	return swinvalid;
}

// function peticionesTrans_SAL201(parametros,paso_w, funcion) {
// 	let URL = get_url("APP/SALUD/SAL201.DLL");
// 	const datos_envio = datosEnvio() + '|' + paso_w + '|' + parametros
// 	postData(
// 		{ datosh: datos_envio }, URL)
// 		.then(data => { funcion(data) })
// 		.catch(error => { console.debug(error); })
// }

// function _leerNit() {
// 	if (document.getElementById('nit_SAL201').value.trim() == "") {
// 		res = ['10', '1A', "1B", "1C"].find(element => element == SAL201.llave_trans_inv_w.substring(0, 2));
// 		if (res != undefined) {

// 		}
// 	}
// }

function _inicializarDocums() {
	I = 1;
	try {
		switch (SAL201.llave_trans_inv_w.substring(0, 2)) {
			case '14':
				$_USUA_GLOBAL[0].PUC == '4' ? SAL201.FACT_REM = '3' : SAL201.FACT_REM = '1';
				break;
			case '10':
				$_USUA_GLOBAL[0].PUC == '4' ? SAL201.FACT_REM = '3' : SAL201.FACT_REM = '1';
				break;
			case '1A':
				$_USUA_GLOBAL[0].PUC == '4' ? SAL201.FACT_REM = '3' : SAL201.FACT_REM = '1';
				break;
			case '1B':
				$_USUA_GLOBAL[0].PUC == '4' ? SAL201.FACT_REM = '3' : SAL201.FACT_REM = '1';
				break;
			case '1C':
				$_USUA_GLOBAL[0].PUC == '4' ? SAL201.FACT_REM = '3' : SAL201.FACT_REM = '1';
				break;
			case '2B':
				console.log('entra a 2b')
				if ($_USUA_GLOBAL[0].PUC == '4') { SAL201.FACT_REM = '3' } else {
					SAL201.FACT_REM = '4';
					mostrarTipo();
				};
				break;
			case '2C':
				console.log('entra a 2c')
				if ($_USUA_GLOBAL[0].PUC == '4') { SAL201.FACT_REM = '3' } else {
					SAL201.FACT_REM = '4';
					mostrarTipo();
				};
				break;
			case '2E':
				if ($_USUA_GLOBAL[0].PUC == '4') { SAL201.FACT_REM = '3' } else {
					SAL201.FACT_REM = '4';
					mostrarTipo();
				};
				break;
			case '23':
				$_USUA_GLOBAL[0].PUC == '4' ? SAL201.FACT_REM = '5' : false;
				break;
			default:
				if ($_USUA_GLOBAL[0].PUC == '4') { SAL201.FACT_REM = '3' } else {
					SAL201.FACT_REM = '4';
					mostrarTipo();
				};
				break;
		}
	} catch (ex) { console.error("error catch", ex) }
}

// si SAL201.FACT_REM ES 4 entra aca
function mostrarTipo() {
	console.log(SAL201.FACT_REM, 'FACT');
	switch (SAL201.FACT_REM) {
		case '1':
			document.getElementById('docum_SAL201').value = SAL201.FACT_REM.concat(' - ', 'FACTURA');
			console.log('se ejecuta')
			break;
		case '2':
			document.getElementById('docum_SAL201').value = SAL201.FACT_REM.concat(' - ', 'REMISION');
			break;
		case '3':
			document.getElementById('docum_SAL201').value = SAL201.FACT_REM.concat(' - ', 'ORDEN COMPRA');
			break;
		case '4':
			document.getElementById('docum_SAL201').value = SAL201.FACT_REM.concat(' - ', 'OTRO DOCUM');
			break;
		case '5':
			document.getElementById('docum_SAL201').value = SAL201.FACT_REM.concat(' - ', 'NOTA DESPACHO');
			break;
	}
}

// PERFORM BUSCAR-RESTR
function _buscarrestriccion(restr, funcion) {
	console.log('llega a buscarRestriccion');
	$_OPSEGU = restr;
	LLAMADO_DLL({
		dato: [$_ADMINW, $_OPSEGU],
		callback: funcion,
		nombredll: 'CON904',
		carpeta: 'INVENT'
	});
}

function _dataCON904_01(data) {
	var date = data.split("|");
	swinvalid = date[0].trim();
	console.log(data, "data CON904");
	if (swinvalid == "00") {
	}
	else {
		SAL201.FACT_REM = '4';
		CON851('15', '15', null, 'error', 'error');
		_toggleNav();
	}
	return swinvalid;
}

function _dataCON904_02(data) {
	var date = data.split("|");
	var swinvalid = date[0].trim();
	console.log(data);
	if (swinvalid == "00") { }
	else { CON851('01', '01', validarTransSAL201(), 'error', 'error'); }
}

function condicionesCereales() {
	// if (SAL201.llave_trans_inv_w.substring(0, 2) == "1T" || "2T" || "1U" || "2U" || "1S" || "2S" || "1R" || "2R") 
	// { CON851('14', '14', $('#transaccion_SAL201').focus(), 'error', 'error'); }
}

// DATO-ORDEN-COMPRA
function validarOrdenSAL201() {
	validarInputs(
		{
			form: "#orden",
			orden: '1'
		}, function () { validarTransSAL201() },
		function () {
			SAL201['orden_SAL201'] = document.getElementById("orden_SAL201").value.trim().toUpperCase();
			if (SAL201['orden_SAL201'].trim() == "") { validarOrdenSAL201() }
			else { validardatoOrdenSAL201(); }
		}
	)
}

// VALIDACIONES ORDEN COMPRA
function validardatoOrdenSAL201() {
	const res = ['10', '1A', '14', '1B', '2B', '2C', '2E'].find(e => e == SAL201.llave_trans_inv_w.substring(0, 2));
	if (res != undefined) {
		const result = $_ArrayOrdenesComprasSAL201.find(element => element.LLAVE_ORD.trim() == SAL201.orden_SAL201.trim());
		if (result == undefined) {
			CON851('01', '01', validarNumeroSAL201(), 'error', 'error');
		} else {
			SAL201.NIT_INV_W = result.NIT_ORD;
			SAL201.CANTIDAD_ORD = result.TABLA_ORD[0].CANTIDAD_ORD.trim();
			SAL201.result_orden = result;
			document.getElementById("nit_SAL201").value = SAL201.NIT_INV_W.trim();
			if (result.CONTRATO_ORD.trim() != "") {
				SAL201.OBS_W = "CONTRATO" + " " + result.CONTRATO_ORD;
			}
			var limpiar = limpiarTablaSAL201();
			console.log(limpiar);
			var llenar = llenarTablaOrdenSAL201();
			console.log(llenar, "llenarTabla");

			if (SAL201.llave_trans_inv_w.substring(0, 2) == "2B") {
				// CONTINUE
			} else {
				console.log("llama INV201B");
			}
			validarNumeroSAL201();
		}
	}
}

// LLENAR-TABLA-ORDEN
function llenarTablaOrdenSAL201() {
	for (var i in SAL201.result_orden.TABLA_ORD) {
		var num = parseInt(i) + 1;
		var Item = cerosIzq(num, 3)
		if (parseInt(SAL201.result_orden.TABLA_ORD[i].CANTIDAD_ORD.trim()) > 0) {
			// Validacion de nit (LLENAR-TABLA-ORDEN)
			if ($_USUA_GLOBAL[0].NIT == 800202522) {
				SAL201.ALMACEN_TAB_W = "PTO01";
			} else {
				SAL201.ALMACEN_TAB_W = SAL201.result_orden.TABLA_ORD[i].ALMACEN_ORD.trim();
			}
			// busqueda reemplaza READ MAESTRO-ARTICULOS (LLENAR-PANTALLA)
			const result = $_ArrayarticulosSAL201.find(e => e.LLAVE_ART == SAL201.result_orden.TABLA_ORD[i].COD_ART_ORD);
			if (SAL201.result_orden.TABLA_ORD[i].COD_ART_ORD.substring(3, 15).trim() == "") {
				SAL201.DESCRIP_ART_TAB_W = " ";
				SAL201.IVA_ART_TAB_W = "0";
			} else {
				if (result != undefined) {
					SAL201.DESCRIP_ART_TAB_W = result.DESCRIP_ART.trim();
				} else { SAL201.DESCRIP_ART_TAB_W = "**********" }
			}
			// validacion IVA
			switch (result.IVA) {
				case "0":
					SAL201.IVA_ART_TAB_W = "0";
				case "1":
					SAL201.IVA_ART_TAB_W = $_USUA_GLOBAL[0].IVA1;
				case "2":
					SAL201.IVA_ART_TAB_W = $_USUA_GLOBAL[0].IVA2;
				case "3":
					SAL201.IVA_ART_TAB_W = $_USUA_GLOBAL[0].IVA3;
				default:
					SAL201.IVA_ART_TAB_W = " ";
				// validacion VALOR_ORD 
			}if (SAL201.result_transacciones.VR_VENTA_TRANS == "S") {
				SAL201.VALOR_TAB_W = "0";
			} else {
				SAL201.VALOR_TAB_W = SAL201.result_orden.TABLA_ORD[i].VALOR_ORD.trim();
				var cantidad = new Intl.NumberFormat().format(SAL201.result_orden.TABLA_ORD[i].CANTIDAD_ORD.trim());
				var valorCosto = new Intl.NumberFormat().format(SAL201.VALOR_TAB_W);
				document.getElementById("vacio_SAL201").value = valorCosto;
				var valorCostoOrdenMask_201 = new IMask($("#vacio_SAL201")[0], { mask: Number, thousandsSeparator: ',' });
			}
			$('#TABLA_SAL201 tbody').append(
				'<tr>'
				+ '<td>' + Item + '</td>'
				+ '<td>' + SAL201.result_orden.TABLA_ORD[i].COD_ART_ORD.substring(0, 1).trim() + '</td>'
				+ '<td>' + SAL201.result_orden.TABLA_ORD[i].COD_ART_ORD.substring(1, 3).trim() + '</td>'
				+ '<td>' + SAL201.result_orden.TABLA_ORD[i].COD_ART_ORD.substring(3, 15).trim() + '</td>'
				+ '<td>' + SAL201.result_orden.TABLA_ORD[i].COD_ART_ORD.substring(16, 18).trim() + '</td>'
				+ '<td>' + SAL201.DESCRIP_ART_TAB_W + '</td>'
				+ '<td>' + SAL201.ALMACEN_TAB_W + '</td>'
				+ '<td>' + cantidad + '</td>'
				+ '<td>' + valorCostoOrdenMask_201._value + '</td>'
				+ '<td>' + SAL201.IVA_ART_TAB_W + '</td>'
				+ "</tr>"
			)
			INDICE = INDICE + 1;
			MOV_INVENT.push({
				"ITEM_TABLA": Item,
				"LLAVE_ART_TABLA": SAL201.result_orden.TABLA_ORD[i].COD_ART_ORD.trim(),
				"DESCRIPCION_TABLA": SAL201.DESCRIP_ART_TAB_W,
				"ALMACEN_TABLA": SAL201.ALMACEN_TAB_W,
				"CANTIDAD_TABLA": SAL201.result_orden.TABLA_ORD[i].CANTIDAD_ORD.trim(),
				"VALOR_TABLA": valorCostoOrdenMask_201.unmaskedValue,
				"IVA_TABLA": SAL201.IVA_ART_TAB_W,
				"COD_LOTE_TABLA": "",
				"VLR_VEN_TABLA": "",
				"COSTO_TABLA": "",
				"DIV_TABLA": ""
			})
		}
	}
	sumaTotalSAL201();
	return 0;
}

// DATO-NUMERO
function validarNumeroSAL201() {
	if (SAL201.FACT_REM != 3) {
		limpiarTablaSAL201();
	}
	validarInputs(
		{
			form: "#numero",
			orden: '1'
		}, function () {
			if (document.getElementById("orden_SAL201").value == "") { validarTransSAL201() }
			else { validarOrdenSAL201() }
		},
		function () {
			SAL201['numero_SAL201'] = document.getElementById("numero_SAL201").value.trim().toUpperCase();
			var nCeros = cerosIzq($('#numero_SAL201').val(), 6)
			SAL201.numero_SAL201 = nCeros;
			$('#numero_SAL201').val(nCeros);
			if (SAL201['numero_SAL201'].trim() == "" || nCeros == "000000") {
				CON851('03', '03', validarNumeroSAL201(), 'error', 'error');
			}
			else {
				leerDocumentoSAL201();
				// validarNitsSAL201();
			}
		}
	)
}

function leerDocumentoSAL201() {
	if (SAL201.FACT_REM == "5") {
		if (SAL201.llave_trans_inv_w.substring(0, 1) == "1") {
			_ventanaDocums();
		} else {
			// validarDespachosSAL201();
		}
	}
	if (SAL201.llave_trans_inv_w.substring(0, 2) == "1P") {
		provisionCompraSAL201();
	}
	if (SAL201.llave_trans_inv_w.substring(0, 2) == "2P") {
		document.getElementById('fecha_SAL201').value = moment().format('01-MM-YYYY')
		buscarAnteriorSAL201();
	}
	if (SAL201.llave_trans_inv_w.substring(0, 2) == "28" && SW9 == "1") {
		SW9 = "0";
		buscarProveedorSAL201();
	}
	validarNitsSAL201();
}

// function validarDespachosSAL201() {
// 	registroTrans = $_ArraytransaccionesSAL201.find(element => element.LLAVE_TRANS.substring(0, 2) == SAL201.llave_trans_inv_w.substring(0, 2));
// 	let URL = get_url("APP/SALUD/SAL201.DLL");
// 	let parametros = SAL201.dependencia + '$' + registroTrans.NUM_ANO_TRANS + '$' + SAL201.llave_trans_inv_w + '$' + SAL201.numero_SAL201;
// 	const datos_envio = datosEnvio() + 3 + '|' + parametros;
// 	postData(
// 		{
// 			datosh: datos_envio
// 		}, URL)
// 		.then(data => {
// 			console.log(data, 'dataDespachos sal201')
// 			const res = data.split('|');
// 			SAL201_COBOL.SW_INVALID = res[0];
// 			// if(data)
// 			// 	if (SAL201_COBOL.SW_INVALID == "01") {
// 			// 		CON851('01', '01', validarNumeroSAL201(), 'error', 'error');
// 			// 	}else{
// 			// 		$_ArrayDespachosSAL201 = 
// 			// 		llenarTablaDespaSAL201();
// 			// 	}
// 			// 	var datos_pref = $_ArrayPrefijosSAL201.TABLA[0];
// 		})
// 		.catch(err => {
// 			console.debug(err);
// 		})
// }

// function llenarTablaDespaSAL201() {

// }

function validarNitsSAL201() {
	validarInputs(
		{
			form: "#nit",
			orden: '1'
		}, () => { validarNumeroSAL201() },
		function () {
			SAL201['id_nit'] = document.getElementById("nit_SAL201").value.trim().toUpperCase();
			if (SAL201.id_nit == "0") {
				const res5 = ['10', '1A', '1B', '1C'].find(e => e == SAL201.llave_trans_inv_w.substring(0, 2))
				if (res5 != undefined) {
					validarNitsSAL201();
					document.getElementById("nit_SAL201").value = "";
				} else {
					document.getElementById("nit_SAL201").value = "";
					document.getElementById('nom_tercero_SAL201').value = "Sin beneficiario";
				}
			} else {
				if (SAL201['id_nit'].trim() == "") {
					CON851('01', '01', validarNitsSAL201(), 'error', 'error');
				}
				else {
					const result = $_ArraynitsSAL201.find(element => element.COD.trim() == SAL201.id_nit.trim());
					if (result == undefined) {
						if (SAL201.SW_CREAR_W == 0) {
							crearNit(validarNitsSAL201);
						} else {
							CON851('01', '01', validarNitsSAL201(), 'error', 'error');
						}
					}
					else {
						if (SAL201.llave_trans_inv_w.substring(0, 2) == "28" && $_USUA_GLOBAL[0].NIT == 860350196) {
							SW9 = "1";
							validarNumeroSAL201();
						} else {
							document.getElementById('nit_SAL201').value = (result.COD.trim());
							document.getElementById('nom_tercero_SAL201').value = result.NOMBRE;
							SAL201.result_nit = result.COD.trim();
							SAL201.OPCION_TIPO = document.getElementById('tipo_SAL201').value.trim();
							datoObservacionSAL201();
						}
					}
				}
			}
		}
	)
}

function datoObservacionSAL201() {
	if (SAL201.FACT_REM == "1" && SAL201.llave_trans_inv_w.substring(0, 1) == "1") {
		var fecha = moment().format('YYMMDD');
		SAL201.DOCUM_CON807A = SAL201.FACT_REM.concat(SAL201.numero_SAL201);
		let URL = get_url("APP/CONTAB/CON807A.DLL");
		nit_con_ceros = cerosIzq(SAL201.id_nit, 10)
		consultarTerceroSAL201();
		datos_envio = datosEnvio() + fecha + '|' + nit_con_ceros + '|' + SAL201.DOCUM_CON807A;
		console.log("llega");
		postData({ datosh: datos_envio }, URL)
			.then(data => {
				console.log(data, 'data_OBS');
			})
			.catch(err => {
				console.debug(err);
			})
	}
	if ($_USUA_GLOBAL[0].PUC == "4" && (SAL201.llave_trans_inv_w.substring(0, 2) == "10" || SAL201.llave_trans_inv_w.substring(0, 2) == "1A")) {
		datoReservaSAL201();
	} else {
		validarObservacionSAL201();
	}
}

function validarObservacionSAL201() {
	bootbox.prompt({
		title: 'Observaciones',
		placeholder: '',
		className: '',
		maxlength: 50,
		buttons: {
			confirm: {
				label: 'Ok'
			}, cancel: {
				label: 'Cancelar'
			}
		},
		callback: function (value) {
			if (value != undefined) {
				document.getElementById("observacion_SAL201").value = value.trim();
				SAL201.observ_inv_w = value;
				console.log("observ");
				validarReferenciaSAL201();
			} else {
				validarNumeroSAL201();
			}
		}
	});
}

function validarReferenciaSAL201() {
	validarInputs(
		{
			form: "#referencia",
			orden: '1'
		}, () => { validarNumeroSAL201(); },
		function () {
			SAL201['referencia_inv_w'] = document.getElementById("referencia_SAL201").value.trim().toUpperCase();
			validarDatoDiaSAL201();
		}
	)
}

function datoReservaSAL201() {
	console.log("dato reserva")
	if (DATOS_RESERVA.TIP_RESERV_INV_W != "9") {
		DATOS_RESERVA.TIP_RESERV_INV_W = "1";
		document.getElementById("tipo_reserva_SAL201").value = DATOS_RESERVA.TIP_RESERV_INV_W;
	}
	validarTipoReservaSAL201();
}

function validarTipoReservaSAL201() {
	console.log("valid")
	validarInputs(
		{
			form: "#tipo_reserva",
			orden: '1'
		}, () => { validarNumeroSAL201(); },
		function () {
			SAL201['tipo_reserva_SAL201'] = document.getElementById("tipo_reserva_SAL201").value.trim().toUpperCase();
			if (SAL201['tipo_reserva_SAL201'].trim() == "") { validarTipoReservaSAL201() }
			else {
				DATOS_RESERVA.TIP_RESERV_INV_W = document.getElementById("tipo_reserva_SAL201").value;
				DATOS_RESERVA.NRO_RESERV_INV_W = "";
				document.getElementById("nro_reserva_SAL201").value = DATOS_RESERVA.NRO_RESERV_INV_W;
				switch (DATOS_RESERVA.TIP_RESERV_INV_W) {
					case "1":
						validarNroReservaSAL201();
						break;
					case "9":
						document.getElementById("nro_reserva_SAL201").value = "000000";
						//  validarDatoDiaSAL201();
						break;
					default:
						validarTipoReservaSAL201();
						break;
				}
			}
		}
	)
}

function validarNroReservaSAL201() {
	validarInputs(
		{
			form: "#nro_reserva",
			orden: '1'
		}, () => { validarTipoReservaSAL201(); },
		function () {
			SAL201['nro_reserva_SAL201'] = document.getElementById("nro_reserva_SAL201").value.trim().toUpperCase();
			if (SAL201['nro_reserva_SAL201'].trim() == "") { validarNroReservaSAL201() }
			else {
				DATOS_RESERVA.NRO_RESERV_INV_W = document.getElementById("nro_reserva_SAL201").value.trim();
				if (isNaN(DATOS_RESERVA.NRO_RESERV_INV_W)) {
					CON851('03', '03', validarNroReservaSAL201(), 'error', 'error');
				} else {
					leerReservaSAL201();
				}
			}
		}
	)
}

function leerReservaSAL201() {
	const result = $_ArrayReservasSAL201.find(e => e.SECUENCIA_PRE.substring(0, 10) == "04".concat(DATOS_RESERVA.NRO_RESERV_INV_W, "01"));
	console.log(result, "result sec")
	if (DATOS_RESERVA.NRO_RESERV_INV_W == "0" || DATOS_RESERVA.NRO_RESERV_INV_W == "000000"
		|| DATOS_RESERVA.NRO_RESERV_INV_W.trim() == "" || parseInt(DATOS_RESERVA.NRO_RESERV_INV_W) < 1) {
		CON851('03', '03', datoReservaSAL201(), 'error', 'error');
	} else if (result == undefined) {
		datoReservaSAL201();
	} else {
		if (result.NIT_PRE != SAL201.id_nit) {
			CON851('06', '06', datoReservaSAL201(), 'error', 'error');
		}
		else {
			SAL201.detalle_inv_w = DATOS_RESERVA.TIP_RESERV_INV_W.concat(DATOS_RESERVA.NRO_RESERV_INV_W);
			document.getElementById("observacion_SAL201").value = DATOS_RESERVA.TIP_RESERV_INV_W.concat(DATOS_RESERVA.NRO_RESERV_INV_W);
			validarObservacionSAL201();
		}
	}
}

function calcularDiaMax() {
	switch (parseInt(document.getElementById("fecha_mes_SAL201").value)) {
		case 01:
			SAL201.dia_max = 31;
			break;
		case 02:
			SAL201.dia_max = 29;
			break;
		case 03:
			SAL201.dia_max = 31;
			break;
		case 04:
			SAL201.dia_max = 30;
			break;
		case 05:
			SAL201.dia_max = 31;
			break;
		case 06:
			SAL201.dia_max = 30;
			break;
		case 07:
			SAL201.dia_max = 31;
			break;
		case 08:
			SAL201.dia_max = 31;
			break;
		case 09:
			SAL201.dia_max = 30;
			break;
		case 10:
			SAL201.dia_max = 31;
			break;
		case 11:
			SAL201.dia_max = 30;
			break;
		case 12:
			SAL201.dia_max = 31;
			break;
	}
	return SAL201.dia_max;
}

function validarDatoDiaSAL201() {
	calcularDiaMax();
	validarInputs(
		{
			form: "#fecha_dia",
			orden: '1'
		}, () => { validarReferenciaSAL201(); },
		function () {
			SAL201['dia_inv_w'] = document.getElementById("fecha_dia_SAL201").value.trim().toUpperCase();
			SAL201.fecha_inv_w = document.getElementById("fecha_año_SAL201").value.concat(
				document.getElementById("fecha_mes_SAL201").value, document.getElementById("fecha_dia_SAL201").value
			);
			SAL201.fecha_sist = moment().format("YYYYMMDD");
			if (parseInt(SAL201.dia_inv_w) < 1 || parseInt(SAL201.dia_inv_w) > SAL201.dia_max) {
				CON851('03', '03', validarDatoDiaSAL201(), 'error', 'error');
			} else {
				if (parseInt(SAL201.dia_inv_w) > parseInt(moment().format("DD"))) {
					SAL201.dia_inv_w = moment().format("DD");
				}
				if (parseInt(SAL201.dia_inv_w) < 1 || parseInt(SAL201.dia_inv_w) > 31) {
					validarDatoDiaSAL201();
				}
				// if()
				// 		IF  PUC-USU = 4
				//  AND FECHA-INV-W < FECHA-CTL
				//      MOVE 37 TO SW-INVALID
				//      INVOKE POW-SELF "CALLFORM" USING "CON851" "C:\PROG\CONTAB\CON851.DLL"
				//      GO TO DATO-DIA
				//  END-IF.
				else if ($_USUA_GLOBAL[0].NIT == 822006141) {
					if (parseInt(SAL201.dia_inv_w) < parseInt(moment().format("DD")) || parseInt(SAL201.dia_inv_w) > parseInt(moment().format("DD"))) {
						CON851('37', '37', validarDatoDiaSAL201(), 'error', 'error');
					}
				} else if (parseInt(SAL201.fecha_inv_w) > parseInt(SAL201.fecha_sist)) {
					CON851('37', '37', validarDatoDiaSAL201(), 'error', 'error');
				} else if (SAL201.llave_trans_inv_w.substring(0, 2) == "10"
					|| SAL201.llave_trans_inv_w.substring(0, 2) == "1A"
					|| SAL201.llave_trans_inv_w.substring(0, 2) == "1B"
					|| SAL201.llave_trans_inv_w.substring(0, 2) == "1C") {
					validarFechaVenceSAL201();
				} else {
					buscarRegSAL201();
				}
			}
		}
	)
}

function validarFechaVenceSAL201() {

	if (fechaVenceSAL201._value == null) {
		SAL201.fecha_vence_inv_w = fecha_inv_w;
	}
	fechaVenceSAL201.typedValue = SAL201.fecha_inv_w;
	validarInputs(
		{
			form: "#fecha_vence",
			orden: '1'
		}, () => { validarDatoDiaSAL201(); },
		function () {
			// DATO-ANO-VENCE
			SAL201['fecha_vence_inv_w'] = fechaVenceSAL201._value.split("/")[0] + fechaVenceSAL201._value.split("/")[1] + fechaVenceSAL201._value.split("/")[2]
			if ($_USUA_GLOBAL[0].PUC == "4") {
				buscarRegSAL201();
			} else {
				// VALIDACION FECHA
				if (parseInt(SAL201.fecha_vence_inv_w.substring(0, 4)) < parseInt(SAL201.fecha_inv_w.substring(0, 4))) {
					CON851('03', '03', validarFechaVenceSAL201(), 'error', 'error');
				} else {
					if (parseInt(SAL201.fecha_vence_inv_w) < parseInt(SAL201.fecha_inv_w)) {
						CON851('03', '03', validarFechaVenceSAL201(), 'error', 'error');
					} else {
						SAL201.MES_TEMP = SAL201.fecha_vence_inv_w.substring(4, 6);
						console.log("buscarReg");
						buscarRegSAL201();
					}
				}
			}
		}
	)
}

//esta pendiente / comparar con RM
// SI NIT ESTA VACIO O ES 0 CARGAR POPUP
function validarTipoContratoSAL201() {
	if (SAL201.id_nit == "" || SAL201.id_nit == "0") {
		_ventanaTipoContratoSAL201();
	} else {
		validarContratoSAL201();
	}
}

//esta pendiente / comparar con RM
function validarContratoSAL201() {
	if (SAL201.llave_trans_inv_w.substring(0, 2) == "10" || SAL201.llave_trans_inv_w.substring(0, 2) == "1A") {
		validarInputs(
			{
				form: "#contr",
				orden: '1'
			}, () => { validarNitsSAL201(); },
			function () {
				SAL201['contr_SAL201'] = document.getElementById("contr_SAL201").value.trim().toUpperCase();
				if (SAL201['contr_SAL201'].trim() == "") { _ventanaTiposSAL201() }
				else {
					_INV826A(SAL201.id_nit, $_ArrayOrdenesServiciosSAL201);
				}
			}
		)
	} else {
		document.getElementById("contr_SAL201").value = "";
		// _ventanaTiposSAL201();
		// aceptarVenceSAL201();
	}
}

// function validarTiposSAL201() {
// 	document.getElementById("item_SAL201").value = cerosIzq(INDICE, 3);
// 	validarInputs(
// 		{
// 			form: "#tipo",
// 			orden: '1'
// 		}, () => { validarTiposSAL201(); },
// 		function () {
// 			SAL201['tipo_SAL201'] = document.getElementById("tipo_SAL201").value.trim().toUpperCase();
// 			if (SAL201['tipo_SAL201'].trim() == "") { validarTiposSAL201() }
// 			else {
// 				const result = $_ArrayTipo.find(element => element.COD == SAL201.OPCION_TIPO);
// 				if (result == undefined) { CON851('03', '03', validarTiposSAL201(), 'error', 'error'); }
// 				else {
// 					document.getElementById('tipo_SAL201').value = (result.COD.trim());
// 					validarGruposSAL201();
// 				}
// 			}
// 		}
// 	)
// }

function buscarRegSAL201() {
	var result = mostrarActualSAL201();
	datoBarrasSAL201();
}

function datoBarrasSAL201() {
	$_CODBARRASARTW = "               ";
	if ($_USUA_GLOBAL[0].BARRAS == "S" && (SAL201.grupo == undefined || SAL201.grupo == "")) {
		// CONTINUE
		ventanaBarrasSAL201();
	} else {
		validarItemSAL201();
	}
}

// function ventanaBarrasSAL201() {
// 	SAL201.llave_bar_W = "";
// }

function ventanaBarrasSAL201() {
	fuente = '<div class="col-md-12" id="CODIGOBARRAS_103"> ' +
		'<input id="codigobarras_103" type="text" class="form-control input-md" data-orden="1" maxlength="15"> ' +
		'</div>';
	_ventana({
		source: fuente,
		title: 'CODIGO DE BARRAS',
		size: 'small',
		espace: true,
		focus: '#codigobarras_103',
		form: '#CODIGOBARRAS_103',
		order: '1',
		global1: '$_CODBARRASARTW',
		inputglobal1: '#codigobarras_103',
	}, _leerllavebarras, validarItemSAL201);
}

function _leerllavebarras() {
	if ((parseInt($_CODBARRASARTW) == 0) || ($_CODBARRASARTW.trim() == "")) {
		validarItemSAL201();
	}
	else {
		const result = $_ArrayarticulosSAL201.find(e => e.BARRAS == $_CODBARRASARTW);
		if (result == undefined) {
			CON851P('08', () => { datoBarrasSAL201() }, () => { crearArt(datoBarrasSAL201); });
		} else {
			document.getElementById("tipo_SAL201").value = result.LLAVE_ART.substring(0, 1).trim().toUpperCase();
			SAL201.OPCION_TIPO = result.LLAVE_ART.substring(0, 1).trim().toUpperCase();
			document.getElementById("grupo_SAL201").value = result.LLAVE_ART.substring(1, 3).trim().toUpperCase();
			SAL201.grupo = result.LLAVE_ART.substring(1, 3).trim().toUpperCase();
			document.getElementById("codigo_SAL201").value = result.LLAVE_ART.substring(3, 16).trim().toUpperCase();
			SAL201.codigo = result.LLAVE_ART.substring(3, 16).trim().toUpperCase();
			leerArticuloSAL201();
		}
	}
}

function crearArt(callback) {
	SAL201.SW_CREAR_W = 1;
	console.debug('segunda ventana de actualizar articulos INV103')
	let { ipcRenderer } = require("electron");
	ipcRenderer.send('another', datos = { directorio: 'INVENT/paginas/INV103.html' });
	vector = ['on', 'Actualizando maestro de articulos...']
	_EventocrearSegventana(vector, callback);
	// _Validandocliente3_41();
}

function crearNit(callback) {
	SAL201.sw_esc = 0;
	SAL201.SW_CREAR_W = 7;
	console.debug('segunda ventana de actualizar terceros INV103')
	let { ipcRenderer } = require("electron");
	ipcRenderer.send('another', datos = { directorio: 'CONTAB/paginas/CON110C.html' });
	vector = ['on', 'Actualizando maestro de terceros...']
	_EventocrearSegventana(vector, callback);
	// _Validandocliente3_41();
}

// function ubicarTipoSAL201() {
// 	if (INDICE > 1 && document.getElementById("grupo_SAL201").value.substring(0, 2).trim() == "") {
// 		document.getElementById("tipo_SAL201").value = SAL201.OPCION_TIPO;
// 		validarGruposSAL201();
// 	} else {
// 		console.log("se ejecuta _ventanaTipo desde ubicarTipo");
// 		setTimeout(_ventanaTiposSAL201,400);
// 	}
// }

function validarItemSAL201() {
	document.getElementById("item_SAL201").value = cerosIzq(INDICE, 3);
	validarInputs(
		{
			form: "#item",
			orden: '1'
		}, function () { validarFechaVenceSAL201() },
		function () {
			SAL201['item'] = document.getElementById("item_SAL201").value.trim().toUpperCase();
			SAL201.item = cerosIzq($('#item_SAL201').val(), 3);
			if (parseInt(SAL201.item) < 1) {
				SAL201.item = "001";
				validarItemSAL201();
			} else if (parseInt(SAL201.item) != parseInt(INDICE)) {
				console.log("item != indice", SAL201.item);
				let found = MOV_INVENT.find(item => item.ITEM_TABLA == SAL201.item);
				if (found != undefined) {
					buscarItemSAL201();
				} else {
					validarItemSAL201();
				}
			} else {
				document.getElementById("item_SAL201").value = SAL201.item;
				console.log("item", SAL201.item);
				_ventanaTiposSAL201();
				// if (SAL201.item.trim() == "") { validarItemSAL201() }
				// else { buscarItemSAL201(); }
			}
		}
	)
}

function validarGruposSAL201() {
	validarInputs(
		{
			form: "#grupo",
			orden: '1'
		}, _ventanaTiposSAL201,
		function () {
			SAL201['grupo'] = document.getElementById("grupo_SAL201").value.substring(0, 2).trim().toUpperCase();
			if (SAL201['grupo'].trim() == "") { validarGruposSAL201() }
			else {
				const result = $_ArraygruposSAL201.find(element => element.GRUPO == SAL201.grupo && element.TIPO == SAL201.OPCION_TIPO);
				SAL201.result_grupos = result;
				if (result == undefined) {
					CON851('01', '01', validarGruposSAL201(), 'error', 'error');
					SAL201.opc_lote_gr = "N";
				}
				else {
					document.getElementById('grupo_SAL201').value = result.GRUPO.trim();
					document.getElementById('descripcion_codigo_SAL201').value = result.DESCRIP.trim();
					if (SAL201.llave_trans_inv_w.substring(0, 2) == "11" || SAL201.llave_trans_inv_w.substring(0, 2) == "21" || SAL201.llave_trans_inv_w.substring(0, 2) == "2P") {
						validarArticulosSAL201();
					} else {
						if (SAL201.OPCION_TIPO == "0" && SAL201.grupo.substring(0, 1) == "9") {
							CON851('13', '13', validarGruposSAL201(), 'error', 'error');
						} else {
							validarArticulosSAL201();
						}
					}
				}
			}
		}
	)
}

function validarArticulosSAL201() {
	validarInputs(
		{
			form: "#codigo",
			orden: '1'
		}, validarGruposSAL201,
		function () {
			console.log("entra a validar art")
			SAL201['codigo'] = document.getElementById("codigo_SAL201").value.trim().toUpperCase();
			const result = $_ArrayarticulosSAL201.find(element => element.LLAVE_ART.substring(3, 16).trim() == SAL201.codigo && element.DESCRIP_ART.substring(0, 1) != "*");
			SAL201.result_articulos = result;
			if (result != undefined) {
				document.getElementById('codigo_SAL201').value = (result.LLAVE_ART.substring(3, 16).trim());
				console.log(result.LLAVE_ART, "llave art");
				// ----  BUSCAR-CLASE --------
				document.getElementById('clase_SAL201').value = result.LLAVE_ART.substring(16, 18).trim();
				document.getElementById('display1_SAL201').value = result.DESCRIP_ART.trim();
				// ----------------
			}
			validarClasesSAL201();
		}
	)
}

function validarClasesSAL201() {
	SAL201.SW_CREAR_W = 0;
	validarInputs(
		{
			form: "#clase",
			orden: '1'
		}, validarArticulosSAL201,
		function () {
			SAL201['clase'] = document.getElementById("clase_SAL201").value.trim().toUpperCase();
			if (SAL201['clase'].trim() == "") { leerArticuloSAL201() }
			else {
				const result = $_ArrayclasesSAL201.find(element => element.COD.trim() == SAL201.clase);
				if (result == undefined) { CON851('01', '01', validarClasesSAL201(), 'error', 'error'); }
				else {
					document.getElementById('clase_SAL201').value = (result.COD.trim());
					leerArticuloSAL201();
				}
			}
		}
	)
}

// funciones LEER-ARTICULO
function leerArticuloSAL201() {
	if (SAL201.codigo.trim() == "") { validarArticulosSAL201() }
	else {
		// reemplaza busqueda MAESTRO-ARTICULOS
		const result = $_ArrayarticulosSAL201.find(element => element.LLAVE_ART.substring(0, 16).trim() == SAL201.OPCION_TIPO + SAL201.grupo + SAL201.codigo.trim() && (element.LLAVE_ART.substring(16, 18).trim() == SAL201.clase.trim()));
		if (result == undefined) {
			if (SAL201.SW_CREAR_W == 0) {
				CON851P('08', () => { validarArticulosSAL201() }, () => { crearArt(datoBarrasSAL201); });
				console.log("crearArt");
			} else {
				CON851('01', '01', validarArticulosSAL201(), 'error', 'error');
			}
		}
		else {
			document.getElementById('descripcion_codigo_SAL201').value = (result.DESCRIP_ART.trim());
			// VALIDACION DE IVA
			switch (result.IVA) {
				case "0":
					SAL201.IVA_EDIT = "0";
				case "1":
					SAL201.IVA_EDIT = $_USUA_GLOBAL[0].IVA1;
				case "2":
					SAL201.IVA_EDIT = $_USUA_GLOBAL[0].IVA2;
				case "3":
					SAL201.IVA_EDIT = $_USUA_GLOBAL[0].IVA3;
			}
			document.getElementById('iva_SAL201').value = SAL201.IVA_EDIT;
			// VALIDACION SEGUN CODIGO DE TRANSACCION
			if (SAL201.llave_trans_inv_w.substring(0, 2) == "11" || SAL201.llave_trans_inv_w.substring(0, 2) == "21") {
			} else if (result.DESCRIP_ART.substring(0, 1) == "*" || (SAL201.OPCION_TIPO == "0" && SAL201.grupo.substring(0, 1) == "9")) {
				CON851('13', '13', validarArticulosSAL201(), 'error', 'error');
			} else if (SAL201.FACT_REM == "3") {
				validarAlmacenesSAL201();
			} else {
				SAL201.vlr_tab_w = 0;
				// Obtiene llave de articulo completa
				var clase = "  ";
				if (SAL201.clase.substring(0, 2).trim() != "") {
					clase = SAL201.clase.substring(0, 2).trim();
				}
				SAL201.llave_articulo = SAL201.OPCION_TIPO + SAL201.grupo + SAL201.codigo.padEnd(13, " ") + clase;
				validarAlmacenesSAL201();
			}
		}
	}
}

// funciones DATO-ALMACEN Y LEER-ALMACEN
function validarAlmacenesSAL201() {
	if (SAL201.almac == "" || SAL201.almac == undefined) {
		if (INDICE == 1) {
			if ($_USUA_GLOBAL[0].NIT == 800202522) {
				SAL201.almac = "PTO01";
			} else {
				SAL201.almac = "ALM01";
			}
		} else {
			SAL201.almac == undefined ? SAL201.almac = SAL201.ALMACEN_TAB_W : SAL201.almac = SAL201.almac;
		}
	}
	document.getElementById("almac_SAL201").value = SAL201.almac;
	validarInputs(
		{
			form: "#almac",
			orden: '1'
		}, validarClasesSAL201,
		function () {
			SAL201['almac'] = document.getElementById("almac_SAL201").value.trim().toUpperCase();
			if (SAL201['almac'].trim() == "") { validarAlmacenesSAL201() }
			else {
				const result = $_ArrayalmacenesSAL201.find(element => element.CODIGO.trim() == SAL201.almac);
				if (result == undefined) { CON851('01', '01', validarAlmacenesSAL201(), 'error', 'error'); }
				else {
					document.getElementById('almac_SAL201').value = (result.CODIGO.trim());
					SAL201.COD_LOCAL = result.CODIGO.trim();
					document.getElementById('display1_SAL201').value = (result.DESCRIPCION.trim());
					if (result.DESCRIPCION.substring(0, 1) == "*") {
						if (SAL201.llave_trans_inv_w.substring(0, 2) == "11" || SAL201.llave_trans_inv_w.substring(0, 2) == "21") {
							datoCantidadSAL201();
						} else {
							CON851('01', '01', validarAlmacenesSAL201(), 'error', 'error');
						}
					} else {
						validacionesLotesSAL201();
						// datoCantidadSAL201();
					}
				}
			}
		}
	)
}

// VENTANA-LOTE
function validacionesLotesSAL201() {
	if (SAL201.result_grupos.OPC_LOTE_GR == "S" && parseInt(moment().format('YYMMDD')) >= parseInt(SAL201.result_grupos.INICIO_LOTE_GR)) {
		_ventanaLoteFarmaceutico(validarLoteSAL201, validarAlmacenesSAL201, SAL201.almac, SAL201.llave_articulo, SAL201.llave_trans_inv_w.substring(0, 2));
		function validarLoteSAL201(CUM, COD) {
			console.log(CUM, "cum");
			SAL201.CUM_LTF = CUM;
			SAL201.cod_lote_tab_w = COD;
			if (SAL201.result_articulos.CUM_LTF_ART.trim() == "" && SAL201.CUM_LTF.trim() != "") {
				let URL = get_url("APP/SALUD/SAL201.DLL");
				let parametros = SAL201.CUM_LTF + '$' + SAL201.llave_articulo;
				const datos_envio = datosEnvio() + '5' + '|' + parametros;
				postData(
					{
						datosh: datos_envio
					}, URL)
					.then(data => {
						console.log(data, 'data sal201')
						const res = data.split('|');
						SAL201_COBOL.RESULTADO_LOTES = res[0];
					})
			}
			datoCantidadSAL201();
		}
	} else {
		SAL201.cod_lote_tab_w = "000000000";
		datoCantidadSAL201();
	}
}

function datoCantidadSAL201() {
	if (SAL201.llave_trans_inv_w.substring(0, 2) == "1F") {
		SAL201.cantidad_tab_w = 1;
		validarCantidadSAL201();
	} else {
		_inv808();
	}
}

// VENTANA-SALDOS
function _inv808() {
	SAL201.cantidad_tab_w = "0";
	let URL = get_url("APP/INVENT/INV808.DLL");

	var llave = SAL201.almac + SAL201.llave_articulo;
	// var llave =   "DR001" + "0MQTIRAS MILLAR";
	datos_envio = datosEnvio() + llave + '|' + SAL201.dia_inv_w + '|';
	console.log(datos_envio, "datos_envio");
	postData({ datosh: datos_envio }, URL)
		.then(data => {
			console.log(data, "data inv808")
			$_datos_saldos = data.SALDOS;
			if ($_datos_saldos.length > 1) {
				$_datos_saldos.pop();
			}
			for (var i in $_datos_saldos) {
				$_datos_saldos[i]['Sdo Anterior'] = $_datos_saldos[i]['SDO_ANT'];
				$_datos_saldos[i]['Entradas'] = $_datos_saldos[i]['ACUM_ENT'];
				$_datos_saldos[i]['Salidas'] = $_datos_saldos[i]['ACUM_SAL'];
				$_datos_saldos[i]['Sdo Actual'] = $_datos_saldos[i]['SDO_ACT'];
				$_datos_saldos[i]['C Unit'] = $_datos_saldos[i]['VLR_UNIT'];
				$_datos_saldos[i]['Lote'] = $_datos_saldos[i]['COD_LOTE'];
				$_datos_saldos[i]['Almacen'] = $_datos_saldos[i]['COD_ALM'];
			}
			_ventanaDatos({
				titulo: "Consulta de saldo actual",
				columnas: ["Sdo Anterior", "Entradas", "Salidas", "Sdo Actual", "C Unit", "Lote", "Almacen"],
				ancho: 900,
				data: $_datos_saldos,
				callback_esc: validarAlmacenesSAL201,
				callback: (data) => {
					SAL201.sdo_act_w = data.SDO_ACT;
					CANTIDAD_W = parseFloat(SAL201.cantidad_tab_w);
					validarCantidadSAL201();
				}
			});
		})
		.catch(err => {
			console.debug(err);
		})
}

// ------------- MOSTRAR-CANTIDAD ------------------------
function validarCantidadSAL201() {
	console.log("llega a validarCantidad");
	validarInputs(
		{
			form: "#cantidad",
			orden: '1'
		}, validarAlmacenesSAL201,
		function () {
			SAL201['cantidad_tab_w'] = cantidadMask_201.unmaskedValue;
			if (SAL201.cantidad_tab_w.trim() == "" || SAL201.cantidad_tab_w == undefined || SAL201.cantidad_tab_w == "0") {
				validarCantidadSAL201();
			} else {
				if (SAL201.FACT_REM == "3") {
					if (parseFloat(SAL201.cantidad_tab_w) > CANTIDAD_W) {
						SAL201.cantidad_tab_w = CANTIDAD_W;
						CON851('3N', '3N', datoCantidadSAL201(), 'error', 'error');
					}
				} else {
					SAL201.vlr_tab_w = 0;

					res = ["11", "21", "28", "1N", "2N"];
					const busqueda = res.find(e => e.element == SAL201.llave_trans_inv_w.substring(0, 2));
					if ((SAL201.cantidad_tab_w == undefined || SAL201['cantidad_tab_w'].trim() == "" || SAL201.cantidad_tab_w == "0")
						&& SAL201.llave_trans_inv_w.substring(0, 1) != "0" && busqueda == undefined) {
						if ($_USUA_GLOBAL[0].NIT == 845000038 && SAL201.llave_trans_inv_w.substring(0, 2) == "2B" && localStorage.getItem('Usuario').trim() == "ADMI") {
							// CONTINUE
						} else {
							datoCantidadSAL201();
						}
					}
					document.getElementById('cantidad_SAL201').value = cantidadMask_201.value;
					if ((SAL201.llave_trans_inv_w.substring(0, 2) == "1A" || SAL201.llave_trans_inv_w.substring(0, 2) == "10") && SAL201.almac.substring(0, 2) == "CN" && parseFloat(SAL201.cantidad_tab_w) > 0) {
						CON851('14', '14', validarAlmacenesSAL201(), 'error', 'error');
					} else if ($_USUA_GLOBAL[0].NIT == 822006141 && SAL201.llave_trans_inv_w.substring(0, 2) == "1A" && SAL201.almac.substring(0, 2) == "TP" && parseFloat(SAL201.cantidad_tab_w) > 0) {
						CON851('14', '14', validarAlmacenesSAL201(), 'error', 'error');
					} else {
						datoSaldoSAL201();
					}
				}
			}
		}
	)
}

function datoSaldoSAL201() {
	SAL201.cantidad_final = CANTIDAD_W - parseFloat(SAL201.cantidad_tab_w);

	// llamado SAL201, grabar saldo si es el caso
	let URL = get_url("APP/SALUD/SAL201.DLL");
	let parametros = SAL201.almac + '$' + SAL201.llave_articulo + '$' + SAL201.cod_lote_tab_w + '$' + SAL201.dia_inv_w;
	const datos_envio = datosEnvio() + '6' + '|' + parametros;
	postData(
		{
			datosh: datos_envio
		}, URL)
		.then(data => {
			console.log(data, 'data sal201')
			const res = data.split('|');
			SAL201_COBOL.RESULTADO_SALDOS = res[0];
			SAL201.sdo_cant_w = res[1];
		})

	// validaciones DATO-SALDO
	if (SAL201.llave_trans_inv_w.substring(0, 1) == "2" && SAL201.llave_trans_inv_w.substring(0, 2) != "21" && parseFloat(SAL201.cantidad_tab_w) > parseInt(SAL201.sdo_act_w)) {
		CON851('07', '07', null, 'error', 'error');
		var llave_grupo = SAL201.llave_articulo.substring(0, 3);
		if ((llave_grupo == "0AB" || llave_grupo == "0SB" || llave_grupo == "0EM") || SAL201.almac.substring(0, 2) == "TP" || $_USUA_GLOBAL[0].RESTRIC_EX == "S") {
			// CONTINUE
		} else {
			SAL201.SW_ERROR = 1;
			datoCantidadSAL201();
		}
	} else {
		if (SAL201.llave_trans_inv_w.substring(0, 1) == "1" && SAL201.result_transacciones.VR_COMPRA_TRANS == "N" && SAL201.result_transacciones.VR_VENTA_TRANS == "N") {
			SAL201.vlr_tab_w = parseInt(SAL201.result_articulos.VR_VENTA_1) * 0.8 * parseFloat(SAL201.cantidad_tab_w);
			mostrarValorCompraSAL201();
		} else {
			datoCompraSAL201();
		}
	}
}

// DATO-COMPRA
function datoCompraSAL201() {
	console.log("llega a datoCompra");
	if (SAL201.cantidad_tab_w.trim() == "") { SAL201.cantidad_tab_w = 0 }
	if (SAL201.almac.substring(0, 2) == "CN") {
		SAL201.vlr_tab_w = 0;
		datoVentaSAL201();
	} else {
		if (parseFloat(SAL201.sdo_act_w) != 0) {
			SAL201.costo_unit_w = SAL201.sdo_act_w / SAL201.sdo_cant_w;
		}
		if (SAL201.result_transacciones.VR_COMPRA_TRANS == "S") {
			if (parseFloat(SAL201.vlr_tab_w) == 0) {
				console.log(SAL201.vlr_tab_w, "vlr_tab = 0");
				if (parseFloat(SAL201.result_articulos.VR_ULT_COMPRA) > 0) {
					console.log(SAL201.result_articulos.VR_ULT_COMPRA, "vlr_ult_compra > 0");
					SAL201.costo_unit_w = SAL201.result_articulos.VR_ULT_COMPRA;
				} else {
					console.log(SAL201.result_articulos.VR_ULT_COMPRA, "vlr_ult_compra mo es > 0");
					// para asegurar de que se haga una operacion
					if (SAL201.result_articulos.VLR_REF.trim() != "") { }
					else { SAL201.result_articulos.VLR_REF = 0 }
					// ----
					SAL201.costo_unit_w = parseFloat(SAL201.result_articulos.VLR_REF) * .85;
				}
				SAL201.vlr_tab_w = parseFloat(SAL201.costo_unit_w) * parseFloat(SAL201.cantidad_tab_w);
				console.log(SAL201.vlr_tab_w, "vlr_tab 2");
			}
			if (SAL201.FACT_REM == "3") {
				SAL201.valor_unit_w = parseFloat(SAL201.vlr_tab_w) / CANTIDAD_W;
				SAL201.vlr_tab_w = parseFloat(SAL201.valor_unit_w) * parseFloat(SAL201.cantidad_tab_w);
			}
			SAL201.tipo_vlr_W = 0;
			console.log(SAL201.vlr_tab_w, "sal201.vlr_tab_w");
			document.getElementById("valorCosto_SAL201").value = SAL201.vlr_tab_w;
			console.log("1 D");
			validarValorCostoSAL201();
		} else {
			SAL201.vlr_tab_w = parseFloat(SAL201.costo_unit_w) * parseFloat(SAL201.cantidad_tab_w);
			if (parseFloat(SAL201.vlr_tab_w) < 0) {
				SAL201.vlr_tab_w = 0;
			}
			// PERFORM MOSTRAR_VALOR_COMPRA
			if (SAL201.result_transacciones.EVENTO_TRANS == "S" && SAL201.almac.substring(0, 2) != "CN" && parseFloat(SAL201.vlr_tab_w) <= 0 && SAL201.result_transacciones.VR_COMPRA_TRANS == "S") {
				CON851('02', '02', null, 'error', 'error');
			}
			if (parseFloat(SAL201.vlr_tab_w) < 0 && parseInt(SAL201.llave_trans_inv_w.substring(0, 1)) > 0) {
				datoCompraSAL201();
			} else {
				document.getElementById("valorCosto_SAL201").value = SAL201.vlr_tab_w;
				console.log("2 D");
				datoVentaSAL201();
			}
		}
	}
}

// VALIDAR INPUT VALOR COSTO
function validarValorCostoSAL201() {
	validarInputs(
		{
			form: "#valorCosto",
			orden: '1'
		}, validarCantidadSAL201,
		function () {
			SAL201['vlr_tab_w'] = valorCostoMask_201.value;
			console.log(SAL201.vlr_tab_w, "vlrtab");
			if (SAL201.tipo_vlr_W == "0" || SAL201.tipo_vlr_W == undefined) {
				validarCentroCostosSAL201();
				// leerCostoSAL201();
			} else {
				validarCentroCostosSAL201();
			}
			// leerCostoSAL201();
		}
	)
}

function validarCostoSAL201() {
	console.log("llega a validarCostoSAL201");
	// VALIDAR-COSTO
	if (SAL201.llave_trans_inv_w.substring(0, 2) == "1A" && $_USUA_GLOBAL[0].NIT == 822006141 && parseFloat(SAL201.vlr_tab_w) < 1) {
		CON851('03', '03', datoCompraSAL201(), 'error', 'error');
	} else {
		if (SAL201.llave_trans_inv_w.substring(0, 2) == "10" && $_USUA_GLOBAL[0].ASUME_IVA == "S" && $_USUA_GLOBAL[0].IVA_S == "N" && SAL201.reg_iva_ter == "1") {
			console.log("acumularIvaSAL201");
			acumularIvaSAL201();
		}

		if (parseFloat(SAL201.cantidad_tab_w) != 0) {
			SAL201.costo_unit_w = parseFloat(SAL201.vlr_tab_w) / parseFloat(SAL201.cantidad_tab_w);
		}

		if (parseFloat(SAL201.result_articulos.VR_ULT_COMPRA) > 0 && parseFloat(SAL201.costo_unit_w) > parseFloat(SAL201.result_articulos.VR_ULT_COMPRA)) {
			SAL201.dato_edit1_w += "ULT. COMPRA:"
			SAL201.dato_edit1_w += SAL201.result_articulos.VR_ULT_COMPRA;
			SAL201.dato_edit1_w += "FECHA:";
			SAL201.dato_edit1_w += SAL201.result_articulos.FECHA;
			document.getElementById("display1_SAL201").value = SAL201.dato_edit1_w;
			CON851('59', '59', null, 'error', 'error');
		}
		datoIvaSAL201();
	}
}

// DATO-IVA Y VALIDAR-IVA
function datoIvaSAL201() {
	console.log("llega a datoIVASAL201");
	if (parseInt($_USUA_GLOBAL[0].PUC) > 2 && $_USUA_GLOBAL[0].IVA_S == "N") {
		validarIvaSAL201();
		function validarIvaSAL201() {
			validarInputs(
				{
					form: "#iva",
					orden: '1'
				}, validarValorCostoSAL201,
				function () {
					SAL201['iva_w'] = document.getElementById("iva_SAL201").value.trim();
					calcularDatoIvaSAL201();
				}
			)
			console.log("funcion validarIva");
		}
	} else {
		SAL201.iva_w = "0";
		calcularDatoIvaSAL201();
	}
}

// CALCULAR-DATOS-IVA
function calcularDatoIvaSAL201() {
	console.log("llega a calcularDatoIva");
	SAL201.FACTOR_W = (100 + parseFloat(SAL201.iva_w)) / 100;
	SAL201.vlr_tab_w = parseFloat(SAL201.vlr_tab_w) * parseFloat(SAL201.FACTOR_W);
	mostrarValorCompraSAL201();
}

// MOSTRAR-VALOR-COMPRA
function mostrarValorCompraSAL201() {
	console.log("llega a mostrarValorCompraSAL201");
	if (SAL201.result_transacciones.EVENTO_TRANS == "S" && SAL201.almac.substring(0, 2) != "CN" && parseFloat(SAL201.vlr_tab_w) <= 0 && SAL201.result_transacciones.VR_COMPRA_TRANS == "S") {
		CON851('02', '02', null, 'error', 'error');
	}
	if (parseFloat(SAL201.vlr_tab_w) < 0 && parseInt(SAL201.llave_trans_inv_w.substring(0, 1)) > 0) {
		datoCompraSAL201();
	} else {
		document.getElementById("valorCosto_SAL201").value = SAL201.vlr_tab_w;
		console.log("3 D");
		datoVentaSAL201(); 
	}
}

// DATO-VENTA
function datoVentaSAL201() {
	console.log("llega a datoVentaSAL201");
	if (SAL201.result_transacciones.VR_VENTA_TRANS == "S") {
		$('#labelVlrCosto').text("Vlr Venta");
		switch ($_USUA_GLOBAL[0].NIT) {
			case 822001701:
				if (SAL201.llave_trans_inv_w.substring(0, 2) == "23") { precioInsumosSAL201() }
				break;
			case 822006141:
				if (SAL201.llave_trans_inv_w.substring(0, 2) == "2C" || SAL201.llave_trans_inv_w.substring(0, 2) == "2Y") { precioInsumosSAL201() }
				break;
			default:
				if (parseInt(SAL201.vlr_ven_tab_w) == 0 || SAL201.vlr_ven_tab_w == undefined) { SAL201.vlr_ven_tab_w = parseFloat(SAL201.result_articulos.VR_VENTA_1) * parseFloat(SAL201.cantidad_tab_w) }
				break;
		}

		if ($_USUA_GLOBAL[0].NIT == 14268341 && SAL201.llave_trans_inv_w.substring(0, 2) == "1A") { SAL201.vlr_ven_tab_w = (((parseFloat(SAL201.vlr_tab_w) * 10) / 100) / 30) * 120 + parseFloat(SAL201.vlr_tab_w) }

		SAL201.tipo_vlr_W = 1;
		validarValorCostoSAL201();
	} else {
		SAL201.vlr_ven_tab_w = 0;
		leerCostoSAL201();
	}
}

// MOSTRAR-VALOR-VENTA
function mostrarValorVentaSAL201() {
	if (parseFloat(SAL201.vlr_ven_tab_w) < 0) { datoVentaSAL201(); }
	else {
		$('#labelVlrCosto').text("Vlr Venta");
		document.getElementById("valorCosto_SAL201").value = SAL201.vlr_ven_tab_w;
		console.log("4 D");
	}
}

// DATO-CCOSTO
function datoCCostoSAL201() {
	console.log("dentro de datoCCosto");
	if ($_USUA_GLOBAL[0].COSTO == "1") {
		SAL201.costo_tab_w = 0;
		SAL201.DIV_COSTO = " ";
	} else {
		if (SAL201.llave_trans_inv_w.substring(0, 2) == "18" || SAL201.llave_trans_inv_w.substring(0, 1) == "2" || $_USUA_GLOBAL[0].COSTO == "3") {
			if (SAL201.costo_tab_w == undefined || SAL201.costo_tab_w == "") {
				if (SAL201.result_grupos.C_COSTO_GRUPO.trim() == "" && INDICE > 1) {
					SAL201.costo_tab_w = SAL201.costo_tab_w;
				} else {
					SAL201.costo_tab_w = SAL201.result_grupos.C_COSTO_GRUPO;
				}
			}
			else {
				SAL201.costo_tab_w = "";
				leerCostoSAL201();
			}
		}
	}

	if (SAL201.costo_tab_w == "" || SAL201.costo_tab_w == undefined) {
		SAL201.costo_tab_w = "0000";
	}
	validarCentroCostosSAL201();
}


function precioInsumosSAL201() {

}

// VALIDAR-CENTRO-COSTOS
function validarCentroCostosSAL201() {
	validarInputs(
		{
			form: "#centcosto",
			orden: '1'
		}, validarAlmacenesSAL201,
		function () {
			SAL201['costo_tab_w'] = document.getElementById("centcosto_SAL201").value.substring(0, 4).trim().toUpperCase();
			if (SAL201['costo_tab_w'].trim() == "") {
				validarCentroCostosSAL201();
				// validar
			} else {
				const result = $_ArrayCentroCostosSAL201.find(element => element.COD == SAL201.costo_tab_w);
				SAL201.result_centrocosto = result;
				SAL201.DIV_COSTO = result.DIV_COSTO;
				if (result == undefined) { CON851('01', '01', validarCentroCostosSAL201(), 'error', 'error'); }
				else {
					document.getElementById('centcosto_SAL201').value = result.COD + " - " + result.NOMBRE.trim();
					console.log("sale a leerCosto");
					leerCostoSAL201();
					// validarDivisionSAL201();
				}
			}
		}
	)
}

// LEER-COSTO
function leerCostoSAL201() {
	const result = $_ArrayCentroCostosSAL201.find(element => element.COD == SAL201.costo_tab_w);
	if (result == undefined) {
		SAL201.DIV_COSTO = " ";
		console.log("1 se va a datoCCosto");
		CON851('01', '01', datoCCostoSAL201(), 'error', 'error');
	} else {
		document.getElementById("centcosto_SAL201").value = result.COD + " - " + result.NOMBRE.trim();
		console.log("1 else leerCosto", result)
		if (result.NOMBRE.substring(0, 1) == "*" || result.NOMBRE.substring(0, 1) == "x") {
			console.log("2 se va a datoCCosto");
			CON851('13', '13', datoCCostoSAL201(), 'error', 'error');
		} else {
			if (SAL201.result_centrocosto.MAY_COSTO[0].trim() == "") {
				console.log("may_costo vacio");
				aceptarDivisionSAL201();
			} else {
				switch (SAL201.result_transacciones.CTA_COSTO_TRANS) {
					case "1":
						if (SAL201.result_grupos.MAY_COSTO_GR.trim() == SAL201.result_centrocosto.MAY_COSTO[0].trim()
							|| SAL201.result_grupos.MAY_COSTO_GR.trim() == SAL201.result_centrocosto.MAY_COSTO[1].trim()
							|| SAL201.result_grupos.MAY_COSTO_GR.trim() == SAL201.result_centrocosto.MAY_COSTO[2].trim()
							|| SAL201.result_grupos.MAY_COSTO_GR.trim() == SAL201.result_centrocosto.MAY_COSTO[3].trim()
							|| SAL201.result_grupos.MAY_COSTO_GR.trim() == SAL201.result_centrocosto.MAY_COSTO[4].trim()
							|| SAL201.result_grupos.MAY_COSTO_GR.trim() == SAL201.result_centrocosto.MAY_COSTO[5].trim()
							|| SAL201.result_grupos.MAY_COSTO_GR.trim() == SAL201.result_centrocosto.MAY_COSTO[6].trim()
						) {
							aceptarDivisionSAL201();
						} else {
							console.log("3 se va a datoCCosto");
							CON851('61', '61', datoCCostoSAL201(), 'error', 'error');
						}
						break;
					case "2":
						if (SAL201.DIV_COSTO.trim() != "" || SAL201.DIV_COSTO.trim() != undefined) { SAL201.result_grupos.MAY_COSTO2_GR.substring(2, 4) = SAL201.DIV_COSTO }
						if (SAL201.result_grupos.MAY_COSTO2_GR.trim() == SAL201.result_centrocosto.MAY_COSTO[0].trim()
							|| SAL201.result_grupos.MAY_COSTO2_GR.trim() == SAL201.result_centrocosto.MAY_COSTO[1].trim()
							|| SAL201.result_grupos.MAY_COSTO2_GR.trim() == SAL201.result_centrocosto.MAY_COSTO[2].trim()
							|| SAL201.result_grupos.MAY_COSTO2_GR.trim() == SAL201.result_centrocosto.MAY_COSTO[3].trim()
							|| SAL201.result_grupos.MAY_COSTO2_GR.trim() == SAL201.result_centrocosto.MAY_COSTO[4].trim()
							|| SAL201.result_grupos.MAY_COSTO2_GR.trim() == SAL201.result_centrocosto.MAY_COSTO[5].trim()
							|| SAL201.result_grupos.MAY_COSTO2_GR.trim() == SAL201.result_centrocosto.MAY_COSTO[6].trim()
						) {
							aceptarDivisionSAL201();
						} else {
							CON851('61', '61', datoCCostoSAL201(), 'error', 'error');
						}
						break;
					default:
						console.log("default");
						aceptarDivisionSAL201();
						break;
				}
			}
		}
	}
}

// ACEPTAR-DIVISION
function aceptarDivisionSAL201() {
	console.log("dentro de aceptar division");
	if (parseInt(SAL201.DIV_COSTO) < 0) {
		SAL201.DIV_COSTO = "00";
	}
	if (SAL201.DIV_COSTO.trim() != "") {
		SAL201.div_tab_w = SAL201.DIV_COSTO;
		console.log("DIV_COSTO != '' ")
		leerDivisionSAL201();
	} else {
		if ((SAL201.div_tab_w == undefined || SAL201.div_tab_w == "") && INDICE > 1) {
			SAL201.div_tab_w = SAL201.div_tab_w;
		}
		console.log("sale a validarDivision");
		validarDivisionSAL201();
	}
}

// VALIDAR-DIVISION
function validarDivisionSAL201() {
	console.log("llega a validarDivision");
	validarInputs(
		{
			form: "#division",
			orden: '1'
		}, validarCentroCostosSAL201,
		function () {
			SAL201['div_tab_w'] = document.getElementById("division_SAL201").value.substring(0, 2).trim().toUpperCase();
			leerDivisionSAL201();
		}
	)
}

// LEER-DIVISION
function leerDivisionSAL201() {
	console.log("llega a leerDivision");
	if (SAL201.div_tab_w.trim() == "" || SAL201.div_tab_w.trim() == "00" || SAL201.div_tab_w == undefined) {
		SAL201.div_tab_w = "00";
		document.getElementById("division_SAL201").value = SAL201.div_tab_w;
		// validarTipoContratoSAL201();
		datoDetalleSAL201();
	} else {
		const result = $_ArrayDivisionesSAL201.find(element => element.COD == SAL201.div_tab_w);
		if (result == undefined) { CON851('01', '01', aceptarDivisionSAL201(), 'error', 'error'); }
		else {
			document.getElementById('division_SAL201').value = result.COD + " - " + result.DESCRIP.trim();
			datoDetalleSAL201();
			// llenarPantallaSAL201();
			// validarTipoContratoSAL201();
		}
	}
}

// DATO-DETALLE
function datoDetalleSAL201() {
	console.log("llega a datoDetalle");
	if (SAL201.llave_trans_inv_w.substring(0, 2) == "1G" || SAL201.llave_trans_inv_w.substring(0, 2) == "1A") {
		// CONTINUE
		cajaDetalleSAL201();

	} else {
		console.log("sale a regresar 2");
		regresarSAL201();
	}

}

// BOOTBOX DETALLE FINAL
function cajaDetalleSAL201() {
	var detalle = SAL201.detalle_tab_w;
	bootbox.prompt({
		title: 'Observaciones',
		text: detalle,
		placeholder: '',
		className: '',
		maxlength: 50,
		buttons: {
			confirm: {
				label: 'Ok'
			}, cancel: {
				label: 'Cancelar'
			}
		},
		callback: function (value) {
			if (value != undefined) {
				detalle = value.trim();
				SAL201.detalle_tab_w = detalle;
				console.log("sale a regresar 1");

				regresarSAL201();
			} else {
				validarDivisionSAL201();
			}
		}
	});
	// return detalle;
}

// // LEER-TABLA, SUMAR-DATOS, VALIDAR-TABLA
// function validarTablaSAL201(orden) {
// 	console.log("entra a validarTabla");
// 	validarTabla(
// 		{
// 			tabla: '#TABLA_SAL201',
// 			orden: orden,
// 			event_f3: llenarDatosSAL201
// 		},
// 		function () {
// 			llenarDatosSAL201();
// 			// llenarTablaOrdenSAL201();
// 			// llenarTablaOrdenSAL201();
// 			llenarPantallaSAL201();
// 		},
// 		function () {
// 			llenarPantallaSAL201();
// 		}, llenarDatosSAL201
// 	);

// 	// return totalCantidad, totalValor;
// }

// REGRESAR
function regresarSAL201() {
	// INDICE + 1 EN LLENARPANTALLASAL201

	if (INDICE > 998) {
		INDICE = 998;
		funcionarioRecibeSAL201();
	} else {
		result = llenarPantallaSAL201();
		// buscarRegSAL201();
	}
}

// FUNCIONARIO-RECIBE
function funcionarioRecibeSAL201() {
	SAL201.nit_recibe_inv_w = SAL201.id_nit;

	if (SAL201.llave_trans_inv_w.substring(0, 2) == "1A" && SAL201.result_transacciones.RECIBE_TRANS == "S") {
		// CONTINUE
		document.getElementById("funcionario_SAL201").value = SAL201.nit_recibe_inv_w;
		validarRecibeSAL201();
	} else {
		if (SAL201.llave_trans_inv_w.substring(0, 1) == "2" || SAL201.llave_trans_inv_w.substring(0, 2) == "17") {
			// CONTINUE
			document.getElementById("funcionario_SAL201").value = SAL201.nit_recibe_inv_w;
			validarRecibeSAL201();
		} else {
			SAL201.nit_recibe_inv_w = "";
			confirmarSAL201();
		}
	}
}

// VALIDAR INPUT-RECIBE
function validarRecibeSAL201() {
	console.log("llega a validarRecibeSAL201");
	validarInputs(
		{
			form: "#funcionario",
			orden: '1'
		}, validarGruposSAL201,
		function () {
			SAL201['nit_recibe_inv_w'] = document.getElementById("funcionario_SAL201").value.trim().toUpperCase();
			leerRecibeSAL201();
		}
	)
}

// LEER-RECIBE
function leerRecibeSAL201() {
	console.log("llega a leerRecibeSAL201");
	document.getElementById("funcionario_SAL201").value = SAL201.nit_recibe_inv_w;
	if (SAL201.nit_recibe_inv_w == "" || SAL201.nit_recibe_inv_w == undefined) {
		document.getElementById("funcionario_SAL201").value = "";
	} else {
		const result = $_ArraynitsSAL201.find(element => element.COD.trim() == SAL201.nit_recibe_inv_w.trim());
		if (result == undefined) { CON851('01', '01', funcionarioRecibeSAL201(), 'error', 'error'); }
		else {
			document.getElementById('funcionario_SAL201').value = (result.COD.trim() + " - " + result.NOMBRE);
		}
	}
}

// CONFIRMAR
function confirmarSAL201() {
	if (SAL201.llave_trans_inv_w.substring(0, 2) == "09" || SAL201.llave_trans_inv_w.substring(0, 2) == "0D" || SAL201.llave_trans_inv_w.substring(0, 2) == "0E") {
		// CONTINUE
	} else {
		if (SAL201.totalCantidad == 0 && SAL201.totalValor == 0) {
			INDICE = INDICE + 1;
			buscarRegSAL201();
		}
	}
	swinvalid = "00";
	SAL201.sw_ok = "S";
	CON851P('00', () => { SAL201.imp_w = 0 }, () => { SAL201.imp_w = 1 });

}

// CONFIRMAR-NUMERO Y GRABAR-NUMERO
function confirmarNumeroSAL201() {
	SAL201.comprob_ctl = SAL201_COBOL.COMPROBANTE;
	if ($_USUA_GLOBAL[0].NIT == 860350196 && parseInt(SAL201_COBOL.COMPROBANTE) < 10000) {
		switch ($_USUA_GLOBAL[0].COD_CIUD_ALT) {
			case "85001":
				SAL201_COBOL.COMPROBANTE = parseInt(SAL201_COBOL.COMPROBANTE) + 30000;
				break;
			case "63001":
				SAL201_COBOL.COMPROBANTE = parseInt(SAL201_COBOL.COMPROBANTE) + 40000;
				break;
			case "76001":
				SAL201_COBOL.COMPROBANTE = parseInt(SAL201_COBOL.COMPROBANTE) + 50000;
				break;
			case "52001":
				SAL201_COBOL.COMPROBANTE = parseInt(SAL201_COBOL.COMPROBANTE) + 60000;
				break;
		}
	}
	let URL = get_url("APP/SALUD/SAL201.DLL");
	let parametros = SAL201.llave_trans_inv_w.substring(0, 3) + '$' + SAL201_COBOL.COMPROBANTE + '$' + SAL201.fecha_inv_w + '$' + SAL201.sw_niif + '$' + registroTrans.NUM_ANO_TRANS + '$' + SAL201.comprob_ctl;
	const datos_envio = datosEnvio() + '7' + '|' + parametros;
	postData(
		{
			datosh: datos_envio
		}, URL)
		.then(data => {
			console.log(data, 'data sal201 CONFIRMAR NUMERO');
			const res = data.split('|');
			SAL201_COBOL.RESULTADO_SALDOS = res[0];
			SAL201.sdo_cant_w = res[1];

		})
}

// FUNCIONES ACTUALIZAR-ORDEN Y ACTUALIZAR-ORDEN2
function actualizarOrdenesSAL201() {
	let URL = get_url("APP/SALUD/SAL201.DLL");
	let parametros = SAL201_COBOL.COMPROBANTE + '$' + SAL201.llave_trans_inv_w.substring(0, 2) + '$' + SAL201.fecha_inv_w;
	const datos_envio = datosEnvio() + '8' + '|' + parametros;
	postData(
		{
			datosh: datos_envio
		}, URL)
		.then(data => {
			console.log(data, 'data sal201')
			const res = data.split('|');
			SAL201_COBOL.RESULTADO_PASO8 = res[0];
		})
}
function llenarDatosSAL201() {
	SAL201.vlr_ven_tab_w == undefined ? SAL201.vlr_ven_tab_w = "" : false;
	const tableReg = document.getElementById('TABLA_SAL201');
	let found = false;
	let cellsOfRow = [];
	let ultimo;
	//Recorre las filas existentes de la tabla
	for (let i = 1; i < tableReg.rows.length; i++) {
		cellsOfRow.push(tableReg.rows[i].getElementsByTagName('td'));
		ultimo = i;
	}
	ultimo -= 1;
	//Recorre todas las celdas
	const result = MOV_INVENT.find(i => i.ITEM_TABLA == SAL201.item);
	console.log(result);
	if (result == undefined) {
		MOV_INVENT.push({
			'ITEM_TABLA': cellsOfRow[ultimo][0].textContent,
			'LLAVE_ART_TABLA': cellsOfRow[ultimo][1].textContent + cellsOfRow[ultimo][2].textContent + cellsOfRow[ultimo][3].textContent + cellsOfRow[ultimo][4].textContent,
			'DESCRIPCION_TABLA': cellsOfRow[ultimo][5].textContent,
			'ALMACEN_TABLA': cellsOfRow[ultimo][6].textContent,
			'CANTIDAD_TABLA': cellsOfRow[ultimo][7].textContent,
			'VALOR_TABLA': valorCostoMask_201.unmaskedValue,
			'IVA_TABLA': cellsOfRow[ultimo][9].textContent,
			'COD_LOTE_TABLA': SAL201.cod_lote_tab_w,
			'VLR_VEN_TABLA': SAL201.vlr_ven_tab_w,
			'COSTO_TABLA': SAL201.costo_tab_w,
			'DIV_TABLA': SAL201.div_tab_w
		})
	} else {
		const indice = MOV_INVENT.findIndex(index => index.ITEM_TABLA == SAL201.item);
		//Recorre todas las celdas
		for (let j = 0; j < cellsOfRow.length; j++) {
			// Busqueda de coincidencias en la tabla
			if (cellsOfRow[indice][0].textContent.trim() == SAL201.item) {
				cellsOfRow[indice][0].textContent = document.getElementById('item_SAL201').value;
				cellsOfRow[indice][1].textContent = document.getElementById('tipo_SAL201').value;
				cellsOfRow[indice][2].textContent = document.getElementById('grupo_SAL201').value;
				cellsOfRow[indice][3].textContent = document.getElementById('codigo_SAL201').value;
				cellsOfRow[indice][4].textContent = document.getElementById('clase_SAL201').value;
				cellsOfRow[indice][5].textContent = document.getElementById('descripcion_codigo_SAL201').value;
				cellsOfRow[indice][6].textContent = document.getElementById('almac_SAL201').value;
				cellsOfRow[indice][7].textContent = document.getElementById('cantidad_SAL201').value;
				cellsOfRow[indice][8].textContent = document.getElementById('valorCosto_SAL201').value;
				cellsOfRow[indice][9].textContent = document.getElementById('iva_SAL201').value;
			}
		}
		MOV_INVENT[indice] = {
			'ITEM_TABLA': cellsOfRow[indice][0].textContent,
			'LLAVE_ART_TABLA': cellsOfRow[indice][1].textContent + cellsOfRow[indice][2].textContent + cellsOfRow[indice][3].textContent + cellsOfRow[indice][4].textContent,
			'DESCRIPCION_TABLA': cellsOfRow[indice][5].textContent,
			'ALMACEN_TABLA': cellsOfRow[indice][6].textContent,
			'CANTIDAD_TABLA': cellsOfRow[indice][7].textContent,
			'VALOR_TABLA': valorCostoMask_201.unmaskedValue,
			'IVA_TABLA': cellsOfRow[indice][9].textContent,
			'COD_LOTE_TABLA': SAL201.cod_lote_tab_w,
			'VLR_VEN_TABLA': SAL201.vlr_ven_tab_w,
			'COSTO_TABLA': SAL201.costo_tab_w,
			'DIV_TABLA': SAL201.div_tab_w
		}
	}
	//aqui la llamaria
}

function sumaTotalSAL201() {
	sumaTotalCantidadArray = 0;
	sumaTotalValorArray = 0;
	for (i in MOV_INVENT) {
		sumaTotalCantidadArray += parseFloat(MOV_INVENT[i].CANTIDAD_TABLA);
		sumaTotalValorArray += parseFloat(MOV_INVENT[i].VALOR_TABLA);
		document.getElementById("totalCant_SAL201").value = new Intl.NumberFormat().format(sumaTotalCantidadArray);
		document.getElementById("totalValor_SAL201").value = new Intl.NumberFormat().format(sumaTotalValorArray);
	}
}

function grabarTablaSAL201(e) {
	if (e.type == "keydown" && e.which == 114) {
		SAL201_COBOL.SECU_INV_W == undefined ? SAL201_COBOL.SECU_INV_W = "" : false;
		SAL201.detalle_inv_w == undefined ? SAL201.detalle_inv_w = "" : false;
		SAL201.observ_inv_w == undefined ? SAL201.observ_inv_w = "" : false;
		SAL201.TIP_RESERV_INV_W == undefined ? SAL201.TIP_RESERV_INV_W = "" : false;
		SAL201.NRO_RESERV_INV_W == undefined ? SAL201.NRO_RESERV_INV_W = "" : false;
		SAL201.referencia_inv_w == undefined ? SAL201.referencia_inv_w = "" : false;
		SAL201.nit_recibe_inv_w == undefined ? SAL201.nit_recibe_inv_w = "" : false;
		SAL201.fecha_vence_inv_w == undefined ? SAL201.fecha_vence_inv_w = "000000" : false;
		SAL201.orden_SAL201 == undefined ? SAL201.orden_SAL201 = "" : false;

    var numeroItems = MOV_INVENT.length;

		var datos_envio = datosEnvio()
		datos_envio += SAL201.llave_articulo;
		datos_envio += '|'
		datos_envio += SAL201.cod_lote_tab_w;
		datos_envio += '|'
		datos_envio += SAL201.fecha_inv_w;
		datos_envio += '|'
		datos_envio += SAL201.llave_trans_inv_w;
		datos_envio += '|'
		datos_envio += SAL201_COBOL.COMPROBANTE;
		datos_envio += '|'
		datos_envio += SAL201_COBOL.SECU_INV_W;
		datos_envio += '|'
		datos_envio += SAL201.id_nit;
		datos_envio += '|'
		datos_envio += SAL201.detalle_inv_w;
		datos_envio += '|'
		datos_envio += SAL201.numero_SAL201;
		datos_envio += '|'
		datos_envio += SAL201.FACT_REM;
		datos_envio += '|'
		datos_envio += SAL201.observ_inv_w;
		datos_envio += '|'
		datos_envio += SAL201.nit_recibe_inv_w;
		datos_envio += '|'
		datos_envio += SAL201.orden_SAL201;
		datos_envio += '|'
		datos_envio += SAL201.TIP_RESERV_INV_W;
		datos_envio += '|'
		datos_envio += SAL201.NRO_RESERV_INV_W;
		datos_envio += '|'
		datos_envio += SAL201.referencia_inv_w;
		datos_envio += '|'
		datos_envio += SAL201.fecha_vence_inv_w;
		datos_envio += '|'
		datos_envio += localStorage.Usuario;
		datos_envio += '|'
		datos_envio += numeroItems.toString().padStart(3,'0');
		datos_envio += '|'
		datos_envio += moment().format("YYYYMMDD");
		datos_envio += '|'
		console.log(datos_envio)
		let URL = get_url("app/SALUD/SAL201-01.DLL");

		var data = {};
		data.datosh = datos_envio;
		let indice = 1;
		for (i in MOV_INVENT) {
			console.log(i, "i");
			indice += parseInt(i);
			SAL201.iva_w == undefined ? document.getElementById("iva_SAL201").value : false;
			data["LIN-" + indice.toString().padStart(3, "0")] =
				MOV_INVENT[i].ITEM_TABLA + "|" +
				MOV_INVENT[i].LLAVE_ART_TABLA + "|" +
				MOV_INVENT[i].COD_LOTE_TABLA + "|" +
				MOV_INVENT[i].ALMACEN_TABLA + "|" +
				MOV_INVENT[i].CANTIDAD_TABLA + "|" +
				MOV_INVENT[i].VALOR_TABLA + "|" +
				MOV_INVENT[i].IVA_TABLA + "|" +
				MOV_INVENT[i].VLR_VEN_TABLA + "|" +
				MOV_INVENT[i].COSTO_TABLA + "|" +
				MOV_INVENT[i].DIV_TABLA;
		}
		console.log(data)
    postData(data, URL)
        .then((data) => {
            console.log('resultado grabado',data)
        })
        .catch(error => {
            console.error(error)
        });
	}

}

function llenarPantallaSAL201(found) {
	costoTemp = valorCostoMask_201.unmaskedValue;
	costoTemp
	let busqueda = MOV_INVENT.find(item => item.ITEM_TABLA.trim() == document.getElementById('item_SAL201').value.trim());
	if (busqueda == undefined) {
		$('#TABLA_SAL201 tbody').append(
			'<tr>' +
			'<td>' + cerosIzq(INDICE, 3) + '</td>' +
			'<td>' + $('#tipo_SAL201').val() + '</td>' +
			'<td>' + $('#grupo_SAL201').val() + '</td>' +
			'<td>' + $('#codigo_SAL201').val() + '</td>' +
			'<td>' + $('#clase_SAL201').val() + '</td>' +
			'<td>' + $('#descripcion_codigo_SAL201').val() + '</td>' +
			'<td>' + $('#almac_SAL201').val() + '</td>' +
			'<td>' + $('#cantidad_SAL201').val() + '</td>' +
			'<td>' + $('#valorCosto_SAL201').val() + '</td>' +
			'<td>' + $('#iva_SAL201').val() + '</td>' +
			'</tr>'
		);
	}
	INDICE = INDICE + 1;
	let limpiarInputsPromise = new Promise((resolve, reject) => {
		setTimeout(function () {
			llenarDatosSAL201();
			sumaTotalSAL201();
			resolve('Exito')
			reject('error')
		}, 250)
	})
		.then((successMessage) => {
			console.debug(successMessage, 'mensaje exito')
			setTimeout(limpiarInputsSAL201(), 100);
			if (INDICE < 3) {
				setTimeout(validarItemSAL201, 400);
			} else {
				reconsolidarDevoluciones();
			}
		}).catch((error) => {
			console.debug('error al vaciar cajas', 'error');
		})
}

function reconsolidarDevoluciones() {
	console.debug('segunda ventana de reconsolidar devoluciones INV022')
	let { ipcRenderer } = require("electron");
	ipcRenderer.send('another', datos = { directorio: 'INVENT/paginas/INV022.html', otros: [SAL201.llave_trans_inv_w, SAL201.id_nit, SAL201_COBOL.COMPROBANTE, sumaTotalValorArray] });
	vector = ['on', 'Reconsolidar Devoluciones...']
	_EventocrearSegventana(vector, validarTransSAL201);
	// _Validandocliente3_41();
}

function limpiarInputsSAL201() {
	document.getElementById("tipo_SAL201").value = "";
	document.getElementById("grupo_SAL201").value = "";
	document.getElementById("codigo_SAL201").value = "";
	document.getElementById("clase_SAL201").value = "";
	document.getElementById("descripcion_codigo_SAL201").value = "";
	document.getElementById("almac_SAL201").value = "";
	document.getElementById("cantidad_SAL201").value = "";
	document.getElementById("valorCosto_SAL201").value = "";
}

function limpiarTablaSAL201() {
	$('#TABLA_SAL201 tbody').html('');
	document.getElementById("totalValor_SAL201").value = "";
	document.getElementById("totalCant_SAL201").value = "";
	return "tabla limpiada";
}

function acumularIvaSAL201() {
	// PERFORM ACUMULAR-IVA
	switch (SAL201.result_articulos.IVA) {
		case "0":
			SAL201.FACTOR_W = 1;
			break;
		case "1":
			SAL201.FACTOR_W = (100 + parseInt($_USUA_GLOBAL[0].IVA1) / 100);
			break;
		case "2":
			SAL201.FACTOR_W = (100 + parseInt($_USUA_GLOBAL[0].IVA2) / 100);
			break;
		case "3":
			SAL201.FACTOR_W = (100 + parseInt($_USUA_GLOBAL[0].IVA3) / 100);
			break;
		default:
			SAL201.FACTOR_W = 1;
			break;
	}
	return SAL201.FACTOR_W;
}

// TRAER DATO DE REG_IVA_TER
function consultarTerceroSAL201() {
	let datos_envio = datosEnvio()
	datos_envio += '|'
	datos_envio += nit_con_ceros;
	SolicitarDll({ datosh: datos_envio }, dataCON110C_02, get_url('/APP/CONTAB/CON110C_02.DLL'));
	function dataCON110C_02(data) {
		var date = data.split("|");
		SAL201.reg_iva_ter = date[47].trim();
	}
}

function mostrarActualSAL201() {
	if (SAL201.result_articulos != undefined) {
		if (SAL201.grupo == undefined) {
			SAL201.result_articulos.DESCRIP_ART = "";
			SAL201.result_articulos.UNIDAD = "";
			SAL201.result_articulos.IVA = "";
		} else {
			const result = $_ArrayarticulosSAL201.find(e => e.LLAVE_ART == SAL201.llave_articulo);
			result == undefined ? SAL201.result_articulos.DESCRIP_ART = "CODIGO NO EXISTE - " : false;
		}
		document.getElementById("descripcion_codigo_SAL201").value = SAL201.result_articulos.DESCRIP_ART;
		document.getElementById("almac_SAL201").value = SAL201.almac;
		document.getElementById("cantidad_SAL201").value = SAL201.cantidad_tab_w;
		document.getElementById("valorCosto_SAL201").value = SAL201.vlr_tab_w;

		switch (SAL201.result_articulos.IVA) {
			case "0":
				SAL201.tar_w = 0;
				break;
			case "1":
				SAL201.tar_w = $_USUA_GLOBAL[0].IVA1;
				break;
			case "2":
				SAL201.tar_w = $_USUA_GLOBAL[0].IVA2;
				break;
			case "3":
				SAL201.tar_w = $_USUA_GLOBAL[0].IVA3;
				break;
		}

		SAL201.tar_w == 1 ? SAL201.tar_w = 1.6 : false;
		SAL201.tar_w == 0 ? null : document.getElementById("iva_SAL201").value = SAL201.tar_w;
		return 0
	} else {
		return 1;
	}
}

function buscarItemSAL201() {
	let found = MOV_INVENT.find(item => item.ITEM_TABLA == SAL201.item);
	if (found != undefined) {
		console.debug('item encontrado', found);
		//si lo encontro autocompleta y deja vacio valr y cantidad
		document.getElementById("item_SAL201").value = found.ITEM_TABLA;
		document.getElementById("tipo_SAL201").value = found.LLAVE_ART_TABLA.substring(0, 1);
		document.getElementById("grupo_SAL201").value = found.LLAVE_ART_TABLA.substring(1, 3);
		document.getElementById("codigo_SAL201").value = found.LLAVE_ART_TABLA.substring(3, 16);
		document.getElementById("clase_SAL201").value = found.LLAVE_ART_TABLA.substring(16, 18);
		document.getElementById("descripcion_codigo_SAL201").value = found.DESCRIPCION_TABLA;
		document.getElementById("almac_SAL201").value = found.ALMACEN_TABLA;
		document.getElementById("cantidad_SAL201").value = found.CANTIDAD_TABLA;
		document.getElementById("valorCosto_SAL201").value = found.VALOR_TABLA;
		document.getElementById("iva_SAL201").value = found.IVA_TABLA;

		INDICE = INDICE - 1;
		console.log("se ejecuta ventanaTipo desde buscarItem")
		setTimeout(_ventanaTiposSAL201, 400);
	} else {
		CON851('Item no encontrado', 'Item no encontrado', validarItemSAL201(), 'error', 'error');
		// agrega 1 a item y continua
		// limpiarInputsSAL201();
		// setTimeout(_ventanaTiposSAL201,400);
	}
}
