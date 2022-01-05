//INFORME DE ATENCION X EDADES  - CARLOS R. - 29-09-2021

new Vue({
	el: '#INV544P',
	components: {
		loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
	},
	data: {
		form: {
			tipo_fact: '',
			prefijo: '',
			unidad:'',
			paciente: '',
			ciudad: '',
			factura: '',
			especialidad: '',
			fechaInicial: '',
			fechaFinal: '',
			ano_ini: '',
			mes_ini: '',
			dia_ini: '',
			ano_fin: '',
			mes_fin: '',
			dia_fin: '',
			grupo: '',
			descrip_grupo:'',
			articulo: '',
			descrip_art:'',
			codigo: '',
			primera_vez: '',
			mayor15: '',
			nit: '',
			descrip_nit: '',
			espec: '',
			descrip_espec: '',
			med:'',
			costos: '',
			descrip_costos: '',
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

		_terceros: [],
		_grupos: [],
		_grser: [],
		_articulos: [],
		_especialidades: [],
		_costos: [],

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
		nombreOpcion('9-5-4-1-2-3 - Informe de atencion x puerta');
		loader('show');
		this.cargarGrupos();
	},
	computed: {
		descrip_tipo_fact() {
			let tipo = this.arr_tipo_fact.find((el) => el.COD == this.form.tipo_fact);
			return tipo ? tipo.DESCRIP : '';
		},
	},

	methods: {
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
						_toggleNav();
					}
				},
				(data) => {
					this.form.tipo_fact = data.COD;
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
					this.validar_factura();
				},
				() => {
					this.form.prefijo = this.form.prefijo.toUpperCase() || '*';
					let prefijo = this.form.prefijo;

					if (prefijo == '*') {
						this.dato_unidad();
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
						this.dato_unidad();
					} else {
						this.validar_prefijo();
					}
				}
			);
		},

		dato_unidad() {
			validarInputs(
				{
					form: '#validar_unidad',
					orden: '1'
				},
				() => {
					this.validar_prefijo();
				},
				() => {
					let unidad = this.form.unidad.toUpperCase() || 'S';
					this.form.unidad = unidad;

					if (unidad == 'S' || unidad == 'N') {
						this.dato_paci();
					} else {
						CON851('03', '03', null, 'error', 'error');
						this.dato_unidad();
					}
				}
			);
		},

		dato_paci() {
			validarInputs(
				{
					form: '#validar_paciente',
					orden: '1'
				},
				() => {
					this.dato_unidad();
				},
				() => {
					let paciente = this.form.paciente.toUpperCase() || 'S';
					this.form.paciente = paciente;

					if (paciente == 'S' || paciente == 'N') {
						this.dato_ciudad();
					} else {
						CON851('03', '03', null, 'error', 'error');
						this.dato_paci();
					}
				}
			);
		},

		dato_ciudad() {
			validarInputs(
				{
					form: '#validar_ciudad',
					orden: '1'
				},
				() => {
					this.dato_paci();
				},
				() => {
					let ciudad = this.form.ciudad.toUpperCase() || 'N';
					this.form.ciudad = ciudad;

					if (ciudad == 'S' || ciudad == 'N') {
						this.dato_fact();
					} else {
						CON851('03', '03', null, 'error', 'error');
						this.dato_ciudad();
					}
				}
			);
		},

		dato_fact() {
			validarInputs(
				{
					form: '#validar_factura',
					orden: '1'
				},
				() => {
					this.dato_ciudad();
				},
				() => {
					let factura = this.form.factura.toUpperCase() || 'N';
					this.form.factura = factura;

					if (factura == 'S' || factura == 'N') {
						this.dato_espec();
					} else {
						CON851('03', '03', null, 'error', 'error');
						this.dato_fact();
					}
				}
			);
		},

		dato_espec() {
			validarInputs(
				{
					form: '#validar_especialidad',
					orden: '1'
				},
				() => {
					this.dato_fact();
				},
				() => {
					let especialidad = this.form.especialidad.toUpperCase() || 'N';
					this.form.especialidad = especialidad;

					if (especialidad == 'S' || especialidad == 'N') {
						this.llenarDatosFecha();
					} else {
						CON851('03', '03', null, 'error', 'error');
						this.dato_espec();
					}
				}
			);
		},

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
					this.dato_espec();
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
						this.validar_grupo();
					}
				}
			);
		},

		validar_grupo() {
			validarInputs(
				{
					form: '#validar_grupo',
					orden: '1'
				},
				() => {
					this.validarAnoIni();
				},
				() => {
					this.form.grupo = this.form.grupo || '**';
					let grupo = this.form.grupo;
					if (grupo == '**') {
						this.form.articulo = '*';
						this.$refs.descrip_grupo.value = 'Todos los grupos';
						this.$refs.descrip_art.value = 'Todos los articulos';
						this.validar_codigo();
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
					form: '#validar_articulo',
					orden: '1'
				},
				() => {
					this.validar_grupo();
				},
				() => {
					this.form.articulo = this.form.articulo || '*';
					let articulo = this.form.articulo;

					if (articulo == '*') {
						this.form.descrip_art = 'Todas las entidades';
						this.validar_codigo();
					} else {
						let busq = this._articulos.find(a => a.LLAVE_ART == articulo);
						if (busq != undefined) {
							this.form.descrip_art = busq.DESCRIP_ART;
							this.validar_codigo();
						} else {
							CON851('01', '01', null, 'error', 'error');
							this.validar_articulo();
						}
					}
				}
			);
		},

		validar_codigo() {
			if (this.form.grupo == "**" || this.form.articulo == "*") {
				validarInputs(
					{
						form: "#validar_codigo",
					},
					() => {
						this.validar_grupo();
					},
					() => {
						this.form.codigo = this.form.codigo.toUpperCase() || 'S';
						let codigo = this.form.codigo;
						if (['S', 'N'].includes(codigo)) {
							if (this.form.factura == 'N' &&
								this.form.paciente == 'N' &&
								this.form.ciudad == 'N' &&
								this.form.especialidad == 'N' &&
								this.form.codigo == 'N') {
								CON851("", "03", null, "error", "error");
								this.validar_codigo();
							} else {
								this.form.primera_vez = "N";
								this.dato_repet()
							}
						} else {
							CON851("03", "03", null, "error", "error");
							this.validar_discriminar_codigo()
						}
					}
				);
			} else {
				this.form.codigo = 'S';
				this.form.primera_vez = "N";
				this.validar_entidad();
			}
		},

		dato_repet() {
			if (
				(this.form.tipo_fact == '5' || this.form.tipo_fact == '7') &&
				this.form.paciente == "S"
			) {
				if (this.form.tipo_fact == '7' && this.form.grupo != '89') {
					this.form.primera_vez = "N";
					this.validar_entidad();
				} else {
					validarInputs(
						{
							form: "#validar_primera_vez",
						},
						() => {
							this.validar_grupo();
						},
						() => {
							this.form.primera_vez = this.form.primera_vez.toUpperCase() || 'N';
							let primera_vez = this.form.primera_vez;

							if (['S', 'N'].includes(primera_vez)) {
								this.form.mayor15 = "N";
								this.dato_mayor15();
							} else {
								CON851('03', '03', null, 'error', 'error');
								this.dato_repet()
							}
						}
					);
				}
			} else {
				this.form.primera_vez = "N";
				this.validar_entidad();
			}
		},

		dato_mayor15() {
			if (this.form.tipo_fact == '5') {
				validarInputs(
						{
							form: '#validar_mayor15',
							orden: '1'
						},
						() => {
							this.validar_grupo();
						},
						() => {
							let mayor15 = this.form.mayor15.toUpperCase() || 'N';
							this.form.mayor15 = mayor15;

							if (mayor15 == 'S' || mayor15 == 'N') {
								this.validar_entidad();
							} else {
								CON851('03', '03', null, 'error', 'error');
								this.dato_mayor15();
							}
						}
					);
			} else {
				this.form.mayor15 = "N";
				this.validar_entidad();
			}
		},

		validar_entidad() {
			validarInputs(
				{
					form: '#validar_nit',
					orden: '1'
				},
				() => {
					this.validar_grupo();
				},
				() => {
					this.form.nit = this.form.nit || '99';
					let nit = this.form.nit;

					if (nit == '99') {
						this.form.descrip_nit = 'Todas las entidades';
						this.dato_especialidad();
					} else {
						let busq = this._terceros.find(a => a.COD == nit);
						if (busq != undefined) {
							this.form.descrip_nit = busq.NOMBRE;
							this.dato_especialidad();
						} else {
							CON851('01', '01', null, 'error', 'error');
							this.validar_entidad();
						}
					}
				}
			);
		},

		dato_especialidad() {
			validarInputs(
				{
					form: '#validar_espec',
					orden: '1'
				},
				() => {
					this.validar_entidad();
				},
				() => {
					this.form.espec = this.form.espec || '***';
					let espec = this.form.espec;
					
					if (espec == '***') {
						this.form.descrip_espec = 'Todas las especialidades';
						this.dato_med();
					} else {
						let busq = this._especialidades.find(a => a.CODIGO == espec);
						if (busq != undefined) {
							this.form.descrip_espec = busq.NOMBRE;
							this.dato_med();
						} else {
							CON851('01', '01', null, 'error', 'error');
							this.dato_especialidad();
						}
					}
				}
			);
		},

		dato_med() {
			if (this.form.tipo_fact == "0" || (this.form.tipo_fact == "*" && this.form.codigo == "N")) {
				validarInputs(
					{
						form: "#validar_med",
						orden: '1'
					},
					() => {
						this.validar_especialidad();
					},
					() => {
						this.form.med = this.form.med.toUpperCase() || 'S';
						let med = this.form.med;
						if (med == 'S' || med == 'N') {
							this.dato_costo();
						} else {
							CON851('03', '03', null, 'error', 'error');
							this.dato_med();
						}
					}
				);
			} else {
				this.dato_costo();
			}
		},

		dato_costo() {
			validarInputs(
				{
					form: '#validar_costos',
					orden: '1'
				},
				() => {
					this.dato_especialidad();
				},
				() => {
					this.form.costos = this.form.costos || '**';
					let costos = this.form.costos;

					if (costos == '**') {
						this.form.descrip_costos = 'Todos los costos';
						this._envioImpresion();
					} else {
						let busq = this._costos.find(a => a.COD == costos);
						if (busq != undefined) {
							this.form.descrip_costos = busq.NOMBRE;
							this._envioImpresion();
						} else {
							CON851('01', '01', null, 'error', 'error');
							this.dato_costo();
						}
					}
				}
			);
		},

							// IMPRESION

		_envioImpresion() {
			CON851P(
        "00",
        () => {
          this.dato_costo();
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
					data["tipo_w"] = this.form.tipo_fact;
					data["prefijo_w"] = this.form.prefijo;
					data["unid_w"] = this.form.unidad;
					data["paci_w"] = this.form.paciente;
					data["ciudad_w"] = this.form.ciudad;
					data["fact_w"] = this.form.factura;
					data["espe_w"] = this.form.especialidad;
					data["fecha_inicial"] = this.form.fechaInicial.toString();
					data["fecha_final"] = this.form.fechaFinal.toString();
					data["grupo_w"] = this.form.grupo;
					data["art_w"] = this.form.articulo;
					data["codi_w"] = this.form.codigo;
					data["repet_w"] = this.form.primera_vez;
					data["mayor_w"] = this.form.mayor15;
					data["entidad_w"] = this.form.nit;
					data["espec_w"] = this.form.espec;
					data["med_w"] = this.form.med;
					data["costo_w"] = this.form.costos;


          postData(data, get_url("app/SALUD/INV544P.DLL"), {
            onProgress: (progress) => {
              this.progreso = progress;
            },
          })
            .then((data) => {
              this.loader = false;
              this.label_loader = `GENERANDO IMPRESIÓN...`;
              this.progreso.completado = true;
							if (this.form.discri_factura == 'S'){
								this._montarImpresion1_INV544P(data);
							}else {
              	this._montarImpresion2_INV544P(data);
							}
            })
            .catch((err) => {
              console.error(err);
              CON851("", "Error consultando datos", null, "error", "Error");
              this.loader = false;
              this.estado_loader = false;
              this.validar_grupo();
            });
        }
      );
		},

		_montarImpresion1_INV544P(data) {
      data.ENCABEZADO = [];

      let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
      let nit = $_USUA_GLOBAL[0].NIT.toString();
      let fecha = moment().format('MMM DD/YY');

      for (i in data.LISTADO) {
        data.LISTADO[i]['DESCRIP'] = data.LISTADO[i]['DESCRIP'].replace(/\�/g, "Ñ")
        // data.LISTADO[i]['CODIGO_J'] = data.LISTADO[i][`LOTE_J`] + data.LISTADO[i][`COMPROB_J`]
      }

      if (data.LISTADO.length < 1) {
        CON851('08', '08', null, 'error', 'error');
        this.estado_loader = false;
        this.validar_grupo();
      } else {
        var columnas = [
          {
            title: "ARTICULO",
            value: "ARTICULO",
            format: "string",
          },
          {
            title: "DESCRIPCION",
            value: "DESCRIP",
						format: "string",
          },
          {
            title: "CANTIDAD", 
            value: "CANTIDAD",
          },
          {
            title: "VALOR VENTA",
            value: "VALOR_VENTA",
          },
          {
            title: "URGENCIAS", 
            value: "URGENCIAS",
          },
          {
            title: "EXTERNA",
            value: "EXTERNA",
          },
          {
            title: "HOSPITAL", 
            value: "HOSPITAL",
          },
          {
            title: "PACIENTE",
            value: "PACIENTE",
          },
          {
            title: "COMPROBANTE", 
            value: "COMP",
          },
					{
            title: "CIUDAD", 
            value: "CIUDAD",
          },
					{
            title: "ESPECIALIDAD", 
            value: "ESPEC",
          },
					{
            title: "UNIDAD", 
            value: "UNIDAD",
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

		_montarImpresion2_INV544P(data) {
      data.ENCABEZADO = [];

      let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
      let nit = $_USUA_GLOBAL[0].NIT.toString();
      let fecha = moment().format('MMM DD/YY');

      for (i in data.LISTADO) {
        data.LISTADO[i]['DESCRIP'] = data.LISTADO[i]['DESCRIP'].replace(/\�/g, "Ñ")
        // data.LISTADO[i]['CODIGO_J'] = data.LISTADO[i][`LOTE_J`] + data.LISTADO[i][`COMPROB_J`]
      }

      if (data.LISTADO.length < 1) {
        CON851('08', '08', null, 'error', 'error');
        this.estado_loader = false;
        this.validar_grupo();
      } else {
        var columnas = [
          {
            title: "ARTICULO",
            value: "ARTICULO",
            format: "string",
          },
          {
            title: "DESCRIPCION",
            value: "DESCRIP",
						format: "string",
          },
          {
            title: "CANTIDAD", 
            value: "CANTIDAD",
          },
          {
            title: "VALOR VENTA",
            value: "VALOR_VENTA",
          },
          {
            title: "URGENCIAS", 
            value: "URGENCIAS",
          },
          {
            title: "EXTERNA",
            value: "EXTERNA",
          },
          {
            title: "HOSPITAL", 
            value: "HOSPITAL",
          },
          {
            title: "FORMULA",
            value: "FORMULA",
          },
					{
            title: "CIUDAD", 
            value: "CIUDAD",
          },
					{
            title: "ESPECIALIDAD", 
            value: "ESPEC",
          },
					{
            title: "UNIDAD", 
            value: "UNIDAD",
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

		// VENTANAS F8

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

		_ventanaNit() {
      _ventanaDatos({
        titulo: 'VENTANA TERCEROS',
        columnas: ['COD', 'NOMBRE'],
        data: this._terceros,
        callback_esc: () => {
          document.querySelector('.nit').focus()
        },
        callback: (data) => {
          this.form.nit = data.COD;
          setTimeout(() => { _enterInput('.nit') }, 100);
        }
      })
		},

		_ventanaEspec() {
      _ventanaDatos({
        titulo: 'VENTANA DE ESPECIALIDADES',
        columnas: ['CODIGO', 'NOMBRE'],
        data: this._especialidades,
        callback_esc: () => {
          document.querySelector('.especialidad').focus()
        },
        callback: (data) => {
          this.form.especialidad = data.CODIGO;
          setTimeout(() => { _enterInput('.especialidad') }, 100);
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

		// CARGAR DLLS
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
					this._terceros = data.TERCEROS;
					this.cargarEspecialidades();
				})
				.catch((err) => {
					console.log(err);
					loader('hide');
					_toggleNav();
				});
		},

		cargarEspecialidades() {
			postData({ datosh: datosEnvio() + '|' }, get_url('APP/SALUD/SER855.DLL'))
				.then((data) => {
					this._especialidades = data.ESPECIALIDADES;
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
					loader('hide');
					this.validar_factura();
				})
				.catch((err) => {
					console.log(err);
					loader('hide');
					_toggleNav();
				});
		},

	}
});
