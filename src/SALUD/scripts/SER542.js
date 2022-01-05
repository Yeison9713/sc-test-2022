

new Vue({
  el: '#SER542',
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
      tipo_fact: '',
			entidad: '',
			descrip_entidad: '',
			eps: '',
			contrato: '',
			tipo_emb: '',
			costos: '',
			descrip_costo: '',
			tipo_finalid: '',
      grupo: '',
			descrip_grupo: '',
			sep_finalidad: '',
			macro: '',
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

		arr_emb: [
			{ COD: '1', DESCRIP: 'Embarazadas' },
			{ COD: '2', DESCRIP: 'No embarazadas ' },
			{ COD: '3', DESCRIP: 'Ambas' }
		],

		arr_finalid: [
		   	{ COD: '0', DESCRIP: 'No Aplica.' },
				{ COD: '1', DESCRIP: 'Atención parto.' },
				{ COD: '2', DESCRIP: 'Atención recien nacido.' },
				{ COD: '3', DESCRIP: 'Atención planif. familiar' },
				{ COD: '4', DESCRIP: 'Det. alt. crecim. y des <10' },
				{ COD: '5', DESCRIP: 'Det. alt. desar. joven' },
				{ COD: '6', DESCRIP: 'Det. alt. embarazo' },
				{ COD: '7', DESCRIP: 'Det. alt. adulto' },
				{ COD: '8', DESCRIP: 'Det. alt. agud. visual' },
				{ COD: '9', DESCRIP: 'Det. enferm. profes' },		
				{ COD: '99', DESCRIP: 'Todas las finalidades' },			
		],

    _grupos: [],
    _costos: [],
    _terceros: [],
    _entidades: [],

    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,

    fecha_act: moment().format("YYYYMMDD"),
  },

  async created() {
    // _vm = this;
    // _toggleNav();
    _inputControl('disabled');
		_inputControl('reset');
    // loader('hide')
    nombreOpcion('9-5-4-2-1-1-7 - Relac. comprob. x entidad');
    loader("show");
    this.cargarEntidades();
  
  },
  
  computed: {
    descrip_tipo_fact() {
      let tipo = this.arr_tipo_fact.find((el) => el.COD == this.form.tipo_fact);
      return tipo ? tipo.DESCRIP : '';
    },

    descrip_emb() {
      let tipo = this.arr_emb.find((el) => el.COD == this.form.tipo_emb);
      return tipo ? tipo.DESCRIP : '';
    },

		descrip_finalid() {
      let tipo = this.arr_finalid.find((el) => el.COD == this.form.tipo_finalid);
      return tipo ? tipo.DESCRIP : '';
    },
  },
  
  methods: {
    llenarDatosFecha() {
      // loader('hide');

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
				},
				() => {
					this.validarAnoFin();
				},
				() => {
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
					orden: '1'
				},
				() => {
					this.validarAnoFin();
				},
				() => {
					this.form.dia_fin = cerosIzq(this.form.dia_fin, 2);
					let dia = parseInt(this.form.diaFinal);
					this.form.fechaInicial = parseInt(`${this.form.ano_ini}${this.form.mes_ini}${this.form.dia_ini}`);
					this.form.fechaFinal = parseInt(`${this.form.ano_fin}${this.form.mes_fin}${this.form.dia_fin}`);
					if (dia < 1 || dia > 31) {
						this.validarDiaFin();
					} else if (this.form.fechaFinal < this.form.fechaInicial) {
						CON851('37', '37', null, 'error', 'error');
						this.validarAnoFin();
					} else {
						this.validar_factura();
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
					seleccion: '*',
					teclaAlterna: true,
					id_input: '#tipoFact',
					callback_f: () => {
						this.validarAnoIni();
					}
				},
				(data) => {
					this.form.tipo_fact = data.COD;
					setTimeout(() => {
						this.validar_Entidad();
					}, 100);
				}
			);
		},

		validar_Entidad (){
			validarInputs(
				{
					form: '#dato_entidad',
					orden: '1'
				},
				() => {
					this.validar_factura();
				},
				() => {
					this.form.entidad = this.form.entidad || '99';
					let entidad = this.form.entidad;

					if (entidad == '99') {
						this.$refs.descrip_entidad.value = 'Todos los clientes';
						this.validar_eps();
					} else {
						let busq = this._entidades.find(a => a.COD == entidad);
						if (busq != undefined) {
							this.$refs.descrip_entidad.value = busq.NOMBRE;
							this.validar_eps();
						} else {
							CON851('01', '01', null, 'error', 'error');
							this.validar_Entidad();
						}
					}
				}
			);
		},

		validar_eps (){
			if (this.form.entidad != "99") {
				this.form.eps = 'S';
				this.validar_contrato();
			} else {
				validarInputs(
					{
						form: "#dato_eps",
						orden: '1'
					},
					() => {
						this.validar_Entidad();
					},
					() => {
						this.form.eps = this.form.eps.toUpperCase() || 'N';
						let eps = this.form.eps;
						if (['S', 'N'].includes(eps)){
							this.form.eps = eps;
							this.validar_contrato();
						} else {
							CON851('03', '03', null, 'error', 'error');
							this.validar_eps();
						}
					}
				)
			}
		},

		validar_contrato() {
			validarInputs(
				{
					form: '#dato_contrato',
					orden: '1'
				},
				() => {
					this.validar_Entidad();
				},
				() => {
					let contrato = this.form.contrato.toUpperCase() || 'S';
					this.form.contrato = contrato;

					if (contrato == 'S' || contrato == 'N') {
						this.validar_emb();
					} else {
						CON851('03', '03', null, 'error', 'error');
						this.validar_contrato();
					}
				}
			);
		},

		validar_emb() {
			POPUP(
				{
					array: this.arr_emb,
					titulo: ' VER ',
					indices: [{ id: 'COD', label: 'DESCRIP'}],
					seleccion: '3',
					teclaAlterna: true,
					id_input: '#dato_emb',
					callback_f: () => {
						this.validar_contrato();
					}
				},
				(data) => {
					this.form.tipo_emb = data.COD;
					setTimeout(() => {
						this.validar_costos();
					}, 100);
				}
			);
		},

		validar_costos (){
			validarInputs(
				{
					form: '#dato_costos',
					orden: '1'
				},
				() => {
					this.validar_emb();
				},
				() => {
					this.form.costos = this.form.costos || '**';
					let costos = this.form.costos;
					if (costos == '**') {
						this.$refs.descrip_costos.value = 'Todos los costos';
						this.validar_finalid();
					} else {
						let busq = this._costos.find(a => a.COD == costos);
						if (busq != undefined) {
							this.$refs.descrip_costos.value = busq.NOMBRE;
							this.validar_finalid();
						} else {
							CON851('01', '01', null, 'error', 'error');
							this.validar_costos();
						}
					}
				}
			);
		},

		validar_finalid() {
			POPUP(
				{
					array: this.arr_finalid,
					titulo: ' Finalidad de la consulta ',
					indices: [{ id: 'COD', label: 'DESCRIP'}],
					seleccion: '99',
					teclaAlterna: true,
					id_input: '#dato_finalid',
					callback_f: () => {
						this.validar_costos();
					}
				},
				(data) => {
					this.form.tipo_finalid = data.COD;
					setTimeout(() => {
						this.validar_grupos();
					}, 100);
				}
			);
		},

		validar_grupos (){
			validarInputs(
				{
					form: '#dato_grupo',
					orden: '1'
				},
				() => {
					this.validar_finalid();
				},
				() => {
					this.form.grupo = this.form.grupo || '**';
					let grupo = this.form.grupo;
					if (grupo == '**') {
						this.$refs.descrip_grupo.value = 'Todos los grupos';
						this.validar_separar_finalid();
					} else {
						let busq = this._grupos.find(a => a.COD == grupo);
						if (busq != undefined) {
							this.$refs.descrip_grupo.value = busq.DESCRIP;
							this.validar_separar_finalid();
						} else {
							CON851('01', '01', null, 'error', 'error');
							this.validar_grupos();
						}
					}
				}
			);
		},

		validar_separar_finalid (){
			if (this.form.tipo_finalid != "99") {
				this.form.sep_finalidad = 'N';
				this.validar_macro();
			} else {
				validarInputs(
					{
						form: "#dato_separar_fin",
						orden: '1'
					},
					() => {
						this.validar_grupos();
					},
					() => {
						this.form.sep_finalidad = this.form.sep_finalidad.toUpperCase() || 'S';
						let sep_finalidad = this.form.sep_finalidad;
						if (['S', 'N'].includes(sep_finalidad)){
							this.form.sep_finalidad = sep_finalidad;
							this.validar_macro();
						} else {
							CON851('03', '03', null, 'error', 'error');
							this.validar_separar_finalid();
						}
					}
				)
			}
		},

		validar_macro (){
			if (this.form.grupo != "**" || this.form.tipo_finalid != "99") {
				this.form.macro = 'N';
				this._envioImpresion();
			} else {
				validarInputs(
					{
						form: "#dato_macro",
						orden: '1'
					},
					() => {
						this.validar_separar_finalid();
					},
					() => {
						this.form.macro = this.form.macro.toUpperCase() || 'S';
						let macro = this.form.macro;
						if (['S', 'N'].includes(macro)){
							this.form.macro = macro;
							this._envioImpresion();
						} else {
							CON851('03', '03', null, 'error', 'error');
							this.validar_macro();
						}
					}
				)
			}
		},

		_envioImpresion() {
			CON851P(
        "00",
        () => {
          this.validar_macro();
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
					data["tipo_w"] = this.form.tipo_fact;
					data["entidad"] = this.form.entidad;
					data["eps"] = this.form.eps;
					data["contrato"] = this.form.contrato;
					data["costos"] = this.form.costos;
					data["sep_finalidad"] = this.form.sep_finalidad;
					data["macro"] = this.form.macro;


          postData(data, get_url("app/SALUD/SER542.DLL"), {
            onProgress: (progress) => {
              this.progreso = progress;
            },
          })
            .then((data) => {
              this.loader = false;
              this.label_loader = `GENERANDO IMPRESIÓN...`;
              this.progreso.completado = true;
							this._montarImpresion_SER542(data);
            })
            .catch((err) => {
              console.error(err);
              CON851("", "Error consultando datos", null, "error", "Error");
              this.loader = false;
              this.estado_loader = false;
              this.validar_macro();
            });
        }
      );
		},

		_montarImpresion_SER542(data) {
      data.ENCABEZADO = [];

      let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
      let nit = $_USUA_GLOBAL[0].NIT.toString();
      let fecha = moment().format('MMM DD/YY');

      for (i in data.LISTADO) {
        data.LISTADO[i]['CONCEPTO'] = data.LISTADO[i]['CONCEPTO'].replace(/\�/g, "Ñ")
        // data.LISTADO[i]['CODIGO_J'] = data.LISTADO[i][`LOTE_J`] + data.LISTADO[i][`COMPROB_J`]
      }

      if (data.LISTADO.length < 1) {
        CON851('08', '08', null, 'error', 'error');
        this.estado_loader = false;
        this.validar_macro();
      } else {
        var columnas = [
					{
            title: "CODIGO_CUPS", 
            value: "CODIGO_CUPS",
          },
          {
            title: "CONCEPTO",
            value: "CONCEPTO",
            format: "string",
          },
					{
            title: "FIN", 
            value: "FIN",
          },
					{
            title: "MASCULINO", 
            value: "MASCULINO",
          },
					{
            title: "FEMENINO", 
            value: "FEMENINO",
          },
					{
            title: "EVENTOS", 
            value: "EVENTOS",
          },
					{
            title: "VALOR", 
            value: "VALOR",
          },
					{
            title: "EPS", 
            value: "EPS",
          },
					{
            title: "CONTRATO", 
            value: "CONTRATO",
          },
					{
            title: "COMPROB", 
            value: "COMPROB",
          },
					{
            title: "FECHA", 
            value: "FECHA",
          },
					{
            title: "PACIENTE", 
            value: "PACIENTE",
          },
					{
            title: "EDAD", 
            value: "EDAD",
          },
					{
            title: "DIAG1", 
            value: "DIAG1",
          },
					{
            title: "FECHA", 
            value: "FECHA",
          },
					{
            title: "DIAG2", 
            value: "DIAG2",
          },
        ]

        var header_format = [
          { text: `${nombreEmpresa}`, bold: true, size: 16 },
          `INFORME DE ATENCION EN SALUD: ${nit}`,
          `RESUMEN TIPO: ${this.descrip_tipo_fact}    -    
					DESDE: ${this.form.ano_ini}/${this.form.mes_ini}/${this.form.dia_ini} -
					 HASTA: ${this.form.ano_fin}/${this.form.mes_fin}/${this.form.dia_fin} 
					- ${this.form.descrip_espec}`,
					`PREFIJO: ${this.form.prefijo}   -   ENTIDAD: ${this.form.descrip_nit}`,
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

    // Ventanas F8

		_ventanaEntidades() {
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

		_ventanaCostos() {
      _ventanaDatos({
        titulo: 'VENTANA DE CENTROS DE COSTO',
        columnas: ['COD', 'NOMBRE'],
        data: this._costos,
        callback_esc: () => {
          document.querySelector('.costos').focus()
        },
        callback: (data) => {
          this.form.costos = data.COD;
          setTimeout(() => { _enterInput('.costos') }, 100);
        }
      })
		},

		_ventanaGrupos() {
			_ventanaDatos({
				titulo: 'VENTANA DE GRUPOS DE SERVICIOS',
				columnas: ['COD', 'DESCRIP'],
				data: this._grupos,
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

		// Cargar DLLS
		
		cargarEntidades() {
			postData({ datosh: datosEnvio() + '|' }, get_url('APP/CONTAB/CON802.DLL'))
				.then((data) => {
					this._entidades = data.TERCEROS;
					// loader('hide');
					this.cargarCostos();
				})
				.catch((err) => {
					console.log(err);
					loader('hide');
					_toggleNav();
				});
		},

		cargarCostos() {
			postData({ datosh: datosEnvio() + '|' }, get_url('APP/CONTAB/CON803.DLL'))
				.then((data) => {
					this._costos = data.COSTO;
					this._costos.pop();
					// loader('hide');
					this.cargarGrupos();
				})
				.catch((err) => {
					console.log(err);
					loader('hide');
					_toggleNav();
				});
		},

		cargarGrupos() {
			postData({ datosh: datosEnvio() + '|' }, get_url('APP/SALUD/SER801.DLL'))
				.then((data) => {
					this._grupos = data.CODIGOS;
					loader('hide');
					this.llenarDatosFecha();
				})
				.catch((err) => {
					console.log(err);
					loader('hide');
					_toggleNav();
				});
		},


  },
  
})