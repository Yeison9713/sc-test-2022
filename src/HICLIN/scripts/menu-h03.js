(() => {
	_confirmar_medico_h03();
})();

function _confirmar_medico_h03() {
	var usuario = localStorage["Usuario"];

	if (usuario == 'GEBC' || usuario == '0101') {
		confirmarNovedad_menu_h03();
	} else {
		if (_consultarAtiende_h03(['1', '2', '3', '6', '7', '8', '0'])) {
			confirmarNovedad_menu_h03();
		} else {
			if ($_USUA_GLOBAL[0].NIT == 900565371 && _consultarAtiende_h03(['4'])) {
				confirmarNovedad_menu_h03();
			} else {
				plantillaError('15', '15', 'MENU-H03', _regresar_menuhis);
			}
		}
	}
}

function confirmarNovedad_menu_h03() {
	var usuario = localStorage["Usuario"], nit = $_USUA_GLOBAL[0].NIT;

	if ($_REG_HC.novedad_hc == '7') {
		$_REG_HC.fecha_hc = moment().format("YYYYMMDD");
		$_REG_HC.hora_hc = moment().format("hhmm");
		_datoUnidad_h03();
	} else {
		if (usuario == 'GEBC' || $_REG_HC.temporal_hc == '1' ||
			(nit == 800037021 && usuario == 'ADMI') ||
			(nit == 892000401 && usuario == 'ADMI')
		) {
			_datoUnidad_h03();
		} else {
			plantillaError('9V', '9V', 'MENU-H03', _regresar_menuhis);
		}
	}
}

function _datoUnidad_h03() {
	if ($_REG_PROF.ATIENDE_PROF == "3" || $_REG_PROF.ATIENDE_PROF == "6") {
		_validardatoUnidad_h03('08')
	} else {
		_ventanaUnidad_h03();
	}
}

function _ventanaUnidad_h03() {
	obtenerDatosCompletos({ nombreFd: "UNSERV" }, (data) => {
		var filterUnser = data.UNSERV.filter(e => { if (e.ESTADO == 'S') return e; })
		POPUP({
			array: filterUnser,
			titulo: "UNIDADES DE SERVICIO",
			indices: [{ id: "COD", label: "DESCRIP" }],
			seleccion: $_REG_HC.unser_hc,
			callback_f: _regresar_menuhis
		},
			(data) => {
				_validardatoUnidad_h03(data.COD);
			}
		)
	}, 'ONLY')
}

function _validardatoUnidad_h03(unidad) {
	var usuario = localStorage["Usuario"],
		sw = 0;
	$_REG_HC.unser_hc = unidad;
	$_REG_HC.serv_hc = unidad;

	var espejo_nits = [832002436, 845000038, 900005594, 800037979, 830511298, 830515242, 822001570];
	var nit = espejo_nits.find(e => { if (e == $_USUA_GLOBAL[0].NIT) return e; });

	if (nit) {

		if ($_COMP.tipo == "5") {
			if (unidad != "02") {
				if (usuario != "GEBC" || usuario != "ADMI") {
					sw = 1;
					plantillaToast("B1", "B1", null, "error", "error");
				}
			}
		}

		if ($_COMP.tipo == "7") {
			if (unidad !== "08") {
				if (usuario !== "GEBC" || usuario !== "ADMI") {
					sw = 1;
					plantillaToast("B1", "B1", null, "error", "error");
				}
			} else if (unidad !== "88") {
				if (unidad !== "08") {
					sw = 1;
					plantillaToast("B1", "B1", null, "error", "error");
				}
			}
		}
	}

	if (sw == 0) {
		finValidarUnidad_h03(unidad);
	} else {
		_datoUnidad_h03();
	}
}

function finValidarUnidad_h03(unidad) {
	//Condiccion Hospital Fuente de Oro
	if ($_USUA_GLOBAL[0].NIT == 822001570 && $_COMP.tipo == "5" && unidad == "08") {
		plantillaError('B1', 'B1', '', _datoUnidad_h03)
	} else {
		setTimeout(() => { datoFinalidad_h03(); }, 500);
	}
}

function datoFinalidad_h03() {
	if ($_REG_HC.serv_hc == 8) {
		var listFinalidad = datos_finalidad(
			$_USUA_GLOBAL[0].NIT,
			$_REG_HC.sexo_hc,
			$_REG_HC.edad_hc
		);
		POPUP(
			{
				titulo: "FINALIDAD",
				array: listFinalidad,
				indices: [{ id: "codigo", label: "descripcion" }],
				seleccion: $_REG_HC.finalid_hc,
				callback_f: function () {
					if (
						$_REG_PROF.ATIENDE_PROF == "3" ||
						$_REG_PROF.ATIENDE_PROF == "6"
					) {
						CON851P("03", seleccionarPrograma_h03, _regresar_menuhis);
					} else {
						setTimeout(() => {
							_ventanaUnidad_h03();
						}, 350);
					}
				},
			},
			_validarFinalidad
		);
	} else {
		$_REG_HC.finalid_hc = 10;
		seleccionarPrograma_h03();
	}
}

function _validarFinalidad(data) {
	var nit = $_USUA_GLOBAL[0].NIT;
	if ((nit == 900005594 || nit == 800037979) &&
		(data.codigo == "10" || data.codigo == "11") &&
		$_REG_PROF.ATIENDE_PROF == "3"
	) {
		plantillaToast("15", "15", null, "error", "error");
		setTimeout(() => { datoFinalidad_h03(); }, 500);

	} else {
		$_REG_HC.finalid_hc = data.codigo;
		seleccionarPrograma_h03();
	}
}

function seleccionarPrograma_h03() {
	var edad = $_REG_HC.edad_hc,
		nit = $_USUA_GLOBAL[0].NIT,
		usuario = localStorage["Usuario"],
		sw = 0,
		programa = '';

	if ($_REG_HC.novedad_hc == "7") {

		var cod_esp_pediatr = _consultarEspec_h03('550'),
			cod_esp_otologo = _consultarEspec_h03(['521', '522']),
			cod_esp_oftamol = _consultarEspec_h03(['480', '481', '500']),
			cod_esp_oncolog = _consultarEspec_h03(['490', '491', '492']),
			cod_esp_radiolo = _consultarEspec_h03(['602']);

		// validacion aiepi de 0 a 2 meses
		if ((edad.unid_edad == "D" || (edad.unid_edad == "M" && edad.vlr_edad == "1")) && (_consultarAtiende_h03(['2', '3', '6']) || cod_esp_pediatr)) {
			if ((_consultarUnserv_h03(['08']) && _consultarFinalid_h03(['08'])) || _consultarUnserv_h03(['11', '12', '13', '01'])) {
				programa = 'HC-01';
			} else {
				programa = 'AIEPI002';
			}
			// validacion de 2 Meses a 5 Años
		} else if ((edad.unid_edad == "M" && edad.vlr_edad > 1) || (edad.unid_edad == "A" && edad.vlr_edad < 5 && (_consultarAtiende_h03(['2', '3', '6']) || cod_esp_pediatr))) {
			if ((_consultarUnserv_h03(['08']) && _consultarFinalid_h03(['08'])) || _consultarUnserv_h03(['11', '12', '13']) || (nit == 900005594 && _consultarUnserv_h03(['01']))) {
				programa = 'HC-01';
			} else {
				programa = 'AIEPI001';
			}
			// otorrinolaringologia
		} else if (cod_esp_otologo) {
			programa = 'HC12';
			// oftalmologia y optometria
		} else if (cod_esp_oftamol) {
			programa = 'HC13';
			// oncologia oncooriente
		} else if ((cod_esp_oncolog && nit == 900264583) && (usuario == "GEBC" || usuario == "ADMI")) {
			programa = 'HC9004';
		} else if (nit == 830092718 && cod_esp_radiolo) {
			// historia mamografia
			programa = 'HC14';
		} else if (nit == 900565371) {
			// historia resumida para albergue de sucurame
			programa = 'HC02';
		} else if (_consultarUnserv_h03(['08'])) {
			if (_consultarFinalid_h03(['03', '05', '06', '07', '10'])) {
				//finalidades que tengan formatos o apliquen para algun formato especial pyp
				sw = 1;
			} else {
				programa = 'HC-01';
			}
		} else {
			programa = 'HC-01';
		}
	} else {
		switch ($_REG_HC.esquema_hc) {
			case "AI02": programa = "AIEPI002"; break;
			case "AI01": programa = "AIEPI001"; break;
			case "HC12": programa = "HC12"; break;
			case "HC13": programa = "HC13"; break;
			case "HC14": programa = "HC14"; break;
			case "HC01": programa = "HC-01"; break;
			case "HC02": programa = "HC02"; break;
			case "8001": programa = "HC8001"; break;
			case "8002": programa = "HC-8002"; break;
			case "8031": programa = "HC-8031"; break;
			case "8051": programa = "HC-8051"; break;
			default: programa = 'HC-01';
		}
	}

	if (sw == 1) {
		var array_finalidad = seleccionPyp_h03($_REG_HC.sexo_hc);

		setTimeout(() => {
			mostrar_historiaPYP(array_finalidad);
		}, 350);

	} else {
		_buscar_programa_h03(programa);
	}
}


function mostrar_historiaPYP(array) {
	POPUP({
		array: array,
		titulo: "Selecion historia PyP",
		indices: [{ id: "esquema", label: "descripcion" }],
		callback_f: () => {
			setTimeout(_datoUnidad_h03, 350);
		}
	},
		(data) => {
			_data_hcPYP_h03(data.esquema);
		}
	)
}

function seleccionPyp_h03(sexo) {
	var array_pyp = new Array(),
		finalidad = $_REG_HC.finalid_hc;

	if (sexo == "F") {
		if (_consultarFinalid_h03(["03", "05", "06", "07", "10"])) {
			// se deshabilita opcion, ya no se esta usando
			// {
			// 	esquema: "8001",
			// 	descripcion: "HISTORIA CLINICA DE CITOLOGIA TOMA Y CONTROL"
			// }
			array_pyp.push({
				esquema: "8002",
				descripcion: "HISTORIA CLINICA DE CITOLOGIA BETHESDA       ",
			});
		}
	}

	switch (finalidad) {
		case "03":
			array_pyp.push({
				esquema: "8031",
				descripcion: "HISTORIA CLINICA PLANIFICACION FAMILIAR",
			});
			break;
		case "05":
			array_pyp.push({
				esquema: "8051",
				descripcion: "HISTORIA CLINICA DEL JOVEN",
			});
			break;
		case "06":
		case "07":
		case "10":
			array_pyp.push({
				esquema: "HC01",
				descripcion: "HISTORIA CLINICA NORMAL",
			});
			break;
	}
	return array_pyp;
}

function _data_hcPYP_h03(data) {
	if (!data) {
		setTimeout(_datoUnidad_h03, 500);
	} else {
		switch (data) {
			case "8001": _buscar_programa_h03("HC8001"); break;
			case "8002": _buscar_programa_h03("HC-8002"); break;
			case "8031": _buscar_programa_h03("HC-8031"); break;
			case "8051": _buscar_programa_h03("HC-8051"); break;
			default: _buscar_programa_h03("HC-01"); break;
		}
	}
}

function _buscar_programa_h03(programa) {
	if (programa) {
		switch (programa) {
			case 'HC-01':
			case 'AIEPI001':
			case 'AIEPI002':
			case 'HC-8002':
			case 'HC-8031':
			case 'HC-8051': // ENTRA A ELECTRON
				if (programa == "HC-01") {
					programa = "hc-01-1"
				}

				$("#body_main").load(`../../HICLIN/paginas/${programa}.html`);

				break;
			default:
				var parametros = {
					Id: " 3",
					Descripcion: "Apertura historia clinica",
					Tipo: "RM",
					Params: [{ dll: `HICLIN\\${programa}` }]
				};
				_validarVentanaMain(parametros, () => {
					_regresar_menuhis()
				})
				break;
		}

	} else {
		jAlert({ titulo: "Error ", mensaje: "No existe apertura relacionada: " + programa });
	}
}

function _consultarEspec_h03(data) {
	var retornar = '';
	for (var i in data) {
		$_REG_PROF.TAB_ESPEC.forEach(item => {
			if (data[i] == item.COD) {
				retornar = item.COD;
			}
		});
	}
	return retornar;
}

function _consultarUnserv_h03(data) {
	var retornar = '';

	for (var i in data) {
		if (data[i] == $_REG_HC.serv_hc) {
			retornar = $_REG_HC.serv_hc;
		}
	}
	return retornar;
}

function _consultarAtiende_h03(data) {
	var retornar = '';

	for (var i in data) {
		if (data[i] == $_REG_PROF.ATIENDE_PROF) {
			retornar = $_REG_PROF.ATIENDE_PROF;
		}
	}
	return retornar;
}

function _consultarFinalid_h03(data) {
	var retornar = '';

	for (var i in data) {
		if (data[i] == $_REG_HC.finalid_hc) {
			retornar = $_REG_HC.finalid_hc;
		}
	}
	return retornar;
}
