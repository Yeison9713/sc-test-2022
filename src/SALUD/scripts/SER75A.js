// LISTADO MORBILIDAD POR HISTORIA CLINICA
// DAVID.M - CREACION - 23/06/2020 - OPCION 9-7-7-5-1-5 SALUD
var $_SER75A = [], $_FORMATO_75A = [];

$(document).ready(() => {
	loader('show')
	_inputControl("reset");
	_inputControl("disabled");
	nombreOpcion('9-7-7-5-1-5 - Morbilidad S/G HISTORIA CL.');
	_cargarUnidServicios();

	_toggleF8([
		{ input: 'unidAten', app: 'SER75A', funct: _ventanaUnidServiciosSER75A },
		{ input: 'medico', app: 'SER75A', funct: _ventanaProfesionalesSER75A }
	]);
	$('#formatoimpresion_75A').select2().on('select2:select', validarFormato_75A);
})

function habilitarFORMATO_75A() {
	_inputControl('reset');
	$('#formatoimpresion_75A').val(null).removeAttr('disabled').trigger('change');
	$('#formatoimpresion_75A').select2('open')
}

function validarFormato_75A() {
	var seleccionado = $(this).val();
	if (seleccionado != "3") {
		if (seleccionado == "1") $_FORMATO_75A = 'PDF';
		else if (seleccionado == "2") $_FORMATO_75A = 'CSV';

		$(this).attr('disabled', 'true');
		datoInicialSER75A();
	} else {
		$(this).attr('disabled', 'true');
		_toggleNav();
	}
}

function datoInicialSER75A() {
	document.querySelector('#diaInicial_75A').value = "01";
	document.querySelector('#mesInicial_75A').value = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
	document.querySelector('#añoInicial_75A').value = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

	validarFechaInicialSER75A('1');
}

function validarFechaInicialSER75A(orden) {
	setTimeout(function () {
		validarInputs(
			{
				form: '#fechaInicial_75A',
				orden: orden
			},
			() => {
				$('#formatoimpresion_75A').val(null).removeAttr('disabled').trigger('change');
				$('#formatoimpresion_75A').select2('open');
			},
			() => {
				document.querySelector('#diaInicial_75A').value = cerosIzq(document.querySelector('#diaInicial_75A').value, 2);
				document.querySelector('#mesInicial_75A').value = cerosIzq(document.querySelector('#mesInicial_75A').value, 2);
				$_SER75A.fechaInicial = parseInt(document.querySelector('#añoInicial_75A').value + document.querySelector('#mesInicial_75A').value + document.querySelector('#diaInicial_75A').value);
				$_SER75A.diaInicial = parseInt(document.querySelector('#diaInicial_75A').value);
				$_SER75A.mesInicial = parseInt(document.querySelector('#mesInicial_75A').value);
				$_SER75A.añoInicial = parseInt(document.querySelector('#añoInicial_75A').value);
				if ($_SER75A.diaInicial < 1 || $_SER75A.diaInicial > 31) {
					validarFechaInicialSER75A('3');
				} else if ($_SER75A.mesInicial < 1 || $_SER75A.mesInicial > 12) {
					validarFechaInicialSER75A('2');
				} else {
					validarFechaFinalSER75A('2');
				}
			}
		);
	}, 100);
}

function validarFechaFinalSER75A(orden) {
	document.querySelector('#diaFinal_75A').value = document.querySelector('#diaInicial_75A').value;
	document.querySelector('#mesFinal_75A').value = document.querySelector('#mesInicial_75A').value;
	document.querySelector('#añoFinal_75A').value = document.querySelector('#añoInicial_75A').value;
	setTimeout(function () {
		validarInputs(
			{
				form: '#fechaFinal_75A',
				orden: orden
			},
			() => {
				validarFechaInicialSER75A('3')
			},
			() => {
				document.querySelector('#diaFinal_75A').value = cerosIzq(document.querySelector('#diaFinal_75A').value, 2);
				document.querySelector('#mesFinal_75A').value = cerosIzq(document.querySelector('#mesFinal_75A').value, 2);
				$_SER75A.fechaFinal = parseInt(document.querySelector('#añoFinal_75A').value + document.querySelector('#mesFinal_75A').value + document.querySelector('#diaFinal_75A').value);
				$_SER75A.diaFinal = parseInt(document.querySelector('#diaFinal_75A').value);
				$_SER75A.mesFinal = parseInt(document.querySelector('#mesFinal_75A').value);
				$_SER75A.añoFinal = parseInt(document.querySelector('#añoFinal_75A').value);
				if ($_SER75A.diaFinal < 1 || $_SER75A.diaFinal > 31) {
					validarFechaFinalSER75A('3');
				} else if ($_SER75A.mesFinal < 1 || $_SER75A.mesFinal > 12) {
					validarFechaFinalSER75A('2');
				} else if ($_SER75A.fechaFinal < $_SER75A.fechaInicial) {
					CON851('03', 'Fecha de vencimiento debe ser mayor', null, 'error', 'error');
					validarFechaFinalSER75A('2');
				} else {
					validarUnidadAtncionSER75A();
				}
			}
		);
	}, 100);
}

function validarUnidadAtncionSER75A() {
	document.querySelector('#unidAten_SER75A').value == "" ? document.querySelector('#unidAten_SER75A').value = '**' : false;
	validarInputs(
		{
			form: '#validarUnidAten_75A',
			orden: '1'
		},
		() => {
			validarFechaFinalSER75A('2');
		},
		() => {
			$_SER75A['unidAten'] = document.getElementById("unidAten_SER75A").value.trim();
			if ($_SER75A.unidAten == "**") {
				document.querySelector('#descripUnidAten_SER75A').value = "TODAS LAS UNIDADES";
				validarMedicoSER75A();
			} else {
				const res = $_SER75A.UNSERV.find(e => e.COD.trim() == $_SER75A.unidAten);
				if (res == undefined) {
					CON851('01', '01', null, 'error', 'error');
					validarUnidadAtncionSER75A();
				} else {
					document.querySelector('#descripUnidAten_SER75A').value = res.DESCRIP;
					validarMedicoSER75A();
				}
			}
		}
	);
}

function validarMedicoSER75A() {
	document.querySelector('#medico_SER75A').value == "" ? document.querySelector('#medico_SER75A').value = '99' : false;
	validarInputs(
		{
			form: '#validarMedico_75A',
			orden: '1'
		},
		() => {
			validarUnidadAtncionSER75A();
		},
		() => {
			$_SER75A['medico'] = document.getElementById("medico_SER75A").value.trim();
			if ($_SER75A.medico == "99") {
				document.querySelector('#descripMedico_SER75A').value = "PROCESO TOTAL";
				validarListarPrimSER75A();
			} else {
				const res = $_SER75A.PROFESIONALES.find(e => e.IDENTIFICACION.trim() == $_SER75A.medico);
				if (res == undefined) {
					CON851('01', '01', null, 'error', 'error');
					validarMedicoSER75A();
				} else {
					document.querySelector('#descripMedico_SER75A').value = res.NOMBRE;
					validarListarPrimSER75A();
				}
			}
		}
	);
}

function validarListarPrimSER75A() {
	document.querySelector('#listarPrim_SER75A').value == "" ? document.querySelector('#listarPrim_SER75A').value = '500' : false;
	validarInputs(
		{
			form: '#validarListarPrim_75A',
			orden: '1'
		},
		() => {
			validarMedicoSER75A();
		},
		() => {
			$_SER75A['listarPrim'] = document.getElementById("listarPrim_SER75A").value.toUpperCase().trim();
			if (parseInt($_SER75A.listarPrim) < 5) {
				validarListarPrimSER75A();
			} else {
				validarIncluirContrSER75A();
			}
		}
	);
}

function validarIncluirContrSER75A() {
	document.querySelector('#incluirContr_SER75A').value == "" ? document.querySelector('#incluirContr_SER75A').value = 'N' : false;
	document.getElementById("incluirContr_SER75A").setAttribute("placeholder", "N");
	validarInputs(
		{
			form: '#validarIncluirContr_75A',
			orden: '1'
		},
		() => {
			validarListarPrimSER75A();
		},
		() => {
			$_SER75A['incluirContr'] = document.getElementById("incluirContr_SER75A").value.toUpperCase().trim();
			($_SER75A.incluirContr == "S" || $_SER75A.incluirContr == "N") ? validarOrdenarEvenSER75A() : validarIncluirContrSER75A();
		}
	);
}

function validarOrdenarEvenSER75A() {
	document.querySelector('#ordenarEven_SER75A').value == "" ? document.querySelector('#ordenarEven_SER75A').value = 'S' : false;
	document.getElementById("ordenarEven_SER75A").setAttribute("placeholder", "N");
	validarInputs(
		{
			form: '#validarOrdenarEven_75A',
			orden: '1'
		},
		() => {
			validarIncluirContrSER75A();
		},
		() => {
			$_SER75A['ordenarEven'] = document.getElementById("ordenarEven_SER75A").value.toUpperCase().trim();
			($_SER75A.ordenarEven == "S" || $_SER75A.ordenarEven == "N") ? _envioImpresion() : validarOrdenarEvenSER75A();
		}
	);
}

function _envioImpresion() {
	CON850_P(function (e) {
		if (e.id == 'S') {

			loader('show')
			var datos_envio = datosEnvio()
				+ localStorage.Usuario
				+ '|' + $_SER75A.fechaInicial.toString()
				+ '|' + $_SER75A.fechaFinal.toString()
				+ '|' + $_SER75A.unidAten
				+ '|' + cerosIzq($_SER75A.medico, 10)
				+ '|' + $_SER75A.listarPrim
				+ '|' + $_SER75A.incluirContr
				+ '|' + $_SER75A.ordenarEven;

			console.log(datos_envio, "datos_envio");

			postData({ datosh: datos_envio }, get_url('app/SALUD/SER75A.DLL'))
				.then(_montarImpresion_SER75A)
				.catch(err => {
					console.log(err)
					validarOrdenarEvenSER75A();
				})
		} else {
			validarOrdenarEvenSER75A();
		}
	}, {
		msj: '00',
		overlay_show: true
	})
}

function _montarImpresion_SER75A(data) {
	data.LISTADO.pop();
	data.ENCABEZADO = [];

	let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
	let nit = $_USUA_GLOBAL[0].NIT.toString();
	let fecha = moment().format('MMM DD/YY');

	data.ENCABEZADO.push(nombreEmpresa);
	data.ENCABEZADO.push(nit);
	data.ENCABEZADO.push(fecha);
	data.ENCABEZADO.push($_SER75A.fechaInicial);
	data.ENCABEZADO.push($_SER75A.fechaFinal);
	data.ENCABEZADO.push(moment().format("HH:mm"));

	var impresion = {
		datos: data,
		tipo: $_FORMATO_75A.toLowerCase(),
		formato: 'salud/SER75A.formato.html',
		nombre: 'LISTADO-MORBILIDAD-HC-' + localStorage.Sesion
	}
	loader('hide')

	imprimir(impresion, () => {
		_inputControl('reset');
		$('#formatoimpresion_75A').val(null).removeAttr('disabled').trigger('change');
		$('#formatoimpresion_75A').select2('open')
		// _toggleNav() 
	});
}

function _cargarUnidServicios() {
	postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER873.DLL"))
		.then(data => {
			$_SER75A.UNSERV = data.UNSERV;
			$_SER75A.UNSERV.pop();
			_cargarProfesionales();
		}).catch(err => {
			loader('hide');
			_toggleNav();
		})
}

function _cargarProfesionales() {
	postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER819.DLL"))
		.then(data => {
			loader('hide');
			$_SER75A.PROFESIONALES = data.ARCHPROF;
			$_SER75A.PROFESIONALES.pop();
			setTimeout(function () { $('#formatoimpresion_75A').select2('open') }, 500)
		}).catch(err => {
			loader('hide');
			_toggleNav();
		})
}

function _ventanaUnidServiciosSER75A(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA UNIDADES DE SERVICIO",
			columnas: ["COD", "DESCRIP"],
			data: $_SER75A.UNSERV,
			callback_esc: function () {
				$("#unidAten_SER75A").focus();
			},
			callback: function (data) {
				document.getElementById('unidAten_SER75A').value = data.COD;
				_enterInput('#unidAten_SER75A');
			}
		});
	}
}

function _ventanaProfesionalesSER75A(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA PROFESIONALES",
			columnas: ["NOMBRE", "IDENTIFICACION", "DESCRIPCION", "LU", "MA", "MI", "JU", "VI", "SA"],
			data: $_SER75A.PROFESIONALES,
			ancho: 750,
			callback_esc: function () {
				$("#medico_SER75A").focus();
			},
			callback: function (data) {
				document.getElementById('medico_SER75A').value = data.IDENTIFICACION;
				_enterInput('#medico_SER75A');
			}
		});
	}
}