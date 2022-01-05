// CLINICAS - CATALOGO DE PROCEDIM. (CUPS)
// DAVID.M - 11/06/2020 - OPCION 9-7-2-5 SALUD
var $_SER103P = [], $_FORMATO_103P = [];

$(document).ready(() => {
	loader('show')
	_inputControl("reset");
	_inputControl("disabled");
	nombreOpcion('9-7-2-5 - Catalogo de procedim. (cups)');
	_cargarMaestros();
	_toggleF8([
		{ input: 'cta', app: 'SER103P', funct: _ventanaCtaSER103P },
		{ input: 'grupo', app: 'SER103P', funct: _ventanaGrupoSER103P }
	]);
	$('#formatoimpresion_103P').select2().on('select2:select', validarFormato_103P);
})

function habilitarFORMATO_103P() {
	_inputControl('reset');
	$('#formatoimpresion_103P').val(null).removeAttr('disabled').trigger('change');
	$('#formatoimpresion_103P').select2('open')
}

function validarFormato_103P() {
	var seleccionado = $(this).val();
	if (seleccionado != "3") {
		if (seleccionado == "1") $_FORMATO_103P = 'PDF';
		else if (seleccionado == "2") $_FORMATO_103P = 'CSV';

		$(this).attr('disabled', 'true');
		validarGrupoSER103P();
	} else {
		$(this).attr('disabled', 'true');
		_toggleNav();
	}
}

function validarGrupoSER103P() {
	validarInputs(
		{
			form: '#validarGrupo_103P',
			orden: '1'
		},
		() => {
			$('#formatoimpresion_103P').val(null).removeAttr('disabled').trigger('change');
			$('#formatoimpresion_103P').select2('open')
		},
		() => {
			$_SER103P['grupo'] = document.getElementById("grupo_SER103P").value.toUpperCase().trim();
			if ($_SER103P.grupo == "**") {
				document.querySelector('#descripGrupo_SER103P').value = "TODOS LOS GRUPOS";
				validarCtaSER103P();
			} else {
				const res = $_SER103P.GRPSER.find(e => e.COD == $_SER103P.grupo);
				if (res == undefined) {
					document.getElementById("grupo_SER103P").value = "";
					CON851('01', '01', null, 'error', 'error');
					validarGrupoSER103P();
				} else {
					document.querySelector('#descripGrupo_SER103P').value = res.DESCRIP;
					validarCtaSER103P();
				}
			}
		}
	);
}

function validarCtaSER103P() {
	validarInputs(
		{
			form: '#validarCta_103P',
			orden: '1'
		},
		() => {
			validarGrupoSER103P();
		},
		() => {
			$_SER103P['cta'] = document.getElementById("cta_SER103P").value.toUpperCase().trim();
			if ($_SER103P.cta == "****") {
				document.querySelector('#descripCta_SER103P').value = "TODOS LOS CODIGOS";
				_envioImpresion();
			} else {
				const res = $_SER103P.MAESTROS.find(e => e.LLAVE_MAE.substring(0, 11) == $_SER103P.cta);
				if (res == undefined) {
					CON851('01', '01', null, 'error', 'error');
					validarCtaSER103P();
				} else {
					document.querySelector('#descripCta_SER103P').value = res.NOMBRE_MAE;
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
			var datos_envio = datosEnvio() + $_SER103P.grupo + '|' + $_SER103P.cta;
			postData({ datosh: datos_envio }, get_url('app/SALUD/SER103P.DLL'))
				.then(_montarImpresion_SER103P)
				.catch(err => {
					loader("hide");
					console.log(err)
					validarGrupoSER103P();
				})

		} else {
			validarCtaSER103P();
		}
	}, {
		msj: '00',
		overlay_show: true
	})
}

function _montarImpresion_SER103P(data) {
	data.LISTADO.pop();
	data.ENCABEZADO = [];

	let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
	let nit = $_USUA_GLOBAL[0].NIT.toString();
	let fecha = moment().format('MMM DD/YY');
	let fechaAlfa = $_USUA_GLOBAL[0].FECHA_ALFA;

	data.ENCABEZADO.push(nombreEmpresa);
	data.ENCABEZADO.push(nit);
	data.ENCABEZADO.push(fecha);
	data.ENCABEZADO.push(fechaAlfa);

	var impresion = {
		datos: data,
		tipo: $_FORMATO_103P.toLowerCase(),
		formato: 'salud/SER103P.formato.html',
		nombre: 'CATALOGO-PROCEDIM-' + localStorage.Sesion
	}
	loader('hide')

	imprimir(impresion, () => {
		_inputControl('reset');
		$('#formatoimpresion_103P').val(null).removeAttr('disabled').trigger('change');
		$('#formatoimpresion_103P').select2('open')
		// _toggleNav() 
	});
}

function _cargarMaestros() {
	postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON801.DLL"))
		.then(data => {
			$_SER103P.MAESTROS = data.MAESTROS;
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
			$_SER103P.GRPSER = data.CODIGOS;
			$_SER103P.GRPSER.pop();
			setTimeout(function () { $('#formatoimpresion_103P').select2('open') }, 500)
		}).catch(err => {
			loader('hide');
			_toggleNav();
		})
}

function _ventanaCtaSER103P(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos_lite_v2({
			titulo: "VENTANA PLAN DE CUENTAS",
			data: $_SER103P.MAESTROS,
			indice: ["CTA_MAY", "SUB_CTA", "AUX_MAE", "LLAVE_MAE", "NOMBRE_MAE", "TIPO_MAE"],
			mascara: [{
				"LLAVE_MAE": "NUMERO DE CUENTA"
			}],
			minLength: 3,
			callback_esc: function () {
				$('#cta_SER103P').focus();
			}, callback: function (data) {
				console.log(data, "data")
				document.querySelector('#cta_SER103P').value = data.LLAVE_MAE.substring(0, 11);
				document.querySelector('#descripCta_SER103P').value = (data.DESCRIP);
				_enterInput('#cta_SER103P');
			}
		});
	}
}

function _ventanaGrupoSER103P(e) {
	console.debug(e, 'evento F8')
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "GRUPOS DE SERVICIO",
			columnas: ["COD", "DESCRIP"],
			data: $_SER103P.GRPSER,
			callback_esc: function () {
				$('#grupo_SER103P').focus();
			},
			callback: function (data) {
				console.debug(data);
				$('#grupo_SER103P').val(data.COD.trim())
				$('#descripGrupo_SER103P').val(data.DESCRIP.trim())
				_enterInput('#grupo_SER103P');
			}
		});
	}
}