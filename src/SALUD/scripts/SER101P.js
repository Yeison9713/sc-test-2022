// CLINICAS - CATALOGO GRUPO SERVICIOS
// DAVID.M - 05/06/2020 - OPCION 9-7-2-4 SALUD

$_FORMATO_101P = [];

$(document).ready(() => {
	nombreOpcion('9-7-2-4 - Catalogo de grupos servicios');
	$('#formatoimpresion_101P').select2().on('select2:select', validarFormato_101P);
	loader('hide')
	setTimeout(function () { $('#formatoimpresion_101P').select2('open') }, 500)

	// _envioImpresion();
})

function validarFormato_101P() {
	var seleccionado = $(this).val();
	if (seleccionado != "3") {
		if (seleccionado == "1") $_FORMATO_101P = 'PDF';
		else if (seleccionado == "2") $_FORMATO_101P = 'CSV';

		$(this).attr('disabled', 'true');
		_envioImpresion();
	} else {
		$(this).attr('disabled', 'true');
		_toggleNav();
	}
}

function _envioImpresion() {
	CON850_P(function (e) {
		if (e.id == 'S') {
			loader('show')
			var datos_envio = datosEnvio();
			postData({ datosh: datos_envio }, get_url('app/SALUD/SER101P.DLL'))
				.then(_montarImpresion_SER101P)
				.catch(err => {
					console.log(err)
					$('#formatoimpresion_101P').val(null).removeAttr('disabled').trigger('change');
					$('#formatoimpresion_101P').select2('open')
				})
		} else {
			$('#formatoimpresion_101P').val(null).removeAttr('disabled').trigger('change');
			$('#formatoimpresion_101P').select2('open')
		}
	}, {
		msj: '00',
		overlay_show: true
	})
}

function _montarImpresion_SER101P(data) {
	data.LISTADO.pop();
	console.log(data);
	data.ENCABEZADO = [];

	let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
	let nit = $_USUA_GLOBAL[0].NIT.toString();
	let fecha = moment().format('MMM DD/YY');

	data.ENCABEZADO.push(nombreEmpresa);
	data.ENCABEZADO.push(nit);
	data.ENCABEZADO.push(fecha);

	var impresion = {
		datos: data,
		tipo: $_FORMATO_101P.toLowerCase(),
		formato: 'salud/SER101P.formato.html',
		nombre: 'CATALOGO-GRUPOS-SERVICIOS-' + localStorage.Sesion
	}
	loader('hide')

	imprimir(impresion, () => {
		_inputControl('reset');
		$('#formatoimpresion_101P').val(null).removeAttr('disabled').trigger('change');
		$('#formatoimpresion_101P').select2('open')
	});
}