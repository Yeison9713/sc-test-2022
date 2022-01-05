var SER810B = ['FECHA-NOTA', 'OBSERV1-NOTA', 'OBSERV2-NOTA', 'OBSERV3-NOTA', 'OBSERV4-NOTA', 'OBSERV5-NOTA', 'OPER-OBSE-NOTA'];
// *MUESTRA LOS MENSAJES POR PACIENTE.
function get_mensajesPacientes_SER810B() {
	datos_envio = datosEnvio() + localStorage['Usuario'] + "|" + $_REG_PACI[0].COD + "|";
	//LEER NOTAS SOBRE EL PACIENTE
	var URL = get_url("APP/SALUD/SER810B.DLL");
	postData({
			datosh: datos_envio
		}, URL)
		.then((data) => {
			data.NTASPACI[0]['FECHA-NOTA'].trim().length > 0 ?
				_ventanaDatos({
					titulo: `HAY NOTAS DISPONIBLES SOBRE EL PACIENTE:  ${$_REG_PACI[0].DESCRIP}`,
					columnas: [
						"FECHA-NOTA",
						"OPER-OBSE-NOTA",
						"FACT-NOTA"
					],
					data: data['NTASPACI'],
					orden: false,
					callback_esc: function () {
						document.getElementById(campo).focus();
					},
					callback: function (data) {
						let params = {
							titulo: `<h5><strong>NOTAS DISPONIBLES SOBRE EL PACIENTE: ${$_REG_PACI[0].COD} ${$_REG_PACI[0].DESCRIP.trim()}</strong></h5>`,
							datos: data
						}
						ventanaNtasPaciente(params);
					}
				}) : console.log("nota", "No hay notas joven");
			LLAMADO_DLL({
				dato: [SAL97C11.EPSPACIW],
				callback: _mostrarentidad_7C11,
				nombredll: 'SER110C_08',
				carpeta: 'SALUD'
			})
		})
		.catch((error) => {
			console.log(error)
		});
}

function ventanaNtasPaciente(parametros) {
	var ventanaNtas = bootbox.dialog({
			title: parametros.titulo,
			message: '<style type="text/css">' + '.modal-footer {' +
				+'padding: 10px;' +
				'	text-align: right;' +
				'margin-top:38px;' +

				'border-top: 1px solid #e5e5e5;}' +
				'	textarea {' +
				'resize: none;}</style>' +
				'<div class="portlet" > ' +
				'<div class="portlet-body" style="text-align:left">' + `<span>Fecha: ${parametros.datos['FECHA-NOTA']} </span>` +
				'<br>' +
				'<div class="col-md-12">' +
				'<span> Observacion 1 </span>' +
				'<textarea class="form-control col-md-12 col-sm-12 col-xs-12"disabled>' +
				`${parametros.datos['OBSERV1-NOTA']}</textarea>` +
				'</div><br>' +
				'<div class="col-md-12">' +
				'<span> Observacion 2 </span>' +
				'<textarea class="form-control col-md-12 col-sm-12 col-xs-12"disabled>' +
				`${parametros.datos['OBSERV2-NOTA']}</textarea>` +
				'</div><br>' +
				'<div class="col-md-12">' +
				'<span> Observacion 3 </span>' +
				'<textarea class="form-control col-md-12 col-sm-12 col-xs-12"disabled>' +
				`${parametros.datos['OBSERV3-NOTA']}</textarea>` +
				'</div><br>' +
				'<div class="col-md-12">' +
				'<span> Observacion 4 </span>' +
				'<textarea class="form-control col-md-12 col-sm-12 col-xs-12"disabled>' +
				`${parametros.datos['OBSERV4-NOTA']}</textarea>` +
				'</div><br>' +
				'<div class="col-md-12">' +
				'<span> Observacion 5 </span>' +
				'<textarea class="form-control col-md-12 col-sm-12 col-xs-12"disabled>' +
				`${parametros.datos['OBSERV5-NOTA']}</textarea>` +
				'</div><br>' +
				'</div>' + //cierrra portlet body
				'</div>' //cierrra portlety
				,

			buttons: {
				Aceptar: {
					span: 'Aceptar',
					className: 'btn-primary',
					callback: function () {
						ventanaNtas.off('show.bs.modal');
						LLAMADO_DLL({
							dato: [SAL97C11.EPSPACIW],
							callback: _mostrarentidad_7C11,
							nombredll: 'SER110C_08',
							carpeta: 'SALUD'
						})
					}
				}
			}
		}

	);
}