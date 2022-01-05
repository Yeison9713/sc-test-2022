// LISTADO DE CENSO HOSPITALARIO- CARLOS R. - 23-12-2021

new Vue({
el: '#HC904',
components: {
  loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
},
data: {
  form: {
    tipo_serv: '',
    descrip_tipo_serv: '',
    fechaInicial: '',
    fechaFinal: '',
    ano_ini: '',
    mes_ini: '',
    dia_ini: '',
    ano_fin: '',
    mes_fin: '',
    dia_fin: '',
    opcion_cta: '',
    jornada: ' ',
  },

  array_datos: [],

  arr_opcion_cta: [
    { COD: '1', DESCRIP: 'POR SERVICIO HOSPITALARIO' },
    { COD: '2', DESCRIP: 'POR UNIDAD DE ATENCION' },
  ],

  arr_jornada: [
    { COD: '1', DESCRIP: 'MAÑANA' },
    { COD: '2', DESCRIP: 'TARDE' },
  ],

  f8_serv_hosp: [],

  estado_loader: false,
  progreso: {},
  label_loader: null,
  loader: 1,

  fecha_act: moment().format('YYYYMMDD')
},
async created() {
   _vm = this;
  _inputControl('disabled');
  _inputControl('reset');
  nombreOpcion('9-4-1 - Censo Hospitalario');
  loader('show');
  this.cargarServHosp();
},
computed: {
  descrip_opcion_cta() {
    let tipo = this.arr_opcion_cta.find((el) => el.COD == this.form.opcion_cta);
    return tipo ? tipo.DESCRIP : '';
  },

  descrip_jornada() {
    let tipo = this.arr_jornada.find((el) => el.COD == this.form.jornada);
    return tipo ? tipo.DESCRIP : '';
  },
},

methods: {

  llenarDatosFecha() {
    this.form.ano_ini = `20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)}`;
    this.form.mes_ini = parseInt(moment().format('MM'));
    this.form.dia_ini = parseInt(moment().format('DD'));

    this.form.ano_fin = `20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)}`;
    this.form.mes_fin = parseInt(moment().format('MM'));
    this.form.dia_fin = parseInt(moment().format('DD'));

    this.validar_tipo_serv();
  },
  
  validar_tipo_serv() {
    validarInputs(
      {
        form: '#dato_tipo_serv',
        orden: '1'
      },
      () => {
        _regresar_menuhis();
      },
      () => {
        this.form.tipo_serv = this.form.tipo_serv || '**';
        let tipo_serv = this.form.tipo_serv;

        if (tipo_serv == '**') {
          this.$refs.descrip_tipo_serv.value = 'Todos los servicios hospitalarios';
          this.validarAnoIni();
        } else {
          let busq = this.f8_serv_hosp.find((a) => a.ID == tipo_serv);
          if (busq != undefined) {
            this.$refs.descrip_tipo_serv.value = busq.DESCRIPCION;
            this.validarAnoIni();
          } else {
            CON851('01', '01', null, 'error', 'error');
            this.validar_tipo_serv();
          }
        }
      }
    );
  },

  
  
  validarAnoIni() {
    validarInputs(
      {
        form: '#ano_inicial',
        orden: '1'
      },
      () => {
        this.validar_tipo_serv();
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
          this.validar_opcion_cta();
        }
      }
    );
  },

  validar_opcion_cta() {
    POPUP(
      {
        array: this.arr_opcion_cta,
        titulo: 'Opcion de CTA',
        indices: [{ id: 'COD', label: 'DESCRIP'}],
        seleccion: '1',
        teclaAlterna: true,
        callback_f: () => {
          this.validarDiaFin();
        }
      },
      (data) => {
        this.form.opcion_cta = data.COD;
        setTimeout(() => {
          this.validar_jornada();
        }, 100);
      }
    );
  },

  validar_jornada() {
    POPUP(
      {
        array: this.arr_jornada,
        titulo: 'JORNADA',
        indices: [{ id: 'COD', label: 'DESCRIP'}],
        seleccion: '1',
        teclaAlterna: true,
        callback_f: () => {
          this.validar_opcion_cta();
        }
      },
      (data) => {
        this.form.jornada = data.COD;
        setTimeout(() => {
          this._envioImpresion();
        }, 100);
      }
    );
  },

  _envioImpresion() {
    CON851P(
      "00",
      () => {
        this.validar_tipo_serv();
      },
      () => {
        this.estado_loader = true;
        this.label_loader = `Procesando: ${moment(this.form.fechaInicial.toString()).format("YYYY/MM")}`;
        this.progreso = { transferred: 0, speed: 0 };

        let data = {};

        data["datosh"] = datosEnvio();
        data["admin_w"] = localStorage.Usuario;
        data["serv_w"] = this.form.tipo_serv;
        data["fecha_inicial"] = this.form.fechaInicial.toString();
        data["fecha_final"] = this.form.fechaFinal.toString();
        data["sw_serv"] = this.form.opcion_cta;
        data["jornada_w"] = this.form.jornada;

        postData(data, get_url("app/HICLIN/HC904.DLL"), {
          onProgress: (progress) => {
            this.progreso = progress;
          },
        })
          .then((data) => {
            this.loader = false;
            this.label_loader = `GENERANDO IMPRESIÓN...`;
            this.progreso.completado = true;
            // this.array_datos = data.LISTADO;
            this._montarImpresion_HC904(data);
          })
          .catch((err) => {
            console.error(err);
            CON851("", "Error consultando datos", null, "error", "Error");
            this.loader = false;
            this.estado_loader = false;
            this.validar_tipo_serv();
          });
      }
    );
  },
  async _montarImpresion_HC904(data) {
    data.ENCABEZADO = [];

    let nombreEmpresa = $_USUA_GLOBAL[0].NOMBRE.trim();
    let nit = $_USUA_GLOBAL[0].NIT.toString();
    let fecha = moment().format('MM/DD/YY');

    // let set = new Set(this.array_datos.map(el => el.serv));
    // this.array_datos.filter(el => el.serv == [...set.keys()]).length

    if (data.LISTADO.length < 1) {
      CON851('08', '08', null, 'error', 'error');
      this.estado_loader = false;
      this.validar_tipo_serv();
    } else {
      var columnas = [
        {
          title: "OCUP",
          value: "ocup",
        },
        {
          title: "HABITACION",
          value: "habitacion",
        },
        {
          title: "UNIDAD_DE_SERVICIO",
          value: "unidad_servicio",
        },
        {
          title: "SERVICIO_HOSPITALARIO",
          value: "servicio_hosp",
        },
        {
          title: "IDENTIFICACION",
          value: "identificacion",
        },
        {
          title: "1ER_APELLIDO",
          value: "apellido1",
        },
        {
          title: "2DO_APELLIDO",
          value: "apellido2",
        },
        {
          title: "NOMBRES",
          value: "nombre",
        },
        {
          title: "FACTURA",
          value: "factura",
        },
        {
          title: "FECHA_INGRESO",
          value: "fecha_ingreso",
        },
        {
          title: "ESTADO",
          value: "estado",
        },
        {
          title: "TIEMPO",
          value: "tiempo",
        },
        {
          title: "ENTIDAD",
          value: "entidad",
        },
        {
          title: "MEDICO",
          value: "medico",
        },
        {
          title: "DIAG",
          value: "diag",
        },
        {
          title: "DESCRIP_DIAG",
          value: "descrip_diag",
        },
        {
          title: "OBSERVACIONES_FACTURA",
          value: "obs_fact",
        }
      ]

      var header_format = [
        { text: `${nombreEmpresa}`, bold: true, size: 16 },
        `LISTADO DE CENSO HOSPITALARIO   NIT: ${nit}`,
        `DESDE: ${this.form.ano_ini}/${this.form.mes_ini}/${this.form.dia_ini} -
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
          _regresar_menuhis();
        })
        .catch(() => {
          this.estado_loader = false;
          console.log('Proceso error')
          _regresar_menuhis();
        })
    }
  },

  

  _ventanaServHosp() {
    _ventanaDatos({
      titulo: 'VENTANA DE SERVICIOS HOSPITALARIOS',
      columnas: ['ID', 'DESCRIPCION'],
      data: this.f8_serv_hosp,
      callback_esc: () => {
        document.querySelector('.tipo_serv').focus()
      },
      callback: (data) => {
        this.form.tipo_serv = data.ID;
        setTimeout(() => { _enterInput('.tipo_serv') }, 100);
      }
    })
  },

  cargarServHosp() {
    postData({ datosh: datosEnvio() + '|' }, get_url('APP/SALUD/SER812.DLL'))
      .then((data) => {
        this.f8_serv_hosp = data.SERVICIO;
        loader("hide");
        this.llenarDatosFecha();
      })
      .catch((err) => {
        console.log(err);
        loader('hide');
        _regresar_menuhis();
      });
  },

}



})