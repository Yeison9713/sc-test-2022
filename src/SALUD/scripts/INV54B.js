//DETALLADO X OPERADOR  - CARLOS R. - 22-11-2021

new Vue({
	el: '#INV54B',
	components: {
		loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
	},
	data: {
		form: {
			fechaInicial: '',
			fechaFinal: '',
			ano_ini: '',
			mes_ini: '',
			dia_ini: '',
			ano_fin: '',
			mes_fin: '',
			dia_fin: '',
			dato_tipo_archivo:'',
			dato_tipo_operador:'',
			dato_tipo_factura:'',
			dato_tipo_pago:'',
			prefijo: '',
			numero:'',
			descrip_numero:'',   
			factura:'',
			cod_operador:'',
			descrip_cod_operador:'',
			entidad:'',
			descrip_entidad :'',
			unidad:'',
			descrip_unidad:'',
		},


		arr_tipo_archivo:[
			{ COD: '1', DESCRIP: 'Segun facturacion'},
			{ COD: '2', DESCRIP: 'Segun solicitud servicios'}
		],

		arr_tipo_operador:[
			{ COD: '1', DESCRIP: 'Operador elabora'},
			{ COD: '2', DESCRIP: 'Operador corrige'}
		],

		arr_tipo_fact: [
			{ COD: '*', DESCRIP: 'TODOS LOS SERVICIOS' },
			{ COD: '0', DESCRIP: 'DROGUERIA' },
			{ COD: '1', DESCRIP: 'CIRUGIAS' },
			{ COD: '2', DESCRIP: 'LAB. Y OTROS DIAG ' },
			{ COD: '3', DESCRIP: 'RX- IMAGENOLOGIA' },
			{ COD: '4', DESCRIP: 'OTROS SERVICIOS' },
			{ COD: '5', DESCRIP: 'CONSULTAS Y TERAPIAS' },
			{ COD: '6', DESCRIP: 'PATOLOGIAS-CITOLOGIAS' },
			{ COD: '7', DESCRIP: 'PROMOCION Y PREVENCION' }
		],

		arr_tipo_pago: [
			{ COD: '*', DESCRIP: 'TODAS LAS FORMAS DE PAGO' },
			{ COD: 'E', DESCRIP: 'CONTADO-EFECTIVO' },
			{ COD: 'C', DESCRIP: 'CONTADO-CREDITO' },
			{ COD: 'A', DESCRIP: 'AMBULATORIO' },
			{ COD: 'P', DESCRIP: 'PENSIONADO' },
			{ COD: 'T', DESCRIP: 'ACC. DE TRANSITO' }
		],


		_operadores:[],
		_terceros: [],
		_entidades: [],
		_unidades: [],


		estado_loader: false,
		progreso: {},
		label_loader: null,
		loader: 1,

		fecha_act: moment().format('YYYYMMDD')
	},
	async created() {
		//  _vm = this;
		_inputControl('disabled');
		_inputControl('reset');
		nombreOpcion('9-5-4-1-3-B - Inforeme de productividad x operador');
		loader('show');
		this.cargarOperadores();
	},

	computed: {
		descrip_swarch() {
			let tipo = this.arr_tipo_archivo.find((el) => el.COD == this.form.dato_tipo_archivo);
			return tipo ? tipo.DESCRIP : '';
		},

		descrip_tipo_operador() {
      let tipo = this.arr_tipo_operador.find((el) => el.COD == this.form.dato_tipo_operador);
      return tipo ? tipo.DESCRIP : '';
    },

		descrip_tipo_fact() {
			let tipo = this.arr_tipo_fact.find((el) => el.COD == this.form.dato_tipo_factura);
			return tipo ? tipo.DESCRIP : '';
		},

		descrip_pago() {
      let tipo = this.arr_tipo_pago.find((el) => el.COD == this.form.dato_tipo_pago);
      return tipo ? tipo.DESCRIP : '';
    },
	},
	

	methods: {
		llenarDatosFecha() {
      this.form.ano_ini = `20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)}`;
      this.form.mes_ini = `${$_USUA_GLOBAL[0].FECHALNK.substring(2, 4)}`
      this.form.dia_ini = `${$_USUA_GLOBAL[0].FECHALNK.substring(4, 6)}`;

      this.form.ano_fin = `20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)}`;
      this.form.mes_fin = `${$_USUA_GLOBAL[0].FECHALNK.substring(2, 4)}`
      this.form.dia_fin = `${$_USUA_GLOBAL[0].FECHALNK.substring(4, 6)}`;

      this.validarAnoIni();
    },

		validarAnoIni() {
			validarInputs(
				{
					form: '#ano_inicial',
					orden: '1'
				},
				() => {
					_toggleNav();
				},
				() => {
					let año = parseFloat(this.form.ano_ini) || 0;
					if (año < 1990) {
						CON851('03', '03', null, 'error', 'error');
						this.validarAnoIni();
					} else {
						this.validarMesIni();
					}
				}
			);
		},

		validarMesIni() {
			validarInputs(
				{
					form: '#mes_inicial',
					orden: '1'
				},
				() => {
					this.validarAnoIni();
				},
				() => {
					this.form.mes_ini = cerosIzq(this.form.mes_ini, 2);
					let mes = parseInt(this.form.mes_ini);
					if (mes < 1 || mes > 12) {
						this.validarMesIni();
					} else {
						this.validarDiaIni();
					}
				}
			);
		},

		validarDiaIni() {
			validarInputs(
				{
					form: '#dia_inicial',
					orden: '1'
				},
				() => {
					this.validarAnoIni();
				},
				() => {
					this.form.dia_ini = cerosIzq(this.form.dia_ini, 2);
					let dia = parseInt(this.form.dia_ini);
					if (dia < 1 || dia > 31) {
						this.validarDiaIni();
					} else {
						// continue
						this.validarAnoFin();
					}
				}
			);
		},

		validarAnoFin() {
			validarInputs(
				{
					form: '#ano_final',
					orden: '1'
				},
				() => {
					this.validarAnoIni();
				},
				() => {
					let año = parseInt(this.form.ano_fin);
					if (año < 1990) {
						CON851('03', '03', null, 'error', 'error');
						this.validarAnoFin();
					} else {
						this.validarMesFin();
					}
				}
			);
		},

		validarMesFin() {
			validarInputs(
				{
					form: '#mes_final',
					orden: '1'
				}, 	() => {
					this.validarAnoFin();
				}, 	() => {
					this.form.mes_fin = cerosIzq(this.form.mes_fin, 2);
					let mes = parseInt(this.form.mes_fin);
					if (mes < 1 || mes > 12) {
						this.validarMesFin();
					} else {
						this.validarDiaFin();
					}
				}
			);
		},

		validarDiaFin() {
			validarInputs(
				{
					form: '#dia_final',
				}, () => {
					this.validarAnoFin();
				}, () => {
					this.form.dia_fin = cerosIzq(this.form.dia_fin, 2);
					let dia = parseInt(this.form.dia_fin);
					this.form.fechaInicial = parseInt(`${this.form.ano_ini}${this.form.mes_ini}${this.form.dia_ini}`);
					this.form.fechaFinal = parseInt(`${this.form.ano_fin}${this.form.mes_fin}${this.form.dia_fin}`);
					if (dia < 1 || dia > 31) {
						this.validarDiaFin();
					} else if (this.form.fechaFinal < this.form.fechaInicial) {
						CON851('37', '37', null, 'error', 'error');
						this.validarAnoFin();
					} else {
						this.validar_tipo_archivo();
					}
				}
			);
		},

		validar_tipo_archivo() {
			POPUP(
				{
					array: this.arr_tipo_archivo,
					titulo: 'Tipo de archivo',
					indices: [{ id: 'COD', label: 'DESCRIP'}],
					seleccion: '1',
					teclaAlterna: true,
					id_input: '#dato_swarch',
					callback_f: () => {
						this.validarAnoFin();
					}
				},
				(data) => {
					this.form.dato_tipo_archivo = data.COD;
					setTimeout(() => {
						this.validar_tipo_operador();
					}, 100);
				}
			);
		},

		validar_tipo_operador() {
			POPUP(
				{
					array: this.arr_tipo_operador,
					titulo: 'Tipo de archivo',
					indices: [{ id: 'COD', label: 'DESCRIP'}],
					seleccion: '1',
					teclaAlterna: true,
					id_input: '#dato_tipo_operador',
					callback_f: () => {
						this.validar_tipo_archivo();
					}
				},
				(data) => {
					this.form.dato_tipo_operador = data.COD;
					setTimeout(() => {
						this.validar_tipo_factura();
					}, 100);
				}
			);
		},

		validar_tipo_factura() {
			POPUP(
				{
					array: this.arr_tipo_fact,
					titulo: 'Tipo de factura',
					indices: [{ id: 'COD', label: 'DESCRIP'}],
					seleccion: '*',
					teclaAlterna: true,
					id_input: '#dato_fact',
					callback_f: () => {
						this.validar_tipo_operador();
					}
				},
				(data) => {
					this.form.dato_tipo_factura = data.COD;
					setTimeout(() => {
						this.validar_tipo_pago();
					}, 100);
				}
			);
		},

		validar_tipo_pago() {
			POPUP(
				{
					array: this.arr_tipo_pago,
					titulo: 'Forma de pago',
					indices: [{ id: 'COD', label: 'DESCRIP'}],
					seleccion: '*',
					teclaAlterna: true,
					id_input: '#dato_pago',
					callback_f: () => {
						this.validar_tipo_factura();
					}
				},
				(data) => {
					this.form.dato_tipo_pago = data.COD;
					setTimeout(() => {
						this.validar_prefijo();
					}, 100);
				}
			);
		},

		validar_prefijo() {
			validarInputs(
				{
					form: '#prefijo'
				},
				() => {
					this.validar_tipo_pago();
				},
				() => {
					this.form.prefijo = this.form.prefijo.toUpperCase() || '*';
					let prefijo = this.form.prefijo;

					if (prefijo == '*') {
						this.form.numero = '000000';
						this.$refs.descrip_numero.value = 'Todas las facturas';
						this.validar_discrim_fact();
					} else if (
						[
							'A',
							'P',
							'T',
							'B',
							'D',
							'F',
							'G',
							'H',
							'I',
							'J',
							'K',
							'L',
							'M',
							'N',
							'O',
							'Q',
							'R',
							'S',
							'V',
							'W',
							'X',
							'Y',
							'Z'
						].includes(prefijo)
					) {
						this.aceptar_nro_factura();
					} else {
						this.validar_prefijo();
					}
				}
			);
		},

		aceptar_nro_factura() {
			validarInputs(
				{ form: '#dato_numero' },
				() => {
					this.validar_prefijo();
				},
				() => {
					this.form.numero = this.form.numero.trim();
					if (this.form.numero) {
						this.form.numero = this.form.numero.padStart(6, '0');

						postData({ datosh: datosEnvio() + `${this.form.prefijo}${this.form.numero}` }, get_url('APP/SALUD/SER808-01.DLL'))
							.then((data) => {
								this._numeracion = data.NUMER19[0]
								this.$refs.descrip_numero.value = this._numeracion.DESCRIP_NUM;
								this.validar_discrim_fact();
							})
							.catch((err) => {
								console.error('Error consultando factura: ', err);
								CON851('', 'Error consultando factura', null, 'error');
								this.aceptar_nro_factura();
							});

					} else {
						CON851('03', '03', null, 'warning', '');
						this.aceptar_nro_factura();
					}
				}
			);
		},

		validar_discrim_fact() {
      validarInputs(
        {
          form: "#dato_factura",
          orden: '1'
        },
        () => {
          this.aceptar_nro_factura();
        },
        () => {
          let factura = this.form.factura.toUpperCase() || 'N'
          this.form.factura = factura
          
          if (factura == 'S' || factura == 'N') {
            this.validar_Operador()
          } else {
            CON851('03', '03', null, 'error', 'error');
            this.validar_discrim_fact()
          }
        }
      )
    },

		validar_Operador() {
			validarInputs(
				{
					form: '#dato_cod_operador',
					orden: '1'
				},
				() => {
					this.validar_discrim_fact();
				},
				() => {
					this.form.cod_operador = this.form.cod_operador || '****';
					let cod_operador = this.form.cod_operador;
					if (cod_operador == '****') {
						this.$refs.descrip_cod_operador.value = 'Todos los operadores';
						this.validar_Entidad();
					} else {
						let busq = this._operadores.find((a) => a.CODIGO == cod_operador);
						if (busq != undefined) {
							this.$refs.descrip_cod_operador.value = busq.DESCRIPCION;
							this.validar_Entidad();
						} else {
							CON851('01', '01', null, 'error', 'error');
							this.validar_Operador();
						}
					}
				}
			);
		},

		validar_Entidad() {
      validarInputs({
        form: '#dato_entidad',
        orden: "1",
      }, () => {
        this.validar_Operador();
      }, () => {
        this.form.entidad = this.form.entidad || "99";    
        let entidad = this.form.entidad;

        if (entidad == '99') {
          this.$refs.descrip_entidad.value = 'Todas las entidades';
          this.validar_Unidad();
        } else {
					let busq = this._entidades.find(a => a.COD == entidad);
					if (busq != undefined) {
						this.$refs.descrip_entidad.value = busq.NOMBRE;
						this.validar_Unidad();
					} else {
						CON851('01', '01', null, 'error', 'error');
						this.validar_Entidad();
					}
        }
      })
    },

		validar_Unidad() {
      validarInputs({
        form: '#dato_unidad',
        orden: "1",
      }, () => {
        this.validar_Entidad();
      }, () => {
        this.form.unidad = this.form.unidad || "**";    
        let unidad = this.form.unidad;

        if (unidad == '**') {
          this.$refs.descrip_unidad.value = 'Todas las unidades';
          this._envioImpresion();
        } else {
					let busq = this._unidades.find(a => a.COD == unidad);
					if (busq != undefined) {
						this.$refs.descrip_unidad.value = busq.DESCRIP;
						this._envioImpresion();
					} else {
						CON851('01', '01', null, 'error', 'error');
						this.validar_Unidad();
					}
        }
      })
    },

		_envioImpresion() {
      CON851P(
        "00",
        () => {
          this.validar_Unidad();
        },
        () => {
          this.estado_loader = true;
          this.label_loader = `Procesando: ${moment(this.form.fechaInicial.toString()).format("YYYY/MM/DD")} - ${moment(this.form.fechaFinal.toString()).format(
            "YYYY/MM/DD"
          )}`;
          this.progreso = { transferred: 0, speed: 0 };

          let data = {};
          
          data["datosh"] = datosEnvio();
          data["admin_w"] = localStorage.Usuario;
          data["fecha_inicial"] = this.form.fechaInicial.toString();
          data["fecha_final"] = this.form.fechaFinal.toString();
          // data["tipo_archivo_w"] = this.form.dato_tipo_archivo;
          data["tipo_operador_w"] = this.form.dato_tipo_operador;
          data["tipo_fact_w"] = this.form.dato_tipo_factura;
          data["pago_w"] = this.form.dato_tipo_pago;
          data["prefijo_w"] = this.form.prefijo;
          data["numero_w"] = this.form.numero;
          data["fact_w"] = this.form.factura;
          data["operador_w"] = this.form.cod_operador;
          data["nit_w"] = this.form.entidad;
          data["unidad_w"] = this.form.unidad;


          postData(data, get_url("app/SALUD/INV54B.DLL"), {
            onProgress: (progress) => {
              this.progreso = progress;
            },
          })
            .then((data) => {
              this.loader = false;
              this.label_loader = `GENERANDO IMPRESIÓN...`;
              this.progreso.completado = true;
              this._montarImpresion_INV54B(data);
            })
            .catch((err) => {
              console.error(err);
              CON851("", "Error consultando datos", null, "error", "Error");
              this.loader = false;
              this.estado_loader = false;
              this.validar_Unidad();
            });
        }
      );
    },

		_montarImpresion_INV54B(data) {
      data.ENCABEZADO = [];

      let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
      let nit = $_USUA_GLOBAL[0].NIT.toString();
      let fecha = moment().format('MMM DD/YY');

      for (i in data.LISTADO) {
        // data.LISTADO[i]['DESCRIPCION'] = data.LISTADO[i]['DESCRIPCION'].replace(/\�/g, "Ñ")
        // data.LISTADO[i]['CODIGO_J'] = data.LISTADO[i][`LOTE_J`] + data.LISTADO[i][`COMPROB_J`]
      }

      if (data.LISTADO.length < 1) {
        CON851('08', '08', null, 'error', 'error');
        this.estado_loader = false;
        this.validar_Unidad();
      } else {
        var columnas = [
          {
            title: "OPERADOR",
            value: "OPERADOR",
          },
          {
            title: "NR_COMPROBANTE",
            value: "NR_COMPROBANTE",
          },
					{
            title: "NR_URGEN",
            value: "NR_URGEN",
          },
          {
            title: "NR_EXTER",
            value: "NR_EXTER",
          },
					{
            title: "NR_HOSPIT",
            value: "NR_HOSPIT",
          },
          {
            title: "NR_PYP",
            value: "NR_PYP",
          },
					{
            title: "VLR_FACT",
            value: "VLR_FACT",
          },
          {
            title: "NR_CORREC",
            value: "NR_CORREC",
          },
					{
            title: "FACTURA",
            value: "FACTURA",
          },
          {
            title: "PACIENTE",
            value: "PACIENTE",
          },
				
        ]

        var header_format = [
          { text: `${nombreEmpresa}`, bold: true, size: 16 },
          `RESUMEN DE FACTURACION   NIT: ${nit}`,
          `PERIODO DESDE: ${this.form.ano_ini}/${this.form.mes_ini}/${this.form.dia_ini} 
          HASTA: ${this.form.ano_fin}/${this.form.mes_fin}/${this.form.dia_fin}`,
        ]
           
        _impresion2({
          tipo: 'excel',
          header: header_format,
          logo: `${nit}.png`,
          tabla: {
            columnas,
            data: data.LISTADO,
          },
          archivo: `${localStorage.Usuario + moment().format(`YYMMDD-HHmmss`)}`
        })
          .then(() => {
            console.log('Proceso terminado')
            this.estado_loader = false;
            _toggleNav();
          })
          .catch(() => {
            this.estado_loader = false;
            console.log('Proceso error')
            _toggleNav();
          })
      }
    },


	//  VENTANAS F8


		_ventanaOperador() {
			_ventanaDatos({
				titulo: 'VENTANA DE OPERADORES',
				columnas: ['CODIGO', 'DESCRIPCION'],
				data: this._operadores,
				callback_esc: () => {
					document.querySelector('.cod_operador').focus()
				},
				callback: (data) => {
					this.form.cod_operador = data.CODIGO;
					setTimeout(() => { _enterInput('.cod_operador') }, 100);
				}
			})
		},

    _ventanaEntidad() {
      _ventanaDatos({
        titulo: 'VENTANA TERCEROS',
        columnas: ['COD', 'NOMBRE'],
        data: this._entidades,
        callback_esc: () => {
          document.querySelector('.entidad').focus()
        },
        callback: (data) => {
          this.form.entidad = data.COD;
          setTimeout(() => { _enterInput('.entidad') }, 100);
        }
      })
		},

		_ventanaUnidades() {
      _ventanaDatos({
        titulo: 'VENTANA UNIDADES DE SERVICIO',
        columnas: ['COD', 'DESCRIP'],
        data: this._unidades,
        callback_esc: () => {
          document.querySelector('.unidad')
        },
        callback: (data) => {
          this.form.unidad = data.COD;
          setTimeout(() => { _enterInput('.unidad') }, 100);
        }
      })
    },



		_ventanaNumero() {},
		_validarUnidad() {},

		// CARGAR DLLS

		cargarOperadores() {
			postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON982.DLL"))
				.then((data) => {
					this._operadores = data.ARCHREST;
					this._operadores.pop();
					// loader("hide");
					this.cargarEntidades();
				})
				.catch((err) => {
					console.log(err);
					loader('hide');
					_toggleNav();
				});
		},
		

		cargarEntidades() {
			postData({ datosh: datosEnvio() + '|' }, get_url('APP/CONTAB/CON802.DLL'))
				.then((data) => {
					this._entidades = data.TERCEROS;
					// loader("hide");
					this.cargarUnidades();
				})
				.catch((err) => {
					console.log(err);
					loader('hide');
					_toggleNav();
				});
		},

		cargarUnidades() {
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER873.DLL"))
        .then((data) => {
          this._unidades = data.UNSERV;
          this._unidades.pop();
					loader("hide");
          this.llenarDatosFecha();
        })
        .catch((err) => {
          console.log(err, 'err')
          loader('hide')
          _toggleNav();
        });
    },

	}
});
