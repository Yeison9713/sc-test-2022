// CLINICAS - PLANO DE TARIFAS POR CONVENIO
// SANTIAGO - 16/06/2020 - OPCION 9-7-2-7 SALUD
var $_SER107B = [], $_FORMATO_107B = [];

$(document).ready(() => {
	nombreOpcion('9,7,2,7 - Plano de tarifas por convenio');
	loader('show')
	_inputControl("reset");
	_inputControl("disabled");
	_cargarConvenios();

	_toggleF8([
		{ input: 'convenio', app: 'SER107B', funct: _ventanaConvenioSER107B },
		{ input: 'tipo', app: 'SER107B', funct: ventanaTipoSER107B },
		{ input: 'codigo', app: 'SER107B', funct: _ventanaCodSER107B }
	]);
	$('#formatoimpresion_107B').select2().on('select2:select', validarFormato_107B);
})

function habilitarFORMATO_107B() {
	_inputControl('reset');
	$('#formatoimpresion_107B').val(null).removeAttr('disabled').trigger('change');
	$('#formatoimpresion_107B').select2('open')
}

function validarFormato_107B() {
	var seleccionado = $(this).val();
	if (seleccionado != "3") {
		if (seleccionado == "1") $_FORMATO_107B = 'PDF';
		else if (seleccionado == "2") $_FORMATO_107B = 'CSV';

		$(this).attr('disabled', 'true');
		validarConvenioSER107B();
	} else {
		$(this).attr('disabled', 'true');
		_toggleNav();
	}
}

function validarConvenioSER107B() {
	validarInputs(
		{
			form: '#validarConvenio_107B',
			orden: '1'
		},
		() => {
			$('#formatoimpresion_107B').val(null).removeAttr('disabled').trigger('change');
			$('#formatoimpresion_107B').select2('open')
		},
		() => {
			$_SER107B['convenio'] = document.getElementById("convenio_SER107B").value.toUpperCase().trim();
			if ($_SER107B.convenio == "**") {
				document.querySelector('#descripConvenio_SER107B').value = "TODOS LOS CONVENIOS";
				validarTipoSER107B();
			} else {
				const res = $_SER107B.TARIFAS.find(e => e.COD == $_SER107B.convenio);
				if (res == undefined) {
					document.getElementById("convenio_SER107B").value = "";
					CON851('01', '01', null, 'error', 'error');
					validarConvenioSER107B();
				} else {
					console.log("valido");
					document.querySelector('#descripConvenio_SER107B').value = res.DESCRIP;
					validarTipoSER107B();
				}
			}
		}
	);
}

function validarTipoSER107B() {
	validarInputs(
		{
			form: '#validarTipo_107B',
			orden: '1'
		},
		() => {
			validarConvenioSER107B();
		},
		() => {
			$_SER107B['tipo'] = document.getElementById("tipo_SER107B").value;
			const res = ["1", "2", "3", "4", "5", "6", "7", "*"].find(e => e == $_SER107B.tipo);
			if (res == undefined) {
				document.getElementById("tipo_SER107B").value = "";
				validarTipoSER107B();
			} else {
				llenarDescripSER107B($_SER107B['tipo']);
			}
		}
	);
}

function ventanaTipoSER107B(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		TIPOSERVICIOS({ popup: 'on', seleccion: parseInt(document.getElementById('tipo_SER107B').value) },
			() => {
				document.getElementById('tipo_SER107B').value = "";
				document.getElementById('tipo_SER107B').focus();
			},
			(data) => {
				document.getElementById("tipo_SER107B").value = parseFloat(data.COD);
				_enterInput('#tipo_SER107B')
			}
		)
	}
}

function llenarDescripSER107B(COD) {
	COD != "*" ? COD = parseInt(COD) : false;
	document.getElementById("tipo_SER107B").value = COD;
	switch (COD) {
		case 1:
			document.getElementById("descripTipo_SER107B").value = "CIRUGIA";
			break;
		case 2:
			document.getElementById("descripTipo_SER107B").value = "LABORATORIO";
			break;
		case 3:
			document.getElementById("descripTipo_SER107B").value = "RAYOS X";
			break;
		case 4:
			document.getElementById("descripTipo_SER107B").value = "OTROS SERVICIOS";
			break;
		case 5:
			document.getElementById("descripTipo_SER107B").value = "CONSULTAS Y TERAPIAS";
			break;
		case 6:
			document.getElementById("descripTipo_SER107B").value = "PATOLOGIAS CITOLOGIA";
			break;
		case 7:
			document.getElementById("descripTipo_SER107B").value = "PROMOCION Y PREVENC.";
			break;
		case "*":
			document.getElementById("descripTipo_SER107B").value = "TODOS LOS TIPOS";
			break;
	}
	$_SER107B.NOMBRE_TIPO = document.getElementById("descripTipo_SER107B").value.padEnd(20, " ");

	validarCodSER107B();
}

function validarCodSER107B() {
	validarInputs(
		{
			form: '#validarCodigo_107B',
			orden: '1'
		},
		() => {
			validarTipoSER107B();
		},
		() => {
			$_SER107B['codigo'] = document.getElementById("codigo_SER107B").value.toUpperCase().trim();
				const res = $_SER107B.ENTIDADES.find(e => e['COD-ENT'].trim() == $_SER107B.codigo.trim());
				if (res == undefined) {
					document.getElementById("codigo_SER107B").value = "";
					CON851('01', '01', null, 'error', 'error');
					validarCodSER107B();
				} else {
					console.log("valido");
					document.querySelector('#descripCodigo_SER107B').value = res['NOMBRE-ENT'];
					_envioImpresion();
			}
		}
	);
}

function _envioImpresion() {
	CON850_P(function (e) {
		if (e.id == 'S') {

			loader('show')
			var datos_envio = datosEnvio() + $_SER107B.convenio + '|' + $_SER107B.tipo + '|' + $_SER107B.codigo;
			postData({ datosh: datos_envio }, get_url('app/SALUD/SER107B.DLL'))
				.then(_montarImpresion_SER107B)
				.catch(err => {
					console.log(err)
					validarConvenioSER107B();
				})

		} else {
			validarCodSER107B();
		}
	}, {
		msj: '00',
		overlay_show: true
	})
}

function _montarImpresion_SER107B(data) {
	data.ENCABEZADO = [];

	let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
	let nit = $_USUA_GLOBAL[0].NIT.toString();
	let fecha = moment().format('MMM DD/YY');

	data.ENCABEZADO.push(nombreEmpresa);
	data.ENCABEZADO.push(nit);
	data.ENCABEZADO.push(fecha);

	var impresion = {
		datos: data,
		tipo: $_FORMATO_107B.toLowerCase(),
		formato: 'salud/SER107B.formato.html',
		nombre: 'LISTADO-GENERAL-TARIFAS-' + localStorage.Sesion
	}
	loader('hide')

	imprimir(impresion, () => {
		_inputControl('reset');
		$('#formatoimpresion_107B').val(null).removeAttr('disabled').trigger('change');
		$('#formatoimpresion_107B').select2('open')
		// _toggleNav() 
	});
}


function _cargarConvenios() {
	postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER804.DLL"))
		.then(data => {
			console.log(data);
			$_SER107B.TARIFAS = data.TARIFAS;
			_cargarEntidades();
		}).catch(err => {
			loader('hide');
			_toggleNav();
		})
}

function _cargarEntidades() {
	postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER853.DLL"))
		.then(data => {
			loader('hide');
			$_SER107B.ENTIDADES = data.ENTIDADES;
			setTimeout(function () { $('#formatoimpresion_107B').select2('open') }, 500)
		}).catch(err => {
			loader('hide');
			_toggleNav();
		})
}

function _ventanaConvenioSER107B(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA DE CONVENIOS",
			columnas: ["COD", "DESCRIP"],
			data: $_SER107B.TARIFAS,
			callback_esc: () => { $('#convenio_SER107B').focus() },
			callback: (data) => {
				document.querySelector('#convenio_SER107B').value = (data.COD);
				document.querySelector('#descripConvenio_SER107B').value = (data.DESCRIP);
				_enterInput('#convenio_SER107B');
			}
		});
	}
}

function _ventanaCodSER107B(e) {
		if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
			_ventanaDatos({
				titulo: "VENTANA DE ENTIDADES",
				columnas: ["COD-ENT", "NOMBRE-ENT"],
				data: $_SER107B.ENTIDADES,
				callback_esc: () => { $('#codigo_SER107B').focus() },
				callback: (data) => {
					document.querySelector('#codigo_SER107B').value = (data['COD-ENT']);
					document.querySelector('#descripCodigo_SER107B').value = (data['NOMBRE-ENT']);
					_enterInput('#codigo_SER107B');
				}
			});
		}
	}