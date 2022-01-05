// var arrayDataF8 = []; var cantidadMask_201 = new IMask($('#input1_valor')[0], { mask: Number, thousandsSeparator: ',' });
var $_ArrayCentroCostosINV022 = [];
var arrayDataF8 = [];
var INV022 = [];
var PUC_USU = $_USUA_GLOBAL[0].PUC;
var NIT_USU = $_USUA_GLOBAL[0].NIT;
var INDICE = 1;
var INDICE_J = 0;
INV022.trans_022_lnk = $_MESSAGE[2].otros[0];
INV022.nit_022_lnk = $_MESSAGE[2].otros[1];
INV022.comprob_022_lnk = $_MESSAGE[2].otros[2];
var valor_total_lnk = $_MESSAGE[2].otros[3];
var nit_con_ceros = cerosIzq(INV022.nit_022_lnk, 10);

$(document).ready(function () {
	console.log("entra a js")
	loader('hide');
	nombreOpcion('9, 2, 1 - Entrada datos movimiento');
	colocarIdsINV022();
	iniciarObjetosFNF8();
});

function colocarIdsINV022() {
	arrayPrimerTd = ["1. Compras", "2. Iva", "3. Rete-Fuente", "4. Rete-Iva", "5. Rete-Icav", "", "7. ", "8. ", "9. ", "10. ", "11. ", "12. ", "13. ", "14. "]
	for (i = 0; i < 15; i++) {
		var htmlTags = '<tr>' +
			'<td>' + arrayPrimerTd[i] + '</td>' +
			'<td>' + `<div class="input-group col-md-6 col-sm-3 col-xs-3" id=valor${i}> <input id=valor${i}_INV022 type="text" maxlength="14" data-orden="1" class="form-control input-sm col-md-7 col-sm-7 col-xs-7 input-valor" style="width: 120px; padding: 3px; border: 1px solid #4290D1;" > </div>` + '</td>' +
			'<td>' + '<div class="input-group col-md-6 col-sm-3 col-xs-3" ' + `id=cta${i}>` + `<input id=cta${i}_INV022` + ' type="text" maxlength="11" data-orden="1" class="form-control input-sm col-md-7 col-sm-7 col-xs-7 input-cuenta" style="width: 90px; padding: 3px; border: 1px solid #4290D1;"> </div>' + '</td>' +
			'<td>' + '<div class="input-group col-md-6 col-sm-3 col-xs-3" ' + `id=descripcion${i}>` + `<input id=descripcion${i}_INV022` + ' type="text" data-orden="1" class="form-control input-sm col-md-7 col-sm-7 col-xs-7 input-descripcion" style="width: 250px; padding: 3px; border: 1px solid #4290D1;" disabled> </div>' + '</td>' +
			'<td>' + '<div class="input-group col-md-6 col-sm-3 col-xs-3" ' + `id=tercero${i}>` + `<input id=tercero${i}_INV022` + ' type="text" maxlength="10" data-orden="1" class="form-control input-sm col-md-7 col-sm-7 col-xs-7 input-tercero" style="width: 90px; padding: 3px; border: 1px solid #4290D1;"> </div>' + '</td>' +
			'<td>' + '<div class="input-group col-md-6 col-sm-3 col-xs-3" ' + `id=baseGrav${i}>` + `<input id=baseGrav${i}_INV022` + ' type="text" maxlength="14" data-orden="1" class="form-control input-sm col-md-7 col-sm-7 col-xs-7 input-base-gravable" style="width: 120px; padding: 3px; border: 1px solid #4290D1;"> </div>' + '</td>' +
			'<td>' + '<div class="input-group col-md-6 col-sm-3 col-xs-3" ' + `id=comprob${i}>` + `<input id=comprob${i}_INV022` + ' type="text" maxlength="4" data-orden="1" class="form-control input-sm col-md-7 col-sm-7 col-xs-7 input-com" style="width: 60px; padding: 3px; border: 1px solid #4290D1;"> </div>' + '</td>' +
			'<td>' + '<div class="input-group col-md-6 col-sm-3 col-xs-3" ' + `id=año${i}>` + `<input id=año${i}_INV022` + ' type="text" maxlength="4" data-orden="1" class="form-control input-sm col-md-7 col-sm-7 col-xs-7 input-año" style="width: 60px; padding: 3px; border: 1px solid #4290D1;"> </div>' + '</td>' +
			'<td>' + '<div class="input-group col-md-6 col-sm-3 col-xs-3" ' + `id=mes${i}>` + `<input id=mes${i}_INV022` + ' type="number" maxlength="2" data-orden="1" min="0" class="form-control input-sm col-md-7 col-sm-7 col-xs-7 input-mes" style="width: 40px; padding: 3px; border: 1px solid #4290D1;"> </div>' + '</td>' +
			'<td>' + '<div class="input-group col-md-6 col-sm-3 col-xs-3" ' + `id=dia${i}>` + `<input id=dia${i}_INV022` + ' type="number" maxlength="2" data-orden="1" min="0" class="form-control input-sm col-md-7 col-sm-7 col-xs-7 input-dia" style="width: 40px; padding: 3px; border: 1px solid #4290D1;"> </div>' + '</td>' +
			'<td>' + '<div class="input-group col-md-6 col-sm-3 col-xs-3" ' + `id=nroCosto${i}>` + `<input id=nroCosto${i}_INV022` + ' type="text" maxlength="4" data-orden="1" class="form-control input-sm col-md-7 col-sm-7 col-xs-7 nro-costo_INV022" style="width: 60px; padding: 3px; border: 1px solid #4290D1;"> </div>' + '</td>' +
			'<td>' + '<div class="input-group col-md-6 col-sm-3 col-xs-3" ' + `id=nombreCosto${i}>` + `<input id=nombreCosto${i}_INV022` + ' type="text" data-orden="1" class="form-control input-sm col-md-7 col-sm-7 col-xs-7 input-nombre-costo" style="width: 120px; padding: 3px; border: 1px solid #4290D1;" disabled> </div>' + '</td>' +
			+ '</tr>' +
			$('#TABLA_INV022 tbody').append($(htmlTags));
	}
	_inputControl('reset'); _inputControl('disabled');
	inputsF8Tabla();
}

function inputsF8Tabla() {
	let i = 0;
	let inputs = [];
	let tipos = ['costos', 'terceros', 'cuentas'];
	for (j in tipos) {
		console.log(tipos, "tipos");
		switch (tipos[j]) {
			case 'costos':
				console.log("entra a costos case")
				inputs = $("input[id*=nroCosto]");
				new Promise((resolve, reject) => {
					for (i in inputs) {
						if (inputs[i].tagName == 'INPUT') {
							arrayDataF8.push({ 'input': `nroCosto${i}`, 'app': 'INV022', 'funct': _ventanaCentroCostosINV_022 });
						}
						// // inputs[i].id = `nroCosto${i}_INV022`
					}
					resolve('exito')
					reject('error')
				}).then((successMessage) => {
					console.debug(successMessage, 'mensaje exito')
					console.log("llega a toggleF8")
					_toggleF8(arrayDataF8)
				})
				break;
			case 'terceros':
				console.log("entra a terceros case")
				inputs = $("input[id*=tercero]");
				// inputs = $('.tercero_INV022');
				new Promise((resolve, reject) => {
					for (i in inputs) {
						// inputs[i].id = `tercero${i}_INV022`
						if (inputs[i].tagName == 'INPUT') {
							arrayDataF8.push({ 'input': `tercero${i}`, 'app': 'INV022', 'funct': _ventanaTercerosINV_022 })
						}
					}
					resolve('exito')
					reject('error')
				}).then((successMessage) => {
					console.debug(successMessage, 'mensaje exito')
					_toggleF8(arrayDataF8)
				})
				break;
			case 'cuentas':
				console.log("entra a cuentas case")
				inputs = $("input[id*=cta]");
				// inputs = $('.tercero_INV022');
				new Promise((resolve, reject) => {
					for (i in inputs) {
						// inputs[i].id = `tercero${i}_INV022`
						if (inputs[i].tagName == 'INPUT') {
							arrayDataF8.push({ 'input': `cta${i}`, 'app': 'INV022', 'funct': _ventanaCuentasINV_022 })
						}
					}
					resolve('exito')
					reject('error')
				}).then((successMessage) => {
					console.debug(successMessage, 'mensaje exito')
					_toggleF8(arrayDataF8)
				})
				break;
			default:
				break;
		}
	}
}

function iniciarObjetosFNF8(callback) {
	SAL201 = []; $_ArraytarifasSAL201 = []; $_ArraytransaccionesSAL201 = []; $_ArraygruposSAL201 = [];
	$_ArrayTercerosINV_022 = []; $_ArrayCuentasINV_022 = [];
	obtenerDatosCompletos({ nombreFd: 'CTA-MAYOR' }, (data) => {
		$_ArrayCuentasINV_022 = data.MAESTROS;
		$_ArrayCuentasINV_022.pop();
		obtenerDatosCompletos({ nombreFd: 'TERCEROS' }, (data) => {
			$_ArrayTercerosINV_022 = data.TERCEROS;
			obtenerDatosCompletos({ nombreFd: 'COSTOS' }, (data) => {
				$_ArrayCentroCostosINV022 = data.COSTO;
				$_ArrayCentroCostosINV022.pop();
				obtenerDatosCompletos({ nombreFd: 'ARTICULOS' }, (data) => {
					$_ArrayArticulosINV022 = data.ARTICULOS;
					$_ArrayArticulosINV022.pop();
					iniciarProcesoINV022();
				}, 'ONLY')
			}, 'ONLY')
		}, 'ONLY')
	}, 'ONLY')
}

function _ventanaCuentasINV_022(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		// var filtroMaestros
		// var cta_ret = $('#cuentaRte_719').val().trim()

		// if (cta_ret.length < 1) {
		// 		cta_ret = arrayDatosCompletos719.MAYORRET
		// 		filtroMaestros = arrayMaestros_719.filter(maestro => maestro.CTA_MAY == cta_ret)
		// } else {
		// 		var ctaMayor = cta_ret.substring(0, 4)
		// 		if (ctaMayor) {
		// 				filtroMaestros = arrayMaestros_719.filter(maestro => maestro.CTA_MAY == ctaMayor)
		// 				var subCta = cta_ret.substring(4, 6)
		// 				if (subCta) {
		// 						filtroMaestros = filtroMaestros.filter(maestro => maestro.SUB_CTA == subCta)
		// 						var aux = cta_ret.substring(6, 11)
		// 						if (aux) {
		// 								filtroMaestros = filtroMaestros.filter(maestro => maestro.AUX_MAE == aux)
		// 						}
		// 				}
		// 		} else {
		// 				filtroMaestros = arrayMaestros_719
		// 		}
		// }
		// var filtroMaestros = arrayMaestros_719.filter(maestro => (maestro.CTA_MAY == ctaMayor) && (maestro.SUB_CTA == subCta) && (maestro.AUX_MAE == aux))
		_ventanaDatos({
			titulo: "VENTANA PLAN DE CUENTAS",
			columnas: ["CTA_MAY", "SUB_CTA", "AUX_MAE", "NOMBRE_MAE", "TIPO_MAE"],
			data: $_ArrayCuentasINV_022,
			callback_esc: function () {
				$(`#cta${INDICE}_INV022`).focus();
			},
			callback: function (data) {
				document.getElementById(`cta${INDICE}_INV022`).value = (data.CTA_MAY.trim() + data.SUB_CTA.trim() + data.AUX_MAE.trim())
				_enterInput(`#cta${INDICE}_INV022`);
			}
		});
	}
}

function _ventanaTercerosINV_022(e) {
	console.debug(e, 'evento F8')
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		for (i in $_ArrayTercerosINV_022) {
			$_ArrayTercerosINV_022[i]['IDENTIFICACION'] = $_ArrayTercerosINV_022[i]['COD'];
		};
		_ventanaDatos_lite_v2({
			titulo: 'VENTANA DE TERCEROS',
			data: $_ArrayTercerosINV_022,
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
				// SAL201.COD_NIT = data.COD.trim(); SAL201.NOMBRE = data.NOMBRE_NIT;
				// document.getElementById("nit_SAL201").value = SAL201.COD_NIT;
				// _enterInput('#nit_SAL201');
			}
		});
	}
}

function _ventanaCentroCostosINV_022(e) {
	console.debug(e, 'evento F8')
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		for (i in $_ArrayCentroCostosINV022) {
			$_ArrayCentroCostosINV022[i]["DESCRIPCION"] = $_ArrayCentroCostosINV022[i]["DESCRIP"];
		}
		_ventanaDatos({
			titulo: "VENTANA DE CENTROS DE COSTOS",
			columnas: ["COD", "NOMBRE", "DESCRIPCION"],
			data: $_ArrayCentroCostosINV022,
			callback_esc: () => { $("#centcosto_SAL201").focus(); },
			callback: (data) => {
				console.log("centro de costos")
				// document.querySelector('#centcosto_SAL201').value = (data.COD.trim());
				_enterInput(`#nroCosto${INDICE}`);
			}
		});
	}
}

// -----------------  validaciones -------------------- 
function iniciarProcesoINV022() {
	switch (PUC_USU) {
		case "1":
			INV022.MAY_RET1 = "2365";
			INV022.MAY_RET2 = "2367";
			INV022.MAY_RET3 = "2368";
			INV022.MAY_IVA = "2408";
			INV022.MAY_ANTICIPO_W = "1330";
			break;
		case "2":
			INV022.MAY_RET1 = "2445";
			INV022.MAY_RET2 = "2447";
			INV022.MAY_IVA = "2510";
			INV022.MAY_ANTICIPO_W = "1330";
			break;
		case "3":
			INV022.MAY_RET1 = "2365";
			INV022.MAY_RET2 = "2365";
			INV022.MAY_RET3 = "2368";
			INV022.MAY_IVA = "2408";
			INV022.MAY_ANTICIPO_W = "1330";
			break;
		case "4":
			INV022.MAY_RET1 = "2436";
			INV022.MAY_RET2 = "2437";
			INV022.MAY_IVA = "2445";
			INV022.MAY_ANTICIPO_W = "1420";
			break;
	}

	document.getElementById("usuario_L").innerHTML = $_USUA_GLOBAL[0].NOMBRE;
	document.getElementById("transMSG1_INV022").value = "101";
	document.getElementById("nroMSG1_INV022").value = "121514141";

	INV022.BASE_MIN_W = Math.round($_USUA_GLOBAL[0].SAL_MIN * 1.43);

	// let URL = get_url("APP/INVENT/INV022.DLL");
	// let parametros = INV022.trans_022_lnk.concat(INV022.comprob_022_lnk) + '$' + INV022.nit_022_lnk + '$' + ;
	// const datos_envio = datosEnvio() + '1' + '|' + parametros;
	// postData(
	// 	{
	// 		datosh: datos_envio
	// 	}, URL)
	// 	.then(data => {
	// 		console.log(data, 'data INV022')
	// 		const res = data.split('|');
	// 		SAL201_COBOL.RESULTADO_PASO = res[0];
	// 	})

	datoCodigoINV022();
}

function mostrarCtasINV022() {
	// MOVE 1 TO POW-ENABLE OF RES-GRUPO-B.


	document.getElementById("display1_L").value = "CLIC EN EL BOTON RESUMEN DE GRUPO PARA VER RESUMEN";
	// document.getElementById("proveedor_INV022").value =
	// 	document.getElementById("nit_INV022").value = 

}

function datoCodigoINV022() {
	INDICE < 1 ? INDICE = 1 : false;
	if (INDICE > 13) {
		INDICE = 13;
		confirmarINV022();
	}
	INV022.LN = INDICE + 13;
	(NIT_USU == 891855847 && INDICE == 1) ? INDICE = 2 : false;

	// document.getElementById("") "falta"

	validarCtaINV022(`#cta${INDICE}`);

}

function validarCtaINV022(div) {
	validarInputs(
		{
			form: div,
			orden: '1'
		}, function () {
			if (INDICE == 1) {
				validarCtaINV022(div);
			} else {
				INDICE = INDICE - 1;
				validarCtaINV022(div);
			}
		},
		function () {
			INV022[`cta_tab${INDICE}`] = document.getElementById(`cta${INDICE}_INV022`).value.trim().toUpperCase();
			if (INV022[`cta_tab${INDICE}`].trim() == "") { validarCtaINV022(div) }
			else {
				mostrarCodigoINV022();
			}
		}
	)
}

function mostrarCodigoINV022() {
	if (INV022[`MAYOR_TAB${INDICE}`] == "") {
		INDICE = INDICE + 1;
		document.getElementById(`descripcion${INDICE}_INV022`).value = "";
		document.getElementById(`tercero${INDICE}_INV022`).value = "";
		document.getElementById(`valor${INDICE}_INV022`).value = "";
		document.getElementById(`baseGrav${INDICE}_INV022`).value = "";
		document.getElementById(`comprob${INDICE}_INV022`).value = "";
		document.getElementById(`año${INDICE}_INV022`).value = "";
		document.getElementById(`mes${INDICE}_INV022`).value = "";
		document.getElementById(`dia${INDICE}_INV022`).value = "";
		document.getElementById(`nroCosto${INDICE}_INV022`).value = "";
		document.getElementById(`nombreCosto${INDICE}_INV022`).value = "";
		INV022.valor_tab13 = mostrarNetoINV022();
		validarCtaINV022(`#cta${INDICE}`);
	} else {
		const result = $_ArrayCuentasINV_022.find(e => (e.CTA_MAY + e.SUB_CTA + e.AUX_MAE == INV022[`cta_tab${INDICE}`].trim()));
		if (result == undefined) {
			CON851('01', '01', validarCtaINV022(`#cta${INDICE}`), 'error', 'error');
		} else {
			INV022.result_cuentas = result;
			INV022.llave_cta = INV022.result_cuentas.CTA_MAY + INV022.result_cuentas.SUB_CTA + INV022.result_cuentas.AUX_MAE;
			document.getElementById(`descripcion${INDICE}_INV022`).value = result.NOMBRE_MAE;
			INDICE == 1 ? document.getElementById(`baseGrav${INDICE}_INV022`).value = valor_total_lnk : false;
			((INDICE == 2 || INDICE == 3 || INDICE == 4) && "falta") ? CON851('04', '04', validarCtaINV022(`#cta${INDICE}`), 'error', 'error') : datoCostoINV022();
		}
	}
}

function datoCostoINV022() {
	switch ($_USUA_GLOBAL[0].COSTO) {
		case "1":
			INV022[`nroCosto${INDICE}`] = "0000";
			document.getElementById(`nroCosto${INDICE}_INV022`).value = INV022[`nroCosto${INDICE}`];
			// mostrarCostoINV022();
			break;
		case "2":
			if (parseFloat([`MAY1_TAB${INDICE}`]) > 4 && "falta") {
				INV022[`nroCosto${INDICE}`] = "0000";
				document.getElementById(`nroCosto${INDICE}_INV022`).value = INV022[`nroCosto${INDICE}`];
				INV022.nombreCosto = "";
			}
			// else {
			// 	mostrarCostoINV022();
			// }
			break;
		case "3":
			if (parseFloat([`MAY1_TAB${INDICE}`]) < 4 && "falta") {
				INV022[`nroCosto${INDICE}`] = "0000";
				document.getElementById(`nroCosto${INDICE}_INV022`).value = INV022[`nroCosto${INDICE}`];
				INV022.nombreCosto = "";
				// mostrarCostoINV022();
			}
			break;
		default:
			INV022[`nroCosto${INDICE}`] = "0000";
			document.getElementById(`nroCosto${INDICE}_INV022`).value = INV022[`nroCosto${INDICE}`];
			// mostrarCostoINV022();
			break;
	}
	if (INV022[`nroCosto${INDICE}`] == "") {
		INV022[`nroCosto${INDICE}`] = "0000";
	}
	validarCentroCostoINV022(`#nroCosto${INDICE}`);
}

function validarCentroCostoINV022(div) {
	validarInputs(
		{
			form: div,
			orden: '1'
		}, function () { validarCtaINV022(`#cta${INDICE}`) },
		function () {
			INV022[`costo_tab${INDICE}`] = document.getElementById(`nroCosto${INDICE}_INV022`).value.trim().toUpperCase();
			if (INV022[`costo_tab${INDICE}`].trim() == "") { validarCentroCostoINV022(div) }
			else {
				mostrarCostoINV022();
			}
		}
	)
}

function mostrarCostoINV022() {
	document.getElementById(`nroCosto${INDICE}_INV022`).value = INV022[`costo_tab${INDICE}`];
	INV022.COD_COSTO = INV022[`costo_tab${INDICE}`];
	const result = $_ArrayCentroCostosINV022.find(e => e.COD == INV022.COD_COSTO);
	if (result == undefined) {
		if (INV022.COD_COSTO == "0000") {
			// let URL = get_url("APP/INVENT/INV022.DLL");
			// let parametros = INV022.COD_COSTO;
			// const datos_envio = datosEnvio() + '2' + '|' + parametros;
			// postData(
			// 	{
			// 		datosh: datos_envio
			// 	}, URL)
			// 	.then(data => {
			// 		console.log(data, 'data sal201')
			// 		const res = data.split('|');
			// 		INV022_COBOL.RESULTADO_PASO2 = res[0];
			// 	})
		}
		else {
			CON851('01', '01', datoCostoINV022, 'error', 'error');
		}
	} else {
		document.getElementById(`nroCosto${INDICE}_INV022`).value = INV022[`costo_tab${INDICE}`];
		document.getElementById(`nombreCosto${INDICE}_INV022`).value = INV022[`costo_tab${INDICE}`];
		datoNitINV022();
	}
}

function datoNitINV022() {
	if (INDICE > 4 && INDICE < 13) {
		if (INV022[`nit_tab${INDICE}`].trim() == "") {
			INV022[`nit_tab${INDICE}`] = INV022_COBOL.NIT_W;
			validarNitINV022(`#tercero${INDICE}`);
		}
	} else {
		INV022[`nit_tab${INDICE}`] = INV022_COBOL.NIT_W;
		mostrarNitINV022();
	}
}

function validarNitINV022(div) {
	document.getElementById(`tercero${INDICE}_INV022`).value = INV022[`nit_tab${INDICE}`];
	validarInputs(
		{
			form: div,
			orden: '1'
		}, function () { validarCentroCostoINV022(`nroCosto${INDICE}`) },
		function () {
			INV022[`nit_tab${INDICE}`] = document.getElementById(`tercero${INDICE}_INV022`).value.trim().toUpperCase();
			if (INV022[`nit_tab${INDICE}`].trim() == "") { validarNitINV022(div) }
			else {
				mostrarNitINV022();
			}
		}
	)
}

function mostrarNitINV022() {
	document.getElementById(`tercero${INDICE}_INV022`).value = INV022[`nit_tab${INDICE}`];
	const result = $_ArrayTercerosINV_022.find(e => e.COD == INV022[`nit_tab${INDICE}`].trim());
	INV022.result_terceros = result;
	if (result == undefined) {
		CON851('01', '01', mostrarNitINV022(`#tercero${INDICE}`), 'error', 'error');
	} else {
		document.getElementById("display1_L").value = result.NOMBRE;
		datoBaseINV022();
	}
}

function datoBaseINV022() {
	if (parseFloat(INV022.result_cuentas.PORCENT_RET) > 0) {
		if (INV022[`valor_base_tab${INDICE}`] == undefined || parseInt(INV022[`valor_base_tab${INDICE}`]) < 1) {
			switch (INDICE) {
				case 2:
					($_USUA_GLOBAL[0].IVA_S == "C") ? INV022[`valor_base_tab${INDICE}`] = INV022.valorTotal : INV022[`valor_base_tab${INDICE}`] = Math.round(INV022.valorTotal - INV022.valor_base_tab1);
					break;
				case 3:
					INV022[`valor_base_tab${INDICE}`] = Math.round(INV022.valorTotal - INV022.valor_base_tab2);
					break;
				default:
					INV022[`valor_base_tab${INDICE}`] = INV022.valor_base_tab2;
					break;
			}
		}
		document.getElementById(`baseGrav${INDICE}_INV022`).value = INV022.valorTotal;
		validarBaseGravableINV022(`#baseGrav${INDICE}`);
	} else {
		INV022[`valor_base_tab${INDICE}`] = "";
		datoDocumINV022();
	}
}

function validarBaseGravableINV022(div) {
	validarInputs(
		{
			form: div,
			orden: '1'
		}, function () { validarCentroCostoINV022(`#nroCosto${INDICE}`) },
		function () {
			INV022[`valor_base_tab${INDICE}`] = document.getElementById(`baseGrav${INDICE}_INV022`).value.trim().toUpperCase();
			if (INV022[`valor_base_tab${INDICE}`].trim() == "" || parseInt(INV022[`valor_base_tab${INDICE}`]) < 1) {
				CON851('01', '01', validarCentroCostoINV022(`#nroCosto${INDICE}`), 'error', 'error');
			}
			else {
				mostrarRetINV022();
			}
		}
	)
}

function mostrarRetINV022() {
	document.getElementById(`baseGrav${INDICE}_INV022`).value = INV022[`valor_base_tab${INDICE}`];
	if (INV022[`valor_base_tab${INDICE}`].trim() == "" || parseInt(INV022[`valor_base_tab${INDICE}`]) < 1) {
		INV022[`valor_tab${INDICE}`] = "0";
	} else {
		if ((INV022.llave_cta == "23658500001" || INV022.llave_cta == "23657000001") && INV022.result_cuentas.PORCENT_RET.trim() == "9.66") {
			INV022.VALOR_TMP = Math.round(parseFloat(INV022[`valor_base_tab${INDICE}`]) * parseFloat(INV022.PORCENT_RET) * -0.001);
		} else {
			if (NIT_USU == 822005102) {
				if (parseFloat(INV022[`valor_tab${INDICE}`]) > 0 && INV022.result_cuentas.CTA_MAY == "2408") {
					INV022.VALOR_TMP = parseFloat(INV022[`valor_tab${INDICE}`]);
				} else {
					INV022.VALOR_TMP = Math.round(parseFloat(INV022[`valor_base_tab${INDICE}`]) * parseFloat(INV022.PORCENT_RET) * -0.01);
				}
			} else {
				INV022.VALOR_TMP = Math.round(parseFloat(INV022[`valor_base_tab${INDICE}`]) * parseFloat(INV022.PORCENT_RET) * -0.01);
			}
		}
		INV022[`valor_tab${INDICE}`] = INV022.VALOR_TMP;
	}
}

function datoDocumINV022() {
	if (INV022_COBOL.DOCUM_W.substring(1, 2).trim() == "" || INV022_COBOL.DOCUM_W.substring(1, 2).trim() == undefined) {
		INV022[`docum_tab${INDICE}`] = INV022_COBOL.FACTURA_W;
	} else {
		INV022[`docum_tab${INDICE}`] = INV022_COBOL.DOCUM_W;
	}

	if ([`MAYOR_TAB${INDICE}`] == "1380" || "1330") {
		validarComprobanteINV022(`#comprob${INDICE}`);
	}
}

function validarComprobanteINV022(div) {
	validarInputs(
		{
			form: div,
			orden: '1'
		}, function () { validarBaseGravableINV022(`#baseGrav${INDICE}`) },
		function () {
			INV022[`docum_tab${INDICE}`] = document.getElementById(`comprob${INDICE}_INV022`).value.trim().toUpperCase();
			if (INV022[`docum_tab${INDICE}`].trim() == "") {
				CON851('01', '01', validarComprobanteINV022(div), 'error', 'error');
			}
			else {
				mostrarDocumentoINV022();
			}
		}
	)
}

function mostrarDocumentoINV022() {
	mostrarCod();
	function mostrarCod() {
		if (INV022[`MAYOR_TAB${INDICE}`] == "") {
			INDICE = INDICE + 1;
			document.getElementById(`descripcion${INDICE}_INV022`).value = "";
			document.getElementById(`tercero${INDICE}_INV022`).value = "";
			document.getElementById(`valor${INDICE}_INV022`).value = "";
			document.getElementById(`baseGrav${INDICE}_INV022`).value = "";
			document.getElementById(`comprob${INDICE}_INV022`).value = "";
			document.getElementById(`año${INDICE}_INV022`).value = "";
			document.getElementById(`mes${INDICE}_INV022`).value = "";
			document.getElementById(`dia${INDICE}_INV022`).value = "";
			document.getElementById(`nroCosto${INDICE}_INV022`).value = "";
			document.getElementById(`nombreCosto${INDICE}_INV022`).value = "";
			INV022.valor_tab13 = mostrarNetoINV022();
			validarCtaINV022(`#cta${INDICE}`);
		} else {
			const result = $_ArrayCuentasINV_022.find(e => (e.CTA_MAY + e.SUB_CTA + e.AUX_MAE == INV022[`cta_tab${INDICE}`].trim()));
			INV022.result_cuentas = result;
			INV022.llave_cta = INV022.result_cuentas.CTA_MAY + INV022.result_cuentas.SUB_CTA + INV022.result_cuentas.AUX_MAE;
			if (result == undefined) {
				CON851('01', '01', validarCtaINV022(`#cta${INDICE}`), 'error', 'error');
			} else {
				document.getElementById(`descripcion${INDICE}_INV022`).value = result.NOMBRE_MAE;
				INDICE == 1 ? document.getElementById(`baseGrav${INDICE}_INV022`).value = valor_total_lnk : false;
				((INDICE == 2 || INDICE == 3 || INDICE == 4) && "falta") ? CON851('04', '04', validarCtaINV022(`#cta${INDICE}`), 'error', 'error') : false;
			}
		}
	}
	mostrarNit();
	function mostrarNit() {
		document.getElementById(`tercero${INDICE}_INV022`).value = INV022[`nit_tab${INDICE}`];
		const result = $_ArrayTercerosINV_022.find(e => e.COD == INV022[`nit_tab${INDICE}`].trim());
		if (result == undefined) {
			CON851('01', '01', mostrarNitINV022(`#tercero${INDICE}`), 'error', 'error');
		} else {
			document.getElementById("display1_L").value = result.NOMBRE;
		}
	}
	document.getElementById(`comprob${INDICE}_INV022`).value = INV022[`docum_tab${INDICE}`];
}

function datoValorINV022() {
	if (INDICE == 13) {
		if (INDICE == 2) {
			INV022[`valor_tab${INDICE_J}`] = parseFloat(INV022[`valor_tab${INDICE_J}`]) * -1;
		}
		document.getElementById(`valor${INDICE}_INV022`).value = INV022[`valor_tab${INDICE}`];
		switch (INDICE) {
			case 1:
				validarPositivoINV022();
				break;
			case 2:
				validarNegativoINV022();
				break;
			case 3:
				validarNegativoINV022();
				break;
			case 4:
				validarNegativoINV022();
				break;
		}
		INV022.valorTotal = mostrarNetoINV022();
		INV022[`fecha_ven_tab${INDICE}`] = INV022.fecha_vence_w;
		mostrarVenceINV022();
	}
	document.getElementById(`valor${INDICE}_INV022`).value = INV022[`valor_tab${INDICE}`];
	validarValorINV022(`#valor${INDICE}`);
}

function validarValorINV022(div) {
	validarInputs(
		{
			form: div,
			orden: '1'
		}, function () { validarBaseGravableINV022(`#baseGrav${INDICE}`) },
		function () {
			INV022[`valor_tab${INDICE}`] = document.getElementById(`valor${INDICE}_INV022`).value.trim().toUpperCase();
			// if (INV022[`valor_tab${INDICE}`].trim() == "") {
			// 	CON851('01', '01', validarComprobanteINV022(div), 'error', 'error');
			// }
			// else {
			mostrarValorINV022();
			// }
		}
	)
}

function mostrarValorINV022() {
	if (INDICE == 2) {
		INV022[`valor_tab${INDICE_J}`] = parseFloat(INV022[`valor_tab${INDICE_J}`]) * -1;
	}
	document.getElementById(`valor${INDICE}_INV022`).value = INV022[`valor_tab${INDICE}`];
	switch (INDICE) {
		case 1:
			validarPositivoINV022();
			break;
		case 2:
			validarNegativoINV022();
			break;
		case 3:
			validarNegativoINV022();
			break;
		case 4:
			validarNegativoINV022();
			break;
	}
	INV022.valorTotal = mostrarNetoINV022();
	setTimeout(datoVenceINV022(), 200);
}

function datoVenceINV022() {
	if ([`MAY1_TAB${INDICE}`] != "2" || ([`MAYOR_TAB${INDICE}`] == INV022.MAY_RET1 || [`MAYOR_TAB${INDICE}`] == INV022.MAY_RET2 || [`MAYOR_TAB${INDICE}`] == INV022.MAY_RET3 || [`MAYOR_TAB${INDICE}`] == INV022.MAY_IVA)) {
		INV022[`fecha_ven_tab${INDICE}`] = INV022.FECHA_W;
		mostrarVenceINV022();
	} else {
		if (parseInt(INV022[`mes_ven_tab${INDICE}`]) < 1) {
			INV022[`fecha_ven_tab${INDICE}`] = INV022.fecha_vence_w;
		}
		validarAñoINV022(`#año${INDICE}`);
	}
}

function validarAñoINV022(div) {
	validarInputs(
		{
			form: div,
			orden: '1'
		}, function () { validarValorINV022(`#valor${INDICE}`) },
		function () {
			INV022[`año_ven_tab${INDICE}`] = document.getElementById(`año${INDICE}_INV022`).value.trim().toUpperCase();
			if (isNaN(INV022[`año_ven_tab${INDICE}`])) {
				CON851('01', '01', validarAñoINV022(div), 'error', 'error');
			}
			else {
				validarMesINV022(`#mes${INDICE}`);
			}
		}
	)
}

function validarMesINV022(div) {
	validarInputs(
		{
			form: div,
			orden: '1'
		}, function () { validarAñoINV022(`#año${INDICE}`) },
		function () {
			INV022[`mes_ven_tab${INDICE}`] = document.getElementById(`mes${INDICE}_INV022`).value.trim().toUpperCase();
			if (parseInt(INV022[`mes_ven_tab${INDICE}`]) < 1 || parseInt(INV022[`mes_ven_tab${INDICE}`]) > 12) {
				CON851('01', '01', validarMesINV022(div), 'error', 'error');
			}
			else {
				validarDiaINV022(`#dia${INDICE}`);
			}
		}
	)
}

function validarDiaINV022(div) {
	validarInputs(
		{
			form: div,
			orden: '1'
		}, function () { validarMesINV022(`#mes${INDICE}`) },
		function () {
			INV022[`dia_ven_tab${INDICE}`] = document.getElementById(`dia${INDICE}_INV022`).value.trim().toUpperCase();
			if (parseInt(INV022[`dia_ven_tab${INDICE}`]) < 1 || parseInt(INV022[`dia_ven_tab${INDICE}`]) > 31) {
				CON851('01', '01', validarDiaINV022(div), 'error', 'error');
			}
			else {
				INV022[`fecha_ven_tab${INDICE}`] = INV022[`año_ven_tab${INDICE}`] + INV022[`mes_ven_tab${INDICE}`] + INV022[`dia_ven_tab${INDICE}`];
				leerFechaINV022();
			}
		}
	)
}

function leerFechaINV022() {
	if (parseInt(INV022[`fecha_ven_tab${INDICE}`]) < INV022.FECHA_W) {
		CON851('37', '37', null, 'error', 'error');
		if (trans_022_lnk.substring(0, 1) == "1") {
			datoVenceINV022();
		}
	} else {
		if (parseInt(INV022.mes_ven_w) > 0 && parseInt(INV022[`fecha_ven_tab${INDICE}`]) > parseInt(INV022.fecha_vence_w)) {
			CON851('37', '37', null, 'error', 'error');
			if (trans_022_lnk.substring(0, 1) == "1") {
				datoVenceINV022();
			}
		}
	}
}

function mostrarVenceINV022() {
	document.getElementById(`año${INDICE}_INV022`).value = INV022[`año_ven_tab${INDICE}`];
	document.getElementById(`mes${INDICE}_INV022`).value = INV022[`mes_ven_tab${INDICE}`];
	document.getElementById(`dia${INDICE}_INV022`).value = INV022[`dia_ven_tab${INDICE}`];
	otroItemINV022();
}

function otroItemINV022() {
	INV022.valorTotal = mostrarNetoINV022();
	INDICE = INDICE + 1;
	datoCodigoINV022();
}

function confirmarINV022() {
	if ("") {
	}
	CON851P('01', () => { datoCodigoINV022(); INV022.sw_ok = "N" }, () => { datosMovINV022(); INV022.sw_ok = "S" });
}

function datosMovINV022() {
	let URL = get_url("APP/INVENT/INV022.DLL");
	let parametros = INV022.LLAVE_W + '$' + INV022_COBOL.NIT_W + '$' + INV022.trans_022_lnk + '$' + INV022_COBOL.FACTURA_W + '$' + INV022_COBOL.DOCUM_W + '$' + INV022.FECHA_W + '$' + INV022.fecha_vence_w + '$' + localStorage.Usuario + '$' + INV022_COBOL.DETALLE_W;
	const datos_envio = datosEnvio() + '3' + '|' + parametros;
	postData(
		{
			datosh: datos_envio
		}, URL)
		.then(data => {
			console.log(data, 'data INV022')
			const res = data.split('|');
			SAL201_COBOL.RESULTADO_PASO8 = res[0];
		})
}

function mostrarNetoINV022() {
	INV022.valor_tab13 = Math.round((INV022.valorTotal + INV022.valor_tab1 + INV022.valor_tab2 + INV022.valor_tab3 + INV022.valor_tab4
		+ INV022.valor_tab5 + INV022.valor_tab6 + INV022.valor_tab7 + INV022.valor_tab8 + INV022.valor_tab9 + INV022.valor_tab10 + INV022.valor_tab11 + INV022.valor_tab12) * -1);
	document.getElementById("valor_tab13_INV022").value = INV022.valor_tab13;
	return INV022.valor13;
}

function validarPositivoINV022() {
	if (INV022.trans_022_lnk.substring(0, 1) == "1" && parseFloat(INV022[`valor_tab${INDICE}`]) < 0) {
		CON851('46', '46', null, 'error', 'error');
		if (parseInt(INV022.result_cuentas.PORCENT_RET) > 0) {
			datoBaseINV022();
		} else {
			datoValorINV022();
		}
	} else {
		if (INV022.trans_022_lnk.substring(0, 1) == "2" && parseFloat(INV022[`valor_tab${INDICE}`]) > 0) {
			if (parseInt(INV022.result_cuentas.PORCENT_RET) > 0) {
				datoBaseINV022();
			} else {
				datoValorINV022();
			}
		}
	}
}

function validarNegativoINV022() {
	if (INV022.trans_022_lnk.substring(0, 1) == "1" && parseFloat(INV022[`valor_tab${INDICE}`]) > 0) {
		CON851('46', '46', null, 'error', 'error');
		if (parseInt(INV022.result_cuentas.PORCENT_RET) > 0) {
			datoBaseINV022();
		} else {
			datoValorINV022();
		}
	} else {
		if (INV022.trans_022_lnk.substring(0, 1) == "2" && parseFloat(INV022[`valor_tab${INDICE}`]) < 0) {
			if (parseInt(INV022.result_cuentas.PORCENT_RET) > 0) {
				datoBaseINV022();
			} else {
				datoValorINV022();
			}
		}
	}
}



function leerArticulosINV022() {
	const result = $_ArrayArticulosINV022.find(e => e.LLAVE_ART == INV022.cod_art_inv);
	INV022.result_articulos = result;
	if (result != undefined) { asignarTablaINV022(); }
}

function asignarTablaINV022() {
	switch (INV022.result_articulos.IVA_ART) {
		case "0":
			INV022.tar_w = "0";
			break;
		case "1":
			INV022.tar_w = $_USUA_GLOBAL[0].IVA1;
			break;
		case "2":
			INV022.tar_w = $_USUA_GLOBAL[0].IVA2;
			break;
		case "3":
			INV022.tar_w = $_USUA_GLOBAL[0].IVA3;
			break;
	}

	switch (INV022.tar_w) {
		case "16":
			INV022[`cta_tab1`] = "24080100004";
			parseFLoat(INV022[`valor_base_tab1`]) += parseFloat(INV022.vlr_inv);
			INV022[`valor_tab1`] = parseFLoat(INV022[`valor_base_tab1`]) * parseFloat(INV022.tar_w) / 100;
			if (parseFLoat(INV022[`valor_base_tab1`]) > 0) {
				INV022[`valor_base_tab1`] = parseFloat(INV022[`valor_base_tab1`]) * -1;
			}
			break;
		case "10":
			INV022[`cta_tab5`] = "24080100009";
			parseFLoat(INV022[`valor_base_tab5`]) += parseFloat(INV022.vlr_inv);
			INV022[`valor_tab5`] = parseFLoat(INV022[`valor_base_tab5`]) * parseFloat(INV022.tar_w) / 100;
			if (parseFLoat(INV022[`valor_base_tab5`]) > 0) {
				INV022[`valor_base_tab5`] = parseFloat(INV022[`valor_base_tab5`]) * -1;
			}
			break;
	}

	switch (INV022.result_articulos.AUTORET_ART) {
		case "3.5":
			INV022[`cta_tab2`] = "23654000001";
			parseFLoat(INV022[`valor_base_tab2`]) += parseFloat(INV022.vlr_inv);
			INV022[`valor_tab2`] = parseFLoat(INV022[`valor_base_tab2`]) * parseFloat(INV022.result_articulos.AUTORET_ART) / 100;
			break;
		case "1.5":
			INV022[`cta_tab6`] = "23654000002";
			parseFLoat(INV022[`valor_base_tab6`]) += parseFloat(INV022.vlr_inv);
			INV022[`valor_tab6`] = parseFLoat(INV022[`valor_base_tab6`]) * parseFloat(INV022.result_articulos.AUTORET_ART) / 100;
			break;
		case "0.1":
			INV022[`cta_tab7`] = "23654000003";
			parseFLoat(INV022[`valor_base_tab7`]) += parseFloat(INV022.vlr_inv);
			INV022[`valor_tab7`] = parseFLoat(INV022[`valor_base_tab7`]) * parseFloat(INV022.result_articulos.AUTORET_ART) / 100;
			break;
		default:
			INV022[`cta_tab2`] = "23654000001";
			parseFLoat(INV022[`valor_base_tab2`]) += parseFloat(INV022.vlr_inv);
			INV022[`valor_tab2`] = parseFLoat(INV022[`valor_base_tab2`]) * 3.5 / 100;
			break;
	}

	consultarTerceroINV022();

	if (INV022.EXENT_RET_TER == "S") {
		inicializarTablaINV022("2");
		inicializarTablaINV022("6");
		inicializarTablaINV022("7");
	}
}

function calcularRetencionesINV022() {
	consultarTerceroINV022();
	if (INV022.trans_022_lnk.substring(0, 2) == "2B") {
		inicializarTablaINV022("2");
		inicializarTablaINV022("3");
		inicializarTablaINV022("6");
		asignarIvaINV022();
	} else {
		if (INV022.REG_IVA_TER == "2") {
			parseFLoat(INV022[`valor_base_tab1`]) = parseFLoat(INV022[`valor_base_tab1`]) * .5;
			parseFLoat(INV022[`valor_tab1`]) = parseFLoat(INV022[`valor_tab1`]) * .5;
			INV022[`cta_tab1`] = "24080100005";
			INV022[`cta_tab3`] = "23670100001";
			parseFLoat(INV022[`valor_base_tab3`]) = parseFLoat(INV022[`valor_tab1`]) * 2;
			parseFLoat(INV022[`valor_tab3`]) = parseFLoat(INV022[`valor_tab1`]) * -1;
		} else {
			if (INV022.RET_IVA_COMPRA_TER == "S"){
				
			}
		}
	}
}

function asignarIvaINV022() {
	INV022[`cta_tab${INDICE}`] = "24080100001";
	parseFloat(INV022[`valor_base_tab8`]) += parseFloat(INV022[`valor_base_tab1`]);
	parseFloat(INV022[`valor_base_tab8`]) += parseFloat(INV022[`valor_base_tab5`]);
	parseFloat(INV022[`valor_tab8`]) += parseFloat(INV022[`valor_tab1`]);
	parseFloat(INV022[`valor_tab8`]) += parseFloat(INV022[`valor_tab5`]);

}

function inicializarTablaINV022(posicion) {
	INV022[`cta_tab${posicion}`] = "";
	INV022[`costo_tab${posicion}`] = "";
	INV022[`sucursal_tab${posicion}`] = "";
	INV022[`docum_tab${posicion}`] = "";
	INV022[`nit_tab${posicion}`] = "";
	INV022[`valor_tab${posicion}`] = "";
	INV022[`valor_base_tab${posicion}`] = "";
	INV022[`fecha_ven_tab${posicion}`] = "";
}

function consultarTerceroINV022() {
	let datos_envio = datosEnvio()
	datos_envio += '|'
	datos_envio += nit_con_ceros;
	SolicitarDll({ datosh: datos_envio }, dataCON110C_02, get_url('/APP/CONTAB/CON110C_02.DLL'));
	function dataCON110C_02(data) {
		var date = data.split("|");
		INV022.EXENT_RET_TER = date[54].trim();
		INV022.REG_IVA_TER = date[47].trim();
		INV022.RET_IVA_COMPRA_TER = date[52].trim();
	}
}


