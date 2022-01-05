// HISTORIAS CLINICAS NOTIFICACIONES A FACTURACION - julio 23/2021 - santiago franco

module.exports = Vue.component("content_con880rv", {
	props: {
		params: {},
	},
	data() {
		return {
			record: {},
			operadores: {},
			mostrarRecor: false,
			mostarVentanaRecord: false,

			mostrarRecorEvio: false,

			// datos_notifi: this.data,

			form: {
				descripOper: '',
				fechaMensaje: '',
				fechaEnvio: '',
				mensaje: '',
				mensajeEnvio: '',
			},

			aplazar: {
				mostrarAplazarRecord: false,

				anoAplazar: '',
				mesAplazar: '',
				diaAplazar: '',
				horaAplazar: '',
				minAplazar: '',

				descripFecha: '',
			},

			responder: {
				mostrarResponder: false,

				descripFechaActual: '',
				descripHoraActual: '',
				mensajeDe: '',
				mensajePara: '',
				mensajeParaDescrip: '',

				anoResponder: '',
				mesResponder: '',
				diaResponder: '',
				descripFecha: '',
				horaResponder: '',
				minResponder: '',

				mensajeResponder: '',
			},

			stylesCON880RV: {
				flexRow: {
					display: "flex",
					alignItems: "center",
					flexWrap: "wrap",
				},
				flexIzq: {
					textAlign: "left",
					paddingLeft: "9px",
				},
			},

			fecha_act: moment().format("YYYYMMDD"),
			hora_act: moment().format("HHmm"),
		};
	},
	watch: {
		  'responder.mensajeResponder': function (val) {
			this.responder.mensajeResponder = val ? val.replaceEsp() : ''
		  },
	},
	created() {
		_compCON880RV = this;
		this.cargarOperadores();
	},
	methods: {
		async llenarDatos() {
			if (this.record.length > 0) {
				this.mostrarRecor = true;
				this.mostarVentanaRecord = true;
				this.form.descripOper = `${this.record[0].oper_orig} : ${this.record[0].nombre_oper}`;
				this.form.fechaMensaje = `${this.record[0].fecha2} ${this.record[0].hora}`;
				this.form.fechaEnvio = `${this.record[0].fecha_ori} ${this.record[0].hora_ori}`;
				this.form.mensaje = this.record[0].mensaje.replace(/(?:\&)/g, "\n");
				this.AceptarRecord();
			} else {
				this.mostrarRecor = false;
				this._terminar();
			}
		},

		AceptarRecord() {
			var temp = this.form.mensaje;
			validarInputs({
				form: '#mensaje',
				orden: '1',
				event_f1: () => {
					setTimeout(() => {
						this._VentanaF1();
					}, 200);
				},
				event_f5: () => {
					this.confirmar_VentanaF5();
				},
			}, () => {
				setTimeout(() => {
					this._VentanaEsc();
				}, 200);
			}, () => {
				if (this.form.mensaje == temp) {
					this.AceptarRecord();
				} else {
					this.form.mensaje = temp;
					this.AceptarRecord();
				}
			})
		},

		_VentanaF1() {
			this.mostarVentanaRecord = false;
			this.responder.mostrarResponder = true;

			var fecha = new Date();
			var diaActual = fecha.getDay();
			var diaString;
			switch (diaActual.toString()) {
				case '0': diaString = 'Domingo'; break;
				case '1': diaString = 'Lunes'; break;
				case '2': diaString = 'Martes'; break;
				case '3': diaString = 'Miercoles'; break;
				case '4': diaString = 'Jueves'; break;
				case '5': diaString = 'Viernes'; break;
				case '6': diaString = 'Sabado'; break;
			}

			var mesActual = fecha.getMonth() + 1;
			var mesString;
			switch (mesActual.toString()) {
				case '1': mesString = 'Ene'; break;
				case '2': mesString = 'Feb'; break;
				case '3': mesString = 'Mar'; break;
				case '4': mesString = 'Abr'; break;
				case '5': mesString = 'May'; break;
				case '6': mesString = 'Jun'; break;
				case '7': mesString = 'Jul'; break;
				case '8': mesString = 'Agt'; break;
				case '9': mesString = 'Sep'; break;
				case '10': mesString = 'Oct'; break;
				case '11': mesString = 'Nov'; break;
				case '12': mesString = 'Dic'; break;
			}

			var dia = moment().format("DD");
			var año = moment().format("YYYY");
			var hora = moment().format("HH:mm");

			this.responder.descripFechaActual = `${diaString} ${dia} ${mesString}/${año}`;
			this.responder.descripHoraActual = hora;

			var operador = localStorage.Usuario;
			postData({ datosh: datosEnvio() + operador + '|' }, get_url("app/CONTAB/CON003.DLL"))
				.then(data => {
					var res = data.split('|');
					nomb = res[0].trim();
					id = res[1];

					this.responder.mensajeDe = `${operador} ${nomb}`;

					this.datoEnvioDestino();

				}).catch(err => {
					this.responder.mensajeDe = '';
				})
		},

		datoEnvioDestino() {
			this.responder.mensajePara.trim() == '' ? this.responder.mensajePara = localStorage.Usuario : false;
			validarInputs({
				form: '#mensajePara'
			}, () => {
				this.mostarVentanaRecord = true;
				this.responder.mostrarResponder = false;
				setTimeout(() => {
					if (this.params.paso == '2') {
						this._escape();
					} else {
						this.AceptarRecord();
					}
				}, 200);
			}, () => {
				this.responder.mensajePara = this.responder.mensajePara.toUpperCase();
				var oper = this.responder.mensajePara
				if (oper == 'GEBC') {
				  this.responder.mensajeParaDescrip = 'PROSOFT';
				  this.dato_anoResponder();
				} else if (oper == '****') {
				  this.responder.mensajeParaDescrip = 'TODOS LOS OPERADORES';
				  this.dato_anoResponder();
				} else {
				  var busqOper = this.operadores.find(e => e.CODIGO == oper);
				  if (busqOper != undefined) {
				    this.responder.mensajeParaDescrip = busqOper.DESCRIPCION;
					this.dato_anoResponder();
				  } else {
				    CON851("01", "01", null, "error", "error");
				    this.datoEnvioDestino();
				  }
				}
			})
		},

		dato_anoResponder() {
			if (this.responder.anoResponder == 0 || this.responder.anoResponder == '') {
				this.responder.anoResponder = this.fecha_act.substring(0, 4);
				this.responder.mesResponder = this.fecha_act.substring(4, 6);
				this.responder.diaResponder = this.fecha_act.substring(6, 8);
	
				this.responder.horaResponder = this.hora_act.substring(0, 2);
				this.responder.minResponder = this.hora_act.substring(2, 4);
				this.responder.minResponder = parseInt(this.responder.minResponder) + 1;

				if (this.responder.minResponder > 59) {
					this.responder.minResponder = 0;
					this.responder.horaResponder = parseInt(this.responder.horaResponder) + 1;
					if (this.responder.horaResponder > 23) {
						this.responder.horaResponder = 0;
						this.responder.diaResponder = parseInt(this.responder.diaResponder) + 1;
					}
				}
			}

			validarInputs({
				form: '#anoResponder'
			}, () => {
				this.datoEnvioDestino();
			}, () => {
				var ano = parseInt(this.responder.anoResponder);

				if (ano < 2007) {
					CON851('03', '03', null, 'error', 'error')
					this.dato_anoResponder();
				} else {
					// continue
					this.dato_mesResponder();
				}
			})
		},

		dato_mesResponder() {
			validarInputs({
				form: '#mesResponder'
			}, () => {
				this.dato_anoResponder();
			}, () => {
				this.responder.mesResponder = cerosIzq(this.responder.mesResponder, 2);
				var mes = this.responder.mesResponder.toString();

				var dia_max;
				switch (mes) {
					case '01':
						dia_max = 31;
						this.dato_diaResponder(dia_max);
						break;
					case '02':
						dia_max = 29;
						this.dato_diaResponder(dia_max);
						break;
					case '03':
						dia_max = 31;
						this.dato_diaResponder(dia_max);
						break;
					case '04':
						dia_max = 30;
						this.dato_diaResponder(dia_max);
						break;
					case '05':
						dia_max = 31;
						this.dato_diaResponder(dia_max);
						break;
					case '06':
						dia_max = 30;
						this.dato_diaResponder(dia_max);
						break;
					case '07':
						dia_max = 31;
						this.dato_diaResponder(dia_max);
						break;
					case '08':
						dia_max = 31;
						this.dato_diaResponder(dia_max);
						break;
					case '09':
						dia_max = 30;
						this.dato_diaResponder(dia_max);
						break;
					case '10':
						dia_max = 31;
						this.dato_diaResponder(dia_max);
						break;
					case '11':
						dia_max = 30;
						this.dato_diaResponder(dia_max);
						break;
					case '12':
						dia_max = 31;
						this.dato_diaResponder(dia_max);
						break;
					default: this.dato_mesResponder(); break;
				}
			})
		},

		dato_diaResponder(dia_max) {
			validarInputs({
				form: '#diaResponder'
			}, () => {
				this.dato_mesResponder();
			}, () => {
				this.responder.diaResponder = cerosIzq(this.responder.diaResponder, 2);
				var dia = parseInt(this.responder.diaResponder);

				var fecha_w = `${this.responder.anoResponder}${this.responder.mesResponder}${this.responder.diaResponder}`;
				fecha_w = parseInt(fecha_w)
				if (dia < 1 || dia > dia_max || fecha_w < this.fecha_act) {
					CON851('37', '37', null, 'error', 'error')
					this.dato_anoResponder();
				} else {
					// continua
					this.dato_descripFechaResponder();
				}
			})
		},

		async dato_descripFechaResponder() {
			var fechaComoCadena = `${this.responder.anoResponder}, ${this.responder.mesResponder}, ${this.responder.diaResponder}`;
			var fecha = new Date(fechaComoCadena);
			var diaActual = fecha.getDay();
			var diaString;
			switch (diaActual.toString()) {
				case '0': diaString = 'Domingo'; break;
				case '1': diaString = 'Lunes'; break;
				case '2': diaString = 'Martes'; break;
				case '3': diaString = 'Miercoles'; break;
				case '4': diaString = 'Jueves'; break;
				case '5': diaString = 'Viernes'; break;
				case '6': diaString = 'Sabado'; break;
			}

			var mes_w = this.responder.mesResponder;
			var mesString;
			switch (mes_w.toString()) {
				case '01': mesString = 'Ene'; break;
				case '02': mesString = 'Feb'; break;
				case '03': mesString = 'Mar'; break;
				case '04': mesString = 'Abr'; break;
				case '05': mesString = 'May'; break;
				case '06': mesString = 'Jun'; break;
				case '07': mesString = 'Jul'; break;
				case '08': mesString = 'Agt'; break;
				case '09': mesString = 'Sep'; break;
				case '10': mesString = 'Oct'; break;
				case '11': mesString = 'Nov'; break;
				case '12': mesString = 'Dic'; break;
			}

			var dia = this.responder.diaResponder;
			var año = this.responder.anoResponder;

			this.responder.descripFecha = `${diaString} ${dia} ${mesString}/${año}`;
			this.dato_horaResponder();
		},

		dato_horaResponder() {
			validarInputs({
				form: '#horaResponder'
			}, () => {
				this.dato_anoResponder();
			}, () => {
				this.responder.horaResponder = cerosIzq(this.responder.horaResponder, 2);
				var hora = parseInt(this.responder.horaResponder);

				if (hora > 23 || hora < 0) {
					this.dato_horaResponder();
				} else {
					this.dato_minResponder();
				}
			})
		},

		dato_minResponder() {
			validarInputs({
				form: '#minResponder'
			}, () => {
				this.dato_horaResponder();
			}, () => {
				this.responder.minResponder = cerosIzq(this.responder.minResponder, 2);
				var minutos = parseInt(this.responder.minResponder);

				if (minutos > 59 || minutos < 0) {
					this.dato_minResponder();
				} else {
					var hora = `${this.responder.horaResponder}${this.responder.minResponder}`;
					hora = parseInt(hora)

					var fecha_w = `${this.responder.anoResponder}${this.responder.mesResponder}${this.responder.diaResponder}`;
					fecha_w = parseInt(fecha_w)

					if (fecha_w == this.fecha_act && hora <= this.hora_act) {
						CON851('37', '37', null, 'error', 'error')
						this.dato_minResponder();
					} else {
						this.dato_mensajeResponder();
					}
				}
			})
		},

		dato_mensajeResponder() {
			validarInputs({
				form: '#mensajeResponder',
			}, () => {
				this.dato_horaResponder();
			}, () => {
				this.responder.mensajeResponder = this.responder.mensajeResponder.toUpperCase();
				// continua
				this.confirmar_grabarMensaje();
			})
		},

		confirmar_grabarMensaje() {
			CON851P(
			  "01",
			  () => {
				this.dato_mensajeResponder();
			  },
			  () => {
				setTimeout(() => {
				  this.grabarMensaje();
				}, 300);
			  }
			);
		  },

		grabarMensaje() {
			loader('show');
			var data = {};
			var hora = `${this.responder.horaResponder}${this.responder.minResponder}`;
			var fecha_w = `${this.responder.anoResponder.substring(2,4)}${this.responder.mesResponder}${this.responder.diaResponder}`;
			var oper_dest = this.responder.mensajePara;
	  
			data['datosh'] = datosEnvio() + '1' + '|' + oper_dest + '|' + fecha_w + '|' + hora + '|';
	  
			data['estado'] = '1';
			data['operador_orig'] = localStorage.Usuario;
			data['fecha_orig'] = moment().format("YYMMDD");
			data['hora_orig'] = moment().format("HHmm");

			data['mensaje'] = this.responder.mensajeResponder.replace(/(\r\n|\n|\r)/gm, "&");
	  
			postData(data, get_url("APP/CONTAB/CON880R.DLL"))
			  .then(data => {
				toastr.success("Recordatorio guardado");
				loader('hide')
				this._terminar();
			  }).catch(err => {
				toastr.error("Error en guardado");
				loader('hide')
				this._escape();
			  })
		},

		confirmar_VentanaF5() {
			CON851P(
			  "OCULTAR MENSAJE",
			  () => {
				this.AceptarRecord();
			  },
			  () => {
				setTimeout(() => {
				  this._VentanaF5();
				}, 300);
			  }
			);
		  },

		_VentanaF5() {
			loader('show');
			var data = {};

			var fecha =  `${this.record[0].fecha.substring(0,2)}${this.record[0].fecha.substring(3,5)}${this.record[0].fecha.substring(6,8)}`;
			var hora = `${this.record[0].hora.substring(0,2)}${this.record[0].hora.substring(3,5)}`;
			var oper_dest = localStorage.Usuario;
	  
			data['datosh'] = datosEnvio() + '3' + '|' + oper_dest + '|' + fecha + '|' + hora + '|';
	  
			data['estado'] = this.record[0].estado;
			data['operador_orig'] = this.record[0].oper_orig;
	  
			postData(data, get_url("APP/CONTAB/CON880R.DLL"))
			  .then(data => {
				toastr.success("Recordatorio ocultado");
				loader('hide')
				this._terminar();
			  }).catch(err => {
				toastr.error("Error en guardado");
				loader('hide')
				this._escape();
			  })
		},

		_VentanaEsc() {
			this.mostarVentanaRecord = false;
			this.aplazar.mostrarAplazarRecord = true;

			this.aplazar.anoAplazar = this.record[0].fecha.substring(0, 2);
			this.aplazar.anoAplazar = 20 + this.aplazar.anoAplazar;

			this.aplazar.mesAplazar = this.record[0].fecha.substring(3, 5);
			this.aplazar.diaAplazar = this.record[0].fecha.substring(6, 8);

			// this.aplazar.horaAplazar = this.record[0].hora.substring(0, 2);

			// this.aplazar.anoAplazar = '21';
			// this.aplazar.anoAplazar = 20 + this.aplazar.anoAplazar;

			// this.aplazar.mesAplazar = '07';
			// this.aplazar.diaAplazar = '31';

			// this.aplazar.horaAplazar = '24';
			this.aplazar.horaAplazar = this.record[0].hora.substring(0, 2);

			var hora = parseInt(this.aplazar.horaAplazar);
			if (hora < 23) {
				hora = hora + 1;
			} else {
				hora = 0;
				this.aplazar.diaAplazar = parseInt(this.aplazar.diaAplazar) + 1;
			}

			this.aplazar.horaAplazar = hora;
			// this.aplazar.minAplazar = '43';
			this.aplazar.minAplazar = this.record[0].hora.substring(3, 5);
			this.dato_anoAplazar();
		},

		dato_anoAplazar() {
			validarInputs({
				form: '#anoAplazar'
			}, () => {
				this.mostarVentanaRecord = true;
				this.aplazar.mostrarAplazarRecord = false;
				setTimeout(() => {
					this.AceptarRecord();
				}, 200);
			}, () => {
				var ano = parseInt(this.aplazar.anoAplazar);

				if (ano < 2007) {
					CON851('03', '03', null, 'error', 'error')
					this.dato_anoAplazar();
				} else {
					// continue
					this.dato_mesAplazar();
				}
			})
		},

		dato_mesAplazar() {
			validarInputs({
				form: '#mesAplazar'
			}, () => {
				this.dato_anoAplazar();
			}, () => {
				this.aplazar.mesAplazar = cerosIzq(this.aplazar.mesAplazar, 2);
				var mes = this.aplazar.mesAplazar.toString();

				var dia_max;
				switch (mes) {
					case '01':
						dia_max = 31;
						this.dato_diaAplazar(dia_max);
						break;
					case '02':
						dia_max = 29;
						this.dato_diaAplazar(dia_max);
						break;
					case '03':
						dia_max = 31;
						this.dato_diaAplazar(dia_max);
						break;
					case '04':
						dia_max = 30;
						this.dato_diaAplazar(dia_max);
						break;
					case '05':
						dia_max = 31;
						this.dato_diaAplazar(dia_max);
						break;
					case '06':
						dia_max = 30;
						this.dato_diaAplazar(dia_max);
						break;
					case '07':
						dia_max = 31;
						this.dato_diaAplazar(dia_max);
						break;
					case '08':
						dia_max = 31;
						this.dato_diaAplazar(dia_max);
						break;
					case '09':
						dia_max = 30;
						this.dato_diaAplazar(dia_max);
						break;
					case '10':
						dia_max = 31;
						this.dato_diaAplazar(dia_max);
						break;
					case '11':
						dia_max = 30;
						this.dato_diaAplazar(dia_max);
						break;
					case '12':
						dia_max = 31;
						this.dato_diaAplazar(dia_max);
						break;
					default: this.dato_mesAplazar(); break;
				}
			})
		},

		dato_diaAplazar(dia_max) {
			validarInputs({
				form: '#diaAplazar'
			}, () => {
				this.dato_mesAplazar();
			}, () => {
				this.aplazar.diaAplazar = cerosIzq(this.aplazar.diaAplazar, 2);
				var dia = parseInt(this.aplazar.diaAplazar);

				var fecha_w = `${this.aplazar.anoAplazar}${this.aplazar.mesAplazar}${this.aplazar.diaAplazar}`;
				fecha_w = parseInt(fecha_w)
				if (dia < 1 || dia > dia_max || fecha_w < this.fecha_act) {
					CON851('37', '37', null, 'error', 'error')
					this.dato_diaAplazar();
				} else {
					this.mostrar_descripFecha();
				}
			})
		},

		async mostrar_descripFecha() {
			var fechaComoCadena = `${this.aplazar.anoAplazar}, ${this.aplazar.mesAplazar}, ${this.aplazar.diaAplazar}`;
			var fecha = new Date(fechaComoCadena);
			var diaActual = fecha.getDay();
			var diaString;
			switch (diaActual.toString()) {
				case '0': diaString = 'Domingo'; break;
				case '1': diaString = 'Lunes'; break;
				case '2': diaString = 'Martes'; break;
				case '3': diaString = 'Miercoles'; break;
				case '4': diaString = 'Jueves'; break;
				case '5': diaString = 'Viernes'; break;
				case '6': diaString = 'Sabado'; break;
			}

			var mes_w = this.aplazar.mesAplazar;
			var mesString;
			switch (mes_w.toString()) {
				case '01': mesString = 'Ene'; break;
				case '02': mesString = 'Feb'; break;
				case '03': mesString = 'Mar'; break;
				case '04': mesString = 'Abr'; break;
				case '05': mesString = 'May'; break;
				case '06': mesString = 'Jun'; break;
				case '07': mesString = 'Jul'; break;
				case '08': mesString = 'Agt'; break;
				case '09': mesString = 'Sep'; break;
				case '10': mesString = 'Oct'; break;
				case '11': mesString = 'Nov'; break;
				case '12': mesString = 'Dic'; break;
			}

			var dia = this.aplazar.diaAplazar;
			var año = this.aplazar.anoAplazar;

			this.aplazar.descripFecha = `${diaString} ${dia} ${mesString}/${año}`;
			this.dato_horaAplazar();
		},

		dato_horaAplazar() {
			validarInputs({
				form: '#horaAplazar'
			}, () => {
				this.dato_diaAplazar();
			}, () => {
				this.aplazar.horaAplazar = cerosIzq(this.aplazar.horaAplazar, 2);
				var hora = parseInt(this.aplazar.horaAplazar);

				if (hora > 23 || hora < 0) {
					this.dato_horaAplazar();
				} else {
					this.dato_minAplazar();
				}
			})
		},

		dato_minAplazar() {
			validarInputs({
				form: '#minAplazar'
			}, () => {
				this.dato_horaAplazar();
			}, () => {
				this.aplazar.minAplazar = cerosIzq(this.aplazar.minAplazar, 2);
				var minutos = parseInt(this.aplazar.minAplazar);

				if (minutos > 59 || minutos < 0) {
					this.dato_minAplazar();
				} else {

					var hora = `${this.aplazar.horaAplazar}${this.aplazar.minAplazar}`;
					hora = parseInt(hora)

					var fecha_w = `${this.aplazar.anoAplazar}${this.aplazar.mesAplazar}${this.aplazar.diaAplazar}`;
					fecha_w = parseInt(fecha_w)

					if (fecha_w == this.fecha_act && hora <= this.hora_act) {
						CON851('37', '37', null, 'error', 'error')
						this.dato_minAplazar();
					} else {
						this.confirmar_grabarAplazar();
					}
				}
			})
		},

		confirmar_grabarAplazar() {
			CON851P(
			  "01",
			  () => {
				this.dato_horaAplazar();
			  },
			  () => {
				setTimeout(() => {
				  this.grabar_aplazar();
				}, 300);
			  }
			);
		  },

		grabar_aplazar() {
			loader('show');
			var data = {};

			var fecha =  `${this.record[0].fecha.substring(0,2)}${this.record[0].fecha.substring(3,5)}${this.record[0].fecha.substring(6,8)}`;
			var hora = `${this.record[0].hora.substring(0,2)}${this.record[0].hora.substring(3,5)}`;
			var oper_dest = localStorage.Usuario;
	  
			data['datosh'] = datosEnvio() + '2' + '|' + oper_dest + '|' + fecha + '|' + hora + '|';
	  
			data['estado'] = this.record[0].estado;
			data['operador_orig'] = this.record[0].oper_orig;
			data['fecha_aplazar'] = `${this.aplazar.anoAplazar.substring(2,4)}${this.aplazar.mesAplazar}${this.aplazar.diaAplazar}`;
			data['hora_aplazar'] = `${this.aplazar.horaAplazar}${this.aplazar.minAplazar}`;
	  
			postData(data, get_url("APP/CONTAB/CON880R.DLL"))
			  .then(data => {
				toastr.success("Recordatorio aplazado");
				loader('hide')
				this._terminar();
			  }).catch(err => {
				toastr.error("Error en guardado");
				loader('hide')
				this._escape();
			  })
		},

		async cargarOperadores() {
			loader('show');
			await postData({datosh: datosEnvio(), }, get_url("APP/CONTAB/CON982.DLL"))
				.then((data) => {
				  data.ARCHREST.pop();
				  this.operadores = data.ARCHREST;
				  this.validarPaso_w();
				})
				.catch((err) => {
				  loader("hide");
				  this._escape();
				});
		},

		validarPaso_w() {
			if (this.params.paso == '2') {
				this.mostrarRecor = true;
				loader('hide')
				this._VentanaF1();
			} else if (this.params.paso == '1') {
				this.cargarRecord();
			} else {
				this._terminar();
			}
		},

		async cargarRecord() {
			var fecha = moment().format("YYMMDD");
			var hora = moment().format("HHmm");
			await postData({
				datosh: datosEnvio() + this.params.admin + '|' + fecha + '|' + hora + '|'
			}, get_url("app/CONTAB/CON880RV.DLL"))
				.then((data) => {
					this.record = data.RECORDATORIOS;
					loader('hide')
					this.llenarDatos();
				})
				.catch((error) => {
					CON851('', 'Error consultando datos', null, 'error', 'error')
					loader('hide')
					this._escape();
				});
		},

		_escape() {
			this.$emit("callback_esc", this.params);
		},
		_terminar() {
			this.$emit("callback" , this.params);
		},

		ventana_operadores() {
			$this = this;
			_ventanaDatos({
				titulo: "VENTANA CONSULTA DE OPERADORES",
				columnas: ["CODIGO", "DESCRIPCION"],
				data: this.operadores,
				callback_esc: function () {
				  document.querySelector(".mensajePara").focus();
				},
				callback: function (data) {
					$this.responder.mensajePara = data["CODIGO"];
					setTimeout(() => { _enterInput('.mensajePara') }, 100)
				},
			  });
		},

	},
	template: /*html*/ `
	<transition name="modal_prosoft" v-if="mostrarRecor">
	  <div class="overlay_prosoft">
		  <div class="modal_prosoft" style="width: 50%;">
			  <div class="container_prosoft">
				  <div class="body_prosoft">
					  <div class="col-md-12 col-sm-12 col-xs-12 no-padding">

					  	<div class="portlet light box-center box-title">
					  		<div class="portlet-title">
								<div class="caption" style="width: 100%">
						  			<span class="caption-subject bold">RECORDATORIOS DEL USUARIO</span>
								</div>
					  		</div>
						</div>

						<div class="col-md-12 col-sm-12 col-xs-12" style="padding-bottom: 10px;padding-left: 0;padding-right: 0;" v-if="mostarVentanaRecord">
                			<div class="form-horizontal">
                  				<div class="col-md-12 col-sm-12 col-xs-12 no-padding">

									<div class="col-md-12 col-sm-12 col-xs-12" :style="stylesCON880RV.flexRow">
        							    <label class="col-md-2 col-sm-2 col-xs-2" :style="stylesCON880RV.flexIzq">De</label>
        							    <div class="input-group col-md-10 col-sm-10 col-xs-10">
        							      <input v-model="form.descripOper" type="text"
        							      class="form-control col-md-12 col-sm-12 col-xs-12 text-left"
        							      data-orden="1" maxlength="30" disabled="disabled">
        							    </div>
        							</div>

									<div class="salto-linea"></div>

									<div class="col-md-6 col-sm-6 col-xs-6" :style="stylesCON880RV.flexRow">
        							    <div class="input-group col-md-12 col-sm-12 col-xs-12">
        							      <input v-model="form.fechaMensaje" type="text"
        							      class="form-control col-md-12 col-sm-12 col-xs-12 text-left"
        							      data-orden="1" maxlength="30" disabled="disabled">
        							    </div>
        							</div>

									<div class="col-md-6 col-sm-6 col-xs-6" :style="stylesCON880RV.flexRow">
        							    <label class="col-md-4 col-sm-4 col-xs-4" :style="stylesCON880RV.flexIzq">Enviado</label>
        							    <div class="input-group col-md-8 col-sm-8 col-xs-8">
        							      <input v-model="form.fechaEnvio" type="text"
        							      class="form-control col-md-12 col-sm-12 col-xs-12 text-left"
        							      data-orden="1" maxlength="1" disabled="disabled">
        							    </div>
        							</div>

									<div class="salto-linea"></div>

									<div class="col-md-12 col-md-12 col-sm-12 col-xs-12" style="display:flex" :style="stylesCON880RV.flexRow">
                                    	<div class="input-group col-md-12 col-md-12 col-sm-12 col-xs-12" id='mensaje'>
                                      		<textarea v-model="form.mensaje" class="form-control mensaje uppercase"
                                      		disabled="disabled" rows="4" style="resize: none; text-align: justify" data-orden="1"
                                      		maxlength="300"></textarea>
                                    	</div>
                                  	</div>

								  </div>
								</div>
							</div>
						</div>
						<div class="col-md-12 col-sm-12 col-xs-12" style="padding-bottom: 10px;padding-left: 0;padding-right: 0;" v-if="aplazar.mostrarAplazarRecord">
                			<div class="form-horizontal">
                  				<div class="col-md-12 col-sm-12 col-xs-12 no-padding">

									<div class="header_prosoft">
                					  <p style="padding: 5px 25px; margin: 0 auto">Aplazar el recordatorio</p>
                					</div>
									
									<div class="salto-linea"></div>

									<div class="col-md-12 col-sm-12 col-xs-12">
									  <div class="col-md-8 col-sm-8 col-xs-8" :style="stylesCON880RV.flexRow">
                    				  	<label class="col-md-5 col-sm-5 col-xs-5" :style="stylesCON880RV.flexIzq">Volver a mostar en</label>
                    				  	<div class="input-group col-md-3 col-sm-3 col-xs-3" id="anoAplazar">
                    				  	  <input v-model="aplazar.anoAplazar" type="number" placeholder="AAAA" disabled="disabled"
                    				  	    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true" data-orden="1" maxlength="4" />
                    				  	</div>
                    				  	<div class="input-group col-md-2 col-sm-2 col-xs-2" id="mesAplazar">
                    				  	  <input v-model="aplazar.mesAplazar" type="number" placeholder="MM" disabled="disabled"
                    				  	    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true" data-orden="1" maxlength="2" />
                    				  	</div>
                    				  	<div class="input-group col-md-2 col-sm-2 col-xs-2" id="diaAplazar">
                    				  	  <input v-model="aplazar.diaAplazar" type="number" placeholder="DD" disabled="disabled"
                    				  	    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true" data-orden="1" maxlength="2" />
                    				  	</div>
									  </div>
									  <div class="col-md-4 col-sm-4 col-xs-4" :style="stylesCON880RV.flexRow">
                    				  	  <label class="col-md-4 col-sm-4 col-xs-4" :style="stylesCON880RV.flexIzq">Hora</label>
									  	  <div class="input-group col-md-4 col-sm-4 col-xs-4" id="horaAplazar">
                    				  	      <input v-model="aplazar.horaAplazar" type="number" placeholder="HH" disabled="disabled"
                    				  	      class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true" data-orden="1" maxlength="2" />
                    				  	  </div>
									  	  <div class="input-group col-md-4 col-sm-4 col-xs-4" id="minAplazar">
                    				  	      <input v-model="aplazar.minAplazar" type="number" placeholder="MM" disabled="disabled"
                    				  	      class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true" data-orden="1" maxlength="2" />
                    				  	  </div>
									  </div>
									</div>

									<div class="salto-linea"></div>

									<div class="col-md-8 col-sm-8 col-xs-8" :style="stylesCON880RV.flexRow">
        							    <div class="input-group col-md-12 col-sm-12 col-xs-12">
        							      <input v-model="aplazar.descripFecha" type="text"
        							      class="form-control col-md-12 col-sm-12 col-xs-12 text-center"
        							      data-orden="1" maxlength="30" disabled="disabled">
        							    </div>
        							</div>
									
								</div>
							</div>
						</div>

						<div class="col-md-12 col-sm-12 col-xs-12" style="padding-bottom: 10px;padding-left: 0;padding-right: 0;" v-if="responder.mostrarResponder">
                			<div class="form-horizontal">
                  				<div class="col-md-12 col-sm-12 col-xs-12 no-padding">

								  <div class="col-md-8 col-sm-8 col-xs-8" :style="stylesCON880RV.flexRow">
								    <label class="col-md-4 col-sm-4 col-xs-4" :style="stylesCON880RV.flexIzq">Fecha actual</label>
								  	<div class="input-group col-md-8 col-sm-8 col-xs-8">
									  <input v-model="responder.descripFechaActual" type="text"
									  class="form-control col-md-12 col-sm-12 col-xs-12 text-center"
									  data-orden="1" maxlength="30" disabled="disabled">
								  	</div>
							  	  </div>

								  <div class="col-md-4 col-sm-4 col-xs-4" :style="stylesCON880RV.flexRow">
								    <label class="col-md-6 col-sm-6 col-xs-6" :style="stylesCON880RV.flexIzq">Hora actual</label>
								  	<div class="input-group col-md-6 col-sm-6 col-xs-6">
									  <input v-model="responder.descripHoraActual" type="text"
									  class="form-control col-md-12 col-sm-12 col-xs-12 text-center"
									  data-orden="1" maxlength="15" disabled="disabled">
								  	</div>
							  	  </div>
									
								  <div class="salto-linea"></div>

								  <div class="col-md-5 col-sm-5 col-xs-5" :style="stylesCON880RV.flexRow">
        							    <label class="col-md-2 col-sm-2 col-xs-2" :style="stylesCON880RV.flexIzq">De</label>
        							    <div class="input-group col-md-10 col-sm-10 col-xs-10">
        							      <input v-model="responder.mensajeDe" type="text"
        							      class="form-control col-md-12 col-sm-12 col-xs-12 text-left"
        							      data-orden="1" maxlength="30" disabled="disabled">
        							    </div>
        						  </div>

								  <div class="col-md-7 col-sm-7 col-xs-7" :style="stylesCON880RV.flexRow">
								  	      <div class="inline-inputs">
									      <label class="col-md-2 col-sm-2 col-xs-2" style="background: 0; text-align: left">Para</label>
										  <div class="input-group col-md-3 col-sm-3 col-xs-3" id="mensajePara">
										      <input @keyup.f8="ventana_operadores" v-model="responder.mensajePara"
										      type="text" disabled="disabled"
										      class="form-control col-md-4 col-sm-4 col-xs-4 uppercase mensajePara"
										      maxlength="4" data-orden="1" style="text-align: center;">
										  </div>
                                          <button @click="ventana_operadores" type="button"
                                              class="btn col-md-1 col-sm-1 col-xs-1 f8-Btn">
                                              <i class="icon-magnifier"></i>
                                          </button>
                                          <div class="input-group col-md-6 col-sm-6 col-xs-6">
                                              <input v-model="responder.mensajeParaDescrip" type="text"
                                                  class="form-control col-md-4 col-sm-12 col-xs-12 uppercase mensajeParaDescrip"
                                                  maxlength="25" data-orden="1" style="text-align: center;" disabled="disabled">
                                          </div>
										  </div>
                                  </div>

								  <div class="salto-linea"></div>

								  <div class="col-md-12 col-sm-12 col-xs-12">
									  <div class="col-md-8 col-sm-8 col-xs-8" :style="stylesCON880RV.flexRow">
                    				  	<label class="col-md-5 col-sm-5 col-xs-5" :style="stylesCON880RV.flexIzq">Fecha de notificación</label>
                    				  	<div class="input-group col-md-3 col-sm-3 col-xs-3" id="anoResponder">
                    				  	  <input v-model="responder.anoResponder" type="number" placeholder="AAAA" disabled="disabled"
                    				  	    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true" data-orden="1" maxlength="4" />
                    				  	</div>
                    				  	<div class="input-group col-md-2 col-sm-2 col-xs-2" id="mesResponder">
                    				  	  <input v-model="responder.mesResponder" type="number" placeholder="MM" disabled="disabled"
                    				  	    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true" data-orden="1" maxlength="2" />
                    				  	</div>
                    				  	<div class="input-group col-md-2 col-sm-2 col-xs-2" id="diaResponder">
                    				  	  <input v-model="responder.diaResponder" type="number" placeholder="DD" disabled="disabled"
                    				  	    class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true" data-orden="1" maxlength="2" />
                    				  	</div>
									  </div>
									  <div class="col-md-4 col-sm-4 col-xs-4" :style="stylesCON880RV.flexRow">
                    				  	  <label class="col-md-4 col-sm-4 col-xs-4" :style="stylesCON880RV.flexIzq">Hora</label>
									  	  <div class="input-group col-md-4 col-sm-4 col-xs-4" id="horaResponder">
                    				  	      <input v-model="responder.horaResponder" type="number" placeholder="HH" disabled="disabled"
                    				  	      class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true" data-orden="1" maxlength="2" />
                    				  	  </div>
									  	  <div class="input-group col-md-4 col-sm-4 col-xs-4" id="minResponder">
                    				  	      <input v-model="responder.minResponder" type="number" placeholder="MM" disabled="disabled"
                    				  	      class="form-control col-md-12 col-sm-12 col-xs-12 text-center" required="true" data-orden="1" maxlength="2" />
                    				  	  </div>
									  </div>
									</div>

									<div class="salto-linea"></div>

									<div class="col-md-12 col-sm-12 col-xs-12">
									  <div class="col-md-8 col-sm-8 col-xs-8" :style="stylesCON880RV.flexRow">
									      <div class="col-md-5 col-sm-5 col-xs-5">
										  </div>
									      <div class="col-md-7 col-sm-7 col-xs-7">
									        <input v-model="responder.descripFecha" type="text"
        							        class="form-control col-md-12 col-sm-12 col-xs-12 text-center"
        							        data-orden="1" maxlength="30" disabled="disabled">
										  </div>
									  </div>
									  <div class="col-md-4 col-sm-4 col-xs-4" :style="stylesCON880RV.flexRow">
									  </div>
									</div>

									<div class="salto-linea"></div>

									<div class="col-md-12 col-sm-12 col-xs-12" :style="stylesCON880RV.flexRow"> 
        							    <label class="col-md-12 col-sm-12 col-xs-12" style="text-align: center">El horario esta en formato 24 horas, 
										donde las 2pm son las 14 horas</label>
        							</div>

									<div class="salto-linea"></div>

									<div class="col-md-12 col-md-12 col-sm-12 col-xs-12" style="display:flex" :style="stylesCON880RV.flexRow">
                                    	<div class="input-group col-md-12 col-md-12 col-sm-12 col-xs-12" id='mensajeResponder'>
                                      		<textarea v-model="responder.mensajeResponder" class="form-control mensajeResponder uppercase"
                                      		disabled="disabled" rows="4" style="resize: none; text-align: justify" data-orden="1"
                                      		maxlength="300"></textarea>
                                    	</div>
                                  	</div>
									
								</div>
							</div>
						</div>
						<div style="clear: both"></div>
					</div>
					<div class="footer_prosoft" v-if="mostarVentanaRecord">
                        <div class="footer_container">
						<button class="btn_acept_prosoft" @click="confirmar_VentanaF5">F5 No mostrar</button>
						<button class="btn_acept_prosoft" @click="_VentanaF1">F1 Responder</button>
						<button class="btn_acept_prosoft" @click="_VentanaEsc">Esc Aplazar</button>
                        </div>
                    </div>
				</div>
			</div>
		</div>
	</transition>
  `,
});