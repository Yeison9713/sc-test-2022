// LISTADO MORBILIDAD POR CONSULTA TIPO DE PACIENTE
// DAVID.M - CREACION - 29/06/2020 - OPCION 9-7-7-5-1-8 SALUD
var $_SER753D = [], $_FORMATO_753D = [];

$(document).ready(() => {
	loader('show')
	_inputControl("reset");
	_inputControl("disabled");
	nombreOpcion('9-7-7-5-1-3-3 - Morbilidad por consulta x tipo de paciente');
	_cargarTerceros();

	_toggleF8([
		{ input: 'tercero', app: 'SER753D', funct: _ventanaTercerosSER753D }
	]);
	$('#formatoimpresion_753D').select2().on('select2:select', validarFormato_753D);
})

function habilitarFORMATO_753D() {
	_inputControl('reset');
	$('#formatoimpresion_753D').val(null).removeAttr('disabled').trigger('change');
	$('#formatoimpresion_753D').select2('open')
}

function validarFormato_753D() {
	var seleccionado = $(this).val();
	if (seleccionado != "3") {
		if (seleccionado == "1") $_FORMATO_753D = 'PDF';
		else if (seleccionado == "2") $_FORMATO_753D = 'CSV';

		$(this).attr('disabled', 'true');
		datoInicialSER753D();
	} else {
		$(this).attr('disabled', 'true');
		_toggleNav();
	}
}

function datoInicialSER753D() {
	document.querySelector('#diaInicial_753D').value = "01";
	document.querySelector('#mesInicial_753D').value = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
	document.querySelector('#añoInicial_753D').value = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

	document.querySelector('#diaFinal_753D').value = $_USUA_GLOBAL[0].FECHALNK.substring(4, 6);
	document.querySelector('#mesFinal_753D').value = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
	document.querySelector('#añoFinal_753D').value = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

	validarFechaInicialSER753D('2');
}

function validarFechaInicialSER753D(orden) {
	setTimeout(function () {
		validarInputs(
			{
				form: '#fechaInicial_753D',
				orden: orden
			},
			() => {
				$('#formatoimpresion_753D').val(null).removeAttr('disabled').trigger('change');
				$('#formatoimpresion_753D').select2('open');
			},
			() => {
				document.querySelector('#diaInicial_753D').value = cerosIzq(document.querySelector('#diaInicial_753D').value, 2);
			  document.querySelector('#mesInicial_753D').value = cerosIzq(document.querySelector('#mesInicial_753D').value, 2);
				$_SER753D.fechaInicial = parseInt(document.querySelector('#añoInicial_753D').value + document.querySelector('#mesInicial_753D').value + document.querySelector('#diaInicial_753D').value);
				$_SER753D.diaInicial = parseInt(document.querySelector('#diaInicial_753D').value);
				$_SER753D.mesInicial = parseInt(document.querySelector('#mesInicial_753D').value);
				$_SER753D.añoInicial = parseInt(document.querySelector('#añoInicial_753D').value);
				if ($_SER753D.diaInicial < 1 || $_SER753D.diaInicial > 31) {
					validarFechaInicialSER753D('3');
				} else if ($_SER753D.mesInicial < 1 || $_SER753D.mesInicial > 12) {
					validarFechaInicialSER753D('2');
				} else {
					validarFechaFinalSER753D('2');
				}
			}
		);
	}, 100);
}

function validarFechaFinalSER753D(orden) {
	setTimeout(function () {
		validarInputs(
			{
				form: '#fechaFinal_753D',
				orden: orden
			},
			() => {
				validarFechaInicialSER753D('2')
			},
			() => {
				document.querySelector('#diaFinal_753D').value = cerosIzq(document.querySelector('#diaFinal_753D').value, 2);
			  document.querySelector('#mesFinal_753D').value = cerosIzq(document.querySelector('#mesFinal_753D').value, 2);
				$_SER753D.fechaFinal = parseInt(document.querySelector('#añoFinal_753D').value + document.querySelector('#mesFinal_753D').value + document.querySelector('#diaFinal_753D').value);
				$_SER753D.diaFinal = parseInt(document.querySelector('#diaFinal_753D').value);
				$_SER753D.mesFinal = parseInt(document.querySelector('#mesFinal_753D').value);
				$_SER753D.añoFinal = parseInt(document.querySelector('#añoFinal_753D').value);
				if ($_SER753D.diaFinal < 1 || $_SER753D.diaFinal > 31) {
					validarFechaFinalSER753D('3');
				} else if ($_SER753D.mesFinal < 1 || $_SER753D.mesFinal > 12) {
					validarFechaFinalSER753D('2');
				} else if ($_SER753D.fechaFinal < $_SER753D.fechaInicial) {
					CON851('03', 'Fecha de vencimiento debe ser mayor', null, 'error', 'error');
					validarFechaFinalSER753D('2');
				} else {
					validarTerceroSER753D();
				}
			}
		);
	}, 100);
}

function validarTerceroSER753D() {
	document.querySelector('#tercero_SER753D').value == "" ? document.querySelector('#tercero_SER753D').value = '99' : false;
	validarInputs(
		{
			form: '#validarTercero_753D',
			orden: '1'
		},
		() => {
			validarFechaFinalSER753D('2');
		},
		() => {
			$_SER753D['tercero'] = document.getElementById("tercero_SER753D").value.trim();
			if ($_SER753D.tercero == "99") {
				document.querySelector('#descripTercero_SER753D').value = "PROCESO TOTAL";
				_envioImpresion();
			} else {
				const res = $_SER753D.TERCEROS.find(e => e.COD.trim() == $_SER753D.tercero);
				if (res == undefined) {
					CON851('01', '01', null, 'error', 'error');
					validarTerceroSER753D();
				} else {
					document.querySelector('#descripTercero_SER753D').value = res.NOMBRE;
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
				+ '|' + $_SER753D.fechaInicial.toString()
				+ '|' + $_SER753D.fechaFinal.toString()
				+ '|' + cerosIzq($_SER753D.tercero, 10);

			console.log(datos_envio, "datos_envio");

			postData({ datosh: datos_envio }, get_url('app/SALUD/SER753D.DLL'))
				.then(_montarImpresion_SER753D)
				.catch(err => {
					console.log(err)
					validarTerceroSER753D();
				})
		} else {
			validarTerceroSER753D();
		}
	}, {
		msj: '00',
		overlay_show: true
	})
}

function _montarImpresion_SER753D(data) {
	data.LISTADO.pop();
	data.ENCABEZADO = [];

	let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
	let codigo = 'CODIGO: ' + $_USUA_GLOBAL[0].COD_CIUD + $_USUA_GLOBAL[0].NUIR + " - " + $_USUA_GLOBAL[0].NOMBRE_CIU;
	let fecha = moment().format('MMM DD/YY');

	data.ENCABEZADO.push(nombreEmpresa);
	data.ENCABEZADO.push(codigo);
	data.ENCABEZADO.push(fecha);
	data.ENCABEZADO.push($_SER753D.fechaInicial);
	data.ENCABEZADO.push($_SER753D.fechaFinal);
	data.ENCABEZADO.push(moment().format("HH:mm"));

	var impresion = {
		datos: data,
		tipo: $_FORMATO_753D.toLowerCase(),
		formato: 'salud/SER753D.formato.html',
		nombre: 'ENFERMEDADES-TRANSMISIBLES-NOTIFICACION-OBLIGATORIA-' + localStorage.Sesion
	}
	loader('hide')

	imprimir(impresion, () => {
		_inputControl('reset');
		$('#formatoimpresion_753D').val(null).removeAttr('disabled').trigger('change');
		$('#formatoimpresion_753D').select2('open')
		// _toggleNav() 
	});
}

function _cargarTerceros() {
	postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON802.DLL"))
		.then(data => {
			$_SER753D.TERCEROS = data.TERCEROS;
			$_SER753D.TERCEROS.pop();
			loader('hide');
			setTimeout(function () { $('#formatoimpresion_753D').select2('open') }, 500)
		}).catch(err => {
			loader('hide');
			_toggleNav();
		})
}

function _ventanaTercerosSER753D(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		for (i in $_SER753D.TERCEROS) {
			$_SER753D.TERCEROS[i]['IDENTIFICACION'] = $_SER753D.TERCEROS[i].COD;
			$_SER753D.TERCEROS[i]['TELEFONO'] = $_SER753D.TERCEROS[i].TELEF;
			$_SER753D.TERCEROS[i]['ACTIVIDAD'] = $_SER753D.TERCEROS[i].ACT;
		}
		_ventanaDatos({
			titulo: "VENTANA DE TERCEROS",
			columnas: ["IDENTIFICACION", "NOMBRE", "TELEFONO", "CIUDAD", "ACTIVIDAD"],
			data: $_SER753D.TERCEROS,
			ancho: 900,
			callback_esc: function () {
				$("#tercero_SER753D").focus();
			},
			callback: function (data) {
				document.getElementById('tercero_SER753D').value = data.COD;
				_enterInput('#tercero_SER753D');
			}
		});
	}
}