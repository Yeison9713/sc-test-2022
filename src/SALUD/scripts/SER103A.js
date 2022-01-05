// CLINICAS - LISTADO DE PRECIOS DE SERVICIOS POR TIPO
// DAVID.M - 05/06/2020 - OPCION 9-7-2-2 SALUD
// DAVID.M - 23/07/2020 - Se convierte a formato XLSX

SER103A = [];
$_FORMATO_103A = [];

$(document).ready(() => {
	_inputControl("reset");
	_inputControl("disabled");
	nombreOpcion('9, 7, 2, 2 - Listado de tarifas por tipo');
	loader('show')
	_toggleF8([
		{ input: 'tipo', app: 'SER103A', funct: ventanaTipoServiciosSER103A }
	]);

	loader('hide')
	validarTipoServiciosSER103A();
})


function validarTipoServiciosSER103A() {
	validarInputs(
		{
			form: '#validarTipo_103A',
			orden: '1'
		},
		() => {
			_toggleNav()
		},
		() => {
			SER103A['tipo'] = document.getElementById("tipo_SER103A").value;
			const res = ["1", "2", "3", "4", "5", "6", "7"].find(e => e == SER103A.tipo);
			if (res == undefined) {
				document.getElementById("tipo_SER103A").value = "";
				validarTipoServiciosSER103A();
			} else {
				console.log("valido");
				llenarDescripSER103A(SER103A.tipo);
			}
		}
	);
}

function ventanaTipoServiciosSER103A(e) {
	if (e.type == "keydown" && e.which == 119 || e.type == 'click') {
		TIPOSERVICIOS({ popup: 'on', seleccion: parseInt(document.getElementById('tipo_SER103A').value) },
			validarTipoServiciosSER103A,
			(data) => { llenarDescripSER103A(data.COD) }
		)
	}
}

function llenarDescripSER103A(COD) {
	document.getElementById("tipo_SER103A").value = parseInt(COD);
	switch (parseInt(COD)) {
		case 1:
			document.getElementById("descripTipo_SER103A").value = "CIRUGIA"
			break;
		case 2:
			document.getElementById("descripTipo_SER103A").value = "LABORATORIO"
			break;
		case 3:
			document.getElementById("descripTipo_SER103A").value = "RAYOS X"
			break;
		case 4:
			document.getElementById("descripTipo_SER103A").value = "OTROS SERVICIOS"
			break;
		case 5:
			document.getElementById("descripTipo_SER103A").value = "CONSULTAS Y TERAPIAS"
			break;
		case 6:
			document.getElementById("descripTipo_SER103A").value = "PATOLOGIAS CITOLOGIA"
			break;
		case 7:
			document.getElementById("descripTipo_SER103A").value = "PROMOCION Y PREVENC."
			break;
	}
	SER103A.NOMBRE_TIPO = document.getElementById("descripTipo_SER103A").value.padEnd(20, " ");
	_envioImpresion();
}

function _envioImpresion() {
	CON850_P(function (e) {
		if (e.id == 'S') {
			loader('show')
			var datos_envio = datosEnvio() + document.getElementById("tipo_SER103A").value + '|' + SER103A.NOMBRE_TIPO + '|';
			postData({ datosh: datos_envio }, get_url('app/SALUD/SER103A.DLL'))
				.then(_montarImpresion_SER103A)
				.catch(err => {
					console.log(err)
					validarTipoServiciosSER103A();
				})
		} else {
			validarTipoServiciosSER103A();
		}
	}, {
		msj: '00',
		overlay_show: true
	})
}

function _montarImpresion_SER103A(data) {
	data.ENCABEZADO = [];

	let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
	let nit = $_USUA_GLOBAL[0].NIT.toString();
	let fechaAlfa = moment().format('MMMM DD/YYYY').toUpperCase();

	for (i in data.LISTADO) {
		data.LISTADO[i]['CODIGO_L'] = data.LISTADO[i]['COD_L'] + data.LISTADO[i]['COD_SER_L']
		data.LISTADO[i]['DESCRIP_L'] = data.LISTADO[i]['DESCRIP_L'].replace(/\�/g, "Ñ")
		data.LISTADO[i]['PRECIO_L'] = data.LISTADO[i]['PRECIO_L'].replace(/\ /g, "")
		data.LISTADO[i]['PRECIO_L'] = data.LISTADO[i]['PRECIO_L'].replace(/\,/g, "")
	}

	if (data.LISTADO.length < 1) {
		CON851('08', '08', null, 'error', 'error');
		loader('hide')
		validarTipoServiciosSER103A();
	} else {
		var columnas = [
			{
				title: "CODIGO",
				value: "CODIGO_L",
				filterButton: true,
				format: 'string'
			},
			{
				title: "SERVICIO",
				value: "DESCRIP_L"
			},
			{
				title: "TIPO",
				value: "TIPO_L",
				filterButton: true
			},
			{
				title: "MONTO",
				value: "PRECIO_L",
				format: 'money',
				totalsRowFunction: 'sum',
			},
			{
				title: "FORMA LIQ",
				value: "FORMA_LIQ_L",
				filterButton: true
			}
		]

		var header_format = [
			{ text: `${nombreEmpresa}`, bold: true, size: 16 },
			`FACTURACION CATALOGO DE SERVICIOS     NIT: ${nit}`,
			`Fecha de reporte: ${fechaAlfa}`,
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
			archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmss')}`
		})
			.then(() => {
				console.log('Proceso terminado')
				_inputControl('reset');
				validarTipoServiciosSER103A();
				loader('hide')
				toastr.success("Listado generado correctamente");
			})
			.catch(() => {
				console.log('Proceso error')
			})
	}
}