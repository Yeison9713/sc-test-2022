// SALUD -   notificacion de enfermedades transmisibles.
// SANTIAGO - CREACION - 01/07/2020 - OPCION 9-7-7-5-1-3-2 SALUD
var $_SER753B = [], $_FORMATO_753B = [];

$(document).ready(() => {
	nombreOpcion('9,7,7,5,1,3,2 - Notificacion de enfermedades transmisibles');
	loader('show')
	_inputControl("reset");
	_inputControl("disabled");
	_cargarEntidades();

	_toggleF8([
		{ input: 'entidad', app: 'SER753B', funct: _ventanaEntidadesSER753B },
		{ input: 'costo', app: 'SER753B', funct: _ventanaCostosSER753B }
	]);
	$('#formatoimpresion_753B').select2().on('select2:select', validarFormato_753B);
})

function habilitarFORMATO_753B() {
	_inputControl('reset');
	$('#formatoimpresion_753B').val(null).removeAttr('disabled').trigger('change');
	$('#formatoimpresion_753B').select2('open')
}

function validarFormato_753B() {
	var seleccionado = $(this).val();
	if (seleccionado != "3") {
		if (seleccionado == "1") $_FORMATO_753B = 'PDF';
		else if (seleccionado == "2") $_FORMATO_753B = 'CSV';

		$(this).attr('disabled', 'true');
		validarNroSemanaSER753B();
	} else {
		$(this).attr('disabled', 'true');
		_toggleNav();
	}
}

function validarNroSemanaSER753B() {
	// document.querySelector('#nroSemana_753B').value == "" ? document.querySelector('#nroSemana_753B').value = '1' : false;
	validarInputs(
		{
			form: '#nroSemana_SER753B',
			orden: '1'
		},
		() => {
			$('#formatoimpresion_753B').val(null).removeAttr('disabled').trigger('change');
			$('#formatoimpresion_753B').select2('open')
		},
		() => {
			$_SER753B['nroSemana'] = document.getElementById("nroSemana_753B").value;
			const res = ["1", "5", "9", "13", "17", "21", "25", "29", "33", "37", "41", "45", "49"].find(e => e == $_SER753B.nroSemana);
			if (res == undefined) {
				document.getElementById("nroSemana_753B").value = "";
				validarNroSemanaSER753B();
			} else {
				datoInicialSER753B()
			}
		}
	);
}

function datoInicialSER753B() {
	switch ($_SER753B.nroSemana) {
		case "1":
			document.querySelector('#diaInicial_753B').value = "02"
			document.querySelector('#mesInicial_753B').value = "01"
			document.querySelector('#añoInicial_753B').value = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

			validarFechaSER753B("2");
			break;

		case "5":
			document.querySelector('#diaInicial_753B').value = "30"
			document.querySelector('#mesInicial_753B').value = "01"
			document.querySelector('#añoInicial_753B').value = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

			validarFechaSER753B("2");
			break;

		case "9":
			document.querySelector('#diaInicial_753B').value = "27"
			document.querySelector('#mesInicial_753B').value = "02"
			document.querySelector('#añoInicial_753B').value = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

			validarFechaSER753B("2");
			break;

		case "13":
			document.querySelector('#diaInicial_753B').value = "26"
			document.querySelector('#mesInicial_753B').value = "03"
			document.querySelector('#añoInicial_753B').value = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

			validarFechaSER753B("2");
			break;

		case "17":
			document.querySelector('#diaInicial_753B').value = "23"
			document.querySelector('#mesInicial_753B').value = "04"
			document.querySelector('#añoInicial_753B').value = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

			validarFechaSER753B("2");
			break;

		case "21":
			document.querySelector('#diaInicial_753B').value = "21"
			document.querySelector('#mesInicial_753B').value = "05"
			document.querySelector('#añoInicial_753B').value = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

			validarFechaSER753B("2");
			break;

		case "25":
			document.querySelector('#diaInicial_753B').value = "18"
			document.querySelector('#mesInicial_753B').value = "06"
			document.querySelector('#añoInicial_753B').value = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

			validarFechaSER753B("2");
			break;

		case "29":
			document.querySelector('#diaInicial_753B').value = "16"
			document.querySelector('#mesInicial_753B').value = "07"
			document.querySelector('#añoInicial_753B').value = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

			validarFechaSER753B("2");
			break;

		case "33":
			document.querySelector('#diaInicial_753B').value = "13"
			document.querySelector('#mesInicial_753B').value = "08"
			document.querySelector('#añoInicial_753B').value = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

			validarFechaSER753B("2");
			break;

		case "37":
			document.querySelector('#diaInicial_753B').value = "10"
			document.querySelector('#mesInicial_753B').value = "09"
			document.querySelector('#añoInicial_753B').value = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

			validarFechaSER753B("2");
			break;

		case "41":
			document.querySelector('#diaInicial_753B').value = "03"
			document.querySelector('#mesInicial_753B').value = "10"
			document.querySelector('#añoInicial_753B').value = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

			validarFechaSER753B("2");
			break;

		case "45":
			document.querySelector('#diaInicial_753B').value = "05"
			document.querySelector('#mesInicial_753B').value = "11"
			document.querySelector('#añoInicial_753B').value = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

			validarFechaSER753B("2");
			break;

		case "49":
			document.querySelector('#diaInicial_753B').value = "03"
			document.querySelector('#mesInicial_753B').value = "12"
			document.querySelector('#añoInicial_753B').value = "20" + $_USUA_GLOBAL[0].FECHALNK.substring(0, 2);

			validarFechaSER753B("2");
			break;
	}

	// validarFechaInicialSER751('2');
}

function validarFechaSER753B(orden) {
	setTimeout(function () {
		validarInputs(
			{
				form: '#fechaInicial_SER753B',
				orden: orden
			},
			() => {
				validarNroSemanaSER753B();
			},
			() => {
				// document.querySelector('#diaInicial_753B').value = cerosIzq(document.querySelector('#diaInicial_753B').value, 2);
				// document.querySelector('#mesInicial_753B').value = cerosIzq(document.querySelector('#mesInicial_753B').value, 2);
				$_SER753B.fechaInicial = parseInt(document.querySelector('#añoInicial_753B').value + document.querySelector('#mesInicial_753B').value + document.querySelector('#diaInicial_753B').value);
				$_SER753B.diaInicial = parseInt(document.querySelector('#diaInicial_753B').value);
				$_SER753B.mesInicial = parseInt(document.querySelector('#mesInicial_753B').value);
				$_SER753B.añoInicial = parseInt(document.querySelector('#añoInicial_753B').value);
				if ($_SER753B.diaInicial < 1 || $_SER753B.diaInicial > 31) {
					CON851('37', '37', null, 'error', 'error');
					validarFechaSER753B('3');
				} else if ($_SER753B.mesInicial < 1 || $_SER753B.mesInicial > 12) {
					CON851('37', '37', null, 'error', 'error');
					validarFechaSER753B('2');
				} else {
					llenarFechasSER753B();
				}
			}
		);
	}, 100);
}

function llenarFechasSER753B() {
	// setTimeout(function () {
	validarInputs(
		{
			// form: '#fechaInicial_SER753B',
			// orden: "2"
		},
		() => {
			// validarNroSemanaSER753B();
		},
		() => {
			$_SER753B.diaInicial = $_SER753B.diaInicial + 6;

			if ($_SER753B.mesInicial == 2) {
				if ($_SER753B.añoInicial == 2000 || $_SER753B.añoInicial == 2004 || $_SER753B.añoInicial == 2008 || $_SER753B.añoInicial == 2012 || $_SER753B.añoInicial == 2016 || $_SER753B.añoInicial == 2020) {
					var limi = 29;
				} else {
					var limi = 28;
				}
			} else if ($_SER753B.mesInicial == 1 || $_SER753B.mesInicial == 3 || $_SER753B.mesInicial == 5 || $_SER753B.mesInicial == 7 || $_SER753B.mesInicial == 8 || $_SER753B.mesInicial == 10 || $_SER753B.mesInicial == 12) {
				var limi = 31;
			} else {
				var limi = 30;
			}

			if ($_SER753B.diaInicial > limi) {
				$_SER753B.diaInicial = $_SER753B.diaInicial - limi;
				$_SER753B.mesInicial = $_SER753B.mesInicial + 1;
			}

			if ($_SER753B.mesInicial > 12) {
				$_SER753B.mesInicial = 1;
				$_SER753B.añoInicial = $_SER753B.añoInicial + 1;
			}

			if ($_SER753B.diaInicial < 10) {
				$_SER753B.diaInicial = $_SER753B.diaInicial.toString();
				$_SER753B.diaInicial = 0 + $_SER753B.diaInicial;
			}

			if ($_SER753B.mesInicial < 10) {
				$_SER753B.mesInicial = $_SER753B.mesInicial.toString();
				$_SER753B.mesInicial = 0 + $_SER753B.mesInicial;
			}

			document.querySelector('#diaFinal_753B').value = $_SER753B.diaInicial;
			document.querySelector('#mesFinal_753B').value = $_SER753B.mesInicial;
			document.querySelector('#añoFinal_753B').value = $_SER753B.añoInicial;
			$_SER753B.fechaFinal = parseInt(document.querySelector('#añoFinal_753B').value + document.querySelector('#mesFinal_753B').value + document.querySelector('#diaFinal_753B').value);

			llenarFechas1SER753B();
		}
	);
	// }, 100);
}

function llenarFechas1SER753B() {
	// setTimeout(function () {
	validarInputs(
		{
			// form: '#fechaInicial_SER753B',
			// orden: "2"
		},
		() => {
			// validarNroSemanaSER753B();
		},
		() => {

			$_SER753B.diaInicial = parseInt($_SER753B.diaInicial);
			$_SER753B.mesInicial = parseInt($_SER753B.mesInicial);

			$_SER753B.diaInicial = $_SER753B.diaInicial + 1;

			if ($_SER753B.mesInicial == 2) {
				if ($_SER753B.añoInicial == 2000 || $_SER753B.añoInicial == 2004 || $_SER753B.añoInicial == 2008 || $_SER753B.añoInicial == 2012 || $_SER753B.añoInicial == 2016 || $_SER753B.añoInicial == 2020) {
					var limi = 29;
				} else {
					var limi = 28;
				}
			} else if ($_SER753B.mesInicial == 1 || $_SER753B.mesInicial == 3 || $_SER753B.mesInicial == 5 || $_SER753B.mesInicial == 7 || $_SER753B.mesInicial == 8 || $_SER753B.mesInicial == 10 || $_SER753B.mesInicial == 12) {
				var limi = 31;
			} else {
				var limi = 30;
			}

			if ($_SER753B.diaInicial > limi) {
				$_SER753B.diaInicial = $_SER753B.diaInicial - limi;
				$_SER753B.mesInicial = $_SER753B.mesInicial + 1;
			}

			if ($_SER753B.mesInicial > 12) {
				$_SER753B.mesInicial = 1;
				$_SER753B.añoInicial = $_SER753B.añoInicial + 1;
			}

			if ($_SER753B.diaInicial < 10) {
				$_SER753B.diaInicial = $_SER753B.diaInicial.toString();
				$_SER753B.diaInicial = 0 + $_SER753B.diaInicial;
			}

			if ($_SER753B.mesInicial < 10) {
				$_SER753B.mesInicial = $_SER753B.mesInicial.toString();
				$_SER753B.mesInicial = 0 + $_SER753B.mesInicial;
			}

			document.querySelector('#diaInicial1_753B').value = $_SER753B.diaInicial;
			document.querySelector('#mesInicial1_753B').value = $_SER753B.mesInicial;
			document.querySelector('#añoInicial1_753B').value = $_SER753B.añoInicial;
			$_SER753B.fechaInicial1 = parseInt(document.querySelector('#añoInicial1_753B').value + document.querySelector('#mesInicial1_753B').value + document.querySelector('#diaInicial1_753B').value);
			llenarFechas2SER753B();
		}
	);
	// }, 100);
}

function llenarFechas2SER753B() {
	// setTimeout(function () {
	validarInputs(
		{
			// form: '#fechaInicial_SER753B',
			// orden: "2"
		},
		() => {
			// validarNroSemanaSER753B();
		},
		() => {

			$_SER753B.diaInicial = parseInt($_SER753B.diaInicial);
			$_SER753B.mesInicial = parseInt($_SER753B.mesInicial);

			$_SER753B.diaInicial = $_SER753B.diaInicial + 6;

			if ($_SER753B.mesInicial == 2) {
				if ($_SER753B.añoInicial == 2000 || $_SER753B.añoInicial == 2004 || $_SER753B.añoInicial == 2008 || $_SER753B.añoInicial == 2012 || $_SER753B.añoInicial == 2016 || $_SER753B.añoInicial == 2020) {
					var limi = 29;
				} else {
					var limi = 28;
				}
			} else if ($_SER753B.mesInicial == 1 || $_SER753B.mesInicial == 3 || $_SER753B.mesInicial == 5 || $_SER753B.mesInicial == 7 || $_SER753B.mesInicial == 8 || $_SER753B.mesInicial == 10 || $_SER753B.mesInicial == 12) {
				var limi = 31;
			} else {
				var limi = 30;
			}

			if ($_SER753B.diaInicial > limi) {
				$_SER753B.diaInicial = $_SER753B.diaInicial - limi;
				$_SER753B.mesInicial = $_SER753B.mesInicial + 1;
			}

			if ($_SER753B.mesInicial > 12) {
				$_SER753B.mesInicial = 1;
				$_SER753B.añoInicial = $_SER753B.añoInicial + 1;
			}

			if ($_SER753B.diaInicial < 10) {
				$_SER753B.diaInicial = $_SER753B.diaInicial.toString();
				$_SER753B.diaInicial = 0 + $_SER753B.diaInicial;
			}

			if ($_SER753B.mesInicial < 10) {
				$_SER753B.mesInicial = $_SER753B.mesInicial.toString();
				$_SER753B.mesInicial = 0 + $_SER753B.mesInicial;
			}

			document.querySelector('#diaFinal1_753B').value = $_SER753B.diaInicial;
			document.querySelector('#mesFinal1_753B').value = $_SER753B.mesInicial;
			document.querySelector('#añoFinal1_753B').value = $_SER753B.añoInicial;
			$_SER753B.fechaFinal1 = parseInt(document.querySelector('#añoFinal1_753B').value + document.querySelector('#mesFinal1_753B').value + document.querySelector('#diaFinal1_753B').value);
			llenarFechas3SER753B();
		}
	);
}

function llenarFechas3SER753B() {
	// setTimeout(function () {
	validarInputs(
		{
			// form: '#fechaInicial_SER753B',
			// orden: "2"
		},
		() => {
			// validarNroSemanaSER753B();
		},
		() => {

			$_SER753B.diaInicial = parseInt($_SER753B.diaInicial);
			$_SER753B.mesInicial = parseInt($_SER753B.mesInicial);

			$_SER753B.diaInicial = $_SER753B.diaInicial + 1;

			if ($_SER753B.mesInicial == 2) {
				if ($_SER753B.añoInicial == 2000 || $_SER753B.añoInicial == 2004 || $_SER753B.añoInicial == 2008 || $_SER753B.añoInicial == 2012 || $_SER753B.añoInicial == 2016 || $_SER753B.añoInicial == 2020) {
					var limi = 29;
				} else {
					var limi = 28;
				}
			} else if ($_SER753B.mesInicial == 1 || $_SER753B.mesInicial == 3 || $_SER753B.mesInicial == 5 || $_SER753B.mesInicial == 7 || $_SER753B.mesInicial == 8 || $_SER753B.mesInicial == 10 || $_SER753B.mesInicial == 12) {
				var limi = 31;
			} else {
				var limi = 30;
			}

			if ($_SER753B.diaInicial > limi) {
				$_SER753B.diaInicial = $_SER753B.diaInicial - limi;
				$_SER753B.mesInicial = $_SER753B.mesInicial + 1;
			}

			if ($_SER753B.mesInicial > 12) {
				$_SER753B.mesInicial = 1;
				$_SER753B.añoInicial = $_SER753B.añoInicial + 1;
			}

			if ($_SER753B.diaInicial < 10) {
				$_SER753B.diaInicial = $_SER753B.diaInicial.toString();
				$_SER753B.diaInicial = 0 + $_SER753B.diaInicial;
			}

			if ($_SER753B.mesInicial < 10) {
				$_SER753B.mesInicial = $_SER753B.mesInicial.toString();
				$_SER753B.mesInicial = 0 + $_SER753B.mesInicial;
			}

			document.querySelector('#diaInicial2_753B').value = $_SER753B.diaInicial;
			document.querySelector('#mesInicial2_753B').value = $_SER753B.mesInicial;
			document.querySelector('#añoInicial2_753B').value = $_SER753B.añoInicial;
			$_SER753B.fechaInicial2 = parseInt(document.querySelector('#añoInicial2_753B').value + document.querySelector('#mesInicial2_753B').value + document.querySelector('#diaInicial2_753B').value);
			llenarFechas4SER753B();
		}
	);

	// }, 100);
}

function llenarFechas4SER753B() {
	// setTimeout(function () {
	validarInputs(
		{
			// form: '#fechaInicial_SER753B',
			// orden: "2"
		},
		() => {
			// validarNroSemanaSER753B();
		},
		() => {

			$_SER753B.diaInicial = parseInt($_SER753B.diaInicial);
			$_SER753B.mesInicial = parseInt($_SER753B.mesInicial);

			$_SER753B.diaInicial = $_SER753B.diaInicial + 6;

			if ($_SER753B.mesInicial == 2) {
				if ($_SER753B.añoInicial == 2000 || $_SER753B.añoInicial == 2004 || $_SER753B.añoInicial == 2008 || $_SER753B.añoInicial == 2012 || $_SER753B.añoInicial == 2016 || $_SER753B.añoInicial == 2020) {
					var limi = 29;
				} else {
					var limi = 28;
				}
			} else if ($_SER753B.mesInicial == 1 || $_SER753B.mesInicial == 3 || $_SER753B.mesInicial == 5 || $_SER753B.mesInicial == 7 || $_SER753B.mesInicial == 8 || $_SER753B.mesInicial == 10 || $_SER753B.mesInicial == 12) {
				var limi = 31;
			} else {
				var limi = 30;
			}

			if ($_SER753B.diaInicial > limi) {
				$_SER753B.diaInicial = $_SER753B.diaInicial - limi;
				$_SER753B.mesInicial = $_SER753B.mesInicial + 1;
			}

			if ($_SER753B.mesInicial > 12) {
				$_SER753B.mesInicial = 1;
				$_SER753B.añoInicial = $_SER753B.añoInicial + 1;
			}

			if ($_SER753B.diaInicial < 10) {
				$_SER753B.diaInicial = $_SER753B.diaInicial.toString();
				$_SER753B.diaInicial = 0 + $_SER753B.diaInicial;
			}

			if ($_SER753B.mesInicial < 10) {
				$_SER753B.mesInicial = $_SER753B.mesInicial.toString();
				$_SER753B.mesInicial = 0 + $_SER753B.mesInicial;
			}

			document.querySelector('#diaFinal2_753B').value = $_SER753B.diaInicial;
			document.querySelector('#mesFinal2_753B').value = $_SER753B.mesInicial;
			document.querySelector('#añoFinal2_753B').value = $_SER753B.añoInicial;
			$_SER753B.fechaFinal2 = parseInt(document.querySelector('#añoFinal2_753B').value + document.querySelector('#mesFinal2_753B').value + document.querySelector('#diaFinal2_753B').value);
			llenarFechas5SER753B();
		}
	);

	// }, 100);
}

function llenarFechas5SER753B() {
	// setTimeout(function () {
	validarInputs(
		{
			// form: '#fechaInicial_SER753B',
			// orden: "2"
		},
		() => {
			// validarNroSemanaSER753B();
		},
		() => {

			$_SER753B.diaInicial = parseInt($_SER753B.diaInicial);
			$_SER753B.mesInicial = parseInt($_SER753B.mesInicial);

			$_SER753B.diaInicial = $_SER753B.diaInicial + 1;

			if ($_SER753B.mesInicial == 2) {
				if ($_SER753B.añoInicial == 2000 || $_SER753B.añoInicial == 2004 || $_SER753B.añoInicial == 2008 || $_SER753B.añoInicial == 2012 || $_SER753B.añoInicial == 2016 || $_SER753B.añoInicial == 2020) {
					var limi = 29;
				} else {
					var limi = 28;
				}
			} else if ($_SER753B.mesInicial == 1 || $_SER753B.mesInicial == 3 || $_SER753B.mesInicial == 5 || $_SER753B.mesInicial == 7 || $_SER753B.mesInicial == 8 || $_SER753B.mesInicial == 10 || $_SER753B.mesInicial == 12) {
				var limi = 31;
			} else {
				var limi = 30;
			}

			if ($_SER753B.diaInicial > limi) {
				$_SER753B.diaInicial = $_SER753B.diaInicial - limi;
				$_SER753B.mesInicial = $_SER753B.mesInicial + 1;
			}

			if ($_SER753B.mesInicial > 12) {
				$_SER753B.mesInicial = 1;
				$_SER753B.añoInicial = $_SER753B.añoInicial + 1;
			}

			if ($_SER753B.diaInicial < 10) {
				$_SER753B.diaInicial = $_SER753B.diaInicial.toString();
				$_SER753B.diaInicial = 0 + $_SER753B.diaInicial;
			}

			if ($_SER753B.mesInicial < 10) {
				$_SER753B.mesInicial = $_SER753B.mesInicial.toString();
				$_SER753B.mesInicial = 0 + $_SER753B.mesInicial;
			}

			document.querySelector('#diaInicial3_753B').value = $_SER753B.diaInicial;
			document.querySelector('#mesInicial3_753B').value = $_SER753B.mesInicial;
			document.querySelector('#añoInicial3_753B').value = $_SER753B.añoInicial;
			$_SER753B.fechaInicial3 = parseInt(document.querySelector('#añoInicial3_753B').value + document.querySelector('#mesInicial3_753B').value + document.querySelector('#diaInicial3_753B').value);
			llenarFechas6SER753B();
		}
	);

	// }, 100);
}

function llenarFechas6SER753B() {
	// setTimeout(function () {
	validarInputs(
		{
			// form: '#fechaInicial_SER753B',
			// orden: "2"
		},
		() => {
			// validarNroSemanaSER753B();
		},
		() => {

			$_SER753B.diaInicial = parseInt($_SER753B.diaInicial);
			$_SER753B.mesInicial = parseInt($_SER753B.mesInicial);

			$_SER753B.diaInicial = $_SER753B.diaInicial + 6;

			if ($_SER753B.mesInicial == 2) {
				if ($_SER753B.añoInicial == 2000 || $_SER753B.añoInicial == 2004 || $_SER753B.añoInicial == 2008 || $_SER753B.añoInicial == 2012 || $_SER753B.añoInicial == 2016 || $_SER753B.añoInicial == 2020) {
					var limi = 29;
				} else {
					var limi = 28;
				}
			} else if ($_SER753B.mesInicial == 1 || $_SER753B.mesInicial == 3 || $_SER753B.mesInicial == 5 || $_SER753B.mesInicial == 7 || $_SER753B.mesInicial == 8 || $_SER753B.mesInicial == 10 || $_SER753B.mesInicial == 12) {
				var limi = 31;
			} else {
				var limi = 30;
			}

			if ($_SER753B.diaInicial > limi) {
				$_SER753B.diaInicial = $_SER753B.diaInicial - limi;
				$_SER753B.mesInicial = $_SER753B.mesInicial + 1;
			}

			if ($_SER753B.mesInicial > 12) {
				$_SER753B.mesInicial = 1;
				$_SER753B.añoInicial = $_SER753B.añoInicial + 1;
			}

			if ($_SER753B.diaInicial < 10) {
				$_SER753B.diaInicial = $_SER753B.diaInicial.toString();
				$_SER753B.diaInicial = 0 + $_SER753B.diaInicial;
			}

			if ($_SER753B.mesInicial < 10) {
				$_SER753B.mesInicial = $_SER753B.mesInicial.toString();
				$_SER753B.mesInicial = 0 + $_SER753B.mesInicial;
			}

			document.querySelector('#diaFinal3_753B').value = $_SER753B.diaInicial;
			document.querySelector('#mesFinal3_753B').value = $_SER753B.mesInicial;
			document.querySelector('#añoFinal3_753B').value = $_SER753B.añoInicial;

			// $_SER753B.fechaInicial = parseInt(document.querySelector('#añoInicial_753B').value + document.querySelector('#mesInicial_753B').value + document.querySelector('#diaInicial_753B').value);
			$_SER753B.fechaFinal3 = parseInt(document.querySelector('#añoFinal3_753B').value + document.querySelector('#mesFinal3_753B').value + document.querySelector('#diaFinal3_753B').value);

			validarEntidadSER753B();
		}
	);
	// }, 100);
}

function validarEntidadSER753B() {
	document.querySelector('#entidad_SER753B').value == "" ? document.querySelector('#entidad_SER753B').value = '99' : false;
	validarInputs(
		{
			form: '#validarEntidad_753B',
			orden: '1'
		},
		() => {
			validarNroSemanaSER753B();
		},
		() => {
			$_SER753B['entidad'] = document.getElementById("entidad_SER753B").value.trim();
			if ($_SER753B.entidad == "99") {
				document.querySelector('#descripEntidad_SER753B').value = "TODOS LOS TERCEROS";
				validarCentroCostosSER753B();
			} else {
				const res = $_SER753B.TERCEROS.find(e => e.COD.trim() == $_SER753B.entidad);
				if (res == undefined) {
					document.getElementById("entidad_SER753B").value = "";
					CON851('01', '01', null, 'error', 'error');
					validarEntidadSER753B();
				} else {
					console.log("valido");
					document.querySelector('#descripEntidad_SER753B').value = res.NOMBRE;
					validarCentroCostosSER753B();
				}
			}

		}
	);
}

function validarCentroCostosSER753B() {
	document.querySelector('#costo_SER753B').value == "" ? document.querySelector('#costo_SER753B').setAttribute('placeholder', '****') : false;
	validarInputs(
		{
			form: '#validarCosto_753B',
			orden: '1'
		},
		() => {
			validarEntidadSER753B();
		},
		() => {
			$_SER753B['costo'] = document.getElementById("costo_SER753B").value.trim();
			if ($_SER753B.costo == "****") {
				console.log('sale')
				document.querySelector('#descripCosto_SER753B').value = "TODOS LOS C. COSTOS";
				_envioImpresion();
			} else {
				const res = $_SER753B.COSTOS.find(e => e.COD.trim() == $_SER753B.costo);
				if (res == undefined) {
					CON851('01', '01', null, 'error', 'error');
					validarCentroCostosSER753B();
				} else {
					document.querySelector('#descripCosto_SER753B').value = res.NOMBRE;
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
				+ '|' + $_SER753B.nroSemana
				+ '|' + $_SER753B.fechaInicial.toString()
				+ '|' + $_SER753B.fechaFinal.toString()
				+ '|' + $_SER753B.fechaInicial1.toString()
				+ '|' + $_SER753B.fechaFinal1.toString()
				+ '|' + $_SER753B.fechaInicial2.toString()
				+ '|' + $_SER753B.fechaFinal2.toString()
				+ '|' + $_SER753B.fechaInicial3.toString()
				+ '|' + $_SER753B.fechaFinal3.toString()
				+ '|' + $_SER753B.entidad
				+ '|' + $_SER753B.costo

			console.log(datos_envio, "datos_envio");

			postData({ datosh: datos_envio }, get_url('app/SALUD/SER753B.DLL'))
				.then(_montarImpresion_SER753B)
				.catch(err => {
					console.log(err)
					validarCentroCostosSER753B();
				})
		} else {
			validarCentroCostosSER753B();
		}
	}, {
		msj: '00',
		overlay_show: true
	})
}

function _montarImpresion_SER753B(data) {
	data.Listado.pop();
	data.ENCABEZADO = [];

	let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
	let nit = $_USUA_GLOBAL[0].NIT.toString();
	let fecha = moment().format('MMM DD/YY');
	let codigo = $_USUA_GLOBAL[0].COD_CIUD + $_USUA_GLOBAL[0].NUIR;

	data.ENCABEZADO.push(nombreEmpresa);
	data.ENCABEZADO.push(nit);
	data.ENCABEZADO.push(fecha);
	data.ENCABEZADO.push(codigo);
	data.ENCABEZADO.push($_SER753B.fechaInicial);
	data.ENCABEZADO.push($_SER753B.fechaFinal3);
	data.ENCABEZADO.push($_SER753B.nroSemana);

	postData({ datosh: datosEnvio() }, get_url('app/CONTAB/CON809.DLL'))
		.then(data1 => {
			console.log(data1, 'data1')
			const res = data1.CIUDAD.find(e => e.COD == $_USUA_GLOBAL[0].COD_CIUD);
			data.ENCABEZADO.push(res.DEPART);
			console.log(res.DEPART);
		})
		.catch(err => {
			console.log(err)
		})


	var impresion = {
		datos: data,
		tipo: $_FORMATO_753B.toLowerCase(),
		formato: 'salud/SER753B.formato.html',
		nombre: 'NOTIFICACION-ENFERMEDADES-TRANSMISIBLES-' + localStorage.Sesion
	}
	loader('hide')

	imprimir(impresion, () => {
		_inputControl('reset');
		$('#formatoimpresion_753B').val(null).removeAttr('disabled').trigger('change');
		$('#formatoimpresion_753B').select2('open')
		// _toggleNav() 
	});
}

function _cargarEntidades() {
	postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON802.DLL"))
		.then(data => {
			$_SER753B.TERCEROS = data.TERCEROS;
			$_SER753B.TERCEROS.pop();
			console.log($_SER753B.TERCEROS, "ENTIDADES")
			_cargarCostos();
		}).catch(err => {
			loader('hide');
			console.log("error entidades")
			_toggleNav();
		})
}

function _cargarCostos() {
	postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON803.DLL"))
		.then(data => {
			loader('hide');
			$_SER753B.COSTOS = data.COSTO;
			$_SER753B.COSTOS.pop();
			console.log(data);
			setTimeout(function () { $('#formatoimpresion_753B').select2('open') }, 500)
		}).catch(err => {
			loader('hide');
			_toggleNav();
		})
}

function _ventanaEntidadesSER753B(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA DE TERCEROS",
			columnas: ["COD", "NOMBRE"],
			data: $_SER753B.TERCEROS,
			callback_esc: () => {
				$("#entidad_SER753B").focus();
			},
			callback: (data) => {
				document.querySelector('#entidad_SER753B').value = data.COD;
				document.querySelector('#descripEntidad_SER753B').value = data.NOMBRE;
				_enterInput('#entidad_SER753B');
			}
		});
	}
}

function _ventanaCostosSER753B(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA DE CENTROS DE COSTOS",
			columnas: ["COD", "NOMBRE", "DESCRIP"],
			data: $_SER753B.COSTOS,
			callback_esc: function () {
				$("#costo_SER753B").focus();
			},
			callback: function (data) {
				document.getElementById('costo_SER753B').value = data.COD;
				_enterInput('#costo_SER753B');
			}
		});
	}
}