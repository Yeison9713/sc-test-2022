//DETALLADO X TRANSCRIPTOR  - CARLOS R. - 29-09-2021

new Vue({
	el: '#INV54C',
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
			operador:'',
			descrip_operador:'',
			tipo_fact: '',
			grupo: '',
			descrip_grupo:'',
			articulo: '',
			descrip_art:'',
			prefijo: '',
			sucursal: '',
			descrip_suc:'',
			cliente: '',
			descrip_cliente: '',
			medico: '',
			descrip_med: '',

		},

		arr_tipo_fact: [
			{ COD: '*', DESCRIP: 'TODOS LOS SERVICIOS' },
			{ COD: '0', DESCRIP: 'DROGUERIA' },
			{ COD: '1', DESCRIP: 'CIRUGIAS' },
			{ COD: '2', DESCRIP: 'LAB. Y OTROS DIAG ' },
			{ COD: '3', DESCRIP: 'RX- IMAGENOLOGIA' },
			{ COD: '4', DESCRIP: 'OTROS SERVICIOS' },
			{ COD: '5', DESCRIP: 'CONSULTAS Y TERAPIAS' },
			{ COD: '6', DESCRIP: 'PATOLOGIAs-CITOLOGIAS' },
			{ COD: '7', DESCRIP: 'PROMOCION Y PREVENCION' }
		],

		arr_prefijos: [
			{ COD: '*', DESCRIP: 'TODOS LOS PREFIJOS' },
			{ COD: 'E', DESCRIP: 'CONTADO-EFECTIVO' },
			{ COD: 'C', DESCRIP: 'CONTADO-CREDITO' },
			{ COD: 'A', DESCRIP: 'AMBULATORIO' },
			{ COD: 'P', DESCRIP: 'HOSPITALIZADOS' },
			{ COD: 'T', DESCRIP: 'ACC. DE TRANSITO' }
		],


		_operadores:[],
		_grupos: [],
		_grser: [],
		_articulos: [],
		_tablas: [],
		_terceros: [],
		_sucursales: [],

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
		nombreOpcion('9-5-4-1-3-C - Detallado x transcriptor');
		loader('show');
		this.cargarOperadores();
	},
	computed: {
		descrip_tipo_fact() {
			let tipo = this.arr_tipo_fact.find((el) => el.COD == this.form.tipo_fact);
			return tipo ? tipo.DESCRIP : '';
		},

		descrip_prefijo() {
      let tipo = this.arr_prefijos.find((el) => el.COD == this.form.prefijo);
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
						this.validar_Operador();
					}
				}
			);
		},

		validar_Operador() {
			validarInputs(
				{
					form: '#dato_operador',
					orden: '1'
				},
				() => {
					this.validarAnoFin();
				},
				() => {
					this.form.operador = this.form.operador || '****';
					let operador = this.form.operador;
					if (operador == '****') {
						this.$refs.descrip_operador.value = 'Todos los operadores';
						this.validar_factura();
					} else {
						let busq = this._operadores.find((a) => a.CODIGO == operador);
						if (busq != undefined) {
							this.$refs.descrip_operador.value = busq.DESCRIPCION;
							this.validar_factura();
						} else {
							CON851('01', '01', null, 'error', 'error');
							this.validar_Operador();
						}
					}
				}
			);
		},

		validar_factura() {
			POPUP(
				{
					array: this.arr_tipo_fact,
					titulo: 'Tipo de servicio',
					indices: [{ id: 'COD', label: 'DESCRIP'}],
					seleccion: '2',
					teclaAlterna: true,
					id_input: '#tipoFact',
					callback_f: () => {
						this.validar_Operador();
					}
				},
				(data) => {
					this.form.tipo_fact = data.COD;
					setTimeout(() => {
						this.validar_grupo();
					}, 100);
				}
			);
		},

		validar_grupo() {
			validarInputs(
				{
					form: '#dato_grupo',
					orden: '1'
				},
				() => {
					this.validar_factura();
				},
				() => {
					this.form.grupo = this.form.grupo || '**';
					let grupo = this.form.grupo;
					if (grupo == '**') {
						this.$refs.descrip_grupo.value = 'Todos los grupos';
						this.validar_articulo();
					} else if (this.form.tipo_fact == '0') {
						let busq = this._grupos.find((a) => a.GRUPO == grupo);
						if (busq != undefined) {
							this.$refs.descrip_grupo.value = busq.DESCRIP;
							this.validar_articulo();
						} else {
							CON851('01', '01', null, 'error', 'error');
							this.validar_grupo();
						}
					} else {
						let busq = this._grser.find((a) => a.COD == grupo);
						if (busq != undefined) {
							this.$refs.descrip_grupo.value = busq.DESCRIP;
							this.validar_articulo();
						} else {
							CON851('01', '01', null, 'error', 'error');
							this.validar_grupo();
						}
					}
				}
			);
		},

		validar_articulo() {
			validarInputs(
				{
					form: '#dato_articulo',
					orden: '1'
				},
				() => {
					this.validar_grupo();
				},
				() => {
					this.form.articulo = this.form.articulo || '*';
					let articulo = this.form.articulo;

					if (articulo == '*') {
						this.$refs.descrip_art.value = 'Todos los articulos';
						this.validar_prefijo();
					} else if (this.form.tipo_fact == '0') {
						let busq = this._articulos.find((a) => a.LLAVE_ART == articulo);
						if (busq != undefined) {
							this.$refs.descrip_art.value == busq.DESCRIP_ART;
							this.validar_prefijo();
						} else {
							CON851('01', '01', null, 'error', 'error');
							this.validar_articulo();
						}
					} else {
						let busq = this._tablas.find((a) => a.CD_SER == articulo);
						if (busq != undefined) {
							this.$refs.descrip_art.value = busq.DESCRIP;
							this.validar_prefijo();
						} else {
							CON851('01', '01', null, 'error', 'error');
							this.validar_articulo();
						}
					}
				}
			);
		},

		validar_prefijo() {
			POPUP(
				{
					array: this.arr_prefijos,
					titulo: 'FORMA DE PAGO',
					indices: [{ id: 'COD', label: 'DESCRIP'}],
					seleccion: '*',
					teclaAlterna: true,
					id_input: '#dato_prefijo',
					callback_f: () => {
						this.validar_articulo();
					}
				},
				(data) => {
					this.form.prefijo = data.COD;
					setTimeout(() => {
						this.validar_Sucursal();
					}, 100);
				}
			);
		},

    validar_Sucursal() {
      validarInputs({
        form: '#dato_sucursal',
        orden: "1",
      }, () => {
        this.validar_prefijo();
      }, () => {
        this.form.sucursal = this.form.sucursal || "**";    
        let sucursal = this.form.sucursal;

        if (sucursal == '**') {
          this.$refs.descrip_suc.value = 'Todas las sucursales.';
          this.validar_Cliente();
        } else {
          let busq = this._sucursales.find(a => a.CODIGO == sucursal);
          if (busq != undefined) {
            this.$refs.descrip_suc.value = busq.DESCRIPCION;
            this.validar_Cliente();
          } else {
            CON851('01', '01', null, 'error', 'error')
            this.validar_Sucursal();
          }
        }
      })
    },

		validar_Cliente() {
			validarInputs(
				{
					form: '#dato_cliente',
					orden: '1'
				},
				() => {
					this.validar_Sucursal();
				},
				() => {
					this.form.cliente = this.form.cliente || '99';
					let cliente = this.form.cliente;

					if (cliente == '99') {
						this.$refs.descrip_cliente.value = 'Procesa todos los clientes';
						this.validar_Medico();
					} else {
						let busq = this._terceros.find(a => a.COD == cliente);
						if (busq != undefined) {
							this.$refs.descrip_cliente.value = busq.NOMBRE;
							this.validar_Medico();
						} else {
							CON851('01', '01', null, 'error', 'error');
							this.validar_Cliente();
						}
					}
				}
			);
		},

    validar_Medico() {
			validarInputs(
				{
					form: '#dato_medico',
					orden: '1'
				},
				() => {
					this.validar_Cliente();
				},
				() => {
					this.form.medico = this.form.medico || '99';
					let medico = this.form.medico;

					if (medico == '99') {
						this.$refs.descrip_med.value = 'Procesa todos los medicos';
						this._envioImpresion();
					} else {
						let busq = this._terceros.find(a => a.COD == medico);
						if (busq != undefined) {
							this.$refs.descrip_med.value = busq.NOMBRE;
							this._envioImpresion();
						} else {
							CON851('01', '01', null, 'error', 'error');
							this.validar_Medico();
						}
					}
				}
			);
		},

		_envioImpresion() {
      CON851P(
        "00",
        () => {
          this.validar_Medico();
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
          data["operador_w"] = this.form.operador;
          data["tipo_w"] = this.form.tipo_fact;
          data["grupo_w"] = this.form.grupo;
          data["codigo_w"] = this.form.articulo;
          data["prefijo_w"] = this.form.prefijo;
          data["cliente_w"] = this.form.cliente;
          data["medico_w"] = this.form.medico;
          data["sucursal_w"] = this.form.sucursal;


          postData(data, get_url("app/SALUD/INV54C.DLL"), {
            onProgress: (progress) => {
              this.progreso = progress;
            },
          })
            .then((data) => {
              this.loader = false;
              this.label_loader = `GENERANDO IMPRESIÓN...`;
              this.progreso.completado = true;
              this._montarImpresion_INV54C(data);
            })
            .catch((err) => {
              console.error(err);
              CON851("", "Error consultando datos", null, "error", "Error");
              this.loader = false;
              this.estado_loader = false;
              this.validar_Medico();
            });
        }
      );
    },

		_montarImpresion_INV54C(data) {
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
        this.validar_Medico();
      } else {
        var columnas = [
          {
            title: "DETALLE",
            value: "DETALLE",
          },
          {
            title: "CANTIDAD",
            value: "CANTIDAD",
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


		// VENTANAS F8


		_VentanaOperadores() {
      _ventanaDatos({
        titulo: 'VENTANA DE OPERADORES',
        columnas: ['CODIGO', 'DESCRIPCION'],
        data: this._operadores,
        callback_esc: () => {
          document.querySelector('.operador').focus()
        },
        callback: (data) => {
          this.form.operador = data.CODIGO;
          setTimeout(() => { _enterInput('.operador') }, 100);
        }
      })
    },


		_validarVentanaGrupos() {
			if (this.form.tipo_fact == '0') {
				this._ventanaGrupos();
			} else {
				this._ventanaGruposServ();
			}
		},

		_ventanaGrupos() {
			_ventanaDatos({
				titulo: 'VENTANA DE GRUPOS',
				columnas: ['TIPO', 'GRUPO', 'DESCRIP'],
				data: this._grupos,
				callback_esc: () => {
					document.querySelector('.grupo').focus();
				},
				callback: (data) => {
					this.form.grupo = data.GRUPO;
					this.$refs.descrip_grupo.value = data.DESCRIP;
					setTimeout(() => {
						_enterInput(".grupo");
					}, 100);
				}
			});
		},

		_ventanaGruposServ() {
			_ventanaDatos({
				titulo: 'VENTANA DE GRUPOS DE SERVICIOS',
				columnas: ['COD', 'DESCRIP'],
				data: this._grser,
				callback_esc: () => {
					document.querySelector('.grupo').focus();
				},
				callback: (data) => {
					this.form.grupo = data.COD;
					this.$refs.descrip_grupo.value = data.DESCRIP;
					setTimeout(() => {
						_enterInput(".grupo");
					}, 100);
				}
			});
		},

		_validarVentanaArt() {
			if (this.form.tipo_fact == '0') {
				this._ventanaArt();
			} else {
				this._ventanaTablas();
			}
		},

		_ventanaArt() {
			_ventanaDatos({
				titulo: 'VENTANA DE ARTICULOS',
				columnas: ['LLAVE_ART', 'TIPO_ART', 'GRUPO_ART', 'DESCRIP_ART'],
				data: this._articulos,
				callback_esc: () => {
					document.querySelector('.articulo').focus();
				},
				callback: (data) => {
					this.form.articulo = data.LLAVE_ART;
					this.$refs.descrip_art.value = data.DESCRIP_ART;
					setTimeout(() => {
						_enterInput(".articulo");
					}, 100);
				}
			});
		},

		_ventanaTablas() {
			_ventanaDatos({
				titulo: 'VENTANA TABLA DE TARIFAS',
				columnas: ['CD_SER', 'DESCRIP'],
				data: this._tablas,
				callback_esc: () => {
					document.querySelector('.articulo').focus();
				},
				callback: (data) => {
					this.form.articulo = data.CD_SER;
					this.$refs.descrip_art.value = data.DESCRIP;
					setTimeout(() => {
						_enterInput(".articulo");
					}, 100);
				}
			});
		},

		_ventanaSucursales() {
      _ventanaDatos({
        titulo: 'VENTANA DE SUCURSALES',
        columnas: ['CODIGO', 'DESCRIPCION'],
        data: this._sucursales,
        callback_esc: () => {
          document.querySelector('.sucursal').focus()
        },
        callback: (data) => {
          this.form.sucursal = data.CODIGO;
          setTimeout(() => { _enterInput('.sucursal') }, 100);
        }
      })
		},

		_ventanaCliente() {
      _ventanaDatos({
        titulo: 'VENTANA TERCEROS',
        columnas: ['COD', 'NOMBRE'],
        data: this._terceros,
        callback_esc: () => {
          document.querySelector('.cliente').focus()
        },
        callback: (data) => {
          this.form.cliente = data.COD;
          setTimeout(() => { _enterInput('.cliente') }, 100);
        }
      })
		},

    _ventanaMed() {
      _ventanaDatos({
        titulo: 'VENTANA TERCEROS',
        columnas: ['COD', 'NOMBRE'],
        data: this._terceros,
        callback_esc: () => {
          document.querySelector('.medico').focus()
        },
        callback: (data) => {
          this.form.medico = data.COD;
          setTimeout(() => { _enterInput('.medico') }, 100);
        }
      })
		},




		// CARGAR DLLS
		
		cargarOperadores() {
      postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON982.DLL"))
        .then((data) => {
          this._operadores = data.ARCHREST;
          this._operadores.pop();
          // loader("hide");
					this.cargarGrupos();
				})
				.catch((err) => {
					console.log(err);
					loader('hide');
					_toggleNav();
				});
    },

		cargarGrupos() {
			postData({ datosh: datosEnvio() + '|' }, get_url('APP/INVENT/INV804.DLL'))
				.then((data) => {
					this._grupos = data.GRUPOS;
					this.cargarGrpSer();
				})
				.catch((err) => {
					console.log(err);
					loader('hide');
					_toggleNav();
				});
		},

		cargarGrpSer() {
			postData({ datosh: datosEnvio() + '|' }, get_url('APP/SALUD/SER801.DLL'))
				.then((data) => {
					this._grser = data.CODIGOS;
					// loader("hide");
					this.cargarArticulos();
				})
				.catch((err) => {
					console.log(err);
					loader('hide');
					_toggleNav();
				});
		},

		cargarArticulos() {
			postData({ datosh: datosEnvio() + '|' }, get_url('APP/INVENT/INV803.DLL'))
				.then((data) => {
					this._articulos = data.ARTICULOS;
					this._articulos.pop();
					this.cargarTablas();
				})
				.catch((err) => {
					console.log(err);
					loader('hide');
					_toggleNav();
				});
		},

		cargarTablas() {
			postData({ datosh: datosEnvio() + '|' }, get_url('APP/SALUD/SER802.DLL'))
				.then((data) => {
					this._tablas = data.TABLA;
          this._tablas.pop();
					// loader("hide");
					this.cargarTerceros();
				})
				.catch((err) => {
					console.log(err);
					loader('hide');
					_toggleNav();
				});
		},

		cargarTerceros() {
			postData({ datosh: datosEnvio() + '|' }, get_url('APP/CONTAB/CON802.DLL'))
				.then((data) => {
					this._terceros = data.TERCEROS;
					// loader("hide");
					this.cargarSucursal();
				})
				.catch((err) => {
					console.log(err);
					loader('hide');
					_toggleNav();
				});
		},

		cargarSucursal() {
      postData({ datosh: datosEnvio() }, get_url("APP/CONTAB/CON823.DLL"))
        .then((data) => {
          this._sucursales = data.SUCURSAL;
          loader('hide')
          this.llenarDatosFecha()
        })
        .catch((err) => {
          console.log(err, 'err')
          loader('hide')
          _toggleNav();
        });
    },
	}
});
