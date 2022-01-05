// DM -- SER104C -- OPCION 9-7-3-3

var SER104C = [];
var $_ArrayconveniosSER104C, $_ArraygruposSER104C, $_ArrayarticulosSER104C
	, $_ArraycodigosSER104C, $_ArrayValorConvenioSER104C;

var MountMask_104C = new IMask($('#valorconvenio_SER104C')[0], { mask: Number, thousandsSeparator: ',' });
var LimiteMask_104C = new IMask($('#limite_SER104C')[0], { mask: Number, thousandsSeparator: ',' });
var MinimoMask_104C = new IMask($('#minimo_SER104C')[0], { mask: Number, min: 0, max: 99999, scale: 3, thousandsSeparator: ',', radix: '.', padFractionalZeros: true });
var MaximoMask_104C = new IMask($('#maximo_SER104C')[0], { mask: Number, min: 0, max: 99999, scale: 3, thousandsSeparator: ',', radix: '.', padFractionalZeros: true });

$(document).ready(function () {
	loader('hide');
	nombreOpcion('9, 7, 3, 3 - Maestro de convenio medicamentos');
	_inputControl('reset'); _inputControl('disabled');
	_toggleF8([
		{ input: 'codconv', app: 'SER104C', funct: _ventanaMostrarConveniosSER104C }
		, { input: 'grupo', app: 'SER104C', funct: _ventanaMostrarGruposSER104C },
		, { input: 'codigogrupo', app: 'SER104C', funct: _ventanaMostrarCodigosSER104C }
	]);
	iniciarObjetosFNF8();
});

function _ventanaMostrarConveniosSER104C(e) {
	console.debug(e, 'evento F8')
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA DE CONVENIOS",
			columnas: ["COD", "DESCRIP"],
			data: $_ArrayconveniosSER104C,
			callback_esc: () => { $('#codconv_SER104C').focus(); },
			callback: (data) => {
				SER104C.COD_TAR = data.COD; SER104C.DESCRIP_TAR = data.DESCRIP;
				document.querySelector('#codconv_SER104C').value = (SER104C.COD_TAR + " - " + SER104C.DESCRIP_TAR);
				_enterInput('#codconv_SER104C');
			}
		});
	}
}

function _ventanaMostrarGruposSER104C(e) {
	console.debug(e, 'evento F8')
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA DE GRUPOS",
			columnas: ["TIPO", "GRUPO", "DESCRIP"],
			data: $_ArraygruposSER104C.filter(element => element.TIPO == '0'),
			callback_esc: () => { $('#grupo_SER104C').focus(); },
			callback: (data) => {
				SER104C.TIPO_GRUPO = data.TIPO; SER104C.GRUPO = data.GRUPO; SER104C.DESCRIP_GRUPO = data.DESCRIP;
				document.querySelector('#grupo_SER104C').value = (SER104C.GRUPO + " - " + SER104C.DESCRIP_GRUPO);
				_enterInput('#grupo_SER104C');
			}
		});
	}
}

function _ventanaMostrarCodigosSER104C(e) {
	console.debug(e, 'evento F8')
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		for (i in $_ArrayarticulosSER104C) {

			$_ArrayarticulosSER104C[i]['CODIGO'] = $_ArrayarticulosSER104C[i]['LLAVE_ART'];
			$_ArrayarticulosSER104C[i]['TIPO'] = $_ArrayarticulosSER104C[i]['LLAVE_ART'].substring(0, 1);
			$_ArrayarticulosSER104C[i]['GRUPO'] = $_ArrayarticulosSER104C[i]['LLAVE_ART'].substring(1, 3);
			$_ArrayarticulosSER104C[i]['NRO'] = $_ArrayarticulosSER104C[i]['LLAVE_ART'].substring(3, 15);
			switch (parseInt(SER104C.novedad.id)) {
				case 7:
				case 9:

					break;
				case 8:
					break;
			}
		};
		_ventanaDatos({
			titulo: "VENTANA DE ARTICULOS",
			columnas: ["TIPO", "GRUPO", "NRO", "DESCRIP_ART", "VR_VENTA_1", "CODIGO", 'DESCRIP_ART', 'BARRAS', 
			'MARCA', 'REFER', 'UNIDAD', 'IVA-+', 'PRECIO', 'CUENTA', 'STOCK-MIN', 'STOCK-MAX', 'POL-VEN', 'FECHA', 
			'ULT-COMPRA', 'U-CONV', 'USO', 'VLR-REFER', 'PAQUETE', 'PRINCIPAL'],
			data: $_ArrayarticulosSER104C.filter(element => element.LLAVE_ART.substring(1, 3) == SER104C.id_grupo.GRUPO),
			callback_esc: () => { $('#codigogrupo_SER104C').focus(); },
			callback: data => {
				console.log(data, 'data')
				SER104C.LLAVE_ART = data.LLAVE_ART; SER104C.DESCRIP_ART = data.DESCRIP_ART; SER104C.VR_VENTA_1 = data.VR_VENTA_1; SER104C.NRO = data.NRO;
				document.querySelector('#codigogrupo_SER104C').value = (SER104C.NRO).toUpperCase();
				_enterInput('#codigogrupo_SER104C');
			}
		});
	}
}

function iniciarObjetosFNF8() {
	SER104C = []; $_ArrayconveniosSER104C = []; $_ArrayarticulosSER104C = [];
	obtenerDatosCompletos({ nombreFd: 'TARIFAS' }, (data) => {
		$_ArrayconveniosSER104C = data.TARIFAS;
		obtenerDatosCompletos({ nombreFd: 'MEDICAMENTOS' }, (data) => {
			$_ArraymedicamentosSER104C = data.MEDICAMENTOS;
			CON850(_evaluarCON850_SER104C);
		}, 'ONLY')
	}, 'ONLY')
}

function _evaluarCON850_SER104C(novedad) {
	_inputControl('reset'); _inputControl('disabled');
	SER104C.novedad = novedad;
	document.getElementById('oper_SER104C').value = localStorage.Usuario;
	document.getElementById('fecha_SER104C').value = moment().format('YYYY/MM/DD');
	document.getElementById('novSER104C').value = (SER104C.novedad.id + ' - ' + SER104C.novedad.descripcion)
	console.log(novedad);
	// document.getElementById('novSER104c').value = novedad.id;
	switch (parseInt(novedad.id)) {
		case 7:
			obtenerDatosCompletos({ nombreFd: 'GRUPOS' }, (data) => {
				$_ArraygruposSER104C = data.GRUPOS;
				obtenerDatosCompletos({ nombreFd: 'ARTICULOS' }, (data) => {
					$_ArrayarticulosSER104C = data.ARTICULOS;
					validarCodigoTarifaSER104C();
				}, 'ONLY');
			}, 'ONLY');
			break;
		case 8:
			obtenerDatosCompletos({ nombreFd: 'GRUPOS' }, (data) => {
				$_ArraygruposSER104C = data.GRUPOS;
				obtenerDatosCompletos({ nombreFd: 'ARTICULOS' }, (data) => {
					$_ArrayarticulosSER104C = data.ARTICULOS;
					validarCodigoTarifaSER104C();
				}, 'ONLY');
			}, 'ONLY');
			break;
		case 9:
			obtenerDatosCompletos({ nombreFd: 'GRUPOS' }, (data) => {
				$_ArraygruposSER104C = data.GRUPOS;
				obtenerDatosCompletos({ nombreFd: 'ARTICULOS' }, (data) => {
					$_ArrayarticulosSER104C = data.ARTICULOS;
					validarCodigoTarifaSER104C();
				}, 'ONLY');
			}, 'ONLY');
			break;
		default:
			_toggleNav();
			break;
	}
}

function validarCodigoTarifaSER104C() {
	validarInputs(
		{
			form: "#codigoconvenio",
			orden: '1'
		}, _toggleNav,
		function () {
			SER104C['id_convenio'] = document.getElementById("codconv_SER104C").value.substring(0, 2).trim().toUpperCase();
			if (SER104C['id_convenio'].trim() == "") { validarCodigoTarifaSER104C() }
			else {
				const result = $_ArrayconveniosSER104C.find(element => element.COD == SER104C.id_convenio);
				SER104C.id_convenio = result;
				if (result == undefined) { CON851('01', '01', validarCodigoTarifaSER104C(), 'error', 'error'); }
				else {
					document.getElementById('codconv_SER104C').value = (result.COD.trim() + " - " + result.DESCRIP.trim());
					validarGrupoSER104C();
				}
			}
		}
	)
}

function validarGrupoSER104C() {
	validarInputs(
		{
			form: "#grupo",
			orden: '1'
		},
		() => { validarCodigoTarifaSER104C(); },
		function () {
			SER104C['id_grupo'] = document.getElementById("grupo_SER104C").value.substring(0, 2).toUpperCase();
			if (SER104C['id_grupo'].trim() == "") { validarGrupoSER104C() }
			else {
				const result = $_ArraygruposSER104C.find(element => element.TIPO == '0' && element.GRUPO == SER104C.id_grupo);
				SER104C.id_grupo = result;
				if (result == undefined) { CON851('03', '03', validarGrupoSER104C(), 'error', 'error'); }
				else {
					document.getElementById('grupo_SER104C').value = (result.GRUPO + " - " + result.DESCRIP);
					validarDatoArticulo_SER104C();
				}
			}
		}
	)
}

function validarDatoArticulo_SER104C() {
	validarInputs(
		{
			form: "#codigogrupo",
			orden: '1'
		},
		() => { validarGrupoSER104C(); },
		function () {
			SER104C['id_codigo'] = document.getElementById("codigogrupo_SER104C").value.trim().toUpperCase();
			console.log(SER104C.id_codigo, "datoscodigo");
			if (SER104C['id_codigo'].trim() == "") { validarDatoArticulo_SER104C() }
			else {
				SER104C.LLAVE_ART_NEW = '0' + SER104C.id_grupo.GRUPO + SER104C.id_codigo.substring(0, 13).trim();
				const result = $_ArrayarticulosSER104C.find(element => element.LLAVE_ART.substring(0, 15).trim() == SER104C.LLAVE_ART_NEW.substring(0, 15).trim());
				let result_tabmed = '';
				console.log(result, 'result')
				if (result == undefined) { CON851('01', 'El codigo ingresado no existe como articulo, creelo e intente nuevamente', validarDatoArticulo_SER104C(), 'error', 'error'); }
				else {
					result_tabmed = $_ArraymedicamentosSER104C.find(element => element.TARIF + element.ARTICULO.trim().toUpperCase() == SER104C.id_convenio.COD + SER104C.LLAVE_ART_NEW.trim().toUpperCase());
					switch (SER104C.novedad.id) {
						case '7':
							//si no existe
							if (result_tabmed) {
								CON851('00', '00', validarDatoArticulo_SER104C(), 'error', 'error');
							} else {
								document.getElementById('codigogrupo_SER104C').value = SER104C.LLAVE_ART_NEW.substring(3, 15);
								document.getElementById('descripcion_SER104C').value = result.DESCRIP_ART;
								validarValorConvenioSER104C();
							}
							break;
						case '8':
							if (result_tabmed) {
								document.getElementById('codigogrupo_SER104C').value = (SER104C.LLAVE_ART_NEW).substring(3, 15);
								document.getElementById('descripcion_SER104C').value = result.DESCRIP_ART;
								const resultDatos = $_ArraymedicamentosSER104C.find(element => element.ARTICULO.trim() == SER104C.LLAVE_ART_NEW.trim());
								document.getElementById('valorconvenio_SER104C').value = resultDatos.MONTO.trim();
								document.getElementById('regulado_SER104C').value = resultDatos.REGUL.trim();
								document.getElementById('limite_SER104C').value = resultDatos.VLR_LIMITE.trim();
								document.getElementById('minimo_SER104C').value = resultDatos.PORCE_MIN.trim();
								document.getElementById('maximo_SER104C').value = resultDatos.PORCE_MAX.trim();
								validarValorConvenioSER104C();
							} else {
								CON851('01', '01', validarDatoArticulo_SER104C(), 'error', 'error');
							}
							break;
						case '9':
							if(result_tabmed){
								on_guardarSER104C();
							}else{
							CON851('01', '01', validarDatoArticulo_SER104C(), 'error', 'error');
							}
							break;
						default:
							break;
					}
				}
			}
		}
	)
}


function validarValorConvenioSER104C() {
	validarInputs(
		{
			form: "#valorconvenio",
			orden: '1'
		},
		validarDatoArticulo_SER104C,
		function () {

			SER104C['valor_convenio'] = MountMask_104C.unmaskedValue;
			console.log(SER104C.valor_convenio, 'valor convenio')

			if (SER104C['valor_convenio'] == "" || isNaN(SER104C['valor_convenio'])) { validarValorConvenioSER104C(); }
			else { validarReguladoSER104C(); }
		}
	)
}

function validarReguladoSER104C() {
	validarInputs(
		{
			form: "#regulado",
			orden: '1'
		},
		validarValorConvenioSER104C,
		function () {

			SER104C['regulado'] = document.getElementById('regulado_SER104C').value.toUpperCase();
			if (SER104C['regulado'] == "") document.getElementById('regulado_SER104C').value = "N";
			else if (SER104C['regulado'] != 'S' && SER104C['regulado'] != 'N') {
				CON851('03', '03', validarReguladoSER104C(), 'error', 'error');
			} else if (SER104C['regulado'] == 'S') {
				document.getElementById('regulado_SER104C').value = SER104C.regulado;
				validarValorLimiteSER104C();
			} else if (SER104C['regulado'] == 'N') {
				document.getElementById('regulado_SER104C').value = SER104C.regulado;
				document.getElementById('limite_SER104C').value = "";
				document.getElementById('minimo_SER104C').value = "";
				document.getElementById('maximo_SER104C').value = "";
				SER104C.limite_SER104C = undefined;
				SER104C.maximo_SER104C = undefined;
				SER104C.minimo_SER104C = undefined;
				on_guardarSER104C();
			}
		}
	)
}

function validarValorLimiteSER104C() {
	validarInputs(
		{
			form: "#limite",
			orden: '1'
		},
		validarReguladoSER104C,
		function () {
			SER104C['limite_SER104C'] = LimiteMask_104C.unmaskedValue;
			console.log(SER104C.limite_SER104C, 'valor limite')
			if (SER104C['limite_SER104C'] == "" || isNaN(SER104C['limite_SER104C'])) CON851('57', '57', validarValorLimiteSER104C(), 'error', 'error');
			else { validarMinimoSER104C(); }
		}
	)
}

function validarMinimoSER104C() {
	validarInputs(
		{
			form: "#minimo",
			orden: '1'
		},
		validarValorLimiteSER104C,
		function () {
			SER104C['minimo_SER104C'] = MinimoMask_104C.unmaskedValue;
			console.log(SER104C.minimo_SER104C, 'valor minimo')
			if (SER104C['minimo_SER104C'] == "" || isNaN(SER104C['minimo_SER104C'])) CON851('03', '03', validarMinimoSER104C(), 'error', 'error');
			else { validarMaximoSER104C(); }
		}
	)
}

function validarMaximoSER104C() {
	validarInputs(
		{
			form: "#maximo",
			orden: '1'
		},
		validarMinimoSER104C,
		function () {
			SER104C['maximo_SER104C'] = MaximoMask_104C.unmaskedValue;
			if (SER104C['maximo_SER104C'] == "" || isNaN(SER104C['maximo_SER104C'])) CON851('57', '57', validarMaximoSER104C(), 'error', 'error');
			else { //validarValorMinimo(); 
				on_guardarSER104C();
			}
		}
	)
}

// SER104C.LLAVE_TABME = SER104C.COD_TAR.concat(SER104C.LLAVE_ART);

function on_guardarSER104C() {
	switch (SER104C.novedad.id) {
		case '7':
			SER104C.FECHA = moment().format("YYYYMMDD");

			if (SER104C.limite_SER104C == undefined) { SER104C.limite_SER104C = " " };
			if (SER104C.minimo_SER104C == undefined) { SER104C.minimo_SER104C = " " };
			if (SER104C.maximo_SER104C == undefined) { SER104C.maximo_SER104C = " " };
			SER104C.PARAMS =
				(SER104C.id_convenio.COD.padEnd(2, " ") + '|' + SER104C.LLAVE_ART_NEW.padEnd(15, ' ').trim() + '|' + SER104C.valor_convenio.padStart(14, '0') + '|' +
					SER104C.regulado + '|' + SER104C.limite_SER104C.padStart(14, '0') + '|' + SER104C.minimo_SER104C.padStart(7, '0') + '|' +
					SER104C.maximo_SER104C.padStart(7, '0') + '|')

			CON851P("01", validarMaximoSER104C, on_actualizarSER104C);
			break;
		case '8':
			SER104C.FECHA = moment().format("YYYYMMDD");

			if (SER104C.limite_SER104C == undefined) { SER104C.limite_SER104C = " " };
			if (SER104C.minimo_SER104C == undefined) { SER104C.minimo_SER104C = " " };
			if (SER104C.maximo_SER104C == undefined) { SER104C.maximo_SER104C = " " };

			SER104C.PARAMS =
				(SER104C.id_convenio.COD.padEnd(2, " ") + '|' + SER104C.LLAVE_ART_NEW.padEnd(15, ' ').trim() + '|' + SER104C.valor_convenio.padStart(14, '0') + '|' +
					SER104C.regulado + '|' + SER104C.limite_SER104C.padStart(14, '0') + '|' + SER104C.minimo_SER104C.padStart(7, '0') + '|' +
					SER104C.maximo_SER104C.padStart(7, '0') + '|')

			CON851P("01", validarMaximoSER104C, on_actualizarSER104C);
			break;
		case '9':
			SER104C.PARAMS = SER104C.id_convenio.COD.trim().padEnd(2, " ") + '|' + SER104C.LLAVE_ART_NEW.trim().padEnd(15, ' ') + '|'
			CON851P("54", validarCodigoTarifaSER104C, () => { setTimeout(on_actualizarSER104C(), 400) });
			break;
		default:

			break;
	}
}

function on_actualizarSER104C() {
	console.log('entra');
	let datos_envio = datosEnvio() + SER104C.novedad.id + '|' + SER104C.PARAMS;

	postData({
		datosh: datos_envio
	}, get_url('APP/SALUD/SER104C-02.DLL'))
		.then((data) => {
			if (data.split('|')[0] == "00") {
				if (SER104C.novedad.id == '7' || SER104C.novedad.id == '8') {
					toastr.success("Se ha actualizado correctamente el registro", "Maestro de convenios medicamentos");
				} else if (SER104C.novedad.id == '9') {
					toastr.success("Se ha eliminado correctamente el registro", "Maestro de convenios medicamentos");
				}
				limpiarCajasSER104C();
			} else {
				CON851('ERROR', 'ERROR AL ACTUALIZAR', validarMaximoSER104C());
			}
		})
		.catch((error) => {
			console.log(error)
		});
}

function datosArtculosConvenio() {
	let retorno = [];
	LLAMADO_DLL({
		dato: [localStorage.Usuario, SER104C.LLAVE_ART_NEW],
		callback: function (data) {
			let res = data.split('|');
			if (res[0] == '00') {
				retorno = [
					COD_MARCA = res[6],
					REF_ART = res[8],
					UNID_CONV_ART = res[23],
					IVA_ART = res[30],
					
				]
			}
		},
		nombredll: 'INV103_15',
		carpeta: 'INVENT'
	})
	console.log(retorno);
	return retorno;
}

function limpiarCajasSER104C() {
	_inputControl('reset');
	_inputControl('disabled');
	_toggleNav();
}