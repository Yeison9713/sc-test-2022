// PO Pablo Olguin Crea,Guarda e Imprime Historias Clínicas de Oncología
if (document.readyState != "loading") iniciar_apertura_h9004();

function iniciar_apertura_h9004() {
	$_REG_HC.sw_embar = '';
	var llave = $_REG_HC.llave_hc,
		oper_hc = localStorage['Usuario'];

	validarMedico_h9004();

	var datos_env = datosEnvio() + llave + "|" + oper_hc + "|"

	// let URL = get_url("APP/" + "HICLIN/HC9004" + ".DLL");
	// postData({
	// 		datosh: datos_env
	// 	}, URL)
	// 	.then((data) => {
	// 		console.log(data.MENSAJE)
	// 		// validar_historia_h9004
	// 	})
	// 	.catch((error) => {
	// 		console.log(error)
	// 	});
}

function validarMedico_h9004() {
	var atiende_prof = $_REG_PROF[0].atiende_prof,
		esp_prof = $_REG_PROF.tabla_especialidad;
	if ((atiende_prof == 'A') && ["250", "140", "460", "461", "464", "462"].find(arr => arr == esp_prof[0] ? true : false)) {
		atiende_prof = "1";
		$_REG_HC.oper_elab_hc = atiende_prof;
	}
}

function _llenarDatosPag1() {
	_formHidden('1');
	$('#proced_hc_01').val($DATOS_HC_TMP.proceden_hc);
	$('#motiv_hc_01').val($DATOS_HC_TMP.motiv_hc);
	var enferm_act = consultarHcDetalle($id_paciente, '1001');
	$('#enfer_act_hc_01').html(enferm_act.detalle.trim());
	validarProcedencia();
}

function validarPagUno() {
	validarInputs({
			form: "#fase_procedencia_hc_01",
			orden: "1"
		},
		function () {
			console.debug('debe salir');
		},
		on_validarProcedencia
	);
}

function validar_historia_h9004(data) {
	console.log(data)
	var admin = localStorage['Usuario'],
		nit = $_USUA_GLOBAL[0].NIT,
		res = data.split("|"),
		temporal = $_REG_HC.temporal_hc,
		estado = $_REG_HC.estado_hc,
		oper = $_REG_HC.oper_elab_hc;
	$_REG_HC["fecha"] = res[3].substring(0, 4) + "/" + res[3].substring(4, 6) + "/" + res[3].substring(6, 8);
	$_REG_HC["procedencia"] = res[4];
	$_REG_HC["sesion"] = res[5].trim();
	if ($_REG_PACI[0].sexo_paci == "F") {
		if (res[1] == "S") {
			if (
				(admin = "GEBC" || temporal == "1") ||
				(estado == "1" && oper == admin) ||
				(nit == "800037021" && admin == "ADMI") ||
				(nit == "892000401" && admin == "ADMI")
			) {
				if (res[2] > 0 && res[2] <= 3) {
					$_REG_HC.sw_embar = "S";
				}
			} else {
				let msj = "No fue totalmente diligenciada"
				jAlert({
					titulo: "ATENCION! ",
					mensaje: "El paciente ya tiene historia clinica" + "<br>" +
						"abierta, con fecha " + $_REG_HC9004.fecha + "<br>" + msj
				}, _salir_h9004)

			}
		} else {
			if (estado == 2) {
				CON851("70", "70", null, "error", "error");
				if (
					(admin !== "GEBC") ||
					(nit !== "800037021" && admin !== "ADMI") ||
					(nit !== "892000401" && admin !== "ADMI")
				) {
					_salir_h9004();
				}
			} else if (
				(admin !== "GEBC") ||
				(nit !== "800037021" && admin !== "ADMI") ||
				(nit !== "892000401" && admin !== "ADMI")
			) {
				CON851("81", "81", null, "error", "error");
				_salir_h9004();
			} else $_REG_HC.novedad_hc = 8;
		}
	} else {
		$_REG_HC.sw_embar = 0;
	}

	buscar_comprobante_historia_h9004();

}

function buscar_comprobante_historia_h9004() {

	if ($_REG_HC.serv_hc == "02" || $_REG_HC.serv_hc == "08") {

		buscar_consulta_externa();
	}
	switch ($_REG_HC.primera_hc) {
		case 1:
			_on_formulario_h9004(false);
			break;
		case 2:
			// Antecedentes HC
			/*
			1001--Enfermedad actual,
			2002--Antec.familiares,
			2010--Antec.medicos,
			2020--Antec.quirurgicos,
			2035--Antec.toxico-alergicos,
			2040--Antec.traumaticos,
			4040--Antec.ginecoobstetricos,
			4005--Examen general,
			7501--Analisis-hc
			*/
			// consultar_detalles_historia('**', ['9009','9004'], $_REG_HC.llave_hc, callback);
			let folio = $_REG_HC.suc_folio_hc + cerosIzq((parseInt($_REG_HC.nro_folio_hc) - 1), 6)
			let detalles_hc = ["9004", "1001", "2002", "2010", "2020", "2035", "2040", "4040", "4005", "7501"];
			consultar_detalles_historia(folio, detalles_hc, $_REG_HC.llave_hc, _get_detalles_h9004);
			break;

		default:
			break;
	}
}


function _get_detalles_h9004(data) {
	if (data == "99") {
		_on_formulario_h9004(false);
	} else {
		$_REG_HC.detalles_hc = data['DETHC'];
		_on_formulario_h9004(true);
	}

}

function _on_formulario_h9004(sw) {
	var datos_envio =
		datosEnvio() +
		$_REG_HC.llave_hc + '|' +
		localStorage['Usuario'] + '|'
	var datos_farmacos = [];

	SolicitarDll({
			datosh: datos_envio

		},
		function (data) {
			var res = data.split('|')

			if (res[0] == '00') {
				SolicitarDatos({}, function (datos_farma) {
					datos_farmacos = datos_farma;
				}, get_url("TEMP/" + res[3]))
			} else {
				plantillaError(res[0], res[1], res[2]);
			}
		}, get_url("APP/SALUD/SER809.DLL"));

	var f = new Date();
	//Precarga campos formulario
	document.getElementById("ano_hc_9004").value = $_REG_HC.fecha_hc.substring(0, 4);
	document.getElementById("mes_hc_9004").value = $_REG_HC.fecha_hc.substring(4, 6);
	document.getElementById("dia_hc_9004").value = $_REG_HC.fecha_hc.substring(6, 8);
	document.getElementById("hora_hc_9004").value = f.getHours();
	document.getElementById("min_hc_9004").value = f.getMinutes();
	document.getElementById("med_hc_9004").value = $_REG_PROF[0].descrip_prof + ' reg.' + $_REG_PROF[0].reg_med_prof;
	document.getElementById("act_hc_9004").value = $_REG_HC.novedad_hc;
	document.getElementById("unser_hc_9004").value = $_REG_HC.serv_hc;
	document.getElementById("proced_hc_9004").value = $_REG_HC.procedencia;
	document.getElementById("llave_hc_9004").value = $_REG_HC.llave_hc;
	document.getElementById("sucursal_hc_9004").value = $_REG_HC.suc_folio_hc;
	document.getElementById("folio_hc_9004").value = $_REG_HC.nro_folio_hc;

	//sw==true hay historias anteriores sino es la primera historia
	if (sw) {

		let cod_dethc = '',
			detalles = $_REG_HC.detalles_hc;

		console.log(detalles)
		//Cargar antecedentes historia
		for (var detalle in detalles) {
			cod_dethc = detalles[detalle]['COD-DETHC']
			switch (cod_dethc) {
				case "1001":
					document.querySelector('#enfer_act_hc_9004').value = detalles[detalle]['DETALLE'].trim()
					break;
				case "2002":
					document.querySelector('#ant_famil_hc_9004').value = detalles[detalle]['DETALLE'].trim()
					break;
				case "2010":
					document.querySelector('#ant_medi_hc_9004').value = detalles[detalle]['DETALLE'].trim()
					break;
				case "2020":
					document.querySelector('#ant_quiru_hc_9004').value = detalles[detalle]['DETALLE'].trim()
					break;
				case "2035":
					document.querySelector('#ant_toxi_hc_9004').value = detalles[detalle]['DETALLE'].trim()
					break;
				case "2040":
					document.querySelector('#ant_traum_hc_9004').value = detalles[detalle]['DETALLE'].trim()
					break;
				case "4040":
					document.querySelector('#ant_ginec_hc_9004').value = detalles[detalle]['DETALLE'].trim()
					break;
				case "4005":
					document.querySelector('#exagen_hc_9004').value = detalles[detalle]['DETALLE'].trim()
					break;
				case "7501":
					document.querySelector('#analisis_hc_9004').value = detalles[detalle]['DETALLE'].trim()
					break;
				default:
					break;
			}
		}
		//Medidas antropometricas
		document.querySelector('#peso_hc_9004').value = $_REG_HC['peso'].length > 0 ? $_REG_HC['peso'] : '';
		document.querySelector('#talla_hc_9004').value = $_REG_HC['talla'].length > 0 ? $_REG_HC['talla'] : '';
		document.querySelector('#per_cef_hc_9004').value = $_REG_HC['per_cef'].length > 0 ? $_REG_HC['per_cef'] : '';
		document.querySelector('#per_tora_hc_9004').value = $_REG_HC['per_tora'].length > 0 ? $_REG_HC['per_tora'] : '';
		document.querySelector('#per_abdo_hc_9004').value = $_REG_HC['per_abdo'].length > 0 ? $_REG_HC['per_abdo'] : '';
	}

}
document.getElementById('btn_grabar_9004').addEventListener('click', grabar_historia_9004);

function grabar_historia_9004() {
	var llave = $_REG_HC.llave_hc,
		serv_hc = $_REG_HC.serv_hc,
		novedad_hc = $_REG_HC.novedad_hc,
		finalid_hc = $_REG_HC.finalid_hc,
		ciuda_paci = $_REG_PACI[0].ciudad_paci,
		edad_paci = $_REG_HC.edad_hc.vlr_edad + $_REG_HC.edad_hc.unid_edad,
		oper_hc = localStorage['Usuario'],
		motiv_hc = document.querySelector("#motiv_hc_9004").value,
		peso_hc = document.querySelector("#peso_hc_9004").value,
		talla_hc = document.querySelector("#talla_hc_9004").value,
		imc_corp_hc = document.querySelector("#imc_corp_hc_9004").value,
		per_cef_hc = document.querySelector("#per_cef_hc_9004").value,
		per_abdo_hc = document.querySelector("#per_abdo_hc_9004").value,
		per_tora_hc = document.querySelector("#per_tora_hc_9004").value,
		sup_corp_hc = document.querySelector("#sup_corp_hc_9004").value,
		sw_embar = $_REG_HC.sw_embar,
		med_hc = $_REG_PROF[0].cod_prof,
		datos_9004 = "";

	var arr_9004 = document.querySelectorAll(".onco");
	var aux = '',
		datos_9004r = [];
	for (let dato of arr_9004) {
		// console.log(dato);
		datos_9004 += dato.value + "|";
		aux = dato.id
		datos_9004r[aux] = dato.value
	}
	// datos_9004=""
	console.log(datos_9004r)
	var data_env = datosEnvio() + llave +
		"|" + 2 +
		"|" + oper_hc +
		"|" + serv_hc +
		"|" + novedad_hc +
		"|" + finalid_hc +
		"|" + ciuda_paci +
		"|" + edad_paci +
		"|" + motiv_hc +
		"|" + peso_hc +
		"|" + talla_hc +
		"|" + imc_corp_hc +
		"|" + per_cef_hc +
		"|" + per_tora_hc +
		"|" + per_abdo_hc +
		"|" + sup_corp_hc +
		"|" + sw_embar +
		"|" + med_hc +
		"|" + datos_9004 + "|";

	console.log(data_env)
	var datosphp = {
		llave: $_REG_HC.sesion,
		enfer_act_hc: document.querySelector("#enfer_act_hc_9004").value,
		exagen_hc: document.querySelector("#exagen_hc_9004").value,
		ant_famil_hc: document.querySelector("#ant_famil_hc_9004").value,
		ant_medi_hc: document.querySelector("#ant_medi_hc_9004").value,
		ant_hemor_hc: document.querySelector("#ant_hemor_hc_9004").value,
		ant_quiru_hc: document.querySelector("#ant_quiru_hc_9004").value,
		ant_toxi_hc: document.querySelector("#ant_toxi_hc_9004").value,
		ant_traum_hc: document.querySelector("#ant_traum_hc_9004").value,
		ant_ginec_hc: document.querySelector("#ant_ginec_hc_9004").value,
		analisis_hc: document.querySelector("#analisis_hc_9004").value,
		observaciones_hc: document.querySelector("#observaciones_hc_9004").value
	}

	const data = new FormData();

	for (var [key, value] of Object.entries(datosphp)) data.append(key, value);

	fetch(get_url('HICLIN/paginas/_datos_9004.php'), {
			method: 'POST',
			body: data
		})
		.then(function (response) {
			if (response.ok) {
				let URL = get_url("APP/" + "HICLIN/HC9004" + ".DLL");

				postData({
						datosh: data_env
					}, URL)
					.then((data) => {
						console.log(data)
					})
					.catch(error => {
						console.error(error)
					});

				return response.text()
			} else {
				throw "Error en la llamada PHP";
			}
		})
}


function _salir_h9004() {
	_cargarEventos("on");
	_toggleNav();
}