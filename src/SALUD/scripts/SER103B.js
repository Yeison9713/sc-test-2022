// CLINICAS - LISTADO DE PRECIOS DE SERVICIOS POR CONVENIO
// DAVID.M - 08/06/2020 - OPCION 9-7-2-3 SALUD

$(document).ready(() => {
	_inputControl("reset");
	_inputControl("disabled");
	nombreOpcion('9-7-2-3 - Listado de tarifas por convenio');
	loader('show')
	_toggleF8([
		{ input: 'convenio', app: 'SER103B', funct: _ventanaTarifasSER103B },
		{ input: 'tipo', app: 'SER103B', funct: ventanaTipoServiciosSER103B }
	]);

	iniciarObjetosFNF8();
	loader('hide')
	validarTarifasSER103B();
})

function validarTarifasSER103B() {
	validarInputs(
		{
			form: '#validarConvenio_103B',
			orden: '1'
		},
		() => {
			_toggleNav()
		},
		() => {
			SER103B['convenio'] = document.getElementById("convenio_SER103B").value.toUpperCase().trim();
			if (SER103B.convenio == "**") {
				document.querySelector('#descripConvenio_SER103B').value = "TODOS LOS CONVENIOS";
				validarTipoServiciosSER103B();
			} else {
				const res = $_ArrayTarifasSER103B.find(e => e.COD == SER103B.convenio);
				if (res == undefined) {
					document.getElementById("convenio_SER103B").value = "";
					validarTarifasSER103B();
					CON851('01', '01', validarTarifasSER103B, 'error', 'error');
				} else {
					console.log("valido");
					document.querySelector('#descripConvenio_SER103B').value = res.DESCRIP;
					validarTipoServiciosSER103B();
				}
			}
		}
	);
}

function validarTipoServiciosSER103B() {
	validarInputs(
		{
			form: '#validarTipo_103B',
			orden: '1'
		},
		() => {
			validarTarifasSER103B();
			console.log('esc')
		},
		() => {
			SER103B['tipo'] = document.getElementById("tipo_SER103B").value;
			const res = ["1", "2", "3", "4", "5", "6", "7", "*"].find(e => e == SER103B.tipo);
			if (res == undefined) {
				document.getElementById("tipo_SER103B").value = "";
				validarTipoServiciosSER103B();
			} else {
				llenarDescripSER103B(SER103B['tipo']);
			}
		}
	);
}

function ventanaTipoServiciosSER103B(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		TIPOSERVICIOS({ popup: 'on', seleccion: parseInt(document.getElementById('tipo_SER103B').value) },
			() => {
				document.getElementById('tipo_SER103B').value = "";
				document.getElementById('tipo_SER103B').focus();
			},
			(data) => {
				document.getElementById("tipo_SER103B").value = parseFloat(data.COD);
				_enterInput('#tipo_SER103B')
			}
		)
	}
}

function llenarDescripSER103B(COD) {
	COD != "*" ? COD = parseInt(COD) : false;
	document.getElementById("tipo_SER103B").value = COD;
	switch (COD) {
		case 1:
			document.getElementById("descripTipo_SER103B").value = "CIRUGIA";
			break;
		case 2:
			document.getElementById("descripTipo_SER103B").value = "LABORATORIO";
			break;
		case 3:
			document.getElementById("descripTipo_SER103B").value = "RAYOS X";
			break;
		case 4:
			document.getElementById("descripTipo_SER103B").value = "OTROS SERVICIOS";
			break;
		case 5:
			document.getElementById("descripTipo_SER103B").value = "CONSULTAS Y TERAPIAS";
			break;
		case 6:
			document.getElementById("descripTipo_SER103B").value = "PATOLOGIAS CITOLOGIA";
			break;
		case 7:
			document.getElementById("descripTipo_SER103B").value = "PROMOCION Y PREVENC.";
			break;
		case "*":
			document.getElementById("descripTipo_SER103B").value = "TODOS LOS TIPOS";
			break;
	}
	SER103B.NOMBRE_TIPO = document.getElementById("descripTipo_SER103B").value.padEnd(20, " ");

	validarGrupoXXSER103B();
}

function validarGrupoXXSER103B() {
	document.getElementById("grupo_SER103B").setAttribute("placeholder", "N");
	validarInputs(
		{
			form: '#validarGrupo_103B',
			orden: '1'
		},
		() => {
			document.querySelector('#descripTipo_SER103B').value = "";
			validarTipoServiciosSER103B();
		},
		() => {
			SER103B['grupo'] = document.getElementById("grupo_SER103B").value.toUpperCase();
			const res = ["S", "N"].find(e => e == SER103B.grupo);
			if (res == undefined) {
				document.getElementById("grupo_SER103B").value = "";
				validarGrupoXXSER103B();
			} else {
				console.log("Grp valido");
				validarCodigosBloqSER103B();
			}
		}
	);
}

function validarCodigosBloqSER103B() {
	document.getElementById("codigo_SER103B").setAttribute("placeholder", "S");
	validarInputs(
		{
			form: '#validarCodigo_103B',
			orden: '1'
		},
		() => {
			validarGrupoXXSER103B();
		},
		() => {
			SER103B['codigo'] = document.getElementById("codigo_SER103B").value.toUpperCase();
			const res = ["S", "N"].find(e => e == SER103B.codigo);
			if (res == undefined) {
				document.getElementById("codigo_SER103B").value = "";
				validarCodigosBloqSER103B();
			} else {
				console.log("Cod valido");
				_envioImpresion();
			}
		}
	);
}

function _envioImpresion() {
	CON850_P(function (e) {
		if (e.id == 'S') {

			loader('show')
			var datos_envio = datosEnvio() + SER103B.convenio + '|' + SER103B.tipo + '|' + SER103B.grupo + '|' + SER103B.codigo;
			postData({ datosh: datos_envio }, get_url('app/SALUD/SER103B.DLL'))
				.then(_montarImpresion_SER103B)
				.catch(err => {
					console.log(err)
					validarTarifasSER103B();
				})

		} else {
			validarCodigosBloqSER103B();
		}
	}, {
		msj: '00',
		overlay_show: true
	})
}

function iniciarObjetosFNF8(callback) {
	SER103B = []; $_ArrayTarifasSER103B = [];
	obtenerDatosCompletos({ nombreFd: 'TARIFAS' }, (data) => {
		$_ArrayTarifasSER103B = data.TARIFAS;
		$_ArrayTarifasSER103B.pop();
	});
}

function _ventanaTarifasSER103B(e) {
	console.debug(e, 'evento F8')
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		_ventanaDatos({
			titulo: "VENTANA DE TRANSACCIONES",
			columnas: ["COD", "DESCRIP"],
			data: $_ArrayTarifasSER103B,
			callback_esc: () => { $('#convenio_SER103B').focus() },
			callback: (data) => {
				document.querySelector('#convenio_SER103B').value = (data.COD);
				document.querySelector('#descripConvenio_SER103B').value = (data.DESCRIP);
				_enterInput('#convenio_SER103B');
			}
		});
	}
}

function _montarImpresion_SER103B(data) {
	data.LISTADO.pop();
	console.log(data);
	data.ENCABEZADO = [];

	let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
	let nit = $_USUA_GLOBAL[0].NIT.toString();
	let fecha = moment().format('MMM DD/YY');

	for (i in data.LISTADO) {
		data.LISTADO[i]['DESCRIPCION_L'] = data.LISTADO[i]['DESCRIPCION_L'].replace(/\�/g, "Ñ")
		data.LISTADO[i]['DESCRIPCION2_L'] = data.LISTADO[i]['DESCRIPCION2_L'].replace(/\�/g, "Ñ")
		data.LISTADO[i]['PRECIO_L'] = data.LISTADO[i]['PRECIO_L'].replace(/\ /g, "")
		data.LISTADO[i]['PRECIO_L'] = data.LISTADO[i]['PRECIO_L'].replace(/\,/g, "")
		data.LISTADO[i]['VALORSIN_L'] = data.LISTADO[i]['VALORSIN_L'].replace(/\ /g, "")
		data.LISTADO[i]['VALORSIN_L'] = data.LISTADO[i]['VALORSIN_L'].replace(/\,/g, "")
		data.LISTADO[i]['VALOR_L'] = data.LISTADO[i]['VALOR_L'].replace(/\ /g, "")
		data.LISTADO[i]['VALOR_L'] = data.LISTADO[i]['VALOR_L'].replace(/\,/g, "")
	}

	if (data.LISTADO.length < 1) {
		CON851('08', '08', null, 'error', 'error');
		loader('hide');
		validarCodigosBloqSER103B();
	} else {
		var columnas = [
			{
				title: "TAR",
				value: "COD_L",
				filterButton: true,
				format: 'string'
			},
			{
				title: "CODIGO",
				value: "COD_SER_L",
				format: 'string'
			},
			{
				title: "DESCRIPCION CUP",
				value: "DESCRIPCION_L",
			},
			{
				title: "DESCRIPCION TAR",
				value: "DESCRIPCION2_L"
			},
			{
				title: "TIPO",
				value: "TIPO_L",
				format: 'string',
				filterButton: true
			},
			{
				title: "MONTO",
				value: "PRECIO_L",
				format: 'string',
				totalsRowFunction: 'sum'
			},
			{
				title: "FORMA LIQ",
				value: "FORMA_LIQ_L",
				filterButton: true
			},
			{
				title: "INCREM",
				value: "FACTOR_L"
			},
			{
				title: "VALOR INCREM",
				value: "VALORSIN_L",
				format: 'money',
				totalsRowFunction: 'sum'
			},
			{
				title: "COD EQUI",
				value: "COD_EQUIV_L"
			},
			{
				title: "COD CUENTA",
				value: "COD_CUENTA_L"
			},
			{
				title: "VALOR PLENO",
				value: "VALOR_L",
				format: 'money',
				totalsRowFunction: 'sum'
			},
		]

		var header_format = [
			{ text: `${nombreEmpresa}`, bold: true, size: 16 },
			`NIT: ${nit}`,
			`Fecha de reporte: ${fecha}`,
		]

		_impresion2({
			tipo: 'excel',
			header: header_format, 
			logo: `${nit}.bmp`,
			// ruta_logo: 'C:\\LOGOS\\', //
			tabla: {
				columnas,
				data: data.LISTADO,
				totalsRow: true
			},
			archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmss')}`,
			scale: 75,
			orientation: 'landscape'
		})
			.then(() => {
				console.log('Proceso terminado')
				_inputControl('reset');
				validarTarifasSER103B();
				loader('hide')
				toastr.success("Listado generado correctamente");
			})
			.catch(() => {
				validarCodigosBloqSER103B();
				loader('hide');
				console.log('Proceso error')
			})
	}
}